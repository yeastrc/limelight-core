import { Molstar__read_structure_create_chimerax_file__ResidueColorSpec, Molstar__read_structure_create_chimerax_file__CACoordinateMap } from './molstar__read_structure_create_chimerax_file__Types';
import { molstar__read_structure_create_chimerax_file__ResidueKey, molstar__read_structure_create_chimerax_file__NormalizeColor } from './molstar__read_structure_create_chimerax_file__Chimerax-utils';

/**
 * Generate ChimeraX `color` commands for residue-level coloring.
 *
 * ChimeraX atom-spec syntax: /chainId:seqId
 * Example output:  color /A:42 #FF0000
 *
 * A warning is emitted (not an error) when a residue has no CA in the
 * coordinate map, because the color command will still work in ChimeraX
 * as long as the residue exists in the opened structure.
 */
export function molstar__read_structure_create_chimerax_file__GenerateColorCommands(
    specs: Molstar__read_structure_create_chimerax_file__ResidueColorSpec[],
    caMap: Molstar__read_structure_create_chimerax_file__CACoordinateMap,
    warnings: string[],
): string[] {
    return specs.map(spec => {
        const key = molstar__read_structure_create_chimerax_file__ResidueKey(spec.chainId__label_asym_id, spec.residueSeqId__label_seq_id);
        if (!caMap.has(key)) {
            warnings.push(
                `Color: CA not found for chain "${spec.chainId__label_asym_id}" residue ${spec.residueSeqId__label_seq_id} — command emitted anyway`,
            );
        }
        const color = molstar__read_structure_create_chimerax_file__NormalizeColor(spec.color_RGB_WithPreceedingHash_OR_CSS_NamedColor);
        return `color /${spec.chainId__label_asym_id}:${spec.residueSeqId__label_seq_id} ${color}`;
    });
}
