/**
 * manage__importer_pipeline_execution__for_admin_page__webservice_call__get__running_and_queued_job_counts.ts
 *
 *
 *
 */


import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";

/**
 *
 */
export class Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_Running_Queued_JobCount_Response {

    importer_Running_JobCount: number
    importAndPipelineRun_Running_JobCount: number

    importer_Queued_OR_Requeued_JobCount: number
    importAndPipelineRun_Queued_OR_Requeued_JobCount: number
}


/**
 *
 */
export const manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_Running_Queued_JobCount = function () :

    Promise<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_Running_Queued_JobCount_Response>
    {
        return new Promise<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_Running_Queued_JobCount_Response>(( resolve, reject) => { try {

            const url = "admin/rws/for-page/manage-run-importer-pause-get-running-queued-job-count";

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

                resolve( responseData )

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }} )

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }})

}
