# Add-New-Quant — Full Quant Peptide Page — DECISIONS (2026-08-19)

**Status: decisions-first. NO code written or edited this turn.** Deliverable = this document. This resolves
the load-bearing choices for plan §6 ("Full Quant peptide page — a NEW page") in
`quant_add_new__submit_joint_flashlfq_run_and_results_page_plan_2026-08-17.md` BEFORE any implementation.
Each decision cites source `file:line`, marks every claim **OBSERVED** (read in source) vs **INFERRED**
(my reasoning), and labels confidence. Anything I could not ground is filed as an **OPEN QUESTION**, not
silently resolved.

---

## 0. Two findings that reframe this phase (read first)

### 0a. Phase A (submit) AND Phase B (raw viewer) are ALREADY BUILT — the memory "nothing coded yet" is STALE
**OBSERVED. High confidence.** The following exist in the working tree (all **untracked `??`**, i.e. built
but uncommitted — `git status --short`):
- Submit controller `Quant_AddNew_Submit_JointFlashLFQ_Run_RestWebserviceController.java` (OBSERVED) and the
  D8-extracted service `services/FlashLFQ_Run_GatherPsms_And_SendRequest_Service` (OBSERVED — imported at
  submit controller `:54-59`).
- The whole project-page runs UI: `project_page_quant_section/` incl. `projPg_Quant_SubmitRun_Component.tsx`,
  `projPg_Quant_RunsList_Component.tsx`, `projPg_Quant_BuildRunHash.ts`, `projPg_Quant_SubmittedRun.ts`,
  `projPg_Quant_Submit_JointFlashLFQ_Run_ToServer.ts` (OBSERVED via `find`).
- The Phase-B raw viewer page: page controller `FlashLFQ_Peptide_Data_File_PageController.java`,
  JSP + the `quant_data_file_pages/flashlfq_peptide_data_file_page/` FE bundle (OBSERVED).
- Q7 (static-inclusive identity) is **already implemented** in the shared builder path: the joined-retrieval
  controller fetches static mods and feeds them to `FlashLFQ_GroupingIdentity_Common.buildFlashLFQ_GroupingIdentity(
  peptideSequence, reportedPeptideLevelVariableModMasses, staticModDTO_List )` (OBSERVED, `FlashLFQ_Run__Result_Retrieval_Joined_RestWebserviceController.java:323, 344-345`).

**Consequence:** this phase is not greenfield. The runs-list already renders a **"View" link per READY run**
pointing at the Phase-B raw viewer (OBSERVED, `projPg_Quant_RunsList_Component.tsx:239-253` →
`projPg_Quant_BuildRunHash__BuildViewerRelativeUrl`, path `d/pg/qt/flashlfq-peptide-data-file/{projectId}#<hash>`).
Decision 1 is therefore literally "what does that existing link become."

### 0b. TSV header spellings — CONFIRMED against a REAL multi-file joint run (plan §6 had one wrong)
**OBSERVED. High confidence.** A real 3-scan-file joint `QuantifiedPeptides.tsv` exists on disk
(a real FlashLFQ service `flashlfq_output/QuantifiedPeptides.tsv`,
11 columns, 3 `Intensity_*`). Its exact header row (tab-split), verbatim:

| # | Header (EXACT) |
|---|----------------|
| 1 | `Sequence` |
| 2 | `Base Sequence` |
| 3 | `Protein Groups` |
| 4 | `Gene Names` |
| 5 | `Organism` |
| 6 | `Intensity_scanfile_id_275` |
| 7 | `Intensity_scanfile_id_276` |
| 8 | `Intensity_scanfile_id_277` |
| 9 | `Detection Type_scanfile_id_275` |
| 10 | `Detection Type_scanfile_id_276` |
| 11 | `Detection Type_scanfile_id_277` |

- **`Sequence`** = the grouping identity string (carries the bracket mass), e.g. `AAATGEALSLVCVDEHK[+57.021464]`.
  Matches the existing parser constant `TSV_COLUMN__SEQUENCE = "Sequence"` (OBSERVED, joined controller `:124`).
