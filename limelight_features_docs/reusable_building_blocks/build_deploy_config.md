# Reusable building blocks — Build, deploy, config

Part of the reusable-building-blocks inventory; start at [README.md](README.md) (keyword index, quick picks, duplicates).
Counts and user lists are as of 2026-11-09 and approximate; grep before relying on them.

How Limelight is built (root Ant driving per-module Gradle wrappers; esbuild + webpack for the front end), packaged
(runnable fat jars, the WAR, Docker images, GitHub release assets), checked (CI, Dependabot, dependency submission),
deployed (Docker compose stacks, local copy-to-Tomcat), and configured at runtime. Limelight has several parallel
config mechanisms: the admin-editable DB table `config_system_tbl`, optional classpath `.properties` files, environment
variables and JVM `-D` properties (in different precedence orders per setting), plus the importer-side properties files.
Config KEY names only appear here, never values.


Abbreviations: `J` = `limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp`,
`W` = `limelight_webapp/src/main/webapp`, `FE` = `limelight_webapp/front_end`,
`SC` = `limelight_shared_code/src/main/java/org/yeastrc/limelight/limelight_shared`.

## Quick picks

| If you need to... | Use this | Entry |
|---|---|---|
| Build everything | `ant -f ant__build_all_limelight.xml` (or `build_in_docker.sh` without local Node/Java) | Root build; Portable build |
| Add a new runnable Java program | copy `limelight_importer/build.gradle` shadow-jar block + its Ant wrapper, add to root Ant | Per-module fat jar template |
| Add a shared third-party dependency | declare once in `limelight_shared_code/build.gradle` as `api` (webapp keeps its own) | Shared library modules |
| Call spectr / File Object Storage from a new module | `fileTree` on `libs_yeastrc_github_jars` (do not write a new HTTP client) | Committed third-party jars |
| Add a new front-end page bundle | add the root `.ts` to the esbuild entry list in `FE/build.gradle` (NOT webpack) | Front-end build pipeline |
| Show build version / git hash / release tag | `Webapp_VersionAndGitInfo_FromBuild_IF` | Build version / git info |
| Force browsers to reload JS/CSS after deploy | `?x=${ cacheBustValue }` on the URL | JS/CSS cache-bust string |
| Fast local edit-build-see loop | `FE/ant_buildFrontEnd_CopyToTomcat.xml` | Local dev deploy |
| Admin-editable runtime setting | new key in `ConfigSystemsKeysConstants` (webapp) or `ConfigSystemsKeysSharedConstants` (shared), read via `ConfigSystemDAO_IF` / `ConfigSystemTableGetValueCommon` | DB config system |
| Boolean "feature configured / allowed" switch | copy `IsScanFileImportAllowedViaWebSubmit` | Config-table feature switches |
| Config value in a JSP | add a getter to `AppContextConfigSystemValuesRetrieval`, use `${ configSystemValues.x }` | JSP-visible config bean |
| Deploy-time (non-DB) webapp setting | copy a `..._Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup` reader + filename constant + sample file | Webapp file/env/-D reader pattern |
| Pick which config mechanism / precedence | read the catalog first | Config mechanisms catalog |
| Secret for the webapp container | an environment variable via Tomcat's env property source | Docker images |
| New webapp env var in Docker | add it to BOTH compose files (+ `docker/env-sample` if user-set) | docker-compose stacks |
| Stop a background thread on undeploy | add its shutdown flag to `WebappServletContextListener.contextDestroyed` | Webapp startup / shutdown listener |
| Give a library module DB access in the webapp | provider set in an `@EventListener(ContextRefreshedEvent)` (`init_*` packages) | Passing DB connection to libraries |
| Container-level jar (e.g. JDBC driver) for the image | `tomcat_image_setup` emit task | tomcat_image_setup |
| New server-rendered page | copy a sibling JSP, keep the include chain | JSP page skeleton |
| Debug logging in the webapp | add a `<Logger>` to `log4j2.xml` | Log4j2 configuration |

---

## Build orchestration (Ant + Gradle)

