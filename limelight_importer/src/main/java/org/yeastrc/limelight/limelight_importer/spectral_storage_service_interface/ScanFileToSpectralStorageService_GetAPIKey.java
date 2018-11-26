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

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterConfigurationException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterSpectralStorageServiceErrorException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterSpectralStorageServiceRetryExceededException;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.constants_enums.WebserviceSpectralStorageAcceptImport_ProcessStatusEnum;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.Get_UploadedScanFileInfo_Request;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.Get_UploadedScanFileInfo_Response;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_Delete_For_ScanProcessStatusKey_Request;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_Delete_For_ScanProcessStatusKey_Response;
import org.yeastrc.spectral_storage.accept_import_web_app.webservice_connect.main.CallSpectralStorageAcceptImportWebservice;
import org.yeastrc.spectral_storage.accept_import_web_app.webservice_connect.main.CallSpectralStorageAcceptImportWebserviceInitParameters;

/**
 * 
 *
 */
public class ScanFileToSpectralStorageService_GetAPIKey {

	
	//  TODO  !!!!!!!!!!!!!!!!!!!!!!!  Need to confirm that Spectral Storage Service returns different status and error msg for if the scan file fails to process vs system error.
	

	private static final Logger log = LoggerFactory.getLogger( ScanFileToSpectralStorageService_GetAPIKey.class );
	
	private ScanFileToSpectralStorageService_GetAPIKey() { }
	public static ScanFileToSpectralStorageService_GetAPIKey getInstance() { return new ScanFileToSpectralStorageService_GetAPIKey(); }


	//  Get API Key from Spectral Storage Service Retry Max and Delay.  Incrementally longer delays after more retries
	
	private static final int GET_API_KEY_RETRY_COUNT_MAX_STEP_1 = 5;  // First 5 retries
	private static final int GET_API_KEY_RETRY_DELAY_STEP_1 = 5 * 1000; // 5 second
	
	private static final int GET_API_KEY_RETRY_COUNT_MAX_TOTAL_ALLOWED = 6500;  // Total number of retries allowed
	private static final int GET_API_KEY_RETRY_DELAY_STEP_LAST = 15 * 1000; // 15 second
	
	///   Retry for max of roughly 26 hours.  Could exceed this if another web app or Limelight Instance has uploaded a lot of scan files to Spectra Storage Service
	
	// TODOO TEMP smaller values
	
//	private static final int GET_API_KEY_RETRY_COUNT_MAX_STEP_1 = 1;
//	private static final int GET_API_KEY_RETRY_DELAY_STEP_1 = 10; // 10 milliseconds
//	
//	private static final int GET_API_KEY_RETRY_COUNT_MAX_STEP_2 = 1;
//	private static final int GET_API_KEY_RETRY_DELAY_STEP_2 = 10; // 10 milliseconds
//	
//	private static final int GET_API_KEY_RETRY_COUNT_MAX_STEP_3 = 1;
//	private static final int GET_API_KEY_RETRY_DELAY_STEP_3 = 10; // 10 milliseconds

	
	
	public String scanFileToSpectralStorageService_GetAPIKey( String spectralStorage_Process_Key ) throws Exception {

		String spectralStorageAPIKey = null;
		
		
		//  Try with progressively longer delays and different retry count max

		//  Wait for Spectral Storage API Key

		String spectralStorageServiceBaseURL = 
				ConfigSystemTableGetValueCommon.getInstance()
				.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_ACCEPT_IMPORT_BASE_URL );
		
		if ( StringUtils.isEmpty( spectralStorageServiceBaseURL ) ) {
			String msg = "No Config value for Spectral Storage Base URL, key: " + ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_ACCEPT_IMPORT_BASE_URL;
			log.error( msg );
			throw new LimelightImporterConfigurationException( msg );
		}
		
		CallSpectralStorageAcceptImportWebserviceInitParameters initParams = new CallSpectralStorageAcceptImportWebserviceInitParameters();

		initParams.setSpectralStorageServerBaseURL( spectralStorageServiceBaseURL );

		CallSpectralStorageAcceptImportWebservice callSpectralStorageAcceptImportWebservice = CallSpectralStorageAcceptImportWebservice.getInstance();

		callSpectralStorageAcceptImportWebservice.init( initParams );
		
		
		int retryCount = 0;
		
