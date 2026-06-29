# FlashLFQ — technical summary, behaviour for per-search quant, and comparison

Audience: technical review of the LFQ engine chosen for Limelight's FlashLFQ feature. Limelight runs
FlashLFQ **per search** (one run per search, over that search's own scan files; most searches are a
single scan file). Cross-search joint runs are not done, so the multi-run features (RT alignment,
match-between-runs, cross-sample normalization) are described but scoped out in §4.

Parameter defaults below are from FlashLFQ's Settings documentation and the method papers; where a
public source does not specify an internal, that is stated rather than guessed.

---

## 1. Provenance

- **FlashLFQ**, open source (**MIT**), from the **Smith Research Group (L. M. Smith), Dept. of
  Chemistry, University of Wisconsin–Madison** (`smith-chem-wisc`); same group as the **MetaMorpheus**
  search engine, with which it shares the underlying mzLib I/O + chemistry libraries. .NET; ships a
  CLI and an official Docker image. Actively maintained.
- **Method papers:**
  - Millikin, Solntsev, Shortreed, Smith. "Ultrafast Peptide Label-Free Quantification with
    FlashLFQ." *J. Proteome Res.* **2018**, 17(1), 386–391. —
    https://pubs.acs.org/doi/abs/10.1021/acs.jproteome.7b00608 (PMID 29083185, PMC5814109) —
    core indexing/quant method.
  - "Fast, Free, and Flexible Peptide and Protein Quantification with FlashLFQ." 2022
    (PMID 36308694, PMC9623451) — https://pmc.ncbi.nlm.nih.gov/articles/PMC9623451/ — updated
    description + protocol.
  - Millikin et al., Bayesian fold-change / posterior-error-probability protein method, 2020 (the
    optional `--bay` path; not used here).

---

## 2. Input contract — it quantifies supplied PSMs; it does not search

FlashLFQ is **identification-driven**: no database search, no spectral library. It ingests a PSM
list and a set of MS1-containing spectra files and quantifies exactly those identifications. Generic
TSV columns (one row per PSM):

`File Name · Base Sequence · Full Sequence · Peptide Monoisotopic Mass · Scan Retention Time ·
Precursor Charge · Protein Accession`

Quantification is keyed on **`Full Sequence` (the peptidoform)** — i.e. a modified form is a distinct
quantification target; `Base Sequence` is used for protein-level grouping/rollup. Limelight supplies
all of this from the search's cutoff-passing PSMs: monoisotopic mass computed from sequence + the
per-position modification masses, charge and scan number from the PSM, retention time from the spectr
scan, and protein accession(s) via reportedPeptide → protein-sequence-version → name. Because it
quantifies *our* IDs (no re-search), there is no second identification set to reconcile.

---

## 3. Algorithm — the core MS1 feature-extraction (the entire pipeline for a single scan file)

**Indexing (the "Flash").** For a given spectra file, FlashLFQ computes, from the identified
peptides' monoisotopic masses across a **range of charge states**, the set of precursor m/z values of
interest, and builds an **m/z-indexed lookup table of the file's MS1 peaks** (every MS1 centroid is
filed by its m/z). XIC extraction is then a lookup rather than a scan-by-scan search — this is the
order-of-magnitude speedup; the saved time is reinvested in checking multiple charge states, which
the 2018 paper shows improves replicate reproducibility. (Exact bin width is not published.)

**Per identified peptidoform, in its own MS1 data:**

1. **Predict the isotopic envelope** from the peptide's monoisotopic mass + charge.
2. **Find the envelope** among the indexed MS1 peaks at the expected m/z within **PPM tolerance
   (default ~10 ppm; 5–10 ppm typical for Orbitrap)**, requiring **≥ 2 isotope peaks present**
   (`Number of Isotopes Required = 2`) within an **isotope PPM tolerance (default 5 ppm)**. Requiring
   a multi-peak isotope pattern is the main guard against spurious single-peak matches.
