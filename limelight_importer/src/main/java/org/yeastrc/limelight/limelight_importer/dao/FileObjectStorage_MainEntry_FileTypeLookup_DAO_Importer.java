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
import java.sql.ResultSet;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.FileObjectStorage_MainEntry_FileTypeLookup_DTO;

/**
 * table file_object_storage_main_entry_file_type_lookup_tbl
 *
 */
public class FileObjectStorage_MainEntry_FileTypeLookup_DAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( FileObjectStorage_MainEntry_FileTypeLookup_DAO_Importer.class );
	
	private FileObjectStorage_MainEntry_FileTypeLookup_DAO_Importer() { }
	public static FileObjectStorage_MainEntry_FileTypeLookup_DAO_Importer getInstance() { return new FileObjectStorage_MainEntry_FileTypeLookup_DAO_Importer(); }
	

	/**
	 * 
	 *
	 */
	public enum SkipLogInsertException { YES, NO }

	/**
	 * Used to determine id is in DB
	 * @param id
	 * @throws Exception
	 */
	public Integer getIdForId( int id ) throws Exception {

		Integer result = null;
		
		final String sql = "SELECT id FROM file_object_storage_main_entry_file_type_lookup_tbl WHERE id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setInt( 1, id );
				pstmt.executeQuery();

				try ( ResultSet rs = pstmt.executeQuery() ) {
					if( rs.next() ) {
						result = rs.getInt( "id" );
					}
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getIdForId(...) id: " + id + ", sql: " + sql, e );
			throw e;
		}
		return result;
	}
	
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( FileObjectStorage_MainEntry_FileTypeLookup_DTO item, SkipLogInsertException skipLogInsertException ) throws Exception {

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			saveToDatabase( item, skipLogInsertException, dbConnection );
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase( item ) item: " + item, e );
			throw e;
		}
	}

	private final static String INSERT_SQL = 
			
			"INSERT INTO file_object_storage_main_entry_file_type_lookup_tbl "
			+ "( id, description ) "
					
			+ "VALUES (?, ?)";
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( FileObjectStorage_MainEntry_FileTypeLookup_DTO item, SkipLogInsertException skipLogInsertException, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			int counter = 0;
			counter++;
			pstmt.setInt( counter, item.getId() );
			counter++;
			pstmt.setString( counter, item.getDescription() );
			
			pstmt.executeUpdate();

		} catch ( Exception e ) {
			if ( skipLogInsertException == null || skipLogInsertException != SkipLogInsertException.YES ) {
				log.error( "ERROR: saveToDatabase(...) item: " + item + ", sql: " + sql, e );
			}
			throw e;
		}
	}
	
}
