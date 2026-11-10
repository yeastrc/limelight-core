# Reusable building blocks — inventory of existing mechanisms

As of 2026-11-09 (repo HEAD `335d58994`). Counts and user lists are approximate; grep before relying on them.

## Purpose

Limelight already contains a mechanism for most recurring needs: DB access, background jobs, caches, file
storage, webservice plumbing, front-end loaders, overlays, charts, access checks, config. A developer (human or AI
session) only finds the code they think to search for, and many of these mechanisms have names nobody would guess.
For example, the code that backfills a newly added DB column for existing searches lives in
`limelight__db_populate_new_fields__common_code`. A search for "backfill" or "migration" does not find it by
module name. The result is new code that duplicates something that already exists, or that misses its gotchas.

This inventory lists the reusable building blocks per area. For each one it gives what it solves, search keywords
(synonyms included), its location, users, how to use or extend it, when not to use it, limits and gotchas, related or
duplicate mechanisms, and a status.

## How to use it

Before you build anything new (a helper, a loader, a webservice, a cache, a background job, a chart, a config
setting):

1. Search the keyword index ([keyword_index.md](keyword_index.md); `grep -i` it) for your need, using several words and synonyms. Also scan the
   "Quick picks" table at the top of each area file.
2. Read the matching entries, including "Do not use when" and "Limits and gotchas".
3. In your plan or PR description, name the candidates you checked and say why you reused or did not reuse each one.
4. When an area lists duplicate or parallel mechanisms, use the preferred one named there. If none is named, pick
   the one closest to your use and say why.
5. Grep the code before you rely on an entry. Locations and user lists are a snapshot.
6. When you need an example to copy, copy the reference implementation an entry names, not whatever nearby code
   looks similar. Limelight's code was written over many years and its patterns changed over time, so older code
   is often not a good model. If an entry names no reference and you are unsure which existing code to follow, ask
   the maintainer.

## Area files

| File | Covers | Entries |
|---|---|---|
| [data_access.md](data_access.md) | DB connections (webapp, back end, library modules), DAOs, searchers, transactions, id allocation, importer batch inserts, DTOs/enums, schema scripts and version check | about 51 |
| [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md) | Job queues, the run importer daemon, child processes, feature-detection run-and-import, work-dir cleanup, nightly DB cleanup, populate-new-fields backfill | about 40 |
| [storage_files_external_services.md](storage_files_external_services.md) | File Object Storage, spectral storage (spectr), S3, upload/work dirs, caches, outbound HTTP clients, submit-import connector, email, downloads, hashing | about 51 |
| [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) | Interceptors, page controllers, REST controller template, (un)marshalling, path constants, webservice families, `webserviceCallStandardPost`, `{ data, promise }` loaders | about 65 |
| [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md) | Page bootstrap, URL page state, overlays/tooltips/spinners, DataTable, filters and the filter engine, search details/tags/selection, project page, upload UI, colors | about 99 |
| [charts_visualization.md](charts_visualization.md) | Plotly foundation, QC chart template, stale-async guards, colors, chromatograms, mod page charts, Lorikeet, protein/Mol* views, chart downloads | about 63 |
| [domain_utilities.md](domain_utilities.md) | Mass and m/z, modifications, peptide identity, protein inference/coverage, trypsin, annotation types and cutoffs, lookup codes, sub-groups, experiments, statistics | about 59 |
| [security_access_control_sessions.md](security_access_control_sessions.md) | REST and page access checks, admin check, refreshed session user, URL sanitizer, XXE-safe parsing, secure codes, password-length check | 10 |
| [build_deploy_config.md](build_deploy_config.md) | Ant + Gradle build, front-end build, packaging/version info, Docker/CI, startup listener, JSP skeleton, the config mechanisms | about 34 |

## Top 25 quick picks

