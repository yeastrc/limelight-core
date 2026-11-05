# Quant Common page — Charts view: design, decisions and status (2026-10-01)

**Status:** first release built and review-verified on local test data; **uncommitted**. This is the authoritative
description of the Charts view. It supersedes, for the Quant Common page, the data-source / placement / mode-toggle parts
of `quant_common_pages__flashlfq_charts__investigation_and_implementation_plan_2026-09-23.md`, and it explains why the
table-value plan in `quant_multi_search_mbr_review_2026-09-30__summary_and_plan.md` (Steps 2-4) is parked.

Reference implementation used for parity: the reference Python analysis repo `limelight-quant-experiment`
(figure code `scripts/promoted/qc_figures/`, rendered figures `figures/qc/`).

---

## 1. Direction (maintainer + lead, 2026-09-30)

- Quant values in the peptide / protein **lists** are not the priority now and will be done differently later.
- The Quant Common page shows a **Charts view only**: the full set of QC charts for **peptides and proteins**, built by
  reading the flashlfq-service's result files for one quant submit **directly**:
  - **one FlashLFQ row = one peptide** (base sequence + summed modification mass — positional isomers such as
    `EE[10]EE` / `E[10]EEE` are one row, because FlashLFQ measures them as one MS1 feature), and one FlashLFQ protein row =
    one protein;
  - **no mapping to Limelight reported peptides.** This removes, by construction, the double counting of positional
    isomers and the loss of cross-search match-between-runs values described in the multi-search review.
- The previous quant common peptide / protein views and their charts are **commented out, not deleted**
  (`quantCommonSPAView_MainContent_Component.tsx`), to harvest code for future lists.
- The FlashLFQ → reported-peptide retrieval webservices (JOINED, the normalized / batch-corrected peptide variants, the
  shared join service, the protein retrieval) are **kept, unused** by the Charts view.

## 2. What the page shows

> **Status 2026-10-23 — Charts view reduced to the reference's QC charts (decision log §24, QCO-1 … QCO-4).** The page now shows,
> at every level (Peptides, Proteins, Spectral counts with NSAF / PSM count), only the **Processing**, **Detection and abundance** and
> **Sample relationships** blocks, plus the search details, the MBR-repeatability box, the `Math.log2` box, the MBR explanation, the
> per-level "How these charts differ" notes, the Proteins separator, the not-quantified / one-sample / failed-state behavior and the
> sample-sheet upload. **Commented out** (code kept in the tree, no file deleted; every spot tagged with the greppable marker
> `COMMENTED OUT 2026-10-23 (maintainer): not in the reference qc directory (decision log §24)`):
> the **Differential abundance** block at every level (diagnostics, variance prior, within-pair relabelling check, pickers), the
> **Study design** block (its charts and its own deviation note), the **LFQ vs spectral counts** blocks (rounds 3a/3b, 4a with its
> time-sliced bootstrap, 4b) and the **protein case study**, together with every computation, progress box, time-sliced job and
> request used only by them. The **run-order controls** ("Run order from column", "Order samples by", the ordering rule, the columns
> not offered, the refusal warning) now live in their own **"Run order" block**, once per page above the Peptides level, where the
> Study design block was (`quantCharts_RunOrderControls_Component.tsx`; same state in the Charts view, same choices, default "none"
> and effect; renders nothing without usable sample metadata, as before). Since QCO-8 (2026-10-23) its rule text says "every level
> (Peptides, Proteins, Spectral counts: abundance boxplot, identification depth)" (was "both levels"), and it has its own
> "Differences from the reference QC analysis" note with the two run-order / batch items restored from the Study design block's note,
> under their original conditions: run order comes from the chosen column (only while a usable run-order column is in use), and,
> additionally when the submit has no batch column, all samples form one batch. The "Loading spectral counts…" message has a 40 px
> bottom margin (QCO-9 (4)). The level notes no longer carry the two Differential-
> abundance items (q with vs without the trend; within-pair relabelling) and now point to the Run order block. The descriptions of
> the commented-out blocks below are kept as the record of what was built.

- URL: `quant-common` (new). The older `quant-common-peptide` / `quant-common-protein` URLs still work and render the
  same view; every Limelight link (project-page quant submits list) now points to `quant-common` only.
- One **quant submit** per page (its request id is in the URL hash). **Samples** = the scan files in that submit's result
  files (the manifest's `scan_files`). A scan file that had no PSMs passing the filters was never quantified: the page
  names it in a "not quantified" note, never an error.
- The existing display-only **search details block** shows the filters the submit used.
- At the top, first after any warning box (the not-quantified note; the normalize-failed banner sits above the view), ONE always-shown
  **MBR-repeatability box** (decision log §21 MBR-4 … MBR-7, built 2026-10-14): FlashLFQ's match-between-runs is not repeatable with
  more than one thread. A lead line per run, then a blank line, then the generic message:
  - lead line: **MBR not used** (MBR off, a PER_FILE run, or a single scan file — the MBR explanation's own classification,
    `quantCharts_MbrExplanation__MbrCase`) → "Match-between-runs (MBR) was not used for this run, so the note below does not apply to
    it." (wins over the thread count); else **`flashlfq_threads` = 1** → "This run used one FlashLFQ thread: in our test, the same
    request gave identical MBR values when submitted again."; otherwise (`null`, above 1, the key absent on runs made before
    2026-10-14, or not knowable) → no lead line and no blank line;
  - generic message, always: "When FlashLFQ runs with more than one thread, its match-between-runs is not repeatable: submitting the
    same scan files with the same settings again can give a slightly different set of MBR values (some appear in one submit and not the
    other). Values from MS/MS identifications are not affected.";
  - colors: the **warning** treatment (site class `warning-box-colors`: amber border and left rule + amber ground; formerly Colors.ts
    `ui.warningBorder` / `ui.warningBackground`, moved to the site SCSS by COL-5) when the generic message applies
    to the run (MBR used and the thread count not 1, including `null` / absent / not knowable); the **info** treatment (the `Math.log2`
    box's colors) otherwise. Same box geometry as the `Math.log2` box.
  - `params_manifest.json` top-level `flashlfq_threads` is parsed into three states kept apart (key absent / `null` / a positive
    integer); any other value is a contract break (fatal). Text: `quantCharts_MbrRepeatabilityNote.ts` (pure, unit-tested); component
    `quantCharts_MbrRepeatabilityNote_Component.tsx`.
- Directly below it, ONE **info box about the browser's `Math.log2` / `Math.log10`** vs numpy's `np.log2` / `np.log10`: one static
  sentence with no counts (maintainer decision T-14, 2026-10-08; the differences are not measured per round; round-4a follow-ups R4-F1 /
  R4-F3, section 4h "Round 4a follow-ups").
- An always-visible **match-between-runs explanation** (what FlashLFQ and MBR are, this submit's run mode and MBR
  settings as applied, the number of peptide values that are MBR, that protein values can include MBR, and that charts
  include MBR values as delivered). (Its sentence "MBR results can differ slightly if the same quant is run again." was
  dropped 2026-10-14 — decision log §21 MBR-8; the MBR-repeatability box above says it properly.)
- Per level, **above the chart blocks** (below the MBR explanation), an always-visible note **"How these charts differ
  from the reference QC analysis"** (maintainer decision, 2026-10-01; text generated in
  `quantCharts_ReferenceDeviationNotes.ts`, which also holds the Sample relationships block's own note):
  1. *Contaminants are not removed.* The reference removes contaminant proteins (and, for peptides, every peptide of a
     protein group containing one) before selecting the features measured in every sample — the set its abundance
     boxplot, CV, PCA and sample-correlation charts use; its ID-depth, completeness, MNAR and dynamic-range charts
     include contaminants. Here every feature is kept, so those charts' counts and statistics can differ.
     **Proteins level (QCO-9 (3), 2026-10-23):** the item adds that on its dynamic-range chart the reference also marks the
     contaminants and labels the 5 most abundant (reference `dynamic_range.py` :552-560, `label_top_n=5` :570-571; Proteins / NSAF /
     PSM only — the reference has no peptide dynamic-range figure), and that this page does not, because contaminants are not
     identified here (DIR-2). No marking code. The Spectral counts level's note already said so.
     **Peptides level (QCO-11 (1), 2026-10-23):** the parenthetical now names only the identification-depth, completeness and MNAR
     charts, and says the reference has no peptide dynamic-range chart, that this page draws one with the reference's protein method
     applied to peptides, and that contaminants are kept. Parity (2026-10-23, runs A1 and T1, Peptides and Proteins): the reference's
     own `compute_dynamic_range( ds, min_intensity=0.0 )` (`qc_figures/dynamic_range.py`), run on the raw matrices exported from the page
     (checked cell by cell against the runs' combined result files), gives bit-identical ranks, medians, IQR band, orders of magnitude,
     counts and ranked feature order; the subtitle, title and axis texts match the reference's wording with the level's noun.
  2. *Sample order.* While no run-order column is in use (section 4f): samples are in scan-file order (sf1, sf2, …), not
     acquisition (run) order as the reference requires. With a run-order column the item says which order is shown (run
     order from the chosen column, or scan-file order when the viewer picks it) and how the order source differs.
  3. *Boxplot boxes are colored by processing state* — only while no run-order column is in use; the reference colors each
     box by its acquisition-order position (sequential colormap), so run-order drift shows as a gradient, as this page
     does once a run-order column is chosen. (Listed only when the boxplot is drawn.)
  The note is shown whenever the level's chart blocks are shown (including a one-sample submit, where the boxplot is
  drawn); a level that shows only a "file missing" message has no note. Other known differences (too-few-sample notes
  instead of errors, the categorical color rule, blank batch labels, failed processing states, …) are explained by the
  existing notes and warnings next to the charts concerned and are not repeated here.
- A **separator bar** above the **Proteins** level heading only (maintainer request, 2026-10-01): 10 px high, the full width
  of the level, in the site's very dark green (the site color constant, used directly — the one exception to the color
  single-source rule, section 4); the visible gap from the bar to the heading's glyphs is 20 px (the heading's top margin
  is 0 and the bar's bottom margin 17 px, because the heading's text box starts about 3 px above its cap height —
  measured in the browser).
- **Proteins are named with Limelight protein names**, not the FlashLFQ `Protein Groups` text (section 4c).
- Per level (**Peptides**, **Proteins**), four framed, color-scoped blocks, each with its own color key:
  1. **Processing: raw vs normalized vs batch-corrected** — abundance boxplot (stacked panel per processing state) and
     CV (states overlaid: histogram + KDE + dashed medians).
     **Annotation stripes (QCO-9 (2), 2026-10-23):** below the bottom panel, one thin stripe row per column, one cell per sample in
     the display order (scan file / run order), no gaps — as the reference (`abundance_boxplot.py` :632-664 placement, :772-790 cells
     + row label). The submit's **batch** column is always drawn when the submit has one (bottom row); further columns are added with
     checkboxes ("Annotation stripes below the boxplot:"), offering the PCA color-by columns except the batch column, default none,
     drawn above the batch row in column order. Row label = column name (left); sample tick labels move under the stripe block; hover
     = column + value + sample; a key below the chart. Colors = the page's shared per-column metadata colorings (the PCA points and
     correlation-heatmap stripes use the same objects). The box traces are unchanged; only with stripes does the layout change
     (height grows by the block, `layout.grid.domain`, `xaxis.anchor`, the stripe y axes, and on a one-panel boxplot the panel's
     `yaxis.domain`, because Plotly drops a 1 x 1 grid). Without a batch column and without extras the figure is exactly as before.
     The choice is per level and survives rebuilds (measure toggle, run-order change), like the PCA choice. The boxes keep their
     colors (processing state, or acquisition order with a run-order column).
  2. **Detection and abundance (raw data)** — ID depth (**"Color bars by"** select since 2026-10-23, QCO-9 (1): same offered
     columns and colors as the PCA color-by select, default none = the single gray exactly as before; a chosen column colors each bar
     by its sample's value, adds the value to the hover and a key; dividers, count labels, median and bar order unchanged, as the
     reference `id_depth.py` :270-306, :500-542; per level, survives rebuilds), completeness (cumulative step curves, per batch when the submit
     has a batch column, plus all runs), MNAR (hexbin density + binned-median trend + Pearson r), dynamic range
     (rank-abundance + IQR band + "orders of magnitude").
  3. **Sample relationships** — PCA (one PC1 vs PC2 panel per processing state) and the clustered sample-correlation
     heatmap (see the section "Sample relationships block" below).
  4. **Differential abundance** *(commented out 2026-10-23, decision log §24)* — volcano + raw p-value histogram of a moderated (limma-style) test of a comparison the
     viewer picks (see the section "Differential abundance block" below), plus its "Diagnostics" (p-values by design and
     by abundance tercile, residual SD by design — section 4d). Since 2026-10-07 (0006a, section 4i) the block also has a
     **"Variance prior: constant / mean-variance trend"** choice (default constant) that drives the whole block, two charts that
     always compare both priors (residual SD vs mean abundance with both prior SDs; BH q with vs without the trend), and a note
     directly above every chart whose own text shows the q threshold: it is a fixed value of this page, not a search filter cutoff.
     Since 0006b (section 4j) the block ends with the **within-pair relabelling check** when the chosen covariate forms complete pairs
     (hits and π0 of every within-pair relabelling under the picked prior, computed in time slices behind a progress box; otherwise a
     note says why it is not drawn).
- *(Commented out 2026-10-23, decision log §24; the run-order controls moved to the "Run order" block, see the status box above.)*
  Once per page, above the Peptides level: a **Study design** block (cohort counts + a crosstab of two metadata columns
  the viewer picks — section 4d; with a run-order column the viewer picks, also the run layout and the run-half crosstab,
  and the run-order controls that also color / order the per-sample charts — section 4f).
- After Proteins, a third level **"Spectral counts (proteins)"** (2026-10-03): PSM counts and NSAF per protein × sample, from
  Limelight's filtered PSMs (checked against the run's own PSM counts), loaded on a "Show spectral counts" click, with a NSAF /
  PSM count toggle, the same QC charts (*since 2026-10-23, decision log §24, ONLY these: the blocks named next are commented out*), the Differential abundance block (round 2), the "LFQ vs spectral counts
  (proteins)" block (rounds 3a and 3b: the reference's five quantity-comparison charts, all three quantities under the level's one
  comparison), the "LFQ vs spectral counts: per-run agreement" block (round 4a: the per-cell density and the per-run
  correlations with bootstrap intervals; its bootstrap runs in time slices and the block shows a progress box until complete,
  round-4a follow-up R4-F2) and at the end the "LFQ vs spectral counts: detection and within-protein tracking" block (round 4b: the
  detection classes per run with the LFQ-only match-between-runs check, and the per-protein run-to-run correlation, with pair panels and
  exact permutation nulls when the viewer picks a qualifying pair column; drawn at once) — section 4h. Spectral rounds 1–4 are complete.
- One quantified sample: the boxplot draws the single box (as the reference does); charts that need ≥ 2 samples show a
  note.
- A processing state that FAILED at submit (e.g. batch correction skipped) shows its reason with a "Show chart" button;
  the chart, without that state, appears only after the click.

## 3. Data and webservices

- **Manifest first.** The page loads the submit's `params_manifest.json`, checks `outputs_version` (absent / older →
  "re-run quant" message only; newer → "reload" message only), loads only the status files and result files the manifest
  says should exist, and never draws charts from a partial set of files. **Expected outputs version: 5** since 2026-10-19
  (version 3 added the submit-time `peptide_identity_map.json`, decision log §20 P7-14; version 4 stores it gzip-compressed as
  `peptide_identity_map.json.gz`, P7-17; version 5 stores EVERY run file gzip-compressed and records the FlashLFQ version in the
  manifest — `quant_pages_TODO.md` section 5, phase W1): every run made before then shows only the "re-run quant" message (in
  practice the service now refuses to serve such a run's files at all — the read is a loud 500).
- The same webservice also relays the submit's **peptide identity map** (token `peptide-identity-map`, `application/json`;
  contract `quant_peptide_identity_map_contract_2026-10-14.md`; P7-17, built 2026-10-19: stored gzip-compressed, relayed with
  `Content-Encoding: gzip` when the browser accepts it, unzipped otherwise). Read by the Spectral counts level's "Protein case study"
  block (phase 0007-B2, section 4k) -- only when the viewer first picks a protein.
- **One passthrough webservice** returns the service's files byte-for-byte (since W1, outputs version 5: the stored gzip
  bytes with `Content-Encoding: gzip` when the browser accepts it, otherwise unzipped by the server), chosen from a fixed list of 8:
  `CombinedPeptides.tsv` / `CombinedProteins.tsv` and their `.normalized.linear`, `.batch_corrected.log2`,
  `.batch_corrected.delog2` versions. Request = project + request id + file; **no filters** (the results were fixed at
  submit). File sizes on an 8-file submit with 33,358 peptides: about 7.5 MB raw peptides, about 2.6 MB per derivative,
  under 1 MB per protein file.
- These quant proxies verify that the request belongs to the project (via the submit manifest's `project_id`) and
  otherwise answer "not found" (no manifest, or another project's run). Since W1 an unreadable / unparseable manifest is a
  logged 500, not "not found". The run-status webservice binding is deferred to when quant requests are stored in the
  database.
- **Strict browser-side parsing** of the service's documented TSV format (`#` header with a column dictionary,
  `format_version: 1`); sample columns must equal the manifest's scan files; only documented missing tokens are accepted
  (raw peptides `0`; raw proteins `0`, `NaN`, empty; derivative files none); anything else fails loudly. Linear files:
  0 = not detected. Batch-corrected log2 files: every finite value is real (can be 0 or negative).

## 4. Colors

- Colorblind-safe **Okabe-Ito** palette, following the reference repo; no Limelight brand colors in chart marks.
- **Single source rule (maintainer requirement): every meaningful color is changed in ONE place,
  `quantCharts_Colors.ts`.** That file holds the color values, their display names (a hex → name map; a color without
  a name is shown by its hex), and every fact the on-page color notes state about colors (palette descriptions, the
  palette colors deliberately not used for batches and why). `quantCharts_ColorNotes.ts` only generates the "About
  these colors" text from those and checks that the text agrees with the colors actually drawn (e.g. the batch order
  shown is the order the batch curves use; a color called "not used" really is absent from the batch palettes) — it
  never compares a color to a fixed value and contains no color literals. Chart-code comments name entries
  (e.g. `quantCharts_Colors.sampleRelationships.dendrogram`) instead of quoting hex values; hex values and the reference
  citations live only in `quantCharts_Colors.ts`. Marks whose color means something but used to rely on Plotly's
  default (the boxplot panel labels, the PCA panel titles, the heatmap stripe names — Plotly's default text color) are
  now set from that file with the same value. Gridlines, axis lines, tick / axis text, hover labels, the modebar and
  backgrounds are left to Plotly. A grep check (no hex / `rgb(` / CSS color name in the chart code outside that file)
  and a "change three colors in that file only" test were run (2026-10-01): the charts and the notes followed, with no
  error.
- Processing states: Raw `#E69F00`, Median-normalized `#56B4E9`, ComBat batch-corrected `#009E73` (the reference's
  registry).
- **One exception (maintainer, 2026-10-01):** the separator bar above the Proteins level (page chrome, not a chart color)
  uses the site color constant `site_color_very_dark` directly, from the shared site-color constants; it is deliberately
  not mirrored in `quantCharts_Colors.ts`, whose header names this exception. The grep check still finds no color literal
  (the constant is imported).
- Batch colors (detection block only, its own key): batch labels sorted, then `#0072B2`, `#CC79A7`, `#F0E442`,
  `#E69F00`, `#56B4E9`, `#009E73` — the state colors last; vermillion `#D55E00` is skipped (MNAR trend line in the same
  block) and black is skipped (too close to the dark gray lines). With 7-9 batches the whole set switches to a second
  colorblind-safe palette (Paul Tol "muted"); above 9 the completeness chart shows only the all-runs curve with a
  warning. (These choices are also explained on the page.)
  **QCO-13 (2026-10-23):** "sorted" is the page's shared metadata value order (`quantCharts_MetadataValues__SortedDistinct`, via
  `quantCharts_RawCharts__SortedDistinctBatchLabels`): by numeric value when every label is a number, otherwise as text with runs of
  digits compared as whole numbers. The batch note's "About these colors" now says so in the same words as the Sample relationships
  note; that note, the batch note and the (commented-out) Study design note build their shared sentences from one set of helpers in
  `quantCharts_ColorNotes.ts`, so the wording cannot drift.

## 4a. Sample relationships block (added 2026-10-01)

**What.** A third framed block per level, "Sample relationships", with two charts:
- **PCA small multiples** — one PC1 vs PC2 panel per processing state present (Raw, Median-normalized, ComBat
  batch-corrected; all log2), each with its own `PC1 (x.x% variance)` / `PC2 (x.x% variance)` axis labels. Points are
  colored by a sample-metadata column chosen in a **dropdown** (every uploaded column is listed; default = the submit's
  batch column, else the first column; one dropdown per level). Changing the dropdown only recolors — the PCA is
  computed once when the data loads. Each point carries its short `sf<index>` label (greedy collision-avoiding
  placement, as the reference); hover shows the full scan-file name and the sample's metadata values; the sample key
  (`sf<index>: (<search id>) <scan file name>`) is below the chart. A FAILED processing state follows the existing
  "Show chart" gate; a state not produced has no panel.
- **Sample-correlation heatmap** — Pearson r between every pair of samples over the median-normalized log2 profiles,
  ordered by average-linkage clustering with the dendrogram on top; **one annotation stripe per metadata column**
  (every column), each with its own key; colormap RdYlBu_r over the **off-diagonal** min..max (not anchored at 1), the
  diagonal masked in gray, a colorbar beside it, and r printed in each cell when there are at most 16 samples. Hover on a
  cell shows both samples' scan-file names and r; on a stripe cell, the column, value and scan-file name. If the
  median-normalized state is not available the chart is replaced by a note (no fallback to raw).
- Fewer than 3 samples → a note for both charts (and no dropdown / key / color note / deviation note).
- **"Differences from the reference QC analysis"** — an always-visible note at the bottom of the block (each level),
  generated from the computed results (`quantCharts_SampleRelationships_DeviationNotes.ts`), listing only the items
  that apply to the charts drawn: (1) PCA leaves out features with the same value in every sample (the reference QC
  analysis stops with an error instead), with this run's counts per panel or "None were left out for this run.";
  (2) the heatmap's samples are in this page's order (sf1, sf2, … = scan-file order), so branches can appear mirrored
  compared with a reference figure that uses its own sample-sheet order; (3) PCA point labels are placed
  approximately. The stripes' thin separators are drawn as 1 px lines in the separator color.

**Inputs.** The same complete-feature set the abundance boxplot uses (features with a value in every sample). Raw and
median-normalized values are log2(x + 1); batch-corrected values are the service's log2 file as-is. No contaminant
exclusion (maintainer decision; the reference excludes contaminants upstream).

**Math (reference parity: the reference repo's `qc_figures/pca.py` `compute_pca` and `qc_figures/correlation.py`
`compute_correlation`).**
- PCA per state, independently: per-feature z-score with scikit-learn `StandardScaler` arithmetic (population
  variance, ddof 0), then PCA via the eigendecomposition of the small sample × sample Gram matrix (cyclic Jacobi) —
  mathematically identical to the reference's full SVD and much cheaper for ~10^4 features; no new npm dependency.
  Scores = U·S; explained-variance ratio = S² / ΣS². **Sign convention = scikit-learn's** (`svd_flip`, loadings based:
  each component's largest-|loading| is positive), so the panels have the reference's orientation.
