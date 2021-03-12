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
import java.security.MessageDigest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 
 *
 */
@Component
public class CachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames implements CachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames_IF {

	private static final Logger log = LoggerFactory.getLogger( CachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames.class );
	
	private static final String FILENAME_SUFFIX__REQUEST_DATA = ".request_data";
	private static final String FILENAME_SUFFIX__RESPONSE_DATA = ".response_data.gz";
	private static final String FILENAME_SUFFIX__DONE = ".done";
	
	private static final String SHA_384_ALGORITHM = "SHA-384";
	
	@Autowired
	CachedDataInFileMgmt_Current_Root_Subdir_ToStoreFilesIn_IF cachedDataInFileMgmt_Current_Root_Subdir_ToStoreFilesIn;
	
	/**
	 * 
	 *
	 */
	public static class CachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames_Response {

		private File controllerPath_Dir;
		private File subdir_1;
		private File subdir_2;
		private File cachedDataFile_Webservice_Request_File;
		private File cachedDataFile_Webservice_Response_File;
		private File cachedDataFile_Done_File;
		
		public File getCachedDataFile_Webservice_Request_File() {
			return cachedDataFile_Webservice_Request_File;
		}
		public File getCachedDataFile_Webservice_Response_File() {
			return cachedDataFile_Webservice_Response_File;
		}
		public File getCachedDataFile_Done_File() {
			return cachedDataFile_Done_File;
		}
		public File getSubdir_1() {
			return subdir_1;
		}
		public File getSubdir_2() {
			return subdir_2;
		}
		public File getControllerPath_Dir() {
			return controllerPath_Dir;
		}
	}
	
	/**
	 * @return null if not configured or subdir not found
	 */
	@Override
	public CachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames_Response get_Subdir_ToStoreFilesIn_FileNames( String controllerPath_String, byte[] webservice_Request_Data ) throws Exception {

		if ( StringUtils.isEmpty( controllerPath_String ) ) {
			String msg = "controllerPath_String cannot be null or empty";
			log.error( msg );
			throw new IllegalArgumentException( msg );
		}
		if ( webservice_Request_Data == null || webservice_Request_Data.length == 0 ) {
			String msg = "webservice_Request_Data cannot be null or empty";
			log.error( msg );
			throw new IllegalArgumentException( msg );
		}
		if ( controllerPath_String.contains( "/" ) ) {
			String msg = "controllerPath_String cannot contain '/'";
			log.error( msg );
			throw new IllegalArgumentException( msg );
		}
		
		File current_Root_Subdir_ToStoreFilesIn = cachedDataInFileMgmt_Current_Root_Subdir_ToStoreFilesIn.get_current_Root_Subdir_ToStoreFilesIn();

		if ( current_Root_Subdir_ToStoreFilesIn == null ) {

			//  Not Configured so cannot save anything

			return null; //  EARLY RETURN
		}

		CachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames_Response response = new CachedDataInFileMgmt_Subdir_ToStoreFilesIn_FileNames_Response();
		

		// get Hash of webservice_Request_Data
		String webservice_Request_Data_Hash_HexString = convert_webservice_Request_Data_TO_Hash_HexString( webservice_Request_Data );
		
		//  Subdir names:
		
		int webservice_Request_Data_Hash_HexString_Length = webservice_Request_Data_Hash_HexString.length();
		
		//  Next to last 2 characters in hash string
		String subdir_1_String = webservice_Request_Data_Hash_HexString.substring( 
				webservice_Request_Data_Hash_HexString_Length - 4, webservice_Request_Data_Hash_HexString_Length - 2 );
		//  Last 2 characters in hash string
		String subdir_2_String = webservice_Request_Data_Hash_HexString.substring( 
				webservice_Request_Data_Hash_HexString_Length - 2, webservice_Request_Data_Hash_HexString_Length );

		//  Filenames:
		String requestFilename = webservice_Request_Data_Hash_HexString + FILENAME_SUFFIX__REQUEST_DATA;
		String responseFilename = webservice_Request_Data_Hash_HexString + FILENAME_SUFFIX__RESPONSE_DATA;
		String doneFilename = webservice_Request_Data_Hash_HexString + FILENAME_SUFFIX__DONE;
		
		//  Format Files and Subdirs
		
		File controllerPath_Dir = new File( current_Root_Subdir_ToStoreFilesIn, controllerPath_String );
		
		File subdir_1 = new File( controllerPath_Dir, subdir_1_String );
		File subdir_2 = new File( subdir_1, subdir_2_String );
		
		File cachedDataFile_Webservice_Request_File = new File( subdir_2, requestFilename );
		File cachedDataFile_Webservice_Response_File = new File( subdir_2, responseFilename );
		File cachedDataFile_Done_File = new File( subdir_2, doneFilename );
		
		response.controllerPath_Dir = controllerPath_Dir;
		
		response.subdir_1 = subdir_1;
		response.subdir_2 = subdir_2;
		
		response.cachedDataFile_Webservice_Request_File = cachedDataFile_Webservice_Request_File;
		response.cachedDataFile_Webservice_Response_File = cachedDataFile_Webservice_Response_File;
		response.cachedDataFile_Done_File = cachedDataFile_Done_File;
		
		return response;
	}

	/**
	 * @param hashBytes
	 * @return
	 */
	private String convert_webservice_Request_Data_TO_Hash_HexString( byte[] webservice_Request_Data ) throws Exception {

		// get Hash of webservice_Request_Data
		
		MessageDigest md_SHA_384 = MessageDigest.getInstance( SHA_384_ALGORITHM );
		md_SHA_384.update( webservice_Request_Data );
		byte[] requestURLPartialDigest = md_SHA_384.digest();

		String webservice_Request_Data_Hash_HexString = hashBytesToHexString( requestURLPartialDigest );
		
		return webservice_Request_Data_Hash_HexString;
	}
	
	/**
	 * @param hashBytes
	 * @return
	 */
	private String hashBytesToHexString( byte[] hashBytes ) {

		StringBuilder hashBytesAsHexSB = new StringBuilder( hashBytes.length * 2 + 2 );

		for ( int i = 0; i < hashBytes.length; i++ ) {
			String byteAsHex = Integer.toHexString( Byte.toUnsignedInt( hashBytes[ i ] ) );
			if ( byteAsHex.length() == 1 ) {
				hashBytesAsHexSB.append( "0" ); //  Leading zero dropped by 'toHexString' so add here
			}
			hashBytesAsHexSB.append( byteAsHex );
		}

		String result = hashBytesAsHexSB.toString();

		return result;
		
		//  WAS - which is equivalent, except for the added "0" when a hex pair starts with "0"
		
		//convert the byte to hex format
//		StringBuffer sb = new StringBuffer("");
//		for (int i = 0; i < hashBytes.length; i++) {
//			sb.append(Integer.toString((hashBytes[i] & 0xff) + 0x100, 16).substring(1));
//		}
//		
//		String result = sb.toString();
//		
//		return result;
	}
	
	
}
