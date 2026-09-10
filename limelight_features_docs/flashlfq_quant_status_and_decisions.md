# FlashLFQ quant — current status & decisions (living doc)

**Last updated:** 2026-08-27
**Purpose:** the single at-a-glance page for *where the quant feature stands and what's been decided*. The
reasoning/analysis lives in the linked docs (see the **Doc map** at the bottom); this page is the index of
**state and decisions**, kept current. If you're picking up quant work, **start here**, then read the
governing-rule docs flagged below.

> **Since 2026-08-07 a large round of quant work landed** (all still **held uncommitted**): the project-page
> **"Add New Quant"** flow, a real **psb Quant Peptide page**, **MBR display**, a submit-time **JOINT vs
> PER_FILE run-model** choice, and the protein-page **NaN** crash fix — see **"New since 2026-08-07"** under
> Current state. Separately, the **peak-aggregation choice was resolved** — delegated to FlashLFQ by ingesting
> `QuantifiedPeptides.tsv` (front-end peak-summing removed), boss-approved 2026-08-10. **Track B (DB ingest)
> is still not built** and remains the commit gate.

> ## 🚩 BIGGEST UNRESOLVED CHOICE — how to turn FlashLFQ output into one displayed number
> **One decision still dominates quant correctness and is NOT yet made on purpose. Decide it before Track B
> hardens the ingest.** (Detail: Open decision #2 below.)
>
> **Per-feature quantity — apex height vs `--int` integrated area.** FlashLFQ's per-peptide value is either the
> feature's **apex height** (default, `--int` off) or its **integrated peak area** (`--int true`). Today's runs
> use **apex height**. Area is additive across a feature's extent and matches Limelight's area-based
> chromatogram; apex is more robust but FlashLFQ calls area noisier. Pick on purpose — the choice carries into
> Track B.
>
> **(RESOLVED — the companion "SUM vs MAX" question is decided.)** How to combine a peptidoform's peaks into one
> number is **no longer ours to pick**: Limelight ingests FlashLFQ's own per-peptide file
> (`QuantifiedPeptides.tsv`) so **FlashLFQ owns the aggregation**, and front-end peak-summing was removed
> (boss-approved 2026-08-10; see Settled decisions). So the value is FlashLFQ's single per-peptide number
> (above), **not** a Limelight sum of peaks. (The run-`36b59` SUM-vs-MAX data is now the *record of why we
> delegated*, not an open question.)

> **What v1 honestly is (today):** correct MS1 abundance **per (search, scan file)** for searches with **no
> open mods and no PSM-level variable mods**, **not sample-resolved**. Each Quant cell is **FlashLFQ's own
> per-peptide value** from `QuantifiedPeptides.tsv` (apex height by default; `--int` area optional) — **not a
> Limelight sum of peaks** (front-end peak-summing was removed, 2026-08-10). Limelight still sums **across
> distinct variable-mod forms** (groupIds) when "Collate: Variable Modifications" is off — a *different*
> mechanism, not peak-summing (`quant_PrototypeData.ts` `get_SummedQuantForDisplayForm`). Two topologies are
> supported: (a) multiple **searches** side by side (each its own per-search run + column); and (b) a **single
> search with sub-groups** mapping **1:1 to scan files**, with a submit-time **run-model choice** — **PER_FILE**
> (one run per scan file, **MBR off**, one Quant **column per sub-group**, mode 3, never summed across scan
> files) or **JOINT** (one run over the search's scan files together, **MBR on**, transferred cells marked
> **(MBR)**). Quant surfaces in three places: the injected Quant **column** on the existing peptide/protein/QC
> pages, a dedicated **psb Quant Peptide page** (`d/pg/psb/quant-peptide/`), and the project-page **"Add New
> Quant"** section. The "abundance matrix" ambition is still **not** what the current path delivers (see Open
> decision #1).

---

## Must-read governing rules (before writing quant code)

- **`flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md`** — PSM count may sum
  across scan files / sub-groups / searches / conditions; **quant may not**. This is the rule behind the
  per-scan-file run split (each scan file quantified separately, never summed) and the experiment-condition
  decline.
- **"Searches not supported for quant" (next section)** — quant is rejected for searches with open mods or
  PSM-level variable (dynamic) mods; the submit controller enforces this with reject **tripwires** —
  **don't delete a reject throw to fix a build error.**

## Searches not supported for quant (rejected by the submit controller)

Quant is **not supported** for a search that has **either**:
- **open modifications**, or
- **PSM-level variable (dynamic) modifications**.

**Why (same problem for both):** each puts *multiple peptidoform mass forms under one `reportedPeptideId`* — the
distinguishing mass lives on the **PSM**, not the reported peptide — so the rpid-keyed quant rollup under-splits.
(Open mods add a mass-per-candidate-position "cloud"; PSM-level variable mods vary per PSM.) Correctly
quantifying either needs a decomposed-component identity that is **deferred** (see
`flashlfq_open_mod_quant_correctness_boundary_2026-07-29.md` for the open-mod correctness ceiling).

**Enforcement (two layers):**
- **Front end** hides the "View / Add Quant" button when any selected search has open mods
  (`is__anyPsmHas_OpenModifications__TrueForAnySearch()`) or dynamic mods
  (`is__anyPsmHas_DynamicModifications__TrueForAnySearch()`) — decline reasons `HAS_OPEN_MODIFICATIONS` /
  `HAS_DYNAMIC_MODIFICATIONS` in `quant_Container_Component.tsx`.
- **Submit controller** (`FlashLFQ_Run__Request_Creation_RestWebserviceController`) **throws** if a request for
  such a search reaches it (backstop for the FE gate). These reject throws are the tripwires the code comments
  point back to *here*.

**The deferred, known-buggy open-mod and PSM-level-variable-mod _processing_ code was removed (2026-08-07)** —
only the reject tripwires remain. A future implementation will be written fresh.

## Current state (all feature CODE is HELD / uncommitted)

Everything below is **built + deployed but held uncommitted** (lands as one commit when Track B is done).
Only the **docs** are committed.

**Implemented & working (held):**
- **FlashLFQ owns aggregation** — Limelight ingests FlashLFQ's own per-peptide file (`QuantifiedPeptides.tsv`),
  joined to reported peptides in **Java** by grouping identity; **front-end peak-summing was removed**
  (2026-08-10). Replaces the earlier `QuantifiedPeaks` + FE-summing design (see Settled decisions). A single
  peptidoform's cell is FlashLFQ's own value; Limelight sums only **across distinct variable-mod forms** when
  "Collate: Variable Modifications" is off.
- **Per-(search, scan file) run keying** — one FlashLFQ run **per scan file** (server fans out; the browser
  submits one request). A normal single-file search = 1 run (unchanged); the one allowed multi-file search =
  N runs. `searchScanFileId` is in the URL hash (`projectSearchId_searchScanFileId_requestId`) and keys the
  display restriction. Replaces the former per-search grain and the multi-scan-file submit guard.
- **§5 dual gate** — a >1-scan-file search is allowed **only** when it is the sole selected search, has
  sub-groups, and its sub-groups map **1:1 to scan files**. Enforced in the FE (button hidden) **and** the
  submit controller (typed `FlashLFQ_Run_Reject_Reason`, 4 values). The 1:1 invariant is checked by **two**
  shared-code searchers, both must be FALSE (see "1:1 invariant" below).
- **Per-sub-group Quant columns (mode 3)** — the peptide-list table emits one Quant column per sub-group,
  each restricted to that sub-group's single scan file (`restrictToSearchScanFileId`). Verified populating.
- Prototype receive/display: URL-hash TSV fetch; per-search / per-sub-group Quant columns; **⚭ shared-signal
  flag**; Option-1 labeling.
- Mass computed in **Java** (canonical calculator).
- **`canRunQuant` owner/service gate** — the "View/Add Quant" button is shown **only** to a logged-in
  project owner (owner for ALL projectSearchIds) when the run service is configured
  (`RUN_FLASHLFQ_SERVICE_WEB_SERVICE_BASE_URL` non-empty). READ-level webservice returns `{ canRunQuant }`
  (a non-owner gets `false`, not a 403); the authoritative gate is still the owner-checked submit controller.
- **Open-mod & PSM-level variable-mod searches rejected** — reject tripwires only (the deferred processing
  code was removed); see "Searches not supported for quant".
- **1:1 invariant (was: sub-group partition)** — cross-cutting sub-groups declined, AND a sub-group spanning
  multiple scan files declined; together ⇒ sub-groups↔scan-files 1:1. The extra "spans multiple files"
  decline is a **deliberate scope choice** (not a limitation to fix): it's consistent with the current plan
  to not combine a search's sub-groups when comparing across searches, and our converters never emit a
  sub-group with >1 scan file anyway (see the eligibility doc §7–§8).

**New since 2026-08-07 (built + held, uncommitted — rounds landed):**
- **Ingest switched to `QuantifiedPeptides.tsv`** (2026-08-10) — FlashLFQ owns aggregation; FE peak-summing
  removed; the join runs in Java (`FlashLFQ_Run__Result_Retrieval_Joined_RestWebserviceController`), FE reads
  the `…-joined` endpoint. See Settled decisions + `flashlfq_quant_switch_to_QuantifiedPeptides_file…2026-08-10.md`.
- **Sum across collapsed variable-mod forms** (2026-08-12) — when "Collate: Variable Modifications" is off,
  quant sums over distinct `groupId`s into the collapsed row (any overlapping form ⇒ whole row `overlapping
  signal`); runs regardless of the toggle. Reverses switch-plan D6. **Implemented + runtime-verified** (held).
- **Quant on the Protein page** (2026-08-13) — two per-protein columns, **Quant (FlashLFQ)** (FlashLFQ's own
  per-protein weighted median-polish value, ingested from its **`QuantifiedProteins.tsv`** — proteins
  controller parses it, `flashlfq_proteinQuant_PrototypeData.ts` loads it) + **Quant (Limelight)** (a Limelight
  rollup of the per-peptide quant, deduped by `groupId`), shown per protein like NSAF (a protein group has no
  single quant value). See `flashlfq_quant_on_protein_page__as_shipped…2026-08-13.md`.
- **Project-page "Add New Quant" flow** — upload → parse → validate/map (in-memory store), **Category-A/B**
  eligible-search matching, submit (with the JOINT/PER_FILE run-model), **no-PSMs** handling, a **runs list**,
  and views. Lives in `.../project_page_quant_section/`. Decisions:
  `quant_add_new__{eligible_search_matching_categoryA_categoryB,full_quant_peptide_page}…2026-08-19.md`,
  `quant_add_new__{submit_run_model_change,submit_no_psms}…2026-08-20.md`,
  `quant_add_new__submit_joint_flashlfq_run_and_results_page_plan_2026-08-17.md`.
- **psb Quant Peptide page** — a real projectSearchId-based page at **`d/pg/psb/quant-peptide/`**
  (`AA_PageControllerPaths_Constants.java`), multi-run quant; the old dummy `d/pg/qt/flashlfq-peptide-quant`
  page was replaced.
- **MBR display** — MBR-transferred cells marked **`(MBR)`** + a **"Mark MBR when: any / all"** radio, both
  gated on `Quant_PrototypeData.hasAnyMbrData()` (box hidden when the loaded data has no MBR, e.g. PER_FILE
  runs). Includes the **JOINT-retrieval fix** (count guard retired; exact per-scan-file column selection) and
  the **`search_scan_file_id_<ssfid>`** column-name rename across the service + both retrieval controllers.
- **Existing peptide/protein/QC pages — run-model + MBR + fixes:** **phase-1** submit-time JOINT/PER_FILE
  run-model choice (`FlashLFQ_Run__Request_Creation_RestWebserviceController`, `runMode`); **phase-2** MBR
  display ported into the canonical page layer; the **`(MBR)` own-download-column** fix; and the protein-page
  **non-finite (NaN) crash fix** — a NaN protein now surfaces as **"FlashLFQ: NaN — not quantifiable across
  runs"** with a count **warning box**, instead of throwing (see `quant_things_to_deal_with_when_start_store_in_db.md`).
- **beforeunload-blocks-403-reload fix** — a blocking-guard **registry**
  (`limelight__BeforeUnload_BlockingGuard_Registry.ts`, cleared first by the single reload chokepoint) that the
  quant + experiments overlays now use instead of hand-rolled `beforeunload` listeners (+ a front_end/CLAUDE.md note).
- **"No Quant Runs" empty state** — the project-page Quant section renders the runs list for **all users**
  (owner-only "Add New Quant" button), showing a muted "No Quant Runs" message when there are none.

## Settled decisions

| Decision | Ruling | When / who |
|---|---|---|
| Per-search vs cross-search | **Model A** (per-search quant); Model B (cross-search joint run) NOT pursued | boss 2026-06-29 |
| Sample identity | `scan_file_tbl.id` | 2026-06-29 |
| Peak aggregation / which output file | **Delegated to FlashLFQ** — ingest FlashLFQ's own output files: **peptides → `QuantifiedPeptides.tsv`** (per-peptide value); **proteins → `QuantifiedProteins.tsv`** (per-protein weighted median-polish value, the protein-page **Quant (FlashLFQ)** column). Same "let FlashLFQ own the aggregation, point at its docs" approach at both levels; **front-end peak-summing removed**. Rationale (Dan/boss): defer the aggregation method to FlashLFQ rather than owning & defending a combine rule — so **SUM-vs-MAX is not ours to pick**. (The protein page's other column, **Quant (Limelight)**, is a *Limelight* rollup of the per-peptide values deduped by `groupId` — not a FlashLFQ file.) Replaces the earlier `QuantifiedPeaks` + FE-sum design | boss-approved 2026-08-10 |
| Filter scoping | **Option 1** — quant = peptidoform total over the *submit-time* PSM/peptide filters; NOT narrowed by secondary charge/RT/m·z/scan filters | boss 2026-07-10 |
| MBR | **off** for **PER_FILE** runs (each run = one scan file); **on** for a **JOINT** multi-scan-file run (submit-time run-model choice, for eligible sub-group searches). MBR-transferred cells are marked **`(MBR)`** in the display | design; JOINT run-model 2026-08-20 (held) |
| Combining a search's sub-groups | **Do NOT combine** a search's sub-groups into one number when comparing that search against other searches — hence multi-scan-file quant is single-search-only, and a sub-group is not summed across scan files either | 2026-08-03 |
| Multi-scan-file within one search | **IMPLEMENTED** — one FlashLFQ run **per scan file** (never summed), allowed only for a single search whose sub-groups map **1:1 to scan files** (§5 dual gate); per-sub-group columns (mode 3) | 2026-08-03 |
| Who may run quant (button) | **Logged-in project owner only** + run service configured (`canRunQuant` gate); non-owner/public = button hidden, no 403 | 2026-08-03 |
| Quant aggregation, generally | **PSM count may sum; quant may NOT** — across scan files, sub-groups, searches, conditions | 2026-07-29 |
| Experiment-page **conditions** | **Declined** — combining searches into one condition = fraction/replicate gap **+** cross-run non-comparability | 2026-07-30 |
| Open-mod quant | **DEFERRED** — searches rejected (out of scope); see "Searches not supported for quant" | 2026-07-29 |
| Searches with **PSM-level variable (dynamic) mods** | **Excluded** — FE hides the button + a single server tripwire at the top of the submit controller (`isAnyPsmHas_DynamicModifications`). Same rpid-spans-multiple-mass-forms problem as open mods | 2026-07-30 |
| Non-standard residues | keep 20 AA + U/O/J; drop X/B/Z/\* (explainability rule) | boss 2026-06-29 |
| Mass computation | in Java, single source of truth; service does no chemistry | boss decision |

