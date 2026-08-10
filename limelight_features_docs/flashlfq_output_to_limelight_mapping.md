# Mapping FlashLFQ output back to Limelight search results

Status: design analysis. Captured 2026-07-02; **trimmed 2026-08-07 to the non-open-mod case.**

> **Open-modification quant is OUT OF SCOPE.** Searches with open modifications are rejected for quant
> (deferred) — see `flashlfq_quant_status_and_decisions.md` ("Searches not supported for quant"). This doc
> previously carried the full open-mod ingest analysis; that analysis is preserved verbatim in
> **`flashlfq_open_mod_quant_out_of_scope__mapping_analysis_archive_2026-08-07.md`**, and the open-mod
> correctness ceiling is in `flashlfq_open_mod_quant_correctness_boundary_2026-07-29.md`. Everything below is
> the **non-open-mod** mapping. (**PSM-level** variable/dynamic-mod searches are also out of scope for quant;
> **reported-peptide-level** variable mods and static mods are fully supported.)

## Framing

Quant is peptide-level: FlashLFQ traces the peptide's XIC (extracted-ion chromatogram) and measures that
chromatographic peak. **By default (`--int` off) the reported `Peak intensity` is the peak's APEX HEIGHT, not
an integrated area** (area only with `--int true`). Either way it is one **per-feature value for one
chromatographic peak** — one `QuantifiedPeaks.tsv` row. Whether the summed display should instead use
`--int true` (an additive area, comparable to Limelight's PSM chromatogram) is an **open decision** — see
`flashlfq_quant_aggregation_decision_brief_2026-08-05.md`.

## Key fact: FlashLFQ echoes only the identity strings we send; it never interprets modifications

FlashLFQ has no database keys of its own and **no concept of modifications**. Per PSM we send:
`File Name, Base Sequence, Full Sequence, Peptide Monoisotopic Mass, Scan RT, Precursor Charge,
Protein Accession`. It:

- quantifies using the **precursor m/z**, which comes only from the **`Peptide Monoisotopic Mass`** we supply
  (water + Σ residue masses + Σ modification masses) and the charge. **Modification positions never affect the
  mass or the quant.**
- treats **`Full Sequence`** as an **opaque peptidoform grouping key** — whole-string equality to bucket PSMs
  into peptidoforms; it never parses `[+79.96]` into "phospho at position 3".

We exploit this: we send `scanfile_id_<id>` (→ `scan_file_tbl.id`) and `psvid_<id>_<name>`
(→ `protein_sequence_version.id`), so those come back as exact keys.

## The three axes

| Axis | FlashLFQ column | Maps via |
|---|---|---|
| Sample | `Intensity_scanfile_id_<id>` / `File Name` | `scanfile_id_<id>` → `scan_file_tbl.id` — **exact** |
| Protein | `Protein Group(s)` = `psvid_<id>_…` (`;`-joined) | `psvid_<id>` → `protein_sequence_version.id` — **exact** |
| Peptide | `Base Sequence`, `Full Sequence` | embed `reportedPeptideId` as an `rpid<id>_` prefix in `Full Sequence` — **exact round-trip** |

## Peptide axis: embed the key, don't re-parse the string

Reversing a `Full Sequence` string (`AAGAGKVT[+134.98497]K`) into a Limelight reported peptide is fragile: the
`[+mass]` tokens are the **combined, summed** mass per position (dynamic + static + terminal +
reported-peptide-level variable, folded together), while Limelight stores those as separate records — add
rounding, position conventions, and ambiguity and string-matching is a poor foundation. Instead we **embed the
Limelight key in the identity we send**: prefix `Full Sequence` with `rpid<id>_`, which FlashLFQ echoes back
verbatim, so every peak maps to its reported peptide with **no chemistry re-parsing** (same trick as the
sample and protein axes).

## Ingest `QuantifiedPeaks`, attribute inside Limelight

Ingest **`QuantifiedPeaks.tsv`** (one row per MS1 feature) as the source of truth and do the peptide/protein
attribution in Limelight — exactly how Limelight already handles PSM counts (one PSM counted under all its
peptides):

1. **Each peak = one feature = one intensity**, stored once. Map its `rpid<id>_` back to the reported peptide.
2. **Aggregate** to the display peptide by iterating peaks (each counted once); roll up to protein by deduping
   on peak.

For a **non-open-mod** search each peak's mapped-forms list is (almost always) a **single reported peptide**,
so the feature table effectively becomes a per-reported-peptide table with no extra work. A residual case:
same-mass positional isomers of a **reported-peptide-level** variable mod are distinct reported peptides
sharing one peak — handled by attribute-to-all + dedup-on-rollup, the same as a shared PSM.

(Why not just read FlashLFQ's summary files: see `flashlfq_output_file__QuantifiedPeptides.md` and
`flashlfq_output_file__QuantifiedProteins.md` — the peptide file **MAX-picks** a single peak and **zeroes**
shared peptidoforms; the protein file is a **median polish** over that. We recompute our own rollup from peaks.)

## Why a row's Quant doesn't change when filtering shrinks its PSM count

**What the user sees:** apply a filter that removes some PSMs from a peptide row (e.g. exclude a charge state,
a scan, a retention-time range) and the row's **PSM count drops but its Quant stays the same.** This is
correct, and it comes straight from what MS1 label-free quant *is*.

**Why.** A PSM count is a count of *identifications*, so it responds to any filter that removes
identifications. **Quant is not a count of PSMs — it is the measured value of a precursor chromatographic
feature (the XIC peak): its apex height by default, or integrated area with `--int`.** FlashLFQ computed that
value **once**, over the identifications we submitted, and a single peak measurement is **not decomposable
into per-PSM contributions** (there is no "the charge-3 part of this peak" to subtract). So narrowing the
*displayed* PSM subset cannot move the number.

**When Quant *does* change:** only when a filter changes **which features roll up to the row**, not when it
merely thins the PSMs within the row:
- **Moves the number** — filters that remove the **reported peptide(s)** (and therefore their peaks) that feed
  the row, or that remove a **sample / scan file** (each peak belongs to one sample).
- **Does *not* move the number** — filters that subset **PSMs within** a reported peptide it keeps (charge,
  scan number, precursor RT/m-z, individual PSM).

## Mass computed in Java, sent per-PSM

The webapp computes each PSM's neutral monoisotopic mass **once** (Limelight's canonical peptide-mass
calculator) and sends it as a per-PSM field; the FlashLFQ runner does **no** mass computation (single source of
truth). A peptide whose mass Limelight cannot compute (non-standard residue) is dropped before sending.

