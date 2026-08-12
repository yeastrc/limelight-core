# FlashLFQ quant — SUM across variable-mod forms when "Collate: Variable Modifications" is unchecked (implementation plan)

**Date: 2026-08-12.** Status: **APPROVED direction (Dan, 2026-08-12), not yet implemented.** This is a
fully-detailed handoff for a new engineer/Claude to execute. All FlashLFQ-quant feature code is currently
**HELD / uncommitted** in the working tree (the `QuantifiedPeptides.tsv` switch, Phases 1–3, is already in
the tree — this plan builds directly on it).

> **One-paragraph summary.** Today (decision **D6** of the QuantifiedPeptides switch) the Quant column is
> **hidden** and running quant is **blocked** whenever "Collate Peptides Using: **Variable Modifications**"
> is **unchecked** — because unchecking merges a peptide's variable-mod forms into one display row and we had
> no rule to combine their quant. Dan now directs: **instead of hiding, SUM the quant values that roll up
> into that collapsed peptide row.** The sum is over **distinct FlashLFQ peptidoforms (`groupId`)** — each
> physical measurement counted once (positional isomers share one `groupId`/value and must not be
> double-counted). If **any** contributing form is FlashLFQ-"overlapping signal" (`ambiguousZeroed`), the
> **whole peptide row** is marked `overlapping signal` (no number) — plus a banner explaining why. Running
> quant is **allowed regardless** of the toggle (the run is submitted at full variable-mod granularity; the
> toggle is display-only). New wording explains that the collapsed value is a **Limelight sum across
> modification forms**, not FlashLFQ's own per-peptide value.

---

## 0. Provenance / how to read this

- File:line citations were gathered by read-only exploration of the working tree on 2026-08-12 and are
  **OBSERVED** unless marked otherwise. Line numbers drift as the uncommitted code is edited — treat them as
  anchors; `grep` the named symbol to re-locate.
- Items marked **DECISION** are settled (Dan, 2026-08-12); do not re-litigate without asking.
- Companion docs to read first:
  - `flashlfq_quant_switch_to_QuantifiedPeptides_file__implementation_plan_2026-08-10.md` — the design this
    modifies; **decision D6** there is what this plan reverses.
  - `flashlfq_output_file__QuantifiedPeptides.md` — what `groupId` is (the FlashLFQ `Sequence` = grouping
    identity; one row = one MAX measurement; shared → 0).
  - `flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md` — the governing
    sum-rule; **§ "Why this is allowed"** below explains why this sum does NOT violate it.

---

## 1. Current state (what exists) and what changes

### 1a. The data path (unchanged by this plan)
The FlashLFQ run is submitted per-(search, scan file); results are read back through the **joined** result
webservice `d/rws/for-page/flashlfq-run--result-retrieval-joined`
(`FlashLFQ_Run__Result_Retrieval_Joined_RestWebserviceController`), which returns, **per
`reportedPeptideId`**, `{ intensity, groupId, ambiguousZeroed, detectionType }`. The front end
(`quant/quant_PrototypeData.ts`) stores these keyed by `(searchScanFileId → reportedPeptideId → record)` and
exposes `get_QuantForDisplayForm(...)`, `get_GroupId_ForReportedPeptideId(...)`,
`isAmbiguousZeroed_ForReportedPeptideId(...)`.

