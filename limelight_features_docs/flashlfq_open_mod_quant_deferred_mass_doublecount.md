# Open-modification quant is DEFERRED and known-incorrect — the defects + their in-code tripwires

**Date:** 2026-07-29
**Status:** active engineering note. Open-modification MS1 quant (FlashLFQ path) is **deferred** and, in the
current held/uncommitted prototype code, **produces wrong numbers**. To make sure the buggy path cannot run
silently, the code has **deliberate `throw` tripwires** at every place open-mod data is processed, each
carrying a unique anchor string that points back to a section in THIS doc. **Do not "fix" a build/runtime
error by deleting a throw** — the throw is intentional until the defects below are fixed.

**Why you can't just test a change here:** the UI does not allow a quant submit for a search that has open
modifications (the "View / Add Quant" button + quant display are hidden when any selected search has open
mods). So these code paths are unreachable through normal use, and the throws are tripwires/markers rather
than something you can exercise end-to-end today.

**No line numbers in this doc — on purpose.** Line numbers move. Each code site is marked with a unique
**anchor string** (grep for it). This doc references the anchors, never line numbers. There is also a
single Java toggle constant, **`OPEN_MOD_QUANT_SUPPORTED`** (currently `false`), that gates the Java
tripwires; flipping it is part of re-enabling open-mod quant (see "Re-enabling" below).

Companion docs (for the wider quant design): `flashlfq_output_to_limelight_mapping.md` (open-item #2 —
the mass double-count, marked confirmed), the 2026-07-29 critical review
`flashlfq_quant_mapping_critical_review_2026-07-29.md` (H8 = mass double-count, H4 = receive-side key),
and `flashlfq_quant_data_model_and_display_grains.md` (the deferral scope note).

**See also — the 2026-07-29 FlashLFQ quant review set (peer docs):**
- `flashlfq_quant_mapping_critical_review_2026-07-29.md` — composed-design holes (H1–H9); this doc's bugs
  are H8 (mass double-count) and H4 (receive-side key), verified against the held code.
- `flashlfq_usage_critical_review_2026-07-29.md` — end-to-end, code-observed usage audit (non-open-mod path).
- `flashlfq_open_mod_quant_correctness_boundary_2026-07-29.md` — what open-mod quant can vs. can never be
  correct (the ceiling a fixed implementation could claim).
- `flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md` — the governing rule for
  when quant may/may not be summed across scan files, sub-groups, searches, or conditions (PSM count may
  sum; quant may not).

---

## Root cause (one paragraph)

Limelight models an open modification as **one mass + zero-to-many candidate positions** — an *ambiguous
localization*: the mod is on **one of** those positions, we just don't know which (0 positions =
unlocalized). The DB stores this as **one row in `psm_open_modification_tbl` (the mass) + one row per
candidate position in `psm_open_modification_position_tbl`.** The quant send-side code represents a PSM's
open mods as a **`Map<position, mass>`**, which **cannot express "one mass shared across a candidate-position
set."** Every downstream defect below flows from that: the same delta mass gets stored once per position,
then summed once per position, and rendered as a separate mod token at each position.

## Why the shared searcher is NOT modified

The rows are read by `PsmOpenModification_Masses_Positions_For_PsmIds_Searcher`, whose SQL
`LEFT OUTER JOIN`s `psm_open_modification_position_tbl` — so **one open mod with N candidate positions comes
back as N rows, each repeating the same `psm_open_modification_tbl.mass`.** That fan-out is the upstream
cause, **but the searcher is correct for its other consumer:** it is **also used by
`BlibSpectralLibrary_Download__Request_Creation_RestWebserviceController`** (spectral-library download),
which legitimately needs one row per candidate position. So the searcher is **left untouched** (a `throw`
there would break blib-library download). The fix belongs in the **quant consumer** (the controller), which
must dedupe the fanned-out rows back into one open-mod record before contributing mass / building the
identity string. (When the fix is done, the cleanest enabling change is to have the searcher *also* return
`psm_open_modification_tbl.id` so the consumer can group positions under one open-mod record — that is an
additive change that does not affect the blib consumer.)

---

## The defects, by anchor

Each anchor string below appears verbatim in a code comment + throw message at the corresponding site.
Grep the anchor to find the exact spot.

### `OPENMOD_QUANT_DEFERRED_BUG__CONSUME_POSITION_ROWS`
**Where:** the quant controller `FlashLFQ_Run__Request_Creation_RestWebserviceController`, inside the
`if ( ...isAnyPsmHas_OpenModifications() )` block that reads the open-mod searcher rows into the per-PSM
`openModifications` `Map<position, mass>`.
**What's wrong:** this is where the searcher's per-candidate-position fan-out is consumed. Because the map
is keyed by position, an open mod with N candidate positions becomes **N distinct entries, each holding the
full delta mass** — the map structurally cannot say "one mass, positions {3,5,7}". Every later defect is
downstream of this representation.
**Tripwire:** the **primary** one — it fires first (before any mass/identity computation) for any search
that has open modifications, so the whole open-mod quant path is refused up front.
**Fix:** build a per-PSM list of open-mod records `{ mass, positions[] }` (grouped by the open mod, e.g.
by a searcher-supplied `psm_open_modification_tbl.id`) instead of a `Map<position, mass>`.

