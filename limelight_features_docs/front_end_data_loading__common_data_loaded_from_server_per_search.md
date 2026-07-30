# Front end: `CommonData_LoadedFromServer` per-search data-loading subsystem

Reference for the **client-side data-loading tree** rooted at
`page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.ts`
plus its two sibling ROOT trees for scan data and feature-detection data.

This subsystem is the **pull-model cache layer** the data pages use to fetch and hold everything they read
from the server per search: reported peptides, PSMs, proteins, modifications, annotations, scan data, and
feature-detection data. It is **not** a generic API client — every leaf class owns one piece of data, knows
its own webservice endpoint, loads lazily on first request, and holds the result for the instance's lifetime.

**Pages served** (per `ZZ_README.txt`): Peptide main page, Protein main page, Single Protein Overlay, and the
QC page — each in both Project-Search-Id and Experiment variants. It **EXCLUDES the Mod Main Page** (except the
Single Protein Overlay reachable from it); every file header repeats this.

> Scope note: this documents the *loading/caching* tree only. The `searchDataLookupParameters` (the
> PSM/peptide/protein filter cutoffs that key the "filtered" loaders) and `DataPageStateManager` (source of the
> per-search flags/info) are inputs, documented elsewhere.

### Status & keeping this current

**Verified 2026-07-30** against the source: all 53 endpoint literals were grep-confirmed; every leaf loader's
"depends on" accessor name, cache mechanic, and named response field was checked by a full read of its file.
Treat the specifics below as accurate as of that date — but this doc **will drift** as the code changes, and a
stale reference misleads an agent more than a human. When you touch this subsystem, update this doc in the same
change, and **re-verify before relying on a fine detail** rather than trusting the doc blindly. The parts that
rot fastest: **endpoint `-version-000N` suffixes** (bumped whenever a webservice contract changes), the exact
**response field names**, and **cache internals**. The stable parts: the hierarchy (§2), the load-once contract
(§1), and the `ReportedPeptideId_Based_Data` dependency root (§3). Quick re-verification recipe:
`grep -rhoE 'const url = "[^"]+"' <the three dirs>` for endpoints; read a loader's `_load_..._Data()` +
`_process_WebserviceResponse()` for its params/fields.

**Identifiers & how to grep them.** Every loader is exactly one file. Each identifier shown in the §5 catalogs is
an **exact substring of the file basename** — grep it to open the file. The **instantiated class name** = the
basename with `commonData_` → `CommonData_` (e.g. file `…SingleSearch__ProteinInfo_For_MainFilters.ts` → class
`CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters`). **This mechanical rule holds for every
tree EXCEPT the four `_MainClass` loaders in the scan-data tree (§5.5)** — `ScanFileCode_FirstSix`,
`ProjectScanFilenames`, `ProjectSearchIds`, and `ScanData_Summary_Data` — whose class names diverge from the
basename by more than a suffix (e.g. file `…_Scan_Summary_Data.ts` → class
`CommonData_LoadedFromServer__ScanData_Summary_Data_For_Single_ProjectScanFileId_MainClass`). For those, grep the
identifier to find the **file** and read the exact class from it (or from the Tree A ROOT getters listed in §2).
A few getter names also diverge from their class name — see §2.

---

## 1. The load-once / rebuild-on-input-change contract

Every class in the tree — aggregators and leaf loaders alike — follows the same lifecycle:

- **Private constructor + static `getNewInstance({...})` factory.** Aggregators never `new` a child; they call
  the child's `getNewInstance(...)`. Matches the repo's instance-field pattern (no memoization, no React state).
- **`//  !! If these values change, then create a new instance of this class`** sits above the
  constructor-captured inputs (`projectSearchId(s)`, `searchDataLookupParameters_Root` /
  `searchDataLookupParams_For_Single_ProjectSearchId`, `dataPageStateManager`, per-search flags/info). The
  instance is **immutable with respect to those inputs**: when a filter or parameter changes, the caller
  **discards the whole `...__Root` and builds a fresh one**, which cascades new `getNewInstance` calls down the
  entire tree. There is no in-place invalidation.
