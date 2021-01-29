/**
 * experiment_Get_ConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId.ts
 *
 *   !!!!!  NOT TESTED CODE
 */

import {
    Experiment_ConditionGroupsDataContainer,
    Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param
} from "page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {Experiment_ConditionGroupsContainer} from "page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes";


/**
 *
 */
export class Experiment_ConditionGroupLabel_and_ConditionLabel {

    conditionGroupLabel : string;
    conditionLabel : string;
}



/**
 * Get Condition Group Label and Condition Label Map Key ProjectSearchId.
 *
 * !!!!!  NOT TESTED CODE
 */
export const experiment_getConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId = function (
    {
        conditionGroupsContainer,
        conditionGroupsDataContainer
    } : {
        conditionGroupsContainer : Experiment_ConditionGroupsContainer
        conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
    }) : {

    conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId : Map<number, Array<Experiment_ConditionGroupLabel_and_ConditionLabel>>,
    conditionGroupLabels_Only_InSameOrder : Array<string>
} {

    /////   !!!!!!!!!

    throw Error("!!!!!  NOT TESTED CODE:  experiment_getConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId ")

    /////   !!!!!!!!!

    const conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId : Map<number, Array<Experiment_ConditionGroupLabel_and_ConditionLabel>> = new Map();

    let conditionGroupLabels_Only_InSameOrder : Array<string> = undefined;

    {
        let firstDataEntry = true;

        const processAllDataEntries_Callback = ( params : Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param ) => {
            try {
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

                const conditionIds_Path = params.conditionIds_Path;

                //  Get Condition Group Label and Condition Label

                const conditionGroupLabel_and_ConditionLabel_Data : Array<Experiment_ConditionGroupLabel_and_ConditionLabel> = [];

                const conditionGroupLabels_Only : Array<string> = [];

                for ( const conditionIds_Path_Entry of conditionIds_Path ) {

                    let conditionGroupLabel = undefined;
                    let conditionLabel = undefined;

                    for ( const conditionGroup of conditionGroupsContainer.conditionGroups ) {

                        for ( const condition of conditionGroup.conditions ) {
                            if ( condition.id === conditionIds_Path_Entry ) {
                                conditionLabel = condition.label;
                                conditionGroupLabel = conditionGroup.label;
                                break;
                            }
                        }
                        if ( conditionGroupLabel ) {
                            break;
                        }
                    }
                    if ( conditionLabel === undefined ) {
                        const msg = "No condition entry found for conditionIds_Path_Entry: " + conditionIds_Path_Entry;
                        console.warn( msg );
                        throw Error( msg );
                    }

                    conditionGroupLabel_and_ConditionLabel_Data.push( { conditionGroupLabel, conditionLabel } ); //  class Experiment_ConditionGroupLabel_and_ConditionLabel

                    conditionGroupLabels_Only.push( conditionGroupLabel );
                }

                for ( const projectSearchId of projectSearchIds ) {
                    conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId.set( projectSearchId, conditionGroupLabel_and_ConditionLabel_Data );
                }

                if ( ! conditionGroupLabels_Only_InSameOrder ) {

                    conditionGroupLabels_Only_InSameOrder = conditionGroupLabels_Only;

                } else {

                    //  Validate that conditionGroupLabels_Only_InSameOrder and conditionGroupLabels_Only are same

                    if ( conditionGroupLabels_Only_InSameOrder.length !== conditionGroupLabels_Only.length ) {
                        const msg = "conditionGroupLabels_Only_InSameOrder.length !== conditionGroupLabels_Only.length";
                        console.warn( msg );
                        throw Error( msg );
                    }
                    const conditionGroupLabels_Only_InSameOrder_length = conditionGroupLabels_Only_InSameOrder.length;
                    for ( let index = 0; index < conditionGroupLabels_Only_InSameOrder_length; index++ ) {
                        if ( conditionGroupLabels_Only_InSameOrder[ index ] !== conditionGroupLabels_Only[ index ] ) {
                            const msg = "conditionGroupLabels_Only_InSameOrder[ index ] !== conditionGroupLabels_Only[ index ]";
                            console.warn( msg );
                            throw Error( msg );
                        }
                    }
                }

                firstDataEntry = false;

            } catch ( e ) {
                try {
                    console.warn( "Error in processAllDataEntries_Callback(...): ", e )
                } catch ( e2 ) {

                }
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }

        conditionGroupsDataContainer.processAllDataEntries_ConditionGroupsDataContainer({ callback : processAllDataEntries_Callback });
    }

    return { conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId, conditionGroupLabels_Only_InSameOrder };
}
