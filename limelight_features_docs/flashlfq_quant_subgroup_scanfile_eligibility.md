# FlashLFQ quant: sub-group / scan-file eligibility

**Status:** design argument + implementation spec. Written 2026-07-07.
**Audience:** §1–§8 are a decision memo that can be forwarded as-is; §9–§12 are the engineering spec.
**Companion:** for *why a single search with multiple scan files is quantified with one FlashLFQ run per
scan file* (MBR is incompatible with Limelight's run-once/display-many model), see
`flashlfq_per_scan_file_separate_run_rationale.md`.

**One-line ask:** exclude searches whose **sub-groups cross-cut scan files** from *per–sub-group* quant,
because MS1 label-free quant of such sub-groups is not physically meaningful. For such searches, **do not
offer quant at all** — show a short, plain-language message explaining that it isn't available and why.
(Every Limelight-XML converter we have written *never produces this shape* anyway — see §8 — so this is a
guard for a case our own pipeline doesn't create, not a feature we're declining to build.)

---

## 1. The one principle everything follows from

MS1 label-free quant measures a **physical quantity**: the integrated MS1 ion current (chromatographic
peak area) of one peptidoform within **one raw file** (scan file). The indivisible atom of quant is
**(peptidoform, scan file)**. Every number we report must be a **sum of whole (peptidoform, scan file)
measurements**. We can aggregate scan files *upward* into any grouping; we can **never subdivide** a single
scan file's measurement into smaller pieces.

Everything below is a consequence of that one fact.

## 2. What a sub-group is, and why it collides with quant

- **Scan file** is a *physical* per-PSM fact: which raw file the spectrum was acquired in. This is where
  the MS1 signal literally exists.
- **Sub-group** is a *logical* per-PSM label, assigned independently of the scan file.

The two are assigned independently, so (confirmed for this data model):

- a single search can use **multiple** scan files (with or without sub-groups);
- a scan file is **not** always 1:1 with a search;
- a sub-group can contain PSMs from **many** scan files, and a scan file can contain PSMs from **many**
  sub-groups — **there is no required correlation.**

The sub-group boundary slices *through* the physical unit of measurement instead of respecting it.

## 3. The fatal flaw

A single FlashLFQ MS1 peak = **one raw file, one integrated intensity**, and it is routinely hit by
**multiple PSMs** — visible in our own output: every `QuantifiedPeaks` row has one `File Name` and a
`PSMs Mapped` count frequently >1. When those PSMs carry **different sub-group labels**, that one intensity
belongs to two or more sub-groups at once.

There is no physical basis for assigning it to a sub-group, because **FlashLFQ never sees sub-groups** — it
integrates MS1 features in raw files, and the raw file's MS1 scans carry no sub-group labels. The
information needed to split the peak does not exist in the data being quantified.

## 4. Every "workaround" fabricates or corrupts data

1. **Assign each peak to one sub-group** (majority / first PSM). Arbitrary and biased: which sub-group
   "wins" depends on stochastic MS2 sampling, not on the sub-group's definition. Non-reproducible.
2. **Apportion the intensity across sub-groups by PSM count.** Invents numbers. MS2 event counts reflect
   data-dependent acquisition and dynamic exclusion — **not** relative MS1 abundance. It manufactures a
   decomposition of a single area that has no physical meaning.
3. **Count the whole peak under every sub-group it touches.** Sub-group intensities become non-additive
   (they no longer sum to the scan-file/search total) and a shared peak inflates *both* sub-groups being
   compared.

## 5. It defeats the entire purpose of per–sub-group quant

The reason to quantify per sub-group (per condition) is almost always **differential comparison**: is
peptide X more abundant in condition A than B? But if A and B **share raw files**, they were **never
separately measured** — there is one measurement of X in the shared file. Comparing "A" to "B" is comparing
a number to an arbitrary slice of itself — not a weaker result, an **invalid** one. Emitting
differential-abundance calls derived this way is a scientific-integrity and reproducibility risk.

The tell: when sub-groups genuinely *are* separate conditions or replicates, they are separate acquisitions
→ **separate scan files** → they don't cross-cut. **The only case where per–sub-group quant is meaningful is
exactly the case where sub-groups don't cross-cut scan files.** Cross-cutting sub-groups are, by
construction, not physical samples — they're post-hoc labels inside shared samples.

## 6. FlashLFQ specifically cannot do this

FlashLFQ has no concept of a sub-group; its unit is the run (raw file). Its match-between-runs (MBR) step
transfers IDs *across runs* — if we pretend sub-groups are "runs" while they share raw files, MBR is asked
to match a file against itself, and the run/sample abstraction collapses.

## 7. The physically-valid scope

Quant is well-defined precisely when the reporting grain is a union of **whole, exclusively-owned scan
files**:

| Case | Quant grain | Verdict |
|---|---|---|
| Search, no sub-groups | sum over the search's scan files | ✅ valid |
| Sub-groups that **partition** scan files (no scan file mixes sub-groups) | per sub-group = sum over that sub-group's scan files | ✅ valid |
| Sub-groups that **cross-cut** scan files | — | ❌ **decline quant; show a message (§11)** |

**Parallel caveat, same principle:** since a scan file is *not* always 1:1 with a search, if a scan file is
shared across searches, per-*search* quant double-claims that file's peaks — the same rule applies (a grain
must aggregate scan files it exclusively owns).

