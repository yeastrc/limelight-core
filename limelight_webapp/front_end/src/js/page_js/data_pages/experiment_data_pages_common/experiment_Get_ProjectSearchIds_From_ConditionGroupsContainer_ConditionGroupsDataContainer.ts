/**
 * experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer.ts
 *
 */

import {
    Experiment_ConditionGroupsDataContainer,
    Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param
} from "./experiment_conditionGroupsDataContainer_Class";
import {
    Experiment_ConditionGroup,
    Experiment_ConditionGroupsContainer
} from "./experiment_ConditionGroupsContainer_AndChildren_Classes";

/**
 *
 */
export class Experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer {

    /**
     * Get ProjectSearchIds Grouped By Condition Ids in First ConditionGroup
     *
     * @param conditionGroupsContainer
     * @param conditionGroupsDataContainer
     * @return Map<condition id,Set<project search id>>  -- Map<number,Set<number>>
     */
    static getProjectSearchIds_For_First_ConditionGroup(
        {
            conditionGroupsContainer,
            conditionGroupsDataContainer
        } : {
            conditionGroupsContainer : Experiment_ConditionGroupsContainer
            conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer

        }) : Map<number,Set<number>> {

        return _internal__getProjectSearchIds_For_First_ConditionGroup({ conditionGroupsContainer, conditionGroupsDataContainer })
    }

    /**
     * Get ProjectSearchIds Grouped By Condition Ids in provided ConditionGroup, filtered on conditionIds_ParentPath
     *
     * (Used on Single Protein to get the "Last" Project Search Ids Per Condition Id)
     *
     * @param conditionIds_ParentPath - condition Id Parent Path to Filter On
     * @param conditionGroup
     * @param conditionGroupsDataContainer
     *
     * @return Map<condition id,Set<project search id>>  -- Map<number,Set<number>>
     */
    static getProjectSearchIds_For_ConditionGroup_FilteringOn_ConditionIdsParentPath(
    {
        conditionIds_ParentPath,
        conditionGroup,
        conditionGroupsDataContainer
    } : {
        conditionIds_ParentPath : Array<number>
        conditionGroup: Experiment_ConditionGroup
        conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer

    }) :  Map<number,Set<number>> {

        return _internal__getProjectSearchIds_For_ConditionGroup_FilteringOn_ConditionIdsParentPath(
            {
                conditionIds_ParentPath, conditionGroup, conditionGroupsDataContainer
            });
    }


    /**
     * Get ProjectSearchIds Grouped By Condition Ids in provided ConditionGroup, Grouped by Condition Ids in First Condition Group, filtered on conditionIds_ParentPath
     *
     * @param conditionIds_ParentPath - condition Id Parent Path to Filter On
     * @param current_conditionGroup
     * @param conditionGroupsDataContainer
     *
     * @return Map< Current Condition Group: condition.id,Map< First Condition Group: condition.id,<Set<project search id>>>  -- Map<Map<number,Set<number>>>
     */
    static getProjectSearchIds_For_ConditionGroup_FirstConditionGroup_FilteringOn_ConditionIdsParentPath(
    {
        conditionIds_ParentPath,
        current_conditionGroup,
        first_conditionGroup,
        conditionGroupsDataContainer
    } : {
        conditionIds_ParentPath : Array<number>
        current_conditionGroup: Experiment_ConditionGroup
        first_conditionGroup: Experiment_ConditionGroup
        conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer

    }) : Map<number,Map<number,Set<number>>> {

        return _internal__getProjectSearchIds_For_ConditionGroup_FirstConditionGroup_FilteringOn_ConditionIdsParentPath({
            conditionIds_ParentPath,
            current_conditionGroup,
            first_conditionGroup,
            conditionGroupsDataContainer
        })
    }

}

//////////////

///   Non Class LOCAL Code

/**
 *
 * @param conditionGroupsContainer
 * @param conditionGroupsDataContainer
 * @return Map<condition id,Set<project search id>>  -- Map<number,Set<number>>
 */
