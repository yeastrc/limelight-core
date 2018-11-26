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
import org.yeastrc.limelight.limelight_shared.dto.SearchFileProjectSearchDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table search_file__project_search_tbl
 *
 */
@Component
public class SearchFileProjectSearch_WebDAO extends Limelight_JDBC_Base implements SearchFileProjectSearch_WebDAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( SearchFileProjectSearch_WebDAO.class );


	/**
	 * @param id
	 * @return null if not found
	 * @throws Exception
	 */
	@Override
	public SearchFileProjectSearchDTO getSearchFileProjectSearchDTOForId( int id ) throws SQLException {

		SearchFileProjectSearchDTO  result = null;

		final String querySQL = "SELECT * FROM search_file__project_search_tbl  WHERE id = ?";

		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {

			preparedStatement.setInt( 1, id );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = getFromResultSet( rs );
				}
			}

		} catch ( SQLException e ) {
			log.error( "ERROR: sql: " + querySQL, e );
			throw e;
		}
		return result;
	}

	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	private SearchFileProjectSearchDTO getFromResultSet( ResultSet rs ) throws SQLException {

		SearchFileProjectSearchDTO item = new SearchFileProjectSearchDTO();
		item.setId( rs.getInt( "id" ) );
		item.setSearchFileId( rs.getInt( "search_file_id" ) );
		item.setProjectSearchId( rs.getInt( "project_search_id" ) );
		item.setDisplayFilename( rs.getString( "display_filename" ) );

		return item;
	}
	
	private static final String updateDisplayFilenameSQL =
			"UPDATE search_file__project_search_tbl "
			+ " SET display_filename = ? WHERE id = ?";
	/**
	 * @param id
	 * @param displayFilename
	 */

	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	@Override
	public void updateDisplayFilename( int id, String displayFilename ) {
		
		final String UPDATE_SQL = updateDisplayFilenameSQL;
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt = connection.prepareStatement( UPDATE_SQL );
							int counter = 0;
							counter++;
							pstmt.setString( counter, displayFilename );
							counter++;
							pstmt.setInt( counter, id );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "id: " + id + ", displayFilename: " + displayFilename + ", SQL: " + UPDATE_SQL;
			log.error( msg, e );
			throw e;
		}
	}
	
	
	private static final String duplicateRecordsSQL = 
			" INSERT INTO search_file__project_search_tbl " 
			+ "( project_search_id, search_file_id, display_filename ) " 
			+ " SELECT ?, search_file_id, display_filename"
			+ " FROM search_file__project_search_tbl "
			+ " WHERE search_file__project_search_tbl.project_search_id = ?";
	/**
	 * Copy records from projectSearchId with new projectSearchId
	 * 
	 * @param oldProjectSearchId
	 * @param newProjectSearchId
	 */
			
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	@Override
	public void duplicateRecordsForProjectSearchIdWithNewProjectSearchId( 
			int oldProjectSearchId,
			int newProjectSearchId ) {
		
		final String UPDATE_SQL = duplicateRecordsSQL;
		
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
	
}
