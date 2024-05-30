package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_ScanFileAPI_Key_NotFound;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_ScanNumbers_Request;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_ScanNumbers_Response;
import org.yeastrc.spectral_storage.get_data_webapp.webservice_connect.main.CallSpectralStorageGetDataWebservice;

/**
 * 
 *
 */
@Component
public class Call_Get_ScanNumbers_SpectralStorageWebservice implements Call_Get_ScanNumbers_SpectralStorageWebserviceIF {

	private static final Logger log = LoggerFactory.getLogger( Call_Get_ScanNumbers_SpectralStorageWebservice.class );
	
	@Autowired
	private CallSpectralStorageWebservice_ForThisApp_FactoryIF callSpectralStorageWebservice_ForThisApp_Factory;

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_ScanNumbers_SpectralStorageWebserviceIF#getScanNumbersFromSpectralStorageService(java.util.List, java.util.List, java.lang.String)
	 */
	
	@Override
	public List<Integer> getScanNumbersFromSpectralStorageService( 
			List<Integer> scanLevelsToInclude,
			List<Integer> scanLevelsToExclude,
			String scanFileAPIKey ) throws Exception {

		if ( StringUtils.isEmpty( scanFileAPIKey ) ) {
			String msg = "No value for scanFileAPIKey. ";
			log.error( msg );
			throw new IllegalArgumentException( msg );
		}
		
		CallSpectralStorageGetDataWebservice callSpectralStorageWebservice = 
				callSpectralStorageWebservice_ForThisApp_Factory.getCallSpectralStorageWebservice();
		
		Get_ScanNumbers_Request webserviceRequest = new Get_ScanNumbers_Request();
		webserviceRequest.setScanFileAPIKey( scanFileAPIKey );
		webserviceRequest.setScanLevelsToInclude(scanLevelsToInclude);
		webserviceRequest.setScanLevelsToExclude(scanLevelsToExclude);
		
		Get_ScanNumbers_Response get_ScanNumbers_Response =
				callSpectralStorageWebservice.call_Get_ScanNumbers_Webservice( webserviceRequest );

		if ( get_ScanNumbers_Response.getStatus_scanFileAPIKeyNotFound() 
				== Get_ScanData_ScanFileAPI_Key_NotFound.YES ) {
			String msg = "No data in Spectral Storage for API Key: " + scanFileAPIKey;
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}
				
		List<Integer> scanNumbers = get_ScanNumbers_Response.getScanNumbers();
		
		if ( scanNumbers == null ) {
			String msg = "Returned scanNumbers property is null: Spectral Storage API Key: " + scanFileAPIKey;
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}
		
		return scanNumbers;
	}
}
