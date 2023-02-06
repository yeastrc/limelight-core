/**
 * projectPage_UploadData_FeatureDetection_Run_Initialize_CallWebservice.ts
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay - Feature Detection Run - Initialize
 *
 *
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";

/**
 * Returned Object via Promise
 */
export class ProjectPage_UploadData_FeatureDetection_Run_Initialize_CallWebservice_Response {

    statusSuccess: boolean
    uploadKey: string
    projectLocked: boolean
}

/**
 * 
 * @param projectIdentifier
 */
export const projectPage_UploadData_FeatureDetection_Run_Initialize_CallWebservice = function(
    {
        projectIdentifier
    } : {
        projectIdentifier: string
    }
) : Promise<ProjectPage_UploadData_FeatureDetection_Run_Initialize_CallWebservice_Response> {

    if ( projectIdentifier === undefined || projectIdentifier === null || projectIdentifier === "" ) {
        throw Error("( projectIdentifier === undefined || projectIdentifier === null || projectIdentifier === \"\" )")
    }

    return new Promise<ProjectPage_UploadData_FeatureDetection_Run_Initialize_CallWebservice_Response>( (resolve, reject) => { try {

        const requestObject = {
            projectIdentifier
        };

        const url = "d/rws/for-page/project-feature-detection-run-and-import-initialize";

        console.log( "START: AJAX Call to: getting data from URL: " + url );

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { try {

            console.log("END: REJECTED: getting data from URL: " + url);

            reject();
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: ProjectPage_UploadData_FeatureDetection_Run_Initialize_CallWebservice_Response }) => { try {

            console.log( "END: Successful: AJAX Call: getting data from URL: " + url );

            if ( responseData.statusSuccess === undefined || responseData.statusSuccess === null ) {
                throw Error( "( responseData.statusSuccess === undefined || responseData.statusSuccess === null )" );
            }
            if ( responseData.statusSuccess ) {
                responseData.statusSuccess = true;
            } else {
                responseData.statusSuccess = false;
            }

            if ( responseData.projectLocked === undefined || responseData.projectLocked === null ) {
                throw Error( "( responseData.projectLocked === undefined || responseData.projectLocked === null )" );
            }
            if ( responseData.projectLocked ) {
                responseData.projectLocked = true;
            } else {
                responseData.projectLocked = false;
            }

            if ( responseData.uploadKey === undefined || responseData.uploadKey === null ) {
                throw Error( "( responseData.uploadKey === undefined || responseData.uploadKey === null )" );
            }
            if ( ! limelight__IsVariableAString( responseData.uploadKey ) ) {
                throw Error("( ! limelight__IsVariableAString( responseData.uploadKey ) )")
            }

            resolve( responseData );

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}
