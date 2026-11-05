# Multi-search JOINT quant + MBR — end-to-end review: summary and plan forward (2026-09-30)

> **UPDATE 2026-10-01 — direction changed.** The Quant Common page now shows charts built directly from the flashlfq-service result files (no reported-peptide mapping), which avoids F1-F3 for the charts by construction. Plan Step 1 (shared join, run-wide identity map, cutoff-match refusal) is built and kept, but unused by the Charts view; Steps 2-4 (table cells, MBR presentation in tables, protein page) are **parked** — quant values in lists will be designed differently later. Findings F1-F12 remain an accurate description of the kept reported-peptide webservices. See `quant_common_page__charts_view__design_and_status_2026-10-01.md`.


**Status:** review complete; nothing built. This doc consolidates three detailed review docs and proposes a plan for the
maintainer to decide on. All code is the uncommitted working tree as of 2026-09-30.

Detailed companion docs (read for file:line depth):
- [A — server-side Java path](quant_multi_search_mbr_review_2026-09-30__A_server_java_path.md)
- [B — front end: rows, cells, charts](quant_multi_search_mbr_review_2026-09-30__B_front_end_rows_cells_charts.md)
- [C — flashlfq-service outputs + real-run evidence](quant_multi_search_mbr_review_2026-09-30__C_service_outputs_and_real_run_evidence.md)

Provenance labels used here: **verified** = read in source (file:line), re-checked by the reviewer for the load-bearing
items; **observed** = seen in a real run's files or the real UI; **computed** = produced by a review script over real
run files (see doc C for script logic); **inferred** = follows from code, not exercised.

---

## 1. Why this review

The FlashLFQ → Limelight mapping was designed when a quant run was effectively one search. Once one **JOINT** run was
allowed to span several searches with **Match-Between-Runs (MBR)** on, a value FlashLFQ measures in search B's scan file
for a peptide that only search A reported has no reported peptide in search B to attach to. That path was never
reviewed end to end for multi-search runs.

It surfaced as a chart discrepancy: on a 4-search × 1-file run (project 90) the quant common peptide page's charts
showed **1,212** complete peptides where FlashLFQ's own file has **2,186**, and the median-normalized boxplot did not
flatten (median range 0.07 instead of 0.00). On a single-search run (the reference dataset used to check parity with
the reference Python analysis, 8 files in one search) the page matches the reference exactly.

## 2. Background facts (verified)

- **JOINT = one FlashLFQ run over every scan file of every search in the run**, so MBR crosses searches
  (service `app/request_processor.py:78-121`; doc C). PER_FILE runs FlashLFQ once per file — no cross-file MBR (doc A/C).
- **FlashLFQ identity** ("Full Sequence") = base sequence + ONE summed-mod-mass bracket, e.g. `PEPTIDEK[+15.9949]`;
  mod positions dropped, no search or reportedPeptide id in it (doc A: `FlashLFQ_GroupingIdentity_Common.java:106-131`;
  observed in the identifications TSV). The same peptidoform from different searches is ONE FlashLFQ row.
- **reportedPeptideId is global**, reused across searches (`reported_peptide_tbl` has no search column —
  `database_scripts/install/001_create_empty_database.sql:104-108`). Code comments calling it "per-search" are
  imprecise; data is kept per scan file, so nothing is merged server-side.
- A scan file belongs to exactly one search (enforced on submit and retrieval — doc A).

## 3. Findings

