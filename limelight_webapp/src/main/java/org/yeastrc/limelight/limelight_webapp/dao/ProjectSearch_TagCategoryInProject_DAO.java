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
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.constants.ProjectSearch_TagCategoryInProject_UncategorizedFakeLabel_Values_Constants;
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearch_TagCategoryInProject_DTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightDatabaseException;

/**
 * 
 * table project_search_tag_category_in_project_tbl
 * 
 *
 */
@Component
public class ProjectSearch_TagCategoryInProject_DAO extends Limelight_JDBC_Base implements ProjectSearch_TagCategoryInProject_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearch_TagCategoryInProject_DAO.class );

	/**
	 * Return the record for the id
	 * 
	 * @param 
	 * @return null if not found
	 * @throws SQLException
	 */
	
	//  Needs to be transactional to work properly with Transactions since this method is called after the 'save' method below
	
	
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public ProjectSearch_TagCategoryInProject_DTO getRecord_For_Id( int id ) {
		
		ProjectSearch_TagCategoryInProject_DTO result = null;

		final String querySQL = "SELECT * FROM project_search_tag_category_in_project_tbl WHERE id = ?";
		
		//  Query using 'this.getJdbcTemplate().query' so part of same transaction as the called 'save' method below

		try {
			List<ProjectSearch_TagCategoryInProject_DTO> retrievedRecords = this.getJdbcTemplate().query(new PreparedStatementCreator() {
				
				@Override
				public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

					PreparedStatement pstmt =
							connection.prepareStatement( querySQL );

					pstmt.setInt( 1, id );

					return pstmt;
				}
			}, new QueryForAllFieldsRowMapper());

			if ( retrievedRecords.size() > 1 ) {
				String msg = "ERROR: Retrieve > 1 record.  id: " + id + ", SQL: " + querySQL;
				log.error( msg );
				throw new LimelightDatabaseException(msg);
			}
			
			if ( retrievedRecords.size() == 1 ) {
			
				result = retrievedRecords.get(0);
			}

		} catch ( RuntimeException e ) {
			String msg = "Query Failed: id: " + id + ", SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		
		return result;
	}

	/**
	 * Used in method getId_For_ProjectId_ScanFileId
	 *
	 */
	private static class QueryForAllFieldsRowMapper implements RowMapper<ProjectSearch_TagCategoryInProject_DTO> {

		@Override
		public ProjectSearch_TagCategoryInProject_DTO mapRow(ResultSet rs, int rowNum) throws SQLException {

			ProjectSearch_TagCategoryInProject_DTO result = new ProjectSearch_TagCategoryInProject_DTO();
			result.setId( rs.getInt( "id" ) );
			result.setProjectId( rs.getInt( "project_id" ) );
			result.setCategoryLabel( rs.getString( "category_label" ) );

			return result;
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
	
	
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public Integer getId_For_ProjectId_CategoryLabel( int projectId, String categoryLabel ) {
		
		Integer result = null;

		final String querySQL = "SELECT id FROM project_search_tag_category_in_project_tbl WHERE project_id = ? AND category_label = ?";
		
		//  Query using 'this.getJdbcTemplate().query' so part of same transaction as the called 'save' method below

		try {
			List<Integer> retrievedIds = this.getJdbcTemplate().query(new PreparedStatementCreator() {
				
				@Override
				public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

					PreparedStatement pstmt =
							connection.prepareStatement( querySQL );

					pstmt.setInt( 1, projectId );

					pstmt.setString( 2, categoryLabel );

					return pstmt;
				}
			}, new QueryForIdRowMapper());

			if ( retrievedIds.size() > 1 ) {
				String msg = "ERROR: Retrieve > 1 record.  projectId: " + projectId + ", categoryLabel: " + categoryLabel + ", SQL: " + querySQL;
				log.error( msg );
				throw new LimelightDatabaseException(msg);
			}
			
			if ( retrievedIds.size() == 1 ) {
			
				result = retrievedIds.get(0);
			}

		} catch ( RuntimeException e ) {
			String msg = "Query Failed: projectId: " + projectId + ", categoryLabel: " + categoryLabel + ", SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		
		return result;
	}


	/**
	 * Used in method getId_For_ProjectId_ScanFileId
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
	 * Return the Project Id
	 * 
	 * @param 
	 * @return null if not found
	 * @throws SQLException
	 */
	
	//  Needs to be transactional to work properly with Transactions since this method is called after the 'save' method below
	
	
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public Integer getProjectId_For_Id( int tagId ) {
		
		Integer result = null;

		final String querySQL = "SELECT project_id FROM project_search_tag_category_in_project_tbl WHERE id = ?";
		
		//  Query using 'this.getJdbcTemplate().query' so part of same transaction as the called 'save' method below

		try {
			List<Integer> retrievedIds = this.getJdbcTemplate().query(new PreparedStatementCreator() {
				
				@Override
				public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

					PreparedStatement pstmt =
							connection.prepareStatement( querySQL );

					pstmt.setInt( 1, tagId );

					return pstmt;
				}
			}, new QueryForProjectIdRowMapper());

			if ( retrievedIds.size() > 1 ) {
				String msg = "getProjectId_For_Id(...): ERROR: Retrieve > 1 record.  tagId: " + tagId + ", SQL: " + querySQL;
				log.error( msg );
				throw new LimelightDatabaseException(msg);
			}

			if ( retrievedIds.size() == 1 ) {
			
				result = retrievedIds.get(0);
			}

		} catch ( RuntimeException e ) {
			String msg = "getProjectId_For_Id(...): Query Failed: tagId: " + tagId + ", SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		
		return result;
	}


	/**
	 * Used in method getId_For_ProjectId_ScanFileId
	 *
	 */
	private static class QueryForProjectIdRowMapper implements RowMapper<Integer> {

		
		@Override
		public Integer mapRow(ResultSet rs, int rowNum) throws SQLException {

			Integer id_From_Select = rs.getInt( "project_id" );

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
	
	
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public Integer getId_For_UncategorizedFakeRecord() {
		
		Integer result = null;

		final String querySQL = 
				"SELECT id FROM project_search_tag_category_in_project_tbl WHERE uncategorized_fake_record = " 
				+ ProjectSearch_TagCategoryInProject_UncategorizedFakeLabel_Values_Constants.UNCATEGORIZED_FAKE_LABEL_TRUE;
		
		//  Query using 'this.getJdbcTemplate().query' so part of same transaction as the called 'save' method below

		try {
			List<Integer> retrievedIds = this.getJdbcTemplate().query(new PreparedStatementCreator() {
				
				@Override
				public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

					PreparedStatement pstmt =
							connection.prepareStatement( querySQL );

					return pstmt;
				}
			}, new GetId_For_UncategorizedFakeRecordRowMapper());

			if ( retrievedIds.size() > 1 ) {
				String msg = "getId_For_UncategorizedFakeRecord(...): ERROR: Retrieve > 1 record.  SQL: " + querySQL;
				log.error( msg );
				throw new LimelightDatabaseException(msg);
			}

			if ( retrievedIds.size() == 1 ) {
			
				result = retrievedIds.get(0);
			}

		} catch ( RuntimeException e ) {
			String msg = "getId_For_UncategorizedFakeRecord(...): Query Failed: SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		
		return result;
	}


	/**
	 * Used in method getId_For_UncategorizedFakeRecord
	 *
	 */
	private static class GetId_For_UncategorizedFakeRecordRowMapper implements RowMapper<Integer> {

		
		@Override
		public Integer mapRow(ResultSet rs, int rowNum) throws SQLException {

			Integer id_From_Select = rs.getInt( "id" );

			return id_From_Select;
		}
	}

	///////
	
	private static final String INSERT_SQL = 
			"INSERT INTO project_search_tag_category_in_project_tbl "
			
					+ " (project_id, category_label, label_color_font, label_color_background, label_color_border, "
					+ "  created_by_user_id, updated_by_user_id ) "
					+ " VALUES (?, ?, ?, ?, ?, ?, ?) " + 
					"  ON DUPLICATE KEY UPDATE project_id = ?";

	/**
	 * NOT SET 'id' property on param ProjectSearch_TagCategoryInProject_DTO
	 * 
	 * @param item
	 */
	
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save__NOT_SET_ID( ProjectSearch_TagCategoryInProject_DTO item ) {
		
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
							pstmt.setInt( counter, item.getProjectId() );
							counter++;
							pstmt.setString( counter, item.getCategoryLabel() );
							counter++;
							pstmt.setString( counter, item.getLabel_Color_Font() );
							counter++;
							pstmt.setString( counter, item.getLabel_Color_Background() );
							counter++;
							pstmt.setString( counter, item.getLabel_Color_Border() );
							counter++;
							if ( item.getCreatedBy_UserId() != null ) {
								pstmt.setInt( counter, item.getCreatedBy_UserId() );
							} else {
								pstmt.setNull(counter, java.sql.Types.INTEGER );
							}
							counter++;
							if ( item.getUpdatedBy_UserId() != null ) {
								pstmt.setInt( counter, item.getUpdatedBy_UserId() );
							} else {
								pstmt.setNull(counter, java.sql.Types.INTEGER );
							}
							counter++;
							pstmt.setInt( counter, item.getProjectId() );
							
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "INSERT Failed: item: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}	
	

	////////////////////////

	private static final String INSERT_OR_UPDATE_UNCATEGORIZED_FAKE_RECORD_SQL =
			"INSERT INTO project_search_tag_category_in_project_tbl ( uncategorized_fake_record, category_label ) VALUES ( "
			+ ProjectSearch_TagCategoryInProject_UncategorizedFakeLabel_Values_Constants.UNCATEGORIZED_FAKE_LABEL_TRUE
			+ ", 'uncategorized' "
			+ ")"
					+ " ON DUPLICATE KEY UPDATE dummy_on_duplicate_update = 0";
	/**
	 * @param item
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void insertIfNotExist_UncategorizedFakeRecord() {
		
		final String insertSQL = INSERT_OR_UPDATE_UNCATEGORIZED_FAKE_RECORD_SQL;

		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( insertSQL );
														
							return pstmt;
						}
					});
			
		} catch ( RuntimeException e ) {
			String msg = "insertIfNotExist_UncategorizedFakeRecord: SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}


	private static final String UPDATE_MOST_FIELDS_SQL = 
			"UPDATE project_search_tag_category_in_project_tbl "
					+ " SET "
					+ " category_label = ?, label_color_background = ?, label_color_font = ?, label_color_border = ?, created_by_user_id = ? "
					+ " WHERE id = ?";

	/**
	 * 
	 * 
	 * @param item
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void update( ProjectSearch_TagCategoryInProject_DTO item ) {
		
		if ( item == null ) {
			throw new IllegalArgumentException( "update(...): ( item == null )" );
		}
		if ( item.getUpdatedBy_UserId() == null ) {
			throw new IllegalArgumentException( "update(...): ( item.getUpdatedBy_UserId() == null )" );
		}
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt = connection.prepareStatement( UPDATE_MOST_FIELDS_SQL );
							int counter = 0;

							counter++;
							pstmt.setString( counter, item.getCategoryLabel() );
							counter++;
							pstmt.setString( counter, item.getLabel_Color_Background() );
							counter++;
							pstmt.setString( counter, item.getLabel_Color_Font() );
							counter++;
							pstmt.setString( counter, item.getLabel_Color_Border() );
							counter++;
							pstmt.setInt( counter, item.getUpdatedBy_UserId() );

							counter++;
							pstmt.setInt( counter, item.getId() );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "update(...): item: " + item + ", SQL: " + UPDATE_MOST_FIELDS_SQL;
			log.error( msg, e );
			throw e;
		}
	}



	/**
	 * 
	 * 
	 * @param id
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void delete( int id ) {
		
		final String DELETE_SQL = "DELETE FROM project_search_tag_category_in_project_tbl WHERE id = ?";
		
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
			String msg = "delete(...): id: " + id + ", SQL: " + DELETE_SQL;
			log.error( msg, e );
			throw e;
		}
	}


}

