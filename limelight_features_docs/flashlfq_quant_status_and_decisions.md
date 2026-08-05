# FlashLFQ quant — current status & decisions (living doc)

**Last updated:** 2026-08-05
**Purpose:** the single at-a-glance page for *where the quant feature stands and what's been decided*. The
reasoning/analysis lives in the linked docs (see the **Doc map** at the bottom); this page is the index of
**state and decisions**, kept current. If you're picking up quant work, **start here**, then read the
governing-rule docs flagged below.

> ## 🚩 BIGGEST UNRESOLVED CHOICES — how to turn FlashLFQ output into one displayed number
> **These two decisions dominate quant correctness and are NOT yet made on purpose. Decide them before Track B
> hardens the ingest — both rules carry straight into Track B.** (Detail: Open decisions #2 and #2b below;
> full data + source trace in `flashlfq_quant_peak_summing_vs_flashlfq_peptide_output_2026-08-05.md`.
> **One-page meeting brief: `flashlfq_quant_aggregation_decision_brief_2026-08-05.md`.**)
>
> 1. **Feature aggregation — SUM vs MAX vs deliberate.** Limelight currently **SUMs** a peptidoform's peaks.
>    FlashLFQ itself takes the **MAX** (single most-intense peak) and zeroes shared forms — pin-verified vs
>    mzLib `1.0.566`; **the old "FlashLFQ sums too" justification is FALSE, so SUM is not the magic answer.**
>    Measured (run `36b59`): SUM == MAX for **77%** of peptidoforms, **over-counts the other 23%** (median
>    +12%, up to 4.5×; ~7% run aggregate), mostly by summing spurious secondary peaks FlashLFQ discards — but
>    raw MAX under-counts genuine multi-feature peptides. Pick a rule deliberately.
> 2. **Per-feature quantity — apex height vs `--int` integrated area.** Today = **apex height** (`--int` off);
>    a **sum of apex heights is not physically additive** and never matches Limelight's area-based
>    chromatogram. Area is additive but FlashLFQ calls it noisier. Today's display is a SUM of apex heights —
>    the least-additive corner of the space.

