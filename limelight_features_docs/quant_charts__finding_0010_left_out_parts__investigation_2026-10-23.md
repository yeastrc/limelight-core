# Quant Common page — Charts view: finding 0010, the four left-out parts (investigation, 2026-10-23)

**Status: DROPPED by the maintainer, 2026-10-23 (decision log §24 QCO-6: the Charts view is reduced to the reference's QC charts). Kept as a record of the investigation; nothing here is decided or built.**
Method: one read-only investigation per part. The main claims of each were re-checked in source by the review assistant
before being written here.

## 0. Purpose and how to read this

Round 4 of the Charts view (decision log `quant_common_page__charts_view__decision_log_and_rationale_2026-10-04.md`
§16) built a subset of the reference author's finding 0010, "LFQ vs spectral abundance agreement" (reference repository
`limelight-quant-experiment`, commit 02dfbe7; finding file `findings/0010-lfq-vs-spectral-abundance-agreement.md`):

- **Built (round 4a / 4b):** the density hexbin (reference Figure 1), the per-run correlations (Figure 2), the detection
  classes (Figure 6) and the within-protein tracking (Figure 8).
- **Left out by the maintainer, 2026-10-03:**
  - **A.** the slope estimators (Figure 3)
  - **B.** agreement by PSM count, with the Poisson floor (Figure 4)
  - **C.** the residual drivers (Figure 5)
  - **D.** the "why no LFQ" reasons (Figure 7); the only recorded reason for excluding it: FlashLFQ is treated as a black box.

On 2026-10-23 the maintainer asked to look again at what is left. This document records what each left-out part would
take: what the reference computes, which inputs Limelight already has, the hazards, the rough size, how it would be
verified, and the open questions. Decisions, once made, go into the decision log, not here.

**Provenance labels.** Claims are tagged **VERIFIED** (read in source at the cited `file:line`) or **INFERRED** (not
checked). Reference-repo paths are relative to that repository; Limelight paths are relative to this repository.
Figures quoted from the finding (e.g. "ρ 0.863") are the reference author's published numbers on the reference data, not
Limelight output.

## A. Slope estimators (reference Figure 3)

Reference file names used below: **driver** = `scripts/scratch/abundance_agreement.py`, **module** =
`scripts/scratch/analysis/abundance_agreement.py`, **figs** = `scripts/scratch/analysis_figures/abundance_agreement_figs.py`.
Limelight front-end files are in `limelight_webapp/front_end/src/js/page_js/data_pages/quant/quantCharts/`.

**What the figure shows** (VERIFIED figs:576-731 and the published PNG). Title "The slope of spectral count on LFQ is not
identified"; subtitle says "protein means over 8 runs … point estimates" (figs:695-702).
- Panels a (LFQ vs PSM) and b (LFQ vs NSAF): dot plots, one row per estimator — OLS y-on-x, SMA, orthogonal, inverse-OLS
  (x-on-y). Two markers per row: the protein-LFQ scale (filled circle) and the per-unique-peptide scale (open diamond); each
  value labeled; dashed line at slope 1.
- Panel c: the LOWESS local slope against the protein's LFQ percentile, one line per quantity, dashed line at 1.

**What the reference computes** (all VERIFIED).
- Input set: proteins with LFQ and PSMs in every run ("complete8"; driver:479); per-protein means of log2 LFQ, log2 PSM,
  log2 NSAF (driver:485). Contaminants excluded first (driver:236).