### Root "build everything" Ant orchestration (Ant -> per-module Gradle wrappers)
- What it solves: one command builds every deployable (front end, 4 runnable jars, WAR, Tomcat lib jars) into `deploy/`. There is no root Gradle build; Ant calls each module's own `gradlew`.
- Search keywords: build all, full build, createInstallables, ant build, deploy dir, installables, release build, compile all submodules, root gradle (does not work)
- Location: repo root, `ant__build_all_limelight.xml`, targets `clean` -> `prepare` -> `npm_install` -> `compileAllSubmodules` -> `createInstallables` (default), plus `node_npm_versions`. Optional local config `aa_ant__build_all_limelight_config.properties` (gitignored; sample `..._Sample`; only key `npm.executable`, defaults to `npm`).
- Used by: `.github/workflows/push.yml` and `release.yml` (inside the build image); `build_in_docker.sh`; `docker/*/BUILD.md` instructions.
- How to use / extend: add a new deployable by (1) giving the module its own Ant wrapper that runs `./gradlew <task>` (copy `limelight_importer/ant__create_runnable_jar_importer.xml`), (2) adding an `<ant antfile=... dir=...>` line in `compileAllSubmodules`, (3) adding a `<copy>` into `deploy/` in `createInstallables`. Windows/non-Windows `gradlew` is chosen with an Ant `<condition>`.
- Do not use when: you only need one module (use that module's Ant script; root CLAUDE.md "Single module").
- Limits and gotchas: `clean` runs the front-end Gradle `clean` (deletes generated bundles under `W/static`). `limelight_submit_import` is built twice (directly, then again by `limelight_webapp/ant_create_war.xml`). Needs the correct Node + Java 8 + Java 25 on the host, otherwise use `build_in_docker.sh`. `Z_Not_Works_build.gradle` / `Z_Not_Works_settings.gradle` are an abandoned root-Gradle attempt (every include commented out) — do not revive.
- Related / duplicates: Per-module fat jar template; Portable build; Release workflow.
- Status: verified (re-checked)

### Per-module runnable fat jar template (Gradle Shadow + Ant wrapper)
- What it solves: build a self-contained runnable jar for a Java CLI/daemon module, with Log4j2 plugins merged and git info in the manifest.
- Search keywords: shadowJar, fat jar, uber jar, runnable jar, Main-Class, manifest, Log4j2PluginsCacheFileTransformer, grgit, toolchain
- Location: `limelight_importer/build.gradle` (reference template; same shape in `limelight_run_importer`, `limelight_feature_detection_run_import`, `limelight_submit_import`) and each module's `ant__create_runnable_jar_*.xml` (runs `./gradlew shadowJar`). Plugins `com.gradleup.shadow`, `org.ajoberstar.grgit`; `java.toolchain.languageVersion` 25 (8 for submit_import).
- Used by: root `ant__build_all_limelight.xml`; outputs `limelightImporter_XMLFile_ScanFiles.jar`, `limelightRunImporter.jar`, `limelight_FeatureDetection_Run_Import.jar`, `limelightSubmitImport.jar`.
- How to use / extend: copy the importer `build.gradle` block set: `shadowJar { archiveBaseName=...; archiveClassifier=''; archiveVersion=''; duplicatesStrategy = INCLUDE; transform(Log4j2PluginsCacheFileTransformer) }` and the `jar.manifest` attributes. Keep the `configurations.all` excludes (logback, log4j-to-slf4j).
- Do not use when: building the webapp (WAR via Spring Boot plugin, built only through `ant_create_war.xml`) or a library module (`java-library`, no shadow).
- Limits and gotchas: `duplicatesStrategy = INCLUDE` is required so the Log4j2 transformer sees every `Log4j2Plugins.dat` (comment in file). Manifest git attributes (`Git-Commit`, `GIT-Full-HASH`, `GIT-Tag-at-HEAD`, `Build-Timestamp`) are written but no Java code reads them (grep). grgit needs a real git checkout (assumption: fails in a source tarball, not tested). Java 8 modules must stay on JAXB 3.0.x (root CLAUDE.md).
- Related / duplicates: Build version / git info into the webapp (second, different git-info mechanism).
- Status: verified

### Shared library modules included by relative path (settings.gradle) + centralized dependency versions
- What it solves: lets each independent Gradle build compile against the shared library modules without a root multi-project build; keeps common lib versions in one place.
- Search keywords: settings.gradle include, projectDir, subproject, shared code dependency, api vs implementation, transitive dependency, version drift, Eclipse import
- Location: every leaf `settings.gradle` (e.g. `limelight_run_importer/settings.gradle` includes shared_code, importer_run_importer_shared, db_populate, database_cleanup via `project(":x").projectDir = new File(settingsDir, "../x")`); centralized `api` deps in `limelight_shared_code/build.gradle` (slf4j-api, commons-lang3, jackson-core/-databind, jakarta.xml.bind-api; jaxb-runtime as `implementation`). Background docs: `README__Gradle_Dependencies_TransitiveInfo.md`, `README__Eclipse_Gradle_Project_Import.md`.
- Used by: `limelight_importer`, `limelight_run_importer`, `limelight_feature_detection_run_import`, `limelight_webapp` (shared_code, db_populate, submit_import_client_connector), `limelight_submit_import` (client_connector only).
- How to use / extend: a new shared library = `java-library` module with its own wrapper; add `include` + `projectDir` lines to every consuming leaf `settings.gradle` and `implementation project(":name")` in its `build.gradle`; add its directory to `.github/dependabot.yml` and (if a leaf) to `dependency-submission.yml`. Put shared third-party deps in `limelight_shared_code` as `api`.
- Do not use when: the webapp needs a Spring-Boot-BOM-managed lib (the webapp keeps its own declarations, per root CLAUDE.md).
- Limits and gotchas: Dependabot follows these subproject includes (the JAXB 4.x gotcha in root CLAUDE.md / `dependabot.yml`). Not all leaves follow "don't re-declare": `limelight__db_populate_new_fields__common_code` and `limelight__database_cleanup__common_code__remove_data_from_database` re-declare `slf4j-api` / `commons-lang3`; importer, run_importer and feature_detection repeat the same AWS S3 / commons-io / dbcp2 / mysql / log4j block (versions equal today, kept by hand).
- Related / duplicates: CI and Dependabot; Committed third-party jars.
- Status: verified

### Third-party / sibling-project jars committed to the repo (not from Maven)
- What it solves: supplies jars Gradle cannot download: yeastrc client connectors (spectral storage, file object storage), user-mgmt, password mgmt, proteomics utilities, and `jargs`.
- Search keywords: lib_other, libs_yeastrc_github_jars, libs_webapp__yeastrc_github_jars, fileTree jars, spectral storage client jar, file object store client jar, yrc-proteomics, jargs CmdLineParser
- Location: `lib_other/` (`jargs.jar`; via `fileTree` in importer, run_importer, feature_detection, submit_import), `libs_yeastrc_github_jars/` (`file_object_store_client_connector_code.jar`, `spectral_storage_accept_import_client_connector_code.jar`, `spectral_storage_get_data_client_connector_code.jar`; importer, feature_detection, webapp), `limelight_webapp/libs_webapp__yeastrc_github_jars/` (`yrc-proteomics.jar`, `yrc-user-mgmt-embed.jar`, `yrc_password_mgmt_public.jar`; webapp only).
- Used by: imports of `org.yeastrc.spectral_storage` (about 161 import lines), `org.yeastrc.file_object_storage` (about 28), `org.yeastrc.user_mgmt_central` (about 25), `org.yeastrc.proteomics` (about 9, webapp only), `jargs.gnu.CmdLineParser`.
- How to use / extend: to call spectr or the file object store from a new module, add `implementation fileTree(dir: '../libs_yeastrc_github_jars', include: ['*.jar'])` rather than writing a new HTTP client. The webapp already has `yrc-proteomics` for mass calculation — reuse it rather than adding new mass code.
- Do not use when: the library is on Maven Central (declare it normally).
- Limits and gotchas: update committed binaries by replacing the jar. `limelight_run_importer` does not include `libs_yeastrc_github_jars`.
- Related / duplicates: spectral-storage / file-object-storage client wrappers ([storage_files_external_services.md](storage_files_external_services.md)).
- Status: verified (jar lists from `git ls-files`; usage counts from grep of import lines) (re-checked)

### Limelight Import API version: single-source version file
- What it solves: one place to set the `org.yeastrc:limelight-import-api` (Limelight XML schema / JAXB classes) version for both builds that use it.
- Search keywords: limelight-import-api version, XSD version, Limelight XML schema version, import api jar
- Location: root `Gradle_limelight-import-api_version_for_Gradle.txt` (version string only; `Gradle_limelight-import-api_version_for_Gradle.txt.readme.txt` beside it); read with `project.file('../Gradle_limelight-import-api_version_for_Gradle.txt').getText('UTF-8').trim()` in `limelight_importer/build.gradle` and `limelight_webapp/build.gradle`; Maven repo is the GitHub-raw `limelight-import-api/repository/` URL.
- Used by: `limelight_importer/build.gradle`, `limelight_webapp/build.gradle`.
- How to use / extend: bump the version in the txt file; the readme says also update importer class `Limelight_XSD_XML_Schema_Enabled_And_Filename_With_Path_Constant`.
- Do not use when: n/a.
- Limits and gotchas: bump this version by hand in the txt file.
- Related / duplicates: none.
- Status: verified

### Gradle wrapper set (12 identical wrappers, pinned checksum) and upgrade procedure
- What it solves: every Gradle build uses the same Gradle version, with the distribution SHA-256 pinned.
- Search keywords: gradle wrapper, gradlew, upgrade gradle, distributionSha256Sum, gradle version
- Location: `*/gradle/wrapper/gradle-wrapper.properties` in 12 dirs (all Gradle 9.6.1 as of 2026-11-09, each with `distributionSha256Sum`); procedure in `Gradle_Version_UpgradeProcess.md`.
- Used by: all Ant wrappers; CI (`gradle-wrapper-validation.yml`).
- How to use / extend: follow `Gradle_Version_UpgradeProcess.md` for all 12 at once; a new module copies an existing wrapper byte-for-byte.
- Do not use when: n/a.
- Limits and gotchas: none noted.
- Related / duplicates: none.
- Status: verified

### Portable build in the official build image (`build_in_docker.sh`)
- What it solves: builds everything without installing the right Node / Java 8 / Java 25 locally.
- Search keywords: build in docker, limelight-build-docker, reproducible build, toolchain, ghcr build image
- Location: `build_in_docker.sh` (runs `ant -f ant__build_all_limelight.xml` in `ghcr.io/yeastrc/limelight-build-docker:latest` as the invoking user, mounting the host Gradle and npm caches; `sudo` only for `docker`). Requirements pointer: `BUILD_SPECIAL_INFO__REQUIREMENTS.txt`.
- Used by: developers; CI uses the same image directly in `push.yml` / `release.yml`.
- How to use / extend: run from a checkout; artifacts land in that checkout's `deploy/`.
- Do not use when: n/a.
- Limits and gotchas: always builds the directory the script lives in. `docker/*/BUILD.md` describe an older, different build-image invocation (and are partly wrong: webapp omits the `tomcat_lib_jars` step; submit-import says `cd docker/importer`).
- Related / duplicates: `docker/*/BUILD.md` manual steps (older, parallel instructions).
- Status: verified (re-checked)

---

## Front-end build

### Front-end build pipeline (Gradle tasks: tsc check -> esbuild JS -> webpack SCSS -> gzip -> sync into WAR)
- What it solves: type-checks and bundles all TypeScript pages and the global CSS, then places them where the WAR build picks them up.
- Search keywords: esbuild, webpack, bundle, entry point, add a new page, page root, frontEndBuild_ForProduction, frontEndBuild_ForDevelopment, js_generated_bundles, css_generated, tsc noEmit, tsgo, minify, gzip bundles, precompressed static
- Location: `FE/build.gradle` — entry-point lists in closures `frontEndBuild__Esbuild__CommandLine_Args_{Main_Header_Pages,User_Pages,Admin_Pages,DataPages}__Add_EntryPoints__Fcn`; tasks `run_Typescript_Validate__NoEmit`, `run_Esbuild_*`, `runWebpack_{Production,Development}Mode`, `gzipJsBundles`, `copyFrontEndJS`, `copyFrontEndCSS`, `delete_outputDirs`, `clean`; aggregates `frontEndBuild_ForProduction` (called by `limelight_webapp/ant_create_war.xml`) and `frontEndBuild_ForDevelopment` (default; called by `ant_buildFrontEnd_CopyToTomcat.xml`). `FE/webpack.config.js` = SCSS only (`src/styles/global.scss` -> `css_generated/global.css`). `FE/tsconfig.json`: es2022, commonjs, `strict:false` + `noImplicitAny`/`noImplicitThis`/`strictBindCallApply`, path alias `*` -> `./src/js/*`. Optional `Typescript_Executable_OverridePath.txt` (gitignored) swaps `tsc` for `tsgo`. Page-root pattern (admin/user/header pages): a `*_Root.ts` that calls `limelight__catchAndReportGlobalOnError.init()` and starts the page, e.g. `page_js/webapp_admin_pages/webapp_manage_users_page/manageUsersForAdminPage_Root.ts`.
- Used by: the WAR build; the local copy-to-Tomcat script; CI (via root build). Entry groups: 5 admin roots, 5 user roots, 2 header entries, and the data-page roots (incl. `*_RootLaunch_PublicUser.ts` / `*_RootLaunch_LoggedInUsers` pairs).
- How to use / extend: a NEW PAGE = add its root `.ts` to the right esbuild entry list in `FE/build.gradle` (output `<name>-bundle.js` under `js_generated_bundles/<group>/`) and reference it from the JSP with `?x=${ cacheBustValue }`. A data page with role-split bundles needs two esbuild entries (public + logged-in). Do NOT add JS/TS entries to `webpack.config.js`. `npm install` runs outside Gradle (root Ant `npm_install`); `package.json` has no scripts.
- Do not use when: n/a.
- Limits and gotchas: type errors fail the build. The Development build still uses Production esbuild args for header/admin/user groups (only data pages differ). Note: role bundles are NOT built by `webpack.config.js`; `FE/build.gradle` shows the `*_RootLaunch_PublicUser.ts` entries are in the esbuild lists, and `webpack.config.js` builds SCSS only. `.js.gz` question resolved by spot-check: `LimelightWebAppConfig.addResourceHandlers` registers `/static/**` with `EncodedResourceResolver`, which serves a `.gz` sibling when the browser accepts gzip, so the production `*.js.gz` files are likely used (not runtime-tested). ESLint config exists but is not wired into any build step and targets only `*.js`. `esbuild_with_config__NOT_CURRENTLY_USED.js`, `webpack.config.js__ThingsToAdd`, `ZZZ_Front_End_Build_Using_Gradle.txt` (still says "Handlebars + Webpack") and `A_Fake_JS_Trigger_TypescriptValidation.ts` (unreferenced) are stale.
- Related / duplicates: `FE/CLAUDE.md` "How the front end is actually built"; access-level bundle selection in the JSP ([front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)); TypeScript check scripts (below).
- Status: verified (re-checked)

### TypeScript check helper scripts
- What it solves: run a type check without building bundles.
- Search keywords: tsc noEmit, tsgo, typecheck, compile errors
- Location: `FE/typescript_compiler_run__noEmit.sh` (writes `tsc_NoEmit_out.txt` / `tsc_NoEmit_err.txt`), `FE/tsgo_Preview_NoEmit.sh` (reads `TS_GO__EXECUTABLE_PATH` from a local `tsgo_Preview_NoEmit.sh__file_location.properties`).
- Used by: developers only.
- How to use / extend: run from `front_end/`.
- Do not use when: n/a (the Gradle build already runs the same check).
- Limits and gotchas: `typescript_compiler_run__noEmit.sh` calls `node_modules/typescript/bin/tsc` directly, ignoring the `Typescript_Executable_OverridePath.txt` override the Gradle task honors.
- Related / duplicates: Gradle task `run_Typescript_Validate__NoEmit`.
- Status: verified

---

## Webapp packaging, version info, local deploy

### Build version / git info injected into the webapp (release tag, git hash in the footer)
- What it solves: makes the git hash, branch, tag, build time and an optional release tag/URL/tooltip available to the running webapp (page footer). Startup fails if the file is missing.
- Search keywords: version info, git hash, build info, release tag, LIMELIGHT_RELEASE_TAG, limelight_version_from_build.properties, about/version display, footer version
- Location: writer: `limelight_webapp/build.gradle` task `createFileGitHashEtc` (before `processResources`) writes `src/main/resources/limelight_version_from_build.properties` (gitignored); build-time env vars `LIMELIGHT_RELEASE_TAG`, `LIMELIGHT_RELEASE_TAG_URL`, `LIMELIGHT_RELEASE_TAG_TOOLTIP_TEXT`. Reader: `J/web_app_version_and_git_info_from_build/Webapp_VersionAndGitInfo_FromBuild(_IF)` (`get_Webapp_VersionAndGitInfo_FromBuild_Results()`); filename constant also in `J/constants_config_filenames/LimelightWebapp_BuildInfo_Incl_GitHash_Filename_Constants`.
- Used by: `All_Page_Controllers_SpringHandlerInterceptor` (sets it for `footer_main.jsp`); `release.yml` sets `LIMELIGHT_RELEASE_TAG` from the GitHub release tag.
- How to use / extend: add a line to the generated properties text in `createFileGitHashEtc`, read it in `Webapp_VersionAndGitInfo_FromBuild`; inject the `_IF`.
- Do not use when: you need a per-start unique value (use the cache-bust string); non-webapp jars (they only get unread manifest attributes).
- Limits and gotchas: regenerated on every build; grgit requires a git checkout. The filename is hard-coded in the reader AND in the constants class. `CachedDataInFileMgmt_WriteFile_GetGitCommitHash` reads `GIT-Full-HASH` from the same file but has no users (dead code).
- Related / duplicates: jar-manifest git attributes in the fat-jar template (separate, unused mechanism).
- Status: verified (re-checked)

### JS/CSS cache-bust string (also the webservice sync-tracking code)
- What it solves: a per-startup token appended as `?x=${ cacheBustValue }` to bundle/CSS URLs so a redeploy forces browsers to reload JS/CSS; the same value is the webservice sync-tracking code.
- Search keywords: cache bust, static resource version, version query string, cacheBustValue, stale JavaScript, reload after deploy
- Location: `J/web_utils/GetJsCssCacheBustString`; set at startup by `J/servlet_context_listener/WebappServletContextListener` as app attribute `WebConstants.APP_CONTEXT_JS_CSS_CACHE_BUST`; emitted in `W/WEB-INF/jsp/jsp_includes_head_section/head_section_include_every_page.jsp` and every `<script src=...bundle.js?x=...>`.
- Used by: all page JSPs that load bundles (e.g. `peptideView.jsp`, `body_before_main_script_include__script_include_libs__page_header_js.jsp`); `FE/.../common_all_pages/EveryPageCommon.ts` (`getWebserviceSyncTrackingCode`).
- How to use / extend: append `?x=${ cacheBustValue }` to any new build-generated `static/` JS/CSS URL.
- Do not use when: third-party files under `static/js/libs` (versioned by filename, loaded without it); images (no cache-bust used).
- Limits and gotchas: a dev-environment JVM flag fixes the value (see `GetJsCssCacheBustString`). Because it changes on EVERY restart, every restart invalidates open pages (sync tracking forces a reload), not only new versions.
- Related / duplicates: Webservice sync tracking ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Status: verified (re-checked)

### Submit-import jar bundled into the WAR for download
- What it solves: ships the current `limelightSubmitImport.jar` inside the webapp so users download the matching CLI version.
- Search keywords: submit import download, limelightSubmitImport.jar, copy jar into war, static download
- Location: `limelight_webapp/build.gradle` task `copy_limelight_submit_import_ToWebapp` (`Sync` into `W/static/limelightSubmitImport/`, gitignored), hooked by `processResources.dependsOn`; jar built first by `limelight_webapp/ant_create_war.xml`.
- Used by: `FE/.../project_page__upload_data_section/projectPage_UploadData_SubmitImportProgramInfo_Overlay.tsx` (references the path).
- How to use / extend: the same `Sync` pattern can ship any other built artifact as a static download; the `into` dir must contain nothing else (it is wiped).
- Do not use when: the artifact is large or changes independently of the webapp release.
- Limits and gotchas: building the WAR directly with Gradle (not via `ant_create_war.xml`) skips building the jar and the front end.
- Related / duplicates: GitHub release also uploads `limelightSubmitImport.jar` as a release asset.
- Status: verified

### Local dev deploy: build front end / WAR and sync into a local Tomcat
- What it solves: fast edit-build-see loop by syncing built JS/CSS/JSPs straight into an exploded webapp in a local Tomcat.
- Search keywords: copy to tomcat, hot deploy, dev loop, rsync static, ant_buildFrontEnd_CopyToTomcat, tomcat.webapps.root, limelight.context
- Location: `FE/ant_buildFrontEnd_CopyToTomcat.xml` (default `built-copy-front-end`: Gradle `frontEndBuild_ForDevelopment`, then syncs `static/` and `WEB-INF/jsp/`); reusable helper targets `detect_rsync_Available`, `sync_dir_Src_To_Dest` (rsync `-a --delete --checksum` if available, else delete+copy). `limelight_webapp/ant_build_War_CopyToTomcat.xml` (build WAR, copy to webapps). Local settings file `FE/ant_buildFrontEnd_CopyToTomcat.settings.properties` (gitignored; keys `tomcat.webapps.root`, `limelight.context`).
- Used by: developers only (no CI reference).
- How to use / extend: reuse `sync_dir_Src_To_Dest` via `<antcall>` with params `sync.src` / `sync.dest` for any other dir sync.
- Do not use when: building release artifacts.
- Limits and gotchas: the per-page targets `js_only_build_copy_*` / `generalized_build_specific_js_bundle_entry_then_copy_to_tomcat`, `aa_ant_buildFrontEnd_ONLY_JS_From_WebpackDir_CopyToTomcat.xml`, and `v_webpack__Run__ScanFileBrowserPage_Only_Build.sh` call webpack with `--env build_entry=...` and copy from `webpack_build_output/`; the current `webpack.config.js` has no `build_entry` handling and outputs to `build/` — stale since the esbuild switch (inferred from reading, not run).
- Related / duplicates: three overlapping copy-to-Tomcat scripts (see duplicates section).
- Status: verified (main target); staleness of the per-page targets is inferred

---

## Docker, release, CI

### Emit Maven-resolved jars for the webapp image (`tomcat_image_setup`)
- What it solves: gets the MySQL JDBC driver into the webapp image's Tomcat `lib/` without committing the jar; the version stays visible in the filename.
- Search keywords: mysql connector tomcat lib, JDBC driver docker, tomcat_lib_jars, emitMysqlConnector, container-level jar
- Location: `tomcat_image_setup/build.gradle` (configuration `mysqlConnector`, task `emitMysqlConnector` -> `build/tomcat_lib_jars/`), `tomcat_image_setup/ant_emit_tomcat_image_files.xml`; consumed by root Ant (`deploy/tomcat_lib_jars`), `release.yml` (copies to `docker/webapp/`), `docker/webapp/Dockerfile` (`ADD tomcat_lib_jars/ /usr/local/tomcat/lib/`).
- Used by: root build, release workflow, webapp Dockerfile.
- How to use / extend: add another `configurations` entry + `from` in the Copy task for any other container-level jar.
- Do not use when: the jar belongs inside the WAR.
- Related / duplicates: MySQL connector declared separately in each Java-25 leaf `build.gradle`.
- Status: verified (re-checked)

### Docker images (webapp / importer / submit-import) and env-var credential injection
- What it solves: container images for the three deployables; DB credentials come from the environment, not files or the Java command line.
- Search keywords: Dockerfile, docker image, tomcat image, context.xml env, EnvironmentPropertySource, setenv.sh, WEBAPP_JAVA_OPTIONS, run importer container, JNDI datasource
- Location: `docker/webapp/Dockerfile` (base `tomcat:11.0-jdk25-temurin`; adds `context.xml`, `setenv.sh`, WAR, tomcat lib jars; appends `org.apache.tomcat.util.digester.PROPERTY_SOURCE=...EnvironmentPropertySource` to `catalina.properties` so `${...}` placeholders in the container config resolve from env; `setenv.sh` uses `${WEBAPP_JAVA_OPTIONS}`). `docker/importer/Dockerfile` (base `eclipse-temurin:25-jre`; entrypoint runs `limelightRunImporter.jar -c run_importer_config_file.properties`). `docker/submit-import/Dockerfile` (base `amazoncorretto:25`; `entrypoint.sh` = `exec "$@"`; launcher `limelightSubmitImport` uses `LIMELIGHT_SUBMIT_JAVA_PARAMS`).
- Used by: `release.yml` (build + push); compose files (image references).
- How to use / extend: for a new secret in the webapp, use an environment variable via Tomcat's env property source rather than a `-D` option. Importer-side DB connection settings: see `DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables` (environment overrides file); importer JVM params via `LIMELIGHT_JAVA_EXECUTE_PARAMS` / `LIMELIGHT_FEATURE_DETECTION_PROGRAM_JAVA_EXECUTE_PARAMS` (run importer config reader, [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md)).
- Do not use when: local Tomcat dev (use the copy-to-Tomcat scripts).
- Limits and gotchas: the webapp gets its DataSource via JNDI (`limelight_db_config.properties` holds only `spring.datasource.jndi-name`). Webapp Dockerfile still has the deprecated `MAINTAINER` instruction.
- Related / duplicates: docker-compose stacks; importer DB connection factory ([data_access.md](data_access.md) / [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md)).
- Status: verified (re-checked)

### docker-compose full stacks (named volumes vs host directories)
- What it solves: a full Limelight deployment: MySQL (schema auto-created from `database_scripts/install` as initdb scripts), spectr, file-object-store, blib export service, feature-detection service, importer, webapp, SMTP relay.
- Search keywords: docker compose, deployment, services, volumes, env-sample, MYSQL_OPTIONS, spectr service, file object store service, blib export, feature detection service, initdb
- Location: `docker-compose.yml` (named volumes), `docker-compose-custom-data.yml` (host dirs from env: `MYSQL_DATA_DIRECTORY`, `SPECTR_UPLOAD_DIRECTORY`, `SPECTR_STORAGE_DIRECTORY`, `LIMELIGHT_UPLOAD_DIRECTORY`, `FILE_OBJECT_STORE_DIR`, `BLIB_DESTINATION_DIR`, `BLIB_WORK_DIR`, `FEATURE_DETECTION_FINALDIR`, `FEATURE_DETECTION_WORKDIR`, `LIMELIGHT_CACHE_DIR`). Env template `docker/env-sample` (see the file for keys). Webapp service env keys also include `LIMELIGHT_CACHED_WS_RESP_DATA_DIR`, `LIMELIGHT_SESSION_TIMEOUT_MINUTES`. Docker default `config_system_tbl` rows are seeded by `database_scripts/install/090_docker_compose.sql`.
- Used by: `release.yml` packages both compose files + `database_scripts/install/*`, `database_scripts/version_upgrades/*`, `docker/env-sample` into `docker-compose-files.{tgz,zip}` release assets.
- How to use / extend: a new service or new webapp env var must be added to BOTH compose files and, if user-set, to `docker/env-sample`. If the Docker install needs a default DB config value, seed it in `090_docker_compose.sql`.
- Do not use when: n/a.
- Limits and gotchas: the two files are near-duplicates kept in sync by hand. Observed typo in `docker-compose-custom-data.yml`: `${FEATURE_DETECTION_FINALDIR:<default path>` (missing `}`) in the feature-detection service volumes (seen in file, not run). Images pinned by major tag (webapp/importer `:8`). Uses the obsolete top-level `version:` key.
- Related / duplicates: env-var naming split (Docker images entry); DB config system.
- Status: verified (re-checked)

### Release workflow (GitHub release -> build -> push images -> release assets) and legacy download zip
- What it solves: on a published GitHub release, builds everything, pushes the three Docker images (semver full + major tags) and uploads compose bundles and the submit-import jar.
- Search keywords: release, publish, docker push, GitHub Actions release, release assets, semver tags, quay.io, Docker Hub, download zip
- Location: `.github/workflows/release.yml` (trigger `release: released`; registry credentials from repository secrets; `LIMELIGHT_RELEASE_TAG` = release tag). Older manual alternative: `ant_create_download_zip_file.xml` (zips `deploy/`, `database_scripts/install/**`, `limelight_importer/Sample_Config_Files/**`, `limelight_run_importer/config_sample_file/**` into `download_zip_file/limelight_deploy.zip`, gitignored).
- Used by: GitHub (release event). Nothing references `ant_create_download_zip_file.xml` (grep).
- How to use / extend: a new image = add a "Copy binaries" line, a `docker/metadata-action` step and a `docker/build-push-action` step.
- Do not use when: n/a.
- Limits and gotchas: every push to master also triggers CI (`push.yml`). The zip Ant file is not part of the current release flow (unverified whether still used manually).
- Related / duplicates: two packaging paths (workflow assets vs zip Ant file).
- Status: verified

### CI and supply-chain checks (build on push/PR, wrapper validation, dependency graph, Dependabot)
- What it solves: build verification on master/PRs; tamper check of committed Gradle wrapper jars; Gradle dependency graph for security alerts; grouped weekly version-update PRs.
- Search keywords: CI, GitHub Actions, push.yml, dependabot, dependency submission, security alerts, gradle wrapper validation, javaToolchains, JAXB ignore
- Location: `.github/workflows/push.yml` (checks `javaToolchains` sees JDK 8 and 25, then full Ant build in the build image), `.github/workflows/gradle-wrapper-validation.yml`, `.github/workflows/dependency-submission.yml` (matrix: webapp, importer, run_importer, feature_detection_run_import, submit_import; runs Gradle with Java 21), `.github/dependabot.yml` (npm front end; Java-25 Gradle group with JAXB semver-major ignore; Java-8 Gradle group with JAXB >=4 ignore; github-actions).
- Used by: GitHub.
- How to use / extend: a new Gradle module must be added to `dependabot.yml` directories and, if it is a leaf build, to the `dependency-submission.yml` matrix.
- Do not use when: n/a.
- Limits and gotchas: a Dependabot PR bumping JAXB to 4.x on `limelight_submit_import_client_connector` must have that hunk dropped (root CLAUDE.md).
- Related / duplicates: root CLAUDE.md JAXB/Dependabot section.
- Status: verified

---

## Webapp startup, descriptors, logging

### Spring Boot application root, MVC config, thread config
- What it solves: Spring Boot WAR bootstrapping and MVC wiring: loads `application.properties` and `limelight_db_config.properties`; enables transactions and servlet-component scan; registers the 3 interceptors; serves `/static/**` with pre-compressed resources (`EncodedResourceResolver`, `resourceChain(false)`); JSP view resolver prefix `/WEB-INF/jsp/` with NO suffix (view names include `.jsp`); error view `generalError.jsp`; a startup assertion that the whitelabel error page is disabled; `@EnableAsync` plus a 1-thread daemon `ThreadPoolTaskScheduler`.
- Search keywords: Spring config, SpringBootServletInitializer, WebMvcConfigurer, interceptor registration, static resources, gzip static, view resolver, spring.mvc.view.prefix, error page, EnableAsync, thread pool, application.properties
- Location: `J/LimelightSpringApplicationRoot`, `J/LimelightWebAppConfig` (`addInterceptors`, `addResourceHandlers`, `internalResourceViewResolver()`), `J/LimelightWebAppThreadConfig`; `limelight_webapp/src/main/resources/application.properties` (only `spring.web.error.whitelabel.enabled`), `limelight_db_config.properties` (only `spring.datasource.jndi-name`), `user_mgmt_config.properties` (no active keys).
- Used by: framework; every page controller returns a view name relative to `/WEB-INF/jsp/`. Only `@Async` user is `CachedDataInFileMgmt_WriteFile_Async`; no `@Scheduled` users; the `threadPoolTaskScheduler` bean is not injected anywhere.
- How to use / extend: new interceptor -> add in `addInterceptors` (interceptor details: [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)); return `"<path under WEB-INF/jsp>.jsp"` from page controllers.
- Do not use when: n/a.
- Limits and gotchas: many controllers still carry the stale comment "Path to JSP specified in application.properties:spring.mvc.view.prefix" — the prefix moved to Java config. Assumption, unverified: with a user `ThreadPoolTaskScheduler` bean present, Spring Boot's default task executor may back off so `@Async` work runs on that single thread.
- Related / duplicates: interceptor chain ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)); webapp background threads / async ([background_processing_queues_maintenance.md](background_processing_queues_maintenance.md) H1).
- Status: verified (the async-executor note is unverified)

