# QuantCommonSPAView — single-MainContent refactor: continuation plan

**Date:** 2026-09-14 (updated 2026-09-15). **Status:** FEATURE ESSENTIALLY COMPLETE. Stages 1–2 + the
protein-disable toggle item are DONE & review-verified (all feature code still uncommitted). The deeper
filter-integration steps (unify compute / merge FilterSections / nav-skip) are **PERMANENTLY PARKED** (not
just deferred — see §6); in-place `onpopstate` was decided against; filters are **kept SHARED** between the
two views. Final architecture: one common data layer feeding two separate per-view renderers. See §5 for
per-stage progress and §6 for the settled decisions.

**What this doc is:** a self-contained continuation plan for the remaining QuantCommonSPAView work, written
so a fresh session can pick up with full context. It is the companion to the committed background spec
`quantCommonSPAView__merged_quant_peptide_protein_page__implementation_plan.md` (that doc has the deeper
grounding — §4.4 the shared reported-peptide compute, §7 the four controller-path callbacks, §5/§6 the
component design). **Where the two differ, THIS doc is authoritative:** it replaces that spec's
"merge-everything-at-once" framing with the maintainer's revised, *staged, data-layer-first* approach.

Provenance rule: the quant files are uncommitted and actively edited, so **line numbers drift — grep the
named symbols, do not trust line numbers.**

---

## 1. Roles & workflow (two separate sessions; the maintainer relays between them)

- **Build session** — works in the `limelight-core` repo: edits source, builds bundles/WAR, deploys,
  drives the app via an isolated CDP Chrome (deb `/usr/bin/google-chrome`, dedicated `--user-data-dir`,
  PID-scoped kill — never `pkill chrome`). Reports `file:line` + OBSERVED-vs-inferred. **STOP-gated**: no
  commit / push / snapshot / app-restart-beyond-redeploy without explicit authorization.
- **Review session** — read-only on the repo (may write repo markdown docs, not code): scopes each task,
  grounds load-bearing facts against source, writes STOP-gated build prompts, and verifies build output by
  directory-diff + independent tsgo + reviewing the build session's CDP results.
- Build prompts are generated **fresh at do-it time** (line refs drift). Prompt conventions (loud `=`
  delimiters, the two standing rules, quant-vs-legacy naming) live in the review session's own notes.

---

## 2. The vision — COMMON at the DATA layer, SEPARATE at the RENDER layer

The goal is **one common data foundation feeding two distinct view renderers** — NOT two page-copies
coexisting and switching at a high level (that earlier direction was wrong and is abandoned).

- Both views already derive from the **same** computation: `GetReportedPeptideIdsForDisplay_…_ReturnPromise`.
  The shared filters feed both identically; the protein view passes the three peptide-only filters
  (`peptideUnique`, `peptideSequence`, `proteinPositionFilter`) as `undefined`; **the protein list is an
  aggregation of the reported-peptide set** (not a separate query). So with those three filters empty the
  peptide and protein reported-peptide sets are identical. This shared reported-peptide set + PSMs is the
  natural feed for any future common reports/graphs.
- ~~Whether common reports/graphs exist is an open product question~~ — **RESOLVED (2026-09-15):** even
  where the two views end up with similar-looking tables/charts, each renders its OWN data (peptide vs
  protein), so they are never the same display — there is no single common report/graph to build. The shared
  **data** foundation (loader + held CommonData root) is kept because it gives the fast switching; the deeper
  compute-unification it would have enabled is permanently parked (see §5/§6).
- **Do NOT merge the peptide-list renderer and the protein-table renderer into one component** — they are
  genuinely different displays; forcing them together is exactly the "problematic code" to avoid.

---

## 3. Target architecture