- Estimators: closed form from the centered sums sxx, syy, sxy — OLS = sxy/sxx, inverse-OLS = syy/sxy, SMA =
  sign(sxy)·sqrt(syy/sxx), orthogonal = Deming with λ = 1 (module:407-435; the figure's own copy figs:560-573). No eigen /
  SVD. Deming (other λ) and attenuation-corrected OLS are computed but deliberately not drawn (figs:110-117).
- Per-unique-peptide scale: x = mean LFQ − log2 n_unique_peptides (figs:589). n_unique_peptides = peptides in the FlashLFQ
  peptide file whose `Protein Groups` holds exactly one non-contaminant protein and whose intensity is > 0 in any run
  (module:666-694). **This scale, including the headline "SMA 1.33", is computed only in the figure script**; the
  analysis table `slopes.tsv` holds only the protein scale (the figure checks its protein-scale values against it,
  figs:615-636). The figure stops with an error if a complete protein has no quantified unique peptide (figs:586-588).
- LOWESS local slope: frac 0.3, it 3, delta = 0.5 % of the x range on the protein means; 200-point grid; slope =
  `np.gradient` on the grid (module:386-404); x mapped to an empirical percentile with a right-sided searchsorted step
  (figs:664-671).
- No random numbers are needed for the figure: it shows point estimates only. The bootstrap CIs in `slopes.tsv`
  (driver:564-574) are not drawn.

**Inputs Limelight already has** (VERIFIED):
- **The per-cell table.** LFQ, log2 PSM and log2 NSAF per cell (`quantCharts_LfqVsSpectralPerRun_Compute.ts:296-306`).
- **The complete-in-every-sample logic.** In `quantCharts_LfqVsSpectralWithinProtein_Compute.ts:334-343`; it does not
  keep NSAF.
- **The raw peptide data.** Intensities and `Protein Groups` (`quantCharts_LfqVsSpectral_Compute.ts:109-128`), plus a
  unique-peptide → protein mapping in `quantCharts_LfqVsSpectralDetectionWithin_Compute.ts:92-135`. That mapping counts
  by detection type, not by intensity > 0, so a new count is needed.
- **The fit ports.** An exact SMA port (`…PerRun_Compute.ts:168-186`) and an exact LOWESS + grid port (`:219-240`).
- **No new server data loads.**

**New code:**
- OLS, inverse-OLS and orthogonal (one line each);
- an `np.gradient` port;
- the percentile step;
- the intensity-based unique-peptide count.

**Already matched: SMA lines on Figure 1.** The reference's Figure 1 caption says SMA lines are overlaid on the density
hexbin. Limelight already draws them, so there is no omission (VERIFIED
`quantCharts_LfqVsSpectralPerRun_Density_Component.tsx:186-192`).

**Hazards:**
- **No mass math.**
- **Division by sxy.** sxy = 0 needs a "not defined" path.
- **`np.gradient`.** Its edge and non-uniform-spacing formulas must be matched exactly (INFERRED; check against numpy).
- **Contaminants are kept** (decision R4-Q3). This changes the complete set, and it changes which unique peptides count:
  the reference drops unique peptides owned by a contaminant (module:670-673).
- **Full-precision NSAF** vs the reference's rounded export (an existing deviation).
- **Data-specific title.** The reference's title states a conclusion about its own data ("not identified"); on other data
  the estimators may agree.

**Rough size** (INFERRED): one compute module (~250–400 lines), one 3-panel Plotly component (~250–350 lines), notes,
unit tests.

**Verification** (same standard as R4-Q9):
- **Exact, on our data.** Run the reference's own functions on the page's dumped protein means and unique counts.
- **Published numbers.** Run the page code on the reference's `protein_properties.tsv` and reproduce `slopes.tsv`, the
  per-peptide numbers in `figure_provenance.json` and the `trend_lowess.tsv` grids, to the TSV's rounding.
- **Unique counts.** Compare them row for row with the reference's `peptide_protein_summary`.

**Open questions:**
- **A1.** Which parts: the protein-scale estimators, the per-peptide scale, the LOWESS local-slope panel?
- **A2.** The figure's 4 estimators only, or also Deming and attenuation-corrected OLS?
- **A3.** Point estimates only (as the figure), or add the bootstrap CIs (fixed seed, per R4-Q1)?
- **A4.** Keep the reference's intensity-based unique-peptide count? What to do when the peptide file is missing, or when
  a complete protein has 0 quantified unique peptides (the reference stops with an error)?
- **A5.** Confirm that contaminants are kept here too, with a deviation note.
- **A6.** Use the reference's data-specific title, or a neutral one?
- **A7.** Placement: inside the existing per-run agreement block, or a new block?
- **A8.** Minimum size: LOWESS needs ≥ 10 points; a higher floor for the estimators?

## B. Agreement by PSM count, with the zero-truncated-Poisson floor (reference Figure 4)

**What the figure shows** (VERIFIED figs:726-952 and the published PNG). Four panels (2 × 2), not two. Title "Where LFQ and
spectral counts disagree: count level and abundance"; 95 % bootstrap CIs.
- **(a)** Violins of LFQ for each PSM bin (1, 2-3, 4-7, 8-15, 16-31, ≥32), with the q10–q90 bar and the median.
- **(b)** SD of the LFQ residual around an LFQ-on-log2-PSM LOWESS, by bin, plus a dashed line at the pooled SD.
- **(c)** Spearman ρ of LFQ vs PSM within each bin. Bin "1" shows "n/a (PSM constant)".
- **(d)** PSM and NSAF residual SD by LFQ decile, plus the Poisson-floor SD with its % share of the PSM residual variance;
  the overall share (29 %) is in the title.

**What the reference computes** (VERIFIED; all in driver `section_breakdown`, driver:692-879).
- **Cell set.** Common cells: LFQ and PSM both present, contaminants excluded.
- **Residuals.** Residuals around pooled LOWESS trends (frac 0.3, it 3, delta 0.5 % of range): log2 PSM on LFQ, log2 NSAF
  on LFQ, and LFQ on log2 PSM (driver:701-703).
- **Binning.** Bins use the cell's own PSM count (lower edge included). Deciles are linear-quantile edges of the pooled
  LFQ, right-sided searchsorted plus a clip (driver:746-747).
- **The Poisson floor.**
  - It is per protein, not per cell. Each cell gets the variance of log2 K for a zero-truncated Poisson whose mean is
    **its protein's mean PSM count over that protein's common cells** (driver:700-704).
  - That mean is first rounded with `np.round(·, 4)`, and the rounded value is used (driver:666-674).
  - μ is solved with brentq on μ / (1 − e^−μ) = mean (module:474-480).
  - The variance is an exact finite sum over the renormalized Poisson pmf, k = 1 … μ + 12√μ + 30 (module:483-494); it is
    not a delta-method formula.
  - Share = mean(floor variance) / var(PSM residual) (driver:836).
  - NSAF has no floor.
- **"35 % of cells ≤ 3 PSMs, 17 % exactly 1".** Plain fractions of the common cells (driver:846-847).
- **CIs.** Protein-cluster percentile bootstrap, 2,000 resamples, from the reference's one shared seeded stream (same
  situation as R4-Q1).

