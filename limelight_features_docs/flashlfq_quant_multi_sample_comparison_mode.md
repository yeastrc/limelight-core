# FlashLFQ quant: what per-file runs give up (MBR + normalization), and where they belong

**Status:** design note. Written 2026-07-30. The per-file (one FlashLFQ run per scan file) default
deliberately forgoes FlashLFQ's two multi-file features — **Match-Between-Runs (MBR / missing-value
recovery)** and **cross-file intensity normalization**. This doc records exactly what is given up, why
those features are incompatible with the current live-filterable display, and where they *do* belong:
a separate **committed multi-sample comparison mode**. Companion to
`flashlfq_per_scan_file_separate_run_rationale.md` (why per-file; §5 = the cost), 
`flashlfq_quant_run_on_final_filtered_psms.md` (the "locked-filter run", Option 3), and
`flashlfq_usage_critical_review_2026-07-29.md` (usage audit; Finding 2 = the multi-file gap).

**Provenance:** algorithmic/architectural reasoning about FlashLFQ and Limelight's quant display, plus
the empirical 2026-07-30 result (recorded in the rationale doc §4) that MBR cannot be disabled via the
CLI in the pinned `CMD.dll 1.0.0.0` build. No new measurement was made for this note.

---

## 1. What per-file gives up (stated plainly)

Running FlashLFQ one scan file at a time forgoes the two features that make LFQ genuinely
*cross-sample comparative*, not just an intensity beside each ID:

- **Match-Between-Runs (MBR) — missing-value recovery.** With multiple files in one run, FlashLFQ
  locates and integrates a peptide's MS1 peak in files where it was **not** MS/MS-identified, as long as
  it was identified in ≥1 file. This fills the gaps DDA's stochastic sampling leaves, so a peptide can be
  compared across samples even where it wasn't fragmented.
- **Cross-file intensity normalization** (`--nor`). Median-centers each file's intensities against the
  group, correcting sample-to-sample load / instrument-drift differences on the assumption that most
  peptides are unchanged.

Both are standard parts of a "proper" multi-sample LFQ workflow (MaxLFQ, IonQuant do them). Losing them
is a real cost, and it lands hardest on the case where quant is most valuable: **comparing replicates /
conditions.**

## 2. Why they are incompatible with the current model (not a FlashLFQ limitation)

