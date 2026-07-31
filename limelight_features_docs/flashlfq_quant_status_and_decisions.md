# FlashLFQ quant — current status & decisions (living doc)

**Last updated:** 2026-07-30
**Purpose:** the single at-a-glance page for *where the quant feature stands and what's been decided*. The
reasoning/analysis lives in the linked docs (see the **Doc map** at the bottom); this page is the index of
**state and decisions**, kept current. If you're picking up quant work, **start here**, then read the
governing-rule docs flagged below.

> **What v1 honestly is (today):** correct MS1 abundance **per (search, scan file)** for a **single search
> with no open mods and no PSM-level variable mods, over one scan file** (or genuine fractions), reported as **summed apex heights** by
> default, **not sample-resolved**. Multiple searches can be shown **side by side** (each its own per-search
> run + column). That's it — the "abundance matrix" ambition is **not** what the current path delivers (see
> Open decision #1).

---

## Must-read governing rules (before writing quant code)

- **`flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md`** — PSM count may sum
  across scan files / sub-groups / searches / conditions; **quant may not**. This is the rule behind the
  multi-file guard and the experiment-condition decline.
- **`flashlfq_open_mod_quant_deferred_mass_doublecount.md`** — open-mod quant is deferred and fenced with
  in-code `throw` tripwires; **don't delete a throw to fix a build error.**

## Current state (all feature CODE is HELD / uncommitted)

Everything below is **built + deployed but held uncommitted** (lands as one commit when Track B is done).
Only the **docs** are committed.

**Implemented & working (held):**
- Peaks-as-source-of-truth ingest design (`QuantifiedPeaks`, not the zeroed `QuantifiedPeptides`).
- **Per-search runs** — one FlashLFQ run per search; multi-search button enabled.
- Prototype receive/display: URL-hash TSV fetch; **one "Quant" column per search** after its PSM Count
  column; **⚭ shared-signal flag**; Option-1 labeling.
- Mass computed in **Java** (canonical calculator) + open-mod jitter **binning**.
- **Multi-scan-file guard** — the submit controller rejects the whole request if any selected search has >1
  raw scan file (see Declined below).
- **Open-mod tripwires** — throw guards at every open-mod processing site (deferred).
- **Sub-group eligibility** — cross-cutting sub-groups declined.

## Settled decisions

| Decision | Ruling | When / who |
|---|---|---|
| Per-search vs cross-search | **Model A** (per-search quant); Model B (cross-search joint run) NOT pursued | boss 2026-06-29 |
| Sample identity | `scan_file_tbl.id` | 2026-06-29 |
| Which output file to ingest | **`QuantifiedPeaks`** (feature grain); attribute + roll up ourselves | design |
| Filter scoping | **Option 1** — quant = peptidoform total over the *submit-time* PSM/peptide filters; NOT narrowed by secondary charge/RT/m·z/scan filters | boss 2026-07-10 |
| MBR | **off**, forced by single-file runs | design |
| Multi-scan-file within one search | **DECLINED for now** (temporary submit guard) — do **not** sum quant across the files | 2026-07 |
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
- **Multi-scan-file-within-one-search** — declined (guard). If ever built: **per-file runs**, and — because
  Limelight has **no fraction-vs-replicate metadata and won't** — **do not silently sum**; use per-scan-file
  values or an explicit user "these are fractions" assertion.
