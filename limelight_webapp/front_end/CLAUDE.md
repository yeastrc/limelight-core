# Front End — Conventions & Build

This directory is the entire TypeScript/React front end (all `.ts`/`.tsx` in the repo live under `src/`). **Match the surrounding code.** The rules below are the established house style.

> **File names and locations are often misleading — legacy from the JS→TS migration.** The front end
> started as JavaScript; when it was migrated to TypeScript, code was **not** renamed or relocated to
> better-fitting names/dirs — it stayed where it already was. So a file's name/folder frequently does
> **not** reflect what actually uses it or where it conceptually belongs. **Don't infer scope/ownership
> from the path — grep imports/callers to confirm real usage.** (Worked example below: the
> `proteinPage_Display__SingleProtein_...` peptide-list code actually drives the peptide page too.)

---

## Naming: underscore = private / file-scoped

- **File-scoped variables and functions, and class properties (instance _and_ static), start with a leading `_`** to mark them as private to that file or class.
  - e.g. `const _myHelper = ...`, `private _spinnerManager`, `private static _CACHE`.
- **If something becomes exported, or a class member becomes non-private, remove the leading `_`.** A leading underscore must never appear on an exported / public name.

## Naming: exported symbols are prefixed with their source file

Exported names should be long and self-describing so an IDE autocomplete entry tells you exactly where the symbol comes from (short names don't carry enough information).

- **Every exported symbol is prefixed with its source file's basename, using `__` as the separator**, and has no leading underscore:
  - `<fileBasename>__<name>`
  - e.g. in `chromatogram_Common_Helpers.ts`:
    `export const chromatogram_Common_Helpers__ISOTOPE_PLOT_TRACE_COLORS = [...]`
  - e.g. in `chromatogram_Common_Options.ts`:
    `export enum chromatogram_Common_Options__PlotType_IonCurrent_VS_Ions_Select_Enum {...}`
- **This applies to all export kinds** — consts, functions, enums, interfaces, and classes/components.
- **React component classes use a Capitalized prefix** (`Chromatogram_Common_OptionSelector_Components__...`), because JSX treats a lowercase-initial tag as a DOM/intrinsic element. The filename basename starts lowercase, so capitalize its first letter only for component classes.
- **Non-exported, file-local types** keep the existing `Internal__` marker prefix (e.g. `Internal__Foo_Component_Props`); they are not exported, so they get neither the filename prefix nor a leading `_`.

## Imports

- Import with **absolute module paths from `src/js`** (via the tsconfig `paths` mapping `"*": ["./src/js/*"]`), not relative `../../` chains:
  ```ts
  import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
  ```

---

## How the front end is actually built

**Entry point:** an Ant script calls Gradle. There is no npm build script — `package.json` `scripts` is empty, and `npm install` is run separately (it's slow) outside Gradle.

- `ant_buildFrontEnd_CopyToTomcat.xml` → Gradle `frontEndBuild_ForDevelopment` (front end only, copies to Tomcat).
- The parent-directory WAR build → Gradle `frontEndBuild_ForProduction`.

Both Gradle tasks run the same pipeline (production minifies; development does not minify the data-pages bundle and builds React in dev mode):

1. **`delete_outputDirs`** — clean output dirs.
2. **`run_Typescript_Validate__NoEmit`** — validate types with `tsc --noEmit` (no JS is emitted here; this is type-checking only). The `tsc` path can be overridden via `Typescript_Executable_OverridePath.txt` (e.g. to use `tsgo`).
3. **esbuild** bundles all JS/TS, one call per page group (header / admin / user / data pages). Flags: `--bundle --sourcemap --entry-names=[name]-bundle --outdir=...`; `--minify` for production. Entry points are listed in `build.gradle`. Output → `build/js_generated_bundles/<group>/`.
4. **webpack** (`runWebpack_ProductionMode` / `runWebpack_DevelopmentMode`) processes **SCSS only** — entry `src/styles/global.scss` → `build/css_generated/global.css`. Loaders: `sass-loader` → `css-loader` → `mini-css-extract-plugin`, minified by `css-minimizer-webpack-plugin`. See `webpack.config.js`.
5. **`gzipJsBundles`** — gzip every `.js` under `build/js_generated_bundles` (keeps the originals, writes `*.js.gz`).
6. **`copyFrontEndJS` / `copyFrontEndCSS`** — sync `build/js_generated_bundles` and `build/css_generated` into `../src/main/webapp/static/` for the WAR.

### Important build facts (don't reintroduce removed tooling)

- **esbuild does the TS/JS transpiling and bundling.** It does **not** use Babel. There is no `.babelrc` and no Babel dependency — don't add Babel config expecting it to run.
- **webpack handles SCSS only.** It does **not** process `.ts`/`.tsx` (no `ts-loader`, no `babel-loader`). Don't add JS/TS entry points to `webpack.config.js`; add esbuild entry points in `build.gradle` instead.
- **Type errors fail the build** at step 2 — keep `tsc --noEmit` clean.

### tsconfig notes

- `target: es2022`, `module: commonjs`, `jsx: "react"`.
- `strict: false`, but `noImplicitAny`, `noImplicitThis`, and `strictBindCallApply` are **on**; **`strictNullChecks` is off** — guard nullables explicitly where it matters.

### Linting

- ESLint flat config in `eslint.config.js` (minimal: `@eslint/js` recommended only). It is not part of the Gradle build.

---

## Per-search capability flags (gate UI on what a search supports)

Data pages carry a per-search "flags" object describing what each loaded search supports. **Use it to show/enable a feature only when every selected search can support it** — don't let the user trigger a webservice that will reject the request. (E.g. the "Run FlashLFQ" button only renders when all searches have scan data; otherwise the server returns invalid-parameter.)

- **Access:** from the page's `DataPageStateManager` (the `dataPageStateManager_DataFrom_Server` instance):
  `dataPageStateManager_DataFrom_Server.get_DataPage_common_Searches_Flags()` → `DataPage_common_Searches_Flags`. May be unset — guard for null/undefined.
- **Source:** `page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags.ts` (loaded fast from `search_tbl`, often server-cached). Sibling `DataPage_common_Searches_Info` is reached via `get_DataPage_common_Searches_Info()`.
- **Per-search flags** — `DataPage_common_Flags_SingleSearch`, keyed by `projectSearchId`:
  `hasScanFilenames`, `hasScanData`, `hasIsotopeLabel`, `anyPsmHas_DynamicModifications`,
  `anyPsmHas_OpenModifications`, `anyPsmHas_ReporterIons`, `anyPsmHas_PsmPeptidePositionAnnotation`,
  `anyPsmHas_IsDecoy_True`, `anyPsmHas_IsIndependentDecoy_True`, `searchNotContainProteins`, plus three
  `*_PossiblyNull` fields (`allPsmHave_Precursor_RetentionTime_PossiblyNull`,
  `allPsmHave_Precursor_M_Over_Z_PossiblyNull`, `psmIds_AreSequential_PossiblyNull`) that are **null when
  not populated — not yet backfilled for existing searches**, so treat null as "unknown", not false.
- **Per-search accessors:** `get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId)`,
  `get_DataPage_common_Flags_AllEntries()`.
- **Aggregate convenience methods** (prefer these for all-search gating):
  `is__All_Searches_Have_ScanData()`,
  `is__searchNotContainProteins_True__TrueFor_All_Searches()` / `..._TrueFor_Any_Search()`,
  `is__anyPsmHas_IsDecoy_True__TrueForAnySearch()`,
  `is__anyPsmHas_IsIndependentDecoy_True__TrueForAnySearch()`. Add a new `is__..._All/Any_Searches()`
  helper here rather than re-looping the map at each call site.

---

## Generated reported-peptide display string (the "generated peptide" the peptide list shows)

The per-position modified-peptide string shown in the peptide list (e.g. `PEPT[79.97]IDE`,
`n[42]PEPTIDE`, `PEPT(80)IDE`) is built by one canonical function — **don't hand-format these,
and don't derive them from an external tool's string** (e.g. FlashLFQ's `PEP[+79.96633]TIDE` full
sequence is a *different* format; to line data up with the peptide list, build the string with this
function from the same inputs, then match).

- **Builder:** `reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches` in
  `page_js/data_pages/reported_peptide__generated_common__across_searches/reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches.ts`.
  Terminus sentinel positions are exported alongside it:
  `..._N_TERMINUS_POSITION_INDEX` / `..._C_TERMINUS_POSITION_INDEX` (re-exported from
  `reportedPeptide_CommonValue_AcrossSearches`). Residue positions are **1-based**.
- **Inputs (all mods already rounded to strings by the caller):**
  `peptideSequence`; `variable_Modifications_RoundedArray_KeyPosition: Map<position, string[]>`
  (multiple variable mods can share a position → comma-joined); `staticModificationsRounded_KeyPosition:
  Map<position, string>`; and a **single** open mod as `open_Modification_Rounded` (string) +
  `open_Modification_Rounded_Position`, **or** `open_Modification_Rounded_NoPosition` (unlocalized).
- **Output format:** residue, then `[v,v]` (variable), `{s}` (static), `(o)` (open) at that position;
  `n`/`c` prefixes carry terminus mods; an unlocalized open mod is appended as `-(o)` at the end. No mods
  → returns the bare sequence.
- **Rounding is the caller's job, and the two mod kinds round differently** — this matters for matching:
  - **Variable & static** → 2 decimal places via `modificationMass_CommonRounding_ReturnString` /
    `modificationMass_CommonRounding_ReturnNumber` (`page_js/data_pages/modification_mass_common/modification_mass_rounding.ts`).
  - **Open modifications → rounded to a whole number** (`Math.round(openModificationMass)`; the loaded
    open-mod object carries it as `openModificationMass_Rounded`). There is no dedicated "round open mod"
    helper — it's `Math.round` at the call sites.
- **One open mod per generated string.** When an open mod has **multiple candidate positions**, the
  caller emits **one generated string per position** (the same fan-out used for PSM counts — the same PSM
  is counted under every generated peptide string). The reference implementation of that fan-out is
  `page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Create_GeneratedReportedPeptideEntries_String_Etc.ts`.

**Shared across pages — the naming is misleading.** The peptide-list generation code (which computes the
rounded-mod maps and calls the builder) lives under `protein_page__single_protein/`
(`proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData.ts`), but the **same code
drives both** the peptide list on the **peptide page** *and* the peptide list in the **single-protein
overlay** — and that overlay is reachable from the **protein, peptide, and modification** pages. So a
change here affects all of those. (Other callers of the builder: mod page, feature-detection chromatogram,
QC gold-standard, scan-file-to-searches, lorikeet PSM table.)

### The display string does NOT encode open-mod *kind* — a LOCALIZED open mod renders in brackets, identical to a variable mod

The bullets above describe the **canonical builder's** own params (`(o)` parens for open, `[v]` for
variable). But the **peptide-list caller** does **not** feed a localized open mod through the builder's
open-mod param — so **you cannot recover open-mod kind/mass by parsing the peptide-list display string.**
In `proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData.ts`
(`_generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM`):

- It **merges the localized open mod into the same map as variable + static mods** (see the comment
  *"combine all positional mods together into single map since will display all as Variable Mods in
  `[` `]`"*), then passes that map as `variable_Modifications_RoundedArray_KeyPosition` with the builder's
  `open_Modification_Rounded` param left **undefined**. Result: a localized open mod of +14.016 on
  `AVFVDLEPTVVDEVR` renders as **`AVFVDLEPTVVDE[14]VR`** — square brackets, **whole-number rounded** (open
  mods use `Math.round`, so it's `[14]`, not the 2-decimal `[14.02]` a variable mod would show). It is
  **byte-identical** to a genuine variable `[14]`; no string parser can tell them apart.
- **Only an UNLOCALIZED open mod gets paren treatment** — appended as trailing **`-(N)`** (via the
  builder's `open_Modification_Rounded_NoPosition`).
- **Which one you get depends on the page's "open modifications with localization" user selection**:
  localization ON + candidate positions present → per-position `[N]` (localized, bracketed); OFF (or no
  positions) → trailing `-(N)` (unlocalized). So the *same* PSM open mass can render either way.

**Consequence / how to get open-mod info correctly:** do **not** reverse-engineer the open modification
from the display string (it's ambiguous for localized mods and toggle-dependent). Read it from the
open-mod data source that generated the row — the PSM open modifications
(`openModifications_On_PSM_For_MainFilters_Holder`, keyed by `reportedPeptideId`; DB `psm_open_modification_tbl`
+ `psm_open_modification_position_tbl`), which is where the builder itself gets it. This is exactly why
the FlashLFQ-quant receive side (`quant_PrototypeData__parseDisplayOpenMod`, which only matches `(N)`/`-(N)`
parens) leaves **every localized-open-mod row blank** in the per-form Quant column — a known prototype
limitation, not a data problem: the underlying data classifies the mod as open correctly.

---

## Modal overlay (home-grown) — `ModalOverlay_Limelight_Component_v001_B_FlexBox`

Limelight has its own React modal overlay (not a library) with an optional title bar. Use it for
in-page dialogs. Definition:
`page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox.tsx`.
Canonical usage example: `SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component`
in `.../search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_UserInput_OverlayContents.tsx`.

- **The overlay centers itself and sizes between the min/max you give it**, and auto-switches CSS
  `position` between `fixed` and `absolute` on window resize so the browser scrollbars can still reach
  it when the viewport is too small. It renders its **own title bar** (a `top-level fixed-height
  modal-overlay-header` with the title and the close "X"); your `children` are just the body below it.
- **Props** (`ModalOverlay_Limelight_Component_v001_B_FlexBox_Props`): `children`;
  `heightMinimum`/`heightMaximum`/`widthMinimum`/`widthMaximum` (px numbers, required bounds);
  `title` (string; omit/undefined for no title) or `title_Component_Callback` (used only when `title`
  is null/undefined); `callbackOnClicked_Close` (the "X" handler — **the X only shows when this is
  set**); `close_OnBackgroundClick` (clicking the dimmed backdrop closes); `titleBar_LeaveSpaceFor_CloseX`
  (reserve the X's space even when hidden); `set_CSS_Position_Fixed` (force `position: fixed` — **use
  with care**, it disables scrolling to parts outside the viewport).
- **Showing/hiding is done by inserting into the document body** (not conditional render) — see below.

### Showing / hiding — insert into `<body>`, remove via the returned holder

Overlays are mounted onto a fresh `<div>` appended to `<body>` and torn down again, via
`limelight_add_ReactComponent_JSX_Element_To_DocumentBody`
(`page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody.ts`):

- **Open:** build the overlay JSX element — usually from a `get_<X>_Container({ ...props... })` factory
  that returns the outer-container component wrapping `<ModalOverlay_…>` — then
  `const holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd })`. It
  creates a `<div>` on `<body>`, mounts a React root (`createRoot`) there, renders the component, and
  returns a `Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF`.
- **Close:** `holder.removeContents_AndContainer_FromDOM()` (hides immediately, then defers React
  unmount + `<div>` removal via `requestIdleCallback`/`setTimeout`). Wire it as the overlay's
  `callbackOnClicked_Close` (and the container's cancel/close callback).
- **Forward-reference closure:** declare `let holder … = undefined` *before* building the component so
  the close callback can close over `holder`, which is assigned the return value immediately after
  (that's why the example does `let …Holder = undefined;` then references it inside its
  `callbackOn_Cancel_Close_Clicked`).

**Where the "open overlay" function lives:** most existing code puts the `openOverlay(...)` function in
the **calling** file. Dan leans toward **colocating it in the overlay component's own file** (next to
the `get_<X>_Container` factory); prefer that for new overlays unless matching nearby existing code.

### Body layout — flexbox entries (this is the important part)

The body is a flex **column**. Each direct child ("entry") is a `top-level` div with **one height class**:

- **`single-entry-variable-height`** — the ONE entry that flexes to fill the remaining height and
  **scrolls** (give it `style={{ overflowY: "auto" }}`). **At most one** per overlay.
- **`fixed-height`** — entries sized to their content (headers, button/footer rows, etc.). **Zero or
  more, and they may come before and/or after the variable-height entry** — the variable-height block
  simply expands to fill whatever space the fixed blocks leave.

### Body margins — per-side CSS classes on each entry

Content margins are the caller's job, via classes on each `top-level` entry (the overlay does not add
them): `modal-overlay-body-standard-margin-top` / `-left` / `-right` / `-bottom`. Apply per side so the
layout owns the spacing: the **first** (top-most) block gets `-top`, the **last** (bottom-most) block
gets `-bottom`, and blocks typically get `-left` + `-right`. (So top/bottom margins live on the
outermost blocks, not on every block.)

---

## Tooltip (home-grown, extends MUI) — `Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component`

Limelight's standard tooltip is a MUI `@mui/material/Tooltip` re-`styled(...)` with Limelight theming
(white background, dark border, site font, `maxWidth: 600`). Definition:
`page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component.tsx`.

- **It IS a MUI `Tooltip`** — all `TooltipProps` apply. Wrap a single child element (the anchor); the
  child must be able to hold a ref, so wrap plain text/content in a `<span>`/`<div>`.
- **`title`** is the tooltip content and may be a **string or a JSX element**; **`title = null`
  renders NO tooltip** — the standard way to conditionally disable it.
- **`open={true}`** forces it to stay shown so you can DOM-inspect the tooltip during development.
- **Don't hand-set the behavior props** — spread one of the two common-property helpers from the same
  file (each returns a fresh `TooltipProps` minus `title`/`children`, safe to mutate):
  - `limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer()`
    → `{ disableInteractive:true, followCursor:true, enterDelay:0, leaveDelay:0 }` — tooltip tracks the cursor.
  - `limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_NOT_FollowMousePointer_DefaultPosition()`
    → same but `followCursor:false` — anchored to the element in the default position.

```tsx
<Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
    title={ tooltipContents /* string | JSX | null(=no tooltip) */ }
    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
>
    <span>anchor element</span>
</Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
```

### `Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component` — the "?" help affordance

Renders a small **"?" inside a circle** (site color) that shows a tooltip **on hover**. Put it to the
**right of a label** to offer more info — more explicit, and more inviting to hover, than putting a
tooltip on the label text or an icon. Class component in
`page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component.tsx`.

- **Self-contained — no child element**; you only pass `title`. Internally it wraps
  `Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component` with the
  *not-follow-mouse-pointer* helper, then overrides to `arrow`, `placement: "bottom-start"`, and
  interactive-enabled, and auto-sizes the circle to the surrounding font size.
- **Props:** `title: React.ReactNode` — the tooltip content (string or JSX; `null` → no tooltip, per
  the underlying tooltip). `no_Margin_Left?: boolean` — drop the default `0.3em` left margin, e.g. when
  it directly follows a `<label>` that already has right padding.

```tsx
<Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component title={ tooltipContents } />
```

For reusable tooltip text, the pattern is a colocated `…__COMMON_MESSAGE_…_react_component` function
that returns the JSX you pass as `title`.
