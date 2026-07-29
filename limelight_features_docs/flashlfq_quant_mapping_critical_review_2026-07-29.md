# Critical review: mapping FlashLFQ quant onto Limelight — holes in the composed design

**Date:** 2026-07-29
**Status:** independent critical analysis / design review. Standalone — intentionally **not** linked from
any other doc or index. Reviews (does not supersede) the FlashLFQ quant design docs listed under
"Docs reviewed" below.

> **⚠ NOTE — OPEN MODIFICATIONS ARE DEFERRED.** Per the current design
> (`flashlfq_quant_data_model_and_display_grains.md` scope note), open-modification searches are **out of
> scope for now**: quant is offered only for searches **without** open mods, and the "View / Add Quant"
> button + quant display are hidden when any selected search has open modifications. Several holes below
> (H4 identity/positional-isomer collision, H5 cross-base-sequence shared peaks, H6 open-mod rollup oracle,
> and the open-mod portions of H8) therefore describe the **later** open-mod phase, not what v1 ships. They
> are recorded here so they aren't rediscovered when open-mod support is picked back up — **not** as v1
> blockers.

**Scope & provenance (read first).** This is **design-level reasoning about the existing design docs**,
not new measurement. Where numbers appear (e.g. the ~54% charge over-count, ~93% of signal zeroed in
`QuantifiedPeptides`), they are results from the **prior offline harness / evidence runs recorded in the
source docs**, not re-measured in this session. The criticisms are analytical (my reasoning about how the
pieces compose); none is a screenshot of running product behavior. Nothing here was verified against live
code this session — file/line and behavior claims in the source docs should be re-checked against current
code before acting.

---

## The prompts that produced this analysis (so the ask is preserved with the data)

Verbatim user prompts from the session, in order:

1. *"i have not looked at this in a few weeks. what was i doing here. read memories and any md files not
   committed. make deep research"*
2. *"is the plan to map the flashlfq result to limelight data a good design. be very very critical and
   identify holes."*
3. *"go"* (continue the critical review)
4. *"Explain 'The deepest hole: the composed design collapses the abundance matrix into a scalar'"*
5. *"write up all the analysis in this session into a new md file … add the date … Add the prompts from me
   to the top so i know the request of the data."*

So this doc = a **very critical hole-finding review** of the FlashLFQ→Limelight quant mapping design, plus a
detailed explanation of the single deepest structural hole.

## Docs reviewed

- `flashlfq_output_to_limelight_mapping.md` — which output file to ingest; identity round-trip; filter behavior.
- `flashlfq_quant_data_model_and_display_grains.md` — storage grain + the three display roll-up modes.
- `flashlfq_per_scan_file_separate_run_rationale.md` — one FlashLFQ run per scan file; why MBR must be off.
- `flashlfq_quant_subgroup_scanfile_eligibility.md` — decline per-sub-group quant when sub-groups cross-cut scan files.
- `flashlfq_quant_run_on_final_filtered_psms.md` — charge over-count evidence; Option 1/2/3 spectrum.
- `quant_maxquant_design_discussion.md` — overall quant framing ("abundance matrix is the deliverable").

---

## Verdict

Two different questions are tangled together and get different grades.

- **"Which FlashLFQ file do we ingest, and how do we attribute it?"** — **Good.** Ingesting
  `QuantifiedPeaks.tsv` (feature grain) instead of the zeroed `QuantifiedPeptides.tsv`, storing at feature
  level, and re-attributing a shared peak under every form it maps to (the same many-to-one accounting
  Limelight already does for PSM counts) is correct and well-evidenced. The decisive fact: ingesting the
  peptide file would silently drop ~93% of open-mod signal.

- **"What quant does the product actually deliver, and is it the thing the effort set out to deliver?"** —
  **This is where the design has a structural hole** that no individual doc confronts, because each doc
  reasons locally and correctly, but the decisions **compose** into something that undercuts the stated
  goal. See "The deepest hole" below.

---

