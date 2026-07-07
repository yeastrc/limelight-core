# Limelight search sub-groups: top-to-bottom deep dive

**Status:** reference / code map. Written 2026-07-07 from a full-stack read of `limelight-core`.
**Scope:** what a *search sub-group* is, and every layer where it lives — DB schema → Java DTO/DAO →
import path → webapp searchers → REST endpoints → front-end UI. Companions:
`flashlfq_quant_subgroup_scanfile_eligibility.md` (why sub-groups collide with MS1 quant) and
`flashlfq_quant_data_model_and_display_grains.md` (the display grains that consume sub-groups).

**Terminology guard:** "sub-group" (a.k.a. **Sub Search** in the UI) is NOT a *search tag*. Search tags
are user-assigned labels for filtering searches on the project page. The precise ids used throughout are
**`searchSubGroupId`** (`search_sub_group_id`), **`searchId`**, **`projectSearchId`**, **`scanFileId`**
(`search_scan_file_id`), **`reportedPeptideId`**. Path citations are repo-root-relative; `<web>` =
`limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp`, `<shared>` =
`limelight_shared_code/src/main/java/org/yeastrc/limelight/limelight_shared`, `<imp>` =
`limelight_importer/src/main/java/org/yeastrc/limelight/limelight_importer`, `<fe>` =
`limelight_webapp/front_end/src/js/page_js/data_pages`.

---

## 0. What a sub-group is (the concept)

A **sub-group** ("Sub Search" in the UI) is a **per-PSM logical label** that partitions the PSMs of a
**single search** into named groups — e.g. conditions or replicates the submitter wants to compare within
one uploaded search. It is:

- **A per-PSM attribute.** Each PSM carries at most one sub-group label; the set of a search's sub-groups
  is the distinct set of those labels.
- **Independent of the scan file.** A sub-group is a *logical* label; the scan file (`search_scan_file_id`)
  is a *physical* fact (which raw file the spectrum came from). Nothing in the data model constrains them to
  align — one sub-group can span many scan files, and one scan file can hold PSMs from many sub-groups. This
  independence is the single most important fact about sub-groups; it is what makes per-sub-group MS1 quant
  conditional (see §8) and is documented in code at
  `<shared>/search_sub_group_scan_file/searchers/Search_AnyScanFile_HasPsms_In_MultipleSubGroups_ForSearchId_Searcher.java:28-49`.
- **Scoped to one search.** `searchSubGroupId` is a small per-search sequential integer (1, 2, 3…),
  **unique only within its `searchId`** — not globally. Multi-search pages therefore cannot show
  sub-groups (there is no cross-search sub-group identity); they collapse to per-search columns (§7).
- **Optional and "2-or-more".** A search has sub-groups only when its PSMs carry **≥2 distinct** labels.
  Zero or exactly one distinct label ⇒ treated as *no sub-groups* (§4).

---

## 1. Database schema layer

All sub-group tables are defined in the base install
`database_scripts/install/001_create_empty_database.sql`. No later upgrade *creates* a sub-group table;
version 3 only restructures one and drops a historical one (bottom of this section).

### The flag on the search
`search_tbl.has_search_sub_groups` TINYINT UNSIGNED NOT NULL DEFAULT 0 — `install/001…:153` (table at
`:144`). The authoritative "does this search have sub-groups at all" bit.

### `search_sub_group_tbl` — the sub-group definitions (`install/001…:2392`)
The catalog of a search's sub-groups.

| Column | Type | Notes |
|---|---|---|
| `search_id` | MEDIUMINT UNSIGNED | FK → `search_tbl(id)` ON DELETE CASCADE |
| `search_sub_group_id` | SMALLINT UNSIGNED | per-search sequential id |
| `display_order` | SMALLINT UNSIGNED NULL | |
| `subgroup_name_from_import_file` | VARCHAR(500) NOT NULL | the label as it arrived in XML |
| `subgroup_name_display` | VARCHAR(75) NULL | user-entered override, or null |

PK `(search_id, search_sub_group_id)`.

### `psm_search_sub_group_tbl` — the PSM → sub-group link (`install/001…:2435`)
The authoritative per-PSM assignment; this is where "which sub-group" physically lives.

