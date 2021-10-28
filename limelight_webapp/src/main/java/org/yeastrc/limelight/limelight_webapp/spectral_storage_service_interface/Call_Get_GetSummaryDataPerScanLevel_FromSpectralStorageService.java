package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_ScanFileAPI_Key_NotFound;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_SummaryDataPerScanLevel_Request;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_SummaryDataPerScanLevel_Response;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScanLevelSummaryData_SubResponse;
import org.yeastrc.spectral_storage.get_data_webapp.webservice_connect.main.CallSpectralStorageGetDataWebservice;

@Component
public class Call_Get_GetSummaryDataPerScanLevel_FromSpectralStorageService implements Call_Get_GetSummaryDataPerScanLevel_FromSpectralStorageServiceIF {

    private static final Logger log = LoggerFactory.getLogger( Call_Get_GetSummaryDataPerScanLevel_FromSpectralStorageService.class );

    @Autowired
    private CallSpectralStorageWebservice_ForThisApp_FactoryIF callSpectralStorageWebservice_ForThisApp_Factory;

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_GetSummaryDataPerScanLevel_FromSpectralStorageServiceIF#getSummaryDataPerScanLevelFromAPIKey(java.lang.String)
	 */
	@Override
	public List<SingleScanLevelSummaryData_SubResponse> getSummaryDataPerScanLevelFromAPIKey(String scanFileAPIKey) throws Exception {

        CallSpectralStorageGetDataWebservice callSpectralStorageWebservice =
                callSpectralStorageWebservice_ForThisApp_Factory.getCallSpectralStorageWebservice();

        Get_SummaryDataPerScanLevel_Request webserviceRequest = new Get_SummaryDataPerScanLevel_Request();
        webserviceRequest.setScanFileAPIKey(scanFileAPIKey);

        Get_SummaryDataPerScanLevel_Response webserviceResponse = callSpectralStorageWebservice.call_GetSummaryDataPerScanLevel_Webservice( webserviceRequest );

        if ( webserviceResponse.getStatus_scanFileAPIKeyNotFound() == Get_ScanData_ScanFileAPI_Key_NotFound.YES ) {
            String msg = "No data in Spectral Storage for API Key: " + scanFileAPIKey;
            log.error( msg );
            throw new LimelightInternalErrorException(msg);
        }

        return webserviceResponse.getScanSummaryPerScanLevelList();
    }
}
