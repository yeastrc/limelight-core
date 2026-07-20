# Web security: Content-Security-Policy and XSS / URL-injection hardening

**Status:** reference. Written 2026-07-16 from a full-stack security pass on the webapp (CSP review +
DOM-XSS / open-redirect audit + HTML-injection-sink review).
**Scope:** where the CSP lives and why each directive is set the way it is; the URL sinks that could
carry a `javascript:` URL or open redirect and how they're now sanitized; the three-layer defense on
user-provided web links; and the review of every HTML-injection sink (`innerHTML` / `.html()` /
`dangerouslySetInnerHTML`). Read this before touching the CSP, adding a link/redirect, rendering a
server- or user-provided URL, or injecting an HTML string.

**Path shorthands (repo-root-relative):**
`<jsp>` = `limelight_webapp/src/main/webapp/WEB-INF/jsp`,
`<java>` = `limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp`,
`<fe>` = `limelight_webapp/front_end/src/js/page_js`.

---

## 1. The Content-Security-Policy

**Where:** `<jsp>/jsp_includes_head_section/head_section_include_every_page.jsp` — a single `<meta
http-equiv="Content-Security-Policy">` included on every page. There is no CSP response header; it's this
meta tag. Whitespace/newlines inside the `content="..."` string are token separators (harmless), and
`<%-- --%>` comments are stripped at JSP compile time (they never reach the browser).

Current directives:

```
script-src 'self'
           'sha256-…'  (inline IE-test script)
           'sha256-…'  (inline page-error-reporting script)
           https://www.gstatic.com/recaptcha/     (reCAPTCHA resource bundles)
           'unsafe-eval'                           (Plotly WebGL — see below)
           https://www.googletagmanager.com/gtag/js
           https://www.google-analytics.com/analytics.js
           https://www.recaptcha.net/recaptcha/api.js
           https://www.google.com/recaptcha/api.js ;
object-src 'none' ;
base-uri   'self' ;
form-action 'self' ;                       (forms submit only to this origin)
```

Anti-clickjacking is delivered as **response HEADERS** (NOT in the meta — `frame-ancestors` is ignored in a
`<meta>` CSP), set in `top_of_every_page_doctype__jsp_cache_directives.jsp`:
`Content-Security-Policy: frame-ancestors 'self'` + `X-Frame-Options: SAMEORIGIN`. See the bullet below.

Key facts and the reasoning behind each non-obvious choice:

- **No `'unsafe-inline'`.** Inline scripts are allowed only by SHA-256 hash. Consequence: **`javascript:`
  URLs and inline event-handler attributes (`onerror=`, `onload=`) are blocked by the browser.** This is
  the current safety net under many of the URL/HTML findings below — but it is a *single* control, which
  is why we also sanitize in code (defense-in-depth).
- **`'unsafe-eval'` is required by Plotly's WebGL path**, NOT by Google Charts (the old comment was
  wrong). The front end uses `type: 'scattergl'` (WebGL) traces in ~30 places; Plotly renders those via
  `regl`, which uses the `Function` constructor → needs `'unsafe-eval'`. Removing it would break the
  scattergl plots (QC / mod / chromatogram pages) unless those traces are converted to SVG `scatter`
  (a real perf regression for large point counts). It is deliberately kept and documented.
- **`https://www.gstatic.com/recaptcha/` is narrowed** (was all of `https://www.gstatic.com/`, which
  Google flagged as too broad). The only real gstatic consumer is reCAPTCHA, which loads its resource
  bundles from `.../recaptcha/releases/…/recaptcha__<lang>.js`. Verified in-browser: 200, no violation.
- **Google Charts is NOT used** and is not planned (leftover from the app Limelight was copied from);
  `<fe>/data_pages/data_pages_common/googleChartLoaderForThisWebapp.ts` is entirely commented out. If it
  is ever added it needs its own CSP changes (a narrowed `https://www.gstatic.com/charts/` path plus
  `'unsafe-eval'`) — do NOT re-widen the gstatic entry. A guidance note in the JSP records this.