```
QuantCommonSPAView_Root_Component            (error boundary — unchanged)
  └─ QuantCommonSPAView_MainContent_Component   ← the "proper MainContent": PERSISTENT, never unmounts
       OWNS:
       • Shared CommonData root — the per-search CommonData_…Root built ONCE here and passed to both
         children (core data lives in the shared dataPageStateManager; the quant loaders are module-memoized
         singletons that stay in the children) — so a switch (and switch-back) needs NO server re-load
       • <title> management — the limelight_title_start_text mechanism + a flag-based setter; updates on
         switch, no reload
       • Nav toggle (client-side, no reload) — [ Quant Common Peptides ] [ Quant Common Proteins ]
       • <h1> label — by view
       • Search Details block (+ SearchSubGroup) — rendered once
       • viewMode — which child is shown
       └─ renders ONE of the two STRIPPED children (both already exist, post-rename):
            • QuantCommonSPAView_PeptideView_Component   (FilterSection + peptide list + reported-peptide compute)
            • QuantCommonSPAView_ProteinView_Component   (FilterSection + protein table + reported-peptide compute)
```

**Switching:** the parent holds `viewMode`; the nav toggle flips it; it renders the other child — no page
reload. Because the loaded data lives on the (persistent) parent, switching back reuses it (no server
load). A child **re-mounts on switch and re-computes** its reported-peptide set from the held data
(client-side, fast) — accepted for now; making even the compute instant is a later optimization.

---

## 4. Current state — done & uncommitted (nothing of the feature is committed)

> **Since this section was written, Stages 1–2 and the protein-disable toggle item (§5) have all been
> completed and review-verified — plus the `onpopstate` decision (§6). This §4 captures the groundwork that
> preceded the staged build-up; read it together with §5 for the full picture.**

Committed on the branch: only docs (the merged-plan spec, CLAUDE.md conventions). **All feature code is
uncommitted.** Done and review-verified so far (the pre–staged-build-up groundwork):

- **Phase 1** — four additive controller-path callback hooks (`centralPageStateManager.ts` optional ctor
  param; module setters on `parseURL_Into_PageStateParts.ts`, `sharePage_dataPages_Common.ts`,
  `saveView_dataPages_Common.ts`) + `quantCommonSPAView_ControllerPathHolder.ts`. Backward-compatible
  (DOM fallback when unset), but note: **the new page emits two route markers and NO single
  `controller_path` element, so on this page the DOM fallback is a hard throw — the holder callbacks are
  mandatory here.**
- **Phase 2** — two routes `d/pg/psb/quant-common-peptide/` + `d/pg/psb/quant-common-protein/`
  (`AA_PageControllerPaths_Constants.java`), one controller `QuantCommonSPAView_Controller.java` (both
  routes → one JSP), `quantCommonSPAView.jsp`, `'x'` state key (`centralPageStateManager_Keys.ts`), 2
  esbuild entries (`build.gradle`), the FE bootstrap, the `'x'` merged central-state class, Root, and the
  peptide view.
- **Phase 3a** — the protein view renders real data at its route (side-by-side identical to the existing
  quant protein page); `'x'` extended with three protein-only fields (encode letters r/s/t) +
  ProteinGrouping (`'f'`) wired; new protein-view components.
- **Project-page links** — "Quant Common Peptide" / "Quant Common Protein" links added to the runs list
  (`projPg_Quant_RunsList_Component.tsx` + `projPg_Quant_BuildRunHash.ts`), so the page is reachable.
- **Nav-placeholder + heading moved into React** — the JSP's `data_pages_nav_links_page_container` div and
  its `<h1>` were removed; the Root component now renders `<div>FAKE Nav</div>` + `<h1>Quant (Common)
  View</h1>` at the top of its wrapper (shows for both views). `FAKE Nav` is a temporary placeholder for
  the real toggle.
- **Rename (pre-refactor)** — the two view components were renamed so the `MainContent` name is free for
  the new persistent parent.

**Current files in `…/quant_pages/quant_common_spa_view_page/` (post-rename):**
`quantCommonSPAView_Root_Component.tsx`, `quantCommonSPAView_MainContent_Component`… *(NOTE: the
`MainContent` NAME IS NOW FREE — no file uses it; it is reserved for the new persistent parent to be
created in Stage 1)*, `quantCommonSPAView_PeptideView_Component.tsx`
(+ `…_PeptideView_Component_nonClass_Functions.ts`), `quantCommonSPAView_ProteinView_Component.tsx`
(+ `…_ProteinView_Component_nonClass_Functions.ts`),
`quantCommonSPAView_ProteinView__Create_ProteinList_DataTable_RootTableDataObject.tsx`,
`quantCommonSPAView_ViewMode.ts` (`export type QuantCommonSPAView_ViewMode = 'peptide' | 'protein'`),
`quantCommonSPAView_CentralStateManagerObjectClass.ts` (the `'x'` class),
`quantCommonSPAView_ControllerPathHolder.ts`, and the four bootstrap files
`quantCommonSPAViewPage_RootLaunch_LoggedInUsers.ts` / `…_PublicUser.ts` /
`quantCommonSPAViewPage_RootClass_LoggedInUsers.ts` / `quantCommonSPAViewPage_RootClass_Common.ts`.

