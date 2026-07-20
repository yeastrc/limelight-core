/**
 * ProteinStructure_ResolvedChainMapping.ts
 *
 * Render-time mapping between Limelight-protein positions and REAL structure residues for one chain.
 *
 * The persisted alignment (in the DAO entry) only stores two gap-padded letter strings, and its
 * public accessors speak in "structure ordinals" (1-based count of non-gap characters in the aligned
 * structure sequence). An ordinal is a pure POSITION and is NOT a structure residue number -- using it
 * as a label_seq_id is the historical bug.
 *
 * This class joins the DAO's Limelight-pos <-> ordinal maps to the LIVE structure's per-chain residue
 * list (molstarStructure_ExtractPolymerResidueList_ForChain), so every mapped Limelight position
 * resolves to a real residue carrying:
 *   - residueIndex  (unique; used for point placement -- the "always correct" anchor)
 *   - auth_seq_id   (property selections / ChimeraX export / numbering-adjacency)
 *   - label_seq_id  (property selections when defined)
 *
 * FAIL LOUD: the constructor throws if the live chain's residue letters do not equal the saved aligned
 * structure sequence (de-gapped). An alignment is bound to an immutable structure file, so this only
 * trips on a Mol* parse change (e.g. a library upgrade) -- in which case we refuse to map rather than
 * silently place markers on the wrong residues.
 *
 * See limelight_features_docs/protein_structure_sequence_mapping_rewrite.md
 */

import { Structure } from "molstar/lib/mol-model/structure";

