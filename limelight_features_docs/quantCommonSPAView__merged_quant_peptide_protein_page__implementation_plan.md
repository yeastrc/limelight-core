# QuantCommonSPAView — merged Quant Peptide + Protein single-page app — implementation plan

**Status:** design/plan, not yet implemented. **Date:** 2026-09-11.

**Provenance:** *current-architecture* facts carry `file:line` **and copied-in code snippets** — the snippets
are deliberate because the quant pages are **uncommitted, actively-edited code whose line numbers will drift**;
find each spot by grepping the snippet text, not by trusting the line number. *Design* decisions were made by
the maintainer through the design discussion and are the authority where they differ from how the existing
pages work.

---

## 1. Goal

Build **one new page**, `QuantCommonSPAView`, that presents the quant **peptide list** and quant **protein
list** as a true single-page app: one React root, one persistent `MainContent` (holding the nav, a
"Peptide View / Protein View" label, the search-details/cutoffs block, shared loaded data, and room for future
shared charts/content), whose child subtree (the view-specific filters + the list) is **regenerated on nav**.
The two views are switched **client-side (no page reload)** and each has its own URL so a reload/deep-link
lands on the current view — standard SPA behavior (this differs from stock Limelight, which reloads on nav).

## 2. Approach & scope (maintainer's decisions — authoritative)

- **NEW everything** — new controller, JSP, bundle, two routes, FE bootstrap, Root, MainContent, merged
  central-state class, merged filter block. Do **not** refactor the existing pages into this.
- **Reuse ONLY the single-protein overlay** (`quant_single_protein_page/…`, central-state key `'v'`) unchanged.
- **Leave the existing Quant Peptide and Quant Protein pages entirely alone** — they stay live so the new
  page's output is validated by **side-by-side comparison** against them.
- **Two new routes**, distinct from the existing quant routes: `d/pg/psb/quant-peptide-view/` and
  `d/pg/psb/quant-protein-view/`. The route encodes the current view.
- **Two new Project-page links** ("Quant Peptide Common", "Quant Protein Common") in the runs list, alongside
  the existing "Quant"/"Quant Protein" links.
- **Shared infrastructure is off-limits to modify — with ONE sanctioned exception:** four shared files get a
  small **additive, optional, backward-compatible** "controller-path callback" (§7) so the new page can tell
  the shared URL machinery which of its two routes is current. Everything else shared
  (`GetReportedPeptideIdsForDisplay_…Class`, the filter-state component families, `LoadCoreData`, the
  `CommonData` tree, the single-protein overlay) is cloned/consumed, never edited.
- **No backwards compatibility needed for the new page** (unreleased) — its URLs/state key/filenames are free.

## 3. Naming (maintainer's decision)

- New files/classes/exported functions/route constants prefixed **`QuantCommonSPAView`** (capitalized for
  components/classes) / **`quantCommonSPAView`** (lowercase file basenames / non-component identifiers). The
  "Common SPA" name is intentional so more shared things can live here over time.
- If a piece genuinely doesn't fit "common", name it `Quant<Specific>` instead.
- Follow `limelight_webapp/front_end/CLAUDE.md`: exported symbols prefixed by file basename with `__`;
  non-public methods/vars start with `_`; file-internal classes/interfaces/components use `INTERNAL__`.

---

## 4. Current architecture — the source material to clone (grounded)

FE paths under `limelight_webapp/front_end/src/js/page_js/data_pages/`.

### 4.1 Server side (existing quant pages, to clone)

Route constants — `src/main/java/…/AA_PageControllerPaths_Constants.java`:
```
QUANT_PEPTIDE_VIEW_PAGE_CONTROLLER = "d/pg/psb/quant-peptide/"     // ~line 170  (EXISTING - leave alone)
QUANT_PROTEIN_VIEW_PAGE_CONTROLLER = "d/pg/psb/quant-protein/"     // ~line 179  (EXISTING - leave alone)
```
Both are `d/pg/psb/` project-search-based pages; auth + search-data-lookup DOM-param injection is done by the
`DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor` covering `d/pg/psb/**` — not
inline in the controllers.

Controller pattern — `QuantPeptideView_Controller.java` `controllerEntryInternal` (~176-198):
```java
page_UserDefault_SetForJSP( ... );                             // user-default request attrs for JSP
blib_Spectral_Library_Webservice_Configured__SetForJSP( ... ); // Blib-configured flag for JSP
return "data_pages/project_search_ids_driven_pages/quantPeptideView.jsp";
```

