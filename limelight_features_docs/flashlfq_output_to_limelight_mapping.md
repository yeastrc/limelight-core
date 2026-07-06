# Mapping FlashLFQ output back to Limelight search results

Status: design analysis for discussion. Captured 2026-07-02. Evidence run: a single-scan-file,
open-modification search (FlashLFQ 1.0.0.0), request `aebff14a…`. Companion docs:
`flashlfq_summary_and_comparison.md` (how FlashLFQ works) and `quant_maxquant_design_discussion.md`
(overall quant design).

## Framing (read first)

**Quant is peptide-level, and it is exactly what you picture: extract the peptide's XIC and integrate
the area under the chromatographic peak. That does not change.** *(Same XIC-extract-and-integrate-area
model as Skyline; think of each `QuantifiedPeaks` row as one Skyline-style integrated chromatographic
peak, and the open-mod case as the familiar co-eluting/isobaric peptides sharing one peak.)* The only
decision here is *which FlashLFQ output file we read to get those integrated areas* — a lossiness
problem, not a change of level or method:

- **Each row of FlashLFQ's `QuantifiedPeaks.tsv` is one integrated XIC — the area under one
  chromatographic peak.** That *is* the quant measurement. It is **not a "lower level"**; it is the
  areas-under-the-curve themselves, one per detected chromatographic peak, each tagged with the
  peptide form(s) it belongs to.
- **The open-modification catch:** several open-mod forms of a peptide fall at the same — or within
  instrument tolerance — precursor m/z, so they **share one XIC**. There is a single area under the
  curve, and it belongs to all of them.
- FlashLFQ's **peptide file (`QuantifiedPeptides.tsv`) discards every shared curve** — it sets those
  forms to zero. For open-mod data that is ~90% of peptides and **~93% of the integrated signal**
  (measured below). The peaks file keeps that area and lists which forms share it.

So we read the integrated XIC areas from the peaks file (complete) and assign each area to its peptide
form(s) inside Limelight — one curve integrated once, shown under each form it belongs to — the **same
many-to-one accounting Limelight already does when it counts one PSM under multiple peptide forms.**
This is precisely the fix for the open-modification problem, applied to integrated area instead of
counts.

## The question

FlashLFQ gives us peptide- and protein-level abundance per sample. To show it in Limelight we must map
each output row back to a Limelight entity (reported peptide, protein, scan file), **especially the
modifications**. This doc works through what maps cleanly, what doesn't, and — most importantly — a
finding about FlashLFQ's output files that changes which file we should ingest.

## Key fact: FlashLFQ echoes only the identity strings we send; it never interprets modifications

FlashLFQ has no database keys of its own and **no concept of modifications**. Per PSM we send it:
`File Name, Base Sequence, Full Sequence, Peptide Monoisotopic Mass, Scan RT, Precursor Charge,
Protein Accession`. It:

- quantifies using the **precursor m/z**, which comes only from the **`Peptide Monoisotopic Mass`** we
  supply (a single scalar = water + Σ residue masses + Σ **all** modification masses) and the charge.
  **Modification positions never affect the mass or the quant.**
- treats **`Full Sequence`** as an **opaque peptidoform grouping key** — it compares the whole string for
  equality to bucket PSMs into peptidoforms; it never parses `[+79.96]` into "phospho at position 3".

We already exploited this: we send `scanfile_id_<id>` (→ `scan_file_tbl.id`) and
`psvid_<id>_<name>` (→ `protein_sequence_version.id`), so those come back as exact keys.

## The three axes — two are already id-keyed, the peptide axis is the hard one

| Axis | FlashLFQ column | Maps via |
|---|---|---|
| Sample | `Intensity_scanfile_id_15` / `File Name` | `scanfile_id_<id>` → `scan_file_tbl.id` — **exact** |
| Protein | `Protein Group(s)` = `psvid_8886_sp\|…` (`;`-joined) | `psvid_<id>` → `protein_sequence_version.id` — **exact** |
| Peptide (+mods) | `Base Sequence`, `Full Sequence` (our encoded string) | **not id-keyed today** — only base sequence + our combined-mass mod string |

## Why the peptide/modification axis is hard

Reversing our `Full Sequence` string (`AAGAGKVT[+134.98497]K`) into a Limelight reported peptide is
fragile because the `[+mass]` tokens are the **combined, summed** mass per position (dynamic + static +
terminal + open + reported-peptide-level variable, folded together); Limelight stores those as separate
records. Add rounding tolerance, position-convention differences, and ambiguity, and string-matching is
a poor foundation.

