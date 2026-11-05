# Quant multi-search + MBR review (2026-09-30), part C: flashlfq-service outputs and evidence from real runs

Read-only review of the `limelight-flashlfq-service` working tree (uncommitted as of this review) and of
three real JOINT runs made on the maintainer's dev machine. Nothing was changed in any repo, run
directory or database.

**Provenance labels used below**
- **SOURCE** = read from code, with `file:line`. Service paths are relative to the
  `limelight-flashlfq-service` repo root. Webapp paths are relative to `limelight-core`.
- **OBSERVED** = read directly from a run's files (a header, a JSON value, a stdout line).
- **COMPUTED** = produced by my own throwaway Python analysis scripts, which were not committed.
  Their logic is described in the evidence section, and they are only as right as that logic.
- **ASSUMPTION** = not verified.

---

## 1. Summary

1. **A JOINT run is ONE FlashLFQ invocation over every scan file of every search in the request.** MBR
   therefore matches between all files, whichever search they came from. (SOURCE
   `app/request_processor.py:78-121`, `app/flashlfq_command.py:155-157`. OBSERVED: the stdout of run
   fa734de6 shows "Doing match-between-runs for" all 4 files, and those files belong to 4 different searches.)
2. **The request the service receives has no search identity per scan file.** A sample is named only
   `search_scan_file_id_<id>` (SOURCE `app/request_processor.py:319-322`, `app/request_models.py:71-85`).
   The only in-run mapping from sample to search is the optional `quant_metadata` echo, written to
   `quant_metadata.json` (SOURCE `app/request_processor.py:125-127`). I used that file's `records[]`
   (`searchScanFileId` → `projectSearchId`) for the analysis below.
3. **Full Sequence has no search or reported-peptide id in it.** It is base sequence + summed mod
   masses, built in the webapp (SOURCE `limelight_webapp/.../services/FlashLFQ_Run_GatherPsms_And_SendRequest_Service.java:506-515`;
   OBSERVED e.g. `EVPAAIQK[+0.0]`, `AALIDCLAPDR[+57.021464]`). So the same peptidoform identified by
   different searches collapses into **one** FlashLFQ row. That is intended, and it is what makes the cross-search matrix work.
4. **Combined{Peptides,Proteins}.tsv is a faithful translation of FlashLFQ's native files.** The
   peptide file is a byte-identical passthrough of every native column and row plus a `#` header. The
   protein file is the same with one derived `Detection Type_<sample>` column appended per sample.
   (SOURCE `app/combined_output_writer.py:109-142`; COMPUTED: all native cells are byte-identical and in
   the same order in all 3 runs.)
5. **The key multi-search number (COMPUTED, run fa734de6, peptides).** Keep a value only if the sample's
   OWN search identified that Full Sequence. That rule removes **2,616 of 10,811** values > 0, and every
   one of the removed cells is `MBR`. Complete features (value > 0 in all 4 samples) drop from **2,186 to 1,212**.
   The expected numbers (~1,212 vs 2,186) are **confirmed**. For comparison, 1,202 rows are MSMS in all 4 samples.
6. **Proteins, run fa734de6 (COMPUTED).** The same rule removes **432 of 2,017** values > 0, and complete
   features drop from **447 to 269**. FlashLFQ's protein rows are all single-accession (0 rows contain `;`),
   so there are no multi-member protein groups to reconcile. 464 peptide rows do have multi-member `Protein Groups`.
7. **Single-search run 71b18c3b (8 files): loss = 0 is confirmed (COMPUTED).** 24,328 MBR values > 0 there come
   from files that had no ID of their own. Those values are legitimate within one search, and a search-level rule keeps them.
8. **FlashLFQ is not deterministic between identical runs.** Runs fa734de6 and a0ec0906 had identical
   identification input (same md5) and identical mzML (same md5). FlashLFQ picked a different
   `RandomSeed` in each (OBSERVED in `FlashLfqSettings.toml`), and the outputs differ by 1 MBR cell
   (2,656 vs 2,657) and 3 complete peptides (2,186 vs 2,189) (COMPUTED).

---

## 2. Source walk-through

### 2.1 Identifications TSV (`flashlfq_identifications.tsv`)

- **One row per PSM**, 7 columns: `File Name | Base Sequence | Full Sequence | Peptide Monoisotopic Mass |
  Scan Retention Time | Precursor Charge | Protein Accession`. (SOURCE `app/flashlfq_identifications_tsv_writer.py:16-24, 38-54`.)
