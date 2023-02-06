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
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFilename_DTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightDatabaseException;

/**
 * table project_scan_filename_tbl
 *
 */
@Component
public class ProjectScanFilename_DAO extends Limelight_JDBC_Base implements ProjectScanFilename_DAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( ProjectScanFilename_DAO.class );

	public enum Log_DuplicateKeyException { YES, NO }

	/**
	 * Return the id
	 * 
	 * @param 
	 * @return null if not found
	 * @throws SQLException
	 */

	//  Needs to be transactional to work properly with Transactions since this method is called after the 'save' method below

	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
			
	@Override
	public Integer getId_For_ProjectScanFileId_ScanFilename( int projectScanFileId, String scanFilename ) throws SQLException {
		
		Integer result = null;
	
		final String querySQL = "SELECT id FROM project_scan_filename_tbl WHERE project_scan_file_id = ? AND scan_filename = ?";

		//  Query using 'this.getJdbcTemplate().query' so part of same transaction as the called 'save' method below

		try {
			List<Integer> retrievedIds = this.getJdbcTemplate().query(new PreparedStatementCreator() {
				@Override
				public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

					PreparedStatement pstmt =
							connection.prepareStatement( querySQL );

					pstmt.setInt( 1, projectScanFileId );

					pstmt.setString( 2, scanFilename );

					return pstmt;
				}
			}, new QueryForIdRowMapper());

			if ( retrievedIds.size() > 1 ) {
				String msg = "ERROR: Retrieve > 1 record.  projectScanFileId: " + projectScanFileId + ", scanFileId: " + scanFilename + ", SQL: " + querySQL;
				log.error( msg );
				throw new LimelightDatabaseException(msg);
			}
			
			result = retrievedIds.get(0);

		} catch ( RuntimeException e ) {
			String msg = "Query Failed: projectScanFileId: " + projectScanFileId + ", scanFileId: " + scanFilename + ", SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectScanFileId );

			preparedStatement.setString( 2, scanFilename );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = rs.getInt( "id" );
				}
			}
		} catch ( RuntimeException e ) {
			String msg = "getId_For_ProjectId_ScanFileId: SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		} catch ( SQLException e ) {
			String msg = "getId_For_ProjectId_ScanFileId: SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		return result;
	}

	/**
	 * Used in method getId_For_ProjectScanFileId_ScanFilename
	 *
	 */
	private static class QueryForIdRowMapper implements RowMapper<Integer> {

		@Override
		public Integer mapRow(ResultSet rs, int rowNum) throws SQLException {

			Integer id_From_Select = rs.getInt( "id" );

			return id_From_Select;

		}
	}
	
	/**
	 * Return the id
	 * 
	 * @param 
	 * @return null if not found
	 * @throws SQLException
	 */

	//  Needs to be transactional to work properly with Transactions since this method is called after the 'save' method below

	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
			
	@Override
	public List<String> getScanFilenameList_For_ProjectScanFileId( int projectScanFileId ) throws SQLException {
		
		List<String>  resultList = new ArrayList<>();
	
		final String querySQL = "SELECT scan_filename FROM project_scan_filename_tbl WHERE project_scan_file_id = ?";

		//  Query using 'this.getJdbcTemplate().query' so part of same transaction as the called 'save' method below

		try {
			resultList = this.getJdbcTemplate().query(new PreparedStatementCreator() {
				@Override
				public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

					PreparedStatement pstmt =
							connection.prepareStatement( querySQL );

					pstmt.setInt( 1, projectScanFileId );

					return pstmt;
				}
			}, new QueryForScanFilenameRowMapper());

		} catch ( RuntimeException e ) {
			String msg = "Query Failed: projectScanFileId: " + projectScanFileId + ", SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		return resultList;
	}

	/**
	 * Used in method getId_For_ProjectScanFileId_ScanFilename
	 *
	 */
	private static class QueryForScanFilenameRowMapper implements RowMapper<String> {

		@Override
		public String mapRow(ResultSet rs, int rowNum) throws SQLException {

			String scanFilename_From_Select = rs.getString( "scan_filename" );

			return scanFilename_From_Select;

		}
	}

	///////
	
	private static final String INSERT_SQL = 
			"INSERT INTO project_scan_filename_tbl "
			+ " (project_scan_file_id, scan_filename) VALUES (?, ?) " 
			+ "ON DUPLICATE KEY UPDATE project_scan_file_id = ?";

	/**
	 * NOT SET 'id' property on param Project_ScanFile_DTO
	 * 
	 * @param item
	 */
	
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.MANDATORY )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save__NOT_SET_ID( Project_ScanFilename_DTO item, Log_DuplicateKeyException log_DuplicateKeyException ) {
		
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
							pstmt.setInt( counter, item.getProjectScanFileId() );
							counter++;
							pstmt.setString( counter, item.getScanFilename() );
							counter++;
							pstmt.setInt( counter, item.getProjectScanFileId() );

							return pstmt;
						}
					});

		} catch ( org.springframework.dao.DuplicateKeyException duplicateKeyException ) {

			if ( log_DuplicateKeyException == Log_DuplicateKeyException.YES ) {
				String msg = "INSERT Failed: Project_ScanFilename_DTO: " + item + ", SQL: " + INSERT_SQL;
				log.error( msg, duplicateKeyException );
			}
			
			throw duplicateKeyException;
			
		} catch ( RuntimeException e ) {
			String msg = "Project_ScanFilename_DTO: " + item + ", SQL: " + INSERT_SQL;
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
		
		final String DELETE_SQL = "DELETE FROM project_scan_filename_tbl WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
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
