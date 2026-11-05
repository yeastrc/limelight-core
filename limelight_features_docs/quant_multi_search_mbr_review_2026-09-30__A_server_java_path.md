# Quant multi-search JOINT / MBR review (2026-09-30), part A: server-side Java path

Read-only review of the Limelight webapp Java code that submits PSMs to the FlashLFQ service and reads its
output files back. The question: where can a FlashLFQ-measured value be dropped, merged, or attributed to the
wrong thing when a JOINT run spans several searches (projectSearchIds) with Match-Between-Runs (MBR) on? PER_FILE
behavior is checked as well. The review read the working tree, which includes uncommitted files.

Path abbreviations used below:

- `WA/` = `limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp/`
- `RC/` = `WA/spring_mvc_parts/data_pages/rest_controllers/`
- `SUBMIT` = `RC/other_like_project/Quant_AddNew_Submit_JointFlashLFQ_Run_RestWebserviceController.java`
- `GATHER` = `WA/services/FlashLFQ_Run_GatherPsms_And_SendRequest_Service.java`
- `IDENT` = `RC/FlashLFQ_GroupingIdentity_Common.java`
- `REDERIVE` = `WA/services/FlashLFQ_Quant_ReDerive_GroupingIdentity_To_ReportedPeptideIds_Service.java`
- `JOINED` = `RC/single_project_search_id/FlashLFQ_Run__Result_Retrieval_Joined_RestWebserviceController.java`
- `PROT` = `RC/single_project_search_id/FlashLFQ_Run__Result_Retrieval_Proteins_RestWebserviceController.java`
- `SVC/` = the separate FlashLFQ service repo (limelight-flashlfq-service). It is cited only where the Java
  behavior depends on it.

Confidence tags: `verified: file:line` means I read that code. `assumption -- unverified` means I did not
check it against the source. Row counts described as "reported" come from the reviewer who requested this
review. I did not reproduce them.

---

## Summary: every drop / merge / mis-attribution point

