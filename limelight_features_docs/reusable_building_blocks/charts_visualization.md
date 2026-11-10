# Reusable building blocks — Charts and visualization

Part of the reusable-building-blocks inventory; start at [README.md](README.md) (keyword index, quick picks, duplicates).
Counts and user lists are as of 2026-11-09 and approximate; grep before relying on them.

All charting in Limelight is front-end TypeScript/React under `limelight_webapp/front_end/src/js/`. The house standard is
**Plotly** (`plotly.js-dist-min`) with the QC page's standard layout/config; a few views use hand-built **d3** SVG (mod page
heatmap, scan file browser plots) and one uses a hand-built SVG (protein bar). 3D structures use **Mol\*** (molstar), and
annotated MS2 spectra use the third-party **Lorikeet** jQuery plugin on its own page. Many "general" chart helpers live
inside the QC page folder (`qc_page/`) and are imported from there by other pages.

Path abbreviations: `DP/` = `limelight_webapp/front_end/src/js/page_js/data_pages/`;
`QC/` = `DP/project_search_ids_driven_pages/qc_page/`; `CA/` = `limelight_webapp/front_end/src/js/page_js/common_all_pages/`;
`PW/` = `DP/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/`.


## Quick picks

| If you need... | Reuse this | Entry |
|---|---|---|
| Add a chart to the QC page | Copy the Charge State triplet (single / sub-search / multi-search variant) | QC plot triplet template; sub-search / multi-search variants |
| Standard Plotly look, PNG/SVG download buttons | `qcPage_StandardChartConfig` + `qcPage_StandardChartLayout` | QC standard Plotly chart config and layout |
| Many Plotly charts on one page without slowness | `QcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot` (PNG queue + live overlay) | QC Plotly render queue |
| Drop stale async results when the user changes inputs fast | `QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput` + registry | Stale-async guard ("track latest updates") |
| Set a Plotly property missing from TS typings (violinmode, bingroup, nbinsx, transforms) | `Plotly_PlottingLibrary__SetProperties_NOT_in_TypescriptTypingsDefinition` | Plotly common helpers |
| Colors per search / sub-search / N categories | `DP/color_manager/*` (`Limelight_Colors_For_MultipleSearches`, `..._For_SingleSearch__SubSearches`, `..._and_OtherUses`) | Search / category color palettes |
| Two-color gradient (heat shading) | `Limelight__scaleColor_BasedOn_Fraction` | Color interpolation |
| Brand colors in TS | `limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants.ts` | Brand colors constants |
| "No data", "Creating", "Updating", "click to enlarge" chart covers | `QC/qc_common_components/*` | QC chart frame components |
| A chromatogram (XIC, isotope traces, AUC, RT range) | `DP/chromatogram_common/*` (+ the two big chromatogram components) | Chromatogram shared code |
| Smooth a series (LOWESS, Savitzky-Golay) | `DP/peptide_mass_utils/SmoothingUtils.ts` | Signal smoothing |
| MS1 retention time x m/z heatmap from spectr binned data | `qcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__Compute_MS1_Data` | MS1 binned ion-current heatmap compute |
| A d3 heatmap with drag-select | `ModView_DataViz_Renderer.ts` (reference only) | Mod page d3 heatmap |
| "View spectrum" for a PSM | `SpectrumRetrieveAndDisplay_Use_lorikeet.viewSpectrum_NewWindow` | Lorikeet: open in new window |
| Embed a Mol* 3D viewer / parse a structure file | `protein_Structure_WidgetDisplay__Main_Component.tsx` (reference) / map-new-structure overlay parse block | Mol* viewer embedding; Headless Mol* parse |
| Protein position -> structure residue | `ProteinStructure_ResolvedChainMapping` (fail loud) | Structure chain residue mapping |
| Export a structure view to ChimeraX | `molstar__read_structure_create_chimerax_file__ConvertToCXC` | Mol* -> ChimeraX export |
| Download an SVG or text built in the browser | `StringDownloadUtils.downloadStringAsFile` (SVG `outerHTML` pattern in bar widget) | Downloading charts and visuals |
| y = x reference line on a score-vs-score scatter | `QcViewPage__ReferenceLine_Y_equals_X_Calculation_Class` (has a probable bug) | y = x reference-line helper |
| Precursor PPM error per PSM | `qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch` | PSM PPM mass error compute |

---

## Plotly foundation

### QC Plotly render queue: main-page charts as PNG, live chart in overlay (`QcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot`)
- What it solves: a page with dozens of live Plotly charts is slow. This class queues main-page charts and renders them
  **one at a time** into a temporary off-screen div on `<body>` (`left:-5000px`, class
  `selector_qc_chart_temp_render_for_main_page__should_be_deleted`), converts each with `Plotly.toImage` into the target
  `<img>` `src`, then purges the temporary Plotly DOM. In the "click to enlarge" overlay it renders a real interactive Plotly
  chart sized to the overlay div and **pauses** the main-page queue while the overlay is open. Wraps `Plotly.restyle` /
  `Plotly.relayout` with success/fail callbacks; can optionally apply the x-axis-label relayout fix.
- Search keywords: render plot, lazy plot rendering, chart to image, Plotly toImage, PNG chart, chart queue, many charts slow,
  render one chart at a time, overlay chart, pause rendering, abort render, purge plot, restyle, relayout, plot lifecycle
- Location: `QC/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.ts`. Class
  `QcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot`, methods `qcPage_Plotly_RenderPlotOnPage__RenderOn_MainPage__As_PNG`,
  `qcPage_Plotly_RenderPlotOnPage__RenderOn_Overlay__As_PlotlyPlot`, `qcPage_Plotly_RenderPlotOnPage__RenderOn_Overlay__ChartDimensions`,
  `restyleChart`, `relayoutChart`, `removeChart_InOverlay_FromDOM`; param classes
  `QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params` / `..._RenderOn_Overlay_Params` (each with `abort()` /
  `is_aborted()`) and `QcPage_Plotly__ChangePlotlyLayout_For_XaxisLabelLengths__Params`.
- Used by: one instance created in `QC/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component.tsx` and carried on
  `QcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot`; 81 QC
  files call `RenderOn_MainPage__As_PNG(` (every live single/sub/multi-search plot and `QC/qc_common__feature_detection/jsx/*`).
  Outside QC: `DP/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root_and_main_page_components/featureDetection_ViewPage__MainPage_Component.tsx`.
- How to use / extend: hold one instance per page. Per main-page chart build a `..._RenderOn_MainPage_Params` (Plotly
  data/layout/config, an `HTMLImageElement`, success/fail callbacks), call `..._RenderOn_MainPage__As_PNG`, keep the params
  and call `abort()` when inputs change and in `componentWillUnmount`. For the overlay call `..._RenderOn_Overlay__As_PlotlyPlot`
  and `removeChart_InOverlay_FromDOM` on close.
- Do not use when: one or two always-visible interactive charts (mod page, chromatograms call `Plotly.newPlot` directly).
- Limits and gotchas (seen in code, not runtime-tested):
  - When `newPlot`, `relayout` or `toImage` fails on the main-page path, the in-progress flag is reset but
    `_process_NextRequest_IfAnyExist()` is not called; queued charts wait for the next enqueue or overlay close.
  - In the overlay path the relayout `catch` clears the **main-page** in-progress flag (looks like a copy-paste slip) and leaves
    the pause on; only `removeChart_InOverlay_FromDOM` lifts it.
  - The overlay method overwrites `chart_Layout.width/height` on the params you pass.
  - `abort()` only skips not-yet-started requests; a running render still sets the `<img>` src.
  - Deletes any `<body>` child with the temp-render class.
  - Must import `plotly.js-dist-min`; importing `plotly.js` does not build (in-file comment). `Plotly.toImage` is used only here.
- Related / duplicates: direct `Plotly.newPlot` paths (mod page histogram + replicate report, both chromatograms) are the
  parallel non-queued approach. Lives in the QC feature folder although the feature-detection page uses it.
- Status: verified (re-checked)

### QC x-axis-label relayout fix (`qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object`)
- What it solves: after a chart is drawn, measures rendered x tick labels; if they overlap the x-axis title, builds a
  `Plotly.relayout` object that moves the title down and (main page, `adjustPlotHeight`) makes the plot taller.
- Search keywords: long x axis labels, category labels overlap axis title, relayout, bottom margin, rotated labels, label length
- Location: `QC/qc_common_utils/qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object.ts`;
  `({ plotRoot_DOM_Element, xAxisLabels, xAxisTitle, adjustPlotHeight })` returns `{ updateLayoutNeeded, updateLayout }`.
- Used by: only the render queue; charts opt in via `changePlotlyLayout_For_XaxisLabelLengths__Params` on the render request.
- How to use / extend: set the params on the render-queue request rather than calling it directly.
- Do not use when: the chart is not in the DOM (it needs real measurements).
- Limits and gotchas: depends on QC standard margins/height from `qcPage_StandardChartLayout`.
- Related / duplicates: QC render queue.
- Status: verified (header and signature read; measurement internals skimmed)

### QC standard Plotly chart config and layout (`qcPage_StandardChartConfig` / `qcPage_StandardChartLayout`)
- What it solves: one consistent chart look. Config: no Plotly logo, built-in "toImage" removed, two custom mode-bar buttons
  ("Download plot as a png" / "...svg") that download the chart container. Layout: fixed 750x450, standard margins, title,
  axis titles, optional category x axis, legend, `exponentformat: 'e'`, optional tick marks on x labels, `spikedistance = 0`.
  Helpers: `qcPage_StandardChartLayout_StandardWidth/StandardHeight`, `..._Standard_Plot_Margin_Bottom`,
  `..._ActualChartArea_Width/_AspectRatio`, `qcPage_ChartOverlayDimensions()` (overlay min 800x600).
- Search keywords: chart config, Plotly layout defaults, download png svg, modebar buttons, export chart image, standard chart
  size, chart margins, overlay chart size, chart theme
- Location: `QC/qc_common_utils/qcPage_StandardChartConfig.ts` (`qcPage_StandardChartConfig({ chartContainer_DOM_Element, chartLayout })`),
  `QC/qc_common_utils/qcPage_StandardChartLayout.ts` (`qcPage_StandardChartLayout({ chartTitle, chart_X_Axis_Label,
  chart_X_Axis_IsTypeCategory?, chart_Y_Axis_Label, showlegend?, notMoveTitle?, search_SubSearch_Count_SizeFor?,
  hovermode_OnlyProcessFalseValue_MayBeIgnored?, add_TickMarks_To_X_Axis_TickLabels? })`).
- Used by: `qcPage_StandardChartLayout(` is called in 81 files, all in `qc_page/` (172 files mention the module incl. its
  other exports; counts spot-checked by grep).
  `qcPage_StandardChartConfig(` in about 85 files including 4 outside QC: `DP/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Histogram_Renderer.ts`,
  `.../mod_view_page/mod_page__jsx/ModPage_ZScore_ReplicateReport_DataTable_Component.tsx`, the PSM-list chromatogram and the
  feature-detection chromatogram.
- How to use / extend: `layout = qcPage_StandardChartLayout({...})`, adjust, then `config = qcPage_StandardChartConfig({
  chartContainer_DOM_Element, chartLayout })`. Outside QC the config is already the de-facto shared modebar/download config.
- Do not use when: the chart must be responsive/auto-sized (`autosize: false` is fixed).
- Limits and gotchas: if `chartLayout` is passed it must have `width` and `height` or the call throws. Download buttons use
  the container element, not Plotly's `gd`. `_CHART_DOWNLOAD_WIDTH` is computed but unused (null passed). Several layout params
  are optional `?`. General-purpose code living in the QC feature folder.
- Related / duplicates: `CA/Plotly_PlottingLibrary_CommonCode/Plotly_PlottingLibrary__Set_Layout_X_Axis_Add_TickMarkLines_To_TickLabels`
  (called by the layout). Chart width by category count (next-but-one entry).
- Status: verified (re-checked)

### Plotly common helpers (`CA/Plotly_PlottingLibrary_CommonCode/`)
- What it solves: sets Plotly properties missing from the TS typings in one place (`violinmode`, `transforms`, `bingroup`,
  `nbinsx`) instead of scattered `@ts-ignore`; adds tick-mark lines to a continuous x axis.
- Search keywords: Plotly, typings, ts-ignore, violin plot, histogram bins, bingroup, nbinsx, transforms, axis ticks, tick marks
- Location: `CA/Plotly_PlottingLibrary_CommonCode/Plotly_PlottingLibrary__SetProperties_NOT_in_TypescriptTypingsDefinition.ts`
  (`..._SetProperties_NOT_in_TypescriptTypingsDefinition.Layout_Class.*` / `.Data_Class.*`),
  `Plotly_PlottingLibrary__Set_Layout_X_Axis_Add_TickMarkLines_To_TickLabels.ts`.
