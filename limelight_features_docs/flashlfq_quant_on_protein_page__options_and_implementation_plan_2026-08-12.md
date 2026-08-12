# FlashLFQ quant on the Protein page — options and implementation plan

**Date: 2026-08-12.** **Status: design + implementation plan (no code written yet). A / B / C is an OPEN choice.**
**Page in scope:** the projectSearchId-based **Protein page**, URL `d/pg/psb/protein` (Java
`ProteinView_Controller`, path constant `AA_PageControllerPaths_Constants.PROTEIN_VIEW_PAGE_CONTROLLER =
"d/pg/psb/protein/"`). The **experiment-driven** protein page (`d/pg/exp/protein/`,
`Experiment__ProteinView_Controller`) is **OUT OF SCOPE**.

**Provenance rule:** every load-bearing claim below was read directly from source in this session and is cited
`file:line`. FlashLFQ/mzLib-internal facts are cited to the mzLib `1.0.566` clone at
`/spinning-disk-02/code_downloads_for_research/from Github/mzLib`. Anything not verified is marked
**(unverified)**. Nothing here was runtime-observed — it is a static read of the code as it stands (most quant
*feature* code is held/uncommitted; see the status doc).

---

## 0. The decision to make

There are **three ways** to put a per-protein FlashLFQ quant number on the protein page. **This is an open
choice — none is a foregone conclusion.**

