# FlashLFQ output — `QuantifiedPeptides.tsv` (what it contains, and how it derives from the peaks file)

**Date: 2026-08-11.** Source-of-truth: FlashLFQ's own C# engine (**mzLib**, the line FlashLFQ's `CMD.csproj`
pins — `mzLib 1.0.566`, git tag `1.0.566`, commit `703edec`). All file:line citations are that tag, read in
full. Numbers cross-checked against the real Limelight run `36b59…` output. Companion:
`flashlfq_output_file__QuantifiedProteins.md` (protein file) and
`flashlfq_quant_peak_summing_vs_flashlfq_peptide_output_2026-08-05.md` (the **SUM vs MAX** comparison behind
the 2026-08-10 switch from the peaks file to this peptide file — see the update note below).

> **TL;DR.** `QuantifiedPeptides.tsv` has **one row per modified peptide sequence**. Its per-file intensity is
> the **single most-intense _unambiguous_ chromatographic peak** for that sequence (a **MAX**, not a sum), and
> **0 for peptidoforms whose peak is shared** with another full sequence. It is a MAX-reduction of the same
> `ChromatographicPeak` objects that populate `QuantifiedPeaks.tsv`. **As of 2026-08-10, Limelight ingests
> THIS file** (the QuantifiedPeptides switch) — see the update note directly below.

## Update (2026-08-11): Limelight now ingests THIS file (not the peaks file)

As of the 2026-08-10 "switch to `QuantifiedPeptides`" work (implementation plan
`flashlfq_quant_switch_to_QuantifiedPeptides_file__implementation_plan_2026-08-10.md`; Phases 1–3 implemented
in the working tree, **held/uncommitted at time of writing** — git HEAD still carries the older
peaks-file + SUM path described in "Why Limelight originally ingested the peaks file" below), Limelight reads
its per-peptide MS1 quant **straight from this file**. It no longer sums `QuantifiedPeaks.tsv`.

**What Limelight passes INTO FlashLFQ (this becomes the `Sequence` column).** The FlashLFQ "Full Sequence"
Limelight writes into the identifications input for each PSM is the **grouping identity**
`<baseSequence>[+<summed reported-peptide-LEVEL variable-mod mass>]` — full precision, **static mods
EXCLUDED**, **non-positional**, carrying **no reportedPeptideId**. It is built in exactly one place,
`FlashLFQ_GroupingIdentity_Common.buildFlashLFQ_GroupingIdentity(baseSequence, variableModMasses)`, used by
**both** the request-build path (`FlashLFQ_Run__Request_Creation_RestWebserviceController`) and the
result-join path, so the two cannot drift. (The precursor mass is sent separately as `monoisotopic_mass` =
base + ALL mods incl. static, so m/z stays correct; that is not part of the identity.) Because the identity is
non-positional and mass-summed, positional isomers and different mod compositions with the **same added mass
collapse into one identity** — one output row — which is honest for MS1 (same precursor mass ⇒
MS1-indistinguishable) and also stops FlashLFQ treating them as distinct-identities-sharing-a-peak and zeroing
them.

**How Limelight reads it back.** The front end calls the joined webservice
`d/rws/for-page/flashlfq-run--result-retrieval-joined`
(`FlashLFQ_Run__Result_Retrieval_Joined_RestWebserviceController`). That controller: re-derives the reported
peptides + their reported-peptide-level variable-mod masses from the active cutoff filters (same searchers as
the request-build path) and rebuilds `groupingIdentity → [reportedPeptideId…]` via the **same**
`FlashLFQ_GroupingIdentity_Common`; GETs this file from the service (`?file=peptides`); parses `Sequence` plus
the single per-scan-file `Intensity_<file>` and `Detection Type_<file>` columns (a run is
per-(search, scan file), so there is exactly one of each — the controller rejects any other shape); and
returns, per reportedPeptideId, `{ intensity, groupId (= the identity), ambiguousZeroed (= detection type is
`MSMSAmbiguousPeakfinding`), detectionType }`. One identity / `groupId` can map to **more than one**
reportedPeptideId (the isomer collapse above); each such reportedPeptideId gets the **same** measured value,
and the front end uses `groupId` to render the shared (`⚭`) glyph.