**Inputs Limelight already has** (VERIFIED):
- **The per-cell table.** Includes the raw PSM count (`quantCharts_LfqVsSpectralPerRun_Compute.ts:296-376`).
- **Two of the three trends.** The pooled LOWESS of PSM and of NSAF on LFQ, and the numpy-style interp to evaluate them
  per cell (`:193`, `:222-239`, `:500`).
- **Other helpers already ported:**
  - the PSM-bin labels (`quantCharts_LfqVsSpectralWithinProtein_Compute.ts:58-92`);
  - the linear quantiles;
  - numpy-order mean/variance;
  - Spearman;
  - the cluster bootstrap with a Spearman job (`quantCharts_Bootstrap.ts`);
  - a brentq port (`quantCharts_DifferentialAbundance_SpecialFunctions.ts:129-138`);
  - a scipy-matching Gaussian KDE (`quantCharts_Stats.ts:158`).

**New code:**
- **The LFQ-on-log2-PSM LOWESS.** Its x is log2 of integers, which means heavy ties; exactness vs statsmodels needs its own
  check.
- **An SD bootstrap job.**
- **The protein mean over common cells.** Proteins have a varying number of such cells.
- **A numpy-style `round(·, 4)`.** Numpy rounds half to even.
- **A Poisson pmf.** The front end has no log-gamma. A naive e^−μ underflows above μ ≈ 745, so the pmf must be computed
  in log space, which is not bit-identical to scipy.

