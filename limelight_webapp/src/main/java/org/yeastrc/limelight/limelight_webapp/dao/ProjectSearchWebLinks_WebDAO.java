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
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchWebLinksDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table project_search__web_links_tbl
 *
 */
@Component
public class ProjectSearchWebLinks_WebDAO extends Limelight_JDBC_Base implements ProjectSearchWebLinks_WebDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearchWebLinks_WebDAO.class );

	private static final String getProjectSearchIdFromId_querySQL = 
			"SELECT project_search_id "
			+ " FROM project_search__web_links_tbl WHERE id = ? ";
	/**
	 * Get the project_search_id from the record from the database
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@Override
	public Integer getProjectSearchIdFromId( int id ) throws SQLException   {
		
		Integer result = null;
		
		final String querySQL = getProjectSearchIdFromId_querySQL;
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					result = rs.getInt( "project_search_id" );
				}
			}
		} catch ( SQLException e ) {
			log.error( "ERROR: sql: " + querySQL, e );
			throw e;
		}
		return result;
	}
	

	/**
	 * @param item
	 */
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	@Override
	
	public void save( ProjectSearchWebLinksDTO item ) {
		
		final String INSERT_SQL = "INSERT INTO project_search__web_links_tbl ( project_search_id, user_id, link_url, link_label ) VALUES ( ?, ?, ?, ? )";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			KeyHolder keyHolder = new GeneratedKeyHolder();
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL, Statement.RETURN_GENERATED_KEYS );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getProjectSearchId() );
							counter++;
							if ( item.getUserId() != null ) {
								pstmt.setInt( counter, item.getUserId() );
							} else {
								pstmt.setNull( counter, java.sql.Types.INTEGER );
							}
							counter++;
							pstmt.setString( counter, item.getLinkURL() );
							counter++;
							pstmt.setString( counter, item.getLinkLabel() );

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
			String msg = "ProjectDTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	
	private static final String duplicateCommentsSQL = 
			" INSERT INTO project_search__web_links_tbl " 
			+ "( project_search_id, user_id, link_url, link_label ) " 
			+ " SELECT ?, user_id, link_url, link_label "
			+ " FROM project_search__web_links_tbl "
			+ " WHERE project_search__web_links_tbl.project_search_id = ?";

	/**
	 * Copy records from projectSearchId with new projectSearchId
	 * 
	 * @param oldProjectSearchId
	 * @param newProjectSearchId
	 */
			
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void duplicateRecordsForProjectSearchIdWithNewProjectSearchId( 
			int oldProjectSearchId,
			int newProjectSearchId ) {
		
		final String UPDATE_SQL = duplicateCommentsSQL;
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt = connection.prepareStatement( UPDATE_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, newProjectSearchId );
							counter++;
							pstmt.setInt( counter, oldProjectSearchId );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "newProjectSearchId: " + newProjectSearchId + ", oldProjectSearchId: " + oldProjectSearchId + ", SQL: " + UPDATE_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * @param id
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void delete( int id ) {
		
		final String DELETE_SQL = "DELETE FROM project_search__web_links_tbl WHERE id = ?";
		
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
}