		while( true ) {  // use 'break;' inside loop to exit

			if ( retryCount > 0 ) {
				// Sleep before retry
				if ( retryCount < GET_API_KEY_RETRY_COUNT_MAX_STEP_1 ) {
					Thread.sleep( GET_API_KEY_RETRY_DELAY_STEP_1 ); // Sleep wait for retry
				} else {
					Thread.sleep( GET_API_KEY_RETRY_DELAY_STEP_LAST ); // Sleep wait for retry
				}
			}

			retryCount++;

			if ( retryCount > 1 ) {
				log.warn( "In scanFileToSpectralStorageService_GetAPIKey(...) retryCount: " + retryCount + ", spectralStorage_API_Process_Key: " + spectralStorage_Process_Key );
				
			}
			

			if ( retryCount > GET_API_KEY_RETRY_COUNT_MAX_TOTAL_ALLOWED ) {
				String msg = "Waited too long for Spectral Storage System to process Scan file.  spectralStorage_API_Process_Key: " + spectralStorage_Process_Key;
				log.error( msg );
				throw new LimelightImporterSpectralStorageServiceRetryExceededException(msg);
			}
			
			Get_UploadedScanFileInfo_Response get_UploadedScanFileInfo_Response = null;

			try {
				Get_UploadedScanFileInfo_Request webserviceRequest = new Get_UploadedScanFileInfo_Request();
				webserviceRequest.setScanProcessStatusKey( spectralStorage_Process_Key );

				//  TODO  !!!!!!!!!!!!!!!!!!!!!!!  Need to confirm that Spectral Storage Service returns different status and error msg for if the scan file fails to process vs system error.
				
				get_UploadedScanFileInfo_Response =
						callSpectralStorageAcceptImportWebservice.call_Get_UploadedScanFileInfo_Webservice( webserviceRequest );

			} catch ( Exception e ) {

				{
					String msg = "scanFileToSpectralStorageService_GetAPIKey: Get API Key from Spectral Storage Service failed "
							+ " and send threw exception  . retryCount: " + retryCount + ", spectralStorage_API_Process_Key: " + spectralStorage_Process_Key;
					log.error( msg, e );
				}

				if ( retryCount >= GET_API_KEY_RETRY_COUNT_MAX_TOTAL_ALLOWED ) {
					String msg = "Get API Key from Spectral Storage Service failed for retryCount == " + GET_API_KEY_RETRY_COUNT_MAX_TOTAL_ALLOWED + " (GET_API_KEY_RETRY_COUNT_MAX_TOTAL_ALLOWED)"
							+ " and send threw exception  .  spectralStorage_API_Process_Key: " + spectralStorage_Process_Key;
					log.error( msg, e );
					throw new LimelightImporterSpectralStorageServiceErrorException( msg, e );
				}
				
				continue;  //  EARLY LOOP CONTINUE
			}

			if ( get_UploadedScanFileInfo_Response.isScanProcessStatusKey_NotFound() ) {
				String msg = "Error in processing since ScanProcessStatusKey is not in Spectral Storage System.  spectralStorage_API_Process_Key: " + spectralStorage_Process_Key;
				log.error( msg );
				throw new LimelightImporterSpectralStorageServiceErrorException(msg);
			}

			if ( get_UploadedScanFileInfo_Response.getStatus() == WebserviceSpectralStorageAcceptImport_ProcessStatusEnum.FAIL ) {
				String msg = "Spectral Storage System Failed to process Scan file.  spectralStorage_API_Process_Key: " + spectralStorage_Process_Key;
				log.error( msg );
				
				try {

					UploadScanFile_Delete_For_ScanProcessStatusKey_Request webserviceRequest = new UploadScanFile_Delete_For_ScanProcessStatusKey_Request();
					webserviceRequest.setScanProcessStatusKey( spectralStorage_Process_Key );
					
					UploadScanFile_Delete_For_ScanProcessStatusKey_Response uploadScanFile_Delete_For_ScanProcessStatusKey_Response =
							callSpectralStorageAcceptImportWebservice.call_UploadScanFile_Delete_For_ScanProcessStatusKey_Webservice( webserviceRequest );
					
					if ( ! uploadScanFile_Delete_For_ScanProcessStatusKey_Response.isStatusSuccess() ) {
						String msg2 = "Call to call_UploadScanFile_Delete_For_ScanProcessStatusKey_Webservice(...) returned status fail:";
						log.error( msg2 );
					}
				} catch ( Exception e ) {
					String msg2 = "Call to call_UploadScanFile_Delete_For_ScanProcessStatusKey_Webservice(...) threw exception:";
					log.error( msg2, e );
				}
				
				throw new LimelightImporterSpectralStorageServiceErrorException(msg);
			}

			{
				boolean statusSuccess = false;
				if ( get_UploadedScanFileInfo_Response.getStatus() == WebserviceSpectralStorageAcceptImport_ProcessStatusEnum.SUCCESS ) {
					statusSuccess = true;
				}
				
				String msg = "INFO: scanFileToSpectralStorageService_GetAPIKey: Get API Key from Spectral Storage Service "
						+ " statusSuccess: " + statusSuccess + ", retryCount: " + retryCount
						+ ", spectralStorage_API_Process_Key: " + spectralStorage_Process_Key;
				log.warn( msg );
			}

			if ( get_UploadedScanFileInfo_Response.getStatus() == WebserviceSpectralStorageAcceptImport_ProcessStatusEnum.SUCCESS ) {
				
				spectralStorageAPIKey = get_UploadedScanFileInfo_Response.getScanFileAPIKey();
				
				{
					String msg = "INFO: scanFileToSpectralStorageService_GetAPIKey: !!  Spectral Storage Service has finished processing Scan File. Spectral Storage API Key : "
							+ spectralStorageAPIKey;
					log.warn( msg );
				}
				
				break;  //  LOOP EXIT
			}
			
		}
		
		return spectralStorageAPIKey;
		
	}
}
