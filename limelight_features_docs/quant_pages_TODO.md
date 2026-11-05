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

### D. Legacy FlashLFQ result-retrieval endpoints — COMMENTED OUT 2026-10-19 (unused legacy endpoints; maintainer decision)

- **2026-10-19 (W5):** all EIGHT legacy FlashLFQ result-retrieval webservices are now **commented out** (unused legacy
  endpoints): the four protein ones below AND the four peptide ones (`flashlfq-run--result-retrieval-joined`,
  `…-peptides-normalized-linear`, `…-peptides-batch-corrected-log2`, `…-peptides-batch-corrected-delog2`). In each
  `single_project_search_id/FlashLFQ_Run__Result_Retrieval_*_RestWebserviceController.java` the imports, annotations and
  class body are commented out (the file, package line and class comment stay), and their eight URI constants in
  `AA_RestWSControllerPaths_Constants.java` are commented out; the URLs now answer 404 (unmapped). Their only callers,
  `quant/quant_PrototypeData.ts` / `quant/flashlfq_proteinQuant_PrototypeData.ts`, are reachable only from the
  commented-out Quant Common peptide / protein views. The shared peptide join (`FlashLFQ_Quant_PeptideResult_Join_Service`)
  and the two prototype loaders stay as (unreachable) code. Kept rather than deleted so those views can be revived;
  reviving the endpoints needs a review of them first (and the protein parse fix below).

The 2026-10-01 note (protein endpoints disabled; still applies to their code):

- **What is disabled:** the four `FlashLFQ_Run__Result_Retrieval_Proteins*_RestWebserviceController` webservices
  (`flashlfq-run--result-retrieval-proteins`, `…-normalized-linear`, `…-batch-corrected-log2`,
  `…-batch-corrected-delog2`). Each handler now starts with
  `if ( true ) { throw new Exception( "Require updating to be able to use" ); }`; the rest of the code is kept.
- **Why:** submits from 2026-10-01 on send FlashLFQ bare `psvid_<n>` protein ids (names travel separately —
  `quant_protein_names_mapping_file_and_request_contract_2026-10-01.md`). These controllers take the id up to the
  next `_`, so a bare multi-member protein group (`psvid_1;psvid_2`) no longer parses (the row would be skipped).
  Older runs (`psvid_<n>_<name>` strings) happened to parse the first id.
- **Who called them:** only `quant/flashlfq_proteinQuant_PrototypeData.ts`, used by the quant common protein view
  and by the old per-view Quant Charts panel's side-file loader — both reachable only from code that is commented
  out in `quantCommonSPAView_MainContent_Component.tsx`. The Charts view does not use them.
- **To re-enable:** fix the `Protein Groups` parse (split on `;`; per member, the id = the digits after `psvid_` up
  to the next `_` or the end; decide how a multi-member group is attributed), then delete the `if ( true )` block in
  each of the four handlers.

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
- **Quant Common page's Charts view — several covariates / a continuous covariate in Differential abundance: DONE
  2026-10-22 (Phase 6, front end only, uncommitted).** Decisions, what was built and how it was checked: decision log
  §23 ("Built 2026-10-22") in
  [`quant_common_page__charts_view__decision_log_and_rationale_2026-10-04.md`](quant_common_page__charts_view__decision_log_and_rationale_2026-10-04.md);
  design doc §4b. Still open: the maintainer's decision Q-E on 6 reference-parity lines of the real test run (two-slope
  designs, effect off by ≈ 1.03e-12 × SE vs the 1e-12 limit). Remaining Charts-view deferred items: design doc §7.
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

## 5. Gzip the quant run files (added 2026-10-19, maintainer — DECIDED 2026-10-19, see below)

Prompted by the peptide identity map (`quant_peptide_identity_map_contract_2026-10-14.md`): one 8-scan-file run's
`peptide_identity_map.json` is about 20 MB and about 1.2 MB with gzip at the default level (measured 2026-10-14, about
16x smaller, about 0.1 s). Question to look at: which OTHER run files would benefit from being stored and/or served
gzip-compressed (written once when generated, served with `Content-Encoding: gzip` so the browser decompresses), for
example:
- the result files the Charts view fetches (`CombinedPeptides*.tsv` / `CombinedProteins*.tsv`, several MB each for an
  8-file run) — transfer to the browser;
- large files kept only on the service's disk (`request_body.json`, the largest file of a run; `flashlfq_identifications.tsv`;
  `QuantifiedPeaks.tsv`) — disk use;
- the download set (would change what the user downloads — a separate decision).
Measure sizes and compression ratios on a real run first; consider whether general HTTP response compression in the
deployment would cover the served files without per-file changes.

