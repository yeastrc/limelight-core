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
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.ImportSingleFileUploadStatus;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingSingleFileDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.populate_dto_from_result.FileImportAndPipelineRunTrackingSingleFile_PopulateDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table import_and_pipeline_run_tracking_single_file_tbl
 *
 */
@Component
public class FileImportAndPipelineRunTrackingSingleFileDAO extends Limelight_JDBC_Base implements FileImportAndPipelineRunTrackingSingleFileDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( FileImportAndPipelineRunTrackingSingleFileDAO.class );
	
	/**
	 * @param id
	 * @return 
	 * @throws Exception
	 */

	@Override
	public FileImportAndPipelineRunTrackingSingleFileDTO getForId( int id ) throws Exception {
		
		FileImportAndPipelineRunTrackingSingleFileDTO result = null;
		
		final String sql = "SELECT * FROM import_and_pipeline_run_tracking_single_file_tbl WHERE id = ?";

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			preparedStatement.setInt( 1, id );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = FileImportAndPipelineRunTrackingSingleFile_PopulateDTO.getInstance()
							.populateResultObject( rs );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select FileImportAndPipelineRunTrackingSingleFileDTO, id: " + id + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return result;
	}
	

	/**
	 * @param trackingId
	 * @return 
	 * @throws Exception
	 */

	@Override
	public List<FileImportAndPipelineRunTrackingSingleFileDTO> getFor_TrackingId( int trackingId ) throws Exception {
		
		List<FileImportAndPipelineRunTrackingSingleFileDTO> resultList = new ArrayList<>();
		
		final String sql = "SELECT * FROM import_and_pipeline_run_tracking_single_file_tbl WHERE import_and_pipeline_run_tracking_id = ?";

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			preparedStatement.setInt( 1, trackingId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					FileImportAndPipelineRunTrackingSingleFileDTO result = FileImportAndPipelineRunTrackingSingleFile_PopulateDTO.getInstance()
							.populateResultObject( rs );
					resultList.add(result);
				}
			}
		} catch ( Exception e ) {
			String msg = "getFor_TrackingId(...): Failed to select FileImportAndPipelineRunTrackingSingleFileDTO, trackingId: " + trackingId + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return resultList;
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingSingleFileDAO_IF#getFor_TrackingId_FileIndex(int, int)
	 */

	@Override
	public List<FileImportAndPipelineRunTrackingSingleFileDTO> getFor_TrackingId_FileIndex( int trackingId, int fileIndex ) throws Exception {
		
		List<FileImportAndPipelineRunTrackingSingleFileDTO> resultList = new ArrayList<>();
		
		final String sql = "SELECT * FROM import_and_pipeline_run_tracking_single_file_tbl WHERE import_and_pipeline_run_tracking_id = ? AND file_index = ?";

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			preparedStatement.setInt( 1, trackingId );
			preparedStatement.setInt( 2, fileIndex );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					FileImportAndPipelineRunTrackingSingleFileDTO result = 
							FileImportAndPipelineRunTrackingSingleFile_PopulateDTO.getInstance()
							.populateResultObject( rs );
					resultList.add(result);
				}
			}
		} catch ( Exception e ) {
			String msg = "getFor_TrackingId_FileIndex(...): Failed to select FileImportAndPipelineRunTrackingSingleFileDTO, trackingId: " + trackingId + ", fileIndex: " + fileIndex + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return resultList;
	}
	

	private static final String INSERT_SQL = "INSERT INTO import_and_pipeline_run_tracking_single_file_tbl "
			+ "( import_and_pipeline_run_tracking_id, "
			+ " unique_request_identifier_from_submitter, "
			+ " file_index, "
			+ " file_type_id, file_upload_status_id, "
			+ " filename_in_upload, filename_on_disk, filename_on_disk_with_path_sub_same_machine, "
			+ " canonical_filename_w_path_on_submit_machine, absolute_filename_w_path_on_submit_machine, "
			+ " aws_s3_bucket_name, aws_s3_object_key, aws_s3_region, "
			+ " file_size,"
			+ " file_location_or_aws_s3_object_provided_from_external_system, "
			+ " file_location_or_aws_s3_obj_prov_fm_ext_sys_delete_af_imprt )"
			+ " VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";

	//  Spring DB Transactions
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( FileImportAndPipelineRunTrackingSingleFileDTO item ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			KeyHolder keyHolder = new GeneratedKeyHolder();
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL, Statement.RETURN_GENERATED_KEYS );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getFileImportAndPipelineRunTracking_Id() );
							counter++;
							pstmt.setString( counter, item.getUnique_request_identifier_from_submitter() );
							counter++;
							if ( item.getFileIndex() != null ) {
								pstmt.setInt( counter, item.getFileIndex() );
							} else {
								pstmt.setNull( counter, java.sql.Types.INTEGER );
							}
							counter++;
							pstmt.setInt( counter, item.getFileTypeId() );
							counter++;
							pstmt.setInt( counter, item.getFileUploadStatus().value() );
							counter++;
							pstmt.setString( counter, item.getFilenameInUpload() );
							counter++;
							pstmt.setString( counter, item.getFilenameOnDisk() );
							counter++;
							pstmt.setString( counter, item.getFilenameOnDiskWithPathSubSameMachine() );
							counter++;
							pstmt.setString( counter, item.getCanonicalFilename_W_Path_OnSubmitMachine() );
							counter++;
							pstmt.setString( counter, item.getAbsoluteFilename_W_Path_OnSubmitMachine() );
							counter++;
							pstmt.setString( counter, item.getAws_s3_bucket_name() );
							counter++;
							pstmt.setString( counter, item.getAws_s3_object_key() );
							counter++;
							pstmt.setString( counter, item.getAws_s3_region() );
							counter++;
							pstmt.setLong( counter, item.getFileSize() );
							counter++;
							if ( item.isFileLocation_Or_AWS_S3_Object_ProvidedFrom_ExternalSystem() ) {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
							} else {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
							}
							counter++;
							if ( item.isFileLocation_Or_AWS_S3_Object_From_ExternalSystem_DeleteAfterImport() ) {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
							} else {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
							}
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
			String msg = "save(...): " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	//  Spring DB Transactions
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void update_AWS_S3_Fields( FileImportAndPipelineRunTrackingSingleFileDTO item ) {

		final String SQL = 
				"UPDATE import_and_pipeline_run_tracking_single_file_tbl SET aws_s3_bucket_name = ?, aws_s3_object_key = ?, aws_s3_region = ? WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( SQL );
							int counter = 0;
							counter++;
							pstmt.setString( counter, item.getAws_s3_bucket_name() );
							counter++;
							pstmt.setString( counter, item.getAws_s3_object_key() );
							counter++;
							pstmt.setString( counter, item.getAws_s3_region() );
							counter++;
							pstmt.setInt( counter, item.getId() );
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "update_AWS_S3_Fields( FileImportAndPipelineRunTrackingSingleFileDTO item ). item: " 
					+ item
					+ ", SQL: " + SQL;
			log.error( msg, e );
			throw e;
		}
		
	}

	//  Spring DB Transactions
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void update_LocalFile_Fields( FileImportAndPipelineRunTrackingSingleFileDTO item ) {

		final String SQL = 
				"UPDATE import_and_pipeline_run_tracking_single_file_tbl SET filename_on_disk = ?, canonical_filename_w_path_on_submit_machine = ?, absolute_filename_w_path_on_submit_machine = ? WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( SQL );
							int counter = 0;
							counter++;
							pstmt.setString( counter, item.getFilenameOnDisk() );
							counter++;
							pstmt.setString( counter, item.getCanonicalFilename_W_Path_OnSubmitMachine() );
							counter++;
							pstmt.setString( counter, item.getAbsoluteFilename_W_Path_OnSubmitMachine() );
							counter++;
							pstmt.setInt( counter, item.getId() );
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "update_LocalFile( FileImportAndPipelineRunTrackingSingleFileDTO item ). item: " 
					+ item
					+ ", SQL: " + SQL;
			log.error( msg, e );
			throw e;
		}
		
	}
	
	//  Spring DB Transactions
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void update_file_upload_status_id_For_Id( ImportSingleFileUploadStatus fileUploadStatus, int id ) {

		final String SQL = 
				"UPDATE import_and_pipeline_run_tracking_single_file_tbl SET file_upload_status_id = ? WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, fileUploadStatus.value() );
							counter++;
							pstmt.setInt( counter, id );
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "update_file_upload_status_id_For_Id( int file_upload_status_id, int id ). fileUploadStatus: " 
					+ fileUploadStatus
					+ ", id: " + id
					+ ", SQL: " + SQL;
			log.error( msg, e );
			throw e;
		}
	}
	

	//  Spring DB Transactions
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void delete_For_Id( int id ) {

		final String SQL = 
				"DELETE FROM import_and_pipeline_run_tracking_single_file_tbl WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, id );
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "delete_For_Id( int id ).  id: " + id
					+ ", SQL: " + SQL;
			log.error( msg, e );
			throw e;
		}
	}
}
