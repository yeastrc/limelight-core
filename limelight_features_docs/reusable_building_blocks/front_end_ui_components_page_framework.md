# Reusable building blocks — Front-end UI components and page framework

Part of the reusable-building-blocks inventory; start at [README.md](README.md) (keyword index, quick picks, duplicates).
Counts and user lists are as of 2026-11-09 and approximate; grep before relying on them.

How a Limelight browser page is built and what UI pieces to reuse. Page framework: per-role webpack/esbuild bundles chosen
by the JSP, the `RootLaunch -> RootClass_LoggedInUsers -> RootClass_Common` data-page bootstrap, the project-page root with
role-gated sections, page state kept compressed in the URL (`CentralPageStateManager` + per-page and per-filter state
objects), save view / share page / default view. UI building blocks: the home-grown modal overlay family, tooltips,
spinners, error boxes, the generic `DataTable` (+ shared child tables), the "Filter On" components and the single front-end
filter engine, the search details block, search tags, search selection, project-page sections, upload UI, drag-reorder,
collapsible headers, colors and styling, and recurring React patterns (instance fields + forced re-render, new-object-reference
signals, stale-async tokens). Charts / Plotly / Mol* / chromatograms are [charts_visualization.md](charts_visualization.md) and only cross-referenced.


Path abbreviations used below (all repo-relative):
- `FE/` = `limelight_webapp/front_end/src/js/page_js/`
- `CAP/` = `FE/common_all_pages/`
- `DP/` = `FE/data_pages/`
- `CF/` = `DP/common_filtering_code_filtering_components__except_mod_main_page/` (despite the name, most of it IS used by the Mod page)
- `PSB/` = `DP/project_search_ids_driven_pages/`
- `PP/` = `DP/other_data_pages/project_page/`
- `STY/` = `limelight_webapp/front_end/src/styles/`
- `JSP/` = `limelight_webapp/src/main/webapp/WEB-INF/jsp/`

## Quick picks

| If you need... | Use this | Entry |
|---|---|---|
| A new projectSearchId-driven data page | Copy the peptide page 3-file set (`RootLaunch_*` / `RootClass_LoggedInUsers` / `RootClass_Common`) + two bundles + JSP `<c:choose>` | Data page bootstrap |
| A new non-data page (admin, user, list) | Copy `projectsListPage.ts` or an admin `*_Root.ts`; add to the entry list in `limelight_webapp/front_end/build.gradle` | Stand-alone page root + entry points |
| A new project-page section | Render it in `ProjectPage_ROOT_Container_Containing_MultipleSections_Component`; role-only parts via `*_SpecificComponentsForRoot_Component.tsx` | Project page bootstrap |
| Keep a user choice in the URL (bookmarkable) | A `*_UserSelections_StateObject` wired into the page's `*_CentralStateManagerObjectClass` (new single-letter key) | UserSelections StateObject pattern; Per-page CentralStateManagerObjectClass |
| Link to another data page with preset state | `CentralPageStateManager.getURL_ForCurrentState` / `get_CurrentState_AsStringForUrl({ componentOverridesAdditions })` + `newURL_Build_PerProjectSearchIds_Or_ExperimentId` | Open another data page with preset state |
| Open a modal dialog | `limelight_add_ReactComponent_JSX_Element_To_DocumentBody` + `ModalOverlay_Limelight_Component_v001_B_FlexBox`, opened by an `open_..._Overlay()` function | Mount a React element on body; Modal overlay components |
| A small edit popup next to the clicked element | Copy a `modal-dialog-small-positioned-near-related-content-*` open function (e.g. change project title) | Small positioned edit-in-place popup |
| A tooltip / help "?" icon | `Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component`; `Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component` | Tooltips |
| A loading indicator | `<Spinner_Limelight_Component/>`; whole page: `open_Limelight_CoverWith_Spinner_On_StandardBackground_HigherZIndex()` | Spinners |
| A sortable / paged / downloadable table | `DataTable_TableRoot` + the object model in `dataTable_React_DataObjects.ts` | DataTable |
| Expandable rows showing PSMs | `psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent` (PSM List block) | PSM List block |
| Apply all user filters to get reported peptide / PSM ids | `GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class` (one per page, `{ data, promise }`) | Main filtering engine |
| A new "Filter On" filter | Copy the PSM charge trio (StateObject + Container + Component) and follow the add-a-filter checklist | Filter component; UserSelections StateObject pattern |
| The top-of-page search details / cutoffs block | `SearchDetailsAndFilterBlock_MainPage_Root` inside `SearchDetailsAndOtherFiltersOuterBlock_Layout` | Search Details and Filter block |
| Let the user pick searches | `SearchSelection_DisplayedNestedInFolders_Component` inside a modal | Search selection (folders) |
| Show / pick search tags | `Search_Tags_DisplaySearchTags_UnderSearchName_Component`; `Search_Tags_SelectSearchTags_Component`; grouped builder | Search tags entries |
| Colors per search / sub-search / category | `Limelight_Colors_For_MultipleSearches` / `..._For_SingleSearch__SubSearches` (`DP/color_manager/`) | Search color palettes |
| A brand color in TypeScript | `limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants.ts`; in CSS use `STY/a-common-scss-variables.scss` + utility classes | Brand colors, SCSS and shared CSS classes |
| Drag-to-reorder a list | `@adaptabletools/react-beautiful-dnd`, copy the organize-searches re-order overlay | Drag-and-drop reorder |
| Save a client-built file (TSV, SVG) | `StringDownloadUtils.downloadStringAsFile` | Download a string as a file |
| Ignore stale async results after newer user input | QC "track latest updates" token + registry, or a local current-key check | Stale-async guards |
| Logged-in-only / owner-only UI code kept out of public bundles | `DataPages_LoggedInUser_CommonObjectsFactory` (data pages), `ProjectPage_SearchesAdmin` / owner factory (project page) | Logged-in-only code injection; Role-gated action objects |
| Large browser file upload | `ProjectPage_UploadData_SendUploadFileToServer` (chunked, SHA-256 per chunk, retries) | Chunked browser file upload |

---

## Page bootstrap and page framework

### Data page bootstrap: RootLaunch (LoggedIn / Public) -> RootClass_LoggedInUsers -> RootClass_Common
- What it solves: The standard start-up of a data page: a bundle per user type runs on `$(document).ready`; the logged-in
  variant builds `DataPages_LoggedInUser_CommonObjectsFactory` (save view, set default view, rename search, tag management,
  ...); the shared `*_RootClass_Common` sets up global error reporting, `window.onpopstate` reload, user-default URL
  processing, reads the search-data-lookup params, creates `CentralPageStateManager` and every page/filter state object
  (seeded from the URL), loads core data, mounts one React root and removes the "Loading..." div.
- Search keywords: page entry point, root launch, root class, page bootstrap, page init, RootLaunch, bundle per user type,
  public user page, logged in user page, initialize, onpopstate, render root, webpack entry, esbuild entry
- Location: reference `PSB/peptide_page/peptideViewPage_RootLaunch_LoggedInUsers.ts`, `..._RootLaunch_PublicUser.ts`,
  `peptideViewPage_RootClass_LoggedInUsers.ts`, `peptideViewPage_RootClass_Common.ts` (`initialize()`). Same shape:
  `PSB/protein_page/protein_page_root/*`, `PSB/mod_view_page/modViewPage_Root*.ts`, `PSB/qc_page/qc_page_root/*`,
  `PSB/scan_file_to_searches_page/main_page_code/*`, `DP/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root/*`,
  `DP/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root/*`, experiment pages
  `DP/experiment_driven_data_pages/{protein_exp__page,peptide_exp__page,mod_exp__page}/*_root/js/` (with
  `DP/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory.ts`). Bundle choice in page JSPs,
  e.g. `JSP/data_pages/project_search_ids_driven_pages/peptideView.jsp`.
- Used by: every data page (10 files construct `new DataPages_LoggedInUser_CommonObjectsFactory()`: 7 data-page `*_RootClass_LoggedInUsers` + 3 project-page role roots; the experiment twin is constructed in 3 more).
- How to use / extend: Copy the peptide set for a projectSearchId page with filters + search details; copy the scan-file
  browser set (about 360 lines total) for a small single-entity page; copy `proteinExperimentPage_RootClass_Common.ts` for an
  experiment page. Order in `initialize()` matters (peptide page): `limelight__catchAndReportGlobalOnError.init()`,
  `page_Update_From_search_data_lookup_parameters_lookup_code__computed()`, `Page_UserDefault_processing`, state-manager
  `initialize()` calls, seed each state object from encoded data, `navigation_dataPages_Maint_Instance.initializePageOnLoad`,
  `centralPageStateManager._updateURL()`, `LoadCoreData_ProjectSearchIds_Based.loadCoreDataFor_ProjectSearchIds()`, render.
  Add two bundle entries and the JSP `<c:choose>` (see next entry).
- Do not use when: the content is a section/overlay of an existing page; the project page (own root, below).
- Limits and gotchas: `RootClass_Common` takes the factory as an optional `?` param (absent for public users). Peptide and
  protein `*_RootClass_Common.ts` are near-copies (about 560 lines each) — a new filter means editing every page root. File headers
  are copy-paste stale (e.g. class name `ProteinViewPage_RootClass_LoggedInUsers` in the scan browser file). Scan browser
  `RootClass_Common` sets the "loaded from another page" flag unconditionally (empty `if`; observed in code, effect not tested).
  The experiment factory only returns the Save View getter; the mod experiment page is a stub (its JSP says so).
- Related / duplicates: project page bootstrap; stand-alone page roots; central page state manager.
- Status: verified (re-checked)

### Access-level-based bundle selection in the page JSP
- What it solves: Each page loads only the code its viewer may use: `*_RootLaunch_LoggedInUsers-bundle.js` vs
  `*_RootLaunch_PublicUser-bundle.js` (project page: one of five role bundles); the header loads the logged-in header bundle
  only when a user is signed in.
- Search keywords: public user bundle, logged in bundle, code splitting by role, which JS loads, c:choose, bundle selection
- Location: page JSPs (e.g. `JSP/data_pages/project_search_ids_driven_pages/peptideView.jsp`,
  `JSP/data_pages/other_data_pages/project_view_page/projectView.jsp`),
  `JSP/jsp_includes_body_start_body_end/body_before_main_script_include__script_include_libs__page_header_js.jsp`; entry lists in
  `limelight_webapp/front_end/build.gradle`.
- Used by: data page JSPs (peptide, protein, mod, QC, experiment, scan-file pages) and the project page.
- How to use / extend: add two entries for a new page and the same `<c:choose>` in its JSP.
- Do not use when: as access control — it only limits code shipped; server checks still apply ([security_access_control_sessions.md](security_access_control_sessions.md)).
- Limits and gotchas: the access-level object is set by the data-page interceptor ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Related / duplicates: logged-in-only factories (below).
- Status: verified (peptide JSP read; other pages by grep of bundle names)

### Logged-in-only code injection on data pages (`DataPages_LoggedInUser_CommonObjectsFactory`)
- What it solves: Keeps logged-in-only functions (save view, set default view, search name change, tag management, sub-group
  name management, comment / web link / file-name edit overlays) out of the public bundle: the `*_RootClass_LoggedInUsers`
  creates the factory and passes it to `*_RootClass_Common`; public entries pass none.
- Search keywords: logged in user, public user, read-only user, factory, admin functions on data page, edit search name, code split
- Location: `DP/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory.ts`; experiment twin
  `DP/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory.ts`.
- Used by: about 50 files (all page root classes and search details block components).
- How to use / extend: add a `getFunction_X()` returning the logged-in-only function; callers test for the factory being present
  and never import the logged-in module directly.
- Do not use when: you need access enforcement — UI only; the server must still check.
- Limits and gotchas: several method doc comments are copy-paste. Whether separate bundles strictly exclude the logged-in code was
  not confirmed by bundle inspection (unverified).
- Related / duplicates: project page `ProjectPage_SearchesAdmin` / owner factory (same idea, parallel mechanism).
- Status: verified (bundle exclusion unverified) (re-checked)

### Stand-alone page root + esbuild entry points (admin, user account, header, project list, organize searches)
- What it solves: Pattern for a non-data page: a `*_Root.ts` that calls `limelight__catchAndReportGlobalOnError.init()` and starts the
  page (React-only pages: `createRoot(...)` on a known container id inside try/catch + `reportWebErrorToServer`), listed in an entry
  group in `limelight_webapp/front_end/build.gradle` (header, user pages, admin pages, data pages).
- Search keywords: new page, entry point, page root, bundle, esbuild, admin page, project list page, top-level page
- Location: `DP/other_data_pages/project_list_page/projectsListPage.ts` (smallest React-only template),
  `FE/webapp_admin_pages/webapp_manage_users_page/manageUsersForAdminPage_Root.ts`, header scripts
  `FE/header_main_pages/header_main_pages__all_users/limelight__header_main_pages__all_users_Setup.ts` and `header_main_pages__logged_in_user/*`,
  `DP/other_data_pages/project_organize_searches_page/project_OrganizeSearches_ROOT.ts`.
- Used by: 5 admin roots, 5 user roots, 2 header entries, project list, organize searches.
- How to use / extend: copy `projectsListPage.ts` or an admin root; add to the matching entry list.
- Do not use when: a data page (use the data page bootstrap).
- Limits and gotchas: `FE/main_pages/mainPagesPopulateHeader.ts` does nothing (`initialize()` only sets a flag) yet is still called;
  `FE/z_test_code/testPageComponent.ts` is fully commented out. The organize-searches root does not call
  `limelight__catchAndReportGlobalOnError.init()`, and the header bundles do not call it either (observed in source). Header project drop-down uses a raw
  `window.fetch('d/pgf/project-list-for-main-page-header-drop-down')`.
- Related / duplicates: build pipeline ([build_deploy_config.md](build_deploy_config.md)).
- Status: verified (entry lists read; project-list and organize-searches roots are esbuild entries in `build.gradle` and are loaded by `projectsList.jsp` / `project-organize-searches-view.jsp`) (re-checked)

### Project page bootstrap: one bundle per role + one React root holding many sections
- What it solves: Builds the project page so each role (public, researcher, viewer, project owner, locked variants) loads only
  allowed code, then renders the React sections (Saved Views, Experiments, Explore Search Results, Feature Detection Runs, Scan
  Files) under one root with a shared error boundary; role-specific fragments (researchers, public access / share, Upload Data for
  an unlocked owner) are injected by callback.
- Search keywords: project page entry point, page root, bundle per role, public user, project owner, researcher, viewer, locked
  project, React root, section container, projectView.jsp, SpecificComponentsForRoot, getSubComponents callback
- Location: entry files `PP/projectPage_Root_PublicUser.ts`, `..._ResearcherUser.ts`, `..._ProjectOwnerUser.ts`,
  `..._ProjectLocked_ResearcherUser.ts`, `..._ProjectLocked_ProjectOwnerUser.ts`; role fragments
  `PP/projectPage_Root_*_SpecificComponentsForRoot_Component.tsx`; shared root
  `add_Component_to_Page__ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component(...)` in
  `PP/project_page_main_page_react_based/project_page_ReactParts_ROOT_Component/projectPage_ROOT_Container_Containing_MultipleSections_Component.tsx`
  (+ `AA_README.txt`). JSP: `JSP/data_pages/other_data_pages/project_view_page/projectView.jsp`.
- Used by: `projectView.jsp` (only loader). Mapping per JSP comments: owner unlocked -> `ProjectOwnerUser`; owner locked ->
  `ProjectLocked_ProjectOwnerUser`; researcher unlocked -> `ResearcherUser` plus DOM flag
  `project_page_user_level_researcher_found__just_above_bundle`; researcher locked -> `ProjectLocked_ResearcherUser`; viewer -> the
  same researcher bundles without the flag; anyone else -> `PublicUser`.
- How to use / extend: add a section inside the root's `render()` and pass `force_Rerender_EmptyObjectReference`,
  `force_ReloadFromServer_EmptyObjectReference` and (if needed) `get_searchesSearchTagsFolders_Result_Root__Function`. Role-only
  sections go in the matching `*_SpecificComponentsForRoot_Component.tsx`; a new logged-in helper object is created in the role entry
  file (null for other roles). For public users the root first calls
  `get_CommonData_LoadedFromServerFor_Project_DoSections_HaveAnyData_Result` and hides empty sections — add a `has_*` flag there for a
  new hide-when-empty section. To tell researcher from viewer inside the shared bundle, test the DOM flag as
  `projectPage_Root_ResearcherUser.ts` does.
- Do not use when: building a non-project page.
- Limits and gotchas: the add function throws if called twice (module flag). Mounts into DOM id
  `project_page_rest_of_sections__contents_block`; sections above Saved Views (project info, researchers, share data) are still mounted
  separately. The public, researcher, locked-researcher and unlocked-owner entry files (4 of 5; not the locked-owner file) wrap the root-add call in
  an EMPTY `catch`, so a mount failure is silently swallowed (observed in source). `ProjectPage_CommonOverall.initialize()` is a no-op. A locked owner gets the researcher
  components ("View Only"). All four `.tsx` fragments declare props as `ProjectPage_SearchesSection_MainBlock_Component_Props`
  (copy-paste name). Each entry file has its own `_getProjectIdentifierFromURL()`.
- Related / duplicates: five near-identical entry files; data page bootstrap; role-gated action objects.
- Status: verified (all 11 entry files read; access-level semantics from JSP comments) (re-checked)

### Role-gated action objects on the project page (`ProjectPage_SearchesAdmin`, owner factory, saved-views interaction)
- What it solves: Keeps logged-in / owner-only code (delete, copy, rename, tag management, folder delete, cutoff overrides,
  gold-standard / feature-detection label edit + delete, Hardklor/Bullseye run/import and upload overlays, saved-view rename/delete)
  out of the public bundle. The role entry file creates the object; public entries pass `null`; components show owner UI only
  when the object is present.
- Search keywords: owner only, permission gated UI, code splitting by role, factory, admin actions, null for public user, saved view delete
- Location: `PP/project_page_main_page_react_based/js/projectPage_SearchesAdmin.ts` (`deleteSearch`, `deleteSearches`, `renameFolder`,
  `deleteFolder`, `openOverlay_ForCopySearches`, `openOverlay_Change_SearchName_SearchShortName`, tag overlays,
  `set_ProjectWide_DefaultFilter_Cutoffs_Overrides`); `PP/project_page__common/projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions.ts`;
  `PP/projectPage_SavedViews_Section_LoggedInUsersInteraction.ts` (`openChangeLabel`, `deleteSavedView_OnServer` -> `d/rws/for-page/delete-saved-view`).
- Used by: owner / researcher entry files, the searches container, `projectPage_SearchEntry_UsedInMultipleSections_Component.tsx`,
  scan-files and feature-detection-run sections (12 files), saved views main block.
- How to use / extend: add a method/getter on the object; import the owner-only module only from that object file; check
  `if ( this.props.projectPage_SearchesAdmin )` before showing a control.
- Do not use when: the action is allowed for all users.
- Limits and gotchas: bundle-size / exposure measure, not access control. Saved-view `id` typed `any`, response not validated.
- Related / duplicates: `DataPages_LoggedInUser_CommonObjectsFactory` (same idea on data pages).
- Status: verified

### Mount a React root into a JSP container element (with error boundary)
- What it solves: Attach a React component to a fixed DOM element id emitted by the JSP.
- Search keywords: createRoot, mount React, render into div, JSP container, React root, getDerivedStateFromError, error boundary
- Location: examples `PP/project_page_main_page_react_based/jsx/projectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help_Component.tsx`
  (`addToPage_INTERNAL__...`), `PP/project_page_project_section/jsx/projectPage_ProjectSection_AllUser_Root_Component.tsx`
  (`add_ProjectPage__ProjectSection_AllUser_Root_Component_ToPage`), the project page root container; for a table mounted directly
  into non-React DOM: `DP/data_table_react/DataTable_TableRoot__Container_ONLY_ON_Insert_To_DOM.tsx`.
- Used by: all project page entry files; data page roots; Lorikeet page (DataTable container).
- How to use / extend: `document.getElementById(id)` (throw if missing) -> `createRoot(el).render(...)`, wrapped in a small class
  component with `getDerivedStateFromError`.
- Do not use when: you need a popup/overlay — use `limelight_add_ReactComponent_JSX_Element_To_DocumentBody`.
- Limits and gotchas: no shared helper; 33 files call `createRoot`, 21 define an error boundary (grep counts). Error boundaries show a
  generic message; the DataTable one only logs to console (no `reportWebErrorToServer`).
- Related / duplicates: the many hand copies.
- Status: verified

