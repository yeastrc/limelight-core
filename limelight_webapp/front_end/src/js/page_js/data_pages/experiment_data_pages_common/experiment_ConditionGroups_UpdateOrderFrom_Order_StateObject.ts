/**
 * experiment_ConditionGroups_UpdateOrderFrom_Order_StateObject.ts
 */

import {
    Experiment_ConditionGroup,
    Experiment_ConditionGroupsContainer
} from "page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes";
import {
    Experiment_ConditionGroups_Order_CentralStateManagerObjectClass
} from "page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroups_Order_CentralStateManagerObjectClass";

/**
 *   Return in 'conditionGroupsContainer'
 * conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM
 *     OR
 * new shallow clone with new Array of condition groups in order requested in State object 'experiment_ConditionGroups_Order_CentralStateManagerObjectClass'
 */
export const experiment_ConditionGroups_UpdateOrderFrom_Order_StateObject = function (
    {
        experiment_ConditionGroups_Order_CentralStateManagerObjectClass, conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM
    } : {
        experiment_ConditionGroups_Order_CentralStateManagerObjectClass: Experiment_ConditionGroups_Order_CentralStateManagerObjectClass  //  Updated/Cleared when contents not match Condition Groups
        conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM: Experiment_ConditionGroupsContainer
    }
) : {
    conditionGroupsContainer: Experiment_ConditionGroupsContainer
    //    Return
    // conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM
    //    OR
    // new shallow clone with new Array of condition groups in order requested in State object
} {

    if ( ! experiment_ConditionGroups_Order_CentralStateManagerObjectClass.get_ConditionGroupIds_Order() ) {
        return {
            conditionGroupsContainer: conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM
        }
    }

    if ( experiment_ConditionGroups_Order_CentralStateManagerObjectClass.get_ConditionGroupIds_Order().length !== conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM.conditionGroups.length ) {

        //  Number of condition groups is not same as number of ids in order so clear and return unmodified

        //  Clear selection from State Object and URL
        experiment_ConditionGroups_Order_CentralStateManagerObjectClass.clearAll()  // UPDATE state object

        //  Return unmodified condition groups
        return {   // EARLY RETURN
            conditionGroupsContainer: conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM
        }
    }

    //  Put values in conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM in order for experiment_ConditionGroups_Order_CentralStateManagerObjectClass.get_ConditionGroupIds_Order()

    const conditionGroup_Map_Id: Map<number, Experiment_ConditionGroup> = new Map()

    for ( const conditionGroup of conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM.conditionGroups ) {
        conditionGroup_Map_Id.set( conditionGroup.id, conditionGroup )
    }

    const result_ConditionGroup_Array: Array<Experiment_ConditionGroup> = []

    for ( const id_InOrder of experiment_ConditionGroups_Order_CentralStateManagerObjectClass.get_ConditionGroupIds_Order() ) {
        const conditionGroup = conditionGroup_Map_Id.get( id_InOrder )
        if ( ! conditionGroup ) {
            //  NO Condition Group for id.  Condition Group Order no longer applies to current experiment so remove condition group order

            //  Clear selection from State Object and URL
            experiment_ConditionGroups_Order_CentralStateManagerObjectClass.clearAll()  // UPDATE state object

            //  Return unmodified condition groups
            return {   // EARLY RETURN
                conditionGroupsContainer: conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM
            }
        }

        conditionGroup_Map_Id.delete( id_InOrder )

        result_ConditionGroup_Array.push( conditionGroup )
    }

    if ( conditionGroup_Map_Id.size !== 0 ) {

        //  At least one condition group is not in ids so the ids in the groups NOT match the ids in the order so clear and return unmodified

        //  Clear selection from State Object and URL
        experiment_ConditionGroups_Order_CentralStateManagerObjectClass.clearAll()  // UPDATE state object

        //  Return unmodified condition groups
        return {   // EARLY RETURN
            conditionGroupsContainer: conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM
        }
    }

    const conditionGroupsContainer_New = conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM.cloneShallow()

    conditionGroupsContainer_New.conditionGroups = result_ConditionGroup_Array

    return {
        conditionGroupsContainer: conditionGroupsContainer_New
    }
}