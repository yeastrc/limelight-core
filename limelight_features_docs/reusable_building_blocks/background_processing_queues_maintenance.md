# Reusable building blocks — Background processing, queues, maintenance

Part of the reusable-building-blocks inventory; start at [README.md](README.md) (keyword index, quick picks, duplicates).
Counts and user lists are as of 2026-11-09 and approximate; grep before relying on them.

Everything that runs outside a web request: the two DB-table job queues (Limelight XML / scan-file imports, and the
generic "import and pipeline run" queue), the `limelight_run_importer` daemon that drains them by launching child Java
programs, pause / stop / heartbeat controls, the feature-detection "run an external service, then import" program, the
upload/work-directory cleanup threads, and the nightly DB maintenance (hard-delete of soft-deleted data and the
"populate new fields" backfill). Unexpected names to know: DB backfill = `limelight__db_populate_new_fields__common_code`;
DB purge = `limelight__database_cleanup__common_code__remove_data_from_database`; job queue = `file_import_tracking_*` /
`import_and_pipeline_run_tracking_*` ("tracking" means "job").


## Quick picks

| If you need... | Reuse this | Entry |
|---|---|---|
| A new kind of background job (e.g. quant run) | Add a `FileImportAndPipelineRun_RequestType` value + branches in `ProcessSubmittedImportOrPipelineRun`; do NOT add a third queue | B2, C2 |
| To enqueue a job from the webapp | `FileImportAndPipelineRunTrackingDAO` (+ id creator), modeled on the feature-detection Initialize/UploadFile/Submit controllers | B2, B4 |
| To take the next job atomically | `GetNext_ImportAndPipelineRunTracking_ToProcessDBTransaction` (SELECT ... FOR UPDATE claim) | B3 |
| A long-running background thread beside imports | Run Importer `ManagerThread` worker-thread pattern | A1 |
| To run a separate program / subprocess | `RunSystemCommand` (only `ProcessBuilder` user in the repo) | C1 |
| A new Run-Importer-launched Java program | Skeleton of `LimelightImporterProgram` / `Limelight_FeatureDetection_Run_Import_Program` (move shared parts to `limelight_importer_run_importer_shared` rather than copy again) | C3 |
| "Submit to external service, poll, show progress, cancel on shutdown" | `Run_And_Import_CoreEntryPoint` + `RunFeatureDetectionService_Communication` | D1, D2 |
| Tell the webapp a background job finished (email etc.) | `On_ImportOrRunPipeline_Finish_CallWebService` + `RunImporterToWebAppOnComplete_Request` | C4 |
| Refuse to work against a mismatched DB schema | The schema-version compare class for your module (4 copies) | A3 |
| Let an admin pause background work | `RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment.getStatus_AcrossAllTypes` + `ManagerThread` pause paths | A4 |
| Graceful operator stop of the daemon | Run-control file `limelight_run_importer_run_control.txt` (`stop run` / `stop jobs`) | A5 |
| Backfill a newly added column for existing searches | Populate-new-fields framework (template: `..._Table_search_level_annotation_min_max_tbl_MAIN`) + `aa_limelight_db_updates_in_run_imprtr_or_pgm_*` tracking | G1 |
| Fill missing data on read inside a webservice | On-demand backfill pattern (check nulls -> populate -> re-query -> validate) | G2 |
| Physically delete data when a new per-search table is added | Add a delete block to `Limelight_DatabaseCleanup__Delete_Single_Search_And_Children` (unless FK cascade) | F4 |
| Delete millions of rows without long locks | `Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated` (DELETE ... LIMIT loop) | F3 |
| A new nightly maintenance step | Add a call inside one of the two `Main_EntryPoint`s run by `Database_PopulateNewFields_Cleanup_RemoveData_Thread` | F1 |
| Crash-safe multi-table upload with later garbage collection | Root row + `entry_fully_inserted` flag + project mapping + cleanup pair (gold standard / feature detection) | D4, F7 |
| New get-or-insert of shared (cross-search) rows | Also update `last_used_in_search_import`, or nightly orphan GC may delete it mid-import | F6 |
| Delete a job's work directory / S3 objects | Delayed-removal thread (free if your job uses the pipeline base dir); `ImportFiles_Delete_S3Objects_For_DB_SingleFile_Records` | E1, E2 |
| A background thread inside the webapp | Static shutdown flag + `WebappServletContextListener.contextDestroyed` | H1 |
| Plug a host's DB pool into a library module | `*_DBConnectionProvider_Provider_IF` + singleton holder, set at host startup | F2 |

---

## A. Run Importer daemon framework

### A1. Run Importer daemon skeleton (main thread + supervising ManagerThread + replaceable worker threads)
- What it solves: a long-running Java daemon that starts named worker threads, restarts any that die, writes a DB heartbeat, honors pause requests and a stop-control file, and shuts down cleanly on SIGTERM (JVM shutdown hook). THE place to hang a new background job that must run beside imports.
- Search keywords: daemon, background worker, job runner, supervisor, thread restart, watchdog, keepRunning, awaken notify, shutdown hook, graceful shutdown, run importer main loop, service process
- Location: `limelight_run_importer`, package `org.yeastrc.limelight.limelight_run_importer`: `program/RunImporterProgram.main` (CLI parse, config load, DB factory init, `ImportRunnerProgramShutdown` shutdown hook), `main/ImporterRunnerMain` (singleton, waits until shutdown), `manager_thread/ManagerThread` (`createSingletonInstance`, `run`, `runProcessLoop`, `replaceWorkerThreadsIfDead`, `shutdown`, `completedSuccessful_FirstDatabaseSQL_GetImportAndProcessThread`).
- Used by: the runnable jar only (`limelightRunImporter.jar`, started by `limelight_run_importer/scripts/z_run__*.sh`). Managed workers: `GetImportAndProcessThread`, `ImportAndPipelineRun_Thread`, `ImportFiles_DelayedRemoval_Thread`, `Database_PopulateNewFields_Cleanup_RemoveData_Thread`. `RunImporter_Get_And_Process_PauseRequest` calls back via `ManagerThread.getExistingSingletonInstance()`.
- How to use / extend: write a `Thread` subclass with static `getNewInstance(name, ...)`, `volatile keepRunning`, `awaken()` (synchronized notify), `shutdown()` / `stopRunningAfterProcessingImport()`, `isKeepRunning()`, and a `run()` loop doing `synchronized(this){ wait(ms); }` between passes. Add a field + counter in `ManagerThread`, start it in `run()` (or in `completedSuccessful_FirstDatabaseSQL_...` if it should start only after the DB is reachable), add a replace block in `replaceWorkerThreadsIfDead`, and add it to `shutdown_Common` and the pause paths. Every pass of a DB-touching thread should first run the schema-version gate (A3).
- Do not use when: the work belongs in the webapp request cycle, or is a one-shot CLI tool.
- Limits and gotchas: loop period `Limelight__RunImporter_TimeUntilNext_X_Constants.WAIT_TIME_FOR_MANAGER_THREAD_NEXT_PROCESS_MAIN_LOOP_IN_SECONDS` (1 s while a pause is pending). Both cleanup threads (`ImportFiles_DelayedRemoval_Thread` and `Database_PopulateNewFields_Cleanup_RemoveData_Thread`) are `setDaemon(true)`; import threads are not. Helper threads owning a DB pool use `ImportRunImporterDBConnectionFactory.get_New_Instance()` and MUST call `threadIsDead_Cleanup()` / `closeAllConnections_And_Remove_Instance_From_get_New_Instance` when replaced, or the pool leaks. Thread-alive status logged at most twice a day (09:00, 21:00). Only the import thread's first successful DB access starts the file-cleanup and DB-cleanup threads.
- Related / duplicates: `limelight_importer` and `limelight_feature_detection_run_import` register JVM shutdown hooks in their `program/*Program` classes (single-run programs, C3).
- Status: verified

### A2. Run Importer config: properties file + environment-variable override
- What it solves: daemon settings from `-c <file>` (or `run_importer_config_file.properties` on the classpath); each key overridable by a `LIMELIGHT_*` env var (env wins). Also supplies the DB connection-parameters provider.
- Search keywords: run importer config, properties, environment variable, docker env, settings, java executable parameters, importer jar path
- Location: `limelight_run_importer` `config/ProcessImporterRunnerConfigFileEnvironmentVariables.processConfigFile`; values in static `config/ImporterRunnerConfigData`. Keys (property names): `database.cleanup.disable`, `wait.time.for.next.check.for.import.to.process`, `java.executable.with.path`, `java.executable.parameters` (env `LIMELIGHT_JAVA_EXECUTE_PARAMS`), `importer.jar.with.path`, `importer.db.config.file.with.path`, `feature_detection.importer_and_run_pipeline.jar.with.path`, `feature_detection.importer_and_run_pipeline.db.config.file.with.path`, `feature.detection.program.java.executable.parameters`, `run.importer.pid.file.with.path`, `limelight.web.app.base.url`, `command.run.successful.import`, `command.run.successful.import.sysout.syserr.dir`. DB params via shared `DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables` (DB connection env vars override properties).
- Used by: `RunImporterProgram`; most module classes via `ImporterRunnerConfigData`.
- How to use / extend: add a property + env name pair, a block in `processConfigFile`, and a static field/accessor in `ImporterRunnerConfigData`. A new pipeline program needs a jar key and a DB-config key like the feature-detection pair.
- Do not use when: the setting is site-wide and admin-editable — use `config_system_tbl` via `ConfigSystemTableGetValueCommon` ([build_deploy_config.md](build_deploy_config.md)).
- Limits and gotchas: each key is a about 40-line copy-pasted block.
- Related / duplicates: importer and feature-detection programs have their own config readers (not compared).
- Status: verified (key names; precedence read in full for one key, others by grep of `System.getenv` per key)

### A3. DB schema-version gate (code version vs `aa_limelight_database_version_tbl`)
- What it solves: refuse to do DB work while the DB schema version (CURRENT row, or IN_PROGRESS update row) differs from the version compiled into the code; resume automatically when it matches.
- Search keywords: database schema version, version table, upgrade in progress, migration guard, code newer than database, refuse to run, version mismatch
- Location: constants `limelight_shared_code` `database_schema_version__constant/LimelightDatabaseSchemaVersion_Constants` (`DATABASE_SCHEMA_VERSION__CURRENT`, messages). Implementations (pick the one for your module): `limelight_importer_run_importer_shared` `database_version_info_retrieval_compare/Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode` (`getLimelightDatabase_CURRENT_SchemaVersion_Comparison_Result(Log_Exception_YN)`, `getLimelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result(...)`, results SAME / CODE_GREATER_THAN_DATABASE / CODE_LESS_THAN_DATABASE); cleanup copy `Limelight_DatabaseCleanup__Get_..._CompareToCurrentVersionInCode`; populate copy `Limelight_DatabasePopulateNewFields__Get_..._CompareToCurrentVersionInCode`; webapp `database_version_info_retrieval_compare__webapp/Webapp__Get_...`.
- Used by: `LimelightImporterProgram`; run importer `GetImportAndProcessThread`, `ImportAndPipelineRun_Thread`, `ImportFiles_DelayedRemoval_Thread`, `Database_PopulateNewFields_Cleanup_RemoveData_Thread`; `Limelight_FeatureDetection_Run_Import_Program` (fails the tracking run with a user message on mismatch); both cleanup/populate `Main_EntryPoint`s; both populate MAINs (re-checked before each search).
- How to use / extend: call both comparisons at startup / top of every pass; anything other than SAME means stop (or wait and `continue`). Run importer threads print the message at most once per 24 h.
- Do not use when: n/a — but use the copy that matches your module's connection source.
- Limits and gotchas: missing table/row is treated as a fixed legacy version (fallback query on `config_system_tbl`). The run importer copy-pastes the check inline into four threads (no helper). The cleanup thread checks once, then each `Main_EntryPoint` re-checks with its own copy.
- Related / duplicates: FOUR copies (cleanup and populate byte-identical except names). Webapp page interceptor also checks it ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Status: verified (cleanup/populate copies diffed; importer copy read; webapp copy located only)