### Navigation links between data pages (`navigation_dataPages_Maint_Instance`)
- What it solves: Renders the "Peptide / Protein / Mod / QC ..." links block, carrying the current search-data-lookup code to the
  target page; ctrl/cmd-click opens a new tab.
- Search keywords: page navigation, nav links, switch page, go to protein page, data page tabs
- Location: `DP/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint.ts` (`initializePageOnLoad({navigationType})`,
  DOM container `data_pages_nav_links_page_container`), `navigation_dataPages_Maint_Component.tsx`.
- Used by: 15 files (page root classes; also called from URL updaters).
- How to use / extend: call `initializePageOnLoad` once with a `Navigation_dataPages_Maint__NavigationType_Enum`.
- Do not use when: n/a.
- Limits and gotchas: `updateNavLinks()` is an empty method still called on every URL change; the component builds the URL from
  `window.location` at click time.
- Related / duplicates: none.
- Status: verified

### Page-wide "props bag" objects (QC common-data bag, Mod page state bag)
- What it solves: One object holding project search ids, data page state managers, lookup params, every filter state object and
  shared services, passed to deep children through one prop.
- Search keywords: page context, state bag, pass state, root objects, common data props bag, all state objects
- Location: `PSB/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component.tsx` (`QcViewPage_CommonData_To_AllComponents_From_MainComponent`);
  `PSB/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.ts`.
- Used by: essentially every QC section/plot/compute; almost every mod page file.
- How to use / extend: add a readonly field and populate it at the root; for QC children add fields to the bag instead of new props.
- Do not use when: copying to another page (they import many page-specific modules); other pages pass objects individually.
- Limits and gotchas: the QC bag carries a `..._Processing__NO_FILTERING` sub-object with an UNFILTERED common-data root used with the
  unfiltered PSM-table loader for target/decoy plots — do not reuse that path for display values (they must reflect the user's cutoffs; use the main-filters loaders).
- Related / duplicates: each other (two independent page-specific designs).
- Status: verified

### Project-page cross-section sharing: parent-held cache with in-flight dedupe + refresh signals
- What it solves: Several project-page sections need the same searches/tags/folders; the root loads it once and hands out either the
  data (sync) or the one in-flight Promise. Any section can tell all others "data changed, reload" or "re-render" by replacing an
  empty object reference, avoiding a full page reload.
- Search keywords: shared cache, single fetch, de-duplicate request, in-flight promise, data or promise, refresh other components,
  reload sections, force reload, force rerender, notify siblings, force_ReloadFromServer_EmptyObjectReference
- Location: root container (see Project page bootstrap): `_searchesAndFolders_From_Webservice_CalledByChildrenComponents` (result
  `{ searchesSearchTagsFolders_Result_Root, searchesSearchTagsFolders_Result_Root_Promise }`, exactly one set), callbacks
  `_update_force_ReloadFromServer_EmptyObjectReference_Callback` / `_update_force_ReRender_EmptyObjectReference_Callback`. The root
  also shares one `SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject_Class`.
  Underlying loader `getSearchesSearchTagsAndFolders_SingleProject_OrFrom_ProjectSearchIds` ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Used by: searches container (`_searchesAndFolders_GetFromFunctionPassedFromParent` has sync + async paths), scan files and FD run
  sections (7 files reference the function type); 23 files carry the force props, incl. `searchDetailsAndFilterBlock_MainPage_Root.tsx`.
- How to use / extend: accept the function as a prop; use data now if set, else `.then` the promise. When your section changes server
  data, call the reload callback; reload in `componentDidUpdate` when the reference changes. Fall back to `limelight__ReloadPage_Function()`
  when no callback is given.
- Do not use when: data is per-section only; change affects only your component.
- Limits and gotchas: both callbacks drop the cached searches/tags/folders; on promise rejection the cached promise is cleared (next
  call retries). Stale-async handling inside each child is up to the child (not checked per child). Project lock/unlock and title /
  abstract changes reload the whole page instead.
- Related / duplicates: `{ data, promise }` loader pattern ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)); module-level refresh function (next).
- Status: verified

### Module-level "mounted instance" refresh function (import status section)
- What it solves: lets unrelated code refresh a section by calling an exported function that reaches the single mounted instance
  stored in a module variable.
- Search keywords: refresh from outside, module variable, mounted component, cross-component refresh
- Location: `PP/project_page__upload_data_section/project_page__upload_data_section__main_page/projectPage_UploadData_MainPage_Main_Component.tsx`
  (`refresh_ProjectPage_UploadData_MainPage_Main_Component`) and `..._Pending_and_History_Sections_Display_Component.tsx` (`_mountedComponent`).
- Used by: scan-files list component, feature-detection-run select component.
- How to use / extend: only for a section guaranteed to have one instance per page; prefer the `force_*` signals on the project page.
- Do not use when: more than one instance may be mounted.
- Limits and gotchas: ad hoc; assumes one instance.
- Related / duplicates: project-page refresh signals.
- Status: verified

---
## Page state in the URL (central page state manager and state objects)

### Central page state manager (page state stored compressed in the URL after `/q/`)
- What it solves: Keeps per-page UI state (filters, options, table state, selections) in the browser URL so the page is
  bookmarkable/shareable and survives reload. Each stateful object registers; on every change the whole state is JSON-serialized,
  compressed and written into the address bar.
- Search keywords: page state, URL state, deep link, bookmark, state in URL, `/q/`, register component, getDataForEncoding,
  getUniqueId, encoded state, restore state on reload, hash state, CentralPageStateManager
- Location: `DP/central_page_state_manager/centralPageStateManager.ts` (`CentralPageStateManager`: `getInitialStateFromURL`, `register`,
  `unregister`, `getEncodedData`, `setState`, `getURL_ForCurrentState`, `get_CurrentState_AsStringForUrl`, `clearReferrerFlagFromURL`);
  keys in `DP/central_page_state_manager/centralPageStateManager_Keys.ts` (single-letter keys, one per state object).
- Used by: 13 files `new CentralPageStateManager` (page root classes, e.g. `peptideViewPage_RootClass_Common.ts`,
  `qcViewPage_RootClass_Common.ts`, `featureDetection_ViewPage_RootClass_Common.ts`; also
  `psm_list_view_MS_1_Scan_TableCell_ExternalComponent.tsx` to build a link for another page); about 28 files implement
  `getDataForEncoding()`; about 19 call `register`.
- How to use / extend: write a state-object class (next entries): new key in `centralPageStateManager_Keys.ts`; `getUniqueId()`
  returns it; `getDataForEncoding()` returns short property names + a version property; `register({component: this})` in the
  constructor; read back with `getEncodedData({component: this})`; call `setState({component: this})` after every change.
- Do not use when: the server must read the state (browser-only blob), or it must persist across users/sessions (save view / DB), or
  it is a per-tab convenience (sessionStorage).
- Limits and gotchas: `setState` DELETES from the state any key whose component is not registered — an unregistered object loses its
  URL data on the next change by anyone. `getEncodedData` throws if not registered. Keys are single characters: reuse silently
  collides; never renumber or reuse a retired letter or old URLs decode into the wrong field. Every change rewrites the URL via
  `limelight__ReplaceBrowserAddressBarURL_ValidateUpdated_Function` ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)); `_updateURL` throws unless the URL has one of 4 known
  controller prefixes. Versioning of encoded data is a per-class convention, not enforced.
- Related / duplicates: `DataPageStateManager` (different: in-memory core data, [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)); URL parse/build; string compression.
- Status: verified (re-checked)

### Per-page `*_CentralStateManagerObjectClass` (one registered holder of a page's encoded blobs)
- What it solves: One class per page (or page section) registers with `CentralPageStateManager` under its key and stores the opaque
  encoded blobs produced by that page's `*_UserSelections_StateObject`s and widgets, with a version property `'a'`.
- Search keywords: page state class, central state manager object class, encoded state data setter, page root state, URL key per page
- Location: `PSB/peptide_page/peptidePageRoot_CentralStateManagerObjectClass.ts`,
  `PSB/protein_page/protein_page_protein_list_common/proteinList_CentralStateManagerObjectClass.ts`, `.../proteinGrouping_CentralStateManagerObjectClass.ts`,
  `PSB/protein_page/protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass.ts`,
  `PSB/mod_view_page/modPageRoot_CentralStateManagerObjectClass.ts` + `modViewPage_DataVizOptions_VizSelections_PageStateManager.ts`,
  QC `QcPage_CentralStateManagerObjectClass` (`PSB/qc_page/qc_page_root/`), scan browser
  `DP/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root/scanFileBrowserPageRoot_CentralStateManagerObjectClass.ts`,
  feature detection `featureDetection_View_CentralStateManagerObjectClass.ts`, scan-file-to-searches
  `scanFileToSearchesPageRoot_CentralStateManagerObjectClass.ts`, experiment `proteinList_ExpPage_CentralStateManagerObjectClass` and others.
- Used by: each page's `RootClass_Common`; `SingleProtein_CentralStateManagerObjectClass` also by mod, QC, experiment single protein and
  the protein sequence widget state; scan browser pair by the PSM list MS1 link and the feature-detection singular-feature child table.
- How to use / extend: constructor gets `centralPageStateManager` and calls `register`. Implement `initialize()` (reads
  `getEncodedData`), getter/setter pairs that call `setState`, `clearAll()`, `getUniqueId()`, `getDataForEncoding()`. Add a property with
  a new single-letter key; keep the version key. Construct with `centralPageStateManager: undefined` (or `no_centralPageStateManager: true`
  on the scan browser class) to build a detached "override" instance for producing another URL.
- Do not use when: the value must not live in the URL.
- Limits and gotchas: values typed `any`. Some setters throw without a state manager, newer ones silently skip (inconsistent). Every page
  has its own copy of the same per-filter properties (mods, reporter ions, charge, RT/mz, scan file ...) — a new filter means a new
  property in EACH page's class. Mod page: key `s` carries the rounded mod mass used to preselect mods in the single-protein view; range
  selections stored "exclusive" for URL compatibility; the only enum-as-class URL encoding
  (`..._Histogram_ChartType_Enum_Class` with `pageState_EncodingNumber__PageStateEncodingOnly`) lives here. Scan browser keeps retired key
  `'d'` commented "NO LONGER USED".
- Related / duplicates: many near-identical page copies (scan-file-to-searches vs peptide page about 47 diff lines after renaming).
- Status: verified

### UserSelections StateObject pattern (one class per filter / widget / option; versioned short-key encoding)
- What it solves: Holds one filter's or widget's current user selection and serializes it to/from a compact versioned JSON blob that the
  page's central-state class stores in the URL. Covers all "Filter On" filters (charge, scan file, scan number, scan peak m/z+intensity,
  RT/m/z, decoy exclusion, peptide sequence, unique, missed cleavage, digestion, PSM count min, protein position(s), mod / reporter-ion
  masses, generated-peptide contents), protein-list options (columns shown, distinct peptide includes, filter-on counts, selected tab),
  and widget options (sequence display, bar, structure widgets).
- Search keywords: filter state, user selection, filter on, URL state, encoded state data, getEncodedStateData, set_encodedStateData,
  clearAll, valueChangedCallback, filter persistence, bookmarkable filter, widget options persistence, state object
- Location: template (smallest clean example) `CF/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject.ts`
  (`Psm_Charge_Filter_UserSelection_StateObject`); siblings under `CF/filter_on__components/filter_on__core__components__peptide__single_protein/`,
  `CF/filter_on__components/filter_on__peptide_page__components/*/js/`, `CF/filter_on__components/generated_peptide_contents__user_controls/js/`;
  protein list `PSB/protein_page/protein_page__protein_list/js/*_UserSelections_StateObject.ts`,
  `.../filter_on_counts__psm_peptide_unique_peptide/proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.ts`,
  `PSB/protein_page/protein_page_single_protein_common/singleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject.ts`; widgets
  `CF/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject.ts`,
  `.../protein_sequence_bar_widget/js/proteinSequence_Bar_Widget_StateObject.ts`, `.../protein_structure_widget/js/protein_Structure_Widget_StateObject.ts`;
  other pages: `scanFileBrowserPage_SingleScan_UserSelections_StateObject.ts`, `featureDetection_ViewPage_RootTableSelection_StateObject.ts`,
  `projectScanFileId_ScanFileToSearchesPage_UserSelections_StateObject.ts`, `QcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject`.
- Used by: page root classes that own filter state — peptide, protein, single protein, QC, scan-file-to-searches, mod, experiment pages
  (most filters on 7-8 pages; decoy exclusion not on experiment pages; protein-position-of-modification only on the mod page). Widget
  states persisted through `SingleProtein_CentralStateManagerObjectClass` (fields `proteinSequenceFormattedDisplayWidgetEncodedStateData`,
  `proteinSequence_Bar_Widget_EncodedStateData`, `protein_Structure_Widget_EncodedStateData`).
- How to use / extend: copy the charge state object. Private fields; `undefined` = default / no filter; setters call the constructor
  `valueChangedCallback`; `clearAll()`; `getEncodedStateData()` returns `undefined` at default, else short single-letter properties
  (`'a'` = version) with `_ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION`; `set_encodedStateData({encodedStateData})` throws on unknown
  version. Wiring (peptide page): root constructs it with a callback that calls `getEncodedStateData()` and stores it through the page's
  `*Root_CentralStateManagerObjectClass` setter, then restores from its getter. ADD-A-FILTER CHECKLIST: new StateObject + property/key
  in EACH page's central-state class + root-class wiring + `currentFiltersDisplayBlock__X` in each `*_FiltersDisplay` + purge step (if
  data-dependent) + `Limelight_AnyFilter__HasFilterValue` (if relevant) + filtering-engine logic + every `_copy_*` single-protein helper
  + each page's "nonClass functions" component-data builder.
- Do not use when: the state is not a page filter/option (table column choices on a page have their own objects in page dirs).
- Limits and gotchas: two constructor styles — most take `{ valueChangedCallback }`; `PeptideSequence_UserSelections_StateObject`,
  `PeptideUnique_UserSelection_StateObject`, `ModificationMass_UserSelections_StateObject`, `ReporterIonMass_UserSelections_StateObject`
  and `proteinSequenceWidget_StateObject` take no callback (the page reads `getEncodedStateData()` itself); protein-list objects throw if
  no callback. All filter objects are encoding version 1; changing an encoding requires keeping old-version decode (mod state keeps legacy
  keys 'b'/'c'). Mod-mass encoding uses a base-35 delta string; sequence widget uses base-35 offsets with `Z` separator. The sequence widget
  state ALSO holds the bar widget's protein start/end selections. Encoded data typed `any`.
- Related / duplicates: self-registering variant (next); two constructor styles.
- Status: verified (charge object + wiring read in full; others checked by script + headers) (re-checked)

### Self-registering central-state object class (MainPage vs SingleProtein instances)
- What it solves: A selection that registers itself directly with `CentralPageStateManager` (own URL key) instead of going through a
  page root class, and can also be created detached for the single-protein overlay (separate, non-URL state).
- Search keywords: central state manager object class, register component, getNewInstance_MainPage, getNewInstance_SingleProtein,
  open mod mass 0 unmodified, selected conditions, condition group order, sub group selection
- Location: `CF/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.ts`;
  `DP/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass.ts`;
  `DP/experiment_data_pages_common/experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.ts` (key 'g'),
  `DP/experiment_data_pages_common/experiment_ConditionGroups_Order_CentralStateManagerObjectClass.ts` (key 'r').
- Used by: peptide, protein, QC, mod page roots; filtering engine; all `*_FiltersDisplay.tsx`; experiment page roots and components;
  sub-group state class in 20 files.
- How to use / extend: `getNewInstance_MainPage({centralPageStateManager})` then `initialize_MainPageInstance()` before use;
  `getNewInstance_SingleProtein()` + `initialize_SingleProteinInstance({encodedStateData})` for overlay copies.
- Do not use when: a plain per-filter StateObject wired through the page root fits (dominant pattern).
- Limits and gotchas: main-page instance must be initialized (`_initializeCalled` flag). Sub-group state stores `undefined` for "all
  selected" plus a flag for "none" — always read via `searchSubGroup_Get_Selected_SearchSubGroupIds`. Experiment selections class assumes
  it is the only writer of the state object it holds.
- Related / duplicates: StateObject pattern (two parallel ways to persist a filter in the URL).
- Status: verified

### Data-page URL layout: parse / build (`ParseURL_Into_PageStateParts`, `newURL_Build_PerProjectSearchIds_Or_ExperimentId`)
- What it solves: The one place that knows the data-page URL grammar: `<controller>/<searchDataLookupParametersCode>/q/<pageState>/r`,
  experiment form `<controller>/e/<experimentId>/c/<code>/q/<state>/r`, plus feature-detection and project-scan-file id forms; `/r` =
  "referrer" (navigated from another page).
- Search keywords: URL format, page URL, parse URL, build URL, referrer flag, lookup code in URL, experiment id URL, path separator
- Location: `DP/data_pages_common/parseURL_Into_PageStateParts.ts`, `DP/data_pages_common/newURL_Build_PerProjectSearchIds_Or_ExperimentId.ts`,
  constants `DP/data_pages_common/a_dataPagesCommonConstants.ts`.
- Used by: parse in 14 files, build in 9 (e.g. `searchDetailsAndFilterBlock_ChangeSearches.ts`, `featureDetection_ViewPage__MainPage_Component.tsx`).
- How to use / extend: never hand-assemble a data-page URL; parse current parts, replace one, rebuild.
- Do not use when: non-data pages (project page has its own URL helpers).
- Limits and gotchas: parsing reads `window.location` each call; throws `ParseURL_Into_PageStateParts__FailToParse__StillHas__go__InUrl_Exception_Class`
  for the `go` form. `page_Update_From_search_data_lookup_parameters_lookup_code__computed.ts` hand-concatenates instead of using the builder.
- Related / duplicates: central page state manager.
- Status: verified (header comments + exports; parse branches skimmed)

### URL-safe string compression (`StringCompressDecompress`, lz-string)
- What it solves: Compress the state JSON into a URL-path-safe string and back.
- Search keywords: compress, decompress, lz-string, LZString, URL-safe encoding, shorten URL, compressToEncodedURIComponent
- Location: `DP/data_pages_common/compressDecompressString.ts`, wraps vendored `limelight_webapp/front_end/src/js/libs/lz-string/lz-string.js`.
- Used by: only `centralPageStateManager.ts`.
- How to use / extend: JS-only round trips; keep the `EncodedURIComponent` variant.
- Do not use when: Java must read/write the value — per `limelight_features_docs/compressing_strings_stored_in_the_url.md` use deflate-raw + Base64URL.
- Limits and gotchas: `decompress` returns null on garbage.
- Related / duplicates: HTTP header Base64 helper ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) / [storage_files_external_services.md](storage_files_external_services.md)).
- Status: verified

### Open another data page (or new window) with preset state (`componentOverridesAdditions`)
- What it solves: Build a URL to a different page (or the same page in a new window) with selections already set — e.g. "show the MS1
  scan for this PSM", "open single protein in new window", "show this feature's scan".
- Search keywords: deep link, open page in new tab with state, preset page state, cross-page navigation, MS1 scan link,
  componentOverridesAdditions, open in new window
- Location: reference `DP/data_table_react_common_child_table_components/psm_list_etc_block__.../psm_list/psm_list_view_spectrum_cell_ExternalComponent/jsx/psm_list_view_MS_1_Scan_TableCell_ExternalComponent.tsx`
  (+ `../js/psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject.ts`), `featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects.tsx`,
  peptide page single-protein "new window" path. Steps: detached state object (`valueChangedCallback: undefined`) -> `getEncodedStateData()`
  -> detached central-state class -> `CentralPageStateManager.get_CurrentState_AsStringForUrl` / `getURL_ForCurrentState({ componentOverridesAdditions: [...] })`
  -> `newURL_Build_...` -> `window.open(url, "_blank", "noopener")` directly in the click handler.
- Used by: `componentOverridesAdditions` appears in 10 files (save view / share / cross-page links).
- How to use / extend: mirror the MS1 cell; the PSM path computes m/z with the existing `PeptideMassCalculator` (no new mass code).
- Do not use when: navigating within the same page.
- Limits and gotchas: target page must accept and clear the referrer flag (`/r`); MS1 helper loads scan data for the whole file.
- Related / duplicates: URL parse/build; central page state manager.
- Status: verified (re-checked)

### Copy page filter state into the single-protein state (`_copy_*` helpers) — duplicated per page
- What it solves: Before opening the single-protein view (overlay or new window), copies the host page's filter selections into
  `SingleProtein_CentralStateManagerObjectClass` so the protein view starts with the same filters.