- **Option A — ingest FlashLFQ's own protein file (`QuantifiedProteins.tsv`).** Take FlashLFQ's per-protein
  intensity (a weighted median polish over each protein's **unique** peptides) and map it to Limelight protein
  rows by the exact `psvid_<id>` round-trip. Cleaner join, principled number, but needs a small **service +
  webservice** addition, **drops shared peptides**, and its number **won't reconcile** with the per-peptide
  Quant column already shown in the single-protein view.
- **Option B — roll up the peptide-level quant Limelight already ingests, per protein.** Sum (dedupe by
  groupId) each protein's per-reportedPeptide intensities, reusing the existing machinery. **No new
  webservice**, **reconciles** with the per-peptide column, **attributes shared peptides** to each protein
  (consistent with NSAF / PSM / peptide columns), but the number is a **naive sum** that inherits the two
  still-open peptide-aggregation decisions (apex-vs-area, SUM-vs-MAX).
- **Option C — do BOTH, shown side by side (two adjacent columns).** Add one column for A ("Quant (FlashLFQ)")
  and one for B ("Quant (Limelight)"), per protein, so users can **see what each method produces on the same
  data.** C is the union of A's and B's work (it is not a third algorithm), and it is the **most useful first
  step to actually decide A vs B** — the places where the two diverge (shared-only proteins blank under A but
  not B; median polish vs sum) are exactly what a reviewer wants to look at. Ship C as an evaluation/prototype
  mode, then collapse to A or B (or keep both) once the team has looked at real numbers. See §5.6.

**The question C is built to answer (put to the group):** *Do we want FlashLFQ's own protein-quant number
(unique-peptide median polish), or a Limelight rollup that reconciles with the per-peptide quant we already
show and treats shared peptides the way our other per-protein columns do — or keep both?* See the head-to-head
in §6 and the side-by-side rationale in §5.6.

**Two things are already settled and apply to BOTH options:**
1. **Quant is PER PROTEIN, not rolled up to the protein group** — shown on every protein row (incl. each member
   of a group), **exactly like NSAF**; PSM counts roll up, NSAF and quant do not. A **message block above the
   protein table** says so (§8). (Whether a group should ever get one quant value is a separate open question
   for the group; this plan defines no group rollup.)
2. **The `psvid_<id>` ↔ `protein_sequence_version.id` match is exact** (§4) — it is what makes Option A
   possible and is unrelated to which option is chosen.

---

## 1. How FlashLFQ quant works in Limelight today (peptide-level) — the machinery both options build on

All existing (held/uncommitted) quant code is **per reported peptide**, per **(search, scan file)** run. There
is **no protein-level aggregation anywhere today** (confirmed by reading the retrieval controller and the whole
quant front-end module).

### 1.1 Send side — what Limelight puts INTO FlashLFQ

Controller: `limelight_webapp/.../rest_controllers/multiple_project_search_id/FlashLFQ_Run__Request_Creation_RestWebserviceController.java`.
Per identification (PSM) it sends (nested `Request_To_FlashLFQ_Service_Per_Psm`, `:1465-1522`): `scan_number`
(`:937`), `charge` (`:938`), `peptide_sequence` (base seq, `:939`), `reported_peptide_id` (`:940`),
`protein_accessions` (**`List<String>` of `psvid_<id>_<name>` tokens**, `:941`), `full_sequence` (grouping
identity, `:1142`), `monoisotopic_mass` (canonical `PeptideMassCalculator`, `:1141`).

**The protein token — the linchpin for Option A's match.** `get_ProteinAccessions_Map_Key_ReportedPeptideId`
(`:821-893`):
```java
String proteinAccession = "psvid_" + proteinSeqVerId;                       // :873  proteinSeqVerId = protein_sequence_version.id
String sanitizedName = proteinName.replaceAll("[;\\t\\r\\n]", " ").trim();   // :879  strip ';' TAB CR LF
if ( ! sanitizedName.isEmpty() ) proteinAccession = proteinAccession + "_" + sanitizedName;   // :881
```
Protein set per reported peptide comes from the **cutoff-aware** searcher
`ProteinVersionIdsFor_SearchID_ReportedPeptideIdList_Searcher` (`:828-830`); the whole list is stamped on every
PSM (`:941`). FlashLFQ treats the token as an opaque key (`:119-123`, `:813-819`).

**Sample identity:** per-file wrapper carries `scan_file_id` (`scan_file_tbl.id`), `spectr_file_id`,
`file_name` (`:1432-1463`); server fans out **one run per scan file** (`:634-644`).

**Grouping identity ("Full Sequence"):** `FlashLFQ_GroupingIdentity_Common.buildFlashLFQ_GroupingIdentity(...)`
= `baseSequence + "[" + <signed full-precision summed variable-mod mass> + "]"` (`:67-83`), e.g.
`PEPTIDE[+79.96633]`. Non-positional, static mods excluded, no reportedPeptideId. Same helper used on return.

**Reject tripwires (unsupported searches):** dynamic mods → throw `:362-365`; open mods → throw `:1004-1013`;
no scan data → throw `:349-352`. Don't delete these.

### 1.2 Retrieve side (today = peptides only)

Live controller: `.../single_project_search_id/FlashLFQ_Run__Result_Retrieval_Joined_RestWebserviceController.java`
(`@PostMapping`, resolves under `/d/rws/for-page/flashlfq-run--result-retrieval-joined`).
- Fetches **`QuantifiedPeptides.tsv`**: `"?request_id=" + requestId + "&file=peptides"` (`:464`;
  `RESULT_FILE_TOKEN_PEPTIDES = "peptides"` `:115`).
- Parses **only** `Sequence` + one `Intensity_<file>` + one `Detection Type_<file>` (`:122-124`, `:367-378`);
  a per-(search,scan file) run must have exactly one of each (`:381-387`). **The `Protein Groups` column IS
  IGNORED today** (relevant: Option A would start reading a protein file instead/as well).
- Rebuilds `groupingIdentity → [reportedPeptideId…]` (`:260-341`), fans each row out to one record per
  reportedPeptideId (`:408-435`).
- Returns `{ "records":[ { reportedPeptideId, intensity, groupId, ambiguousZeroed, detectionType } ] }`
  (`:543-574`).
- Auth: `validatePublicAccessCodeReadAllowed( List.of(projectSearchId), req )` (`:203-204`); `requestId`
  `^[0-9a-f]{32}$`; secondary ids scoped to projectSearchId.

### 1.3 Front-end holder + per-cell rendering

`front_end/.../data_pages/quant/quant_PrototypeData.ts` — status-first load
(`d/rws/for-page/psb/flashlfq-run--result-status`) then joined result; runs from the **URL hash**
`#<projectSearchId>_<searchScanFileId>_<requestId>-…` (`_parseHash_ToPairs` `:286`). Store keyed
**`Map<searchScanFileId, Map<reportedPeptideId, RowQuant>>`** (`:128-130`), `RowQuant { intensity, groupId,
ambiguousZeroed, detectionType }` (`:78-83`).
**Reuse hook (Option B): `get_SummedQuantForDisplayForm(reportedPeptideIds, projectSearchId, restrictToSearchScanFileId)`
(`:195-237`)** — resolves the single scan file (`_resolveScanFileId` `:253-264`), dedupes records by `groupId`
(`:207-212`), sums intensity over distinct non-ambiguous groups (`:216-226`); any ambiguous group → 0 +
`anyAmbiguous`. Returns `Quant_PrototypeData_RowQuant_Summed { summedIntensity, anyAmbiguous, distinctGroupCount,
singleGroupId, contributingGroupIds }`.
Cell builder (peptide list — drives the peptide page **and** the single-protein overlay):
`protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Create_TableData.tsx`
`_build_Quant_DataRow_ColumnEntry` (`:516-640`); markers `⚭` / `"overlapping signal"` / `"quant error"`
(`:95-108`); value `toExponential(2)`.

**Governing rule (both options):** *PSM count may sum across scan files/sub-groups/searches; **quant may NOT.***
A per-protein number is valid **only within one scan file** — per sub-group in a multi-file search, never
summed across scan files.

---

## 2. The Protein page data model (where a per-protein number attaches)

Front-end root: `front_end/.../data_pages/project_search_ids_driven_pages/protein_page/`.

### 2.1 Protein LIST table — rows keyed by `proteinSequenceVersionId`, and per-protein-vs-group behavior

- Row class **`ProteinDataDisplay_ProteinList_Item`**
  (`protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes.ts:73`),
  **row id = `proteinSequenceVersionId:number` (`:75`)** — the SAME id sent into FlashLFQ as `psvid_<id>`.
  Sub-records carry `numPsms`, `uniquePeptideCount`, `nsaf`, `adjusted_Spectral_Count_ABACUS`,
  `reportedPeptideIds_NoPsmFilters`, etc.
- **Grouped rows:** `ProteinDataDisplay_ProteinList_GroupedProtein_Item` (`:58`) holding
  `proteinList_Grouped: Array<ProteinDataDisplay_ProteinList_Item>` + a `ProteinGroup` + `isSubsetGroup`.
- **Per-protein-vs-group rendering (settled model — applies to both options).** Both the grouped path
  (`_renderToPageProteinList_Create_dataGroupObjects_YES_ProteinGroups`, `:1163`) and the non-grouped path
  (`:1237`) build each protein's row through the **same** `_createProteinItem_DataTableEntry` (`:1328`,
  param `proteinListItem: ProteinDataDisplay_ProteinList_Item`, and `projectSearchId` in scope), so **every
  member protein of a group is a full per-protein row.** The group header borrows the **first member's** column
  entries (`:1216`).