| # | Where | What happens | Severity | Evidence |
|---|---|---|---|---|
| F1 | Java JOINED peptide retrieval | Each FlashLFQ row is mapped, per sample, through **that sample's own search's** identity → reportedPeptideId map; if absent, the value is **skipped**. Cross-search MBR values are dropped. The Normalized_Linear, BatchCorrected_Log2 and BatchCorrected_Delog2 peptide controllers are copies with the same loop. | HIGH | verified `FlashLFQ_Run__Result_Retrieval_Joined_RestWebserviceController.java:407-415` (doc A D1) |
| F2 | Front end, quant common peptide page cells | A row is one display string merged across searches, holding reportedPeptideIds per search; there is one Quant column per search. Search B's cell looks up only **search B's** reportedPeptideIds; none → blank, no `(MBR)` marker. So even a server fix alone would leave B's cell blank. | HIGH | verified `quantSharedPeptideProtein_GeneratedReportedPeptideListSection_Create_TableData.tsx:1899-1905`, `quant_PrototypeData.ts:277` (doc B §2-3) |
| F3 | Charts (peptides) | Feature × sample matrix is built from the joined records (keyed by groupId), so "complete" ≈ peptides every search itself reported; normalized/batch-corrected files (computed by the service over ALL complete FlashLFQ features) are displayed on that subset. | HIGH | verified `quant_PrototypeData.ts:351-374`; observed 1,212 vs 2,186 and median range 0.07 (project 90) |
| F4 | Identity rebuild at retrieval | The identity map is rebuilt from the **page's filters** (sent from the URL's `q/` code), not the cutoffs stored with the run. In practice these are always the same: the quant common pages show the filter block **display-only** with no change callback (`quantCommonSPAView_MainContent_Component.tsx:519-527`), and the URL is minted at submit. Residual risk only for a hand-built/edited URL. (Doc A D2 / doc B §6 rated this higher before the display-only check.) | LOW (robustness) | verified `quant_PrototypeData.ts:697-705`, `quantCommonSPAView_MainContent_Component.tsx:519-527` |
| F5 | Protein retrieval | **No per-search filter at all**: every protein row goes to every sample, stored empty as 0. Search B's "Quant (FlashLFQ)" cell can show a value — or "0.00e+0" — for a protein B never reported; the "Quant (Limelight)" column next to it is blank. Peptide and protein behavior are inconsistent. | MEDIUM | verified `FlashLFQ_Run__Result_Retrieval_Proteins_RestWebserviceController.java:383-388, 403` (doc A D9, doc B §4) |
| F6 | Protein retrieval | Rows whose Protein Groups contain `;` (multi-member groups) and non-`psvid_` rows are skipped. In the runs checked FlashLFQ wrote 0 multi-member protein rows. | LOW | verified `PROT:358-380` (doc A D6/D7); computed 0 rows (doc C) |
| F7 | Identity string across searches | Exact full-precision string. Two searches storing the same mod at different precision would split one peptidoform into two FlashLFQ rows (possibly zeroed as ambiguous); protein names come from each search's annotations, so one protein could become two rows. Not observed in these runs. | MEDIUM (data-dependent) | verified doc A D4/D8; computed: no psvid had two names (doc C) |
| F8 | FlashLFQ | **Not deterministic with MBR**: identical inputs → MBR cells differ between runs (2,979 cells on the reference dataset's two server reruns; 1 cell on project 90's two runs). NOT caused by `RandomSeed` — that seed only drives the Bayesian protein fold-change analysis (`--rns`, mzLib `ProteinQuantificationEngine.cs:72-79`), which is OFF (`BayesianProteinQuant = false`). The MBR PEP model is already fixed-seeded (`_randomSeed = 42`, single-threaded FastTree — mzLib `MBR/PEP/PepAnalysisEngine.cs:23-40,82`), but its training rows are appended from a `Parallel.ForEach` in thread-completion order (`PepAnalysisEngine.cs:433-458`), so row order — and hence the model, PEP/q-values and which MBR peaks pass the 0.05 cutoff — can vary. Likely cause: multithreading (`MaxThreads = -1` → cores − 1). Inferred from source; not yet confirmed by a `--thr 1` rerun. | MEDIUM (reproducibility) | verified mzLib 1.0.566 + FlashLFQ `Util/FlashLfqSettings.cs:56,88`; computed (doc C) |
| F9 | Download (quant common peptide page) | Writes each cell's sort value: a blank quant cell → `-1`, "overlapping signal" → `0`. | LOW-MEDIUM | verified in code (doc B §8); NOT checked in a real download |
| F10 | MBR any/all radio | Shown only if a loaded record is MBR — cross-search MBR values are exactly what's dropped, so it can be hidden although FlashLFQ produced MBR. | LOW | verified `quant_PrototypeData.ts:205-212` (doc B §4); inferred effect |
| F11 | Blank intensity string | A blank/unparsable peptide intensity becomes 0.0; in log2 files that is a real-looking value. | LOW | verified `JOINED:417-424` (doc A D11) |
| F12 | Stale comments / docs | "rpid embedded in Full Sequence", "PER_FILE not implemented", "default cutoffs", "reportedPeptideId per-search", REQUEST_SCHEMA saying the service builds Full Sequence. | LOW | doc A §Other, doc C |

