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
package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

import java.util.List;

import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanDataFromScanNumbers_IncludeParentScans;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_ExcludeReturnScanPeakData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_ScanDataFromScanNumbers_Request;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScan_SubResponse;

/**
 * @author danj
 *
 */
public interface Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF {

	/**
	 * Get Scan Data from Spectral Storage Service
	 * 
	 * Number of scan numbers cannot exceed max as specified in Spectral Storage Service.  
	 *   LimelightInternalErrorException thrown with max allowed if max exceeded.
	 * 
	 * @param scanNumbers
	 * @param scanFileAPIKey
	 * @throws Exception 
	 */
	List<SingleScan_SubResponse> getScanDataFromSpectralStorageService(List<Integer> scanNumbers,
			Get_ScanDataFromScanNumbers_IncludeParentScans get_ScanDataFromScanNumbers_IncludeParentScans,
			Get_ScanData_ExcludeReturnScanPeakData excludeReturnScanPeakData, String scanFileAPIKey) throws Exception;

	/**
	 * Get Scan Data from Spectral Storage Service
	 * 
	 * Number of scan numbers cannot exceed max as specified in Spectral Storage Service.  
	 *   LimelightInternalErrorException thrown with max allowed if max exceeded.
	 * 
	 * @param get_ScanDataFromScanNumbers_Request
	 * @param scanFileAPIKey
	 * @return
	 * @throws Exception
	 */
	public List<SingleScan_SubResponse> getScanDataFromSpectralStorageService_NativeSpectralStorageServiceRequestObject( 
			Get_ScanDataFromScanNumbers_Request get_ScanDataFromScanNumbers_Request,
			String scanFileAPIKey ) throws Exception;
}