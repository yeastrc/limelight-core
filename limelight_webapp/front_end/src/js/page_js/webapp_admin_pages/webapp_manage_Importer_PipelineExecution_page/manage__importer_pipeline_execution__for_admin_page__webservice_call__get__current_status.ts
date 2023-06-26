/**
 * manage__importer_pipeline_execution__for_admin_page__webservice_call__get__current_status.ts
 *
 *
 *
 */


import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";
import {
    Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_ID_Enum,
    Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_TriggerType_Enum,
    Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Type_ID_Enum
} from "page_js/webapp_admin_pages/webapp_manage_Importer_PipelineExecution_page/manage_ImporterPipelineExecution_ForAdminPage_Constants_Enums";
import { variable_is_type_number_Check } from "page_js/variable_is_type_number_Check";

/**
 *
 */
export class Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_CurrentStatus_Response {

    responseItem_Array: Array<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_CurrentStatus_Response_Item>
}

/**
 *
 */
export class Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_CurrentStatus_Response_Item {

    type: Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Type_ID_Enum
    status_Current: Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_ID_Enum
    current_Status_TriggerType: Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_TriggerType_Enum
    time_in_seconds_until_next_check_for_pause: number
}


/**
 *
 */
export const manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_CurrentStatus = function () :

    Promise<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_CurrentStatus_Response>
    {
        return new Promise<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_CurrentStatus_Response>(( resolve, reject) => { try {

            const url = "admin/rws/for-page/manage-run-importer-pause-get-current-status";

            console.log("START: AJAX Call to " + url + ", Now: " + new Date() );

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : {}, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { try {
                reject(reason)
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }} );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

                console.log("END: AJAX Call to " + url + ", Now: " + new Date() );

                resolve( _processWebserviceResult( responseData ) )

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }} )

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }})

}

/**
 *
 */
const _processWebserviceResult = function( responseData: any ) : Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_CurrentStatus_Response {

    const outputArray: Array<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_CurrentStatus_Response_Item> = []

    
    if ( ! responseData.resultList ) {
        throw Error("( ! responseData.resultList )")
    }
    if ( ! ( responseData.resultList instanceof Array ) ) {
        throw Error("( ! ( responseData.resultList instanceof Array ) )")
    }
    
    for ( const result of responseData.resultList ) {

        const outputEntry : Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_CurrentStatus_Response_Item = {
            type: null, status_Current: null, current_Status_TriggerType: null, time_in_seconds_until_next_check_for_pause: result.time_in_seconds_until_next_check_for_pause
        }

        if ( result.type_Id === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Type_ID_Enum.PAUSE_ALL ) {
            outputEntry.type = Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Type_ID_Enum.PAUSE_ALL
        } else {
            throw Error( "result.type_Id is Unknown. Is not any value in Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Type_ID_Enum.  result.type_Id: " + result.type_Id )
        }

        if ( result.status_Id === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_ID_Enum.NOT_PAUSED ) {
            outputEntry.status_Current = Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_ID_Enum.NOT_PAUSED
        } else if ( result.status_Id === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_ID_Enum.YES_PAUSED ) {
            outputEntry.status_Current = Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_ID_Enum.YES_PAUSED
        } else if ( result.status_Id === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_ID_Enum.PAUSED_PENDING_COMPLETION ) {
            outputEntry.status_Current = Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_ID_Enum.PAUSED_PENDING_COMPLETION
        } else {
            throw Error( "result.status_Current_Id is Unknown. Is not any value in Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_ID_Enum.  result.status_Id: " + result.status_Id )
        }

        if ( result.current_Status_TriggerType_Id === null ) {
            outputEntry.current_Status_TriggerType = null
        } else if ( result.current_Status_TriggerType_Id === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_TriggerType_Enum.PAUSE_FOR_REQUEST ) {
            outputEntry.current_Status_TriggerType = Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_TriggerType_Enum.PAUSE_FOR_REQUEST
        } else if ( result.current_Status_TriggerType_Id === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_TriggerType_Enum.PAUSE_FOR_SCHEDULE ) {
            outputEntry.current_Status_TriggerType = Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_TriggerType_Enum.PAUSE_FOR_SCHEDULE
        } else {
            throw Error( "result.current_Status_TriggerType_Id is Unknown. Is not null or any value in Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_TriggerType_Enum.  result.status_Id: " + result.status_Id )
        }

        if ( outputEntry.time_in_seconds_until_next_check_for_pause === undefined || outputEntry.time_in_seconds_until_next_check_for_pause === null ) {
            throw Error( "( outputEntry.time_in_seconds_until_next_check_for_pause === undefined || outputEntry.time_in_seconds_until_next_check_for_pause === null )" )
        }
        if ( ! variable_is_type_number_Check( outputEntry.time_in_seconds_until_next_check_for_pause ) ) {
            throw Error( "( ! variable_is_type_number_Check( outputEntry.time_in_seconds_until_next_check_for_pause ) )" )
        }

        outputArray.push( outputEntry )
    }

    const outputFinal : Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_CurrentStatus_Response = {
        responseItem_Array: outputArray
    }

    return outputFinal
}