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
package org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils;

import java.io.File;
import java.text.DecimalFormat;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.constants.FileUploadCommonConstants;

/**
 * 
 *
 */
public class Limelight_XML_ImporterWrkDirAndSbDrsCmmn {
	
	private static final Logger log = LoggerFactory.getLogger( Limelight_XML_ImporterWrkDirAndSbDrsCmmn.class );

	/**
	 * private constructor
	 */
	private Limelight_XML_ImporterWrkDirAndSbDrsCmmn() { }

	/**
	 * Static singleton instance
	 */
	private static final Limelight_XML_ImporterWrkDirAndSbDrsCmmn _instance = new Limelight_XML_ImporterWrkDirAndSbDrsCmmn();
	
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_XML_ImporterWrkDirAndSbDrsCmmn getInstance() {
		return _instance; 
	}
	
	/**
	 * @return true if valid, otherwise throws exception
	 * @throws Exception
	 */
	public boolean validate_Limelight_XML_Importer_Work_Directory() throws Exception {
//		File tempDir = 
				get_Limelight_XML_Importer_Work_Directory();
		return true;
	}
	
	/**
	 * @return File pointing to temp dir, otherwise throws Exception
	 * @throws Exception
	 */
	public File get_Limelight_XML_Importer_Work_Directory() throws Exception {
		String limelightXMLFileImportTempDir = null; 
		try {
			limelightXMLFileImportTempDir = ConfigSystemTableGetValueCommon.getInstance()
					.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_TEMP_DIR_KEY );
		} catch (Exception e ) {
			String msg = "Exception getting file upload temp dir for validation";
			log.error( msg, e );
			throw e;
		}
		if ( StringUtils.isEmpty( limelightXMLFileImportTempDir ) ) {
			String msg = "Limelight_XML File _Importer_Work_Directory not found in configuration table. config_key: " 
					+ ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_TEMP_DIR_KEY ;
			log.error( msg );
			throw new Exception(msg);
		}
		File tempDir = new File( limelightXMLFileImportTempDir );
		if ( ! tempDir.exists() ) {
			String msg = "Limelight_XML File _Importer_Work_Directory does not exist for 'config_key' in configuration table : '" 
					+ ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_TEMP_DIR_KEY 
					+ "'.  Limelight_XML File _Importer_Work_Directory: " + tempDir.getAbsolutePath();
			log.error( msg );
			throw new Exception(msg);
		}
		return tempDir;
	}

	/**
	 * @return
	 */
	public String getDirForImportTrackingId( int importTrackingId ) {
		DecimalFormat df = new DecimalFormat( "0000000" );
		String idZeroPadded = df.format( importTrackingId );
		String dirName = FileUploadCommonConstants.IMPORT_DIR_FOR_ID + idZeroPadded;
		return dirName;
	}
}
