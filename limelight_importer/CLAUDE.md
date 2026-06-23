# limelight_importer

The core importer: a standalone Java command-line program (built as a runnable
jar) that validates Limelight XML and loads the results into the Limelight
database. It is normally invoked by the `limelight_run_importer` daemon, not by
end users directly. For the repo-wide module map and import data flow, see the
root `CLAUDE.md`.

This is **not** a Spring app — plain Java, with DAOs accessed via singleton
`getInstance()`. Depends on `limelight_shared_code` and
`limelight_importer_run_importer_shared`.

## Building

From this directory:

```
ant -f ant__create_runnable_jar_importer.xml
```

## Flow & layout

`main` is `program/LimelightImporterProgram`; the real work starts at
`importer_core_entry_point/ImporterCoreEntryPoint`. Rough pipeline:

1. **Parse** the input — Limelight XML is deserialized (JAXB) into
   `LimelightInput` DTOs from the `limelight-import-api` library; held in
   `input_xml_file_internal_holder_objects/`.
2. **Validate** before touching the DB — `pre_validate_xml/`,
   `project_importable_validation/`, `scan_file_processing_validating/`,
   `search_sub_group_processing_validating/`. Validation failures should abort the
   import.
3. **Process** — `process_input/` computes per-PSM / per-peptide data (annotation
   cutoffs, protein positions, lookup records).
4. **Insert** — see DB insert conventions below.

Other notable packages: `dao/` (reads/lookups, singleton DAOs), `config/`
(config-file + DB-config handling), `constants/` (incl.
`ImporterProgramExitCodes` — exit codes are part of the contract with
`run_importer`), `spectral_storage_service_interface/`,
`yrc_file_object_storage_interface/`.

## DB insert conventions (performance-critical)

Imports load very large numbers of PSM/peptide/protein rows, so inserts are
batched — don't replace these with row-at-a-time inserts:

- `dao_db_insert/` — `DB_Insert_FooDAO` for single inserts, plus
  `DB_Insert_Foo_BatchInserter_DAO` variants for batched inserts.
- `batch_insert_db_records/` and `dao_batch_insert_registry/` — accumulate records
  and flush them in batches.

## Notes

- No JUnit suite under `src/test`; validate changes by building the jar and
  running an import.
- Schema lives in the repo root `database_scripts/` (`install/` +
  `version_upgrades/`).
