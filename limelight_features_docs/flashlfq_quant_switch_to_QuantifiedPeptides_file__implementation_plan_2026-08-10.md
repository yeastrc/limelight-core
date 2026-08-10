# FlashLFQ quant — switch to ingesting `QuantifiedPeptides.tsv` matched to the peptide table (implementation plan)

**Date: 2026-08-10.** Status: **APPROVED direction, not yet implemented.** This is a fully-detailed
implementation plan handoff for a new engineer/Claude to execute. All feature code referenced is currently
**HELD / uncommitted** in the working tree. A **local backup** of the pre-change tree (the current
peaks-file + front-end-summing version) exists on the dev machine so we can revert to the peaks path if
needed (path recorded off-repo, not here — repo is public).

> **One-paragraph summary.** Today Limelight ingests FlashLFQ's per-peak file (`QuantifiedPeaks.tsv`) and
> **sums** peaks per reported peptide in the front end — a combine rule we own and must defend. The boss
> approved switching to FlashLFQ's own per-peptide file (`QuantifiedPeptides.tsv`) so **FlashLFQ owns the
> aggregation** and we can point at its documentation. To make one FlashLFQ peptide row line up with one
> peptide-table row, we **change the FlashLFQ input** to group peptidoforms **non-positionally by
> (base sequence + summed variable-mod mass)** — dropping the `rpid<id>_` prefix — so positional isomers of
> the same precursor mass collapse into a single FlashLFQ identity (which also stops FlashLFQ from zeroing
> them as "shared"). **Java** (not the front end) parses `QuantifiedPeptides.tsv`, joins each output row back
> to the reported peptides whose variable mods sum to that mass, and returns `reportedPeptideId → { intensity,
> groupId }`; the front end keeps keying by `reportedPeptideId` exactly as it does now. Several new gates and
> messages are added (below). **All existing front-end peak-summing is removed.**

---

## 0. Provenance / how to read this

- File:line citations below were gathered by read-only exploration of the working tree on 2026-08-10 and are
  **OBSERVED** unless marked otherwise. Line numbers drift as the uncommitted code is edited — treat them as
  anchors, `grep` the named symbol to re-locate.
- Items marked **VERIFY** are assumptions the implementer must confirm against code (or the separate FlashLFQ
  service repo) **before** relying on them — they are load-bearing.
- Items marked **DECISION** are settled (Dan + boss); do not re-litigate without asking Dan.
- Companion docs (read these): `flashlfq_output_file__QuantifiedPeptides.md` (what the peptide file contains
  and how FlashLFQ computes it — MAX + zero-shared), `flashlfq_quant_peak_summing_vs_flashlfq_peptide_output_2026-08-05.md`
  (why SUM over-counts; the empirical head-to-head), `flashlfq_quant_http_results_retrieval_webservice_plan.md`
  (the HTTP bridge / retirement-by-Track-B), `flashlfq_output_to_limelight_mapping.md`.

---

## 1. Current architecture (what exists today, and what changes)

### 1a. The service boundary — **critical constraint**
The webapp Java **never reads FlashLFQ output files**; it is an HTTP proxy to a **separate FlashLFQ service**
(distinct deployable; source NOT in this repo). Service base URL comes from the DB config table
(`ConfigSystemsKeysSharedConstants.RUN_FLASHLFQ_SERVICE_WEB_SERVICE_BASE_URL`,
`limelight_shared_code/.../ConfigSystemsKeysSharedConstants.java:58`). Three proxy controllers exist:

| Front-end URL | Java controller | Service path | Returns today |
|---|---|---|---|
| `d/rws/.../flashlfq-run--request-creation`* | `FlashLFQ_Run__Request_Creation_RestWebserviceController` (`.../multiple_project_search_id/`) | `/requestNewFlashLFQRun` | per-run `requestId`s or a typed `rejectReason` |
| `d/rws/for-page/psb/flashlfq-run--result-status` | `FlashLFQ_Run__Result_Status_RestWebserviceController` (`.../multiple_project_search_id/`) | `/flashLFQRunStatus` | relays status JSON (READY/PROCESSING/FAILED/NOT_FOUND) |
| `d/rws/for-page/flashlfq-run--result-retrieval` | `FlashLFQ_Run__Result_Retrieval_RestWebserviceController` (`.../single_project_search_id/`) | `/flashLFQRunResult?request_id=` | **raw `QuantifiedPeaks.tsv` bytes, verbatim** |

Path constants: `AA_RestWSControllerPaths_Constants.java:777,779`. **No Java code parses any FlashLFQ TSV
today** (grep for `"Peak intensity"` / `"Full Sequence"` finds only comments).

### 1b. FlashLFQ input generation (Java) — the string we will change
`FlashLFQ_Run__Request_Creation_RestWebserviceController.java`:
- `build_FlashLFQ_FullSequenceString(reportedPeptideId, baseSequence, modifications)` (~`:1050-1085`) builds
  `"rpid" + reportedPeptideId + "_"` (`:1062`) followed by the base sequence with per-position `[+m]` mod
  tokens (positional).
