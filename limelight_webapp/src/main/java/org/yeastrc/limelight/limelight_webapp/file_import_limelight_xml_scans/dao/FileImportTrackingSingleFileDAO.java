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
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportFileType;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table file_import_tracking_single_file_tbl
 *
 */
@Component
public class FileImportTrackingSingleFileDAO extends Limelight_JDBC_Base implements FileImportTrackingSingleFileDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( FileImportTrackingSingleFileDAO.class );
	
	/**
	 * @param id
	 * @return 
	 * @throws Exception
	 */
	@Override
	public FileImportTrackingSingleFileDTO getForId( int id ) throws Exception {
		
		FileImportTrackingSingleFileDTO result = null;
		
		final String sql = "SELECT * FROM file_import_tracking_single_file_tbl WHERE id = ?";

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			preparedStatement.setInt( 1, id );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = populateResultObject( rs );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select FileImportTrackingSingleFileDTO, id: " + id + ", sql: " + sql;
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
	public List<FileImportTrackingSingleFileDTO> getForTrackingId( int trackingId ) throws Exception {
		
		List<FileImportTrackingSingleFileDTO> resultList = new ArrayList<>();
		
		final String sql = "SELECT * FROM file_import_tracking_single_file_tbl WHERE file_import_tracking_id = ?";

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			preparedStatement.setInt( 1, trackingId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					FileImportTrackingSingleFileDTO result = populateResultObject( rs );
					resultList.add(result);
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select FileImportTrackingSingleFileDTO, id: " + trackingId + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return resultList;
	}
	
	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	@Override
	public FileImportTrackingSingleFileDTO populateResultObject( ResultSet rs ) throws SQLException {
		FileImportTrackingSingleFileDTO returnItem = new FileImportTrackingSingleFileDTO();
		returnItem.setId( rs.getInt( "id" ) );
		returnItem.setFileImportTrackingId( rs.getInt( "file_import_tracking_id" ) );
		returnItem.setFileType( FileImportFileType.fromValue( rs.getInt( "file_type_id" ) ) );
		returnItem.setFilenameInUpload( rs.getString( "filename_in_upload" ) );
		returnItem.setFilenameOnDisk( rs.getString( "filename_on_disk" ) );
		returnItem.setFilenameOnDiskWithPathSubSameMachine( rs.getString( "filename_on_disk_with_path_sub_same_machine" ) );
		returnItem.setCanonicalFilename_W_Path_OnSubmitMachine( rs.getString( "canonical_filename_w_path_on_submit_machine" ) );
		returnItem.setAbsoluteFilename_W_Path_OnSubmitMachine( rs.getString( "absolute_filename_w_path_on_submit_machine" ) );
		
		return returnItem;
	}

	private static final String INSERT_SQL = "INSERT INTO file_import_tracking_single_file_tbl "
			+ "( file_import_tracking_id, file_type_id, file_upload_status_id, "
			+ " filename_in_upload, filename_on_disk, filename_on_disk_with_path_sub_same_machine, "
			+ " canonical_filename_w_path_on_submit_machine, absolute_filename_w_path_on_submit_machine, "
			+ " file_size )"
			+ " VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? )";
	
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( FileImportTrackingSingleFileDTO item ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			KeyHolder keyHolder = new GeneratedKeyHolder();
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL, Statement.RETURN_GENERATED_KEYS );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getFileImportTrackingId() );
							counter++;
							pstmt.setInt( counter, item.getFileType().value() );
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
							pstmt.setLong( counter, item.getFileSize() );
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
}
