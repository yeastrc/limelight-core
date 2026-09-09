# Add-New-Quant — SUBMIT run-model change — DECISIONS (2026-08-20)

**Status: DECISIONS-FIRST. Nothing is built.** This doc surfaces every load-bearing choice as a question
with a recommendation and `file:line` grounding, for Dan + the reviewing claude to settle **before** any
code. Stop at this doc.

**Scope (held):** SUBMIT-SIDE ONLY. Does not touch the view/retrieval/render path. No new page or route —
both run modes' runs-list entries link to the SAME existing full-page route (`d/pg/qt/flashlfq-peptide-quant`)
and the existing raw-TSV viewer (`d/pg/qt/flashlfq-peptide-data-file`). The view-side join that renders N
single-column TSVs into one matrix is a **deferred separate round**; this round's only view obligation is that
the submit OUTPUT (response shape + hash) is **view-ready**: it carries a per-pair `requestId` the deferred
view can fetch/join later.

**Provenance convention:** each load-bearing claim is tagged `verified: file:line` (read from current source
this session) or `inferred` / `unverified`. "OBSERVED" = seen in real source/output; "inferred" = my analysis.

---

## 0. The change (product decisions LOCKED by Dan — recorded, not re-litigated)

The just-completed A/B mapping categorization now ALSO drives the submit model:

1. **REMOVE** the "Normalize intensities across runs" option entirely (FE + request + controller).
2. **Route A** (Category A = bijection: ONE multi-file sub-group search): AFTER the user clicks Confirm, ask
   two options —
   - **opt1** = ONE joint FlashLFQ run over THAT search's scan files (MBR on; = today's joint run, now scoped
     to the single Route-A search). Cross-search joint-over-all-searches GOES AWAY.
   - **opt2** = a SEPARATE FlashLFQ run per scan file (MBR off), PSMs broken out by scan file (= by sub-group;
     1:1 for eligible Category A).
3. **Route B** (Category B = single-scan-file searches): ALWAYS per-scan-file individual runs (MBR off). No
   option/ask.

MBR is settled (always-on from CLI; no effect on single-file runs) — not rehashed here. The opt1/opt2 ask is
presented AFTER Confirm.

---

## 1. Verified anchors (re-confirmed against current source, 2026-08-20)

| Fact | Location | Status |
|---|---|---|
| Per-scan-file fan-out loop already exists | `…/rest_controllers/multiple_project_search_id/FlashLFQ_Run__Request_Creation_RestWebserviceController.java:603` (`for ( … perFile_Holder.getPerFileList() )`), `sendOneRequest(` at `:611`, per-pair tag at `:615-616` | **verified** |
| That controller's stale comment "still builds ONE joint run over all selected searches' scan files" | same file `:440` | **verified stale** — the loop at :603 fans out per file, contradicting it |
| Project-page joint controller | `…/rest_controllers/other_like_project/Quant_AddNew_Submit_JointFlashLFQ_Run_RestWebserviceController.java` — single `sendOneRequest(` at `:405`, `setMbr(Boolean.TRUE)` at `:400`, `setNormalize(...)` at `:401` | **verified** |
| Joint controller already filters+rebuilds per mapped file, keying `scan_file_id = searchScanFileId` (D7) | same file `:364-382` | **verified** |
| Shared service both controllers call | `…/services/FlashLFQ_Run_GatherPsms_And_SendRequest_Service.java` — `gatherPsms_ForSingleSearch(` at `:199` (breaks PSMs out per file into `perFile_Holder`), `sendOneRequest(` at `:592` | **verified** |
| "service forces false for a single scan file" note | shared service `:840` (comment on the `mbr` DTO field) | **verified — but it refers to the EXTERNAL FlashLFQ C# service, not the Java webapp** (§3 note A) |
| Hash format is per-pair `<psid>_<ssfid>_<rid>` | `projPg_Quant_BuildRunHash.ts:50-61` | **verified** — but the BUILDER hard-codes ONE shared `requestId` across all entries (§Q-B) |
| Runs-list SubmittedRun model holds ONE `requestId` + ONE `hashFragment` + ONE `status` | `projPg_Quant_SubmittedRun.ts:41-58` | **verified** |
| Status poll already takes an ARRAY of requestIds (batch) | `projPg_Quant_RunsList_Component.tsx:122-148`, `projPg_Quant_FlashLFQ_Run_Status_FromServer.ts` (poll signature) | **verified** — wire side is already batch; FE aggregation is per-run-single-rid |