- `fullSequence_MassToken(double)` (~`:1113-1117`) formats each mass as `%.5f` (5 decimals).
- `compute_Psm_MonoisotopicMass_And_FullSequence(...)` (~`:1012-1042`) computes `monoisotopic_mass` =
  base-peptide monoisotopic mass (`PeptideMassCalculator`) + Σ mod masses, and calls the builder.
- Both **reported-peptide-level variable mods** (`:880-909`, masses via
  `DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item.getMass()`) and **static
  mods** (`:922-948`, `StaticModDTO.getMass()`) are folded into the positional token map. **PSM-level dynamic
  mods are rejected** (`:355-366`), **open mods are rejected** (`:911-920`).
- Per-PSM DTO `Request_To_FlashLFQ_Service_Per_Psm` (`:1416`) serializes `full_sequence` and
  `monoisotopic_mass` separately (the `modifications` map is internal, not serialized).

### 1c. Front-end display (what gets removed/rewired)
- `quant/quant_PrototypeData.ts` — fetches each READY run's raw `QuantifiedPeaks.tsv` via the retrieval proxy,
  parses columns `Base Sequence`/`Full Sequence`/`Peak intensity`, parses `rpid<id>_` out of `Full Sequence`
  (`_RPID_PREFIX_REGEX = /^rpid(\d+)_/`), and **SUMS** peaks per `reportedPeptideId`-union
  (`get_QuantForDisplayForm` ~`:171-212`, `peakIndexUnion` + `summedIntensity`). **This whole summing path is
  removed.**
- Peptide-list table builder
  `.../protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Create_TableData.tsx`
  calls `get_QuantForDisplayForm(...)` (~`:454`) to produce the Quant cell (value = `summedIntensity.toExponential(2)`,
  shared glyph `_QUANT_SHARED_GLYPH` when signal is shared). **Rewired** to a per-`reportedPeptideId` lookup.
  NB: despite the `protein_page__single_protein/` path this file drives the **peptide page** too.
- Row grain: rows are keyed on the **display string** `peptideSequenceDisplay` built in
  `.../protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData.ts`,
  which folds variable mods (rounded 2dp via `modificationMass_CommonRounding_ReturnString`,
  `.../modification_mass_common/modification_mass_rounding.ts`) into the string via
  `reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches`. Multiple `reportedPeptideId`s that resolve
  to the same display string share one row (`dataPerReportedPeptideId_Map_Key_reportedPeptideId...`).
- "Collate Peptides Using: **Variable Modifications**" checkbox: state
  `generatedPeptideContents_UserSelections_StateObject.getVariableModifications_Selected()` (default **true**),
  UI in `generatedPeptideContents_UserSelections_Root_Component.tsx` (~`:166-179`). When unchecked, variable
  mods are **not loaded** (gated at `Create_GeneratedReportedPeptideListData.ts:547`) so all var-mod forms of a
  base sequence collapse into one row.
- Button gate `quant/quant_Container_Component.tsx` (renders "View/Add Quant" or a red "Quant is not available"
  reason box; `_notAvailableMessage()` ~`:266-297`). The actual "Run FlashLFQ" button + params form is the
  overlay `quant/quant_ViewAddQuant_Overlay.tsx` (button ~`:150`); submit feedback today is `window.alert`
  only (`flashLFQ_Run_RequestCreation_InitiateAndShowResult.ts`). Display-side status banners live above the
  table in `..._GeneratedReportedPeptideListSection_Component.tsx` (~`:560-629`).
- Reject-reason plumbing: Java enum `FlashLFQ_Run_Reject_Reason` (`Request_Creation...java:1514-1532`,
  returned in `WebserviceResult.rejectReason` ~`:1542`), mirrored by the TS string union
  `flashLFQ_Run_RequestCreation_WebserviceCall__RejectReason`
  (`flashlfq_run/flashLFQ_Run_RequestCreation_WebserviceCall.ts:32-36`), consumed exhaustively (with `never`
  defaults) in `quant_Container_Component._notAvailableMessage` and
  `flashLFQ_Run_RequestCreation_InitiateAndShowResult._rejectReasonMessage`. Only the four `MULTI_SCAN_FILE_*`
  reasons are actually returned by the server; open/dynamic/no-scan are client-computed button gates (server
  throws generic exceptions for those).
