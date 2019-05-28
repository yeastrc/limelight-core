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
package org.yeastrc.limelight.limelight_importer.spectral_storage_service_interface;

import java.io.File;
import java.math.BigInteger;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.config.ImporterConfigFileData_OtherThanDBConfig;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterConfigurationException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterSpectralStorageServiceErrorException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterSpectralStorageServiceRetryExceededException;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_AddScanFileFromFilenameAndPath_Request;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_AddScanFileFromFilenameAndPath_Response;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_Init_Request;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_Init_Response;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_Submit_Request;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_Submit_Response;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_UploadScanFile_Request;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_UploadScanFile_Response;
import org.yeastrc.spectral_storage.accept_import_web_app.webservice_connect.main.CallSpectralStorageAcceptImportWebservice;
import org.yeastrc.spectral_storage.accept_import_web_app.webservice_connect.main.CallSpectralStorageAcceptImportWebserviceInitParameters;

/**
 * 
 *
 */
public class ScanFileToSpectralStorageService_SendFile {

	private static final Logger log = LoggerFactory.getLogger( ScanFileToSpectralStorageService_SendFile.class );
	
	private ScanFileToSpectralStorageService_SendFile() { }
	public static ScanFileToSpectralStorageService_SendFile getInstance() { return new ScanFileToSpectralStorageService_SendFile(); }

	//  Overall Send Scan File to Spectral Storage Service Retry Max and Delay
	
	private static final int OVERALL_SEND_FILE_RETRY_COUNT_MAX = 3;
	private static final int OVERALL_SEND_FILE_RETRY_DELAY = 2 * 1000; // 2 second

	//  Send Scan File to Spectral Storage Service Retry Max and Delay
	
	private static final int SEND_FILE_RETRY_COUNT_MAX = 10;
	private static final int SEND_FILE_RETRY_DELAY = 2 * 1000; // 2 second


	/**
	 * Send the scan file to the Spectral Storage Service, return the API Process Key
	 * 
	 * @param scanFileWithPath
	 * @return Spectral Storage Service API Process Key
	 * @throws Exception
	 */
	public String sendScanFileToSpectralStorageService( File scanFileWithPath ) throws Exception {
		
		String spectralStorageServiceBaseURL = 
				ConfigSystemTableGetValueCommon.getInstance()
				.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_ACCEPT_IMPORT_BASE_URL );
		
		if ( StringUtils.isEmpty( spectralStorageServiceBaseURL ) ) {
			String msg = "No Config value for Spectral Storage Base URL, key: " + ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_ACCEPT_IMPORT_BASE_URL;
			log.error( msg );
			throw new LimelightImporterConfigurationException( msg );
		}
		
		//  retry this whole loop until successful or retries exceeded

		int retryCount = 0;