**Not the same as round 4b's by-PSM-level panel.** That panel uses proteins complete in all samples, binned by their mean
PSM, and shows the median across-run Pearson r (`quantCharts_LfqVsSpectralWithinProtein_Compute.ts:343-378`). Figure 4
uses individual cells binned by their own count, with pooled Spearman plus SDs. The two share only the bin labels.

**Hazards:**
- **No mass math.**
- **Contaminants are kept** (R4-Q3). They change the trends, the deciles and the share. On the reference data they would
  add at most 49 of 20,114 cells. That bound comes from the investigating assistant's own script, not from a reference
  output, and it is unverified on Limelight data.
- **Large μ.** It needs the log-space pmf (above).
- **The tie-heavy LOWESS** (above).
- **Random numbers.** The CIs cannot match the reference's stream (apply R4-Q1).
- **How to describe the floor.** It treats real between-run variation of a protein as residual, not as floor; the page note
  should describe that (INFERRED reading of driver:703-704).

**Rough size** (INFERRED): about half a round — ~400–600 lines of compute, ~400 lines of components, plus notes and tests.

**Verification** (same standard as R4-Q9):
- **Poisson functions.** Unit tests against scipy over a grid of means (including means near 1 and μ > 745).
- **Published numbers.** Run the page code on the reference's own `cells.tsv` (which carries the residuals and deciles per
  cell) and reproduce `binned_by_psm.tsv`, `binned_by_lfq_decile.tsv` and the summary keys.
- **Exact, on our data.** Run the reference code on the page's dumped cells.
- **CIs.** Check them under R4-Q1.

**Open questions:**
- **B1.** All four panels, or only (c) and (d) plus the ≤ 3 / = 1 stats? (a) and (b) need the extra LOWESS.
- **B2.** Keep the bootstrap CIs (about 31 more bootstraps)?
- **B3.** Violins in (a): Plotly's own violin (its KDE differs) or a filled path from the existing scipy-matching KDE
  (parity)?
- **B4.** Reproduce the `np.round(·, 4)` step (parity), or skip it?
- **B5.** Poisson pmf: a log-space recurrence or a ported log-gamma? Either way, state the tolerance.
- **B6.** Show the unplotted outputs (≤ 3 / = 1 fractions as text, per-decile Spearman, the replicate count-noise
  table)?
- **B7.** Placement: a new block, or inside the per-run agreement block (it reuses that block's cells and two trends)?
- **B8.** Confirm that contaminants are kept.

## C. Residual drivers (reference Figure 5)

**What the figure shows** (VERIFIED figs:956-1062 and the published PNG). Title "What drives the spectral-count residual
from the LFQ trend"; n = 1,648.
- **(a)** Adjusted PSM residual vs shared-peptide inflation −log2(1 − f), with the fitted partial slope and a dashed
  "theory" line at slope 1. Stat box: slope 0.92 [0.84, 0.99], ΔR² 0.45, "1,240 proteins with f = 0".
- **(b)** Adjusted NSAF residual vs log2 relative length, with a "theory" line at slope −1. Stat box: slope −0.92, ΔR² 0.41.

**What the reference computes** (VERIFIED, driver `section_residuals`).
- **Responses.** Per complete8 protein: mean log2 PSM and mean log2 NSAF, each minus a LOWESS trend on mean LFQ (same
  LOWESS settings as round 4).
- **Terms.** Four, standardized:
  - relative length;
  - log2 quantified unique peptides;
  - the MBR intensity fraction;
  - −log2(1 − f).
- **Fit.** OLS with HC3 standard errors (statsmodels, driver:999). BH over the 8 coefficients. ΔR² = full R² minus the R²
  of an OLS refit without the term (driver:1009-1011).
- **f.** Shared PSMs / total PSMs, pooled over all runs (driver:906-909). Sharing is judged between Limelight protein
  groups in the Limelight PSM export.
- **Length is estimated, not read.** It is estimated from the NSAF identity log2(PSM / NSAF), with a two-way median fit
  that handles NSAF's export rounding (module:213-287). The reference had no protein lengths.
- **CIs.** The CIs drawn are **bootstrap** percentiles (2,000 protein resamples refit with `lstsq`, driver:1000-1024), yet
  the figure subtitle says "95% CI (HC3)" (figs:1045). HC3 is used only for the p-values. **This is a mislabel in the
  reference.**
- **No code for "0.885 → 0.934".** The finding's "removing shared-peptide PSMs raises the protein-mean Pearson from 0.885
  to 0.934" has no code in the reference repository (a grep of its scripts finds no such computation; 0.934 occurs only
  as unrelated values in result tables).

