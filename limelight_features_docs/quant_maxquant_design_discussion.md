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

## 0. Central tension to settle FIRST: per-search quant vs. quant for a *set* of searches

> This is the highest-leverage product/architecture decision in the whole effort, and it
> needs to be settled with the boss before schema/UI work. It governs whether quant fits
> the existing Limelight framework or forces a new framework concept. (Detailed mechanics
> in §5c; surfaced here because everything downstream depends on it.)

> **DECISION (2026-06-29, boss): Model A — per-search quant. Model B is NOT pursued.**
> Quant is computed **per search** (one FlashLFQ run per search over that search's own scan
> files). Limelight makes **no cross-search comparability assumption**: two arbitrary searches
> aren't guaranteed to be replicates / the same conditions / comparable instruments, so
> cross-search MBR, RT-alignment, and normalization cannot be assumed valid. Within a single
> search spanning N scan files, those files ARE co-quantified in one run (that's one analysis
> the user deliberately set up). The tension below is resolved in favor of Model A.
> Implementation status + the per-search TODO in §5d.

**Model A — per-search quant (the intended model).** Quant results are stored **against a
single Limelight search** and displayed **when that search is viewed**, reusing the same
PSM/peptide filtering the search already has. This is what the boss has in mind, and it
**fits the existing Limelight framework cleanly** — a search is already a first-class,
viewable, shareable entity with filtering. It is also **valid** wherever the samples live
*within one search*: a search that spans N scan files (supported, though uncommon — see
§5c) is quantified by a **single FlashLFQ run** over those N files, giving a coherent
multi-sample matrix that legitimately belongs to that one search. The common
single-scan-file search yields a one-sample (N=1) matrix.

**Model B — quant for a set of searches (the friction).** A valid multi-sample comparison
across samples that live in **different** Limelight searches requires co-quantifying them
in **one** FlashLFQ run (shared RT alignment / match-between-runs / normalization — see
§5c). The resulting matrix therefore belongs to a **set of searches** and is only
meaningful when that exact set is viewed **together**. **Limelight has no such entity
today** — there is no "store this result against a group of searches and show it only when
that group is displayed" concept. (The `experiment` machinery is the nearest thing and is
both behind in development and the wrong shape — see §3.) This is net-new framework, not a
schema tweak.

**Why you can't dodge B with A:** you cannot get a valid cross-search comparison by storing
per-search quant (Model A) and stitching the results together afterward — independent
FlashLFQ runs have independent normalization and no shared MBR, so their intensities are
not comparable (§5c). Cross-search comparison *requires* a joint run, which *requires*
Model B's set-owned result. So "multi-sample view across searches" and "per-search storage"
are genuinely in tension; they are not two renderings of the same stored data.

**Recommended sequencing (to propose):** build **Model A first** — it satisfies the
common case, the within-search multi-scan-file case, fits the framework, and is fully
valid. Treat **Model B as a separate, later phase** that introduces a new "search-set quant"
concept, and decide with the boss whether it's in scope at all, since it leaves the
existing single-search display model.

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

## 5c. FlashLFQ pipeline-service approach (2026-06-26)

A concrete, **in-Limelight** path that largely dissolves §5b's hardest problem. Instead
of importing a foreign MaxQuant analysis and doing a fuzzy cross-program join, run an
**ID-driven label-free quant** tool over the scans for an *existing* Limelight search,
feeding it that search's own PSMs.

**Tool: FlashLFQ** (smith-chem-wisc) — chosen because it fits every constraint:
- Free and genuinely **open source (MIT)**; runs **headless on Linux in Docker**.
- **MS1 label-free quant** (the confirmed target metric), driven by **externally
  supplied PSMs** — it does **NOT** run its own search. Inputs: a **TSV of MS/MS
  identifications** (natively reads MaxQuant / MetaMorpheus / Morpheus / PeptideShaker
  layouts) + spectral files. Spectral input on Linux is effectively **`.mzML`** (`.raw`
  reading is Windows-leaning; it does **not** ingest `.ms1`/`.ms2`).

