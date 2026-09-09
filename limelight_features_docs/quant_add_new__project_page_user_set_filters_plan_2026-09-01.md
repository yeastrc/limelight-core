# Add-New-Quant — user-set PSM/Peptide filters → one `searchDataLookupParamsRoot` (drives gather + minted page code)

**Status:** FINAL plan, verified against source by the review session. **Not yet implemented. UNCOMMITTED**
(like the other `quant_add_new__*` plan docs — do NOT commit). This is the executable reference for the build.

**Date:** 2026-09-01. **HEAD at planning:** `d20ed5dd1`. The whole quant workstream is uncommitted; this
change is additive/edit-only on top of that tree.

**Naming discipline:** *quant peptide page* / *quant protein page* = the new `d/pg/psb/quant-peptide/` &
`d/pg/psb/quant-protein/` pages under `.../quant_pages/`. *existing/legacy peptide page / protein page* = the
original `d/pg/psb/peptide/` & `d/pg/psb/protein/` pages. Never write bare "peptide page" / "protein page".

Every claim below is **OBSERVED** (read from source, file:line given) unless marked `inferred`. Line refs
were current at planning; re-ground (grep/read) before editing since the tree drifts.

---

## 0. Goal

On the project-page **"Add New Quant" (quant submit) overlay**, let the user CHANGE the PSM / Peptide /
Matched-Protein / Modification-Position filters before submitting a FlashLFQ quant run — mirroring the
Create-Experiment "Set Search Filters" flow. The chosen cutoffs become **one `searchDataLookupParamsRoot`
for the whole run** that:

- **(a)** drives FlashLFQ PSM gathering in the submit controller, **replacing** today's server-side
  default-cutoff derivation (full "option A": remove the default-build; **require** the request root, like the
  sibling `FlashLFQ_Run__Request_Creation_RestWebserviceController`); and
- **(b)** is **minted server-side** into a `searchDataLookupParamsCode` (the same DB-backed code the standard
  data pages use), returned in the submit response; the FE puts it on the quant peptide + quant protein page
  URLs **in place of the current client-side A-block**, so those pages load at the user's cutoffs.

**Mint round-trip (the load-bearing end-to-end):** widget edits → default-seeded+edited container →
`searchDataLookupParamsRoot` (FE) → submit controller uses it for gather (a) AND mints a
`searchDataLookupParamsCode` from it (b) → FE stores the code on the run → quant peptide/quant protein page URL
carries the code as path element `[1]` → the `/d/pg/psb/**` interceptor resolves the code to
projectSearchIds+cutoffs and stamps them on the page → the quant page reads them via
`getSearchDataLookupParametersFromPage` → the page DISPLAYS peptides/proteins at exactly the cutoffs FlashLFQ
quantified. **The build MUST test-calc this round-trip** (see §8).

**Seeded-defaults guard (Dan):** Dan will visually validate that the widget's seeded default filter values
match today's server defaults. Byte-equivalence need not be proven programmatically, but **the build MUST
surface the seeded values** (dump them in the CDP test) so Dan can eyeball them.

---

## 1. Widget rename + move (§9(f): rename ONLY the widget)

**OBSERVED** — sole external importer of the widget is `projPg_Expermnts_Single_MainCellMaint.tsx` (grep:
only that file + the widget itself import `Experiment_User_Set_Searches_Filters`).

- **Move + rename file:**
  `.../project_page_experiments_section/experiment_User_Set_Searches_Filters.tsx`
  → `page_js/data_pages/data_pages_common/searchesFilters_UserSet_Component.tsx`.
