# FlashLFQ quant — does Limelight read peaks, sum them per peptide-table row, and is that "the same as FlashLFQ's peptide output"?

**Date: 2026-08-05** (updated same day with a pin-verification against FlashLFQ/mzLib source)

Written to answer three specific recollections about the (throwaway-prototype) FlashLFQ quant path:

1. Limelight is coded to read the **per-peak file** from FlashLFQ.
2. Limelight **sums the peaks** as it rolls up to the row in the peptide table.
3. "Claude said this summing is the same as how FlashLFQ produces its peptide output file, so it is valid
   that Limelight do the same thing."

**Verdict up front:** #1 and #2 are confirmed in live Limelight source. #3 is **partly right and partly
wrong, now settled by reading FlashLFQ's own source**: the *apex-height-is-the-default* half is TRUE, but the
pivotal sub-claim — *"FlashLFQ itself **sums** apex heights to build its QuantifiedPeptides output, so
Limelight's summing is the field's convention"* — is **FALSE**. FlashLFQ builds its peptide output by taking
the **single most-intense peak (MAX)**, and it **zeroes** shared peptidoforms; it does not sum. Limelight's
per-row **SUM** is therefore its own deliberate aggregation, **not** a replication of what FlashLFQ does.

**Provenance:** #1 and #2 verified against the actual TypeScript source (file:line below). #3 is now verified
against **FlashLFQ's own C# source** — the engine lives in **mzLib**, pinned by FlashLFQ's `CMD.csproj` to
`mzLib 1.0.566`; the citations below are read from **git tag `1.0.566`** (commit `703edec`), confirmed
identical in substance to mzLib master. Everything marked below is OBSERVED in that source, not inferred.

---

## Claim 1 — Limelight reads the per-peak file — ✅ CONFIRMED

`limelight_webapp/front_end/src/js/page_js/data_pages/quant/quant_PrototypeData.ts:420-435` parses
`QuantifiedPeaks.tsv` (the per-peak / per-feature file), locating columns by header name and pulling
`Peak intensity`:

```ts
420  function _parseText_ToParts( tsvText: string, projectSearchId?: number, searchScanFileId?: number ): _ParsedParts {
...
427      const headerFields = lines[0].split("\t");
428      const col_BaseSequence = headerFields.indexOf("Base Sequence");
429      const col_FullSequence = headerFields.indexOf("Full Sequence");
430      const col_PeakIntensity = headerFields.indexOf("Peak intensity");
```

Each data row becomes one `_Peak` carrying `intensity` (`quant_PrototypeData.ts:446`, assigned `:468`). The
module header comment states it directly (`:31-33`): *"Each QuantifiedPeaks row is one MS1 feature; 'Peak
intensity' is the chromatographic peak's APEX HEIGHT by default (FlashLFQ --int off)…"*

(For the demo bridge, that TSV text is fetched per READY run through the `d/rws/for-page/flashlfq-run--result-retrieval`
proxy; see the load flow comment `quant_PrototypeData.ts:13-29` and the plan
`flashlfq_quant_http_results_retrieval_webservice_plan.md`. The parsing of the peak file is unchanged by how
the bytes arrive.)

---

## Claim 2 — Limelight sums the peaks into the peptide-table row — ✅ CONFIRMED

The peptide-table Quant cell is built by `get_QuantForDisplayForm`, called at
`.../protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Create_TableData.tsx:455`:

```tsx
455      const quantForForm = quant_PrototypeData.get_QuantForDisplayForm( reportedPeptideIds_ForQuant, openModDescriptor, projectSearchId, restrictToSearchScanFileId );
```

(NB: that file is one of the misleadingly-named `proteinPage_Display__SingleProtein_...` files that
**also drives the peptide page** peptide list — per `front_end/CLAUDE.md`.)

Inside `quant_PrototypeData.ts:290-301`, the sum is a straight accumulation of each contributing peak's
intensity:

```ts
290          let summedIntensity = 0;
291          let peakCount = 0;
292          for ( const pi of peakIndexUnion ) {
293              const peak = this._peaks[pi];
294              if ( applyProjectSearchIdRestriction && peak.projectSearchId !== restrictToProjectSearchId ) { continue; }
295              if ( applySearchScanFileIdRestriction && peak.searchScanFileId !== restrictToSearchScanFileId ) { continue; }
296              summedIntensity += peak.intensity;
297              peakCount++;
```

