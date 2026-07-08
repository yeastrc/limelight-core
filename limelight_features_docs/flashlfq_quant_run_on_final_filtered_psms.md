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

## 4. Design options — a spectrum, cheapest to strictest

There is no need to choose between "friendly but wrong" and "harsh but correct." Three options,
**additive** — ship (1) alone and it is already defensible; (2) and (3) layer on if anyone demands
per-filter numbers.

**First, what NOT to do — do not classify filters as "safe" vs "unsafe."** The harness shows de-seeding is
a property of the *specific peptides/PSMs*, not of the filter type: even the RT-window filter de-seeded 310
forms. Whether a filter thins a form or removes it whole is **data-dependent**, so any static "these filters
are OK to display live" whitelist would be right on one dataset and wrong on the next. (Dan, 2026-07-08:
trying to assess which filters yield an OK result is unreasonable.) The one structural exception is **charge**:
it is *always* off for a multi-charge peptidoform, because the form key sums charges and the peak intensity
is not charge-decomposable — that is a fact about one filter, not a fragile heuristic.

### Option 1 (recommended default) — honest-labeled peptidoform total, no re-run

Keep the single run and live **row** filtering (presence-gating still hides rows whose peptidoform has no
surviving PSM). But **redefine and label the quant value**: it is the peptidoform's **total MS1 abundance
over the submitted PSM set — NOT narrowed by the secondary charge / RT / m·z / scan filters.** State this in
the column header and tooltip; call out explicitly that quant is **not charge-scoped**.

- **Why it works:** the value becomes a well-defined quantity — exactly what FlashLFQ measured for that
  peptidoform. The only defect was ever the *implicit claim* that it tracked the secondary filters; removing
  that claim removes the defect. This is §16's "quant is not charge-subset" made **honest and explicit**
  rather than silent.
- **Cost:** the number does not move when a user narrows charge/RT/etc.; the label must make that obvious so
  no one reads it as filter-specific. No re-run, no lock, no filter taxonomy. **Boss-friendly.**

### Option 2 (opt-in correctness) — "Quantify current filtered view" action

For users who genuinely need filter-specific numbers, offer a button that runs FlashLFQ on **exactly the
displayed PSMs** (the Tier-2 explicit `reportedPeptideId → [psmId]` path, assessment §19d), returns the
correct values for that view, and **invalidates them when filters change**.

- Same correctness as Option 3, but the user *chooses* it per view instead of it being forced page-wide — a
  much easier sell than "unlocking removes your results."

### Option 3 (strictest) — the "locked-filter run"

Bind a FlashLFQ run to a complete, frozen filter state:

1. The user selects **all** filtering (annotation/cutoff **and** secondary: charge, mod mass, RT, m/z,
   scan-peak, …).
2. The app resolves that to the **exact final PSM set** and submits **those PSMs** to FlashLFQ.
3. The app generates a **page URL** encoding that filter state, pointing at the result for those PSMs.
4. The page renders with those filters **applied and locked**, showing the FlashLFQ results.
5. **Changing any filter removes the quant results.** To get quant again, re-select filters and re-run.

- **Why it works:** every displayed peak is seeded by a PSM in the view — no de-seeding, no charge pooling,
  no over-count. The Tier-2 "run bound to one filter state" model promoted to the whole page.
- **Cost:** harsh UX (quant not live-filterable); one run per distinct filter state — cache keyed by a
  **filter-state hash** so identical selections reuse a run. Interacts with DB-ingest (Track B): the filter
  state becomes the run's **primary key**, not just metadata.

**Recommendation:** ship **Option 1** as the default (correct-by-definition, no UX cost, no boss objection),
and treat **Options 2/3** as opt-in additions for the subset of users who require per-filter quant.

## 5. Provenance

The over-count numbers and the reproduction check are **observed** from FlashLFQ re-runs executed on
2026-07-08 (harness under `…/flashlfq-service-data/tier1_harness/`, outside any repo). The "webpage value"
is a faithful **reconstruction** of the receive-side rollup (`quant_PrototypeData.ts`), verified against the
call site `proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Create_TableData.tsx:1247`
(only `reportedPeptideIds`, `openModDescriptor`, `projectSearchId` are passed — no charge) — it is **not** a
screenshot of the running UI. The charge-pooling percentages and ID-charge≠peak-charge examples are read
directly from the production `QuantifiedPeaks.tsv`. Single scan file → MBR absent by construction.
