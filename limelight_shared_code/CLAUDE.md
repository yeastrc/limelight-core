# limelight_shared_code

The foundational library shared across (nearly) all Limelight modules: database
DTOs, common constants/enums, JSON-blob mappings, DB-connection plumbing, and the
authoritative DB schema version. It has no `main` and no Ant script of its own —
it is compiled into the importer, run_importer, feature-detection importer, and
webapp. For the repo-wide module map, see the root `CLAUDE.md`.

**Start here** when you need to know how Limelight data is shaped or persisted —
DTOs and constants here are the shared vocabulary the other modules build on.

## Layout

All under `src/main/java/org/yeastrc/limelight/limelight_shared/` (~200 files):

- **`dto/`** (~97 classes) — the core database DTOs (`AnnotationTypeDTO`,
  `ReportedPeptideDTO`, the `Annotation*BaseDTO` hierarchy, etc.). These are the
  most-imported symbols across the repo; reuse them rather than defining parallel
  row objects.
- **`dto_json_blobs_in_db/`** — typed objects for JSON stored in DB columns (e.g.
  structure-file chain mappings). `json_marshal_unmarshal_interfaces/` defines the
  marshal/unmarshal contracts.
- **`constants/`, `enum_classes/`** — shared constants and enums, including
  `Database_OneTrueZeroFalse_Constants` (the DB boolean convention) and the
  filterable/descriptive annotation + filter-direction enums.
- **`db/`** — `SharedCodeOnly_DBConnectionProvider` (+ `_Provider_IF`): the
  DB-connection access point for shared-code-level queries.
- **`database_schema_version__constant/LimelightDatabaseSchemaVersion_Constants`**
  — the authoritative schema version. Keep this in sync with
  `database_scripts/` (root) when the schema changes.
- **`config_system_table_common_access/`** — read access to the config/system DB
  table (`ConfigSystemTableGetValueCommon`, `ConfigSystemsKeysSharedConstants`).
- Feature-specific shared code: `file_import_common/`,
  `file_import_limelight_xml_scans/`, `file_import_pipeline_run/`,
  `feature_detection_run_import_hardklor_bullseye/`, `protein_coverage_common/`,
  `searcher_psm_peptide_cutoff_objects/`, `run_importer/`,
  `pause_run_importer_common/`, `gold_standard_data/`.
- **`XMLInputFactory_XXE_Safe_Creator`** — use this to build XML parsers; it
  disables external-entity resolution (XXE-safe). Don't hand-roll a raw
  `XMLInputFactory`.

## Notes

- Built by its consumers' Ant scripts, not standalone. No JUnit suite under
  `src/test`.
- Because everything depends on this module, changing a DTO field or constant here
  ripples into the importer, run_importer, and webapp — check those consumers when
  editing shared types.