## The deepest hole — the composed design collapses the abundance matrix into a scalar

### What an abundance matrix is
Quant's reason to exist (`quant_maxquant_design_discussion.md`): *"abundance is the POINT… the abundance
matrix is the real deliverable."* A matrix = rows (peptides/proteins) × **columns (samples)** × cells
(abundance). The scientific payload is **comparison across the columns** (X higher in A than B; a protein
rising over a time course). A single number with no column to compare against answers no biological
question. The **sample/condition axis is the deliverable**; everything else is scaffolding. The test of the
design is therefore: **does the sample axis survive to what the user sees?**

### Where the sample axis lives in Limelight
FlashLFQ's physical atom is `(peptidoform, scan file) → intensity` — the scan file *is* the raw sample, so
at measurement time a genuine matrix exists (one intensity per peptidoform per scan file). Within one
search, the sample axis can be expressed only two ways:
- **multiple scan files** in the search, and/or
- **sub-groups** ("Sub Search" per-PSM labels partitioning PSMs into conditions/replicates).

(Across searches = Model B, already ruled out by the boss.)

### Each decision removes a column
1. **Modes 1 & 2 sum a search's scan files to one number** (grains doc: "sum the search's scan files").
   `[X in f1, X in f2, X in f3]` → one cell `X_total`. **Scan-file axis gone.**
2. **MBR off + per-file runs makes summation the only defensible move — and a lossy one.** With MBR off
   there's no normalization/gap-filling, so files can't be compared to each other anyway; the design has no
   choice but to sum. And summing is outright wrong if the files are replicates rather than fractions
   (see H2). Either way **no per-file column reaches the user.**
3. **Sub-groups, the other column source, are deferred or declined.** Mode 3 (per-sub-group) is not built;
   and when built, the eligibility doc **declines** per-sub-group quant whenever sub-groups cross-cut scan
   files. So the second column axis is absent (deferred) or refused (ineligible).
4. **Option 1 defines quant as the peptidoform total, not scoped to any secondary filter** — so you can't
   even recover a pseudo-column by filtering the page down.

### The result, drawn out
Matrix that physically exists:

```
                f1     f2     f3        <- scan files (the sample columns)
  peptide X   1.1e9  4.0e8  9.0e8
```

What the peptide page can show after the design's decisions:

```
                Quant (this search)
  peptide X        2.4e9              <- f1+f2+f3, summed
```

One row, **one column, one cell.** Per peptide, per search, a single abundance value with nothing to
compare against. The dimension carrying the entire scientific point — *which sample* — was summed out at
step 1 and had its only two alternative sources deferred/declined at step 3.

### Why this is the deepest hole (different in kind from the others)
The other holes (H3–H9) are defects *inside* the number (charge-correctness, identity round-trip, rollup
math). **Even if all of those were fixed perfectly, you'd have a perfectly correct scalar** — and a correct
scalar still can't answer the question the feature was built to answer. It's a hole in *what the feature
is*, not in *whether the number is right*.

It's invisible per-document because every step is **locally correct**:
- per-file doc: "MBR incompatible with run-once/display-many → per-file, then sum" ✓
- grains doc: "modes 1 & 2 roll up to search level" ✓
- eligibility doc: "decline cross-cutting sub-groups rather than fabricate" ✓
- filtered-PSMs doc: "quant is the peptidoform total, label it honestly (Option 1)" ✓

Each is sound *for its own concern*; their **composition** deletes the sample axis, and no single doc owns
the product of the four. The per-search scalar is a legitimate, shippable thing — the problem is it's
arrived at **by accident, as the residue of four unrelated correctness calls, rather than chosen.** That
silent redefinition of the deliverable is the deepest hole.