### `web.xml` deployment descriptor
- What it solves: cookie-only session tracking (no `;jsessionid` in URLs), registration of `HttpSession_InactivityTimeout_EnvVarOverride_Listener` (env var `LIMELIGHT_SESSION_TIMEOUT_MINUTES`), Log4j auto-shutdown disabled (`isLog4jAutoShutdownDisabled`; the webapp's own listener shuts Log4j down last), `<error-page>` mapping to `generalError.jsp`.
- Search keywords: web.xml, deployment descriptor, session timeout, jsessionid, cookie tracking, log4j shutdown, servlet listener, error-page
- Location: `W/WEB-INF/web.xml` (jakarta EE web-app 6.0 schema).
- Used by: Tomcat at deploy.
- How to use / extend: add listeners/context params here only when Spring Boot config cannot do it.
- Do not use when: Spring MVC config (interceptors, view resolver) — that is Java config in `LimelightWebAppConfig`.
- Limits and gotchas: version declared 6.0 (not 6.1) for Eclipse WTP compatibility, per comment.
- Related / duplicates: Webapp startup / shutdown listener.
- Status: verified

### Webapp startup / shutdown listener (`WebappServletContextListener`)
- What it solves: servlet-context startup: sets application attributes `contextPath`, `cacheBustValue`, `webserviceSyncTracking` (`WebConstants.APP_CONTEXT_*`), logs S3 upload and max-file-size config (`FileUploadMaxFileSize_Config_WithConstantsDefaults.getValuesAndLog`). Shutdown: sets stop flags on background threads (`CachedDataInFileMgmt_Remove_Old_CurrentSubdirs.setShutdownRequested`, `SpectralStorageService_Get_Supported_ScanFileSuffixes_At_LimelightStartup__Runnable_InThread.webappShutdownRequested`) and shuts Log4j down last.
- Search keywords: startup, shutdown, context initialized, contextDestroyed, undeploy, stop background thread, log4j shutdown, ServletContextListener
- Location: `J/servlet_context_listener/WebappServletContextListener` (`@WebListener`).
- Used by: container (registered by `@ServletComponentScan` on `LimelightSpringApplicationRoot`).
- How to use / extend: a new daemon/background thread in the webapp should expose a static shutdown flag and be added to `contextDestroyed`. Spring-bean init work belongs in `InitializingBean` / `@EventListener` instead.
- Do not use when: you need Spring beans (this listener is not Spring-managed; it uses static singletons).
- Limits and gotchas: keep the Log4j stop last (web.xml disables Log4j's own shutdown listener on purpose).
- Related / duplicates: Passing the DB connection to libraries (Spring-side startup); [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md) "Webapp background threads, shutdown flags and async execution".
- Status: verified (re-checked)

### Passing the webapp DB connection to library modules at startup (`init_*` packages)
- What it solves: library modules (`limelight_shared_code`, `limelight__db_populate_new_fields__common_code`, the embedded user-mgmt jar) cannot use Spring; on `ContextRefreshedEvent` the webapp injects connection providers backed by the webapp DataSource (`Limelight_JDBC_Base`) into their static singletons, plus the DB-backed config lookup for shared code.
- Search keywords: shared code DB connection, initialize library, ContextRefreshedEvent, connection provider, ConfigSystemTableGetValueCommon, populate new fields connection, library init
- Location: `J/init_shared_code_lib/InitializeSharedCodeLibrary` (+ `pass_to_shared_code_lib/SharedCode_DBConnectionProvider`; sets `SharedCodeOnly_DBConnectionProvider` and `ConfigSystemTableGetValueCommon.setIConfigSystemTableGetValue(configSystemDAO)`); `J/init_populate_new_db_fields_shared_code_lib/Initialize_PopulateNewDBFields_SharedCodeLibrary` (+ `PopulateNewDBFields_SharedCode_DBConnectionProvider`); `J/init_included_libs/InitializeIncludedLibraries` (+ `UserMgmtCentralMainDBConnectionFactory_For_Limelight`, calls `UserMgmtCentralWebappWebserviceAccessIF.init(...)`).
- Used by: framework (Spring `@EventListener`).
- How to use / extend: a new library module needing DB access gets a provider interface in the library, an implementation here extending `Limelight_JDBC_Base`, and a setter call in an `@EventListener(ContextRefreshedEvent)`.
- Do not use when: the code lives in the webapp itself (inject DAOs normally).
- Limits and gotchas: providers are set on `ContextRefreshedEvent`, so library code called earlier (e.g. from another bean's `afterPropertiesSet`) would see no provider (assumption, not traced). `Initialize_PopulateNewDBFields_SharedCodeLibrary` autowires `ConfigSystemDAO` but does not use it. The importer-side programs set the same singletons their own way ([data_access.md](data_access.md) / [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md)).
- Related / duplicates: `ConfigSystemTableGetValueCommon` (config section below); data access ([data_access.md](data_access.md)).
- Status: verified

### Log4j2 configuration (webapp: rolling logs + error-only log)
- What it solves: two daily-rolling, gzipped appenders under `${sys:catalina.base}/logs`: `limelight.log.current` (all INFO+) and `limelight_error.log.current` (ERROR+ via ThresholdFilter); 20-day retention; `%m{nolookups}`; commented-out debug loggers for IE/Edge detection, cached-data-in-file, Spring transactions.
- Search keywords: logging, log4j2, log file, rotate logs, error log, log retention, debug logger, log4j2.xml
- Location: `limelight_webapp/src/main/resources/log4j2.xml`.
- Used by: the webapp at runtime (SLF4J -> Log4j2).
- How to use / extend: add `<Logger name="..." level="debug"/>` entries for targeted debugging.
- Do not use when: importer / run importer / feature-detection importer — they have their own configs: `limelight_importer/src/main/resources/log4j2.xml`, `limelight_feature_detection_run_import/src/main/resources/log4j2.xml`, `limelight_run_importer/src/main/resources/log4j2.xml` plus `log4j2__write_to_sysout_log_level_info.xml` and `log4j2__write_to_log_file_under_pgm_run_dir.xml` (file list verified; contents not read).
- Limits and gotchas: `.log.current` suffix keeps OS logrotate off the live file; `Configuration status="debug"` makes Log4j print its own config debug at startup. Runnable jars must keep the `Log4j2PluginsCacheFileTransformer` in the shadow jar (fat-jar entry). Log4j shutdown is handled by the webapp listener (web.xml entry). When migrating servlet containers, also check the built WAR's jars for `javax` service registrations (e.g. Log4j web integration) that need jakarta replacements.
- Related / duplicates: non-webapp Log4j configs (listed above; contents not read).
- Status: verified

---

## JSP page skeleton and static resources

### JSP page skeleton: the standard include chain
- What it solves: every server-rendered page (data pages, project page, admin, user account, error pages) is built from the same ordered set of JSP includes so encoding, cache headers, CSP, base href, error handling, header, footer, analytics and JS bundle loading are identical everywhere. A new page = copy a sibling JSP and change title / root div ids / bundle names.
- Search keywords: JSP template, page layout, page shell, include, head section, body class, header, footer, new page, master page, taglib
- Location: `W/WEB-INF/jsp/`. Order used by a data page (`data_pages/project_search_ids_driven_pages/peptideView.jsp` is a clean template): (1) `jsp_includes_head_section/pageEncodingDirective.jsp` (UTF-8, first); (2) `jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp` (headers + doctype); (3) `<title>` with `head_section_title_start.jsp`; (4) one head include: `head_section_include_every_page.jsp` (base), `head_section_include_main_pages.jsp` (adds project ids + controller path prefixes), `head_section_include_data_pages.jsp` (adds search-data-lookup params, experiment data, nav links, user default URL), or `user_account_pages_and_parts/jsp_includes/head_section_include_user_pages.jsp`; (5) `<body class>` from `jsp_includes_body_start_body_end/body_tag_class_start_include_*.jsp` (`data-page`, `inset-body-class`, `standard-header-pages`, `user-account-page`); (6) paired wrapper-div includes `body_after_body_tag_start_include_data_pages.jsp` / `body_after_header_include_data_pages.jsp` closed by `body_before_footer_include_data_pages.jsp` / `body_before_closing_body_tag_include_data_pages.jsp`; (7) `jsp_header_footer/header_main_pages.jsp`, `jsp_header_footer/footer_main.jsp`; (8) `body_right_before_closing_body_tag.jsp` (optional Google Analytics); (9) `body_before_main_script_include__script_include_libs__page_header_js.jsp` (jQuery + header bundles), then the page bundle. `jsp_includes_taglib_imports/taglibImport.jsp` declares `c`, `fmt`, `fn` (jakarta.tags.*; no `.tld` files in the tree).
- Used by: about 42 JSPs include `pageEncodingDirective.jsp`; about 41 the cache-directives file; about 36 `footer_main.jsp`; about 26 `header_main_pages.jsp`; about 19 `head_section_include_data_pages.jsp` (counts approximate).
- How to use / extend: copy the closest existing page JSP; keep the include order; pass page values with `<script type="text/text" id=...>` blocks ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) "DOM data handoff").
- Do not use when: the response is JSON (REST controller) or an HTML fragment ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) page-fragment controller).
- Limits and gotchas: the open/close wrapper-div includes must be used in matched pairs. Several include headers carry stale path comments (e.g. `taglibImport.jsp`, `body_tag_class_start_include_user_pages.jsp`) — trust the real include lines.
- Related / duplicates: CSP and no-cache/frame headers ([web_security_csp_and_xss_url_hardening.md](../web_security_csp_and_xss_url_hardening.md)); access-level bundle selection ([front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)); error pages ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Status: verified