- **`Protein Groups`** — **plan §6:268 wrote `Protein Group(s)` (with parens); the real header has NO parens.**
  Value embeds the proteinSequenceVersionId as `psvid_<id>_<accession>`, e.g.
  `psvid_201_gi|16128765|ref|NP_415318.1|` — confirms the §6 round-trip claim that `psvid_<id>` is recoverable.
- **`Intensity_scanfile_id_<id>`** / **`Detection Type_scanfile_id_<id>`** — one pair per scan file; prefixes
  match the existing parser constants `"Intensity_"` / `"Detection Type_"` (OBSERVED, joined controller `:125-126`).
- Detection-type values seen in this file: `MSMS`, `MBR`, `NotDetected` (OBSERVED). The ambiguous/zeroed value
  `MSMSAmbiguousPeakfinding` was **not present in this particular sample** but is the value the existing code
  keys "overlapping signal" on (OBSERVED as constant, joined controller `:130`; INFERRED that it appears in
  other runs — it's a documented FlashLFQ DetectionType). **OPEN QUESTION Q-D:** confirm on a run that actually
  contains an ambiguous form (see Open Questions).
- The Python writer `flashlfq_identifications_tsv_writer.py` writes the **INPUT** identifications file (7 cols:
  `File Name / Base Sequence / Full Sequence / …`), NOT this output — the output is written by FlashLFQ (C#).
  So the header spellings above come from the real FlashLFQ output, not from our code (provenance: read from a
  real output file on disk, not produced by my analysis).

---

## Decision 1 — Launch/link target: REPLACE the raw viewer's link target with the full page; KEEP the raw viewer route as an internal fallback

**Recommendation:** point the runs-list **"View" link at the new full Quant peptide page** (a new `d/pg/qt/`
route), and **leave the Phase-B raw viewer page + its retrieval webservice in place** (unlinked, or behind a
secondary "raw TSV" link). Do **not** delete the raw viewer.

**What it points at today (OBSERVED):** `projPg_Quant_RunsList_Component.tsx:245-251` builds the href via
`projPg_Quant_BuildRunHash__BuildViewerRelativeUrl({ projectIdentifier, hashFragment })`; that helper
(`projPg_Quant_BuildRunHash.ts:37, 59`) hardcodes `_VIEWER_PAGE_PATH_RELATIVE = "d/pg/qt/flashlfq-peptide-data-file"`
→ final URL `d/pg/qt/flashlfq-peptide-data-file/<projectId>#qr;<entries>`.

**What it would become (INFERRED / recommended):** a new sibling route under the same `d/pg/qt/` family, e.g.
`d/pg/qt/flashlfq-peptide-quant/<projectId>#qr;<entries>` — same composite hash, new page controller + bundle.
The `d/pg/qt/` root already exists (`AA_PageControllerPaths_Constants.java:173`
`QUANT_BASED_PAGE_CONTROLLER_START = "d/pg/qt/"`, OBSERVED), and `/d/pg/qt/**` is deliberately NOT under the
`/d/pg/psb/**` access interceptor (OBSERVED, plan §5 + `limelight_webapp/CLAUDE.md`), so the new page
self-authenticates exactly like the raw viewer does.

**Why keep the raw viewer rather than replace it:** it's a built, working, low-cost escape hatch (raw `<pre>`
dump) that stays useful when the full page's re-derivation/parse hits an edge (e.g. an identity that doesn't
round-trip). Cost to keep = one extra bundle. Changing decision 1 to "replace" only means flipping the one
constant in `projPg_Quant_BuildRunHash.ts:37` plus the link label; nothing else couples to it.

**Confidence:** High on the mechanics (what the link is, how to add a sibling page). Medium on the
keep-vs-delete preference — that's a product call for Dan (Open Question Q-A).

---

## Decision 2 — identity→rpid re-derivation + the drift risk (HIGHEST RISK)

