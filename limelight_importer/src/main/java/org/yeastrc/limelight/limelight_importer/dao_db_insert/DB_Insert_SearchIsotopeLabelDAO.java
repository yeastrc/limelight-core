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

import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.slf4j.Logger;

/**
 * table search__isotope_label_lookup_tbl
 *
 * Does NOT use Bulk insert connection
 */
public class DB_Insert_SearchIsotopeLabelDAO {
	
	private static final Logger log = LoggerFactory.getLogger( DB_Insert_SearchIsotopeLabelDAO.class );

	private DB_Insert_SearchIsotopeLabelDAO() { }
	public static DB_Insert_SearchIsotopeLabelDAO getInstance() { return new DB_Insert_SearchIsotopeLabelDAO(); }
	
	//  'INSERT IGNORE' silently fails to insert a record when a foreign key constraint fails
	
	private static final String SQL =
			"INSERT INTO search__isotope_label_lookup_tbl ( search_id, isotope_label_id) " 
			 + " VALUES (?, ?) ";
	

	/**
	 * insert search__isotope_label_lookup_tbl
	 * @param searchId
	 * @param isotopeLabelId
	 * @throws Exception
	 */
	public void saveSearchIsotopeLabelId( int searchId, int isotopeLabelId ) throws Exception {
				
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			try ( PreparedStatement pstmt = dbConnection.prepareStatement( SQL ) ) {

					pstmt.setInt( 1, searchId );
					pstmt.setInt( 2, isotopeLabelId );

					pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "ERROR: saveSearchIsotopeLabelId(...), sql: " + SQL, e );
			throw e;
		}
		
		
	}

}
