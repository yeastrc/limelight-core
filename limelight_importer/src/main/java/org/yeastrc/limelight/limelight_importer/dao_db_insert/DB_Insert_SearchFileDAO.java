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
import org.yeastrc.limelight.limelight_shared.dto.SearchFileDTO;

/**
 * table search_file_tbl
 *
 */
public class DB_Insert_SearchFileDAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_SearchFileDAO.class );

	private DB_Insert_SearchFileDAO() { }
	public static DB_Insert_SearchFileDAO getInstance() { return new DB_Insert_SearchFileDAO(); }


	/**
	 * @param item
	 * @return
	 * @throws Throwable
	 */
	public void saveToDatabase(SearchFileDTO item ) throws Exception {

		try {
			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getInsertControlCommitConnection();
			
			saveToDatabase( item, dbConnection );
			
		} finally {
		}
	}
	
	private static final String INSERT_SQL =

			"INSERT INTO search_file_tbl ( search_id, search_programs_per_search_id, filename, path, filesize, mime_type, description, upload_date ) "
					+ "VALUES ( ?, ?, ?, ?, ?, ?, ?, NOW() )";
			
	/**
	 * @param item
	 * @param conn
	 * @throws Exception
	 */
	public void saveToDatabase( SearchFileDTO item, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
			
			int counter = 0;

			counter++;
			pstmt.setInt( counter, item.getSearchId() );
			counter++;
			pstmt.setInt( counter, item.getSearchProgramsPerSearchId() );
			counter++;
			pstmt.setString( counter, item.getFilename() );
			counter++;
			pstmt.setString( counter, item.getPath() );
			counter++;
			pstmt.setLong( counter, item.getFileSize() );
			counter++;
			pstmt.setString( counter, item.getMimeType() );
			counter++;
			pstmt.setString( counter, item.getDescription() );

			pstmt.executeUpdate();
			
			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					item.setId( rs.getInt( 1 ) );
				} else
					throw new LimelightImporterDatabaseException( "Failed to insert search_file..." );
			}
			
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) sql: " + sql + "\nData to save: " + item, e );
			throw e;
		}
	}

	/**
	 * Save the fileContents to the record in file_and_contents with the provided id
	 * @param id
	 * @param data
	 * @throws Throwable
	 */
	public void saveData( int id, byte[] fileContents ) throws Exception {

		try {
			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getInsertControlCommitConnection();
			
			saveData( id, fileContents, dbConnection );
			
		} catch ( Exception e ) {
			log.error( "ERROR: saveData(...) ", e );
			throw e;

		} finally {
		}
	}

	/**
	 * Save the fileContents to the record in file_and_contents with the provided id
	 * @param id
	 * @param data
	 * @throws Exception
	 */
	public void saveData( int id, byte[] fileContents, Connection dbConnection ) throws Exception {

		String sql = "UPDATE search_file_tbl SET file_contents = ? WHERE id = ?";

		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			
			int counter = 0;

			counter++;
			pstmt.setBytes( counter, fileContents );
			counter++;
			pstmt.setInt( counter, id );

			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			log.error( "ERROR: saveData(...) sql: " + sql, e );
			throw e;
		}
	}
}