- Used by: SetProperties in 17 files besides its own (QC plots, e.g. `QC/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSM_Target_VS_Decoy_Histogram_ByAnnScore_StatisticsPlot.tsx`);
  tick marks: `QC/qc_common_utils/qcPage_StandardChartLayout.ts`, `ModView_DataViz_Histogram_Renderer.ts`.
- How to use / extend: add a new static setter here for any new untyped Plotly property.
- Do not use when: n/a.
- Limits and gotchas: `transforms` is deprecated in Plotly. Escape user/server text before putting it in Plotly labels; see
  `limelight_webapp/front_end/Plotly_ChartingLibrary_Notes.txt`.
- Related / duplicates: QC standard layout.
- Status: verified (re-checked)

### Chart width scaled by number of searches / sub-searches (`search_SubSearch_Count_SizeFor`)
- What it solves: widens a category chart to `count * _Search_SubSearch_Category_Each_MinWidth` (at least 30 px per category)
  plus margins so many searches/sub-groups do not squeeze.
- Search keywords: chart width, many categories, wide chart, per search width, auto width
- Location: optional parameter of `qcPage_StandardChartLayout` (`QC/qc_common_utils/qcPage_StandardChartLayout.ts`).
- Used by: 12 sub-search and 13 multi-search plots (pass `chart_X.length`, `transforms_styles.length`, `chart_Data_Array.length`).
- How to use / extend: pass the number of x categories when the axis is per search or per sub-group.
- Do not use when: numeric x axis (histograms, scatter).
- Limits and gotchas: optional `?`; omitted means standard width.
- Related / duplicates: QC standard layout.
- Status: verified

## QC chart template and frame

### QC single-search plot "triplet" template (MainPageContainer + StatisticsPlot + OverlayContainer)
- What it solves: the standard way to add one Plotly chart to the QC page: static PNG on the main page, click opens a live,
  resizable Plotly chart in a modal overlay; includes "no data", "creating", "updating" covers, stale-update suppression and
  unmount cleanup.
- Search keywords: QC plot, QC chart, add a chart, Plotly chart component, statistics plot, chart in overlay, click to enlarge,
  histogram, scatter plot, violin, heatmap, chart template, single search plot
- Location: `QC/qc_single_search_plots/jsx/`; reference: `qcViewPage_SingleSearch__PSM_ChargeState_MainPageContainer.tsx`,
  `..._PSM_ChargeState_StatisticsPlot.tsx`, `..._PSM_ChargeState_OverlayContainer.tsx` (exports `open_PSM_ChargeState_OverlayContainer`).
  - MainPageContainer: `<h2>` title + `QcPage_ChartBorder`; `QcPage_ChartFiller_NoData` when `peptideList` is empty, else the
    StatisticsPlot with `isInSingleChartOverlay={false}`.
  - StatisticsPlot: class component with `static chartTitle`; props `qcViewPage_CommonData_To_AllComponents_From_MainComponent`,
    `qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent`, `isInSingleChartOverlay`. Implements
    the track-latest interface (register in constructor, un-register on unmount); `componentDidMount/DidUpdate` call
    `_populateChart` via `setTimeout`; `_populateChart` loads data, builds traces, layout and config, then a MainPage (with
    `<img ref>`) or Overlay (with `<div ref>`) params object for the render queue; aborts pending params on update/unmount;
    window-resize handler only in the overlay.
  - OverlayContainer: `open_X_OverlayContainer({params})` mounts via `limelight_add_ReactComponent_JSX_Element_To_DocumentBody`
    inside `ModalOverlay_Limelight_Component_v001_B_FlexBox`, sized by `qcPage_ChartOverlayDimensions()`.
- Used by: section components in `QC/qc_single_search_sections/jsx/` (e.g. `qc_SingleSearch_PSM_Level_Statistics_Section.tsx`,
  `qc_SingleSearch_ErrorEstimation_Section.tsx`, `qc_SingleSearch_ScanFile_Chromatography_Section.tsx`,
  `qc_SingleSearch_Target_Decoy_Analysis_Section.tsx`, `qc_SingleSearch_SummaryStatistics_Section.tsx`). Nothing outside `qc_page/`.
- How to use / extend: copy the Charge State triplet, rename, change `chartTitle`, aggregation, traces, axis labels; add the
  MainPageContainer to a section. Trace types in use (grep tally): `scattergl` 19, `histogram` 11, `bar` 5,
  `histogram2dcontour` 4, `scatter` 3, `violin` 2, `heatmap` 1 — copy the nearest plot of the same type. For new code, prefer
  the `{ data, promise }` loader form with a synchronous fast path (Target-vs-Decoy, MS1) over Charge State's always-async
  `..._ReturnPromise()`.
- Do not use when: the chart is not on the QC page (queue and registry are QC-page singletons on the common-data bag).
- Limits and gotchas: constructor throws if `projectSearchIds.length !== 1`. `shouldComponentUpdate` / `componentDidUpdate`
  compare props by reference and must be updated by hand when props are added (in-code comment). Uses `this.state` for
  creating/updating flags (existing style). about 300 lines of lifecycle
  boilerplate per plot, no shared base class.
- Related / duplicates: cloned for sub-searches and multiple searches (next two entries).
- Status: verified (re-checked)

### QC sub-search plot variant (one trace or category per selected sub-search)
- What it solves: the single-search chart broken out by search sub-group ("Sub Search") within one search, colored per sub-group.
- Search keywords: sub search chart, sub group QC, per sub-group plot, search sub groups chart, condition breakdown,
  searchSubGroupId plot, split by sub search
- Location: `QC/qc_single_search__sub_searches__plots/jsx/`; reference `qcViewPage_SingleSearch__SubSearches__PSM_ChargeState_MainPageContainer.tsx`,
  `..._StatisticsPlot.tsx`, `..._OverlayContainer.tsx` (exports `qc_SingleSearch__SubSearches__Open_PSM_ChargeState_OverlayContainer`).
  Differences from the single-search template: second prop `QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent`
  (defined in `QC/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock.tsx`); sub-group
  order from `dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId(id).get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode()`;
  selection `qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected` (`Set<number>`; unselected
  skipped); PSM-to-sub-group via `..._SearchSubGroupId_ForPSM_ID_NOT_Filtered().get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__ReturnPromise()`
  then `get_subGroupId_For_PsmId(psmId)` (a lookup table applied to cutoff-filtered PSMs, so it does not bypass filtering);
  colors `QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches`, trace name `subgroupName_Display`.
- Used by: 9 section components in `QC/qc_single_search__sub_searches__sections/jsx/`. Nothing outside `qc_page/`.
- How to use / extend: copy the sub-search plot of the same chart type (grouping, selection and coloring already wired).
- Do not use when: more than one search (sub-group ids are unique only within a search) — use the multi-search variant.
- Limits and gotchas: constructor throws unless one search. 7 plots (target/decoy split violin, estimated-error and
  cumulative-correct-count by score) read the unfiltered PSM-table loader by design (need decoys) — do not copy those as the
  template for a chart that must respect cutoffs. Most plots use always-async `..._ReturnPromise()` (17 files). Missing
  per-sub-group entries in count maps are silently skipped (throws commented out in Charge State).
- Related / duplicates: single-search and multi-search variants; other PSM-to-sub-group users (mod page, protein page) use the same holder.
- Status: verified (reference plot read; others by grep markers) (re-checked)

### QC multi-search plot variant (one trace or category per search)
- What it solves: the same chart compared across 2+ searches, colored per search, labeled by search short name or search id.
- Search keywords: compare searches chart, multiple searches QC, per search plot, search comparison, color by search
- Location: `QC/qc_multiple_searches_plots/jsx/`; reference `qcViewPage_MultipleSearches__PSM_ChargeState_MainPageContainer.tsx`,
  `..._StatisticsPlot.tsx`, `..._OverlayContainer.tsx`. Second prop `QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent`
  (in `QC/qc_multiple_searches_sections/jsx/qc_MultipleSearches_AA__Root_DisplayBlock.tsx`); loops searches calling the filtered
  `get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()` (`{data, promise}`), `Promise.all`; colors
  `QcViewPage_MultipleSearches__ComputeColorsForSearches({projectSearchIds}).get_Color_AsHexString_By_ProjectSearchId`; label
  `searchData.searchLabel__SearchShortName_OR_SearchId`.
- Used by: 10 section components in `QC/qc_multiple_searches_sections/jsx/`. Nothing outside `qc_page/`.
- How to use / extend: copy the multi-search plot of the same type; prefer one with the `promises.length === 0` synchronous
  fast path (e.g. `qcViewPage_MultipleSearches__PSM_EstimatedError_StatisticsPlot.tsx`; also GoldStandard, Peptide
  EstimatedError, Distinct_Scan_Counts). Charge State has no fast path.
- Do not use when: one search (constructor throws if `projectSearchIds.length === 1`). Do not sum MS1 quant across searches
  in such a chart (root CLAUDE.md quant rule) — show per-search values side by side.
- Limits and gotchas: same boilerplate duplication; no target/decoy or score plots exist for multi-search.
- Related / duplicates: single and sub-search variants.
- Status: verified (reference plot read; others by grep markers) (re-checked)

### Multi-search axis/tooltip title "Search Label" vs "Search Number" (`qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc`)
- What it solves: picks the axis/tooltip title for per-search labels: "Search Number" if every label came from its search id,
  else "Search Label".
- Search keywords: search label, search short name, x axis title, search number, chart axis label for searches
- Location: `QC/qc_multiple_searches_plots/js/qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc.ts`
  (`({ projectSearchIds, searchData_SearchName_Etc_Root })` returns `{ xAxisTitle }`; reads `searchLabel_FromSearchShortName` /
  `searchLabel_FromSearchId` via `get_SearchData_For_ProjectSearchId`; throws if a search is missing).
- Used by: 17 files in `QC/qc_multiple_searches_plots/jsx/`.
- How to use / extend: call once per render; pair with `searchLabel__SearchShortName_OR_SearchId`.
- Do not use when: single search.
- Limits and gotchas: the per-search label is computed in `DP/data_pages_common/loadCoreData_ProjectSearchIds_Based.ts` — short
  name when unique, else `searchListItem.searchId` (the real search id, not the projectSearchId). A redundant first `if` there is harmless.
- Related / duplicates: `DP/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Get_SearchLabel__SearchShortName_OR_SearchId_ForProjectSearchId.ts`
  (parallel accessor via `get_searchNames_AsMap()`).
- Status: verified

### QC chart frame components: border, no-data filler, "creating", "updating", "click to enlarge" covers (`QC/qc_common_components`)
- What it solves: standard React wrappers around a chart. `QcPage_ChartBorder` (min-size bordered box at standard chart size,
  overridable), `QcPage_ChartFiller_NoData` (chart-sized "No Data"/custom message with title), `QcPage_CreatingPlot_BlockCover`
  and `QcPage_UpdatingData_BlockCover` (absolutely positioned covers; parent must be `position: relative`; CSS class
  `create--update--chart--msg--cover-overlay`), `QcPage_ClickPlot_ForInteractivePlot_BlockCover` (hover message + click-through
  cover over the PNG that opens the overlay; `clickHandler_Callback` prop).
- Search keywords: chart placeholder, loading cover, updating overlay, spinner cover, no data chart, click to enlarge, chart border
- Location: `QC/qc_common_components/qcPage_ChartBorder.tsx`, `qcPage_ChartFiller_NoData.tsx`, `qcPage_CreatingPlot_BlockCover.tsx`,
  `qcPage_UpdatingData_BlockCover.tsx`, `qcPage_ClickPlot_ForInteractivePlot_BlockCover.tsx`.
- Used by: 78-94 files each, all inside `qc_page/`.
- How to use / extend: see the Charge State StatisticsPlot `render()`.
- Do not use when: non-standard-size or non-QC charts (sizes come from `qcPage_StandardChartLayout`); for generic spinners see
  [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md) (spinner components).
- Limits and gotchas: props use optional `?` fields; covers rely on global CSS classes in `limelight_webapp/front_end/src/styles/qc-page.scss`.
- Related / duplicates: generic spinners/covers in common code ([front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)).
- Status: verified (users grepped; components read briefly, bodies not read)

### Overlay with in-overlay controls: scan-file select and X/Y annotation-type selects
- What it solves: an enlarged chart overlay where the user picks the scan file and which PSM-filterable annotation types
  (scores) go on X and Y, re-rendering on change.
