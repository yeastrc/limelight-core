# Design Discussion: Adding Quantification (MaxQuant et al.) to Limelight

Status: **exploratory design notes** (not a committed plan). Captured 2026-06-23.

This document records a design discussion about whether/how to add quantification
data — initially MaxQuant, but generically across quant programs — to Limelight.
Limelight today is an **identification** visualization/sharing tool; quant abundance
would be a new, and likely *primary*, kind of displayed data.

> **Framing (confirmed):** abundance is the **point** of this effort. Identifications
> are already well-served by existing programs/converters (Comet, etc.), so the
> ID-centric reuse paths below are *not* the goal — the **abundance matrix** is. Treat
> the scalar/annotation reuse as plumbing or a side-benefit, not the headline feature.

---

## 1. Architectural starting point (how data gets into Limelight today)

- Limelight is **search-engine agnostic**. Nothing in `limelight-core` is wired to a
  specific engine. Data enters *only* as **Limelight XML**, whose schema is defined by
  an **external** library: `org.yeastrc:limelight-import-api` (currently **v5.0.0**,
  see `Gradle_limelight-import-api_version_for_Gradle.txt`). The importer parses it via
  `org.yeastrc.limelight.limelight_import.api.xml_dto.*` (`LimelightInput`, `Psm`,
  `ReportedPeptide`, `SearchProgram`, `ConversionProgram`, ...).
- The supported way to add a data source is a **standalone converter** that reads the
  native output and emits Limelight XML (like the existing `limelight-import-*`
  converters in the yeastrc GitHub org). Converters do **not** touch `limelight-core`
  or the DB schema.
- The DB already records provenance generically: `conversion_program_tbl`,
  `search_programs_per_search_tbl`.

**Key consequence:** the database schema is the *small* part of any quant feature.
The real work spans: the external XML API → the importer → schema → the front end.

---

## 2. Two kinds of "quant," with very different fit

### 2a. Per-entity scalar values — fit the existing model 1:1
One value per protein/peptide/site (q-value, Andromeda score, # peptides, sequence
coverage %, PEP, localization probability, total intensity, `Reverse`/`Potential
contaminant` flags). These map directly onto the existing generic annotation system:

- `annotation_type_tbl` (line ~679 in `database_scripts/install/001_create_empty_database.sql`)
  defines named attributes scoped by:
  - `psm_peptide_protein_type ENUM('psm','peptide','matched_protein','modification_position','psm_peptide_position')`
  - `filterable_descriptive_type ENUM('filterable','descriptive')`
  - **program-declared** via `search_programs_per_search_id` + `name` (NOT hardcoded —
    e.g. nothing says "Comet xcorr"; each converter declares its own columns).
- Value tables: `psm_filterable_annotation_tbl` / `psm_descriptive_annotation_tbl`,
  `srch__rep_pept_filterable/descriptive_annotation_tbl`,
  `srch__protein_filterable/descriptive_annotation_tbl`. Each row keyed by
  **(entity_id, annotation_type_id) → single value**.

These confidence/quality values are essentially **free**: declare them as filterable
annotations and the existing `peptide_page` / `protein_page` filtering "just works."

### 2b. Abundance values — need a new dimension
`Intensity`, `LFQ intensity`, `iBAQ`, reporter intensities, ratios. These are a
**matrix**: value per (entity) × **(sample / run / channel / condition)**. Limelight
has **no first-class sample/condition dimension**. The closest existing thing,
`psm_reporter_ion_mass_tbl` (line ~2075), stores only *which reporter masses are
present* — **not intensity per channel**. That's a strong signal Limelight is today an
ID browser, not a quant store.

---

## 3. Do NOT depend on the experiment pages

Front-end page families (`limelight_webapp/front_end/src/js/page_js/data_pages/`):
- Single-search: `project_search_ids_driven_pages/` → `peptide_page`, `protein_page`,
  `mod_view_page`, `qc_page`.
- Cross-search: `experiment_driven_data_pages/` → `peptide_exp__page`,
  `protein_exp__page`, `mod_exp__page`.

The experiment pages have **fallen behind in development**, and they're also the *wrong
shape*: a Limelight `experiment` = many *separate* searches stitched together.

**Key realization:** a MaxQuant result (and DIA-NN, FragPipe/IonQuant, Spectronaut) is
**one analysis that already contains all samples** — a single `proteinGroups.txt` with
every sample as a column. So the multi-sample dimension is **internal to one import**,
not spread across searches.

