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
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataFromInitJSONBlob_DTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table file_import_tracking_data_from_init_json_blob_tbl
 *
 */
@Component
public class FileImportTrackingDataFromInitJSONBlob_DAO extends Limelight_JDBC_Base implements FileImportTrackingDataFromInitJSONBlob_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( FileImportTrackingDataFromInitJSONBlob_DAO.class );
	
	/**
	 * @param fileImportTrackingId
	 * @return 
	 * @throws Exception
	 */
	
	@Override
	public FileImportTrackingDataFromInitJSONBlob_DTO getFor_FileImportTrackingId( int fileImportTrackingId ) throws Exception {
		
		FileImportTrackingDataFromInitJSONBlob_DTO result = null;
		
		final String sql = "SELECT * FROM file_import_tracking_data_from_init_json_blob_tbl WHERE file_import_tracking_id = ?";

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			preparedStatement.setInt( 1, fileImportTrackingId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = populateResultObject( rs );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select FileImportTrackingDataFromInitJSONBlob_DTO, fileImportTrackingId: " + fileImportTrackingId + ", sql: " + sql;
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
	
	private FileImportTrackingDataFromInitJSONBlob_DTO populateResultObject( ResultSet rs ) throws SQLException {
		FileImportTrackingDataFromInitJSONBlob_DTO returnItem = new FileImportTrackingDataFromInitJSONBlob_DTO();
		returnItem.setFileImportTrackingId( rs.getInt( "file_import_tracking_id" ) );
		returnItem.setJsonContents_FormatVersion( rs.getInt( "json_contents_format_version" ) );
		returnItem.setJsonContents( rs.getString( "json_contents" ) );
		
		return returnItem;
	}
	
	/////////

	private static final String INSERT_SQL = "INSERT INTO file_import_tracking_data_from_init_json_blob_tbl "
			+ "( file_import_tracking_id, json_contents_format_version, json_contents )"
			+ " VALUES ( ?, ?, ? )";
	
	//  Spring DB Transactions
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( FileImportTrackingDataFromInitJSONBlob_DTO item ) {
		
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
							pstmt.setInt( counter, item.getFileImportTrackingId() );
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
