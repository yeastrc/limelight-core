/*
 * Original author: Daniel Jaschob <djaschob .at. uw.edu>
 *                  
 * Copyright 2019 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants_config_filenames.Cached_InMemory_ConfigFilename_Constants;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher;

/**
 * 
 *
 */
@Component
public class Cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup implements Cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup_IF {

	private static final Logger log = LoggerFactory.getLogger( Cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup.class );
	
	private static final int MINIMUM_CACHE_SIZE = 10;

	private static final String CONFIG_FILENAME = Cached_InMemory_ConfigFilename_Constants.CONFIG_FILENAME;

	private static final String PROPERTY_CACHE_SIZE__CACHE_SIZE = "cached.in.memory.max.cache.size.mb";

	private static final String ENVIRONMENT_VARIABLE__CACHE_SIZE = "LIMELIGHT_CACHED_IN_MEMORY_MAX_CACHE_SIZE_MB";
	
	
	private volatile Cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup_Response cachedResponse;

	/**
	 * 
	 *
	 */
	public static class Cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup_Response {

		private Integer responseSizeKB_Cached_WebserviceResponse_Management;
		private Integer responseSizeKB_ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service;

		/**
		 * @return null if no value set
		 */
		public Integer getResponseSizeKB_Cached_WebserviceResponse_Management() {
			return responseSizeKB_Cached_WebserviceResponse_Management;
		}

		/**
		 * @return null if no value set
		 */
		public Integer getResponseSizeKB_ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service() {
			return responseSizeKB_ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service;
		}

	}

	/**
	 * Load Config file, Read OS Environment Variable, Read JVM -D property for:
	 *		directory to use for storing cached data
	 *      
	 */
	@Override
	public Cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup_Response cachedData_InMemory_Size_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup() throws Exception {
		
		if ( cachedResponse != null ) {
			
			return cachedResponse; // EARLY RETURN
		}

		Cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup_Response response = new Cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup_Response();
		
		log.warn("INFO:  ENTER: Cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup.cachedData_InMemory_Size_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup() ");

		{
			//  First get from config file
			
			String cacheSize_String = getStringFromConfigFile();
			
			if ( cacheSize_String != null ) {
			
				cacheSize_String = cacheSize_String.trim();
			}
			
			String valueFoundInLabel = "";
			
			if ( StringUtils.isNotEmpty( cacheSize_String ) ) {
				
				log.warn( "INFO: CachedData InMemory Size: Value found in config file: '" + CONFIG_FILENAME + "' with key: '" + PROPERTY_CACHE_SIZE__CACHE_SIZE + "' with value: " + cacheSize_String );

				valueFoundInLabel = "CachedData InMemory Size: Value to use: Value found in config file: '" + CONFIG_FILENAME + "' with key: '" + PROPERTY_CACHE_SIZE__CACHE_SIZE + "'. ";
				
			} else {
				
				log.info( "INFO: NO cacheSize_String from config file so try from environment variable. ");
				
				cacheSize_String = System.getenv( ENVIRONMENT_VARIABLE__CACHE_SIZE );

				if ( cacheSize_String != null ) {
				
					cacheSize_String = cacheSize_String.trim();
				}


				if ( StringUtils.isNotEmpty( cacheSize_String ) ) {

					log.info( "INFO: CachedData InMemory Size: Value to use: Value found in Environment Variable: '" + ENVIRONMENT_VARIABLE__CACHE_SIZE + "' with value: " + cacheSize_String );

					valueFoundInLabel = "CachedData InMemory Size: Value to use: Value found in Environment Variable: '" + ENVIRONMENT_VARIABLE__CACHE_SIZE + "'";
					
				} else {

					//  Not in config file or Environment Variable so get from JVM -D Property

					Properties prop = System.getProperties();
					cacheSize_String = prop.getProperty(ENVIRONMENT_VARIABLE__CACHE_SIZE);

					if ( cacheSize_String != null ) {

						cacheSize_String = cacheSize_String.trim();
					}

					if ( StringUtils.isNotEmpty( cacheSize_String ) ) {

						log.info( "INFO: CachedData InMemory Size: Value to use: Value found in JVM param: '-D" + ENVIRONMENT_VARIABLE__CACHE_SIZE + "' with value: " + cacheSize_String );

						valueFoundInLabel = "CachedData InMemory Size: Value to use: Value found in JVM param: '-D" + ENVIRONMENT_VARIABLE__CACHE_SIZE + "'";
					} else {

						log.info( "INFO: CachedDataInFile: Subdir to use: NO Value found in JVM param: '-D" + ENVIRONMENT_VARIABLE__CACHE_SIZE + "'." );
					}
				}
				
			}
			
			double configSizeMB_Double = 0;
			
			if ( StringUtils.isEmpty( cacheSize_String ) ) {

				log.warn( "INFO: CachedData InMemory Size: NO Value found in config file: '" + CONFIG_FILENAME + "' with key: '" + PROPERTY_CACHE_SIZE__CACHE_SIZE 
						+ "' OR Environment Variable: '" + ENVIRONMENT_VARIABLE__CACHE_SIZE + "' or JVM param '-D" + ENVIRONMENT_VARIABLE__CACHE_SIZE + "'.  Using Default value: " + MINIMUM_CACHE_SIZE + "." );
				
			} else {
				
				try {
					configSizeMB_Double = Double.parseDouble(cacheSize_String);
					
				} catch ( Exception e ) {
					
					String msg = "SKIPPING Config value!!! Using Default value: " + MINIMUM_CACHE_SIZE + ". Failed to parse CachedData InMemory Size as double: '" + cacheSize_String + "'. " + valueFoundInLabel;
					log.warn( msg, e );
				}
	
			}
			

			if ( configSizeMB_Double < MINIMUM_CACHE_SIZE ) {
				configSizeMB_Double = MINIMUM_CACHE_SIZE; // set minimum size
			}
			
			//  Subtract size of PsmCountForSearchIdReportedPeptideIdCutoffsSearcher
			
			configSizeMB_Double = configSizeMB_Double - PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher.MAX_HEAP_MEMORY_USED_MB_APPROX;
			
			//  change to KB
			
			double configSizeKB_Double = configSizeMB_Double * 1024;
			
			//  2/3 of what is left
			response.responseSizeKB_Cached_WebserviceResponse_Management = (int) Math.floor( configSizeKB_Double * 0.66 );
			//  1/3 of what is left
			response.responseSizeKB_ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service = (int) Math.floor( configSizeKB_Double * 0.33 );
		
			log.info( "CachedData InMemory Size in KB for Cached_WebserviceResponse_Management: " + response.responseSizeKB_Cached_WebserviceResponse_Management );
			
			log.info( "CachedData InMemory Size in KB for ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service: " + response.responseSizeKB_ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service );

		}
		
		cachedResponse = response;
		
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
		
		String cacheSize_String = configProps.getProperty( PROPERTY_CACHE_SIZE__CACHE_SIZE );

		if ( StringUtils.isEmpty( cacheSize_String ) ) {

			log.info( "CachedData InMemory Size ConfigFile exists but no value for Cache Size key. Config filename: " 
					+ CONFIG_FILENAME
					+ ", propertyFile_CacheSizeKey: " + PROPERTY_CACHE_SIZE__CACHE_SIZE );

			return null; // EARLY RETURN
		}

		return cacheSize_String;
	}


}
