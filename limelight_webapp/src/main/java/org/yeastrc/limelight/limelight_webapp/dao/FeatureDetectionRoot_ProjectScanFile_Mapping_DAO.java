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
import java.sql.SQLException;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionRoot_ProjectScanFile_Mapping_DTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.ExperimentDTO;

/**
 * table feature_detection_root__project_scnfl_mapping_tbl
 *
 */
@Component
public class FeatureDetectionRoot_ProjectScanFile_Mapping_DAO extends Limelight_JDBC_Base implements FeatureDetectionRoot_ProjectScanFile_Mapping_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( FeatureDetectionRoot_ProjectScanFile_Mapping_DAO.class );

	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	@Override
	public FeatureDetectionRoot_ProjectScanFile_Mapping_DTO getForId( int id ) throws SQLException {
		
		FeatureDetectionRoot_ProjectScanFile_Mapping_DTO result = null;
		
		final String querySQL = "SELECT * FROM feature_detection_root__project_scnfl_mapping_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = populatePartialFromResultSet( rs );
				}
			}
		} catch ( RuntimeException e ) {
			String msg = "SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		} catch ( SQLException e ) {
			String msg = "SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		return result;
	}

	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	private FeatureDetectionRoot_ProjectScanFile_Mapping_DTO populatePartialFromResultSet( ResultSet rs ) throws SQLException {
		
		FeatureDetectionRoot_ProjectScanFile_Mapping_DTO result = new FeatureDetectionRoot_ProjectScanFile_Mapping_DTO();
		result.setId( rs.getInt( "id" ) );
		result.setProjectScanFileId( rs.getInt( "project_scan_file_id" ) );
		result.setDisplayLabel( rs.getString( "display_label" ) );
		result.setDescription( rs.getString( "description" ) );

		//  SKIP
//				  `created_date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
//				  `updated_date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//				  `created_by_user_id` int unsigned NOT NULL,
//				  `updated_by_user_id` int unsigned NOT NULL,
				
		return result;
	}
	
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void update_DisplayLabel_Description( String displayLabel, String description, int id, int userId ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record

		final String updateSQL = 
				"UPDATE feature_detection_root__project_scnfl_mapping_tbl SET display_label = ?, description = ?, updated_by_user_id = ? WHERE id = ? ";

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( updateSQL );
							int counter = 0;
							counter++;
							pstmt.setString( counter, displayLabel );
							counter++;
							pstmt.setString( counter, description );
							counter++;
							pstmt.setInt( counter, userId );
							counter++;
							pstmt.setInt( counter, id );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "Update Failed: update_DisplayLabel(...): id: " + id + ", SQL: " + updateSQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * @param id
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void delete( int id ) {

		final String sql = "DELETE FROM feature_detection_root__project_scnfl_mapping_tbl WHERE id = ?";

		// Use Spring JdbcTemplate so Transactions work properly

		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sql );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, id );
							return pstmt;
						}
					});
		} catch ( RuntimeException e ) {
			String msg = "Failed to delete, id: " + id + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
	}	
}
