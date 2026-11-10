# Reusable building blocks — Webservices and front-end data loading

Part of the reusable-building-blocks inventory; start at [README.md](README.md) (keyword index, quick picks, duplicates).
Counts and user lists are as of 2026-11-09 and approximate; grep before relying on them.

How the browser talks to the Limelight webapp and how data pages load and cache what they read. Server side: Spring MVC page
controllers and interceptors, the house REST controller template (POST `byte[]` JSON in/out, sync-tracking check, access
check, `Limelight_WS_*` exceptions), JSON/XML (un)marshalling, gzip + versioned-URL response caching, path-constant classes,
form-POST file downloads, and the main families of data webservices. Front end: `webserviceCallStandardPost`, AJAX error
handling, the `{ data, promise }` lazy loader tree ("common data loaded from server"), search-name / core-data loading, the
search-data-lookup-parameters code, and the sync-tracking "reload the out-of-date page" mechanism.


Path abbreviations used below:
- `W/` = `limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp/`
- `SMP/` = `W/spring_mvc_parts/`
- `RC/` = `SMP/data_pages/rest_controllers/`
- `FE/` = `limelight_webapp/front_end/src/js/page_js/`
- `DP/` = `FE/data_pages/`
- `CDL/` = `DP/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/`

## Quick picks

| If you need... | Use this | Entry |
|---|---|---|
| A new browser-called JSON webservice (server) | Copy `StaticMods_Single_ProjectSearchId_RestWebserviceController` (per-search) or `Project_GetProjectTitle_RestWebserviceController` (project) | REST webservice controller template |
| To call a webservice from TypeScript | `webserviceCallStandardPost` (never raw `fetch`/XHR for JSON) | webserviceCallStandardPost |
| Per-search data on a data page that respects the user's cutoffs | The per-search loader tree Root + a `..._For_MainFilters` leaf | Per-search data loader tree; Filtered single-search loaders |
| Per-PSM fields (charge, scan number, searchScanFileId, RT...) | `CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters` (not the unfiltered `NO_PSM_Peptide_Protein_Filtering` loader) | Filtered PSM table data loader |
| A new cached front-end loader | Copy the PSM_TblData leaf: `{ data, promise }` + in-flight dedupe + runtime field validation | Lazy load-once leaf loader pattern |
| Search name + real search id on a data page | Already-loaded `searchNames_AsMap` from `searchNameRetrieval.ts` / `LoadCoreData_ProjectSearchIds_Based` | Core data loaders |
| Searches + tags + folders for a project | `getSearchesSearchTagsAndFolders_SingleProject_OrFrom_ProjectSearchIds` | Project searches, tags, folders |
| Cache an expensive, immutable per-search response | `Cached_WebserviceResponse_Management` + `-version-000N` path + gzip helpers | Cached + gzipped versioned webservice response |
| Detect an out-of-date page after redeploy | Sync tracking: `Validate_WebserviceSyncTracking_Code` first in every controller; front end gets it free | Webservice sync tracking |
| Reload the page | `limelight__ReloadPage_Function` | Page reload chokepoint |
| Report a JS error to the server | `reportWebErrorToServer.reportErrorObjectToServer` | Browser error reporting |
| Parse a JSON request body (400 on bad JSON) | `Unmarshal_RestRequest_JSON_ToObject` | JSON request unmarshal |
| XML webservice (CLI / daemon to webapp) | `Unmarshal_RestRequest_XML_ToObject` + `Marshal_RestRequest_Object_ToXML` (XXE-safe) | XML webservice (un)marshal |
| New URL path for a webservice | Constant in `AA_RestWSControllerPaths_Constants` (data) or the matching `AA_*Paths_Constants`; same literal in TS | URL path constant classes |
| Server-generated file download | Form-POST `d/dnld/...` controller + download-identifier status polling | Form-POST file download controllers; Download status tracking |
| Binary file upload from the browser | Octet-stream body + Base64 JSON header (`HttpHeaderValue_Base64_Encoding`); chunked V2 for large files | Binary upload webservices |
| New search-based data page | Put it under `d/pg/psb/` (interceptor resolves lookup code + access); copy `PeptideView_Controller` | psb page interceptor; Page controller template |
| New filter state code for the URL | `updatePageState_URL_With_New_SearchDataLookupParameters_Root.ts` (front end) | Lookup-code webservice + front-end updater |
| Scan data from spectral storage on a search page | Single-search delegating scan loaders (searchScanFileId), which use the projectScanFileId scan ROOT | Scan-data loaders |
| Server value to the front end at page load | `<script type="text/text" id=...>` + a small `..._FromDOM.ts` reader | DOM data handoff |

---

## Server: request pipeline (interceptors, page controllers, errors)

### Spring interceptor chain (registration + global per-request setup)
- What it solves: runs code before controllers: puts the config-system-values bean on the servlet context (for JSPs) and wires the other interceptors onto URL patterns.
- Search keywords: HandlerInterceptor, preHandle, interceptor registration, addInterceptors, filter, before every request, servlet context attribute, middleware
- Location: limelight_webapp, `SMP/controller_interceptor_handlers/`; entry `AllControllers_SpringHandlerInterceptor` (path `/**` except `/static/**`); registered in `W/LimelightWebAppConfig.java` (`addInterceptors`).
- Used by: Spring MVC for every non-static request; JSPs read `WebConstants.CONFIG_SYSTEM_VALUES_HTML_KEY` from the servlet context.
- How to use / extend: add a `@Component implements HandlerInterceptor` in this package, expose its path patterns / exclude list as public static constants, register it in `LimelightWebAppConfig.addInterceptors`. Return `false` from `preHandle` after forwarding/redirecting to stop the chain.
- Do not use when: you want a check on REST webservices — REST controllers perform their own access checks inline (see REST template).
- Limits and gotchas: three interceptors are registered (AllControllers, All_Page_Controllers, DataPage_ProjectSearchIdBased).
- Related / duplicates: next two entries.
- Status: verified

### Webapp vs DB schema version gate (`All_Page_Controllers_SpringHandlerInterceptor`)
- What it solves: before page requests, compares the DB schema version (and "update in progress" record) with the version the code expects; on mismatch forwards to a dedicated error page. Also puts build version / git info on the request for JSPs.
- Search keywords: schema version check, database version mismatch, upgrade in progress, maintenance page, version and git info, release tag
- Location: limelight_webapp, `SMP/controller_interceptor_handlers/All_Page_Controllers_SpringHandlerInterceptor.java`; uses `Webapp__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode` (package `database_version_info_retrieval_compare__webapp`) and `Webapp_VersionAndGitInfo_FromBuild_IF`; error page `SMP/error_pages_controllers/Webapp_And_Database_Schema_Version_Number__NOT_MATCH_ErrorPage_Controller.java`.
- Used by: all page requests (path `/**`, with an exclude list: `/static/**`, `/d/rws/`, `/user/rws/`, the IE-not-supported page).
- How to use / extend: nothing to call; new page controllers get it automatically. Request attributes `databaseBehindWebapp` / `databaseUpdateInProgress` control the error JSP message.
- Do not use when: you need the gate on REST calls specifically (see gotcha).
- Limits and gotchas: to exclude a path prefix from a Spring interceptor, end the pattern with `**`. IE / legacy-Edge redirect code is commented out. Skips itself on the mismatch page (no loop). The run importer and other modules have their own schema-version check copies ([background_processing_queues_maintenance.md](background_processing_queues_maintenance.md)).
- Related / duplicates: schema-version compare duplicated in 4 modules ([data_access.md](data_access.md) / [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md)).
- Status: verified (exclude-pattern runtime effect unverified) (re-checked)

### Project-search-id-based page access interceptor (`/d/pg/psb/**`)
- What it solves: for every project-search-based data page, parses the search-data-lookup-parameters code (or an inline project-search-id-code / project-scan-file-id-code block) from the URL, loads the lookup record, resolves projectSearchIds → project id, rejects searches from more than one project, checks the user's access (login forward / 401 page), fills page header data, and sets the request attributes the controller and JSP rely on.
- Search keywords: data page access control, search data lookup parameters code, URL code, psb, project search ids from URL, page auth, public access, login redirect, request attributes, WebConstants.REQUEST_*
- Location: limelight_webapp, `SMP/controller_interceptor_handlers/DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor.java` (`PATHS_FOR_INTERCEPTOR` = path start + `d/pg/psb/` + `**`); collaborators `GetWebSessionAuthAccessLevelForProjectIdsIF`, `SearchDataLookupParams_GetRecordForCodeIF`, `SearchDataLookupParametersLookupCode__Create_InsertToDB__Service_IF`, `PopulatePageHeaderDataIF`.
- Used by: `PeptideView_Controller`, `ProteinView_Controller`, `ModView_Controller`, `QCView_Controller`, `ScanFileToSearchesView_Controller` (all `SMP/data_pages/page_controllers/`), and `W/services/Page_UserDefault_SetForJSP.java`, which requires the attributes it sets.
- How to use / extend: put a new search-based page under `AA_PageControllerPaths_Constants.PROJECT_SEARCH_ID_BASED_PAGE_CONTROLLER_START` and it is protected automatically; in the controller/JSP read `WebConstants.REQUEST_PROJECT_SEARCH_IDS`, `REQUEST_CURRENT_PROJECT_ID`, `REQUEST_WEB_SESSION_AUTH_ACCESS_LEVEL`, `REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS*`, `REQUEST_SINGLE_SEARCH_HAS_SUB_GROUPS`, `REQUEST_PROJECT_SCAN_FILE_ID`, `REQUEST_SEARCHES_ALL_(NOT_)CONTAIN_PROTEINS`. Inside a data-page request, read the resolved lookup params from the request attribute instead of resolving the code again.
- Do not use when: the page is keyed by project id, experiment id, feature-detection id or project-scan-file id under another prefix (those controllers check access themselves). The REST calls the page makes each do their own access check (see REST template).
- Limits and gotchas: errors are reported by setting a `WebErrorPageKeysConstants` attribute + HTTP status and forwarding to the main error page (404 unknown code/search, 404 searches in >1 project, 401 + "access not allowed"). A disabled / marked-for-deletion project throws `LimelightErrorDataInWebRequestException`. Read-access minimum is `isPublicAccessCodeReadAllowed()`.
- Related / duplicates: other page types use their own access helpers — see [security_access_control_sessions.md](security_access_control_sessions.md).
- Status: verified

### Page controller template — project-search-based data page
- What it solves: the standard shape of a data page controller: URL composed from path constants (lookup code, optional `/q/` page state, optional `/r` referrer marker), sets the per-user default view for the JSP, returns a JSP view name.
- Search keywords: page controller, GetMapping, JSP view, add a new page, page state in URL, referrer URL, default view, d/pg/psb
- Location: limelight_webapp, `SMP/data_pages/page_controllers/`; template `PeptideView_Controller.java` (same shape: `ProteinView_Controller`, `ModView_Controller`, `QCView_Controller`, `ScanFileToSearchesView_Controller`); path pieces in `AA_PageControllerPaths_Constants.java`; JSP-flag helpers `W/services/Page_UserDefault_SetForJSP.java` and `W/services/Blib_Spectral_Library_Webservice_Configured__SetForJSP.java`.
- Used by: the five psb page controllers; experiment pages (`Experiment__PeptideView_Controller` etc.) use the same shape but call `Validate_Access_Page_ExperimentDataPageIF` + `Experiment_Set_HTTPRequest_ForJSP_IF`.
- How to use / extend: copy `PeptideView_Controller`; add the page path constant under `d/pg/psb/`; two `@GetMapping`s (with / without extra page state) call one internal method; call `Page_UserDefault_SetForJSP`; on error log, call `SendEmailOnServerOrJsError_ToConfiguredEmail`, rethrow. Add the path to `PATHS_ALLOWED_FOR_SAVE_VIEW` / `PATHS_ALLOWED_FOR_SHARE_PAGE` if the page supports save view / share page.
- Do not use when: the page is not search-based (copy `ProjectView_Controller` or `ScanFileBrowserView_Controller`, which check access inline; [security_access_control_sessions.md](security_access_control_sessions.md)).
- Limits and gotchas: always put the page path under `d/pg/psb/` so the interceptor performs the access check for it. View prefix is configured in `LimelightWebAppConfig` (some controller comments wrongly say `application.properties`).
- Related / duplicates: next entry.
- Status: verified

### JSP request-attribute setters (`Page_UserDefault_SetForJSP`, `Blib_Spectral_Library_Webservice_Configured__SetForJSP`)
- What it solves: page controllers call these to put flags on the request for the JSP: the per-search user default view URL (`WebConstants.REQUEST_DEFAULT_URL`, single-search pages only) and whether the blib webservice is fully configured (config keys `BLIB_SPECTRAL_LIBRARY_FILE_CREATION_WEB_SERVICE_BASE_URL` and `BLIB_SPECTRAL_LIBRARY_FILE_RESULT_FILE_BASE_PATH` both non-empty).
- Search keywords: default view, user default page, set for JSP, request attribute, feature configured flag, config-gated UI, feature flag
- Location: limelight_webapp, `W/services/Page_UserDefault_SetForJSP.java`, `W/services/Blib_Spectral_Library_Webservice_Configured__SetForJSP.java` (+ IFs).
- Used by: `PeptideView_Controller`, `ProteinView_Controller`, `ModView_Controller`, `QCView_Controller`, `ScanFileToSearchesView_Controller`, `Experiment__PeptideView_Controller`, `Experiment__ProteinView_Controller`; JSP `head_section_include_data_pages.jsp`.
- How to use / extend: template for "config-gated feature flag to JSP": read keys via `ConfigSystemDAO_IF.getConfigValueForConfigKey`, set a boolean request attribute, emit it with the DOM data handoff.
- Do not use when: outside the data-page interceptor flow — `Page_UserDefault_SetForJSP` throws if the interceptor's lookup-params attributes are absent.
- Limits and gotchas: default view silently skipped for multi-search pages.
- Related / duplicates: `SetDefaultView_ProjectSearchPages_Insert_Service` writes what this reads.
- Status: verified

### Error page forward pattern + error page controllers
- What it solves: show a styled error page with a specific message and the right HTTP status from interceptors/controllers.
- Search keywords: error page, forward, RequestDispatcher, 404 page, 401 page, access not allowed, general error, WebErrorPageKeysConstants
- Location: limelight_webapp, `SMP/error_pages_controllers/`: `MainErrorPage_Controller` (`error_display_page` → `generalError.jsp`), `AssociatedProjectAccessNotAllowed_ErrorPage_Controller`, `InternetExplorerNotSupportedPage_Controller`, `Webapp_And_Database_Schema_Version_Number__NOT_MATCH_ErrorPage_Controller`; keys in `W/constants/WebErrorPageKeysConstants.java`; paths in `AA_ErrorPageControllerPaths_Constants`.
- Used by: `DataPage_ProjectSearchIdBased_...` interceptor, `All_Page_Controllers_SpringHandlerInterceptor`, `Validate_Access_Page_ExperimentDataPage` (MAIN_ERROR_PAGE_CONTROLLER referenced in 6 files).
- How to use / extend: `httpServletResponse.setStatus(...)`; `httpServletRequest.setAttribute(WebErrorPageKeysConstants.<KEY>, true)`; `getRequestDispatcher(AA_ErrorPageControllerPaths_Constants.PATH_START_ALL + MAIN_ERROR_PAGE_CONTROLLER).forward(...)`; stop. Add a key + a branch in `generalError.jsp` for a new message.
- Do not use when: inside a REST controller — throw a `Limelight_WS_*` exception instead.
- Limits and gotchas: page controllers report errors 3 ways (this forward; per-controller error JSPs such as `projectNotFound.jsp`, `project_AccessNotAllowed_Page.jsp`; `throw new RuntimeException(e) // TODO forward to error page`). One error key (`scanFileDownloadsNotAllowed`) is a raw string, not in `WebErrorPageKeysConstants`.
- Related / duplicates: JSP error pages ([build_deploy_config.md](build_deploy_config.md) / `wa_jsp_resources_static`).
- Status: verified

### Page-fragment controller (server-rendered HTML fragment fetched by JS)
- What it solves: return a JSP-rendered HTML snippet for front-end JS to insert.
- Search keywords: page fragment, HTML fragment, JSP partial, header dropdown, project list dropdown, d/pgf
- Location: limelight_webapp, `SMP/data_pages/page_fragment_controllers/ProjectsList_ForMainPageHeaderDropdown_PageFragment_Controller.java` (path `d/pgf/project-list-for-main-page-header-drop-down`), JSP `WEB-INF/jsp/data_page_fragments/fragments_for_main_pages_header_webservice_responses/projectsListForMainPageHeaderDropdown_PageFragment.jsp`; paths in `AA_Page_Fragment_ControllerPaths_Constants`.
- Used by: `FE/header_main_pages/header_main_pages__logged_in_user/limelight__header_main_pages__logged_in_user_PopulateProjects.ts` (raw `window.fetch`).
- How to use / extend: only example of this pattern; prefer JSON webservice + React for new UI.
- Do not use when: server/user data would be inserted on the client as HTML without escaping (see `limelight_features_docs/web_security_csp_and_xss_url_hardening.md`).
- Limits and gotchas: single user of the `d/pgf/` namespace.
- Related / duplicates: REST JSON template.
- Status: verified