- **Lazy load-once + in-flight dedup.** A leaf's public accessor is `get_<X>_ReturnPromise()` (always returns a
  Promise). Internally most expose the two-shape `get_<X>()` → `{ data, promise }`: if already loaded, `data` is
  set and `promise` is `undefined`; otherwise `data` is `undefined` and `promise` resolves after the load.
  Loaded results are cached on a `_get_..._FunctionResult` field (or a keyed `Map`); a `_promise_..._InProgress`
  field (or promise `Map`) dedups concurrent callers so only one webservice call goes out. Several loaders
  assert that a second call arrives with the **same** `reportedPeptideIds` Set it started for.
- **The webservice call is always** `webserviceCallStandardPost({ dataToSend, url, dataRetrieval_CanRetry: true })`
  (see `page_js/webservice_call_common/webserviceCallStandardPost.ts`), with a private
  `_process_WebserviceResponse({ responseData })` decoding the payload into the `_Holder`. Errors funnel through
  `reportWebErrorToServer.reportErrorObjectToServer`.
- **`_Holder` classes** are the returned data objects. They frequently build **secondary lookup maps and
  I→L-normalized string variants lazily on first request** and cache them on the holder (again: explicit
  instance-field caches, rebuilt only when the owning instance is rebuilt).

Endpoint URL path prefixes: `d/rws/for-page/psb/…` = projectSearchId-based; `…/psfb/…` = projectScanFileId-based;
`…/fdb/…` = feature-detection-based; `…/for-page/…` (no sub-prefix) = the remaining project-scan-file-id ones.
**Two loaders use a bare controller path with no `d/rws/` prefix** — see §6.

---

## 2. Object hierarchy

`CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root` (constructed from
`projectSearchIds`, `searchDataLookupParameters_Root`, `DataPageStateManager`) owns:

| Child (Root getter) | What | Keyed |
|---|---|---|
| `get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(id)` | **Single-search, filtered** holder | `Map` by `projectSearchId` |
| `get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(id)` | **Single-search, UNfiltered** holder | `Map` by `projectSearchId` |
| `get__commonData_LoadedFromServer__Multiple_ProjectSearchIds()` | **Across all searches** (multi) | one instance |
| `get__commonData_LoadedFromServer__CommonAcrossSearches()` | **Common across searches** | one instance |
| `get__commonData_LoadedFromServer_From_ProjectScanFileId___ROOT()` | **Scan-data** sibling ROOT (Tree A) | passed in or self-created |
| `get__commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT()` | **Feature-detection** sibling ROOT (Tree B) | passed in or self-created |

The two per-search `Map`s are filled in one loop over `projectSearchIds`; for each id the loop pulls that
search's `SearchDataLookupParams_For_Single_ProjectSearchId`, `DataPage_common_Flags_SingleSearch`, and
`DataPage_common_Searches_Info_SingleSearch` from the `DataPageStateManager`. Every child holds a back-pointer
to its parent (`get_ParentObject()` / `parentObject_..._Root`), which is how a leaf reaches sibling data while
loading. The two sibling ROOTs may be **passed into** Root (reused across rebuilds) or self-created when absent.

Each **level-holder** exposes its leaf loaders via `get_<leafClassName>()`-style getters that mostly mirror the
leaf class name, with a few **verified naming divergences** worth knowing when grepping:

- Single-search: `get_commonData_LoadedFromServer_SingleSearch__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange()`
  drops the `ScanData__` that the class/file name carries; and
  `get_commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_For_Single_SearchScanFileId_MainClass()`
  keeps a `_MainClass` suffix.
- CommonAcrossSearches: `get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters()` says
  `SingleSearch` but returns the **CommonAcrossSearches** peptide-sequences loader.
- Feature-detection ROOT (Tree B): `get_commonData_LoadedFromServer__FeatureDetection_ProjectScanFileId_…()`
  (double underscore) returns class `CommonData_LoadedFromServer_FeatureDetection_ProjectScanFileId_…` (single).

The leaf catalogs in §5 are grouped by level.

---

## 3. Dependency chain (what must load before what)

Most single-search leaves are **reportedPeptideId-driven** and chain off one base loader:

