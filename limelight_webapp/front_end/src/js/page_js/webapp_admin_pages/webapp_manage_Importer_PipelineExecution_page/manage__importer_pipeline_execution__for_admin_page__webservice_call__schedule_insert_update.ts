/**
 * manage__importer_pipeline_execution__for_admin_page__webservice_call__schedule_insert_update.ts
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
import { limelight__variable_is_type_number_Check } from "page_js/common_all_pages/limelight__variable_is_type_number_Check";

/**
 *
 */
export class Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_InsertUpdate_Response {

    statusSuccess: boolean;
    scheduleJSON_PrevLastUpdated_Milliseconds_UTC_NOT_CURRENT_VALUE: boolean ;
}

/**
 *
 */
export const manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_InsertUpdate = function (
    {
        scheduleJSON, scheduleJSON_PrevLastUpdated_Milliseconds_UTC
    } : {
        scheduleJSON: string
        scheduleJSON_PrevLastUpdated_Milliseconds_UTC: number
    }
) :

    Promise<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_InsertUpdate_Response>
    {
        return new Promise<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_InsertUpdate_Response>(( resolve, reject) => { try {

            const url = "admin/rws/for-page/manage-run-importer-pause-schedule-insert-update";

            console.log("START: AJAX Call to " + url + ", Now: " + new Date() );

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : { scheduleJSON, scheduleJSON_PrevLastUpdated_Milliseconds_UTC }, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { try {
                reject(reason)
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }} );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

                console.log("END: AJAX Call to " + url + ", Now: " + new Date() );

                resolve( {
                    statusSuccess: responseData.statusSuccess,
                    scheduleJSON_PrevLastUpdated_Milliseconds_UTC_NOT_CURRENT_VALUE: responseData.scheduleJSON_PrevLastUpdated_Milliseconds_UTC_NOT_CURRENT_VALUE
                })

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }} )

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }})

}
