# Adding FlashLFQ quant charts to the Quant Common Peptide / Protein pages — investigation & implementation plan

**Status:** investigation + design (no code written yet). **Date:** 2026-09-23.
**Owner:** the maintainer (review/oversight session produced this; a separate build session would implement).

This document tracks (a) what the reference chart repository produces and how, (b) what raw
data those charts consume vs. what the Quant Common pages already have in the browser, (c) the
current Limelight Plotly version and whether it suffices, and (d) a concrete, phased recommendation
for adding the charts to the **Quant Common Peptide** and **Quant Common Protein** pages.

---

## 0. Provenance & confidence conventions

Load-bearing claims are cited `file:line` and tagged:
- **OBSERVED** = read directly in source (either the reference chart repo's Python, the committed
  figure files, or the limelight-core front-end/Java source). The bulk of this document is OBSERVED.
- **inferred** = reasoned, not directly read; called out inline.

Nothing here is a runtime observation of a *new* Limelight feature — none exists yet. The rendered
figures referenced from the chart repo are OBSERVED outputs of that repo's own Python pipeline, not
of Limelight.

**Reference chart repository:** `https://github.com/mriffle/limelight-quant-experiment`
(a Python analysis of a raloxifene-vs-control experiment whose quant came from FlashLFQ run via
Limelight). It is reference/research material, read-only; it is **not** a dependency and will not be
vendored. All Python paths below are relative to that repo root.

**Limelight paths** are under
`limelight_webapp/front_end/src/js/` unless a Java/JSP path is given. Front-end dir shorthands:
- `QC_SPA/` = `page_js/data_pages/project_search_ids_driven_pages/quant_pages/quant_common_spa_view_page/`
- `quant/` = `page_js/data_pages/quant/`

---

## 1. Hard constraints & headline decisions

These frame everything below. The maintainer set the first two explicitly.

| # | Constraint / decision | Source | Consequence |
|---|---|---|---|
| C1 | **No server-side image generation.** | maintainer | Charts must be drawn in the browser (Plotly), not rendered to PNG/SVG server-side. |
| C2 | **All raw-data processing happens in the front end.** Every transform/statistic must run client-side in TypeScript. | maintainer | No new Java stats endpoints; the FE consumes raw/near-raw data and computes everything. |
| C3 | **Use Limelight's current Plotly** (3.7.0) unless a specific chart demands newer. | maintainer + investigation | 3.7.0 covers every chart type needed — see §2. No upgrade required. |
| C4 | **Data source = the already-loaded, cutoff-filtered per-sample intensity matrix** (`quant_PrototypeData` / `flashlfq_proteinQuant`), NOT the raw TSV text. | investigation §4 | Charts respect the user's PSM/Peptide/Protein cutoffs and reuse data already in the browser. |
| C5 | **Charts live inside each per-view child** (peptide charts on the peptide view, protein charts on the protein view), reusing the existing collapsible-panel pattern. | investigation §4 | The quant matrices live in the children; MainContent holds neither. |
| C6 | Reference charts are **matplotlib**; there is **no chart code to port** — only the *chart definitions and the data math* are reused. Charts are re-authored as native Plotly. | investigation §2 | Expect to re-implement, not translate. |

### Options considered and rejected
- **Server-side static images** (run the Python, serve PNG/SVG) — rejected by C1.
- **Server-side statistics** (compute transforms in Java, ship numbers to the FE) — rejected by C2.
- **Charting off the raw QuantifiedPeptides/Proteins TSV text** (representation (b), §4) — rejected in
  favor of the filtered numeric matrix (C4): the raw TSV ignores cutoffs and is unparsed string data.
- **Upgrading Plotly** — unnecessary (C3/§2).

---

## 2. Plotly: current version & capability verdict

- **Installed version: `plotly.js-dist-min` 3.7.0** — the full, pre-minified distribution (all trace
  types), pinned at `front_end/package.json:39`; installed build `node_modules/plotly.js-dist-min/package.json` = `3.7.0`. OBSERVED.
- **Import/usage pattern (house convention):** `import Plotly from "plotly.js-dist-min";` then build
  three plain objects — `chart_Data: Plotly.Data[]`, `chart_Layout: Partial<Plotly.Layout>`,
  `chart_config: Partial<Plotly.Config>` — and call **`Plotly.newPlot(divRef.current, data, layout, config)`**
  from a React **class component**, handling the returned Promise with separate `.then`/`.catch`.
  Teardown `Plotly.purge(div)`; updates `Plotly.relayout`/`Plotly.restyle`. There is **no `react-plotly.js`**;
  plain `import ... from "plotly.js"` reportedly does not build (documented in-repo). OBSERVED
  (e.g. `qc_page/qc_common_utils/qcPage_StandardChartLayout.ts:7`;
  `feature_detection_view_page/chromatogram/featureDetection_ViewPage__Chromatogram_Component.tsx:2687`).
- **Shared helpers to reuse:**
  - `qc_page/qc_common_utils/qcPage_StandardChartLayout.ts` — standard `Layout` (default 750×450,
    axis titles, margins, hover fix). OBSERVED.
  - `qc_page/qc_common_utils/qcPage_StandardChartConfig.ts` — standard `Config` with `displaylogo:false`
    and **custom PNG + SVG download buttons** (`Plotly.downloadImage`). This preserves the reference
    repo's "publication-quality SVG export" affordance interactively. OBSERVED (`:80-137`).
  - `page_js/common_all_pages/Plotly_PlottingLibrary_CommonCode/*` — helpers to set layout props missing
    from the (lagging) TypeScript typings. OBSERVED.
- **Chart types already in production** (grep of `type:` across `src/`): bar, scatter, **scattergl**
  (WebGL, for large point sets), **violin**, histogram, **histogram2dcontour**, line, heatmap. OBSERVED.
- **Bundling:** esbuild, one entry point per page (`build.gradle`), Plotly is statically bundled into
  each page that imports it (no shared vendor bundle). The Quant Common SPA already has entry points
  (`build.gradle:284-286`), so a new chart component **needs no build change** — it bundles via the
  existing entry point. OBSERVED.

**Verdict:** 3.7.0 is decisively sufficient. Every chart named below is a standard, long-established
Plotly trace type (box, violin, heatmap, histogram/2D-histogram, scatter±error bars; volcano and PCA
are just scatter). No newer version is needed for any chart in scope. **One caveat to record for the
implementer:** the dev-dep typings lag (`@types/plotly.js-dist-min ^2.3.4` against a 3.x runtime,
`package.json:9,39`), so newer Plotly properties will need `@ts-ignore`/`as any` — matching existing
code. OBSERVED. (There is no capability gap; only a typings gap.)

---

## 3. The three chart tiers (inventory)

