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
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.FolderForProjectDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table folder_for_project_tbl
 *
 */
@Component
public class FolderForProjectDAO extends Limelight_JDBC_Base implements FolderForProjectDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( FolderForProjectDAO.class );

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
		
		final String querySQL = "SELECT project_id FROM folder_for_project_tbl WHERE id = ?";
		
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

	/**
	 * @param id
	 * @return null if not found
	 * @throws Exception
	 */
	@Override
	public FolderForProjectDTO getFolderForProjectDTO_ForId( int id ) throws Exception {
		FolderForProjectDTO returnItem = null;
		final String querySQL = "SELECT * FROM folder_for_project_tbl WHERE id = ?";

		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			preparedStatement.setInt( 1, id );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					returnItem = populateResultObject( rs );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select ProjectDTO, id: " + id + ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return returnItem;
	}
	
	/**
	 * @param projectId
	 * @return 
	 * @throws Exception
	 */
	@Override
	public List<FolderForProjectDTO> getFolderForProjectDTO_ForProjectId( int projectId ) throws Exception {
		List<FolderForProjectDTO> returnList = new ArrayList<>();
		
		final String querySQL = "SELECT * FROM folder_for_project_tbl WHERE project_id = ?";

		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			preparedStatement.setInt( 1, projectId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					FolderForProjectDTO returnItem = populateResultObject( rs );
					returnList.add( returnItem );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select ProjectDTO, projectId: " + projectId + ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return returnList;
	}
	
	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	private FolderForProjectDTO populateResultObject(ResultSet rs) throws SQLException {
		FolderForProjectDTO returnItem = new FolderForProjectDTO();
		returnItem.setId( rs.getInt( "id" ) );
		returnItem.setProjectId( rs.getInt( "project_id" ) );
		returnItem.setName( rs.getString( "name" ) );
		returnItem.setDisplayOrder( rs.getInt( "display_order" ) );
		return returnItem;
	}
	
	
	
	////////////////////////

	private static final String INSERT_SQL = 
			"INSERT INTO folder_for_project_tbl "
			+ " ( project_id, name, display_order, created_by_user_id, updated_by_user_id )"
			+ " VALUES ( ?, ?, ?, ?, ? )";

	/**
	 * @param item
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( FolderForProjectDTO item, int createUserId ) {
		
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
							pstmt.setInt( counter, item.getProjectId() );
							counter++;
							pstmt.setString( counter, item.getName() );
							counter++;
							pstmt.setInt( counter, item.getDisplayOrder() );
							counter++;
							pstmt.setInt( counter, createUserId );
							counter++;
							pstmt.setInt( counter, createUserId );
							
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
	
	

	final String UPDATE_NAME_TEXT_SQL = 
			"UPDATE folder_for_project_tbl "
			+ " SET name = ?, updated_by_user_id = ?  "
			+ " WHERE id = ?";
	
	/**
	 * @param id
	 * @param name
	 * @param updateUserId
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateName( int id, String name, int updateUserId ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record

		final String updateSQL = UPDATE_NAME_TEXT_SQL;

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( updateSQL );
							int counter = 0;
							counter++;
							pstmt.setString( counter, name );
							counter++;
							pstmt.setInt( counter, updateUserId );
							counter++;
							pstmt.setInt( counter, id );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "Failed to update name, SQL: " + updateSQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * @param folderId
	 * @param newDisplayOrder
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateDisplayOrder( int folderId, int newDisplayOrder ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record

		final String updateSQL = "UPDATE folder_for_project_tbl SET display_order = ? WHERE id = ?";

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( updateSQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, newDisplayOrder );
							counter++;
							pstmt.setInt( counter, folderId );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "Failed to update name, SQL: " + updateSQL;
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

		final String sql = "DELETE FROM folder_for_project_tbl WHERE id = ?";

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