### How to put it to the boss
> "We set out to build an abundance *matrix* — the value is comparing samples. But the correctness
> decisions (MBR off, per-file-then-sum, sub-groups deferred/declined, quant-not-filter-scoped) each remove
> a way to keep the sample axis, and together they leave us with **one abundance number per peptide per
> search, with nothing to compare it to.** We should decide *on purpose* whether v1 is that scalar (a
> legitimate 'here's how much of this peptide is in this search') or whether the sample/condition axis is a
> v1 requirement — because if it is, per-file-then-sum is the wrong default and we must close the
> fraction-vs-replicate metadata gap first."

---

## The holes, ranked by severity

### H1 — Goal-vs-delivery gap (the deepest hole, above)
The composed design ships a per-peptide-per-search scalar; the abundance matrix (the stated deliverable) is
exactly the part summed away, deferred, or declined. Force an explicit decision on whether v1 is a scalar
feature or must preserve the sample axis.

### H2 — Summing intensities across scan files is scientifically unsafe by the design's own admission
The per-file doc concedes summing "conflates replicates. FlashLFQ deliberately keeps per-file intensities
precisely so one does not sum replicates," and flags "does Limelight capture fraction-vs-replicate
metadata?" as an **open question** — then picks *sum anyway* as the default.

- **The default is actively wrong (not merely lossy)** when the files are replicates/conditions rather than
  fractions, and the design cannot tell which case it's in.
- **No normalization.** Per-file runs discard FlashLFQ's median normalization, so even the fraction case
  loses cross-file comparability FlashLFQ would have provided.
- **Missing-as-zero, reintroduced.** The maxquant doc's own principle: *"never store missing as 0;
  represent measured/imputed/missing (3-state)."* But MBR-off produces many gaps, and summing X's
  peak-in-f1 with its absence-in-f2 **silently treats the f2 gap as 0 inside the sum.** The 3-state model is
  structurally incompatible with collapsing to a per-search scalar; the design violates its own invariant
  and hides it inside the sum.

### H3 — Option 1's "correct by definition" is a redefinition, not a fix, and fragile at the UI
Harness result: a charge filter over-counts **~54%** vs a re-run on surviving PSMs, and the peak intensity
is **not** charge-decomposable, so it can't be fixed client-side. Option 1 redefines quant as "peptidoform
total, not secondary-filter-scoped."

- On a filtered peptide page the **PSM count on a row drops while the adjacent quant does not**, and the
  quant is for a *superset* of the displayed PSMs. Labeled "correct," but only under a mental model most
  users won't hold — and worst exactly where quant matters most (open-mod clouds, ⚭ shared-signal rows).
- The genuinely useful thing — *filter-scoped* quant — needs Options 2/3, which are dropped/deferred. So
  the product **cannot answer "what is the abundance of what I'm currently looking at," and has decided not
  to.**

### H4 — Identity round-trip coupled to a third-party tool's undocumented string contract
Embedding `rpid` (+ eventually decomposed mods) into FlashLFQ's `Full Sequence` dodges string re-parsing,
but:
- `Full Sequence` is simultaneously FlashLFQ's **peptidoform grouping key** and bound by a **strict 1:1
  string↔mass rule** (same string + different mass = silent drop; 1,740 PSMs dropped before binning). You
  steer an internal identity system through a field whose parse/normalize rules are **undocumented and
  version-specific** (pinned to `CMD.dll 1.0.0.0`). A future FlashLFQ change to bracket/mod-ordering/
  whitespace normalization breaks the round-trip **silently** — a durable coupling risk.
- **Positional isomers collide in the receive-side rollup key — but only for open mods (VERIFIED
  2026-07-29, and narrower than first written).** The receive key is
  `_formKey = rpid|kind|roundedMass` (`quant_PrototypeData.ts:78-79`), which omits position; the code
  self-documents it (`:73-76`, *"share a key and are summed together — rare; the position isn't compared"*).
  Confirmed effect: two **localized open-mod** forms of the **same rpid** at the **same whole-rounded
  mass** but **different residue** are summed together / shown identical (whole-number `Math.round` widens
  this slightly). **This is open-mod → deferred.**
  - **Correction to the first draft of this hole:** the claim that this "hits phosphoproteomics in v1
    (ambiguous phospho)" was **wrong**. Variable-mod ambiguous-site isomers (phospho S3 vs S5) are
    **distinct `reportedPeptideId`s**, so their form keys differ (rpid differs) and they do **not** collide
    here — they share one FlashLFQ peak (same mass) and are surfaced by the **⚭ shared-signal flag**, not
    silently merged. So for v1 (non-open-mod) positional isomers are *handled*, not lost.
  - **Recoverable:** the send side already encodes position — `build_FlashLFQ_FullSequenceString` emits
    per-residue tokens (`FlashLFQ_Run__…Controller.java:1084-1099`), so FlashLFQ separates the isomers into
    distinct peaks; only the receive-side rollup key discards position. Open item #3 (decomposed mods *with
    position* in the key) would fix it from data already present, no re-run needed.
