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
import java.io.FileInputStream;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_file.CachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames.CachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames_Response;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * Cached Data in File Management - Read file
 *
 */
@Component
public class CachedDataInFileMgmt_ReadFile implements CachedDataInFileMgmt_ReadFile_IF {

	private static final Logger log = LoggerFactory.getLogger( CachedDataInFileMgmt_ReadFile.class );
	
	@Autowired
	CachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames_IF cachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames;

	/**
	 *
	 */
	public static class CachedDataInFileMgmt_ReadFile_Parameters {

		private String controllerPath;
		private byte[] requestPostBody;
		
		public void setControllerPath(String controllerPath) {
			this.controllerPath = controllerPath;
		}
		public void setRequestPostBody(byte[] requestPostBody) {
			this.requestPostBody = requestPostBody;
		}
	}
	
	/**
	 * @param parameters
	 * @return null if not found or not configured or request bytes on disk not match request bytes in request
	 * @throws Exception
	 */
	@Override
	public byte[] cachedDataInFileMgmt_ReadFile( CachedDataInFileMgmt_ReadFile_Parameters parameters ) throws Exception {

		CachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames_Response subdirFilenamesResponse =
				cachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames.get_Subdir_ToStoreFilesIn_FileNames( parameters.controllerPath, parameters.requestPostBody );
		
		if ( subdirFilenamesResponse == null ) {
			
			//  Not Configured so cannot save anything
			
			return null; //  EARLY RETURN
		}
		
		File cachedDataFile_Webservice_Request_File = subdirFilenamesResponse.getCachedDataFile_Webservice_Request_File();
		File cachedDataFile_Webservice_Response_File = subdirFilenamesResponse.getCachedDataFile_Webservice_Response_File();
		File cachedDataFile_Done_File = subdirFilenamesResponse.getCachedDataFile_Done_File();
		
		if ( ! cachedDataFile_Done_File.exists() ) {
			
			//  "Done" file does not exist
			
			return null; //  EARLY RETURN
		}
		
		//  First compare request byte[] to file
		{
			long requestFileLength = cachedDataFile_Webservice_Request_File.length();

			if ( requestFileLength > Integer.MAX_VALUE ) {

				//  To big to read into an byte[], too big to be in a byte[] in the first place

				log.error( "Request file too big for byte[]. requestFileLength: " + requestFileLength );

				return null; //  EARLY RETURN
			}

			byte[] requestInFile = new byte[ (int) requestFileLength ];
			
			try ( FileInputStream fis = new FileInputStream( cachedDataFile_Webservice_Request_File ) ) {
				int bytesRead = fis.read( requestInFile );
				if ( bytesRead != requestFileLength ) {
					String msg = "bytesRead != requestFileLength. length: " + requestFileLength 
							+ ", file: " + cachedDataFile_Webservice_Request_File.getAbsolutePath();
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
			}

			if ( ! Arrays.equals( requestInFile, parameters.requestPostBody ) ) {
				
				String requestPostBody_String = "Unable to convert to String UTF-8";
				String requestInFile_String = "Unable to convert to String UTF-8";

				try {
					requestPostBody_String = new String( parameters.requestPostBody, StandardCharsets.UTF_8 );
				} catch ( Throwable t ) {
					log.warn( "In Prep to create 'warn' message: Failing to convert parameters.requestPostBody to String UTF-8", t );
				}
				try {
					requestInFile_String = new String( requestInFile, StandardCharsets.UTF_8 );
				} catch ( Throwable t ) {
					log.warn( "In Prep to create 'warn' message: Failing to convert requestInFile to String UTF-8", t );
				}
				
				String msg = "The cached Request URL Partial does not match the Request URL Partial in the request.  "
						+ "Cached Request : " + requestInFile_String
						+ ".  Webservice Request : " + requestPostBody_String
						+ ", file: " + cachedDataFile_Webservice_Request_File.getAbsolutePath();
				log.warn( msg );
				return null;  // EARLY EXIT
			}
		}

		//  Second Get Response from Response file
		{
			long responseFileLength = cachedDataFile_Webservice_Response_File.length();

			if ( responseFileLength > Integer.MAX_VALUE ) {

				//  To big to read into an byte[], too big to be in a byte[] in the first place

				log.error( "Response file too big for byte[]. responseFileLength: " + responseFileLength );

				return null; //  EARLY RETURN
			}

			byte[] responseInFile = new byte[ (int) responseFileLength ];
			
			try ( FileInputStream fis = new FileInputStream( cachedDataFile_Webservice_Response_File ) ) {
				int bytesRead = fis.read( responseInFile );
				if ( bytesRead != responseFileLength ) {
					String msg = "bytesRead != responseFileLength. length: " + responseFileLength 
							+ ", file: " + cachedDataFile_Webservice_Response_File.getAbsolutePath();
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
			}
			
			return responseInFile;
		}
	}
}
