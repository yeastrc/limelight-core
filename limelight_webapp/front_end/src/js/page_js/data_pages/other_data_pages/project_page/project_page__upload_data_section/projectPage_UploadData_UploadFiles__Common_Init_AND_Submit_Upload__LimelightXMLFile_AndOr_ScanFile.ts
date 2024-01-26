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
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";


//   INIT UPLOAD

/**
 *
 */
export class ProjectPage_UploadData_UploadFiles__Common_Init_Upload_Request_SingleFile {

    //  Contents matches Expected in webservice

    fileIndex: number;
    fileType: number;
    filename: string;
    uploadFileSize: number;
}

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
        projectIdentifier, searchName, searchShortName, files_InSubmitImport
    } : {
        projectIdentifier: string
        searchName;
        searchShortName;
        files_InSubmitImport?: Array<ProjectPage_UploadData_UploadFiles__Common_Init_Upload_Request_SingleFile>

        //  'files_InSubmitImport' will NOT be populated for OLD Submit Import Program versions

        // @XmlElementWrapper(name="files_InSubmitImport")
        // @XmlElement(name="file_InSubmitImport")
        // private List<SubmitImport_Init_Request_SubPart_SingleFileUploadEntry> files_InSubmitImport;
    }
) : Promise<ProjectPage_UploadData_UploadFiles__Common_Init_Upload__LimelightXMLFile_AndOr_ScanFile_Response>{

    let requestData = {
        projectIdentifier, searchName, searchShortName, files_InSubmitImport
    }

    const url = "d/rws/for-page/project-upload-data-upload-initialize";

    console.log( "START: AJAX Call to: posting data to URL: " + url );

    return new Promise<ProjectPage_UploadData_UploadFiles__Common_Init_Upload__LimelightXMLFile_AndOr_ScanFile_Response>((resolve, reject) => { try {

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                console.log( "END: AJAX Call to: posting data to URL: " + url );

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
                        limelight__ReloadPage_Function()
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


//////////////////////////////
//////////////////////////////

//   Single File Upload - Initialize and Submit




//////////////////////////////
//////////////////////////////

//    UPLOAD Single File Initialize

export class ProjectPage_UploadData_UploadFiles__Common_SingleFileUpload_Initialize__LimelightXMLFile_AndOr_ScanFile__Request {
    projectIdentifier: string;
    uniqueRequestIdentifier_ForThisFile: string
    uploadKey: string;
    fileIndex: number;
    fileType: number;
    filename: string;
    uploadFileSize: number;
}

/**
 *
 */
export class ProjectPage_UploadData_UploadFiles__Common_SingleFileUpload_Initialize__LimelightXMLFile_AndOr_ScanFile__Response {

    requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified: number;  //  Populated when store on S3.  Each uploaded chunk except last one MUST be this size

    maxFileUploadChunkSize: number  //  When store on S3 is same as required...  else is max chunk size

    //  These are populated for FileSizeLimitExceededException exception

    statusSuccess: boolean
    errorMessage: string

     // fileSizeLimitExceeded;
     // maxSize: number;
     // maxSizeFormatted: string;
     //
     // scanFileNotAllowed: boolean;
     // scanFilenameSuffixNotValid: boolean;
}

/**
 *
 * @param projectIdentifier
 */
export const projectPage_UploadData_UploadFiles__Common_SingleFileUpload_Initialize__LimelightXMLFile_AndOr_ScanFile =

    function(params: ProjectPage_UploadData_UploadFiles__Common_SingleFileUpload_Initialize__LimelightXMLFile_AndOr_ScanFile__Request )
    : Promise<ProjectPage_UploadData_UploadFiles__Common_SingleFileUpload_Initialize__LimelightXMLFile_AndOr_ScanFile__Response>{

    return new Promise<ProjectPage_UploadData_UploadFiles__Common_SingleFileUpload_Initialize__LimelightXMLFile_AndOr_ScanFile__Response>((resolve, reject) => { try {

//		All properties put in requestObj must be accepted by the web service
        let requestObj = {
            projectIdentifier: params.projectIdentifier,
            uploadKey: params.uploadKey,
            uniqueRequestIdentifier_ForThisFile: params.uniqueRequestIdentifier_ForThisFile,
            fileIndex : params.fileIndex,
            fileType : params.fileType,
            filename : params.filename,
            uploadFileSize: params.uploadFileSize
        }

        const url = "d/rws/for-page/project-upload-data-v2-upload-file-initialize";

        console.log( "START: AJAX Call to: posting data to URL: " + url );

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                console.log( "END: AJAX Call to: posting data to URL: " + url );

                const statusSuccess = responseData.statusSuccess;
                const projectLocked = responseData.projectLocked;
                const scanFileNotAllowed = responseData.scanFileNotAllowed;

                if ( responseData.requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified !== undefined
                    && responseData.requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified !== null ) {

                    if ( ! variable_is_type_number_Check( responseData.requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified ) ) {
                        const msg = "responseData.requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified is not a number.  value: " +
                            responseData.requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified;
                        console.warn(msg)
                        throw Error(msg)
                    }
                }
                if ( responseData.maxFileUploadChunkSize === undefined
                    || responseData.maxFileUploadChunkSize === null ) {
                    const msg = "responseData.maxFileUploadChunkSize is undefined or null.";
                    console.warn(msg)
                    throw Error(msg)
                }
                if ( ! variable_is_type_number_Check( responseData.maxFileUploadChunkSize ) ) {
                    const msg = "responseData.maxFileUploadChunkSize is not a number.  value: " +
                        responseData.maxFileUploadChunkSize;
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( ! statusSuccess ) {
                    if ( projectLocked ) {
                        //  Project is now locked so reload page so not display option to upload files for import
                        //  reload current URL
                        limelight__ReloadPage_Function()
                        return;
                    }
                    if ( scanFileNotAllowed ) {
                        //  Scan files are no longer allowed.  reload the page to reflect that.
                        //  reload current URL
                        limelight__ReloadPage_Function()
                        return;
                    }

                    //  TODO Do something with this in the response
                    // private boolean duplicateRecord_ForUploadKeyFileIndex;

                    //  Probably shouldn't get here
                    limelight__ReloadPage_Function()
                    return;
//			throw Error( "statusSuccess is false" );  ///  TODO  Need to display error
                }

                resolve({
                    requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified: responseData.requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified,
                    maxFileUploadChunkSize: responseData.maxFileUploadChunkSize,
                    //  Change the following when the webservice returns a value that should be displayed instead of reloading the page
                    statusSuccess: true,
                    errorMessage: undefined
                })

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}



//////////////////////////////
//////////////////////////////

//    UPLOAD Single File Submit

    export class ProjectPage_UploadData_UploadFiles__Common_SingleFileUpload_Submit__LimelightXMLFile_AndOr_ScanFile__Request {
        projectIdentifier: string;
        uniqueRequestIdentifier_ForThisFile: string
        uploadKey: string;
        fileIndex: number;
        fileType: number;
        filename: string;
        uploadFileSize: number;
    }

/**
 *
 */
export class ProjectPage_UploadData_UploadFiles__Common_SingleFileUpload_Submit__LimelightXMLFile_AndOr_ScanFile__Response {

    //  These are populated for FileSizeLimitExceededException exception

    statusSuccess: boolean
    errorMessage: string

    // fileSizeLimitExceeded;
    // maxSize: number;
    // maxSizeFormatted: string;
    //
    // scanFileNotAllowed: boolean;
    // scanFilenameSuffixNotValid: boolean;
}

/**
 *
 * @param projectIdentifier
 */
export const projectPage_UploadData_UploadFiles__Common_SingleFileUpload_Submit__LimelightXMLFile_AndOr_ScanFile =

    function(params: ProjectPage_UploadData_UploadFiles__Common_SingleFileUpload_Submit__LimelightXMLFile_AndOr_ScanFile__Request ) :
        Promise<ProjectPage_UploadData_UploadFiles__Common_SingleFileUpload_Submit__LimelightXMLFile_AndOr_ScanFile__Response>{

    return new Promise<ProjectPage_UploadData_UploadFiles__Common_SingleFileUpload_Submit__LimelightXMLFile_AndOr_ScanFile__Response>((resolve, reject) => { try {

//		All properties put in requestObj must be accepted by the web service
        let requestObj = {
            projectIdentifier: params.projectIdentifier,
            uniqueRequestIdentifier_ForThisFile: params.uniqueRequestIdentifier_ForThisFile,
            uploadKey: params.uploadKey,
            fileIndex : params.fileIndex,
            fileType : params.fileType,
            filename : params.filename,
            uploadFileSize: params.uploadFileSize
        }

        const url = "d/rws/for-page/project-upload-data-v2-upload-file-submit";

        console.log( "START: AJAX Call to: posting data to URL: " + url );

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                console.log( "END: AJAX Call to: posting data to URL: " + url );

                let statusSuccess = responseData.statusSuccess;
                let projectLocked = responseData.projectLocked;
                let scanFileNotAllowed = responseData.scanFileNotAllowed;
                if ( ! statusSuccess ) {
                    if ( projectLocked ) {
                        //  Project is now locked so reload page so not display option to upload files for import
                        //  reload current URL
                        limelight__ReloadPage_Function()
                        return;
                    }
                    if ( scanFileNotAllowed ) {
                        //  Scan files are no longer allowed.  reload the page to reflect that.
                        //  reload current URL
                        limelight__ReloadPage_Function()
                        return;
                    }

                    //  Probably shouldn't get here
                    limelight__ReloadPage_Function()
                    return;
//			throw Error( "statusSuccess is false" );  ///  TODO  Need to display error
                }

                resolve({
                    statusSuccess,
                    errorMessage: responseData.errorMessage
                })

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}



//////////////////////////////
//////////////////////////////

//    UPLOAD Single File Cancel Delete

export class ProjectPage_UploadData_UploadFiles__Common_SingleFileUpload_Cancel_Delete__LimelightXMLFile_AndOr_ScanFile__Request {
    projectIdentifier: string;
    uniqueRequestIdentifier_ForThisFile: string
    uploadKey: string;
    fileIndex: number;
    fileType: number;
    filename: string;
}

/**
 *
 */
export class ProjectPage_UploadData_UploadFiles__Common_SingleFileUpload_Cancel_Delete__LimelightXMLFile_AndOr_ScanFile__Response {

    _placeHolder: unknown

    //  These are populated for FileSizeLimitExceededException exception

    // statusSuccess: boolean
    // errorMessage: string

    // fileSizeLimitExceeded;
    // maxSize: number;
    // maxSizeFormatted: string;
    //
    // scanFileNotAllowed: boolean;
    // scanFilenameSuffixNotValid: boolean;
}

/**
 *
 * @param projectIdentifier
 */
export const projectPage_UploadData_UploadFiles__Common_SingleFileUpload_Cancel_Delete__LimelightXMLFile_AndOr_ScanFile = function(params: ProjectPage_UploadData_UploadFiles__Common_SingleFileUpload_Cancel_Delete__LimelightXMLFile_AndOr_ScanFile__Request ) : Promise<ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Response>{

    return new Promise<ProjectPage_UploadData_UploadFiles__Common_SingleFileUpload_Cancel_Delete__LimelightXMLFile_AndOr_ScanFile__Response>((resolve, reject) => { try {

//		All properties put in requestObj must be accepted by the web service
        let requestObj = {
            projectIdentifier: params.projectIdentifier,
            uniqueRequestIdentifier_ForThisFile: params.uniqueRequestIdentifier_ForThisFile,
            uploadKey: params.uploadKey,
            fileIndex : params.fileIndex,
            fileType : params.fileType,
            filename : params.filename
        }

        const url = "d/rws/for-page/project-upload-data-v2-upload-file-cancel-delete";

        console.log( "START: AJAX Call to: posting data to URL: " + url );

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                console.log( "END: AJAX Call to: posting data to URL: " + url );

                let statusSuccess = responseData.statusSuccess;
                let projectLocked = responseData.projectLocked;
                let scanFileNotAllowed = responseData.scanFileNotAllowed;
                if ( ! statusSuccess ) {
                    if ( projectLocked ) {
                        //  Project is now locked so reload page so not display option to upload files for import
                        //  reload current URL
                        limelight__ReloadPage_Function()
                        return;
                    }
                    if ( scanFileNotAllowed ) {
                        //  Scan files are no longer allowed.  reload the page to reflect that.
                        //  reload current URL
                        limelight__ReloadPage_Function()
                        return;
                    }

                    //  Probably shouldn't get here
                    limelight__ReloadPage_Function()
                    return;
//			throw Error( "statusSuccess is false" );  ///  TODO  Need to display error
                }

                resolve({ _placeHolder: undefined })

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}



//////////////////////////////
//////////////////////////////

//   SUBMIT UPLOAD

export class ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request {
    projectIdentifier: string
    uploadKey: string
    searchName: string
    searchShortName: string
    filesUploaded: Array<ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request_Single_File>
    searchTagList: Array<string>  //  Search Tags NOT in any Category
    searchTagCategoryAndItsSearchTagsList: Array<ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request_Single_SearchTagCategory>
}

export class ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request_Single_SearchTagCategory {
    searchTagCategoryLabel: string
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
            searchTagList: params.searchTagList,
            searchTagCategoryAndItsSearchTagsList: params.searchTagCategoryAndItsSearchTagsList
        }

        const url = "d/rws/for-page/project-upload-data-upload-submit";

        console.log( "START: AJAX Call to: posting data to URL: " + url );

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                console.log( "END: AJAX Call to: posting data to URL: " + url );

                let statusSuccess = responseData.statusSuccess;
                let projectLocked = responseData.projectLocked;
                let scanFileNotAllowed = responseData.scanFileNotAllowed;
                if ( ! statusSuccess ) {
                    if ( projectLocked ) {
                        //  Project is now locked so reload page so not display option to upload files for import
                        //  reload current URL
                        limelight__ReloadPage_Function()
                        return;
                    }
                    if ( scanFileNotAllowed ) {
                        //  Scan files are no longer allowed.  reload the page to reflect that.
                        //  reload current URL
                        limelight__ReloadPage_Function()
                        return;
                    }
                    //  Probably shouldn't get here
                    limelight__ReloadPage_Function()
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
