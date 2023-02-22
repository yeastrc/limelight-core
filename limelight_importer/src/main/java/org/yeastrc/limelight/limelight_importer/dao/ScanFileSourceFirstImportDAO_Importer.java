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
package org.yeastrc.limelight.limelight_importer.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_shared.dto.ScanFileSourceFirstImportDTO;

/**
 * table scan_file_source_first_import_tbl
 *
 */
public class ScanFileSourceFirstImportDAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( ScanFileSourceFirstImportDAO_Importer.class );
	
	private ScanFileSourceFirstImportDAO_Importer() { }
	public static ScanFileSourceFirstImportDAO_Importer getInstance() { return new ScanFileSourceFirstImportDAO_Importer(); }
	
	/**
	 * @param item
	 * @throws Exception
	 */
//	public void saveToDatabase( ScanFileSourceFirstImportDTO item ) throws Exception {
//
//		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
//			saveToDatabase( item, dbConnection );
//		} catch ( Exception e ) {
//			log.error( "ERROR: saveToDatabase( item ) item: " + item, e );
//			throw e;
//		}
//	}

	private final static String INSERT_SQL = 
			
			"INSERT INTO scan_file_source_first_import_tbl "
			+ "( scan_file_id, search_scan_file_id, filename, file_size, sha1sum, "
			+   " canonical_filename_w_path_on_submit_machine, absolute_filename_w_path_on_submit_machine, "
			+   " aws_s3_bucket_name, aws_s3_object_key ) "

			+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( ScanFileSourceFirstImportDTO item, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			int counter = 0;
			counter++;
			pstmt.setInt( counter, item.getScanFileId() );
			counter++;
			pstmt.setInt( counter, item.getSearchScanFileId() );
			counter++;
			pstmt.setString( counter, item.getFilename() );
			counter++;
			pstmt.setLong( counter, item.getFileSize() );
			counter++;
			pstmt.setString( counter, item.getSha1sum() );
			counter++;
			pstmt.setString( counter, item.getCanonicalFilename_W_Path_OnSubmitMachine() );
			counter++;
			pstmt.setString( counter, item.getAbsoluteFilename_W_Path_OnSubmitMachine() );
			counter++;
			pstmt.setString( counter, item.getAwsBucketName() );
			counter++;
			pstmt.setString( counter, item.getAwsObjectKey() );

			pstmt.executeUpdate();

		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) item: " + item + ", sql: " + sql, e );
			throw e;
		}
	}
	
}
