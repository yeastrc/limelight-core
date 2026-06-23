# Chromatogram Component — Shared-Code Extraction Plan

## Goal
De-duplicate the two large chromatogram components so a fix made once applies to both
(they have already drifted — e.g. the "Peak Area:" isotope-accumulation bug existed in the
feature-detection copy but not the PSM copy).

## The two files
- **PSM** (`F1`, created first, ~5,833 lines):
  `data_table_react_common_child_table_components/.../chromatogram/psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component.tsx`
- **Feature Detection** (`F2`, derived from F1, ~5,965 lines):
  `feature_detection_driven_pages/feature_detection_view_page/chromatogram/featureDetection_ViewPage__Chromatogram_Component.tsx`

After collapsing the component-name prefixes and ignoring whitespace, **~3,716 lines still
differ (~64%)** — so this is genuine divergence, not just naming. Shared concept = the
chromatogram (Plotly) rendering + math; real difference = the **data source**
(PSM / `ProjectSearchId` vs feature / `ProjectScanFileId`) and its loading/state.

## Approach
NOT a single merged component (that becomes a flag-ridden mess). Instead: extract the shared,
stable pieces into modules under this `chromatogram_common/` dir that **both** thin components
import. Each page keeps only its data loading + a page-specific point trace, and renders the
shared chart.

Shared chart interface (generic over the click-payload type to preserve TypeScript types —
no `any`, no Plotly `customdata`):

```ts
interface ChromatogramTrace<TPointData> {
    x: number[]; y: number[];
    hovertext: string[];        // tooltip strings (page builds them)
    pointData: TPointData[];    // parallel, strongly typed click payload
}
interface ChromatogramProps<TPointData> {
    traces: ChromatogramTrace<TPointData>[];
    layoutOptions: { xAxisLabel; yAxisLabel; rtRange; showIonCount; ... };
    areaUnderCurve: number | undefined;          // Peak Area display
    onPointClick?: (p: TPointData) => void;       // index lookup: traces[curveNumber].pointData[pointNumber]
    onRelayout?:   (eventData) => void;
}
```

Rule for every step: `diff` the two bodies → move to shared → import in both → build → eyeball
the chart. One concern per commit. Leaf-first, never big-bang.

---

## Phase 0 — setup
- [ ] Use this `chromatogram_common/` dir; one module per extracted concern.
- [ ] Per-piece canonical pick: **F2 for the click wiring** (it already uses the type-safe
      `curveNumber`+`pointNumber` index lookup); either file for the verified-identical helpers.

## Phase 1 — pure leaf helpers + constants  (status confirmed below)
- [x] `_areaUnderCurve_Display_FormattingFunction` — DONE (in `chromatogram_Common_Helpers.ts`)
- [x] `_compute_Isotope_M_Over_Z_Addition_For_Isotope_Number` — DONE
- [x] `_ISOTOPE_MAX__FOR_CHART_TRACES` — DONE
      (above three extracted to `chromatogram_Common_Helpers.ts`; `C13_MASS_DELTA` dep moved
       into the shared module + trimmed from both components. Verified by full ant build:
       esbuild bundle + `tsc --noEmit` type-check both passed, deployed to Tomcat 11.)
- [ ] `_is_AllNumbersValid` — DEFERRED: byte-identical *text* but a class method reading
      `this._retentionTimeMinutes_Range_*` + `this._NUMBER_NOT_ASSIGNED` (instance logic, not a
      pure helper). Extract as `(min, max, notAssigned) => boolean` + update the 1 call site in
      each (`_set_UpdateButton_Enabled`), or fold into the Phase-4 RT-validation UI extraction.
- [x] PPM compute — DONE: consolidated into `chromatogram_Common_Helpers.ts` as
      `_compute_PPM_Mass_For_Precursor_M_Over_Z_PlusMinus`; F2 inline dropped; F1's external
      `…Compute_PPM_Mass…` module deleted (was F1-only) + its call sites renamed to the short name.
