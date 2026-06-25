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

## Authorization (per-project access control)

Login is one layer; **per-project authorization is separate and is mostly the
controller's own job.** The code lives in `access_control/`. Read this before
adding or reviewing any data controller.

### The model

A project has members (`project_user_tbl` → `ProjectUserDTO`, one access level
per user) and an owner. A project can additionally be made **public** (readable
by anyone, even not logged in) and/or carry a **public access code** (a
shareable code in the URL/session that grants read). A project can be **locked**
(frozen) which downgrades everyone to read-only. So the access level for a
`(user, projectId)` pair resolves as: admin → `ADMIN`; else project member →
their `ProjectUserDTO` level; else project public → the public level; else
`NONE`. "No session" (anonymous, possibly with a public access code) is tracked
separately from a real logged-in user.

### Access levels — `constants/AuthAccessLevelConstants` (LOWER int = MORE access)

`ADMIN 0 < CREATE_NEW_PROJECT/USER 25 < PROJECT_OWNER 30 (= SEARCH_DELETE) <
ASSISTANT_PROJECT_OWNER/RESEARCHER 38 < WRITE 50 < LOGGED_IN_USER_READ_ONLY 90 <
PUBLIC_ACCESS_CODE/PUBLIC_PROJECT_READ_ONLY 99 < NONE 9999`.
`WebSessionAuthAccessLevel.is<Level>Allowed()` means `authAccessLevel <= LEVEL`
(i.e. "at least this privileged"). `isPublicAccessCodeReadAllowed()` = `<= 99` =
**"any read at all"** (the minimum grant); `NONE` (9999) is the only level that
fails it. There is also an `...IfProjectNotLockedAllowed()` variant per level
(uses the pre-lock level) and an exact-match `isPublicAccessCodeReadAccessLevel()`.

### Two families — pick by controller type

