# How FlashLFQ quant results are matched to Limelight data for the datatable

**Determined: 2026-07-29 08:56 PDT.**

Source of this write-up: read directly from the (at the time) **uncommitted working-tree code** in
`limelight-core` — the new `front_end/.../data_pages/quant/` and `.../flashlfq_run/` directories, the
modified single-protein / peptide page files, and the new Java run-creation controller. Everything here
describes the code as it stood on that date.

## 0. Status / provenance

This is an explicitly **throwaway prototype**. Every relevant file/block is labeled `THROWAWAY
PROTOTYPE` and reads the FlashLFQ `QuantifiedPeaks.tsv` **directly from a served file, not from the
database**. The "real DB-backed ingest" has not landed. Open-mod handling *is* present in the code
(tagging + descriptor matching), but **open-mod mass support is the deferred piece** — treat the
open-mod paths below as "written but not the settled behavior."

The whole design hinges on **one join key**: the Limelight `reportedPeptideId`, round-tripped through
FlashLFQ's opaque "Full Sequence" string as an `rpid<id>_` prefix. There is **no chemistry re-matching
on the receive side** — matching is pure string/id bookkeeping.

Key files:
- Send side (build the join key): `limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp/spring_mvc_parts/data_pages/rest_controllers/multiple_project_search_id/FlashLFQ_Run__Request_Creation_RestWebserviceController.java`
- Browser join logic: `front_end/src/js/page_js/data_pages/quant/quant_PrototypeData.ts`
- Datatable column injection: `.../protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Create_TableData.tsx`
- Row identity stamping: `.../protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData.ts`
- Section wiring: `.../protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component.tsx`
- Standalone panel + `displayedPeptides`: `quant/quant_PrototypeDisplay_QuantifiedPeaks_Component.tsx`, `peptide_page/peptidePage_Display_MainContent_Component.tsx`
- Run request / hash write-back: `flashlfq_run/flashLFQ_Run_RequestCreation_InitiateAndShowResult.ts`

---

## 1. End-to-end pipeline

```
Limelight webapp (Java)                 FlashLFQ service            Browser (TS/React)
──────────────────────                  ───────────────            ──────────────────
Run-creation controller                 groups PSMs by             quant_PrototypeData:
 - selects PSMs by cutoffs      POST      "Full Sequence"           fetch TSV per run,
 - builds "Full Sequence" =    ───────►   string, integrates  ───►  parse rpid + open-mod
   rpid<id>_SEQ[mods]                     MS1 XIC area →             tokens back out,
 - collapses near-isobaric                QuantifiedPeaks.tsv        index by rpid & form,
   open-mod forms (1:1 str<->mass)        (served via symlink)      join to table rows
 - one run per projectSearchId
```

---

## 2. Send side — how the join key is manufactured (Java)

### 2.1 One run per search, PSMs selected by the in-effect cutoffs
`process_Single_Search_Entry` -> `process_Single_ReportedPeptide_And_Its_PSMs` walks each
`reportedPeptideId` passing the current PSM/peptide cutoffs and gathers its PSMs
(`psmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher`). This is why the Quant column tooltip
says the value is over the **PSMs submitted for quantification (the cutoffs in effect when the run was
started)** — the set is frozen at run-request time.

### 2.2 Building the "Full Sequence" — `build_FlashLFQ_FullSequenceString`
This is the exact string FlashLFQ uses to group peptidoforms, and the exact string the browser later
parses. Format:

```
rpid<reportedPeptideId>_  [n<nterm tokens>]  <residue><[tokens]>...  [c<cterm tokens>]  [u<unlocalized tokens>]
```

Rules:
- **`rpid<id>_` prefix** carries the Limelight identity. This is *the* join key.
- Mods are bucketed by position (`collect_FullSequence_ModTokens`): per-residue (1-based), N-term
  (`n`), C-term (`c`), unlocalized (`u`).
