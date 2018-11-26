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
package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.IConfigSystemTableGetValue;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.ConfigSystemDTO;

/**
 * table config_system_tbl
 * 
 * implements IConfigSystemTableGetValue to pass to Limelight Shared Code 
 *
 */
@Component
public class ConfigSystemDAO extends Limelight_JDBC_Base implements IConfigSystemTableGetValue, ConfigSystemDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( ConfigSystemDAO.class );
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF#getAll()
	 */
	@Override
	public List<ConfigSystemDTO> getAll() throws Exception {
		
		List<ConfigSystemDTO> results = new ArrayList<>();
		
		final String sql = "SELECT * FROM config_system_tbl";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {

			try ( ResultSet rs = preparedStatement.executeQuery() ) {

				while( rs.next() ) {
					ConfigSystemDTO item = new ConfigSystemDTO();
					item.setId( rs.getInt( "id" ) );
					item.setConfigKey( rs.getString( "config_key" ) );
					item.setConfigValue( rs.getString( "config_value" ) );
					item.setComment( rs.getString( "comment" ) );
					results.add( item );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to get all config_system_tbl, sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return results;
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF#getConfigValueForConfigKey(java.lang.String)
	 */
	@Override
	public String getConfigValueForConfigKey( String configKey ) throws Exception {
		
		String configValue = null;
		
		final String sql = "SELECT * FROM config_system_tbl WHERE config_key = ?";

		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {

			preparedStatement.setString( 1, configKey );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {

				if( rs.next() ) {
					configValue = rs.getString( "config_value" );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select config_system_tbl, configKey: " + configKey + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return configValue;
	}
	
//	//  Insert, on duplicate update
//	private static final String INSERT_UPDATE_SQL = 
//			"INSERT INTO config_system_tbl (config_key, config_value, comment)"
//			+ "VALUES (?, ?, ?)"
//			+ " ON DUPLICATE KEY UPDATE config_value = ?";
//	/**
//	 * @param configList
//	 * @throws Exception
//	 */
//	public void updateValueOnlyOnConfigKey( List<ConfigSystemDTO> configList  ) throws Exception {
//		Connection conn = null;
//		PreparedStatement pstmt = null;
//		try {
//			conn = DBConnectionFactory.getConnection(  );
//			conn.setAutoCommit(false);
//			pstmt = conn.prepareStatement( INSERT_UPDATE_SQL );
//			for ( ConfigSystemDTO configItem : configList ) {
//				int counter = 0;
//				counter++;
//				pstmt.setString( counter, configItem.getConfigKey() );
//				counter++;
//				pstmt.setString( counter, configItem.getConfigValue() );
//				counter++;
//				pstmt.setString( counter, configItem.getComment() );
//				counter++;
//				pstmt.setString( counter, configItem.getConfigValue() );
////				int updatedRecordCount = 
//				pstmt.executeUpdate();
//			}
//			conn.commit();
//		} catch ( Exception e ) {
//			conn.rollback();
//			String msg = "Failed to insert or update config_system_tbl, SQL: " + INSERT_UPDATE_SQL;
//			log.error( msg, e );
//			throw e;
//		} finally {
//			// be sure database handles are closed
//			if( pstmt != null ) {
//				try { pstmt.close(); } catch( Throwable t ) { ; }
//				pstmt = null;
//			}
//			try {
//				conn.setAutoCommit(true);
//			 } catch( Throwable t ) { ; }
//			if( conn != null ) {
//				try { conn.close(); } catch( Throwable t ) { ; }
//				conn = null;
//			}
//		}
//	}

}
