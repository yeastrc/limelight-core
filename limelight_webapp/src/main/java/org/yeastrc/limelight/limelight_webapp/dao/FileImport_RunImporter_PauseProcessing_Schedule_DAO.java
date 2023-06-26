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
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.pause_run_importer_common.enum_classes.FileImport_RunImporter_PauseProcessing_Schedule_Type_ID_Enum;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table file_import__run_importer__pause_processing_schedule_tbl
 *
 */
@Component
public class FileImport_RunImporter_PauseProcessing_Schedule_DAO extends Limelight_JDBC_Base implements FileImport_RunImporter_PauseProcessing_Schedule_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( FileImport_RunImporter_PauseProcessing_Schedule_DAO.class );

	final String INSERT_SQL = 
			"INSERT INTO file_import__run_importer__pause_processing_schedule_tbl "
			+ " ( type_id_fk, schedule_json, schedule_json_version, schedule_last_updated_date_time ) "
			+ " VALUES (?, ?, ?, NOW() ) ";
	
	//  Spring DB Transactions

	/**
	 * @param type
	 * @param scheduleJSON
	 * @param scheduleJSON_Version
	 */
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void insert( 
			 
			FileImport_RunImporter_PauseProcessing_Schedule_Type_ID_Enum type,
			String scheduleJSON,
			int scheduleJSON_Version ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record

		final String insertSQL = INSERT_SQL;

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( insertSQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, type.value() );
							counter++;
							pstmt.setString( counter, scheduleJSON );
							counter++;
							pstmt.setInt( counter, scheduleJSON_Version );

							return pstmt;
						}
					});

		} catch ( DuplicateKeyException e ) {
			
			throw e;
			
		} catch ( RuntimeException e ) {
			String msg = "type: " + type + ", scheduleJSON: " + scheduleJSON + ", SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}
	
	////////////////////

	final String UPDATE_SQL = 
			"UPDATE file_import__run_importer__pause_processing_schedule_tbl "
			+ " SET schedule_json = ?, schedule_json_version = ?, schedule_last_updated_date_time = NOW() "
			+ " WHERE type_id_fk = ? AND UNIX_TIMESTAMP( schedule_last_updated_date_time ) = ? ";
	
	//  Spring DB Transactions

	/**
	 * @param type
	 * @param scheduleJSON
	 * @param scheduleJSON_Version
	 * @param scheduleJSON_PrevLastUpdated_Milliseconds_UTC
	 * @return true if record updated
	 */
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public boolean update_for_Type_And_scheduleJSON_PrevLastUpdated_Milliseconds_UTC( 
			 
			FileImport_RunImporter_PauseProcessing_Schedule_Type_ID_Enum type,
			String scheduleJSON,
			int scheduleJSON_Version,
			int scheduleJSON_PrevLastUpdated_Milliseconds_UTC ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record

		final String updateSQL = UPDATE_SQL;

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( updateSQL );
							int counter = 0;
							//  New Values
							counter++;
							pstmt.setString( counter, scheduleJSON );
							counter++;
							pstmt.setInt( counter, scheduleJSON_Version );
							//  WHERE
							counter++;
							pstmt.setInt( counter, type.value() );
							counter++;
							pstmt.setInt( counter, scheduleJSON_PrevLastUpdated_Milliseconds_UTC );

							return pstmt;
						}
					});
			
			if ( rowsUpdated > 0 ) {
				return true;
			}
			return false;
			
		} catch ( RuntimeException e ) {
			String msg = "type: " + type + ", scheduleJSON: " + scheduleJSON + ", SQL: " + updateSQL;
			log.error( msg, e );
			throw e;
		}
	}

}