- Correlation: pandas `DataFrame.corr("pearson")` arithmetic (reproduced bit-for-bit), scipy
  `linkage(corr_matrix, metric="euclidean", method="average")` (each correlation-matrix row is an observation) and
  `dendrogram(...)["leaves"]` (including scipy's left/right child order); the colormap lookup is matplotlib's
  (256-entry RdYlBu_r table, index = floor(t·256)); cell text uses 3 decimals in black or white by cell luminance, as
  the reference.

**Deliberate deviations.**
- **Constant features** (the same value in every sample) are **excluded** from that state's PCA and the panel says how
  many ("N constant peptides excluded", shown only when N > 0). The reference refuses such input instead.
- Label placement uses estimated text boxes (no font measurement); exact label positions are not reference-identical.
- Sample order is Limelight's (scan files in id order), not the reference's sample sheet. The clustering is the same,
  but the heatmap's left/right arrangement of mirror-equivalent subtrees can differ from the reference figure, because
  dendrogram leaf order depends on input order.

**Colors.** Metadata colors use **the same rule as the batch colors** (one shared function): a column's distinct values
sorted, then 1-6 values → the batch Okabe-Ito order; 7-9 → the whole set from Paul Tol's "muted" scheme; more than 9 →
not colored (gray) with a note naming the column. A column with a blank value for some sample is also drawn gray, with
a note naming the samples. Different columns may reuse the same colors for different meanings, so every stripe and the
PCA have their own key; the block's "About these colors" note says so (generated from, and asserted against, the
color arrays). The batch block's colors are unchanged.
**QCO-11 (2)/(3), 2026-10-23:** the value order is the shared metadata order (§4g: by numeric value when every value is a number,
else text with digit runs compared as whole numbers). The "About these colors" note now names every user of these colors (the PCA
points, the heatmap stripes, the ID-depth bars when "Color bars by" names a column, the boxplot's annotation stripes), says each
column starts again at the first color (so the first values of two columns share a color) -- the reference's own rule
(`common/figures/colors.py` :278-282; its figures differ only through its hand-kept `state/color_registry.json`) -- and states the
alternative (one assignment across the shown columns, each continuing in the palette; cost: a value's color would depend on which
other columns are shown). The rule is kept. A one-line note under the boxplot's stripe keys states the per-column rule and points to
that note when it is shown (it is not shown when neither the PCA nor the heatmap is drawn, e.g. fewer than 3 samples).

**Verification (local test submits, 2026-10-01).** The reference's own `compute_pca` / `compute_correlation` were run
on the matrices the page used (exported from the live page): PCA scores agree to ≤ 2e-13 relative (same signs as
scikit-learn), explained-variance ratios to ≤ 3e-15, the correlation matrices are bit-identical, and dendrogram leaf
order and linkage merge ids are exact (heights within 2e-16) on every test submit and level. The reference's full
chain from the FlashLFQ output files gives the same PCA and correlation (≤ 5e-13 relative). Synthetic cases (3-24
samples, with constant features) were also checked against scikit-learn / pandas / scipy. The existing six charts'
parity checks and colors are unchanged.

## 4b. Differential abundance block (added 2026-10-01)

**Status 2026-10-23: COMMENTED OUT** (decision log §24; marker `COMMENTED OUT 2026-10-23 (maintainer): not in the reference qc directory (decision log §24)`). The text below records what was built.

**What.** A fourth framed block per level, "Differential abundance", computed in the browser (no service or webservice
change, no new npm dependency):
- **Comparison chosen on the page** (maintainer decision D2; page-session only, like the PCA dropdown): *Compare* (any
  sample-metadata column with ≥ 2 distinct values whose every sample has a value), *Reference* and *Test* level (Test ≠
  Reference), *Covariates* (since Phase 6, 2026-10-22: a checkbox row, one box per other usable column in column order,
  replacing the single "none / column" select; nothing ticked = no covariate). Defaults: the first offered column that is not
  the submit's batch column (else the first); its first two levels in sorted order; covariates = the batch column when it
  exists and is not the compared column, else none. Changing the compared column resets the levels and the covariates to
  that default; choosing the test level as the new reference moves the test to the first other level.
- **Covariates (Phase 6, 2026-10-22; decision log §23).** Any number can be ticked (no cap; the residual-df and exact-rank
  refusals decide what cannot be fitted). Each ticked column is fitted **as groups** (the default for every column,
  numeric-looking or not) or, when eligible, **as a continuous slope** (a per-column select). A column with a different value
  for every sample is offered only when all its values are plain numbers, and then as a slope only ("(continuous slope
  only)"). Slope eligibility is decided over all quantified samples: plain numbers, no exponent notation, ≤ 15 significant
  digits (trailing zeros count), no non-zero value below 1e-100 in size; otherwise the column's reason is shown. A slope with
  2 … 5 distinct numbers among the included samples gets the reference's low-cardinality warning in a box under the controls
  (inform only). Terms are always in metadata-column order, whatever the tick order; slope values are used raw (no centring
  or scaling). The Diagnostics' designs (section 4d) compare all ticked covariates vs none; the within-pair relabelling check
  (section 4j) is offered only when the pair column is the ONLY covariate and is ticked as groups (otherwise its note says
  why, naming the ticked covariates). Covariates are keyed by column name, which the upload requires to be unique (section
  5). "How this is computed" states every one of these choices for every selection.
- **Samples (D3).** Only samples whose compare-column value is the reference or the test level are fitted; the others are
  left out and listed (sf label + scan-file name + value, and how many) in the block's "How this is computed" panel (with a
  refusal, under the message).
- **Volcano** (reference `analysis_figures/volcano.py` as drawn by `fig_de_raloxifene_vs_control.py`): x = log2 fold
  change (test vs reference), y = −log10(BH q) (q floored at the smallest normal double); not significant in light gray,
  significant (strict q < 0.05) colored by direction; dashed q = 0.05 guide always in view with "q = 0.05" and
  "min q = …" in the right margin; symmetric x (max |log2FC| × 1.08), y from 0 to max(−log10 q, −log10 0.05) × 1.12; the 8
  smallest-q features ringed and labelled even when none is a hit (ties by raw p, then input order), labelled points
  closer than 0.012 of the axes merged into one stacked label (the reference's `_group_coincident`), and — when no labelled
  feature is a hit — every label kept below the guide line. Label text: peptides = the FlashLFQ `Sequence` (D5);
  proteins = Limelight protein names (section 4c; long labels shortened, the full names in the hover). Hover on every
  point: the identifier (proteins: names, descriptions, "Limelight protein id"), log2FC with its 95% CI, raw p, q.
- **Points at y ≈ 0 (maintainer decision Q2, 2026-10-01): no bottom padding.** The y axis starts at exactly 0 as the
  reference's does; a point at or very near y = 0 sits on the plot edge, so only its upper half can be hovered. Accepted
  as is — the axis is not moved or padded, and the page has no note about it.
- **Raw p-value histogram** (reference `analysis_figures/pvalue_hist.py`, the single-distribution panel): 20 equal bins
  on [0, 1] as a density, the uniform null (density 1, dotted), Storey's π0 (λ = 0.5, dashed) and "π0 ≈ x · n = N"
  (with "capped; raw x" when the raw estimate exceeds 1) — that text in a key line above the chart (§4e).
- **Key** at the top of the block (volcano buckets with counts, label ring, threshold line; histogram bars, uniform and π0
  lines) and an "About these colors" note (generated from `quantCharts_Colors.ts`, which says which of this block's colors
  also mean something else in another block).
- **"How this is computed"** (D6) — an always-visible panel GENERATED from the run (one module,
  `quantCharts_DifferentialAbundance_HowComputedNote.ts`): input (median-normalized log2 values of the N features
  measured in every sample of the run — the normalized file holds only those; constant features left out, with the
  count; batch-corrected values not used), the samples per level and those left out and why, the model in words (positive
  log2FC = higher in the test level; covariate levels and its reference), the variance moderation with the fitted d0 and
  s0² and the resulting df (or d0 = ∞), the p / q / CI rule and π0, the hit counts and smallest q, and a pointer to the
  level note for contaminants.
- **"Differences from the reference QC analysis"** at the bottom of the block (`quantCharts_ReferenceDeviationNotes.ts`):
  (as built 2026-10-01: one covariate at a time — replaced in Phase 6 by several covariates, see "Covariates" above)
  every column is groups by default, even when all its values are numbers (the reference treats a numeric column as a
  continuous slope unless declared categorical); since Phase 6 also the slope limits, the exact rank check and the
  relabelling-check restriction (every difference is listed for every selection, COV-PA1); when samples are left out, the reference would fit every sample it is given (one term per
  non-reference level) and drop features constant across all samples rather than the included ones; labels (peptides:
  full identifiers; proteins: Limelight protein names) are placed approximately.

**Inputs.** The complete-feature alignment the boxplot / PCA / correlation use; the median-normalized state as log2(x + 1)
(the same rows the correlation heatmap uses). No contaminant exclusion (level note). Features with the same value in every
included sample are dropped and counted (the reference runner's `drop_constant_features`).

**Model (reference `scripts/scratch/analysis/differential_abundance.py`, `method="moderated"`, reproduced step by step).**
- Design: intercept; the compared column as one 0/1 column `<column>[<test> vs <reference>]`; with a covariate, one 0/1
  column per covariate level except the first in sorted order (treatment coding over the included samples — the
  reference's `_column_terms`, drop-first with the sorted-first level as reference). Every column is treated as categorical.
  Since Phase 6 (2026-10-22): one such block per covariate ticked as groups, and one raw-value column per covariate ticked
  as a slope, all in metadata-column order; with no covariate or one categorical covariate the design and every number are
  exactly as before (proved bit-identical under both priors, decision log §23 "Built 2026-10-22").
- Per-feature OLS with one (X'X)⁻¹ (LU with partial pivoting, as `numpy.linalg.inv`); residual variance RSS / (n − p).
- Smyth's `fitFDist` prior: variances clipped at 0 and floored at 1e-5 × the median (limma's rule, counted); z = ln of
  those; mean and ddof-1 variance with numpy's pairwise summation (bit-identical to `np.sum`); target = var(z) −
  trigamma(df/2); d0 = ∞ when target ≤ 0 or no root below 1e6, else d0 = scipy `brentq` (ported line by line) on
  trigamma(x/2) − target over [1e-6, 1e6]; s0² from the digamma identities.
- Moderated variance (d0 s0² + df s²) / (d0 + df) (d0 = ∞: s0²), df_total = df + d0; SE, t, two-sided p (t, or normal
  when d0 = ∞); 95% CI = log2FC ± t(0.975, df_total) × SE; BH across the tested features (stable sort, reverse cumulative
  minimum, clip); hits q < 0.05; Storey π0 #{p > 0.5} / (m · 0.5), clamped ≤ 1.

**Numerics (`quantCharts_DifferentialAbundance_SpecialFunctions.ts`), with measured accuracy.** Checked against scipy
1.17.1 on a grid (df 1…1000 including non-integer, plus 1e4…1e6; |t| 0…50; ~11,700 t cases) AND against an independent
60-digit reference written for this purpose (Python `decimal`, exact Bernoulli numbers):
- digamma (recurrence to x ≥ 10 + 7-term asymptotic series): ≤ 6.7e-16 × max(1, |ψ|) vs scipy.
- trigamma (recurrence to x ≥ 12 + 7-term asymptotic series): ≤ 4.4e-16 relative.
- `brentq`: identical iterations to scipy's; roots ≤ 2.4e-16 relative.
- Student t two-sided p = I_x(df/2, ½): modified-Lentz continued fraction, except DiDonato & Morris's BGRAT expansion (as in
  Boost) when df ≥ 30 and −ln x ≤ 1 — the continued fraction alone loses accuracy as df grows (4e-11 at df = 1e6), so the
  switch was chosen from a regime study against the 60-digit reference. Result: ≤ 8.1e-15 relative for p ≥ 1e-15 and ≤
  2.1e-13 relative down to p ~ 1e-257 (where the exponent a·ln x is in the hundreds, so last-digit rounding of the
  inputs dominates). scipy on the same reference: ≤ 6.4e-11 (its value at t = 1e-10, df = 1 is exactly 1).
- Normal two-sided p via Q(½, z²/2) (series / continued fraction): ≤ 1.6e-13 relative down to 1e-262 (scipy 1.9e-13).
- Two-sided critical values by Newton on those p-values: t ≤ 1.2e-15, normal ≤ 2.3e-16 relative (scipy ≤ 3.4e-15).
- Speed: 100,000 t p-values in ~25 ms; a whole comparison on 10,308 peptides ≤ ~40 ms (synchronous, on a selection change).

**Refusals (maintainer C2; each one the reference also refuses).** No column with ≥ 2 values (e.g. a one-sample submit);
the normalized state unavailable; < 1 sample in a level; residual df < 1; a covariate with one value among the included
samples; a design that is not full rank (exact integer rank test of X'X — e.g. the covariate confounded with the compared
column; said in words, naming the covariate and the column(s) before it in column order; with a slope term, since Phase 6,
the same exact test on X'X built in BigInt from the typed decimals with each slope column's decimal point moved right by its
largest number of digits after the point among the included samples — so a design exactly dependent in the typed values,
e.g. z = x + y, is refused even where doubles would round the relation away); < 50 testable features (the reference's minimum for the prior fit); more than half the residual
variances exactly zero. Each is an on-page message instead of the charts.

**Verification (2026-10-01).**
- *Parity with the reference functions on the page's own matrices* (exported from the live page; every computed value per
  feature): 71b18c3b (condition with and without the batch covariate, reversed levels, batch compared with condition as
  covariate), fa734de6 (condition with / without batch; residual df 1 with the covariate), a0ec0906 (condition), both
  levels, plus four in-browser synthetic cases (a 3-level column with left-out samples, with and without a covariate; a
  confounded and a constant covariate). Feature sets, constant counts, design terms, residual df, d0 (≤ 5.7e-14), s0²
  (≤ 6.0e-14), hit sets, hit counts, π0, label set + order, label groups and histogram counts are identical; SE ≤ 4.2e-14
  relative; p and q ≤ 2.1e-13 relative; effect and CI ≤ 4.5e-14 and ≤ 1.5e-13 of the SE (plain relative errors reach
  ~2e-10 only for effects / CI ends within ~1e-4 of zero, where both implementations' sums cancel); t ≤ 4.5e-14 ×
  max(1, |t|). Every refusal case is refused by the reference too.
- *Synthetic cases vs the reference*: d0 = ∞, a large finite d0 (16,077 — the BGRAT branch; p ≤ 6.5e-13), 102 floored
  variances (identical count), numeric-looking values, 3-level column, and the refusals — no failures.
- *Against the reference's published results* for the same data (protein + peptide, batch-covariate and unadjusted
  designs): the page's FlashLFQ run is a local re-run, and the reference's refined contaminant list needs a data dump that
  is not in the reference repo, so the coarse contaminant rule and, separately, exactly the published feature set were
  applied to the page's matrices. Peptides: 9,899 of the 10,229 published peptides are in the page's complete set; log2FC
  Pearson r ≈ 0.9994 (median |Δ| 0.002), d0 3.27 vs 3.26 (batch) and 3.86 vs 3.84 (unadjusted), s0² within ~1%, 0 hits and
  π0 = 1.00 on both sides. Proteins (matched without the database-specific `psvid_<n>_` prefix): 1,768 of 1,801 in the
  page's set; log2FC r ≈ 0.946 (median |Δ| 0.010), d0 3.49 vs 3.51 and 4.10 vs 4.00, 0 hits and π0 = 1.00 on both sides.
  These differences come from the inputs (FlashLFQ re-run, normalization factors computed over different feature sets),
  not the computation (previous point).
- *Real page (headless Chrome)*: defaults as D2 on every test submit; switching compare column / levels / covariate
  recomputes with no new request; volcano buckets, ring count, label texts, guide line, "min q", axis ranges, histogram
  densities, π0 line and text, key counts, every number in the "How this is computed" panel, and the hover content of a
  significant and a non-significant point and of a histogram bar all match the computation (725 automated checks, 0
  failures); the one-sample submit shows the "no column with two or more values" message only; console clean. The other
  blocks' parity checks and resolved colors are unchanged (the color snapshot differs only by the new block's plots and
  notes).

**Colors** (`quantCharts_Colors.differentialAbundance`, each value cited to the reference): up `#E69F00` / down `#56B4E9`
(the reference registry's Significance colors), not significant `#d0d0d0` (its background color), label ring black,
leader `#737373`, guide line and margin text `#4c4c4c` (matplotlib "0.3"), x = 0 line `#808080`, histogram bars `#E69F00`
at 0.6 (its first p-value-distribution color), uniform line `#404040` (matplotlib "0.25"), π0 line black. The up color and
the bar color equal the raw processing-state color of the Processing block — the block's own key and color note say so.

## 4c. Protein names (added 2026-10-01, maintainer answer Q1)

**What the quant file holds.** (Runs submitted before 2026-10-01's request change; newer runs carry bare `psvid_<n>`
ids and a separate `protein_names.tsv` — contract `quant_protein_names_mapping_file_and_request_contract_2026-10-01.md`;
the lookup below handles both, and a bare id not found is shown as "Limelight protein id <n> (*)".)
For older runs the submit wrote each protein accession as `psvid_<protein sequence version id>_<name>`,
where `<name>` is ONE Limelight annotation name of that protein in the search being gathered (the first row the
annotations query returns — the query has no ORDER BY); descriptions are not sent. Protein groups list their members
separated by `;`. Names that look cut short (e.g. `sp|CO5_HUMAN|`, `sp|PRDX1_HUMAN|`) are the annotation names as stored
in Limelight, not a truncation: for a protein with several annotations the file carries only one of them (on the
reference dataset 27 of 4,344 proteins have more than one name in the search; e.g. `sp|PRDX1_HUMAN|` and
`sp|Q06830|PRDX1_HUMAN`), and `sp|Q8N5K1|CISD2_HUMAN` is that protein's full stored name (its description exists but
is not in the file). Checked against the database and the legacy protein page.

**Lookup (per search of the run).** The run's searches are the distinct searches of its sample sheet records
(`quant_metadata.json`), not merely the page's. For each, the page's existing per-search data object (the page's shared
loaded-data root — no second loader) gives the protein info through the **filtered** per-search loader
(`ProteinInfo_For_MainFilters`); the Quant Common page displays at the run's own searches and cutoffs (the link carries
the run's search-data-lookup code), so it contains every protein the submit sent. Synchronous when already loaded; the
Proteins level shows "Loading protein names…" until it is. Built once per data load (`quantCharts_FeatureDisplay.ts`,
`quantCharts_ProteinDisplayNames_Load.ts`).

**Display per protein (psvid).** Names = the union of its annotation names over the run's searches that contain it
(deduplicated, in search id order, joined by ", "; the legacy protein page shows the same names joined by ","). If the
searches disagree (their name sets differ), the hover lists each distinct name with the search id(s) that gave it —
never silently one. The hover adds every distinct description and "Limelight protein id <n>". A group with several
members shows each member (label: up to two members, then "+N more proteins"; a member with more than two names: the
first two, then "+N more"). The same mapping is used everywhere the Charts view names a protein: volcano labels and
hover, the dynamic-range curve's hover, and the Differential abundance block's deviation note. Peptide labels are
unchanged.

**Not found / not on the page.** A protein found in none of the run's searches (or a member that is not
`psvid_<n>…`) is shown as written in the file without the `psvid_<n>_` prefix, marked "(*)", and counted in a one-line
note under the Proteins heading. A run search with no data object on the page gets its own note line naming its search
id. Neither happens on the local test submits (0 not found; 0 proteins with names differing between searches).

**Verification (2026-10-01, local test submits).** 71b18c3b (1 search, 4,344 proteins), fa734de6 (4 searches, 738),
a0ec0906 (4 searches), e96db9a6 (1 search, 407): 0 not found, 0 differing; no `psvid_` text anywhere in the Charts view's
text, HTML or plot data; real mouse hovers show the Limelight names, descriptions and protein ids. fa734de6 cross-checked
in the database (0 of its 738 proteins have different name sets across its 4 searches). Five proteins (including one
with two annotations and one without a description) match the legacy protein page for the same search and cutoffs.
The disagreement, not-found and not-on-the-page displays were exercised by synthetic in-memory changes to the page's
loaded protein info. The other blocks' parity checks are unchanged (names are display only).

## 4d. Chart group 5: DE diagnostics + Study design (added 2026-10-02)

**Status 2026-10-23: COMMENTED OUT** (decision log §24; marker `COMMENTED OUT 2026-10-23 (maintainer): not in the reference qc directory (decision log §24)`). The text below records what was built.

**What.** Five charts, front end only (no service / webservice change, no new npm dependency):
- Inside each level's **Differential abundance** block, a **"Diagnostics"** sub-section (after "How this is computed",
  before the block's deviation note) with its own "About these colors" note:
  - **D1 p-values by design** — raw p-value histograms of the designs overlaid (step lines, 20 bins on [0, 1], density,
    the uniform null dotted); the key above the chart gives each design "label (n = N; π0 = x)" with Storey's π0
    (λ = 0.5), "π0 = 1.00, capped; raw x" when the raw estimate exceeds 1 (the reference's legend text).
  - **D2 p-values by abundance tercile** — three panels (low / mid / high): the tested features of the chosen design split
    into equal-count terciles of their mean log2 abundance, each panel a density histogram (20 bins) with the uniform null,
    that tercile's π0 (dashed), and the title "<name> tercile · n = N · π0 = x.xxx / mean log2 abundance a.a–b.b";
    one shared y axis (Plotly's range — the panels' y axes `matches` the first; layout round 2, §4e). Drawn for **peptides
    and proteins** (G3).
  - **D3 residual SD by design** — per-feature unmoderated residual SD (√(RSS / residual df)) of each design as step
    densities of log10(SD) on shared bins of 1/20 decade (density per log10 unit), on a log SD axis (Plotly's range and log
    ticks — layout round 2, §4e); a dotted line at each design's median, the median values in the key (layout round 1).
- **Study design** block, **once per page**, above the Peptides level (G4: it describes samples, not features):
  - **S1 cohort counts** — one bar panel per metadata column (bar = number of samples with that value, values sorted,
    count labels, one shared count axis with whole-number ticks), "Cohort composition (n = N)".
  - **S2 crosstab** — grouped bars, x = one column's values (with each value's sample count), one bar per value of the other
    column, count labels, "<bars> × <x> (n = N)". Two dropdowns choose the pair ("Crosstab bars:", "Along x:"); both list
    every complete column; choosing in one the column the other shows swaps them (so the pair never holds one column twice
    and two columns can still be swapped). Default: bars = the Differential abundance block's default compare column,
    x = the submit's batch column; when there is no batch column or it is the compare column, the first other column.
    Fewer than 2 complete columns: cohort counts only + a note. Page-session only.
- Every chart has a short generated **"How this is computed:"** line under it (`quantCharts_DE_Diagnostics_Text.ts`).

**Designs (maintainer decision G2).** Design A = the viewer's current comparison WITH the chosen covariate; design B = the
SAME comparison with NO covariate — both from the existing moderated computation on the same included samples (so the same
tested features). Both are recomputed on every Differential-abundance selection change (a second synchronous run into an
instance field; no memo, no request). With covariate "none" there is ONE design, drawn alone with the note "choose a
covariate to compare designs". Labels follow the reference's form: "<covariate>: <compare> + <covariate>" and
"unadjusted: <compare> only".

**Inputs.**
- D1 / D3: each design's raw p-values / unmoderated residual SDs from its moderated fit (section 4b).
- D2: the abundance is the reference's `mean_abundance` = the mean over the **included** samples of each tested feature's
  median-normalized log2 values (the analysis matrix after the constant-feature drop). The reference's matrix is
  Fortran-ordered at that point, so numpy sums along the sample axis with its pairwise summation; the page uses the same
  summation (a plain sequential sum differs in the last bit for 8 samples).
