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
package org.yeastrc.limelight.limelight_shared.file_import_common;

import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.constants.EnvironmentVariable_Keys_Constants;

/**
 * 
 *
 */
public class Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values {
	
	private static final Logger log = LoggerFactory.getLogger( Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values.class );

	/**
	 * private constructor
	 */
	private Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values() { }

	/**
	 * Static singleton instance
	 */
	private static final Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values _instance = new Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values();
	
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values getInstance() {
		return _instance; 
	}
	
	/**
	 * @throws Exception 
	 * 
	 */
	public void getValuesAndLog() throws Exception {
		
		get_S3_Bucket_Configuration_Value__LogIfRequired_IfLog_NoRethrowException(true);
		
		get_S3_Region_Configuration_Value__LogIfRequired_IfLog_NoRethrowException(true);
	}

	/**
	 * @return 
	 * @throws Exception - If error getting value from config table
	 */
	public String get_S3_Bucket_Configuration_Value() throws Exception {

		return get_S3_Bucket_Configuration_Value__LogIfRequired_IfLog_NoRethrowException(false);
	}
	
	/**
	 * @return 
	 * @throws Exception - If error getting value from config table
	 */
	private String get_S3_Bucket_Configuration_Value__LogIfRequired_IfLog_NoRethrowException(
			boolean logResult
			) throws Exception {

		String result = get_S3_Bucket_Configuration_Value_Only_EnvironmentVariable_Or_Java_Dash_D_Param__LogIfRequired_IfLog_NoRethrowException(logResult);
		
		if ( result == null ) {
			String value = null; 
			try {
				value = ConfigSystemTableGetValueCommon.getInstance()
						.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_AWS_S3_BUCKET_KEY );
			} catch (Exception e ) {
				String msg = "Exception getting from Config table for key: " + ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_AWS_S3_BUCKET_KEY;
				log.error( msg, e );
				if ( ! logResult ) {
					throw e;
				}
			}
			if ( value != null ) {
				value = value.trim();
			}
			
			if ( StringUtils.isNotEmpty(value) ) {
				result = value;
				
				if ( logResult ) {
					log.warn( "INFO::  Value For AWS S3 Bucket from Config Table for key: '" 
							+ ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_AWS_S3_BUCKET_KEY
							+ "' is '"
							+ value
							+ "'." );
				}
			}
		}

