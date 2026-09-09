# Quant pages — TODO / remaining work (living doc)

**Evolving list — add items as they arise.** This tracks what is left to do / deferred on the **quant pages**
(the FlashLFQ-quant clones: the Quant peptide page and the Quant single-protein overlay). It is a working
to-do list, not a status page. For overall *state & decisions*, start at the hub:
[`flashlfq_quant_status_and_decisions.md`](flashlfq_quant_status_and_decisions.md).

Each item is tagged **OBSERVED** (verified against current source, with file:line) or **ROADMAP**
(intended/near-term direction, higher-level — not yet scoped in code).

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

---

## Related docs
- **Status & decisions hub (start here):** [`flashlfq_quant_status_and_decisions.md`](flashlfq_quant_status_and_decisions.md)
- **DB-persistence (Track B) considerations:** [`quant_things_to_deal_with_when_start_store_in_db.md`](quant_things_to_deal_with_when_start_store_in_db.md)

*Public repo — this is design/feature content only. Do not add secrets, credentials, internal hostnames/IPs, or
other private information here.*