**Doc note:** `flashlfq_quant_per_scanfile_run_keying_plan.md` §6 describes the per-file fan-out; its
"not yet implemented" status is **stale** (it was implemented in `FlashLFQ_Run__Request_Creation_...:603`).

---

## 2. What happens TODAY (baseline, so the delta is exact)

- The FE SubmitRun component (`projPg_Quant_SubmitRun_Component.tsx:110-190`) sends **all**
  `inMemoryStore.mappedRecords` as `mappedFiles` to the joint controller, **with no route distinction** —
  Route A and Route B both currently go through the joint controller.
- The joint controller (`Quant_AddNew_Submit_JointFlashLFQ_Run_...`) groups those mappedFiles by
  `projectSearchId` and sends **ONE joint FlashLFQ run over ALL of them** (`sendOneRequest` at `:405`).
  - For a Route-A (single-search bijection) mapping, that joint run is already scoped to one search's files
    (all mapped files share one `projectSearchId`) — **this is opt1's behavior today.**
  - For a Route-B (multi single-file-search) mapping, that joint run is **cross-search** — this is the
    "cross-search joint" that the LOCKED decision removes. **Route B must become per-file.** (verified:
    the controller does not special-case route; `inMemoryStore` carries no route flag.)
- Response is a single `{ status, requestId, failedToConnectToWebservice, httpStatusCode_Not_200_OK,
  noPsmsToQuantify }` (`:466-489`). The FE builds ONE `SubmittedRun` with ONE `requestId`, and the hash
  builder stamps that one `requestId` onto every `<psid>_<ssfid>_<rid>` entry (`BuildHashFragment:56-58`).

**So the net submit-side deltas are:** (a) drop normalize; (b) Route A gains an opt1/opt2 choice; (c) Route B
switches from joint to per-file; (d) per-file modes emit **N distinct requestIds**, which the response shape,
hash builder, and runs-list model must now carry.

---

## Q-A. Backend: how the joint controller gains a per-file mode

**A1 — Extract-and-share the per-file loop, or replicate it?**
The per-file loop already exists in `FlashLFQ_Run__Request_Creation_...:603-623`, but in a **different**
controller that takes `projectSearchIds` and gathers *all* of each search's scan files. The joint controller
takes explicit `mappedFiles` (a user-chosen subset) and **already** builds a per-mapped-file list
(`joint_spectral_data`, one `Request_..._Per_SpectralStorageServiceFile` per mapped pair, keyed
`scan_file_id = searchScanFileId`, at `:364-382`). So the joint controller is one `for` away from per-file:
instead of one `sendOneRequest( …, joint_spectral_data, … )` (`:405`), loop `joint_spectral_data` and call
`sendOneRequest( …, singletonList(perFile), … )` per entry, collecting a per-pair result.