### How the existing joined retrieval re-derives identity→rpid (OBSERVED, high confidence)
`FlashLFQ_Run__Result_Retrieval_Joined_RestWebserviceController.build_GroupingIdentity_To_ReportedPeptideIds_Map(...)`
(`:266-353`):
1. `searcherCutoffValuesRootLevel_Factory.createSearcherCutoffValuesRootLevel_From_WebserviceRequestCutoffs(
   projectSearchIdMapToSearchId, searchDataLookupParamsRoot, …)` (`:272-277`) — builds cutoffs from a
   `SearchDataLookupParamsRoot` **taken from the FE request body** (`:190`, `WebserviceRequest.searchDataLookupParamsRoot`).
2. `reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList( searchId,
   searcherCutoffValuesSearchLevel, MINIMUM_NUMBER_OF_PSMS_PER_REPORTED_PEPTIDE )` (`:287-289`) — reported
   peptides that pass those cutoffs.
3. Per rpid: sequence (`:305-306`), reported-peptide-level variable-mod masses (`:335-341`), search static mods
   fetched once (`:323`), then `FlashLFQ_GroupingIdentity_Common.buildFlashLFQ_GroupingIdentity( peptideSequence,
   reportedPeptideLevelVariableModMasses, staticModDTO_List )` (`:344-345`) → `identity → [rpid]` (`:347-349`).

The join then keys each TSV row's `Sequence` string into that map (`:418-420`).

### The drift question (§7b(d)) — where cutoffs come from at submit vs view, and whether they can drift
This is the crux. **The existing joined retrieval is NOT directly reusable as-is for the new page, because of
where the cutoffs come from:**

- **Submit-time (Phase A, BUILT — OBSERVED):** server-side **DEFAULT** cutoffs, persist-free. Submit controller
  `:282-286` calls `searchDataLookupParams_Create_ForDefaultCutoffs_NoDBSave_InternalProcessingOnly_FromProjectSearchIds
  .create_ForDefaultCutoffs_NoDBSave_InternalProcessingOnly_FromProjectSearchIds(...)` → a `SearchDataLookupParamsRoot`,
  then `searcherCutoffValuesRootLevel_Factory…` (`:287-288`). Nothing about the run (its cutoffs) is persisted —
  the hash carries only `(psid, ssfid, requestId)` (OBSERVED, plan D5 + `quant_RunHash_Parse.ts:9-13`).
- **View-time on EXISTING pages (OBSERVED):** the peptide/protein/QC pages call
  `quant_PrototypeData_Load( this.state.searchDataLookupParamsRoot )` — the page's **current top-of-page
  filters** (`peptidePage_Display_MainContent_Component.tsx:564`, `proteinViewPage_…Main_Component.tsx:806`,
  `qcViewPage_…Main_Component.tsx:604`). Those pages assert (module doc, `quant_PrototypeData.ts:18-19`) that
  "the FE only fetches a run whose URL-referenced quant matches the current filters."
- **View-time on the NEW page (the problem):** the new Quant peptide page is a standalone `d/pg/qt/` page with
  **NO top-of-page filter UI** — there is no `this.state.searchDataLookupParamsRoot` to send, and nothing is
  persisted to look up. If it accepted cutoffs from the FE like the existing controller, there'd be no correct
  value to pass.

**DECISION (recommended):** the new page's retrieval webservice must **build the DEFAULT cutoffs SERVER-SIDE
using the exact same wrapper the submit side used** —
`SearchDataLookupParams_Create_ForDefaultCutoffs_NoDBSave_InternalProcessingOnly_FromProjectSearchIds` — and
must **NOT** accept a `searchDataLookupParamsRoot` from the FE. So the new retrieval is a **fork** of
`build_GroupingIdentity_To_ReportedPeptideIds_Map` that swaps step 1's source from "request body" to "the
no-DB-save default-cutoffs wrapper," and everything downstream (steps 2-3, the shared identity builder) is
reused unchanged.

**Can they drift? Honest answer (INFERRED, medium-high confidence):**
- If both submit and view call the **same wrapper** with the same `(projectId, projectSearchIds)`, they produce
  the **same `SearchDataLookupParamsRoot` by construction** — the wrapper is deterministic from the search's
  stored default annotation-type cutoffs. Same cutoffs → same reported-peptide set → same identity strings via
  the same shared builder → the round-trip holds. **This is the same guarantee §7 makes for the identity
  *formula*, now extended to the *cutoffs* by using one shared source.**