3. **Trace the chromatographic peak** across adjacent MS1 scans around the PSM's **identification
   retention time** to define the elution profile of that envelope.
4. **Report intensity.** **Default = peak apex height** (the maximum of the traced peak). Integrated
   **peak area** is an *optional* advanced setting (`Integrate Peak Areas`) and is **off by default**
   (the docs note area tends to be noisier). So out of the box, "intensity" = apex height of the
   matched isotopic envelope's chromatographic peak.

**Charge states.** By default FlashLFQ quantifies a **charge-state range**, not only the identified
charge (the `Only Quantify Identified Charge` setting restricts it). This is why a peptide observed
at, say, 2+ also contributes signal detected at 3+.

**Protein rollup (per sample).** Peptides are assigned to proteins under **parsimony**; `Use Shared
Peptides` controls whether peptides mapping to multiple protein groups are used (commonly disabled).
The default `QuantifiedProteins` intensity is the **sum of the protein's 3 most intense peptides** in
that sample — a standard, outlier-robust protein-abundance estimate. (The optional Bayesian model
produces fold-changes + PEPs across conditions; not used here.)

**Validation.** FlashLFQ peptide intensities correlate with MaxQuant's at **Pearson r ≈ 0.99**, at
~10× the speed.

For a **single scan file (one sample)** that is the complete computation: per-peptidoform apex
intensities + the top-3 protein rollup, with **no cross-sample step** involved.

---

## 4. The multi-run features — what they are, and why they are scoped out for us

With **> 1 file** in a run, three inherently cross-file steps engage:

- **Retention-time alignment** — a nonlinear alignment between files built from shared identified
  peptides as anchors, so a peptide's elution time in one file maps to the expected window in another.
- **Match-between-runs (MBR)** — for a peptidoform identified (by MS/MS) in file A but not in file B,
  use the alignment + predicted isotope envelope to locate and quantify its peak in B. Current
  FlashLFQ scores each transfer with a **posterior error probability** (observed directly in our run
  logs: "Computing PEP for MBR Transfers"), with a configurable **Maximum MBR Window** (RT tolerance,
  minutes). `Require MS/MS ID in Condition` further restricts transfers.
- **Median-center normalization** (`Normalize Intensities`) — computes per-file normalization factors
  on the assumption that the **median peptide log-ratio between samples is ~0** (most proteins
  unchanged).

All three **assume the files are one comparable experiment**. That assumption is exactly why
Limelight quantifies **per search**:

- **Single-scan-file search** → none of these apply (one sample).
- **Search spanning multiple scan files** → they apply only **within that one search** — files the
  user deliberately combined into a single analysis, where the assumption holds by construction.
- **Across different searches** → separate FlashLFQ runs, so RT alignment / MBR / normalization are
  **never** applied between searches we cannot assume are comparable.

So the cross-file machinery is sound, but for us it is either inactive (single file) or confined to
one search's own files; it is never the thing the boss was concerned about (joining unrelated
searches).

---

## 5. Technical caveats (so they're on the record)

- **MS1 precursor-intensity quant is inference from the precursor channel.** Co-eluting species
  within the m/z + RT + isotope tolerances can contribute to a peptide's XIC (precursor
  interference / co-isolation is not deconvolved the way reporter-ion MS2 quant would). The
  isotope-pattern requirement (≥2 peaks, 5 ppm) and charge-state checks mitigate but don't eliminate
  this; it is a property of all MS1-XIC LFQ (MaxLFQ, IonQuant, directLFQ), not specific to FlashLFQ.
- **Needs resolved-isotope, high-resolution MS1** — true for our Orbitrap data (QE-HF-X, Lumos).
- **Depends on accurate monoisotopic mass and RT from the ID** (both supplied: mass from sequence +
  mod masses; RT from the spectr scan). A mass/RT convention mismatch would mis-target the XIC.
- **Default metric is apex height, not area** — switchable, but worth knowing when comparing to tools
  that report area.