- **Rename exported symbols:**
  - class `Experiment_User_Set_Searches_Filters` → `SearchesFilters_UserSet_Component`
    (`experiment_User_Set_Searches_Filters.tsx:72`).
  - props interface `Experiment_User_Set_Searches_Filters_Props` → `SearchesFilters_UserSet_Component_Props`
    (`:44-57`).
  - state interface `Experiment_User_Set_Searches_Filters_State` → `SearchesFilters_UserSet_Component_State`
    (`:62`) (file-local; rename for consistency).
  - File-local helpers (`_create_SearchFilters_LocalCopy` `:549`, the `Internal__…` classes `:1175`/`:1187`,
    the `_get_filtersPerSearch_*` / `_getFilters_*` functions, `Single_Filterable_PerAnnotationType_Entry`
    `:942`) are file-scoped → unaffected by the move; leave their names.
- **No behavior change to the widget.** It still renders its OWN modal overlay chrome
  (`modal-overlay-page-background` + fixed-position `modal-overlay-container`, `:494-496`) with its own
  Save/Cancel/X, and writes the edited filters into `props.conditionGroupsDataContainer` **only on Save**
  (`:173-176`, callback `:180`). (This overlay-native behavior is exactly what §2 relies on.)
- **Consumers to update (exactly two after this feature):**
  1. `projPg_Expermnts_Single_MainCellMaint.tsx:20` (import) + `:389` (JSX tag `<Experiment_User_Set_Searches_Filters …>`)
     → new module path + new class name. Props passed there are unchanged (`:390-396`). Create-Experiment
     create/maint must keep working (§7).
  2. NEW: `projPg_Quant_SubmitRun_Component.tsx` (this feature, §2).
- **The container/seeder classes are NOT renamed** (§9(f)) — they stay `Experiment_`-named under
  `experiment_data_pages_common/`. A container rename is a large separate blast radius, out of scope. The
  generic widget consuming still-`Experiment_`-named containers is acceptable.

**The widget needs no internal change to work outside the experiment package** — its data deps are only
`Experiment_ConditionGroupsDataContainer` + the `searchesData` shape, both already shared.

---

## 2. Overlay-on-button integration in the submit component (§9(a) = OPTION (ii): ZERO widget change)

The inline-prop tension from the draft is **moot**: we do NOT add a `renderAsInlineBlock` prop. The widget
stays overlay-native.

In `projPg_Quant_SubmitRun_Component.tsx`:

- **Add a "Set Search Filters" button** in `render()`, positioned **below** "Mapping saved (in memory)" and
  **above** the "Submit Quant run" button (render region around `:438-476`; the "Submit Quant run" heading is
  `:444`, the run-label input `:456`, run-mode selector `:465`, options `:467`, submit button `:473-475`).
  Use a `<span class="fake-link">`/button per house style (this is an in-page action, not navigation, so a
  plain `<input type="button">` matching the existing submit button is fine).
- **Clicking it opens the widget as its own overlay** — render `<SearchesFilters_UserSet_Component …>`
  conditionally (gated on an instance flag, e.g. `_showFiltersOverlay`), passing:
  - `projectSearchIds` = the distinct mapped projectSearchIds (from `inMemoryStore.mappedRecords`, §3).
  - `conditionGroupsDataContainer` = the held `_conditionGroupsDataContainer` (default-seeded + any prior edits, §3).
  - `searchesData` = the loaded `searchesData` (§3).
  - `save={ ({conditionGroupsDataContainer}) => { this._conditionGroupsDataContainer = conditionGroupsDataContainer; this._showFiltersOverlay = false; this.setState({force_Rerender:{}}); } }`
    — store the updated container on the instance field + close the overlay.
  - `cancel={ () => { this._showFiltersOverlay = false; this.setState({force_Rerender:{}}); } }`
    — close without applying (X uses the same `cancel`, OBSERVED widget `:229`, `:500`).
- **Submit reads the held container:** in `_submitClicked` (`:195`), build the root from
  `this._conditionGroupsDataContainer` (§4) and pass it to the submit call (§5/§6).
- Because the widget already writes to the container only on its Save, and we snapshot that container on Save,
  Submit uses exactly the last-Applied filters. Edits open-but-not-Saved in the overlay are discarded on
  Cancel/X — same semantics as the experiment flow (OBSERVED widget keeps edits in a local state copy until
  Save, `:91`, `:549-674`).