**Why this sidesteps the §5b fuzzy join:** because FlashLFQ quantifies *the IDs you give
it* rather than re-searching (no Andromeda re-search), there is no orphan/gap divergence
between "the search's IDs" and "the quant tool's IDs." The mapping back onto the existing
search is **exact, not fuzzy**. The §5b orphan/gap/protein-group-mismatch problem was an
artifact of MaxQuant re-searching; it disappears under an ID-driven quant tool.

**Driver = third sibling of the existing yeastrc pipeline services.** Two coworker repos
are the templates:
- `limelight-pipeline-feature-detection-service` — Python, Docker/docker-compose,
  `start_service.py`. **Receives** a request, **pulls scan data from spectr** in batches
  (`getScanDataFromScanNumbers_JSON` / `getScanNumbers_JSON`), writes a scan file, runs
  an external tool (Hardklor/Bullseye), writes results to a mounted workdir.
- `limelight-export-blib-service` — same scaffolding; the relevant half is that it
  **receives the PSMs from Limelight in the request payload** (it does NOT reach back
  into Limelight's DB) and fetches matching scans from spectr.

So the quant-service flow is:

```
Limelight ──(PSMs in request)──► quant-service ──(scan #s)──► spectr (stores all levels)
                                       │
                                       ├─ write mzML incl. MS1 scans  (via a writer lib, e.g. psims)
                                       ├─ transform PSMs → FlashLFQ identifications TSV
                                       ├─ run FlashLFQ
                                       └─ parse FlashLFQ TSV abundance output ──► import onto the existing search
```

**Scan-file format is a solved detail.** spectr ingests mzML/mzXML and stores **every
scan level**, so the MS1 survey scans needed for MS1 LFQ are available. The service
reconstructs mzML (with MS1) from spectr's JSON via a writer library (`psims` for Python)
— format choice is encapsulated, not hand-rolled.

**Output granularity — confirmed: PEPTIDE and PROTEIN abundance, not PSM.** FlashLFQ
integrates the **MS1 precursor peak**, so even though **PSMs go in**, what comes **out**
is intensity at **peptide level and protein level**, one column **per spectra file =
per sample** (with match-between-runs flags). It does not emit per-PSM abundance. So the
abundance attaches at **(peptide × sample)** and **(protein-group × sample)** — mapping
cleanly onto the §4 `srch_rep_pept_quant_value_tbl` and `srch_protein_group_quant_value_tbl`
tables; the per-PSM `psm_quant_value_tbl` is **not** populated by this path.

**Import path — NOT Limelight XML.** The results are imported **another way** that
associates abundance with the **existing search** the PSMs came from (this is §5b
**Fork A — Overlay**, but now *exact* rather than fuzzy). Implication: a **new ingest
webservice** in `limelight-core`, parallel to the XML importer, that attaches
peptide/protein abundance to an existing `projectSearchId`. The §4 schema work still
applies — in particular the **sample dimension is still net-new** (FlashLFQ inherently
yields a peptide × sample *matrix*, even overlaid on one single-result search).

**RESOLVED — the §5b multi-sample-vs-single-search tension goes away (2026-06-26).** A
Limelight search **can already span multiple scan files**: a user runs Comet on N scan
files, then runs **Percolator once across all N** Comet results (so FDR/q-value is
computed jointly), and the whole thing imports as **one search**. This is a **supported
and used import shape — though not the common case** (most searches are single-scan-file).
So "one search with N scan files" is not a hypothetical model we'd impose; the import path
already exists. This maps 1:1 onto FlashLFQ, whose output is **per spectra file**: each of the
search's N scan files → one reconstructed mzML → one FlashLFQ spectra file → **one
sample**. The abundance matrix therefore lives **internal to the single search**, exactly
as §3/§4 wanted, with **scan file = sample** as the new dimension (scan file + scan number
already exist on PSMs today; "sample" just elevates scan-file to a first-class axis). The
§5b "N Comet searches, matrix across searches" branch is unnecessary.

Corollary: a **single-scan-file search** (the common case) yields a **one-sample matrix**
— abundance with N=1. Still meaningful (single-run intensities), but the multi-sample
quant visualizations (heatmap, volcano, profile) only have data to show when a search has
multiple scan files. Whether the one-sample case is a first-class target or a degenerate
one is not yet decided.

### How FlashLFQ handles multiple files, and the cross-search validity question

**FlashLFQ is multi-file in a single run** (verified against its CLI wiki, 2026-06-26):
`--idt` takes one identifications TSV, `--rep` takes a **directory of spectra files**, and
**match-between-runs runs across all of them by default** (`--mbr true`). Output has **one
intensity column per file = per sample**. So one FlashLFQ run *is* the multi-sample run —
there is no per-file/per-run-then-merge step. (Earlier assumption that FlashLFQ runs on a
single scan file per run was wrong.)

**This resolves the "is quant valid across searches?" question.** Label-free MS1
intensities are only directly comparable when the samples are quantified **together in one
run** — shared RT alignment, shared MBR, one normalization. Therefore:
- The valid way to get a **multi-search, multi-sample view** is to run FlashLFQ **once over
  the union of those searches' scan files** (union of their PSMs in one `--idt` TSV) → one
  coherent matrix. Validity comes from co-quantifying in a single run.
- **Stitching together per-search abundances computed in separate FlashLFQ runs is invalid**
  (independent normalization, no shared MBR/RT alignment) — and now unnecessary, since one
  run handles N files natively.

Implication for "pull quant for multiple searches" (anticipated user request): it is NOT an
aggregation of stored per-search results; it is a **new joint quant computation** whose
inputs are PSMs + scan files gathered from multiple searches. That differs from §3's
cross-search experiment stitching, and reopens the §5b question of which Limelight entity
(a single search vs. some new multi-search grouping) the resulting cross-search matrix
attaches to. **This IS the §0 Model-A-vs-Model-B decision** — a cross-search matrix is
"Model B" (set-owned result, not in today's framework). See §0; the boss's expectation is
Model A (per-search storage, shown when that search is viewed). Recorded as open, to settle
with the boss.

## 5d. Implementation status + per-search decision (2026-06-29)

> Companion docs (technical, boss-facing):
> - **`flashlfq_summary_and_comparison.md`** — how FlashLFQ works (indexed-XIC apex quant,
>   isotope/charge defaults, MBR/normalization scoped to within-search), technical caveats, the org +
>   peer-reviewed papers, and a comparison vs MaxQuant/MaxLFQ, IonQuant, directLFQ, DIA-NN, Skyline,
>   OpenMS, Proteome Discoverer.
> - **`flashlfq_output_to_limelight_mapping.md`** — mapping FlashLFQ output back to Limelight
>   (esp. modifications): why to ingest `QuantifiedPeaks` (feature-level, dedupe done) rather than
>   `QuantifiedPeptides` (which zeroes ~93% of open-mod signal), attribution like PSM counts, what
>   stats are/aren't lost, and the no-open-mod case.

The FlashLFQ pipeline-service approach (§5c) was **built and validated end-to-end**:
Run-FlashLFQ button → webapp REST controller → Python service → spectr → mzML → FlashLFQ →
peptide- and protein-level abundance. Tested: single search (1 scan file), single search with
N scan files, multiple searches, the (now-removed) collision case, and non-standard-residue
resilience.

**New repo:** `limelight-flashlfq-service` (sibling of `limelight-export-blib-service`).
Python/Docker; image based on the official `smithchemwisc/flashlfq` (Alpine + .NET 8, FlashLFQ
at `/flashlfq`, CLI `dotnet /flashlfq/CMD.dll`) + apk python3 + a venv (numpy/lxml/psims install
from musllinux wheels). Compose drop-in like blib/feature-detection: internal network, **no auth,
no exposed port**; listens on `WEBAPP_PORT` (3434). Dev run wired with `--network host` to reach
host-Tomcat spectr at `localhost:8080`.

**Webapp side** (`FlashLFQ_Run__Request_Creation_RestWebserviceController`, new config key
`run_flashlfq_service_web_service_base_url`, REST path `…/flashlfq-run--request-creation`, the
`RunFlashLFQ` button in `searchDetailsAndFilterBlock_MainPage_Root.tsx`): request carries ONLY
`{ projectSearchIds, searchDataLookupParamsRoot }`; the server derives reported peptides + PSMs
from the **PSM/Peptide cutoffs only**. Protein accessions populated via reportedPeptideId →
protein sequence version ids → protein names.

**Sample identity = `scan_file_tbl.id`** (the only unique/stable handle; a filename can differ
per search). Sample/mzML named `scanfile_id_<id>`; FlashLFQ output columns are
`Intensity_scanfile_id_<id>` (an `ExperimentalDesign.tsv` drives the protein-column names) — so
the output parses **directly back to the Limelight DB**. (FlashLFQ output is machine-parsed for
DB ingest, not human-facing.) The manifest records `scan_file_id → file_name`.

**BOSS DECISION (per §0): quant per-search; Model B (cross-search joint run) not pursued.**
Consequences applied 2026-06-29:
- The "same scan file in multiple searches" **collision guard was REMOVED** (moot under
  per-search runs).
- The **Run-FlashLFQ button is hidden for >1 selected search** (interim) so the still-joint code
  path isn't reachable from the UI.

**TODO #1 — the per-search refactor (not yet done):** the controller still builds **one joint
run over all selected searches' scan files**. Change to **one FlashLFQ run PER SEARCH** (over
that search's own scan files); when >1 search is selected, produce N independent per-search runs.
Then re-enable the multi-search button. Until then, multi-search is intentionally UI-gated off.

**Implementation gotchas worth remembering** (so they aren't rediscovered):
- spectr request/response field names taken from the spectr connector-library DTOs; peaks come
  back by default; per-scan `level`, `scanNumber`, `retentionTime`, `isCentroid`, `parentScanNumber`,
  `precursor_M_Over_Z`, `precursorCharge`, `peaks:[{mz,intensity}]`.
- RT: spectr stores **seconds** (config knob `SPECTR_RT_IN_MINUTES`, default false); converted to
  minutes for the FlashLFQ TSV; written to mzML in seconds-as-minutes consistently.
- FlashLFQ's mzML reader (mzLib) NREs unless the mzML has a `sourceFile`, a `<scanList>` scan-start-time,
  AND `software`/`instrumentConfiguration`/`dataProcessing` sections — all are written via `psims`.
- `SPECTR_BATCH_SIZE` must be ≤ spectr's max-scans-per-request (was 147; set 100) or scans are
  truncated; a `getMaxScanCountToReturn` webservice exists to query it (deferred).
- **Non-standard-residue PSMs — DROP rule (decided 2026-06-29).** A PSM is quantified only if every
  residue has a **single, explainable monoisotopic mass**. Kept: the 20 standard AAs **+ U** (Sec)
  **+ O** (Pyl) **+ J** (Leu/Ile — isobaric, so 113.08406 is unambiguous). Dropped: the
  ambiguity/placeholder codes with **no single defined mass** — `X` (any), `B` (Asn/Asp), `Z`
  (Gln/Glu), `*` (stop). Dropped PSMs are counted + listed in the manifest
  (`dropped_psms_non_standard_residue`); one bad PSM never aborts the run.
  - The criterion is **explainability** ("can we state the mass used?"), not rarity — that's why U/O/J
    (defined mass) are kept and X/B/Z/* (undefined) are dropped.
  - Investigated + REJECTED: keeping `X` PSMs by setting X=0 *when* the X=0 theoretical mass matched
    the precursor within ±10 ppm (+ isotope). On real crosslink data X=0 *did* match the precursor
    (X is a zero-mass placeholder there; the crosslinker mass is in the modification). But the boss
    rejected the **silent/conditional** decision: results are machine-parsed (no one reads logs), and
    "keep some X, drop others by a tolerance" is hard to explain to a user. So: flat unconditional
    drop of all undefined-mass residues. (Watch item: U/O/J now reach FlashLFQ's Base Sequence as
    non-standard letters — unverified whether FlashLFQ tolerates them, since such peptides are rare.)

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