### Main header and footer includes
- What it solves: standard page header (logo link, Projects dropdown, current project title + lock icon, user name link, ADMIN link, docs/login/logout icons) and footer (release tag / git commit link from build info, copyright, admin-configured center HTML).
- Search keywords: page header, navbar, footer, version display, release tag, git hash, logout link, admin link
- Location: `W/WEB-INF/jsp/jsp_header_footer/header_main_pages.jsp`, `W/WEB-INF/jsp/jsp_header_footer/footer_main.jsp`. Inputs: request attrs `headerUserInfo`, `headerUserIsAdmin`, `headerProjectInfo` (set by `J/web_utils/PopulatePageHeaderData`), `Webapp_VersionAndGitInfo_FromBuild` (set by `All_Page_Controllers_SpringHandlerInterceptor`), `configSystemValues.footerCenterOfPageHTML`.
- Used by: about 26 JSPs (header), about 36 JSPs (footer).
- How to use / extend: include; dynamic parts (projects dropdown) are wired by the header bundles.
- Do not use when: inset pages (login, errors) — they include only the footer.
- Limits and gotchas: header uses real `<a href>` links (pre-dates the fake-link rule).
- Related / duplicates: `PopulatePageHeaderData` (`J/web_utils/PopulatePageHeaderData`); version info entry.
- Status: verified