- Search keywords: copy filters to single protein, carry filters, propagate state, open protein with same filters
- Location: module-private functions at the bottom of `PSB/peptide_page/peptidePage_Display_MainContent_Component.tsx`,
  `PSB/protein_page/protein_page__protein_list/jsx/proteinViewPage_DisplayData_ProteinList__Main_Component.tsx`,
  `PSB/mod_view_page/modViewPage_Display_MainContent_Component.tsx`, and both experiment MainContent components.
- Used by: those 5 files only (not exported).
- How to use / extend: when a new filter is supported by the single-protein view, add it to EVERY copy (or extract a shared helper).
- Do not use when: n/a.
- Limits and gotchas: 5 copies, not identical (peptide vs mod about 4 lines; protein list copies a different set; peptide page notes
  `proteinPositionFilter` "NOT Copied Yet").
- Related / duplicates: single-protein overlay controller.
- Status: verified (peptide / protein-list / mod diffed; experiment copies not diffed)

## Save view, share page, default view

### Save view / Share page (short URL) / Set default view / apply user default at load
- What it solves: logged-in "Save View" (label + current URL stored server-side), "Share Page" (server-created short URL, all users),
  "Set Default View" (per project search / experiment default URL), and redirecting to the user's saved default at page load.
- Search keywords: saved view, bookmark view, share link, short URL, URL shortener, default view, default page, user default URL
- Location: `DP/data_pages_common/saveView_dataPages_Common.ts` (POST `d/rws/for-page/psb/insert-saved-view`),
  `sharePage_dataPages_Common.ts` (`d/rws/for-page/psb/insert-shared-page`, returns `shortenedUrl`),
  `setDefaultView_dataPages_Common.ts` (`d/rws/for-page/psb/save-default-view-project-search-based-page`),
  `page_UserDefault_processing.ts` (`Page_UserDefault_processing`, DOM `page_user_default_url`, redirects); React:
  `DP/saveView_React/` (`get_SaveView_Component`, `getSaveView_Overlay_Component`), `DP/sharePage_React/`
  (`getSharePage_MainPage_Component`, `getSharePage_Overlay_Component`), `DP/setDefaultView_React/` (`setDefaultView_Create_Component_React`).
  Project page lists saved views: `PP/project_page_main_page_react_based/jsx/projectPage_SavedViewsSection_*`.
- Used by: share component on about 9 page main components; save view / set default via `DataPages_LoggedInUser_CommonObjectsFactory` in 5-6
  page main components; `Page_UserDefault_processing` in 8 page root classes.
- How to use / extend: get the component factory from the logged-in factory (null for public users) and render it; the common code reads
  the current URL itself.
- Do not use when: non-data pages.
- Limits and gotchas: save / default only for logged-in users. The saved-views row renders a server-stored URL through
  `sanitizeURL_ForHrefOrNavigation__SameOriginSafeUrlOrNull` ([security_access_control_sessions.md](security_access_control_sessions.md)) — reference for rendering stored URLs.
- Related / duplicates: server side ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) / [data_access.md](data_access.md)).
- Status: verified (code paths and URLs; overlay UI skimmed)

---
## Overlays, popups, tooltips, spinners, error display

### Mount a React element in a new div on `<body>` (`limelight_add_ReactComponent_JSX_Element_To_DocumentBody`)
- What it solves: The house way to open any overlay/dialog/popup: create a `<div>` on `<body>`, `createRoot().render(element)`, return a
  holder whose `removeContents_AndContainer_FromDOM()` hides immediately and unmounts later (idle callback / 1 s timeout).
- Search keywords: open overlay, dialog, popup, portal, mount React, modal, add to body, remove overlay, close dialog
- Location: `CAP/limelight_add_ReactComponent_JSX_Element_To_DocumentBody.ts`; returns
  `Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF` (a class despite `_IF`).
- Used by: about 149 files (color picker, spinner cover, most `*_Overlay*.tsx` in data and admin pages).
- How to use / extend: build the overlay element, pass it as `componentToAdd`, keep the holder, call `removeContents_AndContainer_FromDOM()` on close.
- Do not use when: content belongs inside the existing React tree (render inline); mounting a page root into a JSP container.
- Limits and gotchas: removal is deferred (div hidden right away). React `createPortal` is not used anywhere.
- Related / duplicates: modal overlay components; small positioned popup.
- Status: verified (re-checked)

### Modal overlay components (with / without title bar) and the `open_..._Overlay()` function pattern
- What it solves: Limelight's own (no library) modal dialog: gray page background, sized between min/max width/height, title bar with
  close X, optional close on background click, switches between absolute and fixed positioning on window resize. Overlays are opened
  by a colocated `open_..._Overlay(params)` function that builds the component, mounts it on body, and closes it with the holder.
- Search keywords: modal, overlay, dialog, popup, lightbox, title bar, close X, open overlay function, confirm dialog, warning before download
- Location: `CAP/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox.tsx`
  (`ModalOverlay_Limelight_Component_v001_B_FlexBox`; props `widthMinimum/Maximum`, `heightMinimum/Maximum`, `title` or
  `title_Component_Callback`, `close_OnBackgroundClick`, `callbackOnClicked_Close`, `set_CSS_Position_Fixed?`, `titleBar_LeaveSpaceFor_CloseX?`);
  `CAP/modal_overlay_react/modal_overlay_no_titlebar_React_V001/modal_overlay_no_titlebar_React_V001.tsx` (`ModalOverlay_No_Titlebar_Limelight_Component_v001`).
  Small clean templates of the open-function pattern:
  `CF/filter_on__components/filter_on__protein_page__components/protein_structure_widget/jsx/chimeraXExport_AuthCollision_Overlay.tsx`
  ("confirm before download": the download starts only on click so the browser dialog does not hide the overlay),
  `DP/experiment_data_pages_common/experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component_WithOpenFunction.tsx`,
  `PSB/mod_view_page/mod_page__jsx/modPage_ZScore_SearchSelection_Overlay.tsx`.
- Used by: title-bar version about 123 files (e.g. `PP/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay.tsx`,
  admin pipeline page, scan-peak filter input overlay, change-cutoffs overlay); no-title version by the "update in progress" overlays of
  Change Searches / Re-order Searches.
- How to use / extend: write `open_X_Overlay(params)` next to the component; render inside the add-to-body helper; keep close + apply
  callbacks. Prefer applying changes when the overlay closes rather than live — batch expensive per-change work until close.
- Do not use when: a small near-content popup (use the small positioned popup) or a tooltip.
- Limits and gotchas: `set_CSS_Position_Fixed` disables browser scrolling to off-screen parts. Overlay CSS classes
  (`modal-dialog-overlay-background/container`) live in `STY/all-pages.scss`. Components that open further overlays relying on page CSS
  (e.g. the PSM List block) must not be placed inside an overlay.
- Related / duplicates: add-to-body helper; three overlay wrappers around the folder search selector each re-implement open/close glue.
- Status: verified (props and positioning read; render body skimmed) (re-checked)

### Small positioned edit-in-place popup (`modal-dialog-small-positioned-near-related-content-*`)
- What it solves: A small fixed-position popup near the clicked element for editing one value (title, abstract, note, label, name,
  comment, color), clamped to the window, mounted with the add-to-body helper and removed on change/cancel.
- Search keywords: inline edit, edit popup, small overlay, positioned dialog, change title, rename, edit label, popover
- Location: e.g. `PP/project_page_project_section/jsx/projectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component.tsx`
  (`..._Change_ProjectTitle_Component__openOverlay({ position_top, position_left, ... })`); CSS in `STY/all-pages.scss`.
- Used by: about 22 files: project title / abstract / notes, saved-view label, project URL label, gold-standard / feature-detection labels,
  `searchName_and_SearchShortName_Change_Component_and_WebserviceCall.tsx`, search-details comment / web-link overlays, user account
  change-* components, folder add/rename, the color picker.
- How to use / extend: copy the open function + component (clamp position, backdrop div + fixed container div with the two CSS classes).
- Do not use when: a full modal with title bar is wanted.
- Limits and gotchas: no shared component; clamp numbers (e.g. `innerHeight - 160`, left max 100) hard-coded per copy.
- Related / duplicates: about 22 hand copies; basic tag chooser popup mounts its own `createRoot` div instead of the helper.
- Status: verified (pattern + users grepped; not every copy read) (re-checked)

### Color picker small overlay
- What it solves: Pick a hex color in a small overlay near the clicked content (wraps `react-colorful` `HexColorPicker`).
- Search keywords: color picker, choose color, hex color, palette picker
- Location: `CAP/ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent/..._Component.tsx`,
  entry `colorPicker_React_DialogModal_..._Component__openOverlay({ existingColor, position_top, position_left, change_Callback, cancel_Callback })`.
- Used by: protein structure widget main component (only user).
- How to use / extend: also a template for a small overlay near content.
- Do not use when: choosing a search-tag color (fixed list `SearchTag_ColorOptions_Constants`).
- Limits and gotchas: clamps top/left to >= 10 px.
- Related / duplicates: small positioned popup.
- Status: verified (entry point read, body skimmed)

### Single-protein full-page overlay controller (`ProteinPage_Display__SingleProtein_Root`)
- What it solves: Opens a full-page "single protein" view over a data page (sequence / bar / structure tabs, filters, generated peptide
  list) with its own React root, and closes it behind a spinner cover, restoring the page and scroll position.
- Search keywords: single protein view, protein overlay, open protein, protein detail, full page overlay, overlay close callback
- Location: `PSB/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Root.ts` (`openOverlay`,
  `openOverlay_OnlyLoadingMessage`, `forceCloseOverlay`); React `jsx/proteinPage_Display__SingleProtein_Root_Component.tsx`,
  `jsx/proteinPage_Display__SingleProtein_MainContent_Component.tsx`.
- Used by: peptide page, mod page, protein list main components.
- How to use / extend: set `singleProtein_CentralStateManagerObject.setProteinSequenceVersionId`, copy page filters into it (`_copy_*`
  helpers), save `window.scrollY`, hide `#data_page_overall_enclosing_block_div`, construct the Root, `openOverlay(...)`; on close unhide
  and scroll back. Reopen on load when the URL has a protein id.
- Do not use when: experiment pages (own `proteinExperimentPage_Display_SingleProtein.ts`).
- Limits and gotchas: inserts its div before `#footer_outer_container_div` (throws if missing). Close runs in `setTimeout(10)` behind
  `open_Limelight_CoverWith_Spinner_On_StandardBackground_HigherZIndex()` and calls `clearAll()`. Resize handling commented out.
- Related / duplicates: experiment single-protein overlay.
- Status: verified

### Tooltips (MUI extension, green "?" icon, ctrl-click hint, tab with tooltip)
- What it solves: Standard styled tooltip (white, green border, Limelight font) and helpers.
- Search keywords: tooltip, hover help, help icon, question mark, info icon, MUI Tooltip, title popup, hover text
- Location: `CAP/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component.tsx`
  (`Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component` + presets `..._Common_Properties__For_FollowMousePointer()` /
  `..._For_NOT_FollowMousePointer_DefaultPosition()`); `CAP/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/`
  (`Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component`, plus a canned "search tags verbose" message component);
  `CAP/limelight__TooltipAddition_Component_ControlClick_OR_CommandClick_ToOpenInNewTab.tsx`;
  `CAP/material_ui_library__limelight_extensions_additions/Limelight_MaterialUI_Tab_WrappedWith_Tooltip.tsx`.
- Used by: main tooltip about 130 files; green "?" about 63; ctrl-click hint 7; tab wrapper in the single-protein main content.
- How to use / extend: `<..._Main_Tooltip_Component title={...} {...preset()}>child</...>`; `title={null}` disables. Add the ctrl-click hint
  to tooltips on fake-link navigation.
- Do not use when: n/a.
- Limits and gotchas: green "?" measures surrounding font size on mount then re-renders. Two files besides the main tooltip component import MUI `tooltipClasses` directly
  (styling tweaks). Prefer MUI public props over overriding internal slot classes (internal class names can change on an MUI upgrade without a build error).
- Related / duplicates: DataTable header/cell tooltips use the main tooltip; sub-search header tooltip partial.
- Status: verified (re-checked)

### Spinners and loading covers
- What it solves: "loading" indicators: React spinner, whole-page cover with spinner, and the legacy page-global spinner.
- Search keywords: spinner, loading, busy indicator, wait, progress, loading cover, block page
- Location: vendored `limelight_webapp/front_end/src/js/libs/spinner/spin.min.js`; `CAP/spinner_ReactComponent_Limelight.tsx`
  (`<Spinner_Limelight_Component/>`, spins while mounted); `CAP/limelight_CoverWith_Spinner_On_StandardBackground_HigherZIndex.tsx`
  (`open_Limelight_CoverWith_Spinner_On_StandardBackground_HigherZIndex()` returns a holder with `removeCover()`); legacy `CAP/spinner.ts`
  (`createSpinner/destroySpinner/incrementSpinner/decrementSpinner` on `div#main_spinner_block`, `create_SpinnerManagerClass_Limelight`).
- Used by: React spinner about 40 files; cover by the single-protein roots; legacy global by user login / public access code.
- How to use / extend: in React render `<Spinner_Limelight_Component/>`; for a whole-page block use the cover. Shared CSS
  `block-updating-overlay-container` exists for "updating" covers.
- Do not use when: new code must not use the global `createSpinner` (needs a specific JSP div).
- Limits and gotchas: `incrementSpinner/decrementSpinner` have no users; `SpinnerManagerClass_Limelight.createSpinner()` returns the module
  global, not its own instance (minor, return value unused).
- Related / duplicates: three spinner entry points for one job; QC chart "creating"/"updating" covers ([charts_visualization.md](charts_visualization.md)).
- Status: verified (re-checked)

### Error display UI (red error boxes, legacy inline message, global onerror banner)
- What it solves: The visible side of errors: red "Error accessing server" box (AJAX), near-identical red "Error in Page Code" box (JS
  error), legacy jQuery inline message with auto-hide, and an inline JSP `window.onerror` banner active before bundles load.
- Search keywords: error message, error box, error overlay, show error, validation message, form error, onerror banner, jQuery error
- Location: `CAP/errorDisplay_WhenHave_Javascript_Typescript_Error.ts`; AJAX box inside `CAP/handleServicesAJAXErrors.ts`
  (`showAjaxErrorMsgFromMsg`; mapping logic is [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)); `CAP/showHideErrorMessage.ts` (`showErrorMsg($el, clearMsg?)`,
  `hideAllErrorMessages()`, `initShowHideErrorMessage()`, needs `.error_message_container_jq` markup); inline banner in
  `JSP/jsp_includes_head_section/head_section_include_every_page.jsp`, replaced at runtime by `CAP/limelight__catchAndReportGlobalOnError.ts`.
  CSS classes `error-message-container` / `success-message-container` / `error-text` in `STY/all-pages.scss`.
- Used by: reporting and AJAX handlers ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)); `showHideErrorMessage` in 14 files, mostly user-account and admin pages.
- How to use / extend: new React code renders its own message (use the CSS classes); report errors via `reportWebErrorToServer` ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md));
  pass `doNotHandleErrorResponse` / the `skipDisplay...` flag only when showing your own UI.
- Do not use when: new React code — avoid `showHideErrorMessage` (legacy, jQuery).
- Limits and gotchas: error boxes are jQuery-built; message set via `.text()`. Editing the inline JSP script requires a new CSP hash
  ([web_security_csp_and_xss_url_hardening.md](../web_security_csp_and_xss_url_hardening.md)). Error boundaries (DataTable container, project page root) show generic text.
- Related / duplicates: two near-identical red boxes + legacy inline message.
- Status: verified

## React patterns and page-level helpers

### Instance fields + explicit forced re-render; re-render signalled by NEW object references
- What it solves: Recurring pattern for class components: mutable values live on typed instance fields (not `this.state`), and a
  re-render is forced with `this.setState({ force_Rerender: {} })`. Parents signal "inputs changed" by passing a NEW object reference
  (props compared by identity in `shouldComponentUpdate` / `componentDidUpdate`).
- Search keywords: force rerender, instance property, setState stale, shouldComponentUpdate identity, new propValue object,
  Force_ResetToStateObject, force_Rerender_EmptyObjectReference, ComponentData identity, re-render trigger
- Location (instances): `SearchDetailsAndFilterBlock_MainPage_Root` (documented WARNING: re-renders only on a NEW `propValue`); filter
  containers (`..._Force_ResetToStateObject` prop, see Filter component); `*_FiltersDisplay` roots (new `*_ComponentData` object
  triggers re-render); project-page `force_*_EmptyObjectReference`; generated peptide list section (rebuilds only when the result object
  reference changes); grouped tag filter builder keeps the expression in instance fields; QC sections keep `_sectionExpanded` /
  `_sectionEverExpanded` as instance fields.
- Used by: most newer components (see entries).
- How to use / extend: Newer components keep mutable values on typed instance fields and force a re-render with `setState({ force_Rerender: {} })`.
- Do not use when: n/a.
- Limits and gotchas: components that compare props by identity silently skip updates if a caller mutates an object in place. Three tag
  components compare `searchTagData_Root_Prev` in `getDerivedStateFromProps` but never store it, so they rebuild sorted data every render
  (observed in source; CPU only). Possible inverted comparison in `Filter_selectionItem_Any_All_SelectionItem.shouldComponentUpdate`
  (seen in code, not runtime-tested).
- Related / duplicates: stale-async guards.
- Status: unverified as a single pattern (assembled from several verified entries; no single source file defines it)

### Stale-async guards (QC "track latest updates" token + registry; component-level current-key check)
- What it solves: When the user changes input while async work runs, an older, slower result must not overwrite a newer one. QC: on
  every top-level change a new opaque token is created and pushed synchronously to all registered children (who also show an "Updating"
  cover); each async continuation checks `equals()` against its stored token. Scan browser: per-key cache + in-flight promise map +
  "is this still the scan shown?" check.
- Search keywords: stale response, race condition, out-of-date async result, latest request wins, generation token, request sequence,
  cancel outdated render, in flight promise map, per-key cache
- Location: `PSB/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.ts` (token),
  `..._CentralRegistration_And_Callback.ts` (`register`, `un_register`, `call_AllRegistered`, interface `set_Current_...`);
  `DP/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root_and_main_page_components/scanFileBrowserViewPage__MainPage_Component.tsx`
  (`_cached_SingleScanData_For_ScanFileId_Map_Key_ScanNumber`, `_promise_SingleScanData_Loading__...`, `_scanNumber_CurrentlyShown` check).
- Used by: QC main component + most plot components, feature-detection view page main component, three QC sections with nested registries;
  scan browser main component.
- How to use / extend: top level keeps one registry; on input change create a token, `call_AllRegistered`, pass the token down; children
  register in the constructor, `un_register` in `componentWillUnmount`, guard every async continuation. For one promise chain a local
  counter/key check is enough.
- Do not use when: the common data loader already caches and dedupes.
- Limits and gotchas: token carries no data (identity only); a child that forgets `un_register` keeps receiving callbacks. The scan browser
  cache is unbounded for the page lifetime.
- Related / duplicates: common loaders' in-flight dedupe ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)); render-queue abort ([charts_visualization.md](charts_visualization.md)).
- Status: verified (re-checked)

### Session storage for per-tab UI state (project page searches section; search "Verbose" checkbox)
- What it solves: Remember UI state within one tab: expanded folders, basic tag selections, name/id filter text, advanced grouped tag
  filter (scoped per project, with shape migration); and the search-tags "Verbose" checkbox.
- Search keywords: session storage, remember UI state, persist filter, expanded folders, per project state, migration of stored JSON,
  browser storage, verbose checkbox
- Location: `PP/project_page_main_page_react_based/jsx/projectPage_SearchesSection_MainBlock_Container_SessionStorage_SaveGet.ts`
  (keys `limelight_project_page_folders_expanded_ids`, `..._search_tag_ids_selected`, `..._search_name_search_id_filter_value`,
  `..._advanced_tag_filter`; exports `ProjectPage_SearchesSection__Advanced_TagFilter(_Group/_Literal)`; `_validate_Advanced_TagFilter` migrates
  the old single-operator shape; reads `searchTagIds_Selected_V2` with fallback to old `searchTagIds_Selected` treated as AND);
  `DP/common__search_display_verbose_value_store_session_storage/search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage.ts`
  (key `limelight_search_display_verbose_value`).
- Used by: project-page searches container + list; verbose value by the search details root, folder search selector, project searches
  container, feature-detection run list.
- How to use / extend: store `{ projectIdentifier, <value> }` as JSON; drop on read if the project differs; validate each element; defer
  writes with `setTimeout(…, 50)`.
- Do not use when: state must be shareable (URL) or durable (server); it must survive closing the tab.
- Limits and gotchas: `getItem`/`setItem` are not wrapped in try/catch (only `JSON.parse` is) — blocked storage would throw. One project at
  a time per key. No shared wrapper (the only two sessionStorage users).