- Per-search flags: `dataPage_common_Get_Searches_Flags.ts` → `DataPage_common_Flags_SingleSearch`. It has
  `anyPsmHas_DynamicModifications` (**PSM-level** only) and `anyPsmHas_OpenModifications`, but **no** flag for
  "search has reported-peptide-**level** variable mods." (Relevant to §5's collate gate.)

---

## 2. The new design — DECISIONS

**D1. Ingest `QuantifiedPeptides.tsv`, not `QuantifiedPeaks.tsv`.** (Boss-approved 2026-08.) FlashLFQ owns the
per-peptide aggregation (MAX of unambiguous peaks; shared/ambiguous forms zeroed). We stop owning SUM-vs-MAX
and can cite FlashLFQ's docs. Accepted cost: FlashLFQ **zeroes** genuinely-ambiguous peptidoforms (handled by
D5). Rationale detail in `flashlfq_quant_peak_summing_vs_flashlfq_peptide_output_2026-08-05.md`.

**D2. Group peptidoforms non-positionally by `<baseSequence>[<summed VARIABLE-mod mass>]`; drop the `rpid`
prefix; send full-precision masses.** The FlashLFQ "Full Sequence" identity we send becomes the base sequence
plus a **single bracket** carrying the **sum of that reported peptide's reported-peptide-level variable-mod
masses**, at full precision (do **not** round for FlashLFQ). No positions, no `rpid`.
- Why non-positional + summed: for MS1 quant the measured quantity is the **precursor mass**; positional
  isomers and different mod compositions with the same total added mass have the **same precursor mass** and
  are MS1-indistinguishable, so grouping them into one identity is honest. It also **collapses the
  same-precursor-mass forms into one FlashLFQ identity**, which prevents FlashLFQ from treating them as
  distinct-identities-sharing-a-peak and **zeroing** them.
- Why full precision to FlashLFQ: better XIC mass accuracy. Rounding to 2dp happens **only** for the
  peptide-table display and for the D4 collision gate — never in the mass sent to FlashLFQ or in the
  match-back key.
- **Static mods:** keep them out of the bracket (they are constant per residue → do not affect grouping) but
  they **must remain in the separately-sent `monoisotopic_mass`** so the precursor m/z is correct.
