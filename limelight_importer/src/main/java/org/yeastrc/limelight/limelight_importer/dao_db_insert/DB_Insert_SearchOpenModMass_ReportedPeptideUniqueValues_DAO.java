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
 * table search__open_mod_mass__psm_rounded_unique__lookup_tbl
 *
 * Does NOT use Bulk insert connection
 */
public class DB_Insert_SearchOpenModMass_ReportedPeptideUniqueValues_DAO {
	
	private static final Logger log = LoggerFactory.getLogger( DB_Insert_SearchOpenModMass_ReportedPeptideUniqueValues_DAO.class );

	private DB_Insert_SearchOpenModMass_ReportedPeptideUniqueValues_DAO() { }
	public static DB_Insert_SearchOpenModMass_ReportedPeptideUniqueValues_DAO getInstance() { return new DB_Insert_SearchOpenModMass_ReportedPeptideUniqueValues_DAO(); }
	
	private static final String SQL =
			"INSERT IGNORE INTO search__open_mod_mass__psm_rounded_unique__lookup_tbl "
			+ " ( search_id, open_mod_mass_unique_of_psm_level_rounded ) " 
			 + " VALUES (?, ?) ";
	
	/**
	 * insert search__open_mod_mass__psm_rounded_unique__lookup_tbl
	 * @param searchId
	 * @param openModMassRounded
	 * @throws Exception
	 */
	public void saveSearchOpenModMass( int searchId, int openModMassRounded ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			try ( PreparedStatement pstmt = dbConnection.prepareStatement( SQL ) ) {

					pstmt.setInt( 1, searchId );
					pstmt.setInt( 2, openModMassRounded );

					pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "ERROR: saveSearchOpenModMass(...), sql: " + SQL + "\nData to save: searchId: " + searchId + ", openModMassRounded: " + openModMassRounded, e );
			throw e;
		}
		
		
	}

}