Every chart in the repo is **matplotlib** (no seaborn, no plotly). Scientific deps used inside charts:
`scipy.stats.gaussian_kde`, `scipy.cluster.hierarchy` (linkage/dendrogram), `sklearn.decomposition.PCA`
+ `StandardScaler`, `statsmodels` LOWESS. OBSERVED. Figures are dual-exported SVG + 300-DPI PNG with a
companion `<stem>.legend.{svg,png}` (a separate legend file per figure — a repo publication convention
that Plotly's built-in interactive legend replaces). OBSERVED (`common/figures/figure_io.py:153-251`).

The charts partition into three tiers by **what data they need**, which decides where they can live:

### Tier A — QC charts (per-run; computable from ONE quant run's abundance matrix)
Engines in `scripts/promoted/qc_figures/*.py`; drivers `qc_fig_*.py` (peptide/protein) and
`qc_fig_spectral.py` (nsaf/psm). Sample metadata enters only as coloring/annotation; **most need no
case-vs-control contrast at all.** These are the natural fit for the Quant Common pages.

| Chart (figure stem) | Plotly type | Levels | Needs metadata? | Key math (file:line) |
|---|---|---|---|---|
| `cv` — per-feature CV distribution (overlaid histogram + KDE + median line) | histogram (+ optional KDE line / violin) | protein, peptide, nsaf, psm | no | CV = std(ddof=1)/mean across samples, **linear** scale (`qc_figures/cv.py:120-149`) |
| `abundance-boxplot` — per-sample box plots, one panel per processing state | box | protein, peptide (3 states); nsaf, psm (1) | for stripes/order only | per-sample distributions of log2 states (`qc_figures/abundance_boxplot.py:700`) |
| `dynamic-range` — rank-abundance curve + IQR band, contaminants marked | scatter/line + fill | protein, nsaf, psm (**no peptide**) | no | per-feature median of detected, ranked desc; log2 y (`qc_figures/dynamic_range.py:155-228`) |
| `id-depth` — detected features per run (bars, colored by condition) | bar | protein+peptide (1 fig), nsaf+psm (1 fig) | color/divider only | count finite & >0 per sample (`qc_figures/id_depth.py:128-172`) |
| `missingness` — completeness step-curve + MNAR hexbin (detection rate vs mean log2) | scatter (hv) + histogram2d | protein, peptide, nsaf, psm | color only | detection-rate masks + Pearson r (`qc_figures/missingness.py:248-276`) |
| `pca` — PC1/PC2 scatter, one panel per state, colored by batch/condition | scatter | protein, peptide, nsaf, psm | color only | z-score features → PCA(full SVD), 2 comps (`qc_figures/pca.py:138-187`) |
| `sample-correlation` — clustered Pearson heatmap + dendrogram + stripes | heatmap | protein, peptide, nsaf, psm | stripes/color only | Pearson r over samples + avg-linkage clustering (`qc_figures/correlation.py:170-240`) |

### Tier B — Metadata/design charts (need only the uploaded sample sheet; no abundances)
`scripts/promoted/metadata_figures.py`, from precomputed `results/metadata/*` tables. OBSERVED.

| Chart | Plotly type | Needs | Note |
|---|---|---|---|
| `cohort-counts` | bar (small multiples) | sample metadata (condition/batch/pair counts) | pure design summary |
| `crosstabs/condition-by-batch`, `condition-by-run-half` | grouped bar | condition × (batch\|run-half) | design balance |
| `run-layout` | categorical scatter | condition + run order per batch | the run-order-aliased caveat figure |

### Tier C — Differential/analysis charts (REQUIRE a user-defined case-vs-control contrast)
`scripts/scratch/analysis_figures/*.py`, from saved DE result tables. **Not derivable from a single
run** — they need a two-group contrast + (usually) a paired design + model fits across samples. OBSERVED.

| Chart | Plotly type | Levels | Needs |
|---|---|---|---|
| `volcano-<q>-paired` | scattergl + threshold shapes | protein, peptide, nsaf, psm_log2 | log2FC + BH q from the contrast model |
| `pvalue-hist-*` (per design / per quantity / by tercile) | histogram | protein, peptide, nsaf, psm | contrast p-values |
| `quant-comparison` (log2FC scatter, residual-SD by quantity/abundance) | scatter | protein (common set) | contrast fold changes across LFQ/NSAF/PSM |
| `residual-sd-by-design` | step histogram | protein | model residuals |

**Blunt scoping consequence:** Tier A (and cheap parts of Tier B) can be added to the Quant Common
pages with data already in the browser and mostly trivial math. Tier C is a **separate, larger feature**
(contrast-definition UI + heavy stats port) and should not gate Tier A.

---

## 4. Data: what the charts consume vs. what Limelight already has client-side

### 4.1 What the reference charts consume (the input contract)
The pipeline's in-memory contract (`data_loading.Dataset`, `data_loading.py:56-85`, OBSERVED) is exactly
what a browser chart needs:
- `abundances`: `(n_samples, n_features)` float matrix (`NaN` = missing),
- `feature_names` + `feature_metadata`,
- `metadata`: per-sample DataFrame indexed by sample id,
- `scale` tag (`linear`/`log2`/…) — load-bearing; every transform refuses scale-incorrect input.

Raw inputs it parses (OBSERVED):
- **Protein LFQ** `data/protein-quants.tsv` — id col `Protein Groups`; per-sample intensities matched by
  regex **`^Intensity_search_scan_file_id_(\d+)$`**; `"0"`→NaN (not quantified this run), literal
  `"NaN"`→NaN (not quantifiable across runs) (`protein_loader.py:105,147-149,357-366`).
- **Peptide LFQ** `data/peptide-quants.tsv` — id col `Sequence` (base + one trailing `[+mass]`,
  positional isoforms collapse); **two** per-sample families `Intensity_search_scan_file_id_<id>` and
  `Detection Type_search_scan_file_id_<id>`; Detection Type ∈ {MSMS, MBR, NotDetected,
  MSMSIdentifiedButNotQuantified, MSMSAmbiguousPeakfinding} (`peptide_loader.py:77-87,194-219`).
- **Spectral counts / NSAF** `data/protein-limelight-table-dump.txt` — columns `PSMs (<label>)`,
  `NSAF (<label>)`, `Quant (FlashLFQ) (<label>)`; label→sample resolved by value-matching
  (`limelight_loader.py:140-151,208-279`).
- **Sample metadata / design** → derived `results/metadata/samples.tsv` (columns: `condition`, `batch`,
  `seq_number`, `run_position_within_batch`, `run_half`, `sample_id`, `candidate_pair`, `sample_role`,
  **`search_scan_file_id`** = the join key, …). **Crucially, in the repo these design fields are derived
  from the mzML *filename* + a side `metadata.tsv`** (`state/METADATA.md:16-28`). OBSERVED.

### 4.2 What Limelight already has in the browser (the crux)
There are **two representations**; the Quant Common page uses the filtered numeric one:

**(a) CHOSEN source — cutoff-filtered, numeric, per-sample × per-feature matrix, already loaded.** OBSERVED.
- Peptide: `quant/quant_PrototypeData.ts` POSTs `d/rws/for-page/flashlfq-run--result-retrieval-joined`;
  the Java controller **re-derives the run's reported peptides from the current PSM/Peptide/Protein
  cutoffs** and returns per-`reportedPeptideId` records `{ intensity, groupId, ambiguousZeroed,
  detectionType }`. Parsed into
  `_record_ByReportedPeptideId_ByScanFileId: Map<searchScanFileId, Map<reportedPeptideId, {…}>>`
  (`quant_PrototypeData.ts:113-150`; controller
  `FlashLFQ_Run__Result_Retrieval_Joined_RestWebserviceController.java:258-281`). **This is effectively
  the per-sample × per-peptide intensity matrix (with detection type), respecting cutoffs, in-browser.**
- Protein: `quant/flashlfq_proteinQuant_PrototypeData.ts` POSTs
  `d/rws/for-page/flashlfq-run--result-retrieval-proteins`; parsed into
  `_intensity_ByProteinSequenceVersionId_ByScanFileId: Map<searchScanFileId, Map<proteinSequenceVersionId, number>>`
  + a parallel non-finite-token map (`:101-111`). Same idea, per protein.
- Both are module-memoized (`quant_PrototypeData_GetIfLoaded()` / `flashlfq_proteinQuant_GetIfLoaded()`),
  so they survive the peptide↔protein toggle without refetch. OBSERVED.
- Intensity column naming is confirmed **`Intensity_search_scan_file_id_<id>`** /
  `Detection Type_search_scan_file_id_<id>` (the FlashLFQ service assigns `search_scan_file_id_<id>`
  as the sample name). OBSERVED (both retrieval controllers + submit controller `:118`).

**(b) NOT used for charts — raw TSV text.** The sibling Raw Peptide/Protein TSV viewer pages load the
full raw `QuantifiedPeptides.tsv` / `QuantifiedProteins.tsv` **text** and hand-split it on `\t` into
strings (`quant_data_file_pages/.../quantDataFile_RawViewMode.tsx:62-83`). Unfiltered, untyped. The Quant
Common page does not load this. OBSERVED.

**Difference that matters:** (a) is cutoff-filtered, numeric, keyed to Limelight ids (reportedPeptideId /
proteinSequenceVersionId), joins done server-side; (b) is the unfiltered raw text with FlashLFQ's own row
keys. **Charts use (a)** — which also aligns with the maintainer's standing rule to display data that
respects the user's active cutoffs. (Minor identity note: repo keys peptides by collapsed `Sequence` and
proteins by `Protein Groups`; Limelight keys by `reportedPeptideId` / `proteinSequenceVersionId`.
Conceptually per-peptidoform / per-protein either way — fine for distributional QC charts. inferred.)