- S1 / S2: the Charts view's sample set — the quant run's **quantified** samples (the manifest's scan files); a mapped scan
  file with no PSMs passing the filters is not counted (it is named in the page's "not quantified" note).

**Reference parity** (limelight-quant-experiment): `analysis_figures/pvalue_hist.py` `plot_pvalue_histogram` /
`estimate_pi0` / `pi0_text`; `analysis_figures/de_supplementary.py` `equal_count_terciles` (stable sort, `np.array_split`:
larger groups first), `storey_pi0`, `plot_pvalue_by_tercile`, `plot_residual_sd_by_design`; `analysis/differential_abundance.py`
(sigma, mean_abundance); `metadata_figures.py` `plot_cohort_counts` / `plot_condition_crosstab` (bar width 0.7 / 0.36, x
limits, count labels, integer y axis, tick text "<value>\n(n = total)").

**Colors** (`quantCharts_Colors.deDiagnostics` / `.studyDesign`). The reference assigns its p-value palette slots over its
three fixed designs (paired `#E69F00`, batch `#56B4E9`, unadjusted `#009E73`); here the **chosen** design takes the primary
slot (`#E69F00`, solid — the same color as the main p-value histogram's bars, which show that design) and the
**no-covariate** design the reference's unadjusted slot (`#009E73`, dash-dot). Tercile bars `#E69F00` at 0.6 with white
edges, tercile uniform line `#808080` dotted, π0 line black dashed; overlay uniform line `#404040`. Study-design bars use the
one categorical rule (the batch / Sample relationships colors; a column that is not colored is gray), black 0.8 pt edges.
The diagnostics' color note says that `#E69F00` / `#009E73` are also the raw / batch-corrected processing-state colors
(generated). The A5 grep still finds no color literal outside `quantCharts_Colors.ts`.

**Differences from the reference** (generated into the blocks' "Differences from the reference QC analysis" notes,
`quantCharts_ReferenceDeviationNotes.ts`): the designs compared (chosen + no covariate vs the reference's paired / batch /
unadjusted), design colors by role, the tercile chart also for peptides, a residual SD of exactly 0 left out of the log axis
and counted (the reference refuses; listed only when it happens); Study design: only quantified samples counted (only when a
scan file was not quantified), colors by this page's metadata rule and uploaded column names as titles, any column pair
crossable, more and narrower bars per group when there are more than two bar values (the reference draws exactly two
conditions; the chart widens so every bar stays at least 30 px), no run-order charts
(condition × run half, run layout: acquisition order is not available). A column with blank values (data submitted before the
every-cell rule) gets a "(no value)" bar in the cohort counts and is not offered for the crosstab.

**Crosstab sizing (maintainer, 2026-10-02 follow-up; geometry replaced in layout round 2 — see §4e: the bars are now Plotly's
`barmode: "group"` on a categorical x, and the 30 px rule sizes the plot from nX × k bars and Plotly's bargap 0.2). As first
built:** Along x, the bars of one group keep the reference geometry in x units: width w = 0.36 per bar for up to two bar values (the reference), w = 0.72 / k for k > 2 (a group stays 0.72 wide), bars
0.95 w wide, x axis -0.6 .. nX - 0.4. The plot area starts at the first release's width (150 px per x value, at least 300 px)
and is **widened just enough that every bar is at least 30 px on screen** (`quantCharts_StudyDesign__CrosstabPlotWidthPx`). 30 px
is the QC pages' per-category minimum (`qcPage_StandardChartLayout.ts`, used through `widthFor_CategoryCount`); that helper
itself is not reused because it sizes by a plain category count, while here the x span also holds the gaps between groups,
so the bar width is derived from the geometry. 30 px also holds a three-digit count label. With one or two bar values the
start width already gives about 46.6 px or more per bar for any number of x values, so it is never widened: the two-value
layout (reference parity) is unchanged (verified: same layout width, bar x and width). Measured (synthetic crosstabs, headless
Chrome): 3 bar values 31–33 px, 6 and 9 bar values 30.0 px, charts 400–1758 px wide for 2–4 groups; no bar or count label
overlaps. The cohort-count panels already scale per value (90 px × max(values, 2)) and are unchanged.

**Count axis (cohort counts + crosstab; maintainer, 2026-10-02 follow-up).** The y axis always spans 0 .. largest count + 1.
Up to a largest count of 20 it is the reference's rule exactly (`metadata_figures.py` `_integer_count_axis`: a tick at every
whole number, every second one above 6) — the local runs (at most 8 samples) render exactly as before (verified: identical
layout, resolved ticks and tick labels). Above 20 the reference rule would print dozens of overlapping labels (a count of 120
gives 61), so Plotly chooses the ticks (`tickmode "auto"`, `tickformat "d"`, `tick0 0`). Observed in the browser: 21 → 0, 5, …,
20; 45 → steps of 10; 120 → steps of 20; 500 → steps of 100 — always whole numbers, 5–7 labels, at least 29 px apart. The
block's "Differences from the reference QC analysis" note lists this only when a chart uses it (like the other conditional
items: the note describes what is drawn). Shared helper: `quantCharts_StudyDesign__IntegerCountAxis`.

**Maintainer decisions on the first-release flags (2026-10-02).** A residual SD of exactly 0 stays off the log axis (with
the generated count sentence); blank-value columns: no change (new uploads cannot have blanks; old data will be deleted);
SD-axis ticks beyond the reference's 0.01–2 list are fine; the residual-SD key's median swatch color (the design color; the
reference uses its trend color) is not listed as a deviation; crosstab bars keep a minimum width (above).

**Not in scope (G1).** Run-half crosstab / run layout (need acquisition order — added by chart group 6, section 4f); spectral NSAF / PSM-count versions and
LFQ-vs-spectral comparisons (need spectral counts — a separate design later).

**Verification (2026-10-02, local test submits; T1 = the reference functions on the page's own exported matrices).** (As
verified for chart group 5. The layout rounds of §4e later replaced the geometry comparisons below — y tops, ranges, tick lists,
bar positions / widths — with "Plotly decides" checks; the number and encoding comparisons stand.)
- Five submits, both levels, the default comparison plus "condition, no covariate" and "batch + condition" where applicable:
  tested features and order identical; p ≤ 2.1e-13 and residual SD ≤ 1.7e-12 relative (≤ 1.7e-13 of the scale-aware
  bound); D1 histogram counts identical, densities and edges bit-identical, π0 / raw π0 identical; D2 tercile memberships
  identical (sets and order), mean abundances bit-identical, per-tercile n / π0 / #p > λ / abundance range identical,
  densities bit-identical, panel titles and π0 texts identical, shared y top identical; D3 drawn bin edges ≤ 2e-16, densities
  and counts identical, medians ≤ 1.4e-16 and quartiles ≤ 2.1e-15 relative, x range and ticks identical, median texts identical;
  S1 / S2 counts, bar positions and widths, count labels, tick texts, titles and axes identical for every column and every
  ordered column pair (619 checks, 0 failures).
- Synthetic cases (no local run has them): ties in the terciles, a residual SD of 0, SDs wide enough for the extra ticks,
  blank-value and too-many-value columns, three bar values, the crosstab defaults without a batch column and with < 2
  complete columns — checked in the browser code's unit test and, where the reference accepts the input, against the
  reference functions (no failures).
- Real page (headless Chrome): the charts draw on every submit, the defaults follow G2 / G4, dropdown changes recompute with
  no new request, the rendered traces / shapes / texts / hovers match the computation, notes present, console clean. The
  existing blocks' parity checks are unchanged.

## 4e. Layout rule: what must match the reference vs what Plotly decides (maintainer, 2026-10-02)

These charts are NOT curated figures: they must accept a wide, unknown range of data (few to many samples, values,
columns). The reference figures were tuned to one 8-sample study, so copying their matplotlib LAYOUT forces a chain of
patches as data grows. Rule from now on:

- **Must match the reference:** the NUMBERS (every statistic, count, estimate), the CHART TYPE, and the ENCODINGS
  (what is plotted, what colors mean, guide lines / annotations that carry meaning).
- **Plotly decides the layout:** axis ranges, tick placement, margins, label positions, legend placement. Override
  only for a real readability problem across the data range, preferably with Plotly's own options (autorange,
  automargin, outside text, no clipping) rather than hand-tuned numbers.
- **Kept exception:** chart WIDTH with many categories (Plotly squeezes instead of growing) — the QC pages'
  per-category minimum width (30 px) is the house rule.
- Parity checks compare numbers and encodings, not layout geometry.

**Review pass (2026-10-02).** Every layout override in the Charts view was inventoried (64 items) and classed as
encoding (keep), layout copied from the reference (drop, or replace with a Plotly option), readability fix (keep only
if Plotly cannot do it) or the kept width rule. What was observed in the browser, on real and synthetic data:

- Plotly has no label-repel. The volcano and PCA label placements do real work: Plotly's own label options gave 3 to
  10 times more overlapping labels. They stay.
- Plotly's automargin ignores annotations. Margins that hold panel titles or margin texts therefore stay computed;
  margins that hold only ticks and axis titles go to automargin.

Two build rounds were agreed.

**Maintainer decisions on the open items:**
- the house fixed chart size (750 × 450): kept;
- CV medians: moved into the legend names;
- the ID-depth median value: moved into a key line + the hover;
- MNAR y ticks: Plotly's automatic ticks, with k/n in the hovers;
- the correlation heatmap's 14 px minimum cell: kept;
- the volcano's computed ranges and pads (×1.08 / ×1.12): kept, because they are coupled to label placement /
  grouping and to reference parity;
- residual-SD median texts: moved into the key;
- cohort panels at 90 px per value: kept.

**Round 1 (done 2026-10-02):**
- **Dropped (Plotly's autorange / defaults):**
  - the CV x range;
  - the ID-depth y range (max × 1.18) and bar width;
  - the completeness x / y limits;
  - the MNAR x / y ranges, its k/n tick list and the hand-placed colorbar margin;
  - the legend row below the plot (completeness, dynamic range);
  - the correlation x range, its forced −90° tick angle and the dendrogram range (y kept reversed via
    `autorange: "reversed"`);
  - the p-value histogram and the p-value-by-design x / y ranges;
  - the residual-SD y range;
  - the cohort-count bar width, x range and 30° tick angle.
- **Replaced with Plotly options:**
  - ID-depth and Study design count labels → bar text `textposition: "outside"`, `cliponaxis: false`;
  - the hand-sized bottom margins of both Study design charts → `automargin`. A fixed margin clipped long values and
    hit the axis title (observed on synthetic data).
- **Moved into keys / legend names (values unchanged, same rounding):**
  - CV medians → "<state> · median 0.123";
  - the ID-depth median → a key line "median of all samples: N detected …" above the chart + every bar's hover;
  - residual-SD medians → the existing key: "<design> (residual df r; median 0.123)".
  - The dashed / dotted median lines stay.
- **One added option:** the MNAR legend is horizontal (`orientation: "h"`). Plotly's default vertical legend and the
  colorbar both sit at the right edge and overlapped (observed).
- **Verification:**
  - Every number / encoding parity check passes. The asserts that compared the removed geometry were rewritten to
    check that Plotly decides it (autorange) and that the moved values are unchanged.
  - Live page, 5 submits × both levels + Study design: text overlaps / clipping never increased.
  - Synthetic stress — ID depth 30 / 60 / 120 samples, MNAR 20 / 60 samples, long Study design values — the observed
    defects are gone.
- **Known, not round 1:**
  - At 120 samples the `sf<n>` x tick names of ID depth crowd at the house 30 px per sample.
  - With very long values the Study design plot areas shrink (automargin grows the margin inside a fixed figure
    height) — fixed in round 2.
  - A count label can sit on the ID-depth median line: Plotly bar text has no background box.

**Round 2 (done 2026-10-02):**
- **Margins and size:**
  - The house size (750 × 450) and house margins are the base everywhere. Margins grow by Plotly's `automargin` on the
    axes; the title block (title + subtitle) pushes the top margin by its own height (`title.automargin`, container
    reference, 6 px from the top edge). This covers the p-value histogram, p by design, residual SD, completeness, MNAR,
    the correlation heatmap, the volcano and the crosstab. The fixed sizes of the p-value charts and residual SD (copies
    of the reference's inch sizes) are gone.
  - Observed in Plotly 3.7: `title.automargin` with the title referenced to the plot ("paper") reserves only the title
    line and draws the subtitle inside the plot, so the title is referenced to the figure ("container").
  - Top margins that hold annotations stay computed: the panel titles of the cohort counts, PCA and tercile charts and
    the ID-depth batch-label row. Automargin does not see annotations.
  - The dynamic-range chart also keeps its top margin. Its legend (right) and its long subtitle collided when the title
    moved down to the plot.
- **Plot areas that are rules stay at their size; the figure grows around them.** When automargin needs room, the
  figure is resized after drawing (Plotly has no option for this) instead of shrinking the plot. Applied to:
  - the volcano: plot 640 × 470 px, because the label placement works in those pixels. Its size is unchanged — any other
    size moves every label;
  - the PCA panels: 300 × 300 px, for the label placement;
  - the correlation heatmap: the cell rule, 14 px minimum;
  - the cohort counts: 90 px per value;
  - the crosstab: at least 30 px per bar.
  - A figure also widens when its title block is wider than it (a narrow chart clipped a long subtitle).
  - This fixes the shrinking Study design plots with long values (FLAG C). Observed on synthetic 44-character values:
    the plots stay 260 px tall, where after round 1 they shrank to about 150 px.
- **Correlation stripe names** are the stripe axes' tick labels, so automargin sizes the left margin.
- **Panels by `layout.grid`:** the boxplot's stacked states (260 px panels, 24 px gaps), the PCA panels and the tercile
  panels. Panel titles are placed relative to each panel's own domain.
- **Shared axes by `matches`:** the three tercile panels (the computed top ceil(max × 1.12 / 0.25) × 0.25 is gone) and the
  cohort-count panels (one count scale).
- **Residual-SD axis:** Plotly's log range and log ticks. The computed tick list and its deviation-note item are gone.
- **Count axes (cohort counts, crosstab):** Plotly's autorange from 0 and automatic ticks, labelled as whole numbers. For a
  largest count below 10 the step is held at 1, because Plotly picks 0.5 there (observed for counts of 1–3). The ≤ 20
  reference rule and its deviation-note item are gone.
- **Crosstab:**
  - Plotly's grouped bars (`barmode: "group"`, bargap 0.2) on a categorical x, in the column orders. The hand offsets and
    widths are gone.
  - The kept width rule sizes the plot so every bar is at least 30 px: plot width ≥ 30 × nX × k / (1 − bargap), starting
    at 150 px per x value, at least 300.
- **Study design x tick labels are always drawn.** Plotly's default (`ticklabeloverflow` "hide past div") hid a long
  rotated last label (observed), and a hidden label does not push the margin.
- **Not changed:** the volcano and PCA label placement, the volcano's ranges and pads, every annotation-holding margin,
  the width rules, every number and encoding.
- **Verification:**
  - Every number / encoding parity check passes. The geometry asserts were rewritten to "Plotly decides" checks: one
    shared axis, autorange, log axis, whole-number count ticks, grouped bars.
  - Live page, 5 submits × both levels + Study design: no increase in text overlaps, clipping or hidden tick labels.
    Volcano / PCA label boxes did not move (0.0 px). The rule-sized plot areas are exact.
  - Synthetic stress, drawing the real Study design components: crosstabs with 2 / 3 / 6 / 9 bar values × 2–4 x values,
    long values, largest counts 1–4 / 21 / 120 / 500. Results: 0 overlaps, 0 clipping, every bar ≥ 30 px, whole-number
    ticks, the plot area kept.
- **π0 texts (maintainer, after round 2):** with Plotly's tight autorange the boxed in-plot "π0" text sat on the tallest
  bars (tercile panels; the p-value histogram since round 1). Moved out of the plot: into the tercile panel titles
  ("· π0 = x.xxx", 3 decimals as before) and into a key line above the p-value histogram ("π0 ≈ x · n = N", same text);
  p-value by design already had π0 in its key. Values identical to before (checked on the live page).
- **Tercile x range (maintainer, after round 2):** the fixed 0..1 is dropped — Plotly's autorange (the bars span 0..1),
  as the p-value histogram since round 1.

**The layout rule now (after both rounds):** the numbers, chart types and encodings match the reference. Plotly decides:
- ranges, ticks and tick angles;
- margins (axes, titles, colorbars, legends);
- bar placement;
- panel placement (grid).

The overrides that remain are each for a stated reason:
- the house figure size;
- the kept per-category widths (QC 30 px, crosstab 30 px per bar, cohort 90 px per value, correlation 14 px cell), held
  by resizing the figure, not the plot;
- the label placements (volcano, PCA) and the volcano's computed ranges they depend on;
- margins that hold annotations;
- the MNAR horizontal legend, the dynamic-range top margin, and always-drawn Study design tick labels;
- the PCA's extra 14 px of top margin, added only when a panel shows the constant-feature line under its panel title
  (added 2026-10-03 with the spectral counts level, §4h: the two-line panel title touched the subtitle on narrow
  figures). A PCA with no such line keeps the fixed top margin.
- the LFQ-vs-spectral log2FC scatter's one symmetric range on every panel's x and y, the reference's
  `_nice_limit(max |log2FC| × 1.04, 0.25)`, on square plot areas (added 2026-10-04, spectral round 3a, §4h). It is an
  encoding: the y = x reading needs equal, symmetric, shared axes, and Plotly has no option for a range symmetric about 0.
  Ticks are Plotly's.
- the q-with-vs-without-trend chart (0006a, §4i): both axes 0 .. the reference's computed limit (`ceil(1.3 × the largest −log10 q × 10) / 10`)
  on a square plot area (470 × 470 px), so the y = x diagonal is at 45° — an encoding of the comparison, as the log2FC scatter above; its
  "q = 0.05 / 0.10" guide texts sit in an 80 px right margin (annotations do not push the margin); the trend hits' labels are placed by
  the page's volcano method (coincident points share one stacked label; `quantCharts_Volcano__PlaceLabels`, now shared by both charts).
- the residual-SD-vs-abundance chart (0006a, §4i): the two prior values the reference writes beside the axes are in the key instead
  (as the CV medians, round 1); its y range and log ticks are Plotly's defaults (the reference's quarter-decade limits and fixed tick
  list are layout curated for one study).
- the detection classes' cumulative curves (spectral round 4b, §4h): x on a log scale bounded below at 1 (`autorangeoptions.minallowed`)
  with ticks at the decades, y bounded to 0–1.01 — the ECDF's own domain, the reference's limits (`set_xlim(1, None)`, `set_ylim(0, 1.01)`,
  decade labels); Plotly's default 2 / 5 log ticks ran together at the right end (observed). Plotly still sets the range inside the bounds.

## 4f. Chart group 6: acquisition (run) order (added 2026-10-02)

**Status 2026-10-23:** the run layout and run-half crosstab are COMMENTED OUT with the Study design block (decision log §24); the run-order controls and their effect on the kept charts (per-sample order, the boxplot's acquisition-order colors + key, the level-note items) are KEPT and now live in the "Run order" block above the Peptides level (`quantCharts_RunOrderControls_Component.tsx`, QCO-3).

**What.** Front end only (no service, webservice or submit change; no new npm dependency). Limelight stores no acquisition
order, so the run order comes from the submit's **sample sheet** (`quant_metadata.json`): the viewer picks the column.
- **Run order controls**, once per page at the top of the Study design block: *Run order from column* (default "none";
  page-session only) and *Order samples by* (run order / scan file; disabled while no usable column is chosen). The ordering
  rule and the columns not offered (with the reason) are stated under the controls.
- With a usable run-order column:
  - **Run layout** (Study design block) — reference `metadata_figures.py` `plot_run_layout`: one row per batch (batches
    sorted, the first at the top; tick text "<batch> (n = k)"), x = the within-batch run position, one marker per sample
    colored AND shaped by a category column (the reference's circle / square first), the sf label above the marker and its
    run-order value below it (the reference: sample id and "seq <n>"), a guide line per batch over that batch's runs only;
    title "Run order by <category> within batch (n = N)" and the subtitle "Stratified-by-batch exact permutation p = <p>
    (two-sided)" (or why it is not computed). *Compare run order with* picks the category (every complete column except the
    run-order column; default = the Study design crosstab's default bars column, i.e. the Differential abundance block's
    default compare column).
  - **Run-half crosstab** (Study design block) — `plot_condition_crosstab` with x = early / late (always both; a half with no
    sample counts 0), one bar per value of the same category column, the existing crosstab chart.
  - **Abundance boxplot colored by run position** (Processing block, every state panel) — each box (face, edge, whiskers,
    caps, fliers) takes the reference's `cmap(i / max(n − 1, 1))` on matplotlib's "cool" colormap for its acquisition rank i
    (`qc_figures/abundance_boxplot.py` `_draw_boxes`); the 256-entry lookup table lives in `quantCharts_Colors.ts`
    (`runOrder.coolColormap`, exported from matplotlib 3.11.2). A key above the boxplot shows the gradient (1 = first run …
    n = last run, the reference's colorbar), the samples in run order with their colors, and a generated note. The CV chart
    keeps the processing-state colors.
  - **Order samples by** reorders every per-sample chart of both levels — the boxplot panels and identification depth
    (its batch dividers appear once the batches are contiguous, as in the reference) — default run order when a usable column
    is chosen. DISPLAY ONLY: every statistic is computed once in scan-file order; the display permutes the computed per-sample
    results (verified: the page's computed objects are not recomputed and their values are unchanged). The correlation
    heatmap keeps its clustering order (computed in scan-file order; section 4a).
- The level note items 2 and 3 and the Study design block's "Differences" note describe the state drawn (section 2).

**Source rule (D1).** A column is offered when every quantified sample has a value and either
- every value is a plain decimal number (optional sign, digits with an optional fraction, optional exponent) — ordered by
  numeric value; or
- every value contains a digit 0-9 (dates / times, "run_034", file sequence numbers) — ordered *number-aware*: values are
  split into runs of digits and runs of other characters and compared run by run, digit runs by their whole-number value
  (leading zeros ignored), other runs character by character (UTF-16 code units); a prefix sorts first. A "." is an ordinary
  character (so "1.5" sorts before "1.10" in text mode; fixed-width timestamps are unaffected).

**Positions (D2)** — reference `metadata_characterize.py` `build_samples_table` + `common/design.py` `run_half_label` +
`loaders/samples.py`: batch = the submit's batch column (no batch column: all samples one batch); run position = the rank
1..n of the value within its batch; run half = the first ⌈n / 2⌉ positions "early" (the odd middle sample is early), the
rest "late"; acquisition order = batches sorted, then run position.

**Refusals (D4).** Two samples of the same batch whose values compare equal (same number, or text equal under the rule,
e.g. "seq 7" / "seq 007"), a blank value, or an unusable batch column → a warning naming the samples (sf label, scan file,
batch, value); no run-order charts; samples stay in scan-file order. Equal values in different batches are allowed (each
batch is ranked on its own; the reference requires distinct sequence numbers within an acquisition date). A column with a
blank cell is not offered at all (listed under the controls with the samples).

**Statistic (D5)** — the reference's stratified exact permutation test (`metadata_characterize.py` `hypothesis_h4` /
`exact_stratified_permutation_test`, shown on its run-layout figure): the category permuted independently within each
batch; statistic = the sum over batches of U (pairs of the two values in which the first runs earlier); two-sided p = the
fraction of all joint permutations with |2U − U_max| ≥ the observed. Every within-batch assignment is enumerated (the joint
counts by convolving the per-batch U counts — the same integers as the reference's `itertools.product`); the reference's
bound (2,000,000 joint permutations) is applied before enumerating: above it the subtitle says "not computed: too many
permutations" (no approximation). Not computed either for a category without exactly two values, or when no batch holds both
values (the reference leaves the p blank and draws no figure; here the chart is drawn without p). The p is printed like
Python's "{:.3g}" (exact decimal value of the double, ties to even). Cost: synchronous; the largest allowed design
(C(23, 11) = 1,352,078) takes about 50 ms.

**Deviations from the reference** (generated into the notes): the run order comes from the viewer's column (the reference
parses a sequence number from its file names); markers are labelled with sf labels and the column's values; the category is
any complete column (the reference: condition) and its colors follow this page's categorical rule; the permutation test needs
exactly two values; with no batch column all samples are one batch; the run-layout plot area grows with the labels
(positions are as wide as the longest label; 110 px per batch row) and its axis ranges are the reference's (Plotly's
autorange pads for the markers only: on the reference dataset it left the top row's 6 sample labels outside the plot
area, the reference's ranges none — observed; a readability override).

**Layout additions (§4e rule).** The keep-plot-area helper now also grows the side / top / bottom margins when the x-axis
title (centered over the plot) or the rotated y-axis title would reach past the figure edge (observed: a long run-half axis
title and a one-row run layout's y title were clipped); the ID-depth batch-label row is 24 px (at 18 px the labels touched
the subtitle when the dividers first appeared, observed).

**Verification (2026-10-02).**
- *Reference functions + published outputs (T1):* the reference's own sample sheet for the reference dataset (its
  `seq_number`, put in memory as a run-order column — no real submit has one): run positions, halves, batches and acquisition
  order equal its `samples.tsv`; the run-half crosstab equals its `crosstab_condition_run_half.tsv` (control 4 / 0,
  raloxifene-d0 0 / 4); the run-layout cells equal its `run_layout.tsv`; p = 0.05 over 40 joint permutations, U = 10 of 10,
  equal to its `hypotheses.tsv` H4 stratified row and to `hypothesis_h4` re-run; the subtitle text equals the reference's
  format. 353 random designs (1-4 batches, odd sizes, single-value batches) equal `exact_stratified_permutation_test`
  bit-for-bit (p, permutation counts); the bound refuses exactly where the reference raises; `run_half_label` for batch
  sizes 1-15; box colors for n = 1..40 equal matplotlib `to_hex(cool(i / max(n − 1, 1)))`; 1,633 p values print exactly as
  Python "{:.3g}". (3,171 checks + 670 unit asserts, 0 failures.)
- *Real page (T2, headless Chrome, all 5 local submits):* the dropdown offers only qualifying columns (real data: a tied date
  column → refused naming every tied sample; a one-sample submit's column → OK, no category note); in-memory test columns
  (labelled) for the rest — numbers, ISO timestamps, a tie (refused), a blank cell (not offered). For every state: positions /
  halves / order re-derived independently; boxplot boxes, medians, colors and category order, ID-depth order and counts,
  keys, run layout markers / shapes / labels / guide lines / p, run-half bars, notes — as drawn; toggling run order ↔ scan
  file ↔ none changes no computed number (value fingerprints and object identity) and makes 0 requests; console clean.
  2,121 checks, 0 failures. Text overlaps measured with ROTATED glyph boxes: 0 on every run-order chart.
- *Synthetic stress:* the real run-layout component (8-120 samples, 1-4 batches, 2/3/10 categories, ISO timestamps) and ID
  depth at 30 / 60 / 120 samples (scan-file and run order): 0 overlaps, 0 clipping. The ID-depth "crowding" at 120 samples
  reported earlier was a measurement artifact (axis-aligned boxes of rotated labels: 20 pairs; rotated glyph boxes: 0).

## 4g. Metadata columns: categories and value order (added 2026-10-03, maintainer decisions C1–C3)

Both rules live in ONE module, `quant/quantCharts/quantCharts_MetadataValues.ts`. Every consumer calls it; none
re-implements it.

**C1 — a column with a different value for every sample is not a category.**
- Examples: a run order, a sample id.
- Where it is left out: every category picker on the page — Differential abundance compare column + covariate, the Study
  design crosstab bars / x, "Compare run order with", PCA color-by.
- The run-order dropdown itself is unaffected (it is exactly where such a column belongs).
- The rule (`quantCharts_MetadataValues__IsDistinctPerSample`): at least 3 quantified samples, every one with a non-blank
  value, no two values equal (exact string equality).
  - The 3-sample minimum (`…__DISTINCT_PER_SAMPLE_MIN_SAMPLES`) keeps the rule from removing every column of a 1- or 2-sample
    run, where any two-group column would otherwise count as "all different". (Maintainer: keep, 2026-10-03.)
  - Exact matching means "7" and "007" are two different categories. (Maintainer: keep — a category is the label as typed;
    the run-order rule, where they tie, is about numeric position, a different question.)
- A picker left with no column shows the existing "not enough columns" style note, naming the left-out columns ("left out,
  a different value for every sample so not a category: …"). The PCA default color-by skips such a column.

**C2 — one number-aware ("natural") order for every metadata level.**
- Where it applies, everywhere the page orders a column's values:
  - color assignment and keys;
  - cohort / crosstab bars;
  - the Differential abundance reference / test lists and their defaults;
  - covariate treatment-coding levels;
  - batch order (completeness curves, ID-depth dividers, run-order acquisition order);
  - the permutation test's first group.
- It is the rule the run-order dropdown already used (§4f):
  - every value a plain decimal number → by numeric value;
  - otherwise digit runs compared as whole numbers and other runs by UTF-16 code units, a prefix first ("run 9" before
    "run 10"; "." is an ordinary character).
- The comparator: `quantCharts_MetadataValues__Compare`. The run-order code delegates to it.
- Level lists come from `quantCharts_MetadataValues__SortedDistinct`. It breaks rule-ties ("7" / "007", "1" / "1.0") by
  plain string order, so the order is total.
- Values without digits order exactly as before. On every local test run, no level order, color or default changed
  (observed).
- Deviation from the reference (recorded here only, no page note — maintainer, 2026-10-03): its Python `sorted()` uses
  plain code-point order, so the two orders differ where values mix digit counts (e.g. "B9" / "B10", "2" / "10").
  - That changes only ORDER: which color a level gets, the default DE reference / test levels, and the display order of
    batches (completeness curves, run-layout rows, the order across batches in run-order mode).
  - No computed statistic changes for a given selection.

**C3 — cohort counts.**
- Such a column has no cohort panel (it would be n bars of 1).
- The Study design block shows ONE line naming the left-out columns and why, covering the cohort counts and every category
  dropdown.
- The run-order charts are unchanged.
- **Correlation heatmap (maintainer, 2026-10-03):**
  - Such a column gets no stripe (`quantCharts_SampleMetadata__SplitStripeColumns`, the same rule and 3-sample minimum).
  - Each sample's value is added to the heatmap cell hover instead, e.g. "sf2 — <file> · run_order: 17".
  - One line under the heatmap names the column, in the C3 wording.

**Verification (2026-10-03).**
- Unit: the comparator, the rule, and every consumer on synthetic metadata ("2", "10", "100", "17" → 2, 10, 17, 100;
  "B9" before "B10"), plus the 6 local runs' real sample sheets (old vs new order identical).
- Live page, all 6 local runs: every dropdown's options, defaults and level lists, every PCA color-by option's key and point
  colors, and every DE compare option's levels, captured before and after the change.
  - Identical on the 5 runs without such a column.
  - On the run with a real run-order column, only that column leaves the category pickers and the cohort, and the one note
    appears.
- In-memory synthetic page cases: the natural order on a numeric column; a submit whose only columns are all-distinct (every
  picker empty, with notes; run order still works).

## 4h. Spectral counts (round 1): NSAF / PSM count (added 2026-10-03)

**What.** A THIRD level after Proteins, **"Spectral counts (proteins)"**: per protein × per sample PSM counts and NSAF,
computed in the browser from Limelight's filtered data, with the QC charts the reference analysis draws for its spectral
family (reference `scripts/promoted/qc_fig_spectral.py` on the `qc_prep.py` spectral states). Front end only. Round 1 = the
data matrices, the built-in check and the QC charts. Round 2 (differential abundance on spectral counts) is described in its
own subsection below, and so are round 3a (the "LFQ vs spectral counts (proteins)" block, charts 1, 2, 3, 5), round 3b (the LOWESS
port + chart 4), round 4a (the "LFQ vs spectral counts: per-run agreement" block) and its follow-ups (Math.log2 + the page's note;
the time-sliced bootstrap). Round 4b (detection classes, within-protein
tracking) is NOT built (no placeholders).

**Decisions (maintainer, D1-D8)** — as implemented:
- **D1 rows** = the quant run's FlashLFQ protein rows, in file order, matched by the protein sequence version id parsed from
  the row id (`psvid_<n>`, or the older `psvid_<n>_<name>`; one parser, `quantCharts_FeatureDisplay__ParsePsvid`). A row with
  several members, an unparsable row id, two rows with one id, or a protein with counted PSMs that is not a row → fatal.
  (All local test runs: single-protein rows only, every protein sent to FlashLFQ is exactly one row — observed.)
- **D2 shared PSMs**: a PSM counts once for EVERY protein its reported peptide maps to (as Limelight's protein page does);
  within a protein, distinct PSMs (each PSM is visited once; asserted per search).
- **D3 NSAF** per sample with the existing `NSAFAnnotationCalculator.getNSAFAnnotations`, called once per scan file over ALL
  rows (zero-filled); protein length from the filtered per-search protein info; a length that differs between the run's
  searches → fatal.
- **D4** no separate cutoff gate (the page's cutoffs come from the run's link); **D5** covers a mismatched URL.
- **D5 population + built-in check (every load).** The population is the filtered (cutoffs-only) per-search data: reported
  peptides → their proteins → their PSMs, no page-side filters. Check: per sample, the distinct PSMs counted (any protein,
  none included) must equal the run manifest's `scan_files[].psm_count`, and a mapped scan file that was not quantified must
  have none. Otherwise the level shows, loudly, which scan files differ and no charts.
- **D6 samples** = the LFQ samples (manifest scan files; zero-PSM files left out, same note as the LFQ levels).
- **D7 treatment** = the reference, per chart (table below). Zero = not detected. Contaminants are KEPT (as on the LFQ
  levels) — said in the level note.
- **D8 placement**: separator + heading as above Proteins; a measure toggle **NSAF (default) / PSM count** (page-session);
  the same four blocks (Differential abundance since round 2, below). The charts are the existing components, parameterized by a
  *measure* (`quantCharts_Measure.ts`: transforms + every measure-dependent text; the LFQ texts and arithmetic are unchanged —
  unit-checked string by string). Category rules (§4g), natural order, run order / sample order, colors and PCA color-by are
  the LFQ levels' (the same props). The level's container is marked `data-quant-charts-spectral-level` (not
  `data-quant-charts-level`, which marks the two LFQ levels).

**What `psm_count` counts (verified in source).** The flashlfq-service writes `"psm_count": len(f.psms)` per scan file
(`app/request_processor.py` `_write_manifest`), i.e. exactly the PSMs the webapp SENT. The webapp's submit
(`FlashLFQ_Run_GatherPsms_And_SendRequest_Service.gatherPsms_ForSingleSearch`) sends, per run search: the reported peptides
passing the cutoffs with ≥ 1 PSM (`ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service`), and for each
the PSM ids passing the cutoffs (`PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher`: decoy PSMs EXCLUDED,
independent-decoy PSMs INCLUDED); a PSM with no scan file makes the submit fail; a PSM whose reported peptide maps to no protein
is sent (empty protein list); protein mapping excludes decoy proteins (independent-decoy proteins kept). One more rule: the
submit DROPS the PSMs of a reported peptide whose mass cannot be computed (a non-standard residue such as U). The page's
filtered loaders call the SAME cutoff service and PSM-id searcher (the PSM-table and reported-peptide webservices, minimum 1
PSM per reported peptide; decoys excluded, independent decoys included), and their protein coverage is identical to the
submit's protein mapping on every local test search (read-only comparison: 0 pairs differ). So the populations match by
construction, except the mass-drop rule, which the page cannot reproduce without a mass calculation: on the local test data no
such reported peptide passes the cutoffs (observed), and if one ever does, the check fails loudly for that scan file.

**Treatment per chart (reference `qc_fig_spectral.py`)** — "complete" = detected (finite and > 0) in every sample:

| Chart | Rows | NSAF | PSM count |
|---|---|---|---|
| ID depth (one chart; PSM ≥ 1 ⇔ NSAF > 0, asserted) | all | detected count + median | same chart |
| Completeness (per batch + all runs) | all | detection | detection |
| MNAR (x = mean log2 of detected values, y = detection rate, Pearson r) | all | log2 NSAF | log2 count |
| Dynamic range (stable rank on −median, IQR band, orders) | all | linear → log2 | linear → log2 |
| Abundance boxplot (one as-is state, median range) | complete | log2(x + 1e-9) | log2(x), every count ≥ 1 asserted |
| CV (sd ddof 1 / mean; histogram + KDE + median) | complete | linear | linear |
| Sample correlation (Pearson, average linkage) | complete | log2(x + 1e-9) | **linear** |
| PCA (constant features dropped and counted, z-score, full SVD) | complete | log2(x + 1e-9) | **linear** |

No normalization, no batch correction ("as-is"); no contaminant exclusion.

**Layout (§4e rule).** The PCA's panel title names the measure and scale ("NSAF as-is · log2(NSAF + 1e-9)", "PSM count as-is ·
linear (no log)"); the subtitle does not repeat it. The PSM-count PCA is the first real PCA with a constant-feature line under
its panel title (integer counts equal in every sample); at the fixed 125 px top margin the two-line panel title touched the
subtitle on narrow (4-sample) figures (observed), so the PCA adds 14 px of top margin whenever a panel shows that line (no
LFQ panel on the local runs has one, so the LFQ PCA layout is unchanged).

**Level note** ("How these charts differ from the reference QC analysis", `quantCharts_ReferenceDeviationNotes__SpectralLevel`):
contaminants kept; counts computed from the run's filtered PSMs (checked against the run) — the reference read a Limelight
protein-table download; NSAF at full precision — the reference's download holds NSAF ROUNDED as the protein page displays it;
the sample order and boxplot-color items of the other levels. The Sample relationships note has no constant-feature item here:
the reference's spectral PCA also drops (and counts) constant proteins.

**Loaded on a click (follow-up, 2026-10-03).** The level is not loaded with the page. Until the viewer clicks its **"Show
spectral counts"** button, the level shows only its separator, heading, the button and a one-line note that it loads the PSM
data of the run's searches. While only the button is shown, the block has 40 px of space below it so it does not sit against the page
footer (maintainer, 2026-10-08; measured: the gap to the footer 0 → 40 px; after the click nothing moves). Before the click nothing spectral is requested or built: no PSM table request and no spectral
loader call. The reported peptide list, protein coverage and protein info are loaded either way, because the Proteins
level's names use them. On all 6 local runs, the page's requests before the click are the round-1 page's requests minus its
PSM table requests, in the same order (observed). The click loads the filtered PSM table data of each run search, one request per search, and then builds and draws
the level exactly as before: the same matrices, the same D5 check, the same charts, NSAF by default. If every search's data
is already loaded, the build is synchronous. While loading, the level shows its loading message. The UNAVAILABLE and
check-failed messages appear only after the click. Once shown, the level stays shown until the page is left.

**Load cost (local, observed).** The only extra request is the filtered PSM table data of each run search (about 4.5 MB for
the 8-file reference dataset, 481,426 PSMs). Before the click the JS heap equals the page without the level (reference
dataset about 84.3 MB). On the reference dataset the level was drawn about 0.6 s after the click (built about 0.3 s after
it) and added about 62.9 MB of JS heap and about 4,400 DOM nodes (13.7 MB and about 3,600 nodes on the 4-file runs). With
the round-2 Differential abundance block it is drawn about 0.75 s after the click and adds about 65.9 MB and about 7,700 DOM
nodes (14.6 MB and about 5,000 nodes on the 4-file runs). Toggling the measure makes no request.

**PCA "Color by" across a measure change (follow-up, 2026-10-03).** When the viewer picks a column in the spectral PCA's
"Color PCA points by" dropdown, a later measure toggle (NSAF ↔ PSM count) keeps that column if it is still offered (same
column, still a category, §4g). Otherwise the dropdown goes to the default column. The choice lives in the charts
component, which stays the same component when the measure changes. Only the matrix it draws is swapped, and its colorings
and PCA are rebuilt. The choice is kept for the page session only. On the real runs both measures have the same samples,
so the same columns are offered; the fallback to the default was checked with an in-memory test change and unit cases.
The LFQ levels' PCA behaves as before: their matrices never change, so the dropdown keeps the viewer's choice and starts
at the default.

**Verification (2026-10-03).**
- *Reference code on our data (P1):* the reference's own `qc_figures` functions (and `qc_prep`'s complete-set / log path),
  run on the page's exported matrices for every local run and both measures, contaminant exclusion off: ID depth, completeness
  curves, MNAR (x, y, r, trend, hexbin), dynamic range, boxplot statistics, CV (values, median, histogram, KDE), correlation
  (matrix, order, linkage), PCA (dropped count, variance ratios, scores). 836 comparisons, 0 failures: integers exact, floats
  ≤ 1.4e-12 relative. The reference's `plot_*` functions, called with the runner's parameters, give the same results.
- *Legacy protein page (P2, observed in the browser):* search 1115 at the run's cutoffs, "No Groups", all 8 sub-searches (one
  per scan file): per protein per sub-search PSM counts equal ours in all 34,752 cells; per-sub-search NSAF equals ours to
  5.3e-15 relative (summation order of the denominator).
- *D5 check (P3):* passes on all 6 local runs (every scan file equal; the zero-PSM file of the one-sample run has none).
- *Published reference numbers (P4, loose):* ID depth per sample, completeness and every PSM-count statistic equal the
  published values once the reference's contaminant exclusion is applied to our matrices; the page differs only by keeping
  contaminants (2,190 vs 2,168 complete proteins). The reference's own input matrices: PSM counts equal ours in every cell;
  its NSAF equals ours passed through the protein page's display formatting (3 decimals from 0.001 up, 3 significant digits
  below) in every cell. That rounding explains the remaining NSAF differences, including the 10 proteins its NSAF PCA drops as
  constant (none are constant at full precision).
- *Unit (P5):* 61 synthetic asserts (shared PSM, two searches, missing scan file, zero row, row-id formats, length mismatch,
  NSAF by hand for 3 proteins × 2 files, the check, the measure transforms, LFQ texts unchanged).
- *Page (P6/P7):* all 6 runs, both measures: every chart drawn (the one-sample run: boxplot, ID depth, dynamic range + the
  "≥ 2 / ≥ 3 samples" notes), no console error, no request on a toggle; no spectral chart has more text overlaps, clipping or
  hidden tick labels than the same chart on the Proteins level (after the PCA top-margin change above).
- *Every earlier check (the full Quant Charts check script, 28 sections) passes end to end on the final build.* Two counts
  moved, both explained: the resolved-color snapshot lists the new level's own styled elements after the unchanged earlier
  list (an exact prefix; both LFQ levels: no difference), and the real-run instance-field comparison has 6 more passing
  checks (one new instance field × 3 steps × 2 levels).

**Deviations (in the notes):** contaminants kept; NSAF unrounded; sample order / box colors as on the other levels.
Not a deviation: the reference also drops constant proteins from its spectral PCA.

### Round 2: differential abundance on spectral counts (added 2026-10-03)

**Status 2026-10-23: COMMENTED OUT** (decision log §24; marker `COMMENTED OUT 2026-10-23 (maintainer): not in the reference qc directory (decision log §24)`). The text below records what was built.

**What.** The spectral level now has the **Differential abundance** block for the selected measure (NSAF or PSM count). It is
the LFQ block's code, parameterized by the measure; no chart code was copied. The block holds:
- the volcano and the raw p-value histogram;
- the "How this is computed" panel;
- the Diagnostics with **only "p-values by design"**.

The p-values by abundance tercile and the residual SD by design are not drawn on this level, because the reference draws them
for the LFQ proteins only. The block's deviation note says so.

**Decisions (maintainer, R1-R6)** — as implemented:
- **R1 charts:** as above.
- **R2 inputs = the reference's transforms** (reference `de_raloxifene_vs_control.py` QUANTITIES + `load_quantity`):
  - NSAF: log2(NSAF + 1e-9).
  - PSM count: log2(count) with no pseudocount; every count must be an integer ≥ 1 (a fatal check, as the reference raises).
  - Proteins: round 1's complete set (detected in every quantified sample), the same alignment as the spectral boxplot, PCA
    and correlation.
  - No normalization and no batch correction.
  - Proteins with the same value in every included sample are dropped and counted, as on the LFQ levels.
  - Contaminants are KEPT, as everywhere on this page. The reference refuses its spectral DE with contaminants present, and
    the block's deviation note says so.
  - The LFQ block's "median-normalized state not available" gate does not apply: this level always has its as-is input.
- **R3 zero variance:** the LFQ rule is unchanged and is the reference's limma rule: residual variances are floored at
  1e-5 × the median and counted; the fit is refused when more than half are zero (median ≤ 0).
  - On this level "How this is computed" always states the floored count.
  - When the count is above 0, a generated line explains why: tied values (whole-number counts) can make a protein fit the
    model exactly, with a residual variance of zero.
- **R4 selection:** the level has its own Compare / Reference / Test / Covariate selection, with the LFQ levels' defaults and
  rules. It is kept when the measure is switched (NSAF ↔ PSM count) if it is still valid; otherwise the defaults apply.
  - "Still valid" = the compare column is offered, its two levels exist and differ, and the covariate is none or an offered
    column other than the compare column. It is all or nothing.
  - How: the viewer's last selection is held in the charts component, which stays the same component across the toggle (as
    the PCA "Color by" choice in round 1). When the matrix is swapped and the block is rebuilt, a pure keep-or-default function
    re-applies it.
  - The Peptides and Proteins levels keep their own, independent selections.
- **R5:** the reference's cross-quantity p-value chart is round 3. There is no placeholder.
- **R6:** the reference's primary design adjusts for the sample pair (`candidate_pair`). The page takes one covariate, and
  sample sheets here have no pair column (an existing deviation of the LFQ block, already in its note).

**What the local runs show (observed on the live page).** Compare = condition with covariate batch / none, or the 4-file runs'
default:

| Runs | Measure | Tested | Constant | Floored (batch / none) | Residual df |
|---|---|---|---|---|---|
| 8-file reference dataset (3 runs) | NSAF | 2,190 | 0 | 0 / 0 | 5 / 6 |
| 8-file reference dataset (3 runs) | PSM count | 2,189 | 1 | 3 / 0 | 5 / 6 |
| 4-file runs (2 runs) | NSAF | 317 | 0 | 0 / 0 | 1 / 2 |
| 4-file runs (2 runs) | PSM count | 310 | 7 | 20 / 12 | 1 / 2 |

The one-sample run shows only the "cannot be computed" message, as on the LFQ levels. No local comparison hits the median-0
refusal. Computing the block for the 8-file PSM counts takes about 8 ms.

**Verification (2026-10-03).**
- *Reference code on our data (V1).* The page's own results were exported from the live page. The reference's
  `differential_abundance(..., method="moderated")`, its constant drop, BH, Storey π0, volcano label ranking / grouping and
  the p-value histogram ran on the same proteins and samples.
  - The input is computed from the page's linear values with the reference's transforms. It equals the page's input bit for
    bit; the complete sets are identical.
  - Coverage: 18 distinct comparisons on 3 runs, both measures, covariate batch and none, reversed levels, and compare = batch.
  - Results: feature sets, constant and floored counts, d0, s0², residual df, terms, hits, π0, labels (set and order), label
    groups, volcano limits and histogram counts are equal. p and q agree to ≤ 1.6e-14 relative; SE, t, CI and effect agree
    on the SE scale to ≤ 3.1e-14 — the LFQ DE parity's criteria.
  - The p-values-by-design diagnostic uses exactly the p of the chosen and the no-covariate comparisons.
- *The published reference (V2).* Our spectral matrices were run through the reference's own preparation and runner:
  contaminants removed by the reference's flags, NSAF through the legacy protein page's display rounding (the reference read a
  rounded download), and its three designs (paired, batch, unadjusted).
  - The reference's states are reproduced exactly (2,168 proteins, every cell equal).
  - Every field of its published `summary.json` for `nsaf` and `psm_log2` is reproduced: tested 2,158 / 2,167, constant 10 / 1,
    floored 21 / 5 / 0 and 14 / 3 / 0, d0, s0², median log2 fold change, fraction positive, π0, calibration, median residual
    SD, 0 hits. Per-protein log2 fold change is bit-identical; p and q agree to ≤ 5e-13 relative (numeric library
    round-off).
  - Without the display rounding, 10 high-abundance proteins are no longer constant and the NSAF summary changes. This is why
    the page (full precision) and the published NSAF numbers differ.
- *Live page (V3), all 6 runs.*
  - The defaults follow the LFQ rule and equal the Proteins level's selection.
  - Everything drawn equals the computed result: volcano points per bucket, labels, the q line, min q, histogram,
    p-values-by-design traces, key counts, and every number in "How this is computed" (including the floored count and the
    tie line).
  - Only "p-values by design" is drawn among the diagnostics.
  - A changed selection is kept across NSAF → PSM count → NSAF, and its results equal the same comparison computed afresh.
  - 0 requests; console clean; the LFQ levels' selections are unchanged.
- *Unit (V4).*
  - The transforms; the PSM-count check (0, 2.5, −1, NaN fail).
  - A tie-heavy synthetic case: 17 floored proteins, equal to the reference's count on the same rows.
  - A median-0 refusal (the reference refuses too).
  - Selection keep / fallback cases.
- The LFQ blocks are unchanged: their parity sections give the same counts and numbers as before.

**Deviations (in the block's note):** contaminants kept (the reference refuses them); one covariate, no pair design; only
"p-values by design" among the diagnostics; plus the LFQ block's own items (left-out samples, labels, design colors).

### Round 3a: LFQ vs spectral counts (added 2026-10-04)

**Status 2026-10-23: COMMENTED OUT** (decision log §24; marker `COMMENTED OUT 2026-10-23 (maintainer): not in the reference qc directory (decision log §24)`). The text below records what was built.

**What.** A fifth framed block, **"LFQ vs spectral counts (proteins)"**, at the end of the spectral level, after its four
blocks. It is the reference's quantity comparison (its finding 0005), charts 1, 2, 3 and 5 of the five the maintainer adopted
(decision log §15, R3-Q1..Q8). Chart 4 (LFQ vs NSAF / PSM mean abundance with a LOWESS trend) was added in round 3b (below).
Front end only; no new request.
- It exists only after the "Show spectral counts" click (it is part of the spectral level).
- It always shows LFQ, NSAF and PSM count, whatever the NSAF / PSM count toggle shows.
- **One comparison drives everything:** the spectral level's Differential abundance selection (round 2). Changing that
  selection recomputes the block, with no request. The block's first line states it, e.g. "Comparison: condition,
  raloxifene-d0 vs control, covariate batch — as chosen in the spectral level's Differential abundance block above".
- Where the state lives: in the spectral level's charts component, the same component that holds that selection. The results
  are instance fields, rebuilt at one place: when the block's inputs, the sample metadata or the selection values change. A
  measure toggle that keeps the selection rebuilds the Differential abundance block but not this one, because it uses the same
  inputs and the same selection. Verified on the live page: the result object is identical across the toggle.
- If the spectral comparison is unavailable (the one-sample run), a fit refuses, or a level / the median-normalized state is
  missing, the block shows one message that names the fit(s) and why, and no charts.

**Data (R3-Q4, Q5) — exactly as the reference** (`scripts/scratch/de_raloxifene_vs_control.py` `common_set` :537-563 and the common
refit :623-639; `analysis_figures/quant_comparison.py` `load_comparison` :160-221):
- **Four full fits** under the one comparison, each with the existing moderated DE code. Each fit drops its own constant
  features over the included samples.
  - LFQ protein: the Proteins level's DE input (median-normalized log2 of the complete set). It is not the Proteins level's
    own selection.
  - LFQ peptide: the Peptides level's DE input (used for the p-values by quantity only).
  - NSAF and PSM count: both spectral DE inputs (round 2's transforms).
  - The LFQ inputs come from the levels' own code path. The alignment / DE-input derivation was moved into one shared helper,
    `quantCharts_LevelDeInput`, which the levels' charts component also uses. The block's LFQ inputs equal the levels' DE
    inputs in every value (checked on the live page).
- **Common set:** the LFQ protein ids tested, in LFQ tested order, kept when also tested for NSAF AND PSM count. Rows join by the
  FlashLFQ protein row id. The spectral rows are the FlashLFQ protein rows, so this is an exact id match; a repeated id stops
  the page.
- **Refit** each of LFQ, NSAF and PSM count on the common set with the same comparison: a new variance prior, new p and CI.
- **Values per protein** (from the refit): log2FC; residual SD (the unmoderated σ); CI half-width = (upper − lower) / 2. The refit's
  log2FC and residual SD are asserted equal to the full fit's within 1e-12 (fatal), as the reference asserts. **Mean log2
  abundance** = the full fit's mean over the included samples (numpy's pairwise summation, as the D2 terciles).
- Contaminants are kept (page rule).

**Charts (R3-Q1; numbers and encodings as the reference, Plotly decides the layout — §4e):**
1. **log2FC scatter** (`plot_log2fc_scatter`). Three panels (LFQ–NSAF, LFQ–PSM, NSAF–PSM); points `#404040` at 0.35; a dashed
   y = x line and zero lines in `#808080`; "Spearman ρ = x.xxx" (average ranks for ties; typographic minus) as the panel title (the
   §4e precedent: in-plot texts move to titles / keys). **Encoding kept:** x and y of every panel share ONE symmetric range,
   [−L, L] with L = the reference's `_nice_limit(max |log2FC| × 1.04, 0.25)`, on square 300 px plot areas. The y = x reading needs
   equal, symmetric, shared axes, and Plotly has no option for an axis range symmetric about 0. Listed in §4e's remaining
   overrides. Ticks are Plotly's. Key: "protein group (n = N)", "y = x".
2. **Precision distributions** (`plot_precision_distributions` / `_distribution_panel`). Residual SD and 95% CI half-width: per
   quantity a step density on bins of 0.025 from 0 to `_nice_limit(max, 0.1)`, a dashed median line in the quantity color;
   the medians in the key (3 decimals).
3. **Residual SD vs mean abundance** (`plot_sd_vs_abundance`). One panel per quantity on its own x, y shared (Plotly's range via
   `matches`); points in the quantity color at 0.35. The binned-median trend is black with markers: stable sort, `np.array_split`
   into 10 bins (larger first), median x / median y per bin. Panel title: the quantity label in its color, then "Spearman
   ρ = x.xx". The x labels are the reference's; the LFQ one says "mean log2 LFQ intensity, median-normalized (a.u.)" because the
   page's LFQ input is the median-normalized log2.
4. **p-values by quantity** (the reference's chart 5, `plot_pvalue_small_multiples` / `_draw_panel` as drawn by
   `fig_de_raloxifene_vs_control.py` :504-545). Four panels in 2 columns, shared axes (Protein, Peptide, NSAF, PSM count), each the
   FULL fit's raw p. 20 bins on [0, 1], density, bars `#E69F00` at 0.6 with white edges; a dotted uniform line and a dashed black π0
   line (Storey, λ 0.5). "π0 ≈ x.xx · n = N" is in the panel title. Panel labels are the reference's `Quantity(...).panel` labels;
   the page tests the same transforms.

Each chart is drawn by its own component; every number comes from one pure module (`quantCharts_LfqVsSpectral_Compute.ts`).
Notes: a generated "How this is computed" panel (the comparison and samples, the four fits' tested counts, how the common set is
formed and its n, the refit and its priors, values, the zero-SD counts, Spearman with ties, the bins) and a "Differences from the
reference QC analysis" note (contaminants kept; the comparison is the viewer's, one covariate, no pair design; NSAF at full
precision — the reference's display-rounded NSAF adds noise to its NSAF fold changes, so its NSAF–PSM ρ is lower than the ≈ 1
here; the LFQ axis label names the median-normalized input; left-out samples when there are any).

**Colors (R3-Q6).** The reference registry `state/color_registry.json`, category "quantity": LFQ `#0072B2`, NSAF `#E69F00`, PSM
`#009E73` — in `quantCharts_Colors.lfqVsSpectral` with the citation; neutral marks as the reference (`#404040`, `#808080`, black).
The block's generated "About these colors" note says that `#E69F00` (NSAF, and the p-value bars) is also the raw color of the
Processing blocks, "higher in the test level" and the p-value histogram bars in the Differential abundance blocks, and that
`#009E73` (PSM count) is also batch-corrected (Peptides / Proteins Processing) and the no-covariate design in the Diagnostics.
It also says that `#0072B2` is the first batch / metadata-value color. All of this is generated by comparing hex values, so it
follows any color change.

**Build choices** (not settled by the prompt; also in the decision log §15):
- The binned-median input order is the reference's table order: ascending LFQ common-refit p, then protein id. That order decides
  which of several proteins with the same mean abundance fall on either side of a bin edge, so it is kept for exact parity.
- "Residual SD of zero" uses the reference runner's test (`< 1e-10`, its `n_residual_sd_exactly_zero`). The panel also says how
  many are exactly 0 in the page's arithmetic when the two differ.
- Gap between panels: 90 px where each panel has its own y title (scatter, precision), 40 / 30 px where the y axis is shared;
  2 × 2 small multiples 300 × 220 px panels with a 64 px row gap for the second row's two-line titles.

**What the local runs show (observed).** Default comparison (condition, covariate batch where the run has one):

| Runs | Tested LFQ protein / peptide / NSAF / PSM | Common set | ρ LFQ–NSAF / LFQ–PSM / NSAF–PSM | Residual SD 0 (LFQ / NSAF / PSM) |
|---|---|---|---|---|
| 71b18c3b | 1,807 / 10,308 / 2,190 / 2,189 | 1,652 | 0.075 / 0.075 / 1.000 | 0 / 0 / 1 |
| da0ac6aa | 1,811 / 10,358 / 2,190 / 2,189 | 1,654 | 0.073 / 0.074 / 1.000 | 0 / 0 / 1 |
| ad72dfec | 1,821 / 10,413 / 2,190 / 2,189 | 1,657 | 0.068 / 0.068 / 1.000 | 0 / 0 / 1 |
| fa734de6 | 447 / 2,186 / 317 / 310 | 262 | 0.412 / 0.411 / 1.000 | 0 / 0 / 19 |
| a0ec0906 | 448 / 2,189 / 317 / 310 | 263 | 0.419 / 0.418 / 1.000 | 0 / 0 / 11 |

The one-sample run shows only the message. Compute time on the 8-file reference dataset: about 43 ms (synchronous).
**NSAF–PSM ρ ≈ 1 at full precision** (0.99966–0.999996 on these runs; shown as 1.000): per sample, NSAF = count / length /
Σ(count / length), so log2(NSAF + 1e-9) ≈ log2 count − log2 length − a per-sample constant. The length cancels in a fold change,
and the per-sample constant shifts every protein's NSAF log2FC equally. So NSAF log2FC ≈ PSM log2FC + one constant, and the
ranks are almost identical; only the 1e-9 pseudocount breaks the equality slightly. The scatter's NSAF–PSM points lie on a line
parallel to y = x. The reference's published 0.9784 comes from its display-rounded NSAF (verification V2 reproduces 0.9784 with
that rounding).

**Verification (2026-10-04).**
- *Reference code on our data (V1).* The live page's own inputs to the four fits were exported, with the selection and every
  number the block computed and drew. Cases: 71b18c3b (default with covariate batch, covariate none, reversed levels, compare =
  batch), fa734de6 (default, covariate none) and a0ec0906 (default). fa734de6 / a0ec0906 are the "tested sets differ by many
  proteins" case: 447 / 448 LFQ proteins tested, 262 / 263 in common. In the docker python the reference ran on those inputs:
  `differential_abundance(..., method="moderated")` with its `drop_constant_features`, `common_set`, `contrast_table` /
  `common_set_table`, `load_comparison` (all its checks), then the three figure functions and `plot_pvalue_small_multiples`
  (bins and densities captured from their own `Axes.hist`).
  - *Inputs:* the block's LFQ inputs equal the Peptides / Proteins levels' DE inputs in every value, and its spectral inputs equal
    the reference transform of the page's matrices bit for bit.
  - *Fits:* tested ids and order, constant counts, floored counts and df are identical. Effect, CI, SE ≤ 2.6e-13 of the SE; p / q
    ≤ 7.7e-13; d0 ≤ 1.3e-13; s0² ≤ 7.3e-14 relative.
  - *Table:* common-set ids and order identical; the table's row order equals the reference's `common_set_comparison.tsv` order;
    mean abundance bit-identical.
  - *Charts:* the reference's chart functions on the page's own table give exactly the page's numbers: scatter limit; Spearman
    ≤ 2.2e-16; precision bins, counts, densities and medians; zero-SD counts; binned medians and counts bit-identical; p-value
    counts, densities and π0.
  - *End to end* (the reference's own fits), counts and π0 are identical. Spearman differs by up to 5.2e-7 on the real runs
    because mathematically tied values (whole-number counts, true zeros) get different last bits in the two arithmetics. With
    values within 1e-10 ranked as ties, both sides form the same tie groups and give the identical ρ (checked per case).
  - *I/O:* the reference passes its tables through TSV files read with pandas' default float parser, which is not correctly
    rounded (≈ 21% of doubles come back 1 ulp off). The strict comparison therefore parses exactly. With the default parser,
    Spearman moves by up to 1.2e-6 through the same tie breaking (reported, not a page difference).
- *The published reference (V2).* Our NSAF / PSM matrices went through the reference's own preparation (its contaminant flags,
  the legacy NSAF display rounding, its paired metadata), with the reference's own LFQ protein / peptide states. Its states are
  reproduced exactly.
  - *(a) The reference runner end to end* (`de_raloxifene_vs_control.main` → `fig_quant_comparison.main`): the
    `common_set_comparison.tsv` ids and row order (1,640) are identical; the `summary.json` common-set block (every quantity ×
    design summary of the refit, the concordances) has 0 differences at 1e-12. Every key number is identical, including NSAF–PSM
    ρ 0.9784, the NSAF / PSM medians (residual SD 0.2419 / 0.2365, CI half-width 0.4177 / 0.405), zero residual SDs 19 / 8, and
    every NSAF / PSM trend bin median and count. Two exceptions: the full-precision Spearman of abundance vs residual SD for NSAF
    (−0.5362688 vs −0.5362683) and PSM (−0.6826040 vs −0.6826063). Cause, checked: the reference's code on the published files
    reproduces the published values exactly. Our re-run's residual SDs differ from the published by ≤ 1.3e-15 (environment, as
    round 2 found), and the NSAF / PSM residual SDs contain 8 / 17 near-ties. With values rounded to 12 significant digits, both
    give the identical ρ.
  - *(b) The page's own compute* on the same inputs, with covariate `candidate_pair` (= the reference's paired design), also with
    batch and none. Common set and row order equal the published table. Every key number (rounded as the reference rounds)
    equals the published one: the zero counts (19 / 8), all trend bin medians and counts, the p-values-by-quantity panels' n, π0
    (bit-identical) and 20-bin counts for protein, peptide, NSAF and PSM. All three designs' medians, n, refit priors (≤ 3e-16
    relative) and concordance ρ equal `summary.json`. The same two full-precision Spearman values differ by 4.2e-7 / 5.9e-6, from
    near-ties; with values within 1e-10 ranked as ties, both form identical tie groups (1,591 / 1,530) and give identical ρ.
  - *Loose (LFQ), reported:* with OUR LFQ proteins (71b18c3b, 1,768 of 1,801 matched by accession) the common set is 1,630, LFQ–NSAF
    ρ 0.0754 (published 0.0507), LFQ–PSM 0.0738 (0.0504), LFQ medians 0.1326 / 0.2256 (0.1349 / 0.2299), trend ρ −0.448
    (−0.459). Our FlashLFQ is a local re-run, so these are close but not equal.
