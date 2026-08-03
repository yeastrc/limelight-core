# FlashLFQ: why every scan file needs a separate run — even within one search

**Status:** design rationale. Started 2026-07-08. Explains why a single search that has *multiple* scan
files should be quantified with **one FlashLFQ run per scan file**, not one run over all its files at once.
Companion to `flashlfq_quant_data_model_and_display_grains.md` (storage grain is already per scan file),
`flashlfq_quant_subgroup_scanfile_eligibility.md` (which scan files are eligible), and
`flashlfq_output_to_limelight_mapping.md` (the identity round-trip). The authoritative decision record is
**§19** of `Claude_SeparateAssessment_20260706.md` (repo root); this doc is the standalone explanation.

**Implementation status (2026-08-03): the per-file design below is now the LIVE path (held/uncommitted).**
The run-request controller (`FlashLFQ_Run__Request_Creation_RestWebserviceController`) no longer rejects
multi-scan-file searches wholesale and no longer runs one joint per-search run. Instead the **server fans
out one FlashLFQ run per scan file** (the browser still submits ONE request; scan files are derived
server-side from the cutoffs), each run seeing exactly one scan file so **MBR is off by construction**. Each
run returns its own `requestId`, tagged by `searchScanFileId` and written into the URL hash
(`projectSearchId_searchScanFileId_requestId`); results are **never summed across scan files** — each scan
file's quant renders in its own per-sub-group column.

The old interim guard (`errorAtLeastOneSearchHasMoreThanOneScanFile`, all-or-nothing reject of any
multi-scan-file search) is **replaced** by the **§5 gate**: a >1-scan-file search is now *permitted*, but
**only** when it is the sole selected search, has sub-groups, and its sub-groups map **1:1 to scan files**;
otherwise it is rejected with a typed reason (`FlashLFQ_Run_Reject_Reason`, 4 values). See the plan
`flashlfq_quant_per_scanfile_run_keying_plan.md` §5 and the eligibility doc's 1:1 invariant. Everything is
still **held uncommitted** behind the Track-B (DB ingest) commit gate.

**Terminology note:** avoid the word **"tag"** here — Limelight already uses *search tags* (user-assigned
labels). Use the precise ids: **`projectSearchId`**, **`scanFileId`** (`search_scan_file_id`),
**`reportedPeptideId`**, and *peptidoform / display form* for the receive-side form key
(`reportedPeptideId` + open-mod `{kind, roundedMass}`).

---

## TL;DR — the rule

> **Run FlashLFQ once per scan file, feeding each run only that file's PSMs.** This holds for the
> multi-search topology already in use (each search = one scan file) **and** for the previously-unhandled
> case of one search with several scan files. The reason is not performance or convenience — it is that
> **Match-Between-Runs (MBR) is fundamentally incompatible with the way Limelight displays quant**, and
> running one file at a time is the clean way to guarantee MBR is off.
>
> **Whether to then *sum* the per-file runs is a separate decision** (fraction-vs-replicate; §5). The
> **implemented** path does **not** sum across scan files — because Limelight has no fraction-vs-replicate
> metadata, it keeps each scan file's quant in its own **per-sub-group column** (the conservative end of §5's
> trade), rather than combining them into one displayed total. Summing per displayed form across per-file
> runs remains the correct model *only* where the files are known-combinable (e.g. genuine fractions), which
> the current gate does not attempt to assert.

---

## 1. Two topologies, one rule

- **Many searches, each a single scan file** (already in use): each search is already its own FlashLFQ run
  over one file. No cross-file coupling exists. Nothing changes.
