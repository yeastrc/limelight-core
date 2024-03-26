/**
 * proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_NSAF__Using_Adjusted_Spectral_Count_ABACUS__Per_ExperimentConditionId.ts
 */
import {
    ProteinDataDisplay_ProteinList_Experiment_SubData_PerCondition,
    ProteinDataDisplay_ProteinList_Item,
    ProteinDisplayData_From_createProteinDisplayData_ProteinList
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {
    ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_group";
import { NSAFAnnotationCalculator } from "page_js/data_pages/calculated_annotations/NSAF_annotation_calculator";


export const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_NSAF__Using_Adjusted_Spectral_Count_ABACUS__Per_ExperimentConditionId = function (
    {
        proteinDisplayData,
        conditions_with_their_project_search_ids_for_First_condition_group
    } : {
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
        conditions_with_their_project_search_ids_for_First_condition_group: Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>

    }) : void {

    if ( proteinDisplayData.proteinList.length === 0 ) {
        // No entries to process
        return; // EARLY RETURN
    }

    //  Get Data For Compute NSAF per Condition

    const proteinLength_Map_Key_ProteinSequenceVersionId: Map<number, number> = new Map();

    const adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId: Map<number, Map<number, number>> = new Map();

    if ( proteinDisplayData.proteinGroupsList ) {
        for (const proteinGroupItem of proteinDisplayData.proteinGroupsList) {

            _processProteinList_GetData_For_Compute_NSAF({
                conditions_with_their_project_search_ids_for_First_condition_group,
                proteinList: proteinGroupItem.proteinList_Grouped,
                proteinLength_Map_Key_ProteinSequenceVersionId,
                adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId
            });
        }
    } else {

        _processProteinList_GetData_For_Compute_NSAF({
            conditions_with_their_project_search_ids_for_First_condition_group,
            proteinList: proteinDisplayData.proteinList,
            proteinLength_Map_Key_ProteinSequenceVersionId,
            adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId
        });
    }

    //  Compute NSAF per Condition

    const nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId: Map<number, Map<number, number>> = new Map();

    for (const adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId_Entry of adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId.entries()) {

        const conditionId = adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId_Entry[0];
        const adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map = adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId_Entry[1];

        for ( const proteinSequenceVersionId of proteinLength_Map_Key_ProteinSequenceVersionId.keys() ) {
            if ( ! adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map.has( proteinSequenceVersionId ) ) {
                adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map.set( proteinSequenceVersionId, 0 );
            }
        }

        const nsaf_Map_Key_ProteinSequenceVersionId_Map: Map<number, number> =
            NSAFAnnotationCalculator.getNSAFAnnotations({
                proteinLengthMap: proteinLength_Map_Key_ProteinSequenceVersionId,
                proteinPsmCountMap: adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map
            });
        nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId.set(conditionId, nsaf_Map_Key_ProteinSequenceVersionId_Map);
    }

    //  Update Protein List with NSAF per Condition

    _processProteinList_Update_With_NSAF_Values({
        conditions_with_their_project_search_ids_for_First_condition_group,
        proteinList: proteinDisplayData.proteinList,
        nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId
    })

}

/**
 *
 */
const _processProteinList_GetData_For_Compute_NSAF = function(
    {
        conditions_with_their_project_search_ids_for_First_condition_group,
        proteinList,

        proteinLength_Map_Key_ProteinSequenceVersionId,
        adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId
    } : {
        conditions_with_their_project_search_ids_for_First_condition_group  : Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
        proteinList: Array<ProteinDataDisplay_ProteinList_Item>

        proteinLength_Map_Key_ProteinSequenceVersionId: Map<number, number>
        adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId: Map<number, Map<number, number>>

    }) : void {

    for (const proteinItem of proteinList) {

        const proteinSequenceVersionId = proteinItem.proteinSequenceVersionId
        const experiment_SubData = proteinItem.experiment_SubData;
        const experiment_SubData_PerCondition_Map_Key_ConditionId = experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId;

        //  Get Protein Length

        let proteinLength: number = undefined;

        if ( proteinItem.protein_SubItem_Records_Map_Key_projectSearchId ) {
            for (const protein_SubItem of proteinItem.protein_SubItem_Records_Map_Key_projectSearchId.values()) {
                proteinLength = protein_SubItem.proteinInfo.proteinLength;
                break;
            }
        }
        if ( proteinLength === undefined ) {
            const projectSearchIds = Array.from( proteinItem.protein_SubItem_Records_Map_Key_projectSearchId.keys() );
            const msg = "No entry in proteinItem.protein_SubItem_Records_Map_Key_projectSearchId for any of projectSearchIds: " + projectSearchIds.join(",");
            console.warn(msg);
            throw Error(msg);
        }

        proteinLength_Map_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinLength );


        //  Process Condition Data

        for ( const condition of conditions_with_their_project_search_ids_for_First_condition_group ) {

            let adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map = adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId.get(condition.condition.id);
            if ( ! adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map ) {
                adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map = new Map();
                adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId.set(condition.condition.id, adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map);
            }

            const experiment_SubData_ForCondition = experiment_SubData_PerCondition_Map_Key_ConditionId.get( condition.condition.id );
            if ( ! experiment_SubData_ForCondition ) {
                //  No Data so Set to Zero
                adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map.set(proteinSequenceVersionId, 0);

                continue;  //  EARLY CONTINUE
            }

            adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map.set(proteinSequenceVersionId, experiment_SubData_ForCondition.adjusted_Spectral_Count_ABACUS);
        }
    }
}


/**
 *
 */
const _processProteinList_Update_With_NSAF_Values = function(
    {
        conditions_with_their_project_search_ids_for_First_condition_group,
        proteinList,

        nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId
    } : {
        conditions_with_their_project_search_ids_for_First_condition_group  : Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
        proteinList: Array<ProteinDataDisplay_ProteinList_Item>

        nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId: Map<number, Map<number, number>>

    }) : void {

    for (const proteinItem of proteinList) {

        const proteinSequenceVersionId = proteinItem.proteinSequenceVersionId
        const experiment_SubData = proteinItem.experiment_SubData;

        const experiment_SubData_PerCondition_Map_Key_ConditionId : Map<number, ProteinDataDisplay_ProteinList_Experiment_SubData_PerCondition> = experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId;

        for ( const condition of conditions_with_their_project_search_ids_for_First_condition_group ) {

            const experiment_SubData_ForCondition = experiment_SubData_PerCondition_Map_Key_ConditionId.get( condition.condition.id );
            if ( ! experiment_SubData_ForCondition ) {
                //  No Data so skip

                continue;  //  EARLY CONTINUE
            }

            let nsaf_Map_Key_ProteinSequenceVersionId = nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId.get(condition.condition.id);
            if ( ! nsaf_Map_Key_ProteinSequenceVersionId ) {
                const msg = "NSAF Per Condition: No entry in nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_ConditionId for condition.id: " + condition.condition.id;
                console.warn(msg);
                throw Error(msg);
            }

            const nsaf = nsaf_Map_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId);
            if ( nsaf === undefined ) {
                const msg = "NSAF Per Search: No entry in nsaf_Map_Key_ProteinSequenceVersionId for proteinSequenceVersionId: " + proteinSequenceVersionId + ", condition.id: " + condition.condition.id;
                console.warn(msg);
                throw Error(msg);
            }

            experiment_SubData_ForCondition.nsaf__Using_Adjusted_Spectral_Count_ABACUS = nsaf;
        }
    }
}
