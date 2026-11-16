# Quant QC page — overview (current state)

> **Replaced 2026-11-16.** This file used to hold the detailed working design record of the Quant Common page's Charts view. That
> record was retired from the repo; this file is now a short overview of the page as it is today. The file name (old page name, old
> date) is kept because other docs and code point to it. The page was renamed from "Quant Common" to "Quant QC" on 2026-11-12.
>
> **Reasons, alternatives and history** for every choice described here are in the decision log,
> [`quant_common_page__charts_view__decision_log_and_rationale_2026-10-04.md`](quant_common_page__charts_view__decision_log_and_rationale_2026-10-04.md)
> (§25-§36 cover the page as it is now). When this overview and the code differ, the code wins.

**Status:** built and verified on local test data; uncommitted as of 2026-11-16. The quant runs are still kept by the FlashLFQ service
(not in the database); see `quant_pages_TODO.md`.

## 1. What the page is

The QC page of **one FlashLFQ quant run** (one "Add New Quant" submit = one FlashLFQ request id). It reads the run's FlashLFQ result
files directly: one FlashLFQ row = one peptide or protein, with no mapping to Limelight reported peptides and no page filters on the
quant values. It shows **one chart at a time**, chosen per tab. Explanatory "how it is computed" text is not rendered on the page.

## 2. Route and entry

- Route **`d/pg/psb/quant-qc/`** (page controller `QuantQCSPAView_Controller`, JSP
  `WEB-INF/jsp/data_pages/project_search_ids_driven_pages/quantQCSPAView.jsp`). The JSP loads the logged-in bundle
  (`quantQCSPAViewPage_RootLaunch_LoggedInUsers`) for a project owner / researcher on an unlocked project, else the public-user bundle.
- The run is named in the URL hash `#qr;…`; the page accepts exactly one FlashLFQ request id and fails loudly on more.
- Entry link: the project page's quant runs list shows, for each READY run, **Quant QC** | Raw Peptide TSV | Raw Protein TSV | Download.
- Browser tab title "Limelight - Quant QC"; page heading "Quant QC". The older routes `quant-common-peptide` / `quant-common-protein`
  were removed with no redirect (decision log §25).

## 3. Above the tabs (top to bottom)

1. **Normalization-failed banner**, only when the run's `normalize_status.json` says FAILED (the normalized and batch-corrected chart
   states are then unavailable).
2. **Search Details** block (the standard Limelight search details / filters block, display only).
3. **"Uploaded Metadata & Quant Run Settings"** run info panel, collapsed by default; on first expand it loads the run's
   `quant_metadata.json` and `params_manifest.json`. FlashLFQ settings are shown under **"FlashLFQ options:"** — the options only, without
   the executable or any path (decision log QC1-7, QC1b-6).
4. Heading **Charts**, then:
   - a **not-quantified** note: one line per scan file of the run with no PSMs passing the filters;
   - the **match-between-runs repeatability** box (always shown; decision log §21);
   - a one-line **match-between-runs definition** plus the run's MBR data lines (run mode, MBR on / off, MBR RT window, peptide MBR count);
   - the **Samples** legend: one line per sample, `sf<index>: (<search>) <scan file name>`; the charts label samples `sf1`, `sf2`, …;
   - the **Run order** block: "Run order from column:" (none, or an offered sample-metadata column) and "Order samples by:" (run order |
     scan file). Choosing a column reorders the boxplot and ID-depth samples and colors the boxplot boxes by acquisition order. The block
     shows nothing when the run has no usable sample metadata.

When the run cannot be shown, a message replaces the body: no run selected, still loading, run not available, or the run's outputs were
written by an older / newer version (re-run quant / reload the page). A result file that the run should have but is missing is reported
per tab.

## 4. Tabs and measures

Two tabs, **Peptides | Proteins** (default Peptides); only the selected tab is rendered. Each tab has a **"Measure:"** select:

