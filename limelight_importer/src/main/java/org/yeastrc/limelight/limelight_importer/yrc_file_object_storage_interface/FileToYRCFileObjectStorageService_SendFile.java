/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_importer.yrc_file_object_storage_interface;

import java.io.File;
import java.math.BigInteger;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.file_object_storage.accept_import_web_app.webservice_connect.main.CallYRCFileObjectStoreWebservice;
import org.yeastrc.file_object_storage.accept_import_web_app.webservice_connect.main.CallYRCFileObjectStoreWebserviceInitParameters;
import org.yeastrc.file_object_storage.web_app.shared_server_client.webservice_request_response.main.UploadFile_AddFileFromFilenameAndPath_Request;
import org.yeastrc.file_object_storage.web_app.shared_server_client.webservice_request_response.main.UploadFile_AddFileFromFilenameAndPath_Response;
import org.yeastrc.file_object_storage.web_app.shared_server_client.webservice_request_response.main.UploadFile_UploadFile_Request;
import org.yeastrc.file_object_storage.web_app.shared_server_client.webservice_request_response.main.UploadFile_UploadFile_Response;
import org.yeastrc.limelight.limelight_importer.config.ImporterConfigFileData_OtherThanDBConfig;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterFileObjectStorageServiceErrorException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterFileObjectStorageServiceRetryExceededException;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;

/**
 * 
 *
 */
public class FileToYRCFileObjectStorageService_SendFile {

	private static final Logger log = LoggerFactory.getLogger( FileToYRCFileObjectStorageService_SendFile.class );
	
	private FileToYRCFileObjectStorageService_SendFile() { }
	public static FileToYRCFileObjectStorageService_SendFile getNewInstance() { return new FileToYRCFileObjectStorageService_SendFile(); }

	//  Overall Send File to YRC File Object Storage Service Retry Max and Delay
	
	private static final int OVERALL_SEND_FILE_RETRY_COUNT_MAX = 3;
	private static final int OVERALL_SEND_FILE_RETRY_DELAY = 2 * 1000; // 2 second

	//  Send File to YRC File Object Service Retry Max and Delay
	
	private static final int SEND_FILE_RETRY_COUNT_MAX = 10;
	private static final int SEND_FILE_RETRY_DELAY = 2 * 1000; // 2 second

	
	/**
	 * Result from main method call
	 * 
	 * 
	 * !!!  Also returned from method in class FileToYRCFileObjectStorageService_Send_AWS_S3_Location
	 *
	 */
	public static class FileToYRCFileObjectStorageService_SendFile__Result {
		
		public String ApiKey_Assigned;
		
		public boolean notConfigured;

		public String getApiKey_Assigned() {
			return ApiKey_Assigned;
		}
		/**
		 * @return true if not configured
		 */
		public boolean isNotConfigured() {
			return notConfigured;
		}
		
	}

	/**
	 * Send the File to YRC File Object Storage Service, return the API Key
	 * 
	 * @param fileWithPath
	 * @param gzipCompressContents - boolean
	 * @return object with YRC File Object Storage Service API Key assigned OR boolean notConfigured is true
	 * @throws Exception
	 * @throws LimelightImporterFileObjectStorageServiceErrorException
	 */
	public FileToYRCFileObjectStorageService_SendFile__Result sendFileToYRCFileObjectStorageService(
			
			File fileWithPath, boolean gzipCompressContents )
			throws Exception, LimelightImporterFileObjectStorageServiceErrorException {
		
		if ( fileWithPath == null ) {
			throw new IllegalArgumentException("Param: fileWithPath == null");
		}
		
		FileToYRCFileObjectStorageService_SendFile__Result methodResult = new FileToYRCFileObjectStorageService_SendFile__Result();
		
		String yrc_FileObjectStorageServiceBaseURL = 
				ConfigSystemTableGetValueCommon.getInstance()
				.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL );
		