- **File Name** = `search_scan_file_id_<search_scan_file_id>`, the same string as the mzML basename and the
  sample name. (SOURCE `app/request_processor.py:322-323, 348`.)
- **Full Sequence** = `psm.full_sequence`, written verbatim. The service does no formatting and
  fails the request if the value is absent. (SOURCE `app/request_processor.py:337-351`.) The webapp builds it once
  per reported peptide with `FlashLFQ_GroupingIdentity_Common.buildFlashLFQ_GroupingIdentity(peptideSequence,
  variableModMasses, staticMods)`. It is "non-positional, no reportedPeptideId", with static mods expanded.
  (SOURCE `FlashLFQ_Run_GatherPsms_And_SendRequest_Service.java:506-515, 569-592`.)
- **Protein Accession** = `";".join(psm.protein_accessions)`. (SOURCE `app/request_processor.py:354`.) The webapp
  builds each accession as `psvid_<proteinSequenceVersionId>` + `_<name>` when a name exists. The name is the
  first annotation name from a **per-searchId** lookup, with `; \t \r \n` sanitized to spaces.
  (SOURCE `FlashLFQ_Run_GatherPsms_And_SendRequest_Service.java:323-356`.)
- **Retention time** = spectr RT in seconds / 60. (SOURCE `app/request_processor.py:332-346`.) If spectr is
  missing a scan that a PSM references, the whole request fails. (SOURCE `app/request_processor.py:296-317`.)
- **Mass**: supplied by the webapp and written with `%.5f`. The service computes no mass.
  (SOURCE `app/request_processor.py:337-351`, `app/flashlfq_identifications_tsv_writer.py:50`.)

**Stale docs found (SOURCE):**
- `app/request_models.py:23` shows a `"rpid123_PEP[o+79.96633]TIDE"` example.
- The webapp DTO comment at `FlashLFQ_Run_GatherPsms_And_SendRequest_Service.java:1130-1133` says
  "Encodes 'rpid<id>_' + ...".
- `docs/REQUEST_SCHEMA.md:59-61` says "The service sums them into the peptide monoisotopic mass and builds the
  FlashLFQ 'Full Sequence'".

The current code and the OBSERVED data contradict all three: there is no `rpid` prefix, and the webapp builds both
the mass and the Full Sequence. `app/request_models.py:36-39` also still says PER_FILE is "not yet
implemented", which it now is.

### 2.2 JOINT vs PER_FILE invocation

- **JOINT** (SOURCE `app/request_processor.py:78-121`):
  - All mzML files go into one `mzml/` dir.
  - All PSM rows go into one identifications TSV.
  - One `ExperimentalDesign.tsv` is written with **Condition = the file's own sample name** for every file
    (one condition per file, Biorep 1) (SOURCE `:547-555`).
  - FlashLFQ is invoked **once** with `--idt <all ids> --rep <mzml dir>` (SOURCE `app/flashlfq_command.py:155-157`).
  - MBR is emitted as the bare `--mbr` switch when intended. It defaults ON and cannot be turned off on the CLI.
    It is suppressed only for ≤1 file (SOURCE `app/flashlfq_command.py:98-137`).
  - **Consequence: MBR donors and acceptors span all files of all searches.**
  - OBSERVED for fa734de6: the command line ends in `--mbr`, and stdout shows "Find the best donors for
    match-between-runs" followed by MBR passes for 669/670/671/672. Those files belong to projectSearchIds
    1439/1440/1441/1442 respectively (OBSERVED in `quant_metadata.json`).
- **PER_FILE** (SOURCE `app/request_processor.py:186-270`):
  - One FlashLFQ run per scan file, each with its own ids TSV and `--rep` dir.
  - `--mbr` is forced on (SOURCE `:359-381`), which is a functional no-op with one file.
  - Outputs are then merged by `write_merged_our_format_files` (SOURCE `app/combined_output_writer.py:283-386`):
    - Union of rows, **no summing**.
    - Peptides are keyed by exact `Sequence`. Proteins are keyed by the `;`-joined psvid ids in `Protein Groups`.
    - Cells missing from a file become `0` / `NotDetected`.
    - The first-seen file supplies the fixed columns (SOURCE `:311-319`).
    - An accession string that differs between files is reduced to id-only `psvid_<id>` (SOURCE `:415-428`).
  - PER_FILE has **no MBR across files**, so the multi-search MBR question does not arise there. None of the three
    reviewed runs is PER_FILE.

### 2.3 Combined{Peptides,Proteins}.tsv from the native files (JOINT)