The clean alternative is to **embed the Limelight key in the identity we send** (as we did for sample
and protein). BUT this is complicated by **open modifications**:

- Limelight models an **open modification** as a mass + zero-to-many candidate positions, for
  open/mass-tolerant search (MSFragger, Magnum, MetaMorpheus). **The open-mod mass/position is stored on
  the PSM, not the reported peptide.**
- So **one `reportedPeptideId` can span multiple distinct peptidoform mass forms.** Keying quant on
  `reportedPeptideId` alone under-splits open-mod data; the distinguishing mass lives on the PSM.

## The finding that decides the design: what FlashLFQ's output files actually contain

Measured on the open-mod evidence run:

### `QuantifiedPeaks.tsv` — one row per MS1 feature, with the ambiguity already resolved

Columns include: `File Name, Base Sequence, Full Sequence, Protein Group, Peptide Monoisotopic Mass,
MS2 Retention Time, Precursor Charge, Theoretical MZ, Peak intensity, Peak RT Start/Apex/End, Peak MZ,
Peak Charge, Num Charge States Observed, Peak Detection Type, PIP Q-Value, PIP PEP, PSMs Mapped, Base
Sequences Mapped, Full Sequences Mapped, Peak Apex Mass Error (ppm), …`.

- **One row per detected peak** (feature), per scan file. Intensity appears **once** (verified: no peak
  appears in >1 row).
- When a peak is **shared** by multiple identifications, FlashLFQ **lists** them: the `Base Sequence` /
  `Full Sequence` cells become `|`-joined lists, and `Full/Base/PSMs Mapped` give the counts.
  `Full Sequences Mapped` reached **367**; **4,053 of 10,050** peak rows had it > 1.
- So the **feature-level dedupe is already done for us**, and each peak tells us exactly which
  peptidoforms claim it.

### `QuantifiedPeptides.tsv` — zeroes every ambiguous peptidoform

Columns: `Sequence, Base Sequence, Protein Groups, Gene Names, Organism, Intensity_<sample>,
Detection Type_<sample>`. When >1 Full Sequence shares a peak, FlashLFQ sets those peptidoforms'
intensity to **0** and labels them `MSMSAmbiguousPeakfinding`.

On the open-mod run:
- **39,188 peptidoform rows; 35,378 are zero** (only 3,810 non-zero).
- Detection Type: `MSMS 3,810 · MSMSIdentifiedButNotQuantified 1,865 · MSMSAmbiguousPeakfinding 33,513`.
- Total intensity in `QuantifiedPeptides` = **1.9e12**, versus **2.6e13** in `QuantifiedPeaks` — i.e.
  the peptide file holds only **~7%** of the measured signal. **Ingesting it would silently drop ~93%
  of open-mod signal.**

Example (one shared peak): base `THFPLATYAPVISAEK`, six forms `T[+12.03624]…`, `T[+12.03606]…`, …
(same nominal +12 open mod, mDa-different exact masses, all within ppm → one peak). Peak intensity
**1.78e11**; all six peptidoforms show **0** in `QuantifiedPeptides`.

### `QuantifiedProteins.tsv` — built on the zeroed peptides, so also undercounts

Columns: `Protein Groups, Gene Name, Organism, Intensity_<sample>` (intensity = FlashLFQ's top-3
peptide rollup). Because it's derived from the zeroed peptide intensities, it undercounts open-mod
proteins: total **3.5e11** (from the ~7% that survives), 26 of 343 proteins outright 0.

## Design conclusion: ingest `QuantifiedPeaks`, attribute ourselves

Ingest **`QuantifiedPeaks.tsv`** as the source of truth; do the peptide/protein attribution in
Limelight. This is exactly how Limelight already handles PSM counts (one PSM counted under all its
peptides):

1. **Each peak = one feature = one intensity**, stored once (the dedupe). Store at the feature grain:
   sample, intensity, apex RT, m/z, charge, detection type, mass error, mapped full/base sequences,
   mapped PSM count.
2. **Attribute** the peak's intensity to every `Full Sequence` it lists → map each back to the Limelight
   peptidoform / reported peptide via the identity strings we control. A peak shared by N forms shows
   under all N (like a shared PSM).
3. **Aggregate to the display peptide by iterating peaks** (each once) → the feature is inherently
   counted once even though it appears under many display rows; roll up to protein by deduping on peak.

This also resolves the ppm concern: mDa-different open-mod masses within tolerance are collapsed to one
peak by FlashLFQ, and we read that collapse directly from the peak's mapped-forms list rather than
reasoning about tolerances.