- Search keywords: choose score, annotation type select, select scan file in overlay, X axis score, Y axis score, chart options in overlay
- Location (reference): `QC/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSM_EstimatedError__AnnotationScore_VS_AnnotationScore_OverlayContainer.tsx`.
  Options from `dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get(id).psmFilterableAnnotationTypes`,
  display `annotationType.name + " (" + searchProgram.name + ")"`; scan files from
  `CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_SingleScanFile_Entry`.
- Used by: 6 sub-search and 12 single-search overlays; none in multi-search.
- How to use / extend: copy one when options should apply only in the enlarged view.
- Do not use when: the option should also change the main-page chart (put it in the section).
- Limits and gotchas: options in `this.state`; select-builder code repeated in each overlay (no shared component);
  `Number.parseInt` + throw on NaN.
- Related / duplicates: about 18 copies of the annotation-type option list.
- Status: verified (one overlay read; others by grep)

### Data-loading wrapper + "OnlyPlot" render split (annotation score vs annotation score)
- What it solves: separates loading/aggregation from Plotly drawing so the drawing component can be fed precomputed data.
- Search keywords: score vs score plot, two-score scatter, histogram2dcontour, split loader from renderer
- Location: `QC/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot.tsx`
  (wrapper; props `annotationTypeId_Score_X`/`_Y`) and `..._Statistics_OnlyPlot.tsx`.
- Used by: its MainPageContainer and OverlayContainer; score ids from section state (e.g. `qc_SingleSearch_ErrorEstimation_Section.tsx`).
- How to use / extend: use when one heavy dataset feeds a chart that re-renders with different display options.
- Do not use when: simple charts.
- Limits and gotchas: the OnlyPlot does not implement track-latest; the wrapper does. The wrapper loads unfiltered annotation
  data by design (score distributions).
- Related / duplicates: none.
- Status: verified (structure via grep; body skimmed)

### QC section components: lazy expand, mount on first open (`qc_*_sections`)
- What it solves: each statistics section is collapsible; child charts are not mounted until first expand
  (`_sectionEverExpanded`), then hidden with `display:none`; `shouldComponentUpdate` skips re-render while collapsed. Three
  variants (single, sub-search, multi), each listed by an `*_AA__Root_DisplayBlock`.
- Search keywords: collapsible section, expand on demand, lazy mount, defer chart rendering, section header toggle
- Location: `QC/qc_single_search_sections/jsx/*`, `QC/qc_single_search__sub_searches__sections/jsx/*`,
  `QC/qc_multiple_searches_sections/jsx/*`; example `qc_single_search_sections/jsx/qc_SingleSearch_PSM_Level_Statistics_Section.tsx`.
- Used by: their `*_AA__Root_DisplayBlock`, rendered from `qcViewPage_DisplayData__Main_Component.tsx`.
- How to use / extend: copy a section of the matching variant; keep `_sectionExpanded` / `_sectionEverExpanded` as instance fields.
- Do not use when: you want a generic collapsible (none shared; each section re-implements the toggle).
- Limits and gotchas: heavy three-way duplication plus copied toggle code.
- Related / duplicates: collapsible header copies elsewhere ([front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)).
- Status: verified (pattern confirmed in one section)

### QC page shell and common-data props bag (`qc_page_root` / `qc_page_main`)
- What it solves: QC page bootstrap and the single props "bag" every QC chart receives.
  `qcViewPage_RootLaunch_LoggedInUsers.ts` / `..._PublicUser.ts` (bundles loaded by
  `limelight_webapp/src/main/webapp/WEB-INF/jsp/data_pages/project_search_ids_driven_pages/qcView.jsp`) construct
  `QcViewPage_RootClass_Common`, which sets up `CentralPageStateManager`, state objects and loads core data.
  `QcPage_CentralStateManagerObjectClass` holds QC URL state (versioned, keys `a/d/e`). `qcViewPage_DisplayData__Main_Component.tsx`
  builds `QcViewPage_CommonData_To_AllComponents_From_MainComponent` (search ids, flags, common-data root, reported-peptide
  selection, track-latest registry + token, render queue, generated-peptide cache) plus a `..._Processing__NO_FILTERING`
  sub-object with a second, **unfiltered** common-data root.
- Search keywords: QC page root, page bootstrap, common data props bag, chart props, unfiltered data root
- Location: `QC/qc_page_root/*` (6 files), `QC/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component.tsx`, `..._Root_Component.tsx`.
- Used by: essentially every QC section, plot and compute.
- How to use / extend: for QC children add fields to the bag instead of new props.
- Do not use when: copying the bag to a non-QC page (imports many QC/protein-page modules).
- Limits and gotchas: the `__NO_FILTERING` root is used with the unfiltered PSM-table loader
  (`..._NO_PSM_Peptide_Protein_Filtering__PSM_TblData`) by target/decoy and score-distribution plots (they need data beyond
  the cutoffs). For display values use the filtered loader that respects the user's cutoffs (`..._PSM_TblData_For_ReportedPeptideId_For_MainFilters`), not this path.
  `QC/qc_page_main/jsx/qcViewPage_SamplePlot.tsx` is entirely commented out.
- Related / duplicates: generic data-page bootstrap and central page state manager ([front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)).
- Status: verified (structure and wiring; most of the 2.6k-line main component not read)

### QC page constants (`QcViewPage_CommonAll_Constants`)
- What it solves: `SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES = -1` ("all scan files" selector sentinel) and scatter marker
  sizes (main page 2, overlay 4).
- Search keywords: all scan files sentinel, marker size
- Location: `QC/qc_common_all/qcViewPage_CommonAll_Constants.ts`.
- Used by: 75 files in `qc_page/`.
- How to use / extend: reference the static fields.
- Do not use when: outside QC.
- Limits and gotchas: the `-1` sentinel must never be sent to the server as a `searchScanFileId`.
- Related / duplicates: none.
- Status: verified

### y = x reference-line helper (`QcViewPage__ReferenceLine_Y_equals_X_Calculation_Class`)
- What it solves: tracks min/max of x and y values and returns the end points of a y = x line clamped to include 0.
- Search keywords: diagonal line, identity line, y equals x, reference line, scatter comparison
- Location: `QC/qc_common_all/qcViewPage__ReferenceLine_Y_equals_X_Calculation_Class.ts` (`x_Entry`, `y_Entry`, `get_ReferenceLine_XY`).
- Used by: `QC/qc_single_search_plots/jsx/qcViewPage_SingleSearch__DistinctPeptide_EstimatedError__AnnotationScore_VS_AnnotationScore_StatisticsPlot.tsx`,
  `..._PSM_EstimatedError__AnnotationScore_VS_AnnotationScore_StatisticsPlot.tsx`, `..._PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot.tsx`.
- How to use / extend: feed every point, then read the line.
- Do not use when: outside QC without first fixing the bug below.
- Limits and gotchas: **probable bug (seen in code, not runtime-tested):** in `y_Entry` a new minimum y is assigned to
  `this._min_X` instead of `this._min_Y`, so the bottom-left point can be wrong.
- Related / duplicates: none.
- Status: verified (code read; bug not exercised) (re-checked)

## Stale-async guards

### Stale-async guard for user input: "track latest updates" token + central registration (`QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput*`)
- What it solves: when the user changes inputs while charts are still computing, an older slower run must not overwrite a
  newer one. On each top-level change, the main component creates a new opaque token (`equals()` = object identity) and calls
  `call_AllRegistered` so every mounted chart learns the new token synchronously (and can show an "Updating" cover) before new
  props arrive. Each chart checks `props...equals(storedToken)` before and after each async step and returns early on mismatch.
- Search keywords: stale response, race condition, out-of-date async result, latest request wins, cancel outdated render,
  generation token, request sequence, debounce user input, updating message, track latest updates
- Location: `QC/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.ts` (token),
  `.../qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback.ts` (`register`, `un_register`,
  `call_AllRegistered`; interface `QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface.set_Current_QcViewPage__Track_LatestUpdates_For_UserInput`).
- Used by: `QC/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component.tsx` (creates both); section-level second registries
  (`..._SectionLevel` names) in `qc_MultipleSearches_FeatureDetection_Statistics_Section.tsx`,
  `qc_SingleSearch_FeatureDetection_Statistics_Section.tsx`, `qc_SingleSearch__SubSearches_FeatureDetection_Statistics_Section.tsx`, `qc_MultipleSearches_GoldStandard_Statistics_Section.tsx`;
  outside QC `featureDetection_ViewPage__MainPage_Component.tsx`; consumers: most plot components.
- How to use / extend: top level keeps one registry; on each change `const t = new ..._For_UserInput(); registry.call_AllRegistered({...: t})`,
  pass `t` in props. Child: store the prop token and `register({ callbackItem: this })` in the constructor, implement
  `set_Current_...`, `un_register` in `componentWillUnmount`, guard every async continuation with `equals`. A section may nest
  its own registry for section-local inputs. Use alongside render-queue `abort()`.
- Do not use when: one promise chain can be checked against a local counter; this is for fan-out to many children.
- Limits and gotchas: token holds no data; identity only. Children that forget `un_register` keep getting callbacks.
- Related / duplicates: ad-hoc "latest request" checks elsewhere (next entry; MS1 heatmap container discards results for a
  stale scan-file selection). Lives in the QC folder although the feature-detection page imports it.
- Status: verified (re-checked)

### Component-level per-key cache + in-flight promise map + stale-response check (scan file browser)
- What it solves: when the user clicks scan after scan, load each scan's peaks once, reuse an in-flight promise, and drop a
  response if the user has moved on.
- Search keywords: cache in component, promise dedupe, in flight request, stale response, latest request wins
- Location: `DP/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root_and_main_page_components/scanFileBrowserViewPage__MainPage_Component.tsx`
  (`_cached_SingleScanData_For_ScanFileId_Map_Key_ScanNumber`, `_promise_SingleScanData_Loading__For_ScanFileId_Map_Key_ScanNumber`,
  check `this._scanNumber_CurrentlyShown !== singleScanData.scanNumber`; loader `get_ScanData_YES_Peaks_DataHolder_ReturnPromise({ ..., yes_CacheResults_InJS: true })`).
- Used by: this component only (pattern example).
- How to use / extend: copy the three fields for a click-to-load view; prefer a common loader with built-in caching when one exists.
- Do not use when: the common data loader already caches.
- Limits and gotchas: cache unbounded for the page lifetime.
- Related / duplicates: common loaders' in-flight dedupe ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)); QC track-latest guard (previous entry).
- Status: verified

## Colors

### Search / category color palettes (`DP/color_manager/`)
- What it solves: consistent colors per projectSearchId, per sub-group, or per N categories, from an HSV-based "pretty" theme.
- Search keywords: colors, palette, search colors, chart colors, category colors, color per search, sub search colors, series color
- Location: `DP/color_manager/limelight_Colors_For_MultipleSearches_and_OtherUses.ts` (base, `getInstance({numberOfColors})`,
  `getColor_ForIndex`), `limelight_Colors_For_MultipleSearches.ts` (`get_Color_AsHexString_By_ProjectSearchId`),
  `limelight_Colors_For_SingleSearch__SubSearches.ts` (`get_Color_AsHexString_By_SearchSubGroupId`), `colorTheme_Pretty.ts`,
  `colorUtils.ts` (`HSVtoRGB`, `RGB_to_Hex_ColorString_NoHashPrefix`).
- Used by: `searchDetailsAndFilterBlock_MainPage_Root.tsx`, `searchSubGroup_In_SearchDetailsOuterBlock.tsx`,
  `qcViewPage_DisplayData__Main_Component.tsx`, and the three QC color adapters (next entry).
- How to use / extend: build once per id list; same id order gives same colors. Prefer these classes directly in new non-QC code.
- Do not use when: n/a.
- Limits and gotchas: the `colorTheme` param of `Limelight_Colors_For_MultipleSearches.getInstance` / constructor is ignored.
  `searchColorManager.ts` is fully commented out ("NOT USED").
- Related / duplicates: MultipleSearches vs SingleSearch__SubSearches classes differ only by id name (verified by diff).
- Status: verified (re-checked)

### QC color adapters (`QC/qc_common_all/*ComputeColors*`)
- What it solves: thin wrappers giving a QC chart a color per category index, per search (index or projectSearchId), or per
  sub-search (index or searchSubGroupId), as hex string (no `#`) or `Limelight_Color_ForTheme_Holder`.
- Search keywords: chart colors, series colors, color per search, color per sub group, category colors, color by index
- Location: `QC/qc_common_all/qcViewPage__ComputeColorsForCategories.ts` (`new QcViewPage__ComputeColorsForCategories({categoryCount})`,
  `get_Color_AsHexString_By_Index`, `get_Color_By_Index`), `qcViewPage_MultipleSearches__ComputeColorsForSearches.ts`,
  `qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches.ts`.
