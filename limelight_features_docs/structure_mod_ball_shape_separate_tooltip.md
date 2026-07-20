# Structure viewer: render the mod ball as a shape to allow a separate tooltip on the ball

**Status:** proposed change / design note. Not implemented. Written 2026-07-20.
**Scope:** how to give a **mod-ball sphere its own tooltip**, distinct from the residue's tooltip, by
rendering the ball as a standalone Mesh shape (like the trypsin cut-point disks) instead of as a Mol\*
representation on the residue's atom. Companion: `protein_structure_sequence_mapping_rewrite.md` (the
residue-mapping rewrite this builds on).

**Path conventions:** `<psw>` =
`limelight_webapp/front_end/src/js/page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_structure_widget/jsx`.
Line numbers approximate (the widget file is ~9700 lines).

---

## The point of this change

**Today a mod-ball sphere cannot have its own tooltip** — it inherits the residue's. The ball is a
`ball-and-stick` representation added onto the residue's **CA atom** (the selection has
`atom-test: label_atom_id == 'CA'`), so hovering the ball hits the **same loci** as hovering the residue,
and Mol\*'s loci-label system shows the residue tooltip. There is no separate object to attach a
ball-specific tooltip to.

Rendering the ball as a **standalone shape** gives it its own loci, which **can carry its own tooltip
content** — e.g. the modification's mass / name / details, rather than just the residue. This is the
motivation.

## Current mechanism (mod ball = representation on the residue's CA)

`<psw>/protein_Structure_WidgetDisplay__Main_Component.tsx`,
`_add_Balls_For_Modifications__FirstDeleteExistingBalls` (~3001):
- builds a MolScript selection (`chain == X AND <label_seq_id|auth_seq_id> ∈ {…} AND atom == CA`),
- `tryCreateComponentFromExpression(...)` → a component,
- `addRepresentation(..., { type: 'ball-and-stick', ... })`.

The ball *is* the residue's atom in a representation → residue tooltip, no per-ball tooltip.

## Proposed mechanism (mod ball = standalone Mesh shape, like the disks)

The trypsin cut-point disks already work this way and are the template:
`_addDisks_for_TrypsinCutPoints__FirstDeleteExistingDisks` (~3482) computes each disk's position from a
CA coordinate and emits a custom Mol\* `Shape`, and each disk carries its own tooltip via
`limelight_Only_HTML_TooltipContent` (a per-shape tooltip string).

To do the same for mod balls:
1. For each mod residue (grouped by color/mod), resolve its **`residueIndex`** and CA coordinate — the
   residue-mapping rewrite already provides both: `ProteinStructure_ResolvedChainMapping` (Limelight
   position → residue) and `_getCAPosition_ByResidueIndex(structure, residueIndex)` (residueIndex → CA
   `Vec3`). No numbering-property selection is needed.
2. Build a sphere Mesh at that coordinate (Mol\* `MeshBuilder` / sphere primitive), with the mod color and
   the existing "modification symbols size %" scaling.
3. Emit the spheres as a custom `Shape` and manage its delete-and-recreate lifecycle like the disk shape.
4. **Attach a per-ball tooltip** (the whole point): give each sphere its own
   `limelight_Only_HTML_TooltipContent`, so hovering the ball shows a **mod-specific** tooltip instead of
   the residue tooltip.

## Consequences to weigh (this is a real trade, not free)

- **The residue tooltip is no longer inherited.** Once the ball is its own loci, it stops showing the
  residue's tooltip automatically. That is exactly what enables a *separate* tooltip — but if the residue
  info is still wanted, it must be **replicated onto the ball's tooltip** (and kept in sync). Decide what
  the ball's tooltip should say (mod-only, or mod + residue).
- **The ball sits on top of the residue** and may occlude the residue's own hover at that spot.
- **Appearance must be preserved.** Position is unaffected if the sphere is centered on the CA (same
  anchor the current representation uses); size/tessellation must be tuned to match the current look so
  the scientist's view does not change.
- **No correctness change.** The current keyed selection already targets the right residues (see the
  mapping doc); this is purely a rendering/tooltip change.
- **Coloring is unaffected** and stays a selection — overpaint recolors the residue's existing
  representation in place and has no shape equivalent.

## Why it was previously deferred, and what changed

The separate-shape conversion was evaluated during the mapping rewrite and deferred, precisely because it
*loses* the free residue tooltip. This note reframes that loss as the **feature**: a standalone shape is
what makes a **separate, mod-specific tooltip on the ball** possible. If that tooltip capability is
wanted, this is the way to get it.