- **Recommendation:** In the joint controller, keep JOINT mode exactly as-is (one `sendOneRequest` over the
  full list) and add PER_FILE mode as a loop over the already-built `joint_spectral_data`. Both call the
  **same shared-service `sendOneRequest` (`:592`)** — that IS the reuse hinge; no new extraction needed
  because the per-file *list-building* already lives in this controller (`:364-382`), unlike the other
  controller where it's fused with scan-file gathering. Do **not** try to share the *other* controller's loop
  body — the two controllers differ in how they obtain the file list (subset vs. all). Share the send, not
  the loop. (inferred from the two controllers' structure; both verified above.)

**A2 — Per-mode MBR: rely on the single-file auto-force, or set it explicitly?**
The `:840` "service forces false for a single scan file" note refers to the **external C# FlashLFQ service**,
not the Java webapp (verified: the webapp's `FlashLFQ_Parameters` just carries the boolean; no Java code forces
it off — see §3 note A). The webapp currently sets `setMbr(Boolean.TRUE)` unconditionally (`:400`).

- **Recommendation:** Set MBR **explicitly per mode**, don't rely on the external service's single-file
  auto-behavior: `setMbr(TRUE)` for opt1 (joint), `setMbr(FALSE)` for opt2 + Route B (per-file). Explicit is
  self-documenting and correct regardless of the external service's internal rule; it also matches the
  per-file controller's intent (its runs are single-file → MBR moot). Low stakes either way (a single-file run
  has no MBR effect), but explicit-per-mode removes the dependency on an out-of-repo behavior. (inferred; MBR
  product intent is already settled per the primer — this is only about where the boolean is stamped.)

**A3 — Confirm opt1's joint scope is the single Route-A search's files ONLY.**
- **Confirmed (verified):** Category A is a strict bijection over ONE search
  (`projPg_Quant_UploadParse_ValidateAndMapRecords__CategoryA_Candidate` carries one `projectSearchId` +
  `recordMappings` to distinct `searchScanFileId`s of THAT search; `_selectedCategoryA_ProjectSearchId` is a
  single search — `projPg_Quant_UploadParse_Component.tsx:177,454-455,516-527`). So a Route-A mapping's
  `mappedFiles` all share one `projectSearchId`; opt1's "joint over that search's files" = joint over all
  mapped files, exactly today's behavior scoped to the one search. No cross-search joint can occur under
  Route A. **The cross-search joint only ever arose for Route B, which is being removed.**

---

## Q-B. request_id / response contract + hash (view-readiness)

**The core fork.** opt1 (joint) = N mapped pairs sharing **1** requestId; opt2 + Route B (per-file) = N mapped
pairs each owning **its own** requestId. What must widen?

- **Hash FORMAT:** no change. `qr;<psid>_<ssfid>_<rid>-…` already carries a per-pair rid (verified,
  `projPg_Quant_BuildRunHash.ts:10-17`). JOINT just repeats one rid; PER_FILE uses N distinct rids.
- **Hash BUILDER:** **must widen.** `BuildHashFragment` currently takes a single `requestId` and stamps it on
  every entry (`:50-58`). It must instead accept a **per-pair rid** (e.g. take
  `Array<{projectSearchId, searchScanFileId, requestId}>` and emit one entry each). JOINT passes the same rid
  on every element; PER_FILE passes distinct rids. (verified gap.)
- **`ProjPg_Quant_SubmittedRun` model:** **must widen.** Today it holds one `requestId`, one `hashFragment`,
  one `status` (`:41-58`). A per-file submission is logically ONE runs-list row backed by **N service runs**.
  Recommended shape: keep ONE `SubmittedRun` per user submission (one row), holding a **list of per-pair
  entries** `{ projectSearchId, searchScanFileId, requestId, status }` plus the composite `hashFragment`
  (all N pairs). JOINT → N entries sharing one rid; PER_FILE → N entries with distinct rids. Row-level
  `status` becomes an **aggregate** over the N entries (e.g. READY only when all READY; else the "least done"
  status). (inferred design; the alternative — N separate `SubmittedRun` rows — is rejected in B-note below.)
- **Status poll:** wire side already batches (`requestIds: Array<string>`, verified
  `RunsList_Component.tsx:122`). Widen the FE aggregation to (a) collect **all** N rids across a run's entries,
  (b) update each entry's status by rid, (c) recompute the row aggregate. The batch status webservice itself
  needs **no change** (it already keys by requestId).