		while( true ) {  // use 'return;' inside loop to exit

			retryCount++;
			
			if ( retryCount > 1 ) {
				log.warn( "Retrying overall Send to Spectral Storage Service.  Start over at InitUpload.  In sendScanFileToSpectralStorageService(...) retryCount: " + retryCount + ", scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
			}
			
			try {
				CallSpectralStorageAcceptImportWebserviceInitParameters initParams = new CallSpectralStorageAcceptImportWebserviceInitParameters();
	
				initParams.setSpectralStorageServerBaseURL( spectralStorageServiceBaseURL );
	
				CallSpectralStorageAcceptImportWebservice callSpectralStorageAcceptImportWebservice = CallSpectralStorageAcceptImportWebservice.getInstance();
	
				callSpectralStorageAcceptImportWebservice.init( initParams );
				
				if ( log.isInfoEnabled() ) {
					log.info( "INFO: Calling spectralStorageService_InitUploadScanFileProcess(...) scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
				}
				
				UploadScanFile_Init_Response uploadScanFile_Init_Response =
						spectralStorageService_InitUploadScanFileProcess( scanFileWithPath, callSpectralStorageAcceptImportWebservice );
				
				if ( ! uploadScanFile_Init_Response.isStatusSuccess() ) {
					String msg = "call spectralStorageService_InitUploadScanFileProcess(...) returned statusSuccess False";
					log.warn( msg );
					throw new LimelightImporterSpectralStorageServiceErrorException( msg );
				}
	
				if ( log.isInfoEnabled() ) {
					log.info( "INFO: spectralStorageService_InitUploadScanFileProcess(...) uploadScanFile_Init_Response.UploadScanFileTempKey: " 
							+ uploadScanFile_Init_Response.getUploadScanFileTempKey() );
				}
				
				Thread.sleep( 2000 ); // 2 second sleep
				
				boolean sendScanFileLocationCompleteSuccessful = false;
				
				if ( ImporterConfigFileData_OtherThanDBConfig.isSpectralStorageService_sendScanFileLocation() ) {
					
					boolean sendScanFileLocation = true;
					if ( ImporterConfigFileData_OtherThanDBConfig.getSpectralStorageService_sendScanFileLocation_IfPathStartsWith() != null ) {
						String ifPathStartsWith = ImporterConfigFileData_OtherThanDBConfig.getSpectralStorageService_sendScanFileLocation_IfPathStartsWith();
						String scanFileWithPath_CanonicalPathString = scanFileWithPath.getCanonicalPath();
						if ( ! scanFileWithPath_CanonicalPathString.startsWith( ifPathStartsWith ) ) {
							sendScanFileLocation = false;
						}
					}

					if ( sendScanFileLocation ) {

						if ( log.isInfoEnabled() ) {
							log.info( "INFO: Calling sendScanFilenameWithPathToSpectralStorageService(...) scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
						}

						UploadScanFile_AddScanFileFromFilenameAndPath_Response uploadScanFile_AddScanFileFromFilenameAndPath_Response =
								sendScanFilenameWithPathToSpectralStorageService( uploadScanFile_Init_Response, scanFileWithPath, callSpectralStorageAcceptImportWebservice );

						if ( log.isInfoEnabled() ) {
							log.info( "INFO: After sendScanFilenameWithPathToSpectralStorageService(...) scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
						}

						if ( uploadScanFile_AddScanFileFromFilenameAndPath_Response.isStatusSuccess() ) {

							sendScanFileLocationCompleteSuccessful = true;

						} else {

							//  Check in this order since if isUploadScanFileWithPath_FilePathsAllowedNotConfigured is true, isUploadScanFileWithPath_FilePathNotAllowed is also set to true
							if ( uploadScanFile_AddScanFileFromFilenameAndPath_Response.isUploadScanFileWithPath_FilePathsAllowedNotConfigured() ) {

								//  Already reported in called method
//								log.warn( "Send of Scan file with path to Spectral Storage Service rejected.  Will next send scan file contents" );
//								log.warn( "  ... addnl info: Limelight Importer configured to send Scan file path to Spectral Storage Service but Spectral Storage Service not configured to accept Scan File Locations." );
//								log.warn( "  ... addnl info: call sendScanFilenameWithPathToSpectralStorageService(...) returned statusSuccess False" );

							} else if ( uploadScanFile_AddScanFileFromFilenameAndPath_Response.isUploadScanFileWithPath_FilePathNotAllowed() ) {

								//  Already reported in called method
//								log.warn( "Send of Scan file with path to Spectral Storage Service rejected.  Will next send scan file contents" );
//								log.warn( "  ... addnl info: Limelight Importer configured to send Scan file path to Spectral Storage Service but for this specific scan file, the Scan file path was not allowed.  Scan File with path (Java Get Canonical file with Path): "
//										+ scanFileWithPath.getCanonicalPath() );
//								log.warn( "  ... addnl info: call sendScanFilenameWithPathToSpectralStorageService(...) returned statusSuccess False" );

							} else {
								String msg = "Send of Scan file with path to Spectral Storage Service Failed.";
								log.warn( msg );
								log.warn( "  ... addnl info: call sendScanFilenameWithPathToSpectralStorageService(...) returned statusSuccess False" );
								if ( uploadScanFile_AddScanFileFromFilenameAndPath_Response.isUploadScanFileTempKey_NotFound() ) {
									log.warn( "  ... addnl info: For some reason the key returned by the init call is no longer in the system at Spectral Storage Service.  submitScanFileToSpectralStorageService(...) returned 'UploadScanFileTempKey_NotFound' true. UploadScanFileTempKey: " 
											+ uploadScanFile_Init_Response.getUploadScanFileTempKey() );
								}
								if ( uploadScanFile_AddScanFileFromFilenameAndPath_Response.isUploadScanFileTempKey_Expired() ) {
									log.warn( "  ... addnl info: Too much time has elapsed since the call to the start of this submit scan file to spectral storage service (too much time since call to init). submitScanFileToSpectralStorageService(...) returned 'UploadScanFileTempKey_Expired' true. UploadScanFileTempKey: " 
											+ uploadScanFile_Init_Response.getUploadScanFileTempKey() );
								}
								if ( uploadScanFile_AddScanFileFromFilenameAndPath_Response.isUploadScanFileTempKey_NotFound() ) {
									log.warn( "  ... addnl info: sendScanFilenameWithPathToSpectralStorageService(...) returned 'UploadScanFileTempKey_NotFound' true. UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey() );
								}
								if ( uploadScanFile_AddScanFileFromFilenameAndPath_Response.isUploadScanFileTempKey_Expired() ) {
									log.warn( "  ... addnl info: sendScanFilenameWithPathToSpectralStorageService(...) returned 'UploadScanFileTempKey_Expired' true. UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey() );
								}
								throw new LimelightImporterSpectralStorageServiceErrorException( msg );
							}
						}
					}
				}

				if ( ! sendScanFileLocationCompleteSuccessful ) {

					//  Sending Scan File with Path not done or not accepted, so sending the file contents

					if ( log.isInfoEnabled() ) {
						log.info( "INFO: Calling sendScanFileToSpectralStorageService_ActuallySendScanFile(...) scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
					}

					UploadScanFile_UploadScanFile_Response uploadScanFile_UploadScanFile_Response = 
							sendScanFileToSpectralStorageService_ActuallySendScanFile( uploadScanFile_Init_Response, scanFileWithPath, callSpectralStorageAcceptImportWebservice );

					if ( log.isInfoEnabled() ) {
						log.info( "INFO: After sendScanFileToSpectralStorageService(...) (will next sleep for X seconds) scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
					}

					if ( ! uploadScanFile_UploadScanFile_Response.isStatusSuccess() ) {
						String msg = "Send of Scan file Contents to Spectral Storage Service Failed.";
						log.warn( msg );
						log.warn( "  ... addnl info: call sendScanFileToSpectralStorageService_ActuallySendScanFile(...) returned statusSuccess False" );
						if ( uploadScanFile_UploadScanFile_Response.isUploadScanFileTempKey_NotFound() ) {
							log.warn( "  ... addnl info: For some reason the key returned by the init call is no longer in the system at Spectral Storage Service.  submitScanFileToSpectralStorageService(...) returned 'UploadScanFileTempKey_NotFound' true. UploadScanFileTempKey: " 
									+ uploadScanFile_Init_Response.getUploadScanFileTempKey() );
						}
						if ( uploadScanFile_UploadScanFile_Response.isUploadScanFileTempKey_Expired() ) {
							log.warn( "  ... addnl info: Too much time has elapsed since the call to the start of this submit scan file to spectral storage service (too much time since call to init). submitScanFileToSpectralStorageService(...) returned 'UploadScanFileTempKey_Expired' true. UploadScanFileTempKey: " 
									+ uploadScanFile_Init_Response.getUploadScanFileTempKey() );
						}
						if ( uploadScanFile_UploadScanFile_Response.isUploadScanFileTempKey_NotFound() ) {
							log.warn( "  ... addnl info: sendScanFileToSpectralStorageService_ActuallySendScanFile(...) returned 'UploadScanFileTempKey_NotFound' true. UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey() );
						}
						if ( uploadScanFile_UploadScanFile_Response.isUploadScanFileTempKey_Expired() ) {
							log.warn( "  ... addnl info: sendScanFileToSpectralStorageService_ActuallySendScanFile(...) returned 'UploadScanFileTempKey_Expired' true. UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey() );
						}

						throw new LimelightImporterSpectralStorageServiceErrorException( msg );
					}

					Thread.sleep( 2000 ); // sleep in milliseconds
				}
				
				
				if ( log.isInfoEnabled() ) {
					log.info( "INFO: Calling submitScanFileToSpectralStorageService(...) scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
				}
				
				UploadScanFile_Submit_Response uploadScanFile_Submit_Response =
						submitScanFileToSpectralStorageService( 
								uploadScanFile_Init_Response,
								scanFileWithPath, 
								callSpectralStorageAcceptImportWebservice );
				
				if ( ! uploadScanFile_Submit_Response.isStatusSuccess() ) {
					String msg = "Call to Spectral Storage Service failed.  call submitScanFileToSpectralStorageService(...) returned statusSuccess False";
					log.warn( msg );
					if ( uploadScanFile_Submit_Response.isUploadScanFileTempKey_NotFound() ) {
						log.warn( "For some reason the key returned by the init call is no longer in the system at Spectral Storage Service.  submitScanFileToSpectralStorageService(...) returned 'UploadScanFileTempKey_NotFound' true. UploadScanFileTempKey: " 
								+ uploadScanFile_Init_Response.getUploadScanFileTempKey() );
					}
					if ( uploadScanFile_Submit_Response.isUploadScanFileTempKey_Expired() ) {
						log.warn( "Too much time has elapsed since the call to the start of this submit scan file to spectral storage service (too much time since call to init). submitScanFileToSpectralStorageService(...) returned 'UploadScanFileTempKey_Expired' true. UploadScanFileTempKey: " 
								+ uploadScanFile_Init_Response.getUploadScanFileTempKey() );
					}
					throw new LimelightImporterSpectralStorageServiceErrorException( msg );
				}

				if ( log.isInfoEnabled() ) {
					log.info( "INFO: After Call submitScanFileToSpectralStorageService(...) uploadScanFile_Submit_Response.isStatusSuccess(): "  
							+ uploadScanFile_Submit_Response.isStatusSuccess()
							+ ", uploadScanFile_Submit_Response.getScanProcessStatusKey(): " 
							+ uploadScanFile_Submit_Response.getScanProcessStatusKey()
							+ ", scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
				}
				
				Thread.sleep( 3000 ); // 3 second sleep
				
				return uploadScanFile_Submit_Response.getScanProcessStatusKey();
				
			} catch ( Exception e ) {

				if ( retryCount < OVERALL_SEND_FILE_RETRY_COUNT_MAX ) {
					
					String msg = "Will Retry: Overall Send failed: Failed to send scan file to Spectral Storage. retryCount: " + retryCount;
					log.warn(msg);
					
				} else {
					String msg = "Overall Send: Failed to send scan file to Spectral Storage";
					log.error( msg, e );
					throw e;
				}
			}

			Thread.sleep( OVERALL_SEND_FILE_RETRY_DELAY ); // Sleep wait for retry
		}
	}

	/**
	 * @param scanFileWithPath
	 * @param scanFileDTO
	 * @param callSpectralStorageAcceptImportWebservice
	 * @return
	 * @throws LimelightImporterDataException
	 */
	private UploadScanFile_Init_Response spectralStorageService_InitUploadScanFileProcess( 
			File scanFileWithPath, 
			CallSpectralStorageAcceptImportWebservice callSpectralStorageAcceptImportWebservice ) throws Exception {

		UploadScanFile_Init_Response response = null;

		int retryCount = 0;

		while( true ) {  // use 'break;' inside loop to exit

			retryCount++;

			if ( retryCount > SEND_FILE_RETRY_COUNT_MAX ) {
				String msg = "spectralStorageService_InitUploadScanFileProcess failed for retryCount > SEND_FILE_RETRY_COUNT.  UploadScanFileTempKey: " + response.getUploadScanFileTempKey()
					+ ", Scan File: " + scanFileWithPath.getAbsolutePath();
				log.error( msg );
				throw new LimelightImporterSpectralStorageServiceRetryExceededException(msg);
			}
			
			if ( retryCount > 1 ) {
				log.warn( "In spectralStorageService_InitUploadScanFileProcess(...) retryCount: " + retryCount + ", scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
			}
			
			UploadScanFile_Init_Request webserviceRequest = new UploadScanFile_Init_Request();
			
			try {
				//  Send scan file to Spectral Storage Service
				response = callSpectralStorageAcceptImportWebservice.call_UploadScanFile_Init_Webservice( webserviceRequest );

				if ( ! response.isStatusSuccess() ) {
					String msg = "Send Scan File to Spectral Storage Service:  Call to call_UploadScanFile_Init_Webservice(...) response StatusSuccess is false.  UploadScanFileTempKey: " 
							 + response.getUploadScanFileTempKey()
							 + ", Scan File: " + scanFileWithPath.getAbsolutePath();
					log.error( msg );
					throw new LimelightImporterSpectralStorageServiceErrorException(msg);
				}

				break;  //  EXIT LOOP
				
			} catch ( Exception e ) {

				if ( retryCount == SEND_FILE_RETRY_COUNT_MAX ) {
					String scanProcessStatusKeyResponsePart = ", response from Spectral Storage Service call interface is null (call may have thrown exception).";
					if ( response != null ) {
						scanProcessStatusKeyResponsePart = " UploadScanFileTempKey: " + response.getUploadScanFileTempKey();
					}
					
					String msg = "Send Scan File to Spectral Storage Service:  Call to call_UploadScanFile_Init_Webservice(...) hrew exception and failed for retryCount == SEND_FILE_RETRY_COUNT. " + scanProcessStatusKeyResponsePart
						+ ", Scan File: " + scanFileWithPath.getAbsolutePath();
					log.error( msg, e );
					throw new LimelightImporterSpectralStorageServiceErrorException( msg, e );
				}
			}

			Thread.sleep( SEND_FILE_RETRY_DELAY ); // Sleep wait for retry
		}
		
		return response;
	}
	
	/**
	 * @param uploadScanFile_Init_Response
	 * @param scanFileWithPath
	 * @param scanFileDTO
	 * @param callSpectralStorageAcceptImportWebservice
	 * @return
	 * @throws LimelightImporterDataException
	 */
	private UploadScanFile_UploadScanFile_Response sendScanFileToSpectralStorageService_ActuallySendScanFile( 
			UploadScanFile_Init_Response uploadScanFile_Init_Response,
			File scanFileWithPath, 
			CallSpectralStorageAcceptImportWebservice callSpectralStorageAcceptImportWebservice ) throws Exception {

		UploadScanFile_UploadScanFile_Response response = null;
		
		boolean uploadScanFileTempKey_NotFound_ErrorResponse = false;

		int retryCount = 0;

		while( true ) {  // use 'break;' inside loop to exit

			retryCount++;

			if ( retryCount > SEND_FILE_RETRY_COUNT_MAX ) {
				String msg = "Send Scan File to Spectral Storage Service. Actually send the file. In sendScanFileToSpectralStorageService_ActuallySendScanFile():  failed for retryCount > SEND_FILE_RETRY_COUNT.  StatusSuccess: " + response.isStatusSuccess()
					+ ", UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey()
					+ ", Scan File: " + scanFileWithPath.getAbsolutePath();
				log.error( msg );
				throw new LimelightImporterSpectralStorageServiceRetryExceededException(msg);
			}
			
			if ( retryCount > 1 ) {
				log.warn( "In sendScanFileToSpectralStorageService_ActuallySendScanFile(...) retryCount: " + retryCount + ", scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
				
			}
			

			UploadScanFile_UploadScanFile_Request uploadScanFile_UploadScanFile_Request = new UploadScanFile_UploadScanFile_Request();
			uploadScanFile_UploadScanFile_Request.setUploadScanFileTempKey( uploadScanFile_Init_Response.getUploadScanFileTempKey() );
			uploadScanFile_UploadScanFile_Request.setScanFile( scanFileWithPath );
			
			try {
				//  Send scan file to Spectral Storage Service
				response = callSpectralStorageAcceptImportWebservice.call_UploadScanFile_UploadScanFile_Service( uploadScanFile_UploadScanFile_Request );

				if ( ! response.isStatusSuccess() ) {
					if ( response.isUploadScanFileTempKey_NotFound() ) {
						uploadScanFileTempKey_NotFound_ErrorResponse = true;
						String msg = "Send Scan File to Spectral Storage Service. Actually send the file. In sendScanFileToSpectralStorageService_ActuallySendScanFile(): call_UploadScanFile_UploadScanFile_Service return UploadScanFileTempKey_NotFound true.  UploadScanFileTempKey: " 
								 + uploadScanFile_Init_Response.getUploadScanFileTempKey()
								 + ", Scan File: " + scanFileWithPath.getAbsolutePath();
						log.error( msg );
					}
					String msg = "Send Scan File to Spectral Storage Service. Actually send the file. In sendScanFileToSpectralStorageService_ActuallySendScanFile(): call_UploadScanFile_UploadScanFile_Service return StatusSuccess false.  UploadScanFileTempKey: " 
							 + uploadScanFile_Init_Response.getUploadScanFileTempKey()
							 + ", Scan File: " + scanFileWithPath.getAbsolutePath();
					log.error( msg );
					throw new LimelightImporterSpectralStorageServiceErrorException(msg);
				}

				break;  //  EXIT LOOP
				
			} catch ( Exception e ) {

				if ( retryCount == SEND_FILE_RETRY_COUNT_MAX || uploadScanFileTempKey_NotFound_ErrorResponse ) {
					String scanProcessStatusKeyResponsePart = ", response from Spectral Storage Service call interface is null (call may have thrown exception).";
					if ( response != null ) {
						scanProcessStatusKeyResponsePart = " StatusSuccess: " + response.isStatusSuccess()
							+ ", UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey();
					}
					
					String msg = "Send Scan File to Spectral Storage Service. Actually send the file. In sendScanFileToSpectralStorageService_ActuallySendScanFile(): call_UploadScanFile_UploadScanFile_Service threw exception and failed for retryCount == SEND_FILE_RETRY_COUNT or uploadScanFileTempKey_NotFound_ErrorResponse is true. uploadScanFileTempKey_NotFound_ErrorResponse: " 
							+ uploadScanFileTempKey_NotFound_ErrorResponse
							+ ", scanProcessStatusKeyResponsePar: " + scanProcessStatusKeyResponsePart
							+ ", Scan File: " + scanFileWithPath.getAbsolutePath();
					log.error( msg, e );
					throw new LimelightImporterSpectralStorageServiceErrorException( msg, e );
				}
			}

			Thread.sleep( SEND_FILE_RETRY_DELAY ); // Sleep wait for retry
		}
		
		return response;
	}

	/**
	 * @param uploadScanFile_Init_Response
	 * @param scanFileWithPath
	 * @param scanFileDTO
	 * @param callSpectralStorageAcceptImportWebservice
	 * @return
	 * @throws LimelightImporterDataException
	 */
	private UploadScanFile_AddScanFileFromFilenameAndPath_Response sendScanFilenameWithPathToSpectralStorageService( 
			UploadScanFile_Init_Response uploadScanFile_Init_Response,
			File scanFileWithPath, 
			CallSpectralStorageAcceptImportWebservice callSpectralStorageAcceptImportWebservice ) throws Exception {

		UploadScanFile_AddScanFileFromFilenameAndPath_Response response = null;
		
		boolean uploadScanFileTempKey_NotFound_ErrorResponse = false;

		int retryCount = 0;

		while( true ) {  // use 'break;' inside loop to exit

			retryCount++;

			if ( retryCount > SEND_FILE_RETRY_COUNT_MAX ) {
				String msg = "Send Scan Filename with Path to Spectral Storage Service. Actually send the filename with Path. In sendScanFilenameWithPathToSpectralStorageService():  failed for retryCount > SEND_FILE_RETRY_COUNT.  StatusSuccess: " + response.isStatusSuccess()
					+ ", UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey()
					+ ", Scan File: " + scanFileWithPath.getAbsolutePath();
				log.error( msg );
				throw new LimelightImporterSpectralStorageServiceRetryExceededException(msg);
			}
			
			if ( retryCount > 1 ) {
				log.warn( "In sendScanFilenameWithPathToSpectralStorageService(...) retryCount: " + retryCount + ", scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
				
			}
			

			UploadScanFile_AddScanFileFromFilenameAndPath_Request uploadScanFile_AddScanFileFromFilenameAndPath_Request = new UploadScanFile_AddScanFileFromFilenameAndPath_Request();
			uploadScanFile_AddScanFileFromFilenameAndPath_Request.setUploadScanFileTempKey( uploadScanFile_Init_Response.getUploadScanFileTempKey() );
			uploadScanFile_AddScanFileFromFilenameAndPath_Request.setFilenameWithPath( scanFileWithPath.getAbsolutePath() );
			uploadScanFile_AddScanFileFromFilenameAndPath_Request.setFileSize( BigInteger.valueOf( scanFileWithPath.length() ) );
			
			try {
				//  Send scan file to Spectral Storage Service
				response = callSpectralStorageAcceptImportWebservice.call_UploadScanFile_AddScanFileFromFilenameAndPath_Webservice( uploadScanFile_AddScanFileFromFilenameAndPath_Request );

				if ( ! response.isStatusSuccess() ) {

					//  Check in this order since if isUploadScanFileWithPath_FilePathsAllowedNotConfigured is true, isUploadScanFileWithPath_FilePathNotAllowed is also set to true

					if ( response.isUploadScanFileWithPath_FilePathsAllowedNotConfigured() ) {

						log.warn( "Send of Scan file with path to Spectral Storage Service rejected.  Will next send scan file contents" );
						log.warn( "  ... addnl info: Limelight Importer configured to send Scan file path to Spectral Storage Service but Spectral Storage Service not configured to accept Scan File Locations." );
						log.warn( "  ... addnl info: call sendScanFilenameWithPathToSpectralStorageService(...) returned statusSuccess False" );

						return response; // EARLY EXIT

					} else if ( response.isUploadScanFileWithPath_FilePathNotAllowed() ) {

						log.warn( "Send of Scan file with path to Spectral Storage Service rejected.  Will next send scan file contents" );
						log.warn( "  ... addnl info: Limelight Importer configured to send Scan file path to Spectral Storage Service but for this specific scan file, the Scan file path was not allowed.  Scan File with path (Java Get Canonical file with Path): "
								+ scanFileWithPath.getCanonicalPath() );
						log.warn( "  ... addnl info: call sendScanFilenameWithPathToSpectralStorageService(...) returned statusSuccess False" );

						return response; // EARLY EXIT
					}
					
					if ( response.isUploadScanFileTempKey_NotFound() ) {
						uploadScanFileTempKey_NotFound_ErrorResponse = true;
						String msg = "Send Scan File to Spectral Storage Service. Actually send the file. In sendScanFilenameWithPathToSpectralStorageService(): call_UploadScanFile_UploadScanFile_Service return UploadScanFileTempKey_NotFound true.  UploadScanFileTempKey: " 
								 + uploadScanFile_Init_Response.getUploadScanFileTempKey()
								 + ", Scan File: " + scanFileWithPath.getAbsolutePath();
						log.error( msg );
					}
					String msg = "Send Scan File to Spectral Storage Service. Actually send the file. In sendScanFilenameWithPathToSpectralStorageService(): call_UploadScanFile_UploadScanFile_Service return StatusSuccess false.  UploadScanFileTempKey: " 
							 + uploadScanFile_Init_Response.getUploadScanFileTempKey()
							 + ", Scan File: " + scanFileWithPath.getAbsolutePath();
					log.error( msg );
					throw new LimelightImporterSpectralStorageServiceErrorException(msg);
				}

				break;  //  EXIT LOOP
				
			} catch ( Exception e ) {

				if ( retryCount == SEND_FILE_RETRY_COUNT_MAX || uploadScanFileTempKey_NotFound_ErrorResponse ) {
					String scanProcessStatusKeyResponsePart = ", response from Spectral Storage Service call interface is null (call may have thrown exception).";
					if ( response != null ) {
						scanProcessStatusKeyResponsePart = " StatusSuccess: " + response.isStatusSuccess()
							+ ", UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey();
					}
					
					String msg = "Send Scan File to Spectral Storage Service. Actually send the file. In sendScanFilenameWithPathToSpectralStorageService(): call_UploadScanFile_UploadScanFile_Service threw exception and failed for retryCount == SEND_FILE_RETRY_COUNT or uploadScanFileTempKey_NotFound_ErrorResponse is true. uploadScanFileTempKey_NotFound_ErrorResponse: " 
							+ uploadScanFileTempKey_NotFound_ErrorResponse
							+ ", scanProcessStatusKeyResponsePar: " + scanProcessStatusKeyResponsePart
							+ ", Scan File: " + scanFileWithPath.getAbsolutePath();
					log.error( msg, e );
					throw new LimelightImporterSpectralStorageServiceErrorException( msg, e );
				}
			}

			Thread.sleep( SEND_FILE_RETRY_DELAY ); // Sleep wait for retry
		}
		
		return response;
	}
	

	/**
	 * @param uploadScanFile_Init_Response
	 * @param scanFileWithPath
	 * @param scanFileDTO
	 * @param callSpectralStorageAcceptImportWebservice
	 * @return
	 * @throws LimelightImporterDataException
	 */
	private UploadScanFile_Submit_Response submitScanFileToSpectralStorageService( 
			UploadScanFile_Init_Response uploadScanFile_Init_Response,
			File scanFileWithPath, 
			CallSpectralStorageAcceptImportWebservice callSpectralStorageAcceptImportWebservice ) throws Exception {

		UploadScanFile_Submit_Response response = null;

		boolean uploadScanFileTempKey_NotFound_ErrorResponse = false;

		int retryCount = 0;

		while( true ) {  // use 'break;' inside loop to exit
			
			if ( ! scanFileWithPath.exists() ) {
				String msg = "ERROR:::  Send Scan File to Spectral Storage Service: Scan File does not exist: "
						+ ", Scan File: " + scanFileWithPath.getAbsolutePath();
				log.error( msg );
				throw new LimelightImporterSpectralStorageServiceErrorException( msg );
			}
			
			retryCount++;

			if ( retryCount > SEND_FILE_RETRY_COUNT_MAX ) {
				String msg = "Send Scan File to Spectral Storage Service. Submit (commit) Upload. In submitScanFileToSpectralStorageService():  failed for retryCount > SEND_FILE_RETRY_COUNT.  StatusSuccess: " + response.isStatusSuccess()
					+ ", UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey()
					+ ", Scan File: " + scanFileWithPath.getAbsolutePath();
				log.error( msg );
				throw new LimelightImporterSpectralStorageServiceRetryExceededException(msg);
			}

			if ( retryCount > 1 ) {
				log.warn( "Send Scan File to Spectral Storage Service. Submit (commit) Upload. In submitScanFileToSpectralStorageService():  retryCount: " + retryCount + ", scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
				
			}
			
			UploadScanFile_Submit_Request uploadScanFile_Submit_Request = new UploadScanFile_Submit_Request();
			uploadScanFile_Submit_Request.setUploadScanFileTempKey( uploadScanFile_Init_Response.getUploadScanFileTempKey() );
			
			try {
				//  Send scan file to Spectral Storage Service
				response = callSpectralStorageAcceptImportWebservice.call_UploadScanFile_Submit_Webservice( uploadScanFile_Submit_Request );

				if ( ! response.isStatusSuccess() ) {
					if ( response.isUploadScanFileTempKey_NotFound() ) {
//						uploadScanFileTempKey_NotFound_ErrorResponse = true;
						String msg = "Send Scan File to Spectral Storage Service. Submit (commit) Upload. In submitScanFileToSpectralStorageService(): call call_UploadScanFile_Submit_Webservice returned StatusSuccess false, isUploadScanFileTempKey_NotFound true.";
						log.error( msg );
					}
					String msg = "Send Scan File to Spectral Storage Service. Submit (commit) Upload. In submitScanFileToSpectralStorageService(): call call_UploadScanFile_Submit_Webservice returned StatusSuccess false.";
					log.error( msg );
					throw new LimelightImporterSpectralStorageServiceErrorException(msg);
				}
				
				//  If got here, the call didn't throw an exception and the returned StatusSuccess is true so exit loop to return response
				
				break;  //  EXIT LOOP
				
			} catch ( Exception e ) {

				if ( retryCount == SEND_FILE_RETRY_COUNT_MAX || uploadScanFileTempKey_NotFound_ErrorResponse ) {
					String scanProcessStatusKeyResponsePart = ", response from Spectral Storage Service call interface is null (call may have thrown exception).";
					if ( response != null ) {
						scanProcessStatusKeyResponsePart = " ScanProcessStatusKey: " + response.getScanProcessStatusKey();
					}
					
					String msg = "Send Scan File to Spectral Storage Service. Submit (commit) Upload. In submitScanFileToSpectralStorageService(): call call_UploadScanFile_Submit_Webservice threw exception and failed for retryCount == SEND_FILE_RETRY_COUNT or uploadScanFileTempKey_NotFound_ErrorResponse is true. uploadScanFileTempKey_NotFound_ErrorResponse: " 
							+ uploadScanFileTempKey_NotFound_ErrorResponse
							+ ", scanProcessStatusKeyResponsePart: "
							+ scanProcessStatusKeyResponsePart
							+ ", Scan File: " + scanFileWithPath.getAbsolutePath();
					log.error( msg, e );
					throw new LimelightImporterSpectralStorageServiceErrorException( msg, e );
				}
			}

			Thread.sleep( SEND_FILE_RETRY_DELAY ); // Sleep wait for retry
		}
		
		return response;
	}
	
}
