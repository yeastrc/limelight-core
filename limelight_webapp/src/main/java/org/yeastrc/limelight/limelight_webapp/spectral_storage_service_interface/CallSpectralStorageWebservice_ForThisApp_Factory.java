package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappConfigException;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup.SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response;
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
class CallSpectralStorageWebservice_ForThisApp_Factory 

implements CallSpectralStorageWebservice_ForThisApp_FactoryIF,

InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
	
	private static final Logger log = LoggerFactory.getLogger( CallSpectralStorageWebservice_ForThisApp_Factory.class );

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;

	@Autowired
	private SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_IF spectralStorageService_Get_URL_Overrides_OfConfigTableValues__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup;
	
	private String spectralStorageService_GetData_URL_Override;  //  from spectralStorageService_Get_URL_Overrides_OfConfigTableValues__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup
	
	/* 
	 * Spring LifeCycle Method
	 * 
	 * (non-Javadoc)
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		try {
			{
				SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response response = 
						spectralStorageService_Get_URL_Overrides_OfConfigTableValues__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup.get_SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup();
				
				this.spectralStorageService_GetData_URL_Override = response.getSpectralStorageService_Connection_GetData_URL();
			}
			
		} catch (Exception e) {
			String msg = "In afterPropertiesSet(): Exception in processing";
			log.error(msg);
			throw e;
		}
	}
	
	
	/**
	 * Package Private
	 * @return
	 * @throws Exception 
	 */
	public CallSpectralStorageGetDataWebservice getCallSpectralStorageWebservice() throws Exception {
		
		// First get override URL from config file (Retrieved above on app startup)
		String spectralStorageWebserviceBaseURL = this.spectralStorageService_GetData_URL_Override;
				
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
