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
import org.yeastrc.limelight.limelight_shared.dto.SearchSubGroupDTO;

/**
 * search_sub_group_tbl table
 */
public class SearchSubGroupDAO {
	
	private static final Logger log = LoggerFactory.getLogger( SearchSubGroupDAO.class );

	private SearchSubGroupDAO() { }
	public static SearchSubGroupDAO getInstance() { return new SearchSubGroupDAO(); }
	

	/**
	 * @param item
	 * @throws Exception
	 */
	public void save( SearchSubGroupDTO item ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			
			//  Insert into main table
			save( item, dbConnection );
		}
	}

	
	private final String INSERT_SQL = 
			"INSERT INTO search_sub_group_tbl ( search_id, search_sub_group_id, subgroup_name_from_import_file ) "
			+ "VALUES ( ?, ?, ? )";
	
	/**
	 * @param item
	 * @param conn
	 * @throws Exception
	 */
	public void save( SearchSubGroupDTO item, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

			int counter = 0;

			counter++;
			pstmt.setInt( counter, item.getSearchId() );
			counter++;
			pstmt.setInt( counter, item.getSearchSubGroupId() );
			counter++;
			pstmt.setString( counter, item.getSubgroupName_fromImportFile() );
			
			pstmt.executeUpdate();

		} catch ( Exception e ) {
			String msg = "ERROR save(...) item: " + item;
			log.error( msg, e );
			throw e;
		}
		
	}
	
	

	
}