- **Open mods are `o`-tagged**; non-open (variable/static) are untagged. A localized open mod renders
  `[o+m]` (or `[no+m]`/`[co+m]` at a terminus), distinct from a variable/static `[+m]` at the same
  residue. The `u` bucket is always open, so it needs no `o` tag.
- Tokens are sorted within a bracket, masses formatted to a fixed 5-dp token
  (`fullSequence_MassToken`, e.g. `+79.96633`) so the string is byte-stable — FlashLFQ groups by exact
  string equality.

Non-open mods (`modifications` map) come from PSM-level dynamic mods, else reported-peptide-level
variable mods, plus static mods computed by scanning the sequence. Open mods (`openModifications` map)
are kept in a **separate map** so the open component stays taggable.

### 2.3 The critical pre-step: near-isobaric collapse — `collapse_NearIsobaric_OpenMod_MassForms`
FlashLFQ requires a strict **1:1 mapping between a Full-Sequence string and a monoisotopic mass**, and
**silently drops** a later PSM with the same string but a different mass. Open/mass-tolerant search
assigns near-continuous delta masses, so the "same" open mod arrives at slightly different masses across
PSMs. The method:
1. Computes each PSM's neutral monoisotopic mass = base peptide (via the canonical
   `PeptideMassCalculator` / `Peptide` — the blessed calculator, not hand-rolled) + summed non-open
   mods + summed open mods.
2. Groups PSMs by **modification-position layout** (union of non-open + open positions); only PSMs
   sharing a layout can collide on the Full Sequence string, so different localizations never merge.
3. Within a layout, **greedily clusters by mass within `ppmTolerance`** (the same window FlashLFQ uses
   to extract the MS1 peak), rewrites every cluster member to the representative's mods + mass ->
   identical Full Sequence string and mass.
4. Rebuilds `full_sequence` post-collapse so cluster members share one string.

If the base mass can't be computed (non-standard residue), the reported peptide's PSMs are **dropped**
— the service does no mass computation. Such peptides get no quant.

The request (per scan file, per PSM: scan number, charge, mass, full_sequence, protein accessions) is
POSTed to the FlashLFQ service, which returns a `request_id`.

---

## 3. Run selection & fetch — the URL hash (browser)

No DB record of runs exists in the prototype, so **run selection is entirely via the URL hash**
(`quant_PrototypeData.ts`):

- After a run request, `flashLFQ_Run_RequestCreation_InitiateAndShowResult._showResult` writes pairs
  into the hash: `#<projectSearchId>_<requestId>-<projectSearchId>_<requestId>...`
  (`_` separates within a pair, `-` between pairs; unambiguous — projectSearchId is digits, requestId
  is dashless hex).
- `_parseHash_ToPairs` reads them back. **No hash => no fetch => no quant UI at all** (there is no fixed
  top-level TSV).
- For each pair, `_fetchAndParse_ForPair` GETs
  `/flashlfq_test_files/<requestId>/flashlfq_output/QuantifiedPeaks.tsv` (a symlink to the service's
  finaldir, so a run appears the instant it finishes — no copy step).
- A **404** => that run is recorded in `notReadyRuns` (still processing) -> UI shows a "results not
  ready, refresh later" banner. Not fatal; other runs still load.
- **Each peak is tagged with the `projectSearchId`** its run belonged to. Multiple runs are merged into
  one `Quant_PrototypeData` (`_buildFromParts`) — peaks concatenated, tagged, totals summed.

A singleton (`_instance` / `_loadPromise` / `_onLoadedCallbacks`) guarantees **one fetch + one parse**
shared by both the standalone panel and the injected table column, so numbers are identical.

---

## 4. Receive side — parsing the TSV back into peaks (`_parseText_ToParts`)

Columns are located **by header name** (not position): required `Base Sequence`, `Full Sequence`, `Peak
intensity`; optional `Peptide Monoisotopic Mass`, `Precursor Charge` (tooltip only). Each data row = one
MS1 feature (one integrated XIC area). Per row:

