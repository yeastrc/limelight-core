package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

import java.util.List;

import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScanLevelSummaryData_SubResponse;

public interface Call_Get_GetSummaryDataPerScanLevel_FromSpectralStorageServiceIF {

	/**
	 * Get Scan Partial Data from Spectral Storage Service
	 * 
	 * @param scanFileAPIKey
	 * @throws Exception 
	 */
	List<SingleScanLevelSummaryData_SubResponse> getSummaryDataPerScanLevelFromAPIKey(String scanFileAPIKey)
			throws Exception;

}