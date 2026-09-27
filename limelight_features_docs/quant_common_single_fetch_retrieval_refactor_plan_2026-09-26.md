# Quant Common pages — single-fetch retrieval refactor (plan) — 2026-09-26

**Status: PLAN, approved by the maintainer 2026-09-26 (decisions below locked). Not yet implemented.**
High-level, multi-phase. Per-phase file-level scope is refined by a grounding pass at the start of each phase
(line numbers drift — re-locate by content).

## Problem

The FlashLFQ service now produces, for each run, a SINGLE combined peptide file and a SINGLE combined protein
file (and, Phase B, single median-normalized `-linear` derivatives of each) — each containing ALL of the run's
samples as `Intensity_search_scan_file_id_<ssfid>` columns.

But the Quant Common pages retrieve them **per scan file**: the FE loops the run's `(projectSearchId,
searchScanFileId)` pairs and makes **one webservice call per pair** (`quant_PrototypeData.ts` —
`_load_StatusThenResults` does `Promise.all( readyPairs.map( _fetchJoinedResult_ForPair ) )`, and
`_fetchJoinedResult_ForPair` sends `searchScanFileId` so the controller returns just that one scan file's column);
the FE then **reassembles** the columns into `record_ByReportedPeptideId_ByScanFileId` keyed by ssfid. The Java
render-path controllers (`FlashLFQ_Run__Result_Retrieval_Joined_...` peptide / `..._Proteins_...` protein, and the
Phase B `..._Normalized_Linear_...` copies) each fetch the whole combined file from the service and parse out ONE
ssfid's column.

Consequence: the one all-samples combined file is fetched + parsed **once per sample** (each call discarding all
but one column), and the front end stitches the pieces back together. It is redundant and convoluted — taking a
single file apart per scan file only to reassemble it.

## Target model — single fetch per run

**One** retrieval call per file (peptide, protein; raw, normalized) returns **all** samples. The controller fetches
+ parses the combined file **once** and returns every sample column; the FE consumes it directly — no per-pair
loop, no reassembly.

- **Protein** is trivially 1:1 (`proteinSequenceVersionId` parsed straight from the file, no per-search work) — one
  call returns all sample columns with no added logic.
- **Peptide** additionally needs a **per-search re-derivation** (map FlashLFQ `Sequence` → each search's
  `reportedPeptideId`s, respecting cutoffs, via the single-source-of-truth grouping-identity join). This is
  inherently per-search because `reportedPeptideId` is a per-search concept and a JOINT run spans multiple searches.
  In the single-fetch model the controller still loops the run's `(projectSearchId, ssfid)` pairs to re-derive
  per search, but reuses the ONE parsed file instead of re-fetching per pair.
- Auth generalizes from the current per-pair check to: READ on all the run's projectSearchIds + each ssfid belongs
  to its search.

**Important:** one requestId ≠ one search — a JOINT run still spans searches, so the peptide per-search
re-derivation stays; only the fetch/parse is deduplicated to once-per-run.

## Decisions (locked, maintainer 2026-09-26)

1. **Parsing stays SERVER-SIDE.** The controller returns an all-samples JSON. The peptide re-derivation +
   grouping-identity join must remain in Java (single source of truth; no TS stats / no TS re-derivation). Protein
   matches (server-side).
2. **Keep the current unified flow.** Peptide keeps the one `reportedPeptideId` path (with `groupId` attached); the
   charts collapse to `groupId` as they do today, the table uses the `reportedPeptideId`-summed path. We do NOT
   split charts onto a separate no-re-derivation path.
3. **Sequencing A → B → C** (do the cleanups first — they shrink the surface the retrofit touches).

## Phases

### Phase A — delete the two standalone quant LIST pages
Delete the retiring standalone Quant peptide LIST page + Quant protein LIST page (psb routes
`d/pg/psb/quant-peptide/` + `quant-protein/`) — FE dirs `quant_peptide_page/` + `quant_protein_page/`, their Java
page controllers + JSPs + path constants + build.gradle entries, and the now-dead nav references. See
[`quant_pages_TODO.md`](quant_pages_TODO.md) "⚠ TOP-PRIORITY DEFERRED" item A for the full footprint.
**GROUNDED 2026-09-26 (corrects earlier wording):** the single-protein **overlay** (`quant_single_protein_page/`)
and `quant_peptide_and_single_protein_shared/` are **KEPT** — they are live dependencies of the Quant Common page,
NOT standalone-only. And the crux for C is resolved: the standalone pages use the **same shared `quant_PrototypeData`
store**, not a forked data path (a forked row-builder exists in the shared dir but reads the shared store and is
used by Quant Common) — so C has no fork to untangle.

### Phase B — single-requestId full sweep
Convert the shared `QuantRunInfoPanel_Component` + the viewer pages from `requestIds[]` to a single `requestId`
and drop the plural plumbing. See [`quant_pages_TODO.md`](quant_pages_TODO.md) item B (a light hard-fatal guard on
the Quant Common page already landed 2026-09-26). After B, the retrieval refactor deals with exactly one run
(still possibly multi-search). Do NOT touch the project-page runs list (legitimately many runs).

### Phase C — single-fetch retrieval refactor (design LOCKED 2026-09-26; GROUNDED)
Collapse the per-pair fetch/reassemble to ONE all-samples call per file, for peptide + protein × raw + normalized
(4 render-path endpoints). **Split: C1 = protein first (trivial — establishes the single-call harness), then
C2 = peptide (adds the per-search re-derivation loop).**

**Locked decisions (maintainer 2026-09-26):**
- **Modify the 4 render-path controllers IN PLACE** (their sole caller is `quant_PrototypeData`; A2 raw pages use
  different controllers) — not new controllers. Request DTO changes from single-ssfid to `{ requestId, pairs[] }`
  (peptide also `searchDataLookupParamsRoot` — ONE page-wide root already spans all searches). Parse the combined
  file ONCE; emit ALL `Intensity_<ssfid>` columns. Protein = straight all-columns. Peptide = loop distinct
  projectSearchIds, call the pure re-derivation service once per search over the one parsed file, attribute each
  ssfid's column via its own search's map.
- **AUTH generalizes:** `validatePublicAccessCodeReadAllowed` already takes `List<projectSearchId>` — pass all the
  run's distinct ones; the per-pair searchScanFileId-belongs-to-search check loops.
- **Response shape = PER-SSFID** (outer = scan file, inner = that sample's records) — maps directly onto the
  existing sample-major store (`Map<ssfid, Map<featureKey,value>>`), so consumers (charts + both tables) are
  UNCHANGED and the FE just swaps "loop N call results" for "loop the one response's per-ssfid entries." (A cleaner
  feature-major response + store is DEFERRED — see `quant_pages_TODO.md` item C; it needs a full store rewrite.)
- **Batch-status call:** clean it up to key on the single requestId (post-Phase-B there is exactly one).
- FE: rewrite the two per-file `_load_StatusThenResults` (peptide + protein; each covers raw + normalized via the
  passed endpoint URL) to make ONE result call and assemble the same store from the per-ssfid response.
- **REQUIRED in C's review:** the peptide value cross-check (raw + normalized: plotted/served values) folded here.
- **REMIND the maintainer of the deferred item C (feature-major store) once Phase C is done.**

## Notes
- This is a retrieval-SHAPE refactor, not the DB-persistence work. The re-derivation-at-retrieval remains a
  prototype artifact to be revisited in the DB-ingest phase (see
  [`quant_things_to_deal_with_when_start_store_in_db.md`](quant_things_to_deal_with_when_start_store_in_db.md)).
- The A2 raw data-file pages (native per-file FlashLFQ TSV viewers) are a separate surface — genuinely per-file in
  PER_FILE mode — and are NOT the subject of Phase C (which is about the combined file). Phase B does touch them
  (they share `QuantRunInfoPanel`).

*Public repo — design/feature content only. No secrets, credentials, internal hostnames/IPs, or private info.*