| # | Where | What happens | Mode | Severity |
|---|---|---|---|---|
| D1 | `JOINED:407-415` (and the three peptide siblings, same lines ±10) | For each requested sample, each CombinedPeptides row's `Sequence` is looked up ONLY in that sample's own projectSearchId identity map. If the identity is absent, the value is SKIPPED (`continue`). A value FlashLFQ measured, by MBR or otherwise, in search B's file for a peptide that only search A reported never reaches the front end for B's sample. | JOINT, multi-search | **HIGH**. This is the suspected defect, confirmed in code. The reported impact on one real run: 2,186 complete peptides in the FlashLFQ file vs about 1,212 on the page (reported, not reproduced). |
| D2 | `REDERIVE:89-91` via the request's `searchDataLookupParamsRoot` (`JOINED:184,246`) | The identity map is re-derived from the cutoffs the FRONT END sends. The FE sends the page's CURRENT filters (`front_end/.../quant/quant_PrototypeData.ts:699-704`). If those differ from the submit-time cutoffs, the set of accepted identities differs from the set that was sent to FlashLFQ. Looser cutoffs can admit identities the search never sent. Stricter cutoffs drop rows. | JOINT + PER_FILE | MEDIUM (design-dependent) |
| D3 | `REDERIVE:89-152` vs `GATHER:213-287` | The map is built from ALL of the search's reported peptides that pass cutoffs, not only those whose PSMs are in the MAPPED files. So D1's "drop" does not depend on whether the search identified the peptide in the files it contributed to the run. It depends on whether the search reported the peptide in ANY of its scan files, including unmapped ones. As a result, the same MBR value is kept or dropped inconsistently. | JOINT, multi-file searches | LOW to MEDIUM |
| D4 | `IDENT:82-114` (identity = exact string of a full-precision summed mass) | There is no cross-search normalization of mod masses. If two searches record the same modification with different mass precision (for example, different search engines or parameter files), the same peptidoform gets two different identity strings. FlashLFQ then treats them as two peptidoforms. They can share one MS1 peak, which gives `MSMSAmbiguousPeakfinding` and a zeroed intensity. D1 then keeps each string only for its own search's samples. No eligibility or submit check guards against this (`RC/other_like_project/Quant_AddNew_ProjectSearches_ScanFiles_Eligibility_List_RestWebserviceController.java:63-104`, `SUBMIT:360-373`). | JOINT, multi-search | MEDIUM (data-dependent, assumption: not observed) |
| D5 | Grouping identity itself (`IDENT:28-49`) | By design, positional isomers and equal-summed-mass forms collapse to ONE FlashLFQ row. Every reportedPeptideId in the list gets the SAME value (`JOINED:430-438`). This is a merge, and the front end is told about it via `groupId`. | all | By design (not a defect) |
| D6 | `PROT:358-361` | CombinedProteins rows whose `Protein Groups` cell contains `;` (multi-member group) are SKIPPED for every sample. The comment says this "should not occur". Upstream FlashLFQ's reader builds one ProteinGroup per `;`-split accession, so it should not normally occur for the JOINT passthrough file (see §4). | all | LOW |
| D7 | `PROT:363-380` | Rows whose `Protein Groups` does not start with `psvid_`, or whose id does not parse to an int, are SKIPPED. | all | LOW |
| D8 | `GATHER:342-352` + FlashLFQ protein-group identity = accession string (§4) | The accession is `psvid_<id>_<name>`, and the name comes from THAT search's annotations. If two searches name the same psvid differently, FlashLFQ creates two protein groups, and `PROT` emits TWO records with the SAME `proteinSequenceVersionId` per sample (a duplicate, not merged). For peptides, the peptide's `Protein Groups` differs by search, which does not affect the peptide join. | JOINT, multi-search | MEDIUM (data-dependent, assumption: not observed) |
| D9 | `PROT` (whole controller) | Protein values are NOT filtered per search. Every requested sample gets every protein row, whether or not that sample's search reported the protein. This is the opposite of the peptide path (D1). A protein value for search B's sample can be built from peptides that only search A identified (MBR). This is an asymmetry, not a drop. | JOINT, multi-search | MEDIUM (consistency) |
| D10 | `JOINED:399-402`, `PROT:351-354` | Data rows with too few columns are skipped with a warn log. | all | LOW (corrupt-file guard) |
| D11 | `JOINED:417-424` (and siblings) | An empty or non-numeric peptide intensity becomes `0.0`. The normalized and batch-corrected files are complete-case (`SVC/normalize_entry.py:50-51`), so normally no empties. But in the batch-corrected LOG2 file, `0.0` is a valid value (linear 1). A blank cell would be silently converted into a real-looking value. | peptide log2 | LOW (latent) |
| D12 | Service complete-case filtering (`SVC/normalize_entry.py:50-51`, `SVC/batch_correct_entry.py:414-418`) + D1 | The normalized and batch files keep only features detected in EVERY sample of the run. The Java join then applies D1 on top, so for multi-search runs the "complete" rows in those files lose the cross-search samples again. | JOINT, multi-search | HIGH (same root cause as D1) |
| S1 | `GATHER:521-529`, `573-581` | At submit, a reported peptide whose base mass cannot be computed (the PeptideMassCalculator throws) has all its PSMs dropped with a warn log. | all | LOW (logged; never quantified) |
| S2 | `SUBMIT:540-547,554-560` | Scan files of a search that the user did not map are excluded. Mapped files with zero passing PSMs are not sent to FlashLFQ (display-only `hasPsms=false`). | all | By design |
| S3 | `SUBMIT:360-373`, `GATHER:468-477` | Searches with open mods or PSM-level dynamic mods are rejected with 400 or an exception. | all | By design |

No other place in the server-side Java drops a value. JOINT/PER_FILE differences are covered in §5.

---

## 1. Submit side