JSP pattern — `quantPeptideView.jsp`:
```jsp
<script id="controller_path" type="text/text">QUANT_PEPTIDE_VIEW_PAGE_CONTROLLER</script>   <%-- ~line 23 --%>
<%@ include file=".../head_section_include_data_pages.jsp" %>                                <%-- ~line 25 (psb head) --%>
<div id="main_quant_peptide_view_outer_block_react_root_container"></div>                    <%-- ~line 59 --%>
<script src=".../quantPeptidePage_RootLaunch_LoggedInUsers-bundle.js"></script>             <%-- ~line 76 --%>
<script src=".../quantPeptidePage_RootLaunch_PublicUser-bundle.js"></script>                <%-- ~line 80 --%>
```
The React mount anchor `data_page_overall_enclosing_block_div` is **not** in the JSP — it comes from the shared
include both JSPs pull in:
```jsp
<%-- body_after_header_include_data_pages.jsp:9 --%>
<div class=" overall-enclosing-block " id="data_page_overall_enclosing_block_div" >
```

### 4.2 FE bootstrap (existing, to clone)

esbuild entries — `build.gradle` ~274-280: four layers per page (`…_RootLaunch_LoggedInUsers.ts`,
`…_RootLaunch_PublicUser.ts`, `…RootClass_LoggedInUsers.ts`, `…RootClass_Common.ts`). Real bootstrap is
`…RootClass_Common.ts` (peptide `initialize()` ~183; protein ~171): global error init; `window.onpopstate` →
full reload; `centralPageStateManager.getInitialStateFromURL()`; `getSearchDataLookupParametersFromPage()`
(reads `projectSearchIds` + `search_data_lookup_parameters_at_page_load` from **server JSON on the page**);
construct+populate central-state + filter objects; nav `NavigationType_Enum.QUANT`; `_updateURL()`;
`LoadCoreData_ProjectSearchIds_Based.loadCoreDataFor_ProjectSearchIds()`; then mount:
```ts
// quantPeptideViewPage_RootClass_Common.ts ~527-537
const mount = document.getElementById("main_quant_peptide_view_outer_block_react_root_container");
createRoot( mount ).render( React.createElement( QuantPeptidePage_Display_Root_Component, props, null ) );
```
Root component is an **error boundary only**, rendering one child MainContent
(`quantPeptidePage_Display_Root_Component.tsx` → `QuantPeptidePage_Display_MainContent_Component`; protein
`quantProteinViewPage_DisplayData_ProteinList__Root_Component.tsx` →
`QuantProteinViewPage_DisplayData_ProteinList__Main_Component`).

### 4.3 Central page state manager + URL (shared infra)

`central_page_state_manager/centralPageStateManager.ts` — one flat `_pageState` map keyed by single-letter
component ids; `register({component})` / `setState({component})`. `setState` **prunes any key not currently
registered** (`~224-230`). `unregister({componentUniqueId})` (`~:174`) only removes the registration.

The **only** controller-path DOM read in this class (this is where the §7 callback plugs in):
```ts
// centralPageStateManager.ts:330  (inside getURL_ForCurrentState, used by _updateURL on every state change)
pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();
```
`newURL_Build_PerProjectSearchIds_Or_ExperimentId(...)` takes `pageControllerPath` as a **param** (does not read
the DOM itself); URL = `pageControllerPath + searchDataLookupParamsCode + "/q/" + pageStateString`.

State-key namespace — `centralPageStateManager_Keys.ts` (highest in use `'w'` ⇒ **`'x'` free**):
```
QUANT_PEPTIDE_LIST…KEY='u'   QUANT_SINGLE_PROTEIN…KEY='v'(overlay, reused)   QUANT_PROTEIN_LIST…KEY='w'
```
URL rewrite — `limelight__ReplaceBrowserAddressBarURL_ValidateUpdated_Function.ts` does
`window.history.replaceState(null,null,newURL)` and **preserves `location.hash`** (`~:39-44`). State is
restorable from the URL on load via `getInitialStateFromURL()` → `parseURL_Into_PageStateParts`.

**Other shared files that read the controller-path DOM helper** (relevant to §7):
`parseURL_Into_PageStateParts.ts:97`, `sharePage_dataPages_Common.ts:39`, `saveView_dataPages_Common.ts:79`.

### 4.4 The reported-peptide compute — heart of both lists

