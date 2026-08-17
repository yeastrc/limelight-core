# Add-New-Quant — Submit ONE joint FlashLFQ run + view on new data page(s) — PLAN (2026-08-17)

**Status: decisions RESOLVED; executable plan. NOT yet implemented — do not write code until Dan gives the
go-ahead for a phase.** This doc is the single source of truth (it supersedes the earlier "open Q1–Q7"
framing and the ephemeral plan-mode file `~/.claude/plans/wait-i-thought-we-temporal-badger.md`). Skeptical
bar: reuse claims cited to source `file:line`; a couple of items marked *(unverified)*.

This is a **new, independent quant subsystem**. It does **not** modify the existing per-(search, scan file)
FlashLFQ feature (`FlashLFQ_Run__Request_Creation_RestWebserviceController` + the peptide/protein-page quant
column), which stays as-is. No Model-A/B framing — nothing is a reversal.

**Build order (decided):** **Phase A = Submit side first** (project page → new Submit controller), then
**Phase B = a minimal raw peptide-TSV viewer** as the initial link target. The full Quant peptide page and
DB-backed pieces are later phases.

---

## 1. What this feature does (end to end)

The **"Add New Quant"** upload → parse → map flow (already built + verified, in the working tree) ends at an
in-memory mapping store on the overlay container instance field `_inMemoryMappingStore`. This feature:

1. **Submit (Phase A).** A **new dedicated Submit controller** gathers PSMs for every mapped scan file (using
   server-side **default** cutoffs) and sends **ONE FlashLFQ run over ALL mapped scan files** (one multi-file
   request). MBR is always on (see D-MBR); normalize is a user choice defaulting on.
2. **Key.** The FlashLFQ **service generates and returns its own random `request_id`** (`uuid4().hex`); we do
   **not** mint our own and we do **not** change the service.
3. **Hash (no DB).** The new page's URL = `projectId` in the path + a **composite hash** in the fragment:
   reuse the existing peptide-page format `projectSearchId_searchScanFileId_requestId` (`-`-joined) with
   **every entry sharing the one joint-run `request_id`**, optionally prefixed with a **`quant_run_`** scheme
   marker. The marker + the `(psid, ssfid)` pairs live **only in the Limelight URL hash**; the service still
   only ever sees `request_id`. This puts the projectSearchId set in the hash — what the later peptide page
   needs to re-derive identity→reportedPeptideId — with **no persistence**.
4. **Project-page run list (no DB).** Submitted runs are held in **project-page JS**; a **"Refresh"** button
   re-polls their status; each **completed** run is a link that opens the viewer in a **new tab**. The list is
   session-scoped (lost on project-page reload — acceptable interim).
5. **View (Phase B).** The raw viewer page fetches the run's `QuantifiedPeptides.tsv` by `request_id` (via a
   webapp proxy) and dumps it verbatim into a `<pre>`.

### Input contract (the in-memory store — already built)
From `projPg_Quant_UploadParse_BuildInMemoryStore.ts`, held on `projPg_Quant_Single_Maint_OverlayContainer`
instance field `_inMemoryMappingStore`:
```ts
{
  metadataHeaders: string[]                 // parsed headers[1..], ordered
  mappedRecords: [{
    recordNumber: number
    userScanFilename: string
    projectSearchId: number
    searchScanFileId: number                // search_scan_file_tbl.id
    metadataCells: string[]                 // aligned 1:1 with metadataHeaders
  }]
}
```
The completed upload/parse feature (files, overlay components, CDP harness) is documented in the gitignored
handoff `.claude/session_handoffs/quant_add_new_FEATURE_COMPLETE_SESSION_HANDOFF.md`. The Submit button +
normalize checkbox + "MBR is on" message go in **that overlay's terminal state** (after the store is built).

---

## 2. Settled decisions

