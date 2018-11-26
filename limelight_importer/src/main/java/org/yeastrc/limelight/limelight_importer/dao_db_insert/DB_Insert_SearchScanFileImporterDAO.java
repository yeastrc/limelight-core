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
package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileImporterDTO;

/**
 * table search_scan_file_importer_tbl table
 *
 */
public class DB_Insert_SearchScanFileImporterDAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_SearchScanFileImporterDAO.class );

	private DB_Insert_SearchScanFileImporterDAO() { }
	public static DB_Insert_SearchScanFileImporterDAO getInstance() { return new DB_Insert_SearchScanFileImporterDAO(); }


	/**
	 * @param item
	 * @return
	 * @throws Throwable
	 */
	public void saveToDatabase(SearchScanFileImporterDTO item ) throws Exception {

		try {
			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getInsertControlCommitConnection();
			
			saveToDatabase( item, dbConnection );
			
		} finally {
		}
	}
	
	private static final String INSERT_SQL =

			"INSERT INTO search_scan_file_importer_tbl "
			+ "( search_scan_file_id, file_size, sha1sum, "
			+   " canonical_filename_w_path_on_submit_machine, absolute_filename_w_path_on_submit_machine, "
			+   " aws_s3_bucket_name, aws_s3_object_key, "
			+   " spectral_storage_process_key ) "
					+ "VALUES ( ?, ?, ?, ?, ?, ?, ?, ? )";
	
	/**
	 * @param item
	 * @param conn
	 * @throws Exception
	 */
	public void saveToDatabase( SearchScanFileImporterDTO item, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
			
			int counter = 0;

			counter++;
			pstmt.setInt( counter, item.getSearchScanFileId() );
			counter++;
			pstmt.setLong( counter, item.getFileSize() );
			counter++;
			pstmt.setString( counter, item.getSha1sum() );
			counter++;
			pstmt.setString( counter, item.getCanonicalFilename_W_Path_OnSubmitMachine() );
			counter++;
			pstmt.setString( counter, item.getAbsoluteFilename_W_Path_OnSubmitMachine());
			counter++;
			pstmt.setString( counter, item.getAwsBucketName() );
			counter++;
			pstmt.setString( counter, item.getAwsObjectKey() );
			counter++;
			pstmt.setString( counter, item.getSpectralStorageProcessKey() );

			pstmt.executeUpdate();
			
			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					item.setId( rs.getInt( 1 ) );
				} else
					throw new LimelightImporterDatabaseException( "Failed to insert search_scan_file_importer_tbl table..." );
			}
			
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) sql: " + sql, e );
			throw e;
		}
	}

}