- Used by: categories about 40-42 files (most QC plots plus non-QC `ModView_DataViz_Histogram_Renderer.ts`); searches 18 files;
  sub-searches 22 files.
- How to use / extend: prefix hex with `#`. Outside QC, use `color_manager` directly.
- Do not use when: outside QC.
- Limits and gotchas: `get_Color_By_Index` throws when index >= the count requested.
- Related / duplicates: pass-through duplicates of `color_manager`.
- Status: verified

### Brand colors constants (`limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants`)
- What it solves: TS mirror of SCSS colors/font so TS code does not hardcode hex.
- Search keywords: colors, theme, brand color, site green, font, scss variables
- Location: `CA/limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants.ts` (frozen `as const`).
- Used by: 12 files (e.g. the MUI tooltip, `Limelight_MaterialUI_Tab_WrappedWith_Tooltip.tsx`).
- How to use / extend: keep in sync with `limelight_webapp/front_end/src/styles/global.scss` by hand.
- Do not use when: a CSS class already gives the color.
- Limits and gotchas: manual sync with SCSS.
- Related / duplicates: color interpolation (next).
- Status: verified

### Color interpolation (`Limelight__scaleColor_BasedOn_Fraction`)
- What it solves: linear interpolation between two hex colors by a 0..1 fraction (heat shading, coverage shading).
- Search keywords: color scale, gradient, heat map, interpolate color, hex to rgb, shade by count
- Location: `CA/Limelight__scaleColor_BasedOn_Fraction.ts`, `scaleColor_BetweenMinAndMax_BasedOn_Fraction__Return_HexColorFormat(fraction)`.
- Used by: `PW/protein_structure_widget/jsx/protein_Structure_WidgetDisplay__Main_Component.tsx`,
  `PW/protein_sequence_bar_widget/jsx/ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component.tsx`.
- How to use / extend: construct once with min/max colors, call per value.
- Do not use when: you need a perceptual / multi-stop scale (the mod page d3 heatmap has its own color scale compute).
- Limits and gotchas: fraction not clamped; no hex validation: an invalid hex makes the stored RGB null and the first scale call then fails with a TypeError.
- Related / duplicates: mod page `ModView_DataViz_Compute_ColorScale_WidthHeight_Etc.ts` (d3 scale).
- Status: verified (re-checked)

### Color picker small overlay
- What it solves: pick a hex color in a small overlay near the clicked content (wraps `react-colorful` `HexColorPicker`).
- Search keywords: color picker, choose color, hex color, palette
- Location: `CA/ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent/..._Component.tsx`,
  `..._Component__openOverlay({ existingColor, position_top, position_left, change_Callback, cancel_Callback })`.
- Used by: `protein_Structure_WidgetDisplay__Main_Component.tsx` (only user).
- How to use / extend: also a template for "small overlay near content".
- Do not use when: n/a.
- Limits and gotchas: clamps top/left to >= 10 px.
- Related / duplicates: search tag colors use a fixed list (`SearchTag_ColorOptions_Constants`).
- Status: verified (entry point read, body skimmed)

## Chromatograms, MS1 maps, scan plots

### Chromatogram shared code (`DP/chromatogram_common/`, partial extraction)
- What it solves: shared pieces of the two big chromatogram components: isotope trace count/colors, isotope m/z offset, ppm
  window, area-under-curve trapezoid + display format, option enums/defaults, option selector components, RT min/max overlay.
- Search keywords: chromatogram, XIC, extracted ion chromatogram, isotope traces, peak area, area under curve, AUC, ppm window,
  retention time range, isotope m/z
- Location: `DP/chromatogram_common/chromatogram_Common_Helpers.ts` (e.g. `chromatogram_Common_Helpers__compute_Isotope_M_Over_Z_Addition_For_Isotope_Number`,
  `..._ISOTOPE_MAX__FOR_CHART_TRACES = 3`, `..._ISOTOPE_PLOT_TRACE_COLORS`), `chromatogram_Common_Options.ts`,
  `chromatogram_Common_OptionSelector_Components.tsx`, `chromatogram_Common_RetentionTimeOverlay_Components.tsx`; plan
  `DP/chromatogram_common/EXTRACTION_PLAN.md`.
- Used by: the PSM-list chromatogram and the feature-detection chromatogram (next two entries).
- How to use / extend: follow `EXTRACTION_PLAN.md` (leaf-first; move one piece, import in both, build). Start any new
  chromatogram here.
- Do not use when: n/a.
- Limits and gotchas: extraction in progress. The plan doc cites about 5.8k-6k-line components; current files are 4,702 and 4,819
  lines (wc), so the plan's numbers are stale. The isotope offset (`isotope * C13_MASS_DELTA / charge`) is mass
  arithmetic outside `PeptideMassCalculator` (reuse the canonical calculator rather than adding more mass math).
- Related / duplicates: scan-browser single-scan plot has private copies of the isotope offset, max isotope and colors.
- Status: verified

### PSM-based chromatogram (`PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component`)
- What it solves: on "Show Chromatogram", loads MS1 scans for the PSMs' scan file and plots monoisotopic + isotope traces
  with Plotly (direct `Plotly.newPlot`), smoothing, RT range/options.
- Search keywords: chromatogram, XIC, extracted ion chromatogram, MS1 trace, PSM chromatogram
- Location: `DP/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/chromatogram/psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component.tsx`
  (+ `..._Component_Params`, helpers `..._Compute_DataFrom_PSMs_For_Single_SearchScanFileId.ts`,
  `..._Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId.ts`, `..._Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers.ts`).
- Used by: PSM List block root; params built in mod page generators, reported-peptide and sub-group child builders,
  scan-file-to-searches child block. Also links to Lorikeet.
- How to use / extend: via the PSM List block (see [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md) data table). Mirror changes in the feature-detection sibling.
- Do not use when: search has no scan data (block hides it).
- Limits and gotchas: 4.7k lines; header says PARALLEL FILE with the feature-detection chromatogram. Assumes all PSMs map to
  the same or very similar peptide sequence. Uses `qcPage_StandardChartConfig`.
- Related / duplicates: feature-detection chromatogram; `chromatogram_common/`.
- Status: verified (header, users); body not read

### Feature-detection chromatogram (`FeatureDetection_ViewPage__Chromatogram_Component`)
- What it solves: Plotly MS1 chromatogram (ion current or count vs RT) for a feature's monoisotopic + isotope m/z, LOWESS /
  Savitzky-Golay smoothing, peak-select options, editable RT min/max.
- Search keywords: chromatogram, XIC, feature detection, Hardklor, Bullseye, smoothing, isotope traces
- Location: `DP/feature_detection_driven_pages/feature_detection_view_page/chromatogram/featureDetection_ViewPage__Chromatogram_Component.tsx`
  (+ `..._Component_Params`).
- Used by: `featureDetection_ViewPage__MainPage_Component.tsx`,
  `featureDetection_ViewPage__PersistentFeature_DataTable_ExpandChild_ReactComponent__ReturnsComponent.tsx`.
- How to use / extend: start from `chromatogram_common/`; mirror changes in the PSM sibling.
- Do not use when: you need the PSM-based chromatogram.
- Limits and gotchas: 4.8k lines; trace/AUC builder, isotope loop, Plotly render, click wiring and loading UI still parallel
  to the sibling (per file header).
- Related / duplicates: PSM chromatogram.
- Status: verified (header, imports, users); internals not read

### Signal smoothing (LOWESS, Savitzky-Golay) (`SmoothingUtils`)
- What it solves: smooth x/y series (negative values clamped to 0 for LOWESS).
- Search keywords: smoothing, LOWESS, Savitzky Golay, smooth curve, chromatogram smoothing, noise filter
- Location: `DP/peptide_mass_utils/SmoothingUtils.ts` (`smoothLowess`, `smoothSavitzkyGolay`; libs `@stdlib/stats-lowess`, `ml-savitzky-golay`).
- Used by: both chromatogram components.
- How to use / extend: generic; nothing to do with mass despite the folder.
- Do not use when: n/a.
- Limits and gotchas: misplaced in `peptide_mass_utils`.
- Related / duplicates: chromatogram common.
- Status: verified (re-checked)

### MS1 binned ion-current heatmap compute (spectr RT x m/z bins)
- What it solves: converts spectr's `ms1_PeakIntensityBinnedOn_RT_MZ` JSON (binned RT seconds -> binned m/z -> summed
  intensity) into Plotly heatmap arrays (`chart_X`, `chart_Y`, `chart_Z`, tooltip text), min/max, log-scaled bounds and colorbar
  ticks (d3 `quantile`). Validates with `limelight__variable_is_type_number_Check`, throws on bad keys/values.
- Search keywords: MS1 heatmap, ion current map, retention time vs m/z, binned intensity, spectral storage MS1, colorbar log
  scale, LC-MS map, run map
- Location: `QC/qc_single_search_plots/js/qcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__MS1_Data.ts`
  (`..._Compute_MS1_Data({ms1_PeakIntensityBinnedOn_RT_MZ_OverallData})`, result `..._MS1_Data_Root`). Raw data loaded in
  `..._MS1_Ion_Current_RetentionTime_VS_M_Z_MainPageContainer.tsx` with the `{data, promise}` loader for the selected
  `searchScanFileId`; stale selections discarded.
- Used by: the MS1 StatisticsPlot and OverlayContainer only.
- How to use / extend: a generic helper hidden in a feature; reuse for any RT x m/z map from the same spectr data (moving it to
  common code first would be cleaner).
- Do not use when: you need per-scan peaks (this is pre-binned summary data).
- Limits and gotchas: input typed `any` (no off-the-wire type). Only about 150 of 393 lines read. The MS1 plot hard-codes proton mass
  1.007276466621 vs `PeptideMassCalculator`'s 1.00727647 (re-checked by grep: in the StatisticsPlot `.tsx`, not the compute file).
- Related / duplicates: none found.
- Status: verified (partially read) (re-checked)

### Scan file browser d3 SVG plots (single-scan peaks, total ion current per scan)
- What it solves: interactive d3 (not Plotly) plots: TIC per scan with click-to-select and drag zoom; single-scan m/z peaks with
  zoom, auto-zoom Y, a zoom "representation" mini-chart, and monoisotopic + isotope (+1..+3) m/z windows (+/- 25 ppm)
  highlighted for a selected PSM or feature.
- Search keywords: scan peaks plot, MS1 spectrum plot, total ion current, TIC chart, d3 chart, zoom, brush, isotope lines, scan browser
- Location: `DP/scan_file_driven_pages/scan_file_browser_page/scan_file_browser__single_scan_plot/scanFileBrowser_SingleScan_Plot_Component.tsx`
  (`ScanFileBrowser_SingleScan_Plot_Main_Container_Component`, about 3.2k lines),
  `.../scan_file_browser__total_ion_current_of_scans_plot/scanFileBrowser_TotalIonCurrent_OfScans_Plot_Component.tsx` (about 1.7k lines).
- Used by: `scanFileBrowserViewPage__MainPage_Component.tsx` only.
- How to use / extend: reference for d3 mouse-drag zoom; tightly bound to `ScanFileBrowserPage_SingleScan_UserSelections_StateObject`.
- Do not use when: a standard chart will do (Plotly is the norm).
- Limits and gotchas: entity m/z uses canonical `PeptideMassCalculator.calculateMZ_From_MonoisotopicMass_Charge`, but the
  isotope offset, max isotope 3 and color arrays are private copies of `chromatogram_Common_Helpers`.
- Related / duplicates: `chromatogram_common/` (same computation/constants); generic viewer (next).
- Status: verified (users and duplication); internals skimmed

### Generic "scan peaks like" d3 viewer (UNUSED)
- What it solves: generic d3 stick plot of `{ x_value, y_value, index, label }` with binning into 1000 bins via a caller combine
  callback, click-a-line callback, drag-zoom.
- Search keywords: generic peaks viewer, stick plot, binned vertical lines, scanPeaks_Like
- Location: `DP/scan_file_driven_pages/scan_file_browser_page/scan_peaks_like_generic_viewer/` (`ScanPeaks_Like_GenericViewer_Root_Component`,
  `scanPeaks_Like_InputDataClasses.ts`, `scanPeaks_Like_Callback_Definitions.ts`).
- Used by: nothing.
- How to use / extend: possible starting point; check it still compiles/behaves.
- Do not use when: you need a maintained component.
- Limits and gotchas: dead code with `console.warn` debug calls on mouse down.
- Related / duplicates: in-use single-scan plot.
- Status: verified (unused)

### QC feature-detection common charts and table (`QC/qc_common__feature_detection`)
- What it solves: Hardklor/Bullseye QC visuals shared by single, sub-search and multi-search sections: feature count vs TIC,
  ion count vs RT, TIC vs RT, a TIC/ion count statistics table, and an overlay to choose a feature-detection run. Each chart is
  the MainPageContainer / OverlayContainer / StatisticsPlot trio (`isInSingleChartOverlay` picks PNG vs live).
