# Reusable building blocks — Storage, files, external services

Part of the reusable-building-blocks inventory; start at [README.md](README.md) (keyword index, quick picks, duplicates).
Counts and user lists are as of 2026-11-09 and approximate; grep before relying on them.

This area covers where Limelight keeps files and how it talks to services outside its own database: the YRC
File Object Storage service (FOS, long-lived stored files), the spectral storage service ("spectr", scan data),
AWS S3 (optional upload storage), the upload temp / import work directories and their cleanup, in-memory and
on-disk caches (including the versioned webservice response cache), hand-written outbound HTTP clients (blib,
feature detection, run importer callback, submit-import connector), email sending, file downloads, and hashing.


Abbreviations: `J` = `limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp`;
`IMP` = `limelight_importer/src/main/java/org/yeastrc/limelight/limelight_importer`;
`SC` = `limelight_shared_code/src/main/java/org/yeastrc/limelight/limelight_shared`;
`DP` = `limelight_webapp/front_end/src/js/page_js/data_pages`.

## Quick picks

| If you need to... | Reuse this | Entry |
|---|---|---|
| Store a long-lived file (FASTA, scan file, new result file) from a Java batch program | importer FOS send classes + `Process_FileObjectStorage_Files_SaveAndAddToDB` | [FOS upload client + save-and-register (importer)](#yrc-file-object-storage-upload-client--save-and-register-importer) |
| Stream a stored FOS file to the browser | copy `FileObjectStorageEntry_Download_Controller` (no webapp FOS service exists) | [FOS stream-through download](#file-object-storage-stream-through-download--read-webapp) |
| Upload a small binary file from the browser into FOS | `StructureFile_Contents_UploadData_RestWebserviceController` template | [FOS upload from a webapp REST call](#file-upload-to-file-object-storage-from-a-webapp-rest-call-structure-file-template) |
| Find the FOS API key for a file | `FileObjectStorage_Data_FOR_*_Searcher` | [FOS lookups](#file-object-storage-lookups-searchers) |
| Read scan data / peaks / scan numbers in the webapp | `Call_Get_*` wrappers via `CallSpectralStorageWebservice_ForThisApp_FactoryIF` | [Spectr webapp client](#spectral-storage-spectr-client-in-the-webapp-factory--call_get_-wrappers) |
| Send a scan file to spectr / get its API key in the importer | `ScanFileToSpectralStorageService_*` | [Spectr import client](#spectral-storage-import-client-send-scan-file-poll-for-api-key-get-scan-numbers) |
| Fail an import when a PSM scan number is missing from spectr | `PostProcess_ValidateAllScanNumbersOnPSMsInScanFiles` | [Importer scan file handling](#importer-scan-file-handling-send-to-spectr-attach-api-keys-validate-psm-scan-numbers) |
| Cache an expensive, immutable-after-import webservice response | `Cached_WebserviceResponse_Management_IF` + `-version-N` path | [Versioned webservice response cache](#versioned-webservice-response-cache-memory--disk-cached_webserviceresponse_management) |
| Add a clearable in-memory cache | Guava `LoadingCache` in `SoftReference` + `CachedData_InMemory_CentralRegistry_IF` | [Guava in-memory cache pattern](#guava-in-memory-cache-component-pattern-registered-with-the-central-registry) |
| Gzip a response / check Accept-Encoding | `Gzip_ByteArray_To_ByteArray_IF` + `RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF` | [Gzip helpers](#gzip--gunzip-byte-array-helpers-and-gzip-accept-check) |
| Find the upload temp dir / per-job import dir | `Limelight_XML_ImporterWrkDirAndSbDrsCmmn` + `Limelight_XML_Importer_Work_Directory_And_SubDirs_Web` | [Upload temp + work dir layout](#upload-temp-directory-and-import-work-directory-layout) |
| Delete a directory tree | webapp `DeleteDirectoryAndContentsUtil` (throws) / run importer `DeleteDirectoryAndContents` (logs) | [Recursive directory delete](#recursive-directory-delete-two-implementations) |
| Get the S3 bucket/region for uploads | `Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values` | [S3 bucket / region resolution](#s3-upload-bucket--region-resolution-shared) |
| Upload a large file from the browser | `ProjectPage_UploadData_SendUploadFileToServer` + V2 chunk controllers | [Chunked browser upload](#chunked-browser-file-upload-with-per-chunk-sha-256-v2-front-end-sender--server-controllers) |
| Put non-ASCII metadata in an HTTP header | `HttpHeaderValue_Base64_Encoding` (Java) / `httpHeaderValue_Base64_EncodeDecode.ts` | [HTTP header Base64](#http-header-value-base64-utf-8-encodedecode-java--typescript-twins) |
| Call an external JSON webservice from the webapp | copy `BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService` (no shared helper) | [Outbound JSON webservice call](#calling-an-external-json-webservice-from-the-webapp-blib-status-call-class) |
| Drive a long external job (submit, poll, cancel) from a Java program | feature-detection `RunFeatureDetectionService_Communication` + poll loop | [Submit/poll/cancel client](#submit--poll--cancel-client-for-an-external-job-service-feature-detection) |
| Send an email | `SendEmailIF` + `SendEmailItem` | [Sending email](#sending-email-smtp-sendemail--sendemailitem) |
| Let the browser download a large server-generated file | form-POST `d/dnld/...` controller + download identifier | [Form-POST download controllers](#form-post-file-download-controllers-ddnld) |
| Save client-built text as a file | `StringDownloadUtils.downloadStringAsFile` | [Download a string as a file](#download-a-string-as-a-file-stringdownloadutils) |
| Call the webapp's submit-import webservices from Java (Java 8) | `CallSubmitImportWebservice` | [Submit-import client connector](#submit-import-http-client-connector-callsubmitimportwebservice) |

---

## File Object Storage (FOS)

### YRC File Object Storage upload client + save-and-register (importer)
- What it solves: Stores a file (FASTA, other submitted files, scan files) in the external, content-addressed YRC File
  Object Storage service and records it in Limelight: get-or-insert `file_object_storage_main_entry_tbl` (API key + file
  type), ensure the file-type lookup row, link to the search (`file_object_storage_to_search_tbl`), and record
  first-import provenance (size, SHA1, path or S3 info) in `file_object_storage_source_first_import_tbl`. Upload by shared
  filesystem path (if the importer config allows), by bytes, or by streaming an S3 object. FASTA is gzip-compressed.
- Search keywords: file object storage, FOS, YRC file object store, store file, save file, FASTA storage, api key, gzip,
  content hash, upload file to storage, file_object_storage_main_entry, blob storage, long-lived file
- Location: limelight_importer. Clients: `IMP/yrc_file_object_storage_interface/FileToYRCFileObjectStorageService_SendFile`
  (`getNewInstance().sendFileToYRCFileObjectStorageService(File, gzip)`; result `..._SendFile__Result` with
  `getApiKey_Assigned()`, `isNotConfigured()`), `FileToYRCFileObjectStorageService_Send_AWS_S3_Location`
  (`sendToYRCFileObjectStorageService(FileImportTrackingSingleFileDTO, gzip)`). Orchestrator:
  `IMP/process_input/Process_FileObjectStorage_Files_SaveAndAddToDB.process_FileObjectStorage_Files_SaveAndAddToDB(searchId|null, allEntries)`;
  containers `IMP/objects/FileObjectStorage_FileContainer(_AllEntries)`. DAOs: `IMP/dao/FileObjectStorage_MainEntry_DAO_Importer`,
  `FileObjectStorage_MainEntry_FileTypeLookup_DAO_Importer`, `FileObjectStorage_ToSearch_DAO_Importer`,
  `FileObjectStorage_SourceFirstImport_DAO_Importer`. Client jar `libs_yeastrc_github_jars/file_object_store_client_connector_code.jar`
  (`CallYRCFileObjectStoreWebservice`). Config key: `YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL`; scan files also gated by
  `SCAN_FILE_SAVED_TO_FILE_OBJECT_STORAGE_KEY`.
- Used by: `ProcessLimelightInput`, `Process_ScanFiles_ONLY_Main__No_LimelightXMLFile` (searchId null);
  `ScanFileDAO_Importer.update_FileObjectStorage_MainEntry_Id_For_ScanFileId` ties scan files to an entry.
- How to use / extend: For a new kind of stored file from a Java batch program, add a `FileObjectStore_FileType_Enum`
  value (shared code) + lookup row (see FOS tables entry), build a container and call the orchestrator; pass `null`
  searchId for non-search imports. The quant storage design doc
  (`limelight_features_docs/quant_runs__storage_in_db_and_file_object_storage__design_2026-11-05.md`) plans to store files here.
- Do not use when: in the webapp (it calls `CallYRCFileObjectStoreWebservice` directly and has `FileObjectStorage_MainEntry_DAO_Webapp`);
  for regenerable output or temp uploads.
- Limits and gotchas: If the base URL is not configured, send returns `notConfigured=true` and the orchestrator returns
  immediately, skipping all remaining files (FOS is optional per install). Main-entry insert is "select, try insert (swallow
  exception), select again" because another importer may insert the same key concurrently (`SkipLogInsertException.YES` on
  the second attempt). Possible defect seen in code, not runtime-tested: the "send file location" env-var override reads an
  env var named by the dotted property name instead of `LIMELIGHT_IMPORTER_FILE_OBJECT_STORAGE_SEND_FILE_LOCATION`, so that env
  override does not work (properties file does) — see importer config entry.
- Related / duplicates: webapp FOS read/upload entries below (separate client code, separate main-entry DAO); FOS tables entry.
- Status: verified (orchestrator first about 110 lines read; S3 variant skimmed) (re-checked)

### File Object Storage stream-through download / read (webapp)
- What it solves: Fetches a stored file from FOS by its API key and returns it to the browser (as a download or as bytes
  to JS), passing gzip through when the client accepts it.
- Search keywords: file object storage, FOS, stored file, get file, download stored file, scan file download, structure file
  contents, gzip passthrough, CallYRCFileObjectStoreWebservice
- Location: limelight_webapp. `J/spring_mvc_parts/data_pages/data_download_controllers/FileObjectStorageEntry_Download_Controller`
  (by `fileObjectStorageForSearch_Id` + projectSearchId), `.../ScanFileContents_StoredIn_FileObjectStorage_Download_Controller`
  (by searchScanFileId + projectSearchId, or by projectScanFileId; private `doActualDownload`),
  `.../rest_controllers/structure_file_data__tied_to_project_id/StructureFile_Get_FileContents_For_StructureFileId_RestWebserviceController`
  (bytes to JS; gunzips via `GUNzip_ByteArray_To_ByteArray` when the client does not accept gzip).
- Used by: front end `searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers.tsx`,
  `projectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component.tsx`,
  `CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value.ts`.
- How to use / extend: base URL from `ConfigSystemDAO.getConfigValueForConfigKey(ConfigSystemsKeysSharedConstants.YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL)`;
  `CallYRCFileObjectStoreWebservice.getInstance().init(...)`; `call_GetFile_Webservice(Get_StoredFileObjectContents_Request)` with
  `setReturnAs_GZIP_IfAvailable`; copy `getInputStream_FileObjectContents()` in 32 KB chunks; close in `finally`. API key from
  the FOS lookup searchers. Always do the project access check in the controller itself, before fetching from FOS.
- Do not use when: you want a reusable service — none exists in the webapp; consider extracting one rather than adding another copy.
- Limits and gotchas: "API key NOT FOUND" from the storage service is not handled (TODO comments in both download controllers and
  the structure-file get). Structure-file get buffers the whole file in a `byte[]`. Use the access level appropriate to the data
  ([security_access_control_sessions.md](security_access_control_sessions.md)).
- Related / duplicates: client setup + stream copy repeated in 3 controllers + the structure-file upload; importer-side client.
- Status: verified (re-checked)

### File upload to File Object Storage from a webapp REST call (structure-file template)
- What it solves: Accepts a raw binary upload (`application/octet-stream`) plus JSON metadata, validates size and SHA-256,
  stores the bytes in FOS (gzip-compressed), get-or-inserts a `file_object_storage_main_entry` row, and inserts the domain rows
  in a DB transaction.
- Search keywords: upload file, binary upload, octet-stream, store file, file object storage upload, base64 header params, body
  prefix, SHA-256 check, PDB upload, mmCIF upload, structure file
- Location: limelight_webapp, `J/spring_mvc_parts/data_pages/rest_controllers/structure_file_data__tied_to_project_id/StructureFile_Contents_UploadData_RestWebserviceController`
  (`d/rws/for-page/structure-file-contents-upload-data`).
- Used by: front end `CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_DAO.ts`.
- How to use / extend: metadata JSON goes base64-encoded in header `limelight_upload_file_params_json_base_64` (decode with
  `HttpHeaderValue_Base64_Encoding.decode_HttpHeaderValue_Base64_ToString`). Extra structured data rides as a body prefix whose
  length and SHA-256 are in headers (`limelight_upload_structure_file_chains_id_label_auth_json_body_prefix_byte_length` /
  `..._sha_256`); the rest of the body is the file. Gate on `IsFileObjectStorageFileImportAllowedViaWebSubmit`; check access with
  the `ValidateWebSessionAccess_*` helpers. Store with `call_UploadFile_UploadFile_Pass_Filename_InputStream_Size_Service`
  (`setGzipCompressContents(true)`), then `FileObjectStorage_MainEntry_DAO_Webapp.get_Id_For_FileTypeId_AND_FileObjectStorageStorageAPIKey`
  / `saveToDatabase` with a retry-read on insert failure, then the transaction service
  `StructureFile_Like_PDB_File_DTO_AndChildren_Insert_UsingDBTransactionService`.
- Do not use when: the file is large or must be chunked — the whole body is held in memory (capped by
  `StructureFile_Like_PDB_Constants.MAX_FILE_SIZE_IN_BYTES`, 50 MB); use the chunked upload.
- Limits and gotchas: rejects if bytes read != Content-Length. Structure-file delete does not remove the stored FOS object.
  Length-prefixed metadata idea is also described in
  `limelight_features_docs/upload_metadata_length_prefixed_in_body.md` (lead only).
- Related / duplicates: importer get-or-insert of the main entry (`Process_FileObjectStorage_Files_SaveAndAddToDB`), not compared in detail.
- Status: verified

### File Object Storage lookups (searchers)
- What it solves: find the FOS API key (and import filename) for a scan file or a file attached to a search, and list FOS files
  attached to searches (filter by file type).
- Search keywords: file object storage, FOS, api key, stored file, attached files, scan file contents, file_type_id
- Location: limelight_webapp `J/searchers/`: `FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher`,
  `FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher`, `FileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId_Searcher`,
  `FileObjectStorage_ForSearch_ForSearchIdsSearcher` (nested `..._RequestParams`: `setSearchIds`, `setFileTypeIds_Include`, `setFileTypeIds_Exclude`).
- Used by: `ScanFileContents_StoredIn_FileObjectStorage_Download_Controller`, `FileObjectStorageEntry_Download_Controller`, `Get_SearchDetails_All_RestWebservice`.
- How to use / extend: get the key here, then call the FOS client. When a search context exists, prefer the
  `..._AND_SearchId` variants.
- Do not use when: you need the bytes (keys/metadata only).
- Limits and gotchas: in `FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher` the getter is `getFilename_at_import()`
  but the value is `search_scan_file_tbl.filename`.
- Related / duplicates: spectr API key lookups (similar shape).
- Status: verified (re-checked)

### File Object Storage tables and file-type enum
- What it solves: DB side of FOS: entries keyed by API key + file type, links to searches / project searches, first-import provenance.
- Search keywords: file object storage, FOS, file_object_storage, api key, file type, attach file to search, blob storage
- Location: `database_scripts/install/` (001) and `version_upgrades/` (upgrade 8): `file_object_storage_main_entry_file_type_lookup_tbl`,
  `file_object_storage_main_entry_tbl`, `file_object_storage_to_search_tbl`, `file_object_storage_to_project_search_tbl`,
  `file_object_storage_source_first_import_tbl`. Java ids: shared `FileObjectStore_FileType_Enum` (1 unknown, 2 FASTA, 3 generic
  other, 4 scan file, 5 structure file like PDB); description helper `fileObjectStore_FileType_GetDescriptionString_ForEnumValue`.
- Used by: importer FOS orchestrator + lookup DAO; webapp structure-file upload (type 5); webapp FOS searchers.
- How to use / extend: new file kind = new enum value + lookup row in install AND upgrade scripts (with the
  `fake_on_update_field_when_already_exists` idiom) + a description string in the helper.
- Do not use when: the file is regenerable output or a temp upload.
- Limits and gotchas: the description helper throws for type 5, so the importer's lazy lookup-insert cannot be reused for structure
  files. Fresh install vs upgraded DB drift (inference from scripts, not run): install 001 has the unique index on the API key alone
  (upgrade 8 made it file type + key), and no install script adds the type-5 lookup row, so a first structure-file upload on a fresh
  install may fail an FK check — check the lookup table on a fresh DB.
- Related / duplicates: data-access area owns the general DAO/schema patterns.
- Status: verified (DDL, upgrade 8, enum read; drift is inference)

## Spectral storage service (spectr)

### Spectral Storage import client (send scan file, poll for API key, get scan numbers)
- What it solves: importer-side calls to spectr: upload a scan file (by bytes, by shared-filesystem path, or by S3 object stream),
  poll until spectr has processed it and returns the scan file's API key, fetch all scan numbers for an API key. Each wraps the
  vendored client-connector jars with retry loops and typed exceptions.
- Search keywords: spectral storage, spectr, scan file upload, mzML, mzXML, API key, scan numbers, retry, accept import, get data webservice
- Location: limelight_importer `IMP/spectral_storage_service_interface/`: `ScanFileToSpectralStorageService_SendFile.sendScanFileToSpectralStorageService(File)`
  (path first, falls back to upload), `ScanFileToSpectralStorageService_SendFile_In_AWS_S3`, `ScanFileToSpectralStorageService_GetAPIKey`,
  `ScanFileToSpectralStorageService_GetAPIKey__NO_SearchData`, `ScanFileToSpectralStorageService_GetAllScanNumbersForAPIKey`. Client jars:
  `libs_yeastrc_github_jars/spectral_storage_accept_import_client_connector_code.jar`, `spectral_storage_get_data_client_connector_code.jar`.
  Config keys: `SPECTRAL_STORAGE_SERVICE_ACCEPT_IMPORT_BASE_URL`, `SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL`; importer config
  `spectral.storage.send.scan.file.location(.if.path.starts.with)` / env `LIMELIGHT_IMPORTER_SPECTRAL_STORAGE_SEND_SCAN_FILE_LOCATION(_IF_STARTS_WITH)`.
- Used by: `IMP/scan_file_processing_validating/ScanFiles_SendToSpectralStorageService`, `..._ONLY_ScanFiles_NO_Search`,
  `ScanFiles_Populate_SpectralStorageService_API_Key`, `PostProcess_ValidateAllScanNumbersOnPSMsInScanFiles`,
  `IMP/process_input/Process_ScanFiles_ONLY_Main__No_LimelightXMLFile`.
- How to use / extend: `getInstance()` (new instance each call). Throws `LimelightImporterConfigurationException` when the base URL key
  is missing, `...SpectralStorageServiceRetryExceededException` / `...ErrorException` on failure.
- Do not use when: in the webapp (use its factory + `Call_Get_*` wrappers).
- Limits and gotchas: GetAPIKey polls up to 6500 times (5 s for the first 5, then 15 s) — can wait over a day; send retries 3 x 10.
  "Send path" works only if both the importer config allows it and spectr accepts paths; otherwise it uploads bytes (with warnings).
  Two near-duplicate send variants (local file vs S3) and two GetAPIKey variants.
- Related / duplicates: feature-detection copies `ScanFileToSpectralStorageService_GetAllScanNumbersForAPIKey` and its own
  `Call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice` (third client); webapp wrappers.
- Status: verified (retry logic read in SendFile and GetAllScanNumbers; others by constants/signatures)

### Importer scan file handling (send to spectr, attach API keys, validate PSM scan numbers)
- What it solves: (1) validate scan filenames in the XML vs submitted scan files; (2) send each scan file to spectr, recording SHA1;
  (3) after the search is inserted, wait for spectr's API key per file, update DB rows, get-or-insert `scan_file_tbl` + project scan
  file rows; (4) fetch all scan numbers from spectr and fail the import if any PSM scan number is absent (fail loud).
- Search keywords: spectr, spectral storage, scan file, mzML, API key, scan number validation, project scan file, fail on missing scan
- Location: limelight_importer `IMP/scan_file_processing_validating/`: `PreprocessValidate_ScanFiles_ScanFilenames`, `ScanFiles_SendToSpectralStorageService`
  (+ `__ONLY_ScanFiles_NO_Search`), `ScanFiles_UpdateForSpectralStorageService_API_Key`, `ScanFile_Insert_scan_file_tbl_AndChildren_IfNeeded`,
  `PostProcess_ValidateAllScanNumbersOnPSMsInScanFiles`, `ValidateScanFileSuffix`.
- Used by: `ProcessLimelightInput`, `Process_ScanFilenames_ScanFiles`, `Process_ScanFiles_ONLY_Main__No_LimelightXMLFile`; `ValidateScanFileSuffix`
  by `LimelightImporterProgram` and `ProcessFileImportSubmission`.
- How to use / extend: `PostProcess_ValidateAllScanNumbersOnPSMsInScanFiles` is the reference for "every id must exist in spectr or the
  whole request errors" (matches the root CLAUDE.md matching rule). `ScanFile_Insert_scan_file_tbl_AndChildren_IfNeeded` is the reference
  for a race-tolerant insert of a shared row keyed by spectr API key.
- Do not use when: in the webapp.
- Limits and gotchas: excludes one scan level (`SCAN_LEVEL_TO_EXCLUDE`) when listing scan numbers. `ValidateScanFileSuffix` hard-codes
  `.mzML` / `.mzXML`; the webapp also effectively uses those defaults (see suffix entry — corrected after re-reading the code).
  The project-scan-file get-or-insert block is duplicated in two importer classes.
- Related / duplicates: spectr import client.
- Status: verified (structure and calls; inner bodies partly read)

### Spectral storage (spectr) client in the webapp: factory + `Call_Get_*` wrappers
- What it solves: read scan data from spectr by scan-file API key: scan data for scan numbers (with/without peaks, with parents),
  scan numbers by level, per-level summary, max scan count per request, RT x m/z binned peak intensity (gzipped). Each wrapper turns
  spectr "API key not found", "too many scans" and null results into `LimelightInternalErrorException`.
- Search keywords: spectr, spectral storage, scan data, peaks, MS1, MS2, scan numbers, retention time, API key, get scans, binned intensity
- Location: limelight_webapp `J/spectral_storage_service_interface/`: `CallSpectralStorageWebservice_ForThisApp_FactoryIF.getCallSpectralStorageWebservice()`,
  `Call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice`, `Call_Get_ScanNumbers_SpectralStorageWebservice`,
  `Call_Get_MaxScanCountToReturn_SpectralStorageWebservice`, `Call_Get_GetSummaryDataPerScanLevel_FromSpectralStorageService`,
  `Call_Get_ScanPeakIntensityBinnedOn_RT_MZ_Webservice` (bins fixed at 1 s / 1 m/z). Config key `SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL`.
- Used by: `PSM_List_RestWebserviceController`, `Spectrum_For_Lorikeet_For_PSM_Id_RestWebserviceController`, scan-data proxy controllers,
  PSM download controllers (incl. apex RT), `ScanFile_SummaryData_From_SpectralStorageSystem_...`, `ScanFile_PeakIntensityBinnedOn_RT_MZ_JSON__...`.
- How to use / extend: inject the `Call_Get_*` IF; the API key comes from `ScanFileDAO.getSpectralStorageAPIKeyById`. New spectr endpoint:
  add a wrapper that gets the client from the factory IF and checks `getStatus_scanFileAPIKeyNotFound()`. Never call the raw client from controllers.
- Do not use when: in importer / feature-detection modules (own clients).
- Limits and gotchas: the factory calls the client's `getInstance()` then `init(...)` on every call; the vendored jar's `getInstance()`
  returns a NEW instance each time (seen in its bytecode via javap), so there is no shared mutable state, but each call re-runs `init`. Keep scan-number lists under the max-scan count or the call throws. Decide
  scan-number mismatch policy with the maintainer (root CLAUDE.md).
- Related / duplicates: feature-detection same-named `Call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice`; importer clients.
- Status: verified (re-checked)

### Spectr proxy webservices for scan data (two parallel families)
- What it solves: browser access to scan metadata, peaks, MS1 scan numbers in an RT range, per-level summary, binned intensity and
  the "max scans with peaks per request", with access check and id → spectr API key mapping.
- Search keywords: scan data, spectra, peaks, MS1 scans, retention time range, TIC, parent scan, Lorikeet, spectrum viewer, scan file browser, heatmap
- Location: limelight_webapp `J/spring_mvc_parts/data_pages/rest_controllers/`. Family A (projectSearchId + searchScanFileId) in
  `single_project_search_id/`: `ScanData_NO_Peaks_For__ScanNumbers_And_ALL_PARENTS_ProjectSearchId_SearchScanFileId_...`,
  `ScanFile_SummaryData_From_SpectralStorageSystem_...`, `ScanFile_PeakIntensityBinnedOn_RT_MZ_JSON__..._For_ProjectScanFileId_...`,
  `ScanWithPeaks_MaxReturnCount__AccessControl_ProjectSearchId_...`, `Spectrum_For_Lorikeet_For_PSM_Id_...`, `PSM_List_RestWebserviceController`.
  Family B (projectScanFileId) in `scan_data__single_project_scan_file_id/`: `ScanData_NO_Peaks_And_Optional_ALL_PARENTS__For_ScanNumbers_ProjectScanFileId_...`,
  `ScanData_WithPeaks_For__ScanNumbers_ProjectSearchId_SearchScanFileId_And_OPTIONAL_M_Over_Z_Ranges_...`,
  `ScanNumbers_For_mS_1_Scans_ProjectScanFileId_RetentionTime_Range_...`, `ScanWithPeaks_MaxReturnCount__AccessControl_ProjectScanFileId_...`.
  Small lookups in `project_scan_file_id__other_than_scan_data/` (projectSearchIds / filenames for a projectScanFileId).
- Used by: front-end loaders `commonData_LoadedFromServer_From_ProjectScanFileId__*.ts`, `commonData_LoadedFromServer_SingleSearch_From_ProjectSearchId__Get_MaxScanDataWithPeaksReturnCount_*.ts`,
  `lorikeetSpectrumViewer_LoadDataFromServer.ts`, `psmList_ForProjectSearchIdReportedPeptideId_GetDataFromServer.ts`.
- How to use / extend: resolve id → projectId, check access, verify a child id belongs to the authorized project/search (e.g. compare
  `searchScanFileDTO.getSearchId()`), require non-null scan file id + API key, call the `Call_Get_*` wrapper. Responses are struct-of-arrays.
- Do not use when: data is already in the Limelight DB.
- Limits and gotchas: several names/URL constants say projectSearchId/searchScanFileId but take `projectScanFileId`. `byte[]` serializes as
  base64 in JSON (hence `short[]` for levels). Not response-cached. Family A's `ScanData_NO_Peaks_..._ProjectSearchId_SearchScanFileId` has no
  front-end caller found (probably unused). Returned projectSearchIds are internal handles — never display them.
- Related / duplicates: the two families are near-duplicates (webservices area owns the controller template).
- Status: verified (wrapper internals not read)

### Spectral-storage API key lookups (scan file → spectr key)
- What it solves: get `scan_file_tbl.spectral_storage_api_key` needed for any spectr call.
- Search keywords: spectral storage, spectr, api key, scan file key
- Location: limelight_webapp: single id `J/dao/ScanFileDAO.getSpectralStorageAPIKeyById`; list `J/searchers/ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher`.
  Unused variants: `SpectralStorageAPIKey_For_SearchIdSearchScanFileId_Searcher`, `SpectralStorageAPIKeyFor_ProjectId_ScanFileId__Using__project_scan_file_tbl_Searcher`,
  `..._Using__search_scan_file_tbl_Searcher`. Feature detection: `searcher/SpectralStorageAPIKey_For_ProjectScanFileId_Searcher`.
- Used by: about 6 scan-data / Lorikeet / Blib controllers (DAO); `Project_ScanFiles_In_Project_List_RestWebserviceController`,
  `Project_FeatureDetection_Runs_In_Project_List_RestWebserviceController` (list).
- How to use / extend: resolve to scanFileId first, then DAO (one) or list searcher (many).
- Do not use when: the three unused variants.
- Limits and gotchas: treat the key as a server-side handle; do not send it to the browser.
- Related / duplicates: five ways to get the same column (3 unused).
- Status: verified (users); unverified (intent of the unused ones)

### Spectr URL override: classpath properties file → env var → JVM -D → config table
- What it solves: lets a deployment (e.g. Docker) point the webapp at spectr without editing the DB.
- Search keywords: spectr URL, override config, environment variable, LIMELIGHT_SPECTRAL_STORAGE_SERVICE__GET_DATA_URL, Docker config
- Location: `J/spectral_storage_service_interface/SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup`
  (filename in `SpectralStorageService_Connection__ConfigFilename_Constants`, property `spectral.storage.service.get.data.url`, env/-D
  `LIMELIGHT_SPECTRAL_STORAGE_SERVICE__GET_DATA_URL`); fallback config key `SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL`.
- Used by: `CallSpectralStorageWebservice_ForThisApp_Factory` (read once in `afterPropertiesSet`), `AdminConfiguation_Controller` (display).
- How to use / extend: template for "override a config-table URL from the environment".
- Do not use when: n/a.
- Limits and gotchas: override read once (restart to change); config-table fallback read every call. Precedence differs from the upload
  max-size config (env → -D → table → default).
- Related / duplicates: config reader pattern (build/deploy/config area).
- Status: verified

### Supported scan-file suffixes (dormant startup fetch; always the defaults)
- What it solves: which scan file extensions the upload UI accepts.
- Search keywords: scan file suffix, mzML, mzXML, accepted file types, allowed extensions
- Location: `J/spectral_storage_service_interface/SpectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest` (`get_Supported_ScanFileSuffixes()`,
  `..._DEFAULTS()`), static holder `SpectralStorageService_Cached_ScanFileSuffixes_Accepted`, startup `..._At_LimelightStartup__StartThread` + `..._Runnable_InThread`.
- Used by: `Project_UploadData_GetSupported_Scanfilename_Suffixes_RestWebserviceController`, V1/V2 upload controllers; `WebappServletContextListener` (shutdown flag).
- How to use / extend: inject the `_OnRequest_IF`. The startup/shutdown thread is a usable template for "fetch from an external service at
  startup with retries, stop on shutdown".
- Do not use when: n/a.
- Limits and gotchas: CONTRADICTION RESOLVED (spot-checked in code): an earlier survey note said the webapp asks spectr at runtime;
  in code the startup thread's `run()` returns immediately (comment: re-enable for spectr 2.0) and every `set_ScanFileSuffixes_Accepted_List`
  call is commented out, so the answer is always the hard-coded `.mzML`, `.mzXML` — same as the importer's `ValidateScanFileSuffix`.
- Related / duplicates: importer `ScanFilenameConstants`.
- Status: verified

### MS1 scan map from spectr (feature-detection importer; third spectr client)
- What it solves: `Map<ms1ScanNumber, SingleScan_SubResponse>` (RT, TIC, ion injection time, no peaks) for one scan file.
- Search keywords: spectral storage, MS1 scans, retention time lookup, scan metadata, all scans for API key
- Location: `limelight_feature_detection_run_import`: private `get_INTERNAL__ScanData_From_SpectralStorage(int)` in both `Run_And_Import_CoreEntryPoint`
  and `Import_CoreEntryPoint` (identical); helpers in `spectral_storage_service_communication/`.
- Used by: the two feature-detection core entry points.
- How to use / extend: prefer the importer/webapp wrappers; copy only if you are in that module. A future quant program would need the
  same data — consider moving a spectr client into `limelight_importer_run_importer_shared` instead of a fourth copy.
- Do not use when: in the webapp.
- Limits and gotchas: requests ALL MS1 scans in one call and throws on `tooManyScansToReturn` instead of batching — a very large file could
  fail (inferred from code; untested).
- Related / duplicates: spectr clients in importer and webapp.
- Status: verified

## AWS S3

**Caveat: treat all S3 code as untested.** The S3 code paths were tested at one point, but there is currently no S3 environment to test against, so it is unknown whether they still work or have been kept up to date. The AWS SDK dependencies have since been updated for security fixes without being re-tested against S3. The same applies to the S3 support in the separate File Object Storage and spectr services. Anyone who uses S3 must test it thoroughly against real S3 first.

### S3 upload bucket / region resolution (shared)
- What it solves: one place deciding the AWS S3 bucket and region for file uploads: environment variable > JVM `-D` > config table.
- Search keywords: S3, AWS, bucket, region, upload to S3, LIMELIGHT_FILE_UPLOADS_AWS_S3_BUCKET, object storage for uploads
- Location: `limelight_shared_code`, `SC/file_import_common/Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values`
  (`get_S3_Bucket_Configuration_Value`, `get_S3_Region_Configuration_Value`, `..._Only_EnvironmentVariable_Or_Java_Dash_D_Param`, `getValuesAndLog`);
  env names in `SC/constants/EnvironmentVariable_Keys_Constants`.
- Used by: webapp `AdminConfiguation_Controller`, `Project_UploadData_V2_UploadFile_Chunking_Upload_File_RestWebserviceController`,
  V1/V2 upload controllers, feature-detection upload controllers, `WebappServletContextListener` (8 users, all in the webapp).
- How to use / extend: call the singleton; null/empty = S3 not configured (local temp dir is used).
- Do not use when: you mean YRC File Object Storage (separate service).
- Limits and gotchas: values trimmed; empty env var falls through. Batch programs resolve the read-side region differently (tracking row's
  `aws_s3_region`, else config key `file_import_limelight_xml_scans_AWS_S3_REGION_KEY`, else SDK default).
- Related / duplicates: inline S3 client entry.
- Status: verified (re-checked)

### S3 object access in Java code (inline `S3Client` construction — no shared factory)
- What it solves: reading an uploaded file (Limelight XML, scan, FASTA, other) from S3, writing multipart uploads, deleting objects.
- Search keywords: S3, AWS SDK v2, S3Client, bucket, object key, region, GetObjectRequest, headObject, multipart upload, DeleteObjectRequest
- Location: inline in 23 files across 4 modules (grep `S3Client.builder()`), e.g. `IMP/process_file_import_submission/ProcessFileImportSubmission`
  (copy its region-resolution block), `IMP/importer_core_entry_point/ImporterCoreEntryPoint`, `FileToYRCFileObjectStorageService_Send_AWS_S3_Location`,
  `ScanFileToSpectralStorageService_SendFile_In_AWS_S3`, 5 feature-detection classes, 10 webapp upload controllers, 2 run-importer classes.
- Used by: see location.
- How to use / extend: copy the region block from `ProcessFileImportSubmission`; if one is ever added, a shared factory belongs in `limelight_shared_code`.
- Do not use when: the install has no S3 (most installs use local temp dirs).
- Limits and gotchas: test S3 changes against a real S3 bucket (a local-disk install does not exercise these paths). Webapp V2 S3 chunk path is incomplete per
  TODOs (see chunked upload entry).
- Related / duplicates: this IS the duplicate (about 23 copies); S3 delete written 3 ways (next entry).
- Status: verified (file list by grep; region logic read in 2 importer files)

### Delete uploaded S3 objects for a job (run importer)
- What it solves: delete the S3 objects recorded on a job's single-file rows, skipping externally provided objects unless flagged
  delete-after-import; region from the row, else config key `file_import_limelight_xml_scans_AWS_S3_REGION_KEY`, else SDK default.
- Search keywords: S3 delete, AWS, DeleteObjectRequest, object storage cleanup, remove uploaded file
- Location: `limelight_run_importer` `import_files__delete_s3_objects_for_db_single_file_records/ImportFiles_Delete_S3Objects_For_DB_SingleFile_Records.delete_S3Objects_For_DB_SingleFile_Records(trackingId)`.
- Used by: `ProcessSubmittedImport.deleteUploadedFilesIfConfiguredAndStatusSuccess`, `ImportFiles_DelayedRemoval_Main`.
- How to use / extend: call with an import-queue tracking id.
- Do not use when: the pipeline queue (reads `FileImportTrackingSingleFile` rows only).
- Limits and gotchas: builds a new `S3Client` per object and never closes it (seen in code, not runtime-tested; resource-leak risk).
- Related / duplicates: inline copy in `ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main`; webapp deletes in
  `Project_UploadData_V2_UploadFile_Cancel_Delete_RestWebserviceController` and two feature-detection upload controllers.
- Status: verified

## Upload temp / import work directories and cleanup

### Upload temp directory and import work-directory layout
- What it solves: where uploaded files land before an import is queued, and the per-job import dir the importer reads from: one naming
  scheme for the temp subdir per (user, uploadKey), per-file temp filenames per file type, and the zero-padded per-tracking-id dir.
- Search keywords: upload temp dir, temp directory, work directory, import directory, staging dir, scratch directory for job,
  uploaded file path, import_dir_for_id, upload key, file_import_limelight_xml_scans_temp_dir
- Location: shared (all programs): `SC/file_import_limelight_xml_scans/utils/Limelight_XML_ImporterWrkDirAndSbDrsCmmn`
  (`get_Limelight_XML_Importer_Work_Directory()` reads config key `file_import_limelight_xml_scans_TEMP_DIR_KEY` and throws if missing or
  not existing; `validate_...`; `getDirForImportTrackingId(id)` → `import_dir_for_id_0000123`), `SC/file_import_limelight_xml_scans/constants/FileUploadCommonConstants`
  (`UPLOAD_FILE_TEMP_BASE_DIR`, `IMPORT_BASE_DIR`, `IMPORT_DIR_FOR_ID`, priorities), `SC/file_import_pipeline_run/constants/FileImportPipelineRunCommonConstants`
  (`IMPORT_AND_PIPELINE_RUN__BASE_DIR`). Webapp: `J/file_import_limelight_xml_scans/utils/Limelight_XML_Importer_Work_Directory_And_SubDirs_Web`
  (via `_WebIF`: `getDirForUploadFileTempDir()`, `createSubDirForUploadFileTempDir(userId, uploadKey, base)`, `getSubDirForUploadFileTempDir(...)`,
  `getDataFile(...)`, `getUploadFile(scanFileSuffix, fileIndex, FileImportFileType, base)`); constants `LimelightXMLFileUploadWebConstants`.
- Used by: webapp V1/V2 upload controllers and `Project_UploadData_UploadSubmit_RestWebserviceController`, feature-detection / gold-standard
  initialize controllers; run importer `ProcessSubmittedImport`, cleanup mains; submit-import CLI (`SubmitUploadMain` / `UploadFileSubDirConstants`) (22 users).
- How to use / extend: resolve the base via `Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory()` then
  append the sub dir. New file type: add a `FileImportFileType` branch in `getUploadFile` + prefix constant. A new job type that writes into the
  pipeline base dir gets run-importer cleanup for free (keyed by tracking id).
- Do not use when: storing long-lived files (use FOS); a non-import scratch area.
- Limits and gotchas: `createSubDirForUploadFileTempDir` returns `null` (not an exception) when the subdir already exists; only one level
  (`mkdir`). The root is a `config_system_tbl` value, so `ConfigSystemTableGetValueCommon` must be initialized first in the running module.
  Two "is import configured" checks exist: webapp `IsLimelightXMLFileImportFullyConfigured` (key non-blank) vs shared `validate_...` (dir exists).
  Always configure this dir outside any source checkout (it holds large generated files).
- Related / duplicates: submit-import CLI keeps a hand-synced copy of the temp-base-dir name.
- Status: verified

### Upload / import work-directory cleanup (delayed removal, keep-last-two, orphan dirs)
- What it solves: once a day, delete per-job work dirs (and their S3 objects) for finished jobs older than 3 days, stuck jobs older than
  15 days, all but the newest 2 COMPLETE / 2 FAILED (keeping SYSTEM_ERROR failures), dirs with no tracking row untouched 5 days, temp
  upload dirs older than 1 day. For both job queues.
- Search keywords: delete old files, cleanup work directory, retention, delayed removal, purge uploads, orphan directories, keep last two, disk cleanup
- Location: `limelight_run_importer`: `import_files_delayed_removal_thread/ImportFiles_DelayedRemoval_Thread`, `ImportFiles_DelayedRemoval_Main`,
  `ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main`, `import_and_pipeline_run__cleanup_dirs_files/ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main`,
  `ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main` (+ `_Searchers`). Gate keys `IMPORT_DELETE_UPLOADED_FILES`,
  `IMPORT_DELETE_UPLOADED_FILES__ALL_AFTER_3_DAYS` (read only by the import-queue mains; the two `ImportAndPipelineRun_*` cleanup mains do not
  read these keys, so they always run).
- Used by: `ManagerThread`; `ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main` also by `ProcessSubmittedImport` after each import.
- How to use / extend: write job files under the pipeline base dir keyed by tracking id; cleanup follows.
- Do not use when: files are permanent results (FOS content) — this deletes whole job dirs.
- Limits and gotchas: 3 s pause between deletes; date-granular 3-day check; each "Main" singleton's `keepRunning` is never reset after
  `shutdown()` (inferred, not tested). The background-processing area owns the thread mechanics.
- Related / duplicates: import-queue vs pipeline-queue cleanups are parallel copies.
- Status: verified (import queue); pipeline-queue variants read in part

### Recursive directory delete (two implementations)
- What it solves: delete a directory tree.
- Search keywords: delete directory, rm -rf, recursive delete, remove temp dir, delete folder, cleanup files
- Location: webapp `J/file_import_limelight_xml_scans/utils/DeleteDirectoryAndContentsUtil` (via `DeleteDirectoryAndContentsUtilIF`; throws
  `LimelightInternalErrorException` on the first failure, leaving a partial tree); run importer
  `delete_directory_and_contents/DeleteDirectoryAndContents.getInstance().deleteDirectoryAndContents(File)` (logs, never throws, no return value).
- Used by: webapp: only `Project_UploadData_UploadSubmit_RestWebserviceController`. Run importer: `ProcessSubmittedImport`,
  `ProcessSubmittedImportOrPipelineRun`, `ImportFiles_DelayedRemoval_Main`, `ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main`, both pipeline cleanup mains.
- How to use / extend: inject the webapp IF in Spring code; call the run-importer singleton in that module; elsewhere `java.nio.file.Files.walk` + delete.
- Do not use when: you need success reporting (run-importer variant); in back-end modules (webapp variant is a Spring bean).
- Limits and gotchas: pass only directories Limelight itself created (job / temp upload dirs). Both variants NPE if the dir does not exist
  (`listFiles()` returns null; callers check `exists()` first). Possible defect seen in code, not runtime-tested: the webapp variant recurses
  into a subdirectory (which deletes it) and then calls `delete()` on it again, which returns false and throws — so any nested subdirectory
  makes it throw; the run-importer variant does not have this problem.
- Related / duplicates: the two are parallel implementations with different failure behavior; no preferred one identified.
- Status: verified (re-checked)

### Upload max-file-size config (env var → JVM -D → config table → default)
- What it solves: max upload size per file type (Limelight XML, FASTA, scan, generic other) plus the fixed chunk size, overridable without a DB change.
- Search keywords: max file size, upload limit, file size limit, chunk size, environment variable override, -D property, GB
- Location: `J/file_import_limelight_xml_scans/config_with_constants_default/FileUploadMaxFileSize_Config_WithConstantsDefaults` (static):
  `get_LIMELIGHT_XML_MAX_FILE_UPLOAD_SIZE()`, `get_MAX_FASTA_FILE_UPLOAD_SIZE()`, `get_SCAN_MAX_FILE_UPLOAD_SIZE()`, `get_GENERIC_OTHER_MAX_FILE_UPLOAD_SIZE()`,
  `..._AS_STRING()`, `..._FORMATTED()`, `MAX_FILE_UPLOAD_CHUNK_SIZE` (5 MB), `getValuesAndLog()`. Env/-D: `LIMELIGHT_LIMELIGHT_XML_FILE_MAX_SIZE_IN_GB`,
  `LIMELIGHT_FASTA_FILE_UPLOAD_MAX_SIZE_IN_GB`, `LIMELIGHT_SCAN_FILE_MAX_SIZE_IN_GB`, `LIMELIGHT_GENERIC_OTHER_FILE_MAX_SIZE_IN_GB`; config keys e.g.
  `LIMELIGHT_XML_FILE_MAX_FILE_SIZE_IN_GB_KEY`. Defaults 1 GB (XML) / 10 GB (others), GB = 10^9.
- Used by: `WebappServletContextListener`, `AdminConfiguation_Controller` + `webappAdminConfiguration.jsp`, `projectView_UploadData.jsp`, V1/V2 upload controllers.
- How to use / extend: call the static getters; copy a method pair for a new type.
- Do not use when: n/a — single source of upload limits.
- Limits and gotchas: parse errors log once per distinct message.
- Related / duplicates: spectr URL override uses a different precedence.
- Status: verified (re-checked)

### Config-table feature switches for file features (`Is...AllowedViaWebSubmit` / `Is...FullyConfigured`)
- What it solves: one-line "is this enabled on this install" checks driven by `config_system_tbl`, used to gate upload webservices and JSP display.
- Search keywords: feature flag, feature enabled, is configured, import allowed, scan file upload allowed, file object storage enabled, blib configured
- Location: `J/file_import_limelight_xml_scans/utils/`: `IsLimelightXMLFileImportFullyConfigured` (`file_import_limelight_xml_scans_TEMP_DIR_KEY` non-blank),
  `IsScanFileImportAllowedViaWebSubmit` (`SCAN_FILE_IMPORT_ALLOWED_VIA_WEB_SUBMIT_KEY` = TRUE), `IsFileObjectStorageFileImportAllowedViaWebSubmit`
  (`YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL` non-empty). Blib: `J/services/Blib_Spectral_Library_Webservice_Configured__SetForJSP`
  (`BLIB_SPECTRAL_LIBRARY_FILE_CREATION_WEB_SERVICE_BASE_URL` and `BLIB_SPECTRAL_LIBRARY_FILE_RESULT_FILE_BASE_PATH` both non-empty → request attribute).
- Used by: `AppContextConfigSystemValuesRetrieval` (JSP), upload/submit controllers, feature-detection and gold-standard import controllers,
  `StructureFile_Contents_UploadData_RestWebserviceController`, `Project_UploadData_Get_FastaFileUploadAccepted_RestWebserviceController`; blib setter by 7 data-page controllers.
- How to use / extend: copy one tiny class (inject `ConfigSystemDAO_IF`, read key, return boolean, exception → `false`).
- Do not use when: you need the work dir validated to exist (use `Limelight_XML_ImporterWrkDirAndSbDrsCmmn.validate_...`).
- Limits and gotchas: exceptions logged and mapped to `false` (feature silently off on DB error). `IsLimelightXMLFileImportFullyConfigured` logs under
  the wrong class. Reads the DB each call (`ConfigSystemDAO.getConfigValueForConfigKey` runs a SELECT every time, no cache).
- Related / duplicates: config system (build/deploy/config area).
- Status: verified

## Uploads (wire protocols)

### Chunked browser file upload with per-chunk SHA-256 (V2: front-end sender + server controllers)
- What it solves: upload large Limelight XML / scan / FASTA files from the browser as a series of octet-stream POSTs to local disk or S3
  multipart, with per-chunk SHA-256, retry, abort and progress.
- Search keywords: chunked upload, multipart upload, large file upload, resumable upload, S3 multipart, upload progress, checksum, SHA-256,
  XMLHttpRequest upload, abort upload, adaptive chunk size, V2 upload
- Location: front end `DP/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_SendUploadFileToServer.ts`
  (class `ProjectPage_UploadData_SendUploadFileToServer`, `projectPage_UploadData_SendUploadFileToServer({ uniqueRequestIdentifier_ForThisFile })`,
  `abort_FileSend()`); init/submit/cancel in `projectPage_UploadData_UploadFiles__Common_Init_AND_Submit_Upload__LimelightXMLFile_AndOr_ScanFile.ts`.
  Server `J/spring_mvc_parts/.../other_like_project/`: `Project_UploadData_V2_UploadFile_Initialize_RestWebserviceController` (S3 `createMultipartUpload`
  when a bucket is configured), `..._V2_UploadFile_Chunking_Upload_File_...` (`consumes` octet-stream, params in header `limelight_upload_file_params_json_base_64`),
  `..._V2_UploadFile_Submit_...` (S3 `completeMultipartUpload`), `..._V2_UploadFile_Cancel_Delete_...`; S3 parts in `FileImportTrackingSingleFile_S3UploadPart_DAO`.
  Overall record: `Project_UploadData_V1_UploadInitialize_*` then `Project_UploadData_UploadSubmit_*` (queues, sends submit email). Contract DTOs:
  `limelight_submit_import_client_connector/.../request_response_objects/SubmitImport_V2_UploadFile_*`.
- Used by: `projectPage_UploadData_UploadFiles_Overlay__Upload_LimelightXMLFile_And_Optional_ScanFiles_Component.tsx`,
  `..._Upload_ONLY_ScanFiles_Component.tsx`.
- How to use / extend: call per-file initialize to get `maxFileUploadChunkSize` and optional required chunk size, construct the sender, `await` it,
  then per-file submit (or cancel-delete on failure). Chunk size starts at 5% of max and adapts toward about 5 s per POST unless S3 requires a fixed size;
  network errors and checksum mismatches retried up to 4 times. Local-disk path enforces in-order gap-free chunks, skips already-saved chunks,
  checks max size and optional SHA-256. The sender sends the sync-tracking header itself.
- Do not use when: a small file (single-request upload); the CLI (uses V1).
- Limits and gotchas: S3 branch is incomplete per in-code TODOs; test against real S3 before relying on it. The send method resolves even on errors (check `statusSuccess`); on cancel it returns `undefined` and both callers read
  `sendResult.statusSuccess` without a guard (possible TypeError, from code reading, not exercised). Strictly serial. 400-response flags must stay
  in sync with the server. The V2 program (`..._FROM_SUBMIT_PGM`, PgmXML) endpoints have no callers and their request classes are not in the
  webapp's XML unmarshal JAXB context, so they look non-functional (code reading). Endpoint URL hard-coded in the sender.
- Related / duplicates: V1 single-request upload (CLI); single-request browser helpers; structure-file upload (same header name).
- Status: verified (S3 paths only via grep and TODO comments; V2 DTO front-end use found by grep)

### Single-request octet-stream upload with base64 JSON header (browser helpers + server pattern)
- What it solves: upload a small/medium file in ONE octet-stream POST with request parameters in `limelight_upload_file_params_json_base_64`.
- Search keywords: upload file, single POST upload, octet-stream upload, upload with header params, gold standard upload, Hardklor / Bullseye conf upload, binary upload
- Location: front end `DP/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/`:
  `projectPage_UploadData_GoldStandard_Import_UploadFile_SendFileToServerWebservice.ts`, `projectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice.ts`,
  `projectPage_UploadData_FeatureDetection_Run_UploadFile_SendFileToServerWebservice.ts`, `upload_Bullseye_File_Contents_For_ScanFile_Project_SendFileToServerWebservice.ts`
  (dead: no importer, URL not in Java). Server: `Project_FeatureDetection_*_UploadFile_*`, `Project_GoldStandard_Import_Request_UploadFile_*` (each with its own
  `UPLOAD_FILE_HEADER_PARAMETER_PARAMS_WEB_JSON` constant).
- Used by: the gold-standard / feature-detection submit components in the same directory.
- How to use / extend: copy one (they are near-identical); change URL, send-data class and header fields.
- Do not use when: the file can be large (no chunking, no checksum, no retry).
- Limits and gotchas: each copy calls `window.alert` itself (UI-coupled). Binary-upload handling repeated in 6 server controllers; only
  `HttpHeaderValue_Base64_Encoding` is shared.
- Related / duplicates: four near-identical front-end copies + structure-file upload DAO; chunked uploader.
- Status: verified

### HTTP header value Base64 (UTF-8) encode/decode (Java + TypeScript twins)
- What it solves: carry non-ASCII strings (file names, JSON params) in HTTP headers (headers are Latin-1).
- Search keywords: header encoding, base64 header, non-ASCII filename in header, upload metadata header
- Location: `J/web_utils/HttpHeaderValue_Base64_Encoding` (static); `DP/data_pages_common/httpHeaderValue_Base64_EncodeDecode.ts`
  (`encode_String_To_HttpHeaderValue_Base64`, `decode_HttpHeaderValue_Base64_To_String`).
- Used by: Java: V2 chunk controller, feature-detection and gold-standard upload controllers, structure-file upload. TS: upload senders,
  structure-file contents DAO.
- How to use / extend: keep the two in sync; front end must Base64 the UTF-8 bytes.
- Do not use when: URL values (standard alphabet `+/=`, not URL-safe).
- Limits and gotchas: Java throws on null.
- Related / duplicates: submit-import connector's own Base64-of-XML header (`limelight_upload_file_params_xml_base_64`); body-prefix alternative
  in `limelight_features_docs/upload_metadata_length_prefixed_in_body.md` (lead only).
- Status: verified

### Minimal validation of uploaded files (FASTA first char, Limelight XML root element + search name)
- What it solves: fast reject of obviously wrong uploads before queuing; extracts the search `name` from the XML root.
- Search keywords: validate upload, sniff file, check file type, FASTA validate, XML root element, StAX, search name from file
- Location: `J/file_import_limelight_xml_scans/validate_minimal_uploaded_files/FastaFile_Uploaded_Minimal_Validate`,
  `J/file_import_limelight_xml_scans/minimal_validate__get_searchname_from_uploaded_file/LimelightXMLFile_Minimal_Validate__GetSearchNameIfInFileContents`.
- Used by: the V2 chunk upload controller.
- How to use / extend: inject the `_IF`; both throw `LimelightWebappDataException` with a user-facing message.
- Do not use when: full validation is needed (the importer does XSD validation).
- Limits and gotchas: FASTA retry counter never incremented (harmless in practice, inferred).
- Related / duplicates: none.
- Status: verified

## Caches

### Versioned webservice response cache (memory + disk), `Cached_WebserviceResponse_Management`
- What it solves: caches the gzipped JSON response of an expensive, deterministic POST webservice keyed by (controller path, exact request body
  bytes). Two tiers: in-memory Guava cache (soft-referenced, KB-weighted, 20-day expire-after-access) and an optional on-disk tier that survives
  restarts. Returns gzipped bytes, or gunzips for clients that do not accept gzip.
- Search keywords: webservice cache, response cache, cache JSON response, cache on disk, cached data in file, versioned webservice, version number
  in URL, memoize webservice, gzip response cache, invalidate cache, struct of arrays
- Location: limelight_webapp `J/cached_data_in_webservices_mgmt/`: `Cached_WebserviceResponse_Management_IF`
  (`registerControllerPathForCachedResponse_RequiredToCallAtWebappStartup`, `getCachedResponse(acceptGzip, path, postBody, this)`,
  `putCachedResponse_GZIPPED(path, postBody, gz, this)`), `Cached_WebserviceResponse_Management_Utils.translate_ControllerPath_For_CachedResponseMgmt`.
  Templates: `PsmTable_Data_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController`;
  `FeatureDetection_SingularFeature_Entries_For_FeatureDetectionRootId_Single_ProjSearchID_RestWebserviceController` (adds struct-of-arrays JSON,
  max request range, and a "max allowed" webservice).
- Used by: about 23-25 REST controllers (e.g. `Psm_Count_PerReportedPeptide_...`, `ReportedPeptideIdList_ForSearchCriteria_...`, `ProteinCoverage_PerReportedPeptide_...`,
  `PeptideSequenceStringList_From_ReportedPeptideIds_...`, feature-detection controllers).
- How to use / extend: path constant in `AA_RestWSControllerPaths_Constants` ending `-version-<N>`; implement `InitializingBean` and register in
  `afterPropertiesSet`; check access FIRST, then `getCachedResponse` and return early; else compute, gzip with `Gzip_ByteArray_To_ByteArray_IF`,
  `putCachedResponse_GZIPPED`, set the gzip header via `RestControllerUtils__Request_Accept_GZip_Response_Set_GZip`. Bump `-version-N` in Java AND
  the front-end URL string whenever request/response shape or computation changes (old entries are orphaned and cleaned).
- Do not use when: the response depends on anything outside the body (user, session, time, data that can change after import: tags, names,
  project settings); write endpoints.
- Limits and gotchas: path must contain `-version-<int>` (else throws); duplicate registration throws; the caller must be the same object that
  registered. Key is exact body bytes (different JSON field order misses). Admin "clear all cached data" clears only the memory tier, not disk.
  Memory budget is 66% of the configured in-memory size. The template uses `getJSONByteArray_NotReturn_ObjectField_ThatIs_Null`; most use `getJSONByteArray`.
- Related / duplicates: on-disk tier; in-memory registry; three controllers gzip without caching (`GoldStandard_FileContents_For_MappingId_...`,
  `ScanFile_PeakIntensityBinnedOn_RT_MZ_JSON_...`, `ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_...`).
- Status: verified (re-checked)

### On-disk tier of the webservice response cache (`CachedDataInFileMgmt_*`)
- What it solves: persistent disk tier: `<configured dir>/For_Versioned_Webservices/For_Versioned_Webservices_CURRENT/<controllerPath>/<hh>/<hh>/<sha384>.request_data | .response_data.gz | .done`.
  Full request body stored and compared on read (hash-collision guard); `.done` marks a complete write; writes via Spring `@Async`; a startup daemon
  thread moves unregistered (old `-version-N`) subdirs into `..._TO_DELETE` and deletes them.
- Search keywords: file cache, disk cache, cached data in file, cache directory, SHA-384 file name, cleanup old cache, LIMELIGHT_CACHED_WS_RESP_DATA_DIR
- Location: `J/cached_data_in_file/`: `CachedDataInFileMgmt_ReadFile`, `CachedDataInFileMgmt_WriteFile`, `CachedDataInFileMgmt_WriteFile_Async`,
  `CachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames`, `CachedDataInFileMgmt_Current_Root_Subdir_ToStoreFilesIn`, `..._StartCleanupThread`,
  `CachedDataInFileMgmt_Remove_Old_CurrentSubdirs`, `CachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup`; dir names in
  `J/constants/CachedDataInFileMgmt_Current_Root_Subdir_ToStoreFilesIn__DirectoryNames__Constants`.
- Used by: only `Cached_WebserviceResponse_Management`; `WebappServletContextListener` (cleanup shutdown flag).
- How to use / extend: do not call directly. Configure via `limelight_cached_data_stored_in_files_configuration.properties` key `subdir.to.store.files.in`,
  else env/-D `LIMELIGHT_CACHED_WS_RESP_DATA_DIR`. Dir must exist and be writable (keep it outside any repo checkout).
- Do not use when: you need a general file store (FOS / spectr) or a key other than (path, body).
- Limits and gotchas: not configured or not writable → disk caching silently disabled (logged); write failures logged, never thrown.
  `CachedDataInFileMgmt_WriteFile_GetGitCommitHash` has no users. The only executor bean is the 1-thread `ThreadPoolTaskScheduler` in `LimelightWebAppThreadConfig` (`@EnableAsync`), so it
  most likely runs the `@Async` write (Spring default-executor resolution, not traced). Unverified: and whether `@Async` on the package-private method is proxied at all (if not, writes are synchronous).
- Related / duplicates: config reader pattern (build/deploy/config area).
- Status: verified (executor/proxy notes unverified)

### In-memory cache central registry (admin clear / log sizes)
- What it solves: one place to clear every in-memory cache and log their sizes (admin page buttons).
- Search keywords: clear cache, cache registry, cache size, admin clear cached data, CachedData_InMemory_CommonIF
- Location: `J/cached_data_in_memory_mgmt/`: `CachedData_InMemory_CentralRegistry_IF` (`register`, `clearAllCacheData`, `writeToLogAllCacheSizes`),
  `CachedData_InMemory_CommonIF` (`clearCacheData`, `getCurrentCacheSizeAndMax`), `Cache_InMemory_CurrentSizeMaxSizeResult`.
- Used by: implementers `Cached_WebserviceResponse_Management`, `ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service`,
  `SearchFlagsForSingleSearchId_SearchResult_Cached`, `PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher`; callers
  `WebappConfig_ManageCachedData_ClearAllCachedData_RestWebserviceController`, `WebappConfig_ManageCachedData_WriteCachedDataSizeToLogFile_RestWebserviceController`.
- How to use / extend: see next entry.
- Do not use when: data is mutable and needs targeted invalidation (clear-all only).
- Limits and gotchas: keyed by class name (one instance per class). Clearing does not touch the disk tier. `Support_DataDownloadControllers_Service`
  builds its own Guava cache and is NOT registered (confirmed by reading its `implements` list) — admin clear-all misses it.
- Related / duplicates: Guava cache pattern.
- Status: verified

### Guava in-memory cache component pattern (registered with the central registry)
- What it solves: a Spring bean caching searcher results in a Guava `LoadingCache` held through a `SoftReference` (GC can drop the whole cache,
  recreated on demand), expire-after-access, weight- or size-limited, clearable from the admin page.
- Search keywords: in-memory cache, LoadingCache, Guava cache, SoftReference cache, weight-limited cache, cache key equals hashCode, memo cache server side
- Location: template `J/services/ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service` (key `(searchId, SearcherCutoffValuesSearchLevel, minPsms)`;
  default-cutoffs fast path via `DefaultCutoffsExactlyMatchAnnTypeDataToSearchData`); also `J/services/SearchFlagsForSingleSearchId_SearchResult_Cached`,
  `J/searchers/PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher` (count method cached, max 8000).
- Used by: ReportedPeptide service — `ReportedPeptideIdList_ForSearchCriteria_...`, `PsmTable_Data_PerReportedPeptide_...`, blib request, PSM downloads;
  SearchFlags — `PSM_List_RestWebserviceController`, `PsmTblData_ForSearchIdSearcher`, others; PSM count searcher about 14 classes.
- How to use / extend: implement `InitializingBean` + `CachedData_InMemory_CommonIF`; create the cache in `afterPropertiesSet()` and `register(this)`;
  the key class MUST implement `equals`/`hashCode`; size from the in-memory budget config with a weigher, or a fixed max.
- Do not use when: data must be shared across webapp instances or survive restart.
- Limits and gotchas: possible defects seen in code, not runtime-tested: `SearchFlagsForSingleSearchId_SearchResult_Cached.LocalCacheKey` has no
  `equals`/`hashCode`, so every lookup misses (effectively no caching); the ReportedPeptide weigher computes `150 + bytes/1024.0` (operator precedence;
  intent unconfirmed).
- Related / duplicates: in-memory size budget; registry.
- Status: verified (re-checked)

### In-memory cache size budget config
- What it solves: total MB for in-memory caches, split 66% webservice response cache / 33% ReportedPeptide service (after a fixed 1 MB for the PSM
  count searcher). Minimum/default 10 MB.
- Search keywords: cache size, max memory, LIMELIGHT_CACHED_IN_MEMORY_MAX_CACHE_SIZE_MB, heap budget
- Location: `J/cached_data_in_memory_mgmt/Cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup`;
  file `limelight_cached_in_memory__configuration.properties` key `cached.in.memory.max.cache.size.mb`, env/-D `LIMELIGHT_CACHED_IN_MEMORY_MAX_CACHE_SIZE_MB`.
- Used by: `Cached_WebserviceResponse_Management`, `ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service`.
- How to use / extend: a new budgeted cache needs a new field in the result and a new split.
- Do not use when: a small fixed-size cache (others hard-code sizes).
- Limits and gotchas: split percentages hard-coded; result cached after first call.
- Related / duplicates: config reader pattern.
- Status: verified

### Gzip / gunzip byte-array helpers and gzip-accept check
- What it solves: gzip / gunzip a `byte[]` in memory; decide whether the client accepts gzip and set `Content-Encoding`.
- Search keywords: gzip, gunzip, compress, decompress, Content-Encoding, Accept-Encoding
- Location: `J/web_utils/Gzip_ByteArray_To_ByteArray(_IF)`, `J/web_utils/GUNzip_ByteArray_To_ByteArray(_IF)`;
  `J/spring_mvc_parts/rest_controller_utils_common/RestControllerUtils__Request_Accept_GZip_Response_Set_GZip(_IF)` (`does_HttpServletRequest_Accept_GZip`,
  `set_GZIP_On_HttpServletResponse`).
- Used by: gzip about 22 cached controllers; gunzip `Cached_WebserviceResponse_Management`, `StructureFile_Get_FileContents_...`, `GoldStandard_FileContents_For_MappingId_...`,
  `ScanFile_PeakIntensityBinnedOn_RT_MZ_JSON__...`;
  accept-check about 28 controllers.
- How to use / extend: inject the IFs; the accept helper only sets the header — gzip the bytes yourself.
- Do not use when: large/streamed data (whole array in memory).
- Limits and gotchas: accept check is a substring match for "gzip" (no q-values).
- Related / duplicates: ad-hoc `GZIPOutputStream` in `Project_GoldStandard_Import_Request_UploadFile_RestWebserviceController`.
- Status: verified (re-checked)

## Outbound HTTP clients (no shared helper)

### Calling an external JSON webservice from the webapp (blib status call class)
- What it solves: POST a JSON request to a configured base URL and parse a JSON reply, classifying failures as "could not connect" vs
  "non-200 status" without throwing, so the caller can show a friendly message.
- Search keywords: HTTP client, call webservice, POST JSON, HttpURLConnection, external service, REST client, outbound HTTP
- Location: `J/blib_file__creation_web_service__call_webservice_code/BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService`
  (`blibFileCreation_WebService__GetCreationStatus__CallWebService(Request_To_BlibCreator_Status_Webservice_Root)` → `isStatus()`,
  `isFailedToConnectToWebservice()`, `getHttpStatusCode_Not_200_OK()`, `getWebserviceResponse_Root()`); base URL key
  `BLIB_SPECTRAL_LIBRARY_FILE_CREATION_WEB_SERVICE_BASE_URL` + `/requestConversionStatus`; JSON via `MarshalObjectToJSON` / `UnmarshalJSON_ToObject`.
- Used by: `BlibSpectralLibrary_Download__Get_Creation_Status_RestWebserviceController`, `BlibSpectralLibrary_File__Download_Controller`.
- How to use / extend: the best existing webapp template for a new outbound JSON call — put it in its own `*_CallWebService` class (not inline
  in a controller); better still, factor a shared helper.
- Do not use when: spectr or FOS (own clients).
- Limits and gotchas: set explicit connect/read timeouts when copying. 404 treated as "failed to
  connect". Error-stream contents read but not logged.
- Related / duplicates: blib Request/Cancel controllers inline their own copies; other hand-written clients below.
- Status: verified

### Blib spectral library: request / status / cancel / download (server job with polling)
- What it solves: start an async `.blib` creation job on an external service (returns a request id), poll status, cancel, then download the result.
- Search keywords: blib, spectral library, BiblioSpec, external webservice, async job, request id, poll status, cancel, long-running server job
- Location: server `J/spring_mvc_parts/data_pages/rest_controllers/multiple_project_search_id/BlibSpectralLibrary_Download__Request_Creation_RestWebserviceController`,
  `..._Get_Creation_Status_...`, `..._Cancel_Creation__...`; download `BlibSpectralLibrary_File__Download_Controller`. Front end
  `DP/blib_spectral_library_file__download/` (`Blib_SpectralLibrary_File_Download__MainPage_Link_Component`, `blib_File_Download__Initiate`, `Blib_File_Download_Root`,
  `Blib_SpectralLibrary_File_Download__Overlay_Component_And_SendRequest_Code.tsx`).
- Used by: peptide page, protein list, single protein, experiment protein/peptide pages (6 files).
- How to use / extend: front-end template for "request server job → poll (`window.setTimeout`) → download".
- Do not use when: n/a.
- Limits and gotchas: Request (about 1.5k lines) builds per-PSM mod positions itself; Request and Cancel hand-roll `HttpURLConnection` inline while Status
  uses the class above. Poll loop per overlay, no shared helper. Shown only when both blib config keys are set.
- Related / duplicates: download status tracking; FE form-POST download flow.
- Status: verified

### Submit / poll / cancel client for an external job service (feature detection)
- What it solves: submit a job to the external feature-detection (Hardklor/Bullseye) service, poll status every 5 s, write progress text for the
  user, cancel the remote job on shutdown, then import. Includes a generic "send byte array or file as stream, get byte[]" POST helper with a rich exception.
- Search keywords: webservice client, HTTP POST, submit job, poll status, cancel request, external service, HttpURLConnection, Jackson, run external job
- Location: `limelight_feature_detection_run_import` `run_feature_detection_service_communication/RunFeatureDetectionService_Communication`
  (`call_Submit_Webservice`, `call_GetStatus_Webservice`, `call_CancelRequest_Webservice`, private `sendToServerSendByteArrayOrFileAsStream_GetByteArrayResponseFromServer`);
  exception `exceptions/LimelightImporter_RunFeatureDetection_Communication_Exception`; poll loop in `Run_And_Import_CoreEntryPoint.process`
  (progress via `FileImportAndPipelineRunTrackingRun_Importer_RunImporter_DAO.updateStatusResultTexts`).
- Used by: `Run_And_Import_CoreEntryPoint` only.
- How to use / extend: template for any "Limelight drives a long external job" flow (e.g. a future quant run): submit → poll → progress message →
  cancel-on-shutdown.
- Do not use when: calling Limelight's own webapp or spectr.
- Limits and gotchas: sends JSON but labels `Content-Type`/`Accept` as `application/xml` (observed in source). No retry on transient HTTP failure.
  Status strings are bare literals.
- Related / duplicates: same private POST helper shape in the submit-import connector and run-importer callbacks.
- Status: verified

### Run importer → webapp "on finish" webservice call (JAXB XML over HttpURLConnection)
- What it solves: tell the webapp a job finished so it can send the completion email.
- Search keywords: callback, notify webapp, import finish, XML webservice client, JAXB marshal
- Location: `limelight_run_importer` `on_import_finish/On_ImportLimelightXMLScanFile_Finish_CallWebService.callLimelightWebServiceOnSingleImportFinish`,
  `On_ImportOrRunPipeline_Finish_CallWebService`; objects
  `limelight_shared_code/.../run_importer_to_web_app_objects/RunImporterToWebAppOnComplete_Request|_Response`; exception `LimelightCallWebserviceOnImportFinishException`.
  Server: `RunImporter_ImporterFinish_RestWebserviceController`, `RunImporter_ImporterOrRunPipeline_OtherThan_ImportLimelightXMLScanFiles__Finish_RestWebserviceController`
  (JAXB via `Unmarshal_RestRequest_XML_ToObject` / `Marshal_RestRequest_Object_ToXML`, XXE-safe).
- Used by: `ProcessSubmittedImport`, `ProcessSubmittedImportOrPipelineRun`.
- How to use / extend: template for Java-program-to-webapp XML calls; parse responses with `XMLInputFactory_XXE_Safe_Creator`; add new classes to
  the webapp's fixed JAXB context list. Skipped when config key `limelight.web.app.base.url` is empty.
- Do not use when: Java 8 / client-side code (use the submit-import connector).
- Limits and gotchas: the two caller classes are byte-for-byte copies except name/URL. Path strings are hard-coded with "keep in sync" comments.
- Related / duplicates: submit-import connector.
- Status: verified (client side)

### Submit-import HTTP client connector (`CallSubmitImportWebservice`)
- What it solves: Java-8-compatible client for the webapp's submit-import webservices: marshals a request to XML (JAXB), POSTs it (or streams a file
  as the body), unmarshals the XML reply (XXE-safe), classifies every failure into a typed exception.
- Search keywords: submit import client, upload client, webservice client, HTTP POST XML, JAXB client, call webapp from program, stream file upload
- Location: `limelight_submit_import_client_connector/src/main/java/org/yeastrc/limelight/limelight_submit_import_client_connector/main/CallSubmitImportWebservice.java`
  (`getInstance()` + `init(CallSubmitImportWebserviceInitParameters)`, `call_SubmitImport_AuthTest_Webservice`, `..._Get_FASTAFileUploadAccepted_...`,
  `..._Init_...`, `call_SubmitImport_UploadFile_Service(...)`, `..._FinalSubmit_...`); exception
  `.../exceptions/LimelightSubmitImportWebserviceCallErrorException` (flags: URL error, connect error, bad status + code, 404, send/receive, encode/decode;
  plus URL, response bytes, error-stream bytes).
- Used by: `limelight_submit_import` `SubmitUploadMain`, `AuthTest_Perform_ConnectToServer__Single_Connect_Send_GetResponse`. The webapp uses only the DTOs/constants.
- How to use / extend: `getInstance()` returns a NEW instance. To add a call: add classes to the `JAXBContext.newInstance(...)` list in `init`, add a URL
  constant matching `AA_RestWSControllerPaths_Constants`, copy a `call_...` method. The exception is a reasonable template for retry classification.
- Do not use when: inside the webapp, or for non-submit-import endpoints.
- Limits and gotchas: Java 8 module → JAXB stays on 3.0.x. Timeouts hard-coded (connect 8 min, read 6 h). `setFixedLengthStreamingMode`. Response fully
  buffered. 400 handling has open defects (see code comments). Flags are not mutually exclusive. V2 DTOs not in its JAXB context.
  Has its own private XXE-safe factory (cannot depend on Java-25 shared code).
- Related / duplicates: run-importer callback client; feature-detection client.
- Status: verified (re-checked)

## Submit-import program (CLI) and wire contract

### Submit-import request/response DTO family (`_Base` / `_PgmXML` / `_WebJSON` / `_Common`)
- What it solves: one class hierarchy per webservice shared by the CLI (XML/JAXB), the browser (JSON/Jackson) and the webapp controllers.
- Search keywords: request object, response object, DTO, webservice contract, PgmXML, WebJSON, submit import request, upload init, final submit
- Location: `limelight_submit_import_client_connector/.../request_response_objects/`: `SubmitImport_<Op>_Request_Base` → `..._PgmXML` (program-only fields,
  `@XmlRootElement`) / `..._WebJSON`; responses extend `BaseSubmitImportWebserviceResponse`; upload uses `..._Common`. Ops: AuthTest, Get_FASTAFileUploadAccepted,
  Init, UploadFile, FinalSubmit, V2_UploadFile_{Initialize, Chunking, Submit, Cancel_Delete}.
- Used by: CLI; webapp `Project_UploadData_V1_UploadInitialize_...`, `Project_UploadData_UploadSubmit_...`, `Project_UploadData_SubmitterProgram_AuthTest_...`,
  `Project_UploadData_V2_UploadFile_*`; webapp `Unmarshal_RestRequest_XML_ToObject` / `Marshal_RestRequest_Object_ToXML`.
- How to use / extend: shared field → `_Base`; program-only → `_PgmXML`. A new PgmXML class must be added to BOTH the connector's and the webapp's JAXB
  contexts. New fields must be treated as possibly null by the server (old programs will not send them).
- Do not use when: an unrelated webservice — these ship in a widely distributed Java-8 jar.
- Limits and gotchas: changing/removing a field breaks programs in the field. Fields boxed so "not sent" is distinguishable.
- Related / duplicates: webapp's own per-webservice request/response classes.
- Status: verified (most response field lists skimmed)

### Submit-program version handshake and upload-params header selection
- What it solves: lets a widely distributed client and the server evolve a wire format without forcing upgrades; the client picks the header format
  (`limelight_upload_file_params_xml_base_64` vs old `limelight_upload_file_params_xml`) from the server's reported version.
- Search keywords: version handshake, backward compatibility, protocol version, client version, minimum version, feature gate by server version
- Location: `limelight_submit_import_client_connector/.../constants/Limelight_SubmitImport_Version_Constants` (`SUBMIT_PROGRAM__CURRENT__VERSION_NUMBER` = 16,
  `..._MINUMUM__VERSION_NUMBER` = 1, `..._UPLOAD_FILE_PARAMS_NEW_BASE64_XML_HEADER__MINIMUM` = 16); selection in `call_SubmitImport_UploadFile_Service`.
- Used by: CLI; webapp V1 initialize/submit/upload-file and auth-test controllers.
- How to use / extend: follow `limelight_features_docs/submit_import_upload_header_version_handshake.md`: bump CURRENT, add a dedicated floor constant,
  gate on `serverVersion != null && serverVersion >= floor`, keep the old path. Also bump per `limelight_submit_import/ZZZ__VersionNumber__README.txt`.
- Do not use when: the change does not cross the program↔webapp boundary.
- Limits and gotchas: header-name strings duplicated in connector and webapp. Comments say a 404 on auth-test is "treated as old server", but in code a
  404 is retried and then fails the submit (code reading, not run). Version re-fetched every retry.
- Related / duplicates: browser Base64 header codec.
- Status: verified (webapp side by import grep + doc)

### Submit Import command-line program (`SubmitImportProgram`) and upload orchestration (`SubmitUploadMain`)
- What it solves: the runnable-jar CLI users run to submit an import: option parsing (jargs), validation, help text, `--version`, `--auth-test`, key
  masking, exit codes; then auth test → FASTA-accepted check → init → scan-filename validation → upload each file with client-side SHA-256 → final
  submit, whole sequence retried with linear backoff (5 s × attempt) on connect errors, 404, or SHA-256 mismatch.
- Search keywords: CLI, command line, submit import program, jargs, exit codes, runnable jar, upload flow, retry loop, backoff, SHA-256 file hash
- Location: `limelight_submit_import/src/main/java/org/yeastrc/limelight/limelight_submit_import/program/SubmitImportProgram.java`;
  `.../main/SubmitUploadMain.java` (`submitUpload`, `uploadSingleFile_ToServer`, `compute_SHA256_Hash_ForFile`, `validateScanFileSuffix`);
  `.../auth_test/AuthTest_Perform_ConnectToServer(__Single_Connect_Send_GetResponse)`; help files in `limelight_submit_import/src/main/resources/`.
  The jar is also shipped inside the WAR for download (build area: `copy_limelight_submit_import_ToWebapp`).
- Used by: external users / pipelines / Docker images (no Java callers).
- How to use / extend: add an option with `cmdLineParser.add...Option('Z', "<long-name>")` (`'Z'` is a dummy short flag), validate, pass into
  `submitUpload`, document in the help file; new file type via a new `uploadFile_*` wrapper; new auth-test failure flags in `SubmitImport_AuthTest_Response_PgmXML`.
- Do not use when: browser uploads (V2 chunked) or server-side paths.
- Limits and gotchas: Java 8. Retry restarts the whole sequence (new upload key), not per-file. Default retry limit 6. Exit-code constants differ
  between the two classes (INVALID_INPUT 2 vs 3); most auth-test failures set the "invalid submitter version" exit code even for other causes.
  Search tags use `category~tag`.
- Related / duplicates: other runnable-jar mains parse options their own way.
- Status: verified

### Same-machine submit mode (`ConfigParams`, `GetSubmitterKey`)
- What it solves: when the CLI shares the webapp's upload filesystem it sends file paths instead of bytes (see `ConfigParams`, `GetSubmitterKey`).
- Search keywords: same machine, submitter key, local submit, upload base dir, shared file system, config properties file
- Location: `limelight_submit_import/.../config/ConfigParams.java` (keys `limelight.web.app.url`, `limelight.upload.base.dir`), `.../get_submitter_key/GetSubmitterKey.java`;
  constants `LimelightXMLFileUploadSubmitterPgmSameMachineConstants`, `UploadFileSubDirConstants`.
- Used by: `SubmitImportProgram`, `SubmitUploadMain`.
- How to use / extend: rarely; keep names in sync with the webapp.
- Do not use when: the program is remote (normal case).
- Limits and gotchas: key filename duplicates webapp `FileUploadSubmitterPgmSameMachineConstants`; temp-base-dir duplicates shared `FileUploadCommonConstants`.
- Related / duplicates: importer "send path" options (same idea for spectr/FOS).
- Status: verified

### File-type enum copy (`LimelightSubmit_FileImportFileType`)
- What it solves: integer codes for uploaded file types (1 Limelight XML, 2 scan, 3 FASTA, 4 generic other) on the wire.
- Search keywords: file type, upload file type, import file type, file_import_tracking_single_file_type_lookup
- Location: `limelight_submit_import_client_connector/.../enum_classes/LimelightSubmit_FileImportFileType.java`.
- Used by: `SubmitUploadMain` only.
- How to use / extend: update together with shared `FileImportFileType` and the DB lookup table.
- Do not use when: any Java-25 module (use shared `FileImportFileType`).
- Limits and gotchas: manual three-way sync, nothing enforces it.
- Related / duplicates: deliberate duplicate (Java-8 constraint).
- Status: verified

### Legacy single-request upload endpoint for the CLI (V1)
- What it solves: the CLI sends a whole file in one POST.
- Search keywords: old upload, V1 upload, submit program upload, upload file from submit pgm
- Location: `J/spring_mvc_parts/.../other_like_project/Project_UploadData_V1_UploadFile_OldFor_OldSubmitImportProgram_RestWebserviceController` (path
  `project-upload-data-upload-file-from-submit-pgm`; reads new then old params header).
- Used by: `CallSubmitImportWebservice`.
- How to use / extend: keep for backward compatibility only.
- Do not use when: any new upload (use V2).
- Limits and gotchas: V1 and V2 store into the same tracking tables via separate code paths. Server-side SHA-256 computed here and in the V2 chunk controller separately.
- Related / duplicates: V2 chunked upload.
- Status: verified (javadoc + caller; body skimmed)

## Email

### Sending email (SMTP): `SendEmail` + `SendEmailItem`
- What it solves: send one plain-text email with SMTP settings from the config table (see `SendEmail` for TLS/auth handling), or from
  per-item overrides.
- Search keywords: email, send mail, SMTP, notification, jakarta.mail, invite email, password reset email
- Location: `J/send_email/SendEmail` (`sendEmail(SendEmailItem)`, via `SendEmailIF`), `SendEmailItem` (to, from, subject, body, `smtp*_Override_NORMALLY_NOT_SET`).
  Config keys: SMTP host/port/auth keys and `EMAIL_FROM_ADDRESS_KEY` in `ConfigSystemsKeysConstants`.
- Used by: `Project_InviteUser_NewOrExistingUser_RestWebserviceController`, `User_ResetPassword_Gen_Email_RestWebserviceController`, the import email services,
  the two configured-recipient senders.
- How to use / extend: inject `SendEmailIF`, fill a `SendEmailItem`, call (To is parsed with `InternetAddress.parse`, comma lists work).
- Do not use when: outside the webapp (back-end modules trigger email by calling a webapp webservice).
- Limits and gotchas: writes `mail.smtp.*` into JVM-wide `System.getProperties()` (global side effect, last caller wins). 3 s connect/read timeout;
  synchronous. Throws `LimelightWebappConfigException` if no SMTP host. `toString()` hides password and body.
- Related / duplicates: none (use `SendEmailIF`).
- Status: verified (re-checked)

### Import-related notification email services
- What it solves: compose and send emails when an import is submitted and when an import / pipeline run finishes (to the user plus configured extra lists).
- Search keywords: import finished email, import submitted email, pipeline finished email, notify user
- Location: `J/services/SendEmailForSubmitImportService`, `SendEmailForRunImportFinishService`, `SendEmailForRunImportFinish_ImportOrRunPipeline_Service`;
  keys `SUBMIT_IMPORT_RECEIVED_EMAILS_TO_SEND_TO_KEY`, `RUN_IMPORT_EXTRA_EMAILS_TO_SEND_TO_KEY`, `RUN_IMPORT_FAILED_STATUS_EXTRA_EMAILS_TO_SEND_TO_KEY`, `EMAIL_FROM_ADDRESS_KEY`.
- Used by: `Project_UploadData_UploadSubmit_RestWebserviceController`; the two run-importer finish controllers.
- How to use / extend: for a new email, reuse `SendEmailIF` + config keys like these.
- Do not use when: n/a.
- Limits and gotchas: the two finish services are a large fork (same keys, pipeline variant adds DAOs), not a shared base.
- Related / duplicates: extra-recipient sender below.
- Status: verified (message bodies not read)

### Extra emails on import finish (configured recipients by outcome)
- What it solves: copy import-finish notifications to fixed addresses for all / failed / successful imports, optionally via a different SMTP server.
- Search keywords: import finished email, import failed email, notify admin, extra recipients
- Location: `J/send_email_extra_on_import_finish/SendEmail_Extra_On_ImportFinish_ToConfiguredEmail` (`sendEmail_Extra_On_ImportFinish_ToConfiguredEmail(SendEmailItem, FileImportStatus)`);
  optional classpath properties read by `SendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig` (keys `emails.to.send.to.for.{all,failed,success}.imports.on.finish`,
  `emails.from.address`, `server.identifier`, `smtp.server.*`).
- Used by: both run-import-finish email services.
- How to use / extend: build the user email item, then pass it here.
- Do not use when: n/a.
- Limits and gotchas: mutates the passed item. Absent properties file = feature off. Read once at startup. Deployment-specific; keep out of the
  repository. Error log text says "Server or JS had error" (copy-paste).
- Related / duplicates: throttled error email (same structure).
- Status: verified

### Throttled admin alert email on server or JavaScript error
- What it solves: email configured admins "an error happened", throttled (see class).
- Search keywords: error alert, error notification, admin email, rate limit, throttle, JS error, server exception
- Location: `J/send_email_on_server_or_js_error/SendEmailOnServerOrJsError_ToConfiguredEmail` (`sendEmailOnServerOrJsError_ToConfiguredEmail()`; throttled
  (see class); swallows all Throwables); config `SendEmailOnServerOrJsError_ToConfiguredEmail_ReadConfig`
  (`server.or.javascript.error.emails.to.send.to`, `...from.address`, `...server.identifier`, `smtp.server.*.override`).
- Used by: catch blocks of page and user REST controllers.
- How to use / extend: inject the IF and call it in a catch block after logging.
- Do not use when: you need error details in the mail (body is generic; details are in the log).
- Limits and gotchas: no-op without the properties file. Each controller must call it explicitly in its catch
  block.
- Related / duplicates: front-end error reporting (`reportWebErrorToServer.ts`, front-end area).
- Status: verified

## Downloads

### Form-POST file download controllers (`d/dnld/...`)
- What it solves: lets the browser download a server-produced or proxied file by submitting a hidden `<form>` POST with one field
  `requestJSONString`; the browser saves the response, so large outputs stream to disk without JS memory.
- Search keywords: download file, export, attachment, Content-Disposition, form submit download, TSV download, save as, d/dnld, data download controller
- Location: limelight_webapp `J/spring_mvc_parts/data_pages/data_download_controllers/`; paths in `AA_DataDownloadControllersPaths_Constants` (`d/dnld/`,
  `d/dnld/psb/`); charset `DownloadsCharacterSetConstant.DOWNLOAD_CHARACTER_SET` (UTF-8); no-session page `ErrorMsg_NoSessionNotPublicProject_Controller`.
  Controllers: `SearchFile_Download_Controller`, `FileObjectStorageEntry_Download_Controller`, `ScanFileContents_StoredIn_FileObjectStorage_Download_Controller`,
  `BlibSpectralLibrary_File__Download_Controller`, two `psm_downloads/PSMs_..._Download_Controller`. Front-end reference flows:
  `DP/blib_spectral_library_file__download/Blib_SpectralLibrary_File_Download__Overlay_Component_And_SendRequest_Code.tsx`,
  `DP/common__project_search_and_experiment_based_download_data/download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds.ts`.
- Used by: `searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers.tsx`, project-page scan file list, blib overlay, PSM download helpers.
- How to use / extend: path constant; `@Controller` + `@PostMapping` returning `void`; read `requestJSONString`, parse with `UnmarshalJSON_ToObject`; always do the
  access check in the controller with the `ValidateWebSessionAccess_*` / access-level helpers; on no session forward to the no-session controller;
  set `Content-Type` + `Content-Disposition`; stream to `getOutputStream()`; update download status at start/success/fail. Front end: get a download
  identifier, build a hidden form (`target="_blank"`, `<textarea name="requestJSONString">`), submit, poll.
- Do not use when: data is already in the browser (use `StringDownloadUtils`); JSON the page renders (normal `d/rws/` controller).
- Limits and gotchas: set `Content-Disposition` with an RFC 6266-encoded filename (`filename*=UTF-8''...`). Very large form bodies can make `getParameter` return null.
  Errors after streaming starts can only be reported via the status service. Front-end form building + polling copy-pasted in 4-5 places (no shared helper).
- Related / duplicates: download status tracking; `StringDownloadUtils`.
- Status: verified

### Download status tracking for form-POST downloads (download identifier)
- What it solves: a form-POST download gives JS no completion callback; this issues a one-time identifier the page passes in the form and then polls
  for ABOUT_TO_SUBMIT / IN_PROGRESS / SUCCESS / FAIL.
- Search keywords: download progress, download status, poll download, download identifier, form submit status, spinner while downloading, sddfs
- Location: `J/services/Support_DataDownloadControllers_Service` (+ `_IF`: `getNewDownload_Identifier_MarkAs_AboutToSubmit()`, `updateDownload_Identifier_Status(id, enum)`,
  `getDownload_Identifier_Status(id)`, `removeDownload_Identifier(id)`; nested `DownloadStatus_DataDownloadControllers_Enum`); REST
  `.../rest_controllers/support_data_download_controllers/Support_DataDownloadControllers_RestWebserviceController`
  (`d/rws/for-page/sddfs/support-data-download-via-form-submit-get-new-download-identifier-string`, `...-get-after-status`).
- Used by: all form-POST download controllers above; front-end polling copies in blib overlay, PSM download TS files, search details block.
- How to use / extend: server: `IN_PROGRESS` early, `SUCCESS` after the last byte, `FAIL` in every catch. Front end: POST get-new (body must contain the literal
  flag field the controller expects), include `downloadIdentifier`, submit, poll with `window.setTimeout`. Status removed once read as SUCCESS/FAIL.
- Do not use when: status must survive restarts or span webapp instances without sticky sessions (per-JVM Guava cache, 1-day expiry, `SoftReference`).
- Limits and gotchas: possible defect seen in code, not runtime-tested: updating an identifier not in the cache inserts ABOUT_TO_SUBMIT instead of the
  requested status (status lost after eviction). Identifiers from `GenerateRandomStringForCode`. Not registered with the central cache registry
  — admin clear-all does not touch it.
- Related / duplicates: in-memory cache registry.
- Status: verified (re-checked)

### Download a string as a file (`StringDownloadUtils`)
- What it solves: save client-generated text (TSV, SVG, etc.) as a download via `file-saver`.
- Search keywords: download file, save as, export TSV, download text, file-saver, client-side download
- Location: `DP/data_pages_common/downloadStringAsFile.ts` (`StringDownloadUtils.downloadStringAsFile({ stringToDownload, filename })`).
- Used by: 17-18 files (e.g. `featureDetection_ViewPage__MainPage_Component.tsx`, `ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component.tsx`,
  `protein_Structure_WidgetDisplay__Main_Component.tsx`); only `file-saver` importer.
- How to use / extend: use for any client-built file.
- Do not use when: large server-side data (form-POST download).
- Limits and gotchas: Blob type hard-coded `text/plain;charset=ISO-8859-1`. A JS string in a `Blob` is always encoded as UTF-8, so the saved
  bytes are UTF-8 under an ISO-8859-1 label (per the Blob spec; effect on non-Latin-1 text in real downloads not tested).
- Related / duplicates: none.
- Status: verified (re-checked)

### Server-side streamed PSM TSV download
- What it solves: tab-delimited PSM report for one or more project searches, honoring cutoffs or an explicit reported-peptide → PSM list, with mods,
  open mods, reporter ions, annotations, proteins, sub-groups, scan data from spectr, optional experiment columns (and an apex-RT variant).
- Search keywords: download PSMs, export PSMs, TSV, tab delimited, psm report, spreadsheet export
- Location: `J/spring_mvc_parts/data_pages/data_download_controllers/psm_downloads/PSMs_For_ProjectSearchIds_SearchCriteria_Optional_ExperimentData_Optional__ReportedPeptideIds_Optional_ProtSeqVIds_Download_Controller`
  and `..._WITH_Computed__Apex_Retention_Time_Download_Controller`.
- Used by: `download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds.ts` (and an APEX TS copy the front-end area reports as dead).
- How to use / extend: ids are packed into compact strings (radix 30, separators `X`/`Y`/`Z`) because form-encoding JSON inflates the body; server checks
  `requestVersion` and decodes. Output via `OutputStreamWriter` over `BufferedOutputStream`; filename uses real search ids.
- Do not use when: in-page display (front-end loaders). Adding a column means editing both controllers.
- Limits and gotchas: the two controllers (about 3.1k / about 4.1k lines) are largely copy-paste. Requires scan data for all PSMs when scan columns are produced.
- Related / duplicates: APEX computation (domain-utilities area).
- Status: verified (per-column logic skimmed)

## Hashing

### File / stream hashing helpers (SHA-1, SHA-256, SHA-384) — no shared helper
- What it solves: checksums for uploaded/imported files and cache file names.
- Search keywords: sha1, sha256, sha384, checksum, hash file, digest stream, MessageDigest, file hash, counting input stream
- Location: importer `IMP/utils/SHA1SumCalculator` (`getSHA1Sum(File)`, `getSHA1Sum_ForInputStream`); feature-detection
  `utils/Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component` (line reader computing SHA-1 + SHA-384 + byte count in one pass);
  CLI `SubmitUploadMain.compute_SHA256_Hash_ForFile`; inline `MessageDigest` in webapp V1/V2 upload controllers, `cached_data_in_file/...FileNames` (SHA-384),
  `SearchDataLookupParams_MainProcessing`; browser `window.crypto.subtle.digest('SHA-256')` in the chunk sender.
- Used by: `SHA1SumCalculator` — `ProcessFileImportSubmission`, `Process_FileObjectStorage_Files_SaveAndAddToDB`, `ScanFiles_SendToSpectralStorageService(__ONLY_ScanFiles_NO_Search)`;
  line reader — `ImportFile_Hardklor_Results`, `ImportFile_Bullseye_Results`.
- How to use / extend: reuse within the module that owns the helper; a shared helper in `limelight_shared_code` would be the place to consolidate.
- Do not use when: the line reader on non-ASCII content.
- Limits and gotchas: copies — feature-detection has an older-style `SHA1SumCalculator` (unreferenced there); the webapp has an identical, unused copy of the line
  reader in `J/web_utils/`. Callers of the line reader inline two different hex encoders.
- Related / duplicates: see Duplicates section.
- Status: verified

---

## Cross-references

Blocks owned by other areas:
- Job queues (`file_import_tracking_*`, `import_and_pipeline_run_tracking_*`), id-creator tables, run-importer worker threads, importer program skeleton
  (`LimelightImporterProgram`), project-state check, stop-control/PID files, run-importer config reader → [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md).
- Versioned JSON blob per import, importer DAO pattern, importer DTOs, importer stats tables, transaction-aware DAOs, FOS/queue table DDL details →
  [data_access.md](data_access.md).
- Experiment JSON model and webservices, APEX MS1 apex computation, `PSMMassCalculator` (unused), annotation-type split, sub-group label computation →
  [domain_utilities.md](domain_utilities.md).
- Access checks, `GenerateRandomStringForCode`, XXE-safe XML factory as a
  security rule → [security_access_control_sessions.md](security_access_control_sessions.md).
- REST controller template, JSON marshal/unmarshal helpers, `Unmarshal_RestRequest_XML_ToObject` / `Marshal_RestRequest_Object_ToXML` (JAXB, XXE-safe),
  `AA_RestWSControllerPaths_Constants`, structure-file CRUD webservices, project-search insert/update/delete webservices,
  webservice sync tracking, front-end `{data, promise}` loaders and their caches → [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md).
- Front-end component-level caches (project page parent cache, scan-browser per-key cache, QC instance cache) → [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md) / [charts_visualization.md](charts_visualization.md).
- Startup config reader pattern (properties → env → -D), `ConfigSystemsKeysConstants` vs `ConfigSystemsKeysSharedConstants`, `WebappServletContextListener`,
  Spring config/thread config, parallel-stream switch, version/git info, cache-bust string, submit-import jar bundled into the WAR,
  sample configuration files, downloadable sample files (`static/sample_files_for_web_download/`) → [build_deploy_config.md](build_deploy_config.md).
- Orphan GC of shared data and search delete → [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md).

## Duplicates and parallel mechanisms in this area

1. **Spectral storage clients x3** — webapp (`spectral_storage_service_interface`, factory + IFs), importer (`spectral_storage_service_interface`, send/poll),
   feature-detection (`spectral_storage_service_communication`, same-named `Call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice` and a copy of
   `ScanFileToSpectralStorageService_GetAllScanNumbersForAPIKey`). Prefer: webapp wrappers in the webapp, importer clients in batch code; for a new batch
   program, move a client into `limelight_importer_run_importer_shared` rather than a fourth copy.
2. **File Object Storage clients** — importer wrapper classes with retry + orchestrator vs webapp controllers calling `CallYRCFileObjectStoreWebservice` directly
   (3 download/read controllers + structure upload); `FileObjectStorage_MainEntry_DAO_Importer` vs `FileObjectStorage_MainEntry_DAO_Webapp`. No webapp FOS service
   exists; extracting one is recommended rather than adding a fifth copy.
3. **`S3Client.builder()` hand-written in about 23 files across 4 modules**; S3 delete written 3 ways (run-importer class, inline pipeline copy, 3 webapp controllers).
   No preferred one identified; a shared factory in `limelight_shared_code` is the suggested home.
4. **No shared outbound-HTTP helper** — blib status class (+ inline copies in blib Request/Cancel), feature-detection service client, run-importer finish
   callbacks (2 byte-identical copies), submit-import connector. For new webapp calls, prefer a separate `*_CallWebService` class (blib status shape).
5. **Recursive directory delete x2** — webapp `DeleteDirectoryAndContentsUtil` (throws) vs run importer `DeleteDirectoryAndContents` (logs). No preferred one identified.
6. **Two send variants + two GetAPIKey variants** for spectr inside the importer (local vs S3; with / without search).
7. **Webservice response cache vs unregistered caches** — `Support_DataDownloadControllers_Service` has its own Guava cache outside the central registry;
   admin clear-all also skips the disk tier.
8. **Two scan-data webservice families** (projectSearchId+searchScanFileId vs projectScanFileId).
9. **Upload protocols** — V1 single-POST (CLI) vs V2 chunked (browser); V2 program endpoints uncalled; four near-identical single-request front-end upload
   helpers; binary-upload handling in 6 server controllers. Prefer V2 for new browser uploads.
10. **Hashing** — SHA-1 (`SHA1SumCalculator` importer + feature-detection copy), SHA-256 (CLI, webapp upload controllers, browser), SHA-384 (cache file names,
    line reader); identical unused webapp copy of the line reader. No shared helper.
11. **Hand-synced constants across modules** — submitter key filename and temp-base-dir name (CLI vs webapp/shared), upload header names (connector vs webapp),
    file-type enum (connector vs shared vs DB lookup), REST path strings (Java constants vs CLI / run importer / front end).
12. **Config override precedence differs** — upload max size: env → -D → table → default; spectr URL: properties → env → -D → table; S3 bucket: env → -D → table.
13. **Email** — two run-import-finish email services are forked copies. Prefer `SendEmailIF`.
14. **Download flows** — server form-POST + identifier vs client `StringDownloadUtils` (choose by data size); front-end form/poll code copy-pasted 4-5 times;
    two PSM download controllers largely copy-paste.
15. **"Is import configured" checks x2** — webapp key-non-blank vs shared dir-exists validation.

## Open questions / unverified

- Resolved: spectr client `getInstance()` returns a new instance per call (vendored jar bytecode) — no shared singleton state.
- Whether `@Async` on the package-private disk-cache write method is proxied (if not, writes are synchronous). Executor: only the 1-thread
  `ThreadPoolTaskScheduler` bean exists, so most likely that one.
- Resolved: webapp `ConfigSystemDAO.getConfigValueForConfigKey` has no cache; it queries `config_system_tbl` on every call.
- Fresh-install FOS drift (unique index, missing type-5 lookup row) — inference from scripts; check on a fresh DB.
- Behavior of the possible defects listed as gotchas (importer FOS env override, submit-connector 400 handling,
  auth-test 404 fallback, download-status after eviction, S3 client never closed, webapp recursive delete throwing on nested dirs, SearchFlags cache key, weigher precedence, chunk-sender cancel TypeError)
  — all from code reading, none exercised at runtime.
- Resolved: the pipeline-queue cleanup mains (`ImportAndPipelineRun_*`) do not read the `IMPORT_DELETE_UPLOADED_FILES*` keys.
- The S3 paths of the V2 upload were read only via grep/TODO comments; exercise them against a real S3 bucket before relying on them.
- Feature-detection all-MS1-scans single call on very large scan files (could throw instead of batching; untested).
- Resolved (spot-checked in code): webapp supported scan-file suffixes are always the hard-coded defaults (startup fetch disabled);
  `Support_DataDownloadControllers_Service` is not registered with the in-memory cache registry; the error-alert email is throttled (see class).
