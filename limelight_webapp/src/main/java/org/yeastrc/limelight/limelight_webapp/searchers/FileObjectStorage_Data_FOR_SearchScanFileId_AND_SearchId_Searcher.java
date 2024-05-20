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
package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * File Object Storage File details for single file
 * 
 * table file_object_storage_main_entry_tbl and scan_file_tbl and search_scan_file_tbl
 *
 */
@Component
public class FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher extends Limelight_JDBC_Base implements FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher.class );
	
	private static final String MAIN_QUERY_SQL = 
			" SELECT file_object_storage_main_entry_tbl.file_object_storage_api_key, search_scan_file_tbl.filename "
			+ " FROM "
			+ " search_scan_file_tbl "
			+ " INNER JOIN scan_file_tbl ON search_scan_file_tbl.scan_file_id = scan_file_tbl.id "
			+ " INNER JOIN file_object_storage_main_entry_tbl ON scan_file_tbl.file_object_storage_main_entry_id_fk = file_object_storage_main_entry_tbl.id "
			+ " WHERE search_scan_file_tbl.id = ? AND search_scan_file_tbl.search_id = ? ";
	
	/**
	 * 
	 *
	 */
	public class FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher_Return_Item {

		private String file_object_storage_api_key;
		private String filename_at_import;
		
		public String getFile_object_storage_api_key() {
			return file_object_storage_api_key;
		}
		public String getFilename_at_import() {
			return filename_at_import;
		}
	}
	
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher_IF#getFileObjectStorage_Data_FOR_SearchScanFile_Id_AND_SearchId(int, int)
	 */
	@Override
	public List<FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher_Return_Item> 
	
	getFileObjectStorage_Data_FOR_SearchScanFile_Id_AND_SearchId( 
			
			int searchScanFile_Id, int searchId ) throws SQLException {

		List<FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher_Return_Item> results = new ArrayList<>();

		String querySQL = MAIN_QUERY_SQL;
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			counter++;
			preparedStatement.setInt( counter, searchScanFile_Id );
			counter++;
			preparedStatement.setInt( counter, searchId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher_Return_Item result = new FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher_Return_Item();
					result.file_object_storage_api_key = rs.getString( "file_object_storage_api_key" );
					result.filename_at_import = rs.getString( "filename" );

					results.add(result);
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return results;
	}
	
}