## Deferred / declined (with why)

- **Open-mod quant (whole path)** — **out of scope / deferred**; searches are rejected (see "Searches not
  supported for quant"). Physics ceiling: per-form abundance is **unobtainable from MS1 DDA** (needs MS2/DIA).
  See `flashlfq_open_mod_quant_correctness_boundary_2026-07-29.md` (correctness ceiling) and the archived
  analysis `flashlfq_open_mod_quant_out_of_scope__mapping_analysis_archive_2026-08-07.md`.
- ~~**Multi-scan-file-within-one-search** — declined (guard).~~ **NOW IMPLEMENTED** (2026-08-03) as
  **per-scan-file runs** (see Settled decisions + Implemented list). Consistent with the original caveat:
  because Limelight has **no fraction-vs-replicate metadata and won't**, the values are **never silently
  summed** across scan files — each scan file's quant stays in its own per-sub-group column. Still gated to
  the one shape that is unambiguous: a single search whose sub-groups map 1:1 to scan files.
- **Searches with PSM-level variable (dynamic) modifications** — excluded, same treatment as open mods (FE
  hides the button; a single server tripwire at the top of the submit controller rejects a bypassed
  request). Same root problem: variable mods carried on the PSM (not the reported-peptide identity) mean one
  `reportedPeptideId` spans multiple peptidoform mass forms, so the rpid-keyed rollup under-splits.
  Reported-peptide-level variable mods are fine (one mass form per rpid). Revisit with the
  decomposed-component identity (open item #3 in the mapping doc).
- ~~**Mode 3 (per-sub-group columns)**~~ — **NOW IMPLEMENTED** (2026-08-03). Confirmed **no DB dependency**
  (Open decision #5 resolved): the `subGroup → searchScanFileId` map is built **client-side** from
  `psmId → searchSubGroupId` joined with per-PSM `searchScanFileId` from the **filtered** main-filters PSM
  table data (NOT the unfiltered loader). Under the 1:1 invariant the map is single-valued, so each
  sub-group's column restricts to exactly one scan file.
- **Track B (DB ingest of the quant results)** — not built. Would persist the joined per-peptide /
  per-protein values (from `QuantifiedPeptides` / `QuantifiedProteins`) at import time instead of the current
  on-demand HTTP fetch + per-render interpretation. This is the gate to committing the feature (see below).
  - **Ingest-time program-specific-value handling & multi-program design:** see
    `quant_things_to_deal_with_when_start_store_in_db.md`.

## Open decisions (NOT yet decided)

1. **Strategic — what is v1? (H1/H2).** The composed decisions collapse the abundance **matrix** into a
   **per-(search, scan-file) scalar** (sample axis summed/deferred/declined). Decide on purpose: is v1 that
   scalar, or must the sample/condition axis survive? Everything else is downstream.
2. **Apex vs area** (the remaining biggest FlashLFQ-processing choice). FlashLFQ's per-peptide value is the
   feature's **apex height** by default (`--int` off) — today's setting — or its **integrated area**
   (`--int true`). Area is additive across the feature and matches Limelight's area-based chromatogram; apex is
   more robust but FlashLFQ calls area noisier. Decide on purpose; the choice carries into Track B. See
   `flashlfq_quant_peak_summing_vs_flashlfq_peptide_output_2026-08-05.md`.
2b. **~~Feature aggregation — SUM vs MAX~~ — RESOLVED (2026-08-10).** No longer ours to pick: Limelight ingests
   FlashLFQ's own per-peptide file (`QuantifiedPeptides.tsv`) so **FlashLFQ owns the aggregation**, and
   front-end peak-summing was removed (see Settled decisions). The run-`36b59` SUM-vs-MAX data
   (`flashlfq_quant_peak_summing_vs_flashlfq_peptide_output_2026-08-05.md` + the
   `…aggregation_decision_brief_2026-08-05.md`) is now the **record of why we delegated**, not an open question.
3. **Decline scope & messaging** (the deferred "one decision"): when a search is ineligible (multi-file,
   open-mod, cross-cutting sub-groups) in a mixed view — decline just that **column** (recommended) vs hide
   quant for the whole view; and a visible "n/a — why" message (recommended) vs silent absence.
4. **Track B DB model** — run keying under Option 1 (`projectSearchId` + submit-filter-state + scanFileId),
   run accumulation/GC (H9).
5. **~~Does mode-3 (sub-groups) actually need the DB?~~ — RESOLVED (2026-08-03): NO.** Mode 3 is
   implemented client-side. The `subGroup → searchScanFileId` map is built from `psmId → searchSubGroupId`
   joined with per-PSM `searchScanFileId` taken from the **filtered main-filters PSM table data**
   (`...PSM_TblData_For_ReportedPeptideId_For_MainFilters`, `get_PsmTblData_For_PsmId(psmId).searchScanFileId`)
   — **NOT** the unfiltered `..._NO_PSM_Peptide_Protein_Filtering__PSM_TblData` loader (respects the user's
   cutoffs; the nullable `searchScanFileId` is guarded). No backfill was needed.
   **The authority still lives server-side:** the eligibility decision (whether a search may produce
   per-sub-group quant) is made by the §5 submit-controller gate in Java, not by the client's convenience map.
   **Precondition — INVARIANT (now tightened to 1:1):** sub-group and scan file are **independent** per-PSM
   attributes with **no guaranteed alignment**. The original rule required only that sub-groups *partition*
   scan files (no scan file has PSMs in >1 sub-group). The **implemented** gate is **stronger — a 1:1
   bijection**: it ALSO rejects a sub-group whose PSMs span >1 scan file, because each per-sub-group Quant
   column restricts to a **single** `searchScanFileId` and a sub-group spanning multiple files would require
   summing quant across files (not allowed). Both facts are checked by two shared-code searchers, both must
   be FALSE: `Search_AnyScanFile_HasPsms_In_MultipleSubGroups_ForSearchId_Searcher` (no scan file mixes
   sub-groups) **and** `Search_AnySubGroup_HasPsms_In_MultipleScanFiles_ForSearchId_Searcher` (no sub-group
   spans scan files). See `flashlfq_quant_subgroup_scanfile_eligibility.md` §9 (updated).
6. **Silent exclusion of mass-uncomputable peptides — user MUST be informed (major, disclosure
   correctness).** Quant currently drops any reported peptide whose monoisotopic mass can't be computed
   **silently** — a blanket `catch ( Exception e )` in `FlashLFQ_Run_GatherPsms_And_SendRequest_Service`
   (~:526 / ~:576) is the *sole* enforcement of the non-standard-residue policy (there is no explicit
   residue allow-list; whatever the mass calculator can't mass is dropped) and only `log.warn`s; nothing
   reaches the user. **Principle: the user MUST always be informed of ALL excluded data and why.** NOW
   (no DB): surface the **count** of excluded reported peptides (and their PSMs) at run time; keep the
   broad catch with a generic *"mass could not be computed"* label + log specifics server-side (decision:
   generic label, not a residue-specific reason). LATER (Track B / DB): persist the excluded **peptide
   ids** so the excluded peptides can be displayed on demand — storage location TBD (the run is not yet
   persisted in the DB). Open sub-choices: *where* the "now" count is surfaced (transient submit-time vs
   recompute-at-display) and the exact count granularity.

## Commit gate

**All feature code is held uncommitted and lands as ONE commit when Track B (DB ingest) is done.** Only the
design/analysis/status docs are committed. In-code open-mod / PSM-level variable-mod reject `throw` tripwires
and the §5 multi-scan-file gate (typed `FlashLFQ_Run_Reject_Reason`) live with that held code.

## Doc map (the quant doc set)

**Status / rules (start here):**
- `flashlfq_quant_status_and_decisions.md` — *this doc.*
- `flashlfq_quant_aggregation_decision_brief_2026-08-05.md` — **one-page meeting brief**: SUM-vs-MAX &
  apex-vs-area, options × use-cases × tradeoffs, run-`36b59` numbers. **SUM-vs-MAX is now decided** (delegated
  to FlashLFQ, 2026-08-10) — read this for *why*; **apex-vs-area is still open**.
- `flashlfq_quant_peak_summing_vs_flashlfq_peptide_output_2026-08-05.md` — the SUM-vs-MAX & apex-vs-area data;
  FlashLFQ MAX-picks (not sum), pin-verified vs mzLib `1.0.566` + head-to-head on run `36b59`. **The record of
  why SUM-vs-MAX was resolved by switching to `QuantifiedPeptides` (still the reference for apex-vs-area).**
- `flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md` — the aggregation rule.
- (`flashlfq_open_mod_quant_deferred_mass_doublecount.md` — **removed 2026-08-07**; its tripwire-anchor content
  described code that has since been deleted. Non-support is now stated in the "Searches not supported for quant"
  section above; open-mod rationale lives in `flashlfq_open_mod_quant_correctness_boundary_2026-07-29.md`.)

**Design:**
- `quant_maxquant_design_discussion.md` — overarching design + Model A/B history.
- `flashlfq_output_to_limelight_mapping.md` — original peaks-as-source-of-truth ingest + identity round-trip
  (**superseded 2026-08-10** by the `QuantifiedPeptides` switch below; still useful for the identity round-trip).
- `flashlfq_quant_switch_to_QuantifiedPeptides_file__implementation_plan_2026-08-10.md` — **the ingest switch**:
  parse `QuantifiedPeptides.tsv` in Java, join to reported peptides by grouping identity, remove FE peak-summing.
  **Boss-approved + IMPLEMENTED (held).** This is what resolved the SUM-vs-MAX choice.
- `flashlfq_quant_data_model_and_display_grains.md` — storage grain + display roll-up modes.
- `quant_things_to_deal_with_when_start_store_in_db.md` — **Track B design memo**: per-program tracking,
  translating program-specific sentinels like FlashLFQ's `NaN` to a common representation at ingest,
  store-explanation-by-message-id, multi-program support.
- `flashlfq_quant_subgroup_scanfile_eligibility.md` — sub-group eligibility; the 1:1 sub-group↔scan-file
  invariant + the two searchers that enforce it.
- `flashlfq_per_scan_file_separate_run_rationale.md` — one run per scan file; MBR incompatibility.
- `flashlfq_quant_run_on_final_filtered_psms.md` — within-feature non-decomposability (charge ~54%).
- `flashlfq_results_matched_to_datatable_display__2026-07-29_0856_PDT.md` — how results match the DataTable.
- `flashlfq_summary_and_comparison.md` — FlashLFQ technical summary + tool comparison.

**FlashLFQ output-file reference (source-verified vs mzLib `1.0.566`):**
- `flashlfq_output_file__QuantifiedPeptides.md` — what the peptide file contains: per-modified-sequence **MAX**
  of unambiguous peaks (shared → 0); a MAX-reduction of the peaks file.
- `flashlfq_output_file__QuantifiedProteins.md` — what the protein file contains: **weighted median polish**
  over unambiguous single-protein peptides (NOT top-3 — verified on real data); two reductions off the peaks file.

**Plans:**
- `flashlfq_quant_per_scanfile_run_keying_plan.md` — per-(search, scan file) run keying to support a single
  search with sub-searches (multiple scan files): the §5 dual gate (button + submit), server-side fan-out,
  `searchScanFileId` in the URL hash, per-sub-group Quant columns, and the ordered task list. **Implemented
  2026-08-03** (tasks 1–8; plus the 1:1-invariant dual searcher and the `canRunQuant` owner gate added during
  implementation) — this resolved the multi-scan-file "DECLINED" row and Open decision #5 (mode-3).
- `flashlfq_quant_sum_across_variable_mod_forms_when_collate_unchecked__implementation_plan_2026-08-12.md` —
  **reverses switch-plan D6**: when "Collate: Variable Modifications" is unchecked, SUM quant over distinct
  `groupId`s into the collapsed row (any overlapping form → whole row `overlapping signal`); allow running
  regardless of the toggle. **IMPLEMENTED + runtime-verified 2026-08-12 (held).**

**Add New Quant + page surfaces (2026-08-12 → 2026-08-27; all held):**
- `flashlfq_quant_on_protein_page__as_shipped_option_C_2026-08-13.md` — the two per-protein columns as shipped
  (**Quant (FlashLFQ)** + **Quant (Limelight)**); `…options_and_implementation_plan_2026-08-12.md` is the plan.
- `flashlfq_quant_on_qc_page__run_and_load_results__implementation_plan_2026-08-12.md` — QC-page quant.
- `quant_add_new_quant__file_upload_parse_plan_v2_2026-08-14.md` — the "Add New Quant" upload/parse/map flow
  (v2 supersedes the v1 plan).
- `quant_add_new__eligible_search_matching_categoryA_categoryB_decisions_2026-08-19.md` — Category-A/B search
  matching; `quant_add_new__full_quant_peptide_page_decisions_2026-08-19.md` — the psb Quant Peptide page.
- `quant_add_new__submit_run_model_change_decisions_2026-08-20.md` — JOINT/PER_FILE run model;
  `quant_add_new__submit_no_psms_to_run_decisions_2026-08-20.md` (+ the peptide-page variant) — no-PSMs handling;
  `quant_add_new__submit_joint_flashlfq_run_and_results_page_plan_2026-08-17.md` — joint run + results page.

**Reviews (2026-07-29 set):**
- `flashlfq_quant_mapping_critical_review_2026-07-29.md` — composed-design holes H1–H9.
- `flashlfq_usage_critical_review_2026-07-29.md` — end-to-end code-observed usage audit.
- `flashlfq_open_mod_quant_correctness_boundary_2026-07-29.md` — open-mod correctness ceiling (MS1 physics).