Shared class `GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class`
(`common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/
peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds.ts`) — **off-limits to
modify.** Full public surface = two compute methods + factory (rest are `_`-private):
```
static getNewInstance(...)                                                    // ~:224
getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise(params)      // ~:244  always-async  ← quant uses this
getReportedPeptideIdsForDisplay_AllProjectSearchIds(params)                    // ~:270  {data,promise} fast-path (feature-detection only)
```

**Quant call-site inventory (grep-exhaustive):**
| Site | Phase | Params |
|---|---|---|
| peptide `…MainContent_Component_nonClass_Functions.ts:160` | initial load | full peptide (incl. 3 peptide-only) |
| peptide `…MainContent_Component.tsx:2974` | recompute on filter change | full peptide |
| protein `…Main_Component.tsx:2003` | initial **and** recompute (one path) | shared-only (3 peptide-only `undefined`) |
| single-protein overlay `quantSingleProtein_MainContent_Component_nonClass_Functions.ts:202` | overlay-scoped | overlay params (independent) |

**The peptide↔protein param difference — the ONLY divergence in what feeds the compute.** Both pass identical
shared filters (mods, reporter-ion, scan/PSM family, missed-cleavage, digestion); they differ on exactly three:
```ts
// PEPTIDE  quantPeptidePage_Display_MainContent_Component.tsx  (~2986-2994) — passes the three:
peptideUnique_UserSelection_StateObject      : this.props.propsValue.peptideUnique_UserSelection_StateObject,
peptideSequence_UserSelections_StateObject   : this.props.propsValue.peptideSequence_UserSelections_StateObject,
proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject,
```
```ts
// PROTEIN  quantProteinViewPage_DisplayData_ProteinList__Main_Component.tsx  (~2020-2026):
//  No filtering on these for protein list
peptideUnique_UserSelection_StateObject : undefined,
peptideSequence_UserSelections_StateObject : undefined,
proteinPositionFilter_UserSelections_StateObject : undefined,
// (also proteinSequenceWidget_StateObject / userSearchString_… / proteinPosition_Of_Modification_… undefined)
```
Consequence (call sites verified; "purely subtractive" inferred): with those three empty, the peptide and
protein reported-peptide **sets are identical**; with any set, the peptide set is the protein set further
narrowed. **This is the basis of the nav-skip (§6.10).**

**Result is held in MainContent, recomputed unconditionally on filter change (no cache/guard) on BOTH pages:**
- Peptide result → `this.state.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds` (field decl `~:259`).
  Recompute path: ~10 filter callbacks → `_updateRestOfPage_ForUserInteraction()` (`~:2894`, nested-`setTimeout`
  "updating" wrapper) → `_updateRestOfPage_ForUserInteraction__After___updateCurrentPeptideFiltersSection()`
  (`~:2969`) → the `_ReturnPromise` at `~:2974` (unconditional) → build peptide list → setState. Peptide's
  **initial** compute is a *separate* function `…_nonClass_Functions.ts:160`.
- Protein result → same state field (`~:297`) plus the aggregated table on instance field
  `_proteinDisplayData_Final_ForDisplayTable` (`~:406`, set `~:2317`). Recompute path: every filter callback →
  `_re_renderPage()` (`~:1930`, `setTimeout(…,20)` "updating" wrapper) → `_re_renderPage_Actually()` (`~:1948`)
  → `_ReturnPromise` at `~:2003` (unconditional) → aggregate → setState. Protein's **initial** load runs through
  `_recompute_FullPage_Except_SearchDetails({initialPageLoad:true})` (`~:892,:915`, only ever `true` — does the
  server data load) which funnels into the same `_re_renderPage_Actually`. So **protein uses ONE method for
  both phases; peptide splits initial (nonClass:160) from recompute (tsx:2974)** — the shapes to reconcile.

**Protein list derives from the reported-peptide set** (not a separate query):
```ts
// protein …Main_Component.tsx (~2030-2039)
await proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides({
    ..., reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds:
        getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
    ... });   // → _proteinDisplayData_Final_ForDisplayTable
```

### 4.5 The two central-state classes to merge

- `quant_peptide_page/quantPeptidePageRoot_CentralStateManagerObjectClass.ts` (key `'u'`,
  `getDataForEncoding()` `~463-518`).
- `quant_protein_page/quantProteinList_CentralStateManagerObjectClass.ts` (key `'w'`, `getDataForEncoding()`
  `~435-491`). (Protein grouping is a *separate* object `ProteinGrouping_CentralStateManagerObjectClass`, key
  `'f'`, shared with the legacy protein page.)

