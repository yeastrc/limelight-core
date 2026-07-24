# Project page — Advanced (grouped CNF/DNF) search tag filter

The project page's **Searches section** has two mutually-exclusive tag filters:

- the original **basic** "Filter On Tags:" selector (OR / AND / NOT buckets), and
- an **Advanced** grouped filter that builds a boolean expression like
  `( a OR b OR c ) AND ( d OR e OR f )`.

This doc covers the Advanced filter: what it does, the files, and the load-bearing behavior
decisions. It is a **front-end-only** feature — filtering happens client-side against each
search's tag id set; there is no server/webservice or DB change. State persists in
`sessionStorage` per project.

> **Naming note:** the code still carries `..._Prototype` names and `// PROTOTYPE:` comments
> (e.g. the state flag `use_Advanced_TagFilter_Prototype`), but the feature is **deployed / live**,
> not an experiment. Treat "prototype" in these identifiers as legacy naming, not status.

## What it does (user-facing)

- Build a grouped tag expression. **Tags within a group** combine with one operator; **groups**
  combine with the opposite operator. A global **AND/OR mode toggle** flips the whole thing between
  CNF and DNF:
  - **within = OR** ⇒ `( a OR b ) AND ( c OR d )` (CNF — the default)
  - **within = AND** ⇒ `( a AND b ) OR ( c AND d )` (DNF)
- Each tag literal can be **NOT** (negated) — it matches when that tag is **absent** from the search.
- It's **either/or** with the basic "Filter On Tags:" selector — only one is shown/active at a time.
- All "Filtering on …" summaries stay together in the one shared
  `filter-on-tags--currently-filtering` block (original product requirement): the advanced
  **"Filtering on tags:"** summary renders there next to "Filtering on text:", **rendered by the
  parent** (not by the builder). The builder is **edit-only** and renders no summary of its own.

## Files

All under `limelight_webapp/front_end/src/js/page_js/data_pages/`.

**Builder + overlays** — `search_tags__display_management/tag_filter_expression_builder_cnf_component/`:

- `tag_Filter_Expression_Builder_CNF_Component.tsx` — the builder (main file, ~750 lines),
  **edit-only**. Holds its own CNF state (`andGroups` + `withinGroup_Operator`). Exports the seed/
  expression types `..._Seed_Literal` / `..._Seed_OrGroup` / `..._Expression`; props
  `initial_AndGroups`, `initial_WithinGroup_Operator`, `expression_Changed_Callback`. Internal
  literal/group objects carry a `_uiId` (React keys / mutation targeting) that is **stripped** from
  the plain-data expression handed back to the parent. Defines a file-level `_limelightColors` alias
  for the shared brand-color constants.
- `tag_Filter_Expression_Preview_Component.tsx` — **read-only** grouped-expression display (colored
  chips + parens + AND/OR), or the empty-group warning. Renders from plain seed data (props
  `andGroups`, `withinGroup_Operator`, `searchTagData_Root`). The **parent** renders this inside the
  shared summary block.
- `tag_Filter_Expression_TagPicker_Overlay.tsx` — add-tag overlay (home-grown
  `ModalOverlay_Limelight_Component_v001_B_FlexBox`), 2-column categories-left / tags-right layout,
  tags sorted within category (uncategorized last). **Stays open** after each pick so several tags
  can be added in a row (already-added tags greyed out); batches — `onOverlayClosed` fires once. An
  optional `operatorChooser` prop shows pinned OR/AND **radios** at the top (used only when starting
  the very first group) that set the within-group operator live. `closeAfterPick` supports a
  close-after-one mode (not currently used by the builder). "open" function colocated here.
- `tag_Filter_Expression_OperatorChooser_Overlay.tsx` — the AND/OR mode-chooser overlay (two radio
  cards: CNF vs DNF, with monospace examples). Exports
  `tag_Filter_Expression_OperatorChooser_Overlay__Operator_Title_And_Example(op)` — shared
  title+example wording, reused as the tag-picker radio tooltips so the two agree.

**Parent wiring** — `other_data_pages/project_page/project_page_main_page_react_based/jsx/`:

- `projectPage_SearchesSection_MainBlock_Container_Component.tsx` — basic↔advanced either/or wiring,
  seeding, filtering, persistence, and rendering the shared "Filtering on" summary. Key members:
  `_switchTo_Advanced_TagFilter`, `_switchTo_Basic_TagFilter`, `_clearAdvancedTagFilter`,
  `_build_CNF_SeedGroups_From_ExistingSelections`, `_isAdvanced_TagFilter_Active`,
  `_advanced_TagFilter_HasEmptyGroup`, `_advanced_TagFilter_Matches`,
  `_save_Advanced_TagFilter_ToSessionStorage`; fields `_advanced_TagFilter_InitialSeed`,
  `_advanced_TagFilter_Initial_Operator`, `_advanced_Builder_RemountCounter`; state flag
  `use_Advanced_TagFilter_Prototype`.
- `projectPage_SearchesSection_MainBlock_Container_SessionStorage_SaveGet.ts` — persistence.
  sessionStorage key `limelight_project_page_advanced_tag_filter`. Exported types
  `ProjectPage_SearchesSection__Advanced_TagFilter` / `..._OrGroup` / `..._Literal`. Stored value is
  namespaced by `projectIdentifier` (ignored on load if it doesn't match the URL's project). Load
  runs through `_validate_Advanced_TagFilter`, which sanitizes (numeric `tagId`, boolean `negated`),
  **drops empty groups**, and returns `null` if nothing usable remains.

## Behavior & decisions (load-bearing)

