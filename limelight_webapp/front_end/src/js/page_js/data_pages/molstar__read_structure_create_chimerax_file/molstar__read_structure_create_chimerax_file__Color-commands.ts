import { Molstar__read_structure_create_chimerax_file__ResidueColorSpec, Molstar__read_structure_create_chimerax_file__CACoordinateMap } from './molstar__read_structure_create_chimerax_file__Types';
import { molstar__read_structure_create_chimerax_file__ResidueKey, molstar__read_structure_create_chimerax_file__NormalizeColor } from './molstar__read_structure_create_chimerax_file__Chimerax-utils';

/**
 * Generate ChimeraX `color` commands for residue-level coloring.
 *
 * Input specs identify residues in LABEL numbering (label_asym_id / label_seq_id),
 * but ChimeraX resolves residue specifiers like `/A:42` in AUTH numbering. So we
 * look each residue up in the CA map (keyed by label) and emit the spec using the
 * AUTH identity stored on the entry — chain, residue number, and any insertion code.
 *
 * ChimeraX atom-spec syntax: /authChainId:authSeqId[insCode]
 * Example output:  color /A:42 #FF0000   (or  color /H:100A #FF0000  with ins code)
 *
 * If the residue is not present in the CA map we cannot resolve its auth identity,
 * so the command is SKIPPED with a warning rather than emitted with wrong (label)
 * numbering that would silently color the wrong residue.
 */
export function molstar__read_structure_create_chimerax_file__GenerateColorCommands(
    specs: Molstar__read_structure_create_chimerax_file__ResidueColorSpec[],
    caMap: Molstar__read_structure_create_chimerax_file__CACoordinateMap,
    warnings: string[],
): string[] {
    const lines: string[] = [];

    for (const spec of specs) {
        const key = molstar__read_structure_create_chimerax_file__ResidueKey(spec.chainId__label_asym_id, spec.residueSeqId__label_seq_id);
        const entry = caMap.get(key);

        if (!entry) {
            warnings.push(
                `Color: residue not found (no CA) for label chain "${spec.chainId__label_asym_id}" residue ${spec.residueSeqId__label_seq_id} — skipped (cannot resolve auth numbering for ChimeraX spec)`,
            );
            continue;
        }

        const color = molstar__read_structure_create_chimerax_file__NormalizeColor(spec.color_RGB_WithPreceedingHash_OR_CSS_NamedColor);
        lines.push(`color /${entry.authAsymId}:${entry.authSeqId}${entry.insCode} ${color}`);
    }

    return lines;
}
