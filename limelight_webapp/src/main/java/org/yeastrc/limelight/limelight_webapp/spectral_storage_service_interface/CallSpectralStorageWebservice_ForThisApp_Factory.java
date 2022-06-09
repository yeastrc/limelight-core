package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappConfigException;
import org.yeastrc.spectral_storage.get_data_webapp.webservice_connect.main.CallSpectralStorageGetDataWebservice;
import org.yeastrc.spectral_storage.get_data_webapp.webservice_connect.main.CallSpectralStorageGetDataWebserviceInitParameters;

/**
 * Spectral Storage Service "Get Data" web services
 * 
 * 
 * Create object of Spectral Storage Service call interface class CallSpectralStorageWebservice
 * and configure it
 *
 * Package Private
 */
@Component
class CallSpectralStorageWebservice_ForThisApp_Factory implements CallSpectralStorageWebservice_ForThisApp_FactoryIF {
	
	private static final Logger log = LoggerFactory.getLogger( CallSpectralStorageWebservice_ForThisApp_Factory.class );

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;

	/**
	 * Package Private
	 * @return
	 * @throws Exception 
	 */
	public CallSpectralStorageGetDataWebservice getCallSpectralStorageWebservice() throws Exception {
		
		// First get override URL from config file
		String spectralStorageWebserviceBaseURL = null;
//				LimelightConfigFileValues.getInstance().getSpectralStorageServerURLandAppContext();
				
		if ( StringUtils.isEmpty( spectralStorageWebserviceBaseURL ) ) {
			//  Not in config file so get from config_system table
			spectralStorageWebserviceBaseURL = 
					configSystemDAO
					.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL );
		}
		
		if ( StringUtils.isEmpty( spectralStorageWebserviceBaseURL ) ) {
			String msg = "No value in config for key '"
					+ ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL
					+ "'.";
			log.error( msg );
			throw new LimelightWebappConfigException( msg );
		}
		
		CallSpectralStorageGetDataWebserviceInitParameters initParams = new CallSpectralStorageGetDataWebserviceInitParameters();
		
		initParams.setSpectralStorageServerBaseURL( spectralStorageWebserviceBaseURL );
		
		CallSpectralStorageGetDataWebservice callSpectralStorageWebservice = CallSpectralStorageGetDataWebservice.getInstance();

		callSpectralStorageWebservice.init( initParams );
		
		return callSpectralStorageWebservice;
	}
}
