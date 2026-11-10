# Reusable building blocks — Data access (DB read/write)

Part of the reusable-building-blocks inventory; start at [README.md](README.md) (keyword index, quick picks, duplicates).
Counts and user lists are as of 2026-11-09 and approximate; grep before relying on them.

How Limelight Java code reads and writes the main MySQL database: connection sources (webapp Spring `JdbcTemplate`
vs back-end connection factory vs injected providers for library modules), the webapp DAO / Searcher / transaction-service
layers, the importer's batch-insert write path, ID allocation through `*__insert_id_tbl` side tables, DTO / enum / constant
conventions, and the SQL install / upgrade scripts with the schema-version check that every program runs.

Path abbreviations used below (all repo-relative):
- `J` = `limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp`
- `SC` = `limelight_shared_code/src/main/java/org/yeastrc/limelight/limelight_shared`
- `IRS` = `limelight_importer_run_importer_shared/src/main/java/org/yeastrc/limelight/limelight_importer_runimporter_shared`
- `IMP` = `limelight_importer/src/main/java/org/yeastrc/limelight/limelight_importer`

## Quick picks

| If you need... | Use this | Entry |
|---|---|---|
| A DB connection in webapp code | subclass `J/db/Limelight_JDBC_Base` (Spring `@Component`) | Webapp DB access base class |
| A DB connection in importer / run importer / feature-detection importer | `IRS/db/ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection()` | Back-end DB connection factory |
| A DB connection inside `limelight_shared_code` or another library module | `SC/db/SharedCodeOnly_DBConnectionProvider` (or the library's own provider IF), injected by the host at startup | Library connection-provider injection |
| Insert / update / delete one webapp table | per-table `XxxDAO` + `XxxDAO_IF` in `J/dao` (template `NoteDAO`) | Webapp per-table DAO pattern |
| A read-only multi-table / filtered query in the webapp | a Searcher in `J/searchers` (template `AnnotationTypeListForSearchIdSearcher`) | Webapp Searcher pattern |
| Several webapp writes as one all-or-nothing transaction | a `*_UsingDBTransactionService` in `J/database_update_with_transaction_services` | Webapp multi-DAO transaction services |
| Read back a row you inserted earlier in the same webapp transaction | `getJdbcTemplate().query(...)` + `RowMapper` (template `ProjectScanFileDAO.getId_For_ProjectId_ScanFileId`) | Transaction-aware read-back |
| projectSearchId -> real search id (`search_tbl.id`) | `SearchIdForProjectSearchIdSearcher` / `SearchIds_For_ProjectSearchIdList_Searcher` | projectSearchId -> searchId and minimal search info |
| projectSearchId -> owning projectId (before an access check) | `J/services/Get_ProjectIds_For_ProjectSearchIds_Service` | projectSearchId / child record -> projectId |
| Per-search capability flags (has decoys, open mods, scan data...) | `SearchFlagsForSearchIdSearcher` (lists) or the cached single-search wrapper | Search flags |
| Allocate a primary key before inserting (one id at a time) | `*__insert_id_tbl` / `*_id_creator_tbl` "insert empty row, read key, delete older" (template webapp `ProjectDAO.save`) | Insert-id side tables: single id |
| Reserve a block of ids for bulk inserts | importer `IMP/dao_db_insert/*_InsertId_DAO` (template `DB_Insert_Psm_InsertId_DAO`) | Insert-id side tables: block reservation |
| Bulk-insert many child rows during import | `DB_Insert_*_BatchInserter_DAO` singletons + flush registry | Importer batch inserters |
| A random unique code with retry on collision | controller retry loop + DAO duplicate-key flag (read the gotchas first) | Random-code insert with retry |
| Map a DB status/type int to a Java enum | `SC/enum_classes` `value()` / `fromValue()` pattern + lookup table rows | Enum-with-stored-value + lookup tables |
| TINYINT true/false in SQL | `SC/constants/Database_OneTrueZeroFalse_Constants` | Database boolean constants |
| A DTO for a table | `SC/dto` (shared tables), `J/db_dto` (webapp-only tables), `IMP/dto` (importer partial shapes) | DTO entries |
| Store structured data in a column | versioned JSON blob (format-version column + `..._V00N` class + version-switch reader) | Versioned JSON blob columns |
| Change the schema | Workbench model -> `install/001`, new `version_upgrades/<N+1>/version_upgrade.sql`, bump `install/005` and `DATABASE_SCHEMA_VERSION__CURRENT` | Versioned upgrade scripts + schema-version check |
| Read / write a system config value | `ConfigSystemDAO_IF` (webapp), `ConfigSystemDAO_Importer` (back end), `ConfigSystemTableGetValueCommon` (shared) | System config table |
| Add a per-projectSearchId child table | add its copy to `CopyProjectSearchIdToNewProjectUsingDBTransactionService` and its delete to `DeleteProjectSearchIds_UsingDBTransactionService` (unless FK cascade) | Copy / Delete project searches |

---

## Connections and base classes

### Webapp DB access base class: `Limelight_JDBC_Base`
- What it solves: the single way webapp Java code reaches the main Limelight DB: an autowired Spring `JdbcTemplate` plus a raw-JDBC `Connection` taken from that template's `DataSource`.
- Search keywords: database connection, DB connection, JDBC, JdbcTemplate, DataSource, connection pool, base DAO, base searcher, getDBConnection, Spring JDBC
- Location: limelight_webapp, `J/db/Limelight_JDBC_Base.java`; entry points `getDBConnection()` (protected; raw `Connection` from `jdbcTemplate.getDataSource().getConnection()`), `getJdbcTemplate()` (protected).
- Used by: about 247 webapp classes (grep `extends Limelight_JDBC_Base`): all 72 DAOs in `J/dao`, about 140 searchers in `J/searchers`, searchers in `J/search_data_lookup_parameters_code/searchers`, `J/file_import_limelight_xml_scans/{dao,searchers}`, `J/file_import_pipeline_run/{dao,searchers}`, `J/experiment/searchers`, the webapp schema-version comparer, and the three connection-provider bridges (see "Library connection-provider injection").
- How to use / extend: subclass it, annotate `@Component`, inject through its `_IF`. Reads: `try ( Connection c = super.getDBConnection(); PreparedStatement ps = ... )`. Writes: `getJdbcTemplate().update(...)`.
- Do not use when: outside the webapp (back-end programs use `ImportRunImporterDBConnectionFactory`). Never instantiate a subclass with `new` — `jdbcTemplate` stays null and the class throws `LimelightInternalErrorException` ("must be created by Spring").
- Limits and gotchas: `getDBConnection()` takes a connection straight from the `DataSource`; it does NOT join Spring's transaction (no `DataSourceUtils` / `TransactionAwareDataSourceProxy` anywhere in the repo, per grep). A read through it inside a `@Transactional` method runs on another connection and cannot see that transaction's uncommitted rows. Raw-JDBC reads throw `SQLException`; `JdbcTemplate` writes throw Spring `DataAccessException`s (e.g. `DuplicateKeyException`). Callers must close the connection. Only the main Limelight DB is reachable. The `DataSource` is a JNDI lookup configured through Spring Boot: `limelight_webapp/src/main/resources/limelight_db_config.properties` sets `spring.datasource.jndi-name`, loaded by `@PropertySource` on `LimelightSpringApplicationRoot`; the pool itself is defined in the servlet container.
- Related / duplicates: `ImportRunImporterDBConnectionFactory` (back-end equivalent); `SharedCodeOnly_DBConnectionProvider` (library indirection). `limelight_webapp/SampleJavaCode/JDBC_JDBCTemplate_EquivalentCode.java` shows JdbcTemplate vs raw-JDBC equivalents (sample only, outside `src`).
- Status: verified (DataSource origin verified: JNDI) (re-checked)

### Back-end DB connection factory: `ImportRunImporterDBConnectionFactory`
- What it solves: JDBC connections for the non-webapp Java programs (importer, run importer, feature-detection importer): a main pool, a bulk-insert pool, an "insert control commit" connection for long imports, separate factory instances for run-importer side threads, and DB parameters from env vars or a properties file.
- Search keywords: database connection, connection pool, dbcp, dbcp2, JDBC, bulk insert connection, insert control commit, commit every 100, back-end DB access, DB host env var
- Location: limelight_importer_run_importer_shared, `IRS/db/ImportRunImporterDBConnectionFactory` (`getMainSingletonInstance`, `get_New_Instance`, `closeAllConnections_And_Remove_Instance_From_get_New_Instance`, `closeAllConnections_OnAllInstancesNotRemoved_From_get_New_Instance`, `initialize(IDBConnectionParametersProvider)`, `getConnection`, `getInsertControlCommitConnection`, `commitInsertControlCommitConnection`, `setInsertControlCommitConnection_Do_NOT_Disable_AutoCommit`). Parameters: `IRS/db/IDBConnectionParametersProvider`, `DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables` (DB parameters come from environment variables, falling back to a properties file). Implements `SharedCodeOnly_DBConnectionProvider_Provider_IF`.
- Used by: about 153 files, mostly `limelight_importer` and `limelight_feature_detection_run_import` DAOs; run importer `ManagerThread`, `ImporterRunnerMain`, `ImportFiles_DelayedRemoval_Thread`, `Database_PopulateNewFields_Cleanup_RemoveData_Thread`. `getInsertControlCommitConnection` about 78 uses in `limelight_importer`.
- How to use / extend: plain DAO: `try ( Connection c = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() )` (auto-commit). Long bulk inserts: use the insert-control-commit connection (do NOT close it) and `commitInsertControlCommitConnection()` at phase ends. A separate run-importer thread: `get_New_Instance()` and close it with the static close method.
- Do not use when: in the webapp (use `Limelight_JDBC_Base`) or in shared library code (use `SharedCodeOnly_DBConnectionProvider`).
- Limits and gotchas: main pool max 3 connections (bulk-insert pool max 1), pool wait 100 ms, connection lifetime 4 hours. The insert-control-commit connection is one shared, synchronized connection (not for concurrent threads); rows written on it are invisible to other connections until the next commit. DB env-var naming differs from the webapp's (see [build_deploy_config.md](build_deploy_config.md)).
- Related / duplicates: webapp `Limelight_JDBC_Base`; run importer `ProcessImporterRunnerConfigFileEnvironmentVariables` also reads these params.
- Status: verified (re-checked)

### Library connection-provider injection (`SharedCodeOnly_DBConnectionProvider` and per-library provider IFs)
- What it solves: lets non-Spring library code (`limelight_shared_code`, `limelight_importer_run_importer_shared`, the DB-cleanup and populate-new-fields libraries, the embedded user-mgmt library) get main-DB connections from whichever host program it runs in; the host injects a provider at startup.
- Search keywords: connection provider, DB connection factory, shared code DB access, inject connection, dependency injection without Spring, library database access, ContextRefreshedEvent, initialize library
- Location:
  - Shared code: `SC/db/SharedCodeOnly_DBConnectionProvider` (`getInstance().getConnection()`, static setter `setSharedCodeOnly_DBConnectionProvider_Provider_IF`), interface `SharedCodeOnly_DBConnectionProvider_Provider_IF`.
  - DB cleanup library: `...database_cleanup.common.database_connection.Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode` + `Limelight_DatabaseCleanup__DBConnectionProvider_Provider_IF`.
  - Populate-new-fields library: `...db_populate_new_fields__common_code.common.database_connection.Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode` + `Limelight_DatabasePopulateNewFields__DBConnectionProvider_Provider_IF`.
  - Webapp bridges (each extends `Limelight_JDBC_Base`, returns `super.getDBConnection()`): `J/init_shared_code_lib/pass_to_shared_code_lib/SharedCode_DBConnectionProvider`, `J/init_populate_new_db_fields_shared_code_lib/pass_to_populate_new_db_fields_shared_code_lib/PopulateNewDBFields_SharedCode_DBConnectionProvider`, `J/init_included_libs/pass_to_included_libs/UserMgmtCentralMainDBConnectionFactory_For_Limelight`; registered by `InitializeSharedCodeLibrary` (also sets `ConfigSystemTableGetValueCommon`), `Initialize_PopulateNewDBFields_SharedCodeLibrary`, `InitializeIncludedLibraries` on Spring `ContextRefreshedEvent`.
  - Back-end setters: importer `LimelightImporterProgram`, run importer `RunImporterProgram`, feature-detection `Limelight_FeatureDetection_Run_Import_Program` pass `ImportRunImporterDBConnectionFactory`; run importer adapters `RunImporter__Limelight_DatabaseCleanup__DBConnectionProvider_Provider`, `RunImporter__Limelight_Database_PopulateNewFields__DBConnectionProvider_Provider` (set in the maintenance thread's `run()`).
- Used by: shared DAOs/searchers such as `RunImporter_PauseProcessing_Request_Searcher`, `FileImportTracking_Searcher_Shared`, the `*_Shared_Get_DAO` import-queue readers, `Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO`; IRS `FileImportTrackingRun_Importer_RunImporter_DAO`, `UpdateTrackingTrackingRunRecordsDBTransaction`; all cleanup / populate DAOs.
- How to use / extend: in library code `try ( Connection c = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection() )`. A new library that needs DB access: define a provider IF in the library, add a webapp `@Component` bridge extending `Limelight_JDBC_Base` plus a setter call in an `@EventListener(ContextRefreshedEvent)`, and a setter call in each back-end program `main`. A new deployable that uses shared DB code must call the shared setter at startup.
- Do not use when: inside the webapp proper (use DAOs/searchers) or inside importer DAOs (they use the factory directly).
- Limits and gotchas: provider is a static field; unset -> `IllegalStateException("...Not Set")` at first query. Connections are not transaction-aware. The populate library ALSO calls shared-code tracking DAOs, so a host must initialize BOTH its provider and `SharedCodeOnly_DBConnectionProvider`. Providers are set on `ContextRefreshedEvent`; library code called earlier during webapp startup would see no provider (assumption, not traced). The populate holder's Javadoc says "Used only by DB Cleanup Code" (copy-paste). `Initialize_PopulateNewDBFields_SharedCodeLibrary` autowires `ConfigSystemDAO` without using it.
- Related / duplicates: three parallel provider IF + holder sets (shared, cleanup, populate), each with its own webapp / run-importer implementation.
- Status: verified (user-mgmt bridge registered in `InitializeIncludedLibraries` on `ContextRefreshedEvent`, read) (re-checked)

---

## Webapp DAO layer

### Webapp per-table DAO pattern (`XxxDAO` + `XxxDAO_IF`)
- What it solves: insert / update / delete (and small get-by-id / natural-key reads) on one table of the main DB from the webapp, participating in Spring transactions.
- Search keywords: DAO, data access object, insert, update, delete, save, persist, write to database, auto-increment id, generated key, GeneratedKeyHolder, Spring transaction, @Transactional, table access
- Location: limelight_webapp, `J/dao` (72 DAO classes + 71 `_IF`). Template: `J/dao/NoteDAO.java` + `NoteDAO_IF.java` (get-scalar-by-id via raw JDBC, insert with generated key, update, delete). Find the DAO for a table by grepping its table name in `J/dao` (class Javadoc names the table). Other DAO/searcher packages: `J/file_import_limelight_xml_scans/dao`, `J/file_import_pipeline_run/dao`.
- Used by: mostly the transaction services in `J/database_update_with_transaction_services` and REST controllers under `J/spring_mvc_parts`; read methods also by searchers (e.g. `StaticModDTOForSearchIdSearcher` uses `StaticModDAO`). Most used: `ConfigSystemDAO` (about 45 files), `ProjectDAO` (about 43), `UserDAO`, `ProjectScanFileDAO`, `ScanFileDAO`, `ProjectUserDAO`. Every DAO has at least one user outside `J/dao` (grep).
- How to use / extend: `@Component public class FooDAO extends Limelight_JDBC_Base implements FooDAO_IF`; inject `FooDAO_IF` with `@Autowired`. Conventions in every write method:
  - writes via `this.getJdbcTemplate().update( new PreparedStatementCreator(){...} [, keyHolder] )` (comment "Use Spring JdbcTemplate so Transactions work properly");
  - auto-increment id via `GeneratedKeyHolder` + `Statement.RETURN_GENERATED_KEYS`, check `> Integer.MAX_VALUE`, `item.setId(...)`;
  - write methods annotated per method `@Transactional( propagation = Propagation.REQUIRED )` or `Propagation.MANDATORY` (16 DAOs have MANDATORY methods, e.g. `ProjectDAO`, `ProjectSearchDAO.delete`, `ProjectScanFileDAO`, `ProjectScanFilename_DAO`, `ProjectSearch_TagMapping_DAO`, `DataPageSavedViewDAO`, `UrlShortenerDAO`, `SearchDataLookupParametersLookupDAO`, `StructureFile_Like_PDB_File_DAO`); MANDATORY methods may only be called inside an existing transaction (i.e. from a transaction service);
  - write methods declare no checked exceptions (comment: checked exceptions don't trigger Spring rollback); they log `msg + SQL` and rethrow;
  - reads use raw JDBC via `super.getDBConnection()` with try-with-resources and return `null` when not found.
  - Full-row mapping can be reused from searchers via the DAO's `populateFromResultSet( rs )` (e.g. `AnnotationTypeDAO_IF`).
- Do not use when: the query is filtered / multi-table / cutoff-driven (write a Searcher); multi-table atomic writes (call the DAOs from a transaction service, not a controller); outside the webapp.
- Limits and gotchas: (1) `getDBConnection()` reads are not transaction-aware (see "Transaction-aware read-back"). (2) `@Transactional` applies only through the Spring proxy (another bean calling the `_IF`), not on `this.` calls. (3) `FileImportSubmitImportProgramKeyPerUserHistoryDAO` has no `_IF`. (4) A few DAOs build table names non-literally (`FileImportSubmitImportProgramKeyPerUser*`, `SearchDataLookupParametersLookup*`, `StaticModDAO`) — a literal table-name grep misses them. (5) Repo-root `IssuesWithChangingTheDatabaseDirectly.txt`: editing `annotation_type_filterable_tbl` default-cutoff fields directly in the DB can make the program return incorrect results.
- Related / duplicates: same-named DAO classes in `limelight_importer` and `limelight_feature_detection_run_import` for the same tables (`AnnotationTypeDAO`, `AnnotationTypeFilterableDAO`, `ProjectSearchDAO`, `SearchProgramsPerSearchDAO`, `SearchScanFileDAO`, `FeatureDetectionRoot_ProjectScanFile_Mapping_DAO`; `FileObjectStorage_MainEntry_DAO_Webapp` vs `_Importer`) — grep by class name hits several modules; check the module.
- Status: verified (not every DAO body read) (re-checked)

### Transaction-aware read-back inside a webapp write transaction
- What it solves: reading rows (typically "get id for natural key" after an insert, or check-then-insert) on the SAME connection as the in-progress Spring transaction, so uncommitted rows are visible.
- Search keywords: read your own writes, select inside transaction, get id after insert, find or create, get or insert, upsert lookup, RowMapper, JdbcTemplate query, transactional read
- Location: limelight_webapp `J/dao`; reference `ProjectScanFileDAO.getId_For_ProjectId_ScanFileId` (`@Transactional(REQUIRED)`, private static `QueryForIdRowMapper implements RowMapper<Integer>`, comment "Query using 'this.getJdbcTemplate().query' so part of same transaction as the called 'save' method"). Same pattern only in `ProjectScanFilename_DAO`, `ProjectSearch_TagCategoryInProject_DAO` (`getId_For_ProjectId_CategoryLabel`), `ProjectSearch_TagStringInProject_DAO` (4 DAOs total, per grep).
- Used by: `CopyProjectSearchIdToNewProjectUsingDBTransactionService` (project scan file get-or-insert, tag category / tag string lookup in the target project); the tag DAOs' read-back methods via search-tag REST controllers (e.g. `SearchTags_Add_SingleSearchTag_For_ProjectId_Or_ProjectSearchIdList_RestWebservice`).
- How to use / extend: in the DAO, `this.getJdbcTemplate().query( PreparedStatementCreator, RowMapper )`, annotate `@Transactional(REQUIRED)`, and throw `LimelightDatabaseException` on `size() > 1` like `ProjectScanFileDAO`.
- Do not use when: a plain read outside a write transaction (raw `getDBConnection()` is the norm).
- Limits and gotchas: every other DAO read and EVERY Searcher uses `getDBConnection()` and will NOT see uncommitted rows. Calling a Searcher from inside a transaction service to read freshly inserted data is a latent bug class.
- Related / duplicates: base-class entry.
- Status: verified (re-checked)

### Infrastructure-table DAOs (generic mechanisms hiding among per-table DAOs)
- What it solves: DAOs for tables that back reusable mechanisms rather than one feature.
- Search keywords: config system, file object storage entry, URL shortener, share page, project search id code, search data lookup parameters, run importer pause, schedule, user mirror, upsert
- Location (all `J/dao`):
  - `ConfigSystemDAO` (`getAll()`, `getConfigValueForConfigKey(String)`) + `ConfigSystem_Update_DAO` (`updateValueOnlyOnConfigKey`) — `config_system_tbl` (see "System config table").
  - `FileObjectStorage_MainEntry_DAO_Webapp` (`getForId`, `get_Id_For_FileTypeId_AND_FileObjectStorageStorageAPIKey`, `saveToDatabase`) — webapp side of `file_object_storage_main_entry_tbl`.
  - `UrlShortenerDAO` + `UrlShortenerAssocProjectSearchIdDAO` / `UrlShortenerAssocExperimentIdDAO` — share-page short URLs.
  - `ProjectSearchIdCodeDAO` — stable random code per projectSearchId (`getByProjectSearchId`, `getByProjectSearchIdList`, `getProjectSearchIdCodeDTOList_For_project_search_id_codes`, `save`).
  - `SearchDataLookupParametersLookupDAO` (+ `...AssocProjSrchIdDAO`) — storage for URL `q/` lookup codes (`getPartialForHashOfMainParams`, hash-collision-index lookup, `updateLastAccessed`); logic in [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) / [domain_utilities.md](domain_utilities.md) (`SearchDataLookupParams_MainProcessing`).
  - `FileImport_RunImporter_PauseProcessingRequest_DAO` / `..._PauseProcessing_Schedule_DAO` — admin pause / schedule of the run importer (schedule update is optimistic: `update_for_Type_And_scheduleJSON_PrevLastUpdated_Milliseconds_UTC` returns boolean).
  - `ZzUserDataMirrorDAO` — `INSERT ... ON DUPLICATE KEY UPDATE` mirror of user data (example upsert DAO).
- Used by: per item; counts verified by grep.
- How to use / extend: inject the `_IF`.
- Do not use when: a higher-level service already wraps the table (lookup-code services, URL shortener insert service, config readers).
- Limits and gotchas: no caching inside any DAO (grep). See "Random-code insert with retry" for `UrlShortenerDAO` / `ProjectSearchIdCodeDAO`.
- Related / duplicates: importer `FileObjectStorage_MainEntry_DAO_Importer` (same table).
- Status: verified (signatures and tables read; not every method body)

---

## Webapp Searchers (read-only queries)

### Webapp Searcher pattern (`XxxSearcher` + `_IF`)
- What it solves: one read-only SQL query (usually multi-table, non-PK, or list-based) wrapped in a Spring bean and injected by interface — the webapp's read side next to DAOs.
- Search keywords: searcher, query, SELECT, read only, JDBC, PreparedStatement, lookup, finder, repository, DAO read, find records, read DB
- Location: limelight_webapp, flat package `J/searchers` (about 250 files incl. interfaces); also `J/search_data_lookup_parameters_code/searchers`, `J/experiment/searchers`, `J/file_import_*/searchers`. Small templates: `J/searchers/AnnotationTypeListForSearchIdSearcher.java` (+ `...SearcherIF`), `SearchHasScanDataForSearchIdSearcher`. Result holders: shared DTOs (`SC/dto`), `J/searchers_results` (23 classes), or (newer) a nested `public static class ..._Result` / `..._ResultItem`.
- Used by: REST controllers under `J/spring_mvc_parts/**`, services in `J/services`, the data-page access-control interceptor, download controllers, DB-transaction services.
- How to use / extend: `@Component class XxxSearcher extends Limelight_JDBC_Base implements XxxSearcher_IF`; `private static final String QUERY_SQL`; `try ( Connection c = super.getDBConnection(); PreparedStatement ps = ... )`, nested try for the `ResultSet`; `catch ( SQLException e ) { log.error( "error running SQL: " + sql, e ); throw e; }`. Callers `@Autowired private XxxSearcher_IF xxx;`. Find an existing one by grepping the table name in `J/searchers`; names follow `<WhatReturned>For<Inputs>Searcher`. Reuse a DAO's `populateFromResultSet` for full rows instead of hand-mapping.
- Do not use when: writes (DAO / transaction service); code outside the webapp (importer and shared code have their own DAOs/searchers using other connection sources).
- Limits and gotchas: must be Spring-created. Not transaction-aware (see read-back entry). Interface suffix is inconsistent (`_IF`, `IF`, `_Searcher_IF`, `SearcherIF`) — grep both; `OpenModificationsPSMsRoundedUniqueAtReportedPeptideLevelForSearchIdReportedPeptideIdsSearcher` implements a differently named IF. Method names may be copy-paste leftovers (`SearchIdForProjectSearchIdSearcher.getSearchListForProjectId(projectSearchId)` returns one searchId). No caching inside searchers except `PsmIds_OR_PsmCount_...` (caching normally lives in a wrapper service). Most searchers hand-map columns that DAOs already map (drifts when columns are added). Several searchers are in misleading packages (annotation-value searchers live in `search_data_lookup_parameters_code/searchers`).
- Related / duplicates: DAOs; non-Spring `getInstance()` searchers in importer / feature-detection modules (e.g. a same-named `FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher` in `limelight_feature_detection_run_import`).
- Status: verified

### SQL `IN ( ?, ?, ... )` list queries (no shared helper) and caller-side batching
- What it solves: fetch rows for a list of ids with bound parameters.
- Search keywords: IN list, IN clause, list of ids, placeholders, bulk lookup, batch query, chunk, block size, split list, many ids, parallel stream
- Location: inline in each list searcher, e.g. `ProjectIdsForProjectSearchIdsSearcher`, `ProjectSearchTags_ForProjectSearchIdsSearcher`, `ProteinSequences_For_ProteinVersionIds_SearchIds_Searcher` (two IN lists), `FileObjectStorage_ForSearch_ForSearchIdsSearcher` (IN plus include `IN` / exclude `NOT IN`), `PsmDynamicModificationMassesFor_PsmIds_Searcher`, `PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher`, `SearchIds_For_ProjectSearchIdList_Searcher`. Caller-side batching example: `PsmTable_Data_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController` (`_PSM_ID_BLOCK_SIZE = 4000`, blocks in `parallelStream` when enabled, errors collected then rethrown).
- Used by: about 25+ list-taking searchers.
- How to use / extend: SQL constant ends `IN ( `, loop appends `?` with `,`, close `)`, then bind in the same order with a running counter; return an empty list on empty input. Batch in the caller when the list can be large.
- Do not use when: the list is unbounded and the caller does not split it.
- Limits and gotchas: NO shared IN-list / batching utility exists in the webapp (`J/searcher_utils` holds only `DefaultCutoffsExactlyMatchAnnTypeDataToSearchData`; a pointer to "batching utils in searcher_utils" was checked and is wrong). No size cap. Empty-list behavior differs: some return empty, some throw `IllegalArgumentException` (`ProjectIdsForProjectSearchIdsSearcher`, `FileObjectStorage_ForSearch_ForSearchIdsSearcher`), others may emit invalid `IN ( )` (not checked one by one).
- Related / duplicates: DB-cleanup block deletes ([background_processing_queues_maintenance.md](background_processing_queues_maintenance.md)) are another hand-rolled batching style.
- Status: verified (per-searcher empty-list handling only partly checked)

### projectSearchId -> searchId and minimal search info (incl. search name source)
- What it solves: resolve `project_search_tbl.id` to `search_tbl.id`; get per-project name / short name / flags; list a project's searches.
- Search keywords: search id, projectSearchId, project search, search name, search list for project, SearchItemMinimal, resolve search id
- Location: `J/searchers/SearchIdForProjectSearchIdSearcher` (single; misnamed method `getSearchListForProjectId(projectSearchId)` returns `Integer` searchId), `SearchIds_For_ProjectSearchIdList_Searcher` (list), `SearchMinimalForProjectSearchIdSearcher` (one `J/objects/SearchItemMinimal`: raw `project_search_tbl.search_name`, short name, both ids, project id, has_search_sub_groups, has_scan_data, import end), `SearchListForProjectIdSearcher` (all `IMPORT_COMPLETE_VIEW` searches in a project).
- Used by: `SearchIdForProjectSearchIdSearcher` about 55 classes (most per-search REST controllers); list variant: data-page access-control interceptor, `Experiment_List_RestWebservice`; `SearchMinimalForProjectSearchIdSearcher`: `SearchNameList_From_ProjectSearchIds_RestWebserviceController`, copy-searches controllers, two PSM download controllers; `SearchListForProjectIdSearcher`: `ProjectSearchList_Controller`, `ViewProjectSearchesInFolders`.
- How to use / extend: for display, run the raw name through `SearchNameReturnDefaultIfNull` (root `CLAUDE.md`).
- Do not use when: on main front-end data pages names are already loaded (`searchNameRetrieval.ts`).
- Limits and gotchas: names are raw (may be null). Check whether a searcher filters on status before relying on it beyond display. `ProjectSearchDAO.getFromId` is a parallel path to the same row.
- Related / duplicates: four ways to go projectSearchId -> searchId (the three searchers + `ProjectSearchDAO.getFromId`).
- Status: verified (re-checked)

### projectSearchId / child record -> projectId (for access checks)
- What it solves: find the owning project of projectSearchIds, project scan files, feature-detection mappings, gold-standard mappings, short names and public access codes, so an access check can run.
- Search keywords: project id for project search id, owning project, ownership, access control, auth, project id for project scan file, project short name, public access code
- Location: `J/searchers/ProjectIdsForProjectSearchIdsSearcher` (`getProjectIdMappingForProjectSearchIds( List<Integer> ) -> Map<projectSearchId, projectId>`); wrapper `J/services/Get_ProjectIds_For_ProjectSearchIds_Service` (interface `..._ServiceIF`; returns the distinct project ids for the given projectSearchIds); `ProjectScanFile_ProjectId_For_ProjectScanFileId_Searcher`, `FeatureDetection_ProjectIdFor_FeatureDetectionRoot_MappingTblId_Searcher`, `GoldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher`, `ProjectIdForProjectShortNameSearcher`, `ProjectIdFor_Project_PublicAccessCode_PublicAccessCodeEnabled_Searcher`.
- Used by: service — `ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds`, `Validate_Access_Page_ExperimentDataPage`, `Project_OrganizeSearches_SetSearchesOrder_RestWebserviceController`; searcher / child lookups — `DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor`, `Experiment_AddSave_MainProcessing`, `FeatureDetectionView_Controller`, `LorikeetSpectrumViewer_PageController`, `Project_ScanFile_Details_RestWebserviceController`, `Project_ScanFile_Delete_RestWebserviceController`, `ProjectShortName_RedirectTo_ProjectView_Controller`, `User_Process_PublicAccessCode_Value_RestWebserviceController`.
- How to use / extend: prefer the service for projectSearchIds, then run the standard access check ([security_access_control_sessions.md](security_access_control_sessions.md)).
- Do not use when: you need the search id (`search_tbl.id`).
- Limits and gotchas: throws on null/empty input.
- Related / duplicates: none beyond the list above.
- Status: verified (re-checked)

### Search flags (per-search capability flags)
- What it solves: per search, booleans such as has scan filenames / scan data / isotope label, any PSM has dynamic mods / open mods / reporter ions / decoy / independent decoy / PSM-peptide-position annotation; nullable all-PSMs-have RT / m/z, PSM ids sequential; protein mapping provided; search has no proteins.
- Search keywords: search flags, has scan data, has decoys, has open mods, has reporter ions, capabilities, feature flags per search, search__flags_main_tbl
- Location: `J/searchers/SearchFlagsForSearchIdSearcher` (`search_tbl` LEFT JOIN `search__flags_main_tbl`, list of searchIds); cached single-search wrapper `J/services/SearchFlagsForSingleSearchId_SearchResult_Cached` ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Used by: direct — `Get_SearchFlags_From_ProjectSearchIds_RestWebserviceController`, `ProjectView_OrFrom_ProjectSearchIds_SearchList_RestWebserviceController`, `Experiment_List_RestWebservice`, the data-page access-control interceptor, `Experiment_Set_HTTPRequest_ForJSP`, `BlibSpectralLibrary_Download__Request_Creation_RestWebserviceController`, two PSM download controllers; cached wrapper about 13 classes.
- How to use / extend: inside per-search query code use the cached service; use the searcher for multi-search lists.
- Do not use when: a single dedicated flag searcher exists (`SearchHasScanDataForSearchIdSearcher`, `Search_Has_SearchSubGroups_ForProjectSearchIdSearcher`).
- Limits and gotchas: three fields are null for older searches ("NOT Populated Yet for Existing Searches"). The cached wrapper's key class lacks `equals`/`hashCode` (seen in code, not runtime-tested; see [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Related / duplicates: single-flag searchers; `Psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher` is a second way to ask "has RT / m/z".
- Status: verified (re-checked)

### Search scan files, project scan files, and the projectSearch <-> scan file mapping
- What it solves: search-level scan files (`search_scan_file_tbl`), project-level scan files (`project_scan_file_tbl`, filenames), and how a project search's `search_scan_file_id`s map to `project_scan_file_id`s; PSMs by scan number.
- Search keywords: scan file, search scan file, searchScanFileId, project scan file, project_scan_file_id, scan filename, mapping, scan files in project
- Location: search level: `SearchScanFile_For_SearchIds_Searcher`, `SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher`, `SearchScanFile_AndAssociatedData_For_SearchIds_Searcher`, `ScanFileRecords_IsAny_For_ProjectId_Searcher`, `PsmIds_For_SearchId_ScanNumber_OptionalScanFilenameIdSearchId_Searcher`. Project level: `ProjectScanFile_For_ProjectScanFileId_Searcher` (one `Project_ScanFile_DTO`), `..._Set_Searcher`, `ProjectScanFilename_For_ProjectScanFileId_Set_Searcher`, `ProjectScanFile_For_ProjectId_Searcher` (with filename + optional FOS id), `ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher`, `ProjectSearchIdList_For_ProjectScanFileId_Searcher`.
- Used by: `SearchScanFile_For_SearchIds_Searcher` about 8 (incl. `CopyProjectSearchIdToNewProjectUsingDBTransactionService`, `PSM_List_RestWebserviceController`, `Spectrum_For_Lorikeet_For_PSM_Id_RestWebserviceController`); `ProjectScanFile_For_ProjectScanFileId_Searcher` 12 (access-control interceptor, `ScanFileBrowserView_Controller`, `FeatureDetectionView_Controller`, `ScanFileContents_StoredIn_FileObjectStorage_Download_Controller`); `Project_ScanFiles_In_Project_List_RestWebserviceController`; `ProjectSearchIds_FOR_ProjectScanFileId_RestWebserviceController`.
- How to use / extend: projectSearch -> project scan file path is `project_scan_filename__search_scan_file__mapping_tbl.project_search_id` -> `project_scan_filename_tbl.project_scan_file_id` (DISTINCT; one project scan file can have several filenames). The scan filename lives on `search_scan_file_tbl` (not `scan_file_tbl`). Design notes: `limelight_features_docs/project_scan_file_attachment_model_and_search_delete_cleanup.md`.
- Do not use when: summing quant across scan files — read the quant aggregation doc (root `CLAUDE.md`).
- Limits and gotchas: the DISTINCT projectSearchId -> project_scan_file_id subselect is copy-pasted into 4 feature-detection / gold-standard searchers. `ProjectScanFile_For_ProjectId_Searcher` uses LEFT JOINs (a project scan file may have no scan_file / FOS row).
- Related / duplicates: feature-detection / gold-standard searchers.
- Status: verified

### Scan-file storage keys: File Object Storage and Spectral Storage API key lookups
- What it solves: DB lookups that return the external-storage handle for a file — the File Object Storage API key (and import filename) for a scan file or a file attached to a search, and the spectral-storage API key of a scan file.
- Search keywords: file object storage, FOS, api key, stored file, attached files, file_type_id, spectral storage, spectr, scan file key, scan data
- Location: FOS: `J/searchers/FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher`, `FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher`, `FileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId_Searcher`, `FileObjectStorage_ForSearch_ForSearchIdsSearcher` (nested `..._RequestParams`: `setSearchIds`, `setFileTypeIds_Include`, `setFileTypeIds_Exclude`). Spectr key: `J/dao/ScanFileDAO.getSpectralStorageAPIKeyById` (single) and `J/searchers/ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher` (list).
- Used by: `ScanFileContents_StoredIn_FileObjectStorage_Download_Controller`, `FileObjectStorageEntry_Download_Controller`, `Get_SearchDetails_All_RestWebservice`; spectr key DAO about 6 scan-data / Lorikeet / Blib controllers; list searcher `Project_ScanFiles_In_Project_List_RestWebserviceController`, `Project_FeatureDetection_Runs_In_Project_List_RestWebserviceController`.
- How to use / extend: get the key here, then call the storage client ([storage_files_external_services.md](storage_files_external_services.md)). The FOS `..._AND_SearchId` variants require both ids — keep that shape for new lookups. Treat the spectr key as a server-side handle; do not send it to the browser (inferred from usage).
- Do not use when: you need file bytes ([storage_files_external_services.md](storage_files_external_services.md) clients).
- Limits and gotchas: tables `file_object_storage_main_entry_tbl`, `file_object_storage_to_search_tbl`, `scan_file_tbl.file_object_storage_main_entry_id_fk`. In `FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher` the getter is `getFilename_at_import()` but the value is `search_scan_file_tbl.filename`. Three more spectr-key searchers have no users: `SpectralStorageAPIKey_For_SearchIdSearchScanFileId_Searcher`, `SpectralStorageAPIKeyFor_ProjectId_ScanFileId__Using__project_scan_file_tbl_Searcher`, `..._Using__search_scan_file_tbl_Searcher`.
- Related / duplicates: five ways to read the spectr key column (two used); feature-detection importer has its own `SpectralStorageAPIKey_For_ProjectScanFileId_Searcher`.
- Status: verified

### PSM-table row searchers
- What it solves: `psm_tbl` per-PSM fields (charge, scan number, search_scan_file_id, RT, precursor m/z, has-mods flags, decoy flags, reported peptide id) and PSM list display rows.
- Search keywords: psm data, psm table, psm_tbl, charge, scan number, retention time, precursor m/z, psm list
- Location: `J/searchers/PsmTblData_ForSearchIdSearcher` (ALL PSMs of a search, unfiltered), `PsmTblData_For_SearchId_PsmIds_Searcher` (searchId + PSM id list), `PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher` (PSM ids; no is_decoy / reported_peptide_id), `PsmWebDisplaySearcher` (display rows, optional sub-group and PSM-id include list).
- Used by: respectively `PsmTable_Data_Unfiltered_For_Single_ProjSearchID_RestWebserviceController`; `PSM_Peptide_List_Display_With_SpectrumViewer_RestWebserviceController`; `PsmTable_Data_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController`; `PsmWebDisplaySearcher`: `PSM_List_RestWebserviceController`, PSM download controllers, Blib controller.
- How to use / extend: get filtered PSM ids first (cutoff searchers / reported-peptide service, [domain_utilities.md](domain_utilities.md)), then fetch rows by id.
- Do not use when: `PsmTblData_ForSearchIdSearcher` backs the UNFILTERED PSM-table path (ignores the user's cutoffs, loads every PSM of a search) — for new features always use the filtered per-reported-peptide path.
- Limits and gotchas: near-identical result entries; pick by whether decoy rows are needed.
- Related / duplicates: each other.
- Status: verified

### Modification and reporter-ion searchers (reported-peptide and PSM level)
- What it solves: variable (dynamic) mods per reported peptide or PSM; rounded unique open-mod masses per reported peptide; PSM-level open-mod masses and positions; reporter-ion masses; static mods per search.
- Search keywords: modification, dynamic mod, variable mod, open mod, open modification position, mass shift, PTM, reporter ions, static mod, n-terminal, c-terminal
- Location: `J/searchers`: reported-peptide level `DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher` (`srch_rep_pept__dynamic_mod_tbl`), `SrchRepPept_DynamicMod_For_SearchIdReportedPeptideId_Searcher`, `OpenModificationsPSMsRoundedUniqueAtReportedPeptideLevelForSearchIdReportedPeptideIdsSearcher` (`srch_rep_pept__psm_open_mod_rounded_lookup_tbl`); PSM level `OpenModificationMasses_PsmLevel_ForPsmIds_Searcher` (`psm_open_modification_tbl`), `OpenModificationPositions_PsmLevel_ForOpenModIds_Searcher`, `PsmDynamicModification_For_PsmIdList_Searcher`, `PsmDynamicModification_For_PsmId_Searcher`, `PsmDynamicModificationMassesFor_PsmIds_Searcher`, `PsmOpenModificationMassesFor_PsmIds_Searcher`, `PsmOpenModification_Masses_Positions_For_PsmIds_Searcher`, `PsmOpenModificationPosition_SetOf_PsmOpenModificationIds_Searcher`, `PsmReporterIonMassesFor_PsmIds_Searcher`, `ReporterIonMasses_PsmLevel_ForPsmIds_Searcher`, `ReporterIonMasses_Unique_ForSearchLevel_ForSearchIdSearcher`; `StaticModDTOForSearchIdSearcher`.
- Used by: `DynamicModifications_PerReportedPeptide_..._RestWebserviceController`, `OpenModifications_PerReportedPeptide_..._RestWebserviceController`, `Psm_Variable_Dynamic_ModificationMasses_PerReportedPeptide_...Controller`, `Psm_OpenModificationMasses_PerReportedPeptide_...Controller`, `Psm_ReporterIonMasses_PerReportedPeptide_...Controller`, `PSM_List_RestWebserviceController`, `PSM_Peptide_List_Display_With_SpectrumViewer_RestWebserviceController`, Blib controller, `StaticMods_Single_ProjectSearchId_RestWebserviceController`, PSM download controllers.
- How to use / extend: pick by inputs in the class name; results keyed by reported peptide id or PSM id. Open mods: masses by psmIds, then positions by open-mod ids.
- Do not use when: you need a computed peptide/PSM mass — these return STORED masses; always compute masses through the existing canonical calculator (webapp `web_utils/PSMMassCalculator`, built on the yeastrc proteomics library) rather than adding new mass code.
- Limits and gotchas: open-mod mass/positions are per PSM, not per reported peptide; the reported-peptide open-mod table is ROUNDED and aggregated (root `CLAUDE.md`). PSM-level searchers take `List<Long>` psm ids. Unused: `PsmOpenModification_For_PsmId_Searcher`, `PsmOpenModificationPosition_Searcher`.
- Related / duplicates: overlapping reporter-ion pair (`PsmReporterIonMassesFor_PsmIds_Searcher` vs `ReporterIonMasses_PsmLevel_ForPsmIds_Searcher`); single-id vs list dynamic-mod pair.
- Status: verified (open-mod SQL partly skimmed)

### Peptide, reported-peptide and annotation-value searchers
- What it solves: peptide ids, sequences, reported-peptide strings; filterable / descriptive annotation VALUES (scores) at PSM, PSM-peptide-position, reported-peptide and protein level; annotation types for a search; search-level annotation min/max.
- Search keywords: peptide sequence, reported peptide string, annotation values, scores, filterable annotation, descriptive annotation, annotation type, psm scores, peptide position annotation, annotation min max
- Location: `J/searchers`: `PeptideIdsForSearchIdReportedPeptideIdsSearcher`, `PeptideSequenceStringsForSearchIdReportedPeptideIdsSearcher`, `PeptideStringForSearchIdReportedPeptideIdSearcher`, `ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Searcher`, `ReportedPeptideFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher`, `ReportedPeptideDescriptiveData_..._Searcher`, `ReportedPeptideIds_For_SearchID_ProteinSequenceVersionIds_ReportedPeptideIds_Searcher`, `AnnotationTypeListForSearchIdSearcher`, `SearchLevel_Annotation_MinMax_ForSearchId_Searcher`. Parked in `J/search_data_lookup_parameters_code/searchers` (misleading package): `Psm_FilterableAnnotationData_Searcher`, `Psm_DescriptiveAnnotationData_Searcher`, `Psm_FilterableAnnotationData_AllFor_SearchId_Searcher` (all PSMs of a search, no cutoffs), `Get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeId_Searcher`.
- Used by: `PeptideIdsList_From_ReportedPeptideIds_RestWebserviceController`, `PeptideSequenceStringList_...`, `ReportedPeptideStringList_...`, the annotation "pivot to map" services ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)), `PSM_List_RestWebserviceController`, `PsmFilterableAnnotationData_*_RestWebserviceController`s, `SearcherCutoffValues_Factory` and `GetAnnotationTypeData` (annotation types), PSM download controllers.
- How to use / extend: annotation-value searchers are wrapped by services in `J/services` — call those. Annotation types: prefer `GetAnnotationTypeData` for repeated lookups (whether it caches is unverified).
- Do not use when: you want cutoff-filtered rows — these take explicit ids; filter first. `..._AllFor_SearchId_Searcher` is unfiltered by design (potentially large).
- Limits and gotchas: id-naming violations (root `CLAUDE.md` rule): classes named `..._ProjectSearchId_Searcher` take/filter a `searchId`. Unused: `SearchReportedPeptide_FilterableAnnotationData_Searcher`, `SearchReportedPeptide_DescriptiveAnnotationData_Searcher` (superseded by the batched ones), `PsmBestValuesForReportedPeptideIdSearchIdSearcher` (also stale: selects `psm_num_at_default_cutoff`, renamed in `version_upgrades/3`, so it would fail if called — seen in code, not runtime-tested).
- Related / duplicates: per-reported-peptide vs batched annotation searchers.
- Status: verified (ProjectSearchId-vs-searchId naming for the reported-peptide pair is from reading service names — re-check before use)

### Protein sequence / annotation / coverage searchers (incl. protein-level cutoff SQL)
- What it solves: protein sequences and lengths, protein names/descriptions/taxonomy per search, protein annotation values, and reported peptide -> protein (coverage) mapping filtered by protein-level cutoffs with decoy exclusion.
- Search keywords: protein sequence, protein name, protein description, taxonomy, sequence length, protein annotation, protein_sequence_version_id, protein coverage, protein cutoffs, decoy, is_decoy, reported peptide to protein
- Location: `J/searchers`: `ProteinSequences_For_ProteinVersionIds_SearchIds_Searcher`, `ProteinSequenceLengths_For_SearchID_ProteinVersionIds_Searcher`, `ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher` (+ single-id variant), `Protein_FilterableData_..._ProjectSearchId_Searcher`, `Protein_DescriptiveData_..._ProjectSearchId_Searcher`; cutoff-filtered `ProteinVersionIdsFor_SearchID_ReportedPeptideIdList_Searcher` (`getProteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher( searchId, reportedPeptideIdList, SearcherCutoffValuesSearchLevel )`), `ProteinCoverageForSearchIdReportedPeptideIdsSearcher` (full coverage rows), `ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher` (3 columns); `FastaFileStatistics_For_SearchIdList_Searcher` (target / decoy / independent-decoy counts).
- Used by: `ProteinSequenceList_From_ProteinSequenceVersionIds_RestWebserviceController`, `ProteinsInfo_ProteinSeqVersionIds_Single_ProjSearchID_RestWebserviceController`, protein annotation services, `ProteinVersionIdsFor_SearchID_SearchCriteriaService`, `ProteinSeqVersionIdsForReportedPeptides_Single_ProjectSearchId_RestWebserviceController`, `ProteinCoverage_PerReportedPeptide_..._RestWebserviceController`, `FastaFileStatistics_From_ProjectSearchIds_RestWebserviceController`, PSM download controllers.
- How to use / extend: sequence queries restrict protein version ids to those in `srch__prot_seq_v_id_tbl` for the given search(es) — keep that restriction in new ones. For cutoffs pass a `SearcherCutoffValuesSearchLevel` ([domain_utilities.md](domain_utilities.md)); each protein cutoff adds an aliased `INNER JOIN srch__protein_filterable_annotation_tbl` compared with `SearcherGeneralConstants.SQL_END_BIGGER_VALUE_BETTER` / `SQL_END_SMALLER_VALUE_BETTER`; decoy exclusion (`protein_is_decoy != 1`) only when the search has decoys (cached search flags).
- Do not use when: you need one display name for a protein (multiple annotations per protein per search; no "name" searcher in use).
- Limits and gotchas: inputs are `searchId` (`search_tbl.id`), even where class names say ProjectSearchId. `ProteinVersionIdsFor_SearchID_ReportedPeptideIdList_Searcher` uses `USE INDEX (PRIMARY)` (MySQL otherwise picks a much slower index). The protein-cutoff JOIN/WHERE block is copy-pasted in 4 searchers (these 3 + `ReportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcher`) — no shared builder. No IN-list chunking. Unused: `ProteinNameForSearchIdProteinSequenceVersionIdSearcher` (empty, "NEVER USED"), `ProteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher` (`@Component` commented out), `ProteinSequence_For_ProteinVersionId_Searcher` (and it does NOT restrict to a search).
- Related / duplicates: two coverage searchers with the same filtering; cutoff SQL ([domain_utilities.md](domain_utilities.md)).
- Status: verified

### Search sub-group searchers
- What it solves: sub-group list per search, PSM -> sub-group mapping, PSM counts per sub-group (by PSM ids or precomputed at default PSM cutoffs), reported peptide -> sub-group, has-sub-groups check, sub-group display names per projectSearchId.
- Search keywords: sub group, sub search, subgroup, condition, replicate, psm_search_sub_group_tbl
- Location: `J/searchers/SearchSubGroupDTOForSearchIdSearcher`, `PsmSearchSubGroupIdsForPsmIdsSearcher`, `PsmCountSearchSubGroups_For_PsmIds_Searcher`, `PsmCountSearchSubGroupsForSearchIdReportedPeptideIds_DefaultPSMCutoffs_Searcher` (`search__rep_pept_sub_group_lookup_tbl`), `SearchRepPeptSubGroupDTOForSearchIdReportedPeptideIdsSearcher`, `SearchSubSearchGroupId_PsmId_ALL_For_SearchId__IncludesDecoys_Searcher` (unfiltered), `Search_Has_SearchSubGroups_ForProjectSearchIdSearcher`, `ProjectSearchSubGroupDTOForProjectSearchIdSearcher`.
- Used by: `SearchNameList_From_ProjectSearchIds_RestWebserviceController`, `SearchSubgroups_At_SearchLevel_...Controller`, `Psm_Count_PerReportedPeptide_SubSearchGroup_...Controller`, the data-page access-control interceptor, `SearchSubSearchGroupId_PsmId_NOT_FIltered_Single_ProjSearchID_RestWebserviceController`, PSM download controllers.
- How to use / extend: read `limelight_features_docs/limelight_search_sub_groups_deep_dive.md`.
- Do not use when: aggregating quant — read the quant aggregation doc first.
- Limits and gotchas: `searchSubGroupId` is unique only within a searchId. `ProjectSearchSubGroupDTOForProjectSearchIdSearcher.getListForProjectSearchIds( List<Integer> searchIds )` names its parameter `searchIds` but binds projectSearchIds (id-naming violation).
- Related / duplicates: none noticed.
- Status: verified

### Search metadata / details searchers
- What it solves: search details for display (FASTA, conversion program, import time), search programs, search file <-> project search link, a sample PSM to test whether RT / m/z are populated.
- Search keywords: search details, search programs, conversion program, fasta filename, import time
- Location: `J/searchers/Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher`, `SearchProgramsPerSearchListForSearchIdSearcher`, `SearchFileProjectSearch_ForProjectSearchIdsSearcher`, `Psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher`, `SearchHasScanDataForSearchIdSearcher`.
- Used by: `Get_SearchDetails_All_RestWebservice`, `SearchProgramsPerSearchList_From_ProjectSearchIds_RestWebserviceController`, `Search_Info_From_ProjectSearchIds_RestWebserviceController`, `Spectrum_For_Lorikeet_For_PSM_Id_RestWebserviceController`.
- How to use / extend: pick by name.
- Do not use when: you need the search name (use the name sources above).
- Limits and gotchas: `Psm_RandomRecord...` reads one arbitrary PSM (`LIMIT 1`) — a heuristic.
- Related / duplicates: search flags `all_psms_have_precursor_*`.
- Status: verified

### Project-level searchers (lists, tags, comments, links, notes, saved views, users, invites, structure files, default cutoffs)
- What it solves: per-project and per-projectSearchId lists that are not identification data.
- Search keywords: project list, my projects, projects for user, copy to project, project dropdown, users not in project, search tags, tag category, label color, comment, web link, note, saved view, users in project, invites, project owner, structure file, PDB, alignment, default cutoffs, project default filter
- Location (`J/searchers`):
  - Projects: `ProjectListAllSearcher`, `ProjectListForUserIdSearcher` (both return `objects/ProjectListItem`), `ProjectListForProjectIdListSearcher`, `ProjectToCopyToSearcher`, `Project_UsersNotInTheProjectList_ForProjectIdSearcher`.
  - Tags: `ProjectSearchTags_ForProjectId_Searcher`, `ProjectSearchTags_ForProjectSearchIdsSearcher`, `ProjectSearchTagCategories_ForProjectId_Searcher`, `ProjectSearchTagCategories_ForIdsAndProjectId_Searcher`, `SearchTags_InProject_ForProjectIdSearcher`, `SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher`.
  - Attached data: `ProjectSearch_Comments_ForProjectSearchIdsSearcher`, `ProjectSearch_WebLinks_ForProjectSearchIdsSearcher`, `Project_Note_List_ForProjectIdSearcher`.
  - Saved views / users / invites: `SavedViewListForProjectIdSearcher`, `SavedView_AnyForProjectId_Searcher`, `UserListForProjectIdSearcher`, `UserInvitesActiveUnusedNotReplacedNotRevokedSearcher`, `User_IsAny_ProjectOwner_Searcher`.
  - Structure files: `StructureFile_Like_PDB_*_Searcher` (5).
  - Default cutoffs: `ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher` (`project_level_default_fltr_ann_cutoffs_tbl` + `..._cutoff_as_string_tbl`).
  - Copy check: `ProjectSearchIdAssocSearchIdInProjectIdSearcher` (is this search already active in the target project).
- Used by: `ProjectSearchList_Controller`, `ProjectsList_RestWebserviceController`, `Project_ListOtherProjects_ExcludingProjectSearchIds_RestWebserviceController`, `Project_ListUsersNotInProject_Service`, `SearchTags_Get_For_*_RestWebservice`, `ProjectView_OrFrom_ProjectSearchIds_SearchList_RestWebserviceController`, `Get_SearchDetails_All_RestWebservice`, `Project_NotesList_RestWebserviceController`, `ProjectView_SavedViewsList_RestWebserviceController`, `UserListForProject_Service`, `StructureFile_*_RestWebserviceController`s, `Project_Level_Filter_Default_Cutoffs_Override_Maint__Get_RestWebserviceController`, `CopyProjectSearchIdToNewProjectUsingDBTransactionService`.
- How to use / extend: project lists filter `enabled = 1 AND marked_for_deletion = 0` (copy targets also `project_locked = 0`); user-scoped queries use `project_user_tbl.access_level <= AuthAccessLevelConstants.X` (lower number = more access). Default-cutoff rows are keyed by search program name + annotation type name + level, not annotation type id.
- Do not use when: you need an access decision ([security_access_control_sessions.md](security_access_control_sessions.md)) or a page's effective cutoffs ([domain_utilities.md](domain_utilities.md)).
- Limits and gotchas: render user-supplied values (colors, web-link URLs) through the standard sanitizing helpers ([security_access_control_sessions.md](security_access_control_sessions.md)). Tags are per project. `UserListForProjectIdSearcher` filters `enabled_app_specific = 1`; user names come from the central user-mgmt service. The default-cutoffs searcher INNER JOINs the string table (a row without its string row is dropped). `StructureFile_Like_PDB_Ids_FROM_AlignmentTable_...` is unused.
- Related / duplicates: none noticed.
- Status: verified

### "Any exists" checks (`LIMIT 1`)
- What it solves: cheap boolean "does any row exist" for a project / scan file / project search.
- Search keywords: exists, any, has at least one, has data, LIMIT 1, show section, is empty
- Location: `J/searchers/Project_Has_AtLeastOne_{DataPage_SavedView_Table_Record, Experiment_NOT_Draft_Record, FeatureDetectionRoot_ProjectMapping_Table_Record, ProjectScanFile_Table_Record, ProjectSearch_Table_Record}_ForProjectId_Searcher`, `Experiments_AnyForProjectId_Searcher`, `ProjectId_HasAtLeastOneActive_ProjectSearchId_Searcher`, `FeatureDetection_Root_Entries_IsAnyExists_For_ProjectScanFileId_Searcher`, `GoldStandard_Root_Mapping_AnyEntriesExist_For_ProjectSearchId_Searcher`, `ProjectSearchId_AnyExists_For_ProjectScanFileId_Searcher`.
- Used by: `ProjectView_HasData_ForEachSectionOf_ProjectPage_RestWebserviceController`, `ProjectView_Controller`, `Project_HasAtLeastOneActive_ProjectSearchId_RestWebserviceController`, `Project_ScanFile_Delete_RestWebserviceController`, `Project_ScanFiles_In_Project_List_RestWebserviceController`.
- How to use / extend: copy a `Project_Has_*` class: `SELECT id ... LIMIT 1`, return `rs.next()`.
- Do not use when: you need rows or a count.
- Limits and gotchas: "active" project search = `status_id = SearchRecordStatus.IMPORT_COMPLETE_VIEW`. `Experiments_AnyForProjectId_Searcher` includes drafts; `Project_Has_AtLeastOne_Experiment_NOT_Draft...` does not.
- Related / duplicates: `ProjectId_HasAtLeastOneActive_ProjectSearchId_Searcher` and `Project_Has_AtLeastOne_ProjectSearch_Table_Record_ForProjectId_Searcher` run the same query.
- Status: verified

### Feature-detection and gold-standard searchers (root mappings, features, paging)
- What it solves: read feature-detection runs / gold-standard files attached to project scan files and feature rows, with paging.
- Search keywords: feature detection, Hardklor, Bullseye, persistent feature, singular feature, MS1 feature, gold standard, paging, offset, id range, columnar result
- Location: `J/searchers/FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher`, `..._For_ProjectSearchId_Searcher`, `FeatureDetection_Root_Entries_For_ProjectScanFileId_Searcher`, `Feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher` (9 users), `FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher`, `FeatureDetection_SingularFeature_Entries_For_FeatureDetectionRootId_Searcher` (by id list or `startId..endId`), `..._SingularFeature_Entries_MinMax_ID__...`, `FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher` (`LIMIT ?, ?`) + `..._RecordCount__...`; gold standard `GoldStandard_Root_Entries_For_ProjectScanFileId_Searcher`, `GoldStandard_Root_Mapping_Entries_For_ProjectSearchId_Searcher`.
- Used by: the feature-detection REST controllers, `FeatureDetectionView_Controller`, `Project_FeatureDetection_Runs_In_Project_List_RestWebserviceController`, `Project_ScanFile_Details_RestWebserviceController`, `GoldStandard_Root_Entries_For_Single_ProjSearchID_RestWebserviceController`.
- How to use / extend: two paging styles to copy — id-range (MIN/MAX id, then `id >= ? AND id <= ?`) and `ORDER BY` PK + `LIMIT offset, count`. Columnar results (parallel `List<>`s) keep memory low for large result sets.
- Do not use when: n/a.
- Limits and gotchas: the mapping searcher reads its max page size from a REST controller constant (layering inversion). `Feature_detection_root_Id_For_..._ProjectSearchId_Searcher` is unused. Gold-standard searchers are near-copies of the feature-detection ones with table names swapped.
- Related / duplicates: same-named non-Spring searcher in `limelight_feature_detection_run_import`.
- Status: verified

### Run-importer pause status searchers (webapp side)
- What it solves: read the requested and current pause state of the run-importer daemon for the admin page.
- Search keywords: pause importer, pause processing, run importer status, admin, maintenance
- Location: `J/searchers/FileImport_Pause_RunImporter_Get_CurrentStatus_Searcher` (`file_import__run_importer__pause_processing_current_status_tbl` -> `FileImport_RunImporter_PauseProcessing_Current_*_Enum`), `FileImport_Pause_RunImporter_Get_RequestedStatus_Searcher`.
- Used by: `AdminManage_RunImporter_Pause_Get_CurrentStatus_RestWebserviceController`, `..._Get_Running_Queued_JobCount_...`, `..._Get_RequestedStatus_...`.
- How to use / extend: reference for webapp-request / daemon-status coordination through DB rows; daemon side in [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md).
- Do not use when: n/a.
- Limits and gotchas: nullable FK columns checked with `rs.wasNull()` before enum mapping.
- Related / duplicates: [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md) pause mechanism.
- Status: verified (webapp side only)

---

## Transactions

### Webapp multi-DAO DB transaction services (`*_UsingDBTransactionService`)
- What it solves: run several DAO writes (parent + children, delete + cleanup, reorder a list) as ONE all-or-nothing MySQL transaction using Spring declarative transactions.
- Search keywords: transaction, @Transactional, rollback, atomic, commit, unit of work, multi-table insert, parent/child insert, Spring DB transaction, UsingDBTransactionService
- Location: limelight_webapp `J/database_update_with_transaction_services` (20 services + `_IF`s). Templates: `SearchDisplayOrder_Update_UsingDBTransactionService` (loop of updates), `SavedView_Insert_UsingDBTransactionService` (parent insert, then children with the parent id). Enabled by `@EnableTransactionManagement` on `LimelightSpringApplicationRoot`. Also `@Transactional(REQUIRED)` multi-DAO methods OUTSIDE this package: `J/experiment/main/Experiment_AddSave_SaveExperimentAndChildrenRecords`, `J/search_data_lookup_parameters_code/main/SearchDataLookupParams_Save` — grep `@Transactional( propagation = Propagation.REQUIRED` to find all.
- Used by (one or two REST controllers each): e.g. `AddNewProjectUsingDBTransactionService` <- `ProjectCreate_RestWebserviceController`; `AddNewUserUsingDBTransactionService` <- `UserCreateAccount_RestWebserviceController`, `Project_InviteUser_NewOrExistingUser_RestWebserviceController`; `Config_UpdateInsert_ConfigEntries_UsingDBTransactionService` <- `WebappConfig_Config_Save_RestWebserviceController`; `ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService`; `Project_Folder_*`; `SearchDisplayOrder_*`; `Search_Tags_Insert_ProjectSearchIdToTagIdMapping_UsingDBTransactionService`; `StructureFile_Like_PDB_File_DTO_AndChildren_Insert_UsingDBTransactionService`; `SubGroups_Update_UserUpdatableData_UsingDBTransactionService`; `ProjectMarkForDeletion_UsingDBTransactionService`; `InviteRecord_Save_UpdatePrevInvites_Service`; `AddOrUpdateProjectAccessExistingUserUsingDBTransactionService` <- `Invite_ProcessCode_Controller`; plus Copy / Delete / URL-shortener entries below.
- How to use / extend: new `@Service` (+ `_IF`) in the package; `@Autowired` DAO `_IF`s; one public method `@Transactional( propagation = Propagation.REQUIRED )`; body `try { ... } catch (RuntimeException e) { log; throw e; } catch (Exception e) { log; throw new RuntimeException(e); }`. Inject the service by `_IF` into the controller. DAO write methods called inside may be `MANDATORY` (throw if no transaction).
- Do not use when: a single-statement write (call the DAO directly; `REQUIRED` DAO methods open their own transaction); non-webapp modules (no Spring — see "Back-end manual JDBC transactions").
- Limits and gotchas: (1) Spring rolls back only on unchecked exceptions by default — never let a checked exception escape. `StructureFile_..._Insert` uses `rollbackFor = Exception.class`; `AddNewUserUsingDBTransactionService.addNewUser` and `AddOrUpdateProjectAccessExistingUserUsingDBTransactionService.updateUserUpdateUserAccessLevel` declare `throws Exception`, but no checked exception can actually escape (the DAO `save` methods declare none; the second method wraps any `Exception` in `RuntimeException`) — when copying them, drop the `throws Exception`. (2) Inside the transaction every statement must go through `getJdbcTemplate()`; `getDBConnection()` opens a separate non-transactional connection. (3) Self-invocation bypasses the proxy — keep the method public, call it from another bean (example of the trap: `FileImportTrackingFileIdCreatorDAO.getNextId()` calls private `@Transactional` methods via `this.`, so those inner annotations have no effect). (4) Several Javadocs say "Transactional is private to support retry if timing issue" on public methods — copy-paste, not a feature.
- Related / duplicates: run_importer / IRS packages with the SAME name `database_update_with_transaction_services` use manual JDBC (not interchangeable).
- Status: verified (re-checked)

### Copy project searches to another project
- What it solves: duplicate `project_search_tbl` rows into another project plus per-projectSearchId child rows (search files, web links, comments), optional tags/categories (matched or created by label in the target), and project scan-file / filename / mapping rows.
- Search keywords: copy search, duplicate project search, clone records to new projectSearchId, copy tags, project scan file mapping, move search
- Location: `J/database_update_with_transaction_services/CopyProjectSearchIdToNewProjectUsingDBTransactionService.copyProjectSearchIdsToNewProjectId( projectSearchIdList, newProjectId, copyAnyAssociatedTags, creatingUserId, Log_DuplicateKeyException )`.
- Used by: `Project_CopyOrMoveProjectSearchIdsToNewProject_RestWebserviceController` (the "move" option has since been removed; leftover "CopyMove" names).
- How to use / extend: when you add a per-projectSearchId or per-project child table, add its copy here (pattern: `xxxDAO.duplicateRecordsForProjectSearchIdWithNewProjectSearchId( old, new )`). Skips a search already active in the target (`ProjectSearchIdAssocSearchIdInProjectIdSearcherIF`).
- Do not use when: copying search data itself — `search_tbl` data is shared, only project-level handles are copied.
- Limits and gotchas: uses `save__NOT_SET_ID` + transaction-aware read-back. Design notes in `limelight_features_docs/project_scan_file_attachment_model_and_search_delete_cleanup.md`.
- Related / duplicates: delete entry (inverse).
- Status: verified

### Delete project searches (with non-cascading cleanup)
- What it solves: hard-delete `project_search_tbl` rows plus rows not removed by FK cascade (saved views for the projectSearchId, experiments containing it) in one transaction.
- Search keywords: delete search, remove project search, cascade, cleanup, saved view delete, experiment delete
- Location: `J/database_update_with_transaction_services/DeleteProjectSearchIds_UsingDBTransactionService` (interface `DeleteProjectSearchId_UsingDBTransactionServiceIF`, singular — hampers grep).
- Used by: `Delete_ProjectSearch_RestWebserviceController`.
- How to use / extend: a new table keyed by projectSearchId WITHOUT `ON DELETE CASCADE` needs its delete here. Caller computes `experimentIds_Containing_ProjectSearchId`.
- Do not use when: deleting a project — that is a soft mark (`ProjectMarkForDeletion_UsingDBTransactionService`); background removal is the cleanup library ([background_processing_queues_maintenance.md](background_processing_queues_maintenance.md)), which also needs new per-search tables added unless FK cascade covers them.
- Limits and gotchas: synchronous hard delete; FK cascades fire inside the request transaction.
- Related / duplicates: DB cleanup library ([background_processing_queues_maintenance.md](background_processing_queues_maintenance.md)).
- Status: verified

### Random-code insert with retry on duplicate key (URL shortener, project-search-id code) and duplicate-key flags
- What it solves: insert a row with a randomly generated unique code and retry with a new code on a unique-key collision; suppress error logging on expected duplicate inserts.
- Search keywords: unique code, random key, short URL, share page, collision, retry on duplicate, DuplicateKeyException, ignore duplicate, insert ignore, log duplicate, SkipLogInsertException
- Location: DAOs `J/dao/UrlShortenerDAO.save( item, LogDuplicateSQLException )`, `J/dao/ProjectSearchIdCodeDAO.save( item, LogDuplicateSQLException )` (each defines its OWN `LogDuplicateSQLException { TRUE, FALSE }` — spot-checked in `ProjectSearchIdCodeDAO`, corrected after re-reading the code); transaction `J/database_update_with_transaction_services/UrlShortener_Insert_UsingDBTransactionService`; retry loops in the share-page insert webservice (`getShortenedKey()`) and `ProjectView_OrFrom_ProjectSearchIds_SearchList_RestWebserviceController` (`RETRY_COUNT_MAX_ON_DUPLICATE_PROJECT_SEARCH_ID_CODE`). Other flag enums: `ProjectScanFileDAO.Log_DuplicateKeyException { YES, NO }` (also `ProjectScanFilename_DAO`, `CopyProjectSearchIdToNewProjectUsingDBTransactionService`), `SkipLogInsertException { YES, NO }` (`FileObjectStorage_MainEntry_DAO_Webapp`, `StructureFile_Like_PDB_File_DAO`, `StructureFile_Like_PDB_File_Alignment_DAO`, and 7 importer DAOs).
- Used by: the two controllers above; `CopyProjectSearchIdToNewProjectUsingDBTransactionService`.
- How to use / extend: retry belongs OUTSIDE the transaction (controller loop, one transaction per attempt); generate a new code each attempt; pass "log" only on the last attempt. Reuse an existing enum rather than adding a sixth. For codes use `GenerateRandomStringForCode` (SecureRandom; [security_access_control_sessions.md](security_access_control_sessions.md)).
- Do not use when: a duplicate is a real error (let `DuplicateKeyException` propagate); an auto-increment id is enough.
- Related / duplicates: five differently named "log/skip on duplicate" enums (plus `Log_Exception_YN` in the back-end schema check); "Insert-with-retry / upsert services" below.
- Status: verified (code read); runtime effect unverified (re-checked)

### Insert-with-retry and insert-else-update services (`SavedView_Insert_Service`, `SetDefaultView_ProjectSearchPages_Insert_Service`)
- What it solves: retry a transactional insert (saved view, up to 5 times on any `RuntimeException`), and upsert by catching `DuplicateKeyException` then updating (default view).
- Search keywords: upsert, insert or update, duplicate key, retry insert, saved view, default view
- Location: `J/services/SavedView_Insert_Service.addDataPageSavedView(...)` (wraps `SavedView_Insert_UsingDBTransactionService`), `J/services/SetDefaultView_ProjectSearchPages_Insert_Service.setDefaultView(dto)`.
- Used by: `Save_View__Insert__RestWebserviceController`; `Set_Default_View__Insert__RestWebserviceController`.
- How to use / extend: upsert = catch `org.springframework.dao.DuplicateKeyException`, then update. Alternative at SQL level: `INSERT ... ON DUPLICATE KEY UPDATE` (`ZzUserDataMirrorDAO`).
- Do not use when: a blanket retry would mask a real error — the saved-view retry catches every `RuntimeException`.
- Limits and gotchas: non-transient failures are repeated 5 times before rethrow. Lookup-params save (`SearchDataLookupParams_MainProcessing`, [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)) uses a similar `DuplicateKeyException` retry (20 tries) with collision-index logic.
- Related / duplicates: random-code entry above.
- Status: verified

### Back-end manual JDBC transactions (importer / run importer / libraries)
- What it solves: atomic multi-statement writes in the non-Spring modules with `setAutoCommit(false)` / `commit()` / `rollback()` on a connection from `ImportRunImporterDBConnectionFactory`.
- Search keywords: manual transaction, setAutoCommit false, commit, rollback, SELECT FOR UPDATE, claim job, JDBC batch, addBatch, executeBatch
- Location: `limelight_run_importer` `database_update_with_transaction_services/GetNextTrackingToProcessDBTransaction` and `GetNext_ImportAndPipelineRunTracking_ToProcessDBTransaction` (claim next queue row with `SELECT ... FOR UPDATE`, mark STARTED, insert run row); `IRS/.../database_update_with_transaction_services/UpdateTrackingTrackingRunRecordsDBTransaction`, `Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction` (tracking status + run result in one commit); importer insert-control-commit connection (see importer entries); populate library `Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO.update_Protein_PrePost_Residue_For_Id` (JDBC batch update, 10000 per call).
- Used by: run importer worker threads; importer end-of-run status; populate-new-fields protein-coverage backfill.
- How to use / extend: copy the run-importer claim transaction for "atomically take one row"; pass a caller-owned `Connection` to IRS write DAOs when several must commit together. Queue specifics: [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md).
- Do not use when: in the webapp (use Spring transaction services).
- Limits and gotchas: the package name `database_update_with_transaction_services` is reused for this unrelated mechanism. Do NOT copy `ProteinCoverageTbl_Update_DAO`'s rollback loop: on exception it retries `rollback()` in `while(true)` with no `break` after a SUCCESSFUL rollback (exits only after 7 failed rollbacks) — seen in code, not runtime-tested.
- Related / duplicates: webapp transaction services.
- Status: verified (claim transaction and populate DAO read; IRS transaction classes read)

---

## ID allocation

### Insert-id side tables: single id per call (`*__insert_id_tbl`, `*_id_creator_tbl`)
- What it solves: get a new primary-key id from a separate one-column AUTO_INCREMENT "sequence" table before inserting the main row (so the id is known first, e.g. to name directories, or because webapp and importer both allocate ids for the same table).
- Search keywords: ID creation, id generator, next id, sequence table, insert id table, id creator, auto increment substitute, primary key allocation
- Location: webapp `J/dao/ProjectDAO.save` (MANDATORY; private `save_InsertGetInsertId` inserts `() VALUES ()` into `project__insert_id_tbl`, reads the generated key, `deleteLessThanId` deletes older rows, then `save_MainInsert`), `J/dao/ProjectSearchDAO.save` (`project_search__insert_id_tbl`), `J/file_import_limelight_xml_scans/dao/FileImportTrackingFileIdCreatorDAO.getNextId()` (`file_import_tracking_id_creator_tbl`), `J/file_import_pipeline_run/dao/FileImportAndPipelineRunTrackingIdCreatorDAO` (`import_and_pipeline_run_tkg_id_creator_tbl`); importer `IMP/dao/SearchDAO`, `ProjectSearchDAO`, `AnnotationTypeDAO`, `SearchProgramsPerSearchDAO`; feature-detection `dao/SearchDAO`. Tables in `database_scripts/install/001_create_empty_database.sql` (comment "Get next id value for insert table project_tbl").
- Used by: `AddNewProjectUsingDBTransactionService` (ProjectDAO), `CopyProjectSearchIdToNewProjectUsingDBTransactionService` (ProjectSearchDAO), `Project_UploadData_V1_UploadInitialize_RestWebserviceController` and feature-detection / gold-standard initialize/submit controllers (id creators), the importer per search.
- How to use / extend: add `<table>__insert_id_tbl` (`id ... AUTO_INCREMENT PRIMARY KEY`) to install 001 (via the Workbench model) and the upgrade script, and copy the `save_InsertGetInsertId` + `deleteLessThanId` pair (or a whole id-creator DAO). Seed a new side table above the main table's current max id (upgrade 6 shows how) or ids collide.
- Do not use when: the main table's own AUTO_INCREMENT + `GeneratedKeyHolder` is enough (most webapp tables).
- Limits and gotchas: must run inside a transaction (`ProjectDAO` enforces MANDATORY). `file_import_tracking_tbl.id` is declared `AUTO_INCREMENT` in install 001, but the webapp `FileImportTrackingDAO` always inserts an explicit id from `FileImportTrackingFileIdCreatorDAO` (its comment "since not autoincrement" is stale) — always take the id from the creator. The rationale for side tables is not documented in code (inference: ids not reused after deletes; shared allocation across modules — unverified). `import_and_pipeline_run_tkg_run_id_creator_tbl` (install 001, upgrade 4) has no Java user in any module (repo-wide grep). The two webapp id-creator DAOs are copies; `FileImportTrackingFileIdCreatorDAO` self-invokes `@Transactional` private methods (inner annotations ineffective; the outer `REQUIRED` applies).
- Related / duplicates: block-reservation variant (next entry). No shared helper for either.
- Status: verified (rationale unverified) (re-checked)

### Insert-id side tables: block reservation with compare-and-swap (importer)
- What it solves: lets the importer assign primary keys in Java before multi-row INSERTs, so parent and child rows can reference ids without per-row generated-key round trips, safely across concurrent importers.
- Search keywords: reserve id range, block of ids, id allocation, compare and swap, getNextBatch_IDs, get_NextId, high-water mark, psm id range
- Location: limelight_importer `IMP/dao_db_insert`: `DB_Insert_Psm_InsertId_DAO` (`initialize_Pass_PsmCount(count, search)` reserves the whole search's PSM range and records it via `IMP/dao/SearchPsmIdRangeDAO` in `search_psm_id_range_tbl`; `get_NextId()`), per-batch `getNextBatch_IDs(batchSize)` -> `..._BatchIds_Start_End` in `DB_Insert_PsmDescriptiveAnnotation_InsertId_DAO`, `DB_Insert_PsmOpenModification_InsertId_DAO`, `DB_Insert_PsmOpenModificationPosition_InsertId_DAO`, `DB_Insert_PsmOpenModificationPosition_DescriptiveAnnotation_InsertId_DAO`, `DB_Insert_PsmModificationPosition_DescriptiveAnnotation_InsertId_DAO`, `DB_Insert_Search_Protein_DescriptiveAnnotation_InsertId_DAO`, `DB_Insert_SearchReportedPeptideDescriptiveAnnotation_InsertId_DAO`; feature-detection `FeatureDetectionPersistentFeatureEntry_InsertId_DAO`, `FeatureDetectionSingularFeatureEntry_DAO`.
- Used by: `IMP/process_input/Initialize_DB_Insert_PsmDAO_With_PSM_Count`, `IMP/process_input/PopulatePsmDTO`, the `*_AndChildren_BatchInserter_DAO._saveBatch()` methods.
- How to use / extend: algorithm = SELECT max id; if none, INSERT 0 (ignore dup) and re-read; `UPDATE t SET id = last+N WHERE id = last`; rowcount > 0 means you own `last+1..last+N`; else sleep about 1 s and retry (max 10). New one: copy a `*_InsertId_DAO` and add a single-column `*__insert_id_tbl`.
- Do not use when: low-volume single-row inserts (generated keys are fine).
- Limits and gotchas: uses the auto-commit `getConnection()`, not the insert-control-commit connection, so reservations commit immediately — ids are burned on import failure (gaps expected). Seven near-identical copies plus feature-detection copies.
- Related / duplicates: single-id variant above.
- Status: verified (two of seven read in full; others by table-name grep)

---

## Importer write path

### Importer batch-inserter singletons + "last batch flushed" registry
- What it solves: accumulate many child rows during the streaming XML import, write them in fixed-size multi-row INSERTs, and guarantee at end of import that every batcher was flushed (no silently dropped tail batch).
- Search keywords: batch insert, bulk insert, flush, buffer rows, insert_LAST_Batch_ToDB, insert_Batching_Object, registry, validate flush, BatchInserter
- Location: limelight_importer, `IMP/dao_batch_insert_registry/DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry` (`register`, `validateAllCalled_InsertLastBatch_ToDB`), `..._RegistryEntry_IF` (`has_InsertLastBatch_ToDB_HasBeenCalled`); every `IMP/dao_db_insert/DB_Insert_*_BatchInserter_DAO.java` (template `DB_Insert_PsmFilterableAnnotation_BatchInserter_DAO`).
- Used by: `IMP/process_input/ProcessReportedPeptidesAndPSMs` (about 11 batchers), `Process_PeptidesToProteinsMapping_ProteinInference_InsertProteins`, `ProcessSave_SingleReportedPeptide`, `ProcessPSMsForReportedPeptide`, `SaveSearchReportedPeptideAnnotations`; `IMP/importer_core_entry_point/ImporterCoreEntryPoint` (validates after the final commit).
- How to use / extend: private ctor calling `Registry.getSingletonInstance().register(this)`, static singleton, `List<DTO>` buffer, `insert_Batching_Object(dto)` (saves at `INSERT_BATCH_SIZE`), `insert_LAST_Batch_ToDB()` (sets flag, saves remainder), `_saveBatch()` delegating to the table's multi-row insert DAO. Call `insert_LAST_Batch_ToDB()` at the end of the feeding phase.
- Do not use when: outside the importer process (static per-import state, never reset); when you need generated ids back.
- Limits and gotchas: registration at class load, so only touched batchers are validated. Calling `insert_Batching_Object` after the last-batch call throws. Batch sizes: 26 at 4000, 6 at 5000, 1 at 2000 (PSM and-children). The registry's own `INSERT_BATCH_SIZE = 4000` is unused. Assumes one import per JVM, which holds: the run importer launches the importer as a separate `java -jar` child process per import (`limelight_run_importer` `ProcessSubmittedImport` via `RunSystemCommand` / `ProcessBuilder`).
- Related / duplicates: feature-detection importer's `FeatureDetectionPersistentFeatureEntry_AndChildren_BatchInserter_DAO` and other batchers have NO registry (final-batch check missing). about 30 near-identical batcher classes; no base class.
- Status: verified (re-checked)

### "AndChildren" hierarchical batch inserter (parent first, then children)
- What it solves: batch-insert a parent row with its child rows in FK-safe order; flushing the parent cascades `insert_LAST_Batch_ToDB()` to all child batchers.
- Search keywords: parent child insert, nested batch, save holder, AndChildren, cascade flush
- Location: `IMP/dao_db_insert/DB_Insert_Psm_AndChildren_BatchInserter_DAO` (holder `..._SaveHolder_AndChildren`), `DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO`, `DB_Insert_PsmOpenModificationPosition_AndChildren_BatchInserter_DAO`, the `*DescriptiveAnnotation_AndChildren_BatchInserter_DAO`s (children = large-value rows).
- Used by: `ProcessPSMsForReportedPeptide`, `ProcessReportedPeptidesAndPSMs`, `Process_PeptidesToProteinsMapping_ProteinInference_InsertProteins`.
- How to use / extend: build a `SaveHolder_AndChildren` with the parent DTO (id pre-assigned) and child lists; call `insert_Batching_ObjectAndChildren`. New child table = list in the holder + loop in `_saveBatch` + cascaded final flush.
- Do not use when: the parent id must come from AUTO_INCREMENT.
- Limits and gotchas: works only because parent ids are pre-allocated (block reservation). Child rows may still sit in buffers after the parent batch is written; correctness relies on the cascaded final flush.
- Related / duplicates: feature-detection copy.
- Status: verified

### Multi-row INSERT DAOs on the insert-control-commit connection
- What it solves: one `INSERT ... VALUES (?,?),(?,?)...` per batch on the importer's long-lived manually committed connection.
- Search keywords: multi-row insert, bulk insert SQL, values list, insert DAO, importer DAO, insertControlCommit, insert_NOT_Update_ID_Property_InDTOParams
- Location: `IMP/dao_db_insert/DB_Insert_*DAO.java`, `DB_Insert_*_InsertOnly_DAO.java` (template `DB_Insert_PsmFilterableAnnotationDAO`; PSMs `DB_Insert_PsmDAO`). Connection `ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getInsertControlCommitConnection()`; phase commits `commitInsertControlCommitConnection()`.
- Used by: batch-inserter `_saveBatch()` methods; `peptide_protein_position/ProteinCoverageDTO_SaveToDB_NoDups`; `process_input/SaveSearchReportedPeptideAnnotations`; `ProcessReportedPeptidesAndPSMs` (commits).
- How to use / extend: static `INSERT_SQL` prefix + per-row `(?,...)`, build SQL for N rows, bind in row order, `executeUpdate()`. Do NOT close the insert-control-commit connection.
- Do not use when: outside the importer; when you need ids back.
- Limits and gotchas: (1) the five filterable-annotation insert DAOs (PSM, PSM peptide-position, PSM mod-position, reported peptide, protein) also feed `AnnotationData_MinMax_AccumulationComputation_SingletonInstance` — bypassing them skips search-level min/max accumulation. (2) Filterable `value_string` longer than `AnnotationValueStringLocalFieldLengthConstants` throws. (3) 32 DAOs keep a per-instance SQL-string `ConcurrentMap` cache but `getInstance()` returns `new`, so the cache never hits (from grep; harmless but misleading). (4) Rows invisible to other connections until the next commit. (5) Some small DAOs (`DB_Insert_SearchIsotopeLabelDAO`, `DB_Insert_SearchDynamicModMassDAO`) use auto-commit `getConnection()` instead — mixed transaction scope inside one import.
- Related / duplicates: about 40 near-identical multi-row insert DAOs; no base class.
- Status: verified

### Descriptive-annotation "large value" split
- What it solves: stores long descriptive annotation strings in a side `*_large_value` table; the main row stores "" and a location flag (`AnnotationValueLocation.LOCAL` / `LARGE_VALUE_TABLE`).
- Search keywords: large value, long string, annotation overflow, value_location, LargeValue
- Location: `IMP/dao_db_insert/DB_Insert_*DescriptiveAnnotation_InsertOnly_DAO` (decides + enqueues), `DB_Insert_*DescriptiveAnnotationLargeValue_BatchInserter_DAO`, `..._InsertOnly_DAO` (PSM, PSM mod-position, PSM open-mod-position, reported peptide, protein). Threshold `SC/constants/AnnotationValueStringLocalFieldLengthConstants` (50).
- Used by: the `*DescriptiveAnnotation_AndChildren_BatchInserter_DAO`s; read side e.g. webapp `PsmDescriptiveAnnotationDAO`.
- How to use / extend: readers MUST honor the location flag.
- Do not use when: filterable annotations (they throw instead of overflowing).
- Limits and gotchas: threshold shared with the filterable check.
- Related / duplicates: none seen.
- Status: verified (PSM variant read; others by name)

### Single-record importer insert DAO with generated keys
- What it solves: low-volume per-search config rows (search file, scan file, static mod, dynamic mod per reported peptide...) inserted one at a time with `RETURN_GENERATED_KEYS`.
- Search keywords: insert get id, generated key, saveToDatabase, single row insert
- Location: `IMP/dao_db_insert/DB_Insert_SearchScanFileDAO` (template), `DB_Insert_SearchFileDAO`, `DB_Insert_SearchFileProjectSearchDAO`, `DB_Insert_SearchScanFileImporterDAO`, `DB_Insert_StaticModDAO`, `DB_Insert_SrchRepPeptDynamicModDAO`.
- Used by: `process_input/CreateSaveSearchScanFileEntries`, `ProcessStaticModifications`, `ProcessConfigurationFiles`, `scan_file_processing_validating/ScanFiles_SendToSpectralStorageService`.
- How to use / extend: `saveToDatabase(dto)` on the insert-control-commit connection (or a passed connection).
- Do not use when: high volume (use batchers).
- Limits and gotchas: see mixed-connection note above.
- Related / duplicates: `IMP/dao` read/update DAOs.
- Status: verified (template read; others by grep)

### Auto-commit bulk insert of reported-peptide lookup tables (with import heartbeat)
- What it solves: after reported peptides are processed, insert reported-peptide lookup and best-PSM-value lookup rows in blocks of 2000 on auto-commit connections, periodically touching the "import in progress" row so long imports are not treated as stalled.
- Search keywords: lookup table insert, best psm value, heartbeat, in progress tracking, AUTOCOMMIT_AfterInsert, derived rows
- Location: `IMP/batch_insert_db_records/SearchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records` (`initialize`, `add_SearchReportedPeptideLevelLookupRecords_Create_Result`, `insert_All_Records_Into_Database`); DAOs `DB_Insert_Search_ReportedPeptide__Lookup__DAO`, `DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO` (`saveToDatabase_AUTOCOMMIT_AfterInsert__NotUse_InsertControlCommitConnection`); heartbeat `IRS` `Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.saveOrUpdate_ForSearchId`.
- Used by: `ProcessReportedPeptidesAndPSMs`, `lookup_records_create_update/LookupRecordsCreate_Main`.
- How to use / extend: reference for "commit the main connection, then bulk-load derived rows in auto-commit blocks with progress pings".
- Do not use when: rows must be atomic with the main import data.
- Limits and gotchas: first commits the insert-control-commit connection; holds all results in memory until the end; heartbeat cadence differs between its two loops. Nothing in Java reads the heartbeat table for decisions ([background_processing_queues_maintenance.md](background_processing_queues_maintenance.md)).
- Related / duplicates: none.
- Status: verified

### Importer read/update DAO pattern (`IMP/dao`) incl. get-or-insert of shared rows
- What it solves: simple, non-batched reads, inserts and updates in the importer (search, project_search, scan files, peptide, reported peptide, protein sequence/version/annotation, annotation types, tags, sub-groups, psm id range, stats, tracking updates, FOS rows).
- Search keywords: importer DAO, JDBC, saveToDatabase, getInstance, get or insert, insert if not exists, updateStatus, last_used_in_search_import, race repair
- Location: `IMP/dao/*.java` (about 41). Template `FileObjectStorage_MainEntry_DAO_Importer` (get-by-id, id-by-natural-key, insert returning key, optional `Connection` overload). Get-or-insert with race repair: `PeptideDAO_Importer.getPeptideDTO_OrSave` + private `fixTableIfSavedEntryNotFirstEntry` (same in `ReportedPeptideDAO_Importer`); `ProteinSequenceDAO.getProteinSequenceDTO_InsertIfNotInDB`, `ProteinSequenceVersionDAO`, `ProteinSequenceAnnotationDAO.getAnnotationId_InsertIfNotInDB`. Status: `SearchDAO.updateStatus`, `ProjectSearchDAO.updateStatus`. Project state: `IMP/searcher/ProjectStateSearcher.getProjectState(int)` (locked / enabled / marked_for_deletion) used by `IMP/project_importable_validation/IsImportingAllowForProject`. Stats: `Importer_Stats_PerTable_DAO`, `Importer_Stats_GeneralData_DAO` (labels in `Importer_Stats_GeneralData_Table__Label_Values_Enum`; static timing counters + `logTotalElapsedTimeAndCallCounts_SaveToImporterStatsTable` in some insert DAOs).
- Used by: throughout the importer (`ImporterCoreEntryPoint`, `ProcessLimelightInput`, `Process_FileObjectStorage_Files_SaveAndAddToDB`, `ProcessFileImportSubmission`).
- How to use / extend: `XxxDAO.getInstance()` (returns a NEW instance; not Spring); each method opens `ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection()` (auto-commit) in try-with-resources; most have a `Connection` overload. Find one by table name in its Javadoc.
- Do not use when: large volumes (batch inserters); webapp code.
- Limits and gotchas: these DAOs commit immediately, unlike the batch inserters — partial data exists on failure (search left `IMPORT_FAIL` for cleanup). Any new get-or-insert of rows shared across searches MUST update `last_used_in_search_import` (as peptide / reported peptide / protein DAOs do), or the nightly "remove unused shared data" cleanup may delete rows an in-progress import is about to reference. `FileObjectStorage_MainEntry_DAO_Importer.getForId` runs its query twice (harmless). Some `logTotalElapsedTime...` implementations are stubs (e.g. `DB_Insert_PsmFilterableAnnotationDAO`); which ones record is unverified. `Importer_Stats_GeneralData_DAO` error text names the wrong table.
- Related / duplicates: feature-detection importer copies (`SearchDAO`, `SearchScanFileDAO`, `SearchScanFileImporterDAO`, `ScanFileDAO_Partial`, `ProjectStateSearcher`, `IsImportingAllowForProject`); webapp same-named DAOs.
- Status: verified (pattern read in 2 DAOs; others by signatures/SQL); stats stub coverage unverified

---

## DTOs, enums, constants

### Shared DB table DTOs (`SC/dto`)
- What it solves: one canonical bean per DB table (or lookup table) shared by every module, so the importer writes and the webapp reads the same shape.
- Search keywords: DTO, data transfer object, table bean, row object, POJO, entity, model, record class, `_tbl`
- Location: `SC/dto` (97 classes; 93 name a `_tbl` in Javadoc), e.g. `PsmDTO`, `ReportedPeptideDTO`, `SearchScanFileDTO`, `Project_ScanFile_DTO`, `AnnotationTypeDTO`, `Search_ReportedPeptide__Lookup__DTO`, `FileObjectStorage_MainEntry_DTO`, `StructureFile_Like_PDB_File_DTO`, `SearchFlagsMainDTO`. Annotation hierarchy `AnnotationDataBaseDTO` -> `AnnotationDataFilterableBaseDTO` / `AnnotationDataDescriptiveBaseDTO` -> per-level classes + `*_LargeValue_DTO` siblings. Queue DTOs are in `SC/file_import_limelight_xml_scans/dto`, `SC/file_import_pipeline_run/dto`.
- Used by: `limelight_importer` (most, via `DB_Insert_*`), `limelight_webapp` (e.g. `Project_ScanFile_DTO` in 37 files, `AnnotationTypeDTO` 16), `limelight_feature_detection_run_import` (`FeatureDetection*`), populate-new-fields (`SearchLevel_Annotation_MinMax_DTO`).
- How to use / extend: find by `grep -l "<table>_tbl" SC/dto`. New table used by 2+ modules -> DTO here; DTOs contain no SQL (mapping is in each module's DAO).
- Do not use when: the table is webapp-only (`J/db_dto`) or an importer-only partial shape (`IMP/dto`).
- Limits and gotchas: `search_tbl` and `project_search_tbl` DTOs are NOT here (per module). `searchId` fields hold `search_tbl.id`. Mutable beans, no validation. `SrchRepPeptOpenModPsmUniquePositionsDTO` (unused) and `Search_ReportedPeptide_OpenMod_PsmUniquePositions_DTO` (used) map the same table; `StructureFile_Like_PDB_File_FileTypeLookup_DTO` unused. `*Importer_DTO` siblings (`Project_ScanFile_Importer_DTO`, `SearchScanFileImporterDTO`) are separate tables, not duplicates.
- Related / duplicates: webapp `db_dto`; importer `dto`.
- Status: verified (pattern + users; most field lists not read)

### Webapp table DTOs (`J/db_dto`)
- What it solves: beans for webapp-owned tables (project, project_search, user, project_user, invite, folder, saved/default view, URL shortener, search data lookup params, project-level default cutoffs, config_system, notes, terms of service, experiment).
- Search keywords: DTO, ProjectDTO, ProjectSearchDTO, UserDTO, webapp entity, row object
- Location: `J/db_dto` (28 classes); paired DAO in `J/dao`.
- Used by: 164 webapp files; most used `ProjectDTO` (45), `ProjectUserDTO` (21), `UserDTO` / `UserInviteTrackingDTO` (19), `SearchDataLookupParametersLookupDTO` (18).
- How to use / extend: only for webapp-only tables; shared tables go in `SC/dto`.
- Do not use when: the table is also written by the importer.
- Limits and gotchas: `DataPageDefaultViewExperimentPagesDTO` has no users or DAO (table exists in install — dead/unfinished). `ProjectSearchDTO` exists three times (webapp, `IMP/dto`, feature-detection `dto`) with different fields.
- Related / duplicates: shared and importer DTOs.
- Status: verified (bodies skimmed)

### Importer / feature-detection local DTOs (`IMP/dto`)
- What it solves: importer-only partial shapes: `SearchDTO_Importer` ("search_tbl for Importer, not all fields"), `ProjectSearchDTO`, `ProteinSequenceDTO`, `ProteinSequenceVersionDTO`, `ProteinSequenceAnnotationDTO`, `SearchProteinSequenceVersionAnnotationDTO`, `SearchReportedPeptideProteinVersionDTO`, `Importer_Stats_*_DTO`.
- Search keywords: importer DTO, search DTO, project search DTO, protein sequence DTO
- Location: `IMP/dto/`; feature-detection has same-named copies.
- Used by: matching `IMP/dao` classes and `process_input` code.
- How to use / extend: prefer a shared `SC/dto` class when one exists.
- Do not use when: outside the importer.
- Limits and gotchas: same names, different fields across modules.
- Related / duplicates: see above.
- Status: verified (names/Javadoc; fields skimmed)

### Lorikeet spectrum-viewer response DTOs (`J/dto_lorikeet`)
- What it solves: server-side JSON shape for the Lorikeet spectrum viewer (peaks `[mz, intensity]`, filename, scan number, static mods, 1-based variable mods, precursor m/z + RT).
- Search keywords: Lorikeet, spectrum viewer, MS2 peaks, annotated spectrum, scan data JSON, static mod, variable mod
- Location: `J/dto_lorikeet`: `LorikeetGetSpectrumServiceResult`, `LorikeetRootData`, `Lorikeet_ScanData_RetentionTime_PrecursorMZ`, `LorikeetStaticMod`, `LorikeetVariableMod`, `LorikeetOpenMod`.
- Used by: `Spectrum_For_Lorikeet_For_PSM_Id_RestWebserviceController`, `PSM_Peptide_List_Display_With_SpectrumViewer_RestWebserviceController`; TS mirrors `lorikeetSpectrumViewer_DataFromServer_Spectrum_Data.ts`, `lorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data.ts`.
- How to use / extend: add a field to both the Java DTO and the hand-written TS mirror.
- Do not use when: non-Lorikeet scan views.
- Limits and gotchas: `LorikeetOpenMod` (+ position) has no Java or TS users — open mods are not sent through it. Masses passed through, not computed.
- Related / duplicates: TS mirrors.
- Status: verified

### Enum-with-stored-value pattern + lookup tables
- What it solves: map a DB/JSON code (int or string) to a typed Java enum and back, failing loudly on unknown codes; small lookup tables FK-constrain the int columns and carry readable labels.
- Search keywords: enum, status code, lookup value, fromValue, type id, record status, filter direction, above/below, lookup table, enum table, seed rows, reference data
- Location: `SC/enum_classes`: `SearchRecordStatus` (IMPORTING=1 ... IMPORT_COMPLETE_VIEW=3, IMPORT_FAIL=4, MARKED_FOR_DELETION=6, DELETION_IN_PROGRESS=7), `FilterDirectionTypeJavaCodeEnum` ("above"/"below"), `FilterableDescriptiveAnnotationType`, `PsmPeptideMatchedProteinAnnotationType` (psm, peptide, matched_protein, modification_position, psm_peptide_position), `AnnotationValueLocation`, `FileObjectStore_FileType_Enum` (1 unknown, 2 FASTA, 3 generic other, 4 scan, 5 structure file), `StructureFile_Like_PDB_File_FileType_Enum`, `SearchDataLookupParametersLookupRootIdTypes`, `SearchDataLookupParametersLookup_CreatedByUserType`, `Experiment_CreatedByUserType`, `Yes_No__NOT_APPLICABLE_Enum`. Queue enums (`FileImportStatus` etc.) in `SC/file_import_*/enum_classes`. Lookup rows in `database_scripts/install/003_insert_initial_data.sql` (each block commented with the Java class it must match), e.g. `search_record_status_lookup_tbl`, `user_access_level_label_description_tbl` (`AuthAccessLevelConstants`), `file_import_tracking_*_lookup_tbl`, `structure_file_like_pdb_file_type_lookup_tbl`, `isotope_label_tbl` (id 1 = `IsotopeLabelsConstants.ID_NONE`).
- Used by: `SearchRecordStatus` — importer `ImporterCoreEntryPoint`, webapp `SearchListForProjectIdSearcher`, DB cleanup; `FilterDirectionTypeJavaCodeEnum` — cutoff searchers, importer, populate; `FileObjectStore_FileType_Enum` — importer `Process_FileObjectStorage_Files_SaveAndAddToDB`, webapp `StructureFile_Contents_UploadData_RestWebserviceController`; `FileImportStatus` about 58 users.
- How to use / extend: read column -> `X.fromValue(code)`; write `x.value()`. New enum: private final value, `value()`, static `fromValue` throwing `IllegalArgumentException`. New value = Java enum + row in install 003 + row in the version's upgrade script. For a lookup row that may already exist, use upgrade 8's idiom: a `fake_on_update_field_when_already_exists` column with `INSERT ... ON DUPLICATE KEY UPDATE fake_on_update_field_when_already_exists = 1` (script comment: better than `INSERT IGNORE`, which also ignores FK errors). Same idea named `dummy_on_duplicate_update` in backfill tracking tables.
- Do not use when: values are user-defined / open-ended; the code set is module-local.
- Limits and gotchas: nothing enforces enum vs table agreement (mismatch surfaces as FK failures or unknown-value exceptions). `FileObjectStore_FileType_Enum.fileObjectStore_FileType_GetDescriptionString_ForEnumValue` THROWS for `STRUCTURE_FILE_LIKE_PDB_TYPE` (current caller never passes it). Several `fromValue` error messages name the wrong enum (copy-paste). `Experiment_CreatedByUserType` and `SearchDataLookupParametersLookup_CreatedByUserType` are identical. `file_object_storage_main_entry_file_type_lookup_tbl` is NOT seeded by install (importer inserts 1-4 lazily) and its unique index on `description` is misnamed `file_object_storage_api_key_UNIQUE`. Front-end TS copies of some values exist (not enumerated).
- Related / duplicates: see "Install vs upgrade drift" in Open questions.
- Status: verified (not every enum vs row compared)

### Database boolean constants (`Database_OneTrueZeroFalse_Constants`)
- What it solves: named `DATABASE_FIELD_TRUE = 1` / `DATABASE_FIELD_FALSE = 0` for TINYINT flag columns.
- Search keywords: boolean column, tinyint flag, true false DB, 1 0
- Location: `SC/constants/Database_OneTrueZeroFalse_Constants`.
- Used by: webapp (58 files, e.g. `UserDAO`, `SearchMinimalForProjectSearchIdSearcher`), importer (15, e.g. `ProjectStateSearcher`), DB cleanup (9), feature detection (8), run importer, populate.
- How to use / extend: in SQL building and `rs.getInt(...) == DATABASE_FIELD_TRUE`.
- Do not use when: n/a.
- Limits and gotchas: none.
- Related / duplicates: none.
- Status: verified

### Other shared constants (`SC/constants`)
- What it solves: small values that must agree across modules.
- Search keywords: constants, max length, field length, SQL comparison operator, S3 part size, env var name, scan file suffix, reporter ion rounding, polling interval
- Location: `SC/constants`: `SearcherGeneralConstants` (`" >= "` / `" <= "` SQL ends for bigger/smaller-is-better cutoffs), `AnnotationValueStringLocalFieldLengthConstants` (50), `FieldLengthConstants__LimelightSharedCode` (tag / category max 20; front-end sync by comment with `SearchTag_Max_FieldLengths_Constants`), `Limelight__AWS_S3_Constants`, `EnvironmentVariable_Keys_Constants` (upload S3 bucket/region env var names), `Limelight__RunImporter_TimeUntilNext_X_Constants`, `ReporterIon_Constants`, `ScanFilenameConstants` (`.mzML`, `.mzXML`), `IsotopeLabelsConstants`, `Limelight__Protein_PrePostResidue_Contants` ("n"/"c"), `ProjectSearch_TagCategoryInProject_UncategorizedFakeLabel_Values_Constants`, `FeatureDetectionProgramName_Values_Constants`, `FeatureDetectionTypeLabel_Values_Constants`.
- Used by: webapp cutoff searchers (`SearcherGeneralConstants`), importer annotation insert DAOs, webapp upload controllers (S3), run importer `ManagerThread`, importer validators.
- How to use / extend: add a constant here only when two or more modules need it.
- Do not use when: one module only (module-local `constants` packages exist).
- Limits and gotchas: unused: `FeatureDetection_DisplayLabel_Additions_Values_Constants` (same value as `FeatureDetectionTypeLabel_Values_Constants`), `UnifiedReportedPeptideConstants`. `FeatureDetectionProgramName_Values_Constants` also exists in the feature-detection module (Hardklor import uses the local copy, Bullseye the shared one). `ScanFilenameConstants` also in `limelight_submit_import` (probably deliberate: Java 8 module).
- Related / duplicates: noted inline.
- Status: verified

### Versioned JSON blob columns / side tables
- What it solves: store structured, evolving data as JSON text with an explicit format version so readers can switch on version and fail loudly on unknown versions.
- Search keywords: JSON column, JSON blob, serialized data, format version, version_number_main_json, json_contents_format_version, V001, stored request data, schema-less data
- Location: schema shapes in install 001 — (a) 1:1 side table `(owner_id PK/FK, json_contents_format_version, json_contents LONGTEXT)`: `file_import_tracking_data_json_blob_tbl`, `file_import_tracking_data_from_init_json_blob_tbl`, `file_import_tracking_single_file_init_json_blob_tbl`, plus unused ones (below); (b) inline columns: `search_data_lookup_parameters` (`lookup_parameters_json__main_data` + `version_number_main_json`), `experiment_tbl`, `import_and_pipeline_run_tracking_tbl` (request data + format/content version numbers). Java: `SC/file_import_limelight_xml_scans/dto/FileImportTrackingDataJSONBlob_DTO` + `FileImportTrackingDataJSON_Contents_Version_Number_001`, reader `SC/file_import_limelight_xml_scans/utils/Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util` (switch on version, else `LimelightShardCodeDatabaseContentErrorException`); `FeatureDetection_HardklorBullseye_{Import,Run}_RequestData_V001`; `RunImporter_Schedule_PauseImporter_JSON_Root__V001`; `GoldStandard_Data_Root_Data_JSON_V001`; unversioned example `SC/dto_json_blobs_in_db/StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT` (short keys `lid`, `lbl`, `aal`). Webapp DAOs `FileImportTrackingDataJSONBlob_DAO`, `FileImportTrackingDataFromInitJSONBlob_DAO`, `FileImportTrackingDataSingleFileInitJSONBlob_DAO`. Shared-code JSON parsing goes through `SC/json_marshal_unmarshal_interfaces/Limelight_SharedCode__JSON_UnMarshal_CommonInterface` (implemented by each module's `UnmarshalJSON_ToObject`).
- Used by: importer `ProcessFileImportSubmission`; webapp upload controllers, `Project_UploadData_ListSubmittedItems_RestWebserviceController`, pause-schedule admin, `StructureFile_Contents_UploadData_RestWebserviceController` + `StructureFile_Like_PDB_File_DTO_AndChildren_Insert_UsingDBTransactionService`; feature-detection `Import_CoreEntryPoint`, `Run_And_Import_CoreEntryPoint`.
- How to use / extend: name the class `..._V00N` with `VERSION_NUMBER` (or a required sentinel field), store the version in its own column, read through a util that switches on it, pass the unmarshaller via the shared interface. Use a side table when the blob is large/optional, inline when always read with the row. Short JSON keys keep blobs small.
- Do not use when: you need to filter / join / index on the values (use real columns).
- Limits and gotchas: applied ad hoc — V2 upload controllers check the version inline (a new version must be added in several places); the pause-schedule reader hard-codes Jackson `ObjectMapper`. Version column types differ (SMALLINT vs INT; LONGTEXT vs MEDIUMTEXT). No Java users: `file_import_tracking_single_file_complete_json_blob_tbl`, `import_and_pipeline_run_trckg_snglfl_init_json_blb_tbl`, `import_and_pipeline_run_trckg_snglfl_complt_json_blb_tbl`, and the `project_level_default_fltr_ann_cutoffs__store_as_json__tbl` / `__prev__tbl` pair (only the cleanup deleter references them). The structure-file blob has no version field.
- Related / duplicates: experiment JSON and search-data-lookup JSON use the same idea with separate code ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) / [domain_utilities.md](domain_utilities.md)).
- Status: verified

### System config table (`config_system_tbl`) read / write
- What it solves: admin-editable runtime configuration (service URLs, email, paths, feature switches) stored as key/value rows.
- Search keywords: config, system config, settings, key value, config_key, config_value, admin config, configSystemValues, JSP config
- Location: table `config_system_tbl (id, config_key VARCHAR(255) UNIQUE, config_value VARCHAR(4000), comment)`; seeds in install 003 and (Docker-only defaults) `install/090_docker_compose.sql`. Webapp: `J/dao/ConfigSystemDAO` / `ConfigSystem_Update_DAO`, write service `Config_UpdateInsert_ConfigEntries_UsingDBTransactionService.updateValueOnlyOnConfigKey( List<ConfigSystemDTO> )`, JSP bean `J/config_system_table/AppContextConfigSystemValuesRetrieval` (servlet-context attribute `configSystemValues`, set by `AllControllers_SpringHandlerInterceptor`). Back end: `ConfigSystemDAO_Importer` (IRS); shared `ConfigSystemTableGetValueCommon`. Key constants: webapp `ConfigSystemsKeysConstants`, shared `ConfigSystemsKeysSharedConstants`.
- Used by: about 45 webapp files (`ConfigSystemDAO_IF`); JSPs `body_right_before_closing_body_tag.jsp`, `projectView_UploadData.jsp`, `webappAdminManageUsers.jsp`; the schema-version comparers (as a "DB reachable" probe).
- How to use / extend: add a key constant; read via `ConfigSystemDAO_IF.getConfigValueForConfigKey(...)`; for JSPs add a getter on `AppContextConfigSystemValuesRetrieval` (catch + log, return fallback) and use `${ configSystemValues.newProp }`; seed a Docker default in 090 if the official Docker install needs it. Config readers / caches are [build_deploy_config.md](build_deploy_config.md).
- Do not use when: secrets that should not live in the DB; per-project / per-user settings.
- Limits and gotchas: values are strings, max 4000 chars. No caching in the DAO or the JSP bean (each getter hits the DB per evaluation). JSP getter failure returns `"UNABLE_TO_RETRIEVE_VALUE"` (footer) or `null`. Two key-constant classes with separate `textConfigKeys` lists.
- Related / duplicates: `ConfigSystemDAO` (webapp) vs `ConfigSystemDAO_Importer` (back end), both implementing `IConfigSystemTableGetValue`.
- Status: verified

---

## Schema scripts and version check

### Fresh-install SQL script set (`database_scripts/install`)
- What it solves: creates an empty Limelight schema with all tables, lookup rows, the admin user, the schema version, and (Docker only) default system config.
- Search keywords: install database, create schema, initial data, seed data, docker-entrypoint-initdb.d, fresh install, empty database, MySQL Workbench
- Location: `database_scripts/install/`: `001_create_empty_database.sql` (210 tables; generated by MySQL Workbench "Forward Engineer" from `database_scripts/mysql_workbench_model/Limelight_Database_MySQL_Workbench_Model.mwb`, "the master"), `002_create_empty_database_add_tables.sql` (embedded user-mgmt tables), `003_insert_initial_data.sql` (lookup rows + two config rows), `004_insert_initial_user.sql` (admin user id 1), `005_set_limelight_db_version.sql` (both version rows = 8), `090_docker_compose.sql` (Docker-only `config_system_tbl` rows).
- Used by: `docker-compose.yml` mounts the dir as the MySQL init dir (name order); `ant_create_download_zip_file.xml` and `.github/workflows/release.yml` package install + upgrade scripts.
- How to use / extend: schema change -> Workbench model -> regenerate 001 following the manual post-processing steps in 001's header (strip backticks and `IF NOT EXISTS`, keep the custom `CREATE SCHEMA` lines, fix triggers); new lookup rows in 003; bump 005 with a new upgrade dir.
- Do not use when: upgrading an existing DB.
- Limits and gotchas: 004 creates the initial admin user. 090 is for the official Docker setup only. Some upgrade-only data is not mirrored in install (see Open questions).
- Related / duplicates: next entry.
- Status: verified

### Versioned upgrade scripts + schema-version table + schema-version check (4 copies)
- What it solves: move an existing DB from schema version N-1 to N, and make every program refuse to run (or the webapp show an error page) when DB and code versions differ or an upgrade is in progress.
- Search keywords: schema version, database version, migration, upgrade SQL, DB upgrade, aa_limelight_database_version_tbl, DB Version Current, DB Version In Progress, version mismatch, refuse to run, maintenance page
- Location: SQL `database_scripts/version_upgrades/<N>/version_upgrade.sql` (N = 3..8; one dir per Limelight major version; version 2 is the implicit pre-table baseline). Table `aa_limelight_database_version_tbl (row_label ENUM('DB Version Current','DB Version In Progress') PK, limelight_database_version_number INT)` (created by upgrade 3). Constant `limelight_shared_code/.../database_schema_version__constant/LimelightDatabaseSchemaVersion_Constants` (`DATABASE_SCHEMA_VERSION__CURRENT = 8`, `..._WHEN_NO_DATABASE_VERSION_TABLE__OR__NO_RECORD_IN_TABLE_FOR_LABEL_STRING = 2`, row labels, user-facing messages). Comparers (same SQL, fallback and compare logic; each with its own result enum `SAME` / `CODE_LESS_THAN_DATABASE` / `CODE_GREATER_THAN_DATABASE`):
  - webapp `J/database_version_info_retrieval_compare__webapp/Webapp__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode` (+ `_IF`), called by `All_Page_Controllers_SpringHandlerInterceptor` (forwards to `Webapp_And_Database_Schema_Version_Number__NOT_MATCH_ErrorPage_Controller`, request attribute `databaseBehindWebapp` or `databaseUpdateInProgress`);
  - `IRS/database_version_info_retrieval_compare/Importer_RunImporter_Get_..._CompareToCurrentVersionInCode` (`getLimelightDatabase_CURRENT_SchemaVersion_Comparison_Result(Log_Exception_YN)`, `getLimelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result(...)`), called by `LimelightImporterProgram`, `Limelight_FeatureDetection_Run_Import_Program`, run importer `GetImportAndProcessThread`, `ImportAndPipelineRun_Thread`, `ImportFiles_DelayedRemoval_Thread`, `Database_PopulateNewFields_Cleanup_RemoveData_Thread`;
  - DB cleanup `Limelight_DatabaseCleanup__Get_..._CompareToCurrentVersionInCode` (`Limelight_DatabaseCleanup__Main_EntryPoint`);
  - populate `Limelight_DatabasePopulateNewFields__Get_..._CompareToCurrentVersionInCode` (`Main_EntryPoint` and per-table MAINs, re-checked per search).
- Used by: see above; admin procedure `docs/source/administration/update-limelight-major.rst` (run one major version at a time).
- How to use / extend: new version N+1: (1) `version_upgrades/<N+1>/version_upgrade.sql` — first statement upserts `'DB Version In Progress'` = N+1 (`INSERT ... ON DUPLICATE KEY UPDATE`), DDL/data between the `UPGRADE SQL START` / `UPGRADE SQL END` banners, last statement upserts `'DB Version Current'` = N+1, nothing after it; (2) update install 001 (via model) and 003 so fresh install == upgraded DB; (3) bump 005; (4) bump `DATABASE_SCHEMA_VERSION__CURRENT` and rebuild all deployables. In code, call BOTH comparisons (current and in-progress) and stop unless both are `SAME`; reuse the host module's comparer rather than writing a fifth.
- Do not use when: a slow data backfill that can run while the app is up — use the resumable populate-new-fields framework ([background_processing_queues_maintenance.md](background_processing_queues_maintenance.md)).
- Limits and gotchas: version 8 matches across upgrade 8, install 005 and the Java constant (verified by reading all three). Upgrade dir number == major version == schema version (convention, not enforced). Scripts are not idempotent. Upgrade 3 appends two Docker-specific config inserts AFTER its final version row (breaks the later rule). The comment above the final upsert in 6/7/8 says "to version 5" (copy-paste; value correct). Missing table/row is treated as version 2 (a fallback query on `config_system_tbl` distinguishes "no table" from "no DB access"). The webapp check runs up to two SELECTs on every page request (no caching). To exclude a path prefix from a Spring interceptor, end the pattern with `**`. In the run importer the check is pasted inline in four threads (no helper). The two public webapp methods are copy-paste identical except the row label.
- Related / duplicates: four comparer copies (only constants shared).
- Status: verified (re-checked)

### Small reusable schema patterns
- What it solves: recurring table shapes worth copying.
- Search keywords: history table, prev table, audit columns, flags table, per-search side table, cascade delete, created/updated user, short code table, content-addressed row
- Location: install 001. (1) Current + `_prev` history pair: `project_level_default_fltr_ann_cutoffs_tbl` / `..._prev_tbl`. (2) Per-search 1:1 side tables keyed by `search_id`: `search__flags_main_tbl` (upgrade 7; `SearchFlagsMainDAO`, `SearchFlagsForSearchIdSearcher`), `search__flags_other_tbl`, `search_details_tbl`, `search_psm_id_range_tbl`. (3) Per-search child rows with `FOREIGN KEY (search_id) REFERENCES search_tbl ON DELETE CASCADE`. (4) Audit columns `created_user_id` / `last_updated_user_id` / `..._date_time ... ON UPDATE CURRENT_TIMESTAMP`. (5) Short-code tables: `search_data_lookup_parameters` (hash `latin1_bin` + `hash_collision_index` + versioned JSON + `last_accessed`; content-addressed, logic in [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) / [domain_utilities.md](domain_utilities.md)), `url_shortener_tbl` (+ assoc tables), `project_search_id_code_tbl`.
- Used by: see per-table notes.
- How to use / extend: prefer a 1:1 side table over widening `search_tbl` / `psm_tbl` (upgrade 3 notes `ALTER TABLE psm_tbl` "may take a long time"). Use FK cascade for per-search children, or add the table to the cleanup library's per-search delete ([background_processing_queues_maintenance.md](background_processing_queues_maintenance.md)) and to the webapp delete/copy services.
- Do not use when: n/a.
- Limits and gotchas: the lookup-params hash column is binary-collated (case matters). `project_search_copy_from_to_ids_tbl` (upgrade 6) has no code users.
- Related / duplicates: two short-code mechanisms (lookup params vs URL shortener).
- Status: verified (DDL); "no users" by repo-wide grep

### File Object Storage tables (DB side)
- What it solves: DB records for files stored in the external file-object-storage service (FASTA, scan, generic, structure files), keyed by API key and linked to searches / project searches.
- Search keywords: file object storage, FOS, stored file, api key, attach file to search, blob storage, file_object_storage
- Location: install 001: `file_object_storage_main_entry_file_type_lookup_tbl`, `file_object_storage_main_entry_tbl (id, file_type_id FK, file_object_storage_api_key, create_date)`, `file_object_storage_to_search_tbl`, `file_object_storage_to_project_search_tbl`, `file_object_storage_source_first_import_tbl`. Upgrade 8 changed the main-entry unique key to `(file_type_id, file_object_storage_api_key)` and added type 5. DAOs: webapp `FileObjectStorage_MainEntry_DAO_Webapp`, importer `FileObjectStorage_MainEntry_DAO_Importer`, `FileObjectStorage_MainEntry_FileTypeLookup_DAO_Importer`. Client code and storage flow: [storage_files_external_services.md](storage_files_external_services.md).
- Used by: importer `Process_FileObjectStorage_Files_SaveAndAddToDB`; webapp `StructureFile_Contents_UploadData_RestWebserviceController` (type 5); FOS lookup searchers above.
- How to use / extend: new file kind = enum value + lookup row (install + upgrade with the `fake_on_update` idiom) + a description string in the enum helper.
- Do not use when: regenerable output or temp uploads.
- Limits and gotchas: install vs upgrade drift (see Open questions). The quant-storage design doc (`limelight_features_docs/quant_runs__storage_in_db_and_file_object_storage__design_2026-11-05.md`) plans further use.
- Related / duplicates: [storage_files_external_services.md](storage_files_external_services.md).
- Status: verified (DDL, upgrade 8, enum read; users grepped)

---

## Duplicates and parallel mechanisms in this area

1. **Two DB-connection mechanisms** — webapp `Limelight_JDBC_Base` (Spring `JdbcTemplate`) vs back-end `ImportRunImporterDBConnectionFactory` — bridged into libraries through THREE provider IF + holder sets (`SharedCodeOnly_DBConnectionProvider`, cleanup, populate). Prefer: the module's own mechanism; for a new library, follow `SharedCodeOnly_DBConnectionProvider` (no preferred consolidation identified).
2. **Two webapp read styles** — raw `getDBConnection()` (48 DAOs + all searchers; not transaction-aware) vs `getJdbcTemplate().query` + `RowMapper` (4 DAOs; transaction-aware). Prefer the JdbcTemplate style for any read inside a write transaction.
3. **Two transaction mechanisms under one package name** `database_update_with_transaction_services` — webapp Spring `@Transactional` vs run importer / IRS manual JDBC. Not interchangeable. Webapp `@Transactional` multi-DAO methods also live outside the package (`Experiment_AddSave_SaveExperimentAndChildrenRecords`, `SearchDataLookupParams_Save`).
4. **Schema-version compare, 4 copies** (webapp, IRS, cleanup, populate) — same SQL / fallback / logic, separate result enums; only constants shared. Run importer additionally pastes the call inline in 4 threads. No preferred one identified (use the host module's copy).
5. **Two insert-id side-table variants** — single id per call (`insert empty row, read key, delete older`: webapp `ProjectDAO`/`ProjectSearchDAO`, two id-creator DAOs, importer `SearchDAO`/`ProjectSearchDAO`/`AnnotationTypeDAO`/`SearchProgramsPerSearchDAO`, feature-detection `SearchDAO`) vs block reservation with CAS (7 importer `*_InsertId_DAO` + feature-detection copies). No shared helper for either; pick by volume.
6. **Same-named DAOs / DTOs / searchers across modules** — `AnnotationTypeDAO`, `AnnotationTypeFilterableDAO`, `ProjectSearchDAO`, `SearchProgramsPerSearchDAO`, `SearchScanFileDAO`, `FeatureDetectionRoot_ProjectScanFile_Mapping_DAO`, `FileObjectStorage_MainEntry_DAO_Webapp/_Importer`, `ProjectStateSearcher`, `FeatureDetection_PersistentFeature_Entries_..._Searcher`; `ProjectSearchDTO` x3; `SearchDTO_Importer` x2. Check the module when grepping.
7. **Five "log / skip on duplicate key" enums** — `LogDuplicateSQLException` (separately in `UrlShortenerDAO` and `ProjectSearchIdCodeDAO`), `Log_DuplicateKeyException`, `SkipLogInsertException` (3 webapp + 7 importer DAOs), plus `Log_Exception_YN` (schema check). Prefer reusing an existing one.
8. **Importer batch inserters vs feature-detection batch inserters** — the latter lack the flush-validation registry. Prefer the importer pattern with the registry.
9. **Mixed commit scope in one import** — insert-control-commit connection (most) vs auto-commit `getConnection()` (some small DAOs, id reservations, lookup bulk load, `IMP/dao`).
10. **IN-list SQL hand-rolled in every list searcher**; caller-side batching only in the PSM table controller. No helper exists.
11. **Protein-cutoff JOIN/WHERE block copied in 4 searchers**; DISTINCT projectSearchId -> project_scan_file_id subselect copied in 4 searchers; feature-detection vs gold-standard searchers near-copies.
12. **Overlapping searchers** — projectSearchId -> searchId (4 paths); spectral-storage API key (5 ways, 2 used); PSM-table rows (3 `PsmTblData_*` + `PsmWebDisplaySearcher`); reporter ions by PSM ids (2); "has active project search" (2 classes, same query); experiments "any" (drafts vs not); single-flag searchers vs search flags; "has RT/m-z" via flags vs random PSM; single-id vs list variants (protein annotations, protein sequence, dynamic mods); per-reported-peptide vs batched annotation searchers.
13. **Result holders** — `J/searchers_results` classes vs nested `_ResultItem` classes (either is fine).
14. **JSON blob shapes** — 1:1 side table vs inline columns, differing version-column types; three `UnmarshalJSON_ToObject` copies behind one shared interface.
15. **Duplicate-safe insert helper columns** — `fake_on_update_field_when_already_exists` vs `dummy_on_duplicate_update` (same idea).
16. **Config table readers** — webapp `ConfigSystemDAO` vs back-end `ConfigSystemDAO_Importer`; two key-constant classes.
17. **Two DTOs for `srch_rep_pept__open_mod_psm_unique_positions__lookup_tbl`** (one unused); two identical `*_CreatedByUserType` enums; `FeatureDetectionProgramName_Values_Constants` x2.

## Cross-references (blocks owned by other areas)

- Import queues (`file_import_tracking_*`, `import_and_pipeline_run_tracking_*`) DAOs / searchers / tables, queue-claim details, run-importer pause / alive control tables, import heartbeat table -> [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md) (background processing).
- Resumable backfill framework (populate new fields), `aa_limelight_db_updates_in_run_imprtr_or_pgm_*` tracking tables (and the unused `aa_updates_applied_tbl`, `aa_limelight_db_updates_in_webapp_thread_tbl`), on-demand backfill, min/max backfill -> [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md).
- DB cleanup library (hard delete of searches, orphan GC of shared rows, batched `DELETE ... LIMIT` helper, yield-to-importer detector) -> [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md).
- File Object Storage / Spectral Storage clients, S3 access, upload temp dirs -> [storage_files_external_services.md](storage_files_external_services.md) (DB-side tables and key lookups are kept here).
- In-memory cache infrastructure (`CachedData_InMemory_CentralRegistry`, Guava `LoadingCache` service pattern), `SearchFlagsForSingleSearchId_SearchResult_Cached`, annotation "pivot to map" services, `Support_DataDownloadControllers_Service` -> [storage_files_external_services.md](storage_files_external_services.md) / [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md).
- `SearchDataLookupParams_MainProcessing` / lookup-code services and `SearchDataLookupParamsRoot` model, `GetAnnotationTypeData`, `SearchNameReturnDefaultIfNull`, JSON marshal/unmarshal helpers -> [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) (webservices) / [domain_utilities.md](domain_utilities.md).
- Cutoff machinery: `SearcherCutoffValues_Factory`, shared cutoff objects (`SearcherCutoffValuesRootLevel/SearchLevel/AnnotationLevel`), cutoff-filtered SQL building (`PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher`, `ReportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcher`), default-cutoffs fast path (`DefaultCutoffsExactlyMatchAnnTypeDataToSearchData`, `ReportedPeptide_MinimalData_..._DefaultCutoffsSearcher`), `ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service` -> [domain_utilities.md](domain_utilities.md) (domain utilities).
- Access-control validators (`ValidateWebSessionAccess_*`, `GetWebSessionAuthAccessLevelForProjectIds`), `GenerateRandomStringForCode`, XXE-safe XML factory, URL sanitizing -> [security_access_control_sessions.md](security_access_control_sessions.md).
- Config readers (properties -> env -> -D), config key classes, DB env-var naming in Docker builds, MySQL driver versions -> [build_deploy_config.md](build_deploy_config.md).

## Open questions / unverified

- **`PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher`**: with modification-position cutoffs but NO PSM cutoffs, the mod-position `?` placeholders appear to be left unbound (bind branch for empty PSM-cutoff list binds only searchId and reportedPeptideId) -> JDBC error; reachable via the reported-peptide re-check. Seen in code, not runtime-tested.
- RESOLVED: **`@Transactional` methods declaring `throws Exception`** (`addNewUser`, `updateUserUpdateUserAccessLevel`): no checked path exists (DAO saves declare no checked exceptions; the second wraps `Exception` in `RuntimeException`).
- **Install vs upgrade drift** (observed in SQL; runtime effect inferred): install 001 still has the single-column unique index on the FOS API key while upgrade 8 uses `(file_type_id, api_key)`; no install script inserts FOS file-type lookup rows and nothing in the webapp seeds type 5, so the first structure-file upload on a fresh install would likely fail the FK. Definitive check: inspect `file_object_storage_main_entry_file_type_lookup_tbl` on a fresh-install DB. The `.mwb` model was not opened. Re-confirmed by reading SQL: install 001 creates `file_object_storage_api_key_UNIQUE` on `(file_object_storage_api_key)` only; upgrade 8 drops it and adds `(file_type_id, file_object_storage_api_key)` and inserts lookup row 5; the only Java writer of the lookup table is the importer's `FileObjectStorage_MainEntry_FileTypeLookup_DAO_Importer`.
- RESOLVED: **`DataSource` origin** — JNDI, via `spring.datasource.jndi-name` in `limelight_db_config.properties` (loaded by `@PropertySource` on `LimelightSpringApplicationRoot`).
- **Rationale for insert-id side tables** is undocumented (inference only).
- RESOLVED: **Importer singleton state assumes one import per JVM** — holds: run importer `ProcessSubmittedImport` launches the importer with `java -jar` through `RunSystemCommand` (`ProcessBuilder`), one child process per import.
- RESOLVED: **`GetAnnotationTypeData` caching** — `J/annotation_type_utils/GetAnnotationTypeData` has no cache of its own; it calls `AnnotationTypeListForSearchIdSearcher` directly per searchId (no cache code in the class, read).
- **Which `logTotalElapsedTimeAndCallCounts_SaveToImporterStatsTable` implementations are stubs** not checked file by file.
- **Per-searcher empty IN-list behavior** only partly checked.
- **Enum int values vs lookup-table rows** not compared exhaustively.
- RESOLVED: **ProjectSearchId-vs-searchId naming** of the `ReportedPeptide{Filterable,Descriptive}Data_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher` pair — both SQLs filter `WHERE search_id = ?` (read), so the class names are misleading; the value bound is a `search_tbl.id`.
- **Unused per grep** (candidates for removal, not verified otherwise): `ProteinNameForSearchIdProteinSequenceVersionIdSearcher`, `ProteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher`, `ProteinSequence_For_ProteinVersionId_Searcher`, `Feature_detection_root_Id_For_..._ProjectSearchId_Searcher`, `PsmBestValuesForReportedPeptideIdSearchIdSearcher`, `PsmOpenModification_For_PsmId_Searcher`, `PsmOpenModificationPosition_Searcher`, three `SpectralStorageAPIKey*` searchers, `StructureFile_Like_PDB_Ids_FROM_AlignmentTable_..._Searcher`, `SearchReportedPeptide_{Filterable,Descriptive}AnnotationData_Searcher`, `DataPageDefaultViewExperimentPagesDTO`, `LorikeetOpenMod`, `SrchRepPeptOpenModPsmUniquePositionsDTO`, `StructureFile_Like_PDB_File_FileTypeLookup_DTO`, `UnifiedReportedPeptideConstants`, `FeatureDetection_DisplayLabel_Additions_Values_Constants`; tables `project_search_copy_from_to_ids_tbl`, several JSON blob tables.
- Contradictions resolved: (1) `LogDuplicateSQLException` — `ProjectSearchIdCodeDAO` has its own enum (it does not reuse the URL-shortener enum; spot-checked). (2) "IN-list batching utils in `searcher_utils`" — spot-check shows `searcher_utils` holds only `DefaultCutoffsExactlyMatchAnnTypeDataToSearchData`; no batching helper exists. (3) `ProjectSearchDAO` REQUIRED vs MANDATORY — both true, per method (`save` REQUIRED, `delete` MANDATORY; spot-checked).
