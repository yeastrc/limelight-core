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
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectSearchDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table project_search_tbl
 *
 */
@Component
public class ProjectSearchDAO extends Limelight_JDBC_Base implements ProjectSearchDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearchDAO.class );
	
	private static final String getFromId_querySQL = 
			"SELECT project_id, search_id, status_id, search_name, search_display_order, created_by_user_id "
			+ " FROM project_search_tbl WHERE id = ? ";
	/**
	 * Get the given record from the database
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@Override
	public ProjectSearchDTO getFromId( int id ) throws Exception  {
		
		ProjectSearchDTO result = null;
		
		final String querySQL = getFromId_querySQL;
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					result = new ProjectSearchDTO();
					result.setId( id );
					result.setProjectId( rs.getInt( "project_id" ) );
					result.setSearchId( rs.getInt( "search_id" ) );
					result.setStatusId( rs.getInt( "status_id" ) );
					result.setSearchName( rs.getString( "search_name" ) );
					result.setSearchDisplayOrder( rs.getInt( "search_display_order" ) );
					int createdByUserId = rs.getInt( "created_by_user_id" );
					if ( ! rs.wasNull() ) {
						result.setCreatedByUserId( createdByUserId );
					}
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: sql: " + querySQL, e );
			throw e;
		}
		return result;
	}

	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	@Override
	public void save( ProjectSearchDTO item ) {

		//  Generate next id value for insert into main table using table ...insert_id_tbl
		
		//  Get id for new record to insert using table project_search__insert_id_tbl
		int id = save_InsertGetInsertId();
		
		//  delete all records in 
		deleteLessThanId( id );
		
		item.setId( id );
		
		//  Insert into main table
		
		save_MainInsert(item);
		
	}


	/**
	 * Insert into 'side' table to get next auto increment value to use as 'id' on main insert
	 */
	private int save_InsertGetInsertId() {
		
		final String INSERT_SQL = "INSERT INTO project_search__insert_id_tbl (  ) VALUES ( )";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			KeyHolder keyHolder = new GeneratedKeyHolder();
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL, Statement.RETURN_GENERATED_KEYS );

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
			
			int insertedKeyInt = (int) insertedKeyLong; // Inserted auto-increment primary key for the inserted record
			
			return insertedKeyInt;
			
		} catch ( RuntimeException e ) {
			String msg = "SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * Only call from Transaction service
	 * 
	 * @param id
	 */
	private void deleteLessThanId( int id ) {
		
		final String DELETE_SQL = "DELETE FROM project_search__insert_id_tbl WHERE id < ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt = connection.prepareStatement( DELETE_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, id );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "id: " + id + ", SQL: " + DELETE_SQL;
			log.error( msg, e );
			throw e;
		}
	}


	private static final String insert_querySQL = 
			"INSERT INTO project_search_tbl "
			+ " ( id, project_id, search_id, status_id, search_name, search_display_order, created_by_user_id ) "
			+ " VALUES ( ?, ?, ?, ?, ?, ?, ? )";
//			"SELECT project_id, search_id, status_id, search_name, search_display_order, created_by_user_id "
//			+ " FROM project_search_tbl WHERE id = ? ";
	
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	private void save_MainInsert( ProjectSearchDTO item ) {
		
		final String INSERT_SQL = insert_querySQL;

		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
//			KeyHolder keyHolder = new GeneratedKeyHolder();
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL
//											, Statement.RETURN_GENERATED_KEYS 
											);
							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getId() );
							counter++;
							pstmt.setInt( counter, item.getProjectId() );
							counter++;
							pstmt.setInt( counter, item.getSearchId() );
							counter++;
							pstmt.setInt( counter, item.getStatusId() );
							counter++;
							pstmt.setString( counter, item.getSearchName() );
							counter++;
							pstmt.setInt( counter, item.getSearchDisplayOrder() );
							counter++;
							if ( item.getCreatedByUserId() != null ) {
								pstmt.setInt( counter, item.getCreatedByUserId() );
							} else {
								pstmt.setNull( counter, java.sql.Types.INTEGER );
							}
							return pstmt;
						}
					}
//					,
//					keyHolder
					);
//
//			Number insertedKey = keyHolder.getKey();
//			
//			long insertedKeyLong = insertedKey.longValue();
//			
//			if ( insertedKeyLong > Integer.MAX_VALUE ) {
//				String msg = "Inserted key is too large, is > Integer.MAX_VALUE. insertedKey: " + insertedKey;
//				log.error( msg );
//				throw new LimelightInternalErrorException( msg );
//			}
//			
//			item.setId( (int) insertedKeyLong ); // Inserted auto-increment primary key for the inserted record
			
		} catch ( RuntimeException e ) {
			String msg = "UserDTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}
	
	/**
	 * 
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateSearchName( String searchName, int projectSearchId ) {
		
		final String UPDATE_SQL = "UPDATE project_search_tbl SET search_name = ? WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt = connection.prepareStatement( UPDATE_SQL );
							int counter = 0;
							counter++;
							pstmt.setString( counter, searchName );
							counter++;
							pstmt.setInt( counter, projectSearchId );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "searchName: " + searchName + ", projectSearchId: " + projectSearchId + ", SQL: " + UPDATE_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * 
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateProjectIdForProjectSearch( int projectSearchId, int newProjectId ) {
		
		final String UPDATE_SQL = "UPDATE project_search_tbl SET project_id = ? WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt = connection.prepareStatement( UPDATE_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, newProjectId );
							counter++;
							pstmt.setInt( counter, projectSearchId );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "newProjectId: " + newProjectId + ", projectSearchId: " + projectSearchId + ", SQL: " + UPDATE_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * 
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateDisplayOrderForProjectSearch( int projectSearchId, int newDisplayOrder ) {
		
		final String UPDATE_SQL = "UPDATE project_search_tbl SET search_display_order = ? WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt = connection.prepareStatement( UPDATE_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, newDisplayOrder );
							counter++;
							pstmt.setInt( counter, projectSearchId );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "newDisplayOrder: " + newDisplayOrder + ", projectSearchId: " + projectSearchId + ", SQL: " + UPDATE_SQL;
			log.error( msg, e );
			throw e;
		}
	}
	
	/**
	 * Only call from Transaction service
	 * 
	 * @param projectSearchId
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.MANDATORY )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void delete( int projectSearchId ) {
		
		final String DELETE_SQL = "DELETE FROM project_search_tbl WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt = connection.prepareStatement( DELETE_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, projectSearchId );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "projectSearchId: " + projectSearchId + ", SQL: " + DELETE_SQL;
			log.error( msg, e );
			throw e;
		}
	}


}