### 1.1 Controller flow (`SUBMIT`)
- The request is `{ projectIdentifier, mappedFiles:[{projectSearchId, searchScanFileId}], runMode, searchDataLookupParamsRoot, flashlfq_parameters, quant_metadata, create_batch_correction, batch_column_index }` (verified: `SUBMIT:703-727`).
- `runMode` must be `JOINT` or `PER_FILE`, otherwise 400 (verified: `SUBMIT:236-240`).
- Mapped files are grouped by projectSearchId (verified: `SUBMIT:245-257`).
- The cutoffs come ONLY from the request's `searchDataLookupParamsRoot`, which is required, and every mapped projectSearchId must have an entry (verified: `SUBMIT:264-301`). They are converted per search with `SkipWebserviceCutoffs_NotIn_projectSearchIdMapToSearchId.YES` (verified: `SUBMIT:379-384`). `SearcherCutoffValuesSearchLevel` carries PSM, peptide, protein and mod-position annotation cutoffs (verified: `limelight_shared_code/.../SearcherCutoffValuesSearchLevel.java:40-52`).
- Auth: project OWNER, plus a check that every projectSearchId is in the project and every ssfid belongs to its search (verified: `SUBMIT:312-336,494-499`).
- Open-mod or PSM-level dynamic-mod searches are rejected (verified: `SUBMIT:363-373`). Reported-peptide-level variable mods ARE allowed. There is NO check that the searches in one JOINT run share mod definitions or mass precision (verified: no such check in `SUBMIT`. The eligibility controller doc lists its checks at `Quant_AddNew_ProjectSearches_ScanFiles_Eligibility_List_RestWebserviceController.java:73-101`, and none of them is cross-search).
- There is a server-side centroid guard over every mapped file, all-or-nothing (verified: `SUBMIT:398-457`).
- Each search gets its own `PerSpectralStorageServiceFile_Holder`, so the same physical file used by two searches becomes two samples (D7 design) (verified: `SUBMIT:525-533`). PSMs of unmapped files of a search are filtered out (verified: `SUBMIT:554-560`). The ssfid is sent as the sample key `search_scan_file_id` (verified: `SUBMIT:563-568`).
- MBR is forced TRUE and normalize forced FALSE (verified: `SUBMIT:604-605`). ONE request is sent for both modes (verified: `SUBMIT:622-634`). The response gives ONE shared `requestId` to every pair (verified: `SUBMIT:647-651`). The search-data-lookup code is minted from the SAME root and returned to the FE for the quant page URLs (verified: `SUBMIT:668-681`).

### 1.2 PSM gathering (`GATHER.gatherPsms_ForSingleSearch`)
- Reported peptides: `ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList(searchId, cutoffs, 1)` (verified: `GATHER:101,213-215`).
- Per reported peptide, the PSM ids come from the cutoffs (verified: `GATHER:258-260`). Then `getPsmsWebDisplay(searchId, null, psmIds)`: no sub-group restriction (verified: `GATHER:262-263`).
- Each PSM is sent with `scan_number, charge, peptide_sequence, reported_peptide_id, protein_accessions, full_sequence, monoisotopic_mass` (verified: getters at `GATHER:1142-1164`). `modifications` has no getter and is internal (verified: `GATHER:1120-1123`, no getter in the listing). `reported_peptide_id` IS serialized, but the service uses it only for logging and error messages (verified: `SVC/app/request_processor.py:303-343`; `SVC/app/request_models.py:49` comment).
- PSMs are appended to a per-file entry keyed by spectral-storage API key within the search's holder (verified: `GATHER:553-563`).

### 1.3 Grouping identity (Full Sequence)
- It is built once per reported peptide with `IDENT.buildFlashLFQ_GroupingIdentity(peptideSequence, reportedPeptideLevelVariableModMasses, staticModDTO_List)` (verified: `GATHER:514-516`). All PSMs of that reported peptide get the same `full_sequence` (verified: `GATHER:592`).
- Variable mods: ALL reported-peptide-level variable-mod masses, at any position including n/c-terminal, are collected raw, with no rounding (verified: `GATHER:429-441`).
- Static mods: `IDENT` adds the static-mod mass once per matching residue occurrence (verified: `IDENT:97-104`). A static-mod residue is assumed to be a single amino-acid letter, never a terminal (the claim is at `IDENT:78-79`; assumption -- unverified against the importer. `static_mod_tbl.residue` is `VARCHAR(45)`, `database_scripts/install/001_create_empty_database.sql:607`).
- Format: the masses are sorted and summed, `-0.0` is normalized, and the result is `BigDecimal.valueOf(double).toPlainString()` with a leading `+` for non-negative values. So the output is `BASESEQ[+<full precision>]`, always with ONE bracket, and `[+0.0]` when there are no mods (verified: `IDENT:106-131`). The identity has no position information and NO reportedPeptideId (verified: `IDENT:113`).
- **Stale comments (the code does NOT do what they say):** the per-PSM DTO comments say the service embeds `reported_peptide_id` into Full Sequence and that `full_sequence` "encodes 'rpid<id>_'" (`GATHER:1115-1118,1131-1132`). The code sends no rpid (`IDENT:113`). `protein_accessions` says "TODO first-try: not yet populated" (`GATHER:1126-1127`), but it IS populated (`GATHER:405`). The service's own docs make the same stale claims (`SVC/app/request_models.py:21-23`; `SVC/app/combined_output_writer.py:77-78` says "with localized modifications").
- The monoisotopic mass is base + sum of `modifications` values, which include variable and static mods (verified: `GATHER:584-592`). The canonical `PeptideMassCalculator` is used (verified: `GATHER:574-575`). No new mass math was found.

