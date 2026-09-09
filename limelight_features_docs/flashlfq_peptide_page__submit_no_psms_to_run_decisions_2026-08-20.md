# Peptide-page (per-search) FlashLFQ submit — "no PSMs to a run" handling — DECISIONS (2026-08-20)

**Status: RESOLVED (Dan, 2026-08-24) — build not yet started.** All questions settled; Q-C resolved to a
variant of C-opt3 (hash sentinel + view excludes it), with **NO** alert/banner (see §5). Q-A/Q-B/Q-D follow
their recommendations. Surfaces every load-bearing choice as a question with `file:line` grounding.

**Scope (LOCKED):** the **peptide-page / per-search** submit path only —
`…/rest_controllers/multiple_project_search_id/FlashLFQ_Run__Request_Creation_RestWebserviceController.java`
and its FE (webservice-call, hash producer + submit UI, prototype quant view). This is the SECOND submit path;
the project-page path is already built (`quant_add_new__submit_no_psms_to_run_decisions_2026-08-20.md`) and is
**out of scope** here. **Do NOT modify the project-page controller or the shared gather service** — both are done.

**Provenance:** each load-bearing claim is tagged **OBSERVED** (`verified: file:line`, read this session) or
**inferred** (analysis). Keying-plan file references were re-confirmed against current source (that doc drifts).

---

## 0. Carry-over decisions from the project-page round — and whether each maps here

| Project-page decision | Maps to peptide-page? |
|---|---|
| Per-run trigger (a no-PSMs *run* = no PSMs to it); never send an empty run | **YES.** This path is **always per-file** (`:603` loop; no JOINT), so **every** empty file is genuinely a no-PSMs run — the §3/MBR-empty-file complication does **not** apply. *(OBSERVED — single-file fan-out, MBR off.)* |
| Reuse the gather signal `GatherPsms_Result{searchScanFileIds_WithPsms}` (no re-detection) | **YES** — see Q-A. The controller already calls gather (statement-form, discards the return, `:589-594`); this round captures it. No gather-service change. |
| A **separate** no-PSMs list on the response, kept **distinct from send-failure** | **YES** — see Q-A. Note the send-failure model **differs**: project-page = whole-submission fail-fast; **peptide-page = per-entry `status`** (`:617`), so a send failure is a `perSearchResult` with `status=false`, not a missing list. The separate no-PSMs list keeps the two cleanly distinct. |
| `<psid>_<ssfid>_noPsms` hash sentinel | **PARTIALLY / contested** — see Q-C. The project-page hash feeds a **persistent runs-list + deferred** matrix view (so the sentinel must survive to a future view); the peptide-page hash feeds a **live, throwaway** view (`quant_PrototypeData.ts`) that would **misrender** a sentinel as `NOT_FOUND` unless changed. Whether the sentinel maps depends on the Q-C choice. |
| Whole-zero → a no-quant message | **YES, with a twist** — see Q-A. This controller has **no** whole-zero flag today, and its FE currently shows **"unexpected response"** for an empty `perSearchResults` (`InitiateAndShowResult.ts:110-113`) — a misrender for the all-empty case. |

---

## 1. Verified anchors (re-confirmed against current source, 2026-08-20)

