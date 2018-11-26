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

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterConfigurationException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterSpectralStorageServiceErrorException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterSpectralStorageServiceRetryExceededException;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
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
		
		try {
			CallSpectralStorageAcceptImportWebserviceInitParameters initParams = new CallSpectralStorageAcceptImportWebserviceInitParameters();

			initParams.setSpectralStorageServerBaseURL( spectralStorageServiceBaseURL );

			CallSpectralStorageAcceptImportWebservice callSpectralStorageAcceptImportWebservice = CallSpectralStorageAcceptImportWebservice.getInstance();

			callSpectralStorageAcceptImportWebservice.init( initParams );
			
			log.warn( "Calling spectralStorageService_InitUploadScanFileProcess(...) scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
			
			UploadScanFile_Init_Response uploadScanFile_Init_Response =
					spectralStorageService_InitUploadScanFileProcess( scanFileWithPath, callSpectralStorageAcceptImportWebservice );
			
			log.warn( "Calling sendScanFileToSpectralStorageService(...) scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
			
			UploadScanFile_UploadScanFile_Response uploadScanFile_UploadScanFile_Response = 
					sendScanFileToSpectralStorageService( uploadScanFile_Init_Response, scanFileWithPath, callSpectralStorageAcceptImportWebservice );
			
			log.warn( "Calling submitScanFileToSpectralStorageService(...) scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
			
			UploadScanFile_Submit_Response uploadScanFile_Submit_Response =
					submitScanFileToSpectralStorageService( 
							uploadScanFile_Init_Response,
							scanFileWithPath, 
							callSpectralStorageAcceptImportWebservice );
			
			return uploadScanFile_Submit_Response.getScanProcessStatusKey();
			
		} catch ( Exception e ) {
			String msg = "Failed to send scan file to Spectral Storage";
			log.error( msg, e );
			throw e;
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
					String msg = "Failed to send scan file to Spectral Storage  UploadScanFileTempKey: " 
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
					
					String msg = "Send Scan File to Spectral Storage Service send threw exception and failed for retryCount == SEND_FILE_RETRY_COUNT. " + scanProcessStatusKeyResponsePart
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
	private UploadScanFile_UploadScanFile_Response sendScanFileToSpectralStorageService( 
			UploadScanFile_Init_Response uploadScanFile_Init_Response,
			File scanFileWithPath, 
			CallSpectralStorageAcceptImportWebservice callSpectralStorageAcceptImportWebservice ) throws Exception {

		UploadScanFile_UploadScanFile_Response response = null;

		int retryCount = 0;

		while( true ) {  // use 'break;' inside loop to exit

			retryCount++;

			if ( retryCount > SEND_FILE_RETRY_COUNT_MAX ) {
				String msg = "Send Scan File to Spectral Storage Service failed for retryCount > SEND_FILE_RETRY_COUNT.  StatusSuccess: " + response.isStatusSuccess()
					+ ", UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey()
					+ ", Scan File: " + scanFileWithPath.getAbsolutePath();
				log.error( msg );
				throw new LimelightImporterSpectralStorageServiceRetryExceededException(msg);
			}
			
			if ( retryCount > 1 ) {
				log.warn( "In sendScanFileToSpectralStorageService(...) retryCount: " + retryCount + ", scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
				
			}
			

			UploadScanFile_UploadScanFile_Request uploadScanFile_UploadScanFile_Request = new UploadScanFile_UploadScanFile_Request();
			uploadScanFile_UploadScanFile_Request.setUploadScanFileTempKey( uploadScanFile_Init_Response.getUploadScanFileTempKey() );
			uploadScanFile_UploadScanFile_Request.setScanFile( scanFileWithPath );
			
			try {
				//  Send scan file to Spectral Storage Service
				response = callSpectralStorageAcceptImportWebservice.call_UploadScanFile_UploadScanFile_Service( uploadScanFile_UploadScanFile_Request );

				if ( ! response.isStatusSuccess() ) {
					String msg = "Failed to Submit scan file to Spectral Storage  UploadScanFileTempKey: " 
							 + uploadScanFile_Init_Response.getUploadScanFileTempKey()
							 + ", Scan File: " + scanFileWithPath.getAbsolutePath();
					log.error( msg );
					throw new LimelightImporterSpectralStorageServiceErrorException(msg);
				}

				break;  //  EXIT LOOP
				
			} catch ( Exception e ) {

				if ( retryCount == SEND_FILE_RETRY_COUNT_MAX ) {
					String scanProcessStatusKeyResponsePart = ", response from Spectral Storage Service call interface is null (call may have thrown exception).";
					if ( response != null ) {
						scanProcessStatusKeyResponsePart = " StatusSuccess: " + response.isStatusSuccess()
							+ ", UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey();
					}
					
					String msg = "Send Scan File to Spectral Storage Service send threw exception and failed for retryCount == SEND_FILE_RETRY_COUNT. " + scanProcessStatusKeyResponsePart
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

		int retryCount = 0;

		while( true ) {  // use 'break;' inside loop to exit

			retryCount++;

			if ( retryCount > SEND_FILE_RETRY_COUNT_MAX ) {
				String msg = "Send Scan File to Spectral Storage Service failed for retryCount > SEND_FILE_RETRY_COUNT.  StatusSuccess: " + response.isStatusSuccess()
					+ ", UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey()
					+ ", Scan File: " + scanFileWithPath.getAbsolutePath();
				log.error( msg );
				throw new LimelightImporterSpectralStorageServiceRetryExceededException(msg);
			}

			if ( retryCount > 1 ) {
				log.warn( "In submitScanFileToSpectralStorageService(...) retryCount: " + retryCount + ", scanFileWithPath: " + scanFileWithPath.getAbsolutePath() );
				
			}
			
			UploadScanFile_Submit_Request uploadScanFile_Submit_Request = new UploadScanFile_Submit_Request();
			uploadScanFile_Submit_Request.setUploadScanFileTempKey( uploadScanFile_Init_Response.getUploadScanFileTempKey() );
			
			try {
				//  Send scan file to Spectral Storage Service
				response = callSpectralStorageAcceptImportWebservice.call_UploadScanFile_Submit_Webservice( uploadScanFile_Submit_Request );

				if ( ! response.isStatusSuccess() ) {
					String msg = "Failed to send scan file to Spectral Storage";
					log.error( msg );
					throw new LimelightImporterSpectralStorageServiceErrorException(msg);
				}
				
				break;  //  EXIT LOOP
				
			} catch ( Exception e ) {

				if ( retryCount == SEND_FILE_RETRY_COUNT_MAX ) {
					String scanProcessStatusKeyResponsePart = ", response from Spectral Storage Service call interface is null (call may have thrown exception).";
					if ( response != null ) {
						scanProcessStatusKeyResponsePart = " ScanProcessStatusKey: " + response.getScanProcessStatusKey();
					}
					
					String msg = "Send Scan File to Spectral Storage Service send threw exception and failed for retryCount == SEND_FILE_RETRY_COUNT. " + scanProcessStatusKeyResponsePart
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