### A4. Pause support (pause now / pause after current job / unpause; by admin request or weekly schedule)
- What it solves: an admin can pause the run importer immediately (kills the running child, job re-queued) or after the current job, by explicit request or by a recurring weekly schedule; the daemon reports its current pause status back to the DB.
- Search keywords: pause importer, maintenance window, pause schedule, pause request, stop imports temporarily, paused pending completion, pause when complete, pause immediately, run importer status
- Location: decision logic in `limelight_shared_code`: `run_importer/pause_run_importer/pause_importer_is_in_effect_at_current_time_based_on_request/RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment.getStatus_AcrossAllTypes` (request wins; else schedule -> PAUSE_WHEN_COMPLETE), `run_importer/pause_run_importer/searchers/RunImporter_PauseProcessing_Request_Searcher`, enums in `run_importer/pause_run_importer/enum_classes/` (Request_Status NOT_PAUSE / PAUSE_IMMEDIATELY / PAUSE_WHEN_COMPLETE; Current_Status NOT_PAUSED / YES_PAUSED / PAUSED_PENDING_COMPLETION), `pause_run_importer_common/is_pause_run_importer_now_based_on_schedule/RunImporter_Schedule_PauseImporter_IsPauseNow_BasedOn_Schedule`, schedule JSON `pause_run_importer_common/schedule_pause_run_importer_json_objects/version_001_objects/RunImporter_Schedule_PauseImporter_JSON_Root__V001`. Daemon side: `limelight_run_importer` `pause_run_importer/RunImporter_Get_And_Process_PauseRequest`, `ManagerThread.pause_Imports_RunPipeline_Now / _AfterCurrent_ImportsAndRunPipelines / _NOT`, status writer `dao/FileImport__RunImporter_PauseProcessing_CurrentStatus_DAO__RunImporter`. Webapp side: `AdminManage_RunImporter_Pause_Update_Requested_Status_RestWebserviceController`, `AdminManage_RunImporter_Pause_Schedule_Insert_Update_RestWebserviceController`, `AdminManage_RunImporter_Pause_Get_{CurrentStatus,RequestedStatus,Running_Queued_JobCount}_RestWebserviceController`, `FileImport_RunImporter_PauseProcessingRequest_DAO`, `FileImport_RunImporter_PauseProcessing_Schedule_DAO`, searchers `FileImport_Pause_RunImporter_Get_CurrentStatus_Searcher`, `FileImport_Pause_RunImporter_Get_RequestedStatus_Searcher`. Tables: `file_import__run_importer__pause_processing_request_tbl`, `..._schedule_tbl`, `..._current_status_tbl` (+ value lookup tables seeded in install script 003).
- Used by: `ManagerThread` (start + every loop), `GetImportAndProcessThread` and `ImportAndPipelineRun_Thread` (before each claim) — all via `RunImporter_Get_And_Process_PauseRequest.getSingletonInstance()`, the only direct caller of `getStatus_AcrossAllTypes`; admin UI under `front_end/src/js/page_js/webapp_admin_pages/`.
- How to use / extend: any new job-processing loop should check `getStatus_AcrossAllTypes()` before taking a job; a new long-running worker should be stopped/restarted by the pause paths in `ManagerThread` (the DB-cleanup thread already is; the file-cleanup thread is not). Pattern reference for "webapp writes a request row, daemon writes a current-status row".
- Do not use when: you want the process to exit — use the run-control file (A5) or SIGTERM.
- Limits and gotchas: "Now" pause calls `shutdown()` on the import threads, which destroys the child process. Pause also stops a running DB-cleanup pass. Only type 1 (PAUSE_ALL) exists. The schedule class keeps a `volatile` cache keyed on the row's last-updated time, but `getInstance()` returns a new instance each call, so the cache never hits (schedule JSON re-read every check; low cost). Schedule math uses local time and `GregorianCalendar.roll(WEEK_OF_YEAR, -1)`; year-boundary / DST behavior untested. The pause-schedule reader hard-codes Jackson instead of the injected unmarshal interface. Searchers check nullable FK columns with `rs.wasNull()`.
- Related / duplicates: run-control file (A5) and SIGTERM hook overlap for "stop taking jobs".
- Status: verified (re-checked)

### A5. Stop-control file and PID file (operator stop without killing) + start/restart scripts
- What it solves: an operator edits `limelight_run_importer_run_control.txt` (created in the working directory at start) to begin with `stop run` (finish current job, exit, delete the PID file) or `stop jobs` (finish current job, stay alive but idle — for job managers that auto-restart). Shell scripts start the jar in the background, write a PID file, and a cron script restarts it if the PID is gone and sends a notification email.
- Search keywords: stop control file, run control, graceful stop, pid file, restart if not running, cron restart, stop jobs, stop run
- Location: `limelight_run_importer` `constants/RunControlFileConstants`, `ManagerThread.createClientControlFile / checkForStopProcessingJobsRequest / removePIDFileOnShutdownViaRunControlFile`; config key `run.importer.pid.file.with.path` (old alias `importer.pid.file.with.path`); `limelight_run_importer/scripts/z_run__limelightRunImporter.jar.sh`, `z_run__limelightRunImporter.jar_StartBackground_ForRestartIfNotRunningScript.sh`, `z_restart_limelightRunImporter.jar_if_not_running.sh`.
- Used by: `ManagerThread` only; scripts are operator-facing samples.
- How to use / extend: deleting the PID file on `stop run` is what tells the cron script NOT to restart.
- Do not use when: in Docker the JVM is normally stopped by SIGTERM -> shutdown hook (assumption, not checked).
- Limits and gotchas: paths are relative to the process working directory. Possible defect (script reading): the restart script tests `$ps_exit_code` right after reading the PID file, before that variable is set (looks like it meant `$pid_read_status`), so a PID-file read failure is not detected. Scripts contain placeholder mail address / server name to fill in.
- Related / duplicates: pause (A4).
- Status: verified

### A6. Run Importer liveness heartbeat row
- What it solves: the daemon upserts a row with status ALIVE / SHUTDOWN, a timestamp, and "seconds until next update", so another component could tell whether it is running.
- Search keywords: heartbeat, alive, is running, health check, last seen, watchdog, daemon status
- Location: `limelight_run_importer` `dao/FileImport__RunImporter_AliveStatus_DAO__RunImporter.saveOrUpdate_ForTypeId_Etc` (table `file_import__run_importer_alive_tbl`); enums `limelight_shared_code` `run_importer/run_importer_alive_status/enum_classes/FileImport_ImportAndPipelineRun_RunImporter_Alive_Status_Enum` (ALIVE/SHUTDOWN).
- Used by: `ManagerThread` (start, every loop, on shutdown).
- How to use / extend: reuse the table/type enum for a new heartbeat type rather than a new table.
- Do not use when: you need per-search import liveness (B6) or per-job status (B1/B2).
- Limits and gotchas: no reader found by grep (only this DAO and schema scripts) — nothing in the webapp displays it today.
- Related / duplicates: pause current-status table uses the same upsert pattern; per-search heartbeat (B6).
- Status: verified

---

## B. Job queues (DB tables)

### B1. Limelight XML / scan-file import queue (`file_import_tracking_*`)
- What it solves: the DB-backed job queue for user-submitted Limelight XML + scan-file imports. A "tracking" row is the job (status, priority, project, user); a "tracking run" row is one attempt (status, sub-status, result/error text, inserted search id); "single file" rows are the uploaded files (local path or S3); a history table records each status change; versioned JSON blobs carry request data (search tags etc.).
- Search keywords: import queue, job queue, submit import, enqueue, tracking, tracking run, tracking id, queued, re-queued, started, complete, failed, status history, job status, import status, pending imports, upload record, mark for deletion
- Location:
  - Shared (`limelight_shared_code`, package `file_import_limelight_xml_scans`): DTOs `dto/FileImportTrackingDTO`, `FileImportTrackingRunDTO`, `FileImportTrackingSingleFileDTO`, `FileImportTrackingSingleFile_S3UploadPart_DTO`; enums `enum_classes/FileImportStatus` (1 INIT_INSERT_PRE_QUEUED, 2 QUEUED, 3 RE_QUEUED, 4 STARTED, 5 COMPLETE, 6 FAILED), `FileImportRunSubStatus`, `FileImportFileType`, `ImportSingleFileUploadStatus`; read DAOs `dao/FileImportTracking_Shared_Get_DAO`, `FileImportTrackingRun_Shared_Get_DAO`, `FileImportTrackingSingleFile_Shared_Get_DAO`; row mappers `populate_dto_from_result/*`; counts `searchers/FileImportTracking_Searcher_Shared`; constants `constants/FileUploadCommonConstants` (`PRIORITY_STANDARD = 40`, `PRIORITY_RUN_FIRST = 15`, dir prefixes).
  - Importer-side writes (`limelight_importer_run_importer_shared`, `file_import_limelight_xml_scans`): `dao/FileImportTracking_Importer_RunImporter_DAO` (`updateStatusStarted`, `updateStatusAtImportEnd`, each also writes a history row), `dao/FileImportTrackingRun_Importer_RunImporter_DAO` (`save`, `updateClearCurrentRunForTrackingId`, `updateStatusResultTexts`, `updateInsertedSearchId`), transaction `database_update_with_transaction_services/UpdateTrackingTrackingRunRecordsDBTransaction`.
  - Webapp (enqueue + list, `limelight_webapp` `file_import_limelight_xml_scans/dao` and `/searchers`): `FileImportTrackingDAO` (`save`, `getForId`, `set_FieldsUpdatedInSubmit_ForId`, `set_Status_Queued_Submitted_ForId`, `setMarkedForDeletionForId_ExcludingStatus`), `FileImportTrackingSingleFileDAO`, `FileImportTrackingSingleFile_S3UploadPart_DAO`, `FileImportTrackingFileIdCreatorDAO` (B4), JSON blob DAOs; searchers `FileImportTracking_All_Searcher`, `_PendingCount_`, `_Pending_ProjectIds_`, `_PendingTrackingIdsAllProjects_`, `_Exists_AtLeastOne_WithStatus_Started_`, `FileImportTrackingRun_LatestForParent_Searcher`.
  - Daemon claim: B3. Tables (install script 001): `file_import_tracking_tbl`, `_run_tbl`, `_status_history_tbl`, `_single_file_tbl`, `_sngl_fl_del_web_user_tbl`, `_single_file_s3_upload_part_tbl`, `_status_values_lookup_tbl`, JSON blob tables, `file_import_tracking_id_creator_tbl`.
- Used by: run importer `ProcessSubmittedImport`, `GetNextTrackingToProcessDBTransaction`, `ImportFiles_Delete_S3Objects_For_DB_SingleFile_Records`; importer `LimelightImporterProgram`, `ProcessFileImportSubmission` (reads run rows + versioned JSON + files local-or-S3); webapp `Project_UploadData_V1_UploadInitialize_RestWebserviceController`, `Project_UploadData_UploadSubmit_RestWebserviceController` (sets QUEUED), V2 upload controllers, `Project_UploadData_ListSubmittedItems_RestWebserviceController`, `Project_UploadData_PendingCount_RestWebserviceController`, `Project_UploadData_Remove_FileImportItem_..._RestWebserviceController`, `AdminManage_Importer_Queue_Controller`, `RunImporter_ImporterFinish_RestWebserviceController`. `FileImportStatus` has about 58 users across modules.
- How to use / extend: enqueue = id from id-creator -> `save` with INIT_INSERT_PRE_QUEUED -> upload files -> `set_Status_Queued_Submitted_ForId`. Back-end code reads with the `*_Shared_Get_DAO` classes (need a registered `SharedCodeOnly_DBConnectionProvider`) and writes status only through the importer-side DAOs on a caller-owned `Connection`; use the transaction service when tracking status and run result must change together. Map DB ints with `FileImportStatus.fromValue(int)` / `.value()`. "Pending" = QUEUED, RE_QUEUED, STARTED and not marked for deletion.
- Do not use when: the job is not a Limelight-XML/scan-file import — use the pipeline-run queue (B2).
- Limits and gotchas: `file_import_tracking_tbl.id` is NOT auto-increment (B4). Webapp writes only QUEUED + marked-for-deletion; STARTED/COMPLETE/FAILED are written by run importer / importer. The XML-import `updateStatusAtImportEnd` SQL has no guard on current status, while the pipeline twin only updates QUEUED/RE_QUEUED/STARTED rows (observed in SQL; drift). `FileImportTrackingSingleFileDAO_IF` has look-alike methods `getForTrackingId` and `getFor_TrackingId`. Status ids must match the lookup tables (shared by both queues).
- Related / duplicates: B2 is a near-copy at every layer; same-table readers in webapp and shared (`FileImportTrackingSingleFileDAO` vs `FileImportTrackingSingleFile_Shared_Get_DAO`; webapp `FileImportTrackingDataJSONBlob_DAO` vs importer `FileImportTrackingDataJSONBlob_DAO_Importer`).
- Status: verified

