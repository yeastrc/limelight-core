# FlashLFQ usage — critical review of whether quant is obtained properly

**Date:** 2026-07-29
**Scope:** Reviews how the FlashLFQ quant feature actually invokes FlashLFQ and consumes its output,
end to end: the Limelight webapp request-creation controller → the Python FlashLFQ service → the
`CMD.dll` command line → the prototype receive/display path. Grounded against the official FlashLFQ
documentation (wiki: *Using the Command Line*, *Identification Input Formats*, *FlashLFQ's Settings*).
**Open-mod mass support is treated as DEFERRED** and is therefore out of scope here; this review is
about the live, non-open-mod path plus the core mechanics.

**Provenance note:** items marked *observed* were read directly in the code; items marked *analysis*
are reasoning about consequences (consistent with the companion design docs) and were **not** produced
by executing a run.

---

## Bottom line

- **Single-scan-file search (the common case): FlashLFQ is used properly.** MBR is correctly forced
  off, the neutral monoisotopic mass is computed via the canonical peptide-mass calculator, retention
  time is correct (converted to minutes), the protein/sample id round-trip is clean, and apex-height
  quant is a legitimate, FlashLFQ-recommended metric. The only real defect in this case is a
  documentation mislabeling (see finding 1).
- **Multi-scan-file search: NOT proper.** A single joint FlashLFQ run executes with Match-Between-Runs
  (MBR) **on and unavoidable**, and it does so **silently**. This contradicts the project's own design
  (`flashlfq_per_scan_file_separate_run_rationale.md`) and corrupts the client-side presence-gating
  filter model. Per-file runs — the documented fix — are **not implemented** on either side, and there
  is no guard preventing a multi-file search from being submitted.

---

## Finding 1 — the default quant value is peak APEX HEIGHT, but the primary doc calls it AREA

**Severity: correctness-of-understanding (not a runtime bug). Both single- and multi-file.**

*Observed.* FlashLFQ's `--int` ("Integrate peak areas") defaults **false**, so the `Peak intensity`
column is the **peak's apex height, not an integrated area** (official docs: integration is "not
recommended"). This is confirmed end to end:

- Webapp/form default: `integrate: false` (`quant_FlashLFQ_Parameters.ts`).
- Service: `integrate` defaults `False` and the `--int` switch is emitted **only** when turned on
  (`flashlfq_command.py` `_BOOLEAN_FLAGS`). So default runs report apex height.

*The defect:* the central design doc `flashlfq_output_to_limelight_mapping.md` repeatedly frames the
value as an integrated area — e.g. *"integrate the area under the chromatographic peak … That does not
change"* and *"Each row of `QuantifiedPeaks.tsv` is one integrated XIC — the area under one
chromatographic peak."* The prototype comment `quant_PrototypeData.ts` likewise says *"one integrated
XIC area = 'Peak intensity'."* Both are **wrong for the shipped default** — the number is a height.
(The same doc's later "how Limelight's chromatogram compares" section correctly says "default = apex,
not area," so the doc set is internally contradictory.)

Apex height is a perfectly valid metric — the problem is purely that users/readers are told it is an
area. That matters most when comparing against Limelight's area-based PSM chromatogram, or when
reasoning about the summed rollup.

**Fix:** make code, form, and docs agree. Either (a) correct the "area" wording to "apex height" in
`flashlfq_output_to_limelight_mapping.md` and `quant_PrototypeData.ts`, or (b) if an area is genuinely
wanted, default `--int` on (and update the form default) — but pick one.

---

## Finding 2 — multi-scan-file searches run one joint MBR run that cannot be disabled, silently

**Severity: HIGH for multi-scan-file searches. Not triggered for single-file searches.**

*Observed, both sides:*

- The webapp sends **one request per search containing all that search's scan files**, yielding one
  requestId per search.
- The service generates every file's mzML into **one `--rep` directory**, writes **one** identifications
  TSV, and invokes FlashLFQ **once over all files** ("ONE run over ALL mzML files"). It writes an
  `ExperimentalDesign.tsv` that makes **each file its own `Condition`** (Biorep 1, Fraction 1).
- MBR (`--mbr`) is a bare CLI switch defaulting **on** with **no off-token** in this build (`CMD.dll
  1.0.0.0`). The service forces MBR off **only** when `scan_file_count <= 1`. So for a **multi-file
  search, MBR stays on and cannot be turned off.**
- **It is silent:** the "not honored" warning fires only when the user explicitly asked MBR *off*. With
  default parameters on a multi-file search, the intended value already equals the applied value, so
  **no warning is logged** — MBR simply runs.

*Analysis (consistent with `flashlfq_per_scan_file_separate_run_rationale.md`):* MBR transfers
identifications across files and emits peaks in files where the peptide was **not** identified — peaks
with **no seeding PSM** in their own scan file. Those phantom peaks still carry a `reportedPeptideId`
and are summed into the peptide's displayed quant, but the client-side **presence-gating** filter model
has no PSM behind them to keep or remove. The peak is therefore **unfilterable**, breaking the
run-once/display-many model. The project's own rationale doc concludes that runs must see **exactly one
scan file** — a design that is **not implemented** in either the webapp controller or the service.

Secondary (same area): marking every file `Condition = <file>` / `Fraction = 1` tells FlashLFQ the
files are distinct conditions/bioreps rather than fractions of one sample. If the files are actually
fractions, this is the wrong treatment, and it makes the display's cross-file sum a sum across
conditions (which FlashLFQ deliberately avoids).

**Fix (ranked):**
1. Implement **per-scan-file runs** (one `--rep` dir / one FlashLFQ invocation per scan file; sum the
   per-file peaks on the receive side), collapsing the multi-file case into the validated single-file
   topology — this forces MBR off by construction.
2. Until (1) lands, **hard-block or loudly warn** on multi-file-search submissions, and fire the
   not-honored warning **whenever MBR runs on >1 file**, not only when the user unchecked it.
3. Revisit `ExperimentalDesign.tsv` Condition/Fraction semantics as part of the multi-file design.

---

## Finding 3 — reported peptides whose mass cannot be computed are dropped silently

**Severity: low.**

*Observed.* If the canonical mass calculator cannot compute a base peptide mass (e.g. a non-standard
residue), the webapp controller drops that reported peptide's PSMs from the run and only `warn`-logs it.
The result is partial, silent data loss with no user-visible signal. Consider surfacing a count of
dropped peptides in the run manifest / UI.

---

## Retention time — checked and correct (not a finding)

An earlier concern was that the webapp sends only `scan_number`, not retention time. Confirmed *observed*
that the service resolves each PSM's RT by scan number from spectr scan metadata and **converts seconds
→ minutes** before writing the TSV, matching FlashLFQ's minutes requirement; the MS2-scan RT is the
correct peak-tracing anchor. One thin edge: a scan number absent from the metadata writes an **empty**
RT cell (FlashLFQ requires RT), so a scan-number mismatch would mishandle that PSM — rare, worth a guard.

---

## What is sound (credit where due)

- **Neutral monoisotopic mass** is computed once, in the webapp, via the canonical peptide-mass
  calculator (base peptide + residue-matched static mods + dynamic/variable mods, with an if/else that
  avoids double-counting PSM-level vs reported-peptide-level variable mods). The service does **no**
  chemistry. This is exactly the theoretical mass FlashLFQ's peakfinding needs, and it centralizes mass
  logic. (No terminal-static-mod gap: Limelight models static mods as residue-only.)
- **Per-search separation** (no cross-search MBR / RT-alignment / normalization) is correctly reasoned
  and implemented.
- **Id-keyed round-trip** — `scanfile_id_<id>` sample names, `psvid_<id>` protein accessions
  (`;`-delimited, names sanitized of `;`/tab/newline), `rpid<id>_` embedded in the Full Sequence — lets
  the output map back to Limelight with no chemistry re-parsing.
- **Settings self-verification:** the service reads back `FlashLfqSettings.toml` and logs any mismatch
  between what it asked for and what FlashLFQ applied — a good guard against silent flag-semantics drift.
- **Tool choice** (MIT, PSM-driven / no re-search, headless/containerizable, peptide+protein) is
  well-justified for the job.

---

## Caveats on this review

- The **receive/display path is an explicit throwaway prototype** (fetches `QuantifiedPeaks.tsv` by URL
  hash over HTTP; no DB persistence). Findings about it are about the current prototype, not a shipped
  ingest.
- **Open-mod mass support is deferred**, so the mass-binning, tagged Full-Sequence tokens, and
  per-display-form rollup were not evaluated as live behavior here.
- Charge handling (default quantifies a charge range; the rollup sums across charges and never
  charge-filters) is a **known, documented** limitation — see
  `flashlfq_quant_run_on_final_filtered_psms.md` (the ~54% charge-filter over-count and the
  "honest-labeled total" resolution). Not re-litigated here.
