# Protein Structure Widget — right-pane UI changes (2026-07)

Session notes for a batch of right-pane UI changes in the search-based protein structure widget.
All changes live in
`limelight_webapp/front_end/src/js/page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_structure_widget/jsx/`
(main component `protein_Structure_WidgetDisplay__Main_Component.tsx`, plus the
`..._Select_ModificationMass_AndColor_Overlay_Component.tsx` overlay). Behavior-preserving w.r.t.
URL-saved state — these are display/label/UX changes, not new persisted state.

## Section layout / headings

- Right-pane sections are peer bold headings at the same left edge: **Structure Options**,
  **Limelight Data on Structure**, **Mod Mass Colors**, **Downloads**. Content under each heading is
  indented one `_RIGHT_PANE__STANDARD_INDENT` (= 20px) level.
- Heading font size: the site body default is **14px** (`$default-font-size` in
  `front_end/src/styles/all-pages.scss`). Section headings use `fontWeight: "bold"` and inherit 14px;
  an explicit redundant `fontSize: 14` was removed from the "Modifications" heading.
- **No negative margins.** "Mod Mass Colors" was briefly pulled left with `marginLeft: -20`; that was
  replaced by restructuring the DOM so its heading sits at the correct nesting level. A standing rule
  was added to `front_end/CLAUDE.md`: never use negative margins to realign — restructure the JSX
  instead; ask per-usage before adding one.

## Mod Mass Colors block

- **Modification ball size** slider moved to sit **above** the "Mod Mass Colors" heading (it's a
  Modifications-group control, not a per-mass color).
- **Custom variable / open mod mass entries** (under "Custom variable/open mod mass colors:"):
  - Hover tooltip is on the **`<label>`** (wraps checkbox + mass) so hovering the whole clickable row
    shows it; plus a green "?" affordance. Both carry the same text: checked ⇒ shown as a modification
    ball in its custom color; unchecked ⇒ the mass **reverts to a non-custom modification** (shown in
    the "Non-custom modification color", or hidden when "Hide non-custom modifications" is checked).
  - **Gotcha (real behavior):** unchecking a custom entry does NOT delete it and does NOT simply hide
    it — the entry still exists (excluded from the "available to add" set), and its positions fall back
    to the OTHER/non-custom bucket. Only `delete_Entry_For_ModificationMass` (the per-row delete)
    removes it. The specific-mass coloring uses only checked entries
    (`getAll_For_Entries_SelectionActivelySelected_True()`).
- **"Hide non-custom modifications:"** and **"Non-custom modification color"** green "?" tooltips define
  *non-custom* = modifications with no custom color entry, **plus** custom entries whose checkbox is
  unchecked. (The old "…regardless of this checkbox" wording was wrong and was corrected.)

## Dimming unselected rows — `_NOT_SELECTED_OPACITY`

Single constant `const _NOT_SELECTED_OPACITY = 0.4` (top of the main component, by the modification-ball
constants). A per-entry `style_DimWhenNotSelected` = `{ opacity: _NOT_SELECTED_OPACITY }` when not
selected, else `undefined`. Applied in four places; in every case the **checkbox, green "?", and
trailing edit/delete icons are left at full opacity**:

1. Custom **variable** mod mass entry: dims the mass, "choose color", color ball.
2. Custom **open** mod mass entry: same.
3. **Custom amino acid colors** (`_render__Single_CurrentSelection`): dims the residue `<select>` and
   the color-ball `<svg>` when `! item.residueLetter_SelectedForDisplay`. The transient "Select a
   residue" placeholder is created with `residueLetter_SelectedForDisplay: true`, so it is never dimmed.
4. **Structure chains** ("…aligned to this protein:"): dims the "Chain: {name}" label when the chain
   isn't in `selected_LimelightAssigned_ChainId_Set`.

## "Add custom mod mass color" link auto-hides

The set-building loop (masses that pass all filters AND map to a displayed chain, minus already-added)
was extracted into `_compute_ModMasses_AvailableToAdd__ForSelectModificationOverlay()` returning
`{ variable_Mods_Pass_ALL_Filters_Set, open_Mods_Pass_ALL_Filters_Set,
anyModMass_PassesAllFilters_RegardlessOfAlreadyAdded, dataReady }`.

- Called every render to compute `show_AddCustomModMassColor_Link`; the link is hidden when nothing is
  available to add. Deleting a custom entry (→ `forceUpdate`) or a filter change re-renders and the link
  reappears.
- `dataReady:false` (derived structure data not loaded) ⇒ keep the link visible (never hide on a
  transient render). The link's `onClick` reuses the render-time result (no double compute).

## Select-Modification overlay empty-state message

`..._Select_ModificationMass_AndColor_Overlay_Component`: added
`anyModMass_PassesAllFilters_RegardlessOfAlreadyAdded: boolean` to its `CommonParams`. When both
select-from sets are empty it now distinguishes:
- true ⇒ "All variable and open modifications that pass filters have already been added."
- false ⇒ "No Variable or Open modifications pass filters" (original).

Note: with the link now auto-hiding when nothing is available, these empty-state messages are
effectively unreachable from the only entry point — kept as harmless defensive fallbacks.

## "Currently filtering on:" line

Under the "Hide unmatched modifications:" checkbox (inside the same
`is_Any_Modification_Selected__Excluding_StaticModifications()` gate) is a
**"Currently filtering on: "** line: the variable + open modification masses currently filtered on,
combined, **ascending, comma-separated**, each mass a hover tooltip reading `"variable <mass>"` /
`"open <mass>"`. Shown only when ≥1 variable/open mass is selected (a mass-less "unmodified" selection
alone hides it).

- Source: `modificationMass_UserSelections_StateObject.get_VariableModificationSelections()` /
  `.get_OpenModificationSelections()` → `get_ModificationsSelected__OnlyModMasses_AsSet()`.
- New method **`is_Any_Modification_Selected__Excluding_StaticModifications()`** was added to
  `ModificationMass_UserSelections_StateObject` (`modificationMass_UserSelections_StateObject.ts`) and
  gates the whole "Hide unmatched…" + "Currently filtering on…" block.

## Tooltip fixes

"Hide variable modifications:" / "Hide open modifications:" green "?" corrected to
"Hide the modification balls for variable/open modifications on the structure." (previous text was the
garbled "Hide the modifications for … modifications …"). These flags (`get_Hide_Variable/Open_Modifications`)
only affect the balls drawn on the structure (`_add_Balls_For_Modifications`).

## Open follow-ups (raised, not done)

- "Currently filtering on" masses render **raw** (no rounding), and a mass selected as both variable and
  open appears **twice**. Could round (variable→2 decimals, open→whole) and/or de-dup.
- Custom-entry checkbox tooltip and its green "?" intentionally share identical text.
- Overlay empty-state messages are now unreachable and could be removed.

## Build / verify

From `limelight_webapp/front_end`: type-check with the tsgo binary
(`…/Limelight__DummyProject_Install__Typescript_GO__…/node_modules/.bin/tsgo --noEmit`), then build+deploy
to local Tomcat with `ant -f ant_buildFrontEnd_CopyToTomcat.xml`. Both were run clean for these changes.
