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
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectLevelDefaultFltrAnnCutoffs_DTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table project_level_default_fltr_ann_cutoffs_tbl
 *
 */
@Component
public class ProjectLevelDefaultFltrAnnCutoffs_DAO extends Limelight_JDBC_Base implements ProjectLevelDefaultFltrAnnCutoffs_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( ProjectLevelDefaultFltrAnnCutoffs_DAO.class );
	
	////////////////////////

	private static final String INSERT_SQL = 
			"INSERT INTO project_level_default_fltr_ann_cutoffs_tbl "
			+ "(project_id, search_program_name, psm_peptide_protein_type, annotation_type_name, annotation_cutoff_value, created_user_id, last_updated_user_id ) "
			+ "VALUES ( ?, ?, ?, ?, ?, ?, ? )";

	/**
	 * @param item
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( ProjectLevelDefaultFltrAnnCutoffs_DTO item ) {
		
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
							pstmt.setString( counter, item.getSearchProgramName() );
							counter++;
							pstmt.setString( counter, item.getPsmPeptideMatchedProteinAnnotationType().value() );
							counter++;
							pstmt.setString( counter, item.getAnnotationTypeName() );
							counter++;
							pstmt.setDouble( counter, item.getAnnotationCutoffValue() );
							
							counter++;
							pstmt.setInt( counter, item.getCreatedUserId() );
							counter++;
							pstmt.setInt( counter, item.getLastUpdatedUserId() );

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
			String msg = "ProjectLevelDefaultFltrAnnCutoffs_DTO: " + item + ", SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}
	
	/**
	 * @param project_id
	 * @throws Exception
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void deleteAllFor_ProjectId( int project_id ) {

		final String sql = "DELETE FROM project_level_default_fltr_ann_cutoffs_tbl WHERE project_id = ?";

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

	private static final String COPY_TO_PREV_TBL_FOR_PROJECT_ID_SQL = 
		
			"INSERT INTO project_level_default_fltr_ann_cutoffs_prev_tbl "
			 + " ( id, project_id, psm_peptide_protein_type, search_program_name, " 
			 +   " annotation_type_name, annotation_cutoff_value, "
			 +   " created_user_id, created_date_time, last_updated_user_id, last_updated_date_time, " 
			 +   " id_prev_record, copy_create_date ) "
			+ " SELECT "
			+   " id, project_id, psm_peptide_protein_type, search_program_name, " 
			+   " annotation_type_name, annotation_cutoff_value, "
			+   " created_user_id, created_date_time, last_updated_user_id, last_updated_date_time, null, now() " 
			+   " FROM project_level_default_fltr_ann_cutoffs_tbl "
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