- **THE exact mechanism for per-protein-vs-group display is the `DataTable_Column` flag
  `onlyShow_ValueDisplay_FirstRowOfGroup`.** `psms` sets it **`true`** (`:365`) → the value shows only on a
  group's first row (group-level presentation). `nsaf` sets it **`false`** (`:386`) → the value shows on
  **every** member protein row (per-protein). **Quant must set `onlyShow_ValueDisplay_FirstRowOfGroup: false`**
  — that single flag is what makes it behave like NSAF (per protein), not like PSM count (per group). (Per
  sub-group columns follow the same split: NSAF-like sub-group columns use `false` at `:555/:796`; PSM-count
  sub-group columns use `true` at `:522/:852`.)
- Table rendered in `.../jsx/proteinViewPage_DisplayData_ProteinList__Main_Component.tsx` — table object
  `:2228-2240`, `<DataTable_TableRoot>` `:3613`, "start display of data above Protein List" block **`:3431`**
  (the §8 message-block site).

### 2.2 Single-protein view (already shows per-peptide quant)
Selected `proteinSequenceVersionId` is URL-serialized page state
(`protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass.ts`,
`getProteinSequenceVersionId()` `:171`); its reported-peptide list already has the per-peptide Quant column
(§1.3). **This is the column Option B reconciles with and Option A does not.**

### 2.3 Protein → reportedPeptideIds mapping (Option B's rollup input)
Holder
`CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder`,
method **`get_reportedPeptideIds_For_ProteinSequenceVersionId(proteinSequenceVersionId)`** (post-main-filters).
Used at `.../reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds.ts:701-702`
and `..._Create_TableData.tsx:1333-1356`. Loaded through the shared `CommonData_LoadedFromServer` tree — reuse
the existing instance, do not re-instantiate (front_end/CLAUDE.md). **Option A does not need this map** (it
maps protein→intensity directly by psvid).

---

## 3. The exact match that makes Option A possible

Source: `flashlfq_output_file__QuantifiedProteins.md` (verified vs mzLib `1.0.566`) + the reads below.

- **What the file is.** One row per FlashLFQ protein group; columns `Protein Groups` · `Gene Name` · `Organism`
  · one `Intensity_<sample>` per sample (`ProteinGroup.cs:48-74`). Per-sample intensity = **weighted median
  polish** over that protein's **unambiguous, single-protein-group** peptides (`FlashLfqEngine.cs:307` →
  `FLASHLFQResults.cs:371-582`); `--sha` (use shared peptides) defaults **false** (`FlashLfqSettings.cs:85`), so
  **peptides mapping to >1 protein group are excluded** (`:388`). Not a top-3 sum, not a plain sum (verified 7/7
  on run `36b59`).