## 4. Real-run evidence (computed — doc C)

"Own-search rule" = keep a value only if the sample's own search identified that Full Sequence (what F1 does, modulo F4).

| Run | Searches × files | Peptide complete (FlashLFQ) | after own-search rule | values lost (all MBR) | Protein complete | after rule |
|---|---|---|---|---|---|---|
| project 90, with batch correction | 4 × 1 | 2,186 | **1,212** | 2,616 of 10,811 | 447 | 269* |
| project 90, without | 4 × 1 | 2,189 | 1,212 | 2,617 | 448 | 270* |
| reference dataset | 1 × 8 | 10,308 | 10,308 | 0 | 1,807 | 1,807 |

\* The protein path does **not** apply the rule today (F5) — the charts show all 447; these columns show what the rule
*would* do, i.e. how inconsistent the peptide and protein paths are.

## 5. Decisions for the maintainer

1. **Show cross-search MBR values — DECIDED (maintainer, 2026-09-30): yes.** "If we run with MBR we should use it in
   the displayed results."
2. **Cutoffs at retrieval — DECIDED (maintainer, 2026-09-30):** every retrieval must **require** that the cutoffs it
   is given match the run's stored cutoffs (`search_data_lookup_params` in `params_manifest.json`, recorded at submit),
   and refuse on mismatch. The page then shows only a clear message (no data), like the outputs-version gate. To settle
   in the build prompt: compare only the cutoff fields (`psmFilters`, `reportedPeptideFilters`, `matchedProteinFilters`,
   `modificationPositionFilters`) per projectSearchId, order-insensitive, ignoring display-only fields such as
   `psmAnnTypeDisplay` — confirm against source which fields are cutoffs. Makes F4 impossible rather than unlikely.
3. **MBR presentation — DECIDED (maintainer, 2026-09-30).** Viewers are often not the person who ran the quant
   (Limelight is used for data dissemination and as a companion to published papers), so MBR must be unmistakable:
   - **MBR values shown by default**, with an option for the viewer to hide them.
   - **Peptides:** ONE per-value MBR marker (FlashLFQ labels each peptide value MSMS/MBR, so it is exact). No separate
     "identified in another search" level: supported runs are either one search whose sub-searches are one scan file
     each, or several searches of one scan file each — every column is one scan file, so the column already says where
     the value is. Tooltip in plain language ("not identified in this scan file; FlashLFQ found its signal using the
     identification from another scan file of this quant run"), including the case of a value next to 0 PSMs.
   - **An always-visible explanation message above the table and above the charts**: what FlashLFQ and MBR are, this
     run's MBR settings (from the run's recorded settings), and counts of MBR values. Written to invite review
     questions.
   - **Downloads** carry each value's detection type plus a header note, so exported tables keep the provenance.
4. **Protein presentation — DECIDED (maintainer, 2026-09-30).** FlashLFQ protein values are summaries of its peptide
   values, which can include MBR (verified mzLib `FlashLFQResults.cs:148-166, 388, 443`). **No per-cell protein marker**
   (a marker would be exact only when the file has 0 PSMs for the protein, would be on most rows of an MBR run, and would
   get ignored). Instead the **message above the protein table** states that protein values can include MBR. **No
   re-implementation of FlashLFQ internals** (e.g. computing which peptides fed a protein value): FlashLFQ is treated
   as a black box so it can change underneath and questions about it go to FlashLFQ. Show a true blank, not
   `0.00e+0`, where FlashLFQ has no value.