### B2. Import-and-pipeline-run queue (`import_and_pipeline_run_tracking_*`) — the generic queue for new job types
- What it solves: a second DB-backed job queue for non-Limelight-XML work (today: feature detection "import Hardklor/Bullseye results" and "run then import"). Each job carries a request type, a versioned serialized request payload, and optional versioned label/value-pairs JSON for display. Reuses `FileImportStatus`.
- Search keywords: pipeline run, job queue, generic queue, request type, request data, run and import, feature detection job, background job, label value pairs, add a new job type, quant run job
- Location:
  - Shared (`limelight_shared_code`, `file_import_pipeline_run`): `dto/FileImportAndPipelineRunTrackingDTO` (`requestType`, `requestData_Format_VersionNumber`, `requestData_Content_VersionNumber`, `requestData_AsString`, `requestData_LabelValuePairs_JSON_*`, `markedForDeletion`...), `..TrackingRunDTO`, `..TrackingSingleFileDTO`; enums `enum_classes/FileImportAndPipelineRun_RequestType` (1 FEATURE_DETECTION_HARDKLOR_BULLSEYE_IMPORT, 2 FEATURE_DETECTION_HARDKLOR_BULLSEYE_RUN_AND_IMPORT), `FileImportAndPipelineRun_SubStatus` (adds PIPELINE_RUN_ERROR); read DAOs `dao/FileImportAndPipelineRunTracking*_Shared_Get_DAO`; counts `searchers/FileImportAndPipelineRunTracking_Searcher_Shared`; display payload `shared_objects/FileImportPipelineRun_LabelValuePairs_JSON_Contents_V001`; `constants/FileImportPipelineRunCommonConstants`.
  - Importer-side writes (`limelight_importer_run_importer_shared`, `import_and_pipeline_run`): `dao/FileImportAndPipelineRunTracking_Importer_RunImporter_DAO` (`updateStatusStarted`, `updateStatusAtImportEnd` + history row), `dao/FileImportAndPipelineRunTrackingRun_Importer_RunImporter_DAO` (`save`, `updateStatusResultTexts`), `dao/FileImportAndPipelineRunTrackingHistoryDAO`, `database_update_with_transaction_services/Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction`.
  - Webapp (`limelight_webapp` `file_import_pipeline_run/dao`, `/searchers`): `FileImportAndPipelineRunTrackingDAO` (`save`, `getForId`, `update__request_data`, `updateStatus`, `updateStatus_All_IdList`, `setMarkedForDeletionForId_ExcludingStatus`), `FileImportAndPipelineRunTrackingSingleFileDAO` (`update_AWS_S3_Fields`, `update_LocalFile_Fields`), `FileImportAndPipelineRunTrackingRunDAO`, `FileImportAndPipelineRunTrackingIdCreatorDAO`; searchers `_All_`, `_PendingCount_`, `_PendingTrackingIdsAllProjects_`, `_Exists_AtLeastOne_WithStatus_Started_`.
  - Request payload template: `limelight_shared_code` `feature_detection_run_import_hardklor_bullseye/shared_objects/FeatureDetection_HardklorBullseye_{Import,Run}_RequestData_V001` (JAXB, `VERSION_NUMBER`). Tables: `import_and_pipeline_run_tracking_tbl`, `_run_tbl`, `_run_step_tbl`, `_run_step_run_tbl`, `_status_history_tbl`, `_single_file_tbl`, two `_id_creator` tables (upgrades 4 and 5).
- Used by: run importer `GetNext_ImportAndPipelineRunTracking_ToProcessDBTransaction`, `ImportAndPipelineRun_Thread`, `ProcessSubmittedImportOrPipelineRun`; `Limelight_FeatureDetection_Run_Import_Program`, `Run_And_Import_CoreEntryPoint`; webapp `Project_FeatureDetection_Import_Request_{Initialize,UploadFile,Submit}_RestWebserviceController`, `Project_FeatureDetection_Run_And_Import_Request_{Initialize,UploadFile,Submit}_RestWebserviceController`, `Project_UploadData_ListSubmittedItems_RestWebserviceController`, `Project_UploadData_PendingCount_RestWebserviceController`, `Project_UploadData_Remove_Import_And_PipelineRun_Item_..._RestWebserviceController`.
- How to use / extend: the template for a NEW background job type (planned for quant runs per `limelight_features_docs/quant_runs__storage_in_db_and_file_object_storage__design_2026-11-05.md`): (1) add a `FileImportAndPipelineRun_RequestType` value; (2) define a versioned request-data object (`..._RequestData_V001`); (3) webapp Initialize/UploadFile/Submit controllers modeled on the feature-detection ones insert the tracking row; (4) add BOTH dispatch branches in run importer `ProcessSubmittedImportOrPipelineRun` (C2) + jar/DB-config keys (A2); (5) handle the type in the pipeline-run branch of `Project_UploadData_ListSubmittedItems_RestWebserviceController` so it shows in the project's upload list; (6) share program constants between webapp and child program in one shared constants class (pattern: `FeatureDetection_HardklorBullseye_*_Constants`).
- Do not use when: the job is a Limelight XML import (B1).
- Limits and gotchas: end-of-run status update only applies while the row is QUEUED/RE_QUEUED/STARTED. Gold-standard controllers reference a `GOLD_STANDARD_IMPORT` request type only in commented-out code; the enum has no such value (gold-standard pipeline import is unfinished). Pending counts exist once per queue and the UI sums them. `import_and_pipeline_run_tkg_run_id_creator_tbl` exists in the schema (upgrade 4 / install 001) but no Java code references it (grep) — unused.
- Related / duplicates: B1 (parallel structure). Dispatch location confirmed in `limelight_run_importer`.
- Status: verified (re-checked)

### B3. Claim next job atomically: SELECT ... FOR UPDATE + mark STARTED + insert run row
- What it solves: pick the next queued job (lowest priority value, then lowest id, not marked for deletion, priority <= a CLI cap) and in one transaction mark it STARTED and insert a "run" row, so two run importers never take the same job.
- Search keywords: dequeue, claim job, next queued, FOR UPDATE, row lock, priority, RE_QUEUED, take next job, job lock
- Location: `limelight_run_importer` `database_update_with_transaction_services/GetNextTrackingToProcessDBTransaction.getNextTrackingToProcess(maxPriority)` (B1 queue) and `GetNext_ImportAndPipelineRunTracking_ToProcessDBTransaction.getNextTrackingToProcess(maxPriority)` (B2 queue); SQL in `dao/FileImportTracking_For_ImporterRunner_DAO.getNextQueued`, `dao/FileImportAndPipelineRunTracking_For_ImporterRunner_DAO.getNextQueued`.
- Used by: `GetImportAndProcessThread.run`, `ImportAndPipelineRun_Thread.run`.
- How to use / extend: add a request type to B2 instead of a new claim class. `--max_tracking_record_priority_to_retrieve` lets one daemon take only high-priority rows (`PRIORITY_RUN_FIRST`).
- Do not use when: you need parallelism inside one daemon — each queue has exactly one worker thread, one job at a time.
- Limits and gotchas: manual-commit connection from `ImportRunImporterDBConnectionFactory`; the transaction covers only the claim, not the job. QUEUED and RE_QUEUED are picked up. Jobs interrupted by shutdown are set back to RE_QUEUED (C2).
- Related / duplicates: the two transaction classes and two DAOs are near-copies.
- Status: verified (re-checked)

### B4. Id-generator table pattern for queue ids (`..._id_creator_tbl`)
- What it solves: get a unique int id BEFORE inserting the main row (main id is not auto-increment), so directories/files can be named with the id first.
- Search keywords: id generator, sequence, next id, unique id, id creator, auto increment substitute
- Location: `limelight_webapp` `file_import_limelight_xml_scans/dao/FileImportTrackingFileIdCreatorDAO.getNextId()` (insert empty row into `file_import_tracking_id_creator_tbl`, take generated key, delete smaller ids); `file_import_pipeline_run/dao/FileImportAndPipelineRunTrackingIdCreatorDAO` (`import_and_pipeline_run_tkg_id_creator_tbl`).
- Used by: `Project_UploadData_V1_UploadInitialize_RestWebserviceController` (only user of the import-queue DAO); pipeline-queue DAO: `Project_FeatureDetection_Import_Request_Initialize_`, `Project_FeatureDetection_Run_And_Import_Request_{Initialize,Submit}_`, `Project_GoldStandard_Import_Request_Initialize_RestWebserviceController`.
- How to use / extend: copy the DAO with a new one-column auto-increment table.
- Do not use when: a normal auto-increment id + generated key works.
- Limits and gotchas: `getNextId` is `@Transactional(REQUIRED)` but calls private methods annotated `MANDATORY`/`REQUIRED` via `this.` — those inner annotations have no effect (no Spring proxy).
- Related / duplicates: the two DAOs are copies; other insert-id schemes are in [data_access.md](data_access.md) (importer `*_InsertId_DAO` range reservation).
- Status: verified (re-checked)

### B5. Queue worker thread template (poll, schema gate, pause check, claim, process, back off)
- What it solves: the polling loop around a queue: check schema version, check pause, claim a job, process it, otherwise wait N seconds; on exception wait 5 minutes; close pooled connections after every pass; write a human-readable status file.
- Search keywords: polling loop, worker loop, wait time next check, back off, retry after exception, status file, last check status, poll interval
- Location: `limelight_run_importer` `get_import_and_process_thread/GetImportAndProcessThread`, `import_and_pipeline_run__thread/ImportAndPipelineRun_Thread` (structural twin). Poll interval config key `wait.time.for.next.check.for.import.to.process` (default 5 s). Status file `GetImportStatus_FileConstants.GET_IMPORT_STATUS_FILENAME` (`limelight_get_import_last_check_status.txt`, working directory).
- Used by: `ManagerThread` only.
- How to use / extend: copy `ImportAndPipelineRun_Thread` only if a genuinely separate queue is needed; otherwise add a request type (B2).
- Do not use when: n/a (template).
- Limits and gotchas: possible defect (code reading): BOTH threads write the SAME status file, so it shows whichever wrote last. Repeated SQL errors logged at most once per 5 minutes. Each worker calls the cleanup detector's `importerIsRunning_End` when it starts (see F5 gotcha).
- Related / duplicates: the two thread classes are near-identical.
- Status: verified (re-checked)

### B6. Search-import-in-progress heartbeat (`importer__search_import_in_progress_tracking_tbl`)
- What it solves: the importer stamps a per-search heartbeat row while inserting a search so a partly-imported search can be recognized as still alive; deleted on finish; stale rows (older than 4 days) purged by the run importer.
- Search keywords: heartbeat, in progress, import running, stale import, liveness, partially imported search, progress ping
- Location: `limelight_importer_run_importer_shared` `dao/Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter` (`saveOrUpdate_ForSearchId`, `delete_ForSearchId`, `delete_Entries_LastUpdatedAWhileAgo`).
- Used by: importer `ImporterCoreEntryPoint`, `ProcessLimelightInput`, `ProcessReportedPeptidesAndPSMs`, `ProcessPSMsForReportedPeptide`, `SearchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records` (pings during long auto-commit bulk inserts); run importer `ProcessSubmittedImport` (stale purge); cleanup module deletes rows for removed searches.
- How to use / extend: call `saveOrUpdate_ForSearchId` periodically inside long loops of a new import step.
- Do not use when: tracking job or daemon liveness — use the queue tables / A6.
- Limits and gotchas: no Java code READS the heartbeat to decide anything (grep found only writes/deletes); stuck-import detection in cleanup uses `search_tbl.last_modified_date_time` > 10 days instead (F4).
- Related / duplicates: A6.
- Status: verified