- Related / duplicates: the two hand-rolled helpers.
- Status: verified

### Small type-check, compare, sort, parse helpers (`limelight__*`)
- What it solves: Runtime type guards (the house validation for off-the-wire response fields) and tiny utilities.
- Search keywords: is number, is string, type guard, validate response, runtime check, compare strings case insensitive, sort numbers,
  set equality, parse number, text selected, ignore click while selecting text
- Location: `CAP/limelight__variable_is_type_number_Check.ts`, `limelight__IsVariableAString.ts`, `limelight__Input_NumberOrString_ReturnNumber.ts`,
  `limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam.ts`, `limelight__Sort_ArrayOfNumbers_SortArrayInPlace.ts`,
  `limelight__Compare_2_Sets_OfNumbers_For_Equality.ts`, `limelight__IsTextSelected.ts`.
- Used by: number check 86 files, string 48, compare strings 20, sort numbers 38, text selected 27, parse number 1, set equality 1.
- How to use / extend: number/string checks per the repo rule (required fields + runtime checks); `limelight__IsTextSelected` to ignore a
  click while the user is selecting text.
- Do not use when: n/a.
- Limits and gotchas: number check accepts NaN (`typeof === 'number'`).
- Related / duplicates: none.
- Status: verified

### Field-length and other cross-webapp constants (`constants_across_webapp`)
- What it solves: Front-end copies of server limits and fixed values: max lengths (search tag, search name / short name, saved view label,
  gold standard, feature detection), search tag disallowed characters and color options, residue letters, `n`/`c` position constants,
  best-of-PSM annotation name prefix.
- Search keywords: max length, field length, constants, input limit, tag colors, residue letters, n-term c-term
- Location: `FE/constants_across_webapp/*/*.ts`, e.g. `search_tag_constants/SearchTag_Max_FieldLengths_Constants.ts`, `SearchTag_ColorOptions_Constants.ts`.
- Used by: max lengths 15 files; n/c constants 5.
- How to use / extend: keep in sync with Java `limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp/constants/FieldLengthConstants.java`.
- Do not use when: n/a.
- Limits and gotchas: manual sync; front-end limits sometimes lower than DB limits.
- Related / duplicates: Java `FieldLengthConstants`.
- Status: verified (front end); sync with Java unverified

### Password too long check (UTF-8 bytes)
- What it solves: Client check of a new password against the server max in UTF-8 bytes (DOM id `password_max_length_utf8_bytes`), message in characters.
- Search keywords: password length, UTF-8 bytes, byte-limited text, validation, too long
- Location: `FE/user_account_page_js/sub_parts/passwordTooLong_PageCheck.ts`.
- Used by: create account (2), reset password, account change password, admin manage users.
- How to use / extend: page JSP must emit the max-length element (5 JSPs do). Generic "byte-limited text" helper hiding in a feature folder.
- Do not use when: login (by design not checked).
- Limits and gotchas: none noted.
- Related / duplicates: none.
- Status: verified

### Annotation value display formatting
- What it solves: One display format for filterable annotation (score) numbers: exponential if |x| >= 100 or <= 0.01, else 4 decimals.
- Search keywords: format score, number format, annotation display, q-value format, exponent
- Location: `CAP/annotation_data_display_common_formatting/limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage.ts`.
- Used by: 7 files (PSM list child table, reported-peptides child table, scan-file-to-searches page ...).
- How to use / extend: display only.
- Do not use when: writing download files.
- Limits and gotchas: other score formatting may exist in tables (not checked).
- Related / duplicates: none found.
- Status: verified

### Download a string as a file (`StringDownloadUtils`)
- What it solves: Save client-generated text (TSV, SVG, ChimeraX script ...) as a download via `file-saver`.
- Search keywords: download file, save as, export TSV, download text, file-saver, client-side download, download SVG
- Location: `DP/data_pages_common/downloadStringAsFile.ts` (`StringDownloadUtils.downloadStringAsFile({ stringToDownload, filename })`).
- Used by: 17 files (DataTable download, feature-detection page, bar and structure widgets, mod page reports); the only `file-saver` importer.
- How to use / extend: any client-built file.
- Do not use when: large server-generated data — use the form-POST download ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Limits and gotchas: Blob type hard-coded `text/plain;charset=ISO-8859-1` (non-Latin-1 text may be mangled — inferred, not tested).
- Related / duplicates: no other `createObjectURL` / `a.download` helper found.
- Status: verified (re-checked)

### Deep copy (`copyObject_DeepCopy_Limelight`)
- What it solves: Deep copy using `structuredClone`, falling back to `jQuery.extend(true, ...)`.
- Search keywords: deep copy, clone object, structuredClone
- Location: `DP/data_pages_common/copyObject_DeepCopy.ts`.
- Used by: only `searchDetailsAndFilterBlock_UserInput_OverlayContents.tsx`.
- How to use / extend: OK for plain data.
- Do not use when: class instances must be preserved (`structuredClone` returns plain objects).
- Limits and gotchas: throws on null/undefined; fallback depends on global jQuery.
- Related / duplicates: none.
- Status: verified

---
## DataTable and shared child tables

### DataTable (generic React data table: sort, paging, find, download, tooltips, row expansion)
- What it solves: The one standard table for data pages. You build a plain object tree describing columns and rows; the component
  renders multi-column sort, pagination (10/25/50/100/250/500/1000/All), a "Find all rows containing" filter, tab-delimited download
  (all or filtered rows), per-cell and per-header tooltips, row highlight/grey-out, optional horizontal bar graph per cell, row click
  handlers, and expandable child rows.
- Search keywords: table, data table, grid, sortable table, paged table, pagination, expandable rows, child rows, sub table, nested
  table, download table, export TSV, find in table, filter rows, column definitions, DataTable_TableRoot
- Location: `DP/data_table_react/`: component `DataTable_TableRoot` (`dataTable_TableRoot_React.tsx`, props `tableObject`, optional
  `resortTableOnUpdate`); object model `dataTable_React_DataObjects.ts` (`DataTable_RootTableObject`, `DataTable_TableOptions`,
  `DataTable_RootTableDataObject`, `DataTable_Column`, `DataTable_Column_DownloadTable`, `DataTable_DataRowEntry`,
  `DataTable_DataRowEntry_DownloadTable(_SingleColumn)`, `DataTable_DataRow_ColumnEntry`, `DataTable_DataRow_ColumnEntry_SearchTableData`,
  `DataTable_RootTableDataObject_Both_ColumnArrays`); validator `dataTable_React_DataObjects_Validator.ts`; CSS in `STY/data-pages.scss`.
- Used by: 22 files outside the dir render `<DataTable_TableRoot`, e.g. protein list, single-protein / peptide-page generated peptide list, mod page tables,
  feature-detection view, scan-file-to-searches, experiment protein page, protein-selection overlay, mod-mass selection overlay.
- How to use / extend: build columns + parallel `columns_tableDownload`, rows with `uniqueId`, `sortOrder_OnEquals`, `columnEntries`,
  download entry; wrap and render `<DataTable_TableRoot tableObject={...} />`. Reference builders:
  `proteinViewPage_DisplayData_ProteinList__Create_ProteinList_DataTable_RootTableDataObject.tsx` (groups, graph column, multi-search /
  sub-search header tooltips) and the mod page `*_SubTableGenerator.tsx` files. Per `limelight_webapp/front_end/CLAUDE.md`, when adding a
  column copy a sibling column's full construction (tooltip, width, download entry, per-search / per-sub-group blocks, every display mode).
- Do not use when: a tiny static key/value layout (plain `<table>`); infinite / virtualized lists (only the current page is in the DOM).
- Limits and gotchas: constructors validate and THROW on bad data (both or neither row arrays, empty / sparse columns, missing
  valueDisplay, both tooltip forms). Default page size 50; "All" is select value -1. Multi-column sort uses ctrl/meta-click on headers (not
  shift). `resortTableOnUpdate` requires identical column ids. Download file names fixed (`table_contents.txt` /
  `table_contents_filtered.txt`). `DataTable_RootTableDataObject.shallowClone()` does not copy `download_Content_PrefixLines` (seen in
  code, not runtime-tested; only user of that field is the mod z-score table). Component keeps working data in `this.state`.
- Related / duplicates: standalone TSV converter; plain `<table>` blocks in about 9 places (admin users, projects list, mod residue overlay,
  QC scan-file summaries, gold-standard matches table, experiment conditions grid).
- Status: verified (structure, constructors, users); paging / search internals skimmed (re-checked)

### DataTable row expansion: child table or child content (sync / sync-or-promise / promise)
- What it solves: A row expands to show a child `DataTable` or any React content, loaded lazily on first expand with a "loading"
  message, with a synchronous fast path when data is in hand.
- Search keywords: expand row, child row, sub table, nested table, drill down, lazy load row details, row child content
- Location: fields on `DataTable_DataRowEntry` (exactly ONE may be set, enforced by `never`-typed unions):
  `dataRow_GetChildTableData_Return_DataTable_RootTableObject`, `..._Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject`,
  `..._Return_Promise_DataTable_RootTableObject`; `dataRow_Get_RowChildContent_Return_ChildContent`,
  `..._Return_ChildContent_Or_Promise_ChildContent`, `..._Return_Promise_ChildContent`; plus `dataRow_Get_RowChildContent_At_RowMountTime`.
  Handled in `DP/data_table_react/dataTable_Table_DataRow_React.tsx`.
- Used by: promise child table: 11 files (mod page sub-table generators in `PSB/mod_view_page/mod_page__sub_tables_code/`); promise child
  content: feature-detection page, reported-peptides and sub-group child builders, mod peptide lists; sync child content:
  scan-file-to-searches; OR-promise child table: reported-peptides child builder. `..._ChildContent_Or_Promise_ChildContent` has no users
  outside the dir.
- How to use / extend: prefer the "_OR_Promise" variants when data may already be loaded (avoids an async hop). Callback
  params are empty `{}` — close over the data you need.
- Do not use when: child must update live with parent filter changes without recreating the row (cached child is cleared only when the
  callback identity changes).
- Limits and gotchas: on promise rejection the `.catch` does nothing (throw commented out) — the "loading" message stays, no error shown
  (seen in code, not runtime-tested). Mod page generators are `async` (always await; do not copy them for new code; the sync fast path
  avoids an async hop). Doc comments still recommend `create_dataTable_Root_React`, which is commented out.
- Related / duplicates: six callback variants; `DP/data_table_react/test_ChildDataTable/` (unused example; currency unchecked).
- Status: verified

### DataTable group rows (`DataTable_DataGroupRowEntry`)
- What it solves: Several data rows shown as one visual group (e.g. a protein group), sorted/paged as a unit, with cells optionally only on
  the group's first row.
- Search keywords: grouped rows, row groups, protein groups, merged cells, rowspan
- Location: `DataTable_DataGroupRowEntry` in `dataTable_React_DataObjects.ts`; `DataTable_Column.onlyShow_ValueDisplay_FirstRowOfGroup`;
  renderer `dataTable_Table_DataRow_Group_React.tsx`.
- Used by: protein list and experiment protein list builders, Lorikeet PSM/peptide table.
- How to use / extend: pass `dataTable_DataGroupRowEntries` instead of `dataTable_DataRowEntries` (never both).
- Do not use when: rows are independent.
- Limits and gotchas: root constructor throws if both or neither set.
- Related / duplicates: none.
- Status: verified (group renderer skimmed)

### DataTable sorting options: null placement and custom sort function
- What it solves: Sort no-value cells to a chosen numeric end, or sort with a custom comparator.
- Search keywords: sort nulls last, missing values sort, custom comparator, sort function, no-data cells
- Location: `DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum` via `DataTable_Column.sort_Null_BeforeValues_AfterValues_Enum`;
  `DataTable_Column.sortFunction` with `valueSort_FOR_DataTable_Column_sortFunction`; engine `DP/data_table_react/dataTable_SortDataRows.ts`.