### Short-URL redirect controllers (`go/{key}`, `p/{shortName}`, root)
- What it solves: resolve a share-page key or a project short name to a full URL and redirect; root path forwards to the projects list.
- Search keywords: URL shortener, share link, redirect, short name, go link, project short name
- Location: limelight_webapp, `SMP/data_pages/page_controllers/UrlShortener_RedirectTo_Assoc_URL_Controller.java` (`UrlShortenerDAO.getFirstURLByShortenedURLKey` → `redirect:`; not found → `sharePage_Code_NotFound_Page.jsp`), `ProjectShortName_RedirectTo_ProjectView_Controller.java`, `RootPathController.java`.
- Used by: share-page links created by `Share_Page_Insert_RestWebserviceController` (below) and the front-end share-page code ([front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)).
- How to use / extend: reuse for a new short link type: store key → app-relative URL, redirect relative to path start.
- Do not use when: n/a.
- Limits and gotchas: store app-relative URLs only (insert is restricted to `PATHS_ALLOWED_FOR_SHARE_PAGE`).
- Related / duplicates: share-page insert entry.
- Status: verified (short-name controller skimmed)

### Admin page + admin REST controller template
- What it solves: restricts admin pages / webservices to admin users; template for new admin features.
- Search keywords: admin only, global admin, isGlobalAdminUser, ACCESS_LEVEL_ADMIN, admin page, admin webservice, admin/rws
- Location: limelight_webapp, `SMP/webapp_admin_pages/page_controllers/*_Controller.java` (session refresh → not a real user → forward to `AA_UserAccount_PageControllerPaths_Constants.FORWARD_TO_LOGIN_PAGE_CONTROLLER`; not admin → `LimelightPageAcceessErrorException`; then `populatePageHeaderData(null, ...)`), `SMP/webapp_admin_pages/rest_controllers/*` (`GetUserSessionActualUserLoggedIn_ForRestController` → not admin → `Limelight_WS_AuthError_Forbidden_Exception`). Paths: `AA_WebappAdmin_PageControllerPaths_Constants`, `AA_WebappAdmin_RestWSControllerPaths_Constants` (prefix `admin/rws/for-page/`). Services fronted include `CachedData_InMemory_CentralRegistry_IF` (clear all caches / log sizes), config save, run-importer pause/schedule DAOs.
- Used by: 7 admin page controllers, 17 admin REST controllers; front end `FE/webapp_admin_pages/**`.
- How to use / extend: new admin page = copy `AdminMain_Controller`; new admin webservice = copy `WebappConfig_ManageUsers_User_Enable_RestWebserviceController` + path constant. The shared admin check helper is `W/access_control/direct_user_session/UserIsAdminCheck.java` ([security_access_control_sessions.md](security_access_control_sessions.md)) — prefer it over inlining.
- Do not use when: n/a.
- Limits and gotchas: front-end admin wrappers: see "Admin webservice-call wrapper (front end)".
- Related / duplicates: `UserIsAdminCheck` ([security_access_control_sessions.md](security_access_control_sessions.md)).
- Status: verified (most admin bodies skimmed)

## Server: REST webservice pattern and helpers

### REST webservice controller template (POST `byte[]` JSON in / out)
- What it solves: the house shape for a browser-called webservice: POST only, `@RequestBody byte[]`, `ResponseEntity<byte[]>`, manual Jackson (un)marshal, sync-tracking check, access check, typed exceptions mapped to HTTP status.
- Search keywords: rest controller, webservice, endpoint, REST API, RestController, PostMapping, AJAX endpoint, JSON request, JSON response, new webservice template, rws, WebserviceRequest, WebserviceResult, error response, 400, 401, 403, 500
- Location: limelight_webapp. Smallest templates: per-search `RC/single_project_search_id/StaticMods_Single_ProjectSearchId_RestWebserviceController.java`; project-level read `RC/other_like_project/Project_GetProjectTitle_RestWebserviceController.java`; project-level write `RC/other_like_project/Project_Note_Add_RestWebserviceController.java`; admin `SMP/webapp_admin_pages/rest_controllers/WebappConfig_ManageUsers_User_Enable_RestWebserviceController.java`. Fixed collaborators: `W/webservice_sync_tracking/Validate_WebserviceSyncTracking_CodeIF.validate_webserviceSyncTracking_Code(request)`, `SMP/rest_controller_utils_common/Unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray(bytes, Class)`, `W/web_utils/MarshalObjectToJSON.getJSONByteArray(obj)`, access validator ([security_access_control_sessions.md](security_access_control_sessions.md)), exceptions in `W/exceptions/webservice_access_exceptions/` (see exceptions entry), URL `AA_RestWSControllerPaths_Constants.PATH_START_ALL + <CONSTANT>`.
- Used by: about 200 REST controllers (`Validate_WebserviceSyncTracking_CodeIF` in about 209 Java files, `Unmarshal_RestRequest_JSON_ToObject` about 206, `MarshalObjectToJSON` about 222); all 82 controllers in `RC/other_like_project/` and all 57 active ones in `RC/single_project_search_id/` + `RC/multiple_project_search_id/`.
- How to use / extend: `@PostMapping( path = { PATH_START_ALL + <constant> }, consumes/produces = APPLICATION_JSON_VALUE )`, method `(@RequestBody byte[] postBody, HttpServletRequest, HttpServletResponse)` returning `ResponseEntity<byte[]>`. Order: sync-tracking validate → null-body check → unmarshal into nested `public static class WebserviceRequest` → parse/validate ids (throw `Limelight_WS_BadRequest_InvalidParameter_Exception`) → access check → work → nested `WebserviceResult` → marshal → `ResponseEntity.ok()`. Wrap: `catch (Limelight_WS_ErrorResponse_Base_Exception e) { throw e; } catch (Exception e) { log.error; throw new Limelight_WS_InternalServerError_Exception(); }`. Data-page URLs start `d/rws/for-page/psb/` when keyed by projectSearchId. Keep business logic in a service when it grows (thin controllers like the annotation-data ones are the cleaner layering).
- Do not use when: the response is a streamed file (form-POST download controllers); the caller is the submit-import CLI or run-importer daemon (XML entries).
- Limits and gotchas: every endpoint is POST, including reads. Body is `byte[]` on purpose (exact bytes are the cache key). No `@ControllerAdvice` exists: HTTP status comes only from `@ResponseStatus` on the thrown exception, so a non-`Limelight_WS_` exception escaping gives a generic 500. Error responses carry only a status + reason string. Nested request classes need setters for Jackson. `SearchIdForProjectSearchIdSearcherIF.getSearchListForProjectId(projectSearchId)` is misnamed — it returns one searchId. Use `Unmarshal_RestRequest_JSON_ToObject` so bad JSON gives 400. Parallel/serial branches are duplicated in 4 data controllers (see parallel-stream entry).
- Related / duplicates: front-end `webserviceCallStandardPost`; design idea `limelight_features_docs/webservice_dto_typescript_single_source_design.md` (lead only, contract duplicated Java vs TS).
- Status: verified (re-checked)

### Choosing the access check inside a webservice (pointer)
- What it solves: every webservice must authorize; which helper to call depends on the id you hold.
- Search keywords: authorization, permission, access level, project owner, assistant owner, public access, locked project, 401, 403, child id to project id
- Location: limelight_webapp `W/access_control/` (owned by [security_access_control_sessions.md](security_access_control_sessions.md)): projectSearchIds → `ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF.validate<Level>Allowed(ids, request)`; projectId → `ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF`; logged-in user, no project → `GetUserSessionActualUserLoggedIn_ForRestControllerIF`; submit-import CLI → `Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId`; branch-not-throw → `GetWebSessionAuthAccessLevelForProjectIdsIF`.
- Used by: most project-level and per-search controllers.
- How to use / extend: prefer the throwing validators (one call, consistent 401 vs 403). For a child id (projectScanFileId etc.), first resolve the owning projectId with its searcher (e.g. `ProjectScanFile_ProjectId_For_ProjectScanFileId_Searcher_IF`), then call the `_ProjectIds` validator; always confirm a looked-up child belongs to the project you authorized. If you must branch, make sure no session → 401 and not allowed → 403. Use `...IfProjectNotLocked...` variants for edits blocked on a locked project.
- Do not use when: n/a.
- Limits and gotchas: always prefer the throwing validators so the 401 (no session) vs 403 (not allowed) split is consistent. Choose the access level deliberately per endpoint.
- Related / duplicates: [security_access_control_sessions.md](security_access_control_sessions.md) entries for these classes; `Get_ProjectIds_For_ProjectSearchIds_Service` ([data_access.md](data_access.md)).
- Status: verified

### Webservice HTTP-status exceptions (`Limelight_WS_*`) + reason strings
- What it solves: REST controllers throw a subclass of `Limelight_WS_ErrorResponse_Base_Exception`; each has `@ResponseStatus` with a fixed reason string the front end recognizes.
- Search keywords: exception, HTTP 400, 401, 403, 500, 503, ResponseStatus, error response, bad request, invalid parameter, no_session, forbidden
- Location: limelight_webapp, `W/exceptions/webservice_access_exceptions/`: `Limelight_WS_BadRequest_InvalidParameter_Exception` (400 `invalid_parameter`), `Limelight_WS_BadRequest_WebserviceSyncTrackingCodeMismatch_Exception` (400), `Limelight_WS_AuthError_Unauthorized_Exception` (401 `no_session`), `Limelight_WS_AuthError_Forbidden_Exception` (403 `forbidden`), `Limelight_WS_InternalServerError_Exception` (500), `Limelight_WS_UserMgmtUnavailable_Exception` (503). Reason strings in `W/constants/WebServiceErrorMessageConstants.java`. Other webapp exceptions in `W/exceptions/` (`LimelightInternalErrorException`, `LimelightErrorDataInWebRequestException`, ...).
- Used by: InvalidParameter about 214 files, InternalServerError about 203, Unauthorized about 63, Forbidden about 53.
- How to use / extend: in REST controllers rethrow the matching `Limelight_WS_*`; a new error code needs a server constant AND a matching status + message pair in `FE/common_all_pages/handleServicesAJAXErrors.ts`.
- Do not use when: library modules (their own exception types); page controllers (forward to an error page).
- Limits and gotchas: reason strings must match the front-end constants exactly.
- Related / duplicates: front-end AJAX error handling entry.
- Status: verified (re-checked)

### JSON request unmarshal with 400 on failure (`Unmarshal_RestRequest_JSON_ToObject`)
- What it solves: parse a JSON request body into a class, converting any parse failure into `Limelight_WS_BadRequest_InvalidParameter_Exception` (HTTP 400).
- Search keywords: parse JSON request, deserialize, Jackson, unmarshal, bad request, request body
- Location: limelight_webapp, `SMP/rest_controller_utils_common/Unmarshal_RestRequest_JSON_ToObject.java`, `getObjectFromJSONByteArray(byte[], Class<T>)`; wraps `W/web_utils/UnmarshalJSON_ToObject.java`.
- Used by: about 200 REST controllers (e.g. `WebappConfig_ManageUsers_User_Enable_RestWebserviceController`, `UserLogin_RestWebserviceController`).
- How to use / extend: `@Autowired`; call with the post body.
- Do not use when: non-REST code (use `UnmarshalJSON_ToObject`).
- Limits and gotchas: discards the parse exception (no log of what failed). Use this (not `UnmarshalJSON_ToObject`) in REST controllers.
- Related / duplicates: next entry.
- Status: verified (re-checked)

### JSON marshal / unmarshal helpers (`MarshalObjectToJSON`, `UnmarshalJSON_ToObject`)
- What it solves: object → JSON bytes/string (optionally omitting null fields); JSON bytes/string → object, with logging.
- Search keywords: JSON, Jackson, ObjectMapper, serialize, deserialize, marshal, unmarshal, response body, omit nulls
- Location: limelight_webapp, `W/web_utils/MarshalObjectToJSON` (`getJSONByteArray`, `getJSONByteArray_NotReturn_ObjectField_ThatIs_Null`, `getJSONString`), `W/web_utils/UnmarshalJSON_ToObject` (`getObjectFromJSONByteArray`, `getObjectFromJSONString`; implements shared `Limelight_SharedCode__JSON_UnMarshal_CommonInterface`).
- Used by: marshal about 220 webapp files (nearly every REST controller); unmarshal about 28 directly (e.g. `BlibSpectralLibrary_Download__Request_Creation_RestWebserviceController`, the psb interceptor, form-POST download controllers).
- How to use / extend: inject and call; do not create new `ObjectMapper`s in controllers.
- Do not use when: streaming very large output (write a streaming writer).
- Limits and gotchas: new `ObjectMapper` per call (no shared config/modules). Unmarshal logs on parse failure.
- Related / duplicates: `UnmarshalJSON_ToObject` exists as 3 classes (webapp `web_utils`, `limelight_importer/.../utils`, `limelight_feature_detection_run_import/.../utils`); several classes create their own `ObjectMapper`.
- Status: verified

### XML webservice (un)marshal with JAXB, XXE-safe
- What it solves: parse / produce XML bodies for CLI-to-webapp (submit import) and daemon-to-webapp (run importer) webservices, using an XXE-safe StAX reader.
- Search keywords: XML request, JAXB, marshal, unmarshal, XXE, submit import, run importer callback, application/xml, JAXBContext
- Location: limelight_webapp, `SMP/rest_controller_utils_common/Unmarshal_RestRequest_XML_ToObject.java` (`getObjectFromXMLByteArray`, `getObjectFromXMLString`), `SMP/rest_controller_utils_common/Marshal_RestRequest_Object_ToXML.java` (`getXMLByteArrayFromObject`); reader from `limelight_shared_code/.../XMLInputFactory_XXE_Safe_Creator/XMLInputFactory_XXE_Safe_Creator.java`.
- Used by: 12 files incl. `Project_UploadData_UploadSubmit_RestWebserviceController`, `Project_UploadData_V2_UploadFile_Initialize_RestWebserviceController`, `Project_UploadData_V1_UploadFile_OldFor_OldSubmitImportProgram_RestWebserviceController`, `RunImporter_ImporterFinish_RestWebserviceController`, `RunImporter_ImporterOrRunPipeline_..._Finish_RestWebserviceController`.
- How to use / extend: add new request/response classes to the fixed `JAXBContext.newInstance(...)` list in `afterPropertiesSet`; cast the returned `Object`. For ANY XML parsing use `XMLInputFactory_XXE_Safe_Creator`.
- Do not use when: browser JSON webservices.
- Limits and gotchas: JAXB context is a closed list — an unlisted class fails. Unmarshal failure → 400; marshal failure → `LimelightInternalErrorException`. `getObjectFromXMLString` rejects XML whose text lacks "UTF-8". The V2 `SubmitImport_V2_*_PgmXML` request classes are NOT in the JAXB list (verified in `afterPropertiesSet`), and no module calls the V2 `*-from-submit-pgm` URLs (grep), so those XML endpoints are non-functional as written (not exercised).
- Related / duplicates: importer / feature-detection importer use the same XXE-safe creator; the submit-import connector has its own XXE-safe parser (Java 8).
- Status: verified (re-checked)

### Dual-protocol endpoints: browser JSON + submit-import program XML sharing one internal method
- What it solves: one upload/import operation callable from the web UI (JSON, HTTP session) and from the command-line submit-import program (JAXB XML, user "submit import program key").
- Search keywords: submit import, command line upload, CLI, XML webservice, JAXB, program key, PgmXML, WebJSON, BaseSubmitImportWebserviceResponse, statusFail_ErrorMessage
- Location: `RC/other_like_project/Project_UploadData_V1_UploadInitialize_*`, `Project_UploadData_UploadSubmit_*`, `Project_UploadData_V2_UploadFile_{Initialize,Submit,Cancel_Delete}_*` (each `webserviceMethod_JSON` + `webserviceMethod_XML` → private `webserviceMethod_Internal(WebserviceMethod_Internal_Params)`); XML-only: `Project_UploadData_SubmitterProgram_AuthTest_*`, `Project_UploadData_Get_FastaFileUploadAccepted_*`, `Project_UploadData_V1_UploadFile_OldFor_OldSubmitImportProgram_*`. Request/response classes (`SubmitImport_*_Request_{Base,WebJSON,PgmXML}`, `BaseSubmitImportWebserviceResponse`) in module `limelight_submit_import_client_connector`, package `request_response_objects`.
- Used by: web UI `projectPage_UploadData_UploadFiles__Common_Init_AND_Submit_Upload__LimelightXMLFile_AndOr_ScanFile.ts`; CLI `CallSubmitImportWebservice.java` (V1 initialize, V1 upload-file, upload-submit, auth-test, fasta-accepted).
- How to use / extend: shared logic in the internal method keyed on a `..._Request_Base`; JSON side validates the session and throws WS exceptions; XML side validates the program key and RETURNS 200 with `statusSuccess=false` and `statusFail_ErrorMessage` set (the CLI shows that message and checks nothing else, so set it for every error). Add new XML classes to the JAXB context.
- Do not use when: browser-only features.
- Limits and gotchas: V2 `*-from-submit-pgm` endpoints exist with no caller (CLI still uses V1). Connector module is Java 8 / JAXB 3.0.x (root CLAUDE.md). Upload header names and file-type enums are hand-synced between modules.
- Related / duplicates: binary upload entry; queue side ([background_processing_queues_maintenance.md](background_processing_queues_maintenance.md)); submit-import client ([storage_files_external_services.md](storage_files_external_services.md)).
- Status: verified

