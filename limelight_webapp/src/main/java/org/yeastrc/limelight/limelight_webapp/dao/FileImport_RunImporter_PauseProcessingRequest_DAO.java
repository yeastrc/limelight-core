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
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Request_Status_Enum;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Request_Type_ID_Enum;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table file_import__run_importer__pause_processing_request_tbl
 *
 */
@Component
public class FileImport_RunImporter_PauseProcessingRequest_DAO extends Limelight_JDBC_Base implements FileImport_RunImporter_PauseProcessingRequest_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( FileImport_RunImporter_PauseProcessingRequest_DAO.class );

	final String UPDATE_NOTE_TEXT_SQL = 
			"INSERT INTO file_import__run_importer__pause_processing_request_tbl "
			+ " ( type_id_fk, status_id_requested_fk, status_id_requested_last_updated_date_time ) "
			+ " VALUES (?, ?, NOW() ) "
			+ " ON DUPLICATE KEY UPDATE "
			+ " status_id_requested_fk = ?, status_id_requested_last_updated_date_time = NOW() ";
	
	//  Spring DB Transactions

	
	/**
	 * @param status_Requested
	 * @param type
	 */
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void insertOrUpdate_StatusId_Requested_ForType( 
			
			FileImport_RunImporter_PauseProcessing_Request_Status_Enum status_Requested, 
			FileImport_RunImporter_PauseProcessing_Request_Type_ID_Enum type ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record

		final String updateSQL = UPDATE_NOTE_TEXT_SQL;

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( updateSQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, type.value() );
							counter++;
							pstmt.setInt( counter, status_Requested.value() );
							counter++;
							pstmt.setInt( counter, status_Requested.value() );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "type: " + type + ", status_Requested: " + status_Requested + ", SQL: " + updateSQL;
			log.error( msg, e );
			throw e;
		}
	}

}
