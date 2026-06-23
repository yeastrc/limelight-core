# limelight_feature_detection_run_import

Runnable jar that runs feature detection and imports the results into the
Limelight database. Like `limelight_importer`, it is invoked as a separate
process by the `limelight_run_importer` daemon (via the
`feature_detection.importer_and_run_pipeline.jar.with.path` config). For the
repo-wide module map and data flow, see the root `CLAUDE.md`.

Not a Spring app. Depends on `limelight_shared_code` and
`limelight_importer_run_importer_shared`. Parallels `limelight_importer` (see its
`CLAUDE.md`) but adds an external feature-detection step before importing.

## Building

```
ant -f ant__create_runnable_jar_importer.xml
```

(Yes — same script filename as `limelight_importer`, run from this directory.)

## How it works

`main` is `program/Limelight_FeatureDetection_Run_Import_Program`. Core entry
points are in `run_and_import__import__core_entry_points/`:

- `Run_And_Import_CoreEntryPoint` — run feature detection, then import.
- `Import_CoreEntryPoint` — import only.

The feature-detection step talks to an external service via
`run_feature_detection_service_communication/RunFeatureDetectionService_Communication`,
using paired send/receive objects for submit / get-status / cancel
(`..._SubmitRequest_*`, `..._GetStatus_*`, `..._CancelRequest_*`). Spectrum data
access goes through `spectral_storage_service_communication/`.

The import side mirrors `limelight_importer`: `dao/`, `dto/`,
`insert_mapping_singular_persistent_to_db/`, `import_files_to_db/`,
`process_file_import_submission/`, `project_importable_validation/`.

## Notes

- No JUnit suite under `src/test`; validate by building the jar and running an
  import (typically through `run_importer`).
