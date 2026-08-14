# "Add New Quant" — file upload, parse & search-mapping — IMPLEMENTATION HANDOFF (standalone, 2026-08-14)

> ## ⚠️ SUPERSEDED — do not implement from this doc
> **Replaced by `quant_add_new_quant__file_upload_parse_plan_v2_2026-08-14.md` (v2).** v2 is the source of
> truth. It corrects/extends this doc with: the **sub-group / scan-file eligibility gate** (candidate searches
> must have sub-groups ↔ scan files 1:1, or no sub-groups, or a single scan file); match target granularity
> **`(projectSearchId, searchScanFileId)`**; **record number** as the stable row key; parser-owned BOM /
> CRLF / blank-line handling (no hand-rolled normalization); `#` comment lines; case-**insensitive** matching;
> and researcher-level auth (`validateAssistantProjectOwnerAllowed`). Kept here for history only.

Status: **Design fully locked; ready to implement.** This doc is written to be implemented by a **fresh
session with NO prior conversation context** (it is self-contained). The overlay shell that hosts this
feature is ALREADY built (see "Current state"); what remains is the upload → detect → preview → validate →
map pipeline, plus one new backend webservice (read-only — no DB writes — but researcher-gated).

**Scope:** mostly front-end (TypeScript/React), PLUS **one new backend webservice** (Phase 2) for the
scan-filename→search mapping — it only **reads** (no DB writes) but is **researcher-gated**
(`validateAssistantProjectOwnerAllowed`, §Webservice conventions), not public. The parsed result is held
**in memory only** this step.

All repo paths below are relative to the repo root
`limelight-core/`. Front-end root: `limelight_webapp/front_end/src/js/`.
FE project-page dir (referenced as `PP/`): `limelight_webapp/front_end/src/js/page_js/data_pages/other_data_pages/project_page/`.

## Current state — ALREADY BUILT (start here)

