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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectUserDeletedDTO;

/**
 * table project_user_deleted_tbl
 *
 */
@Service
public class ProjectUserDeletedDAO extends Limelight_JDBC_Base implements ProjectUserDeletedDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( ProjectUserDeletedDAO.class );
	

	//  Spring DB Transactions
	/**
	 * @param item
	 */
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( ProjectUserDeletedDTO item ) { 
		
		final String INSERT_SQL = "INSERT INTO project_user_deleted_tbl ( project_id, user_id, access_level, deleted_by_user_id ) VALUES ( ?, ?, ?, ? )";
		
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
							counter++;
							pstmt.setInt( counter, item.getDeletedByUserId() );

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
