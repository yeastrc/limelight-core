# Project page — Advanced (grouped) search tag filter

The project page's **Searches section** has two mutually-exclusive tag filters:

- the original **basic** "Filter On Tags:" selector (OR / AND / NOT buckets), and
- an **Advanced** grouped filter that builds a boolean expression like
  `( a AND b ) OR ( c OR d ) OR ( e )`.

This doc covers the Advanced filter: what it does, the files, and the load-bearing behavior
decisions. It is a **front-end-only** feature — filtering happens client-side against each
search's tag id set; there is no server/webservice or DB change. State persists in
`sessionStorage` per project.

> **Operator model changed (2026-07-24).** The filter was originally a strict **CNF/DNF** builder:
> one global "within-group" operator, with the between-groups operator forced to its opposite — a
> single toggle flipped everything. It is now a **general two-level expression**: **each group has its
> own operator** (`groupOperator`, AND or OR), and a **single, independent `betweenGroups_Operator`**
> combines the groups. The old "CNF" names were renamed to "Grouped" at the same time. Old persisted
> filters are migrated on load (see Persistence).

> **Naming note:** the code still carries `..._Prototype` names and `// PROTOTYPE:` comments
> (e.g. the state flag `use_Advanced_TagFilter_Prototype`), but the feature is **deployed / live**,
> not an experiment. Treat "prototype" in these identifiers as legacy naming, not status.

## What it does (user-facing)

- Build a grouped tag expression. **Each group** combines its own tags with **its own** AND/OR
  (`groupOperator`); a **single, separate** `betweenGroups_Operator` combines the groups. The two
  levels are **independent** — changing one group's operator affects only that group, and the
  between-groups operator is its own choice. Example: `( a AND b ) OR ( c OR d )`.
- **Setting operators (AND/OR dropdown + picker radios):**
  - Click the AND/OR pill shown **between a group's tags** → opens a small dropdown to choose AND or OR
    for **only that group**. Each option has a tooltip; clicking outside closes it (like a `<select>`).
  - Click the AND/OR pill shown **between groups** → opens the same dropdown for the **single**
    between-groups operator (applies to every group junction — one shared between operator, not one per
    junction).
  - For an **empty** group (no inline pill visible yet), the tag-picker overlay shows **OR/AND radios**
    so you choose how that group's tags will combine before adding them.
- Each tag literal can be **NOT** (negated) — it matches when that tag is **absent** from the search.
- It's **either/or** with the basic "Filter On Tags:" selector — only one is shown/active at a time.
- All "Filtering on …" summaries stay together in the one shared
  `filter-on-tags--currently-filtering` block (original product requirement): the advanced
  **"Filtering on tags:"** summary renders there next to "Filtering on text:", **rendered by the
  parent** (not by the builder). The builder is **edit-only** and renders no summary of its own.

## Files

All under `limelight_webapp/front_end/src/js/page_js/data_pages/`.

**Builder + overlays** — `search_tags__display_management/tag_filter_expression_builder_grouped_component/`:

- `tag_Filter_Expression_Builder_Grouped_Component.tsx` — the builder (main file, ~760 lines),
  **edit-only**. Holds its own state (`groups` — each with a `groupOperator` — plus a top-level
  `betweenGroups_Operator`). Exports the seed/expression types
  `Tag_Filter_Expression_Builder_Grouped_Component__{Seed_Literal, Seed_Group, Expression}`; props
  `initial_Groups`, `initial_BetweenGroups_Operator`, `expression_Changed_Callback`. Internal
  literal/group objects carry a `_uiId` (React keys / mutation targeting) that is **stripped** from
  the plain-data expression handed back to the parent. Per-group and between-groups operators are set
  via a small custom AND/OR **dropdown** — clicking a pill opens `_render_OperatorDropdownMenu`
  (per-option tooltips; outside-click closes it via a document `mousedown` listener added in
  `componentDidMount`); a selection calls `_set_GroupOperator` / `_set_BetweenGroups_Operator`. Empty
  groups can also set their operator from the picker radios. Defines a file-level `_limelightColors`
  alias. New groups default to `groupOperator: 'OR'`; a fresh filter defaults
  `betweenGroups_Operator: 'AND'` (this pair reproduces the old CNF default).
- `tag_Filter_Expression_Preview_Component.tsx` — **read-only** grouped-expression display (colored
  chips + parens + AND/OR), or the empty-group warning. Renders from plain seed data (props `groups`,
  `betweenGroups_Operator`, `searchTagData_Root`); each group is shown with its own `groupOperator`,
  groups joined by the between operator. The **parent** renders this inside the shared summary block.
