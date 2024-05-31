package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants_config_filenames.SpectralStorageService_Connection__ConfigFilename_Constants;


/**
 * 
 *
 */
@Component
public class SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup implements SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_IF  {

	private static final Logger log = LoggerFactory.getLogger( SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup.class );
	
	private static final String CONFIG_FILENAME = SpectralStorageService_Connection__ConfigFilename_Constants.CONFIG_FILENAME;
	

	private static final String PROPERTY_FILE_KEY__SPECTRAL_STORAGE_SERVICE__GET_DATA_URL = "spectral.storage.service.get.data.url";

	public static final String ENVIRONMENT_VARIABLE__SPECTRAL_STORAGE_SERVICE__GET_DATA_URL = "LIMELIGHT_SPECTRAL_STORAGE_SERVICE__GET_DATA_URL";
	
	/**
	 * 
	 *
	 */
	public static class SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response {

		private String spectralStorageService_Connection_GetData_URL;

		public String getSpectralStorageService_Connection_GetData_URL() {
			return spectralStorageService_Connection_GetData_URL;
		}
	}

	/**
	 * Load Config file, Read OS Environment Variable, Read JVM -D property for:
	 *		directory to use for storing cached data
	 *      
	 * @return null if no properties file is found
	 */
	@Override
	public SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response get_SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup() throws Exception {

		SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response response = new SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response();
		
		log.warn("INFO:  ENTER: SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup.get_SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup() ");

		String spectralStorageService_Connection_GetData_URL = null;
		
		{
			//  First get from config file
			
			spectralStorageService_Connection_GetData_URL = getStringFromConfigFile();
			
			if ( spectralStorageService_Connection_GetData_URL != null ) {
				
				log.warn( "INFO: spectralStorageService_Connection_GetData_URL: Value found in config file: '" + CONFIG_FILENAME + "' with key: '" + PROPERTY_FILE_KEY__SPECTRAL_STORAGE_SERVICE__GET_DATA_URL + "' with value: " + spectralStorageService_Connection_GetData_URL );
				
			} else {
				
				log.info( "INFO: NO spectralStorageService_Connection_GetData_URL from config file so try from environment variable. ");

				spectralStorageService_Connection_GetData_URL = System.getenv( ENVIRONMENT_VARIABLE__SPECTRAL_STORAGE_SERVICE__GET_DATA_URL );

				if ( spectralStorageService_Connection_GetData_URL != null ) {

					spectralStorageService_Connection_GetData_URL = spectralStorageService_Connection_GetData_URL.trim();
				}

				if ( StringUtils.isNotEmpty( spectralStorageService_Connection_GetData_URL ) ) {
			
					log.warn( "INFO::: spectralStorageService_Connection_GetData_URL: Value found in Environment Variable: '" + ENVIRONMENT_VARIABLE__SPECTRAL_STORAGE_SERVICE__GET_DATA_URL + "' with value: " + spectralStorageService_Connection_GetData_URL );
					
				} else {

					//  Not in config file or Environment Variable so get from JVM -D Property

					Properties prop = System.getProperties();
					spectralStorageService_Connection_GetData_URL = prop.getProperty(ENVIRONMENT_VARIABLE__SPECTRAL_STORAGE_SERVICE__GET_DATA_URL);

					if ( spectralStorageService_Connection_GetData_URL != null ) {

						spectralStorageService_Connection_GetData_URL = spectralStorageService_Connection_GetData_URL.trim();
					}

					if ( StringUtils.isNotEmpty( spectralStorageService_Connection_GetData_URL ) ) {
			
						log.warn( "INFO::: spectralStorageService_Connection_GetData_URL: Value found in JVM param: '-D" + ENVIRONMENT_VARIABLE__SPECTRAL_STORAGE_SERVICE__GET_DATA_URL + "' with value: " + spectralStorageService_Connection_GetData_URL );

					} else {

						log.info( "INFO: spectralStorageService_Connection_GetData_URL: NO Value found so default to NO OVERRIDE.  Use Value in Config table.  No Value found in "
								+ " config file: '" + CONFIG_FILENAME + "' with key: '" + PROPERTY_FILE_KEY__SPECTRAL_STORAGE_SERVICE__GET_DATA_URL + "', "
								+ "Environment Variable: '" 
								+ ENVIRONMENT_VARIABLE__SPECTRAL_STORAGE_SERVICE__GET_DATA_URL 
								+ "', "
								+ "OR JVM param: '-D" + ENVIRONMENT_VARIABLE__SPECTRAL_STORAGE_SERVICE__GET_DATA_URL + "'." );
						
						spectralStorageService_Connection_GetData_URL = null;
					}
				}
				
			}
			
		}

		if ( spectralStorageService_Connection_GetData_URL != null ) {

			spectralStorageService_Connection_GetData_URL = spectralStorageService_Connection_GetData_URL.trim();
		}

		if ( StringUtils.isEmpty( spectralStorageService_Connection_GetData_URL ) ) {

			spectralStorageService_Connection_GetData_URL = null;
		}
		
		response.spectralStorageService_Connection_GetData_URL = spectralStorageService_Connection_GetData_URL;
		
		return response;
	}
	
	/**
	 * @return
	 * @throws IOException
	 */
	private String getStringFromConfigFile() throws IOException {

		Properties configProps = null;
		InputStream propertiesFileAsStream = null;

		try {

			//  Get config file from class path

			ClassLoader thisClassLoader = this.getClass().getClassLoader();
			URL configFileUrlObjUrlLocal = thisClassLoader.getResource( CONFIG_FILENAME );

			if ( configFileUrlObjUrlLocal == null ) {
				String msg = "Properties file '" + CONFIG_FILENAME + "' not found in class path.";
				log.info( msg );

				return null; // EARLY RETURN

			} else {
				if ( log.isInfoEnabled() ) {
					log.info( "Properties file '" + CONFIG_FILENAME + "' found, load path = " + configFileUrlObjUrlLocal.getFile() );
				}
			}

			propertiesFileAsStream = configFileUrlObjUrlLocal.openStream();

			if ( propertiesFileAsStream == null ) {
				String msg = "Properties file '" + CONFIG_FILENAME + "' not found in class path.";
				log.info( msg );

				return null; // EARLY RETURN

			}

			configProps = new Properties();

			configProps.load( propertiesFileAsStream );

		} finally {

			if ( propertiesFileAsStream != null ) {

				propertiesFileAsStream.close();
			}
		}
		
		String spectralStorageService_Connection_GetData_URL = configProps.getProperty( PROPERTY_FILE_KEY__SPECTRAL_STORAGE_SERVICE__GET_DATA_URL );
		
		if ( spectralStorageService_Connection_GetData_URL != null ) {
			spectralStorageService_Connection_GetData_URL = spectralStorageService_Connection_GetData_URL.trim();
		}

		if ( StringUtils.isEmpty( spectralStorageService_Connection_GetData_URL ) ) {

			log.info( "spectralStorageService_Connection_GetData_URL ConfigFile exists but no value for spectralStorageService_Connection_GetData_URL key. Config filename: " 
					+ CONFIG_FILENAME
					+ ", propertyFile spectralStorageService_Connection_GetData_URL Key: " + PROPERTY_FILE_KEY__SPECTRAL_STORAGE_SERVICE__GET_DATA_URL );

			return null;
		}
		

		return spectralStorageService_Connection_GetData_URL;
	}


}
