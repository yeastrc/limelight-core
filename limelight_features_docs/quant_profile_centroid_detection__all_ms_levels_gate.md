# Quant profile/centroid detection — the "all MS levels must be centroid" gate

**Status:** implemented, review-verified, uncommitted (as of 2026-09-22).
**Scope:** the "Add New Quant" flow on the project page (FlashLFQ quant submission).

---

## TL;DR — the one decision to protect

A FlashLFQ quant run can only use a scan file whose **every** MS level is centroided. Limelight
detects this up front (per uploaded scan filename) and blocks non-centroid files before submit, with a
user-facing message. There are three cooperating layers: a detection **webservice**, a front-end
**upload/mapping gate**, and a server-side **submit guard**.

> **DO NOT "optimize" this to check only MS1.** FlashLFQ quantifies from MS1 scans only, so it is
> tempting to gate on the MS1 level alone. That would be a **bug**: the underlying mzLib reader parses
> **all** MS levels at file-read time and throws on **any** profile-mode spectrum — *before* FlashLFQ's
> MS1-only filter ever runs. A file with a centroid MS1 level but a profile MS2 level would pass an
> MS1-only gate and then **fail the actual run**. See "Why all levels, not just MS1" below, which is
> grounded in the mzLib source.

This gate is **not a data-correctness protection** — no incorrect quant result is ever produced either
way, because mzLib refuses to read profile data at all. It is a **convenience / fail-fast** check: it
turns a late, opaque run failure into an early, clear "this scan file isn't centroided" message. But it
must be **correctly scoped to all levels** to actually predict which files FlashLFQ can process.

---

## Why all levels, not just MS1 (grounded in mzLib source)

The reference source lives off-repo (external, downloaded for research; not part of this repo):
`/spinning-disk-02/code_downloads_for_research/from Github/mzLib`, checked out at **mzLib v1.0.566**
(git `703edec`) — the exact version FlashLFQ references
(`FlashLFQ/CMD/CMD.csproj` → `<PackageReference Include="mzLib" Version="1.0.566" />`). FlashLFQ's quant
engine (`PeakIndexingEngine`) and the mzML reader are part of the mzLib package.

1. **FlashLFQ reads the whole file first, then filters to MS1.**
   `mzLib/FlashLFQ/PeakIndexingEngine/PeakIndexingEngine.cs:32-42`
   ```csharp
   public static PeakIndexingEngine? InitializeIndexingEngine(SpectraFileInfo file)
   {
       string fileName = file.FullFilePathWithExtension;
       var reader = MsDataFileReader.GetDataFile(fileName);
       reader.LoadAllStaticData();          // <-- reads the ENTIRE file (all MS levels) FIRST
       var peakIndexingEngine = InitializeIndexingEngine(reader);
       ...
   }
   ```
   Only *afterwards* does it restrict to MS1 (`PeakIndexingEngine.cs:48-55`):
   ```csharp
   var scanArray = dataFile.GetMS1Scans()
       .Where(i => i != null && i.MsnOrder == 1)   // <-- MS1-only is the QUANT scope
       .OrderBy(i => i.OneBasedScanNumber)
       .ToArray();
   ```
   Class doc (`:28-31`, `:44-47`): *"peaks in all MS1 scans have been indexed. This method ignores MS2
   scans when indexing."* So MS1-only describes what is *quantified*, not what is *read*.

2. **The mzML reader throws on ANY profile-mode spectrum, regardless of MS level.**
   `mzLib/Readers/MzML/Mzml.cs:404-411` (streaming parse path):
   ```csharp
   // centroid mode
   case "MS:1000127":
       isCentroid = true;
       break;
   // profile mode
   case "MS:1000128":
       isCentroid = false;
       throw new MzLibException("Reading profile mode mzmls not supported");
   ```
   The identical throw exists on the random-access path (`Mzml.cs:752-754`). Crucially, this check sits
   in the per-spectrum CV-param loop and is **not conditioned on `msOrder`** — an MS2 (or any MSn)
   profile spectrum throws just as an MS1 profile spectrum does.

