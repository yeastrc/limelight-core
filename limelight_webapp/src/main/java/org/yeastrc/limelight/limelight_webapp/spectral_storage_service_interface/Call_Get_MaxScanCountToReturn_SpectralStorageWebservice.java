package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_MaxScanCountToReturn_Request;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_MaxScanCountToReturn_Response;
import org.yeastrc.spectral_storage.get_data_webapp.webservice_connect.main.CallSpectralStorageGetDataWebservice;

/**
 * 
 *
 */
@Component
public class Call_Get_MaxScanCountToReturn_SpectralStorageWebservice implements Call_Get_MaxScanCountToReturn_SpectralStorageWebservice_IF {

	private static final Logger log = LoggerFactory.getLogger( Call_Get_MaxScanCountToReturn_SpectralStorageWebservice.class );
	
	@Autowired
	private CallSpectralStorageWebservice_ForThisApp_FactoryIF callSpectralStorageWebservice_ForThisApp_Factory;


	
	/**
	 * @return
	 * @throws Exception
	 */
	@Override
	public int get_MaxScanCountToReturnFromSpectralStorageService( ) throws Exception {

		CallSpectralStorageGetDataWebservice callSpectralStorageWebservice = 
				callSpectralStorageWebservice_ForThisApp_Factory.getCallSpectralStorageWebservice();
		
		Get_MaxScanCountToReturn_Request webserviceRequest = new Get_MaxScanCountToReturn_Request();
		
		Get_MaxScanCountToReturn_Response get_MaxScanCountToReturn_Response =
				callSpectralStorageWebservice.call_Get_MaxScanCountToReturn_Webservice( webserviceRequest );

		Integer maxScanCountToReturn = get_MaxScanCountToReturn_Response.getMaxScanCountToReturn();
		
		if ( maxScanCountToReturn == null ) {
			String msg = "Returned maxScanCountToReturn property is null ";
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}
		
		return maxScanCountToReturn;
	}
}
