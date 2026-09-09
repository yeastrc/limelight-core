# Add-New-Quant — revised eligible-search → uploaded-scan-filename matching (Category A / Category B) — DECISIONS DOC

**Status: DECISIONS RESOLVED. No code written or changed.** This doc restated the requested change, flagged the
ambiguities, and — after Dan + reviewer worked through them — now records each as a **DECISION** with its
resolution and source cite. A wrong locked decision here silently corrupts the `(projectSearchId,
searchScanFileId)` pairs that feed submit and the run hash, so every load-bearing claim is grounded against
source with `file:line` + an OBSERVED / INFERRED tag. **Implementation has not started** — this doc is the spec
the build session executes.

Date: 2026-08-19 (decisions resolved 2026-08-20). Author: assistant (for Dan). Sibling docs (source of truth
for the surrounding feature):
- `quant_add_new_quant__file_upload_parse_plan_v2_2026-08-14.md` (upload/parse/map v2 plan)
- `quant_add_new__submit_joint_flashlfq_run_and_results_page_plan_2026-08-17.md` (submit + viewer)
- `flashlfq_quant_subgroup_scanfile_eligibility.md` (the sub-group eligibility gate)

---

## 0. Restatement of the requested change (in my own words)

**Today** (the shipped Phase-3/4 flow):

1. Server-side eligibility runs first. The eligibility webservice returns EVERY project search (eligible AND
   ineligible), each with `{ projectSearchId, searchId, searchName, eligible, ineligibleReason, scanFiles[] }`
   where `scanFiles[]` = `{ searchScanFileId, filename }` from `search_scan_file_tbl`.
   *(OBSERVED — `Quant_AddNew_ProjectSearches_ScanFiles_Eligibility_List_RestWebserviceController.java:420-460`;
   high confidence.)*
2. The FE flattens **all eligible searches' scan files into one candidate pool**, and matches each uploaded
   record's column-0 filename against that whole pool via a 3-level relaxation cascade, STOPPING at the first
   level that yields any match.
   *(OBSERVED — `projPg_Quant_UploadParse_ValidateAndMapRecords.ts:327-367` (flatten + per-record match),
   `:228-257` (cascade); high confidence.)*
3. A record whose filename matches >1 candidate scan file → a per-record search **picker** (Phase 4); each
   record resolves to exactly one `(projectSearchId, searchScanFileId)`. *(OBSERVED —
   `projPg_Quant_UploadParse_Component.tsx:1038-1180`; high confidence.)*
4. A **collision check** rejects any two records that resolve to the same `searchScanFileId`. *(OBSERVED —
   `projPg_Quant_UploadParse_ResolveMappingCollisionCheck.ts:73-115`; high confidence.)*
5. The surviving resolved records build the in-memory store, which feeds submit + the run hash. *(OBSERVED —
   `projPg_Quant_UploadParse_BuildInMemoryStore.ts:68-108`; high confidence.)*

**The change** replaces the "flatten everything into one candidate pool + per-record picker across all searches"
model (steps 2–3) with a **two-category model**, still operating **only within the already-eligible set**. The
category key is simply **`scanFiles.length`** — see Decision-2 for why that is provably equivalent to
"has sub-groups", so no sub-group flag crosses the wire:

- **Category A — a multi-scan-file (sub-group) search as an ATOMIC unit** (`scanFiles.length > 1`). Compute
  **strict BIJECTION** between the search's scan-filename set and the uploaded file's full column-0 filename set
  (see Decision-3). Only searches that pass are Category-A candidates. A Category-A pick is a **single top-level
  choice** that accounts for **all** uploaded files at once.

- **Category B — single-scan-file searches, matched per-file** (`scanFiles.length == 1`), listed below
  Category A. Offered as a route **only if the union of these single-scan-file searches covers ALL uploaded
  filenames**. A given uploaded filename may match >1 single-scan-file search → a **per-filename selector**
  resolves which search to use.