| # | Decision |
|---|----------|
| D1 | Independent subsystem; existing per-search quant untouched. |
| D2 | **New dedicated Submit controller** (no branch in the existing controller). |
| D3 | Results shown **only on new data page(s)** — not injected into existing tables. |
| D4 | **Run identifier = the FlashLFQ service's own random `request_id`.** No service change; we do not mint our own id. |
| D5 | **Composite hash, no DB:** `quant_run_` marker + `psid_ssfid_requestId` pairs (all sharing one `request_id`), in the URL hash only. Metadata labeling + cross-session listing need the DB (deferred). |
| D6 | **Server-side default PSM/Peptide cutoffs** decide what PSMs are sent. |
| D7 | **Sample key sent to the service = `searchScanFileId`** (not `scan_file_tbl.id`) so results parse back per (search, scan file) — see §4. |
| D8 | **Reuse via extraction:** move the gather/DTO/send logic into a `services/` class (public static nested request/response) and **repoint the existing controller** at it (no duplication). |
| D9 | **New projectId-keyed status webservice**; runs held in project-page JS; Refresh polls; links open a new tab. |
| D-MBR | **MBR always ON** (`--mbr` is a switch defaulting TRUE and cannot be disabled from the CLI — `flashlfq_command.py:14-17, 51`); show a "MBR is on" message, no toggle. |
| D-NRM | **normalize = user choice, default ON** (`--nor` is a controllable switch — `flashlfq_command.py:49, 112-116`); submit UI = a checkbox defaulting on. |
| D-Q7 | **Include static mods in the grouping identity NOW** (identity mass = total mod mass = static+variable); Dan deletes all existing FlashLFQ runs after it lands. See §7. |
| D-AUTH | Submit = project **OWNER**; viewer page + retrieval/status webservices = project **READ**. |
| D-SCOPE | Viewer does **not** verify the run's scan files belong to the project this slice (temporary + isolated/alt server context) — code comment only; real check deferred to the DB phase. |

---

## 3. Reuse map (verified against source)

### Directly reusable (server side)
- **PSM gathering, cutoffs-only, per search** — `process_Single_Search_Entry` /
  `process_Single_ReportedPeptide_And_Its_PSMs`
  (`FlashLFQ_Run__Request_Creation_RestWebserviceController.java:733-1097`). Depends only on
  `SearcherCutoffValuesSearchLevel`; pulls reported peptides + PSMs, computes neutral mass via
  `PeptideMassCalculator` (`:1124-1125`), stamps the grouping identity. (Being extracted per D8.)
- **Scan-file → spectr API key + filename** — `gather_ScanFiles` (`:681-727`): each `SearchScanFileDTO` gives
  `searchScanFileId` (`:715`), `scanFileId` (`:700, 716`), `scanFileDAO.getSpectralStorageAPIKeyById` (`:707`).
- **Grouping identity** — `FlashLFQ_GroupingIdentity_Common.buildFlashLFQ_GroupingIdentity`
  (`FlashLFQ_GroupingIdentity_Common.java:67-101`). Single source of truth; used on both submit and
  re-derive. **Q7 changes this** (§7).
- **Default cutoffs (D6)** — `SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds`
  (`.../search_data_lookup_parameters_code/main/...:74-80`) builds a `SearchDataLookupParamsRoot` from default
  cutoffs; `ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList(...)`
  has a default-cutoffs fast path (`ReportedPeptide_MinimalData_For_ProjectSearchId_DefaultCutoffsSearcher:44-57`).
  Convert params root → `SearcherCutoffValuesRootLevel` via
  `searcherCutoffValuesRootLevel_Factory.createSearcherCutoffValuesRootLevel_From_WebserviceRequestCutoffs`
  (`FlashLFQ_Run__Request_Creation...:487-492`).
- **Request DTOs already support many files** — `Request_To_FlashLFQ_Service_Root.spectral_data` is a `List`
  (`:1353-1386`); today it sends one-element lists (`:634-649`). (Being extracted per D8.)
- **HTTP send** — `sendRequestToServer(...)` POST `<base>/requestNewFlashLFQRun` (`:1174-1320`; base URL from
  `ConfigSystemsKeysSharedConstants.RUN_FLASHLFQ_SERVICE_WEB_SERVICE_BASE_URL`). Returns the service `request_id`.
- **Raw-TSV retrieval proxy template** — `FlashLFQ_Run__Result_Retrieval_RestWebserviceController.java` (full
  file is a clean copy target: config lookup, `HttpURLConnection` GET, `^[0-9a-f]{32}$` validation, 404/500).