- Rows with non-finite or `<= 0` intensity are skipped.
- **`Full Sequence` is `|`-split** — a shared peak carries a `|`-joined list of Full Sequence strings.
  For each entry, `_RPID_PREFIX_REGEX = /^rpid(\d+)_/` extracts the reportedPeptideId; entries without
  the prefix are ignored. => a peak maps to a **set** of reportedPeptideIds.
- For each entry a **form key** is computed: `_formKey(rpid, descriptor)` =
  `"<rpid>|<kind>|<roundedMass>"`, where the descriptor comes from `_openModDescriptor_ForFullSequence`:
  - `[u±m]` tokens => `unlocalized`, mass = round(sum).
  - else `o`-tagged tokens (`o±m`) => `localized`, mass = round(sum).
  - else => `none`, mass 0.
  Rounding to a whole number is the "open-mod display grain" — ppm-distinct features that round to the
  same form sum into one display row.
- `Base Sequence` `|`-split => `baseSequences` set (fallback keying); `isShared = baseSequences.size > 1`.
- Peak also stores intensity, monoisotopic mass, charge, projectSearchId.

`groupingBy` = `"reportedPeptideId"` if **any** peak carried an rpid, else `"baseSequence"` (fallback for
older files). The matched-to-table path runs only in `reportedPeptideId` mode.

### 4.1 Two inverted indexes (built in the `Quant_PrototypeData` constructor)
- `_peakIndicesByReportedPeptideId`: `rpid -> [peak indices]`
- `_peakIndicesByFormKey`: `"<rpid>|<kind>|<roundedMass>" -> [peak indices]`
- `hasProjectSearchId_PerPeak`: true if any peak carries a projectSearchId (drives per-search restriction).

---

## 5. The datatable side — what each row knows about itself

The table is the single-protein "Generated Reported Peptide List" table (also reused by the peptide
page). Two pieces of per-row identity are needed to join:

**(a) The row's reportedPeptideIds, per search.** In `..._Create_TableData.tsx`, for each peptide row
and each `projectSearchId`, it reads
`peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId)`
and collects that map's keys -> `reportedPeptideIds_ForQuant`. A displayed row can cover **several**
reportedPeptideIds (e.g. positional isomers collapsed into one display string).

**(b) The row's open-mod descriptor, STAMPED (not parsed).** In
`proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData.ts`, at entry creation time
`quant_openModDescriptor_prototype` is derived from the mod params already in hand
(`open_Modification_Rounded` => `localized`; `open_Modification_Rounded_NoPosition` => `unlocalized`;
else `none`), with `Math.round` to match the send-side grain.

Why stamped and not parsed from the display string? Because the display string renders a localized open
mod as `[N]` brackets, **indistinguishable from a variable mod** — parsing would be ambiguous. So the
descriptor is captured where the open-ness is known unambiguously and carried on the entry. (The peptide
page does the identical stamping when it builds `displayedPeptides`.)

---

## 6. The actual match — `get_QuantForDisplayForm` (the Quant column value)

Each cell calls:
```
quant_PrototypeData.get_QuantForDisplayForm(reportedPeptideIds_ForSearch, openModDescriptor, projectSearchId)
```

Inside:
1. **Descriptor reconciliation** (send grain vs receive grain can legitimately disagree — send "kind"
   comes from whether the PSM open mod had a position; receive "kind" comes from the page's
   localize-open-mods toggle):
   - `none` -> match **both** `none|0` **and** `unlocalized|0` (the webapp emits a near-zero `[u±tiny]`
     bucket for every peptidoform, so a plain peptide actually arrives as `unlocalized|0`).
   - real mass (`roundedMass != 0`) -> match **both** `localized|m` **and** `unlocalized|m`, so the
     value is independent of the localization toggle.
   - `localized|0` / `unlocalized|0` (a real ~0 open mod) -> left as-is, kept distinct from the plain
     bucket.
2. **Union of peaks** over `{each rpid} x {each descriptor-to-match}` via `_peakIndicesByFormKey`, into
   a `Set<peakIndex>` -> **each peak counted at most once** even if reached via several rpids/descriptors.
