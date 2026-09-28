# Quant Common page — design goals & deferred changes

Durable notes for the Quant Common peptide/protein SPA page
(`.../project_search_ids_driven_pages/quant_pages/quant_common_spa_view_page/`): a persistent parent
`quantCommonSPAView_MainContent_Component.tsx` renders EITHER `QuantCommonSPAView_PeptideView_Component`
OR `QuantCommonSPAView_ProteinView_Component` as its child, chosen by a client-side view toggle.

---

## GOAL (durable, maintainer-stated 2026-09-28): switching between the peptide and protein views must NOT hit the server once both are loaded

Once a view's data has been loaded from the server, toggling between the peptide view and the protein view
should be a **pure client-side swap — zero new server round-trips**. First visit to a view may load its data;
after that, switching back and forth (in either direction) must serve entirely from already-loaded data.

**Why:** the maintainer minimizes server round-trips / awaits — once the data is in hand, a view switch is a
UI operation, not a data operation. (Pairs with the general preference for synchronous fast-paths over
awaiting already-resolved promises.)

**How this is achieved today (the pattern to preserve/extend):** the quant result matrices are held in
MODULE-LEVEL singleton caches with synchronous "get if already loaded" accessors — e.g.
`quant_PrototypeData_GetIfLoaded()` / `..._NormalizedLinear_GetIfLoaded()` / `..._BatchCorrectedLog2_GetIfLoaded()`
in `quant/quant_PrototypeData.ts`, and the protein equivalents in `quant/flashlfq_proteinQuant_PrototypeData.ts`.
Because these caches are module-scoped (not per-component state), they survive the child view unmount/remount
that a toggle causes, so a re-visited view re-renders from cache with no fetch.

**The rule this implies for NEW page data:** any newly-loaded data that both views (or a re-visited view) need
must be cached at a level that OUTLIVES the per-view component — a module-level singleton (like the prototype
data above) or the persistent parent (`MainContent`) — and passed down / read via a synchronous
already-loaded accessor. Do NOT load data in a child view's `componentDidMount` in a way that re-fetches every
time that view is toggled back in. (This is exactly the constraint behind the deferred change below.)

---

## DONE (2026-09-28): moved the "Uploaded Metadata & Quant Run Settings" panel below the per-view control block

**Status: IMPLEMENTED via Approach B (module-level cache) + LAZY load-on-first-expand — 2026-09-28.** Deployed +
review-verified (source + real UI). The panel renders inside each child view after the control block, loads its
run-info ONLY on the first expand, and caches it so nothing re-fetches afterward. OBSERVED (Network captured from
the initial page load): (1) panel collapsed on load → **zero** run-info fetches; (2) first expand → exactly one
quant-metadata + one params-manifest; (3) collapse + re-expand → zero additional; (4) toggle to the other view +
expand → zero additional (module cache hit); (5) panel below the control block on both views, no duplicate. A
user who never opens the panel triggers zero run-info fetches.
- New module cache: `quant/quantRunInfoPanel_DataCache.ts` (`..._Load` + synchronous `..._GetIfLoaded`, keyed by
  `{projectId, requestId}`, best-effort, module-scoped so it survives per-view unmount/remount).
- `quant/quantRunInfoPanel_Component.tsx`: **NO `componentDidMount` load** (must not fetch on mount); constructor
  keeps the synchronous `..._GetIfLoaded` fast-path (warm cache → panel starts loaded); the load is kicked off in
  `_toggleExpanded` on the first collapsed→expanded transition of a cold panel, guarded to at-most-once by
  `_loadInitiated`. No longer self-loads on mount via the raw loaders.
- `quantCommonSPAView_MainContent_Component.tsx`: removed the parent panel render; threads
  `runInfoPanel_ProjectId/RequestId/Ready` down to both children (required props).
- Both child views render `<QuantRunInfoPanel_Component>` after their control block; base placeholders in
  `quantCommonSPAViewPage_RootClass_Common.ts`.

The original scoping notes are retained below for history.

**(original) Status: SHELVED — do not implement until a user requests it.** Recorded so it isn't re-analyzed from
scratch.

**The requested change:** move the "Uploaded Metadata & Quant Run Settings" panel so it renders AFTER the
per-view control block that holds **Set Default View + Save to Highlighted Results + Share Page** (currently
the panel is above it).

**Current layout (grounded):**
- Panel = `QuantRunInfoPanel_Component` (`quant/quantRunInfoPanel_Component.tsx`, title at `:155`), rendered
  ONCE in the shared parent `quantCommonSPAView_MainContent_Component.tsx:471-473`, BEFORE the child view. Its
  `projectId`/`requestId` props + a `_runInfoPanel_Ready` gating are computed on the parent.
- The control block = a `<div style={{paddingBottom:15}}>` holding Set Default View + the "Save to Highlighted
  Results" button (`saveView_React/saveView_Component_React.tsx:91`) + Share Page, rendered PER-VIEW near the
  top of each child: `quantCommonSPAView_PeptideView_Component.tsx:3163-3171` and
  `quantCommonSPAView_ProteinView_Component.tsx:3919-3927`.
- Because the control block lives inside each child, placing the panel *after* it means the panel must move
  INTO both child views (two places).

**IMPLEMENTATION CONSTRAINT — use APPROACH B ONLY (maintainer-directed).** When this is eventually done, it
MUST NOT reintroduce a per-toggle server load (see the GOAL above):
- **Approach A (rejected):** move the self-loading `QuantRunInfoPanel_Component` into each child view. This
  would unmount/remount the panel on every peptide↔protein toggle, re-fetching its run-info each time —
  violates the no-reload-on-switch goal. Do NOT do this.
- **Approach B (the only acceptable route):** lift the run-info DATA loading up so it is loaded once and cached
  above the per-view lifetime (module-level singleton or the persistent parent), and make the panel a
  pure-display component fed that data as props. Then render the (now stateless) panel inside each child view
  after the control block, reading from the already-loaded cache — no re-fetch on toggle.

Grounding pointers for whoever implements it: source render `MainContent:471-473`; destinations after
`PeptideView:3171` and `ProteinView:3927`; run-info loaders live in `quant/quantRunInfo_LoadFromServer.ts`.
