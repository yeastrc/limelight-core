# FlashLFQ quant: sub-group / scan-file eligibility

**Status:** design argument + implementation spec. Written 2026-07-07. **Implemented 2026-08-03**
(held/uncommitted) — see the box below; the shipped gate is **stronger** than the original partition rule.
**Audience:** §1–§8 are a decision memo that can be forwarded as-is; §9–§12 are the engineering spec.
**Companion:** for *why a single search with multiple scan files is quantified with one FlashLFQ run per
scan file* (MBR is incompatible with Limelight's run-once/display-many model), see
`flashlfq_per_scan_file_separate_run_rationale.md`.

**One-line ask:** exclude searches whose **sub-groups cross-cut scan files** from *per–sub-group* quant,
because MS1 label-free quant of such sub-groups is not physically meaningful. For such searches, **do not
offer quant at all** — show a short, plain-language message explaining that it isn't available and why.
(Every Limelight-XML converter we have written *never produces this shape* anyway — see §8 — so this is a
guard for a case our own pipeline doesn't create, not a feature we're declining to build.)

> **Implementation note (2026-08-03) — the shipped gate is a 1:1 bijection, tighter than "partition."**
> This doc's original eligibility rule (§9) required only that sub-groups **partition** scan files — no scan
> file may hold PSMs from >1 sub-group. The implemented FlashLFQ per-scan-file gate enforces that **and its
> dual**: no sub-group may hold PSMs in >1 scan file. Both together ⇒ **each sub-group ↔ exactly one scan
> file (1:1)**. The extra half is required because the per-sub-group Quant **column restricts to a single
> `searchScanFileId`**; a sub-group whose PSMs spanned several scan files would force summing its quant
> across files, which is not allowed (`flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md`).
> Two shared-code searchers enforce it, **both must return FALSE** (see §9–§10):
> `Search_AnyScanFile_HasPsms_In_MultipleSubGroups_ForSearchId_Searcher` (no scan file mixes sub-groups) and
> `Search_AnySubGroup_HasPsms_In_MultipleScanFiles_ForSearchId_Searcher` (no sub-group spans scan files). The
> check runs **server-side in the run-submit controller's §5 gate** (typed `FlashLFQ_Run_Reject_Reason`), and
> the FE mirrors it to hide the button. It fires **only for a >1-scan-file search** — a single-file search
> partitions trivially and never calls either searcher.

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

**Physical validity vs. the implemented gate (a deliberate scope choice).** This table is about *physical
validity*, and **partition is sufficient for it** — a sub-group that owns several whole, exclusive scan
files is a legitimate sum over those files. The **implemented** gate is nonetheless stricter (a 1:1
sub-group↔scan-file bijection; §9–§10): a sub-group owning >1 scan file is **rejected**, not summed. This is
**intentional**, for two reasons:

- **Consistency with the no-combine-sub-groups decision.** The current plan is that a search's
  sub-groups are **not** combined into one number when that search is compared against other searches — which
  is already why multi-scan-file quant is offered only in a **single-search** view. Summing a single
  sub-group's quant across its several scan files is the same "combine across the physical measurement units"
  move at a smaller scale, so it is skipped for now by the same reasoning, rather than being the one place we
  silently sum.
- **Our converters never produce it (§8).** As with cross-cutting sub-groups, **every Limelight-XML converter
  we have written gives a sub-group exactly one scan file** — so a sub-group spanning >1 scan file does not
  arise from the real pipeline. It is not an edge case we need to support now, if ever. (If a hand-authored /
  third-party XML ever needs it, the shape is physically summable — revisit then; the display would need a
  per-sub-group column that aggregates a sub-group's exclusively-owned scan files.)

**Parallel caveat, same principle:** since a scan file is *not* always 1:1 with a search, if a scan file is
shared across searches, per-*search* quant double-claims that file's peaks — the same rule applies (a grain
must aggregate scan files it exclusively owns).

## 8. Why this is the right call, not a cop-out

Two independent reasons, either sufficient on its own:

- **Principled:** it scopes quant to what was physically measured, keeps every number **additive,
  reproducible, and comparable**, and prevents the product from emitting fabricated differential abundance
  (§1–§6).
- **Practical — our own tooling never creates this shape:** **every converter we have written from search
  results to Limelight XML produces searches in which sub-groups do *not* cross-cut scan files — and in which
  each sub-group has exactly one scan file** (so neither a scan file mixing sub-groups nor a sub-group
  spanning scan files arises). So these data shapes do not arise from the Limelight pipeline at all — they
  could appear only in hand-authored or third-party XML. There is no reason to engineer a quant model for a
  shape our converters never emit; the correct response is to **detect it and decline**, not to invent
  apportionment (cross-cut) or cross-file summing (sub-group spanning files) logic for it.

The underlying data-model gap (sub-group and scan file are independent per-PSM attributes, never constrained
to align) is real and pre-existing. Rather than block quant on locking that model down, we simply **detect
the unsupported shape and decline quant for it** with a clear message (§11). Searches with the shape our
converters actually produce are quantified normally.

---

## 9. Eligibility rule (formal)

Per search, define quant eligibility by grain:

- **Whole-search grain** — always eligible *for that search's own scan files*. (Cross-search sharing is a
  separate concern; see §12.)