- Used by: null enum in PSM list builder, scan-file-to-searches, single-protein peptide list; `sortFunction` in a mod page generator.
- How to use / extend: set cell `valueSort` null and the column enum (convention: null at the metric's worst end).
- Do not use when: you need "always visually last" — null position flips with sort direction.
- Limits and gotchas: null `valueSort` without the enum throws.
- Related / duplicates: none.
- Status: verified (sort engine read)

### DataTable to tab-delimited string (standalone converter)
- What it solves: Converts a `DataTable_RootTableDataObject` (header from `columns_tableDownload` + each row's download entry) into one TSV
  string for use outside the table's own download links.
- Search keywords: export table, TSV, tab delimited, download table contents, table to text
- Location: `DP/data_table_react/dataTable_React_convert_DataTableObjects_TableContents_To_Tab_Delim_String_ForDownload.ts`.
- Used by: protein list main component, experiment protein page main content.
- How to use / extend: pass the root data object, then `StringDownloadUtils.downloadStringAsFile`.
- Do not use when: the table's built-in download links suffice.
- Limits and gotchas: ignores `download_Content_PrefixLines` (the built-in `_downloadTableContents_*` path honors them); no quoting/escaping of
  tabs or newlines.
- Related / duplicates: built-in download (parallel code path); pages that hand-build TSV with `.join("\t")` (mod page reports, QC summary blocks — grep only).
- Status: verified

### PSM List block (expand-row child: chromatogram button + PSM list table)
- What it solves: The standard content when a reported-peptide row is expanded: optional PSM-based MS1 chromatogram (only when the search
  has scan data) followed by the PSM list `DataTable`. Reusable from any page with projectSearchId + reportedPeptideId (optionally sub-group or explicit PSM ids).
- Search keywords: PSM list, PSMs for peptide, expand peptide row, show PSMs, child PSM table, chromatogram for PSMs
- Location: `DP/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__root_component_and_code/psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent.tsx`
  — returns `Promise<DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent>`; plug into `dataRow_Get_RowChildContent_Return_Promise_ChildContent`.
- Used by: reported-peptides child builder, sub-group child builder, two mod page peptide-list generators, scan-file-to-searches child block.
- How to use / extend: construct `PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter` (projectSearchId,
  reportedPeptideId or `psmEntries_Include_Map_Key_PsmId`, optional `searchSubGroupId`, lookup params, state manager, per-search common data ...);
  pass undefined chromatogram params to omit the chromatogram.
- Do not use when: inside an overlay (file comment: "ASSUMPTION: This Component is NEVER in an overlay").
- Limits and gotchas: always async. `searchSubGroupId` only with `reportedPeptideId` (constructor throws). Parameter class has several `?` params.
- Related / duplicates: chromatogram ([charts_visualization.md](charts_visualization.md)).
- Status: verified (re-checked)

### PSM list child-table builder, its webservice loader (`d/rws/for-page/psb/psm-list`) and cell components
- What it solves: Fetches cutoff-filtered PSMs for one project search + reported peptide (or PSM ids / sub-group) and builds the PSM list
  `DataTable` (scan number + "View" spectrum, MS1 scan link, charge, m/z, RT, PSM annotations, open-mod position annotation), with reusable
  cell components.
- Search keywords: PSM list webservice, psm-list, PSM table columns, view spectrum link, Lorikeet link, MS1 scan link, position annotation cell
- Location: `.../psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects.ts`,
  `psmList_ForProjectSearchIdReportedPeptideId_GetDataFromServer.ts`; cells in
  `.../psm_list/psm_list_view_spectrum_cell_ExternalComponent/jsx/` (`psm_list_ScanNumber_AND_ViewSpectrum_TableCell_ExternalComponent.tsx` ->
  `SpectrumRetrieveAndDisplay_Use_lorikeet.viewSpectrum_NewWindow` in `DP/data_pages_subparts_other/spectrumRetrieveAndDisplay_Use_lorikeet.ts`;
  `psm_list_view_MS_1_Scan_TableCell_ExternalComponent.tsx`; `psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent.tsx` + header tooltip).
- Used by: the PSM List block; loader also by the chromatogram files and cells; cells only by the builder.
- How to use / extend: use via the PSM List block; return cells from `valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough`.
- Do not use when: per-PSM data across many peptides — use the filtered `..._PSM_TblData_For_ReportedPeptideId_For_MainFilters` loader ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Limits and gotchas: response cast without field-level runtime validation; rejects with no reason; logs START/END. Applying the user's
  cutoffs was inferred from it sending `searchDataLookupParams_For_Single_ProjectSearchId` (Java controller not read).
- Related / duplicates: common-data PSM loaders (overlapping data, different shape).
- Status: verified (classes, URL, users; 1.7k-line body skimmed)

### Reported peptides for a single search / sub-groups for a reported peptide (child tables)
- What it solves: Child `DataTable` listing the reported peptides of one search under a generated peptide row (each expandable to
  sub-groups or the PSM list), and child table of Sub Searches for one reported peptide (each expandable to PSMs).
- Search keywords: reported peptides child table, per-search peptide breakdown, sub search child table, search sub group breakdown
- Location: `DP/data_table_react_common_child_table_components/peptide_list__reported_peptides_for_single_search/js/reportedPeptidesForSingleSearch_createChildTableObjects.ts`
  (+ `reportedPeptidesForSingleSearch_create_createReportedPeptideDisplayData.ts`);
  `DP/data_table_react_common_child_table_components/peptide_list_search_sub_groups_for_single_reported_peptide/js/searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject.ts`.
- Used by: single-protein peptide list create-table-data, single-protein per-search child builder, experiment per-condition child builder;
  sub-group table only by the reported-peptides builder.
- How to use / extend: build the `ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter`.
- Do not use when: not per single projectSearchId; search has no sub-groups (sub-group table).
- Limits and gotchas: header says "Experiment Protein Page" but used by non-experiment pages too. `createReportedPeptideDisplayData`-named
  symbols in 8 files, not all confirmed to call this function.
- Related / duplicates: PSM List block.
- Status: verified (users of the display-data function partly unverified)

### Generated peptide list table section (peptide page / single protein / scan-file-to-searches)
- What it solves: Renders the generated (distinct) peptide list as a `DataTable` with expandable per-search or per-reported-peptide child
  rows and download buttons (peptides, PSMs, PSMs with apex RT, blib).
- Search keywords: peptide table, reported peptide table, child table, best PSM, download peptides, peptide list section
- Location: `PSB/protein_page/protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component.tsx`,
  `..._Create_TableData.tsx`, `.../protein_page__single_protein_searches_for_generated_reported_peptide/js/proteinPage_SingleProtein_searchesForGeneratedSinglePeptide_createChildTableObjects.ts`,
  `..._SearchSubGroup_PSM_Count_Header_Text_And_Tooltip_DataTable_Component.tsx`.
- Used by: peptide page, single protein, scan-file-to-searches page, peptide experiment page; table builder also by the experiment single protein.
- How to use / extend: feed `create_GeneratedReportedPeptideListData_Result`; set `for_SingleProtein`; for the peptide page set `showProteins` +
  `proteinName_Clicked_Callback_Function` (gets ctrl/meta flags). Rebuilds only when the result object reference changes.
- Do not use when: protein list tables.
- Limits and gotchas: many `?` props (peptide-page-only). Child per-search rows show the real `search_tbl` id from the loaded search names.
- Related / duplicates: experiment single-protein list builders ([domain_utilities.md](domain_utilities.md) / experiment pages).
- Status: verified (headers, signatures, users)

### Sub Search header tooltip partial
- What it solves: Standard "Sub Search: <display name> <import-file name>" block for header tooltips of per-sub-group columns.
- Search keywords: header tooltip, sub search tooltip, sub-group column header
- Location: `DP/data_table_react_common__table_part_components/dataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup__Component.tsx`.
- Used by: three per-sub-group PSM / peptide count header components (protein list, single protein).
- How to use / extend: include in `columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element` for every per-sub-group column (front-end CLAUDE.md).
- Do not use when: column is not per sub-group.
- Limits and gotchas: no equivalent shared partial for the multi-search "Search:" block was found in this dir.
- Related / duplicates: none.
- Status: verified

---

## Filters: "Filter On" UI, current-filters display, and the filter engine

### Filter component = Container (loads choices) + Component (renders) + StateObject
- What it solves: Standard split for a "Filter On" row: a container gathers selectable values from the per-search common data loaders, the
  inner component renders and edits the StateObject, and the page is told via a callback.
- Search keywords: filter on component, filter row, container component, charge filter, scan file filter, Force_ResetToStateObject, filter UI
- Location: reference `CF/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/`
  (`Psm_Charge_Filter_UserSelection_Container_Component`, `Psm_Charge_Filter_UserSelection_Component`); siblings in the same parent (scan file,
  scan number, scan peak, RT/m/z, missed cleavage, digestion, PSM count, peptide sequence, unique, decoy exclusion) and
  `CF/filter_on__components/filter_on__peptide_page__components/protein_position*_filter_component/`.
- Used by: page main components — peptide, protein list, single protein, QC, mod, experiment pages.
- How to use / extend: the charge container shows the `{ data, promise }` use with a synchronous fast path on the FILTERED loader
  (`..._PSM_TblData_For_ReportedPeptideId_For_MainFilters().get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()`). Reset from
  outside: call `clearAll()` and pass a new `{}` for `..._Force_ResetToStateObject` (`shouldComponentUpdate` re-renders only when it changes).
- Do not use when: the Mod page's own data-viz selections (separate code).
- Limits and gotchas: no component here calls a webservice directly (data always comes from common loaders). Overlays use the modal overlay;
  tooltips use the main tooltip.
- Related / duplicates: filter engine; StateObject pattern.
- Status: verified (charge pair read; others skimmed)

### Modification / reporter-ion selection with OR / AND / NOT, and its coordinator
- What it solves: Select variable, open and static mod masses and reporter-ion masses as ANY(OR) / ALL(AND) / NOT, with PSM counts per mass, a
  "select other masses" overlay, and cross-component coordination (first selection shows "ADD"; the second OR/AND choice applies to all ANY/ALL entries).
- Search keywords: modification filter, mod mass selection, reporter ion filter, OR AND NOT, any all, SingleProtein_Filter_SelectionType,
  coordinator, PSM count per mod mass, static mod filter, open mod filter, generic any/all/not chip
- Location: `CF/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/` —
  `modification_mass_user_selections/jsx/modificationMass_UserSelections_Root.tsx`, `reporter_ions_user_selections/jsx/reporterIonMass_UserSelections.tsx`,
  `modification_mass_reporter_ion__user_selections__coordinator/js/` (`ModificationMass_ReporterIon__UserSelections__Coordinator_Class`),
  generic chip `filter_selectionItem_Any_All_SelectionItem/jsx/` (`Filter_selectionItem_Any_All_SelectionItem_Container`),
  `ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass`, `modificationMass_UserSelections_BuildData_ForReactComponent.ts`. Enum
  `SingleProtein_Filter_SelectionType` in `PSB/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects.ts`.
- Used by: coordinator created by peptide, protein list, single protein, QC, mod, experiment main components; the chip by static, var/open mod
  and reporter-ion components; PSM-count-per-mass also by the single-protein mod-seeding helper.
- How to use / extend: one coordinator per filter block; pass `get_Current_..._Coordinated_ReactStateData_Class()` down. Reuse the chip for
  any new selectable-item OR/AND/NOT filter.
- Do not use when: you only need "is a mod selected" (state object getters).
- Limits and gotchas: masses use the injected `modificationMass_CommonRounding_ReturnNumber` ([domain_utilities.md](domain_utilities.md)) — do not add new mass math here. The
  "SingleProtein_..." enum is used on all pages. Possible inverted `===` in the chip's `shouldComponentUpdate` (seen in code, not runtime-tested).
- Related / duplicates: mod page's own selection UI ([domain_utilities.md](domain_utilities.md) / mod page).
- Status: verified (coordinator read; UI skimmed)

### Protein position filters + protein position input overlay + generic protein selection overlay
- What it solves: Filter peptides by protein + position range, or by the protein position of a modification; input overlay with a searchable
  protein picker.
- Search keywords: protein position filter, protein range filter, position of modification filter, protein picker, select proteins
- Location: `CF/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/` and
  `.../protein_position_of_modification_filter_component/` (StateObject, `_Component`, `_Component__Container__GetsProteinData`); shared input
  `DP/common_components__react/protein_position_filter_component__not_single_protein/protein_position_filter__user_input_component/proteinPositionFilter_UserInput__Component.tsx`;
  generic picker `DP/common_components__react/protein_selection_generic_component/` (`get_proteinSelection_Generic__UserInputOverlay_Component`).
- Used by: protein position — peptide, peptide experiment, QC, scan-file-to-searches, mod page roots; of-modification — mod page only; generic
  picker only from the position input component.
- How to use / extend: reuse as-is for another peptide-list page; `get_..._Get_RangeEntries_Root` returns ranges for the engine. The generic
  picker is a candidate for any "pick proteins" UI.
- Do not use when: the single-protein view (selection comes from the sequence widget).
- Limits and gotchas: cleared by purge when any search has no proteins. The two filters are near-clones (StateObjects about 10 diff lines after
  rename, components about 45, display elements about 10, measured with sed + diff): fix both.
- Related / duplicates: each other.
- Status: verified (filters); input overlay and generic picker unverified (exports and users only)

### Peptide sequence search string -> protein positions (I/L equivalent) and sequence coverage arrays
- What it solves: Find all locations of user-entered peptide substrings on a protein (L treated as I) with per-position coverage; and build
  a boolean coverage array over a protein from all reported peptides meeting main filters or only the currently filtered ids.
- Search keywords: peptide sequence search, find substring in protein, I L equivalence, sequence coverage, coverage array, covered positions
- Location: `CF/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_Compute.ts`;
  `CF/filter_on__components/filter_on__single_protein/protein_sequence_display_widget__ForProtExp_SingleProtein/`
  (`getSequenceCoverageBooleanArray_NotFiltered`, `getSequenceCoverageBooleanArray_ForReportedPeptideIds`).
- Used by: peptide sequence filter component, single-protein and experiment single-protein main content.
- How to use / extend: pure function; coverage helpers wrap `ProteinSequenceCoverageData_For_ProteinSequenceVersionId` ([domain_utilities.md](domain_utilities.md)).
- Do not use when: matching against peptide sequences rather than a protein.
- Limits and gotchas: coverage helpers have no synchronous fast path (`async` / `Promise.resolve` even when nothing to load).
- Related / duplicates: per-search coverage holder.
- Status: verified

### Generated peptide contents user controls
- What it solves: User options for what the generated peptide string shows (variable mods, open mods, open mods with localization, static mods).
- Search keywords: generated peptide, peptide string display, show modifications in peptide, peptide contents options
- Location: `CF/filter_on__components/generated_peptide_contents__user_controls/` (`GeneratedPeptideContents_UserSelections_StateObject`,
  `GeneratedPeptideContents_UserSelections_Root_Component`).
- Used by: peptide, single protein, QC, mod and experiment roots; generated peptide list builders.
- How to use / extend: same StateObject pattern; defaults variable/open true, static false.
- Do not use when: n/a.
- Limits and gotchas: display option, not a filter — not shown in "Current filters". Protein list uses a different "DistinctPeptideContents" object.
- Related / duplicates: `ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject`.
- Status: verified (component skimmed)

### Show/Hide "Filters and Options" container and "Search Programs" group conditional render
- What it solves: Collapse the whole "Filter On" section behind "Click to Show Filters and Options"; render the search-programs filter group only
  if at least one child (sub-group selector or scan-file selector) would render.
- Search keywords: expand collapse, show hide filters, collapsible filter section, conditional render, hide empty filter group
- Location: `CF/filter_on__components/filter_on__show_hide__expand_collapse_container_component/filterSection_DataPage_ShowHide_ExpandCollapse_Container_Component.tsx`;
  `CF/filter_on__components/filter_on__search_programs_group__conditional_render__component/filterOn_SearchProgramsGroup_ConditionalRender_Component.tsx`.
- Used by: peptide, protein list, single protein, QC, mod, scan-file-to-searches, feature-detection, experiment main components.
- How to use / extend: wrap the filter rows as children inside a 2-column CSS grid (it spans `gridColumn: "1/-1"`).
- Do not use when: a generic collapsible outside the filter grid (hard-coded text).
- Limits and gotchas: children are unmounted when hidden; starts collapsed; state in `this.state`. The conditional-render component clones its
  children's render rules (calls `SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component.limelight_willComponentRender`, re-implements
  "more than one scan file") — keep in sync.
- Related / duplicates: collapsible section headers.
- Status: verified

### Current-filters display block ("Current filters: ... clear all")
- What it solves: The summary above data tables listing every active filter in words.
- Search keywords: current filters, filters display, filter summary, clear all filters, filtering on
- Location: shared frame `CF/current_filters_display_block__each_root_component_and_their_data_objects/common/page_MainFiltersDisplay_CommonDisplayContainer_Component.tsx`;
  page roots `Peptide_Page_FiltersDisplay`, `Protein_Page_FiltersDisplay`, `SingleProtein_FiltersDisplay`, `Mod_Page_FiltersDisplay`,
  `QC_Page_FiltersDisplay`, `ScanFileToSearches_Page_FiltersDisplay` (each with `*_FiltersDisplay_ComponentData.ts`); element functions
  `currentFiltersDisplayBlock__<Filter>(...)` under `CF/current_filters_display_block__common_and_page_specific/*/`.
- Used by: peptide (+ experiment), protein list (+ experiment), single protein (+ experiment), mod, QC, scan-file-to-searches main components.
- How to use / extend: for a new filter write one element function and call it from every page root that has the filter; add the state object
  to each `*_ComponentData`. A new `ComponentData` instance triggers re-render.
- Do not use when: the structure widget's own "Currently filtering on:" line ([charts_visualization.md](charts_visualization.md)) or the mod page data-viz selection text.
- Limits and gotchas: six roots repeat the same element calls by hand (about 250-300 lines each); filter order differs per page.
- Related / duplicates: structure-widget and mod-page "currently filtering on" texts; sub-group display-data creators used by all roots.
- Status: verified (common container + peptide root read)

### purge_FilterSelections_NotIn_CurrentData
- What it solves: After searches/cutoffs change (or a URL / saved view loads), removes selections no longer in the loaded data (mod/reporter
  masses, charges, scan files; protein-position filters when any search lacks proteins; scan-peak filter when any search lacks scan data).
- Search keywords: purge filters, remove stale selection, invalid filter, selection not in data, clean up filters after cutoff change
- Location: `CF/purge_filter_selections_not_in_current_data/purge_FilterSelections_NotIn_CurrentData.ts`; per-object helpers such as
  `Psm_Charge_Filter_UserSelection_StateObject.remove_chargeValues_OnPSMs_Selected_NOT_in_All_ChargesSet`.
- Used by: peptide, protein list, single protein, QC, mod, scan-file-to-searches, experiment main components.
- How to use / extend: pass all state objects you have (absent ones null-checked); for a data-dependent filter add a removal step + a
  `remove_..._NOT_in_...` method.
- Do not use when: n/a.
- Limits and gotchas: always returns a Promise (no sync fast path). Some checks clear the whole filter. Removal fires `valueChangedCallback` (URL updates).
- Related / duplicates: `Limelight_AnyFilter__HasFilterValue`.
- Status: verified (top level read)

### `Limelight_AnyFilter__HasFilterValue` ("is any filter set?")
- What it solves: One call answering "has the user set ANY filter?" across mods, reporter ions, unique, missed cleavage, digestion, PSM count,
  scan file, RT/m/z, charge and the protein sequence widget.
- Search keywords: any filter set, has filter, is filtered, filters active, no filters
- Location: `CF/any_filter__has_filter_value/Limelight_AnyFilter__HasFilterValue.ts` (`is_AnyFilter__HasFilterValue()`).
- Used by: single-protein root + main content, structure and bar widgets.
- How to use / extend: construct with all state objects (required); add new filters here.
- Do not use when: pages lacking the sequence widget state (single-protein only).
- Limits and gotchas: does NOT include scan number, scan peak, decoy exclusion, peptide sequence string, protein position or sub-group filters —
  not a true "any filter" check. Three separate "is filter set" computations exist (this, each `*_FiltersDisplay`, purge flags).
- Related / duplicates: those three.
- Status: verified

### Main filtering engine: `GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class`
- What it solves: Given per-search loaded data (already cut by the search's PSM/peptide/protein cutoffs) and ALL the user's page filter
  selections (mods, open-mod "0 is not open mod", reporter ions, peptide sequence, protein positions, protein position of mod, unique,
  charge, decoy exclusion, scan file, scan number, scan peak, RT / precursor m/z, missed cleavages, digestion, sub-groups), compute per search
  the reported peptide ids and, under each, the PSM ids that pass. THE one place the front-end filter combination logic lives.
- Search keywords: filter reported peptides, apply user filters, filtered PSM ids, filter engine, OR AND NOT, union intersection exclude,
  reportedPeptideIds for display, getReportedPeptideIdsForDisplay, client-side filtering
- Location: `CF/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds.ts` —
  `GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class.getNewInstance({ projectSearchIds, dataPage_common_Searches_Flags,
  commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root })`; `getReportedPeptideIdsForDisplay_AllProjectSearchIds(requestParams)`
  (`{ data, promise }`) and `..._ReturnPromise`; request class `..._MainMethod_RequestParams` (one field per filter state + `proteinSequenceVersionId`,
  `searchSubGroup_Ids_Selected`, `not_filtered_position_modification_selections`). Per-search worker in `..._SingleProjectSearchId.ts`.
- Used by: 20 files (peptide, single protein root, protein list, QC, mod, feature-detection, scan-file-to-searches, experiment pages).
- How to use / extend: one instance per page (per loaded-data root) on an instance field; call on every filter change; honor the sync fast
  path. For a "no user filters" variant (QC), build a second loaded-data root + second engine. Add a filter via: new state object, field on
  the request class, logic in the right sub-class. PSM-table data comes from the `..._For_MainFilters` getters (no unfiltered PSM-table loader here); the per-search worker does read the
  unfiltered sub-group-id-per-PSM lookup (`..._SearchSubGroupId_ForPSM_ID_NOT_Filtered`) for the sub-group filter.
- Do not use when: server-side filtering; the mod page main table has its own filtering (though the mod page instantiates this class for some sub-tables).
- Limits and gotchas: sub-class instances cache data (separate instances per search for OR and NOT). Digestion filter is a second pass across all
  searches. Header WARNING names `create_GeneratedReportedPeptideListData__SingleProtein(...)` (in
  `proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData.ts`) as re-creating the result structure;
  `qc_compute_Cache_create_GeneratedReportedPeptideListData.ts` does too — mirror shape changes there. `not_filtered_position_modification_selections: true` is for "download all".
- Related / duplicates: mod page filtering; filter state objects; loaders ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Status: verified (re-checked)

### Filtering result data structure (reported peptide ids + PSM ids per search)
- What it solves: The canonical immutable "what passed" object: per projectSearchId -> per reportedPeptideId -> included PSM ids (also by
  sub-group) with counts, plus per-PSM extras (scan peaks that passed the scan-peak filter).
- Search keywords: filtered result, reportedPeptideIds and PSM ids, psmIds_Include, psmCount_after_Include, passing PSMs
- Location: `..._AllProjectSearchIds.ts` (`Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds`), `..._SingleProjectSearchId.ts`
  (`..._ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId`, `..._ForSingleReportedPeptideId` with `psmIds_Include`, `psmCount_after_Include`,
  `psmIds_IncludeSet_Map_Key_SearchSubGroupId`, `psmEntries_Include_Map_Key_PsmId`); mutable `*__FILTERING_INTERNAL_CLASS` twins only during filtering.
- Used by: about 20 files (child-table builders, PSM download, mod compute, protein list combine).
- How to use / extend: consume read-only; look up PSM fields via the filtered PSM_TblData loader using these ids.
- Do not use when: you need PSM data fields directly.
- Limits and gotchas: public class always carries the computed include set ("include all" is internal).
- Related / duplicates: the two re-creators named above.
- Status: verified

### Filter set-algebra sub-classes (OR/union, explicit AND, implicit AND, NOT, protein positions, digestion)
- What it solves: Building blocks the engine composes: union for ANY, intersection for ALL, bulk removal for NOT, always-AND filters (charge,
  scan, RT, unique ...), protein start/end selections, peptide-meets-digestion.
- Search keywords: union, intersection, exclude, NOT filter, ANY OR, ALL AND, implicit AND, tryptic filter
- Location: `CF/reported_peptide_ids_for_display/` (`..._For_ANY_OR_Selections__For_ModificationSelections.ts`, `..._ReporterIonSelections.ts`,
  `..._For__Explicit__ALL_AND__Selections__INTERSECTION_Together.ts`, `..._For__Implicit__ALL_AND__Selections__INTERSECTION_Together.ts` (3.9k lines),
  `..._RemoveFor_NOT_Selections.ts`, `..._Merge_ANY_OR__...Array.ts`, `..._ProteinPositions_ProteinPosition_StartEnd_Selections.ts`, `..._COMMON.ts`,
  `..._PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter.ts`, `..._INTERNAL_DataClasses.ts`).
- Used by: only the engine classes in this directory.
- How to use / extend: do not call directly; add a filter to the matching sub-class following the `{ data, promise }` style.
- Do not use when: outside the engine.
- Limits and gotchas: long, repetitive files; per-search, cache per instance. The implicit-AND file holds a copy of the trypsin missed-cleavage
  regex `[KR][^P]` also in QC digestion compute ([domain_utilities.md](domain_utilities.md)).
- Related / duplicates: none outside.
- Status: verified (structure and users; bodies skimmed)

### Protein sequence display widget (formatted sequence with coverage, mods, clickable positions)
- What it solves: Renders a protein sequence as lines of letters with per-position flags (covered, covered by selected peptides, mods,
  search-string match, selected) and tooltips; clicking positions selects them for filtering.
- Search keywords: protein sequence display, coverage letters, sequence coverage view, position selection, sequence widget
- Location: `CF/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/` (`js/proteinSequenceWidgetDisplay_Component_Data__Build.ts`,
  `js/proteinSequenceWidget_SinglePositionFlags.ts`, `js/proteinSequenceWidget_StateObject.ts`, `jsx/proteinSequenceWidgetDisplay_Root_Component_React.tsx`).
- Used by: single-protein and experiment single-protein main content; the state object also by the engine, bar + structure widgets,
  `currentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget.tsx`, `Limelight_AnyFilter__HasFilterValue.ts`.
- How to use / extend: rebuild data with the builder when inputs change; selections live in `ProteinSequenceWidget_StateObject`.
- Do not use when: you need a scaled graphical view (bar widget, [charts_visualization.md](charts_visualization.md)).
- Limits and gotchas: the state object also holds the bar widget's start/end selections.
- Related / duplicates: bar and structure widgets share the state object ([charts_visualization.md](charts_visualization.md)).
- Status: verified (structure/users; JSX bodies skimmed)

### Annotation types to display — link + selection overlay
- What it solves: Fake-link that opens an overlay to choose which PSM / peptide / protein annotation types are shown; on save updates the
  search-data-lookup code and URL.
- Search keywords: choose columns, annotation types to display, show scores, column chooser
- Location: `DP/common_components__react/annotation_types_to_display__selection_update_component/`
  (`AnnotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component`, `open_AnnotationTypesToDisplay__SelectionOverlay`).
- Used by: protein list, single protein (2), feature detection, scan-file-to-searches main components.
- How to use / extend: render the main-page component with the data page state managers.
- Do not use when: changing cutoffs (search details overlay).
- Limits and gotchas: saves via `updatePageState_URL_With_New_SearchDataLookupParameters_Root` ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)); uses drag-and-drop for order.
- Related / duplicates: change-cutoffs overlay.
- Status: unverified (exports, users and save path only; overlay behavior not read)

### Search sub-group ("Sub Search") selection: state + helpers + UI + rename overlay
- What it solves: Track which sub-groups are selected on single-search pages (URL state or single-protein overlay state), helpers for the
  effective selected set / "all selected", filter UI in the details block and single-protein "Filter On", and a logged-in rename/reorder overlay.
- Search keywords: sub group, sub search, search sub group, subgroup selection, rename subgroups, condition within search
- Location: state class (see Self-registering central-state object); `DP/search_sub_group/js/searchSubGroup_Get_Selected_SearchSubGroupIds.ts`,
  `searchSubGroup_Are_All_SearchSubGroupIds_Selected.ts`; UI `DP/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock.tsx`
  (`SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_EmbedInSearchDetailsRootBlock_Root_...`, `SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component`);
  rename `DP/search_sub_group/search_sub_group_manage_group_names/` (POST `d/rws/for-page/psb/sub-groups-update-user-updatable-data-single-project-search-id`).
- Used by: state 20 files; get-selected 12; are-all 27; display-data creators by all `*_FiltersDisplay_ComponentData.ts`. Per-page duplicates
  `compute_searchSubGroup_Ids_Selected` / `compute_searchSubGroup_PropValue` live in page "nonClass functions" files (3-4 copies, not diffed).
- How to use / extend: always use `searchSubGroup_Get_Selected_SearchSubGroupIds`. Read `limelight_features_docs/limelight_search_sub_groups_deep_dive.md`.
- Do not use when: multi-search views (state cleared when projectSearchIds != 1).
- Limits and gotchas: rename overlay calls `search-name-list-from-psi` directly instead of `retrieveSearchNamesFromServer`.
- Related / duplicates: page nonClass function copies.
- Status: verified

