# Quant Batch Correction (ComBat) — design decisions & grounding (2026-09-27)

Phase C of the FlashLFQ-service redesign. Adds optional **ComBat batch correction** to a quant run:
the user picks one uploaded-metadata column as the batch label; the service ComBat-corrects the
**log2 (median-)normalized** matrix and serves batch-corrected result files; the Quant Common charts
gain a **Batch-corrected** state on the existing Raw/Normalized toggle.

This doc records the decisions the maintainer locked and the source facts they rest on, so the build
work (split across the limelight-core webapp and the limelight-flashlfq-service microservice) can
proceed from a written contract. Everything below marked `verified:` was checked against source at the
cited `file:line`; anything else is flagged `assumption`.

Related docs: `quant_common_pages__flashlfq_charts__investigation_and_implementation_plan_2026-09-23.md`
(the Raw/Normalized charts toggle this extends), `quant_common_single_fetch_retrieval_refactor_plan_2026-09-26.md`
(the per-ssfid single-fetch retrieval pattern the batch-corrected file retrieval will reuse).

---

## Build ordering (decided): submit-side FIRST

Order = **(1) limelight-core submit side → (2) flashlfq-service ComBat compute → (3) limelight-core
retrieval + charts**.

Rationale (the maintainer's): building the submit side first means the service can be built and tested
against an **actual** request that Limelight emits (carrying the new fields), rather than a
hand-fabricated payload — this validates the interface contract with real traffic and eliminates
field-name/shape drift between the two sides. Between (1) and (2) we capture the real request payload as
the service's Docker test fixture.

Safe because the service **tolerates unknown request fields** (see grounding #3): an interim real submit
carrying the new fields, before the service processes them, is accepted-and-ignored — the run just
completes without batch correction (non-fatal, same as normalize). It does not fail.

---

## Key grounding that reshaped the design: the metadata is ALREADY plumbed end-to-end

The initial premise ("we don't pass the metadata to the server yet") is **not** the current state. The
full uploaded metadata is already sent, persisted, and displayed:

1. **FE already sends the full parsed metadata, keyed by ssfid.** At submit, `quant_metadata =
   { metadataHeaders, records[] }` is built and POSTed; each record carries `{ projectSearchId,
   searchScanFileId, searchId, scanFileName, userScanFilename, metadataCells, hasPsms }` — *all* columns,
   file column-order preserved, keyed by `searchScanFileId`.
   - `verified:` FE build — `.../project_page_quant_section/projPg_Quant_SubmitRun_Component.tsx:778-789`
     (builds `quantMetadata` from `inMemoryStore.metadataHeaders` + `mappedRecords`).
   - `verified:` FE request — `.../project_page_quant_section/projPg_Quant_Submit_JointFlashLFQ_Run_ToServer.ts:66,161-165`
     (`metadataHeaders`, `quant_metadata` in `requestObject`; POST to `quant-add-new--submit-joint-flashlfq-run`).
   - `verified:` Java DTO — `services/FlashLFQ_Run_GatherPsms_And_SendRequest_Service.java:964`
     (`Request_To_FlashLFQ_Service_QuantMetadata` = `version, metadataHeaders, records`), record at `:980`
     (`searchScanFileId` = "the partition key"), per-request partition by ssfid at `:651-688`.
   - `verified:` `metadataHeaders` = `headers.slice(1)` (col 0 = scan-filename key, dropped);
     `metadataCells` = `cells.slice(1)`, aligned 1:1 — `projPg_Quant_UploadParse_BuildInMemoryStore.ts:78,97`.
     Column order preserved throughout; duplicate/blank headers survive (parser uses `header:false`, header =
     `rows[0]`) — `projPg_Quant_UploadParse_ParseFileToRecords.ts:57-61,156,172`.

2. **FE already has the metadata-row → search_scan_file_id mapping at submit time** (resolved by
   filename-matching against eligible scan files; there is **no** ssfid column in the file — col 0 is the
   scan filename).
   - `verified:` `projPg_Quant_UploadParse_ValidateAndMapRecords.ts:196-227` (filename→candidate cascade),
     `:316-317` (`userScanFilename` = `cells[0]`); resolved per-record ssfid at
     `projPg_Quant_SubmitRun_Component.tsx:723-803`.

3. **The service already persists the metadata and tolerates extra fields.**
   - `verified:` raw body → `request_body.json`, and `quant_metadata` (opaque `Any`) → `quant_metadata.json`,
     both written to the run dir before FlashLFQ work — `app/request_processor.py:51-54,117-119`;
     `quant_metadata: Any = None` — `app/request_models.py:136`.
   - `verified:` request parsing pulls every field by explicit `.get()`, **no unknown-key rejection**
     anywhere — `app/request_models.py:143-168` (+ nested parsers). Only rejects: non-dict body, empty
     `spectral_data`, missing/invalid `run_mode`. So new fields are accepted-and-ignored until wired, and
     the raw field still lands in `request_body.json` verbatim.

4. **The per-sample metadata is already DISPLAYED** on the run-info panel (so no new metadata table is needed).
   - `verified:` `.../data_pages/quant/quantRunInfoPanel_Component.tsx` renders a "Sample metadata" table,
     one row per `searchScanFileId` × `metadataHeaders` (`_renderPart1_MetadataTable` ~`:178,194-229`);
     loader `.../quant/quantRunInfo_LoadFromServer.ts:74` → `quant-add-new--flashlfq-quant-metadata`.

**Consequence:** ComBat needs the FE to send only *which column* is the batch column (plus the on/off
flag). The service builds the batch-label vector itself by indexing the metadata it already holds. No new
metadata-passing or metadata-display work is required.

---

## Locked decisions (maintainer-confirmed 2026-09-27)

1. **Column identifier = `batch_column_index`** (integer index into `metadataHeaders` / each record's
   `metadataCells` — both are the already-`slice(1)` arrays, aligned). Index, **not** header name, because
   the parser deliberately preserves duplicate/blank headers, so names are not unique
   (`verified:` `projPg_Quant_UploadParse_ParseFileToRecords.ts:57-61`). The service echoes the resolved
   column *name* into its status file for display/debug.

2. **Skip semantics = non-fatal.** ComBat runs on the **log2 normalized** matrix, so it depends on the
   normalize step having succeeded; and pycombat needs **≥2 distinct batches and ≥2 samples per batch**.
   When any of those isn't met, write a `FAILED` status with a reason, produce no corrected files, and
   the charts simply don't offer the Batch-corrected state. Same non-fatal philosophy as normalize.
   - `verified:` the ≥2/≥2 requirement is enforced in the ComBat core — `loaders/batch_correct.py:196-205`.
   - `verified:` log-scale required — `loaders/batch_correct.py:116-124` (`_require_log_scale`).

3. **Blank / missing value in the chosen column = non-fatal `FAILED` with reason, no correction.**
   Do NOT exclude-via-mask. Rationale: masking emits a matrix mixing corrected and uncorrected sample
   columns with nothing in the file distinguishing them — the charts would silently plot both together.
   This matches the template's fail-loud stance.
   - `verified:` the template **fails loud** on missing batch labels rather than silent-dropping —
     `loaders/batch_correct.py:127-140` (`_require_no_na`), called from `_batch_vector` (`:160`). Docstring:
     a missing label "corrupts the verdict quietly, which is the worst failure mode for a safety check."
   - `verified:` the `sample_mask` hook exists but masked-out rows **pass through UNCORRECTED** and
     "never compare them against corrected rows" — `loaders/batch_correct.py:239,255-256,278-288`.
   - **IMPORTANT subtlety the entry script must handle:** `_require_no_na` guards `NaN` only
     (`series.isna()`), but blank TSV cells arrive as empty strings `""`, and `"".isna()` is `False`
     (`verified:` `loaders/batch_correct.py:134,161`). A blank cell would otherwise become its own phantom
     batch level `""`. So the **entry script must explicitly treat `""` (and whitespace-only) as missing**
     and trigger the fail-loud path — the template will not catch it.

4. **Display scope = charts only, plus status.** Add a **Batch-corrected** state to the existing charts
   Raw/Normalized toggle, a batch-correct status banner (mirroring the normalize banner), and optionally
   mark which column was chosen as the batch column. **No** new per-sample metadata table (it already
   exists — grounding #4).

---

## Interface contract additions (request → service)

New fields on the submit request (placement: **root-level**, alongside `run_mode` — NOT inside
`flashlfq_parameters`, which maps to FlashLFQ CLI flags; batch correction is a Limelight post-process,
not a CLI option). `assumption` on exact placement — build side to confirm/finalize, but keep it out of
`flashlfq_parameters`.

- `create_batch_correction: boolean`
- `batch_column_index: int` — index into the run-wide `metadataHeaders` (= `metadataCells` index).

Note: the FlashLFQ CLI `normalize` flag is a *different* thing and is force-set FALSE at the controller
(`verified:` `Quant_AddNew_Submit_JointFlashLFQ_Run_RestWebserviceController.java:604-605`); the Phase B
normalize post-process is not gated by any request flag and runs unconditionally on SUCCESS
(`verified:` `app/request_processor.py:164-165,251-252`). Batch correction differs: it **is** gated by
`create_batch_correction`.

---

## Remaining work (mirrors the normalize post-process pattern)

**(1) limelight-core submit side** — a checkbox (`create_batch_correction`) + a dropdown of
`metadataHeaders` in file order (→ `batch_column_index`); thread both through the FE request
(`projPg_Quant_Submit_JointFlashLFQ_Run_ToServer.ts` `requestObject`) → Java root DTO
(`Request_To_FlashLFQ_Service_Root`) → the service request. Run-options UI currently rendered via
`Quant_FlashLFQ_ParametersForm_Component` with `excludedFieldKeys={["mbr","normalize"]}`
(`verified:` `projPg_Quant_SubmitRun_Component.tsx:210-215,1207-1210`); `metadataHeaders` are available in
the submit component (`inMemoryStore.metadataHeaders`, used at `:779,918`).

**(2) flashlfq-service ComBat compute** — new top-level `batch_correction_entry.py` mirroring
`normalize_entry.py`: read the **log2 normalized** matrix + `quant_metadata.json`, build the batch vector
from `batch_column_index` aligned by `search_scan_file_id`, treat `""`/whitespace as missing (fail-loud),
run `loaders.batch_correct.combat_correct` (already installed in `/venv-quant`, `pycombat==0.20`), write
`Combined{Peptides,Proteins}.batch_corrected.{linear,log2}.tsv` + `batch_correct_status.json`; add a
`_run_batch_correct` launcher in `request_processor.py` gated on `create_batch_correction` and on
normalize success, invoked on SUCCESS (mirror `_run_normalize`, `verified:` `app/request_processor.py:387-411`);
add serving tokens to `_RESULT_FILES_ALLOWLIST` (mirror the normalize tokens, `verified:`
`app/web_listener.py:49-67`). Non-fatal throughout.

**(3) limelight-core retrieval + charts** — batch-correct status retrieval proxy + FE loader/validator
(mirror `Quant_FlashLFQ_NormalizeStatus_Retrieval_RestWebserviceController.java` +
`quantRunInfo_LoadFromServer.ts:122` `__LoadNormalizeStatus`); batch-corrected result-file retrieval
proxies (mirror the normalized-linear result controllers, reuse the C1/C2 per-ssfid single-fetch pattern);
add the **Batch-corrected** state to the charts Raw/Normalized toggle + status banner.

---

## Open items for the build prompts (not yet decided)

- Confounding assessment: `loaders/batch_correct.py:326` (`assess_batch_confounding`) exists and warns when
  batch is confounded with a covariate of interest. There is no separate "condition/covariate" column in
  the current quant metadata model beyond the batch column itself, so whether/how to surface confounding
  warnings is deferred — revisit when writing the service prompt.
- Exact root-vs-subobject shape of the two new request fields (see contract note) — finalize with the
  build side.

---

## Status / progress

**Part (1) submit side — DONE + review-verified 2026-09-27 (uncommitted).** Two root-level fields
`create_batch_correction` (boolean) + `batch_column_index` (Integer, null when disabled) thread FE UI →
FE request → controller → outgoing `Request_To_FlashLFQ_Service_Root` (alongside `run_mode`, NOT in
`flashlfq_parameters`). Verified end-to-end against the real request the service received:
`create_batch_correction`/`batch_column_index` land at root with correct wire keys/types, and
`metadataHeaders[batch_column_index]` resolves to the selected column, per-sample `metadataCells` aligned
by ssfid. Confirmed by reading the captured on-disk `request_body.json` (both enabled and disabled runs).
The decision to relay the index opaquely (no controller-side range validation; service is the authoritative
fail-loud validator) was reviewed and kept — the FE dropdown makes the index valid-by-construction.

**Fixture gap for part (2) — the local test data cannot yet drive a real ComBat run.** The captured
enabled fixture has 1 metadata column and only 2 samples, each a distinct singleton batch value → it
satisfies the wire contract but fails ComBat's ≥2 batches × ≥2 samples requirement. Local projects cap
low (project 25 ≈ 2 eligible filenames; project 87 ≈ 3 single-file searches) — neither reaches ≥4
quantifiable scan files. So the service-phase LIVE ComBat run needs a richer run staged: ≥4 quantifiable
scan files with a metadata column assigning them to ≥2 batches of ≥2 samples each (repeated batch labels,
not unique-per-sample). The service COMPUTE can be built + Docker-tested against a synthesized ≥2×≥2
request in the meantime; the captured real fixture confirms only the contract, not the compute.

**Part (2) service-side ComBat compute — DONE + review-verified 2026-09-27 (uncommitted; deployed to the
local flashlfq container via `up -d`).** New `batch_correct_entry.py` (mirrors `normalize_entry.py`) runs
ComBat on the log2-normalized matrix, gated on `create_batch_correction`, non-fatal, after `_run_normalize`
at both JOINT/PER_FILE seams (`app/request_processor.py:168-169,259-260`; launcher `_run_batch_correct`
`:422`). Request fields parsed in `app/request_models.py:149-150,172-174`. Verified against source: log2
input, `scale="log2"`, ssfid-keyed batch vector row-aligned to the intensity columns, `""`/whitespace
treated as missing (the template's NaN guard misses these), linear = exact `2^y − 1` inverse with
un-clamped negatives counted, and all skip paths → non-fatal FAILED status. Detection columns are passed
through for BOTH sides (reviewed + endorsed: detection state is invariant under intensity correction;
re-deriving from a possibly-negative corrected value would wrongly flag NotDetected). `assess_batch_confounding`
correctly NOT wired (deferred). Docker self-tests (happy ≥2×≥2, every skip path, negative-count, launcher,
live HTTP serving) passed — the service claude's OBSERVED results, consistent with the verified code.

### PART 3 INTERFACE CONTRACT (pinned — the limelight-core retrieval + charts must match these exactly)

Serving tokens (via the flashlfq-service result endpoint, same mechanism as the normalized tokens):
- `combined-peptides-batch-corrected-linear` → `CombinedPeptides.batch_corrected.linear.tsv`
- `combined-peptides-batch-corrected-log2`   → `CombinedPeptides.batch_corrected.log2.tsv`
- `combined-proteins-batch-corrected-linear` → `CombinedProteins.batch_corrected.linear.tsv`
- `combined-proteins-batch-corrected-log2`   → `CombinedProteins.batch_corrected.log2.tsv`
- `batch-correct-status` → `batch_correct_status.json` (run-dir root; `application/json`)

A 404 on any of these is LEGITIMATE (batch correction not requested, or requested-but-skipped/FAILED) —
handle gracefully like the normalize tokens. `batch_correct_status.json` shape:
```
{ "status": "SUCCESS" | "FAILED",
  "reason": "<text>",
  "batch_column_index": <int|null>,
  "batch_column_name": "<metadataHeaders[index]>" | null,
  "peptides": { "n_features_in": <int>, "n_features_out": <int>, "n_samples": <int>, "n_batches": <int>,
                "batch_sample_counts": { "<label>": <int>, ... }, "negative_linear_count": <int>, "reason": "<text>" },
  "proteins": { <identical shape> } }
```
Both success and failure routes emit the identical per-side key set (no stray keys). The off-the-wire TS
type on the limelight side should declare these fields REQUIRED and validate at runtime (per the repo
convention), mirroring the normalize-status loader/validator.

**Part (3) retrieval + charts — DONE + review-verified 2026-09-27 (uncommitted; deployed).** Built:
`batch-correct-status` retrieval proxy + FE loader/validator (fields REQUIRED, runtime-validated); log2
batch-corrected result-file proxies for peptides+proteins (reuse the C1/C2 per-ssfid single-fetch) — the
**log2** files, not linear; a **Batch-corrected** state on the Quant Common charts' toggle (shown only when a
`batch_correct_status` exists; disabled+reason when FAILED; absent when not requested); the explanatory panel
(approved copy, dynamic values per side); CV histogram HIDDEN in batch-corrected mode with a note (CV is a
linear-scale metric, meaningless on log2-native corrected values) — IdDepth/Completeness stay; and the
"Run id(s)"→"Run id" submit-label nit.

**The log2-direct decision** is implemented via a `valuesAreAlreadyLog2` flag threaded through both prototype
data intensity extractors, both matrix types + builder, and the three log2-applying charts (Boxplot, MNAR,
DynamicRange) which skip the FE `Math.log2` and the `>0` drop for this mode (negatives preserved). Verified
against source (`quant_PrototypeData.ts:357`, `flashlfq_proteinQuant_PrototypeData.ts:218`,
`quantCharts_AbundanceMatrix.ts:148`, `AbundanceBoxplot:145`, `Mnar:94`, `DynamicRange:82-89`).

**Live UI test (fresh runs, project 90, review-verified):** WITH run `ddfe4fa0decf4d8f8d26fd25a0768846` —
Batch-corrected radio present, log2 retrieval 200, boxplot y-range ~15–33 (single-log2, cross-checked by the
reviewer against the on-disk `batch_corrected.log2` file: proteins 15.06–33.30/1792 cells EXACT match; peptide
max 33.36 exact), panel shows batch `batch` / 2 batches A:2,B:2 / 0 passed-through / 2191(pep) & 448(prot)
corrected, CV hidden+note, other charts render. WITHOUT run `4702d334ec3f4806ba7084edff0efccd` — no
Batch-corrected radio (no status file). "Run id" label code-verified.

### FEATURE COMPLETE
All three parts (submit + service ComBat + retrieval/charts) plus the passthrough-count addendum are DONE and
review-verified end-to-end on real data. Everything remains UNCOMMITTED (commit is a separate, deliberate step).

---

## DECISION (2026-09-28): the Raw / Normalized / Batch-corrected chart-mode toggle is CHARTS-ONLY — do NOT apply it to the peptide/protein data tables. Do not re-open.

Considered extending the chart-mode toggle so selecting Normalized or Batch-corrected would also swap the
per-sample values shown in the Quant Common peptide/protein DATA TABLES. **Decided against.** The tables
continue to show the RAW quant feed; the toggle affects only the charts (the current, verified state).

For the record, this was NOT rejected for difficulty — mechanically the swap is easy: all three feeds
(raw / normalized-linear / batch-corrected-log2) come from the same parser (`quant_PrototypeData.ts`
`_load_StatusThenResults`, differing only by URL) and return the identical `Quant_PrototypeData` keyed
`reportedPeptideId`/`proteinSequenceVersionId × searchScanFileId`, with the same accessors the table already
uses (`get_SummedQuantForDisplayForm`, `get_SummedQuantForProtein`, `get_ProteinIntensity`).

It was rejected on correctness + appropriateness grounds, chiefly for **Batch-corrected**:
- **The tables SUM across a row.** The peptide "Quant" column and the protein "Quant (Limelight)" rollup sum
  intensities across a display row's collapsed variable-mod groups (`get_SummedQuantForDisplayForm` sums the
  distinct-group intensities, `quant_PrototypeData.ts:251-307`). Batch-corrected values are **log2**, and
  summing log2 is invalid (`log2 a + log2 b ≠ log2(a+b)`) → a nonsense number for any multi-group row.
- **The table path assumes positive linear.** It gates rendering on `summedIntensity > 0` and has no
  "already-log2" awareness (unlike the charts feed `getPerFeature_PerSample_Intensities_ForCharts`, which
  takes `valuesAreAlreadyLog2`). So legitimate negative/zero log2 values would be dropped, and the protein
  "Quant (FlashLFQ)" column would format a negative log2 (e.g. `-3.20e+0`) as if it were a linear intensity.
- **Batch-corrected is QC/visualization, not the primary quantification** (per the explanatory panel + the
  ComBat guidance) — it does not belong in the primary data table.

Normalized alone (positive linear) WOULD swap cleanly, but for simplicity/consistency the whole toggle stays
charts-only. Note also that the table's per-cell markers ("(MBR)", "overlapping signal", "not quantifiable")
derive from per-record `detectionType`/`ambiguousZeroed` on the raw feed; it is unconfirmed whether the
normalized/batch retrieval payloads populate those, which would need checking before any table swap.

If ever revisited: batch-corrected would require a log2-aware aggregation path and should stay out of
primary-quant columns; only Raw↔Normalized (both linear) could safely drive the tables.

### Real-run integration test — DONE + review-verified 2026-09-27
Project 90, 4 single-file searches (2 WT: ssfid 669/670, 2 Mutant: ssfid 671/672), JOINT. Metadata file had
two columns `condition` (WT/Mutant) + `batch` (A/B), crossed so each batch = 1 WT + 1 Mutant (batch
orthogonal to biology — the correct, non-confounded structure). Two real submits:
- WITH batch correction on `batch` → request_id `13abed6432634bc5b34ce01a756cdfea`: `create_batch_correction:true`,
  `batch_column_index:1` correctly resolved to `batch_column_name:"batch"` (index 1 of `['condition','batch']`
  — proves the multi-column index path). `batch_correct_status.json` SUCCESS; peptides 2189 / proteins 448
  features; 4 samples, 2 batches {A:2,B:2}; negative_linear_count 0; all 4 batch-corrected files written.
- WITHOUT → request_id `9f2c8ba1d66647bd89e0bb1612dbe113`: `create_batch_correction:false`, no
  batch-corrected files, no status file. Both runs' done-markers SUCCESS.

Independent math verification (reviewer, on the real output): per-feature batch A-vs-B gap collapsed —
peptides mean|A−B| 0.4749 → 0.0349, proteins 0.3757 → 0.0230; every sampled cell changed (not a
pass-through). ComBat removed the technical batch difference while preserving WT/Mutant (crossed design).

A larger mriffle multi-scanfile dataset (with real subgroups) remains available on the server for a
richer future run; its batch column should be the real technical grouping (prep day / instrument / run),
determined from that dataset's actual design.