The project page (`/d/pg/project/{projectId}`) has a **Quant** section (rendered just before "Experiments"),
added and runtime-verified. Files (under `PP/`):
- `project_page_quant_section/projectPage_QuantSection_Root_Component.tsx` — the collapsible **"Quant"**
  section + the **"Add New Quant"** button. Button onClick →
  `projectPage_QuantSection_LoggedInUsersInteraction.createNewQuantButtonClicked()`. The button renders only
  when the interaction prop is present = **owner/researcher on a non-locked project** (same gate as "Create
  New Experiment"); the **section itself is visible to all users incl. public**.
- `project_page_quant_section/projPg_Quant_LoggedInUsersInteraction.ts` — opens/closes the overlay,
  parametrized by `quantId: number | undefined` (create vs future edit). `createNewQuantButtonClicked()` →
  `_open_New_Update_QuantOverlay({quantId:undefined})`: hides `data_page_outermost_div`, appends a `<div>` to
  `<body>`, mounts the overlay container React root there. `closeOverlay()` unmounts + restores.
- `project_page_quant_section/projPg_Quant_Single_Maint_OverlayContainer.tsx` — the full-viewport overlay
  **shell** (header "Add Quant"/"Edit Quant" + green X close, `beforeunload` guard, session keepalive). **The
  overlay BODY is an empty placeholder — THIS is where the upload/parse UI goes:** the
  `<div className="top-level single-entry-variable-height" style={{ overflowY:"auto" }}>` holding the comment
  `{/* Overlay body content goes here - to be implemented. */}`.
- Threading: the interaction is constructed for owner + researcher (non-locked) in `PP/projectPage_Root_ProjectOwnerUser.ts`
  and `PP/projectPage_Root_ResearcherUser.ts`, passed `null` in the locked/public roots, and flows through
  `PP/project_page_main_page_react_based/project_page_ReactParts_ROOT_Component/projectPage_ROOT_Container_Containing_MultipleSections_Component.tsx`.

This overlay is the **cloned Add-Experiment-style overlay** (NOT the standard Limelight modal). Model new
work on the Experiments section (`PP/project_page_experiments_section/`, esp. `projPg_Expermnts_*`). New
modules for this feature go under `PP/project_page_quant_section/`.

**Overlay body layout constraint:** the container uses `modal-overlay-flexbox-overflow-control-no-header-container`
(flex column). Direct children must be `top-level fixed-height` (content-sized) or the single
`top-level single-entry-variable-height` (fills remaining height, scrolls). Put scrolling body content in the
variable-height entry.

## Locked decisions

### 1. Accepted formats: TSV or CSV, parsed client-side
- The uploaded file is either **tab-delimited (TSV)** or **comma-delimited (CSV)**.
- Parsing happens in JavaScript/TypeScript in the browser (no server round-trip for parsing).

### 2. Delimiter detection — HEADER LINE ONLY (superseded by §7 — presence + user override)
Detect the delimiter from the **first non-empty line (the header)**, not from the whole file. **See §7 for
the final rule** (presence-based precedence tab → comma → semicolon, plus a user-selectable override in the
preview). The count-based tie-break originally sketched here is REMOVED — the preview delimiter selector
lets the user correct any mis-detect, so no header counting is needed.

Rationale for header-only detection: a genuine comma-CSV can contain a tab inside a quoted free-text field;
a whole-file "any tab → TSV" test would misclassify it and mangle every row. The header essentially never
has embedded delimiters and it defines the columns, so it is the reliable place to detect.

### 3. Parsing library: PapaParse (+ `@types/papaparse`)
- Use **PapaParse** for the actual tokenizing. Chosen because it is the de-facto browser CSV parser
  (~12k GitHub stars, ~5M+ npm downloads/week — well-used, not obscure) and it correctly handles the
  messy-Excel cases a hand-rolled `split()` gets wrong: quoted fields, embedded commas/newlines,
  `""`-escaped quotes, and a leading BOM. Most users are expected to export from Excel / spreadsheets
  (common in the scientific community), so robustness to those exports matters.
- Add both **`papaparse`** and **`@types/papaparse`** (DefinitelyTyped) to `package.json`. Requires a
  separate **`npm install`** (npm install is run outside the Gradle build — see `front_end/CLAUDE.md`).
- Runner-up considered: **`d3-dsv`** (smaller, ships its own TS types) — not chosen because PapaParse is
  more turnkey for Excel-export quirks. Revisit only if footprint becomes a concern.

### 4. How our detection drives PapaParse
Keep our own header check as the decision-maker, then hand the result to Papa (do NOT rely on Papa's
auto-detect — explicit is deterministic and lets us own the error messages):
1. Read file → text.
2. Strip a leading **BOM** (`﻿`); normalize **CRLF/CR → LF**; drop trailing blank line(s).
3. Header-line detection (§2/§7) → chosen delimiter, or overlay error.
4. Call PapaParse with the **explicit** delimiter (`delimiter: '\t'`, `','`, or `';'`) and **`header: false`**
   (parse to `string[][]`); take **row 0 as the header row yourself**. Do NOT use Papa's `header:true` — it
   builds header-keyed objects that collide on duplicate/blank headers and lose column order (see §12).
5. Validation (below); all errors surfaced **in the overlay** (never `window.alert` — house rule).

### 5. Robustness guards (regardless of delimiter)
- Strip leading BOM; normalize CRLF/CR → LF; drop trailing blank lines.
- **Empty file / header-only** → error.
- **At least 2 columns required:** col 0 is the scan-filename key, so the header must have **≥ 2 columns**
  (key + at least one metadata column). A single-column file (no delimiter found, or one column after
  parsing) → clear error: "File needs at least one metadata column in addition to the scan-filename column."
  (A lone list of scan filenames is intentionally NOT supported — confirmed 2026-08-14.)
- **Column-count consistency:** every row's column count (header and each data row) must be equal; mismatch
  → error in the overlay (also catches a wrong-delimiter guess cheaply).

### 6. UI guidance: recommend tab-delimited
Surface a short note in the overlay's upload area, e.g.:
> "For best results, export as tab-delimited (.tsv/.txt). Comma-delimited (.csv) is also accepted."

Rationale to reinforce the recommendation: tabs essentially never appear inside spreadsheet cell values, so
TSV sidesteps quoted-comma ambiguity **and** the European-Excel gotcha (those locales export CSV with `;`
as the delimiter and `,` as the decimal separator, which a comma parse would get wrong).

## PLAN continuation (2026-08-14): delimiter #3, preview, file semantics, mapping

### 7. Delimiter detection — presence + precedence, with a user-selectable override (FINAL, supersedes §2)
Three candidate delimiters: **tab (`\t`), comma (`,`), semicolon (`;`)**. PapaParse handles any single-char
delimiter (`;` is in its default auto-detect set), so all three are cheap. **Do NOT count occurrences** —
auto-pick by presence on the header line, then let the user override:
1. header contains a **tab** → **TSV** (`\t`).
2. else header contains a **comma** → **CSV** (`,`).
3. else header contains a **semicolon** → **`;`**.
4. none present (single-column header) → **overlay error** (must be tab-, comma-, or semicolon-delimited).
   (See also §10's ≥2-column gate: a lone scan-filename column with no metadata is rejected.)

**User override (the reason counting is unnecessary):** the preview (§8) shows the auto-picked delimiter
**by name** alongside a **delimiter selector** (Tab / Comma / Semicolon). If the auto-pick parsed the file
wrong (e.g. a European `;`-CSV whose header also contains `,`), the user switches the selector and the file
**re-parses** with the chosen delimiter. This makes detection deterministic and hands the ambiguous
`;`-vs-`,` case to the user instead of a fragile heuristic. Precedence above is just the default the user
can correct.

### 8. Preview + confirm before continuing
After detection, show in the overlay:
- The **detected delimiter by name** ("Tab" / "Comma" / "Semicolon") **as a selector the user can change**
  (§7). Changing it **re-parses** the whole file with the chosen delimiter and refreshes the preview.
- A `<table>` preview: **all columns**; parse the **whole** file but render only a capped slice — **all rows
  if ≤ ~200, else first N rows with "showing N of M"** (protects the DOM); horizontal scroll for many columns.
- **Continue / Cancel.** Continue gates the validation + mapping below.

### 9. File semantics — first column is the scan-filename key
- **Column 0 = key = scan filename** (regardless of that column's header text). The remaining columns are
  **metadata** about that scan filename, used later for display and grouping.
- The scan filename is used to **map each row to a project search**: match the filename against the
  searches in this project to associate a search with that scan filename for this quant.

### 9a. Matching semantics (decided 2026-08-14)
- **Literal, per-search match.** A user's scan filename maps to the search(es) whose OWN recorded scan
  filename equals it. Within a single search a scan file has exactly one filename, so this is a
  per-`(projectSearchId, scanFilename)` comparison.
- **NO cross-search alias reconciliation.** Do NOT use the physical-scan-file alias union
  (`scanFilename_Array` from the aggregated list endpoint). The fact that the same physical scan file may
  appear under a different filename in another search is the **user's** responsibility to track — we do not
  surface or reconcile it.
- **Normalization:** **trim surrounding whitespace, then compare case-INsensitively.** Use the browser's
  case-insensitive compare — `a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0` (ignores case
  but stays accent- and digit-distinct). (Decided 2026-08-14 — changed from case-sensitive: filenames from
  Windows-origin workflows routinely differ only in case, and a case-sensitive miss reads as a product bug.)
  Trim first, then apply this compare at **every** cascade level below.
- **Extension (decided 2026-08-14): progressive-relaxation cascade.** Motivation: the filename the user
  knows may differ from what Limelight stored — e.g. the user submits a workflow naming the `.raw` file, the
  workflow generates and sends the `.mzML` to Limelight. Per user filename, try in order and **STOP at the
  first level that yields any match:**
  1. **Exact:** `userName == limelightName`.
  2. **vs Limelight base:** `userName == stripExt(limelightName)` — covers the user giving no extension.
  3. **base vs base** (only if `userName` has an extension): `stripExt(userName) == stripExt(limelightName)`
     — covers `Sample1.raw` (user) vs `Sample1.mzML` (Limelight).
  All comparisons trim + case-INsensitive (per Normalization above). **Precompute `stripExt(limelightName)`
  once at load** (only strip once). `stripExt` = remove text after the final `.` (**confirmed 2026-08-14:
  last extension only** — so double extensions like `.mzML.gz` lose only `.gz`; Bruker `.d` is a directory,
  left as-is).
  - **Known gap, intentionally deferred (2026-08-14):** because `stripExt` removes only the LAST extension,
    a user filename with **no** extension will not match a Limelight name with a **double** extension
    (e.g. user `Sample1` vs Limelight `Sample1.mzML.gz` — level 2 compares against `Sample1.mzML`, level 3
    is gated on the user filename having an extension). This case is rare; **ship the 3 levels as-is** and
    revisit only if it comes up in practice (do not pre-emptively add broader relaxation — each extra level
    trades a rare miss for more false collisions, §10.5).
- **Not-found error:** for each unmatched user filename, explain what was tried (exact → base-name); then
  list **all Limelight scan filenames once at the bottom** (not repeated per miss) so the user can correct.
- **Because relaxation can collapse distinct user rows onto one Limelight scan file, a resolved-mapping
  collision check is required — see §10.**

### 10. Validation + mapping pipeline (all errors shown IN the overlay; stop at the first failing gate)
1. Parse (§1–§6) → **preview/confirm** (§8).
2. **Uniqueness:** all col-0 scan filenames must be **unique** — compared with the **same normalization as
   matching** (trim + case-insensitive, §9a), so `Sample1` / `sample1 ` count as a duplicate here (a clear
   "duplicate" error) rather than slipping through to a confusing §10.5 collision. Duplicates → error
   listing the non-unique scan filenames; processing stops.
3. **Existence:** every col-0 scan filename must match **at least one search** in this project via the §9a
   cascade. Any with no match at any cascade level → error (per-filename: what was tried; plus the full
   Limelight-filename list at the bottom); processing stops.
4. **Multi-search resolution:** any scan filename matching **more than one search** (including matches
   surfaced only by cascade relaxation) → show a UI, one per such scan filename, for the user to **select
   which search** to use. (Single match auto-maps; no UI.)
5. **Resolved-mapping collision:** because the cascade can collapse distinct user rows onto the same
   Limelight scan file (e.g. `Sample1.raw` and `Sample1.mzML` both resolving to Limelight `Sample1.mzML`),
   after resolution **no two user rows may map to the same (search, scan file)** → error listing the
   colliding rows; processing stops.
6. **Store** the resulting `scanFilename → chosen projectSearchId` map **plus the remaining columns**
   (retained with their **column header text**). For now this is held **client-side / in memory**
   (no DB ingest — that is future / Track B).

### 11. Data source for the mapping (CORRECTED 2026-08-14 — use `search_scan_file_tbl.filename`)
Matching filenames → searches needs **per-`(projectSearchId, scanFilename)`** data from the server.

**The correct filename source is `search_scan_file_tbl.filename`** — the filename a search itself recorded.
Verified against the schema (`database_scripts/install/001_create_empty_database.sql:1334`): the row is
`(id, search_id, filename VARCHAR(255) NOT NULL, scan_file_id INT NULL)`, `UNIQUE (search_id, filename)`,
table comment *"Scan file in a search. May only be the filename. May be actual scan file uploaded."* Two
consequences:
- `filename` is **NOT NULL and present even when `scan_file_id` is NULL** (filename-only searches — a normal
  case per the comment). So do **NOT** join through to a physical scan file to get the name.
- The `UNIQUE (search_id, filename)` index is what guarantees §9a's "within a single search a scan file has
  exactly one filename."

**Do NOT use** these (each was named in an earlier draft and is wrong):
- `scan_file_tbl.filename` — **that column does not exist** (`scan_file_tbl` is `id`,
  `spectral_storage_api_key`, `file_object_storage_main_entry_id_fk`, `create_date`;
  `001_create_empty_database.sql:525`).
- `project_scan_filename_tbl.scan_filename` — this is the **per-project-scan-file** name with **multiple
  rows per file** (the alias union `scanFilename_Set` the aggregated list endpoint builds, exactly the
  aliasing §9a rejects). It is what `ProjectScanFile_For_ProjectId_Searcher` reads — do not model on it.
- The aggregated list endpoint `d/rws/for-page/scan-files-in-project-list` (groups by physical scan file,
  unions filenames).

**Existing searcher — likely no new searcher needed.**
`org.yeastrc.limelight.limelight_webapp.searchers.SearchScanFile_AndAssociatedData_For_SearchIds_Searcher`
already does `SELECT search_scan_file_tbl.* WHERE search_id IN (...)` and returns `getSearchId()` +
`getFilename()`. Flow: get the project's searches (you already have `projectSearchId ↔ searchId` on the
project page; or a project-searches searcher) → call this searcher with those `searchId`s → remap
`searchId → projectSearchId` → return one row per `(projectSearchId, filename)`. So this step needs a **new
webservice controller** but almost certainly **no new searcher**. It is NOT purely front-end (a server read
is required); parsing itself stays client-side.

### 12. Data model note
Store parsed columns as an **ordered list (header + cells)**, NOT header-keyed row objects — so duplicate
or blank header text and column order survive (PapaParse `header:true` collides on duplicate headers).

### For future reference (not this step)
- The **column header** is the display label for that column of data.
- **Grouping (future):** scan files whose **metadata columns are identical** are grouped together for
  display — interpretation **(B)**, grouping *distinct* scan files by shared metadata. **Scan-filename
  uniqueness is PERMANENT (confirmed 2026-08-14)** — the same filename never repeats across rows; grouping
  is purely a display operation over the metadata columns, so there is no conflict with the uniqueness rule.

## Explicitly out of scope / not supported (this step)
- **File extension is NOT used** for detection — purely content-based (extensions lie). The `.tsv/.csv`
  hints only inform the UI copy.
- No server-side **parse**; no DB ingest. (A server **read** for scan-file↔search mapping IS needed — §11.)

## Decided (2026-08-14)
- **Filename matching semantics** (§9a): literal per-search, no cross-search alias, trim + **case-INsensitive**
  (localeCompare `sensitivity:'accent'`); extension **progressive-relaxation cascade** (**ship 3 levels
  as-is**, double-extension-vs-no-user-extension gap deferred); `stripExt` = last extension only;
  **resolved-mapping collision check** (§10.5).
- **Mapping data source** (§11): **new webservice controller** returning per-`(projectSearchId, filename)`
  from **`search_scan_file_tbl.filename`**, reusing `SearchScanFile_AndAssociatedData_For_SearchIds_Searcher`
  (no new searcher). Auth = **`validateAssistantProjectOwnerAllowed`** (researcher level).
- **Delimiter** (§7): presence-based auto-pick (tab → comma → semicolon) + **user-selectable override** in
  the preview (no occurrence counting).
- **≥2 columns required** (§5): single-column files rejected with a clear error.
- **Persistence:** **in memory client-side only** this step (no DB).
- **Grouping / uniqueness:** interpretation **(B)** — grouping *distinct* scan files by identical metadata;
  **scan-filename uniqueness is permanent** (the same filename never repeats).

## Open questions (decide before/with implementation)
- Where the new parsing/upload module(s) live (likely under `.../project_page_quant_section/`) and the
  exact upload-UI component that replaces the overlay's placeholder body — I'll default to
  `.../project_page_quant_section/` unless told otherwise.

## Implementation phases (build in this order; each STOP is a natural review gate)

**Phase 1 — Upload + detect + preview/confirm (pure client).**
- Add `papaparse` + `@types/papaparse` to `limelight_webapp/front_end/package.json`; run **`npm install`** in
  `limelight_webapp/front_end/` (npm install is NOT run by the Gradle/Ant build).
- Replace the overlay-body placeholder in `PP/project_page_quant_section/projPg_Quant_Single_Maint_OverlayContainer.tsx`
  with an upload UI: `<input type="file">` + the §6 "recommend tab-delimited" note.
- New module(s) under `PP/project_page_quant_section/`: read file text; strip BOM; normalize CRLF/CR→LF; drop
  trailing blank lines; header-line delimiter detection (§7: presence precedence tab → comma → semicolon;
  none → error); PapaParse with explicit delimiter + `header:false` (§4); ≥2-column gate + column-count
  guard (§5). Produce an **ordered** `{ headers: string[]; rows: string[][] }` (§12).
- Preview `<table>` (§8: all columns; all rows if ≤~200 else first N + "showing N of M"; horizontal scroll)
  with a **delimiter selector** (Tab / Comma / Semicolon) that re-parses on change (§7/§8) +
  **Continue / Cancel**. All errors render **in the overlay body** (never `window.alert`).
- Verify (type-check + FE build + drive the overlay). **STOP for review.**

**Phase 2 — New mapping webservice + client loader (backend + FE).** See "Webservice conventions" + §11.
New controller returns per-`(projectSearchId, filename)` for a projectId, sourced from
**`search_scan_file_tbl.filename`** via the existing `SearchScanFile_AndAssociatedData_For_SearchIds_Searcher`
(no new searcher expected); auth = `validateAssistantProjectOwnerAllowed`. FE loader loads once when the
overlay opens and precomputes `stripExt` per filename (§9a). Verify with WAR build+deploy. **STOP for review.**

**Phase 3 — Validation + mapping pipeline (§10.1–§10.3).** col-0 uniqueness → existence via the §9a
extension cascade → build `userFilename → matching projectSearchIds`. Not-found error UX (§9a: per-filename
what-was-tried + full Limelight-filename list once at the bottom). **STOP.**

**Phase 4 — Multi-search resolution UI (§10.4) + collision check (§10.5).** per-filename search picker for
filenames matching >1 search (single match auto-maps); then reject any two user rows resolving to the same
(search, scan file).

**Phase 5 — Store the in-memory result (§10.6)** on the interaction/overlay (no DB).

## Build, typecheck & verify
- **Type-check (front end):** `tsc --noEmit` from `limelight_webapp/front_end/` (a faster `tsgo` may be
  configured — see `limelight_webapp/front_end/CLAUDE.md`). Type errors fail the build; keep it clean.
- **Front-end build + deploy to local Tomcat** (FE-only changes, Phases 1/3/4/5):
  `ant -f ant_buildFrontEnd_CopyToTomcat.xml` from `limelight_webapp/front_end/` (~10s).
- **WAR build + deploy** (backend/JSP, Phase 2): `ant -f ant_build_War_CopyToTomcat.xml` from
  `limelight_webapp/` (NOT `ant_create_war.xml`, which builds but does not deploy).
- **Drive the UI as a project owner** on the local Tomcat, project page `/d/pg/project/{ownedUnlockedProjectId}`.
  Owner login + local DB creds live in machine-private notes (NOT in this public doc). A zero-dep
  headless-Chrome CDP harness is under `.claude/session_handoffs/` (gitignored); it was used to verify the
  Quant section + overlay open/close. DB ground-truth via the local dev MySQL (creds off-repo).

## Webservice conventions (Phase 2 — the new mapping webservice)
Backend is Spring MVC under `limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp/`.
- **Model to clone (for controller shape only):** `spring_mvc_parts/data_pages/rest_controllers/other_like_project/Project_ScanFiles_In_Project_List_RestWebserviceController.java`
  (same feature area) — but return **per-`(projectSearchId, filename)`** rows from `search_scan_file_tbl`
  (§11), NOT the cross-filename union `scanFilename_Set` it builds from `project_scan_filename_tbl`.
  **Caution — auth differs:** this clone target does NOT use the throwing validator below; it inlines
  `getWebSessionAuthAccessLevelForProjectIds` + `isPublicAccessCodeReadAllowed()`. Use the throwing
  validator (next bullet) for the new controller, not the clone target's inline read-level check.
- **Path constant:** add to `spring_mvc_parts/data_pages/rest_controllers/AA_RestWSControllerPaths_Constants.java`
  (root `/d/rws/...`). REST endpoints are `@RestController` with **manual `byte[]` JSON in/out** and nested
  static DTO classes — match the neighbor's style.
- **Auth (required — REST controllers self-authorize): require RESEARCHER (assistant-project-owner) level**,
  matching the "Add New Quant" button gate = the Add-Experiment gate. Use the THROWING validator
  `access_control/access_control_rest_controller/ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds`
  → **`validateAssistantProjectOwnerAllowed([projectId], request)`** (throws 401/403). This is exactly what
  the Add-Experiment save webservice uses (`experiment/AddSaveExperiment_RestWebservice.java:189`). Do NOT
  use `validatePublicAccessCodeReadAllowed` (public read) — this endpoint is only used inside the
  owner/researcher create-quant overlay. Details: `limelight_webapp/CLAUDE.md` §Authorization.
- **Data / searcher (§11): almost certainly NO new searcher.** Reuse
  `searchers/SearchScanFile_AndAssociatedData_For_SearchIds_Searcher` — it selects `search_scan_file_tbl.*`
  by `search_id IN (...)` and exposes `getSearchId()` + `getFilename()`. Get the project's searches
  (`project_search_tbl.id` = projectSearchId → `search_id`) via the existing project-searches searcher, call
  the above with those `searchId`s, remap `searchId → projectSearchId`, and return one row per
  `(projectSearchId, filename)`. **Do NOT** build a searcher over `project_scan_filename_tbl` /
  `ProjectScanFile_For_ProjectId_Searcher` — that is the aliased source §9a/§11 rejects.
- **Front-end loader:** model on
  `PP/project_page__scan_files_view_section/all_users_incl_public_user/projectPage_ScanFiles_View_Section_Get_ScanFile_List_FromServer.ts`;
  call via `webserviceCallStandardPost` (`page_js/webservice_call_common/`). On 401/403 the standard handler
  reloads the page — follow the reject-sentinel pattern in `limelight_webapp/front_end/CLAUDE.md`.

## House rules that constrain this feature (do not violate)
- **User messages go in the overlay**, well-formatted — NEVER `window.alert` and never "see the console".
  (See the modal-overlay / no-alert guidance in `limelight_webapp/front_end/CLAUDE.md`.)
- **Everything must be fully TypeScript-typed** — no `any` sloppiness (the existing Experiment overlay code
  is under-typed / "first React attempt"; do NOT copy that looseness).
- **Required params over optional** and other preferences: match surrounding code; see the front-end CLAUDE.md.
- **No mass computation** is involved here; if that ever changes, ask first (global rule).
- This doc lives in the PUBLIC repo — keep credentials / private infra paths OUT of it.

## Related code (quick index)
- Quant section (built): `PP/project_page_quant_section/projectPage_QuantSection_Root_Component.tsx`,
  `.../projPg_Quant_LoggedInUsersInteraction.ts`, `.../projPg_Quant_Single_Maint_OverlayContainer.tsx`.
- Overlay pattern to model: `PP/project_page_experiments_section/projPg_Expermnts_LoggedInUsersInteraction.ts`,
  `.../projPg_Expermnts_Single_Maint_OverlayContainer.tsx`.
- Scan-file list (wrong granularity, but the loader/controller to model on): FE
  `PP/project_page__scan_files_view_section/all_users_incl_public_user/projectPage_ScanFiles_View_Section_Get_ScanFile_List_FromServer.ts`;
  backend `Project_ScanFiles_In_Project_List_RestWebserviceController.java`.