- **The one residual drift vector (cannot be closed this slice):** nothing pins the default-cutoff *definition*
  at submit time. If the search's default annotation-type cutoffs in the DB (or the wrapper's logic) change
  **between submit and view**, the two derivations diverge and some rows silently fail to join (they'd be
  skipped at `:421-424`, appearing as missing quant rows, not an error). This is exactly the §7b(d) caveat.
  For the interim slice this is **accepted** (runs are session-scoped and typically viewed minutes after
  submit; default cutoffs are stable in practice). The real fix is the DB phase (persist the run's cutoffs).
- **I can prove the SOURCE is identical (same wrapper) — I cannot prove the underlying default-cutoff
  DEFINITION is immutable between submit and view.** Stating that plainly per the ask: **not guaranteed
  identical across time; guaranteed identical for a fixed default-cutoff definition.**

**Confidence:** High that using the same wrapper is the correct design and matches submit. Medium on the
practical drift risk being acceptable — that's Dan's call (Open Question Q-B).

---

## Decision 3 — Multi-`Intensity_*` parser: FORK the parser (new multi-column contract), reuse the join

**The existing parser hard-requires exactly ONE intensity column (OBSERVED, high confidence).**
`parseAndJoin_QuantifiedPeptidesTsv` (`:359-451`): it counts columns in the header loop (`:379-390`,
`intensityColumnCount++` / `detectionTypeColumnCount++`), then **throws** `LimelightInternalErrorException` at
`:393-399` unless `intensityColumnCount == 1 && detectionTypeColumnCount == 1`. (The plan cited `:381-387`;
the actual guard is the loop `:379-390` + the throw `:393-399`.) So a joint multi-file TSV — the whole point of
this feature — makes the existing parser **fail hard**. It cannot be reused verbatim.

**New parser contract (recommended, INFERRED):** a new parser that:
1. Finds the `Sequence` column, and collects **ALL** `Intensity_scanfile_id_<ssfid>` columns and their paired
   `Detection Type_scanfile_id_<ssfid>` columns, **extracting `<ssfid>` from each header** (the suffix after
   the known prefix). Requires `≥1` of each and that intensity/detection suffixes pair up.
2. Per row: for **each** sample column, produce one `(searchScanFileId=<ssfid>, intensity, detectionType,
   ambiguousZeroed)` datum, keyed by the row's `Sequence` identity.
3. The `<ssfid>` maps to exactly one `(projectSearchId, searchScanFileId)` via the hash pairs (see Decision 4) —
   so each sample column is attributed to one search, and the identity→rpid join uses **that search's**
   per-search map.

**Where it lives / reuse vs fork:** put the new page's retrieval in a **new webservice** (new `d/pg/qt`-family
REST controller), forking two methods from the joined controller: (a) the header/parse loop (to accept many
columns), and (b) the cutoffs source (Decision 2, default-cutoffs wrapper instead of FE body). **Reuse
unchanged:** `FlashLFQ_GroupingIdentity_Common.buildFlashLFQ_GroupingIdentity`, the per-rpid sequence/variable/
static-mod searchers, `getPeptideDataList`, the service base-URL config + `fetchQuantifiedPeptidesTsvFromService`
proxy shape, and the `^[0-9a-f]{32}$` requestId validation. The existing single-column controller stays as-is
for the existing peptide/protein pages (do NOT retrofit it to multi-column — it would then accept the
one-column case too and blur the contract).

**Output shape to the FE (INFERRED):** the wire model should carry the sample dimension. The existing
`Quant_PrototypeData` already stores `record_ByReportedPeptideId_ByScanFileId` keyed by `searchScanFileId`
(OBSERVED, `quant_PrototypeData.ts:129-131`) — i.e. the per-scan-file structure the matrix needs **already
exists**. So the new webservice should return records tagged with `searchScanFileId`, and the FE can populate
that same map from one joint TSV instead of from N single-file fetches. (This is a natural extension, not a new
data model — see Decision 5.)

**Confidence:** High on "must fork the parser" and on the reuse boundary. Medium on the exact new wire DTO
shape (design detail, settle at build).

---