---
## Search details block

### Search Details and Filter block (`SearchDetailsAndFilterBlock_MainPage_Root`)
- What it solves: The standard block at the top of Peptide / Protein / Mod / QC / scan-file-to-searches / feature-detection pages: each
  search's name + real search id, tags, cutoffs and annotation types shown, an expandable details panel, sub-group selection, and the
  "Change Searches" / "Re-order Searches" / "Remove Search" links.
- Search keywords: search details, filter block, cutoffs display, search header, change searches, reorder searches, verbose view, search tags under name
- Location: `DP/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root.tsx` (props `propValue:
  SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue`, sub-group state manager, callbacks; optional `select_ONLY_ONE_Search`,
  `changeSearches_Clicked_Override_Callback`, `removeSearchesClickedCallback`); grid wrapper
  `DP/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_Layout.tsx`
  (`SearchDetailsAndOtherFiltersOuterBlock_Layout`, props `children`, `projectSearchIds`).
- Used by: peptide, protein list, single protein, mod, QC, scan-file-to-searches, feature-detection main components (same 7 use the layout).
- How to use / extend: build a `..._Props_PropValue` (state managers, `SearchDetailsBlockDataMgmtProcessing`, logged-in factory,
  `filterValuesChanged_Callback` ...); pass a NEW propValue object to re-render (documented WARNING). Put it and the filter rows inside the
  layout (`max-content auto` columns for multi-search, 3 columns for one search). Logged-in actions come through the logged-in factory getters.
- Do not use when: the project page (own search row component, which reuses the expanded details panel).
- Limits and gotchas: renaming a search reloads the whole page. "Verbose" checkbox stored in sessionStorage. The cutoff overlay shows the
  real search id from the loaded names. Layout children must respect the column count or rows mis-align.
- Related / duplicates: sub-group UI; project page search entry.
- Status: verified (re-checked)

### `SearchDetailsBlockDataMgmtProcessing` (accessor for the page's cutoffs / annotation-type-display object)
- What it solves: One place to read and store the page's `SearchDataLookupParameters_Root` held in a `DataPageStateManager`, and get the
  entry for one projectSearchId for a webservice call.
- Search keywords: search data lookup parameters, cutoffs for webservice, filter criteria, ann type display, getSearchDetails_Filters_AnnTypeDisplay
- Location: `DP/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing.ts` (`storeSearchDetails_Filters_AnnTypeDisplay_Root`,
  `..._ForWebserviceCalls_AllProjectSearchIds`, `..._ForWebserviceCalls_SingleProjectSearchId`).
- Used by: `dataPageStateManager.ts`, `updatePageState_URL_With_NewFilterCutoffs_FromUser.ts`, feature-detection root, mod page state bag, protein widgets.
- How to use / extend: construct once per page with the "ProjectSearchIdsTheirFiltersAnnTypeDisplay" `DataPageStateManager`; pass down.
- Do not use when: you need a resolved typed object (returns the raw parsed object).
- Limits and gotchas: returns the LIVE stored object (no copy) — callers that mutate it mutate page state (Change Searches does). Single lookup
  throws if the id is missing. Large commented-out block remains.
- Related / duplicates: client-side lookup params classes ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Status: verified

### Change Search Filters (cutoffs) overlay
- What it solves: The modal where a user edits PSM / peptide / protein / mod-position cutoffs for every search; on Save validates numbers,
  rebuilds lookup params and updates URL / page.
- Search keywords: change cutoffs, edit filters, filter values overlay, score cutoff input, annotation filter edit
- Location: `DP/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_UserInputInOverlay.ts` (`openOverlay(...)`),
  `.../jsx/searchDetailsAndFilterBlock_UserInput_OverlayContents.tsx`.
- Used by: details root, feature-detection page, mod page, peptide / protein / scan-file-to-searches nonClass functions.
- How to use / extend: construct with both `DataPageStateManager`s, `SearchDetailsBlockDataMgmtProcessing`, `filterValuesChanged_Callback`.
  Apply goes through `UpdatePageState_URL_With_NewFilterCutoffs_FromUser` -> `updatePageState_URL_With_New_SearchDataLookupParameters_Root` ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Do not use when: changing annotation types displayed (separate overlay).
- Limits and gotchas: parsing is `Number.parseFloat` + `isNaN`; deep-copies params with `copyObject_DeepCopy_Limelight`.
- Related / duplicates: experiment per-search cutoff editor (parallel UI for the project page builder).
- Status: verified

### Change Searches / Re-order Searches (navigate with a new lookup code)
- What it solves: Add/remove searches or change their order: computes the new params, asks the server for a new lookup code, builds the URL
  (keeping page state) and navigates, with an "update in progress" overlay.
- Search keywords: change searches, add search to page, remove search, reorder searches, new lookup code
- Location: `DP/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_ChangeSearches.ts` (`open_ChangeSearches_Overlay`),
  `.../js/searchDetailsAndFilterBlock_Re_Order_Searches.ts`; overlays `.../jsx/searchDetailsAndFilterBlock_ChangeSearches_OverlayLayout.tsx`,
  `..._Re_Order_Searches_OverlayLayout.tsx`, `..._UpdateInProgress_OverlayLayout.tsx` (x2).
- Used by: details root; mod page groups component and feature-detection page import ChangeSearches.
- How to use / extend: reached via the details links; `changeSearches_Clicked_Override_Callback` replaces the default behavior. Hosts
  `SearchSelection_DisplayedNestedInFolders_Component`.
- Do not use when: only cutoffs change.
- Limits and gotchas: posts `projectSearchIds_CreateDefault` (new searches get server defaults), then sets `window.location.href`. The lookup-code
  call + URL building are inline (5 inline call sites of `get-search-data-lookup-params-code` overall).
- Related / duplicates: shared URL updater ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Status: verified

### Search details "all users" loader + holder, and the expanded details panel
- What it solves: Loads expanded per-search details (`d/rws/for-page/psb/get-search-details-all`: search files, FASTA, scan files, web links,
  comments, programs) merged with names / sub-groups; a mutable holder with a change-tracking token for project-page sharing; and the panel
  that renders them, including file downloads via the form-POST + download-identifier flow.
- Search keywords: search details, search files, fasta file, scan files list, web links, comments, search programs, details panel, download FASTA
- Location: `DP/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer.ts`
  (`..._Result_Root`, `..._Result__Root__HolderObject_Class` with `get_latestUpdateTracking_Object()`);
  `.../jsx/searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers.tsx` (`Internal__FASTA_File_Component`, `Internal__Scan_File_Component`,
  `Internal__SearchFile_Entry_Component`).
- Used by: details root, project page root container, searches section, search entry row, FD and scan-file sections.
- How to use / extend: pass `retrieveSearchNamesFromServer_Result__Optional__AssumedToBeUpToDate` when names are already loaded. For a new
  server download, see the form-POST download flow ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)) — no shared helper; factor one out rather than adding a fifth copy.
- Do not use when: you only need names / ids (`searchNameRetrieval.ts`).
- Limits and gotchas: response `as`-cast (no runtime validation); holder `delete_...` does not reset the token. Download flow copy-pasted 4x in
  this file + 3x elsewhere. Web links are rendered through `sanitizeURL_ForHrefOrNavigation__ExternalLinkSafeUrlOrNull` ([security_access_control_sessions.md](security_access_control_sessions.md)).
- Related / duplicates: blib download, PSM download ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) / [storage_files_external_services.md](storage_files_external_services.md)).
- Status: verified (structure + one download flow read; others by grep)

### Logged-in search edit overlays (comments, web links, search file name, search name / short name)
- What it solves: Small overlays / calls to add, change, delete a comment; add, delete a web link; rename a search file's display name;
  edit a search's name + short name.
- Search keywords: add comment, edit comment, delete comment, add web link, rename search file, rename search, search short name
- Location: `DP/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__{Comment__Add,Comment__Change,WebLink__Add,SearchFile_Name__Change}_Overlay.tsx`,
  `.../js/..._LoggedInUsers__{Comment,WebLink}__Delete.ts` (URLs `insert-comment`, `update-comment`, `delete-comment`, `insert-web-link`,
  `delete-web-link`, `update-search-filename` under `d/rws/for-page/`); `DP/common_components__react/search_name_and_search_short_name__user_change_overlay/searchName_and_SearchShortName_Change_Component_and_WebserviceCall.tsx`
  (`d/rws/for-page/search-name-search-short-name-update`).
- Used by: through `DataPages_LoggedInUser_CommonObjectsFactory` getters (details panel); name change also by `projectPage_SearchesAdmin.ts`.
- How to use / extend: get the function from the factory; call with position + ids + change callback. Template for a small edit popup.
- Do not use when: n/a.
- Limits and gotchas: web-link client check is a basic `^https?://` regex; server re-checks. Edited name is the per-project name (assumption
  from repo CLAUDE.md, not traced).
- Related / duplicates: small positioned edit popup.
- Status: verified (exports, URLs, users; bodies skimmed)

---

## Search tags

### Search tag data loaders (tags / categories for projectSearchIds or a project)
- What it solves: Thin webservice wrappers returning tags (with colors) and categories.
- Search keywords: search tags, tag categories, get tags for search, tags in project, userCanEditSearchTags
- Location: `DP/search_tags__display_management/search_tags__manage_for_search/searchTags__Get_For_ProjectSearchIds.ts`
  (`d/rws/for-page/search-tags-get-for-project-search-id-list`), `..._AND_AllDistinct_For_Assoc_ProjectId.ts`,
  `.../search_tags__manage_for_project/searchTags__Get_For_ProjectId.ts` (`search-tags-get-for-project-id`),
  `.../search_tag_categories___get__for__project_id__or__project_id_from_project_search_ids.ts` (populate exactly one of `projectIdentifier` / `projectSearchIds`).
- Used by: `loadCoreData_ProjectSearchIds_Based.ts`, `dataPageStateManager.ts`, manage-tags overlays, the upload overlay.
- How to use / extend: call and await.
- Do not use when: you need searches + tags + folders together (`getSearchesSearchTagsAndFolders_SingleProject_OrFrom_ProjectSearchIds`, [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Limits and gotchas: raw Promise (no `{ data, promise }` cache); `as`-cast; response fields snake_case (`tag_id`, `tag_string`) vs camelCase in UI classes.
- Related / duplicates: two tag-loading paths.
- Status: verified

### `Search_Tags_Selections_Object` (basic tag filter state: OR / AND / NOT sets)
- What it solves: Value object for the basic tag filter: three `ReadonlySet<number>` (`searchTagIdsSelected_Boolean__OR`, `__AND`, `__NOT`),
  `createEmptyInstance()`, `clone()`, `is_any_selections()`.
- Search keywords: tag filter selection, any/all/not tags, tag filter state
- Location: `DP/search_tags__display_management/search_Tags_Selections_Object.ts`.
- Used by: folder search selector, project searches container + its sessionStorage helper, organize-searches folder overlay.
- How to use / extend: build new instances (constructor throws if a set is missing).
- Do not use when: grouped expressions.
- Limits and gotchas: no `matches(tagIdSet)` method — the AND/NOT/OR evaluation loop is copied in 3 files.
- Related / duplicates: grouped builder.
- Status: verified

### Basic "Filter On Tags" selector + selected-tags summary (`Search_Tags_SelectSearchTags_Component`)
- What it solves: Clickable tag chips grouped by category; clicking opens a small ANY / ALL / NOT chooser; emits a new selections object; the
  companion shows "Filtering on tags:" with clear. Its `..._SearchTagData_Root` / `..._SingleSearchTag_Entry` classes are the de facto shared
  tag data shape.
- Search keywords: tag filter UI, select tags, filter searches by tag, tag chips, filtering on tags summary
- Location: `DP/search_tags__display_management/search_tags_SelectSearchTags_Component/search_Tags_SelectSearchTags_Component.tsx`,
  `.../search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component.tsx`.
- Used by: folder search selector, project searches container, organize-searches folder overlay; data classes by the grouped builder,
  `SearchTags_TagLookupMaps`, scan-file / FD list components.
- How to use / extend: pass `searchTagData_Root`, selections, change callback, optional `searchesPerTagId_Map`.
- Do not use when: nested AND/OR groups (grouped builder).
- Limits and gotchas: chooser popup mounted with its own `createRoot` (not the shared helper). Never-stored `searchTagData_Root_Prev` -> rebuild every render.
- Related / duplicates: tag data classes copied in the under-name component (comment says to keep them in sync).
- Status: verified

### Tags under a search's name (`Search_Tags_DisplaySearchTags_UnderSearchName_Component`)
- What it solves: Renders a search's tags (optionally with category labels, "verbose") under its name, plus "Add Tags" / change links for owners.
- Search keywords: show search tags, tag chips under search name, add tags link, verbose tags
- Location: `DP/search_tags__display_management/search_tags__display_under_search_name/search_Tags_DisplaySearchTags_UnderSearchName_Component.tsx`.
- Used by: details root, folder selector, project search entry, project searches list, organize-searches folder overlay (direct importers); scan-file and FD list components via the shared project search entry component.
- How to use / extend: pass `show_SearchTag_Categories`, `searchTagIds_OnSearch_Set`, `searchTagData_Root`; click callbacks only for owners.
- Do not use when: selecting tags for filtering.
- Limits and gotchas: same never-stored prev issue; duplicate data classes.
- Related / duplicates: selector.
- Status: verified (re-checked)

### Manage tags on searches overlay (Version 2) and project tag/category editor
- What it solves: "Select/Add Tags to Search" modal (toggle tag per click with immediate server add/remove, create tags) for one or more
  searches; project-level editor for tag strings, colors and categories (CRUD).
- Search keywords: add tag to search, remove tag from search, tag searches, manage search tags, edit tags, tag colors, tag categories
- Location: `DP/search_tags__display_management/search_tags__manage_for_search/search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent.tsx`
  (`open_..._Version_2_OverlayComponent_Overlay({ mainParams })`; URLs `search-tags-add-tag-to-project-search-id-list`,
  `search-tags-remove-tag-from-project-search-id-list`); `.../search_tags__manage_for_project/search_Tags_Manage_TagsForProject_OverlayComponent.tsx`
  (`open_Search_Tags_Manage_TagsForProject_OverlayComponent_Overlay`; uses `SearchTag_ColorOptions_Constants`, `SearchTag_Max_FieldLengths_Constants`).
- Used by: V2 via the logged-in factory, `projectPage_SearchesAdmin.ts`, project search entry; project editor via `projectPage_SearchesAdmin.ts`.
- How to use / extend: `mainParams = { searches: [{ projectSearchId }], tagsChangedOnSearches_Callback }`.
- Do not use when: (V2) editing tag text/colors; (project editor) assigning tags.
- Limits and gotchas: V1 overlay file entirely commented out (dead). V2 has an unused `_searchTags__Update_For_ProjectSearchIds` posting to an
  endpoint whose server constant is commented out (dead, would fail). Project editor about 3,000 lines, skimmed only. Tag color fields can be
  empty — never concatenate them into a CSS shorthand (use `groupedTagChip_SharedHelpers__chip_BorderColor`, which falls back to `transparent`).
- Related / duplicates: V1 dead file.
- Status: verified for the Version 2 overlay; unverified for the project editor (exports, URLs, one user only)

### Grouped (advanced) tag filter builder, preview, picker, chip helpers, lookup maps
- What it solves: Build and display boolean tag expressions `( a AND b ) OR ( c OR NOT d )`: per-group AND/OR, one between-groups operator,
  per-tag NOT; read-only preview; stay-open picker modal; shared chip colors/tooltips; immutable tag lookup maps built once per data load.
- Search keywords: advanced tag filter, grouped tag filter, boolean expression builder, CNF DNF, tag picker, tag chip, negated tag, filter preview
- Location: `DP/search_tags__display_management/tag_filter_expression_builder_grouped_component/` (`tag_Filter_Expression_Builder_Grouped_Component.tsx`
  with types `..._Expression`, `..._Seed_Group`, `..._Seed_Literal`; `tag_Filter_Expression_Preview_Component.tsx`;
  `tag_Filter_Expression_TagPicker_Overlay.tsx` (`tagFilter_Expression_TagPicker_Overlay__openOverlay`, `closeAfterPick`, `onOverlayClosed`);
  `groupedTagChip_SharedHelpers.tsx`); `DP/search_tags__display_management/searchTags_TagLookupMaps.ts`.
- Used by: `projectPage_SearchesSection_MainBlock_Container_Component.tsx` only (which also holds the private evaluator `_advanced_TagFilter_Matches`).
- How to use / extend: read `limelight_features_docs/project_page_advanced_tag_filter.md` first; seed with `initial_Groups`, receive
  `expression_Changed_Callback`; build `SearchTags_TagLookupMaps` on data load and pass the instance down; batch picker changes until close.
- Do not use when: simple ANY/ALL/NOT suffices.
- Limits and gotchas: evaluator not exported — another page would need to extract it. Empty group blocks all searches (by design); pristine builder shows all.
- Related / duplicates: basic evaluator copies.
- Status: verified

### `searchTags_SearchCount_Display` ("N searches have this tag")
- What it solves: Single source for the per-tag search-count sentence and tooltip line.
- Search keywords: tag count tooltip, searches with tag, pluralization
- Location: `DP/search_tags__display_management/searchTags_SearchCount_Display.tsx` (`__countForTagId`, `__sentence`, `__tooltipLine`).
- Used by: selector, selected summary, grouped builder, preview, picker, chip helpers.
- How to use / extend: pass an optional `ReadonlyMap<tagId, count>` (caller computes counts).
- Do not use when: n/a.
- Limits and gotchas: returns null/undefined when no map.
- Related / duplicates: none.
- Status: verified

---

## Search selection and project-page search list

### Search selection in folders (`SearchSelection_DisplayedNestedInFolders_Component`)
- What it solves: Reusable "choose searches" UI: project searches nested in folders, filter by name / search id text and basic tags,
  single-select (name as fake link) or multi-select (checkboxes), keeps previous order, can block searches without proteins; returns
  `..._Selected_Searches_Data_Object` (`get_ProjectSearchIds_Selected_Additions_In_DisplayOrder()` ...).
- Search keywords: choose searches, search picker, select searches, folders, change searches overlay, experiment cell searches
- Location: `DP/search_selection__displayed_nested_in_folders__React_Component/searchSelection_DisplayedNestedInFolders_Component.tsx`.
- Used by: Change Searches overlay, scan-file search selection overlay, experiment main-cell change-searches overlay.
- How to use / extend: pass `projectIdentifier` OR an already-loaded `searchesSearchTagsFolders_Result_Root`, previous selection,
  `callback_updateSelected_Searches`; host inside a modal.
- Do not use when: the project page itself (its list has project-page-only parts).
- Limits and gotchas: `get_ProjectSearchIds_Selected_IterableIterator()` order is not display order. Contains its own basic tag evaluation.
  `searchSelection_OrderSelectionResult.ts` beside it is fully commented out.
- Related / duplicates: project page searches list; organize-searches folder overlay (parallel list/filter implementations).
- Status: verified (re-checked)

### Pick a search that used a given scan file (`open_Common_Search_Selection_For_ProjectScanFileId_Overlay`)
- What it solves: "Choose the search to display" restricted to projectSearchIds associated with a projectScanFileId.
- Search keywords: choose search for scan file, scan file searches, projectScanFileId searches picker
- Location: `DP/common__search_selection__for__project_scan_file_id__component__react/common_Search_Selection_For_ProjectScanFileId_OverlayLayout.tsx`.
- Used by: feature-detection view page.
- How to use / extend: call with `projectScanFileId`, previous selection and two callbacks; overlay removes itself.
- Do not use when: selection is not scoped to a scan file.
- Limits and gotchas: always async (uses the `_ReturnPromise` path).
- Related / duplicates: sibling wrappers around the folder selector.
- Status: verified

### Project page search list with folders, selection object, and reusable search row
- What it solves: Renders searches grouped in folders with checkboxes, expand/collapse-all, selection order, per-search details/tags/links;
  selection object answers "what is selected, in which order"; the single-search row is reused by other project-page sections.
- Search keywords: search list, folders, select searches, selected searches order, compare searches, search row, search entry
- Location: `PP/project_page_main_page_react_based/jsx/projectPage_SearchesSection_SearchesAndFoldersList_Component.tsx`
  (`..._Selected_Searches_Data_Object`: `is_ANY_Search_Selected`, `get_Number_Searches_Selected`, `get_ProjectSearchIds_Selected_Additions_In_DisplayOrder`);
  `PP/project_page_main_page_react_based/jsx/projectPage_SearchEntry_UsedInMultipleSections_Component.tsx`.
- Used by: searches container; row also by scan-file and FD run lists.
- How to use / extend: reuse the row inside project-page sections that list searches.
- Do not use when: choosing searches in an overlay outside the project page (folder selector).
- Limits and gotchas: header TODO — row deletes entries from props arrays on delete ("a little hacked").
- Related / duplicates: folder selector.
- Status: verified (render bodies skimmed)

### Project page search list filtering (name / search id text, basic tags, advanced grouped expression)
- What it solves: Decide which searches and folders to show for the current text filter and tag filter.
- Search keywords: filter searches, search tag filter, tag boolean expression, AND OR NOT tags, grouped filter, search name filter, search id filter
- Location: `PP/project_page_main_page_react_based/jsx/projectPage_SearchesSection_MainBlock_Container_Component.tsx`
  (`_searchesAndFolders_Update_FilterOnSearchTags`, `_advanced_TagFilter_Matches`, `_advanced_TagFilter_HasEmptyGroup`). Text match: name
  contains (case-insensitive) or search id (`search_tbl.id`) contains; a folder shows if any contained search passes.
- Used by: only this container (private).
- How to use / extend: read `limelight_features_docs/project_page_advanced_tag_filter.md`; extract into a function to reuse.
- Do not use when: n/a (not exported).
- Limits and gotchas: active advanced filter with an empty group matches nothing; pristine builder matches everything.
- Related / duplicates: basic loop re-implemented in the folder selector and organize-searches overlay.
- Status: verified

### Open a data page from selected searches or a project scan file (`ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod`)
- What it solves: Builds the URL for Peptide / Protein / Mod / QC / scan-file-to-search pages from selected searches (`projectSearchIdCode`s)
  or a project scan file and navigates (ctrl/cmd-click -> new tab with `noopener`).
- Search keywords: open peptide page, open protein page, open mod page, QC page link, data page URL, project search id code, scan file code, ctrl click
- Location: `PP/project_page_main_page_react_based/js/projectPage_SearchesSection_Open_DataPages_PeptideProteinMod.ts`
  (`..._Initialize()` reads DOM ids `url_path__peptide`, `url_path__protein`, `url_path__mod_view`, `url_path__qc`, `url_path__scan_file_to_search`,
  code delimiter ids, all emitted by `projectView.jsp`; static `peptide_View_OpenDataPage`, `protein_View_OpenDataPage`, `mod_View_OpenDataPage`,
  `qc_View_OpenDataPage`, `scanFileToSearch_View_OpenDataPage`).
- Used by: searches container (Initialize in `componentDidMount`), search entry row, scan-file list.
- How to use / extend: Initialize once, then call with `ctrlKeyOrMetaKey: event.ctrlKey || event.metaKey`. URL ends in `/r`; the server builds
  the default lookup code (applying project-wide cutoff overrides).
- Do not use when: outside the project page (DOM ids exist only there).
- Limits and gotchas: private `_getSearchDataLookupParamsCode` is dead. The scan-file code `"a" + scanFile_Code_FirstSix + projectScanFileId.toString(35)`
  is built inline (duplicates `scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc`, [charts_visualization.md](charts_visualization.md) / [domain_utilities.md](domain_utilities.md)).
- Related / duplicates: inline base-35 code builders (3 places).
- Status: verified

---

## Project page sections and settings

### Collapsible section header ("TopLevelLabel" components) and lazily mounted sections
- What it solves: Section title with expand/collapse arrow (pointer-right / pointer-down) and help tooltip; `_expanded` on the instance; parent's
  expanded / collapsed callback runs in `setTimeout(…, 50)` so the arrow re-renders first. QC sections additionally do not mount children
  until first expand, then hide with `display:none`.
- Search keywords: collapsible section, expand collapse, section header, show hide section, top level label, twisty, lazy mount on expand
- Location: e.g. `PP/project_page_main_page_react_based/jsx/projectPage_SearchesSection_Common_TopLevelLabel_Component.tsx` (exports
  `..._Expanded_Default = true`); `PP/project_page_experiments_section/projectPage_ExperimentSection_Common_TopLevelLabel_Component.tsx`;
  `ProjectPage_UploadData_MainPage__TopLevelLabel_Component` in the upload main component; QC lazy sections `PSB/qc_page/qc_*_sections/jsx/*`.
- Used by: 9 near-identical project-page copies (searches, saved views, researchers, share data x2, scan files, FD runs, upload, experiments);
  QC sections (three variants each).
- How to use / extend: copy one (no generic component exists); keep `_sectionExpanded` / `_sectionEverExpanded` on the instance.
- Do not use when: the data-page filter area (use the show/hide filters container).
- Limits and gotchas: copies differ only by labels/text (about 20 diff lines after renaming). 19 `.tsx` files mention `TopLevelLabel` (grep).
- Related / duplicates: all copies; filter show/hide container.
- Status: verified

### Project-wide default filter cutoff overrides (UI + load / save)
- What it solves: Owner overrides, per search program and annotation type, the default PSM / peptide / protein cutoffs from the import file;
  applied when searches are opened from the project page and when a search is added to an experiment.
- Search keywords: default cutoffs, default filter, project level cutoffs, override cutoffs, q-value default
- Location: `PP/project_page__set_project_wide_default_filter_cutoffs_overrides/` (`js/set_ProjectWide_DefaultFilter_Cutoffs_Overrides.ts`,
  `js/..._GetDataFromServer.ts`, `js/..._SaveDataToServer.ts` -> `d/rws/for-page/project-level-filter-default-cutoffs-override_MAINT--save`,
  `jsx/..._Overlay.tsx`); read loader `defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval` ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- Used by: `ProjectPage_SearchesAdmin`; button in the searches container; read loader also by the experiments section.
- How to use / extend: read effective overrides with the loader. GetDataFromServer is a template for using annotation-type / program loaders
  outside a data page (throwaway `DataPageStateManager` instances).
- Do not use when: per-user saved filters (saved / default view).
- Limits and gotchas: overrides applied in two places — server default lookup-code builder and experiments front end
  (`create_experiment_SearchFilterValuesFromDefaultCutoffs.ts`); equivalence unverified.
- Related / duplicates: those two mechanisms ([domain_utilities.md](domain_utilities.md) owns the server builder).
- Status: verified (front end); server side by grep only

### Delete searches and copy searches overlays
- What it solves: Confirm deletion of project searches after listing experiments that contain them; copy searches to another project
  (flagging searches already in the target).
- Search keywords: delete search, confirm delete, experiments containing search, copy search to project
- Location: `PP/project_page_main_page_react_based/jsx/projectPage_SearchesAdmin_DeleteSearch_Overlay_Component.tsx` (`d/rws/for-page/delete-project-search`),
  `js/projectPage_ListExperimentsContainingProjectSearchIds.ts` (`list-experiments-containing-project-search-ids`);
  `jsx/projectPage_SearchesAdmin_CopyMove_Searches_Overlay_Component.tsx`, `js/..._CopyMove_Searches_Overlay_SupportCode.ts`.
- Used by: `ProjectPage_SearchesAdmin` only.
- How to use / extend: via `ProjectPage_SearchesAdmin`; the experiments lookup is a reusable loader. Delete entries carry both
  `projectSearchId` and real `searchId` (template for showing the real id).
- Do not use when: n/a.
- Limits and gotchas: "move" was removed but names still say CopyMove / copy-or-move. Server cleanup described in
  `limelight_features_docs/project_scan_file_attachment_model_and_search_delete_cleanup.md`.
- Related / duplicates: none.
- Status: verified (copy overlay body skimmed)

### Scan Files and Feature Detection Runs sections (near-clone list components) + mapping label/delete twins
- What it solves: List project scan files (download, delete, open scan-file browser, show searches / feature detection / gold standard, run
  feature detection) and feature-detection runs; owner edits label/description or deletes gold-standard / feature-detection mappings.
- Search keywords: scan files list, project scan file, download scan file, delete scan file, feature detection runs, Hardklor, Bullseye,
  gold standard, edit label, delete mapping
- Location: `PP/project_page__scan_files_view_section/all_users_incl_public_user/projectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component.tsx`,
  `PP/project_page__feature_detection_runs_view_section/all_users_incl_public_user/projectPage_FeatureDetection_Runs_View_Section_AllUsers_InclPublicUser_Interaction_FeatureDetection_Run_List_Component.tsx`;
  loaders `projectPage_ScanFiles_View_Section_Get_ScanFile_List_FromServer` (`scan-files-in-project-list`), `..._Get_ScanFile_Details_FromServer`,
  `..._Get_FeatureDetection_Runs_List_FromServer`, `..._Get_FeatureDetection_Run_Details_FromServer`; owner twins under
  `PP/project_page__scan_files_view_section/project_owner/` (`goldStandard_Label_Description_Change_Component_and_WebserviceCall.tsx`,
  `featureDetection_Label_Description_Change_Component_and_WebserviceCall.tsx`, two `..._MappingEntry_Delete_FromServer.ts`).
- Used by: root multi-section container; scan-file list loader also by the upload select-scan-file component; owner twins via the owner factory.
- How to use / extend: reuse the scan-file list loader for "scan files in this project" (`projectScanFileId`, `scanFileId`, `scanFile_Code_FirstSix`,
  `canDownload`, `standardRunImporter_IsFullyConfigured`, `runFeatureDetection_IsFullyConfigured`) — it is also the best example of a validated
  per-endpoint loader in this area.
- Do not use when: scan files per search ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) loaders).
- Limits and gotchas: the two list components are separate copies; the `*_IsFullyConfigured` booleans are not validated. Feature-detection view URL
  code (`"c/" + "a" + scanFile_Code_FirstSix + id.toString(35)`) built inline in both, reading DOM `url_path__feature_detection` per click. Label
  twins differ about 26 lines, delete twins 6 lines — a third mapping type would be a third copy.