Both features assume a **committed, fixed group of comparable samples analyzed together as one
experiment.** Limelight's quant model is the opposite: **run once on submit-time cutoffs, then
re-attribute and presence-gate client-side across arbitrary filter states** (the "run-once /
display-many" model; see the rationale doc and `flashlfq_quant_run_on_final_filtered_psms.md`). The two
collide:

- **MBR breaks the mechanism.** An MBR-transferred peak exists in a file with **no seeding PSM** there.
  Under presence-gating ("show a feature iff a proteoform it maps to still has ≥1 surviving PSM"), that
  peak is **unfilterable** — there is no identification to keep or remove — and it is not FDR-controlled
  in any way Limelight models. This is the hard break, and it is why the pinned build's un-disableable
  MBR forced the single-file design (rationale doc §3–4).
- **Normalization goes stale.** `--nor` factors are computed **relative to the whole group**. The moment
  the displayed set changes (a filter, a sub-group, a different page), those factors no longer apply, and
  they cannot be recomputed client-side without re-running. Less catastrophic than MBR (it scales
  existing peaks rather than inventing phantom ones), but it still binds the result to one committed set.

So it is not "FlashLFQ can't"; it is that **their outputs are valid only for one fixed sample-set +
filter-state**, which is exactly what a live-filterable single-run display trades away.

## 3. The two are not equally lost

- **Normalization** is the more recoverable / lower-stakes one: it creates no unfilterable peaks, and for
  many single-lab datasets the median shift is small. It is simply meaningless in the per-file topology
  (one file → nothing to center against).
- **MBR** is the deep one: it is the feature that genuinely breaks presence-gating, *and* the one with
  the larger scientific payoff (fewer missing values across replicates). It cannot be quietly kept.

## 4. The fair counterpoint (per-file is not strictly worse)

Per-file yields **"sum of ID-seeded XICs"**: more missing values, but **every reported value is backed by
a real MS/MS identification** — no unmodeled transfer error, nothing the presence-gate can't reconcile.

- For **fractions** of one sample (SCX / high-pH / gas-phase), MBR is marginal and can be *actively
  wrong* (transferring a peptide into a fraction it does not belong in). Per-file is arguably better.
- For **replicates / conditions being compared**, MBR's gap-filling is valuable and per-file loses it.

So the per-file result is *more conservative but cleaner*; the MBR result is *more complete but carries
transfer uncertainty Limelight is not modeling.* Which is "better" depends entirely on what the multiple
files are — see §6.

## 5. Where MBR + normalization belong: a committed multi-sample comparison mode

They are not lost forever — they move to a mode where they are valid:

1. The user **declares a comparable group** of scan files (or searches) **with an experimental design** —
   which files are replicates, which are fractions, which conditions.
2. FlashLFQ runs **multi-file, once**, with **MBR and normalization on** (and, per §6, correct
   Biorep/Condition/Fraction assignments).
3. The result is stored as a **fixed peptide × sample matrix** and displayed **as-is** — an LFQ result
   table / heatmap / condition ratios — **not** folded into the presence-gated, live-filterable peptide
   list, and **not** re-attributed as filters change.

This is the **"locked-filter run" (Option 3 of `flashlfq_quant_run_on_final_filtered_psms.md`)
generalized to multiple samples**: MBR and normalization are correct precisely *because* the design is
frozen. Changing the filter/design means a new run, by definition.

## 6. Hard prerequisite: fraction-vs-replicate/condition metadata

Any correct multi-file work is gated on metadata Limelight does not capture today:

- You cannot decide whether MBR / normalization — or even **summing across files** — is appropriate
  without knowing whether the files are **fractions** (sum within a sample), **replicates** (do *not*
  sum; keep separate or average), or **conditions** (compare, don't merge).
- FlashLFQ needs this as `ExperimentalDesign.tsv` **Biorep / Condition / Fraction** columns. The current
  service stamps **every file as Biorep 1 / its own Condition / Fraction 1** — correct for the
  single-file default, but **wrong for a real multi-sample design** (it tells FlashLFQ every file is an
  independent one-replicate condition).

Until Limelight captures experimental design, a committed comparison mode cannot be built *correctly* —
and this is the same metadata gap flagged in the rationale doc §5.

## 7. The product fork (decision for the owner)

The real question is what Limelight quant is *for*:

- **Exploratory overlay (current default):** MS1 abundance shown beside the IDs, live-filterable,
  re-attributable, no MBR/normalization. Right for browsing; safe; every value ID-backed.
- **Committed comparison (the real quantitative deliverable):** a frozen design with MBR + normalization,
  stored as a matrix, displayed as-is. Right for actually comparing samples/conditions.

If the scientific need is cross-sample comparison, MBR + normalization are not a nice-to-have the overlay
is missing — they mean the comparison is a **distinct mode**, and that mode is arguably the primary
quantitative product, with the browse-overlay as its lightweight companion.

## 8. Non-goals / what NOT to do

- **Do not** try to smuggle MBR or normalization into the live single-run overlay. MBR produces
  unfilterable phantom peaks; normalization factors go stale on every filter change. Both corrupt the
  run-once/display-many model.
- **Do not** sum across files without knowing the design — summing conflates replicates (FlashLFQ keeps
  per-file intensities precisely so one does *not* sum replicates).
- **Do not** rely on any `--mbr`/`--nor` value token to turn a feature off in this build — there is none
  (empirically confirmed; rationale doc §4). Feature state is controlled by *which files* go into a run
  (one file → MBR inert), not by CLI flags.