**Consequence inherited from this file's semantics (mechanics below).** Because the value is FlashLFQ's MAX
(not a sum) and shared peptidoforms are zeroed, Limelight shows FlashLFQ's own peptide number for clean
peptides and a blank / `"overlapping signal"` marker for the shared ones. It does **not** recover a value for
a shared peptidoform — doing so would require the peaks file, or FlashLFQ's `QuantifyAmbiguousPeptides` option
(not exposed on the CLI), neither of which is used here.

## Where it's written

- The CMD wrapper calls `results.WriteResults(QuantifiedPeaks.tsv, QuantifiedPeptides.tsv, QuantifiedProteins.tsv, …)`
  (`FlashLFQ/Util/OutputWriter.cs:28-34`).
- `FlashLfqResults.WriteResults` writes the peptide file at `mzLib/.../FlashLFQ/FlashLFQResults.cs:606-630`:
  header `Peptide.TabSeparatedHeader(SpectraFiles)`, then **one line per `PeptideModifiedSequences` entry,
  ordered by modified sequence** (`:623-627`).

## Columns (`Peptide.TabSeparatedHeader`, `Peptide.cs:47-64`)

`Sequence` · `Base Sequence` · `Protein Groups` · `Gene Names` · `Organism` · then **one `Intensity_<file>`
column per spectra file** · then **one `Detection Type_<file>` column per spectra file**.

- `Sequence` = FlashLFQ's modified (full) sequence — the grouping key. In the **current** Limelight path this
  is the grouping identity `<baseSequence>[+<summed reported-peptide-level variable-mod mass>]` (full
  precision, static mods excluded, non-positional, **no** reportedPeptideId), built by
  `FlashLFQ_GroupingIdentity_Common` — see the 2026-08-11 update note above. (An earlier Limelight design
  instead embedded an `rpid<id>_` prefix here; that was replaced by the summed-variable-mass identity.)
- Per-file `Intensity_<file>` and `Detection Type_<file>` are written from `GetIntensity(file)` /
  `GetDetectionType(file)` (`Peptide.cs:264-271`, non-IsoTracker branch), i.e. exactly the values stored by
  `SetIntensity` in the calculation below.

## How the intensity is computed — `CalculatePeptideResults` (`FlashLFQResults.cs:130-235`)

Called once per run as `CalculatePeptideResults(FlashParams.QuantifyAmbiguousPeptides)` — and
`--usepepq`/ambiguous-quant is **off by default**, so `quantifyAmbiguousPeptides == false`
(`FlashLfqEngine.cs:304`; option default `FlashLfqSettings.cs:94`).

1. **Init** every (peptide, file) to intensity `0`, detection `NotDetected` (`:132-140`).
2. **Per spectra file**, take the peptidoform's **unambiguous** peaks and group by modified sequence
   (`:145-152`): kept peaks are those with `NumIdentificationsByFullSeq == 1` (mapped to exactly one full
   sequence — i.e. **not shared**), non-decoy, and (for MBR peaks) passing the MBR q-value.
3. **Intensity = MAX of those peaks** (`:156`):
   ```csharp
   double intensity = sequenceWithPeaks.Value.Max(p => p.Intensity);   // :156  MAX, not a sum
   ChromatographicPeak bestPeak = sequenceWithPeaks.Value.First(p => p.Intensity == intensity);
   ...
   PeptideModifiedSequences[sequence].SetIntensity(filePeaks.Key, intensity);   // :177
   PeptideModifiedSequences[sequence].SetRetentionTime(filePeaks.Key, bestPeak.ApexRetentionTime); // :178
   ```
   Detection type is derived from `bestPeak` + whether intensity>0: `MBR`, `MSMS`, or
   `MSMSIdentifiedButNotQuantified` (`:159-176`).
