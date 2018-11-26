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
package org.yeastrc.limelight.limelight_importer_runimporter_shared.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.IConfigSystemTableGetValue;

/**
 * DAO for config_system_tbl table
 *
 * For Importer 
 */
public class ConfigSystemDAO_Importer implements IConfigSystemTableGetValue {
	
	private static final Logger log = LoggerFactory.getLogger( ConfigSystemDAO_Importer.class );

	//  private constructor
	private ConfigSystemDAO_Importer() { }
	
	/**
	 * @return newly created instance
	 */
	public static ConfigSystemDAO_Importer getInstance() { 
		return new ConfigSystemDAO_Importer(); 
	}
	
	/**
	 * @param configKey
	 * @return null if not found
	 * @throws Exception
	 */
	@Override
	public String getConfigValueForConfigKey( String configKey ) throws Exception {


		String configValue = null;
				
		final String sql = "SELECT * FROM config_system_tbl WHERE config_key = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setString( 1, configKey );

				try ( ResultSet rs = pstmt.executeQuery() ) {

					if( rs.next() ) {

						configValue = rs.getString( "config_value" );

					}
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select config_system, configKey: " + configKey + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		
		return configValue;
	}
	

}