- **`base-uri 'self'`** locks `<base>` to same-origin. This matters a lot here: the app sets
  `<base href="<contextPath>/">` and hangs *all* relative URLs off it, so an injected off-origin
  `<base>` would silently repoint every relative link/script/resource. `'self'` permits the legitimate
  same-origin base while blocking that hijack (verified: legit base unaffected).
- **Anti-clickjacking is a RESPONSE HEADER, not a meta directive.** `frame-ancestors` (and
  `X-Frame-Options`, `report-uri`, `sandbox`) are **silently ignored when delivered via a `<meta>` tag** —
  the browser logs "directive 'frame-ancestors' is ignored when delivered via a `<meta>` element." So it is
  set as response headers in `<jsp>/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp`
  (the file that already sets Cache-Control the same way, proving header delivery works through the deploy's
  proxy): `Content-Security-Policy: frame-ancestors 'self'` **plus** `X-Frame-Options: SAMEORIGIN`
  (broad/legacy support). Limelight is always stand-alone (never embedded), so same-origin framing only; no
  reCAPTCHA interaction (it governs who may frame *us*, not forms). A separate CSP policy containing only
  `frame-ancestors` does not affect the main meta CSP — each delivered policy is enforced independently.
  **Verify in DevTools → Network → (page) → Response Headers.** (Added to meta 2026-07-16; moved to header
  2026-07-20 after the meta-ignored warning.)