- **Basic → Advanced** (`_switchTo_Advanced_TagFilter`): seeds the builder from the current basic
  selection *before* clearing basic, via `_build_CNF_SeedGroups_From_ExistingSelections` —
  each basic **AND** tag → its own 1-tag group; each **NOT** tag → its own 1-tag negated group;
  the **OR** bucket → a single OR group. Seeds `withinGroup_Operator = 'OR'` (so basic maps to
  OR-within / AND-between). Then clears basic and persists the advanced filter (so a reload defaults
  to Advanced).
- **Advanced → Basic** (`_switchTo_Basic_TagFilter`): clears the advanced filter (incl.
  sessionStorage) and re-filters.
- **Persistence / default on load:** persisted to sessionStorage per project. On load, if a
  non-empty advanced filter is present (after dropping tags no longer in the project), the page
  **defaults to Advanced mode**.
- **Builder starts with ZERO groups** (`isPristine = andGroups.length === 0`). Pristine shows a
  dashed empty-state callout ("Start adding tags to the first group.") with **one** primary button,
  "Add tags to first group", which opens the picker **with** the OR/AND radios. There is no
  "add empty group" link in the pristine state.
- **Empty-group rule** (important, and intentional):
  - `_isAdvanced_TagFilter_Active()` = "seed has ≥1 group" — so an **empty group counts as active**.
  - `_advanced_TagFilter_Matches()` returns **false** if any group is empty ⇒ an **empty group
    blocks ALL searches**. The preview shows a red warning instead of the expression: *"At least one
    group is empty, so no searches pass the filters. Populate all groups, or remove empty groups."*
  - The **pristine** state (zero groups, seed `[]`) is **not** active, so it shows **all** searches.
  - So: no groups ⇒ show all; ≥1 group with an empty one ⇒ show none (warning); all groups populated
    ⇒ evaluate the expression.
- **Evaluation** (`_advanced_TagFilter_Matches`, given a search's tag id `Set`): within each group,
  literals combine with `withinGroup_Operator` (`every` for AND, `some` for OR); a **negated** literal
  matches when the tag is **absent**. Groups then combine with the **opposite** operator. This
  duplicates the preview component's own display logic — a possible future cleanup is to extract one
  shared evaluator.
- **clear** (`_clearAdvancedTagFilter`, wired to the summary's "clear"): empties the seed, resets the
  operator to OR, clears persistence, re-filters, and **remounts the builder** by bumping
  `_advanced_Builder_RemountCounter` (used as the builder's React `key`, since the builder owns its
  own internal state). Stays in Advanced mode (parallels the basic "clear tag filters").
- **Tag-picker applies on overlay close** — while the stay-open picker is open, the builder sets
  `_suppress_ExpressionChanged = true` and fires `expression_Changed_Callback` **once** in
  `onOverlayClosed`, instead of on every pick (persist/re-filter once, not per tag).
- **NOT toggle** is a MUI `size="small"` `Switch` using **public props only**; it's driven by
  `checked` and **set** (not toggled) via `_setLiteralNegated`, so it's idempotent (immune to a
  double `onChange`).
- **Colors = Limelight brand green**, all from the shared frozen constants
  `limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants`
  (`page_js/common_all_pages/limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants.ts`,
  mirrors the SCSS vars) — **no hardcoded brand hex**. AND/OR pills: between-groups = filled
  `site_color_very_dark` (#005606) on white; inline = `site_color_medium` (#e4f9e4) fill with
  dark-green text and `link_color_underline` (#65A96A) border. Group boxes + empty-state callout use
  `link_color_underline` border on `site_color_light`. Neutral grays / the red NOT color (#c0392b) /
  per-tag chip colors are left inline (not brand colors). See the front-end `## Colors` convention in
  `limelight_webapp/front_end/CLAUDE.md`.
- **Inline-style gotcha:** styles use **longhand** props (`borderWidth`/`borderStyle`/`borderColor`,
  per-side padding/margin), never shorthand strings — a possibly-empty tag color in a shorthand like
  `"2px solid "` is silently ignored by the browser (the "stuck border" bug). Border color falls back
  to `transparent` when a tag's color is empty.

## Layout

- The advanced **builder** (edit UI) sits **below "Filter on Search Name or Id"**, in the same slot as
  the basic "Filter On Tags:" selector — **no outer border box** around the slot.
- The non-pristine builder wraps its header + groups + "Add a group" button in a light panel with
  `width: fit-content` + `maxWidth: 100%` so it **shrink-wraps** (doesn't run to the page's right
  edge) yet still lets the groups row use available width and wrap groups per line. The header
  explainer is capped `maxWidth: 560` so it can't blow out the panel. The pristine empty-state callout
  is **not** wrapped in the panel.
- Per-group UI: header shows "Group N" + a circle-delete icon (`static/images/icon-circle-delete.png`,
  tooltip "Remove Group"); a populated group shows tag chips + an "Add tag" fake-link; an **empty**
  group shows an "Add tags to group" button + an italic "(Empty Group)" marker. Bottom control is a
  real `<button>` "Add a group" (a fake-link was not visible enough).
- The advanced **"Filtering on tags:" summary** is rendered by the **parent** inside the shared
  `filter-on-tags--currently-filtering` block via `Tag_Filter_Expression_Preview_Component`. So in
  Advanced mode the expression appears twice by design: editable (builder) + read-only summary
  (parallels basic: selector + summary).

## Possible follow-ups (noted, not done)

- Extract the duplicated group-expression evaluator (`_advanced_TagFilter_Matches` vs. the preview
  component's display logic) into one shared function.
- Migrate the other consumers of `Search_Tags_Selections_Object` /
  `Search_Tags_SelectSearchTags_Component` toward this grouped model, if the basic filter is ever
  retired.
- The "prototype" naming (`use_Advanced_TagFilter_Prototype`, `// PROTOTYPE:` comments) could be
  renamed now that the feature is live.