## Decision 4 — Cross-search identity ambiguity: the SAMPLE COLUMN resolves the search; build one identity→rpid map PER projectSearchId

**The ambiguity and its resolution (INFERRED from OBSERVED structure, high confidence):**
- A joint run spans **multiple searches** (multiple distinct `projectSearchId` in the hash pairs) and multiple
  scan files. `reportedPeptideId`, the sequence/variable/static-mod searchers, and thus the identity→rpid map
  are all **per-search** (keyed by `searchId`, OBSERVED throughout `build_…Map` — `searchId` is the sole search
  key, `:289, :306, :315, :323`).
- The SAME `Sequence` identity string can therefore map to reported peptides in **more than one search's** map.
  A single TSV row has one `Sequence` but N sample columns.
- **Resolution:** each sample column header `Intensity_scanfile_id_<ssfid>` identifies exactly one
  `searchScanFileId`, and the URL hash pairs map each `searchScanFileId` → exactly one `projectSearchId`
  (OBSERVED, hash entry shape `<psid>_<ssfid>_<requestId>`, `quant_RunHash_Parse.ts:10, 29-33`; the parser
  yields `{projectSearchId, searchScanFileId, requestId}`). So **each cell (row × sample column) belongs to a
  known single search**, and the row's identity is joined against **that search's** per-search identity→rpid
  map — never a global map. There is no genuine cross-search collision at the cell level; the column carries
  the disambiguator.

**How a row fans out (INFERRED):** build a `Map<projectSearchId, Map<identity, [rpid]>>` (one derivation per
distinct `projectSearchId` in the hash, each via the default-cutoffs wrapper per Decision 2). For a TSV row
with identity `S`:
- sample column for `(psidA, ssfidA)` → look up `S` in `map[psidA]` → rpids in search A;
- sample column for `(psidB, ssfidB)` → look up `S` in `map[psidB]` → rpids in search B.
A row thus contributes to display rows across searches, but each **cell** is unambiguous. On the **display**
side, whether two searches' rpids for identity `S` collapse into one visual row or show as per-search columns
is the matrix layout question (rows = reported peptides / display forms; columns = samples). **OPEN QUESTION
Q-C:** the exact row-identity model for the matrix (one row per (search, rpid)? per shared display string
across searches?) — this is the biggest remaining *display-design* decision and should be settled explicitly.

**Confidence:** High that the column→search mapping resolves cell-level ambiguity. Medium on the row-grouping
display model (Q-C).

---

## Decision 5 — Both display representations, PER SAMPLE CELL: reuse the existing two mechanisms, noting one is row-level and one is cell-level

The existing single-protein/peptide display already implements both representations; the matrix reuses them,
but they live at **different grains** — this distinction is the load-bearing part:

### (a) "overlapping signal" — PER CELL (already per-scan-file in the data model). OBSERVED.
- Marker constant `_QUANT_AMBIGUOUS_MARKER = "overlapping signal"` (`Create_TableData.tsx:101`); shown when
  `summedRowQuant.anyAmbiguous` (`:577-592`) — NOT a number, whole cell.
- `anyAmbiguous` comes from `ambiguousZeroed` per record (`quant_PrototypeData.ts:222-223`), and records are
  stored **per `searchScanFileId`** (`_record_ByReportedPeptideId_ByScanFileId`, `:131`; ambiguous derived from
  DetectionType `MSMSAmbiguousPeakfinding`, `:60, :457`). In a joint run each `Detection Type_scanfile_id_<ssfid>`
  column has its own value, so a peptidoform can be ambiguous in sample A but quantified in sample B →
  **genuinely per-cell.** The data model already supports this (one map per scan file); the new parser just
  fills multiple scan-file entries from one row's multiple columns. **No new display logic needed per cell.**

### (b) ⚭ shared glyph — ROW-LEVEL (identity spans >1 display row), same across all sample columns. OBSERVED.
- Glyph `_QUANT_SHARED_GLYPH = "⚭"` (`Create_TableData.tsx:95`); applied when a single-group cell's `groupId`
  is in the per-search shared set (`:597-602`).