- **Controller response shape:** unify to a **per-pair list** for both modes so the FE has one code path:

  ```
  WebserviceResult {
    List<PerPairResult> perPairResults;   // JOINT: N entries sharing one requestId;
                                           // PER_FILE: N entries each own requestId
    boolean noPsmsToQuantify;              // unchanged (whole-submission "nothing to quantify")
    // (top-level failedToConnect / httpStatusCode fold into per-pair for PER_FILE;
    //  for JOINT they describe the single send — see B-open below)
  }
  PerPairResult { int projectSearchId; int searchScanFileId; boolean status;
                  String requestId; boolean failedToConnectToWebservice;
                  Integer httpStatusCode_Not_200_OK; }
  ```

  This `PerPairResult` is **structurally identical** to the existing
  `FlashLFQ_Run__Request_Creation_...WebserviceResult_PerSearch` (`:772-799`, verified). Reuse that shape (or a
  shared copy) so both controllers speak the same per-pair contract and the deferred view join has a uniform
  input.

- **Recommendation:** Widen builder + model + poll-aggregation as above; return a **per-pair list from BOTH
  modes** (JOINT = list-of-1-rid-repeated OR list where all share one rid). Emitting a per-pair list even for
  JOINT keeps ONE FE code path and makes JOINT vs PER_FILE a pure data difference (shared rid vs distinct
  rids), which is exactly what the hash already models.

**B-note (rejected alternative):** making each per-file run its **own** `SubmittedRun` row would lose the
"these N belong to one submission" grouping the deferred matrix view needs, and multiply runs-list rows. Keep
one row per submission; hold N entries inside it.

**B-open (needs a call):** for PER_FILE, if one file's send fails (connect error / non-200) but others
succeed, do we (i) still create the row with mixed per-entry statuses, or (ii) treat the whole submission as
failed? Recommend (i) — per-entry failure is visible and the successful runs remain viewable — but flag it as
a Dan decision. (For JOINT the existing single failedToConnect/httpStatus fields still describe the one send.)

---

## Q-C. Remove "Normalize" — every site + the absent-default trap

**Every site to remove (all verified):**

| Layer | Site |
|---|---|
| FE component field | `projPg_Quant_SubmitRun_Component.tsx:67` (`_normalize`), bind `:82`, handler `:96-105` |
| FE checkbox UI | `projPg_Quant_SubmitRun_Component.tsx:215-225` |
| FE submit-confirmation copy | `projPg_Quant_SubmitRun_Component.tsx:149` (pass), `:272` ("(normalized)…") |
| FE POST field | `projPg_Quant_Submit_JointFlashLFQ_Run_ToServer.ts:57,61,73` (param + request object) |
| FE run model | `projPg_Quant_SubmittedRun.ts:49-50,65,70,78` (`readonly normalize`) |
| FE runs-list column | `projPg_Quant_RunsList_Component.tsx:206` (header "Normalized"), `:229` (cell) |
| Controller request field | `Quant_AddNew_Submit_JointFlashLFQ_Run_...:437` (`private Boolean normalize`), setter `:445-447`, doc `:81,431` |
| Controller apply | `Quant_AddNew_Submit_JointFlashLFQ_Run_...:401` (`setNormalize(...)`), doc `:397-398` |
| Path-constants doc comment | `AA_RestWSControllerPaths_Constants.java:811` |

**The absent-default trap (load-bearing — removal must not silently flip behavior).**
Today the controller does `setNormalize( normalize == null ? Boolean.TRUE : normalize )` (`:401`) — **default
ON**. If we simply delete normalize and never call `setNormalize`, `FlashLFQ_Parameters.normalize` stays
`null` and the effective behavior falls to the **external FlashLFQ service's** default for the `--nor` switch.

- Per FlashLFQ CLI switch semantics (`--nor` is a presence=true switch; absent ⇒ FlashLFQ's built-in default,
  which is normalization **OFF**) — **provenance: inferred from prior-session notes on FlashLFQ CLI boolean
  switches; NOT re-verified against the C# source this round.** If that holds, silent removal would flip the
  joint (opt1) run from normalized → un-normalized.