> **What v1 honestly is (today):** correct MS1 abundance **per (search, scan file)** for searches with **no
> open mods and no PSM-level variable mods**, reported as **summed apex heights** by default, **not
> sample-resolved**. Each run sees **exactly one scan file** (MBR off by construction). Two topologies are
> supported: (a) multiple **searches** shown side by side (each its own per-search run + column); and (b) a
> **single search with sub-groups** whose sub-groups map **1:1 to scan files** — one FlashLFQ run per scan
> file, one Quant **column per sub-group** (mode 3), never summed across scan files. That's it — the
> "abundance matrix" ambition is **not** what the current path delivers (see Open decision #1).

---

## Must-read governing rules (before writing quant code)

- **`flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md`** — PSM count may sum
  across scan files / sub-groups / searches / conditions; **quant may not**. This is the rule behind the
  per-scan-file run split (each scan file quantified separately, never summed) and the experiment-condition
  decline.
- **`flashlfq_open_mod_quant_deferred_mass_doublecount.md`** — open-mod quant is deferred and fenced with
  in-code `throw` tripwires; **don't delete a throw to fix a build error.**

## Current state (all feature CODE is HELD / uncommitted)

Everything below is **built + deployed but held uncommitted** (lands as one commit when Track B is done).
Only the **docs** are committed.

**Implemented & working (held):**
- Peaks-as-source-of-truth ingest design (`QuantifiedPeaks`, not the zeroed `QuantifiedPeptides`).
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
- Mass computed in **Java** (canonical calculator) + open-mod jitter **binning**.
- **`canRunQuant` owner/service gate** — the "View/Add Quant" button is shown **only** to a logged-in
  project owner (owner for ALL projectSearchIds) when the run service is configured
  (`RUN_FLASHLFQ_SERVICE_WEB_SERVICE_BASE_URL` non-empty). READ-level webservice returns `{ canRunQuant }`
  (a non-owner gets `false`, not a 403); the authoritative gate is still the owner-checked submit controller.
- **Open-mod tripwires** — throw guards at every open-mod processing site (deferred).
- **1:1 invariant (was: sub-group partition)** — cross-cutting sub-groups declined, AND a sub-group spanning
  multiple scan files declined; together ⇒ sub-groups↔scan-files 1:1. The extra "spans multiple files"
  decline is a **deliberate scope choice** (not a limitation to fix): it's consistent with the current plan
  to not combine a search's sub-groups when comparing across searches, and our converters never emit a
  sub-group with >1 scan file anyway (see the eligibility doc §7–§8).

## Settled decisions

| Decision | Ruling | When / who |
|---|---|---|
| Per-search vs cross-search | **Model A** (per-search quant); Model B (cross-search joint run) NOT pursued | boss 2026-06-29 |
| Sample identity | `scan_file_tbl.id` | 2026-06-29 |
| Which output file to ingest | **`QuantifiedPeaks`** (feature grain); attribute + roll up ourselves | design |
| Filter scoping | **Option 1** — quant = peptidoform total over the *submit-time* PSM/peptide filters; NOT narrowed by secondary charge/RT/m·z/scan filters | boss 2026-07-10 |
| MBR | **off**, forced by single-file runs | design |
| Combining a search's sub-groups | **Do NOT combine** a search's sub-groups into one number when comparing that search against other searches — hence multi-scan-file quant is single-search-only, and a sub-group is not summed across scan files either | 2026-08-03 |
| Multi-scan-file within one search | **IMPLEMENTED** — one FlashLFQ run **per scan file** (never summed), allowed only for a single search whose sub-groups map **1:1 to scan files** (§5 dual gate); per-sub-group columns (mode 3) | 2026-08-03 |
| Who may run quant (button) | **Logged-in project owner only** + run service configured (`canRunQuant` gate); non-owner/public = button hidden, no 403 | 2026-08-03 |
| Quant aggregation, generally | **PSM count may sum; quant may NOT** — across scan files, sub-groups, searches, conditions | 2026-07-29 |
| Experiment-page **conditions** | **Declined** — combining searches into one condition = fraction/replicate gap **+** cross-run non-comparability | 2026-07-30 |
| Open-mod quant | **DEFERRED**, fenced with tripwires | 2026-07-29 |
| Searches with **PSM-level variable (dynamic) mods** | **Excluded** — FE hides the button + a single server tripwire at the top of the submit controller (`isAnyPsmHas_DynamicModifications`). Same rpid-spans-multiple-mass-forms problem as open mods | 2026-07-30 |
| Non-standard residues | keep 20 AA + U/O/J; drop X/B/Z/\* (explainability rule) | boss 2026-06-29 |
| Mass computation | in Java, single source of truth; service does no chemistry | boss decision |

## Deferred / declined (with why)

- **Open-mod quant (whole path)** — deferred. Two **confirmed code bugs** (mass double-count = H8;
  receive-side positional-isomer key collision = H4) and a **physics ceiling**: per-open-mod-form abundance
  is **unobtainable from MS1 DDA** (needs MS2/DIA). Honest achievable deliverable = peptide/protein totals +
  well-resolved forms, everything else flagged. See the correctness-boundary + deferred-bug docs.
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
- **Track B (DB ingest of `QuantifiedPeaks`)** — not built. This is the gate to committing the feature (see
  below).

## Open decisions (NOT yet decided)

1. **Strategic — what is v1? (H1/H2).** The composed decisions collapse the abundance **matrix** into a
   **per-(search, scan-file) scalar** (sample axis summed/deferred/declined). Decide on purpose: is v1 that
   scalar, or must the sample/condition axis survive? Everything else is downstream.
2. **Apex vs area** (one of the **two biggest FlashLFQ-processing choices** — see 2b). The summed display
   sums **apex heights** by default (`--int` off). Switch to `--int true` (additive area, matches the
   chromatogram) or keep apex (robust, but label it as relative, not an additive area)? See the review doc's
   "Open decision — apex vs area" and `flashlfq_quant_peak_summing_vs_flashlfq_peptide_output_2026-08-05.md`.
2b. **Feature aggregation — SUM vs MAX vs deliberate (NEW, 2026-08-05; the other biggest choice).** How to
   combine a peptidoform's multiple `QuantifiedPeaks` rows into one number. Limelight currently **SUMs** them;
   FlashLFQ's own `QuantifiedPeptides` takes the **MAX** (single most-intense peak) and zeroes shared forms —
   pin-verified against mzLib `1.0.566`. **SUM is not a magically-correct default** (the earlier "FlashLFQ
   sums too" justification was FALSE). Measured on run `36b59`: SUM == MAX for **77%** of peptidoforms but
   **over-counts the other 23%** (median +12%, up to 4.5×; ~7% at the run aggregate), per-peptide-variable,
   mostly by summing small secondary/spurious peaks FlashLFQ discards. But raw MAX **under-counts** genuine
   multi-feature peptides — so decide a rule on purpose (match FlashLFQ / dominant feature / sum vetted real
   features only). Together with (2) apex-vs-area, these are the two largest decisions in processing FlashLFQ
   results, and both carry into Track B. Full data + source trace:
   `flashlfq_quant_peak_summing_vs_flashlfq_peptide_output_2026-08-05.md`.
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

## Commit gate

**All feature code is held uncommitted and lands as ONE commit when Track B (DB ingest) is done.** Only the
design/analysis/status docs are committed. In-code open-mod `throw` tripwires and the §5 multi-scan-file
gate (typed `FlashLFQ_Run_Reject_Reason`) live with that held code.

## Doc map (the quant doc set)

**Status / rules (start here):**
- `flashlfq_quant_status_and_decisions.md` — *this doc.*
- `flashlfq_quant_aggregation_decision_brief_2026-08-05.md` — **one-page meeting brief**: SUM-vs-MAX &
  apex-vs-area, options × use-cases × tradeoffs, with the run-`36b59` numbers. For deciding the two axes.
- `flashlfq_quant_peak_summing_vs_flashlfq_peptide_output_2026-08-05.md` — **the two biggest processing
  decisions (SUM vs MAX, apex vs area)**; FlashLFQ MAX-picks (not sum), pin-verified vs mzLib `1.0.566` +
  data head-to-head on run `36b59`.
- `flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md` — the aggregation rule.
- `flashlfq_open_mod_quant_deferred_mass_doublecount.md` — open-mod deferred + in-code tripwires.

**Design:**
- `quant_maxquant_design_discussion.md` — overarching design + Model A/B history.
- `flashlfq_output_to_limelight_mapping.md` — peaks-as-source-of-truth ingest + identity round-trip.
- `flashlfq_quant_data_model_and_display_grains.md` — storage grain + display roll-up modes.
- `flashlfq_quant_subgroup_scanfile_eligibility.md` — sub-group eligibility; the 1:1 sub-group↔scan-file
  invariant + the two searchers that enforce it.
- `flashlfq_per_scan_file_separate_run_rationale.md` — one run per scan file; MBR incompatibility.
- `flashlfq_quant_run_on_final_filtered_psms.md` — within-feature non-decomposability (charge ~54%).
- `flashlfq_results_matched_to_datatable_display__2026-07-29_0856_PDT.md` — how results match the DataTable.
- `flashlfq_summary_and_comparison.md` — FlashLFQ technical summary + tool comparison.

**Plans:**
- `flashlfq_quant_per_scanfile_run_keying_plan.md` — per-(search, scan file) run keying to support a single
  search with sub-searches (multiple scan files): the §5 dual gate (button + submit), server-side fan-out,
  `searchScanFileId` in the URL hash, per-sub-group Quant columns, and the ordered task list. **Implemented
  2026-08-03** (tasks 1–8; plus the 1:1-invariant dual searcher and the `canRunQuant` owner gate added during
  implementation) — this resolved the multi-scan-file "DECLINED" row and Open decision #5 (mode-3).

**Reviews (2026-07-29 set):**
- `flashlfq_quant_mapping_critical_review_2026-07-29.md` — composed-design holes H1–H9.
- `flashlfq_usage_critical_review_2026-07-29.md` — end-to-end code-observed usage audit.
- `flashlfq_open_mod_quant_correctness_boundary_2026-07-29.md` — open-mod correctness ceiling (MS1 physics).