- **Searches with PSM-level variable (dynamic) modifications** — excluded, same treatment as open mods (FE
  hides the button; a single server tripwire at the top of the submit controller rejects a bypassed
  request). Same root problem: variable mods carried on the PSM (not the reported-peptide identity) mean one
  `reportedPeptideId` spans multiple peptidoform mass forms, so the rpid-keyed rollup under-splits.
  Reported-peptide-level variable mods are fine (one mass form per rpid). Revisit with the
  decomposed-component identity (open item #3 in the mapping doc).
- **Mode 3 (per-sub-group columns) — sub-groups (a.k.a. sub-searches)** — deferred **as a demo
  simplification** (get something running first), **not** because it has a hard DB dependency. It needs the
  per-search `scanFileId → searchSubGroupId` mapping; the prior assumption was DB/backfill, but see Open
  decision #5 — that mapping looks derivable client-side from data the page already loads.
- **Track B (DB ingest of `QuantifiedPeaks`)** — not built. This is the gate to committing the feature (see
  below).

## Open decisions (NOT yet decided)

1. **Strategic — what is v1? (H1/H2).** The composed decisions collapse the abundance **matrix** into a
   **per-(search, scan-file) scalar** (sample axis summed/deferred/declined). Decide on purpose: is v1 that
   scalar, or must the sample/condition axis survive? Everything else is downstream.
2. **Apex vs area.** The summed display sums **apex heights** by default (`--int` off). Switch to
   `--int true` (additive area, matches the chromatogram) or keep apex (robust, but label it as relative,
   not an additive area)? See the review doc's "Open decision — apex vs area."
3. **Decline scope & messaging** (the deferred "one decision"): when a search is ineligible (multi-file,
   open-mod, cross-cutting sub-groups) in a mixed view — decline just that **column** (recommended) vs hide
   quant for the whole view; and a visible "n/a — why" message (recommended) vs silent absence.
4. **Track B DB model** — run keying under Option 1 (`projectSearchId` + submit-filter-state + scanFileId),
   run accumulation/GC (H9).
5. **Does mode-3 (sub-groups) actually need the DB?** — *observation, unverified.* Sub-groups were deferred
   only to simplify getting a demo running, and the "mode-3 needs a `scanFileId → searchSubGroupId`
   DB/backfill" premise may be wrong: the front-end data-loading subsystem
   (`front_end_data_loading__common_data_loaded_from_server_per_search.md`) shows the page **already loads**
   `SearchSubGroupId_ForPSM_ID_NOT_Filtered` (`Map<psmId, searchSubGroupId>`) and per-PSM `searchScanFileId`
   (PSM table data), so `scanFile → subGroup` looks **derivable client-side** without a new backfill.
   *Caveat:* the eligibility doc deliberately chose to compute this **server-side in Java for authority**, so
   "can derive client-side" ≠ "should"; and the unfiltered loader's coverage must be verified before relying
   on it. Re-examine when mode-3 is picked up rather than assuming the DB is required.
   **Precondition either way — INVARIANT:** sub-group and scan file are **independent** per-PSM attributes
   with **no guaranteed alignment** (PSMs sharing a sub-group are not guaranteed to share a scan file, and
   vice versa). So the `scanFile → subGroup` mapping is **well-defined only when sub-groups *partition* scan
   files** (no scan file has PSMs in >1 sub-group). This **must always be validated true before a search
   with sub-groups is allowed to produce per-sub-group quant** — it is the existing eligibility rule
   (`flashlfq_quant_subgroup_scanfile_eligibility.md` §9; searcher
   `Search_AnyScanFile_HasPsms_In_MultipleSubGroups_ForSearchId_Searcher`). The same client data
   (`psmId → subGroupId` + per-PSM `searchScanFileId`) that could derive the mapping also supports this
   validation.

## Commit gate

**All feature code is held uncommitted and lands as ONE commit when Track B (DB ingest) is done.** Only the
design/analysis/status docs are committed. In-code open-mod `throw` tripwires and the multi-file guard live
with that held code.

## Doc map (the quant doc set)

**Status / rules (start here):**
- `flashlfq_quant_status_and_decisions.md` — *this doc.*
- `flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md` — the aggregation rule.
- `flashlfq_open_mod_quant_deferred_mass_doublecount.md` — open-mod deferred + in-code tripwires.

**Design:**
- `quant_maxquant_design_discussion.md` — overarching design + Model A/B history.
- `flashlfq_output_to_limelight_mapping.md` — peaks-as-source-of-truth ingest + identity round-trip.
- `flashlfq_quant_data_model_and_display_grains.md` — storage grain + display roll-up modes.
- `flashlfq_quant_subgroup_scanfile_eligibility.md` — sub-group partition-vs-cross-cut rule.
- `flashlfq_per_scan_file_separate_run_rationale.md` — one run per scan file; MBR incompatibility.
- `flashlfq_quant_run_on_final_filtered_psms.md` — within-feature non-decomposability (charge ~54%).
- `flashlfq_results_matched_to_datatable_display__2026-07-29_0856_PDT.md` — how results match the DataTable.
- `flashlfq_summary_and_comparison.md` — FlashLFQ technical summary + tool comparison.

**Plans:**
- `flashlfq_quant_per_scanfile_run_keying_plan.md` — per-(search, scan file) run keying to support a single
  search with sub-searches (multiple scan files): the §5 dual gate (button + submit), server-side fan-out,
  `searchScanFileId` in the URL hash, per-sub-group Quant columns, and the ordered task list. Resolves the
  multi-scan-file "DECLINED" row and Open decision #5 (mode-3).

**Reviews (2026-07-29 set):**
- `flashlfq_quant_mapping_critical_review_2026-07-29.md` — composed-design holes H1–H9.
- `flashlfq_usage_critical_review_2026-07-29.md` — end-to-end code-observed usage audit.
- `flashlfq_open_mod_quant_correctness_boundary_2026-07-29.md` — open-mod correctness ceiling (MS1 physics).