**DECIDED 2026-10-19 (maintainer) — gzip EVERY run file; being built in three phases (S1 service, W1 webapp readers,
W2 download links).**
- Measured on one 8-scan-file run (gzip level 6): `request_body.json` 208 MB → 11.2 MB (18.6x); `QuantifiedPeaks.tsv`
  58.6 MB → 19.1 MB (3.1x); `flashlfq_identifications.tsv` 50.3 MB → 7.8 MB (6.4x); `CombinedPeptides*.tsv` 2.4–3.0x;
  `CombinedProteins*.tsv` 3.1–3.6x. Whole run directory about 340 MB uncompressed.
- **Why everything:** so all service and webapp code expects gzip when run files are stored long term (planned: Limelight's
  File Object Storage Service — later work).
- **Strict:** a reader that finds a non-gzip file where gzip is expected fails loudly; runs written before this change are
  unreadable and must be re-run. The service's outputs version goes 4 → 5.
- **Service:** working files stay plain while a run is processing (FlashLFQ needs them); one final pass gzips every kept
  file (level 6, header mtime 0) and the run-status marker is written last. `request_body.json` is written gzip at submit.
  Files are served as gzip bytes (`application/gzip`, no `Content-Encoding`).
- **Webapp (W1):** every reader handles gzip; data sent on to the browser uses `Content-Encoding: gzip` when the browser
  accepts it, else the server unzips (the existing helper used for the peptide identity map). **BUILT 2026-10-19 (not yet
  committed):** one shared strict fetch (`FlashLFQ_Quant_RunResultFile_Fetch_Service`: gzip magic + full decompress, else a
  logged 500) used by every reader — relays via `FlashLFQ_Quant_RunResultFile_RelayToBrowser_Service`, server-side parses and
  the download controller unzip (the download stays the plain file until W2). The request-belongs-to-project check now
  throws (500) for an unreadable / unparseable manifest instead of answering 404. The front end expects outputs version 5;
  the run info panel shows `FlashLFQ version: <reported> (release <release>)`; the run info loaders treat a non-404 error
  as fatal instead of "absent".
- **Download (W2):** each downloadable file offers BOTH a plain and a gzip download (two links per file — design at W2);
  the plain download is unzipped by the server while it writes the response. **BUILT 2026-10-19 (not yet committed):**
  overlay rows = label + `[TSV]` `[gzip]` (tooltips); the download request's REQUIRED `encoding` field ("plain" / "gzip");
  gzip = the stored bytes, `<name>.gz`, `application/gzip`, no `Content-Encoding`; plain streamed. Also in W2: a malformed
  run-info file (quant metadata, manifest, normalize / batch-correct status) and a network failure are now fatal on the
  quant pages (a 404 stayed "absent" where absence is legitimate -- superseded by W4 below); an unused legacy endpoint was removed.
- **W3 + W4 (BUILT 2026-10-19, not yet committed): no "404 = absent" anywhere.** W3 made the remaining lenient loaders fatal
  on network / contract failures. W4 replaces every remaining "404 = absent" with ONE early availability call per run per
  page: the webservice `quant--flashlfq-run-available-files` returns the run's status and a FULL true / false map of every
  known file (top-level, and per scan file for a PER_FILE run). Every quant file loader takes the map as a required input: a
  file it says is absent is not fetched (no metadata uploaded, normalization / batch correction not run or not requested,
  a derived file not produced, the raw TSV pages' "unavailable"); a file it says is present is fetched and a 404 is fatal.
  "No such run" comes from the map call itself (its 404, or status `NOT_FOUND`) and is shown as "no longer available". The
  Charts view also checks the map against the manifest's `requested_outputs`: a requested file the map lacks is fatal. The
  project-page download overlay builds its list from the same map (it was broken by the service's new `per_file_files`
  field until W4). Contract: `quant_result_file_download_contract_2026-10-05.md` (last section).
- **Also in S1 — FlashLFQ version per run:** the raw output of a FlashLFQ version query is stored, and the manifest records
  the release version and the reported version line; if the query fails the run does not fail and the manifest stores
  `unable to get version at quant run time`. The run info panel shows it (built in W1).

---

## Related docs
- **Status & decisions hub (start here):** [`flashlfq_quant_status_and_decisions.md`](flashlfq_quant_status_and_decisions.md)
- **DB-persistence (Track B) considerations:** [`quant_things_to_deal_with_when_start_store_in_db.md`](quant_things_to_deal_with_when_start_store_in_db.md)

*Public repo — this is design/feature content only. Do not add secrets, credentials, internal hostnames/IPs, or
other private information here.*