**Conclusion:** the set of scan files a FlashLFQ run can actually process = files in which **every** MS
level is centroided. That is exactly what this gate checks. (The verified throw is on the **mzML** read
path — the relevant one here, since the flashlfq-service produces mzML from spectr data.)

**When to revisit MS1-only:** only if a future FlashLFQ / mzLib upgrade changes *which* MS levels it
reads or rejects (e.g. if the reader stops parsing MSn spectra, or gains per-level tolerance). At that
point the accurate gate might legitimately narrow to MS1. Until then, all-levels is correct.

---

## Architecture — three layers

All Limelight-side line numbers below are against the current working tree (uncommitted) as of
2026-09-22. Front-end paths are under
`limelight_webapp/front_end/src/js/page_js/data_pages/other_data_pages/project_page/project_page_quant_section/`.

### Layer 1 — detection webservice (per-scan-level centroid booleans)

Reports, for each requested scan file, one entry **per MS level** with four booleans describing the
centroid/profile makeup of that level's scans.

- **Controller:**
  `limelight_webapp/src/main/java/.../rest_controllers/single_project_search_id/ScanFile_IsCentroidPerScanLevel_List_From_SpectralStorageSystem_RestWebserviceController.java`
  - Path constant `SCAN_FILE_IS_CENTROID_PER_SCAN_LEVEL_FROM_SPECTRAL_STORAGE_DATA` =
    `d/rws/for-page/psfb/scan-file-is-centroid-per-scan-level-from-spectral-storage-data`
    (`AA_RestWSControllerPaths_Constants.java:901-902`); `@PostMapping` JSON in/out (`:101-106`).
  - **Request** (`WebserviceRequest`, `:336-363`): `projectSearch_SearchScanFile_List` of
    `{ projectSearchId, searchScanFileId }` **and/or** `projectScanFileId_List` of ints. At least one
    non-empty, else HTTP 400 (`:131-137`); per-entry null fields also 400.
  - **Auth** (`:227-228`): a single throwing validator call
    `validatePublicAccessCodeReadAllowed( distinctProjectIds, request )` — grants READ **and** rejects a
    cross-project request via its own size-check throw (Limelight has exactly one project per request;
    see `limelight_webapp/CLAUDE.md`, "Exactly ONE project per request"). Class Javadoc `:56-59`.
  - **Dedup**: distinct inputs are resolved to a spectral-storage **API key**, then aggregated once per
    unique key via `Map<String, List<...>> perScanLevelEntries_By_APIKey` (`:234`) +
    `_fetchAndAggregate_IfNotAlreadyDone(...)` (`:289-318`, `containsKey` guard `:293`). Repeated
    files / cross-list duplicates cost one underlying fetch.
  - **Response** (`WebserviceResult`, `:369-444`): `projectSearch_SearchScanFile_ResultList` and
    `projectScanFileId_ResultList`, each echoing the input ids plus a shared
    `scanLevelEntries: [{ scanLevel (byte), <four booleans> }]`.

- **Underlying data** — spectr's per-scan `isCentroid` (nullable `Byte`; `1`=centroid, `0`=profile,
  `null`=indeterminate-without-reading-peaks), fetched via the wrapper pair
  `Call_Get_ScanData_AllScans_ExcludePeaks_FromSpectralStorageService(IF)` →
  `getScanData_AllScans_ExcludePeaks_FromAPIKey(String) : List<SingleScan_SubResponse>`.
  `SingleScan_SubResponse.isCentroid` is a nullable `java.lang.Byte` (dependency jar class).

