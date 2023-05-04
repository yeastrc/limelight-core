/**
 * projectPage_UploadData_FeatureDetection_Run_Submit_CallWebservice.ts
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay - Feature Detection Run - Submit
 *
 *
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 * Returned Object via Promise
 */
export class Upload_FeatureDetection_Submit_CallWebservice_Response {

    private _placeholder: any
}

/**
 * 
 * @param projectIdentifier
 */
export const projectPage_UploadData_FeatureDetection_Run_Submit_CallWebservice = function(
    {
        uploadKey, hardklor_Conf_Filename, bullseye_Conf_Filename,
        projectScanFileId_List, displayLabel, description
    } : {
        uploadKey: string
        hardklor_Conf_Filename: string;
        bullseye_Conf_Filename: string;
        projectScanFileId_List: Array<number>
        displayLabel: string
        description: string
    }
) : Promise<Upload_FeatureDetection_Submit_CallWebservice_Response> {

    if ( projectScanFileId_List === undefined || projectScanFileId_List === null ) {
        throw Error("( projectScanFileId_List === undefined || projectScanFileId_List === null )")
    }
    if ( projectScanFileId_List.length === 0 ) {
        throw Error("( projectScanFileId_List.length === 0 )")
    }
    if ( displayLabel === undefined || displayLabel === null || displayLabel === "" ) {
        throw Error("( displayLabel === undefined || displayLabel === null || displayLabel === \"\" )")
    }
    if ( description === undefined || description === null ) {
        throw Error("( description === undefined || description === null )")
    }

    return new Promise<Upload_FeatureDetection_Submit_CallWebservice_Response>( (resolve, reject) => { try {

        const requestObject = {
            uploadKey, hardklor_Conf_Filename, bullseye_Conf_Filename,
            projectScanFileId_List,
            displayLabel, description
        };

        const url = "d/rws/for-page/project-feature-detection-run-and-import-submit";

        console.log( "START: AJAX Call to: getting data from URL: " + url );

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { try {

            console.log("END: REJECTED: getting data from URL: " + url);

            reject();
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

            console.log( "END: Successful: AJAX Call: getting data from URL: " + url );

            if ( ! responseData.statusSuccess ) {
                const msg = "( ! responseData.statusSuccess )"
                console.warn(msg)
                throw Error(msg)
            }

            const result = new Upload_FeatureDetection_Submit_CallWebservice_Response();

            resolve( result );

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}
