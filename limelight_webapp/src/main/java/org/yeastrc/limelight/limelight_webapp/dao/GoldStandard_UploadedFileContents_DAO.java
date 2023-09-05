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
import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_UploadedFileContents_DTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table gold_standard_uploaded_file_contents_tbl
 *
 */
@Component
public class GoldStandard_UploadedFileContents_DAO extends Limelight_JDBC_Base implements GoldStandard_UploadedFileContents_DAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( GoldStandard_UploadedFileContents_DAO.class );


	private static final String QUERY_SQL = 
			"SELECT "
			+ " * "
			+ " FROM "
			+ " gold_standard_uploaded_file_contents_tbl "
			+ " WHERE gold_standard_for_scan_file_root_id = ?";

	
	/**
	 * @param goldStandard_RootId
	 * @return
	 * @throws Exception
	 */
	public GoldStandard_UploadedFileContents_DTO getFor_GoldStandard_RootId( int goldStandard_RootId ) throws Exception {

		GoldStandard_UploadedFileContents_DTO result = null;
				
		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, goldStandard_RootId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = new GoldStandard_UploadedFileContents_DTO();

					result.setId( rs.getInt( "id" ) );
					result.setGoldStandard_ForScanFile_Root_Id( rs.getInt( "gold_standard_for_scan_file_root_id" ) );
					
					result.setFileContents_GZIP( rs.getBytes( "gold_standard_file_contents_json_gzip" ) );
					result.setFileContents_JSON_VersionNumber( rs.getInt( "gold_standard_file_contents_json_version_number" ) );
					
					result.setCreatedBy_UserId( rs.getInt( "created_by_user_id" ) );
					result.setUpdatedBy_UserId( rs.getInt( "updated_by_user_id" ) );
				}
				if ( rs.next() ) {
					String msg = "Error getting more than 1 record for goldStandard_RootId. SQL: " + querySQL;
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
	
	private static final String INSERT_SQL = 
			"INSERT INTO gold_standard_uploaded_file_contents_tbl "
			+ " ( gold_standard_for_scan_file_root_id, "
			+ " gold_standard_file_contents_json_gzip, "
			+ " gold_standard_file_contents_json_version_number,"
			+ " created_by_user_id, updated_by_user_id ) "
			+ " VALUES ( ?, ?, ?, ?, ? )";

	/**
	 * @param item
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( GoldStandard_UploadedFileContents_DTO item ) {
		
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
							pstmt.setBytes( counter, item.getFileContents_GZIP() );
							counter++;
							pstmt.setInt( counter, item.getFileContents_JSON_VersionNumber() );

							counter++;
							pstmt.setInt( counter, item.getCreatedBy_UserId() );
							counter++;
							pstmt.setInt( counter, item.getUpdatedBy_UserId() );


//							+ " ( gold_standard_for_scan_file_root_id, "
//							+ " gold_standard_file_contents_json_gzip, "
//							+ " gold_standard_file_contents_json_version_number,"
//							+ " created_by_user_id, updated_by_user_id ) "
							
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
			String msg = "GoldStandard_UploadedFileContents_DTO: " + item + ", SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}


}
