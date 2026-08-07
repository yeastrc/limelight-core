# FlashLFQ output — `QuantifiedProteins.tsv` (what it contains, and how it derives from the peptide/peaks files)

> **🚩 FlashLFQ-REFERENCE ONLY — this is NOT a Limelight feature.** Limelight does **not** process FlashLFQ
> protein output. There is **no Limelight code that reads `QuantifiedProteins.tsv`** (verified: the only repo
> mentions are comments about the `psvid_` identifier round-trip; the quant loader parses **only**
> `QuantifiedPeaks.tsv`). All FlashLFQ-results processing in Limelight is **peptide-level, from the peaks
> file**. This doc exists purely to document what FlashLFQ writes, for reference — not because any protein
> path exists or is planned.

**Date: 2026-08-07.** Source-of-truth: FlashLFQ's own C# engine (**mzLib**, the line FlashLFQ's `CMD.csproj`
pins — `mzLib 1.0.566`, git tag `1.0.566`, commit `703edec`). All file:line citations are that tag, read in
full, plus a numerical spot-check against the real Limelight run `36b59…` output. Companions:
`flashlfq_output_file__QuantifiedPeptides.md` (peptide file) and
`flashlfq_quant_peak_summing_vs_flashlfq_peptide_output_2026-08-05.md`.