- The shared set is computed by `_compute_Quant_SharedGroupIds_ByProjectSearchId` (`:652-689`) — **once per
  rebuild across all displayed rows, keyed per projectSearchId**, and it is **scan-file-INDEPENDENT** (a
  `groupId` maps to a reportedPeptideId regardless of scan file — `get_GroupId_ForReportedPeptideId`,
  `quant_PrototypeData.ts:260-262, :135-137`). So "this identity shows on >1 display row" is a **row/identity
  property**, identical across every sample column of that row — NOT recomputed per cell.

**Mapping onto the matrix (INFERRED, high confidence):** compute the ⚭ shared-group set **per projectSearchId
once** (reuse `_compute_…` as-is, feeding it the matrix's display rows), and mark ⚭ at the **row** level (or on
each cell of that row, but driven by the row-level set). Compute "overlapping signal" **per cell** from that
cell's `(searchScanFileId, rpid)` record's `ambiguousZeroed`. Both can co-occur (a shared identity that is also
ambiguous in one sample). The `_QUANT_INTERNAL_ERROR_MARKER` "quant error" D4 tripwire (`:108, :554-566`) is
tied to the collate-variable-mods toggle, which this standalone page won't have — **OPEN QUESTION Q-E**:
confirm the new page has no collate toggle (so the D4 tripwire is irrelevant and each row is one display form),
or decide its behavior if it does.

**Reuse vs rebuild:** the value/marker/tooltip construction in `_build_Quant_DataRow_ColumnEntry`
(`Create_TableData.tsx:~540-640`) and the shared-group pre-pass are directly reusable; the matrix wraps them in
a per-(row × sample) loop instead of the current per-(row × single resolved scan file) call. `get_SummedQuant…`
already takes a `restrictToSearchScanFileId` arg (`quant_PrototypeData.ts:196`) — the matrix passes each
sample's `ssfid` there, which is exactly the mode-3 (per-sub-group) path that already exists.

**Confidence:** High that both mechanisms port with the row-level vs cell-level split described. Medium on the
collate-toggle question (Q-E).

---

## Decision 6 — TSV header spellings: CONFIRMED (see §0b). Plan §6 correction required.

Done first, against a real multi-file output (§0b). **Actionable corrections to plan §6 (line ~268):**
- `Protein Group(s)` → **`Protein Groups`** (no parentheses).
- `Sequence`, `Intensity_scanfile_id_<id>`, `Detection Type_scanfile_id_<id>` confirmed exact; also present:
  `Base Sequence`, `Gene Names`, `Organism` (the full-precision peptides file has 5 non-per-sample columns +
  2 per-sample columns per scan file).
- `psvid_<id>` round-trip in `Protein Groups` confirmed (value `psvid_201_gi|…`).
- **OPEN QUESTION Q-D:** the ambiguous DetectionType `MSMSAmbiguousPeakfinding` was not in the one sampled file
  — confirm its exact spelling in an output that contains an overlapping form before relying on cell (a)'s
  trigger for the matrix (the existing code already assumes this spelling, so risk is low).

**Confidence:** High (read from a real output file, provenance = disk, not my analysis).

---

## Dan's review outcome (2026-08-19) + STAGING decision

Dan reviewed this doc against source and **confirmed it**. Resolutions:
- **Q-A → two links per READY run:** the new full-page route **and** the raw viewer, both linked.
- **Q-B → accept** the interim submit↔view default-cutoff drift risk (session-scoped, DB phase fixes it).
- **Q-C → DEFERRED:** no matrix / no row-grouping / no display-representations (⚭, "overlapping signal") this
  round. The row-identity model is not decided yet.
- **Q-D → CLOSED (OBSERVED):** `MSMSAmbiguousPeakfinding` is present in real output TSVs incl. the multi-file
  joint run `finaldir/8e20fcf49a484112bafcb9b86abf70e2/…/QuantifiedPeptides.tsv` (14 occurrences). Real rows
  confirm the **per-cell** behavior: e.g. identity `CVGCGRCYISCYDGGHQAMEWSEK[+400.159356]` is `NotDetected` in
  sample 275/277 but `MSMSAmbiguousPeakfinding` in 276 — intensity 0 in every ambiguous cell. (Provenance:
  read from the real TSV on disk, not produced by my analysis.)
