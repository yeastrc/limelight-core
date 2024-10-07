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
package org.yeastrc.limelight.limelight_feature_detection_run_import.spectral_storage_service_communication;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterConfigurationException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterSpectralStorageServiceErrorException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterSpectralStorageServiceRetryExceededException;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_ScanNumbers_Request;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_ScanNumbers_Response;
import org.yeastrc.spectral_storage.get_data_webapp.webservice_connect.main.CallSpectralStorageGetDataWebservice;
import org.yeastrc.spectral_storage.get_data_webapp.webservice_connect.main.CallSpectralStorageGetDataWebserviceInitParameters;

/**
 * 
 *
 */
public class ScanFileToSpectralStorageService_GetAllScanNumbersForAPIKey {

	private static final Logger log = LoggerFactory.getLogger( ScanFileToSpectralStorageService_GetAllScanNumbersForAPIKey.class );
	
	private ScanFileToSpectralStorageService_GetAllScanNumbersForAPIKey() { }
	public static ScanFileToSpectralStorageService_GetAllScanNumbersForAPIKey getInstance() { return new ScanFileToSpectralStorageService_GetAllScanNumbersForAPIKey(); }

	//  Get Scan Numbers from Spectral Storage Service Retry Max and Delay
	
	private static final int GET_SCAN_NUMBERS_RETRY_COUNT_MAX = 10;
	private static final int GET_SCAN_NUMBERS_RETRY_DELAY = 2 * 1000; // 2 second


	/**
	 * @param spectralStorage_API_Key
	 * @param scanLevelsToInclude
	 * @param scanLevelsToExclude
	 * @return
	 * @throws Exception
	 */
	public List<Integer> getAllScanNumbersForAPIKey( 
			String spectralStorage_API_Key,
			List<Integer> scanLevelsToInclude,
			List<Integer> scanLevelsToExclude ) throws Exception {

		List<Integer> allScanNumbers = null;
		
		String spectralStorageServiceBaseURL = 
				ConfigSystemTableGetValueCommon.getInstance()
				.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL );
		
		if ( StringUtils.isEmpty( spectralStorageServiceBaseURL ) ) {
			String msg = "No Config value for Spectral Storage Base URL, key: " + ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL;
			log.error( msg );
			throw new LimelightImporterConfigurationException( msg );
		}
		
		CallSpectralStorageGetDataWebserviceInitParameters initParams = new CallSpectralStorageGetDataWebserviceInitParameters();

		initParams.setSpectralStorageServerBaseURL( spectralStorageServiceBaseURL );

		CallSpectralStorageGetDataWebservice callSpectralStorageGetDataWebservice = CallSpectralStorageGetDataWebservice.getInstance();

		callSpectralStorageGetDataWebservice.init( initParams );
		
		
		int retryCount = 0;
		
		while( true ) {  // use 'break;' inside loop to exit

			if ( retryCount > 0 ) {
				// Sleep before retry
				if ( retryCount < GET_SCAN_NUMBERS_RETRY_COUNT_MAX ) {
					Thread.sleep( GET_SCAN_NUMBERS_RETRY_DELAY ); // Sleep wait for retry
				}
			}

			retryCount++;

			if ( retryCount > 1 ) {
				log.warn( "In scanFileToSpectralStorageService_GetAPIKey(...) retryCount: " + retryCount + ", spectralStorage_API_Process_Key: " + spectralStorage_API_Key );
				
			}

			if ( retryCount > GET_SCAN_NUMBERS_RETRY_COUNT_MAX ) {
				String msg = "Waited too long for Spectral Storage System to return scan numbers.  spectralStorage_API_Process_Key: " + spectralStorage_API_Key;
				log.error( msg );
				throw new LimelightImporterSpectralStorageServiceRetryExceededException(msg);
			}
			
			Get_ScanNumbers_Response get_ScanNumbers_Response = null;

			try {
				Get_ScanNumbers_Request webserviceRequest = new Get_ScanNumbers_Request();
				webserviceRequest.setScanFileAPIKey( spectralStorage_API_Key );
				webserviceRequest.setScanLevelsToInclude( scanLevelsToInclude );
				webserviceRequest.setScanLevelsToExclude( scanLevelsToExclude );

				get_ScanNumbers_Response =
						callSpectralStorageGetDataWebservice.call_Get_ScanNumbers_Webservice( webserviceRequest );

			} catch ( Exception e ) {

				{
					String msg = "scanFileToSpectralStorageService_GetAPIKey: Get API Key from Spectral Storage Service failed "
							+ " and send threw exception  . retryCount: " + retryCount + ", spectralStorage_API_Process_Key: " + spectralStorage_API_Key;
					log.error( msg, e );
				}

				if ( retryCount >= GET_SCAN_NUMBERS_RETRY_COUNT_MAX ) {
					String msg = "Get Scan Numbers from Spectral Storage Service failed for retryCount == " + GET_SCAN_NUMBERS_RETRY_COUNT_MAX + " (GET_API_KEY_RETRY_COUNT_MAX_TOTAL_ALLOWED)"
							+ " and send threw exception  .  spectralStorage_API_Key: " + spectralStorage_API_Key;
					log.error( msg, e );
					throw new LimelightImporterSpectralStorageServiceErrorException( msg, e );
				}
				
				continue;  //  EARLY LOOP CONTINUE
			}

			allScanNumbers = get_ScanNumbers_Response.getScanNumbers();
				
			break;  //  LOOP EXIT
			
		}
		
		return allScanNumbers;
		
	}
}