### The FlashLFQ service already does a joint multi-file run — NO service change
*(verified by file read, active clone `/data/code_checkouts/Github/limelight-flashlfq-service/GIT_CLONE/limelight-flashlfq-service`)*
- Request carries `spectral_data: List<SpectralStorageFile>`, one per scan file (`app/request_models.py:118-137, 63-77`).
- FlashLFQ invoked **once** over a dir of all mzML (`app/flashlfq_command.py:101-118`,
  `app/request_processor.py:65-115, 135-138`) → MBR + normalization apply (`flashlfq_command.py:55-83`).
- Output `QuantifiedPeptides.tsv` / `QuantifiedProteins.tsv`: one `Intensity_scanfile_id_<id>` column per file,
  named from the `scan_file_id` we send (`request_processor.py:73-74, 117-120`,
  `flashlfq_identifications_tsv_writer.py:16-24`).
- Async: POST returns `{request_id}` (`app/web_listener.py:65-75`); status/result by `request_id`
  (`web_listener.py:83-126`); `request_id = uuid4().hex`, validated `^[0-9a-f]{32}$` (`:29, 65`).

---

## 4. Phase A — Submit side (project page → new Submit controller)

### Backend
- **REST path constant** in `.../rest_controllers/AA_RestWSControllerPaths_Constants.java`:
  `QUANT_ADD_NEW__SUBMIT_JOINT_FLASHLFQ_RUN__FOR_PROJECT_ID = "d/rws/for-page/quant-add-new--submit-joint-flashlfq-run"`.
  *(`QUANT_ADD_NEW__FLASHLFQ_PEPTIDE_RESULT_FILE__FOR_PROJECT_ID = "d/rws/for-page/quant-add-new--flashlfq-peptide-result-file"`
  was already added this session — present, uncommitted, in the working tree. Do not re-add it.)*
- **Extract to a shared service (D8):** move `process_Single_Search_Entry` /
  `process_Single_ReportedPeptide_And_Its_PSMs` (`:733-1097`), the request DTOs (`:1353-1522`), and
  `sendRequestToServer` (`:1174-1320`) out of `FlashLFQ_Run__Request_Creation_RestWebserviceController` into a
  **new service under `limelight_webapp/src/main/java/.../services/`**, with the **request + response as
  `public static` nested classes inside that service class** (not a separate package). **Change the existing
  controller to call the extracted service.** `FlashLFQ_GroupingIdentity_Common` is already standalone.
- **New Submit controller** `.../rest_controllers/other_like_project/Quant_AddNew_Submit_JointFlashLFQ_Run_RestWebserviceController.java`:
  - Request `{ projectIdentifier, mappedFiles:[{projectSearchId, searchScanFileId}], normalize:boolean }`.
  - Auth = **OWNER**: `ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.validateProjectOwnerAllowed(...)`;
    re-verify every `projectSearchId`/`searchScanFileId` belongs to the project; backstop-reject open-mod /
    dynamic-mod searches (mirror the eligibility controller).
  - Distinct projectSearchIds → default-cutoffs params root → per-search `SearcherCutoffValuesSearchLevel`;
    for each search gather via the extracted service and **keep only the mapped `searchScanFileId`s**; build
    ONE `spectral_data` list; send ONE request; return `request_id`. Set `flashlfq_parameters` = MBR
    intended-on + `normalize` per request (other numeric/boolean params left at service defaults).
- **D7 — sample key must be unique per (search, scan file).** The existing per-file DTO serializes
  `scan_file_id = scan_file_tbl.id` (`...:1439-1455`, sourced `:700, 716`); the service names the sample from
  it. Two mapped records can share one physical `scan_file_tbl.id` (same raw file, two searches) → columns
  collide. **Send `searchScanFileId` (`search_scan_file_tbl.id`, unique PK) as the service's `scan_file_id`**
  — the service only uses it to *name* the sample (scans come via `spectr_file_id`, `request_models.py:63-77`),
  so each output column `Intensity_scanfile_id_<searchScanFileId>` is unique and maps back to one (search, scan file).