### The display-grain vs quant-grain relationship (handled, not a blocker)

Limelight's peptide **display** rounds variable mods to 2 decimals and open mods to whole numbers, and
splits an open mod with >1 position into one peptide string per position. MS1 quant is **position-blind**
(mass only). Consequence: a shared feature's intensity is shown under each applicable display string —
same as PSM count — and any rollup dedupes by feature so the same signal is never summed twice.

## Why a row's Quant doesn't change when filtering shrinks its PSM count

**What the user sees:** apply a filter that removes some PSMs from a peptide row (e.g. exclude a charge
state, a scan, a retention-time range) and the row's **PSM count drops but its Quant stays the same**.
This is correct, not a bug — and it comes straight from what MS1 label-free quant *is*.

**Why.** A PSM count is a count of *identifications*, so it responds to any filter that removes
identifications. **Quant is not a count of PSMs — it is the integrated area of a precursor
chromatographic feature (the XIC peak).** FlashLFQ computed that area **once**, over the identifications
we submitted, and an integrated peak area is **not decomposable into per-PSM contributions**: there is no
"the charge-3 part of this peak" to subtract. So narrowing the *displayed* PSM subset cannot move the
number — the feature, and its area, are unchanged. Put plainly: **the filtered PSM subset was never sent
to FlashLFQ; the quant was measured on the originally-submitted set and reflects the whole feature.**

**When Quant *does* change:** only when a filter changes **which features roll up to the row**, not when
it merely thins the PSMs within the row. Concretely:

- **Moves the number** — filters that remove the **reported peptide(s) / peptidoforms** (and therefore
  their peaks) that feed the row, or that remove a **sample/scan-file** (each peak belongs to one sample).
  When the contributing peaks leave, the sum drops (and a row with no remaining peaks disappears / shows
  no quant).
- **Does *not* move the number** — filters that subset **PSMs within** a reported peptide it keeps
  (charge, scan number, precursor RT/m-z, individual PSM). These change the identification count, not the
  precursor feature, so the area is unchanged.

**How to say it to a user (one line):** *"Quant is the area of the precursor's chromatographic peak,
measured once over all the matches for this peptide. Filtering the peptide/PSM list changes which matches
you're looking at, but it doesn't re-integrate the peak — so the intensity only changes when a filter
removes whole peptide forms (or a sample), not when it just narrows the PSMs shown."*

*(Filtering to a subset does **not** require re-running FlashLFQ — the peaks are fixed and we re-attribute
them client-side. Re-running on the subset is possible but pointless here: it still can't split one
existing feature by PSM. See the filter analysis in `quant_maxquant_design_discussion.md` — this is the
same "MS1 quant is precursor-feature-level, not PSM-level" fact, viewed from the UI.)*

## What statistics do we lose by ingesting peaks instead of the summary files?

Essentially none that are both meaningful for open-mod data and not reproducible from peaks:

- **Peptide `Intensity`** — we reconstruct it from peaks (and better: we fill the ambiguous forms it
  zeroes).
- **Peptide `Detection Type`** (MSMS / AmbiguousPeakfinding / IdentifiedButNotQuantified) — derivable
  from the peak's `Full Sequences Mapped` + peak presence.
- **Protein `Intensity`** (top-3 rollup) — the only genuinely computed statistic; but it's built on the
  zeroed peptides, so it undercounts open-mod data and is not the number we want. We recompute our own
  rollup regardless.
- **Fold-change / PEP / q-values** — only produced with `--bay` (Bayesian, cross-condition), which we
  don't run. Nothing dropped that was produced.
- **Gained**, not lost: peaks carry `PIP Q-Value`, `PIP PEP`, `Peak Apex Mass Error (ppm)`, RT bounds,
  charge, `Num Charge States Observed`, per-feature detection type, and the mapped-forms lists.

