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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_file.CachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames.CachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames_Response;

/**
 * Cached Data in File Management - Write file - Will call Async method on Async class
 *
 */
@Component
public class CachedDataInFileMgmt_WriteFile 

implements 
CachedDataInFileMgmt_WriteFile_IF
{

	private static final Logger log = LoggerFactory.getLogger( CachedDataInFileMgmt_WriteFile.class );
	
	@Autowired
	CachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames_IF cachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames;
	
	@Autowired 
	CachedDataInFileMgmt_WriteFile_Async cachedDataInFileMgmt_WriteFile_Async;

	/**
	 *
	 */
	public static class CachedDataInFileMgmt_WriteFile_Parameters {

		private String controllerPath;
		private byte[] requestPostBody;
		private byte[] responseBodyBytes;
		
		public void setControllerPath(String controllerPath) {
			this.controllerPath = controllerPath;
		}
		public void setRequestPostBody(byte[] requestPostBody) {
			this.requestPostBody = requestPostBody;
		}
		public void setResponseBodyBytes(byte[] responseBodyBytes) {
			this.responseBodyBytes = responseBodyBytes;
		}
	}
	
	//////////////
	
	/**
	 * @param parameters
	 */
	@Override
	public void cachedDataInFileMgmt_WriteFile( CachedDataInFileMgmt_WriteFile_Parameters parameters ) throws Exception {

		CachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames_Response subdirFilenamesResponse =
				cachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames.get_Subdir_ToStoreFilesIn_FileNames( parameters.controllerPath, parameters.requestPostBody );
		
		if ( subdirFilenamesResponse == null ) {
			
			//  Not Configured so cannot save anything
			
			return; //  EARLY RETURN
		}
		
		CachedDataInFileMgmt_WriteFile_Async_Parameters cachedDataInFileMgmt_WriteFile_Async_Parameters = new CachedDataInFileMgmt_WriteFile_Async_Parameters();
		synchronized ( this ) {
			cachedDataInFileMgmt_WriteFile_Async_Parameters.setWebservice_Request_Data( parameters.requestPostBody );
			cachedDataInFileMgmt_WriteFile_Async_Parameters.setWebservice_Response_Data( parameters.responseBodyBytes );

			cachedDataInFileMgmt_WriteFile_Async_Parameters.setControllerPath_Dir( subdirFilenamesResponse.getControllerPath_Dir() );
			cachedDataInFileMgmt_WriteFile_Async_Parameters.setSubdir_1( subdirFilenamesResponse.getSubdir_1() );
			cachedDataInFileMgmt_WriteFile_Async_Parameters.setSubdir_2( subdirFilenamesResponse.getSubdir_2() );
			
			cachedDataInFileMgmt_WriteFile_Async_Parameters.setCachedDataFile_Webservice_Request_File( subdirFilenamesResponse.getCachedDataFile_Webservice_Request_File() );
			cachedDataInFileMgmt_WriteFile_Async_Parameters.setCachedDataFile_Webservice_Response_File( subdirFilenamesResponse.getCachedDataFile_Webservice_Response_File() );
			cachedDataInFileMgmt_WriteFile_Async_Parameters.setCachedDataFile_Done_File( subdirFilenamesResponse.getCachedDataFile_Done_File() );
			
		}
		
		try {
			//  Called method will run in Spring managed ThreadExecutor
			
			cachedDataInFileMgmt_WriteFile_Async.writeCachedData_ToFile_Async( cachedDataInFileMgmt_WriteFile_Async_Parameters );
			
		} catch (Throwable t) {
			
			//  Eat any exception
			
			log.error( "Exception calling cachedDataInFileMgmt_WriteFile_Async.writeCachedData_ToFile_Async(...)", t);
		}
		
	}
	

}
