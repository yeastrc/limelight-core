# Quant: result-file download — interface contract + design (2026-10-05)

Status: DECIDED (maintainer, 2026-10-05); BUILT 2026-10-05 (service endpoint + webapp), uncommitted. Build choices: decision log §18 "Built". Interface contract between the Limelight webapp and the
flashlfq-service for letting users download a quant run's result files. Both sides build to THIS doc. The decisions and
their reasons are rows DL-1 … DL-13 in `quant_common_page__charts_view__decision_log_and_rationale_2026-10-04.md` §18.

## Why

Users want a quant run's result files to do their own processing. The result files carry only `psvid_<n>` protein ids;
protein names are in a separate file, `protein_names.tsv` (see
`quant_protein_names_mapping_file_and_request_contract_2026-10-01.md`), so it is offered with them.

## What the user sees (webapp)

- In the project-page quant run list, each READY run gets ONE "Download" link (DL-1, DL-7).
- Clicking it opens a small overlay positioned near the click, in the style of the search-name change overlay
  (`front_end/src/js/page_js/data_pages/common_components__react/search_name_and_search_short_name__user_change_overlay/searchName_and_SearchShortName_Change_Component_and_WebserviceCall.tsx`) (DL-10).
- The overlay lists only the files this run has, from the download set below; each entry downloads one file. No zip
  (DL-4).
- The file list comes from a webapp webservice that asks the flashlfq-service (below). The front end keeps the answer
  per run (requestId) for the life of the page, so clicking "Download" again for the same run makes no further call
  (DL-9). Safe because READY is a final status.

## The download set (DL-2, DL-6, DL-11)

Exactly these 9 service tokens — the files the Charts view already reads, plus the names file. The webapp holds this
list; the service does not know it (DL-12).

| Service token | Service file (under the run's `flashlfq_output/`) | Present when |
|---|---|---|
| `combined-peptides` | `CombinedPeptides.tsv` | every successful run |
| `combined-proteins` | `CombinedProteins.tsv` | every successful run |
| `combined-peptides-normalized-linear` | `CombinedPeptides.normalized.linear.tsv` | normalization requested and succeeded |
| `combined-proteins-normalized-linear` | `CombinedProteins.normalized.linear.tsv` | same |
| `combined-peptides-batch-corrected-log2` | `CombinedPeptides.batch_corrected.log2.tsv` | batch correction requested and succeeded |
| `combined-proteins-batch-corrected-log2` | `CombinedProteins.batch_corrected.log2.tsv` | same |
| `combined-peptides-batch-corrected-delog2` | `CombinedPeptides.batch_corrected.delog2.tsv` | same |
| `combined-proteins-batch-corrected-delog2` | `CombinedProteins.batch_corrected.delog2.tsv` | same |
| `protein-names` | `protein_names.tsv` | runs submitted from 2026-10-01 |

Not offered (DL-11): normalized log2, batch-corrected linear, the FlashLFQ native files, the JSON files. Offering only
what the webapp already uses means the service is not committed to keep producing the others.
`peptide-identity-map` (`peptide_identity_map.json.gz` since outputs version 4; `peptide_identity_map.json` in version 3) is deliberately not offered either: it is internal join
data for the Charts view (decision log §20 P7-4; `quant_peptide_identity_map_contract_2026-10-14.md`).

Runs without `protein_names.tsv` (submitted before 2026-10-01) simply do not list it; no special handling (DL-3).

## Service endpoint (flashlfq-service) — NEW

`GET /flashLFQRunAvailableResultFiles?request_id=<request_id>`

- `request_id` is validated with the same pattern as the other endpoints (`^[0-9a-f]{32}$`); otherwise `400`
  `{"error": "invalid request_id"}`.
- `200` response, JSON:

  ```json
  { "request_id": "<id>", "status": "READY", "files": [ "peaks", "peptides", "combined-peptides", "..." ] }
  ```

  - `status` (and `detail`, when present) is exactly what `GET /flashLFQRunStatus` returns for the run
    (`READY` / `PROCESSING` / `FAILED` / `NOT_FOUND`).
  - `files`: when `status` is `READY`, every token of the service's top-level result-file allowlist (the one
    `GET /flashLFQRunResult` uses without `search_scan_file_id`) whose file exists for the run, in allowlist order.
    For any other status, `[]`.
  - The rule that must hold: a token is in `files` exactly when `GET /flashLFQRunResult?request_id=<id>&file=<token>`
    would return `200` for a READY run. Same allowlist, same path, same existence test — one source in the code.
  - Per-file (`PER_FILE`) native files are not listed. **Superseded 2026-10-19 (service S2 / S2b):** the response also carries
    `per_file_files: { "<search_scan_file_id>": [ "peptides" | "proteins" | "peaks", ... ] }` -- for a READY PER_FILE run, per
    scan file (decimal-string key from the run's `perfile/` directories), the per-file tokens whose file exists (same rule:
    listed exactly when the per-file `GET /flashLFQRunResult` would answer 200); `{}` for a JOINT run or any other status.