---

## 5. The staged build-up (this is the forward plan)

Build it up incrementally; each stage is independently verifiable (side-by-side against the existing quant
peptide/protein pages AND against the current per-view output). Do NOT stuff it all into one step.

- **Stage 1 — create the persistent parent + client-side switch + shared data. ✅ DONE + review-verified.**
  Created the persistent `QuantCommonSPAView_MainContent_Component`. It OWNS: `viewMode` (instance field),
  the real client-side **nav toggle** (replaced `FAKE Nav`), the **title** management (the
  `limelight_title_start_text` mechanism + the new `quantCommonSPAView_SetDocumentTitle` fn), the **`<h1>`**,
  and the **shared `CommonData_…PerSearch_…Root`** (built ONCE here and passed to both children). It renders
  one of the two existing children (`…_PeptideView_Component` / `…_ProteinView_Component`) by `viewMode` and
  switches with no reload and no server re-load on switch-back. Root stops branching on viewMode.
  - *Why switch-back does no server load:* the quant loaders (`quant_PrototypeData_Load` /
    `flashlfq_proteinQuant_Load`) are module-memoized singletons, and the shared CommonData root is held on
    the persistent parent — so a re-mounting child re-uses already-loaded data.
  - *Toggle sequence (order-sensitive — grounded the hard way):*
    `centralPageStateManager.getURL_ForCurrentState({ pageControllerPath_Override: targetRoute })` FIRST
    (it internally re-parses the CURRENT URL via the holder and would throw if the holder were pre-pointed
    at the target), then append `location.hash`, `history.pushState`, THEN
    `holder.set_ControllerPath(targetRoute)`, flip viewMode, re-render.
  - *Verified:* instant toggle (no reload / no network document load), title + h1 per view, both lists match
    the existing quant peptide/protein pages (3152 / 493 rows), **zero** server loads on switch-back.
- **Stage 2 — consolidate Search Details. ✅ DONE + review-verified.** Moved the single (display-only)
  Search Details block (`SearchDetailsAndFilterBlock_MainPage_Root` + its
  `SearchDetailsAndOtherFiltersOuterBlock_Layout` wrapper) up to MainContent (rendered once, between the h1
  and the child) and stripped it from both children. Scope notes:
  - Only the **main-page** Search Details block moved. Each child KEEPS its FilterSection sub-group component
    (`SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component`) and its `searchSubGroup_PropValue` state.
  - The block's `propValue` differs between views ONLY by `isProteinPage` (both are `displayOnly: true`).
    MainContent builds it inline with `isProteinPage = (viewMode === 'protein')`; the block reads
    `isProteinPage` live, so it updates in place on toggle (no key/remount).
  - The block's sub-group-selection-changed callback is forwarded to the active child via a **React ref**
    (MainContent holds a ref to each child and forwards to the active child's public
    `searchSubGroup_SelectionsChanged_FromParent()`, which calls the child's existing recompute).
  - *Verified:* one Search Details block on the parent, correct order (nav → h1 → block → child), children
    stripped, sub-group recompute works via the ref-forward, single-protein overlay unaffected, zero loads
    on switch-back.
- **Protein-disable on the toggle. ✅ DONE + review-verified** (was deferred item §9.1). When not all of the
  run's searches have protein data, the "Quant Common Proteins" toggle item renders greyed + non-clickable
  with tooltip "Not enabled since not all searches have protein data". MainContent computes
  `_allSearchesHaveProteins` ONCE in its ctor from the SAME data-driven flag both children use
  (`! dataPageStateManager.get_DataPage_common_Searches_Flags().is__searchNotContainProteins_True__TrueFor_Any_Search()`)
  — deliberately NOT the generic nav's `searches_all_contain_proteins` DOM-element path (so no JSP/controller
  change). No redirect on a direct protein-route load (agreed "leave it").
