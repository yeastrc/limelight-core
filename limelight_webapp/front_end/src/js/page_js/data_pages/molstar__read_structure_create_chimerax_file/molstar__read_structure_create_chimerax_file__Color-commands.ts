import { Molstar__read_structure_create_chimerax_file__ResidueColorSpec, Molstar__read_structure_create_chimerax_file__CACoordinateMap, Molstar__read_structure_create_chimerax_file__AuthCollision } from './molstar__read_structure_create_chimerax_file__Types';
import { molstar__read_structure_create_chimerax_file__ResidueKey, molstar__read_structure_create_chimerax_file__NormalizeColor } from './molstar__read_structure_create_chimerax_file__Chimerax-utils';

//  Separator for the auth-spec index key -- '|', which no chain id / residue number / insertion code contains.
const _AUTH_SPEC_KEY_SEPARATOR = '|';

/**
 * Generate ChimeraX `color` commands for residue-level coloring.
 *
 * Input specs identify residues in LABEL numbering (label_asym_id / label_seq_id),
 * but ChimeraX resolves residue specifiers like `/A:42` in AUTH numbering. So we
 * look each residue up in the residue map (keyed by label) and emit the spec using
 * the AUTH identity stored on the entry — chain, residue number, and any insertion
 * code. This does not depend on the residue having a CA atom: the map carries auth
 * identity for every polymer residue, so polymer residues without a CA (nucleic
 * acids, modified or incomplete amino-acid residues) are still colored.
 *
 * ChimeraX atom-spec syntax: /authChainId:authSeqId[insCode]
 * Example output:  color /A:42 #FF0000   (or  color /H:100A #FF0000  with ins code)
 *
 * If the residue is not present in the structure at all we cannot resolve its auth
 * identity, so the command is SKIPPED with a warning rather than emitted with wrong
 * (label) numbering that would silently color the wrong residue.
 */
export function molstar__read_structure_create_chimerax_file__GenerateColorCommands(
    specs: Molstar__read_structure_create_chimerax_file__ResidueColorSpec[],
    caMap: Molstar__read_structure_create_chimerax_file__CACoordinateMap,
    warnings: string[],
    collisions: Molstar__read_structure_create_chimerax_file__AuthCollision[],
): string[] {
    const lines: string[] = [];

    //  Reverse index: ChimeraX auth spec -> the label residues that resolve to it. A spec claimed by
    //  more than one residue is an auth-numbering collision (see the EDGE CASE note below): ChimeraX
    //  cannot tell those residues apart, so a color command for any of them colors them all.
    const authSpec_to_LabelResidues = new Map<string, Array<{ labelAsymId: string; labelSeqId: number }>>();
    for (const [labelKey, mapEntry] of caMap) {
        const authSpecKey = mapEntry.authAsymId + _AUTH_SPEC_KEY_SEPARATOR + mapEntry.authSeqId + _AUTH_SPEC_KEY_SEPARATOR + mapEntry.insCode;
        const lastColon = labelKey.lastIndexOf(':');
        const labelResidue = { labelAsymId: labelKey.slice(0, lastColon), labelSeqId: Number(labelKey.slice(lastColon + 1)) };
        const existing = authSpec_to_LabelResidues.get(authSpecKey);
        if (existing) { existing.push(labelResidue); } else { authSpec_to_LabelResidues.set(authSpecKey, [labelResidue]); }
    }
    const collisionAlreadyReported: Set<string> = new Set();

    for (const spec of specs) {
        const key = molstar__read_structure_create_chimerax_file__ResidueKey(spec.chainId__label_asym_id, spec.residueSeqId__label_seq_id);
        const entry = caMap.get(key);

        if (!entry) {
            warnings.push(
                `Color: residue not found in structure for label chain "${spec.chainId__label_asym_id}" residue ${spec.residueSeqId__label_seq_id} — skipped (cannot resolve auth numbering for ChimeraX spec)`,
            );
            continue;
        }

        const color = molstar__read_structure_create_chimerax_file__NormalizeColor(spec.color_RGB_WithPreceedingHash_OR_CSS_NamedColor);

        //  Emit the residue's own auth spec. This stays unambiguous even when several LABEL chains
        //  share one auth_asym_id: ChimeraX merges them into a single chain, but (auth_asym_id,
        //  auth_seq_id, insCode) is still a unique residue key in a well-formed mmCIF, so `/A:<seq>`
        //  resolves to exactly one residue.
        //  EDGE CASE (out-of-spec only): if the author numbering actually collides within a shared auth
        //  chain -- two residues at the same auth chain + seq (+ ins) -- then `/A:<seq>` matches BOTH and
        //  this command would also color the wrong one. That structure is malformed; ChimeraX itself
        //  cannot disambiguate it either (verified: `select /A:<seq>` returns both residues), and it is
        //  the one case where this auth-based file diverges from the label-based Mol* viewer.
        lines.push(`color /${entry.authAsymId}:${entry.authSeqId}${entry.insCode} ${color}`);

        //  If this residue's auth spec is shared by another residue, the color command above is
        //  ambiguous. Record the collision once per spec (the reverse index lists every residue that
        //  shares it, including any that were not themselves colored but get colored anyway).
        const authSpecKey = entry.authAsymId + _AUTH_SPEC_KEY_SEPARATOR + entry.authSeqId + _AUTH_SPEC_KEY_SEPARATOR + entry.insCode;
        const sharingResidues = authSpec_to_LabelResidues.get(authSpecKey);
        if (sharingResidues && sharingResidues.length > 1 && ! collisionAlreadyReported.has(authSpecKey)) {
            collisionAlreadyReported.add(authSpecKey);
            collisions.push({
                authAsymId: entry.authAsymId,
                authSeqId: entry.authSeqId,
                insCode: entry.insCode,
                residues: sharingResidues.slice(),
            });
        }
    }

    return lines;
}
