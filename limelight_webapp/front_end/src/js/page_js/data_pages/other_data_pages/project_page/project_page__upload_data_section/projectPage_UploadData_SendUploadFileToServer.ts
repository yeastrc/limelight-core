/**
 * projectPage_UploadData_SendUploadFileToServer.ts
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Send Upload File to Server
 *
 *
 * Look for window. for things that reference things that may or may not be on the window object
 *
 */

//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module imports

//  For AJAX call (non jQuery)
import { getWebserviceSyncTrackingCode, LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM } from 'page_js/common_all_pages/EveryPageCommon';

import { handleRawAJAXError } from 'page_js/common_all_pages/handleServicesAJAXErrors'

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

//  The Send Data block size will adjust after each send data AJAX call to aim for for the Preferred Max Duration

const SEND_DATA_AJAX_CALL_PREFERRED_MAX_DURATION__IN_SECONDS = 5;  //  Preferred Max Duration of Send Data call

const STARTING_SEND_DATA_BLOCK_SIZE__AS_FRACTION_OF_MAX_SIZE = .05;

const MINIMUM_SEND_DATA_BLOCK_SIZE__AS_FRACTION_OF_MAX_SIZE = .005;

const LIMELIGHT_UPLOAD_FILE_PARAMS_JSON__HEADER_PARAM = "limelight_upload_file_params_json"  //  Keep in sync with server side

const LIMELIGHT_UPLOAD_FILE__REJECT_ON_NETWORK_ERROR = "REJECT_ON_NETWORK_ERROR";

const LIMELIGHT_UPLOAD_FILE__REJECT_ON_CHECKSUM_NOT_MATCH = "REJECT_ON_CHECKSUM_NOT_MATCH";


export class ProjectPage_UploadData_SendUploadFileToServer__Progress_Callback_Params {
	progressPercent: number
}

export type ProjectPage_UploadData_SendUploadFileToServer__Progress_Callback =
	(params: ProjectPage_UploadData_SendUploadFileToServer__Progress_Callback_Params) => void

/**
 *
 */
export class ProjectPage_UploadData_SendUploadFileToServer__Send_Response {

	statusSuccess: boolean
	errorMessage: string
}


/**
 *
 */
export class ProjectPage_UploadData_SendUploadFileToServer {

	private _projectIdentifierFromURL: string

	private maxFileUploadChunkSize: number = undefined;

	private _isLimelightXMLFile: boolean
	private _fileToUpload: File
	private _fileIndex: number
	private _fileType: number
	private _filename: string
	private _uploadKey: string
	private _requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified: number;  //  Populated when store on S3.  Each uploaded chunk except last one MUST be this size
	private _progress_Callback: ProjectPage_UploadData_SendUploadFileToServer__Progress_Callback

	private uploadFile_UploadInProgress_Canceled: boolean = false

	private _xmlHttpRequest_InProgress: XMLHttpRequest

	private _errorMessage_Internal_ReturnedToCaller: string

	constructor(
		{
			projectIdentifierFromURL, maxFileUploadChunkSize,

			isLimelightXMLFile, fileToUpload, fileIndex, fileType, filename, uploadKey,
			requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified,
			progress_Callback
		} : {
			projectIdentifierFromURL: string
			maxFileUploadChunkSize: number
			isLimelightXMLFile: boolean
			fileToUpload: File
			fileIndex: number
			fileType: number
			filename: string
			uploadKey: string
			requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified: number;  //  Populated when store on S3.  Each uploaded chunk except last one MUST be this size
			progress_Callback: ProjectPage_UploadData_SendUploadFileToServer__Progress_Callback
		}
	) {
		this._projectIdentifierFromURL = projectIdentifierFromURL
		this.maxFileUploadChunkSize = maxFileUploadChunkSize

		this._isLimelightXMLFile = isLimelightXMLFile
		this._fileToUpload = fileToUpload
		this._fileIndex = fileIndex
		this._fileType = fileType
		this._filename = filename
		this._uploadKey = uploadKey
		this._requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified = requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified;
		this._progress_Callback = progress_Callback
	}