| Tab | Measure | Data | When it loads |
|---|---|---|---|
| Peptides | **Quant (FlashLFQ)** (default) | FlashLFQ peptide result files: raw, plus median-normalized and batch-corrected when the run produced them | with the page |
| Peptides | **PSM count (Limelight)** | the run's **peptide identity map** (written at submit): the PSMs sent to FlashLFQ per peptide and scan file; absent = 0 | the first time the measure is chosen (no button); disabled when the run has no identity map |
| Proteins | **Quant (FlashLFQ)** (default) | FlashLFQ protein result files (same processing states); protein names from Limelight's filtered protein info | with the page |
| Proteins | **PSM count (Limelight)**, **NSAF (Limelight)** | the page's **filtered** PSMs for the run's searches, counted per FlashLFQ protein row; NSAF from Limelight's existing NSAF calculation | only after the **"Load PSM counts"** button; once loaded, both measures use it |

- Protein PSM count / NSAF carry a built-in check: per scan file, the PSMs counted must equal the PSM count recorded for the run; if not,
  the counts are not shown and the per-file differences are listed. After loading, a summary line gives the PSMs counted, how many match
  several proteins, and how many match none.
- PSM count and NSAF have one as-is state (no normalization or batch correction).
- Changing the measure keeps the selected chart. A peptide row missing from the identity map is an error (fail loudly; decision log §33).
- The single load start for the protein PSM data is `_proteinsSpectral_RequestLoad()` in the Charts view component, called only from
  the button (decision log §33 / §34; to load on selection instead, call it from the Proteins measure handler).

## 5. Charts

A **"Chart:"** select (grouped) chooses the one chart shown. The same 8 QC charts are drawn for every measure:

| Group | Chart | What it shows |
|---|---|---|
| Processing | **Abundance per sample** (boxplot) | per-sample log2 abundance; one stacked panel per processing state present (raw → median-normalized → batch-corrected) over the same complete feature set; whiskers 1.5 × IQR, linear quartiles; optional annotation stripes below (batch column always, other metadata columns by checkbox) |
| Processing | **CV** (histogram) | per-feature coefficient of variation (sample std. dev. / mean, linear values) over the complete feature set; processing states overlaid as density histograms with a Gaussian KDE and a dashed median line |
| Detection and abundance (raw data) | **Identification depth per run** | detected features (finite and > 0) per sample, count label per bar, dashed median; batch dividers; "Color bars by:" a metadata column |
| | **Completeness** | number of features detected in at least a given fraction of samples: a step curve per batch and a dashed "all runs" curve |
| | **MNAR diagnostic** | per feature, mean log2 of the detected values vs detection rate: hexbin density (log color scale), binned-median trend, Pearson r |
| | **Dynamic range** | features ranked by median linear intensity over detected samples; log2(median) curve with an IQR band; orders of magnitude in the subtitle |
| Sample relationships | **PCA** | PC1 vs PC2, one panel per processing state; points colored by a chosen metadata column ("Color PCA points by:") |
| | **Sample correlation** (Pearson r) | clustered correlation heatmap with a dendrogram and one annotation stripe per categorical metadata column; diagonal masked; cell values shown up to 16 samples |

- The Processing block heading and a processing-state color key sit above the chart; with batch correction present, a cautions panel
  sits below it. A one-sample run draws only the boxplot, identification depth and dynamic range (a status line says so).
- A failed processing state shows the reasons and a "Show chart" button before drawing.
- Exports: each chart has the Plotly "Download plot as a png" / "svg" buttons. There is no table download on this page (the run's
  result-file download is on the project page).

### 5.1 Quant vs PSM count scatter

The **"Quant vs PSM count"** group adds one scatter per tab (decision log §34, §35):

- **One sample at a time**: "Sample:" select (samples in legend order; default the first; no "All samples" option).
- **Axes:** y = log2 of the **raw** FlashLFQ quant value; x = the PSM count in that sample (peptides: from the identity map; proteins:
  the protein PSM count, behind the same "Load PSM counts" button). **"X axis:"** Log (default) or Linear.
