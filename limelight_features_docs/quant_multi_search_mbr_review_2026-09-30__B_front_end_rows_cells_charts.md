# Quant multi-search JOINT + MBR review (2026-09-30), part B: front end rows, cells and charts

Scope: how the **quant common peptide page** and **quant common protein page** (the merged Quant Common SPA; not
the legacy/existing peptide or protein pages, and not the standalone quant pages that are being retired) turn the
FlashLFQ result webservices into table ROWS, CELLS and CHARTS when ONE JOINT (MBR-on) FlashLFQ run spans several
Limelight searches (projectSearchIds).

Method: read-only reading of the working tree (much of it is uncommitted). Every structural claim is tagged
`verified: <repo-relative path>:<line>` or `assumption -- unverified`. Nothing here was observed in a running UI.
Anything described as what the page "shows" is **inferred from code**, not seen in a browser or a download.

## Path shorthand used below

| Tag | Repo-relative path |
|---|---|
| `QPD` | `limelight_webapp/front_end/src/js/page_js/data_pages/quant/quant_PrototypeData.ts` |
| `PPD` | `.../data_pages/quant/flashlfq_proteinQuant_PrototypeData.ts` |
| `GRP` | `.../data_pages/project_search_ids_driven_pages/quant_pages/quant_peptide_and_single_protein_shared/js/quantSharedPeptideProtein_Create_GeneratedReportedPeptideListData.ts` |
| `CTD` | `.../quant_peptide_and_single_protein_shared/jsx/quantSharedPeptideProtein_GeneratedReportedPeptideListSection_Create_TableData.tsx` |
| `SEC` | `.../quant_peptide_and_single_protein_shared/jsx/quantSharedPeptideProtein_GeneratedReportedPeptideListSection_Component.tsx` |
| `PV` | `.../quant_pages/quant_common_spa_view_page/quantCommonSPAView_PeptideView_Component.tsx` |
| `PRV` | `.../quant_common_spa_view_page/quantCommonSPAView_ProteinView_Component.tsx` |
| `PRT` | `.../quant_common_spa_view_page/quantCommonSPAView_ProteinView__Create_ProteinList_DataTable_RootTableDataObject.tsx` |
| `MC` | `.../quant_common_spa_view_page/quantCommonSPAView_MainContent_Component.tsx` |
| `PLB` | `.../project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped.ts` |
| `AM` | `.../data_pages/quant/quantCharts/quantCharts_AbundanceMatrix.ts` |
| `PS` | `.../data_pages/quant/quantCharts/quantCharts_ProcessingStates.ts` |
| `GC` | `.../data_pages/quant/quantCharts/quantCharts_GatedContent_Component.tsx` |
| `ROL` | `.../data_pages/quant/quantCharts/quantCharts_RunOutputs_Load.ts` |
| `SUB` | `.../data_pages/other_data_pages/project_page/project_page_quant_section/projPg_Quant_SubmitRun_Component.tsx` |
| `JJ` | `limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp/spring_mvc_parts/data_pages/rest_controllers/single_project_search_id/FlashLFQ_Run__Result_Retrieval_Joined_RestWebserviceController.java` |
| `JP` | `.../rest_controllers/single_project_search_id/FlashLFQ_Run__Result_Retrieval_Proteins_RestWebserviceController.java` |
| `GS` | `limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp/services/FlashLFQ_Run_GatherPsms_And_SendRequest_Service.java` |
| `DDL` | `database_scripts/install/001_create_empty_database.sql` |
| `IMP` | `limelight_importer/src/main/java/org/yeastrc/limelight/limelight_importer/dao/ReportedPeptideDAO_Importer.java` |

---

## Summary: every drop, blank and merge point

**Peptide side** (quant common peptide page; also the "Quant (Limelight)" protein rollup, which reads the same data):