**Inputs Limelight already has** (VERIFIED):
- **The cells, complete set and LOWESS** (round 4a).
- **Exact protein lengths.** `proteinLength` from the main-filters protein info, already used for NSAF
  (`quantCharts_SpectralCounts_Load.ts:127`; a residue count, no mass involved).
- **Peptide → protein mapping and filtered PSMs.** The reported-peptide → protein mapping per search, and the filtered
  PSMs from the main-filters loader (not the unfiltered loader).
- **FlashLFQ peptide data.** Detection types and `Protein Groups` (round 4b).
- **Fitting helpers.** Pivoted Householder QR least squares (`quantCharts_LeastSquares.ts`), BH, the normal p-value, and
  the fixed-seed bootstrap.

**New code:**
- **The HC3 sandwich.** Small: leverages from QR.
- **A per-protein shared-PSM count.** A few lines inside the existing PSM loop in
  `quantCharts_SpectralCounts_Compute.ts:176-197`.
- **The regression block, partial residuals, and a 2-panel chart.**

**Definitions that would differ from the reference** (both need decisions):
- **Sharing.** The Charts view's rows are single proteins (psvids), and the quant submit sends each PSM's per-search psvid
  list to FlashLFQ. So "shared = maps to more than one psvid in its search" is what FlashLFQ actually saw. It differs from
  the reference wherever Limelight protein grouping collapses indistinguishable proteins.
- **Length.** Limelight's exact length would replace the reference's estimate. That is more exact, but with exact lengths
  NSAF = PSM / length / run total holds exactly. The NSAF panel's slope of about −1 then becomes close to built in
  (INFERRED algebra). The finding itself calls the ±1 lines "algebraic-consistency checks, not confirmations".

**Hazards:**
- **No mass math.**
- **HC3 leverage.** (1 − h_ii)² is in a denominator, and the inflation term is very skewed (1,240 of 1,648 at 0), so max
  h_ii should be reported and h_ii near 1 should be refused.
- **Contaminants are kept** (R4-Q3). The reference drops them from the regression set but keeps them as sharing partners.
- **Multi-search runs.** Sharing is decided per search, so the same sequence may be shared in one search and unique in
  another.
- **Non-finite terms.** A complete protein with f = 1 or with no quantified unique peptide makes the reference stop with an
  error (driver:947-949); a rule is needed.
- **`--sha`.** The run's "Use shared peptides" setting matters here too. It is a supported service parameter, default off
  (service `app/request_models.py:197`, `app/flashlfq_command.py:48`). The investigating assistant's report said the
  service does not set it; that was wrong.

**Rough size** (INFERRED): the largest of the four, ~1,000–1,500 lines including tests:
- a compute module (~400–600 lines);
- a small spectral-counts extension;
- a 2-panel component and its note;
- a Python parity harness.

**Verification:**
- **Exact, on our data.** A Python harness runs the reference's `section_residuals` logic verbatim (statsmodels HC3 as the
  oracle) on our run's matrices, with the same length and sharing inputs on both sides.