- *Live page (V3, all 6 runs, observed):* the block is absent before the click and is the last of the level's five blocks after
  it. The measure toggle leaves its result object untouched. A selection change recomputes it with 0 requests. Its NSAF / PSM
  full fit IS the spectral DE block's result when that measure is shown. Every trace, the scatter's range on all six axes, the
  shared axes, the Spearman / π0 panel titles (formatted independently), the medians in the key and every number in the notes
  equal the computed result. The one-sample run shows only the message; the console is clean. Compute time for 71b18c3b: about
  43 ms.
- *Unit (V4):* Spearman with ties (hand values); `binned_median` with ties and n = 23 / 47; common-set order and the
  duplicate-id failure; the table order; the refit-equals-full assertion; every refusal path (a level's files missing, the
  median-normalized state failed, a full-fit refusal, < 20 common, a refit refusal, samples out of order, a duplicate input id);
  notes. The synthetic tie-heavy cases also went through V1's reference check (no failures).
- *Everything else unchanged (V5):* the full check script's sections give the same counts and numbers. Exceptions, each
  explained by the new block: the spectral level's block / chart checks via round-3a copies of the round-2 checkers (339 → 354,
  330 → 348 — +1 check per step for the new block), and the spectral layout check (104 → 136: the new charts vs their closest
  existing chart, no increase). The real-run instance-field comparison is unchanged (289); the new fields stay undefined on the
  LFQ levels.