- Related / duplicates: base-35 code builders; twins.
- Status: verified (render bodies skimmed)

### Project access management and sharing UI (researchers, invites, public access, project URL label, saved views list)
- What it solves: Owner changes a user's access level, removes users, invites / re-sends / revokes invites, enables public access or an access
  code, sets a custom project URL label; any user sees saved views.
- Search keywords: invite user, change access level, project owner, researcher, viewer, public access, access code, project label, saved views
- Location: `PP/project_page_main_page_react_based/researchers__section/**`, `share_data_section/**` (`ProjectPage_ShareDataSection_ProjectOwnerInteraction`),
  `jsx/projectPage_SavedViewsSection_*`; roots `ProjectPage__ResearchersSection__ProjectOwnerInteraction_ROOT_Component`,
  `ProjectPage_PublicAccessSection_ProjectOwnerInteraction_ROOT_Component`; access-level ids from DOM via
  `researchers__section/common/projectPage__ResearchersSection__CommonCode_Get_UserLevels_FromDOM.ts`.
- Used by: role-specific `*_SpecificComponentsForRoot_Component.tsx`; saved views by the root container.
- How to use / extend: reference for a new owner-only project setting; the saved-views row is the reference for safely rendering a stored URL.
- Do not use when: n/a.
- Limits and gotchas: the access-level DOM reader runs at module load and throws if its DOM ids are missing (importing it elsewhere breaks the
  bundle). Share-data static methods resolve raw `responseData` as `any`. Project lock/unlock and title/abstract changes reload the page.
- Related / duplicates: none.
- Status: verified (URLs, roots, users; bodies skimmed)

---

## Upload UI (browser import submission)

### Chunked browser file upload with per-chunk SHA-256 and adaptive chunk size (`ProjectPage_UploadData_SendUploadFileToServer`)
- What it solves: Sends one large browser `File` as a series of octet-stream POSTs; each chunk read with `File.slice().arrayBuffer()`, hashed
  with `crypto.subtle.digest('SHA-256')`, metadata in a base64 JSON header. Chunk size starts at 5% of the server max and adapts toward about 5 s per
  POST (min 0.5%), unless the server requires a fixed size (S3 multipart). Retries network errors / checksum mismatches up to 4 times; abort and
  progress callback (capped at 95%).
- Search keywords: chunked upload, multipart upload, large file upload, S3 multipart from browser, upload progress, checksum, SHA-256,
  XMLHttpRequest upload, abort upload, adaptive block size
- Location: `PP/project_page__upload_data_section/projectPage_UploadData_SendUploadFileToServer.ts` (class with `projectPage_UploadData_SendUploadFileToServer({ uniqueRequestIdentifier_ForThisFile })`,
  `abort_FileSend()`); endpoint `d/rws/for-page/project-upload-data-v2-upload-file-chunking-upload-file`; header `limelight_upload_file_params_json_base_64`
  via `encode_String_To_HttpHeaderValue_Base64` (`DP/data_pages_common/httpHeaderValue_Base64_EncodeDecode.ts`).
- Used by: the Limelight-XML(+scan files) and scan-files-only upload overlay components.
- How to use / extend: call the per-file initialize webservice first (chunk sizes), construct, `await` send, then per-file submit (or
  cancel-delete). Sends the sync-tracking header itself. A new file kind needs a server endpoint accepting the same header (URL is hard-coded).
- Do not use when: small files (single-request helpers); outside a browser (CLI has its own, [storage_files_external_services.md](storage_files_external_services.md)).
- Limits and gotchas: Promise resolves even on errors (check `statusSuccess`); on cancel returns `undefined` and both callers read
  `sendResult.statusSuccess` unguarded (seen in code, not runtime-tested). Strictly serial. 400-response flags must stay in sync with the server.
  Request id `"MS" + Date.now()` built in each caller.
- Related / duplicates: single-request helpers; structure-file upload DAO ([webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)); Java CLI uploader.
- Status: verified (re-checked)

### Limelight XML / scan file upload session protocol (initialize, per-file init, send, per-file submit, cancel, final submit)
- What it solves: Client half of import submission: upload session (`uploadKey`), per-file initialize (chunk sizes), send, submit file or
  cancel-delete, then submit the import (search name, short name, tags/categories, file list), which queues it.
- Search keywords: import submit, upload key, submit import, queue import, upload initialize, cancel upload, import Limelight XML from browser
- Location: `PP/project_page__upload_data_section/projectPage_UploadData_UploadFiles__Common_Init_AND_Submit_Upload__LimelightXMLFile_AndOr_ScanFile.ts`
  (`..._Init_Upload_...` -> `project-upload-data-upload-initialize`, `..._SingleFileUpload_Initialize_...` -> `...-v2-upload-file-initialize`,
  `..._SingleFileUpload_Submit_...`, `..._SingleFileUpload_Cancel_Delete_...`, `..._Submit_Upload_...` -> `project-upload-data-upload-submit`).
- Used by: the two upload overlay components (orchestration `_upload_File` copy-pasted in both).
- How to use / extend: follow `_upload_File` in the Limelight-XML component. Uses `webserviceCallStandardPost` with `dataRetrieval_CanRetry: false`; runtime-checked responses.
- Do not use when: non-search uploads (gold standard, feature detection).
- Limits and gotchas: several functions `promise.catch(() => {})` without `reject` — on failure the Promise never settles (they rely on the
  standard error handling / reload). Queue side is [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md).
- Related / duplicates: Java CLI flow (non-v2 endpoints); feature-detection init/upload/submit (third copy of the shape).
- Status: verified

### Single-request whole-file upload helpers (gold standard, feature detection)
- What it solves: Upload a small/medium file in ONE octet-stream POST with params in the base64 JSON header.
- Search keywords: upload file, single POST upload, octet-stream upload, gold standard upload, Hardklor / Bullseye upload, feature detection upload
- Location: `PP/project_page__upload_data_section/project_page__import_and_pipeline_run/` (`projectPage_UploadData_GoldStandard_Import_UploadFile_SendFileToServerWebservice.ts`,
  `..._FeatureDetection_Import_UploadFile_SendFileToServerWebservice.ts`, `..._FeatureDetection_Run_UploadFile_SendFileToServerWebservice.ts`;
  plus `..._Initialize_CallWebservice.ts` / `..._Submit_CallWebservice.ts`).
- Used by: gold-standard / feature-detection submit components in that directory.
- How to use / extend: copy one; change URL, send-data class and header fields.
- Do not use when: files can be large (no chunking, checksum or retry).
- Limits and gotchas: raw XHR; each calls `window.alert` itself. `upload_Bullseye_File_Contents_For_ScanFile_Project_SendFileToServerWebservice.ts`
  has no importer and no server endpoint (dead).
- Related / duplicates: four near-identical copies.
- Status: verified

### Upload overlay opener, select-scan-file component, import status list, CLI info overlay
- What it solves: Opens the "Import Data Files" modal (Limelight XML + scan files, scan files only, or for a pre-selected scan file:
  gold-standard import, Hardklor/Bullseye import or run); a scan-file picker for the project; the pending / history import list with manual
  refresh and a "Data has finished importing. Reload page?" prompt when a new completed id appears; and CLI import instructions + per-user
  submit-import key management.
- Search keywords: import overlay, upload dialog, import data files, scan file picker, import status, pending imports, upload history,
  reload page after import, submit import key, CLI import instructions
- Location: `PP/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay.tsx` (`projectPage_UploadData_UploadFiles__OpenOverlay`);
  `project_page__import_and_pipeline_run/open_*.ts`; `projectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Component.tsx`
  (`ProjectPage_UploadData_UploadFiles__Common_ScanFileSelection`); status in
  `project_page__upload_data_section__main_page/projectPage_UploadData_MainPage_Main_Component.tsx` and
  `..._Pending_and_History_Sections_Display_Component.tsx` (`_eval_displayData_FromServer_for_New_SuccessfulCompletion_Additions`; lists
  `d/rws/for-page/project-upload-data-list-submitted-items`); `projectPage_UploadData_SubmitImportProgramInfo_Overlay.tsx`
  (`user/rws/for-page/user-submit-import-key-manage`).
- Used by: status section mounted by the owner `SpecificComponentsForRoot`; `open_*` reached via the owner factory; picker by the three
  gold-standard / FD select components.
- How to use / extend: add a new import kind as a choice in the overlay plus an `open_*` exposed through the owner factory. Refresh status
  from elsewhere with the exported `refresh_...` function.
- Do not use when: you need automatic polling — there is NO timer (reload only on load, Refresh button, after submit, or the refresh function).
- Limits and gotchas: accepted scan suffixes fetched from server; default `[".mzML", ".mzXML"]`. Picker props are the whole upload params class.
  The status enum is a front-end copy of server values. `projectPage_UploadData_SubmitImportProgramInfo.ts` is fully commented out.
- Related / duplicates: module-level refresh function.
- Status: verified (overlay internals skimmed)

---

## Experiments UI (project-page builder and experiment data pages)

### Project-page experiment builder support (load all searches data, client-side default cutoffs, per-search cutoff editor, save/load)
- What it solves: One call loading everything needed to build per-search filters for every project search (searches/tags/folders, programs,
  annotation types, project-wide cutoff overrides); fill default cutoffs per search client-side; a per-search cutoff editor form; save
  (draft or final), get, list, delete experiments.
- Search keywords: experiment builder, load searches for project, default cutoffs, project-wide cutoff overrides, edit cutoffs per search,
  save experiment, draft experiment, experiment list
- Location: `PP/project_page_experiments_section/projPg_Expermnts_Load_SearchesData_ForProject.ts` (`getSearchesDataForProject_ExperimentProcessing`),
  `create_experiment_SearchFilterValuesFromDefaultCutoffs.ts`, `experiment_User_Set_Searches_Filters.tsx`, `projPg_Expermnts_Single_MaintRoot.tsx`
  (`_saveExperimentToServer`, `d/rws/for-page/experiment/add-save-experiment`), `projPg_Expermnts_Load_ExperimentData.ts`, `projPg_ExpermntsSectionRoot.tsx`,
  `projPg_Expermnts_LoggedInUsersInteraction.ts` (`ProjectPage_ExperimentsSection_LoggedInUsersInteraction`).
- Used by: experiment section only; interaction object created by owner and researcher entry files.
- How to use / extend: reference for storing a structured JSON object plus a lookup-params root on the server. Condition model classes are [domain_utilities.md](domain_utilities.md).
- Do not use when: on data pages (server defaults; search-details cutoff overlay).
- Limits and gotchas: creates throwaway `DataPageStateManager`s; plain Promise; loads every project search. Client default cutoffs parallel the
  server builder (equivalence unverified). `getExperimentDataFromServer` resolves untyped `any`. The editor's header claims experiment data-page
  use, grep finds one user. The maintenance overlay adds a raw `beforeunload` listener.
- Related / duplicates: search-details cutoff overlay; server default cutoffs.
- Status: verified (3.1k-line builder read only at its save path)

### Experiment conditions grid + selected conditions + condition-group order (data pages)
- What it solves: React grid drawing the experiment (first condition group as columns, later groups as nested rows, main cells) with click
  handlers, selection highlight and hover content; selection persisted in the URL with stale-selection cleanup; user re-order of condition
  groups (display only) via a drag-and-drop overlay, kept in the URL.
