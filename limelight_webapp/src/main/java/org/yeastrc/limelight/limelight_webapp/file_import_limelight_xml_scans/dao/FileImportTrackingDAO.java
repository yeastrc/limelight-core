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
import java.sql.ResultSet;
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
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.populate_dto_from_result.FileImportTracking_PopulateDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table file_import_tracking_tbl
 *
 */
@Component
public class FileImportTrackingDAO extends Limelight_JDBC_Base implements FileImportTrackingDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( FileImportTrackingDAO.class );
	
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingDAO_IF#getForId(int)
	 */
	@Override
	public FileImportTrackingDTO getForId( int id ) throws Exception {

		FileImportTrackingDTO result = null;

		final String querySQL =  "SELECT * FROM file_import_tracking_tbl WHERE id = ? ";

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {

			int paramCounter = 0;
			paramCounter++;
			preparedStatement.setInt( paramCounter, id );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {

				if( rs.next() ) {
					result = 
							FileImportTracking_PopulateDTO.getInstance()
							.populateResultObject( rs );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select FileImportTrackingDTO, sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return result;
	}

	//  Spring DB Transactions
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( FileImportTrackingDTO item ) {

		//  Insert field "id" since not autoincrement

		final String sql = "INSERT INTO file_import_tracking_tbl ( "
				+ " id, project_id, priority, status_id, marked_for_deletion, "
				+ " init_request_url, submit_request_url, "
				+ " search_name, search_short_name, search_path, user_id,  "
				+ " remote_user_ip_address_init, remote_user_ip_address_submit, "
				+ " record_init_date_time, last_updated_date_time )"
				+ " VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW() )";

		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
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
							pstmt.setString( counter, item.getInitRequestURL() );
							counter++;
							pstmt.setString( counter, item.getSubmitRequestURL() );
							counter++;
							pstmt.setString( counter, item.getSearchName() );
							counter++;
							pstmt.setString( counter, item.getSearchShortName() );
							counter++;
							pstmt.setString( counter, item.getSearchPath() );
							counter++;
							pstmt.setInt( counter, item.getUserId() );
							counter++;
							pstmt.setString( counter, item.getRemoteUserIpAddressInit() );
							counter++;
							pstmt.setString( counter, item.getRemoteUserIpAddressSubmit() );
							
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "item: " + item + ", item.id: " + item.getId() + ", SQL: " + sql;
			log.error( msg, e );
			throw e;
		}
	}
	
	@Override
	public void set_FieldsUpdatedInSubmit_ForId( FileImportTrackingDTO item ) {

		final String sqlFinal = "UPDATE file_import_tracking_tbl "
				+ " SET "
				+ " search_name = ?, "
				+ " search_short_name = ?, "
				+ " search_path = ?, "
				+ " last_updated_date_time = NOW() "
				+ " WHERE id = ? ";

		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sqlFinal );
							int counter = 0;
							counter++;
							pstmt.setString( counter, item.getSearchName() );
							counter++;
							pstmt.setString( counter, item.getSearchShortName() );
							counter++;
							pstmt.setString( counter, item.getSearchPath() );
							counter++;
							pstmt.setInt( counter, item.getId() );
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "set_FieldsUpdatedInSubmit_ForId(...) item: " + item + ", SQL: " + sqlFinal;
			log.error( msg, e );
			throw e;
		}
	}
	
	@Override
	public void set_Status_Queued_Submitted_ForId( String remote_user_ip_address_submit, String submit_request_url, int id ) {

		final String sqlFinal = "UPDATE file_import_tracking_tbl "
				+ " SET status_id = " + FileImportStatus.QUEUED.value()
				+ " , "
				+ " remote_user_ip_address_submit = ?, submit_request_url = ?, "
				+ " record_submit_date_time = NOW(), last_updated_date_time = NOW() "
				+ " WHERE id = ? ";

		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sqlFinal );
							int counter = 0;
							counter++;
							pstmt.setString( counter, remote_user_ip_address_submit );
							counter++;
							pstmt.setString( counter, submit_request_url );
							counter++;
							pstmt.setInt( counter, id );
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "set_Status_Queued_Submitted_ForId(...) id: " + id + ", SQL: " + sqlFinal;
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
			int id, FileImportStatus status_ToExclude,  int deletedByUserId ) {

		final String sqlFinal = "UPDATE file_import_tracking_tbl "
				+ " SET marked_for_deletion = " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE
				+ " , last_updated_date_time = NOW(),"
				+ " deleted_by_user_id = ?, deleted_date_time = NOW() "
				+ " WHERE id = ? AND status_id != ?";


		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
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
