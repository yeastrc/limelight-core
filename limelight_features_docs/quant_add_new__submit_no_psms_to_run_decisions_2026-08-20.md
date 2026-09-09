# Add-New-Quant — PROJECT-PAGE submit "no PSMs to a run" handling — DECISIONS (2026-08-20)

**Status: RESOLVED (Dan, 2026-08-20) — building phased + STOP-gated.** All load-bearing questions are
settled (resolutions inline below). Phase 1 (backend) is the first build step.

**Resolutions (authoritative, Dan 2026-08-20):**
- **§3 / Q-JOINT → (b).** JOINT empty-file behavior stays as-is: an empty mapped file is silently absent
  from the joint run (no marker, no column). Option (a) (send empty-psms files so MBR infers a column) is
  **deferred to the view-matrix round** (needs external-C# verification; only renders there). So
  `noPsmsPairs` is a **PER_FILE-only** concept — JOINT never emits it.
- **Q-A → A-opt1.** `gatherPsms_ForSingleSearch` `void`→`GatherPsms_Result { Set<Integer>
  searchScanFileIds_WithPsms }`.
- **Q-B → B-opt1.** Separate `List<WebserviceResult_NoPsmsPair> noPsmsPairs` on `WebserviceResult`; rides on
  a success (`status=true`) response; `perPairResults` keeps its every-entry-has-a-real-requestId invariant.
- **Q-C → C-opt1 + C2-opt1.** Hash-encode a no-PSMs pair as `<psid>_<ssfid>_noPsms` (reserved `"noPsms"`
  constant in ONE shared place); FE holds them in a separate `noPsmsPairs` field, never polled.
- **Q-D.** Whole-zero (both modes) → keep today's `noPsmsToQuantify` message, no row. Partial PER_FILE → one
  row: ran pairs polled + no-PSMs pairs shown; count cell shows total with breakdown, e.g. `3 (1 no PSMs)`.

**Scope (LOCKED by Dan):** PROJECT-PAGE submit only —
`…/rest_controllers/other_like_project/Quant_AddNew_Submit_JointFlashLFQ_Run_RestWebserviceController.java`
and its FE overlay/runs-list/hash. Builds on the freshly-built, **UNCOMMITTED** run-model change (remove
Normalize; Route-A opt1 JOINT / opt2 PER_FILE; Route-B PER_FILE; per-pair response; per-pair hash). The
**peptide-page** submit (`…/multiple_project_search_id/FlashLFQ_Run__Request_Creation_RestWebserviceController.java`)
has the SAME gap but is a **separate later round** — do NOT modify it; the shared-gather change must stay
backward-compatible so it keeps working unchanged.

**Provenance convention:** each load-bearing claim is tagged **OBSERVED** (`verified: file:line`, read from
current source this session) or **inferred / unverified** (my analysis, or external-service behavior I could
not read here). Per Dan's global rule, structural claims (which id/column/return) are ground-truthed.

---

## 0. LOCKED by Dan (recorded, do not re-litigate)

1. **Trigger = NO PSMs to a SINGLE FlashLFQ RUN** (the *run* is the unit).
   - **JOINT** run (opt1, MBR on) → triggers **only when the WHOLE joint run has zero PSMs**. One empty file
     within a multi-file joint run is **not** a trigger (MBR is meant to infer its peaks — but see the
     ⚠ discovered gap in §3, which affects whether that rationale currently holds).
   - **PER_FILE** run (opt2 / Route B, MBR off) → triggers when **that file's single-file run** has zero PSMs.
   - When triggered, **never run FlashLFQ for that run (send nothing).**
2. **Detection lives at the PSM-gather point** — in the shared service
   `FlashLFQ_Run_GatherPsms_And_SendRequest_Service` — and the service **returns a signal** for a no-PSMs
   run rather than silently dropping it. **No pre-gather detection.**
3. Because the gather service is **shared** by both controllers, its no-PSMs change must be
   **additive / backward-compatible** — the peptide-page caller keeps working unchanged this round.
4. A no-PSMs run is **never sent** — this is **distinct** from the send-failure fail-fast path
   (whole-submission fail on a connect-error/non-200) added in the run-model round. Keep the two concepts
   separate in the response.

---

## 1. Verified anchors (re-confirmed against current source, 2026-08-20)

| Fact | Location | Status |
|---|---|---|
| Gather `gatherPsms_ForSingleSearch` returns `void`, fills the passed `perFile_Holder` | `FlashLFQ_Run_GatherPsms_And_SendRequest_Service.java:199-208` (sig), `:218-220` (whole-search-empty early `return`), `:542-551` (a `perFile` entry is created **only** when a PSM lands on it) | **OBSERVED** |
| A mapped file with no passing PSMs is **omitted** from the holder (emergent, no explicit signal) | same file — no entry is ever created for a file with zero PSMs (`:545` `if ( perFile == null ) …`) | **OBSERVED** |
| `sendOneRequest` (the single send) | same file `:592` | **OBSERVED** |
| `gatherScanFiles` resolves **every** scan file's spectr API key + filename for a search, **regardless of PSMs** | same file `:151-197` (loops all `SearchScanFileDTO` of the search) | **OBSERVED** — so the controller already has each empty file's `spectr_file_id` on hand |
| Peptide-page caller call is **statement-form** (return value discarded) | `FlashLFQ_Run__Request_Creation_RestWebserviceController.java:589-594` | **OBSERVED** — so `void`→object is source-compatible (Java lets a statement discard a returned value) |
| Peptide-page silently drops empty files, no flag | same file `:598-599` (drop comment), per-file loop `:603` | **OBSERVED** — out of scope; must not break |
| Project-page joint controller whole-zero flag | `Quant_AddNew_Submit_JointFlashLFQ_Run_RestWebserviceController.java:412` (`if ( spectral_data_WithProjectSearchId.isEmpty() )`) → `:419` (`noPsmsToQuantify = true`) → `:421` early return | **OBSERVED** — a **whole-submission**-zero flag |
| Empty mapped files are excluded from `spectral_data_WithProjectSearchId` | same file `:389-407` (built by looping `perFile_Holder.getPerFileList()`, which holds non-empty files only, then filtering to mapped) | **OBSERVED** |
| PER_FILE loop sends one run per **non-empty** file; empty mapped file gets **no** run / requestId / marker | same file `:441-466` | **OBSERVED** |
| JOINT sends one run over the non-empty list; empty mapped files are absent from `joint_spectral_data` | same file `:468-497` (`:471-475` builds the list from `spectral_data_WithProjectSearchId`) | **OBSERVED** |
| Response DTOs | same file — `WebserviceResult` `:574-597` (`status`, `perPairResults`, `failedToConnectToWebservice`, `httpStatusCode_Not_200_OK`, `noPsmsToQuantify`); `WebserviceResult_PerPair` `:604-640` | **OBSERVED** |
| Send-failure fail-fast (distinct from no-PSMs) | same file `:453-462` (PER_FILE), `:481-489` (JOINT) | **OBSERVED** |
| FE submit validator **requires** each `perPairResult.requestId` to be a **non-empty string** (throws otherwise) | `projPg_Quant_Submit_JointFlashLFQ_Run_ToServer.ts:162-164`; result shape `:57-63` | **OBSERVED** |
| FE model `PerPairEntry.requestId` is `readonly … string` (required) | `projPg_Quant_SubmittedRun.ts:47-53`; `getAggregateStatus` `:98-129` | **OBSERVED** |
| Runs-list poll gathers `requestIds` from `perPairEntries` and polls the batch status | `projPg_Quant_RunsList_Component.tsx:124-130`, `:154-156`; scan-file count cell `:239` | **OBSERVED** |
| Current FE no-PSMs handling = **whole-submission** flag → overlay message, **no runs-list row** | `projPg_Quant_SubmitRun_Component.tsx:189-191` (sets `_noPsmsToQuantify`), `:304` (overlay message); success path builds the row `:163-188` | **OBSERVED** |
| Hash builder joins `<psid>_<ssfid>_<requestId>` per entry, `-`-separated, `qr;` marker | `projPg_Quant_BuildRunHash.ts:55-66` | **OBSERVED** |
| Hash parser: `requestId` = everything after the 2nd `_`, must be **non-empty**; malformed entries skipped | `quant_RunHash_Parse.ts:39-58` (`:53` `requestId = substring(2ndUnderscore+1)`) | **OBSERVED** |

---

## 2. Baseline — what happens TODAY (so the delta is exact)

- **JOINT, whole submission empty** (no PSMs anywhere): `spectral_data_WithProjectSearchId.isEmpty()` →
  `noPsmsToQuantify = true`, nothing sent, early return (`:412-421`). FE sets `_noPsmsToQuantify`, shows the
  overlay "no quantifiable PSMs" message, adds **no** runs-list row. **This already matches the LOCKED JOINT
  trigger** (whole-joint-zero). *(OBSERVED.)*
- **JOINT, some files empty / some not:** the empty files are **dropped in gather** and never added to
  `joint_spectral_data`; the joint run is sent over the non-empty files only; `perPairResults` (and thus the
  hash) contains only the non-empty pairs. **The empty file is absent from the run entirely** — see §3.
  *(OBSERVED `:389-407`, `:468-497`.)*
- **PER_FILE, some files empty:** each empty file is silently dropped (never in `spectral_data_WithProjectSearchId`);
  no run, no requestId, no marker. `perPairResults` lists only the files that ran. The FE row shows only the
  ran pairs; the empty pair **vanishes**. **This is the gap this round makes explicit.** *(OBSERVED `:441-466`.)*
- **PER_FILE, all files empty:** same whole-zero path as JOINT (`:412`) → `noPsmsToQuantify`. *(OBSERVED.)*

---

## 3. ⚠ Discovered gap — JOINT + empty mapped file: MBR cannot infer for a file that is never sent — **RESOLVED → (b)**

**RESOLVED (Dan, 2026-08-20): option (b).** JOINT empty-file behavior stays exactly as-is (empty file
silently absent from the joint run — no marker, no column). Option (a) is deferred to the view-matrix round
(needs external-C# verification). `noPsmsPairs` is PER_FILE-only; JOINT never emits it.

**The LOCKED rationale for "one empty file in a joint run is NOT a trigger" is "MBR infers its peaks." But the
current code does NOT send an empty mapped file to the FlashLFQ service at all** — gather creates no
`perFile_Holder` entry for a file with zero PSMs (`…Service.java:542-551`, **OBSERVED**), so that file is
absent from `joint_spectral_data` (`…Controller.java:471-475`, **OBSERVED**). For FlashLFQ MBR to transfer an
identification INTO file X, file X must be **a file of the run** (its `spectr_file_id` present in
`spectral_data`), even with an empty `psms` list. **So as written, an empty-but-mapped file in a JOINT run
gets no spectra sent, no MBR target, and no output column — the locked "MBR infers its peaks" is not currently
realized.** *(The "empty file absent from run" chain is OBSERVED; that FlashLFQ MBR requires the file to be
present in the run is **inferred** from FlashLFQ MBR semantics — see the "verification gate" below.)*

**Decision needed (Q-JOINT):** for JOINT opt1, when a mapped file came up empty but the joint run has PSMs
from other files —
- **(a) Recommended — include the empty file in the joint run** with an **empty `psms` list** and its real
  `spectr_file_id` (available now via `gatherScanFiles`, `…Service.java:151-197`, **OBSERVED**), so MBR has a
  target and the output has a column for it. This makes the locked rationale real. It also means the empty
  file **does** appear in `perPairResults`/hash (with the shared joint requestId), so the view shows an
  MBR-inferred value, not "no PSMs."
- **(b) Accept the current behavior** — an empty file in a joint run is simply absent (no column, no MBR) this
  round; only *whole-joint-zero* is the no-PSMs case. Cheaper, but silently contradicts the locked rationale.

**Verification gate before building (a):** confirm against the **external FlashLFQ service** (separate C#
repo, NOT readable here) that (i) it accepts a `spectral_data` file whose `psms` array is empty, and (ii) MBR
then produces an `Intensity_scanfile_id_<searchScanFileId>` column for that file. If it rejects an empty-psms
file or produces no column, option (a) is not viable as-is and we fall back to (b) (or send a zero-psm file
only when ≥1 other file in the run has PSMs). **This is the single most important thing to settle** — the rest
of the round (PER_FILE markers, hash, view) is independent of it.

*(Note: this gap exists for JOINT only. PER_FILE is single-file runs with MBR off, so there is no
cross-file inference to preserve — an empty PER_FILE file is genuinely a no-PSMs run.)*

---

## 4. Q-A — What does the gather/send layer return, and where? (the "signal", per LOCK #2) — **RESOLVED → A-opt1**

Dan locked: detect at the gather point, **service returns a signal** rather than silently dropping. The
structural tension to reconcile: **the `perFile_Holder` already implicitly carries which files are non-empty**
(each `perFile` has a public `searchScanFileId`, and the controller already loops `getPerFileList()` at
`…Controller.java:389`, **OBSERVED**). So the controller *could* compute `empty = mapped − holderPresent` with
**zero** service change — but that is exactly the "silent inference" the lock wants to replace with an explicit,
named contract.

**Options:**
- **A-opt1 (Recommended) — change `gatherPsms_ForSingleSearch` from `void` to return a small result object**
  naming the files it populated, e.g.:
  ```java
  public GatherPsms_Result gatherPsms_ForSingleSearch( … same args … ) { … }
  public static class GatherPsms_Result {
      // search_scan_file_tbl.id of every file that received >= 1 PSM into the holder this call
      Set<Integer> searchScanFileIds_WithPsms;
  }
  ```
  The project-page controller then, per search, computes `emptyMapped = mappedForSearch −
  result.searchScanFileIds_WithPsms` and drives §5/§3 from it. **Additive & backward-compatible:** the
  peptide-page call is statement-form (`…Controller.java:589-594`, **OBSERVED**), so `void`→object does not
  break it. Honors the lock (explicit signal at the gather layer) and gives a named contract instead of an
  emergent set-diff.
- **A-opt2 — new tiny method** `whichFilesHavePsms( perFile_Holder )` (or have `sendOneRequest`
  short-circuit + signal on an empty run). More surface; `sendOneRequest` short-circuit doesn't fit because
  the controller must know emptiness **before** deciding to send (PER_FILE) or to synthesize a zero-psm entry
  (JOINT §3a).
- **A-opt3 — no service change; controller set-diffs the holder** (`mappedForSearch −
  {perFile.searchScanFileId}`). Simplest code, but this is the "silent drop / pre-controller inference" the
  lock explicitly rejects. Listed for completeness.

**Recommendation:** A-opt1. Return the **non-empty** set (what the holder actually knows first-hand); the
controller derives empties by set-difference against the user's mapped set (the mapped set is controller-only
knowledge — gather processes *all* the search's files, not just mapped ones, `…Service.java:199-208`). Note
this same signal feeds both PER_FILE markers (§5) and the JOINT zero-psm-file synthesis (§3a).

---

## 5. Q-B — Per-mode representation in the response (LOCK: keep no-PSMs distinct from send-failure) — **RESOLVED → B-opt1**

- **JOINT whole-zero:** **keep `noPsmsToQuantify`** exactly as today (`…Controller.java:412-421`, **OBSERVED**);
  it already means "the whole joint run had zero PSMs," which is the locked JOINT trigger. No change.
- **PER_FILE per-empty-file:** the response must mark each empty mapped file so one submission can be
  **part-runs, part-no-PSMs**, and read distinctly from a send failure. Options:
  - **B-opt1 (Recommended) — a SEPARATE list on `WebserviceResult`**, e.g.
    `List<WebserviceResult_NoPsmsPair> noPsmsPairs` where `WebserviceResult_NoPsmsPair = { projectSearchId,
    searchScanFileId }` (no requestId, no status). `perPairResults` keeps its invariant — **every entry has a
    real requestId** — so the FE validator's non-empty-requestId throw (`…ToServer.ts:162-164`, **OBSERVED**)
    and the `PerPairEntry.requestId: string` model (`SubmittedRun.ts:47-53`, **OBSERVED**) stay unchanged.
    Additive: old FE ignores the new field until updated.
  - **B-opt2 — widen `WebserviceResult_PerPair`** with a `boolean noPsms` and null `requestId`. **Rejected:**
    breaks the FE validator (throws on empty requestId), the required-requestId model, and the poll keying
    (`RunsList…tsx:124-130`) — far more invasive, and conflates "a run" with "no run."
  - **B-opt3 — reuse `noPsmsToQuantify` for partial PER_FILE.** **Rejected:** it is a whole-submission
    boolean; it can't carry *which* files were empty.
- **Distinct-from-send-failure:** send failure sets `status=false` + `failedToConnectToWebservice` /
  `httpStatusCode_Not_200_OK` and returns **no** per-pair results (fail-fast, `:453-462`). No-PSMs pairs ride
  on a **successful** response (`status=true`) alongside `perPairResults`. The two never share a field. *(This
  keeps LOCK #4.)*

**Recommendation:** B-opt1 — separate `noPsmsPairs` list; `perPairResults` stays "pairs that actually ran."
For a partial PER_FILE submission the success response carries both. For JOINT §3(a), an empty file that is
sent for MBR is a **ran** pair (shared requestId) → `perPairResults`, **not** `noPsmsPairs`.

---

## 6. Q-C — Interim hash marker + FE model + view "no-quant" state — **RESOLVED → C-opt1 + C2-opt1**

**Must not break** the existing per-pair parse `<psid>_<ssfid>_<rid>` (`quant_RunHash_Parse.ts:39-58`,
**OBSERVED**: `requestId` = everything after the 2nd `_`, must be non-empty), and the deferred matrix-join
must tolerate no-PSMs pairs.

**(C1) Hash encoding of a no-PSMs pair:**
- **C-opt1 (Recommended) — a reserved sentinel token in the requestId slot:** `<psid>_<ssfid>_noPsms`. The
  parser accepts it unchanged (non-empty requestId). Real requestIds are dashless hex, so `noPsms` is
  unambiguous; the view/join checks `requestId === "noPsms"` → render the no-quant state and skip any fetch.
  Keeps the 3-field format intact; minimal change (just a reserved constant + a consumer check). *(The token
  must not be valid hex — `noPsms` is safe.)*
- **C-opt2 — omit no-PSMs pairs from the hash** (today's behavior). **Rejected:** the view then can't show
  them (Dan wants "no quant / no PSMs passed" shown), and a future reload-restore loses them.
- **C-opt3 — a second hash marker segment** for no-PSMs pairs. **Rejected:** more format churn than a reserved
  requestId token buys.

**(C2) FE model — how a no-PSMs pair lives in `ProjPg_Quant_SubmittedRun`:** a `PerPairEntry` currently
*requires* a requestId and is *polled* by it (`SubmittedRun.ts:47-53`, poll gather `RunsList…tsx:124-130`,
**OBSERVED**). A no-PSMs pair has no run to poll. Options:
- **C2-opt1 (Recommended) — a separate `noPsmsPairs: Array<{projectSearchId, searchScanFileId}>` field on
  `ProjPg_Quant_SubmittedRun`**, parallel to `perPairEntries`. Never polled; `getAggregateStatus()` and the
  poll-requestId gather stay untouched; the row renders "N run, M no PSMs." Mirrors the response shape
  (§5 B-opt1) 1:1. Hash built from `perPairEntries` (real rids) **+** `noPsmsPairs` (each as
  `<psid>_<ssfid>_noPsms`).
- **C2-opt2 — a `PerPairEntry` with `requestId="noPsms"` and a pseudo-status** (e.g. `"NO_PSMS"`). **Rejected:**
  forces changes to `getAggregateStatus()` (`:98-129` — must not let it block `READY` or read as
  "not polled") **and** the poll gather (must exclude the sentinel from `requestIds`) **and** the validator —
  more edits, more footguns, than the separate list.

**(C3) View "no-quant" state:** the deferred matrix-join, when it encounters a pair whose requestId is the
`noPsms` sentinel, renders **"no quant — no PSMs passed filters"** for that (search, scan file) column and
issues **no** status/TSV fetch for it. The raw-TSV viewer likewise shows the pair as no-data. *(This is a
deferred-round obligation; this round's job is only to encode it so the join can tolerate it — matching the
run-model doc's "view-ready output" contract.)*

**Recommendation:** C-opt1 (sentinel token) + C2-opt1 (separate FE list). Reserve one constant
(`"noPsms"`) shared by the builder and the consumer.

---

## 7. Q-D — Edge cases — **RESOLVED** (see resolutions block at top; count cell shows `N (M no PSMs)`)

- **ALL no-PSMs (every run empty), both modes:** falls through the existing whole-zero path
  (`…Controller.java:412` — the assembled `spectral_data_WithProjectSearchId` is empty) →
  `noPsmsToQuantify=true`, **nothing sent**, early return. FE shows the overlay "no quantifiable PSMs" message
  and adds **no** runs-list row (today's behavior, `SubmitRun_Component.tsx:189-191,304`, **OBSERVED**).
  **Recommendation:** keep exactly this — do **not** create an all-`noPsms` row.
- **PARTIAL PER_FILE (some ran, some empty):** success response = `perPairResults` (ran, each with rid) +
  `noPsmsPairs` (empty). One runs-list row: `perPairEntries` (polled) + `noPsmsPairs` (shown, not polled). Hash
  carries both (rids for ran, `noPsms` sentinel for empty). `getAggregateStatus()` runs over the **ran**
  entries only (READY when all ran are ready); the no-PSMs pairs render as a distinct "no PSMs" sub-note that
  does **not** block READY. The scan-file count cell (`RunsList…tsx:239`) should read **ran + no-PSMs**
  (decision to confirm: show "M of N had no PSMs").
- **PARTIAL JOINT:** governed by §3 — if §3(a), empty files are sent for MBR and become ran pairs (no
  `noPsmsPairs` at all for JOINT); if §3(b), empty files are simply absent (no marker), and only whole-joint-zero
  is no-PSMs. **So whether JOINT ever produces a `noPsmsPairs` entry is decided entirely by Q-JOINT (§3).**
  Recommended pairing: §3(a) → JOINT never emits `noPsmsPairs`; the feature's per-pair no-PSMs markers are a
  **PER_FILE-only** concept. This is the cleanest mental model (JOINT = one run, whole-zero only; PER_FILE =
  N runs, each independently no-PSMs-able).
- **No orphaned service call for a no-PSMs run:** **OBSERVED true by construction** — the controller never
  calls `sendOneRequest` for an empty file (PER_FILE iterates the non-empty list `:441-466`; JOINT returns
  before send when whole-empty `:412-421`). The only orphan risk is the **existing** fail-fast one
  (already-sent PER_FILE runs orphaned when a *later* send fails, `:453-462`) — that is the send-failure
  concept, out of scope, kept separate per LOCK #4.

---

## 8. Backward-compat checklist — the shared gather must not break the peptide-page caller (LOCK #3)

- `gatherPsms_ForSingleSearch` `void`→`GatherPsms_Result`: the peptide-page call is statement-form
  (`FlashLFQ_Run__Request_Creation_RestWebserviceController.java:589-594`, **OBSERVED**) → compiles unchanged,
  return value discarded. ✔ (source-compatible)
- No change to `perFile_Holder`, `sendOneRequest`, or any request/response DTO the peptide-page controller
  reads → its per-file fan-out and silent-drop behavior are untouched this round. ✔
- The peptide-page controller keeps silently dropping empty files (its own separate round later). This round
  adds **no** obligation there. ✔
- **Build/verify gate:** `compileJava` for both controllers + the service; drive the peptide-page submit once
  to confirm unchanged behavior; then drive the project-page PER_FILE partial-empty and JOINT cases.

---

## 9. Affected files (inventory — for when building is authorized; NOT a build step now)

**Backend**
- `…/services/FlashLFQ_Run_GatherPsms_And_SendRequest_Service.java` — `gatherPsms_ForSingleSearch`
  `void`→result object (Q-A A-opt1); new `GatherPsms_Result`.
- `…/rest_controllers/other_like_project/Quant_AddNew_Submit_JointFlashLFQ_Run_RestWebserviceController.java`
  — consume the signal; PER_FILE `noPsmsPairs` (Q-B); JOINT zero-psm-file synthesis **iff** §3(a);
  `WebserviceResult.noPsmsPairs` + `WebserviceResult_NoPsmsPair`.
- *(NOT touched: `…/multiple_project_search_id/FlashLFQ_Run__Request_Creation_RestWebserviceController.java`.)*

**Front end**
- `projPg_Quant_Submit_JointFlashLFQ_Run_ToServer.ts` — validate/shape new `noPsmsPairs`.
- `projPg_Quant_SubmittedRun.ts` — add `noPsmsPairs` (Q-C C2-opt1); keep `getAggregateStatus` over ran entries.
- `projPg_Quant_BuildRunHash.ts` — append `<psid>_<ssfid>_noPsms` entries (Q-C C-opt1); reserved constant.
- `projPg_Quant_SubmitRun_Component.tsx` — pass `noPsmsPairs` into the built `SubmittedRun`.
- `projPg_Quant_RunsList_Component.tsx` — render "M no PSMs" in the row; exclude sentinels from the poll (only
  relevant if C2-opt2 were chosen; with C2-opt1 the poll is untouched).
- `quant_RunHash_Parse.ts` — **no change needed** (sentinel parses as a normal non-empty requestId); the
  **consumer** (deferred view/join) checks `requestId === "noPsms"`. Reserve the `"noPsms"` constant in one
  shared place.

---

## 10. STOP

This is the decisions doc. **Do not build.** Settle §3 (Q-JOINT — the MBR gate) first; then Q-A / Q-B / Q-C /
Q-D. The reviewing claude pressure-tests every choice and anchor against source before any code.

---

## 11. Build log — PHASE 1 (backend) — DONE (2026-08-20), UNCOMMITTED, STOP-gated

**Changes made (backend only):**
- `FlashLFQ_Run_GatherPsms_And_SendRequest_Service.java` — `gatherPsms_ForSingleSearch` `void`→`GatherPsms_Result`
  (new public static nested class holding `Set<Integer> searchScanFileIds_WithPsms`). The set is built at the
  end of the method from the (fresh-per-call) holder's `getPerFileList()` (a `perFile` exists only when a PSM
  was appended), and the whole-search-empty early return now returns an empty-set result. Nothing else the
  peptide-page caller reads was touched (`perFile_Holder`, `sendOneRequest`, all DTOs unchanged).
- `Quant_AddNew_Submit_JointFlashLFQ_Run_RestWebserviceController.java` — captures the gather result; **PER_FILE**
  mode computes `emptyMapped = mappedForSearch − searchScanFileIds_WithPsms` and adds each to a new
  `WebserviceResult.noPsmsPairs` (new `WebserviceResult_NoPsmsPair {projectSearchId, searchScanFileId}`);
  attached on the SUCCESS path only. **JOINT** mode adds nothing (decision (b)); the whole-zero
  `noPsmsToQuantify` early return is unchanged.

**Verification:**
- **Compile:** `./gradlew compileJava` clean (pre-existing deprecation note only). **OBSERVED.**
- **Deploy:** WAR built + copied to Tomcat; redeploy confirmed (HostConfig deployWAR finished). **OBSERVED.**
- **Runtime drive** (headless-Chrome CDP, logged-in admin, project 25, searches 582/275 + 583/276, external
  FlashLFQ service up at `localhost:3434`):
  - **PER_FILE, both files →** `status:true`, `perPairResults` = 2 entries with **DISTINCT** requestIds
    (`d419…`, `4991…`), **`noPsmsPairs: []`**. **OBSERVED.**
  - **JOINT, both files →** `status:true`, `perPairResults` = 2 entries **SHARING** one requestId
    (`1269…` on both), **`noPsmsPairs: []`**. **OBSERVED.**
  - **PER_FILE, single file →** 1 `perPairResult`, `noPsmsPairs: []`. **OBSERVED.**
  - These exercise the **modified gather method's new return** end-to-end: the set-diff correctly produced an
    EMPTY `noPsmsPairs` because `searchScanFileIds_WithPsms` correctly contained every mapped file (i.e. the
    gather signal is proven correct on real data), and the new field serializes on success for both modes.
- **Non-empty `noPsmsPairs` path (a mapped file with zero PSMs at default cutoffs): NOT runtime-observed —
  code-verified only.** A DB check confirmed **no genuine zero-PSM scan file exists** (every
  `search_scan_file_tbl` row has ≥1 `psm_tbl` row), and forcing a zero-at-default-cutoffs condition requires a
  DB mutation, which is **not self-applied** (Dan's hard rule). The branch is a trivial set-difference over an
  input set (`searchScanFileIds_WithPsms`) that was proven correct at runtime above, so confidence is high.
  **To runtime-observe it, a temporary zero-PSM fixture (change + revert SQL, Dan runs it, assistant runs only
  the read-only drive) can be prepared on request** — deferred as an optional follow-up, not self-applied.
- **Peptide-page caller (out of scope, must-not-break): code-verified unchanged.** Its controller is untouched;
  its `gatherPsms_ForSingleSearch` call is statement-form (`FlashLFQ_Run__Request_Creation_RestWebserviceController.java:589-594`)
  so `void`→object is source-compatible and the new return is discarded; the gather PSM-append logic and holder
  contents are byte-identical (only an end-of-method read + return were added). Not separately UI-driven (it
  calls the same gather method already runtime-exercised via the project-page drive).

**Phase 1 STOP cleared — Phase 2 greenlit by Dan.**

---

## 12. Build log — PHASE 2 (front end) — DONE (2026-08-20), UNCOMMITTED, STOP-gated

**Changes made (FE only — 5 files):**
- `projPg_Quant_Submit_JointFlashLFQ_Run_ToServer.ts` — off-the-wire type gains `noPsmsPairs?` (conditional,
  same treatment as `perPairResults`); new `..._NoPsmsPair` interface + `noPsmsPairs` result field; each element
  runtime-validated (`typeof` number checks + throw) and shaped.
- `projPg_Quant_SubmittedRun.ts` — new `..._NoPsmsPair` interface + `readonly noPsmsPairs` field (C2-opt1),
  parallel to `perPairEntries`; `getAggregateStatus()` unchanged (still over `perPairEntries` only).
- `projPg_Quant_BuildRunHash.ts` — reserved the sentinel in ONE place:
  `export const projPg_Quant_BuildRunHash__NO_PSMS_REQUESTID_SENTINEL = "noPsms"`.
- `projPg_Quant_SubmitRun_Component.tsx` — builds `noPsmsPairs` from the response (guarding `undefined`), builds
  hash entries from `perPairEntries` (real rids) **plus** each no-PSMs pair with `requestId = "noPsms"`, and
  passes `noPsmsPairs` into the `ProjPg_Quant_SubmittedRun`.
- `projPg_Quant_RunsList_Component.tsx` — count cell = `perPairEntries.length + noPsmsPairs.length`, suffixed
  `(M no PSMs)` when M > 0 (plain total when M = 0).
- `quant_RunHash_Parse.ts` — **NO change** (the sentinel parses as a normal non-empty requestId, confirmed).
- `projPg_Quant_SubmitRun_Component.tsx` (follow-up) — the post-submit overlay terminal message appends
  "M mapped scan file(s) had no PSMs and was/were not run." ONLY when `noPsmsPairs.length > 0` (singular/plural
  on M), so it no longer undercounts vs. the runs-list "N (M no PSMs)" cell. Unchanged for JOINT / all-ran
  PER_FILE. tsgo 0 + FE build clean; code-verified across the three cases (message strings below).

**Verification:**
- **tsgo:** `--noEmit` exit 0. **OBSERVED.** (Sole `ProjPg_Quant_SubmittedRun` constructor is the SubmitRun
  component — tsgo covers the new required `noPsmsPairs` param at that one call site.)
- **FE build + deploy:** `ant_buildFrontEnd_CopyToTomcat.xml` BUILD SUCCESSFUL. **OBSERVED.**
- **Happy-path live drive** (headless-Chrome CDP, project 25, upload → Option B → pick searches 418/275 +
  419/276 → Save mapping → Submit PER_FILE):
  - SubmitRun (Route B) shows "A separate FlashLFQ run will be created for each scan file"; terminal =
    "Submitted 2 FlashLFQ run(s) over 2 scan file(s)" with **2 distinct** rids. **OBSERVED.**
  - `SubmittedRun.hashFragment = qr;582_275_<rid>-583_276_<rid2>` — **hasSentinel: false**, ran:2, noPsms:0
    (hash unchanged vs pre-Phase-2, as required). **OBSERVED (via React fiber).**
  - Runs-list row count cell = **"2"** (no `(no PSMs)` suffix). **OBSERVED.**
  - The happy-path FE changes are provably inert: empty `noPsmsPairs` → no sentinel entries → identical hash;
    `noPsmsCount = 0` → plain count. The drive confirms no regression from the additive changes.
- **Poll-excludes-sentinel + aggregate-unaffected: code-verified (directly).** The runs-list poll gathers
  requestIds from `perPairEntries` only (`projPg_Quant_RunsList_Component.tsx:126-130`) and updates status over
  `perPairEntries` only (`:154-156`); `getAggregateStatus()` iterates `perPairEntries` only
  (`projPg_Quant_SubmittedRun.ts:98-129`). `noPsmsPairs` is read ONLY by the hash builder and the count cell —
  so a no-PSMs pair is never polled and never affects the aggregate status.
- **Non-empty `noPsmsPairs` FE render (the core new case): NOT yet observed — a zero-PSM fixture is required
  (see §13). The validated drive script (`drive_fe_render.mjs`) is ready to re-run against the fixture.**

## 13. Zero-PSM fixture (for Dan to run) — the non-empty-`noPsmsPairs` runtime drive

**⚠ RESTORABILITY: FULLY, CLEANLY REVERSIBLE.** The change is a **single-row, single-column** UPDATE
(`annotation_type_filterable_tbl` PK `annotation_type_id = 6816`, column `default_filter_value`, original value
**0.05**). **No** DELETE/INSERT, **no** FK-referenced rows, **no** auto-increment, **no** cascade/trigger. The
revert restores the exact original double (0.05). No caching defeats it — annotation types are read fresh per
request (`AnnotationTypeListForSearchIdSearcher` is a direct `SELECT`, no cache). Only transient effect while
active: default-cutoff-based views of **search 419 (projectSearchId 583)** in project 25 show zero passing PSMs;
reverted immediately after the read-only drive.

**Why this is the right, minimal knob (all verified against source/DB):** default cutoffs =
`annotation_type_filterable_tbl.default_filter_value`, unless a project-level override exists — **project 25 has
none** (`project_level_default_fltr_ann_cutoffs_tbl` empty for project 25). Ann type **6816** = search 419 PSM
**q-value**, `filter_direction='below'`, `default_filter=1`, value `0.05`. Setting it to `-1` makes "q-value ≤ -1"
impossible → **zero** PSMs pass for search 419 → scan file 276 is absent from `searchScanFileIds_WithPsms` →
a PER_FILE submit over {582/275, 583/276} yields `perPairResults=[{582/275}]` + `noPsmsPairs=[{583/276}]`. It is
search-419-scoped (6816 belongs only to search 419), so **search 418 (582/275) is unaffected and still runs.**

```sql
-- (1) CAPTURE baseline (expect: 6816 -> 0.05)
SELECT annotation_type_id, default_filter_value FROM annotation_type_filterable_tbl WHERE annotation_type_id = 6816;

-- (2) CHANGE: make search 419's PSM q-value cutoff impossible (zero PSMs pass for scan file 276)
UPDATE annotation_type_filterable_tbl SET default_filter_value = -1 WHERE annotation_type_id = 6816;
--   >>> Dan runs (1)+(2); assistant then runs ONLY the read-only drive (drive_fe_render.mjs) <<<

-- (3) REVERT (restore baseline)
UPDATE annotation_type_filterable_tbl SET default_filter_value = 0.05 WHERE annotation_type_id = 6816;

-- (4) VERIFY baseline restored (expect: 6816 -> 0.05)
SELECT annotation_type_id, default_filter_value FROM annotation_type_filterable_tbl WHERE annotation_type_id = 6816;
```

**Read-only drive after (2), expected OBSERVATIONS:** runs-list count cell **"2 (1 no PSMs)"**; `hashFragment =
qr;582_275_<rid>-583_276_noPsms` (**hasSentinel: true**, ran:1, noPsms:1); the poll requests only the one real
rid (no `"noPsms"`); the row still reaches READY off the single ran entry (aggregate unaffected).

**STOP — Phase 2 FE built + happy-path-verified. Awaiting Dan to apply the §13 fixture for the non-empty
runtime drive (then revert). Nothing committed.**