### Static third-party JS/CSS, images and downloadable sample files
- What it solves: legacy libraries and static assets served as files: `W/static/js/libs/` (jQuery, jQuery Migrate, jQuery UI; jQuery and jQuery Migrate on every main page via the script-include JSP) + `W/static/css/jquery-ui*.css`, `W/static/css/lorikeet.css` + `W/static/images/lorikeet/*` (Lorikeet viewer only); shared icons `W/static/images/icon-*.png`, data-table paging SVGs, logos, favicon; example downloads `W/static/sample_files_for_web_download/` (`example_bullseye_conf.txt`, `example_hardklor_conf.txt`).
- Search keywords: jQuery, jQuery UI, Lorikeet css, static library, icon, image, svg, logo, favicon, paging icons, sample file, example config download
- Location: `W/static/js/libs/`, `W/static/css/`, `W/static/images/`, `W/static/sample_files_for_web_download/`.
- Used by: jQuery about 27 JSPs; jQuery UI + lorikeet.css only `W/WEB-INF/jsp/data_pages/lorikeetSpectrumViewerView.jsp`; paging SVGs in `FE/.../data_table_react/dataTable_TableRoot_React_Table_PageNavigation.tsx`; sample downloads in `projectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SubmitRun_Component.tsx`.
- How to use / extend: reference as `static/images/<name>` (relative to `<base href>`), pair icons with `icon-small`/`icon-large` classes; drop new example files in `sample_files_for_web_download/`. Do not add new JS libraries here — use npm + the bundles.
- Do not use when: new React UI (bundled deps, MUI icons).
- Limits and gotchas: no cache-bust on libs or images. `W/static/js/page_js/A_InternetExporer_DetectAndDisplayInfo.js` is dead (only a commented-out reference).
- Related / duplicates: npm-managed libraries; SCSS/CSS utility classes ([front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)).
- Status: verified (image users sampled)

