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

## Identifications data model (PSMs, reported peptides, open modifications)

A few cross-cutting concepts that aren't obvious from the schema:

- **PSM** — a single peptide-spectrum match (one identified scan). Per-scan facts live here:
  charge, scan number/file, and — importantly — **open-modification** mass/position.
- **Reported peptide** — the **grouping of PSMs at which peptide-level statistics apply.** When
  post-processing rescores PSMs and emits a *peptide-level* value (e.g. Percolator's peptide-level
  q-value / PEP), that peptide is the reported peptide; it is the grouping of the PSMs that rolled up
  into it. So a reported peptide is a *scoring/grouping* level, not necessarily one exact mass form.
- **Open modification** — Limelight models an open modification on a peptide as **a mass plus
  zero-to-many candidate positions** within the peptide (0 positions = unlocalized). This exists to
  support open / mass-tolerant searching from tools like **MSFragger, Magnum, and MetaMorpheus**,
  where a delta mass is found but only localized to a set of possible sites (or not at all).

  **Key consequence: the open-mod mass (and its position(s)) is stored on the _PSM_, not on the
  reported peptide.** So a single `reportedPeptideId` can cover PSMs with **different open-mod masses /
  positions** — i.e. one reported peptide maps to *multiple distinct peptidoform mass forms*. Any code
  that assumes "one reported peptide == one exact mass/modification form" is wrong for open-mod data
  (e.g. quant keyed only on `reportedPeptideId` under-splits open-mod peptides — the distinguishing
  mass lives on the PSM).
- **Search sub-group** ("Sub Search" in the UI) — an optional per-PSM *logical* label that partitions one
  search's PSMs into named groups (conditions/replicates). It is **independent of the scan file** (a
  *physical* per-PSM fact): a sub-group can span many scan files and a scan file can hold many sub-groups,
  with no constraint aligning them. `searchSubGroupId` is unique only within a `searchId`, so sub-groups
  show only on single-search views. For the full stack (schema → import → searchers → REST → UI) and why
  this matters for MS1 quant, see `limelight_features_docs/limelight_search_sub_groups_deep_dive.md`.

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

## Dependency updates: the JAXB Java-8 vs Java-25 split (and a Dependabot gotcha)

The modules run on **two Java toolchains**, and this splits which JAXB line each may
use — get it wrong and the build breaks in non-obvious ways:

- **Java 8 modules** — `limelight_submit_import` and `limelight_submit_import_client_connector`
  (they pin `JavaLanguageVersion.of(8)` so the submit-import client can run under Java 8).
  These MUST stay on the **Java-8-compatible JAXB lines**: `jakarta.xml.bind:jakarta.xml.bind-api`
  / `org.glassfish.jaxb:jaxb-runtime` on **3.0.x**. JAXB **4.x** is compiled for Java 11
  (class-file 55.0) and will NOT compile under a Java 8 toolchain (`cannot access
  jakarta.xml.bind.annotation.XmlAccessType`).
- **Java 25 modules** — everything else. They use **jakarta JAXB 4.x**. The **webapp** additionally
  keeps a *javax* JAXB 2 runtime (`javax.xml.bind:jaxb-api:2.3.x` + `com.sun.xml.bind:jaxb-impl:2.3.x`)
  for the bundled yeastrc client-connector jars, coexisting with jakarta `jaxb-runtime:4.0.x`.
  Do **not** bump `com.sun.xml.bind:jaxb-impl` to 3.x/4.x — it breaks the javax pairing and drags in
  a duplicate `org.glassfish.jaxb:jaxb-core-4.x`, failing the WAR build (`bootWar`: duplicate
  `WEB-INF/lib` entry).

**The Dependabot gotcha (why the Java-8 ignore isn't enough):**
`limelight_webapp/settings.gradle` (and `limelight_submit_import/settings.gradle`) **include
`limelight_submit_import_client_connector` as a Gradle subproject**. So when Dependabot scans the
**webapp** directory — which is in the **Java-25** Dependabot group — it traverses into the connector
subproject and tries to bump *its* JAXB to 4.x, **bypassing** the ignore on the separate Java-8 group.
This recurred in PRs #105 and #107. `.github/dependabot.yml` handles it by adding a **semver-major**
ignore for `jakarta.xml.bind:jakarta.xml.bind-api` and `org.glassfish.jaxb:jaxb-runtime` to the
**Java-25 group** (blocks the connector's 3.x→4.x jump while still allowing JAXB 4.x minor/patch on
the genuine Java-25 modules), plus a `>=3.0.0` ignore on `com.sun.xml.bind:jaxb-impl`. If a Dependabot
gradle PR ever reintroduces a JAXB-4.x bump on `limelight_submit_import_client_connector`, drop that
hunk before merging — the rest of the PR is fine.

## Web security: CSP and XSS / URL hardening

Before touching the Content-Security-Policy, adding a link/redirect, rendering a server- or
user-provided URL, or injecting an HTML string, read
`limelight_features_docs/web_security_csp_and_xss_url_hardening.md`. Quick pointers:

- **CSP** lives in a `<meta>` tag in
  `limelight_webapp/src/main/webapp/WEB-INF/jsp/jsp_includes_head_section/head_section_include_every_page.jsp`
  (no header). It uses hashes, not `'unsafe-inline'`; `'unsafe-eval'` is required by **Plotly WebGL**
  (`scattergl`/regl), not Google Charts (unused). `gstatic` is narrowed to `/recaptcha/`; `base-uri 'self'`
  protects the app's `<base href>`-driven relative URLs; `form-action 'self'` is set. Anti-clickjacking
  (`frame-ancestors`) can't live in a `<meta>` CSP (silently ignored), so it's a **response header**
  (`Content-Security-Policy: frame-ancestors 'self'` + `X-Frame-Options: SAMEORIGIN`) set in
  `top_of_every_page_doctype__jsp_cache_directives.jsp`. Each directive is commented inline.
- **URLs:** route any non-hardcoded URL through
  `front_end/.../page_js/common_all_pages/sanitizeURL_ForHrefOrNavigation.ts` before it reaches an
  `href`/`.src`/`location.href`/`window.open` (external vs same-origin variant per intent). Validate
  redirect/web-link URLs **server-side** too — client checks are bypassable (web links are http/https-only
  across client form, `Insert_WebLink_RestWebserviceController`, and the render sanitizer).
- **HTML:** never build HTML from server/user data via string concat + `innerHTML`/`.html()`. Use React
  (auto-escaped), `<c:out>` on the server, or inject an empty node and set user text via
  `.textContent`/`.text()`. (`dangerouslySetInnerHTML` is used nowhere.)
- **Future security/hardening requests start at §7 of that doc** — deferred items are catalogued there:
  remaining CSP directives (`default-src`/`img-src`/`style-src`/`connect-src`) and ToS/footer escape-first.
