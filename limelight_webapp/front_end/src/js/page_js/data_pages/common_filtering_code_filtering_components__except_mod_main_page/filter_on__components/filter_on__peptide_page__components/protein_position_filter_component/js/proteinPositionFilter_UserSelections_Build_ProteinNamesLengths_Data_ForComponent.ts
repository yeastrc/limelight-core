/**
 * proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent.ts
 * 
 * Protein Position Selection - Build Selected Entries Data for Component
 * 
 * Display Data used in: ProteinPositionFilter_UserSelectionsRoot....tsx
 */

import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {
    ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data";
import {
    ProteinPositionFilter_UserInput__Component__ProteinData_Root,
    ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein,
    ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein__SingleProteinNameDescription
} from "page_js/data_pages/common_components__react/protein_position_filter_component__not_single_protein/protein_position_filter__user_input_component/proteinPositionFilter_UserInput__Component__ProteinData";


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

    const proteinNameDescriptionForTooltip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein__SingleProteinNameDescription>> = new Map();

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
            {
                const annotations = proteinInfo.annotations;
                if (annotations) {

                    let proteinNameDescriptionForTooltip_Array = proteinNameDescriptionForTooltip_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId);
                    if (!proteinNameDescriptionForTooltip_Array) {
                        proteinNameDescriptionForTooltip_Array = new Array();
                        proteinNameDescriptionForTooltip_Key_ProteinSequenceVersionId.set(proteinSequenceVersionId, proteinNameDescriptionForTooltip_Array);
                    }

                    for (const annotation of annotations) {

                        const annotation_name = annotation.name;
                        const annotation_description = annotation.description;

                        const proteinNameDescriptionForTooltip: ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein__SingleProteinNameDescription = {
                            name: annotation_name,
                            description: annotation_description
                        };
                        //  Only add to proteinNamesAndDescriptionsArray if combination of name and description is not already in array
                        let nameDescriptionComboFoundInArray = false;
                        for (const entry of proteinNameDescriptionForTooltip_Array) {
                            if (entry.name === proteinNameDescriptionForTooltip.name && entry.description === proteinNameDescriptionForTooltip.description) {
                                nameDescriptionComboFoundInArray = true;
                                break;
                            }
                        }
                        if (!nameDescriptionComboFoundInArray) {
                            proteinNameDescriptionForTooltip_Array.push(proteinNameDescriptionForTooltip);
                        }
                    }
                }
            }
        }
    }

    //////

    //  Convert internal Map contents to results

    const result_proteins: Array<ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein> = [];

    for ( const mapEntry of proteinNames_Set_Map_Key_ProteinSequenceVersionId.entries() ) {

        const proteinSequenceVersionId = mapEntry[ 0 ];
        const proteinNames_Set = mapEntry[ 1 ];

        const proteinLength = proteinLengths_Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );

        const proteinNames_Array = Array.from( proteinNames_Set );
        proteinNames_Array.sort();
        const proteinName = proteinNames_Array.join(", ");

        let proteinDescription = "";
        const proteinDescriptions_Set = proteinDescriptions_Set_Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
        if ( proteinDescriptions_Set ) {
            const proteinDescriptions_Array = Array.from( proteinDescriptions_Set );
            proteinDescriptions_Array.sort();
            proteinDescription = proteinDescriptions_Array.join(", ");
        }

        const proteinNameDescriptionForTooltip_Entries: Array<ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein__SingleProteinNameDescription> =
            proteinNameDescriptionForTooltip_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
        if ( ! proteinNameDescriptionForTooltip_Entries ) {
            const msg = "ERROR: proteinNameDescriptionForTooltip_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId ); returned Nothing for final assembly. proteinSequenceVersionId: " + proteinSequenceVersionId;
            console.warn(msg);
            throw Error(msg);
        }
        proteinNameDescriptionForTooltip_Entries.sort( ( a,b ) : number => {
            if ( a.name < b.name ) {
                return -1;
            }
            if ( a.name > b.name ) {
                return 1;
            }
            if ( a.description < b.description ) {
                return -1;
            }
            if ( a.description > b.description ) {
                return 1;
            }
            return 0;
        });

        const proteinData_SingleProtein : ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein = {
            proteinSequenceVersionId,
            proteinLength,
            proteinName,
            proteinDescription,
            proteinNameDescriptionForTooltip_Entries
        }

        result_proteins.push( proteinData_SingleProtein );
    }

    result_proteins.sort( (a,b) => {
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
    });

    const proteinPositionFilter_UserInput__Component__ProteinData_Root: ProteinPositionFilter_UserInput__Component__ProteinData_Root = {
        proteins: result_proteins
    }

    const proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data = {
        proteinPositionFilter_UserInput__Component__ProteinData_Root
    }

    return proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data;
}