**(c) Sample metadata + PSM counts — already in the browser.** `quant/quantRunInfo_LoadFromServer.ts`
loads `quant_metadata.json` (per-`searchScanFileId` records: `scanFileName`, `searchId`, `metadataCells[]`
aligned 1:1 with `metadataHeaders[]`, `hasPsms?`) and `params_manifest.json` (per-sample `psm_count`,
`sample_name`). The existing `quant/quantRunInfoPanel_Component.tsx` already builds a per-sample table
from these. OBSERVED. **So per-sample PSM counts and the user's uploaded metadata columns are already
client-side** — the feed for any metadata-driven coloring and for Tier B.

**(d) Run identity.** The page reads `#qr;<entries>` via `quant/quant_RunHash_Parse.ts`
(`<projectSearchId>_<searchScanFileId>_<requestId>` triples); MainContent derives distinct requestIds in
`componentDidMount`. OBSERVED.

### 4.3 The metadata-designation problem (a real design gap)
In the reference repo, `condition`/`batch`/`run order`/`candidate_pair` are **derived from filenames**.
In Limelight they come from the **user-uploaded, free-form metadata columns** (`metadataHeaders` +
`metadataCells`). Therefore:
- Charts needing **only abundances** (CV, dynamic-range, missingness core, id-depth counts, uncolored
  boxplots) work with **zero metadata** — nothing to designate.
- Charts that **color/annotate by condition or batch** (PCA, sample-correlation stripes, boxplot stripes,
  id-depth coloring) need the user to **designate which metadata column means "condition" / "batch."**
  → a small column-picker UI (dropdowns over `metadataHeaders`).
- **Tier C** additionally needs a full **contrast definition**: which column is the grouping factor,
  which two levels are case vs. control, and (optionally) which column is the pairing factor.

This designation UI is the main *new* interaction surface; it does not exist today. inferred (no such
control found in the quant FE).

---

## 5. Transform-portability catalog (what must be re-implemented in TypeScript)

Per C2, all of this runs in the browser. Difficulty tags: **trivial / moderate / heavy**.

**Everything the primary QC states use is trivial/moderate:**

| Transform | Difficulty | Needs metadata? | Notes / algorithm (file:line) |
|---|---|---|---|
| Token→NaN missing coding ("0", "NaN") | trivial | no | already partly present in the parsed records (`ambiguousZeroed`, non-finite-token map) |
| Contaminant flag + exclusion | trivial | no | regex on ids + dump-group membership (`protein_loader.py:235-277`) |
| Complete-case filter (detected in all samples) | trivial | no | defines the analysis set (`missing_values.py:244-255`) |
| log2(x + pseudocount) | trivial | no | pseudocount 1.0 LFQ (`normalize.py:165-187`) |
| Median normalization (÷ per-sample median, rescale to mean-of-medians) | moderate | no | verify exact formula vs the `pronoms` lib to match (`normalize.py:130-162`) |
| CV = std(ddof=1)/mean (linear) | trivial | no | `cv.py:120-149` |
| Dynamic range (median/IQR, rank) | trivial–moderate | no | `dynamic_range.py:155-228` |
| Missingness + MNAR Pearson r | trivial–moderate | color only | `missingness.py:248-276` |
| ID depth (detected count/sample) | trivial | color only | `id_depth.py:128-172` |
| Per-sample medians / range | trivial | no | `abundance_boxplot.py:212-245` |

**Heavy items (well-bounded; name the exact algorithm to find a JS equivalent):**

| Transform | Difficulty | Used by | Algorithm / lib to match |
|---|---|---|---|
| **PCA** | heavy | pca | z-score features (StandardScaler) → **full SVD**, 2 comps (`pca.py:138-187`). JS: `ml-pca`/`ml-matrix` or a Jacobi SVD. Only 8 samples → cheap at runtime. |
| **Hierarchical clustering + dendrogram** | heavy | sample-correlation | scipy `linkage(metric="euclidean", method="average")` + leaf order (`correlation.py:170-240`). JS: agglomerative clustering + leaf ordering; Plotly has no native dendrogram, so either omit the tree and just reorder the heatmap, or draw the tree with line shapes. |
| **ComBat batch correction** | heavy | CV/PCA "batch_corrected" states only | `pycombat.Combat` (Johnson 2007 parametric empirical Bayes) (`batch_correct.py:170-232`). **Deferrable** — show raw + median-normalized states first. |
| **Gaussian KDE** | moderate | cv overlay | scipy `gaussian_kde` (`cv.py:381`). Can omit and show histogram only, or port a small Scott/Silverman KDE. |
| **Moderated-t + empirical-Bayes (limma `fitFDist`) + BH** | heavy | Tier C only | digamma/trigamma + Brent root-find + t-distribution (`differential_abundance.py:407-466`). **jstat** (already a dep) provides `jStat.studentt` CDF and gamma functions, which covers part of it; the `fitFDist` prior is the hard kernel. BH itself is trivial. |

**Existing FE libraries that reduce the port** (OBSERVED `front_end/package.json:29-46`):
- `plotly.js-dist-min ^3.7.0` (charts), `d3 ^7.9.0` (scales/color), **`jstat ^1.9.6`** (distributions —
  useful for t-tests / p-values; wrapper at
  `page_js/common_all_pages/external_libraries_without_typescript_definition__calls/jstat_ExternalLibrary_Without_TypescriptDefinition_Calls.ts`),
  `@stdlib/stats-lowess ^0.2.3`, `ml-savitzky-golay ^5.0.0`, `papaparse ^5.4.1`.
- **New (small) code needed:** log2/normalization/CV/matrix helpers over the `quant_PrototypeData` /
  `flashlfq_proteinQuant` maps. No general matrix/SVD lib is present yet, so PCA/clustering would add a
  dependency (`ml-matrix`/`ml-pca`) or a small hand-rolled routine. inferred.

### 5.1 JS/TS availability of each Python dependency — "what has no JS/TS?"

The `trivial/moderate/heavy` tags above measure *effort*; they deliberately do **not** distinguish two
very different situations, which this table separates:
- **Bucket A — already a Limelight dependency** (in `package.json`, in use today). Just call it.
- **Bucket B — a JS/TS library exists (add an npm dep), or the math is small enough to hand-write.** No
  fundamental gap; a dependency decision.
- **Bucket C — no JS/TS library exists; the algorithm must be hand-ported.** This is the real "no JS/TS
  available" answer.

**Confidence:** Bucket-B/C availability was **verified against the live npm registry on 2026-09-24**
(queried `registry.npmjs.org` for latest version + `api.npmjs.org` for last-week downloads); the Python
side and the Bucket-A "already installed" claims are OBSERVED in source. Verified results:
- **Bucket B exists (well-maintained):** `ml-matrix` 6.15.0 (~1.17M downloads/wk), `ml-pca` 4.1.1
  (~21.6k/wk), `ml-hclust` 4.0.0 (~18.6k/wk). KDE: `fast-kde` 0.2.2 (~4.3k/wk) and `science` (science.js,
  `science.stats.kde`) both provide it, or hand-roll (~20 lines).