- **The match is exact.** The service builds each identification's `Protein Accession` field as
  **`";".join(psm.protein_accessions)`** (`limelight-flashlfq-service/app/request_processor.py:111`). In
  FlashLFQ/mzLib **`;` separates protein groups**, `|` separates proteins *within* a group
  (`ChromatographicPeak.cs:178-201`). **Limelight only ever emits `;`** (the name sanitizer even strips stray
  `;`), so **each `psvid_<id>_<name>` token becomes its own FlashLFQ group** → each `QuantifiedProteins.tsv`
  row's `Protein Groups` value is a **single `psvid_<id>_<name>` token** → parse the int after `psvid_` →
  **exact `protein_sequence_version.id` match**. (Strong inference: service `;`-join verified + mzLib `;`
  semantics verified + Limelight-never-emits-`|` verified. **Definitive check before building A: read a real
  `QuantifiedProteins.tsv` from a Limelight run, or the FlashLFQ CMD ids-reader split — not in the mzLib clone.
  (partly unverified.)**)
- **Consequence — shared peptides drop out.** A peptide shared across N Limelight proteins → N groups →
  excluded from all their protein quant. **A protein with only-shared evidence gets no row → blank.** This is
  the crux of the A-vs-B difference (§7).

---

## 4. Option A in detail — ingest FlashLFQ's protein file

**What it gives:** FlashLFQ's own principled per-protein number (median polish, unique peptides), exactly
matched to Limelight protein rows, with **no reportedPeptideId round-trip** (direct `psvid → intensity`) and
**no dependence on the two open peptide-aggregation decisions**.

**Characteristics / costs:**
- **Unique-peptide-only** inclusion (shared peptides dropped) → **blank for shared-only proteins**, and a
  **different inclusion rule than the NSAF/PSM/peptide columns beside it** (which attribute shared evidence to
  each protein).
- **Does not reconcile** with the per-peptide Quant column in the single-protein view (median polish ≠ sum of
  the peptide MAX values shown there).
- **No ambiguous/`⚭` concept** at protein scope (the file carries a plain intensity; ambiguity was already
  resolved by excluding shared peptides) — simpler display, but that simplicity *is* the shared-peptide drop.

**Work required:**
1. **Service (`limelight-flashlfq-service`):** add `"proteins": "QuantifiedProteins.tsv"` to
   `_RESULT_FILES_ALLOWLIST` (`app/web_listener.py:35-38`) and redeploy. (The file is already produced every
   run; only the retrieval allowlist blocks it today.)
2. **Webapp retrieval controller (new):** analogous to the joined peptide controller but fetching `file=proteins`
   and parsing `Protein Groups` + the single `Intensity_<file>` column; split each `Protein Groups` value on
   the first `_` after `psvid_` to an int `proteinSequenceVersionId`; return
   `{ records:[ { proteinSequenceVersionId, intensity } ] }`. Auth/scoping identical to the peptide controller
   (`validatePublicAccessCodeReadAllowed`, `requestId` `^[0-9a-f]{32}$`). One `Intensity_<file>` column per run
   (per-(search,scan file) run = one sample) — reject any other shape, same as the peptide controller.
3. **Front-end holder (new, small):** parallel to `quant_PrototypeData` but keyed
   **`Map<searchScanFileId, Map<proteinSequenceVersionId, intensity>>`**; same status-first + URL-hash run
   selection; expose `get_ProteinIntensity(proteinSequenceVersionId, projectSearchId, restrictToSearchScanFileId)`
   with the same `_resolveScanFileId` scan-file rule (§1.3).
4. **Protein list cell + column + message block:** §5.3 / §8 (shared with B).

---

## 5. Option B in detail — roll up Limelight's peptide-level quant per protein

**What it gives:** a Limelight-computed per-protein number that **reconciles** with the per-peptide Quant
column, **attributes shared peptides** to each protein (consistent with NSAF/PSM/peptide), and needs **no
service or webservice change** (reuses already-loaded data).

**Characteristics / costs:**
- The number is a **sum of per-peptidoform values** (dedupe by groupId), which **inherits the two open
  peptide-level decisions** — apex-vs-area and SUM-vs-MAX (`flashlfq_quant_status_and_decisions.md` Open #2/#2b).
  A sum of apex heights is the least-additive corner of the space → **label it relative / prototype**, do not
  present as calibrated abundance until those are settled.
- Must carry the peptide cell's **ambiguous / `⚭`** semantics up to protein scope (§5.4).

**Work required:**
1. **`quant_PrototypeData.ts`:** add `get_SummedQuantForProtein(reportedPeptideIds_ForProtein, projectSearchId,
   restrictToSearchScanFileId)` — same body as `get_SummedQuantForDisplayForm` (`:195-237`); the only difference
   is the caller passes the **union of the protein's** reportedPeptideIds (a distinct name documents intent and
   lets protein-scope wording diverge later).
2. **Protein list cell:** compute per protein via
   `get_reportedPeptideIds_For_ProteinSequenceVersionId(proteinSequenceVersionId)` (§2.3) → step 1. Thread the
   already-loaded `quant_PrototypeData` + the protein→rpid holder down as props (do not re-instantiate loaders).
