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
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchSubGroupDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * 
 * table project_search_sub_group_tbl
 * 
 * Update
 *
 */
@Component
public class ProjectSearchSubGroup__WEB_DAO extends Limelight_JDBC_Base implements ProjectSearchSubGroup__WEB_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearchSubGroup__WEB_DAO.class );
	
	
	//  Insert, on duplicate update
	private static final String INSERT_UPDATE_SQL = 
			"INSERT INTO project_search_sub_group_tbl (project_search_id, search_sub_group_id, search_id, display_order, subgroup_name_display)"
			+ "VALUES (?, ?, ?, ?, ?)"
			+ " ON DUPLICATE KEY UPDATE search_id = ?, display_order = ?, subgroup_name_display = ?";
	
	//  Spring DB Transactions
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void insertOrUpdate( ProjectSearchSubGroupDTO item ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record

		final String insertUpdateSQL = INSERT_UPDATE_SQL;

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( insertUpdateSQL );

							int counter = 0;
							
							// INSERT
							
							counter++;
							pstmt.setInt( counter, item.getProjectSearchId() );
							counter++;
							pstmt.setInt( counter, item.getSearchSubGroupId() );
							counter++;
							pstmt.setInt( counter, item.getSearchId() );
							counter++;
							if ( item.getDisplayOrder() != null ) {
								pstmt.setInt( counter, item.getDisplayOrder() );
							} else {
								pstmt.setNull( counter, java.sql.Types.INTEGER );
							}
							counter++;
							pstmt.setString( counter, item.getSubgroupName_Display() );
							
							//  ON DUPLICATE KEY

							counter++;
							pstmt.setInt( counter, item.getSearchId() );
							counter++;
							if ( item.getDisplayOrder() != null ) {
								pstmt.setInt( counter, item.getDisplayOrder() );
							} else {
								pstmt.setNull( counter, java.sql.Types.INTEGER );
							}
							counter++;
							pstmt.setString( counter, item.getSubgroupName_Display() );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "getProjectSearchId: " + item.getProjectSearchId() + ", SQL: " + insertUpdateSQL;
			log.error( msg, e );
			throw e;
		}
	}
	
}
