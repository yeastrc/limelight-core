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

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * Clean up root_Subdirectory_ToStoreFilesIn, removing all subdirs except current_SubDir_String
 *
 */
public class CachedDataInFileMgmt_Remove_Old_CurrentSubdirs implements Runnable {

	private static final Logger log = LoggerFactory.getLogger( CachedDataInFileMgmt_Remove_Old_CurrentSubdirs.class );
	
	private static volatile boolean shutdownRequested = false;
	
	private File root_Subdirectory_ToStoreFilesIn;
	private String current_SubDir_String; //  'Current' subdir.  Delete all but this
	
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
			if ( this.root_Subdirectory_ToStoreFilesIn == null ) {
				String msg = "this.root_Subdirectory_ToStoreFilesIn == null";
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			if ( StringUtils.isEmpty( this.current_SubDir_String ) ) {
				String msg = "this.current_SubDir_String is empty or null";
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}

			log.info( "INFO: Starting cleanup of dir: " 
					+ root_Subdirectory_ToStoreFilesIn.getAbsolutePath() 
					+ " except for new subdir: "
					+ current_SubDir_String );
			
			processRootSubdir();

			log.info( "INFO: Finished cleanup of dir: " 
					+ root_Subdirectory_ToStoreFilesIn.getAbsolutePath() 
					+ " except for new subdir: "
					+ current_SubDir_String );
			
		} catch ( Throwable t ) {
			log.error( "In Main run(). Throwable caught.", t );
		}
	}
	
	/**
	 * 
	 */
	private void processRootSubdir() {
		
		for ( File subdir : this.root_Subdirectory_ToStoreFilesIn.listFiles() ) {
			
			if ( CachedDataInFileMgmt_Remove_Old_CurrentSubdirs.shutdownRequested ) {
				
				return; // EARLY RETURN 
			}
			
			if ( ! subdir.getName().equals( this.current_SubDir_String ) ) {
				
				//  Subdir other than this.current_SubDir_String
				
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
	}

	/**
	 * 
	 */
	private void deleteSubdir_Contents( File subdir ) {
		
		for ( File subdirEntry : subdir.listFiles() ) {

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

	public File getRoot_Subdirectory_ToStoreFilesIn() {
		return root_Subdirectory_ToStoreFilesIn;
	}

	public void setRoot_Subdirectory_ToStoreFilesIn(File root_Subdirectory_ToStoreFilesIn) {
		this.root_Subdirectory_ToStoreFilesIn = root_Subdirectory_ToStoreFilesIn;
	}

	public String getCurrent_SubDir_String() {
		return current_SubDir_String;
	}

	public void setCurrent_SubDir_String(String current_SubDir_String) {
		this.current_SubDir_String = current_SubDir_String;
	}
	
	
}