### Optional Google Analytics include (template for config-driven third-party script)
- What it solves: when the admin config value `googleAnalyticsTrackingCode` (from `configSystemValues`) is set, emits the gtag loader and `W/static/js/page_js/mainPages_GoogleAnalytics.js`.
- Search keywords: analytics, Google Analytics, gtag, tracking code, optional third-party script
- Location: `W/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp`, `W/static/js/page_js/mainPages_GoogleAnalytics.js`.
- Used by: about 40 JSPs.
- How to use / extend: template for adding any optional, config-driven third-party script (also add its origin to the CSP — [web_security_csp_and_xss_url_hardening.md](../web_security_csp_and_xss_url_hardening.md)).
- Do not use when: n/a.
- Related / duplicates: JSP-visible config bean.
- Status: verified

---

## Configuration system

### Config mechanisms catalog (which one, and in which precedence)
- What it solves: one map of every config mechanism found, so a new setting reuses the right one instead of inventing another.
- Search keywords: configuration, settings, config file, environment variable, -D, system property, config precedence, override, deployment config, admin config, where is X configured
- Location / catalog (all key names from code):
  - **DB table `config_system_tbl`** (admin-editable at runtime): keys in `J/constants/ConfigSystemsKeysConstants` (webapp-only) and `SC/config_system_table_common_access/ConfigSystemsKeysSharedConstants` (shared). See "DB config system".
  - **Webapp classpath `.properties` -> env var -> `-D`** (same name for env and `-D`): cached-in-file dir (`limelight_cached_data_stored_in_files_configuration.properties` / `subdir.to.store.files.in` / `LIMELIGHT_CACHED_WS_RESP_DATA_DIR`), in-memory cache size (`limelight_cached_in_memory__configuration.properties` / `cached.in.memory.max.cache.size.mb` / `LIMELIGHT_CACHED_IN_MEMORY_MAX_CACHE_SIZE_MB`), parallel stream (`limelight_parallelstream_java_processing_enable_configuration.properties` / `parallelstream.default.thread.pool.java.processing.enable` / `LIMELIGHT_PARALLELSTREAM_DEFAULT_THREAD_POOL_JAVA_PROCESSING_ENABLE`). See "Webapp file/env/-D reader pattern".
  - **Webapp classpath `.properties` -> env -> `-D` -> config table**: spectr get-data URL (`limelight_spectral_storage_service_connection_configuration.properties` / `spectral.storage.service.get.data.url` / `LIMELIGHT_SPECTRAL_STORAGE_SERVICE__GET_DATA_URL`, fallback key `SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL`) — [storage_files_external_services.md](storage_files_external_services.md).
  - **Env -> `-D` -> config table -> default**: upload max sizes (`LIMELIGHT_LIMELIGHT_XML_FILE_MAX_SIZE_IN_GB`, `LIMELIGHT_FASTA_FILE_UPLOAD_MAX_SIZE_IN_GB`, `LIMELIGHT_SCAN_FILE_MAX_SIZE_IN_GB`, `LIMELIGHT_GENERIC_OTHER_FILE_MAX_SIZE_IN_GB`; `FileUploadMaxFileSize_Config_WithConstantsDefaults`) — [storage_files_external_services.md](storage_files_external_services.md); S3 upload bucket/region (`LIMELIGHT_FILE_UPLOADS_AWS_S3_BUCKET`, `LIMELIGHT_FILE_UPLOADS_AWS_S3_REGION`; `SC/file_import_common/Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values`, names in `SC/constants/EnvironmentVariable_Keys_Constants`) — [storage_files_external_services.md](storage_files_external_services.md). Sample doc listing these overrides: `limelight_webapp/Sample_Configuration_Via_EnvironmentVariables_JavaDashDparameters/` (verified: its `.txt` line 14 names `LIMELIGHT_MAX_FASTA_FILE_UPLOAD_SIZE_DEFAULT_IN_GB`, but `FileUploadMaxFileSize_Config_WithConstantsDefaults.java:52` defines `LIMELIGHT_FASTA_FILE_UPLOAD_MAX_SIZE_IN_GB` — the sample doc is out of date and also omits `LIMELIGHT_GENERIC_OTHER_FILE_MAX_SIZE_IN_GB`; follow the code).
  - **Webapp optional classpath `.properties` only (absent = feature off)**: `limelight_send_email_on_server_javascript_error_configuration.properties` (`server.or.javascript.error.emails.*`, SMTP override keys), `limelight_send_extra_email_on_import_finish_success_or_error_configuration.properties` (`emails.to.send.to.for.{all,failed,success}.imports.on.finish`, `emails.from.address`, `server.identifier`, `smtp.server.*`) — [storage_files_external_services.md](storage_files_external_services.md) (`..._ReadConfig` classes).
  - **Webapp env-var only**: `LIMELIGHT_SESSION_TIMEOUT_MINUTES` (`HttpSession_InactivityTimeout_EnvVarOverride_Listener`). Build-time env: `LIMELIGHT_RELEASE_TAG*`. A dev-environment JVM flag (cache-bust; see `GetJsCssCacheBustString`).
  - **Webapp container config**: Tomcat JNDI DataSource with env-resolved placeholders; `WEBAPP_JAVA_OPTIONS` in `setenv.sh`.
  - **Importer-side properties file with env override (env wins)**: DB params (`DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables`); importer non-DB settings (`limelight_importer/.../config/Process_ConfigFileData_OtherThanDBConfig` — keys `spectral.storage.send.scan.file.location(.if.path.starts.with)`, `file.object.storage.send.file.location(.if.path.starts.with)`; env `LIMELIGHT_IMPORTER_SPECTRAL_STORAGE_SEND_SCAN_FILE_LOCATION(_IF_STARTS_WITH)`, `LIMELIGHT_IMPORTER_FILE_OBJECT_STORAGE_SEND_FILE_LOCATION(_IF_STARTS_WITH)`); run importer daemon (`ProcessImporterRunnerConfigFileEnvironmentVariables`, `-c <file>`; keys such as `database.cleanup.disable`, `wait.time.for.next.check.for.import.to.process`, `java.executable.with.path`, `java.executable.parameters`, `importer.jar.with.path`, `importer.db.config.file.with.path`, `feature_detection.importer_and_run_pipeline.jar.with.path`, `run.importer.pid.file.with.path`, `limelight.web.app.base.url`, `command.run.successful.import`) — [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md). Sample files: `limelight_importer/Sample_Config_Files/`, `limelight_feature_detection_run_import/Sample_Config_Files/`, `limelight_run_importer/config_sample_file/`.
  - **Submit-import CLI**: `LIMELIGHT_SUBMIT_JAVA_PARAMS` (Docker launcher); program options/config: [storage_files_external_services.md](storage_files_external_services.md).