- *Memory / load (observed):* on the 8-file reference dataset the click now adds about 75.6 MB of JS heap and 19,700 DOM nodes
  (65.9 MB / 7,700 before round 3a), and the level is drawn about 1.08 s after the click (0.74 s before). On the 4-file runs it
  adds 18.5 MB / 8,650 nodes, drawn in 0.53 s (14.6 MB / 5,000 nodes, 0.36 s before). Most of the extra DOM is the scatter and
  residual-SD points (2 × 3 panels × the common set).

### Round 3b: mean abundance, LFQ vs spectral counts, with a LOWESS trend (added 2026-10-04)

**Status 2026-10-23: COMMENTED OUT** (decision log §24; marker `COMMENTED OUT 2026-10-23 (maintainer): not in the reference qc directory (decision log §24)`). The text below records what was built.

**What.** Chart 4 of the reference's finding 0005 (decision log §15, R3-Q1 chart 4, R3-Q7, R3-Q8), in the "LFQ vs spectral counts
(proteins)" block between chart 3 (residual SD vs mean abundance) and chart 5 (p-values by quantity), so the block's charts read 1–5.
It completes round 3. Front end only; no new request; computed with the rest of the block, at the same one place, from the same
selection (a measure toggle leaves it unchanged).

**Reference.** `scripts/scratch/analysis_figures/de_supplementary.py` `plot_abundance_agreement` (:391-445, `_lowess` :384-389) as
`scripts/scratch/fig_de_supplementary.py` draws it (PANELS :88-91, the call :227-237, `--lowess-frac` 0.3).

**The chart.**
- Two panels in the reference's order: **LFQ vs PSM** (y = mean log2 PSM count) and **LFQ vs NSAF** (y = mean log2 NSAF); x = the LFQ
  protein mean log2 abundance. Both use round 3a's common set and table: each protein's mean of its full-fit input over the included
  samples (numpy's pairwise sum), in the reference table order. Each panel has its own axes (the reference's subplots share none);
  Plotly decides ranges and ticks (§4e).
- Points `#404040` at alpha 0.35 (key handle 0.6); the LOWESS trend `#000000`, line width 2 pt, drawn through the fit's rows (sorted
  x, fitted y; n rows, duplicates included). Colors reuse round 3a's entries in the color source (`lfqVsSpectral.scatterPoint`,
  `trendLine`); only the 2 pt width was added.
- Panel titles "LFQ vs PSM" / "LFQ vs NSAF" with "Spearman ρ = x.xxx" (3 decimals, typographic minus) as their second line (the
  reference's in-plot text, moved to the title as in round 3a). Chart title "Abundance level (mean over N included samples), M common
  proteins"; subtitle the reference's processing line. Key: "protein group (n = N)", "LOWESS trend (frac = 0.3)".
- The x label names the page's LFQ input, "mean log2 LFQ intensity, median-normalized (a.u.)", as chart 3 does; the deviation note's
  LFQ-axis item now names both charts.
- "How this is computed" has a "Mean abundance chart" item with the reference's published statistics per panel: n, Spearman,
  Pearson (computed as the reference does, not drawn), y min / max (4 decimals), and how the LOWESS fits (k neighbors, 3 robustness
  passes). The color note has one added sentence for this chart.
- If a LOWESS fit is not finite (the reference's `_lowess` raises), that panel draws its points without a curve and says why; the
  rest of the block is unaffected. No real run reaches this; the unit test does.

**The LOWESS port** (`quantCharts_Lowess.ts`). A line-by-line port of statsmodels **0.15.0** (the reference's environment; numpy
2.4.6): the wrapper `nonparametric/smoothers_lowess.py` for the reference's call (`missing="drop"`, delta 0, no `xvals`,
`return_sorted=True`) and the Cython core `_smoothers_lowess.pyx` (neighborhood, tricube weights, weighted local linear fit,
tie handling, bisquare robustness weights). Same arithmetic in the same order: the weight sum is numpy's pairwise sum (the existing
helper), every other sum is the core's sequential loop, the residual median is `np.median`.
- k = int(frac × n + 1e-10), clamped to [2, n]; 3 robustness passes after the first; a window with fewer than 2 weights above 1e-12
  keeps y.
