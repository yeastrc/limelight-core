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
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataSingleFileInitJSONBlob_DTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table file_import_tracking_single_file_init_json_blob_tbl
 *
 */
@Component
public class FileImportTrackingDataSingleFileInitJSONBlob_DAO extends Limelight_JDBC_Base implements FileImportTrackingDataSingleFileInitJSONBlob_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( FileImportTrackingDataSingleFileInitJSONBlob_DAO.class );
	
	/**
	 * @param fileImportTrackingSingleFileId
	 * @return 
	 * @throws Exception
	 */
	
	@Override
	public FileImportTrackingDataSingleFileInitJSONBlob_DTO getFor_FileImportTrackingSingleFileId( int fileImportTrackingSingleFileId ) throws Exception {
		
		FileImportTrackingDataSingleFileInitJSONBlob_DTO result = null;
		
		final String sql = "SELECT * FROM file_import_tracking_single_file_init_json_blob_tbl WHERE file_import_tracking_single_file_id = ?";

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			preparedStatement.setInt( 1, fileImportTrackingSingleFileId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = populateResultObject( rs );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select FileImportTrackingDataSingleFileInitJSONBlob_DTO, fileImportTrackingSingleFileId: " + fileImportTrackingSingleFileId + ", sql: " + sql;
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
	
	private FileImportTrackingDataSingleFileInitJSONBlob_DTO populateResultObject( ResultSet rs ) throws SQLException {
		FileImportTrackingDataSingleFileInitJSONBlob_DTO returnItem = new FileImportTrackingDataSingleFileInitJSONBlob_DTO();
		returnItem.setFileImportTrackingSingleFileId( rs.getInt( "file_import_tracking_single_file_id" ) );
		returnItem.setJsonContents_FormatVersion( rs.getInt( "json_contents_format_version" ) );
		returnItem.setJsonContents( rs.getString( "json_contents" ) );
		
		return returnItem;
	}
	
	/////////

	private static final String INSERT_SQL = "INSERT INTO file_import_tracking_single_file_init_json_blob_tbl "
			+ "( file_import_tracking_single_file_id, json_contents_format_version, json_contents )"
			+ " VALUES ( ?, ?, ? )";
	
	//  Spring DB Transactions
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( FileImportTrackingDataSingleFileInitJSONBlob_DTO item ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getFileImportTrackingSingleFileId() );
							counter++;
							pstmt.setInt( counter, item.getJsonContents_FormatVersion() );
							counter++;
							pstmt.setString( counter, item.getJsonContents() );
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