- **Q-E → no collate toggle** on the new page. Each wire record is one peptidoform; the D4 "quant error"
  tripwire is irrelevant here.

**STAGING decision (this round = BACKEND + a DUMMY-FE debug page, gated):** the FE delivered this round is a
**dummy `<table>` debug dump**, NOT the real matrix. It calls the new backend webservice and renders the
returned records into a plain `<table>` (one HTML row per wire record, columns = every DTO field) so Dan can
see real data on the **real, permanent `d/pg/qt/` route** before the matrix is designed. **This dummy page IS
the verification surface — no separate test-harness is written to call the backend.** A later phase upgrades
this same component into the real matrix **in place** (behind the deferred Q-C). Build proceeds in three gated
sub-phases (extract re-derivation → multi-column parser + new retrieval WS → dummy `<table>` FE), STOP for
review at each.

## Build progress (gated)

**Sub-phase 1 (extract re-derivation) — DONE + approved.** `build_GroupingIdentity_To_ReportedPeptideIds_Map`
moved verbatim into shared `@Component`
`services/FlashLFQ_Quant_ReDerive_GroupingIdentity_To_ReportedPeptideIds_Service`; existing single-scan-file
joined controller repointed. Verified: compile clean; new bean wires (context up); **A/B round-trip old-WAR vs
new-WAR = 1776 records byte-identical** (run `fe71b508…`, pSId 582).

**Sub-phase 2 (multi-column parser + new retrieval WS) — DONE (backend), runtime-confirmed.**
- New REST path `QUANT_ADD_NEW__FLASHLFQ_PEPTIDE_QUANT_JOINED__FOR_PROJECT_ID =
  "d/rws/for-page/quant-add-new--flashlfq-peptide-quant-joined"`.
- New controller `other_like_project/Quant_AddNew_FlashLFQ_PeptideQuant_Joined_Retrieval_RestWebserviceController`:
  READ auth on projectId + projectSearchId→projectId IDOR check; **server-side DEFAULT cutoffs via the same
  no-DB-save wrapper as submit** (does NOT accept cutoffs from the FE — Decision 2); calls the Sub-phase-1
  extracted re-derivation once per distinct projectSearchId; fetches the joint TSV (proxy shape reused); new
  **multi-column parser** collects every `Intensity_scanfile_id_<N>` + paired `Detection Type_scanfile_id_<N>`
  and emits **one flat per-cell record** per (searchScanFileId, reportedPeptideId) with
  `{searchScanFileId, projectSearchId, reportedPeptideId, intensity, detectionType, ambiguousZeroed,
  groupingIdentity, groupId}`. **No row grouping** (deferred Q-C). Existing single-column controller untouched.
- **Decision-4 assertion CONFIRMED (OBSERVED, runtime):** the column suffix `<N>` IS the searchScanFileId.
  searchScanFileId **275** and **277** both map to physical `scan_file_tbl.id` **17** (same raw file) but
  different searches (418→pSId 582, 420→pSId 584) — and the joint run `8e20…` has **distinct** columns
  `275/276/277`, so it keyed on searchScanFileId, not physical scanFileId (which would have collided). Guard +
  comment added; a column whose `<N>` isn't among the request pairs is skipped with a warn.
- **Runtime test against the real `8e20…` joint run** (columns 275/276/277 = searches 418/419/420): WS returned
  **HTTP 200, 7729 per-cell records** across all three searches (582→1776, 583→2305, 584→3648; 582's 1776 ==
  the Sub-phase-1 single-search count), **3385 distinct identities == the TSV's 3385 rows**, **26 ambiguous
  records** (= **24 distinct ambiguous cells** `(identity, searchScanFileId)`, of which 2 cells fan out to 2
  reportedPeptideIds each → +2 records; the record count exceeds the cell count wherever one identity maps to
  >1 rpid in a search).
  Cross-checks vs the raw TSV: normal cell `AAGEAP…[+0.0]`/ssfid275 = intensity 2038950.866173757 MSMS (matches
  TSV + Sub-phase-1 baseline); ambiguous cell `CVGCGRCYISCYDGGHQAMEWSEK[+400.159356]`/ssfid276 =
  `ambiguousZeroed:true`, 0, MSMSAmbiguousPeakfinding (matches TSV).

