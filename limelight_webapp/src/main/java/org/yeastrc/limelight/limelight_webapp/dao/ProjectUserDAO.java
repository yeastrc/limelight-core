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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectUserDTO;

/**
 * table project_user_tbl
 *
 */
@Service
public class ProjectUserDAO extends Limelight_JDBC_Base implements ProjectUserDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( ProjectUserDAO.class );
	

	/**
	 * @param projectId
	 * @param userId
	 * @return null if not found
	 * @throws SQLException
	 */
	public ProjectUserDTO getForProjectIdUserId( int projectId, int userId ) throws SQLException {
		
		ProjectUserDTO returnItem = null;
		
		final String querySQL = "SELECT access_level FROM project_user_tbl WHERE project_id = ? AND user_id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectId );
			preparedStatement.setInt( 2, userId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					returnItem = new ProjectUserDTO();
					returnItem.setProjectId( projectId );
					returnItem.setUserId( userId );
					returnItem.setAccessLevel( rs.getInt( "access_level" ) );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select, projectId: " + projectId + ", userId: " + userId + ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return returnItem;
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.ProjectUserDAO_IF#save(org.yeastrc.limelight.limelight_webapp.db_dto.ProjectUserDTO)
	 * 
	 * throws org.springframework.dao.DuplicateKeyException for duplicate record
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( ProjectUserDTO item ) { 
		
		final String INSERT_SQL = "INSERT INTO project_user_tbl ( project_id, user_id, access_level ) VALUES ( ?, ?, ? )";
		
		// Use Spring JdbcTemplate so Transactions work properly

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getProjectId() );
							counter++;
							pstmt.setInt( counter, item.getUserId() );
							counter++;
							pstmt.setInt( counter, item.getAccessLevel() );

							return pstmt;
						}
					});
		} catch ( RuntimeException e ) {
			String msg = "ProjectUserDTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}


	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.ProjectUserDAO_IF#updateAccessLevel(org.yeastrc.limelight.limelight_webapp.db_dto.ProjectUserDTO)
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void updateAccessLevel( ProjectUserDTO item ) { 
		
		final String INSERT_SQL = "UPDATE project_user_tbl SET access_level = ? WHERE project_id = ? AND user_id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getAccessLevel() );
							counter++;
							pstmt.setInt( counter, item.getProjectId() );
							counter++;
							pstmt.setInt( counter, item.getUserId() );

							return pstmt;
						}
					});
		} catch ( RuntimeException e ) {
			String msg = "ProjectUserDTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
		
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.ProjectUserDAO_IF#delete(org.yeastrc.limelight.limelight_webapp.db_dto.ProjectUserDTO)
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void delete( ProjectUserDTO item ) { 
		
		final String INSERT_SQL = "DELETE FROM project_user_tbl WHERE project_id = ? AND user_id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getProjectId() );
							counter++;
							pstmt.setInt( counter, item.getUserId() );

							return pstmt;
						}
					});
		} catch ( RuntimeException e ) {
			String msg = "ProjectUserDTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
		
	}


}