- **Aggregator (shared with Layer 3):**
  `limelight_webapp/src/main/java/.../services/ScanFile_IsCentroidPerScanLevel_Aggregator_Service.java`
  - `aggregatePerScanLevel(List<SingleScan_SubResponse>) : List<PerScanLevelItem>` (`:37-93`) buckets
    scans by MS level (ascending `TreeMap`) and counts, per level, `n_total`, `n_centroid` (isCentroid
    `1`), `n_profile` (`0`), `n_null` (`null` or unexpected value + `log.warn`).
  - The **four per-level booleans** (`:84-87`):

    | Boolean | Meaning | Formula |
    |---|---|---|
    | `allScans_ForLevel_AreCentroid` | every scan at this level is centroid | `n_centroid == n_total` |
    | `noScans_ForLevel_AreCentroid` | every scan at this level is profile | `n_profile == n_total` |
    | `spectQueryReturned_isCentroid_Both` | mix of centroid & profile at this level | `n_centroid > 0 && n_profile > 0` |
    | `spectQueryReturned_isCentroid_AtLeastOnescanWith_IndeterminedWithoutQueryEachScanWithPeaks` | at least one scan's centroid state is indeterminate | `n_null > 0` |

  - `isAllCentroid(perLevel) : boolean` (`:99-110`) — the verdict helper, **fail-closed**: null/empty
    list → `false`; otherwise `true` only if **every** level has `allScans_ForLevel_AreCentroid == true`.

### Layer 2 — front-end upload/mapping gate (early, per uploaded filename)

Fires during the Add-New-Quant upload categorization, so the user learns about non-centroid files at the
earliest stage rather than at submit.

- **Loader:** `projPg_Quant_ScanFileIsCentroidPerScanLevel_LoadFromServer.ts`
  - Two explicit public functions (no discriminated-union public API):
    `..._Load_For_ProjectSearchId_SearchScanFileId_List` (`:88`) and
    `..._Load_For_ProjectScanFileId_List` (`:106`), both delegating to private `_load` (`:125`); URL
    const `:34`. Off-the-wire types (`:42-81`) have **all required fields** (no `?`) with runtime
    validation (`_process_WebserviceResponse` `:166`, `_validate_ScanLevelEntries` `:238`, incl.
    `typeof … !== "boolean"` on all four booleans). No memoization, no caching, no derived verdict — the
    consumer decides usable/not.

- **Pure filter:** `projPg_Quant_UploadParse_ValidateAndMapRecords.ts`, `__applyCentroidFilter(...)`
  (`:807-947`, returns `{ filteredResult, centroidErrors, isFullStop }`).
  - **Category A** (multi-scan-file sub-group search): drop the **whole** candidate if **any** of its
    record-mappings' scan files is not-usable (`:816-827`).
  - **Category B** (per-filename single-file candidates): drop the individual not-usable
    `candidateSearches` (`:835-853`).
  - **`unionCoversAll` is derived Category-B-only** (`:858`, `:861-866`: `if ( !hasCategoryB )
    unionCoversAll = false`), computed **separately** from the full-stop set (`:869-871`: full stop when
    `!anyCategoryA_Survived && !hasCategoryB`). This separation is deliberate and load-bearing: an
    earlier version reused a combined "covered" term for both, which wrongly offered route B when a
    Category-A candidate survived but a filename had zero Category-B candidates — a regression that fired
    even with all-centroid data. Do not recombine them.

- **Component:** `projPg_Quant_UploadParse_Component.tsx`
  - Fields `_centroidCheckInProgress` (`:183`), `_centroidErrors` (`:187`), `_centroidFullStop`
    (`:191`).
  - `_kickOff_CentroidGate(...)` (`:470-568`), invoked after `__categorize` in `_runValidation`
    (`:457`, guarded by `:456`): collects distinct `(projectSearchId, searchScanFileId)` pairs, calls
    the loader, then applies the **fail-closed** verdict (`:527-534`):
    ```
    usable = entry.scanLevelEntries.length > 0
             && entry.scanLevelEntries.every( e => e.allScans_ForLevel_AreCentroid === true )
    ```
    (missing pair → not usable). Has a staleness guard against a superseded parse result.
  - Render dispatch (`_render_Phase3`, `:1169`): spinner (`:1188-1190`) → **full-stop** renderer
    (`:1191-1192`, `_render_Phase3_Centroid_FullStop` `:1250`) → A/B categorize (`:1194`). The
    **soft-exclude** errors section renders inside the A/B selector (`:1655-1665`).
  - **User-facing message** (shared renderer `_render_CentroidErrors_AffectedList` `:1271-1310`): a list
    of `<error message>` → `<scan filename>` → `(<searchId>) <searchName>` lines. **Full stop** = a
    filename left with no usable candidate (hard error, submit blocked). **Soft exclude** = some
    candidates dropped but coverage remains (listed, flow continues).