		if ( StringUtils.isEmpty( yrc_FileObjectStorageServiceBaseURL ) ) {
			
			String msg = "No Config value for YRC File Object Storage Base URL, key: " + ConfigSystemsKeysSharedConstants.YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL;
			log.error( msg );
			methodResult.notConfigured = true;
			
			return methodResult;

			//  throw new LimelightImporterConfigurationException( msg );
		}
		
		//  retry this whole loop until successful or retries exceeded

		int retryCount = 0;

		while( true ) {  // use 'return ...' inside loop to exit

			retryCount++;
			
			if ( retryCount > 1 ) {
				
				String fileWithPath_String = null;
				if ( fileWithPath != null ) {
					fileWithPath_String = fileWithPath.getAbsolutePath();
				}
				log.warn( "Retrying overall Send to YRC File Object Storage Service.  Start over at InitUpload.  In sendFileToYRCFileObjectStorageService(...) retryCount: " 
						+ retryCount + ", fileWithPath: " + fileWithPath_String );
			}
			
			try {
				String methodResult__API_Key = null;
				
				
				CallYRCFileObjectStoreWebserviceInitParameters initParameters = new CallYRCFileObjectStoreWebserviceInitParameters();
				
				initParameters.setFileObjectStorageServerBaseURL( yrc_FileObjectStorageServiceBaseURL );

				CallYRCFileObjectStoreWebservice callYRCFileObjectStoreWebservice = CallYRCFileObjectStoreWebservice.getInstance();
				
				callYRCFileObjectStoreWebservice.init(initParameters);
								
				boolean sendFileLocationCompleteSuccessful = false;
				
				if ( ImporterConfigFileData_OtherThanDBConfig.isFileObjectStorageService_sendFileLocation() ) {
					
					boolean sendFileLocation = true;
					if ( ImporterConfigFileData_OtherThanDBConfig.getFileObjectStorageService_sendFileLocation_IfPathStartsWith() != null ) {
						String ifPathStartsWith = ImporterConfigFileData_OtherThanDBConfig.getFileObjectStorageService_sendFileLocation_IfPathStartsWith();
						String fileWithPath_CanonicalPathString = fileWithPath.getCanonicalPath();
						if ( ! fileWithPath_CanonicalPathString.startsWith( ifPathStartsWith ) ) {
							sendFileLocation = false;
						}
					}

					if ( sendFileLocation ) {

						if ( log.isInfoEnabled() ) {
							log.info( "INFO: Calling sendFilenameWithPathToFileObjectStorageService(...) fileWithPath: " + fileWithPath.getAbsolutePath() );
						}

						UploadFile_AddFileFromFilenameAndPath_Response uploadFile_AddFileFromFilenameAndPath_Response =
								sendFilenameWithPathToFileObjectStorageService( fileWithPath, gzipCompressContents, callYRCFileObjectStoreWebservice );

						if ( log.isInfoEnabled() ) {
							log.info( "INFO: After sendFilenameWithPathToFileObjectStorageService(...) fileWithPath: " + fileWithPath.getAbsolutePath() );
						}

						if ( uploadFile_AddFileFromFilenameAndPath_Response.isStatusSuccess() ) {

							sendFileLocationCompleteSuccessful = true;
							
							methodResult__API_Key = uploadFile_AddFileFromFilenameAndPath_Response.getApiKey_Assigned();

						} else {

							//  Check in this order since if isUploadFileWithPath_FilePathsAllowedNotConfigured is true, isUploadFileWithPath_FilePathNotAllowed is also set to true
							if ( uploadFile_AddFileFromFilenameAndPath_Response.isUploadFileWithPath_FilePathsAllowedNotConfigured() ) {

								//  Already reported in called method
//								log.warn( "Send of file with path to YRC File Object Storage Service rejected.  Will next send file contents" );
//								log.warn( "  ... addnl info: Limelight Importer configured to send file path to YRC File Object Storage Service but YRC File Object Storage Service not configured to accept File Locations." );
//								log.warn( "  ... addnl info: call sendFilenameWithPathToFileObjectStorageService(...) returned statusSuccess False" );

							} else if ( uploadFile_AddFileFromFilenameAndPath_Response.isUploadFileWithPath_FilePathNotAllowed() ) {

								//  Already reported in called method
//								log.warn( "Send of file with path to YRC File Object Storage Service rejected.  Will next send file contents" );
//								log.warn( "  ... addnl info: Limelight Importer configured to send file path to YRC File Object Storage Service but for this specific file, the file path was not allowed.  File with path (Java Get Canonical file with Path): "
//										+ fileWithPath.getCanonicalPath() );
//								log.warn( "  ... addnl info: call sendFilenameWithPathToFileObjectStorageService(...) returned statusSuccess False" );

							} else {
								String msg = "Send of file with path to YRC File Object Storage Service Failed.";
								log.warn( msg );
								log.warn( "  ... addnl info: call sendFilenameWithPathToFileObjectStorageService(...) returned statusSuccess False" );
								throw new LimelightImporterFileObjectStorageServiceErrorException( msg );
							}
						}
					}
				}

				if ( ! sendFileLocationCompleteSuccessful ) {

					//  Sending File with Path not done or not accepted, so sending the file contents

					if ( log.isInfoEnabled() ) {
						log.info( "INFO: Calling sendFileToYRCFileObjectStorageService_ActuallySendFile(...) fileWithPath: " + fileWithPath.getAbsolutePath() );
					}

					UploadFile_UploadFile_Response uploadFile_UploadFile_Response = 
							sendFileToYRCFileObjectStorageService_ActuallySendFile( fileWithPath, gzipCompressContents, callYRCFileObjectStoreWebservice );

					if ( log.isInfoEnabled() ) {
						log.info( "INFO: After sendFileToYRCFileObjectStorageService(...) (will next sleep for X seconds) fileWithPath: " + fileWithPath.getAbsolutePath() );
					}

					if ( ! uploadFile_UploadFile_Response.isStatusSuccess() ) {
						String msg = "Send of file Contents to YRC File Object Storage Service Failed.";
						log.warn( msg );
						log.warn( "  ... addnl info: call sendFileToYRCFileObjectStorageService_ActuallySendFile(...) returned statusSuccess False" );

						throw new LimelightImporterFileObjectStorageServiceErrorException( msg );
					}

					//  Thread.sleep( 2000 ); // sleep in milliseconds
					

					methodResult__API_Key = uploadFile_UploadFile_Response.getApiKey_Assigned();
				}
				
				
				if ( log.isInfoEnabled() ) {
					log.info( "INFO: Calling submitFileToFileObjectStorageService(...) fileWithPath: " + fileWithPath.getAbsolutePath() );
				}
								
				//  Thread.sleep( 3000 ); // 3 second sleep
				
				//   return HERE from method to EXIT LOOP
				
				methodResult.ApiKey_Assigned = methodResult__API_Key;
				
				return methodResult;
				
				
			} catch ( Exception e ) {

				if ( retryCount < OVERALL_SEND_FILE_RETRY_COUNT_MAX ) {
					
					String msg = "Will Retry: Overall Send failed: Failed to send file to YRC File Object Storage. retryCount: " + retryCount;
					log.warn(msg);
					
				} else {
					String msg = "Overall Send: Failed to send file to YRC File Object Storage";
					log.error( msg, e );
					throw e;
				}
			}

			Thread.sleep( OVERALL_SEND_FILE_RETRY_DELAY ); // Sleep wait for retry
		}
	}

	/**
	 * @param uploadFile_Init_Response
	 * @param fileWithPath
	 * @param scanFileDTO
	 * @param callYRCFileObjectStoreWebservice
	 * @return
	 * @throws LimelightImporterDataException
	 */
	private UploadFile_UploadFile_Response sendFileToYRCFileObjectStorageService_ActuallySendFile( 
			File fileWithPath, 
			boolean gzipCompressContents,
			CallYRCFileObjectStoreWebservice callYRCFileObjectStoreWebservice ) throws Exception {

		UploadFile_UploadFile_Response response = null;
		
		boolean uploadFileTempKey_NotFound_ErrorResponse = false;

		int retryCount = 0;

		while( true ) {  // use 'break;' inside loop to exit

			retryCount++;

			if ( retryCount > SEND_FILE_RETRY_COUNT_MAX ) {
				String msg = "Send File to YRC File Object Storage Service. Actually send the file. In sendFileToYRCFileObjectStorageService_ActuallySendFile():  failed for retryCount > SEND_FILE_RETRY_COUNT.  StatusSuccess: " + response.isStatusSuccess()
					+ ", File: " + fileWithPath.getAbsolutePath();
				log.error( msg );
				throw new LimelightImporterFileObjectStorageServiceRetryExceededException(msg);
			}
			
			if ( retryCount > 1 ) {
				log.warn( "In sendFileToYRCFileObjectStorageService_ActuallySendFile(...) retryCount: " + retryCount + ", fileWithPath: " + fileWithPath.getAbsolutePath() );
				
			}
			

			UploadFile_UploadFile_Request uploadFile_UploadFile_Request = new UploadFile_UploadFile_Request();
			uploadFile_UploadFile_Request.setFile( fileWithPath );
			uploadFile_UploadFile_Request.setGzipCompressContents(gzipCompressContents);
			
			try {
				//  Send file to YRC File Object Storage Service
				response = callYRCFileObjectStoreWebservice.call_UploadFile_UploadFile_Service( uploadFile_UploadFile_Request );

				if ( ! response.isStatusSuccess() ) {
					String msg = "Send File to YRC File Object Storage Service. Actually send the file. In sendFileToYRCFileObjectStorageService_ActuallySendFile(): call_UploadFile_UploadFile_Service return StatusSuccess false. File: " + fileWithPath.getAbsolutePath();
					log.error( msg );
					throw new LimelightImporterFileObjectStorageServiceErrorException(msg);
				}

				break;  //  EXIT LOOP
				
			} catch ( Exception e ) {

				if ( retryCount == SEND_FILE_RETRY_COUNT_MAX || uploadFileTempKey_NotFound_ErrorResponse ) {
					String scanProcessStatusKeyResponsePart = ", response from YRC File Object Storage Service call interface is null (call may have thrown exception).";
					if ( response != null ) {
						scanProcessStatusKeyResponsePart = " StatusSuccess: " + response.isStatusSuccess();
					}
					
					String msg = "Send File to YRC File Object Storage Service. Actually send the file. In sendFileToYRCFileObjectStorageService_ActuallySendFile(): call_UploadFile_UploadFile_Service threw exception and failed for retryCount == SEND_FILE_RETRY_COUNT or uploadFileTempKey_NotFound_ErrorResponse is true. uploadFileTempKey_NotFound_ErrorResponse: " 
							+ uploadFileTempKey_NotFound_ErrorResponse
							+ ", scanProcessStatusKeyResponsePar: " + scanProcessStatusKeyResponsePart
							+ ", File: " + fileWithPath.getAbsolutePath();
					log.error( msg, e );
					throw new LimelightImporterFileObjectStorageServiceErrorException( msg, e );
				}
			}

			Thread.sleep( SEND_FILE_RETRY_DELAY ); // Sleep wait for retry
		}
		
		return response;
	}

	/**
	 * @param fileWithPath
	 * @param callYRCFileObjectStoreWebservice
	 * @return
	 * @throws LimelightImporterDataException
	 */
	private UploadFile_AddFileFromFilenameAndPath_Response sendFilenameWithPathToFileObjectStorageService( 
			File fileWithPath, 
			boolean gzipCompressContents,
			CallYRCFileObjectStoreWebservice callYRCFileObjectStoreWebservice ) throws Exception {

		UploadFile_AddFileFromFilenameAndPath_Request webserviceRequest = new UploadFile_AddFileFromFilenameAndPath_Request();
		
		webserviceRequest.setFilenameWithPath( fileWithPath.getAbsolutePath() );
		webserviceRequest.setFileSize( BigInteger.valueOf( fileWithPath.length() ) );
		webserviceRequest.setGzipCompressTheStoredFile(gzipCompressContents);
		
		UploadFile_AddFileFromFilenameAndPath_Response response = null;
		
		int retryCount = 0;

		while( true ) {  // use 'break;' inside loop to exit

			retryCount++;

			if ( retryCount > SEND_FILE_RETRY_COUNT_MAX ) {
				String msg = "Send Filename with Path to YRC File Object Storage Service. Actually send the filename with Path. In sendFilenameWithPathToFileObjectStorageService():  failed for retryCount > SEND_FILE_RETRY_COUNT.  StatusSuccess: " + response.isStatusSuccess()
					+ ", File: " + fileWithPath.getAbsolutePath();
				log.error( msg );
				throw new LimelightImporterFileObjectStorageServiceRetryExceededException(msg);
			}
			
			if ( retryCount > 1 ) {
				log.warn( "In sendFilenameWithPathToFileObjectStorageService(...) retryCount: " + retryCount + ", fileWithPath: " + fileWithPath.getAbsolutePath() );
				
			}

			try {
				//  Send file to YRC File Object Storage Service
				response = callYRCFileObjectStoreWebservice.call_UploadFile_AddFileFromFilenameAndPath_Webservice(webserviceRequest);

				if ( ! response.isStatusSuccess() ) {

					//  Check in this order since if isUploadFileWithPath_FilePathsAllowedNotConfigured is true, isUploadFileWithPath_FilePathNotAllowed is also set to true

					if ( response.isUploadFileWithPath_FilePathsAllowedNotConfigured() ) {

						log.warn( "Send of file with path to YRC File Object Storage Service rejected.  Will next send file contents" );
						log.warn( "  ... addnl info: Limelight Importer configured to send file path to YRC File Object Storage Service but YRC File Object Storage Service not configured to accept File Locations." );
						log.warn( "  ... addnl info: call sendFilenameWithPathToFileObjectStorageService(...) returned statusSuccess False" );

						return response; // EARLY EXIT

					} else if ( response.isUploadFileWithPath_FilePathNotAllowed() ) {

						log.warn( "Send of file with path to YRC File Object Storage Service rejected.  Will next send file contents" );
						log.warn( "  ... addnl info: Limelight Importer configured to send file path to YRC File Object Storage Service but for this specific file, the file path was not allowed.  File with path (Java Get Canonical file with Path): "
								+ fileWithPath.getCanonicalPath() );
						log.warn( "  ... addnl info: call sendFilenameWithPathToFileObjectStorageService(...) returned statusSuccess False" );

						return response; // EARLY EXIT
					}
					
					String msg = "Send File to YRC File Object Storage Service. Send the file location. In sendFilenameWithPathToFileObjectStorageService(): call_UploadFile_UploadFile_Service return StatusSuccess false.   " 
							 + " File: " + fileWithPath.getAbsolutePath();
					log.error( msg );
					throw new LimelightImporterFileObjectStorageServiceErrorException(msg);
				}

				break;  //  EXIT LOOP
				
			} catch ( Exception e ) {

				if ( retryCount == SEND_FILE_RETRY_COUNT_MAX ) {
					String scanProcessStatusKeyResponsePart = ", response from YRC File Object Storage Service call interface is null (call may have thrown exception).";
					if ( response != null ) {
						scanProcessStatusKeyResponsePart = " StatusSuccess: " + response.isStatusSuccess()
						 + " File: " + fileWithPath.getAbsolutePath();
					}
					
					String msg = "Send File to YRC File Object Storage Service. Send the file location. In sendFilenameWithPathToFileObjectStorageService(): call_UploadFile_UploadFile_Service threw exception and failed for retryCount == SEND_FILE_RETRY_COUNT. scanProcessStatusKeyResponsePar: " + scanProcessStatusKeyResponsePart
							+ ", File: " + fileWithPath.getAbsolutePath();
					log.error( msg, e );
					throw new LimelightImporterFileObjectStorageServiceErrorException( msg, e );
				}
			}

			Thread.sleep( SEND_FILE_RETRY_DELAY ); // Sleep wait for retry
		}
		
		return response;
	}
	
}