- Search keywords: feature detection chart, hardklor, bullseye, persistent features, total ion current vs retention time, chart overlay trio
- Location: `QC/qc_common__feature_detection/jsx/*` (10 components), `.../js/qcViewPage_Common__FeatureDetection__DataToPlot_Parameters.ts`.
- Used by: `qc_SingleSearch_FeatureDetection_Statistics_Section.tsx`, `qc_MultipleSearches_FeatureDetection_Statistics_Section.tsx`,
  `qc_SingleSearch__SubSearches_FeatureDetection_Statistics_Section.tsx`.
- How to use / extend: the clearest worked example of render queue + track-latest + overlay together.
- Do not use when: on the standalone feature-detection page (own components; reuses queue and track-latest).
- Limits and gotchas: plot files about 1.2k lines each with heavy duplication. The parallel feature-detection plots in
  `QC/qc_single_search_plots/` are all fully commented out (so these common ones are the live feature-detection QC charts).
- Related / duplicates: commented-out single-search FD plots.
- Status: verified (structure and users; plot bodies not read)

## Mod page charts

### Mod page heatmap renderer (d3) + color scale / layout compute
- What it solves: draws the mod-mass x search heatmap in SVG with d3: colored rectangles, separators, search labels, color
  legend, hover tooltips, drag-to-select rectangles that update URL selections.
- Search keywords: heatmap, d3, svg, color scale, drag select, rectangle selection, legend, tooltip
- Location: `DP/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Renderer.ts` (`modView_DataViz_Renderer`),
  `ModView_DataViz_Compute_ColorScale_WidthHeight_Etc.ts` (`modView_DataViz_Compute_ColorScale_WidthHeight_Etc`, `..._VISUALIZATION_MAIN_CONSTANTS`).
- Used by: the mod page user-entry-area block component.
- How to use / extend: reference for a d3 heatmap with drag selection.
- Do not use when: a Plotly chart fits (house standard).
- Limits and gotchas: tooltip is a body-level div with fixed id `mod-viz-tooltip` removed/re-added each render; scales typed `any`.
- Related / duplicates: Plotly charts elsewhere; other d3 users (scan browser plots, QC MS1 compute uses d3 `quantile`).
- Status: verified (structure only)

### Mod page histogram renderer (Plotly) reusing QC helpers
- What it solves: mod-mass histograms (separate, stacked, merged), optional mean/SD lines, two-plot difference chart.
- Search keywords: histogram, Plotly, distribution, mod mass histogram, difference plot, mean line
- Location: `DP/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Histogram_Renderer.ts`
  (`modView_DataViz_Histogram_Renderer`); uses `qcPage_StandardChartConfig`, `QcViewPage__ComputeColorsForCategories`, the Plotly
  tick-mark helper and the jStat wrapper. Sibling direct-Plotly user: `.../mod_page__jsx/ModPage_ZScore_ReplicateReport_DataTable_Component.tsx`.
- Used by: the mod page user-entry-area block component.
- How to use / extend: shows QC chart config/colors are usable outside QC with direct `Plotly.newPlot`.
- Do not use when: n/a (page-specific).
- Limits and gotchas: imports `plotly.js-dist-min` (only that import builds).
- Related / duplicates: QC render queue (parallel approach).
- Status: verified (imports and calls only)

### jStat typed wrapper (chart statistics)
- What it solves: typed, result-checked calls to untyped `jstat` (`ztest`, `mean`, `stdev`).
- Search keywords: statistics, z-test, p-value, mean, standard deviation, jstat
- Location: `CA/external_libraries_without_typescript_definition__calls/jstat_ExternalLibrary_Without_TypescriptDefinition_Calls.ts`.
- Used by: `ModPage_ModStatsUtils.ts`, `modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable.ts`, `ModView_DataViz_Histogram_Renderer.ts`.
- How to use / extend: add more jStat calls with the same number check.
- Do not use when: n/a.
- Limits and gotchas: `flag` passed only when truthy (undefined makes jStat return NaN); `mean` error text says "stdev".
- Related / duplicates: none.
- Status: verified

## Spectrum viewer (Lorikeet)

### Lorikeet spectrum viewer: open in new window (`SpectrumRetrieveAndDisplay_Use_lorikeet` + `lorikeetSpectrumViewer_CreateURL`)
- What it solves: "View spectrum" for a PSM: builds `<controller>/ps/<projectSearchId>/psm/<psmId>` plus optional query
  `openmod-position` and `sionsmz` (selected peak m/z joined by `A`) and opens a sized popup.
- Search keywords: view spectrum, Lorikeet, spectrum viewer, MS2 annotated spectrum, open spectrum window, PSM spectrum link, open mod position
- Location: `DP/data_pages_subparts_other/spectrumRetrieveAndDisplay_Use_lorikeet.ts`
  (`viewSpectrum_NewWindow({ psmId, projectSearchId, openModPosition, scanPeaks_MZ_That_PassFilters_Array__For_PsmId })`);
  `DP/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_CreateURL_ParseURL.ts`
  (`lorikeetSpectrumViewer_CreateURL`, `lorikeetSpectrumViewer_ParseURL`), `lorikeetSpectrumViewer_Constants.ts`; controller path
  from DOM id `main_page_lorikeet_page_controller_path`.
- Used by: `psm_list_ScanNumber_AND_ViewSpectrum_TableCell_ExternalComponent.tsx`, `psm_list_view_spectrum_cell_ExternalComponent.tsx`,
  `psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component.tsx`; `lorikeetSpectrumViewer_CreateURL` also by the Lorikeet page
  (switch PSM) and `modPage_Download_PSM_Localization_Report.ts`.
- How to use / extend: call `viewSpectrum_NewWindow`; pass `undefined` for absent optional arrays.
- Do not use when: you need the spectrum inline (Lorikeet runs only on its own page).
- Limits and gotchas: m/z rounded to 2 decimals in the URL. Popup size check compares `availHeight` against the width variable
  (seen in code, looks like a typo; not runtime-tested). `projectSearchId` in the URL is a functional key (allowed by the URL exemption).
- Related / duplicates: none.
- Status: verified (re-checked)

### Lorikeet own page (data load + jQuery `specview` plugin)
- What it solves: standalone spectrum page: loads spectrum (`d/rws/for-page/psb/spectrum-for-psm-id`) and PSMs of the same scan
  (`d/rws/for-page/psb/psm-peptide-list-display-with-spectrum-viewer`) in parallel, search names (`d/rws/for-page/psb/search-name-list-from-psi`),
  project title; builds Lorikeet options (static/variable/open mods, 15 ppm tolerance) and calls `$(div).specview(options)`;
  PSM list under the spectrum is a `DataTable`.
- Search keywords: Lorikeet page, specview, spectrum annotation, b y ions, fragment ions, lorikeetSpectrumViewerView.jsp
- Location: `DP/other_data_pages/lorikeet_spectrum_viewer_page/` (`lorikeetSpectrumViewer_OwnPage_Root.ts`,
  `..._LoadDataFromServer.ts`, `..._PageMaintOnceDataIsLoaded.ts`, `..._createDataFor_PsmPeptideTable.ts`, `..._DataFromServer_*.ts`,
  `..._Data_ForLorikeet_Data.ts`); library `limelight_webapp/front_end/src/js/libs/Lorikeet/` (`specview.js`, `peptide.js`, `ion.js`,
  `aminoacid.js`, flot) via `addLorikeetToJquery`. Server response DTOs are in the webapp `dto_lorikeet` package ([data_access.md](data_access.md)).
- Used by: the Lorikeet page only.
- How to use / extend: feature code; `lorikeetSpectrumViewer_createPsmPeptideTable_HeadersAndData` is an example of building a
  `DataTable` from annotation-typed PSM data.
- Do not use when: any other page needs PSM data (use the common loaders; this page calls `webserviceCallStandardPost` directly,
  no `{ data, promise }`, no caching).
- Limits and gotchas: the Lorikeet library has its own residue/ion mass code (third-party, separate from `PeptideMassCalculator`);
  `_add_2_modMasses_And_Round` sums mod + open-mod masses and rounds (local mass arithmetic). Project-title URL string has a
  leading space `" d/rws/for-page/project-get-title"` (seen in source; runtime effect not checked).
- Related / duplicates: common data loaders ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Status: verified

## Protein visualizations (single-protein view)

### Protein sequence display widget (letters with coverage, mods, position selection)
- What it solves: renders a protein sequence as lines of letters with per-position flags (covered, covered by selected
  peptides, variable/static mod, search-string match, selected) plus tooltips; click positions to filter.
- Search keywords: protein sequence display, coverage letters, sequence coverage view, position selection, protein position filter, sequence widget
- Location: `PW/protein_sequence_display_widget/`: `js/proteinSequenceWidgetDisplay_Component_Data__Build.ts`
  (`proteinSequenceWidgetDisplay_Component_Data__Build({ proteinSequenceString, proteinSequenceWidget_StateObject, proteinCoverageArrayOfBoolean, ... })`),
  `js/proteinSequenceWidget_SinglePositionFlags.ts`, `js/proteinSequenceWidget_StateObject.ts`,
  `jsx/proteinSequenceWidgetDisplay_Root_Component_React.tsx` (callback type `ProteinSequenceWidgetDisplay__PositionClicked_Callback`).
- Used by: `proteinPage_Display__SingleProtein_MainContent_Component.tsx`, `proteinExperimentPage_SingleProtein_MainContent_Component.tsx`;
  state object also by the filtering engine, bar and structure widgets, `currentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget.tsx`,
  `Limelight_AnyFilter__HasFilterValue.ts`.
- How to use / extend: rebuild data with the builder when inputs change; selections in `ProteinSequenceWidget_StateObject`.
- Do not use when: you need a scaled graphical view (bar widget).
- Limits and gotchas: the state object also holds the bar widget's protein start/end selections; encoding uses base-35 offsets
  (`Z` separator) and version property 'a'.
- Related / duplicates: bar and structure widgets share this state object.
- Status: verified (structure/users); JSX bodies skimmed

### Protein sequence bar widget (SVG coverage/peptide bar, downloadable SVG)
- What it solves: scaled SVG of the protein with coverage, peptide blocks in rows, mod markers, trypsin cut points,
  shade-by-PSM-count, residue hover tooltip, click to select peptide start/end, "download SVG".
- Search keywords: protein bar, coverage bar, peptide map, SVG protein, download SVG, trypsin cut points, shade by PSM count
- Location: `PW/protein_sequence_bar_widget/`: `jsx/proteinSequence_Bar_WidgetDisplay__SearchBased__Root_Component.tsx` (loads data),
  `jsx/ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component.tsx` (4.4k lines; `_download_Visualization_SVG` = SVG
  `outerHTML` + `StringDownloadUtils.downloadStringAsFile`), `js/proteinSequence_Bar_Widget_StateObject.ts`. Cut points from
  `CA/trypsinCutPointsForSequence.ts`; shading via `Limelight__scaleColor_BasedOn_Fraction`.
- Used by: `proteinPage_Display__SingleProtein_MainContent_Component.tsx`, `proteinPage_Display__SingleProtein_Root.ts` (search-based only).
- How to use / extend: template for "SVG visualization + download as SVG", and for the `promises.length === 0` synchronous fast
  path in its data compute (`_compute__INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root`).
- Do not use when: experiment pages (not wired there).
- Limits and gotchas: internal helpers not exported.
- Related / duplicates: residue tooltip and option constants duplicated with the structure widget.
- Status: verified (structure/users); render body skimmed

### Trypsin cut points for a protein sequence (`trypsin_CutPointsForSequence_Compute`)
- What it solves: positions between residues (+0.5) where trypsin cuts, K/R-not-before-P with exceptions; drawn by the bar and structure widgets.
- Search keywords: trypsin, digestion, cleavage sites, cut points, enzyme
- Location: `CA/trypsinCutPointsForSequence.ts`.
- Used by: bar widget main component, structure widget main component.
- How to use / extend: returns undefined for sequences shorter than 2.
- Do not use when: you need the simple `[KR][^P]` rule used by QC missed cleavages (different rule).
- Limits and gotchas: rule differs from QC digestion compute.
- Related / duplicates: QC missed-cleavage compute (parallel trypsin rule).
- Status: verified

### Widget state-object pattern (valueChangedCallback + versioned encoded state in the single-protein URL state)
- What it solves: keeps a widget's options (scale, toggles, selections, colors) in a class whose setters validate and call a
  change callback, and which serializes to a compact versioned object for the URL.
