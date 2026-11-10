# Reusable building blocks — Security, access control, sessions

Part of the reusable-building-blocks inventory; start at [README.md](README.md) (keyword index, quick picks).

This area covers who may see or change what (the REST and page access checks, the admin check), how the signed-in user
is read from the HTTP session, and the standard helpers for random codes, XML parsing and URLs. Use these mechanisms; do
not hand-roll access checks, random codes, XML parsing or URL handling. For Content-Security-Policy, XSS and URL hardening
rules see [../web_security_csp_and_xss_url_hardening.md](../web_security_csp_and_xss_url_hardening.md).

Abbreviations: `W/` = `limelight_webapp/src/main/webapp/`, `J/` = `limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp/`,
`SMP/` = `J/spring_mvc_parts/`, `FE/` = `limelight_webapp/front_end/`, `PJ/` = `FE/src/js/page_js/`.

## Quick picks

| If you need... | Use this | Entry |
|---|---|---|
| Authorize a webservice that takes projectSearchIds | `ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF.validate<Level>Allowed(ids, request)` | REST access check by projectSearchIds |
| Authorize a webservice that takes one projectId | `ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF.validate<Level>Allowed(List.of(projectId), request)` | REST access check by projectId |
| A new search-based data page with access control for free | put the controller under `d/pg/psb/` (`PROJECT_SEARCH_ID_BASED_PAGE_CONTROLLER_START`) | Project-search-id-based page access interceptor |
| Is the user a global admin? | `UserIsAdminCheckIF.userIsAdmin(userSession)` | Global admin check |
| The current user, for an authorization decision | `AccessControl_GetUserSession_RefreshAccessEnabled_IF.getUserSession_RefreshAccessEnabled(request)` (not the raw `UserSessionManager.getUserSession`) | Session user, refreshed |
| A random secret code (invite, access code, key, reset code) | `GenerateRandomStringForCode(IF)` (SecureRandom) | Random code generator |
| Parse any received / uploaded XML | `XMLInputFactory_XXE_Safe_Creator.xmlInputFactory_XXE_Safe_Creator()` (+ `Unmarshal_RestRequest_XML_ToObject` in the webapp) | XXE-safe StAX XMLInputFactory |
| Put a non-constant URL into `href` / `src` / `location` / `window.open` | `sanitizeURL_ForHrefOrNavigation__ExternalLinkSafeUrlOrNull` / `__SameOriginSafeUrlOrNull` | URL sanitizer |

---

## REST (webservice) access checks

### REST access check by projectSearchIds (`ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds`)
- What it solves: the standard authorization gate at the top of a webservice that takes projectSearchIds: resolves them to one project, checks project enabled/not deleted, session / public project / public access code / project_user row / admin, locked-project override, and throws the right HTTP-mapped exception.
- Search keywords: webservice auth, REST security, validate access, project search id permission, 401, 403, forbidden, unauthorized, authorization gate
- Location: limelight_webapp, `J/access_control/access_control_rest_controller/`, entry: `ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF` (`validatePublicAccessCodeReadAllowed`, `validateWriteAllowed`, `validateProjectOwnerAllowed`, `validateAdminAllowed`, ...; generic `validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(minLevel, CheckWhichAuthAccessLevel, ids, request)`).
- How to use / extend: `@Autowired` the IF; call the `validateXxxAllowed( projectSearchIds, httpServletRequest )` for the needed level; the result carries `getUserSession()`, `getWebSessionAuthAccessLevel()`, `getProjectIdsForProjectSearchIds()`. Do not catch its exceptions: `Limelight_WS_AuthError_Unauthorized_Exception` (401, no session) / `Limelight_WS_AuthError_Forbidden_Exception` (403) / `LimelightErrorDataInWebRequestException` (both auth exceptions in `J/exceptions/webservice_access_exceptions/`) are turned into the response and handled by the front-end AJAX error handler. Call the `validateXxxAllowed` method for the level you need, or the generic method with an explicit `AuthAccessLevelConstants` value.

