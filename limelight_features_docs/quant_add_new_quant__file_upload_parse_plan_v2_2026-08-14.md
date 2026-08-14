# "Add New Quant" — file upload, parse, eligibility & search-mapping — IMPLEMENTATION SPEC v2 (2026-08-14)

**Supersedes** `quant_add_new_quant__file_upload_parse_plan_2026-08-14.md` (v1). This v2 is a clean,
consolidated rewrite: it folds in the corrected mapping data source, the **sub-group/scan-file eligibility
gate**, the **record-number** row key, the parser-owned normalization, `#` comment lines, case-insensitive
matching, and the researcher-level auth. Where v2 and v1 disagree, **v2 wins**.

Status: **Design locked; ready to implement.** Written to be executed by a fresh session with **no prior
conversation context** (self-contained). The overlay shell that hosts this feature is ALREADY built (see
"Current state"); what remains is the upload → detect → preview → validate → map pipeline plus one new
backend webservice.

**Scope:** mostly front-end (TypeScript/React), PLUS **one new backend webservice** (Phase 2) that returns
the eligibility-filtered candidate `(projectSearchId, searchScanFileId, filename)` data for a project. The
webservice only **reads** (no DB writes) but is **researcher-gated** (`validateAssistantProjectOwnerAllowed`),
not public. The parsed + mapped result is held **in memory only** this step (no DB ingest — that is future).

All repo paths are relative to repo root `limelight-core/`. Front-end root:
`limelight_webapp/front_end/src/js/`. FE project-page dir (referenced as `PP/`):
`limelight_webapp/front_end/src/js/page_js/data_pages/other_data_pages/project_page/`.

> **Note on the broader quant effort:** this Quant block is the front door to a **new** quant subsystem with
> its own new data pages and its own (future) way of *running* quant over what this block creates. The older
> FlashLFQ-on-existing-searches run path and the quant displays on the peptide/protein/QC pages are **not**
> part of this work and do not constrain it. The one thing carried over from that effort is the **sub-group /
> scan-file eligibility gate** (§Eligibility) — a search whose sub-groups cross-cut its scan files is not a
> valid quant target and must be excluded from the candidate set here too.

---

## Current state — ALREADY BUILT (start here)

The project page (`/d/pg/project/{projectId}`) has a **Quant** section (rendered just before "Experiments"),
added and runtime-verified. Files under `PP/project_page_quant_section/`:
- `projectPage_QuantSection_Root_Component.tsx` — the collapsible **"Quant"** section + the **"Add New
  Quant"** button. Button onClick → `projPg_Quant_LoggedInUsersInteraction.createNewQuantButtonClicked()`.
  The button renders only when the interaction prop is present = **owner/researcher on a non-locked project**
  (same gate as "Create New Experiment"); the **section itself is visible to all users incl. public**.
- `projPg_Quant_LoggedInUsersInteraction.ts` — opens/closes the overlay, parametrized by
  `quantId: number | undefined` (create vs future edit). `createNewQuantButtonClicked()` →
  `_open_New_Update_QuantOverlay({quantId:undefined})`: hides `data_page_outermost_div`, appends a `<div>` to
  `<body>`, mounts the overlay container React root there. `closeOverlay()` unmounts + restores.
