/**
 * projectPage_UploadData_FeatureDetection_Import_Submit_CallWebservice.ts
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay - Feature Detection Run - Submit
 *
 *
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";

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
export const projectPage_UploadData_FeatureDetection_Import_Submit_CallWebservice = function(
    {
        uploadKey, hardklor_Conf_Filename, hardklor_Results_Filename, bullseye_Results_Filename,
        projectScanFileId, displayLabel, description
    } : {
        uploadKey: string
        hardklor_Conf_Filename: string;
        hardklor_Results_Filename: string;
        bullseye_Results_Filename: string;
        projectScanFileId: number
        displayLabel: string
        description: string
    }
) : Promise<Upload_FeatureDetection_Submit_CallWebservice_Response> {

    if ( projectScanFileId === undefined || projectScanFileId === null ) {
        throw Error("( projectScanFileId === undefined || projectScanFileId === null )")
    }
    if ( displayLabel === undefined || displayLabel === null || displayLabel === "" ) {
        throw Error("( displayLabel === undefined || displayLabel === null || displayLabel === \"\" )")
    }
    if ( description === undefined || description === null ) {
        throw Error("( description === undefined || description === null )")
    }

    return new Promise<Upload_FeatureDetection_Submit_CallWebservice_Response>( (resolve, reject) => { try {

        const requestObject = {
            uploadKey, hardklor_Conf_Filename, hardklor_Results_Filename, bullseye_Results_Filename,
            projectScanFileId, displayLabel, description
        };

        const url = "d/rws/for-page/project-feature-detection-import-submit";

        console.log( "START: AJAX Call to: getting data from URL: " + url );

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: false }) ;

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