- Search keywords: state object, encoded state data, URL state, getEncodedStateData, set_encodedStateData, valueChangedCallback, widget options persistence
- Location: `PW/protein_sequence_bar_widget/js/proteinSequence_Bar_Widget_StateObject.ts`,
  `PW/protein_structure_widget/js/protein_Structure_Widget_StateObject.ts` (keys 'a'..'o', 'a' = version),
  `PW/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject.ts` (no callback); persisted through
  `DP/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass.ts`.
- Used by: `proteinPage_Display__SingleProtein_Root.ts`, `proteinExperimentPage_Display_SingleProtein.ts` (sequence widget only).
- How to use / extend: copy a state object, add a field to `SingleProtein_CentralStateManagerObjectClass`, wire create/restore/save in the page root.
- Do not use when: page-level filters (own `*_UserSelections_StateObject`).
- Limits and gotchas: encoded data typed `any`; bump the version on encoding change.
- Related / duplicates: central page state manager ([front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)).
- Status: verified

### Mol* viewer embedding (reference implementation): `Protein_Structure_WidgetDisplay__Main_Component`
- What it solves: embeds Mol* in a React class component, loads a project structure file (PDB/mmCIF), colors coverage /
  filtered coverage / residue letters, draws mod balls and trypsin cut-point disks as custom shapes, residue hover tooltip,
  chain selection, viewer size, ChimeraX export, typed load-failure path.
- Search keywords: Mol*, molstar, 3D structure, PDB, mmCIF, structure viewer, createPluginUI, renderReact18, overpaint, chain,
  label_seq_id, auth_seq_id, ChimeraX export, protein structure
- Location: `PW/protein_structure_widget/jsx/protein_Structure_WidgetDisplay__SearchBased__Root_Component.tsx` (loads data) ->
  `jsx/protein_Structure_WidgetDisplay__Main_Component.tsx` (10.4k lines; `_create_Or_Clear_MolStar_Instance` with
  `createPluginUI({ ..., render: renderReact18 })` + `DefaultPluginUISpec()`; `_add_StructureData_PDB_Etc__TO__MolStar_Instance`;
  internal `ProteinStructure_MolstarLoad_Error`; `_download_ChimeraX_File`).
- Used by: `proteinPage_Display__SingleProtein_MainContent_Component.tsx` only.
- How to use / extend: read `limelight_features_docs/protein_structure_sequence_mapping_rewrite.md`,
  `protein_structure_widget__right_pane_ui_2026-07.md`, `structure_mod_ball_shape_separate_tooltip.md` first. Structure file
  contents/alignments come from the project-level structure-file loaders ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Do not use when: you only need to parse a structure (headless parse).
- Limits and gotchas: `Molstar_Unit.Kind` const enum read via `@ts-ignore` (isolatedModules); `#RRGGBB` converted to Mol* colors
  by a local helper; uses the color picker and `Limelight__scaleColor_BasedOn_Fraction`.
- Related / duplicates: second `createPluginUI` in the map-new-structure overlay; ChimeraX writer.
- Status: verified (structure/users); most render code not read

### Headless Mol* parse to validate/inspect a structure file
- What it solves: parses an uploaded structure without rendering to validate it and list polymer chains + sequences before saving.
- Search keywords: parse PDB, validate structure file, headless molstar, PluginContext, parseTrajectory, list chains, upload structure
- Location: `PW/protein_structure_widget/jsx/Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component.tsx`
  (`new PluginContext(DefaultPluginSpec ...)`, `plugin.init()`, `builders.data.rawData`, `builders.structure.parseTrajectory/createModel/createStructure`;
  opener `open_Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component`); aligns sequence to chain with
  `needlemanWunsch_Algorithm_AlignSequences` (`DP/common__algorithm_implementations`).
- Used by: the structure main component (opens the overlay).
- How to use / extend: inline, not exported — extract to a shared helper before reusing.
- Do not use when: you need an interactive viewer.
- Limits and gotchas: the only `new PluginContext` in the front end.
- Related / duplicates: chain-listing helper duplicated with the main component.
- Status: verified

### Structure chain residue list + alignment-to-residue mapping (fail loud)
- What it solves: maps Limelight protein positions to real residues of one chain (residueIndex, auth_seq_id, label_seq_id) via
  the saved alignment; refuses to map if the live parsed chain sequence differs from the saved alignment.
- Search keywords: residue mapping, chain residues, label_seq_id vs auth_seq_id, alignment, protein position to residue, mismatch
- Location: `PW/protein_structure_widget/js/molstarStructure_ExtractPolymerResidueList_ForChain.ts`
  (`molstarStructure_ExtractPolymerResidueList_ForChain(structure, chainLabelAsymId)`, `..._OrdinalForLocation`),
  `js/ProteinStructure_ResolvedChainMapping.ts` (`get_StructureResidue_ForLimelightPosition`, `get_StructureResidue_ForOrdinal`,
  `selectionUsesLabelSeqId`; throws `ProteinStructure_ResolvedChainMapping__MismatchError`), `js/molstar_ChainTest_Expression.ts`
  (`molstar_ChainTest_Expression__For_LabelAsymId`).
- Used by: structure main component, map-new-structure overlay; chain test also by `molstar_DevMode_SelectionLogging.ts`.
- How to use / extend: always place via the resolved mapping; never use an alignment ordinal as a residue number.
- Do not use when: n/a — required path for structure position mapping.
- Limits and gotchas: deliberately avoids `structure.model.sequence` (entity-keyed), but the duplicated `_molstar_ListChains_...`
  helpers still read `structure.model.sequence.byEntityKey` to decide which chains have a sequence.
- Related / duplicates: `_molstar_ListChains_...` copies.
- Status: verified (re-checked)

### Mol* -> ChimeraX `.cxc` export
- What it solves: converts a Mol* `Structure` plus per-residue colors, symbols and residue-pair disks into a ChimeraX command
  script, with warnings and label/auth residue-number collision reports.
- Search keywords: ChimeraX, cxc, export structure, Mol*, molstar, residue coloring, structure download
- Location: `DP/molstar__read_structure_create_chimerax_file/molstar__read_structure_create_chimerax_file___Index.ts`
  (`molstar__read_structure_create_chimerax_file__ConvertToCXC`), helpers `..._CA-extractor.ts`, `..._Color-commands.ts`,
  `..._Symbol-commands.ts`, `..._Disk-commands.ts`, types `..._Types.ts`.
- Used by: structure main component, `chimeraXExport_AuthCollision_Overlay.tsx`.
- How to use / extend: pass specs; show `collisions` to the user.
- Do not use when: n/a.
- Limits and gotchas: CA atoms only; label vs auth seq id handling per the `limelight_features_docs/` structure docs.
- Related / duplicates: none.
- Status: verified (index read; helpers not read)

### "Confirm before download" overlay + shared structure-error message
- What it solves: warning overlay that starts a download only on click (so the browser download dialog does not hide it); a
  shared "could not be displayed, please report with this URL" message.
- Search keywords: download warning, confirm download, modal overlay, error message report URL
- Location: `PW/protein_structure_widget/jsx/chimeraXExport_AuthCollision_Overlay.tsx` (`chimeraXExport_AuthCollision_Overlay__openOverlay({ collisions, download_Callback })`,
  on `ModalOverlay_Limelight_Component_v001_B_FlexBox` + `limelight_add_ReactComponent_JSX_Element_To_DocumentBody`);
  `jsx/proteinStructure_StructureDisplayError_MessageContent_Component.tsx`.
- Used by: structure main component.
- How to use / extend: small clean template of the "open function colocated with component" modal pattern; copy, don't import.
- Do not use when: n/a.
- Limits and gotchas: feature-specific text.
- Related / duplicates: other structure-widget overlay openers.
- Status: verified

### Residue-position hover tooltip (letters each side + trypsin cut-point lines)
- What it solves: tooltip showing the residue at a position with neighbors formatted by distance and trypsin cut lines.
- Search keywords: residue tooltip, position tooltip, neighboring residues, trypsin cut tooltip
- Location: private in `ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component.tsx` (`_create_Tooltip_ResidueLetters_AND_TrypsinCutPointLines_Elements`,
  `_positionTooltip_ResidueLetters_EachSide_Formatting`, `_positionTooltip_TrypsinCutPointLines_EachSide_Formatting`) and a copy in
  `protein_Structure_WidgetDisplay__Main_Component.tsx` (`INTERNAL__Residue_Tooltip__Tooltip_Contents__Component`).
- Used by: those two components.
- How to use / extend: if needed a third time, extract to a shared module.
- Do not use when: n/a.
- Limits and gotchas: not exported; formatting array byte-identical in both (diffed).
- Related / duplicates: duplicated.
- Status: verified

### Mol* dev-mode selection logging (runtime debug flag)
- What it solves: opt-in console logging of what a chain selection matched, toggled from the browser console.
- Search keywords: debug flag, window flag, dev mode logging, molstar debug
- Location: `PW/protein_structure_widget/js/molstar_DevMode_SelectionLogging.ts` (`window.LIMELIGHT_MOLSTAR_DEBUG_SELECTION = true`,
  `..._SetEnabled`, `..._IsEnabled`, `molstar_DevMode_LogChainSelection`).
- Used by: map-new-structure overlay; `..._SetEnabled` has no callers.
- How to use / extend: pattern for a typed `declare global { interface Window { ... } }` debug flag.
- Do not use when: production diagnostics.
- Limits and gotchas: no-op when disabled.
- Related / duplicates: none.
- Status: verified

## Downloading charts and visuals

### Downloading charts and visuals (PNG/SVG mode-bar buttons, SVG outerHTML, string download)
- What it solves: getting a visual out of the browser. Plotly charts: the custom "Download plot as a png / svg" mode-bar
  buttons from `qcPage_StandardChartConfig` (download the chart container). Hand-built SVG: serialize `svgElement.outerHTML` and
  save with `StringDownloadUtils.downloadStringAsFile` (bar widget `_download_Visualization_SVG`). Chart data as text: QC scan-file
  summary blocks build TSV rows and call the same helper (`filename: 'ScanFileStatistics.txt'`). Structure: ChimeraX `.cxc` export.
- Search keywords: download chart, export image, save PNG, save SVG, download SVG, export plot, file-saver, download TSV
- Location: `QC/qc_common_utils/qcPage_StandardChartConfig.ts`; `DP/data_pages_common/downloadStringAsFile.ts`
  (`StringDownloadUtils.downloadStringAsFile({ stringToDownload, filename })`, the only `file-saver` importer);
  `PW/protein_sequence_bar_widget/jsx/ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component.tsx`;
  `QC/qc_single_search_plots/jsx/qcViewPage_SingleSearch__ScanFileSummaryDataBlock.tsx` (+ sub-search and multi-search variants
  `qcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock.tsx`, `qcViewPage_MultipleSearches__ScanFileSummaryDataBlock.tsx`).
