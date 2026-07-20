# Protein-sequence → structure-residue mapping: bug, root cause, and rewrite

**Status:** IMPLEMENTED 2026-07-20 (type-check clean, full front-end build passes; runtime/browser
verification still owed — see §8). Written from a full read of the protein-structure (Mol\*) widget, its
alignment DAO, the in-repo Needleman-Wunsch aligner, and the Mol\* 5.6.1 source in `node_modules`.
**Scope:** why markers (mod spheres, trypsin cut-point disks, coverage coloring) can land on the *wrong*
structure residue — or silently not render — and the focused rewrite of the mapping/numbering core that
fixes it. Rendering primitives and the alignment overlays are **not** in scope; they are not broken.

**Path conventions:** repo-root-relative. `<psw>` =
`limelight_webapp/front_end/src/js/page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_structure_widget/jsx`.
`<align>` =
`limelight_webapp/front_end/src/js/page_js/data_pages/common_data_loaded_from_server__project_level_data/common_data_loaded_from_server__project_level_data__structure_file_data`.
`<mol>` = `limelight_webapp/front_end/node_modules/molstar/lib`. Line numbers are approximate (the widget
file is ~9700 lines) — verify before editing.

**Terminology guard:** three different residue-numbering spaces appear below and must not be conflated.
- **ordinal** — 1-based count of a residue's position within a chain's *aligned letter sequence* (a running
  count of non-gap characters). A pure position; carries no structure identity. *This is the value the
  current code mistakenly uses as a `label_seq_id`.*
- **`label_seq_id`** — mmCIF polymer sequence number. 1-based over the full entity in deposited mmCIF (so it
  skips numbers for unmodeled residues, and can start > 1). **Undefined** for ligands, and — critically —
  undefined for PDB files that lack both SEQRES and insertion codes (see §5).
- **`auth_seq_id`** — the *authored* residue number (the PDB `ATOM` `resSeq`). Always present for both
  formats. Not unique on its own; unique within a chain only together with `pdbx_PDB_ins_code`.
- **`residueIndex`** — a residue's index in Mol\*'s parsed atomic hierarchy. Unique by construction. Not a
  file field; a render-time handle.

---

## 0. What the mapping is for

On the protein page, a user can upload a structure file (PDB or mmCIF), and Limelight aligns the
**Limelight protein sequence** (against which all PSMs/mods are reported) to the **structure's chain
sequence**. The resulting alignment lets the widget place, on the 3-D structure:

- **mod spheres** and **coverage coloring** at protein positions that carry data;
- **trypsin cut-point disks** at cleavage sites between adjacent residues.

Every one of these needs the same thing: *given a Limelight protein position, which structure residue does
it correspond to, and where is that residue's atom in space?* That is "the mapping."

---

## 1. The bug

Markers can be placed on the **wrong** structure residue, or silently skipped, whenever the structure
chain's residue numbering is **not 1-based-contiguous** — i.e. it starts above 1, or has internal
unmodeled gaps. The visible symptom is a console warning:

```
CA not found: chain label D residue_A_Position_Structure 2
```

but that is only the subset of failures that (a) fall on the trypsin-cut-point-disk path (the only path
that logs) and (b) address a non-existent residue. Where the wrong number happens to hit an *existing*
residue, the marker is placed on the **wrong residue with no warning at all**.

The warning text is itself misleading: it is not a missing alpha-carbon. It is a **residue-not-found**,
because the code asked Mol\* for a residue by the wrong number.

---

## 2. Root cause

The alignment maps are built in `_populateInternalMaps()` of
`<align>/CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO.ts`
(~lines 160-205). It walks the two gap-padded aligned strings and increments a counter
(`structureFile_AlignedSequence_Position`) by one for **every non-gap character**. That counter — an
**ordinal** — is what the map returns as "the structure position."

The consumers then feed that ordinal to Mol\* **as if it were a `label_seq_id`**:
`<psw>/protein_Structure_WidgetDisplay__Main_Component.tsx` `_getCAPosition(...)` (~9523) calls
`hierarchy.index.findResidueLabel({ label_seq_id: <ordinal> })`. The two are equal **only** when the
chain's `label_seq_id` is 1-based and contiguous.