**Sub-phase 3 (dummy `<table>` FE page + two runs-list links) — DONE, renders.**
- New permanent page route `d/pg/qt/flashlfq-peptide-quant/{projectId}` (page controller
  `FlashLFQ_Peptide_Quant_PageController` + JSP `flashlfqPeptideQuant.jsp` + esbuild entry) — a clone of the
  Phase-B raw-viewer shell, self-authenticating READ. FE (`flashlfq_peptide_quant_page/`): bootstrap + Root
  component + `flashlfqPeptideQuant_LoadFromServer` — parses the `#qr;` hash → `(psid, ssfid)` pairs + shared
  requestId, calls the new joined WS, renders **one HTML row per per-cell record** (columns = every DTO field).
  Flat dump only — NO grouping / matrix (deferred Q-C). Fatal-error FE style (separate `.then/.catch`; reject
  sentinel propagates). **This page is upgraded to the real matrix IN PLACE later.**
- Runs-list now shows **two links per READY run** (Q-A): **Quant** (this full page) + **Raw TSV** (the kept
  Phase-B viewer). New URL builder `projPg_Quant_BuildRunHash__BuildFullPageRelativeUrl`.
- Verified: tsgo 0 errors; compileJava clean; deployed. Rendered the page for the `8e20…` joint run →
  **7729 rows** in the table, per-search 582→1776 / 583→2305 / 584→3648, 3385 distinct identities, and the
  **24 ambiguous cells → 26 ambiguous records** breakdown confirmed **on the page** (DOM read).

### Load-bearing fact for the deferred matrix (Q-C): reportedPeptideId is GLOBAL, base-sequence-keyed
**OBSERVED (verified against DB + runtime).** `reported_peptide_tbl` = `(id, sequence, last_used_in_search_import)`
— **no `search_id`**; `sequence` is the BASE sequence. So `reportedPeptideId` (= `reported_peptide_tbl.id`) is a
**global id shared across every search that contains that base peptide** (e.g. id 14892 = `AAATGEALSLVCVDEHK`
appears for both search 419 and 420 in the WS output, with different per-cell quant). The per-cell record is
correctly disambiguated by its `(projectSearchId, searchScanFileId)` tag. **Implication for Q-C:** the matrix
row-identity model can key on reportedPeptideId to merge the same peptide across searches, OR keep per-search
rows — but it must account for a single reportedPeptideId legitimately spanning searches. (Note: the identity's
mod form is in the grouping-identity bracket string, NOT in reportedPeptideId.)

## Open questions for Dan (all resolved above; retained for provenance)

- **Q-A (Decision 1):** Full page **replaces** the raw-viewer link, or full page is the link and the raw viewer
  stays as a secondary "raw TSV" affordance? (I recommend keep-as-fallback.)
- **Q-B (Decision 2):** Accept the residual submit↔view default-cutoff **drift risk** for this interim,
  DB-less slice (runs are session-scoped, viewed soon after submit)? The SOURCE is provably identical (same
  no-DB-save wrapper); the *definition's* immutability over time is not pinned until the DB phase.
- **Q-C (Decision 4):** The **matrix row-identity model** — one display row per (search, reportedPeptideId), or
  collapse a shared `Sequence` identity across searches into one row with per-(search,sample) cells? Biggest
  display-design decision.
- **Q-D (Decision 6):** Provide/point at a run whose TSV contains an `MSMSAmbiguousPeakfinding` row to confirm
  that spelling end-to-end (low risk; code already assumes it).
- **Q-E (Decision 5):** Does the new standalone page expose a "Collate: Variable Modifications" toggle? If not
  (recommended), each row is one display form and the D4 "quant error" tripwire is irrelevant here.

## Standing rules honored
Skeptical bar: every load-bearing claim cited to `file:line`, tagged OBSERVED vs INFERRED with confidence;
unproven items filed as Open Questions, not asserted. No code written/edited. No DB mutation. No mass math.
Nothing committed — awaiting Dan's review of these decisions before any implementation.
