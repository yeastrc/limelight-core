# FlashLFQ open-modification quant: what can and cannot ever be correct

**Status:** method / correctness-boundary analysis for the DEFERRED open-modification quant feature.
Written 2026-07-29. Argues where MS1 label-free quant of open-modification (mass-tolerant search) data
can be made correct and where it is *irreducibly* unrecoverable — the distinction being physics, not
engineering. Companion to `flashlfq_output_to_limelight_mapping.md` (the peaks-as-source-of-truth
ingest + attribution design), `flashlfq_quant_run_on_final_filtered_psms.md` (within-feature
non-decomposability under filtering), and `flashlfq_usage_critical_review_2026-07-29.md` (the
current-usage audit). Open-mod support is **not implemented**; this doc scopes what a correct
implementation could and could not claim.

**Provenance:** algorithmic/physical reasoning about how FlashLFQ seeds and integrates MS1 precursor
features, consistent with the shared-peak / zeroed-peptidoform measurements recorded in
`flashlfq_output_to_limelight_mapping.md`. The fraction figures quoted below are from that doc's
open-mod evidence run; they were not re-measured for this analysis.

**Terminology:** *feature / peak* = one FlashLFQ `QuantifiedPeaks` row (one integrated/apex MS1
chromatographic feature). *form / display form* = a peptidoform at the display grain
(`reportedPeptideId` + open-mod `{kind, roundedMass}`). Avoid "tag" (Limelight uses *search tags*).

**See also — the 2026-07-29 FlashLFQ quant review set (peer docs):**
- `flashlfq_quant_mapping_critical_review_2026-07-29.md` — composed-design holes (H1–H9): matrix→scalar,
  cross-file sum, apex-vs-area, identity/rollup.
- `flashlfq_usage_critical_review_2026-07-29.md` — end-to-end, code-observed usage audit.
- `flashlfq_open_mod_quant_deferred_mass_doublecount.md` — the deferred open-mod defects + in-code `throw`
  tripwires (the concrete bugs in the held prototype that this doc's "what can be correct" presupposes fixed).
- `flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md` — the governing rule for
  when quant may/may not be summed across scan files, sub-groups, searches, or conditions (PSM count may
  sum; quant may not).
- `flashlfq_quant_status_and_decisions.md` — **START HERE**: current status + settled/open decisions (the
  entry point for the quant doc set).

---

## 1. Framing: the raw measurement is not the problem — attribution and grain are

FlashLFQ quantifies from **neutral monoisotopic mass + charge + retention time** only. It has **no
concept of "open" versus "variable" modification** — a delta mass is a delta mass. So the *act of
measuring* an XIC for a given mass form is exactly as valid for an open mod as for any ordinary
peptidoform: predict the isotope envelope from mass+charge, find it within ppm near the ID's RT,
trace/measure the peak.

It follows that nothing about open mods corrupts the measurement itself. Everything that is
"problematic" is **downstream accounting**: *which* features roll up to *which* displayed row, and how
to handle signal that is physically **shared** between forms. That reframing is what makes "can open-mod
quant ever be correct?" answerable — the answer splits cleanly by the *question being asked of the
number*, not by the tool.

---

## 2. What CAN be made correct (engineering — largely already designed)

These are well-defined quantities that FlashLFQ measures correctly and that the peaks-as-source-of-truth
design (`flashlfq_output_to_limelight_mapping.md`) already produces:

- **Peptide-level total** — the sum of a reported peptide's features across its mass forms and charge
  states, **deduped at the feature level** so a feature shared by two of the peptide's own forms is
  counted once. Well-defined; correctly measured.
- **A chemically-distinct, well-resolved open modification** — e.g. unmodified (+0) versus a real PTM
  (+80), where the forms differ by **≫ ppm** and elute as **separate peaks**. This degenerates to
  ordinary variable-mod quant. The send-side exact-mass keying plus within-ppm binning already targets
  each resolved form on its own feature, so each gets its own correct number.
- **Mass jitter** — the same PTM measured with mDa spread across PSMs (+79.9661 vs +79.9663 …). Already
  solved by binning within the **same ppm window FlashLFQ uses to extract the peak** (see the binning
  section of `flashlfq_output_to_limelight_mapping.md`): anything merged would have landed on that one
  peak anyway, so no quant is lost. Not an open problem.

The architecture that makes these correct is: **store at the feature (peak) grain**, attribute a shared
feature to **every** form it maps to, **dedupe on rollup**, and roll up *through the same grouping
machinery that builds the peptide list* so quant tracks the runtime collation grain. That design does
not fabricate anything it cannot resolve — which is exactly why it is the right foundation.

---

## 3. What can NEVER be made correct (irreducible — MS1 precursor physics)

These are not FlashLFQ limitations and not Limelight limitations. They are properties of MS1
precursor-based quantification; no algorithm recovers information the data does not contain.

- **Splitting a shared / co-eluting feature into per-form amounts.** When several near-isobaric forms
  fall within the m/z + isotope + ppm window **and** co-elute, they contribute to **one** chromatographic
  signal. "How much of that area belongs to form A versus form B" is not encoded anywhere in the data.
  The only honest handling is to attribute the shared area to **all** claimants, **flag it ambiguous**,
  and never present a per-form split as if it were resolved.
- **Localization-specific quant** — which residue carries the modification, for same-mass positional
  isomers. MS1 precursor signal carries **no localization information**; the precursor m/z is identical
  regardless of where the mass sits. Only MS2 fragmentation localizes. So "abundance of the phospho-at-S3
  form vs the phospho-at-S5 form" is unobtainable from this method, full stop.
- **Within-feature subsetting (charge, RT slice, individual PSM).** An integrated/apex precursor feature
  is **not decomposable** into per-charge or per-PSM contributions — see
  `flashlfq_quant_run_on_final_filtered_psms.md` (charge is the extreme case, ~54% over-count vs a
  charge-specific re-run). This is the same non-decomposability, and it applies to open and non-open data
  alike.

The general rule: **a number is recoverable only down to the grain at which the data resolves distinct
signals — a resolved mass at a resolved retention time.** Below that grain, every "per-form" number is
either an attribution convention or a fabrication.

---

## 4. Why open search makes the irreducible bucket *dominate*

For a normal static+variable-mod search, the irreducibly-ambiguous fraction is small (expected ~1–2%):
discrete, well-separated mod masses give a near-1:1 form↔feature mapping.

Open / mass-tolerant search is different in **degree so large it is different in kind**. On the open-mod
evidence run recorded in `flashlfq_output_to_limelight_mapping.md`: **~40% of peak rows were shared**
across multiple forms, and FlashLFQ's own `QuantifiedPeptides` **zeroed ~90% of peptidoforms** (holding
only ~7% of the measured signal) precisely because it refuses to guess the split. A peptide's open-mod
"cloud" — dozens of delta masses spanning a couple of Da (the `SIQFVDWCPTGFK` worked example: ~70 forms
over ~1583–1585, across charges 2–4) — is usually **not** a set of distinct chemical species. It is
measurement/annotation spread plus artifacts plus genuinely-distinct PTMs, mixed together.

