# limelight_webapp

Spring MVC web application, packaged as a WAR and deployed to Tomcat. Reads the
Limelight database to visualize and share imported proteomics results. The
backend is in this directory; the TypeScript/gradle/esbuild/webpack UI is under `front_end/`
(see `front_end/CLAUDE.md`). For repo-wide context and the module map, see the
root `CLAUDE.md`.

## Building

Build the WAR by running the Ant script — always Ant, never Gradle directly:

```
ant -f ant_create_war.xml
```

The WAR is itself built by Gradle (the webapp's `build` task), but you must go
through Ant because `ant_create_war.xml` orchestrates the prerequisite steps in
order: it (1) builds the `limelight_submit_import` runnable jar, (2) runs Gradle
in `front_end/` (`frontEndBuild_ForProduction`) to produce the webpack bundles,
then (3) runs Gradle here (`build`) to assemble the WAR. Invoking `./gradlew
build` directly skips steps 1–2 and produces an incomplete WAR.

To build and deploy to a local Tomcat during development:

```
ant -f ant_build_War_CopyToTomcat.xml
```

(configure the target via `ant_buildFrontEnd_CopyToTomcat.settings.properties`)

## Layout & conventions

All backend code lives under
`src/main/java/org/yeastrc/limelight/limelight_webapp/` — everything for the
Spring app must be under this package (see `ZZ_README.txt`). ~1200 Java files.

- **Entry / config**: `LimelightSpringApplicationRoot`, `LimelightWebAppConfig`,
  `LimelightWebAppThreadConfig`, `servlet_context_listener/`.
- **Controllers**: `spring_mvc_parts/` — `data_pages/` (page controllers),
  `controllers_other_than_for_pages/`, `error_pages_controllers/`,
  `user_account_pages/`, `webapp_admin_pages/`. REST endpoints are
  `@RestController` classes (~220 of them) spread across feature packages.
- **DAOs**: `dao/` and feature-local `*/dao/` packages (~165 files). Convention is
  an interface + impl pair: `FooDAO_IF` (interface) + `FooDAO` (Spring
  `@Component` impl). Inject the `_IF`, not the concrete class.
- **Read-side query objects**: `searchers/` (~280 files, `FooSearcher` +
  `FooSearcherIF`), `searchers_results/`, `services/`, `services_result_objects/`.
- **Caching**: `cached_data_in_file/`, `cached_data_in_memory_mgmt/`,
  `cached_data_in_webservices_mgmt/`.
- **External services**: `spectral_storage_service_interface/`,
  `blib_file__creation_web_service__call_webservice_code/`.
- **Shared-lib init**: `init_shared_code_lib/`,
  `init_populate_new_db_fields_shared_code_lib/` wire in the
  `limelight_shared_code` and `db_populate_new_fields` modules on startup.

## Gotchas

- **Access control**: login is required for all URIs except the login page,
  enforced in `AllControllersAccessControl_SpringHandlerInterceptor`. Add new
  public paths there.
- **Adding a page** requires a front-end change too: add an esbuild entry point in
  `front_end/build.gradle` — **not** in `webpack.config.js`. esbuild bundles all
  TS/JS; webpack processes SCSS only; types are checked with `tsc --noEmit`. The
  bundles are copied into `src/main/webapp/static/`. The full front-end pipeline is
  documented in `front_end/CLAUDE.md` (authoritative — `README_Development.md` is
  stale on the build). See also `README_AddingURLsWithHash.md`.
- **Runtime config** is read from properties files / env vars / `-D` JVM params on
  startup; templates are in `Sample_Configuration_Files/`.
- There is no JUnit suite in `src/test` — verify changes by building and running.
