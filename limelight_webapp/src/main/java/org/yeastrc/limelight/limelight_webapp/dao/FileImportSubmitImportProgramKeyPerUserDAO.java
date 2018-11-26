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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table file_import_submit_import_program_key_per_user
 *
 */
@Component
public class FileImportSubmitImportProgramKeyPerUserDAO extends Limelight_JDBC_Base implements FileImportSubmitImportProgramKeyPerUserDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( FileImportSubmitImportProgramKeyPerUserDAO.class );

	@Autowired
	private FileImportSubmitImportProgramKeyPerUserHistoryDAO fileImportSubmitImportProgramKeyPerUserHistoryDAO;
	
	/**
	 * @param userId
	 * @return null if not found
	 * @throws SQLException
	 */
	@Override
	public String getSubmitImportProgramKeyFromUserId( int userId ) throws SQLException {
		
		String result = null;
		
		final String querySQL = "SELECT submit_import_program_key FROM file_import_submit_import_program_key_per_user WHERE user_id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, userId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = rs.getString( "submit_import_program_key" );
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
	 * @param submitImportProgramKey
	 * @return null if not found
	 * @throws SQLException
	 */
	@Override
	public Integer getUserIdFromSubmitImportProgramKey( String submitImportProgramKey ) throws SQLException {
		
		Integer result = null;
		
		final String querySQL = "SELECT user_id FROM file_import_submit_import_program_key_per_user WHERE submit_import_program_key = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setString( 1, submitImportProgramKey );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					int userId = rs.getInt( "user_id" );
					if ( ! rs.wasNull() ) {
						result = userId;
					}
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
	
	private static final String INSERT_SQL = 
			"INSERT INTO file_import_submit_import_program_key_per_user "
			+ " ( user_id, submit_import_program_key ) "
			+ "VALUES ( ?, ? )"
					
			+ " ON DUPLICATE KEY UPDATE "
			+ " submit_import_program_key = ?";

	/**
	 * @param userId
	 * @param submitImportProgramKey
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( int userId, String submitImportProgramKey ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			fileImportSubmitImportProgramKeyPerUserHistoryDAO.copyToHistory( userId );
			
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, userId );
							counter++;
							pstmt.setString( counter, submitImportProgramKey );
							counter++;
							pstmt.setString( counter, submitImportProgramKey );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "userId: " + userId + ", submitImportProgramKey: " + submitImportProgramKey + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * @param userId
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void delete( int userId ) {

		final String sql = "DELETE FROM file_import_submit_import_program_key_per_user WHERE user_id = ?";

		// Use Spring JdbcTemplate so Transactions work properly

		try {
			fileImportSubmitImportProgramKeyPerUserHistoryDAO.copyToHistory( userId );

//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sql );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, userId );
							return pstmt;
						}
					});
		} catch ( RuntimeException e ) {
			String msg = "Failed to delete, userId: " + userId + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
	}
	

}