### 1.4 Protein accessions
- reportedPeptideId → proteinSequenceVersionIds via `ProteinVersionIdsFor_SearchID_ReportedPeptideIdList_Searcher` with the search's cutoffs (verified: `GATHER:297-299`).
- Name: the FIRST annotation name returned per psvid for THIS search. The order is whatever the searcher returns (verified: `GATHER:326-334`; ordering: assumption -- unverified).
- Token: `psvid_<id>`, plus `_<name>` where the name has `;`, tab, CR and LF replaced by spaces (verified: `GATHER:342-352`). Tokens are deduplicated per reported peptide (verified: `GATHER:354-356`). The service joins them with `;` into the FlashLFQ Protein Accession column (verified: `SVC/app/request_processor.py:354`).
- psvid is GLOBAL: `protein_sequence_version_tbl` has no search_id (verified: `001_create_empty_database.sql:993-1001`).

### 1.5 What is skipped at submit
- An un-computable base mass drops that reported peptide's PSMs with a warn log (verified: `GATHER:521-529,576-581`).
- A missing peptide sequence, a PSM with a null ssfid, or a PSM whose ssfid is not in the search's scan-file map throws 400 (verified: `GATHER:382-385,540-551`).
- Mapped files with zero passing PSMs go to quant_metadata only, with `hasPsms=false` (verified: `SUBMIT:540-547`; `GATHER:680-687`).
- Stale comments: `SUBMIT:536,785,836` say "default cutoffs" and "PER_FILE: every entry has its own requestId". The code uses request cutoffs and one shared requestId. `GATHER:609,622,655` say PER_FILE passes null or an empty set. The code passes `runMode` and the same empty set for both modes (`SUBMIT:625,629`).

## 2. Identity re-derivation at retrieval (`REDERIVE`)
- Input is `(projectSearchId, searchId, searchDataLookupParamsRoot)`. It uses the same cutoff conversion, the same `getPeptideDataList(..., 1)`, the same sequence and variable-mod searchers, the same static-mod searcher, and the same `IDENT` builder (verified: `REDERIVE:68-152`). For the same root and the same DB state, it reproduces EXACTLY the submit-side identity for every reported peptide that submit sent (verified by code comparison, `GATHER:213-246,429-441,514-516` vs `REDERIVE:89-147`).
- Differences from submit, none of which affects the identity string:
  - Missing sequence: skip here (`REDERIVE:130-134`) vs throw at submit (`GATHER:382-385`).
  - Un-computable mass: identity included here (`REDERIVE` has no mass step) vs PSMs dropped at submit. The only effect is an extra identity key with no matching output row.
  - The map covers ALL reported peptides passing cutoffs in ANY scan file of the search, not only the mapped files (D3).
- **Which cutoffs:** the root that the FE puts in the request body (`JOINED:184,246`). The FE passes the page's current PSM/Peptide filtering (`front_end/src/js/page_js/data_pages/quant/quant_PrototypeData.ts:699-704`). Callers pass their component state's root (`quantCommonSPAView_PeptideView_Component.tsx:579`, `quantCommonSPAView_ProteinView_Component.tsx:815`). The page URL starts from the code minted at submit (`SUBMIT:668-681`), so the two match until the user changes filters (assumption -- unverified at runtime). Also, the FE load is a singleton ("FIRST caller establishes the singleton", `quant_PrototypeData.ts:700-702`), so later filter changes may not trigger a re-join (FE-side; assumption -- unverified).
- The result map is `identity → List<reportedPeptideId>`, with more than one entry for positional isomers or equal summed mass (verified: `REDERIVE:149-151`).

## 3. Retrieval webservices that read a FlashLFQ output file