- `tag_Filter_Expression_TagPicker_Overlay.tsx` — add-tag overlay (home-grown
  `ModalOverlay_Limelight_Component_v001_B_FlexBox`), 2-column categories-left / tags-right layout,
  tags sorted within category (uncategorized last). **Stays open** after each pick so several tags
  can be added in a row (already-added tags greyed out); batches — `onOverlayClosed` fires once. Its
  optional `operatorChooser` prop (`initial_GroupOperator` / `onChoose_GroupOperator`) shows pinned
  OR/AND **radios** at the top, shown whenever the target group is still **empty**, and sets **that
  group's** operator live. Radio wording comes from a file-local `_groupOperator_Title_And_Example`.
  "open" function colocated here.

> There is **no** operator-chooser overlay anymore. The former
> `tag_Filter_Expression_OperatorChooser_Overlay.tsx` (a coupled CNF/DNF "swaps both" chooser) was
> **deleted** when operators became independent — operators are now chosen via the small custom AND/OR
> **dropdown** (opened from each pill; per-option tooltips; outside-click closes) and the tag-picker
> radios described above.

**Parent wiring** — `other_data_pages/project_page/project_page_main_page_react_based/jsx/`:

- `projectPage_SearchesSection_MainBlock_Container_Component.tsx` — basic↔advanced either/or wiring,
  seeding, filtering, persistence, and rendering the shared "Filtering on" summary. Key members:
  `_switchTo_Advanced_TagFilter`, `_switchTo_Basic_TagFilter`, `_clearAdvancedTagFilter`,
  `_build_Grouped_SeedGroups_From_ExistingSelections`, `_isAdvanced_TagFilter_Active`,
  `_advanced_TagFilter_HasEmptyGroup`, `_advanced_TagFilter_Matches`,
  `_save_Advanced_TagFilter_ToSessionStorage`; fields `_advanced_TagFilter_InitialSeed` (array of
  `Seed_Group`, each carrying `groupOperator`), `_advanced_TagFilter_Initial_BetweenOperator`,
  `_advanced_Builder_RemountCounter`; state flag `use_Advanced_TagFilter_Prototype`.
- `projectPage_SearchesSection_MainBlock_Container_SessionStorage_SaveGet.ts` — persistence.
  sessionStorage key `limelight_project_page_advanced_tag_filter`. Exported types
  `ProjectPage_SearchesSection__Advanced_TagFilter` (`{ betweenGroups_Operator, groups }`) /
  `..._Group` (`{ literals, groupOperator }`) / `..._Literal`. Stored value is namespaced by
  `projectIdentifier` (ignored on load if it doesn't match the URL's project). Load runs through
  `_validate_Advanced_TagFilter` (see Persistence).

## Behavior & decisions (load-bearing)

- **Basic → Advanced** (`_switchTo_Advanced_TagFilter`): seeds the builder from the current basic
  selection *before* clearing basic, via `_build_Grouped_SeedGroups_From_ExistingSelections` —
  each basic **AND** tag → its own 1-tag group; each **NOT** tag → its own 1-tag negated group;
  the **OR** bucket → a single group with `groupOperator: 'OR'`. Sets
  `betweenGroups_Operator = 'AND'` — so the seeded filter reproduces the basic filter's meaning
  exactly (OR within the OR-bucket group, AND between groups). Then clears basic and persists the
  advanced filter (so a reload defaults to Advanced).
- **Advanced → Basic** (`_switchTo_Basic_TagFilter`): clears the advanced filter (incl.
  sessionStorage) and re-filters.
- **Persistence / migration / default on load:** persisted to sessionStorage per project.
  `_validate_Advanced_TagFilter` sanitizes (numeric `tagId`, boolean `negated`, per-group
  `groupOperator`), **drops empty groups**, and returns `null` if nothing usable remains. It handles
  **both** shapes: the current `{ groups:[{literals, groupOperator}], betweenGroups_Operator }` and
  the **old** coupled shape `{ andGroups:[{literals}], withinGroup_Operator }`. For the old shape it
  **migrates**: every group's `groupOperator = old withinGroup_Operator` and
  `betweenGroups_Operator = opposite(old)` — preserving each already-saved filter's original CNF/DNF
  meaning. On load, if a non-empty advanced filter is present (after dropping tags no longer in the
  project), the page **defaults to Advanced mode**.
- **Builder starts with ZERO groups** (`isPristine = groups.length === 0`). Pristine shows a dashed
  empty-state callout ("Start adding tags to the first group.") with **one** primary button, "Add tags
  to first group", which opens the picker **with** the OR/AND radios (the first group is empty). There
  is no "add empty group" link in the pristine state.
- **Empty-group rule** (important, and intentional):
  - `_isAdvanced_TagFilter_Active()` = "seed has ≥1 group" — so an **empty group counts as active**.
  - `_advanced_TagFilter_Matches()` returns **false** if any group is empty ⇒ an **empty group
    blocks ALL searches**. The preview shows a red warning instead of the expression: *"At least one
    group is empty, so no searches pass the filters. Populate all groups, or remove empty groups."*
  - The **pristine** state (zero groups, seed `[]`) is **not** active, so it shows **all** searches.
  - So: no groups ⇒ show all; ≥1 group with an empty one ⇒ show none (warning); all groups populated
    ⇒ evaluate the expression.