- **Bucket A confirmed installed matches registry:** `jstat` 1.9.6, `@stdlib/stats-lowess` 0.2.3.
- **Bucket C confirmed absent:** targeted searches for a JS ComBat / limma port returned **no real
  implementation** — `pycombat`, `combat-js`, `combatjs`, `limma`, `limma-js` are **NOT_FOUND**; the
  names that do resolve (`combat` 0.0.1, `sva` 0.0.1) are single-download 0.0.1 name-squatters, not
  batch-correction/DE code. So ComBat and the limma moderated-t kernel genuinely have no JS/TS library
  and must be hand-ported. (Absence can never be proven absolutely, but the obvious names are covered.)

| Python function / library | What it does | Used by (chart / tier) | JS/TS status | Bucket |
|---|---|---|---|---|
| `scipy.stats.t` / `norm`, special fns | t / normal / gamma distributions, p-values | DE tests (Tier C); Pearson-r p | **`jstat`** — installed & in use | **A** |
| `statsmodels` LOWESS | smoothing trend line | quant-comparison scatter (Tier C) | **`@stdlib/stats-lowess`** — installed & in use | **A** |
| `sklearn.decomposition.PCA` + `StandardScaler` (full SVD) | z-score features → PCA scores (2 comps) | PCA scatter (Tier A/Phase 2) | `ml-pca` **4.1.1** / `ml-matrix` **6.15.0** (ml.js) — exist (npm-verified), **not installed**. Standardizing is trivial hand-code. | **B** |
| `scipy.cluster.hierarchy.linkage/dendrogram` — **leaf ordering** | cluster samples → row/col order | sample-correlation heatmap (Phase 2) | `ml-hclust` **4.0.0** — exists (npm-verified), **not installed** | **B** |
| `scipy.stats.gaussian_kde` | smooth density curve over histogram | CV chart overlay (Tier A) | `fast-kde` **0.2.2** or `science` (science.js) — exist (npm-verified); or ~20-line hand-roll; **or omit** (histogram alone suffices) | **B** |
| `pronoms` median normalizer | ÷ per-sample median, rescale | all normalized states | trivial hand-code (verify exact formula vs `pronoms`) | **B** |
| `pycombat.Combat` | ComBat empirical-Bayes **batch correction** | batch-corrected CV/PCA states only (**deferrable**) | **no JS/TS lib** (npm-verified absent 2026-09-24) — hand-port the EB algorithm | **C** |
| `limma`-style moderated-t + `fitFDist` EB prior (`scipy.special.{digamma,polygamma}` + `optimize.brentq`) | the differential-abundance kernel | volcano / p-value hist / quant-comparison (**Tier C**) | **no JS/TS lib** (npm-verified absent 2026-09-24). The special functions exist (`jstat`), but the `fitFDist` estimator + moderation must be hand-written. Hardest item. | **C** |
| Dendrogram **tree drawing** | render the tree beside the heatmap | sample-correlation heatmap | **Plotly.js has no native dendrogram** (Python-only figure factory). Draw with line shapes, or omit the tree and just show the reordered heatmap. | **C** |
| `pronoms` VSN normalizer (arsinh ML fit) | variance-stabilizing normalization | **unused** in the QC path | no JS/TS lib | **C (moot — unused)** |

**Reading of the table:** the only Bucket-C items that touch the recommended early phases are **ComBat**
(and it is explicitly deferred) and the **dendrogram tree drawing** (avoidable by reordering the heatmap
without a drawn tree). The genuinely hard hand-port — **the limma moderated-t / `fitFDist` DE kernel** —
is confined to **Tier C (Phase 3)**, which is already scoped as a separate, later feature. So **no
Phase-1 chart depends on anything in Bucket C**, and Phase 2 needs only Bucket-B additions (`ml-pca`,
`ml-hclust`).

---

## 6. Chart → Plotly → page mapping (feasibility per chart)

Level-to-page mapping: **Quant Common Peptide page → peptide-LFQ charts; Quant Common Protein page →
protein-LFQ charts.** The **nsaf / psm** levels come from spectral counts (the Limelight dump), a
*different* data source than FlashLFQ LFQ; whether that spectral data is available to the Quant Common
pages in the browser is **unverified** and is treated as out-of-initial-scope (see Open Questions).

| Chart | Page(s) | Plotly trace | Data feed | Phase | Feasibility |
|---|---|---|---|---|---|
| CV distribution | peptide, protein | histogram (+opt. KDE line) | (a) matrix → CV per feature | 1 | easy |
| Dynamic range / rank-abundance | protein (repo has no peptide variant; peptide optional) | scatter+fill | (a) matrix | 1 | easy |
| Missingness completeness + MNAR | peptide, protein | scatter(hv) + histogram2d | (a) matrix + detection | 1 | easy–moderate |
| ID depth (per-sample detected counts) | peptide, protein | bar | (a) matrix; color needs metadata | 1 (2 for color) | easy |
| Abundance boxplot (per sample) | peptide, protein | box | (a) matrix; stripes need metadata | 1 (2 for stripes) | easy |
| PCA (samples) | peptide, protein | scatter | (a) matrix → z-score → SVD; color needs metadata | 2 | moderate (SVD port) |
| Sample-correlation heatmap | peptide, protein | heatmap | (a) matrix → Pearson; order needs clustering | 2 | moderate–hard (clustering) |
| Metadata: cohort counts / crosstab / run-layout | shared (run-level) | bar / scatter | (c) metadata only | 2 | easy (needs column designation) |
| Volcano / p-value hist / quant-comparison | peptide, protein | scattergl / histogram | (a) matrix + **contrast definition** + DE stats | 3 | hard (contrast UI + limma port) |

Perf note: per-feature scatters (volcano) can be thousands of points → use **`scattergl`** (already in
use). PCA is over ~samples (tiny). Histograms/boxplots aggregate. No perf concern for Tier A/B. inferred.

---

## 7. Recommended architecture & placement

Consistent with C4/C5 and the existing structure (OBSERVED, §4):

**Component shape.** A self-contained, collapsible **`QuantCharts_Panel`** class component per level,
mirroring `QuantRunInfoPanel_Component` (instance-field `_expanded=false`, `force_Rerender`). Each chart
is a child class component that builds `chart_Data`/`chart_Layout`/`chart_config` (reusing
`qcPage_StandardChartLayout` + `qcPage_StandardChartConfig`) and calls `Plotly.newPlot` on a ref div,
purging on unmount. A shared `quant/quantCharts/` folder holds: the panel, per-chart components, and a
`quantChartsMath.ts` with the ported transforms (log2, median-normalize, CV, completeness, PCA, Pearson).

**Data plumbing (no new fetch — reuse memoized loaders):**
- Peptide view: feed `this.state.quant_PrototypeData` (already loaded, `PeptideView …:3195`).
- Protein view: feed `flashlfq_proteinQuant_GetIfLoaded()` (already read, `ProteinView …:3347`).
- Both: pass the run-info metadata (`quantRunInfo_LoadFromServer` output) for per-sample labels / PSM
  counts / metadata-column designation.

**Insertion anchors (OBSERVED line numbers; re-verify at implementation time):**
- **PeptideView** `QC_SPA/quantCommonSPAView_PeptideView_Component.tsx`: inside the
  `mainDisplayData_Loaded` true-branch `<React.Fragment>` (`:3149-3219`), mount the panel just before the
  peptide-list table container `<div>` (`:3179`) or just after it closes (`:3214`). Feed
  `this.state.quant_PrototypeData`.
