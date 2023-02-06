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
import java.util.List;

import org.slf4j.LoggerFactory;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table project_search_tag_mapping_tbl
 *
 */
@Component
public class ProjectSearch_TagMapping_DAO extends Limelight_JDBC_Base implements ProjectSearch_TagMapping_DAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearch_TagMapping_DAO.class );

	///////
	
	private static final String INSERT_SQL = 
			"INSERT INTO project_search_tag_mapping_tbl "
			+ " (project_search_id, project_search_tag_strings_in_project_id) VALUES (?, ?) " + 
			"  ON DUPLICATE KEY UPDATE project_search_id = ?";

	
	//  Spring DB Transactions
	@Override
	@Transactional( propagation = Propagation.MANDATORY )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( int project_search_id, int project_search_tag_strings_in_project_id ) {
		
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
							pstmt.setInt( counter, project_search_id );
							counter++;
							pstmt.setInt( counter, project_search_tag_strings_in_project_id );
							counter++;
							pstmt.setInt( counter, project_search_id );

							return pstmt;
						}
					});
			
			//  Skip catch duplicate key since insert has 'ON DUPLICATE KEY UPDATE'
//
//		} catch ( org.springframework.dao.DuplicateKeyException duplicateKeyException ) {
//
//			if ( log_DuplicateKeyException == Log_DuplicateKeyException.YES ) {
//				String msg = "INSERT Failed: project_search_id: " + project_search_id + ", project_search_tag_strings_in_project_id: " + project_search_tag_strings_in_project_id + ", SQL: " + INSERT_SQL;
//				log.error( msg, duplicateKeyException );
//			}
//			
//			throw duplicateKeyException;
			
		} catch ( RuntimeException e ) {
			String msg = "INSERT Failed: project_search_id: " + project_search_id + ", project_search_tag_strings_in_project_id: " + project_search_tag_strings_in_project_id + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}
	
	/**
	 * @param project_search_id
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void delete_For_project_search_id_List__project_search_tag_strings_in_project_id_List(List<Integer>  project_search_id_List, List<Integer> project_search_tag_strings_in_project_id_List) {
		
		if ( project_search_id_List.isEmpty() || project_search_tag_strings_in_project_id_List.isEmpty() ) {
			return; //  EARLY RETURN
		}
		
		StringBuilder sqlSB = new StringBuilder( 10000 );
		sqlSB.append( "DELETE FROM project_search_tag_mapping_tbl WHERE project_search_id IN ( " );
		
		for ( int count = 0; count < project_search_id_List.size(); count++ ) {
			if ( count != 0 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		
		sqlSB.append( " ) AND project_search_tag_strings_in_project_id IN ( " );

		for ( int count = 0; count < project_search_tag_strings_in_project_id_List.size(); count++ ) {
			if ( count != 0 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		
		sqlSB.append( " ) " );
		
		final String DELETE_SQL = sqlSB.toString();
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt = connection.prepareStatement( DELETE_SQL );
							int counter = 0;
							for ( Integer project_search_id : project_search_id_List ) {
								counter++;
								pstmt.setInt( counter, project_search_id );
							}
							for ( Integer project_search_tag_strings_in_project_id : project_search_tag_strings_in_project_id_List ) {
								counter++;
								pstmt.setInt( counter, project_search_tag_strings_in_project_id );
							}
							
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "delete_For_project_search_id(...): project_search_id_List: " 
					+ StringUtils.join( project_search_id_List ) 
					+ ", project_search_tag_strings_in_project_id_List: " + StringUtils.join( project_search_tag_strings_in_project_id_List )
					+ ", SQL: " + DELETE_SQL;
			log.error( msg, e );
			throw e;
		}
	}


}