- **Later, separate steps (the deeper "common" wins) — PERMANENTLY PARKED (maintainer, 2026-09-15; see §6).**
  These will NOT be built. Rationale: similar-looking per-view tables/charts each render their own (peptide
  vs protein) data, so there is no common display to justify unifying the compute or merging the renderers.
  The final shape stays: shared data loader + per-child compute + two separate FilterSections + two separate
  renderers.
  - ~~Unify the reported-peptide compute onto the parent~~ — parked.
  - ~~Merge the two FilterSections into one conditional filter block~~ — parked.
  - ~~The nav-skip optimization~~ (merged-plan spec §6.10) — parked (it depended on the compute unification).
  - ~~In-place `onpopstate`~~ — **DECIDED AGAINST (option A: keep reload-on-popstate); see §6.**

---

## 6. Decided details (maintainer)

- **Nav toggle labels:** `[ Quant Common Peptides ]` and `[ Quant Common Proteins ]`, following the
  existing data-page nav format (see §7).
- **Title mechanism (maintainer-specified):**
  - In the JSP, a scriptlet above `<title>`: set a variable `limelightTitleStartText = "Limelight - "`.
  - `<title>` renders that variable (default title is just `"Limelight - "`; JS sets the rest).
  - Directly under `<title>`, a `<script id="limelight_title_start_text" type="text/text">` holding
    `limelightTitleStartText`, so the FE can read the start text.
  - A **new common FE function** that accepts a `'peptide' | 'protein'` flag, reads
    `#limelight_title_start_text`, and sets `document.title = startText + suffix`. Called on load with the
    route-derived viewMode, and on the client-side toggle. Put it in the `quant_common_spa_view_page/` dir
    for now (peptide/protein-specific); it can be generalized later. (There is currently **no** existing
    `document.title` setter in the codebase — this is new.)
  - Title text per view: `"Limelight - Quant Common Peptides"` / `"Limelight - Quant Common Proteins"`.
- **`<h1>` per view:** `"Quant (Common) Peptides"` / `"Quant (Common) Proteins"`.
- **Toggle is client-side, no reload** (reload-nav was explicitly rejected). Child re-mount on switch
  (re-compute from held data, no server reload) is accepted for now.
- **Component naming:** the persistent parent is `QuantCommonSPAView_MainContent_Component`; the two view
  bodies are `QuantCommonSPAView_PeptideView_Component` / `QuantCommonSPAView_ProteinView_Component`.
- **`onpopstate` = reload (option A) — DECIDED.** Back/forward reloads the page (which faithfully re-seeds
  the view from the route + the filters from the URL → correct data for whatever URL Back/Forward lands on).
  This matches the single-protein `pushState` + reload-on-popstate pattern used elsewhere. An in-place
  onpopstate handler was considered and DECLINED — there is **no in-place-popstate precedent anywhere in the
  codebase** (every data page reloads on popstate), so it would be net-new and correctness-sensitive (it
  would have to re-apply both view AND all filters from the popped URL without the load-time constructor
  sequence). The bootstrap's `onpopstate` comment was updated to record this as the deliberate final behavior.
- **Single-protein overlay from both views:** confirmed working from BOTH the peptide and protein views — no
  change needed (was deferred item §9.6).
- **Filters are KEPT SHARED between the two views; deeper filter integration is PERMANENTLY PARKED**
  (maintainer, 2026-09-15). The design SHARES filters via one merged `'x'` central-state + shared
  filter-state objects: the *shared* filters (mods, reporter ions, charge, scan-file, RT, PSM counts) carry
  across a toggle; the *view-specific* filters (peptide-only: peptideUnique / peptideSequence /
  proteinPositionFilter; protein-only: the protein-list ones) persist in the shared object but apply only in
  their own view. **This shared-filter behavior is the FINAL, accepted design.** The separate-per-view-filters
  fallback (own central-state + own filter-state objects per view — no carry-over, longer URL) was considered
  and **not pursued**. Unifying the reported-peptide compute / merging the two FilterSections / the nav-skip
  optimization are likewise permanently parked (see §5): similar-looking per-view tables/charts each render
  their own data, so there is no common display to motivate them.

