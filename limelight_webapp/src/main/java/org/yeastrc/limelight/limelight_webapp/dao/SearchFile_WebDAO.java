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
package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.SearchFileDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table search_file_tbl
 *
 */
@Component
public class SearchFile_WebDAO extends Limelight_JDBC_Base implements SearchFile_WebDAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( SearchFile_WebDAO.class );

	private static final String getSearchFileDTOForIdSQL =
			"SELECT id, search_id, display_filename, filename, path, filesize, mime_type, description, upload_date "
					+ " FROM search_file_tbl  WHERE id = ?";

	@Override
	public SearchFileDTO getSearchFileDTOForId( int id ) throws SQLException {

		SearchFileDTO  result = null;

		final String querySQL = getSearchFileDTOForIdSQL;
		
		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {

			preparedStatement.setInt( 1, id );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = getFromResultSet( rs );
				}
			}
		} catch ( SQLException e ) {
			log.error( "ERROR: sql: " + querySQL, e );
			throw e;
		}
		return result;
	}

	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	private SearchFileDTO getFromResultSet( ResultSet rs ) throws SQLException {

		SearchFileDTO item = new SearchFileDTO();
		item.setId( rs.getInt( "id" ) );
		item.setSearchId( rs.getInt( "search_id" ) );
		item.setDisplayFilename( rs.getString( "display_filename" ) );
		item.setFilename( rs.getString( "filename" ) );
		item.setPath( rs.getString( "path" ) );
		item.setFileSize( rs.getLong( "filesize" ) );
		item.setMimeType( rs.getString( "mime_type" ) );
		item.setDescription( rs.getString( "description" ) );
		item.setUploadDate( rs.getDate( "upload_date" ) );

		return item;
	}

	/**
	 * Get the file_contents for the id
	 * @param id
	 * @return null if record not found for id
	 * @throws Exception
	 */
	@Override
	public byte[] getDataFileData( int id ) throws Exception {
		
		byte[] datafiledata = null;

		final String querySQL = "SELECT file_contents FROM search_file_tbl WHERE id = ?";

		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {

			preparedStatement.setInt( 1, id );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					datafiledata = rs.getBytes( "file_contents" );
				}
			}			
		} catch ( Exception e ) {
			
			String msg = "ERROR: querySQL(id). id: " + id + ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		return datafiledata;
	}
	
}
