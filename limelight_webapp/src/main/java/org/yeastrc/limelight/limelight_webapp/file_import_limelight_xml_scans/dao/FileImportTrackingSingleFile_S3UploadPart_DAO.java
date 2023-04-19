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
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFile_S3UploadPart_DTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table file_import_tracking_single_file_s3_upload_part_tbl
 *
 */
@Component
public class FileImportTrackingSingleFile_S3UploadPart_DAO extends Limelight_JDBC_Base implements FileImportTrackingSingleFile_S3UploadPart_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( FileImportTrackingSingleFile_S3UploadPart_DAO.class );
	
	/**
	 * Get on Primary Key
	 * 
	 * @param fileImportTrackingSingleFileId
	 * @param s3_UploadPart_Number
	 * @return
	 * @throws Exception
	 */
	@Override
	public FileImportTrackingSingleFile_S3UploadPart_DTO getFor_FileImportTrackingSingleFileId_S3_UploadPart_Number( 
			
			int fileImportTrackingSingleFileId, int s3_UploadPart_Number ) throws Exception {
		
		FileImportTrackingSingleFile_S3UploadPart_DTO result = null;
		
		final String sql = "SELECT * FROM file_import_tracking_single_file_s3_upload_part_tbl "
				+ " WHERE file_import_tracking_single_file_id = ? AND s3_upload_part_number = ? ";

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			preparedStatement.setInt( 1, fileImportTrackingSingleFileId );
			preparedStatement.setInt( 2, s3_UploadPart_Number );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = populateResultObject( rs );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed getFor_FileImportTrackingSingleFileId_S3_UploadPart_Number(...), fileImportTrackingSingleFileId: "
					+ fileImportTrackingSingleFileId
					+ ", s3_UploadPart_Number: " + s3_UploadPart_Number
					+ ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return result;
	}

	/**
	 * Get all for fileImportTrackingSingleFileId
	 * 
	 * @param fileImportTrackingSingleFileId
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<FileImportTrackingSingleFile_S3UploadPart_DTO> getAllFor_FileImportTrackingSingleFileId( int fileImportTrackingSingleFileId ) throws Exception {
		
		List<FileImportTrackingSingleFile_S3UploadPart_DTO> resultList = new ArrayList<>( 400 );
		
		final String sql = "SELECT * FROM file_import_tracking_single_file_s3_upload_part_tbl WHERE file_import_tracking_single_file_id = ? ";

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			preparedStatement.setInt( 1, fileImportTrackingSingleFileId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					FileImportTrackingSingleFile_S3UploadPart_DTO result = populateResultObject( rs );
					resultList.add(result);
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed getAllFor_FileImportTrackingSingleFileId(...), fileImportTrackingSingleFileId: "
					+ fileImportTrackingSingleFileId
					+ ", sql: " + sql;

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
	
	private FileImportTrackingSingleFile_S3UploadPart_DTO populateResultObject( ResultSet rs ) throws SQLException {
		FileImportTrackingSingleFile_S3UploadPart_DTO returnItem = new FileImportTrackingSingleFile_S3UploadPart_DTO();
		returnItem.setFileImportTrackingSingleFileId( rs.getInt( "file_import_tracking_single_file_id" ) );
		returnItem.setS3_UploadPart_Number( rs.getInt( "s3_upload_part_number" ) );
		returnItem.setS3_UploadPart_StartByte_ZeroBased( rs.getLong( "s3_upload_part_start_byte_zero_based" ) );
		returnItem.setS3_UploadPart_EndByte_ZeroBased( rs.getLong( "s3_upload_part_end_byte_zero_based" ) );
		returnItem.setS3_UploadPart_Etag( rs.getString( "s3_upload_part_etag" ) );

		return returnItem;
	}
	
	/////////

	private static final String INSERT_SQL = 
			"INSERT INTO file_import_tracking_single_file_s3_upload_part_tbl "
			+ "( file_import_tracking_single_file_id, s3_upload_part_number,"
			+ " s3_upload_part_start_byte_zero_based, s3_upload_part_end_byte_zero_based,"
			+ " s3_upload_part_etag )"
			+ " VALUES ( ?, ?, ?, ?, ? )";
	
	//  Spring DB Transactions
	
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( FileImportTrackingSingleFile_S3UploadPart_DTO item ) {
		
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
							pstmt.setInt( counter, item.getFileImportTrackingSingleFileId() );
							counter++;
							pstmt.setInt( counter, item.getS3_UploadPart_Number() );
							counter++;
							pstmt.setLong( counter, item.getS3_UploadPart_StartByte_ZeroBased() );
							counter++;
							pstmt.setLong( counter, item.getS3_UploadPart_EndByte_ZeroBased() );
							counter++;
							pstmt.setString( counter, item.getS3_UploadPart_Etag() );
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "save(...): " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}
}
