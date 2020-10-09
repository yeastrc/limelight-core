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
import java.io.FileOutputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Cached Data in File Management - Write file using Async
 * 
 * Package Private class
 *
 */
@Component
class CachedDataInFileMgmt_WriteFile_Async {

	static final Logger log = LoggerFactory.getLogger( CachedDataInFileMgmt_WriteFile_Async.class );
	
	static final byte[] doneBytes = "done".getBytes();
	
	/**
	 * @param cachedDataInFileMgmt_WriteFile_Async_Parameters
	 * 
	 * method will run in Spring managed ThreadExecutor
	 */
	@Async
	@Transactional
	void writeCachedData_ToFile_Async( CachedDataInFileMgmt_WriteFile_Async_Parameters cachedDataInFileMgmt_WriteFile_Async_Parameters ) {
		try {
			byte[] webservice_Request_Data = cachedDataInFileMgmt_WriteFile_Async_Parameters.getWebservice_Request_Data();
			byte[] webservice_Response_Data = cachedDataInFileMgmt_WriteFile_Async_Parameters.getWebservice_Response_Data();

			File controllerPath_Dir = cachedDataInFileMgmt_WriteFile_Async_Parameters.getControllerPath_Dir();
			File subdir_1 = cachedDataInFileMgmt_WriteFile_Async_Parameters.getSubdir_1();
			File subdir_2 = cachedDataInFileMgmt_WriteFile_Async_Parameters.getSubdir_2();

			File cachedDataFile_Webservice_Request_File = cachedDataInFileMgmt_WriteFile_Async_Parameters.getCachedDataFile_Webservice_Request_File();
			File cachedDataFile_Webservice_Response_File = cachedDataInFileMgmt_WriteFile_Async_Parameters.getCachedDataFile_Webservice_Response_File();
			File cachedDataFile_Done_File = cachedDataInFileMgmt_WriteFile_Async_Parameters.getCachedDataFile_Done_File();

			if ( cachedDataFile_Done_File.exists() ) {

				//  Done File already exists so exit

				return;  // EARLY RETURN
			}

			if ( ! controllerPath_Dir.exists() ) {
				controllerPath_Dir.mkdir();
				if ( ! controllerPath_Dir.exists() ) {

					log.warn( "Unable to create subdir " + controllerPath_Dir.getAbsolutePath() );

					return; // EARLY RETURN
				}
			}
			if ( ! subdir_1.exists() ) {
				subdir_1.mkdir();
				if ( ! subdir_1.exists() ) {

					log.warn( "Unable to create subdir " + subdir_1.getAbsolutePath() );

					return; // EARLY RETURN
				}
			}
			if ( ! subdir_2.exists() ) {
				subdir_2.mkdir();
				if ( ! subdir_2.exists() ) {

					log.warn( "Unable to create subdir " + subdir_2.getAbsolutePath() );

					return; // EARLY RETURN
				}
			}

			//  Write Request Data
			try ( FileOutputStream fios = new FileOutputStream( cachedDataFile_Webservice_Request_File ) ) {
				fios.write( webservice_Request_Data );
			}
			//  Write Response Data
			try ( FileOutputStream fios = new FileOutputStream( cachedDataFile_Webservice_Response_File ) ) {
				fios.write( webservice_Response_Data );
			}
			//  Write Done Data
			try ( FileOutputStream fios = new FileOutputStream( cachedDataFile_Done_File ) ) {
				fios.write( doneBytes );
			}
			
		} catch ( Exception e ) {
			
			log.error( "Failed to write Cached data files in Async", e );
		}
		
		
//		log.warn( "writeCachedData_ToFile_Async: CachedDataFile_Webservice_Response_File: " + 
//				cachedDataInFileMgmt_WriteFile_Async_Parameters.getCachedDataFile_Webservice_Response_File().getAbsolutePath() );
	}
}