## Chromatogram cross-check (non-open-mod)

Limelight already computes an MS1 peak **area** in the PSM-list chromatogram
(`psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component.tsx`; boss-specified). It will generally **not** equal
FlashLFQ's number. Both compute a *theoretical* target m/z (Σ residues + Σ mods + water, then `(mass+z·proton)/z`),
extract with a ppm tolerance, and sum an isotope envelope, but they diverge on:

1. **Area vs apex height** — the chromatogram integrates a trapezoidal area; FlashLFQ by default reports the
   apex intensity (height), integrating an area only with `--int true`.
2. **RT integration** — chromatogram: fixed window (first→last PSM RT ± 30 s, trapezoid over every MS1 scan,
   no peak-shape detection); FlashLFQ: detects the chromatographic peak (apex + boundaries).
3. **Charge** — chromatogram uses one selected charge; FlashLFQ measures per charge and sums to the peptide.

The cleanest close-match test is a **single-charge** peptide with matched charge and `--int true`.

## Schema implication

Store a **feature/peak-level** quant record (intensity + its mapped reported-peptide(s)) as the source of
truth, with per-reported-peptide and per-protein-group views **derived** from it.

## Related docs

- `flashlfq_quant_status_and_decisions.md` — status + decisions (start here); "Searches not supported for quant".
- `flashlfq_output_file__QuantifiedPeptides.md` / `__QuantifiedProteins.md` — what FlashLFQ's summary files contain.
- `flashlfq_quant_aggregation_decision_brief_2026-08-05.md` — the SUM-vs-MAX / apex-vs-area decisions.
- `flashlfq_open_mod_quant_out_of_scope__mapping_analysis_archive_2026-08-07.md` — the archived open-mod ingest
  analysis (out of scope); `flashlfq_open_mod_quant_correctness_boundary_2026-07-29.md` — open-mod correctness ceiling.