**Instance fields to add** (per Dan's typed-instance-property preference; trigger re-render with
`setState({force_Rerender:{}})`):
- `private _searchesData: GetSearchesDataForProject_ExperimentProcessing_Result | undefined` (loaded, §3)
- `private _conditionGroupsDataContainer: Experiment_ConditionGroupsDataContainer | undefined` (§3)
- `private _searchDataMap_KeyProjectSearchId: Map<number, CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data>` (§3)
- `private _showFiltersOverlay: boolean = false`

---

## 3. Data load for the mapped searches + default-seeded container

- **Reuse `getSearchesDataForProject_ExperimentProcessing({ projectIdentifier })` as-is**
  (`projPg_Expermnts_Load_SearchesData_ForProject.ts:59`). It loads for the WHOLE project (all searches) and
  also loads `defaultFilter_Cutoffs_Overrides_ProjectWide_Root` (`:82`, stored on the result `:99`); it drives
  `SearchProgramsPerSearchDataRetrieval` + `AnnotationTypeDataRetrieval` through a throwaway
  `DataPageStateManager` (`:147-165`). The widget only renders the `projectSearchIds` passed to it and indexes
  the project-wide maps by psid, so no psid-scoped variant is needed. `inferred`: a scoped variant would
  fetch less but adds surface; reuse-as-is is correct and cheaper to build.
- **Where called:** `ProjPg_Quant_SubmitRun_Component.componentDidMount`, using `this.props.projectIdentifierFromURL`
  (OBSERVED prop `projPg_Quant_SubmitRun_Component.tsx:59`). Store into `_searchesData`; render the "Set Search
  Filters" button/overlay only once loaded (Loading gate until then). `inferred`: componentDidMount is the
  right hook; alternatively the parent could load and pass down, but self-loading keeps the surface minimal.