- **Evaluation** (`_advanced_TagFilter_Matches`, given a search's tag id `Set`): within each group,
  literals combine with **that group's** `groupOperator` (`every` for AND, `some` for OR); a
  **negated** literal matches when the tag is **absent**. Group results then combine with the single
  `betweenGroups_Operator`. (Unambiguous because there is one shared between operator — associative.)
  This duplicates the preview component's display logic — a possible future cleanup is to extract one
  shared evaluator.
- **clear** (`_clearAdvancedTagFilter`, wired to the summary's "clear"): empties the seed, resets the
  between operator to `'AND'`, clears persistence, re-filters, and **remounts the builder** by bumping
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
  explainer is capped `maxWidth: 620` so it can't blow out the panel. The pristine empty-state callout
  is **not** wrapped in the panel.
- Per-group UI: header shows "Group N" + a circle-delete icon (`static/images/icon-circle-delete.png`,
  tooltip "Remove Group"); a populated group shows tag chips with the inline (clickable) `groupOperator`
  between them + an "Add tag" fake-link; an **empty** group shows an "Add tags to group" button + an
  italic "(Empty Group)" marker.
- **"Add a group"** is a real `<button>` and is the **last item in the same flex-wrap row as the
  groups**, so it sits to the right of the last group and wraps to a new line only when out of room.
  The last group carries an 18px right margin (space that collapses harmlessly to trailing space when
  the button wraps, so the button stays flush-left — no indent); the button wrapper has top/bottom
  margin for separation when it wraps to its own line.
- The advanced **"Filtering on tags:" summary** is rendered by the **parent** inside the shared
  `filter-on-tags--currently-filtering` block via `Tag_Filter_Expression_Preview_Component`. So in
  Advanced mode the expression appears twice by design: editable (builder) + read-only summary
  (parallels basic: selector + summary).

## Search-count displays (searches-section-wide)

The searches section shows several **search counts**, all computed client-side (no server change):

- **Per-tag count — how many searches in the project have each tag.** The container computes
  `_searchesPerTagId_Map` (`Map<tagId, count>`) in one pass over every search's `searchTagIds_Set` when
  the search/tag data is (re)built, and threads it as an **optional `searchesPerTagId_Map` prop** through
  the tag components (no-op where a caller doesn't supply it). It appears in:
  - the **advanced tag-picker overlay** — as `( N )` after each tag name (`( None )` when zero), plus a
    line at the bottom of each tag's tooltip;
  - the **advanced builder chips** and the **advanced "Filtering on tags:" summary** (preview) — in each
    tag's tooltip;
  - the **basic "Filter On Tags:" selector** — appended to each tag's existing tooltip;
  - the **basic "Filtering on tags:" summary** — as a tooltip (these tags previously had none — a real
    Limelight tooltip replaced an empty native `title`).
  - Tooltip wording is sentence-case: "3 searches have this tag" / "1 search has this tag" / "No searches
    have this tag" (8px above the line). The overlay chip uses the terse `( N )` / `( None )` form. A tag
    **absent** from the map has **zero** searches (the value is `undefined` only when no map is supplied).
- **"N searches passed the filters"** — at the bottom of the "Filtering on …" box, shown whenever text
  and/or tag filtering is active (`_filtered_Searches_PassedCount()` = size of the filtered
  projectSearchId set). Pluralized; reads "0 searches …" when a filter excludes everything.
- **Per-folder count `(N searches)`** — after each folder name in the search/folder list
  (`FolderEntry._folder_PassingSearchCount()` in `projectPage_SearchesSection_SearchesAndFoldersList_Component.tsx`):
  searches in that folder that pass the filters, or the folder total when no filter. Pluralized, zero →
  `(No searches)`, hover tooltip "Folder contains N searches[ that pass the filters]". While filtering,
  folders with zero passing searches are hidden (`folderIds_ToDisplay...`), so `(No searches)` mostly
  appears for empty folders with no filter active.

Note the intentional wording split: the tag chip's zero form is **`None`**, while the sentence tooltips and
the folder count use **`No`** ("No searches …") — the terse chip vs. natural-sentence contexts.

## Possible follow-ups (noted, not done)

- Extract the duplicated group-expression evaluator (`_advanced_TagFilter_Matches` vs. the preview
  component's display logic) into one shared function.
- Migrate the other consumers of `Search_Tags_Selections_Object` /
  `Search_Tags_SelectSearchTags_Component` toward this grouped model, if the basic filter is ever
  retired.
- The "prototype" naming (`use_Advanced_TagFilter_Prototype`, `// PROTOTYPE:` comments) could be
  renamed now that the feature is live.