4. **Ambiguous (shared) peaks** — `NumIdentificationsByFullSeq > 1` (`:183-221`). Under the default
   (`quantifyAmbiguousPeptides == false`), if a shared peak contributes a large fraction
   (`fractionAmbiguous > 0.3`) the peptidoform is **zeroed and flagged** (`:214-219`):
   ```csharp
   PeptideModifiedSequences[sequence].SetDetectionType(filePeaks.Key, DetectionType.MSMSAmbiguousPeakfinding);
   PeptideModifiedSequences[sequence].SetIntensity(filePeaks.Key, 0);
   ```
   (`HandleAmbiguityInFractions`, `:237-314`, only affects **fractionated** samples — not the Limelight
   single-file case.)

**So each cell = the single most-intense unambiguous peak (MAX) for that sequence in that file, or 0 if the
sequence's signal is shared.** `--int` off (default) means each peak's `Intensity` is an **apex height**
(`ChromatographicPeak.cs:64-77`), so the peptide value is an apex height, never a sum of them.

## Detection Type values (`DetectionType.cs`)

`MSMS` (MS2-identified peak) · `MBR` (match-between-runs) · `MSMSAmbiguousPeakfinding` (peak shared by >1 full
sequence → intensity 0) · `MSMSIdentifiedButNotQuantified` (identified but no quantifiable peak) ·
`NotDetected` · `IsoTrack_*` (IsoTracker mode, not used here).

## How it *uses* the peaks file

It doesn't re-read `QuantifiedPeaks.tsv` — it consumes the **same in-memory `ChromatographicPeak` objects**
(`_results.Peaks[file]`) that `WriteResults` also serializes to `QuantifiedPeaks.tsv` (`:597-602`). One
`QuantifiedPeaks` row = one `ChromatographicPeak` (a merged feature: charges folded in per
`FlashLfqEngine.cs:490-527`, same-apex peaks merged in `RunErrorChecking` `:1298-1392`). The peptide file is
therefore a **per-modified-sequence MAX over the unambiguous subset of those peak rows**:

```
QuantifiedPeaks rows (features)  ──group by modified sequence, unambiguous only──▶  MAX  ──▶  QuantifiedPeptides intensity
                                                                                   (shared → 0)
```

## Why Limelight originally ingested the peaks file (historical — superseded 2026-08-10)

> **Historical.** This describes the pre-2026-08-10 design (still the state of git HEAD). Limelight now ingests
> **this** peptide file directly — see the "Update (2026-08-11)" note near the top. Kept because the SUM-vs-MAX
> divergence it records is the reason the switch was a deliberate change, not a wash, and because it explains
> what git HEAD (and the preserved peaks-path clone snapshot) still does.

The original design ingested `QuantifiedPeaks.tsv` and computed its **own** per-reported-peptide value by
**summing** a peptidoform's peaks and **attributing shared peaks to all** claiming forms — the opposite of this
file's **MAX + zero-shared**. On real run `36b59`, the two agree for 77% of peptidoforms and diverge for 23%
(see `flashlfq_quant_peak_summing_vs_flashlfq_peptide_output_2026-08-05.md`). The switch to ingesting this
peptide file therefore adopts FlashLFQ's own **MAX** value (a correction — the SUM over-reported vs. FlashLFQ)
and **zeroes every shared peptidoform** (any peak claimed by >1 full sequence), which is what surfaces as the
`"overlapping signal"` marker instead of a summed value.

## Provenance
All mechanics OBSERVED in mzLib `1.0.566` source at the cited lines. Column/behavior spot-checked against the
`36b59…` `QuantifiedPeptides.tsv`. Clone (outside any repo):
`/spinning-disk-02/code_downloads_for_research/from Github/mzLib` (checked out at tag `1.0.566`).