3. **Column + message block:** §5.3 / §8 (shared with A).

### 5.3 Where the cell attaches (SHARED by A and B)
Add the Quant column header (sibling of `nsaf`/PSM) in
`proteinViewPage_DisplayData_ProteinList__Create_ProteinList_DataTable_RootTableDataObject.tsx`, and build the
per-protein cell **inside `_createProteinItem_DataTableEntry` next to the NSAF cell (~`:1632-1683`)**, keyed on
`proteinListItem.proteinSequenceVersionId` for the projectSearchId. Because both grouped and non-grouped paths
funnel through this one builder (§2.1), quant then renders **per protein on every row, grouped or not, exactly
like NSAF** — no group special-casing. Gate on `quant_PrototypeData__ShouldShow_QuantColumn()` (or the Option-A
holder's equivalent). Format `toExponential(2)`, PROTOTYPE-badged tooltip, "not additive down the column"
caveat.

### 5.4 Scan-file scoping (SHARED by A and B)
- **Single-scan-file search:** one Quant column, the search's single run.
- **Multi-scan-file search with sub-groups (mode 3):** one Quant column **per sub-group**, each restricted to
  that sub-group's single scan file (`quant_Build_SubGroupId_To_SearchScanFileId_Map`, 1:1 invariant enforced
  server-side). Never one number summed across the search's scan files.
- Option A reads the corresponding run's `QuantifiedProteins.tsv`; Option B resolves via `_resolveScanFileId`.

### 5.5 Concrete wiring every implementer needs (all options) — gaps not obvious from the design above

These are the non-obvious things a fresh implementer must do; without them the plan is not turnkey.

**(a) The protein LIST page loads NO quant today — you must add the trigger.** (Verified: zero `quant` /
`flashlfq` references under `protein_page_root` / `protein_page__protein_list` / `protein_page_common`.) Today
only the single-protein overlay section and the peptide page load quant. Add, in
`proteinViewPage_DisplayData_ProteinList__Main_Component.tsx`:
- In `componentDidMount`, call **`quant_PrototypeData_Load( searchDataLookupParamsRoot )`** and
  **`quant_PrototypeData_RegisterOnLoaded( callback )`**, mirroring the single-protein section component
  (`proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component.tsx:151-165`). On load,
  force a re-render (house pattern `this.setState({ force_Rerender: {} })`) so the table rebuilds. *(For
  Option A, load the new protein holder (§4 A3) here instead of/in addition to `quant_PrototypeData`.)*
- `searchDataLookupParamsRoot` is already built in this component (`:442`); `projectSearchIds` is a prop
  (`:196`, read at `:408`) — **read it from the prop, not `DataPageStateManager`** (two-instance trap). The
  sub-group state object is a prop too (`searchSubGroup_CentralStateManagerObjectClass`, `:205`).
- Pass `quant_PrototypeData` (only when `quant_PrototypeData__ShouldShow_QuantColumn()`) into the table-data
  builder (`proteinViewPage_renderToPageProteinList__Create_DataTable_RootTableDataObject`) as a new param,
  threaded down to `_getProteinDataTableColumns` (`:177`, header) and `_createProteinItem_DataTableEntry`
  (`:1328`, cell).

**(b) Quant only appears when the URL hash names a run — no run-launch UI is in scope here.** The prototype
selects runs from the hash `#<projectSearchId>_<searchScanFileId>_<requestId>-…` (`quant_PrototypeData.ts:286`);
`quant_PrototypeData__ShouldShow_QuantColumn()` returns false with no hash / no loaded records. The protein
page **inherits the same hash mechanism** as the peptide page — you are adding a *display* column, not a way to
start runs. (The owner "View/Add Quant" button that creates runs lives elsewhere and is unchanged.)

**(c) Concrete DataTable column + cell skeleton (mirror NSAF exactly).** Header — mirror `:378-392`:
```
const column = new DataTable_Column({
    id: 'quant_' + projectSearchId,          // per sub-group: 'quant_subgroup_' + searchSubGroupId
    displayName: 'Quant',                    // or 'Quant (' + searchLabel + ')'
    width: 90, sortable: true,
    columnHeader_Tooltip_HTML_TitleAttribute: <PROTOTYPE-badged tooltip>,
    onlyShow_ValueDisplay_FirstRowOfGroup: false   // <-- per protein, like NSAF (NOT true)
});
```
Cell — mirror `:1672-1684`, inside `_createProteinItem_DataTableEntry` next to the NSAF cell:
```
const summed = <Option B: get_SummedQuantForProtein(rpids, projectSearchId, restrictScanFileId)
                Option A: get_ProteinIntensity(proteinListItem.proteinSequenceVersionId, projectSearchId, restrictScanFileId)>;
const valueDisplay = <intensity>.toExponential(2);   // blank when undefined
const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn: [ valueDisplay ] });
columnEntries.push( new DataTable_DataRow_ColumnEntry({ searchTableData, valueDisplay, valueSort: <intensity or -1 for blank>, tooltipDisplay_FunctionCallback... }) );
dataColumns_tableDownload.push( new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay }) );
```
`proteinListItem.proteinSequenceVersionId` and `projectSearchId` are in scope here. For Option B, get the
protein's reportedPeptideIds from `get_reportedPeptideIds_For_ProteinSequenceVersionId(proteinSequenceVersionId)`
on the per-search holder (§2.3), which must be threaded in as a prop (per-projectSearchId map) exactly as the
single-protein builder receives it (`..._Create_TableData.tsx:1333-1334`).

