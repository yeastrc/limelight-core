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
package org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.dao;

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
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.enum_classes.FileImportAndPipelineRun_RequestType;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table import_and_pipeline_run_tracking_tbl
 *
 */
@Component
public class FileImportAndPipelineRunTrackingDAO extends Limelight_JDBC_Base implements FileImportAndPipelineRunTrackingDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( FileImportAndPipelineRunTrackingDAO.class );

	/**
	 * @param id
	 * @return 
	 * @throws Exception
	 */
	@Override
	public FileImportAndPipelineRunTrackingDTO getForId( int id ) throws Exception {
		
		FileImportAndPipelineRunTrackingDTO result = null;
		
		final String sql = "SELECT * FROM import_and_pipeline_run_tracking_tbl WHERE id = ?";

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			preparedStatement.setInt( 1, id );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = populateResultObject( rs );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select FileImportAndPipelineRunTrackingDTO, id: " + id + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return result;
	}

	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	private FileImportAndPipelineRunTrackingDTO populateResultObject( ResultSet rs ) throws SQLException {
		FileImportAndPipelineRunTrackingDTO returnItem = new FileImportAndPipelineRunTrackingDTO();
		returnItem.setId( rs.getInt( "id" ) );
		returnItem.setRequestType( FileImportAndPipelineRun_RequestType.fromValue( rs.getInt( "request_type" ) ) );
		returnItem.setProjectId( rs.getInt( "project_id" ) );
		returnItem.setPriority( rs.getInt( "priority" ) );
		returnItem.setStatus( FileImportStatus.fromValue( rs.getInt( "status_id" ) ) );
		returnItem.setUserId( rs.getInt( "insert_request_user_id" ) );
		//  Skipped some fields
		
		return returnItem; 
	}
	

	//  Spring DB Transactions
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( FileImportAndPipelineRunTrackingDTO item ) {

		//  Insert field "id" since not autoincrement

		final String sql = "INSERT INTO import_and_pipeline_run_tracking_tbl ( "
				+ " id, request_type, project_id, priority, status_id, marked_for_deletion, insert_request_url, "
				+ " insert_request_user_id,  "
				+ " insert_request__remote_user_ip_address )"
				+ " VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? )";

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
							pstmt.setInt( counter, item.getRequestType().value() );
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
							pstmt.setInt( counter, item.getUserId() );
							counter++;
							pstmt.setString( counter, item.getInsertRequest_RemoteUserIpAddress() );
							
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
	 * @param status
	 * @param id
	 * @return true if record updated, false otherwise
	 * @throws Exception
	 */
	
	@Override
	public boolean updateStatus( FileImportStatus status, int id ) throws Exception {

		boolean recordUpdated = false;
		
		String sql = "UPDATE import_and_pipeline_run_tracking_tbl "
				+ " SET "
				+ " status_id = ?, last_updated_date_time = NOW() "
				+ " WHERE id = ?";

		final String sqlFinal = sql;

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
							pstmt.setInt( counter, status.value() );
							counter++;
							pstmt.setInt( counter, id );
							return pstmt;
						}
					});

			if ( rowsUpdated > 0 ) {
				recordUpdated = true;
			}

		} catch ( RuntimeException e ) {
			String msg = "updateStatus(...) id: " + id + ", SQL: " + sql;
			log.error( msg, e );
			throw e;
		}
		
		return recordUpdated;
	}
	
	/**
	 * @param status
	 * @param id
	 * @return true if record updated, false otherwise
	 * @throws Exception
	 */
	
	@Override
	public boolean update__request_data( FileImportAndPipelineRunTrackingDTO item ) throws Exception {

		boolean recordUpdated = false;
		
		String sql = "UPDATE import_and_pipeline_run_tracking_tbl "
					+ " SET "
					+ " request_data = ?, request_data_format_version_number = ?, request_data_contents_version_number = ?, "
					+ " request_data__label_value_pairs__json = ?, "
					+ " request_data__label_value_pairs__json__format_version_number = ?, "
					+ " request_data__label_value_pairs__json__content_version_number = ?, "
					+ " last_updated_date_time = NOW() "
					+ " WHERE id = ?";
		

		final String sqlFinal = sql;

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
							pstmt.setString( counter, item.getRequestData_AsString() );
							counter++;
							pstmt.setInt( counter, item.getRequestData_Format_VersionNumber() );
							counter++;
							pstmt.setInt( counter, item.getRequestData_Content_VersionNumber() );
							counter++;
							pstmt.setString( counter, item.getRequestData_LabelValuePairs_JSON_AsString() );
							counter++;
							pstmt.setInt( counter, item.getRequestData_LabelValuePairs_JSON_Format_VersionNumber() );
							counter++;
							pstmt.setInt( counter, item.getRequestData_LabelValuePairs_JSON_Content_VersionNumber() );
							counter++;
							pstmt.setInt( counter, item.getId() );
							return pstmt;
						}
					});

			if ( rowsUpdated > 0 ) {
				recordUpdated = true;
			}

		} catch ( RuntimeException e ) {
			String msg = "updateStatus(...) id: " + item.getId() + ", SQL: " + sql;
			log.error( msg, e );
			throw e;
		}
		
		return recordUpdated;
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

		final String sqlFinal = "UPDATE import_and_pipeline_run_tracking_tbl "
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