The structure sequence itself is extracted from Mol\* as *letters only*
(`structure.model.sequence.byEntityKey[entityKey].sequence.label.toArray().join("")`, extraction function
`_molstar_ListChains_SingleStructure...` ~2877), **discarding the `.seqId` column that sits right next to
it.** The real residue number is available and is thrown away.

### Why it was masked for so long

Whether the ordinal happens to equal `label_seq_id` depends on how Mol\* builds the chain's sequence, which
depends on the file:

- **Deposited mmCIF with `entity_poly_seq` (SEQRES):** Mol\*'s sequence is the full 1-based-contiguous
  SEQRES, so ordinal == `label_seq_id`. Mapping is correct; only genuinely-unmodeled residues fail to draw
  (correct skip). **The bug is invisible.**
- **mmCIF stripped to `atom_site` only** (e.g. a "cleaned" file): Mol\* derives the sequence from observed
  atoms → compact, but the atom records still carry the original offset/gapped `label_seq_id` (e.g. 5..216
  with a gap). ordinal ≠ `label_seq_id` → **bug fires.**
- **PDB (any):** see §5 — Mol\* renumbers `label_seq_id` linearly, so ordinal == `label_seq_id`. **Not
  affected.**

This is why production (structure files are all PDB — verified against the three files in file-object
storage: 1AO6, 4BKE, 1OG5, all PDB-with-SEQRES) shows no problem, while a stripped/cleaned mmCIF upload
would.

---

## 3. Both directions, and every consumer

The mapping is consumed in **three shapes**, all in `<psw>/protein_Structure_WidgetDisplay__Main_Component.tsx`:

1. **Point placement — trypsin cut-point disks** (~3547). Limelight position → ordinal (forward map) →
   `_getCAPosition(structure, labelAsymId, ordinal)` → `findResidueLabel({label_seq_id: ordinal})` →
   `findAtomOnResidue(residueIndex,'CA')` → coordinate. *Bug: ordinal used as `label_seq_id`.*
2. **Property-based Mol\* selections — coverage coloring & mod-ball spheres** (ordinal loop ~3244; MolScript
   selection built with `MolScriptBuilder.struct.atomProperty.macromolecular.label_seq_id()` ~2730/3110).
   Builds arrays of ordinals and hands them to Mol\* as a `label_seq_id` selection predicate. *Bug: ordinal
   used as `label_seq_id`.*
3. **Location-driven — hover tooltip** (~1838). Reads the real `label_seq_id` off the hovered
   `StructureElement.Location` and uses it as the **ordinal** key into the reverse map. *Bug: real
   `label_seq_id` used as an ordinal.*

Two further sites carry the ordinal into places it does not belong (silent bugs, fixed in the same pass):

- **ChimeraX export** (`diskSpecs_Internal.residueSeqId1/2` ~3619, plus the mod/color export) writes the
  **ordinal** as a residue seq id. ChimeraX addresses residues by **`auth_seq_id`**, so exports for
  offset/gapped structures are wrong.
- **Cut-point adjacency check** (`residue_A_Position_Structure + 1 !== residue_B_Position_Structure` ~3562)
  is done in **ordinal** space, so two residues that are adjacent in the modeled list but separated by an
  unmodeled loop pass the test — drawing a disk across a gap where there is no peptide bond.

---

## 4. The fix

**Invariant:** anchor every map entry on a **`residueIndex`** (unique by construction), re-derived from the
live structure at render time; never use a numbering field as a positional key again.

### 4.1 Extraction (rewrite)

Replace the `model.sequence`-based extraction with a **per-chain walk of the atomic hierarchy**, polymer
residues only. `model.sequence` has three quirks that make it unsafe as a positional handle (verified in
`<mol>/mol-model/structure/model/properties/sequence.js`):
- it is **entity-keyed** and represents the entity's *first* chain (wrong residues for a homo-oligomer's
  second copy);
- it **collapses microheterogeneity** (keyed by seq_id);
- it **degenerates to length 1** when `label_seq_id` is undefined (the PDB edge, §5) — because it dedupes on
  seq_id and every residue then shares the same (undefined) seq_id.