**(d) v1 scope — ship the per-search column first; mode-3 (per-sub-group) is a follow-on.** The per-sub-group
protein columns (§5.4) need the `subGroup→searchScanFileId` map, which is built from two already-loaded
per-PSM holders (FILTERED main-filters PSM data + the sub-group holder) — the single-protein builder loads
them, but they are **not confirmed loaded on the protein LIST page**. Recommended: implement the **per-search**
protein Quant column first (single-scan-file searches → the common case), and add mode-3 per-sub-group protein
columns as a second step once those two holders are wired into the list page (same source as
`quant_Build_SubGroupId_To_SearchScanFileId_Map`). Do not silently skip mode-3 — state it as staged.

### 5.6 Option C — do both, side by side (two columns) for comparison

**What it is:** ship **both** numbers per protein, in two adjacent columns — **"Quant (FlashLFQ)"** (Option A)
and **"Quant (Limelight)"** (Option B) — so a reviewer sees, on the same protein rows, exactly how the
FlashLFQ median-polish number and the Limelight rollup differ. It is **purely additive**: C = all of A's tasks
+ all of B's tasks + one extra column, with **no new algorithm**. Both columns obey the same per-protein
(not-per-group) rule (`onlyShow_ValueDisplay_FirstRowOfGroup: false`) and the same scan-file scoping (§5.4) as
A/B individually.

**Why it's worth building first:** the A-vs-B decision (§0, §6) is really "which number do we trust / want to
show," and that is far easier to answer by **looking at the two on real data** than in the abstract. C makes
the divergences visible where they matter:
- **shared-only proteins** — a value under B, **blank under A** (A drops shared peptides);
- **magnitude gap** — median polish (A) vs summed per-peptidoform values (B), per protein;
- **reconciliation** — B's column should equal the sum of the per-peptide Quant column in the single-protein
  view; A's will not. Seeing both side by side surfaces that immediately.

**Display specifics:**
- Two columns, both `onlyShow_ValueDisplay_FirstRowOfGroup: false`, placed together (e.g. right after NSAF).
  Label them by **method**, not by search, so nobody mistakes them for two searches. PROTOTYPE-badge both; the
  header tooltip should state "A = FlashLFQ's protein file (median polish, unique peptides); B = Limelight
  rollup of the per-peptide quant (includes shared)."
- Optional review aid: a **tooltip-only, non-persisted** derived hint (e.g. A÷B, or a flag when they diverge
  more than Nx). Do **not** compute or store a "reconciled" number — C's point is to show the two *as-is*.
- The **message block** (§7) still applies unchanged; it may add one line: "Two quant columns are shown for
  method comparison (prototype)."

**Exit:** once the team has looked, collapse to A or B (delete the other column) — or keep both if both are
wanted long-term. Nothing about C forecloses either endpoint.

---

## 6. A vs B (and C) — head to head

| | **A: FlashLFQ protein file** | **B: roll up Limelight peptide quant** |
|---|---|---|
| The number | FlashLFQ **weighted median polish** (principled; sidesteps open peptide decisions) | **Sum** (dedupe by groupId); inherits apex-vs-area + SUM-vs-MAX |
| Shared peptides | **Dropped** → blank for shared-only proteins | **Attributed to each protein** — consistent with NSAF/PSM/peptide columns |
| Reconciles with the per-peptide Quant column (single-protein view) | **No** | **Yes** |
| Join | Direct `psvid_<id> → intensity` (simplest) | protein → reportedPeptideIds → per-peptide records |
| New code | Service allowlist add + redeploy; **new webapp retrieval controller**; small new FE holder | **None new** — reuse loaded data + one FE method |
| Ambiguity/`⚭` display | N/A (already resolved by dropping shared) | must carry peptide-cell ambiguous / `⚭` semantics |
| Per-protein-in-a-group, message block (§8), scan-file scoping (§5.4) | same | same |