- Used by: n/a (catalog).
- How to use / extend: admin-changeable at runtime, or needed by importer and webapp alike -> `config_system_tbl`. Deploy-time webapp setting -> the file/env/-D reader pattern. Must override a DB value from Docker -> follow the spectr URL reader (or the upload-size reader) and document it in the sample `.txt`. Secret for the webapp container -> environment variable. Write down the precedence in the class Javadoc; it differs between mechanisms.
- Do not use when: n/a.
- Limits and gotchas: precedence orders differ (props -> env -> -D; props -> env -> -D -> table; env -> -D -> table -> default; importer: env -> props). No shared reader base class — each reader is copy-paste.
- Related / duplicates: every entry in this section; [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md) "Run Importer config"; [storage_files_external_services.md](storage_files_external_services.md) config entries.
- Status: unverified as a whole (each listed reader was read individually; the FASTA env-name discrepancy was spot-checked by grep)

### DB config system: `config_system_tbl` + key-name constants + read/write paths
- What it solves: admin-editable runtime configuration (service URLs, email/SMTP, file paths, feature switches, footer HTML, analytics code) stored in the DB instead of files.
- Search keywords: config, system config, settings, key value, config_key, config_value, admin config, configuration table, ConfigSystemsKeysConstants, ConfigSystemsKeysSharedConstants, textConfigKeys, ConfigSystemDAO
- Location: table `config_system_tbl (id, config_key VARCHAR(255) UNIQUE, config_value VARCHAR(4000), comment)` in `database_scripts/install/001...`; seeded by `install/003` and `install/090_docker_compose.sql` (Docker defaults). Key constants: `J/constants/ConfigSystemsKeysConstants` (webapp-only: signup without invite, reCAPTCHA site/secret key names, admin email, email/SMTP settings, import notification email lists, footer HTML, analytics code; `textConfigKeys` set for the admin page) and `SC/config_system_table_common_access/ConfigSystemsKeysSharedConstants` (spectral storage URLs, blib URL/path, feature-detection service URL/path, YRC File Object Storage URL, import temp dir, S3 bucket/region, scan-file import/save/download flags, max file sizes, delete-uploaded-files flags, terms-of-service flag; own `textConfigKeys`), values `ConfigSystemsValuesSharedConstants` (`"true"`/`"false"`). Example key strings (from `090`): `spectral_storage_service_accept_import_base_url`, `spectral_storage_service_get_data_base_url`, `email_from_address`, `email_smtp_server_host`, `footer_center_of_page_html`, `file_import_limelight_xml_scans_temp_dir`, `scan_file_import_allowed_via_web_submit`, `scan_file_save_to_file_object_storage`, `scan_file_download_from_file_object_storage_allowed`, `import_delete_uploaded_files_after_import`, `admin_email_address`, `blib_spectral_library_file_creation_web_service_base_url`, `run_feature_detection_service_run_hardklor_bullseye_web_service_base_url`, `yrc_file_object_storage_web_service_base_url`. Readers: webapp `dao/ConfigSystemDAO(_IF)` (about 73 call sites), importer-side `limelight_importer_run_importer_shared/.../dao/ConfigSystemDAO_Importer`. Writer: `Config_UpdateInsert_ConfigEntries_UsingDBTransactionService.updateValueOnlyOnConfigKey(List<ConfigSystemDTO>)` (admin save via `WebappConfig_Config_Save_RestWebserviceController`, which checks both `textConfigKeys` sets; admin page `webappAdminConfiguration.jsp`, controller `AdminConfiguation_Controller`).
- Used by: about 19 users of `ConfigSystemsKeysConstants` (e.g. `WebappConfig_Config_Save_RestWebserviceController`, `UserCreateAccount_RestWebserviceController`); about 62 users of the shared key constants; feature-detection getters `GetFeatureDetectionConfigFromConfigTable` ([background_processing_queues_maintenance.md](background_processing_queues_maintenance.md)).
- How to use / extend: webapp-only key -> `ConfigSystemsKeysConstants` (+ its `textConfigKeys` if plain-text editable on the admin page); key also read by importer/run importer -> `ConfigSystemsKeysSharedConstants` (+ its `textConfigKeys`). Check BOTH classes before adding. Seed a default in `090_docker_compose.sql` if the Docker install needs one; existing installs get it from the admin config page.
- Do not use when: secrets that should not be in the DB; per-project/per-user settings; values that must change without DB access (use env/-D override readers).
- Limits and gotchas: values are strings capped at 4000 chars. Two key-constant classes, each with its own `textConfigKeys`. Webapp reads are not cached: `ConfigSystemDAO.getConfigValueForConfigKey` runs a `SELECT` per call (verified: `J/dao/ConfigSystemDAO.java:80-84`, no cache field), so every JSP-bean getter hits the DB. The version comparers also query this table as a "DB reachable" probe.
- Related / duplicates: `ConfigSystemTableGetValueCommon` (next); JSP-visible config bean; feature switches; [data_access.md](data_access.md) "System config table read / write".
- Status: verified (DDL, seeds, constants read; users from grep)

### Config table access from shared code (`ConfigSystemTableGetValueCommon`)
- What it solves: lets shared-library code read `config_system_tbl` without knowing which module (webapp, importer, feature-detection importer, run importer) it runs in; each module injects its own reader.
- Search keywords: config table shared code, IConfigSystemTableGetValue, get config value from library, config access singleton
- Location: `SC/config_system_table_common_access/ConfigSystemTableGetValueCommon` (singleton; `setIConfigSystemTableGetValue`, `getConfigValueForConfigKey` returns null if absent), interface `IConfigSystemTableGetValue`. Implementations: `ConfigSystemDAO_Importer` (importer-side), webapp `dao/ConfigSystemDAO`.
- Used by: injected in `LimelightImporterProgram`, `RunImporterProgram`, `Limelight_FeatureDetection_Run_Import_Program`, webapp `InitializeSharedCodeLibrary`; read by `ScanFileToSpectralStorageService_SendFile`, `Limelight_XML_ImporterWrkDirAndSbDrsCmmn`, `Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values`, feature-detection spectral-storage callers.
- How to use / extend: in shared code always go through this class; importer-side code may call `ConfigSystemDAO_Importer` directly.
- Do not use when: in the webapp itself (inject `ConfigSystemDAO_IF`).
- Limits and gotchas: throws `IllegalStateException` if no implementation was injected (e.g. called before the webapp's `ContextRefreshedEvent`). No caching (the importer implementation hits the DB per call).
- Related / duplicates: two `IConfigSystemTableGetValue` implementations; DB config system.
- Status: verified

### JSP-visible system config values bean (`AppContextConfigSystemValuesRetrieval`)
- What it solves: exposes selected `config_system_tbl` values and "is feature configured" flags to every JSP as `${ configSystemValues.xxx }` (footer HTML, Google Analytics code, max password UTF-8 bytes, XML import configured, scan-file import allowed, File Object Storage import allowed).
- Search keywords: configSystemValues, JSP config, footer HTML, google analytics, servlet context attribute, config in JSP
- Location: `J/config_system_table/AppContextConfigSystemValuesRetrieval` (Spring `@Component`); placed in the servlet context under `WebConstants.CONFIG_SYSTEM_VALUES_HTML_KEY` (`"configSystemValues"`) by `AllControllers_SpringHandlerInterceptor.preHandle`.
- Used by: `body_right_before_closing_body_tag.jsp` (analytics), `project_view_page/projectView_UploadData.jsp` (import flags), `webappAdminManageUsers.jsp` and the user-account pages `createAccount_NoInvite.jsp`, `inviteLandingPage.jsp`, `resetPasswordLandingPage.jsp`, `userAccountManagement.jsp` (password max length), `footer_main.jsp` (`footerCenterOfPageHTML`).
- How to use / extend: add a public getter that reads via `ConfigSystemDAO_IF.getConfigValueForConfigKey(ConfigSystemsKeysConstants.XXX_KEY)` (catch + log, return fallback); reference as `${ configSystemValues.newProp }`.
- Do not use when: Java code needs a config value — call `ConfigSystemDAO_IF` directly.
- Limits and gotchas: no caching — each getter hits the DB on every JSP evaluation. Getter failure returns `"UNABLE_TO_RETRIEVE_VALUE"` (footer) or `null`.
- Related / duplicates: `ConfigSystemDAO_Importer` (non-webapp reader of the same table).
- Status: verified (re-checked)

### Config-table boolean feature switches (`Is...AllowedViaWebSubmit` / `Is...FullyConfigured` / `IsTermsOfServiceEnabled`)
- What it solves: one-line "is this feature enabled on this install" checks driven by `config_system_tbl`, used to gate webservices and JSP display.
- Search keywords: feature flag, feature enabled, is configured, import allowed, scan file upload allowed, file object storage enabled, terms of service enabled, config switch
- Location: `J/.../file_import_limelight_xml_scans/utils/`: `IsLimelightXMLFileImportFullyConfigured` (temp-dir key non-blank), `IsScanFileImportAllowedViaWebSubmit` (key equals `ConfigSystemsValuesSharedConstants.TRUE`), `IsFileObjectStorageFileImportAllowedViaWebSubmit` (FOS URL key non-empty); `J/web_utils/IsTermsOfServiceEnabled(_IF)` (`TERMS_OF_SERVICE_ENABLED`). Similar: `Blib_Spectral_Library_Webservice_Configured__SetForJSP` ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)), `GetFeatureDetectionConfigFromConfigTable.fullyConfigured_FeatureDetection` ([background_processing_queues_maintenance.md](background_processing_queues_maintenance.md)).
- Used by: `AppContextConfigSystemValuesRetrieval`, upload/submit controllers, feature-detection and gold-standard import controllers, `StructureFile_Contents_UploadData_RestWebserviceController`; ToS check by `UserLogin_RestWebserviceController`, `UserCreateAccount_RestWebserviceController`, `Invite_ProcessCode_Controller`, `WebappConfig_TermsOfService_GetCurrent_RestWebserviceController`.
- How to use / extend: copy one of these tiny classes (inject `ConfigSystemDAO_IF`, read key, return boolean, catch -> `false`).
- Do not use when: you need the work dir validated to exist — use `Limelight_XML_ImporterWrkDirAndSbDrsCmmn.validate_Limelight_XML_Importer_Work_Directory()`.
- Limits and gotchas: exceptions are logged and mapped to `false` (feature silently "off" on DB error). `IsLimelightXMLFileImportFullyConfigured` logs under the wrong class. Reads the DB on every call.
- Related / duplicates: [storage_files_external_services.md](storage_files_external_services.md) has the file-feature switches in detail.
- Status: verified (re-checked)

