import { Structure, Unit, StructureElement, StructureProperties } from 'molstar/lib/mol-model/structure';
import { Vec3 } from 'molstar/lib/mol-math/linear-algebra';
import { Molstar__read_structure_create_chimerax_file__CACoordinateMap } from './molstar__read_structure_create_chimerax_file__Types';
import { molstar__read_structure_create_chimerax_file__ResidueKey } from './molstar__read_structure_create_chimerax_file__Chimerax-utils';

export interface Molstar__read_structure_create_chimerax_file__ExtractResult {
    map: Molstar__read_structure_create_chimerax_file__CACoordinateMap;
    warnings: string[];
}

/**
 * Traverse all atomic units in a Molstar Structure and build a map, keyed by
 * label "chainId:seqId", holding for every POLYMER residue its AUTH identity
 * (auth_asym_id / auth_seq_id / insertion code) plus the 3D coordinate of its
 * CA atom when it has one.
 *
 * Every polymer residue is recorded — not just CA-bearing ones — so that
 * ChimeraX `color` commands (which only need the auth residue spec) can be
 * emitted for polymer residues that have no CA atom (nucleic acids, modified or
 * incomplete amino-acid residues). `pos` is present only when the residue has a
 * CA; symbols and disks, which need a coordinate, skip residues whose `pos` is
 * undefined.
 *
 * Non-polymer residues (waters, ligands, branched glycans) are skipped: they
 * have no label_seq_id, so they cannot be uniquely keyed by this scheme, and no
 * exporter spec references them.
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

            const chainId = StructureProperties.chain.label_asym_id(loc);
            const seqId   = StructureProperties.residue.label_seq_id(loc);

            // Only polymer residues have a label_seq_id (>= 1). Non-polymer
            // residues (waters, ligands, branched glycans) have none — Mol*
            // returns a non-positive sentinel — so they cannot be uniquely keyed
            // by chainId:seqId and would all collide on the same sentinel key,
            // leaving a color command resolving to whichever one was seen first.
            // The exporter's specs only ever reference polymer residues, so skip
            // anything without a valid label_seq_id rather than store colliding
            // entries. (This also makes the map honest: it holds polymer residues,
            // which is exactly what the label_seq_id-keyed specs can address.)
            if (!(seqId >= 1)) continue;

            const key     = molstar__read_structure_create_chimerax_file__ResidueKey(chainId, seqId);

            let entry = map.get(key);
            if (!entry) {
                // First atom seen for this residue. Record its AUTH identity now
                // (auth_asym_id / auth_seq_id / insertion code are residue-level
                // properties, identical for every atom in the residue) so that
                // color commands can resolve auth numbering even for residues
                // that have no CA atom. `pos` is filled in below when/if the CA
                // is encountered.
                const authAsymId = StructureProperties.chain.auth_asym_id(loc);
                const authSeqId  = StructureProperties.residue.auth_seq_id(loc);
                const rawInsCode = StructureProperties.residue.pdbx_PDB_ins_code(loc);
                const insCode    = rawInsCode ? rawInsCode.trim() : '';

                entry = { authAsymId, authSeqId, insCode };   // pos undefined until a CA is found
                map.set(key, entry);
            }

            // Record the CA coordinate for symbols/disks. First CA wins
            // (NMR/multi-model: only model 1 coordinates used).
            if (!entry.pos && StructureProperties.atom.label_atom_id(loc) === 'CA') {
                entry.pos = Vec3.create(
                    StructureProperties.atom.x(loc),
                    StructureProperties.atom.y(loc),
                    StructureProperties.atom.z(loc),
                );
            }
        }
    }

    return { map, warnings };
}