- **RESOLVED 2026-08-10 (was the #1 VERIFY):** the main FlashLFQ service uses the **provided
  `monoisotopic_mass`** and treats `full_sequence` as an **opaque identity/grouping string** — so a
  non-positional lumped bracket that omits static mods is **safe**. Evidence: the service writes FlashLFQ's
  **generic identifications TSV** with a dedicated `Peptide Monoisotopic Mass` column from our
  `monoisotopic_mass` and a `Full Sequence` column from our `full_sequence`
  (`limelight-flashlfq-service/app/flashlfq_identifications_tsv_writer.py:16-54`, cols/write at `:38-54`). In
  generic-input mode FlashLFQ extracts the XIC from **mass + charge** and uses **Full Sequence only for
  peptidoform grouping** (isotope envelope via averagine off the mass — no chemical formula supplied). The
  main service has **no** `peptide_mass.py` (does not recompute mass). **Requirement that remains:** Java must
  keep computing `monoisotopic_mass` correctly (base + all mods incl. static — unchanged) since that column,
  not the string, drives the m/z. **Do NOT adopt** the `__PeptideQuantWorks` service variant's Python-side
  `peptide_mass.py` (it recomputes mass + builds a *positional* Full Sequence in Python) — this plan keeps
  Full Sequence construction in Java, matching the main service's pass-through. Confirm once against a real run
  that a lumped Full Sequence still quantifies (low risk).

**D3. Match-back is owned by Java; the front end keeps keying by `reportedPeptideId`.** A Java result
controller fetches `QuantifiedPeptides.tsv` from the service, parses it, and joins each output row to the
reported peptides whose (base sequence + summed variable-mod mass) equals that row's identity. It returns, per
run, `reportedPeptideId → { intensityByScanFile, groupId, ambiguousZeroed }`. `groupId` identifies the
FlashLFQ output row (its identity string) so the FE can render the **shared glyph** when one `groupId` lands on
**more than one distinct table row** (the positional-isomer / same-summed-mass case). Rationale: single source
of truth for the key lives in Java next to the code that built it (no TS/Java format drift), the FE is
unchanged in how it keys, and this matches the eventual Track-B (DB-ingest) direction where Java parses
FlashLFQ output. **Refactor the summed-mass key construction into ONE shared Java method** used by both the
request-build path and the result-parse path.

**D4. 2-decimal display-collision gate — block the WHOLE search (server-authoritative typed reject).** If two
**distinct** reported-peptide-level variable-mod masses within a search round to the **same 2-decimal string**
(via the canonical `modificationMass_CommonRounding_ReturnString` rule), the 2dp table display would be
ambiguous — so block quant for the **entire search** with a typed `rejectReason` and a main-page message.
Scope = all distinct variable-mod masses used in the search (conservative). This gate makes the 2dp table
display unambiguous; it is independent of the (full-precision) match-back.

**D5. Zeroed/ambiguous rows — show a fixed searchable marker + a bold note above the table.** For any
peptidoform FlashLFQ zeroed as ambiguous (`Detection Type = MSMSAmbiguousPeakfinding`, intensity 0), show a
**fixed marker string** in the Quant column (do **not** show 0 or blank — 0 reads as "not detected"). Above the
table, render a **bold** note that **quotes the exact marker string** so the user can browser-Find (Ctrl-F)
every affected row. No pre-run rejection for this (a pre-run mass-only check would reject nearly every real
search; FlashLFQ's post-run flag is the precise mass+RT determination). Per-peptidoform, never whole-search.

**D6. "Variable Modifications" collate toggle — block run + hide display + always-on standing message.
Static/Open toggles — no new gating.**
- Always show a **standing message** in the Quant button area explaining that unchecking "Variable
  Modifications" (under "Collate Peptides Using") will hide the Quant column, because Limelight has no code to
  combine quant across collapsed modification forms.
- When "Variable Modifications" is **unchecked** and at least one displayed search has reported-peptide-level
  variable mods: **disable running quant** AND **hide any displayed quant**, with the reason message.
- "Static Modifications" unchecked never merges distinct forms (static mass is constant) → no gating. Open mods
  already make a search fully ineligible → their toggle is moot.
- **DECIDED (Dan, 2026-08-10): hide/block only when variable mods are actually present AND the toggle is
  unchecked — reuse the existing signal, no new flag.** Condition =
  `_searchesContains_VariableModifications === true` **AND**
  `generatedPeptideContents_UserSelections_StateObject.getVariableModifications_Selected() === false`. Then
  **hide the entire Quant column and disable running quant**, with the message. The "variable mods present"
  signal **already exists**: `_searchesContains_VariableModifications`
  (`peptidePage_Display_MainContent_Component.tsx:366,621,640`), computed from
  `get_reportedPeptideIds_HasDynamicModifications()` on the **reported-peptide-level**
  `..._ReportedPeptideId_Based_Data_For_MainFilters` (`:613-621`) — i.e. true only when a displayed reported
  peptide has a reported-peptide-level variable mod (distinct from the PSM-level `anyPsmHas_DynamicModifications`
  search flag). It is the same value that gates the checkbox's visibility (the checkbox only renders when
  `searchContains_VariableModifications` is true — `generatedPeptideContents_UserSelections_Root_Component.tsx:166`),
  and it is computed on the same component that renders the Quant container, so just thread it into the quant
  gate. **Why the presence condition is required (Dan, 2026-08-10):** when no search has variable mods the
  checkbox isn't shown and the toggle's value is meaningless — an unconditional hide-when-unchecked would wrongly
  hide quant for perfectly-quantifiable no-variable-mod searches. Do **not** add a new server flag; do **not**
  hide per-search-column (it's a global column hide).

**D7. Remove ALL existing front-end peak-summing.** Delete the `QuantifiedPeaks.tsv` fetch/parse and the
`peakIndexUnion`/`summedIntensity` logic in `quant_PrototypeData.ts` and its call sites. Nothing in the new
path sums peaks. (See §7 "Places that still combine" — surface each to Dan rather than silently re-implement.)

---

## 3. New/changed data flow

```
RUN (submit):
  FE Quant_Container gate (owner-only, sync gates incl. D6 collate gate + D4 mirror if flag available)
    -> POST request-creation
       Java: derive reported peptides from cutoffs (unchanged)
             D4 gate: reject whole search if 2dp variable-mod-mass collision  --> typed rejectReason
             build per-PSM full_sequence = <baseSeq>[<summed VARIABLE mass, full precision>]  (NO rpid)   [D2]
             monoisotopic_mass unchanged (base + all mods incl static)
             POST /requestNewFlashLFQRun  -> per-(search,scanFile) requestId

STATUS: unchanged (/flashLFQRunStatus relay)

RESULT (display):
  FE -> POST new "result-retrieval-joined" webservice (per run)
     Java: GET QuantifiedPeptides.tsv from service (NEW service endpoint)          [prereq §4]
           re-derive per-reportedPeptideId summed-mass key (shared method with build path)  [D3]
           parse peptide rows (Sequence, Intensity_<file>, Detection Type_<file>)
           join: row.Sequence -> reportedPeptideIds; emit rpid -> { intensityByScanFile, groupId, ambiguousZeroed }
     FE: key by reportedPeptideId (as today); render intensity, marker for ambiguousZeroed [D5],
         shared glyph when a groupId spans >1 distinct table row
```

---

## 4. PREREQUISITE — separate FlashLFQ service repo (return side) — SCOPED 2026-08-10

The FlashLFQ service is a **separate Python (FastAPI) repo**, checked out on the dev machine at
`/data/code_checkouts/Github/limelight-flashlfq-service/GIT_CLONE/`. **Use the `limelight-flashlfq-service`
(main) app** — it is the clean, current line: Full Sequence + monoisotopic mass are **webapp-supplied** (the
service does no chemistry; `request_processor.py` raises if they're missing), scans come from spectr, and it
names each sample **`scanfile_id_<scan_file_tbl.id>`**. **Do NOT use `__PeptideQuantWorks`** — it is an older,
divergent branch that recomputes mass + builds a positional Full Sequence in Python (`peptide_mass.py`) and
writes its own mzML; its name refers to peptide-*mass* computation, **not** peptides-file return (it does not
return the peptides file either).

**The change (small, well-scoped):** FlashLFQ already writes `QuantifiedPeptides.tsv` next to
`QuantifiedPeaks.tsv` in `config.finaldir/<request_id>/flashlfq_output/`. The result endpoint
`GET /flashLFQRunResult` (`web_listener.py:91-98`) **hardcodes** `QuantifiedPeaks.tsv` (`:96-98`, no filename
param). Add a file selector — e.g. `?file=peptides` → serve `QuantifiedPeptides.tsv` — or a sibling route.
Optionally extend the READY check (`web_listener.py:~115,129`; `request_processor.py:129,146,155`) to also
confirm `QuantifiedPeptides.tsv` presence (FlashLFQ writes both, so low risk). **No new computation.** Blocking
dependency for D1/D3; input side already confirmed safe (D2 RESOLVED).

**Match-back bonus:** the output's per-file columns are `Intensity_scanfile_id_<id>` /
`Detection Type_scanfile_id_<id>` where `<id>` is **`scan_file_tbl.id`** (`request_processor.py`,
`sample_name = "scanfile_id_%d" % file_entry.scan_file_id`). So the Java parse can pick the right column per
scan file directly from the header.

**RESOLVED 2026-08-10 — `scan_file_tbl.id` (column suffix) ↔ `searchScanFileId` (hash/FE key) mapping.** They
are different table ids but **1:1-resolvable within a search**, and the webapp already carries both:
`SearchScanFileDTO.getId()` = `search_scan_file_tbl.id` = **`searchScanFileId`** (the run tag / hash key,
`Request_Creation...:556,566`); `SearchScanFileDTO.getScanFileId()` = **`scan_file_tbl.id`** (sent to the
service as `scan_file_id`, becomes the column suffix). The request path already builds
`SearchScanFile_APIKey_Filename { searchScanFileId, scanFileId }` via `searchScanFile_For_SearchIds_Searcher`
(`:635-636`). **For the result-parse controller (§5.3/5.4):** given a run's `searchScanFileId` (from the
hash), resolve → `scan_file_tbl.id` with the same searcher, then pick `Intensity_scanfile_id_<that>`.
**Simpler still:** runs are per-(search, scan file) (fan-out `:558,566`, size-1 file list), so a single run's
peptides file has exactly **one** `Intensity_scanfile_id_*` column — the parse can take that one column and use
the id only as a cross-check. (A `scan_file_tbl.id` may be shared across *searches*, so the mapping is 1:1 only
within one search — which is all a per-search run needs.) No new searcher needed.

---

## 5. Java (this repo) — step by step

**5.1 Refactor the summed-mass key into a shared method.** Extract a method, e.g.
`buildFlashLFQ_GroupingIdentity(String baseSequence, Collection<Double> reportedPeptideLevelVariableModMasses)`
returning `baseSequence + "[" + massToken(sum) + "]"` (single bracket; define the exact token format once —
sign, decimals; full precision, ROOT locale, `-0.0` normalized). Use it in **both** `build_FlashLFQ_FullSequenceString`
(request path — replace the rpid+positional logic) and the new result-parse join (§5.4). Positions and `rpid`
are gone from the sent identity. Keep `monoisotopic_mass` computation unchanged.

**5.2 D4 collision gate (request-creation controller).** In `requestNewFlashLFQRun(...)`, before submitting,
for each search collect the **distinct reported-peptide-level variable-mod masses** (reuse the reported
peptides already derived from cutoffs at `Request_Creation...:668-679`, then
`dynamic_Variable_...Searcher.getDynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIds(searchId,
reportedPeptideIds)`; masses via `.getMass()`). Round each with the **same rule as the front end**
(`toFixed(2)` + trailing-zero strip — implement the identical rounding in Java; see
`modification_mass_rounding.ts:35-46`). If two distinct raw masses share a rounded string → set a new typed
reject reason and early-return (follow the `MULTI_SCAN_FILE_*` pattern at `:391-470`). Add the enum member,
e.g. `VARIABLE_MOD_MASSES_COLLIDE_AT_2_DECIMAL_PLACES`, to `FlashLFQ_Run_Reject_Reason` (`:1514-1532`).

**5.3 New result endpoint — parse + join (NEW Java controller).** Add a controller (mirror
`FlashLFQ_Run__Result_Retrieval_RestWebserviceController`; READ-auth per `projectSearchId`; validate
`requestId` shape `^[0-9a-f]{32}$`) that: GETs `QuantifiedPeptides.tsv` from the new service endpoint (§4);
parses the header to locate `Sequence`, and the `Intensity_<file>` + `Detection Type_<file>` columns
(header-name lookup, like the FE does today) — note the `<file>` suffix is `scanfile_id_<scan_file_tbl.id>`
(§4), so the column header carries the scan-file id for per-sub-group selection; for each data row extract the
identity string and per-file intensity/detection. Response DTO: per run, a list of `{ reportedPeptideId, intensityByScanFile (or a single
intensity for the single-file case), groupId, ambiguousZeroed }`. Add its path constant to
`AA_RestWSControllerPaths_Constants.java`.

**5.4 The join (D3).** In the new controller, re-derive the search's reported peptides + their
reported-peptide-level variable-mod masses (same searchers as the request path), compute each rpid's grouping
identity via the shared method (§5.1), build `Map<identityString, List<reportedPeptideId>>`. For each parsed
output row, `groupId = identityString`; look up its reportedPeptideIds; set each rpid's intensity (and
`ambiguousZeroed = (detectionType == "MSMSAmbiguousPeakfinding" || intensity == 0-with-ambiguous)`). Emit the
`rpid → {…}` records. (A `groupId` with >1 reportedPeptideId that map to >1 *display* row is the shared case —
the FE decides the glyph from display rows, so just pass `groupId` through.)

**5.5 DTO/enum mirrors.** Ensure the new reject reason and the new result DTO are marshalled with the existing
manual JSON approach used in these controllers.

---

## 6. Front end (this repo) — step by step

**6.1 Replace `quant_PrototypeData.ts` internals.** Swap the raw-TSV fetch + peak parse + `rpid` regex + SUM
for: call the new joined result webservice per READY run; store `Map<reportedPeptideId, { intensity, groupId,
ambiguousZeroed }>` (plus per-scan-file keying for mode-3, see §7). Keep the public shape the table builder
needs but **remove** `peakIndexUnion`/`summedIntensity` and the `Full Sequence`/`Peak intensity` parsing.

**6.2 Table builder (`..._Create_TableData.tsx`).** Replace the `get_QuantForDisplayForm(...)` (~`:454`) call
with a per-`reportedPeptideId` lookup:
- Row's reportedPeptideIds → look up quant. If `ambiguousZeroed` → cell = the **marker string** (D5). Else →
  `intensity.toExponential(2)`.
- **Shared glyph:** compute, across the currently displayed rows, which `groupId`s appear on >1 distinct row;
  prepend `_QUANT_SHARED_GLYPH` on those rows. (Positional isomers / same-summed-mass → same groupId → glyph.)
- Update the download-string and tooltip builders accordingly (no summing).

**6.3 Marker string + bold note (D5).** Define a single constant, e.g.
`const _QUANT_AMBIGUOUS_MARKER = "overlapping signal";` used for the cell text. In the display banner region
above the table (`..._GeneratedReportedPeptideListSection_Component.tsx` ~`:560-629`), when any displayed row
is `ambiguousZeroed`, render a **bold** note that quotes it verbatim, e.g.:
> **Some peptides could not be quantified because their MS1 signal overlaps a near-isobaric peptide. These
> show `overlapping signal` in the Quant column — use browser Find (Ctrl-F) for `overlapping signal` to locate
> them.**

**6.4 Collate "Variable Modifications" gate + standing message (D6).**
- **Standing message (always shown)** in `quant_Container_Component.tsx` near the View/Add Quant button, e.g.:
  > Quant is shown per variable-modification form. Unchecking **Variable Modifications** under *Collate
  > Peptides Using* hides the Quant column — Limelight cannot currently combine quant across collapsed
  > modification forms.
- **The gate:** when `_searchesContains_VariableModifications && ! getVariableModifications_Selected()`, (a)
  disable running quant (in `Quant_Container_Component`), and (b) hide the Quant column (wire into
  `quant_PrototypeData__ShouldShow_QuantColumn` and/or the banner region), showing the reason. Thread
  `_searchesContains_VariableModifications` from `peptidePage_Display_MainContent_Component` (which already
  computes it and already renders the Quant container) into both the button gate and the table builder. Read
  the toggle via `generatedPeptideContents_UserSelections_StateObject.getVariableModifications_Selected()`;
  re-evaluate on its change (the component already re-renders on user-selection changes). **Never hide when
  `_searchesContains_VariableModifications` is false** (no variable mods → checkbox absent → toggle meaningless).

**6.5 Reject-reason wiring (D4).** Add the new reason string to
`flashLFQ_Run_RequestCreation_WebserviceCall__RejectReason` (`flashLFQ_Run_RequestCreation_WebserviceCall.ts:32-36`,
name must match the Java enum exactly). Add its `case` to `_rejectReasonMessage`
(`InitiateAndShowResult.ts:64-85`) and to `quant_Container_Component._notAvailableMessage` (`:266-297`) — the
`never` defaults will force both. If a client-side pre-gate is desired, add a matching literal to
`Internal__Quant_Container_NotAvailable_Reason` (`:38-42`) and compute it in `_computeSyncGate` — but this
needs the distinct-masses data client-side (a new flag/webservice); otherwise rely on the server reason as the
authoritative backstop (like the `MULTI_SCAN_FILE_*` reasons).

**6.6 No new per-search flag / webservice (per D6 decision).** The gate reuses the **existing**
`_searchesContains_VariableModifications` (already computed on `peptidePage_Display_MainContent_Component` from
`get_reportedPeptideIds_HasDynamicModifications()`) plus the global toggle — no new
`anyReportedPeptideHas_VariableModifications` flag and no new server call. (Left here so a future reader doesn't
re-introduce the flag.)

**6.7 Rewrite the "About the Quant column" info box + audit ALL user-facing quant wording — the value is no
longer a "total".** The current box
(`..._GeneratedReportedPeptideListSection_Component.tsx:599-626`) describes the value as each peptidoform's
**"total MS1 abundance"** over the submitted PSMs (`:607`) and says values are "counted under each row it maps
to — **the same convention as PSM Count**" with the **⚭** glyph meaning shared peaks (`:619-624`). Both are
**wrong** under the peptide-file design and MUST be rewritten:
- **Not a total/sum.** The value is FlashLFQ's per-peptidoform MS1 label-free intensity = the intensity of its
  **single most-intense unambiguous chromatographic feature (a MAX)** — apex height by default, integrated
  area with `--int`. Reword "total MS1 abundance" to something like *"FlashLFQ's MS1 label-free intensity for
  that peptidoform — its dominant chromatographic feature, not a sum of peaks."* For a single-feature peptide
  this is its abundance; for a multi-feature peptide it is the largest feature, not a sum. **Point users to
  FlashLFQ's documentation** (being able to cite FlashLFQ is the whole reason for the switch).
- **⚭ meaning changed.** It no longer means "peaks shared with other reported peptides, attributed to all." It
  now means **one FlashLFQ peptidoform (grouped non-positionally by base sequence + summed variable-mod mass)
  is displayed on more than one table row** (localization/positional or equal-summed-mass variants), each
  showing the **same measured value** — hence "not additive down the column." Reword the `:619-624` paragraph
  to that; drop the "same convention as PSM Count" framing (PSM count sums; this value does not).
- **Add the overlap case (D5), distinct from ⚭.** Peptidoforms whose MS1 signal FlashLFQ cannot separate from
  a near-isobaric peptide get **no value** — shown as the `overlapping signal` marker (keep consistent with the
  bold note above the table, §6.3).
- **Keep the still-accurate parts:** apex-vs-area (`--int`), "not narrowed by secondary row filters," "not
  charge-scoped" (FlashLFQ folds charge states).
- **Audit the same wording elsewhere:** the Quant column header/tooltip (`_build_Quant_Column_Header`
  ~`:386-437`) and the per-row hover tooltip (`_build_Quant_DataRow_ColumnEntry` ~`:462-491`) — remove any
  "summed"/"total"/"sum of peaks" language and describe the FlashLFQ per-peptidoform value. (This pairs with
  the §6.2 tooltip/download rework.)

---

## 7. Cross-scan-file combine — ALREADY PREVENTED by existing gates (validated 2026-08-10)

The scan-file/sub-group "combine" worry is **resolved by gates that are already coded** — no new combine
decision is needed here. Validated against `FlashLFQ_Run__Request_Creation_RestWebserviceController.java:391-461`:
for any search with **>1 scan file** the request is **rejected** unless (a) it is the only selected search
(`:418-422`), (b) it has sub-groups (`:424-432`), (c) no scan file mixes >1 sub-group
(`MULTI_SCAN_FILE_SUB_GROUPS_CROSS_CUT_SCAN_FILES`, `:437-444`), and (d) **no sub-group spans >1 scan file**
(`MULTI_SCAN_FILE_SUB_GROUP_SPANS_MULTIPLE_SCAN_FILES`, `:451-458`). The controller comment at `:446-450`
states the guarantee: with (c)+(d) false, **sub-groups and scan files are 1:1**. Single-file searches skip the
whole block (`:412-414`). Mirrored client-side in `quant_Container_Component.tsx:247-252` (fail-open; server
authoritative). Consequences for this plan:

1. **Per-sub-group ("mode 3") cells are a LOOKUP, not a combine.** Because sub-group↔scan-file is guaranteed
   1:1, each per-sub-group Quant cell (`..._Create_TableData.tsx` ~`:1355-1385`,
   `quant_subGroupId_To_SearchScanFileId_Map`) maps to **exactly one scan file** → exactly one
   `Intensity_<file>` value from `QuantifiedPeptides.tsv`. No summing across files. Implementation task is only
   to resolve sub-group → its scan file → the correct `Intensity_<file>` column (or, under per-(search,scanFile)
   run keying, that sub-group's own run). **No decision needed from Dan.**
2. **A multi-file search can never be shown as one combined per-search number** — the gate *requires* sub-groups
   1:1, so there is no allowed path that sums a search's files into a single value. Single-file "mode 1/2" cells
   (~`:1488-1503`) are one file = one value. **No combine.**

**Still genuinely open — SURFACE TO DAN, do not silently implement:**

- **Protein-level rollup** (peptide → protein quant) — **planned as a near-future feature (Dan, 2026-08-10),
  NOT in this plan.** For now do not implement it; the removed peaks-path rollups
  (`rollup_ByBaseSequence` / `rollup_ByReportedPeptideId` / `get_QuantForReportedPeptideIds` / the standalone
  panel `quant_PrototypeDisplay_QuantifiedPeaks_Component.tsx`) can be deleted/parked. **But do not bake in
  assumptions that block a protein rollup later** — keep the per-`reportedPeptideId` quant (and its `groupId`)
  cleanly available so a protein view can consume it. When it is built, summing peptide intensities into a
  protein value is a real combine decision (respect
  `flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md`) — surface it to Dan then.
- **Download string + tooltip detail** — presentation of the per-row value, not a combine; redefine for the
  peptide-file value (no aggregation).

---

## 8. VERIFY list (do these before/while implementing)

1. ~~Service uses provided `monoisotopic_mass`, not a re-parse of `full_sequence`~~ — **RESOLVED** (D2;
   `flashlfq_identifications_tsv_writer.py:38-54`). Only residual: confirm once on a real run that a lumped
   Full Sequence still quantifies.
2. **`QuantifiedPeptides.tsv` is produced and reachable** for a completed run, and the new service endpoint
   returns it (§4). Review the `__PeptideQuantWorks` variant first — peptide quant may already work there.
3. **Header/column names** in `QuantifiedPeptides.tsv` for the single-file Limelight case: exact `Sequence`,
   `Intensity_<file>`, `Detection Type_<file>` spellings (see `flashlfq_output_file__QuantifiedPeptides.md`);
   confirm against a real run's file.
4. **Rounding parity:** the Java 2dp rounding in D4 must match `modificationMass_CommonRounding_ReturnString`
   exactly (`toFixed(2)` semantics + trailing-zero strip) so the gate agrees with the display.
5. **Summed-mass edge cases:** N/C-terminal and unlocalized variable mods — confirm they are included in the
   variable-mod-mass sum consistently on both the build and join paths (shared method §5.1 guarantees this if
   fed the same mass collection).
6. **`groupId` sharing detection** renders the glyph on exactly the positional-isomer/same-summed-mass rows and
   not on a single collapsed row's internal rpids.

---

## 9. Verification / testing

- **Lumped Full Sequence sanity check (do FIRST, right after the D2 input-side change).** The one empirical
  loose end behind D2: input safety is source-confirmed (the service writes FlashLFQ's generic TSV with a
  separate `Peptide Monoisotopic Mass` column — `flashlfq_identifications_tsv_writer.py:38-54` — so mass comes
  from that column, not the string), but confirm **once on a real run** that FlashLFQ actually **quantifies** a
  non-positional lumped `Full Sequence` (`<baseSeq>[<summed variable mass>]`) rather than zeroing or erroring:
  run FlashLFQ once post-D2 and verify **non-zero** `Intensity_scanfile_id_<id>` for expected peptidoforms —
  **ideally matching the old positional path for a known peptidoform** (run the pre-change backup tree, or
  compare to a prior `QuantifiedPeaks`/positional result, for the same search). This converts the one inferred
  step (FlashLFQ treats `Full Sequence` as identity-only + averagine isotope model off the mass) into an
  observation. Low risk, but gates trusting the whole approach — so run it before the fuller runtime checks.
- **Build:** Java `compileJava`; front end fast type-check via tsgo (see the `fast-typecheck-tsgo` memory) and
  the FE-only Ant build.
- **Runtime (owner session):** log into local Limelight (`admin/admin`), run FlashLFQ on a search with
  reported-peptide-level variable mods and positional isomers; confirm: (a) one `QuantifiedPeptides.tsv` row per
  summed-mass form, (b) positional isomers show the same value + shared glyph, (c) any FlashLFQ-zeroed form shows
  `overlapping signal` and the bold searchable note appears, (d) unchecking "Variable Modifications" hides the
  column + shows the messages and disables run, (e) a crafted 2dp-colliding search is blocked with the new
  reject message. The CDP headless harness (memory `headless-browser-cdp-test-harness`) can drive the logged-in
  UI and introspect React props.
- **Data check:** for a real run, confirm the Java-joined values equal the intensities in the run's own
  `QuantifiedPeptides.tsv` (read-only parse; no FlashLFQ invocation).

---

## 10. Out of scope / unchanged
- Open-modification quant and **PSM-level** (dynamic) variable-mod quant remain **rejected** (unchanged).
- **Reported-peptide-level** variable mods and static mods remain fully supported (that is the whole point).
- Track B (DB-backed ingest) is still the eventual real home; this plan is the prototype/bridge evolution, and
  D3 (Java parses FlashLFQ output) is deliberately aligned with it.
