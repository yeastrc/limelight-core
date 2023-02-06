/**
 * projectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice.ts
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay - Feature Detection Import - Upload File
 *
 *
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {handleRawAJAXError} from "page_js/handleServicesAJAXErrors";
import {
    getWebserviceSyncTrackingCode,
    LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM
} from "page_js/EveryPageCommon";



const BULLSEYE_FILE_UPLOAD_SERVICE_URL = "d/rws/for-page/project-feature-detection-import-upload-file";


const LIMELIGHT_UPLOAD_FILE_PARAMS_JSON__HEADER_PARAM = "limelight_upload_file_params_json"  //  Keep in sync with server side

const LIMELIGHT_UPLOAD_FILE__REJECT_ON_NETWORK_ERROR = "REJECT_ON_NETWORK_ERROR";

/**
 *
 */
export class ProjectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice_SendDataObject {

    uploadKey: string;
    hardklorConfFile: boolean;
    hardklorDataFile: boolean;
    bullseyeDataFile: boolean;
}

/**
 *
 */
export class ProjectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice_Result {

    statusSuccess: boolean
}

/**
 *
 * @param projectIdentifier
 * @param scanFileId
 * @param fileToSend
 */
export const projectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice = function (
    {
        fileToSend, sendDataObject
    } : {
        fileToSend: File
        sendDataObject: ProjectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice_SendDataObject
    }
) : Promise<ProjectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice_Result> {

    return new Promise<ProjectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice_Result>( (resolve, reject) =>  { try {

        const promise_send = _actual_WebserviceCall__Return_XHR_Response_Via_Promise({ sendDataObject, fileToSend });

        promise_send.catch( reason => {

            reject( reason )
        })


        promise_send.then( xhrResponse => {
            let resp = null;
            try {
                resp = JSON.parse(xhrResponse);
            } catch(e) {
//						resp = {
//						statusSuccess: false,
//						data: 'Unknown error occurred: [' + xhrResponseText + ']'
//						}
                let errorMessage = "File Uploaded but failed to get information from server response.";

                window.alert(errorMessage)

                reject();

                return;  //  EARLY RETURN
            }

            if ( resp !== null ) {

                resolve( resp )

                return;  //  EARLY RETURN
            }

            let errorMessage = "File NOT Uploaded, service response unknown";

            window.alert(errorMessage)

            reject()
        });

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}

/**
 *
 * @param projectIdentifier
 * @param scanFileId
 * @param fileToSend
 * @private
 */
const _actual_WebserviceCall__Return_XHR_Response_Via_Promise = function (
    {
        sendDataObject, fileToSend
    } : {
        sendDataObject: ProjectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice_SendDataObject
        fileToSend: File
    }
) : Promise<any> {

    return new Promise<any>( (resolve, reject) =>  { try {

        console.log( "START Upload Bullseye file to: " + BULLSEYE_FILE_UPLOAD_SERVICE_URL )

        //  Create the XMLHttpRequest to send the file
        let xmlHttpRequest = new XMLHttpRequest();

        // projectPage_UploadData_NewSingleFileEntry.setXMLHttpRequest( xmlHttpRequest );

        //  Add the callback functions to xmlHttpRequest

        xmlHttpRequest.onload = () => {
            try {
                let currentXHRinOnLoad = xmlHttpRequest;
                // projectPage_UploadData_NewSingleFileEntry.setXMLHttpRequest( undefined ); ///  clear reference to XMLHttpRequest
                let xhrStatus = currentXHRinOnLoad.status;
                let xhrResponse = currentXHRinOnLoad.response;
                let xhrResponseText = currentXHRinOnLoad.responseText;

                console.log( "END Upload Bullseye file: Response xhrStatus from URL " + BULLSEYE_FILE_UPLOAD_SERVICE_URL + "  :  ", xhrStatus )
                console.log( "END Upload Bullseye file: Response xhrResponse from URL " + BULLSEYE_FILE_UPLOAD_SERVICE_URL + "  :  ", xhrResponse )
                console.log( "END Upload Bullseye file: Response xhrResponseText from URL " + BULLSEYE_FILE_UPLOAD_SERVICE_URL + "  :  ", xhrResponseText )

                if (xhrStatus === 200) {

                    resolve( xhrResponse );  //  Return response to promise

                    return; // EARLY RETURN

                } else if (xhrStatus === 400) {

                    let errorMessage = "File NOT Uploaded, server error, status 400";
                    window.alert(errorMessage)

                } else if (xhrStatus === 401 || xhrStatus === 403) {
                    //  No Session or not Authorized
                    let handledResponse = handleRawAJAXError( currentXHRinOnLoad );
                    if ( handledResponse ) {

                        //  Probably reloading the page

                        reject()

                        return;  //  EARLY RETURN;

                    }

                    // objectThis.progressBarClear( { $containingBlock : $containingBlock } );

                    if (xhrStatus === 401 ) {
                        let errorMessage = "File NOT Uploaded, server error, status 401";
                        window.alert(errorMessage)

                    } else {
                        let errorMessage = "File NOT Uploaded, server error, status 403";
                        window.alert(errorMessage)
                    }
                } else if (xhrStatus === 500) {
                    let errorMessage = "File NOT Uploaded, server error, status 500";
                    window.alert(errorMessage)
                } else if (xhrStatus === 404) {
                    let errorMessage = "File NOT Uploaded, Service not found on server. status 404";
                    window.alert(errorMessage)
                } else {
                    let errorMessage = "File upload failed. xhrStatus: " + xhrStatus;
                    window.alert(errorMessage)
                }


                reject();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }

        xmlHttpRequest.upload.addEventListener('error', function(event){
            try {
                // projectPage_UploadData_NewSingleFileEntry.setXMLHttpRequest( undefined ); ///  clear reference to XMLHttpRequest
//				let currentXHRinOnLoad = xmlHttpRequest;

                reject( LIMELIGHT_UPLOAD_FILE__REJECT_ON_NETWORK_ERROR );

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, false);

        xmlHttpRequest.upload.addEventListener('abort', function(event){
//			let currentXHRinOnLoad = xmlHttpRequest;
            //  This is called when the "Abort" is called on the xmlHttpRequest object
            // projectPage_UploadData_NewSingleFileEntry.setXMLHttpRequest( undefined ); ///  clear reference to XMLHttpRequest
//			alert("Upload aborted");
        }, false);

        const webserviceSyncTrackingCode = getWebserviceSyncTrackingCode();

        xmlHttpRequest.open('POST', BULLSEYE_FILE_UPLOAD_SERVICE_URL);

        xmlHttpRequest.setRequestHeader( "Content-Type", "application/octet-stream" );

        //  Send values in Request Header

        xmlHttpRequest.setRequestHeader( LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM, webserviceSyncTrackingCode );

        //	   parameters added to the Request Header are available when the request is first received at the server.

        let uploadFileHeaderParams = {
            uploadKey: sendDataObject.uploadKey,
            hardklorConfFile: sendDataObject.hardklorConfFile,
            hardklorDataFile: sendDataObject.hardklorDataFile,
            bullseyeDataFile: sendDataObject.bullseyeDataFile,
            filename : fileToSend.name,
            uploadFileSize: fileToSend.size
        }
        let uploadFileHeaderParamsJSON = JSON.stringify( uploadFileHeaderParams );

        xmlHttpRequest.setRequestHeader( LIMELIGHT_UPLOAD_FILE_PARAMS_JSON__HEADER_PARAM, uploadFileHeaderParamsJSON );

        //  ES Lint reports useless try/catch so remove
        // try {
        //  Send File object from page <input type="file"> element instead of creating a Form and appending a File to it

        xmlHttpRequest.send( fileToSend );


    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}