- Used by: `downloadStringAsFile` 17 files (14 outside QC); mode-bar buttons by every chart using the standard config.
- How to use / extend: Plotly -> standard config; SVG -> outerHTML + string download; text -> string download.
- Do not use when: large server-side data (use the server form-POST download, [storage_files_external_services.md](storage_files_external_services.md) / [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Limits and gotchas: `downloadStringAsFile` hard-codes blob type `text/plain;charset=ISO-8859-1` (non-Latin-1 text may be
  mangled — inferred, not tested); this also applies to SVG downloads through it. The `ScanFileSummaryDataBlock` exists as three
  about 1.3k-line copies (single, sub, multi), each with its own LoadIfNeeded loader. The mod-page d3 heatmap has its own SVG
  download (`_download_ModMassVisualization_SVG_And_LabelsToLeft_As_CombinedSVG` in
  `ModPage_ModPageBlock_UserEntryArea_BelowTheCollapsableFiltersAndOptionsSection_AndBelow_Incl_DataTable_Component.tsx`);
  no download found for the scan-browser d3 plots (grep).
- Related / duplicates: DataTable TSV download ([front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)).
- Status: verified (download helper, config buttons, bar-widget method, summary blocks' download methods read) (re-checked)

## QC data plumbing and computes behind charts

(These are used by the QC page, so they are kept here; the mass/digestion ones are also domain utilities, [domain_utilities.md](domain_utilities.md).)

### Scan-file summary per scan level, load-if-needed with promise dedupe (`QcPage_DataFromServer_*_ScanSummaryData_LoadIfNeeded`)
- What it solves: fills a holder of per-scan-file, per-scan-level counts (number of scans, TIC) by mapping `searchScanFileId`
  to `projectScanFileId` and reading the project-scan-file common-data loader; no direct webservice calls; returns `null` when
  nothing to load (synchronous fast path).
- Search keywords: scan summary, scan level counts, MS1 MS2 scan count, total ion current per level, load if needed, in-flight promise cache
- Location: `QC/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded.ts`,
  `..._MultipleSearches_ScanSummaryData_LoadIfNeeded.ts` (skips searches with `hasScanData` false),
  `..._SingleSearch__SubSearches_ScanSummaryData_LoadIfNeeded.ts`; holders in
  `QC/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Data.ts`.
- Used by: the three `*ScanFileSummaryDataBlock.tsx` components.
- How to use / extend: reference for "derive a page-local holder from common loaders, dedupe in-flight, return null when loaded".
- Do not use when: you need raw scan summary outside QC (use the project-scan-file loader `get_ScanData_Summary_DataHolder_For_ProjectScanFileId_ReturnPromise`).
- Limits and gotchas: multi-search and sub-search loaders return the existing in-flight promise **regardless of arguments**;
  single-search loader returns Promise-or-null (not `{ data, promise }`); holder updated in place.
- Related / duplicates: extra dedupe layer over common loaders that already dedupe ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Status: verified

### PSMs for the page's displayed "distinct peptides" (`qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array`)
- What it solves: from the cutoff-filtered PSM-table holder and the page's distinct-peptide list (per-search reportedPeptideId
  -> all PSMs or a `psmIdsSet` subset), returns the flat filtered PSM rows for one projectSearchId — the input most PSM-based QC charts aggregate.
- Search keywords: PSMs for current filters, flatten peptide list to PSMs, psm ids subset, filtered PSMs for chart
- Location: `QC/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array.ts`
  (`({ projectSearchId, peptideDistinct_Array, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder }) => { psmTblData_Filtered }`).
- Used by: 28-29 files in `qc_page/` (Charge State, PPM Error, PSM Count vs M/Z, ScanFileSummaryDataBlock, ...).
- How to use / extend: load `get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters()...`
  and pass `...Create_GeneratedPeptides_Result.peptideList` from the common-data bag.
- Do not use when: there is no generated distinct-peptide list; or the chart genuinely needs unfiltered data (rare; prefer filtered).
- Limits and gotchas: throws if a reportedPeptideId or psmId is missing from the holder.
- Related / duplicates: filtering engine walks ([front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)).
- Status: verified

### Instance cache for the generated reported-peptide list (`Qc_compute_Cache_create_GeneratedReportedPeptideListData`)
- What it solves: computes the protein page's `create_GeneratedReportedPeptideListData__SingleProtein` once per filter state and
  holds it on the instance (static mods always off).
- Search keywords: generated peptide strings, peptide list cache, compute once, cached result
- Location: `QC/qc_common_compute/generatedReportedPeptideList_Compute/qc_compute_Cache_create_GeneratedReportedPeptideListData.ts`.
- Used by: `qcViewPage_DisplayData__Main_Component.tsx` (new instance per filter change), the MS1 heatmap StatisticsPlot,
  `featureDetection_ViewPage__MainPage_Component.tsx`.
- How to use / extend: matches the "explicit instance-field cache rebuilt on input change" style; new instance when inputs change.
- Do not use when: you need static-mod-inclusive strings.
- Limits and gotchas: no in-flight dedupe; always `await`s even when cached.
- Related / duplicates: `proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData` (wrapped function).
- Status: verified

### PSM PPM mass error compute (`qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch`)
- What it solves: precursor PPM error for every PSM passing the main filters. Observed mass via
  `PeptideMassCalculator.calculate_MonoisotopicMass_From_MZ_Charge` (PSM precursor m/z or scan data), calculated via
  `PeptideMassCalculator.calculatePeptideMass(sequence, mods)` with static, variable and open mods; picks the closest of
  `calc + n*C13_MASS_DELTA` (n = 0..3); returns `1e6*(obs-chosen)/obs`, indexed by psmId and reportedPeptideId, with RT.
- Search keywords: ppm error, mass error, precursor mass accuracy, delta mass ppm, C13 isotope error, mass calibration
- Location: `QC/qc_common__psm__ppm_error/qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch.ts`
  (result `get_PPM_Error_For_PsmId`, `get_PPM_Error__PSMs_For_ReportedPeptideId`).
- Used by: `qc_SingleSearch_PSM_PPM_Error_Statistics_Section.tsx`, `qcViewPage_SingleSearch__PSM_PPM_Error_MainPageContainer.tsx`,
  `qcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_M_Z_StatisticsPlot.tsx`, `qcViewPage_MultipleSearches__PSM_PPM_Error_OverlayContainer.tsx` (18 files reference it, grep).
- How to use / extend: reuses the canonical `DP/peptide_mass_utils/PeptideMassCalculator`; do not add new mass routines; reuse the existing calculators (see [domain_utilities.md](domain_utilities.md)).
- Do not use when: outside QC without extracting `_process_LoadedData` (signature needs the QC bag).
- Limits and gotchas: always async; nothing cached between calls; loads scan data (no peaks) when PSMs lack precursor m/z or RT.
- Related / duplicates: other `PeptideMassCalculator` users ([domain_utilities.md](domain_utilities.md)).
- Status: verified (re-checked)

### Missed-cleavage (trypsin) counts per reported peptide and PSM (`qc_Digestion_Statistics_Section_Compute_MissedCleavages_*`)
- What it solves: `..._Initial_Data` (async) counts trypsin missed cleavages per search and reportedPeptideId with regex
  `[KR][^P]`, skipping variable-mod and static-mod positions; with open mods, per-PSM overrides skip localized open-mod positions.
  `..._Data` / `..._Data__SingleSearch__SubSearches` aggregate per search / sub-search for current filtered PSMs.
- Search keywords: missed cleavage, digestion, tryptic, trypsin, KR not before P, cleavage sites, digestion statistics
- Location: `QC/qc_common_compute/digestion_compute/` (5 files).
- Used by: the single, multi and sub-search Digestion statistics sections.
- How to use / extend: compute `Initial_Data` once per filter state, then `Data` on smaller option changes.
- Do not use when: enzyme is not trypsin.
- Limits and gotchas: trypsin only; from regex analysis (not run), `matchAll` with `g` finds non-overlapping matches, so adjacent
  sites (`KK`, `RK`) may be undercounted. Tied to the QC bag.
- Related / duplicates: same `[KR][^P]` logic + mod exclusion copied in
  `DP/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together.ts`;
  different rule in `trypsinCutPointsForSequence.ts`.
- Status: verified (Initial_Data read; aggregation skimmed)

### Gold-standard precision/recall and matches-table compute + multi-search plot (`qc_common__gold_standard`)
- What it solves: compares a search's filtered PSMs with an uploaded gold-standard file for a scan file, matching on scan file
  and **scan number**, then peptide sequence and mods (total mass, or variable/open mods with positions per user options);
  computes precision/recall and matches-table objects; both computes return `{ data, promise }`. The multi-search plot shows
  precision vs recall per search.
- Search keywords: gold standard, ground truth, precision recall, PSM correctness, benchmark, scan number match
- Location: `QC/qc_common__gold_standard/js/qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch.ts`,
  `.../js/qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch.ts`, `.../jsx/qc_GoldStandard_MatchedData_Table_Create.tsx`
  (hand-built React table); plot `QC/qc_multiple_searches_plots/jsx/qcViewPage_MultipleSearches__GoldStandard_Plot.tsx` + `..._MainPageContainer.tsx`.
- Used by: single and multi-search GoldStandard sections and their ShowDetails overlays.
- How to use / extend: a feature; reference for compute-level `{ data, promise }` and for a plot fed by a section-level
  track-latest registry/token plus section option objects.
- Do not use when: generic scan-number matching — discuss match and mismatch policy with the maintainer first (repo rule).
- Limits and gotchas: no sub-search breakout; sets `no_PSM_Data_For_ScanFile_AND_ScanNumbers_In_GoldStandard` when nothing
  matches; own mod-matching logic; the plot has no OverlayContainer (`clickHandler_Callback={ null }`, interactive view in the
  ShowDetails overlay) — not a template for ordinary charts.
- Related / duplicates: gold-standard file-contents loader ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Status: verified (exports, inputs, match keys; matching internals not read)

## Scan-file / feature-detection / spectrum page plumbing

(From `fe_scan_feature_lorikeet_pages`, which only this area reads. The general bootstrap/state patterns are owned by [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md).)

### Data-page bootstrap instances: RootLaunch (LoggedIn / Public) -> RootClass_LoggedInUsers -> RootClass_Common
- What it solves: how a data page starts (one webpack entry per user type; logged-in builds `DataPages_LoggedInUser_CommonObjectsFactory`;
  shared `*_RootClass_Common` sets error reporting, `onpopstate` reload, central state manager, header, URL parse, React root).
- Search keywords: page entry point, root launch, page bootstrap, public user page, logged in user page, React root render
- Location: four-file sets in `DP/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root/`,
  `DP/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root/`,
  `DP/project_search_ids_driven_pages/scan_file_to_searches_page/main_page_code/`; JSP picks the bundle (e.g.
  `limelight_webapp/src/main/webapp/WEB-INF/jsp/data_pages/project_search_ids_driven_pages/scanFileToSearchesView.jsp`).
- Used by: every data page (13 files construct the factory).
- How to use / extend: copy the scan-file-browser set (about 360 lines) for a new single-entity page.
- Do not use when: adding a section/overlay to an existing page.
- Limits and gotchas: stale copy-paste headers; `RootClass_Common` takes the factory as optional `?`. Scan browser
  `RootClass_Common` sets `pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag = true` unconditionally (empty `if`) — seen in
  code, effect not tested.
- Related / duplicates: [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md) (page framework).
- Status: verified

### Per-page CentralStateManagerObjectClass + UserSelections_StateObject (scan browser, feature detection, scan-file-to-searches)
- What it solves: page selections in the URL via versioned, one-letter-key encoded state registered with `CentralPageStateManager`.
- Search keywords: URL state, page state, deep link state, central state manager key, versioned encoding
- Location: `.../scan_file_browser_page_root/scanFileBrowserPageRoot_CentralStateManagerObjectClass.ts` +
  `scanFileBrowserPage_SingleScan_UserSelections_StateObject.ts` (scan number, m/z + TIC zoom, feature/PSM mass, m/z, charge);
  feature-detection `featureDetection_View_CentralStateManagerObjectClass.ts` + `featureDetection_ViewPage_RootTableSelection_StateObject.ts`;
  `scanFileToSearchesPageRoot_CentralStateManagerObjectClass.ts` + `projectScanFileId_ScanFileToSearchesPage_UserSelections_StateObject.ts`.
- Used by: each page's `RootClass_Common`; scan-browser pair also by the PSM list MS1 link and feature-detection child table.
- How to use / extend: new one-letter key; never reuse retired letters (scan browser keeps `'d'` as "NO LONGER USED").
- Do not use when: per-viewer conveniences not meant for the URL.
- Limits and gotchas: constructor accepts `no_centralPageStateManager: true` to build another page's state standalone.
- Related / duplicates: same pattern on every data page ([front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md)).
- Status: verified

### Open another data page in a new tab with preset state (`componentOverridesAdditions`)
- What it solves: URL to another page (scan browser) with selections preset, e.g. "MS1 scan for this PSM".
- Search keywords: link to scan browser, deep link, open page in new tab with state, MS1 scan link, componentOverridesAdditions
- Location: `.../psm_list/psm_list_view_spectrum_cell_ExternalComponent/jsx/psm_list_view_MS_1_Scan_TableCell_ExternalComponent.tsx`
  (+ `.../psm_list/js/psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject.ts`), feature-detection
  `featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects.tsx`. Steps: state object -> `getEncodedStateData()`
  -> standalone central class -> `CentralPageStateManager().get_CurrentState_AsStringForUrl({ componentOverridesAdditions })` ->
  `newURL_Build_PerProjectSearchIds_Or_ExperimentId(...)` -> `window.open(url, "_blank", "noopener")`.
- Used by: those two; `componentOverridesAdditions` passed in 10 places.
- How to use / extend: mirror the MS1 cell (peptide m/z via canonical `PeptideMassCalculator`).
- Do not use when: same-page navigation.
- Limits and gotchas: receiving page must accept/clear the referrer flag (`/r`); the MS1 helper loads whole-file scan data.
- Related / duplicates: [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md).
- Status: verified

### Scan file browser URL path code (`scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc`)
- What it solves: builds the scan file browser base URL and path code (`a` + first 6 of the scan-file code + projectScanFileId base 35).
- Search keywords: scan file browser URL, projectScanFileId code, path code, base 35, scan file link
- Location: `DP/scan_file_driven_pages/scan_file_driven_pages__utils/scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc.ts`
  (returns `{ basePathURL, codeForProjectScanFileId, basePathURL_AND_codeForProjectScanFileId }`; controller path from DOM id
  `controller_path_scan_file_browser`). Decoded in `scanFileBrowserViewPage_RootClass_Common._main_Render` and server
  `ScanFileBrowserView_Controller.java`.
- Used by: project page scan-files and feature-detection-runs list components, feature-detection pages, PSM list MS1 cell.
- How to use / extend: call the util; do not hand-build.
- Do not use when: project-search-id pages (search-data-lookup codes).
- Limits and gotchas: no shared parse function (decode duplicated client/server); also built inline in
  `projectPage_SearchesSection_Open_DataPages_PeptideProteinMod.ts`.
- Related / duplicates: feature-detection page URL code (next).
- Status: verified

### Feature-detection view page URL code (inline, no util)
- What it solves: link to the feature-detection view page for a mapping id (`"c/" + "a" + first6 + mappingId.toString(35) + "/r"`, ctrl/meta -> new tab).
- Search keywords: feature detection link, url_path__feature_detection, base 35
- Location: inline in `projectPage_FeatureDetection_Runs_View_Section_AllUsers_InclPublicUser_Interaction_FeatureDetection_Run_List_Component.tsx`
  and `projectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component.tsx`. The page reads ids from
  DOM elements `feature_detection_root__project_scnfl_mapping_tbl_id` / `project_scan_file_id` (path decode commented out).
- Used by: those two components.
- How to use / extend: extract a util next to the scan-browser one if a third caller appears.
- Do not use when: n/a.
- Limits and gotchas: duplicated string building.
- Related / duplicates: scan browser URL util.
- Status: verified

### Feature-detection page data assembly (`featureDetection_ViewPage__SingularFeature_GetData_ForDataTable`)
- What it solves: for one persistent feature loads mapping, singular features, whole-file scan data (no peaks) and projectScanFileId in parallel.
- Search keywords: persistent feature, singular feature, feature detection data, Hardklor, Bullseye
- Location: `DP/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root_and_main_page_components/featureDetection_ViewPage__SingularFeature_GetData_ForDataTable.ts`
  on `CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT`.
- Used by: feature-detection MainPage, singular-feature child table, persistent-feature expand-child, chromatogram.
- How to use / extend: example of composing the feature-detection loaders ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) owns the loaders).
- Do not use when: n/a.
- Limits and gotchas: always returns a Promise (no synchronous fast path).
- Related / duplicates: [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) loaders.
- Status: verified (top of file + users)

