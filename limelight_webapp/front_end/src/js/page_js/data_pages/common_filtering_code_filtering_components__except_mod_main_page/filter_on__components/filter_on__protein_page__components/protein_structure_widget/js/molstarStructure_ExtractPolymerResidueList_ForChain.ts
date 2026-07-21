/**
 * molstarStructure_ExtractPolymerResidueList_ForChain.ts
 *
 * Walk Mol*'s parsed atomic hierarchy for a single polymer chain (by label_asym_id) and return its
 * residues IN ORDER, each carrying the identifiers needed to map Limelight-protein positions to the
 * structure ROBUSTLY:
 *
 *   - residueIndex : the residue's index in Mol*'s atomic hierarchy. UNIQUE by construction. Used for
 *                    point placement (findAtomOnResidue) and as the reverse-lookup key. This is the
 *                    "always correct" anchor.
 *   - auth_seq_id  : the authored residue number (PDB ATOM resSeq). Always present. Used for
 *                    property-based Mol* selections / ChimeraX export / numbering-adjacency.
 *   - label_seq_id : the mmCIF polymer number, or null when undefined (e.g. a PDB with neither SEQRES
 *                    nor insertion codes -> Mol* leaves label_seq_id undefined).
 *
 * This deliberately does NOT use `structure.model.sequence` (the letters-only handle the widget used
 * historically), which has three quirks that make its ordinal an unsafe structure key: it is
 * entity-keyed (represents the entity's FIRST chain -> wrong residues for a homo-oligomer's other
 * copy), it collapses microheterogeneity, and it degenerates to length 1 when label_seq_id is
 * undefined. Walking the hierarchy per chain sidesteps all three.
 *
 * See limelight_features_docs/protein_structure_sequence_mapping_rewrite.md
 */

import { Structure, StructureElement, StructureProperties } from "molstar/lib/mol-model/structure";
import { Column } from "molstar/lib/mol-data/db";
import { getProteinOneLetterCode } from "molstar/lib/mol-model/sequence/constants";

/**
 * One residue of a polymer chain, in chain order.
 */
export interface molstarStructure_ExtractPolymerResidueList_ForChain__ResidueEntry {

    /** Index of this residue in Mol*'s parsed atomic hierarchy. UNIQUE. Anchor for placement. */
    readonly residueIndex: number

    /** One-letter residue code (getProteinOneLetterCode; 'X' for unknown / non-standard). */
    readonly oneLetter: string

    /** auth_seq_id (author residue number). Always present. */
    readonly auth_seq_id: number

    /** label_seq_id, or null when undefined for this residue. */
    readonly label_seq_id: number | null

    /** pdbx_PDB_ins_code ('' when none). */
    readonly ins_code: string
}

/**
 * @param structure - loaded Mol* Structure
 * @param chainLabelAsymId - the chain's label_asym_id (== chainId_Label_AssignedAt_StructureFileCreation)
 * @returns the chain's polymer residues in order, or null if no polymer chain has that label_asym_id.
 */
