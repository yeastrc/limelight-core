# Quant: protein names — request contract + `protein_names.tsv` mapping file (2026-10-01)

Status: DECIDED (maintainer, 2026-10-01). Interface contract between the Limelight webapp (quant submit) and the
flashlfq-service. Both sides build to THIS doc. Uncommitted prototype work.

## Why

- Users will be offered the quant result files for download, to do their own processing. They need protein names.
- Protein names in Limelight are stored PER SEARCH. A quant run can span several searches, and one protein
  (protein sequence version id, "psvid") can have several names, even within one search.
- Until now the submit embedded ONE name in the protein accession sent to FlashLFQ (`psvid_<n>_<name>`), taken per
  search in database row order (the annotation query has no ORDER BY). Two consequences:
  1. Names were incomplete and not deterministic.
  2. Latent defect: in a run spanning several searches, the same psvid could be sent with two different strings,
     and FlashLFQ would split one protein into two rows.
- FlashLFQ splits its protein column on `;` (Generic input format), so any character in a name that FlashLFQ
  treats as structure is a risk. Names must not travel through FlashLFQ at all.

## Decision

1. **FlashLFQ sees protein ids only.** Every protein token given to FlashLFQ is `psvid_<n>` (no name). FlashLFQ
   groups purely on ids.
2. **Names travel once per request, as data.** The submit sends a table psvid → list of names. The service never
   puts names into FlashLFQ input or into any `Protein Groups` column.
3. **Names are returned in a separate file, `protein_names.tsv`**, written by the service for every run, next to
   the other result files. This file must be kept with the run and returned to users alongside the result-file
   downloads (see `quant_things_to_deal_with_when_start_store_in_db.md` §7).
4. Existing runs keep their old accession strings (no backfill). Readers already key on the psvid id.

## Request (webapp → service, POST `/requestNewFlashLFQRun`)

- PSM entries: `protein_accessions: [string]` is REPLACED by **`protein_sequence_version_ids: [int]`** (may be
  empty). The service rejects a request that still carries `protein_accessions` (400) — no mixed formats.
- New ROOT field **`protein_names`**: an array, one entry per psvid referenced by ANY PSM of the request:
  ```json
  "protein_names": [
    { "protein_sequence_version_id": 10086, "names": [ "sp|PRDX1_HUMAN|", "sp|Q06830|PRDX1_HUMAN" ] },
    { "protein_sequence_version_id": 77,    "names": [] }
  ]
  ```
  Webapp rules (how `names` is built):
  - Collect the annotation NAMES for the psvid from EVERY search of THIS quant run (the run's searches only;
    query each run search for the union of the run's psvids).
  - Replace every control character (incl. tab, CR, LF) with a space, trim, drop empties.
  - Put them in a Set, copy to a list, sort with plain Java `String` natural order (case-sensitive).
  - Entries sorted by `protein_sequence_version_id` ascending; each psvid exactly once.
  Service validation (fail the request loudly, 400, never silently alter):
  - every psvid referenced by a PSM has exactly one entry; no duplicate entries; no entry for a psvid that no PSM
    references; entries in ascending psvid order;
  - a PSM's `protein_sequence_version_ids` has no duplicates;
  - every name is a non-empty string with no control characters; each list is sorted and de-duplicated.
  Exact definitions both sides use:
  - **control character** = Unicode general category Cc (U+0000–U+001F and U+007F–U+009F) = Java
    `Character.isISOControl`. (Java regex `\p{Cntrl}` is ASCII-only by default — do NOT use it.)
  - **sort order** = Java `String.compareTo` (UTF-16 code units); the service validates in that order (Python's own
    sort differs above U+FFFF).

## Service outputs

- FlashLFQ input accession column: `psvid_<n>` tokens joined with `;`.
- Every `Protein Groups` column in every file the service writes (Combined*, normalized, batch-corrected, delog2;
  peptide and protein sides): `psvid_<n>` tokens, `;`-separated. The `# column` description says so and points to
  `protein_names.tsv` for names.
- **`protein_names.tsv`** (new), same conventions as the other result files:
  - `# ` comment block: `format_version: 1`, `file_type: protein_names`, generator, and `# column` lines.
  - Header `protein_sequence_version_id<TAB>name`.
  - ONE ROW PER (psvid, name) — long format, so no in-cell delimiter is ever needed. Rows sorted by psvid, then
    name in the request's order. A psvid with no names gets one row with an empty `name`.
  - Every psvid referenced by the request appears.
  - Written right after the request is accepted, BEFORE FlashLFQ runs (both run modes), so it exists even for a run
    that later fails; recorded in `params_manifest.json` as `"protein_names_file"` (when a manifest is written).
  - Served by the result endpoint under its own allowlist token (`protein-names`). The webapp's passthrough
    allowlist adds it when the download feature is built. Runs from before this change return 404 for it.

## Deployment coupling

The service rejects the old request format (`protein_accessions`) with 400, so the webapp submit change and this
service change must be deployed TOGETHER (local and production).

## Webapp display

The Quant Common page Charts view already looks up names AND descriptions per search of the run with the
filtered per-search protein-info loader (see `quant_common_page__charts_view__design_and_status_2026-10-01.md`
§4c); it keys on the psvid id and is unaffected by this change.

## Superseded

An interim design (2026-10-01, same day) joined several names with Ctrl-A (U+0001) inside the accession sent to
FlashLFQ. It worked end to end in a service test but was dropped in favour of keeping names out of FlashLFQ
entirely. Any `# column` text or docs describing the U+0001 format must be replaced by this doc's format.