- **Edge cases, as statsmodels behaves (checked against it):** a window whose x values are all equal (radius 0) gives 0 / 0 = NaN
  distances, so no weight counts and the fit is y at the tie group's first index, copied to the rest of the group — finite, so no
  refusal is needed; a residual median of 0 switches the robustness weights to 0 / 1 by "residual > 0"; non-finite pairs are
  dropped; an empty input returns an empty fit (statsmodels' observed result; its core reads past an empty array there).
- **Tied x (the one possible deviation).** statsmodels sorts with `np.argsort(x)` — numpy's default, unstable sort — and the fit
  depends on which tied y lands at which index (window edges, the first index of a tie group, the robustness weights). That order
  cannot be reproduced in general, so the port sorts **stably** (input order breaks ties; the page's input order is the table
  order). Without tied x both orders are the same and the result is identical. **No local run has tied LFQ mean abundances**
  (0 on all six runs and on the published inputs), so the page shows no tie note; the block's notes add a generated tie sentence
  and a deviation-note item only when a run has ties.
- Speed: about 30–38 ms per panel for about 1,650 proteins (k ≈ 495, 4 passes); the block's compute on the 8-file reference dataset
  went from about 43 ms to about 106 ms. Not optimized (the arithmetic order is kept as is).

**Verification (2026-10-04).**
- *LOWESS vs statsmodels (V1).* In the reference's docker python, statsmodels on the same inputs, every fitted value compared bit
  for bit:
  - real inputs from the live page (71b18c3b, fa734de6, a0ec0906, da0ac6aa, ad72dfec; every distinct selection, plus a test
    selection that leaves samples out): bit-identical on statsmodels' default path, with `is_sorted=True` on the port's order, and
    through the reference's own `_lowess`;
  - 22 synthetic cases (tied x incl. a tie group at a window edge, all-equal y, outliers past the bisquare cut, n = 0 / 1 / 2 / 3 /
    10, k at both clamps and the round-up, a radius-0 window, non-finite values, it = 0, an overflowing input, n = 1,650 with and
    without ties): bit-identical with `is_sorted=True` on the port's order; on the default path identical wherever x has no ties,
    and up to 3.0e-13 apart with ties (numpy's sort order, reported, not forced).
- *Statistics (V2 a).* The reference's `plot_abundance_agreement` on the page's own table: n and y min / max exact; Spearman within
  4.5e-16 and Pearson within 2.3e-15 of numpy, identical at the published 4 decimals. Both are `np.corrcoef`, whose cross-product is
  an OpenBLAS kernel chosen per CPU; only that product reproduces numpy's last bits (checked), so no portable summation order matches
  it bit for bit.
- *The published reference (V2 b, c).* The reference's own common table (its `load_comparison`, 1,640 proteins) through the page's
  code gives exactly the published numbers: LFQ–PSM n 1,640, ρ 0.8886, r 0.886, y 0.1981 to 10.9881; LFQ–NSAF ρ 0.7618, r 0.7676,
  y −17.8698 to −5.6826; the LOWESS on those inputs is bit-identical to statsmodels. The page's whole block compute on round 3a's
  reference-exact inputs (the reference's LFQ states, our NSAF / PSM through the reference's preparation) gives the published table
  order and every published number, including the spectral-only y ranges. Loose, with our LFQ proteins (1,630 common): LFQ–PSM ρ
  0.8887 / r 0.8869, LFQ–NSAF ρ 0.7618 / r 0.7694.
- *Live page (V3, all 6 runs, observed):* chart 4 sits between charts 3 and 5 after the click; its points and line equal the computed
  result; every mean abundance equals the pairwise mean over the included samples (also on a test column that leaves 2 of 8 samples
  out); titles, key and the "How this is computed" numbers are right; the measure toggle leaves the result object untouched; 0
  requests; the one-sample run shows only the block's message; console clean.
- *Unit (V4):* the LOWESS edge cases and properties, its parity cases (statsmodels, bit for bit), Pearson (hand values and numpy),
  the panels, the notes with and without ties.
- *Unchanged (V5):* charts 1, 2, 3 and 5 export exactly the numbers and drawn figures of round 3a's final run; the checks that list
  the block's charts take chart 4 in (same counts); the spectral layout check adds chart 4 against chart 3 of the same level, with
  no increase (136 → 144 checks). Every other section of the full check run gives the same counts and numbers.
- *Memory / load (observed):* on the 8-file reference dataset the click now adds about 77.7 MB of JS heap and 23,350 DOM nodes
  (75.7 MB / 19,700 after round 3a), drawn about 1.22 s after the click (1.08 s); on the 4-file runs 18.9–19.0 MB / 9,525 nodes,
  0.56 s (18.5 MB / 8,650, 0.53 s). The block's synchronous compute on the 8-file dataset is about 106 ms (43 ms after round 3a).

### Round 4a: LFQ vs spectral counts — per-run agreement (added 2026-10-04)

**Status 2026-10-23: COMMENTED OUT** (decision log §24; marker `COMMENTED OUT 2026-10-23 (maintainer): not in the reference qc directory (decision log §24)`). The text below records what was built.

**What.** A sixth framed block in the spectral level, **"LFQ vs spectral counts: per-run agreement"**, after the round-3 block: charts 1
(density) and 2 (per-run correlations) of the reference's finding 0010 (decision log §16, R4-Q1..Q10). Round 4b (detection classes,
within-protein tracking) is its own block after this one (see "Round 4b"). Front end only; no new request.
- It exists only after the "Show spectral counts" click and does not depend on the NSAF / PSM count toggle.
- The spectral Differential abundance selection sets only chart 2's marker shapes (R4-Q6). A selection change rebuilds only the shapes
  (and the deviation note that names the comparison), with no request; a covariate change rebuilds nothing of this block.
- Where the state lives: in the spectral level's charts component, in three tiers rebuilt at one place — the statistics when the block's
  inputs change (once per spectral data object), chart 2's order and batch colors when the run order, the sample order or the batches
  change, the marker shapes when the selection's comparison changes.
- One message and no charts when it cannot be computed: fewer than 3 quantified samples (the one-sample run); the Proteins level's files
  or its median-normalized state missing; a normalization that is not one factor per run; fewer than 10 cells with both an LFQ value and
  PSMs (the reference's LOWESS needs 10 points).

**Reference.** `scripts/scratch/abundance_agreement.py` (`load_all` :163-238, `section_correlations` :379-461, `corr_row` :335-356,
`section_trends` :476-518), `scripts/scratch/analysis/abundance_agreement.py` (`run_normalization_factors` :136-153, `correlation`
:292-304, `cluster_index_sampler` :307-334, `bootstrap_ci` :337-352, `LowessTrend` / `fit_lowess` :375-404, `slope_estimates` :407-435),
`scripts/scratch/analysis_figures/abundance_agreement_figs.py` (`plot_density` :336-454, `plot_per_sample` :460-554, colors :90-107).

**Data (R4-Q3).** One cell = one run × FlashLFQ protein row (contaminants kept, page rule).
- **LFQ value** = log2(raw intensity × the run's factor), **no +1** (the other blocks use log2(x + 1)). The factor is the median, over
  the rows of the median-normalized protein file, of normalized ÷ raw; that file holds the proteins measured in every run (the service's
  complete-case normalization). The factor must be constant within each run to 1e-9 (observed largest deviation 3.3e-16), as the
  reference checks. A raw value that is 0, NaN or empty is "not detected".
- PSM cell = log2(PSM count), count ≥ 1; NSAF cell = log2(NSAF), NSAF > 0, at full precision. Common cells = LFQ present and PSM present,
  pooled over every run and protein in the reference's mask order (run by run, protein rows in file order). The protein row is the cell's
  cluster in the pooled bootstrap.
- ~~Every logarithm here is correctly rounded (a double-double log2).~~ **Superseded (follow-up R4-F1):** the cell values use
  JavaScript's `Math.log2`, as every other block. (The 4a note that "V8's Math.log2 was 1 ulp off on 14 of 69,966 cell values" was
  measured in Node.js; in the page's browser, Chrome 153, `Math.log2` gave numpy's value on every cell — see "Round 4a follow-ups".)

**Chart 1, density** (`plot_density`). Two panels, LFQ vs log2 PSM count and LFQ vs log2 NSAF.
- matplotlib-exact hexbin (the existing port; gridsize 60 × 42, mincnt 1); x extent [floor(min), ceil(max)] shared by both panels, y extent
  [floor(min) − 0.5, ceil(max) + 0.5] per panel. Plotly has no hexbin: the hexagons of one shade are one filled trace (each hexagon a
  closed segment), with a hairline edge in their own shade as in the MNAR chart.
- One log color scale for both panels: LogNorm from 1 to the largest hexagon count of the two panels, on the reference's "Greys" from 18%
  to 92% (256 entries generated from the reference's own colormap definition); a colorbar "cells per hexagon (log scale)", ticks 1 / 3 /
  10 / 30 / 100 / 300 up to that count.
- The LOWESS trend (`fit_lowess`: frac 0.3, 3 robustness passes, **delta = 0.5% of the LFQ range**), duplicate x collapsed to their first
  fitted value, drawn on 200 evenly spaced LFQ values with numpy's interpolation; vermillion `#D55E00`, 2.2 pt.
- The SMA line (descriptive: slope = ± sd(y) / sd(x) with the sign of the correlation, through the means), from min to max LFQ; sky blue
  `#56B4E9`, dashed.
- Panel titles carry the reference's in-plot text (§4e): "LFQ vs PSM", "Spearman ρ = 0.861 [0.849, 0.872]", "SMA slope = 0.84
  (descriptive)". Axis labels are the reference's; the subtitle gives the cell, protein and run counts. Plotly decides the ranges.

**Chart 2, per-run correlations** (`plot_per_sample`). Two stacked panels on one x: the runs in the page's current order ("Order samples
by"); batch dividers only when the batches are contiguous in that order (the ID-depth rule, now one shared helper).
- Per run: Spearman ρ over that run's common cells with its 95% bootstrap interval as an error bar; marker and bar in the run's batch color
  (the page's categorical rule; no usable batch column → the uncolored gray); marker shape = the spectral comparison's reference level
  (circle), test level (triangle), other runs (square); with no comparison every marker is a circle.
- The pooled ρ as a dashed `#808080` line and its interval as a `#d9d9d9` band. Panel titles "LFQ vs PSM: pooled ρ = 0.861 · per run
  0.856–0.874"; subtitle with the n range; a key with the batch values, the comparison levels, "pooled ρ (all runs)", "pooled 95% CI".
  The y range is Plotly's (the reference's pooled ± 0.05 is layout).

**The LOWESS delta path (R4-Q2).** The round-3b port gained statsmodels' `interpolate_skipped_fits` and `update_indices` with delta > 0
(line by line from `_smoothers_lowess.pyx`); `delta` is a REQUIRED argument, and round 3b's chart passes 0.0 (unchanged).

**The bootstrap (R4-Q1).** The reference's algorithm: pooled — whole proteins resampled with replacement and expanded to their cells in the
reference's order (`order` / `starts` / `within`); per run — every protein a singleton, so `integers(0, n, n)`. The statistic is Spearman on
the resampled cells (undefined draws dropped); percentile interval with numpy's linear quantiles at 2.5% / 97.5%; 2,000 resamples. Build
choices (decision log §16):
- **Generator:** xoshiro128** seeded by splitmix64 from **20260924** (the reference's seed), unbiased integers by Lemire's method (the method
  numpy uses below 2^32); one stream in a fixed order (PSM pooled, then each run in scan-file order, then NSAF likewise). The page shows the
  same intervals on every load (checked by reloading). The integer source is injectable — the verification feeds numpy's own draws.
- **Ranks by counting:** each resample's average ranks come from the original values' tie groups (O(n)), exactly the numbers the page's
  Spearman would compute (unit-tested bit for bit); a comparison sort would take about 70 s instead of 3.5 s on the 8-file dataset.
- The statistic uses the page's Spearman arithmetic (round 3's helper), so a draw can differ from numpy's correlation by about 3e-16 (BLAS
  dot products); numpy computing the draws in the page's arithmetic gives the page's draws and intervals bit for bit.

**Tied LFQ values.** In each run, the protein at that run's median gets exactly the normalization target as its LFQ value, so the 8-file
runs have one tie group of 8 cells (one per run) and the 4-file run fa734de6 one of 3. The LOWESS port sorts stably (cell order), while
statsmodels' unstable numpy sort may order tied points differently. On the local runs statsmodels' default path differs from the page's
trend by up to 2.0e-13 (da0ac6aa PSM; 4 of the 10 real panels differ at all), while statsmodels given the page's order is bit-identical on
every panel. Which order numpy picks depends on its sort implementation, so the reference's own result at
tied values is not fixed either. The block's notes say so when a run has ties.

**Notes.** "How this is computed": the cells and counts, the LFQ value and the per-run factors, the PSM / NSAF transforms, the pooled and
per-run n, Spearman with ties, SMA as descriptive, the LOWESS settings incl. delta, the hexbin, the bootstrap (algorithm, 2,000, generator +
seed, "values may differ slightly from other software's draws"). The deviation note: contaminants kept; NSAF unrounded; the LFQ from this
run's FlashLFQ; the bootstrap generator differs from numpy's; the comparison levels define the marker shapes (the reference: its
conditions) and the runs are in the page's order; the tie item when there are ties. A generated color note (the shades, the fit lines, the
markers, and where `#D55E00`, `#56B4E9`, `#808080`, `#d9d9d9` mean something else on the page).

**What the local runs show (observed, live page).**

| Run | Common cells (proteins) | Max / hexagon | ρ LFQ–PSM [95% CI] | ρ LFQ–NSAF [95% CI] | SMA slope PSM / NSAF | Per run (PSM) |
|---|---|---|---|---|---|---|
| 71b18c3b | 20,151 (3,422) | 248 | 0.861 [0.849, 0.872] | 0.785 [0.769, 0.799] | 0.843 / 0.912 | 0.856–0.874 |
| da0ac6aa | 20,171 (3,423) | 261 | 0.860 [0.847, 0.871] | 0.784 [0.768, 0.799] | 0.844 / 0.913 | 0.855–0.873 |
| ad72dfec | 20,170 (3,423) | 253 | 0.860 [0.848, 0.872] | 0.784 [0.768, 0.799] | 0.843 / 0.912 | 0.854–0.874 |
| fa734de6 | 1,585 (549) | 41 | 0.789 [0.747, 0.826] | 0.710 [0.658, 0.752] | 0.813 / 0.900 | 0.779–0.798 |
| a0ec0906 | 1,586 (549) | 41 | 0.791 [0.749, 0.827] | 0.712 [0.662, 0.754] | 0.814 / 0.900 | 0.778–0.803 |

The one-sample run shows only the message. The reference published (contaminants excluded, its own FlashLFQ run): 20,114 cells, 3,414
proteins, ρ 0.863 [0.850, 0.874] / 0.786 [0.772, 0.801], SMA 0.842 / 0.906, at most 251 cells per hexagon.

**Speed (observed; round 4a, before the follow-ups -- the bootstrap is now time-sliced, see "Round 4a follow-ups").** The block is computed synchronously on the click. On the 8-file dataset it takes about 5.6 s in the browser, of which
the bootstrap is 5.4 s (pooled 1.6 s, per run 3.7 s; LOWESS 0.12 s, the rest under 0.15 s); on the 4-file runs about 0.5 s. The click to
drawn time on the 8-file dataset grew from about 1.2 s to about 7 s. Not changed (correctness first; the arithmetic is fixed); the options
are in the round-4a report.

**Verification (2026-10-04).**
- *Reference code on our data (V1).* The live page's own inputs and results (71b18c3b, fa734de6, a0ec0906) went through the reference's
  functions in its environment (numpy 2.4.6, statsmodels 0.15.0, matplotlib 3.11.2): `run_normalization_factors` (factors bit-identical,
  spread 3.3e-16), the LFQ / PSM / NSAF cell values and the pooled cell order (bit-identical; with the correctly rounded log2 then, and
  with Math.log2 in Chrome since the follow-ups -- the check now allows 1 ulp, see "Round 4a follow-ups"), the
  counts, `correlation` and scipy's `spearmanr` (pooled and per run, ≤ 2.2e-16), `slope_estimates`' SMA (slope ≤ 1.5e-14, intercept
  ≤ 3.7e-13), statsmodels' LOWESS with the reference's delta given the page's order and `fit_lowess`'s collapse + 200-point grid on it
  (bit-identical), matplotlib's hexbin (every count and center), the shared vmax and every hexagon's color through LogNorm + the Greys
  colormap (0 of 4,692 hexagons differ). statsmodels' default path end to end is bit-identical except where tied LFQ values meet numpy's
  sort order (fa734de6 NSAF, up to 3.6e-15; explained above). 119 checks, no failures.
- *The LOWESS delta path (V2).* 18 synthetic cases (skipped runs at delta 1% / 5%, delta above the spacing and above the whole range, tie
  groups inside delta, a radius-0 window, n = 10 / 11 / 25, it = 0, all-equal y, outliers, gaps, unsorted input) and the 10 real pooled
  panels: bit-identical to statsmodels given the port's order in all 28; on statsmodels' default path bit-identical in every case without
  tied x (differences only where x ties, at most 2.0e-13). Round 3b's LOWESS checks (delta 0) are unchanged (22 synthetic cases and the
  real inputs bit-identical, unit 48 / 0).
- *The bootstrap (V3).* (a) numpy's own drawn integers (`default_rng(20260924).integers`, recorded inside the reference's
  `cluster_index_sampler` / `bootstrap_ci`) fed to the page's code, for every statistic of 71b18c3b and fa734de6 (28: pooled and each run,
  both panels): identical resamples (2,000 / 2,000 checksums, every integer consumed); the page's quantile on numpy's own 2,000 draws gives
  numpy's interval bit for bit (28 / 28); numpy computing each draw with the page's statistic arithmetic gives the page's draws and
  intervals bit for bit (28 / 28). With numpy's own correlation (BLAS dot products) single draws differ by at most 3.3e-16 and the intervals
  by at most 2.2e-16. (b) The page's own generator against numpy's on the same data: every numpy interval end lies within 2.6 Monte-Carlo
  SD of the page generator's distribution over 200 seeds (none beyond 3 SD). (c) A reload shows identical ρ and intervals.
- *The published reference (V4).* The reference's published per-cell table (`cells.tsv`, 6 significant digits, contaminants excluded)
  through the page's compute: 20,114 cells, 3,414 proteins and at most 251 cells per hexagon exactly; pooled ρ 0.862741 / 0.786359
  (published 0.862741 / 0.786358); per-run ρ within 5.0e-6 and every per-run n equal; SMA 0.842308 / 0.906266 with intercepts −17.1173 /
  −34.7953 (published 0.842308 / 0.906265, −17.1173 / −34.7953); the LOWESS grids within 6.6e-5 of `trend_lowess.tsv` (published at 6
  digits). The reference's own functions on the same rounded cells agree with the page's compute to round-off (ρ ≤ 2.2e-16, SMA ≤ 1.5e-14,
  hexbin identical, LOWESS ≤ 2.2e-12 because the rounding creates 4,073 tied cells), so the differences from the published numbers are the
  cells' rounding. The page's intervals vs the published ones: all 36 ends within 4 Monte-Carlo SD (SD from 200 seeds; largest 3.1 SD,
  AZ908 NSAF lower end, where the published value is at the page's 5% quantile).
- *Live page (V5, all 6 runs, observed):* absent before the click, the last block after it; every drawn number equals the computed result
  (hexagon polygons, colors, colorbar, LOWESS and SMA lines, markers, error bars, shapes, colors, band and line, titles formatted
  independently, axis labels, autorange); the NSAF / PSM toggle leaves the result, the order and the shapes untouched; swapping the
  comparison's levels rebuilds only the shapes and the deviation note; a covariate change rebuilds nothing; choosing the real run-order
  column (ad72dfec) reorders chart 2 to the acquisition order and draws the batch dividers (the batches are then contiguous); 0 requests
  for every step; the one-sample run shows the message; console clean. 259 checks, no failures.
- *Unit:* the generator against the authors' reference C (2,000 outputs; 10 integer ranges × 3,000 draws), the 64-bit product, uniformity,
  the cluster sampler against numpy's formulas, counting ranks equal to Spearman on the resample (real data, bit for bit), the interval's
  edge cases, the log2, numpy's interpolation, SMA, every refusal and fatal check, determinism, order / batches / shapes, the notes (65 / 0).
  The log2 against a 60-digit reference: 499,444 values, 0 differences (V8's Math.log2: 189). (Superseded by the follow-ups: the helper
  and its unit checks are gone; the log2 comparison is now a report, see "Round 4a follow-ups".)
- *Everything else unchanged (V6):* every section of the full check run gives the same counts and numbers as round 3b's final run, except
  the spectral layout check (144 → 160: the two new charts against the MNAR chart and ID depth, no increase) and the memory / timing
  section (below). The round-3 block's checks and numbers are identical (1,993 / 1,060 / 1,200 checks; its compute about 104 ms).
- *Memory / load (observed):* on the 8-file dataset the click now adds about 85.7 MB of JS heap and 31,050 DOM nodes (77.7 MB / 23,350
  after round 3b) and the level is drawn about 7.0 s after the click (1.22 s); on the 4-file run 22.2 MB / 13,050 nodes, 1.13 s (18.9 MB /
  9,525, 0.56 s).

### Round 4a follow-ups: Math.log2 + the page's note (R4-F1), the time-sliced bootstrap (R4-F2) (added 2026-10-04)

**Status 2026-10-23:** the `Math.log2` box (R4-F1) is KEPT; the time-sliced bootstrap (R4-F2) is COMMENTED OUT with round 4a (decision log §24).

Maintainer decisions R4-F1 / R4-F2 (decision log §16, with the build choices). Front end only.

**R4-F1 — JavaScript's `Math.log2` everywhere.** The per-run block's three cell logarithms (LFQ, PSM count, NSAF) use `Math.log2`; the
correctly rounded log2 added in round 4a is no longer used anywhere. "How this is computed" says "Logarithms are JavaScript's Math.log2
(see the note at the top of the page)". The standing rule (front-end `CLAUDE.md`, "JavaScript built-ins"): use built-ins, report their
differences from a reference, never replace them.

**The note at the top of the page (R4-F1; restyled, re-worded and placed by R4-F3, BUILT 2026-10-05).** ONE **info** box (the MBR
explanation's information styling, site class `info-box-colors` since COL-5: neutral border, the blue left rule, the pale ground; not a
warning), on every run. **Since T-14 (2026-10-08) its text is one static sentence with no counts:**

> Logarithms use the browser's `Math.log2` and `Math.log10`. In our tests they matched numpy's `np.log2` / `np.log10`, or differed only in
> the last binary digit (about 2 × 10⁻¹⁶ relative) on a small fraction of values; no visible result is affected.

(History: from R4-F3 to 0006b the box gave measured counts — Chrome 153 equal to `np.log2` on all 3,779,022, later 3,780,161, page calls;
Node.js 24 differing on 1,449; and from 0006a a `Math.log10` sentence with its counts — re-measured by every full check run. T-14 replaced
them: a 1-unit-in-the-last-digit difference changes no visible result, and re-measuring every round was not worth the run time.)

- **Placement rule:** below any warning box at the top of the page and, since 2026-10-14, directly below the MBR-repeatability box
  (section 2; decision log §21), above everything else. The warning boxes that can appear
  there: the normalize-failed banner (rendered above the Charts view, in the page's main content) and the not-quantified note (rendered
  first in the Charts view — moved above the MBR explanation by R4-F3 so that warnings come first). The not-quantified note is the only
  one in the local runs (e96db9a6); the order with both was checked with in-memory test warnings: banner, not-quantified note, info box,
  MBR explanation. (The gate messages replace the whole view; the cutoffs-refused message is not rendered by this page.)
- (R4-F1 first built it as an amber warning box with Chrome-only numbers, 2026-10-04.)
- **The text is static** (`quantCharts_MathLog2Note.ts`) and has no counts (T-14); the differences are **not measured per round** — the
  full check run checks only that the box is present once, below any warning box (directly below the MBR-repeatability box since
  2026-10-14), with exactly that sentence.
- **How it was measured (2026-10-04, history — no longer re-measured, T-14).** M = every `Math.log2` call the Charts view makes on the 6 local runs (page load with
  both LFQ levels, "Show spectral counts" with NSAF including the per-run block, then PSM count), recorded in Chrome 153 with Chrome's own
  result: 3,779,022 calls (2,203,551 distinct arguments per run) from 8 functions, all Charts view code (boxplots / normalized states, the
  measure transforms, MNAR, dynamic range, sample relationships, the per-run block). N = how many differ from numpy 2.4.6's `np.log2` of
  the same argument: 0. E = the largest change of any number the per-run block computes or draws, this build vs the round-4a build
  (correctly rounded log2): 0 (989,412 computed and 215,552 drawn numbers identical on the 6 runs). Chrome 153's `Math.log2` was also
  correctly rounded on all 499,444 values of round 4a's log2 test set (numpy's `np.log2` was not on 18 synthetic ones).