➡ Model "sample/channel/condition" as a **child dimension of a single search**, and
build a **new single-search quant page** that owns the abundance matrix. This avoids
the cross-search experiment machinery entirely.

---

## 4. Making it generic across quant programs

Reuse the pattern Limelight already uses for IDs: **the program declares its own
types** in the XML; the core renders whatever shows up. Extend with three declaration
blocks in the Limelight XML, symmetric with how annotation types are declared today:

1. **Sample/condition declarations** — list of samples (run / replicate / TMT channel /
   fraction), with optional condition + replicate grouping. (The missing dimension.)
2. **Quant-metric-type declarations** — named metrics (`LFQ intensity`, `raw
   intensity`, `iBAQ`, `normalized abundance`, `ratio`, `spectral count`), each
   declaring entity level (protein-group / peptide / PSM), **filterable metadata** (same
   `filter_direction` / default-threshold info `annotation_type_filterable_tbl` carries),
   and which **aggregate filter operators** it supports.
3. **Quant values** — `(entity, sample, metric_type) → value`, with an optional status
   (see §5).

A converter for any program reduces to these three blocks → generic by construction.
Per-program messiness stays in the converter.

### Proposed tables (sketch; DDL is the easy part)
| New table | Parallels | Purpose |
|---|---|---|
| `quant_sample_tbl` (or extend `experiment_tbl`) | — (missing piece) | sample / run / channel / condition dimension, internal to one search |
| `quant_value_type_tbl` | `annotation_type_tbl` | names metric, level, filterable + which aggregate operators |
| `psm_quant_value_tbl` (psm_id, sample_id, type_id, value, status) | `psm_*_annotation_tbl` | per-PSM quant |
| `srch_rep_pept_quant_value_tbl` (search_id, reported_peptide_id, sample_id, type_id, value, status) | `srch__rep_pept_*_annotation_tbl` | per-peptide quant |
| `srch_protein_group_quant_value_tbl` (srch_protein_group_id, sample_id, type_id, value, status) | `srch__protein_*_annotation_tbl` | per-protein-group quant — MaxQuant's primary unit; ties to `srch_protein_group_tbl` |

---

## 5. Missing / imputed values

**Limelight must REPRESENT missingness, but must NOT DECIDE it (never imputes).**

- The long-running Skyline debate is an **analysis-time** argument (treat missing as 0?
  below-LOD? impute from a distribution?) — it's contentious because Skyline *computes*
  the downstream result. Limelight is **downstream of that decision**, the same way it
  ingests engine q-values rather than computing FDR. So it never imputes, normalizes,
  or re-runs statistics. Doing so would make it an analysis platform, which it is not.
- **What Limelight must code for (representation/display only):**
  1. **Three distinct states**, never collapsed: `measured` / `imputed` / `missing`.
     Storing all as `0` is the trap (MaxQuant writes `0` for unquantified entries in
     `proteinGroups.txt`) — it silently breaks sorting, heatmap color scales, and
     "present in ≥ N samples" filters. Represent `missing` as **no value**, not `0`.
  2. **Gap-aware row rendering.** Unlike ID pages (row passes a filter or not), a
     protein is present in some samples and missing in others — the page must render
     the row *with gaps* (greyed/empty for missing, a marker for imputed). This is the
     concrete way quant breaks the ID pages' "filter-then-show" contract.
  3. **Filter on measured-only counts** ("valid values ≥ 3 per condition") — depends
     entirely on the measured/missing distinction.
- **Genericity:** the per-program **converter** maps each tool's conventions (MaxQuant
  `0`/blank, Perseus imputed values, Skyline truncated-peak handling) into Limelight's
  tiny 3-state vocabulary. Core has no opinion. Optionally carry a *reason* string
  (e.g. "not detected" vs "match-between-runs failed") as optional descriptive metadata
  shown on hover, never reasoned about.

---

## 5b. Workflow: map MaxQuant abundance back to an existing Comet search (OPEN)

Likely target workflow (per user, ~2026-06-23): import a **Comet** search + scan file
into Limelight first, then run **MaxQuant** on the same scan data, then import the
MaxQuant **abundance** and map it back onto the Comet search. Likely **DDA**, not DIA
(unconfirmed). This reframes quant as an *overlay/linkage onto an existing ID search*,
not a standalone import — and it is the **hardest** part of the design, harder than the
schema.

