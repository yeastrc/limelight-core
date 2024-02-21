/**
 * experiment_SelectedConditionIdsAndPaths_Clear_CentralStateManagerObject_If_AnySelection_NOT_Found_InExperiment.ts
 */

import {
    Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
} from "page_js/data_pages/experiment_data_pages_common/experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass";
import {
    Experiment_ConditionGroupsContainer
} from "page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes";

/**
 *
 */
export const experiment_SelectedConditionIdsAndPaths_Clear_CentralStateManagerObject_If_AnySelection_NOT_Found_InExperiment = function (
    {
        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass, conditionGroupsContainer
    } : {
        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass  //  Updated
        conditionGroupsContainer: Experiment_ConditionGroupsContainer
    }
) : {
    cleared_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass: boolean
} {

    if ( conditionGroupsContainer.conditionGroups.length === 0 ) {

        //  NO condition groups so clear selections.  Not expected.

        if ( ( experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.get_selectedConditionIds_First_ConditionGroup()
                && experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.get_selectedConditionIds_First_ConditionGroup().size > 0 )
            ||  ( experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.get_selectedConditionIdPaths_OtherThan_First_ConditionGroup()
                && experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.get_selectedConditionIdPaths_OtherThan_First_ConditionGroup().length > 0 )
        ) {
            experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.clear_All_ConditionSelection_Entries()

            return { cleared_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass: true } // EARLY RETURN
        }
    }

    //  First Condition Group

    if  ( experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.get_selectedConditionIds_First_ConditionGroup()
        && experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.get_selectedConditionIds_First_ConditionGroup().size > 0 ) {

        const conditionGroup_First__ConditionGroupIds_Set = new Set()

        for ( const condition of conditionGroupsContainer.conditionGroups[ 0 ].conditions) {
            conditionGroup_First__ConditionGroupIds_Set.add( condition.id )
        }

        for ( const selectedConditionId of experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.get_selectedConditionIds_First_ConditionGroup() ) {
            if ( ! conditionGroup_First__ConditionGroupIds_Set.has( selectedConditionId ) ) {

                experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.clear_All_ConditionSelection_Entries()

                return { cleared_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass: true } // EARLY RETURN
            }
        }
    }

    if ( ( ! experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.get_selectedConditionIdPaths_OtherThan_First_ConditionGroup() )
        || experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.get_selectedConditionIdPaths_OtherThan_First_ConditionGroup().length === 0 ) {

        //  NO other than First Condition Group Selections so return

        return { cleared_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass: false } // EARLY RETURN
    }

    //  Other than first condition group

    //  selection is a path of conditions starting at second condition group

    experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.get_selectedConditionIdPaths_OtherThan_First_ConditionGroup().length

    for ( const selectedConditionIdPath of experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.get_selectedConditionIdPaths_OtherThan_First_ConditionGroup() ) {

        for ( let selectedConditionIdPath_Index = 0; selectedConditionIdPath_Index < selectedConditionIdPath.length; selectedConditionIdPath_Index++ ) {

            const conditionGroup_Index = selectedConditionIdPath_Index + 1;  // start at second condition group

            if ( conditionGroup_Index >= conditionGroupsContainer.conditionGroups.length ) {

                //  conditionGroup_Index NOT IN conditionGroupsContainer.conditionGroups array so exit
                experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.clear_All_ConditionSelection_Entries()

                return { cleared_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass: true } // EARLY RETURN
            }

            const selectedConditionId_InPath_Entry = selectedConditionIdPath[ selectedConditionIdPath_Index ]
            const conditionGroup_InPath = conditionGroupsContainer.conditionGroups[ conditionGroup_Index ]

            let found_selectedConditionId_InPath_Entry = false

            for ( const condition of conditionGroup_InPath.conditions ) {
                if ( condition.id === selectedConditionId_InPath_Entry ) {
                    found_selectedConditionId_InPath_Entry = true
                    break
                }
            }

            if ( ! found_selectedConditionId_InPath_Entry ) {

                //  selectedConditionId_InPath_Entry NOT IN conditionGroup_InPath.conditions array so exit
                experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.clear_All_ConditionSelection_Entries()

                return { cleared_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass: true } // EARLY RETURN
            }
        }
    }

}