- **`form-action 'self'`** — forms may submit only to this origin. All Limelight form submits (incl. the
  forms TypeScript builds and submits dynamically) target the app itself; reCAPTCHA's own forms live in
  Google's cross-origin iframe (governed by Google's CSP, not ours) and its verification token posts to
  our own server. Added 2026-07-16 and **verified with reCAPTCHA v2** (using Google's public test keys) —
  `form-action 'self'` does NOT break reCAPTCHA. (If a future integration ever conflicts, extend it:
  `form-action 'self' https://www.google.com https://www.recaptcha.net`.)

---

## 2. URL sinks and the shared sanitizer

**The helper:** `<fe>/common_all_pages/sanitizeURL_ForHrefOrNavigation.ts`. Use it before putting a
NON-hardcoded URL into an `<a href>` / `.src` or navigating (`window.location.href` / `window.open`).
Two entry points, both returning the original trimmed URL if safe or `null` if not:

- `…__ExternalLinkSafeUrlOrNull(url)` — user **external** links: allow `http`/`https` (**any host**) and
  same-origin; reject `javascript:`/`data:`/`vbscript:`/etc.
- `…__SameOriginSafeUrlOrNull(url)` — app **navigation**: same-origin / relative **only** (also blocks
  open redirects to other origins).

**Why the URL constructor, not a regex:** parsing uses `new URL(url, window.location.href)`, which mirrors
the browser's own WHATWG parsing — including stripping the tab/newline and leading control chars used to
obfuscate a scheme (`java\tscript:`). A `startsWith("javascript:")`-style regex misses those. (This was
verified: the server-side check, which uses control-char rejection instead, correctly 400'd
`java\tscript:` and `  javascript:` payloads.)

**The three wired sinks** (audit findings F1–F3):

| # | Sink | File | Gate |
|---|------|------|------|
| F1 | search web-link `href` | `<fe>/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers.tsx` (render ~2308) | `__ExternalLinkSafeUrlOrNull`; unsafe → label rendered as plain text; also added `rel="noopener noreferrer"` |
| F2 | login `requestedURL` redirect | `<fe>/user_account_page_js/sub_parts/userLogin_Subpart.ts` (~298) | `__SameOriginSafeUrlOrNull` before `window.location.href` |
| F3 | saved-view navigation | `<fe>/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SavedViewsSection_MainBlock_Container_Component.tsx` (~271) | `__SameOriginSafeUrlOrNull` before `window.open`/`location.href` |

Notes on the two navigation sinks:

- **`requestedURL` is narrow.** It is `${param.requestedURL}` reflected (HTML-escaped via `<c:out>`) into
  a hidden input on `userLogin.jsp` / `createAccount_NoInvite.jsp`, then read by `userLogin_Subpart.ts`
  **only in the `invalidInviteTrackingCode` branch** (invite flow with a bad tracking code). The normal
  login redirect does NOT use it — on success the code goes to `d/pg/project-list` or reloads the current
  URL (that "reload current URL" is how a logged-out user who hit a protected page is returned to it). The
  header "Sign In" link uses `user/login?useDefaultURL=yes`, a separate param. Still a real
  open-redirect/`javascript:` vector when reachable, hence the same-origin gate.
- **Saved-view URLs** are app-generated same-origin page URLs; the gate is a cheap guard against a
  tampered stored value.

**Other `window.location.href =` assignments** (~20) were checked and assign hardcoded paths
(`"d/pg/project-list"`) or app-constructed URLs — not attacker-influenced.

---

## 3. Web links: three-layer, http/https-only defense

User web links (added per project-search, rendered to **all** viewers incl. public users of shared
searches) are the one stored, user-controlled URL surface. They are guarded at three layers, all
**http/https only** (no ftp, no mailto):

1. **Client add-form sanity** — `_weblinks_validateURL` in
   `<fe>/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add_Overlay.tsx`.
   Simplified to `^https?://<host>` (no embedded whitespace). **The old regex hardcoded a TLD allowlist
   (`com|edu|gov|…|[a-z]{2}`) that wrongly rejected modern TLDs (`.app`, `.dev`, `.bio`, `.science`, …)** —
   do NOT reintroduce a TLD allowlist; scheme safety lives in layers 2–3, not here.
2. **Server-side validation** — `Insert_WebLink_RestWebserviceController.isWeblinkURL_AllowedScheme`
   (`<java>/spring_mvc_parts/data_pages/rest_controllers/project_search_based_insert_update_delete/`).
   The endpoint previously only checked `isEmpty`, so the client regex was trivially bypassed by POSTing
   directly. Now: allow `http`/`https` (any host), reject other schemes, trim, and **reject embedded ASCII
   control chars** (the `java\tscript:` obfuscation vector). Throws `Limelight_WS_BadRequest_InvalidParameter_Exception`.
3. **Render-time sanitizer** — the F1 `__ExternalLinkSafeUrlOrNull` gate above.

**Verified end-to-end** (authenticated console POST, see §5): `javascript:`, `  javascript:`,
`java\tscript:`, `data:…`, `vbscript:` → **400**; `https://example.app/legit` → **200**, stored intact
(`link_url VARCHAR(600)`; nothing truncates the path).

---

## 4. HTML-injection sinks (`innerHTML` / `.html()` / `dangerouslySetInnerHTML`) — reviewed, all safe or admin-only

There are **no `dangerouslySetInnerHTML`** in the front end (0 occurrences) — all React output is
auto-escaped. The raw-HTML sinks, all traced:

- **Static HTML** (no data): `common_all_pages/errorDisplay_WhenHave_Javascript_Typescript_Error.ts`
  (`innerHTML`), and the mod-viz selection tooltip skeleton in
  `data_pages/…/mod_view_page/mod_page__js/ModView_DataViz_Renderer.ts:171` (static + hardcoded ID
  constants). Safe.
- **Server-escaped fragment:** the header projects dropdown —
  `<fe>/header_main_pages/header_main_pages__logged_in_user/limelight__header_main_pages__logged_in_user_PopulateProjects.ts`
  does `container.innerHTML = value` where `value` is the response of page-fragment controller
  `d/pgf/project-list-for-main-page-header-drop-down`. The JSP
  (`<jsp>/data_page_fragments/fragments_for_main_pages_header_webservice_responses/projectsListForMainPageHeaderDropdown_PageFragment.jsp`)
  escapes project titles with **`<c:out>`**. Safe.
- **Careful data pattern (worth emulating):** the mod-viz d3 tooltip
  (`ModView_DataViz_Renderer.ts:1041` `.html(...)`) builds only static HTML + numeric `modMass`, injecting
  an **empty** `<span id="mod_viz_tooltip__search_display_string">`; the user-controlled **search name** is
  set separately via `mod_viz_tooltip__search_display_string_DOM.textContent = searchDisplayString` (line
  ~1119, with an explicit comment "so not interpret HTML tags in the search name"). This is the right way
  to mix user text into a `.html()`-built node.
- **Admin-authored HTML (accepted by design):** Terms-of-Service and footer are rendered as raw HTML
  (`userLogin_Subpart.ts:280`, `webapp_admin_pages/webapp_manage_terms_of_service_page/manageTermsOfService_Maint.ts`,
  `webapp_admin_pages/webapp_config_page/configureLimelightForAdminPage_Main.ts`).
  `_termsOfService_Text_ConvertForAssignAsHTML` does `\n → <br>` **without** escaping the rest, so an
  author can inject live HTML that renders to all users on the ToS-acceptance page. This is gated to
  **global webapp-admins** (fully trusted), so it's accepted, not a finding. *Optional* future hardening
  (declined for now, catalogued in §7a): if ToS/footer are meant to be plain-text-with-breaks, HTML-escape
  first then `\n→<br>`, to limit blast radius if an admin account is compromised.

**Bottom line:** no actionable XSS in the HTML sinks.

---

## 4b. Reverse tabnabbing: `target="_blank"` anchors

Every `target="_blank"` `<a>` in the app (front end **and** JSPs) carries `rel="noopener noreferrer"`, and
every `window.open(url, "_blank", …)` call passes `"noopener"`. This is defense-in-depth — modern browsers
already default `target=_blank` to `noopener`; older ones don't — and all current destinations are
hardcoded (readthedocs / same-app paths), so there was no live risk, but the attribute is applied
uniformly. Note the URL auto-linkifier
`<fe>/data_pages/common_components__react/render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component.tsx`
renders `<a href={urlMatch}>` from URLs found in free text — it has the rel; if you extend it, also run
`urlMatch` through the URL sanitizer (§2), since that href is data-derived.

---

## 5. Two mechanisms you need to test/extend these endpoints

- **Webservice sync-tracking code (anti-stale / soft-CSRF).** Every mutating REST call validates a header
  `limelight_webservice_sync_tracking_code` (server:
  `<java>/webservice_sync_tracking/Validate_WebserviceSyncTracking_Code.java`; FE sends it from
  `<fe>/webservice_call_common/webserviceCallStandardPost.ts`). The value is emitted on every page as
  `<script id="webservice_sync_tracking_code" type="text/text">${ webserviceSyncTracking }</script>` and
  read via `getWebserviceSyncTrackingCode()` in `common_all_pages/EveryPageCommon.ts`. A raw POST must
  include this header or it's rejected before the handler body runs.
- **Testing an authenticated endpoint from the browser console** (reuses your session; no cookie handling,
  no rebuild). Pattern used to verify §3:
  ```js
  const code = document.getElementById("webservice_sync_tracking_code").innerText;
  await fetch("/limelight/d/rws/for-page/insert-web-link", {
    method: "POST",
    headers: { "Content-Type": "application/json", "limelight_webservice_sync_tracking_code": code },
    body: JSON.stringify({ projectSearchId: <ownedId>, weblinkURL: "javascript:alert(1)", weblinkLabel: "t" }),
  }).then(r => r.status);   // expect 400
  ```
  (The weblink scheme check runs before the project-ownership check, so a rejection is unambiguously the
  scheme gate. A valid URL with an owned `projectSearchId` actually inserts — clean up the test row.)

---

## 6. Guidance for future changes

- **Never** put a non-hardcoded URL into `href`/`.src`/`location.href`/`window.open` without routing it
  through `sanitizeURL_ForHrefOrNavigation` (external vs same-origin variant per intent).
- **Never** build an HTML string from server/user data with string concatenation + `innerHTML`/`.html()`.
  Either use React (auto-escaped), `<c:out>` on the server, or inject an empty node and set user text via
  `.textContent`/`.text()` (see the mod-viz tooltip pattern above).
- **Web-link / redirect endpoints:** validate the URL **server-side** — client-side checks are bypassable.
- **CSP changes** are security-sensitive and JSP-compiled lazily, so a WAR build won't validate them;
  verify in a browser (no console CSP violation; the affected feature still works).
- If you ever remove `'unsafe-eval'`, you must first eliminate Plotly WebGL (`scattergl` → `scatter`) and
  re-test the plot pages.
- **New `target="_blank"` links** must include `rel="noopener noreferrer"`; prefer
  `window.open(url, "_blank", "noopener")` (see §4b).

---

## 7. Deferred / future hardening (identified, NOT yet done)

These were identified during the security pass and deliberately left for a future, separately-tested
change. **Start here for any future "security / hardening" request.**

### 7a. Terms-of-Service / footer: escape-first
`_termsOfService_Text_ConvertForAssignAsHTML` (in
`<fe>/webapp_admin_pages/webapp_manage_terms_of_service_page/manageTermsOfService_Maint.ts`) does
`termsOfServiceText.replace(/\n/g, "<br>")` and assigns the result as HTML — rendered to **all** users on
the ToS-acceptance page. The admin footer (`webapp_admin_pages/webapp_config_page/configureLimelightForAdminPage_Main.ts`,
`input_footer_center_of_page_html_Val`) is the same shape. Neither escapes the rest of the text, so an
author can inject live HTML. It's gated to **global webapp-admins (trusted)**, so it's accepted today.

**Option:** if ToS/footer are meant to be **plain text with line breaks** (not rich HTML), HTML-escape the
text FIRST, then convert `\n`→`<br>`. This limits blast radius — a compromised admin account (or any future
lower-privilege path to ToS) otherwise yields persistent XSS on every user's ToS page. **Confirm intent
first:** only do this if rich-HTML authoring is NOT a wanted feature (as of 2026-07-16 this was left as-is).

### 7b. Additional CSP directives
The two **cheap wins are done** (see §1): `form-action 'self'` (in the meta CSP, reCAPTCHA **verified**)
and anti-clickjacking **`frame-ancestors`** — the latter delivered as a **response header**
(`Content-Security-Policy: frame-ancestors 'self'` + `X-Frame-Options: SAMEORIGIN`) because
`frame-ancestors` is ignored in a `<meta>` CSP. Google's CSP evaluator would still flag the remaining
missing fallbacks, all of which are the larger lift:

- **Larger lift (needs a source inventory + browser testing first).** Per-directive notes, incorporating
  what Dan confirmed about this app (2026-07-16):
  - **`style-src` — effectively off the table.** The repo uses **inline `style=` attributes pervasively**
    (React `style={{…}}` and JSP `style="…"`), and **that will not change**. So if `style-src` is ever
    added it **must** include `'unsafe-inline'` — a strict style-src would break the whole UI, and the
    inline styles won't be refactored. Low payoff; essentially skip.
  - **`img-src` — must allow `data:`.** Besides self (`static/`), the TS converts some **Plotly plots to a
    PNG and sets `<img src="data:…">`** (to drop the Plotly plot from the DOM), so `data:` is required.
    Also enumerate reCAPTCHA images (`www.gstatic.com`) and any Google Analytics pixel.
  - **`connect-src` — enumerable if we decide it's worth it.** Covers self (all webservice calls) plus
    whatever Google Analytics and reCAPTCHA fetch — those two are **unconfirmed** and would need a quick
    investigation before enforcing.
  - **`font-src` — easy / restrictive.** The app currently uses **no custom (web/@font-face) fonts**, so
    `font-src 'self'` (or even tighter) is safe today. Re-check if fonts are ever added.
  - **`frame-src` — must not break reCAPTCHA.** The **only iframe in the app is reCAPTCHA**, so `frame-src`
    must allow the reCAPTCHA frame origins (`https://www.google.com` and/or `https://www.recaptcha.net`).
    Test reCAPTCHA (v2) after adding — this is the one that can break it. (Distinct from `frame-ancestors`
    — already set as a response header, §1 — which is who may frame *us*.)
  - **`default-src`** — the fallback for everything above; add last, once the specific fetch directives are
    settled (otherwise it silently blocks whatever you forgot).
  - Roll these out via the **`Content-Security-Policy-Report-Only`** HTTP header first (meta tags can't be
    report-only), watch the console / a `report-to` endpoint for violations across the whole app, then
    enforce.

  *Provenance:* the `img`/`connect`/`frame` source lists are categories to inventory, **not** a
  verified-complete list — a full source audit has not been done (Google Analytics and reCAPTCHA fetch/
  frame targets in particular are unconfirmed).