**DDA vs DIA matters:** DDA gives discrete MS2 scans → PSMs, so `scan number + scan
file` is a real join key for PSM-level mapping. DIA breaks this (no clean 1:1
precursor→scan PSMs; fragment-level extraction; MaxDIA is a different path). A DDA
assumption is what makes "map back" tractable; a DIA requirement would invalidate
PSM-level mapping.

**Why "map back" is a fuzzy cross-program join, not a 1:1 overlay:** MaxQuant runs its
own Andromeda search — it does *not* quantify Comet's IDs; it re-searches the same scan
data and produces its own IDs + abundance. So the two result sets only partially
overlap. Three populations result:
- MaxQuant entity ↔ Comet entity match → overlay abundance.
- MaxQuant quantified, Comet didn't ID → **orphan** (drop? show separately?).
- Comet ID, no MaxQuant quant → **gap** (missing-value problem, now *across programs*).

**Join keys by level:**
- Reported peptide (sequence + mods) — fairly robust.
- PSM (scan # + scan file) — robust *if DDA and same scan files*.
- Protein group — **messy**: MaxQuant's own grouping vs Limelight's inference from
  Comet won't line up, yet protein-group abundance is MaxQuant's headline output.

**Open tension — multi-sample matrix vs single-search overlay:** the abundance matrix
is inherently multi-sample (the value), but "map back to *the* Comet search" implies
attaching to one search. A Comet search is usually one run; a MaxQuant analysis spans
many runs. Resolve:
- **N Comet searches** (one per run), quant mapped per-run → matrix lives *across*
  searches (drifts back toward experiment-level territory, which we wanted to avoid); or
- **One Comet search with N scan files**, MaxQuant treating each scan file as a sample →
  keeps it single-search, matrix internal. Cleaner — *but is that how users import?*

**Open fork — how quant attaches:**
- **Fork A — Overlay:** augment the existing Comet search's rows with abundance. One
  unified view; but fuzzy mapping, dropped orphans, protein-group mismatch, two programs
  mixed in one search record.
- **Fork B — Companion search:** import MaxQuant as its *own* search (own IDs + quant)
  plus a link to the Comet search for navigation/comparison. Clean provenance, no data
  loss; but needs cross-search linkage UI.

These are "decide with people" questions — recorded as open, not resolved.

## 6. Scope summary

| Concern | In `limelight-core`? | Effort |
|---|---|---|
| Confidence/quality scalar filtering | reuse existing annotation model | low / free |
| Single-run scalar abundance as a column | existing peptide/protein pages | low |
| Abundance matrix model (samples + metric-types + sparse values) | new schema + XML API + importer | high |
| New single-search quant page + viz (heatmap, volcano, profile, box) | net-new front end | highest |
| Aggregate filter operators (per-sample threshold, presence-count, fold-change) | generic opt-in per metric | medium |
| measured/imputed/missing state + gap rendering | required, contained | medium |
| Deciding imputation / normalization / stats | **NO — out of scope** | n/a |

**Build vs. buy:** extending Limelight beats greenfield — you inherit auth, projects,
sharing/permissions, the import queue + daemon, protein inference, scan-file handling,
FASTA stats, and the deploy story. But "what tables" undersells it: the schema is small;
the XML API, importer, and especially the **front-end quant views** are the bulk.

### Suggested sequencing
The **abundance matrix is the deliverable** — IDs are already covered by Comet et al.,
so the scalar/annotation reuse is not a goal in itself.
1. *(Optional, only if it de-risks plumbing)* Per-entity scalar quant via the existing
   annotation system. Cheap, but low value on its own given IDs are already served —
   justified mainly as a way to shake out the XML/converter/importer path before the
   hard part.
2. **The real work — the abundance matrix:** new XML declaration blocks, quant tables
   (samples as a dimension *internal to one search*), a new single-search quant page
   with real quant visualizations (heatmap, volcano, profile, box), and
   measured/imputed/missing handling. Do **not** build it on the experiment pages.

### Next concrete step (not yet done)
Sketch the XML declaration blocks (sample list + metric-type + value/status elements)
modeled on how `limelight-import-api` declares annotation types, then pressure-test that
the generic model covers MaxQuant **and** a second program (e.g. DIA-NN) before writing
any schema.