### B7. Import / pipeline work directory and per-job subdirectory naming (shared)
- What it solves: find and validate the importer work directory (from `config_system_tbl`) and build the zero-padded per-job subdirectory name used by the webapp (writes uploads), the importer (reads), and the cleanup threads (delete).
- Search keywords: work directory, import dir, temp dir, upload dir, import_dir_for_id, scratch directory for job, pipeline run base dir
- Location: `limelight_shared_code` `file_import_limelight_xml_scans/utils/Limelight_XML_ImporterWrkDirAndSbDrsCmmn` (`get_Limelight_XML_Importer_Work_Directory`, `validate_...`, `getDirForImportTrackingId` -> `import_dir_for_id_0000123`; config key `file_import_limelight_xml_scans_TEMP_DIR_KEY`); `file_import_limelight_xml_scans/constants/FileUploadCommonConstants` (`UPLOAD_FILE_TEMP_BASE_DIR`, `IMPORT_BASE_DIR`, `IMPORT_DIR_FOR_ID`); `file_import_pipeline_run/constants/FileImportPipelineRunCommonConstants` (`IMPORT_AND_PIPELINE_RUN__BASE_DIR`).
- Used by: run importer `ProcessSubmittedImport`, `ImportFiles_DelayedRemoval_Main`, `ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main`, `ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main`; webapp upload controllers (22 users total).
- How to use / extend: singleton `getInstance()`; throws if the config key is empty or the directory does not exist. A new job type that writes into the pipeline base dir under its tracking id gets the E1 cleanup for free.
- Do not use when: non-import scratch space, or permanent results (use File Object Storage, [storage_files_external_services.md](storage_files_external_services.md)).
- Limits and gotchas: reads config through `ConfigSystemTableGetValueCommon`, which must be initialized in the running module first. The webapp's quick check `IsLimelightXMLFileImportFullyConfigured` only tests the key is non-blank (not that the dir exists).
- Related / duplicates: webapp upload temp-dir helper `Limelight_XML_Importer_Work_Directory_And_SubDirs_Web` ([storage_files_external_services.md](storage_files_external_services.md)).
- Status: verified

---

## C. Running jobs as child processes

### C1. Run a child program as a separate process (`RunSystemCommand`)
- What it solves: run an external command (e.g. `java -jar importer.jar --run_id=N -c config`) in a working directory, stdout/stderr redirected to files, wait for exit, report exit code; `shutdown()` from another thread destroys the child and flags the response as shutdown-requested.
- Search keywords: ProcessBuilder, spawn process, exec, child process, run command, external program, subprocess, kill child, exit code, sysout syserr file
- Location: `limelight_run_importer` `run_system_command/RunSystemCommand.runCmd(commandList, dir, sysoutFile, syserrFile, throwOnFailure)`, `RunSystemCommandResponse` (`isCommandSuccessful`, `getCommandExitCode`, `isShutdownRequested`).
- Used by: `ProcessSubmittedImport` (importer jar and the optional "command run on successful import"), `ProcessSubmittedImportOrPipelineRun` (feature-detection jar). No other users (only `ProcessBuilder` user in the repo).
- How to use / extend: `RunSystemCommand.getInstance()` (new object per command; single-use after shutdown); keep it in a volatile field so your `shutdown()` can call `runSystemCommand.shutdown()`.
- Do not use when: in the webapp (no equivalent; long-running work should go through a queue).
- Limits and gotchas: deletes existing sysout/syserr files first; stdin opened and closed, never written. No timeout — `waitFor()` blocks until exit or `shutdown()`. Lives only in this module; move it to a shared library before using elsewhere.
- Related / duplicates: none.
- Status: verified (re-checked)

### C2. Process one queued job: launch child, reconcile status, notify webapp, clean files (`ProcessSubmittedImport` / `ProcessSubmittedImportOrPipelineRun`)
- What it solves: per-job lifecycle: verify the job's work directory and jar exist, build the command line from config, run it, on shutdown set the job RE_QUEUED, if the child left status STARTED mark it FAILED (SYSTEM_ERROR), clear the in-progress search heartbeat, call the webapp "job finished" webservice with retries, optionally run a site command with the new search id, then delete uploaded files if configured.
- Search keywords: process submitted import, job lifecycle, mark failed, system error, re-queue on shutdown, retry with backoff, command run on successful import, import finished hook, dispatch on request type
- Location: `limelight_run_importer` `process_submitted_import/ProcessSubmittedImport` (`processSubmittedImport`, `markImportTrackingAsFailed`, `deleteUploadedFilesIfConfiguredAndStatusSuccess`); `process_submitted_import_or_pipeline_run/ProcessSubmittedImportOrPipelineRun` (dispatches on `FileImportAndPipelineRun_RequestType`).
- Used by: `GetImportAndProcessThread`, `ImportAndPipelineRun_Thread`.
- How to use / extend: new pipeline job type = new enum value + branches in `ProcessSubmittedImportOrPipelineRun` — it has TWO `if requestType == ...` blocks (jar selection and DB-config arg), both throw on an unknown type — plus config keys for the new jar (A2). The child gets only `--run_id` (C5) and `-c <db config>`; it reads everything else from the DB.
- Do not use when: n/a.
- Limits and gotchas: retry schedule is hand-rolled (1-minute steps, then 20, then 90; gives up after 10 for the webservice call) and duplicated in several methods. Calls the cleanup detector's `importerIsRunning_Start/End` so DB cleanup pauses during a job (see F5 for the shared-flag caveat). `ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main` is also called after each import.
- Related / duplicates: the two Process* classes are parallel copies.
- Status: verified (import path fully; pipeline path partly) (re-checked)

### C3. Run-Importer-launched Java program skeleton (importer and feature-detection importer `main`)
- What it solves: the `main` of a child program: parse CLI (jargs), load config, build the DB connection factory, wire shared-code DB + config access, check schema version, register a JVM shutdown hook, dispatch, and on every outcome write the final status (COMPLETE / FAILED + sub-status + end-user message) back to the queue rows; typed exit codes.
- Search keywords: importer main, CLI program, command line, run id, exit code, shutdown hook, schema version mismatch, job program, child process, queue job status, failed message to user
- Location: `limelight_importer` `program/LimelightImporterProgram` (`main`, nested `ImportProgramShutdownThread`; exit codes `constants/ImporterProgramExitCodes`); copy `limelight_feature_detection_run_import` `program/Limelight_FeatureDetection_Run_Import_Program` (args `-c <config>`, `--<RUN_IMPORTER_PARAMS_RUN_ID>`; shutdown hook sets `setShutdownRequested(true)` on both core entry points and closes DB connections).
- Used by: launched by C2; importer also run by hand.
- How to use / extend: init order: config file -> `DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables` -> `ImportRunImporterDBConnectionFactory.getMainSingletonInstance().initialize(...)` -> `SharedCodeOnly_DBConnectionProvider.setSharedCodeOnly_DBConnectionProvider_Provider_IF(...)` -> `ConfigSystemTableGetValueCommon.getInstance().setIConfigSystemTableGetValue(ConfigSystemDAO_Importer.getInstance())` -> config-completeness check -> schema-version check (A3) -> dispatch -> status via `UpdateTrackingTrackingRunRecordsDBTransaction` (B1) or `Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction` (B2). For a third program (e.g. quant), extract the shared skeleton into `limelight_importer_run_importer_shared` instead of a third copy.
- Do not use when: n/a.
- Limits and gotchas: the feature-detection module copied about 35 importer classes (exceptions, exit codes, constants, `ImportResults`, `IsImportingAllowForProject`, `SHA1SumCalculator`, `UnmarshalJSON_ToObject`...), about 15 of which are unreferenced there; `ProcessFileImportSubmission` exists in both with unrelated content. Feature-detection help text documents a `-p project_id` option the parser does not define. Possible defect (code reading): a missing `--run_importer_params_run_id` only prints an error and continues, later passing a null `Integer` to an `int` parameter (NPE, untested). In the importer the shutdown flag (`ImporterCoreEntryPoint.shutdownRequested`) is read only in the exception handler to suppress error output; it is not checked to stop processing.
- Related / duplicates: the two program classes; DB connection factory ([data_access.md](data_access.md)).
- Status: verified

### C4. Background program -> webapp "job finished" callback (JAXB XML over HttpURLConnection)
- What it solves: tell the webapp a job finished so it can send the completion email (to the submitting user and configured extra recipients).
- Search keywords: callback, notify webapp, import finish, send email on import complete, job done hook, HttpURLConnection, JAXB marshal, XML webservice client
- Location: client `limelight_run_importer` `on_import_finish/On_ImportLimelightXMLScanFile_Finish_CallWebService.callLimelightWebServiceOnSingleImportFinish` and `On_ImportOrRunPipeline_Finish_CallWebService.callLimelightWebServiceOnSingle_ImportOrRunPipeline_Finish`; error type `exceptions/LimelightCallWebserviceOnImportFinishException`. Shared body `limelight_shared_code` `file_import_limelight_xml_scans/run_importer_to_web_app_objects/RunImporterToWebAppOnComplete_Request` (trackingId, runId) / `_Response` (statusSuccess). Server `limelight_webapp` `RunImporter_ImporterFinish_RestWebserviceController`, `RunImporter_ImporterOrRunPipeline_OtherThan_ImportLimelightXMLScanFiles__Finish_RestWebserviceController` -> `SendEmailForRunImportFinishService` / `SendEmailForRunImportFinish_ImportOrRunPipeline_Service` -> `SendEmail_Extra_On_ImportFinish_ToConfiguredEmail`.
- Used by: `ProcessSubmittedImport`, `ProcessSubmittedImportOrPipelineRun`.
- How to use / extend: reuse the request/response objects for any "background process tells webapp it is done" call. Server unmarshals with `Unmarshal_RestRequest_XML_ToObject`; the client parses the response with `XMLInputFactory_XXE_Safe_Creator` (use that factory for any XML parsing). Skipped entirely when config key `limelight.web.app.base.url` is empty. A new job type with its own email text should extend the pipeline variant.
- Do not use when: Java 8 code or a remote client — see the submit-import client connector ([storage_files_external_services.md](storage_files_external_services.md)).
- Limits and gotchas: the two client classes are byte-for-byte copies except name/URL; the two email services are forked copies using the same config keys. URL paths are hard-coded literals with "keep in sync with `AA_RestWSControllerPaths_Constants`" comments (rename silently breaks). Hand-rolled retry in C2.
- Related / duplicates: other hand-written HTTP clients (D2, blib, submit connector) — no shared outbound-HTTP helper ([storage_files_external_services.md](storage_files_external_services.md)).
- Status: verified (client side and shared objects; webapp side by grep and call-site reading) (re-checked)

### C5. Run Importer -> child program command-line parameter names
- What it solves: one shared constant for the parameter the run importer passes when spawning the importer / feature-detection importer (the tracking run id).
- Search keywords: spawn importer, command line parameter, run id parameter, child process args
- Location: `limelight_importer_run_importer_shared` `constants/RunImporterToImporterParameterNamesConstants.RUN_IMPORTER_PARAMS_RUN_ID`.
- Used by: `ProcessSubmittedImport`, `ProcessSubmittedImportOrPipelineRun`, `LimelightImporterProgram`, `Limelight_FeatureDetection_Run_Import_Program`.
- How to use / extend: add new spawn-time parameters here so both sides share one constant.
- Do not use when: n/a.
- Limits and gotchas: older parameters are commented out in the file.
- Related / duplicates: none.
- Status: verified