> **TL;DR.** `QuantifiedProteins.tsv` has **one row per protein group**. Its per-sample intensity is computed
> by a **weighted median-polish** over that protein's **unambiguous, single-protein peptide** intensities
> (which are themselves the peptide file's MAX-of-peaks values). It is **NOT** a top-3 sum in this version
> (that method still exists in the code but the default run does not call it — verified on real data). It is
> therefore **two reductions** removed from the peaks file: peaks → (MAX) peptides → (median polish) proteins.
> **Limelight does not read this file.**

## Where it's written

- CMD wrapper: `results.WriteResults(… , QuantifiedProteins.tsv, …)` (`FlashLFQ/Util/OutputWriter.cs:28-34`).
- `FlashLfqResults.WriteResults` writes the protein file at `FlashLFQResults.cs:632-643`: header
  `ProteinGroup.TabSeparatedHeader(SpectraFiles)`, then **one line per `ProteinGroups` entry, ordered by
  protein-group name** (`:638-641`).

## Columns (`ProteinGroup.TabSeparatedHeader`, `ProteinGroup.cs:48-74`)

`Protein Groups` · `Gene Name` · `Organism` · then **one `Intensity_<sample>` column per sample**
(grouped by `Condition` × `BiologicalReplicate`, `:58-71`).

- For an **unfractionated, no-conditions** run (the Limelight case: a single scan file, default condition) the
  column is `Intensity_<filename>` and the value is `GetIntensity(thatFile)` (`ProteinGroup.cs:90-92`). For
  fractionated data the per-sample value **sums fractions** (`:96-97`) — not relevant to Limelight.

## How the intensity is computed — median polish (default), not top-3

The default engine run calls **`CalculateProteinResultsMedianPolish(FlashParams.UseSharedPeptidesForProteinQuant)`**
(`FlashLfqEngine.cs:307`). `--sha` (use shared peptides) defaults **false** (`FlashLfqSettings.cs:85`). A
separate `CalculateProteinResultsTop3` method exists (`FlashLFQResults.cs:316-365`) **but the default run
never calls it** (the only protein call in the engine is the median-polish one).

`CalculateProteinResultsMedianPolish` (`FlashLFQResults.cs:371-582`):

1. **Input peptides** (`:383-404`): only peptides where `UnambiguousPeptideQuant()` is true
   (`Peptide.cs:288-291` — has some intensity `>0` and some detection type `!= MSMSAmbiguousPeakfinding`),
   that are `UseForProteinQuant`, and — since `useSharedPeptides == false` — **map to exactly one protein
   group** (peptides in >1 group are skipped, `:388`).
2. **Build a log2 peptide × sample matrix** (`:417-481`): each cell = `log2` of the peptide's per-sample
   intensity (the highest-fraction value; `:432-476`), missing → `NaN`.
3. **Weighted median polish** (`MedianPolish`, `:714-790`; invoked `:505`): iteratively removes overall / row
   / column effects (weights = inverse-square distance to the median). Row effects ≈ per-peptide ionization
   efficiency; column effects ≈ per-sample differences (`:502-504`).
4. **Un-log to an intensity** (`:507-573`):
   ```csharp
   double referenceProteinIntensity = Math.Pow(2, overallEffect) * peptidesForThisProtein.Count;   // :509
   double sampleProteinIntensity   = Math.Pow(2, columnEffect) * referenceProteinIntensity;         // :550
   proteinGroup.SetIntensity(sample.First(), sampleProteinIntensity);                               // :573
   ```

**For a single sample** (Limelight), the column effect ≈ 0, so this reduces to
`2^overallEffect × peptideCount` ≈ **(a robust median-central peptide intensity) × (number of contributing
peptides)** — a central-tendency estimate scaled by peptide count, **not a sum and not top-3**.

### Numerical confirmation (run `36b59…`, single sample)

Reported `QuantifiedProteins` intensity matched the single-sample median-polish estimate for **7/7** proteins
(within 5%); a top-3 sum matched only the trivial 1-peptide protein. Examples:

| Protein | #unambig. peptides | Reported | Median-polish est. | Top-3 sum (for contrast) |
|---|---|---|---|---|
| BSA | 172 | 1.43e9 | 1.44e9 | 4.18e9 |
| Okp1 | 200 | 1.76e9 | 1.75e9 | 6.76e9 |
| Nnf1 | 7 | 1.24e7 | 1.24e7 | 5.18e7 |
| H6-SEC18 | 1 | 1.70e6 | 1.70e6 | 1.70e6 |

⇒ The current file is **median polish**. (This supersedes the "top-3 rollup" description in
`flashlfq_output_to_limelight_mapping.md`, which reflects older FlashLFQ behavior.)

## How it *uses* the peptide and peaks files

The protein value is built from the **peptide-level intensities** (`Peptide.GetIntensity`, `:444`,
`:523`), which are themselves the **MAX of the unambiguous peaks** per modified sequence (see the peptide-file
doc). So the chain is two reductions off the peaks file:

```
QuantifiedPeaks rows (apex-height features)
      │  group by modified sequence, unambiguous only, take MAX  (shared → 0)
      ▼
QuantifiedPeptides intensities
      │  keep unambiguous single-protein peptides, log2, weighted median polish, un-log × peptideCount
      ▼
QuantifiedProteins intensity   (per sample)
```

Shared peaks were already zeroed at the peptide step; shared **peptides** (>1 protein) are excluded here by
default. So the protein number is built only from the cleanly-attributable subset.

## Why Limelight ignores this file

Limelight ingests `QuantifiedPeaks.tsv` and does its **own** peptide/protein rollup (so it can attribute
shared signal and handle the open-mod grain itself). The FlashLFQ protein file is additionally unsuitable for
open-mod data because it is built on the peptide file's zeroed-shared values
(`flashlfq_output_to_limelight_mapping.md`). If Limelight ever wanted to *match* FlashLFQ's protein number it
would have to replicate median polish (not a top-3 sum) — one input to the SUM-vs-MAX / apex-vs-area decision
in `flashlfq_quant_aggregation_decision_brief_2026-08-05.md`.

## Notes
- `BayesianFoldChangeAnalysis.tsv` is written **only** with `--bay` (Bayesian, cross-condition; default off,
  `FlashLfqSettings.cs:70`) and only when Bayesian results exist (`OutputWriter.cs:25,32`;
  `FlashLFQResults.cs:645-706`). Not produced in the Limelight single-file run.
- `--nor` (normalize) defaults off (`FlashLfqSettings.cs:38`); `--int` off = apex height; `--mbr` on by
  default but a no-op with one file.

## Provenance
Mechanics OBSERVED in mzLib `1.0.566` source at the cited lines; the median-polish-vs-top-3 conclusion is
**verified numerically** against the `36b59…` `QuantifiedProteins.tsv` + `QuantifiedPeptides.tsv` (7/7). Clone
(outside any repo): `/spinning-disk-02/code_downloads_for_research/from Github/mzLib` (tag `1.0.566`).