**Shared / peptide-only / protein-only split** (drives the merged class §6.6 and the merged filter block §6.7):
- **Shared** (both classes): mods (+ open-mod-mass-zero), reporter-ion masses, generatedPeptideContents, the
  scan/PSM family (scanFilenameId-on-PSM, scan RT/mz, psm charge, psm exclude-independent-decoy,
  scanNumber-on-PSM, scanPeak m/z-intensity), missed-cleavage, meets-digestion.
- **Peptide-only:** peptideUnique, peptideSequence, proteinPositionFilter, the peptide-list PSM-count filter,
  generatedPeptideContents-for-single-protein-overlay. *(The first three are the three that change the
  reported-peptide set — §4.4.)*
- **Protein-only:** distinctPeptideContents, proteinListColumnsDisplayContents, proteinList count filters,
  protein grouping (its own `'f'` object).

### 4.6 Project-page links (existing, to add a parallel to)

`other_data_pages/project_page/project_page_quant_section/projPg_Quant_RunsList_Component.tsx` — `_render_ViewLink`
(`~:375`) renders per-run fake-links "Quant" (`_quantLink_Clicked` `~:459`) and "Quant Protein"
(`_quantProteinLink_Clicked` `~:508`, identical but protein route). Each: `window.open("about:blank","_blank")`
→ async fresh-load `projectSearchIdCodes` → build the psb URL from the route + `searchDataLookupParamsCode` +
`run.hashFragment` → set `newTab.location.href`; errors via `_quantLinkErrorMessage` (never `window.alert`).

---

## 5. Component hierarchy of the new page

```
QuantCommonSPAView_Root_Component            // error boundary ONLY (React error → generic message)
  └─ QuantCommonSPAView_MainContent_Component // PERSISTENT — does NOT regenerate on nav; holds:
       • own Nav toggle + "Peptide View / Protein View" label  (own nav code; NOT navigation_dataPages_Maint)
       • search-details / cutoffs block (fixed searchDataLookupParamsRoot — §6.8)
       • shared loaded data: the 3 CommonData Roots, GetReportedPeptideIdsForDisplay object,
         the held reported-peptide set, the merged filter state objects, quant_PrototypeData/proteinQuant
       • the ControllerPathHolder (received as prop) — updated on nav
       • future shared charts/content (placeholder)
       • single-protein overlay launch
       • [deferred] an "Updating…" cover div just inside the root of MainContent to overlay everything on nav
       └─ CHILDREN (REGENERATED on nav; read shared data from MainContent via props):
            • the merged filter block (one block, per-filter conditionals by view — §6.7)
            • the peptide list  (viewMode==='peptide')  OR  the protein list (viewMode==='protein')
```
Because MainContent is persistent, the held reported-peptide set and loaders survive the child regeneration —
which is exactly what lets the nav-skip (§6.10) reuse the held set.

---

## 6. Target design — build spec

### 6.1 Server side (new)

- **Two route constants** in `AA_PageControllerPaths_Constants.java`:
  `QUANT_PEPTIDE_VIEW__COMMON_SPA__PAGE_CONTROLLER = "d/pg/psb/quant-peptide-view/"` and
  `QUANT_PROTEIN_VIEW__COMMON_SPA__PAGE_CONTROLLER = "d/pg/psb/quant-protein-view/"` (final constant names at
  impl; must differ from the existing `quant-peptide`/`quant-protein`).
- **One controller** `QuantCommonSPAView_Controller.java` — clone `QuantPeptideView_Controller.java`, with
  **two `@GetMapping`s** (one per route) both calling one `controllerEntryInternal` that keeps the two
  `*_SetForJSP` calls and forwards to the **one** JSP `quantCommonSPAView.jsp`. Auth via the `d/pg/psb/**`
  interceptor (both new paths are `d/pg/psb/…`, so covered). The controller does **not** need to tell the JSP
  which route was hit for view-selection (the FE reads the URL — §6.5), but it may set nothing view-specific.
- **One JSP** `quantCommonSPAView.jsp` — clone `quantPeptideView.jsp`, except: **emit BOTH route strings** for
  the FE (e.g. two `<script type="text/text">` elements with ids like `controller_path__quant_peptide_view`
  and `controller_path__quant_protein_view`, or one JSON blob) — the FE reads `window.location` to decide which
  is current (§6.5). Include the psb `head_section_include_data_pages.jsp` and the shared
  `body_after_header_include_data_pages.jsp` (supplies `data_page_overall_enclosing_block_div`); declare one
  React root container `<div id="main_quantCommonSPAView_outer_block_react_root_container">`; and the
  user-type-conditional new bundles.