- **REST controllers → the THROWING validators** in
  `access_control/access_control_rest_controller/`:
  - `ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds`
    (keyed on **projectSearchIds**) and
  - `ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds`
    (keyed on **projectIds**).
  Call one `validate<Level>Allowed(ids, request)` — `validatePublicAccessCodeReadAllowed`
  (read), `validateAssistantProjectOwnerAllowed`, `validateProjectOwnerAllowed`,
  `validateWriteAllowed`, `validateSearchDeleteAllowed`, `validateAdminAllowed`,
  the `...IfProjectNotLocked...` variants, etc. **One call is the complete gate:**
  it computes the level and **throws** `Limelight_WS_AuthError_Forbidden_Exception`
  (logged in but insufficient) or `Limelight_WS_AuthError_Unauthorized_Exception`
  (no session) when the bar isn't met — ending on `authAccessLevel == NONE → throw
  Forbidden`. Returns the `userSession`, `webSessionAuthAccessLevel`, and
  `projectIdsForProjectSearchIds`. This is what the clean read/write controllers use
  (`single_project_search_id/`, `experiment/`, `project_search_based_insert_update_delete/`).
  - Submit-import-program (non-web-session) auth:
    `Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId`.
  - Helpers: `GetUserSessionActualUserLoggedIn_ForRestController`,
    `GetUserIdActualUserLoggedIn_ForRestController`.

- **Page controllers → the NON-throwing getter**
  `access_control/access_control_page_controller/GetWebSessionAuthAccessLevelForProjectIds`.
  It only **returns** a `_Result` (`webSessionAuthAccessLevel`, `isNoSession()`,
  `userSession`) — the caller must decide. The correct page idiom is a **two-stage**
  check (see `FeatureDetectionView_Controller`, `ProjectView_Controller`):
  1. `if ( isNoSession() && ! isPublicAccessCodeReadAllowed() )` → forward to login;
  2. `if ( ! isPublicAccessCodeReadAllowed() )` → forward to access-denied JSP.
  Page controllers under `/d/pg/psb/**` are *also* backstopped by
  `DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor`
  (registered in `LimelightWebAppConfig`). **That interceptor does NOT cover the REST
  paths** (`/d/rws/...`), so REST controllers get no per-project backstop — their
  inline check is the only gate.

Other pieces: `common/AccessControl_GetUserSession_RefreshAccessEnabled` (loads the
session and refreshes its cached access level so grants/revokes take effect);
`direct_user_session/UserIsAdminCheck`; `result_objects/WebSessionAuthAccessLevel`
(+ `...Builder`).

### Pitfall — REST controller using the page-controller getter (fails open)

A REST controller must NOT authorize with the non-throwing
`getAuthAccessLevelForProjectIds(...)` and then check only stage 1
(`isNoSession() && ! isPublicAccessCodeReadAllowed()`). For a **logged-in
non-member of a private project** the computed level is `NONE` but `isNoSession()`
is **false**, so that single check passes and the data is served — broken access
control. REST controllers must either call a throwing `validate<Level>Allowed(...)`
**or** add stage 2 (`if ( ! isPublicAccessCodeReadAllowed() ) throw
Limelight_WS_AuthError_Forbidden_Exception`). (This gap was found and fixed in ~15
`/d/rws/...` read controllers in 2026-06 — feature-detection-mapping, scan-data /
scan-file, and project-view / project-title; the fix throws `Forbidden` to match the
throwing validators. When adding a new REST data controller, follow the throwing-
validator pattern to avoid reintroducing it.)

## Gotchas

- **Access control**: login is required for all URIs except the login page,
  enforced in `AllControllersAccessControl_SpringHandlerInterceptor`. Add new
  public paths there. Per-project authorization is a separate concern — see
  **Authorization** above.
- **Adding a page** requires a front-end change too: add an esbuild entry point in
  `front_end/build.gradle` — **not** in `webpack.config.js`. esbuild bundles all
  TS/JS; webpack processes SCSS only; types are checked with `tsc --noEmit`. The
  bundles are copied into `src/main/webapp/static/`. The full front-end pipeline is
  documented in `front_end/CLAUDE.md` (authoritative — `README_Development.md` is
  stale on the build). See also `README_AddingURLsWithHash.md`.
- **Error-response message text is load-bearing — Spring Boot keeps disabling it.**
  Webservice errors are thrown as `@ResponseStatus`-annotated exceptions (see
  `exceptions/webservice_access_exceptions/`, e.g. `Limelight_WS_AuthError_Forbidden_Exception`
  → 403 reason `"forbidden"`, `..._Unauthorized_Exception` → 401 `"no_session"`,
  the sync-tracking-mismatch → 400, invalid-parameter → 400). The TypeScript
  front end (`front_end/.../common_all_pages/handleServicesAJAXErrors.ts`) keys off
  **both the HTTP status and the response body's `message` field** to decide what to
  do — e.g. 403 + `message === "forbidden"` or 401 + `message === "no_session"` triggers
  a page **reload** (which re-runs page validation and forwards the now-unauthorized
  user to a no-access JSP) instead of showing a raw error. For the `message` field to
  reach the client, `src/main/resources/application.properties` must enable message
  inclusion (Spring Boot defaults it to `never` since 2.3). **The property name keeps
  changing across Spring Boot major versions** — on **Spring Boot 4.0 the entire
  `server.error.*` namespace was removed** (not even a deprecated alias) and the error
  config moved to **`spring.web.error.*`**, bound via `WebProperties` →
  `BasicErrorController`. So the old `server.error.include-message=always` /
  `server.error.whitelabel.enabled=false` are **silently ignored** on Boot 4, the
  `message` field defaults to omitted, and the front end shows
  `"403 received, responseText: undefined"` with no reload. Current correct settings:
  ```
  spring.web.error.include-message=always
  spring.web.error.whitelabel.enabled=false
  ```
  **After any Spring Boot upgrade, re-verify** an unauthorized webservice returns the
  reason in the body's `message` field (`curl` it; body should contain
  `"message":"forbidden"`). If it regressed, the property namespace moved again — find
  the current binding (`grep` the Boot autoconfigure jar's
  `spring-configuration-metadata.json` for `include-message`).
- **Runtime config** is read from properties files / env vars / `-D` JVM params on
  startup; templates are in `Sample_Configuration_Files/`.
- There is no JUnit suite in `src/test` — verify changes by building and running.