### URL path constant classes (`AA_*Paths_Constants`) and front-end path literals
- What it solves: one place per URL namespace so controllers, interceptors and (by hand) TypeScript and other modules use the same strings.
- Search keywords: URL paths, controller path, route constants, endpoint path, d/pg, d/rws, for-page, psb, admin/rws, user/rws, o/rws, d/pgf, d/dnld, go, p, version suffix
- Location: limelight_webapp: data REST `RC/AA_RestWSControllerPaths_Constants.java` (`PATH_START_ALL = "/"`, `DATA_PAGE_REST_WEBSERVICE_CONTROLLER_START = "d/rws/"`, about 205 constants grouped by comment headers; about 21 carry `-version-NNNN`); pages `SMP/data_pages/page_controllers/AA_PageControllerPaths_Constants.java` (`d/pg/...`, `go`, `p`, psb/exp/ptfd/ptsb sub-prefixes, `/q/` and `/r` separators, save-view/share-page allow lists); `SMP/data_pages/page_fragment_controllers/AA_Page_Fragment_ControllerPaths_Constants.java` (`d/pgf/`); `SMP/webapp_admin_pages/page_controllers/AA_WebappAdmin_PageControllerPaths_Constants.java`; `SMP/webapp_admin_pages/rest_controllers/AA_WebappAdmin_RestWSControllerPaths_Constants.java`; `SMP/user_account_pages/page_controllers/AA_UserAccount_PageControllerPaths_Constants.java`; `SMP/user_account_pages/rest_controllers/AA_UserAccount_RestWSControllerPaths_Constants.java` (`user/rws/for-page/`); `SMP/error_pages_controllers/AA_ErrorPageControllerPaths_Constants.java`; `SMP/controllers_other_than_for_pages/AA_OtherRestControllerPaths_Constants.java` (`o/rws/`); downloads `SMP/data_pages/data_download_controllers/AA_DataDownloadControllersPaths_Constants` (`d/dnld/`).
- Used by: `AA_RestWSControllerPaths_Constants` referenced by about 221 Java files; `All_Page_Controllers_SpringHandlerInterceptor` (excludes); `LimelightWebAppConfig`. Front end does NOT import it — each TS caller hard-codes the literal (e.g. `"d/rws/for-page/psb/reported-peptide-id-list-for-search-criteria-single-project-search-id-version-0002"` in `CDL/.../commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters.ts`; `"admin/rws/for-page/config-get-current"` in `configureLimelightForAdminPage_Main.ts`). `limelight_run_importer` (`On_ImportLimelightXMLScanFile_Finish_CallWebService.java`, `On_ImportOrRunPipeline_Finish_CallWebService.java`) and `limelight_submit_import_client_connector` (`CallSubmitImportWebservice.java`) hard-code theirs with "keep in sync" comments.
- How to use / extend: add the constant to the right class (start data ones with `d/rws/for-page/`, add `psb/` when keyed by projectSearchId), reference it as `PATH_START_ALL + <constant>`, use the identical literal in the TS caller. For cached webservices bump `-version-NNNN` in both places when the shape changes.
- Do not use when: n/a.
- Limits and gotchas: strings are hand-synced in 3 places with no compile-time link — a typo or rename breaks silently. The prefix decides which interceptors run. A few constants lack the usual prefix (`psm-peptide-position-annotations-...`, `scanfile-projectscanfileid-searchscanfileid-all-forsearch-for-projectsearchid`; search-tag URLs lack `psb/`); one has mixed case (`project-level-filter-default-cutoffs-override_MAINT--save`). Constants for disabled controllers can be missing. Some classes expose several paths per controller.
- Related / duplicates: `limelight_features_docs/webservice_dto_typescript_single_source_design.md` (lead only).
- Status: verified (re-checked)

### Gzip-accept check / set Content-Encoding; gzip / gunzip byte arrays
- What it solves: decide whether the client accepts gzip and mark the response gzipped; gzip / gunzip a `byte[]` in memory.
- Search keywords: gzip, gunzip, Accept-Encoding, Content-Encoding, compress response, decompress, cached response
- Location: limelight_webapp, `SMP/rest_controller_utils_common/RestControllerUtils__Request_Accept_GZip_Response_Set_GZip(_IF).java` (`does_HttpServletRequest_Accept_GZip`, `set_GZIP_On_HttpServletResponse`); `W/web_utils/Gzip_ByteArray_To_ByteArray(_IF)`, `W/web_utils/GUNzip_ByteArray_To_ByteArray(_IF)`.
- Used by: about 28 data REST controllers (cached ones, e.g. `Psm_Count_PerReportedPeptide_For_ReportedPeptideIds_SearchCriteria_Single_ProjSearchID_RestWebserviceController`); gunzip: `Cached_WebserviceResponse_Management`, `StructureFile_Get_FileContents_For_StructureFileId_RestWebserviceController`, `GoldStandard_FileContents_For_MappingId_RestWebserviceController`, `ScanFile_PeakIntensityBinnedOn_RT_MZ_JSON_...` (passthrough: gunzip when the client does not accept gzip).
- How to use / extend: pair with the response cache; inject the `_IF`s.
- Do not use when: you have not actually gzipped the body bytes; very large/streamed data (whole array in memory).
- Limits and gotchas: accept check is a substring match on "gzip" (no q-values); setter only adds the header, it does not compress.
- Related / duplicates: ad-hoc `GZIPOutputStream` in `Project_GoldStandard_Import_Request_UploadFile_RestWebserviceController`.
- Status: verified

### Cached + gzipped versioned webservice response (`Cached_WebserviceResponse_Management`)
- What it solves: caches the gzipped JSON response of an expensive, deterministic POST webservice keyed by (controller path, exact request body bytes). Two tiers: in-memory Guava cache (soft-referenced, KB-weighted, 20-day expire-after-access) and an optional on-disk cache that survives restarts. Returns gzipped bytes or gunzips for clients that do not accept gzip.
- Search keywords: webservice cache, response cache, cache JSON response, cache on disk, cached data in file, version number in URL, versioned webservice, memoize webservice, gzip response cache, invalidate cache, struct of arrays
- Location: limelight_webapp, `W/cached_data_in_webservices_mgmt/`: `Cached_WebserviceResponse_Management_IF` (`registerControllerPathForCachedResponse_RequiredToCallAtWebappStartup`, `getCachedResponse(acceptGzip, path, postBody, this)`, `putCachedResponse_GZIPPED(path, postBody, gz, this)`), `Cached_WebserviceResponse_Management_Utils.translate_ControllerPath_For_CachedResponseMgmt` (replaces `/` with `_`). Templates: `RC/single_project_search_id/PsmTable_Data_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController` (cached + gzip + parallel), `RC/feature_detection__feature_detec_to_project_scan_file_mapping_id_based/FeatureDetection_SingularFeature_Entries_For_FeatureDetectionRootId_Single_ProjSearchID_RestWebserviceController` (cached + struct-of-arrays + child-id auth + server max range exposed by a "max allowed" webservice). Disk tier: `W/cached_data_in_file/` ([storage_files_external_services.md](storage_files_external_services.md)).
- Used by: about 23-25 Java files (16 controllers in the single/multi-search packages, e.g. `PsmTable_Data_Unfiltered_...`, `Psm_Count_PerReportedPeptide_...`, `ReportedPeptideIdList_ForSearchCriteria_...`, `ProteinCoverage_PerReportedPeptide_...`, `SearchSubSearchGroupId_PsmId_NOT_FIltered_...`, `PeptideSequenceStringList_From_ReportedPeptideIds_...`; the feature-detection controllers).
- How to use / extend: name the constant `..._VERSION_000N` with the URL ending `-version-000N`; implement `InitializingBean` and register the translated path in `afterPropertiesSet`; AFTER the access check call `getCachedResponse` and return early on a hit (set gzip header); on a miss build JSON, gzip, `putCachedResponse_GZIPPED`, return gzipped or plain per Accept-Encoding. Bump the version (Java constant AND front-end URL) whenever the request/response format or computation changes; old entries are orphaned and the disk tier cleans old version dirs at startup. For big results consider struct-of-arrays JSON (parallel lists) and a server-enforced max request range.
- Do not use when: the response depends on anything outside the POST body (user, session, time, data editable after import such as tags/names/project settings); write endpoints.
- Limits and gotchas: path MUST end in `-version-<int>` (registration throws otherwise); duplicate registration throws; the caller must be the same object that registered. Key is exact body bytes — semantically equal JSON with different field order misses. Admin "clear all cached data" clears ONLY the memory tier. Memory budget is 66% of the configured in-memory size. Most cached controllers marshal with `getJSONByteArray`; the PSM table template uses `getJSONByteArray_NotReturn_ObjectField_ThatIs_Null`. Disabled controllers (`//@RestController`) still contain register calls but are not beans.
- Related / duplicates: in-memory cache registry and disk tier ([storage_files_external_services.md](storage_files_external_services.md)); three controllers gzip without caching (passthrough).
- Status: verified (cache internals verified in `wj_cache_config_startup_utils`) (re-checked)

### Parallel-stream batch fetch with startup on/off switch
- What it solves: fetches per-reported-peptide PSM ids, then PSM rows in blocks of 4000 ids, optionally in parallel on the common ForkJoin pool; collects any exception thrown in the lambda and rethrows it.
- Search keywords: parallel stream, parallelStream, batch, block of ids, IN list chunking, concurrency, thread pool, enable parallel
- Location: pattern inside `RC/single_project_search_id/PsmTable_Data_PerReportedPeptide_For_SearchCriteria_...`; switch `W/parallelstream_java_processing_enable_configuration/ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_IF`, read in `afterPropertiesSet`.
- Used by: the `anyThrownInsideStreamProcessing` block is in 4 controllers: `PsmTable_Data_PerReportedPeptide_...`, `Psm_IDs_PerReportedPeptide_...`, `Psm_OpenModificationMasses_...`, `Psm_Variable_Dynamic_ModificationMasses_...`; the startup switch is also read by the APEX PSM download controller.
- How to use / extend: copy the `AtomicBoolean anyThrownInsideStreamProcessing` + `synchronizedList` error-collection block; keep the non-parallel branch.
- Do not use when: small work, or code that is not thread-safe.
- Limits and gotchas: parallel and serial branches are duplicated (4 copies); results go into a `ConcurrentHashMap`, then are re-sorted by id. No shared IN-list batching helper exists in the searchers ([data_access.md](data_access.md)).
- Related / duplicates: config reader pattern ([build_deploy_config.md](build_deploy_config.md)).
- Status: verified (re-checked)

## Server: webservice families (what exists; reuse before adding)

### Cutoff-filtered ("main filters") per-search data webservices
- What it solves: per-search identification data restricted to the user's current PSM / peptide / protein cutoffs, given a `SearchDataLookupParams_For_Single_ProjectSearchId`: reported peptide ids, PSM counts, PSM ids, PSM table rows, open/variable mod masses, reporter ions, protein coverage, sub-group PSM counts.
- Search keywords: filtered data, cutoffs, search criteria, main filters, PSM count, PSM ids, reported peptide list, PSM table data, open mod masses, variable mods, reporter ions, protein coverage, sub group counts
- Location: `RC/single_project_search_id/`: `ReportedPeptideIdList_ForSearchCriteria_Single_ProjectSearchId_RestWebserviceController`, `Psm_Count_PerReportedPeptide_For_ReportedPeptideIds_SearchCriteria_...`, `Psm_Count_PerReportedPeptide_SubSearchGroup_..._SearchCriteria_...`, `Psm_IDs_PerReportedPeptide_..._SearchCriteria_...`, `PsmTable_Data_PerReportedPeptide_For_SearchCriteria_...`, `Psm_OpenModificationMasses_...`, `Psm_Variable_Dynamic_ModificationMasses_...`, `Psm_ReporterIonMasses_...`, `ProteinCoverage_PerReportedPeptide_For_ReportedPeptideIds_...`. Server pieces: `SearcherCutoffValues_Factory.createSearcherCutoffValuesSearchLevel(...)`, `W/services/ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF.getPeptideDataList(searchId, cutoffs, minPsms)` (cached), `PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcherIF`.
- Used by: front-end leaves in `CDL/` (`..._ReportedPeptideId_Based_Data_For_MainFilters.ts`, `..._PSM_TblData_For_ReportedPeptideId_For_MainFilters.ts`, `..._PSM_IDs_For_ReportedPeptideId_For_MainFilters.ts`, `..._Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters.ts`, `..._ProteinSequenceVersionIds_And_ProteinCoverage_...For_MainFilters.ts`).
- How to use / extend: reuse through the front-end loaders; do not call these endpoints directly. For a new per-PSM field, extend the PSM table webservice (bump its version) or follow its 4 steps: build cutoffs → reported peptide ids (if not passed) → PSM ids per reported peptide → PSM rows in blocks. A new per-search webservice that must respect cutoffs accepts a `SearchDataLookupParams_For_Single_ProjectSearchId` and converts with `SearcherCutoffValues_Factory` ([domain_utilities.md](domain_utilities.md)).
- Do not use when: you need data ignoring cutoffs (next entry; prefer the filtered webservices).
- Limits and gotchas: `reportedPeptideIds` optional in the PSM-table request (server computes it). The PSM table excludes `is_decoy` PSMs but includes independent decoys. If a PSM's `search_scan_file_id` is null and the search has exactly one `search_scan_file_tbl` row, the PSM table fills it in. Missing `searchDataLookupParams_For_Single_ProjectSearchId` → 400.
- Related / duplicates: unfiltered webservices; PSM TSV download controllers rebuild similar filtering; PSM list webservice `d/rws/for-page/psb/psm-list` (`PSM_List_RestWebserviceController`, [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md) table code, response not runtime-validated on the client).
- Status: verified

### Unfiltered per-search data webservices (all PSMs, ignore cutoffs) — prefer the filtered ones
- What it solves: per-search data for ALL PSMs, ignoring cutoffs, for client-side score/decoy plots or cross-reference.
- Search keywords: unfiltered, no filtering, all PSMs, include decoys, PSM filterable annotation data, sub group id per PSM, NOT_Filtered
- Location: `RC/single_project_search_id/`: `PsmTable_Data_Unfiltered_For_Single_ProjSearchID_RestWebserviceController` (optional `include_DecoyPSM`, default false), `PsmFilterableAnnotationData_NoFiltering_Single_ProjSearchID_...`, `SearchSubSearchGroupId_PsmId_NOT_FIltered_Single_ProjSearchID_...`.
- Used by: `CDL/.../commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData.ts`, `..._NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData.ts`, `..._SearchSubGroupId_ForPSM_ID_NOT_Filtered.ts`.
- How to use / extend: for display or derived values use the filtered PSM-table webservice/loader; use these only for views that must see PSMs outside the cutoffs (e.g. score-vs-cutoff / target-decoy plots).
- Do not use when: building display or derived values (nearly always).
- Limits and gotchas: whole-search payloads (large); cached and gzipped.
- Related / duplicates: filtered PSM table (same per-PSM fields; two endpoints to keep in sync).
- Status: verified

### Multi-search metadata webservices (names, annotation types, flags, programs, details, info, FASTA stats, scan files)
- What it solves: given projectSearchIds, per-search metadata that data pages load once at page start.
- Search keywords: search name, search id, search short name, sub groups, annotation types, search flags, has scan data, search programs, search details, FASTA statistics, scan file list, multiple searches, from psi
- Location: `RC/multiple_project_search_id/`: `SearchNameList_From_ProjectSearchIds_RestWebserviceController` (reference for name + real `searchId`; applies `SearchNameReturnDefaultIfNull`; returns sub-groups via `SearchSubGroup_Name_Display_Computation_Util`), `SearchAnnotationTypeList_From_ProjectSearchIds_...`, `Get_SearchFlags_From_ProjectSearchIds_...`, `SearchProgramsPerSearchList_From_ProjectSearchIds_...`, `Get_SearchDetails_All_RestWebservice`, `Search_Info_From_ProjectSearchIds_...`, `FastaFileStatistics_From_ProjectSearchIds_...`; plus `RC/single_project_search_id/SearchScanFileData_For_ProjectSearchId_RestWebserviceController` (multi-search despite its package; URL `get-search-scan-file-data-for-project-search-id-list`). Name helpers: `W/web_utils/SearchNameReturnDefaultIfNull`, `W/objects/SearchItemMinimal`.
- Used by: `DP/data_pages_common/searchNameRetrieval.ts`, `annotationTypeDataRetrieval.ts`, `dataPage_common_Get_Searches_Flags.ts`, `searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer.ts`, `dataPage_common_Get_dataPage_common__Searches_Info.ts`, `commonData_LoadedFromServer_MultipleSearches__FastaFileStatistics.ts`, `commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId.ts`.
- How to use / extend: on data pages read the already-loaded front-end results; a new per-search metadata field usually belongs in one of these. Always pass the real `search_tbl.id` to `SearchNameReturnDefaultIfNull`.
- Do not use when: per-project, not per-search, data.
- Limits and gotchas: each controller resolves projectSearchId → searchId one at a time. `SearchProgramsPerSearchList_...` Javadoc is a copy-paste. Search flags are read two ways: `Get_SearchFlags_...` (direct searcher) vs `SearchFlagsForSingleSearchId_SearchResult_Cached` (used by `PSM_List_...`, `ScanData_NO_Peaks_...`); that cached class's key lacks `equals`/`hashCode`, so it likely never hits (seen in code, not runtime-tested).
- Related / duplicates: front-end core data loaders entry.
- Status: verified

