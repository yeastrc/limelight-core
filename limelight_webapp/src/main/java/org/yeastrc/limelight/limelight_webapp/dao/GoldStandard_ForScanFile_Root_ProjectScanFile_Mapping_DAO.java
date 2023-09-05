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
import java.sql.Statement;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table gold_standard_for_scan_file_root__project_scnfl_mapping_tbl
 *
 */
@Component
public class GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DAO extends Limelight_JDBC_Base implements GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DAO.class );

	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DAO_IF#get_RootId_For_MappingId(int)
	 */
	@Override
	public Integer get_RootId_For_MappingId( int mappingId ) throws SQLException {
		
		Integer result = null;
		
		final String querySQL = "SELECT gold_standard_for_scan_file_root_id FROM gold_standard_for_scan_file_root__project_scnfl_mapping_tbl WHERE id = ?";
		

		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			preparedStatement.setInt( 1, mappingId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = rs.getInt( "gold_standard_for_scan_file_root_id" );
				}
				if ( rs.next() ) {
					String msg = "Cannot have more than one result record for query.  SQL: " + querySQL;
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
			}
		}
		
		return result;
	}
	
	private static final String INSERT_SQL = 
			"INSERT INTO gold_standard_for_scan_file_root__project_scnfl_mapping_tbl "
					+ " ( gold_standard_for_scan_file_root_id, project_scan_file_id, display_label, description, "
					+ " created_by_user_id, updated_by_user_id ) "
					+ "VALUES ( ?, ?, ?, ?, ?, ? )";
	
	/**
	 * @param item
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DTO item ) {
		
		final String insertSQL = INSERT_SQL;

		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			KeyHolder keyHolder = new GeneratedKeyHolder();
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( insertSQL, Statement.RETURN_GENERATED_KEYS );

							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getGoldStandard_ForScanFile_Root_Id() );
							counter++;
							pstmt.setInt( counter, item.getProjectScanFileId() );
							counter++;
							pstmt.setString( counter, item.getDisplayLabel() );
							counter++;
							pstmt.setString( counter, item.getDescription() );
							counter++;
							pstmt.setInt( counter, item.getCreatedBy_UserId() );
							counter++;
							pstmt.setInt( counter, item.getUpdatedBy_UserId() );

							return pstmt;
						}
					},
					keyHolder);

			Number insertedKey = keyHolder.getKey();
			
			long insertedKeyLong = insertedKey.longValue();
			
			if ( insertedKeyLong > Integer.MAX_VALUE ) {
				String msg = "Inserted key is too large, is > Integer.MAX_VALUE. insertedKey: " + insertedKey;
				log.error( msg );
				throw new LimelightInternalErrorException( msg );
			}
			
			item.setId( (int) insertedKeyLong ); // Inserted auto-increment primary key for the inserted record
			
		} catch ( RuntimeException e ) {
			String msg = "GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DTO: " + item + ", SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}

	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void update_DisplayLabel_Description( String displayLabel, String description, int id, int userId ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record

		final String updateSQL = 
				"UPDATE gold_standard_for_scan_file_root__project_scnfl_mapping_tbl SET display_label = ?, description = ?, updated_by_user_id = ? WHERE id = ? ";

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

		final String sql = "DELETE FROM gold_standard_for_scan_file_root__project_scnfl_mapping_tbl WHERE id = ?";

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
