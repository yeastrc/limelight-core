# FlashLFQ quant — per-scan-file run keying (single search w/ sub-searches) — implementation plan

**Status:** PLAN (not yet implemented). **Created:** 2026-07-31.
**Goal:** move the FlashLFQ run grain from **per search** to **per (search, scan file)** so a single
search's multiple scan files (its "sub searches"/sub-groups) each get their own run + requestId + URL-hash
entry, and each renders its own quant — **never summed across scan files**.

Read the governing-rule docs first: `flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md`
and the live status index `flashlfq_quant_status_and_decisions.md` (this plan resolves that doc's
"multi-scan-file within one search = DECLINED" row and Open decision #5 / mode-3).

> **Line references below are as of this writing on the held/uncommitted quant code** and will drift —
> grep the anchor names/symbols, don't trust the exact numbers.

---

## 1. What changes (one line)

Today a run is keyed `projectSearchId → requestId` and any search with >1 scan file is **rejected**. This
change keys runs `projectSearchId → searchScanFileId → requestId`, allows a **single** multi-scan-file
search **when it has sub-groups**, and shows a per-sub-group quant column instead of one per search.

## 2. Governing constraint (non-negotiable)

**Quant may NOT be summed across scan files.** So the deliverable is **one quant value per scan file
(per sub-group)** — never one summed number for the multi-file search. Per-scan-file run keying is exactly
what keeps each file's MS1 measurement separate all the way to its display column.

## 3. Precondition / invariant (must hold, already enforced)

Per-scan-file quant is attributable to a sub-search only when **sub-groups partition scan files** (no scan
file mixes >1 sub-group). Enforced by `Search_AnyScanFile_HasPsms_In_MultipleSubGroups_ForSearchId_Searcher`
(returns TRUE = cross-cut = ineligible). Scan file and sub-group are **independent** per-PSM attributes with
no guaranteed alignment, so this must be validated, not assumed.

## 4. Locked decisions (2026-07-31)

1. **`searchScanFileId` (`search_scan_file_tbl.id`) everywhere** — hash, run keying, response contract,
   display restriction. It is readily available on the search (including in the front end). `scanFileId`
   (`scan_file_tbl.id`) stays ONLY as the FlashLFQ **sample-identity** field already inside the service
   request (`Request_To_FlashLFQ_Service_Per_SpectralStorageServiceFile.scan_file_id`), unchanged.
2. **Multi-file permitted only when: exactly 1 search AND that search has sub-groups.** Otherwise a search
   with >1 scan-file record is rejected (multi-search views remain single-file-only, as today).
3. **The cross-cut searcher is called ONLY when a search has >1 scan-file record** — never for single-file
   searches (they partition trivially).

## 5. The gate (replaces the current multi-scan-file guard)

Replaces the `errorAtLeastOneSearchHasMoreThanOneScanFile` guard in
`FlashLFQ_Run__Request_Creation_RestWebserviceController` (~`:399-422`). Uses only data already gathered
(`searchScanFile_For_SearchIds_Searcher` for the per-search scan-file count) plus two existing searchers:
`Search_Has_SearchSubGroups_ForProjectSearchIdSearcher_IF` and
`Search_AnyScanFile_HasPsms_In_MultipleSubGroups_ForSearchId_Searcher`.

```
numSearches = projectSearchIdList.size()

for each (projectSearchId → searchId):
    scanFileCount = # search_scan_file records for searchId
    if scanFileCount <= 1:
        OK                                              // normal path — NO cross-cut call
    else:                                               // > 1 scan file
        if numSearches != 1:               reject       // multi-file only in a single-search view
        else if ! Search_Has_SearchSubGroups(projectSearchId):  reject   // needs sub-groups
        else if crossCut(searchId):        reject       // sub-groups don't partition scan files
        else:                              OK           // → per-scan-file runs
```

Rejection is all-or-nothing (nothing submitted), surfaced as one typed error flag + reason (replacing
`errorAtLeastOneSearchHasMoreThanOneScanFile`) so the UI can show which rule failed: not-single-search /
no-sub-groups / cross-cut.

**This same §5 rule is enforced in TWO places (must stay in agreement):**
1. **Front end** — hides/does-not-offer the "View/Add Quant" button when the rule would reject (§7.7),
   so the user never submits a request that will be refused.
2. **Server submit webservice** — the authoritative gate in the run controller above (bypassed UI, stale
   page, direct call). The front-end gate is a UX convenience; the server gate is the real enforcement,
   per the page↔webservice auth/consistency contract.

Concretely, a **single search with >1 scan-file record and NO sub-groups is NOT allowed to compute quant**
— the button is hidden AND the submit webservice rejects it.

## 6. Run loop simplifies to one uniform shape

**Architecture — who fans out (the server, not the browser):** the front end submits **ONE** request,
unchanged in shape — `{ projectSearchIds, searchDataLookupParamsRoot, flashlfq_parameters }`; it does NOT
enumerate or send searchScanFileIds (preserving the controller's rule that reported peptides + PSMs — and
now scan files — are derived SERVER-SIDE from the cutoffs, never from client-supplied ids). The **backend**
derives the scan files, applies the §5 gate, and **fans out to one FlashLFQ service call per scan file**,
each returning its own `requestId`; the response is a list of per-`(searchScanFileId, requestId)` entries.
The browser then writes each into the URL hash. So: **one browser request in → N FlashLFQ runs out → N hash
entries** — searchScanFileId is assigned/returned by the server, never sent by the browser. The front end
uses searchScanFileId only (a) *before* submit to gate the button via the scan-file loader (§7.7) and (b)
*after* submit to tag the returned requestIds into the hash (§7.3).

Because `searchScanFileId` keys every run, the per-search send loop becomes **"one FlashLFQ run per scan
file, per search"** uniformly:
- a normal single-file search → exactly 1 run (behavior unchanged, now tagged with its `searchScanFileId`);
- the one allowed multi-file search → *N* runs, one per scan file.

No special-case bundled-vs-split path. Each run is single-file, so **MBR stays off** automatically
(consistent with `flashlfq_per_scan_file_separate_run_rationale.md`).

**Scale flag:** a search with *N* scan files fires *N* sequential FlashLFQ service calls and puts *N*
entries in the URL hash. Note long-hash / many-run behavior (per the "flag accumulating batched data"
habit).

## 7. Complete file-by-file mapping

### 7.1 Backend — `FlashLFQ_Run__Request_Creation_RestWebserviceController.java`
- **Gate (~`:399-422`)** — remove multi-scan-file guard; implement §5. Wire the two new searchers
  (`Search_Has_SearchSubGroups_ForProjectSearchIdSearcher_IF`, cross-cut searcher) as `@Autowired`.
- **Send loop (~`:471-518`)** — iterate per scan file per search (§6); one `Request_To_FlashLFQ_Service_Root`
  per file (single-element `spectral_data`), capturing that file's `searchScanFileId → requestId`.
- **`SearchScanFile_APIKey_Filename` (~`:1407-1411`)** — add `searchScanFileId` (already the map key in
  `gather_ScanFiles`; carry it into the value).
- **`Request_To_FlashLFQ_Service_Per_SpectralStorageServiceFile` (~`:1511-1536`)** — add `searchScanFileId`
  so the send loop can read it back (harmless to the service).
- **`WebserviceResult_PerSearch` (~`:1658-1681`) + `WebserviceResult` (~`:1640-1656`)** — add
  `searchScanFileId` (result is now one entry per (search, file)); replace
  `errorAtLeastOneSearchHasMoreThanOneScanFile` with the typed reject reason.
- **Untouched:** the open-mod and PSM-level variable-mod reject tripwires, the `scan_file_id` sample
  identity, mass computation.

### 7.2 Webservice-call TS — `flashLFQ_Run_RequestCreation_WebserviceCall.ts`
- `..._Result_PerSearch` (~`:24-30`) — add `searchScanFileId : number`; entries are now per (search, file).
  Replace `errorAtLeastOneSearchHasMoreThanOneScanFile` (`:37`) with the reject-reason field.

### 7.3 Hash producer — `flashLFQ_Run_RequestCreation_InitiateAndShowResult.ts`
- `:99` — `projectSearchId + "_" + searchScanFileId + "_" + requestId` (was `projectSearchId + "_" + requestId`).
- `:88-104` — iterate per (search, file) results; success/failure lines name the scan file.
- `:68-77` — repurpose the error alert to the new reject reasons (or defer to the container gate).
- `:110` `window.location.hash = hashPairs.join("-")` — unchanged (`_` within, `-` between).

### 7.4 Hash parser + quant data model — `quant_PrototypeData.ts`
- `_ProjectSearchIdRequestIdPair` (~`:458-461`) — add `searchScanFileId : number`.
- `_parseHash_ToPairs` (~`:476-493`) — parse **three** fields (split on first two `_`; requestId is dashless
  hex → unambiguous).
- `_Peak` (~`:101-110`) — add `searchScanFileId?`.
- `_parseText_ToParts` (~`:376-437`) — take `searchScanFileId?`, tag each peak (~`:431`).
- `_fetchAndParse_ForPair` (~`:497-510`) / load loop (~`:560`) — thread `searchScanFileId` through.
- `get_QuantForDisplayForm(..., restrictToProjectSearchId?)` (~`:201-266`) — add `restrictToSearchScanFileId?`
  and apply in the peak filter (~`:252`); add companion `hasSearchScanFileId_PerPeak` /
  `_peakIndicesBySearchScanFileId` mirroring the existing projectSearchId plumbing (`:157`, `:173-175`, `:191`).

### 7.5 Display — peptide-list table (drives peptide page AND single-protein overlay)
`proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Create_TableData.tsx`:
- Today: one Quant column per search restricted by `projectSearchId` — header ~`:558`, cell ~`:1251-1265`
  (`get_QuantForDisplayForm(rpids, projectSearchId)`).
- Change: emit a Quant column **per sub-group**, parallel to the existing per-sub-group PSM-count columns
  (~`:456-490` headers, ~`:1076-1120` cells), each restricted by `(projectSearchId, searchScanFileId(s) of
  that sub-group)`.
- Needs a **subGroup → searchScanFileId(s)** mapping, derivable under the partition invariant from
  `psmId → subGroupId` (`searchSubGroupId_ForPSM_ID_Holder`, already loaded here) joined with per-PSM
  `searchScanFileId`. **VERIFIED (2026-07-31):** the **filtered** PSM-table-data loader
  `...PSM_TblData_For_ReportedPeptideId_For_MainFilters` carries `searchScanFileId` on each per-PSM entry
  (`...Holder__ForSinglePsmId.searchScanFileId`, keyed by psmId via `get_PsmTblData_For_PsmId(psmId)`). Use
  this filtered/main-filters loader — **NOT** the unfiltered `..._NO_PSM_Peptide_Protein_Filtering__PSM_TblData`
  loader (that ignores the user's cutoffs; do not use it — ask first). This resolves the status doc's Open
  decision #5.
  **Guard:** the field is annotated `// Can be null` — handle null (a PSM with no scan file can't be
  attributed to a scan file / sub-group column). The searchScanFileId *set* per search also comes from the
  scan-file loader the button gate uses (§7.7).
- Pass-throughs: `..._GeneratedReportedPeptideListSection_Component.tsx`,
  `peptidePage_Display_MainContent_Component.tsx` (both already thread `quant_PrototypeData` +
  `searchSubGroup_Ids_Selected`).

### 7.6 Standalone panel — `quant_PrototypeDisplay_QuantifiedPeaks_Component.tsx`
- Lower priority (throwaway panel): update per-search rollup to per-(search, file) if the panel should
  reflect the finer grain.

### 7.7 Front-end button gate — `quant_Container_Component.tsx` (+ `quant_ViewAddQuant_Button_Component.tsx`)
The "View/Add Quant" button must apply the **same §5 rule** so the user never submits a request the server
will reject. All facts are available **client-side from existing loaders** — no webservice extension for
scan-file count:

- **Scan-file count per search** — the existing common loader
  `commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId` (multi-
  search) / `..._SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch` (single). Holder:
  `get_For_ProjectSearchId(projectSearchId).get_SearchScanFileData_EntryCount()` → the `>1` check; it also
  enumerates each `searchScanFileId` (`get_SearchScanFileData_IterableIterator()` /
  `get_All_SearchScanFileIds()`).
- **Sub-group presence** — `dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId(projectSearchId)`.
- **numSearches** — `dataPageStateManager.get_projectSearchIds().length` (page fact).
- **Cross-cut** — the existing per-search webservice
  (`flashLFQ_Quant__AnyScanFile_HasPsms_In_MultipleSubGroups__WebserviceCall`), **called only for a search
  whose scan-file count is >1** (decision 3), not unconditionally.

Gate logic (mirror of §5): show the button only if, for every selected search, `scanFileCount <= 1` OR
(`numSearches == 1` AND that search `hasSubGroups` AND NOT cross-cut). Otherwise hide the button and show
the "not available" reason.

- **Fixes today's over-decline:** `:61-83` currently calls the cross-cut webservice for **every** search and
  declines if any cross-cuts — but a single-file search whose one file holds multiple sub-groups returns TRUE
  from that SQL yet is always fine (one quant value). Only call cross-cut in the `>1`-file branch.
- The server submit webservice (§7.1) still enforces §5 independently — the button gate is UX only.

### 7.8 Docs to update (committed)
- `flashlfq_quant_status_and_decisions.md` — flip the multi-scan-file "DECLINED" row + Deferred list; move
  Open decision #5 / mode-3 to implemented.
- `flashlfq_per_scan_file_separate_run_rationale.md` — per-file runs now the live path.
- `flashlfq_quant_subgroup_scanfile_eligibility.md` — cross-reference the new gate.

## 8. Open questions still to resolve (do not silently decide)

- **Multi-file search with sub-groups that only PARTIALLY cover the selected sub-groups** — display/label of
  a sub-group with no scan file, or a scan file whose sub-group isn't selected.
- **Apex vs area** and **decline scope/messaging** — unchanged from the status doc's open decisions; not in
  scope here.

---

## 9. Ordered implementation task list

Ordered by dependency (server contract first, then wire outward, then display, then reconcile, then docs).

1. **Backend gate** — replace the multi-scan-file guard with §5; autowire
   `Search_Has_SearchSubGroups_ForProjectSearchIdSearcher_IF` + the cross-cut searcher; add the typed
   reject-reason enum/flag. Verify single-file multi-search still works and each reject reason fires.
2. **Backend run keying** — carry `searchScanFileId` into `SearchScanFile_APIKey_Filename` and
   `Request_To_FlashLFQ_Service_Per_SpectralStorageServiceFile`; unify the send loop to one run per scan
   file per search (§6); add `searchScanFileId` to `WebserviceResult_PerSearch`.
3. **TS webservice interface** — `flashLFQ_Run_RequestCreation_WebserviceCall.ts`: add `searchScanFileId`
   to `..._Result_PerSearch`; swap the error field for the reject reason.
4. **Hash producer** — `flashLFQ_Run_RequestCreation_InitiateAndShowResult.ts`: emit
   `projectSearchId_searchScanFileId_requestId`; per-(search,file) messaging; new reject messaging.
5. **Hash parser + data model** — `quant_PrototypeData.ts`: 3-field parse; tag peaks with `searchScanFileId`;
   add `restrictToSearchScanFileId` + companion index to `get_QuantForDisplayForm`.
6. **Front-end button gate** — `quant_Container_Component.tsx` (+ button component): apply the §5 rule using
   the existing scan-file loader (`get_For_ProjectSearchId(...).get_SearchScanFileData_EntryCount()`),
   `SearchSubGroups_Root`, and `numSearches`; call the cross-cut webservice only in the `>1`-file branch.
   Hide the button + show the reason when the rule rejects (§7.7). Fixes today's over-decline.
7. **subGroup → searchScanFileId mapping** — per-PSM `searchScanFileId` is confirmed loaded (PSM-table-data
   loaders, VERIFIED — see §7.5). Build the mapping (client-side under the partition invariant) from
   `psmId → subGroupId` + per-PSM `searchScanFileId`, guarding the nullable field.
8. **Per-sub-group Quant columns** — `...Create_TableData.tsx`: replace the single per-search Quant column
   with per-sub-group columns restricted by `(projectSearchId, searchScanFileId(s))`; thread through the
   section + main-content components.
9. **Standalone panel** (optional) — `quant_PrototypeDisplay_QuantifiedPeaks_Component.tsx` finer grain.
10. **Docs** — update the three docs in §7.8.
11. **Build + verify** — front-end type-check (tsgo) + WAR build; end-to-end: submit a single multi-file
    search with sub-groups, confirm N runs / N hash entries / per-sub-group columns, and confirm each reject
    path (multi-search + multi-file, multi-file no sub-groups, cross-cut).

## 10. Not in scope / stays as-is

- Open-mod quant (deferred, tripwires stay). Dynamic (PSM-level variable) mod searches (excluded). Summing
  quant across searches/conditions (declined). `scanFileId` as FlashLFQ sample identity. Mass computation.
- All feature code stays **held/uncommitted**; lands with the rest of the quant feature per the status doc's
  commit gate (Track B).
