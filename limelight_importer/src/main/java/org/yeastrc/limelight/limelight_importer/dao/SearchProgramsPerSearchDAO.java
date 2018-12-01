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
import java.sql.Statement;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_shared.dto.SearchProgramsPerSearchDTO;

/**
 * search_programs_per_search_tbl table
 */
public class SearchProgramsPerSearchDAO {
	
	private static final Logger log = LoggerFactory.getLogger( SearchProgramsPerSearchDAO.class );

	private SearchProgramsPerSearchDAO() { }
	public static SearchProgramsPerSearchDAO getInstance() { return new SearchProgramsPerSearchDAO(); }
	

	/**
	 * @param item
	 * @throws Exception
	 */
	public void save( SearchProgramsPerSearchDTO item ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			save( item, dbConnection );

		} catch ( Exception e ) {
			String msg = "ERROR save(...) item: " + item;
			log.error( msg, e );
			throw e;
		}
	}
	
	
	private final String INSERT_SQL = 
			"INSERT INTO search_programs_per_search_tbl ( search_id, name, display_name, version, description ) "
			+ "VALUES ( ?, ?, ?, ?, ? )";
	
	/**
	 * @param item
	 * @param conn
	 * @throws Exception
	 */
	public void save( SearchProgramsPerSearchDTO item, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {

			int counter = 0;
			
			counter++;
			pstmt.setInt( counter, item.getSearchId() );
			counter++;
			pstmt.setString( counter, item.getName() );
			counter++;
			pstmt.setString( counter, item.getDisplayName() );
			counter++;
			pstmt.setString( counter, item.getVersion() );
			counter++;
			pstmt.setString( counter, item.getDescription() );
			
			pstmt.executeUpdate();
			
			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					item.setId( rs.getInt( 1 ) );
				} else
					throw new LimelightImporterDatabaseException( "Failed to insert item" );
			}
		} catch ( Exception e ) {
			String msg = "ERROR save(...) item: " + item;
			log.error( msg, e );
			throw e;
		}
		
	}
	
	

	
}
