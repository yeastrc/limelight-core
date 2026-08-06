# Decision brief — how Limelight turns FlashLFQ output into one displayed abundance

**Date: 2026-08-05 · For discussion.** One page. Two choices to make on purpose; there is **no
magically-correct answer** (MS1 label-free quant is an inferred proxy, so every tool picks tradeoffs). The
goal of this meeting is a *defensible, documented* choice — driven by what the Quant column is **for**.

## The two decisions (largely independent)

### Axis 1 — Feature aggregation: combining a peptidoform's multiple `QuantifiedPeaks` rows

| Option | What it does | Pro | Con |
|---|---|---|---|
| **SUM** *(Limelight today)* | Adds every peak mapped to the form | Captures multi-feature / multi-charge signal | **Over-counts** (see data); per-peptide-variable; not additive on apex heights |
| **MAX** *(FlashLFQ's own rule)* | Keeps the single most-intense peak | Robust; **matches FlashLFQ → external validation oracle**; dodges spurious tail | **Under-counts** genuinely multi-feature peptides |
| **Deliberate** | Sum only *vetted real* features (e.g. RT-proximity / min-fraction filter), or dominant-feature | Best of both | Needs a rule defining "real"; more code |

### Axis 2 — Per-feature quantity: apex height vs integrated area

| Option | What it does | Pro | Con |
|---|---|---|---|
| **Apex height** *(`--int` off, today)* | Height of the most-intense scan | FlashLFQ default; robust per feature | **Not additive** (a sum of heights isn't a real total); never matches Limelight's area-based chromatogram |
| **Integrated area** *(`--int true`)* | Area under the elution | Additive; chromatogram-comparable | Noisier per feature (FlashLFQ docs: "not recommended") |

> Today's display = **SUM of apex heights** — the least-additive corner of the space.

## The evidence (real run `36b59`, `--int` off, read-only; source pin-verified vs mzLib `1.0.566`)

- **FlashLFQ = MAX, confirmed:** its `QuantifiedPeptides` intensity = the single most-intense peak for
  **1,425/1,468** unambiguous forms; **0** cases of summing. (Shared forms are **zeroed** — a *separate* axis, below.)
- **SUM vs MAX:** identical for **77%** of peptidoforms; SUM **over-counts the other 23%** — median **+12%**,
  up to **4.5×**, **~7%** at the whole-run total. The over-count is **per-peptide-variable** (distorts
  peptide-to-peptide and protein rollups unevenly), and is **mostly spurious**: of the diverging forms, 61%
  are same-charge/different-RT and only ~5% are legitimate charge-state aggregation; the shape is one
  dominant peak (~90% of the sum) + a tail of small secondary peaks FlashLFQ discards.

## The unlock — decide by use case (answer this first)

| What is the Quant column FOR? | Implies |
|---|---|
| **Compare the same peptide across samples/conditions** (differential) | Robustness wins; peak width cancels in ratios → **MAX/dominant + apex**; match FlashLFQ |
| **"How much of this peptide" / compare different peptides in one sample** | Additivity matters → **integrated area (`--int`) + sum of real features** |
| **Least surprise / validate-ability** | **Match FlashLFQ exactly** (MAX + apex; for non-open-mod, could ingest `QuantifiedPeptides` directly) |

## Recommendation to argue from (not a settled answer)

**Default to matching FlashLFQ: MAX + apex** — unless someone has a concrete reason to diverge. It's the field
convention, has a built-in validation oracle, and avoids the 23% spurious over-count.
**Counterweight:** it *discards* real secondary-charge / second-elution signal, so if the column is meant as a
**total abundance**, MAX is the wrong default and the answer shifts toward area + a vetted feature-sum.

## Scope / don't conflate

- **Open modifications AND PSM-level variable mods are DEFERRED.** Decide the clean case first — a search
  with **no open mods and no PSM-level variable mods**, where `reportedPeptideId ↔ mass` is ~1:1. Both
  deferred kinds break that 1:1 (open mods add a mass-cloud dimension; PSM-level variable mods put multiple
  mass forms / positional isomers under one reported peptide), so they're out of scope for this decision.
- **Shared-peak handling is a THIRD, separate axis:** Limelight attributes a shared peak to **all** forms;
  FlashLFQ **zeroes** shared forms. Independent of SUM-vs-MAX — keep it out of this decision unless raised.
- The two axes above are **independent** and can be decided separately; both carry into **Track B** (DB ingest).

## Decisions needed from the room
1. **What is the Quant column primarily for?** (pick one of the three use cases)
2. **Do we value parity with FlashLFQ's published numbers** (an external oracle / least surprise)?
3. Given (1)–(2): **which way on each axis**, and **fixed vs configurable**?

---
*Provenance:* numbers OBSERVED from run `36b59` output files (no FlashLFQ invocation); FlashLFQ MAX/apex behavior
pin-verified in mzLib `1.0.566`. Full trace + data: `flashlfq_quant_peak_summing_vs_flashlfq_peptide_output_2026-08-05.md`.
Status/decisions index: `flashlfq_quant_status_and_decisions.md` (Open decisions #2, #2b). Apex-vs-area
background: `flashlfq_quant_mapping_critical_review_2026-07-29.md` ("Open decision — apex vs area").
