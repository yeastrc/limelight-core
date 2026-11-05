# Quant Common page — Charts view: decision log and rationale (2026-09-23 → 2026-10-04)

## 0. How to use this document (written for an AI assistant answering questions)

This document records **the design choices** behind the Quant Common page's Charts view: what was chosen, what else was
considered, **why**, and who decided. Use it to explain the design to people who were not part of the work.

- **What was built** (exact behavior, formulas, verification numbers) is in the authoritative design doc,
  `quant_common_page__charts_view__design_and_status_2026-10-01.md`. This log points to its sections as "design doc §N".
  When the two seem to differ on *behavior*, the design doc wins; this log is about *reasons*.
- **Status labels used below:**
  - **BUILT** = implemented and verified on local test data. Everything here is **uncommitted** as of 2026-10-04.
  - **DECIDED, NOT BUILT** = agreed design, implementation not started.
  - **DEFERRED** = consciously postponed.
- **Who decides:** "the maintainer" = the Limelight maintainer, who made every product decision. The "reference author" wrote
  the reference analysis (below). Build and review were done by AI assistants under the maintainer's direction; their
  recommendations are noted where the maintainer adopted them.
- **When explaining:**
  - Give the decision, then the reason, then the trade-off.
  - Do not invent reasons that are not written here; say "the log does not record why" instead.
  - Distinguish decisions from implementation details.
- Decision IDs are the ones used during the work (e.g. "C1", "D5", "R2"). The same letter was reused in different rounds,
  so IDs here carry an area prefix (e.g. "DE-D2", "SC-D5").

### Glossary

- **Reference analysis** — the reference author's Python analysis repository `limelight-quant-experiment`. It took one real
  8-sample study (raloxifene vs control) from Limelight + FlashLFQ and produced QC and statistics figures (matplotlib). The
  Charts view reproduces its charts in the browser.
- **FlashLFQ** — the label-free quantification (LFQ) engine; it measures MS1 peak intensities per peptide and protein per
  sample. Run by the separate `limelight-flashlfq-service`.
- **Quant submit / run** — one FlashLFQ request from Limelight. One page shows one run.
- **MBR (match-between-runs)** — FlashLFQ fills a value in a sample where the peptide was not identified, by matching
  retention time and m/z to a sample where it was.
- **Levels** — the page's sections: Peptides, Proteins, and (since 2026-10-03) Spectral counts (proteins).
- **Spectral counts** — identification-based abundance: **PSM count** (peptide-spectrum matches per protein per sample) and
  **NSAF** (normalized spectral abundance factor: PSM count ÷ protein length, normalized to sum to 1 per sample).
- **psvid** — Limelight's protein sequence version id; FlashLFQ protein rows are keyed `psvid_<n>`.
- **Complete set** — features with a value in every sample.
- **DE (differential abundance)** — a per-feature moderated (limma-style) linear-model test between two sample groups.
- **Floored variance** — limma's guard: residual variances below 1e-5 × the median are raised to that floor before the
  variance prior is fitted.

---

## 1. Foundational constraints (2026-09-23, maintainer)

From `quant_common_pages__flashlfq_charts__investigation_and_implementation_plan_2026-09-23.md` §1.

| ID | Decision | Why / trade-off |
|---|---|---|
| C1 | **No server-side image generation.** Charts are drawn in the browser with Plotly. | Interactive charts (hover, zoom, export) in the page; no Python or image service to run on the server. Rejected alternative: run the reference Python and serve PNG/SVG. |
| C2 | **All raw-data processing happens in the front end (TypeScript).** No new Java statistics endpoints. | One place for the math, next to the charts. Cost: statistics (PCA, clustering, limma-style DE, special functions) had to be written in TypeScript with no library and proven equal to the Python reference. |
| C3 | **Use Limelight's current Plotly (3.7.0).** | It already covers every chart type needed; no upgrade risk. |

---

## 2. Direction and data source (2026-09-29 → 2026-09-30)