- **One search, multiple scan files** (was never designed — see assessment §17 / TODO #1): the tempting
  move is to hand FlashLFQ all of the search's files in a single run. **Don't.** Partition by scan file and
  run each separately, exactly as in the first topology.

Both collapse to the same primitive: **a FlashLFQ run sees exactly one scan file.**

## 2. The Limelight quant architecture this must not break

Established in assessment §16 and in `flashlfq_quant_data_model_and_display_grains.md`:

- FlashLFQ is **measured once** over the PSM set defined by the annotation/cutoff filters at submit time.
  Changing *those* filters requires a **new run**.
- **Every other page filter** (charge, mod mass, RT, scan, sub-group, …) is applied **client-side by
  presence-gating**: a quant feature is shown iff a proteoform it is attributed to **still has ≥1 surviving
  identification (PSM)** after filtering. FlashLFQ is **not** re-run.

Call this the **run-once / display-many** model. It has one unstated but essential premise:

> **Every quant feature is attributable to real PSMs in the measured set** — so the question
> "did any of its PSMs survive this filter?" always has an answer.

## 3. Why MBR breaks that premise — the core argument

**What MBR does.** With multiple files in one run, FlashLFQ's Match-Between-Runs transfers identifications
*across* files: if a peptide is MS/MS-identified in file A but only *present in the MS1* of file B (its
precursor is there, but DDA's stochastic sampling never triggered an MS/MS scan for it in B), MBR
integrates the peptide's extracted-ion chromatogram in **B anyway** and emits a peak for it — a peak with
**no identification in B**.

**Why that is fatal to presence-gating.** An MBR-transferred peak has **zero seeding PSMs in its own scan
file, by construction.** It exists in file B purely because of a *donor* identification in file A. But
Limelight's send side stamps each peak's `reportedPeptideId` from that donor, so the phantom B-peak still
carries an `rpid` and **will be summed into that peptide's displayed quant**. Now apply any page filter:

- There is **no PSM in file B behind that peak** for the filter to keep or remove.
- So presence-gating cannot decide whether the peak belongs in the filtered view. It is not merely that a
  re-run on the filtered subset *would* differ — the peak is **unfilterable**: it can never be reconciled
  with the PSM set the user is looking at.

This is stronger than "MBR changes the multi-file numbers." MBR breaks the **mechanism** of the run-once /
display-many model, because that mechanism assumes every feature traces back to filterable PSMs and MBR
peaks do not.

**Corollary.** MBR is only sound if FlashLFQ is run on **exactly** the PSMs driving the current display —
which means abandoning run-once and binding a result to a single filter state. **You cannot have both MBR
and results that are reusable across filter states.** Limelight's design chose reusable-across-filters; MBR
therefore has to be off.

## 4. Why *per-file runs* are the right way to turn MBR off

FlashLFQ's `CMD.dll` 1.0.0.0 (the command-line program the service shells to) exposes booleans as
**switches**: `--mbr` defaults **on**, and there is **no token that sets it false** — omitting `--mbr`
leaves MBR on. (See assessment §4a/§17; confirmed by `FlashLfqSettings.toml` showing
`MatchBetweenRuns = true` and stdout running the MBR stage even when the UI box was unchecked.) So you
cannot express "MBR off" through the CLI directly.

**Empirical re-confirmation (2026-07-30) — including the frequently-suggested `--mbr no`.** A web/AI
answer sometimes claims "pass `--mbr no` to turn it off." That is **false for this build.** Ran the actual
image (`flashlfq-local:latest`, `dotnet /flashlfq/CMD.dll`) on a copy of a real single-file run's inputs,
outside `finaldir`, and read each output's `FlashLfqSettings.toml` + log:

| CLI argument           | `MatchBetweenRuns` (toml) | MBR stage ran? | exit |
|------------------------|---------------------------|----------------|------|
| *(no `--mbr` flag)*    | **true**                  | yes            | 0    |
| `--mbr no`             | **true**                  | yes            | 0    |
| `--mbr false`          | **true**                  | yes            | 0    |
| `--mbr` (bare)         | **true**                  | yes            | 0    |

Every form leaves MBR **on** (exit 0, no parse error — a value token like `no`/`false` is silently
ignored, and the flag's mere presence, or its `true` default, keeps it on). This matches the official
wiki (booleans are bare presence-flags with no value syntax; `--mbr` defaults `true`). **There is no CLI
way to disable MBR in this build** — do not rely on `--mbr no` / `--mbr false` (same trap as `--nor
false`). The single-file run below is the only guarantee.

But **a single-file run has no donor**, so MBR is a **guaranteed no-op** — there is nothing to match
between. Running one scan file at a time therefore **forces MBR off by construction.** This is the cleanest
MBR-off path available, and one the earlier analysis (§17) did not list — it needs **neither**:

- (a) rewriting the service to drive FlashLFQ as a **.NET library** (`FlashLfqEngine`, where MBR is a
  settable property), **nor**
- (b) a newer FlashLFQ whose `--mbr` accepts a value.

*Empirical grounding:* the validated single-file run `b3a49a5d…` produced **0 MBR-transferred peaks — all
9,162 peaks are Detection Type `MSMS`** (assessment §17). A single file genuinely yields no MBR signal.

**Bonus:** per-file runs collapse the multi-file case into the **single-file topology already validated**,
so its correctness property carries over verbatim: summing a run's peaks equals a subset re-run *except*
for peaks a finer-than-proteoform filter fully de-seeds, and **every peak is backed by a real MS/MS ID.**

## 5. What per-file runs cost — and the decision that surrounds it

> See `flashlfq_quant_multi_sample_comparison_mode.md` for the full treatment of what per-file gives up
> (MBR + normalization) and where those features belong (a committed multi-sample comparison mode).

Turning MBR off is not free; be explicit about the trade:

- **You give up MBR's value-recovery.** MBR's purpose is to fill *missing values* — quantify a peptide in a
  file where it was present but not MS/MS-identified. Per-file runs will not do this; a file where a peptide
  wasn't identified gets no peak for it. The displayed cross-file total becomes **"sum of ID-seeded per-file
  XIC areas"** — more conservative and fully filter-attributable, but with more gaps than an MBR total.
- **Whether that loss matters depends on what the multiple files are** — a real design decision, not a bug:
  - **Fractions** of one sample (SCX / high-pH / gas-phase): a peptide lives in one or a few fractions;
    cross-fraction MBR is marginal and can be *actively wrong* (transferring a peptide into a fraction it
    doesn't belong in). → Per-file is fine, arguably better.
  - **Replicates / time series / conditions to compare across files:** MBR's gap-filling is valuable, and
    per-file loses it. → Per-file produces more missing values.
- **Open question — does Limelight capture the file-relationship metadata (fraction vs replicate)?** If it
  does not, one cannot branch on it and must pick a **documented default**. Given the correctness parity
  with the validated single-file path, and that the display already just sums, the defensible default is
  **per-file-then-sum, documented as "MBR-based recovery not performed."**
- **Summing across files** is itself a semantic worth stating: a legitimate *total* for fractions; it
  *conflates* replicates (FlashLFQ deliberately keeps per-file intensities precisely so one does **not**
  sum replicates). Same fraction-vs-replicate metadata gap.

**Not a regression.** The current peak-summing display never used FlashLFQ's cross-file normalization or
protein-Bayesian rollup, so per-file runs lose **only** MBR — nothing else the display relied on.

## 6. If MBR is ever genuinely wanted

Then the run-once model does not apply: FlashLFQ must be re-run on **exactly** the PSMs driving the current
display (see the Tier-2 explicit `reportedPeptideId → [psmId]` submit path in assessment §19d), and the
saved result is valid for **one** filter state only. That is a different feature with different storage
semantics — not a variation of the per-file default above.

## 7. How to verify this (independent oracle)

Two tiers, from assessment §19d:

- **Tier 1 (no code change):** each `finaldir/<requestId>/` already has `flashlfq_identifications.tsv` (the
  exact identification input), `mzml/`, and the engine. Delete a controlled subset of identification rows
  (one peptidoform / one charge / one file / a random fraction), re-run `CMD.dll` on the reduced input +
  same mzML, and compare `QuantifiedPeaks` intensities per form (full-run-restricted-to-survivors vs subset
  re-run). This measures FlashLFQ's subsetting sensitivity directly and shows any RT-recalibration drift on
  retained peaks. (Verify `flashlfq_identifications.tsv` is one-row-per-PSM before relying on it.)
- **Tier 2 (end-to-end, throwaway):** modify the submit webservice to accept explicit
  `reportedPeptideId → [psmId]` and build inputs from only those; the peptide page already knows the
  surviving reportedPeptideIds+PSMs for the current filters, so it can hand that set straight to the
  endpoint. Confirms the summed display equals a re-run on exactly the displayed PSMs. Removed once results
  live in the DB.

---

## Provenance note

Sections 3–4 are algorithmic/domain reasoning about how FlashLFQ seeds and integrates peaks (and how MBR
transfers them), consistent with the empirical single-file result cited in assessment §17 (0 MBR peaks,
all `MSMS`). The claim that *per-file runs ≈ one all-files run with MBR off*, and the de-seeding bound, are
to be **confirmed by the Tier-1 harness** on a real multi-file search — they have not yet been observed
directly on multi-file data.