```
ReportedPeptideId_Based_Data_For_MainFilters        ← the BASE (loads the reportedPeptideId set + per-set flags)
   ├─ PeptideIds_For_MainFilters
   ├─ PSM_IDs_For_ReportedPeptideId ...              ├─ (each first calls the base for its reportedPeptideId subset,
   ├─ PSM_TblData_For_ReportedPeptideId ...          │   then hits its own endpoint)
   ├─ OpenModifications_On_PSM / OpenModification_RollUp
   ├─ ReporterIonMasses_On_PSM
   ├─ Num_PSMs_By_SearchSubGroup
   ├─ Variable_Dynamic_Modifications_(On_PSM | At_ReportedPeptide_Level)
   └─ ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds
          ├─ ProteinInfo_For_MainFilters
          ├─ ProteinSequenceCoverageData ...            (DERIVED — no call; needs base + coverage + ProteinInfo)
          └─ Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level  (DERIVED — no call)
```

- `ReportedPeptideId_Based_Data_For_MainFilters` exposes filtered-subset accessors the others consume, e.g.
  `get_reportedPeptideIds()`, `..._HasDynamicModifications()`, `..._AnyPsmHas_OpenModifications()`,
  `..._AnyPsmHas_ReporterIons()`, `..._AnyPsmHas_Variable_Dynamic_Modifications()`. If a subset is empty a leaf
  builds an **empty holder without any webservice call**.
- **Derived (no webservice call) loaders** compute purely from other loaded holders: `ProteinSequenceCoverageData`,
  `StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId`,
  `Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level`.
- **Delegating (no own call) loaders** — the single-search scan loaders resolve `searchScanFileId → projectScanFileId`
  via `ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch`, then delegate to the **Tree A** project-scan-file
  loaders (through `get_ParentObject().get__commonData_LoadedFromServer_From_ProjectScanFileId___ROOT()`), where the
  real caching + AJAX live. See §5.5.
- The four annotation-value loaders (Protein/ReportedPeptide × Descriptive/Filterable) share an identical
  **two-dimension incremental cache** (Loaded / LoadingInProgress `Set`s over both ids and annotationTypeIds; only
  the missing combinations are fetched, results merged).

---

## 4. Endpoint quick index (by path prefix)

53 distinct endpoint literals. Full per-loader detail in §5.

- **`psb` (projectSearchId-based)** — reported-peptide list, peptide-ids, peptide/protein/reported-peptide
  sequences, PSM ids/table-data/open-mods/reporter-ions/variable-mods, protein coverage/info/annotations,
  static mods, fasta stats, scan-file list, reporter-ion masses, sub-group counts, binned MS1.
- **`psfb` (projectScanFileId-based)** — scan data with/without peaks, MS1 scan numbers by RT range, scan-file
  summary.
- **`fdb` (feature-detection-based)** — persistent/singular feature entries (+ their count / min-max-id /
  max-allowed helper endpoints), persistent↔singular mapping, display-name, project-scan-file-id.
- **`for-page` (no sub-prefix)** — project scan filenames, project search ids, scan-file-code-first-six,
  gold-standard (root entries / any-exist / file-contents), feature-detection-root-entries.
- **Bare controller paths (no `d/rws/` prefix)** — see §6.

---

## 5. Leaf loader catalog

Class names are abbreviated to their distinctive suffix; the full prefix is
`CommonData_LoadedFromServer_...` per its directory. "Depends on" names the sibling loader whose data must load
first. All webservice calls use `webserviceCallStandardPost(..., dataRetrieval_CanRetry: true)` unless noted.

### 5.1 Single-search, filtered — `common_data_loaded_from_server_single_search_sub_parts__returned_objects/`

