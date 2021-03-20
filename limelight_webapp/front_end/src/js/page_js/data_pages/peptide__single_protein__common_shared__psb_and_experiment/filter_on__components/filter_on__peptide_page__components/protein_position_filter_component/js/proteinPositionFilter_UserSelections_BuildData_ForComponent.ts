/**
 * proteinPositionFilter_UserSelections_BuildData_ForComponent.ts
 *
 * Protein Position Selection - Build Selected Entries Data for Component
 * 
 * Display Data used in: ProteinPositionFilter_UserSelectionsRoot....tsx
 */

import {ProteinPositionFilter_UserSelections_StateObject_Wrapper} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject_Wrapper";
import {
    ProteinPositionFilter_UserSelections_ComponentData,
    ProteinPositionFilter_UserSelections_ComponentData_SelectionDisplay_Entry
} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_ComponentData";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "../../../../../project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {ProteinView_LoadedDataCommonHolder} from "../../../../../project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data";

/**
 * 
 * 
 */
export const proteinPositionFilter_UserSelections_BuildData_ForComponent = function(
    {
        proteinPositionFilter_UserSelections_StateObject_Wrapper,
        proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        loadedDataCommonHolder
    } : {
        proteinPositionFilter_UserSelections_StateObject_Wrapper : ProteinPositionFilter_UserSelections_StateObject_Wrapper
        proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder

    }) : ProteinPositionFilter_UserSelections_ComponentData {

    const proteinPosition_SelectionDisplay_Entries : Array<ProteinPositionFilter_UserSelections_ComponentData_SelectionDisplay_Entry> = [];

    const selections = proteinPositionFilter_UserSelections_StateObject_Wrapper.getSelections_Ranges();

    if ( selections ) {
        for ( const mapEntry of selections.entriesMap_Key_proteinSequenceVersionId.entries() ) {
            const per_proteinSequenceVersionId_Entry  = mapEntry[ 1 ];
            const proteinSequenceVersionId = per_proteinSequenceVersionId_Entry.proteinSequenceVersionId
            const proteins_Names_LengthsData = proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.proteins_Names_Lengths_Map_Key_proteinSequenceVersionId.get( proteinSequenceVersionId );
            if ( ! proteins_Names_LengthsData ) {
                const msg = "proteins_Names_Lengths_Map_Key_proteinSequenceVersionId.get( proteinSequenceVersionId ); returned nothing for proteinSequenceVersionId: ";
                console.warn( msg, proteinSequenceVersionId )
                throw Error( msg + proteinSequenceVersionId )
            }
            if ( per_proteinSequenceVersionId_Entry.fullProteinSelected ) {
                const resultEntry: ProteinPositionFilter_UserSelections_ComponentData_SelectionDisplay_Entry = {
                    proteinSequenceVersionId,
                    proteinName: proteins_Names_LengthsData.proteinName,
                    proteinName_Truncated: proteins_Names_LengthsData.proteinName_Truncated,
                    proteinDescription: proteins_Names_LengthsData.proteinDescription,
                    proteinFullLengthSelected: true,
                    proteinPosition_Start: 1,
                    proteinPosition_End: proteins_Names_LengthsData.proteinLength,
                }
                proteinPosition_SelectionDisplay_Entries.push(resultEntry);
            }
            if ( per_proteinSequenceVersionId_Entry.rangeEntries ) {
                for ( const entry_For_ProteinSequenceVersionId of per_proteinSequenceVersionId_Entry.rangeEntries ) {
                    const resultEntry: ProteinPositionFilter_UserSelections_ComponentData_SelectionDisplay_Entry = {
                        proteinSequenceVersionId,
                        proteinName: proteins_Names_LengthsData.proteinName,
                        proteinName_Truncated: proteins_Names_LengthsData.proteinName_Truncated,
                        proteinDescription: proteins_Names_LengthsData.proteinDescription,
                        proteinPosition_Start: entry_For_ProteinSequenceVersionId.proteinPosition_Start,
                        proteinPosition_End: entry_For_ProteinSequenceVersionId.proteinPosition_End,
                        proteinFullLengthSelected: false
                    }
                    proteinPosition_SelectionDisplay_Entries.push(resultEntry);
                }
            }
        }
        proteinPosition_SelectionDisplay_Entries.sort( (a,b) => {
            if ( a.proteinName < b.proteinName ) {
                return -1;
            }
            if ( a.proteinName > b.proteinName ) {
                return 1;
            }
            if ( a.proteinSequenceVersionId < b.proteinSequenceVersionId ) {
                return -1;
            }
            if ( a.proteinSequenceVersionId > b.proteinSequenceVersionId ) {
                return 1;
            }
            if ( a.proteinPosition_Start < b.proteinPosition_Start ) {
                return -1;
            }
            if ( a.proteinPosition_Start > b.proteinPosition_Start ) {
                return 1;
            }
            return 0;
        })
    }

    return {
        proteinPosition_SelectionDisplay_Entries
    };
}