- **Why round 4a saw differences.** Its numbers ("1 ulp off on 14 / 17 cell values, LOWESS moved by 1.6e-12") came from Node.js 24, whose
  older V8 `Math.log2` differs from `np.log2` on 1,449 of the 3,779,022 page calls (1 ulp each). With that engine the per-run block's cell
  values move by 1 ulp on 43 cells, its LOWESS fit by up to 3.9e-12 and its drawn LOWESS line by up to 2.8e-12; ρ, the intervals, SMA and
  the hexagons do not change. Other browsers or older Chrome versions may behave like that engine; no visible result changes either way.

**Parity checks (R4-F1).** Only the reference-code check on the page's own data had been exact through the helper. It now allows for the
difference, with the cause stated and every delta printed: cell values (LFQ, log2 PSM, log2 NSAF) within 1 ulp of numpy's; the LOWESS fit
and grid run by statsmodels on numpy's cell values within 1e-11 (measured up to 3.9e-12 with Node's `Math.log2`); and a new check runs
statsmodels on the page's OWN cell values, which must stay bit-identical (the port's arithmetic alone). On the live page every delta is 0;
on the page's compute run in Node.js the deltas are as just listed, all within tolerance. The LOWESS-delta check and the published-cells
check never depended on the log2 (they use the page's cells and the published cells). Rounds 1–3b used `Math.log2` all along; their
checks are unchanged.

**R4-F2 — the time-sliced bootstrap.** Run at once, the bootstrap froze the page for about 7 s on the 8-file dataset.
- **Same numbers.** The bootstrap is a resumable job that draws one resample per step; the block's statistics (`…__Pending`) run the
  jobs in the same fixed order from the same generator (PSM pooled, then each run in scan-file order, then NSAF likewise). The one-call
  functions the tests use run the same job to the end, so there is one arithmetic path. Proven: the pre-change synchronous code and the
  sliced runner agree on every number of the result for all 6 runs and 4 slicings (one call, one resample per slice, 50 ms slices, random
  0–5 ms slices; 3,957,648 numbers, 0 differing), and the live page's every ρ and interval end equals round 4a's on all 6 runs.
- **What runs when.** Everything but the bootstrap (cell values, Spearman, SMA, LOWESS, hexbin; about 0.16 s on the 8-file dataset)
  is still computed synchronously in the render that starts it, so refusals and fatal checks behave as before. The resamples then run in
  slices of about 50 ms of work, each in its own task (a zero-delay timer), so input and painting happen between slices. **This is the
  one deliberate exception to the page's synchronous path when the data is already loaded** — the work is long (code comment in the
  Charts content component).
- **What shows meanwhile.** The block keeps its frame and heading; in place of its content an inline box reads "Computing the per-run
  agreement charts (density and per-run correlations, 2,000 bootstrap resamples) … 40%", the percentage being completed resamples /
  all resamples (36,000 on an 8-run dataset), rounded down. Only that box re-renders per slice. Nothing of the block (charts, keys,
  notes) is drawn until the last resample; then it draws as before.
- **Lifetime.** The job is identified by a generation number held in an instance field: leaving the page (unmount) or a data reload (a new
  inputs object) increments it and cancels the pending slice, so the old job stops and nothing stale is drawn. A comparison change only
  rebuilds the marker shapes and does not restart it; the NSAF / PSM toggle does nothing to it; the rest of the page stays usable (a hover
  on another chart is answered within about 0.07 s mid-computation, observed).
- **Timing (observed, 8-file dataset).** About 5.6 s of work over about 6.7 s elapsed (the gaps between slices); click to drawn about
  7.4 s (7.0 s before), during which the page responds. The cell values are about 0.12 s faster than in round 4a (Math.log2).
- **Verification.** Unit tests (the job equals the one-call function draw for draw; progress, slicing and refusal behavior; the note's
  text), the offline and live bit-identity above, and a live driver on the page: the box and its percentage advancing, no chart of the
  block before 100%, a real mouse hover on another block's chart mid-computation, a comparison change and the measure toggle
  mid-computation (same job, not restarted), a data reload and an unmount mid-computation (the old job stops; the new one completes with the
  same numbers), a page reload mid-computation, console clean.

### Round 4b: LFQ vs spectral counts — detection and within-protein tracking (added 2026-10-05)

**Status 2026-10-23: COMMENTED OUT** (decision log §24; marker `COMMENTED OUT 2026-10-23 (maintainer): not in the reference qc directory (decision log §24)`). The text below records what was built.

**What.** A seventh framed block in the spectral level, **"LFQ vs spectral counts: detection and within-protein tracking"**, after the
per-run agreement block (R4-B1): charts 3 (detection classes) and 4 (within-protein tracking) of the reference's finding 0010 (decision log
§16, R4-Q4..Q6, R4-B1, R4-B2). Front end only; no new request. With this, spectral rounds 1–4 are complete.
- It exists only after the "Show spectral counts" click and does not depend on the NSAF / PSM count toggle (it uses the PSM count, as the
  reference's figures do).
- **It draws at once**, in the render that computes it (about 16–22 ms on the 8-file dataset in the browser, about 2 ms on the 4-file runs,
  observed): it never waits for the per-run block's time-sliced bootstrap. On the 8-file runs it is drawn about 1.4 s after the click while
  the per-run block is still computing (it finishes about 7.5 s after the click).
- **One code path for the cells.** The per-run block's cells (one run × FlashLFQ protein row with an LFQ value or PSMs; "LFQ present" = the
  raw intensity is a number above 0; "PSM present" = at least 1 PSM) are now built ONCE per spectral data object, by the per-run block's
  own builder, and the same object is handed to both blocks. The builder gained the raw PSM count per cell (chart 3's numbers); the per-run
  block's numbers, refusals and timing attributes are unchanged.
- Where the state lives: in the spectral level's charts component, rebuilt at one place in three tiers — chart 3 and chart 4 (panels a, c)
  when the block's inputs change; chart 3's sample order and batch dividers when the run order, the sample order or the batches change; the
  pair-column choices, the pair panels and the notes when the spectral comparison, the sample-sheet columns (compared by value) or the
  viewer's pair-column choice change. A pair-column change rebuilds only that tier (0 requests).
- One message and no charts when the block cannot be computed: the Proteins level's files or its median-normalized state missing, a
  normalization that is not one factor per run (the per-run block's reasons), or the Peptides level's raw file missing (the LFQ-only check).
  Chart 4 alone has its own message below 3 quantified samples (a correlation across 2 samples is always ±1) or with no protein quantified by
  both in every run; chart 3 is then still drawn (the one-sample run).

**Reference.** `scripts/scratch/abundance_agreement.py` (`section_detection` :1097-1135, `section_within` :1330-1507),
`scripts/scratch/analysis/abundance_agreement.py` (`prob_superiority` :364-369, `psm_bin_labels` :456-468, `_row_standardize` :499-503,
`rowwise_corr` :512-517, `global_perm_mean_corr` :544-561, `all_sign_vectors` :586-588, `within_pair_corr` :591-602,
`global_signflip_mean_corr` :605-615, `peptide_protein_summary` :639-690), `scripts/scratch/analysis_figures/abundance_agreement_figs.py`
(`_cell_classes` :1066-1080, `plot_detection_classes` :1083-1201, `_hist` :1336-1348, `plot_within_protein` :1351-1499).

**The parser change.** The combined-result-file parser now also stores every cell's Detection Type (one byte per cell: the index into the
file's distinct Detection Type values, in the order first met) and, for a peptide file, each row's `Protein Groups` text (a peptide file
without that column is now fatal). The existing per-type counts are unchanged. The Charts view keeps the raw files' Detection Types (the
peptide level's are read by the LFQ-only check). Memory added (observed in Chrome: the heap retained by the stored data, freed and
garbage-collected, 3 loads each): 934 KB on the 8-file dataset (of which the codes 302 KB: 33,358 peptides and 4,344 proteins × 8 runs) and
107 KB on a 4-file run; the page's heap before the spectral click rose from about 84.4 to 85.4–85.6 MB.

**Chart 3, detection classes** (`plot_detection_classes`). Unit = a run × protein cell over every protein row with LFQ or PSMs in any run
(contaminants kept; the reference leaves them out).
- Classes per run: **both** (LFQ and PSMs); **PSM only, no LFQ in any run**; **PSM only, LFQ in other runs**; **LFQ only**; "neither" is
  counted (in the hovers) but not drawn.
- **The LFQ-only check (R4-Q4).** Per run and protein, the protein's UNIQUE peptides (a peptide whose `Protein Groups` lists exactly one
  member) are counted by their Detection Type in that run, whatever their intensity: MSMS and MBR. A cell is "MBR-only" with 0 MSMS and at
  least 1 MBR unique peptide. The reference asserts every LFQ-only cell is MBR-only; the page shows the actual count instead and never fails:
  the class is labeled "LFQ only (1,509 of 1,509 MBR-only)" (71b18c3b) in the key, and each bar's hover gives that run's numbers. A unique
  peptide's member is matched to its protein row by the Limelight protein sequence version id on both sides (`psvid_<n>`, also the older
  `psvid_<n>_<name>`); the two formats were checked to give the same matches as the reference's exact id strings on all 6 local runs. A
  unique peptide whose protein is not a protein row is fatal (the two files would disagree; the reference skips such a peptide; observed 0).
  Shared peptides (two or more members) are not counted, as the reference.
- Left panel: stacked bars per run (the stack order above, white edges), the runs in the page's sample order, batch dividers only when the
  batches are contiguous (the ID-depth rule). Right panel: the cumulative fraction (step curves) of the per-cell PSM count of the first three
  classes, all runs pooled, each starting at (1, 0); x on a log scale from 1 with ticks at the decades, y within 0 to 1.01.
- The stat box (in the right panel's title, §4e): "median PSMs per run: both A–B · PSM-only C" (the range over runs of each run's median for
  "both"; the LOWEST over runs of each run's median of all PSM-only cells — the canvas statistic; the reference's finding text quotes a pooled
  median instead) and "P(both > PSM-only) D–E" (per run the Mann-Whitney U ÷ (n both × n PSM-only), ties counting half; the range).
  The reference's bootstrap interval for it and its Mann-Whitney p are not drawn by its figure and are not computed.
- Colors: the reference's detection-class colors (its registry category "detection_class": both `#E69F00`, never `#56B4E9`, elsewhere
  `#009E73`, LFQ only `#F0E442`); the color note says where these also mean something else on the page.

**Chart 4, within-protein tracking** (`plot_within_protein`). Proteins = those with LFQ and PSMs in EVERY quantified run (the reference's
"complete8"); x = the LFQ cell value (the per-run block's: log2 of the median-normalized intensity), y = log2 of the PSM count.
- **a (always):** the histogram (40 bins of 0.05 from −1 to 1) of the per-protein Pearson r across the runs — each protein's values centered
  and divided by their population SD; a protein with the same value in every run has no r and is left out (named under the key); the mean
  (dashed), the median (solid), 0 (gray); "median m · mean u" / "p% > 0 · n = N" in the panel title.
- **c (always):** the median r within mean-PSM bins (the mean of the raw counts over the runs; bins 1, 2-3, 4-7, 8-15, 16-31, ≥32 by the
  largest lower edge not above the mean, so a mean of 3.5 is in 2-3), bins with fewer than 3 proteins skipped (named under the key); tick
  text "bin / n".
- **b1 / b2 (R4-Q5, R4-B2) — only when the viewer picks a pair column** in "Pair samples by" (default none; it lists only qualifying
  columns, with the others and their reasons in a note). A column qualifies when every quantified sample has a value (a usable column of the
  spectral comparison's choices; a column with a different value for every sample never does) and each of its values holds exactly ONE
  sample of the comparison's reference level and ONE of its test level; samples of other levels are left out and listed. A column can
  qualify by its structure without being a real pairing (a batch column on a 2 × 2 design), so the choice is the viewer's.
  - b1 = Pearson r over the pair MEANS (½(reference + test) per measure); needs at least 3 pairs (over 2 pair means r is always ±1).
  - b2 = the uncentered correlation of the within-pair differences d = test − reference (Σ dx dy ÷ √(Σdx² Σdy²)); a protein whose
    differences are all 0 is left out; needs at least 2 pairs (the correlation of 1 difference is always ±1).
  - Exact nulls as the reference: b1 every one of the P! relabelings of the pair-mean columns of y, the same for every protein; b2 every one
    of the 2^P shared sign flips; two-sided p = the share of the null (the identity included) with |mean r| ≥ |observed| − 1e-12; the 95%
    null range = the null's 2.5% / 97.5% quantiles (numpy's linear), drawn as a light gray band with a dashed outline (the reference hatches
    it; Plotly cannot hatch a shape). The texts as the reference: "mean r: p = 0.042 (24 pair relabelings)" / "(16 swap patterns)".
  - Size limit (the run-order test's): permutations × proteins at most 2,000,000, checked before enumerating; otherwise "not computed: too
    many permutations" (no approximation). So b1's null is enumerated up to 7 pairs (5,040 relabelings, up to 396 proteins), b2's up to 2^P × proteins.
  - b1 above b2 on one shared x, in their own chart below the picker (panels a and c are one chart that never changes with the picker).
- Colors: the histograms and the per-bin line in the reference's PSM quantity color `#009E73`, black mean / median, a gray 0 line.

**Arithmetic.** The reference's per-protein rows over the runs are summed in numpy's pairwise order, its pair-derived rows (Fortran-order
copies) sequentially (measured in numpy); the page follows both. numpy's matrix products for the nulls are BLAS calls: the page sums
sequentially, and its null values differ from numpy's by at most about 5e-17 (computed), with the same p. Texts: Python's integer format via
the page's round-half-to-even helper; two- / three-decimal texts via JavaScript's `toFixed`, which rounds an exact binary tie (e.g. 0.0625)
up where Python rounds it to even — reported, not replaced (0 occurrences in every drawn text on the 6 runs, observed).

**The `Math.log2` note's count** (history; superseded by T-14, 2026-10-08: the note has no counts and nothing is re-measured). Building the
shared cells also on the one-sample run added 1,139 `Math.log2` calls (3,780,161 on the 6 runs, Chrome equal to numpy on all, Node.js 24
differing on 1,449); the note's number was updated then.

**Notes.** "How this is computed": the cells, the class definitions, the LFQ-only check and its numbers, the ECDF / medians / P(both >
PSM-only), the complete-protein set, the r definitions, the bins, and with a pair column the pair rule, b1, b2, the exact nulls, p and the
size limit. The deviation note: contaminants kept; the PSM count, not NSAF (as the reference's figures); the LFQ-only label shows the actual
MBR-only count; the canvas statistic for "PSM-only"; the AUC interval / p not computed; pairs from a viewer-chosen column (the reference: its
own pair column); the null range drawn as a band (only with a pair panel drawn); this run's FlashLFQ; the page's sample order. A generated
color note.

**What the local runs show (observed, live page).**

| Run | both / never / elsewhere / LFQ only (MBR-only) | median PSMs both · PSM-only · P(both > PSM-only) | Chart 4: proteins (with r) · median · mean · % > 0 |
|---|---|---|---|
| 71b18c3b | 20,151 / 4,636 / 1,154 / 1,509 (1,509) | 6–7 · 2 · 0.65–0.68 | 1,652 (1,652) · 0.72 · 0.59 · 91% |
| da0ac6aa | 20,171 / 4,628 / 1,142 / 1,540 (1,540) | 6–7 · 2 · 0.65–0.68 | 1,654 · 0.72 · 0.59 · 91% |
| ad72dfec | 20,170 / 4,628 / 1,143 / 1,534 (1,534) | 6–7 · 2 · 0.65–0.68 | 1,657 · 0.71 · 0.58 · 91% |
| fa734de6 | 1,585 / 339 / 36 / 432 (432) | 4–4 · 2 · 0.49–0.55 | 269 (262) · 0.49 · 0.32 · 71% |
| a0ec0906 | 1,586 / 339 / 35 / 431 (431) | 4–4 · 2 · 0.49–0.55 | 270 (263) · 0.49 · 0.33 · 71% |
| e96db9a6 | 325 / 82 / 0 / 0 | 3–3 · 1 · 0.71–0.71 | message (1 sample) |

Pair columns: fa734de6 and a0ec0906 offer "batch" (2 pairs: b1 not drawn, b2 p = 0.500 over 4 sign patterns); the 8-file runs offer none
(their batch column holds 6 + 2 samples). With the reference's own candidate pairs as an in-memory test column on 71b18c3b, b1: median 0.85,
p = 0.042 over 24 relabelings; b2: median 0.16, p = 0.125 over 16 sign patterns — the reference's published p values.

**Verification (2026-10-05).**
- *Reference code on our data (V1).* The page's inputs and results went through the reference's own code in its environment: the cells
  rebuilt as `load_all`, `peptide_protein_summary`, the whole `section_detection` and `section_within` (the condition labels renamed to the
  comparison's levels; with no pair column, an artificial pairing only so the section runs), `_cell_classes`, `prob_superiority`,
  `psm_bin_labels`, `rowwise_corr`, `within_pair_corr`, `global_perm_mean_corr`, `global_signflip_mean_corr`. On the live page (Chrome):
  every class count, MBR-only count, median, AUC, ECDF point, per-protein r, histogram count, bin median / mean / n, pair r and p
  bit-identical; the nulls within about 5e-17 (BLAS); 71b18c3b (and its two in-memory pairings: 4 pairs; 3 pairs with 2 samples left out),
  fa734de6 with batch and with condition as the pair column, a0ec0906. The page's cell logarithms equal numpy's in Chrome; the same check on
  the page's compute in Node.js finds a few complete-protein LFQ cells 1 ulp off on the 8-file runs (5–6 per run; Node's older `Math.log2`, R4-F1), moving at most 6 per-protein r by at most 3.1e-15.
- *The published reference (V2).* The page's compute on the reference's published per-cell table (6 significant digits) with its own
  candidate pairs: every class count and MBR-only count exact (LFQ only 1,491, all MBR-only), n 1,648 / 1,640, p 0.041667 over 24 and 0.125
  over 16 exact; the medians and means within the cells' rounding (e.g. median r 0.714142 vs 0.714141), and the reference's own sections on
  the same rounded cells give the page's numbers (so the differences are that rounding).
- *Live page (V3, all 6 runs).* Absent before the click; drawn at once (before the per-run block finishes); the 7th block; the toggle, the
  covariate and the sample order leave it untouched; the pair picker (default none, only qualifying columns, the notes); every drawn number
  equals the computed result; texts in the reference's formats; colors from the registry; 0 requests per step; console clean.
- *Unit (V4)* and a numpy parity of the pair arithmetic for 2 to 10 pairs (bit-identical r, nulls within 5e-17, same p).
- *Everything else unchanged (V5 / V6):* the full check run (section 6).

## 4i. Variance prior: constant vs mean-variance trend (0006a, added 2026-10-07)

**Status 2026-10-23: COMMENTED OUT** (decision log §24; marker `COMMENTED OUT 2026-10-23 (maintainer): not in the reference qc directory (decision log §24)`). The text below records what was built.

The reference's finding 0006 (limma-trend sensitivity) on the page, first part (0006a; the within-pair relabelling check is 0006b,
section 4j). Decisions: decision log §19 T-1 … T-12. Reference: `scripts/scratch/analysis/differential_abundance.py`
(`_SPLINE_DF_THRESHOLDS`, `_natural_spline_basis`, `_fit_f_distribution_prior_trend`, their use in `_run_linear_model`),
`scripts/scratch/analysis_figures/trend_atpk.py` (`plot_prior_sd_trend`, `plot_q_trend_vs_notrend`), `scripts/scratch/fig_trend_atpk.py`,
`scripts/scratch/de_trend_sensitivity.py`; published outputs `results/de/raloxifene-vs-control/trend/`.

**What it is.** limma's `eBayes(trend=TRUE)`: the empirical-Bayes prior variance is not one number but a smooth function of each
feature's mean abundance, so a feature is shrunk toward the typical variance of features of its abundance.

**Where.** In every Differential abundance block (Peptides, Proteins, and the spectral level under its NSAF / PSM count toggle):
- a fifth control **"Variance prior: constant / mean-variance trend"**, default **constant** (T-2). The choice is kept like the block's
  other choices (an instance field no rebuild resets; on the spectral level it survives the measure toggle);
- the picked prior drives the **whole block**: the volcano, the raw p-value histogram, "How this is computed" and the Diagnostics (their
  no-covariate design is fitted under the same prior). The volcano / histogram subtitles add "· mean-variance trend prior" when the trend
  is picked; under the constant prior every number is the same as before 0006a (bit-identical, checked);
- after the Diagnostics, a sub-section **"Variance prior: constant vs mean-variance trend"** with two charts that always show BOTH priors
  for the block's comparison, each with its "How this is computed" line, an "About these colors" note and its own deviation note:
  1. *Empirical-Bayes prior SD: constant vs mean-variance trend* (`plot_prior_sd_trend`): one point per tested feature (mean abundance,
     residual SD on a log axis), the trend prior SD curve, the constant prior SD as a dashed line; the key gives both d0. **No ring and no
     label** on any point (T-8). Features with a residual SD of exactly 0 cannot sit on the log axis: left out and counted.
  2. *BH q: mean-variance trend vs constant prior* (`plot_q_trend_vs_notrend`): x = −log10(BH q) constant, y = −log10(BH q) trend (as the
     reference's code draws it), colored by mean abundance (matplotlib's viridis, 256-color LUT, matplotlib's own indexing), the
     diagonal, q = 0.05 (dashed) / 0.10 (dotted) guide lines on both axes, the trend hits (q < 0.05) ringed and labelled by q, p —
     at most 10 (the reference labels every hit; 10 is its largest labelled set), placed by the page's volcano method. The chart's key
     and its "How this is computed" line say how many of its hits are labelled ("N of M hits labelled", generated), and the cap is an
     item of the level's "How these charts differ from the reference QC analysis" note (T-11; it is not repeated in the sub-section's
     own deviation note).
- **Fixed-q notes (T-9):** directly above every chart whose own text shows the q threshold — above the volcano's key (the key, the
  color note, the volcano's title and "q = 0.05" line follow it) and first in the q chart's box — a note says the threshold is a fixed
  value built into this page for the differential-abundance test, not one of the search's filter cutoffs (PSM / peptide / protein),
  and does not change with them. "How this is computed" says the same in one clause after "a hit is q < 0.05". The numbers in these
  texts are generated from `quantCharts_DA_Compute__FDR` and `quantCharts_DA_Compute__Q_GUIDE_SECOND`.

**The computation** (`quantCharts_DifferentialAbundance_Compute.ts`, REQUIRED parameter `variancePrior`): the constant prior is
unchanged (the zero-variance floor now shared through one helper, same arithmetic). The trend prior is a line-by-line port of the
reference: the same validity / floor / ≥ 50-feature rules; covariate = each tested feature's mean over the included samples (numpy's
pairwise sum / n — the reference's `mean_abundance_all`, now carried in the result as `meanAbundance` and also used by the Diagnostics'
terciles); spline df = min(1 + [n ≥ 3] + [n ≥ 6] + [n ≥ 30], distinct covariate values) (< 2 refused, the reference's wording); knots =
min, numpy-"linear" quantiles at `linspace(0, 1, df)[1:-1]`, max (tied knots refused, as the reference's basis raises); the natural cubic
spline basis exactly as `_natural_spline_basis` (affine map to [0, 1]; `** 3` → `Math.pow`); least squares by **Householder QR with
column pivoting** (`quantCharts_LeastSquares.ts`; rank = |R_kk| > eps × max(n, p) × |R_00|) where the reference uses numpy's SVD-based
`lstsq` (T-6; the difference is reported, not engineered away); e_var = RSS / (n − rank); d0 by the existing Brent port; s0_i² per
feature; the d0 = ∞ branch. Both fits are computed for every selection (the comparison charts need both); switching the prior only
re-points the picked fit and rebuilds what it drives. The spectral level's LFQ-vs-spectral block keeps the constant prior whatever
the block's choice is, and its "How this is computed" ("Four full fits") says so in one sentence (T-10).

**Verified (2026-10-07; evidence in the 0006a session folder, not in the repo):**
- *Reference code on the page's own exports* — all 7 local runs, every level, both priors, covariate batch and none where offered (44
  selections, 88 fits): spline df and knots exact, mean abundance bit-identical, d0 ≤ 6.9e-14 relative (1.2e-13 absolute), s0² ≤
  2.5e-13, p / q ≤ 3.2e-13, SE ≤ 1.1e-13 (all relative; the final full check run, 2026-10-07); refusals agree on synthetic edge cases (one-valued covariate, tied knots, majority-zero variances; d0 = ∞ and 2 / 3
  distinct values fitted).
- *Least squares vs numpy* on the same basis: fitted values ≤ 2.4e-13 apart; the resulting s0² ≤ 2.4e-13 and q ≤ 1.7e-13 relative;
  ranks equal (all 4).
- *Published finding 0006* (the reference's own inputs, the page's fits, the reference's own table / summary code on the page's numbers):
  all 12 quantity × design trend tables equal within 1e-12 and every `summary.json` design block (hits, π0, calibration, d0, prior SD
  range / median / Spearman, spline df, knots, hit-set changes, SE ratios, top features) with 0 differences; ATPK (P56134) LFQ protein
  paired log2FC −0.516, p 2.19e-05, q 0.0395; protein 1 hit, peptide 10 hits (3 up / 7 down); NSAF / PSM and every batch / unadjusted fit 0
  hits; trend prior SD 0.0787–0.3686, d0 4.79 (trend) vs 3.01 (constant). (The within-pair relabelling diagnostic is 0006b.)
- *Unchanged constant prior:* the pre-0006a code vs the current code on every selection of every level of the 7 runs (192 selections,
  6.8 M numbers) bit-identical; the existing drivers' DE exports of the previous full check run vs this one identical.
- *Live page:* every level of the 7 runs, both priors, the switch back to the exact constant numbers, the plotted values of both new
  charts against the reference's, the fixed-q notes and every q-threshold text placement, no page exceptions.
- *Built-in difference (T-12; measured once, 2026-10-07 — not measured per round since T-14):* every `Math.log10` call the Charts view makes on the 7
  local runs (load, each level's prior switched to the trend, the spectral level's NSAF incl. the per-run block, PSM count) — 1,017,211
  calls: Chrome 153's `Math.log10` differs from numpy's `np.log10` on 2,311 (340 distinct arguments), by 1 ulp, and on every one of
  them Chrome's value is the correctly rounded log10 (numpy's is not). Node.js 24's differs from `np.log10` on 181,300 of the same calls.
  The differing callers: the −log10 q of the volcano (already before 0006a) and of the q chart, log10 residual SD (Diagnostics), and the
  "%g" formatter's exponent; no printed exponent and no histogram bin changes (checked). The built-in is not replaced. (0006a added a
  sentence with these counts to the page's info box, and 0006b re-measured them; since T-14 the box is one static sentence naming
  `Math.log10` without counts — section 4h "Round 4a follow-ups".)
