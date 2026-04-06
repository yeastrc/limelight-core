import { Structure, Unit, StructureElement, StructureProperties } from 'molstar/lib/mol-model/structure';
import { Vec3 } from 'molstar/lib/mol-math/linear-algebra';
import { Molstar__read_structure_create_chimerax_file__CACoordinateMap } from './molstar__read_structure_create_chimerax_file__Types';
import { molstar__read_structure_create_chimerax_file__ResidueKey } from './molstar__read_structure_create_chimerax_file__Chimerax-utils';

export interface Molstar__read_structure_create_chimerax_file__ExtractResult {
    map: Molstar__read_structure_create_chimerax_file__CACoordinateMap;
    warnings: string[];
}

/**
 * Traverse all atomic units in a Molstar Structure and build a map from
 * "chainId:seqId" keys to the 3D coordinates of the CA atom for that residue.
 *
 * For NMR ensembles or other multi-model structures the first CA encountered
 * for a given chain/residue wins.
 */
export function molstar__read_structure_create_chimerax_file__ExtractCACoordinates( structure: Structure): Molstar__read_structure_create_chimerax_file__ExtractResult {
    const map: Molstar__read_structure_create_chimerax_file__CACoordinateMap = new Map();
    const warnings: string[] = [];

    const loc = StructureElement.Location.create(structure);

    for (const unit of structure.units) {
        // Skip coarse-grained, sphere, gaussian, or other non-atomic units.
        if (!Unit.isAtomic(unit)) continue;

        loc.unit = unit;
        const elements = unit.elements;

        for (let i = 0, n = elements.length; i < n; i++) {
            loc.element = elements[i];

            const atomName = StructureProperties.atom.label_atom_id(loc);
            if (atomName !== 'CA') continue;

            const chainId = StructureProperties.chain.label_asym_id(loc);
            const seqId   = StructureProperties.residue.label_seq_id(loc);
            const key     = molstar__read_structure_create_chimerax_file__ResidueKey(chainId, seqId);

            // First CA wins (NMR: only model 1 coordinates used)
            if (map.has(key)) continue;

            const x = StructureProperties.atom.x(loc);
            const y = StructureProperties.atom.y(loc);
            const z = StructureProperties.atom.z(loc);

            map.set(key, Vec3.create(x, y, z));
        }
    }

    return { map, warnings };
}