- Search keywords: experiment grid, condition grid, select conditions, selected cells, condition group order, reorder condition groups
- Location: `DP/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation.tsx` (+ props builder
  `create_experimentConditions_GraphicRepresentation_PropsData.ts`, cell ids `..._Cell_Identifiers.ts`); selections
  `experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections.ts`, `experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.ts`,
  `experiment_SelectedConditionIdsAndPaths_Clear_CentralStateManagerObject_If_AnySelection_NOT_Found_InExperiment.ts`; order
  `experiment_ConditionGroups_Order_CentralStateManagerObjectClass.ts`, `experiment_ConditionGroups_UpdateOrderFrom_Order_StateObject.ts`,
  `experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component_WithOpenFunction.tsx`.
- Used by: experiment page roots and MainContent components; project-page experiment list and builder; re-order overlay.
- How to use / extend: rebuild grid props when the container or order changes; root creates the main-page selection instance and runs the
  clear helper after loading.
- Do not use when: a plain list of conditions; changing the saved experiment (project-page builder).
- Limits and gotchas: grid imports a hover result type from a page feature dir (common depending on a page dir). Grid is a plain `<table>`.
- Related / duplicates: experiment condition model ([domain_utilities.md](domain_utilities.md)).
- Status: verified (rendering and selection algorithm skimmed)

---

## Drag-and-drop reorder and the organize-searches page

### Drag-and-drop list reorder (`@adaptabletools/react-beautiful-dnd`) and the splice idiom
- What it solves: Reorder a vertical list by dragging (searches, folders, condition groups, conditions, annotation types, sub-groups).
- Search keywords: drag and drop, reorder list, sortable list, change display order, move item, dnd, DragDropContext, Droppable, Draggable
- Location: library declared in `limelight_webapp/front_end/package.json`; template `DP/other_data_pages/project_organize_searches_page/project_OrganizeSearches__Re_Order_Searches_OverlayComponent.tsx`;
  others `project_OrganizeSearches_Main_Component.tsx`, `PP/project_page_experiments_section/projPg_Expermnts_Single_MaintRoot_ConditionGroupList.tsx`,
  `projPg_Expermnts_Single_ConditionGroupMaint.tsx`, `searchDetailsAndFilterBlock_Re_Order_Searches_OverlayLayout.tsx`,
  `annotationTypesToDisplay__SelectionOverlay__Component.tsx`, `searchSubGroup_Manage_GroupNames_OverlayComponent.tsx`, the experiment
  condition-group re-order overlay.
- Used by: the files listed.
- How to use / extend: one `DragDropContext` (nesting unsupported per code comments); `onDragEnd(result)` returns if `!result.destination`,
  then moves source -> destination.
- Do not use when: n/a (only drag-and-drop library in use).
- Limits and gotchas: NO shared "move array item" helper; the splice block (variable `destinationIndex_WhenAddFirst`) is copy-pasted 6 times in
  5 files; experiment components pass `{ sourceIndex, destinationIndex }` to a parent. `project_OrganizeSearches__Re_Order_Folders_OverlayComponent.tsx`
  is fully commented out.
- Related / duplicates: the copies.
- Status: verified (re-checked)

### Organize searches page (folders, order of searches and folders)
- What it solves: Separate page to create/rename/delete folders, put searches in folders, and reorder searches and folders; each change saved immediately.
- Search keywords: folders, organize searches, search order, display order, move searches into folder
- Location: `DP/other_data_pages/project_organize_searches_page/` (root `project_OrganizeSearches_ROOT.ts`; endpoints
  `d/rws/for-page/project-organize-searches-*`); server page controller `Project_OrganizeSearches_View_Controller`.
- Used by: standalone page.
- How to use / extend: reference for "save immediately; on `!responseData.status` call `limelight__ReloadPage_Function()`".
- Do not use when: n/a.
- Limits and gotchas: drag-end handlers fire the save and ignore the result (`catch(() => {})`, data reload commented out) — local and server order
  can drift until reload. Contains its own basic tag filter loop.
- Related / duplicates: re-order searches overlay on data pages.
- Status: verified (folder overlays skimmed)

---

## Colors and styling

### Search color palettes (`DP/color_manager`)
- What it solves: Consistent colors per projectSearchId, per sub-group, or per N categories (charts); HSV "pretty" theme.
- Search keywords: colors, palette, search colors, chart colors, category colors, color per search, sub search colors, color manager
- Location: `DP/color_manager/limelight_Colors_For_MultipleSearches_and_OtherUses.ts` (`getInstance({numberOfColors})`, `getColor_ForIndex`),
  `limelight_Colors_For_MultipleSearches.ts` (`get_Color_AsHexString_By_ProjectSearchId`), `limelight_Colors_For_SingleSearch__SubSearches.ts`
  (`get_Color_AsHexString_By_SearchSubGroupId`), `colorTheme_Pretty.ts`, `colorUtils.ts` (`HSVtoRGB`, `RGB_to_Hex_ColorString_NoHashPrefix`).
- Used by: search details root, QC main + QC color adapters ([charts_visualization.md](charts_visualization.md)), sub-group block.
- How to use / extend: build once per id list; same id order gives same colors.
- Do not use when: n/a.
- Limits and gotchas: `colorTheme` param of `Limelight_Colors_For_MultipleSearches.getInstance` is ignored. `searchColorManager.ts` fully commented out.
  MultipleSearches vs SubSearches classes differ only by id name (diffed).
- Related / duplicates: QC color adapters are pass-throughs ([charts_visualization.md](charts_visualization.md)).
- Status: verified (re-checked)

### Brand colors, SCSS variables, and shared CSS utility classes
- What it solves: One compiled stylesheet with shared variables/mixins; a TS mirror of SCSS colors/font so TS never hard-codes hex; reusable
  utility classes (`fake-link` and variants, `clickable`, `icon-small`/`icon-large`, `error-text`, `gray-text`, `standard-border-color-*`,
  `standard-background-color-*`, `block-updating-overlay-container`, `modal-dialog-overlay-background/container`, error/success message
  containers, data-table classes, search-tag and filter-on classes).
- Search keywords: CSS, SCSS, sass, stylesheet, theme colors, brand color, site green, font, variables, fake link style, icon size, utility class
- Location: `STY/global.scss` (entry; built to `static/css_generated/global.css` by `limelight_webapp/front_end/webpack.config.js`),
  `STY/a-common-scss-variables.scss`, `STY/mixins.scss`, `STY/all-pages.scss`, `STY/data-pages.scss`, page SCSS files,
  `STY/molstar_lib_mol-plugin-ui_override.scss`; TS mirror `CAP/limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants.ts` (frozen `as const`).
- Used by: every page; `fake-link` about 121 files, `clickable` about 92, `icon-small` about 42; TS constants 12 files (tooltip, tab wrapper ...).
- How to use / extend: use classes before inline style; `fake-link` is the required link style (with ctrl/meta -> new tab handling per root
  CLAUDE.md); new styles go in a page SCSS scoped under the body class, using variables.
- Do not use when: MUI components (style via MUI public props).
- Limits and gotchas: SCSS variables and TS constants synced BY HAND. Bundles must not import SCSS. Some classes are global — renaming breaks
  distant users. Tag colors can be empty: never concatenate into a CSS shorthand.
- Related / duplicates: SCSS vs TS constants (manual duplicate).
- Status: verified

### Color interpolation (`Limelight__scaleColor_BasedOn_Fraction`)
- What it solves: Linear interpolation between two hex colors by a 0..1 fraction (heat-map shading).
- Search keywords: color scale, gradient, heat map, interpolate color, hex to rgb, shade by count
- Location: `CAP/Limelight__scaleColor_BasedOn_Fraction.ts` (`scaleColor_BetweenMinAndMax_BasedOn_Fraction__Return_HexColorFormat(fraction)`).
- Used by: structure widget, sequence bar widget ([charts_visualization.md](charts_visualization.md)).
- How to use / extend: construct once with min/max colors; call per value.
- Do not use when: perceptual / multi-stop scale needed (mod page heatmap uses d3, [charts_visualization.md](charts_visualization.md)).
- Limits and gotchas: no clamping; invalid hex gives null RGB then throws.
- Related / duplicates: color manager.
- Status: verified

---
## Other small shared components and per-page helpers

### Render user text with newlines and http links
- What it solves: Render a user string with `\n` -> line breaks and `http...` substrings -> `<a target=_blank rel=noopener noreferrer>`.
- Search keywords: linkify, auto link, render notes, newline to br, URL in text, project abstract
- Location: `DP/common_components__react/render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component.tsx`.
- Used by: project page abstract and notes components.
- How to use / extend: React-rendered (auto-escaped). Before extending link handling, route URLs through
  `sanitizeURL_ForHrefOrNavigation` and read `limelight_features_docs/web_security_csp_and_xss_url_hardening.md` ([security_access_control_sessions.md](security_access_control_sessions.md)).
- Do not use when: n/a.
- Limits and gotchas: links matched by a regex starting with `http`.
- Related / duplicates: URL sanitizer ([security_access_control_sessions.md](security_access_control_sessions.md)).
- Status: verified

### Estimated error (independent decoy) display component + clamp helper
- What it solves: Component showing estimated error from independent decoys + FASTA statistics; helper clamps error to [0,1].
- Search keywords: estimated error, FDR, independent decoy, FASTA statistics
- Location: `DP/common_components__react/estimated_error__using_independent_decoy__fasta_file_statistics/`
  (`EstimatedError_Using_IndependentDecoy_FastaFileStatistics__DisplayComponent`); `DP/data_pages_common/estimated_Error__From_IndependentDecoy__CommonCode.ts`.
- Used by: peptide page and protein list main components; clamp in 5+ QC estimated-error plots.
- How to use / extend: n/a.
- Do not use when: n/a.
- Limits and gotchas: component internals not read.
- Related / duplicates: QC error-estimation plots ([charts_visualization.md](charts_visualization.md)).
- Status: unverified (component internals); clamp verified

### Page "nonClass functions" helpers (sub-group selection, filter-block props, mod / reporter / sequence component data)
- What it solves: Per-page helpers computing selected sub-group ids, sub-group block props, search-details block props, and component data for
  mod-mass, open-mod-mass-zero, reporter-ion and peptide-sequence filters.
- Search keywords: nonClass functions, filter block props, modification selection component data, sub group selected
- Location: `PSB/peptide_page/peptidePage_Display_MainContent_Component_nonClass_Functions.ts`,
  `PSB/protein_page/protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions.ts`,
  `PSB/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__Main_Component_nonClass_Functions.ts` (+ scan-file-to-searches and experiment copies).
- Used by: their own page components.
- How to use / extend: copy-per-page today; a new filter needs its component-data builder in each copy.
- Do not use when: n/a.
- Limits and gotchas: same-named functions defined separately in 3-5 files (`compute_searchSubGroup_Ids_Selected`, `compute_searchSubGroup_PropValue`,
  `compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue`, `create_ModificationMass_UserSelections_ComponentData`,
  `create_PeptideSequence_UserSelections_ComponentData`); not diffed. The single-protein file also holds the external protein links builder
  (NCBI BLAST, PDR BLAST, UniProtKB, NCBI protein search; copy in the experiment single-protein file).
- Related / duplicates: per-page copies.
- Status: verified (definitions grepped; bodies not compared)

---

## Cross-references (blocks owned by other areas)

- `webserviceCallStandardPost`, reject sentinel, `handleServicesAJAXErrors` mapping, `reportWebErrorToServer` + global onerror hook, sync tracking,
  `limelight__ReloadPage_Function`, `limelight__ReplaceBrowserAddressBarURL_ValidateUpdated_Function`, admin webservice-call
  wrapper, per-endpoint loader template, DOM data handoff readers (`..._FromDOM.ts`, `getSearchDataLookupParametersFromPage`), client-side
  search-data-lookup params + URL updaters, `DataPageStateManager` and `LoadCoreData_ProjectSearchIds_Based` / `searchNameRetrieval`, all
  `common_data_loaded_from_server__*` loaders (incl. searches/tags/folders, "which sections have data", structure-file DAO), form-POST download
  + download-identifier polling, PSM download, blib download, server upload endpoints (octet-stream + base64 header) -> [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md).
- Chunked upload server side / File Object Storage, Java CLI uploader, `HttpHeaderValue_Base64_Encoding` server twin -> [storage_files_external_services.md](storage_files_external_services.md).
- Import / pipeline-run queues behind the upload UI -> [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md).
- Plotly helpers, QC render queue, QC chart frame covers, QC chart config/layout, QC color adapters, chromatograms (PSM-based + feature
  detection + `DP/chromatogram_common/`, smoothing), protein sequence BAR widget, protein STRUCTURE widget (Mol* embedding, headless parse,
  residue mapping, ChimeraX export + `DP/molstar__read_structure_create_chimerax_file/`, residue tooltip, dev-mode logging), mod page heatmap /
  histogram renderers, scan-file browser d3 plots, Lorikeet viewer -> [charts_visualization.md](charts_visualization.md).
- `PeptideMassCalculator`, mod / reporter-ion mass rounding, generated reported peptide identity string, protein inference, NSAF / ABACUS,
  Needleman-Wunsch, trypsin cut points + QC missed-cleavage regex, jStat wrapper, sequence coverage holder, experiment condition model /
  containers, mod page stats, base-35 scan-file URL code builder (`scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc`),
  server default-cutoff builder -> [domain_utilities.md](domain_utilities.md).
- URL sanitizer `sanitizeURL_ForHrefOrNavigation`, access enforcement behind the role-gated UI -> [security_access_control_sessions.md](security_access_control_sessions.md); CSP (inline-script
  hashes), security response headers -> [web_security_csp_and_xss_url_hardening.md](../web_security_csp_and_xss_url_hardening.md).
- JSP include chain, cache-bust param, front-end build pipeline (tsc -> esbuild -> webpack SCSS), static third-party JS (jQuery, jQuery UI),
  error JSPs -> [build_deploy_config.md](build_deploy_config.md).

## Duplicates and parallel mechanisms in this area

- **Two ways to persist a selection in the URL**: per-filter StateObject stored via a page `*Root_CentralStateManagerObjectClass` (dominant; prefer)
  vs self-registering `..._CentralStateManagerObjectClass` (open-mod-mass-0, sub-groups, experiment selections/order). Two StateObject constructor
  styles (with / without `valueChangedCallback`). Every page has its own central-state class repeating the same per-filter properties.
- **Adding a filter touches many hand-maintained lists**: page central-state classes, root classes, six `*_FiltersDisplay` roots, purge,
  `Limelight_AnyFilter__HasFilterValue` (incomplete), five `_copy_*` single-protein helpers, per-page nonClass component-data builders, the engine.
- **Three "is any filter set?" computations** (`Limelight_AnyFilter__HasFilterValue`, each `*_FiltersDisplay`, purge flags) — no preferred one; the
  first is incomplete.
- **Filter-engine result structure re-created** in two other files (single-protein generated list, QC cache); mod page main table has its own filtering.
- **Protein-position vs protein-position-of-modification filters**: near-clones.
- **"Currently filtering on" summaries** outside the current-filters block (structure widget, mod page data-viz text).
- **Logged-in / role-gated code split**: `DataPages_LoggedInUser_CommonObjectsFactory` (+ experiment twin) vs `ProjectPage_SearchesAdmin` /
  owner factory / saved-views interaction — same idea, parallel mechanisms; use the one native to the page type.
- **Page bootstrap copies**: five project-page role entry files (+ byte-identical researcher fragments); near-copy peptide/protein root classes;
  stand-alone roots differ in whether they call the global error init.
- **Three spinner entry points** (prefer `<Spinner_Limelight_Component/>` / the full-page cover; avoid global `createSpinner`).
- **Two near-identical red error boxes + legacy `showHideErrorMessage`** (prefer React-rendered messages for new code).
- **Overlay glue**: the open-function pattern is hand-written per overlay; about 22 copies of the small positioned popup; three wrappers around the
  folder search selector; the basic tag chooser popup uses its own `createRoot` instead of the add-to-body helper.
- **9 collapsible "TopLevelLabel" headers** + QC per-section toggles; no shared collapsible component (no preferred one identified).
- **Drag-reorder splice block** copied 6x in 5 files; no array-move helper.
- **Search list / tag filtering written 3x** (project searches container, folder selector, organize-searches overlay); `Search_Tags_Selections_Object`
  has no `matches()`; grouped evaluator private to the project-page container. Search list with folders: project-page list vs folder selector.
- **Tag data shape classes copied** in 3 components; two tag-loading paths (thin tag loaders vs searches/tags/folders loader).
- **`get-search-data-lookup-params-code` called inline in 5 places** vs the shared URL updater (prefer the shared updater, [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- **Hidden-form-POST download flow** copied 4x in the details panel + 3x elsewhere (no helper; [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md)).
- **Browser upload three ways** (chunked uploader preferred for large files; four single-POST helpers; structure-file DAO); `_upload_File` orchestration
  copied in two overlay components; default cutoffs computed client-side for experiments vs server-side builder; experiment per-search cutoff
  editor vs data-page change-cutoffs overlay.
- **Scan Files vs Feature Detection Runs list components** and **gold-standard vs feature-detection label/delete twins**.
- **Base-35 scan-file / feature-detection URL codes** built inline in 3 project-page places vs the canonical builder (prefer the builder, [domain_utilities.md](domain_utilities.md)).
- **Two DataTable TSV download paths** (built-in honors prefix lines; standalone converter does not) + hand-built TSV on mod / QC pages; plain
  `<table>` in about 9 places; six child-content callback variants (prefer the `_OR_Promise` ones).
- **PSM list webservice vs common-data PSM loaders** (overlapping data, different shape).
- **sessionStorage helpers** (project page SaveGet class, verbose value) — no shared wrapper.
- **Colors**: `Limelight_Colors_For_MultipleSearches` vs `..._For_SingleSearch__SubSearches` (copies); SCSS variables vs TS color constants (hand sync).
- **Page props bags**: QC common-data bag vs mod page state bag (page-specific; other pages pass objects individually).
- **Stale-async handling**: QC token registry vs component-level key checks vs per-child `force_*` handling on the project page.
- **Dead code** (verified): `dataTable_TableRoot_React_Create_Remove_Table_DOM.ts`, `test_ChildDataTable` (unused example),
  V1 manage-tags overlay, `searchSelection_OrderSelectionResult.ts`, V2 `_searchTags__Update_For_ProjectSearchIds`, `searchColorManager.ts`,
  `navigation_dataPages_Maint.updateNavLinks()` (empty but called), `mainPagesPopulateHeader.ts` (no-op), `ProjectPage_CommonOverall` (no-op),
  `z_test_code/testPageComponent.ts`, `_getSearchDataLookupParamsCode` (project page), Bullseye upload helper, `projectPage_UploadData_SubmitImportProgramInfo.ts`,
  re-order-folders overlay, `incrementSpinner/decrementSpinner` (no users).

## Open questions / unverified

- `limelight_webapp/front_end/CLAUDE.md` describes `limelight__BeforeUnload_BlockingGuard_Registry.ts`; that code is not yet committed in this repo (it lands with pending work), so the doc is ahead of the code for now.
- Whether logged-in vs public bundles strictly exclude logged-in-only modules was not confirmed by bundle inspection.
- Resolved: project-list and organize-searches roots are esbuild entries in `build.gradle`, loaded by `projectsList.jsp` /
  `project-organize-searches-view.jsp`. Still open: organize-searches page never calls the global error init (neither root nor header bundles).
- Possible defects seen in code, not runtime-tested: DataTable expanded-row rejection leaves "loading" (no error); `shallowClone()` drops
  `download_Content_PrefixLines`; `_upload_File` reads `sendResult.statusSuccess` when it can be `undefined`; several upload init/submit Promises
  never settle on failure; `Filter_selectionItem_Any_All_SelectionItem.shouldComponentUpdate` comparison looks inverted; three tag components
  rebuild sorted data every render; organize-searches drag saves ignore results; empty `catch` around the project-page root mount in four
  role entry files; `StringDownloadUtils` Latin-1 Blob type may mangle non-Latin-1 text.
- Partly read only: DataTable paging/find internals; large filter overlays (scan peak, mod-mass selection); project tag/category editor (about 3k
  lines); annotation-types overlay; protein position input + generic protein picker; estimated-error component; experiment builder (3.1k lines);
  the 2.6k-line QC main component; render bodies of the project-page list components.
- Front-end vs Java `FieldLengthConstants` values not compared; client-side experiment default cutoffs vs server builder equivalence not checked.
- The "instance fields + new-object-reference re-render" entry is assembled from several verified entries; no single file defines it.
- The per-page "nonClass functions" copies and experiment `_copy_*` helpers were not diffed.