- *Time (Chrome, 10,413 peptides; medians of 9, the final full check run):* one constant fit ≈ 15 ms, one trend fit ≈ 21 ms; the block's
  compute on a selection change ≈ 43 ms before → ≈ 69 ms after (both fits + the comparison + the picked prior's Diagnostics); switching
  the prior ≈ 31 ms (no refit).

## 4j. Within-pair relabelling check (0006b, added 2026-10-07)

**Status 2026-10-23: COMMENTED OUT** (decision log §24; marker `COMMENTED OUT 2026-10-23 (maintainer): not in the reference qc directory (decision log §24)`). The text below records what was built.

The second part of the reference's finding 0006: the check that keeps the trend prior's extra hits from being over-read. Decisions:
decision log §19 T-3, T-4, T-5, T-9 (and "Built (0006b)" there). Reference: `scripts/scratch/de_trend_sensitivity.py`
`pair_relabel_diagnostic` (with `_relabel_row`, `_rank_block`), `scripts/scratch/analysis_figures/trend_atpk.py` `plot_relabel_diagnostic`
(with `_dodge`), drawn by `scripts/scratch/fig_trend_atpk.py`; published numbers in `results/de/raloxifene-vs-control/trend/summary.json`
(`quantities.<quantity>.pair_relabel_diagnostic`).

**What it is.** With paired samples, swapping the reference / test labels within some pairs gives comparisons in which no real
difference lines up with the labels. The comparison is refitted for every such labelling. If the observed labelling's hits (and low π0)
stand out from the relabellings, the signal follows the labels. With N labellings the smallest attainable permutation p is 1/N, so on its
own the check can at best show the observed labelling to be *consistent with* a real difference.

**When it is drawn (T-4, T-5).** Only when the block's chosen **covariate forms complete pairs** for the chosen comparison: every value
of the covariate holds exactly one sample of the reference level and one of the test level (samples of other compare levels are left out
of the comparison, as everywhere in the block). The rule is the round-4b pair rule (`quantCharts_LfqVsSpectralWithinProtein__PairChoices`),
called unchanged. Otherwise the check's place in the block shows one note naming why ("no covariate is chosen …", or the rule's reason for
the covariate, e.g. its first value that does not hold one sample of each level). One pair only, or more than 7 pairs (2^(P−1) > 64
labellings, T-5) also give a note (with the count); nothing is approximated.

**The labellings.** The pairs in the covariate's value order (the shared metadata order); the first pair's orientation is fixed; every
combination of swapping the labels within the other P − 1 pairs, in `itertools.product((False, True), repeat=P−1)` order, the observed
labelling first → 2^(P−1) labellings. (The reference orders the pairs with Python's `sorted()`; where that differs from the shared order,
the page fixes another pair, which gives the same labellings up to swapping every pair at once — the same p-values.) Each labelling is
the block's comparison with the compare column's values swapped within the swapped pairs, refitted with the existing computation
(`quantCharts_DA_Compute__Run`, the chosen covariate) under the **variance prior picked for the block** (T-3). Per labelling: hits at
q < 0.05 (and q < 0.10, for the hover and the parity checks), Storey π0 (λ = 0.5, the page's estimator), min q. The observed labelling's
standing as the reference's `_rank_block`: π0 and min-q ranks (lowest first), the number of labellings with at least the observed hits
(the permutation p's numerator), the most hits of any relabelling. The observed labelling's refit is checked to equal the block's own fit.

**Time slices (T-5).** The refits run in time slices of about 50 ms of work with control returned to the browser between them — the
R4-F2 slicing, extracted from the per-run agreement block into `quantCharts_TimeSlicedJob` (+ its box into `quantCharts_TimeSlicedProgress`)
and used by both blocks. While the refits run, the check shows only a progress box ("Computing the within-pair relabelling check (N
labellings …) … P%"); nothing of the chart is drawn until every labelling is fitted. A selection change, a prior change, a measure toggle
or new data restarts the check (the running job is stopped first, so nothing stale is drawn); leaving the page stops it.

**The chart** (`plot_relabel_diagnostic`). After the "Variance prior: constant vs mean-variance trend" sub-section, before the block's
deviation note: heading, one-sentence intro, "About these colors", then the chart box: the **fixed-q note (T-9)** first, then the key
(the observed labelling = orange diamond, the relabellings = light-gray circles — the reference's registry category `pair_labelling`;
the number of labellings and which pair is never swapped; the observed labelling's hits, "n of N labellings have at least as many
(permutation p = n/N)", π0 and min q with their ranks; "the smallest attainable p is 1/N"), two charts — *Hit count per labelling* (hits
at BH q < 0.05) and *π0 per labelling (lower = more signal)* — with one x column for the level's quantity (Peptide (LFQ), Protein
(LFQ), or the spectral level's toggled measure: NSAF / PSM count (log2), following that level's one-measure-at-a-time convention), the
reference's "perm p = n/N" / "obs rank r/N" under the column, every dot with a hover (which pairs are swapped, hits at both thresholds,
π0, min q), and a "How this is computed" line. Equal values are spread sideways as the reference's `_dodge` (tolerance 0 for hits, 0.015
for π0, step 0.1); when a cluster would be wider than 0.8 (10 or more tied dots, possible from 16 labellings) the step shrinks so the
cluster stays in its column. Layout is Plotly's (two house-size charts one under the other); kept from the reference for readability: the
x range of the one column and the hit axis's range (−0.6 to max(hits, 1) × 1.12 + 0.5), with a tick at every count up to 6 hits
(Plotly's own ticks above: the reference's fixed step of 2 gave 33 overlapping labels at 60 hits on fa734de6, measured).

**Differences from the reference** (the level note's last item, "How these charts differ from the reference QC analysis"): per level for
that level's quantity (the reference: one figure for its four quantities), under the picked prior only (the reference fits both priors and
draws the trend), its own pairs (the chosen covariate), up to 64 labellings, the tighter spread of many tied dots, ranks on unrounded values
(the reference ranks π0 and min q rounded to 4 decimals).

**What the local runs show (observed, live page).** The three 4-file runs (fa734de6, a0ec0906, 8378b31a) offer the check with "batch" as
the covariate (2 pairs → 2 labellings; with only 2 labellings p ≥ 1/2) on every level, and also with batch as the compared column and
condition as the covariate; fa734de6 and 8378b31a draw it on load (their default covariate is batch), a0ec0906 once batch is chosen (its
default covariate is none). The 8-file runs offer none (their batch column holds 6 + 2 samples); e96db9a6 has no DE block. With the reference's own candidate pairs as an in-memory
test column on 71b18c3b (4 pairs → 8 labellings) the page draws the reference's picture on our data: under the trend prior peptides 10
hits observed vs 0, 1, 0, … in the relabellings (perm p = 1/8), proteins 1 vs 0 (1/8); none under the constant prior.

**Verified (2026-10-07; the final full check run, §37; evidence in the 0006b session folder, not in the repo):**
- *Reference code on the page's own exports (V1)* — every offered selection of the 7 local runs (52 cases: the three 4-file runs, all
  levels, batch / condition as the pair column) plus 71b18c3b's in-memory candidate pairs (8 labellings), both priors: the reference's own
  `pair_relabel_diagnostic` gives the same labellings, hits at q < 0.05 and < 0.10, π0, min q (4 decimals; unrounded within 2.1e-13
  relative) and standing in every case (2,156 checks, 0 failures). The page's compute in Node on the same inputs offers exactly the same
  selections and gives the same numbers as Chrome (min q may differ ≤ 2.6e-14 relative: the engines' `Math.*`).
- *Published finding 0006 (V2)* — the page's compute on the reference's own inputs with its candidate pairs reproduces every quantity's
  `pair_relabel_diagnostic` in `summary.json` (protein, peptide, NSAF, PSM count; both priors; all 8 labellings): under the trend prior the
  observed labelling is 1/8 on hits for proteins (1 hit vs 0) and peptides (10 vs at most 1), π0 rank 1/8 proteins and 2/8 peptides; NSAF
  and PSM count 0 hits in every labelling (812 checks, 0 failures).
- *Cap and enumeration (V4)* — the labellings equal `itertools.product` order for P = 1 … 7; `_dodge` and `_rank_block` equal the
  reference's; a synthetic level with 7 pairs (64 labellings) equals the reference in every labelling and both priors; 8 pairs give the
  "not drawn" note (128 labellings); pairs whose shared order differs from `sorted()` and a left-out compare level are handled.
- *Live page (V3)* — all 7 runs: the "not drawn" notes with the rule's reasons, the chart's every plotted value / dot spread / color /
  hover / key text / tick text against the computed result and the reference's encodings, the fixed-q note first in the chart box,
  every q text after it, the progress box while computing with nothing drawn, and restarts mid-run (a prior change, a covariate change,
  a level swap and a measure toggle each stopped the running job; the final draw equals a fresh run); no page exceptions (7,746 checks).
- *Everything else unchanged (V0)* — the full check run equals the previous one except lines explained by the new check / note / fields
  (the check's elements in the colour snapshot, layout, spectral and 0006a checks; two net new instance fields; the info box's `Math.log10` numbers,
  re-measured then — since T-14 the box has no counts and nothing is re-measured, section 4h).
- *Time (Chrome, 10,413 peptides):* the check's own work is ≈ 15–21 ms per labelling — 2 labellings ≈ 30–40 ms, 8 ≈ 120–150 ms, 64 ≈ 1.0–1.4
  s (measured on a synthetic 14-sample level with the page's own code: no local run has 7 pairs) in ≈ 50 ms slices, the page never busy
  for more than ≈ 67 ms at a time. A covariate change on that level already takes ≈ 1.6 s to redraw the block without the check; with it,
  click → drawn ≈ 1.7 s (2 labellings) / ≈ 1.9–2.0 s (8).

## 4k. Protein case study: LFQ vs spectral counts (0007-B2, added 2026-10-19)

**Status 2026-10-23: COMMENTED OUT** (decision log §24; marker `COMMENTED OUT 2026-10-23 (maintainer): not in the reference qc directory (decision log §24)`). The text below records what was built.

The reference's finding 0007 (ATPK), for any protein the viewer picks. Decisions: decision log §20 P7-12, P7-16, P7-18 (and "Built
(0007-B2)" there). Reference: `scripts/scratch/fig_trend_atpk.py` (:624-814, `_direction_text`), `scripts/scratch/analysis_figures/trend_atpk.py`
(`fmt_signed`, `fmt_q`, `equal_span_limits`, `plot_paired_panels`, `COUNT_TICKS`), `scripts/scratch/atpk_case_study.py`; figure numbers in
`results/de/raloxifene-vs-control/trend/figure_provenance.json`.

**Where.** Block 8 of the Spectral counts level, after the within-protein block; it exists once spectral counts are shown. Code:
`quantCharts_ProteinCaseStudy_Compute.ts` (pure), `quantCharts_ProteinCaseStudy_Component.tsx` (the block body),
`quantCharts_ProteinCaseStudy_PairedPanels_Component.tsx` (one Plotly figure of paired panels, used for both figures),
`quantCharts_PeptideIdentityMap_Load.ts` (the map loader). The Charts view (`quantCommonSPAView_ChartsView_Component.tsx`) holds the pick.

**Picking a protein.** A click on a point of the Proteins level's LFQ volcano or of the spectral level's NSAF / PSM count volcano (their hover
says so), or a match of the block's search box (case-insensitive substring over the Limelight names, descriptions and the FlashLFQ
`Protein Groups` text; at most 20 listed). A Proteins-volcano click while the spectral counts are not shown only puts a message next to that
volcano (nothing loads). Pickable = the LFQ vs spectral counts block's common set (tested in LFQ, NSAF and PSM count); any other protein shows
why per quantity (not quantified in every run / the same value in every compared sample). Points in a dense cloud are hard to hit with a click
(a click there picks the nearest point Plotly reports); the search box is the dependable route (P7-12).

**What it draws.** Per pair of the within-protein block's pair column (none chosen: a note to choose one):
- *Figure 1* (one figure, 3 subplots): LFQ protein (log2(median-normalized + 1)), NSAF (log2(NSAF + 1e-9)), PSM count (log2 axis, count
  ticks), each pair from its reference to its test run; above each panel log2FC · q · direction of the spectral level's comparison under
  its variance prior (the full fits; the trend fits are computed by the block, only when that prior is picked, once per comparison).
- *Peptide table* (one DataTable): every FlashLFQ peptide whose Protein Groups include the protein (shared marked), sorted by identity;
  complete LFQ pairs, mean within-pair LFQ change, Σ PSMs, PSM direction. A row click picks Figure 2's peptide (the first row on a pick).
  The selected row is named in Figure 2's title, not highlighted in the table (a new table object would reset the table to page 1).
- *Figure 2* (one figure, 2 subplots): the peptide's LFQ (log2(median-normalized + 1)) above its PSM count from the submit's peptide
  identity map (0 when the identity has no PSM in that scan file). Missing LFQ cells are counted by FlashLFQ detection type; a 0 PSM count
  is not drawn on the log axis (the subtitle counts those pairs); Σ totals include it. One log2 span for both rows.
- "How this is computed", the color note and the deviation note.

**Median-normalized peptides are complete-case.** The service normalizes only peptides quantified in every run, so a peptide that is not
has no LFQ value at all here (e.g. ATPK's `LGELPSWILMR[+0.0]`: "not in the median-normalized file (it keeps only peptides quantified in every run) · FlashLFQ: 2 MSMS (measured), 6 MSMSAmbiguousPeakfinding" -- decision log P7-19: measured entries first, then larger count, then type name); the
reference drew its 2 quantified runs from log2(raw) + the run's median offset. A partly complete LFQ pair therefore cannot occur on current
runs (checked: 0 of 10,336 normalized peptide rows of run 87d27dbf have a missing value); the block still handles one. Decided (P7-19, option (a)): the front end
does NOT derive values for those peptides.

**Loading.** The map is fetched on the FIRST pick only (one request for the page; module-cached per run), parsed, validated against the
contract (fatal on a break) and indexed once. Measured (Chrome, run 87d27dbf, 33,358 identities): transfer 1,218,910 bytes; fetch ≈ 134–166 ms,
parse + validate ≈ 67 ms, index ≈ 8 ms. A pick then builds in ≈ 3–7 ms (155 peptides: ≈ 3 ms), the trend fits ≈ 17 ms.

**Verified (0007-B2, run 87d27dbf, ATPK, pairs "pair", condition control → raloxifene-d0, covariate pair).** PSM counts exactly the
reference's (protein 6→12, 6→13, 6→12, 7→7; the three peptides); every drawn number recomputed from the run files / `request_body.json`
and the reference's own functions; log2FC / q equal the reference's `differential_abundance` on the page's inputs (both priors). Differences
from the reference's figure (this run's FlashLFQ values, more proteins tested): LFQ protein within ±0.015 log2, NSAF within 0.002;
log2FC −0.52 / +0.86 / +0.78 (reference −0.52 / +0.86 / +0.78); trend q 0.037 / 0.46 / 0.49 (reference 0.040 / 0.70 / 0.49). Report:
`.claude/session_handoffs/quant_0007B2_protein_case_study_2026-10-19/` (not committed).

## 5. Sample-sheet rule (upload)

- Any empty cell in the uploaded sample sheet — any column, any row, header included — **fails the upload** with
  "Every column must have a value for every row." above the grid, empty cells highlighted.
- Guard for older submits: a blank batch label shows an amber warning naming the samples; the detection charts draw
  without batch grouping.
- Column headers must be unique (2026-10-21, maintainer decision; decision log COV-HDR): two headers are the same when
  equal after trimming surrounding spaces and ignoring letter case (the scan-filename rule), column 0's header included.
  A clash **fails the upload** ("Every column header must be unique.", listing each clashing set as column number + the
  header as typed, e.g. `column 2 ("batch") and column 5 (" Batch ")`). The gate runs right after the empty-cell gate
  and before the scan-filename gates. The upload instructions state the rule. ONE shared function
  (`data_pages/quant/quant_SampleSheet_HeaderUniqueness.ts`) decides it; the Charts view calls the same function on a
  stored run's `quant_metadata.json` `metadataHeaders` and treats a clash as a fatal error. Runs stored before the rule
  all have unique headers.

## 6. How correctness was verified

- Reference reproduction: the dataset the reference repo analyzed was imported locally and quantified with the same
  filters and FlashLFQ settings; its FlashLFQ input was identical to the original server run's.
- The reference repo's own Python functions (loaders, normalization, ComBat, CV, boxplot stats, completeness, MNAR,
  hexbin, dynamic range) were run in a throwaway container on the same files; every chart quantity was compared with
  the page's rendered values.
- Results: counts exact; floating-point quantities agree to ~1e-13 relative (summation order); the reference loader's
  pandas number parser differs from correctly-rounded parsing by 1 ULP on some tokens (the page matches the service's
  files exactly). Example (reference dataset, peptides): 10,308 complete peptides; CV medians 0.452 / 0.343 / 0.209;
  boxplot median range 1.35 / 0.00 / 0.05; MNAR Pearson r 0.51.
- Note: FlashLFQ match-between-runs results vary slightly between reruns of identical input (multithreaded training-row
  order in its MBR scoring; inferred from source). Results will be persisted before use in publications.

## 7. Deferred / not in this release

- (Done 2026-10-01: PCA and the sample-correlation heatmap, colored / striped by any metadata column — section 4a.)
  (Done 2026-10-01: the Differential abundance block — volcano + raw p-value histogram, section 4b.) (Done 2026-10-02:
  p-values by design and by abundance tercile, residual SD by design, cohort counts and the crosstab — section 4d.) (Done
  2026-10-03: spectral NSAF / PSM-count QC charts, round 1 — section 4h; differential abundance on spectral counts, round 2.
  Done 2026-10-04: LFQ vs spectral counts charts 1, 2, 3, 5 — round 3a; chart 4 with the statsmodels LOWESS port — round 3b; spectral
  round 3 complete, section 4h. Done 2026-10-04: the per-run agreement block (density + per-run correlations) — spectral round 4a,
  section 4h; and its follow-ups R4-F1 (Math.log2 + the page's note) and R4-F2 (the time-sliced bootstrap). Done 2026-10-05: the detection
  classes and within-protein tracking block — spectral round 4b, section 4h; spectral rounds 1–4 complete. Done 2026-10-07: the
  mean-variance trend prior and its two charts + the fixed-q notes — 0006a, section 4i. Done 2026-10-07: the within-pair relabelling
  check — 0006b, section 4j; finding 0006 complete. Done 2026-10-22: several covariates at once and a continuous (numeric)
  covariate — Phase 6, section 4b "Covariates", decision log §23.) (Done 2026-10-02: run layout, run-half crosstab, run-order box colors and sample
  ordering, from a sample-sheet column the viewer chooses — section 4f.)
- Acquisition order from the instrument files themselves (Limelight stores none; section 4f uses a sample-sheet column).
- Contaminant handling (the reference excludes contaminants from its complete-feature sets; Limelight does not — by
  decision of the reference author, possibly revisited).
- Per-submit capture of the FlashLFQ version (release version + the CLI's `--version` output, which reports
  e.g. `FlashLFQ 2.1.4.330+…`).
- Quant values in peptide / protein lists (see the multi-search review docs for the mapping issues that a future design
  must handle).
- Storing quant requests and results in the database (then: stored filters, project binding, gzip of stored files /
  large responses — see `quant_things_to_deal_with_when_start_store_in_db.md`).
- (Fixed for new submits, 2026-10-01: protein accessions no longer embed a per-search name — FlashLFQ gets
  `psvid_<n>` only and the names travel in the request's `protein_names` table and come back in `protein_names.tsv`;
  see `quant_protein_names_mapping_file_and_request_contract_2026-10-01.md`. Runs submitted before keep their old
  `psvid_<n>_<name>` strings; the Charts view keys on the psvid id and reads both.)
- **Legacy FlashLFQ protein retrieval webservices disabled (2026-10-01, fix deferred):** the four
  `FlashLFQ_Run__Result_Retrieval_Proteins*` endpoints throw "Require updating to be able to use", because their
  `Protein Groups` parse cannot read a bare multi-member group of the new format. Nothing reachable calls them (the
  Charts view reads the result files through the passthrough webservice). Details and how to re-enable:
  `quant_pages_TODO.md`, section D.
