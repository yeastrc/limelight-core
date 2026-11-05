# Quant run peptide identity map — contract (2026-10-14)

Status: DECIDED; BUILT 2026-10-14 (flashlfq service and webapp — see "Built" at the end); compressed storage (P7-17) BUILT 2026-10-19. Decisions: Charts view decision log §20
(`quant_common_page__charts_view__decision_log_and_rationale_2026-10-04.md`, P7-1 … P7-18). This file is the authority for
the file's format and for who does what.

**Decided 2026-10-19, BUILT 2026-10-19 (P7-17, phase 0007-B1; flashlfq service and webapp):** the service stores the map gzip-compressed
(`peptide_identity_map.json.gz`, compressed once at request time, no other logic) and serves it compressed; the webapp relays it with
`Content-Encoding: gzip` when the browser accepts gzip and unzips it otherwise (see "Built" below). Outputs version 3 runs, which stored
the uncompressed `peptide_identity_map.json`, are not supported. The JSON content (format_version 1) does not change.
Specifics (review claude, 2026-10-19): the file's uncompressed bytes are exactly what the service writes today (`json.dumps` of the
request's object, UTF-8); gzip at compression level 6 with the gzip header's `mtime` = 0 (the same input always gives the same
bytes); the service serves the compressed bytes unchanged for the token `peptide-identity-map` with content type
`application/gzip` and NO `Content-Encoding` header (the webapp decides the encoding to the browser); `OUTPUTS_VERSION` 3 → 4 (the
stored file changes — the service's own bump rule) and the Charts view expects 4. Runs with the uncompressed file are not supported
(the maintainer deleted them).

## Why

The Quant Common page's Charts view will compare, per peptide, FlashLFQ MS1 intensity with PSM counts (the reference
analysis's finding 0007). A FlashLFQ peptide row is keyed by Limelight's grouping identity (`Sequence`, built only in
`FlashLFQ_GroupingIdentity_Common`: base sequence + summed variable and static mod masses in one bracket, no positions).
Nothing records which reported peptides and how many PSMs were sent under each identity. Re-deriving that from the database
when a run is viewed can drift from what was submitted, so the webapp records it **at submit time**, from the exact PSMs it
sends to FlashLFQ, and the flashlfq service stores it with the run's other files.

## Who does what

- **Webapp (Java, submit):** builds the map from the PSMs actually sent (after the mapped-scan-file filter) plus the
  reported peptides dropped at submit, and sends it as the **required** request field `peptide_identity_map`. All the
  logic lives here (P7-13). When quant data moves to other storage, the webapp writes the map there instead.
- **flashlfq service (Python):** refuses a request without the field (400); checks only that it is a JSON object whose
  `format_version` is an integer; writes it unchanged (gzip-compressed, P7-17) to `peptide_identity_map.json.gz` at the run
  directory's top level at request time; serves the compressed bytes with the result-file token `peptide-identity-map`.
  `OUTPUTS_VERSION` 2 → 3 (P7-14), 3 → 4 (P7-17).
- **Webapp (serving):** relays the file to the Charts view as JSON (gzip `Content-Encoding` when the browser accepts it). It is
  **not** in the download set (P7-4).
- **Charts view:** expects outputs version 4 (P7-14, P7-17); reads the map for the new charts (phase 0007-B2).

## Format (`format_version` 1)

```json
{
  "format_version": 1,
  "identities": [
    {
      "identity": "LGELPSWILMR[+15.9949]",
      "per_scan_file": [
        { "project_search_id": 1446, "search_scan_file_id": 676, "psm_count": 3, "reported_peptide_ids": [ 1234 ] }
      ]
    }
  ],
  "dropped_reported_peptides": [
    { "project_search_id": 1446, "search_scan_file_id": 676, "reported_peptide_id": 5678, "psm_count": 2,
      "reason": "MASS_NOT_COMPUTED" }
  ]
}
```

- `identities`: one entry per identity string sent, exactly the `full_sequence` value of the PSMs sent. Sorted by
  `identity` (Java `String.compareTo`).
  - `per_scan_file`: one entry per scan file in which PSMs were sent under that identity, sorted by `search_scan_file_id`.
    `psm_count` = the number of PSMs sent for that (identity, scan file); `reported_peptide_ids` = the distinct reported
    peptides those PSMs belong to, ascending. Scan files with no PSM under the identity are absent (not 0).
- `dropped_reported_peptides`: reported peptides whose PSMs were NOT sent because the webapp could not compute their mass
  (`reason` `MASS_NOT_COMPUTED`; the only reason today). One entry per (reported peptide, scan file), only for the run's
  mapped scan files, sorted by `search_scan_file_id` then `reported_peptide_id`. Empty list when nothing was dropped.
- All fields required. `project_search_id` is carried so the file is self-contained (a scan file belongs to one search).

Invariants (the webapp's tests check them; a reader may rely on them):
- For every scan file: the sum of `psm_count` over `identities` equals that scan file's `psm_count` in
  `params_manifest.json` `scan_files` (the PSMs sent).
- The FlashLFQ peptide output's `Sequence` values are a subset of the `identity` values.
- A (`project_search_id`, `reported_peptide_id`) pair appears under exactly one identity (all of a reported peptide's PSMs
  in one search share one identity). A `reported_peptide_id` alone is not enough: the id is shared by searches and the
  identity includes each search's static mods (see "Built" below).

## Built (webapp, 2026-10-14, phase 0007-A)

- Builder: `FlashLFQ_PeptideIdentityMap_Builder` (webapp `services/`), one pure static method `build( sent files, dropped per search )`.
  It sorts and counts as described above and checks, before the submit sends: per scan file, the sum of `psm_count` equals the
  PSMs sent; a reported peptide has one identity; no `full_sequence` is empty; a scan file is not sent twice; a reported peptide
  is not both sent and dropped; a dropped entry is not listed twice and has `psm_count` > 0. A violation fails the submit (500).
- **"A reported peptide has one identity" is checked per (`project_search_id`, `reported_peptide_id`).** A reported peptide id is
  a database-wide id shared by searches (`reported_peptide_tbl`), and the identity includes the search's static mods, so in a
  run of several searches the same id can appear under two identities, one per search. Readers should key reported peptides by
  (`project_search_id`, `reported_peptide_id`).
- Dropped entries: recorded by the submit's PSM gathering where a reported peptide's mass cannot be computed (PSM count per scan
  file), then kept only for the run's mapped scan files and tagged with the search.
- Sent by the joint submit controller as the request field `peptide_identity_map`; relayed to the Charts view by the result-file
  webservice with the token `peptide-identity-map` (`application/json`); not in the download set.
- **Since 2026-10-19 (P7-17, phase 0007-B1):** the service serves `peptide_identity_map.json.gz` as raw gzip bytes
  (`application/gzip`, no `Content-Encoding`). The relay (`Quant_FlashLFQ_CombinedResultFile_Retrieval_RestWebserviceController`)
  requires the bytes to start with the gzip magic `1f 8b` (else 500, logged — a contract break); if the request's `Accept-Encoding`
  contains `gzip` it returns the bytes unchanged with `Content-Encoding: gzip`, otherwise it unzips them and returns plain JSON.
  `Content-Type: application/json` in both cases (the pattern of
  `ScanFile_PeakIntensityBinnedOn_RT_MZ_JSON__From_SpectralStorageSystem_For_ProjectScanFileId_RestWebserviceController`). The 8 TSV
  tokens are unchanged. The Charts view expects outputs version 4.
- **Since 2026-10-19 (W1, outputs version 5):** EVERY run file is gzip from the service, so the map's relay is no longer special:
  all 9 tokens of the relay (and every other webapp reader of service files) go through ONE shared strict path —
  `FlashLFQ_Quant_RunResultFile_Fetch_Service` (gzip magic `1f 8b` AND the whole stream decompresses, else a logged 500; never
  "not found") and `FlashLFQ_Quant_RunResultFile_RelayToBrowser_Service` (`Accept-Encoding` contains `gzip` → the stored bytes
  unchanged with `Content-Encoding: gzip`; otherwise unzipped by the server). Content types unchanged (TSV / JSON). The Charts view
  expects outputs version 5.
- **Read by the Charts view since 2026-10-19 (phase 0007-B2):** the Spectral counts level's "Protein case study" block
  (`quantCharts_PeptideIdentityMap_Load.ts`) fetches the map on the viewer's first protein pick only, validates it strictly against this
  contract (exact property sets, the sort orders, `psm_count` >= 1, the per-scan-file sums against `params_manifest.json`, one identity per
  (`project_search_id`, `reported_peptide_id`); fatal on a break) and indexes identity -> `search_scan_file_id` -> `psm_count`. A scan file
  absent under an identity means 0 PSMs; a FlashLFQ peptide `Sequence` that is not an identity is a contract break.
- Checked on real data without submitting: the builder on a saved 8-scan-file request (481,426 PSMs) gives 33,358 identities;
  every scan file's `psm_count` sum equals the run's manifest; every FlashLFQ peptide `Sequence` is an identity.

## Not in scope

PSM ids are not stored (P7-2). The map is not offered for download (P7-4). Existing runs are not back-filled: they have
outputs version 2 and show the Charts view's "re-run" message (P7-14).