- [x] `_ISOTOPE_PLOT_TRACE_COLORS` — DONE: comment typo reconciled (`UUSED`→`UNUSED`), extracted to
      `chromatogram_Common_Helpers.ts` next to `_ISOTOPE_MAX__FOR_CHART_TRACES` (with the MUST-equal
      invariant comment). Verified by full ant build (tsc --noEmit + esbuild) → Tomcat 11.
- [ ] RT-minutes rounding (`_compute_RT_Minutes_*`) — DEFERRED (not a leaf): F1 takes **seconds**
      (`/60` then rounds), F2 takes **minutes** (rounds only), and both depend on the *local*
      `INTERNAL__MATH_FLOOR_CEIL` enum + `_RETENTION_TIME_…_POW_10` constant. Reconcile as: one shared
      `(minutes, floorCeil)` fn (= F2's) + share the enum/constant, and convert seconds→minutes at
      F1's 2 call sites. Do this with the RT/rounding cluster, not as a quick leaf.

## Phase 2 — chart math core
- [x] **2-A: trapezoid AUC atom** — DONE. Extracted `_areaUnderCurve_TrapezoidBetweenPoints`
      (the `dt × avgIntensity` math) to `chromatogram_Common_Helpers.ts`; replaced all 4 inline
      copies (2 branches × 2 files). Build-verified.
- [~] Full `…__Create_Single_PlotlyTrace_…For_MZ_OR_MZ_Plus_X_Isotope` → **NOT a clean extract**:
      measured ~40–50% genuine divergence (F2 is 160 lines longer — extra data holders +
      PSM-on-feature logic). Treated as intentionally per-page.
      Correction: the Peak Area bug was in the *caller's* accumulation loop (Phase 3), NOT this
      fn — it computes `areaUnderCurve_SingleTrace` correctly in both.

## Phase 3 — chart assembly + render (parameterized)
- [ ] `_StandardChartConfig` + layout builder.
- [ ] Monoisotopic + isotope-loop accumulation (`areaUnderCurve_Total += …` ×2) and the
      `_areaUnderCurve_Display` set → one shared routine. *(Locks in the Peak Area fix so FD
      can't drift from PSM again.)*
- [ ] Plotly `newPlot`/`react` + event wiring. Unify on **F2's index lookup**; migrate F1 off
      `psmItem_Map_Key_PsmTooltip.get(point.hovertext)` (brittle: collides on duplicate tooltips).

## Phase 4 — presentational UI (props + callbacks)

### Increment 1 — chart options layer — DONE (build-verified: tsgo + esbuild → Tomcat 11)
- [x] 1a: 4 option enums + 3 defaults → `chromatogram_Common_Options.ts`
- [x] 1b: 3 PPM-range constants + sort/validate block → `chromatogram_Common_Options.ts`
      (`_MAX_VALUE…M_Over_Z_PPM` is also used by data-loading; shared, both import it)
- [x] 1c: **4 selector components (421 byte-identical lines)** → `chromatogram_Common_OptionSelector_Components.tsx`

### Increment 2 — RT min/max overlay cluster — DONE (build-verified: tsgo + esbuild → Tomcat 11)
The ~642-line cluster (`Internal__RetentionTime_Min_Max_UserEditable_Component` +
`…UserInput_Overlay_Component__OpenOverlay` fn + `…UserInput_Overlay_Component`) → new file
`chromatogram_Common_RetentionTimeOverlay_Components.tsx`. At the precise class boundary the
cluster was **byte-identical** (the 8 earlier diffs were in the *next* fn's JSDoc, excluded).
Only **2** local constants needed sharing (`_PADDING_TOP_ABOVE_HELP_SYMBOL`,
`_MARGIN_LEFT_AFTER_HELP_SYMBOL` → `chromatogram_Common_Options.ts`); the `…POW_10` constant was
a false positive from the over-extended scan (only the divergent rounding fn uses it). Only
`Internal__RetentionTime_Min_Max_UserEditable_Component` is exported (the overlay fn + component
are cluster-internal via `__OpenOverlay`). It does **NOT** use `_compute_RT_Minutes_*`, so the
seconds-vs-minutes RT divergence never mattered.

### Remaining (harder / genuinely divergent)
- [ ] Peak Area display div → `areaUnderCurve` prop. **NOTE:** `_areaUnderCurve_Display` is a
      plain instance field, not state — relies on `setState({forceRerenderObject:{}})`.
- [ ] Loading / error / updating / no-data messages + `_clickOn_Button_{Chromatogram,Cancel_*}`.
- [ ] The main Plotly render + click wiring (generic `<Chromatogram>` core) — divergent;
      unify on F2's index-based click lookup if/when tackled.

## Stays per-page (do NOT extract — the legitimate divergence)
- Data loading: `_load_InitialDataFromServer`, `_load_Chromatogram_For_Selected_{SearchScanFileId|ProjectScanFileId}`
  + `__AfterGet_*`, the `_DataFromServer_*` promises, `_get_ScanData_*`.
- Data-source shaping: F1 `_compute_selection_ReportedPeptide_OpenModMass_Charge…`,
  `_compute_RetentionTime_MinMax_PSM_List_For_Chart`, `_Plot_PSM` point trace;
  F2 feature/singular-feature shaping + `_Plot_SingularFeature` point trace.
- commonData holders (PSM/`ProjectSearchId` vs feature/`ProjectScanFileId`) + props/state.
- Each thin component: load data → build page-specific point trace + a common "chromatogram
  input" (RT-sorted scanItems, m/z, charge, labels) → render the shared chart.

## Cross-cutting reminders
- Generic `TPointData` wherever the click payload flows (PSM item vs feature item) — no type loss.
- Keep `x` / `y` / `hovertext` / `pointData` built in one loop so indices stay aligned.
- Point-marker traces (PSM points, singular-feature points) have no area — only the
  monoisotopic + isotope **line** traces contribute to Peak Area.

---

## Phase-1 byte-identical status (verified, whitespace-insensitive)

| Helper | Status | Action |
|---|---|---|
| `_areaUnderCurve_Display_FormattingFunction` | ✅ **IDENTICAL** (4 lines) | extract as-is |
| `_compute_Isotope_M_Over_Z_Addition_For_Isotope_Number` | ✅ **IDENTICAL** (7 lines) | extract as-is |
| `_is_AllNumbersValid` | ✅ **IDENTICAL** (10 lines) | extract as-is |
| `_ISOTOPE_MAX__FOR_CHART_TRACES` | ✅ **IDENTICAL** (`= 3`, same comment) | extract as-is |
| `__Sort_ArrayOfNumbers_SortArrayInPlace` | ✅ **ALREADY SHARED** | none — both already `import limelight__Sort_ArrayOfNumbers_SortArrayInPlace` from `common_all_pages` |
| PPM compute (`…Compute_PPM_Mass_For_Precursor_M_Over_Z_PlusMinus`) | 🟡 **ALREADY EXTRACTED in F1** | F1 = separate `.ts` module; F2 = inline dup (trivial `m/z * ppm / 1e6`). Point F2 at F1's module (or move to `chromatogram_common`) |
| `_ISOTOPE_PLOT_TRACE_COLORS` | 🟡 **NEAR-IDENTICAL** (1 line differs) | reconcile the one line, then extract |
| `_compute_RT_Minutes_*` rounding | 🔴 **DIFFERS** | F1 `…_FromSeconds…` (24 ln) vs F2 `…_FloorCeil_FromMinutes…` (22 ln) — different input units; reconcile before sharing |

**Safe to extract immediately (truly identical):** `_areaUnderCurve_Display_FormattingFunction`,
`_compute_Isotope_M_Over_Z_Addition_For_Isotope_Number`, `_is_AllNumbersValid`,
`_ISOTOPE_MAX__FOR_CHART_TRACES`. (`__Sort_…` is already shared — nothing to do.)
