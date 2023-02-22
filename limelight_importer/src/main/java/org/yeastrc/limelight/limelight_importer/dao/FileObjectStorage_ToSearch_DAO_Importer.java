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
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.FileObjectStorage_ToSearch_DTO;

/**
 * table file_object_storage_to_search_tbl
 *
 */
public class FileObjectStorage_ToSearch_DAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( FileObjectStorage_ToSearch_DAO_Importer.class );
	
	private FileObjectStorage_ToSearch_DAO_Importer() { }
	public static FileObjectStorage_ToSearch_DAO_Importer getInstance() { return new FileObjectStorage_ToSearch_DAO_Importer(); }
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( FileObjectStorage_ToSearch_DTO item ) throws Exception {

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			saveToDatabase( item, dbConnection );
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase( item ) item: " + item, e );
			throw e;
		}
	}

	private final static String INSERT_SQL = 
			
			"INSERT INTO file_object_storage_to_search_tbl "
			+ "( file_object_storage_main_entry_id_fk, search_id, filename_at_import ) "

			+ "VALUES (?, ?, ?)";
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( FileObjectStorage_ToSearch_DTO item, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			int counter = 0;
			counter++;
			pstmt.setInt( counter, item.getFileObjectStorage_MainEntry_Id() );
			counter++;
			pstmt.setInt( counter, item.getSearchId() );
			counter++;
			pstmt.setString( counter, item.getFilename_AtImport() );

			pstmt.executeUpdate();

		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) item: " + item + ", sql: " + sql, e );
			throw e;
		}
	}
	
}
