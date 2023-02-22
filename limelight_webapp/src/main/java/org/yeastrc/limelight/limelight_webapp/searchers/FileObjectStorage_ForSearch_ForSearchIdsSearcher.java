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
 * File Object Storage Files for Search Details (When Expand a Search)
 * 
 * table file_object_storage_to_search_tbl
 *
 */
@Component
public class FileObjectStorage_ForSearch_ForSearchIdsSearcher extends Limelight_JDBC_Base implements FileObjectStorage_ForSearch_ForSearchIdsSearcher_IF {

	private static final Logger log = LoggerFactory.getLogger( FileObjectStorage_ForSearch_ForSearchIdsSearcher.class );
	
	private static final String MAIN_QUERY_SQL = 
			" SELECT "
			+ " file_object_storage_to_search_tbl.id, file_object_storage_to_search_tbl.search_id, "
			+ " file_object_storage_to_search_tbl.filename_at_import,"
			+ " file_object_storage_main_entry_tbl.file_type_id "
			
			+ " FROM "
			+ " file_object_storage_to_search_tbl"
			+ " INNER JOIN file_object_storage_main_entry_tbl"
			+    " ON file_object_storage_to_search_tbl.file_object_storage_main_entry_id_fk = file_object_storage_main_entry_tbl.id "
	
			+ " WHERE file_object_storage_to_search_tbl.search_id IN ( ";
	
	/**
	 * 
	 *
	 */
	public static class FileObjectStorage_ForSearch_ForSearchIdsSearcher_RequestParams {
		
		List<Integer> searchIds;
		List<Integer> fileTypeIds_Include;
		List<Integer> fileTypeIds_Exclude;
		
		public void setSearchIds(List<Integer> searchIds) {
			this.searchIds = searchIds;
		}
		public void setFileTypeIds_Include(List<Integer> fileTypeIds_Include) {
			this.fileTypeIds_Include = fileTypeIds_Include;
		}
		public void setFileTypeIds_Exclude(List<Integer> fileTypeIds_Exclude) {
			this.fileTypeIds_Exclude = fileTypeIds_Exclude;
		}
		
	}
	
	/**
	 * 
	 *
	 */
	public class FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item {
		
		private int id;
		private int searchId;
		private String filename_at_import;
		private int file_type_id;
		
		public int getId() {
			return id;
		}
		public int getSearchId() {
			return searchId;
		}
		public String getFilename_at_import() {
			return filename_at_import;
		}
		public int getFile_type_id() {
			return file_type_id;
		}
	}
	
	/**
	 * @param searchIds
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item>  getFileObjectStorage_ForSearch_ForSearchIds(
			
			FileObjectStorage_ForSearch_ForSearchIdsSearcher_RequestParams requestParams ) throws SQLException {

		if ( requestParams == null ) {
			throw new IllegalArgumentException( "requestParams is null" );
		}
		
		if ( requestParams.searchIds == null || requestParams.searchIds.isEmpty() ) {
			throw new IllegalArgumentException( "requestParams.searchIds is null or empty" );
		}
		
		List<FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item> results = new ArrayList<>();


		StringBuilder querySQL_SB = new StringBuilder( 100000 );
		querySQL_SB.append( MAIN_QUERY_SQL );
		
		for ( int count = 0; count < requestParams.searchIds.size(); count++ ) {
			if ( count != 0 ) {
				querySQL_SB.append( ", " );
			}
			querySQL_SB.append( "? " );
		}
		querySQL_SB.append( " )" );
		
		if ( requestParams.fileTypeIds_Include != null && ( ! requestParams.fileTypeIds_Include.isEmpty() ) ) {
			
			querySQL_SB.append( " AND file_object_storage_main_entry_tbl.file_type_id IN ( " );
			
			for ( int count = 0; count < requestParams.fileTypeIds_Include.size(); count++ ) {
				if ( count != 0 ) {
					querySQL_SB.append( ", " );
				}
				querySQL_SB.append( "? " );
			}
			querySQL_SB.append( " )" );
		}
		
		if ( requestParams.fileTypeIds_Exclude != null && ( ! requestParams.fileTypeIds_Exclude.isEmpty() ) ) {
			
			querySQL_SB.append( " AND file_object_storage_main_entry_tbl.file_type_id NOT IN ( " );
			
			for ( int count = 0; count < requestParams.fileTypeIds_Exclude.size(); count++ ) {
				if ( count != 0 ) {
					querySQL_SB.append( ", " );
				}
				querySQL_SB.append( "? " );
			}
			querySQL_SB.append( " )" );
		}
		
		
		String querySQL = querySQL_SB.toString();
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			for ( Integer searchId : requestParams.searchIds ) {
				counter++;
				preparedStatement.setInt( counter, searchId );
			}

			if ( requestParams.fileTypeIds_Include != null && ( ! requestParams.fileTypeIds_Include.isEmpty() ) ) {
				for ( Integer fileTypeId : requestParams.fileTypeIds_Include ) {
					counter++;
					preparedStatement.setInt( counter, fileTypeId );
				}
			}

			if ( requestParams.fileTypeIds_Exclude != null && ( ! requestParams.fileTypeIds_Exclude.isEmpty() ) ) {
				for ( Integer fileTypeId : requestParams.fileTypeIds_Exclude ) {
					counter++;
					preparedStatement.setInt( counter, fileTypeId );
				}
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item result = new FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item();
					result.id = rs.getInt( "id" );
					result.searchId = rs.getInt( "search_id" );
					result.filename_at_import = rs.getString( "filename_at_import" );
					result.file_type_id = rs.getInt( "file_type_id" );

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