- **Bootstrap.** Proven by the R4-Q1 method.
- **Synthetic unit tests.** Exact recovery, a hand-checked HC3 case, and the refusals.
- **Published numbers cannot be checked.** The reference's raw inputs are not in its repository.

**Open questions:**
- **C1.** Build it at all, given that the finding calls the ±1 lines algebraic checks? If so, frame them the same way.
- **C2.** Sharing per psvid (what FlashLFQ was given), or per Limelight protein group (the reference)?
- **C3.** Exact length (a deviation, more exact), or port the NSAF-identity estimate (strict parity)?
- **C4.** CI label: "bootstrap 95 % CI" (true), instead of the reference's "HC3"? Also show the HC3 p / BH q in a small
  coefficient table?
- **C5.** The 0.885 → 0.934 number: omit it, or define it ourselves and label it a page addition?
- **C6.** Multi-search runs: pooled per-search sharing with a note, or single-search runs only?
- **C7.** A non-finite term on a complete protein: refuse the block (as the reference does), or drop and count the protein?
- **C8.** Confirm that contaminants are kept.

## D. "Why no LFQ" reasons (reference Figure 7)

**What the figure shows** (VERIFIED figs:1207-1326 and the published PNG). Title "Proteins identified by PSMs but never
quantified by FlashLFQ"; 897 of 4,311 proteins, contaminants excluded.
- **(a)** One bar per reason, labeled "N proteins · P PSMs".
- **(b)** A jittered strip of total PSMs per protein (log x) for each reason, plus a gray reference row "LFQ in ≥ 1 run";
  medians marked. The jitter uses a fixed seed and is for display only.
- **(c)** The top 20 proteins by PSMs, colored by reason.

**What the reference computes** (VERIFIED driver:1176-1185; precedence in this order):
1. **NaN token:** FlashLFQ wrote `NaN` for the protein.
2. **Shared peptides only:** every peptide row listing the protein in the peptide file's `Protein Groups` lists more than
   one protein.
3. **Unique peptides never quantified:** it has unique peptide rows, but none has intensity > 0 in any run.
4. **Unique peptide quantified but no protein value:** computed, count 0 on the reference data, not drawn.

"Shared" counts contaminant ids as partners. That is how finding 0011's proteins (CYB5 etc.) land in "shared-only".

**The "black box" reason does not hold for the classification itself.** Every class can be derived from FlashLFQ's
output files plus Limelight's own data, with no modeling of FlashLFQ internals (VERIFIED):
- **NaN token.** The flashlfq service keeps FlashLFQ's literal `NaN` protein cell and adds a protein detection type
  `Unquantifiable` for it (service `app/combined_output_writer.py:20-23`, `:149-166`).
- **Shared-ness.** It comes from `Protein Groups`, which carries Limelight's own protein ids for each PSM (as the service
  passes them).
- **"Unique peptides only".** This is the documented run setting "Use shared peptides" (`--sha`, default off) on the submit
  form (`limelight_webapp/front_end/src/js/page_js/data_pages/quant/quant_FlashLFQ_Parameters.ts:88-90`), not hidden
  behavior.

So the page can state the reasons in terms of output columns and run settings. The black-box concern applies only if the
page tried to explain *why* FlashLFQ behaves as it does.

**Inputs Limelight already has** (VERIFIED):
- **The parsed raw protein and peptide files.** Including the per-cell detection types of each level and the peptide
  `Protein Groups`.
- **The round-4b unique/shared loop.** In `quantCharts_LfqVsSpectralDetectionWithin_Compute.ts:92-135`.
- **Filtered per-protein PSM counts.** `psmCountDense`, from the main-filters data.
- **The "never LFQ with PSMs" set.** Already computed for round 4b's detection classes.

**New code:**
- **Pass the protein level's detection types into the inputs.** Today only the peptide level's are passed:
  `quantCommonSPAView_ChartsView_Component.tsx:540`.
