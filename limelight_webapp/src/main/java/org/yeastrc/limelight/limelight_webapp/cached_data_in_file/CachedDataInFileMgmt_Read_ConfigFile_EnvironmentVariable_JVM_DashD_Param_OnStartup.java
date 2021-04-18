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
package org.yeastrc.limelight.limelight_webapp.cached_data_in_file;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants_config_filenames.CachedDataInFileMgmt_ConfigFilename_Constants;

/**
 * 
 *
 */
@Component
public class CachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup implements CachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_IF {

	private static final Logger log = LoggerFactory.getLogger( CachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup.class );

	private static final String CONFIG_FILENAME = CachedDataInFileMgmt_ConfigFilename_Constants.CONFIG_FILENAME;

	private static final String PROPERTY_FILE_KEY__SUB_DIR = "subdir.to.store.files.in";

	private static final String ENVIRONMENT_VARIABLE__SUB_DIR = "LIMELIGHT_CACHED_WS_RESP_DATA_DIR";

	/**
	 * 
	 *
	 */
	public static class CachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response {

		private File root_Subdirectory_ToStoreFilesIn;

		public File getRoot_Subdirectory_ToStoreFilesIn() {
			return root_Subdirectory_ToStoreFilesIn;
		}
	}

	/**
	 * Load Config file, Read OS Environment Variable, Read JVM -D property for:
	 *		directory to use for storing cached data
	 *      
	 * @return null if no properties file is found
	 */
	@Override
	public CachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response cachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup() throws Exception {

		CachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response response = new CachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response();
		
		log.warn("INFO:  ENTER: CachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup.cachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup() ");

		File root_Subdirectory_ToStoreFilesIn = null;
		
		{
			//  First get from config file
			
			String root_Subdirectory_ToStoreFilesIn_String = getStringFromConfigFile();
			
			if ( root_Subdirectory_ToStoreFilesIn_String != null ) {
			
				root_Subdirectory_ToStoreFilesIn_String = root_Subdirectory_ToStoreFilesIn_String.trim();
			}
			
			String valueFoundInLabel = "";
			
			if ( StringUtils.isNotEmpty( root_Subdirectory_ToStoreFilesIn_String ) ) {
				
				log.warn( "INFO: CachedDataInFile: Value found in config file: '" + CONFIG_FILENAME + "' with key: '" + PROPERTY_FILE_KEY__SUB_DIR + "' with value: " + root_Subdirectory_ToStoreFilesIn_String );

				valueFoundInLabel = "CachedDataInFile: Subdir to use: Value found in config file: '" + CONFIG_FILENAME + "' with key: '" + PROPERTY_FILE_KEY__SUB_DIR + "'. ";
				
			} else {
				
				log.info( "INFO: NO root_Subdirectory_ToStoreFilesIn_String from config file so try from environment variable. ");
				
				root_Subdirectory_ToStoreFilesIn_String = System.getenv( ENVIRONMENT_VARIABLE__SUB_DIR );

				if ( root_Subdirectory_ToStoreFilesIn_String != null ) {
				
					root_Subdirectory_ToStoreFilesIn_String = root_Subdirectory_ToStoreFilesIn_String.trim();
				}


				if ( StringUtils.isNotEmpty( root_Subdirectory_ToStoreFilesIn_String ) ) {

					log.info( "INFO: CachedDataInFile: Subdir to use: Value found in Environment Variable: '" + ENVIRONMENT_VARIABLE__SUB_DIR + "' with value: " + root_Subdirectory_ToStoreFilesIn_String );

					valueFoundInLabel = "CachedDataInFile: Subdir to use: Value found in Environment Variable: '" + ENVIRONMENT_VARIABLE__SUB_DIR + "'";
					
				} else {

					//  Not in config file or Environment Variable so get from JVM -D Property

					Properties prop = System.getProperties();
					root_Subdirectory_ToStoreFilesIn_String = prop.getProperty(ENVIRONMENT_VARIABLE__SUB_DIR);

					if ( root_Subdirectory_ToStoreFilesIn_String != null ) {

						root_Subdirectory_ToStoreFilesIn_String = root_Subdirectory_ToStoreFilesIn_String.trim();
					}

					if ( StringUtils.isNotEmpty( root_Subdirectory_ToStoreFilesIn_String ) ) {

						log.info( "INFO: CachedDataInFile: Subdir to use: Value found in JVM param: '-D" + ENVIRONMENT_VARIABLE__SUB_DIR + "' with value: " + root_Subdirectory_ToStoreFilesIn_String );

						valueFoundInLabel = "CachedDataInFile: Subdir to use: Value found in JVM param: '-D" + ENVIRONMENT_VARIABLE__SUB_DIR + "'";
					} else {

						log.info( "INFO: CachedDataInFile: Subdir to use: NO Value found in JVM param: '-D" + ENVIRONMENT_VARIABLE__SUB_DIR + "'." );
					}
				}
				
			}
			
			if ( StringUtils.isEmpty( root_Subdirectory_ToStoreFilesIn_String ) ) {

				log.warn( "INFO: CachedDataInFile: NO Value found in config file: '" + CONFIG_FILENAME + "' with key: '" + PROPERTY_FILE_KEY__SUB_DIR 
						+ "' OR Environment Variable: '" + ENVIRONMENT_VARIABLE__SUB_DIR + "' or JVM param '-D" + ENVIRONMENT_VARIABLE__SUB_DIR + "'." );
				
			} else {
	
				root_Subdirectory_ToStoreFilesIn = new File( root_Subdirectory_ToStoreFilesIn_String );
				
				if ( root_Subdirectory_ToStoreFilesIn != null ) {
					if ( ! root_Subdirectory_ToStoreFilesIn.exists() ) {

						String subdirCanonicalPath = "";
						try {
							subdirCanonicalPath =
									", subdir canonical path: " + root_Subdirectory_ToStoreFilesIn.getCanonicalPath();
						} catch (Throwable t ) {
							log.error( "Failed to get Canonical Path for subdir: " + root_Subdirectory_ToStoreFilesIn_String );
						}

						log.error( valueFoundInLabel
								+ " Subdir specifies a subdir that does NOT exist. Subdir: AbsolutePath: " + root_Subdirectory_ToStoreFilesIn.getAbsoluteFile()
								+ subdirCanonicalPath );

						//  Clear subdir since not exist
						root_Subdirectory_ToStoreFilesIn = null;
					}
				}
				if ( root_Subdirectory_ToStoreFilesIn != null ) {
					if ( ! root_Subdirectory_ToStoreFilesIn.canWrite() ) {

						String subdirCanonicalPath = "";
						try {
							subdirCanonicalPath =
									", subdir canonical path: " + root_Subdirectory_ToStoreFilesIn.getCanonicalPath();
						} catch (Throwable t ) {
							log.error( "Failed to get Canonical Path for subdir: " + root_Subdirectory_ToStoreFilesIn_String );
						}

						log.error( valueFoundInLabel
								+ " Subdir specifies a subdir that is NOT writable. Subdir: AbsolutePath: " + root_Subdirectory_ToStoreFilesIn.getAbsoluteFile()
								+ subdirCanonicalPath );
						
						//  Clear subdir since not writable
						root_Subdirectory_ToStoreFilesIn = null;
					}
				}
				if ( root_Subdirectory_ToStoreFilesIn != null ) {

					String subdirCanonicalPath = "";
					try {
						subdirCanonicalPath =
								", subdir canonical path: " + root_Subdirectory_ToStoreFilesIn.getCanonicalPath();
					} catch (Throwable t ) {
						log.error( "Failed to get Canonical Path for subdir: " + root_Subdirectory_ToStoreFilesIn_String );
					}

					log.info( valueFoundInLabel
							+ " subdir to be used (found and writable): AbsolutePath: " + root_Subdirectory_ToStoreFilesIn.getAbsoluteFile()
							+ subdirCanonicalPath );
				}
			}

		}
		
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
		
			String root_Subdirectory_ToStoreFilesIn_String = configProps.getProperty( PROPERTY_FILE_KEY__SUB_DIR );
			
			if ( StringUtils.isEmpty( root_Subdirectory_ToStoreFilesIn_String ) ) {
	
				log.info( "CachedDataInFile ConfigFile exists but no value for Subdir key. Config filename: " 
						+ CONFIG_FILENAME
						+ ", propertyFile_SubdirKey: " + PROPERTY_FILE_KEY__SUB_DIR );
				
				return null;
			}
			
			return root_Subdirectory_ToStoreFilesIn_String;
	}


}