### Spectral storage (spectr) proxy webservices for scan data (two families)
- What it solves: front-end access to scan data/spectra in the external spectral storage service: check access, map the id to the scan file's spectr API key, call spectr, return or pass through.
- Search keywords: spectr, spectral storage, scan data, peaks, MS1, retention time, scan summary, ion injection time, TIC, Lorikeet, spectrum viewer, max scan count, binned intensity, heatmap, scan numbers in RT range
- Location: family A keyed by projectScanFileId — `RC/scan_data__single_project_scan_file_id/`: `ScanData_NO_Peaks_And_Optional_ALL_PARENTS__For_ScanNumbers_ProjectScanFileId_RestWebserviceController`, `ScanData_WithPeaks_For__ScanNumbers_ProjectSearchId_SearchScanFileId_And_OPTIONAL_M_Over_Z_Ranges_RestWebserviceController` (actually takes projectScanFileId), `ScanNumbers_For_mS_1_Scans_ProjectScanFileId_RetentionTime_Range_RestWebserviceController`, `ScanWithPeaks_MaxReturnCount__AccessControl_ProjectScanFileId_RestWebserviceController`; plus in `RC/single_project_search_id/`: `ScanFile_SummaryData_From_SpectralStorageSystem_...`, `ScanFile_PeakIntensityBinnedOn_RT_MZ_JSON__From_SpectralStorageSystem_For_ProjectScanFileId_...` (gzipped passthrough). Family B keyed by projectSearchId (+searchScanFileId): `ScanData_NO_Peaks_For__ScanNumbers_And_ALL_PARENTS_ProjectSearchId_SearchScanFileId_...`, `ScanWithPeaks_MaxReturnCount__AccessControl_ProjectSearchId_...`, `Spectrum_For_Lorikeet_For_PSM_Id_...`, `PSM_List_RestWebserviceController`. Client wrappers `W/spectral_storage_service_interface/Call_Get_*` ([storage_files_external_services.md](storage_files_external_services.md)); API key via `ScanFileDAO_IF.getSpectralStorageAPIKeyById`.
- Used by: `DP/common_data_loaded_from_server__scan_data__from_project_scan_file_id/*` loaders, `CDL/.../..._Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectSearchId.ts`, `lorikeetSpectrumViewer_LoadDataFromServer.ts`, `psmList_ForProjectSearchIdReportedPeptideId_GetDataFromServer.ts`.
- How to use / extend: resolve child id → projectId → access; validate a `searchScanFileId` belongs to the projectSearchId's search; require non-null scanFileId and API key; call a `Call_Get_*` wrapper (never spectr directly). Responses are struct-of-arrays. Keep scan-number lists under the max-scan count.
- Do not use when: data is in the Limelight DB.
- Limits and gotchas: two near-duplicate families (projectSearchId+searchScanFileId vs projectScanFileId); Several URL constants say "search-scan-file-id ... single-project-search-id" but take projectScanFileId. JSON gotcha: `byte[]` serializes as base64, so `level_Array` is `short[]`. Not response-cached. Scan-number match/miss policy is the maintainer's call (root CLAUDE.md).
- Related / duplicates: front-end scan-data loaders; spectr clients in 3 modules ([storage_files_external_services.md](storage_files_external_services.md)).
- Status: verified (wrapper internals not read here)

### Project-level webservice families (pointer list)
- What it solves: inventory of existing project-level endpoints so you extend rather than add parallel ones.
- Search keywords: project searches list, folders, organize searches, search tags, tag categories, project create, project list, title, abstract, notes, lock, public access, researchers, invite, default cutoffs override, scan files in project, feature detection runs, copy searches, has data, saved views, experiments
- Location: `RC/other_like_project/` (82 controllers): searches + folders + tags in one call `ProjectView_OrFrom_ProjectSearchIds_SearchList_RestWebserviceController` (path `project-view-page-or-project-search-ids-search-list`; applies `SearchNameReturnDefaultIfNull`; lazily creates missing `ProjectSearchIdCodeDTO` rows with retry on duplicate key; "NOT cached since user can update"); section probe `ProjectView_HasData_ForEachSectionOf_ProjectPage_RestWebserviceController` (five `Project_Has_AtLeastOne_*_ForProjectId_Searcher_IF`, LIMIT 1); tags `SearchTags_*`, `SearchTagCategories_*` ("exactly one of `projectIdentifier` or `projectSearchIdList`" addressing; uncategorized fake category row; duplicate tag → `duplicate=true`); folders `Project_OrganizeSearches_*`; copy `Project_CopyOrMoveProjectSearchIdsToNewProject_RestWebserviceController` (copy only; "OrMove" names stale); default cutoffs override `Project_Level_Filter_Default_Cutoffs_Override_Maint__{Get,Save}_*`; project lifecycle (`ProjectCreate_*`, `ProjectsList_*`, `UpdateTitleOnProjectRecord_*`, `Project_Note_*`, `Project_Lock_Change_*`, `Project_PublicAccess_*`, `Project_Label_*`, `Project_MarkForDeletion_*`); researchers (`Project_InviteUser_NewOrExistingUser_*`, `Project_ChangeUserAccess_*`, ...); scan files / feature detection (`Project_ScanFiles_In_Project_List_*`, `Project_ScanFile_Delete_*`, `Project_FeatureDetection_Runs_In_Project_List_*`, ...). Per-search insert/update/delete in `RC/project_search_based_insert_update_delete/` (comments, web links, names, saved views, default view, delete search). Search tags by projectSearchId list in `RC/multiple_project_search_id/SearchTags_*`. Experiments in `RC/experiment/`. Structure files in `RC/structure_file_data__tied_to_project_id/`.
- Used by: project page, organize-searches page, search details block, tag overlays, structure widget (front-end callers found by grep).
- How to use / extend: reuse the searches/tags/folders webservice through its front-end loader for any page needing searches with names/tags/folders. "Exactly one of projectIdentifier or projectSearchIdList" (reject both/neither; ids must map to one project) is the reusable request pattern for project-scoped edits launched from data pages. Multi-row writes go through `database_update_with_transaction_services` ([data_access.md](data_access.md)).
- Do not use when: you only need names for given projectSearchIds on a data page (use `search-name-list-from-psi` via `searchNameRetrieval.ts`).
- Limits and gotchas: Project_Level default cutoffs save has 4 copy-pasted loops. Invite email bodies are private methods in the controller. Search delete requires the client to send the exact set of containing experimentIds (mismatch → `experimentIdsNotMatch`). Web-link URL validation is server-side in `Insert_WebLink_RestWebserviceController` (see web security doc).
- Related / duplicates: [data_access.md](data_access.md) (DAOs/tx services), [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md) (queues), [security_access_control_sessions.md](security_access_control_sessions.md) (access/users).
- Status: verified (structure; most bodies skimmed)

### Run-importer → webapp "finished" callback endpoints
- What it solves: lets the run-importer daemon tell the webapp an import / pipeline run finished so the webapp sends the notification email.
- Search keywords: import finished, callback, notify webapp, send email on import complete, run importer to webapp, server to server, daemon to webapp
- Location: limelight_webapp, `SMP/controllers_other_than_for_pages/RunImporter_ImporterFinish_RestWebserviceController.java`, `RunImporter_ImporterOrRunPipeline_OtherThan_ImportLimelightXMLScanFiles__Finish_RestWebserviceController.java`; request/response classes in `limelight_shared_code/.../file_import_limelight_xml_scans/run_importer_to_web_app_objects/`; email via `SendEmailForRunImportFinishService` / `..._ImportOrRunPipeline_Service` ([storage_files_external_services.md](storage_files_external_services.md)).
- Used by: `limelight_run_importer/.../on_import_finish/On_ImportLimelightXMLScanFile_Finish_CallWebService.java`, `On_ImportOrRunPipeline_Finish_CallWebService.java`.
- How to use / extend: template for a new daemon → webapp notification: XML body, shared-code request/response classes, add classes to the JAXB list, path in `AA_OtherRestControllerPaths_Constants`. Reads DTOs via shared-code singleton DAOs (`FileImportTracking_Shared_Get_DAO.getInstance()`), not Spring DAOs.
- Do not use when: browser-facing calls.
- Related / duplicates: no shared outbound-HTTP helper on the caller side ([storage_files_external_services.md](storage_files_external_services.md)).
- Status: verified (second controller skimmed)

### Calling an external job-style webservice from a controller (Blib request / status / cancel)
- What it solves: start an async file-creation job on an external service (returns `requestId`); the front end polls status or cancels.
- Search keywords: blib, spectral library, external webservice, async job, request id, poll status, cancel, HttpURLConnection, config base URL, outbound HTTP
- Location: `RC/multiple_project_search_id/BlibSpectralLibrary_Download__{Request_Creation,Get_Creation_Status,Cancel_Creation_}_RestWebserviceController`; status call class `W/blib_file__creation_web_service__call_webservice_code/BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService.java`; base URL config key `ConfigSystemsKeysSharedConstants.BLIB_SPECTRAL_LIBRARY_FILE_CREATION_WEB_SERVICE_BASE_URL`.
- Used by: `DP/blib_spectral_library_file__download/Blib_SpectralLibrary_File_Download__Overlay_Component_And_SendRequest_Code.tsx`; file download `BlibSpectralLibrary_File__Download_Controller`.
- How to use / extend: put the outbound call in a separate `*_CallWebService` class like the status one (classifies "could not connect" vs "non-200" without throwing), not inline.
- Do not use when: target is spectr or File Object Storage (their own clients).
- Limits and gotchas: Request and Cancel hand-roll `HttpURLConnection` inline (prefer a `*_CallWebService` class with explicit timeouts); the Request controller (about 1.5k lines) builds per-PSM mod positions (`n`/`c`/`u` codes) itself.
- Related / duplicates: no shared outbound-HTTP helper repo-wide ([storage_files_external_services.md](storage_files_external_services.md)).
- Status: verified

### Annotation data by ids + annotation type ids (thin controllers over services)
- What it solves: filterable or descriptive annotation values for given reported peptide ids or protein sequence version ids and annotation type ids; PSM peptide-position annotations for PSM ids.
- Search keywords: annotation data, scores, descriptive annotation, filterable annotation, reported peptide annotations, protein annotations, peptide position annotation
- Location: `RC/single_project_search_id/`: `ReportedPeptideFilterableAnnotationTypeData_For_RepPeptIds_AnnTypeIds_...`, `ReportedPeptideDescriptiveAnnotationTypeData_...`, `Protein_FilterableAnnotationTypeData_For_ProteinSeqVIds_AnnTypeIds_...`, `Protein_DescriptiveAnnotationTypeData_...`, `Psm_PsmPeptidePositionAnnotationData_...`; the four reported-peptide/protein controllers each wrap a `W/services/*_Service_IF` / `*_ServiceIF` (pivot-to-map services, [domain_utilities.md](domain_utilities.md)); the PSM peptide-position controller calls a searcher (`Get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeIds_Searcher_IF`) directly; request roots in `SMP/data_pages/rest_request_objects/controller_request_root/`.
- Used by: front end, one caller each: `commonData_LoadedFromServer_SingleSearch__{ReportedPeptide,Protein}_{Filterable,Descriptive}_AnnotationValues.ts` (two-dimension loaders) and `common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records.ts`.
- How to use / extend: keep the controller thin; put logic in a service.
- Do not use when: PSM-level annotation data for a whole search (unfiltered entry).
- Limits and gotchas: `Psm_PsmPeptidePositionAnnotationData` URL lacks the `d/rws/for-page/psb/` prefix.
- Related / duplicates: legacy request roots entry.
- Status: verified (front-end callers grep-matched by URL literal) (re-checked)

### Legacy shared request roots / response parts — do not extend
- What it solves: top-level request/response DTOs for a few older data webservices.
- Search keywords: RequestRoot, request object, response item, peptide list item, protein list item
- Location: `SMP/data_pages/rest_request_objects/controller_request_root/*_RequestRoot.java` (13), `SMP/data_pages/rest_response_parts/*.java` (6); enum `SMP/controller_enums/RestControllers_RequestResponseDataTypes.java`.
- Used by: only 5 request roots and 2 response parts have users (e.g. `ReportedPeptideIdList_ForSearchCriteria_Single_ProjectSearchId_RestWebserviceController`); 8 request roots, 2 response items (`PeptideItemForPeptideList_SingleProjectSearchId`, `ProteinItemForProteinList_SingleProjectSearchId`) and the enum have no users.
- How to use / extend: do not extend — use nested `WebserviceRequest`/`WebserviceResult` per controller.
- Do not use when: new webservices.
- Limits and gotchas: dead classes look reusable but are not wired.
- Related / duplicates: REST template.
- Status: verified

## Server: downloads, uploads, share page, misc endpoints

### Form-POST file download controllers (`d/dnld/...`)
- What it solves: browser downloads a server-produced or proxied file by submitting a hidden `<form>` POST carrying one field `requestJSONString`; the browser saves the response, so large outputs stream straight to disk.
- Search keywords: download file, export, attachment, Content-Disposition, form submit download, TSV download, save as, d/dnld, data download controller
- Location: limelight_webapp, `SMP/data_pages/data_download_controllers/` (paths `AA_DataDownloadControllersPaths_Constants`, all `d/dnld/`, search-based ones `d/dnld/psb/`; charset `DownloadsCharacterSetConstant.DOWNLOAD_CHARACTER_SET` UTF-8; no-session page `ErrorMsg_NoSessionNotPublicProject_Controller` → `downloadError_NoSessionOrProjectNotPublic.jsp`). Controllers: `SearchFile_Download_Controller`, `FileObjectStorageEntry_Download_Controller`, `ScanFileContents_StoredIn_FileObjectStorage_Download_Controller` (2 paths), `BlibSpectralLibrary_File__Download_Controller`, `psm_downloads/PSMs_For_ProjectSearchIds_SearchCriteria_Optional_ExperimentData_..._Download_Controller` and its `..._WITH_Computed__Apex_Retention_Time_Download_Controller` variant.
- Used by: front end `searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers.tsx`, `projectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component.tsx`, `Blib_SpectralLibrary_File_Download__Overlay_Component_And_SendRequest_Code.tsx`, `DP/common__project_search_and_experiment_based_download_data/download_Psms_*.ts`.
- How to use / extend: path constant; `@Controller` with `@PostMapping` returning `void`; `httpServletRequest.getParameter("requestJSONString")` → `UnmarshalJSON_ToObject.getObjectFromJSONString`; do the access check in the controller itself; on `Limelight_WS_AuthError_Unauthorized_Exception` forward to the no-session error controller; set `Content-Type` + `Content-Disposition: attachment` with an RFC 6266-encoded filename; stream to `getOutputStream()`; update the download-status service at start / success / fail. Front end: hidden form `target="_blank"` + `<textarea name="requestJSONString">` (see `download_Psms_For_..._RepPeptProtSeqVIds.ts`). The PSM download packs id lists compactly (radix 30, separator letters `X`/`Y`/`Z`) because form-encoding JSON inflates the body, and checks `requestVersion == EXPECTED_REQUEST_VERSION`.
- Do not use when: the data is already in the browser and small — use `StringDownloadUtils` (`DP/data_pages_common/downloadStringAsFile.ts`, 18 users). Not for JSON the page renders.
- Limits and gotchas: A very large form body can make `getParameter` return null. Errors after streaming starts reach the user only through the status service. The two PSM download controllers (about 3.1k / about 4.1k lines) are largely copy-paste — adding a column means editing both; the APEX variant contains its own m/z / ppm-window math ([domain_utilities.md](domain_utilities.md); reuse the canonical mass calculator rather than copying this math).
- Related / duplicates: next entry; FOS stream-through ([storage_files_external_services.md](storage_files_external_services.md)).
- Status: verified (re-checked)

### Download status tracking for form-POST downloads (download identifier)
- What it solves: a form-POST download gives JS no completion callback; the page gets a one-time `downloadIdentifier`, passes it in the form, and polls whether the server-side download is ABOUT_TO_SUBMIT / IN_PROGRESS / SUCCESS / FAIL.
- Search keywords: download progress, download status, poll download, download identifier, form submit status, spinner while downloading, sddfs, download failed message
- Location: limelight_webapp, `W/services/Support_DataDownloadControllers_Service.java` (+ `_IF`): `getNewDownload_Identifier_MarkAs_AboutToSubmit()`, `updateDownload_Identifier_Status(id, DownloadStatus_DataDownloadControllers_Enum)`, `getDownload_Identifier_Status(id)`, `removeDownload_Identifier(id)`; REST `RC/support_data_download_controllers/Support_DataDownloadControllers_RestWebserviceController` (`d/rws/for-page/sddfs/support-data-download-via-form-submit-get-new-download-identifier-string`, `.../support-data-download-via-form-submit-get-after-status`).
- Used by: the 6 download controllers; front-end polling copies in `download_Psms_For_..._RepPeptProtSeqVIds.ts`, `download_Psms__With_APEX_MS1_Data_..._RepPeptProtSeqVIds.ts` (that FE file itself is dead per `fe_data_pages_common`), `Blib_SpectralLibrary_File_Download__Overlay_Component_And_SendRequest_Code.tsx` (reference: `_download_BlibFile`, `_download_BlibFile_DoActual`, `_download_BlibFile_getDownloadStatus_AfterSubmitForm`), `searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers.tsx` (3 copies).
- How to use / extend: FE: POST get-new (body must contain the request flag field used by the existing callers) → put `downloadIdentifier` in the form JSON → submit → poll get-after-status with `window.setTimeout`. Server: `IN_PROGRESS` early, `SUCCESS` after the last byte, `FAIL` in every catch. Status is removed once read as SUCCESS/FAIL.
- Do not use when: status must survive restarts or span webapp instances without sticky sessions — it is an in-memory per-JVM Guava cache (1-day expire-after-access, held via `SoftReference`; can vanish under memory pressure → "not found").
- Limits and gotchas: `updateDownload_Identifier_Status` on an id NOT in the cache inserts `ABOUT_TO_SUBMIT` instead of the requested status (status lost after eviction; seen in code, not runtime-tested). Not registered with the central in-memory cache registry (admin clear-all skips it). Ids from `GenerateRandomStringForCode`. No shared front-end helper: the 3-step form + poll sequence is copy-pasted 5 times in 4 files.
- Related / duplicates: form-POST download controllers; in-memory cache registry ([storage_files_external_services.md](storage_files_external_services.md)).
- Status: verified (re-checked)