Key detail: `peakIndexUnion` is a `Set<number>` (`:249`, populated `:268-273`), so each peak is **counted
once** even when several of the row's reportedPeptideIds map to the same shared peak — no double-adding
within a row. The sibling methods `get_QuantForReportedPeptideIds` (`:315`) and the standalone rollups
(`:368`, `:381`) do the same union-then-sum.

---

## Claim 3 — "same as how FlashLFQ produces its peptide output file, so it's valid" — split verdict

Two separate points; the recollection merges them. One is right; the load-bearing one is **wrong**.

### (a) Limelight's rolled-up number is deliberately NOT the same as FlashLFQ's peptide output — ✅ (true, and by design)

The design explicitly **rejects** ingesting `QuantifiedPeptides.tsv`, because that file **zeroes every
peptidoform that shares a peak**. From `flashlfq_output_to_limelight_mapping.md:111-122`:

> *"`QuantifiedPeptides.tsv` — zeroes every ambiguous peptidoform … 39,188 peptidoform rows; 35,378 are zero
> … Total intensity in `QuantifiedPeptides` = 1.9e12, versus 2.6e13 in `QuantifiedPeaks` — i.e. the peptide
> file holds only ~7% of the measured signal. Ingesting it would silently drop ~93% of open-mod signal."*

Instead Limelight ingests **`QuantifiedPeaks.tsv`** and does its own attribution — a shared peak is
attributed to **all** the forms that claim it (like a shared PSM count), rather than zeroed
(`flashlfq_output_to_limelight_mapping.md:134-147`). So by design Limelight's totals are **different from —
and broader/larger than — `QuantifiedPeptides.tsv`**, not a reproduction of it.

### (b) The "FlashLFQ itself sums apex heights to build QuantifiedPeptides" defense is FALSE — ❌ (pin-verified against source)

The critical-review doc offered a validity defense (`flashlfq_quant_mapping_critical_review_2026-07-29.md:270-272`):

> *"FlashLFQ itself sums apex heights to build its own `QuantifiedPeptides` intensities … so this is the
> field's convention, not our invention."*

**Reading FlashLFQ's source (mzLib `1.0.566`) shows this is not what FlashLFQ does.** FlashLFQ builds each
peptidoform's intensity by **MAX-picking a single peak** (and zeroing shared ones), never by summing across a
peptidoform's features. `mzLib/mzLib/FlashLFQ/FlashLFQResults.cs`, method `CalculatePeptideResults` (full
method `:130-223`):

```csharp
// unambiguous peaks only: NumIdentificationsByFullSeq == 1  (:146), grouped by modified sequence (:149)
double intensity = sequenceWithPeaks.Value.Max(p => p.Intensity);          // :156  MAX, not Sum
...
PeptideModifiedSequences[sequence].SetIntensity(filePeaks.Key, intensity); // :177
```

- **Ambiguous / shared peaks** (`NumIdentificationsByFullSeq > 1`, `:184`) under the default
  `CalculatePeptideResults(quantifyAmbiguousPeptides: false)` call (`:72`) hit the `fractionAmbiguous > 0.3`
  branch and are set to **intensity 0** + `MSMSAmbiguousPeakfinding` (`:214-217`). That is the ~93% zeroing
  the mapping doc measured.
- That stored value is exactly what `QuantifiedPeptides.tsv` prints: `Peptide.ToString(...)` writes
  `GetIntensity(file)` per `Intensity_<file>` column (`Peptide.cs:264-267`, header `:57`), and `GetIntensity`
  returns what `SetIntensity` stored (`Peptide.cs:90-112`).