- **build.gradle** — add esbuild entries `quantCommonSPAViewPage_RootLaunch_LoggedInUsers` / `…_PublicUser`.

### 6.2 FE files (new), under `…/quant_pages/quant_common_spa_view_page/`

`quantCommonSPAViewPage_RootLaunch_LoggedInUsers.ts`, `…_PublicUser.ts`,
`quantCommonSPAViewPage_RootClass_LoggedInUsers.ts`, `quantCommonSPAViewPage_RootClass_Common.ts`,
`quantCommonSPAView_Root_Component.tsx` (error boundary), `quantCommonSPAView_MainContent_Component.tsx`,
`quantCommonSPAView_CentralStateManagerObjectClass.ts` (key `'x'`),
`quantCommonSPAView_ControllerPathHolder.ts` (§6.4), the merged filter block, and the two list sub-components
(clone the peptide-list shared section + the protein-list table builder). Plus own nav toggle component.

### 6.3 RootClass_Common.initialize() — order matters (§6.4)

1. Global error init.
2. **Create `QuantCommonSPAView_ControllerPathHolder`; seed it from the URL** — read both route strings from
   the page, match `window.location` against them, `holder.set_ControllerPath(matchedRoute)`. (This is also the
   initial view.)
3. Build `cb = holder.get_ControllerPath.bind(holder)`. Call the three shared setters
   `parseURL_Into_PageStateParts__set_Get_ControllerPath_Callback(cb)`,
   `sharePage_dataPages_Common__set_Get_ControllerPath_Callback(cb)`,
   `saveView_dataPages_Common__set_Get_ControllerPath_Callback(cb)`; construct `centralPageStateManager` **with
   `cb`** (new optional constructor param). All of this **before** step 4.
4. `centralPageStateManager.getInitialStateFromURL()` (now `parseURL_Into_PageStateParts` sees the right route).
5. `getSearchDataLookupParametersFromPage()` → `projectSearchIds` + the DOM `searchDataLookupParamsRoot` (§6.8).
6. Construct + register the merged `'x'` central-state object and the overlay `'v'` object; construct+seed the
   merged filter state objects; wire their callbacks to the `'x'` object's setters.
7. Set `window.onpopstate` to the **in-place** handler (§6.5), not full reload.
8. `_updateURL()`; `LoadCoreData_ProjectSearchIds_Based.loadCoreDataFor_ProjectSearchIds()`.
9. On resolve, `createRoot(document.getElementById("main_quantCommonSPAView_outer_block_react_root_container"))
   .render(<QuantCommonSPAView_Root_Component …/>)`, passing the holder + projectSearchIds + fixed
   searchDataLookupParamsRoot + the central-state/filter objects down.

### 6.4 ControllerPathHolder + the four shared-file callbacks (routing plumbing)

`quantCommonSPAView_ControllerPathHolder.ts`:
```ts
export class QuantCommonSPAView_ControllerPathHolder {
    private _controllerPath: string = undefined;             // required to be set before use
    get_ControllerPath() : string { return this._controllerPath; }         // this bound fn is the callback
    set_ControllerPath( controllerPath: string ) : void { this._controllerPath = controllerPath; }
}
```
The **one** bound callback `holder.get_ControllerPath.bind(holder)` is given to all four shared consumers so
they return the current route instead of reading the DOM. See §7 for the four additive shared-infra edits. On
nav, MainContent's nav code calls `holder.set_ControllerPath(newRoute)` so every consumer immediately reflects
the new route.

### 6.5 Routing behavior (pushState nav; in-place onpopstate; no DOM marker for view)

- **Current view** is derived from the URL: match `window.location` path against the two route strings (the FE
  has both from the JSP). No single `controller_path` marker is used for view-detection; the
  ControllerPathHolder holds the current route as the source of truth.
- **Nav (Peptide↔Protein toggle):** `holder.set_ControllerPath(targetRoute)`; build the target URL (target
  route + current `searchDataLookupParamsCode` + current `'x'` state string + hash — reuse the existing URL
  build via `centralPageStateManager` now that the holder returns the target route) and `history.pushState` it;
  regenerate MainContent's children for the target view; run the nav-skip (§6.10). No reload.
