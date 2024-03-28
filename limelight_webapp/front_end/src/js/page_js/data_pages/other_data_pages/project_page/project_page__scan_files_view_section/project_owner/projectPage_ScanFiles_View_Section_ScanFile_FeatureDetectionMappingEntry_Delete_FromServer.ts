/**
 * projectPage_ScanFiles_View_Section_ScanFile_FeatureDetectionEntry_Delete_FromServer.ts
 *
 * Javascript for projectView.jsp page
 *
 * Scan Files View Section - Delete Feature Detection Mapping Entry - Delete DB record that maps the Feature Detection Root record to the Project Scan File record
 *
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";

export interface ProjectPage_ScanFiles_View_Section_ScanFile_FeatureDetectionMappingEntry_Delete_FromServer__FunctionParams {
    featureDetectionRoot_MappingTblId: number
}

export type ProjectPage_ScanFiles_View_Section_ScanFile_FeatureDetectionMappingEntry_Delete_FromServer__FunctionType =
    ( params : ProjectPage_ScanFiles_View_Section_ScanFile_FeatureDetectionMappingEntry_Delete_FromServer__FunctionParams ) => Promise<ProjectPage_ScanFiles_View_Section_Delete_FeatureDetectionMappingEntry_FromServer_Root>

/**
 * Returned Object via Promise
 */
export class ProjectPage_ScanFiles_View_Section_Delete_FeatureDetectionMappingEntry_FromServer_Root {


}

/**
 * 
 * @param projectIdentifier
 */
export const projectPage_ScanFiles_View_Section_ScanFile_FeatureDetectionMappingEntry_Delete_FromServer: ProjectPage_ScanFiles_View_Section_ScanFile_FeatureDetectionMappingEntry_Delete_FromServer__FunctionType = function(
    {
        featureDetectionRoot_MappingTblId
    } : {
        featureDetectionRoot_MappingTblId: number
    }
) : Promise<ProjectPage_ScanFiles_View_Section_Delete_FeatureDetectionMappingEntry_FromServer_Root> {

    if ( featureDetectionRoot_MappingTblId === undefined || featureDetectionRoot_MappingTblId === null ) {
        throw Error("( featureDetectionRoot_MappingTblId === undefined || featureDetectionRoot_MappingTblId === null )")
    }

    return new Promise<ProjectPage_ScanFiles_View_Section_Delete_FeatureDetectionMappingEntry_FromServer_Root>( (resolve, reject) => { try {

        const requestObject = {
            featureDetectionRoot_MappingTblId
        };

        const url = "d/rws/for-page/scan-file-feature-detection-root-mapping-entry-delete";

        console.log( "START: AJAX Call to: URL: " + url );

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { try {

            console.log("END: REJECTED: getting data from URL: " + url);

            reject();
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

            console.log( "END: Successful: AJAX Call: URL: " + url );

            const response: ProjectPage_ScanFiles_View_Section_Delete_FeatureDetectionMappingEntry_FromServer_Root = {};

            resolve( response );

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}