### REST access check by projectId (`ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds`)
- What it solves: same as above for webservices keyed by projectId (project page, folders, tags, users, uploads, scan files).
- Search keywords: project permission, validate project access, project owner check, webservice auth, locked project edit
- Location: limelight_webapp, `J/access_control/access_control_rest_controller/`, entry: `ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF` (same `validateXxxAllowed` family plus `validateLoggedInUserReadOnlyAllowed` / `...IfProjectNotLockedAllowed`).
- How to use / extend: pass `List.of(projectId)`. Result has `getUserSession()` and `getWebSessionAuthAccessLevel()`. On "project not found" / "not enabled or deleted" it sets flags on the thrown `LimelightErrorDataInWebRequestException` (`setProjectIdnotfound`, `setProjectIdNotEnabledOrMarkedforDeletion`). Use the `...IfProjectNotLocked...` variants for edits that must be blocked on a locked project.

## Page access checks

### Project-search-id-based page access interceptor (`/d/pg/psb/**`)
- What it solves: for every project-search-based data page, parses the search-data-lookup-parameters code (or an inline project-search-id-code / project-scan-file-id-code block) from the URL, loads the lookup record, resolves projectSearchIds → projectId, rejects searches from more than one project, checks access (login forward / 401 page), fills page header data, and sets the request attributes the controller and JSP rely on.
- Search keywords: data page access control, page auth, search data lookup parameters code, URL code, psb, HandlerInterceptor, preHandle, login redirect, request attributes, WebConstants.REQUEST_*
- Location: limelight_webapp, `SMP/controller_interceptor_handlers/DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor.java` (`PATHS_FOR_INTERCEPTOR`); registered in `J/LimelightWebAppConfig.java` (`addInterceptors`); collaborators `GetWebSessionAuthAccessLevelForProjectIdsIF`, `SearchDataLookupParams_GetRecordForCodeIF`, `PopulatePageHeaderDataIF`.
- How to use / extend: put a new search-based page under `AA_PageControllerPaths_Constants.PROJECT_SEARCH_ID_BASED_PAGE_CONTROLLER_START` and it is protected automatically; read `WebConstants.REQUEST_PROJECT_SEARCH_IDS`, `REQUEST_CURRENT_PROJECT_ID`, `REQUEST_WEB_SESSION_AUTH_ACCESS_LEVEL`, `REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS*`, etc.

### Role-based UI code gating (not access control)
- What it solves: keeps owner-only / logged-in-only code out of what public users download: page JSPs pick `*_RootLaunch_LoggedInUsers-bundle.js` vs `*_RootLaunch_PublicUser-bundle.js` by access level; data pages pass a `DataPages_LoggedInUser_CommonObjectsFactory`, the project page passes `ProjectPage_SearchesAdmin` / `ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions`, or `null` for public users.
- Search keywords: public user bundle, logged-in bundle, code splitting by role, owner-only UI, hide button for public
- Location: page JSPs (e.g. `W/WEB-INF/jsp/data_pages/project_search_ids_driven_pages/peptideView.jsp`); `PJ/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory.ts`; `PJ/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesAdmin.ts`.
- How to use / extend: see [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md) (front-end UI / page framework). It only limits which code is shipped; every server endpoint must still authorize itself.

## Admin

### Global admin check (`UserIsAdminCheck`)
- What it solves: is the session user a Limelight global admin (global-admin flag from User Mgmt, or user access level ADMIN).
- Search keywords: is admin, admin user, superuser, global admin, isGlobalAdminUser
- Location: limelight_webapp, `J/access_control/direct_user_session/UserIsAdminCheck.java`, entry: `UserIsAdminCheckIF.userIsAdmin( userSession )`.
- How to use / extend: pass a refreshed `UserSession` (from `AccessControl_GetUserSession_RefreshAccessEnabled`). Use this helper for admin checks.

## Sessions and the signed-in user

### Session user, refreshed (`AccessControl_GetUserSession_RefreshAccessEnabled`)
- What it solves: gets the `UserSession` and, for a signed-in user, re-reads the Limelight user row each request: ends the session if the user is gone, disabled in Limelight, or disabled in User Mgmt; syncs enabled flag and global access level into the session.
- Search keywords: current user, get session, refresh user, disabled user logout, session validation, who is logged in
- Location: limelight_webapp, `J/access_control/common/`, entry: `AccessControl_GetUserSession_RefreshAccessEnabled_IF.getUserSession_RefreshAccessEnabled( request )`.
- How to use / extend: use this (not `UserSessionManager.getUserSession`) whenever the result feeds an authorization decision. Returns null when no/ended session.