const _internal__getProjectSearchIds_For_First_ConditionGroup = function (
    {
        conditionGroupsContainer,
        conditionGroupsDataContainer
    } : {
        conditionGroupsContainer : Experiment_ConditionGroupsContainer
        conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer

    }) : Map<number,Set<number>> {

    //  Accumulate by first_conditionGroup each condition.id

    const projectSearchIds_By_conditionId = new Map<number,Set<number>>();

    const first_conditionGroup = conditionGroupsContainer.conditionGroups[ 0 ];

    const first_id_ConditionGroup = first_conditionGroup.id;

    const first_conditionGroup_Conditions = first_conditionGroup.conditions;

    const first_conditionGroup_ConditionIds : Set<number> = new Set();

    for ( const condition of first_conditionGroup_Conditions ) {
        const conditionId = condition.id;
        first_conditionGroup_ConditionIds.add( conditionId );
    }


    const processAllDataEntries_Callback = ( params : Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param ) => {

        const data = params.data
        const innerData = data.data;

        if ( ! innerData ) {
            // innerData not populated

            return; //  EARLY RETURN
        }

        const projectSearchIds : Set<number> = innerData.projectSearchIds;

        if ( ( ! projectSearchIds ) || ( projectSearchIds.size === 0 ) ) {
            // innerData.projectSearchIds not populated

            return; //  EARLY RETURN
        }

        let condition_Id_For_first_ConditionGroup = undefined;

        const conditionIds_Path = params.conditionIds_Path;

        for ( const conditionIds_Path_Entry of conditionIds_Path ) {
            if ( first_conditionGroup_ConditionIds.has( conditionIds_Path_Entry ) ) {
                condition_Id_For_first_ConditionGroup = conditionIds_Path_Entry;
                break;
            }
        }
        if ( condition_Id_For_first_ConditionGroup === undefined ) {
            const msg = "No entry found in first_conditionGroup_ConditionIds for first_id_ConditionGroup: " + first_id_ConditionGroup;
            console.warn( msg );
            throw Error( msg );
        }

        //  Accumulate projectSearchIds Per condition_Id_For_first_ConditionGroup

        let projectSearchIds_For_conditionId = projectSearchIds_By_conditionId.get( condition_Id_For_first_ConditionGroup );
        if ( ! projectSearchIds_For_conditionId ) {
            projectSearchIds_For_conditionId = new Set<number>();
            projectSearchIds_By_conditionId.set( condition_Id_For_first_ConditionGroup, projectSearchIds_For_conditionId );
        }

        for ( const projectSearchId of projectSearchIds ) {
            projectSearchIds_For_conditionId.add( projectSearchId );
        }
    }

    conditionGroupsDataContainer.processAllDataEntries_ConditionGroupsDataContainer({ callback : processAllDataEntries_Callback });

    return projectSearchIds_By_conditionId;
}

/**
 * Get ProjectSearchIds Grouped By Condition Ids in provided ConditionGroup, filtered on conditionIds_ParentPath
 *
 * @param conditionIds_ParentPath - condition Id Parent Path to Filter On
 * @param conditionGroup
 * @param conditionGroupsDataContainer
 *
 * @return Map<condition id,Set<project search id>>  -- Map<number,Set<number>>
 */