- `projPg_Quant_Single_Maint_OverlayContainer.tsx` — the full-viewport overlay **shell** (header "Add
  Quant"/"Edit Quant" + green X close, `beforeunload` guard, session keepalive). **The overlay BODY is an
  empty placeholder — THIS is where the upload/parse UI goes:** the
  `<div className="top-level single-entry-variable-height" style={{ overflowY:"auto" }}>` holding the comment
  `{/* Overlay body content goes here - to be implemented. */}`.

Threading: the interaction is constructed for owner + researcher (non-locked) in
`PP/projectPage_Root_ProjectOwnerUser.ts` and `PP/projectPage_Root_ResearcherUser.ts`, passed `null` in the
locked/public roots, and flows through
`PP/project_page_main_page_react_based/project_page_ReactParts_ROOT_Component/projectPage_ROOT_Container_Containing_MultipleSections_Component.tsx`.

This overlay is the **cloned Add-Experiment-style overlay** (NOT the standard Limelight modal). Model new work
on the Experiments section (`PP/project_page_experiments_section/`, esp. `projPg_Expermnts_*`). New modules for
this feature go under `PP/project_page_quant_section/`.

**Overlay body layout constraint:** the container uses
`modal-overlay-flexbox-overflow-control-no-header-container` (flex column). Direct children must be `top-level
fixed-height` (content-sized) or the single `top-level single-entry-variable-height` (fills remaining height,
scrolls). Put scrolling body content in the variable-height entry.

---

## What we are building (one paragraph)

The user uploads a delimited text file. We parse it client-side, show a preview with a delimiter selector,
then validate and map **each record's first-column value (a scan filename)** to exactly one
**`(projectSearchId, searchScanFileId)`** among the project's **eligible** searches, retaining the remaining
columns as ordered metadata. Every record is identified by its **record number**. The final
`recordNumber → { userScanFilename, projectSearchId, searchScanFileId, metadataCells }` map is held **in
memory** (no DB). All user messages render **in the overlay** (never `window.alert`).

---

## Parsing (Phase 1)

### Library — PapaParse
Use **PapaParse** (+ `@types/papaparse`) for tokenizing. It is the de-facto browser CSV parser and correctly
handles Excel-export quirks a hand-rolled `split()` gets wrong: quoted fields, embedded delimiters, `""`
escapes, embedded newlines, a leading BOM, and CRLF/CR/LF line endings. Add both `papaparse` and
`@types/papaparse` to `limelight_webapp/front_end/package.json` and run **`npm install`** in
`limelight_webapp/front_end/` (npm install is NOT run by the Gradle/Ant build — see `front_end/CLAUDE.md`).

### Lean on the parser for normalization
Do **not** hand-roll BOM stripping, CRLF/CR→LF normalization, or blank-line trimming — PapaParse does all of
these. Configure:
- **explicit `delimiter`** (we choose it, see below) — do not rely on Papa's auto-detect for the final parse.
- **`header: false`** — parse to `string[][]`; take **row 0 as the header row ourselves**. (Papa's
  `header:true` builds header-keyed objects that collide on duplicate/blank headers and lose column order.)
- **`skipEmptyLines: true`** — drop blank lines.
- **`comments: '#'`** — a line whose first character is `#` is ignored (see Comment lines).

### Delimiter detection — presence + user override
Three candidates: **tab (`\t`), comma (`,`), semicolon (`;`)**. Pick the initial delimiter by a light,
**BOM-aware** peek at the first non-comment line (the header):
1. header contains a **tab** → `\t`
2. else header contains a **comma** → `,`
3. else header contains a **semicolon** → `;`
4. none present → **overlay error** (must be tab-, comma-, or semicolon-delimited; also see the ≥2-column
   rule — a single-column file is rejected).

Then **parse with that explicit delimiter** and show the result in the preview **with a delimiter selector**
(Tab / Comma / Semicolon). Changing the selector **re-parses** the file with the chosen delimiter. This hands
the ambiguous `;`-vs-`,` case (European CSVs) to the user instead of a fragile heuristic — **no occurrence
counting**. The precedence above is just the default the user can override.

### Comment lines
**A line whose first character is `#` is ignored** (parser `comments: '#'`). Comment lines never appear as
records, so they do not affect record numbering. (Edge: a header or data value that literally starts with `#`
would be treated as a comment — acceptable and rare for scan filenames.)

### Record number — the stable row key
Assign each parsed **data record** a **1-based record number** at parse time (record 1 = the first data row
after the header). **This number is the row's identity for the rest of the pipeline** — mapping, every
validation error, collisions, and the stored result all reference records by it. In user-facing text call it
the **"record number"**, and note it equals the file line number *unless* a field contains an embedded line
break. (We do not key on physical line number — the parser may collapse an embedded-newline record onto one
logical row, so record number is the robust handle.)

### Structural validation (errors in the overlay, stop at first failure)
- **Empty file / header-only** → error.
- **At least 2 columns** — column 0 is the scan-filename key, so the header must have **≥ 2 columns** (key +
  at least one metadata column). A single-column file → clear error: *"File needs at least one metadata
  column in addition to the scan-filename column."* (A bare list of scan filenames is intentionally not
  supported.)
