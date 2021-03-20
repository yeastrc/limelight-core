/**
 * proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent.ts
 * 
 * Protein Position Selection - Build Selected Entries Data for Component
 * 
 * Display Data used in: ProteinPositionFilter_UserSelectionsRoot....tsx
 */

import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {
    ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
    ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data_Entry
} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data";

const _PROTEIN_NAME_TRUNCATION = 20;

/**
 * 
 * 
 */
export const proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent = function(
    {
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
} : {
        projectSearchIds : Array<number>,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

    }) : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data {


    const proteinLengths_Map_Key_ProteinSequenceVersionId : Map<number, number> = new Map();
    const proteinNames_Set_Map_Key_ProteinSequenceVersionId : Map<number, Set<string>> = new Map();
    const proteinDescriptions_Set_Map_Key_ProteinSequenceVersionId : Map<number, Set<string>> = new Map();

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            const msg = "proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent: loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId ) return nothing. projectSearchId: " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }

        const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()

        const proteinSequenceVersionIdsUnique = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsUnique();

        for ( const proteinSequenceVersionId of proteinSequenceVersionIdsUnique ) {

            const proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
            if ( ! proteinInfo ) {
                const msg = "No value from loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId().get( proteinSequenceVersionId ). proteinSequenceVersionId: " + proteinSequenceVersionId;
                console.warn( msg );
                throw Error( msg );
            }

            {
                proteinLengths_Map_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinInfo.proteinLength );
            }

            {
                let proteinNames_Set = proteinNames_Set_Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
                if ( ! proteinNames_Set ) {
                    proteinNames_Set = new Set();
                    proteinNames_Set_Map_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId,  proteinNames_Set );
                }
                for ( const annotation of proteinInfo.annotations ) {
                    proteinNames_Set.add( annotation.name )
                }
            }
            {
                let proteinDescriptions_Set = proteinDescriptions_Set_Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
                if ( ! proteinDescriptions_Set ) {
                    proteinDescriptions_Set = new Set();
                    proteinDescriptions_Set_Map_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId,  proteinDescriptions_Set );
                }
                for ( const annotation of proteinInfo.annotations ) {
                    proteinDescriptions_Set.add( annotation.description )
                }
            }
        }
    }

    const proteins_Names_Lengths_Array : Array<ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data_Entry> = []
    const proteins_Names_Lengths_Map_Key_proteinSequenceVersionId : Map<number, ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data_Entry> = new Map()

    for ( const mapEntry of proteinNames_Set_Map_Key_ProteinSequenceVersionId.entries() ) {

        const proteinSequenceVersionId = mapEntry[ 0 ];
        const proteinNames_Set = mapEntry[ 1 ];

        const proteinLength = proteinLengths_Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );

        const proteinNames_Array = Array.from( proteinNames_Set );
        proteinNames_Array.sort();
        const proteinName = proteinNames_Array.join(", ");

        const proteinName_Truncated = proteinName.substring( 0, _PROTEIN_NAME_TRUNCATION );

        let proteinDescription = "";
        const proteinDescriptions_Set = proteinDescriptions_Set_Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
        if ( proteinDescriptions_Set ) {
            const proteinDescriptions_Array = Array.from( proteinDescriptions_Set );
            proteinDescriptions_Array.sort();
            proteinDescription = proteinDescriptions_Array.join(", ");
        }

        const proteins_Names_Lengths_Entry : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data_Entry = {
            proteinSequenceVersionId,
            proteinLength,
            proteinName,
            proteinName_Truncated,
            proteinDescription
        }

        proteins_Names_Lengths_Array.push( proteins_Names_Lengths_Entry );
        proteins_Names_Lengths_Map_Key_proteinSequenceVersionId.set( proteinSequenceVersionId, proteins_Names_Lengths_Entry );
    }

    proteins_Names_Lengths_Array.sort( (a,b) => {
        if ( a.proteinName < b.proteinName ) {
            return -1;
        }
        if ( a.proteinName > b.proteinName ) {
            return 1;
        }
        if ( a.proteinDescription < b.proteinDescription ) {
            return -1;
        }
        if ( a.proteinDescription > b.proteinDescription ) {
            return 1;
        }
        if ( a.proteinSequenceVersionId < b.proteinSequenceVersionId ) {
            return -1;
        }
        if ( a.proteinSequenceVersionId > b.proteinSequenceVersionId ) {
            return 1;
        }
        return 0;
    })

    const proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data = {
        proteins_Names_Lengths_Array,
        proteins_Names_Lengths_Map_Key_proteinSequenceVersionId
    }

    return proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data;
}
