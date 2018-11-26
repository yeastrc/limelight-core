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

/**
 * table file_import_submit_import_program_key_per_user
 *
 */
@Component
public class FileImportSubmitImportProgramKeyPerUserHistoryDAO extends Limelight_JDBC_Base {

	private static final Logger log = LoggerFactory.getLogger( FileImportSubmitImportProgramKeyPerUserHistoryDAO.class );

	
	private static final String INSERT_SQL = 
			"INSERT INTO file_import_submit_import_program_key_per_user_history "
			+ " ( user_id, submit_import_program_key, original_table_created_date_time, original_table_last_updated_date_time ) "

			+ " SELECT user_id, submit_import_program_key, created_date_time, last_updated_date_time "
			+ "  FROM file_import_submit_import_program_key_per_user " 
			+ " WHERE user_id = ? ";
	
	/**
	 * @param userId
	 */
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void copyToHistory( int userId ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, userId );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "userId: " + userId + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}

}