- **Left out, and counted below the plot** (in this order, each row once): no quant value in the sample; a quant value but no PSMs
  (for peptides: match-between-runs); for peptides only, a FlashLFQ peptide that maps, over all its scan files, to more than one
  distinct Limelight reported peptide (one function: `quantCharts_QuantVsPsmCountScatter__ReportedPeptideIds_ByRow_DistinctBareIds_AllScanFiles`).
- **Tooltips:** peptides show the reported-peptide string with variable modifications (no static modifications), loaded through the
  filtered loaders the first time the peptide scatter is shown (a missing or inconsistent string is an error); proteins show the name.
  Both show the PSM count and quant value. Peptides draw with WebGL (`scattergl`), proteins with SVG.
- While the scatter is selected, the "Measure:" select is disabled (with a reason line).

## 6. Data sources

**Webservices** (Java controllers in `limelight_webapp/.../spring_mvc_parts/data_pages/rest_controllers/other_like_project/`, paths in
`AA_RestWSControllerPaths_Constants.java`):

| Path (`d/rws/for-page/…`) | Controller | Used for |
|---|---|---|
| `quant--flashlfq-run-available-files` | `Quant_FlashLFQ_RunAvailableFiles_RestWebserviceController` | which result files the run has (first call) |
| `quant-add-new--flashlfq-params-manifest` | `Quant_AddNew_FlashLFQ_ParamsManifest_Retrieval_RestWebserviceController` | the run's manifest (states requested, scan files, PSM counts); run info panel |
| `quant--flashlfq-normalize-status` | `Quant_FlashLFQ_NormalizeStatus_Retrieval_RestWebserviceController` | only when normalization was requested |
| `quant--flashlfq-batch-correct-status` | `Quant_FlashLFQ_BatchCorrectStatus_Retrieval_RestWebserviceController` | only when batch correction was requested |
| `quant-add-new--flashlfq-quant-metadata` | `Quant_AddNew_FlashLFQ_QuantMetadata_Retrieval_RestWebserviceController` | sample metadata (legend, run order, colors, stripes); run info panel |
| `quant--flashlfq-combined-result-file` | `Quant_FlashLFQ_CombinedResultFile_Retrieval_RestWebserviceController` | the result TSVs and the peptide identity map (token allowlist in the controller) |

**Run files read:** `params_manifest.json`; `normalize_status.json` / `batch_correct_status.json` (only when the manifest says they are
expected); `quant_metadata.json`; per level `CombinedPeptides.tsv` / `CombinedProteins.tsv` (raw) and, when produced,
`*.normalized.linear.tsv`, `*.batch_corrected.log2.tsv`, `*.batch_corrected.delog2.tsv`; `peptide_identity_map.json.gz` (Peptides PSM
count and the peptide scatter only). An expected file that is absent is an error. Loaded data is cached per (project, request id) and used
synchronously when already loaded (`{ data, promise }`).

**Limelight data:** only the filtered `…_For_MainFilters` per-search loaders (protein info; reported-peptide, protein-coverage and PSM
table data for the protein PSM counts; peptide ids, sequences and reported-peptide-level variable modifications for the peptide tooltips).
The unfiltered PSM-table loader is not used.

## 7. Sizing

- All sizes are in one settings file, **`quantCharts_SingleChartSize_Settings.ts`** (the only place to tune them): the chart box is
  the available width clamped to 600-1100 px by (window height − 200 px) clamped to 400-850 px; each chart's original size; ID depth
  30 px per sample; the PCA panel floor; correlation cell size limits. Helper: `quantCharts_SingleChartSize.ts`.
- Each chart keeps its original aspect ratio, scaled uniformly into the box and raised to the minimum size (decision log §28). ID depth
  grows with the number of samples; PCA and correlation keep square panels / cells. The abundance boxplot is not sized by the settings
  file. When a chart is wider than the window, the page scrolls.