- Entry point: `write_combined_our_format_files`, called only after a JOINT run returns SUCCESS. If the
  translation throws, the run is marked FAILED. (SOURCE `app/request_processor.py:159-168`, `app/combined_output_writer.py:92-106`.)
- **Peptides**: `_translate_peptides` reads `QuantifiedPeptides.tsv` and writes header and rows unchanged, prefixed
  by the `#` block. It is a "pure passthrough of columns + rows" (SOURCE `app/combined_output_writer.py:109-118`),
  written with `"\t".join` so cells stay byte-for-byte (SOURCE `:251-258`). Rows are read with `QUOTE_NONE`, and
  empty lines are dropped (SOURCE `:240-248`). **No rows or values are dropped, merged or renamed.**
- **Proteins**: `_translate_proteins` keeps every native column and cell. It appends one `Detection Type_<sample>`
  per `Intensity_<sample>`, in native sample order (SOURCE `:121-142`), derived by `_protein_detection_for_intensity`
  (SOURCE `:145-162`):
  - finite > 0 → `Quantified`
  - `NaN` → `Unquantifiable`
  - `0` or empty → `NotDetected`
  - any other token → raise, and the run FAILS
- **The `#` header** (SOURCE `:212-237`):
  - `format_version`, `file_type` (`peptide_quant` / `protein_quant`), `generator`, `run_mode`, `source_flashlfq_version`.
  - One `# enum` line per controlled-vocabulary value. Peptide values: MSMS, MBR, MSMSAmbiguousPeakfinding,
    MSMSIdentifiedButNotQuantified, NotDetected (SOURCE `:53-61`). Protein values: Quantified, NotDetected,
    Unquantifiable (SOURCE `:63-72`).
  - One `# column` line per output column, where detection columns carry `enum=`.
  - OBSERVED in fa734de6 `CombinedPeptides.tsv`: 23 `#` lines, `generator: limelight-flashlfq-service 0.1.0`,
    `run_mode: JOINT`, `source_flashlfq_version: 2.1.4`.
- **Peptide detection column** = FlashLFQ's own `Detection Type_<sample>`, passed through. **Protein
  detection column** = derived by the service (FlashLFQ has none).
- **Downstream files**:
  - `normalize_entry.py` keeps **complete-case features only**: a feature is dropped unless it is finite and > 0
    in every sample, so 0 and NaN both count as missing (SOURCE `normalize_entry.py:50-52, 152`). It then median
    normalizes and applies log2.
  - Batch correction runs on the normalized log2 files (SOURCE `app/request_processor.py:172-177`).
  - So the normalized and batch-corrected files are **complete-case subsets** of Combined. For run fa734de6,
    OBSERVED `normalize_status.json` shows peptides 3,505 → 2,186 and proteins 738 → 447. That matches my
    COMPUTED complete-feature counts exactly.
- **Served files**: `combined-peptides` / `combined-proteins` tokens in `app/web_listener.py:49-54`. The native files
  are also servable (`peaks` / `peptides` / `proteins`).

---

## 3. Per-run evidence

**Scripts (COMPUTED; throwaway, not committed):**
- `analyze.py`:
  - Parses Combined*.tsv with `#` lines skipped.
  - A value counts as "> 0" if it parses as a finite float > 0; empty → 0 and `NaN` → not > 0.
  - Sample → search comes from `quant_metadata.json` `records[].searchScanFileId → projectSearchId`.
  - Builds per-file sets of `Full Sequence` and of individual `Protein Accession` tokens (split on `;`) from
    `flashlfq_identifications.tsv`, then unions them per search.
  - "Lost" = a (row, sample) cell with value > 0 whose key is NOT in the sample's own-search set. Peptides use
    `Sequence`. Proteins use the exact `Protein Groups` string, with a psvid-id-only variant as a cross-check.
  - "Complete after" = rows where every sample is > 0 AND kept.
- `extra.py`: cross-tabs each peptide cell by (identified in own search?, identified in own file?, Detection
  Type, value > 0). It also checks whether any Full Sequence carries different accession strings in different
  searches, and whether peptide `Protein Groups` equals the union of that sequence's PSM accessions.
- `compare.py`: checks that each native header is a prefix of the Combined header and that every native
  row equals the corresponding Combined row's prefix, by exact string comparison.
- `persample.py`: repeats the loss count per sample.

### 3.1 Sample → search mapping (OBSERVED, `quant_metadata.json`)

| run | sample (search_scan_file_id) → projectSearchId |
|---|---|
| fa734de6 / a0ec0906 | 669→1439, 670→1440, 671→1441, 672→1442 (1 file per search; batch A = 670, 671; batch B = 669, 672) |
| 71b18c3b | 675..682 → 1446 (all 8 files, one search) |

