# limelight_run_importer

The import daemon: a long-running Java program (runnable jar) that polls the
import queue in the database and runs each submitted import. Also performs DB
maintenance. For the repo-wide module map and data flow, see the root `CLAUDE.md`.

Not a Spring app. Depends on `limelight_shared_code`,
`limelight_importer_run_importer_shared`, and the two DB-maintenance modules
(`...database_cleanup...` and `...db_populate_new_fields...`).

## Building

```
ant -f ant__create_runnable_jar_run_importer.xml
```

## How it works

`main` is `program/RunImporterProgram` → `main/ImporterRunnerMain`. The
`manager_thread/ManagerThread` polls the queue; each picked-up request is handled
on its own thread (`get_import_and_process_thread/`,
`import_and_pipeline_run__thread/`,
`process_submitted_import/`, `process_submitted_import_or_pipeline_run/`).

**Key fact — imports run as separate OS processes, not in-process.** The daemon
shells out (`run_system_command/RunSystemCommand`, a `ProcessBuilder`) to run the
importer jar (or the feature-detection jar) and treats the child's **exit code**
as success/failure (this is the contract behind `limelight_importer`'s
`ImporterProgramExitCodes`). The jar paths are configured, not hardcoded:

- importer jar: property `importer.jar.with.path` / env
  `LIMELIGHT_IMPORTER_JAR_WITH_PATH`
- feature-detection jar: property
  `feature_detection.importer_and_run_pipeline.jar.with.path` / env
  `LIMELIGHT_FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_JAR_WITH_PATH`

(see `config/ImporterRunnerConfigData`).

## Other responsibilities

- **DB maintenance** on startup/maintenance:
  `database_cleanup__populate_new_fields__thread/` drives data removal and
  new-field backfill via the bridge packages
  `db__for__limelight__database_cleanup__common_code__remove_data_from_database/`
  and `db__for__limelight__database_populate_new_fields__common_code/`.
- **Post-import file cleanup**: `import_and_pipeline_run__cleanup_dirs_files/`,
  the `import_files_delayed_removal_*` packages, and
  `import_files__delete_s3_objects_for_db_single_file_records/` (S3 object
  deletion).
- **Pause support**: `pause_run_importer/` can hold off picking up new work.

## Notes

- No JUnit suite under `src/test`; validate by building and running the daemon
  against a test queue.
