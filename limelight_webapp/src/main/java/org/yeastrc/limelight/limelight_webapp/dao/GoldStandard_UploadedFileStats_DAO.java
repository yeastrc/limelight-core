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
import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_UploadedFileStats_DTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table gold_standard_uploaded_file_stats_tbl
 *
 */
@Component
public class GoldStandard_UploadedFileStats_DAO extends Limelight_JDBC_Base implements GoldStandard_UploadedFileStats_DAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( GoldStandard_UploadedFileStats_DAO.class );

	private static final String INSERT_SQL = 
			"INSERT INTO gold_standard_uploaded_file_stats_tbl "
			+ " ( gold_standard_for_scan_file_root_id, "
			+ " uploaded_filename, uploaded_file_size, uploaded_file_sha1_sum, uploaded_file_sha384_zero_in_second_digit, "
			+ " created_by_user_id, updated_by_user_id ) "
			+ "VALUES ( ?, ?, ?, ?, ?, ?, ? )";
	
	

//-- -----------------------------------------------------
//-- Table gold_standard_uploaded_file_stats_tbl
//-- -----------------------------------------------------
//CREATE TABLE  gold_standard_uploaded_file_stats_tbl (
//  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
//  gold_standard_for_scan_file_root_id INT UNSIGNED NOT NULL,
//  uploaded_filename VARCHAR(255) NULL,
//  uploaded_file_size INT UNSIGNED NOT NULL,
//  uploaded_file_sha1_sum VARCHAR(45) NULL,
//  uploaded_file_sha384_zero_in_second_digit VARCHAR(300) NULL COMMENT 'For each hex pair, if zero in second digit keep it.  This is maybe different from standard display of sha384.',
//  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//  updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//  created_by_user_id INT UNSIGNED NOT NULL,
//  updated_by_user_id INT UNSIGNED NOT NULL,
	
	/**
	 * @param item
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( GoldStandard_UploadedFileStats_DTO item ) {
		
		final String insertSQL = INSERT_SQL;

		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			KeyHolder keyHolder = new GeneratedKeyHolder();
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt = connection.prepareStatement( insertSQL, Statement.RETURN_GENERATED_KEYS );

							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getGoldStandard_ForScanFile_Root_Id() );

							counter++;
							pstmt.setString( counter, item.getUploadedFilename() );
							counter++;
							pstmt.setInt( counter, item.getUploadedFileSize() );
							counter++;
							pstmt.setString( counter, item.getUploadedFile_Sha1_Sum() );
							counter++;
							pstmt.setString( counter, item.getUploadedFile_Sha384_zero_in_second_digit() );
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
			String msg = "GoldStandard_UploadedFileStats_DTO: " + item + ", SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}

//	@Override
//	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
//	public void set_uploaded_file_sha1_sum_sha384_sum( String uploaded_file_sha1_sum, String uploaded_file_sha384_zero_in_second_digit, int id ) {
//		
//		// Use Spring JdbcTemplate so Transactions work properly
//		
//		//  How to get the auto-increment primary key for the inserted record
//
//		final String updateSQL = 
//				"UPDATE gold_standard_uploaded_file_stats_tbl"
//				+ " SET uploaded_file_sha1_sum = ?, uploaded_file_sha384_zero_in_second_digit = ? WHERE id = ? ";
//
//		try {
//			int rowsUpdated = this.getJdbcTemplate().update(
//					new PreparedStatementCreator() {
//						@Override
//						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
//
//							PreparedStatement pstmt =
//									connection.prepareStatement( updateSQL );
//
//							int counter = 0;
//							counter++;
//							pstmt.setString( counter, uploaded_file_sha1_sum );
//							counter++;
//							pstmt.setString( counter, uploaded_file_sha384_zero_in_second_digit );
//							counter++;
//							pstmt.setInt( counter, id );
//
//							return pstmt;
//						}
//					});
//
//		} catch ( RuntimeException e ) {
//			String msg = "Update Failed: set_uploaded_file_sha1_sum_sha384_sum(...): id: " + id + ", SQL: " + updateSQL;
//			log.error( msg, e );
//			throw e;
//		}
//	}
//
//	final String SET_TRUE_ENTRY_FULLY_INSERTED_SQL = 
//			"UPDATE gold_standard_uploaded_file_stats_tbl "
//			+ " SET file_fully_inserted = " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE
//			+ ", updated_by_user_id = ?, file_fully_inserted_date_time = NOW() "
//			+ " WHERE id = ? ";
//
//	/**
//	 * @param id
//	 * @param userId
//	 */
//
//	@Override
//	//  Spring DB Transactions
//	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
//	public void set_True_EntryFullyInserted( int id, int userId ) {
//		
//		// Use Spring JdbcTemplate so Transactions work properly
//		
//		//  How to get the auto-increment primary key for the inserted record
//
//		final String updateSQL = SET_TRUE_ENTRY_FULLY_INSERTED_SQL;
//
//		try {
//			int rowsUpdated = this.getJdbcTemplate().update(
//					new PreparedStatementCreator() {
//						@Override
//						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
//
//							PreparedStatement pstmt = connection.prepareStatement( updateSQL );
//							
//							int counter = 0;
//							counter++;
//							pstmt.setInt( counter, userId );
//							counter++;
//							pstmt.setInt( counter, id );
//
//							return pstmt;
//						}
//					});
//
//		} catch ( RuntimeException e ) {
//			String msg = "Update Failed: set_True_FileFullyInserted(...): id: " + id + ", SQL: " + updateSQL;
//			log.error( msg, e );
//			throw e;
//		}
//	}

}