### 3.2 Peptides (COMPUTED)

| metric | fa734de6 (4 searches, batch-corr) | a0ec0906 (same, no batch-corr) | 71b18c3b (1 search, 8 files) |
|---|---|---|---|
| rows | 3,505 | 3,505 | 33,358 |
| cells MSMS | 8,155 | 8,155 | 152,575 |
| cells MBR | 2,656 | 2,657 | 24,924 |
| cells NotDetected | 2,580 | 2,579 | 75,549 |
| cells MSMSIdentifiedButNotQuantified | 597 | 597 | 10,130 |
| cells MSMSAmbiguousPeakfinding | 32 | 32 | 3,686 |
| cells with value > 0 | 10,811 (all MSMS or MBR) | 10,812 | 177,499 |
| complete features (> 0 in all samples) | **2,186** | 2,189 | 10,308 |
| complete AND MSMS in all samples | 1,202 | 1,202 | 8,212 |
| values > 0 lost by own-search-identified rule | **2,616** (all MBR) | 2,617 (all MBR) | **0** |
| complete features after that rule | **1,212** | 1,212 | 10,308 |
| MBR cells > 0 where own search DID identify the sequence | 40 | 40 | 24,924 |
| MBR cells > 0 where own FILE did not identify it | 2,616 | 2,617 | 24,328 |
| rows with multi-member `Protein Groups` | 464 | 464 | 2,711 |

Other COMPUTED facts for fa734de6:
- Distinct Full Sequences: 3,505, identical to the row count.
- Identified in > 1 search: 2,377. Identified in all 4 searches: 1,260.
- Every MSMS, MSMSAmbiguous and MSMSIdentifiedButNotQuantified cell is in a file that identified that sequence.
- Every NotDetected cell is in a file that did not identify it.
- Because each search has exactly 1 file in this run, "own search" equals "own file" here.

Per-sample loss for fa734de6 peptides (COMPUTED): 669: 722 of 2,786; 670: 470 of 2,819; 671: 682 of 2,622;
672: 742 of 2,584.

The 10-row gap between 1,212 and 1,202 comes from rows whose remaining non-MSMS cells are MBR cells in a file
that also had an ID for the sequence (40 such cells in total).

### 3.3 Proteins (COMPUTED)

| metric | fa734de6 | a0ec0906 | 71b18c3b |
|---|---|---|---|
| rows | 738 | 738 | 4,344 |
| cells Quantified | 2,017 | 2,017 | 21,660 |
| cells NotDetected | 935 | 935 | 13,076 |
| cells Unquantifiable (NaN) | 0 | 0 | 16 |
| complete features | **447** | 448 | 1,807 |
| rows whose `Protein Groups` contains `;` | 0 | 0 | 0 |
| values > 0 lost by own-search rule (exact accession string) | **432** | 431 | **0** |
| same, keyed by psvid id only | 432 | 431 | 0 |
| complete features after the rule | **269** | 270 | 1,807 |

Other COMPUTED facts:
- Distinct accession tokens in the ids file = protein row count in all 3 runs (738 / 738 / 4,344).
  FlashLFQ emits one row per individual accession, so a peptide's multi-accession `Protein Groups` does not
  create group rows.
- In fa734de6, 508 of 738 accession strings occur in PSMs of > 1 search.
- No psvid carries > 1 distinct accession string in any run.
- No Full Sequence carries different accession lists in different searches.
- Peptide `Protein Groups` always equals the union of that sequence's PSM accessions (0 mismatches).
- Per-sample protein loss for fa734de6: 669: 115 of 509; 670: 74 of 510; 671: 123 of 500; 672: 120 of 498.
- Also per sample, about 83-103 proteins were identified in the sample's own search but have intensity not > 0.
  This is plausibly because protein quant uses only unique peptides (`--sha` off; OBSERVED
  `shared_peptides: false`) — ASSUMPTION, not verified against mzLib.

### 3.4 Combined vs native (COMPUTED, `compare.py`)

All 3 runs: native and Combined row counts are equal, the native header is an exact prefix of the Combined header,
and every native row matches the Combined row prefix string-for-string.
- Peptides add no columns.
- Proteins add exactly the N `Detection Type_<sample>` columns.

So the service only translates.

### 3.5 Determinism (OBSERVED + COMPUTED)