export function molstarStructure_ExtractPolymerResidueList_ForChain(
    structure: Structure,
    chainLabelAsymId: string
): Array<molstarStructure_ExtractPolymerResidueList_ForChain__ResidueEntry> | null {

    const hierarchy = structure.model.atomicHierarchy;
    const chains = hierarchy.chains;
    const residues = hierarchy.residues;
    const atoms = hierarchy.atoms;
    const chainAtomSegments = hierarchy.chainAtomSegments;
    const residueAtomSegments = hierarchy.residueAtomSegments;
    const entities = structure.model.entities;

    const chainCount = chains._rowCount;

    for ( let chainIndex = 0; chainIndex < chainCount; chainIndex++ ) {

        if ( chains.label_asym_id.value( chainIndex ) !== chainLabelAsymId ) {
            continue;
        }

        //  Polymer only (mirrors model.sequence, which is polymer-per-entity). A label_asym_id maps
        //  to a single entity, so testing the chain's entity type is sufficient. Look the entity up by
        //  the asym-id string (findEntity) rather than by the chain's branded ChainIndex -- returns a
        //  properly-typed EntityIndex with no cast (the loop counter is a plain number, not a ChainIndex).
        const entityIndex = hierarchy.index.findEntity( chainLabelAsymId );
        if ( entities.data.type.value( entityIndex ) !== 'polymer' ) {
            return null;
        }

        const atomStart = chainAtomSegments.offsets[ chainIndex ];
        const atomEndExclusive = chainAtomSegments.offsets[ chainIndex + 1 ];

        const residueStart = residueAtomSegments.index[ atomStart ];
        const residueEndExclusive = residueAtomSegments.index[ atomEndExclusive - 1 ] + 1;

        const result: Array<molstarStructure_ExtractPolymerResidueList_ForChain__ResidueEntry> = [];

        for ( let residueIndex = residueStart; residueIndex < residueEndExclusive; residueIndex++ ) {

            const firstAtomIndex = residueAtomSegments.offsets[ residueIndex ];
            const comp = atoms.label_comp_id.value( firstAtomIndex );
            const oneLetter = getProteinOneLetterCode( comp );

            const label_seq_id_Present = residues.label_seq_id.valueKind( residueIndex ) === Column.ValueKind.Present;
            const label_seq_id = label_seq_id_Present ? residues.label_seq_id.value( residueIndex ) : null;

            result.push( {
                residueIndex,
                oneLetter,
                auth_seq_id: residues.auth_seq_id.value( residueIndex ),
                label_seq_id,
                ins_code: residues.pdbx_PDB_ins_code.value( residueIndex )
            } );
        }

        return result;
    }

    return null;
}

/**
 * The 1-based structure ORDINAL (position within the chain's residues) of the residue at a
 * StructureElement.Location -- i.e. the value the alignment maps are keyed on, NOT label_seq_id.
 *
 * Cheap (O(chains), no per-residue allocation) so it is safe on the hover hot path. Returns undefined
 * if the location's residue is not in a resolvable chain. Assumes the chain is a single contiguous
 * residue range (true for a polymer chain), consistent with molstarStructure_ExtractPolymerResidueList_ForChain.
 */
export function molstarStructure_ExtractPolymerResidueList_ForChain__OrdinalForLocation(
    location: StructureElement.Location
): number | undefined {

    const structure = location.structure;
    const hierarchy = structure.model.atomicHierarchy;
    const chains = hierarchy.chains;
    const chainAtomSegments = hierarchy.chainAtomSegments;
    const residueAtomSegments = hierarchy.residueAtomSegments;

    const chainLabelAsymId = StructureProperties.chain.label_asym_id( location );
    const residueIndex = residueAtomSegments.index[ location.element ];

    const chainCount = chains._rowCount;

    for ( let chainIndex = 0; chainIndex < chainCount; chainIndex++ ) {

        if ( chains.label_asym_id.value( chainIndex ) !== chainLabelAsymId ) {
            continue;
        }

        //  Polymer only, consistent with molstarStructure_ExtractPolymerResidueList_ForChain (which returns
        //  null for non-polymer chains). A non-polymer hover (e.g. a ligand) yields no structure ordinal.
        const entityIndex = hierarchy.index.findEntity( chainLabelAsymId );
        if ( structure.model.entities.data.type.value( entityIndex ) !== 'polymer' ) {
            return undefined;
        }

        const firstResidueIndex = residueAtomSegments.index[ chainAtomSegments.offsets[ chainIndex ] ];
        const lastResidueIndex_Exclusive = residueAtomSegments.index[ chainAtomSegments.offsets[ chainIndex + 1 ] - 1 ] + 1;

        if ( residueIndex < firstResidueIndex || residueIndex >= lastResidueIndex_Exclusive ) {
            return undefined;
        }

        return residueIndex - firstResidueIndex + 1;
    }

    return undefined;
}
