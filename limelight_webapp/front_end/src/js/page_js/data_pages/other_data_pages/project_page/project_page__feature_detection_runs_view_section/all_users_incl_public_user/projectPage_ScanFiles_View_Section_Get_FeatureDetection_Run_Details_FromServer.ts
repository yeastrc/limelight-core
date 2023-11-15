/**
 * projectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Run_Details_FromServer.ts
 * 
 * Javascript for projectView.jsp page
 *
 * Feature Detection Runs View Section - Provide interaction for All Users, Including Public User
 *
 * Feature Detection Details - Get from server
 *
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 * Returned Object via Promise
 */
export class ProjectPage_FeatureDetection_Runs_View_Section_FeatureDetection_Run_Details_FromServer_Root {

    projectSearchIds_ForScanFile_List: Array<number>
}

/**
 * 
 * @param projectIdentifier
 */
export const projectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Run_Details_FromServer = function(
    {
        feature_detection_root__project_scnfl_mapping_tbl__id
    } : {
        feature_detection_root__project_scnfl_mapping_tbl__id: number
    }
) : Promise<ProjectPage_FeatureDetection_Runs_View_Section_FeatureDetection_Run_Details_FromServer_Root> {

    if ( feature_detection_root__project_scnfl_mapping_tbl__id === undefined || feature_detection_root__project_scnfl_mapping_tbl__id === null ) {
        throw Error("( feature_detection_root__project_scnfl_mapping_tbl__id === undefined || feature_detection_root__project_scnfl_mapping_tbl__id === null )")
    }

    return new Promise<ProjectPage_FeatureDetection_Runs_View_Section_FeatureDetection_Run_Details_FromServer_Root>( (resolve, reject) => { try {

        const requestObject = {
            feature_detection_root__project_scnfl_mapping_tbl__id
        };

        const url = "d/rws/for-page/feature-detection-run-details-for-project";

        console.log( "START: AJAX Call to: getting data from URL: " + url );

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { try {

            console.log("END: REJECTED: getting data from URL: " + url);

            reject();
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

            console.log( "END: Successful: AJAX Call: getting data from URL: " + url );

            const response = _process_WebserviceResponse({ responseData });

            resolve( response );

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}

/**
 *
 * @param projectIdentifier
 * @param responseData
 * @private
 */
const _process_WebserviceResponse = function (
    {
        responseData
    } : {
        responseData: any
    }) : ProjectPage_FeatureDetection_Runs_View_Section_FeatureDetection_Run_Details_FromServer_Root {

    const projectSearchIds_ForScanFile_List = responseData.projectSearchIds_ForScanFile_List;

    if ( projectSearchIds_ForScanFile_List ) {
        if ( ! ( projectSearchIds_ForScanFile_List instanceof Array ) ) {
            throw Error("( ! ( projectSearchIds_ForScanFile_List instanceof Array ) )")
        }

        for ( const projectSearchId of projectSearchIds_ForScanFile_List ) {
            if ( ! variable_is_type_number_Check( projectSearchId ) ) {
                throw Error("( ! variable_is_type_number_Check( projectSearchId ) ) from for ( const projectSearchId of projectSearchIds_ForScanFile_List )")
            }
        }
    }

    const result: ProjectPage_FeatureDetection_Runs_View_Section_FeatureDetection_Run_Details_FromServer_Root = {

        projectSearchIds_ForScanFile_List
    }

    return result;
}