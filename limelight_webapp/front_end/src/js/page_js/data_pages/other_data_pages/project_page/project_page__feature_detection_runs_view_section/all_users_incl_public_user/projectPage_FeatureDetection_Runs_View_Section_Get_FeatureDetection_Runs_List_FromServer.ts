/**
 * projectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer.ts
 *
 * Javascript for projectView.jsp page
 *
 * Feature Detection Runs View Section - Provide interaction for All Users, Including Public User
 *
 * Feature Detection Runs List - Get from server
 *
 */

import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";



/**
 * Returned Object via Promise
 */
export class ProjectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer_Root {

    featureDetection_Runs_In_Project_List: Array<ProjectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer_FeatureDetection_Run_Entry>
    standardRunImporter_IsFullyConfigured: boolean
    runFeatureDetection_IsFullyConfigured: boolean
}

export class ProjectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer_FeatureDetection_Run_Entry {

    featureDetection_Run_Mapping_Id: number
    projectScanFileId: number
    scanFileId: number

    displayLabel: string
    description: string

    scanFilename_Array: Array<string>
    scanFile_Code_FirstSix: string
}


/**
 *
 * @param projectIdentifier
 */
export const projectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer = function(
    {
        projectIdentifier
    } : {
        projectIdentifier : string
    }
) : Promise<ProjectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer_Root> {

    return new Promise<ProjectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer_Root>( (resolve, reject) => { try {

        const requestObject = {
            projectIdentifier
        };

        const url = "d/rws/for-page/feature-detection-runs-in-project-list";

        console.log( "START: AJAX Call to: getting data from URL: " + url );

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { try {

            console.log("END: REJECTED: getting data from URL: " + url);

            reject();
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

            const responseData_Cast = responseData as INTERNAL__WebserviceResponse_Root

            console.log( "END: Successful: AJAX Call: getting data from URL: " + url );

            const response = _process_WebserviceResponse({ projectIdentifier, responseData_Cast });

            const result: ProjectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer_Root = {
                featureDetection_Runs_In_Project_List: response.featureDetection_Array,
                standardRunImporter_IsFullyConfigured: responseData_Cast.standardRunImporter_IsFullyConfigured,
                runFeatureDetection_IsFullyConfigured: responseData_Cast.runFeatureDetection_IsFullyConfigured
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
        projectIdentifier, responseData_Cast
    } : {
        projectIdentifier : string
        responseData_Cast: INTERNAL__WebserviceResponse_Root
    }) : {
    featureDetection_Array: Array<ProjectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer_FeatureDetection_Run_Entry>
} {

    {  //  Validate response data types

        if ( ! responseData_Cast.feature_detection_root__project_scnfl_mapping_tbl__id_List ) {
            throw Error("( ! responseData_Cast.feature_detection_root__project_scnfl_mapping_tbl__id_List ) ")
        }
        if ( ! ( responseData_Cast.feature_detection_root__project_scnfl_mapping_tbl__id_List instanceof Array ) ) {
            throw Error("( ! ( responseData_Cast.feature_detection_root__project_scnfl_mapping_tbl__id_List instanceof Array ) )")
        }

        if ( ! responseData_Cast.project_scan_file_id_List ) {
            throw Error("( ! responseData_Cast.project_scan_file_id_List ) ")
        }
        if ( ! ( responseData_Cast.project_scan_file_id_List instanceof Array ) ) {
            throw Error("( ! ( responseData_Cast.project_scan_file_id_List instanceof Array ) )")
        }

        if ( ! responseData_Cast.displayLabel_List ) {
            throw Error("( ! responseData_Cast.displayLabel_List ) ")
        }
        if ( ! ( responseData_Cast.displayLabel_List instanceof Array ) ) {
            throw Error("( ! ( responseData_Cast.displayLabel_List instanceof Array ) )")
        }

        if ( ! responseData_Cast.description_List ) {
            throw Error("( ! responseData_Cast.description_List ) ")
        }
        if ( ! ( responseData_Cast.description_List instanceof Array ) ) {
            throw Error("( ! ( responseData_Cast.description_List instanceof Array ) )")
        }

        if ( ! responseData_Cast.scanFilename_Set_List ) {
            throw Error("( ! responseData_Cast.scanFilename_Set_List ) ")
        }
        if ( ! ( responseData_Cast.scanFilename_Set_List instanceof Array ) ) {
            throw Error("( ! ( responseData_Cast.scanFilename_Set_List instanceof Array ) )")
        }

        if ( ! responseData_Cast.scanFileId_List ) {
            throw Error("( ! responseData_Cast.scanFileId_List ) ")
        }
        if ( ! ( responseData_Cast.scanFileId_List instanceof Array ) ) {
            throw Error("( ! ( responseData_Cast.scanFileId_List instanceof Array ) )")
        }

        if ( ! responseData_Cast.scanFile_Code_FirstSix_List ) {
            throw Error("( ! responseData_Cast.scanFile_Code_FirstSix_List ) ")
        }
        if ( ! ( responseData_Cast.scanFile_Code_FirstSix_List instanceof Array ) ) {
            throw Error("( ! ( responseData_Cast.scanFile_Code_FirstSix_List instanceof Array ) )")
        }

        if ( responseData_Cast.feature_detection_root__project_scnfl_mapping_tbl__id_List.length !== responseData_Cast.project_scan_file_id_List.length
            ||  responseData_Cast.feature_detection_root__project_scnfl_mapping_tbl__id_List.length !== responseData_Cast.displayLabel_List.length
            ||  responseData_Cast.feature_detection_root__project_scnfl_mapping_tbl__id_List.length !== responseData_Cast.description_List.length
            ||  responseData_Cast.feature_detection_root__project_scnfl_mapping_tbl__id_List.length !== responseData_Cast.scanFilename_Set_List.length
            ||  responseData_Cast.feature_detection_root__project_scnfl_mapping_tbl__id_List.length !== responseData_Cast.scanFileId_List.length
            ||  responseData_Cast.feature_detection_root__project_scnfl_mapping_tbl__id_List.length !== responseData_Cast.scanFile_Code_FirstSix_List.length ) {

            throw Error("responseData arrays are different lengths")
        }
    }

    const featureDetection_Array: Array<ProjectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer_FeatureDetection_Run_Entry> = [];

    const feature_detection_root__project_scnfl_mapping_tbl__id_List__length = responseData_Cast.feature_detection_root__project_scnfl_mapping_tbl__id_List.length

    for ( let index_Arrays_FromWebservice = 0; index_Arrays_FromWebservice < feature_detection_root__project_scnfl_mapping_tbl__id_List__length; index_Arrays_FromWebservice++ ) {

        const featureDetection_Entry : ProjectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer_FeatureDetection_Run_Entry = {
            featureDetection_Run_Mapping_Id: responseData_Cast.feature_detection_root__project_scnfl_mapping_tbl__id_List[ index_Arrays_FromWebservice ],
            projectScanFileId: responseData_Cast.project_scan_file_id_List[ index_Arrays_FromWebservice ],
            scanFileId: responseData_Cast.scanFileId_List[ index_Arrays_FromWebservice ],
            displayLabel: responseData_Cast.displayLabel_List[ index_Arrays_FromWebservice ],
            description: responseData_Cast.description_List[ index_Arrays_FromWebservice ],
            scanFilename_Array: responseData_Cast.scanFilename_Set_List[ index_Arrays_FromWebservice ],
            scanFile_Code_FirstSix: responseData_Cast.scanFile_Code_FirstSix_List[ index_Arrays_FromWebservice ],
        }

        if ( ! featureDetection_Entry.featureDetection_Run_Mapping_Id ) {
            throw Error("( ! featureDetection_Entry.featureDetection_Run_Mapping_Id )")
        }
        if ( ! limelight__variable_is_type_number_Check( featureDetection_Entry.featureDetection_Run_Mapping_Id ) ) {
            throw Error("( ! limelight__variable_is_type_number_Check( featureDetection_Entry.featureDetection_Run_Mapping_Id ) )")
        }

        if ( ! featureDetection_Entry.projectScanFileId ) {
            throw Error("( ! featureDetection_Entry.projectScanFileId )")
        }
        if ( ! limelight__variable_is_type_number_Check( featureDetection_Entry.projectScanFileId ) ) {
            throw Error("( ! limelight__variable_is_type_number_Check( featureDetection_Entry.projectScanFileId ) )")
        }
        if ( ! featureDetection_Entry.scanFileId ) {
            throw Error("( ! featureDetection_Entry.scanFileId )")
        }
        if ( ! limelight__variable_is_type_number_Check( featureDetection_Entry.scanFileId ) ) {
            throw Error("( ! limelight__variable_is_type_number_Check( featureDetection_Entry.scanFileId ) )")
        }

        if ( ! featureDetection_Entry.displayLabel ) {
            throw Error("( ! featureDetection_Entry.displayLabel )")
        }
        if ( ! limelight__IsVariableAString( featureDetection_Entry.displayLabel ) ) {
            throw Error("( ! limelight__IsVariableAString( featureDetection_Entry.displayLabel ) )")
        }

        if ( ! featureDetection_Entry.description ) {
            throw Error("( ! featureDetection_Entry.description )")
        }
        if ( ! limelight__IsVariableAString( featureDetection_Entry.description ) ) {
            throw Error("( ! limelight__IsVariableAString( featureDetection_Entry.description ) )")
        }

        if ( ! featureDetection_Entry.scanFilename_Array ) {
            throw Error("( ! featureDetection_Entry.scanFilename_Array )")
        }
        if ( ! ( featureDetection_Entry.scanFilename_Array instanceof Array ) ) {
            throw Error("( ! ( featureDetection_Entry.scanFilename_Array instanceof Array ) )")
        }
        for ( const scanFilename of featureDetection_Entry.scanFilename_Array ) {
            if ( ! limelight__IsVariableAString( scanFilename ) ) {
                throw Error("( ! limelight__IsVariableAString( scanFilename ) )")
            }
        }

        if ( ! featureDetection_Entry.scanFile_Code_FirstSix ) {
            throw Error("( ! featureDetection_Entry.scanFile_Code_FirstSix )")
        }
        if ( ! limelight__IsVariableAString( featureDetection_Entry.scanFile_Code_FirstSix ) ) {
            throw Error("( ! limelight__IsVariableAString( featureDetection_Entry.scanFile_Code_FirstSix ) )")
        }

        featureDetection_Array.push( featureDetection_Entry );
    }

    for ( const featureDetection_Entry of featureDetection_Array ) {
        featureDetection_Entry.scanFilename_Array.sort( (a,b) => {
            return a.localeCompare( b );
        })
    }

    // Sort on Feature Detection Mapping Id, descending
    featureDetection_Array.sort( (a,b) => {
        if ( a.featureDetection_Run_Mapping_Id >  b.featureDetection_Run_Mapping_Id )
            return -1
        if ( a.featureDetection_Run_Mapping_Id <  b.featureDetection_Run_Mapping_Id )
            return 1
        return 0
    })


    return { featureDetection_Array };
}

/**
 * Data returned from Webservice
 */
class INTERNAL__WebserviceResponse_Root {

    feature_detection_root__project_scnfl_mapping_tbl__id_List: Array<number>
    project_scan_file_id_List: Array<number>

    displayLabel_List: Array<string>
    description_List: Array<string>

    scanFilename_Set_List: Array<Array<string>>

    scanFileId_List: Array<number>
    scanFile_Code_FirstSix_List: Array<string>

    userIsProjectOwner: boolean

    standardRunImporter_IsFullyConfigured: boolean
    runFeatureDetection_IsFullyConfigured: boolean
}

