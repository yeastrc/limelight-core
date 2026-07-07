# Response to §15 — Track A implementation decisions

*Responding to §15 of `Claude_SeparateAssessment_20260706.md`. Bottom line: I **agree with all four**
recommendations, including the two that flipped my initial lean. The flips corrected real underweighting
on my part; reasoning and a few implementation riders below.*

**Summary: 1 → Java ✅ · 2 → open-only ✅ · 3 → side-by-side ✅ · receive → via the display builder ✅.**

---

## Decision 1 — build the type-tagged `Full Sequence` in **Java**: AGREE (flip accepted)

The argument I underweighted is decisive: **both ends of the format contract live in limelight-core** —
the Java encoder (controller) and the TS decoder (`quant_PrototypeData.ts`). Java-builds keeps encoder +
decoder in **one repo, one PR, one shareable fixture**; the Python-formats option puts the encoder in the
*separate* `limelight-flashlfq-service` repo, so the contract straddles two repos — the classic drift
source. That outweighs my "keep the wire format in the service" instinct.

And that instinct is still satisfied: the service keeps owning the **TSV** (columns, escaping, the
`Full Sequence` *column*); Java supplies that cell's **value**, exactly as it already supplies the mass
value. `Full Sequence` content is Limelight **identity**, not FlashLFQ chemistry (FlashLFQ treats it as
opaque). So "wire format lives in the service" is preserved.

**Concrete consequence:** retire `peptide_mass.py::full_sequence_string` /
`full_sequence_string_with_reported_peptide_id` / `_mass_token`; add a per-PSM **`full_sequence`** field
sent from Java (alongside `monoisotopic_mass`); `request_processor` writes the sent string verbatim. The
service then does **zero** chemistry/identity formatting — a pure renderer, completing the mass-to-Java
move. Port cost is ~40 trivial lines, as §15 says.

**Riders:**
- **Add a shared round-trip fixture** — a golden set of `components → Full Sequence string → parsed
  components`, asserted by *both* a Java encoder test and the TS decoder. Proximity in one repo is the
  opportunity; the fixture is the mechanism that actually keeps them in lockstep. Do this, don't just
  rely on both being in-repo.
- **String must stay FlashLFQ-safe** — no tab/newline, opaque-key-safe characters — and the service's
  TSV writer must pass it through **unaltered/unescaped**. Verify the writer doesn't transform it.

## Decision 2 — tag **open mods only**: AGREE (flip accepted)

The blocker is exactly that **localized open mods render as `[+mass]`, indistinguishable from
variable/static at the same residue**. Making the open component distinguishable (localized *and*
unlocalized) is all per-form needs.

What flipped me: **variable and static are constant within a `reportedPeptideId`** (the variable mods are
part of what *defines* the reported peptide; static is sequence+search-determined). So the receive side
recovers them from the rpid's page display data and only the **open** component has to ride in the
feature. Full `v/o/s` tagging expands the two-ended parser contract now for a capability (mod-page /
per-type rollup) that's **already reachable via `rpid → its mods`**. YAGNI — add `v/s` tags later only if
a concrete *rpid-independent* need appears.

Safety holds: **rpid is in the string**, so two rpids differing only by a variable mod still get distinct
strings and masses — omitting `v/s` tags does not reintroduce the same-string/different-mass rejection.

**Rider (a dependency this creates):** the receive side must look up the rpid's variable/static from page
data to feed the builder. That holds for any **displayed** rpid, but **not** for a shared
cross-base-sequence peak whose other rpid isn't on the page (open item #4). So the builder-feeding must
**degrade gracefully when an rpid isn't in page data** (mark ambiguous / skip) — same case as the
shared-peak indicator below.

## Decision 3 — per-form **and** rpid-total side by side: AGREE

As proposed. I accept the stronger form of §15's point: the **rpid-total is independently meaningful**
(whole-peptide abundance), so keep **both columns beyond validation** and decide later whether to drop
total — don't treat it as scaffolding to delete. `Σ(per-form) ≈ rpid-total` (modulo shared-peak dedup) is
the built-in invariant to test; the chromatogram cross-check validates per-form specifically.

