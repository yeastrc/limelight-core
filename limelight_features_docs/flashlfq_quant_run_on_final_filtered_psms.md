# FlashLFQ quant is only correct when run on the *final filtered* PSMs — charge evidence + locked-filter design

**Status:** design finding + proposal. Written 2026-07-08. Records an empirical result (a Tier-1 offline
differential harness) showing that summing full-run FlashLFQ peaks **over-counts** quant for a page-filtered
view when the filter thins PSMs *within* a displayed form — most severely a **charge** filter — and that the
stored peak intensities **cannot** be corrected client-side. Concludes with a "locked-filter run" design
that guarantees correctness. Companion to `flashlfq_quant_data_model_and_display_grains.md`,
`flashlfq_per_scan_file_separate_run_rationale.md`, and `flashlfq_output_to_limelight_mapping.md`.
Authoritative decision record: **§16** (filter model) + this doc, in `Claude_SeparateAssessment_20260706.md`.

**Terminology:** avoid "tag" (Limelight uses *search tags*). Use `reportedPeptideId`, `projectSearchId`,
*display form* = the receive-side key `reportedPeptideId + open-mod {kind, roundedMass}` (charge-agnostic).

---

## TL;DR

- FlashLFQ is run **once** over the submit-time PSM set; the page then sums the stored peaks per display
  form and presence-gates rows client-side (§16).
- **That is exact for filters that remove *whole* display forms** (e.g. an open-mod mass filter): the gated
  rows disappear and the survivors keep all their PSMs — measured **0% over-count**.
- **It over-counts for filters that thin PSMs *within* a surviving display form.** Measured over-count vs a
  re-run on exactly the surviving PSMs: **charge filter ≈ 54%**, random-50% ≈ 6%, RT-window ≈ 1%.
- The **charge** case is the worst because the display-form key sums across charges, and — critically — the
  stored peak intensity is **not charge-decomposable**, so it **cannot** be fixed by any client-side
  rollup. The only correct charge-specific number comes from **re-running FlashLFQ on charge-specific PSMs.**
- Therefore, to *guarantee* correct quant under arbitrary filtering, FlashLFQ must be run on the **final
  filtered PSMs**. The **locked-filter run** design (§ below) is the way to offer that safely.

## 1. The measurement (Tier-1 offline differential harness, 2026-07-08)

Run against the validated single-file open-mod search `b3a49a5d…` (single scan file → no MBR). Method:
take the exact `flashlfq_identifications.tsv` FlashLFQ was fed, delete PSM subsets that stand in for real
page filters, **re-run `CMD.dll`** (same flags, same mzML) on each subset, and compare — per display form —
the **webpage value** (sum of full-run peaks for forms that still have ≥1 surviving PSM) against the
**subset re-run**. Form key computed identically to `quant_PrototypeData.ts`.

**Harness validity:** a full-set re-run reproduced production `QuantifiedPeaks.tsv` **exactly** (6,069
forms, max relative error 0). So the differences below are real FlashLFQ behavior, not harness noise.

| Filter (PSMs kept)              | forms shown | exact | de-seeded | **over-count** |
|---------------------------------|-------------|-------|-----------|----------------|
| drop open-mod +14 (92.8%)       | 5,999       | 5,983 | 0         | **0.000%**     |
| RT window 54–145 (79.5%)        | 5,137       | 4,825 | 310       | **1.04%**      |
| random 50% (50%)                | 4,249       | 3,198 | 911       | **5.96%**      |
| drop charge 2 (45%)             | 3,277       | 2,617 | 357+301*  | **54.2%**      |

*over-count = fraction of displayed intensity the webpage shows that a subset re-run would not. \*for the
charge filter, "drift" (301) is charge-substitution, not recalibration — read it with de-seed.*

**Area-invariance holds** (the load-bearing assumption): removing *some* of a form's PSMs does not move its
integrated peak — the open-mod filter is essentially exact and retained-peak drift on non-charge filters is
≤3.2%. The divergence is entirely **within-form de-seeding**: the webpage keeps summing a peak whose seed
the filter removed.

## 2. Why the charge case cannot be fixed client-side (non-decomposability)

The front end *has* a charge per peak (`_Peak.charge` from the `Precursor Charge` column) but
`get_QuantForDisplayForm(reportedPeptideIds, openModDescriptor, projectSearchId)` never uses it — so today
it *does not* charge-filter. But it also *could not do so correctly*, because the stored intensity is not a
single-charge quantity (observed in the production `QuantifiedPeaks.tsv`):

