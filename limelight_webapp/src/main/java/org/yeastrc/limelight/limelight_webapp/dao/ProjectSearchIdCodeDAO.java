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
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchIdCodeDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table project_search_id_code_tbl
 *
 */
@Component
public class ProjectSearchIdCodeDAO extends Limelight_JDBC_Base implements ProjectSearchIdCodeDAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearchIdCodeDAO.class );
	
	public static enum LogDuplicateSQLException{ TRUE, FALSE }

	/**
	 * 
	 * 
	 * @param projectSearchId
	 * @return null if not found
	 * @throws SQLException
	 */
	
	@Override
	public String getByProjectSearchId( int projectSearchId ) throws SQLException {
		
		String result = null;
		
		final String querySQL = "SELECT project_search_id_code FROM project_search_id_code_tbl WHERE project_search_id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectSearchId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = rs.getString( "project_search_id_code" );
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
	 * 
	 * 
	 * @param projectSearchId
	 * @return null if not found
	 * @throws SQLException
	 */
	
	@Override
	public List<ProjectSearchIdCodeDTO> getByProjectSearchIdList( List<Integer> projectSearchIdList ) throws SQLException {
		
		if ( projectSearchIdList == null ) {
			throw new IllegalArgumentException("projectSearchIdList is null");
		}
		if ( projectSearchIdList.isEmpty() ) {
			throw new IllegalArgumentException("projectSearchIdList is empty");
		}
		
		List<ProjectSearchIdCodeDTO> results = new ArrayList<>();
		
		StringBuilder querySB = new StringBuilder( 1000 );
		querySB.append( "SELECT project_search_id, project_search_id_code FROM project_search_id_code_tbl WHERE project_search_id IN ( " );
		for ( int counter = 0; counter < projectSearchIdList.size(); counter++ ) {
			if ( counter > 0 ) {
				querySB.append( "," );
			}
			querySB.append( "?" );
		}
		querySB.append( " ) " );  // close IN
		
		final String querySQL = querySB.toString();
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			for ( Integer projectSearchId : projectSearchIdList ) {
				counter++;
				preparedStatement.setInt( counter, projectSearchId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ProjectSearchIdCodeDTO result = new ProjectSearchIdCodeDTO();
					result.setProjectSearchId( rs.getInt( "project_search_id" ) );
					result.setProjectSearchIdCode( rs.getString( "project_search_id_code" ) );
					results.add(result);
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
		
		return results;
	}
	

	/**
	 * 
	 * 
	 * @param project_search_id_codeList
	 * @throws SQLException
	 */
	
	@Override
	public List<ProjectSearchIdCodeDTO> getProjectSearchIdCodeDTOList_For_project_search_id_codes( List<String> project_search_id_codeList ) throws SQLException {

		if ( project_search_id_codeList == null ) {
			throw new IllegalArgumentException("project_search_id_codeList is null");
		}
		if ( project_search_id_codeList.isEmpty() ) {
			throw new IllegalArgumentException("project_search_id_codeList is empty");
		}
		
		List<ProjectSearchIdCodeDTO> results = new ArrayList<>();
		
		StringBuilder querySB = new StringBuilder( 1000 );
		querySB.append( "SELECT project_search_id, project_search_id_code FROM project_search_id_code_tbl WHERE project_search_id_code IN ( " );
		for ( int counter = 0; counter < project_search_id_codeList.size(); counter++ ) {
			if ( counter > 0 ) {
				querySB.append( "," );
			}
			querySB.append( "?" );
		}
		querySB.append( " ) " );  // close IN
		
		final String querySQL = querySB.toString();
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			for ( String project_search_id_code : project_search_id_codeList ) {
				counter++;
				preparedStatement.setString( counter, project_search_id_code );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ProjectSearchIdCodeDTO result = new ProjectSearchIdCodeDTO();
					result.setProjectSearchId( rs.getInt( "project_search_id" ) );
					result.setProjectSearchIdCode( rs.getString( "project_search_id_code" ) );
					results.add(result);
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
		
		return results;
	}

	///////
	
	private static final String INSERT_SQL = 
			"INSERT INTO project_search_id_code_tbl "
			+ " ( project_search_id, project_search_id_code, search_id, project_id__at_time_of_insert )"
			+ " VALUES ( ?, ?, ?, ? )";
	  
	/**
	 * @param item
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( ProjectSearchIdCodeDTO item, LogDuplicateSQLException logDuplicateSQLException ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getProjectSearchId() );
							counter++;
							pstmt.setString( counter, item.getProjectSearchIdCode() );
							counter++;
							pstmt.setInt( counter, item.getSearchId() );
							counter++;
							pstmt.setInt( counter, item.getProjectId_AtTimeOfInsert() );

							return pstmt;
						}
					});

		} catch ( org.springframework.dao.DuplicateKeyException e ) {

			if ( logDuplicateSQLException == LogDuplicateSQLException.TRUE ) {
				String msg = "Item to save: " + item + ", SQL: " + INSERT_SQL;
				log.error( msg, e );
				throw e;
			}
			
		} catch ( RuntimeException e ) {
			String msg = "Item to save: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}

}
