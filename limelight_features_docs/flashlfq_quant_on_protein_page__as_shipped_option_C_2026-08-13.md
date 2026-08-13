# FlashLFQ quant on the Protein page — AS SHIPPED (Option C, two per-protein columns)

**Date: 2026-08-13.** This is the **as-built companion** to the design/options doc
`flashlfq_quant_on_protein_page__options_and_implementation_plan_2026-08-12.md` (which laid out Options A/B/C
and the task list). That doc chose the *plan*; this one records **what was actually built** — the code, the
semantics, the join, the fixes, and how it was verified.

**Status of the code:** the feature is a **THROWAWAY PROTOTYPE** and, as of this writing, is **held /
uncommitted** in the working tree (every file cited below is a working-tree change, not yet committed). It is
gated entirely on a URL hash and deletes cleanly once the real DB-backed ingest (Track B) lands. **Provenance:**
every `file:line` below was read directly from the working-tree source this session. Runtime behavior marked
"**user-verified**" was verified by Dan in the live app and reported in the gitignored session handoff
(`.claude/session_handoffs/flashlfq_quant_protein_page_SESSION_2026-08-13.md`) — it was **not** re-observed at
runtime while writing this doc. Local-only test data (DB creds, project/search ids, run hashes, working URLs)
is deliberately **not** in this public-repo doc; it lives in that handoff.

---

## 1. What shipped

**Option C** from the plan: two side-by-side **per-protein** quant columns on the projectSearchId **Protein
LIST** page (`d/pg/psb/protein`; the experiment-driven `d/pg/exp/protein` is out of scope):

