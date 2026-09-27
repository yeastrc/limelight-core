# Quant pages — TODO / remaining work (living doc)

**Evolving list — add items as they arise.** This tracks what is left to do / deferred on the **quant pages**
(the FlashLFQ-quant clones: the Quant peptide page and the Quant single-protein overlay). It is a working
to-do list, not a status page. For overall *state & decisions*, start at the hub:
[`flashlfq_quant_status_and_decisions.md`](flashlfq_quant_status_and_decisions.md).

Each item is tagged **OBSERVED** (verified against current source, with file:line) or **ROADMAP**
(intended/near-term direction, higher-level — not yet scoped in code).

---

## ⚠ TOP-PRIORITY DEFERRED — MUST be done (added 2026-09-26)

Cross-cutting cleanups the maintainer explicitly wants tracked so they are not lost. Each is its own change + review.

**STATUS 2026-09-26:** items **A DONE** (both standalone list pages deleted) and **B DONE** (single-requestId full
sweep landed) — both review-verified, uncommitted. Item **C (future)** added below.

### A. DELETE the two standalone quant LIST pages (retire the clones)
The standalone **Quant peptide LIST page** and **Quant protein LIST page** (psb routes `d/pg/psb/quant-peptide/`
and `d/pg/psb/quant-protein/`) are **retired in favor of the Quant Common pages** (`quantCommonSPAView...`). No
live navigation reaches them (project-page run-list links removed 2026-09-23; URL builders only build quant-common
URLs; no external importers — GROUNDED 2026-09-26).

**⚠ CORRECTION (grounded 2026-09-26 — supersedes any earlier "delete the overlay/shared" wording):** the
single-protein **overlay** (`quant_single_protein_page/`) and `quant_peptide_and_single_protein_shared/` are
**NOT deletable — they are LIVE dependencies of the KEPT Quant Common page** (Quant Common ProteinView/PeptideView
import + instantiate the overlay; PeptideView imports 3 modules from the shared dir). KEEP them. (Optional later
cleanup, deferred: relocate those two dirs out of the `quant_pages/` "standalone" location to shed the misleading
naming — pure import-path churn, Quant Common would be the only importer once the list pages are gone.)

**Deletion footprint (GROUNDED 2026-09-26):**
- DELETE FE dirs `quant_peptide_page/` (8 files) + `quant_protein_page/` (9 files).
- DELETE Java `QuantPeptideView_Controller.java` + `QuantProteinView_Controller.java`; JSPs `quantPeptideView.jsp`
  + `quantProteinView.jsp`; path consts `QUANT_PEPTIDE_VIEW_PAGE_CONTROLLER` / `QUANT_PROTEIN_VIEW_PAGE_CONTROLLER`
  (AA_PageControllerPaths_Constants.java); `build.gradle` esbuild entries for both RootLaunch bundles.
- EDIT the now-dead references: the `"quant"` nav block in `head_section_include_data_pages.jsp` (the only external
  user of those two path constants) and, in `navigation_dataPages_Maint_Component.tsx`, the `NavigationType_Enum.QUANT`
  member + its else-if branch + the `quant:` type field (set ONLY by the two standalone pages).
- KEEP: the overlay + shared dirs (above), `data_pages/quant/` shared utilities, and all FlashLFQ result-retrieval
  controllers (shared).
This is the endgame for sections 1–3 below (which describe the now-shared forked overlay/section that stays).

### B. FINISH the single-requestId sweep (light guard landed; full sweep deferred)
Post-redesign, **one user submit → one FlashLFQ-service request → one requestId**, permanently — so a
result-*viewer* page can never legitimately have more than one requestId.
- **Light guard (2026-09-26, being added now):** the Quant Common page's `MainContent` hard-fatals if it
  resolves **>1** distinct requestId — `quantCommonSPAView_MainContent_Component.tsx` (guard at the
  `distinctRequestIds` derivation, ~L205–L213). The plural plumbing is left intact (it just runs over a
  length-1 set).