- **Per–sub-group grain** — eligible **iff sub-groups and scan files map 1:1**, i.e. BOTH directions are
  single-valued:
  1. **No scan file mixes sub-groups** — `scanFileId → { subGroupId }` is single-valued (the original
     partition condition; a scan file with ≥2 distinct sub-groups ⇒ cross-cutting ⇒ ineligible), AND
  2. **No sub-group spans scan files** — `subGroupId → { scanFileId }` is single-valued (a sub-group whose
     PSMs land in ≥2 distinct scan files ⇒ ineligible).
  Condition 2 is the **implemented tightening** over the original partition-only rule: the per-sub-group
  quant column restricts to a single `searchScanFileId`, so a sub-group must resolve to exactly one scan
  file (else its quant would have to be summed across files — not allowed). Together (1)+(2) ⇒ a **1:1
  bijection** between the search's sub-groups and its scan files.

A search with **no** sub-groups is trivially eligible (grain = whole search). The check is only performed
for a search with **>1 scan file**; a single-file search is trivially 1:1.

## 10. Detection (cheap, exact) — the two searchers as implemented

Ineligible if **either** direction is many-valued. Conceptually:

```
ineligible(search) :=
       EXISTS scanFileId USED BY search
       SUCH THAT COUNT(DISTINCT subGroupId OVER psm WHERE psm.scanFileId = scanFileId) > 1   -- cross-cut
    OR EXISTS subGroupId USED BY search
       SUCH THAT COUNT(DISTINCT scanFileId OVER psm WHERE psm.subGroupId = subGroupId) > 1    -- sub-group spans files
```

- Both inputs are **per-PSM** attributes (`psm_tbl.search_scan_file_id`; `psm_search_sub_group_tbl.search_sub_group_id`),
  so no new data source is needed.
- **Implemented (2026-08-03) — two shared-code searchers under
  `limelight_shared_code/.../search_sub_group_scan_file/searchers/`**, each a `GROUP BY … HAVING COUNT(DISTINCT …) > 1`
  over `psm_tbl` joined to `psm_search_sub_group_tbl`, both returning a boolean per `searchId`:
  - `Search_AnyScanFile_HasPsms_In_MultipleSubGroups_ForSearchId_Searcher` — the cross-cut check (condition 1
    of §9): `GROUP BY search_scan_file_id HAVING COUNT(DISTINCT search_sub_group_id) > 1`.
  - `Search_AnySubGroup_HasPsms_In_MultipleScanFiles_ForSearchId_Searcher` — the dual (condition 2, the
    implemented tightening): `GROUP BY search_sub_group_id HAVING COUNT(DISTINCT search_scan_file_id) > 1`.
  - A search is per-sub-group eligible **iff BOTH return FALSE**.
- **Where it runs (differs from the original spec above):** the check is done **in the FlashLFQ run-submit
  controller's §5 gate** (`FlashLFQ_Run__Request_Creation_RestWebserviceController`), all-or-nothing, surfaced
  as a typed `FlashLFQ_Run_Reject_Reason` (`MULTI_SCAN_FILE_SUB_GROUPS_CROSS_CUT_SCAN_FILES` /
  `MULTI_SCAN_FILE_SUB_GROUP_SPANS_MULTIPLE_SCAN_FILES`) — **not** as a `DataPage_common_Searches_Flags`
  per-search `quant_SubGroupGrain_Eligible` capability flag as originally sketched. The front-end button gate
  mirrors the same rule (calling the cross-cut webservice only for a >1-scan-file search) so the user never
  submits a request the server will reject; the server gate is the authority.

## 11. What is offered — and the message when quant is declined

Quant is offered only at a grain the data supports. Per-scan-file is used **internally** as the
storage/aggregation grain (§12); whether to *also* expose a per-scan-file report to users is a **separate**
question, out of scope here (users may well want it) — it is **not** used as a substitute for a grain the
user asked for.

| Search shape | Behavior |
|---|---|
| No sub-groups | per-search quant (summed across its scan files) |
| Sub-groups **1:1 with** scan files (partition **and** each sub-group = one file) | per-sub-group quant (one column per sub-group, each = one scan file) |
| Sub-groups **cross-cut** scan files (a file mixes sub-groups) | **Quant declined — show a message.** (Our converters don't produce this shape; §8.) |
| A sub-group **spans** multiple scan files | **Quant declined** — intentionally out of scope (§7 note): physically summable, but skipped for consistency with the no-combine-sub-groups decision, and our converters never produce it. Rejected rather than summed across files. |

**When quant is declined, say so plainly** — don't silently hide it, and don't substitute a grain the user
didn't ask for. Show a short, plain-language message, e.g.:

> **Quant is not available for this search.** FlashLFQ measures signal per raw (mass-spec) file, but this
> search's sub-groups are spread across shared raw files, so a separate quant value per sub-group can't be
> measured from the data.

**UI gating (as implemented):** the eligibility check is enforced **server-side in the run-submit §5 gate**
(§10), not via a `quant_SubGroupGrain_Eligible` per-search flag as originally sketched. The front end mirrors
the same rule to hide the "View/Add Quant" button (calling the cross-cut webservice only for a >1-scan-file
search), and the button is additionally shown only to a logged-in project owner with the run service
configured (`canRunQuant`). A bypassed/stale request is still rejected by the server with a typed
`FlashLFQ_Run_Reject_Reason`. The plain-language "not available" message (above) remains the right UX for the
declined shapes.

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