const _internal__getProjectSearchIds_For_ConditionGroup_FilteringOn_ConditionIdsParentPath = function (
    {
        conditionIds_ParentPath,
        conditionGroup,
        conditionGroupsDataContainer
    } : {
        conditionIds_ParentPath : Array<number>
        conditionGroup: Experiment_ConditionGroup
        conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer

    }) :  Map<number,Set<number>> {

    const current_conditionGroup_Conditions = conditionGroup.conditions;
    const current_id_ConditionGroup = conditionGroup.id;

    const projectSearchIds_By_conditionId = new Map<number,Set<number>>();

    const processAllDataEntries_Callback = ( params : Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param ) => {

        const data = params.data
        const innerData = data.data;

        if ( ! innerData ) {
            // innerData not populated

            return; //  EARLY RETURN
        }

        const projectSearchIds : Set<number> = innerData.projectSearchIds;

        if ( ( ! projectSearchIds ) || ( projectSearchIds.size === 0 ) ) {
            // innerData.projectSearchIds not populated

            return; //  EARLY RETURN
        }

        let condition_id_For_current_ConditionGroup = undefined;

        const conditionIds_Path = params.conditionIds_Path;

        //  If not contain conditionIds_ParentPath skip

        if ( conditionIds_ParentPath && conditionIds_ParentPath.length > 0 ) {

            let foundAll = true;

            for ( const conditionIds_ParentPath_Entry of conditionIds_ParentPath ) {
                let foundEntry = false;
                for ( const conditionIds_Path_Entry of conditionIds_Path ) {

                    //  Filtering on conditionIds_ParentPath

                    if ( conditionIds_Path_Entry === conditionIds_ParentPath_Entry ) {
                        foundEntry = true;
                        break;
                    }
                }
                if ( ! foundEntry ) {
                    foundAll = false;
                    break;
                }
            }
            if ( ! foundAll ) {
                // not contain conditionIds_ParentPath so skip

                return;  // EARLY RETURN
            }
        }

        for ( const conditionIds_Path_Entry of conditionIds_Path ) {
            for ( const condition of current_conditionGroup_Conditions ) {

                //  Filtering on conditionIds_ParentPath

                if ( conditionIds_Path_Entry === condition.id ) {
                    condition_id_For_current_ConditionGroup = conditionIds_Path_Entry;
                    break;
                }
            }
            if ( condition_id_For_current_ConditionGroup !== undefined ) {
                break;
            }
        }
        if ( condition_id_For_current_ConditionGroup === undefined ) {
            const msg = "No entry found in conditionIds_Path for conditions in current_id_ConditionGroup: " + current_id_ConditionGroup;
            console.warn( msg );
            throw Error( msg );
        }

        let projectSearchIds_For_conditionId = projectSearchIds_By_conditionId.get( condition_id_For_current_ConditionGroup );
        if ( ! projectSearchIds_For_conditionId ) {
            projectSearchIds_For_conditionId = new Set<number>();
            projectSearchIds_By_conditionId.set( condition_id_For_current_ConditionGroup, projectSearchIds_For_conditionId );
        }

        for ( const projectSearchId of projectSearchIds ) {
            projectSearchIds_For_conditionId.add( projectSearchId );
        }
    }

    conditionGroupsDataContainer.processAllDataEntries_ConditionGroupsDataContainer({ callback : processAllDataEntries_Callback });

    return projectSearchIds_By_conditionId;

}


/**
 * Get ProjectSearchIds Grouped By Condition Ids in provided ConditionGroup, Grouped by Condition Ids in First Condition Group, filtered on conditionIds_ParentPath
 *
 * @param conditionIds_ParentPath - condition Id Parent Path to Filter On
 * @param current_conditionGroup
 * @param conditionGroupsDataContainer
 *
 * @return Map< Current Condition Group: condition.id,Map< First Condition Group: condition.id,<Set<project search id>>>  -- Map<Map<number,Set<number>>>
 */
