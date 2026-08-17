# Add-New-Quant — Submit ONE joint FlashLFQ run + view on new data page(s) — PLAN (2026-08-17)

**Status: decisions RESOLVED; executable plan. NOT yet implemented — do not write code until Dan gives the
go-ahead for a phase.** This doc is the single source of truth (it supersedes the earlier "open Q1–Q7"
framing and the ephemeral plan-mode file `~/.claude/plans/wait-i-thought-we-temporal-badger.md`). Skeptical
bar: reuse claims cited to source `file:line`; a couple of items marked *(unverified)*.

This is a **new, independent quant *run model*** (a joint run over the uploaded set). It has **two deliberate,
non-breaking touches to existing code**: (1) **Q7 unifies the shared grouping identity
`FlashLFQ_GroupingIdentity_Common` across BOTH this subsystem and the existing peptide page** — its identity
*strings* change but stay grouping-equivalent, and existing runs are already deleted (§7); (2) **D8 is a
behavior-preserving refactor** of `FlashLFQ_Run__Request_Creation_RestWebserviceController` (extract the shared
gather/send; the existing per-search per-scan-file fan-out is unchanged). No Model-A/B framing — nothing is a
reversal.

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
3. **Hash (no DB).** The new page's URL = `projectId` in the path + a **composite hash** in the fragment,
   **reusing the existing peptide-page format and parser unchanged**, with only a leading marker added:
   ```
   #qr;<psid>_<ssfid>_<requestId>-<psid>_<ssfid>_<requestId>-…
   ```
   `_` splits the 3 fields, `-` splits entries (exactly the existing scheme, `quant_PrototypeData.ts:301-321`),
   and **every entry shares the one joint-run `request_id`**. The only new piece is the leading marker `qr;`
   — it uses a **non-`_` delimiter** so it can't collide with the field separator; the page strips the leading
   `qr;` and feeds the remainder to the existing `_parseHash_ToPairs` as-is (no new parser, no format change).
   The marker + the `(psid, ssfid)` pairs live **only in the Limelight URL hash**; the service still only ever
   sees `request_id`. The pairs give the later peptide page the projectSearchId set it needs to re-derive
   identity→reportedPeptideId — with **no persistence**. *(The earlier `quant_run_` collision was self-inflicted
   by putting `_` in the marker inside a `_`-delimited format; `qr;` removes it.)*
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
| D5 | **Composite hash, no DB:** `#qr;` marker + existing `psid_ssfid_requestId` pairs (all sharing one `request_id`), URL hash only; reuse `_parseHash_ToPairs` unchanged (strip `qr;`, feed the rest). Metadata labeling + cross-session listing need the DB (deferred). |
| D6 | **Server-side default PSM/Peptide cutoffs** decide what PSMs are sent. |
| D7 | **Sample key sent to the service = `searchScanFileId`** (not `scan_file_tbl.id`) so results parse back per (search, scan file) — see §4. |
| D8 | **Reuse via extraction:** move the gather/DTO/send logic into a `services/` class (public static nested request/response) and **repoint the existing controller** at it (no duplication). |
| D9 | **New projectId-keyed status webservice**; runs held in project-page JS; Refresh polls; links open a new tab. |
| D-MBR | **MBR always ON** (`--mbr` is a switch defaulting TRUE and cannot be disabled from the CLI — `flashlfq_command.py:14-17, 51`); show a "MBR is on" message, no toggle. |
| D-NRM | **normalize = user choice, default ON** (`--nor` is a controllable switch — `flashlfq_command.py:49, 112-116`); submit UI = a checkbox defaulting on. |
| D-Q7 | **Unify BOTH features on a static-inclusive grouping identity** (bracket mass = variable + residue-static). One change to the shared `FlashLFQ_GroupingIdentity_Common`; the existing peptide page and this subsystem share it. Existing runs were **already deleted** — no forced-deletion cost. See §7. |
| D-VAL | **Submit backstops mods only** (open-mod / dynamic-mod). It does NOT re-enforce the scan-file-count / sub-group eligibility conditions at submit — those are enforced at the upload front door (D-ELIG). |
| D-ELIG | **Do NOT relax the Add-New eligibility gate.** A >1-scan-file, no-sub-groups search (condition (d), `Eligibility...:282-288`) stays **INELIGIBLE**. The joint run removes per-search *summing* but not the underlying ambiguity: with no sub-groups, multiple scan files may be separate samples (→ separate columns, fine) OR fractions of one sample (→ should be combined; separate columns mislead and FlashLFQ+MBR mis-match across them). Sub-groups are the disambiguator; the uploaded metadata structure is not honored this slice. Stays gated unless a user / Dan's boss explicitly requests relaxing it. |
| D-AUTH | Submit = project **OWNER**; viewer page + retrieval/status webservices = project **READ**. |
| D-SCOPE | Viewer does **not** verify the run's scan files belong to the project this slice (temporary + isolated/alt server context) — code comment only; real check deferred to the DB phase. |
| D-PROV | The **cross-search joint run is Dan-owned** (this session): the task prompt said "submit ONE FlashLFQ run over ALL of those scan files," and when the Model-B-reversal concern was raised Dan replied it is "completely disconnected from what was done before… nothing is a reversal." The user asserts comparability by uploading the set; Limelight does not validate it. |

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
  (`FlashLFQ_GroupingIdentity_Common.java:67-83`). Single source of truth; used on both submit and
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
  - **Preserve existing behavior:** the existing controller keeps its **per-scan-file fan-out** (`:634-649`,
    one request per file) — it loops and calls the extracted service once per file; the new joint controller
    calls the same service **once** with all files. The extraction boundary must expose "gather-per-search" +
    "send-one-request(spectral_data list)" so both compose it differently.
  - **Fix the stale comment (item 6):** the class javadoc `Request_Creation:124-129` ("one FlashLFQ run PER
    SEARCH … NOT a joint run across searches … cannot be assumed valid") correctly describes the *existing*
    controller but its "cannot be assumed valid" claim is contradicted by this new subsystem. **Scope that
    comment to the existing controller and cross-reference the new joint subsystem** (don't delete it).
- **New Submit controller** `.../rest_controllers/other_like_project/Quant_AddNew_Submit_JointFlashLFQ_Run_RestWebserviceController.java`:
  - Request `{ projectIdentifier, mappedFiles:[{projectSearchId, searchScanFileId}], normalize:boolean }`.
  - Auth = **OWNER**: `ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.validateProjectOwnerAllowed(...)`;
    re-verify every `projectSearchId`/`searchScanFileId` belongs to the project.
  - **Validation scope (D-VAL):** backstop-reject **only** open-mod / dynamic-mod searches — mirror the
    existing throws: **dynamic-mod at `Request_Creation:362-365`, open-mod at `:1004-1013`** — those break the
    grouping identity (one reported peptide spans multiple mass forms). Do **NOT** re-enforce the eligibility
    controller's scan-file-count / sub-group conditions (`Quant_AddNew_..._Eligibility...:275-320`) at submit.
  - **Eligibility gate stays (D-ELIG, DECIDED — do NOT relax):** the Add-New upload eligibility keeps
    **multi-scan-file-without-sub-groups searches INELIGIBLE** (`Quant_AddNew_..._Eligibility...:282-288`),
    enforced at the **upload front door** (not re-checked at submit). Rationale: the joint run removes the
    per-search *summing* problem but not the underlying ambiguity — with no sub-groups, multiple scan files may
    be separate samples (→ separate columns, fine) or fractions of one sample (→ should be combined; separate
    columns mislead and FlashLFQ+MBR would mis-match across them). Sub-groups are the disambiguator; the
    uploaded metadata structure is not honored this slice. Relax only on an explicit user / boss request.
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
  `qr;<psid>_<ssfid>_<requestId>-…` (all entries sharing the one `request_id`).
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
- **esbuild entry** in `front_end/build.gradle` — add a string to the data-pages entry array inside
  `ext.frontEndBuild__Esbuild__CommandLine_Args_DataPages__Add_DataPage_EntryPoints__Fcn` (`build.gradle:224`;
  the `commandLine_Args += [ … ]` array starts `:228`):
  `"./src/js/page_js/data_pages/quant_data_file_pages/flashlfq_peptide_data_file_page/flashlfqPeptideDataFilePage.ts"`.
  Output bundle name = entry basename + `-bundle` → `flashlfqPeptideDataFilePage-bundle.js` under
  `static/js_generated_bundles/data_pages/`.
- **New page dir** `front_end/src/js/page_js/data_pages/quant_data_file_pages/flashlfq_peptide_data_file_page/`:
  - `flashlfqPeptideDataFilePage.ts` — bootstrap (mirror `projectsListPage.ts`: `limelight__catchAndReportGlobalOnError.init()`,
    `MainPagesPopulateHeader().initialize()`, `createRoot` into the mount div; wrap in the house
    `try/catch → reportErrorObjectToServer; throw`).
  - `FlashlfqPeptideDataFilePage_Root_Component.tsx` — read `projectId` via
    `currentProjectId_ProjectSearchId_Based_DataPages_FromDOM()` (reads the `main_page_current_project_id`
    element); read `window.location.hash` **lazily in `componentDidMount`**, strip the leading `#qr;`, feed the
    remainder to the existing `_parseHash_ToPairs` (`quant_PrototypeData.ts:301-321`) → pairs (all sharing the
    one `request_id`; keep the pairs — the later peptide page needs them); use that `request_id` to fetch the
    TSV as **text** via hand-rolled `window.fetch` following the reject-sentinel / `handleAJAXError` contract
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
  `FlashLFQ_Run__Result_Retrieval_Joined...:217-218, 260-341, 408`) and look up each row.
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

## 7. Q7 — unify BOTH features on a static-inclusive grouping identity (Phase A)

**Change (single shared builder, both features):** the existing peptide page **and** this new subsystem move to
the same convention — the grouping-identity bracket mass = **variable + residue-static mod mass** (full
precision), instead of variable-only. Make the change in ONE place, `FlashLFQ_GroupingIdentity_Common`, with the
static expansion **inside** the builder. **No `includeStaticMods` flag, no separate builder.**

**Single formula (approach B — the only one both paths can compute):**
> bracket mass = Σ(reported-peptide-level variable-mod masses) + Σ over each residue-occurrence in
> `baseSequence` matching a static mod, of that static mod's `StaticModDTO.getMass()` — summed at full precision
> (the builder sorts+sums deterministically, `FlashLFQ_GroupingIdentity_Common:71-83`).
>
> *(The subtraction form `monoisotopicMass − basePeptideMass` is NOT usable: the retrieval re-derivation has no
> monoisotopic/base mass — only the sequence + variable masses. Reuse existing masses; no new mass calculator.)*

**Signature + callers (exactly 2, grep-confirmed):**
- `buildFlashLFQ_GroupingIdentity(baseSequence, Collection<Double> reportedPeptideLevelVariableModMasses, List<StaticModDTO> staticMods)`
  — all **required**; static residue-occurrence expansion lives inside the builder (one implementation both
  paths share, replicating the submit static block `Request_Creation:1015-1041`, residue match `:1026`).
- Submit `Request_Creation:1049` — already has the static list (`:745`); pass it. (This call moves into the
  extracted service per D8.)
- Retrieval `Result_Retrieval_Joined:333` — **does not fetch static mods today** (`:260-341` only pulls
  sequence + variable masses). Add `staticModDTOForSearchIdSearcher.getListForSearchId(searchId)` there so both
  call sites feed the builder identical inputs.
- Fix the now-wrong "static excluded" / "variable"-named artifacts: `FlashLFQ_GroupingIdentity_Common:30-38`
  (class doc), `Request_Creation:1043-1050` (submit comment), and the helper `summedVariableModMass_Token`
  (`FlashLFQ_GroupingIdentity_Common:84-101`) — its name/token says "variable" but it now formats
  variable+static (rename/comment it).

**Round-trip correctness is guaranteed by the shared builder** — submit and retrieval run identical logic on
identical inputs (same variable masses from the same searcher, same static list from the same searcher, same
sequence), so the strings match **by construction**. This holds **independently of the terminal-mod question**.

**Why (reduce FlashLFQ zeroing):** FlashLFQ keys peptidoforms by the Full Sequence string but quantifies by
mass → m/z → XIC. Two **different** strings at the **same mass** claim one MS1 peak → FlashLFQ marks it
ambiguous and **zeros it** (the "overlapping signal" state). Making static-vs-variable same-mass forms share one
string quantifies the peak instead — moving data from the zeroed bucket into the quantified-but-shared (`⚭`)
bucket. Merges only when occupancy matches (all-sites variable == static-all-sites); partial variable forms
differ in mass *and* identity → correctly stay separate.

**No run-deletion cost:** the existing FlashLFQ runs have **already been deleted**, so there is nothing to
preserve and no forced-deletion step; both features regenerate consistent identities going forward.

**Two build-time checks to record (cheap):**
- **Grep other consumers of the grouping-identity / "Full Sequence" string** — confirm nothing *parses or
  displays* the bracket mass expecting variable-only semantics (grouping key + TSV join are fine; a
  display/parse elsewhere would silently show changed numbers). Verify it is internal-only.
- **Confirm `StaticModDTO.residue` can't carry a terminal sentinel token** (e.g. `"["`/`"]"`). The DTO is
  residue + mass with no terminal field, so residue-match expansion is complete unless `residue` is overloaded
  for terminals — a quick confirm closes the edge.

---

## 7b. Interim limitations (accepted for this slice)
- **(a)** Uploaded metadata columns have **no effect** this slice — not sent to the run, not shown.
- **(b)** A project-page **reload permanently orphans** a submitted run: the `request_id` lives only in JS and
  the service has no "list runs for a project" endpoint, so it becomes unrecoverable.
- **(c)** The viewer authorizes on the URL `projectId` but retrieves by an **unbound `request_id`** → a
  leaked/guessed id enables cross-project view. Accepted: temporary + isolated/alt server context; `request_id`
  is an unguessable uuid.
- **(d)** For the **deferred** peptide page, round-trip correctness depends on the **default cutoffs** (which
  reported peptides get re-derived) not drifting between submit and view, with nothing persisted to pin them.
  The identity *formula* is safe — the shared builder guarantees it (§7). Harmless for the Phase-B raw dump
  (no re-derivation).

---

## 8. Verification (end-to-end)
- **Build:** WAR build + deploy `ant -f ant_build_War_CopyToTomcat.xml` (in `limelight_webapp/`) for
  backend/JSP; FE type-check via tsgo; FE build+deploy `ant -f ant_buildFrontEnd_CopyToTomcat.xml` (in
  `front_end/`). No JUnit — verify by running. Drive with admin/admin owner, **project 25** (CDP harness in
  `.claude/session_handoffs/quant_add_new_cdp/`).
- **Phase A:** drive Add-New-Quant to a mapping → Submit → confirm ONE run at the FlashLFQ service (one
  request over all mapped files), `request_id` returned, run in the JS list, Refresh reflects PROCESSING→READY.
  Confirm the composite hash + new-tab link. Verify the extracted service didn't change existing-feature
  behavior. Verify the Q7 static-inclusive identity round-trips on both features (existing runs already
  deleted — nothing to preserve). Run the two §7 build-time checks (grep identity consumers; StaticModDTO
  residue-only).
- **Phase B:** click a completed run → new tab `/d/pg/qt/flashlfq-peptide-data-file/{projectId}#<hash>` → raw
  `QuantifiedPeptides.tsv` renders in the `<pre>`. Confirm read-auth (a public/non-owner reader can view),
  and that an unknown/missing run degrades cleanly (404 → "unavailable").

---

## 9. Standing rules honored
- Skeptical bar: load-bearing claims cited to `file:line`; unverified items marked.
- No new mass calculator (Q7 reuses existing masses). No DB mutation by the assistant. Commits/pushes need
  Dan's explicit, per-command go-ahead. Nothing implemented until Dan authorizes a phase.
