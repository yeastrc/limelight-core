/**
 * projectPage_ScanFiles_View_Section_Get_ScanFile_List_FromServer.ts
 *
 * Javascript for projectView.jsp page
 *
 * Scan Files View Section - Provide interaction for All Users, Including Public User
 *
 * Scan File List - Get from server
 *
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";

/**
 * Returned Object via Promise
 */
export class ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_Root {

    scanFiles_In_Project_List: Array<ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_ScanFileEntry>
    runFeatureDetection_IsFullyConfigured: boolean
}

export class ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_ScanFileEntry {

    projectScanFileId: number;
    scanFileId: number;
    scanFilename_Array: Array<string>;
    scanFile_Code_FirstSix: string
}


/**
 *
 * @param projectIdentifier
 */
export const projectPage_ScanFiles_View_Section_Get_ScanFile_List_FromServer = function(
    {
        projectIdentifier
    } : {
        projectIdentifier : string
    }
) : Promise<ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_Root> {

    return new Promise<ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_Root>( (resolve, reject) => { try {

        const requestObject = {
            projectIdentifier
        };

        const url = "d/rws/for-page/scan-files-in-project-list";

        console.log( "START: AJAX Call to: getting data from URL: " + url );

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { try {

            console.log("END: REJECTED: getting data from URL: " + url);

            reject();
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

            console.log( "END: Successful: AJAX Call: getting data from URL: " + url );

            const response = _process_WebserviceResponse({ projectIdentifier, responseData });

            const result: ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_Root = {
                scanFiles_In_Project_List: response.scanFile_List,
                runFeatureDetection_IsFullyConfigured: responseData.runFeatureDetection_IsFullyConfigured
            }

            resolve(result);

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
        projectIdentifier, responseData
    } : {
        projectIdentifier : string
        responseData: any
    }) : {
    scanFile_List: Array<ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_ScanFileEntry>
} {

    if ( ! responseData.resultItemList ) {
        throw Error("( ! responseData.resultItemList ) ")
    }
    if ( ! ( responseData.resultItemList instanceof Array ) ) {
        throw Error("( ! ( responseData.resultItemList instanceof Array ) )")
    }

    const scanFile_List: Array<ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_ScanFileEntry> = [];

    for ( const resultItem of responseData.resultItemList ) {

        const scanFileEntry : ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_ScanFileEntry = {
            projectScanFileId: resultItem.projectScanFileId,
            scanFileId: resultItem.scanFileId,
            scanFile_Code_FirstSix: resultItem.scanFile_Code_FirstSix,
            scanFilename_Array: resultItem.scanFilename_Set
        }

        if ( ! scanFileEntry.projectScanFileId ) {
            throw Error("( ! scanFileEntry.projectScanFileId )")
        }
        if ( ! variable_is_type_number_Check( scanFileEntry.projectScanFileId ) ) {
            throw Error("( ! variable_is_type_number_Check( scanFileEntry.projectScanFileId ) )")
        }

        if ( ! scanFileEntry.scanFileId ) {
            throw Error("( ! scanFileEntry.scanFileId )")
        }
        if ( ! variable_is_type_number_Check( scanFileEntry.scanFileId ) ) {
            throw Error("( ! variable_is_type_number_Check( scanFileEntry.scanFileId ) )")
        }

        if ( ! scanFileEntry.scanFile_Code_FirstSix ) {
            throw Error("( ! scanFileEntry.scanFile_Code_FirstSix )")
        }
        if ( ! limelight__IsVariableAString( scanFileEntry.scanFile_Code_FirstSix ) ) {
            throw Error("( ! limelight__IsVariableAString( scanFileEntry.scanFile_Code_FirstSix ) )")
        }

        if ( ! scanFileEntry.scanFilename_Array ) {
            throw Error("( ! scanFileEntry.scanFilename_Array )")
        }
        if ( ! ( scanFileEntry.scanFilename_Array instanceof Array ) ) {
            throw Error("( ! ( scanFileEntry.scanFilename_Array instanceof Array ) )")
        }
        for ( const scanFilename of scanFileEntry.scanFilename_Array ) {
            if ( ! limelight__IsVariableAString( scanFilename ) ) {
                throw Error("( ! limelight__IsVariableAString( scanFilename ) )")
            }
        }

        scanFile_List.push( scanFileEntry );
    }

    for ( const scanFile_Entry of scanFile_List ) {
        scanFile_Entry.scanFilename_Array.sort( (a,b) => {
            return a.localeCompare( b );
        })
    }

    // Sort on first scan filename
    scanFile_List.sort( (a,b) => {
        return a.scanFilename_Array[0].localeCompare( b.scanFilename_Array[0] );
    })


    return { scanFile_List };
}