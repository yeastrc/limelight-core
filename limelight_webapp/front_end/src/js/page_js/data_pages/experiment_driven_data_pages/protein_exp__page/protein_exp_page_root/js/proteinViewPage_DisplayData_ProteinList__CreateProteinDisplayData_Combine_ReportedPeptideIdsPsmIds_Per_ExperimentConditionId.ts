/**
 * proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Combine_ReportedPeptideIdsPsmIds_Per_ExperimentConditionId.ts
 *
 * Create Display Data for Protein List - Combine Reported Peptide Ids Peptide and PSM Ids per Project Search Id for the final displayed Protein List
 *
 *      Created since same Reported Peptide Ids Peptide and PSM Ids can be under multiple proteins
 *
 *      Used for computing total PSM and for downloads
 */


import {
    ProteinDisplayData_From_createProteinDisplayData_ProteinList,
    ProteinDataDisplay_ProteinList_Item,
    ProteinDataDisplay_ProteinList_Experiment_SubData,
    ProteinDataDisplay_ProteinList_Experiment_SubData_PerCondition,
    ProteinDataDisplay_ProteinList_Sub_Item
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {
    Experiment_Condition,
    Experiment_ConditionGroup, Experiment_ConditionGroupsContainer
} from "page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes";
import {
    Experiment_ConditionGroupsDataContainer,
    Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param
} from "page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class";
import {Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass} from "page_js/data_pages/experiment_data_pages_common/experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass";
import {
    create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
    ExperimentConditions_GraphicRepresentation_SelectedCells
} from "page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections";
import {ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_group";



/**
 *
 */
export const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Combine_ReportedPeptideIdsPsmIds_Per_ExperimentConditionId = function (
    {
        proteinDisplayData,
        conditions_with_their_project_search_ids_for_First_condition_group,
        conditionGroupsContainer,
        conditionGroupsDataContainer,
        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
    } : {
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
        conditions_with_their_project_search_ids_for_First_condition_group: Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
        conditionGroupsContainer : Experiment_ConditionGroupsContainer
        conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass

    }) : void {

    if ( proteinDisplayData.proteinList.length === 0 ) {
        // No entries to process
        return; // EARLY RETURN
    }

    if ( proteinDisplayData.proteinGroupsList ) {
        for (const proteinGroupItem of proteinDisplayData.proteinGroupsList) {

            _processProteinList({
                conditions_with_their_project_search_ids_for_First_condition_group,
                proteinList: proteinGroupItem.proteinList_Grouped
            });
        }
    } else {

        _processProteinList({
            conditions_with_their_project_search_ids_for_First_condition_group,
            proteinList: proteinDisplayData.proteinList
        });
    }

}

/**
 *
 */
const _processProteinList = function(
    {
        conditions_with_their_project_search_ids_for_First_condition_group,
        proteinList
    } : {
        conditions_with_their_project_search_ids_for_First_condition_group  : Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
        proteinList: Array<ProteinDataDisplay_ProteinList_Item>
    }) : void {

    _processProteinList_ProjectSearchId_Map({ conditions_with_their_project_search_ids_for_First_condition_group, proteinList });
}

/**
 *
 */
const _processProteinList_ProjectSearchId_Map = function(
    {
        conditions_with_their_project_search_ids_for_First_condition_group,
        proteinList
    } : {
        conditions_with_their_project_search_ids_for_First_condition_group  : Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
        proteinList: Array<ProteinDataDisplay_ProteinList_Item>
    }) : void {

    for (const proteinItem of proteinList) {

        // const proteinSequenceVersionId = proteinItem.proteinSequenceVersionId

        const experiment_SubData = new ProteinDataDisplay_ProteinList_Experiment_SubData();
        proteinItem.experiment_SubData = experiment_SubData;

        const experiment_SubData_PerCondition_Map_Key_ConditionId : Map<number, ProteinDataDisplay_ProteinList_Experiment_SubData_PerCondition> = experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId;

        for ( const condition of conditions_with_their_project_search_ids_for_First_condition_group ) {

            let numPsms = 0; // Accumulate for all searches in the condition
            const reportedPeptide_CommonValue_EncodedString_ForProtein_Set: Set<string> = new Set(); // Accumulate for all searches in the condition

            const protein_SubItem_Record_Map_Key_ProjectSearchId: Map<number, ProteinDataDisplay_ProteinList_Sub_Item> = new Map()

            for ( const projectSearchId of condition.projectSearchIds ) {

                const protein_SubItem_Record = proteinItem.protein_SubItem_Records_Map_Key_projectSearchId.get( projectSearchId );
                if ( ! protein_SubItem_Record ) {
                    //  No entry found so skip
                    continue; // EARLY CONTINUE
                }

                protein_SubItem_Record_Map_Key_ProjectSearchId.set( projectSearchId, protein_SubItem_Record );

                if ( protein_SubItem_Record.numPsms ) {
                    numPsms += protein_SubItem_Record.numPsms;
                }
                if ( protein_SubItem_Record.reportedPeptide_CommonValue_EncodedString_ForProtein_Set ) {
                    for ( const reportedPeptide_CommonValue_EncodedString of protein_SubItem_Record.reportedPeptide_CommonValue_EncodedString_ForProtein_Set ) {
                        reportedPeptide_CommonValue_EncodedString_ForProtein_Set.add( reportedPeptide_CommonValue_EncodedString );
                    }
                }
            }

            const experiment_SubData_ForCondition = new ProteinDataDisplay_ProteinList_Experiment_SubData_PerCondition();
            experiment_SubData_PerCondition_Map_Key_ConditionId.set( condition.condition.id, experiment_SubData_ForCondition );

            experiment_SubData_ForCondition.numPsms = numPsms;
            experiment_SubData_ForCondition.reportedPeptide_CommonValue_EncodedString_ForProtein_Set = reportedPeptide_CommonValue_EncodedString_ForProtein_Set;
            experiment_SubData_ForCondition.protein_SubItem_Record_Map_Key_ProjectSearchId = protein_SubItem_Record_Map_Key_ProjectSearchId;
        }
    }
}