	/**
	 * Abort file send
	 */
	abort_FileSend() {

		this.uploadFile_UploadInProgress_Canceled = true;

		if ( this._xmlHttpRequest_InProgress ) {
			//  cancel the XMLHttpRequest
			try {
				this._xmlHttpRequest_InProgress.abort();
			} catch(e) {
				const znothing = 0;
			}
		}
	}

	/**
	 * !!!  WARNING:  Promise will resolve when there are ERRORS.  Need to check the result of the resolve.  !!!
	 */
	async projectPage_UploadData_SendUploadFileToServer(
		{
			uniqueRequestIdentifier_ForThisFile
		} : {
			uniqueRequestIdentifier_ForThisFile: string
		}
	) : Promise<ProjectPage_UploadData_SendUploadFileToServer__Send_Response> { try {

		// return new Promise<ProjectPage_UploadData_SendUploadFileToServer__Send_Response>( (resolve, reject) => { try {

		//   Read the file to upload in blocks and send each block to the server in its own AJAX request

		const sendData_BlockSize_MINIMUM = Math.trunc( this.maxFileUploadChunkSize * MINIMUM_SEND_DATA_BLOCK_SIZE__AS_FRACTION_OF_MAX_SIZE );

		let sendData_BlockSize = Math.trunc( this.maxFileUploadChunkSize * STARTING_SEND_DATA_BLOCK_SIZE__AS_FRACTION_OF_MAX_SIZE ) ;   // size of one chunk/block to send to the server.  this.maxFileUploadChunkSize  from server max size

		let sendData_BlockSize__CanChange = true;

		//  this._requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified: number;  //  Populated when store on S3.  Each uploaded chunk except last one MUST be this size

		if ( this._requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified !== undefined
			&& this._requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified !== null ) {

			sendData_BlockSize = this._requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified;

			sendData_BlockSize__CanChange = false;  // MUST always send this block size except last block
		}

		const totalFileSize = this._fileToUpload.size;  // total size of file

		let processedBytes_OfFile = 0;  //  Used as StartByte.  Updated at end of loop for size of block sent.

		let fileChunk_SequenceNumber = 1; // start at 1  For use with AWS S3 storing chunks.

		while ( true ) {  // 'return' inside the loop

			const blob_ForFileSlice = this._fileToUpload.slice( processedBytes_OfFile, processedBytes_OfFile + sendData_BlockSize ); //  a single chunk of file

			const contentToSend = await blob_ForFileSlice.arrayBuffer()  //  Bytes read from the file slice, to send to server

			const _DIGEST_ALGORITHM = 'SHA-256'

			// Use the SubtleCrypto API to digest the ArrayBuffer with SHA-256
			const hash_ArrayBuffer = await window.crypto.subtle.digest( _DIGEST_ALGORITHM, contentToSend );

			const contentToSend_HashHex = Array.from( new Uint8Array(hash_ArrayBuffer ) )
				.map(byte => byte.toString( 16 ).padStart( 2, '0' )) // 'padStart': ensure is 2 characters by prefix with zero
				.join('');

			let result_uploadFile_Send_A_Block_HandleResponse_HighLevel: {sendTime_Milliseconds: number} = undefined

			try {
				result_uploadFile_Send_A_Block_HandleResponse_HighLevel =
					await
						this._uploadFile_Send_A_Block_HandleResponse_HighLevel(
							{
								uploadFileSize: totalFileSize,
								uniqueRequestIdentifier_ForThisFile,
								fileChunk_StartByte: processedBytes_OfFile,
								fileChunk_SequenceNumber,
								contentToSend,
								contentToSend_HashHex
							}
						);
			} catch ( e ) {

				if ( this._errorMessage_Internal_ReturnedToCaller ) {

					const resolveResult: ProjectPage_UploadData_SendUploadFileToServer__Send_Response = {
						statusSuccess: false, errorMessage: this._errorMessage_Internal_ReturnedToCaller
					}

					return resolveResult  // EARLY RETURN
				}

				throw e
			}

			if ( this.uploadFile_UploadInProgress_Canceled ) {

				//  Upload canceled so skip

				return;  //  EARLY RETURN
			}

			//  Prepare to upload next chunk of file to upload

			fileChunk_SequenceNumber++;

			processedBytes_OfFile += sendData_BlockSize;

			if ( processedBytes_OfFile <= totalFileSize ) {

				// file is NOT completely uploaded

				if ( this._progress_Callback ) {

					let progressPercent = Math.ceil(( processedBytes_OfFile / totalFileSize) * 100 );
					progressPercent = Math.min( progressPercent, 95 );  // Show max of 95
					this._progress_Callback( { progressPercent : progressPercent }  );
				}

				if ( sendData_BlockSize__CanChange ) {

					//  Compute new sendData_BlockSize based on the send time of the last block sent.  Optimal send time is SEND_DATA_AJAX_CALL_PREFERRED_LENGTH__IN_SECONDS

					{
						const prevSendTimePerByte_Milliseconds = sendData_BlockSize / result_uploadFile_Send_A_Block_HandleResponse_HighLevel.sendTime_Milliseconds;
						const new_sendData_BlockSize_UnTruncated = prevSendTimePerByte_Milliseconds * SEND_DATA_AJAX_CALL_PREFERRED_MAX_DURATION__IN_SECONDS * 1000

						let new_sendData_BlockSize = Math.trunc(new_sendData_BlockSize_UnTruncated)

						if ( new_sendData_BlockSize > this.maxFileUploadChunkSize ) {
							new_sendData_BlockSize = this.maxFileUploadChunkSize  //  limit to max size
						}
						if ( new_sendData_BlockSize < sendData_BlockSize_MINIMUM ) {
							new_sendData_BlockSize = sendData_BlockSize_MINIMUM  //  Limit to Min size
						}

						// console.warn( "result.sendTime_Milliseconds: " + result.sendTime_Milliseconds.toLocaleString() + ", old sendData_BlockSize: " + sendData_BlockSize.toLocaleString() + " , new_sendData_BlockSize: " + new_sendData_BlockSize.toLocaleString() )

						sendData_BlockSize = new_sendData_BlockSize;
					}
				}

			} else {

				// file IS completely uploaded

				const resolveResult : ProjectPage_UploadData_SendUploadFileToServer__Send_Response = {
					statusSuccess: true, errorMessage: undefined
				}

				return resolveResult  // EARLY RETURN --  Exit loop 'while(true)'
			}
		}

	} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


	/**
	 *
	 */
	private async _uploadFile_Send_A_Block_HandleResponse_HighLevel(
		{
			uploadFileSize,
			uniqueRequestIdentifier_ForThisFile,
			fileChunk_StartByte,
			fileChunk_SequenceNumber,
			contentToSend,
			contentToSend_HashHex
		} : {
			uploadFileSize: number
			uniqueRequestIdentifier_ForThisFile: string
			fileChunk_StartByte: number
			fileChunk_SequenceNumber: number
			contentToSend: ArrayBuffer
			contentToSend_HashHex: string
		}
	) : Promise<{
		sendTime_Milliseconds: number
	}> {

		const retryCount_NetworkError_ChecksumError_RetryCountMax = 4;
		let retryCount_NetworkError_ChecksumError = 0;

		while (true) {  // Exit using 'return' inside loop
			try {

				if ( this.uploadFile_UploadInProgress_Canceled ) {

					//  Upload canceled so skip

					return;  //  EARY RETURN
				}


				const midLevel_Response = await this._uploadFile_Send_A_Block_HandleResponse_MidLevel(
					{
						uploadFileSize,
						uniqueRequestIdentifier_ForThisFile,
						fileChunk_StartByte,
						fileChunk_SequenceNumber,
						contentToSend,
						contentToSend_HashHex
					});

				return midLevel_Response;

			} catch (error) {

				console.warn( "this._uploadFile_Send_A_Block_HandleResponse_MidLevel threw error: ", error );

				if ( error === LIMELIGHT_UPLOAD_FILE__REJECT_ON_NETWORK_ERROR ) {

					console.warn( "this._uploadFile_Send_A_Block_HandleResponse_MidLevel threw error. error === LIMELIGHT_UPLOAD_FILE__REJECT_ON_NETWORK_ERROR. retryCount_NetworkError_ChecksumError before increment: "
						+ retryCount_NetworkError_ChecksumError + ", error: ", error );

					retryCount_NetworkError_ChecksumError++;

					if ( retryCount_NetworkError_ChecksumError > retryCount_NetworkError_ChecksumError_RetryCountMax ) {

						console.warn( "this._uploadFile_Send_A_Block_HandleResponse_MidLevel threw error. error === LIMELIGHT_UPLOAD_FILE__REJECT_ON_NETWORK_ERROR. ( retryCount_NetworkError_ChecksumError > retryCount_NetworkError_ChecksumError_RetryCountMax ) error: ", error );

						this._errorMessage_Internal_ReturnedToCaller = "File NOT Uploaded.  Error connecting to server";

						throw error;
					}

				} else if ( error === LIMELIGHT_UPLOAD_FILE__REJECT_ON_CHECKSUM_NOT_MATCH ) {

					console.warn( "this._uploadFile_Send_A_Block_HandleResponse_MidLevel threw error. error === LIMELIGHT_UPLOAD_FILE__REJECT_ON_CHECKSUM_NOT_MATCH. retryCount_NetworkError_ChecksumError before increment: "
						+ retryCount_NetworkError_ChecksumError + ", error: ", error );

					retryCount_NetworkError_ChecksumError++;

					if ( retryCount_NetworkError_ChecksumError > retryCount_NetworkError_ChecksumError_RetryCountMax ) {

						console.warn( "this._uploadFile_Send_A_Block_HandleResponse_MidLevel threw error. error === LIMELIGHT_UPLOAD_FILE__REJECT_ON_CHECKSUM_NOT_MATCH. ( retryCount_NetworkError_ChecksumError > retryCount_NetworkError_ChecksumError_RetryCountMax ) error: ", error );

						this._errorMessage_Internal_ReturnedToCaller = "File NOT Uploaded.  Data getting corrupted in transport to server.  Checksum not match.";

						throw error;
					}
				} else {

					console.warn( "this._uploadFile_Send_A_Block_HandleResponse_MidLevel threw error. error !== LIMELIGHT_UPLOAD_FILE__REJECT_ON_NETWORK_ERROR. error: ", error );

					throw error;
				}
			}
		}

	}

	/**
	 *
	 */
	private _uploadFile_Send_A_Block_HandleResponse_MidLevel(
		{
			uploadFileSize,
			fileChunk_StartByte,
			uniqueRequestIdentifier_ForThisFile,
			fileChunk_SequenceNumber,
			contentToSend,
			contentToSend_HashHex
		} : {
			uploadFileSize: number
			uniqueRequestIdentifier_ForThisFile: string
			fileChunk_StartByte: number
			fileChunk_SequenceNumber: number
			contentToSend: ArrayBuffer
			contentToSend_HashHex: string
		}
	) : Promise<{
		sendTime_Milliseconds: number
	}> {

		return new Promise<any> ( ( resolve, reject ) => {
			try {
				const start_Time_Milliseconds = Date.now();

				const promise_send =
					this._uploadFile_ActualSend_Block({
						uploadFileSize,
						uniqueRequestIdentifier_ForThisFile,
						fileChunk_StartByte,
						fileChunk_SequenceNumber,
						contentToSend,
						contentToSend_HashHex
					});

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
						this._errorMessage_Internal_ReturnedToCaller = "File Uploaded but failed to get information from server response.";
					}
					if ( resp !== null ) {
						if ( resp.statusSuccess ) {

							const end_Time_Milliseconds = Date.now();

							const sendTime_Milliseconds = end_Time_Milliseconds - start_Time_Milliseconds;

							resolve({ sendTime_Milliseconds } )

						} else {
							this._errorMessage_Internal_ReturnedToCaller = "File NOT Uploaded, service returned failed status";

							reject()
						}
					}
				});

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 *
	 */
	private _uploadFile_ActualSend_Block(
		{
			uploadFileSize,
			uniqueRequestIdentifier_ForThisFile,
			fileChunk_StartByte,
			fileChunk_SequenceNumber,
			contentToSend,
			contentToSend_HashHex
		} : {
			uploadFileSize: number
			uniqueRequestIdentifier_ForThisFile: string
			fileChunk_StartByte: number
			fileChunk_SequenceNumber: number
			contentToSend: ArrayBuffer
			contentToSend_HashHex: string
		}) {

		let objectThis = this;

		return new Promise<any> ( ( resolve, reject ) => {
			try {

				//  Create the XMLHttpRequest to send the file
				let xmlHttpRequest = new XMLHttpRequest();

				this._xmlHttpRequest_InProgress = xmlHttpRequest;

				//  Add the callback functions to xmlHttpRequest

				xmlHttpRequest.onload = () => {
					try {
						let currentXHRinOnLoad = xmlHttpRequest;
						objectThis._xmlHttpRequest_InProgress = undefined; ///  clear reference to XMLHttpRequest
						let xhrStatus = currentXHRinOnLoad.status;
						let xhrResponse = currentXHRinOnLoad.response;
						let xhrResponseText = currentXHRinOnLoad.responseText;
						if (xhrStatus === 200) {

							resolve( xhrResponse );  //  Return response to promise

							return; // EARLY RETURN

						} else if (xhrStatus === 400) {
							let resp = null;
							try {
								resp = JSON.parse(xhrResponse);
							} catch(e) {
								this._errorMessage_Internal_ReturnedToCaller = 'Unknown error occurred: [' + xhrResponseText + ']';
							}
							if ( resp !== null ) {
								if ( resp.checksumSHA256_NotMatch ) {

									//  Special 'reject'

									reject( LIMELIGHT_UPLOAD_FILE__REJECT_ON_CHECKSUM_NOT_MATCH );

									return  // EARLY RETURN

								} else if ( resp.fileSizeLimitExceeded ) {
									this._errorMessage_Internal_ReturnedToCaller = "File NOT Uploaded, file too large.  Max file size in bytes: " + resp.maxSizeFormatted;
								} else if ( resp.ProjectLocked ) {
									this._errorMessage_Internal_ReturnedToCaller = "The project is locked so no imports are allowed.  Please reload the web page.";
								} else if ( resp.filenameInFormNotMatchFilenameInQueryString ) {
									this._errorMessage_Internal_ReturnedToCaller = "System Error";
								} else if ( resp.noUploadedFile ) {
									this._errorMessage_Internal_ReturnedToCaller = "System Error";
								} else if ( resp.limelightXMLFileFailsInitialParse ) {
									this._errorMessage_Internal_ReturnedToCaller = "This does not appear to be a Limelight XML file.  Please confirm that it is a valid Limelight XML file.";
								} else if ( resp.limelightXMLFilerootXMLNodeIncorrect ) {
									this._errorMessage_Internal_ReturnedToCaller = "This does not appear to be a Limelight XML file.  Please confirm that it is a valid Limelight XML file.";
								} else if ( resp.fastaFile_InvalidContents ) {
									this._errorMessage_Internal_ReturnedToCaller = "This does not appear to be a FASTA file.  Please confirm that it is a valid FASTA file.";
								} else if ( resp.submittedFASTAFileNotAllowed ) {
									this._errorMessage_Internal_ReturnedToCaller = "FASTA file is no longer allowed.  Please refresh the page.";
								} else if ( resp.submittedScanFileNotAllowed ) {
									this._errorMessage_Internal_ReturnedToCaller = "Scan files are no longer allowed.  Please refresh the page.";
								} else {
									this._errorMessage_Internal_ReturnedToCaller = "File NOT Uploaded, input data error, status 400";
								}
							}
						} else if (xhrStatus === 401 || xhrStatus === 403) {
							//  No Session or not Authorized
							let handledResponse = handleRawAJAXError( currentXHRinOnLoad );
							if ( handledResponse ) {

								//  Probably reloading the page

								reject()

								return;  //  EARLY RETURN;

							}
							if (xhrStatus === 401 ) {
								this._errorMessage_Internal_ReturnedToCaller = "File NOT Uploaded, server error, status 401";
							} else {
								this._errorMessage_Internal_ReturnedToCaller = "File NOT Uploaded, server error, status 403";
							}
						} else if (xhrStatus === 500) {
//					let resp = null;
//					try {
//					resp = JSON.parse(xhrResponse);
//					} catch(e){
//					resp = {
//					statusSuccess: false,
//					data: 'Unknown error occurred: [' + xhrResponseText + ']'
//					}
//					}
							this._errorMessage_Internal_ReturnedToCaller = "File NOT Uploaded, server error, status 500";
						} else if (xhrStatus === 404) {
//					let resp = null;
//					try {
//					resp = JSON.parse(xhrResponse);
//					} catch(e){
//					resp = {
//					statusSuccess: false,
//					data: 'Unknown error occurred: [' + xhrResponseText + ']'
//					}
//					}
							this._errorMessage_Internal_ReturnedToCaller = "File NOT Uploaded, Service not found on server. status 404";
						} else {
							this._errorMessage_Internal_ReturnedToCaller = "File upload failed. xhrStatus: " + xhrStatus;
						}


						reject();

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				}

				xmlHttpRequest.upload.addEventListener('error', function(event){
					try {
						objectThis._xmlHttpRequest_InProgress = undefined; ///  clear reference to XMLHttpRequest
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
					objectThis._xmlHttpRequest_InProgress = undefined; ///  clear reference to XMLHttpRequest
//			alert("Upload aborted");
				}, false);

				// xmlHttpRequest.upload.addEventListener('progress', function(event){
				// 	try {
				// 		let progressPercent = Math.ceil(( event.loaded / event.total) * 100 );
				// 		progressPercent = Math.min( progressPercent, 95 );  // Show max of 95
				// 		objectThis.progressBarUpdate( { progressPercent : progressPercent, $containingBlock : $containingBlock }  );
				// 	} catch( e ) {
				// 		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				// 		throw e;
				// 	}
				// }, false);

				const webserviceSyncTrackingCode = getWebserviceSyncTrackingCode();

				let postURL = "d/rws/for-page/project-upload-data-v2-upload-file-chunking-upload-file";

				xmlHttpRequest.open('POST', postURL);

				xmlHttpRequest.setRequestHeader( "Content-Type", "application/octet-stream" );

				//  Send values in Request Header

				xmlHttpRequest.setRequestHeader( LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM, webserviceSyncTrackingCode );

				//	   parameters added to the Request Header are available when the request is first received at the server.

				let uploadFileHeaderParams = {
					projectIdentifier : this._projectIdentifierFromURL, // string
					uploadKey : this._uploadKey,
					fileIndex : this._fileIndex,
					fileType : this._fileType,
					filename : this._filename,
					uniqueRequestIdentifier_ForThisFile,
					uploadFileSize,
					fileChunk_StartByte,
					fileChunk_SequenceNumber,
					sha256_Value_ForChunk: contentToSend_HashHex
				}
				let uploadFileHeaderParamsJSON = JSON.stringify( uploadFileHeaderParams );

				xmlHttpRequest.setRequestHeader( LIMELIGHT_UPLOAD_FILE_PARAMS_JSON__HEADER_PARAM, uploadFileHeaderParamsJSON );

				//  ES Lint reports useless try/catch so remove
				// try {
				//  Send File object from page <input type="file"> element instead of creating a Form and appending a File to it

				xmlHttpRequest.send( contentToSend );

				// } catch( e ) {
				// 	throw e;
				// }
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException: e
				});
				throw e;
			}
		});
	}

}