---

## D. Feature-detection run-and-import (template for "drive an external pipeline, then import")

### D1. Feature-detection run-and-import program
- What it solves: a separate runnable jar the run importer launches per queued B2 request. It either (a) imports user-uploaded Hardklor + Bullseye result files, or (b) submits a Hardklor/Bullseye run to an external feature-detection service, polls it to completion, then imports the result files the service wrote to a shared directory.
- Search keywords: feature detection, Hardklor, Bullseye, pipeline run, run and import, external service, submit and poll, MS1 features, import_and_pipeline_run, child process, runnable jar, quant pipeline template
- Location: `limelight_feature_detection_run_import`: `program/Limelight_FeatureDetection_Run_Import_Program` (C3), `process_file_import_submission/ProcessFileImportSubmission` (dispatch: RUN_AND_IMPORT -> `run_and_import__import__core_entry_points/Run_And_Import_CoreEntryPoint.process`, IMPORT -> `Import_CoreEntryPoint.process`); parsers `import_files_to_db/ImportFile_Hardklor_Results`, `ImportFile_Bullseye_Results`, `ImportFile_{Hardklor,Bullseye}_Conf_File`; mapping `insert_mapping_singular_persistent_to_db/Insert_Mapping_Singular_Persistent_ToDB` (persistent-to-singular feature link: +/- 10 ppm on stored masses, RT window +/- 30 s; no mass computation).
- Used by: run importer `ProcessSubmittedImportOrPipelineRun` (jar `ImporterRunnerConfigData.getFeatureDetectionImporterAndPipelineRun_JarWithPath()`, `_DbConfigWithPath()`, `getFeatureDetectionProgram_JavaExecutableParameters()`); enqueued by webapp `Project_FeatureDetection_Run_And_Import_Request_Submit_RestWebserviceController`, `Project_FeatureDetection_Import_Request_*`; built by root `ant__build_all_limelight.xml`.
- How to use / extend: closest template for a future quant-run pipeline: submit -> poll -> progress message -> cancel on shutdown (D2) -> import result files -> write final status. Pull shared pieces into `limelight_importer_run_importer_shared` rather than copying the module.
- Do not use when: importing Limelight XML / scan files (`limelight_importer`).
- Limits and gotchas: MS1 scan validation fails loudly (missing scan or RT drift > 0.001 min throws `LimelightImporterDataException`) — consistent with the repo's matching rule. Bullseye MS2 per-entry parse failures only log a warning (silently skipped). Batch inserters are static singletons (one import per JVM — fine for a child process, wrong in the webapp). Two id-range reservation implementations inside the module. Project enabled/locked/marked-for-deletion checks are inlined in both core entry points (the copied `IsImportingAllowForProject` is never called). The all-MS1-scans spectral-storage call throws on "too many scans" instead of batching (inferred, untested for very large files). Local-file-or-S3 reading + `S3Client` construction is hand-rolled in 5 classes.
- Related / duplicates: C3; spectral-storage client copy and SHA line reader ([storage_files_external_services.md](storage_files_external_services.md)); id-range reservation ([data_access.md](data_access.md)).
- Status: verified (core flow, Hardklor parser, mapping read; Bullseye per-field parse and conf importers skimmed)

### D2. Submit / poll / cancel client for an external job service (JSON over HttpURLConnection)
- What it solves: call an external job service: submit a job, poll status, cancel on shutdown; a generic "send byte array or file as stream, get byte[] response" POST helper with a rich exception (URL error, HTTP status, error-stream contents). The poll loop writes queue position / service message into the job's user-visible progress text.
- Search keywords: webservice client, HTTP POST, submit job, poll status, cancel request, external service, request_id, queued processing success error, progress message, long-running external job
- Location: `limelight_feature_detection_run_import` `run_feature_detection_service_communication/RunFeatureDetectionService_Communication` (`call_Submit_Webservice` -> `/requestFeatureDetectionRun`, `call_GetStatus_Webservice` -> `/requestFeatureDetectionRunStatus`, `call_CancelRequest_Webservice` -> `/cancelFeatureDetectionRunRequest`, private `sendToServerSendByteArrayOrFileAsStream_GetByteArrayResponseFromServer`); `RunFeatureDetectionService_{SubmitRequest,GetStatus,CancelRequest}_{Send,Receive}Object`; `exceptions/LimelightImporter_RunFeatureDetection_Communication_Exception`. Poll loop in `Run_And_Import_CoreEntryPoint.process`: every 5 s (`CHECK_RUN_PIPELINE_STATUS_WAIT_TIME__IN_MILLISECONDS`, via `wait()` so `setShutdownRequested` can `notify()`), progress text via `FileImportAndPipelineRunTrackingRun_Importer_RunImporter_DAO.updateStatusResultTexts` (`in_progress_end_user_display_message`), final `"error"` -> `LimelightImporter_PipelineRunErrorResult_Exception` (sub-status PIPELINE_RUN_ERROR, service message shown to user).
- Used by: `Run_And_Import_CoreEntryPoint` only.
- How to use / extend: copy the submit -> poll -> progress -> cancel-on-shutdown structure for any long external job. Base URL and result path come from config keys (D3).
- Do not use when: calling Limelight's webapp (C4) or spectral storage (use its client wrappers, [storage_files_external_services.md](storage_files_external_services.md)).
- Limits and gotchas: sends Jackson JSON but sets `Content-Type`/`Accept` to `application/xml` (observed in source; the service tolerates it). No retry on transient HTTP failure. Status strings are bare literals; unknown values fall to the else branch. Bottom about 300 lines (response-code handling) only skimmed.
- Related / duplicates: same-named POST helper in `limelight_submit_import_client_connector` `CallSubmitImportWebservice` and both C4 client classes (bodies not compared).
- Status: verified

### D3. Feature-detection config keys (config_system table)
- What it solves: gate + settings for running feature detection: service base URL, and the base path where the service writes results.
- Search keywords: feature detection config, Hardklor Bullseye URL, result files base path, fully configured, pipeline config
- Location: `limelight_feature_detection_run_import` `config/GetFeatureDetectionConfigFromConfigTable` (`fullyConfigured_FeatureDetection`, getters); keys `limelight_shared_code` `config_system_table_common_access/ConfigSystemsKeysSharedConstants` (`RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_WEB_SERVICE_BASE_URL`, `RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_RESULT_FILES_BASE_PATH`); result filenames `FeatureDetection_HardklorBullseye_RunResult_Filenames_Constants` (shared).
- Used by: the program, `Run_And_Import_CoreEntryPoint`, `RunFeatureDetectionService_Communication`; webapp `Project_ScanFiles_In_Project_List_RestWebserviceController`, `Project_FeatureDetection_Runs_In_Project_List_RestWebserviceController` read the URL key.
- How to use / extend: read via `ConfigSystemDAO_Importer.getInstance().getConfigValueForConfigKey(...)`; a new pipeline adds its own pair of shared keys.
- Do not use when: n/a.
- Limits and gotchas: results are read from `<RESULT_FILES_BASE_PATH>/<projectId>/<requestId>/<filename>` — the program and the service must share that filesystem (no HTTP download).
- Related / duplicates: config system access ([build_deploy_config.md](build_deploy_config.md)).
- Status: verified

### D4. Root + project-mapping + "fully inserted" crash-safety pattern (feature detection; gold standard is the twin)
- What it solves: data layout for a per-scan-file derived dataset: a root row (`entry_fully_inserted` flag), child rows, per-uploaded-file stats rows (filename, size, SHA-1, SHA-384, `file_fully_inserted`), and a per-project-scan-file mapping row inserted LAST. Incomplete or unmapped roots are garbage-collected by DB cleanup (F7).
- Search keywords: root record, fully inserted flag, partial insert, crash safety, project scan file mapping, uploaded file stats, conf file stored in DB, derived dataset per scan file
- Location: `limelight_feature_detection_run_import` DAOs `FeatureDetectionRootDAO` (`save`, `set_True_EntryFullyInserted`), `FeatureDetectionRoot_ProjectScanFile_Mapping_DAO`, `FeatureDetection_OtherUploadedFile_LikeConf_DAO`, `FeatureDetection{Singular,Persistent}FeatureUploadedFileStatsDAO`; tables `feature_detection_root_tbl`, `feature_detection_root__project_scnfl_mapping_tbl`, `feature_detection_other_uploaded_file_like_conf_tbl`, stats tables; DTOs in `limelight_shared_code` `dto/FeatureDetection*DTO`.
- Used by: the two core entry points; readers in webapp `FeatureDetection_Root_*_Searcher`; cleanup `remove_feature_detection/*`.
- How to use / extend: "insert root with flag false -> insert children -> set flag true -> insert project mapping"; then copy the matching cleanup pair (F7). Suggested shape for future per-scan-file datasets such as quant runs.
- Do not use when: storing large files (conf files go in the DB here; large artifacts belong in File Object Storage, [storage_files_external_services.md](storage_files_external_services.md)).
- Limits and gotchas: possible defect (code reading): `FeatureDetection_OtherUploadedFile_LikeConf_DAO.set_uploaded_file_sha1_sum_sha384_sum` / `set_True_FileFullyInserted` UPDATE the persistent-feature stats table, and `FeatureDetectionRoot_ProjectScanFile_Mapping_DAO.set_True_EntryFullyInserted` UPDATEs the root table (copy-paste slips) — all unused, so dormant; do not call them. The root is per scan file and shared across projects via the mapping table.
- Related / duplicates: gold-standard root/mapping model; webapp has a different class with the same name `FeatureDetectionRoot_ProjectScanFile_Mapping_DAO`.
- Status: verified (table names and methods from DAO source; webapp readers by grep)

---

## E. Work-directory and uploaded-file cleanup

### E1. Upload / import work-directory cleanup (delayed removal thread, keep-last-two, orphan dirs)
- What it solves: once a day, delete per-job work directories (and their S3 objects) for finished jobs older than 3 days, stuck/never-started jobs older than 15 days, all but the newest 2 COMPLETE and newest 2 FAILED (keeping SYSTEM_ERROR failures), directories with no tracking row untouched for 5 days, and temp-upload directories older than 1 day. Runs for both queues.
- Search keywords: delete old files, cleanup work directory, retention, delayed removal, purge uploads, orphan directories, keep last two, disk cleanup, temp file cleanup
- Location: `limelight_run_importer` `import_files_delayed_removal_thread/ImportFiles_DelayedRemoval_Thread` (24 h loop), `import_files_delayed_removal_main_and_searcher/ImportFiles_DelayedRemoval_Main` (+ searchers), `import_files_remove_success_failed_except_last_2_main_and_searcher/ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main` (+ searchers), `import_and_pipeline_run__cleanup_dirs_files/ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main`, `ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main` (+ searchers). Layout from B7.
- Used by: `ManagerThread` (started after first successful DB access); `ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main` also called by `ProcessSubmittedImport` after each import.
- How to use / extend: a new job type writing into the pipeline base dir under its tracking id gets this for free. Import-queue mains are gated by system config keys `ConfigSystemsKeysSharedConstants.IMPORT_DELETE_UPLOADED_FILES` and `IMPORT_DELETE_UPLOADED_FILES__ALL_AFTER_3_DAYS` Pipeline-queue mains (`ImportAndPipelineRun_*_Main`) do not reference these keys (grep), so they are not gated by them.
- Do not use when: the files are permanent results — this deletes whole job dirs.
- Limits and gotchas: 3 s wait between directory deletes. The 3-day check uses `DATE(NOW())` (date-granular). Each "Main" is a singleton whose `keepRunning` is set false by `shutdown()` and never reset, so after a thread replacement those singletons may stay stopped (inferred, untested). Not stopped by pause.
- Related / duplicates: import-queue and pipeline-queue cleanups are parallel copies.
- Status: verified (import queue); pipeline-queue variants read in part