- **Build the default-seeded container** (once, after the load resolves — build once, hold on the instance
  field, per Dan's no-memoization / explicit-instance-cache preference):
  1. distinct mapped psids: from `this.props.inMemoryStore.mappedRecords` (OBSERVED used at `:217`, `:307`).
  2. empty container:
     `new Experiment_ConditionGroupsDataContainer({ experimentConditionData_Serialized: undefined, searchDataLookupParamsRoot: undefined })`
     (OBSERVED empty-construct path `experiment_conditionGroupsDataContainer_Class.ts:116-118`).
  3. `_searchDataMap_KeyProjectSearchId`: iterate
     `searchesData.getSearchesAndFolders_SingleProject_PromiseResponse.get_SearchData_ALL_Iterator()`, keyed by
     `projectSearchId` (same construction as the widget ctor `experiment_User_Set_Searches_Filters.tsx:97-108`
     and MaintRoot `projPg_Expermnts_Single_MaintRoot.tsx:250-258`).
  4. seed defaults:
     `create_experiment_SearchFilterValuesFromDefaultCutoffs({ projectSearchIds: new Set(mappedPsids), searchDataMap_KeyProjectSearchId: this._searchDataMap_KeyProjectSearchId, searchesData: this._searchesData, conditionGroupsDataContainer: this._conditionGroupsDataContainer })`.
     - OBSERVED seeder export `create_experiment_SearchFilterValuesFromDefaultCutoffs.ts:33`. Its
       `conditionGroupsDataContainer` param is **required** (no `?`, `:37`/`:49`). It reads
       `searchesData.defaultFilter_Cutoffs_Overrides_ProjectWide_Root` (`:53`) and sets BOTH the per-type filter
       values AND the `*AnnTypeDisplay` arrays (`:124-158` filters, `:164-193` display). So the seeded container
       carries display defaults too (which the minted code needs so the quant page shows default columns).
- **Pre-existing observation, DO NOT FIX (out of scope):** the seeder at
  `create_experiment_SearchFilterValuesFromDefaultCutoffs.ts:193` passes `modificationPositionAnnTypeDisplay`
  into `set_matchedProteinAnnTypeDisplay_PerProjectSearchId(...)` (looks like a copy/paste bug — likely meant a
  `set_modificationPositionAnnTypeDisplay_…`). This affects the EXISTING Create-Experiment flow, is out of
  scope for this feature, and must be **left as-is**. Noted here as observation only.

---

## 4. Build the root at Submit (extract the shared builder)

- **Extract** the three file-local module-scope const-arrow functions from
  `projPg_Expermnts_Single_MaintRoot.tsx` (all OBSERVED module-scope `const … = ({…}) => {`, 0 external
  callers → clean move):
  - `_get_searchDataLookupParamsRoot_ForSaveToDB` (`:2959`)
  - `_getSearchFilterData_ForProjectSearchId` (`:2991`)
  - `_getSearchFilterData_ForAnnType` (`:3048`)
- **New shared module:**
  `page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Build_SearchDataLookupParamsRoot.ts`,
  exporting one function
  `experiment_conditionGroupsDataContainer_Build_SearchDataLookupParamsRoot__Build({ projectSearchIds, conditionGroupsDataContainer })`
  (drop the leading `_` since exported; house prefix = filename basename `__`). Keep the two helpers file-local
  (leading `_`) in the new module.
- **Update MaintRoot** `_getExperimentRootForSave` (`:2946`) to call the extracted export — pure move,
  Create-Experiment behavior unchanged (§7).
- **SubmitRun_Component** calls the extracted builder with the distinct mapped psids +
  `_conditionGroupsDataContainer` → produces the exact shape
  `{ versionNumber:1, paramsForProjectSearchIds:{ paramsForProjectSearchIdsList:[ {projectSearchId, psmFilters, reportedPeptideFilters, matchedProteinFilters, modificationPositionFilters, psmAnnTypeDisplay, reportedPeptideAnnTypeDisplay, matchedProteinAnnTypeDisplay} … ] } }`
  (OBSERVED builder `:2983`; TS mirror `searchDataLookupParameters.ts:28,33,43,52`; identical to the sibling's
  request shape the Java `SearchDataLookupParamsRoot` unmarshals).
- **Correctness requirement (OBSERVED):** the root must contain an entry for EVERY distinct mapped
  projectSearchId — else `searcherCutoffValuesRootLevel.getPerSearchCutoffs(projectSearchId)` returns null →
  400 (`Quant_AddNew_Submit_…Controller.java:359-363`). Naturally satisfied since we seed exactly those psids.

---

## 5. Submit controller changes (option X) — `Quant_AddNew_Submit_JointFlashLFQ_Run_RestWebserviceController.java`

1. **Request DTO:** add `private SearchDataLookupParamsRoot searchDataLookupParamsRoot;` + setter to
   `WebserviceRequest` (`:551-573`). Type already imported (`:46`,
   `…search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot`).
2. **Remove the default-build** (`:304-307`) and the now-unused `@Autowired` field (`:139-140`,
   `searchDataLookupParams_Create_ForDefaultCutoffs_NoDBSave_InternalProcessingOnly_FromProjectSearchIds`) +
   its import (`:47`). Update the D6 javadoc (`:98-100`) to describe user-supplied cutoffs instead of the
   persist-free default build.
3. **Require the request root + presence checks** (§9(e)) — after unmarshal, mirror
   `FlashLFQ_Run__Request_Creation_RestWebserviceController.java:221-272`:
   - `searchDataLookupParamsRoot == null` → `Limelight_WS_BadRequest_InvalidParameter_Exception` (sibling `:221-226`).
   - `getParamsForProjectSearchIds()` null → 400 (sibling `:228-233`).
   - `getParamsForProjectSearchIdsList()` null/empty → 400 (sibling `:235-240`).
   - each requested (distinct mapped) projectSearchId must have an entry in `paramsForProjectSearchIdsList` → else 400
     (sibling `:242-258`). (The distinct mapped psids are `distinctProjectSearchIdList`, already built `:229`.)
   - `inferred`: the sibling's per-search `psmAnnTypeDisplay` non-empty check (`:260-272`) is optional here;
     our seeded container sets `psmAnnTypeDisplay` so it would pass — include it for parity/defensiveness.
4. **Feed the existing conversion (`:309-314`) UNCHANGED** — it already takes `searchDataLookupParamsRoot`;
   only the variable's source changes (now the request root instead of the removed default-build). Everything
   downstream that consumes per-search cutoffs is logic-unchanged (see "Confirmations" below).
5. **Mint the code from the same root — SUCCESS PATH ONLY (§9(c)):**
   - **Capture the auth result** (correction #1, load-bearing): the controller currently calls
     `validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.validateProjectOwnerAllowed( projectIds, httpServletRequest )`
     as a bare statement, **discarding the return** (`:239`). Change to capture it:
     `… result = validateProjectOwnerAllowed( projectIds, httpServletRequest )` and use `result.getUserSession()`
     (getter `ValidateWebSessionAccess_…_ProjectIds.java:76-77`).
   - **Inject** `SearchDataLookupParametersLookupCode__Create_InsertToDB__Service_IF` (bean exists — the psb
     interceptor injects it, `DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor.java:133`).
   - **Build `SearchDataLookupParams_CreatedByInfo`** mirroring
     `Get_SearchDataLookupParametersLookupCode_RestWebservice.java:137-144`:
     `setCreatedByRemoteIP(httpServletRequest.getRemoteAddr())` + default
     `setCreatedByUserType(SearchDataLookupParametersLookup_CreatedByUserType.WEB_NON_USER)`; then the WEB_USER
     upgrade when `userSession != null && userSession.getUserId() != null`
     (`setCreatedByUserId(...)` + `WEB_USER`), mirroring `:251-256`.
   - **Call the mint service** (else-if branch: existing root → save + create code):
     ```java
     var mintResult = searchDataLookupParametersLookupCode__Create_InsertToDB__Service
         .searchDataLookupParametersLookupCode__Create_InsertToDB__Service(
             projectId, searchDataLookupParamsRoot, null /* projectSearchIds_CreateDefault */, createdByInfo );
     String searchDataLookupParamsCode = mintResult.getSearchDataLookupParamsCode();
     ```
     Passing `projectSearchIds_CreateDefault = null` hits the mint service's else-if
     (`SearchDataLookupParametersLookupCode__Create_InsertToDB__Service.java:132-151`: existing root →
     `searchDataLookupParams_Save_Create_Code(..., SearchDataLookupParametersLookupRootIdTypes.PROJECT_SEARCH_IDS, null, createdByInfo)`).
     (correction #3: the enum is `SearchDataLookupParametersLookupRootIdTypes`, NOT `ROOT_ID_TYPES`.)
   - **Placement (correction #4):** mint at the SUCCESS build point (`:527-529`, where `webserviceResult.status = true`
     and `searchDataLookupParamsRoot` is in scope), AFTER the no-PSMs early-return (`noPsmsToQuantify`, `:433-443`)
     and AFTER any send-failure early-returns (PER_FILE `:481-490`, JOINT `:509-517`). So a failed / no-PSMs
     submission never mints an orphan code. Note `:396-403` is the no-PSMs *detection* that accumulates
     `noPsmsPairs` (NOT an early-return).
6. **Response DTO:** add `String searchDataLookupParamsCode;` + getter to `WebserviceResult` (`:610-640`); set
   it on the success path alongside `:527-529`.

**Confirmations (OBSERVED, logic unaffected by the root's new origin):**
- conversion `:309-314` (`createSearcherCutoffValuesRootLevel_From_WebserviceRequestCutoffs`),
- per-search cutoffs `getPerSearchCutoffs(projectSearchId)` `:358`,
- gather `gatherPsms_ForSingleSearch(...)` `:384-390`,
- no-PSMs detection `:396-403`, mapped-file filter + D7 rebuild `:405-428`,
- JOINT/PER_FILE send `:469-525`.
All read from `searcherCutoffValuesRootLevel`; none depend on how the root was built.
**There is NO D4 2-decimal display-collision gate in this controller** (that gate lives only in the sibling
`FlashLFQ_Run__Request_Creation` controller) — nothing to re-check here.

---

## 6. FE code storage + URL swap

- **`projPg_Quant_SubmittedRun.ts`** (`ProjPg_Quant_SubmittedRun`, `:72-113`): add
  `readonly searchDataLookupParamsCode: string` to the constructor param object + field.
- **`projPg_Quant_Submit_JointFlashLFQ_Run_ToServer.ts`:**
  - add `searchDataLookupParamsRoot` to the request object built at `:101-107` (pass the root from §4).
  - add `searchDataLookupParamsCode: string` to the `__Result` interface (`:70-82`) and to the off-the-wire
    response-shape type; **validate it at runtime** as a required string (house
    `limelight__variable_is_type_number_Check`-style + `throw`; string variant) in the response mapping
    (`:150-221`), consistent with the "declare required, validate at runtime" rule. (It is always present on a
    success response.)
- **`projPg_Quant_SubmitRun_Component.tsx`:**
  - pass the built `searchDataLookupParamsRoot` into the submit call `projPg_Quant_Submit_JointFlashLFQ_Run_ToServer__Submit(...)` (`:222`).
  - pass `searchDataLookupParamsCode: result.searchDataLookupParamsCode` into
    `new ProjPg_Quant_SubmittedRun({...})` (`:302-309`).
- **`projPg_Quant_BuildRunHash.ts` — swap A-block → minted code:**
  - `_buildQuantPsbPageUrl_FreshLoad` (`:172-200`): replace the fresh-load of projectSearchIdCodes + A-block
    assembly (`:181-197`, DOM-delimiter read `:97-108`) with the passed `searchDataLookupParamsCode`. Return
    `psbPagePath + searchDataLookupParamsCode + "/r" + "#" + hashFragment` (URL `:199`). The trailing `/r`
    stays; the `/d/pg/psb/**` interceptor only reads path element `[1]` for the code
    (OBSERVED `DataPage_…Interceptor.java:225` `requestURI_StartAtPageLabelSplit[1]`; A-block vs standard-code
    branch `:230-254`). A standard minted code does NOT start/end with the A-block delimiter, so it takes the
    standard branch `:254` (`_process_Standard_searchDataLookupParametersLookupCode` `:420`), which looks the
    code up in the DB and stamps projectSearchIds + cutoffs on the request.
  - the two public builders `__BuildQuantPsbPageUrl_FreshLoad` (`:142`) and
    `__BuildQuantProteinPsbPageUrl_FreshLoad` (`:158`): change their param from `projectSearchIds` to
    `searchDataLookupParamsCode`. `inferred` cosmetic: rename off `_FreshLoad` (no load remains) — optional;
    do it if it doesn't balloon the diff.
  - `getSearchesSearchTagsAndFolders_…` import (`:27`) and `_read_ProjectSearchIdCode_A_Block_Delimiters_FromDOM`
    (`:97`) become unused in the psb-page builder — remove if no other export in the file uses them (the
    hash-fragment + viewer-URL builders `:66-89` do not).
- **`projPg_Quant_RunsList_Component.tsx`:** at BOTH URL-build call sites — `_quantLink_Clicked` (`:440`) and
  `_quantProteinLink_Clicked` (`:492`) — pass `searchDataLookupParamsCode: run.searchDataLookupParamsCode`
  instead of `projectSearchIds`; drop the `_distinctProjectSearchIds_ForRun({run})` calls feeding these
  (`:436`, `:488`) if unused elsewhere. Both peptide + protein links pick it up (shared
  `_buildQuantPsbPageUrl_FreshLoad`). **These builders are called at LINK-CLICK time in the runs list, NOT at
  submit** — so the code must be persisted on the run (below).
- **`projPg_Quant_RunsList_SessionStorage_SaveGet.ts`:** serialize/deserialize the new
  `searchDataLookupParamsCode`. The run is reconstructed via `new ProjPg_Quant_SubmittedRun({...})` (`:251`).
  **§9(d):** on load, **DROP/SKIP any persisted run lacking `searchDataLookupParamsCode`** (never reconstruct a
  run that would build a broken URL). Impact is limited to stale same-session tabs (the whole workstream is
  uncommitted; sessionStorage is per-tab).

---

## 7. Regression surface

- **Create-Experiment must keep working:** the widget rename touches only its import/tag at
  `projPg_Expermnts_Single_MainCellMaint.tsx:20/:389` (behavior identical, same props). The root-builder
  extraction (§4) is a pure move with MaintRoot `:2946` updated to call the export. No experiment logic
  changes. Verify create + maint: open the filter overlay from a cell, edit, Save; save the experiment.
- **Sibling controller untouched:** we change only the quant controller's root *source* + add minting. The
  shared gather/convert service and factory signatures are unchanged; the sibling still calls them identically.

---

## 8. CDP test plan (for the build; login admin/admin, project 25)

1. **Default filters, unchanged:** submit from Add-New-Quant WITHOUT opening the filter overlay (defaults).
   Assert the quant peptide page + quant protein page URLs carry a real minted standard code as path element
   `[1]` (NOT an `A…A` block); both pages return 200 and render quant columns. **Surface the seeded default
   filter values** (dump container per-type annTypeId→value after seeding) for Dan to eyeball vs today's server
   defaults (the §9(4)/decision guard). **Test-calc:** page-displayed cutoffs == seeded defaults.
2. **Changed filters:** open "Set Search Filters", raise a PSM (or Peptide) cutoff, Save; submit. Assert both
   quant pages load at the CHANGED cutoffs AND the gathered/displayed set shrinks accordingly (**test-calc:** a
   stricter cutoff must reduce peptide/PSM counts vs run 1). Exercises FE→root→controller gather→minted
   code→page display end to end.
3. **Create-Experiment regression:** create/maint an experiment, open the (renamed) filter widget as an
   overlay, edit + Save, save the experiment — unchanged.
4. **Multi-search (Category-B) run:** the widget shows one per-search block per distinct mapped projectSearchId
   (intended); the root covers all; PER_FILE mode. Assert submit succeeds and the code resolves.

---

## 9. Baked-in final decisions (recap)

- **(a) Overlay-on-button (OPTION ii):** zero widget change; "Set Search Filters" button in
  `projPg_Quant_SubmitRun_Component.tsx` below "Mapping saved (in memory)" / above "Submit Quant run"; Save →
  store container on instance field + close; Cancel/X → close without applying. (§2)
- **(c) Mint only on success:** failed / no-PSMs-to-quantify submit must not create an orphan code. (§5.5)
- **(d) SaveGet drops runs lacking the code:** never build a broken URL. (§6)
- **(e) Require the request root + sibling presence checks** (`:228-272` mirror). (§5.3)
- **(f) Rename only the widget:** container/seeder stay `Experiment_`-named. (§1)

## 10. Verification corrections folded in (confirmed against source)

1. Capture the discarded auth result at controller `:239`; use `result.getUserSession()`
   (`ValidateWebSessionAccess_…_ProjectIds.java:76-77`); build `CreatedByInfo` per
   `Get_SearchDataLookupParametersLookupCode_RestWebservice.java:137-144` + WEB_USER upgrade `:251-256`. (§5.5)
2. Seeder's `conditionGroupsDataContainer` param is required (no `?`); it reads
   `searchesData.defaultFilter_Cutoffs_Overrides_ProjectWide_Root` (`:53`) and sets the `*AnnTypeDisplay`
   arrays (`:165-193`). (§3)
3. Mint enum is `SearchDataLookupParametersLookupRootIdTypes` (NOT `ROOT_ID_TYPES`); root import in the quant
   controller is `:46`. (§5.5, §5.1)
4. Mint on the success build (`:527-529`, root in scope). `:396-403` is no-PSMs *detection*/accumulation, NOT
   an early-return. (§5.5)
5. The three extract-to-shared functions (`projPg_Expermnts_Single_MaintRoot.tsx:2959/:2991/:3048`) are
   module-scope const arrows, file-local, 0 external callers — clean move. (§4)
6. DO NOT fix the pre-existing seeder bug at `create_experiment_SearchFilterValuesFromDefaultCutoffs.ts:193`
   (`modificationPositionAnnTypeDisplay` passed to `set_matchedProteinAnnTypeDisplay_…`) — affects the existing
   experiment flow, out of scope; observation only. (§3)

---

## 11. Rework 2026-09-02 — button → interactive block + global overlay restyle (BUILT, uncommitted)

Reworked the submit-overlay filter UX (FE-only; tsgo exit 0; FE build deployed; CDP-verified). Three parts:

- **Part 1 — global overlay restyle** (`data_pages_common/searchesFilters_UserSet_Component.tsx`): a **green
  (limegreen) separator BETWEEN searches** now renders in the shared filter widget (reuses the legacy
  `search-cutoffs-user-input-search-separator` class, `border-color $site-color-dark = #32cd32`, 20px top
  border), with the existing vertical-scroll container. GLOBAL — both Create-Experiment and Add-New-Quant get
  it. Header text "Set Search Filters" unchanged. (CDP OBSERVED: 2-search widget → exactly 1 separator,
  computed `borderTopColor rgb(50,205,50)`, `borderTopWidth 20px`.)
- **Part 2 — extract the "Assigned Searches" block to a shared module**
  `data_pages_common/searchAssigned_WithFilters_Component.tsx`: moved `Search_Assigned` (→ exported
  `SearchAssigned_WithFilters_Component`) + its children (`Search_Assigned_FilterData_ForType[_SingleEntry]`,
  kept private) + the entry-builder helpers (`_createSearchLists` → exported
  `searchAssigned_WithFilters_Component__createSearchLists`, `_createSearchSelectedEntry[_PerType]` kept
  private) + the `SearchSelected_Entry[_FiltersForType_PSM_Etc]` types (kept private) out of
  `projPg_Expermnts_Single_MainCellMaint.tsx`. Added a **required** `showDeleteSearchIcon: boolean` prop
  gating the delete/remove-search icon. MainCellMaint now imports the shared component+helper and passes
  `showDeleteSearchIcon: true` (its state `searches_Selected` typed via `ReturnType<typeof …__createSearchLists>`).
  Pure move — Create-Experiment behavior unchanged (CDP OBSERVED: delete icon + "Change Searches" button still
  present; in-memory edit+Save still works; no experiment persisted).
- **Part 3 — render the interactive block on the quant submit overlay**
  (`project_page_quant_section/projPg_Quant_SubmitRun_Component.tsx`): the standalone "Set Search Filters"
  button is **replaced** by the extracted block (one `SearchAssigned_WithFilters_Component` per distinct mapped
  projectSearchId, `showDeleteSearchIcon: false`, no "Change Searches" button), indented 100px inside nested
  `<div>`s (room for a later expand/collapse header). The block entries are built once via the shared helper into
  an instance field `_searches_Selected` (rebuilt on load + on each widget Save — no memoization). Clicking any
  filter value / label / edit pencil fires `filterEntryClicked` → the existing `_openFiltersOverlay()` (opens the
  change overlay with all searches). Yellow highlight (`not-default-value`, `#F2DC84`) kept as-is. (CDP OBSERVED:
  block renders indented, project-wide-override cutoffs yellow, no delete icon / no change-searches / no old
  button; edit a q-value in the overlay → Save → block updates to the new value AND turns yellow; submit mints a
  DIFFERENT code for the edited cutoffs; both quant pages HTTP 200; no console errors.)

STOP-gated after this rework: no commit/push/snapshot.

---

**STOP-gated.** This doc is the executable plan only. No code, no build, no commit/push/snapshot until the
review session verifies it and the build is authorized.