Consequence: "correct open-mod quant" means **a large fraction of the answer is honestly labeled
ambiguous**, because a per-delta-mass number inside that cloud is not physically meaningful. Summing the
cloud yields a valid *peptide total*; asking for "the +13 form's abundance" inside it is asking for a
number the experiment did not measure.

**Cross-base-sequence upper-bound caveat.** When a feature is shared across *different* base sequences
(I/L variants, missed cleavages, S→T near-isobars — `Base Sequences Mapped > 1`), a peptide's total
includes signal that also belongs to another peptide. Feature-level dedup prevents double-counting a
*single* total, but the per-peptide total is then an **upper bound**, not a clean amount. Again: flag,
do not pretend.

---

## 5. Verdict and the rules that keep an implementation honest

**Open-mod quant is fixable for:** peptide totals, and resolved-distinct PTMs — computed at feature grain
with feature-level dedup. **It is fundamentally unfixable for:** per-form splits of shared/co-eluting
features, localization, and within-feature subsetting.

A correct, defensible implementation therefore must:

1. **Compute at the resolvable feature grain** and roll up with **feature-level dedup** through the
   collation grouping (never store only per-form numbers, which cannot represent shared features).
2. **Expose a per-open-mod-form number only when that form is BOTH mass-resolved (Δ ≫ ppm from its
   siblings) AND RT-resolved (its own peak).** Otherwise show the peptide / rounded-bucket **total**.
3. **Flag every shared / ambiguous feature** in the UI (shared across forms, and separately shared across
   base sequences → upper bound), and state plainly that **MS1 quant is not localization-aware**.
4. **Never present an authoritative-looking per-delta-mass column** for the fuzzy cloud. That single
   affordance is the one thing that can never be right for the majority of open-search data, and it is
   the trap most likely to mislead.

**Scope boundary for the product decision:** if the actual requirement is "correct abundance for each
individual open-modification form," MS1 DDA precursor quant is the **wrong instrument** — that needs
MS2-level quant (reporter-ion or DIA fragment-level). No amount of FlashLFQ configuration or Limelight
attribution logic changes that; it is a limit of the acquisition, not of the software. The achievable and
honest deliverable here is: **correct peptide/protein totals and correct quant for well-resolved forms,
with everything else surfaced as a flagged total rather than a fabricated per-form split.**