### Binary upload webservices: octet-stream body + Base64 JSON params header (single request and chunked)
- What it solves: upload a file from the browser as a raw `application/octet-stream` body with request parameters Base64-encoded (UTF-8) in header `limelight_upload_file_params_json_base_64`; large files go through the chunked V2 protocol (5 MB chunks to local disk or S3 multipart, optional per-chunk SHA-256, resumable).
- Search keywords: file upload, binary upload, octet-stream, chunked upload, multipart, resumable, large file, S3 multipart, checksum, SHA-256, upload progress, base64 header, upload metadata header, body prefix
- Location: server: `W/web_utils/HttpHeaderValue_Base64_Encoding` (`decode_HttpHeaderValue_Base64_ToString`); chunked `RC/other_like_project/Project_UploadData_V2_UploadFile_{Initialize,Chunking_Upload_File,Submit,Cancel_Delete}_RestWebserviceController` (chunk size `FileUploadMaxFileSize_Config_WithConstantsDefaults.MAX_FILE_UPLOAD_CHUNK_SIZE`; S3 parts in `FileImportTrackingSingleFile_S3UploadPart_DAO`); single-request `Project_FeatureDetection_Import_Request_UploadFile_*`, `Project_FeatureDetection_Run_And_Import_Request_UploadFile_*`, `Project_GoldStandard_Import_Request_UploadFile_*`, `RC/structure_file_data__tied_to_project_id/StructureFile_Contents_UploadData_RestWebserviceController` (adds a length-prefixed JSON body prefix with byte-length and SHA-256 headers). Front end: `DP/data_pages_common/httpHeaderValue_Base64_EncodeDecode.ts` (`encode_String_To_HttpHeaderValue_Base64`); chunked sender `projectPage_UploadData_SendUploadFileToServer.ts`; single-request senders `project_page__import_and_pipeline_run/projectPage_UploadData_{GoldStandard_Import,FeatureDetection_Import,FeatureDetection_Run}_UploadFile_SendFileToServerWebservice.ts` (raw `XMLHttpRequest`); structure-file upload in `..._StructureFile_Contents_Entry_DAO.ts` (raw `window.fetch`).
- Used by: project page upload overlays; structure widget.
- How to use / extend: for small/medium files copy a single-request sender + controller; for large files use the V2 chunked protocol (local-disk path enforces in-order gap-free chunks, skips already-saved chunks, checks max size and optional client SHA-256). Hand-rolled senders must add the sync-tracking header themselves (`getWebserviceSyncTrackingCode`) and use `handleRawAJAXError` / `handleAJAXError`. Queue-side flows (initialize / submit to the import queue or pipeline-run queue, new `FileImportAndPipelineRun_RequestType`) are [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md).
- Do not use when: small JSON payloads (standard POST).
- Limits and gotchas: the octet-stream + header handling is re-implemented in 6 server controllers and 3 ways on the front end (chunked uploader, 4 near-identical single-POST helpers, structure-file DAO), no shared helper beyond the Base64 classes. Front end uses standard Base64 (`+/=`), keep in sync with the Java class. S3 chunk branch is incomplete per in-code TODOs; test against real S3 before relying on it. Structure upload holds the whole body in memory (50 MB cap). V1 single-request upload is kept only for the old submit-import CLI. `upload_Bullseye_File_Contents_..._SendFileToServerWebservice.ts` is dead. Single-request FE senders call `window.alert` themselves; some catch paths may never settle the promise (code reading).
- Related / duplicates: `limelight_features_docs/upload_metadata_length_prefixed_in_body.md` (lead only); dual-protocol entry; FOS upload ([storage_files_external_services.md](storage_files_external_services.md)).
- Status: verified (S3 paths from code + TODOs only, not exercised)

### Share-page (URL shortener) insert with random key and retry on duplicate
- What it solves: create (or reuse) a short URL for the current data page; random key, insert retried on unique-key collision.
- Search keywords: share page, short URL, url shortener, share link, random code, retry on duplicate key
- Location: `RC/project_search_based_insert_update_delete/Share_Page_Insert_RestWebserviceController` (`d/rws/for-page/psb/insert-shared-page`).
- Used by: front end `sharePage_dataPages_Common.ts` ([front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)).
- How to use / extend: reuses an existing key via `UrlShortenerDAO.getFirstShortenedURLByURL`; else a 10-char key from `SecureRandom` over `SHARE_CODE__ALLOWED_CHARS`, inserted via `UrlShortener_Insert_UsingDBTransactionService`, catching `DuplicateKeyException` up to 30 tries. Allowed pages: `AA_PageControllerPaths_Constants.PATHS_ALLOWED_FOR_SHARE_PAGE`.
- Do not use when: you need a generic random code — use `W/web_utils/GenerateRandomStringForCode` (SecureRandom).
- Limits and gotchas: own key generator (parallel to `GenerateRandomStringForCode`).
- Related / duplicates: redirect controllers; insert-with-retry variants ([data_access.md](data_access.md)).
- Status: verified

### Browser JavaScript error logging webservice (server side)
- What it solves: receives JS errors (message, stack, user agent, browser URL, failing webservice URL), logs them with the session user, triggers the "email on error" notification.
- Search keywords: JS error, report error, client error logging, browser exception, error email
- Location: `RC/general/LogBrowserJavascriptError_RestWebserviceController`; email `SendEmailOnServerOrJsError_ToConfiguredEmail` ([storage_files_external_services.md](storage_files_external_services.md)).
- Used by: front end `FE/common_all_pages/reportWebErrorToServer.ts` (only caller; see front-end entry).
- How to use / extend: from JS call `reportWebErrorToServer`, never the URL directly.
- Do not use when: server errors (normal logging + the same email service).
- Limits and gotchas: call only through `reportWebErrorToServer`.
- Related / duplicates: front-end error reporting.
- Status: verified

### Webapp-side page/request header, admin and user-account endpoints (pointer)
- What it solves: user-account pages/webservices (login, logout, create account, reset password, ToS, public access code, submit-import key) and admin pages.
- Search keywords: login, create account, reset password, terms of service, public access code, submit import key, admin config, manage users, clear cache, importer pause
- Location: `SMP/user_account_pages/` (page + REST controllers), `SMP/webapp_admin_pages/`.
- Used by: `FE/user_account_page_js/**`, `FE/webapp_admin_pages/**` (38 `user/rws/for-page` / `admin/rws/for-page` literals).
- How to use / extend: copy the closest controller; for random codes use `GenerateRandomStringForCode` ([security_access_control_sessions.md](security_access_control_sessions.md)).
- Do not use when: n/a.
- Related / duplicates: [security_access_control_sessions.md](security_access_control_sessions.md).
- Status: verified (bodies skimmed)

## Search data lookup parameters code (the URL filter-state code)

### Lookup code: save + dedupe + issue (`SearchDataLookupParams_MainProcessing`) and resolve (`SearchDataLookupParams_GetRecordForCode`)
- What it solves: turns per-search cutoffs + annotation-type display choices (`SearchDataLookupParamsRoot`) into a short, stable, shareable code stored in the DB, so a data-page URL carries "which searches and which cutoffs" without encoding them; identical params map to the same row/code. Resolves a code back to its record.
- Search keywords: search data lookup parameters, lookup code, URL code, cutoffs in URL, filter params code, shareable link params, hash of params, MD5, hash collision index, content-addressed, dedupe JSON, decode URL code, searchDataLookupParametersCode
- Location: limelight_webapp, `W/search_data_lookup_parameters_code/main/`: `SearchDataLookupParams_MainProcessingIF.searchDataLookupParams_Save_Create_Code(root, rootIdType, singleProjectSearchIdCreatedDefaultsFor, createdByInfo)` / `searchDataLookupParams_Save_ReturnObject(...)`, `SearchDataLookupParams_Save.java` (`@Transactional`), `SearchDataLookupParams_FormatParseCodeString.java`; resolve `SearchDataLookupParams_GetRecordForCodeIF.getSearchDataLookupParametersLookupDTO_RecordForCode(code)`. DAOs `W/dao/SearchDataLookupParametersLookupDAO` (table `search_data_lookup_parameters`), `SearchDataLookupParametersLookupAssocProjSrchIdDAO`. Object model `W/search_data_lookup_parameters_code/lookup_params_main_objects/` (`SearchDataLookupParamsRoot`, `SearchDataLookupParams_For_Single_ProjectSearchId` with `psmFilters`, `reportedPeptideFilters`, `matchedProteinFilters`, `modificationPositionFilters`, display lists), version `constants/SearchDataLookupParams_VersionNumber` (MINIMUM = CURRENT = 1).
- Used by: save — `SearchDataLookupParametersLookupCode__Create_InsertToDB__Service`, default-cutoffs builder, experiment webservices + `Experiment_AddSave_MainProcessing`; resolve — `DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor`, `FeatureDetectionView_Controller`, `Validate_Access_Page_ExperimentDataPage`. `SearchDataLookupParams_For_Single_ProjectSearchId` is the standard "search criteria" field in single-search REST requests (about 20 Java files).
- How to use / extend: build a root with `versionNumber = CURRENT_VERSION_NUMBER`, rootIdType `PROJECT_SEARCH_IDS`, a `SearchDataLookupParams_CreatedByInfo`. Algorithm: sort filter lists by annTypeId → Jackson JSON → MD5 hex → reuse a row with byte-identical JSON, else insert with `hashCollisionIndex = max+1`; retries up to 20 times on `DuplicateKeyException`; updates last-accessed. Code = `<md5hex>z<collisionIndex>` (legacy `_` accepted). Adding a field changes new codes only; bump the version if old JSON must migrate. Autowire the resolver IF with field name `searchDataLookupParams_GetRecordForCode`.
- Do not use when: state only the browser reads (front-end `/q/` page-state blob, [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)); roots other than projectSearchIds (throws).
- Limits and gotchas: hash over JSON serialization, so order matters; `modificationPositionFilters` are NOT sorted → same logical params in another order make a duplicate row/code (harmless). `singleProjectSearchIdCreatedDefaultsFor` unused in the method body. Rows are never deleted by this code (no cleanup found). Malformed code → `IllegalArgumentException`. TWO `@Component`s implement the resolver IF: the real one and an unused byte-for-byte copy `SearchDataLookupParams_GetProjectSearchIdsForCode` — by-type autowiring works only via field-name fallback (renaming a field would likely fail startup; inferred, not tested). `annTypeId` null NPEs in sort.
- Related / duplicates: default cutoffs builder and `SearcherCutoffValues_Factory` ([domain_utilities.md](domain_utilities.md)); front-end mirror (next entries).
- Status: verified

### Lookup-code REST endpoint + service facade (`Get_SearchDataLookupParametersLookupCode_RestWebservice`)
- What it solves: one call that either creates defaults for `projectSearchIds_CreateDefault` (optionally appended to a supplied root) or saves a supplied root as-is; returns root + code + DTO.
- Search keywords: get search data lookup params code, new URL code, change searches, reorder searches, update page URL with cutoffs, create default code
- Location: `W/services/SearchDataLookupParametersLookupCode__Create_InsertToDB__Service.java` (+ `_IF`); REST `RC/multiple_project_search_id/Get_SearchDataLookupParametersLookupCode_RestWebservice.java`, constant `GET_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_REST_WEBSERVICE_CONTROLLER` = `d/rws/for-page/psb/get-search-data-lookup-params-code`; records `SearchDataLookupParams_CreatedByInfo` (user id if session, remote IP).
- Used by: the REST controller and the psb interceptor. Front-end callers of the URL (5, each hand-written): `DP/data_pages_common/updatePageState_URL_With_New_SearchDataLookupParameters_Root.ts`, `DP/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_ChangeSearches.ts`, `.../searchDetailsAndFilterBlock_Re_Order_Searches.ts`, `projectPage_SearchesSection_Open_DataPages_PeptideProteinMod.ts`, `featureDetection_ViewPage__MainPage_Component.tsx`.
- How to use / extend: front end — reuse `updatePageState_URL_With_New_SearchDataLookupParameters_Root.ts` instead of adding a 6th caller; server — call the service with projectId (needed for project defaults).
- Do not use when: you only read the current page's params (already on the page).
- Limits and gotchas: all projectSearchIds must be in one project (else internal error). Defaults path requires a supplied root at CURRENT version; save-as-is path only `>= MINIMUM`. Returns all-null if neither input given.
- Related / duplicates: 5 parallel front-end callers.
- Status: verified

### Search data lookup parameters — client side (read from page, validate, update URL)
- What it solves: TypeScript mirror of `SearchDataLookupParamsRoot`; read from the page at load, validated; when the user changes cutoffs, POSTed for a new code that replaces the code in the URL.
- Search keywords: filter cutoffs, cutoff values, search data lookup params, searchDataLookupParamsCode, psmFilters, annotation type display, change filters, new code
- Location: `DP/data_pages__common_data_classes/searchDataLookupParameters.ts` (`SearchDataLookupParameters_Root`, `SearchDataLookupParams_For_Single_ProjectSearchId`, `copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root`); `DP/data_pages_common/getSearchDataLookupParametersFromPage.ts` (DOM ids `search_data_lookup_parameters_at_page_load_code` / `_json`); `DP/data_pages_common/updatePageState_URL_With_New_SearchDataLookupParameters_Root.ts`; `updatePageState_URL_With_NewFilterCutoffs_FromUser.ts`; `page_Update_From_search_data_lookup_parameters_lookup_code__computed.ts` (swap in the server-computed code when the URL used project-search-id codes; uses `limelight__ReplaceBrowserAddressBarURL_ValidateUpdated_Function`).
- Used by: classes imported by 64 files; `GetSearchDataLookupParametersFromPage` 11 page roots; `UpdatePageState_URL_With_NewFilterCutoffs_FromUser` in `searchDetailsAndFilterBlock_UserInput_OverlayContents.tsx`; the root updater in `annotationTypesToDisplay__SelectionOverlay__Component.tsx`; `page_Update_From_..._computed` in 5 page roots.
- How to use / extend: read params from `DataPageStateManager.get_searchDetailsCriteriaData()`, never re-parse DOM. Change Java root + this class + `copyAndValidate...` together.
- Do not use when: experiment pages (own handling: experiment id + optional `/c/<code>`).
- Limits and gotchas: Change/Re-order Searches write the call and URL building inline (full navigation via `window.location.href`) instead of reusing the shared updater. A new code means a new per-search loader Root (see loader tree).
- Related / duplicates: `limelight_features_docs/compressing_strings_stored_in_the_url.md` (lead only); central page state manager ([front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)).
- Status: verified

## Front end: calling webservices, errors, sync tracking, reload