import {
    molstarStructure_ExtractPolymerResidueList_ForChain,
    molstarStructure_ExtractPolymerResidueList_ForChain__ResidueEntry
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_structure_widget/js/molstarStructure_ExtractPolymerResidueList_ForChain";

import { CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value } from "page_js/data_pages/common_data_loaded_from_server__project_level_data/common_data_loaded_from_server__project_level_data__structure_file_data/CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO";

const _ALIGNMENT_FILLER_CHARACTER = "-";

/**
 * Thrown by the constructor when a valid mapping cannot be built for a chain -- either the live
 * structure has no such polymer chain, or (the fail-loud guard) the live chain sequence does not match
 * the saved alignment. Both mean the saved alignment can no longer be applied to this structure; the
 * user-facing fix is to delete the alignment and create a new one.
 */
export class ProteinStructure_ResolvedChainMapping__MismatchError extends Error {

    readonly chainLabelAsymId: string;

    constructor( chainLabelAsymId: string, message: string ) {
        super( message );
        this.name = "ProteinStructure_ResolvedChainMapping__MismatchError";
        this.chainLabelAsymId = chainLabelAsymId;
    }
}

/**
 * One resolved structure residue (re-exported shape from the extraction helper).
 */
export type ProteinStructure_ResolvedChainMapping__StructureResidue =
    molstarStructure_ExtractPolymerResidueList_ForChain__ResidueEntry;

export class ProteinStructure_ResolvedChainMapping {

    /** Ordered polymer residues of this chain. ordinal N (1-based) === _residueList[ N - 1 ]. */
    private readonly _residueList: Array<molstarStructure_ExtractPolymerResidueList_ForChain__ResidueEntry>;

    private readonly _alignmentEntry: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value;

    /** residueIndex -> Limelight protein position (1-based), for residues that map. */
    private readonly _residueIndex_To_LimelightPosition: Map<number, number> = new Map();

    /**
     * True if this chain's residues carry a defined label_seq_id (mmCIF, or PDB with SEQRES/insertion
     * codes) -> property-based Mol* selections use label_seq_id (unique per chain, even with insertion
     * codes). False in the one edge (PDB with neither SEQRES nor insertion codes) -> label_seq_id is
     * undefined, so selections use auth_seq_id (unique there, since that edge has no insertion codes).
     * Uniform per chain.
     */
    readonly selectionUsesLabelSeqId: boolean;

    /**
     * @throws Error if no polymer chain with chainLabelAsymId, or (FAIL LOUD) if the live chain's
     *         residue letters do not match the saved aligned structure sequence.
     */
    constructor(
        {
            structure,
            chainLabelAsymId,
            alignmentEntry
        }: {
            structure: Structure;
            chainLabelAsymId: string;
            alignmentEntry: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value;
        }
    ) {
        const residueList = molstarStructure_ExtractPolymerResidueList_ForChain( structure, chainLabelAsymId );
        if ( ! residueList ) {
            const msg = "ProteinStructure_ResolvedChainMapping: no polymer chain for label_asym_id '" + chainLabelAsymId + "'";
            console.warn( msg );
            throw new ProteinStructure_ResolvedChainMapping__MismatchError( chainLabelAsymId, msg );
        }

        //  FAIL LOUD guard: the live chain's letters must equal the saved aligned structure sequence (de-gapped)
        const savedStructureSequence = alignmentEntry.structureFile_AlignedSequence.split( _ALIGNMENT_FILLER_CHARACTER ).join( "" );
        const derivedStructureSequence = residueList.map( ( r ) => r.oneLetter ).join( "" );

        if ( savedStructureSequence !== derivedStructureSequence ) {
            const msg = "ProteinStructure_ResolvedChainMapping FAIL LOUD: live structure chain sequence does NOT match saved alignment for label_asym_id '"
                + chainLabelAsymId + "'. Refusing to map (would place markers on wrong residues)."
                + " saved(len " + savedStructureSequence.length + "): " + savedStructureSequence
                + " derived(len " + derivedStructureSequence.length + "): " + derivedStructureSequence;
            console.warn( msg );
            throw new ProteinStructure_ResolvedChainMapping__MismatchError( chainLabelAsymId, msg );
        }

        this._residueList = residueList;
        this._alignmentEntry = alignmentEntry;
        this.selectionUsesLabelSeqId = ( residueList.length > 0 ) && ( residueList[ 0 ].label_seq_id !== null );

        //  Build residueIndex -> Limelight position for the reverse (hover / by-residue) lookups
        for ( let ordinal_OneBased = 1; ordinal_OneBased <= residueList.length; ordinal_OneBased++ ) {
            const limelightPosition = alignmentEntry.get__limelightProteinSequence_Position__FOR__structureFile_AlignedSequence_Position( ordinal_OneBased );
            if ( limelightPosition !== undefined && limelightPosition !== null ) {
                this._residueIndex_To_LimelightPosition.set( residueList[ ordinal_OneBased - 1 ].residueIndex, limelightPosition );
            }
        }
    }

    /** Number of polymer residues in the chain (== max structure ordinal). */
    get residueCount(): number {
        return this._residueList.length;
    }

    /**
     * FORWARD: Limelight protein position (1-based) -> the structure residue it aligns to, or undefined.
     */
    get_StructureResidue_ForLimelightPosition(
        limelightProteinPosition: number
    ): molstarStructure_ExtractPolymerResidueList_ForChain__ResidueEntry | undefined {

        const ordinal_OneBased = this._alignmentEntry.get__structureFile_AlignedSequence_Position__FOR__limelightProteinSequence_Position( limelightProteinPosition );
        if ( ordinal_OneBased === undefined || ordinal_OneBased === null ) {
            return undefined;
        }
        return this._residueList[ ordinal_OneBased - 1 ];
    }

    /**
     * The structure residue at a 1-based ordinal (position in the aligned structure sequence), or undefined.
     */
    get_StructureResidue_ForOrdinal(
        ordinal_OneBased: number
    ): molstarStructure_ExtractPolymerResidueList_ForChain__ResidueEntry | undefined {

        if ( ordinal_OneBased < 1 || ordinal_OneBased > this._residueList.length ) {
            return undefined;
        }
        return this._residueList[ ordinal_OneBased - 1 ];
    }

    /**
     * REVERSE (ordinal-driven, e.g. coloring loop): Limelight position for a 1-based ordinal, or undefined.
     */
    get_LimelightPosition_ForOrdinal( ordinal_OneBased: number ): number | undefined {
        const limelightPosition = this._alignmentEntry.get__limelightProteinSequence_Position__FOR__structureFile_AlignedSequence_Position( ordinal_OneBased );
        if ( limelightPosition === undefined || limelightPosition === null ) {
            return undefined;
        }
        return limelightPosition;
    }

    /**
     * REVERSE (residue-driven, e.g. hover): Limelight position for a residueIndex, or undefined.
     */
    get_LimelightPosition_ForResidueIndex( residueIndex: number ): number | undefined {
        return this._residueIndex_To_LimelightPosition.get( residueIndex );
    }

    /**
     * residueIndex -> 1-based structure ordinal (position in the aligned structure sequence), or
     * undefined if the residueIndex is not one of this chain's polymer residues. A chain's polymer
     * residues occupy a contiguous residueIndex range, so ordinal === residueIndex - firstResidueIndex + 1;
     * the result is verified against the residue list before returning.
     */
    get_Ordinal_ForResidueIndex( residueIndex: number ): number | undefined {
        if ( this._residueList.length === 0 ) {
            return undefined;
        }
        const ordinal_OneBased = residueIndex - this._residueList[ 0 ].residueIndex + 1;
        if ( ordinal_OneBased < 1 || ordinal_OneBased > this._residueList.length ) {
            return undefined;
        }
        if ( this._residueList[ ordinal_OneBased - 1 ].residueIndex !== residueIndex ) {
            return undefined;
        }
        return ordinal_OneBased;
    }
}