- **New projectId-keyed status webservice (D9):** `{ projectIdentifier, requestId }` → project **read** auth →
  proxy the service `flashLFQRunStatus` (model on the existing `FlashLFQ_Run__Result_Status_...` proxy).

### Front end (project-page Quant section)
- **Submit action** in the Add-New-Quant overlay terminal state: POST the store's `(projectSearchId,
  searchScanFileId)` pairs + normalize choice; on success take `request_id` and build the composite hash
  (`quant_run_` + `psid_ssfid_requestId-…`, all sharing `request_id`).
- Show **"MBR is on"** + a **normalize checkbox (default on)**.
- **Runs list in project-page JS**: each run's composite hash + status; **"Refresh"** polls the new status
  webservice; each completed run links (new tab) to `/d/pg/qt/flashlfq-peptide-data-file/{projectId}#<hash>`.
- FE webservice calls follow the house `webserviceCallStandardPost` / hand-rolled-fetch pattern.

---

## 5. Phase B — Minimal raw peptide-TSV viewer (first link target)

### Backend
- **Page path constants** in `.../page_controllers/AA_PageControllerPaths_Constants.java`:
  `QUANT_BASED_PAGE_CONTROLLER_START = "d/pg/qt/"` and
  `FLASHLFQ_PEPTIDE_DATA_FILE_PAGE_CONTROLLER = "d/pg/qt/flashlfq-peptide-data-file"`.
- **New page controller** `.../page_controllers/FlashLFQ_Peptide_Data_File_PageController.java` — mirror
  `ProjectView_Controller` (plain `@Controller` returning a JSP view-name String; `@GetMapping` path =
  `PATH_START_ALL + FLASHLFQ_PEPTIDE_DATA_FILE_PAGE_CONTROLLER + "/" + "{projectId}"`; parse `projectId` to int).
  **Self-authenticates** — `/d/pg/qt/**` is NOT covered by the `/d/pg/psb/**` interceptor
  (`DataPage_ProjectSearchIdBased_...Interceptor:107-110`). Do the two-stage READ check with
  `GetWebSessionAuthAccessLevelForProjectIds` (`ProjectView_Controller:151-175`: no-session+not-public →
  `AA_UserAccount_PageControllerPaths_Constants.FORWARD_TO_LOGIN_PAGE_CONTROLLER`; not-public-read →
  `"data_pages/error_pages/project_AccessNotAllowed_Page.jsp"`). Set request attributes `currentProjectId`
  (the standard hidden element is rendered from `${currentProjectId}` by the main-pages head include) and
  `webSessionAuthAccessLevel` (`WebConstants.REQUEST_WEB_SESSION_AUTH_ACCESS_LEVEL`). Return
  `"data_pages/quant_data_file_pages/flashlfqPeptideDataFile.jsp"` (view resolver prefixes `/WEB-INF/jsp/`).
- **New JSP** `src/main/webapp/WEB-INF/jsp/data_pages/quant_data_file_pages/flashlfqPeptideDataFile.jsp` —
  mirror the minimal `data_pages/other_data_pages/projectsList.jsp`: `pageEncodingDirective` +
  `top_of_every_page_doctype…` includes; `<head>` with a `controller_path` script + `head_section_include_main_pages.jsp`;
  `<body class="…">` with the standard body includes + `header_main_pages.jsp`; a mount
  `<div id="…react_root">`; and one bundle
  `<script src="static/js_generated_bundles/data_pages/flashlfqPeptideDataFilePage-bundle.js?x=${ cacheBustValue }">`.
- **New retrieval webservice** `.../rest_controllers/other_like_project/Quant_AddNew_FlashLFQ_PeptideResultFile_Retrieval_RestWebserviceController.java`
  — near-copy of `FlashLFQ_Run__Result_Retrieval_RestWebserviceController` but: request `{ projectIdentifier,
  requestId }`; auth = projectId **read**
  (`ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.validatePublicAccessCodeReadAllowed`);
  proxy `GET <base>/flashLFQRunResult?request_id=<id>&file=peptides`; relay the raw `QuantifiedPeptides.tsv`
  bytes; validate `requestId` `^[0-9a-f]{32}$`. **`TODO` comment** for the deferred run-scope check (D-SCOPE).
  Uses the already-added path constant.