- **`peak.charge` is the identifying charge, not the integration charge.** The front end reads `Precursor
  Charge` (the PSM's charge), which routinely differs from the peak's own `Peak Charge` (e.g. `Precursor
  Charge=3` / `Peak Charge=2`).
- **~28% of peaks pool multiple charge states into one intensity** (`Num Charge States Observed`: 24.6% pool
  2, 3.1% pool 3, 0.3% pool 4). FlashLFQ integrates the charge/isotope envelope together, so you cannot
  subtract "the charge-2 part" of a peak that pooled charges 2 and 3 — that number does not exist in the
  output.

This is the §16 principle ("an integrated precursor peak area is not per-PSM decomposable → presence-gate,
never re-integrate") with **charge as a specific instance**: the area is not per-charge decomposable either.
So a correct charge-specific value is obtainable *only* by re-running FlashLFQ on charge-specific PSMs — the
harness did exactly this to produce the ~54%-lower number.

## 3. The principle

> **Correct quant for a filtered view ⇔ FlashLFQ was run on exactly the PSMs in that view.**
> The current run-once/sum-all display is correct for *form-removing* filters and over-counts for
> *form-thinning* filters (charge, RT, precursor m/z, MS2-peak-in-range). Charge is the extreme.

Two filter classes, from §16, now with the correctness verdict attached:

- **Submit-time annotation/cutoff filters** — these *define* the run; changing them already forces a new
  run. **Correct by construction.**
- **Secondary page filters** — presence-gated client-side. **Correct only when they remove whole forms;
  over-count when they thin PSMs within a surviving form.**

## 4. Proposed design — the "locked-filter run" (guarantees correctness)

To make quant correct under *any* filtering, bind a FlashLFQ run to a complete, frozen filter state:

1. The user selects **all** the filtering they want (annotation/cutoff **and** secondary: charge, mod mass,
   RT, m/z, scan-peak, …).
2. The app resolves that to the **exact final PSM set** and submits **those PSMs** to FlashLFQ (the submit
   webservice already accepts submit-time filter values and retrieves PSMs; this extends it to the full
   final set — see the Tier-2 explicit `reportedPeptideId → [psmId]` path in assessment §19d).
3. The app generates a **page URL** encoding that filter state and pointing at the FlashLFQ result for
   exactly those PSMs.
4. The page renders with those filters **applied and locked**, showing the FlashLFQ results.
5. **Unlocking / changing any filter removes the quant results** (the run no longer matches the view). To
   get quant again, the user re-selects filters and generates a new run.

**Why it works:** every displayed peak is seeded by a PSM in the view, so there is no de-seeding, no
non-decomposable charge pooling, no over-count — the numbers are exactly what FlashLFQ computes for what the
user sees. It is the Tier-2 "run bound to one filter state" model promoted to the product model.

**Trade-offs (acknowledged):**
- **Harsh UX:** quant is not live-filterable; any filter change invalidates it. This is the honest cost of
  correctness given non-decomposability.
- **One run per distinct filter state** — cache/store results keyed by a **filter-state hash** so identical
  selections reuse a run rather than re-computing.
- Interacts with the DB-ingest work (Track B): a stored run already carries its filter provenance
  (§ data-model doc); this makes the filter state the *primary key* of a run, not just metadata.
- **Middle ground worth weighing:** since *form-removing* filters are already exact, a system could keep the
  live display for those and only require a locked run when a *form-thinning* filter (charge/RT/m·z/scan) is
  engaged — narrower "harsh" surface, at the cost of classifying filters. The all-or-nothing lock is simpler
  and unimpeachable; the middle ground is friendlier but needs the filter taxonomy maintained.

## 5. Provenance

The over-count numbers and the reproduction check are **observed** from FlashLFQ re-runs executed on
2026-07-08 (harness under `…/flashlfq-service-data/tier1_harness/`, outside any repo). The "webpage value"
is a faithful **reconstruction** of the receive-side rollup (`quant_PrototypeData.ts`), verified against the
call site `proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Create_TableData.tsx:1247`
(only `reportedPeptideIds`, `openModDescriptor`, `projectSearchId` are passed — no charge) — it is **not** a
screenshot of the running UI. The charge-pooling percentages and ID-charge≠peak-charge examples are read
directly from the production `QuantifiedPeaks.tsv`. Single scan file → MBR absent by construction.