- **ProteinView** `QC_SPA/quantCommonSPAView_ProteinView_Component.tsx`: inside the
  `_allSearchesHaveProteins` `<React.Fragment>` (`:3661`), mount after the existing
  `<Quant_PrototypeData_StatusMessages_Component>` (`:3702`) and above the `<DataTable_TableRoot>`
  (`:3817`). Feed `flashlfq_proteinQuant_GetIfLoaded()`.
- **Optional shared/sample-level charts** (Tier B, run-level) → MainContent
  `QC_SPA/quantCommonSPAView_MainContent_Component.tsx` right after the run-info panel (`:414`, before
  `{ child }` at `:415`), reusing `_runInfoPanel_RequestIds` / `_runInfoPanel_ProjectId`. Put charts here
  **only** if they are run/sample-level (metadata-driven) and identical across both views; anything
  level-specific stays in the children.

**Bundling:** none required — the Quant Common SPA entry point already pulls Plotly transitively (§2).

---

## 8. Phased implementation plan

**Phase 1 — abundance-only QC charts (no metadata designation, all math trivial/moderate).**
CV distribution, missingness/MNAR, id-depth counts, per-sample abundance boxplot, (protein) dynamic
range. On both peptide and protein pages, off the already-loaded filtered matrix. Highest value for
lowest cost; ships without any new UI beyond the collapsible panel. Delivers immediate interactivity
(hover/zoom/PNG+SVG export) that the static matplotlib figures lack.

**Phase 2 — metadata-aware QC + design charts.** Add a **metadata-column designation** control (map an
uploaded column → "condition"/"batch"). Enables condition/batch coloring on Phase-1 charts, plus PCA
(SVD port) and the sample-correlation heatmap (clustering port), plus Tier B metadata charts
(cohort-counts, crosstab, run-layout) as a run-level panel. Introduces the SVD/clustering dependency.

**Phase 3 — differential abundance (separate, larger feature).** A **contrast-definition UI** (grouping
column, case/control levels, optional pairing) + the limma moderated-t + BH port (leaning on `jstat`
for the t-distribution; `fitFDist` is the hard kernel) → volcano, p-value histograms, quant-comparison.
Consider whether a simpler two-group test (Welch t, already covered by `jstat`) is an acceptable first
cut before the full moderated-t. Defer ComBat batch correction until a batch-corrected chart state is
actually requested.

### 8.1 Optional variant — offload the two Bucket-C kernels to a cacheable compute service

**Status: OPEN OPTION, not decided.** This is recorded for the Tier-C / batch-correction discussion; it
is **not** part of the recommended Phase 1/2/3 path above, and it is an explicit **exception to
constraint C2** (see the tradeoff below). Nothing here is committed.

**The idea.** The only two computations with no JS/TS library — **ComBat** (batch correction) and the
**limma moderated-t / `fitFDist` DE kernel** (§5.1, Bucket C) — are also the hardest, riskiest hand-ports.
Instead of porting them, a **stateless compute microservice** could accept the FlashLFQ-derived input and
return **numbers** (a batch-corrected matrix / a per-feature DE table); the front end then renders those
numbers with Plotly. Everything else (all Tier A QC charts, PCA, clustering, every trivial transform)
stays fully in the FE.

**Tradeoff vs. the FE-only constraint (the decision the maintainer owns).** This reintroduces
server-side *computation*, contradicting **C2 ("all raw-data processing in the front end")**. It does
**not** violate **C1** — it returns numbers, not images, and rendering/app-logic stay in the FE — so it
is arguably a narrower thing than the server-side *image* generation C1 rules out. Whether offloading
just these two Bucket-C kernels is an acceptable C2 exception is a policy call, not a technical one.

**Why it caches well.** Both kernels are **deterministic pure functions** of their inputs (parametric
ComBat has no RNG; moderated-t + `fitFDist` + BH are deterministic — the repo's permutation *diagnostic*
is the only stochastic piece and is not the volcano/q-values, and would be seeded). Same inputs →
identical output → safe to cache. inferred (determinism is a known property of these algorithms; not
re-derived from source this pass).

**The cache is NOT keyed on the quant run alone.** The FlashLFQ output is immutable once a run completes,
but the result also depends on inputs that vary independently of the run and therefore must be in the key:
1. the **cutoff state / analyzed feature set** (the filtered matrix reflects the user's current
   PSM/Peptide/Protein cutoffs; the DE family for BH depends on the whole set),
2. **preprocessing** (complete-case filter, normalization method, log2/pseudocount),
3. the **design** — i.e. the resolved per-sample factor vectors + method/alpha params (see below).
So a single run yields **many** valid results — one ComBat output per batch designation, one DE table per
contrast — but a user explores only a handful per run, so the cache stays small. DE tables are tiny;
a ComBat matrix is modest. Natural storage = per-run artifacts in the service data volume (outside the
repo, alongside the existing `quant_metadata.json` / `params_manifest.json`).

**Cache-key design (content-addressable, store-and-verify):**
- **Hash = SHA-256** used as an *index* — a cryptographic hash (NOT CRC/Murmur/`String.hashCode`, and NOT
  MD5/SHA-1). Collision probability is negligible at any realistic scale.
- **Do not trust the hash alone.** On a hash hit, **store the full canonicalized input and byte-compare it
  against the incoming input before returning the cached result** (else treat as miss / separate bucket
  entry). This makes correctness independent of the hash and catches the *realistic* failure modes — a
  serialization/canonicalization bug that maps two different inputs to the same bytes, or the same logical
  input serializing differently across code versions — not just theoretical collisions. Also store and
  verify an **algorithm-version tag** so a change to the ComBat/limma implementation busts the cache.
- **Canonicalize deterministically before hashing/storing:** fixed sample order (e.g. `search_scan_file_id`
  ascending), fixed feature order (by feature id), floats as raw IEEE-754 bytes (not `printf`), consistent
  NaN handling — the same logical matrix must always produce identical bytes.
- **What must be in the canonical input:** the abundance matrix **+ the resolved per-sample factor vectors**
  (the actual case/control label + pairing per sample, from the uploaded metadata cells) **+ the
  method/alpha params.** Keying on the *column name* alone is a bug: a metadata edit that flips a sample's
  condition must invalidate the entry, which only happens if the resolved per-sample values are hashed.
- Tradeoff accepted: storing the full input ~doubles storage and adds a byte-compare per hit — both trivial
  next to recomputing the kernel.

**"Design spec" defined.** The *analysis definition* (the statistics "design" — the model + the contrast),
separate from the matrix data:
- **ComBat:** minimal — the **batch assignment** (which metadata column = "batch", resolved to a per-sample
  batch label).
- **limma DE:** the full contrast/model, e.g. `{ analysis, groupingColumn, caseLevel, controlLevel
  (reference), pairingColumn|null, covariates[], method (moderated|welch|mannwhitney), correction: "BH",
  alpha }`. This maps onto the repo's three designs (paired / batch / unadjusted), which differ only in
  which covariate column enters the model.

**Cleanest mental model:** the canonical input (matrix + resolved factor vectors + method/alpha params) is
the single thing canonicalized, stored, hashed, and byte-verified; the "design spec" — which column plays
which role — is just the human-facing structural summary of the resolved vectors, not a separate key input.

**Cache-key completeness — this is the correctness property; get it exhaustively right.** A cached result
is served whenever the key matches, so **any input that changes the output but is absent from the key
yields a silently stale/wrong result.** With a descriptor-only key there is **no backstop** — the
byte-verify compares descriptors too, so a forgotten input is omitted from both sides and never caught.
Two rules follow:

1. **Cover the matrix by hashing the actual materialized input matrix, not a hand list.** Limelight's
   joined retrieval controller already materializes the cutoff-filtered per-sample intensity matrix
   server-side; hash *those bytes* as one key component. Because Java owns the whole key (Python never
   recomputes it), this hash need only be **self-consistent within Java** — no cross-language float
   concern. A materialized-matrix hash **captures every matrix-affecting input by construction**, even
   ones nobody enumerated. It does **not** cover anything outside the matrix (design, method, version) —
   those must still be listed (groups B–E).