### Front end
- **esbuild entry** in `front_end/build.gradle` — add to the data-pages entry list (in
  `frontEndBuild__Esbuild__CommandLine_Args_DataPages__Add_DataPage_EntryPoints__Fcn`, ~line 278):
  `"./src/js/page_js/data_pages/quant_data_file_pages/flashlfq_peptide_data_file_page/flashlfqPeptideDataFilePage.ts"`.
  Output bundle name = entry basename + `-bundle` → `flashlfqPeptideDataFilePage-bundle.js` under
  `static/js_generated_bundles/data_pages/`.
- **New page dir** `front_end/src/js/page_js/data_pages/quant_data_file_pages/flashlfq_peptide_data_file_page/`:
  - `flashlfqPeptideDataFilePage.ts` — bootstrap (mirror `projectsListPage.ts`: `limelight__catchAndReportGlobalOnError.init()`,
    `MainPagesPopulateHeader().initialize()`, `createRoot` into the mount div; wrap in the house
    `try/catch → reportErrorObjectToServer; throw`).
  - `FlashlfqPeptideDataFilePage_Root_Component.tsx` — read `projectId` via
    `currentProjectId_ProjectSearchId_Based_DataPages_FromDOM()` (reads the `main_page_current_project_id`
    element); read `window.location.hash` **lazily in `componentDidMount`**, strip the leading `#` + optional
    `quant_run_` marker, and take the shared `request_id` (3rd `_`-field of any entry); fetch the TSV as
    **text** via hand-rolled `window.fetch` following the reject-sentinel / `handleAJAXError` contract
    (`quant_PrototypeData.ts:351-386`); render the TSV verbatim in a `<pre>`.
  - `flashlfqPeptideDataFile_LoadFromServer.ts` — the fetch module.

---

## 6. Deferred (later phases, NOT now)

### Full Quant peptide page — a NEW page (not the existing peptide page)
The real results view under the `d/pg/qt/` family that replaces the raw dump: reported peptides (rows) ×
mapped scan files / samples (columns), MS1 intensity per cell. Driven by the composite hash → ONE TSV fetch →
re-derive identity→rpid per search from default cutoffs.

**Parse (per search + per scan file):**
- **Peptide rows do NOT carry `reportedPeptideId`.** The TSV `Sequence` column = the grouping identity (NO
  rpid). Re-derive `groupingIdentity → [reportedPeptideId]` per search from default cutoffs (same approach as
  `FlashLFQ_Run__Result_Retrieval_Joined...:217-218, 260-340, 408`) and look up each row.
- **Protein rows DO round-trip** — `proteinSequenceVersionId` is embedded in `Protein Group(s)` as `psvid_<id>`.
- Columns: each `Intensity_scanfile_id_<searchScanFileId>` → one sample = one (search, scan file).
- **Cross-search identity ambiguity:** the same `Sequence` string can map to reported peptides in multiple
  searches; build the re-derivation map per search, and a row may fan out to rpids across searches.
- **Needs the multi-`Intensity_*`-column parser** — the existing joined parser hard-requires exactly one
  column (`FlashLFQ_Run__Result_Retrieval_Joined...:381-387`); a joint TSV has many.
- *(unverified: exact `Sequence` / `Protein Group(s)` header spellings — confirm against a real TSV first.)*

**Display — reproduce BOTH shared-value representations the existing display has** (validated against
`.../protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Create_TableData.tsx`
+ `.../quant/quant_PrototypeData.ts`):
1. **Shared glyph (`⚭`)** when one `groupId` maps to **>1 reportedPeptideId** — a real quantified value shown
   as *shared* (`_QUANT_SHARED_GLYPH` at `Create_TableData.tsx:90-95`; >1-row pre-pass `:644-686`, applied
   `:594-602`; dedupe-by-groupId roll-up `quant_PrototypeData.ts:175-235`).
2. **"overlapping signal"** when FlashLFQ zeroed the form (`ambiguousZeroed` / `MSMSAmbiguousPeakfinding`),
   no value (`Create_TableData.tsx:98-101, 577-588`; `quant_PrototypeData.ts:57-58, 137-171`).
   In the sample matrix these apply **per sample cell**, not once per row.

