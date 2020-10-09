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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_file.CachedDataInFileMgmt_Read_ConfigFile_OnStartup.CachedDataInFileMgmt_Read_ConfigFile_OnStartup_Response;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_file.CachedDataInFileMgmt_WriteFile_GetGitCommitHash.CachedDataInFileMgmt_WriteFile_GetGitCommitHash_Response;

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
	CachedDataInFileMgmt_Read_ConfigFile_OnStartup_IF cachedDataInFileMgmt_Read_ConfigFile_OnStartup;

	@Autowired
	CachedDataInFileMgmt_WriteFile_GetGitCommitHash_IF cachedDataInFileMgmt_WriteFile_GetGitCommitHash;
	
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

		CachedDataInFileMgmt_Read_ConfigFile_OnStartup_Response cachedDataInFileMgmt_Read_ConfigFile_OnStartup_Response  =
				cachedDataInFileMgmt_Read_ConfigFile_OnStartup.cachedDataInFileMgmt_Read_ConfigFile_OnStartup();

		//   From Config:
		File root_Subdirectory_ToStoreFilesIn = cachedDataInFileMgmt_Read_ConfigFile_OnStartup_Response.getRoot_Subdirectory_ToStoreFilesIn();
			
		if ( root_Subdirectory_ToStoreFilesIn == null ) {
			
			//  Either no config file or sub dir not configured so exit
			
			return; // EARLY RETURN
		}
		
		//  Compute "Current" sub dir under root dir (Based on GIT Hash or current Time Stamp).
		
		String current_SubDir_String = null;
		
		if ( cachedDataInFileMgmt_Read_ConfigFile_OnStartup_Response.isUseGitHash() ) {
			
			//  Use GIT Hash for "Current" sub dir under root dir.  
			//      This way keep data through Tomcat and OS restart.  Only not keep data when GIT Hash changes for GIT Commit of Software repo.
		
			CachedDataInFileMgmt_WriteFile_GetGitCommitHash_Response cachedDataInFileMgmt_WriteFile_GetGitCommitHash_Response =
					cachedDataInFileMgmt_WriteFile_GetGitCommitHash.cachedDataInFileMgmt_WriteFile_GetGitCommitHash();
		
			if ( cachedDataInFileMgmt_WriteFile_GetGitCommitHash_Response != null ) {
				
				String git_Full_Hash = cachedDataInFileMgmt_WriteFile_GetGitCommitHash_Response.getGit_Full_Hash();
				
				if ( StringUtils.isNotEmpty( git_Full_Hash ) ) {
					
					current_SubDir_String = "GH_" + git_Full_Hash;
					
					log.warn("INFO::  Using current_SubDir_String: " + current_SubDir_String );
				}
			}
		}
		
		if ( current_SubDir_String == null ) {
			
			//  current_SubDir_String not set yet so set based on current time stamp
			
			// Java 8 datetime API:
		    current_SubDir_String = "TS_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy_MM_dd_HH_mm_ss_SSS"));
		    
		    log.warn("INFO::  Using current_SubDir_String: " + current_SubDir_String );
		}
		
		//  The 'Current' root subdir which is a subdir of root_Subdirectory_ToStoreFilesIn
		File current_Root_Subdir_ToStoreFilesIn_LOCAL = new File( root_Subdirectory_ToStoreFilesIn, current_SubDir_String );
		
		if ( ! current_Root_Subdir_ToStoreFilesIn_LOCAL.exists() ) {
			
			current_Root_Subdir_ToStoreFilesIn_LOCAL.mkdir();
			
		}

		if ( ! current_Root_Subdir_ToStoreFilesIn_LOCAL.exists() ) {
			
			//  'Current' subdir still not exist after calling mkdir()
			
			String canonicalPath = "";
			try {
				canonicalPath = ".  canonical path: " + current_Root_Subdir_ToStoreFilesIn_LOCAL.getCanonicalPath();
			} catch (Throwable t) {
				log.error( "Failed to get canonical path for current_Root_Subdir_ToStoreFilesIn", t);
				// Swallow Exception
			}
			log.error( "'Current' root subdir not exist and unable to create it: " 
					+ current_Root_Subdir_ToStoreFilesIn_LOCAL.getAbsolutePath()
					+ canonicalPath );
			
			return;  // EARLY EXIT
		
		}
			
		//  'Current' subdir now exists
		
		// Store in class Object
		this.current_Root_Subdir_ToStoreFilesIn = current_Root_Subdir_ToStoreFilesIn_LOCAL;

		//  Create and start thread to remove all subdirs in  root_Subdirectory_ToStoreFilesIn
		//     other than current_SubDir_String
		
		CachedDataInFileMgmt_Remove_Old_CurrentSubdirs cachedDataInFileMgmt_Remove_Old_CurrentSubdirs = new CachedDataInFileMgmt_Remove_Old_CurrentSubdirs();
		
		cachedDataInFileMgmt_Remove_Old_CurrentSubdirs.setRoot_Subdirectory_ToStoreFilesIn( root_Subdirectory_ToStoreFilesIn );
		cachedDataInFileMgmt_Remove_Old_CurrentSubdirs.setCurrent_SubDir_String( current_SubDir_String );
		
		cachedDataInFileMgmt_Remove_Old_CurrentSubdirs.startThread();
	}
}
