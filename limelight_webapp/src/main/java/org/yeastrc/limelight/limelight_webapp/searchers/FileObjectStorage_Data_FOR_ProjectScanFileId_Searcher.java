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
 * table file_object_storage_main_entry_tbl and scan_file_tbl and project_scan_file_tbl
 *
 */
@Component
public class FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher extends Limelight_JDBC_Base implements FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher.class );
	
	private static final String MAIN_QUERY_SQL = 
			" SELECT file_object_storage_main_entry_tbl.file_object_storage_api_key "
			+ " FROM "
			+ " project_scan_file_tbl "
			+ " INNER JOIN scan_file_tbl ON project_scan_file_tbl.scan_file_id = scan_file_tbl.id "
			+ " INNER JOIN file_object_storage_main_entry_tbl ON scan_file_tbl.file_object_storage_main_entry_id_fk = file_object_storage_main_entry_tbl.id "
			+ " WHERE project_scan_file_tbl.id = ? ";
	
	/**
	 * 
	 *
	 */
	public class FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher_Return_Item {

		private String file_object_storage_api_key;
		
		public String getFile_object_storage_api_key() {
			return file_object_storage_api_key;
		}
	}
	
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher_IF#getFileObjectStorage_Data_FOR_ProjectScanFile_Id(int)
	 */
	@Override
	public List<FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher_Return_Item> 
	
	getFileObjectStorage_Data_FOR_ProjectScanFile_Id( 
			
			int projectScanFile_Id ) throws SQLException {

		List<FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher_Return_Item> results = new ArrayList<>();

		String querySQL = MAIN_QUERY_SQL;
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			counter++;
			preparedStatement.setInt( counter, projectScanFile_Id );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher_Return_Item result = new FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher_Return_Item();
					result.file_object_storage_api_key = rs.getString( "file_object_storage_api_key" );

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
