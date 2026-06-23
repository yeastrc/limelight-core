# Limelight Core

Limelight is a web application for visualizing, sharing, and analyzing mass-spec
proteomics results. This repo is a multi-module Java project (built with Ant; see
Building below) plus a TypeScript/webpack front end. User-facing docs live at
https://limelight-ms.readthedocs.io/ — this section covers only what isn't obvious
from the code.

## Architecture

### Data flow

A user submits search results (Limelight XML) for import. The import is queued,
then a long-running daemon picks it up and loads it into the database. The webapp
reads that database to visualize and share the results.

```
submit_import (CLI)  ─┐
                      ├─►  queue (DB)  ──►  run_importer (daemon)  ──►  importer ──►  DB  ◄── webapp (visualize/share)
webapp upload UI    ─┘                                              └─► feature_detection_run_import
```

### Modules

Runnable jars (each has a `main`) and the WAR are the deployable artifacts; the
rest are libraries consumed by them.

**Deployables**
- `limelight_webapp` — Spring MVC web app deployed as a WAR to Tomcat. Entry:
  `LimelightSpringApplicationRoot` / `WebappServletContextListener`. The
  TypeScript/webpack UI lives in `limelight_webapp/front_end` (see its own
  `CLAUDE.md`). MUST be built with its Ant script, not Gradle.
- `limelight_run_importer` — daemon (`RunImporterProgram`) that polls the import
  queue and runs imports; also drives DB cleanup and new-field population on
  startup/maintenance.
- `limelight_importer` — core importer (`LimelightImporterProgram`): validates and
  parses Limelight XML and loads it into the database.
- `limelight_feature_detection_run_import` — importer variant
  (`Limelight_FeatureDetection_Run_Import_Program`) for feature-detection data.
- `limelight_submit_import` — CLI (`SubmitImportProgram`) that submits/queues an
  import by calling the webapp web service.

**Libraries**
- `limelight_shared_code` — DTO/DAO/database layer shared across (nearly) all
  modules. Start here when looking for how data is persisted or read.
- `limelight_importer_run_importer_shared` — code shared by the importer,
  feature-detection importer, and run_importer.
- `limelight_submit_import_client_connector` — web-service client connector for
  the submit-import call; used by `submit_import`, `shared_code`, and `webapp`.
- `limelight__database_cleanup__common_code__remove_data_from_database` — removes
  data from the DB; consumed by `run_importer`.
- `limelight__db_populate_new_fields__common_code` — populates newly added DB
  fields (schema-upgrade data backfill); consumed by `run_importer` and `webapp`.

**Other top-level dirs**
- `database_scripts` — SQL `install/` schema and `version_upgrades/`.
- `docs` — Sphinx source for the readthedocs site.
- `deploy` — build output (jars + WAR).

## Building

### Full project

From the repo root:

```
ant -f ant__build_all_limelight.xml
```

Default target `createInstallables`: runs `npm install` + the front-end build
(`limelight_webapp/front_end`), compiles all submodules into runnable jars, and
builds the webapp WAR. Output goes to `deploy/`.

This host-direct build only works when the machine has the correct Node and Java
installed. The build environment (Java/Node/NPM versions and tooling) is defined
by the limelight-build-docker image — see that repo for current requirements:
https://github.com/yeastrc/limelight-build-docker

### Portable build (Docker)

If your machine isn't set up with the right Node/Java, build inside the official
image instead (needs Docker; uses `sudo` only for the `docker` command):

```
./build_in_docker.sh
```

This runs the same Ant build in the limelight-build-docker image, reusing your
host Gradle/npm caches.

### Single module

Each module is built by its own Ant script (run from the module directory):

- `limelight_feature_detection_run_import` — `ant__create_runnable_jar_importer.xml`
- `limelight_importer` — `ant__create_runnable_jar_importer.xml`
- `limelight_run_importer` — `ant__create_runnable_jar_run_importer.xml`
- `limelight_submit_import` — `ant__create_runnable_jar_submit_import.xml`
- `limelight_webapp` — `ant_create_war.xml` (build the WAR; the webapp MUST be
  built with its Ant script, not Gradle)

e.g.:

```
cd limelight_webapp
ant -f ant_create_war.xml
```

Note: root-level Gradle does NOT work (see `Z_Not_Works_build.gradle` /
`Z_Not_Works_settings.gradle`). Use the root Ant build for a full build and the
per-module Ant scripts above for a single module.