- **Co-located mods on one residue** ("truly co-locate → cannot separate — rare") — also acknowledged, also
  unquantified. N-term mod + residue-1 mod is normal.

### H5 — Cross-base-sequence shared peaks (open item #4) are deferred but hit *normal* searches
`Base Sequences Mapped > 1` (I/L isobars, near-isobaric missed cleavages) → one intensity claimed by
different base sequences → **different proteins.** Not an open-mod edge case. The proposed fix ("ambiguity
flag + dedupe on rollup") is unbuilt and **under-specified for the protein page**: when one peak maps to two
proteins, does each get it (double-count), neither, or an apportionment? Protein rollup is the messiest part
of the story and it's left as a TODO — and abundance-by-protein is a headline output.

### H6 — "We own the rollup" removes the only independent oracle where risk is highest
Rejecting FlashLFQ's summary files is correct, but Limelight now owns peptide-sum, protein rollup, dedup,
and shared-peak attribution. The proposed safety net — "keep summary files as a cross-check; they match
where FlashLFQ marks a peptide unambiguous" — **evaporates for open-mod data, where almost nothing is
unambiguous.** So the home-grown rollup is cross-checked precisely where it's easy and nowhere where it's
hard. The Tier-1 harness validates *subsetting sensitivity*, not rollup arithmetic. No oracle currently
exists for open-mod rollup correctness.

### H7 — "Roll up through the display's own grouping machinery" couples quant correctness to load-bearing shared UI
The idea (store feature-level keyed on decomposed components; roll up through the generated-peptide-string
builder so quant tracks the "Collate Peptides Using:" grain automatically) is right. But that builder
**already merges localized open mods into the variable-mod map and loses the descriptor** (forcing a
side-channel stamp), and it **drives the peptide page + single-protein overlay** (with parallel
experiment-page copies). Threading real quant identity through it is a big, risky change to code the design
itself calls throwaway-prototype-only; the **real** version needs equal or deeper surgery, and the docs
under-cost that.

### H8 — A cluster of load-bearing assumptions the docs themselves mark "not yet verified"
- Per-file ≈ all-files-with-MBR-off, and the de-seed bound: *"not yet observed on multi-file data."*
- No-open-mod ambiguity fraction (Route 1 "just works"): *"not yet measured."*
- **Open item #2 — VERIFIED 2026-07-29: this is a REAL BUG (open-mod path, deferred).** The open-mod delta
  mass **is** counted once per candidate position. Chain: the searcher
  `PsmOpenModification_Masses_Positions_For_PsmIds_Searcher.java:85-89` `LEFT OUTER JOIN`s
  `psm_open_modification_position_tbl`, so one open mod localized to **N candidate positions returns N rows,
  each repeating the same `psm_open_modification_tbl.mass`**; the controller puts each into the
  `openModifications` map at its distinct position key (`FlashLFQ_Run__…Controller.java:869-873`); and the
  mass sum adds **every** map entry (`collapse_NearIsobaric_OpenMod_MassForms:1006-1008`). ⇒ `monoisotopic_mass`
  is inflated by `(N-1)×delta` → wrong precursor m/z sent to FlashLFQ → wrong/failed XIC for those PSMs.
  **Bites only when a single open mod has ≥2 candidate positions** (unlocalized = 1 null-position row, and
  single-position, are both fine). Open-mod is deferred, so not a v1 blocker, but fix before resuming
  open-mod support. (Code-trace finding, not observed on a live run.)
- FlashLFQ tolerating non-standard residues U/O/J in `Base Sequence`: *"untested."*
- **Apex vs area:** default `--int` off means you're **summing apex *heights*** across ~55 cloud
  features/charges to form "quant." Summing heights is a shakier physical quantity than summing areas, and
  guarantees the chromatogram cross-check (which uses area) never matches unless `--int` is on.

### H9 — Track B (DB model) has an unresolved primary-key tension
Option 1 defines quant as "peptidoform total over the **submit-time** filter set"; Option 3 (deferred) would
make the **full filter-state hash** the run's primary key. These imply different run identities. Under
Option 1 a run is keyed on `(projectSearchId, submit-filter-state, scanFileId)`, and **changing any
submit-time filter forces a new run.** Run accumulation, reuse, and GC are unaddressed. The stale-quant
handling (URL-strip on reload) is a *display* patch, not a *storage* policy.

---

## What's genuinely right (so this isn't all teeth)

- **Peaks-vs-peptides ingest** decision is correct and the evidence (~93% of signal zeroed in the peptide
  file) is convincing.
- **MBR-off-via-single-file-runs** is a clever way to force a boolean the CLI (`CMD.dll` switch semantics)
  won't let you set false.
- **Sub-group cross-cutting eligibility** (§1–§6 of that doc) is rigorous; "detect-and-decline, don't
  fabricate apportionment" is the right stance.
- **Mass computation moved to Java** as the single source of truth, and **binning open-mod jitter within
  `(rpid, layout)`**, is sound and removed 100% of the read-time rejections without merging genuine forms.

---

## If forced to prioritize decisions

1. **Confront the goal-vs-delivery gap (H1/H2).** Decide explicitly: is v1 an honest *per-search
   single-abundance* feature (say so), or must the sample/condition axis survive? If the latter,
   per-file-then-sum is the wrong default and the fraction-vs-replicate metadata gap must close first.
2. **Nail open item #2 (mass emitted once per open mod, H8).** Cheap to verify, catastrophic if wrong.
3. **Build positional-isomer identity (decomposed mods + position, H4) before claiming PTM correctness.**
   Don't ship the "rare" hand-wave into a phosphoproteomics context.
4. **Specify the protein-page cross-base-sequence attribution (H5).** It's a headline output left as a TODO.
5. **Establish an open-mod rollup oracle (H6).** The cross-check you have covers only the easy case.

---

## Session reconstruction (context — what this feature is / current state as of ~2026-07-10)

For readers who need the surrounding state (from the design docs + project memory; not re-verified live):

- **Feature:** FlashLFQ MS1 label-free quant for an existing Limelight search's scans + PSMs, across three
  repos — this webapp (controller + peptide-page display prototype), the new `limelight-flashlfq-service`
  (Python/Docker), and design docs in `limelight_features_docs/`.
- **Held state:** all **feature code is deliberately uncommitted** (lands as one commit when Track B / DB
  ingest is done); only design docs are committed.
- **Built (prototype, file/URL-hash, uncommitted):** per-search runs; one "Quant" column per search after
  its PSM Count column (modes 1 & 2); shared-signal **⚭** flag; Option-1 labeling; descriptor-threading fix
  for localized open mods; not-ready banner; symlink demo serving finaldir.
- **Deferred/declined:** mode 3 (per-sub-group, needs scanFile→subGroup DB mapping); cross-cutting
  sub-groups declined; open-mod display gating partially done (button only — column/panel/info-box still
  outstanding); Options 2/3 dropped.
- **Track B (the gate on committing):** DB ingest of `QuantifiedPeaks` (Full Sequence parsed in Java),
  service hardening (job-status endpoint first). Replaces the throwaway TSV fetch/URL-hash scheme.
