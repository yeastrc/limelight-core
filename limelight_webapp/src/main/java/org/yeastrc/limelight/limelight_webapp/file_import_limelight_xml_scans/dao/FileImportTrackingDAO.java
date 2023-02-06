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
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table file_import_tracking_tbl
 *
 */
@Component
public class FileImportTrackingDAO extends Limelight_JDBC_Base implements FileImportTrackingDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( FileImportTrackingDAO.class );

	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( FileImportTrackingDTO item ) {

		//  Insert field "id" since not autoincrement

		final String sql = "INSERT INTO file_import_tracking_tbl ( "
				+ " id, project_id, priority, status_id, marked_for_deletion, insert_request_url, "
				+ " search_name, search_short_name, search_path, user_id,  "
				+ " remote_user_ip_address, last_updated_date_time )"
				+ " VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW() )";

		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sql );

							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getId() );
							counter++;
							pstmt.setInt( counter, item.getProjectId() );
							counter++;
							pstmt.setInt( counter, item.getPriority() );
							counter++;
							pstmt.setInt( counter, item.getStatus().value() );
							counter++;
							if ( item.isMarkedForDeletion() ) {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
							} else {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
							}
							counter++;
							pstmt.setString( counter, item.getInsertRequestURL() );
							counter++;
							pstmt.setString( counter, item.getSearchName() );
							counter++;
							pstmt.setString( counter, item.getSearchShortName() );
							counter++;
							pstmt.setString( counter, item.getSearchPath() );
							counter++;
							pstmt.setInt( counter, item.getUserId() );
							counter++;
							pstmt.setString( counter, item.getRemoteUserIpAddress() );
							
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "item: " + item + ", item.id: " + item.getId() + ", SQL: " + sql;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * @param id
	 * @param status_ToExclude - Do NOT update if has this status
	 * @param deletedByUserId
	 * @throws Exception
	 */
	@Override
	public void setMarkedForDeletionForId_ExcludingStatus( 
			int id, FileImportStatus status_ToExclude,  int deletedByUserId ) throws Exception {

		final String sqlFinal = "UPDATE file_import_tracking_tbl "
				+ " SET marked_for_deletion = " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE
				+ " , last_updated_date_time = NOW(),"
				+ " deleted_by_user_id = ?, deleted_date_time = NOW() "
				+ " WHERE id = ? AND status_id != ?";
;

		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sqlFinal );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, deletedByUserId );
							counter++;
							pstmt.setInt( counter, id );
							counter++;
							pstmt.setInt( counter, status_ToExclude.value() );
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "setMarkedForDeletionForId_ExcludingStatus(...) id: " + id + ", SQL: " + sqlFinal;
			log.error( msg, e );
			throw e;
		}
	}
	
}