- `psm_id` BIGINT UNSIGNED — FK → `psm_tbl(id)` ON DELETE CASCADE
- `search_sub_group_id` SMALLINT UNSIGNED
- PK `(psm_id, search_sub_group_id)`. Note `search_sub_group_id` has **no** FK back to
  `search_sub_group_tbl` (that PK is composite on `search_id`+id). **No `search_scan_file_id` column** —
  the scan-file linkage is derived only by joining through `psm_tbl` (§2's eligibility searcher).

### `search_rep_pept_sub_group_tbl` — sub-groups per reported peptide (`install/001…:2411`)
Membership: which sub-groups a reported peptide appears in.
- `(search_id, reported_peptide_id, search_sub_group_id)`, PK on all three. FKs to `search_tbl` (CASCADE)
  and `reported_peptide_tbl` (NO ACTION). Index on `reported_peptide_id`.

### `search__rep_pept_sub_group_lookup_tbl` — precomputed PSM counts (`install/001…:2451`)
The fast path for per-sub-group PSM Count at the default cutoff.
- Key `(search_id, reported_peptide_id, search_sub_group_id)`.
- `psm_num_targets_only_at_default_cutoff`, `psm_num_indpendent_decoys_only_at_default_cutoff`
  (**note the DB misspelling "indpendent"** — it propagates verbatim into Java field/column names below),
  `psm_num_decoys_only_at_default_cutoff`.
- **Restructured by version 3** (`database_scripts/version_upgrades/3/version_upgrade.sql:322-330`):
  dropped several flag/sequential columns and renamed `psm_num_at_default_cutoff` →
  `psm_num_targets_only_at_default_cutoff`, adding the two decoy counts. The `001` definition already
  reflects the post-v3 shape.

### `project_search_sub_group_tbl` — user-editable display overlay (`install/001…:2479`)
Lives at the **project_search** tier (not written by the XML importer). Holds the user's edits:
- `(project_search_id, search_sub_group_id)` PK, plus `search_id`, `display_order`,
  `subgroup_name_display` VARCHAR(75) NULL ("User entered value or null").

### Historical / dropped
`search__rep_pept_sub_group__best_psm_value_lookup_tbl` was **dropped by version 3**
(`version_upgrades/3/version_upgrade.sql:336`) and is absent from the current schema — relevant only when
reading pre-v3 databases.

---

## 2. Java persistence: DTOs, DAOs, searchers

### Shared DTOs (`<shared>/dto/`)
One DTO per table, plain getters/setters:

| DTO | Table | Key fields |
|---|---|---|
| `SearchSubGroupDTO.java:25` | `search_sub_group_tbl` | `searchId`, `searchSubGroupId`, `subgroupName_fromImportFile` |
| `PsmSearchSubGroupDTO.java:25` | `psm_search_sub_group_tbl` | `psmId`, `searchSubGroupId` |
| `SearchRepPeptSubGroupDTO.java:25` | `search_rep_pept_sub_group_tbl` | `searchId`, `reportedPeptideId`, `searchSubGroupId` |
| `Search_ReportedPeptide_SubGroup__Lookup__DTO.java:24` | `search__rep_pept_sub_group_lookup_tbl` | ids + `psmNum_Targets_Only…`, `psmNum_IndependentDecoys_Only…`, `psmNum_Decoys_Only…` |
| `ProjectSearchSubGroupDTO.java:25` | `project_search_sub_group_tbl` | `projectSearchId`, `searchId`, `searchSubGroupId`, `displayOrder`, `subgroupName_Display` |

The search-level flag rides on `SearchDTO_Importer` (`<imp>/dto/SearchDTO_Importer.java:35`, field
`hasSearchSubGroups`).

### The cross-cutting eligibility searcher (the linchpin)
`<shared>/search_sub_group_scan_file/searchers/Search_AnyScanFile_HasPsms_In_MultipleSubGroups_ForSearchId_Searcher.java`
— plain-JDBC singleton (`getInstance()`, `:61`); method
`is_AnyScanFile_HasPsms_In_MultipleSubGroups_ForSearchId(int searchId)` (`:82`). Its query (`:67-74`) is
the whole argument for §8 in one statement:

```sql
SELECT psm_tbl.search_scan_file_id
FROM   psm_tbl
INNER JOIN psm_search_sub_group_tbl ON ( psm_search_sub_group_tbl.psm_id = psm_tbl.id )
WHERE  psm_tbl.search_id = ?
GROUP BY psm_tbl.search_scan_file_id
HAVING COUNT( DISTINCT psm_search_sub_group_tbl.search_sub_group_id ) > 1
LIMIT 1
```

Returns `true` iff **some scan file mixes >1 sub-group** ⇒ sub-groups **cross-cut** scan files ⇒ the search
is **not** eligible for per-sub-group quant. Returns `false` for the eligible case *and* for a search with
no sub-groups (empty join). This is the only place scan file and sub-group are joined; it is deliberately a
once-and-cache per-search aggregation, not a per-page query.

### Insert DAOs (import side, `<imp>/dao/` and `<imp>/dao_db_insert/`)
- `dao/SearchSubGroupDAO.java:42` — `INSERT INTO search_sub_group_tbl (search_id, search_sub_group_id, subgroup_name_from_import_file)`.
- `dao_db_insert/DB_Insert_PsmSearchSubGroup_DAO.java:47` (+ `…_BatchInserter_DAO.java`) — multi-row into `psm_search_sub_group_tbl`.
- `dao_db_insert/DB_Insert_SearchRepPeptSubGroup_DAO.java:47` (+ `…__BatchInserter_DAO.java`) — into `search_rep_pept_sub_group_tbl`.
- `dao_db_insert/DB_Insert_Search_ReportedPeptide_SubGroup__Lookup__DAO.java:47` (+ `…BatchInserter__DAO.java`) — into `search__rep_pept_sub_group_lookup_tbl`.
- `dao/SearchDAO.java:157` writes `has_search_sub_groups` from `isHasSearchSubGroups()`.

### Read searchers / update DAO (webapp side, `<web>/searchers/` and `<web>/dao/`)
Spring `@Component`, extend `Limelight_JDBC_Base`; each has a sibling `*_IF` interface.

| Class (`<web>/…`) | Reads | Returns |
|---|---|---|
| `searchers/SearchSubGroupDTOForSearchIdSearcher.java:54` | `search_sub_group_tbl` | defs for a list of searchIds |
| `searchers/ProjectSearchSubGroupDTOForProjectSearchIdSearcher.java:54` | `project_search_sub_group_tbl` | user display overlay |
| `searchers/Search_Has_SearchSubGroups_ForProjectSearchIdSearcher.java:51` | `search_tbl` flag via `project_search_tbl` join | Boolean |
| `searchers/PsmSearchSubGroupIdsForPsmIdsSearcher.java:64` | `psm_search_sub_group_tbl` | `(psmId, searchSubGroupId)` pairs |
| `searchers/PsmCountSearchSubGroups_For_PsmIds_Searcher.java:64` | `psm_search_sub_group_tbl` GROUP BY | count per sub-group (non-default cutoffs path) |
| `searchers/PsmCountSearchSubGroupsForSearchIdReportedPeptideIds_DefaultPSMCutoffs_Searcher.java:86` | `search__rep_pept_sub_group_lookup_tbl` | precomputed counts (default-cutoff fast path) |
| `searchers/SearchRepPeptSubGroupDTOForSearchIdReportedPeptideIdsSearcher.java:52` | `search_rep_pept_sub_group_tbl` | peptide↔sub-group membership |
| `searchers/SearchSubSearchGroupId_PsmId_ALL_For_SearchId__IncludesDecoys_Searcher.java:73` | `psm_tbl` ⋈ `psm_search_sub_group_tbl` | every `(subGroupId, psmId)` incl. decoys |
| `dao/ProjectSearchSubGroup__WEB_DAO.java:54` | `project_search_sub_group_tbl` | `insertOrUpdate` (`ON DUPLICATE KEY UPDATE`) — persists user renames/reorders |

Display-name resolution (import-file name vs. user override) is centralized in
`<web>/web_utils/SearchSubGroup_Name_Display_Computation_Util.java`. DB-cleanup reads the flag via
`limelight__database_cleanup__common_code__remove_data_from_database/…/Limelight_DatabaseCleanup__SearchTbl_Has_SearchSubGroupsFlag_ForSearchId_Searcher.java:31`.

---

## 3. Import path — how sub-groups get into the DB

Sub-groups are **not a dedicated XML element**. They arrive as an optional attribute **`subgroup_name` on
each `<psm>`** (JAXB `Psm.getSubgroupName()`, from the external `limelight-import-api` jar v5.0.0 —
`Gradle_limelight-import-api_version_for_Gradle.txt:1`). The set of a search's sub-groups is the distinct
set of those strings; there is no XSD in this repo.

Flow (orchestrated by `<imp>/process_input/ProcessLimelightInput.java`):

1. **Validate** — `search_sub_group_processing_validating/PreprocessValidate_SearchSubGroups.java:58-102`
   collects distinct `subgroup_name` values and enforces the **all-or-nothing rule**: if any PSM has a
   populated name while another does not, it throws `LimelightImporterDataException` (`:49-50`). Empty and
   absent are equivalent (`StringUtils.isEmpty`).
2. **Skip decision** — `ProcessLimelightInput.java:133-139`: if distinct names `< 2` (zero *or* one),
   `skip_SubGroup_Processing = true`; nothing is written and `has_search_sub_groups` is set false
   (`:215-217`). **A single sub-group is treated as none.**
3. **Save definitions** — `search_sub_group_processing_validating/Process_SearchSubGroups_SaveAtSearchLevel.java:45-72`
   assigns `searchSubGroupId = 1,2,3…` per distinct name and inserts each via `SearchSubGroupDAO`. Returns
   the name→DTO map used downstream.
4. **Link PSMs** — `process_input/ProcessPSMsForReportedPeptide.java:364-377` resolves each PSM's
   `subgroup_name` to its `searchSubGroupId` through that map (unresolvable ⇒ internal-error throw) and
   queues a `PsmSearchSubGroupDTO`.
5. **Link reported peptides + counts** — `process_input/ProcessSave_SingleReportedPeptide.java:325-340`
   writes `search_rep_pept_sub_group_tbl`; `ProcessPSMsForReportedPeptide.java:986-1012` writes the
   per-sub-group count lookup.

The submit/upload tier (`limelight_submit_import`, `…_client_connector`, `…_run_importer`) contains **no**
sub-group code — it just ships the XML; all sub-group work is in `limelight_importer`. **User docs under
`docs/` do not mention sub-groups** (no hit for `sub.group`/`subgroup`).

---

## 4. Import validation rules, restated

- **Optional:** a search may have zero sub-groups.
- **All-or-nothing:** within a search, either *every* PSM has `subgroup_name` or *none* does — mixing throws.
- **≥2 to count:** the sub-group tables and `has_search_sub_groups=1` are populated only with ≥2 distinct
  names. One name collapses to "no sub-groups."
- **One label per PSM at import:** each PSM contributes exactly one `psm_search_sub_group_tbl` row.

---

## 5. Webapp REST endpoints

URL constants: `<web>/spring_mvc_parts/data_pages/rest_controllers/AA_RestWSControllerPaths_Constants.java`
(all prefixed `PATH_START_ALL`). Response bodies are nested `public static class WebserviceResult…`
serialized by `MarshalObjectToJSON`.

| Purpose | Controller (`<web>/…/rest_controllers/…`) | URL tail |
|---|---|---|
| Sub-group **definitions** (id/name/order) + per-search `searchHasSubgroups` + `canEditSearchSubGroups` — returned as a **side payload of the search-name-list call** | `multiple_project_search_id/SearchNameList_From_ProjectSearchIds_RestWebserviceController.java:130` | `…/search-name-list-from-psi` |
| Sub-group id **per reported peptide** | `single_project_search_id/SearchSubgroups_At_ReportedPeptide_Level_…_RestWebserviceController.java:110` | `…/search-sub-groups-reported-peptide-level-single-project-search-id` |
| **PSM count** per (reportedPeptide × sub-group) | `single_project_search_id/Psm_Count_PerReportedPeptide_SubSearchGroup_…_RestWebserviceController.java:181` | `…-version-0003` |
| All `(subGroupId, psmId)` pairs, unfiltered (cached) | `single_project_search_id/SearchSubSearchGroupId_PsmId_NOT_FIltered_…_RestWebserviceController.java:70` | `…-version-0004` |
| **Quant eligibility** (cross-cut check) | `single_project_search_id/FlashLFQ_Quant__AnyScanFile_HasPsms_In_MultipleSubGroups__…_RestWebserviceController.java:97` | `…/flashlfq-quant--any-scan-file-has-psms-in-multiple-sub-groups--single-project-search-id` |
| Persist user rename/reorder | `single_project_search_id/SubGroups_Update_User_Updatable_Data_…_RestWebserviceController.java:62` | `…/sub-groups-update-user-updatable-data-single-project-search-id` |
| PSM list filtered by a `searchSubGroupId` (input only) | `single_project_search_id/PSM_List_RestWebserviceController.java:219` | — |

The **PSM-count split** has two server branches (in the `…-version-0003` controller, `:303-335`): the
default-cutoff fast path reads the precomputed `search__rep_pept_sub_group_lookup_tbl`; the non-default path
counts filtered PSM ids `GROUP BY search_sub_group_id`. `numPsms = targets + independentDecoys`.

**Capability-flag pattern** (the model a new `quant_SubGroupGrain_Eligible` flag would follow): the generic
per-search flags bundle is `multiple_project_search_id/Get_SearchFlags_From_ProjectSearchIds_RestWebserviceController.java:112`
(URL `…/search-flags-list-from-psi`), backed by `searchers/SearchFlagsForSearchIdSearcher.java:166` reading
`search_tbl` LEFT JOIN `search__flags_main_tbl` (`hasScanData`, `anyPsmHas_OpenModifications`, …). A stored
eligibility flag would add a column there + a field on `WebserviceResult_Item`. The
`…MultipleSubGroups…` endpoint above is the *on-demand* equivalent used today.

---

## 6. Front-end UI (TypeScript)

Dedicated feature dir: `<fe>/search_sub_group/`. Sub-groups surface on **single-search** views only.

### Selection UI ("Sub Searches:")
`<fe>/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock.tsx`:
- `SearchSubGroup_Entry` (`:590`) — one checkbox + color swatch + display name.
- `…EmbedInSearchDetailsRootBlock_Root_Component` (`:137`) — the "Sub Searches:" row + "Manage" link in the
  page's Search Details block.
- `…SingleProtein_FilterOn_Block_Root_Component` (`:295`) — "Filter On Sub Search:" block in the Single
  Protein overlay, with select-all/deselect-all when >5 sub-groups.
- Mutation helpers `_updateSelected_SearchSubGroupIds_Add/Remove` (`:515`/`:536`). **Optimization:** when
  all are selected, the stored set is `undefined` (`:522-523`).

### Selection state (URL-encoded, single-search only)
`<fe>/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass.ts`
— `SearchSubGroup_CentralStateManagerObjectClass` (`:47`); `_value` = `{ projectSearchId,
selectedSearchSubGroupIds?: Set<number> /* undefined = all */, no_selectedSearchSubGroupIds? }`. Cleared when
multiple searches are shown (`:141-147`). Read via `js/searchSubGroup_Get_Selected_SearchSubGroupIds.ts:19`
and `js/searchSubGroup_Are_All_SearchSubGroupIds_Selected.ts:19`.

### In-memory model & server DTOs
`<fe>/data_pages_common/dataPageStateManager.ts`:
`SearchSubGroups_EntryFor_SearchSubGroup__…Entry` (`:450`) → per-search
`SearchSubGroups_EntryFor_ProjectSearchId__…Entry` (`:493`) → root
`SearchSubGroups_Root__…Entry` (`:532`), reached via `get_SearchSubGroups_Root()` (`:185`). Raw response
DTOs are in `<fe>/data_pages_common/searchNameRetrieval.ts` (`searchSubGroupsPerSearchList` `:33`,
`searchHasSubgroups` `:42`, item shape `:53`) — i.e. defs load **with the search names**
(`data_pages_common/loadCoreData_ProjectSearchIds_Based.ts:516-564`), not a separate call.

### Data fetches
- PSM count per peptide×sub-group — `…/psm-count-…-version-0003` from
  `<fe>/common_data_loaded_from_server…/…__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters.ts:277`.
- Sub-group id per PSM (unfiltered) — `…-version-0004` from
  `<fe>/common_data_loaded_from_server…/…__SearchSubGroupId_ForPSM_ID_NOT_Filtered.ts:199`.
- Rename update — `<fe>/search_sub_group/search_sub_group_manage_group_names/js/searchSubGroup_Manage_GroupNames_UpdateServer.ts:46`.
- Quant eligibility — `<fe>/quant/flashLFQ_Quant__AnyScanFile_HasPsms_In_MultipleSubGroups__WebserviceCall.ts:17`.

### Pages that use sub-groups
- **Protein list** — the only page with true per-sub-group **columns**:
  `<fe>/project_search_ids_driven_pages/protein_page/protein_page__protein_list/jsx/…__Create_ProteinList_DataTable_RootTableDataObject.tsx`.
  Column headers like `Distinct Peptides (<subgroupName>)` from
  `…/protein_page__protein_list__single_search_code/datatable_components/…__SearchSubGroup_Peptide_Count_Header_Text_And_Tooltip_…tsx:24`.
- **Peptide page** — per-sub-group data as an **expandable child table** (not columns); main "PSMs" header
  relabels to "Total PSMs" when sub-groups are selected
  (`<fe>/data_table_react_common_child_table_components/peptide_list__reported_peptides_for_single_search/js/reportedPeptidesForSingleSearch_createChildTableObjects.ts:293`;
  child table built in `…/peptide_list_search_sub_groups_for_single_reported_peptide/js/searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject.ts:260`).
- **Single Protein overlay** — "Filter On Sub Search:" block.
- **Mod-view page**, **QC page** (sub-search coloring via
  `<fe>/color_manager/limelight_Colors_For_SingleSearch__SubSearches.ts`), **Scan-file-to-searches page**,
  **Protein-experiment page**, and the current-filters display blocks.

---

## 7. The display-grain decision (why multi-search can't show sub-groups)

Because `searchSubGroupId` is unique only within a search, the UI applies one rule everywhere columns/stats
are built (e.g. protein-list column builder branches, peptide-page compute functions):

| Condition | Grain shown |
|---|---|
| `projectSearchIds.length > 1` | **per search** — sub-groups ignored even if present |
| `length === 1` **and** sub-groups selected | **per sub-group** |
| `length === 1` **and** no sub-groups | single overall column |

This is exactly the grain logic the FlashLFQ quant column inherits — see
`flashlfq_quant_data_model_and_display_grains.md` §2.

---

## 8. Relationship to FlashLFQ MS1 quant

MS1 label-free quant is a physical property of **(peptidoform, scan file)**. A sub-group is a *logical*
per-PSM label independent of the scan file (§0), so per-sub-group quant is only meaningful when **sub-groups
partition scan files** (no scan file mixes sub-groups). When they **cross-cut**, one MS1 peak belongs to two
sub-groups at once and cannot be split — see `flashlfq_quant_subgroup_scanfile_eligibility.md` for the full
argument.

The system detects this exactly:
`Search_AnyScanFile_HasPsms_In_MultipleSubGroups_ForSearchId_Searcher` (§2) →
`FlashLFQ_Quant__AnyScanFile_HasPsms_In_MultipleSubGroups…_RestWebserviceController` (§5) →
`<fe>/quant/quant_Container_Component.tsx` (`:69-100`), which, when
`anyScanFile_HasPsmsIn_MultipleSubGroups` is true, renders *"Quant is not available for this search…"*
instead of the quant controls (and **fails open** on webservice error). Note
`<fe>/quant/quant_PrototypeData.ts` itself has **no** sub-group references — the eligibility gate lives in
the container, not the prototype peak data.

A future stored `quant_SubGroupGrain_Eligible` per-search flag would follow the `search__flags_main_tbl` /
`SearchFlagsForSearchIdSearcher` pattern (§5) rather than the on-demand endpoint.

---

## 9. One-screen "where used" index

| Layer | Key artifacts |
|---|---|
| **Schema** | `search_tbl.has_search_sub_groups`; tables `search_sub_group_tbl`, `psm_search_sub_group_tbl`, `search_rep_pept_sub_group_tbl`, `search__rep_pept_sub_group_lookup_tbl`, `project_search_sub_group_tbl` (all `database_scripts/install/001…`) |
| **Shared DTOs** | `SearchSubGroupDTO`, `PsmSearchSubGroupDTO`, `SearchRepPeptSubGroupDTO`, `Search_ReportedPeptide_SubGroup__Lookup__DTO`, `ProjectSearchSubGroupDTO` (`<shared>/dto/`) |
| **Eligibility** | `Search_AnyScanFile_HasPsms_In_MultipleSubGroups_ForSearchId_Searcher` (`<shared>/search_sub_group_scan_file/searchers/`) |
| **Import** | `PreprocessValidate_SearchSubGroups`, `Process_SearchSubGroups_SaveAtSearchLevel` (`<imp>/search_sub_group_processing_validating/`); insert DAOs in `<imp>/dao_db_insert/`; linkage in `<imp>/process_input/ProcessPSMsForReportedPeptide.java`, `ProcessSave_SingleReportedPeptide.java` |
| **Webapp read** | 8 searchers + `ProjectSearchSubGroup__WEB_DAO` (`<web>/searchers/`, `<web>/dao/`); name util `<web>/web_utils/SearchSubGroup_Name_Display_Computation_Util.java` |
| **REST** | 5 read controllers + 1 update controller (`<web>/…/rest_controllers/{single,multiple}_project_search_id/`); URLs in `AA_RestWSControllerPaths_Constants.java` |
| **Front end** | `<fe>/search_sub_group/` (selection UI + state); protein-list per-sub-group columns; peptide-page child table; mod/qc/single-protein/scan-file/protein-exp pages; quant gate in `<fe>/quant/quant_Container_Component.tsx` |
