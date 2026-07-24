# Project Scan File: attachment model & search-delete cleanup

**Status: DRAFT / design in progress.** This documents a problem and a proposed design direction; it is
not yet implemented. The current-behavior sections are grounded in the code (traced); the *proposed
design* (attachment model, new markers, GC) is not yet decided/built — see Open questions.

> **Revised direction (2026-07, preferred):** the section
> [**Revised design direction: deferred soft-delete + visibility gate**](#revised-design-direction-2026-07-deferred-soft-delete--visibility-gate-preferred--largely-supersedes-the-heartbeatprovisional-model-above)
> largely **supersedes the heartbeat / "provisional attachment" reasoning** below. Instead of deciding at
> delete time whether to physically remove a scan file (the zombie-vs-live ambiguity), it decouples UI
> visibility and exposure from physical deletion and lets a lazy, age-based sweep do the removal — which
> *dissolves* the ambiguity. Read the earlier sections for grounding/history; treat that section as the
> current intent.

## The problem

Historically, scan files in Limelight existed **only** as attachments to searches. Later,
`project_scan_file_tbl` was added so a user can run **feature detection** on any scan file in a project —
not just scan files attached to a search. So a scan file can now live in a project for its own sake.

Today a user may delete a `project_scan_file` from the **Scan Files tab only if** it is not attached to
any search or feature-detection run.

The pain: **most users only work with searches and never open the Scan Files tab.** They delete a search
and reasonably assume everything for that search — including its scan files — is gone from the project.
But **deleting a search never removes the `project_scan_file` rows**, so those scan files remain visible
under the Scan Files tab. Orphaned scan files accumulate and confuse users.

**Primary driver — data exposure, not just tidiness.** A scan file the user *thinks* they deleted (with
its search) is still present in the project and its scan data is still reachable — so if the project is
later shared or made public, that scan-file data can be **inadvertently shared**. Preventing this
accidental exposure is the main reason to remove unattached scan files, and it justifies an **aggressive**
removal policy (decided with a scientist, 2026-07 — some users may be mildly inconvenienced; preventing
accidental data sharing takes priority).

We want: when a user deletes a search, remove the scan files that were only there because of that search,
and more broadly **remove any scan file that is no longer attached to anything** — while retaining scan
files that are still used by a search, a feature-detection run, or that were **deliberately imported
independently for feature detection** (the `independent` marker). The independent marker is the *only*
thing that spares an otherwise-unattached scan file from aggressive removal.

## Why this is hard — the core ambiguity

A healthy in-progress import and a **died-mid-import "zombie"** both sit in
`SearchRecordStatus.IMPORTING (1)` / `IMPORTING_WAITING_FOR_SCAN_FILE_IMPORTS (2)`
(`limelight_shared/enum_classes/SearchRecordStatus.java`). A single-instant, delete-time rule **cannot
tell them apart** — the information isn't in the row. So the *authoritative* removal of a scan file
cannot be a naive "decide right now at delete time" computation; it has to be driven by attachment
lifecycle events (import succeeded / import failed / search deleted), not by reading a status at one
instant.

Statuses (`SearchRecordStatus`): `IMPORTING(1)`, `IMPORTING_WAITING_FOR_SCAN_FILE_IMPORTS(2)`,
`IMPORT_COMPLETE_VIEW(3)`, `IMPORT_FAIL(4)`, `IMPORT_CANCELED_INCOMPLETE(5)`, `MARKED_FOR_DELETION(6)`,
`DELETION_IN_PROGRESS(7)`.

## Current data model

The physical scan file (`scan_file_tbl`) is shared; the **project-scoped association** rows are what a
project owns:

```
scan_file_tbl (id)                         -- physical scan file (spectral storage), shared
  ▲
project_scan_file_tbl (id, project_id, scan_file_id)          -- a scan file IN a project
  ▲
project_scan_filename_tbl (id, project_scan_file_id, scan_filename)
  ▲
project_scan_filename__search_scan_file__mapping_tbl
      (project_scan_filename_id, search_scan_file_id, project_search_id)   -- attaches to a SEARCH
```

- `project_scan_filename__search_scan_file__mapping_tbl.project_search_id` FK is **`ON DELETE CASCADE`**
  — so when a `project_search_tbl` row is deleted, its mapping rows vanish automatically. The
  `project_scan_file_tbl` / `project_scan_filename_tbl` rows do **not** cascade — they are left behind.
- Feature-detection attachment: `feature_detection_root__project_scnfl_mapping_tbl.project_scan_file_id`
  → `project_scan_file_tbl.id`.
- Gold-standard attachment: `GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping` (maps a gold-standard
  scan-file root → `project_scan_file_tbl.id`).
- `project_scan_file_importer_tbl` (PK `project_scan_file_id`) records where a scan file was imported
  from (file_size, sha1sum, S3 location, ...). **It is NOT a discriminator** — it is written in *both*
  the search-import and the standalone-for-FD flows (see write-paths below).

### There is no "imported without a search" marker today — and that's the crux

`project_scan_file_tbl` has only `id, project_id, scan_file_id` — **no origin/type/flag column**. The
**only** structural signal distinguishing a standalone-for-FD scan file from a search-imported one is the
**presence/absence of a `project_scan_filename__search_scan_file__mapping_tbl` row**:

- Search import → inserts a mapping row (carries `search_scan_file_id` + `project_search_id`).
- Standalone-for-FD import → inserts `project_scan_file` + `project_scan_filename` + `project_scan_file_importer`
  but **no** mapping row.

**Consequence (the reason a new marker is needed):** once a search is deleted, its mapping row cascades
away — so an orphaned *search-imported* scan file becomes **byte-for-byte indistinguishable** from a
*standalone-for-FD* one (both: a `project_scan_file` with an importer row and zero mapping rows). Nothing
in the schema records "this scan file exists for its own sake, retain it." Therefore the attachment model
**must add an explicit `independent / imported-without-a-search` marker at import time** (flow (b)), or we
can never safely decide whether a mapping-less scan file should be kept or garbage-collected.

### Existing "is it still attached?" checks

- `searchers/ProjectSearchId_AnyExists_For_ProjectScanFileId_Searcher.java` — returns true if any
  `project_scan_filename__search_scan_file__mapping_tbl` row for the given `project_scan_file_id` belongs
  to a search whose `project_search_tbl.status_id = IMPORT_COMPLETE_VIEW`. (Note: it filters to
  **complete** searches, so an in-progress or failed search's mapping does **not** count as "attached"
  here.)
- `searchers/FeatureDetection_Root_Entries_For_ProjectScanFileId_Searcher.java` — feature-detection
  attachments for a `project_scan_file_id`.
- Gold-standard mapping DAO — gold-standard attachments.

## Current flows (grounded)

### Copy-search-to-new-project — `CopyProjectSearchIdToNewProjectUsingDBTransactionService`

`database_update_with_transaction_services/CopyProjectSearchIdToNewProjectUsingDBTransactionService.java`

- `insert_ProjectScanFile_And_Children_To_New_Project(...)` creates **brand-new** project-scoped rows in
  the destination project (`project_scan_file_tbl`, `project_scan_filename_tbl`, and the
  `..._mapping_tbl` row with the **new** `project_search_id`). The physical `scan_file_tbl` is reused.
- DAO inserts: `projectScanFileDAO.save__NOT_SET_ID(...)` then `getId_For_ProjectId_ScanFileId(...)`;
  `projectScanFilename_DAO.save__NOT_SET_ID(...)` then `getId_For_ProjectScanFileId_ScanFilename(...)`;
  `projectScanFilename_SearchScnFile_Mapping_DAO.save(...)`. Duplicate-key tolerant (re-reads the
  existing id) so multiple copied searches can share a project scan file.
- Fully **`@Transactional`** (must not throw checked exceptions — they wouldn't roll back; checked
  exceptions are wrapped in `RuntimeException`). A failure mid-copy rolls back the whole batch.
- The destination `project_search` is **complete immediately** — `statusId` is copied verbatim from the
  source; there is **no** IMPORTING-then-flip lifecycle here today. (Relevant because the new
  "provisional attachment" idea, below, would need to apply to copy as well as import.)

### Import write-paths (row creation) — all in `limelight_importer` / `limelight_feature_detection_run_import`

- **(a) Normal search import.** `process_input/ProcessLimelightInput.java` →
  `scan_file_processing_validating/ScanFiles_UpdateDB_WithSpectralStorageService_API_Key.java` inserts
  **all four** tables per scan file (insert-if-not-exists): `project_scan_file_tbl`,
  `project_scan_filename_tbl`, **`project_scan_filename__search_scan_file__mapping_tbl`** (with
  `projectSearchId` + `searchScanFileId`), and `project_scan_file_importer_tbl`. DAOs:
  `dao/Project_ScanFile_DAO_Importer`, `dao/Project_ScanFilename_DAO_Importer`,
  `dao/ProjectScanFilename_SearchScanFile_Mapping_DAO_Importer`, `dao/Project_ScanFile_Importer_DAO_Importer`.
- **(b) Standalone scan-file import (no search, for FD).**
  `process_file_import_submission/ProcessFileImportSubmission.java` (when there's no Limelight XML) →
  `process_input/Process_ScanFiles_ONLY_Main__No_LimelightXMLFile.java` inserts only **three** tables:
  `project_scan_file_tbl`, `project_scan_filename_tbl`, `project_scan_file_importer_tbl` — and
  **no mapping row**. This is the "independent" scan file, but it carries no positive marker (see above).
- **(c) Feature detection** does **not** create `project_scan_file` — it reads an existing one
  (`ProjectScanFileDAO_Partial.get_scan_file_id_ById`) and inserts the FD side
  (`feature_detection_root_tbl` + `feature_detection_root__project_scnfl_mapping_tbl`). So FD depends on a
  scan file created by flow (b).
- **(d) Copy-search** (webapp) is the only webapp-side inserter — see the copy section above.

### Existing Scan-Files-tab delete flow (must stay consistent with the new design)

`Project_ScanFile_Delete_RestWebserviceController` (`.../rest_controllers/other_like_project/`), POST
`{projectScanFileId}`, auth = `isProjectOwnerAllowed()`. It calls `projectScanFileDAO.delete(id)`
(`DELETE FROM project_scan_file_tbl WHERE id = ?`), which cascades to the filename / importer / FD-mapping
/ gold-standard-mapping children.

Guard before delete: it refuses (`canDeleteEntry=false`) when
`ProjectSearchId_AnyExists_For_ProjectScanFileId_Searcher` finds a mapping row to an
`IMPORT_COMPLETE_VIEW` search — because that mapping's FK to `project_scan_filename_tbl` is
`ON DELETE NO ACTION` and would otherwise raise an FK violation (also caught as a
`DataIntegrityViolationException` fallback). The FD guard is present but **disabled** (FD mapping
cascades, so no guard needed); gold-standard has no guard (also cascades). So today the only thing that
blocks a manual scan-file delete is an attached **complete** search — the new `independent` marker and
provisional attachments must be reconciled with this same guard.

### Delete-search flow — HARD delete, mapping cascades synchronously

`Delete_ProjectSearch_RestWebserviceController` (`.../rest_controllers/project_search_based_insert_update_delete/`)
→ `validateProjectOwnerAllowed(projectSearchIds, request)` (PROJECT_OWNER == search-delete level 30) →
`DeleteProjectSearchIds_UsingDBTransactionService.deleteProjectSearchIds(...)` (`@Transactional`).

- It **hard-deletes** the `project_search_tbl` row *immediately* in the request transaction
  (`ProjectSearchDAO.delete` = `DELETE FROM project_search_tbl WHERE id = ?`). There is **no**
  `MARKED_FOR_DELETION(6)` for searches — that status is not used for `project_search_tbl`.
- **The `project_scan_filename__search_scan_file__mapping_tbl` rows cascade away the instant the
  `project_search_tbl` row is deleted** (its `project_search_id` FK is `ON DELETE CASCADE`) — i.e.
  **synchronously, inside this webapp transaction.**
- **`project_scan_file_tbl` / `project_scan_filename_tbl` survive** — they don't cascade off the search
  or the mapping. They are left orphaned.
- Deleting `project_search_tbl` orphans the heavy `search_tbl` (keyed on `search_id`); the async
  database-cleanup job later removes the orphaned `search_tbl` and its ~40 child tables — including
  `search_scan_file_tbl WHERE search_id = ?` (which cascades the mapping via its `search_scan_file_id`
  FK too, though those rows are usually already gone).

**Design implication:** because the mapping cascades synchronously on the `project_search_tbl` delete, the
"which scan files were only attached to these searches" set must be computed **before** the delete, and
the detach/GC must happen **inside the delete-search webservice transaction** (or that information is
lost). This is the natural home for the in-transaction scan-file removal (point A above).

### No GC of orphaned `project_scan_file` — confirmed

`DELETE FROM project_scan_file_tbl` occurs only in (i) the user-driven Scan-Files-tab delete controller
and (ii) copy-search rollback. **Nothing** deletes a `project_scan_file` after its last search mapping is
gone. The only automatic removal is whole-project deletion (`project_id` FK `ON DELETE CASCADE`). So
orphaned rows leak until the entire project is deleted.

### Zombie imports & the heartbeat table (the live-vs-dead signal)

There is **no** run_importer startup recovery that fails searches left stuck in `IMPORTING(1)` /
`IMPORTING_WAITING_FOR_SCAN_FILE_IMPORTS(2)` by a killed process. Instead there is a **heartbeat**:
`importer__search_import_in_progress_tracking_tbl` (DAO
`Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter`) whose
`importer_running_heart_beat_last_update` is bumped throughout an active import and cleared on
success/failure. A stale heartbeat = the import is dead. Today the only thing that cleans stuck searches
is the database-cleanup searchers, and only after `last_modified_date_time < NOW() - INTERVAL 10 DAY`.

**This heartbeat is the better basis for the "provisional attachment" resolution** than reading
`status_id`: a provisional attachment is confirmed when its import completes, and is safe to drop when the
import's heartbeat has gone stale (dead) — no 10-day wait needed for the scan-file GC decision.

## Proposed design: an attachment / reference model

Treat a `project_scan_file` as **retained in the project while it has ≥1 attachment**, and "removing"
a scan file from a search just **detaches**; when the last attachment is gone, the `project_scan_file`
(and its children) are removed. Attachment kinds:

| Attachment | Source | Status |
|---|---|---|
| Completed search | existing `..._mapping_tbl` row (search `IMPORT_COMPLETE_VIEW`) | today |
| Feature-detection run | `feature_detection_root__project_scnfl_mapping_tbl` | today |
| Gold-standard root | gold-standard scan-file mapping | today |
| **Independent / imported-without-a-search** | **NEW boolean column** on `project_scan_file_tbl` | proposed — must be stored |
| **Provisional (in-progress import)** | **DERIVED** from the search's status + heartbeat (no new column) | proposed |

Rules:
- A scan file imported standalone for FD gets an **independent attachment** so it is retained even with
  zero search/FD attachments (this is what today's users of the Scan Files tab expect).
- An in-progress search import (and a search-copy) creates a **provisional attachment**, flagged
  "delete unless this import succeeds." On success → confirm (becomes a real search attachment). On
  failure / death → the provisional attachment is removed, and if it was the last attachment the scan
  file is cleaned up. This is where the zombie ambiguity is resolved: it's driven by the import
  succeeding or being failed, not by reading a status at delete time.
- Deleting a search detaches its search attachment; a garbage step removes any `project_scan_file` whose
  attachment count reached zero.

## Recommended approach (decisions 1–3 worked through)

### Decision 1 — the `independent` marker: **one boolean column on `project_scan_file_tbl`**

Add `imported_independent_of_search TINYINT NOT NULL DEFAULT 0` (name TBD). Rationale:
- The concept is exactly **1:1 with a `project_scan_file` row** and is a boolean → a column is the right
  granularity; a side-table for a 0/1 is overkill and adds a join.
- It **must be persisted** — it is unrecoverable after a search delete (a mapping-less row can't be told
  apart from an old search-orphan; see "no marker today").

Writes: in the standalone-for-FD import flow (b)
(`Process_ScanFiles_ONLY_Main__No_LimelightXMLFile`), after resolving the `project_scan_file` id
(these importer DAOs are **select-first**, not `ON DUPLICATE KEY UPDATE`), issue an explicit
`UPDATE project_scan_file_tbl SET imported_independent_of_search = 1 WHERE id = ?`. This covers both a
fresh standalone import **and promotion** of a row first created by a search that is later imported
standalone. **The search-import flow (a) and copy-search must never write this column** — flow (a) is
select-first (`ScanFiles_UpdateDB_WithSpectralStorageService_API_Key`, `getId_ForItem` → reuse), so an
existing independent flag is preserved untouched when a search later attaches the same scan file. New
rows default to `0`. Reads: the retain rule (below) and the existing Scan-Files-tab delete guard.

**Worked scenario (this is the case the column exists for):** standalone import → PSF-1 with flag `1`;
then a search imports the same scan file → flow (a) reuses PSF-1 (flag stays `1`) and adds a mapping row;
then the search is deleted → the mapping cascades away, PSF-1 still has flag `1` → **retained** (and not
offered for deletion in the overlay). Correct: the user imported it independently for FD.

**Backfill / plan for existing rows** — see the dedicated section below.

### Decision 2 — `provisional`: **derive it, do NOT add a column**

The importer inserts the `..._mapping_tbl` row (with `project_search_id`) **during** the import, before
the search flips to complete — so an in-progress attachment already exists in the mapping table. Its
"provisional-ness" is fully derivable: a search mapping **retains** its scan file iff that search is
`IMPORT_COMPLETE_VIEW` **or** has a **fresh heartbeat** in
`importer__search_import_in_progress_tracking_tbl`. A dead-heartbeat importing search does not retain.

This avoids a new column that would have to be set on every import/copy path and *cleared* on every
success/failure/rollback path — a class of bug (a missed clear leaves a scan file wrongly retained or
wrongly deletable). Deriving reuses infrastructure that already exists and is already maintained.
(This is a deliberate divergence from the original "add a delete-unless-import-succeeds flag" instinct —
same behavior, fewer moving parts.)

**The single retain rule** (one new searcher, used by both the overlay list and the in-transaction GC):
a `project_scan_file` is **removable** iff it has none of —
1. a `..._mapping_tbl` row to a search that is complete **or** has a fresh heartbeat (excluding the
   searches being deleted),
2. a `feature_detection_root__project_scnfl_mapping_tbl` row,
3. a gold-standard scan-file mapping row,
4. `imported_independent_of_search = 1`.

### Decision 3 — phasing & where removal runs

- **Copy-search needs no provisional handling** (confirmed against current code).
  `insert_ProjectScanFile_And_Children_To_New_Project` runs *inside* the single
  `@Transactional(REQUIRED)` `copyProjectSearchIdsToNewProjectId` (call at
  `CopyProjectSearchIdToNewProjectUsingDBTransactionService.java:206`), landing the destination search
  **complete immediately**. Destination `project_scan_file` rows are retained by that complete search
  like any other and roll back as a unit on failure. Copy just leaves the new column `0`.
  - _Caveat (future):_ if copy is ever changed to commit the destination scan files in their own
    transaction(s) *first* (e.g. to avoid one huge transaction on a heavy copy), a copy that dies after
    those commits would leave committed-but-abandoned destination rows — the orphan case — and copy would
    then need its own event-driven cleanup at copy-failure (there is no broad sweep to catch it). Not the
    case today.
Cleanup going forward is **event-driven — tied to a specific search removal — not a broad "sweep all
unattached" background job.** A broad sweep is deliberately avoided: on a public install it would silently
mass-delete the operator's *pre-existing* backlog on first run, which must instead be the explicit,
opt-in, documented script (see the existing-records section). Two removal points, both using the same
retain rule:

- **(A) User deletes a search — in the `delete-project-search` webservice transaction.** All in one
  transaction: (1) compute the set of `project_scan_file`s that will become removable via the retain-rule
  searcher **before** deleting; (2) delete the `project_search_tbl` rows (mapping cascades synchronously);
  (3) delete those now-unattached, non-independent `project_scan_file` rows (cascades their children). The
  overlay *informs* the user of what will go (see the overlay section).
- **(B) Async cleanup removes a failed / stuck / died-import search** — extend the existing
  `Delete_Single_Search_And_Children` (run_importer `database_cleanup`) so that when it deletes a search,
  it also removes any `project_scan_file` that deletion orphaned (now-unattached, `independent = 0`). This
  is what catches **died-import** orphans — but only when that search is cleaned (today: stuck `IMPORTING`
  searches are removed after `> 10 days`), and it only ever touches scan files orphaned *by the specific
  search being removed*, never the operator's broader pre-existing backlog.

Because both points are scoped to a concrete search-removal event, nothing silently deletes pre-existing
data — that stays the opt-in script's job.

### Plan for existing (pre-upgrade) `project_scan_file` records — one-time bulk delete, separate & documented

**Decision:** do **not** try to reconstruct which pre-existing unattached scan files were "independent" —
it isn't worth the effort, and a user can always re-import (going forward such imports are tracked via the
`independent` flag). Instead, **delete all currently-unattached `project_scan_file` records** as a
one-time cleanup. (The earlier sha1sum→import-history reconstruction idea is **dropped**.)

**Ship it as a separate, standalone, documented SQL/step — NOT wired into the automatic upgrade
migration.** This matters because Limelight is a **public** project (GitHub + DockerHub) that other people
may install: a destructive mass-delete must be an explicit, opt-in action an operator chooses to run, with
clear documentation of exactly what it removes — never something that silently wipes their data on upgrade.

- **What it deletes:** every `project_scan_file` that is **unattached** = no mapping to a complete
  (`IMPORT_COMPLETE_VIEW`) or live-heartbeat search, no `feature_detection_root__project_scnfl_mapping_tbl`
  row, and no gold-standard mapping. (Cascades remove the filename / importer / any mapping children.)
- **Keep it simple and self-contained** so it can be run by hand and read/understood from the doc.
  Recommend running it **log-only / count-first** (report how many rows and which projects) before the
  destructive run.

Going forward, the `independent` flag (set by flow (b)) protects deliberately-imported-for-FD scan files,
so this one-time bulk delete has no going-forward equivalent risk — it's purely to clear today's backlog on
instances whose operators choose to run it.

### Recommended scope

1. Schema: the new column + version-upgrade SQL. **No data backfill** — the column defaults `0`; existing
   unattached rows are handled by the separate opt-in script (6), not by a migration.
2. Import: set the column in flow (b) (standalone-for-FD).
3. New retain-rule searcher + a "scan files only attached to these searches" list webservice, mirroring
   `Project_List_Experiments_Containing_ProjectSearchIds_RestWebserviceController`
   (`@PostMapping`, `byte[]` in/out, `validateProjectOwnerAllowed`, path constant next to
   `LIST_EXPERIMENTS_CONTAINING_PROJECT_SEARCH_IDS_...`).
4. Overlay: retrieve + list the scan files that will be removed; delete webservice does the in-transaction
   removal.
5. Async-cleanup hook (B): extend `Delete_Single_Search_And_Children` to remove scan files a search
   removal orphans (catches died-import orphans).
6. Separate, documented, standalone SQL/step to bulk-delete all currently-unattached scan files (the
   one-time backlog clear) — **not** part of the auto-migration.

The overlay (4) is the immediate, user-visible path; the async hook (5) catches died-import orphans at
search-cleanup time; the standalone script (6) is the opt-in backlog clear. No broad always-on sweep.

### Remaining choices for you

- **Overlay: opt-out or informational?** Since these scan files become unattached the moment the search is
  gone and the delete transaction removes them, an opt-out checkbox wouldn't meaningfully preserve them
  (only re-import would). Recommend **informational** — "these scan files are used only by this search and
  will be removed."
- **Standalone backlog script — how strict?** It deletes all currently-unattached scan files. Confirm the
  "unattached" definition (no complete/live-heartbeat search mapping, no FD, no gold) and whether to
  provide a **count/log-only mode** first (recommended) before the destructive run.
- **Died-import latency (point B).** Today a stuck `IMPORTING` search is only cleaned after `> 10 days`, so
  its orphaned scan file lingers until then. Accept that, or add earlier heartbeat-based detection (more
  work). Recommend accept — it matches how long the stuck search itself lingers.

## Revised design direction (2026-07): deferred soft-delete + visibility gate (preferred; largely supersedes the heartbeat/provisional model above)

Rather than decide at search-delete time whether to *physically* remove a scan file — the decision that
forces the zombie-vs-live ambiguity and the heartbeat-derived "provisional attachment" — **decouple UI
visibility and data exposure from physical deletion**, and make physical removal a lazy, age-based sweep.
This *dissolves* the ambiguity instead of resolving it, and removes most of the moving parts in
"Recommended approach" above.

### New columns on `project_scan_file_tbl` (all mirror patterns already in the schema)

| Column | Mirrors | Meaning |
|---|---|---|
| `imported_independent_of_search TINYINT NOT NULL DEFAULT 0` | doc Decision 1 | imported standalone-for-FD; never auto-deleted |
| `shown_in_scan_files_tab TINYINT NOT NULL DEFAULT 0` | new | row is confirmed & listed in the Scan Files tab; set `1` when the import **completes** (or immediately for a standalone-for-FD import) |
| `marked_for_deletion TINYINT UNSIGNED NOT NULL DEFAULT 0` + `marked_for_deletion_timestamp TIMESTAMP NULL` + `marked_for_deletion_user_id INT UNSIGNED NULL` | `project_tbl` (L83, L89–90), `project_search_tbl` (L190–191) | soft-delete; hidden everywhere, awaiting GC |
| `last_referenced_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP` | `peptide_tbl.last_used_in_search_import` (L122) | bumped on first insert and by **every later operation that creates a reference to the row** — see the bump-event list below |

### `last_referenced` replaces the heartbeat (the key simplification)

**Every operation that creates a reference to a `project_scan_file` row bumps
`last_referenced_date_time = NOW()` on that row *before* it uses the row's id in any child record.** The
bump is not search-import-only — it fires on **all** of these reference-creating events (each "locks" the
file against GC for the next N days):

- **search import** (flow a) — before inserting the `..._mapping_tbl` row;
- **standalone-for-FD scan-file import** (flow b) — at row insert;
- **user re-uploads the same scan file** (an upload that resolves to an already-present `project_scan_file`
  / `scan_file_id` rather than a fresh insert) — re-lock it and clear `marked_for_deletion` if set, so a
  re-upload revives a soft-deleted file instead of racing its GC;
- **feature-detection run start** — before inserting `feature_detection_root__project_scnfl_mapping_tbl`,
  so kicking off FD on an existing scan file re-locks it even if no search currently references it;
- **import of uploaded feature-detection results** — before wiring the uploaded FD data to the scan file;
- (and any future path that attaches a `project_scan_file` to something).

**Any bump on a row whose `marked_for_deletion = 1` also clears the flag (revives it)** — so *every*
re-reference path, not just re-upload, rescues a soft-deleted file from a pending GC instead of racing it.

Because the bump happens up front on every such path, every consequence follows for free:

- A **live import** always keeps a fresh `last_referenced` on the row it is using — so an age-based GC
  (`marked_for_deletion = 1 AND last_referenced_date_time < NOW() - INTERVAL N DAY`) can never remove a
  row that is actively being imported, **without consulting any heartbeat.** `last_referenced` *is* the
  liveness signal.
- A **died import** leaves its row `shown_in_scan_files_tab = 0` (never flipped to complete) with a
  `last_referenced` frozen at death; it is never shown, never (per the exposure filter) shared, and simply
  ages out to GC. No zombie-vs-live decision is ever made at a single instant.
- Constraint: **N must exceed the longest plausible import duration** so an in-progress import is never
  GC'd. This is the same assumption the existing 10-day stuck-search cleanup already relies on. (A single
  up-front bump per import is enough as long as N ≫ import time — same as how `peptide_tbl` bumps once per
  import.) **Chosen N = 10 days.** Operational basis: an import never runs longer than ~12 h even for a
  very-very-large file, and since the XSD-validation fixes the largest files import in under **4 h** — so a
  10-day threshold clears the worst case by ~20× and cannot plausibly catch a live import. (10 days also
  matches the existing stuck-`IMPORTING`-search cleanup window, keeping the two cleanup horizons aligned.)
  (N is the age
  after which a *marked* row becomes GC-eligible; it does not delay hiding, which is immediate via the
  flag.)

### Lifecycle

- **Standalone-for-FD import (flow b):** insert row; `independent = 1`, `shown = 1`; bump `last_referenced`.
- **Search import (flow a):** insert-or-reuse row; bump `last_referenced` **before** wiring children; on
  **import complete** set `shown = 1` and clear `marked_for_deletion` if it was set. Never touches
  `independent`.
- **New search reuses a previously-deleted (marked) file:** the reuse just clears `marked_for_deletion`
  and bumps `last_referenced` — no re-creation, no timing race. (This is the "no pressure to delete on
  time in case a new import references the file" win.)
- **Delete a search:** for each scan file the deleted search referenced that is now unattached and
  `independent = 0`, set `marked_for_deletion = 1` (+ timestamp/user) and `shown = 0`. **No physical
  delete in the request transaction** — so the delete-search flow no longer needs the compute-before-the-
  cascade gymnastics; it may still compute the now-unattached set purely to populate the overlay notice.
- **GC sweep (async, run_importer):** physically
  `DELETE FROM project_scan_file_tbl WHERE marked_for_deletion = 1 AND last_referenced_date_time < NOW() - INTERVAL 10 DAY`
  (cascades children) — but only after the **GC guard re-check** below passes for each candidate.

### GC guard — re-apply the retain rule at sweep time (missed-bump insurance)

`last_referenced` is only a safe liveness signal if **every** reference-creating path actually bumps it
(and clears `marked_for_deletion`). A code bug that *misses* a bump/clear on one path is the one failure
mode that could delete a file still in use — and it fails toward **data loss** (worse than the heartbeat
model, which failed toward retaining). Guard against it cheaply:

**The `marked_for_deletion = 1 AND last_referenced < NOW() - INTERVAL 10 DAY` predicate selects only the
*candidate* set. Before physically deleting each candidate, the sweep re-applies the full retain rule and
skips any row that is still referenced:**
1. no `..._mapping_tbl` row to a search that is `IMPORT_COMPLETE_VIEW` **or** still
   `IMPORTING(1)` / `IMPORTING_WAITING_FOR_SCAN_FILE_IMPORTS(2)`,
2. no `feature_detection_root__project_scnfl_mapping_tbl` row,
3. no gold-standard scan-file mapping row,
4. `imported_independent_of_search = 0`.

So even if a re-import (or FD-run-start, or re-upload) forgot to bump `last_referenced` / clear the flag, a
**live mapping — including an in-progress `IMPORTING` search — spares the file**, making premature GC of an
in-use file impossible short of a genuinely orphaned row.

Notes:
- **Just status `IMPORTING`, no heartbeat.** The guard only ever *spares*, so it can err toward retaining
  without reintroducing the zombie-vs-live decision. A died (zombie) `IMPORTING` search referenced by a
  marked file is still cleaned later by the async search-cleanup path (point B) when that stuck search is
  removed — and the file is `shown = 0` the whole time, so it's never exposed. No permanent leak.
- With N = 10 days versus a ≤ 12 h (typically < 4 h) import, **this guard should essentially never fire** —
  it is pure belt-and-suspenders insurance against a missed bump, not a mechanism the normal flow relies on.

### Exposure & public-install safety — both handled by the flags

- **Exposure (the primary driver):** satisfied by the visibility / marked-deletion filter — **provided
  every share/public/read path filters to `marked_for_deletion = 0 AND shown_in_scan_files_tab = 1`**, the
  same way `project_tbl.marked_for_deletion` projects are excluded. This is the **one gating condition to
  verify**: if some shared read path reads scan-file data without this filter, bytes leak during the
  mark→GC window and the aggressive-immediate-delete argument returns. **(Traced 2026-07 — condition holds;
  see the Exposure trace result subsection below.)**
- **Backlog / existing rows:** the one-time cleanup becomes "**mark** currently-unattached, non-independent
  rows `marked_for_deletion = 1`," not hard-delete — reversible and safe on public installs; GC removes
  them later. And because GC only ever removes **already-marked** rows, a broad background sweep is now
  safe (it cannot touch an operator's unmarked backlog) — removing the earlier design's reason to forbid a
  background sweep. Backfill assumption: existing rows get `independent = 0` (assume search-imported),
  so a later search-delete marks them.

### Exposure trace result (2026-07): the filter is applicable everywhere it needs to be

Traced every read path that surfaces a scan file's listing, metadata, spectra, or raw bytes, and its
access gate. **Result: the gating condition holds.** Details:

**Access reality.** With one exception (below), *every* scan-file read path — the Scan Files tab list, all
scan-file metadata controllers, the feature-detection views, all four `scan_data__single_project_scan_file_id`
spectra controllers, and the raw-download controller — gates only on
`WebSessionAuthAccessLevel.isPublicAccessCodeReadAllowed()` (the "any read" level). **All are reachable by a
public/shared non-owner viewer.** So the filter must be applied to essentially all of them, not a subset.

**Two classes of path, by whether `project_scan_file_tbl` is on the lookup:**

1. **`project_scan_file_id`-keyed paths — filter IS feasible (all have `project_scan_file_tbl` on the
   path).** These are the ones that matter for the mark→GC exposure window:
   - **List surfaces** (where a viewer would *discover* a scan file): the Scan Files tab list via
     `ProjectScanFile_For_ProjectId_Searcher` (`SELECT ... FROM project_scan_file_tbl ... WHERE project_id = ?`)
     and the FD-runs list via `FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher` (joins
     `project_scan_file_tbl`). **Apply `marked_for_deletion = 0 AND shown_in_scan_files_tab = 1` here** so a
     hidden/soft-deleted file never appears. (`Project_Has_AtLeastOne_ProjectScanFile_..._Searcher` needs
     the same filter if "has any scan files" should mean "has any *visible* scan files".)
   - **Spectra / metadata** (`ScanData_WithPeaks...`, `ScanData_NO_Peaks...`, `ScanNumbers_For_mS_1...`) and
     the metadata/FD detail controllers all resolve the request's `projectScanFileId` through
     `ProjectScanFileDAO.getById` / `ProjectScanFile[_ProjectId]_For_ProjectScanFileId_Searcher`
     (`SELECT ... FROM project_scan_file_tbl WHERE id = ?`) before fetching anything. **That resolve is the
     natural gate** — a gated variant that returns not-found for `marked_for_deletion = 1` rejects the
     request before it reaches storage (defense-in-depth; in practice a marked file's id is never surfaced
     to a public viewer once its list entry is filtered out).
   - **Implementation note:** `ProjectScanFileDAO.getById` is shared by many callers — add a **new gated
     lookup method** rather than mutating `getById`. Optionally, the currently-unused
     `SpectralStorageAPIKeyFor_ProjectId_ScanFileId__Using__project_scan_file_tbl_Searcher` already routes
     the spectral-storage-key lookup *through* `project_scan_file_tbl`; switching the spectra controllers to
     it (with the filter) would put the gate directly on the byte-key fetch. The scan-data controllers
     currently key the storage fetch off `scan_file_tbl` (`scanFileDAO.getSpectralStorageAPIKeyById`), which
     has no project scoping — so the enforcement must live at the `project_scan_file` resolve, not the fetch.

2. **Search-keyed paths where `project_scan_file_tbl` is NOT on the lookup — but they are self-closing under
   this model, so no filter is needed there.** Two paths reach scan-file data via `projectSearchId` +
   `searchScanFileId` without touching `project_scan_file_tbl`:
   - the **raw download** `ScanFileContents...Download_Controller.controllerMainMethod` (URL
     `.../using-search-scan-file-id-psid`) — resolves via `search_scan_file_tbl` → `scan_file_tbl` → file
     object storage (returns raw bytes; public/shared reachable);
   - the **per-search scan-file list**
     `ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_For_ProjectSearchId` — emits
     `project_scan_file_id`s via `project_scan_filename_tbl` with no `project_scan_file_tbl` join.

   **Why they don't need the flag:** a scan file only becomes `marked_for_deletion` when it is no longer
   attached to any live search. Both paths require a *live* `projectSearchId`/`searchScanFileId` to resolve
   *and* to pass `validatePublicAccessCodeReadAllowed(projectSearchIds, …)`. The moment the search is
   deleted, its `project_search_tbl` row is hard-deleted and the mapping cascades — so there is no
   `projectSearchId`/`searchScanFileId` left to reach the file through, and the access check itself fails.
   I.e. these paths are only open **while a search still references the file — exactly when the file is
   (correctly) not marked and its `last_referenced` is fresh.** The search deletion that triggers marking is
   the same event that closes these paths. So the design is self-consistent; **no scan-file soft-delete flag
   is required on the search-scan-file side.**

**Residual decisions surfaced by the trace:**
- **Owner-only download during the grace window.** `controllerMainMethod_FromProjectScanFileId` (URL
  `.../using-project-scan-file-id`) is **owner-gated** (`validateProjectOwnerAllowed`) and has
  `project_scan_file_tbl` on the path (twice). The owner who "deleted" the file can still download it until
  GC. Decide whether that's acceptable (owner-initiated delete, owner retains grace-window access — likely
  fine) or whether to gate it too.
- **No path reads `project_scan_file_importer_tbl`** in the webapp (it's write-only there) — nothing to
  filter for the importer table.

**Net:** the one gating condition from the design section is **satisfied** — every public/shared path that
could expose a soft-deleted scan file either has `project_scan_file_tbl` on its lookup (filterable at the
list surface + the id-resolve) or is structurally closed by the search deletion that does the marking.

### What this removes from the earlier ("Recommended approach") design

- The **heartbeat-derived "provisional attachment"** (Decision 2) and the entire zombie-vs-live reasoning
  — replaced by `shown_in_scan_files_tab` + `last_referenced`.
- **In-transaction physical deletion** inside delete-search (point A) — replaced by a flag flip; physical
  removal is the async age sweep.
- The **ban on a broad sweep** — a marked-only sweep is safe.

Retained from the earlier design: the `independent` boolean (Decision 1) and the delete-search overlay as
an **informational** notice (below).

## The delete-search overlay (front end)

File: `front_end/.../project_page/.../projectPage_SearchesAdmin_DeleteSearch_Overlay_Component.tsx`

- On open, in addition to the existing experiments retrieval
  (`projectPage_ListExperimentsContainingProjectSearchIds.ts`), retrieve **scan files that are attached
  ONLY to the searches being deleted** (would become unattached).
- **Display that list as an informational notice** — e.g. "These scan files are used only by the
  search(es) being deleted and will also be removed from the project." (Recommended over an opt-out
  checkbox: once the search is gone the files are unattached and the delete transaction removes them; an
  opt-out wouldn't meaningfully preserve them — only re-import would. See Remaining choices.)
- On submit, the delete webservice removes those scan files in the same transaction (independent scan
  files are excluded by the retain rule and never appear in the list).

### New webservice — mirror the experiments one

Model it on `Project_List_Experiments_Containing_ProjectSearchIds_RestWebserviceController`
(`spring_mvc_parts/data_pages/rest_controllers/other_like_project/`):
- `@PostMapping`, raw `byte[]` in/out via `unmarshal_RestRequest_JSON_ToObject` /
  `marshalObjectToJSON`; request `{ projectIdentifier, projectSearchIds }`.
- Access control: `validateProjectOwnerAllowed(projectSearchIdsList, request)` on
  `ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF` (PROJECT_OWNER = search
  delete level), plus `validate_webserviceSyncTracking_Code`.
- Path constant in `AA_RestWSControllerPaths_Constants.java` (sits in the `d/rws/for-page/...` block
  next to `LIST_EXPERIMENTS_CONTAINING_PROJECT_SEARCH_IDS_...`).
- New searcher returning the `project_scan_file` rows attached only to the given `project_search_id`s
  (attached to at least one; not attached to any other search, FD run, gold-standard root, or independent
  attachment).

## Verification (once implemented)

- Build the webapp WAR via Ant (`limelight_webapp/ant_create_war.xml`); front end via the Gradle
  pipeline it invokes. No JUnit suite — verify by running.
- End-to-end: (a) import a search with scan files, delete it → the overlay lists the scan files and they
  are gone from the Scan Files tab after delete. (b) Import a scan file standalone for FD, then a search
  using the same file; delete the search → scan file **retained** (`independent = 1`); confirm it is NOT
  listed in the overlay. (c) Two searches sharing a scan file; delete one → scan file retained (live
  mapping); delete both → gone. (d) Kill an importer mid-import (leaves the search in `IMPORTING` with a
  now-stale heartbeat); its scan file must be **retained while the heartbeat is fresh** and only becomes
  GC-eligible once the heartbeat is stale / the stuck search is cleaned. (e) Copy a search to a new
  project, fail mid-copy → destination scan files rolled back (single transaction). (f) Kill an importer
  mid-import so the search stays stuck `IMPORTING`; after the async cleanup removes that search (or forced
  in a test), its orphaned scan file is removed (point B). (g) **Standalone backlog script:** on a copy of
  a real DB, run it in **count/log-only mode first**, eyeball the rows/projects it would delete, then run
  the destructive pass and confirm only unattached (no complete/live search, no FD, no gold) rows went.