3. **Per-search restriction**: if a `projectSearchId` was passed *and* peaks carry one, drop peaks whose
   `projectSearchId !=` this one. (Skipped for the untagged fixed-file case so quant still shows.)
4. Sums intensity and counts peaks over the surviving set.
5. **Shared-signal detection**: any surviving peak that also carries a reportedPeptideId **outside this
   row's own set** flags `sharedWithOtherReportedPeptides = true` and counts `otherReportedPeptideIdCount`.
   This catches the dominant case — variable-mod positional isomers of the same base sequence + same
   mass, which FlashLFQ cannot separate, so it reports the **same intensity under each** reported peptide.

A parallel `get_QuantForReportedPeptideIds` (union over `_peakIndicesByReportedPeptideId`, ignoring
open-mod form) gives the **reported-peptide TOTAL** shown as the gray comparison column in the standalone
panel. The per-form value (this section) is what the real datatable Quant column shows.

---

## 7. Rendering into the datatable column

In `..._Create_TableData.tsx`:
- **Column** (per search): `DataTable_Column` id `"quant_"+projectSearchId`, name `"Quant"` (single
  search) or `"Quant (<searchLabel>)"` (multi-search), width 110, **sortable**, right-aligned, added
  immediately after that search's PSM Count column. Multi-search => one Quant column per search.
- **Cell**: `valueDisplay` = `summedIntensity.toExponential(2)`; `valueSort` = raw `summedIntensity`
  (numeric sort). Empty string when intensity is 0/absent.
- **Shared glyph**: if shared, prepend `⚭` (U+26AD) so shared rows are visible without hovering.
- **Tooltip**: summed intensity (3-dp exp), MS1 feature count, and when shared a note that FlashLFQ
  couldn't distinguish this peptide from *N* others of the same mass (typically localization variants)
  and to "treat these rows as one quantity."
- **Download**: the un-glyphed base value is pushed to the download table.
- The section component renders a one-time **info box** above the table explaining Quant semantics, only
  when quant is loaded.

### Wiring / re-render
`...GeneratedReportedPeptideListSection_Component` calls `quant_PrototypeData_Load()` in
`componentDidMount` and `quant_PrototypeData_RegisterOnLoaded(...)` to rebuild the table when the async
fetch finishes (self-subscribed to the singleton so it does not depend on parent
`shouldComponentUpdate` gating). When building table data it reads the singleton **directly** via
`quant_PrototypeData_GetIfLoaded()` rather than trusting the prop to have propagated. The peptide page
instead threads it through `this.state.quant_PrototypeData` and also feeds `displayedPeptides` to the
standalone panel.

---

## 8. The peptide-page `displayedPeptides` path (standalone panel matching)

The single-protein Quant *column* (sections 5–7) is one consumer of `Quant_PrototypeData`. The **peptide
page** has a *second, separate* consumer: the standalone debugging panel
(`Quant_PrototypeDisplay_QuantifiedPeaks_Component`), which matches quant to the displayed peptide rows
through a `displayedPeptides` array rather than through the datatable cell builder. Same underlying
data/indexes, different call path and — importantly — **different scoping rules**.

### 8.1 Where it lives
`peptidePage_Display_MainContent_Component.tsx`:
- In `_runOnPageLoad`, `quant_PrototypeData_Load()` is called once; on resolve it `setState({
  quant_PrototypeData })`, which (a) rebuilds the peptide table with the Quant column (via the prop into
  the list section, exactly as the protein page does) **and** (b) gates the panel.
- In `render()`, **only when `this.state.quant_PrototypeData` is set** (i.e. a run was actually loaded
  from the URL hash), a red "Debugging only — prototype" label plus
  `<Quant_PrototypeDisplay_QuantifiedPeaks_Component displayedPeptides={ this._compute_displayedPeptidesForQuantPrototype() } />`
  is rendered **below** the peptide table. No run => no panel.
- A generic `Quant_Container_Component` (the "View/Add Quant" button/tools, reused across pages) is
  rendered above the filter block; it is separate from the prototype panel.

