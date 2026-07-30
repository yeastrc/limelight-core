# Quant: when MS1 intensities can (and cannot) be summed — scan files, sub-groups, searches, conditions

**Date:** 2026-07-29
**Status:** governing principle for FlashLFQ / MS1 quant aggregation. Read this **before writing any code
that combines, sums, rolls up, or shows a single quant number for a group of things** — multiple scan
files, multiple sub-groups, multiple searches, or an experiment *condition*. (Filed under a deliberately
blunt name because this is the exact trap you hit when you think "I'll just sum the scan-file quant like we
sum PSM count.")

> ## THE ONE RULE
> **PSM count aggregates freely. Quant does NOT.**
> A PSM count is an additive count of identifications, so summing it across anything is always fine. An MS1
> quant value is a *physical measurement* of one peptidoform in one raw file from one run — you may **only**
> aggregate it across units that were **(a) co-measured in one run** and **(b) known-valid to combine**.
> Everywhere the UI collapses several units into one column/row, PSM count may sum but **quant must either
> stay at the measured grain or be DECLINED — it may never silently follow PSM count's sum.**

---

## Why: the measured grain, and the two directions you cannot move freely

The atom of MS1 label-free quant is **(peptidoform, scan file, one FlashLFQ run) → intensity**. From that
atom there are two directions the UI is tempted to move, and **both are constrained**:

- **You cannot subdivide *below* the grain.** An integrated/apex precursor feature is not decomposable into
  per-charge, per-PSM, or per-(sub-group-sharing-a-file) pieces — that information isn't in the data. (The
  ~54% charge-filter over-count and the "can't split a shared peak" results are covered in
  `flashlfq_quant_run_on_final_filtered_psms.md` and `flashlfq_open_mod_quant_correctness_boundary_2026-07-29.md`.
  Not this doc's focus.)
- **You cannot aggregate *above* the grain freely.** Summing intensities across scan files / searches /
  conditions is valid only under specific conditions. **This doc is about that direction.**

## The two obstacles to aggregating upward (sometimes stacked)

Aggregating quant across a set of units runs into one or both of these. Either one alone forbids a silent sum.

### Obstacle 1 — the fraction-vs-replicate metadata gap
Multiple units (e.g. a search's several scan files) can be two opposite things:
- **Fractions of ONE sample** (SCX / high-pH / gas-phase split) → the fractions together are one sample →
  **summing is correct** (it reconstructs the sample total).
- **Replicates / conditions** → each unit is its own sample → **summing is meaningless** (it adds
  independent samples and destroys the comparison the experiment was for).

The *same sum* is right or wrong depending on which it is — and **Limelight has no metadata to distinguish
them, and will not add any.** The fraction/replicate intent lives only with whoever built the search; there
is no Limelight field for it, and FlashLFQ's own `Condition`/`Fraction` experimental-design slots have
nothing true to populate. So **a silent sum silently assumes "fractions"** and is unfixable by better
engineering — the fact simply does not exist in the system.

### Obstacle 2 — cross-run non-comparability
Quant is per-search: **each search is its own FlashLFQ run** (Model A). Separate runs have **no shared
match-between-runs, RT alignment, or normalization**, so their intensities are not on a common scale. You
cannot validly combine values from different runs even if you *knew* they belonged to one sample — this is
exactly why the boss rejected **Model B** (cross-search joint runs): "LFQ intensities are only comparable
when co-quantified in one run." This obstacle applies whenever the units being combined came from
**different searches**.

---

## The concrete cases (each maps to the rule)

| Combining… | PSM count | Quant — ruling | Obstacle(s) |
|---|---|---|---|
| **Single search, single scan file** | — | ✅ **valid** — the base case | none |
| **Multiple searches shown SIDE BY SIDE** (one column each) | per-search columns | ✅ **valid** — each search is its own run, shown separately; **not** combined into one number | none (they're not summed) |
| **Scan files → one search** (a search with >1 scan file — including when it's viewed with other searches and collapsed to one column) | sums across files | ❌ **DECLINE** — do **not** sum quant across the scan files (temp guard today) | Obstacle 1 |
| **Sub-groups that PARTITION scan files** | per-sub-group | ✅ valid — each sub-group = union of whole, exclusively-owned scan files (a legitimate aggregate) | none |
| **Sub-groups that CROSS-CUT scan files** | per-sub-group | ❌ **DECLINE** — can't attribute a shared file's peak to a sub-group (see `flashlfq_quant_subgroup_scanfile_eligibility.md`) | (subdivision, not summing) |
| **Searches → one CONDITION** (experiment pages) | combines across searches | ❌ **DECLINE** — do **not** sum quant across a condition's searches | Obstacle 1 **and** 2 (stacked) — the hardest case |

**The load-bearing point, stated loudly:** in the multi-scan-file and the experiment-condition cases the
display collapses several units into **one column/cell** and **PSM count fills it by summing**. Quant
**cannot follow** — its cell must be **declined**, not summed. This is the single most likely place to
introduce a silent, invisible error, because "PSM count already sums here, so quant should too" feels right
and is wrong.

## What "decline" means

Don't silently hide and don't substitute a summed number. Show the cell as unavailable with a plain-language
reason, e.g.:
- multi-file search: *"Quant isn't available for a search with multiple scan files — MS1 intensities can't
  be summed across raw files without knowing whether they are fractions of one sample or separate
  replicates, and Limelight doesn't track that."*
- condition: *"Quant isn't available at the condition level — it would combine separate per-search FlashLFQ
  runs, which aren't comparable, across searches Limelight can't confirm are one sample."*

Decline is **per-unit**, not per-view: in a mixed view, still show quant for the valid searches; decline only
the offending column/cell.

## The only honest escape hatch (future, not a default)
If a number for a multi-file search or a condition is ever genuinely wanted, the missing fact must be
supplied **explicitly by the user** ("these files/searches are fractions of one sample → sum" vs
"replicates → don't"), surfaced as a deliberate choice. That re-introduces the metadata *from the user*,
where it actually lives. **Never make it a default, and never infer it.** (And note Obstacle 2 still limits
cross-*search* combination even then.)

## Not to be confused with: apex-vs-area
This doc is about **which grains may be combined**. A *separate* concern is the physical additivity of a
sum you are allowed to make — summing a peptidoform's own features/charges (co-measured, one run) is a
legitimate aggregate, but with FlashLFQ's default `--int` off it sums **apex heights**, an approximate
(not additive) quantity. That is covered in `flashlfq_quant_mapping_critical_review_2026-07-29.md`
("Open decision — apex vs area") and `flashlfq_output_to_limelight_mapping.md`. Keep the two ideas
distinct: *may I combine these units at all?* (this doc) vs *is the value I'm summing an additive
quantity?* (apex-vs-area).

---

## Related docs
- `flashlfq_quant_status_and_decisions.md` — **START HERE**: the quant feature's current status + all
  settled/open decisions (this rule is one of them).
- `flashlfq_quant_data_model_and_display_grains.md` — the display roll-up grains; **this rule governs which
  of those roll-ups are valid.**
- `flashlfq_quant_subgroup_scanfile_eligibility.md` — the sub-group instance of this rule (partition vs
  cross-cut).
- `flashlfq_per_scan_file_separate_run_rationale.md` — why runs see one scan file; the multi-file summing
  discussion.
- `flashlfq_quant_mapping_critical_review_2026-07-29.md` — H1/H2 (the composed design's matrix→scalar
  problem, of which this is the underlying rule) and the apex-vs-area open decision.
- `quant_maxquant_design_discussion.md` — Model A vs Model B (Obstacle 2's origin).
