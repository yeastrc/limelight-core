# Front end: the global error handler does not see unhandled promise rejections

**Status: DEFERRED — the maintainer has not decided whether to make this change (2026-11-16).** This doc records the
analysis and a proposed fix so the question does not have to be worked out again. It is not a task to start
without the maintainer's go-ahead: the change is app-wide (every page).

Line numbers are as of 2026-11-16 (HEAD `8f8382325`).

## How errors are reported today

1. **The house pattern** (see `limelight_webapp/front_end/CLAUDE.md`, "Error reporting"): async and handler bodies are
   wrapped in `try { … } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer({ errorException: e }); throw e }`.
   `reportErrorObjectToServer` (`page_js/common_all_pages/reportWebErrorToServer.ts:52`) shows the "Error in Page
   Code" overlay (`errorDisplay_WhenHave_Javascript_Typescript_Error()`, :138) and posts the error to
   `d/rws/for-page/log-browser-javascript-error`. So with this pattern, the error is reported and shown **before**
   the promise rejects.
2. **The global handler** `page_js/common_all_pages/limelight__catchAndReportGlobalOnError.ts`:
   - `init()` clears `window.onerror` (:34) and adds a listener for the window **`'error'`** event only (:36), which
     calls `reportErrorObjectToServer` with `e.error`.
   - `init()` is called from the page root init functions (30 files reference it).
   - Nothing in the front end listens for **`'unhandledrejection'`** (0 matches in `front_end/src/js`).
3. **`reportErrorObjectToServer` already skips** (early return, no overlay or report):
   - a `WebserviceCallStandardPost_RejectObject_Class` reject sentinel (:66), the "already handled" signal used after
     a standard AJAX error handler;
   - errors whose stack includes `chrome-extension://` (:73);
   - errors during page unload: `pagehide` (:82); within 5 s of `beforeunload` (:91) or of `visibilitychange` to
     hidden (:105).

## The gap

An exception thrown inside a `.then` callback or an `async` function does **not** fire the window `'error'` event.
It becomes an *unhandled promise rejection*, for which the browser fires a different event, `'unhandledrejection'`.

So any promise path **without** the house try/catch is completely silent: no overlay, no server report, and the
page carries on partly broken. Examples are a `.then` / `async` body that was not wrapped, or a rejection from a
third-party library (e.g. a Plotly promise).

This goes against the front end's intended behavior: an unexpected error should stop the page visibly, and the page
is then treated as untrusted and should be reloaded.

**Until this is fixed: wrap every `.then` / `async` body in the house try/catch.** It is the only thing that gets
those errors reported.

## Why a bare `'unhandledrejection'` listener would be wrong

With the house pattern, the rethrown error (`throw e`) *also* becomes an unhandled rejection. A listener that simply
called `reportErrorObjectToServer` would therefore report every already-reported error a **second** time (a second
server log entry and a second overlay call).

## Proposed fix (two small parts, both in `page_js/common_all_pages/`)

1. **Skip errors that were already reported** in `reportWebErrorToServer.ts`: a module-level `WeakSet` of
   reported error objects.
   - At the top of `reportErrorObjectToServer`, return early if the error object is already in the set. Otherwise
     add it and continue as now.
   - A rethrow passes the same object along, so the second report is skipped.
   - Only objects can go in a `WeakSet`. A non-object reason is never skipped.
   - The same check would also stop a double report of one error that reaches both listeners. Whether that happens
     today is not verified.
2. **Add the listener** in `limelight__catchAndReportGlobalOnError.init()`, next to the `'error'` listener and
   wrapped in try/catch the same way: `window.addEventListener('unhandledrejection', e => …)`, passing `e.reason`
   to `reportErrorObjectToServer`.
   - **A rejection reason is not always an `Error`.** `reportErrorObjectToServer` reads `errorException.message`
     when it builds the server request (:178).
   - For an `undefined` reason that read throws. The surrounding try (:163) / catch (:219) only logs to the console,
     so the overlay shows but nothing reaches the server log.
   - A string reason sends no message and "(no stack trace)".
   - So the listener should wrap a non-`Error` reason in an `Error` that carries its text, e.g.
     `new Error( "Unhandled promise rejection, reason: " + String( reason ) )`.

**Net effect:** errors that are reported today behave exactly as before. Only errors that are silent today become
reported. Webservice failures (sentinel), Chrome-extension errors and page-unload cases stay skipped by the existing
early returns.

## Rollout (to limit surprises)

- **Step 1: report only.** The new listener passes
  `skipDisplayErrorOverlay_SkipCall__errorDisplay_WhenHave_Javascript_Typescript_Error: true`. Users see no
  difference on any page. The server log shows what has been failing silently. The only change to existing behavior
  is the "already reported" early return.
- **Step 2: overlay on**, once step 1's findings are fixed or explained.

## Checks (for each step)

1. A throw inside an unwrapped `.then` / `async` body is reported **once**.
2. The house pattern (try / report / rethrow) is still reported **once**, not twice.
3. A webservice failure (`WebserviceCallStandardPost_RejectObject_Class`) is **not** reported.
4. A normal session on several page types produces no new reports, or only real errors, each then investigated.
5. A rejection with a non-`Error` reason (string, `undefined`) is reported with readable text.