### 8.2 Building `displayedPeptides` — `_compute_displayedPeptidesForQuantPrototype()`
Returns `Array<Quant_DisplayedPeptide> | undefined`. Each `Quant_DisplayedPeptide` =
`{ peptideDisplayString, reportedPeptideIds, openModDescriptor }`.

- Source is `this.state.create_GeneratedReportedPeptideListData_Result.entries_Key_peptideSequenceDisplay`
  — the same peptide-list entries that drive the table. Returns `undefined` until that list exists (panel
  then shows nothing).
- It iterates each entry (keyed by the **generated peptide display string**) and, from
  `entry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId`
  (`Map<projectSearchId, Map<reportedPeptideId, …>>`), collects reportedPeptideIds into a `Set`.
- **Key difference from the table column:** it flattens over **all** projectSearchIds — the outer
  `perProjectSearchId_Map.forEach(...)` unions rpids across *every* search into one set. The datatable
  column instead reads a single `projectSearchId` and scopes per search. So a peptide-page panel row's
  reportedPeptideIds is the **cross-search union**.
- `openModDescriptor` is the **stamped** `entry.quant_openModDescriptor_prototype` (the same stamped
  descriptor described in §5b), explicitly *not* parsed from the display string.

So each panel input row carries exactly the two identity pieces the join needs — a set of
reportedPeptideIds and one open-mod descriptor — for one generated peptide display string.

### 8.3 How the panel matches (inside `Quant_PrototypeDisplay_QuantifiedPeaks_Component`)
The panel only enters "matched" mode when `data.groupingBy === "reportedPeptideId"` **and**
`displayedPeptides` is non-empty (`canMatchToRows`). Then, for each displayed row it computes **two**
numbers:

1. **Reported-peptide total** — `data.get_QuantForReportedPeptideIds(displayed.reportedPeptideIds)`:
   union of peaks over the row's rpids (each peak once), ignoring open-mod form. Shown as the gray
   "Reported-peptide total" / "# Peaks (rpid)" comparison columns.
2. **Per display form** — `data.get_QuantForDisplayForm(displayed.reportedPeptideIds, om)` with
   `om = displayed.openModDescriptor ?? { kind:"none", roundedMass:0 }`: the same form-key union +
   descriptor reconciliation described in §6. Shown as "Per-form Intensity" / "# Peaks (form)". This is
   the panel's primary column; rows are **sorted by per-form intensity descending** (NaN/localized sort
   last), and only the **top 200** after any free-text filter are rendered.

**Second scoping difference:** the panel calls `get_QuantForDisplayForm` with **no `restrictToProjectSearchId`
argument**, so the per-search restriction in §6 step 3 is *not* applied — the panel pools peaks across all
loaded runs. (The datatable column always passes `projectSearchId`, so it is per-search.) Net effect: on
a multi-run page the panel's per-form number can be larger than an individual per-search column value,
because it is the cross-search pool.

The panel also shows an aggregate mode line (`X of Y displayed forms have per-form quant`, total peaks,
total intensity), the "results not ready" banner for `notReadyRuns`, and, when *not* matched, falls back
to a standalone rollup (`rollup_ByReportedPeptideId` or `rollup_ByBaseSequence`).

### 8.4 Column vs panel — the two consumers

| | Datatable **Quant column** | Standalone **panel** |
|---|---|---|
| Consumer | `..._Create_TableData.tsx` cell builder | `Quant_PrototypeDisplay_QuantifiedPeaks_Component` |
| rpid set per row | one `projectSearchId` (per search) | **union across all searches** |
| Match call | `get_QuantForDisplayForm(ids, desc, projectSearchId)` | `get_QuantForDisplayForm(ids, desc)` **+** `get_QuantForReportedPeptideIds(ids)` |
| Per-search scoping | **yes** (restrictToProjectSearchId) | **no** (pooled across runs) |
| Open-mod descriptor | stamped `quant_openModDescriptor_prototype` | same stamped descriptor |
| Shown value | per-form summed intensity, `⚭` glyph, tooltip | per-form **and** rpid-total, top 200, sortable/filterable |
| Rows | all rows | top 200 after filter |
| Present on | protein single-protein page **and** peptide page (same column) | peptide page only |

