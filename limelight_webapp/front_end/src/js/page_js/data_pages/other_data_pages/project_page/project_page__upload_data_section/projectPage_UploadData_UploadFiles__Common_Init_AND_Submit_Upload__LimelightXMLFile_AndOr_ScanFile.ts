/**
 * projectPage_UploadData_UploadFiles__Common_Init_AND_Submit_Upload__LimelightXMLFile_AndOr_ScanFile.ts
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay - Init Upload and Submit Upload for Limelight XML And/Or Scan File
 *
 *
 */

import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";


//   INIT UPLOAD

/**
 *
 */
export class ProjectPage_UploadData_UploadFiles__Common_Init_Upload__LimelightXMLFile_AndOr_ScanFile_Response {
    uploadKey: string
}

/**
 *
 * @param projectIdentifier
 */
export const projectPage_UploadData_UploadFiles__Common__Init_Upload__LimelightXMLFile_AndOr_ScanFile = function(
    {
        projectIdentifier
    } : {
        projectIdentifier: string
    }
) : Promise<ProjectPage_UploadData_UploadFiles__Common_Init_Upload__LimelightXMLFile_AndOr_ScanFile_Response>{

    let requestData = {
        projectIdentifier
    }

    const url = "d/rws/for-page/project-upload-data-upload-initialize";

    return new Promise<ProjectPage_UploadData_UploadFiles__Common_Init_Upload__LimelightXMLFile_AndOr_ScanFile_Response>((resolve, reject) => { try {

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                let statusSuccess = responseData.statusSuccess;
                let projectLocked = responseData.projectLocked;
                let uploadKey = responseData.uploadKey;

                if ( responseData.uploadKey === undefined || responseData.uploadKey === null || responseData.uploadKey === "" ) {
                    throw Error("( responseData.uploadKey === undefined || responseData.uploadKey === null || responseData.uploadKey === \"\" )")
                }

                if ( ! limelight__IsVariableAString( responseData.uploadKey ) ) {
                    throw Error("( ! limelight__IsVariableAString( responseData.uploadKey ) ) ")
                }

                if ( ! statusSuccess ) {
                    if ( projectLocked ) {
                        //  Project is now locked so reload page so not display option to upload files for import
                        //  reload current URL
                        window.location.reload(true);
                    }
                    //  Probably shouldn't get here
                    throw Error( "statusSuccess is false" );  ///  TODO  Need to display error
                }

                const response : ProjectPage_UploadData_UploadFiles__Common_Init_Upload__LimelightXMLFile_AndOr_ScanFile_Response = {
                    uploadKey
                }

                resolve(response)

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}


////////////

//   SUBMIT UPLOAD

export class ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request {
    projectIdentifier: string
    uploadKey: string
    searchName: string
    searchShortName: string
    filesUploaded: Array<ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request_Single_File>
    searchTagList: Array<string>
}

export class ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request_Single_File {

    isLimelightXMLFile : boolean
    uploadedFilename : string
    fileType : number
    fileIndex : number
}

/**
 *
 */
export class ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Response {
}

/**
 *
 * @param projectIdentifier
 */
export const projectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile = function(params: ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request ) : Promise<ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Response>{

    return new Promise<ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Response>((resolve, reject) => { try {

//		All properties put in requestObj must be accepted by the web service
        let requestObj = {
            projectIdentifier: params.projectIdentifier,
            uploadKey: params.uploadKey,
            searchName : params.searchName,
            searchShortName : params.searchShortName,
            fileItems : params.filesUploaded,
            searchTagList: params.searchTagList
        }

        const url = "d/rws/for-page/project-upload-data-upload-submit";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                let statusSuccess = responseData.statusSuccess;
                let projectLocked = responseData.projectLocked;
                let scanFileNotAllowed = responseData.scanFileNotAllowed;
                if ( ! statusSuccess ) {
                    if ( projectLocked ) {
                        //  Project is now locked so reload page so not display option to upload files for import
                        //  reload current URL
                        window.location.reload(true);
                        return;
                    }
                    if ( scanFileNotAllowed ) {
                        //  Scan files are no longer allowed.  reload the page to reflect that.
                        //  reload current URL
                        window.location.reload(true);
                        return;
                    }
                    //  Probably shouldn't get here
                    window.location.reload(true);
                    return;
//			throw Error( "statusSuccess is false" );  ///  TODO  Need to display error
                }

                resolve({})

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}