- After a window resize, each shown chart is re-sized once, 3 s after the last resize, only when its box changed (decision log §27).
- A chart, tab or measure switch keeps the old height and shows an "Updating" cover until the new chart has drawn, so the page does not
  jump (§29); a chart removed mid-draw is purged only after Plotly's pending calls settle (§30).

## 8. URL state

- The page's selections are saved in the central page state under key **`'y'`** (part of the compressed `q` URL segment every data page
  uses): object `quantQCSPAView_ChartsView_CentralStateManagerObjectClass.ts`, pure encode / decode `quantQCSPAView_ChartsView_UrlState.ts`
  (decision log §36).
- Saved (29 values): the tab; each tab's measure; per tab and measure the chart, "Color PCA points by", "Color bars by" and the boxplot's
  extra stripes; "Run order from column" and "Order samples by"; per tab the scatter's sample and X-axis scale. Defaults are omitted;
  metadata columns are saved by index and name and used only when both still match.
- Read once when the Charts view is created; written about 250 ms after the last change.
- Not saved: clicks inside the Plotly charts, expanded / collapsed panels, and whether "Load PSM counts" was clicked. A restored protein
  PSM count / NSAF / protein scatter shows the button; protein PSM data never loads from a URL.
- An invalid value falls back to its default, with no message.

## 9. Where the code lives

Front end, under `limelight_webapp/front_end/src/js/page_js/data_pages/`:

- **Page:** `project_search_ids_driven_pages/quant_pages/quant_qc_spa_view_page/` — root launch / root class
  (`quantQCSPAViewPage_RootLaunch_*.ts`, `quantQCSPAViewPage_RootClass_*.ts`), `quantQCSPAView_MainContent_Component.tsx`,
  `quantQCSPAView_ChartsView_Component.tsx` (tabs, measures, loads, scatter input), the URL-state files, `quantQCSPAView_SetDocumentTitle.ts`.
- **Charts:** `quant/quantCharts/` — `quantCharts_ChartsContent_Component.tsx` (chart select and blocks), `quantCharts_ChartSelect.ts`,
  the chart components, the scatter (`quantCharts_QuantVsPsmCountScatter_Component.tsx`, `…_Compute.ts`,
  `quantCharts_QuantVsPsmCount_ViewerChoices.ts`), loaders (`quantCharts_ChartsView_Load.ts`, `quantCharts_RunOutputs_Load.ts`,
  `quantCharts_PeptideIdentityMap_Load.ts`, `quantCharts_SpectralCounts_Load.ts`, `quantCharts_ProteinDisplayNames_Load.ts`,
  `quantCharts_ReportedPeptideDisplayStrings_Load.ts`), builders (`quantCharts_PeptidePsmCount_Build.ts`,
  `quantCharts_SpectralCounts_Compute.ts`), sizing, `quantCharts_PlotlyPendingCalls.ts`, `quantCharts_RunOrderControls_Component.tsx`,
  colors (`quantCharts_Colors.ts`). Some files in this folder are dormant (not mounted; decision log §24).
- **Shared quant:** `quant/` — the run info panel (`quantRunInfoPanel_Component.tsx` and helpers), `quantRunInfo_LoadFromServer.ts`,
  `quantRunAvailableFiles_LoadFromServer.ts`, `quant_RunHash_Parse.ts`.

Server: the page controller `QuantQCSPAView_Controller`, the JSP above, and the six webservice controllers in §6.

## 10. Not on the page

Kept in the code but not rendered (decision log §24, §26, §33): the Spectral counts tab (now the Proteins PSM count / NSAF measures),
the Study design block, differential abundance and its diagnostics, the LFQ-vs-spectral blocks, the protein case study, the full
match-between-runs explanation, the explanatory notes, and the old Quant peptide / protein list views.