fa734de6 and a0ec0906 have:
- the same `flashlfq_identifications.tsv` md5;
- the same 4 mzML md5s;
- identical `FlashLfqSettings.toml` apart from paths and `RandomSeed` (1826039514 vs -1594320818).

Their outputs differ by one MBR cell (COMPUTED). ASSUMPTION: FlashLFQ draws a new random seed per run for its
MBR PEP model, and the seed is not passed on the CLI (no seed flag in `app/flashlfq_command.py:155-171`).

---

## 4. Things a multi-search consumer must know

1. **Rows are search-agnostic.** A Full Sequence identified in several searches is one FlashLFQ row
   (by design, SOURCE `...GatherPsms_And_SendRequest_Service.java:506-515`). No field in the row says which
   search(es) identified it. Only the ids TSV and a sample→search map can recover that.
2. **Sample → search is not in the core request or output.** Recovering it needs `quant_metadata.json` (optional
   in the request, SOURCE `app/request_models.py:132-136`) or a DB lookup from `search_scan_file_tbl.id`
   (ASSUMPTION: each search_scan_file id belongs to exactly one search. That holds in these runs but I did not
   verify it against the schema).
3. **MBR values in a multi-search JOINT run can come from a peptide the acceptor's own search never identified.**
   In fa734de6 every such cell is `MBR`. In that run this is 2,616 of 2,656 MBR cells, about 24% of all values > 0.
4. **Accession strings are shared across searches only when the per-search name agrees.** The name comes from a
   per-searchId annotation lookup (SOURCE `...GatherPsms_And_SendRequest_Service.java:323-351`). In a JOINT run,
   FlashLFQ keys proteins by the full string, so the same psvid with a different name in two searches would split
   into two protein rows. JOINT has no psvid-level re-merge; only PER_FILE merges by psvid id (SOURCE
   `app/combined_output_writer.py:399-412`). This did not happen in these runs (COMPUTED: 0 psvids with > 1
   string), but a mixed-FASTA project could trigger it.
5. **Peptide `Protein Groups` is the union over all contributing PSMs**, whichever search they came from. For a
   per-search view, it can list proteins that the sample's own search never mapped. In these runs, no Full Sequence
   had search-dependent accession lists.
6. **Normalized and batch-corrected files are complete-case.** A per-search identification filter applied
   downstream of them cannot bring back rows, and complete-case computed before the filter overstates
   completeness (2,186 vs 1,212).
7. **Run-to-run nondeterminism** (§3.5) is small but real. Don't expect byte-identical reruns.

---

## 5. Open questions

- Should a multi-search project-page quant keep cross-search MBR (FlashLFQ's native semantics) or restrict it
  per search? This is a product decision for the maintainer.
- Is `search_scan_file_tbl.id` → search guaranteed 1:1 (schema check)? Should the service manifest carry
  `projectSearchId` per scan file, so it does not depend on the optional `quant_metadata`?
- Should `--rmc` (require MSMS in condition) or a per-search ExperimentalDesign condition be considered? Today
  every file is its own condition (SOURCE `app/request_processor.py:547-555`). ASSUMPTION: FlashLFQ's
  condition-scoped options would behave differently with per-search conditions. Not verified in mzLib.
- The protein identified-but-not-quantified count (§3.3) needs a check against mzLib's protein-quant rules.

## 6. Implications for a fix (options only, no recommendation)

- **A. Consumer-side mask (webapp).**
  - Mechanism: drop a cell unless the sample's own search identified the key (peptide Full Sequence; protein
    psvid). The ids TSV plus the sample→search map give exactly the COMPUTED numbers above.
  - Advantage: the service stays unchanged.
  - Cost: the FE must also recompute completeness. The service's normalized and batch-corrected files are
    computed before the mask, so they stay inconsistent with it.
- **B. Service-side mask before normalize.**
  - Mechanism: the service writes masked Combined files, or extra masked files, and runs normalize and ComBat on
    them.
  - Prerequisite: the request/manifest must carry a search id per scan file.
  - Advantage: derived files stay consistent with the display.
- **C. One JOINT FlashLFQ run per search** (MBR within a search only), merged like PER_FILE.
  - Effect: cross-search MBR disappears at the source.
  - Cost: cross-search alignment is lost, and a merge step is needed. The merge's psvid-keyed protein handling
    already exists.
- **D. Keep native semantics, but label them.** Keep cross-search MBR values and mark them (for example with a
  derived "MBR from another search" flag) so the user chooses. This needs the same mapping as A or B.
- Whichever option is chosen, fix the stale `rpid` / "service builds Full Sequence" docs (§2.1).