So at the peptide level FlashLFQ uses **MAX**, not sum. The only `Sum` anywhere near this path is the
**within-a-single-peak** area integration under `--int` (`ChromatographicPeak.cs:70-72`,
`Intensity = IsotopicEnvelopes.Sum(...)` = sum of per-scan envelopes over one peak's elution = area) — which
is opt-in, off by default, and is **not** "summing apex heights across a peptidoform's features."

### The apex-height *default* half of the claim IS true — ✅

`ChromatographicPeak.CalculateIntensityForThisFeature(bool integrate)` (`ChromatographicPeak.cs:64-77`):

```csharp
Apex = IsotopicEnvelopes.MaxBy(p => p.Intensity);          // :68  apex = single most-intense envelope
if (integrate) Intensity = IsotopicEnvelopes.Sum(...);     // :72  area  (only with --int)
else           Intensity = Apex.Intensity;                 // :76  apex height (default)
```

- `--int` defaults **false** (`FlashLFQ/Util/FlashLfqSettings.cs:47`, help text *"integrate peak areas (not
  recommended)"*); engine default likewise `integrate = false` (`FlashLFQResults.cs:65`).
- The `QuantifiedPeaks.tsv` `"Peak intensity"` column = this `Intensity` (`ChromatographicPeak.cs:151` header,
  `:213` value).
- An `IsotopicEnvelope.Intensity` is "the summed intensity of all isotope peaks detected in **one MS1 scan**"
  at one charge (`IsotopicEnvelope.cs:5-7,32-37`, note `/ chargeState` `:20`). So "apex height" = the
  isotope-summed intensity at the **single most-intense scan/charge** — not summed over the elution or across
  charge states.

### Accurate restatement of claim 3

> FlashLFQ's default per-peak value IS an apex height (`--int` off) — that half is right. But FlashLFQ builds
> its peptide output (`QuantifiedPeptides.tsv`) by taking the **single most-intense peak (MAX)** and
> **zeroing** shared peptidoforms — it does **not** sum apex heights. So Limelight's per-row **SUM** across a
> peptidoform's features is its own deliberate choice, differing from FlashLFQ in two ways: **SUM vs MAX**,
> and **attribute-shared-to-all vs zero-shared**. It is not "the field's convention, not our invention."

---

## Caveats that remain about the summed value

1. **Summing apex heights is an approximation, not physically additive.**
   `flashlfq_quant_mapping_critical_review_2026-07-29.md:263-277`: apex height ≈ area/width, so a sum of
   heights is proportional to a sum of abundances **only when the summed peaks share a width**. Integrated
   **area** is the additive quantity; apex is a proxy. Note this is now the *primary* rigor concern, because
   the "FlashLFQ does the same" defense in (b) does **not** hold — FlashLFQ never sums these in the first
   place. The summed number will also **never match** Limelight's existing area-based PSM chromatogram unless
   FlashLFQ is run with `--int true`.

2. **Apex vs area is an unresolved OPEN DECISION.**
   `flashlfq_quant_mapping_critical_review_2026-07-29.md:288-303`: runs are currently done in FlashLFQ's
   default apex mode, so the peptide-list quant sums apex heights today. Option A (run `--int true` →
   rigorously additive areas, but noisier per feature) vs Option B (keep apex → robust per feature and correct
   for ratios, but the label/tooltip must not imply an additive area). Not yet decided.

---

## Provenance / verification status

- **Claims 1 & 2:** verified in live Limelight TypeScript source at the file:line references above.
- **Claim 3:** verified against **FlashLFQ's own C# source**. The engine is in **mzLib** (FlashLFQ's
  `CMD.csproj` pins `mzLib 1.0.566`); citations read from **git tag `1.0.566`** (commit `703edec`) — files
  read in full: `ChromatographicPeak.cs`, `FlashLFQResults.cs` (through the entire `CalculatePeptideResults`),
  `IsotopicEnvelope.cs`, `Peptide.cs`, plus `FlashLFQ/Util/FlashLfqSettings.cs`. Substance identical to mzLib
  master. Local clones (research downloads, outside any repo):
  `/spinning-disk-02/code_downloads_for_research/from Github/{mzLib,FlashLFQ}`.
- All of the above is about the **throwaway prototype** front-end path (`quant_PrototypeData.ts` and the
  peptide-list table builder). The real solution is Track B (DB-backed ingest); this document describes the
  prototype's current behavior, not a final design.

## Related docs

- `flashlfq_output_to_limelight_mapping.md` — why ingest peaks not the summary files; the 93%-zeroed finding.
- `flashlfq_quant_mapping_critical_review_2026-07-29.md` — adversarial review; H8 (apex vs area), the open
  decision, and mitigating fact (i) (now corrected: FlashLFQ MAX-picks, does not sum).
- `flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md` — the separate (and stricter)
  rule that quant may NOT be summed across scan files / searches / conditions even though PSM count may.