- **Equal column count** — every record's field count must equal the header's; mismatch → error (also cheaply
  catches a wrong-delimiter guess).

### Parse output (ordered)
Produce an **ordered** structure — never header-keyed row objects:
```ts
{ headers: string[]; records: { recordNumber: number; cells: string[] }[] }
```
Column order and duplicate/blank header text survive. `cells[0]` is the scan-filename key; `cells[1..]` are
metadata, displayed/retained under their header text.

### Preview + confirm
Parse the **whole** file but render only a capped slice to protect the DOM: **all records if ≤ ~200, else the
first N with "showing N of M"**; **all columns** with horizontal scroll. Show the delimiter selector (above)
and **Continue / Cancel**. Continue gates validation + mapping.

---

## File semantics & matching

### Column meaning
- **Column 0 = key = scan filename** (regardless of that column's header text). The remaining columns are
  **metadata** about that scan filename, retained (with header text, ordered) for later display/grouping.
- The scan filename is matched against the project's **eligible** searches to resolve the record to one
  `(projectSearchId, searchScanFileId)`.

### Matching semantics
- **Literal, per-search match against `search_scan_file_tbl.filename`.** A user scan filename maps to the
  search scan file(s) whose recorded filename equals it. `search_scan_file_tbl` has
  `UNIQUE (search_id, filename)`, so **within one search a filename resolves to exactly one
  `searchScanFileId`**. Across searches it may match several (→ picker, below).
- **NO cross-search alias reconciliation.** Do not use the project-level filename alias union
  (`project_scan_filename_tbl.scan_filename`, multiple rows per project scan file) or the aggregated
  scan-files list endpoint. The fact that the same physical file may appear under a different filename in
  another search is the user's responsibility to track.
- **Normalization:** **trim surrounding whitespace, then compare case-INsensitively** —
  `a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0` (ignores case; stays accent- and
  digit-distinct). Trim first; apply at **every** cascade level.
- **Extension — progressive-relaxation cascade.** Motivation: the filename the user knows may differ from what
  Limelight stored (user submits a workflow naming the `.raw` file; the workflow sends the `.mzML` to
  Limelight). Per user filename, try in order and **STOP at the first level that yields any match:**
  1. **Exact:** `userName == limelightName`.
  2. **vs Limelight base:** `userName == stripExt(limelightName)` — covers the user giving no extension.
  3. **base vs base** (only if `userName` has an extension): `stripExt(userName) == stripExt(limelightName)`
     — covers `Sample1.raw` (user) vs `Sample1.mzML` (Limelight).
  `stripExt` = remove text after the **final** `.` (last extension only — `.mzML.gz` loses only `.gz`; Bruker
  `.d` is a directory, left as-is). **Precompute `stripExt(limelightName)` once** when the candidate data
  loads. **Ship these 3 levels as-is.**
  - **Known gap, intentionally deferred:** a user filename with **no** extension will not match a Limelight
    name with a **double** extension (`Sample1` vs `Sample1.mzML.gz`). Rare; revisit only if it comes up — do
    not pre-emptively broaden relaxation (each extra level trades a rare miss for more false collisions).
- **Match target granularity is `(projectSearchId, searchScanFileId)`** — a record maps to one scan file
  *within* a search, not just to a search.

---

## Eligibility — which searches are valid candidates

**Not every search is a valid quant target.** A search is a candidate only if its scan files are clean quant
units. Reuse the shipped rule (see `limelight_features_docs/flashlfq_quant_subgroup_scanfile_eligibility.md`):

- **No sub-groups** → eligible (whole-search grain).
- **Exactly 1 scan file** → trivially eligible (the eligibility searchers are not called).
- **>1 scan file with sub-groups** → eligible **iff sub-groups ↔ scan files are 1:1**, i.e. BOTH shipped
  shared-code searchers under
  `limelight_shared_code/.../search_sub_group_scan_file/searchers/` return **FALSE**:
  1. `Search_AnyScanFile_HasPsms_In_MultipleSubGroups_ForSearchId_Searcher` — no scan file mixes sub-groups
     (`GROUP BY search_scan_file_id HAVING COUNT(DISTINCT search_sub_group_id) > 1`).
  2. `Search_AnySubGroup_HasPsms_In_MultipleScanFiles_ForSearchId_Searcher` — no sub-group spans scan files
     (`GROUP BY search_sub_group_id HAVING COUNT(DISTINCT search_scan_file_id) > 1`).

Both facts come from per-PSM attributes (`psm_tbl.search_scan_file_id`,
`psm_search_sub_group_tbl.search_sub_group_id`) — no new data source. An **ineligible** search is excluded
from the candidate set, and we retain its **reason** so the not-found UX can explain it (see §Validation
step 3). Reason values mirror the shipped `FlashLFQ_Run_Reject_Reason`:
`SUB_GROUPS_CROSS_CUT_SCAN_FILES` (a scan file mixes sub-groups) and
`SUB_GROUP_SPANS_MULTIPLE_SCAN_FILES` (a sub-group spans scan files).

**There is a single-search version of this check already in the uncommitted code** —
`FlashLFQ_Quant__AnyScanFile_HasPsms_In_MultipleSubGroups__Single_ProjSearchID_RestWebserviceController`
(returns both facts for one projectSearchId). Our new webservice computes the same thing for **all** the
project's searches.

**Performance + future flags table.** The two `GROUP BY … HAVING` queries over `psm_tbl` are the cost center;
run them **only for >1-scan-file searches** (single-file / no-sub-group searches skip them entirely, and most
searches are single-scan-file). The FE/loader must treat per-search eligibility as an **opaque
boolean + reason**, so that a future optimization — caching eligibility in a per-search flags table — is a
**backend-only** change with no FE impact.

---

## Validation + mapping pipeline (all errors in the overlay; stop at the first failing gate)

1. **Parse → preview/confirm** (Phase 1).
2. **Uniqueness.** All column-0 scan filenames must be **unique** under the **same normalization as matching**
   (trim + case-insensitive), so `Sample1` / `sample1 ` count as a duplicate here (a clear "duplicate" error)
   rather than slipping through to a step-5 collision. Duplicates → error listing the non-unique values **by
   record number**; stop.
3. **Existence.** Every column-0 filename must match **≥ 1 eligible `(search, searchScanFileId)`** via the
   cascade. **Report ALL misses at once** (so the user never works through pickers only to discover misses):
   for each unmatched filename, state what was tried (exact → base-name); if it matches **only ineligible**
   search(es), say so with the plain-language reason (e.g. *"this filename is in search «X», which isn't
   available for quant because its sub-groups are spread across shared raw files"*); then list **all eligible
   Limelight scan filenames once at the bottom**. Stop.
4. **Multi-search resolution.** A filename matching **> 1 eligible search** → a per-record **picker** to choose
   which search (→ determines the `searchScanFileId`). A single match **auto-maps** (no picker). *(The cascade
   auto-maps as many records as possible, so a clean file yields zero pickers.)*
5. **Resolved-mapping collision.** Because the cascade can collapse distinct user records onto the same scan
   file (`Sample1.raw` and `Sample1.mzML` both resolving to Limelight `Sample1.mzML`), after resolution **no
   two records may map to the same `searchScanFileId`** → error listing the colliding records by record
   number; stop.
6. **Store (in memory).** Build
   `recordNumber → { userScanFilename, projectSearchId, searchScanFileId, metadataCells[] }` plus the ordered
   `headers`. Held client-side on the interaction/overlay. No DB ingest (future / Track B).

---

## Phase 2 — the new mapping/eligibility webservice (backend + FE loader)

Returns, for a `projectId`, the candidate data the matching needs. Loaded **once when the overlay opens** (so
it's ready before the user finishes choosing a file).

### Response shape (per project)
```
searches: [
  {
    projectSearchId: number,
    searchName: string,
    eligible: boolean,
    ineligibleReason: "SUB_GROUPS_CROSS_CUT_SCAN_FILES" | "SUB_GROUP_SPANS_MULTIPLE_SCAN_FILES" | null,
    scanFiles: [ { searchScanFileId: number, filename: string } ]   // from search_scan_file_tbl
  }
]
```
The FE builds its match index from **eligible** searches' scan files (precomputing `stripExt(filename)` once),
and uses **ineligible** searches only to explain misses (step 3).

### Backend conventions
Backend is Spring MVC under `limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp/`.
- **Controller shape — model on** `spring_mvc_parts/data_pages/rest_controllers/other_like_project/Project_ScanFiles_In_Project_List_RestWebserviceController.java`
  for the `@RestController` / manual `byte[]` JSON in-out / nested-static-DTO style — **but** return the shape
  above, **not** the cross-filename union it builds. **Auth differs from that clone target** (it inlines
  `isPublicAccessCodeReadAllowed()`); use the throwing validator below instead.
- **Path constant:** add to
  `spring_mvc_parts/data_pages/rest_controllers/AA_RestWSControllerPaths_Constants.java` (root `/d/rws/...`).
- **Auth (REST controllers self-authorize): RESEARCHER (assistant-project-owner) level.** Use the throwing
  validator `access_control/access_control_rest_controller/ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds`
  → **`validateAssistantProjectOwnerAllowed([projectId], request)`** (throws 401/403). This matches the
  Add-Experiment gate (`experiment/AddSaveExperiment_RestWebservice.java:189`) and the single-search
  eligibility controller (which is set at researcher level deliberately, so opening quant to researchers later
  is one less change). Do **not** use `validatePublicAccessCodeReadAllowed`.
- **Data / searchers — almost certainly NO new searcher for filenames.**
  - Filenames: reuse `searchers/SearchScanFile_AndAssociatedData_For_SearchIds_Searcher` — it selects
    `search_scan_file_tbl.*` by `search_id IN (...)` and exposes `getSearchId()`, the `search_scan_file_tbl.id`
    (= `searchScanFileId`), and `getFilename()`. Do **NOT** source filenames from `project_scan_filename_tbl`
    / `ProjectScanFile_For_ProjectId_Searcher` (the aliased union) or `scan_file_tbl.filename` (**that column
    does not exist**).
  - Project searches: map `project_search_tbl.id` (= projectSearchId) → `search_id` via the existing
    project-searches searcher.
  - Eligibility: the two shared searchers above, called **only for >1-scan-file searches**.
- **Front-end loader:** model on
  `PP/project_page__scan_files_view_section/all_users_incl_public_user/projectPage_ScanFiles_View_Section_Get_ScanFile_List_FromServer.ts`;
  call via `webserviceCallStandardPost` (`page_js/webservice_call_common/`). On 401/403 the standard handler
  reloads the page — follow the reject-sentinel pattern in `limelight_webapp/front_end/CLAUDE.md`. Prefer the
  loader's `{ data, promise }` synchronous fast-path when already loaded (see `front_end/CLAUDE.md`).

---

## Implementation phases (build in order; each STOP is a review gate)

**Phase 1 — Upload + detect + preview/confirm (pure client).**
- Add `papaparse` + `@types/papaparse` to `package.json`; `npm install` in `front_end/`.
- Replace the overlay-body placeholder in
  `PP/project_page_quant_section/projPg_Quant_Single_Maint_OverlayContainer.tsx` with an upload UI:
  `<input type="file">` + a short note: *"For best results, export as tab-delimited (.tsv/.txt).
  Comma-delimited (.csv) is also accepted."*
- New module(s) under `PP/project_page_quant_section/`: BOM-aware delimiter peek → explicit-delimiter
  PapaParse (`header:false`, `skipEmptyLines:true`, `comments:'#'`); assign record numbers; ≥2-column gate +
  equal-column-count guard; produce the ordered `{ headers, records }`.
- Preview `<table>` (all columns; ≤~200 records else first N + "showing N of M"; horizontal scroll) with the
  **delimiter selector** (re-parses on change) + **Continue / Cancel**. All errors render **in the overlay
  body** (never `window.alert`).
- Verify (type-check + FE build + drive the overlay). **STOP.**

**Phase 2 — New eligibility-filtered mapping webservice + FE loader (backend + FE).** As above; loader loads
once on overlay open and precomputes `stripExt` per eligible filename. Verify with WAR build + deploy. **STOP.**

**Phase 3 — Validation + mapping (steps 1–3).** col-0 uniqueness → existence via the cascade against eligible
candidates → build `recordNumber → matching (projectSearchId, searchScanFileId)[]`. Not-found UX = all misses
at once + per-filename what-was-tried + ineligible-search reasons + full eligible-filename list once at the
bottom. **STOP.**

**Phase 4 — Multi-search picker (step 4) + collision check (step 5).** per-record search picker for filenames
matching > 1 eligible search (single match auto-maps); then reject any two records resolving to the same
`searchScanFileId`.

**Phase 5 — Store the in-memory result (step 6)** on the interaction/overlay (no DB).

---

## Build, typecheck & verify
- **Type-check (front end):** `tsc --noEmit` from `limelight_webapp/front_end/` (a faster `tsgo` may be
  configured — see `front_end/CLAUDE.md`). Keep it clean.
- **Front-end build + deploy to local Tomcat** (FE-only phases 1/3/4/5):
  `ant -f ant_buildFrontEnd_CopyToTomcat.xml` from `limelight_webapp/front_end/`.
- **WAR build + deploy** (backend, Phase 2): `ant -f ant_build_War_CopyToTomcat.xml` from `limelight_webapp/`
  (NOT `ant_create_war.xml`, which builds but does not deploy).
- **Drive the UI as a project owner** on local Tomcat, project page `/d/pg/project/{ownedUnlockedProjectId}`.
  Owner login + local DB creds live in machine-private notes (NOT in this public doc).

## House rules that constrain this feature (do not violate)
- **User messages go in the overlay**, well-formatted — NEVER `window.alert`, never "see the console."
- **Everything must be fully TypeScript-typed** — no `any` sloppiness (the existing Experiment overlay code is
  under-typed; do NOT copy that looseness).
- **Required params over optional**; match surrounding code; see `front_end/CLAUDE.md` (instance-field over
  `this.state`, no memoization, synchronous fast-path when nothing needs loading).
- **No mass computation** is involved; if that ever changes, ask first.
- This doc lives in the PUBLIC repo — keep credentials / private infra paths OUT of it.

## Data model note
Store parsed columns as an **ordered list** (`headers` + per-record `cells`), keyed by **record number** — NOT
header-keyed row objects (PapaParse `header:true` collides on duplicate/blank headers and loses order).

## For future reference (not this step)
- The **column header** is the display label for that column of data.
- **Grouping (future):** scan files whose **metadata columns are identical** are grouped for display —
  grouping *distinct* scan files by shared metadata. **Scan-filename uniqueness is permanent** (the same
  filename never repeats across records), so grouping is purely a display operation over metadata and does not
  conflict with the uniqueness rule.
- **Persistence (future / Track B):** DB ingest of the in-memory result, and the new way of *running* quant
  over what this block creates, plus the new quant data pages.

## Related code (quick index)
- Quant section (built): `PP/project_page_quant_section/projectPage_QuantSection_Root_Component.tsx`,
  `.../projPg_Quant_LoggedInUsersInteraction.ts`, `.../projPg_Quant_Single_Maint_OverlayContainer.tsx`.
- Overlay pattern to model: `PP/project_page_experiments_section/projPg_Expermnts_LoggedInUsersInteraction.ts`,
  `.../projPg_Expermnts_Single_Maint_OverlayContainer.tsx`.
- Webservice shape to model (NOT its auth or data): `Project_ScanFiles_In_Project_List_RestWebserviceController.java`;
  FE loader to model: `PP/project_page__scan_files_view_section/all_users_incl_public_user/projectPage_ScanFiles_View_Section_Get_ScanFile_List_FromServer.ts`.
- Filename searcher to reuse: `searchers/SearchScanFile_AndAssociatedData_For_SearchIds_Searcher`.
- Eligibility: `limelight_features_docs/flashlfq_quant_subgroup_scanfile_eligibility.md`; searchers
  `limelight_shared_code/.../search_sub_group_scan_file/searchers/Search_AnyScanFile_HasPsms_In_MultipleSubGroups_ForSearchId_Searcher`
  + `..._Search_AnySubGroup_HasPsms_In_MultipleScanFiles_ForSearchId_Searcher`; single-search controller
  `FlashLFQ_Quant__AnyScanFile_HasPsms_In_MultipleSubGroups__Single_ProjSearchID_RestWebserviceController`.