**Deciding question (for the group):** FlashLFQ's own protein number (A), or a Limelight rollup consistent with
the peptide quant we already show and with our other per-protein columns (B)? Your NSAF point (*"no reason quant
must equal FlashLFQ's"*) does not settle it — it equally means quant need not equal a Limelight sum; it just
frees you to pick either on its merits.

**Option C is the tie-breaker, not a third answer:** it shows A and B as two columns on the same rows so the
decision can be made by inspection of real numbers, then collapsed to A or B (or kept). If unsure, **build C
first.** Its cost is A + B (there is no separate C algorithm).

---

## 7. Per-protein, not per-group — with a message block above the protein table (SHARED by A and B)

**Model (user, 2026-08-12):** protein grouping does not force every column to a single group value — **only the
columns that can roll up do.** PSM counts roll up. **NSAF differs between proteins in a group, so it's shown per
member protein.** **Quant follows NSAF: per protein, on each member row, never rolled to one group value.**
Mechanically free — the quant cell lives in the shared per-protein row builder next to NSAF (§2.1, §5.3).

1. **Quant renders per protein on every row** (grouped or not); no group rollup, no blank grouped rows, no
   summing a group's members. (The group *header* shows the first member's quant, identical to how it shows the
   first member's NSAF via the borrowed `columnEntries` at `:1216`.)
2. **Message block ABOVE the protein table** — required wording (tune with the user, this is the intent):
   > **"Quant is not rolled up to the protein group."** *(Shown per protein — like NSAF — because a protein
   > group has no single quant value. Prototype feature.)*
   - Placement: `proteinViewPage_DisplayData_ProteinList__Main_Component.tsx` render(), in the "start display of
     data above Protein List" block (**`:3431`**), above `<DataTable_TableRoot>` (`:3613`). Gate on the same
     show-quant condition as the column (prefer always-present when quant is shown, so the per-protein semantics
     are stated up front). Reuse the PROTOTYPE-badged notice styling of the peptide-page quant banners
     (`proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component.tsx:617-750`).
3. **Build no protein-group rollup semantics** — whether a group should ever have one quant value is the
   separate open question for the group (§9 #1). This message block is where any future group decision lands.

---

## 8. Implementation task list

**Shared (either option):**
- S0. **Add the quant load to the protein LIST page** — it loads none today (§5.5a): `quant_PrototypeData_Load`
  + `..._RegisterOnLoaded` + force-rerender in `Main_Component.componentDidMount`, and thread the holder into
  the table-data builder as a param.
- S1. Quant column header (sibling of `nsaf`/PSM, **`onlyShow_ValueDisplay_FirstRowOfGroup: false`**) + per-
  protein cell in `_createProteinItem_DataTableEntry` (~`:1632`), mirroring the NSAF skeleton in §5.5c. Format
  `toExponential(2)`, PROTOTYPE-badged, "not additive down the column".
- S2. **(Staged, follow-on)** Per-sub-group columns (mode 3) with per-scan-file restriction (§5.4/§5.5d);
  single-file search → one per-search column first.
- S3. Message block above the protein table at `Main_Component.tsx:3431` (§7).
- S4. Gate visibility on runs-loaded (`quant_PrototypeData__ShouldShow_QuantColumn()` or Option-A equivalent);
  quant only shows when the URL hash names run(s) (§5.5b); thread loaded holders down as props (no
  `getNewInstance` re-fetch); read `projectSearchIds` from the prop.
- S5. Type-check (tsgo), build front end (`ant -f ant_buildFrontEnd_CopyToTomcat.xml` in `front_end/`),
  runtime-verify with the CDP harness (owner admin/admin, and set the run hash): per-protein value on a clean
  row; grouped rows show per-protein values (not blank, not a group sum); message block present.

**Option A only:**
- A1. Service (`limelight-flashlfq-service`): add `"proteins": "QuantifiedProteins.tsv"` to
  `_RESULT_FILES_ALLOWLIST` (`app/web_listener.py:35-38`); **redeploy the service.**
- A2. New webapp retrieval controller — **copy the joined peptide controller** (`FlashLFQ_Run__Result_Retrieval_Joined_RestWebserviceController.java`)
  as the template: `@PostMapping`, add a path constant to `AA_RestWSControllerPaths_Constants`, `byte[]` JSON
  marshalling, same auth (`validatePublicAccessCodeReadAllowed`) + `requestId ^[0-9a-f]{32}$` scoping; fetch
  `...WEBSERVICE_PATH_RESULT + "?request_id=" + requestId + "&file=proteins"`; parse `Protein Groups` + the one
  `Intensity_<file>` column (reject any other shape); split each `Protein Groups` value to an int
  `proteinSequenceVersionId` (strip leading `psvid_`, take up to the next `_`); return
  `{ records:[ { proteinSequenceVersionId, intensity } ] }`. **Rebuild + deploy the WAR
  (`ant -f ant_build_War_CopyToTomcat.xml`).**
- A3. New FE holder (mirror `quant_PrototypeData`'s status-first + URL-hash fetch) keyed
  `Map<searchScanFileId, Map<proteinSequenceVersionId, intensity>>`; expose
  `get_ProteinIntensity(proteinSequenceVersionId, projectSearchId, restrictToSearchScanFileId)` with the same
  `_resolveScanFileId` scoping. S1 cell reads this.
- A4. **Before relying on the split**, verify a real Limelight-run `QuantifiedProteins.tsv` shows one row per
  single `psvid` (§3 definitive check).

**Option B only:**
- B1. `quant_PrototypeData.ts`: add `get_SummedQuantForProtein(...)` (§5.2) — same body as
  `get_SummedQuantForDisplayForm` (`:195-237`).
- B2. S1 cell computes from `get_reportedPeptideIds_For_ProteinSequenceVersionId(...)` (§2.3) → B1; thread the
  per-projectSearchId protein→rpid holder in as a prop (as `..._Create_TableData.tsx:1333-1334` does); carry
  ambiguous / `⚭` semantics to protein scope (§5.4/decision §9 #3).

**Option C (side by side) = A + B, plus:**
- C1. Do all of **A1–A4** and **B1–B2** (both holders loaded in S0; both cells built in S1).
- C2. Emit **two** columns instead of one — "Quant (FlashLFQ)" (reads A3's holder) and "Quant (Limelight)"
  (reads B1) — both `onlyShow_ValueDisplay_FirstRowOfGroup: false`, labeled by method, PROTOTYPE-badged
  (§5.6). Optional tooltip-only divergence hint; store nothing derived.
- C3. Message block (§7) may add the one-line "two columns for method comparison" note.

**House rules (both):** required params (explicit `undefined`); reuse loaded instances; read `projectSearchIds`
from a real prop, not `DataPageStateManager` (two-instance trap); synchronous fast-path; instance-field caches
over memoization; no negative margins; shared color/tooltip/notice components.

---

## 9. Open decisions
1. **A vs B vs C** — the headline choice (§0/§6). Put to the group. If undecided, **build C** (both columns
   side by side) to decide from real numbers, then collapse to A or B (or keep both).
2. **Protein-group single value** — should a group ever have ONE rolled-up quant at all? (user → others.)
   Until answered: none; quant stays per protein + message block (§7). Not blocking the per-protein work.
3. **If B:** aggregation rule (SUM of distinct-groupId peptide values) + apex-vs-area / SUM-vs-MAX at the
   peptide level; and ambiguous/`⚭` handling at protein scope (recommend "overlapping signal" if any
   contributing form is ambiguous; likely omit `⚭`).
4. **If A:** accept unique-peptide-only inclusion (shared-only proteins blank) and non-reconciliation with the
   per-peptide column, as the intended semantics? Add a tooltip/footnote explaining it.
5. **Column vs single-protein-view figure vs both** — recommend the list column first; a "Protein total" figure
   in the single-protein view is a small add-on (uses B's method, or A's holder).

---

## 10. Provenance
- Limelight send/retrieve/protein-page/quant-display facts: read directly from the cited `.java`/`.ts`/`.tsx`
  this session (`file:line` inline).
- Service `;`-join and retrieval allowlist:
  `limelight-flashlfq-service/GIT_CLONE/limelight-flashlfq-service/app/{request_processor.py:111, web_listener.py:35-38}`.
- FlashLFQ/mzLib grouping (`;` between groups, `|` within) + median-polish protein quant: mzLib `1.0.566`
  `.../ChromatographicPeak.cs:178-201`, and `flashlfq_output_file__QuantifiedProteins.md` (verified vs mzLib +
  numerically on run `36b59`).
- **Unverified:** the FlashLFQ CMD identification-reader split of `Protein Accession` (not in the mzLib clone) —
  the "one `QuantifiedProteins` row per single `psvid`" conclusion is a strong inference (A4 confirms it).
- Nothing runtime-observed; static read of code (most quant feature code held/uncommitted).

## 11. Related docs
- `flashlfq_quant_status_and_decisions.md` — status + settled/open decisions (start here).
- `flashlfq_output_file__QuantifiedProteins.md` / `__QuantifiedPeptides.md` — the FlashLFQ output files.
- `flashlfq_output_to_limelight_mapping.md` — the identity round-trip (peptide-axis section predates the
  QuantifiedPeptides switch; the protein-axis `psvid_<id>` round-trip is current and re-verified here §3).
- `flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md` — the no-cross-file rule.
- `front_end_data_loading__common_data_loaded_from_server_per_search.md` — the loader tree (§2.3 holder).
</content>
</invoke>
