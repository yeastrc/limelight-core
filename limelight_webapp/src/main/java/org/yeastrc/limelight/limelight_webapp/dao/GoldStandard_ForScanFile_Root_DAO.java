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
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_ForScanFile_Root_DTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table gold_standard_for_scan_file_root_tbl
 *
 */
@Component
public class GoldStandard_ForScanFile_Root_DAO extends Limelight_JDBC_Base implements GoldStandard_ForScanFile_Root_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( GoldStandard_ForScanFile_Root_DAO.class );

	private static final String INSERT_SQL = 
			"INSERT INTO gold_standard_for_scan_file_root_tbl "
					+ " ( scan_file_id, entry_fully_inserted, "
					+ " created_by_user_id, updated_by_user_id ) "
					+ "VALUES ( ?, ?, ?, ? )";
	
	/**
	 * @param item
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( GoldStandard_ForScanFile_Root_DTO item ) {
		
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
							pstmt.setInt( counter, item.getScanFileId() );
							counter++;
							if ( item.isEntryFullyInserted() ) {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
							} else {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
							}
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
			String msg = "GoldStandardRootDTO: " + item + ", SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}


	final String SET_TRUE_ENTRY_FULLY_INSERTED_SQL = 
			"UPDATE gold_standard_for_scan_file_root_tbl "
			+ " SET entry_fully_inserted = " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE
			+ ", updated_by_user_id = ?, entry_fully_inserted_date_time = NOW() "
			+ " WHERE id = ? ";

	/**
	 * @param id
	 * @param userId
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void set_True_EntryFullyInserted( int id, int userId ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record

		final String updateSQL = SET_TRUE_ENTRY_FULLY_INSERTED_SQL;

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt = connection.prepareStatement( updateSQL );
							
							int counter = 0;
							counter++;
							pstmt.setInt( counter, userId );
							counter++;
							pstmt.setInt( counter, id );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "Update Failed: set_True_FileFullyInserted(...): id: " + id + ", SQL: " + updateSQL;
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

		final String sql = "DELETE FROM gold_standard_for_scan_file_root_tbl WHERE id = ?";

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
