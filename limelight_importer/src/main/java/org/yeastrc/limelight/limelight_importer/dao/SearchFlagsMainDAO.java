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
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.SearchFlagsMainDTO;

/**
 * search__flags_main_tbl table
 */
public class SearchFlagsMainDAO {
	
	private static final Logger log = LoggerFactory.getLogger( SearchFlagsMainDAO.class );

	private SearchFlagsMainDAO() { }
	public static SearchFlagsMainDAO getInstance() { return new SearchFlagsMainDAO(); }
	

	/**
	 * @param item
	 * @throws Exception
	 */
	public void save( SearchFlagsMainDTO item ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			
			//  Insert into table
			save( item, dbConnection );
		}
	}
	
	private final String INSERT_SQL = 
			"INSERT INTO search__flags_main_tbl ( search_id, search_not_contain_proteins ) "
			+ "VALUES ( ?, ? )";
	
	/**
	 * @param item
	 * @param conn
	 * @throws Exception
	 */
	public void save( SearchFlagsMainDTO item, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

			int counter = 0;

			counter++;
			pstmt.setInt( counter, item.getSearchId() );
			counter++;
			if ( item.isSearchNotContainProteins() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}
			
			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			String msg = "ERROR save(...) item: " + item;
			log.error( msg, e );
			throw e;
		}
		
	}
}