- **Single sample (N=1) intensities are on an arbitrary, uncalibrated scale** — valid for relative
  comparison among peptides/proteins within that run; they are not absolute amounts, and are only
  cross-run-comparable when files are co-quantified in one run (which, by design, we do only within a
  search).
- **DDA assumption** — this is DDA precursor-based quant; DIA is a different path (not relevant here).

---

## 6. Comparison — is it the right choice?

Requirement: **open source · headless/Linux (containerizable) · quantifies externally-supplied PSMs
(no re-search) · peptide- and protein-level output.** For the **per-search / single-sample** job, the
discriminator is **MS1 feature-detection + integration quality and operability**, not the cross-sample
algorithms (MaxLFQ ratio optimization, MBR FDR), which don't engage for one sample.

| Tool | License | PSM-driven (no re-search) | Headless/Linux | Pep+Prot | Technical note |
|---|---|---|---|---|---|
| **FlashLFQ** | **MIT (OSI)** | **Yes** | **Yes** (.NET 8, CLI, Docker) | **Yes** | Indexed-XIC apex quant; ≥2-isotope, multi-charge; r≈0.99 vs MaxQuant; mzLib reader (mzML). **Best fit.** |
| MaxQuant / MaxLFQ | Freeware, not OSI | **No** — runs Andromeda search | Windows/.NET-centric | Yes | MaxLFQ (Cox 2014) is a *cross-sample* protein-ratio optimization (delayed normalization, pairwise ratios), ~quadratic in #samples; coupled to MaxQuant's pipeline + `.raw`. Reference-grade but not a "quantify these PSMs" component. |
| IonQuant (FragPipe) | Free academic, not OSI | Partly (pepXML/FragPipe) | Yes | Yes | Also indexed-XIC; key differentiator is **target-decoy FDR-controlled MBR** (irrelevant to single-sample). Ecosystem-locked; license not OSI. |
| directLFQ | Open source | Yes (MaxQuant/DIA-NN/FragPipe IDs) | Yes (Python) | Yes | Ratio-based, **linear** scaling for very large cohorts; strength is big-N, not single-search quant. |
| DIA-NN | Freeware, not OSI | DIA-oriented | Yes | Yes | Built for **DIA**; wrong acquisition model for DDA-PSM quant. |
| Skyline | Apache-2.0 | Via BiblioSpec libraries | Windows/GUI-centric | Yes | Strong targeted/DIA/MS1-filtering; vendor readers + GUI; not a headless per-search batch step. |
| OpenMS (FeatureFinderIdentification) | BSD | **Yes** (idXML/mzML, ID-guided) | Yes | Yes | The closest open-source analog to FlashLFQ's ID-driven MS1 approach, but a **toolkit node** needing pipeline assembly rather than a single binary. |
| Proteome Discoverer (Minora) | Commercial (Thermo) | — | Windows | Yes | Not viable for an open, containerized service. |

**Conclusion.** FlashLFQ is the only option that is *simultaneously* OSI-open-source, **designed to
quantify externally-provided PSMs** (consumes Limelight's IDs with no re-search), headless/
containerizable, and peptide+protein — and it's peer-reviewed with reference-grade agreement
(r≈0.99 vs MaxQuant). OpenMS's `FeatureFinderIdentification` is the nearest technical equivalent but
is a toolkit to assemble; everything else either re-searches (MaxQuant), is not truly open source
(IonQuant, DIA-NN), targets DIA, or is GUI/desktop-shaped.

---

## 7. Bottom line

For per-search quant (commonly a single scan file), FlashLFQ takes the search's PSMs and reports each
peptidoform's MS1 precursor-envelope apex intensity (multi-charge, ≥2-isotope, ~10 ppm) and a top-3
protein rollup — the standard, validated MS1-LFQ method, fast, agreeing with the field reference. It
is open source, headless, and purpose-built for "quantify these identifications," making it the
strongest fit among the options. The multi-run features that prompted concern are inactive for single
files and otherwise confined to a single search's own data.