### Webapp file / env / -D config reader pattern (+ filename constants and sample files)
- What it solves: reads one deployment setting at startup with precedence (1) a `.properties` file on the classpath (Tomcat lib dir), (2) environment variable, (3) `-D` system property with the same name as the env var; logs where the value came from.
- Search keywords: Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param, config file, environment variable, -D parameter, system property, startup config, sample configuration, ConfigFilename_Constants
- Location: instances `J/cached_data_in_file/CachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup`, `J/cached_data_in_memory_mgmt/Cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup`, `J/parallelstream_java_processing_enable_configuration/ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup`, `J/spectral_storage_service_interface/SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup`. Filenames centralized in `J/constants_config_filenames/*_ConfigFilename_Constants` (cached-in-file, cached-in-memory, parallel stream, send-email-on-error, extra-email-on-import-finish, spectral storage connection, build-info). Samples: `limelight_webapp/Sample_Configuration_Files/`, `limelight_webapp/Sample_Configuration_Via_EnvironmentVariables_JavaDashDparameters/`. Optional props-only variant: the `..._ReadConfig` email classes ([storage_files_external_services.md](storage_files_external_services.md)).
- Used by: the cache, parallel-stream and spectral-storage components; the email `_ReadConfig` classes use the filename constants.
- How to use / extend: copy one reader (each is a self-contained `@Component` with a private `getStringFromConfigFile()`), add a filename constant, add a sample file, and add the filename to `limelight_webapp/src/main/resources/.gitignore` if a dev copy may live in resources. Read once (in `afterPropertiesSet`) and keep the value.
- Do not use when: the value belongs in `config_system_tbl` so admins can change it at runtime.
- Limits and gotchas: copy-paste, not a library; no shared base class. Values read once at startup (restart to change). If the cache dir is missing or unwritable, disk caching is silently disabled (logged). Never commit real configuration values.
- Related / duplicates: four near-identical readers; env-var-only readers (e.g. `HttpSession_InactivityTimeout_EnvVarOverride_Listener`); DB config system.
- Status: verified (file-to-reader mapping by filename grep)

### Parallel stream enable switch
- What it solves: global opt-in to use Java `parallelStream()` (common ForkJoin pool) in heavy webservices. Default false.
- Search keywords: parallel stream, multithread, ForkJoin, LIMELIGHT_PARALLELSTREAM_DEFAULT_THREAD_POOL_JAVA_PROCESSING_ENABLE
- Location: `J/parallelstream_java_processing_enable_configuration/ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup(_IF)`; key `parallelstream.default.thread.pool.java.processing.enable`, value must be exactly `true`.
- Used by: `PsmTable_Data_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController`, `Psm_IDs_PerReportedPeptide_...`, `Psm_OpenModificationMasses_...`, `ReportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcher`, PSM download controllers (about 7 users).
- How to use / extend: read once in `afterPropertiesSet`, store in a boolean field, branch `parallelStream()` vs `stream()` (batch-fetch pattern: [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Do not use when: per-element DB calls without care for connection-pool size; non-thread-safe work.
- Limits and gotchas: the reader re-reads config on each call (not cached), so call once at init.
- Related / duplicates: file/env/-D reader pattern; [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) "Parallel-stream batch fetch".
- Status: verified

---

## Cross-references (owned by other areas)

- Stop-control file and PID file + start/restart scripts (`limelight_run_importer`) — [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md) (A5).
- Run Importer config reader (`ProcessImporterRunnerConfigFileEnvironmentVariables`, keys listed in the catalog above) — [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md) (A2).
- Feature-detection config keys — [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md) (D3).
- Webapp background threads, shutdown flags, `@Async` — [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md) (H1).
- DB schema-version gate (webapp interceptor, importer, cleanup, populate; 4 copies) — [data_access.md](data_access.md) / [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md) / [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md).
- Importer / run-importer DB connection factory and its params — [data_access.md](data_access.md) / [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md).
- Versioned webservice response cache, on-disk tier, in-memory cache registry and size budget — [storage_files_external_services.md](storage_files_external_services.md) (config keys in the catalog above).
- Spectr URL override, upload max-file-size config, S3 bucket/region resolution, `..._ReadConfig` email config, extra emails on import finish — [storage_files_external_services.md](storage_files_external_services.md).
- Submit-import version handshake / same-machine mode — [storage_files_external_services.md](storage_files_external_services.md).
- Webservice sync tracking (server validator + front-end reload) — [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md).
- Spring interceptor chain, schema-version gate interceptor, error page controllers / `generalError.jsp` flags, page-fragment controller, DOM data handoff (`<script type="text/text">`), JSP request-attribute setters — [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md).
- Access-level-based JS bundle selection in the page JSP, page roots, SCSS + brand colors + shared CSS utility classes, error display UI / global onerror banner — [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md) (build mechanics: front-end build pipeline here).
- `GenerateRandomStringForCode` — [security_access_control_sessions.md](security_access_control_sessions.md). CSP `<meta>` + inline-script hashes, no-cache + anti-clickjacking headers — [web_security_csp_and_xss_url_hardening.md](../web_security_csp_and_xss_url_hardening.md).
- Data REST path constants (`AA_RestWSControllerPaths_Constants`, `-version-N` suffix) — [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md).
- `database_scripts` install / upgrade scripts (MySQL Docker initdb) — [data_access.md](data_access.md).

## Duplicates and parallel mechanisms in this area

- **Config mechanisms**: DB `config_system_tbl` vs webapp props/env/-D readers (4 copy-paste classes, no base) vs env-only readers vs importer props+env readers, with different precedence orders. Prefer: `config_system_tbl` for admin-editable/shared settings; the props->env->-D reader for deploy-time webapp settings (these rules are stated per setting; no single preferred mechanism overall).
- **Two config-key constant classes**: webapp `ConfigSystemsKeysConstants` vs shared `ConfigSystemsKeysSharedConstants`, each with its own `textConfigKeys`. Check both before adding.
- **Two git-info mechanisms**: jar manifest attributes (unread) vs webapp `limelight_version_from_build.properties` (read; prefer). The build-info filename is hard-coded twice; `CachedDataInFileMgmt_WriteFile_GetGitCommitHash` is an unused third reader.
- **Leaf modules re-declare common deps** (db_populate, db_cleanup; importer-side AWS/dbcp2/mysql/log4j block) — violates the root CLAUDE.md centralization rule; prefer `limelight_shared_code` `api`.
- **Two compose files** edited in parallel by hand (one already has a typo).
- **Two Docker-build instructions**: `build_in_docker.sh` (prefer) vs `docker/*/BUILD.md` (older, partly wrong).
- **Two packaging paths**: release workflow assets (prefer, current) vs `ant_create_download_zip_file.xml` (legacy).
- **Three copy-to-local-Tomcat scripts**: `ant_buildFrontEnd_CopyToTomcat.xml` main target (prefer) vs `aa_ant_buildFrontEnd_ONLY_JS_From_WebpackDir_CopyToTomcat.xml` and `v_webpack__Run__ScanFileBrowserPage_Only_Build.sh` (stale).
- **Two type-check entry points**: shell script (always `tsc`) vs Gradle task (honors `tsgo` override; prefer).
- **Two global JS error handlers** (JSP inline banner then TS handler) — intentional hand-off ([front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)).
- `limelight_submit_import` is built twice per full build.

## Open questions / unverified

- Whether `@Async` on the package-private `CachedDataInFileMgmt_WriteFile_Async` method is proxied, and which executor runs it (single-thread `ThreadPoolTaskScheduler` vs Boot default).
- Init order: library providers are set on `ContextRefreshedEvent`; whether any bean uses shared code earlier was not traced.
- `.js.gz` serving: `EncodedResourceResolver` is registered (spot-checked), so the gzipped bundles are likely served; not runtime-tested.
- Staleness of per-page webpack Ant targets and `v_webpack__*.sh` inferred from reading, not run.
- Whether grgit fails in a non-git source tarball (assumption).
- RESOLVED: `ConfigSystemDAO` (webapp) does not cache — one `SELECT` per `getConfigValueForConfigKey` call.
- RESOLVED: FASTA max-size env var — code defines `LIMELIGHT_FASTA_FILE_UPLOAD_MAX_SIZE_IN_GB`; the sample `.txt` name is stale (see catalog).
- `docker-compose-custom-data.yml` missing-`}` typo — Re-confirmed (one of the two `FEATURE_DETECTION_FINALDIR` lines lacks `}`); effect not run.
- PARTLY RESOLVED: importer / run importer / feature-detection Log4j config files located (see Log4j2 entry); their contents were not read.
- Whether `ant_create_download_zip_file.xml` is still used manually.