### Other deferred
- **Metadata-column sample labeling** + **cross-session run listing** → need DB persistence.
- **Run-scope access check** (verify a run's scan files belong to the project) → DB phase.

---

## 7. Q7 — include static mods in the grouping identity (DO NOW, Phase A)

**Change (do now):** make the grouping identity's summed mass = **total mod mass (static + variable) =
monoisotopicMass − basePeptideMass**, instead of the current variable-only. Edit the single shared builder
`FlashLFQ_GroupingIdentity_Common` and its two call sites: the submit side
(`buildFlashLFQ_GroupingIdentity` at `FlashLFQ_Run__Request_Creation...:1048-1050`, which moves into the
extracted service per D8) **and** the existing joined-retrieval re-derivation
(`FlashLFQ_Run__Result_Retrieval_Joined...:333`) so the round-trip still matches. **Reuse existing masses
(`StaticModDTO.getMass()` + already-computed per-position mods) — do NOT add a new mass calculator.**

**Why (reduce FlashLFQ zeroing):** FlashLFQ keys peptidoforms by the Full Sequence string but quantifies by
mass → m/z → XIC. Two **different** strings at the **same mass** claim one MS1 peak → FlashLFQ marks it
ambiguous and **zeros it** (the "overlapping signal" state). Fewer distinct strings at a given mass ⇒ fewer
zeros. Today identity excludes static while the sent mass includes it — so a cross-search case (search 1 has a
mod as **static**; search 2 has the same mod as **variable** with all sites occupied) is the same molecule /
same mass but two identity strings → FlashLFQ zeros both. Making them one string quantifies the peak; it moves
data from the zeroed bucket into the quantified-but-shared (`⚭`) bucket. (Same-mass co-eluting species can't
be separated by MS1 anyway, so distinct strings only ever earn a zero — merging is strictly better.)

**Consequences / caveats:**
- **Existing single-search feature: quant numbers unchanged** (mass-driven; the relabeling
  `base[+varSum]` → `base[+varSum+staticSum(base)]` is injective, static uniform within a search, its runs are
  per-scan-file with MBR off). **But cached runs must be deleted** — the peptide match-back joins the TSV
  `Sequence` column by exact string equality (`FlashLFQ_Run__Result_Retrieval_Joined...:333, 408`), so old
  variable-only TSVs stop joining. **Dan deletes all existing FlashLFQ service runs** after this lands (webapp
  persists nothing; delete the service-side run dirs; old hashes then return `NOT_FOUND`).
- **Merge condition:** only when occupancy matches (all-sites variable == static-all-sites); partial variable
  forms differ in mass *and* identity → correctly stay separate.

---

## 8. Verification (end-to-end)
- **Build:** WAR build + deploy `ant -f ant_build_War_CopyToTomcat.xml` (in `limelight_webapp/`) for
  backend/JSP; FE type-check via tsgo; FE build+deploy `ant -f ant_buildFrontEnd_CopyToTomcat.xml` (in
  `front_end/`). No JUnit — verify by running. Drive with admin/admin owner, **project 25** (CDP harness in
  `.claude/session_handoffs/quant_add_new_cdp/`).
- **Phase A:** drive Add-New-Quant to a mapping → Submit → confirm ONE run at the FlashLFQ service (one
  request over all mapped files), `request_id` returned, run in the JS list, Refresh reflects PROCESSING→READY.
  Confirm the composite hash + new-tab link. Verify the extracted service didn't change existing-feature
  behavior. Verify Q7 identity change + (Dan) delete existing runs.
- **Phase B:** click a completed run → new tab `/d/pg/qt/flashlfq-peptide-data-file/{projectId}#<hash>` → raw
  `QuantifiedPeptides.tsv` renders in the `<pre>`. Confirm read-auth (a public/non-owner reader can view),
  and that an unknown/missing run degrades cleanly (404 → "unavailable").

---

## 9. Standing rules honored
- Skeptical bar: load-bearing claims cited to `file:line`; unverified items marked.
- No new mass calculator (Q7 reuses existing masses). No DB mutation by the assistant. Commits/pushes need
  Dan's explicit, per-command go-ahead. Nothing implemented until Dan authorizes a phase.