**The real cost is ownership**, not a lost statistic: we take on the peptide-sum (sum a peptidoform's
peaks across charge states) and protein-rollup (replicate FlashLFQ's top-3, or define our own) logic —
which for open-mod data we *want* to own anyway. Keep the summary files as a validation cross-check
(they should match our numbers wherever FlashLFQ marks a peptide unambiguous).

## Searches with NO open modifications (a large fraction of Limelight use)

For static + reported-peptide-level variable mods only, the picture is much simpler:

- Fixed, discrete mod masses → no clouds of near-identical exact masses; **`reportedPeptideId ↔ exact
  peptidoform ↔ exact mass` is 1:1**, so `reportedPeptideId` is a valid unambiguous quant key and
  `QuantifiedPeptides` would be **mostly populated** (not 93% zeroed).
- A **residual** ambiguity remains: same-mass positional isomers of a variable mod (e.g. ambiguous
  phospho site) are distinct reported peptides at one mass → one shared peak → still zeroed in
  `QuantifiedPeptides`. Small and bounded, not a flood.

Two options:

- **Route 1 (recommended): uniform peaks-as-truth.** One ingest path. For no-open-mod searches it
  self-simplifies — each peak's mapped-forms list is almost always a single reported peptide, so the
  feature table effectively becomes a per-reported-peptide table with no extra work, and the residual
  positional-isomer case is still handled correctly. Build the rollup once; make it match FlashLFQ on
  the unambiguous majority.
- **Route 2: fast path for no-open-mod** — ingest `QuantifiedPeptides`/`QuantifiedProteins` directly
  (free FlashLFQ rollup, less code). Costs: a second code path + open-mod detection, quant that means
  subtly different things by search type, and the residual positional-isomer signal still dropped.

Recommendation: **Route 1** — one correct path that degenerates to the simple behavior for the easy
case; avoids "quant is computed two different ways"; the summary files stay a cross-check.

## Schema implication

Store a **feature/peak-level** quant record (intensity + its mapped-forms list) as the source of truth,
with per-reported-peptide, per-display-peptide, and per-protein-group views **derived** from it — rather
than storing only per-reported-peptide values (which cannot represent open-mod shared features).

## How Limelight's existing PSM-based chromatogram peak area compares to FlashLFQ

Limelight already computes an MS1 peak area in the PSM-list **chromatogram**
(`psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component.tsx`; **this peak-area method was
boss-specified**). It's worth knowing where it agrees with FlashLFQ and where it won't — the two will
generally **not** produce the same number, especially for open mods.

Both compute a **theoretical** target m/z — peptide neutral monoisotopic mass (Σ residues + Σ mods +
water), then `(mass + z·proton)/z`; neither reads the observed precursor m/z — and both extract with a
**ppm** tolerance and sum an **isotope envelope**. Beyond that they diverge:

| Aspect | Limelight chromatogram (boss-specified) | FlashLFQ |
|---|---|---|
| Target m/z | theoretical, from sequence+mods+charge | theoretical, per peptidoform (our `Full Sequence`) |
| ppm tolerance | symmetric ± ppm, default 15 (max 25), user-selectable | `--ppm` (default 10) + `--iso` isotope ppm |
| Isotopes | monoisotopic + M+1/+2/+3 windows, summed | isotopic-envelope peak-finding |
| Charge states | **one selected charge**; not summed across charges | per-feature per charge; peptide level sums charges |
| **Reported value** | **trapezoidal AREA** (intensity·seconds) | **default = APEX intensity (a height)**; integrated area only with `--int true` |
| **RT integration** | **fixed window = first→last PSM RT ± 30 s, trapezoid over every MS1 scan, zero-filled; NO apex/boundary/peak-shape detection** | **detects the chromatographic peak (apex + boundaries)** and integrates/measures that; MBR across runs |
| **Open mods** | area is per (reportedPeptideId × **display-rounded** open-mod bucket, 2 dp × charge); the bucket's open-mod masses are **averaged** into one narrow window | each peptidoform's **exact** summed mass is its own feature; same-mass-within-ppm forms share one peak, others stay separate |
| Grain | one area per (reportedPeptideId × open-mod bucket × charge × scan file), **user-selected one at a time** | all features at once; per (peptidoform × sample), peptide = sum over charges |

**The three differences that matter:**

1. **Area vs apex height.** The chromatogram integrates a trapezoidal **area**; FlashLFQ by default
   reports the **apex intensity** (peak height) and only integrates an area when passed `--int true`.
   So out of the box the two aren't even the same *kind* of quantity — magnitudes differ. To compare
   apples-to-apples, run FlashLFQ with `--int true`.
2. **Fixed RT window vs peak detection.** The chromatogram integrates a *fixed* window (first→last PSM
   RT, ± 30 s) with a plain trapezoid over every MS1 scan (zero-filling scans with no in-window peak) and
   does **no** apex/boundary detection. FlashLFQ **finds** the peak and measures its actual bounds. So on
   the same data the chromatogram can include baseline / adjacent-peak area the PSMs happen to bracket,
   or miss signal eluting just outside ±30 s. Expect the numbers **correlated but not equal**.
3. **Open-mod bucketing differs.** The chromatogram groups open mods by the **display-rounded** mass
   (2 dp) and *averages* the bucket into one window — it quantifies at the **display grain**. FlashLFQ
   keys on the **exact** per-peptidoform mass; forms within ppm merge, forms farther apart stay separate.
   A rounded 2-dp bucket that spans more than the ppm tolerance is one number in the chromatogram but
   several features in FlashLFQ (which our rollup then re-groups by reportedPeptideId). Same
   display-grain-vs-quant-grain tension, surfacing as a numeric difference between the tools.

**Implication:** the chromatogram area is a useful **sanity cross-check**, not an oracle — where they
disagree it's usually (1) area-vs-apex, (2) the fixed-window integration, or (3) open-mod bucketing, not
a bug in either. The cleanest close-match test is a **non-open-mod, single-charge** peptide with matched
ppm and `--int true`, where both reduce to "integrate one peptidoform's XIC."

### Worked example: `SIQFVDWCPTGFK-(13)` — chromatogram 2.06e9 vs Quant 4.22e11

A concrete case that shows both effects at once (and why the gap is mostly **grain**, not area-vs-apex).

Filter the peptide table to the display row **`SIQFVDWCPTGFK-(13)`** (open mod ~13 Da, unlocalized). At the
**display grain** this row is a single PSM, and the PSM-list **chromatogram** integrates that one form:
- Chromatogram **peak area = 2.062e9** (fixed window 117.1 → 118.2 min = the PSM's RT ± 30 s).

The prototype **Quant column = 4.22e11**, with **# Peaks = 55**. That "55" is the tell. This row's
reported peptide (`reportedPeptideId 246169`) carries **71 FlashLFQ features — 55 with measurable
intensity** — and their `Peak intensity` values sum to **4.217e11** (= the Quant). Those 55 features are:

- **~70 distinct open-modification delta-mass forms** of the same peptide (monoisotopic mass spanning
  ~1583.72 → 1585.74 — an open-mod *cloud*, exactly what a mass-tolerant search produces), across
- **charge states 2, 3 and 4**, and
- several features **shared** with near-isobaric peptides (`TIQFVDWCPTGFK` [S→T], `RSIQFVDWCPTGFK`
  [missed cleavage], `TKRSIQFVDWCPTGFK`, …).

So the Quant is **the entire reported peptide, summed over all its open-mod mass forms and charges** (plus
shared signal) — **not** the `-(13)` form the chromatogram measured. Because only `reportedPeptideId` is
embedded (not the open-mod mass), every open-mod display row of this reported peptide — `-(0)`, `-(13)`,
`-(16)`, … — shows the **same** 4.22e11 (the "each row shows the reportedPeptideId's full quant"
limitation noted above, made concrete).

**Why the two numbers differ, ranked:**
1. **Grain (dominant):** Quant sums **55 features** (all open-mod masses × charges of the reported
   peptide, incl. shared); the chromatogram measured **one** display form. This alone is most of the gap.
2. **Area vs apex:** chromatogram = integrated **area**; FlashLFQ (`--int` off) = summed **apex heights**.
3. **Shared-peak attribution:** some of the 55 are shared with other peptides and also count toward them.

**The fix** (open item #3 below): embed an open-mod **feature key** (exact mass/position) alongside
`reportedPeptideId`, so each peak resolves to the specific display form. Then `SIQFVDWCPTGFK-(13)` would
show only the ~13-Da form's features, and the remaining difference would be the (smaller, explainable)
area-vs-apex + fixed-window effects.

## Open items to settle before building

1. **No-open-mod ambiguity fraction** — measure on a real static+variable-only search to confirm Route
   1 "just works" (expected ~1–2% ambiguous). Not yet measured.
2. **Multi-position open-mod mass encoding** — verify the controller emits an open-mod delta **once**,
   not once per candidate position, so `Peptide Monoisotopic Mass` isn't double-counted
   (`peptide_monoisotopic_mass` sums `modifications.values()`).
3. **Identity embedding** — decide the exact identity we send so the output round-trips: at minimum a
   peptidoform/feature key that carries the reported peptide **and** the PSM open-mod mass/position, so
   each peak's mapped forms resolve to exact Limelight entities without string re-matching.
4. **Cross-base-sequence shared peaks** — peaks with `Base Sequences Mapped > 1` (near-isobaric, e.g.
   I/L variants) attribute one intensity to different peptides/proteins; represent with an ambiguity
   flag and dedupe on rollup.