- **Quant (FlashLFQ)** (Option A) — FlashLFQ's own per-protein intensity from its `QuantifiedProteins.tsv`
  (weighted median polish over each protein's *unique* peptides; shared-only proteins are blank), joined to
  Limelight protein rows by the exact `psvid_<id>` round-trip.
- **Quant (Limelight)** (Option B) — a Limelight rollup: sum (deduped by FlashLFQ `groupId`) of the protein's
  per-peptide quant, reusing the already-loaded per-peptide holder. Includes shared peptides (attributed to
  each protein, like NSAF), and reconciles with the per-peptide Quant column in the single-protein view.

Both columns are **per protein, never rolled up to the protein group** (`onlyShow_ValueDisplay_FirstRowOfGroup:
false`, exactly like NSAF — PSM counts roll up, NSAF and quant do not). Both are display-only: they appear
**only when the URL hash names run(s)**. A shared status/notice block renders above the table.

The columns render in all three display modes: **single search**, **multi-search** (one pair of columns per
search, labeled `Quant (FlashLFQ) (<searchLabel>)` etc.), and **single-search + sub-groups ("mode 3")** (one
pair per sub-group, each restricted to that sub-group's single scan file).

---

## 2. Architecture — the pieces that were added/changed

### 2.1 FlashLFQ service (`limelight-flashlfq-service`, separate repo)
- `app/web_listener.py:40` — added `"proteins": "QuantifiedProteins.tsv"` to the result-file allowlist (the
  file is produced every run; only retrieval was blocked). Image rebuilt + container recreated (details in the
  handoff §1). **Deployed.**

### 2.2 Webapp — new REST controller (Option A retrieval)
`.../rest_controllers/single_project_search_id/FlashLFQ_Run__Result_Retrieval_Proteins_RestWebserviceController.java`
- `@PostMapping` on path constant
  `AA_RestWSControllerPaths_Constants.FLASHLFQ_RUN__RESULT_RETRIEVAL_PROTEINS__REST_WEBSERVICE_CONTROLLER =
  "d/rws/for-page/flashlfq-run--result-retrieval-proteins"` (`AA_RestWSControllerPaths_Constants.java:792`).
- Request body is only `{ projectSearchId, requestId }` (`WebserviceRequest`, `:373`). **No DB work** — unlike
  the joined per-peptide controller, the join key is parsed straight out of the file, so no cutoffs / searchers
  / grouping-identity re-derivation (`:68-69`).
- Auth: `validatePublicAccessCodeReadAllowed( List.of( projectSearchId ), req )` (`:160-161`); `requestId`
  validated `^[0-9a-f]{32}$` (`:88`, `:150-153`) for traversal safety.
- Fetches `/flashLFQRunResult?request_id=<id>&file=proteins` from the configured service base URL
  (`fetchQuantifiedProteinsTsvFromService`, `:307-366`); a service **404** → HTTP 404 to the FE (rare
  swept-file race the FE degrades gracefully, `:167-171`, `:347-348`).
- Parse (`parse_QuantifiedProteinsTsv`, `:203-299`): requires the `Protein Groups` column + **exactly one**
  `Intensity_*` column (a per-(search, scan file) run has one; any other shape → `LimelightInternalErrorException`,
  `:231-237`). Per row: skip a `;`-joined shared/merged group (`:258-261`, defensive — shouldn't occur), skip a
  non-`psvid_` value (`:263-266`), else strip `psvid_` and take up to the next `_` → int `proteinSequenceVersionId`
  (`:268-280`); parse the single `Intensity_*` cell (empty/non-numeric → treated as `0`, `:282-290`). Returns
  `{ records:[ { proteinSequenceVersionId, intensity } ] }` (`WebserviceResult`/`PerProtein_QuantRecord`, `:388-408`).

**The `psvid_<id>` join is exact** because Limelight only ever emits one `psvid_<id>_<name>` token per FlashLFQ
protein group (FlashLFQ uses `;` between groups, which Limelight never sends), so each `QuantifiedProteins.tsv`
row's `Protein Groups` value is a single token → parse the int → exact `protein_sequence_version.id`. (See the
plan doc §3 for the full derivation and the mzLib citations.)

### 2.3 Webapp — WAR
Rebuilt + deployed via `ant -f ant_build_War_CopyToTomcat.xml` (needed for the new Java controller).

### 2.4 Front end — new files (under `.../data_pages/quant/`)
- **`flashlfq_proteinQuant_PrototypeData.ts`** (NEW) — Option-A holder, the protein-level sibling of
  `quant_PrototypeData.ts`. Same URL-hash run selection (same `_parseHash_ToPairs`, `:171-191`), same
  status-first two-phase fetch (batch status → per-READY-run proteins fetch, `_load_StatusThenResults`,
  `:265-341`), same on-loaded callback registry and `__ShouldShow_QuantColumn` semantics. Store is keyed
  `Map<searchScanFileId, Map<proteinSequenceVersionId, intensity>>` (`:91`). Public surface:
  `flashlfq_proteinQuant_Load` / `_RegisterOnLoaded` / `_GetIfLoaded` / `__ShouldShow_QuantColumn`
  (`:352-428`) and `get_ProteinIntensity( proteinSequenceVersionId, projectSearchId, restrictToSearchScanFileId )`
  (`:120-131`), which resolves the single scan file via `_resolveScanFileId` (`:138-149`; a restriction picks
  that scan file; otherwise the search's single run — a multi-file search with no restriction returns
  `undefined`/blank by design). **Load-time hard validation** (`:319-337`): a non-finite `intensity` or
  non-integer `proteinSequenceVersionId` throws (fail hard — mirrors the peptide loader). The
  `searchDataLookupParamsRoot` param is REQUIRED for call-site symmetry with the peptide loader but is
  deliberately **not** forwarded in the request body (`:388-395`).
- **`quant_PrototypeData_StatusMessages_Component.tsx`** (NEW) — SHARED, page-agnostic status banner.
  Renders the in-progress ("⏳ still being computed", `:58-68`) and failed/unavailable (`:70-80`) banners
  straight off a `Quant_PrototypeData` holder, then a page-supplied `notice` node (`:82`). Both props REQUIRED
  (`:33-36`). Extracted verbatim (styling + wording) from the single-protein section's inline block so every
  page shows identical status messaging.

### 2.5 Front end — edited holder (Option B rollup method)
`quant_PrototypeData.ts` — added `get_SummedQuantForProtein( reportedPeptideIds_ForProtein, projectSearchId,
restrictToSearchScanFileId )` (`:250-252`), a thin, well-named delegating wrapper over the existing
`get_SummedQuantForDisplayForm` (`:195`): same dedupe-by-`groupId` sum, same "any contributing group ambiguous
→ whole result ambiguous" rule. Separate name documents protein-scope intent and lets protein wording diverge
later without touching the peptide-row path.

### 2.6 Front end — protein LIST table builder
`.../protein_page__protein_list/jsx/proteinViewPage_DisplayData_ProteinList__Create_ProteinList_DataTable_RootTableDataObject.tsx`
(+609 / −11 lines):
- **Two shared cell helpers**, used at all cell sites in all three modes:
  - `_flashlfqProteinQuant_Cell_Display(...)` (`:86-120`): `undefined` → blank, `valueSort -1` (`:95`);
    `0` → `"0.00e+0"` + tooltip ("unique peptides present but FlashLFQ measured no MS1 signal"), `valueSort 0`
    (`:100`); `>0` → `intensity.toExponential(2)`, `valueSort = intensity` (`:111`), tooltip labeled
    **Quant (FlashLFQ)** (`:114`).
  - `_limelightProteinQuant_Cell_Display(...)` (`:145-...`): `undefined` → blank, `valueSort -1` (`:154`);
    `anyAmbiguous` → `"overlapping signal"`, `valueSort 0` (`:158-159`), tooltip
    **Quant (Limelight) — overlapping signal**; else `summedIntensity.toExponential(2)`, `valueSort = intensity`
    (`:177`), tooltip **Quant (Limelight) — per-protein rollup** (`:180`).
  - Each helper takes a REQUIRED `searchOrSubSearch_Identity_TooltipContent_Builder: () => React.JSX.Element`
    (`:88`, `:147`) that the CALLER builds as a `Search:` or `Sub Search:` line (cloned inline per mode — no
    mode conditionals inside the shared helper, per "don't over-centralize; clone-and-go").
- **Union-of-both-reportedPeptideId-fields helper** `_quantLimelight_Get_All_ReportedPeptideIds_ForSubItem(
  subItem )` (`:130-...`): returns the UNION of `reportedPeptideIds_NoPsmFilters` **and**
  `reportedPeptideIds_AndTheirPsmEntries__PsmEntry_Map_Key_PsmId_Map_Key_ReportedPeptideId` keys — matching the
  canonical combine at
  `…CreateProteinDisplayData_Combine_ReportedPeptideIdsPsmIds_Per_ProjectSearchId__After_ALL_Filtering.ts:185-201`.
  **This is the §1b fix** (see §4). Wired into all three Limelight cell sites.
- **Column construction** (mirrors the NSAF sibling): single-search `Quant (FlashLFQ)`/`Quant (Limelight)`
  (`:533`, `:554`); multi-search `Quant (FlashLFQ) (<searchLabel>)`/`Quant (Limelight) (<searchLabel>)`
  (`:1089`, `:1143`); mode-3 per-sub-group `Quant (FlashLFQ) (<subgroupName_Display>)`/`... (Limelight) ...`
  (`:884`, `:928`). **All** set `onlyShow_ValueDisplay_FirstRowOfGroup: false` (`:541`, `:562`, `:906`, `:950`,
  `:1122`, `:1176`) — the single flag that makes quant per-protein like NSAF.
- **Header tooltips at parity** with the sibling PSMs/NSAF columns: multi-search headers append a `Search:` block;
  mode-3 headers append a `Sub Search:` block via the shared
  `DataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup_Component`. (This was the §1c fix — see §5.)
- **New threaded param** `quant_subGroupId_To_SearchScanFileId_Map: Map<number,number> | undefined` runs through
  the whole builder chain alongside `quant_PrototypeData` / `flashlfq_proteinQuant` (`:234-236`, `:316-318`,
  `:1560-1562`, and call sites).

### 2.7 Front end — protein LIST main component
`.../proteinViewPage_DisplayData_ProteinList__Main_Component.tsx` (+207 / −1):
- Loads both quant holders and registers rebuild-on-loaded: `quant_PrototypeData_Load` +
  `flashlfq_proteinQuant_Load` + `_RegisterOnLoaded(rebuildOnQuantLoaded)` (`:806-814`), the callback guarded by
  `_isMounted_ForQuant` (`:415`, set `:615`, cleared in unmount `:644`) and calling `_re_renderPage_Actually`.
- Loads two per-PSM holders as instance fields — `_quant_psmTblData_MainFilters_Holder`
  (the **FILTERED** main-filters PSM loader) and `_quant_searchSubGroupId_ForPSM_Holder` (`:420-421`, populated
  `:860-882`) — via the common-data root getters, **not** gated on quant-showing (that gating was a bug: at load
  time quant isn't loaded yet, so the sub-group map never built → sub-group cells were permanently blank; FIXED).
- Builds `quant_subGroupId_To_SearchScanFileId_Map` at the builder call site via
  `quant_Build_SubGroupId_To_SearchScanFileId_Map__build({...})` when both holders are present (`:2372-2375`),
  and threads the two quant holders into the builder gated on `__ShouldShow_QuantColumn()` (`:2366-2367`).
- Renders `<Quant_PrototypeData_StatusMessages_Component>` above the table (`:3701`) with a per-protein
  comparison notice (PROTOTYPE-badged; "Quant is not rolled up to the protein group… shown per search for method
  comparison") whenever quant columns show (`quantColumnsWillShow`, `:3337`).
- Renders the existing owner-only `<Quant_Container_Component>` ("View/Add Quant" run launcher) above the table
  (`:3689`); it self-gates on `userCanRunQuant` + eligibility.

### 2.8 Front end — protein page root
`.../protein_page_root/proteinViewPage_RootClass_Common.ts` (+5 / −1): forwards
`dataPages_LoggedInUser_CommonObjectsFactory` into `LoadCoreData_ProjectSearchIds_Based` so `userCanRunQuant`
is computed (required for the View/Add Quant button; mirrors the peptide/QC roots).

### 2.9 Front end — single-protein peptide-list retrofit
`.../protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component.tsx`:
its inline in-progress + failed/unavailable banners now render via the shared
`Quant_PrototypeData_StatusMessages_Component`, with the overlap/summing/"About the Quant column" blocks passed
as its `notice`. Behavior preserved; this de-duplicates the banner code between the two pages.

---

## 3. Semantics (as coded)

- **Per protein, not per group.** `onlyShow_ValueDisplay_FirstRowOfGroup: false` on every quant column. A group
  header borrows the first member's cell (same as NSAF). No group rollup exists — and per Dan's 2026-08-13
  decision, none will be built or proposed unless he explicitly asks.
- **Scan-file scoping — quant is never summed across scan files.** Single-file search → one column, the search's
  run. Mode 3 → one column per sub-group, each restricted to that sub-group's single scan file via the
  `subGroup→searchScanFileId` map (1:1, enforced server-side). This upholds the repo-wide rule
  (`flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md`): PSM counts may sum across
  scan files; quant may not.
- **Cell states & sort sentinels** (both columns): **blank** (`valueSort -1`) < **measured-zero / overlapping**
  (`valueSort 0`) < **real intensity** (`valueSort = intensity`). So no-data sorts to the bottom on the common
  "biggest first" descending sort, and stays distinctly below measured-zero. This uses a real-number sentinel
  rather than the DataTable null-sort enum (the enum is direction-relative and can't give "always visually
  last"). The FlashLFQ column's `0` is a genuine measured zero; the Limelight column's `0` is
  `"overlapping signal"` (any contributing FlashLFQ group ambiguous). Both are labeled **PROTOTYPE**. This whole
  sort scheme is current-project and open to revision (see `front_end/CLAUDE.md` "Sorting null / no-data cells").
- **Values** are FlashLFQ MS1 label-free intensities, `toExponential(2)`. **A + B deliberately diverge** — that
  divergence (median polish vs summed peptidoform values; shared-only proteins blank under A but valued under B;
  B reconciling with the per-peptide column, A not) is the entire point of shipping both side by side, so the
  team can pick A or B (or keep both) from real numbers.

---

## 4. The union-of-two-fields fix (all three Limelight cells) — §1b

The "Quant (Limelight)" cells originally derived a protein's reportedPeptideIds from **only**
`reportedPeptideIds_NoPsmFilters`. A protein sub-item stores its reportedPeptideIds across **two** fields; the
complete set is their **union** (the canonical combine does exactly this). On a search where **PSM
sub-filtering is active**, every id lands in the *second* field (`reportedPeptideIds_AndTheirPsmEntries__…`), so
`NoPsmFilters` was empty → the cell passed `[]` → **blank**. The earlier "single/multi-search Limelight working"
observations were on data *without* active PSM sub-filtering, masking a latent bug in **all three** cells (not
just mode 3). FlashLFQ / NSAF / PSM columns were unaffected (they key on `proteinSequenceVersionId` or
precomputed counts). Fix: `_quantLimelight_Get_All_ReportedPeptideIds_ForSubItem` (§2.6) returns the union, wired
into all three Limelight cell sites. **User-verified** at runtime on native per-sub-group data.

---

## 5. Column header + cell tooltip parity — §1c

The columns were first added mirroring the *structural* parts of the sibling PSMs/NSAF columns but not their
tooltip conventions. Brought to parity (all in the protein-list builder):
- Multi-search headers now build a JSX-function tooltip appending the `Search:` block (id + short name + name).
- Mode-3 headers append the `Sub Search:` block via the shared
  `DataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup_Component`.
- **Cell** hover tooltips now carry the same `Search:` / `Sub Search:` identity line the sibling cells show
  (built per call site, passed as `searchOrSubSearch_Identity_TooltipContent_Builder`); FlashLFQ value cells
  gained a proper tooltip.
- Sort alignment: the Limelight cell's `overlapping signal` moved from `valueSort -1` to `0` to match the
  peptide-list quant column.

The general lesson was captured durably in **`limelight_webapp/front_end/CLAUDE.md`** ("Adding a column to a
`DataTable` — copy an adjacent column's FULL construction" + "Sorting null / no-data cells"), committed
docs-only as `7f548507b` (front_end/CLAUDE.md; **not pushed**). That is the **only** commit associated with this
work; all feature code remains held/uncommitted.

---

## 6. Verification status (provenance-marked)

**Read from working-tree source this session (this doc's citations):** every `file:line` above — service
allowlist, the new REST controller (auth, requestId regex, parse rules, one-Intensity-column enforcement, DTOs),
the new Option-A holder (hash parse, status-first fetch, scan-file resolution, hard load validation), the
`get_SummedQuantForProtein` wrapper, the two cell helpers + sort sentinels + union helper, all column
constructions and their `onlyShow_ValueDisplay_FirstRowOfGroup: false` flags, and the Main_Component wiring.

**User-verified at runtime (reported in the handoff §1b/§1c/§2; NOT re-observed while writing this doc):**
- Backend proteins controller returns correct records on the live WAR; intensities match the file.
- Single-search, multi-search, and mode-3 per-sub-group **Quant (FlashLFQ)** columns populate with correct,
  per-protein, per-scan-file-distinct values; grouped rows show per-protein values (not group sums, not blank).
- **Quant (Limelight)** per-sub-group values populate and reconcile after the §1b union fix (shared MBP-fusion
  peptides attribute the same value to each fusion protein; ambiguous rows show `overlapping signal`).
- Header and cell tooltips render with the `Search:` / `Sub Search:` identity (multi-search + mode-3).
- The owner "View/Add Quant" button appears and **created runs natively** on the protein page.

**Not independently re-verified here:** anything runtime. This doc is a static read of held code plus Dan's
reported runtime results.

---

## 7. House rules honored (spot-check)
Required params with explicit `undefined` (e.g. the two holders + the sub-group map threaded through the builder
as required params; the cell helpers' required identity-builder). Reuse of already-loaded holder instances (the
filtered main-filters PSM holder + sub-group holder via the common-data root getters — no `getNewInstance`
re-fetch; **NEVER** the unfiltered PSM loader). `projectSearchIds` read from the prop, not `DataPageStateManager`.
Instance-field caches (the two per-PSM holders + `_isMounted_ForQuant`) over memoization. Shared status/notice
component instead of duplicated banners; but shared cell helpers kept free of mode conditionals ("clone-and-go"
per-call-site identity). No negative margins.

---

## 8. This is a prototype — what remains (Track B)
All of the above is throwaway prototype code, hash-gated, that deletes cleanly. The real remaining work is
**Track B**: DB-backed ingest of quant so it is a first-class, persisted per-search result rather than a
hash-selected file read. Peptide-aggregation decisions (apex-vs-area, SUM-vs-MAX) and the A-vs-B choice remain
open — Option C exists precisely to inform that choice from real side-by-side numbers.

---

## 9. Related docs
- `flashlfq_quant_on_protein_page__options_and_implementation_plan_2026-08-12.md` — the design/options/plan (A/B/C).
- `flashlfq_quant_status_and_decisions.md` — overall quant status + settled/open decisions (start here).
- `flashlfq_output_file__QuantifiedProteins.md` / `__QuantifiedPeptides.md` — the FlashLFQ output files.
- `flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md` — the no-cross-file rule.
- `front_end_data_loading__common_data_loaded_from_server_per_search.md` — the loader tree (holders reused here).
- `front_end/CLAUDE.md` — "Adding a column to a `DataTable`" + "Sorting null / no-data cells" (the §1c lessons).
- Local-only pickup detail (test URLs, run hashes, creds, CDP harness): the gitignored session handoff
  `.claude/session_handoffs/flashlfq_quant_protein_page_SESSION_2026-08-13.md`.
</content>
</invoke>