### `OPENMOD_QUANT_DEFERRED_BUG__SUM_MASS_PER_POSITION`
**Where:** the controller helper `collapse_NearIsobaric_OpenMod_MassForms`, in the loop that computes each
PSM's neutral monoisotopic mass = base + Σ(non-open mods) + **Σ(open-mod map values)**.
**What's wrong:** it sums **every** entry of the `openModifications` map, so an open mod localized to N
candidate positions adds its delta **N times** — the neutral mass is over-counted by **`(N−1)×delta`**. That
inflated mass is sent to FlashLFQ as `monoisotopic_mass` and drives the precursor **m/z** FlashLFQ
quantifies on, so the wrong XIC is extracted (peptide silently unquantified, or an adjacent/wrong peak
integrated). Unaffected: unlocalized open mods (0 positions → 1 null-position `u` row) and single-position
open mods.
**Tripwire:** guarded by `!openModifications.isEmpty()`, so it only fires for a PSM that actually carries an
open mod (never for non-open-mod peptides, which reach this same helper). Belt-and-suspenders behind
`CONSUME_POSITION_ROWS`.
**Fix:** contribute each open-mod delta to the neutral mass **once**, independent of candidate-position
count (position multiplicity is a localization-ambiguity set, not multiple mods).

### `OPENMOD_QUANT_DEFERRED_BUG__FULLSEQ_TOKEN_PER_POSITION`
**Where:** the controller helper `build_FlashLFQ_FullSequenceString` (and its `collect_FullSequence_ModTokens`
buckets), which emits the FlashLFQ "Full Sequence" peptidoform grouping key from the same
`Map<position, mass>`.
**What's wrong:** it emits an open-mod token **at each position key**, so an ambiguous open mod renders as
present on **every** candidate residue (e.g. `PEP[o+80]T[o+80]IDE`) rather than "on one of {3,5}". FlashLFQ
uses this string as its exact **peptidoform grouping key**, so this corrupts identity/bucketing (in addition
to the mass defect above). Same `Map<position, mass>` root cause.
**Tripwire:** guarded by `!openModifications.isEmpty()`.
**Fix:** choose **one** stable representation for an ambiguous (multi-candidate-position) open mod.
**Recommended: treat multi-candidate-position open mods as unlocalized** for the grouping string —
MS1 quant is position-blind, and the receive side already has an `unlocalized` kind — rather than
fabricating a single localization or emitting the mod at every site.

### `OPENMOD_QUANT_DEFERRED_BUG__RECEIVE_FORMKEY_NO_POSITION`
**Where:** the front-end receive side `quant_PrototypeData.ts`, `get_QuantForDisplayForm(...)` — the
per-display-form rollup.
**What's wrong (separate defect, same feature):** the receive-side rollup key is
`reportedPeptideId | kind | roundedMass` — it **omits position**. So two **localized open-mod** forms of the
**same reported peptide** at the **same whole-rounded mass** but **different residue** collide into one key
and are summed together / shown identical (whole-number rounding widens this). NOTE: this is open-mod-only —
**variable-mod** ambiguous-site isomers (e.g. phospho S3 vs S5) are *distinct `reportedPeptideId`s*, so they
do **not** collide here; they share a FlashLFQ peak and are surfaced by the `⚭` shared-signal flag.
**Recoverable from data already present:** the send side *does* encode position in the Full Sequence
(`build_FlashLFQ_FullSequenceString` emits per-residue tokens), so FlashLFQ separates the isomers into
distinct peaks; only this rollup key discards position.
**Tripwire:** guarded on `openModDescriptor.kind !== "none"`, so it fires only for genuine open-mod display
rows — **plain peptides (kind `"none"`) never trip it**, so the working non-open-mod Quant column is
unaffected.
**Fix:** include mod position in the form key (open item #3 in `flashlfq_output_to_limelight_mapping.md`:
decomposed mods with position). No FlashLFQ re-run needed.

---

## Re-enabling open-mod quant (when the defects are fixed)

1. Fix the four sites above (dedupe open mods to `{ mass, positions[] }`; add mass once; pick the ambiguous
   Full-Sequence representation; add position to the receive-side key).
2. Have the open-mod searcher also return `psm_open_modification_tbl.id` (additive; does not affect the blib
   consumer) so the consumer can group positions under one open-mod record.
3. Flip the Java constant **`OPEN_MOD_QUANT_SUPPORTED`** to `true` and remove the four throws (leave the
   anchor comments as history if useful).
4. Re-enable the UI: remove the open-mod hide-gating on the "View / Add Quant" button + quant column/panel/
   info box (`DataPage_common_Searches_Flags.is__anyPsmHas_OpenModifications__TrueForAnySearch()`).
5. Verify: a PSM whose open mod is localized to ≥2 candidate positions yields
   `monoisotopic_mass == base + Σ(distinct open-mod deltas) + Σ(non-open mods)`, a single stable Full
   Sequence, and per-display-form quant that distinguishes positional isomers. The offline harness under
   `…/flashlfq-service-data/tier1_harness/` can confirm the emitted identifications' masses match theory.