2. **Enumerate the non-matrix inputs explicitly and review for completeness.**

Full enumeration of everything that determines the output:

- **A. Matrix-determining inputs** — *auto-covered if you hash the materialized matrix (rule 1); list as
  explicit descriptors only if you don't:* level (peptide vs protein); run identity = the full set of
  `(projectSearchId, searchScanFileId, requestId)` triples + JOINT-vs-PER_FILE mode; the immutable
  FlashLFQ result version per run (⚠ **unverified** that a requestId's output can never be replaced — if
  it can, add a content-version); sample set + canonical column order; **the complete active cutoff state**
  (all PSM/peptide/protein cutoffs the controller uses to re-derive passing features — ⚠ **exact parameter
  set unverified against Limelight source; biggest omission risk**); feature-aggregation options
  (mod-form summing / "collate" / grouping — ⚠ **unverified**); missing-value coding (`0`/`NaN`/
  `ambiguousZeroed`/detectionType → value-vs-NaN); preprocessing pipeline **and params** (complete-case
  threshold, contaminant include/exclude, normalization method+params, log2 + pseudocount value,
  drop-constant) **and the order / which state**.
- **B. Design — resolved per-sample vectors, NOT column names** (a metadata edit must invalidate):
  ComBat → per-sample **batch label** vector; limma → per-sample **case/control** vector + reference
  level + per-sample **pairing** vector + any per-sample **covariate** vectors + the **excluded-sample** set.
- **C. Method / statistical params:** kernel + method (ComBat; limma `moderated|welch|mannwhitney`);
  ComBat → parametric?, mean-only?, reference-batch, min-variance passthrough threshold,
  covariate-preservation; limma → variance-floor params, correction (`BH`), **alpha/CI level**, sidedness,
  prior settings.
- **D. Implementation version:** a **compute-version tag** bumped on any math/code change, **plus** the
  underlying library versions that can shift numerics (`pycombat`, `scipy`/`numpy`). A numerics change with
  identical inputs must bust the cache.
- **E. Determinism:** if any stochastic step is ever surfaced (the repo's permutation *diagnostic*), its
  **seed** goes in the key. Core ComBat / moderated-t are deterministic → N/A for the volcano/q-values.

**Status note:** groups B–E must be hand-enumerated and reviewed; group A is where silent omissions hide,
so hashing the materialized matrix (rule 1) is the robust default. The ⚠ items in group A
(cutoff-parameter set, FlashLFQ-result immutability, feature-aggregation options) are **not yet verified
against Limelight source** — a targeted grounding pass is warranted before finalizing any explicit
group-A descriptor list. (Related: `flashlfq_quant_run_on_final_filtered_psms.md`, the variable-mod-form
summing plan doc.)

### 8.1a Compute-execution options — WHERE the Python runs

The compute is Python either way (decision: no hand-port). The open choice is *where it executes*. Three
options; (3) is already rejected.

**Option 1 — server-side Python service (the §8.1 body above).**
- **C2:** exception (server-side computation; not images, so not C1).
- **Caching:** ✅ a **shared, compute-once-serve-many** server cache — one (run + design) computed once
  serves every user/session. **This is the decisive advantage for any result that is viewed repeatedly or
  by multiple users:** for cached/shared results, the server is the right place to compute.
- Cost: the C2 exception + operating a service + the full cache-key completeness machinery above.

**Option 2 — Pyodide / WASM, computed in the browser.**
Run the reference repo's **exact, already-tested Python unchanged** (its hand-rolled moderated-t + `fitFDist`
on numpy/scipy, and `pycombat`) inside **Pyodide** (CPython compiled to WASM). numpy, scipy, pandas are
official Pyodide packages; `pycombat` is pure-Python (installable via micropip).
- **Upside:** **C2-compliant** (runs client-side, no server compute); **no hand-port** → minimal
  numerical-divergence risk (it is the same code that produced the reference figures).
- **Negatives — list in full:**
  1. **Large first-load. Verified compressed download sizes (Pyodide CDN v314.0.7, 2026-09-24 range
     requests):** core `pyodide.asm.wasm` **3.3 MB** + `python_stdlib.zip` **2.4 MB** + loader JS, then
     **numpy 2.8 MB**, **scipy 13.2 MB** (dominates), **pandas 4.0 MB**, deps (dateutil/pytz/six) ~0.5 MB
     → **≈ 26 MB** for the full stack (limma alone still needs scipy → ≈ 22 MB even without pandas). Plus
     **micropip-fetching `pycombat`** at runtime. These are *download* sizes; the **uncompressed in-memory
     footprint is larger**, and Pyodide init/compile adds **several seconds** on first use.
  2. **No shared cache — every browser/session recomputes.** Client-side compute **forfeits the
     compute-once-serve-many benefit**; the same run's ComBat/limma is recomputed on each device, for each
     user, every session (barring a per-client IndexedDB cache, which is not shared). **This is the core
     reason that, for cached/shared results, Option 1 (server) is the better solution** — you cannot get a
     shared cache from client-side compute without *also* standing up a server cache, at which point you
     may as well compute on the server.
  3. **Runs on the user's CPU/RAM.** Compute time and memory are the client's; large **peptide-level**
     matrices (tens of thousands of features) must be validated for WASM memory limits.
  4. **Must run in a Web Worker** to avoid blocking the UI thread (extra plumbing).
  5. **A thin in-memory adapter is required** — the repo's functions read TSV/parquet from disk; you must
     feed them the in-memory matrix + design instead (small code, but not zero).
  6. **Version pinning + hosting** of the Pyodide runtime + numpy/scipy/pandas wheels (self-host or CDN;
     large static assets to serve and pin).
  7. **Lazy-load benefit is conditional (⚠ open item, must confirm the UX):** if the ComBat/limma charts
     render **on page load**, deferring the ~26 MB load buys almost nothing — the only win is **overlapping
     the download with the page's initial AJAX calls**. Lazy-loading only pays off if these charts are
     **behind an explicit user action** (open a tab / click "compute DE"). **Confirm whether Tier-C charts
     are display-on-load vs on-demand before relying on lazy-loading** — it is a design decision, not yet
     made.
  8. Minor: results depend on the client WASM/BLAS build; a server-native recompute could differ by ULPs
     (irrelevant unless server and client compute are mixed for the same value).

**Option 3 — hand-port to TS/JS.** Rejected (maintainer): re-derivation risk on the hardest numerics.

**Recommendation shape (not a decision):** the caching requirement is the deciding axis. **Results that are
cached / shared / viewed repeatedly → Option 1 (server), because only the server gives a shared
compute-once cache.** Option 2 (WASM) is most attractive for **ad-hoc, exploratory** compute where the user
defines bespoke contrasts that wouldn't cache-reuse across users anyway, and where keeping strictly within
C2 outweighs the ~26 MB first-load. **DECIDED 2026-09-24: Option 1 (server route)** — see the decision block
below.

**DECIDED (2026-09-24): Option 1 — server route.** The compute runs in a server-side Python service; the FE
sends the canonical input + design and renders the returned numbers. Accepted as a C2 exception. Decisions:
- **NEW service in a NEW repo** — **clone the FlashLFQ Python service infrastructure** into a fresh
  repo/service (do NOT extend the existing FlashLFQ service). This is a **later phase** — recorded now,
  not part of Phase 1.