| ID | Decision | Alternatives | Why |
|---|---|---|---|
| DIR-1 | The charts are **supposed to match the reference analysis** (maintainer, 2026-09-29). | Free-form Limelight charts. | The reference is the scientific baseline; matching it lets results be compared and trusted. Later refined by the layout rule (§6). |
| DIR-2 | **No contaminant exclusion** anywhere on the page (maintainer, 2026-09-29; the reference author advised not to). | Exclude contaminants as the reference does before its complete-feature sets. | Keep every measured feature; may be revisited after seeing data. Every place this makes the page differ from the reference is stated on the page (§5). |
| DIR-3 | **Keep computing everything done at submit, and add what is needed** (2026-09-29). | Trim submit-time outputs. | "More computed data beats missing it." |
| DIR-4 | **Charts view only**: the Quant Common page reads the service's result files **directly**, one FlashLFQ row = one peptide / one protein, **no mapping to Limelight reported peptides** (maintainer + lead, 2026-09-30; design doc §1). | Keep the earlier design that joined FlashLFQ rows back to Limelight reported peptides for tables. | A review of multi-search runs found that the join double-counted positional isomers and dropped cross-search MBR values. Reading FlashLFQ's own rows removes both problems by construction. Quant values in peptide / protein **lists** are not the priority now and will be designed differently later. |
| DIR-5 | The old quant common peptide / protein views are **commented out, not deleted**; the old retrieval webservices are **kept, unused**. | Delete them. | Keep the code to harvest for future lists. |
| DIR-6 | **Manifest first** (design doc §3): the page loads the run's `params_manifest.json`, checks its `outputs_version`, loads only the files it lists, and **never draws from a partial set of files**. | Load files optimistically. | A run from an older or newer service, or a missing file, gives a clear message instead of misleading charts. |
| DIR-7 | **One passthrough webservice** returns the service's result files byte-for-byte from a fixed list; **no filters** (design doc §3). | Server-side filtering or reshaping. | Results were fixed at submit; C2 puts the processing in the browser. |
| DIR-8 | The page's cutoffs come from the run's own link and are **display-only**. | Let the viewer change cutoffs. | The results were computed at the submit's cutoffs; changing them on the page would describe data the run never used. |
| DIR-9 | MBR is **always explained on the page** (what MBR is, this run's settings, how many values are MBR, that reruns can differ slightly) (2026-09-30). | Hide MBR details. | Limelight is used to share data with readers of papers, who did not run the quant. |
| DIR-10 | FlashLFQ stays **multi-threaded**; MBR values can vary slightly between reruns of the same input (2026-09-30). | Force single-threaded runs for repeatability. | Speed. The values will be persisted before publication use, so the stored values are the record. The page says reruns can differ. |
| DIR-11 | New URL `quant-common`; the older two URLs still work; Limelight links only to the new one (2026-09-30). | — | One entry point. |

---

## 3. Page structure and presentation (2026-10-01 → 2026-10-02)

| ID | Decision | Why |
|---|---|---|
| PG-1 | Per level, framed **color-scoped blocks** (Processing; Detection & abundance; Sample relationships; Differential abundance), each with its own color key (design doc §2). | Each block's colors mean something different; a key per block avoids misreading. |
| PG-2 | **One-sample run**: draw the single box in the boxplot (as the reference does); charts needing ≥ 2 samples show a note instead of an error (2026-10-01). | Matches the reference; a tiny run still shows what it can. |
| PG-3 | A processing state that **failed at submit** (e.g. batch correction skipped) shows its reason plus a **"Show chart" button**. | Do not hide a failure silently; do not draw it by default. |
| PG-4 | Sample-sheet upload: **any empty cell fails the upload** ("Every column must have a value for every row."). Older runs with a blank batch label get a warning, and the charts draw without batch grouping (design doc §5). | Blank metadata breaks grouping and coloring. Old data will be deleted, so no further migration work. |
| PG-5 | A **separator bar** above the Proteins heading, in the site's dark green, used directly (maintainer request, 2026-10-01). | Visual separation of levels. It is page chrome, not a chart color, so it is the one exception to the color rule (§4). |

---

## 4. Colors (2026-10-01; design doc §4)

| ID | Decision | Why |
|---|---|---|
| COL-1 | **Okabe-Ito colorblind-safe palette**, following the reference; no Limelight brand colors in chart marks. | Accessibility and parity with the reference. |
| COL-2 | **Single-source rule (maintainer requirement):** every meaningful color, its display name, and every fact the page states about colors live in ONE file, `quantCharts_Colors.ts`. The on-page color notes are generated from it and checked against what is drawn. A grep check enforces no color literals elsewhere. | One edit changes a color everywhere, and the explanatory text can never disagree with the chart. |
| COL-3 | Plotly's own defaults for gridlines, axes, tick text, hover labels and backgrounds are **not** overridden. | Only colors that carry meaning are controlled. |
| COL-4 | Batch / metadata colors: values sorted; 1–6 values → Okabe-Ito order (state colors last; vermillion and black skipped); 7–9 → Paul Tol "muted" for the whole set; > 9 → not colored, with a note. One shared function for every categorical column. | Distinguishable colors for realistic batch counts; no clash with the MNAR trend line; one rule everywhere. |
| COL-5 | (maintainer, 2026-10-22) **Narrows COL-2.** `quantCharts_Colors.ts` holds only colors that Plotly draws (including those ALSO shown in an HTML/SVG key or color note, which must match the chart). Every color used ONLY in standard HTML (text, borders, backgrounds, panel accents) lives in the site SCSS with a CSS class, and is mirrored in the paired TS file (`limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants.ts`); see `limelight_webapp/front_end/CLAUDE.md`, Colors. Applied ONLY to new / modified quant files (no project-wide refactor); existing site variables are reused where the value is the same (e.g. `$site-color-gray`, `.error-text`); the info-box blue accent moves too (it was never linked to the chart blue). | Keep every color in `quantCharts_Colors.ts` (COL-2 as first written); inline styles referencing the TS constants instead of classes. | HTML colors belong with the site's styling, in one place, so they cannot drift; classes are the maintainer's preferred form. |

---

## 5. "Differences from the reference" notes (maintainer, 2026-10-01; design doc §2)

| ID | Decision | Why |
|---|---|---|
| DEV-1 | Wherever the page differs from the reference, it says so **on the page**, in generated "Differences from the reference QC analysis" notes: one per level above the blocks, plus per-block notes. **No person is named** on the page. | The maintainer does not judge each deviation individually; viewers must be able to see every difference themselves. Notes are generated from what is actually drawn, so they list only the items that apply. |
| DEV-2 | The per-level note covers contaminants kept, sample order (scan-file order unless a run-order column is chosen) and boxplot coloring. | These affect several charts at once. |

---

## 6. Layout rule: numbers and encodings match the reference, Plotly decides layout (maintainer, 2026-10-02; design doc §4e)

**Decision.**
- **Must match the reference:** the numbers, the chart type, and the encodings (what is plotted, what colors mean,
  meaningful guide lines).
- **Plotly decides the layout:** ranges, ticks, margins, label positions, legend placement.
- **Override only for a real readability problem**, preferably with Plotly options.
- **Kept exception:** a minimum width per category (30 px; also crosstab 30 px per bar, cohort 90 px per value,
  correlation 14 px per cell), held by growing the figure, not shrinking the plot.

**Why.** The maintainer's words: "we are not creating curated charts. These charts have to accept a wide unknown range of
data." The reference figures were tuned to one 8-sample study, and copying their matplotlib layout caused one patch after
another as data grew.

**How it was applied.**
- 64 layout overrides were inventoried and classified, then two build rounds removed or replaced them.
- Kept, with stated reasons:
  - The house figure size (750 × 450).
  - The volcano and PCA label placement: Plotly has no label repel, and its own options gave 3–10× more overlaps. The
    volcano's computed ranges are kept because the label placement depends on them.
  - Margins that hold annotations: Plotly's automargin ignores annotations.
  - The width rules.
  - A few observed readability fixes: horizontal MNAR legend, dynamic-range top margin, always-drawn Study design tick
    labels, PCA +14 px top margin only when a panel shows the constant-feature line.
- Values that sat inside plots (CV medians, ID-depth median, residual-SD medians, π0) moved into legends, keys or panel
  titles, unchanged.
- **Verification follows the rule:** checks compare numbers and encodings, not geometry. Layout changes are checked for no
  increase in text overlaps, clipping or hidden labels.

---

## 7. Sample relationships block (2026-10-01; design doc §4a)

| ID | Decision | Why |
|---|---|---|
| SR-1 | PCA panels **colored by a metadata column the viewer picks** (dropdown; default batch, else first column). | Any study design, not just batch. Changing the color only recolors; the PCA is computed once. |
| SR-2 | Correlation heatmap with **one annotation stripe per metadata column**. | Shows how clusters line up with every recorded factor. |
| SR-3 | **Constant features are excluded** from PCA and the count is shown. | The reference stops with an error on such input. A web page must accept any data, so the page excludes them and discloses it. |
| SR-4 | PCA via the small sample × sample Gram matrix, with scikit-learn's sign convention. | Mathematically identical to the reference's full SVD and much cheaper for ~10⁴ features. The sign convention gives the same orientation as the reference panels. No new library (C2). |

---

## 8. Differential abundance block (2026-10-01; design doc §4b)

| ID | Decision | Alternatives | Why |
|---|---|---|---|
| DE-D2 | The **comparison is chosen on the page**: compare column, reference and test levels, and an optional covariate. It lasts for the page session only. | A fixed comparison chosen at submit. | Different readers ask different questions of the same run, and no request is needed (computed in the browser). |
| DE-D3 | Samples outside the two chosen levels are **left out and listed**. | Fit every sample. | The model compares exactly two groups; listing the left-out samples keeps it transparent. |
| DE-model | The reference's moderated test **reproduced step by step** in TypeScript: OLS, limma `fitFDist` prior with the zero-variance floor, moderated t, BH, Storey π0. The special functions were checked against scipy and a 60-digit reference. | Use a simpler t-test. | Parity with the reference (DIR-1). No JS library implements `fitFDist` (C2). |
| DE-C2 | **Refusals** (shown as messages instead of charts) only where the reference also refuses: no usable column, < 1 sample in a level, residual df < 1, a confounded or one-valued covariate, < 50 testable features, more than half of the residual variances zero. | Draw anyway. | Never show a statistically invalid result. |
| DE-Q2 | **No bottom padding** on the volcano y axis (2026-10-01). | Pad the axis so points at y ≈ 0 are fully hoverable. | Same as the reference; accepted as is. |
| DE-one-cov | **One covariate at a time**; numeric-looking columns are treated as groups. | Several covariates; continuous covariates. | Simpler UI; deferred (design doc §7). Stated in the block's note. |

---

## 9. Protein names (2026-10-01; design doc §4c and the contract doc)

| ID | Decision | Why |
|---|---|---|
| PN-1 | Proteins are shown with **Limelight protein names**, not FlashLFQ's `Protein Groups` text. Names are looked up per search of the run, from the page's filtered protein data. | Names in Limelight are per search; FlashLFQ's file carried only one name. |
| PN-2 | **Protein names were taken out of FlashLFQ entirely** (design change, 2026-10-01). FlashLFQ sees only `psvid_<n>`. The request carries a separate names table, and the service writes `protein_names.tsv`. | Embedding names in the accession risked splitting one protein into two rows when searches disagree on names, and made downloads hard to read. Files must be downloadable with names (requested by the reference author). Interim designs (comma-joined, then Ctrl-A-separated names) were superseded. |
| PN-3 | **The webapp and the flashlfq-service must be deployed together**; `OUTPUTS_VERSION` stays 2. | The old request format is now rejected by the service. |
| PN-4 | When searches disagree on a protein's names, the hover lists **every name with the search(es) that gave it**, never silently one. | No hidden choices in what the reader sees. |
| PN-5 | The four legacy protein retrieval endpoints are **disabled with a clear error** (fix deferred). | They cannot parse the new format, and nothing reachable calls them. |

---

## 10. DE diagnostics and Study design (2026-10-02; design doc §4d)

| ID | Decision | Why |
|---|---|---|
| G1 | Run-order charts and spectral versions were left for later rounds. | They needed data the page did not yet have (run order, spectral counts). |
| G2 | "p-values by design" compares the **viewer's comparison with the chosen covariate** against **the same comparison without a covariate**. | The reference compares three fixed designs (paired, batch, unadjusted); the page has a free comparison, so the useful contrast is "with vs without adjustment". |
| G3 | The tercile chart is drawn for **peptides and proteins** (the reference: proteins). | It is the same diagnostic, and useful for both. Stated as a deviation. |
| G4 | **Study design block once per page**, above Peptides. | It describes samples, not features. |
| G-flags | A residual SD of exactly 0 stays off the log axis and is counted; no change for blank-value columns (old data will be deleted); crosstab bars keep a 30 px minimum. | Maintainer decisions on the first-release flags (2026-10-02). |

---

## 11. Run (acquisition) order (2026-10-02; design doc §4f)

| ID | Decision | Why |
|---|---|---|
| RO-D1 | Run order comes from a **sample-sheet column the viewer picks** (default none). Only columns that qualify (numeric, or every value containing a digit) are offered; values are ordered number-aware. | Limelight stores no acquisition order. The reference parsed it from its own file names, which is not general. |
| RO-D2 | Position = rank within batch; first half "early" (odd middle sample early); acquisition order = batches sorted, then position. | Exactly the reference's rules. |
| RO-D4 | **Ties or blanks within a batch refuse** the column, with a warning naming the samples. | An ambiguous order would draw misleading run-order charts. |
| RO-D5 | The reference's **exact stratified permutation test**, with the same 2,000,000-permutation bound; no approximation above it. | Parity; never print an approximate p. |
| RO-display | "Order samples by run order" is **display only**: statistics are computed once in scan-file order and only permuted for display. | Re-ordering must never change a number. |

---

## 12. Metadata categories and value order (2026-10-03; design doc §4g)

| ID | Decision | Why |
|---|---|---|
| C1 | A column with **a different value for every sample** (≥ 3 samples) is **not a category**: it is left out of every category picker and of the cohort counts, and its values move into the correlation heatmap's hover instead of a stripe. | A run order or sample id as a "group" makes n groups of 1, which is meaningless for DE, colors or cohorts. The 3-sample minimum keeps tiny runs usable. |
| C1-exact | "7" and "007" are different categories (exact matching). | A category is the label as typed. Numeric equivalence matters only for run order. |
| C2 | **One number-aware ("natural") order** for every metadata value list ("B9" before "B10"), in one module. | Consistent order everywhere. The difference from the reference's plain code-point sort is recorded in the design doc only, not on the page (maintainer): it changes only order and default levels, never a statistic. |
| C3 | Cohort counts omit such columns, with one line saying why. | Avoid n bars of 1. |

---

## 13. Spectral counts — round 1: data and QC charts (2026-10-03; design doc §4h)

**Why spectral counts at all.** The reference shows PSM counts and NSAF next to its LFQ charts as **comparators** to
FlashLFQ. It read them from a Limelight protein-table download, which is not available to us, so the page computes them
in the browser from Limelight's filtered data.

**Phasing (maintainer):** round 1 = data + QC charts; round 2 = differential abundance; round 3 = LFQ-vs-spectral
comparison charts; round 4 = a subset of the reference's abundance-agreement analysis.

| ID | Decision | Why |
|---|---|---|
| SC-D1 | **Rows = the run's FlashLFQ protein rows**, matched by psvid. Multi-member rows, unparsable ids, duplicates, or a protein with PSMs that is not a row → **fatal**. | The same proteins as the LFQ Proteins level, so they can be compared. Fail loudly rather than guess. |
| SC-D2 | A **shared PSM counts for every protein** its peptide maps to; distinct PSMs within a protein. | The same as Limelight's existing protein page. |
| SC-D3 | NSAF computed per sample with Limelight's **existing NSAF calculator**; denominator = all rows; protein length from the filtered protein data; a length mismatch between searches → fatal. | Reuse the blessed calculator rather than write new math. |
| SC-D4/D5 | **No separate cutoff gate; instead a built-in check on every load:** per sample, the distinct PSMs counted must equal the PSM count the run's manifest recorded as sent to FlashLFQ. On mismatch the level shows which samples differ and no charts. | Proves the page counted exactly the population the run used. It also catches a hand-edited link. |
| SC-D6 | Samples = the LFQ samples (zero-PSM scan files left out). | Same samples as the LFQ levels. |
| SC-D7 | **Treatment = the reference, per chart**: zero = not detected; NSAF log2(x + 1e-9); PSM counts linear for correlation and PCA; no normalization or batch correction. Contaminants are **kept**. | Parity (DIR-1) and the page-wide contaminant rule (DIR-2). |
| SC-D8 | A **third level** with an **NSAF (default) / PSM count toggle**, built by **parameterizing the existing chart components with a "measure"**. No chart code is copied. | One implementation of each chart; the LFQ levels stay unchanged (checked string by string). NSAF is the default because the reference lists it first. |
| SC-F1 | **Accepted:** the submit drops PSMs of peptides whose mass cannot be computed (e.g. residue U); the page cannot know this without its own mass calculation, so the check could fail on such data. **DEFERRED follow-up:** the submit records dropped PSMs per scan file in the manifest. | It does not occur in local data. The page must not add its own mass computation. The follow-up is a webapp + service change. |
| SC-F7 | **The level loads only when the viewer clicks "Show spectral counts".** | It costs about 63–66 MB of browser memory and a ~4.5 MB request on the 8-sample reference dataset. Loading it on every page view was not justified for comparator charts. |
| SC-F5 | The PCA "Color by" choice is **kept when the measure is toggled**, if still valid. | Toggling should compare measures, not reset the viewer's choices. |
| SC-F6 | The single as-is state is labelled **"Raw"**. | Matches the reference's label and the LFQ levels. |

**Verification approach (all rounds):**
- The reference's own Python code run on the page's exported data, with an exact match expected.
- Comparison with the legacy protein page (PSM counts identical in all 34,752 protein × sample cells).
- The reference's published numbers.
- The live page on all local runs.
- A full end-to-end check script re-run after every change.

---

## 14. Spectral counts — round 2: differential abundance (2026-10-03; design doc §4h "Round 2")

| ID | Decision | Why |
|---|---|---|
| SC-R1 | The spectral level gets the DE block for the selected measure: volcano, p-value histogram, "How this is computed", and **only the "p-values by design" diagnostic**. | The reference draws the tercile and residual-SD diagnostics for LFQ proteins only. |
| SC-R2 | Inputs = the reference's transforms exactly (log2(NSAF + 1e-9); log2(PSM count), whole numbers ≥ 1), on the complete set, contaminants kept, constant proteins dropped and counted. | Parity. The reference requires contaminants removed, so this difference is stated on the page. |
| SC-R3 | Zero variance: **the same floor and refusal as the LFQ block** (the reference's limma rule). The page shows the floored count, and a line explaining that tied whole-number counts cause it. | Tied counts are common in spectral data (e.g. 12–20 proteins floored on the 4-sample runs). Readers should see it, but the statistics must not deviate from the reference. |
| SC-R4 | The spectral level has **its own comparison selection**, kept across the NSAF ↔ PSM toggle if still valid (all-or-nothing). | Consistent with each level having its own selection, and with SC-F5. |
| SC-R5 | The cross-quantity p-value chart moved to round 3. | It compares LFQ with spectral, which is round 3's theme. |
| SC-R6 | No paired design. | The reference's primary design adjusts for a sample pair; Limelight sample sheets have no pair column and the block takes one covariate. This is an existing, stated deviation. |

**Why the page's NSAF results differ from the reference's published NSAF results.** The reference's NSAF came from a
display-rounded download (3 decimals), which created ties: 10 proteins appeared constant, and 21 had zero residual
variance. The page uses full precision. With the reference's rounding and contaminant removal applied to our data, every
published spectral DE number was reproduced exactly (verification V2). So the difference is fully explained, not an error.

---

## 15. Spectral counts — round 3: LFQ vs spectral comparison (maintainer, 2026-10-04) — BUILT (3a + 3b)

Reference: finding 0005 (`fig_quant_comparison.py`, `analysis_figures/quant_comparison.py`, `fig_de_supplementary.py`,
`fig_de_raloxifene_vs_control.py` in the reference repo). The maintainer adopted every recommendation.

| ID | Decision | Why |
|---|---|---|
| R3-Q1 | **All five reference charts:** (1) per-protein log2FC scatter for LFQ–NSAF, LFQ–PSM and NSAF–PSM, with y = x and Spearman ρ; (2) residual-SD and CI-half-width distributions with medians; (3) residual SD vs mean abundance per quantity with 10 equal-count binned medians; (4) LFQ vs NSAF / PSM mean abundance with Spearman ρ and a **LOWESS** trend (frac 0.3, 3 iterations), which needs a TypeScript port of statsmodels' LOWESS checked against statsmodels; (5) p-value histograms side by side for protein, peptide, NSAF and PSM. | Parity with the reference's finding. |
| R3-Q2 | A new framed block **"LFQ vs spectral counts (proteins)"** at the end of the spectral level, loaded with its click, always showing all three quantities, whatever the measure toggle says. | It needs the spectral data, and it compares the quantities. |
| R3-Q3 | One comparison drives all quantities: **the spectral level's DE selection**, and the block says so. | One comparison must apply to every quantity. Reusing an existing selection avoids a fourth set of dropdowns. |
| R3-Q4 | Data as the reference: common set = proteins tested in all three quantities (the rows match by id, since spectral rows are FlashLFQ protein rows); each quantity **refit on the common set** for p and CI; log2FC and residual SD equal the full fits; mean abundance from each full fit; the LFQ side uses exactly the Proteins DE input; contaminants kept. | Like-for-like comparison, exactly as the reference. |
| R3-Q5 | The cross-quantity p-value chart uses **each quantity's full tested set**, including a peptide DE recomputed with this comparison (separate from the Peptides level's own selection). | That is what the reference draws. |
| R3-Q6 | The reference's **quantity colors** (LFQ / NSAF / PSM) are added to the single color source, with citations. | Color rule (COL-2) and parity. |
| R3-Q7 | Verification: the reference code on our matrices (exact); LOWESS vs statsmodels including tied x; the published numbers — **exact for NSAF / PSM-only parts**, **loose for anything involving LFQ** (our FlashLFQ is a local re-run of the reference dataset; LFQ protein log2FC correlation with the reference ≈ 0.946); the live page; a full check run. | The LFQ inputs are not identical to the reference's, so only the spectral side can match its published numbers exactly. |
| R3-Q8 | **Split into 3a** (charts 1, 2, 3, 5) **and 3b** (LOWESS port + chart 4), with a context-reset handoff before 3a starts. | Size of the round; keeps each build session within its working capacity. |

**BUILT 2026-10-04 (3a):** charts 1, 2, 3 and 5 in the block "LFQ vs spectral counts (proteins)" (design doc §4h "Round 3a"),
uncommitted. Chart 4 and the LOWESS port were left for 3b (built: see below). Verification: the reference's own code on the page's inputs, the
published reference (NSAF / PSM items exact, except two full-precision Spearman values that differ through near-tie breaking,
explained), the live page on 6 runs, unit tests, and the full check run (see the design doc).

Build choices (not settled by the decisions above):

| Choice | Why |
|---|---|
| The block's state lives in the spectral level's charts component, next to the Differential abundance selection that drives it, and is rebuilt at one place (inputs, metadata or selection values changed). | That component owns the selection (R3-Q3). A measure toggle that keeps the selection does not recompute the block, because it does not depend on the measure shown. |
| The levels' alignment / DE-input code moved into one shared helper used by the levels and the block. | The block's LFQ inputs must be exactly the levels' DE inputs (R3-Q4). One code path makes that true by construction; it is also checked on the live page. |
| The binned medians take the proteins in the reference's table order (ascending LFQ common-refit p, then id). | When several proteins have the same mean abundance, this order decides which side of a bin edge each falls on. Kept for exact parity with the reference. |
| "Residual SD of zero" uses the reference runner's test (below 1e-10), and the note also gives the exactly-0 count when it differs. | The reference's published number of "exactly zero" residual SDs is that test. Tied counts give values that are 0 or about 1e-17, depending on the arithmetic. |
| The scatter keeps the reference's one symmetric range for every panel's x and y (listed in the layout rule's remaining overrides). | The y = x reading needs equal, symmetric, shared axes, so this is an encoding. Plotly has no option for a range symmetric about 0. |
| In-plot texts (Spearman, π0 with n) are in the panel titles; the precision medians are in the key. | Layout rule precedent (the tercile panels' π0, the residual-SD medians). |
| The LFQ x label of the residual-SD chart says "median-normalized". | The page's LFQ input is the median-normalized log2 intensity; the reference's label says "LFQ intensity". |

**BUILT 2026-10-04 (3b):** chart 4 (LFQ vs PSM / NSAF mean abundance, Spearman in the panel titles, a LOWESS trend) between charts 3
and 5 of the block, with a line-by-line TypeScript port of statsmodels 0.15.0's LOWESS (design doc §4h "Round 3b"), uncommitted. Round 3
is complete; round 4 is still deferred. Verification: the LOWESS is bit-identical to statsmodels on the live page's inputs (default
path and pre-sorted) and on 22 synthetic edge cases; the published n / Spearman / Pearson / y ranges are reproduced exactly from the
reference's own table; the live page on 6 runs; unit tests; the full check run (charts 1, 2, 3, 5 unchanged).

Build choices (not settled by the decisions or the prompt):

| Choice | Why |
|---|---|
| With tied x values the port sorts stably (input order = the table order breaks ties). | statsmodels uses numpy's unstable sort; its order of tied values cannot be reproduced in general, and the fit depends on it. Without ties the two orders and the fits are identical. No local run, and not the published inputs, has tied LFQ mean abundances; a tie sentence and a deviation-note item are generated only when a run has ties. |
| A window whose x values are all equal keeps y (statsmodels' own behavior); no refusal. | statsmodels' 0 / 0 distances leave no usable weight, so it keeps y there — a finite fit. Checked against statsmodels. |
| A non-finite LOWESS fit draws that panel without its curve, with a message; the rest of the block stays. | The reference stops on it. Only an input near the largest double does this; refusing the whole block for it would hide four unaffected charts. |
| An empty input returns an empty fit. | That is statsmodels' observed result (its core reads past an empty array there). The page never gets there: the block needs at least 20 common proteins. |
| Spearman and Pearson are compared with numpy within 4.5e-16 / 2.3e-15, not bit for bit. | Both are np.corrcoef, whose cross-product runs in an OpenBLAS kernel chosen per CPU; only that product reproduces numpy's last bits. The published 4-decimal values are reproduced exactly. |
| The chart title says "mean over N included samples". | The reference's "mean over 8 runs" is its study; here the mean is over the samples the comparison includes. |
| The LOWESS is not optimized (about 30–38 ms per panel; the block about 106 ms instead of 43 ms on the 8-file dataset). | The prompt asked to report before optimizing; the arithmetic order must stay as statsmodels'. |

---

## 16. Spectral counts — round 4: per-run agreement (finding 0010 subset) (maintainer, 2026-10-04) — DECIDED; 4a + 4b BUILT

Reference: finding 0010 (`scripts/scratch/abundance_agreement.py`, `scripts/scratch/analysis/abundance_agreement.py`,
`scripts/scratch/analysis_figures/abundance_agreement_figs.py` in the reference repo).

**Scope (maintainer, 2026-10-03).** A subset of 0010:
- **In:** the density hexbin, per-run correlations, detection classes, within-protein tracking.
- **Excluded:**
  - slope estimators
  - residual drivers
  - "why no LFQ" reasons (FlashLFQ is treated as a black box)
  - agreement by PSM count with the Poisson floor

**Why this subset:** the log records one reason: the "why no LFQ" reasons are excluded because FlashLFQ is treated as
a black box. Bootstrap confidence intervals were to be approximated with a note or omitted (decided 2026-10-03; settled
by R4-Q1 below). The log does not record further reasons for the other exclusions.

**Decisions (2026-10-04, all review recommendations adopted):**

| ID | Decision | Why |
|---|---|---|
| R4-Q1 | **Bootstrap CIs** (drawn by the reference on the density and per-run charts) use the reference's algorithm — protein-cluster percentile bootstrap, 2,000 resamples, linear quantiles — with a **fixed-seed generator**, so the page always shows the same CIs. The note says so. The algorithm is proven exact by feeding numpy's own drawn indices to the page code, and the published CIs are compared within a Monte-Carlo tolerance. | The reference draws from one shared, seeded numpy random stream, which cannot be reproduced number for number in TypeScript. Matching the algorithm and keeping the page deterministic is the faithful, honest option; dropping the CIs or using an analytic CI would deviate more. |
| R4-Q2 | The LOWESS port gains statsmodels' **`delta` interpolation shortcut** (the reference uses delta = 0.5% of the x range here), checked bit-identical against statsmodels. Round 3b's chart stays unchanged (delta 0). | Exact parity with the reference's trend line. |
| R4-Q3 | **LFQ value = log2 of the median-normalized intensity, with no +1**, for every detected run × protein cell. The per-run factor is recovered from the normalized file and asserted constant, as the reference does. NSAF at full precision; contaminants kept. The difference from the other blocks (which use log2(x + 1)) is stated in the note. | The reference's definition; the page-wide rules for NSAF and contaminants stay. |
| R4-Q4 | **Detection classes** as the reference (both / PSM-only never LFQ / PSM-only LFQ elsewhere / LFQ-only). The LFQ-only label carries its actual MBR-only count (e.g. "1,491 of 1,491 MBR-only"), computed from the peptide file's per-run detection types (single-protein peptides only). It never fails the page. | The reference asserts that every LFQ-only cell is MBR-only; on other data that may not hold, and the page must show the truth rather than stop. |
| R4-Q5 | **Within-protein tracking:** the across-runs and by-PSM-level panels are always drawn. The two **pair panels** are drawn only when a sample-sheet column qualifies as pairs (each value holds exactly one sample of each of the two compared levels); the viewer picks one, otherwise a note. Exact permutation nulls as the reference, with a size limit as for run order. | The reference's pairs come from its own design column; Limelight sample sheets have no pair column, so it must come from a column that genuinely forms pairs. |
| R4-Q6 | Charts 1–4 use **all quantified samples**. Per-run chart: colored by the batch column, marker shape by the spectral DE comparison's two levels (other samples a third shape). The pair panels use the spectral DE comparison's two levels. | One consistent source for groups (the spectral level's comparison), as in round 3. |
| R4-Q7 | A new framed block **"LFQ vs spectral counts: per-run agreement"** after the round-3 block in the spectral level, loaded by its click, not affected by the measure toggle. | It needs the spectral data and compares quantities, like round 3. |
| R4-Q8 | The **hexbin reuses the existing matplotlib-exact hexbin port** (MNAR chart), with the reference's grid (60 × 42), a log color scale shared across both panels and the "Greys" colormap. | Plotly has no hexbin; the exact port already exists. |
| R4-Q9 | **Verification:** deterministic parts exact against the reference's code on our data. Published numbers: nearly exact via the page code on the reference's own per-cell table (6 significant digits) where our LFQ is not involved; loose where our LFQ or detection is (local FlashLFQ re-run); bootstrap CIs as R4-Q1. | Same standard as rounds 1–3, with the stated limits of the inputs. |
| R4-Q10 | **Split: 4a** = density + per-run correlations (with the LOWESS delta extension and the bootstrap); **4b** = detection classes + within-protein tracking. A context-reset handoff before 4a. | Size of the round. |

**BUILT 2026-10-04 (4a):** a sixth framed block in the spectral level, "LFQ vs spectral counts: per-run agreement", after the round-3
block, with chart 1 (density: two matplotlib-exact hexbin panels on one log "Greys" scale, the LOWESS trend with statsmodels' delta
shortcut, the descriptive SMA line) and chart 2 (per-run Spearman with 95% protein-cluster bootstrap intervals, the pooled value and
band, batch colors, marker shapes from the spectral comparison), its notes, uncommitted (design doc §4h "Round 4a"). Round 4b (detection
classes, within-protein tracking) is not started. Verification: the reference's own functions on the live page's data (cells, factors,
Spearman, SMA, the LOWESS with delta and its grid, every hexagon count, center and color) agree, LOWESS bit for bit; the LOWESS delta path
is bit-identical to statsmodels on real and 18 synthetic cases; numpy's own drawn integers fed to the page's bootstrap give identical
resamples and, with the same statistic arithmetic, bit-identical draws and intervals; the reference's published cells through the page's
compute reproduce every published number to the cells' 6-digit rounding, and the published intervals within the Monte-Carlo spread; the
live page on 6 runs; unit tests; the full check run.

Build choices (not settled by the decisions or the prompt):

| Choice | Why |
|---|---|
| Random numbers: xoshiro128** 1.0 (Blackman & Vigna), state seeded by splitmix64 from **20260924** (the reference's seed), integers in [0, n) by Lemire's unbiased multiply-and-reject method (the method numpy's Generator.integers uses below 2^32). One stream, used in a fixed order: PSM pooled, then each run in scan-file order, then the same for NSAF. | A well-known, fast 32-bit generator with an exact JavaScript implementation (checked against the authors' reference C). One fixed stream gives the same intervals on every load and does not depend on the display order of the runs. |
| Each resample's average ranks are computed by counting over the original values' tie groups (O(n)), not by sorting the resample. | The same numbers in the same order, so the statistic is bit-identical to the page's Spearman on the resampled values (unit-tested on real data); a comparison sort would make the bootstrap about 70 s instead of about 3.5 s (node) on the 8-file dataset. |
| The bootstrap statistic uses the page's Spearman arithmetic (the round-3 helper's: pairwise means, sequential sums). | Reuse (prompt). numpy's correlation uses BLAS dot products, so single draws differ from numpy's by up to about 3e-16; with numpy computing the draws in the page's arithmetic, draws and intervals are bit-identical (V3a). |
| ~~The cell values use a correctly rounded log2 (double-double evaluation), not Math.log2.~~ **SUPERSEDED by R4-F1 (built 2026-10-04): the cell values use Math.log2; the helper is no longer used.** | numpy's np.log2 was correctly rounded on all 69,966 cell values checked; V8's Math.log2 was 1 ulp off on 14 of them, which moved the LOWESS trend by up to 1.6e-12. Other blocks keep Math.log2 (their verified numbers are unchanged). (Later found: that V8 was Node.js 24's, used by the offline checks; the page's browser, Chrome 153, gave np.log2's value on every one of those cells -- see R4-F1.) |
| A normalization that is not one factor per run (spread > 1e-9) gives the block's one message; a normalized row missing from the raw file, or a non-positive ratio, is fatal. | The first is a property of the data (the reference stops; the page explains and keeps the other blocks). The second can only come from inconsistent result files. |
| No comparison in the spectral Differential abundance block: every run's marker is a circle; samples outside a comparison are squares. | R4-Q6 names the two levels' shapes and "other samples a third shape"; with no comparison there are no levels, so one neutral shape is used and the key says why. |
| Markers without a usable batch color (no batch column, or more values than the batch colors) take the Sample relationships block's uncolored gray. | The page's existing "not colored" color; the key and the color note say so. |
| The hexagons are drawn as one filled trace per colormap entry (each hexagon a closed segment), with a hairline edge in the hexagon's own color. | Plotly has no hexbin; about 1,100–1,500 hexagons per panel as layout shapes would be slow to draw. The edge closes the seams, as in the MNAR chart. |
| The colorbar ticks are 1 / 3 / 10 / 30 / 100 / 300 up to the largest count. | The reference's list (it includes 300). |
| The x label of chart 2 is "Sample (n = N)"; the runs are in the page's order. | "Order samples by" decides the order here; the reference's label says "acquisition order" for its fixed order. |
| The rule that draws batch dividers only for contiguous batches moved into one shared helper used by ID depth and chart 2. | One rule, one place; ID depth's results are unchanged (checked by the full run). |
| The block's plot names start with "quant charts per-run agreement". | Older drivers count the round-3 block's charts by the prefix "quant charts lfq vs spectral". |
| ~~The bootstrap is computed synchronously with the rest of the block~~ (**SUPERSEDED by R4-F2, built 2026-10-04: time-sliced**), on the "Show spectral counts" click. Measured on the 8-file dataset: about 5.6 s in the browser (the bootstrap is 5.4 s of it); the click to drawn time grows from about 1.2 s to about 7 s. | The prompt asked to report before any structural change. Options for the maintainer are in the round-4a report (draw the charts first and fill the intervals in after, or run the bootstrap in a Web Worker); neither changes the arithmetic. |

---

### Round 4a follow-up decisions (maintainer, 2026-10-04 / 2026-10-05) — DECIDED; R4-F1 + R4-F2 BUILT 2026-10-04, R4-F3 BUILT 2026-10-05

| ID | Decision | Why |
|---|---|---|
| R4-F1 | **Use JavaScript's `Math.log2` everywhere; remove the correctly rounded `log2` added in 4a** (`quantCharts_Log2.ts` deleted). A message box at the top of the page states that values from JavaScript `Math.log2` differ from numpy's `np.log2`, and by how much (measured: 17 of 85,416 real values differ by 1 unit in the last place, about 2 × 10⁻¹⁶ relative; the largest effect on a charted result was about 1.6 × 10⁻¹² on a LOWESS line). Parity checks allow for this difference instead of forcing bit-identity. **BUILT 2026-10-04:** the three cell logarithms use `Math.log2` (the helper module is no longer imported anywhere; its file is to be deleted); "How this is computed" says so; ONE amber message box at the top of the Charts view with the measured numbers; the parity checks that were exact only through the helper (the reference-code check on the page's data) now state their tolerance (cell values ≤ 1 ulp, LOWESS ≤ 1e-11) and print their deltas. **Measurement on this build (premise corrected):** in the page's browser (Chrome 153) `Math.log2` equalled `np.log2` on every one of the 3,779,022 `Math.log2` calls the Charts view made on the 6 local runs, and changed none of the per-run block's numbers (0 of 989,412 computed and 215,552 drawn); the "17 of 85,416" and "1.6 × 10⁻¹²" above were measured in Node.js 24 (an older V8), whose `Math.log2` differs from `np.log2` on 1,449 of those calls (1 ulp each) and would move the LOWESS line by up to about 3 × 10⁻¹². The note gives the Chrome numbers (design doc §4h "Round 4a follow-ups"). | `Math.log2` is used throughout Limelight. A replacement in one place means two implementations of one function, ~150× slower, more code to maintain, to fix an effect that changes no visible result. The maintainer: "I cannot imagine that using JavaScript Math.log2 is that much of a problem to take on the code and speed issues." Standing rule (front-end `CLAUDE.md`): report such built-in differences; never replace built-ins. |
| R4-F2 | **The per-run agreement block's bootstrap is computed in small time-slices** (same resamples, same order, same generator, so identical numbers) so the page stays usable. The block **draws nothing until everything is computed**; meanwhile an inline message box in its place names what is being computed and shows progress (e.g. "Computing the per-run agreement charts (density and per-run correlations, 2,000 bootstrap resamples) … 40%"). Leaving the page or a data reload stops the computation; a comparison change (marker shapes only) does not restart it. **BUILT 2026-10-04:** everything but the bootstrap stays synchronous; the bootstrap resamples run in ~50 ms slices with control returned to the browser between them; the block shows only its heading and the progress box until the last resample, then draws. Same numbers proven: the pre-change synchronous code and the sliced runner agree bit for bit on all 6 runs (every number of the result, 4 different slicings), and the live page's ρ and intervals equal round 4a's on all 6 runs. On the 8-file dataset the bootstrap takes about 5.6 s of work over about 6.7 s; a chart elsewhere on the page answers a hover in well under 0.1 s meanwhile. | Run synchronously, the bootstrap froze the page for about 7 s on the 8-file dataset. Time-slicing keeps the arithmetic identical and is simpler to maintain than a Web Worker. Drawing only complete results (the maintainer's choice) avoids showing charts without their intervals. |
| R4-F3 | **The `Math.log2` note becomes an INFO box (not a warning), placed first below any warning boxes at the top of the page**, with the two-engine text: "Logarithms use JavaScript's `Math.log2`. In our tests, Chrome 153 matched numpy's `np.log2` on all 3,779,022 values; an older JavaScript engine (Node.js 24) differed on 1,449 of them, by 1 unit in the last binary digit (about 2 × 10⁻¹⁶ relative). Other browsers were not tested. No visible result is affected." (maintainer, 2026-10-05) | The R4-F1 premise came from a measurement made in Node.js, not the browser: in Chrome 153 `Math.log2` matched numpy on every value the page computes. The fact is still worth stating for other engines, but there is nothing to warn about in Chrome, so it is information, after the real warnings. **BUILT 2026-10-05:** the info box uses the MBR explanation's information colors (no new colors); the text is the approved one, its two numbers checked against the measurement by the full check run; placement = the not-quantified warning (moved to the top of the Charts view for this), then the info box, then the MBR explanation (the normalize-failed banner is above the view); checked on the 6 runs and with in-memory test warnings (design doc §4h "Round 4a follow-ups"). |
| R4-B1 | **Round 4b's charts (detection classes, within-protein tracking) get their own framed block**, "LFQ vs spectral counts: detection and within-protein tracking", after the per-run agreement block (maintainer, 2026-10-05). | They then draw at once instead of waiting for the per-run block's bootstrap (that block draws nothing until done), and their own controls (the pair-column picker) sit with them. |
| R4-B2 | **The pair-column picker defaults to "none"**: the two pair panels appear only after the viewer picks a qualifying column (maintainer, 2026-10-05). | Same as the run-order picker. A column can qualify by structure (each value holds one sample of each compared level, e.g. a batch column on a 2 × 2 design) without truly being a pairing, so the viewer decides. |
| R4-B3 | The `Math.log2` note's count is updated by re-measurement (3,779,022 → 3,780,161 after round 4b added the one-sample run's cells; Chrome still matched numpy on every value); the rest of the approved text stays (maintainer, 2026-10-05). | The R4-F3 rule: the numbers are measured, re-checked on every full run, and kept in sync. |
| R4-B4 | A unique peptide whose protein is not a FlashLFQ protein row is **fatal** (the reference silently skips it) (maintainer, 2026-10-05). | It would mean the run's peptide and protein result files are inconsistent. The same rule as round 1's (a protein with PSMs that is not a row is fatal): fail loudly rather than hide a data problem. Never seen on the local runs. |
| R4-B5 | The within-protein "95% null range" is a light gray band with dashed edges; the reference hatches it (maintainer, 2026-10-05). | Plotly cannot hatch shapes; the range is the encoding, its look is layout (§4e). Stated in the deviation note. |


Build choices of the follow-ups (2026-10-04):

| Choice | Why |
|---|---|
| The note's numbers are the Chrome measurement the decision asked for: "0 of 3,779,022 values differed …; the largest effect on a charted result was 0 (none)" (the template's "about E" became "was 0 (none)"). | Measured on this build: every `Math.log2` argument the Charts view computes on the 6 local runs (load, the spectral click with NSAF, PSM count) against `np.log2`, and every number of the per-run block against the round-4a build. Chrome's `Math.log2` was also correctly rounded on all 499,444 values of round 4a's log2 test set. The text is static (a measured fact), not computed on each load; other browsers / older engines may differ (Node.js 24's did, on 1,449 of the calls). An alternative wording naming both engines is in the follow-up report for the maintainer. |
| The note is one amber box (the page's warning style, colors from the color registry) at the top of the Charts view, above the MBR explanation; its text lives in a pure module the tests import. | "Top of the page, priority styling like the other inline warnings"; one style object shared with the in-level warnings; the text is checked against the measurement by the full check run. |
| Only the bootstrap is time-sliced. The rest of the block (cell values, Spearman, SMA, LOWESS, hexbin; about 0.16 s on the 8-file dataset now that the cell values use `Math.log2`) stays synchronous in the render that starts it. | The decision scopes slicing to the bootstrap; refusals and fatal file inconsistencies keep their existing synchronous path. |
| One resample is the unit of work; a slice runs resamples until ~50 ms have passed (at least one), then yields with a zero-delay timer (a new task, so input and painting run between slices). | A resample takes 0.1–0.8 ms, so slices stay close to 50 ms. No new library; works in every browser. |
| The resumable bootstrap (`QuantCharts_Bootstrap__SpearmanCi_Job`) and the pending computation are the ONLY implementation: the one-call functions the tests and checks use run the same job to the end. | One arithmetic path, so "sliced == synchronous" holds by construction (and is proven anyway). |
| While computing, only the progress box re-renders (through a ref, after each slice); the level is re-rendered once, at completion. | Re-rendering the whole spectral level ~100 times would be needless work while the page is meant to stay responsive. |
| Stopping: a generation number held in an instance field (plus clearing the pending timer). A new inputs object (a data reload) or unmount increments it; a slice of an older generation does nothing. The comparison, the sample order and the measure toggle do not enter the computation, so they never restart it. | Simple and visible in the code; nothing stale can be drawn. |
| While computing, the block keeps its frame and heading, with the progress box inside (attribute `data-quant-charts-lvs-pr-state` = computing / done / refused). | The block's place on the page does not jump; test drivers wait for the state. |
| The block's timing attributes: working time (`…-compute-ms`, as before) and elapsed time from start to complete (`…-wall-ms`). | Separates the arithmetic's cost from the gaps between slices. |


### Round 4b — BUILT 2026-10-05 (4b)

**BUILT 2026-10-05 (4b):** a seventh framed block in the spectral level, "LFQ vs spectral counts: detection and within-protein tracking",
after the per-run agreement block (R4-B1), drawn at once (about 16–22 ms on the 8-file dataset in the browser; it never waits for the per-run block's
bootstrap), with chart 3 (detection classes per run, stacked, + the cumulative PSM counts by class; the LFQ-only class labeled with its
actual MBR-only count, R4-Q4) and chart 4 (the per-protein run-to-run Pearson r and the median r by count level; the two pair panels with
exact permutation / sign-flip nulls only after the viewer picks a qualifying pair column, default none, R4-Q5 / R4-B2), its notes; the
parser stores each cell's Detection Type and each peptide's Protein Groups; uncommitted (design doc §4h "Round 4b"). Spectral rounds 1–4 are
complete. Verification: the reference's own code (`section_detection`, `section_within`, `peptide_protein_summary`, `_cell_classes` and the
listed functions) on the live page's inputs gives every charted number bit for bit (the nulls within about 5e-17: numpy's BLAS products); the
page's compute on the reference's published per-cell table reproduces every published count, n and p exactly (LFQ only 1,491, all MBR-only;
p 0.041667 over 24, 0.125 over 16) and the rest to the table's 6-digit rounding, proven by the reference's own sections on the same rounded
cells; the live page on 6 runs; unit tests and a numpy parity of the pair arithmetic for 2–10 pairs; the full check run.

Build choices (not settled by the decisions or the prompt):

| Choice | Why |
|---|---|
| The cells are built ONCE per spectral data object by the per-run block's builder and the same object is handed to both blocks; the builder returns a refusal reason without a subject, and each block writes its own subject ("The per-run agreement …", "The detection and within-protein block …"). The builder gained the raw PSM count per cell. | "Reuse them, don't re-derive": one definition of LFQ present / PSM present, no second build (about 10 ms and its `Math.log2` calls); the per-run block's texts and numbers stay byte-identical. |
| The LFQ-only check matches a unique peptide's `Protein Groups` member to a protein row by the Limelight protein sequence version id on both sides (`psvid_<n>`, also the older `psvid_<n>_<name>`), the way the spectral counts already match proteins. A unique peptide whose protein is not a protein row is fatal; the reference skips such a peptide. | The prompt asked to map through the psvid ids; on all 6 local runs this gives exactly the reference's string matches (observed). The two files are written together by the service, so a mismatch means inconsistent files; failing loudly is the house rule for such matching, and the maintainer may prefer another policy (flagged in the report). |
| Unique peptides are counted by their Detection Type whatever their intensity (MSMS / MBR); shared peptides are not counted. | The reference's `peptide_protein_summary` does exactly this. |
| When the cells cannot be built (Proteins files or median-normalized state missing, a normalization that is not one factor per run), the whole block shows one message, although chart 3 alone does not need the factor. | One cell definition for both blocks; no local run lacks the normalized state. |
| Chart 4 needs at least 3 quantified samples and shows its own message otherwise (the one-sample run); chart 3 is still drawn. | A Pearson r across 2 samples is always ±1. |
| Minimum pairs: 3 for the pair-means panel, 2 for the within-pair panel; a panel below its minimum is not drawn and says why. | Over 2 pair means r is always ±1; the uncentered correlation of 1 difference is always ±1. |
| The size limit counts permutations × the proteins entering the null (rows with a defined r), at most 2,000,000 (the run-order test's bound), checked before enumerating. | The prompt's rule; with it the pair-means null is exact up to 7 pairs (up to 396 proteins), the sign-flip null up to 2^P × proteins ≤ 2,000,000. |
| A pair column = a usable sample-sheet column of the spectral comparison's choices (every sample has a value; a column with a different value for every sample is never one), the comparison's own column skipped; EVERY value must hold exactly one sample of the reference level and one of the test level (a value holding only samples of other levels disqualifies the column); other-level samples are left out and listed; pairs in the shared natural value order. | The prompt's rule, applied strictly so every value is a pair; the shared value order is the page's one rule (the reference sorts its pair labels in code-point order; only the order of the sums changes). |
| The viewer's pair column is kept while it still qualifies (same index and name), else none. The pair tier is rebuilt when the comparison, the viewer's choice or the candidate columns' VALUES change. | Same as the comparison's keep-or-default; comparing values (not the choices object) keeps the NSAF / PSM toggle from rebuilding it — the toggle rebuilds an identical choices object (observed). |
| The 95% null range is drawn as a light band of the reference's hatch gray (`#9a9a9a`, 25% opacity) with a dashed outline at the two quantiles. | Plotly shapes cannot be hatched; a band reads as a range; flagged, and named in the deviation note. |
| Panels a + c are one chart (Plotly grid row); b1 above b2 (shared x) are a second chart below the "Pair samples by" picker, drawn only with a chosen column. | The reference's a and c span both rows, which a Plotly grid cannot do; the a / c chart then never changes when the picker does. |
| The cumulative curves: x log bounded below at 1 with decade ticks, y bounded to 0–1.01 (Plotly's `autorangeoptions`). | The reference's limits and decade labels; Plotly's 2 / 5 log ticks ran together (observed). Listed in design doc §4e. |
| The histograms are bars drawn from the computed counts (bin centers / widths), not Plotly's own binning. | The counts are then exactly numpy's histogram of the r values (checked). |
| Number formats: Python's "{:.0f}" through the page's round-half-to-even helper; "{:.2f}" / "{:.3f}" through JavaScript's `toFixed`. | `toFixed` is a built-in: it differs from Python only on an exact binary tie (e.g. 0.0625), reported, not replaced (0 such texts on the 6 runs, observed). The integer format reuses the existing helper (medians of counts end in .5 often). |
| The per-protein row sums follow numpy's measured order (pairwise for the full-sample rows, sequential for the pair-derived rows); the nulls' matrix products are summed sequentially. | Bit-identical r (checked for 2–10 pairs); numpy's BLAS products differ by about 5e-17 with the same p. |
| The panel text's mean r = the mean of the defined r (the figure's `np.mean`), not the section's `np.nanmean`. | The canvas statistic; the two differ by about 6e-17. |
| "Neither" = the rows with LFQ or PSMs in some run minus the run's classes (the reference: all protein rows). | Equal on every local run and on the published table (no row has neither in every run). |
| The parser stores the Detection Types as one byte per cell (the index into the file's distinct values) for every parsed file; the Charts view keeps only the raw files'. A peptide file without `Protein Groups` is fatal. | Compact (about 267 KB on the 8-file dataset); one parse code path for both levels; the column is required by the check. |
| Plot names "quant charts detection classes", "quant charts within-protein tracking", "quant charts within-protein pairs"; DOM attributes `data-quant-charts-lvs-dw-*`. | Older drivers count charts by the earlier blocks' name prefixes. |
| The `Math.log2` note's count re-measured and updated: 3,779,022 → 3,780,161 calls (the page now also builds the cells on the one-sample run: +1,139); Chrome 0 differing, Node.js 24 still 1,449; the rest of the approved text unchanged. | The note states the measured count; the R4-F3 rule: re-measure and update when the inputs change (flagged in the report). |

---

## 17. Still deferred (see design doc §7)

- ~~Several covariates at once; a continuous covariate.~~ BUILT 2026-10-22 (Phase 6, §23). Still deferred: acquisition order from instrument files.
- Contaminant handling (possibly revisited).
- ~~Per-submit FlashLFQ version capture.~~ Done: every run's parameters manifest records the FlashLFQ release version and the output of a separate version query (observed on the 2026-10-21/22 local runs), and the run info panel shows it ("FlashLFQ version: <reported> (release <release>)", omitted for runs older than outputs version 5).
- Storing quant requests and results in the database.
- Quant values in peptide / protein lists.
- ~~Removing the standalone quant pages.~~ Already done 2026-09-26 (the quant peptide and quant protein list pages, their controllers, JSPs, routes and build entries were deleted; see `quant_pages_TODO.md` §A). Listed here in error until 2026-10-05.
- **Kept for now (maintainer, 2026-10-05):** the quant common page's old peptide and protein views (commented out in `quantCommonSPAView_MainContent_Component.tsx`), the single-protein overlay and shared directory they show, `quantCharts_GatedContent_Component`, the prototype protein loader, and the four disabled legacy protein endpoints. Probably unreachable in the UI now, but whether the old views return is undecided, so nothing is deleted; repairing the endpoints (`quant_pages_TODO.md` §D) waits until the views return.
- The SC-F1 manifest follow-up.

---

## 18. Result-file download (maintainer, 2026-10-05) — DECIDED; BUILT 2026-10-05 (service + webapp)

| # | Decision | Why |
|---|---|---|
| DL-1 | The download links go on the **project page** (the quant run list). | It is where a user picks a run. |
| DL-2 | The files offered are the **combined peptide and protein files plus `protein_names.tsv`**. | The result files carry only `psvid_<n>` ids; users join names on that id (protein-names contract doc). |
| DL-3 | No special handling for runs that have no `protein_names.tsv` (submitted before 2026-10-01): the download returns the 404 as is. | All such runs were deleted from the server. |
| DL-4 | **No zip.** Each file is its own download; neither the webapp nor the service builds a zip. | The files will eventually move to file object storage, and a zip built on demand is not wanted. A zip built by the service would have to change whenever the file set changes. |
| DL-5 | Once quant runs are stored in the database, the contents of `protein_names.tsv` may be generated on the fly from the Limelight database instead of from a stored file. | Recorded in `quant_things_to_deal_with_when_start_store_in_db.md` §7. |
| DL-6 | The combined files offered: the raw combined peptide and protein files, plus the normalized and batch-corrected versions **when the run has them**; links for files a run does not have are not shown. | Users doing their own analysis want the values the charts use. |
| DL-7 | In the project-page run list, ONE "Download" link per READY run opens a small list of the run's files. | Up to nine links inline per row would crowd the table. |
| DL-8 | The download itself is a **new download controller** (in `data_download_controllers/`, `Content-Disposition: attachment`), separate from the Charts view's passthrough webservice. | Matches Limelight's existing downloads; keeps the passthrough single-purpose. |
| DL-9 | Clicking "Download" calls a **new webapp webservice**, which calls a **new flashlfq-service endpoint** that lists the run's available files (it checks for the normalized and batch-corrected files). The front end keeps the result per run, so clicking "Download" again for that run does not call the webservice again. | The page does not otherwise know which derived files exist; one call per run per page load. |
| DL-10 | The file list opens in a **mini overlay** like the search-name change overlay (`common_components__react/search_name_and_search_short_name__user_change_overlay/searchName_and_SearchShortName_Change_Component_and_WebserviceCall.tsx`: positioned near the click, added to the document body). | Consistent with existing small Limelight overlays. |
| DL-11 | The download set is the **same 9 files the Charts view reads**: per side (peptide, protein) raw combined, normalized linear, batch-corrected log2, batch-corrected delog2; plus `protein_names.tsv`. Normalized log2 and batch-corrected linear are **not** offered. | Offering only what the webapp already uses means the service is not committed to keep producing the other versions. |
| DL-12 | The service endpoint reports which of its files exist for a READY run (no files for any other status); the **webapp's** download allowlist decides which of them are offered. | The download set (DL-11) lives in one place; the service endpoint does not change when the set changes. The service writes every derived file before the done-marker (`app/request_processor.py:274-296`), so a READY run's files are complete. |
| DL-13 | The downloaded filename is prefixed with the run's requestId, e.g. `<requestId>__CombinedProteins.normalized.linear.tsv`. | Files from different runs do not overwrite each other in the user's downloads folder. |

Facts the build starts from (checked 2026-10-05): the service already serves `protein-names` (`app/web_listener.py:77`). The
webapp's `Quant_FlashLFQ_CombinedResultFile_Retrieval_RestWebserviceController` is a POST webservice that returns the
file body with no `Content-Disposition`, for the Charts view; its allowlist (:74-83) has the 8 combined files and not
`protein-names`. Limelight's existing file downloads are form-POST controllers in `data_download_controllers/` that set
`Content-Disposition: attachment` (e.g. `SearchFile_Download_Controller.java:192`). Normalized and batch-corrected
files exist only when requested and successful (`quantCharts_RunOutputs_Gating.ts`, `quantCharts_RunOutputs__ExpectedFiles`).

### Built 2026-10-05 (webapp; the service endpoint was built first)

**BUILT 2026-10-05:** the file-list webservice, the download controller, and the "Download" link + overlay in the
project-page quant run list, to the contract doc (`quant_result_file_download_contract_2026-10-05.md`). Checked on
the 7 local test runs: every listed file downloads (51 files; byte-identical to the service's files), the list matches
the files each run has, and a second "Download" click for a run makes no webservice call.

| # | Build choice | Why |
|---|---|---|
| DL-B1 | The 9 tokens and their file names are ONE Java map, `FlashLFQ_Quant_ResultFile_DownloadSet_Constants` (iteration order = the contract doc table), used by both the file-list webservice and the download controller; it also builds the download file name (`downloadFilename`). | One place to change the download set (DL-11, DL-12). |
| DL-B2 | The file-list webservice is `d/rws/for-page/quant--flashlfq-run-result-files-download-list` (`Quant_FlashLFQ_RunResultFiles_DownloadList_RestWebserviceController`): the same checks in the same order as the Charts view passthrough, a run of another project → 404. It returns `{ status, files, downloadFilenames }`; `downloadFilenames` is parallel to `files`. | `downloadFilenames` is an addition to the contract's `{ status, files }`: the overlay shows each file's download name, and sending it means the front end does not hold a second copy of the token → file-name map. |
| DL-B3 | The service call is a new method `fetchRunAvailableResultFiles` on `FlashLFQ_Quant_RunResultFile_Fetch_Service` (same configured base URL; the base-URL and GET code is now shared by both methods). The service's JSON is checked strictly: exactly the properties `request_id`, `status`, optional `detail`, `files`; `request_id` must be the one asked for; `status` one of the four; `files` distinct token-shaped strings, empty unless READY. Anything else → 500. | Fail loudly on a service change rather than show a wrong list. A new property in the service's answer therefore needs a webapp change. |
| DL-B4 | The download controller path is `d/dnld/quant--flashlfq-run-result-file` (`Quant_FlashLFQ_RunResultFile_Download_Controller`), not under `d/dnld/psb/`. | A quant run is keyed on a project id and a request id, not on project search ids; nothing in the webapp matches on the `d/dnld/psb/` prefix (download controllers do their own access check). |
| DL-B5 | Download errors: a bad request (including a token outside the 9) → 400, a run of another project or a file the service does not have → 404, both via `sendError`, so the browser shows the webapp's general error page ("There was a problem processing your request.") instead of saving a file. No session on a non-public project → the existing no-session download page (as the other download controllers). | The other download controllers have no 404 case (they throw → 500); `sendError` gives the right status and the standard error page. |
| DL-B6 | Download response: `Content-Type: text/tab-separated-values`, `Content-Disposition: attachment; filename=<requestId>__<service file name>` (DL-13). The file is read whole from the service and then sent (`fetchRunResultFile` returns the bytes). | Reuses the existing fetch; the largest test file is about 8 MB. |
| DL-B7 | Front end: "Download" fake-link after "Raw Protein TSV" on READY runs only. The overlay (`projPg_Quant_RunResultFiles_Download_Overlay_Component.tsx`) is added to the document body at the click point, kept inside the window, closes on a background click or its Close button, and shows "Loading…" while the list loads. Entries are in the webservice's (download-set) order, each with its label and, below it, the download file name. Each entry is a hidden form POST with target `_blank`, as the project-page scan-file download. | Matches DL-7 / DL-10 and the existing download pattern; an error page opens in a new tab instead of replacing the project page. |
| DL-B8 | Labels: "Peptides — raw (CombinedPeptides.tsv)", "Peptides — normalized, linear", "Peptides — batch-corrected, log2", "Peptides — batch-corrected, de-logged (2^log2)", the same four for "Proteins", and "Protein names (protein_names.tsv)". | As specified for the build. |
| DL-B9 | Cache (DL-9): the run list keeps the file list per requestId in an instance-field `Map` for the life of the page; a second "Download" for that run opens the overlay with it at once (no webservice call). A call still in flight is reused; a failed call is not kept (the next click tries again). | READY is a final status. |
| DL-B10 | Messages in the overlay: status not READY → "No files to download: this quant run is …"; READY with no files → "No files to download: none of the downloadable files exist for this quant run."; a failed call → "Could not get the list of files." (after the standard AJAX error handling). | The run list only shows "Download" on READY runs, so these appear only if the run changed after the list's last status check. |

---

## 19. Mean-variance trend prior (limma-trend; the reference's finding 0006) (maintainer, 2026-10-07) — DECIDED; 0006a + 0006b BUILT 2026-10-07; T-14 BUILT 2026-10-08

Reference: finding 0006 (`scripts/scratch/analysis/differential_abundance.py` `_natural_spline_basis` /
`_fit_f_distribution_prior_trend`, `scripts/scratch/analysis_figures/trend_atpk.py`, `scripts/scratch/de_trend_sensitivity.py`
`pair_relabel_diagnostic`). The reference matched R limma 3.58.1 `eBayes(trend=TRUE)` to about 1e-12.

| ID | Decision | Why |
|---|---|---|
| T-1 | Build all of 0006: the trend option, the prior-SD-vs-abundance chart, the q-with-trend vs q-without chart, the trend volcanoes (the existing volcano with trend results), and the within-pair relabelling check. | The relabelling check is what keeps the trend's extra hits from being over-read; the finding's verdict rests on it. |
| T-2 | Each level's differential-abundance block gets a "Variance prior: constant / mean-variance trend" choice, **default constant**. It applies to the whole block (volcano, p-value histogram, diagnostics). The two new charts always show both priors. | Nothing on the page changes unless the viewer picks the trend; the comparison charts need both fits by definition. |
| T-3 | The relabelling check is drawn in each level's block for that level's quantities (LFQ peptide; LFQ protein; NSAF and PSM count on the spectral level), under the picked prior. | The page is organised by level, unlike the reference's single four-quantity figure. |
| T-4 | The relabelling check is offered only when the chosen covariate forms complete pairs (every covariate value has exactly one reference and one test sample); otherwise a note says why it is not drawn. | Within-pair relabelling is defined only for complete pairs. |
| T-5 | All 2^(P−1) labellings are enumerated exactly up to a cap of 64 (P ≤ 7); above it, a note. No approximation. The refits run in time slices with a progress box (as R4-F2). The real times are measured and reported. | Exact like 4b's nulls; keeps the page usable. |
| T-6 | Verification as the spectral rounds: the reference's code on the page's exports exact (V1); the published 0006 numbers on the reference dataset (V2). The trend's least-squares step is ported as Householder QR, and its difference from numpy's SVD-based `lstsq` is reported, not engineered away. The existing (constant-prior) results must be bit-identical before and after. | Accuracy first; the built-in rule (report, don't replace). |
| T-7 | **Stays in JavaScript; nothing is precomputed at submit.** | Every DE result depends on viewer choices made on the page, the spectral inputs do not exist at submit, and the page's DE already matches the reference to round-off. Measured: a whole comparison on 10,308 peptides ≤ ~40 ms (design doc §4b); the trend adds a small linear pass. Revisit if the measured relabelling time at the cap is too slow, or when results move to the database. |
| T-8 | The residual-SD-vs-abundance chart has **no ring and no labels** on any point; every point has a hover. | The reference's plotting function has an optional highlight that defaults to none; only its driver rings one hard-coded protein (ATPK), which is specific to that study. |
| T-9 | Wherever a chart's own text shows the q threshold ("q < 0.05", "q = 0.05", guide lines), a note **above that chart** says the threshold is a fixed value built into the page for the differential-abundance test, **not** one of the search's filter cutoffs, and does not change with them. The "how computed" note says the same. Applies to the existing volcano too. | Viewers could otherwise read the 0.05 as one of their search filters. |
| T-10 | The spectral level's "LFQ vs spectral counts" block keeps the constant prior whatever the DE block's choice is, and says so in one sentence. | The reference's 0005 comparison uses the constant prior; the choice (T-2) is scoped to the DE block. |
| T-11 | The q-with-vs-without-trend chart's labels are capped (as the volcano's); the chart says how many of the hits are labelled ("N of M hits labelled"), and the cap is listed in the level's "differs from the reference" note. | The reference labels every q < 0.05 hit; a cap keeps a many-hit chart readable. |
| T-12 | `Math.log10` vs numpy: measure in **Chrome** (as R4-F1). If Chrome differs, add a line to the page's `Math.log2` info box with the measured counts; if only Node.js differs, report it with no page change. Never replace the built-in. | The built-in rule; the 10-04 lesson that Node and Chrome differ. |
| T-13 | The residual-SD chart's log y-axis keeps Plotly's default tick labels, though the layout check counts overlapping label boxes (8 on one run's PSM-count chart, 4–6 on some LFQ levels). Not changed unless users complain. | The maintainer looked at the chart (2026-10-07): "not pretty but readable"; not worth the time now. Overlap counts on this axis are expected in the layout checks. |
| T-14 | **The info box at the top of the page becomes one static sentence with no counts** (supersedes the counts in R4-F1 / R4-F3 / R4-B3 / T-12): "Logarithms use the browser's `Math.log2` and `Math.log10`. In our tests they matched numpy's `np.log2` / `np.log10`, or differed only in the last binary digit (about 2 × 10⁻¹⁶ relative) on a small fraction of values; no visible result is affected." **The full check run no longer measures the `Math.log2` / `Math.log10` differences** (maintainer, 2026-10-08). | The differences (1 unit in the last binary digit, where Chrome is the correctly rounded one) change no visible result; the exact counts changed with every round that added calculations, costing a re-measurement and a decision each time, and the measuring adds run time. Nobody reads the counts. The rule itself (use built-ins, never replace them) stays. |

The reference's constant-prior code did not change when the trend was added (reference commits `416cb10` → `612956c`: three
lines touched, none changing a value), so the page's existing results are unaffected.

### Built 2026-10-07 (0006a: T-1 except the relabelling check, T-2, T-6 … T-12)

0006a = the trend option driving the block, the two comparison charts, the trend volcano (the existing volcano with the trend fit) and
the fixed-q notes; the within-pair relabelling check (T-3 … T-5) is 0006b. What was built: design doc §4i. Build choices:

| ID | Choice | Why |
|---|---|---|
| 0006a-B1 | `quantCharts_DA_Compute__Run` takes a REQUIRED `variancePrior` ("CONSTANT" / "TREND"); the result carries `variancePrior`, `meanAbundance` and a prior that is a tagged union (`kind`). The LFQ-vs-spectral block passes "CONSTANT". | One computation path for both priors; required parameter so no caller can silently get a default; the type forces every reader of the prior to handle the trend's per-feature s0². |
| 0006a-B2 | The zero-variance floor moved into one helper used by both priors (same arithmetic; the constant prior's numbers are bit-identical). | The reference shares `_floor_variances`; two copies would drift. |
| 0006a-B3 | The trend's mean abundance is computed once in the DE computation (`meanAbundance`) and the Diagnostics' tercile chart now reads it instead of recomputing (same formula, bit-identical). | The prompt called it "the mean abundance the DE result already carries" — it did not carry one (the terciles computed their own); one source now. |
| 0006a-B4 | Least squares: Householder QR **with column pivoting** in a small module (`quantCharts_LeastSquares.ts`), rank = |R_kk| > eps × max(n, p) × |R_00|; rank-deficient designs give the basic solution (fitted values = numpy's). | T-6 asks for Householder QR with a rank check; pivoting makes the rank check meaningful (the reference's `lstsq` handles a rank-deficient basis, so the port must too). The real spline bases are full rank (4). |
| 0006a-B5 | Both fits are computed on every selection change; switching the prior re-points the picked fit and rebuilds only what it drives (the no-covariate design, Diagnostics, notes). | T-2 (the comparison charts need both); no refit on a switch. Measured cost in the report (≈ 30 ms more on 10k peptides). |
| 0006a-B6 | Refusal texts: the reference's wording adapted to the page ("… takes a single value; a mean-variance trend cannot be fitted (choose the constant variance prior)"); tied knots (where the reference's basis raises) are a refusal naming the knots. A trend refusal under a working constant prior shows one message in place of the two charts. | The page cannot say "use trend=False"; never draw a fit the reference would refuse. |
| 0006a-B7 | q chart labels: at most 10 trend hits by (q, p), grouped with `quantCharts_DA_Compute__GroupCoincident` and placed by the page's volcano method (`quantCharts_Volcano__PlaceLabels`, extracted from the volcano with the same arithmetic). **Course correction (maintainer via the review, 2026-10-07):** no page-own placement fallback and no "moved label" text; overlaps that remain are reported, not fixed. The residual-SD chart's log axis keeps Plotly's default ticks (a custom tick step was removed). | The reference labels every hit (local comparisons have up to ~3,000); 10 = its own largest labelled set. One labelling method on the page. Ticks are layout (§4e). |
| 0006a-B8 | q chart: one shared axis range (the reference's 1.3× limit) on a square plot area; the viridis color bar drawn below the chart; per-point colors computed with matplotlib's indexing (256-color LUT in `quantCharts_Colors`). | The y = x reading needs equal axes (as the log2FC scatter, §4e); Plotly's own Viridis has 10 stops, not matplotlib's 256 colors. |
| 0006a-B9 | Residual-SD chart: features with a residual SD of exactly 0 are left out and counted (key, "How", deviation note); the two prior values go in the key, not beside the axes. | The reference refuses zero SD (log axis); the Diagnostics' residual-SD chart does the same. Values-in-the-key = the §4e precedent. |
| 0006a-B10 | The fixed-q note sits directly above the volcano's KEY (which shows "q < 0.05" and comes before the volcano) and first in the q chart's box; one shared text generator; the "How this is computed" clause is added once, where it says "a hit is q < 0.05". | "Directly above every chart whose text shows the q threshold": the key is the volcano's and shows the threshold first. |
| 0006a-B11 | The two new charts get their own color note and deviation note at the end of their sub-section; the block's existing deviation note is unchanged (and identical under both priors). | Keeps the constant-prior page text unchanged where nothing changed; the new charts' differences are listed next to them. |
| 0006a-B12 | T-10 as built: one sentence at the end of the LFQ-vs-spectral block's "Four full fits" How item ("This block always uses the constant variance prior, whatever is chosen under "Variance prior" in the Differential abundance block."). Nothing else in that block changed. | The item that describes the fits is where the prior applies. |
| 0006a-B13 | T-11 as built: the q chart's key entry and How line say "N of M hits labelled" (generated; "(those with the smallest q)" when capped); the cap is the LAST item of the level's "How these charts differ from the reference QC analysis" note on every level (numbers from `quantCharts_DE_PriorComparison__MAX_LABELS` and the FDR), worded "(when drawn)" so it also stands where a run has no DE block; the cap item was REMOVED from the sub-section's own deviation note (one place, not two). | T-11 names the level's note; repeating it in the sub-section note would say it twice. |
| 0006a-B14 | T-12 as built: `Math.log10` measured on every page call in Chrome (as R4-F1) and in Node on the same arguments; Chrome differs (2,311 of 1,017,211 calls, 1 ulp, Chrome the correctly rounded side), so the `Math.log2` info box gains one sentence with the measured counts (constants in `quantCharts_MathLog2Note.ts`; `Math.log10` / `np.log10` shown as code like the `Math.log2` text). | The built-in rule: report, never replace; the box is where the page already states its logarithms' measured differences. |

### Built 2026-10-07 (0006b: T-3, T-4, T-5 — the within-pair relabelling check)

0006b = the relabelling check in each level's Differential abundance block (T-1's last part); with it finding 0006 is complete. What was
built: design doc §4j. Build choices:

| ID | Choice | Why |
|---|---|---|
| 0006b-B1 | When it is offered: the round-4b pair rule `quantCharts_LfqVsSpectralWithinProtein__PairChoices` is **called unchanged** with the block's choices and selection, and the chosen covariate is looked up in its offered / not-offered lists (the "not drawn" note = the rule's reason, or "no covariate is chosen"). One pair only, and more than 7 pairs (> 64 labellings), are notes too. | T-4: one rule, not two. It already takes the DE block's choices + selection, so no extraction or adaptation was needed. One pair = one labelling, nothing to rank against (the fit itself also refuses a one-valued covariate). |
| 0006b-B2 | Each labelling is fitted by `quantCharts_DA_Compute__Run` itself, given the block's choices with the compare column's values swapped within the swapped pairs (same included samples, features, covariate, picked prior). The observed labelling is refitted too and checked to equal the block's own fit (fatal otherwise). | "The existing compute, not a new fit." The equality check makes any divergence between the check and the block impossible to miss. |
| 0006b-B3 | The R4-F2 time slicing is **extracted** from the component into `quantCharts_TimeSlicedJob` (generation counter, setTimeout 0 between slices of ~50 ms of work, report-then-throw on an exception) and its box into `quantCharts_TimeSlicedProgress`; the per-run agreement block and the check each hold one job. The per-run block's behavior is unchanged (its job state is now `_lvsPrJob`; the §34 driver copy reads it there). | T-5 asks to reuse the R4-F2 pattern, not copy it. |
| 0006b-B4 | The check is (re)started in `_applyPickedPrior` — the one method that a selection change, a prior change and a rebuilt block (measure toggle, new data) all pass through — and the running job is stopped first; unmount stops it. While it runs only the progress box is drawn. | T-5: "stop / restart cleanly"; one restart point, nothing stale can draw. |
| 0006b-B5 | The chart: two house-size Plotly charts one under the other (hits at q < 0.05; π0), one x column (the level's quantity), the reference's `_dodge` spread (step 0.1, shrunk when a tied cluster would be wider than 0.8 — 10 or more tied dots), the reference's "perm p = n/N" / "obs rank r/N" in the x tick label; the key states N, which pair is never swapped, the observed labelling's hits / π0 / min q with their standing and "the smallest attainable p is 1/N"; every dot has a hover. Kept from the reference: the x range of the column and the hit axis's range; a tick at every count up to 6 hits, Plotly's ticks above (the reference's fixed step 2 overlapped 33 labels at 60 hits, measured on fa734de6). | The reference's encodings; layout Plotly's (§4e) except where an all-zero count axis would get fractional / negative ticks. Values in the key = the §4e precedent. |
| 0006b-B6 | Spectral level: one x position, the measure the level's toggle shows (NSAF or PSM count (log2)). | The level's DE block shows one measure at a time; T-3 says "the level's quantities". |
| 0006b-B7 | Ranks on the unrounded values; the reference ranks π0 and min q rounded to 4 decimals. Listed in the level note. | The page has no reason to round before ranking; every compared case gave the same ranks (V1 / V2 / V4). |
| 0006b-B8 | Hits at q < 0.10 are computed (hover, parity checks); the chart shows q < 0.05 only, as the reference's figure. | The reference records both; its figure draws one. |
| 0006b-B9 | T-9: the fixed-q note is the first element of the chart box, directly above the key (which shows "q < 0.05" first) and both charts; the How line has no extra clause (as the q chart's). | The key and the hit axis show the threshold. |
| 0006b-B10 | E: one item appended after the T-11 item of both level notes ("How these charts differ from the reference QC analysis", "(when drawn)"): per level, picked prior only, own pairs, ≤ 64 labellings, the tighter spread, unrounded ranks. | T-3 / T-5 deviations listed where T-11 put the level's DE differences. |
| 0006b-B11 | Pair order = the shared metadata order (the 4b rule's); the reference uses Python `sorted()`. Where they differ the page fixes another pair; the labellings are the same up to swapping every pair at once, which gives the same p-values (checked on a synthetic case with pairs p2 / p9 / p10). | One value order on the page (C2); no second sort. |
| 0006b-B12 | (Superseded by T-14, 2026-10-08: the box has no counts.) The `Math.log2` info box's measured `Math.log10` numbers (T-12 / 0006a-B14) re-measured with 0006b by the full check run and updated: 1,042,091 calls, 2,401 differing in Chrome (the same 340 distinct arguments, all correctly rounded by Chrome), 189,278 in Node.js (were 1,017,211 / 2,311 / 181,300). The relabelling refits call the existing computation, whose −log10 q uses `Math.log10`; nothing of it is drawn. | The box states measured numbers; the full check run compares them with the measurement and flagged the change. |

### Built 2026-10-08 (T-14 — the static info-box sentence, no per-round log measurement)

`quantCharts_MathLog2Note.ts` returns exactly the approved sentence; every measured constant and re-measuring comment is removed; the box
(component, INFO colors, place) is unchanged. The full check script's copy without the `Math.log2` / `Math.log10` measurement steps checks
the box instead (present once, first below any warning box, exactly the sentence and its four code spans). Verified on the live page
(a run with a warning box and one without) and by the full check run (all sections pass in one run). Design doc §4h "Round 4a follow-ups".

## 20. ATPK-style case study (the reference's finding 0007) — submit-time peptide identity map (maintainer, 2026-10-14) — DECIDED; 0007-A BUILT 2026-10-14, 0007-B1 + 0007-B2 BUILT 2026-10-19

Reference: finding 0007 (`scripts/scratch/atpk_case_study.py`, `scripts/scratch/fig_trend_atpk.py`). Its Figure 2 compares, per
peptide, FlashLFQ MS1 intensity with PSM counts. The reference joined the two by hand: `fig_trend_atpk.py:123-128` hard-codes three
ATPK tuples (FlashLFQ id such as `LGELPSWILMR[+15.9949]` ↔ a legacy peptide-table string such as `LGELPSWILM[15.99]R`), and its PSM
counts came from a peptide-table download that is not in its repo.

Limelight facts this rests on (checked 2026-10-14):
- A FlashLFQ peptide row's `Sequence` is Limelight's grouping identity, built only in `FlashLFQ_GroupingIdentity_Common`
  (base sequence + the summed variable and static mod masses, full precision, no positions). A submit is refused for searches with
  open or PSM-level mods, so every PSM of a reported peptide has one identity.
- The Charts view has no mapping from a FlashLFQ peptide row to reported peptides. Nothing produces PSM counts per identity per
  scan file.
- The server can re-derive identity → reported peptide ids from the database at view time
  (`FlashLFQ_Quant_ReDerive_GroupingIdentity_To_ReportedPeptideIds_Service`), but that code is a parallel copy of the submit's
  gathering, not shared: it keeps reported peptides whose mass could not be computed (the submit drops their PSMs) and skips a
  missing sequence (the submit refuses). It also depends on the database still matching what was submitted.

| ID | Decision | Why |
|---|---|---|
| P7-1 | The identity map is **written at submit time**, from the same data and loop that build the FlashLFQ request, sent to the service with the request and stored by the service as a result file. It is **not** re-derived from the database when a run is viewed. | It then describes exactly what FlashLFQ was given; re-deriving later can drift (the two differences above, or later database changes). Nothing is released, so the format can change freely. |
| P7-2 | Contents (option B): for each identity sent, { projectSearchId → reported peptide ids whose PSMs were sent } **and** the PSM count per (identity, searchScanFileId) exactly as sent. A version number in the file. | The Charts view uses the stored counts and can cross-check them against its own filtered PSMs. psmIds are not stored (no feature needs them; several MB). |
| P7-3 | The same file records the reported peptides that were **dropped** at submit (mass could not be computed), with their PSM counts per scan file. | Folds in the deferred "mass-drop manifest follow-up": a dropped peptide is visible instead of silently missing. |
| P7-4 | The file is **not** in the download set. | Internal join data, not a result a user needs. |
| P7-5 | Name and token (chosen by the review): file `peptide_identity_map.json` at the run's top level (next to `params_manifest.json`), allowlist token `peptide-identity-map`, `format_version: 1`. | Request-derived files sit at the top level; the token follows the existing kebab-case tokens. |
| P7-6 | A run without the file: the Charts view shows a note in place of the charts that need it, saying the run predates the file and must be resubmitted to show them. | Old runs keep working for everything else; the reason for the missing charts is stated. |
| P7-7 | After this is built, the full check run moves to runs submitted with the current code for anything that needs the file (resubmitting the test runs). | Old test runs will not have the file. |

| P7-8 | The peptide for the case study is the **grouping identity** (PSMs pooled over every reported peptide that maps to it). | The only unit both sides measure: FlashLFQ gives one intensity per identity, so a finer unit (reported peptide, positional form) has no intensity of its own; a coarser one (base sequence) merges the oxidized and unmodified forms, which is exactly the split the reference's finding is about. |
| P7-9 | The full check run moves to runs resubmitted with the current code (all sections re-baselined, phase 0007-C). One old run (`a0ec0906…`, old output format) stays as the "predates the file" case and keeps the old-format coverage. | Chosen by the review at the maintainer's request; supersedes P7-7's wording. |
| P7-10 | The stale comment in `FlashLFQ_Run_GatherPsms_And_SendRequest_Service.java` (says static mods are not part of the identity) is fixed in the submit-side prompt. | Same code as the change. |
| P7-11 | Phasing: **0007-A** submit + service write the file, the webapp serves it by token, contract doc updated, then the maintainer resubmits the test runs; **0007-B** the Charts view reads the file and draws the two figures; **0007-C** the full check run is re-baselined on the new runs. | Each phase verifiable on its own. |

Figures (maintainer, 2026-10-14): the reference's two — per-pair change by quantity (LFQ protein, NSAF, PSM count) and the
protein's peptides (MS1 intensity vs PSM count).

| ID | Decision | Why |
|---|---|---|
| P7-12 | (maintainer, 2026-10-14) The viewer picks the protein **both** ways: by **clicking** a point on a protein-level volcano, and with a **search box** (type part of a protein name or accession; matching proteins of this run are listed; picking one draws the two figures). Review defaults, to confirm when 0007-B is designed: clicking works on the protein-level volcanoes (LFQ proteins; spectral NSAF / PSM count), and their hover gains a line saying a click shows the protein's charts; the search lists the same names the volcano hover shows. | Clicking is quick for labelled / outlying points; most proteins sit in a dense cloud near q = 1 that is hard to click, so the search box is the dependable route. The volcanoes have a hover with the protein names but no click handling today. |
| P7-13 | (maintainer, 2026-10-14) The map is built by the **webapp** (Java), as P7-1 says — not by the flashlfq service from the request it receives (a review suggestion, declined). The service only checks it is a JSON object with a version, stores it and serves it. | When quant data moves to other storage, the webapp writes it there and the service drops out; and business logic stays out of the Python service. |
| P7-14 | (maintainer, 2026-10-14) The service's `OUTPUTS_VERSION` goes **2 → 3** (the new file), and the Charts view's expected outputs version goes to 3 with it. **Consequence (accepted): every run made before this shows only the "older version of the quant service, re-run" message on the Charts view — all charts, not only the new ones.** Supersedes P7-6 (no run with outputs version 3 lacks the map, so the per-chart "predates the file" note is not needed) and P7-9's "predates the file" case (an old run is now the "older version" case). | Still in development; move forward requiring the latest data. |
| P7-15 | (maintainer, 2026-10-14) The map is a **required** field of the run request: the service refuses (400) a request without it. | A webapp / service version mismatch fails loudly instead of producing runs without the map. |
| P7-16 | (maintainer, 2026-10-19) Figure 2 shows **one peptide at a time**: a Limelight DataTable lists every peptide of the picked protein with its numbers (identity, shared, complete pairs, mean within-pair LFQ change, Σ PSMs control → treated, PSM direction); the selected row's peptide is drawn as ONE Plotly figure with 2 subplots (LFQ intensity above PSM count), redrawn in place when another row is selected. Figure 1 is ONE Plotly figure with 3 subplots. The block therefore adds a fixed 2 figures / 5 subplots whatever the protein. May change later. | Many Plotly charts or subplots choke the DOM; the table carries the per-peptide comparison. |
| P7-17 | (maintainer, 2026-10-19) The peptide identity map is **stored gzip-compressed** by the flashlfq service (`peptide_identity_map.json.gz`, written once at request time; the service only compresses — no other logic) and **served compressed**. The webapp relay uses the existing pattern: `RestControllerUtils__Request_Accept_GZip_Response_Set_GZip` (`does_HttpServletRequest_Accept_GZip` → `set_GZIP_On_HttpServletResponse`, i.e. `Content-Encoding: gzip`), and when the browser does NOT accept gzip it unzips with `GUNzip_ByteArray_To_ByteArray` and returns plain JSON — exactly as `ScanFile_PeakIntensityBinnedOn_RT_MZ_JSON__From_SpectralStorageSystem_For_ProjectScanFileId_RestWebserviceController` does (~:151-167). The browser decompresses transparently. Built with phase 0007-B. **Built 2026-10-19 (phase 0007-B1):** service writes / serves the `.json.gz` (level 6, header mtime 0; `OUTPUTS_VERSION` 4); the webapp relay checks the gzip magic (else 500) and gzips / unzips per `Accept-Encoding` as above; the Charts view expects outputs version 4. | Measured 2026-10-14 on an 8-file run: 19,958,824 → 1,221,745 bytes (gzip default level, about 16x smaller, about 0.1 s); compressed once at generation instead of on every request. Other files: quant_pages_TODO.md §5. |
| P7-18 | (maintainer, 2026-10-19 — the review's recommendations accepted) 0007-B design: (1) a new block on the **Spectral counts level** after the within-protein block (needs NSAF / PSM, so only once spectral counts are shown); the picked protein is held by the Charts view and passed to that level; a click on a point of the Proteins-level LFQ volcano or of the spectral NSAF / PSM volcano picks it (a Proteins-volcano click before spectral counts are loaded shows a message to load them); the search box per P7-12. (2) Pickable proteins = those with all three DE results (complete in LFQ, NSAF and PSM count — the LFQ-vs-spectral common set). (3) Pairs from the within-protein block's pair picker (the same choice); none picked → a note to pick a pair column. (4) log2FC / q from the spectral level's DE selection under its **Variance prior** choice; the subtitle names the prior. (5) Peptides = every peptide row whose protein group includes the protein's psvid; shared peptides included and marked; sorted and labelled by the identity string verbatim (no modification naming, no mass logic). (6) Partly complete pairs: draw the points that exist, a pair's line only when both ends exist; direction texts count complete pairs; a note gives the missing cells by FlashLFQ detection type (generalising the reference's "6/8 MSMSAmbiguousPeakfinding"). (7) A PSM count of 0 is not drawn on the log axis; the subtitle says how many pairs were not drawn; Σ totals include it. (8) The map is fetched only on the first protein pick, cached per run, indexed once. Kept from the reference: the equal-log2-span rule (panels / rows), the subtitle and direction-text templates (numbers formatted as the reference: U+2212 minus, q 3 dp below 0.1 else 2). Peptide intensities: the page's log2(normalized + 1) (differs from the reference's log2(raw) + median offset by < 2e-5 log2 above 1e5). Existing outputs-version-3 runs with an uncompressed map are NOT supported (the maintainer deletes them; P7-17). | The reference's figures are ATPK-specific (hard-coded peptides and pairs; partial pairs and zero counts raise); these rules generalise them to any protein on the page's own settings. |
| P7-19 | (maintainer, 2026-10-19) A peptide not in the service's median-normalized peptide file (that file keeps only peptides quantified in every run) gets **no LFQ points** in Figure 2 — option (a); the front end does NOT reconstruct normalized values (no reimplementing the service's normalization). Its LFQ panel note reads, e.g., "not in the median-normalized file (it keeps only peptides quantified in every run) · FlashLFQ: 2 MSMS (measured), 6 MSMSAmbiguousPeakfinding" — the paired runs counted per FlashLFQ detection type (raw peptide file), "(measured)" after a type whose runs have a raw intensity > 0. **Order (maintainer, 2026-10-19): the most useful first** — the measured entries first, then the rest; within each, larger count first; ties by type name — so ATPK's unmodified peptide reads "… · FlashLFQ: 2 MSMS (measured), 6 MSMSAmbiguousPeakfinding". Replaces the built "no LFQ value in N/M runs: …" text (inaccurate: FlashLFQ did measure the MSMS runs). **BUILT 2026-10-19:** `quantCharts_ProteinCaseStudy__PeptideRows` takes the raw peptide matrix and records per paired run without an LFQ value its detection type and whether its raw intensity is > 0 (a type split into measured / not-measured runs gives two entries); `quantCharts_ProteinCaseStudy__Figure2` writes the note for a peptide not in the median-normalized file; observed on ATPK's `LGELPSWILMR[+0.0]` (run 87d27dbf…): "not in the median-normalized file (it keeps only peptides quantified in every run) · FlashLFQ: 2 MSMS (measured), 6 MSMSAmbiguousPeakfinding" (raw file: MSMS > 0 in 2 runs, MSMSAmbiguousPeakfinding 0 in 6). A peptide IN that file with a missing paired value cannot occur (complete-case) and keeps the generic "no LFQ value in N/M runs" note. Also: the selected DataTable row is not highlighted (highlighting rebuilds the table and resets it to page 1); Figure 2's title names the selected peptide — accepted as is. | The maintainer does not want the front end reimplementing logic from elsewhere; the note says exactly why the points are missing. |
| P7-20 | (maintainer, 2026-10-22, after using the page) The case study's protein search: (1) the match list offers ONLY proteins that can be shown (in all three of the picked prior's full fits: LFQ protein, NSAF, PSM count — the P7-18 (2) common set for the spectral level's CURRENT comparison); a note under the input says so, with "N of M" counts; when the text matches only proteins that cannot be shown, the page says how many matched and why none is listed (not "no match"). (2) A pick — from the list OR a volcano click — HIDES the match list; the typed text stays in the box. (3) A "Search" button right of the input, and the Enter key, show the list again for the current text (typing still shows it, as before). (4) After a pick, if the added content starts below the visible part of the page, scroll just enough to bring its top into view; no scroll when it is already visible. The "cannot be shown" message stays for volcano clicks (a point on one volcano can be missing from another quantity's test). | Keep listing every protein of the run (P7-18 (2) as built). | Listing proteins that cannot be shown wastes the viewer's click; the result of a pick was below the list and often out of view. Filtering is cheap (one set intersection per fit change). Process (maintainer): build and test directly, maintainer reviews on the page BEFORE any check-suite work. |
| P7-20b | (maintainer, 2026-10-22, after the first P7-20 build) Refinements: (1) the scroll after a list pick targets Figure 1's top (if it starts below the visible window, scroll just enough to show it; no scroll when already visible) — the first build's trigger (the block content's top) almost never fired; (2) no scroll after a volcano click (the viewer is looking at the clicked chart); (3) the internal `psvid_<n>` id is dropped from the searched text (never shown in the list; it made short queries such as "d" match every protein). | Keep the first build's trigger; scroll on volcano clicks; keep the id searchable. | What the viewer wants to see is the drawn data; the id is internal. |
| P7-21b | (maintainer, 2026-10-22, after using the round-2 build) (1) In BOTH blocks, when the "Pair samples by" select is at "none" (two or more qualifying columns), a red "Select an option" appears to the right of the select (color = a named entry in the page's colors file); the line "Choose how to pair samples to draw these charts" is KEPT as well. (2) The upper block's "How this is computed" and deviation boxes stay as built in round 2 (only the pair-related items hidden when unpaired): charts 3 and 4 a + c are drawn without pairs and keep their explanation. (3) The case study's typed search text is held by the Charts view (like the pick and the case study's pair choice), so it survives a comparison change that rebuilds the block. | Hide both boxes in the upper block when unpaired (would remove the explanation of charts that ARE drawn); replace the "Choose …" line with the red text; let the search text clear. | A visible cue at the control itself; nothing the viewer entered resets unexpectedly. |
| P7-21 | (maintainer, 2026-10-22, after using the page) **Pair column: no dead ends, each block self-contained.** Applies to BOTH the "LFQ vs spectral counts: detection and within-protein tracking" block and the "Protein case study" block, each deciding INDEPENDENTLY (the case study no longer reads the block above's choice — replaces P7-18 (3)). A column qualifies as pairs for the current comparison when each of its values holds exactly one sample of each compared level (the existing rule). Exactly ONE qualifying column → used automatically, no select. NONE → one short sentence saying why (each column's reason), and the block's other text ("How this is computed", deviation notes, etc.) is hidden because nothing is drawn. TWO OR MORE → a select in that block, starting at "none", with one line "Choose how to pair samples to draw these charts", and no other text until something is drawn. | Keep a "Pair samples by" select defaulting to "none" in the upper block and point the case study at it (as built). | The select was effectively an on/off switch with nothing else to choose; "none" left a block of text explaining charts that were not drawn, and the case study showed only a pointer to another block. |

Future option (maintainer, 2026-10-19, NOT to implement now): the QC page avoids DOM / WebGL limits by drawing each Plotly chart off-screen (to the left, out of view), capturing it as a PNG and showing the image; clicking the image replaces it with the interactive plot. Mainly for WebGL context limits, but it also helps with SVG. A candidate if the Charts view's number of plots becomes a problem.

Built 2026-10-14 (phase 0007-A; the service side first): the webapp builds the map at submit in `FlashLFQ_PeptideIdentityMap_Builder`
(one pure static method, from exactly the PSMs sent after the mapped-scan-file filter, plus the reported peptides dropped because their
mass could not be computed, kept for the mapped scan files only), checks the contract's invariants before sending (a violation fails
the submit), and sends it as the required request field. The Charts view's result-file webservice relays it (token
`peptide-identity-map`, `application/json`); it is not in the download set. The Charts view expects outputs version 3, so every older
run shows only the "re-run" message. "A reported peptide has one identity" holds per search (`project_search_id`,
`reported_peptide_id`) — reported peptide ids are shared by searches and the identity includes each search's static mods; the
contract's invariant now says so. Checked on a saved 8-scan-file request without submitting (33,358 identities; per-file counts
equal the run's manifest; every FlashLFQ peptide row is an identity) and live on the service's replay run. Review-verified, including
a run the maintainer submitted from the UI with this code (2026-10-19): the stored map equals the request field and a recount from its
481,426 PSMs, every invariant holds, nothing dropped, and the ATPK peptides' PSM counts per pair match the reference's finding 0007.
Built 2026-10-19 (phase 0007-B1): P7-17's compressed storage and relay; the Charts view expects outputs version 4 (see P7-17).

Built 2026-10-19 (phase 0007-B2; design doc section 4k): the Spectral counts level's "Protein case study: LFQ vs spectral counts" block.
- P7-12: the pick by a click on the Proteins-level LFQ volcano or the spectral NSAF / PSM volcano (their hover gains the click line) and by a
  search box (names, descriptions, Protein Groups text; at most 20 matches); held by the Charts view. A Proteins-volcano click while spectral
  counts are not shown puts a message next to that volcano (no auto-load).
- P7-16: the block adds exactly two Plotly figures (Figure 1: 3 subplots; Figure 2: 2 subplots, redrawn in place per selected row) and one
  DataTable (observed: +2 figures after a pick, one table, also for a protein with 155 peptides).
- P7-18 (1)-(8) as decided; the trend fits are computed by the block only when that prior is picked, once per comparison; the map is fetched
  on the first pick only (observed: one request over every pick, 1,218,910 bytes) and validated against the contract.
- Found while building (decided: P7-19, option (a); its note BUILT 2026-10-19): the service's median-normalized peptide file is complete-case, so "the page's
  log2(normalized + 1)" has NO value for a peptide not quantified in every run -- such a peptide shows no LFQ point (with the detection-type
  note), and a partly complete LFQ pair cannot occur on current runs. The reference drew those runs from log2(raw) + the run's median offset.
- The selected peptide is named in Figure 2's title; the table row is not highlighted (rebuilding the table object resets it to page 1).
Next: 0007-C (re-baseline the full check run).

## 21. FlashLFQ match-between-runs is not repeatable with several threads; thread count setting (maintainer, 2026-10-14) — SERVICE SETTING BUILT; PAGE TEXT BUILT 2026-10-14

What was seen (2026-10-14, local service):
- The same quant request submitted twice through the UI (identical `flashlfq_identifications.tsv`, same FlashLFQ parameters,
  FlashLFQ's default thread count) gave different `QuantifiedPeptides.tsv`: 2,526 of 266,864 intensity cells, every one a
  match-between-runs (MBR) cell present in one run and absent in the other. Every MS/MS cell, and every value present in both
  runs, was identical. Downstream, the complete-case feature counts after normalization changed (peptides 10,341 vs 10,365,
  proteins 1,815 vs 1,817), so every chart built on them can differ slightly between two submits of the same thing.
- The same request run twice with one FlashLFQ thread (`--thr 1`) gave byte-identical output (every result file; only the
  settings file's own paths and its unused `RandomSeed` differed). That is what these two runs show, not a proof.
- Cost: the FlashLFQ step took about 900 s with one thread vs about 280 s with the default (8 scan files), about 3.2×.
- Likely cause (inferred, consistent with only MBR cells changing): FlashLFQ (mzLib `FlashLfqEngine.cs`) runs its MBR loop
  in parallel with `MaxThreads` workers; the default is the processor count minus one.

| ID | Decision | Why |
|---|---|---|
| MBR-1 | The service reads an optional `FLASHLFQ_THREADS` environment variable (`.env`). **No default**: unset or empty → `--thr` is not passed and FlashLFQ uses its own default; a positive integer → `--thr <n>`; anything else → the service refuses to start. Mapped in both compose files, documented in `env_sample` and the README. | The thread count is a deployment choice (speed vs repeatable MBR), not a per-request option. |
| MBR-2 | Local `.env`: the setting is present but **commented out**, with a comment that `1` gives repeatable MBR results but a slower FlashLFQ step. | The maintainer's choice for now: keep FlashLFQ's default speed; the switch is documented where it is set. |
| MBR-3 | The finding is recorded here; the page text about MBR repeatability is still open (whether to always warn, or only for runs made with more than one thread, which needs the thread count recorded per run). | Viewers of MBR values should know two submits of the same request can differ. |

Built 2026-10-14 (flashlfq service, uncommitted): `app/config.py` (`FLASHLFQ_THREADS` parsing), `app/flashlfq_command.py`
(`--thr` only when set), `start_service.py` (refuses to start on an invalid value), both compose files, `env_sample`, README.
A server deployment needs its own compose file to map the variable before setting it has any effect.

### Page text (maintainer, 2026-10-14) — DECIDED; BUILT 2026-10-14 (settles MBR-3)

The run's manifest records the thread setting per run (service, 2026-10-14): `"flashlfq_threads"` = the integer passed as
`--thr`, or `null` when it was not passed (FlashLFQ's default). Runs made before that have no key (they used FlashLFQ's
default).

| ID | Decision | Why |
|---|---|---|
| MBR-4 | The Charts view **always** shows one MBR-repeatability box, directly above the `Math.log2` info box. | Prominent and in one known place, for every run. |
| MBR-5 | It starts with a lead line that depends on the run, then a blank line, then the generic message. Lead lines: **MBR not used** (MBR off, a PER_FILE run, or a single scan file — the existing MBR explanation's cases) → "Match-between-runs (MBR) was not used for this run, so the note below does not apply to it." (this wins over the thread count); else **`flashlfq_threads` = 1** → "This run used one FlashLFQ thread: in our test, the same request gave identical MBR values when submitted again."; otherwise (`null`, a number above 1, the key missing, or not knowable) → no lead line. | The viewer learns first whether the note concerns this run. |
| MBR-6 | Generic message, always: "When FlashLFQ runs with more than one thread, its match-between-runs is not repeatable: submitting the same scan files with the same settings again can give a slightly different set of MBR values (some appear in one submit and not the other). Values from MS/MS identifications are not affected." | Cautious wording (maintainer): one test showed repeatability with one thread, about 1% of cells differed with several; "can", not "will". |
| MBR-7 | **Warning colors** when the generic message applies to the run (MBR used and the thread count not 1, including `null` / missing / not knowable); the **info colors** otherwise (MBR not used, or one thread). | Prominent where it matters, no false alarm where it does not. |

Built 2026-10-14 (webapp front end): `params_manifest.json` `flashlfq_threads` parsed into three states kept apart — key absent / `null`
/ a positive integer; anything else present is fatal (`quantCharts_RunOutputs_Gating.ts`, `QuantCharts_RunOutputs__FlashLfqThreads`,
validated at every outputs version). The MBR-not-used classification is now one shared function, `quantCharts_MbrExplanation__MbrCase`
(the MBR explanation calls it too; its output is unchanged). Text, lead line and style in one pure function
(`quantCharts_MbrRepeatabilityNote.ts`, `quantCharts_MbrRepeatabilityNote__Build`); the box is `quantCharts_MbrRepeatabilityNote_Component.tsx`
(the `Math.log2` box's geometry; existing color tokens, no new colors), rendered in the Charts view between the warning boxes and the
`Math.log2` box. Checked: unit tests on every case (MBR off / PER_FILE / single scan file × thread values; MBR used × 1 / 4 / `null` / absent;
no manifest; no MBR fields; the parser's accepted and fatal values); on the live page, the three local runs that exist — two 8-file JOINT
runs with MBR on (`flashlfq_threads` `null`, and the key absent: no lead line, WARNING) and the one-scan-file run ("not used" lead line,
blank line, INFO). No local run had MBR off, PER_FILE or one thread, so those cases are checked by the unit tests only. Design doc section 2.

| ID | Decision | Why |
|---|---|---|
| MBR-8 | (maintainer, 2026-10-14) Drop the sentence "MBR results can differ slightly if the same quant is run again." from the "About match-between-runs (MBR)" box (`quantCharts_MbrExplanation.ts`). BUILT 2026-10-14 (phase 0007-A): the sentence is removed; checked live on a version-3 run. | The MBR-repeatability box says this properly, directly above; the old sentence is also imprecise for one-thread runs. |

## 22. Check-harness tolerance for one q-value in the within-pair relabelling check (finding S2-F1) (maintainer, 2026-10-20) — DECIDED; BUILT 2026-10-20 (test harness only)

What was seen (2026-10-20, phase 0007-C2, local test run with a real `pair` metadata column, 8 scan files, JOINT):
- The relabelling check's independent parity test (the reference's own relabelling diagnostic on the same inputs) compares the page's
  unrounded q-values with the reference's at a relative limit of 1e-9. One comparison exceeded it: proteins level, pair P941_942 vs
  P905_906 with covariate `condition`, TREND prior, minimum unrounded q = 4.771214167750189e-55 (page) vs 4.771214162173698e-55
  (reference), relative difference 1.17e-9. The design has one residual degree of freedom.
- Everything else about that comparison agreed: hits, pi0, the q-value at 4 decimals, and the standing. Every other comparison of the
  check (all runs, levels, contrasts and both priors) stayed within 1e-9. The difference was identical in three repeated runs.
- The cause was NOT investigated (maintainer's choice). Most likely explanation (assumption, not verified): at q ≈ 5e-55 a moderated t
  with one residual degree of freedom is in the far tail, where last-digit differences in the trend prior (its fitted prior degrees of
  freedom / variance) are amplified into a ~1e-9 relative change of the q-value.

| ID | Decision | Why |
|---|---|---|
| S2F1-1 | ACCEPT the difference. In the check harness only (no page change), this one comparison may differ by a relative 1e-8; it is keyed on all its identifiers (run, level, the two compared pairs, the covariate, the prior, the unrounded-q quantity) and applies to nothing else. Every other comparison keeps 1e-9; hits, pi0, the 4-decimal q and the standing stay exact. | The displayed results are unaffected, and the size of the difference matches a known numerical sensitivity rather than a logic error. |
| S2F1-2 | Never a silent pass: whenever this comparison's relative difference is above 1e-9, the check prints the page value, the reference value, the relative difference and "ACCEPTED (maintainer 2026-10-20, S2-F1: cause not investigated; 1-residual-df design, q ≈ 5e-55)". Self-tests prove a 2e-8 difference in this comparison still fails, and the same 1.17e-9 difference in any other comparison fails. | Built-in numeric differences are reported, not hidden; the exception must stay narrow. |

## 23. Next phase after 0007-C: several covariates and continuous covariates (maintainer, 2026-10-21) — DECIDED; BUILT 2026-10-22 (Phase 6)

Context: after phase 0007-C the maintainer chose among the items deferred in §17. Phase 6 ("several covariates at once; a continuous
covariate") was picked as the most straightforward: the reference's `differential_abundance()` already takes a list of covariates and a
`categorical` list, and treats a numeric column as a continuous slope unless it is named in `categorical`, warning when a numeric column has
5 or fewer distinct values (`scripts/scratch/analysis/differential_abundance.py` in the reference repo: `covariates` / `categorical` arguments,
the per-column term builder and `_LOW_CARDINALITY_NUMERIC = 5`). It replaces DE-one-cov (§8) once built.

| ID | Decision | Alternatives | Why |
|---|---|---|---|
| COV-1 | **Several covariates at once**, chosen on the page (page session only, as DE-D2). **No fixed cap** on how many: the existing exact full-rank check and the residual-df refusals decide what cannot be fitted, with messages saying why. | A fixed cap (e.g. 3). | The existing refusals already block designs that cannot be fitted; a cap would add an arbitrary limit. |
| COV-2 | **A continuous covariate is allowed, but categorical stays the DEFAULT** for every column, numeric-looking or not. The viewer can switch an eligible (all-numeric) covariate column to "continuous (slope)". When it is continuous and has 5 or fewer distinct values among the included samples, the page shows the reference's low-cardinality warning. | (a) The reference's default: numeric columns are slopes unless declared categorical. | Sample sheets often code batch or pair as 1 / 2 / 3; a slope default would silently fit them wrongly. The warning keeps the reference's safeguard for the opt-in case. |
| COV-status | Read-only investigation DONE 2026-10-21 (main claude; review-verified). Build in two parts: A = product + unit + invariance proof, B = check-suite copies + full rerun + docs. | — | Same workflow as earlier phases. |

**Answers to the investigation's open questions (maintainer, 2026-10-21).** Numbers are the investigation's Q1–Q29.

| ID | Decision | Alternatives | Why |
|---|---|---|---|
| COV-Q1 | A metadata column with a DIFFERENT value for every sample (left out of every picker today, rule C1 of §12) is offered as a covariate when all its values are plain numbers, **as a continuous slope only** (never as groups). Non-numeric such columns stay out. | Keep them out (then no real run can test a continuous covariate); offer them with both modes (as groups they make one group per sample, which cannot be fitted). | Run order, age or load are exactly this kind of column; as groups they are meaningless. |
| COV-Q2 | Whether a column may be continuous is decided over **all quantified samples** (a property of the column). | Over the included samples only. | The option does not appear and disappear as the comparison changes. |
| COV-Q3 | Model terms are always in **metadata-column order** (intercept, compared column, covariates in ascending column order), whatever order the viewer ticks them in. | Tick order (the reference uses the order it is given). | Deterministic results; the one-covariate case stays exactly as today. |
| COV-Q4 | One "plain number" rule everywhere (the existing metadata-values rule), for eligibility and for the deviation note. | The deviation note's current `Number()`-based test (accepts hex/binary literals). | One rule; no surprises. |
| COV-Q5 | **Exact rank check for continuous terms:** per continuous column, find the largest number of digits after the decimal point (k), shift every value's decimal point right by k with zero padding, parse the digits with BigInt, and run the existing exact (BigInt, no tolerance) check on X'X built from those integers. The fit itself still uses ordinary double values. Values written in **exponent notation make the column not eligible** as a slope for now (to be added when requested). | Exact on the doubles; a floating-point tolerance; the reference's behaviour (refuse only when the inverse fails). | Scaling a column by 10^k never changes whether a design can be fitted, so the check is exact for the values as typed; it runs once per selection on a tiny matrix, so BigInt costs nothing noticeable. |
| COV-Q6 | A column is **not eligible as a slope** (with the reason shown) if any value has more than **15 significant digits** or **|value| ≥ 1e100**. | Refuse at fit time; ignore. | Within 15 significant digits two different decimals never become the same double and a non-zero value never becomes 0, so the exact check (on the typed decimals) and the fit (on doubles) see the same design; the magnitude limit keeps X'X finite. |
| COV-Q7 | The low-cardinality count is over distinct NUMBERS ("1" and "1.0" count once), among the included samples. | Distinct strings. | As the reference (`np.unique` on floats). |
| COV-Q8 | When a continuous covariate is used, "How this is computed" says that "1" and "1.0" are different groups but the same value as a slope. | Say nothing. | Transparency. |
| COV-Q9 | The low-cardinality warning **informs only**; the fit still runs. Shown in a warning box under the covariate controls (also when the fit is refused) and in "How this is computed". | Block the fit. | As the reference (it warns and proceeds). |
| COV-Q10 | UI: a checkbox row (one per offered column, column order) replaces the single covariate select; a ticked eligible column gets an "as groups / as a continuous slope" choice; continuous-only columns are marked as such. | Add/remove dropdown rows; a multi-select list. | Several covariates with a per-column mode in one compact control. |
| COV-Q11 | Changing the COMPARED column resets the covariates to the default (the batch column), as today. | Keep the ticked set. | Today's rule; simple. |
| COV-Q12 | In existing messages, only the clauses that point to the old control (`Choose "none" …`, "choose it as the covariate") are reworded; every other sentence stays verbatim. Each changed text is listed as an explained difference in the checks. | Keep every text verbatim (then the hints name a control that no longer exists). | Accurate texts with an exact, reviewable list of what changed. |
| COV-Q13 | Diagnostics "p-values by design" (and residual SD) with several covariates: **all ticked covariates vs none.** With one covariate this is exactly today's chart. | Each covariate alone + none (closest to the reference's figure, but k+1 extra fits and new colors); leave-one-out; nested. | No new fits or colors; identical to today for one covariate. |
| COV-Q14 | The within-pair relabelling check is offered **only when the pair column is the ONLY covariate** (today's behaviour and the reference's design, which hard-codes one pair covariate). With other covariates ticked it is not offered, and the page says why, naming them. The page text says how the check is computed and exactly when it is offered. | Offer it whenever exactly one ticked categorical covariate forms pairs, keeping the other covariates in every refit (a design the reference does not define). | Stays verifiable against the reference's own code. (Review recommendation; the maintainer deferred the statistical choice to it.) |
| COV-Q15–Q22 | Result carries a list of covariates (the single-covariate fields are dropped); covariate-term statistics are not shown; no restriction on the LFQ-vs-spectral block (its cache key covers every covariate and mode); the protein case-study subtitle uses the shared model text; values shown as typed; a column with a blank for any quantified sample is still not offered; no cap and no extra UI for many covariates; an unticked and re-ticked column comes back as groups. | See the investigation report. | Investigation recommendations, accepted. |
| COV-Q23 | Test data: test columns injected in memory for most live cases, plus ONE new real quant run submitted by the maintainer (the pair-run setup plus four test metadata columns), because no existing run has a decimal column or a fittable two- or three-covariate design. | Only in-memory columns; only synthetic unit data. | End-to-end proof of the decimal parsing and exact check. |
| COV-Q24–Q26 | Check-suite tag `rerunall_cov6` (must not start with `rerunall_0007c`); the reference-parity checker compares term names in design order; "the page refuses, the reference did not" on an exactly dependent decimal design is an EXPLAINED line, never a silent pass. | — | Harness details, accepted. |
| COV-Q27 | Proof that nothing changed: every number for every existing selection (no covariate, or one categorical) stays **bit-identical under both priors**, against the maintainer's snapshot; texts may change only per COV-Q12's list. | Numbers under the constant prior only; texts identical. | The strongest available guarantee. |
| COV-Q28–Q29 | Selections the UI cannot produce (duplicate covariate, covariate = compared column, non-canonical order) are fatal errors; color-note wording changes "chosen" to "ticked" only where it refers to the control. | — | Accepted. |
| COV-QA | (maintainer, during the build) In the 15-significant-digit rule, **trailing zeros count** ("1.5000000000000000" and a 16-digit whole number are not eligible as a slope). Without exponent notation, a value within 15 digits can never reach 1e100, so the page states the limits as they actually apply rather than a limit that cannot trigger. | Strip trailing zeros before counting (then the 1e100 limit becomes reachable). | Simplest rule to state; the rejected values essentially never occur in sample sheets. |
| COV-QB | (maintainer, during the build) An extra slope-eligibility rule: a **non-zero value smaller than 1e-100 in size** makes the column not eligible as a slope (reason shown). | Only the COV-Q6 rules. | Closes a gap in COV-Q6: a plain decimal with many leading zeros has few significant digits but becomes 0 as a double, so the exact check and the fit would see different designs. |
| COV-QC | (maintainer, during the build) The new test run's metadata file carries two extra test columns beyond COV-Q23's four: one in exponent notation and one with 16 significant digits. Both repeat values, so they are groups-only columns showing their "not a slope" reason end to end. | Only the four columns. | End-to-end tests of both ineligibility reasons. |
| COV-QD | (maintainer, during the build) For COV-Q14, the pair column must be the only covariate AND be ticked **as groups**; ticked as a slope, the relabelling check is not offered and the page says why. | Offer it whatever the pair column's mode. | Today's check and the reference treat the pair column as groups. |
| COV-HDR | (maintainer, during the build) **Sample-sheet column headers must be unique.** The quant submit's upload fails, with a message naming the clashing columns, when two header names are equal after trimming spaces and ignoring case (the same rule as the scan-filename uniqueness check), column 0's header included. The rule is stated in the upload instructions on the page. ONE shared function decides header uniqueness; the Charts view calls the same function on a stored run's headers and treats a duplicate as a fatal error. | Allow duplicate headers and code around them in the pickers; a separate check on display. | Duplicate names make the covariate / batch pickers and the remembered viewer choice ambiguous. One shared function keeps submit and display from diverging. Runs stored before this rule all have unique headers (one server run at the time). |
| COV-PA1 | (maintainer, review of build part A) The new "How this is computed" and "Differences from the reference" items about covariates, the fit check and the relabelling check are shown for EVERY selection, including no covariate or one categorical covariate (beyond COV-Q12's hint-only rewording). Each is on the explained-difference list. | Show them only when a new feature is in use. | COV-TEXT: the reviewer must see every choice made. |
| COV-PA2 | (maintainer, review of build part A) Corrected wording of the slope limits' purpose: within the limits two different typed numbers never become the same double-precision number and no non-zero value becomes 0; the fit check uses the typed values exactly, while the fit uses doubles, which can round away an exact relation between columns, so the page refuses any design that is exactly dependent in the typed values. (The first wording said the check and the fit "see the same design", which is not true for exact linear relations such as 0.1 + 0.2 = 0.3.) | — | Accuracy of the page text. |
| COV-PA3 | (maintainer, review of build part A) Layout accepted as built: the covariate checkboxes sit inline in the existing control row; no "none" text when nothing is ticked; a column's "not a slope" reason shows when it is ticked, and "How this is computed" lists every column's status. | A separate row (the investigation's proposal). | Looked fine on the page. |
| COV-QE | (maintainer, review of build part B) In the reference-parity check on the new test run, 6 comparisons exceeded the effect limit (|page − reference| / SE ≤ 1e-12), at 1.02e-12 to 1.34e-12 (largest absolute difference 7.2e-13); every other criterion was within its limit. All 6 are in the only two designs with TWO continuous slopes (run order and load), which are poorly conditioned (cond(X) ≈ 9e2 and 1.4e3, computed by the check harness; ≈ 3–10 for every other design) because slope values are used raw, as the reference does. ACCEPTED as a narrow, printed exception (like S2-F1, §22): in the check harness only, these 6 comparisons, keyed on all their identifiers, may reach 1e-11; each prints its ratio and "ACCEPTED (Q-E)". The t-scale criterion of one of the same 6 comparisons (t1 check, proteins, constant prior; 1.03e-12) is accepted under the same key, only while every feature with |t| > 1 still meets 1e-12. Anything else, or anything above 1e-11, still fails. Cause not investigated further (assumption: round-off in two different least-squares solvers grows with cond(X)). | Scale the limit by cond(X) for every case; keep them as failures. | Displayed results unaffected; the exception stays narrow and visible. |
| COV-PB1 | (maintainer, review of build part B) The relabelling check's level note "for the comparison and covariate chosen" says "ticked" instead of "chosen", like the other control texts (COV-Q29). The §23 heading change to "BUILT 2026-10-22" made by the build is kept. | — | Consistent wording; accurate status. |
| COV-TEXT | (maintainer) As in every earlier block, the page states in its "How this is computed" text **every choice made**: term order, raw values (no centring/scaling), the exact rank check on the typed decimals, the eligibility rules and their reasons, the low-cardinality warning, the diagnostics design comparison, and when the relabelling check is offered; and the "Differences from the reference" note lists every difference (including categorical-by-default vs the reference's numeric-means-slope). | — | The initial reviewer must be able to see on the page how each result was computed. |

Also recorded the same day: contaminant handling (§17) — the maintainer chose to SKIP it for now. With it, the reference's finding 0011
(contaminant-list proteins taking the LFQ of real proteins) is dropped too. The server deploy of 2026-10-21 was accepted by the
maintainer as "identical to the local run except match-between-runs": all MS/MS-identified cells matched the local run exactly; MBR cells
differed more than between two local repeats, which the maintainer attributes to the server's much larger core count (FlashLFQ's default
thread count; see §21).

### Built 2026-10-22 (Phase 6)

Built in two parts (A = product + unit tests + invariance proof; B = review fixes + check-suite copies + full check run + docs), each block
by its own sub-agent, one at a time, with the main claude spot-checking every block and the review claude verifying part A. Front end
only: no webservice, service, database or npm change; no git commit. What was built, by decision:

- **Several covariates (COV-1, COV-Q10, COV-PA3).** A "Covariates:" checkbox row (one box per offered column, in column order) replaces the
  single covariate select, inline in the existing control row; no "none" text when nothing is ticked. A ticked eligible column gets an
  "as groups / as a continuous slope" select; a continuous-only column is marked "(continuous slope only)" (or "(continuous slope only;
  not usable)" with a disabled box). No cap: the residual-df and exact-rank refusals decide what cannot be fitted; the rank refusal names
  the covariate and the one(s) before it in column order. Terms are in metadata-column order whatever the tick order (COV-Q3); the
  selection carries a REQUIRED ascending `covariates` list of { column, mode }; the result carries a list of covariates (the single-covariate
  fields are gone, COV-Q15). Changing the compared column resets to the batch-column default (COV-Q11); an unticked and re-ticked column
  comes back as groups.
- **Per-column groups / slope (COV-2, COV-Q1, COV-Q2).** Groups is the default for every column. A column with a different value for every
  sample is offered as a slope only when all its values are plain numbers. Eligibility is decided over all quantified samples.
- **Slope eligibility (COV-Q4 … Q6, COV-QA, COV-QB).** In this order: every value a plain number (the one shared metadata-values rule) → no
  exponent notation → at most 15 significant digits, trailing zeros counted → |value| < 1e100 (kept in code as a defensive check; the page
  does not state it, since a plain value of ≤ 15 digits cannot reach it) → no non-zero value smaller than 1e-100 in size. A failed rule is
  shown as the column's "not a slope" reason.
- **Exact rank on the typed decimals (COV-Q5).** With no slope term the existing integer Bareiss check runs unchanged (verified
  byte-identical to the 12_06 snapshot's). With a slope term: per slope column, k = the largest number of digits after the point among the
  included samples' values; every value's point is moved right by k (zero padding) and the digits parsed with BigInt; X'X is built in BigInt
  (intercept and 0/1 columns as they are) and a BigInt copy of the same Bareiss loop decides the rank. The fit itself uses doubles of the
  values as typed (raw: no centring or scaling).
- **Low-cardinality warning (COV-Q7, COV-Q9).** A slope with 2 … 5 distinct NUMBERS among the included samples ("1" and "1.0" count once)
  gets the reference's warning in a box under the covariate controls (also when the fit is refused); the fit still runs.
- **Relabelling check offer rule (COV-Q14, COV-QD).** Offered only when the pair column is the only ticked covariate AND is ticked as groups;
  otherwise the "not drawn" note says why, naming the ticked covariates and their modes. The check's refits are unchanged.
- **Diagnostics (COV-Q13).** "p-values by design" and residual SD compare all ticked covariates vs none (with one covariate: exactly the
  earlier chart).
- **Texts (COV-TEXT, COV-Q8, COV-Q12, COV-Q29, COV-PA1, COV-PA2).** "How this is computed" states every choice (term order, raw values, the
  exact rank check and its decimal shift, each column's slope status and reason, "1" vs "1.0", the inform-only warning, the diagnostics
  designs, exactly when the relabelling check is offered and how it is computed); "Differences from the reference" lists every difference
  (categorical by default vs the reference's numeric-means-slope; the relabelling restriction). These items show for every selection. Only
  the clauses naming the old control were reworded elsewhere; "chosen" → "ticked" where it means the control. Every changed text is a row
  of the explained-difference table (68 rows) the checks classify against.
- **Unique sample-sheet headers (COV-HDR).** Upload gate + the Charts view's fatal error, one shared function; as recorded in design doc §5
  and the upload plan v2's validation pipeline (not repeated here).
- **Review fixes of part A (part B, block F1).** M1 (COV-PA2): the slope-limits sentence in "How this is computed" and the deviation note
  reworded as decided. L2 (COV-Q28): a stored viewer choice whose covariate is the compared column, appears twice or is out of order is now a
  fatal error (no real UI path produces one — the record is always the last selection helper's output); the silent fallback to the defaults
  remains only for a stale record (column gone, renamed or no longer offered in that mode). L3: the relabelling reason "no covariate is
  chosen" → "is ticked". L4: one covariate reads "with its ticked covariate" (not "with all its ticked covariate"). L5: the deviation note
  says the reference treats an all-numeric distinct-per-sample column as a slope by default and refuses it as groups. L6: the fit-check text
  says k is taken over the included samples' values (as the code does). Left for the maintainer: one level-note sentence in
  `quantCharts_DE_RelabelCheck_Text.ts` still says "the comparison and covariate chosen" (it refers to the selection, not the control).

**Where** (front end, under `data_pages/quant/`): `quantCharts/quantCharts_DifferentialAbundance_Compute.ts` (selection types, eligibility,
selection helpers, design build, both rank checks, model text, warnings), `quantCharts/quantCharts_ChartsContent_Component.tsx` (checkbox row,
warning box, rebuild keys), `quantCharts_DifferentialAbundance_HowComputedNote.ts`, `quantCharts_ReferenceDeviationNotes.ts`,
`quantCharts_DE_RelabelCheck_Compute.ts` / `_Text.ts`, `quantCharts_DE_Diagnostics_Compute.ts` / `_Text.ts`, `quantCharts_LfqVsSpectral_Compute.ts` /
`_HowComputedNote.ts`, `quantCharts_ProteinCaseStudy_Component.tsx`, `quantCharts_DE_PValueByDesign_Component.tsx`, `quantCharts_ColorNotes.ts`,
`quantCharts_StudyDesign_Component.tsx`, `quantCharts_SampleMetadata.ts` (all in `quantCharts/`); NEW `quant_SampleSheet_HeaderUniqueness.ts`;
and the project page's `projPg_Quant_UploadParse_ValidateAndMapRecords.ts` / `projPg_Quant_UploadParse_Component.tsx` (COV-HDR).

**How it was checked** (evidence in the gitignored session-handoff folder and the run-space evidence directory; not committed):
- *Unit tests:* a new harness (0 / 1 / 2 / 3 covariates, mixed modes, against an independent exact rational least-squares solve; tick-order
  independence bit-identical under both priors; the decimal-shift rank check incl. a design dependent in the typed decimals but not in
  doubles; every eligibility boundary; warnings; offer rule; fatal selections; every COV-TEXT item present): 152 passed / 0 failed. COV-HDR
  harness 67 / 0 (66 before the new test run existed); the follow-up harness copy 43 PASS. Negative controls caught every planted change.
  `tsgo --noEmit` clean on the product and on the harness copies.
- *Invariance proof (COV-Q27):* every existing selection (no covariate or one categorical; every compare column × ordered level pair) on
  every local run, 32 levels, the maintainer's 12_06 snapshot vs the build: DE 576 cases per prior — CONSTANT 24,237,909 and TREND 39,348,873
  numbers, **0 differ (bit-identical under both priors)**; relabelling 576 cases (160 offered), 0 differ. The only string differences (448)
  are the two reworded refusal texts on the explained-difference list. Re-run inside the full check run: 13 / 13 comparisons bit-identical.
- *Reference parity, synthetic (24 cases, both priors):* 46 OK / 2 EXPLAINED / 0 FAIL — the 2 are COV-Q26's case (z = x + y exactly in the
  typed decimals: the page refuses, the reference does not raise; exact rank 4 < 5, cond(X'X) ≈ 2.8e16); constant-prior parity 23 OK / 1
  EXPLAINED (the same case); relabelling 221 OK / 0 FAIL; low-cardinality warnings identical to the reference's.
- *Real test run (COV-Q23, COV-QC; the pair-run setup + six test columns, submitted by the maintainer):* page checks 588 PASS / 0 FAIL, 0
  console errors; relabelling parity 360 / 0. Reference parity: 95 OK / 5 FAIL (both priors) and 51 OK / 1 FAIL (constant). **The 6 FAIL
  lines are PENDING the maintainer's decision Q-E:** all are the effect criterion |page − reference| / SE ≈ 1.03e-12 against the 1e-12
  limit, only in the two designs with two continuous slopes (run_order + load_ug, ± inj_vol), peptides and proteins; every other criterion
  is within limits there. Those designs are ill-conditioned (cond(X) ≈ 9e2 and 1.4e3, computed by the check's own numpy, not by either
  program).
- *Full check run* (tag `rerunall_cov6`; the earlier phases' check script as a copy with Phase-6 copies of the affected drivers / checkers,
  plus new sections for the units, the synthetic and real-run parity, the invariance proof and a type-check): exit 0, 8,054 s wall time, no
  hang. Every section prints its expected result; no old-case number changed; every changed text is an explained-difference row; the S2-F1
  acceptance (§22) still fires exactly once. The only open lines are the 6 Q-E lines above.

## 24. Reduce the Charts view to the reference's QC charts (maintainer, 2026-10-23) — DECIDED; BUILT 2026-10-23 (comment-out, 36 markers; kept charts byte-identical before / after)

**Decision.** The Charts view keeps only the chart families of the reference repository's `qc` directory
(`scripts/promoted/qc_figures/`, `figures/qc/`) and **comments out** everything else. The code stays in the tree and is not deleted.

| ID | Decision | Why / notes |
|---|---|---|
| QCO-1 | **Kept**, at every level (Peptides, Proteins, Spectral counts: NSAF and PSM count): the Processing block (abundance boxplot, CV), the Detection and abundance block (ID depth, completeness, MNAR, dynamic range), the Sample relationships block (PCA, sample correlation). Also kept: the search details, the MBR-repeatability box, the `Math.log2` box, the MBR explanation, the per-level "How these charts differ from the reference QC analysis" notes, the sample-sheet upload. | These are the reference's QC charts. The reference draws them for peptide, protein, PSM and NSAF data, so the spectral-counts level stays (with its "Show spectral counts" click and NSAF / PSM toggle). |
| QCO-2 | **Commented out:** the Differential abundance block at every level (with its diagnostics, the variance-prior choice, the within-pair relabelling check, the covariate pickers); the Study design block's charts (cohort counts, crosstab, run layout, run-half crosstab); the "LFQ vs spectral counts" blocks (rounds 3a/3b, 4a, 4b); the protein case study. Together with their loads and computations: nothing that only a commented-out block uses still runs. | Not in the reference's `qc` directory. The log does not record a further reason. |
| QCO-3 | **The run-order controls are kept.** "Run order column" and "Order samples by" are cloned out of the Study design block into their own small block, shown once per page where they now apply; the original is commented out. | They still drive kept QC behavior: the per-sample order of the kept charts and the boxplot's acquisition-order colors ("the effort was made", maintainer). Their state already lives in the page container. |
| QCO-4 | **How:** comment out with one greppable marker; delete no files. Acceptance: each kept chart's data identical before and after (captured from the page), no request sent for a commented-out block, type-check and build clean; then stop for the maintainer to try the page. | Restoring is a search for the marker. |
| QCO-5 | **Follow-up round (design: QCO-9) (after the maintainer tries the reduced page):** the three QC elements an audit found missing and undocumented: ID-depth bars not colored by condition; the boxplot's condition / batch stripes; the Proteins dynamic-range contaminant marks / labels (no code change, given DIR-2, but the Proteins note wrongly implies no difference). | Audit 2026-10-23, confirmed against the reference's published figures. |
| QCO-6 | **Dropped:** the finding-0010 left-out parts (investigation `quant_charts__finding_0010_left_out_parts__investigation_2026-10-23.md`) and the planned check-suite round over the earlier blocks. A smaller suite covering only the kept charts comes later. | Follows from QCO-2. |
| QCO-7 | **As built (2026-10-23, review-verified):** the run-order controls live in a "Run order" block above the Peptides level (`quantCharts_RunOrderControls_Component.tsx`). The level notes lost the two DA items (labels on the q-with-vs-without-trend chart; the within-pair relabelling check) and now point to that block. The refusal no longer says "No run-order charts are drawn". The Study design block's own "Differences" note went with that block. One DA-only computation still runs because it sits inside a builder the kept charts share: the spectral DE input rows (`quantCharts_LevelDeInput.ts:55`). It is cheap, changes no behavior, and is left as is. | Verification: 541 kept charts over 27 page states byte-identical before vs after (the build assistant's captures, re-compared by the review assistant); no new or vanished requests; type-check exit 0 (re-run by the review assistant); no live time-sliced job remains. |
| QCO-8 | **Added to the QCO-5 follow-up round (maintainer, 2026-10-23):** (a) the Run order block's rule text says "Order samples by" reorders the per-sample charts of "both levels"; reword it for all three levels (Peptides, Proteins, Spectral counts). (b) Restore, in the Run order block, the two run-order / batch items of the commented-out Study design block's own "Differences from the reference" note: run order comes from the chosen column, and with no batch column all samples form one batch. | (a) The spectral level is reordered too (observed in the page captures). (b) Both items still apply to the kept charts. |
| QCO-9 | **QCO-5 design (maintainer, 2026-10-23; review recommendations adopted):** (1) **ID depth** gets its own "Color bars by" select, offering the same columns and using the same color rule as the PCA color-by select; the default is none (today's gray). (2) **Abundance boxplot stripes**: a stripe row for the submit's batch column whenever it has one, plus a multi-select for further stripe columns (default none), drawn below the stacked panels; the colors are the page's shared per-column metadata colorings (the ones the PCA and the correlation heatmap's stripes use). (3) **Dynamic range, contaminants**: a note fix only. The level note says that the reference marks and labels contaminants on this chart and this page does not, because contaminants are not identified here (DIR-2); no marking code. (4) Nit: the spectral level's "Loading spectral counts…" message gets a 40 px bottom margin, because it sat against the page footer. | The maintainer tried the reduced page on 2026-10-23: "seems fine". The reference hard-codes its own "condition" / "batch" columns; Limelight sample sheets have arbitrary columns, so the viewer picks. |
| QCO-10 | **QCO-5 / QCO-8 / QCO-9 as built (2026-10-23, review-verified):** ID depth "Color bars by" per level (default none = the gray bars, byte-identical); boxplot stripes below the last panel, extras above the batch row (the reference's order: condition above batch), same colors as the PCA / heatmap stripes, samples matched by identity; the Proteins note says the reference marks contaminants and labels the 5 most abundant on its dynamic-range chart; the Run order block's rule says "every level" and carries its own "Differences" note with the two restored items; the spectral loading message has a 40 px bottom margin (inline style; no site margin class fits). Choices are per level and survive rebuilds, as the PCA choice does. A one-panel layout defect (Plotly 3.7 ignores a 1 × 1 grid, so the stripe overlapped) was found and fixed during the round. | Verification: with default settings, 470 non-boxplot charts byte-identical, box traces identical in all 71 boxplots, and only the runs with a batch column changed (re-compared by the review assistant); no new requests; type-check exit 0 (re-run by the review assistant). **Color rule note:** each column has its own palette, so equal colors recur across columns (e.g. condition "control" and batch "B2021-05-06" are the same blue). This is the reference's own rule (`common/figures/colors.py:279`: "Two equal values in different categories get colors independently"); its published figures show distinct colors only because its hand-maintained registry (`state/color_registry.json`) assigns them. |
| QCO-11 | **(maintainer, 2026-10-23)** (1) **The Peptides dynamic-range chart stays**, "as long as it is correct". It is the page's only level × chart combination that the reference's `qc` directory lacks: the reference draws dynamic range for protein, NSAF and PSM only (`figures/qc/dynamic-range/`; `scripts/promoted/qc_fig_dynamic_range.py` is protein-only). Required: prove it is the reference method (`scripts/promoted/qc_figures/dynamic_range.py`) applied to peptides, and say on the page that the reference has no peptide dynamic-range chart. That also corrects the Peptides note, which claims the reference's dynamic-range charts include contaminants. (2) **The color rule is kept** (each column colored independently, so colors recur across columns). The page states how it works and what the alternative would be. (3) The Sample relationships color note also names the ID-depth bars and the boxplot stripes, which now share its colors. | (1) The page must not claim parity for a chart the reference does not draw. (2) The repetition is most visible with stacked stripes; the viewer should know it is by design. |
| QCO-12 | **QCO-11 as built (2026-10-23, review-verified):** (1) The Peptides dynamic-range chart was proven to be the reference method: the reference's own `compute_dynamic_range` (`scripts/promoted/qc_figures/dynamic_range.py:155`, imported unchanged, `min_intensity` 0, no highlights) was run on the page's raw matrices (each checked cell by cell against the run's result file). Every charted value was bit-identical for A1 and T1, Peptides and Proteins (as a control), and title / subtitle / axis texts equal the reference's wording. The Peptides note now says the reference has no peptide dynamic-range chart and this page applies the reference's protein method to peptides. (2)+(3) The Sample relationships "About these colors" note names all four users of the per-column colors (PCA, heatmap stripes, ID-depth bars, boxplot stripes), states the rule as coded (values sorted; each column starts again at the first color, which a unit assertion checks), says it is the reference's own rule, and gives the alternative (one assignment across the shown columns) and its cost. One line under the boxplot stripe keys states the rule and points to the note when the note is shown. | Verification: 541 charts byte-identical before / after (text-only round; re-compared by the review assistant); type-check exit 0 (re-run). |
| QCO-13 | **(maintainer, 2026-10-23) Fix the three small items the QCO-11 round flagged:** (1) the stale comment on `quantCharts_Colors__CategoricalColors` ("JS code-unit sort") states the real order its callers pass; (2) `quantCharts_ColorNotes__StudyDesignNote`, used only by the commented-out Study design block, uses the same wording as the new Sample relationships note where they overlap, taken from shared text, not a second copy, so a restored block cannot show stale text; (3) the batch color note's "Batch labels are sorted" states the actual sort rule, in the same words as the Sample relationships note. | Keep the page's explanations consistent and accurate; no behavior change. |
| QCO-14 | **QCO-13 as built (2026-10-23, review-verified):** (1) every real caller of `quantCharts_Colors__CategoricalColors` passes the shared metadata order (`quantCharts_MetadataValues__SortedDistinct`, directly or through `quantCharts_RawCharts__SortedDistinctBatchLabels`), so only the comment was wrong; it now names that order and the callers. (2) The Sample relationships, Study design and batch color notes build their shared sentences from the same private helpers in `quantCharts_ColorNotes.ts`; the Sample relationships note is byte-identical to before; the commented-out Study design component is untouched. (3) The batch note states the sort rule: by numeric value when every value is a number, otherwise as text with runs of digits compared as whole numbers. | Verification: 541 charts byte-identical (re-compared by the review assistant); the only page text change is the batch sentence (where a batch note exists); type-check exit 0 (re-run). |
| QCO-15 | **New check suite for the reduced Charts view (maintainer, 2026-10-23):** a NEW purpose-built suite for the kept QC charts; the old suite (`RERUN_ALL_…_2026-10-22_cov6.sh`) is kept only as history. **Full bar:** (1) reference parity per chart × level: the reference's own `qc_figures` code, run unchanged, on the page's data, exact or with a printed, stated tolerance; (2) byte-for-byte regression against the review-verified capture of the QCO-13 round (source = snapshot `GIT_CLONE__COPY__2026_10_23__18_11_PM`); (3) behavior states (run-order controls, ID-depth color-by, boxplot stripes, NSAF / PSM toggle, failed-state gate, one-sample run, choices surviving rebuilds, no request or compute from a commented-out block); (4) units, type-check, build; runs A1, T1, PER_FILE, F, pair_alt plus the simulated failed state; one rerunnable script with a classified result per section. **Two steps:** a read-only mapping prompt first (which old sections / drivers / checkers still apply; what parity code exists per chart × level), verified by the review assistant, then build and run. The build session is cleared first (pre-clear handoff). | The suite is the long-term guard for the reduced page; most of the old suite checks blocks that are now commented out. |
| QCO-16 | **New check suite: design decisions (maintainer, 2026-10-23, "go with defaults; see how it turns out and adjust").** The STEP 1 map's 18 recommendations are adopted (map `G1`–`G18`), with two review changes. (G1) Tolerances: log2 / log10 values ≤ 1 ulp, printed; other floats within the per-quantity limits of the earlier spectral parity check (1e-14 … 1e-11; PCA scores 1e-11 of max\|score\|); a PCA sign flip is FAIL; an integer histogram-bin flip that a proven built-in difference (e.g. 1 ulp of `Math.log2`) causes is EXPLAINED and printed with its evidence, otherwise FAIL; exact-tie text rounding EXPLAINED, printed. (G14) The undocumented differences found by the map are recorded here; the page text is not changed in the suite work. Notes for three viewer-visible ones (ID depth gray by default vs the reference's condition colors; the page's PCA minimum of 3 samples vs the reference's 2; the one-sample suppressions) are a later small UI round. Also adopted: a pair_alt baseline (captured, reviewed, then frozen); the golden capture write-protected with a sha256 manifest; unreachable states covered by unit tests only; the reference's modules run unchanged, with about 10 lines of driver glue re-implemented and printed; no contaminant flags; LFQ PCA constant features pre-dropped by the page's rule; spectral ID depth vs the one shared reference chart; Peptides dynamic range by the protein method; parity runs A1 / T1 / PER_FILE / pair_alt (F for three charts; the failed state for behavior only); inputs == run files for every state; deploy opt-in (`--deploy`, default off); after a failed type-check or build, later sections still run, marked; about 20–30 min, detached; the straggler moves as recommended. **Standing rule (maintainer):** numeric differences from the reference are REPORTED, not engineered away. No extra code (no replacement of JS built-ins such as `Math.log2`, no re-ports) to close comparatively small differences; the maintainer decides what to do about each reported one. | The suite must show the truth about parity without growing code to chase last-bit differences (the earlier log2 episode). |
| QCO-17 | **Suite build check corrected (maintainer + review, 2026-10-23):** the "deployed bundle sha256 == source-tree bundle sha256" check is dropped. The local deploy (`ant_buildFrontEnd_CopyToTomcat.xml`) produces a development bundle (~12 MB) and the WAR build a production bundle (~6.4 MB) of the same source, so the hashes never match. The suite instead checks: (a) the source equals the baseline snapshot, comparing tracked and untracked-not-ignored files only (git-ignored folders such as build outputs and generated bundles are skipped, except `.claude`, which the maintainer's rule keeps in scope); (b) the deployed local bundle is newer than the newest front-end source file. | Observed 2026-10-23: deployed 17:26:55 (dev build), newest source file 17:26:32, source identical to snapshot 18_11_PM. The page under test therefore is the current source. |
| QCO-18 | **STEP 2a results (maintainer, 2026-10-23):** (1) The MNAR Pearson r tolerance becomes **relative 1e-12** (it was 1e-13, a limit taken from protein-sized data). Observed on Peptides (about 33,000 features): T1 1.0e-13, pair_alt 1.2e-13. The likely cause is summation order (page sequential vs numpy pairwise; inferred, not proven). The displayed value is identical. A tolerance change only; no code (QCO-16). (2) The pair_alt capture candidate (9 states) is approved as the pair_alt golden baseline, to be frozen in STEP 2b (sha256 manifest + write-protect, as the main golden). (3) Before STEP 2b the build session is cleared (pre-clear handoff). | STEP 2a verified by the review assistant: golden 33/33 sha256 OK and write-protected; stragglers moved (`.claude` 306M → 246M, 0 large files, 0 images, 0 broken links); the reference's `qc_figures` modules imported unchanged, read-only; 138 PASS / 20 SKIPPED / 2 FAIL (the two r values above) of 160 cells. |
| QCO-19 | **The new QC check suite is built and passes (2026-10-23, review-verified).** The runner `RUN_QC_SUITE.sh` (with a README; in the git-ignored session-handoffs folder; data in the evidence-data area) has 14 sections. §0 prechecks, §1 type-check, §2 build check (QCO-17), §3 units, §4 capture, §5 regression vs the golden capture and the pair_alt golden, §6 export, §7 inputs == run files, §8 reference parity, §9 export == capture, §10 behavior states, §11 no removed compute / request, §12 kept texts, §13 epilogue. First full run (`qcsuite_run1_20261023_2154`): every section PASS, 631 s. Reference parity: 140 PASS / 0 EXPLAINED / 0 FAIL / 20 SKIPPED of 160 cells (the SKIPPED are the one-sample run's undrawable cells). MNAR × Peptides r still differs by 1.0e-13 / 1.2e-13 (deterministic), within the QCO-18 limit. Behavior 5,224 checks; kept texts 1,567 assertions; 15 units. Both golden folders are sha256-verified and write-protected. No product bug found; no product code changed. Known limits: `--deploy` not yet exercised; one unit's expected count (`unit_u1`, 69) depends on the stored run / test-file count. | Approving a new golden after an intentional page change is described in the suite README. |
| QCO-20 | **Page notes for three unstated differences (maintainer, 2026-10-23; the G14 follow-up of QCO-16).** The build assistant drafts them and adds them to the per-level "How these charts differ from the reference QC analysis" notes; the maintainer reviews them on the page. (1) ID depth: the reference colors the bars by condition; this page draws them gray unless "Color bars by" names a column. (2) PCA: this page needs at least 3 samples; the reference needs 2. (3) One-sample runs: say which charts are not drawn and why, unless the existing messages next to those charts already make it clear (checked first). Text only: every chart stays byte-identical. Then a suite round fixes `unit_u1`'s brittle count and the `--deploy` rule (pass on ant exit 0 + "BUILD SUCCESSFUL"; warning / error lines printed, not failed), re-baselines both golden captures through the README's approve procedure, and runs the full suite. | The maintainer's rule: show every choice on the page. |
| QCO-21 | **QCO-20 notes approved (maintainer, 2026-10-24: "texts look fine").** Four items in the per-level "How these charts differ from the reference QC analysis" notes (`quantCharts_ReferenceDeviationNotes.ts`). (1) ID depth gray unless "Color bars by" names a column; the reference always colors by condition (`qc_fig_id_depth.py:55`). (2) Peptides / Proteins, always shown: PCA needs ≥ 3 samples here (as the heatmap); the reference needs 2 for PCA and 3 for the heatmap (`pca.py:163`, `correlation.py:192`). (3) One-sample runs only: what is and is not drawn; the reference also cannot do CV / PCA / the heatmap with one sample, but its completeness and MNAR accept one sample (`cv.py:139`, `missingness.py:225`). (4) Spectral level, instead of (2) and (3): the reference's spectral driver accepts only its own 8 samples (`qc_fig_spectral.py:203-208`); each chart here has its own minimum. Verified by the review assistant: all charts byte-identical (541/541 vs the golden, 208/208 vs the pair_alt golden). Next: the suite round of QCO-20 (re-baseline both golden captures for these texts). | — |
| QCO-22 | **Suite round after QCO-20, done (2026-10-24, review-verified).** New golden captures: `golden/main__qco21_20261024` (33 files) and `golden/pair_alt__qco21_20261024` (11 files) under the suite's evidence-data folder. Each was proven to differ from its predecessor only by the four QCO-21 texts, then sha256-manifested and write-protected (the parent folder too). The old golden captures are kept, unchanged and read-only, as history. All golden paths live in one file, `GOLDEN_CONFIG.json`, which every tool reads. The build check accepts approved post-snapshot source changes only through a list pinned to their sha256. `unit_u1` checks the expected files instead of an exact count. `--deploy` passes on ant exit 0 + "BUILD SUCCESSFUL", with warning / error lines printed only; this was proven offline, without a deploy. The README's approve-a-new-golden procedure was rewritten after its first use. Full run `qcsuite_run2_20261024_1404`: every section PASS, 632 s. | — |