- **Top-level selection is mutually exclusive:** the user selects **either** one Category-A search (one pick,
  covers all files) **or** the Category-B route. Only after choosing Category B do they resolve, per uploaded
  filename that matches >1 single-scan-file search, which search to use.

**Invariant that must not change:** both routes must still yield, per uploaded record, exactly one
`(projectSearchId, searchScanFileId)` pair (aligned with that record's metadata cells), because that is what
the in-memory store → submit (`mappedFiles`) → run hash (`qr;<psid>_<ssfid>_<requestId>-…`) consume unchanged.
*(OBSERVED — `projPg_Quant_SubmitRun_Component.tsx:121-152`, `projPg_Quant_BuildRunHash.ts` BuildHashFragment;
high confidence.)*

---

## 1. The existing scan-filename matching code (locate + characterize)

**Location (OBSERVED, high confidence):**
- Normalization: `projPg_Quant_UploadParse_ValidateAndMapRecords.ts:169-176`
  - `_normalizedKey(value) = value.trim().toLowerCase()` — the ONE canonical key.
  - `_equalsNormalized(a,b) = _normalizedKey(a) === _normalizedKey(b)`.
- The cascade: `_matchFilename_AgainstCandidates` — `projPg_Quant_UploadParse_ValidateAndMapRecords.ts:228-257`.
- Extension stripping: `projPg_Quant_AddNew_StripFilenameExtension__StripFinalExtension` (final extension
  removed; the Limelight side's stripped form is precomputed once at load in
  `projPg_Quant_AddNew_Get_EligibleSearches_ScanFiles_FromServer.ts:273-277`).

**Exactly what it matches (OBSERVED, high confidence):**
- **Case sensitivity:** case-INSENSITIVE (`toLowerCase`). Locale-invariant (deliberately not `localeCompare`).
- **Whitespace:** surrounding whitespace trimmed on both sides.
- **Path stripping:** NONE. It matches the recorded `search_scan_file_tbl.filename` verbatim (modulo case/trim/
  extension). There is no directory-path stripping (see Decision-4 — kept as-is).
- **Extension handling — 3 progressive levels, stop at first level with any match:**
  - L1 exact: `userName == limelightName`
  - L2: `userName == stripExt(limelightName)` (user gave no extension)
  - L3: `stripExt(userName) == stripExt(limelightName)` — **only if** the user name itself has a strippable
    extension.
- **Accent-distinct / digit-distinct** (does not strip accents).

**Suitability for SET-EQUALITY / MEMBERSHIP:** the cascade is a **one-user-filename → many-candidates** lookup
that **returns all matches at the first non-empty level** — a directional membership test, not a symmetric
equality, and its relaxation can be **many-to-one** (e.g. uploaded `Sample1.raw` and `Sample1.mzML` both relax
to a search's single `Sample1.mzML`). That is exactly why Category A is defined as a strict **bijection**, not
"both directions cover" (Decision-3). *(OBSERVED behavior + INFERRED many-to-one risk; high confidence.)*

---

## 2. "Search has sub-groups", the scan-filename set, and the eligibility gate

**How sub-group presence is determined (OBSERVED, high confidence):**
- Server: `SearchItemMinimal.isSearchHasSubgroups()` (`SearchItemMinimal.java:81-85`), populated from
  `search_tbl.has_search_sub_groups` by `SearchListForProjectIdSearcher.java:45-79`. The eligibility controller
  already reads it (`…Eligibility_List_RestWebserviceController.java:301`).
- The flag is **NOT sent to the FE** (`WebserviceResult_Search` has no such field —
  `…Eligibility_List_RestWebserviceController.java:420-447`), and per Decision-2 it **stays that way** —
  categorization keys on `scanFiles.length` instead.

**Importer grounding — why `has_search_sub_groups == true` provably means ≥ 2 sub-groups (OBSERVED, high
confidence):** `ProcessLimelightInput.java:135-139` sets `skip_SubGroup_Processing = true` when
`searchSubGroupnamesLimelightXMLInputSet.size() < 2` (comment: *"Zero or One Sub Group on PSMs so SKIP Sub
Group Processing"*); `:216-220` then sets `searchDTO.setHasSearchSubGroups(false)` when skipped, `true`
otherwise; and the sub-group DTO rows are written only when NOT skipped (`:290-292`). So the importer **never
stores a lone sub-group** — a search either has ≥ 2 sub-groups (`has_search_sub_groups = true`) or none
(`false`). This is the fact that makes the single-file-with-one-sub-group edge impossible and underpins
Decision-1 and Decision-2.

**Enumerating a search's scan-filename set (OBSERVED, high confidence):** it is already the `scanFiles[]` the
eligibility WS returns — `{ searchScanFileId, filename }` per `search_scan_file_tbl` row. Real source column is
**`search_scan_file_tbl.filename`** (`SearchScanFile_AndAssociatedData_For_SearchIds_Searcher.java:62` selects
`search_scan_file_tbl.*`, read as `rs.getString("filename")` at `:113`), NOT `scan_file_tbl.filename`. No
per-sub-group enumeration is needed (the run keys on `searchScanFileId`, not `searchSubGroupId` — Decision-3).

### DECISION-1 — REORDER the server-side eligibility gate (a real backend change)

Move the `hasSubGroups`-flag check **ahead of** the scan-file-count short-circuit, so a search with sub-groups
always runs the two 1:1 searchers regardless of scan-file count. New order in
`…Eligibility_List_RestWebserviceController.java` (replacing the current `:269-339` cascade):

1. `!has_scan_data` → `SEARCH_HAS_NO_SCAN_DATA`
2. open mods → `HAS_OPEN_MODIFICATIONS`
3. dynamic mods → `HAS_DYNAMIC_MODIFICATIONS`
4. **`else if search.isSearchHasSubgroups()`** → run BOTH existing searchers **regardless of scan-file count**:
   - `Search_AnyScanFile_HasPsms_In_MultipleSubGroups…` TRUE → `SUB_GROUPS_CROSS_CUT_SCAN_FILES`
   - else `Search_AnySubGroup_HasPsms_In_MultipleScanFiles…` TRUE → `SUB_GROUP_SPANS_MULTIPLE_SCAN_FILES`
   - else → eligible
5. `else if scanFiles.size() <= 1` → eligible
6. `else` (>1 scan file, no sub-groups) → `MULTIPLE_SCAN_FILES_WITHOUT_SUB_GROUPS`

**No count check inside the sub-group branch, no new `ineligibleReason`, no new searcher, no new plumbing** — it
only reorders existing checks. **Behavior change (intended):** a single-scan-file search with ≥ 2 sub-groups all
on that one file flips **eligible → ineligible** via `SUB_GROUPS_CROSS_CUT_SCAN_FILES` (previously it slipped
through gate-(c) as eligible). This **edits previously-reviewed, shipped-but-uncommitted code** — call it out in
the commit. Grounding: because `has_search_sub_groups == true` ⇒ ≥ 2 sub-groups (above), the flag-gated
CROSS_CUT check is the correct guard and the single-file-≥2-sub-groups case is real and must be caught.

**Consequence for the FE (the point of the reorder):** after this gate, **eligible + `scanFiles.length > 1` ⟺
a clean multi-file sub-group search** and **eligible + `scanFiles.length == 1` ⟺ a plain single-file search** —
which is what lets the FE categorize purely on `scanFiles.length` (Decision-2).

---

## 3. Category A — strict BIJECTION (the sets, dedupe, source)

**The two sets compared:**
- **Uploaded set** = the set of column-0 values across all records, after gate-1 (non-empty) and gate-2
  (uniqueness under `_normalizedKey`) have run — so it has no intra-set duplicates. *(OBSERVED gates —
  `projPg_Quant_UploadParse_ValidateAndMapRecords.ts:274-322`; high confidence.)*
- **Search set** = the eligible multi-file search's `scanFiles[].filename` (real source
  `search_scan_file_tbl.filename`, §2).

### DECISION-3 — Category A candidacy = strict bijection

A search (`scanFiles.length > 1`) is a Category-A candidate **iff** `|searchScanFiles| == |uploadedSet|` AND
there is a **perfect one-to-one matching** between the search's scan files and the uploaded filenames under the
existing cascade (`_matchFilename_AgainstCandidates`) — each uploaded filename matches exactly one distinct
search scan file and vice-versa. **Not** loose "both-directions-cover" (the cascade's first-non-empty-level
relaxation is many-to-one, so cover ≠ bijection — §1). The existing per-`searchScanFileId` collision check
(`projPg_Quant_UploadParse_ResolveMappingCollisionCheck.ts:73-115`) **stays as the backstop**.

### DECISION-3b (was OQ-3) — the Category-A unit is the scan file, confirmed

The submit/hash carry only `(projectSearchId, searchScanFileId)` — no `searchSubGroupId`
(`projPg_Quant_SubmittedRun.ts:30-33`, `projPg_Quant_BuildRunHash.ts` BuildHashFragment; OBSERVED). Category A
**never enumerates or sends `searchSubGroupId`**; "one pick accounts for all files" means "all of the chosen
search's scan files". Once a Category-A search is chosen, each uploaded filename resolves (cascade, restricted
to THAT search's scan files) to its one scan file's `searchScanFileId`; all records carry that search's
`projectSearchId`; the bijection guarantees distinct `searchScanFileId`s so the collision check trivially
passes.

### DECISION-4 (was OQ-4) — dedupe + path handling

The strict bijection **naturally excludes any duplicate-filename search** (a search with two rows sharing a
normalized filename cannot form a 1:1 matching with distinct uploaded filenames) — no separate dedupe rule is
needed. **No directory-path stripping** is added; the A/B comparison matches today's cascade behavior exactly
(§1).

---

## 4. Category B — union-covers-all, identification, per-filename selector, collision check

### DECISION-2 — categorize on `scanFiles.length`, NO wire change (resolves OQ-1 + drops OQ-BE)

Among **eligible** searches: **Category A = `scanFiles.length > 1`; Category B = `scanFiles.length == 1`.**
Because (a) the importer never stores a lone sub-group (§2: `has_search_sub_groups == true` ⇒ ≥ 2 sub-groups)
and (b) the reordered gate-(6) makes multi-file-no-sub-groups ineligible (Decision-1), we have **eligible + >1
file ⟺ a clean multi-file sub-group search**, and **eligible + 1 file ⟺ a plain single-file search**. So
`scanFiles.length` is **exactly equivalent to `hasSubGroups`** for the eligible set, the
1-sub-group-1-file edge cannot exist, and the single-file-with-sub-groups edge is now ineligible (Decision-1).
**Therefore `hasSubGroups` is NOT added to the webservice** — OQ-BE is dropped; **no backend WS/DTO change and
no FE-loader change** for a sub-group flag. (The only backend change is the Decision-1 gate reorder.)

**"Union covers all uploaded filenames" gating:** the Category-B route is OFFERED iff, for every uploaded
filename, ≥ 1 single-scan-file search's one scan file matches it under the cascade. If any uploaded filename is
uncovered, Category B is not offered.

### DECISION-6 (was OQ-6) — reuse the existing picker; retain the collision check

The Category-B per-filename >1-search selector **reuses the existing picker mechanism** (`_pickerSelections`
keyed by recordNumber → `{projectSearchId, searchScanFileId}` — `projPg_Quant_UploadParse_Component.tsx:169`,
`:1145-1180`), scoped to the single-scan-file matches (for a single-file search, "pick a search" ≡ "pick a
`searchScanFileId`"). The **resolved-mapping collision check is RETAINED for Category B** and is still
load-bearing: two uploaded filenames could pick the same single-file search, or two distinct uploaded names
could relax onto the same single search file — the collision check catches both.

### DECISION-7 (was OQ-7) — covering subset is fine

Category B requires only that the **union** of single-file searches covers all uploaded filenames; a covering
subset is acceptable and unused single-file searches are fine.

---

## 5. Top-level mutually-exclusive A-vs-B selection (the biggest structural change)

**UI/state model:**
- After gates 1–2, compute: `categoryA_Candidates` (bijection-passing multi-file searches, each with its
  per-uploaded-filename → `searchScanFileId` matching) and `categoryB` (per-filename single-file candidate
  lists + a union-covers-all flag).
- **Present** Category A first (a radio list of qualifying searches — pick ONE), Category B below (a "use
  single-scan-file searches" route). A **single top-level route state** makes A and B mutually exclusive:
  either `selectedCategoryA_ProjectSearchId` is set, or `route === "B"`.
- Choosing a Category-A search resolves all records (bijection) → resolved summary + collision check (trivially
  passes) → Save.
- Choosing the Category-B route reveals the per-filename selectors for the >1-match filenames; when all are
  chosen → Confirm → collision check → resolved summary → Save.

### DECISION-9 (was OQ-9) — multiple Category-A matches → radio list, no auto-pick

If several multi-file searches each pass the bijection, present them as a radio list; the user picks exactly
one. **No auto-pick even when there is exactly one candidate** (consistent with the existing "never silently
default" stance in the current picker).

### DECISION-5 (was OQ-5) — keep gates 1–2; replace gate-3 + Phase-4 cross-search picker

Order: gate-1 (non-empty column-0) → gate-2 (uniqueness under `_normalizedKey`) → **NEW A/B categorization**,
replacing gate-3 (flatten-pool existence, `ValidateAndMapRecords.ts:324-411`) and the Phase-4 cross-search
per-record picker (`projPg_Quant_UploadParse_Component.tsx:1038-1180`). Gates 1–2, `_normalizedKey`, and the
cascade are kept and reused.

### DECISION-8 (was OQ-8) — keep the rich failure report, re-framed

When **neither** a bijection-passing Category-A search exists **nor** Category B covers all uploaded filenames →
failure: **keep the current rich NOT_FOUND report** (per-filename, ineligible-search explanation,
available-eligible-filenames list — `projPg_Quant_UploadParse_Component.tsx:952-1003`), **re-framed as "neither
route available."**

---

## 6. Output contract (preserved)

**Both paths still yield, per uploaded record, exactly one `(projectSearchId, searchScanFileId)`** aligned with
that record's metadata cells:
- Submit sends `mappedFiles = mappedRecords.map(r => ({projectSearchId, searchScanFileId}))`
  (`projPg_Quant_SubmitRun_Component.tsx:121-125`; OBSERVED). Server maps `searchScanFileId → service
  scan_file_id` (D7).
- Hash is `qr;<projectSearchId>_<searchScanFileId>_<requestId>-…` (`projPg_Quant_BuildRunHash.ts`
  BuildHashFragment; OBSERVED).
- Both derive from the in-memory store's `mappedRecords` (`projPg_Quant_UploadParse_BuildInMemoryStore.ts:97-104`;
  OBSERVED).

The store/record shape (`…BuildInMemoryStore__StoredMappedRecord`: `recordNumber, userScanFilename,
projectSearchId, searchId, searchScanFileId, metadataCells`) is **unchanged**; only the code that *produces* the
resolved records changes. Category A and Category B each resolve records exactly as Phase-4 does today, differing
only in the candidate set (one chosen search vs the whole pool) and the selection UI.

---

## 7. Eligibility interaction (gates run first; categorize within eligible)

- **Confirmed (OBSERVED):** eligibility is computed server-side, first; the FE only categorizes `eligible ===
  true` searches. Ineligible searches are used only to explain misses (retained, re-framed — Decision-8).
- **Reconciliation with D-ELIG (multi-file-no-sub-groups ineligible, reordered gate-(6)):** such searches never
  reach A or B. Combined with Decision-1's sub-group branch, **among eligible searches** `scanFiles.length`
  cleanly separates A (>1) from B (==1) — Decision-2.
- **Single-file-with-sub-groups:** now **ineligible** via Decision-1 (`SUB_GROUPS_CROSS_CUT_SCAN_FILES`), so it
  never reaches categorization — the former OQ-1 ambiguity is eliminated at the gate rather than handled in the
  FE.

---

## 8. DEFERRED to a separate later round — the "no PSMs pass filters" flag (do NOT design now)

Recorded as a follow-on; **out of scope for this change** and not to be designed here:

- **Trigger is whole-run-zero, not per-file.** Per FlashLFQ run, gather all PSMs across its one-or-more scan
  files at the server-side default cutoffs; if the **total is zero**, activate "no PSMs" handling and **never
  run FlashLFQ with nothing to send**.
- **MBR nuance (context only):** a single scan file / sub-group with no passing PSMs is fine when MBR is on
  (peaks inferred from other runs), which is exactly why the trigger is the whole-run total, not per-file.
- **Interim shape (until DB storage), specifics deferred:** the submit webservice flags "no PSMs" in its
  response → the JS sets a distinct marker in the URL hash → the view pages show a "no quant / no PSMs passed"
  state. The hash-marker specifics are deferred to that round.
- **Pre-existing gap, separate track:** the existing quant pages (peptide page, etc.) have the same gap; Dan
  will raise that separately. Not addressed here.

---

## 9. Affected files (path — what would change)

**Backend — one real change (the gate reorder, Decision-1):**
- `…/rest_controllers/other_like_project/Quant_AddNew_ProjectSearches_ScanFiles_Eligibility_List_RestWebserviceController.java`
  — reorder the eligibility cascade (`:269-339`) so the `isSearchHasSubgroups()` branch runs the two existing
  1:1 searchers **before** the scan-file-count short-circuit (Decision-1). No new query, no new
  `ineligibleReason`, no DTO/response-shape change. **Edits shipped-but-uncommitted, previously-reviewed code.**

**Backend — NOT changed (OQ-BE dropped):** no `hasSubGroups` field added to `WebserviceResult_Search`; no
response-DTO change.

**Front end — data shape:** **no change** to
`projPg_Quant_AddNew_Get_EligibleSearches_ScanFiles_FromServer.ts` (no sub-group flag added — Decision-2;
categorization uses the already-present `scanFiles`).

**Front end — matching/mapping core (the substance of the change):**
- `projPg_Quant_UploadParse_ValidateAndMapRecords.ts` — replace gate-3 (flatten-pool existence) with A/B
  categorization producing: `categoryA_Candidates` (bijection-passing `scanFiles.length > 1` searches, each with
  its per-uploaded-filename → `searchScanFileId` matching), `categoryB` (per-filename single-file candidate
  lists + union-covers-all flag), and a re-framed "neither route available" not-found payload. Keep gates 1–2,
  `_normalizedKey`, and the cascade (reused).
- `projPg_Quant_UploadParse_ResolveMappingCollisionCheck.ts` — **unchanged** (retained backstop).
- `projPg_Quant_UploadParse_BuildInMemoryStore.ts` — **unchanged** (same resolved-record → store shape).

**Front end — UI:**
- `projPg_Quant_UploadParse_Component.tsx` — replace the Phase-4 cross-search per-record picker with (i) a
  top-level mutually-exclusive A-vs-B selector (Decision-5, Decision-9), (ii) a Category-B per-filename selector
  reusing the existing picker mechanism (Decision-6); wire each route to the collision check → resolved summary
  → Save. Submit/hash path unchanged.

**Front end — unchanged (verified consumers of the preserved contract):**
- `projPg_Quant_SubmitRun_Component.tsx`, `projPg_Quant_Submit_JointFlashLFQ_Run_ToServer.ts`,
  `projPg_Quant_BuildRunHash.ts`, `projPg_Quant_SubmittedRun.ts`, `projPg_Quant_Single_Maint_OverlayContainer.tsx`.

---

## STOP

Decisions are resolved and recorded above. **No code has been written or changed.** Awaiting go-ahead (expected
as gated build prompts) before implementing — starting with the Decision-1 backend gate reorder, then the FE
A/B categorization core, then the UI.