- **DISCUSS BEFORE IMPLEMENT — caching lives in the Limelight web app (Java), not the Python service.**
  The Java side computes the cache key and owns the cache (per §8.1's cache-key design); it should lean on
  **Limelight's existing home-grown caching** rather than a new mechanism. **Ask the maintainer which
  built-in Limelight caching to use before implementing the cache.**
- "Everything is easily changed" (repo author) → keep the compute behind a **swappable interface** so the
  implementation and location stay changeable.

### 8.1b Which ComBat / limma implementation — the reference repo is NOT authoritative

**DECIDED (repo author, 2026-09-24): use the reference repo's EXACT ComBat/limma code** — `pycombat==0.20`
+ the repo's hand-rolled scipy moderated-t. The author owns correctness for these; he added that
**"everything is easily changed."** Consequences: the `inmoose` caveats below (incl. #181) are **moot** (we
are not using inmoose); **R is not used**; and because the repo's code is **pure-Python + numpy/scipy/pandas**,
it is **Pyodide-compatible → BOTH the server route (Option 1) and the WASM route (Option 2) are viable** (see
§8.1a). Design implication of "easily changed": put the compute behind a **swappable interface** so the
implementation (repo code → inmoose → R oracle) and the location (server ↔ WASM) can change without touching
the chart/UI code. The rest of §8.1b (below) is retained as the rationale/record for why the repo code isn't
authoritative and what the alternatives were, should a swap ever be wanted.

**Do not treat the reference repo's ComBat/limma choices as the correct implementations.** The repo appears
to have been generated to "use ComBat and limma" without a specified implementation, so it picked defaults
that should be re-decided (a point to raise with the repo's author):
- **ComBat = `pycombat==0.20`** (`batch_correct.py:48,223`; `pyproject.toml:10`) — a ~6 KB pure-Python
  package, last released **2022-01-06**, effectively unmaintained. Notably this is **not** the peer-reviewed
  *pyComBat*; it is an unrelated tiny package. OBSERVED.
- **limma = hand-rolled**, not R limma: the moderated-t + `fitFDist` empirical-Bayes prior is
  re-implemented in Python on scipy (`differential_abundance.py`). It is **un-reviewed** code — plausible
  but not validated against a reference. OBSERVED.

**RECOMMENDED Python implementation of both limma and ComBat → `inmoose`** (for the server route, Option 1).
- **`inmoose` (0.9.1, PyPI-verified 2026-09-24; Epigene Labs; Python ≥3.11).**
  Repo: `https://github.com/epigenelabs/inmoose` · Docs: `https://inmoose.readthedocs.io/en/latest/` ·
  PyPI: `https://pypi.org/project/inmoose/`. A single, actively-maintained package covering **both** kernels
  with no R dependency:
  - **ComBat** — `from inmoose.pycombat import pycombat_norm`, the **peer-reviewed pyComBat** (BMC
    Bioinformatics 2023, `doi:10.1186/s12859-023-05578-5`). (Also `pycombat_seq`, edgeR/DESeq2, cohort-QC.)
  - **limma** — `inmoose.limma` is a **faithful, comprehensive port of limma's core**, mirroring the R
    internals function-for-function (OBSERVED in the GitHub module tree
    `inmoose/limma/`): `lmfit.py` (`lmFit`), `ebayes.py` (`eBayes`), `squeezeVar.py`, `fitFDist.py`
    (Smyth's F-dist prior — the exact moderated-t kernel), `contrasts.py` (`makeContrasts`/`contrasts.fit`),
    `decidetests.py` (`decideTests`), `toptable.py` (`topTable`), `marraylm.py` (`MArrayLM`). This is the
    complete limma core, not a one-off moderated-t.
  - **This replaces BOTH** the repo's tiny `pycombat 0.20` **and** its hand-rolled scipy DE with one
    maintained, peer-reviewed-lineage package.
  - **Limitation: compiled (C/Cython) extensions → NOT a Pyodide package**, so `inmoose` is effectively
    **server-side only** (reinforcing Option 1 over the WASM route if authoritative math matters).
  - *Confidence:* "faithful/high-quality" is judged from the function-for-function module structure +
    maintenance + peer-reviewed lineage + inmoose being built/tested against Bioconductor — **not** from a
    numeric validation run this pass. The definitive check is a numeric cross-comparison against R limma/sva
    on real data before committing.

**`inmoose` is NOT turnkey — issue-tracker findings (checked 2026-09-24) that affect how we'd use it:**
- **⚠ CRASH on our exact data shape (issue #181, OPEN, filed 2026-09-22, unresolved):** `inmoose.limma.eBayes`
  raises `KeyError: -2` when the empirical-Bayes prior df is **infinite** (small samples + near-homogeneous
  across-feature variance). The maintainer's own reproducer is **300 features × 8 samples, two groups of 4**
  — i.e. *literally the mriffle experiment shape (8 samples, 4v4)*. The moderated-t is computed before the
  failure; the crash is a Python `~`-on-`bool` bug in the downstream B-statistic (`lods`) that aborts the
  whole call, and `robust=True` is `NotImplementedError` (#177) so there is **no working path** for this
  case today. It is data-dependent (infinite `df_prior` needs homogeneous variance; real proteomics is
  usually heteroscedastic, so it may not fire) — **must be tested on real quant data, not assumed**. If it
  fires it is a small localized patch/monkeypatch.
- **`limma.model_matrix()` is broken/undocumented (#170):** the design-matrix helper doesn't work. Workaround
  (used by others): build the design yourself with `patsy.dmatrix("~ group", data=metadata)` or numpy and
  pass it to `lmFit`. Not a blocker, but the API is rough.
- **Thin docs / limited support (#164):** a "recommended limma workflow" question got **no maintainer reply**.
  Expect to work out the exact calling convention ourselves. (That thread is RNA-seq/voom, which we skip —
  for proteomics LFQ we feed the log2 matrix straight to `lmFit`→`eBayes`, no voom/DGEList.)
- **Maintenance is slowing:** latest release **v0.9.1 (2026-01-21)**, last push **2026-03-02**, with the
  Sept-2026 crash (#181) unanswered. So we may need to **carry our own patches** rather than wait on releases.
- **Packaging/deploy friction:** no wheels for all platforms (#180), pandas-version sensitivity (#120), macOS
  unsigned-library load error (#157). Manageable on a pinned Linux service, but real (and re-confirms the
  compiled-extension cost / non-Pyodide status).
- **Resulting usage caveats:** (1) **test the small-sample eBayes path on real data first** and be ready to
  patch #181; (2) **build design matrices ourselves** (patsy/numpy), don't rely on `model_matrix()`;
  (3) **validate numerically against R limma/sva**; (4) if #181 proves troublesome, it **strengthens the R
  `limma`/`sva`-via-`rpy2` fallback** (gold standard, no such bug) despite the R-runtime cost.

- **Other Python limma ports are weak:** `pylimma` 0.1.0 exists ("Python port of R limma") but is immature;
  the PyPI package literally named `limma` is unrelated (an ESP8266 automation framework — name collision);
  `diffxpy`/`rnanorm` are not limma ports. So `inmoose` is the clear pick.
- **Gold standard (if maximal validation is wanted): R/Bioconductor `limma` (`lmFit`+`eBayes`) +
  `sva::ComBat`**, via `rpy2` from a Python service. Maximal correctness; cost = an R + Bioconductor runtime.
- **Regardless of choice, validate the numbers against the R reference (limma/sva) on the same data**, since
  the repo's hand-rolled moderated-t is un-reviewed. (`inmoose` largely inherits that validation lineage.)

**This sharpens Option 1 vs Option 2 (§8.1a) again:** the *server* route can use `inmoose` (maintained) or R
`limma`/`sva` via `rpy2` (gold standard); the **Pyodide/WASM route is limited to pure Python** — `inmoose`'s
compiled extensions won't load and R-via-WebR is rough — so WASM would be **stuck with a hand-roll or the
unmaintained `pycombat`**. If authoritative ComBat/limma matters, that is another point in favor of the
server route.

---

## 9. Decision log (choices made during investigation)

1. **No server-side images / no server-side stats** — maintainer constraints C1/C2; the entire pipeline
   runs in the browser.
2. **Plotly stays at 3.7.0** — sufficient for every chart; no upgrade (§2).
3. **Chart the filtered per-sample matrix (`quant_PrototypeData` / `flashlfq_proteinQuant`), not the raw
   TSV** — respects cutoffs, already numeric and in the browser (§4.2, C4).
4. **Charts inside each per-view child; shared run-level charts optionally on MainContent** — the quant
   matrices live in the children (§4, §7, C5).
5. **Re-author charts as native Plotly** — the reference charts are matplotlib; only the chart
   definitions + data math are reused (C6).
6. **Phase by data dependency** — abundance-only (Tier A) first; metadata-designated coloring + PCA +
   correlation second; contrast-driven DE (Tier C) as a distinct later feature (§8).
7. **nsaf/psm levels out of initial scope** — different (spectral-count) data source whose client-side
   availability is unverified (§6, Open Questions).
8. **Defer ComBat** — only needed for "batch-corrected" chart states; show raw + median-normalized first.
9. **Recorded an OPEN OPTION (not a decision): where the ComBat/limma Python compute runs** (§8.1 / §8.1a).
   Hand-port rejected → Python compute. Two live options: **(1) server-side service** — C2 exception but the
   only route to a shared compute-once-serve-many cache (deterministic → SHA-256-indexed, store-and-verify
   content-addressable cache; favored for cached/shared results); **(2) Pyodide/WASM in-browser** —
   C2-compliant, no port, but verified ~26 MB first-load and no shared cache (per-session recompute).
   Awaiting the maintainer's call; only bites Phase 2/3.

## 9a. Phase B — Raw/Normalized toggle: only `-linear` is wired; the `-log2` files exist and are un-wired (2026-09-26)

Phase B added a **Raw / Normalized** toggle to the Quant Common charts (peptide + protein), fed by the
FlashLFQ service's **median-normalized** derivatives. Key facts for a future session:

- **The service persists BOTH normalized scales per run and serves both** (GET
  `/flashLFQRunResult?request_id=<id>&file=<token>`):
  - `combined-peptides-normalized-linear` → `CombinedPeptides.normalized.linear.tsv`
  - `combined-peptides-normalized-log2`   → `CombinedPeptides.normalized.log2.tsv`
  - `combined-proteins-normalized-linear` → `CombinedProteins.normalized.linear.tsv`
  - `combined-proteins-normalized-log2`   → `CombinedProteins.normalized.log2.tsv`
  - `normalize-status` → `normalize_status.json` (`{status:SUCCESS|FAILED, peptides:{n_features_in,n_features_out,reason}, proteins:{…}}`).
  All are in the SAME `#`-header our-format as the combined files (a complete-case SUBSET — features finite
  AND >0 in EVERY sample). Median normalization is a per-sample linear scalar, so `-linear` values
  sum/aggregate exactly like raw.
- **Limelight Phase B wires ONLY the `-linear` tokens.** The charts apply their own per-chart log2 to the
  linear values (exactly as they do for Raw), so the toggle is a pure matrix swap. The two Limelight
  normalized-linear proxy controllers are structural siblings of the raw joined/proteins retrieval
  controllers (`FlashLFQ_Run__Result_Retrieval_Peptides_Normalized_Linear_RestWebserviceController` /
  `..._Proteins_Normalized_Linear_...`); the normalize-status proxy is a sibling of the params-manifest
  proxy (`Quant_FlashLFQ_NormalizeStatus_Retrieval_RestWebserviceController`).
- **The `-log2` tokens are intentionally NOT proxied** (no Limelight consumer yet — the FE does its own
  log2). They are available for a future direct consumer (e.g. a chart that wants to plot the service's own
  log2 rather than re-log the linear values); a new session would add a sibling proxy controller + FE loader
  for them exactly as the `-linear` pair was added.
- **Failure UX:** normalization is best-effort/non-fatal service-side, so a run can be READY with normalize
  FAILED. When this run's `normalize-status` is not SUCCESS, a top-block banner shows and selecting
  Normalized shows a message-only (no plot); Raw is unaffected. Normalized data is fetched LAZILY on the
  first switch to Normalized and cached.

## 10. Open questions for the maintainer

1. **Scope of tiers:** is the initial target Tier A (per-run QC) only, or is Tier C (differential
   volcano/DE) expected in this effort? Tier C is materially larger (contrast UI + limma port).
2. **nsaf/psm charts:** do you want spectral-count (NSAF/PSM) charts on the protein page, and if so is
   that data already retrievable client-side on the Quant Common pages? (Unverified here.)
3. **Metadata designation UX:** acceptable to add a small "map metadata column → condition/batch"
   control, or should Phase-1 ship uncolored (abundance-only) with no new UI?
4. **Multi-run (JOINT) vs single-run:** the reference experiment is 8 runs in one design. On a Limelight
   JOINT run the per-sample columns span multiple scan files (one requestId); on PER_FILE runs each file
   is its own run. Confirm charts should treat all samples in the currently-shown run(s) as one matrix.
5. **Which specific charts** are must-haves vs. nice-to-haves for v1 (this doc lists the full menu).
6. **Where does the ComBat/limma Python run?** (§8.1a) — implementation now DECIDED (use the repo's exact
   pure-Python code; §8.1b), so both locations are technically viable; the open part is location only:
   (1) **server-side Python service** = a C2 exception but the **only** way to get a shared,
   compute-once-serve-many cache (favored for cached/shared results, and reuses the existing FlashLFQ Python
   service infra → fastest to stand up); (2) **Pyodide/WASM in-browser** = C2-compliant, but a **verified
   ~26 MB first-load** (scipy ≈13 MB), **no shared cache**, and novel plumbing. Only bites Phase 2/3.
   Recommendation given "wants something running + easily changed": **server route, behind a swappable
   interface.** Sub-question: **are Tier-C charts display-on-load or on-demand?** — determines whether
   Option 2's lazy-loading is worth anything (on-load ⇒ almost no lazy-load benefit).

---

## 11. Key source references (for the implementer)

**Reference chart repo** (`github.com/mriffle/limelight-quant-experiment`): chart engines
`scripts/promoted/qc_figures/*.py`; drivers `scripts/promoted/qc_fig_*.py`, `qc_fig_spectral.py`;
loaders `scripts/promoted/loaders/*.py`; DE `scripts/scratch/analysis/differential_abundance.py`;
data model `scripts/promoted/loaders/data_loading.py:56-85`; save/legend convention
`scripts/promoted/common/figures/figure_io.py`.

**Limelight front end:**
- Plotly pattern/helpers: `qc_page/qc_common_utils/qcPage_StandardChartLayout.ts`,
  `qcPage_StandardChartConfig.ts`; version `front_end/package.json:39`.
- Quant Common pages: `QC_SPA/quantCommonSPAView_MainContent_Component.tsx` (render `:404-418`),
  `quantCommonSPAView_PeptideView_Component.tsx` (`:3149-3219`),
  `quantCommonSPAView_ProteinView_Component.tsx` (`:3661-3817`).
- Data loaders: `quant/quant_PrototypeData.ts` (`:113-150`),
  `quant/flashlfq_proteinQuant_PrototypeData.ts` (`:101-111`),
  `quant/quantRunInfo_LoadFromServer.ts` (metadata + manifest),
  `quant/quantRunInfoPanel_Component.tsx` (panel pattern), `quant/quant_RunHash_Parse.ts`.
- Retrieval controllers (column naming): `FlashLFQ_Run__Result_Retrieval_Joined_RestWebserviceController.java:258-281`,
  `FlashLFQ_Run__Result_Retrieval_Proteins_RestWebserviceController.java:251-253`.

---

*Investigation performed 2026-09-23 via parallel source reads of the reference repo and limelight-core.
Line numbers reflect the tree at that date and should be re-verified before editing.*