5. **FlashLFQ reproducibility (F8) — DECIDED (maintainer, 2026-09-30): keep FlashLFQ multi-threaded.** `--rns` would
   not help (it only seeds the unused Bayesian analysis); `--thr 1` would likely make runs reproducible but slower
   (FlashLFQ took 6 min 43 s of a ~40 min 8-file run at 8 busy threads; single-threaded is unmeasured). Results will be
   **persisted** once the feature stabilizes and before use in papers, so the stored values — not a rerun — are the
   record. Instead: record the FlashLFQ version and settings per run, and add one sentence to the explanation message
   that match-between-runs results can differ slightly if the same quant is re-run. Worth raising with the FlashLFQ
   developers separately (training rows appended in thread-completion order, mzLib `PepAnalysisEngine.cs:433-458`).

## 6. Plan forward (proposed; each step its own STOP-gated build prompt + review)

**Step 0 — read-only confirmations** (cheap, before building): what FlashLFQ's version command prints (for the version capture); which download path users hit (F9).

**Step 1 — server: one run-wide identity map (Java).**
- Build ONE identity → {projectSearchId → [reportedPeptideId]} map across **all** searches of the run, from the run's cutoffs
  (the page's filters, **validated against the run's stored cutoffs — refuse on mismatch**, decision 2).
- Peptide retrieval returns, per sample, every FlashLFQ row **keyed by groupId** with its value, detection type and the
  per-search reportedPeptideIds (possibly none for that sample's search) — no value dropped.
- Put the shared join in ONE place used by all four peptide controllers (raw, normalized, batch log2, batch delog2).
- Acceptance: for project 90, every value > 0 in `CombinedPeptides.tsv` reaches the front end (10,811 peptide cells > 0
  with batch correction); single-search reference run unchanged.

**Step 2 — front end: cells by groupId.**
- A quant common peptide page cell for (row, search, file) resolves the row's groupId(s) — from ANY search's reported
  peptides for that row — against that file's records, instead of only that search's reportedPeptideIds.
- Marker per decision 3; MBR radio driven by all records (F10); download writes blank as blank (F9).
- Acceptance: the EEEE case (reported only by search A) shows the MBR value in search B's column with the marker;
  counts of non-blank quant cells equal FlashLFQ's values > 0 for the rows shown.

**Step 3 — charts feed.**
- Build the feature × sample matrix from all records by groupId (no per-search restriction).
- Acceptance: project 90 peptide charts show **2,186** complete peptides and median-normalized **median range 0.00**;
  reference dataset still **10,308**, CV medians **0.452 / 0.343 / 0.209**, median range **0.00** (reference numbers
  from running the reference Python on the same run).

**Step 4 — protein page (decision 4).** Cross-search marker; blank vs 0 fix.

**Step 5 — provenance (decision 5).** Record the FlashLFQ thread setting in the manifest; add the rerun-variation sentence to the explanation message. Also record the FlashLFQ version per run (maintainer request): the GitHub release version the image was built
from, AND the raw output of a separate FlashLFQ version-query invocation (if its CLI supports one — to be observed
first), both in the run directory and `params_manifest.json`.

**Step 6 — cleanup.** Stale comments/docs (F12); blank-intensity handling (F11); F6/F7 guards (log or refuse
inconsistent mod precision / protein names across searches).

Then resume the chart-parity **round 2** (completeness step curve, MNAR trend + hexbin, ID-depth labels,
dynamic-range subtitle), whose missing-value charts depend on Step 3.

## 7. Open questions (from the detailed docs)

- Why ~100 proteins per sample are identified in their own search yet have zero intensity (unique-peptides-only protein
  quant is plausible; not checked in mzLib). Whether the service overrides FlashLFQ's shared-peptide protein default.
- Whether FlashLFQ protein intensities include MBR peptide values (doc B open question).