| Fact | Location | Status |
|---|---|---|
| Gather already returns `GatherPsms_Result{ Set<Integer> searchScanFileIds_WithPsms }` (Phase-1, shared) | `FlashLFQ_Run_GatherPsms_And_SendRequest_Service.java:782-789` | **OBSERVED** |
| This controller calls gather **statement-form** (discards the return) | `FlashLFQ_Run__Request_Creation_RestWebserviceController.java:589-594` | **OBSERVED** — only needs to capture it |
| Controller has the per-search **scan-file map** (the empties denominator) | same file `:444` (`gatherScanFiles`), `:593` (`getScanFileMapForSearchId(searchId)` passed to gather) | **OBSERVED** |
| Silent empty-drop, no flag; per-file fan-out loop | same file `:598-599` (drop comment), `:603` (loop over `perFile_Holder.getPerFileList()`) | **OBSERVED** |
| **Per-entry** status (NOT fail-fast): each run's `status` set individually, loop continues | same file `:614-623` (`perSearchResult.status = sendResult.status` at `:617`) | **OBSERVED** |
| Response DTOs: `WebserviceResult { perSearchResults, rejectReason }` | same file `:754-770` (`perSearchResults` `:758`, `rejectReason` `:762`) | **OBSERVED** |
| `WebserviceResult_PerSearch { projectSearchId, searchScanFileId, status, requestId, failedToConnectToWebservice, httpStatusCode_Not_200_OK }` | same file `:772-799` | **OBSERVED** |
| FE webservice-call Result type: `perSearchResults?` + `rejectReason?` (optional), **no runtime validation** (raw `resolve(responseData)`) | `flashLFQ_Run_RequestCreation_WebserviceCall.ts:52-58`, `:88-89` | **OBSERVED** |
| FE hash producer + submit UI = a **`window.alert`** throwaway: builds `hashPairs` from `perSearchResults` where `status && requestId`, `-`-joined, **NO `qr;` marker**, set to `window.location.hash` | `flashLFQ_Run_RequestCreation_InitiateAndShowResult.ts:132-144` (build+set), `:147-163` (alert) | **OBSERVED** |
| FE `_showResult` shows **"unexpected response"** when `perSearchResults` is empty | same file `:110-113` | **OBSERVED** — misrenders the all-empty case |
| Live view: hash → pairs → **batch status per requestId**; an unknown requestId → `NOT_FOUND` → `unavailableRuns` banner | `quant_PrototypeData.ts:299-306` (parse), `:378-403` (status; absent→`NOT_FOUND` at `:393`), `:165`/`:419` (`unavailableRuns`) | **OBSERVED** — a raw `noPsms` sentinel would land here |
| Live view: a scan file with no run → cell resolves to no records → **blank** (indistinguishable from "not detected") | `quant_PrototypeData.ts:269-280` (`_resolveScanFileId`), `:215` (`size===0 → undefined → blank`) | **OBSERVED** |
| Shared hash parser (peptide-page = no marker; viewer = `qr;`) — sentinel parses as a normal non-empty requestId | `quant_RunHash_Parse.ts:39-58` | **OBSERVED** — no change needed |

---

## 2. What happens TODAY (baseline)

- Per search, gather fills `perFile_Holder`; the per-file loop (`:603`) sends **one run per non-empty file**. A
  scan file with no passing PSMs never enters the holder → **silently dropped**, no marker (`:598-599`).
  *(OBSERVED.)*
- Response = `{ perSearchResults:[…ran runs, each with per-entry status…], rejectReason:null }`. A no-PSMs file
  is simply **absent** from `perSearchResults`. *(OBSERVED.)*
- FE `_showResult`: builds the hash from successful runs, `window.alert`s the submitted/failed runs. If
  `perSearchResults` is **empty** → **"unexpected response from the server"** (`:110-113`) — wrong for
  all-empty. *(OBSERVED.)*
- Live view (`quant_PrototypeData`): a no-PSMs scan file has no run → its per-search / per-sub-group cell is
  **blank**, indistinguishable from "peptide not detected." *(OBSERVED.)*

---

## 3. Q-A — Response representation (mirror the project-page list; does it need a whole-zero flag?) — **surface, don't decide**

**Gather signal sufficiency (confirmed):** the controller has the per-search **scan-file map** (`:444`,`:593`) and
gets `searchScanFileIds_WithPsms` from gather. So **`emptyMapped = scanFileMap.keySet() − searchScanFileIds_WithPsms`**
per search. *(OBSERVED the inputs exist; the denominator choice is the design decision below.)*

**A.1 — the empties denominator (peptide-page-specific).** Unlike the project-page (user-**mapped** subset), this
path has no user mapping — it runs **every** scan file of the search. So the denominator = **all the search's scan
files** (`scanFileMap.keySet()`). This is correct because the §5 gate guarantees a runnable multi-file search's
sub-groups **partition** its scan files 1:1 (each scan file → one sub-group → one run), and a single-file search
has exactly one. *(inferred from the §5 gate semantics + keying plan §6; the gate enums are OBSERVED at
`…Controller.java:729-752`.)* **Recommendation:** denominator = the search's full scan-file set. *(Flag: if a
search could ever have a scan file that belongs to no sub-group and is intentionally not run, that file would be
mis-counted as "no PSMs" — the gate appears to preclude this, but confirm.)*

**A.2 — where the no-PSMs list goes.**
- **A-opt1 (Recommended) — a separate `List<WebserviceResult_NoPsmsPair> noPsmsPairs` on `WebserviceResult`**
  (`{projectSearchId, searchScanFileId}`, no run fields), mirroring the project-page 1:1. `perSearchResults` keeps
  its "one entry per **sent** run (with per-entry status)" meaning, so a no-PSMs file (separate list) can never be
  confused with a send-failed run (`status=false` entry in `perSearchResults`). Additive. *(Same shape/name as the
  project-page `WebserviceResult_NoPsmsPair` — cross-path consistency.)*
- **A-opt2 — a `noPsms` boolean on `WebserviceResult_PerSearch`** (entry present, no requestId). **Rejected:** the
  FE builds the hash / success list from `status && requestId` and a no-PSMs entry has neither — it would need
  special-casing everywhere `perSearchResults` is walked; the separate list is cleaner and matches the sibling path.

