# Limelight Core

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
