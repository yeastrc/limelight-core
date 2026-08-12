# FlashLFQ quant on the QC page — run trigger + results load (implementation plan)

**Date:** 2026-08-12
**Status:** PLAN (not yet implemented)
**Scope:** front-end only. No backend / webservice / DB / new-page-bundle changes.

## Goal

Bring the existing FlashLFQ MS1-quant capability to the **QC page**:

1. **Run trigger** — render the owner-only **"View/Add Quant"** button on the QC page (the same
   button already on the peptide / single-protein views), so an owner can launch a FlashLFQ run from QC.
2. **Load results** — call the results loader on the QC page so a completed run's results are fetched
   into the shared `quant_PrototypeData` store and available on the page.
3. **Tiny confirmation** — a small visible line reporting that results loaded (record count + any
   not-ready/failed runs), so the wiring is verifiable end-to-end without the browser console.

**Explicitly out of scope (deferred — eventual use is TBD):** any *display* of quant values on QC (a
Quant column, plot, per-sample comparison, etc.). This plan only gets the run + load plumbing in place.

## Why this is small

The pieces are already built and page-agnostic:

- **The run button is a self-contained, reusable container.** `Quant_Container_Component`
  (`limelight_webapp/front_end/src/js/page_js/data_pages/quant/quant_Container_Component.tsx`) is the
  single gate + button, explicitly "intended to be reused across the project-search-ids data pages."
  It needs exactly four props (`searchDetailsBlockDataMgmtProcessing`,
  `dataPageStateManager_DataFrom_Server`, `projectSearchIds`, `scanFileData_Holder`) and owns *all* the
  gating itself: owner-only (`get_userCanRunQuant()`), per-search flags (no scan data / open mods /
  dynamic mods), and the §5 scan-file / sub-group structural rules. The server submit webservice
  enforces the same rules independently — this gate is UX only.
- **The owner gate is already wired on QC.** The QC logged-in root
  (`qc_page/qc_page_root/qcViewPage_RootClass_LoggedInUsers.ts:40`) constructs and passes a
  `DataPages_LoggedInUser_CommonObjectsFactory`, so `loadCoreData_ProjectSearchIds_Based.ts` already
  calls the can-run-quant webservice and sets `userCanRunQuant` on the `_DataFrom_Server`
  `DataPageStateManager` during QC core-data load (public users take the else branch → `false` → button
  hidden). Nothing to add for the owner gate.
- **The scan-file holder the button needs is already computed and held in QC state.** The QC main
  component already builds
  `commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder`
  from the same shared per-search `CommonData_LoadedFromServer` tree (see
  `qcViewPage_DisplayData__Main_Component.tsx` `_recompute_FullPage_Except_SearchDetails`, ~line 789+)
  and stores it in `this.state.…_Holder` (already read at `:2190`, `:2458`, etc.). We just pass that
  existing state value to the button — no new fetch, no new loader instance.
- **The results loader is a standalone singleton driven off the URL hash.**
  `quant/quant_PrototypeData.ts` (marked **THROWAWAY PROTOTYPE**) reads the run IDs the run-initiate step
  writes into `window.location.hash`, polls status, fetches the joined TSV↔reported-peptide result, and
  exposes `quant_PrototypeData_Load(...)`, `quant_PrototypeData_GetIfLoaded()`,
  `quant_PrototypeData_RegisterOnLoaded(cb)`. Loading it on QC just populates the same shared store the
  peptide/protein views use.

## The change — one file

`limelight_webapp/front_end/src/js/page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component.tsx`

### 1. Imports

- `Quant_Container_Component` from `page_js/data_pages/quant/quant_Container_Component`
- `quant_PrototypeData_Load`, `quant_PrototypeData_RegisterOnLoaded`, `quant_PrototypeData_GetIfLoaded`
  from `page_js/data_pages/quant/quant_PrototypeData`

### 2. Load the results

In `_runOnPageLoad()` (or `componentDidMount`), mirror the peptide page
(`peptidePage_Display_MainContent_Component.tsx:564`):

