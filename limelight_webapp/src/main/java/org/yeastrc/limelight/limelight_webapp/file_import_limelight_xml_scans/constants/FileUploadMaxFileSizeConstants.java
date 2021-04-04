/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.constants;

/**
 * 
 *
 */
public class FileUploadMaxFileSizeConstants {
	
	
	public static final int MAX_FILE_UPLOAD_CHUNK_SIZE = ( 5 * ( 1024 * 1024 ) ); // 5MB max


	//  Must Keep these ..._SIZE in sync with following ..._SIZE_FORMATTED 
	
	
	public static final long MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE = ( 1 * ( (long) ( 1000 * 1000 * 1000 ) ) ); // 1GB max


	// Must cast some part to long. 
	// Otherwise int is used and the value overflows the int max and the resulting value is smaller than expected.
	public static final long MAX_SCAN_FILE_UPLOAD_SIZE = ( 10 * ( (long) ( 1000 * 1000 * 1000 ) ) ); // 10GB max

//	public static final int MAX_SCAN_FILE_UPLOAD_SIZE = ( 2 * 10 * 1000  ); // temp smaller max of 20KB
	

	//  !!!!   Must keep these in sync with the numbers above
	
	public static final String MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE_FORMATTED = "1GB";

	
	public static final String MAX_SCAN_FILE_UPLOAD_SIZE_FORMATTED = "10GB";


//	public static final String MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE_FORMATTED = NumberFormat.getInstance().format(MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE);
//
//	
//	public static final String MAX_SCAN_FILE_UPLOAD_SIZE_FORMATTED = NumberFormat.getInstance().format(MAX_SCAN_FILE_UPLOAD_SIZE);

	
	//   LIMELIGHT_XML

	public static long get_LIMELIGHT_XML_MAX_FILE_UPLOAD_SIZE() {
		return MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE;
	}

	public static String get_MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE_AS_STRING() {
		return Long.toString( MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE );
	}
	
	public static String get_MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE_FORMATTED() {
		return MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE_FORMATTED;
	}
	
	//  SCAN
	
	public static long get_SCAN_MAX_FILE_UPLOAD_SIZE() {
		return MAX_SCAN_FILE_UPLOAD_SIZE;
	}

	public static String get_MAX_SCAN_FILE_UPLOAD_SIZE_AS_STRING() {
		return Long.toString( MAX_SCAN_FILE_UPLOAD_SIZE );
	}
	
	public static String get_MAX_SCAN_FILE_UPLOAD_SIZE_FORMATTED() {
		return MAX_SCAN_FILE_UPLOAD_SIZE_FORMATTED;
	}
	

}