- **Recommendation:** Do **not** leave it to the service default. Decide a fixed server-side value and set it
  explicitly so behavior is deterministic regardless of the external default:
  - Normalization is only meaningful for the **multi-file joint (opt1)** run; for single-file (opt2 / Route B)
    it is a no-op.
  - **Question for Dan:** should the opt1 joint run normalize? Two clean answers: **(a)** preserve today's
    behavior — `setNormalize(TRUE)` for opt1 (un-set/irrelevant for per-file); or **(b)** drop normalization
    entirely — `setNormalize(FALSE)` everywhere. Recommend **(a)** unless Dan wants (b), because it preserves
    the current default the feature has been running with. Either way, set it **explicitly** — never rely on
    the absent-field default.

---

## Q-D. FE flow: where the post-Confirm opt1/opt2 ask lives

**Current flow (verified, `projPg_Quant_UploadParse_Component.tsx`):**
`_render_AB_Selector` (route + picks) → **Confirm mapping** (`_confirmMappingClicked:500`) → collision check →
`_render_Phase4_ResolvedSummary` → **Save mapping** (`_saveMappingClicked:599`) → builds `_inMemoryStore` →
`_render_Phase5_Saved:1502` renders `<ProjPg_Quant_SubmitRun_Component>` (`:1552-1556`).

Route is known on the parent as `_selectedTopLevelRoute` (`"CATEGORY_A" | "CATEGORY_B" | undefined`, `:175`)
and `_selectedCategoryA_ProjectSearchId` (`:178`). **Neither is currently passed to the SubmitRun child** — the
child only gets `inMemoryStore` (`:1552-1556`), and `inMemoryStore` carries no route flag (verified:
`projPg_Quant_SubmittedRun__MappedFile` / store records are `{projectSearchId, searchScanFileId, …}` only).

**D1 — Where does the opt1/opt2 ask render?**
The primer says "AFTER Confirm." In the current flow "after Confirm" is the resolved-summary → Save →
SubmitRun sequence. Two placements:
- **(i) In the SubmitRun child** (recommended): thread the route down (`route`, and for Route A the fact that
  ≥2 files ⇒ opt1/opt2 applies) as required props. The child renders the opt1/opt2 radio for Route A, nothing
  for Route B (Route B is forced per-file), then Submit. This keeps all "how to run" UI in the submit
  component and leaves the mapping/collision flow untouched.
- **(ii) Between Confirm and Save** in the parent. Rejected: it interleaves a run-mode choice into the mapping
  resolution flow, and Save/store is about the mapping, not the run mode.

- **Recommendation: (i).** Add **required** props to `ProjPg_Quant_SubmitRun_Component`:
  `runRoute: "CATEGORY_A" | "CATEGORY_B"` and (only meaningful for A) the chosen search context if needed.
  Route B → component hard-selects per-file mode, no radio. Route A → component shows opt1/opt2 radio
  (no auto-pick, mirroring the no-auto-pick convention at `:174-175`). New instance state on the child:
  `_selectedRunMode: "JOINT" | "PER_FILE" | undefined`, disabling Submit until chosen for Route A.

**D2 — Request discriminator.** Add a required `runMode: "JOINT" | "PER_FILE"` to the submit request (replaces
`normalize`). Route B always sends `PER_FILE`; Route A sends the user's opt1/opt2 pick. Controller switches on
it. Keep it **required** (house rule: required params + explicit values) so a forgotten mode is a compile/400,
not a silent default.