```ts
quant_PrototypeData_Load( this.state.searchDataLookupParamsRoot )
    .catch( () => { /* already logged/handled inside quant_PrototypeData_Load */ } );
quant_PrototypeData_RegisterOnLoaded( () => { this.setState({ force_Rerender_Quant: {} }); } );
```

Add a `force_Rerender_Quant?: object` field to the component's state interface — used only to repaint
the confirmation line once results arrive (matches the house `setState({ force_Rerender: {} })` idiom).

Note: `quant_PrototypeData_Load` no-ops cheaply when the URL hash carries no run IDs, so this is safe to
call unconditionally on every QC load.

### 3. Render the button

In the main-content JSX (the `return (` at ~line 2410), just above `<QC_Page_FiltersDisplay>` — the
byte-for-byte placement the peptide page uses at `:3253`:

```tsx
<Quant_Container_Component
    searchDetailsBlockDataMgmtProcessing={ this.props.propsValue.searchDetailsBlockDataMgmtProcessing }
    dataPageStateManager_DataFrom_Server={ this.props.propsValue.dataPageStateManager }
    projectSearchIds={ this.props.propsValue.projectSearchIds }
    scanFileData_Holder={ this.state.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder }
/>
```

The container self-gates for all three QC scopes (single search / single-search-sub-searches / multiple
searches), so no per-scope handling is required.

### 4. Tiny confirmation line

Directly beneath the button, read `quant_PrototypeData_GetIfLoaded()` and render one small line. The
returned `Quant_PrototypeData` exposes `readonly totalRecords`, `notReadyRuns`, `failedRuns`,
`unavailableRuns`. Render nothing when it returns `undefined` (no run IDs in the hash / not yet loaded);
otherwise something like:

> Quant results loaded: `totalRecords` records (`notReadyRuns.length` processing, `failedRuns.length` failed, `unavailableRuns.length` unavailable)

This is the "eyeball it works end-to-end" confirmation; it is intentionally throwaway alongside the
prototype loader.

## Verification / acceptance

- `tsgo` type-check clean.
- Front-end-only build + deploy to Tomcat; drive the QC page **logged-in as an owner** via the
  CDP harness:
  - the **View/Add Quant** button shows for an owner on an eligible search, and is **hidden** for a
    public/non-owner user;
  - launching a run writes the run IDs to the URL hash;
  - after the run completes and results load, the confirmation line reports the loaded record count.
- Confirm no regression to existing QC content (button + confirmation render above the filters block;
  everything else unchanged).

## Provenance / caveats

- `quant_PrototypeData.ts` is explicitly a **THROWAWAY PROTOTYPE**; this reuses it unchanged. The QC
  page loading it just populates the same singleton store the peptide/single-protein views already use.
- The owner gate, the scan-file holder, and the results loader are all pre-existing; this plan is
  almost entirely wiring in one component.
- No backend, webservice, DB, or new esbuild entry-point changes.

## Key references (verified 2026-08-12)

- Run button container: `quant/quant_Container_Component.tsx` (props + self-gate).
- Peptide-page placement to mirror: `…/peptide_page/peptidePage_Display_MainContent_Component.tsx:3253`
  (button) and `:564` (results load).
- Results loader API: `quant/quant_PrototypeData.ts` — `quant_PrototypeData_Load` (`:522`),
  `_GetIfLoaded` (`:477`), `_RegisterOnLoaded` (`:500`); `Quant_PrototypeData` fields `totalRecords`,
  `notReadyRuns`, `failedRuns`, `unavailableRuns` (`:120`+).
- Owner gate already set on QC: `data_pages_common/loadCoreData_ProjectSearchIds_Based.ts:188-229`;
  QC root passing the factory: `qc_page/qc_page_root/qcViewPage_RootClass_LoggedInUsers.ts:40`.
- QC main component (the file to edit): `qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component.tsx`
  — scan-file holder computed at `_recompute_FullPage_Except_SearchDetails` (~`:789`), held in
  `this.state.…_Holder`; main-content `return (` at `:2410`, `<QC_Page_FiltersDisplay>` at `:2420`.
- Related design docs: `flashlfq_quant_per_scanfile_run_keying_plan.md` (§5 run keying / eligibility),
  `flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md` (aggregation rules —
  relevant if/when QC ever *displays* or combines quant).