### E2. Delete a job's uploaded S3 objects (AWS SDK v2)
- What it solves: delete the S3 objects recorded on a job's single-file rows, skipping externally provided objects unless flagged delete-after-import; region from the row, else config key `file_import_limelight_xml_scans_AWS_S3_REGION_KEY`, else SDK default.
- Search keywords: S3 delete, AWS, DeleteObjectRequest, object storage cleanup, remove uploaded file
- Location: `limelight_run_importer` `import_files__delete_s3_objects_for_db_single_file_records/ImportFiles_Delete_S3Objects_For_DB_SingleFile_Records.delete_S3Objects_For_DB_SingleFile_Records(trackingId)`.
- Used by: `ProcessSubmittedImport.deleteUploadedFilesIfConfiguredAndStatusSuccess`, `ImportFiles_DelayedRemoval_Main`.
- How to use / extend: call with an import-queue (B1) tracking id.
- Do not use when: the pipeline queue (reads `FileImportTrackingSingleFile` rows only).
- Limits and gotchas: possible defect (code reading): builds a new `S3Client` per object and never closes it. The S3 path cannot be exercised in a plain local setup without AWS.
- Related / duplicates: inline copy in `ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main`; webapp deletes S3 objects in `Project_UploadData_V2_UploadFile_Cancel_Delete_RestWebserviceController` and two feature-detection upload controllers; `S3Client.builder()` hand-written in about 23 files ([storage_files_external_services.md](storage_files_external_services.md)).
- Status: verified

### E3. Recursive directory delete (two copies)
- What it solves: delete a directory tree.
- Search keywords: rm -rf, delete folder, remove directory recursively, cleanup files
- Location: `limelight_run_importer` `delete_directory_and_contents/DeleteDirectoryAndContents.deleteDirectoryAndContents(File)` (logs, never throws, no return value); `limelight_webapp` `file_import_limelight_xml_scans/utils/DeleteDirectoryAndContentsUtil` (+`IF`; throws `LimelightInternalErrorException` on first failure).
- Used by: run importer `ProcessSubmittedImport`, `ProcessSubmittedImportOrPipelineRun`, `ImportFiles_DelayedRemoval_Main`, `ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main`, both pipeline cleanup mains; webapp `Project_UploadData_UploadSubmit_RestWebserviceController` only.
- How to use / extend: run importer: `DeleteDirectoryAndContents.getInstance().deleteDirectoryAndContents(dir)`; webapp: inject the IF. `java.nio.file.Files.walk` is the stdlib alternative.
- Do not use when: you need success reporting (run importer copy). Pass only directories Limelight itself created.
- Limits and gotchas: run importer copy NPEs if the dir does not exist (callers check `exists()` first); webapp copy leaves a partial tree on failure.
- Related / duplicates: the two copies behave differently (log vs throw).
- Status: verified

---

## F. DB maintenance: cleanup (hard delete of soft-deleted / failed / orphaned data)

### F1. Nightly maintenance scheduler thread: "populate new fields, then cleanup"
- What it solves: one scheduled background job inside the run importer that (1) backfills newly added DB columns/tables and (2) hard-deletes soft-deleted / failed / orphaned data, without blocking imports.
- Search keywords: nightly job, scheduled maintenance, cron, scheduler, background cleanup, garbage collection, purge, housekeeping, backfill, 22:00, 10pm
- Location: `limelight_run_importer` `database_cleanup__populate_new_fields__thread/Database_PopulateNewFields_Cleanup_RemoveData_Thread` -> `Limelight_DatabasePopulateNewFields__Main_EntryPoint` then `Limelight_DatabaseCleanup__Main_EntryPoint`; connection adapters `db__for__limelight__database_cleanup__common_code__remove_data_from_database/RunImporter__Limelight_DatabaseCleanup__DBConnectionProvider_Provider`, `db__for__limelight__database_populate_new_fields__common_code/RunImporter__Limelight_Database_PopulateNewFields__DBConnectionProvider_Provider`.
- Used by: `ManagerThread` (starts / replaces the thread); the thread is the ONLY caller of both `Main_EntryPoint`s. Disabled by config `database.cleanup.disable` / env `LIMELIGHT_DATABASE_CLEANUP_DISABLE` = `true`.
- How to use / extend: new maintenance logic goes into one of the two common-code modules and is called from its `Main_EntryPoint` — do not add a third thread. Cleanup order matters: file_import_tracking -> gold standard -> feature detection -> project_search -> search -> shared orphans -> project.
- Do not use when: work must happen synchronously for a user request (G2), or per import (belongs in the importer).
- Limits and gotchas: runs once at start for the first thread instance, then waits until 22:00 the next day (adds a day if that is under 8 h away; spot-checked in code). A replacement thread skips its first run unless more than a week has passed since the last run. Shared-table orphan GC is forced every 36 days even when no search was deleted. Schedule uses `Calendar` in the JVM's local time zone. Uses its OWN `ImportRunImporterDBConnectionFactory.get_New_Instance()` so the main loop's `closeAllConnections()` doesn't kill it. Daemon thread (`setDaemon(true)`). Stopped by pause (A4). Also logs queued/started job counts.
- Related / duplicates: other run importer periodic threads (E1).
- Status: verified (re-checked)