- **Full sweep (DEFERRED — this item):** convert the SHARED `QuantRunInfoPanel_Component`
  (`page_js/data_pages/quant/quantRunInfoPanel_Component.tsx`) prop `requestIds: Array<string>` → a single
  `requestId: string`, and **remove its union/group-across-requestIds internals** (the "union across a run's
  requestIds deduped by searchScanFileId" at ~L182/L197/L273 and the "shared settings when identical across
  requestIds else per-group" at ~L300/L338 all collapse to one run's single manifest + metadata). Then update
  **all three** mount sites — each derives its own `_distinctRequestIds` today — to derive + pass a single
  `requestId` and enforce single (hard-fatal if >1), reusing the light-guard logic:
  - `quantCommonSPAView_MainContent_Component.tsx:413` (already guarded per above),
  - `FlashlfqPeptideDataFilePage_Root_Component.tsx:371` (raw peptide data-file page — an A2 viewer, NOT a
    retiring page),
  - `FlashlfqProteinDataFilePage_Root_Component.tsx:414` (raw protein data-file page).
- **EXCLUDE (do NOT touch):** the project-page quant section — `projPg_Quant_RunsList_Component.tsx` and
  `projPg_Quant_FlashLFQ_Run_Status_FromServer.ts` — also use plural `requestIds`, but that is a **legitimately
  different concept** (a project has *many* quant runs; the runs list enumerates all of them). The
  single-requestId invariant is only about a viewer page showing **one** submit.
- Why deferred: the sweep spans the shared panel + 3 viewer page types (wider review/drive surface); the light
  guard already delivers the safety behavior on the Quant Common page now.

*(All file:line anchors OBSERVED against source 2026-09-26; re-verify before editing — line numbers drift.)*

---

### C. Feature-major quant response + store — CONSIDERED + DECLINED 2026-09-27 (do not re-litigate)
**Decision (the maintainer + review, 2026-09-27): NOT worth doing.** Reasoning: (1) peptide `reportedPeptideId` is a
per-search identifier, NOT cross-search-safe, so `Sequence → reportedPeptideId` is an inherent per-search TRANSFORM
(not fixable shape-churn) — a feature-major store wouldn't remove it. (2) Protein `proteinSequenceVersionId` is
globally unique/safe, but the only gain would be removing the cheap in-memory charts transpose (marginal), and
protein-only would leave peptide + protein on different store shapes. (3) The "re-parse the file over and over"
concern is ALREADY solved by the single-fetch refactor (each combined file is fetched + parsed ONCE per request;
the remaining transpose is in-memory on cutoff-filtered data — not a real cost). (4) "Store the service's files as
canonical, no DB reshape" is about STORAGE shape and does not dictate the FE's in-memory structure. Net: the
meaningful wins are already captured by the single-fetch refactor. Left as-is. (Original description retained below
for context.)

### C (original description — feature-major quant response + store)
During the single-fetch retrieval refactor (see
[`quant_common_single_fetch_retrieval_refactor_plan_2026-09-26.md`](quant_common_single_fetch_retrieval_refactor_plan_2026-09-26.md)),
the chosen response shape is **per-ssfid** (outer = scan file, inner = that sample's records) — minimal change,
because the FE store is sample-major (`Map<ssfid, Map<featureKey,value>>`) and both consumers read it via getters.
**Deferred cleaner end-state (the maintainer's preference, saved for later):** a **feature-major** response that
matches the file — outer array per feature (peptide/protein), inner array per scan file, plus a root-level
`searchScanFileIds` array declaring the column order — AND a **feature-major store** to match, which would remove
the charts accessor's sample-major→feature-major transpose. It was NOT done in the refactor because it requires
rewriting the whole `quant_PrototypeData` / `flashlfq_proteinQuant_PrototypeData` store class + every consumer
(~10 methods + both table paths) — out of scope for a fetch-shape change. Revisit as its own change.

---

## 1. Quant single-protein overlay — tab-view widgets — RE-ENABLED / resolved (OBSERVED)

**Resolved 2026-08-28.** The three protein-sequence/structure tab-view widgets on the quant single-protein
overlay are **re-enabled** (un-deferred). The forked overlay MainContent
`limelight_webapp/front_end/src/js/page_js/data_pages/project_search_ids_driven_pages/quant_pages/quant_single_protein_page/proteinPage_Display__SingleProtein_MainContent_Component.tsx`
now renders all three, live:

- **Protein-sequence coverage widget** — `ProteinSequenceWidgetDisplay_Root_Component_React`, **L3206**.
- **Protein-sequence bar widget** — `ProteinSequence_Bar_WidgetDisplay__SearchBased__Root_Component`, **L3237**.
- **Protein 3D structure widget** — `Protein_Structure_WidgetDisplay__SearchBased__Root_Component`, **L3297**.

*Background (the prior state):* for the Option-X minimal launch these three widget JSX blocks were **commented
out (reversible — not deleted)**, the tab bar (**PROTEIN SEQUENCE / PROTEIN BAR / PROTEIN STRUCTURE**) was left
visible + switchable rendering **empty panels**, and an amber "not yet implemented on the Quant pages" caution
notice sat above the tab bar.

*Resolution (additive-only; no canonical edits):* their full support chain (imports, `StateObject` props, state,
data-loads, callbacks) was already live, so re-enabling was **un-deferring the render, not rewiring** — the three
`{/* QUANT OVERLAY FORK - P1 DEFERRED … */}` comment wrappers were removed and the amber notice deleted. Verified
the three uncommented blocks are **byte-identical to the canonical single-protein overlay MainContent**
(`protein_page/protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_MainContent_Component.tsx`,
widgets at L3206 / L3237 / L3297). (The two commented `proteinSequenceWidget_StateObject` lines at ~L1056 /
~L1236 were left as-is — they are pre-existing commented code present identically in canonical, **not** a fork
deferral.)

*Verified:* `tsgo --noEmit` clean + FE build; CDP on the quant single-protein overlay — each tab (Protein
Sequence coverage / Protein Bar / Protein Structure) renders populated content matching the canonical overlay for
the same protein; the amber notice is gone and the tabs still switch; no console errors.

## 2. Child-table (per-peptide expansion) — RE-ENABLED / resolved (OBSERVED)

**Resolved 2026-08-28.** Per-peptide child-table row expansion is **re-enabled** on **both** surfaces that
render through the forked section — the **Quant peptide list** *and* the **Quant single-protein overlay** (the
overlay inherits the same forked section).

*Background (the prior problem):* the forked data-builder emits **forked (`#1`) result types**
(`…PerReportedPeptideId_Entry`), byte-identical in shape to the canonical ones but a **distinct TypeScript
nominal type** (the entry class carries a `private` member, and its declaration lives in a separate module), so
the *shared* child-table consumer `reportedPeptidesForSingleSearch_createChildTableObjects` — which types its one
branded `_Parameter` field against the **canonical** entry — rejected the forked map. The child-table build was
therefore commented out ("child tables disabled for now (P1)").

*Resolution — Option C, "convert at the seam", encapsulated on the forked class (additive-only; no canonical
edits).* The forked entry class `CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry`
in
`.../quant_pages/quant_peptide_and_single_protein_shared/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData.ts`
manufactures the canonical entry from its own public surface (no conditionals — the source already satisfies the
canonical ctor's "only one set" invariant):
- aliased canonical import — **L69** (`… as Canonical_PerReportedPeptideId_Entry`);
- instance `to_Canonical_PerReportedPeptideId_Entry()` — **L148**;
- static `to_Canonical_Map( forkedMap )` — **L159** — the **single conversion point** the seams call.

*Seams where the forked map crosses into the shared canonical consumer* (each calls the static converter; the
`#2` multi-search branch instead hands the forked map to the **forked** `#6` builder unchanged):
- Single-search branch in
  `.../quant_peptide_and_single_protein_shared/jsx/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Create_TableData.tsx`
  — **L2458–L2460** (multi-search branch at **L2393**);
- Forked `#6` nested block in
  `.../quant_peptide_and_single_protein_shared/protein_page__single_protein_searches_for_generated_reported_peptide/js/proteinPage_SingleProtein_searchesForGeneratedSinglePeptide_createChildTableObjects.ts`
  — **L257–L261**.

*Verified:* `tsgo --noEmit` clean + FE build; CDP on both handoff URLs (2-search modes 1&2; 1-search/2-sub-groups
mode 3) × both surfaces — child tables expand and their content is **byte-identical to the canonical peptide
page** for the same peptide (multi-search rows also expand through the `#6` level); no console errors.

## 3. Roadmap (higher-level, near-term — ROADMAP)

- **Quant single-protein *standalone page*** — currently the single-protein view on the quant pages is delivered
  as the **overlay** launched from the Quant peptide page (Option X, just landed). A dedicated standalone quant
  single-protein *page* is deferred.
- **Charts / statistics on the quant pages** — quant-specific charts/plots and summary statistics are deferred.
- **DB persistence (Track B)** — the quant data is currently a throwaway in-memory/prototype path; durable
  database ingestion & retrieval is future work. See
  [`quant_things_to_deal_with_when_start_store_in_db.md`](quant_things_to_deal_with_when_start_store_in_db.md)
  for the schema/ingest considerations catalogued so far.

## 4. No-PSMs / skipped-file user-facing display — deferred follow-ups (ROADMAP)

**Context.** When a mapped scan file has zero passing PSMs (its search's filters exclude everything), FlashLFQ
cannot quantify it — a file needs its own identifications; Match-Between-Runs cannot recover a zero-PSM file
(see [`quant_add_new__submit_no_psms_to_run_decisions_2026-08-20.md`](quant_add_new__submit_no_psms_to_run_decisions_2026-08-20.md)).
Limelight already expresses this in places; two more are wanted so the user is never left expecting quant that
will never appear.

**Already expressed (done):**
- **PER_FILE runs:** an empty mapped file surfaces via `noPsmsPairs` + the runs-list count breakdown (e.g.
  `3 (1 no PSMs)`).
- **JOINT runs (2026-09-23, uncommitted):** empty mapped files now appear in the "Uploaded Metadata & Quant
  Run Settings" run-info panel as a greyed/italic row, PSM count `0 — no PSMs (not quantified)`, with an
  explaining hover tooltip (`hasPsms:false`). See the decisions doc above.

**Deferred follow-ups (both display-policy decisions — the maintainer's call):**

| # | Surface | User sees now | Desired improvement | Constraints / open choices |
|---|---|---|---|---|
| 1 | Main **quant peptide DataTable**, the per-file `Quant (<searchId>)` column | Empty cells for a file whose search had no PSMs, unexplained | A **message block** (leaning away from the already-large column-header tooltip) stating: no PSMs for that search → no quant, **even in a single JOINT run with MBR** | Must fit the table's existing non-value semantics (blank vs `overlapping signal` vs measured-zero; `-1` sort sentinel — see `front_end` CLAUDE.md). Decide: which columns, block vs header-tooltip vs per-cell, exact wording. |
| 2 | Run-info panel disclosure (JOINT) | Empty files ARE shown, but the panel is collapsed-by-default → skipped files are "buried" | **Prominently point out** which scan files are fully skipped in a single JOINT/MBR run, so there is no expectation of any quant for them | E.g. a header badge/count, auto-expand when an empty file exists, or a main-area line. Purely presentational; builds on the 2026-09-23 panel work. |

---

## Related docs
- **Status & decisions hub (start here):** [`flashlfq_quant_status_and_decisions.md`](flashlfq_quant_status_and_decisions.md)
- **DB-persistence (Track B) considerations:** [`quant_things_to_deal_with_when_start_store_in_db.md`](quant_things_to_deal_with_when_start_store_in_db.md)

*Public repo — this is design/feature content only. Do not add secrets, credentials, internal hostnames/IPs, or
other private information here.*
