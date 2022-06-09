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
public class LimelightXMLFileUploadWebConstants {

	
	
	public static final String UPLOAD_FILE_FORM_NAME = "uploadFile";


	/**
	 * Prefix for temp subdir per request
	 */
	public static final String UPLOAD_FILE_TEMP_SUB_DIR_PREFIX = "up_tmp_";

	/**
	 * File created when the temp subdir per request is created for create date/time tracking 
	 */
	public static final String UPLOAD_FILE_TEMP_SUB_DIR_CREATE_TRACKING_FILE = "up_tmp_created_tracking.txt";

	
	public static final String UPLOAD_FILE_DATA_FILE_PREFIX = "uploaded_file__data_file_";
	public static final String UPLOAD_FILE_DATA_FILE_SUFFIX = ".xml";
	
	
	public static final String UPLOAD_LIMELIGHT_XML_FILE_TEMP_FILENAME_PREFIX = "uploaded_limelight_xml_file_";
	public static final String UPLOAD_LIMELIGHT_XML_FILE_TEMP_FILENAME_SUFFIX = ".xml";

	public static final String UPLOAD_SCAN_FILE_TEMP_FILENAME_PREFIX = "uploaded_scan_file_";
	
	
	
	public static final String UPLOAD_SCAN_FILE_ALLOWED_SUFFIX__DEFAULT_AND_SPECTR_1_X__MZML = ".mzML"; 
	public static final String UPLOAD_SCAN_FILE_ALLOWED_SUFFIX__DEFAULT_AND_SPECTR_1_X__MZXML = ".mzXML";
	
	////////////////////
	
	//  Contents to add to import work dir

	/**
	 * File created when the submit is for the same machine
	 * 
	 *  This file contains the list of files to be imported, since they are not copied to the import dir
	 */
	public static final String IMPORT_FILE_LIST_FILE = "import_file_list.txt";


}
