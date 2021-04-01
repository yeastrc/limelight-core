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
import java.sql.SQLException;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO;

/**
 * table project_level_default_fltr_ann_cutoffs_cutoff_as_string_tbl
 *
 */
@Component
public class ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DAO extends Limelight_JDBC_Base implements ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DAO.class );
	
	////////////////////////

	private static final String INSERT_SQL = 
			"INSERT INTO project_level_default_fltr_ann_cutoffs_cutoff_as_string_tbl "
			+ "( project_level_default_fltr_ann_cutoffs_id, annotation_cutoff_value_string ) "
			+ "VALUES ( ?, ? )";
	
	/**
	 * @param item
	 */
	
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO item ) {
		
		final String insertSQL = INSERT_SQL;

		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( insertSQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_Id() );
							counter++;
							pstmt.setString( counter, item.getAnnotationCutoffValueString() );

							return pstmt;
						}
					});
			
		} catch ( RuntimeException e ) {
			String msg = "ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO: " + item + ", SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}
	
	private static final String COPY_TO_PREV_TBL_FOR_PROJECT_ID_SQL = 
			"INSERT INTO project_level_default_fltr_ann_cutoffs_cutoff_as_string_prev_tbl "
			+ " (project_level_default_fltr_ann_cutoffs_id, annotation_cutoff_value_string, project_id) "
			+ " SELECT project_level_default_fltr_ann_cutoffs_id, annotation_cutoff_value_string, project_id "
			+ " FROM project_level_default_fltr_ann_cutoffs_cutoff_as_string_tbl AS string_tbl"
			+ " INNER JOIN project_level_default_fltr_ann_cutoffs_tbl AS main_tbl ON string_tbl.project_level_default_fltr_ann_cutoffs_id = main_tbl.id "
			+ " WHERE project_id = ?";
	
	/**
	 * @param project_id
	 * @throws Exception
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void copyToPrevTable_ForProjectId( int project_id ) {

		final String sql = COPY_TO_PREV_TBL_FOR_PROJECT_ID_SQL;

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
							pstmt.setInt( counter, project_id );
							return pstmt;
						}
					});
		} catch ( RuntimeException e ) {
			String msg = "Failed to delete, id: " + project_id + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
	}
	
}