### F2. Injected JDBC connection provider for library modules (Provider_IF + singleton holder)
- What it solves: lets a plain-Java library module run SQL without depending on the host's pool; the host injects a `getConnection()` provider at startup.
- Search keywords: DB connection injection, DataSource adapter, connection provider, dependency injection without Spring, shared library DB access, initialize library
- Location: cleanup `limelight__database_cleanup__common_code__remove_data_from_database` `common/database_connection/Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode` + `Limelight_DatabaseCleanup__DBConnectionProvider_Provider_IF`; populate `limelight__db_populate_new_fields__common_code` `common/database_connection/Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode` + `..._DBConnectionProvider_Provider_IF`; shared code's own `SharedCodeOnly_DBConnectionProvider` ([data_access.md](data_access.md)).
- Used by: run importer adapters (F1; set in the thread's `run()`); webapp `init_populate_new_db_fields_shared_code_lib/Initialize_PopulateNewDBFields_SharedCodeLibrary` (on Spring `ContextRefreshedEvent`) with `PopulateNewDBFields_SharedCode_DBConnectionProvider` (extends `Limelight_JDBC_Base`); webapp `init_shared_code_lib/InitializeSharedCodeLibrary` for shared code.
- How to use / extend: implement the `_IF`, call `getSingletonInstance().set...(impl)` once at host startup before any library call. New library module = provider interface in the library + implementation in each host + setter call at startup.
- Do not use when: inside `limelight_shared_code` (use `SharedCodeOnly_DBConnectionProvider`).
- Limits and gotchas: unset provider -> `IllegalStateException("...Not Set")` at first query. The populate module ALSO calls shared-code tracking DAOs (G1) that use `SharedCodeOnly_DBConnectionProvider`, so a host must initialize BOTH. Webapp providers are set on `ContextRefreshedEvent`, so library code called earlier fails. Populate holder Javadoc wrongly says "Used only by DB Cleanup Code" (copy-paste).
- Related / duplicates: copied per module; two DB-connection injection interfaces (shared + populate).
- Status: verified

### F3. Batched "DELETE ... LIMIT n until 0 rows" helper
- What it solves: delete very large row sets in small chunks so locks/undo stay small and the webapp keeps working.
- Search keywords: chunked delete, batch delete, delete in batches, LIMIT loop, large table purge, avoid long lock
- Location: `limelight__database_cleanup__common_code__remove_data_from_database` `remove__general_removal_dao/Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.execute_SQL_Until_NoRecordsUpdated(sql, tableLabel, callFrom)`.
- Used by: `Delete_Single_Search_And_Children` (about 40 call sites), `Delete_Single_Search__PSM_Table_And_Children` (`psm_tbl`), `Remove_MarkedDeleted__file_import_tracking_tbl`, `Cleanup_ProjectTbl`. (Gold-standard / feature-detection cleanups do not use it.)
- How to use / extend: pass a full `DELETE ... WHERE ... LIMIT N` string; loops until `executeUpdate()` returns 0 or shutdown is requested.
- Do not use when: you need a transaction or a row count back (void).
- Limits and gotchas: checks the yield/shutdown detector (F5) before every batch (200 ms pause each). Shutdown leaves partial deletes by design (rerun next night).
- Related / duplicates: two more batching variants: PSM child delete (`psm_id IN (...)` batches) and shared-table id-range + LIMIT deletes (F6).
- Status: verified (re-checked)

### F4. Hard delete of a search and all its per-search rows
- What it solves: physically removes a search (`search_tbl` + about 40 child tables + PSM tables) once no `project_search_tbl` row references it.
- Search keywords: delete search, purge search, cascade delete, remove search data, soft delete then hard delete, DELETION_IN_PROGRESS, failed import cleanup
- Location: cleanup module `remove_deleted__searches_projects/main/Limelight_DatabaseCleanup__Cleanup_SearchTbl_And_Children` -> `Limelight_DatabaseCleanup__Delete_Single_Search_And_Children.delete_Single_Search` -> `Limelight_DatabaseCleanup__Delete_Single_Search__PSM_Table_And_Children`; selection `searcher/Limelight_DatabaseCleanup__SearchIdsToDeleteSearcher`; `dao/Limelight_DatabaseCleanup__SearchDAO`.
- Used by: `Limelight_DatabaseCleanup__Main_EntryPoint` only.
- How to use / extend: WHEN YOU ADD A NEW PER-SEARCH TABLE (keyed by `search_id` or `psm_id`), ADD A DELETE BLOCK HERE unless an FK `ON DELETE CASCADE` from `search_tbl`/`psm_tbl` covers it. PSM-child tables are deleted in `psm_id IN (...)` batches sized `5000 / annotationTypesCount`; some are skipped based on search flags (`has_search_sub_groups`, `any_psm_has__psm_peptide_position_annotation`) and per-PSM flags (mods / open mods / reporter ions).
- Do not use when: you want a user-facing delete — the webapp deletes `project_search_tbl` rows (`DeleteProjectSearchIds_UsingDBTransactionService`, which also deletes saved views and experiments for that projectSearchId); this runs later. A whole project is only soft-marked by the webapp (`ProjectMarkForDeletion_UsingDBTransactionService`).
- Limits and gotchas: selection = no `project_search_tbl` row AND (status not IMPORTING / IMPORTING_WAITING_FOR_SCAN_FILE_IMPORTS, or importing and `last_modified_date_time` > 10 days old). Sets status `DELETION_IN_PROGRESS` first. 2 s sleep after each search. Loads ALL PSM ids of the search into memory. Two tables appear twice in the delete list (harmless). Does NOT touch `scan_file_tbl`, `project_scan_file_tbl`, File Object Storage or spectral storage (only `search_scan_file_tbl` rows) — see `limelight_features_docs/project_scan_file_attachment_model_and_search_delete_cleanup.md`.
- Related / duplicates: webapp Scan-Files-tab delete and copy-search rollback also delete rows ([data_access.md](data_access.md)).
- Status: verified

### F5. Cooperative yield-to-importer + shutdown detection
- What it solves: lets long-running maintenance pause while an import runs, insert a small breather between statements, and stop promptly on shutdown.
- Search keywords: pause while importer running, yield, throttle, shutdown requested, cooperative cancellation, stop flag, wait/notify, importer is running
- Location: cleanup module `shutdown_requested_detection/Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection` (`waitForImporterRun_And_IsShutdownRequestReceived()`, `importerIsRunning_Start/End()`, `shutdownRequestReceived()`, `thread_RunMethod_Entered()`). Near-identical copy `Limelight_DatabasePopulateNewFields__WaitForImporterRun_And_ShutdownRequestedDetection` (dead).
- Used by: (cleanup copy) run importer `ProcessSubmittedImport`, `ProcessSubmittedImportOrPipelineRun`, `GetImportAndProcessThread`, `ImportAndPipelineRun_Thread` (importer start/end); `Database_PopulateNewFields_Cleanup_RemoveData_Thread` (shutdown, run-entered); every cleanup loop and F3.
- How to use / extend: call `waitForImporterRun_And_IsShutdownRequestReceived()` before each unit of DB work; return/break if true. Host signals importer start/end and shutdown.
- Do not use when: you need a real job lock or a cross-process signal — in-JVM only (run importer process).
- Limits and gotchas: each call waits 200 ms when not shutting down (built-in throttle). Constant `TWO_MINUTES__IN_MILLISECONDS` is actually `2*60*60*1000` = 2 HOURS (max wait per loop iteration while an import runs). The POPULATE copy is never signaled or called, so populate-new-fields does NOT yield to imports or stop on shutdown. Possible defect (code reading, untested): the "importer running" flag is ONE boolean shared by both queue workers, and each worker calls `importerIsRunning_End` when it starts — if a pipeline run ends (or a worker is replaced) while a search import is still running, the flag is cleared and cleanup can proceed during that import.
- Related / duplicates: populate copy (dead); A4/A5 stop mechanisms.
- Status: verified (re-checked)

### F6. Orphan GC of data shared across searches (peptide, reported peptide, protein sequence/version/annotation)
- What it solves: removes rows in global de-duplicated tables no longer referenced by any search.
- Search keywords: orphan cleanup, unreferenced rows, shared tables, garbage collect, last_used_in_search_import, dedup table cleanup
- Location: cleanup module `remove_data_shared_across_searches_that_is_unused/Limelight_DatabaseCleanup__Cleanup__Data_SharedAcross_Searches_ThatIs_Unused` -> five `<Table>_Cleanup` + `<Table>_DAO_Searcher` pairs (`PeptideTbl`, `ReportedPeptideTbl`, `ProteinSequenceTbl`, `ProteinSequenceVersionTbl`, `ProteinSequenceAnnotationTbl`). Template: `Limelight_DatabaseCleanup_PeptideTbl_Cleanup` / `_DAO_Searcher`.
- Used by: `Limelight_DatabaseCleanup__Main_EntryPoint` (only when a search was deleted, every 36 days forced, or list mode).
- How to use / extend: copy one pair: `DELETE t FROM t INNER JOIN (SELECT id ... LEFT JOIN referrer ... WHERE referrer IS NULL AND last_used_in_search_import < NOW()-1 day AND id in (start,end] LIMIT ?) ...`, walking id blocks of 5000 up to `MAX(id)`, 500 rows per call, throttled via F5.
- Do not use when: the table has no `last_used_in_search_import`-style recency column — without it you race a concurrent import that just inserted/reused the row.
- Limits and gotchas: protection against in-flight imports relies on the importer calling `update_last_used_in_search_import` on peptide / reported peptide / protein DAOs (1-day window); ANY new get-or-insert of shared rows must do the same. Order matters (annotation -> version -> sequence -> peptide -> reported peptide).
- Related / duplicates: five near-identical pairs.
- Status: verified (peptide pair read; other four skimmed for same shape)

### F7. Root-record GC for failed / unattached uploads (gold standard, feature detection)
- What it solves: removes upload root rows whose insert never finished (after N days) or that are fully inserted but no longer mapped to any project scan file.
- Search keywords: failed upload cleanup, entry_fully_inserted, not mapped to project, partial insert cleanup, abandoned upload
- Location: cleanup module `remove_gold_standard/Limelight_DatabaseCleanup__Cleanup_GoldStandardRoot_Root` (+ `_FailedToImport`, `_NotMappedToProject`, searchers, `GoldStandard_Delete_DAO`); `remove_feature_detection/Limelight_DatabaseCleanup__Cleanup_FeatureDetectionRoot_Root` (+ same shape, `FeatureDetection_Delete_DAO`).
- Used by: `Limelight_DatabaseCleanup__Main_EntryPoint`.
- How to use / extend: for a new "root + children + project mapping" upload type (D4), copy this pair: delete children by root id, then the root; select by `entry_fully_inserted` / `*_date_time` + LEFT JOIN on the `__project_scnfl_mapping_tbl`.
- Do not use when: data is per search (F4).
- Limits and gotchas: relies on the inserter setting `entry_fully_inserted`. DB rows only — no file-storage cleanup.
- Related / duplicates: the two packages are parallel copies.
- Status: unverified (structure and selection SQL read; child-delete ordering not read line by line)

### F8. Soft-delete selection rules: project_search_tbl and project_tbl grace periods
- What it solves: decides which failed / marked links and projects are old enough to physically remove.
- Search keywords: marked_for_deletion, grace period, IMPORT_FAIL, delete project, retention days, soft delete
- Location: cleanup module `searcher/Limelight_DatabaseCleanup__ProjectSearchIdsToDeleteSearcher` + `main/Limelight_DatabaseCleanup__Cleanup_ProjectSearchTbl_And_Children` (one `project_search_tbl` row at a time; children via FK); `searcher/Limelight_DatabaseCleanup__ProjectIdsToDeleteSearcher` + `main/Limelight_DatabaseCleanup__Cleanup_ProjectTbl`.
- Used by: `Limelight_DatabaseCleanup__Main_EntryPoint`.
- How to use / extend: the SQL in the two searchers is the reference for "what counts as deleted": status set {IMPORT_FAIL, IMPORT_CANCELED_INCOMPLETE, MARKED_FOR_DELETION, DELETION_IN_PROGRESS}; stuck imports > 10 days; project `marked_for_deletion` older than N days.
- Do not use when: n/a.
- Limits and gotchas: project_search waits 2 days after project deletion; project waits 4 days (a comment says 2 — stale). 2 s sleep between deletes.
- Related / duplicates: webapp synchronous delete `DeleteProjectSearchIds_UsingDBTransactionService` ([data_access.md](data_access.md)).
- Status: verified (selection SQL read; `Cleanup_ProjectTbl` body skimmed)

### F9. Purge of soft-deleted import-tracking rows
- What it solves: deletes `file_import_tracking_tbl` rows with `marked_for_deletion = 1` and `deleted_date_time` older than 1 day.
- Search keywords: import queue cleanup, file import tracking purge, deleted imports, queue purge
- Location: cleanup module `remove_deleted__file_import_tracking_tbl/Limelight_DatabaseCleanup__Remove_MarkedDeleted__file_import_tracking_tbl.cleanup_Search_AndChildren` (misnamed method).
- Used by: `Limelight_DatabaseCleanup__Main_EntryPoint` (first step).
- How to use / extend: reference for "soft-delete with timestamp, purge later".
- Do not use when: n/a.
- Limits and gotchas: `LIMIT 5` per batch; children assumed handled by FK. Only the B1 queue; no purge of marked-for-deletion `import_and_pipeline_run_tracking_tbl` rows exists (grep of the cleanup module and run importer finds no reference / DELETE).
- Related / duplicates: E1 removes the files on disk/S3.
- Status: verified

### F10. Dry-run ("list ids to delete") and call-site enums
- What it solves: lets the same cleanup code print what it WOULD delete, and log to stdout vs logger depending on caller.
- Search keywords: dry run, preview delete, list only, standalone vs daemon logging
- Location: cleanup module `constants_and_enums/Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum` (DELETE_RECORDS / LIST_RECORD_IDS_TO_DELETE), `..._CallFrom__RunImporter_VS_StandaloneProgram_Enum`, `..._Cleanup_CommonTablesAcrossSearches_Even_WhenNoSearchesRemoved_Enum`; populate has its own `CallFrom` enum.
- Used by: all cleanup classes; run importer always passes `LIMELIGHT__RUN_IMPORTER_PROGRAM` + `DELETE_RECORDS`.
- How to use / extend: thread these enums through new cleanup steps for parity.
- Do not use when: n/a.
- Limits and gotchas: no caller passes `STANDALONE_PROGRAM` or `LIST_RECORD_IDS_TO_DELETE` — the standalone / dry-run path is unexercised; no standalone cleanup program exists in this repo.
- Related / duplicates: none.
- Status: verified

---

## G. Populate new fields (backfill of existing data after a schema change)

### G1. Resumable per-search backfill framework + progress tracking tables
- What it solves: after a schema change adds a column/table, fills it for all existing searches in the background, resumably, newest search first, and marks itself done forever.
- Search keywords: backfill, data migration, populate new column, populate new fields, resumable migration, progress tracking, one-time update, updates_complete, schema upgrade data
- Location: `limelight__db_populate_new_fields__common_code` entry `main_entry_point/Limelight_DatabasePopulateNewFields__Main_EntryPoint`; tracking in `limelight_shared_code` `aa_limelight_db_updates_in_run_imprtr_or_pgm__code/` (`Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO` — `getItem_ForLabelShortKey`, `save` (insert-or-ignore), `update_To_Set_UpdatesComplete`; `..._CompleteForSearch__SharedCode__DAO` — `getItem_ForRootIdSearchId`, `getItemList_For_RootId_SearchIds`, `get_SmallestSearchId_ForRootId`, `save`; `..._Largest_SearchId_LessThanPassedInSearchId__SharedCode__Searcher`; `..._Root__Constants`). Tables `aa_limelight_db_updates_in_run_imprtr_or_pgm_root_tbl` (one row per update, unique `label_short_key`, `updates_complete`) and `aa_limelight_db_updates_in_run_importer_or_pgm_cmplt_fr_srch_tbl` (one row per finished search).
- Used by: F1 (whole DB, nightly); webapp on demand (G2). Concrete MAINs in G3.
- How to use / extend: template `Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl_MAIN` (the protein-coverage MAIN is the other reference): add `LABEL_SHORT_KEY_VALUE___X` / `LABEL_VALUE___X` in `_Root__Constants`; get-or-insert root row; if not complete, start below the smallest already-done search id (or at `MAX(search_tbl.id)`), loop downward skipping done ids, re-check schema version per search, process, insert the complete-for-search row; finally `update_To_Set_UpdatesComplete`. Register the MAIN in `..._Main_EntryPoint`. ALSO make the importer fill the field for new imports.
- Do not use when: the change can be done in plain `database_scripts/version_upgrades` SQL, or the work is not per search.
- Limits and gotchas: only searches with status IMPORT_COMPLETE_VIEW are visited. Does NOT yield to imports or stop on shutdown (F5). Resume logic assumes ids processed strictly descending. Root insert does not return the id (re-read). Mixed connection sources (F2 provider + `SharedCodeOnly_DBConnectionProvider`).
- Related / duplicates: `aa_limelight_db_updates_in_webapp_thread_tbl` and `aa_updates_applied_tbl` exist in the schema but no Java references them (parallel, unused).
- Status: verified (re-checked)

### G2. On-demand (lazy) backfill from a webservice before reading
- What it solves: when a user hits data not yet backfilled by the nightly job, fill just those searches/rows synchronously, then read.
- Search keywords: lazy populate, fill on read, on-demand backfill, ensure populated, populate before read
- Location: `Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__PopulateFor_SearchIds_MAIN` (by search id set; same tracking rows); `Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects` (by explicit `protein_coverage_tbl` rows with null columns).
- Used by: webapp `SearchAnnotationTypeList_From_ProjectSearchIds_RestWebserviceController` (min/max), `ProteinCoverage_PerReportedPeptide_For_ReportedPeptideIds_Single_ProjSearchID_RestWebserviceController` (pre/post residue; re-queries and validates afterward).
- How to use / extend: reference pattern for "check for nulls -> populate -> re-query -> validate".
- Do not use when: the populate is expensive (runs in the request thread).
- Limits and gotchas: no locking against the nightly job doing the same search concurrently; duplicate rows are prevented — `search_level_annotation_min_max_tbl` PK (search_id, annotation_type_id) and complete-for-search PK (root_table_id_fk, search_id), both inserted with `ON DUPLICATE KEY UPDATE` — so the worst case is redundant work. Protein-coverage path logs and continues when a protein sequence is missing (silent partial result).
- Related / duplicates: G1 nightly MAINs.
- Status: verified (call sites read; duplicate-row question resolved via PKs + insert SQL)

### G3. Concrete backfills: `search_level_annotation_min_max_tbl` and `protein_coverage_tbl` pre/post residue
- What it solves: per-search min/max/best/worst per filterable annotation type (PSM, PSM peptide position, modification position, reported peptide, protein); protein pre/post residue and at-start/end flags.
- Search keywords: annotation min max, best worst value, protein pre residue, post residue, peptide at protein start, backfill example
- Location: `limelight__db_populate_new_fields__common_code` `populate_table_search_level_annotation_min_max_tbl/**`, `populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue/**`; residue math reused from `limelight_shared_code` `protein_coverage_common/Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util` (also used by the importer; [domain_utilities.md](domain_utilities.md)).
- Used by: G1, G2.
- How to use / extend: copy as templates; reuse the shared residue util rather than re-deriving.
- Do not use when: n/a.
- Limits and gotchas: possible defect (observed in source, UI impact unverified): `save_MinMax_ToDB` sets best=max, worst=min for BOTH filter directions (the `BELOW` branch equals the default), while the importer (`AnnotationData_MinMax_AccumulationComputation_SingletonInstance`) uses best=min for `BELOW` — so backfilled rows for BELOW-direction annotations (e.g. q-values) likely have best/worst swapped vs imported rows; best/worst are returned to the front end by the min/max webservice.
- Related / duplicates: importer min/max accumulator (parallel computation).
- Status: verified (code read; UI impact unverified)

### G4. Batched UPDATE in a manual transaction (`ProteinCoverageTbl_Update_DAO`) — do not copy
- What it solves: JDBC batch update of many rows by id in one commit, 10000 per call.
- Search keywords: batch update, addBatch, executeBatch, bulk update, manual commit rollback
- Location: `limelight__db_populate_new_fields__common_code` `populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue/dao/Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO.update_Protein_PrePost_Residue_For_Id`.
- Used by: both protein-coverage populate classes.
- How to use / extend: do NOT use as a template (see gotcha).
- Do not use when: in the webapp (use its transaction services, [data_access.md](data_access.md)).
- Limits and gotchas: possible defect (code reading): on exception the rollback retry loop `while(true){ counter++; try { rollback(); } catch { if (counter>6) break; } }` has no `break` after a SUCCESSFUL rollback, so a successful rollback spins forever (only exits after 7 failed rollbacks). Only this file contains `rollbackRetryCounter`.
- Related / duplicates: webapp DB transaction services; importer insert DAOs.
- Status: verified

---

## H. Background work inside the webapp

### H1. Webapp background threads, shutdown flags and async execution
- What it solves: the few background activities inside the webapp and how they are stopped on undeploy: the on-disk webservice-response cache's startup cleanup thread, the (dormant) spectr scan-file-suffix startup fetch thread, and `@Async` cache-file writes.
- Search keywords: webapp background thread, contextDestroyed, undeploy, stop background thread, EnableAsync, @Async, ThreadPoolTaskScheduler, startup thread, shutdown flag, scheduler
- Location: `limelight_webapp` `servlet_context_listener/WebappServletContextListener` (`contextDestroyed` sets `CachedDataInFileMgmt_Remove_Old_CurrentSubdirs.setShutdownRequested` and `SpectralStorageService_Get_Supported_ScanFileSuffixes_At_LimelightStartup__Runnable_InThread.webappShutdownRequested`, then stops Log4j last); `cached_data_in_file/CachedDataInFileMgmt_..._StartCleanupThread`, `CachedDataInFileMgmt_Remove_Old_CurrentSubdirs`, `CachedDataInFileMgmt_WriteFile_Async`; `spectral_storage_service_interface/SpectralStorageService_Get_Supported_ScanFileSuffixes_At_LimelightStartup__StartThread` + `_Runnable_InThread`; `LimelightWebAppThreadConfig` (`@EnableAsync`, 1-thread daemon `ThreadPoolTaskScheduler` bean).
- Used by: container / Spring.
- How to use / extend: a new webapp background thread exposes a static shutdown flag and is stopped in `contextDestroyed`; the spectr suffix thread is a usable template for "fetch from an external service at startup with retries, stop on shutdown". Long or heavy jobs belong in the run importer via a queue (B2), not in the webapp.
- Do not use when: you need Spring beans in the listener (it is not Spring-managed).
- Limits and gotchas: no `@Scheduled` users and the `threadPoolTaskScheduler` bean is never injected; which executor runs the `@Async` write is not configured explicitly (unverified whether it lands on that single thread). The spectr suffix thread's `run()` returns immediately and its setters are commented out, so accepted suffixes are always the defaults `.mzML`, `.mzXML`. Log4j's own shutdown listener is disabled in web.xml on purpose.
- Related / duplicates: disk cache itself ([storage_files_external_services.md](storage_files_external_services.md)); webapp startup library wiring (F2).
- Status: verified (async-executor behavior unverified)

---

## Cross-references (owned by other areas)

- Webapp upload temp-dir helper `Limelight_XML_Importer_Work_Directory_And_SubDirs_Web`, upload controllers (V1/V2 chunked, S3 multipart), upload max-file-size config — [storage_files_external_services.md](storage_files_external_services.md) (storage) / [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) (webservices).
- Email sending (`SendEmail`, `SendEmail_Extra_On_ImportFinish_ToConfiguredEmail`, import email services, throttled error email) — [storage_files_external_services.md](storage_files_external_services.md).
- Spectral storage clients (three copies incl. feature-detection `Call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice`, MS1 scan map helper), File Object Storage, S3 bucket/region resolution `Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values`, SHA line reader `Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component` — [storage_files_external_services.md](storage_files_external_services.md).
- Outbound HTTP clients without a shared helper (blib request/status/cancel, submit-import connector) — [storage_files_external_services.md](storage_files_external_services.md) / [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md).
- `ImportRunImporterDBConnectionFactory`, `SharedCodeOnly_DBConnectionProvider`, importer DAO / batch-inserter / `*_InsertId_DAO` range reservation, `Limelight_JDBC_Base` — [data_access.md](data_access.md).
- Versioned JSON blobs in DB columns (general pattern, `FileImportTrackingDataJSONBlob_*`, `Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util`) — [data_access.md](data_access.md).
- `ConfigSystemTableGetValueCommon`, `ConfigSystemsKeysSharedConstants`, config readers (properties -> env -> -D), build scripts — [build_deploy_config.md](build_deploy_config.md).
- `XMLInputFactory_XXE_Safe_Creator` (use for any XML parsing) — [security_access_control_sessions.md](security_access_control_sessions.md).
- Webapp page interceptor schema-version check; `AA_RestWSControllerPaths_Constants` (path strings the run importer hard-codes) — [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md).
- Front-end import-status list / "import finished, reload page?" prompt (`projectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component.tsx`) and the server listing `Project_UploadData_ListSubmittedItems_RestWebserviceController` — [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md) / [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md).
- Front-end "request server job -> poll -> download" (blib) — [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) / [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md).
- Admin pages (pause/schedule UI, import queue page) — [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) / [security_access_control_sessions.md](security_access_control_sessions.md).
- Searcher cutoff objects, protein pre/post residue util — [domain_utilities.md](domain_utilities.md).
- Feature-detection Hardklor/Bullseye parsers and singular/persistent mapping details — feature-specific; summarized in D1.

## Duplicates and parallel mechanisms in this area

1. **Two job queues with twin code at every layer** (tables, shared DTOs, importer-side DAOs, webapp DAOs/searchers, id creators, claim transactions, worker threads, Process* classes, finish callbacks, email services, cleanup mains): `file_import_tracking_*` vs `import_and_pipeline_run_tracking_*`. Prefer: **the pipeline-run queue + a new `FileImportAndPipelineRun_RequestType`** for any new job kind (consistent across the code). Drift: pipeline end-of-run status update is guarded by current status, the XML-import one is not.
2. **Schema-version compare: 4 copies** (importer/run-importer shared, webapp, cleanup, populate; cleanup and populate byte-identical) and the call is pasted inline into 4 run importer threads. Prefer: the copy for your module's connection source; no consolidated helper exists.
3. **Yield/shutdown detector: 2 copies**; the populate copy is never signaled or called (dead). Prefer: cleanup copy.
4. **DB-connection injection: per-module Provider_IF + holder** (cleanup, populate) alongside `SharedCodeOnly_DBConnectionProvider`; populate uses both. No preferred one identified (each module needs its own today).
5. **Stop mechanisms overlap**: run-control file, DB pause request/schedule, SIGTERM shutdown hook. Use pause for "stop taking jobs temporarily", run-control file / SIGTERM to stop the process.
6. **Heartbeats**: run importer alive row (A6, no reader) vs per-search import heartbeat (B6, no reader) vs pause current-status row. No preferred one identified.
7. **Batch-delete variants**: `Execute_SQL_Until_NoRecordsUpdated` (LIMIT loop), PSM child `psm_id IN (...)` batches, shared-table id-range + LIMIT; five near-identical orphan-GC pairs; gold-standard and feature-detection root cleanups are parallel copies. Prefer `Execute_SQL_Until_NoRecordsUpdated` for simple keyed deletes.
8. **Recursive directory delete**: run importer `DeleteDirectoryAndContents` (log) vs webapp `DeleteDirectoryAndContentsUtil` (throw). No preferred one identified.
9. **S3 object delete**: `ImportFiles_Delete_S3Objects_For_DB_SingleFile_Records` vs inline copy in `ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main` vs three webapp controllers. No preferred one identified.
10. **Retry/back-off loop** hand-rolled in `ProcessSubmittedImport` (3 places) and its pipeline twin.
11. **Run-Importer-launched program skeleton** copied (importer -> feature-detection, about 35 classes, about 15 unused). Prefer: extract to `limelight_importer_run_importer_shared` before a third program.
12. **Hand-written HTTP POST helper** `sendToServerSendByteArrayOrFileAsStream_GetByteArrayResponseFromServer` in feature-detection client, submit connector, and both run importer finish callbacks.
13. **Annotation min/max computed twice** (importer accumulator vs populate backfill) with different best/worst logic for BELOW. Prefer: importer logic is the reference (backfill looks wrong; unverified in UI).
14. **One-time-update tracking tables**: `aa_limelight_db_updates_in_run_imprtr_or_pgm_*` (used) vs `aa_limelight_db_updates_in_webapp_thread_tbl` and `aa_updates_applied_tbl` (schema only). Prefer the used pair.
15. **Id-creator DAOs** for the two queues are copies.
16. **Two "is import configured" checks**: webapp `IsLimelightXMLFileImportFullyConfigured` (key non-blank) vs shared `Limelight_XML_ImporterWrkDirAndSbDrsCmmn.validate_...` (dir exists).

## Open questions / unverified

- F5: does the single shared "importer running" flag actually let cleanup run during an import when the pipeline worker finishes or restarts? Code reading confirms the mechanism (one `volatile boolean`; `ProcessSubmittedImportOrPipelineRun` calls `importerIsRunning_End` when a pipeline job ends; both worker `run()`s call it at start); not exercised at runtime.
- E1: do the cleanup "Main" singletons stay stopped after a thread replacement (never-reset `keepRunning`)? (RESOLVED: the pipeline cleanup mains do not reference the `IMPORT_DELETE_UPLOADED_FILES*` keys.)
- G2: RESOLVED — no duplicate rows: both tables have composite PKs and inserts use `ON DUPLICATE KEY UPDATE`.
- G3: UI impact of the best/worst swap for backfilled BELOW-direction annotations.
- F7: gold-standard / feature-detection child-delete ordering and `Cleanup_ProjectTbl` body only skimmed.
- F9: RESOLVED — no purge of marked-for-deletion `import_and_pipeline_run_tracking_tbl` rows exists (grep).
- B6 / A6: intended consumers of the import heartbeat and run importer alive tables (no Java readers).
- C3: feature-detection program behavior when the run-id argument is missing (traced in source, not executed). RESOLVED: importer shutdown flag is read only in the exception handler (suppresses error output), never to stop work.
- H1: which executor runs the webapp `@Async` cache write.
- A4: pause-schedule time math near year boundaries / DST.
- D2: lower part of `RunFeatureDetectionService_Communication` (response-code / error-stream handling) only skimmed; external service behavior inferred from the client.
- `import_and_pipeline_run_tkg_run_id_creator_tbl`: RESOLVED — no Java code references it (schema only).
- A5: Docker deployments are assumed to stop the daemon via SIGTERM rather than the run-control file.
