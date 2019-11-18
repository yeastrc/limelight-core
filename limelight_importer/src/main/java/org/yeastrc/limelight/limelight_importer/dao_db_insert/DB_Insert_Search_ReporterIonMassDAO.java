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

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;

import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.slf4j.Logger;

/**
 * table search__reporter_ion_mass_lookup_tbl
 *
 * Does NOT use Bulk insert connection
 */
public class DB_Insert_Search_ReporterIonMassDAO {
	
	private static final Logger log = LoggerFactory.getLogger( DB_Insert_Search_ReporterIonMassDAO.class );

	private DB_Insert_Search_ReporterIonMassDAO() { }
	public static DB_Insert_Search_ReporterIonMassDAO getInstance() { return new DB_Insert_Search_ReporterIonMassDAO(); }
	
	private static final String SQL =
			"INSERT IGNORE INTO search__reporter_ion_mass_lookup_tbl ( search_id, reporter_ion_mass ) " 
			 + " VALUES (?, ?) ";
	
	/**
	 * insert search__reporter_ion_mass_lookup_tbl
	 * @param searchId
	 * @param reporterIonMass
	 * @throws Exception
	 */
	public void saveSearch_ReporterIonMass( int searchId, BigDecimal reporterIonMass ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			try ( PreparedStatement pstmt = dbConnection.prepareStatement( SQL ) ) {

					pstmt.setInt( 1, searchId );
					pstmt.setBigDecimal( 2, reporterIonMass );

					pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "ERROR: saveSearch_ReporterIonMass(...), sql: " + SQL, e );
			throw e;
		}
		
		
	}

}
