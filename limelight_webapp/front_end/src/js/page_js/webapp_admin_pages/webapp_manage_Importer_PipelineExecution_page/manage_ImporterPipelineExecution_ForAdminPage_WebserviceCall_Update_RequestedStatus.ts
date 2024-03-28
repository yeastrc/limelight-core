/**
 * manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Update_RequestedStatus.ts
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
export const manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Update_RequestedStatus = function (
    {
        type, statusRequested, genericPauseRequested
    } : {
        type: Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Type_ID_Enum;
        statusRequested: Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum;
        genericPauseRequested: boolean
    }
) :

    Promise<{
        askUserForPauseType: boolean
    }>
    {
        return new Promise<{
            askUserForPauseType: boolean
        }>((resolve, reject) => { try {

            const url = "admin/rws/for-page/manage-run-importer-pause-update-requested-status";

            console.log("START: AJAX Call to " + url + ", Now: " + new Date() );

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : { typeId: type, statusRequestedId: statusRequested, genericPauseRequested }, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { try {
                reject(reason)
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }} );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

                console.log("END: AJAX Call to " + url + ", Now: " + new Date() );

                if ( ! responseData.statusSuccess ) {
                    throw Error("( ! responseData.statusSuccess )")
                }

                resolve({ askUserForPauseType: responseData.askUserForPauseType })

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }} )

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }})

}
