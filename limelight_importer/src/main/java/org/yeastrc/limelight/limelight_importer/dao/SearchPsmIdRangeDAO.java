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
import org.yeastrc.limelight.limelight_shared.dto.SearchPsmIdRangeDTO;

/**
 * search_psm_id_range_tbl table
 * 
 * PSM Id range in psm_tbl. Only populated if PSM Ids for search are sequential, which is always the case for new search imports.
 */
public class SearchPsmIdRangeDAO {
	
	private static final Logger log = LoggerFactory.getLogger( SearchPsmIdRangeDAO.class );

	private SearchPsmIdRangeDAO() { }
	public static SearchPsmIdRangeDAO getInstance() { return new SearchPsmIdRangeDAO(); }
	

	/**
	 * @param item
	 * @throws Exception
	 */
	public void save( SearchPsmIdRangeDTO item ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			
			//  Insert into main table
			save( item, dbConnection );
		}
	}

	
	private final String INSERT_SQL = 
			"INSERT INTO search_psm_id_range_tbl ( search_id, psm_id_range_start, psm_id_range_end ) "
			+ "VALUES ( ?, ?, ? )";
	
	/**
	 * @param item
	 * @param conn
	 * @throws Exception
	 */
	public void save( SearchPsmIdRangeDTO item, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

			int counter = 0;

			counter++;
			pstmt.setInt( counter, item.getSearchId() );
			counter++;
			pstmt.setLong( counter, item.getPsmIdRange_Start() );
			counter++;
			pstmt.setLong( counter, item.getPsmIdRange_End() );
			
			pstmt.executeUpdate();

		} catch ( Exception e ) {
			String msg = "ERROR save(...) item: " + item;
			log.error( msg, e );
			throw e;
		}
		
	}
	
	

	
}