| If you need... | Use this | File |
|---|---|---|
| A DB connection in webapp code | subclass `Limelight_JDBC_Base` (Spring `@Component`) | [data_access.md](data_access.md) |
| Several webapp writes as one all-or-nothing transaction | a `*_UsingDBTransactionService` in `database_update_with_transaction_services` | [data_access.md](data_access.md) |
| projectSearchId -> real search id (`search_tbl.id`) | `SearchIdForProjectSearchIdSearcher` / `SearchIds_For_ProjectSearchIdList_Searcher` | [data_access.md](data_access.md) |
| Change the DB schema | new `database_scripts/version_upgrades/<N+1>/` script + install scripts + `DATABASE_SCHEMA_VERSION__CURRENT` | [data_access.md](data_access.md) |
| Backfill a newly added column for existing searches | populate-new-fields framework in `limelight__db_populate_new_fields__common_code` | [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md) |
| A new kind of background job | a new `FileImportAndPipelineRun_RequestType` value + branches in `ProcessSubmittedImportOrPipelineRun` (no new queue) | [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md) |
| Run a separate program / subprocess | `RunSystemCommand` | [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md) |
| Store a long-lived file | File Object Storage (`Process_FileObjectStorage_Files_SaveAndAddToDB` in the importer) | [storage_files_external_services.md](storage_files_external_services.md) |
| Read scan data / peaks in the webapp | spectr `Call_Get_*` wrappers via `CallSpectralStorageWebservice_ForThisApp_FactoryIF` | [storage_files_external_services.md](storage_files_external_services.md) |
| Cache an expensive, immutable-after-import response | `Cached_WebserviceResponse_Management_IF` + a `-version-N` URL path | [storage_files_external_services.md](storage_files_external_services.md) |
| Send an email | `SendEmailIF` + `SendEmailItem` | [storage_files_external_services.md](storage_files_external_services.md) |
| A new browser-called JSON webservice | copy `StaticMods_Single_ProjectSearchId_RestWebserviceController` | [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) |
| Load server data for a data page or the project page (peptide, protein and PSM data under the current filters; scan data; feature detection; structure files; searches, tags, folders) | First check the `common_data_loaded_from_server__*` loader directories; use an existing loader or add a leaf there rather than calling the webservice from page code (the leaves call `webserviceCallStandardPost`) | [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md#front-end-data-loader-directories-dpcommon_data_loaded_from_server__-check-here-first) |
| Call a webservice from TypeScript (when no loader directory above fits) | `webserviceCallStandardPost` | [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) |
| Per-PSM fields (charge, scan number, searchScanFileId) that respect the user's cutoffs | `CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters` | [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) |
| Authorize a webservice that takes projectSearchIds | `ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF` | [security_access_control_sessions.md](security_access_control_sessions.md) |
| A random secret code (invite, access code, key) | `GenerateRandomStringForCode` (SecureRandom) | [security_access_control_sessions.md](security_access_control_sessions.md) |
| Parse any received / uploaded XML | `XMLInputFactory_XXE_Safe_Creator` (+ `Unmarshal_RestRequest_XML_ToObject` in the webapp) | [security_access_control_sessions.md](security_access_control_sessions.md) |
| Put a non-constant URL into `href` / `src` / `window.open` | `sanitizeURL_ForHrefOrNavigation` (external vs same-origin variant) | [security_access_control_sessions.md](security_access_control_sessions.md) |
| Keep a user choice in the URL (bookmarkable) | a `*_UserSelections_StateObject` wired into the page's `*_CentralStateManagerObjectClass` | [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md) |
| Open a modal dialog | `limelight_add_ReactComponent_JSX_Element_To_DocumentBody` + `ModalOverlay_Limelight_Component_v001_B_FlexBox` | [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md) |
| A sortable / paged / downloadable table | `DataTable_TableRoot` + `dataTable_React_DataObjects.ts` | [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md) |
| Apply all user filters to get reported peptide / PSM ids | `GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class` | [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md) |
| A chart with the standard Plotly look and download buttons | `qcPage_StandardChartConfig` + `qcPage_StandardChartLayout`; colors from `color_manager/` | [charts_visualization.md](charts_visualization.md) |
| Peptide mass or m/z in the browser | `peptide_mass_utils/PeptideMassCalculator.ts` (+ `PROTON_MASS`) | [domain_utilities.md](domain_utilities.md) |
| Respect the user's cutoffs in a new per-search webservice | accept `SearchDataLookupParams_For_Single_ProjectSearchId`, convert with `SearcherCutoffValues_Factory` | [domain_utilities.md](domain_utilities.md) |
| An admin-editable runtime setting | a key in `ConfigSystemsKeysConstants` (or the shared constants class), read via `ConfigSystemDAO_IF` | [build_deploy_config.md](build_deploy_config.md) |

## Known duplicates and parallel mechanisms

The full lists are in the "Duplicates and parallel mechanisms in this area" section of each area file (except the security file). The main ones:

- **Two job queues** with twin code at every layer. For a new job kind, add a request type to the generic
  import-and-pipeline-run queue; do not add a third queue. [background](background_processing_queues_maintenance.md#duplicates-and-parallel-mechanisms-in-this-area)
- **Schema-version compare: 4 copies**: webapp, importer/run importer shared, cleanup, populate. Use your module's copy. [data_access](data_access.md#duplicates-and-parallel-mechanisms-in-this-area)
- **DB connections**: `Limelight_JDBC_Base` (webapp) vs `ImportRunImporterDBConnectionFactory` (back end), bridged into libraries through
  three provider interfaces. [data_access](data_access.md#duplicates-and-parallel-mechanisms-in-this-area)
- **Two webapp read styles**: raw `getDBConnection()` (not transaction-aware) vs `getJdbcTemplate().query` (transaction-aware).
  Use the JdbcTemplate style for any read inside a transaction. [data_access](data_access.md#duplicates-and-parallel-mechanisms-in-this-area)
- **Two transaction mechanisms under one package name**: webapp Spring `@Transactional` vs back-end manual JDBC. They are not interchangeable. [data_access](data_access.md#duplicates-and-parallel-mechanisms-in-this-area)
- **Config mechanisms**: `config_system_tbl` vs file/env/-D readers vs env-only readers, with different precedence orders; two
  config-key constant classes. [build_deploy_config](build_deploy_config.md#duplicates-and-parallel-mechanisms-in-this-area)
- **Spectral storage clients x3** and **File Object Storage clients x2** (importer wrappers vs direct webapp calls). [storage](storage_files_external_services.md#duplicates-and-parallel-mechanisms-in-this-area)
- **`S3Client.builder()` hand-written in about 23 files**; S3 delete written 3 ways. **All S3 code is currently untested** (no S3 test environment; AWS SDK updated for security fixes since it was last tested); test thoroughly against real S3 before relying on it. This also applies to the S3 support in the File Object Storage and spectr services. [storage](storage_files_external_services.md#duplicates-and-parallel-mechanisms-in-this-area)
- **No shared outbound-HTTP helper**: the same hand-written POST helper exists in several modules. [storage](storage_files_external_services.md#duplicates-and-parallel-mechanisms-in-this-area)
- **Recursive directory delete x2**: the webapp version throws, the run importer version logs. [storage](storage_files_external_services.md#duplicates-and-parallel-mechanisms-in-this-area)
- **Upload protocols**: V1 single-request (CLI) vs V2 chunked (browser). Use V2 for new browser uploads. [storage](storage_files_external_services.md#duplicates-and-parallel-mechanisms-in-this-area)
- **Front-end HTTP calls**: use `webserviceCallStandardPost` for JSON calls. It shows the standard error to the user on any non-200 status (and reloads on 401/403). Its `doNotHandleErrorResponse` flag suppresses that, but the caller then gets no status code. When the caller must handle a specific non-200 status itself, write the call with `fetch`. Chunked uploads have their own senders. Do not add new XHR, and do not use jQuery (`$.ajax`) for any new webservice call. [webservices](webservices_and_front_end_data_loading.md#duplicates-and-parallel-mechanisms-in-this-area)
- **Webservice access checks**: use the throwing `ValidateWebSessionAccess_*` validators. [webservices](webservices_and_front_end_data_loading.md#duplicates-and-parallel-mechanisms-in-this-area)
- **JSON request parsing**: `Unmarshal_RestRequest_JSON_ToObject` (prefer; returns 400) vs direct `UnmarshalJSON_ToObject`. [webservices](webservices_and_front_end_data_loading.md#duplicates-and-parallel-mechanisms-in-this-area)
- **Filtered vs unfiltered PSM table data**: use the filtered (`..._For_MainFilters`) loaders. Use the unfiltered `..._NO_PSM_Peptide_Protein_Filtering` loaders only when the view must deliberately show data outside the user's cutoffs (e.g. score-distribution and target/decoy QC plots). Ask the maintainer before adding a new use. [webservices](webservices_and_front_end_data_loading.md#duplicates-and-parallel-mechanisms-in-this-area)
- **Download flows**: server form-POST + status polling (copy-pasted, no helper) vs client-side `StringDownloadUtils`. Choose by data
  size. [webservices](webservices_and_front_end_data_loading.md#duplicates-and-parallel-mechanisms-in-this-area)
- **Lookup-code webservice called inline in several places**: use the shared
  `updatePageState_URL_With_New_SearchDataLookupParameters_Root.ts`. [front-end UI](front_end_ui_components_page_framework.md#duplicates-and-parallel-mechanisms-in-this-area)
- **Two Plotly rendering paths** (QC queued PNG vs direct `Plotly.newPlot`), and general chart helpers that live in the QC page folder. [charts](charts_visualization.md#duplicates-and-parallel-mechanisms-in-this-area)
- **Mass code and constants**: front-end `PeptideMassCalculator.ts`, the Java library calculator, and hand-written m/z / isotope
  math and proton-mass literals elsewhere. Import the shared constants. [domain](domain_utilities.md#duplicates-and-parallel-mechanisms-in-this-area)
- **Trypsin rules in 3 places with 2 different rules**. [domain](domain_utilities.md#duplicates-and-parallel-mechanisms-in-this-area)
- **Admin determination**: use `UserIsAdminCheck`. [security](security_access_control_sessions.md#global-admin-check-userisadmincheck)

## How to keep it current

- When you add a new reusable mechanism, or change, move, or remove one listed here, update the matching area file
  **and** the keyword index ([keyword_index.md](keyword_index.md)) in the same commit.
- Add synonyms and "unexpected names" to an entry's "Search keywords" line. The index is built from those lines plus
  the entry names.
- Mark any entry you could not re-check against the code as `Status: unverified` and say what is unconfirmed.
- Use repo-relative paths only. Do not add host paths, hostnames, credentials or config values, or descriptions of
  security weaknesses. Give positive guidance only (which helper to use).

## Status legend

- **verified**: the entry was checked against the source code (location, behavior, and users by grep) as of 2026-11-09.
  **verified (re-checked)** means it was checked a second time, independently.
- **unverified**: not fully confirmed; the entry says what is unconfirmed.
- Notes on possible defects are from reading the code, not from running it, unless the entry says otherwise.

## Keyword index

The keyword index (3,062 keywords → 472 entries) is in [keyword_index.md](keyword_index.md), kept separate
because of its size. It has one keyword per line, so `grep -i '<word>' keyword_index.md` is the fastest way to use it.
