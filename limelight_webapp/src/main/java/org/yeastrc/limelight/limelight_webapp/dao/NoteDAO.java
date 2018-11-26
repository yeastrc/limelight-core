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
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.NoteDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table note_tbl
 *
 */
@Component
public class NoteDAO extends Limelight_JDBC_Base implements NoteDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( NoteDAO.class );

	/**
	 * Get the project id for id
	 * 
	 * @param id
	 * @return null if not found
	 * @throws Exception
	 */
	@Override
	public Integer getProjectIdForId( int id ) throws SQLException {
		
		Integer projectId = null;
		
		final String querySQL = "SELECT project_id FROM note_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					projectId = rs.getInt( "project_id" );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select project_id, id: " + id + ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return projectId;
	}
	
	/////////////

	/**
	 * Get the create user id for id
	 * 
	 * @param id
	 * @return null if not found
	 * @throws Exception
	 */
	@Override
	public Integer getCreatedUserIdForId( int id ) throws SQLException {
		
		Integer result = null;
		
		final String querySQL = "SELECT user_id_created FROM note_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					result = rs.getInt( "user_id_created" );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select user_id_created, id: " + id + ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return result;
	}
	
	
	////////////////////////

	private static final String INSERT_SQL = 
			"INSERT INTO note_tbl "
			+ " ( project_id, "
			+ " user_id_created, created_date_time, "
			+ " user_id_last_updated, last_updated_date_time, "
			+ " note_text ) "
			+ "VALUES ( ?, ?, NOW(), ?, NOW(), ? )";

	/**
	 * @param item
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( NoteDTO item ) {
		
		final String insertSQL = INSERT_SQL;

		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			KeyHolder keyHolder = new GeneratedKeyHolder();
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( insertSQL, Statement.RETURN_GENERATED_KEYS );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getProjectId() );
							counter++;
							pstmt.setInt( counter, item.getUserIdCreated() );
							counter++;
							pstmt.setInt( counter, item.getUserIdLastUpdated() );
							counter++;
							pstmt.setString( counter, item.getNoteText() );

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
			String msg = "NoteDTO: " + item + ", SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}
	
	

	final String UPDATE_NOTE_TEXT_SQL = 
			"UPDATE note_tbl "
			+ " SET note_text = ?, user_id_last_updated = ?, last_updated_date_time = NOW() "
			+ " WHERE id = ?";
	
	/**
	 * @param noteText
	 * @param id
	 * @param userId
	 */
	//  Spring DB Transactions

	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateNoteText( String noteText, int id, int userId ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record

		final String updateSQL = UPDATE_NOTE_TEXT_SQL;

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( updateSQL );
							int counter = 0;
							counter++;
							pstmt.setString( counter, noteText );
							counter++;
							pstmt.setInt( counter, userId );
							counter++;
							pstmt.setInt( counter, id );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "id: " + id + ", noteText: " + noteText + ", SQL: " + updateSQL;
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

		final String sql = "DELETE FROM note_tbl WHERE id = ?";

		// Use Spring JdbcTemplate so Transactions work properly

		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
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