**`groupId`** = the FlashLFQ grouping-identity string `<baseSequence>[+<summed reported-peptide-level
variable-mod mass>]` (full precision, static mods excluded, non-positional, no reportedPeptideId), built by
`FlashLFQ_GroupingIdentity_Common`. **One `groupId` == one FlashLFQ output row == one physical MS1
measurement.** Several `reportedPeptideId`s can carry the **same** `groupId` and the **same** `intensity`
(positional isomers / equal-summed-mass forms) — this many-to-one collapse is deliberate (switch-plan D2, so
FlashLFQ won't zero isomers as "shared").

### 1b. The row grain and how a row already carries its forms
A display row is keyed on the 2-decimal display string `peptideSequenceDisplay`. Each row entry carries
`peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId` — **all** the
reportedPeptideIds that rolled up into that row. The Quant cell builders already derive
`reportedPeptideIds_ForQuant` from exactly this map for **both** the per-search cell (modes 1 & 2,
`..._Create_TableData.tsx:1583-1588`) and the per-sub-group cell (mode 3, `:1451-1456`). **So a collapsed
row (variable mods unchecked) already carries every one of its forms' reportedPeptideIds** — the sum is a
pure cell-builder change; no new data or webservice is needed.

- **Variable mods CHECKED (default):** each row = one 2-decimal mod form. Given switch-plan **D4** (the whole
  search is blocked if two distinct variable-mod masses round to the same 2-decimal display), a checked row
  resolves to exactly **one distinct `groupId`**. (It may still map to several reportedPeptideIds — positional
  isomers appear as *separate* display rows that share a `groupId`; that cross-row case is today's `⚭` glyph.)
- **Variable mods UNCHECKED:** all variable-mod forms of a base sequence collapse into **one** row, whose
  reportedPeptideIds span **multiple distinct `groupId`s** (unmodified, +80 phospho, +42 acetyl, …).

### 1c. D6 today (what is being replaced)
The reverse-me machinery:
- `peptidePage_Display_MainContent_Component.tsx`
  - `_quantColumn_HiddenBy_CollateVariableModificationsToggle()` (`:3226-3229`) = `searchesContains_VariableModifications && ! getVariableModifications_Selected()`.
  - `:1401` passes `quant_PrototypeData: <hidden> ? undefined : this.state.quant_PrototypeData` (starves the column of data).
  - `:3185` passes `quantColumn_Hidden_ByCollateVariableModificationsToggle={ ... }` to the section component.
  - `:3256-3257` passes `searchesContains_VariableModifications` + `variableModifications_Collate_Selected` to `Quant_Container_Component`.
- `quant_Container_Component.tsx`
  - reason union member `"COLLATE_VARIABLE_MODIFICATIONS_UNCHECKED"` (`:44`); props `searchesContains_VariableModifications` / `variableModifications_Collate_Selected` (`:72-77`); re-gate on their change (`:137-139`); the gate branch (`:197-198`); `_notAvailableMessage` case (`:321-...`); the always-on standing message `_render_StandingMessage_CollateVariableModifications()` (`:338-349`, rendered at `:371,382,398`).
- `..._GeneratedReportedPeptideListSection_Component.tsx`
  - prop `quantColumn_Hidden_ByCollateVariableModificationsToggle` (`:81,348`), rebuild/re-render guards (`:156,176-179,426`), the D6 "column is hidden" message branch (`:604-614`). The flag **gates the on-screen table's data feed at the `:243-245` gate** (`quant_PrototypeData__ShouldShow_QuantColumn() && ! quantColumn_Hidden... ? quant_PrototypeData_GetIfLoaded() : undefined` — i.e. it reads the SINGLETON, not the incoming `quant_PrototypeData` prop) and is also forwarded as a **child re-render prop** to `ReportedPeptideList_Component` (`:311`).
- `..._Create_TableData.tsx`
  - `_build_Quant_DataRow_ColumnEntry` (`:459-528`) **forwards the whole `reportedPeptideIds_ForQuant` array** to `get_QuantForDisplayForm` (`:471`) and only interprets the **single** `rowQuant` it returns. The **per-reportedPeptideId first-match, NO summing** logic actually lives **inside `get_QuantForDisplayForm`** (`quant_PrototypeData.ts:180-184`, the loop that returns the first matching record at `:182`) — so swapping that method call for `get_SummedQuantForDisplayForm` is the correct single lever (the builder body is otherwise a render of one result). Also here: the shared-glyph pre-pass `_compute_Quant_SharedGroupIds_ByProjectSearchId` (`:540-577`); column header tooltip (`:405-433`); marker constants `_QUANT_SHARED_GLYPH="⚭"` (`:94`), `_QUANT_AMBIGUOUS_MARKER="overlapping signal"` (`:100`).

---

## 2. Decisions (DECISION — Dan, 2026-08-12)

**DEC-1. Sum over DISTINCT `groupId` (dedupe positional isomers).** For a collapsed row, gather the distinct
`groupId`s among the row's reportedPeptideIds (within the resolved scan file) and sum each `groupId`'s
intensity **once**. Do **not** sum per reportedPeptideId — reportedPeptideIds sharing a `groupId` carry the
same measurement and would be double-counted. Worked example (base `PEPSTIDE`): unmod `1.0e8` + phospho
`4.0e7` (two positional-isomer rpids, same value) + acetyl `2.0e7` → **`1.6e8`**, not `2.0e8`.

**DEC-2. Any overlapping form → the WHOLE peptide row is `overlapping signal` (+ a banner).** If **any**
distinct contributing `groupId` is `ambiguousZeroed`, show the fixed `overlapping signal` marker for the
**entire row** (no number, no partial sum, no glyph). Rationale (Dan): users won't hunt for a subtle glyph
and would read a partial sum as a true total — better to be blunt and in-their-face. Also show a **banner
above the table** (only when summing is active and at least one displayed row is so marked) explaining that
with Variable Modifications collate off, a peptide that combines forms is marked overlapping when **any**
form has ambiguous MS1 signal. When **every** contributing form is non-ambiguous but not detected (sum
would be 0), the cell is **blank** (today's behavior), not the marker.

**DEC-3. Allow running quant regardless of the toggle.** The run is submitted at full variable-mod
granularity (request-creation derives reported peptides from the cutoff filters, not the collate toggle), so
the toggle has zero effect on the run. Remove the D6 run-block entirely (reason, gate branch, message,
standing message). **Verified 2026-08-12:** the run-request payload carries **only** `projectSearchIds` +
filter state (`SearchDataLookupParameters_Root`); the collate toggle is never part of the submitted request,
so allowing the run while unchecked cannot change what FlashLFQ receives.

**DEC-4. Messaging.** (a) An **above-table note, shown only when summing is active**, stating the Quant
values are **summed across the collapsed modification forms — a Limelight total, not FlashLFQ's per-peptide
value.** (b) A **per-row tooltip** on summed cells describing the sum (and listing the contributing forms).
(c) **Update the column-header tooltip and the "About the Quant column" info box** to describe the summed
case conditionally (today they assert "not a sum of peaks," which is form-specific and misleads when
collapsed). (d) **Remove** the old D6 standing button message.

**DEC-5 (accepted approximation, no action beyond a note).** Each `groupId` value is a MAX (apex height by
default, integrated area with `--int`); summing apex heights across different peptidoforms is approximate.
Dan is explicitly told to sum — record it as a known, accepted approximation; do not add guards or gating.

### Why this is allowed (does NOT violate the do-not-sum rule)
`flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md` forbids summing across **scan
files / searches / conditions** (fraction-vs-replicate + cross-run non-comparability). This sum is a
**different axis**: distinct peptidoforms of one base sequence **co-measured in one scan file / one FlashLFQ
run** — on a common scale, no cross-run join, no fraction/replicate ambiguity. The per-scanfile record map
means the dedupe+sum happens **inside one run** (see DEC-1's scan-file scoping). It is a legitimate,
now-user-visible aggregate (DEC-4 makes it non-silent). It does, however, move Limelight back to **owning**
this particular aggregate (the switch to the peptide file was about not owning per-peptide aggregation) — a
deliberate, scoped exception for the collapsed-forms case only.

---

## 3. The unified cell rule (the heart of the change)

Replace the per-cell "first match, no summing" with a distinct-`groupId` sum. **The rule is identical for
checked and unchecked** — no flag needed in the numeric path, because a checked row resolves to one distinct
`groupId` (§1b), so its "sum" is that single value:

```
cell( reportedPeptideIds, projectSearchId, restrictToSearchScanFileId ):
  records = the row's reportedPeptideIds that have a quant record IN the resolved scan file
  if records is empty                        -> BLANK
  group records by groupId (null groupId -> synthetic key "rpid:"+reportedPeptideId, so it counts once)
  distinctGroups = one representative record per groupId (all share the same intensity + ambiguous flag)
  if ANY distinctGroup.ambiguousZeroed       -> "overlapping signal" marker   (DEC-2, whole row)
  summed = Σ over distinctGroups of intensity
  if summed > 0                              -> summed value  (⚭ prefix ONLY when exactly one distinct group AND it is in the shared set — preserves today's checked-mode glyph; multi-group summed cells never show ⚭)
  else                                       -> BLANK
```

This preserves checked-mode output **byte-for-byte** (one group → today's value + today's `⚭` behavior) and
adds the sum for collapsed rows. `⚭` naturally goes quiet when collapsed (a `groupId` is base-sequence-scoped
so it cannot span two collapsed rows → the shared set is empty).

**Load-bearing dependency on switch-plan D4.** Byte-for-byte checked-mode preservation holds **only because
D4** (the whole-search reject `VARIABLE_MOD_MASSES_COLLIDE_AT_2_DECIMAL_PLACES`) guarantees that within a
runnable search **one checked display row = one distinct `groupId`**. If D4 were ever relaxed, a checked row
could span two `groupId`s and `get_SummedQuantForDisplayForm` would **silently start summing them** (changing
checked-mode values). The new method must carry a code comment tying this invariant to D4 so the coupling is
not lost.

---

## 4. Front end — step by step

### 4.1 `quant/quant_PrototypeData.ts` — add a summed-lookup method (keep `get_QuantForDisplayForm` or replace it)
Add a method that implements §3's gather/dedupe (the class already holds
`_record_ByReportedPeptideId_ByScanFileId` and `_resolveScanFileId`):

```ts
//  Summed quant for a display row: sum over DISTINCT FlashLFQ peptidoforms (groupId) among the row's
//  reportedPeptideIds, in the resolved scan file. Dedupes positional isomers (same groupId, same value).
//  Returns undefined when the row has no matching FlashLFQ record (blank cell).
//  NOTE (D4 invariant): with variable mods CHECKED this returns the single-group value byte-for-byte,
//  which relies on switch-plan D4 guaranteeing one checked display row = one distinct groupId. Carry
//  a code comment here tying this to D4 (VARIABLE_MOD_MASSES_COLLIDE_AT_2_DECIMAL_PLACES).
get_SummedQuantForDisplayForm(
    reportedPeptideIds: Array<number>, projectSearchId: number, restrictToSearchScanFileId: number | undefined
): Quant_PrototypeData_RowQuant_Summed | undefined
```

Returning (new small class; **single-underscore** name to match the existing sibling
`Quant_PrototypeData_RowQuant` at `quant_PrototypeData.ts:78`, filename-prefixed export per house style):
```ts
export class Quant_PrototypeData_RowQuant_Summed {
    summedIntensity: number          // Σ of distinct-groupId intensities (0 if none detected)
    anyAmbiguous: boolean            // any distinct contributing group is ambiguousZeroed (DEC-2)
    distinctGroupCount: number       // # distinct groupIds contributing (1 => checked-mode single form)
    singleGroupId: string | undefined  // the groupId when distinctGroupCount === 1 (for the ⚭ pre-pass); else undefined
    contributingGroupIds: Array<string> // for the tooltip form list (may include synthetic "rpid:" keys)
}
```
Implementation notes:
- Resolve the scan file with the existing `_resolveScanFileId(projectSearchId, restrictToSearchScanFileId)`;
  read `_record_ByReportedPeptideId_ByScanFileId.get(scanFileId)`.
- Iterate the row's `reportedPeptideIds`, collect the record for each; **dedupe by `record.groupId`**
  (fallback synthetic key `"rpid:"+reportedPeptideId` when `groupId` is null/undefined — guard per house
  nullable rules). Take intensity + `ambiguousZeroed` from the first record seen per key (they're equal
  within a group).
- `anyAmbiguous = true` if any deduped group's `ambiguousZeroed`. `summedIntensity` = Σ of non-ambiguous
  groups' intensities (ambiguous groups contribute 0, but their presence already forces the marker).
- Keep `get_GroupId_ForReportedPeptideId` and `isAmbiguousZeroed_ForReportedPeptideId` as-is (used by the
  shared-glyph pre-pass and the banner scan). You MAY delete `get_QuantForDisplayForm` once the only caller
  (`:471`) is migrated, or keep it if convenient — the summed method supersedes it.

### 4.2 `..._Create_TableData.tsx` — `_build_Quant_DataRow_ColumnEntry` (`:459-528`)
Rewrite the body to §3's rule using `get_SummedQuantForDisplayForm`:
- `undefined` → blank (unchanged).
- `anyAmbiguous` → `_QUANT_AMBIGUOUS_MARKER` cell (reuse today's marker path, `valueSort = 0`; tooltip:
  "overlapping signal" wording, and when `distinctGroupCount > 1` add "— this peptide combines several
  modification forms and at least one has overlapping MS1 signal, so the whole peptide is marked overlapping").
- else `summedIntensity > 0`:
  - `shared = ( distinctGroupCount === 1 && singleGroupId != null && sharedGroupIds_ForProjectSearchId?.has(singleGroupId) )` — **only single-group (checked) cells can show `⚭`**.
  - `base = summedIntensity.toExponential(2)`; prefix `⚭ ` iff `shared`.
  - Tooltip: if `distinctGroupCount === 1` keep today's "Quant — this display form" text; if `> 1`, use
    "Quant — sum across N modification forms" and note it is a **Limelight total across the collapsed
    variable-modification forms (co-measured in one run), not FlashLFQ's per-peptide value**; optionally
    list the contributing `groupId`s.
- else → blank.
- The `sharedGroupIds_ForProjectSearchId` pre-pass (`_compute_Quant_SharedGroupIds_ByProjectSearchId`,
  `:540-577`) is **unchanged** — it stays correct for checked mode and is naturally empty when collapsed.
- **Column header tooltip** (`quant_columnHeader_Tooltip_Fcn...`, `:405-433`): add a conditional line when
  summing is active — pass a new boolean param (e.g. `quantSummingAcrossModForms_Active`) into
  `_build_Quant_Column_Header` so the header tooltip can add: *"With 'Collate Peptides Using: Variable
  Modifications' unchecked, each value is the SUM of FlashLFQ's per-peptidoform intensities across the
  collapsed modification forms (a Limelight total)."* Thread that boolean from the section component (§4.3).

### 4.3 `..._GeneratedReportedPeptideListSection_Component.tsx` — banners, column feed, info box
- **Remove the D6 hide branch** (`:604-614`) and the `quantColumn_Hidden_ByCollateVariableModificationsToggle`
  prop + all its guards/uses (`:81,156,176-179,243-245,311,348,426`). The column is **no longer** suppressed
  by the toggle; it shows whenever `quant_PrototypeData__ShouldShow_QuantColumn()` is true.
- **Replace** that prop with a new boolean prop `quantSummingAcrossModForms_Active` (true when the peptide
  page's summing condition holds — §4.4). Use it for the header tooltip (thread to `_build_Quant_Column_Header`)
  and the two banners below. Keep it in the rebuild/re-render guards where the hide prop was.
- **DEC-4 above-table summed-value note** — in the banner region (the IIFE at `:591-...`, alongside the
  existing D5 "overlapping signal" note at `:661-672`; note `:648-659` is a *different* "Quant is not
  available" runs note — do not target that one), when `quantSummingAcrossModForms_Active` and the
  column is shown, render a note: *"'Collate Peptides Using: Variable Modifications' is off. Each Quant value
  is the SUM of FlashLFQ's per-peptidoform intensities across the collapsed modification forms — a Limelight
  total, not FlashLFQ's own per-peptide value."*
- **DEC-2 whole-peptide-ambiguous banner** — the existing scan `anyDisplayedRow_OverlappingSignal`
  (`:620-633`) already walks displayed rows via `isAmbiguousZeroed_ForReportedPeptideId`. When
  `quantSummingAcrossModForms_Active` and that flag is true, render (in place of, or clearly distinct from,
  the generic D5 note) a banner: *"Because 'Variable Modifications' collate is off, each peptide row combines
  its modification forms. When any form has overlapping (ambiguous) MS1 signal, the whole peptide is marked
  `overlapping signal` instead of a total."* Keep quoting the literal marker string so browser-Find still
  works. When **not** summing (checked), keep today's generic D5 note unchanged.
- **DEC-4 info box** — update the "About the Quant column" block (`:680-...`, the `⚭` / overlapping prose) to
  add, conditionally on `quantSummingAcrossModForms_Active`, a short paragraph describing the summed value
  and pointing out it is a Limelight aggregate across modification forms.

### 4.4 `peptidePage_Display_MainContent_Component.tsx` — flip hide → sum-active, always feed data
- **Rename/repurpose** `_quantColumn_HiddenBy_CollateVariableModificationsToggle()` (`:3226-3229`) to
  `_quant_SummingAcrossCollapsedVariableModForms_Active()` — **same condition**
  (`this._searchesContains_VariableModifications && ! getVariableModifications_Selected()`).
- **Stop starving the DOWNLOAD path** at `:1401`: pass `quant_PrototypeData: this.state.quant_PrototypeData`
  unconditionally so the peptide-table **download** includes the Quant column when unchecked. (This is the
  download-build call only. The **on-screen** column was never starved here — the peptide page already passes
  `quant_PrototypeData` unconditionally to the section at `:3184`, and the section reads the quant SINGLETON
  via `quant_PrototypeData_GetIfLoaded()`; the on-screen column is un-hidden by **removing the `:243-245`
  hide gate in §4.3**, not by this line.)
- At `:3185`, pass the new `quantSummingAcrossModForms_Active={ this._quant_SummingAcrossCollapsedVariableModForms_Active() }`
  to the section component (replacing the removed hide prop). (`:3184` already passes `quant_PrototypeData`
  as a re-render trigger — leave it.)
- **Quant container props** (`:3256-3257`): remove `searchesContains_VariableModifications` and
  `variableModifications_Collate_Selected` (no longer used for gating — DEC-3). Leave the other props.

### 4.5 `quant/quant_Container_Component.tsx` — remove the run-block (DEC-3)
- Delete the reason-union member `"COLLATE_VARIABLE_MODIFICATIONS_UNCHECKED"` (`:44`); the props
  `searchesContains_VariableModifications` / `variableModifications_Collate_Selected` (`:72-77`); the
  `componentDidUpdate` re-gate on them (`:137-139`); the gate branch (`:197-198`); the `_notAvailableMessage`
  case (`:321-...`); and `_render_StandingMessage_CollateVariableModifications()` (`:338-349`) plus its three
  render sites (`:371,382,398`). The `never`-exhaustive switches will flag anything missed — let the compiler
  guide you.
- Nothing replaces the standing message (DEC-4 (d)).

### 4.6 Required-params discipline (house rule)
Any new parameter (e.g. `quantSummingAcrossModForms_Active`, the header-tooltip boolean) must be **required**
and passed at **every** call site (explicit value, never omitted). No optional `?` left behind. Match the
duplicated per-search vs per-sub-group cell call sites so a new arg is a compile error if forgotten.

---

## 5. What gets REMOVED (explicit checklist)
- The D6 "column hidden" message and the `quantColumn_Hidden_ByCollateVariableModificationsToggle` prop chain
  (peptide page → section component → table builder).
- The `undefined`-quant-data starve at `peptidePage_..._MainContent_Component.tsx:1401`.
- The entire `COLLATE_VARIABLE_MODIFICATIONS_UNCHECKED` run-block + standing message in `quant_Container_Component.tsx`.
- (Optional) `get_QuantForDisplayForm` in `quant_PrototypeData.ts` once migrated to `get_SummedQuantForDisplayForm`.

## 6. Edge cases / correctness
- **Null `groupId`**: dedupe fallback key `"rpid:"+reportedPeptideId` so the record still counts once and does
  not collide with a real group. (Should not occur, but guard.)
- **All contributing forms not-detected** (non-ambiguous, intensity 0): `summedIntensity === 0` → **blank**,
  not the marker (marker is reserved for `ambiguousZeroed`, DEC-2).
- **Scan-file scoping**: the sum is always within the resolved single scan file (`_resolveScanFileId`) — modes
  1 & 2 use the search's single run; mode 3 uses the sub-group's own run (1:1 invariant). No cross-scan-file
  or cross-run summing is introduced (consistent with the governing rule).
- **Checked mode unchanged**: with D4 in force, a checked display row = one distinct `groupId`, so the summed
  method returns that single value and the `⚭` pre-pass behaves exactly as today.
- **Download string / valueSort**: download string = the summed `toExponential(2)` (or the marker / blank);
  `valueSort` = `summedIntensity` (marker sorts at 0, blank at -1) — same ordering contract as today.
- **Single-protein overlay shares this code** (`..._Create_TableData.tsx` drives the peptide page and the
  overlay). The overlay has no collate toggle of its own, so `quantSummingAcrossModForms_Active` will be
  driven by whatever flag the hosting page threads; verify the overlay path still passes a defined value
  (default false) so its cells use single-group behavior. **Confirm during testing.**

## 7. Verification / testing
- **Build:** front-end fast type-check via tsgo (memory `fast-typecheck-tsgo`) + the FE-only Ant build
  (`ant -f ant_buildFrontEnd_CopyToTomcat.xml`). No Java change in this plan → no WAR rebuild required.
- **Runtime (owner session, `admin`/`admin`):** on a search with reported-peptide-level variable mods and at
  least one base sequence carrying ≥2 mod forms (ideally including positional isomers and an overlapping
  form), with a READY run selected via the hash:
  1. **Unchecked** "Variable Modifications": the collapsed row shows a **summed** value; verify it equals the
     sum of the **distinct** `groupId` intensities (positional isomers counted once) — cross-check against the
     run's `QuantifiedPeptides.tsv` rows.
  2. A collapsed row containing an overlapping form shows **`overlapping signal`** for the whole row, and the
     **whole-peptide-ambiguous banner** appears.
  3. The **summed-value note** appears above the table only while unchecked; the header tooltip / info box
     show the summed-case wording.
  4. **Checked** "Variable Modifications": values, `⚭` glyphs, and the generic overlapping note are
     **identical to before this change** (regression check).
  5. **Run** quant while **unchecked**: the View/Add Quant button is available and a run can be initiated
     (DEC-3) — no "collate" block.
  6. The **single-protein overlay** peptide list still renders quant correctly (§6 last bullet).
- **Provenance note for any report:** state that the summed number is **Limelight-computed** (not read from
  FlashLFQ's file) when describing observed values.

## 8. Out of scope / unchanged
- Java (request-creation, the joined result controller, `FlashLFQ_GroupingIdentity_Common`) — **no change**.
- Open-mod quant and PSM-level (dynamic) variable-mod quant remain rejected (unchanged).
- Protein-level rollup remains a separate future feature (do not implement here; keep per-`reportedPeptideId`
  quant + `groupId` cleanly available).
- Track B (DB-backed ingest) remains the eventual real home; this is prototype-path evolution.
