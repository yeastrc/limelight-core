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

import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants_config_filenames.LimelightWebapp_BuildInfo_Incl_GitHash_Filename_Constants;

/**
 * Get the Commit Hash from the properties file
 *
 */
@Component
public class CachedDataInFileMgmt_WriteFile_GetGitCommitHash implements CachedDataInFileMgmt_WriteFile_GetGitCommitHash_IF {

	private static final Logger log = LoggerFactory.getLogger( CachedDataInFileMgmt_Read_ConfigFile_OnStartup.class );

	/**
	 * File created by build.gradle when web app is built using Gradle
	 */
	private static final String CONFIG_FILENAME = LimelightWebapp_BuildInfo_Incl_GitHash_Filename_Constants.WEBAPP_BUILD_INFO_GIT_HASH_FILENAME;

	private static final String PROPERTY_FILE_KEY__GIT_FULL_HASH = "GIT-Full-HASH";

	/**
	 *
	 */
	public static class CachedDataInFileMgmt_WriteFile_GetGitCommitHash_Response {

		private String git_Full_Hash;

		public String getGit_Full_Hash() {
			return git_Full_Hash;
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
	public CachedDataInFileMgmt_WriteFile_GetGitCommitHash_Response cachedDataInFileMgmt_WriteFile_GetGitCommitHash() throws Exception {

		CachedDataInFileMgmt_WriteFile_GetGitCommitHash_Response response = new CachedDataInFileMgmt_WriteFile_GetGitCommitHash_Response();

		Properties configProps = null;
		InputStream propertiesFileAsStream = null;

		try {

			//  Get config file from class path

			ClassLoader thisClassLoader = this.getClass().getClassLoader();
			URL configFileUrlObjUrlLocal = thisClassLoader.getResource( CONFIG_FILENAME );

			if ( configFileUrlObjUrlLocal == null ) {
				String msg = "Properties file '" + CONFIG_FILENAME + "' not found in class path.";
				log.error( msg );

				return null; // EARLY RETURN

			} else {
				if ( log.isInfoEnabled() ) {
					log.info( "Properties file '" + CONFIG_FILENAME + "' found, load path = " + configFileUrlObjUrlLocal.getFile() );
				}
			}

			propertiesFileAsStream = configFileUrlObjUrlLocal.openStream();

			if ( propertiesFileAsStream == null ) {
				String msg = "Properties file '" + CONFIG_FILENAME + "' not found in class path.";
				log.error( msg );

				return null; // EARLY RETURN

			}

			configProps = new Properties();

			configProps.load( propertiesFileAsStream );

		} finally {

			if ( propertiesFileAsStream != null ) {

				propertiesFileAsStream.close();
			}
		}
		
		response.git_Full_Hash = configProps.getProperty( PROPERTY_FILE_KEY__GIT_FULL_HASH );

		if ( StringUtils.isEmpty( response.git_Full_Hash ) ) {

			log.info( "CachedDataInFile ConfigFile exists but no value for Subdir key. Config filename: " 
					+ CONFIG_FILENAME
					+ ", git_Full_Hash: " + PROPERTY_FILE_KEY__GIT_FULL_HASH );
		}

		return response;
	}
}