### Layer 3 — server-side submit guard (final, authoritative)

Independent backstop in the submit controller — the FE gate is convenience; this is the enforced check.

- **Controller:**
  `limelight_webapp/src/main/java/.../rest_controllers/other_like_project/Quant_AddNew_Submit_JointFlashLFQ_Run_RestWebserviceController.java`
  - Guard block `:389-454`, running **after** `gatherScanFiles(...)` (`:386-387`) and **before** the PSM
    gather / service send / DB mint loop (`:469`+). It resolves each mapped
    `(projectSearchId, searchScanFileId)` → API key from the gather result, dedups by key
    (`Map<String,Boolean> isAllCentroid_By_APIKey` `:396`), is **fail-closed** on null/empty key
    (`:422-425`), and calls the **shared aggregator** (`:434-436`,
    `aggregatePerScanLevel(...)` then `isAllCentroid(...)`; injected `:170-171`).
  - On any not-usable file it returns `WebserviceResult{ status = false, notCentroidFiles = [...] }` with
    an **early return before any dispatch** (`:446-453`) — nothing is gathered, sent, or minted.
  - `WebserviceResult` (`:786`) field `notCentroidFiles` (always-serialized, `:797`); element
    `WebserviceResult_NotCentroidFile { projectSearchId, searchScanFileId }` (`:859-862`).
  - Uses public getter `getSpectralStorageAPIKey()` on
    `FlashLFQ_Run_GatherPsms_And_SendRequest_Service.SearchScanFile_APIKey_Filename`
    (`FlashLFQ_Run_GatherPsms_And_SendRequest_Service.java:850-852`).

- **FE submit loader:** `projPg_Quant_Submit_JointFlashLFQ_Run_ToServer.ts` — parses the wire field
  `notCentroidFiles` into result field **`notCentroidPairs`** (`:120`; validated `:283-303`, assigned
  `:322`).

- **FE submit component:** `projPg_Quant_SubmitRun_Component.tsx` — field `_notCentroidBlock`
  (`:201-204`); the `.then` intercepts `result.notCentroidPairs` **before** the success branch (`:803`,
  ahead of the `status === true` `else if` at `:833`), groups pairs by filename via
  `inMemoryStore.mappedRecords` (`:808-831`), and renders a blocking message
  (`_render_NotCentroidBlock` ~`:965`, invoked `:1385`): heading *"Cannot submit — scan data is not
  centroided"* (`:975`), body *"FlashLFQ (MS1 quant) requires centroided scan data at every scan level.
  …"* (`:978-979`).

---

## Consumer verdict rule (the one rule)

A scan file is usable for FlashLFQ quant **iff its `scanLevelEntries` is non-empty and every level has
`allScans_ForLevel_AreCentroid === true`**. Everything else — profile, mixed, indeterminate, empty, or
missing — is **not usable** (fail-closed). Both the FE gate (Layer 2) and the submit guard (Layer 3)
apply this identical rule; Layer 3 via the shared `isAllCentroid(...)` helper.

---

## Verification / provenance notes

- **mzLib rationale** (the "why all levels" section): verified by direct read of mzLib **v1.0.566**
  source (`PeakIndexingEngine.cs`, `Mzml.cs`) at the off-repo research checkout, 2026-09-22.
- **Limelight layers**: `file:line` grounded against the current working tree, 2026-09-22.
- **Runtime observation caveat:** no real profile-mode scan file has been run end-to-end through this
  feature — no local profile test data exists. The reject path was exercised with a **stub** forcing a
  file not-usable (submit correctly returned `status=false` + `notCentroidFiles`, nothing dispatched);
  the happy path was observed with a real **all-centroid** file. The design's correctness therefore
  rests on the mzLib behavior documented above (verified against source), not on an observed
  profile-file run. A definitive end-to-end check would require a genuine profile-mode mzML in spectr.