| Loader (`…SingleSearch__`) | Data | Endpoint | Keyed / cached | Depends on |
|---|---|---|---|---|
| `ReportedPeptideId_Based_Data_For_MainFilters` | **BASE** reportedPeptideIds + per-set flags (`numPsms`, has-dynamic-mods / open-mods / reporter-ions) | `psb/reported-peptide-id-list-for-search-criteria-single-project-search-id-version-0002` (+ `psb/psm-count-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0002` only if counts not inlined) | load-once, all-for-search | — |
| `PeptideIds_For_MainFilters` | reportedPeptideId↔peptideId maps | `psb/peptide-ids-for-reported-peptide-ids-version-0001` | load-once | base `get_reportedPeptideIds()` |
| `PSM_IDs_For_ReportedPeptideId_For_MainFilters` | `Map<reportedPeptideId, psmId[]>` | `psb/psm-ids-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0002` | load-once | base |
| `PSM_TblData_For_ReportedPeptideId_For_MainFilters` | per-PSM row (charge, scan#, RT, m/z, has-mods flags, decoy) — parallel **delta-encoded** arrays | `psb/psm-table-data-per-reported-peptide-id-for-searchcriteria-single-project-search-id-version-0003` | load-once; indexed by reportedPeptideId/psmId, lazily by scanNumber | base |
| `OpenModifications_On_PSM_For_MainFilters` | per-PSM open-mod masses+positions; derived rounded-mass maps | `psb/psm-open-modification-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0003` | load-once; `Math.round` masses | base `get_reportedPeptideIds_AnyPsmHas_OpenModifications()` |
| `OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters` | open mods rolled up to reported-peptide level | `psb/open-modifications-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id` | load-once | base `get_reportedPeptideIds_AnyPsmHas_OpenModifications()` |
| `ReporterIonMasses_On_PSM_For_MainFilters` | per-PSM reporter-ion masses | `psb/psm-reporter-ion-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0002` | load-once | base `get_reportedPeptideIds_AnyPsmHas_ReporterIons()` |
| `ReporterIonMasses_Unique_In_All_OfSearch` | `Set<number>` of all reporter-ion masses in the search (filter-independent) | `psb/reporter-ion-masses-unique-search-level-single-project-search-id` | load-once; skips call if flag `anyPsmHas_ReporterIons` false | per-search flag |
| `Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters` | `Map<reportedPeptideId, Map<searchSubGroupId, numPsms>>` | `psb/psm-count-per-reported-peptide-id-sub-search-group-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0003` | load-once | base |
| `Variable_Dynamic_Modifications_On_PSM_For_MainFilters` | per-PSM variable-mod masses (+rounded, n/c-term) | `psb/psm-variable-dynamic-modification-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0002` | load-once | base `get_reportedPeptideIds_AnyPsmHas_Variable_Dynamic_Modifications()` |
| `Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters` | `Map<reportedPeptideId, mods[]>` | `psb/dynamic-modifications-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id` | load-once | base `get_reportedPeptideIds_HasDynamicModifications()` |
| `Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters` | mods projected to protein positions | **none — DERIVED** | lazy per psvId | ReportedPeptide-level mods + coverage |
| `ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters` | protein coverage per reportedPeptideId (+ derived psvId maps) | `psb/protein-coverage-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id-version-0004` | load-once | base |
| `ProteinInfo_For_MainFilters` | per-psvId `{proteinLength, annotations[]}` | `psb/protein-info-prot-seq-v-ids-list` | load-once | coverage loader (→ base) |
| `ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters` | computed coverage ranges per psvId | **none — DERIVED** (`Promise.all` of 3 deps) | load-once | base + coverage + ProteinInfo |
| `Protein_Filterable_AnnotationValues` | `Map<psvId, Map<annTypeId, {valueDouble,valueString}>>` | `psb/protein-filtrbl-ann-data-list-protein-seq-v-ids-ann-type-ids-single-project-search-id` | **2-dim incremental** | — (caller supplies ids) |
| `Protein_Descriptive_AnnotationValues` | `Map<psvId, Map<annTypeId, {valueString}>>` | `psb/protein-descriptive-ann-data-list-protein-seq-v-ids-ann-type-ids-single-project-search-id` | **2-dim incremental** | — |
| `ReportedPeptide_Filterable_AnnotationValues` | `Map<reportedPeptideId, Map<annTypeId, {valueDouble,valueString}>>` | `psb/reported-peptide-filtrbl-ann-data-list-rep-pept-ids-ann-type-ids-single-project-search-id` | **2-dim incremental** | — |
| `ReportedPeptide_Descriptive_AnnotationValues` | `Map<reportedPeptideId, Map<annTypeId, {valueString}>>` | `psb/reported-peptide-descriptive-ann-data-list-rep-pept-ids-ann-type-ids-single-project-search-id` | **2-dim incremental** | — |
| `StaticModifications` | search-level static mods `[{residue, mass}]` | `psb/static-mods-single-project-search-id` | load-once | — |
| `StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId` | static-mod residue/mass map per protein position | **none — DERIVED** | lazy per psvId | StaticModifications + protein sequence |
| `ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch` | all `(searchScanFileId, projectScanFileId)` pairs — **the scan-file mapping** | `scanfile-projectscanfileid-searchscanfileid-all-forsearch-for-projectsearchid` **(bare path, §6)** | load-once | — |
| `FeatureDetection_Root_Entries` | feature-detection root entries for the search | `for-page/scan-file-feature-detection-root-entries-single-project-search-id` | load-once | — |
| `GoldStandard_Root_Entries` | gold-standard root entries | `for-page/scan-file-gold-standard-root-entries-single-project-search-id` | load-once | — |
| `GoldStandard_Root_AnyEntriesExist` | boolean | `for-page/scan-file-gold-standard-root-any-entries-exist-single-project-search-id` | load-once | — |
| `GoldStandard_FileContents_Entries` | per-mapping gold-standard file contents | `for-page/scan-file-gold-standard-root-file-contents-for-id` | `Map` by mapping id | — |
| `From_ProjectSearchId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectSearchId` | access-controlled max scans-with-peaks count | `psb/scan-with-peaks-max-return-count-ac-project-search-id` | **module-level cache** (not the class pattern — exported fns) | — |
| `ScanData_WholeSearch_NO_Peaks_Data` | no-peaks scan data for **all** files in the search | **none — orchestrator** | load-once | mapping + per-file NO_Peaks (§5.5) |
| `ScanData_For_Single_SearchScanFileId_AndOtherParams_NO_Peaks_Data` | no-peaks scan data, one file | **none — delegates to Tree A** | downstream | mapping + Tree A |
| `ScanData_For_Single_SearchScanFileId_AndOtherParams_YES_Peaks_Data` | with-peaks scan data, one file (+ optional m/z ranges) | **none — delegates to Tree A** | downstream (`yes_CacheResults_InJS`) | mapping + Tree A |
| `ScanData__MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId` | binned MS1 intensity, one file | **none — delegates to Tree A** | downstream | mapping + Tree A |
| `ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange` | MS1 scan#s in RT range, one file | **none — delegates to Tree A** | downstream | mapping + Tree A |
| `ScanData_Summary_Data_For_Single_SearchScanFileId` | scan summary, one file | **none — delegates to Tree A** | `Map` by searchScanFileId | mapping + Tree A |

### 5.2 Single-search, UNfiltered — `common_data_loaded_from_server_single_search_NO_PSM_Peptide_Protein_Filtering__sub_parts__returned_objects/`

These do **not** use `searchDataLookupParams` (no main filters); keyed on `projectSearchId`. Each serves both an
Include-Decoy and an Exclude-Decoy holder; one Include response also populates the Exclude holder.

| Loader | Data | Endpoint | Notes |
|---|---|---|---|
| `NO_PSM_Peptide_Protein_Filtering__PSM_TblData` | per-PSM table rows, unfiltered | `psb/psm-table-data-unfiltered-for-single-project-search-id-version-0003` | Include/Exclude holders |
| `NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData` | PSM filterable annotation values, unfiltered (columnar) | `psb/psm-filterable-annotation-data--no-filtering--single-project-search-id-version-0004` | per-annotationTypeId incremental; Include/Exclude |
| `SearchSubGroupId_ForPSM_ID_NOT_Filtered` | `Map<psmId, searchSubGroupId>` | `psb/search-sub-search-group-id_psm-id__not-filtered_for-single-project-search-id-version-0004` | load-once (base-36 encoded response) |

### 5.3 Common across searches — `common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/`

Accumulate into one shared holder across calls; dedup missing/in-flight ids.

| Loader (`…CommonAcrossSearches__`) | Data | Endpoint | Depends on |
|---|---|---|---|
| `ReportedPeptideSequences` | reported-peptide display strings by reportedPeptideId | `psb/reported-peptide-strings-for-reported-peptide-ids` | — |
| `PeptideSequences_For_MainFilters` | peptide sequences (+ I→L variant) by peptideId | `psb/peptide-sequences-for-reported-peptide-ids-version-0001` (one call per projectSearchId) | per-search `PeptideIds_For_MainFilters` |
| `ProteinSequences` | protein sequences (+ I→L variant) by psvId | `psb/protein-sequences-for-prot-seq-ver-ids` | — |

### 5.4 Across all searches (multi) — `common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/`

| Loader (`…MultipleSearches__`) | Data | Endpoint | Keyed |
|---|---|---|---|
| `FastaFileStatistics` | per-search target/decoy counts + coverage flags | `psb/fasta-file-statistics-project-search-id-list` | load-once; maps by projectSearchId & searchId |
| `ScanFile_SearchScanFileId_ScanFilename_ScanFileId` | per-search scan-file records (searchScanFileId, filename, scanFileId?) | `psb/get-search-scan-file-data-for-project-search-id-list` | load-once; nested maps |

### 5.4b PSM-ID-filtered — `common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_Etc__sub_parts__returned_objects/`

| Loader | Data | Endpoint | Notes |
|---|---|---|---|
| `FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records` | PSM peptide-position annotation records for given psmIds/annTypeIds | `psm-peptide-position-annotations-for-psm-ids-annotation-type-id-single-project-search-id-rest-webservice-controller` **(bare path, §6)** | **standalone function, NO caching** — fetches fresh each call |

### 5.5 Tree A — scan data from projectScanFileId (`common_data_loaded_from_server__scan_data__from_project_scan_file_id/`)

ROOT `CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT` owns 8 loaders (each caches per `projectScanFileId`).
The single-search scan loaders in §5.1 delegate here.

| Loader (`…From_ProjectScanFileId…`) | Data | Endpoint |
|---|---|---|
| `__ScanData_NO_Peaks_Data` | per-scan data without peaks (columnar arrays) | `psfb/scan-data-no-peaks-and-optional-all-parents-for-scan-numbers--project-scan-file-id` |
| `_Optional_M_Z__ScanData_YES_Peaks_Data` | per-scan data with peaks, optional m/z ranges | `psfb/scan-data-with-peaks-for-scan-numbers-project-search-id-search-scan-file-id-optional-m-over-z-ranges` |
| `_RetentionTimeRange__MS_1_ScanNumbers` | MS1 scan#s in an RT range | `psfb/scan-numbers-for-ms-1-scans-project-scan-file-id-retention-time-range` |
| `_Scan_Summary_Data` | per-scan-level summary (count, TIC) | `psfb/scan-file-summary-data-from-spectral-storage-data--project-scan-file-id` |
| `__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ` | MS1 intensity binned on RT×m/z (+ summary) | `psb/scan-file-peak-intensity-binned-on-rt-mz-json-from-spectral-storage-data--search-scan-file-id-single-project-search-id` |
| `__ProjectScanFilenames` | scan filenames for the file | `for-page/project-scan-filenames-for-project-scan-file-id` |
| `__ProjectSearchIds` | projectSearchIds for the file | `for-page/project-search-ids-for-project-scan-file-id` |
| `__ScanFileCode_FirstSix` | first-six scan-file code | `for-page/project-scan-file-code-first-six-for-project-scan-file-id` |
| `__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectScanFileId` | access-controlled max count | `psb/scan-with-peaks-max-return-count-ac-project-scan-file-id` (standalone fn, **no cache**) |

### 5.6 Tree B — feature detection (`common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/`)

ROOT `CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT` owns 5
loaders, all keyed on `feature_detection_root__project_scnfl_mapping_tbl__id` ("MappingId").

| Loader | Data | Endpoint(s) |
|---|---|---|
| `PersistentFeature_Entries` | persistent-feature entries (charge, mass, RT range, abundance, MS2 scan#s) | `fdb/feature-detection-persistent-feature-entries-single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id-version-0002` |
| `SingularFeature_Entries` | singular-feature entries (MS1 scan#, mass, charge, intensity, window m/z, score) | data `fdb/feature-detection-singular-feature-entries-single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id-version-0004`; + helpers `fdb/feature-detection-singular-feature-entries-min-max-id--single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id-version-0002`, `fdb/feature-detection-singular-feature-entries-max-allowed-requested-singular-ids--single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id` (self-batched loading) |
| `MappingOf_PersistentToSingularFeature_Entries` | persistent↔singular link rows | count `fdb/feature-detection-map-persistent-to-singular-feature-entries-count--single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id-version-0002`; data `fdb/feature-detection-map-persistent-to-singular-feature-entries-single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id-version-0002` (count-then-batch) |
| `FeatureDetection_DisplayNameDescription_ProjectScanFileId` | display label, description, projectScanFileId | `fdb/feature-detection--name-from-feature-detection-root--project-scnfl-mapping-tbl--id` |
| `FeatureDetection_ProjectScanFileId_From_feature_detection` | projectScanFileId + first-six code | `fdb/feature-detection--project-scan-file-id-from-feature-detection-root--project-scnfl-mapping-tbl--id` |

Also referenced from §5.1's `FeatureDetection_Root_Entries` (which lists the mappings the Tree B loaders key on).

---

## 6. Gotchas & anomalies

- **Two endpoints omit the `d/rws/` prefix** the rest share, written verbatim in code as bare controller paths:
  - `scanfile-projectscanfileid-searchscanfileid-all-forsearch-for-projectsearchid`
    (`ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch`)
  - `psm-peptide-position-annotations-for-psm-ids-annotation-type-id-single-project-search-id-rest-webservice-controller`
    (`FilterOn_PSM_IDs_…PsmPeptidePositionAnnotation_Records`) — this one also passes **no** `dataRetrieval_CanRetry`.
  Preserve them as-is; don't "normalize" a prefix without checking the server route mapping.
- **Two files break the standard class pattern.** `…Get_MaxScanDataWithPeaksReturnCount…` (both the projectSearchId
  and projectScanFileId variants) are **exported functions with a module-level cache**, not `getNewInstance`
  classes. `FilterOn_PSM_IDs_…PsmPeptidePositionAnnotation_Records` is a standalone function with **no caching**.
- **Two `ZZ_UNUSED_Untested_…` files** in the single-search dir are **commented-out, unwired, and would not
  compile if enabled** (`…ProteinData_Including_ProteinSequenceVersionIds…`, `…PsmFilterableAnnotationData`). Do
  not treat their (commented) endpoints as live; don't revive without review.
- **Derived loaders make no webservice call** — `ProteinSequenceCoverageData`,
  `StaticModifications_OnProteinSequence…`, `Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level`.
  Changing "how X is loaded" for these means changing a **client-side computation**, not an endpoint.
- **Delegating scan loaders** (§5.5 note) hold no data of their own — the cache and AJAX live in the Tree A
  project-scan-file loaders they call. A caching bug in scan data is almost always in Tree A, not the single-search
  wrapper.
- **Compact wire encodings** are common and easy to misread: columnar/parallel arrays (annotation data, protein
  coverage, no-peaks scan data), **delta-encoded** PSM ids/reportedPeptideIds (`PSM_TblData_For_ReportedPeptideId`),
  and **base-36** sub-group ids (`SearchSubGroupId_ForPSM_ID_NOT_Filtered`). Decode via the file's own
  `_process_WebserviceResponse`, don't hand-parse.
- **Open-mod & variable-mod masses are rounded with `Math.round`** in these loaders (whole-number), matching the
  peptide-list display convention — see the front-end display-string notes.
- **Stale `console.log` version strings** appear in **multiple files** — the `console.log` in the `_load_..._Data()`
  method names an older endpoint version than the real `const url`. Verified cases: `SearchSubGroupId_ForPSM_ID_NOT_Filtered`
  logs `…-version-0003` but calls `…-version-0004`; `Variable_Dynamic_Modifications_On_PSM_For_MainFilters` logs
  `…-version-0001` but calls `…-version-0002`. Trust the `const url`, never the log string (and don't treat a logged
  version as the live endpoint when reconciling this doc).
- **Same-Set assertion**: several reportedPeptideId-driven loaders assert a second in-flight call uses the *same*
  `reportedPeptideIds` Set. This holds because the instance is rebuilt when filters change (§1) — a would-be
  second, different set means someone reused a stale instance.

---

## 7. Adding or changing a loader

1. Put the leaf in the directory for its **level** (filtered single-search / unfiltered single-search / common /
   multi / Tree A / Tree B), following the `_Holder` + `getNewInstance()` + `get_<X>_ReturnPromise()` +
   `_load_<X>_Data()` + `_process_WebserviceResponse()` shape.
2. Expose it from the owning **level-holder** with a `get_<leafClassName>()` getter, and (if reportedPeptideId- or
   psvId-driven) load the base/coverage loader **first**, then call your endpoint only for the resulting subset —
   skipping the call when the subset is empty.
3. Cache on an instance field (or keyed `Map`) and dedup with an in-flight promise; do **not** memoize. The instance
   is discarded and rebuilt when its constructor inputs change — never mutate inputs in place.
4. Use `webserviceCallStandardPost({ dataToSend, url, dataRetrieval_CanRetry: true })` and the standard error
   funnel. Prefer the `d/rws/for-page/{psb|psfb|fdb}/…` prefix for a new route.