### Standard webservice POST call (`webserviceCallStandardPost`)
- What it solves: one function for every JSON POST to a Limelight webservice: JSON encode, sync-tracking header, concurrency throttle, standard HTTP-error handling, JSON parse, promise resolving `{ responseData }`.
- Search keywords: AJAX, fetch, webservice call, REST call, POST, HTTP request, server call, rws, request queue, throttle, max concurrent requests, XHR
- Location: `FE/webservice_call_common/webserviceCallStandardPost.ts`, `webserviceCallStandardPost({ dataToSend, url, dataRetrieval_CanRetry, doNotHandleErrorResponse, webserviceCallStandardPost_ApiObject_Holder_Class })` → `{ promise, api }`; helpers `webserviceCallStandardPost_ApiObject_Class.ts`, `webserviceCallStandardPost_RejectObject_Class.ts`.
- Used by: about 180 files, e.g. all `DP/common_data_loaded_from_server__*` loaders, `FE/user_account_page_js/user_account_maint_page/userAccountManagementPage_GetUserInfo_FreshLoad.ts`, `FE/webapp_admin_pages/webapp_manage_terms_of_service_page/manageTermsOfService_Maint.ts`.
- How to use / extend: `const { promise } = webserviceCallStandardPost({ dataToSend, url: "d/rws/for-page/...", dataRetrieval_CanRetry: true })`; `promise.then(({ responseData }) => ...)`; wrap in your own `new Promise` and `reject(reason)` in catch; validate every field of `responseData` at runtime (root CLAUDE.md off-the-wire rule). Pass `doNotHandleErrorResponse: true` only if the caller shows its own error UI (account create/reset-password, blib download).
- Do not use when: data a `DP/common_data_loaded_from_server__*` loader already provides, or that belongs there (add a leaf; see [Front-end data loader directories](#front-end-data-loader-directories-dpcommon_data_loaded_from_server__-check-here-first)); the caller must handle a specific non-200 status itself (any non-200 shows the standard error to the user, and even with `doNotHandleErrorResponse` the caller gets no status code): write that call with `fetch`; chunked file uploads (their own senders); binary/non-JSON responses, GET requests. The error-log and keep-alive calls use raw `fetch` on purpose. Do not add new XHR, and do not use jQuery (`$.ajax`) for any new webservice call.
- Limits and gotchas: max 10 in flight (`MAX_CONCURRENT_REQUESTS`), rest queued FIFO. `api.abort()` is commented out (api object inert). `dataRetrieval_CanRetry` is passed by about 126 callers but never read — there is NO retry. Every failure rejects with an empty `WebserviceCallStandardPost_RejectObject_Class` (no status/message), so the caller cannot tell which non-200 status it got. XHR upload progress events were unreliable on slow connections; new code doesn't use them. On HTTP error calls `handleAJAXError` (overlay or reload) unless `doNotHandleErrorResponse`. Sync code is sent as header `limelight_webservice_sync_tracking_code` (not in the URL, despite an old comment).
- Related / duplicates: other HTTP call paths: raw `window.fetch` in `reportWebErrorToServer.ts`, `keep_UserSession_...`, header project list, structure-file DAOs; raw `XMLHttpRequest` in 5 upload senders; jQuery `$.ajax` in the dead `googleChartLoaderForThisWebapp.ts`.
- Status: verified (re-checked)

### "Already handled" reject sentinel (`WebserviceCallStandardPost_RejectObject_Class`)
- What it solves: lets a promise chain reject after an error was already shown, without the error reporter logging a phantom browser error.
- Search keywords: reject reason, already handled, suppress error report, promise rejection, sentinel
- Location: `FE/webservice_call_common/webserviceCallStandardPost_RejectObject_Class.ts`; checked in `reportWebErrorToServer.reportErrorObjectToServer` (early return on `instanceof`).
- Used by: `webserviceCallStandardPost.ts`, `reportWebErrorToServer.ts`, structure-file contents loaders.
- How to use / extend: after `handleAJAXError(...)` in a hand-rolled fetch, `reject(new WebserviceCallStandardPost_RejectObject_Class())`.
- Do not use when: the error was NOT surfaced (report it).
- Limits and gotchas: carries no data. Several admin pages do `promise.catch(() => { throw Error("Webservice call fail...") })`, turning the sentinel into an unhandled raw Error.
- Related / duplicates: next two entries.
- Status: verified

### AJAX HTTP error handling (`handleServicesAJAXErrors`)
- What it solves: maps a failed webservice response to the standard reaction: reload the page on sync-code mismatch / 401 `no_session` / 403 `forbidden`; show a red "Error accessing server" box otherwise (invalid parameter, 404, 500, user-mgmt unavailable 503...); reports unexpected status codes.
- Search keywords: HTTP error, 401, 403, no session, forbidden, session expired, error overlay, reload on error, user mgmt unavailable, sync tracking mismatch
- Location: `FE/common_all_pages/handleServicesAJAXErrors.ts`: `handleAJAXError({ fetch_Results, url, requestData })` (fetch), `handleRawAJAXError(xhr)` (XHR; reload cases only; returns true if handled), `handleAJAXFailure(errMsg)` (network failure).
- Used by: `webserviceCallStandardPost.ts`; structure-file DAOs; upload senders (`projectPage_UploadData_SendUploadFileToServer.ts` and siblings); `lorikeetSpectrumViewer_LoadDataFromServer.ts`.
- How to use / extend: a new server error code needs a constant pair (status + JSON `message`) here matching `W/constants/WebServiceErrorMessageConstants.java`.
- Do not use when: you want your own error UI (`doNotHandleErrorResponse`).
- Limits and gotchas: expects a JSON body with `message` (except `handleRawAJAXError`, raw body compare). Suppresses everything after `beforeunload`. Error box jQuery-built, text via `.text()` (XSS-safe). Reload via `limelight__ReloadPage_Function`. A near-identical second red box exists for JS errors (`errorDisplay_WhenHave_Javascript_Typescript_Error`).
- Related / duplicates: browser error reporting; `showHideErrorMessage` (legacy, [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)).
- Status: verified

### Browser error reporting to server + global onerror hook (front end)
- What it solves: sends JS exceptions (message, stack, user agent, page URL, webservice URL) to the server log and shows a one-time "Error in Page Code" box; global hook catches uncaught errors.
- Search keywords: error logging, report error, exception, onerror, client error log, stack trace, telemetry, try catch pattern
- Location: `FE/common_all_pages/reportWebErrorToServer.ts` (`reportWebErrorToServer.reportErrorObjectToServer({ errorException, webserviceURL, skipDisplayErrorOverlay_SkipCall__errorDisplay_WhenHave_Javascript_Typescript_Error })`); `limelight__catchAndReportGlobalOnError.ts` (`init()`); `errorDisplay_WhenHave_Javascript_Typescript_Error.ts`.
- Used by: `reportErrorObjectToServer` in about 668-684 files (the `try { } catch (e) { report; throw e }` pattern); `init()` in 27 page roots.
- How to use / extend: call `init()` first in every new page root; wrap handler/promise bodies with the try/catch pattern; pass the skip-display flag when you show your own UI.
- Do not use when: the error was already handled (sentinel).
- Limits and gotchas: skips the sentinel, Chrome-extension stacks, `pagehide`, URL-state parse failures and address-bar-replace exceptions. Listens to `error` only, not `unhandledrejection`. An inline JSP `window.onerror` runs before this hook (intentional, two handlers).
- Related / duplicates: server logging endpoint entry.
- Status: verified (re-checked)

### Webservice sync tracking (detect out-of-date page, force reload after redeploy)
- What it solves: detects a page loaded from an older webapp deployment and makes the front end reload, so stale JS never talks to new webservices.
- Search keywords: sync tracking, stale page, out of date page, reload on deploy, redeploy, version mismatch, stale javascript, cache bust, version check
- Location: server `W/webservice_sync_tracking/Validate_WebserviceSyncTracking_Code(IF)` (value set at startup in `W/servlet_context_listener/WebappServletContextListener.java` from `GetJsCssCacheBustString`; mismatch → `Limelight_WS_BadRequest_WebserviceSyncTrackingCodeMismatch_Exception`, 400 reason `webservice_sync_tracking_code_mismatch_text`); JSP `head_section_include_every_page.jsp` writes DOM element `webservice_sync_tracking_code` (same value appended as `?x=` to every bundle/CSS URL); front end `FE/common_all_pages/EveryPageCommon.ts` (`getWebserviceSyncTrackingCode()`, `LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM`, `_AJAX_POST_JSON_CONTENT_TYPE`); `webserviceCallStandardPost.ts` sends header `limelight_webservice_sync_tracking_code`; `handleServicesAJAXErrors.ts` reloads on mismatch.
- Used by: about 200 REST controllers call the validator first; front-end standard POST, upload senders and structure-file DAOs send the header.
- How to use / extend: every new browser REST controller calls `validate_webserviceSyncTracking_Code(httpServletRequest)` before anything else; front-end calls through the standard POST get it automatically; any hand-rolled request to a validating `d/rws` endpoint must send the header itself. New `static/` JS/CSS URLs append `?x=${ cacheBustValue }`.
- Do not use when: non-browser callers.
- Limits and gotchas: the code changes on every webapp restart, so every restart invalidates open pages. `getWebserviceSyncTrackingCode()` throws if the DOM element is missing. `_AJAX_POST_JSON_CONTENT_TYPE` is exported despite the leading `_`.
- Related / duplicates: page reload chokepoint; session keep-alive.
- Status: verified (re-checked)

### Page reload chokepoint (`limelight__ReloadPage_Function`)
- What it solves: single place that reloads the page (`reload(true)` with fallback).
- Search keywords: reload page, refresh, location.reload, out of date page
- Location: `FE/common_all_pages/limelight__ReloadPage_Function.ts`.
- Used by: about 42 files, e.g. `handleServicesAJAXErrors.ts` and many data-page save/update flows.
- How to use / extend: call it instead of `window.location.reload()` (no other direct call exists in `src/`).
- Do not use when: n/a.
- Limits and gotchas: `limelight_webapp/front_end/CLAUDE.md` says this function first calls `limelight__BeforeUnload_RemoveAllBlockingGuards()` from `limelight__BeforeUnload_BlockingGuard_Registry.ts`; that code is not yet committed in this repo (it lands with pending work), so the doc is ahead of the code for now. There are 3 passive `beforeunload` flag listeners plus one raw blocking listener in `projPg_Expermnts_Single_Maint_OverlayContainer.tsx`.
- Related / duplicates: sync tracking.
- Status: verified (code; the doc is ahead of the code) (re-checked)

### Session keep-alive call (+ stale-page check)
- Location: front end `FE/common_all_pages/keep_UserSession_AliveIfExists_OnServer_WebserviceCall.ts` (`keep_UserSession_AliveIfExists_OnServer_WebserviceCall()`).

### Replace browser URL and validate (`limelight__ReplaceBrowserAddressBarURL_ValidateUpdated_Function`)
- What it solves: `history.replaceState` to a new URL and verify the address bar changed (throws a typed exception the error reporter ignores).
- Search keywords: history replaceState, update URL, address bar, page state in URL, base href
- Location: `FE/common_all_pages/limelight__ReplaceBrowserAddressBarURL_ValidateUpdated_Function.ts` (`({ newURL })`).
- Used by: `page_Update_From_search_data_lookup_parameters_lookup_code__computed.ts`, `searchDetailsAndFilterBlock_Re_Order_Searches.ts`, `lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded.ts`, `featureDetection_ViewPage__MainPage_Component.tsx`.
- How to use / extend: needs DOM element `limelight_base_href_value` (else replaces with a console warning).
- Do not use when: you need a new history entry (pushState).
- Limits and gotchas: comparison depends on the base-href string prefix.
- Related / duplicates: central page state manager ([front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)).
- Status: verified

### DOM data handoff: server values in `<script type="text/text" id="...">`
- What it solves: pass server values (context path, ids, JSON, controller paths, feature flags, sync code, lookup params) to TypeScript at page load without inline JS (CSP-safe).
- Search keywords: pass data to JavaScript, page load data, DOM data, script text/text, read value from page, feature flag to front end, controller path, base href, server-rendered JSON, FromDOM
- Location: JSP `head_section_include_every_page.jsp` (`limelight_base_href_value`, `webservice_sync_tracking_code`, ...), `head_section_include_main_pages.jsp` (`main_page_current_project_id`, prefixes ...), `head_section_include_data_pages.jsp` (`search_data_lookup_parameters_at_page_load_json` / `_code`, `page_auth_access_level_project_owner_allowed`, `single_search_has_sub_groups`, `blib_spectral_library_webservice_is_fully_configured`, `page_user_default_url`, ...), per-page `controller_path`. Request attribute names in `W/constants/WebConstants.java`. Readers: `FE/common_all_pages/EveryPageCommon.ts`, `DP/data_pages_common/controllerPath_forCurrentPage_FromDOM.ts`, `controllerPath_Prefixes_FromDOM.ts`, `currentProjectId_ProjectSearchId_Based_DataPages_FromDOM.ts`, `getSearchDataLookupParametersFromPage.ts`, `page_UserDefault_processing.ts`.
- Used by: `ControllerPath_forCurrentPage_FromDOM` 19 files; `currentProjectId_...` 8; readers above.
- How to use / extend: set a request attribute (constant in `WebConstants`), emit `<script type="text/text" id="x"><c:out value="${ x }"/></script>`, add a cached getter in a small `..._FromDOM.ts`. Booleans: element present = true.
- Do not use when: large or per-action data (webservice). Search names are NOT passed this way (use `searchNameRetrieval.ts`).
- Limits and gotchas: some data-page blocks wrap the value in literal `<html><body>...</body><html>` (malformed close) and readers depend on it — copy an existing reader. Readers throw if the element is missing; project id comes back as a string. The read-JSON-from-`<script type="text/text">` function is copy-pasted in ≥11 experiment-page files (no shared helper).
- Related / duplicates: CSP ([security_access_control_sessions.md](security_access_control_sessions.md)).
- Status: verified

### Admin webservice-call wrapper (front end)
- What it solves: typed promise wrapper per admin endpoint around `webserviceCallStandardPost`.
- Search keywords: admin page, webservice wrapper, typed response, importer pause, cached data clear, config
- Location: `FE/webapp_admin_pages/webapp_manage_Importer_PipelineExecution_page/manage__importer_pipeline_execution__for_admin_page__webservice_call__*.ts`.
- Used by: `manage_ImporterPipelineExecution_ForAdminPage_Root_Component.tsx`.
- How to use / extend: one file per endpoint; ADD runtime field validation (these pass the response through as `any`).
- Do not use when: data pages (use the common data loaders with `{ data, promise }`).
- Limits and gotchas: no runtime validation, contrary to the root CLAUDE.md off-the-wire rule. Other admin pages use the older `promise.catch(() => { throw Error(...) })` style.
- Related / duplicates: standard POST.
- Status: verified (one file read, others grepped)

## Front end: data loading ("common data loaded from server")

### Core data loaders at page load (`LoadCoreData_ProjectSearchIds_Based`, `searchNameRetrieval`, `DataPageStateManager`)
- What it solves: at page load fetch in parallel and store in `DataPageStateManager`: search flags (`search-flags-list-from-psi`), search names + real searchId + sub-groups (`retrieveSearchNamesFromServer` → `search-name-list-from-psi`), search tags, annotation types (`search-annotation-type-list-from-psi`), search programs (`search-programs-per-search-list-from-psi`); on demand: search info (`search-info-list-from-psi`) and project-wide default cutoff overrides (`project-level-filter-default-cutoffs-override-maint--get`).
- Search keywords: load core data, search names, search name list, real search id, searchNames_AsMap, annotation type list, search programs, search flags, hasScanData, default cutoffs override, page data, state manager
- Location: `DP/data_pages_common/loadCoreData_ProjectSearchIds_Based.ts`, `searchNameRetrieval.ts` (`retrieveSearchNamesFromServer`), `annotationTypeDataRetrieval.ts`, `searchProgramsPerSearchDataRetrieval.ts`, `search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags.ts` and `..._Get_dataPage_common__Searches_Info.ts`, `defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval.ts`, `annotationTypeData_ReturnSpecifiedTypes.ts`; holder `DP/data_pages_common/dataPageStateManager.ts` (`DataPageStateManager` get_/set_ pairs; pages create two instances).
- Used by: `LoadCoreData_...` in page roots (peptide, QC, feature detection, scan-file-to-searches...); `dataPage_common_Get_Searches_Flags` 17 files; `retrieveSearchNamesFromServer` in search details block and tag overlays; `AnnotationTypeDataRetrieval` also in project-page experiments, `set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer.ts`, `lorikeetSpectrumViewer_LoadDataFromServer.ts`; `DataPageStateManager` created in 13 page roots, type imported widely.
- How to use / extend: on main data pages read name + real `searchId` from the already-loaded `searchNames_AsMap` (name already fallback-applied server side); add a get/set pair to `DataPageStateManager` for new core data.
- Do not use when: per-search PSM/peptide data (loader tree); project-level pages (searches/tags/folders loader).
- Limits and gotchas: each loader hand-rolls `new Promise` + standard POST + error report; several type responses loosely (`any`). `search-name-list-from-psi` is also called directly (bypassing `retrieveSearchNamesFromServer`) from `search_sub_group__manage__group_names__open_overlay__pass__project_search_id.ts` and `lorikeetSpectrumViewer_LoadDataFromServer.ts`. `DataPageStateManager` is not a `{ data, promise }` loader (set once).
- Related / duplicates: multi-search metadata webservices (server).
- Status: verified (response parsing skimmed) (re-checked)

### Front-end data loader directories (`DP/common_data_loaded_from_server__*`): check here first
- What it solves: the front end's (partial) central place for loading server data. Before adding a `webserviceCallStandardPost` call on a data page or the project page, check whether one of these directories already loads the data, or is the right home for a new loader.
- Search keywords: common data loaded from server, data loader directories, where to put a webservice call, centralize webservice calls, front-end data cache, loader ROOT, common_data_loaded_from_server
- Location: six directories under `DP/`:
  - `common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/`: cached ROOT tree for data driven by the searches AND the current filters: reported peptides, PSMs, peptide and protein data (protein lists, coverage, sequences), modifications, annotation values; delegates scan and feature-detection data to the two ROOTs below. [Per-search data loader tree](#per-search-data-loader-tree-commondata_loadedfromserver_persearch_plus_someassoccommondata__except_modmainpage__root)
  - `common_data_loaded_from_server__scan_data__from_project_scan_file_id/`: cached ROOT keyed by projectScanFileId. [Scan-data loaders](#scan-data-loaders-projectscanfileid-root--single-search-delegating-loaders)
  - `common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/`: cached ROOT. [Feature-detection loaders](#feature-detection-loaders-root-keyed-by-feature-detection-to-project-scan-file-mapping-id)
  - `common_data_loaded_from_server__project_level_data/` (`..._structure_file_data/`): structure-file data within one project. [Structure-file data within one project](#structure-file-data-within-one-project-front-end-dao-root)
  - `common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/`: plain function loader (not a cached tree): searches, search tags, tag categories, folders. [Project searches, search tags, tag categories, folders](#project-searches-search-tags-tag-categories-folders-getsearchessearchtagsandfolders_singleproject_orfrom_projectsearchids)
  - `common_data_loaded_from_server__project_page_do_sections_have_any_data/`: plain function loader: which project-page sections have data. [Project page "which sections have data" loader](#project-page-which-sections-have-data-loader)
- How to use / extend: use an existing loader when it already returns what you need (reach the page's existing ROOT instance; don't create a second one). To add data of the same kind, add a leaf to the matching tree and copy the reference leaf named in [Lazy load-once leaf loader pattern](#lazy-load-once-leaf-loader-pattern--data-promise---_returnpromise--in-flight-dedupe), not just any nearby loader: loaders in these directories were written over many years and the older ones follow earlier patterns.
- Do not use when: caching data the user can change while the page is open. The cached trees are intended for data that does not change, or rarely changes, while a page is open (this is the intent, not a guarantee; check before adding user-editable data to a cached tree).
- Limits and gotchas: partial centralization: many webservice calls elsewhere in the front end are not under these directories. Directory names don't match scope exactly (e.g. `except_mod_main_page`; see the tree entry).
- Related / duplicates: [Standard webservice POST call](#standard-webservice-post-call-webservicecallstandardpost) (the leaves use it internally).
- Status: verified (directory list and loader kinds checked 2026-11-10)

### Per-search data loader tree (`CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root`)
- What it solves: one object per filter state that lazily loads, caches and hands out everything a data page reads per search (reported peptides, PSMs, proteins, mods, annotations, scan data, feature detection), keyed on the current cutoffs. First ask fires the webservice; later asks reuse the cached holder.
- Search keywords: data loader, common data, loaded from server, per search cache, lazy load, pull model, client cache, data holder, projectSearchId data, page data root, commonData
- Location: `CDL/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.ts`; entry `getNewInstance({ projectSearchIds, searchDataLookupParameters_Root, dataPageStateManager, commonData_LoadedFromServer_From_ProjectScanFileId___ROOT, commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT })`. Getters: `get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(id)` (filtered), `get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(id)` (unfiltered), `get__commonData_LoadedFromServer__Multiple_ProjectSearchIds()`, `get__commonData_LoadedFromServer__CommonAcrossSearches()`, and the scan-data / feature-detection ROOT getters. Level holders `..._SingleProjectSearch.ts`, `..._SingleProjectSearch__NO_PSM_Peptide_Protein_Filtering.ts`, `..._MultipleProjectSearches.ts`, `..._CommonAcrossSearches.ts`.
- Used by: 8 creators (`peptidePage_Display_MainContent_Component.tsx`, `proteinViewPage_DisplayData_ProteinList__Main_Component.tsx`, `qcViewPage_DisplayData__Main_Component.tsx`, `modViewPage_Display_MainContent_Component.tsx`, two experiment pages, scan-file-to-searches and feature-detection pages); about 94 files take the Root type.
- How to use / extend: build a NEW Root whenever the cutoffs (`searchDataLookupParameters_Root`) or projectSearchIds change — no in-place invalidation (every class notes "if these values change, create a new instance"). To add a per-search dataset: add a leaf (next entry), a private field + `getNewInstance` + getter in the matching level holder; leaves reach siblings via `get_ParentObject()`. Uses explicit instance-field caches.
- Do not use when: project-level data; one-off uncached loads (plain function loader).
- Limits and gotchas: despite `Except_ModMainPage` in names, the Mod page uses it heavily (43 getter calls) — names are stale. Scan-data and feature-detection ROOTs can be passed in to survive a Root rebuild, but peptide and QC pages create fresh ones. Nothing evicts; memory lives until the Root is dropped. Constructor throws if a projectSearchId lacks params or flags/info in `DataPageStateManager`. Full per-leaf endpoint catalog: `limelight_features_docs/front_end_data_loading__common_data_loaded_from_server_per_search.md` (lead; endpoint version suffixes drift).
- Related / duplicates: scan-data ROOT; feature-detection ROOT.
- Status: verified (re-checked)

### Lazy load-once leaf loader pattern (`{ data, promise }` + `_ReturnPromise` + in-flight dedupe)
- What it solves: the house template for a cached front-end webservice loader: synchronous fast path when loaded, one shared in-flight promise while loading, strict runtime validation of the response.
- Search keywords: data promise pattern, `{ data, promise }`, ReturnPromise, in flight, dedupe concurrent requests, promise cache, load once, getNewInstance, holder class, synchronous fast path, delta encoded arrays, off-the-wire validation
- Location: reference `CDL/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters.ts`. Shape: private constructor + `static getNewInstance({...})`; `get_<X>()` returns `{ data, promise }` (exactly one set); `get_<X>_ReturnPromise()` convenience; private `_load_...()` stores `_promise_..._InProgress`, cleared on settle; `_process_WebserviceResponse({ responseData })` validates each field (`limelight__variable_is_type_number_Check`, `limelight__IsVariableAString`, null checks, array-length equality) then builds `_Holder` objects; call via `webserviceCallStandardPost`; errors via `reportWebErrorToServer.reportErrorObjectToServer`.
- Used by: about 45 loader classes; callers in filtering, data tables, QC plots (e.g. `purge_FilterSelections_NotIn_CurrentData.ts`).
- How to use / extend: copy the reference, rename, change endpoint + processing. Callers use `get_<X>()` and await only when `promise` is set (synchronous fast path; keep the two continuation call sites). Holders build secondary maps lazily and keep them on instance fields. Declare the off-the-wire response type fields REQUIRED and validate at runtime.
- Do not use when: data must change in place (instances are immutable).
- Limits and gotchas: several loaders assert a second in-flight call carries the SAME `reportedPeptideIds` reference (throw otherwise). An outer "also loading reported peptide ids" promise field in the PSM_TblData loader is never cleared (harmless). Large payloads are delta-encoded (`*_OffsetFromPrevValue_Array`). The number check accepts NaN. Not every front-end loader follows this: search-tag loaders, PSM list, Lorikeet page, peptide-list builders, charge-state QC and some sub-table generators always return a Promise with no fast path.
- Related / duplicates: lazy third-party script loader `DP/data_pages_common/googleRecaptchaLoaderForThisWebapp.ts` (same idea, `{isLoaded, value, loadingPromise}` shape).
- Status: verified (re-checked)

### Filtered single-search loaders keyed on the reported-peptide base (`..._For_MainFilters` family)
- What it solves: all per-search data that respects the user's cutoffs: reported peptide ids, peptide ids, PSM ids, PSM rows, open/variable mods, reporter ions, sub-group PSM counts, protein coverage/info, static mods, scan-file mapping, gold-standard and feature-detection root entries.
- Search keywords: reported peptide ids for cutoffs, main filters, filtered PSMs, PSM ids per reported peptide, protein coverage, open modification on PSM, variable dynamic modifications, reporter ion masses, sub group PSM count, static mods, gold standard, feature detection root entries
- Location: `CDL/common_data_loaded_from_server_single_search_sub_parts__returned_objects/` — one file per loader (class = file basename with `commonData_`→`CommonData_`). Base `commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters.ts` (`get_reportedPeptideIds()`, subset accessors like `..._AnyPsmHas_OpenModifications()`). Get each via `get_commonData_LoadedFromServer_SingleSearch__<Name>()` on the single-search holder. Endpoints `d/rws/for-page/psb/...`.
- Used by: base getter in about 42 files (e.g. `peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__..._INTERSECTION_Together.ts`); `StaticModifications` in about 18; `Num_PSMs_By_SearchSubGroup` in 6.
- How to use / extend: get the base first for the filtered reportedPeptideId set; most leaves call it internally and skip the webservice when the relevant subset is empty.
- Do not use when: you need ALL PSMs ignoring cutoffs (unfiltered loaders; rarely correct).
- Limits and gotchas: filtering is server-side via `searchDataLookupParams_For_Single_ProjectSearchId` in each request; a cutoff change needs a new Root. Getter names diverge (e.g. `get_commonData_LoadedFromServer_SingleSearch__MS_1_ScanNumbers_...` drops `ScanData__`) — grep the holder.
- Related / duplicates: unfiltered loaders; derived loaders.
- Status: verified (base + PSM_TblData read; the rest via grep) (re-checked)

### Filtered PSM table data loader (`CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters`)
- What it solves: per-PSM facts (psmId, reportedPeptideId, charge, scanNumber, searchScanFileId, retention time, precursor m/z, has-mods/open-mods/reporter-ions flags, independent-decoy flag) for PSMs passing the current filters.
- Search keywords: PSM table data, psm charge, scan number for PSM, retention time PSM, precursor m/z, psmId lookup, filtered PSM rows
- Location: `CDL/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters.ts`; `get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()` → holder with `get_PsmTblData_For_PsmId`, `get_PsmTblData_For_ReportedPeptideId`, `get_PsmTblData_Array_For_ScanNumber`, `get_ScanNumber_SearchScanFileId_Pair_Unique_Count`. Endpoint `d/rws/for-page/psb/psm-table-data-per-reported-peptide-id-for-searchcriteria-single-project-search-id-version-0003`.
- Used by: about 58 files, e.g. `purge_FilterSelections_NotIn_CurrentData.ts`, `psm_Charge_Filter_UserSelection_Container_Component.tsx`, mod page (7 call sites).
- How to use / extend: the standard per-PSM source on data pages (per-PSM fields that respect the user's cutoffs); look up by `get_PsmTblData_For_PsmId(psmId)`.
- Do not use when: you truly need every PSM regardless of cutoffs (unfiltered loader).
- Limits and gotchas: `searchScanFileId`, RT and m/z may be null; `get_PsmTblData_Array_For_ScanNumber` returns undefined if any PSM lacks a scan number. Scan numbers are unique only per searchScanFileId.
- Related / duplicates: unfiltered `..._NO_PSM_Peptide_Protein_Filtering__PSM_TblData` (same fields).
- Status: verified (re-checked)

### Unfiltered single-search loaders (`..._NO_PSM_Peptide_Protein_Filtering`) — prefer the filtered `For_MainFilters` loaders
- What it solves: all PSMs of a search ignoring cutoffs: PSM table data, PSM filterable annotation values (score distributions), psmId → searchSubGroupId; include/exclude-decoy views from one fetch.
- Search keywords: unfiltered PSMs, all PSMs, no filtering, decoy PSMs, PSM score distribution, filterable annotation data all PSMs, sub group id for PSM, NOT_Filtered
- Location: `CDL/common_data_loaded_from_server_single_search_NO_PSM_Peptide_Protein_Filtering__sub_parts__returned_objects/`: `..._NO_PSM_Peptide_Protein_Filtering__PSM_TblData.ts` (`get_PSM_TblData_Unfiltered__Include_DecoyPSMs__Holder()` / `__Exclude_DecoyPSMs__Holder()`), `..._NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData.ts` (per annotationTypeId incremental), `..._SearchSubGroupId_ForPSM_ID_NOT_Filtered.ts` (base-36 delta-encoded). Holder via Root `get__..._NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(id)`.
- Used by: unfiltered PSM_TblData — 20 QC score/decoy plot files only (e.g. `qcViewPage_SingleSearch__PSM_AnnotationScore_Distribution_StatisticsPlot.tsx`); filterable annotation data — 21 QC plots + `scanFileToSearchesPage_Display_MainContent_Component.tsx` + `proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Create_TableData.tsx`; sub-group mapping — 26 files.
- How to use / extend: prefer the filtered `For_MainFilters` PSM_TblData loader; legitimate uses of the unfiltered one are score-vs-cutoff / target-decoy plots that must see PSMs outside the cutoff (7 sub-search plots' decoy need is assumed, unconfirmed per plot). The sub-group mapping is "unfiltered" only in covering all PSMs; callers intersect with filtered psmIds.
- Do not use when: the value must reflect the user's filters (nearly always). Ask the maintainer before adding a new use.
- Limits and gotchas: loads the whole search (memory). Two `ZZ_UNUSED_Untested_*` files nearby are dead.
- Related / duplicates: filtered PSM_TblData.
- Status: verified (structure, endpoints, users; internals skimmed)

### Two-dimension incremental annotation-value cache (Protein / ReportedPeptide × Filterable / Descriptive)
- What it solves: fetch annotation values for (ids × annotationTypeIds) incrementally — only missing combinations requested, in-flight requests reused, results merged into one growing holder.
- Search keywords: annotation values, descriptive annotation, filterable annotation, protein annotation, reported peptide annotation, incremental cache, partial cache, merge results
- Location: `CDL/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__{Protein,ReportedPeptide}_{Filterable,Descriptive}_AnnotationValues.ts`; `get_<X>_AnnotationValues({ ids: Set, annotationTypeIds: Set })` / `_ReturnPromise`.
- Used by: `reportedPeptidesForSingleSearch_create_createReportedPeptideDisplayData.ts`; `proteinViewPage_DisplayData_ProteinList__Main_Component.tsx`, `proteinPage_Display__SingleProtein_MainContent_Component.tsx`.
- How to use / extend: template for any "grow-as-needed over two key dimensions" cache; keeps rectangular completeness (a new annotationTypeId re-requests all known ids for the union of types).
- Do not use when: a one-shot load-all is cheap enough.
- Limits and gotchas: not filter-dependent. The four files are copy-paste siblings with the same suspicious guard: the "check loading" loop is guarded by the loaded-set size instead of the loading-in-progress set, so a request for new ids may re-request everything (over-fetch, probably not wrong data; seen in code, not runtime-tested; check by logging the request payload).
- Related / duplicates: server annotation-data controllers.
- Status: verified (logic read in one file; guard grep-confirmed in all four)

### Derived (no webservice) loaders
- What it solves: values computed purely from other loaded holders but exposed with the same `{ data, promise }` API.
- Search keywords: derived data, computed loader, protein sequence coverage, static mods on protein, mods at protein position, no AJAX
- Location: `CDL/common_data_loaded_from_server_single_search_sub_parts__returned_objects/`: `..._ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters.ts`, `..._StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId.ts`, `..._Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters.ts`.
- Used by: `ProteinSequenceCoverageData` getter in the protein structure widget, sequence bar widget, protein list, `peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.ts`.
- How to use / extend: model a new derived value as a leaf so its lifetime matches the Root (explicit instance cache).
- Do not use when: n/a.
- Limits and gotchas: wait on several upstream loaders (Promise.all) when not loaded.
- Related / duplicates: none.
- Status: verified (internals skimmed)

### Common-across-searches sequence loaders (peptide / protein / reported-peptide strings, I→L)
- What it solves: sequence strings shared by all searches, cached once per Root, plus lazily built I→L-normalized strings.
- Search keywords: peptide sequence, protein sequence, reported peptide string, I to L, isoleucine leucine, sequence lookup
- Location: `CDL/common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__{PeptideSequences_For_MainFilters,ProteinSequences,ReportedPeptideSequences}.ts`; holder getters `get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters()` (misnamed `SingleSearch`), `get_commonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences()`, `..._ReportedPeptideSequences()`; methods like `get_PeptideSequence_I_To_L__For_PeptideId`.
- Used by: PeptideSequences in 26 files; ProteinSequences in `proteinPage_Display__SingleProtein_Root.ts`, `proteinExperimentPage_Display_SingleProtein.ts`; ReportedPeptideSequences in `reportedPeptidesForSingleSearch_create_createReportedPeptideDisplayData.ts`, `psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component.tsx`.
- How to use / extend: reuse for any I/L-insensitive matching.
- Do not use when: n/a.
- Limits and gotchas: protein sequences fetched per proteinSequenceVersionId (`Map<number, Promise>` dedupe).
- Related / duplicates: none.
- Status: verified (internals skimmed)

### Multi-search loaders: scan files per search, FASTA statistics
- What it solves: one request for all page projectSearchIds: searchScanFileId → filename / scanFileId per search (ordered by filename); FASTA statistics per search.
- Search keywords: scan file list, search scan file id, scan filename, fasta statistics, decoy count, multiple searches
- Location: `CDL/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId.ts` (`get_ScanFileDataHolder()`), `..._MultipleSearches__FastaFileStatistics.ts` (`get_FastaFileStatisticsHolder()`), via `get__commonData_LoadedFromServer__Multiple_ProjectSearchIds()`.
- Used by: scan-file loader in 32 files; FASTA stats in 18 (estimated-error QC plots).
- How to use / extend: prefer this for scan filenames on data pages.
- Do not use when: you need projectScanFileId (single-search `ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch`).
- Limits and gotchas: not filter-dependent. Scan file info exists in 3 places (this, the single-search mapping, the scan ROOT's `ProjectScanFilenames`).
- Related / duplicates: scan-data loaders.
- Status: verified

### Scan-data loaders: projectScanFileId ROOT + single-search delegating loaders
- What it solves: spectral-storage-backed scan data per project scan file (no-peaks metadata + optional parents, peaks with optional m/z filter, MS1 scan numbers in an RT range, MS1 intensity binned on RT×m/z, scan-file summary, filenames / projectSearchIds / scan-file code), plus search-page access by `searchScanFileId` that resolves the projectScanFileId and delegates so one shared cache is used.
- Search keywords: scan data, spectra, peaks, MS1, retention time range, scan numbers, spectral storage, spectr, projectScanFileId, searchScanFileId to projectScanFileId, scan file summary, binned intensity, scan file code, max scans with peaks, batch size
- Location: ROOT `DP/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId___ROOT.ts` (`getNewInstance()`; getters such as `get_commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data()`, `..._Optional_M_Z__ScanData_YES_Peaks_Data()`, `..._RetentionTimeRange__MS_1_ScanNumbers()`, `..._ScanData_MS1_PeakIntensityBinnedOn_RT_MZ()`; endpoints mostly `d/rws/for-page/psfb/...`). Delegating leaves in `CDL/common_data_loaded_from_server_single_search_sub_parts__returned_objects/`: `..._ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch.ts` (mapping), `..._ScanData_For_Single_SearchScanFileId_AndOtherParams_{NO,YES}_Peaks_Data.ts`, `..._ScanData_WholeSearch_NO_Peaks_Data.ts`, `..._ScanData__MS_1_ScanNumbers_...`, `..._ScanData__MS1_PeakIntensityBinnedOn_RT_MZ_...`, `..._ScanData_Summary_Data_...`. Max-count loaders: `..._SingleSearch_From_ProjectSearchId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectSearchId.ts` (module-level cache) and `.../scan_data__from_project_scan_file_id/..._Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectScanFileId.ts` (no cache).
- Used by: ROOT in the per-search Root (fallback), `featureDetection_ViewPage__MainPage_Component.tsx`, `common_Search_Selection_For_ProjectScanFileId_OverlayLayout.tsx`, peptide/mod/QC pages; YES-peaks in `scanFileBrowserViewPage__MainPage_Component.tsx`, `featureDetection_ViewPage__Chromatogram_Component.tsx`; mapping getter in 20 files; `ScanData_` getters in 23; max-count: `psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component.tsx`, `featureDetection_ViewPage__Chromatogram_Component.tsx`.
- How to use / extend: on search pages always go through the delegating loaders. Scan loaders cache per scan number and fetch only numbers not loaded or in flight. YES-peaks: `yes_CacheResults_InJS: false` for an uncached one-off; with m/z ranges it keeps ONE cache for the last distinct range set. Call the max-count loader before requesting peaks for many scans and split by it.
- Do not use when: you already have a projectScanFileId (use the ROOT directly).
- Limits and gotchas: peaks data is large; caches never evict within the ROOT. Scan numbers filtered out by m/z are still tracked as sent. The projectSearchId max-count value is cached module-globally for the page lifetime (the only module-global cache here). `ProjectScanFilenames`, `ProjectSearchIds`, `ScanFileCode_FirstSix` are three near-identical loaders. Mapping is by id (no filename matching).
- Related / duplicates: spectr proxy webservices.
- Status: verified (ROOT, YES-peaks cache, one delegating file read; others skimmed)

### Feature-detection loaders (ROOT keyed by feature-detection-to-project-scan-file mapping id)
- What it solves: cached feature-detection data: persistent features, singular features (all or by id), persistent→singular mapping, display name/description, projectScanFileId.
- Search keywords: feature detection, persistent feature, singular feature, Hardklor, Bullseye, MS1 features, mapping id, batched id ranges, server-dictated batching
- Location: `DP/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/`, entry `...___ROOT.getNewInstance()`; endpoints `d/rws/for-page/fdb/...` (server: cached struct-of-arrays feature-detection controllers).
- Used by: per-search Root, `featureDetection_ViewPage__MainPage_Component.tsx`, mod/QC/peptide pages; singular entries in `featureDetection_ViewPage__SingularFeature_GetData_ForDataTable.ts` and QC plots; persistent entries in `qc_SingleSearch_FeatureDetection_Statistics_Section.tsx`, `qc_MultipleSearches_FeatureDetection_Statistics_Section.tsx`.
- How to use / extend: the singular-feature loader is the reference for SERVER-DICTATED BATCHING: ask the server for min/max id and `max_StartEnd_Id_DifferenceInclusive_Allowed`, then issue id-range (or id-list) batches and merge.
- Do not use when: n/a.
- Limits and gotchas: in the min/max path a `catch(() => { reject() })` drops the rejection reason. Getter `get_commonData_LoadedFromServer__FeatureDetection_ProjectScanFileId_...` (double underscore) returns a class with a single underscore.
- Related / duplicates: single-search `FeatureDetection_Root_Entries` loader.
- Status: verified (other internals skimmed)

### Uncached function loader (PSM peptide-position annotations)
- What it solves: per-PSM, per-peptide-position annotation values for given psmIds × annotationTypeIds; returns lookup maps; deliberately uncached.
- Search keywords: PSM peptide position annotation, per residue score, localization score, position annotation, uncached loader
- Location: `CDL/common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_Etc__sub_parts__returned_objects/common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records.ts` (function of `{ projectSearchId, annotationTypeIds, psmIds }`).
- Used by: `psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects.ts`, `psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent.tsx`.
- How to use / extend: template for a small per-click load with no Root wiring.
- Do not use when: repeated calls with the same inputs are expected.
- Limits and gotchas: called without `dataRetrieval_CanRetry` (irrelevant: retry is not implemented).
- Related / duplicates: none.
- Status: verified

### Project searches, search tags, tag categories, folders (`getSearchesSearchTagsAndFolders_SingleProject_OrFrom_ProjectSearchIds`)
- What it solves: one call returning a project's searches (projectSearchId, real searchId, name, short name, flags), folders in display order, tags and tag categories (with colors), and tag↔search mapping, as an immutable result with lookup maps.
- Search keywords: project search list, searches in project, search tags, tag categories, folders, search display order, project page searches, search name and search id
- Location: `DP/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders.ts`; `getSearchesSearchTagsAndFolders_SingleProject_OrFrom_ProjectSearchIds({ projectIdentifier, projectSearchIds? })` → `CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root` (`get_SearchData_For_ProjectSearchId`, `get_SearchData_ALL_StandardDisplay_Sorted_SearchId_Descending`, `get_allFolders_Data_InDisplayOrder`, `get_SearchTags_InProject_InDisplayOrder`, `get_all_SearchTagCategories_InProject_In_DisplayOrder`, ...). Endpoint `d/rws/for-page/project-view-page-or-project-search-ids-search-list`.
- Used by: `projectPage_ROOT_Container_Containing_MultipleSections_Component.tsx`, `searchSelection_DisplayedNestedInFolders_Component.tsx`, `common_Search_Selection_For_ProjectScanFileId_OverlayLayout.tsx`, `projPg_Expermnts_Load_SearchesData_ForProject.ts`, `project_OrganizeSearches_Main_Component.tsx`, `set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer.ts`.
- How to use / extend: the reference source for search lists on project-level pages; optional `projectSearchIds` restricts the set (optional by design).
- Do not use when: main data pages (use `searchNameRetrieval.ts` data).
- Limits and gotchas: not cached (each call is a request). Runtime-validated field by field. Tags are also loaded by four thin wrappers in `DP/search_tags__display_management/...` (`searchTags__Get_For_ProjectSearchIds`, `searchTags__Get_For_ProjectId`, ...) that return raw Promises, are not runtime-validated and use snake_case fields — a second tag source.
- Related / duplicates: tag wrappers ([front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)).
- Status: verified (re-checked)

### Project page "which sections have data" loader
- What it solves: one cheap call telling the project page whether searches, scan files, non-draft experiments, saved views and feature-detection mappings exist.
- Search keywords: project page sections, has data, show hide section, empty project
- Location: `DP/common_data_loaded_from_server__project_page_do_sections_have_any_data/commonData_LoadedFromServerFor_Project_DoSections_HaveAnyData.ts` (`get_CommonData_LoadedFromServerFor_Project_DoSections_HaveAnyData_Result`); endpoint `d/rws/for-page/project-view-page-has-data-for-each-section-of-project-page`.
- Used by: `projectPage_ROOT_Container_Containing_MultipleSections_Component.tsx` only (the server probes are also used by `projPg_ExpermntsSectionRoot.tsx`, `projectPage_UploadData_UploadFiles_Overlay.tsx` via related endpoints).
- How to use / extend: add a server flag (new LIMIT-1 searcher) and a result field for a new section.
- Do not use when: you need counts or lists.
- Limits and gotchas: response passed through with NO runtime validation; file header comment copy-pasted from the searches/tags/folders file.
- Related / duplicates: none.
- Status: verified

### Structure-file data within one project (front-end "DAO" ROOT)
- What it solves: front-end access to project-scoped structure files: list/has-any, upload, delete, chain↔protein alignment get/save/delete, cached contents, "can user create/edit/delete".
- Search keywords: structure file, PDB, mmCIF, Mol*, chain alignment, upload file, delete structure, project-level data, front end DAO
- Location: `DP/common_data_loaded_from_server__project_level_data/common_data_loaded_from_server__project_level_data__structure_file_data/` (`...____ROOT.ts`, `..._UserAccess_CreateEditDelete.ts`, `..._StructureFile_Contents_Entry_DAO.ts`, `..._StructureFile_Contents_Entry_Contents_Value.ts` (per-id `Map<number, Promise>` dedupe; `set_...` seeds the cache), `..._StructureFile_ProteinSequenceAlignment_Entry_DAO.ts`); server `RC/structure_file_data__tied_to_project_id/` (11 controllers; reads need public read, writes assistant owner).
- Used by: protein structure widget components.
- How to use / extend: the upload method is the front-end example of a raw-body upload (see binary upload entry). Feature-specific otherwise.
- Do not use when: n/a.
- Limits and gotchas: uses hand-written `window.fetch` + manual sync header instead of `webserviceCallStandardPost`. Delete failures use `window.alert`. Header names are "keep in sync with server" literals. Server delete scope: see [storage_files_external_services.md](storage_files_external_services.md).
- Related / duplicates: FOS read/upload ([storage_files_external_services.md](storage_files_external_services.md)).
- Status: verified (response handling skimmed)

---

## Cross-references (blocks owned by other areas)

- File Object Storage stream-through download / read and FOS upload from the structure-file controller; spectr `Call_Get_*` client wrappers; outbound HTTP clients; email services (`SendEmailForSubmitImportService`, run-import-finish email services, error-alert email); in-memory cache registry, cache size budget, on-disk webservice cache (`CachedDataInFileMgmt_*`), Guava `SoftReference` cache service template (`ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service`) → **[storage_files_external_services.md](storage_files_external_services.md) (storage, files, external services)**.
- Import queue / pipeline-run queue flows behind the upload endpoints (`Project_UploadData_UploadSubmit`, `Project_FeatureDetection_*_{Initialize,Submit}`, `Project_UploadData_ListSubmittedItems`, remove-item controllers, `FileImportAndPipelineRun_RequestType`), gold-standard in-request import → **[background_processing_queues_maintenance.md](background_processing_queues_maintenance.md) (background processing, queues)**.
- Access-control classes (`ValidateWebSessionAccess_*`, `UserIsAdminCheck`), `GenerateRandomStringForCode`, URL sanitizer `sanitizeURL_ForHrefOrNavigation` → **[security_access_control_sessions.md](security_access_control_sessions.md) (security, access control)**; CSP → [web_security_csp_and_xss_url_hardening.md](../web_security_csp_and_xss_url_hardening.md).
- Default cutoffs builder (`SearchDataLookupParams_Create[_Save]_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds`), `SearcherCutoffValues_Factory`, annotation pivot-to-map services, annotation searchers parked in `search_data_lookup_parameters_code/searchers`, `GetAnnotationTypeData`, APEX m/z / ppm math in the APEX PSM download, sub-group label computation → **[domain_utilities.md](domain_utilities.md) (domain utilities)**.
- DAOs, searchers, `database_update_with_transaction_services`, insert-with-retry / upsert services (`SavedView_Insert_Service`, `SetDefaultView_ProjectSearchPages_Insert_Service`), duplicate-key handling flags → **[data_access.md](data_access.md) (data access)**.
- Overlays, modal components, add-React-element-to-body, spinners, tooltips, color picker, colors constants, small type-check helpers, annotation number formatting, legacy `showHideErrorMessage`, field-length constants, page roots / esbuild entries, central page state manager (URL `/q/` state, lz-string), save view / share page / default view front end, `StringDownloadUtils`, data tables + PSM list child table, search details block, tag loaders/components, project page role bundles, `force_ReloadFromServer_EmptyObjectReference` refresh signals, import-status "reload page?" prompt → **[front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md) (front-end UI components and page framework)**.
- Plotly helpers, jStat wrapper, trypsin cut points, chromatograms → **[charts_visualization.md](charts_visualization.md) (charts)** / [domain_utilities.md](domain_utilities.md).
- JSP include chain, cache-bust string generation, error JSPs, view resolver, config reader pattern, parallel-stream switch config, startup listener → **[build_deploy_config.md](build_deploy_config.md) (build, deploy, config)** (sync-tracking usage kept here).

## Duplicates and parallel mechanisms in this area

1. **HTTP call paths (front end)**: `webserviceCallStandardPost` (prefer for all JSON) vs hand-rolled `window.fetch` (error log, keep-alive, header project list, structure-file DAOs), raw `XMLHttpRequest` (5 upload senders), jQuery `$.ajax` (dead Google Charts loader). Prefer the standard POST; raw paths only for uploads/binary and must add the sync header and use `handleAJAXError`/`handleRawAJAXError`.
2. **Access checks in webservices**: use the throwing validators; see [security_access_control_sessions.md](security_access_control_sessions.md).
3. **JSON request parsing**: use `Unmarshal_RestRequest_JSON_ToObject` (not `UnmarshalJSON_ToObject`) in REST controllers; three `UnmarshalJSON_ToObject` classes across modules.
4. **REST path strings** hand-synced in 3 places (Java constants, TS literals, run importer / submit connector). No preferred single source exists; design idea in `webservice_dto_typescript_single_source_design.md`.
5. **Lookup-code webservice callers**: shared `updatePageState_URL_With_New_SearchDataLookupParameters_Root.ts` (prefer) vs 4 inline callers (Change Searches, Re-order Searches, project page open-data-pages, feature-detection page). Server: resolver IF has an unused byte-identical second implementation.
6. **Search names**: `retrieveSearchNamesFromServer` (prefer on data pages) vs direct `search-name-list-from-psi` calls (sub-group rename overlay, Lorikeet page); project-level pages use the searches/tags/folders loader (correct there). Search tags loaded 2 ways (thin wrappers vs searches/tags/folders loader).
7. **Search flags (server)**: cached `SearchFlagsForSingleSearchId_SearchResult_Cached` (cache likely never hits) vs direct `SearchFlagsForSearchIdSearcher`. No preferred one identified.
8. **Scan-data webservices**: projectSearchId+searchScanFileId family vs projectScanFileId family (near duplicates); front end: prefer the delegating single-search loaders → projectScanFileId ROOT. Two max-scan-count loaders (one module-cached). Scan file info from 3 loaders.
9. **Filtered vs unfiltered PSM table data** (server endpoints and front-end loaders, same fields). Prefer filtered; unfiltered only for views that must see PSMs outside the cutoffs.
10. **Front-end download**: server form-POST + status polling (no shared helper; copy-pasted 5× in 4 files) vs client-side `StringDownloadUtils`. Choose by data size / location; a shared form-download helper does not exist.
11. **Binary upload**: octet-stream + Base64 header re-implemented in 6 controllers and 3 front-end ways (chunked uploader, 4 single-POST copies, structure-file DAO); V1 single-request vs V2 chunked into the same tracking tables. Prefer V2 chunked for large files.
12. **Random codes**: use `GenerateRandomStringForCode` (SecureRandom).
13. **Gzip**: helper pair vs ad-hoc `GZIPOutputStream` in the gold-standard upload controller.
14. **Error reporting**: page controllers 3 ways (forward to main error page — prefer; per-controller JSPs; `throw RuntimeException // TODO`); front end two near-identical red error boxes + legacy jQuery messages.
15. **Request DTOs**: nested `WebserviceRequest`/`WebserviceResult` (prefer) vs legacy `*_RequestRoot` classes (mostly dead).
16. **Parallel/serial branches** duplicated in 4 parallel-stream controllers; two PSM download controllers largely copy-paste; Blib Request/Cancel inline HTTP vs Status call class (prefer the class).
17. **Annotation-value loaders**: four copy-paste siblings (front end) mirroring four copy-paste pivot services (server).
18. **Admin check**: use `UserIsAdminCheck` ([security_access_control_sessions.md](security_access_control_sessions.md)).
19. **Read-JSON-from-`<script type="text/text">`** copy-pasted in ≥11 experiment-page files; no shared reader.

## Open questions / unverified

- Whether `All_Page_Controllers_SpringHandlerInterceptor` actually runs on `d/rws/...` and `user/rws/...` calls (exclude entries lack `**`; pattern spot-checked, runtime effect not traced).
- `SearchFlagsForSingleSearchId_SearchResult_Cached` never-hit conclusion (no `equals`/`hashCode` on key) — code reading only.
- Annotation-value loader over-fetch guard — code reading, not runtime-tested.
- Resolved (code reading): `Support_DataDownloadControllers_Service.updateDownload_Identifier_Status` on an id not in the cache inserts `ABOUT_TO_SUBMIT`, not the requested status (read); runtime not tested.
- Resolved: V2 `*-from-submit-pgm` — no caller in any module (grep), and the `SubmitImport_V2_*_PgmXML` request classes are absent from the `Unmarshal_RestRequest_XML_ToObject` JAXB list (read); non-functional as written, still not exercised.
- Disabled controllers still compiled (`//@RestController`): `ProteinSeqVerIdList_ReportedPeptideIds_...`, `ProteinSeqVersionIdsForReportedPeptides_...`, `PsmFilterableAnnotationData_PerReportedPeptide_For_SearchCriteria_...`, `SearchSubgroups_At_SearchLevel_...`, gold-standard Initialize/Submit.
- `limelight_webapp/front_end/CLAUDE.md` before-unload guard registry description does not match `master`.
- Resolved: no code in `limelight__database_cleanup__common_code__remove_data_from_database` or `limelight_run_importer` references `search_data_lookup_parameters` (grep), so nothing found deletes old rows.
- Bodies of most admin / user-account / large upload controllers, the PSM download per-column logic and several thin data controllers were skimmed, not read line by line.
- Resolved: annotation-data-by-ids front-end callers — each of the five endpoints has exactly one front-end caller (URL-literal grep); entry updated and marked verified.
- Exact count of cached controllers differs by source (16 in single/multi-search packages; about 23-25 files repo-wide incl. feature detection); not reconciled.
