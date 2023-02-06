/**
 * projectPage_ScanFiles_View_Section_Get_ScanFile_Details_FromServer.tsx
 *
 * Javascript for projectView.jsp page
 *
 * Scan Files View Section - Provide interaction for All Users, Including Public User
 *
 * Scan File Details - Get from server
 *
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";

/**
 * Returned Object via Promise
 */
export class ProjectPage_ScanFiles_View_Section_ScanFile_Details_FromServer_Root {

    projectSearchIds_ForScanFile_List: Array<number>
    featureDetection_List: Array<ProjectPage_ScanFiles_View_Section_ScanFile_Details_FromServer_FeatureDetectionEntry>
}

export class ProjectPage_ScanFiles_View_Section_ScanFile_Details_FromServer_FeatureDetectionEntry {

    id_MappingTbl: number;
    displayLabel: string
    description: string
}

/**
 * 
 * @param projectIdentifier
 */
export const projectPage_ScanFiles_View_Section_Get_ScanFile_Details_FromServer = function(
    {
        projectScanFileId
    } : {
        projectScanFileId: number
    }
) : Promise<ProjectPage_ScanFiles_View_Section_ScanFile_Details_FromServer_Root> {

    if ( projectScanFileId === undefined || projectScanFileId === null ) {
        throw Error("( projectScanFileId === undefined || projectScanFileId === null )")
    }

    return new Promise<ProjectPage_ScanFiles_View_Section_ScanFile_Details_FromServer_Root>( (resolve, reject) => { try {

        const requestObject = {
            projectScanFileId
        };

        const url = "d/rws/for-page/scan-file-details-for-project";

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
    }) : ProjectPage_ScanFiles_View_Section_ScanFile_Details_FromServer_Root {

    if ( ! responseData.featureDetection_List ) {
        throw Error("( ! responseData.featureDetection_List ) ")
    }
    if ( ! ( responseData.featureDetection_List instanceof Array ) ) {
        throw Error("( ! ( responseData.featureDetection_List instanceof Array ) )")
    }

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

    const featureDetection_List: Array<ProjectPage_ScanFiles_View_Section_ScanFile_Details_FromServer_FeatureDetectionEntry> = [];

    for ( const resultItem of responseData.featureDetection_List ) {

        const featureDetection_Entry : ProjectPage_ScanFiles_View_Section_ScanFile_Details_FromServer_FeatureDetectionEntry = {
            id_MappingTbl: resultItem.id_MappingTbl,
            displayLabel: resultItem.displayLabel,
            description: resultItem.description
        }

        if ( ! featureDetection_Entry.id_MappingTbl ) {
            throw Error("( ! featureDetection_Entry.id_MappingTbl )")
        }
        if ( ! variable_is_type_number_Check( featureDetection_Entry.id_MappingTbl ) ) {
            throw Error("( ! variable_is_type_number_Check( featureDetection_Entry.id_MappingTbl ) )")
        }

        if ( ! featureDetection_Entry.displayLabel ) {
            throw Error("( ! featureDetection_Entry.displayLabel )")
        }
        if ( ! limelight__IsVariableAString( featureDetection_Entry.displayLabel ) ) {
            throw Error("( ! limelight__IsVariableAString( featureDetection_Entry.displayLabel ) )")
        }

        if ( featureDetection_Entry.description ) {
            if (!limelight__IsVariableAString(featureDetection_Entry.description)) {
                throw Error("( ! limelight__IsVariableAString( featureDetection_Entry.description ) )")
            }
        }

        featureDetection_List.push( featureDetection_Entry );
    }

    const result: ProjectPage_ScanFiles_View_Section_ScanFile_Details_FromServer_Root = {

        projectSearchIds_ForScanFile_List,
        featureDetection_List
    }

    return result;
}