## Receive side — reconstruct via the display builder: AGREE, emphatically

Feed parsed components through `reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches` so
**quant-key == display-key by construction**, and quant tracks the 'Collate Peptides Using:' control for
free. Never a parallel matcher — the display format (brackets, 2 dp / whole-number rounding, open-mod
position-splitting) is builder-owned and *will* drift if re-implemented.

**The rounding reconciliation is the subtle, important part — I'd elevate it from "caution" to "the
core of the receive-side logic":** send-side binning merges within **ppm** (sub-mDa); the display builder
buckets open mods to **whole numbers**. So multiple distinct ppm-features of one rpid (e.g. `+12.98` and
`+13.02`) both round to `-(13)` and **must sum** into that one display row. The receive side buckets
features by running **the builder's own rounding**, never an independently coded round — otherwise you get
off-by-one bucket edges. This is the mechanism that makes "coarser display bucket sums finer ppm features"
correct, and it's also why the builder must be the single source of the key.

## §13c riders — AGREE

- **Charge:** from the `Precursor Charge` column, summed over charges for a display form, **never
  embedded**. Moot for the display grain (which doesn't split by charge).
- **Cross-base-sequence shared peaks (open item #4):** not solved here — the per-form column needs an
  **ambiguity indicator** for shared features (extend the existing shared-count tooltip); don't render a
  shared number as if clean. Ties to the Decision-2 rider (rpid-not-in-page-data).
- **Per-form resolves only to the display-rounded grain**, and the **position-collision limit** — inherent;
  just document them. (Note: because only the *open* mod is tagged, an open mod co-located with a variable
  mod on one residue *is* separable now — the unseparable case narrows to two mods of the **same class**
  truly summed on one residue, which is rarer than the general position-collision framing suggests.)

---

## Proposed concrete token format (starting point for the format-lock)

Open-only tagging, rpid retained, variable/static rendered untagged for human readability of
`QuantifiedPeaks` (the receive side ignores untagged tokens and uses the rpid for them):

- Prefix: `rpid<id>_` (unchanged).
- Variable / static localized mod at residue *i*: `[+m]` after residue *i* — **untagged, unchanged**.
- **Open** mod localized at residue *i*: **`[o+m]`** after residue *i* — the one new thing.
- **Open** mod unlocalized: `[u+m]` appended at the end (already unlocalized-open by nature; unchanged).
- Terminal mods: `n`/`c` as today; **open-at-terminus needs a tag decision** (`[no+m]` / `[co+m]`?) — flag
  for the format-lock.
- Multiple mods at one residue: keep them distinguishable **sub-tokens** in the bracket so the `o`-tagged
  open part is always separable from an untagged variable/static part (e.g. `[+79.96633o+13.00000]`).

Example: `SIQFVDWCPTGFK` with a localized ~13 Da open mod at residue 3 →
`rpid246169_SIQ[o+13.00000]FVDWCPTGFK`; unlocalized → `rpid246169_SIQFVDWCPTGFK[u+13.00000]`;
no open mod → `rpid246169_SIQFVDWCPTGFK`.

*Alternative worth a sentence at lock time:* omit variable/static from the string entirely (only open +
rpid) — then no `o` tag is even needed (every bracket is an open mod). Minimal, but the string stops being
a readable full peptidoform. I lean to the tagged-and-readable form above; either is 1:1-safe because the
mass (computed by Java with all mods) is what FlashLFQ actually quantifies on.

## Two things to make explicit before writing the encoder

1. The **shared Java↔TS round-trip fixture** is the lockstep guarantee (Decision 1) — not proximity alone.
2. The receive side **buckets via the builder's own rounding** (receive-side decision) — this is load-
   bearing, not a footnote.

## Build order (Track A)

Lock format → **Java** (stop summing the open mod into the position total so it stays a separate
component; bin-then-embed; build the tagged `Full Sequence`; send `full_sequence` + `monoisotopic_mass`;
retire the service's string-building) → WAR build + one owner-triggered run + copy `QuantifiedPeaks.tsv`
to the served location → **TS** (parse rpid + open component; feed rpid's var/static + the open component
through the display builder; bucket/sum by the resulting display key; render per-form + rpid-total) →
validate (`Σ(per-form) ≈ rpid-total` and the single-form chromatogram cross-check).

---

## Appendix — front-end filtering/gating code (answering §16's request)

**Confirmed: the gating is already at the proteoform (generated-display-string) grain; the *attribution*
is currently rpid-total — which is exactly the mismatch §16 predicts. Track A changes only the
attribution, so it composes cleanly.**

**Where the surviving-PSM gating happens (upstream, proteoform grain).** The peptide table's row set is
`create_GeneratedReportedPeptideListData_Result` (built by `create_GeneratedReportedPeptideListData__SingleProtein(...)`,
`peptidePage_Display_MainContent_Component.tsx:1013` and `:2984`). It is the **fully filtered** list
(annotation/cutoff + client-side charge/mod-mass/RT), and it is keyed by the **generated peptide display
string** via `result.entries_Key_peptideSequenceDisplay` (a `Map<peptideDisplayString, entry>`). A
proteoform row exists iff ≥1 of its PSMs survives filtering — i.e. **presence-gating at the display-form
grain**, precisely the model §16 validates. The quant prototype consumes this list; it does not do its
own gating.

**How each row maps to rpids (the attribution input).** Each display-string entry carries its
`reportedPeptideId`(s) via `entry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId`
(`Map<projectSearchId, Map<reportedPeptideId, …>>`). One display string → 1+ rpids; one rpid → 1+ display
strings (the open-mod fan-out). Assembled for the panel in
`_compute_displayedPeptidesForQuantPrototype()` (`peptidePage_Display_MainContent_Component.tsx:3221-3246`)
as `{ peptideDisplayString, reportedPeptideIds[] }`.

**Where attribution is currently rpid-total (the ❌ mismatch to fix):**
- Main table Quant cell — `…GeneratedReportedPeptideListSection_Create_TableData.tsx:790-802`: builds the
  row's rpid set from the entry map, then `quant_PrototypeData.get_QuantForReportedPeptideIds(rpids)` =
  **union of all the rpids' peaks (all open-mod forms, all charges)**. So a display-form row shows the
  whole reported peptide's number.
- Standalone panel — `quant_PrototypeDisplay_QuantifiedPeaks_Component.tsx:117-151`: one row per
  `peptideDisplayString`, primary value `get_QuantForReportedPeptideIds(...)` (rpid-total). It **already
  has a partial per-form path** — `get_QuantForDisplayForm(rpids, roundedOpenMass)` gated by
  `_parseDisplayOpenMod(displayString)` (`:52`), but that resolves **unlocalized** open mods only;
  localized → `n/a*`. This is the receive-side rollup shape already prototyped — limited to unlocalized
  precisely because localized open mods are indistinguishable in the current (untagged, summed) string.
- Data methods — `quant_PrototypeData.ts`: `get_QuantForReportedPeptideIds` (rpid-total),
  `get_QuantForDisplayForm` (per-form, unlocalized-resolvable only today), `get_QuantDetailForReportedPeptideIds`
  (tooltip).

**Why it composes with the per-form key.** The rows are already proteoform-keyed and presence-gated, so
Track A leaves the gating untouched and swaps the attribution: replace the `get_QuantForReportedPeptideIds`
lookups with a per-display-form rollup keyed by the **same** `peptideDisplayString` (the receive side
reconstructs that key via the display builder from rpid's var/static + the tagged open component). Gating
grain (display form) then equals attribution grain (display form) — the §16 hard condition is satisfied,
and the existing localized-open `n/a*` gap closes because the open mod is now separable in the string.

**Confirming §16's mod-mass-filter case in this code:** a mod-mass filter drops the non-matching
proteoforms from `entries_Key_peptideSequenceDisplay` (they lose all surviving PSMs), so the surviving
`+16` row is gated correctly — but today its cell still calls `get_QuantForReportedPeptideIds`, which sums
the reported peptide's `+16` **and** `+79` features. That is the concrete "rpid-only attribution gates
quant incorrectly" instance; the per-form key is what makes the surviving row show only its `+16`
features.