const _internal__getProjectSearchIds_For_ConditionGroup_FirstConditionGroup_FilteringOn_ConditionIdsParentPath = function (
    {
        conditionIds_ParentPath,
        current_conditionGroup,
        first_conditionGroup,
        conditionGroupsDataContainer
    } : {
        conditionIds_ParentPath : Array<number>
        current_conditionGroup: Experiment_ConditionGroup
        first_conditionGroup: Experiment_ConditionGroup
        conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer

    }) : Map<number,Map<number,Set<number>>> {

    //  Accumulate by conditionIds_ParentPath each condition.id

    // const current_conditionGroup_Index = conditionIds_ParentPath.length + 1;  // Skipping over the first condition group as that will be shown last

    // const current_conditionGroup = conditionGroups[ current_conditionGroup_Index ];
    //
    // const first_conditionGroup = conditionGroups[ 0 ];

    //   Map< Current Condition Group: condition.id,Map< First Condition Group: condition.id,<Set<number>>>();

    const projectSearchIds_By_conditionId_FirstConditionGroupConditionId = new Map<number,Map<number,Set<number>>>();

    const current_id_ConditionGroup = current_conditionGroup.id;

    const current_conditionGroup_Conditions = current_conditionGroup.conditions;


    const processAllDataEntries_Callback = ( params : Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param ) => {

        const conditionIds_Path = params.conditionIds_Path; //  Condition Ids in an order that should not be depended on
        const data = params.data

        const innerData = data.data;

        if ( ! innerData ) {
            // innerData not populated

            return; //  EARLY RETURN
        }

        const projectSearchIds : Set<number> = innerData.projectSearchIds;

        if ( ( ! projectSearchIds ) || ( projectSearchIds.size === 0 ) ) {
            // innerData.projectSearchIds not populated

            return; //  EARLY RETURN
        }

        let condition_id_For_current_ConditionGroup = undefined;

        {
            //  If not contain conditionIds_ParentPath skip

            if ( conditionIds_ParentPath && conditionIds_ParentPath.length > 0 ) {

                //  Data to Process 'Current Path' (conditionIds_Path) must contain all entries in Display 'Parent Path' (conditionIds_ParentPath)

                let foundAll = true;

                for ( const conditionIds_ParentPath_Entry of conditionIds_ParentPath ) {

                    let foundEntry = false;

                    for ( const conditionIds_Path_Entry of conditionIds_Path ) {
                        if ( conditionIds_Path_Entry === conditionIds_ParentPath_Entry ) {
                            foundEntry = true;
                            break;
                        }
                    }
                    if ( ! foundEntry ) {
                        foundAll = false;
                        break;
                    }
                }
                if ( ! foundAll ) {
                    // not contain conditionIds_ParentPath so skip

                    return;  // EARLY RETURN
                }
            }

            for ( const conditionIds_Path_Entry of conditionIds_Path ) {
                for ( const condition of current_conditionGroup_Conditions ) {
                    if ( conditionIds_Path_Entry === condition.id ) {
                        condition_id_For_current_ConditionGroup = conditionIds_Path_Entry;
                        break;
                    }
                }
                if ( condition_id_For_current_ConditionGroup !== undefined ) {
                    break;
                }
            }
            if ( condition_id_For_current_ConditionGroup === undefined ) {
                const msg = "No entry found in conditionIds_Path for condtions in current_id_ConditionGroup: " + current_id_ConditionGroup;
                console.warn( msg );
                throw Error( msg );
            }
        }

        let projectSearchIds_For_conditionId = projectSearchIds_By_conditionId_FirstConditionGroupConditionId.get( condition_id_For_current_ConditionGroup );
        if ( ! projectSearchIds_For_conditionId ) {
            projectSearchIds_For_conditionId = new Map<number, Set<number>>();
            projectSearchIds_By_conditionId_FirstConditionGroupConditionId.set( condition_id_For_current_ConditionGroup, projectSearchIds_For_conditionId );
        }

        //  Find correct condition in first condition group to add to:

        let first_conditionGroup_conditionId : number = undefined;

        for ( const conditionIds_Path_Entry of conditionIds_Path ) {
            for ( const first_conditionGroup_condition of first_conditionGroup.conditions ) {
                if ( conditionIds_Path_Entry === first_conditionGroup_condition.id ) {
                    first_conditionGroup_conditionId = conditionIds_Path_Entry;
                    break;
                }
            }
            if ( first_conditionGroup_conditionId !== undefined ) {
                break;
            }
        }
        if ( first_conditionGroup_conditionId === undefined ) {
            let errorMsg_conditionIds_PathString = "";
            try {
                const conditionIds_Path_Array = Array.from( conditionIds_Path );
                errorMsg_conditionIds_PathString = "  conditionIds_Path: " + conditionIds_Path_Array.join(", ");
            } catch(e) {}

            const msg = "createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup: No entry in conditionIds_Path found in first_conditionGroup.conditions." + errorMsg_conditionIds_PathString;
            console.warn( msg );
            throw Error( msg );
        }

        let projectSearchIds_For_conditionId_first_conditionGroup_conditionId = projectSearchIds_For_conditionId.get( first_conditionGroup_conditionId );
        if ( ! projectSearchIds_For_conditionId_first_conditionGroup_conditionId ) {
            projectSearchIds_For_conditionId_first_conditionGroup_conditionId = new Set();
            projectSearchIds_For_conditionId.set( first_conditionGroup_conditionId, projectSearchIds_For_conditionId_first_conditionGroup_conditionId );
        }

        for ( const projectSearchId of projectSearchIds ) {
            projectSearchIds_For_conditionId_first_conditionGroup_conditionId.add( projectSearchId );
        }
    }

    conditionGroupsDataContainer.processAllDataEntries_ConditionGroupsDataContainer({ callback : processAllDataEntries_Callback });

    return projectSearchIds_By_conditionId_FirstConditionGroupConditionId;
}