## 8. Why this is the right call, not a cop-out

Two independent reasons, either sufficient on its own:

- **Principled:** it scopes quant to what was physically measured, keeps every number **additive,
  reproducible, and comparable**, and prevents the product from emitting fabricated differential abundance
  (§1–§6).
- **Practical — our own tooling never creates this shape:** **every converter we have written from search
  results to Limelight XML produces searches in which sub-groups do *not* cross-cut scan files.** So this
  data shape does not arise from the Limelight pipeline at all — it could appear only in hand-authored or
  third-party XML. There is no reason to engineer a quant model for a shape our converters never emit; the
  correct response is to **detect it and decline**, not to invent apportionment logic for it.

The underlying data-model gap (sub-group and scan file are independent per-PSM attributes, never constrained
to align) is real and pre-existing. Rather than block quant on locking that model down, we simply **detect
the unsupported shape and decline quant for it** with a clear message (§11). Searches with the shape our
converters actually produce are quantified normally.

---

## 9. Eligibility rule (formal)

Per search, define quant eligibility by grain:

- **Whole-search grain** — always eligible *for that search's own scan files*. (Cross-search sharing is a
  separate concern; see §12.)
- **Per–sub-group grain** — eligible **iff every scan file used by the search contains PSMs from at most one
  sub-group.** Equivalently: the map `scanFileId → { subGroupId }` is single-valued for every scan file.
  Any scan file mapping to ≥2 distinct sub-groups ⇒ **cross-cutting ⇒ ineligible.**

A search with **no** sub-groups is trivially eligible (grain = whole search).

## 10. Detection (cheap, exact)

Group the search's PSMs by `(scanFileId, subGroupId)` and check for any scan file with >1 distinct
sub-group. Conceptually:

```
ineligible(search) :=
    EXISTS scanFileId USED BY search
    SUCH THAT COUNT(DISTINCT subGroupId OVER psm WHERE psm.scanFileId = scanFileId) > 1
```

- Both inputs are **per-PSM** attributes the FlashLFQ request builder already gathers (scan file per PSM;
  sub-group label per PSM), so no new data source is needed — it's one pass over the PSM set the controller
  already assembles.
- Compute it **in Java** (authoritative, next to the identity/mass logic already moving server-side, and in
  line with the plan to store a generic quant format Java-side). Expose the result as a **per-search
  capability flag** consumed by the front end, mirroring the existing `DataPage_common_Searches_Flags`
  pattern the UI already uses to gate the "Run FlashLFQ" button (`is__All_Searches_Have_ScanData()` etc.).
  Add e.g. `quant_SubGroupGrain_Eligible` per search.

## 11. What is offered — and the message when quant is declined

Quant is offered only at a grain the data supports. Per-scan-file is used **internally** as the
storage/aggregation grain (§12); whether to *also* expose a per-scan-file report to users is a **separate**
question, out of scope here (users may well want it) — it is **not** used as a substitute for a grain the
user asked for.

| Search shape | Behavior |
|---|---|
| No sub-groups | per-search quant (summed across its scan files) |
| Sub-groups **partition** scan files | per-sub-group quant |
| Sub-groups **cross-cut** scan files | **Quant declined — show the message below.** (Our converters don't produce this shape; §8.) |

**When quant is declined, say so plainly** — don't silently hide it, and don't substitute a grain the user
didn't ask for. Show a short, plain-language message, e.g.:

> **Quant is not available for this search.** FlashLFQ measures signal per raw (mass-spec) file, but this
> search's sub-groups are spread across shared raw files, so a separate quant value per sub-group can't be
> measured from the data.

**UI gating:** treat per–sub-group quant like any other per-search capability — render/enable it only when
**all** selected searches are `quant_SubGroupGrain_Eligible` (same pattern as gating the "Run FlashLFQ"
button on scan data today). For an ineligible search, show the message instead of a quant control.

## 12. The generic quant format should make this fall out for free

Store the generic quant record at the physical atom: **`(peptidoform-identity, scan_file, intensity)`**,
where `peptidoform-identity = reportedPeptideId + open-mod form {kind, roundedMass}` and `scan_file` is the
sample. Then **every valid reporting grain is a `GROUP BY` over scan files**:

- per-scan-file = the raw records;
- per-search = group by the search's scan files;
- per-sub-group = group by sub-group **iff sub-group is a function of scan file** (the §9 partition
  condition) — otherwise undefined, and the format makes that explicit rather than inviting a bad split.

Keeping the format at scan-file grain means the eligibility question is answered by the *shape of the
grouping*, not by special-casing quant math — and cross-cutting sub-groups are simply a grouping that isn't
a function of the key, which is exactly why they're excluded.

**Cross-search sharing (§7 caveat) is the same shape:** per-search is valid iff each search owns disjoint
scan files; a scan file shared by two searches is the search-level analog of a cross-cutting sub-group and
must be resolved (attribute the file to one search, or exclude) by the same principle.