1. **Server drop (JOINED join).** Each sample's column is joined through *that sample's own search's* identity to
   reportedPeptideId map. A FlashLFQ row whose identity the sample's search did not report is skipped for that
   sample (`continue`). verified: `JJ:407-415`. So an MBR value in search B's file for a peptide only search A
   reported never leaves the server. The normalized-linear and batch-corrected-log2 peptide endpoints use the same
   per-search join. verified: the comments at `FlashLFQ_Run__Result_Retrieval_Peptides_Normalized_Linear_RestWebserviceController.java:228-230`
   and `..._Peptides_BatchCorrected_Log2_RestWebserviceController.java:233-236` (the loop body itself was not re-read, so the "identical join" is from those comments).
2. **FE store is keyed by (searchScanFileId, reportedPeptideId).** verified: `QPD:175`, `QPD:599-642`.
3. **Row = one cross-search display string.** A peptide-table row is one `peptideSequenceDisplay`, merged across
   all searches. Inside it, reportedPeptideIds are kept *per projectSearchId*. verified: `GRP:2104-2128`
   (display-string key), `GRP:2201-2205` (per-search rpid map). So a row exists if ANY search reported the peptide.
4. **FE drop (cell uses only that search's rpids).** The per-search Quant cell passes ONLY the row's reportedPeptideIds
   for that search. verified: `CTD:1902-1911`. If that set is empty, `get_SummedQuantForDisplayForm` returns
   `undefined` and the cell is blank. verified: `QPD:271-277`. So even if the server DID send a record for B's file,
   the FE B cell would not look it up unless B's own rpid list for the row contained a matching id.
5. **Blank when the search's scan file cannot be resolved.** A per-search cell resolves the search's *single* scan
   file and is blank if the search has 0 or more than 1 loaded scan file. verified: `QPD:399-410`. For multi-search
   runs this matches Route B, which only takes single-scan-file searches. verified: `SUB:9-11`.
6. **Blank for a no-PSMs sample.** A `_noPsms` sentinel pair is dropped before loading, and its cells are blank.
   verified: `QPD:513-519`.
7. **Blank when summed intensity is 0 and the value is not ambiguous.** verified: `CTD:655` (only `> 0` renders), `CTD:696` comment.
8. **Ambiguous = "overlapping signal", not a number.** verified: `CTD:636-653`, `QPD:286-290`.
9. **(MBR) marker and any/all radio.** These are computed only over records that survived drops 1 and 4. verified:
   `QPD:295-302`, `CTD:668`. The radio shows only if ANY loaded record is MBR. verified: `QPD:205-212`, `SEC:696`.
   For a Route B run, the cross-search MBR values are exactly the ones drop 1 removes, so the radio may be hidden
   even though FlashLFQ produced MBR values (inferred from code).
10. **Positional-isomer dedupe by groupId** happens within one scan file, over the row's rpids for that search.
    verified: `QPD:270-275`. The shared glyph (⚭) pre-pass runs per projectSearchId. verified: `CTD:812-866`.
11. **Charts (peptide) inherit drops 1 and 6.** They also drop ambiguous and non-positive values within each scan
    file, deduped by groupId. verified: `QPD:351-374`. A feature is "complete" only if it is non-null in every
    sample. verified: `PS:115-131`. For a multi-search run, a peptide is therefore complete only if EVERY search
    reported it under the page cutoffs (and FlashLFQ had a clean positive value in every file). MBR-filled cross-search
    values cannot rescue it.
12. **Charts ignore the table's non-cutoff filters.** The feed is the whole joined store, not the displayed rows.
    verified: `QPD:353` (iterates the whole store); `PV:3312-3314`.

**Protein side** (quant common protein page):

13. **Protein row = the proteinSequenceVersionId union across searches**, with a per-search sub-item only where that
    search reported a peptide mapping to the protein. verified: `PLB:163`, `PLB:176-181`, `PLB:227-254`. Called from `PRV:2071`.
14. **"Quant (FlashLFQ)" (Option A) has no per-search join.** For every protein row in CombinedProteins.tsv, the
    controller emits a record for EVERY requested scan file. verified: `JP:381-387`. An empty intensity string is
    stored as 0. verified: `JP:403` (`intensityString.isEmpty() ? 0.0`). So for a protein that only A reported, B's
    Option A cell shows B's FlashLFQ protein value, or "0.00e+0" with a tooltip saying FlashLFQ measured no signal
    "in this run". verified: `PRT:86-127`, `PRT:2937-2943`. (Inferred from code; not observed.)
15. **"Quant (Limelight)" (Option B) is blank for B** when B did not report the protein: there is no B sub-item, so
    `summed` stays undefined. verified: `PRT:2971-2976`. Even with a sub-item, it inherits drops 1 and 4.
16. **So the two protein columns disagree on cross-search MBR.** Option A can include MBR-derived signal in B's file.
    Option B cannot. (inferred)
17. **Protein intensities are not re-derived from the page cutoffs.** They reflect the proteins/PSMs sent at submit
    time. verified: `PPD:210-213` (comment); `JP:79-80` (controller doc: "NO DB re-derivation").
18. **Multi-member FlashLFQ protein groups** (a `;` in "Protein Groups") are skipped. verified: `JP:357-360`.
    FlashLFQ by default leaves shared peptides out of protein quant, so shared-only proteins are absent (blank).
    verified: mzLib `FlashLFQ/FlashLfqParameters.cs:20` (`UseSharedPeptidesForProteinQuant = false`) and
    `FlashLFQ/FlashLFQResults.cs:388`. Whether the flashlfq-service overrides that default: assumption -- unverified.
19. **Charts (protein)** use the Option A feed only. verified: `PRV:3371-3373`, `PRV:3404`. So protein-chart
    completeness is NOT subject to the per-search join (13-14), unlike the peptide chart (11).

**Cross-cutting:**

20. **reportedPeptideId is global, not per search.** `reported_peptide_tbl` has only `id, sequence`. verified: `DDL:103-108`.
    `search_reported_peptide_tbl` has PK `(search_id, reported_peptide_id)`. verified: `DDL:262-268`. The importer
    looks an id up by sequence before inserting. verified: `IMP:181-230`. So the same reportedPeptideId can belong to
    several searches. The FE comment claiming "a reportedPeptideId belongs to exactly one search" is **false**.
    see: `QPD:585-587`. The per-scan-file store is still correct, because it is keyed by scan file first. But the
    global maps `_groupId_ByReportedPeptideId` (`QPD:181`, `QPD:642`) and `_ambiguousZeroed_ReportedPeptideIds`
    (`QPD:184`, `QPD:203-207`) are keyed by rpid across all searches and files. See the detail below.

---

## 1. Loading

### 1a. Webservices and loaders

| Feed | FE loader (module singleton) | URL constant | Keyed by |
|---|---|---|---|
| Raw peptides (JOINED) | `quant_PrototypeData_Load` `QPD:704-736` | `QPD:59` | ssfid → rpid → record |
| Normalized-linear peptides | `quant_PrototypeData_Load_NormalizedLinear` `QPD:762-784` | `QPD:64` | same |
| Batch-corrected log2 peptides | `quant_PrototypeData_Load_BatchCorrectedLog2` `QPD:812-834` | `QPD:70` | same |
| Batch-corrected delog2 peptides | `quant_PrototypeData_Load_BatchCorrectedDelog2` `QPD:860-882` | `QPD:77` | same |
| Raw proteins | `flashlfq_proteinQuant_Load` `PPD:555` | `PPD:54` | ssfid → psvid → intensity (plus a parallel non-finite token map) |
| Protein normalized / batch log2 / delog2 | `PPD:613`, `PPD:664`, `PPD:714` | `PPD:61-71` | same |

All of them verified at the cited lines. Each loader follows the same pattern: one status call for the single
requestId, then (if READY) ONE all-samples result call with `pairs: [{projectSearchId, searchScanFileId}]`.
verified: `QPD:511-583`, `QPD:471-506`. The peptide requests also send `searchDataLookupParamsRoot`. verified:
`QPD:472`. The protein requests deliberately do not. verified: `PPD:328` comment and `dataToSend`.

**Call sites:**
- Quant common peptide page: raw peptide feed only. verified: `PV:579-581`.
- Quant common protein page: raw peptides (for Option B) and raw proteins (for Option A). verified: `PRV:815-816`.
- The normalized and batch-corrected feeds load lazily, stage 2, when the charts panel is expanded. verified: `ROL:1-22`, `ROL:167-174`.

**Module caches:**
- Each feed is a module-level singleton (`_instance` / `_loadPromise`). verified: `QPD:652-653`, `QPD:745-746`, `QPD:795-796`, `QPD:844-845`.
- The FIRST caller's `searchDataLookupParamsRoot` is used for the life of the module. verified: `QPD:701-705` (returns the cached `_loadPromise` without looking at the argument).
- Whether a cutoff change on the page forces a full reload (resetting the singletons): assumption -- unverified. See the open questions.

**Single-run invariants:**
- `MC` fails loud if the hash resolves to more than one distinct requestId. verified: `MC:221-232`.
- The loaders use `runnablePairs[0].requestId` for everything. verified: `QPD:534-537`.
- Run-status banners are attributed to the FIRST pair's projectSearchId only. verified: `QPD:537`, `QPD:566`, `QPD:581`.

### 1b. Store shape (peptides)

- `_record_ByReportedPeptideId_ByScanFileId: Map<ssfid, Map<rpid, {intensity, groupId, ambiguousZeroed, detectionType}>>`. verified: `QPD:175`.
- An entry is created for every returned scan file, even one with zero records, so every sample stays a chart column. verified: `QPD:599-600`, `QPD:381-383`.
- `_scanFileIds_ByProjectSearchId` is built from the hash pairs (the response carries only ssfid). verified: `QPD:575-597`.
- `_groupId_ByReportedPeptideId: Map<rpid, groupId>` is one global map; the last write wins. verified: `QPD:642`.
- A record missing its groupId is a hard error. verified: `QPD:611-615`. A non-finite intensity is skipped and reported. verified: `QPD:626-634`.

### 1c. Store shape (proteins)

- `_intensity_ByProteinSequenceVersionId_ByScanFileId`, plus a non-finite token map. verified: `PPD:130-140`, `PPD:459`.
- proteinSequenceVersionId is parsed from "Protein Groups" = `psvid_<id>[_name]`. verified: `JP:362-378`. That value is built at submit time from each reported peptide's proteins. verified: `GS:339-358`.

---

## 2. Row construction and cells on the quant common peptide page

### 2a. What a row is

- The quant common peptide page uses the shared generated-reported-peptide pipeline: `quantSharedPeptideProtein_*`,
  imported in `PV:103-106`, rendered at `PV:3220`.
- For each projectSearchId, each of its (filtered) reported peptides produces a display string
  (`reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches`, `GRP:2104-2111`). That string is the row key:
  `peptideItems_Map_Key_peptideSequenceDisplayString.get/set` (`GRP:2119-2128`).
- A row therefore **merges the same display form across searches**. The row holds
  `dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId` (`GRP:108`, `GRP:2201-2205`), which is
  *per search*.
- **Collate.** With "Collate: Variable Modifications" unchecked, the display string omits the variable mods, so one row
  collapses several mod forms, and the Quant cell SUMS their distinct groupIds. verified: `QPD:237-251` (doc),
  `CTD:604-616`. With it checked, one row should equal one groupId; if not, the D4 tripwire shows "quant error".
  verified: `CTD:606-633`.

### 2b. Columns ↔ samples

- **Multi-search (modes 1 and 2).** For each projectSearchId there is a "PSM Count (X)" column and right after it a
  "Quant (X)" column. verified: `CTD:1096-1172`. There is **one Quant column per search, not per scan file**.
  Route B guarantees one scan file per search (`SUB:9-11`), so in practice column = sample. The code only enforces this
  as "blank if not exactly one" (`QPD:404-408`).
- **Single search with sub-groups (mode 3).** One Quant column per selected sub-group, scoped to that sub-group's
  single scan file. verified: `CTD:1071-1090`, `CTD:1751-1790`, `CTD:1373-1380`. This mode only exists when
  `projectSearchIds.length === 1`. verified: `CTD:331`, `CTD:1374`. It does not apply to a multi-search JOINT run.
- The download-only paired "MBR" and "Shared group" columns follow every Quant column. verified: `CTD:1163-1170`.

### 2c. How a cell is resolved (multi-search)

`CTD:1902-1920` → `_build_Quant_DataRow_ColumnEntry` → `_compute_Quant_Cell_Core` (`CTD:572-699`) →
`Quant_PrototypeData.get_SummedQuantForDisplayForm(rpidsForThisSearch, projectSearchId, undefined)` (`QPD:258-314`):

1. `reportedPeptideIds_ForQuant` = the keys of the row's map for THIS projectSearchId only (`CTD:1903-1908`).
2. The scan file = the search's single loaded ssfid (`QPD:260`, `QPD:399-410`).
3. Look up each rpid in that ssfid's map, dedupe by groupId (first record per groupId wins), then sum the
   non-ambiguous intensities. `anyAmbiguous` forces the "overlapping signal" marker. verified: `QPD:270-291`.
4. No record → `undefined` → blank cell, `valueSort -1`. verified: `QPD:277`, `CTD:590-602`.
5. `summedIntensity > 0` → `toExponential(2)`. The ⚭ prefix appears if the single groupId spans more than one display
   row *within this search* (`CTD:655-665`, pre-pass `CTD:812-866`). "(MBR)" is appended per the any/all radio:
   `anyMbr`/`allMbr` over the distinct contributing groups. verified: `CTD:668`, `QPD:298-302`.
6. `summedIntensity === 0` and not ambiguous → blank. verified: `CTD:696`.

### 2d. MBR any/all radio

- The mode is an instance field in the section component (`SEC:147`). It is passed to table creation (`SEC:287`).
- The radio renders only when `quantData.hasAnyMbrData()` (`SEC:696`), which is a whole-store flag (`QPD:205-212`).

---

## 3. Worked example: peptide EEEE reported only by search A (run spans A and B, JOINT, MBR on)

Setup: FlashLFQ receives PSMs for EEEE only from A's scan file. With MBR, it may quantify EEEE in B's file too
(DetectionType "MBR"). This is FlashLFQ behavior and is not re-verified here; see the part-A/service notes.

1. **Server.** The combined peptide file has one EEEE row with values in both A's and B's intensity columns. For
   sample B, `identityMap(B).get("EEEE…")` is null, so the controller hits `continue` and no B record is emitted.
   verified: `JJ:407-415`. For sample A, one record per A rpid mapped to that identity. verified: `JJ:428-436`.
2. **FE store.** `record_ByReportedPeptideId_ByScanFileId.get(ssfid_A)` has EEEE's rpid(s).
   `...get(ssfid_B)` exists but has no EEEE entry. verified: `QPD:599-642`.
3. **Row.** A reported EEEE, so the display-string row exists. Its per-search map has an entry for A only, with no
   entry for B (`GRP:2201-2205` runs only while iterating A's reported peptides, `GRP:1040-1096`).
4. **"PSM Count (B)" cell:** 0. The fallback sums over an absent map, giving `psmCount = 0`. verified: `CTD:1812-1840`.
5. **"Quant (B)" cell:** `reportedPeptideIds_ForQuant = []` (`CTD:1903-1908`), so
   `get_SummedQuantForDisplayForm([], B, undefined)` gets `distinctGroup_ByGroupId.size === 0` and returns `undefined`
   (`QPD:277`). The cell is **blank**, `valueSort -1`, and has no (MBR) marker.
6. **Does the row have a place for B's value?** It has a *column slot* ("Quant (B)" exists on every row). It has no
   *data key* for B: B's rpid list for the row is empty, and the store has no B record. So the FE drops the value
   **twice**: first on the server (step 1), then in the FE cell (step 5). A server-only fix that emits B-file records
   keyed by A's rpids would STILL render blank, because the B cell only looks up B's rpids.
   - Nuance: rpids are global (`DDL:103-108`, `IMP:181-230`). So if B *also* reported an EEEE reported peptide with
     the same sequence string, both searches share the rpid. B's own map would then contain it and B's own join would
     match, and the value would already show. The drop only affects peptides B did not report under the page cutoffs.
   - Nuance: the join uses the **page** cutoffs; FlashLFQ saw the **submit-time** cutoffs. If the page cutoffs for B
     are looser than at submit, B's page map can include EEEE while FlashLFQ had no B PSM. Then the B cell would show
     the MBR value marked "(MBR)". This is inferred from `QPD:699-703` and `JJ:241-247`; not exercised.
7. **Charts.** Feature `groupId(EEEE)` has a value for sample A and `null` for sample B, so it is NOT complete and is
   excluded from the boxplot and CV (`PS:115-131`). It appears as "missing" in completeness/MNAR-type panels
   (assumption -- those panels' exact inputs were not re-read).
8. **Download ("Download peptides" on the quant common peptide page).** The view serializes each cell's `valueSort`
   when present (`PV:1476-1479`). So the blank B cell is written as **"-1"**, and an "overlapping signal" cell as
   **"0"** (`CTD:596`, `CTD:641`). This is inferred from code and not checked against a real download. The comment at
   `PV:1436-1438` describes numeric cells only. Whether the DataTable's own download link, which uses
   `dataColumns_tableDownload`, writes "" instead: assumption -- unverified which path the UI button uses beyond `PV:1395-1500`.

---

## 4. Quant common protein page

- **Rows.** One row per proteinSequenceVersionId, the union over searches. `protein_SubItem_Records_Map_Key_projectSearchId`
  is set only for searches whose filtered reported peptides map to the protein. verified: `PLB:176-254`.
- **Columns (multi-search).** Per search there is "Quant (FlashLFQ) (X)" and then "Quant (Limelight) (X)".
  verified: `PRT:1104-1111`, `PRT:1158-1165`. Mode-3 sub-group columns exist for single search only (`PRT:890-950`).
- **Option A cell** = `flashlfq_proteinQuant.get_ProteinIntensity(psvid, projectSearchId, undefined)` (`PRT:2939-2940`).
  It resolves the search's single ssfid (`PPD:170-181`, `PPD:257-268`). The server emits a record for every requested
  ssfid on every protein row (`JP:381-387`), so **B's cell is populated for a protein only A reported**, as long as
  FlashLFQ output a row for it. The possible displays are a value, "0.00e+0" (empty → 0, `JP:403`, `PRT:117-127`), or
  "FlashLFQ: NaN — not quantifiable across runs" (`PRT:96-115`). Blank appears only when FlashLFQ output no row for
  that psvid (shared-only proteins, or `;` groups skipped at `JP:357-360`).
  - The 0 tooltip says the protein "has unique peptides, but FlashLFQ measured no MS1 signal for them in this run"
    (`PRT:122`). For search B, which never identified the protein, that wording is misleading. (inferred)
  - Protein cells never carry an MBR marker (there is no "MBR" string in `PRT`), and the controller does not read the
    per-sample protein Detection Type column (`JP:96`).
- **Option B cell** = `get_SummedQuantForProtein(unionRpidsOfThisSearchSubItem, projectSearchId, undefined)`
  (`PRT:2969-2976`), a thin wrapper over the peptide sum (`QPD:327-329`). No sub-item for B means blank. With a
  sub-item, it inherits the peptide drops 1 and 4.
- **Multi-member protein groups (Limelight "Group proteins").** The Quant columns are per protein, not per group:
  `onlyShow_ValueDisplay_FirstRowOfGroup: false` (`PRT:563`, `PRT:584`, and the header tooltip text at `PRT:561`/`PRT:582`).
  Group rows render member rows through the same per-protein builder (`PRT:1600-1620`).
- **Multi-member FlashLFQ protein groups.** FlashLFQ makes one ProteinGroup per accession. A PSM with several
  accessions is a shared peptide, excluded from protein quant by default (mzLib `FlashLFQResults.cs:388`,
  `FlashLfqParameters.cs:20`). Limelight skips any `;`-joined group row defensively (`JP:357-360`); the comment there
  says such rows "should not occur".

---

## 5. Charts feed

- **Raw peptide matrix.** Built on the quant common peptide page from `getPerFeature_PerSample_Intensities_ForCharts({valuesAreAlreadyLog2:false})`
  plus `getAllChartSampleIds()` (`PV:3312-3320`). The matrix is rebuilt only when the quant-data or scan-file-holder
  reference changes (instance fields, `PV:368-372`, `PV:3305-3306`).
- **Feed.** For each ssfid, for each rpid record: skip ambiguous, skip if the groupId was already seen in this ssfid,
  skip non-finite, skip `<= 0` (unless already log2), then set `feature[groupId][ssfid]` (`QPD:351-374`). The feature
  id is the groupId string, so the SAME feature id spans searches. There is no per-search split in the charts.
- **Dense matrix.** Samples are sorted by ssfid ascending and labeled `sf1..`. Values are placed; a missing value is
  `null` (`AM:100-141`).
- **Normalized / batch-corrected.** Built the same way from the side feeds (`GC:156-176`). Batch log2 keeps
  negatives (`AM:131-132`, `QPD:364`).
- **Completeness and cross-state alignment.** `quantCharts_ProcessingStates__AlignComplete` keeps only features that
  are non-null in every sample, then **throws** if any present state's complete set differs from raw's (`PS:98-160`,
  throw at `PS:148-150`). Every peptide feed goes through the same per-search Java join (see Summary item 1), so the
  EEEE-type drop hits raw, normalized and batch-corrected alike. The sets are therefore expected to agree. This is
  inferred; it assumes the service's complete-case normalized file matches the FE's "> 0 and not ambiguous" rule.
- **Confirmed: the peptide complete-feature count depends on the per-search join.** A feature is complete only if
  every sample's search reported its identity under the page cutoffs (drop 1) and the FlashLFQ value was positive and
  not ambiguous. With N searches this is roughly the intersection of the per-search identifications. MBR's
  cross-search gap-filling cannot raise it.
- **Protein charts** (`PRV:3371-3373`) use Option A. Every protein row has a record for every sample (`JP:381-387`),
  so the protein complete-feature count is NOT reduced by the per-search join. That makes peptide-level and
  protein-level completeness non-comparable for multi-search runs. (inferred)
- **Claim vs code.** `QPD:344-345` says the chart feed "matches what the peptide table shows". That holds for cutoffs
  only. The feed is the whole joined store (`QPD:353`), not the rows left after the page's peptide/mod/protein-position
  filters.

---

## 6. Other single-search / per-search assumptions relevant to multi-search JOINT runs

| # | Where | What | Status |
|---|---|---|---|
| a | `QPD:585-587` | Comment says a reportedPeptideId belongs to exactly one search. False per `DDL:103-108` and `IMP:181-230`. | verified (comment false) |
| b | `QPD:181`, `QPD:642`, `QPD:390-392` | `_groupId_ByReportedPeptideId` is global, last-write-wins across searches and files. It is used by the ⚭ pre-pass (`CTD:835`). It only matters if the same rpid gets a different identity in two searches (for example, per-search mods differing for the same reported-peptide string). | verified structure; impact = assumption, likely rare |
| c | `QPD:184`, `QPD:203-207`, `QPD:223-225` | `isAmbiguousZeroed_ForReportedPeptideId` is true if ambiguous in ANY file of ANY search. Used for the above-table note. | verified |
| d | `QPD:205-212`, `SEC:696` | The MBR radio's visibility is a whole-dataset flag, which misses MBR values the join dropped. | verified; effect inferred |
| e | `QPD:399-410`, `PPD:257-268` | A per-search cell needs exactly one scan file per search, otherwise it is blank. It relies on Route B's single-file restriction (`SUB:9-11`). | verified |
| f | `CTD:331`, `CTD:1374`, `PRT:890` | Sub-group (per-file) columns exist for single search only. | verified |
| g | `QPD:537`, `QPD:566`, `QPD:581` | Status banners name only the first pair's projectSearchId. | verified |
| h | `QPD:701-705` | The first caller's cutoffs are frozen into the singleton. | verified; reload behavior = assumption |
| i | `QPD:472` vs `PPD:328` | Peptide quant follows the page cutoffs, but protein quant uses submit-time data. On the protein page, the Option A and Option B columns can reflect different PSM sets. | verified |
| j | `CTD:812-866` | The ⚭ pre-pass is per projectSearchId. A groupId shared by different rows in different searches is not flagged. That is consistent with per-search columns. | verified |
| k | `PV:1476-1479` | The peptide download writes `valueSort`, so blank quant becomes -1 and overlapping becomes 0. This matters more for multi-search, because every A-only peptide has a blank B cell. | verified code; output not observed |
| l | `CTD:343-350` | The mode-3 psmId→ssfid lookup uses the FILTERED main-filters PSM-table loader (not the unfiltered one). The psmId→subGroupId holder is the NOT-filtered one (`CTD:366-380`), used only as a lookup superset. | verified |

---

## Open questions

1. Does a cutoff change on the Quant Common SPA trigger a full page reload? If it does not, all quant singletons keep
   the first cutoffs (`QPD:704-705`).
2. Which button/path does a user actually use to download the quant common peptide table: the view's valueSort
   serializer (`PV:1395-1500`), or the DataTable's built-in download, which uses `dataColumns_tableDownload` and the
   paired MBR/Shared columns? This decides whether blank really becomes "-1" in practice.
3. Do the per-search identity maps (Java re-derive) ever give the same rpid different identities in two searches?
   This decides item 6b.
4. For protein Option A, does FlashLFQ's per-file protein intensity in B's file include MBR-transferred peptide
   intensities? (FlashLFQ internals, not re-verified here; likely yes.) If it does, Option A already shows cross-search
   MBR for proteins, with no marker.
5. Does the flashlfq-service set `UseSharedPeptidesForProteinQuant`? The mzLib default is false.
6. Do the normalized and batch-corrected complete-case rules in the service exactly match the FE raw rule (`> 0`,
   ambiguous excluded)? A mismatch would trip the fatal alignment check at `PS:148-150`.

---

## Implications for a fix (options, not decisions)

Any fix that surfaces cross-search MBR on the quant common peptide page must change **both** the server join (drop 1)
and the FE cell lookup (drop 4). Options:

- **A. Key cells by groupId per sample instead of rpid per search.** The server returns, per ssfid, records keyed by
  groupId (with no per-search identity filter). The FE row derives its groupId set from the union of its rpids across
  ALL searches, then looks up each column's ssfid by groupId. This fits FlashLFQ's identity model and the chart feed
  (already keyed by groupId). Cost: the row→groupId mapping must be well defined when collate is off (multiple groupIds
  per row, already summed today) and for the ⚭ pre-pass.
- **B. Keep rpid keys, but join each sample through the UNION of all run searches' identity maps.** Then B's file gets
  records under A's rpids. The FE B cell must then look up the row's rpids from all searches (not just B's). This is a
  smaller change on the server side, but reportedPeptideIds from other searches now appear under B's scan file, and
  the store comment/assumption at `QPD:585-587` must be corrected.
- **C. Separate "sample" columns from "search" columns for JOINT runs.** Render one Quant column per ssfid in the run
  (like mode 3, but across searches), with rows keyed by display string or groupId. This removes the reliance on
  "one scan file per search" (`QPD:404-408`) and matches how FlashLFQ sees the data.
- **D. Keep today's behavior but label it.** State on the page that a search's column shows quant only for peptides
  that search identified, and that cross-search MBR is not shown. Make the peptide/protein and Option A/B completeness
  differences explicit.

Any option should be checked against:
- the charts' alignment check (`PS:148-150`), since all peptide feeds must change together;
- the MBR radio visibility flag (`QPD:205-212`);
- the download serializer (`PV:1476-1479`);
- the protein Option A vs Option B consistency (Summary items 14-16).