### Scan-file-to-searches page (clone of the peptide page)
- What it solves: for one project scan file, peptides across the searches that used it, with the full peptide-page filter set
  and a per-search "select scan file" overlay.
- Search keywords: scan file to searches, scan file across searches, compare searches on one scan file
- Location: `DP/project_search_ids_driven_pages/scan_file_to_searches_page/` (`main_page_code/scanFileToSearchesPage_Display_MainContent_Component.tsx`,
  `..._nonClass_Functions.ts`, overlay `scanFileToSearchesPage_SelectScanFileOnSearch_Overlay_Component.tsx`); server
  `ScanFileToSearchesView_Controller.java` (`d/pg/psb/scan-file-to-searches-view/`).
- Used by: reached from the project page and data-page nav links.
- How to use / extend: the select overlay is a compact modal-overlay example; otherwise change the peptide page and port.
- Do not use when: building a new page (start from the peptide page).
- Limits and gotchas: `scanFileToSearchesPage_Select_Primary_ScanFile_Overlay_Component.tsx` entirely commented out; stale header names.
- Related / duplicates: peptide page nonClass functions (same names) and central state class (about 47 diff lines).
- Status: verified (structure; MainContent body not read)

## Dead / legacy visualization code (do not reuse)

### Add/remove click listener on Plotly's first `<svg>` (3 dead copies)
- What it solves: legacy pre-PNG pattern: after `Plotly.newPlot`, attach a click handler on the first `<svg>` to open the overlay.
- Search keywords: Plotly click handler, click chart open overlay, svg click listener
- Location: `QC/qc_single_search_plots/js/qcViewPage_SingleSearch__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM.ts`,
  `QC/qc_single_search__sub_searches__plots/js/qcViewPage_SingleSearch__SubSearches__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM.ts`,
  `QC/qc_multiple_searches_plots/js/qcViewPage_MultipleSearches__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM.ts`.
- Used by: none live (only the fully commented-out CumulativeErrorCount plot).
- How to use / extend: do not; use `QcPage_ClickPlot_ForInteractivePlot_BlockCover`.
- Do not use when: always.
- Limits and gotchas: throws on null if no `<svg>`; removal candidates.
- Related / duplicates: three copies.
- Status: verified

### Google Charts loader (`googleChartLoaderForThisWebapp.ts`) and other commented-out chart files
- What it solves: nothing now. `DP/data_pages_common/googleChartLoaderForThisWebapp.ts` is commented out apart from its header
  (spot-checked; only other mention is a comment in `webserviceCallStandardPost.ts`); Google Charts is unused.
  Also dead: `QC/qc_page_main/jsx/qcViewPage_SamplePlot.tsx`; 13 fully commented-out `.tsx` plus 9 `*.tsx_UNUSED` files in
  `QC/qc_single_search_plots/` (all 3 `PSM_CumulativeErrorCount_VS_PSM_RankByAnnScore_*`, the single-search
  `FeatureDetection_*` plot sets and statistics table); `PW/protein_structure_widget/jsx/protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component.tsx`
  (1,289 lines commented out); the generic scan-peaks viewer (unused).
- Search keywords: Google Charts, corechart, dead chart code, unused plot
- Location: as listed.
- Used by: none.
- How to use / extend: do not; use Plotly.
- Do not use when: always.
- Limits and gotchas: the CumulativeErrorCount MainPageContainer usage in `qc_SingleSearch_ErrorEstimation_Section.tsx` is inside a JSX comment.
- Related / duplicates: none.
- Status: verified (Google loader spot-checked; others read once)

## Cross-references

- Generic DataTable, TSV download from tables, PSM List block (hosts the PSM chromatogram), spinners, modal overlay,
  `limelight_add_ReactComponent_JSX_Element_To_DocumentBody`, tooltips, central page state manager, collapsible headers -> [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md) (UI components / page framework).
- Common data loaders (`{ data, promise }`), filtered vs unfiltered PSM-table loaders, scan-data and feature-detection loaders,
  structure-file loaders, gold-standard file loader, search name retrieval -> [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) (webservices + front-end data loading).
- `PeptideMassCalculator`, PSM mass/m/z math, protein inference, NSAF/ABACUS, mod mass rounding -> [domain_utilities.md](domain_utilities.md) (domain utilities).
- Server form-POST download + download identifier, structure-file storage and spectr proxy webservices -> [storage_files_external_services.md](storage_files_external_services.md) / [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md).
- Lorikeet response DTOs (`dto_lorikeet`) -> [data_access.md](data_access.md) (data access).
- Filtering engine (`GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class`) -> [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md).
- Experiment conditions grid (`Experiment_SingleExperiment_ConditionsGraphicRepresentation`) — a table-based "graphic", not a chart -> [domain_utilities.md](domain_utilities.md) / [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md) (experiment pages).
- Plotly label escaping / CSP `'unsafe-eval'` needed by Plotly WebGL (`scattergl`) -> [web_security_csp_and_xss_url_hardening.md](../web_security_csp_and_xss_url_hardening.md) (security).

## Duplicates and parallel mechanisms in this area

1. **Two Plotly rendering paths**: QC queued PNG + overlay service vs direct `Plotly.newPlot` (mod page histogram + replicate
   report, both chromatograms). Prefer: the queue for pages with many charts; direct `newPlot` with `qcPage_StandardChartConfig`
   for one or two live charts (no single preferred one beyond that).
2. **General chart helpers live in the QC feature folder** (`qcPage_StandardChartConfig`, `qcViewPage__ComputeColorsForCategories`,
   render queue, track-latest, generated-peptide cache) and are imported by mod page, PSM list and feature-detection page. No
   preferred move identified.
3. **QC plot triplet cloned three ways** (single 36+, sub-search 23, multi-search 17 live plots) with about 300 lines of boilerplate
   each and no base class; scan-file summary block three about 1.3k-line copies; annotation-type select options rebuilt in about 18 overlays;
   three-way section duplication with copied toggles. Prefer: copy the variant matching the view.
4. **QC color adapters** are pass-throughs to `DP/color_manager/*`; `Limelight_Colors_For_MultipleSearches` vs
   `..._For_SingleSearch__SubSearches` differ only by id name. Prefer `color_manager` directly outside QC.
5. **Chromatograms**: PSM-based (4.7k lines) vs feature-detection (4.8k lines) parallel files, partly factored into
   `chromatogram_common/`. Prefer: put new shared logic in `chromatogram_common/` per `EXTRACTION_PLAN.md`.
6. **Isotope m/z offset, max isotope and colors** privately copied in the scan-browser single-scan plot vs exported from
   `chromatogram_Common_Helpers.ts`. Prefer the `chromatogram_common` exports.
7. **Charting libraries**: Plotly (standard), d3 (mod heatmap, scan browser plots, `quantile` in the MS1 compute), hand-built SVG
   (protein bar), dead Google Charts loader. Prefer Plotly for new charts.
8. **Stale-async guards**: QC track-latest token/registry vs ad-hoc checks (scan browser current-scan compare, MS1 container
   stale-selection discard). Prefer track-latest for fan-out to many child charts; a local check for a single chain.
9. **Loader call styles in plots**: always-async `..._ReturnPromise()` vs `{ data, promise }` with/without a synchronous fast path
   (only about 6 of 40 sub/multi plots have the fast path). Prefer `{ data, promise }` + `promises.length === 0` fast path.
10. **Two PSM sources in QC plots**: filtered `_For_MainFilters` (+ distinct-peptide filter) vs unfiltered `NO_PSM_Peptide_Protein_Filtering`
    (target/decoy and score plots by design). Prefer filtered; use unfiltered only when the view must show PSMs outside the cutoffs.
11. **Protein widgets**: residue tooltip formatting byte-identical in bar and structure widgets; shade-by-PSM-count / horizontal-scale
    constant classes differ only by name; `_molstar_ListChains_...` / `_molstar__PolymerExpression` copied between structure main
    and map-new-structure overlay; two `createPluginUI` setups; separate `_compute__INTERNAL__MainData_...` in both widgets.
    No preferred one identified (extract on next reuse).
12. **Trypsin rules**: `trypsinCutPointsForSequence.ts` (with exceptions) vs `[KR][^P]` regex in QC digestion compute and the
    missed-cleavage filter (two copies). No preferred one identified.
13. **Search-label accessors**: QC `searchData.searchLabel__SearchShortName_OR_SearchId` vs mod page
    `modPage_Get_SearchLabel__SearchShortName_OR_SearchId_ForProjectSearchId`.
14. **Click-on-SVG helper** copied three times, all dead.
15. **Mass arithmetic outside `PeptideMassCalculator`** in visual code: isotope offsets (chromatogram common, scan browser),
    Lorikeet library and `_add_2_modMasses_And_Round`, hard-coded proton mass in the QC MS1 plot. Prefer the canonical calculator; do not add new mass math.

## Open questions / unverified

- Render-queue failure path not restarting the queue, and the overlay relayout `catch` clearing the wrong flag — seen in code, not runtime-tested.
- `QcViewPage__ReferenceLine_Y_equals_X_Calculation_Class.y_Entry` assigns min y to `_min_X` — seen in code, not exercised.
- Missed-cleavage undercount for adjacent sites — from regex semantics analysis, not run.
- Lorikeet popup height-vs-width compare and the leading-space project-title URL — seen in source, runtime effect unchecked.
- Scan browser referrer flag always set (empty `if`) — effect not tested.
- `downloadStringAsFile` ISO-8859-1 blob type effect on non-Latin-1 text / SVG — inferred, not tested.
- Bodies of most QC plots, the cover components, the big chromatograms, the d3 plots, the Mol* render code and the
  feature-detection QC plots were skimmed, not read; per-plot quirks are not cataloged.
- The 7 sub-search plots using the unfiltered loader (count confirmed by grep: 7 files) are assumed (by analogy) to need decoys/all PSMs; the per-plot reason is still unverified.
- Resolved: CSS for the QC cover components (`create--update--chart--msg--cover-overlay`, `qc-click-plot-for-interactive--*`) is in `limelight_webapp/front_end/src/styles/qc-page.scss`.
- Gold-standard matching internals (mass tolerance, position rules) not read.
- Resolved: the mod heatmap offers a combined-SVG download; the scan-browser d3 plots have none (grep).
- Resolved: QC MS1 plot proton mass constant 1.007276466621 confirmed in `qcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot.tsx` (vs `PeptideMassCalculator` 1.00727647).
