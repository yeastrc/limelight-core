/**
 * manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_Requested_CurrentStatus.ts
 *
 *
 *
 */


import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum,
    Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Type_ID_Enum
} from "page_js/webapp_admin_pages/webapp_manage_Importer_PipelineExecution_page/manage_ImporterPipelineExecution_ForAdminPage_Constants_Enums";

/**
 *
 */
export class Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_RequestedStatus_Response {

    responseItem_Array: Array<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_RequestedStatus_Response_Item>
}

/**
 *
 */
export class Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_RequestedStatus_Response_Item {

    type: Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Type_ID_Enum
    status_Requested: Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum
}


/**
 *
 */
export const manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_RequestedStatus = function () :

    Promise<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_RequestedStatus_Response>
    {
        return new Promise<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_RequestedStatus_Response>(( resolve, reject) => { try {

            const url = "admin/rws/for-page/manage-run-importer-pause-get-requested-status";

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
const _processWebserviceResult = function( responseData: any ) : Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_RequestedStatus_Response {

    const outputArray: Array<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_RequestedStatus_Response_Item> = []

    
    if ( ! responseData.resultList ) {
        throw Error("( ! responseData.resultList )")
    }
    if ( ! ( responseData.resultList instanceof Array ) ) {
        throw Error("( ! ( responseData.resultList instanceof Array ) )")
    }
    
    for ( const result of responseData.resultList ) {

        const outputEntry : Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_RequestedStatus_Response_Item = {
            type: null, status_Requested: null
        }

        if ( result.type_Id === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Type_ID_Enum.PAUSE_ALL ) {
            outputEntry.type = Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Type_ID_Enum.PAUSE_ALL
        } else {
            throw Error( "result.type_Id is Unknown. Is not any value in Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Type_ID_Enum.  result.type_Id: " + result.type_Id )
        }

        if ( result.status_Requested_Id === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum.NOT_PAUSE ) {
            outputEntry.status_Requested = Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum.NOT_PAUSE
        } else if ( result.status_Requested_Id === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum.PAUSE_IMMEDIATELY ) {
            outputEntry.status_Requested = Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum.PAUSE_IMMEDIATELY
        } else if ( result.status_Requested_Id === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum.PAUSE_WHEN_COMPLETE ) {
            outputEntry.status_Requested = Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum.PAUSE_WHEN_COMPLETE
        } else {
            throw Error( "result.status_Requested_Id is Unknown. Is not any value in Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Status_ID_Enum.  result.status_Requested_Id: " + result.status_Requested_Id )
        }

        outputArray.push( outputEntry )
    }

    const outputFinal : Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_RequestedStatus_Response = {
        responseItem_Array: outputArray
    }

    return outputFinal
}