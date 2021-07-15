/**
 * proteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_group.ts
 *
 * Create Display Data for Protein List - List of Conditions and their Project Search Ids
 *
 *      Filter on Currently selected Conditions, if applicable
 *
 */


import {
    Experiment_Condition,
    Experiment_ConditionGroup,
    Experiment_ConditionGroupsContainer
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



/**
 *
 */
export class ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry  {
    condition : Experiment_Condition
    projectSearchIds : Set<number>
}

////////

/**
 * Create conditions for first condition group with their project search ids
 */
export const proteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_group = function(
    {
        conditionGroup, conditionGroupsContainer, conditionGroupsDataContainer, experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
    } : {
        conditionGroup : Experiment_ConditionGroup
        conditionGroupsContainer : Experiment_ConditionGroupsContainer
        conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass

    }) : Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry> {

    const experimentConditions_GraphicRepresentation_SelectedCells : ExperimentConditions_GraphicRepresentation_SelectedCells = (
        create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass({
            experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
            conditionGroupsContainer
        })
    );

    const conditions = conditionGroup.conditions;

    //  Accumulate projectSearchIds Per id_Condition

    const conditionIds_For_ConditionGroup : Set<number> = new Set();

    for ( const condition of conditions ) {

        const condition_id = condition.id;
        conditionIds_For_ConditionGroup.add( condition_id );
    }

    //  Map<Int, Set>  Map<[id_Condition],Set([projectSearchIds]).  Contents restricted to conditionIds_For_ConditionGroup
    const projectSearchIds_Map_Key_id_Condition : Map<number, Set<number>> = new Map();

    // const projectSearchIds_All = new Set();

    const processAllDataEntries_Callback = ( param : Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param ) => {

        const conditionIds_Path = param.conditionIds_Path;
        const data = param.data;

        // console.log( ": callback: data:" );
        // console.log( data );
        const dataProperty = data.data;
        if ( dataProperty ) {
            const projectSearchIds = dataProperty.projectSearchIds;
            if ( projectSearchIds && projectSearchIds.size !== 0 ) {

                for ( const conditionIds_Path_Entry of conditionIds_Path ) {

                    if ( conditionIds_For_ConditionGroup.has( conditionIds_Path_Entry ) ) {
                        //  have entry for ConditionGroup collecting data for
                        const id_Condition = conditionIds_Path_Entry;
                        let projectSearchIds_For_id_Condition = projectSearchIds_Map_Key_id_Condition.get( id_Condition );
                        if ( ! projectSearchIds_For_id_Condition ) {
                            projectSearchIds_For_id_Condition = new Set();
                            projectSearchIds_Map_Key_id_Condition.set( id_Condition, projectSearchIds_For_id_Condition );
                        }
                        for ( const projectSearchId of projectSearchIds ) {
                            projectSearchIds_For_id_Condition.add( projectSearchId );
                        }
                    }
                }
            }
        }
    }
    conditionGroupsDataContainer.processAllDataEntries_ForSelectedConditionIds_ConditionGroupsDataContainer({
        callback : processAllDataEntries_Callback, experimentConditions_GraphicRepresentation_SelectedCells, conditionGroupsContainer
    });


    //  Array of each condition with it's projectSearchIds

    const result = [];

    for ( const condition of conditions ) {

        const id_Condition = condition.id;

        const projectSearchIds_For_id_Condition  = projectSearchIds_Map_Key_id_Condition.get( id_Condition );

        if ( projectSearchIds_For_id_Condition ) {

            const resultEntry = {
                condition,
                projectSearchIds : projectSearchIds_For_id_Condition
            }
            result.push( resultEntry );
        }
    }

    // console.log( "_create_conditions_with_their_project_search_ids_for_condition_group: result: ", result )

    return result;
}