**A.3 — whole-zero (all files empty).** This controller lacks a whole-zero flag, and the FE currently misreads an
empty `perSearchResults` as "unexpected response" (`:110-113`).
- **A-opt3 (Recommended) — NO new flag; derive it.** all-empty = `rejectReason==null` **AND** `perSearchResults`
  empty **AND** `noPsmsPairs` non-empty. The FE shows a "no PSMs — nothing to quantify" message for that case
  (and keeps "unexpected response" only for the genuinely-degenerate `perSearchResults` empty **AND** `noPsmsPairs`
  empty). Avoids a redundant flag.
- **A-opt4 — add a `noPsmsToQuantify` boolean** to mirror the project-page exactly. Works, but redundant here since
  `noPsmsPairs` already carries the information; listed for cross-path symmetry.

---

## 4. Q-B — Hash producer (add sentinel entries the same way, IF Q-C keeps the sentinel) — **re-confirmed**

The hash producer is **`flashLFQ_Run_RequestCreation_InitiateAndShowResult.ts` `_showResult`** (`:132-144`,
**OBSERVED**) — builds `hashPairs` = `<psid>_<ssfid>_<rid>` from successful `perSearchResults`, `-`-joined, set to
`window.location.hash` (**no `qr;` marker** — this page's hash is markerless; `quant_RunHash_Parse` handles both).
Adding sentinel entries = for each `noPsmsPairs` entry, push `<psid>_<ssfid>_noPsms` alongside the real ones. The
shared parser needs **no change** (`quant_RunHash_Parse.ts:39-58` — sentinel parses as a normal non-empty
requestId). **This step is only performed if Q-C chooses to put sentinels in the hash (C-opt1 / C-opt3).**

---

## 5. Q-C — View (the biggest peptide-page-specific question) — **RESOLVED (Dan, 2026-08-24)**

**RESOLVED → a variant of C-opt3, with NO alert and NO banner.** The no-PSMs cell simply stays **BLANK** (the
shared **peptide + protein** view path, `quant_PrototypeData.ts:215,:249,:269-280`); there is **no** banner, no
in-cell marker, and **no** submit-time alert. But the **hash DOES carry `<psid>_<ssfid>_noPsms` sentinels** — so
the page knows a `(projectSearchId, searchScanFileId)` combo *never* has quant, and that survives reload. The
view **recognizes the sentinel and EXCLUDES it from the batch-status call** (`:378-403`), so it never becomes a
spurious `NOT_FOUND`→"unavailable" (`:393`,`:165`) — the cell falls through the existing no-record path to blank.
The all-empty case builds the hash from sentinels, navigates, renders all blank, and shows **no error** (fixing
today's "unexpected response" bug at `InitiateAndShowResult.ts:110-113`); "unexpected response" is kept only for
`perSearchResults` empty **AND** `noPsmsPairs` empty. *(This drops C-opt2's alert and C-opt1's banner; it keeps
C-opt3's hash-sentinel + view-exclude, and adds the all-empty fix.)*

Original options (for context):

**The problem:** unlike the project-page (deferred matrix view), the peptide-page quant view is **LIVE** and
**throwaway** (`quant_PrototypeData.ts`, explicitly "Delete this module once Track B lands"). The hash directly
drives it: each pair's requestId is sent to the **batch status** webservice (`:378-403`). A raw `noPsms` sentinel
requestId would come back **`NOT_FOUND`** (`:393`) and render in the **`unavailableRuns`** "no longer available /
never existed" banner (`:165`,`:419`) — a **misrender** (a no-PSMs file is not "unavailable"). And a no-PSMs
scan file's table cell is already **blank** (`:215`,`:269-280`), indistinguishable from "not detected."

**Options:**
- **C-opt1 — surface "no PSMs" in the LIVE view now.** Hash carries `_noPsms` sentinels; `quant_PrototypeData`
  recognizes them (filter before the status call), adds a new `noPsmsRuns` bucket + an in-page banner ("N scan
  file(s) had no PSMs — no quant"), and the table shows a distinct "no PSMs" marker for that sub-group cell.
  **Most faithful to the user, but real feature work inside a module slated for deletion** (Track B).
- **C-opt2 (Recommended) — defer the in-view rendering; surface no-PSMs at SUBMIT time only.** Do **NOT** put
  sentinels in the peptide-page hash (hash stays "ran runs only," unchanged). Add a **"No PSMs (not run)"**
  section to the submit **`window.alert`** (the natural, already-present feedback on this throwaway path). The
  live view is **unchanged** — `quant_PrototypeData` needs **no** change, and a no-PSMs scan file simply shows no
  quant (as today), but the user was told at submit time. **Rationale:** proportionate for a doomed prototype;
  the carry-over "sentinel in hash" decision does **not** cleanly map here (the peptide-page hash is an ephemeral
  live-view selector, not a persistent handle feeding a future view). Trade-off: no-PSMs info is not re-derivable
  after the alert is dismissed / on reload.
- **C-opt3 — hash-aware, view-skip (middle).** Put `_noPsms` sentinels in the hash (parity with the project-page)
  **and** make `quant_PrototypeData` **filter them out** before the status call (skip — no status query, no
  banner), so they never misrender. Carries the info in the URL for a future/Track-B view without building the
  banner now. **~3-line view change** (`_parseHash_ToPairs` / `_load_StatusThenResults`: drop pairs whose
  `requestId === "noPsms"`). Trade-off: a sentinel in the URL that currently renders nothing.

**Recommendation:** **C-opt2** — alert-only, no hash sentinel, `quant_PrototypeData` untouched — as the
proportionate choice for a throwaway view; fall back to **C-opt3** if Dan wants hash parity with the project-page
(then the view must at least skip the sentinel to avoid the `NOT_FOUND` misrender). **C-opt1 only if** we want the
live prototype to actively show "no PSMs" before Track B.

---

## 6. Q-D — FE scope + edge cases

**FE files that change (mapped from the project-page set — note this path has NO runs-list/SubmittedRun model):**

| Project-page FE | Peptide-page equivalent | Change |
|---|---|---|
| `…ToServer.ts` (validated) | `flashLFQ_Run_RequestCreation_WebserviceCall.ts` | Add `noPsmsPairs?` to the Result type (+ element interface). **No runtime validation exists in this file** (throwaway; raw cast `:88-89`) — match its style, but **flag** the divergence from the house off-the-wire-validation rule. |
| `SubmitRun_Component.tsx` (hash build + submit UI) | `flashLFQ_Run_RequestCreation_InitiateAndShowResult.ts` | Add the alert "No PSMs (not run)" section (all Q-C options); reorder `_showResult` so all-empty (A.3) is a proper message, not "unexpected response"; **append `_noPsms` hash entries only for C-opt1/C-opt3**. |
| `BuildRunHash.ts` (sentinel const) | *(inline in `InitiateAndShowResult.ts`)* | C-opt1/C-opt3 only: reserve/consume a `"noPsms"` constant (could import the project-page's `projPg_Quant_BuildRunHash__NO_PSMS_REQUESTID_SENTINEL`, or define a local one — **decide one shared home**). |
| `SubmittedRun.ts` (data model) | *(none — this path has no persistent runs-list/model; state = URL hash + ephemeral alert)* | — |
| `RunsList_Component.tsx` (count cell) | *(none)* | — |
| `quant_PrototypeData.ts` (view) | same | C-opt2: **unchanged**. C-opt3: filter out `requestId==="noPsms"` before the status call. C-opt1: filter + new `noPsmsRuns` bucket + banner. |
| `quant_RunHash_Parse.ts` | same (shared) | **No change** (sentinel parses cleanly). |

**Backend file:** `FlashLFQ_Run__Request_Creation_RestWebserviceController.java` — capture the gather return,
compute `emptyMapped` per search (A.1), populate `WebserviceResult.noPsmsPairs` (A-opt1), add
`WebserviceResult_NoPsmsPair`. *(Do NOT touch the shared gather service or the project-page controller.)*

**Edge cases (mirror the project-page):**
- **all-empty** (every scan file of every selected search had no PSMs): `perSearchResults` empty + `noPsmsPairs`
  non-empty → the "no PSMs — nothing to quantify" message (A.3); **no** hash set; nothing sent. *(Fixes today's
  "unexpected response" misrender.)*
- **partial**: some files ran (in `perSearchResults`, hashed + shown) + some had no PSMs (in `noPsmsPairs`,
  surfaced per Q-C). No orphaned service call — a no-PSMs file is never sent (the per-file loop only iterates
  non-empty holder entries, `:603`). *(OBSERVED by construction.)*
- **no-PSMs vs send-failure**: a send-failed run is a `perSearchResults` entry with `status=false` /
  `failedToConnectToWebservice` / `httpStatusCode_Not_200_OK` (`:617-620`); a no-PSMs file is in the separate
  `noPsmsPairs`. Cleanly distinct.

---

## 7. STOP

Settle Q-C first (it decides whether the hash gains a sentinel and whether the throwaway view changes), then
Q-A / Q-B / Q-D. **Do not build.** Do not touch the project-page controller or the shared gather service.
The reviewing claude pressure-tests every choice and anchor against source before any code.
