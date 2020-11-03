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
public class CachedDataInFileMgmt_Read_ConfigFile_OnStartup implements CachedDataInFileMgmt_Read_ConfigFile_OnStartup_IF {

	private static final Logger log = LoggerFactory.getLogger( CachedDataInFileMgmt_Read_ConfigFile_OnStartup.class );

	private static final String CONFIG_FILENAME = CachedDataInFileMgmt_ConfigFilename_Constants.CONFIG_FILENAME;

	private static final String PROPERTY_FILE_KEY__SUB_DIR = "subdir.to.store.files.in";

	private static final String PROPERTY_FILE_KEY__USE_GIT_HASH = "use.git.hash";
	
	private static final String PROPERTY_FILE_VALUE__USE_GIT_HASH_TRUE = "true";

	/**
	 * 
	 *
	 */
	public static class CachedDataInFileMgmt_Read_ConfigFile_OnStartup_Response {

		private File root_Subdirectory_ToStoreFilesIn;
		private boolean useGitHash;

		public File getRoot_Subdirectory_ToStoreFilesIn() {
			return root_Subdirectory_ToStoreFilesIn;
		}
		public boolean isUseGitHash() {
			return useGitHash;
		}
	}

	/**
	 * Load Config file for:
	 *		directory to use for storing cached data
	 *      flag to indicate use the build GIT hash for creating the sub dir to use.
	 *      
	 * @return null if no properties file is found
	 */
	@Override
	public CachedDataInFileMgmt_Read_ConfigFile_OnStartup_Response cachedDataInFileMgmt_Read_ConfigFile_OnStartup() throws Exception {

		CachedDataInFileMgmt_Read_ConfigFile_OnStartup_Response response = new CachedDataInFileMgmt_Read_ConfigFile_OnStartup_Response();

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
		
		File root_Subdirectory_ToStoreFilesIn = null;
		
		{
			String root_Subdirectory_ToStoreFilesIn_String = configProps.getProperty( PROPERTY_FILE_KEY__SUB_DIR );
			
			if ( StringUtils.isEmpty( root_Subdirectory_ToStoreFilesIn_String ) ) {
	
				log.info( "CachedDataInFile ConfigFile exists but no value for Subdir key. Config filename: " 
						+ CONFIG_FILENAME
						+ ", propertyFile_SubdirKey: " + PROPERTY_FILE_KEY__SUB_DIR );
				
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

						log.error( "CachedDataInFile ConfigFile exists. Subdir key specifies a subdir that does NOT exist. Config filename: " 
								+ CONFIG_FILENAME
								+ ", subdir: " + PROPERTY_FILE_KEY__SUB_DIR 
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

						log.error( "CachedDataInFile ConfigFile exists. Subdir key specifies a subdir that does exist but is NOT writable. Config filename: " 
								+ CONFIG_FILENAME
								+ ", subdir: " + PROPERTY_FILE_KEY__SUB_DIR 
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

					log.info( "CachedDataInFile ConfigFile exists. Config filename: " 
							+ CONFIG_FILENAME
							+ ", subdir to be used (found and writable): " + PROPERTY_FILE_KEY__SUB_DIR 
							+ subdirCanonicalPath );
				}
			}

		}
		boolean useGitHash = false;
		
		if ( root_Subdirectory_ToStoreFilesIn != null ) {
			
			String useGitHash_String = configProps.getProperty( PROPERTY_FILE_KEY__USE_GIT_HASH );
			
			if ( PROPERTY_FILE_VALUE__USE_GIT_HASH_TRUE.equals( useGitHash_String ) ) {
				
				log.info( "Use GIT Hash is set to true. Config filename: " 
						+ CONFIG_FILENAME);
				useGitHash = true;
			}

		}
		
		response.root_Subdirectory_ToStoreFilesIn = root_Subdirectory_ToStoreFilesIn;
		response.useGitHash = useGitHash;

		return response;
	}
	//  Load Config file for:
	//		directory to use for storing cached data
	//      flag to indicate use the build GIT hash for creating the sub dir to use.



}