- **`onpopstate` (back/forward):** handle **in-place** (the maintainer wants to avoid reload): re-derive the
  route from `window.location`, `holder.set_ControllerPath(...)`, regenerate children for that view. Full reload
  only as a fallback if in-place proves troublesome. (A pure view-toggle keeps the `'x'` state string identical
  across the two history entries, so popstate just swaps the view; if filters also changed between entries the
  popped URL's state string is authoritative and would reseed the filters.)
- **Filter changes** keep going through the merged `'x'` object → `centralPageStateManager.setState` →
  `_updateURL` → `replaceState`, which now builds the URL with the holder's current route (§7).

### 6.6 Merged central-state class (new — key `'x'`)

`QuantCommonSPAView_CentralStateManagerObjectClass` (add `QUANT_COMMON_SPA_VIEW…_KEY = 'x'` to
`centralPageStateManager_Keys.ts`). Combine the encoded property sets of both source classes (§4.5): shared +
peptide-only + protein-only, dropping legacy `groupProteins_OLD_V1`. **No `viewMode` field** — the view lives
in the route (§6.5). `getUniqueId()` → `'x'`; `getDataForEncoding()` encodes **all** fields (the maintainer
decided NOT to conditionally restrict which serialize — merged, the set is small enough that URL length is not a
concern; that concern only applied to keeping two full separate classes at once).

### 6.7 Merged filter block (new — per-filter conditionals)

One filter block component that conditionally renders **each** filter by view: shared filters always;
peptide-only filters only when the peptide view is active; protein-only filters only when the protein view is
active. This is the "few changes" to the "Click to Show Filters and Options" area on nav. It's a child of
MainContent (regenerated on nav); all callbacks write to the merged `'x'` object. **Peptide-only filter values
persist (hidden, not applied) while in protein view and re-apply on toggle back** (maintainer: acceptable for
now; revisit if anyone complains).

### 6.8 searchDataLookupParamsRoot (fixed, from the DOM)

`searchDataLookupParamsRoot` **comes off the DOM** (the injected page params, via
`getSearchDataLookupParametersFromPage()`) and **never changes for quant pages** (it's set only when a new quant
run is created on the Project page). So: read it once at load, hold it on MainContent, and it drives nothing on
filter change. The search-details/cutoffs block lives in MainContent and never triggers a recompute. (This
corrects the legacy behavior where the block builds `searchDataLookupParamsRoot` from user cutoff edits.)

### 6.9 Unified compute-and-render path (new — reconcile the two shapes)

One compute-and-render method on MainContent, shared by both phases and both views (folds peptide's
initial-vs-recompute split and protein's single-method shape into one):
1. Call `GetReportedPeptideIdsForDisplay…_ReturnPromise({...})` with **view-correct params**: always the shared
   filters; include the three peptide-only filters (`peptideUnique`, `peptideSequence`, `proteinPositionFilter`)
   **only when viewMode==='peptide'**, else `undefined` (exactly as the protein page does today — §4.4). Uses
   the fixed DOM `searchDataLookupParamsRoot` (§6.8).
2. Hold the result on MainContent (state field), so it survives child regeneration (§5).
3. Build the **peptide list** (via the shared `quant_peptide_and_single_protein_shared/` code) when peptide,
   or the **protein aggregation** (`…CreateProteinDisplayData__Create_GeneratedPeptides` → protein display
   data) when protein.
4. **Within-view recompute is unconditional on any filter change** (unchanged from today). Reuse the existing
   "paint an Updating message via `setTimeout`, then run the heavy compute" wrapper (or the deferred cover div,
   §5). **Do NOT add a general filter-type-aware skip.**
5. Server data loads **once** at mount (clone protein's `initialPageLoad:true` server-load step). Because
   MainContent is persistent, a nav never re-fetches the shared loaded data.

### 6.10 The nav-skip (new — the ONLY added optimization; applies ONLY at a view toggle)

> On a Peptide↔Protein toggle, check whether the three peptide-only filters (`peptideUnique`,
> `peptideSequence`, `proteinPositionFilter`) currently have **no value**. If all three are empty, the peptide
> and protein reported-peptide sets are identical (§4.4), so **reuse the already-held reported-peptide set** for
> the target view (just build that view's display off the held set — skip the `_ReturnPromise` recompute). If
> any of the three has a value, recompute for the target view.

Symmetric both directions. Nothing more than this one predicate over those three filters. (This is why the set
must be held on the persistent MainContent — §5.)

### 6.11 Single-protein overlay (reused unchanged)

Launch the existing overlay exactly as the current pages do (key `'v'`, its own compute at
`quantSingleProtein_MainContent_Component_nonClass_Functions.ts:202`, scoped to the selected protein).
Launchable from **both** views; closing it returns to the current view (automatic — MainContent persists). No
changes to the overlay.

### 6.12 Nav toggle + label (new — own nav code)

Render the Peptide/Protein toggle and the "Peptide View / Protein View" label at the top of MainContent, using
**own nav code** (do NOT use `navigation_dataPages_Maint` at all). The server `page_navigation_links_data.quant`
nav is not used for this page (the existing pages keep it). Toggle click → §6.5 nav. Visual form of the toggle
(tabs / segmented buttons / links) is a cosmetic decision for impl.

### 6.13 Updating cover div (deferred)

A `<div>` just inside MainContent's root that can overlay everything with "Updating…" during a nav change (and
optionally during within-view recompute). Deferred — implement after the core works.

### 6.14 New Project-page links (two)

In `projPg_Quant_RunsList_Component.tsx` `_render_ViewLink` (`~:375`), add **two** links —
"Quant Peptide Common" and "Quant Protein Common" — cloning `_quantLink_Clicked` (`~:459`) into
`_quantCommonSPAView_Peptide_Link_Clicked` / `_quantCommonSPAView_Protein_Link_Clicked`, each building the URL
for the respective new route (`quant-peptide-view` / `quant-protein-view`) from `run.searchDataLookupParamsCode`
+ `run.hashFragment` (same async new-tab pattern; reuse `_quantLinkErrorMessage`). This RunsList file is
existing uncommitted project-page quant code — the two links are the one existing FE file the new feature edits.

---

## 7. Sanctioned shared-infra changes (four files — additive, optional, backward-compatible)

All four default to the existing DOM read when the callback is unset, so **every other page is unaffected**.
Safe as module-global because exactly one page runs per page-load.

1. **`centralPageStateManager.ts`** — add an optional constructor param `get_ControllerPath_Callback?: () =>
   string`, store it, and at `:330`:
   ```ts
   pageControllerPath = this._get_ControllerPath_Callback
       ? this._get_ControllerPath_Callback()
       : ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();
   ```
2. **`parseURL_Into_PageStateParts.ts`** — add a file-local `let _get_ControllerPath_Callback` + exported setter
   `parseURL_Into_PageStateParts__set_Get_ControllerPath_Callback(cb)`, and at the read site (`:97`) use the
   callback if set else the DOM helper.
3. **`sharePage_dataPages_Common.ts`** — same pattern; setter
   `sharePage_dataPages_Common__set_Get_ControllerPath_Callback(cb)`; read site `:39`.
4. **`saveView_dataPages_Common.ts`** — same pattern; setter
   `saveView_dataPages_Common__set_Get_ControllerPath_Callback(cb)`; read site `:79`.

The pattern for #2–#4:
```ts
let _get_ControllerPath_Callback: ( () => string ) | undefined = undefined;
export function <fileBasename>__set_Get_ControllerPath_Callback( cb: () => string ) : void { _get_ControllerPath_Callback = cb; }
// at the existing read site:
const pageControllerPath = _get_ControllerPath_Callback
    ? _get_ControllerPath_Callback()
    : ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();
```
Acknowledged as a contained hack (module-global setters); chosen so we don't have to change all other
`centralPageStateManager`/helper call sites. The single bound callback (`holder.get_ControllerPath.bind(holder)`)
feeds all four. **Completeness note:** these four cover load/state-restore (parseURL), filter-change URL
(centralPageStateManager), and Share/Save-view. If any *other* route-dependent URL builder is exercised on the
new page (e.g. `updatePageState_URL_With_NewFilterCutoffs`, `setDefaultView_dataPages_Common`,
`page_UserDefault_processing`), it would need the same treatment — but given fixed `searchDataLookupParamsRoot`
(§6.8) and own-nav (§6.12), those are not expected to run here.

---

## 8. Load-bearing gotchas / constraints

- **Shared infra off-limits** except the four §7 additive callbacks. Clone/consume everything else.
- **`GetReportedPeptideIdsForDisplay…Class` has TWO public methods** (§4.4) — use `_ReturnPromise`.
- **State-key pruning** (`centralPageStateManager.ts:224-230`): with the always-registered merged `'x'` object
  plus the overlay `'v'`, nothing is pruned unexpectedly. (This is why one merged class beats juggling two.)
- **Init order** (§6.3) is load-bearing: seed the holder + wire all four callbacks **before**
  `getInitialStateFromURL()`.
- **onpopstate in-place** replaces the stock reload-on-popstate; that's intentional for this page.
- **CDP / DOM notes:** the single-protein overlay hides the main page via `display:none` on
  `data_page_overall_enclosing_block_div` and renders as its sibling — scope overlay DOM queries accordingly;
  filters start collapsed behind "Click to Show Filters and Options" (children absent from DOM until expanded);
  DataTables paginate (only current page's rows in DOM; select "All" = value `-1` to render all).

---

## 9. Validation strategy

Existing pages are intact → validate by **side-by-side comparison** on the same project/searches/run:
1. Existing Quant Peptide page vs new page in peptide view — same peptide rows, generated-peptide strings,
   quant values, MBR marks, PSM counts, under identical filters.
2. Existing Quant Protein page vs new page in protein view — same protein rows/aggregation/quant columns.
3. Toggle both ways with the three peptide-only filters empty (must **reuse** the held set — §6.10) and with
   them set (must **recompute**) — the lists must match their standalone counterparts in both cases.
4. Reload each new route directly (deep-link) — lands on the correct view with state restored.
5. Back/forward across a toggle — in-place swap, no reload.
6. Each new Project-page link opens the correct route/view for the run.

---

## 10. Open decisions remaining

- Final route-constant names + exact route strings (`quant-peptide-view` / `quant-protein-view` proposed).
- Nav toggle visual form (tabs vs segmented buttons vs links) — §6.12.
- Whether Share / Save-view are in scope for v1 (if not, §7 #3/#4 can be deferred, but they're cheap).
- The "Updating…" cover div (§6.13) — deferred.

Decided (for reference): two routes; one controller/JSP/bundle; state key `'x'`; view in the route (no
`viewMode` state field); Root = error boundary; MainContent persistent (nav+label+cutoffs+shared data),
children regenerate on nav; merged filter block with per-filter conditionals; fixed DOM
`searchDataLookupParamsRoot`; ControllerPathHolder + four additive shared-file callbacks; pushState nav +
in-place onpopstate; nav-skip on the three peptide-only filters; unconditional within-view recompute; overlay
reused unchanged; two project-page links; peptide-only filters persist hidden in protein view for now.

---

## 11. Suggested phasing

1. **Shared-infra callbacks + holder** (§7, §6.4): add the four additive callbacks and the ControllerPathHolder;
   verify existing pages still build/run unchanged (callbacks unset → DOM fallback).
2. **Server + one-view skeleton:** two routes, one controller/JSP/bundle, new bootstrap mounting one React root
   → Root(error boundary) → MainContent rendering just the peptide view wired to `'x'` + shared loaders + the
   holder. Prove psb load, state round-trips through the URL via the holder, existing pages untouched.
3. **Both views + toggle:** add the protein view; the unified compute path (§6.9) with view-correct params; the
   own nav toggle + pushState + child regeneration + in-place onpopstate; merged filter block conditionals.
4. **Nav-skip + overlay + project-page links** (§6.10, §6.11, §6.14).
5. **Validation** (§9); then the Updating cover div and shared charts as needs firm up.

---

## Appendix A — reported-peptide compute call-site inventory (grep-exhaustive, quant)
- peptide `…MainContent_Component_nonClass_Functions.ts:160` (initial); peptide `…MainContent_Component.tsx:2974`
  (recompute); protein `…Main_Component.tsx:2003` (initial+recompute); overlay
  `quantSingleProtein_MainContent_Component_nonClass_Functions.ts:202`.

## Appendix B — state-key letters
In use `a`–`w`; quant peptide `u`, overlay `v`, quant protein `w`; **`x`,`y`,`z` free** → new page uses `x`.

## Appendix C — controller-path DOM read sites (for §7)
`centralPageStateManager.ts:330`, `parseURL_Into_PageStateParts.ts:97`, `sharePage_dataPages_Common.ts:39`,
`saveView_dataPages_Common.ts:79` (plus non-relevant others: `newURL_Build` takes it as a param;
`updatePageState_URL_*`, `setDefaultView_*`, `page_UserDefault_processing`, `navigation_dataPages_Maint`,
`searchDetailsAndFilterBlock_*`, mod/scan-file/project-upload pages — not expected on this page).