---

## 7. Load-bearing technical grounding

> **This section is the PRE-build grounding used to plan Stages 1–3. Where it differs from what was actually
> built, §5 (per-stage as-built) and §6 (decisions) are authoritative. In particular: the Search Details
> block and the shared CommonData root have since moved to the parent (Stages 1–2), protein-disable is done
> via a data-driven flag (§5), and the toggle sequence below is stated in its corrected as-built order.**

**The two children ORIGINALLY (pre-Stage-1/2; both large):** each imported and rendered its
own `SearchDetailsAndFilterBlock_MainPage_Root` (Search Details / cutoffs) + a `SearchSubGroup` block, and
each did its own data-loader construction (the `CommonData_…ROOT` roots) plus its own quant load
(`quant_PrototypeData_Load` in peptide, `flashlfq_proteinQuant_Load` in protein). Stages 1–2 moved the
Search Details block and the shared CommonData root up to the parent; the FilterSection and the quant loads
stayed in the children. Genuinely view-specific:
the `FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component` contents, the list/table (peptide
`QuantSharedPeptideProtein_GeneratedReportedPeptideListSection_Component` vs protein `DataTable_TableRoot`
built from `quantCommonSPAView_ProteinView_renderToPageProteinList__Create_DataTable_RootTableDataObject`),
and the reported-peptide compute. **Note:** `SearchDetailsAndFilterBlock_MainPage_Root` (the search-details
block) and `FilterSection_DataPage_ShowHide_…` (the collapsible filters) are separate imports — Search
Details can move to the parent while the FilterSection stays in the children.