Both ultimately hit the same `_peakIndicesByFormKey` / `_peakIndicesByReportedPeptideId` indexes on the
one shared singleton, so a given (rpid, form) resolves to the same peaks in both — the differences are
only in *which rpids are grouped into a row* and *whether the result is scoped to a search*.

---

## 9. Semantics & known limitations that fall out of this scheme

- **Union-once / not additive down the column.** A shared MS1 feature is counted under every row it maps
  to (near-isobaric peptides, and forms of one reported peptide) — same convention as PSM Count.
  **Do not sum the column.** Marked with `⚭`. *(This is the cross-row caveat; the apex-vs-area caveat
  below is a separate, within-row concern about the value the sum is built from.)*
- **Apex-vs-area caveat (the summed value's physical basis).** The number in each cell is a **sum of the
  `Peak intensity` column** across the row's matched features (§6/§4) — and the value being summed is
  **not necessarily an integrated area.** FlashLFQ's `--int` flag (`quant/quant_FlashLFQ_Parameters.ts`,
  key `integrate`) **defaults to `false`**, and in that default mode `Peak intensity` is the peak's
  **APEX HEIGHT**, not an integrated chromatographic area (area is reported only with `--int true`). So
  by default each cell sums **apex heights** across a peptidoform's features/charge states. Apex heights
  are a **shakier / less-additive** physical quantity than integrated areas: summing them conflates
  tall-narrow and short-wide peaks and will not match an area-based chromatogram cross-check unless
  `--int` is on. Whether the summed display should instead be driven by `--int true` (an additive area)
  is an **open design decision**, not a settled one. (Note FlashLFQ itself does not recommend
  integration — it calls the area noisier — so apex-vs-area trades additivity against noise.) This is a
  distinct issue from the cross-row "do not sum the column" point above: that one is about double-counting
  a shared feature across rows; this one is about the summed-within-a-row value not being an area.
  *(Provenance: the `--int` default and the sum are read directly from the code; the "apex heights are
  shakier than areas" judgement is a design/review assertion, not a measurement from a live run.)*
- **Not charge-scoped, not filtered by secondary UI filters.** The value is the peptidoform total over
  the *submitted* PSMs; frozen at run-request cutoffs; does not react to charge / RT / m/z / scan-number
  row filters. Intensity is not charge-decomposable, so multi-charge forms report one combined number.
- **Localized-open-mod collision (prototype limit):** two localized forms of one rpid with the same
  rounded mass at *different residues* share a form key (`<rpid>|localized|m`) and get summed — the
  residue position is not compared. Rare, and this is the flagged deferred open-mod area.
- **`none` vs `unlocalized|0`** is deliberately fuzzed at mass 0 to absorb the always-emitted near-zero
  `[u]` bucket.
- **Silent drops upstream:** peptides whose base mass can't be computed are dropped at request build;
  near-isobaric mass forms are collapsed so FlashLFQ doesn't silently drop them. Both affect which rows
  get a number.
- "Top 200 shown" and the free-text filter are properties of the standalone **panel** only — the real
  datatable column shows all rows.
- The whole mechanism is file-based, hash-driven, singleton-cached, and marked for deletion once the
  DB-backed ingest lands.

---

## 10. One-sentence summary

Each PSM's Limelight `reportedPeptideId` (and its open-mod tokens) are baked into FlashLFQ's grouping
string as `rpid<id>_...`; FlashLFQ echoes that string back per MS1 peak in `QuantifiedPeaks.tsv`; the
browser parses the id (and open-mod descriptor) straight back out to build `rpid->peaks` /
`form->peaks` indexes; then each datatable row sums the **union** (each peak once) of the peaks matching
its own reportedPeptideIds + stamped open-mod descriptor, scoped to its search — so "matching" is an
exact id/string round-trip, never a re-computed chemical identity.
