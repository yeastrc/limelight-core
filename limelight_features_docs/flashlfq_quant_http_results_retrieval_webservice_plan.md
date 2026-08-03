# FlashLFQ quant — HTTP results-retrieval webservice (demo bridge) — executable plan

**Status:** PLANNED, not started. Self-contained pick-up spec (safe to `/clear` and resume from this file).
**Plan revised:** 2026-08-03 session (transport shape decided = **B**; **done-marker** completion signal added;
four-state status model replaces bare-404; FE reload-sentinel bug (#1) folded in). **A separate Claude will
implement** — this doc is the whole brief.
**Scope class:** *Demo bridge — NOT the final solution.* Explicitly a stopgap that lets the FlashLFQ quant
prototype run on the real server (where **Tomcat and the FlashLFQ service run on different computers**). The
durable fix remains **Track B**, described next, which this does not build.

### Track B (the real solution — context, still pending discussion)
The permanent path does **not** involve the webapp fetching FlashLFQ files at all: the **`run_importer`** program
will invoke a new program that **runs FlashLFQ and loads its results into the database**. The webapp then reads
quant from the DB like any other data — it **never sees the FlashLFQ service's output files or this HTTP
bridge**. So everything in this plan is disposable at Track B. (The one piece that carries forward as good
practice regardless of who runs FlashLFQ is the **done-marker** in §2a — a file-based completion signal any
consumer wants.)

---

## 0. TL;DR — what we're building and why

Today the quant prototype only works on the dev box because of a **filesystem symlink**: a Tomcat context
`webapps/flashlfq_test_files/` is symlinked to the FlashLFQ service's `finaldir`, and the front end fetches the
raw result file directly at `/flashlfq_test_files/<requestId>/flashlfq_output/QuantifiedPeaks.tsv`. That
requires Tomcat and the service's output directory to sit on the **same host**, exposes the entire `finaldir`
tree **unauthenticated**, and overloads a single **HTTP 404** to mean five different things (still processing,
failed, swept, wrong id, service down).

Replace it with an **authenticated HTTP retrieval path** plus a **reliable completion signal**, so it runs
cross-host and tells the user a truthful per-run status:

1. **FlashLFQ Python service** — (a) write a small atomic **done-marker** when a run finishes (success or
   failure) so completion is race-free and failures are distinguishable from still-running; (b) add a
   **status** endpoint (single + batch) reporting `READY | PROCESSING | FAILED | NOT_FOUND`; (c) add a
   **result** endpoint that streams one run's raw `QuantifiedPeaks.tsv`.
2. **Limelight webapp** — add **two** REST proxy controllers under `/d/rws/...` (a batch **status** proxy and a
   single-run **result** proxy) that authenticate the viewer (**read-level**, per `projectSearchId`) and relay
   the service's bytes.
3. **Front end** — rework `quant_PrototypeData.ts`: one **batch status** call, then fetch the raw TSV only for
   `READY` runs; map the other statuses to distinct UI messages; retire the symlink.

### Decisions already made (2026-08-03)
- **Transport shape = B (two endpoints): status, then data.** A cheap status call (batchable to one call for all
  runs) drives the UI; the result endpoint stays a **raw-TSV file serve** (no JSON-wrapping the TSV). Chosen over
  the JSON-envelope shape (A) and the response-header shape (C) because raw-TSV is what **Track B's DB ingest
  wants too**, and it keeps the bytes un-re-encoded. (Size note: JSON-escaping a TSV only inflates ~5–15% — tabs
  and newlines each cost one byte, no quotes/backslashes in this data — so A was viable; B is preferred for the
  raw-passthrough/Track-B alignment, not size.)
- **Completion signal = a done-marker file** (`flashlfq_run_status.json`, written atomically **last**). Its
  *presence* means "run complete"; its *content* says success vs failure. This is the standard file-based-app
  "write a tiny final DONE file" pattern; here it carries a few bytes of terminal status so `FAILED` is
  distinguishable from `PROCESSING`.
- **Retrieval auth level = read-level, per search** (`validatePublicAccessCodeReadAllowed`), NOT owner. Run
  *creation* stays project-owner-only (unchanged). Rationale: the goal is "available to more users" for a demo,
  and today's symlink is effectively public-read already. Accepted caveats in §6.

### Work order for the implementing session
- **§2 (service)** — no WAR, independently `curl`-verifiable. Do first.
- **§3 (front end)** — writable + type-checkable now, but **functionally blocked on §4**: the FE now targets
  `/d/rws/...`, so it has nothing to talk to until the controllers exist (unlike the old standalone symlink
  fetch). Write it and type-check/FE-build it; full end-to-end test waits for §4.
- **§4 (controllers)** — **requires the full WAR build, which logs you out. STOP and ask Dan before running it.**
- Keep the `flashlfq_test_files` symlink in place until §3+§4 are verified (retiring it early makes quant go dark).

---

## 1. Current state — exact anchors (verify line numbers by grepping symbols; they drift)

### 1a. FlashLFQ Python service
Repo: `/data/code_checkouts/Github/limelight-flashlfq-service/GIT_CLONE/limelight-flashlfq-service`
(git-init'd, **NOT committed**; Python/Flask/Docker; sibling of the blib / feature-detection services.
Caveat: minimal-directive prototype — treat as not-yet-production; the §2a robustness fix is part of this work.)

- **`app/web_listener.py`** — `create_app(config)` builds the Flask app. Currently exposes exactly two routes:
  - `GET /health` → `{"status":"ok"}`
  - `POST /requestNewFlashLFQRun` → parses body to `FlashLFQRunRequest`, spawns a background thread
    (`_safe_process` → `request_processor.process_request`), returns `{"request_id": <uuid4 hex>}` immediately.
  - **There is NO endpoint to read results back, and NO completion signal.** These are the gaps.
  - `_safe_process(config, run_request, request_id)` (~line 59) currently just **logs** on exception — it writes
    **no marker**, so a failed run is indistinguishable from a still-running one. §2a fixes this.
- **`app/request_processor.py`** `process_request(config, run_request, request_id)`:
  - `run_dir = os.path.join(config.finaldir, request_id)`; `flashlfq_out_dir = <run_dir>/flashlfq_output`.
    Both dirs are `os.makedirs(..., exist_ok=True)` **up front** (~lines 43–47) — so their *existence means
    nothing about completion*; only the marker (§2a) does.
  - Result file the FE consumes: **`<finaldir>/<request_id>/flashlfq_output/QuantifiedPeaks.tsv`**, written by
    FlashLFQ near the end of a successful run.
  - Runs FlashLFQ via `_run_flashlfq(...)` (~line 141), which returns the process `returncode` (0 = success;
    also returns `-1` if the executable is missing). `process_request` does not currently branch on failure
    beyond an optional settings-verify — §2a adds the marker write here.
  - `config.flashlfq_run_enabled` (env `FLASHLFQ_RUN_ENABLED`, default true): when **false**, inputs + command
    are written but **no `QuantifiedPeaks.tsv` is ever produced**. The demo runs with it **true**.
- **`app/config.py`** — `Config` dataclass; `finaldir` from env `APP_FINALDIR` (default `./finaldir`);
  `service_port` from env `WEBAPP_PORT` (default `3434`). On the dev box `finaldir` is bind-mounted to
  `/spinning-disk-02/run-space--spinning-disk-02/Limelight/flashlfq-service-data/finaldir`.
- `request_id` is generated server-side as `uuid.uuid4().hex` → **32 lowercase hex chars**. Use that shape
  (`^[0-9a-f]{32}$`, **lowercase**) for every traversal-safety allowlist — keep the service and Java regexes
  **identical and lowercase** (see §6-D).

### 1b. Limelight webapp — the existing run-creation controller (model to copy)
`limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp/spring_mvc_parts/data_pages/rest_controllers/multiple_project_search_id/FlashLFQ_Run__Request_Creation_RestWebserviceController.java`
(NEW, held uncommitted). Relevant pieces to mirror:

- **Config key for the service base URL:** `ConfigSystemsKeysSharedConstants.RUN_FLASHLFQ_SERVICE_WEB_SERVICE_BASE_URL`,
  read via `configSystemDAO.getConfigValueForConfigKey(...)`. On the dev box this is `http://localhost:3434`.
- **The outbound HTTP call to mirror:** `sendRequestToServer(int projectSearchId, int searchScanFileId, byte[])`
  (~line 1334). It builds `webservice_Base_URL + WEBSERVICE_PATH`, opens an `HttpURLConnection`, and reads the
  response into a `ByteArrayOutputStream`. For retrieval we do **GET** variants of this (§4). Guard the base-URL
  join against a double slash if the configured value ends in `/`.
- **Path registration:** `@PostMapping(path = { AA_RestWSControllerPaths_Constants.PATH_START_ALL + <constant> })`.
- **Auth (creation):** `validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validateProjectOwnerAllowed(...)`.
  For **retrieval** use `.validatePublicAccessCodeReadAllowed(...)` instead (throwing validator; see webapp
  `CLAUDE.md` → Authorization → "REST controllers: use the throwing validator").
- **A cleaner single-search model to copy for the result controller's structure:** sibling read controller
  `.../rest_controllers/single_project_search_id/FlashLFQ_Quant__AnyScanFile_HasPsms_In_MultipleSubGroups__Single_ProjSearchID_RestWebserviceController.java`.

### 1c. Front end — the code to rework
`limelight_webapp/front_end/src/js/page_js/data_pages/quant/quant_PrototypeData.ts` (NEW, held uncommitted).

- `const _FLASHLFQ_TEST_FILES_URL_BASE = "/flashlfq_test_files";` (~line 34) and
  `_quantifiedPeaksUrl_ForRequestId(requestId)` (~line 483) — the symlink URL, to be replaced.
- `_fetchAndParse_ForPair(pair)` (~line 520) — `window.fetch(...)`; on `!response.ok` returns `null`
  (→ `notReadyRuns`); on ok, `response.text()` → `_parseText_ToParts`. **This function's blanket
  `.catch(e => null)` (~line 529) is the #1 bug** (see §3b): it would swallow the reload sentinel.
- `_parseHash_ToPairs()` (~line 496) parses `#<projectSearchId>_<searchScanFileId>_<requestId>-...` into
  `{ projectSearchId, searchScanFileId, requestId }`. **The FE already has `projectSearchId` next to each
  `requestId`** — no extra plumbing to auth per search.
- `quant_PrototypeData_Load()` (~line 560) is the singleton load-once entry (`_loadPromise` / `_instance` /
  `_onLoadedCallbacks`). **Preserve this load-once + in-flight-dedup contract** through the rework.
- `Quant_PrototypeData_NotReadyRun = { projectSearchId, requestId }` (~line 50) and `notReadyRuns` on
  `Quant_PrototypeData` drive the "not ready yet, reload" banner. §3 generalizes this to carry per-run status.

---

## 2. Piece #1 — FlashLFQ service  (DO FIRST; no WAR; curl-verifiable)

Three parts: (a) the done-marker + failure robustness, (b) the status endpoints, (c) the result endpoint. No
new deps (Flask + stdlib only). Keep `GET /health` and `POST /requestNewFlashLFQRun` unchanged.

### 2a. Done-marker + failure robustness  (`request_processor.py` + `web_listener.py`)

Write a tiny marker **as the final step** of a run, atomically (temp file + `os.replace`, which is atomic on
the same filesystem — the reader never sees a partial marker):

- **Marker file:** `<run_dir>/flashlfq_run_status.json`.
- **Content (terminal outcome only):** `{"status": "SUCCESS"}` when FlashLFQ returned 0 **and**
  `flashlfq_output/QuantifiedPeaks.tsv` exists; else `{"status": "FAILED", "detail": "<short reason>"}`
  (nonzero returncode, missing executable (`-1`), TSV absent, or `flashlfq_run_enabled=false` →
  `detail:"run disabled"`).

Helper (illustrative):
```python
import json, os

def _write_run_status_marker(run_dir, status_dict):
    #  Atomic: write temp in the same dir, then os.replace onto the final name.
    final_path = os.path.join(run_dir, "flashlfq_run_status.json")
    tmp_path = final_path + ".tmp"
    with open(tmp_path, "w") as fh:
        json.dump(status_dict, fh)
    os.replace(tmp_path, final_path)   # atomic on same filesystem
```

- In `process_request`, after the FlashLFQ run (or the disabled branch), compute success and call
  `_write_run_status_marker(run_dir, {...})` as the **last** statement. Because the marker is written *after*
  FlashLFQ finishes writing `QuantifiedPeaks.tsv`, "marker present + SUCCESS" guarantees the TSV is complete —
  this is what removes the half-written-file race.
- In `web_listener._safe_process`, on exception: `run_dir = os.path.join(config.finaldir, request_id)`,
  `os.makedirs(run_dir, exist_ok=True)`, then `_write_run_status_marker(run_dir, {"status":"FAILED",
  "detail": <exception summary>})` — so a crashed run reports `FAILED`, never eternal `PROCESSING`.

### 2b. Status endpoint (single + batch)  (`web_listener.py`)

The status is derived purely from the filesystem — no in-memory run registry needed:

```python
import os, re, json
from flask import Response, jsonify, request

_REQUEST_ID_RE = re.compile(r"^[0-9a-f]{32}$")   # uuid4().hex shape (LOWERCASE); blocks path traversal

def _status_for_request_id(config, request_id):
    run_dir = os.path.join(config.finaldir, request_id)
    if not os.path.isdir(run_dir):
        return {"status": "NOT_FOUND"}                        # never existed OR swept/GC'd (merged; §6-C)
    marker = os.path.join(run_dir, "flashlfq_run_status.json")
    if not os.path.isfile(marker):
        return {"status": "PROCESSING"}                       # run_dir exists, not yet complete
    try:
        with open(marker) as fh:
            data = json.load(fh)
    except (OSError, ValueError):
        return {"status": "FAILED", "detail": "unreadable status marker"}
    tsv = os.path.join(run_dir, "flashlfq_output", "QuantifiedPeaks.tsv")
    if data.get("status") == "SUCCESS" and os.path.isfile(tsv):
        return {"status": "READY"}
    return {"status": "FAILED", "detail": data.get("detail")}
```

Routes:
```python
@app.get("/flashLFQRunStatus")
def flashlfq_run_status():
    request_id = request.args.get("request_id", "")
    if not _REQUEST_ID_RE.match(request_id):
        return jsonify({"error": "invalid request_id"}), 400
    return jsonify({"request_id": request_id, **_status_for_request_id(config, request_id)})

@app.post("/flashLFQRunStatus")
def flashlfq_run_status_batch():
    body = request.get_json(force=True, silent=True) or {}
    request_ids = body.get("request_ids")
    if not isinstance(request_ids, list) or not all(isinstance(r, str) and _REQUEST_ID_RE.match(r) for r in request_ids):
        return jsonify({"error": "invalid request_ids"}), 400   # strict: any malformed id -> reject whole batch
    statuses = [{"request_id": r, **_status_for_request_id(config, r)} for r in request_ids]
    return jsonify({"statuses": statuses})
```

- **Status vocabulary (endpoint):** `READY | PROCESSING | FAILED | NOT_FOUND`. (Marker vocabulary is the
  terminal `SUCCESS | FAILED`; the endpoint adds `PROCESSING`/`NOT_FOUND` which can't appear in a marker.)
- **Batch is strict:** any malformed id → 400 for the whole batch. The FE only ever sends well-formed hex from
  the hash, so a malformed id signals a client bug or tampering. (De-dup `request_ids` before the walk if you
  like; harmless either way.)

### 2c. Result endpoint  (`web_listener.py`)

```python
@app.get("/flashLFQRunResult")
def flashlfq_run_result():
    request_id = request.args.get("request_id", "")
    if not _REQUEST_ID_RE.match(request_id):
        return jsonify({"error": "invalid request_id"}), 400
    result_path = os.path.join(config.finaldir, request_id, "flashlfq_output", "QuantifiedPeaks.tsv")
    if not os.path.isfile(result_path):
        return jsonify({"error": "result not found"}), 404      # now rare: FE only calls this for READY runs
    with open(result_path, "rb") as fh:
        data = fh.read()
    return Response(data, mimetype="text/tab-separated-values")
```

- **Only `QuantifiedPeaks.tsv` is ever served** (filename hardcoded). No filename param — that would reopen
  arbitrary-file exposure. **Traversal safety is the allowlist regex**, not string munging.
- Because the FE consults **status first** and only fetches `READY` runs, a 404 here is now a rare race
  (file swept between the status check and the fetch), not the normal not-ready signal.
- Service auth posture unchanged (no auth on the service; the docker/internal network is the isolation boundary
  and Limelight is the gate). Do **not** publish a public port for these routes.

### 2d. Verify the service
- `curl "http://localhost:3434/flashLFQRunStatus?request_id=<realHex>"` → `{"status":"READY"}` for a finished
  run; a submitted-but-unfinished id → `PROCESSING`; a bogus 32-hex id → `NOT_FOUND`; force a failure (or set
  `FLASHLFQ_RUN_ENABLED=false`) → `FAILED`.
- `curl -X POST .../flashLFQRunStatus -H 'Content-Type: application/json' -d '{"request_ids":["<hex>","<hex>"]}'`
  → `{"statuses":[...]}`.
- `curl "http://localhost:3434/flashLFQRunResult?request_id=<realHex>"` → 200 TSV; unknown id → 404;
  `?request_id=../foo` or `?request_id=x` → 400.
- The dev container is `flashlfq` (image `flashlfq-local:latest`), `docker run --network host` on the dev box.
  Editing `.py` requires a container restart unless Flask reload is on (auto-restarts `unless-stopped`).

---

## 3. Piece #3 — Front end: batch-status-then-fetch rework  (write + type-check now; end-to-end needs §4)

**File:** `quant_PrototypeData.ts`. Preserve the singleton load-once / in-flight-dedup contract (§1c).

### 3a. New load flow
Replace the "N parallel raw fetches" flow with **status-first**:

1. `_parseHash_ToPairs()` → pairs `[{ projectSearchId, searchScanFileId, requestId }]` (unchanged).
2. **One batch status call** to the Limelight controller (§4): `POST /d/rws/<status-path>` with body
   `{ runs: [ { projectSearchId, requestId }, ... ] }` (distinct is fine; `searchScanFileId` isn't needed for
   auth/status — keep it FE-side for tagging peaks later). Response: `{ statuses: [ { requestId, status,
   detail? }, ... ] }`.
3. **Per-run fetch only for `READY`**: `POST /d/rws/<result-path>` `{ projectSearchId, requestId }` → raw TSV
   text → `_parseText_ToParts(tsvText, pair.projectSearchId, pair.searchScanFileId)` (unchanged parser), tag
   peaks, merge (existing `_buildFromParts`). These K fetches can run in parallel.
4. Map every run's status to a UI bucket (below) and expose them on `Quant_PrototypeData`.

**Status → UI mapping.** Generalize `Quant_PrototypeData_NotReadyRun` into a per-run status record — e.g.
`Quant_PrototypeData_RunStatus = { projectSearchId: number, requestId: string, status: "PROCESSING" | "FAILED"
| "NOT_FOUND" }` — and group them for display (keep `notReadyRuns` as the `PROCESSING` subset for the existing
banner, or rename the banner input; the panel/column already read `notReadyRuns`, so keep that name populated
by `PROCESSING` to minimize churn, and add `failedRuns` / `unavailableRuns` alongside):

| status | meaning | UI |
|---|---|---|
| `READY` | file present & complete | fetch + parse (contributes quant) |
| `PROCESSING` | still running | existing "results not ready — reload later" banner (**unchanged**) |
| `FAILED` | run errored; will never succeed | **new** message: "this run failed" — reloading won't help (surface `detail` if useful) |
| `NOT_FOUND` | never existed or swept/expired | **new** message: "no longer available / expired" |

Keep messaging in-page (not `window.alert`/console-only) per `front_end/CLAUDE.md`.

### 3b. Error handling — fix #1 and honor the reload-on-403 contract
Two AJAX calls now hit **authenticated `/d/rws/...`** endpoints, so both can return 401/403/sync-mismatch.

- **#1 — do NOT let the reload sentinel be swallowed.** The old `_fetchAndParse_ForPair` wraps everything in a
  trailing `.catch(e => null)` (~line 529); a `throw`/reject *inside* the `.then` is caught there and turned
  into `null` → recorded as a not-ready run → **the reload never fires**. The rework must **detect HTTP status
  before any catch-all** and branch explicitly:
  - `response.status` in {401, 403} (or sync-tracking mismatch) → call
    `handleAJAXError(...)` (`page_js/common_all_pages/handleServicesAJAXErrors.ts`, which reloads on
    401 `no_session` / 403 `forbidden` / sync mismatch), then **reject with**
    `new WebserviceCallStandardPost_RejectObject_Class()` (the "already handled" sentinel — flows harmlessly
    through `reportErrorObjectToServer`). This rejection must **propagate**, not be caught-and-nulled.
  - A genuine **network error** (fetch rejects, no HTTP response) → still degrade gracefully (skip that run /
    mark it unavailable); that is the only case the old catch-all legitimately handled.
  - Apply the same discipline to **both** the batch-status call and each result fetch. For the **batch status**
    call, a 401/403 means the whole load reloads (correct). For a **result** fetch, a 401/403 likewise triggers
    the reload contract.
- **404 is no longer the not-ready signal.** Not-ready/failed/gone now come from the **status** response, not
  from HTTP 404. A rare 404 on a result fetch (swept between status and fetch) → treat as `NOT_FOUND`/unavailable.

### 3c. Cleanup
- Remove `_FLASHLFQ_TEST_FILES_URL_BASE` and `_quantifiedPeaksUrl_ForRequestId`; add the two `/d/rws/...`
  paths (leading `/limelight/...` context like other FE webservice calls — NOT under `/flashlfq_test_files`).
- Rewrite the module header comment (lines ~1–33) which documents the symlink/finaldir fetch — describe the
  status-then-result webservice flow and the four statuses instead. Keep the "THROWAWAY PROTOTYPE / delete at
  Track B" framing.
- Retire the Tomcat `flashlfq_test_files` symlink as a deploy step (§5) — **after** §3+§4 verify.

### 3d. Build + type-check
- Type-check with tsgo (memory `fast-typecheck-tsgo`) — exit 0. **Required params** on any new TS signatures;
  explicit `undefined` at call sites (no stray `?`).
- FE-only build+deploy from `front_end/`: `ant -f ant_buildFrontEnd_CopyToTomcat.xml` (~8–11s, dev mode, does
  NOT log you out). Note: this proves it **builds**; it can't be exercised end-to-end until §4 is deployed.

---

## 4. Piece #2 — Limelight webapp: two REST proxy controllers  (ASK DAN BEFORE THE WAR BUILD)

Two controllers (both `byte[]` in/out per house style; both authenticate read; both are **pure passthroughs**).
**NO TSV parsing in Java. NO mass computation.** Both validate the requestId shape server-side (defense in
depth) with the **lowercase** regex `^[0-9a-f]{32}$` (identical to the service — see §6-D). No sync-tracking
(these are read passthroughs; keeping it off lets the FE use lightweight fetches — see §3b).

### 4a. Batch status proxy  (spans projectSearchIds → `multiple_project_search_id/` package)
`.../rest_controllers/multiple_project_search_id/FlashLFQ_Run__Result_Status_RestWebserviceController.java` (NEW).
1. **Request:** `{ runs: [ { projectSearchId: int, requestId: String }, ... ] }`.
2. **Validate** every `requestId` against the lowercase regex → else `Limelight_WS_BadRequest_InvalidParameter_Exception`.
3. **Auth:** `validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds
   .validatePublicAccessCodeReadAllowed( <distinct projectSearchIds>, httpServletRequest )` (throwing; ends
   `NONE → Forbidden`).
4. **Proxy:** `POST <base>/flashLFQRunStatus` with `{ "request_ids": [<distinct requestIds>] }`; relay the JSON
   body bytes back unchanged (`ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(bytes)`). Do not
   parse it.
5. Catch `Limelight_WS_ErrorResponse_Base_Exception` → rethrow; catch `Throwable` → log +
   `Limelight_WS_InternalServerError_Exception` (same envelope pattern as the creation controller).

### 4b. Result proxy  (one projectSearchId + requestId → `single_project_search_id/` package)
`.../rest_controllers/single_project_search_id/FlashLFQ_Run__Result_Retrieval_RestWebserviceController.java` (NEW).
1. **Request:** `{ projectSearchId: int, requestId: String }`.
2. **Validate** regex → else BadRequest.
3. **Auth:** `.validatePublicAccessCodeReadAllowed( List.of(projectSearchId), httpServletRequest )`.
4. **Proxy GET:** `<base>/flashLFQRunResult?request_id=<requestId>`; `HttpURLConnection` `setRequestMethod("GET")`:
   - **200** → read body bytes → `ResponseEntity.ok().contentType(MediaType.parseMediaType(
     "text/tab-separated-values")).body(tsvBytes)`.
   - **404** → `ResponseEntity.status(404).build()` (rare race; FE treats as unavailable).
   - **other / connect failure** → `Limelight_WS_InternalServerError_Exception`.
5. Same catch/rethrow envelope as 4a.

### 4c. Paths + build
- Add two constants to `AA_RestWSControllerPaths_Constants.java` (already in the held/modified set), e.g.
  `FLASHLFQ_RUN__RESULT_STATUS__REST_WEBSERVICE_CONTROLLER` and
  `FLASHLFQ_RUN__RESULT_RETRIEVAL__REST_WEBSERVICE_CONTROLLER`; register each `@PostMapping` with
  `PATH_START_ALL + <constant>`.
- **Build (Java changed → full WAR):** from `limelight_webapp/`: `ant -f ant_build_War_CopyToTomcat.xml` (~45s;
  a WAR deploy **logs you out**). **Ask Dan before running it.**

---

## 5. Piece #4 — server/config deploy (not code)
- Point config-system value `run_flashlfq_service_web_service_base_url`
  (`ConfigSystemsKeysSharedConstants.RUN_FLASHLFQ_SERVICE_WEB_SERVICE_BASE_URL`) at the server's service URL
  (webapp→service reachable on the internal network — **now genuinely cross-host**; same pattern as blib /
  feature-detection). No new *public* port.
- Retire the Tomcat `flashlfq_test_files` symlink once §3+§4 verify.
- File-lifetime caveat: `finaldir` is transient (GC-able on `/spinning-disk-02`). Retrieval-on-demand requires
  the file to still exist when a user views the page — fine for a live demo, not durable (that's Track B). A
  swept run now reports `NOT_FOUND` (truthful) instead of a stuck "not ready" (§6-C).

---

## 6. Caveats / accepted risks (surface these; don't silently absorb)

- **6-A. requestId has no server-side project binding (cross-project read at read level). ACCEPTED for demo.**
  The service keys results by opaque `requestId` with no notion of which project/search it belongs to; the hash
  pairs `projectSearchId`↔`requestId` **client-side** only, and the auth checks read on *whatever projectSearchId
  the caller names*, not on the run's true search. Since public projects are anonymously readable, effectively
  **any caller who knows a 32-hex `requestId` can read that run's status/TSV** by naming any readable
  projectSearchId. This is ~the same trust model as today's fully-public symlink; the 122-bit uuid4 is what
  actually protects the data. **Not advertised to general users** (alt context; may not ship). Closed properly
  in Track B (DB records requestId→projectSearchId and the controller verifies).
- **6-B. Hash-vs-page projectSearchId divergence → possible reload loop. ACCEPTED for demo.** The fetch's
  `projectSearchId` comes from the URL **hash**, independent of the projectSearchIds the **page controller**
  validated (from the path). If a hash names a `projectSearchId` the viewer can't read, the webservice 403s →
  `handleAJAXError` reloads → the page re-validates against its *own* (readable) searches → renders → re-fetches
  the unreadable hash id → 403 → loop. Low-probability on the happy demo path (hashes are generated to match the
  page's searches); noted so the implementer knows §7's "no reload loop" claim is conditional on hash ⊆ page.
- **6-C. `NOT_FOUND` merges "never existed" and "swept/expired".** No tombstone is kept, so a GC'd run and a
  bogus id both report `NOT_FOUND`. Acceptable for the demo (both surface as "no longer available"). If
  distinguishing is wanted later, keep a tiny tombstone marker on sweep.
- **6-D. Regex must be identical + lowercase on both sides.** `uuid4().hex` is always lowercase; the service
  regex is `^[0-9a-f]{32}$`. Keep the Java regex the **same** (not `[0-9a-fA-F]`) so an uppercase id can't pass
  Java and then get a surprising 400/500 from the service.
- **6-E. Orphaned `PROCESSING`.** If the container dies mid-run *before* the marker is written (and outside
  `_safe_process`'s handler), the run shows `PROCESSING` indefinitely. The §2a failure-marker covers the normal
  exception path; a hard kill is an accepted demo edge.
- **6-F. Still throwaway.** Reads the service's transient `finaldir`; not persistence. Track B remains the real
  fix and the whole-feature commit gate.
- **6-G. Same-origin, no CSP change.** `/limelight/d/rws/...` is same-origin; no `connect-src` change needed.

---

## 7. Verification (curl + CDP harness + local DB; see memories)
Test infra: `headless-browser-cdp-test-harness` (logged-in owner via POST `admin/admin` to
`/limelight/user/rws/for-page/login`), `local-limelight-db-access` (MySQL db `limelight`). Deployed context is
`/limelight/`.

- **Service (independent, no WAR):** curl the status endpoint for a real requestId → `READY`; an unfinished →
  `PROCESSING`; a bogus 32-hex → `NOT_FOUND`; a forced failure / `FLASHLFQ_RUN_ENABLED=false` → `FAILED`;
  malformed/short id → 400. Batch POST → correct per-id statuses. Result GET → 200 TSV / 404 / 400. Confirm the
  done-marker appears exactly once, atomically, at run end.
- **FE build (no WAR):** tsgo clean; `ant -f ant_buildFrontEnd_CopyToTomcat.xml` succeeds. (Cannot be exercised
  end-to-end until §4.)
- **Webapp + FE (requires §4 WAR deploy):**
  - Logged-in **owner** on a run's peptide-page hash → Quant columns populate; network shows the batch
    `/d/rws/<status>` call then per-`READY` `/d/rws/<result>` calls (NOT `/flashlfq_test_files/...`).
  - **Read-only / anonymous** viewer on a **public** search with a valid hash → quant loads (proves "more users").
  - **PROCESSING** run → existing "not ready, reload" banner. **FAILED** run → new failed message.
    **NOT_FOUND** run → new unavailable message. All three come from the status response, not a 404.
  - **403 path:** a non-member (or project made non-public) → webservice 403 → `handleAJAXError` reload contract
    holds (page reloads to no-access), no reload loop **for a hash whose projectSearchIds ⊆ the page's** (see 6-B).
  - 0 console errors; tsgo clean.

---

## 8. Guardrails / house rules that apply here
- **All FlashLFQ code stays HELD / uncommitted** with the rest of the feature (commits together at the Track B
  gate) unless Dan says otherwise. This plan doc is committable with the doc set, but **do not `git commit`
  without a separate explicit go-ahead.**
- **No mass computation** anywhere in this work (global rule). None is needed — pure passthrough.
- **No TSV parsing in Java** — keep the demo bridge disposable; parsing stays in `quant_PrototypeData.ts`.
- **Required params** (no stray optional `?`) in any new TS signatures; explicit `undefined` at call sites.
- **Preserve the singleton load-once contract** in `quant_PrototypeData.ts`; keep any already-loaded fast-path
  synchronous (don't route through a Promise when nothing needs loading).
- **Ask before the WAR build** (§4) — it logs you out.

---

## 9. Held/uncommitted files this plan touches (all part of the existing held feature set)
- Service (untracked repo): `app/web_listener.py` (status + result routes), `app/request_processor.py`
  (done-marker), plus `_safe_process` failure-marker.
- Webapp (Java): NEW `FlashLFQ_Run__Result_Status_RestWebserviceController.java`,
  NEW `FlashLFQ_Run__Result_Retrieval_RestWebserviceController.java`;
  `AA_RestWSControllerPaths_Constants.java` (add two path constants).
- FE (TS): `quant_PrototypeData.ts`.
- Deploy/config: config-system `run_flashlfq_service_web_service_base_url`; retire `flashlfq_test_files` symlink.

## 10. Background docs to read on pick-up (committed unless noted)
- `flashlfq_quant_status_and_decisions.md` — living status / START HERE for the quant doc set.
- `flashlfq_quant_per_scanfile_run_keying_plan.md` — the per-(search, scan file) run keying + the hash format.
- `flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md` — the aggregation rule.
- `.claude/session_handoffs/flashlfq_quant_per_scanfile_run__2026-08-03.md` — latest feature pick-up state
  (gitignored, scratch).
- Root `CLAUDE.md` (Identifications data model), `limelight_webapp/CLAUDE.md` (Authorization: the throwing
  validator + reload-on-403 contract), `front_end/CLAUDE.md` (reject sentinel + reload-on-403 + no
  `window.alert`).