Walking the hierarchy directly (`chainAtomSegments` / `residueAtomSegments`; `residues.label_comp_id`,
`.label_seq_id`, `.auth_seq_id`, `.pdbx_PDB_ins_code`; `residueIndex` = the loop variable) sidesteps all
three and yields, per residue: **letter, residueIndex, auth_seq_id, label_seq_id, ins_code.**

### 4.2 New abstraction: `ResolvedChainMapping` (render time)

Built once per (chain, proteinSeqVersionId) when the structure loads. Per aligned structure residue it
carries `{ ordinal, residueIndex, auth_seq_id, label_seq_id, ins_code, letter, limelightProteinPosition? }`
and offers lookups by **limelightPosition** (forward), **ordinal** (the coloring walk), and **residueIndex**
(hover). The DAO still turns the two saved strings into *Limelight-pos ↔ ordinal*; the resolver zips
*ordinal → live residue* using the per-chain hierarchy walk.

### 4.3 Which key each consumer uses

- **Point placement (disks):** `residueIndex` → new `_getCAPosition_ByResidueIndex(structure, residueIndex)`
  (`findAtomOnResidue(residueIndex,'CA')`). Bulletproof.
- **Property-based selections (coloring, spheres):** Mol\* selections are *property* predicates and cannot
  key on `residueIndex`, so per chain we select by **real `label_seq_id` when it is defined** (unique per
  chain *even with insertion codes*) and by **`auth_seq_id` only in the undefined-`label_seq_id` edge**
  (that exact edge — PDB with no SEQRES and no insertion codes — has no insertion codes, so `auth_seq_id` is
  unique there). Both regimes are exact; there is no insertion-code over-match. `ResolvedChainMapping.selectionUsesLabelSeqId`
  carries the per-chain choice. *Considered and DECLINED (2026-07-20):* converting the mod-ball **spheres** to
  separate Mesh shapes placed via `residueIndex` (like the disks) was evaluated for architectural
  consistency, then declined. It buys **no correctness** (the keyed selection is already exact), risks
  disturbing the sphere appearance the scientist is satisfied with, and — decisively — would **lose the
  residue tooltip the spheres currently inherit for free**: today a sphere *is* the residue's CA atom, so
  hovering it shows the residue's tooltip; a standalone shape is its own loci and would need the residue
  tooltip explicitly replicated and kept in sync (and could occlude the residue's own hover). The current
  split is well-matched to each marker's meaning: a disk sits *between* residues (own tooltip is right); a
  sphere sits *on* a residue (inherited residue tooltip is right). Coloring must stay a selection anyway
  (overpaint recolors the existing representation in place). *Reconsider only if a **separate,
  mod-specific tooltip on the ball** is wanted — that reframes the lost residue tooltip as the feature; see
  `structure_mod_ball_shape_separate_tooltip.md`.*
- **Location-driven (hover):** read `residueIndex` off the Location; look up the residueIndex-keyed reverse
  map.
- **ChimeraX export:** write `auth_seq_id`.
- **Cut-point adjacency:** switch to **numbering-adjacency** (`auth_seq_id` B == `auth_seq_id` A + 1) so a
  disk is only drawn across a real peptide bond, never across an unmodeled loop. *(Decided 2026-07-20.)*

### 4.4 Persistence & the fail-loud guard

**No schema change.** The DB still stores the two gap-padded letter strings
(`structureFile_AlignedSequence`, `limelightProteinSequence_AlignedSequence`); numbers are re-derived at
render time. This is safe because an alignment is **bound to an immutable structure file** (keyed on
`structureFileId`; a changed structure is a *new* file/id — a user cannot mutate the file under a saved
alignment), and Mol\* parses identical bytes deterministically within a version. So "the Nth residue at
render == the Nth residue at alignment time" is *guaranteed*.

The one residual — a future **Mol\* upgrade** that changes how a chain's residue sequence is derived — is
caught by a **fail-loud guard**: the resolver validates that the re-derived structure letter string equals
the saved one (the widget already computes both, ~1183) and refuses to map (surfacing an error, not a
silent mismap) on mismatch. Today's ordinal path would mismap silently; this is a net improvement.

---

## 5. PDB is not affected — why

Verified in `<mol>/mol-model-formats/structure/pdb/`:
- Mol\* converts PDB → mmCIF (`to-cif.js`) and **never builds `entity_poly_seq`, even when SEQRES records
  exist** (explicit TODO at `to-cif.js:212`).
- `label_seq_id` is *synthesized* in `atom-site.js getAtomSite`:
  `useLinearLabelSeqId = hasSeqRes || (any insertion code present)`. If true → `label_seq_id` = **linear
  1,2,3… per chain over observed residues** (original offset/gaps discarded). If false → `label_seq_id` =
  **undefined**.
- The extraction sequence for PDB always comes from observed residues (`getSequence` →
  `StructureSequence.fromHierarchy`, since there is no `entity_poly_seq`).

So for PDB **with SEQRES or insertion codes** (the overwhelming common case, including all three production
files), ordinal == linear `label_seq_id` == observed order, and the mapping is already correct. The only
PDB case that differs is **no SEQRES *and* no insertion codes** → `label_seq_id` undefined → a *different*
failure (Mol\*'s `model.sequence` degenerates), which the rewrite handles for free because it anchors on
`residueIndex`, not `label_seq_id`.

---

## 6. Aligner input: observed-only

The Needleman-Wunsch aligner is Limelight's own, in-repo
(`.../common__algorithm_implementations/needlemanWunsch_Algorithm_Implementation.ts`), not a third-party
library. It aligns amino-acid *letters* and inserts its own gaps; structure gaps (unmodeled residues) are a
coordinates fact, not an alignment input, and are **not** fed to it.

We align the **observed-only** structure sequence (modeled residues, from the hierarchy walk). Rationale:
- You can only place a marker on a residue that has coordinates, so observed-only loses **no drawable
  mapping**.
- It is **uniform** across file types (the hierarchy always yields it), unlike `model.sequence` which
  silently gives full-SEQRES for one file class and observed-only for another.
- It is **backward-compatible** for PDB: Mol\*'s current PDB sequence is already observed-only, so re-derived
  strings match existing saved alignments (the guard passes; no migration). Only mmCIF-with-SEQRES saved
  alignments would change — none exist in production.
- Unmodeled stretches are still user-visible as **jumps in `auth_seq_id`** (e.g. 150 → 167), so "gap here"
  can be displayed without parsing SEQRES ourselves.

Full-SEQRES alignment (align the complete construct incl. unmodeled residues) is a possible later
enhancement for alignment quality / richer "unmodeled vs absent" messaging, but it requires us to parse
SEQRES ourselves (Mol\* drops it for PDB) and only helps when SEQRES is present.

---

## 7. What is guaranteed (and what is not)

- **Guaranteed:** for every entry in the map (protein position P ↔ a structure residue), anything placed at
  P renders at that residue's true location — for all mmCIF/PDB flavors, homo-oligomers, and the
  undefined-`label_seq_id` edge. With observed-only, every mapped structure residue has coordinates, so
  every mapped pair is placeable and placement is exact.
- **Not covered (and unchanged):** *which* structure residue a protein position maps to is decided by
  Needleman-Wunsch. For same-protein / high-identity sequences it is essentially always right; for poor
  matches it can misalign. That is inherent to sequence alignment and is a separate axis from this fix.

---

## 8. Verification

Static/build — **DONE**:
- Type-check clean (`tsgo --noEmit`, the fast Go compiler used by this project's build).
- Full front-end build + copy-to-Tomcat (`ant -f ant_buildFrontEnd_CopyToTomcat.xml`) succeeds.

Runtime — **still owed** (needs a browser; cannot be driven headless here). Load in the widget and confirm:

Runtime (as deep as possible without a human in the browser — some steps need a person to load a file and
read the console/markers):
- Load the hacked `5T58_sharedAuth_clean.cif` (atom-only mmCIF, chain D `label_seq_id` 5..216 with a 151-166
  gap): markers must now land correctly and **no** spurious `CA not found` should appear.
- Load a production PDB (1AO6 / 4BKE / 1OG5): markers must still map correctly; existing saved PDB alignments
  must pass the fail-loud guard (no regression).
- Exercise all three consumer shapes: mod spheres / coverage coloring, a trypsin cut-point disk, and hover
  tooltip residue identity.

---

## 9. Related

- Root-cause investigation and the production-safety verification are recorded in the working notes for this
  effort (auto-memory `molstar-ca-not-found-fake-map-investigation`, `molstar-structure-mapping-rewrite-plan`).
