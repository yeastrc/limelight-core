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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_file.CachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup.CachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF;

/**
 * The "Current" Root Subdir under the Root Subdir
 * 
 *    Either based on current time stamp or on webapp build GIT Hash
 *
 */
@Component
public class CachedDataInFileMgmt_Current_Root_Subdir_ToStoreFilesIn 

implements 
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
, CachedDataInFileMgmt_Current_Root_Subdir_ToStoreFilesIn_IF
{

	private static final Logger log = LoggerFactory.getLogger( CachedDataInFileMgmt_Current_Root_Subdir_ToStoreFilesIn.class );
	
	@Autowired
	private CachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_IF cachedDataInFileMgmt_Read_ConfigFile_OnStartup;

	@Autowired
	private CachedDataInFileMgmt_WriteFile_GetGitCommitHash_IF cachedDataInFileMgmt_WriteFile_GetGitCommitHash;
	
	@Autowired
	private Cached_WebserviceResponse_Management_IF cached_WebserviceResponse_Management; 
	
	private File current_Root_Subdir_ToStoreFilesIn;

	/* 
	 * Spring LifeCycle Method
	 * 
	 * (non-Javadoc)
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		try {
			initializeObject_AfterPropertiesSetBySpring();
			
		} catch (Exception e) {
			String msg = "In afterPropertiesSet(): Exception in processing";
			log.error(msg);
			throw e;
		}
	}
	
	/**
	 * @return null if not configured or subdir not found
	 */
	@Override
	public File get_current_Root_Subdir_ToStoreFilesIn() {
		
		return this.current_Root_Subdir_ToStoreFilesIn;
	}
	

	//////////

	/**
	 * called from method !! afterPropertiesSet() !! in this object which is called by Spring after Properties are Set but before Object is in use.
	 * 
	 * Load Config files for directing to 
	 * @throws Exception 
	 */
	private void initializeObject_AfterPropertiesSetBySpring() throws Exception {
		
		//  Load Config file for:
		//		directory to use for storing cached data
		//      flag to indicate use the build GIT hash for creating the sub dir to use.

		CachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response cachedDataInFileMgmt_Read_ConfigFile_OnStartup_Response  =
				cachedDataInFileMgmt_Read_ConfigFile_OnStartup.cachedDataInFileMgmt_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup();

		if ( cachedDataInFileMgmt_Read_ConfigFile_OnStartup_Response == null ) {
			
			//  Either no config file or sub dir not configured so exit
			
			return; // EARLY RETURN
		}
		
		//   From Config:
		File root_Subdirectory_ToStoreFilesIn = cachedDataInFileMgmt_Read_ConfigFile_OnStartup_Response.getRoot_Subdirectory_ToStoreFilesIn();
			
		if ( root_Subdirectory_ToStoreFilesIn == null ) {
			
			//  Either no config file or sub dir not configured so exit
			
			return; // EARLY RETURN
		}
		
		//  Under root dir, create sub dirs if needed and exit if not exist after attempt create
		
		File subDir_Cache_For_Versioned_Webservices_ROOT = new File( root_Subdirectory_ToStoreFilesIn, "For_Versioned_Webservices");
		
		subDir_Cache_For_Versioned_Webservices_ROOT.mkdir();
		
		if ( ! subDir_Cache_For_Versioned_Webservices_ROOT.exists() ) {

			String canonicalPath = "";
			try {
				canonicalPath = ".  canonical path: " + subDir_Cache_For_Versioned_Webservices_ROOT.getCanonicalPath();
			} catch (Throwable t) {
				log.error( "Failed to get canonical path for subDir_Cache_For_Versioned_Webservices_ROOT", t);
				// Swallow Exception
			}
			log.warn("No Caching of webservice responses.  Subdir for caching, after attempt to create, versioned root dir not exist: "
					+ subDir_Cache_For_Versioned_Webservices_ROOT.getAbsolutePath()
					+ canonicalPath );
			
			return;
		}

		File subDir_Cache_For_Versioned_Webservices_CURRENT = new File( subDir_Cache_For_Versioned_Webservices_ROOT, "For_Versioned_Webservices_CURRENT");
		
		subDir_Cache_For_Versioned_Webservices_CURRENT.mkdir();
		
		if ( ! subDir_Cache_For_Versioned_Webservices_CURRENT.exists() ) {

			String canonicalPath = "";
			try {
				canonicalPath = ".  canonical path: " + subDir_Cache_For_Versioned_Webservices_CURRENT.getCanonicalPath();
			} catch (Throwable t) {
				log.error( "Failed to get canonical path for subDir_Cache_For_Versioned_Webservices_CURRENT", t);
				// Swallow Exception
			}
			log.warn("No Caching of webservice responses.  Subdir for caching, after attempt to create, versioned CURRENT dir not exist: " 
					+ subDir_Cache_For_Versioned_Webservices_CURRENT.getAbsolutePath()
					+ canonicalPath );
			
			return;
		}

		File subDir_Cache_For_Versioned_Webservices_TO_DELETE = new File( subDir_Cache_For_Versioned_Webservices_ROOT, "For_Versioned_Webservices_TO_DELETE");

		subDir_Cache_For_Versioned_Webservices_TO_DELETE.mkdir();
		
		if ( ! subDir_Cache_For_Versioned_Webservices_TO_DELETE.exists() ) {

			String canonicalPath = "";
			try {
				canonicalPath = ".  canonical path: " + subDir_Cache_For_Versioned_Webservices_TO_DELETE.getCanonicalPath();
			} catch (Throwable t) {
				log.error( "Failed to get canonical path for subDir_Cache_For_Versioned_Webservices_TO_DELETE", t);
				// Swallow Exception
			}
			log.warn("No Caching of webservice responses.  Subdir for caching, after attempt to create, versioned TO DELETE dir not exist: " 
					+ subDir_Cache_For_Versioned_Webservices_TO_DELETE.getAbsolutePath() 
					+ canonicalPath );
			
			return;
		}
			
		//  'Current' subdir now exists
		
		// Store in class Object
		this.current_Root_Subdir_ToStoreFilesIn = subDir_Cache_For_Versioned_Webservices_CURRENT;

		//  Create and start thread to remove all subdirs in  root_Subdirectory_ToStoreFilesIn
		//     other than current_SubDir_String
		
		CachedDataInFileMgmt_Remove_Old_CurrentSubdirs cachedDataInFileMgmt_Remove_Old_CurrentSubdirs = new CachedDataInFileMgmt_Remove_Old_CurrentSubdirs();
		
		cachedDataInFileMgmt_Remove_Old_CurrentSubdirs.setSubDir_Cache_For_Versioned_Webservices_CURRENT( subDir_Cache_For_Versioned_Webservices_CURRENT );
		cachedDataInFileMgmt_Remove_Old_CurrentSubdirs.setSubDir_Cache_For_Versioned_Webservices_TO_DELETE(subDir_Cache_For_Versioned_Webservices_TO_DELETE);
		
		cachedDataInFileMgmt_Remove_Old_CurrentSubdirs.setCached_WebserviceResponse_Management( cached_WebserviceResponse_Management );
		
		cachedDataInFileMgmt_Remove_Old_CurrentSubdirs.startThread();
	}

}
