# FlashLFQ quant: sub-group / scan-file eligibility

**Status:** design argument + implementation spec. Written 2026-07-07.
**Audience:** §1–§8 are a decision memo that can be forwarded as-is; §9–§12 are the engineering spec.

**One-line ask:** exclude searches whose **sub-groups cross-cut scan files** from *per–sub-group* quant,
because MS1 label-free quant of such sub-groups is not physically meaningful. Offer per-scan-file quant as
the always-valid fallback.

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
| Sub-groups that **cross-cut** scan files | — | ❌ **exclude from per–sub-group quant** |

**Parallel caveat, same principle:** since a scan file is *not* always 1:1 with a search, if a scan file is
shared across searches, per-*search* quant double-claims that file's peaks — the same rule applies (a grain
must aggregate scan files it exclusively owns).

## 8. Why this is the right call, not a cop-out

It scopes quant to what was physically measured, keeps every number **additive, reproducible, and
comparable**, and prevents the product from emitting fabricated differential abundance. The data-model gap
(sub-group and scan file being independent per-PSM attributes, never constrained to align) is real and
pre-existing; the eligibility test is the pragmatic way to ship *correct* quant now without waiting for that
model to be locked down. Searches we can't quantify at the requested grain are **not** left empty-handed —
they get the per-scan-file fallback (§11).

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

## 11. Fallback behavior (don't leave searches empty-handed)

The **always-valid** fallback is **per-scan-file quant** — the native FlashLFQ grain, where every peak maps
to exactly one scan file with no ambiguity. Behavior by case:

| Search shape | Offer |
|---|---|
| No sub-groups | per-search total (sum of its scan files); optionally per-scan-file breakdown |
| Sub-groups **partition** scan files | per-sub-group (= per-scan-file grouped by sub-group) |
| Sub-groups **cross-cut** scan files | **per-scan-file only** — do **not** offer per-sub-group; gate the UI so the invalid grain can't be requested, with a short explanation ("sub-groups share raw files, so per-condition quant isn't measurable") |

**UI gating:** treat per–sub-group quant like any other per-search capability — render/enable it only when
**all** selected searches are `quant_SubGroupGrain_Eligible`, exactly as the "Run FlashLFQ" button is gated
on scan data today. Never let the user trigger a grain the data can't support.

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