| Controller | Service `file` token | FE caller | Parsing |
|---|---|---|---|
| `JOINED` | `combined-peptides` (`JOINED:114`) | `quant_PrototypeData.ts:59,722` | per-search identity join |
| `..._Peptides_Normalized_Linear_...` | `combined-peptides-normalized-linear` | `quant_PrototypeData.ts:64,772` | identical to JOINED |
| `..._Peptides_BatchCorrected_Log2_...` | `combined-peptides-batch-corrected-log2` | `quant_PrototypeData.ts:70,822` | identical to JOINED |
| `..._Peptides_BatchCorrected_Delog2_...` | `combined-peptides-batch-corrected-delog2` | `quant_PrototypeData.ts:77,870` | identical to JOINED |
| `PROT` | `combined-proteins` (`PROT:96`) | `flashlfq_proteinQuant_PrototypeData.ts:54` | psvid parsed from file, no DB |
| `..._Proteins_Normalized_Linear/BatchCorrected_Log2/BatchCorrected_Delog2_...` | `combined-proteins-normalized-linear` / `-batch-corrected-log2` / `-batch-corrected-delog2` | `flashlfq_proteinQuant_PrototypeData.ts:59,65,72` | identical to PROT |
| `RC/single_project_search_id/FlashLFQ_Run__Result_Retrieval_RestWebserviceController.java` | (no token) | **no FE caller found** (grep of `front_end/src`) | raw passthrough, marked "THROWAWAY" (`:68`) |
| `RC/other_like_project/Quant_AddNew_FlashLFQ_{Peptide,Protein}ResultFile_Retrieval_...` | `peptides` / `proteins` (`:93`) | data-file pages (`flashlfq{Peptide,Protein}DataFile_LoadFromServer.ts`) | raw passthrough of native Quantified*.tsv, no join |
| `RC/other_like_project/Quant_AddNew_FlashLFQ_{Peptide,Protein}ResultFile_PerFile_Retrieval_...` | `peptides` / `proteins` + `search_scan_file_id` (`:258-259` / `:248-249`) | same data-file pages | raw passthrough of one per-file native file |

Sibling equivalence: a `diff` of each peptide sibling against `JOINED`, and each protein sibling against `PROT`, shows only the class name, logger, token, path constant, fetch-method name, and log/exception strings changing. The code is otherwise identical (verified by diff, 2026-09-30).

### 3.1 JOINED (peptides) in detail
- Auth: READ on the distinct projectSearchIds, and each ssfid must belong to its projectSearchId's search (verified: `JOINED:208-236`).
- There is one identity map per distinct projectSearchId (verified: `JOINED:241-248`). The TSV is fetched once (`JOINED:251`).
- Parsing: leading `#` lines are skipped, and the first non-`#` line is the header (`JOINED:324-327`). `Sequence` is required (`JOINED:338-346`). Per requested ssfid, `Intensity_search_scan_file_id_<ssfid>` and `Detection Type_search_scan_file_id_<ssfid>` must both exist, otherwise the request fails (`JOINED:353-373`). The sample map is keyed by ssfid, and a duplicate ssfid is ignored (`JOINED:354`).
- Per row, per sample: `identityMap.get(row.Sequence)`. **If it is null, the row is skipped for that sample** (D1, verified: `JOINED:409-415`). The code comment itself names the cross-search case: "an identity that belongs only to a DIFFERENT search. Skip for THIS sample" (`JOINED:412-413`).
- Values: an empty intensity becomes 0.0, and an unparsable one becomes 0.0 with a warn log (`JOINED:417-424`). `ambiguousZeroed = (detectionType == "MSMSAmbiguousPeakfinding")` (`JOINED:426-427`). One record is emitted per reportedPeptideId in the identity's list (`JOINED:430-438`).
- DTO to the FE: `{ perScanFile: [ { searchScanFileId, records: [ { reportedPeptideId, intensity (double), groupId (= identity string), ambiguousZeroed, detectionType (raw: MSMS / MBR / MSMSAmbiguousPeakfinding / MSMSIdentifiedButNotQuantified / NotDetected) } ] } ] }` (verified: `JOINED:557-610`). The MBR state is carried ONLY as `detectionType == "MBR"`. There is no separate flag.
- The `Sequence` column in the combined file IS the `full_sequence` Limelight sent. The JOINT peptide file is a passthrough of native `QuantifiedPeptides.tsv` (verified: `SVC/app/combined_output_writer.py:19-20,77`).