**D3 — Conventions to honor (all verified as the file's existing style):** typed instance fields +
`this.setState({ force_Rerender: {} })` (no `this.state` data — `:56-58,99`); no memoization; required params
with explicit values; fatal-error handling via `reportErrorObjectToServer` + rethrow (`:101-104`); the
"already handled" reject sentinel propagation (`:179-184`); synchronous fast-path where nothing awaits.

---

## 3. Notes / corrections captured this session

- **Note A (MBR "force off" provenance):** the shared-service `:840` comment "service forces false for a
  single scan file" is about the **external FlashLFQ C# service**, not the Java webapp. `grep` over the shared
  service found **no** Java code forcing `mbr` false (verified — only the DTO field + getter/setter). So Q-A2's
  "does the auto-force suffice" is really "does the *external* service force it" — and the safe answer is to
  set MBR explicitly per mode in Java rather than depend on out-of-repo behavior.
- **Note B (`WebserviceResult_PerSearch` reuse):** the per-pair result shape the per-file modes need already
  exists verbatim in the other controller (`:772-799`). Prefer reusing/sharing it over inventing a parallel
  shape, so both submit controllers and the deferred view join share one per-pair contract.
- **Deferred (do NOT design here):** the "no PSMs pass filters" whole-run-zero workstream (mapping decisions
  doc §8) and the entire view-side join of N single-column TSVs into the matrix. This round only guarantees the
  submit output is view-ready (per-pair rid in the response + hash).

---

## 4. Resolutions — ALL SETTLED (Dan, 2026-08-20)

All six open questions are resolved and authoritative for the build. Decided by **Dan** (2026-08-20),
reviewed with the reviewing claude.

1. **Q-A2 MBR placement — RESOLVED (Dan):** set MBR **explicitly per mode in Java** — `setMbr(TRUE)` for opt1
   (JOINT); `setMbr(FALSE)` for opt2 + Route B (PER_FILE). No reliance on the external service's single-file
   auto-force.
2. **Q-B response unification — RESOLVED (Dan):** return a **per-pair list from BOTH modes** on success (JOINT =
   N entries sharing 1 `requestId`; PER_FILE = N entries each own `requestId`). Reuse the existing per-pair
   shape `WebserviceResult_PerSearch` (`FlashLFQ_Run__Request_Creation_...:772`) or a shared copy.
3. **Q-B model shape — RESOLVED (Dan):** **one `ProjPg_Quant_SubmittedRun` row per submission** holding N
   per-pair entries `{ projectSearchId, searchScanFileId, requestId, status }` + composite `hashFragment`; row
   status = **aggregate** of the poll (READY only when all READY, else in-progress). No per-entry send-failure
   state (see #4). (FE — Phase 2/3.)
4. **Q-B-open partial per-file failure — RESOLVED (Dan): fail-fast the WHOLE submission.** On the first failed
   `sendOneRequest` (connect error / non-200), stop and return a whole-submission failure; the FE shows an error
   and creates **no** runs-list row. Earlier successful sends in that submission become **orphaned** in the
   service — accepted (revisit when runs are DB-stored). A success response only ever carries all-N-succeeded.
5. **Q-C normalize — RESOLVED (Dan): remove entirely; `setNormalize(FALSE)` for all modes.** FlashLFQ performs
   **no** normalization (Limelight will implement its own later — out of scope). Remove every normalize site
   (FE field/checkbox/copy/POST/runs-list column; controller field/setter/apply; path-doc comment). The
   "absent-default = OFF" uncertainty is now **moot** — normalize is set explicitly (see scrutiny §4a).
6. **Q-D placement — RESOLVED (Dan):** opt1/opt2 ask lives in the **SubmitRun child** with route threaded down
   as **required props**; Route A shows an opt1/opt2 radio (no auto-pick, Submit disabled until chosen); Route B
   hard-selects PER_FILE (no radio). Add a **required** `runMode: "JOINT" | "PER_FILE"` to the submit request
   (replaces `normalize`). (FE — Phase 3.)

### 4a. Scrutiny points (honor in the build)

- **The unverified "C# absent-default = OFF" is MOOT.** #1/#5 set `normalize` (and MBR) **explicitly**, so
  nothing relies on any absent-field default — the code must **not** fall through to it.
  **Now VERIFIED anyway (OBSERVED, external service source):** `--nor` is a bare presence-switch emitted **only
  when intended is true** (`flashlfq_command.py:49` flag def, `:64-73` resolve, `:114-116` emit; comment
  `:112-113` *"NEVER emit '--flag false' — that turns the option on"*); `request_models.py:107,114` coerces JSON
  `normalize:false` → Python `False`. So `setNormalize(Boolean.FALSE)` → JSON `false` → `intended=False` →
  `--nor` **omitted** → FlashLFQ default `Normalize=False` → normalization **definitively OFF**. (Absent/null
  would also yield OFF, but we set FALSE explicitly regardless.)
- **PER_FILE zero-PSM edge.** A mapped file with no passing PSMs never enters `perFile_Holder` → no
  run/rid/hash-entry (today's joint path already drops empties, `:364-382`). If the whole per-file loop yields
  **zero** sends → return `noPsmsToQuantify` like the joint path (`:387-393`); do **not** emit an empty run. A
  per-file hash may therefore carry **fewer** entries than mapped files — fine this round (the deferred view
  must tolerate it; full no-PSMs UX stays deferred).
- **opt2 "broken out by sub-group" = the existing per-scan-file gather.** For eligible Category A the
  eligibility gate enforces that sub-groups partition scan files 1:1, and `gatherPsms_ForSingleSearch` (`:199`)
  already breaks PSMs out per `searchScanFileId`; looping `joint_spectral_data` satisfies the requirement with
  **no sub-group-specific code**.

## 5. Build plan (phased, STOP-gated)

- **Phase 1 — BACKEND** (`Quant_AddNew_Submit_JointFlashLFQ_Run_RestWebserviceController`): required `runMode`
  (reject unknown → 400); JOINT unchanged (one send, `setMbr(TRUE)`); PER_FILE loops `joint_spectral_data`,
  one `sendOneRequest` per singleton, `setMbr(FALSE)`, per-pair result, **fail-fast** on first failed send;
  remove normalize field/setter, `setNormalize(Boolean.FALSE)` both modes; unify response to a per-pair list +
  top-level `noPsmsToQuantify` + a whole-submission failure indicator; zero sends → `noPsmsToQuantify`.
  Verify: compiles; drive BOTH modes on project 25; STOP for review.
- **Phase 2 — FE plumbing** (DONE 2026-08-20, tsgo 0 + FE build clean, NOT live-driven): widened
  `BuildHashFragment` to a per-pair `hashEntries` list; widened `ProjPg_Quant_SubmittedRun` to N per-pair
  entries + `getAggregateStatus()`; widened runs-list poll to per-entry-by-rid + aggregate; removed all FE
  normalize sites; removed the "Normalized" column. `runMode` on the request is deliberately deferred to
  Phase 3 (lands with the UI); until then the submit overlay is intentionally non-functional (request lacks
  runMode → 400).
- **Phase 3 — FE UI + end-to-end** (DONE 2026-08-20, tsgo 0 + FE build clean, live-driven on project 25):
  threaded `runRoute` to the SubmitRun child (required prop); opt1/opt2 radio (Route A, no auto-pick, Submit
  disabled until a mode is chosen); Route B forces PER_FILE (no radio); required `runMode` on the request;
  response consumption rewired to `perPairResults`. Live-drive OBSERVED: Route A opt1 → 1 run / hash repeats
  one rid; Route A opt2 → 2 runs / 2 distinct rids; Route B → 2 runs across searches 582/583 / 2 distinct rids;
  Submit gated on Route A, direct on Route B; runs-list shows 3 rows with correct hashFragments; Refresh
  aggregates per-entry status (undefined → PROCESSING).

**All three phases complete (submit-side).** Deferred (separate rounds): the view-side join of N single-column
TSVs into the matrix, and the whole-run-zero "no PSMs" UX.