- **Per-protein counts.** Unique rows, unique quantified in any run, shared rows.
- **The classification, medians and top-N.**
- **A 3-panel chart.**

**Hazards:**
- **Contaminants (the largest).** Limelight keeps contaminants, and contaminant handling (finding 0011) was skipped by
  the maintainer on 2026-10-21. So contaminant entries enter the counts, and real proteins whose only sharing partner is a
  contaminant copy are classed "shared-only". That is correct for the run as performed, but the page cannot point out the
  0011 artifact. A "Differences from the reference" note is needed.
- **Runs with `--sha` on.** "Shared-only" no longer explains a missing value. The page should read the run's recorded
  setting (whether the Charts view already reads that manifest field is INFERRED, not checked).
- **PER_FILE runs.** Each file is a separate one-sample FlashLFQ run, so the NaN class should be empty (INFERRED from mzLib
  `FlashLFQResults.cs:566`, not observed). There is also no MBR.
- **MBR.** It moves proteins out of "never LFQ", and MBR differs between FlashLFQ executions.
- **No mass math.**

**Rough size** (INFERRED): about the size of round 4b's detection chart: one compute file (~200–300 lines), one 3-panel
component (~200 lines), a note, unit tests.

**Verification:**
- **Exact, on our data.** A Python port of the reference's rules, run on a local run's result files and the page's PSM
  matrix, agreeing per protein.
- **Invariants.** The classes partition the never-LFQ set.
- **PER_FILE.** Check the empty-NaN-class prediction on a PER_FILE run.
- **Published numbers cannot be reproduced.** The published 897 / 671 / 220 / 6 needs the reference's raw input files,
  which are not in its repository; only its output table is, for a format cross-check.

**Open questions:**
- **D1.** Scope: the classification only, worded in terms of outputs and run settings (recommended by the investigating
  assistant)?
- **D2.** Contaminants: build now with a difference note, or wait for contaminant handling?
- **D3.** Class 4: draw it as a 4th bar when nonzero, or keep it as a counted note?
- **D4.** `--sha` on: adjust the labels from the run's recorded setting, or refuse the block?
- **D5.** Top 20 (the figure) or 25 (the reference's summary); names or ids?
- **D6.** Keep panel (b)'s gray "LFQ in ≥ 1 run" reference row?
- **D7.** A downloadable per-protein table?
- **D8.** Placement: a 5th chart in the round-4b block, or its own block?

## E. Summary and open questions for the maintainer

| Part | Size (INFERRED) | New data loads | Hardest piece | Parity vs published numbers |
|---|---|---|---|---|
| A slope estimators | small | none | `np.gradient` port; per-peptide unique count | yes, from the reference's `protein_properties.tsv` |
| B count floor | medium (~½ round) | none | log-space Poisson pmf; tie-heavy LOWESS; SD bootstrap | yes, from the reference's `cells.tsv` |
| C residual drivers | largest | none (one small extension of the PSM loop) | HC3; two definitions that must differ from the reference | no (reference inputs absent); exact against the reference code on our data |
| D why no LFQ | small–medium | none (one input field wired) | contaminant / `--sha` wording | no (reference inputs absent); exact against the reference code on our data |

Common to all four:
- **No mass math.**
- **No new server data.**
- **Contaminants are kept** (R4-Q3). Each part needs a "Differences from the reference" item, and part D and part C (panel
  a) are where keeping them shows most.
- **Random numbers.** Wherever the reference draws bootstrap CIs, the R4-Q1 policy applies.

Two corrections to earlier assumptions (VERIFIED):
1. **Black box.** The "FlashLFQ is a black box" reason for excluding part D does not apply to the classification itself.
2. **Figure 1 already matches.** The reference's Figure 1 SMA lines are already drawn by Limelight; no omission exists.

Per-part questions are listed in A–D (A1–A8, B1–B8, C1–C8, D1–D8). The first decision is which parts, if any, to build.