### 3.2 Normalized / batch-corrected peptide siblings
- The join is the same as JOINED, so D1 applies unchanged.
- The input files are complete-case across ALL samples of the run: a feature is dropped unless it is finite and >0 in every sample (verified: `SVC/normalize_entry.py:50-51`). The batch files are built from the normalized files (`SVC/batch_correct_entry.py:414-418`).
- The Log2 file's values may be negative, and the Java passes them through as doubles (verified: `..._Peptides_BatchCorrected_Log2_...java:84-90` comment; code identical to JOINED). D11 (blank cell → 0.0) is a latent log2-space mis-attribution.

### 3.3 PROT (proteins) in detail
- Auth and ssfid ownership are as in JOINED (verified: `PROT:187-216`). There is **no DB re-derivation and no cutoffs** (verified: `PROT:79-80`; the class has no re-derive dependency).
- `Protein Groups` and every requested `Intensity_search_scan_file_id_<ssfid>` column are required (`PROT:305-335`). The `Detection Type_` column is NOT read (`PROT:96` comment; no lookup in code).
- Per row: skip if the cell contains `;` (D6, `PROT:358-361`). Skip if it does not start with `psvid_` (D7, `PROT:363-366`). The id runs up to the first `_`, and the row is skipped if the id does not parse (`PROT:368-380`). Then a record is emitted for EVERY requested ssfid (D9, `PROT:383-388`).
- Values: empty becomes 0.0. `NaN` becomes `intensity=null` with `nonFiniteIntensityToken="NaN"`. ±Infinity becomes a token. Unparsable becomes 0.0 (verified: `PROT:400-426`).
- DTO: `{ perScanFile: [ { searchScanFileId, records: [ { proteinSequenceVersionId, intensity (Double, nullable), nonFiniteIntensityToken } ] } ] }` (verified: `PROT:539-582`).

## 4. Protein path specifics
- Protein identity inside FlashLFQ is the accession STRING. The upstream FlashLFQ generic reader splits the Protein Accession cell on `;` and creates or reuses one `ProteinGroup` per accession string (verified in the upstream source copy: FlashLFQ `Util/PsmReader.cs:53-61` delimiter table (Generic = `;`), `:381`, `:431-439`). `ProteinGroup` equality is `ProteinGroupName` (verified: mzLib `mzLib/FlashLFQ/ProteinGroup.cs:105-113`). Whether that upstream copy matches the deployed FlashLFQ build is an assumption -- unverified. The service's use of the Generic reader format is also an assumption -- unverified.
- Therefore, in the JOINT file (a passthrough), each protein row is one `psvid_<id>_<name>` token, and D6 should not trigger. If searches A and B send different `<name>` values for the same psvid, you get two rows with the same psvid (D8). `PROT` does not deduplicate them.
- PER_FILE: the service merge keys proteins by psvid ids only, not the name, so the same protein merges across files and searches (verified: `SVC/app/combined_output_writer.py:399-412`). When names disagree it writes the id-only `psvid_<id>` (`:415-427`), which `PROT` parses fine (`PROT:369-371`).
- Can a protein value be dropped for a search that did not report the protein? **No, not server-side** (D9). Every row goes to every sample. Any per-search protein filtering is FE-side (assumption -- unverified).
- Multi-member groups: skipped (D6). Shared peptides: a peptide's `Protein Groups` cell may list several tokens, which FlashLFQ splits into separate groups. How the FlashLFQ protein quant (weighted median-polish, per `SVC/app/combined_output_writer.py:187-189`) treats shared peptides is controlled by the `shared_peptides` parameter forwarded from the FE (`GATHER:1061`). That is outside Java.

## 5. PER_FILE mode
- Java submits exactly as for JOINT: one request, the same per-search gather, `run_mode="PER_FILE"`, MBR TRUE (verified: `SUBMIT:604,622-625`).
- The service runs FlashLFQ once per scan file, sequentially, then merges (verified: `SVC/app/request_processor.py:71-75,186-259`). Each run has one file, so there is no cross-file MBR ("one file per run makes MBR a functional no-op", `SVC/app/request_processor.py:191`).
- Merge: the UNION of rows keyed by exact `Sequence`, with NO summing. A row missing from a file gets intensity `"0"` and detection `NotDetected` (verified: `SVC/app/combined_output_writer.py:261-343`).
- Java retrieval is the SAME `JOINED` and `PROT` code, keyed by the same column names (verified: `JOINED:304-311` comment + code). In PER_FILE, a row's value for file X can only be non-zero if file X's own PSMs identified it, and those PSMs came from X's own search. So D1 discards only `0`/`NotDetected` filler, and **PER_FILE loses no measured value to D1** (inferred from the code above; not exercised on data). D2, D3, D4 (split identities, no MBR cross-talk), D6-D9 and D11 still apply.