**Nav format to mimic** (`data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint_Component.tsx`):
wrapper `<div style={{ marginTop: 16 }}>` → a `<span>` of items; each item is `[ label ]` with a trailing
space; the **current** view is greyed (`className="gray-text"`, tooltip "Current page"); the **other** view
is a `fake-link` (`className="fake-link"`, tooltip about ctrl/cmd-click). Its click handler navigates by
carrying `window.location.hash` onto the target URL. The existing nav also has a protein-disable pattern
(`isProteinPage_WhenNotAllContainProteins` → greyed with tooltip "Not enabled since not all searches have
protein data"); the QuantCommonSPAView toggle now does the same **visually** but sources the boolean from
the data-driven flag (`…is__searchNotContainProteins_True__TrueFor_Any_Search()`), NOT the generic nav's
`searches_all_contain_proteins` DOM element (see the §5 protein-disable item). **For our toggle the click is
client-side (flip viewMode), not a navigate** — but match the visual `[ label ]` / gray-vs-link format and
the `marginTop:16` wrapper.

**Client-side toggle → pushState (AS-BUILT, order-sensitive):** `const url =
centralPageStateManager.getURL_ForCurrentState({ pageControllerPath_Override: targetRoute })` FIRST — it
returns the URL string built with the target route, while its INTERNAL re-parse of the current URL still
uses the (unchanged) holder → **append the current `location.hash`** (the `#qr;` run hash — load-bearing) →
`history.pushState(null, null, url)` → THEN `holder.set_ControllerPath(targetRoute)` (so subsequent
controller-path reads match the new window path) → flip viewMode → re-render. Filter changes keep going
through `centralPageStateManager.setState` → `_updateURL` → `replaceState` (unchanged). **Do NOT set the
holder to the target BEFORE calling `getURL_ForCurrentState`:** it internally re-parses the CURRENT URL via
the holder and would throw "Page controller path not found in window path" (the original planned order had
this bug; corrected during Stage 1).

**Bootstrap** (`quantCommonSPAViewPage_RootClass_Common.ts`): in the constructor, before constructing
`CentralPageStateManager`, it creates the `ControllerPathHolder`, seeds it from the URL
(`_seed_ControllerPathHolder_FromURL_ReturnViewMode` — reads both route markers, matches
`window.location`, returns the viewMode), wires the three module setters, and constructs
`new CentralPageStateManager(cb)`. It loads core data once (`LoadCoreData_ProjectSearchIds_Based`) and, in
the resolve, builds the propsValue and renders `Root → child`. **As built (Stage 1):** the shared CommonData
root is built on the persistent MainContent and passed to both children; the bootstrap builds BOTH children's
propsValues and passes them — plus the filter/central-state objects and the route/holder — to MainContent,
which injects the shared root into whichever child it renders. (Core data is still loaded once in the
bootstrap and held in the shared `dataPageStateManager`; the quant loaders remain module-memoized in the
children, which is why switch-back does not re-load.) Caveat carried from Phase 2: `initialize()` also calls
`page_Update_From_search_data_lookup_parameters_lookup_code__computed()` and
`page_UserDefault_processing()`, both of which read the controller path via the DOM helper directly — but
both **early-exit** before that read on the normal load path, so they are harmless here (documented in-code).

**`'x'` central-state** (`quantCommonSPAView_CentralStateManagerObjectClass.ts`): `getUniqueId()` → `'x'`;
`getDataForEncoding()` encodes the union of peptide fields (encode letters a…q) + the three protein-only
fields (r/s/t); all 20 encode letters are unique; `groupProteins_OLD_V1` is dropped (grouping is the
separate `'f'` object). `viewMode` is NOT encoded here — the view lives in the route.

---

## 8. Verification approach (review session)

- **Footprint isolation:** directory-diff the live tree against the latest maintainer-created snapshot
  (the maintainer creates snapshots; use whatever they create) across `limelight_webapp/front_end/src`,
  `limelight_webapp/src/main/java`, `limelight_webapp/src/main/webapp/WEB-INF` (plus
  `front_end/build.gradle` when esbuild entries change). Confirm the footprint is exactly the task's files
  and nothing outside the intended dir.
- **Type check:** run an independent tsgo `--noEmit` in `limelight_webapp/front_end` (the review session
  has a standalone tsgo install path for this).
- **Behavior:** the build session drives CDP; the review session confirms the observations are consistent
  and, for parity tasks, that the new view matches the existing quant peptide/protein pages cell-for-cell.
- Renames show as old-file-deleted + new-file-added in the directory-diff; verify old symbol tokens are
  gone and the content delta is only the rename.

**Local test data:** use a local project with READY quant runs (sign in with local dev credentials). Useful
run shapes: a **multiple-search** run (parity + switch tests); a **single search that has sub-groups** (the
sub-group recompute path); and a run where **at least one search lacks protein data** (the protein-disable
path). The two project-page "Quant Common …" links open the page; a seeded `#quantRuns=` project URL plus the
persisted CDP drivers populate the runs list. (The build session's CDP drivers + a state handoff live under
the repo's gitignored `.claude/session_handoffs/`; the concrete local project id / lookup codes / run hashes
are kept off-repo in the review session's notes.)

---

## 9. Deferred / open items (do not lose)

1. **Protein-disable when a search lacks protein data. ✅ DONE** (2026-09-14; see §5). Greys the "Quant
   Common Proteins" toggle option using the data-driven flag (NOT the generic nav's DOM-element path).
2. ~~Unify the reported-peptide compute onto the persistent parent~~ — **PERMANENTLY PARKED (2026-09-15; see §6).**
3. ~~Merge the two FilterSections into one conditional filter block~~ — **PERMANENTLY PARKED (see §6).**
4. ~~The nav-skip optimization (merged-plan spec §6.10)~~ — **PERMANENTLY PARKED (it depended on #2).**
5. ~~In-place `onpopstate`~~ — **DECIDED AGAINST (option A: keep reload-on-popstate); see §6.**
6. ~~Launch the single-protein overlay (key `'v'`) from both views~~ — **✅ CONFIRMED WORKING** from both
   views; no change needed (see §6).
7. ~~Whether any common reports/graphs actually exist~~ — **RESOLVED (2026-09-15):** none to build as a
   *common* display — similar-looking per-view tables/charts each render their own (peptide vs protein) data
   (see §2 / §6). The shared data foundation is kept for the fast switching.