		return result;
	}

	/**
	 * @return 
	 */
	public String get_S3_Bucket_Configuration_Value_Only_EnvironmentVariable_Or_Java_Dash_D_Param() {

		return get_S3_Bucket_Configuration_Value_Only_EnvironmentVariable_Or_Java_Dash_D_Param__LogIfRequired_IfLog_NoRethrowException(false);
	}
	
	/**
	 * @return 
	 */
	private String get_S3_Bucket_Configuration_Value_Only_EnvironmentVariable_Or_Java_Dash_D_Param__LogIfRequired_IfLog_NoRethrowException(
			boolean logResult
			) {

		String result = null;

		{
			String value = System.getenv(EnvironmentVariable_Keys_Constants.LIMELIGHT_FILE_UPLOADS_AWS_S3_BUCKET);
			
			if ( value != null ) {
				value = value.trim();
			}
			
			if ( StringUtils.isNotEmpty(value) ) {
				result = value;
				
				if ( logResult ) {
					log.warn( "INFO::  Value For AWS S3 Bucket from Environment Variable: '" 
							+ EnvironmentVariable_Keys_Constants.LIMELIGHT_FILE_UPLOADS_AWS_S3_BUCKET
							+ "' is '"
							+ value
							+ "'." );
				}
			}
		}
		if ( result == null ) {
			
			//  Not in Environment Variable so get from JVM -D Property

			Properties prop = System.getProperties();
			String value = prop.getProperty(EnvironmentVariable_Keys_Constants.LIMELIGHT_FILE_UPLOADS_AWS_S3_BUCKET);
			if ( value != null ) {
				value = value.trim();
			}
			
			if ( StringUtils.isNotEmpty(value) ) {
				result = value;
				
				if ( logResult ) {
					log.warn( "INFO::  Value For AWS S3 Bucket from Java -D parameter: '" 
							+ EnvironmentVariable_Keys_Constants.LIMELIGHT_FILE_UPLOADS_AWS_S3_BUCKET
							+ "' is '"
							+ value
							+ "'." );
				}
			}
		}
		
		return result;
	}
	

	/**
	 * @return 
	 * @throws Exception - If error getting value from config table
	 */
	public String get_S3_Region_Configuration_Value() throws Exception {

		return get_S3_Region_Configuration_Value__LogIfRequired_IfLog_NoRethrowException(false);
	}
	
	/**
	 * @return 
	 * @throws Exception - If error getting value from config table
	 */
	private String get_S3_Region_Configuration_Value__LogIfRequired_IfLog_NoRethrowException(
			boolean logResult
			) throws Exception {

		String result = get_S3_Region_Configuration_Value_Only_EnvironmentVariable_Or_Java_Dash_D_Param__LogIfRequired_IfLog_NoRethrowException(logResult);
		
		if ( result == null ) {
			String value = null; 
			try {
				value = ConfigSystemTableGetValueCommon.getInstance()
						.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_AWS_S3_REGION_KEY );
			} catch (Exception e ) {
				String msg = "Exception getting from Config table for key: " + ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_AWS_S3_REGION_KEY;
				log.error( msg, e );
				if ( ! logResult ) {
					throw e;
				}
			}
			if ( value != null ) {
				value = value.trim();
			}
			
			if ( StringUtils.isNotEmpty(value) ) {
				result = value;
				
				if ( logResult ) {
					log.warn( "INFO::  Value For AWS S3 Region from Config Table for key: '" 
							+ ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_AWS_S3_REGION_KEY
							+ "' is '"
							+ value
							+ "'." );
				}
			}
		}

		return result;
	}

	/**
	 * @return 
	 */
	public String get_S3_Region_Configuration_Value_Only_EnvironmentVariable_Or_Java_Dash_D_Param() {

		return get_S3_Region_Configuration_Value_Only_EnvironmentVariable_Or_Java_Dash_D_Param__LogIfRequired_IfLog_NoRethrowException(false);
	}
	
	/**
	 * @return 
	 */
	private String get_S3_Region_Configuration_Value_Only_EnvironmentVariable_Or_Java_Dash_D_Param__LogIfRequired_IfLog_NoRethrowException(
			boolean logResult
			) {

		String result = null;

		{
			String value = System.getenv(EnvironmentVariable_Keys_Constants.LIMELIGHT_FILE_UPLOADS_AWS_S3_REGION);
			
			if ( value != null ) {
				value = value.trim();
			}
			
			if ( StringUtils.isNotEmpty(value) ) {
				result = value;
				
				if ( logResult ) {
					log.warn( "INFO::  Value For AWS S3 Region from Environment Variable: '" 
							+ EnvironmentVariable_Keys_Constants.LIMELIGHT_FILE_UPLOADS_AWS_S3_REGION
							+ "' is '"
							+ value
							+ "'." );
				}
			}
		}
		if ( result == null ) {
			
			//  Not in Environment Variable so get from JVM -D Property

			Properties prop = System.getProperties();
			String value = prop.getProperty(EnvironmentVariable_Keys_Constants.LIMELIGHT_FILE_UPLOADS_AWS_S3_REGION);
			if ( value != null ) {
				value = value.trim();
			}
			
			if ( StringUtils.isNotEmpty(value) ) {
				result = value;
				
				if ( logResult ) {
					log.warn( "INFO::  Value For AWS S3 Region from Java -D parameter: '" 
							+ EnvironmentVariable_Keys_Constants.LIMELIGHT_FILE_UPLOADS_AWS_S3_REGION
							+ "' is '"
							+ value
							+ "'." );
				}
			}
		}
		
		return result;
	}
}
