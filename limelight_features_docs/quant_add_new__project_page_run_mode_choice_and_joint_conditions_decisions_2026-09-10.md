# Add New Quant (project page) — run-mode choice for multiple searches + JOINT pre-submit conditions — DECISIONS (2026-09-10)

**Status:** built + review-verified, **UNCOMMITTED** (part of the held quant working tree).
**Purpose:** record the decisions behind (a) offering the submit-side run-mode choice for *multiple
searches*, and (b) the JOINT-only pre-submit condition checks. **This supersedes, in part,**
`quant_add_new__submit_run_model_change_decisions_2026-08-20.md` (which had scoped JOINT to a single search
and made cross-search joint "go away" — that is now reversed; see below).

## 1. Run-mode choice is now offered for multiple searches

- The submit-side choice **"How should these scan files be quantified?"** — **JOINT** ("One run across all
  scan files (match-between-runs on)") vs **PER_FILE** ("A separate run per scan file") — is now offered for
  **Option B** (multiple single-scan-file searches) as well as **Option A** (one multi-scan-file search).
  Previously Option B forced PER_FILE with no choice.
- This **re-enables a cross-search JOINT run**: one FlashLFQ run whose scan files span multiple searches.
  It reverses the 2026-08-20 decision that "cross-search joint-over-all-searches goes away."
- **No submit-controller logic change was required.** `Quant_AddNew_Submit_JointFlashLFQ_Run_RestWebserviceController`
  is already search-agnostic: it groups mapped pairs by `projectSearchId`, gathers PSMs per search, sends one
  combined request for JOINT, and the D7 sample-key uniqueness (sending `search_scan_file_tbl.id` as the
  service's sample key, with a per-search holder) was built precisely for the same-physical-scan-file-across-
  two-searches case. The prior "single-search-only" restriction was enforced only by the front end.
- The run-mode choice heading is shown bold/larger, and **everything below the choice is hidden until a mode
  is selected** (both Option A and Option B).

## 2. JOINT-only pre-submit conditions (warn → Continue)

When **JOINT** is selected (Option A or B), additional data is retrieved and up to two conditions are
evaluated **before** the rest of the submit form is revealed:

- If **all applicable conditions pass**, the rest of the form is revealed immediately.
- If **any fails**, a warning is shown with a single **Continue** button; the user may accept and proceed
  (Continue reveals the rest). The conditions are advisory — they warn, they do not block.
- **PER_FILE has no conditions** and reveals the rest immediately.

### Condition 1 — same FASTA (ONLY when more than one distinct search, i.e. Option B)
All mapped searches must have the same **primary** FASTA filename.
- **Primary** = the uploaded FASTA file's `filename_at_import` when a FASTA file was uploaded (File Object
  Storage), else the LimelightXML `search_tbl.fasta_filename`. This is the same resolution the search-details
  display uses; the LimelightXML name is also surfaced in the warning when it differs from the uploaded name.
- Compared for exact equality across searches; a `null` (no FASTA) versus a name counts as a mismatch.
- Not applicable to a single-search JOINT (Option A) — one search trivially shares its own FASTA.

### Condition 2 — retention-time compatibility (any JOINT with ≥ 2 scan files, i.e. both Option A and B)
Across the mapped scan files, the MS1 scan retention-time windows must line up:
- **Start:** the MS1 **first**-scan retention times must agree within a **fixed 60 seconds** — an absolute
  difference, deliberately **not** a percentage (10% of a near-zero start RT would be meaningless).
- **End:** the MS1 **last**-scan retention times must agree within **10%** (`max − min ≤ 0.10 × max`).
- Both must hold to pass.
- Retention time is in **seconds** (the spectr wire unit; see
  `flashlfq_retention_time_units_confirmation.md`).
- If a scan file returns **zero MS1 scans**, the retention-time webservice **fails the whole request**
  (fail-loud) rather than returning a partial/empty result — a scan file with no MS1 scans would break
  FlashLFQ anyway (maintainer decision).

## 3. Where the values live (anchors — named, so they don't go stale)

- **FE thresholds (named constants):** `projPg_Quant_AddNew_JointConditionCheck_Evaluate.ts` —
  `projPg_Quant_AddNew_JointConditionCheck_Evaluate__START_RT_MAX_DIFF_SECONDS = 60` and
  `projPg_Quant_AddNew_JointConditionCheck_Evaluate__END_RT_MAX_FRACTION = 0.10`. All condition logic
  (fasta equality + the RT math) lives in this pure evaluator; the two loaders carry none.
- **New webservices:**
  - `Quant_AddNew_FastaFilenamePerSearch_RestWebserviceController` — condition 1. Returns the primary +
    (when different) LimelightXML FASTA filename per `projectSearchId`; same fasta resolution as
    `Get_SearchDetails_All_RestWebservice._internal_Compute`. Auth: `validatePublicAccessCodeReadAllowed`.
  - `Quant_AddNew_FirstLastMS1RetentionTimePerScanFile_RestWebserviceController` — condition 2. Computes each
    file's min & max MS1 retention time server-side (only two numbers per file cross the wire) via the existing
    spectr wrappers (`Call_Get_ScanNumbers_...` for level-1 scan numbers, then `Call_Get_ScanDataFromScanNumbers_...`
    with `ExcludeReturnScanPeakData.YES`). Auth: the standard scan-data public-read two-stage check.
- **FE flow:** `projPg_Quant_SubmitRun_Component.tsx` (choice + reveal gate + warning UI), the two loaders
  `projPg_Quant_AddNew_FastaFilenamePerSearch_FromServer.ts` and
  `projPg_Quant_AddNew_FirstLastMS1RetentionTime_FromServer.ts`, and the evaluator above. The mapped searches'
  `searchName` (used in the condition-1 warning) is carried from the mapping step into the in-memory store, not
  refetched.

## 4. Open / deferred

- The exact 60 s (start) and 10% (end) values are the maintainer's chosen thresholds; they are named
  constants and can be tuned in one place if real-world data suggests different bounds.
- The condition-1 lean webservice reuses the existing search-details searcher + File-Object-Storage searcher;
  it is dedicated (the heavy `Get_SearchDetails_All_RestWebservice` is intentionally not reused).
