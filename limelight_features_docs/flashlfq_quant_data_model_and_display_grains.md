# FlashLFQ quant: data model & display grains (design, in progress)

**Status:** design/working notes. Started 2026-07-07. Captures the storage grain, the display roll-ups, and
what the file-based prototype can vs. can't do without the DB. Companion to
`flashlfq_quant_subgroup_scanfile_eligibility.md` (the cross-cutting eligibility rule),
`flashlfq_per_scan_file_separate_run_rationale.md` (why the per-scan-file grain requires a *separate
FlashLFQ run* per file — MBR is incompatible with the run-once/display-many model), and
`flashlfq_output_to_limelight_mapping.md` (identity round-trip). For sub-groups specifically —
schema → import → searchers → REST → UI, and the §7 display-grain rule the quant column inherits — the
**authoritative reference** is `limelight_search_sub_groups_deep_dive.md`.

**Terminology note:** avoid the word **"tag"** for anything here — Limelight already uses *search tags*
(user-assigned labels for filtering searches on the project page, shown under the search name everywhere).
Use the precise ids: **`projectSearchId`**, **`searchSubGroupId`**, **`scanFileId`** (`search_scan_file_id`),
**`reportedPeptideId`**.

---

## 1. The storage grain (the atom): per scan file

MS1 label-free quant is physically a property of one peptidoform in one raw file, so the atomic quant
record is:

> **(projectSearchId, scanFileId, peptidoform-identity) → intensity**

where `peptidoform-identity = reportedPeptideId + open-mod form {kind, roundedMass}` (the receive-side form
key already used by the prototype).

Each stored FlashLFQ **run** carries the provenance needed to reproduce/trust it. Per Dan, a run in the DB
must be associated with:

- **projectSearchId** (equivalently searchId / projectId),
- the **PSM/Peptide filters** actually used — the `SearchDataLookupParameters_*Root` object, but **only the
  filters, scoped to this one projectSearchId**,
- **scanFileId**.

Open question (§7): is a run one-per-`scanFileId`, or one-per-search covering all its scan files (FlashLFQ's
own output spans multiple raw files via the `File Name` column and match-between-runs)? The storage grain
above is per-scan-file either way; this only affects run bookkeeping.

## 2. Everything displayed is a ROLL-UP of the scan-file atom

The scan-file grain is never shown directly (same conclusion as the eligibility doc). The peptide/protein/mod
pages display PSM Count — and will display Quant — at one of three grains, each a roll-up:

| Mode | When | Column grain | Quant per row/cell |
|---|---|---|---|
| **1. Multiple searches** | >1 projectSearchId shown | per **search** | sum the search's scan files; **sub-groups ignored** even if present |
| **2. Single search, no sub-groups** | 1 search, no sub-groups (may still have **multiple scan files**) | **search** level | sum the search's scan files |
| **3. Single search, with sub-groups** | 1 search, sub-groups selected | per **sub-group** | sum the scan files mapped to that sub-group (needs §4) |

Mirrors how **PSM Count** already splits today (per-search columns; per-sub-group columns in the sub-group
case; sub-groups collapse to search level when multiple searches are shown). The new **Quant** column(s) go
**immediately after the PSM Count column(s)** at the same grain. Column header: **"Quant"** (single search) /
**"Quant (<search label>)"** (multi-search), replacing the current "Quant (form) (Primary)"; the
"Quant (peptide) for validation" column is dropped.

## 3. A search can have multiple scan files and no sub-groups

Important constraint that rules out shortcuts: **scan files and sub-groups are independent.** A search may
have **many scan files and zero sub-groups** (mode 2 still rolls them up to one search-level number), and a
sub-group may span several scan files. So "1 sub-group == 1 scan file" is **not** generally true — it was
only an initial testing simplification. The general rule is §4.

## 4. The scanFile → subGroup mapping (mode 3 only)

Mode 3 needs, **within one search**, a map **`scanFileId → searchSubGroupId`**. Properties:

- **Well-defined iff sub-groups PARTITION scan files** — i.e. no scan file has PSMs in more than one
  sub-group. That is *exactly* the condition the eligibility searcher already computes
  (`Search_AnyScanFile_HasPsms_In_MultipleSubGroups_ForSearchId_Searcher`, shared code). Cross-cutting ⇒ no
  clean mapping ⇒ mode-3 quant not offered (show the eligibility message).
- Must be **computed and stored for existing searches** (a backfill, like other search-level flags — see the
  new `search__flags_main_tbl` and the run-importer new-field populator), then read by the webapp to roll the
  scan-file-grain quant up to sub-groups on demand.
- Source data: `psm_tbl.search_scan_file_id` + `psm_search_sub_group_tbl.search_sub_group_id`, grouped per
  scan file (single-valued when eligible).

## 5. Prototype (files + URL hash) vs. DB — where the line falls

The prototype avoids the DB by serving `QuantifiedPeaks.tsv` files and selecting runs via the URL hash
(`#<projectSearchId>_<requestId>-…`, see `quant_PrototypeData.ts`). What each mode needs:

- **Modes 1 & 2 are prototypable file-only.** The hash already supplies the run→projectSearchId association;
  peaks are keyed by `projectSearchId`; roll-up to search level is a straight sum. No server data needed.
- **Mode 3 is NOT prototypable from files alone.** The `scanFile → subGroup` mapping is per-search DB data
  that can't be reasonably encoded in the URL hash. Mode 3 needs either the DB mapping or a small webservice
  serving it. **This is the piece that pushes toward making quant "real" (DB-backed).**

What the DB model adds over the prototype: the run↔(projectSearchId, filters, scanFileId) association, the
scanFile→subGroup mapping, and dropping the throwaway TSV fetch/URL-hash selection entirely.

## 6. Prototype per-peak data model (front end)

For the roll-ups above, each parsed peak (`_Peak` in `quant_PrototypeData.ts`) needs:

- **`reportedPeptideId`(s) + open-mod form** — the peptidoform identity (already present).
- **`projectSearchId`** — for the **search-level** roll-up (modes 1 & 2). Supplied by the URL-hash mapping;
  `undefined` for the no-hash single fixed file (then treat all peaks as the one displayed search).
- **`scanFileId` / `File Name`** — for the **sub-group** roll-up (mode 3), combined with the §4 mapping.
  (Retain from the TSV `File Name` column when mode 3 is implemented.)

Roll-up = filter peaks to the relevant `projectSearchId` (and, for mode 3, to the `scanFileId`s of the
sub-group), union the peaks matching the row's peptidoform form key, sum intensities, count once (a shared
MS1 feature counts under each row it maps to — same non-additive convention as PSM Count).

## 7. Open questions / decisions

1. **Run granularity:** one FlashLFQ run per scanFileId, or one per search across all its scan files? (§1)
2. **Mode-3 path:** implement the scanFile→subGroup mapping as a DB backfill + `search__flags`-style read, or
   a dedicated webservice? Either way it's server-side — confirm we're OK crossing the "avoid DB" line for
   mode 3 (modes 1 & 2 stay file-only in the prototype).
3. **Sequencing:** land modes 1 & 2 now (file/hash only, per-`projectSearchId` roll-up, single "Quant" column
   after each PSM Count column), and treat mode 3 as the increment that goes DB-backed?
4. **When to stop prototyping:** mode 3's server dependency is the natural point to move quant into the DB
   with the generic `(projectSearchId, scanFileId, peptidoform, intensity)` store rather than extend the
   file/hash scheme further.
