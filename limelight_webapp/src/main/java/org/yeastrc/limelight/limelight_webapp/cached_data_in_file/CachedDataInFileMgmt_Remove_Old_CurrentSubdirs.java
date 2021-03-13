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
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * Clean up root_Subdirectory_ToStoreFilesIn, removing all subdirs except current_SubDir_String
 *
 */
public class CachedDataInFileMgmt_Remove_Old_CurrentSubdirs implements Runnable {

	private static final Logger log = LoggerFactory.getLogger( CachedDataInFileMgmt_Remove_Old_CurrentSubdirs.class );
	
	private static volatile boolean shutdownRequested = false;
	
	private File subDir_Cache_For_Versioned_Webservices_CURRENT;   // Subdir to check and clean out
	private File subDir_Cache_For_Versioned_Webservices_TO_DELETE; // Move to here before delete 
	
	private Cached_WebserviceResponse_Management_IF cached_WebserviceResponse_Management;
	
	/**
	 * 
	 */
	public void startThread() {

		Thread thread = new Thread( this );
		thread.setDaemon(true);
		thread.setName( "CachedDataInFileMgmt_Remove_Old_CurrentSubdirs_Thread" );
		thread.start();
	}

	/* (non-Javadoc)
	 * @see java.lang.Runnable#run()
	 */
	@Override
	public void run() {
		
		try {
			if ( this.subDir_Cache_For_Versioned_Webservices_CURRENT == null ) {
				String msg = "this.subDir_Cache_For_Versioned_Webservices_CURRENT == null";
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			if ( this.subDir_Cache_For_Versioned_Webservices_TO_DELETE == null ) {
				String msg = "this.subDir_Cache_For_Versioned_Webservices_TO_DELETE == null";
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}

			log.info( "INFO: Sleeping for 5 seconds to allow all web services to register: " );
			
			Thread.sleep( 5000 );

			log.info( "INFO: Starting cleanup of dir: " 
					+ subDir_Cache_For_Versioned_Webservices_CURRENT.getAbsolutePath() );
			
			processRootSubdir();

			log.info( "INFO: Finished cleanup of dir: " 
					+ subDir_Cache_For_Versioned_Webservices_CURRENT.getAbsolutePath()  );
			
		} catch ( Throwable t ) {
			log.error( "In Main run(). Throwable caught.", t );
		}
	}
	
	/**
	 * 
	 */
	private void processRootSubdir() {

		Set<String> registered_ControllerPaths = cached_WebserviceResponse_Management.get_registered_ControllerPaths_Copy();
		
		File[] currentDir_FileList = this.subDir_Cache_For_Versioned_Webservices_CURRENT.listFiles() ;
		
		if ( currentDir_FileList == null ) {
			
			//  Empty 
			
			return; // EARLY RETURN
		}
		
		//  FIRST:   Move Subdirs that are to be deleted to   this.subDir_Cache_For_Versioned_Webservices_TO_DELETE
		
		
		for ( File subdir : this.subDir_Cache_For_Versioned_Webservices_CURRENT.listFiles() ) {
			
			if ( CachedDataInFileMgmt_Remove_Old_CurrentSubdirs.shutdownRequested ) {
				
				return; // EARLY RETURN 
			}
			
			if ( ! registered_ControllerPaths.contains( subdir.getName() ) ) {
				
				//  Subdir NOT in current registered Controller Paths, Move to TO DELETE
				
				File subDir_Under_TO_DELETE = new File( this.subDir_Cache_For_Versioned_Webservices_TO_DELETE, subdir.getName() );
				
				subdir.renameTo(subDir_Under_TO_DELETE);
			}
		}

		//  SECOND:   Delete Subdirs that have been Moved to be deleted to   this.subDir_Cache_For_Versioned_Webservices_TO_DELETE
		
		for ( File subdir : this.subDir_Cache_For_Versioned_Webservices_TO_DELETE.listFiles() ) {
			
			if ( CachedDataInFileMgmt_Remove_Old_CurrentSubdirs.shutdownRequested ) {
				
				return; // EARLY RETURN 
			}

			deleteSubdir_Contents( subdir );

			try {
				if ( ! subdir.delete() ) {

					log.error( "Failed to delete subdir: " + subdir.getAbsolutePath() );
				}
			} catch ( Exception e ) {

				String msg = "Failed to delete subdir: " + subdir.getAbsolutePath();
				log.error(msg);
			}
		}
	}

	/**
	 * 
	 */
	private void deleteSubdir_Contents( File subdir ) {
		
		File[] subDirList = subdir.listFiles();
		
		if ( subDirList == null ) {
			//  NO entries
			
			return; // EARLY RETURN
		}
		
		for ( File subdirEntry : subDirList ) {

			if ( CachedDataInFileMgmt_Remove_Old_CurrentSubdirs.shutdownRequested ) {
				
				return; // EARLY RETURN 
			}
			
			if ( subdirEntry.isDirectory() ) {
				
				deleteSubdir_Contents( subdirEntry ); // recursive call
			}

			try {
				if ( ! subdirEntry.delete() ) {

					log.error( "Failed to delete subdir or file: " + subdirEntry.getAbsolutePath() );
				}
			} catch ( RuntimeException e ) {
				
				log.error( "Failed to delete subdir or file: " + subdirEntry.getAbsolutePath(), e );
				throw e;
			}
		}
	}
		
	///////////

	public static boolean isShutdownRequested() {
		return shutdownRequested;
	}

	public static void setShutdownRequested(boolean shutdownRequested) {
		CachedDataInFileMgmt_Remove_Old_CurrentSubdirs.shutdownRequested = shutdownRequested;
	}

	public void setSubDir_Cache_For_Versioned_Webservices_CURRENT(File subDir_Cache_For_Versioned_Webservices_CURRENT) {
		this.subDir_Cache_For_Versioned_Webservices_CURRENT = subDir_Cache_For_Versioned_Webservices_CURRENT;
	}

	public void setSubDir_Cache_For_Versioned_Webservices_TO_DELETE(File subDir_Cache_For_Versioned_Webservices_TO_DELETE) {
		this.subDir_Cache_For_Versioned_Webservices_TO_DELETE = subDir_Cache_For_Versioned_Webservices_TO_DELETE;
	}

	public void setCached_WebserviceResponse_Management(
			Cached_WebserviceResponse_Management_IF cached_WebserviceResponse_Management) {
		this.cached_WebserviceResponse_Management = cached_WebserviceResponse_Management;
	}
	
	
}