## User accounts

### Password too long check (UTF-8 bytes, front end)
- What it solves: client check of a new password against the server's max length in UTF-8 bytes (read from DOM id `password_max_length_utf8_bytes`), with a message in characters.
- Search keywords: password length, UTF-8 bytes, validation, too long, byte-limited text
- Location: `PJ/user_account_page_js/sub_parts/passwordTooLong_PageCheck.ts` (`passwordTooLong_PageCheck__Get_PasswordMaxLength_UTF8_Bytes_FromPage`, `..._Compute_NumberOfCharactersToRemoveFromEnd`, `..._Get_Message_IfTooLong`).
- How to use / extend: the page JSP must emit the max-length element; the server side uses `isPasswordTooLong_UTF8_Bytes` from the User Mgmt client.

## URLs

### URL sanitizer (`sanitizeURL_ForHrefOrNavigation`)
- What it solves: blocks `javascript:` / `data:` URL XSS and open redirects before a non-hardcoded URL goes into `href` / `src` / `location` / `window.open`.
- Search keywords: XSS, sanitize URL, open redirect, safe link, href, navigation, web link, javascript: URL, security
- Location: `PJ/common_all_pages/sanitizeURL_ForHrefOrNavigation.ts`: `sanitizeURL_ForHrefOrNavigation__ExternalLinkSafeUrlOrNull(url)` (http/https or same-origin), `sanitizeURL_ForHrefOrNavigation__SameOriginSafeUrlOrNull(url)` (same-origin only). Return the trimmed URL or null.
- How to use / extend: pick the variant by intent; the caller chooses the fallback on null. Also validate stored/redirect URLs server-side: the web-link reference is `Insert_WebLink_RestWebserviceController.isWeblinkURL_AllowedScheme` (http/https only, trims, rejects embedded control chars). New `target="_blank"` links need `rel="noopener noreferrer"` (or `window.open(url, "_blank", "noopener")`).

## Safe parsing and secure codes

### XXE-safe StAX XMLInputFactory (`XMLInputFactory_XXE_Safe_Creator`)
- What it solves: creates a `javax.xml.stream.XMLInputFactory` with external entities and DTDs disabled, for safely parsing uploaded / received XML (Limelight XML, JAXB unmarshal of requests).
- Search keywords: XXE, XML external entity, secure XML parsing, StAX, XMLInputFactory, JAXB unmarshal safe, DTD disabled, XMLStreamReader
- Location: `limelight_shared_code`, `org/yeastrc/limelight/limelight_shared/XMLInputFactory_XXE_Safe_Creator/XMLInputFactory_XXE_Safe_Creator.xmlInputFactory_XXE_Safe_Creator()`. Webapp wrappers: `SMP/rest_controller_utils_common/Unmarshal_RestRequest_XML_ToObject.java` (`getObjectFromXMLByteArray`, `getObjectFromXMLString`) and `Marshal_RestRequest_Object_ToXML.java`.
- How to use / extend: for ANY XML parsing (new or changed code), create an `XMLStreamReader` from this factory and pass it to `Unmarshaller.unmarshal(...)` or read it directly; never call `XMLInputFactory.newInstance()` directly. In the webapp, XML webservices go through `Unmarshal_RestRequest_XML_ToObject` (add new classes to its fixed `JAXBContext.newInstance(...)` list).

### Random code generator (`GenerateRandomStringForCode`)
- What it solves: SecureRandom alphanumeric code for secret, unguessable codes.
- Search keywords: random string, token, secret code, invite code, public access code, submit import key, password reset code, key generation, SecureRandom, CSPRNG
- Location: limelight_webapp, `J/web_utils/GenerateRandomStringForCode(IF)`.
- How to use / extend: inject the IF. Use it (or at minimum `SecureRandom`) for ANY code that appears in a URL or grants access; never `Math.random()` / time-based codes. For a short code with a unique DB key, combine with the retry-on-duplicate loop ([data_access.md](data_access.md), "Duplicate-key handling flags and the random-code retry loop").