- Why READY only: the service writes every combined, normalized and batch-corrected file before it writes the run's
  done-marker, and READY requires the done-marker with `SUCCESS`; so a READY run's files are complete.
- No change to any existing endpoint, output file, or `OUTPUTS_VERSION` (stays 2).

## Webapp (limelight-core) — to build after the service

1. **File-list webservice** (new, `d/rws/for-page/…`, POST JSON `{ projectIdentifier, requestId }`): READ access for the
   project, then the run must belong to the project (`FlashLFQ_Quant_RequestId_BelongsTo_Project_Service`, which checks
   the run's `params_manifest.json` `project_id`; otherwise answered like not found). Calls the new service endpoint
   (alongside `FlashLFQ_Quant_RunResultFile_Fetch_Service`, same configured base URL). Returns the run's status and the
   service's `files` intersected with the 9-token download set, in download-set order.
2. **Download controller** (new, in `spring_mvc_parts/data_pages/data_download_controllers/`, a form POST like
   `SearchFile_Download_Controller`) (DL-8): `{ projectIdentifier, requestId, file }`; same access and ownership checks;
   `file` must be one of the 9 tokens; fetches the file from the service and sends it with
   `Content-Disposition: attachment`. A file the service does not have → 404.
   Filename (DL-13): `<requestId>__<service file name>`, e.g. `<requestId>__CombinedProteins.normalized.linear.tsv`; the
   webapp holds the fixed token → file-name map from the table above.
3. **Front end**: the "Download" link, the overlay, and the per-run cache of the file list as above.

The Charts view's passthrough webservice (`Quant_FlashLFQ_CombinedResultFile_Retrieval_RestWebserviceController`) was not
changed for downloads. Since 2026-10-14 (phase 0007-A) it also relays `peptide-identity-map` as `application/json` (the 8 TSV
tokens stay `text/tab-separated-values`); since 2026-10-19 (P7-17) the service stores that file gzip-compressed and the relay sends it
with `Content-Encoding: gzip` when the browser accepts gzip, unzipped otherwise. That token is not in the download set.

**Since 2026-10-19 (W1, service outputs version 5):** the service stores and serves EVERY run file gzip-compressed (raw gzip
bytes, `application/gzip`, no `Content-Encoding`). The download controller (`Quant_FlashLFQ_RunResultFile_Download_Controller`)
unzips the file and sends the PLAIN file — same file name, same content type, same bytes as before — so downloads are
unchanged for the user (interim; W2 adds a second "gzip" link per file). A service file that is not valid gzip is a logged
500, never a 404. The strict check (gzip magic `1f 8b` + the whole stream decompresses) is in the one shared fetch,
`FlashLFQ_Quant_RunResultFile_Fetch_Service`.

**Since 2026-10-19 (W2): two links per file.** Each overlay row is the file's label (plain text), then two links `[TSV]` and
`[gzip]` (each with a tooltip naming the file), and the download file name below. The download request carries a REQUIRED field
`encoding`: `"plain"` -> the uncompressed file (the stored gzip bytes are unzipped while they are written to the response; same
file name and content type as before); `"gzip"` -> the stored gzip bytes unchanged, file name `<file name>.gz`, `Content-Type:
application/gzip`, and NO `Content-Encoding` header (with it a browser would unzip and save plain text under a `.gz` name). A
missing or unknown `encoding` is a 400.

## Later: database storage

When quant runs are stored in the Limelight database, the contents of `protein_names.tsv` may be generated on the fly
from the database instead of from a stored file (DL-5; `quant_things_to_deal_with_when_start_store_in_db.md` §7). The
files themselves are expected to move to file object storage (DL-4).

**Since 2026-10-19 (W4): the run's full availability map.** The file-list webservice above now builds its list from the run's
availability map (`FlashLFQ_Quant_RunAvailableFiles_Map_Service`): the download-set tokens the map says are present, in
download-set order (unchanged response `{ status, files, downloadFilenames }`). The same map is served to every quant page by a
new webservice, `d/rws/for-page/quant--flashlfq-run-available-files` (POST `{ projectIdentifier, requestId }`; READ access + the
run-belongs-to-project check, 404 otherwise) -> `{ requestId, status, detail (string | null), files: { <every known top-level
token>: true | false }, perFileFiles: [ { searchScanFileId, files: { peptides, proteins, peaks: true | false } } ] }` (per-file:
every scan file of a PER_FILE run's manifest `scan_files`, in manifest order; empty for JOINT). Contract checks (500): a token
or per-file scan file the service lists that the webapp does not know / that is not in the manifest, per-file entries for a
non-PER_FILE run, a malformed service response. Every quant front-end file fetch consults this map first: absent -> no fetch;
present -> fetch, and a 404 is fatal (there is no "404 = absent" any more). A run that is stored uncompressed by an older
service version has an unreadable manifest, so the ownership check -- and with it this webservice -- answers a logged 500.
