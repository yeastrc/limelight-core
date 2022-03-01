/**
 * proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent.ts
 * 
 * Protein Position Selection - Build Selected Entries Data for Component
 * 
 * Display Data used in: ProteinPositionFilter_UserSelectionsRoot....tsx
 */

import {
    ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data";
import {
    ProteinPositionFilter_UserInput__Component__ProteinData_Root,
    ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein,
    ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein__SingleProteinNameDescription
} from "page_js/data_pages/common_components__react/protein_position_filter_component__not_single_protein/protein_position_filter__user_input_component/proteinPositionFilter_UserInput__Component__ProteinData";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";


/**
 * 
 * 
 */
export const proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent = async function(
    {
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} : {
        projectSearchIds : Array<number>,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    }) : Promise<ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data> {


    const proteinLengths_Map_Key_ProteinSequenceVersionId : Map<number, number> = new Map();
    const proteinNames_Set_Map_Key_ProteinSequenceVersionId : Map<number, Set<string>> = new Map();
    const proteinDescriptions_Set_Map_Key_ProteinSequenceVersionId : Map<number, Set<string>> = new Map();

    const proteinNameDescriptionForTooltip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein__SingleProteinNameDescription>> = new Map();

    for ( const projectSearchId of projectSearchIds ) {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId );
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            const msg = "proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent: commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ) return nothing. projectSearchId: " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }

        const get_ProteinInfoHolder_AllForSearch_ReturnPromise = await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters().get_ProteinInfoHolder_AllForSearch_ReturnPromise()
        const proteinInfo_For_MainFilters_Holder = get_ProteinInfoHolder_AllForSearch_ReturnPromise.proteinInfo_For_MainFilters_Holder

        const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise_Result =
            await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise()
        const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise_Result.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder

        for ( const proteinSequenceVersionId of proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinSequenceVersionIdsUnique() ) {

            const proteinInfo = proteinInfo_For_MainFilters_Holder.get_ProteinInfo_For_ProteinSequenceVersionId( proteinSequenceVersionId );
            if ( ! proteinInfo ) {
                const msg = "No value from proteinInfo_For_MainFilters_Holder.get_ProteinInfo_For_ProteinSequenceVersionId( proteinSequenceVersionId ). proteinSequenceVersionId: " + proteinSequenceVersionId;
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