## 6. Other multi-search assumptions
- **reportedPeptideId is NOT per-search; it is a global id that is REUSED across searches.** `reported_peptide_tbl` has no search_id (verified: `001_create_empty_database.sql:104-111`). The importer reuses the id by sequence string (verified: `limelight_importer/.../dao/ReportedPeptideDAO_Importer.java:230`). Search membership is in `search_reported_peptide_tbl` (`001_create_empty_database.sql:262-265`). Comments such as "reportedPeptideId is per-search" / "not globally unique across searches" (`JOINED:80-81,87,239-240`) are therefore imprecise. What IS per-search is the SET of reportedPeptideIds, and each id's reported-peptide string is in engine-specific notation. The code keeps records per ssfid, so this does not cause a merge server-side.
- One ssfid belongs to exactly one search: `search_scan_file_tbl.search_id` (verified: `001_create_empty_database.sql:1334-1343`), and it is enforced on submit and retrieval (`SUBMIT:494-499`, `JOINED:230-235`, `PROT:210-215`). The same physical `scan_file_id` in two searches becomes two samples (D7 design; `SUBMIT:119-125`). The FlashLFQ run then contains two identical mzMLs, and MBR between them is by design.
- No server-side summing across searches, scan files or conditions was found in any retrieval controller. All responses are per-ssfid (verified: `JOINED:268-275`, `PROT:238-245`).
- The `requestId` shape is validated with `^[0-9a-f]{32}$` everywhere (e.g. `JOINED:117,198-201`).

## Open questions
1. Is D1 the intended semantics? That is, should a search's sample show only peptides that search itself reported, or every FlashLFQ-measured value (including cross-search MBR)? The 2026-09-10 run-mode decisions doc may already say. Not checked in this review.
2. Should the retrieval identity map be built from the submit-time cutoffs (the minted code) or the page's current filters (D2)? Today the FE's current root decides.
3. For D3: should the per-search map be limited to reported peptides with PSMs in the MAPPED files, to match exactly what was sent?
4. D4/D8: do the searches in real multi-search runs share identical static/variable mod masses and protein annotation names? A read-only SELECT over `static_mod_tbl` and the dynamic-mod masses for the run's searches would settle D4 for a given run.
5. Is the upstream FlashLFQ `PsmReader` behavior (one group per accession) the same in the deployed build (D6/D8)?
6. Should the protein path (D9) and the peptide path (D1) follow the same rule?

## Implications for a fix (options, not decisions)
- **Option A: run-level identity union.** Build ONE identity map for the whole run (the union over its projectSearchIds). Every sample column is read for every row, and each row's value goes to each search's reportedPeptideIds for that identity where they exist. Values for identities a search never reported need a non-reportedPeptideId carrier, for example an identity-keyed record (`groupId` only) or a "not reported by this search" marker. This changes the DTO contract and the FE keying, which today is by reportedPeptideId.
- **Option B: identity-keyed response.** Return rows keyed by `groupId` (the identity string) with per-ssfid values. Separately, return per-search `groupId → [reportedPeptideId]` maps, and let the FE decide how to display (a value per sample, with the search attribution explicit). This makes D1's filter an explicit display choice instead of a silent server-side drop.
- **Option C: keep D1 but make it visible.** Keep the current join, but count and return the dropped (row, sample) values, split by detection type, so the page can show "N values measured by FlashLFQ are not shown because search X did not report the peptide".
- Independent of A/B/C:
  - Pin the retrieval cutoffs to the submit-time root (D2), for example by carrying the minted code with the run rather than using live page filters. Or document the live-filter behavior.
  - Optionally restrict the re-derived map to peptides with PSMs in the mapped files (D3).
  - Add a submit-time warning or block when the searches in a JOINT run have mod masses that differ in precision (D4), or normalize the mass token.
  - Deduplicate or merge protein rows by psvid in `PROT` (D8), or send id-only `psvid_<id>` accessions.
  - Make blank-cell handling mode-aware for the log2 files (D11).
  - Fix the stale comments listed in §1.3 and §1.5.
- Whatever option is chosen must be applied identically to all four peptide controllers (they are copies). The protein controllers need a matching decision on D9.
