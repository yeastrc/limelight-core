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
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.SrchRepPept_IsotopeLabel_DTO;

/**
 * table srch_rep_pept__isotope_label_tbl
 *
 */
public class DB_Insert_SrchRepPept_IsotopeLabel_DAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_SrchRepPept_IsotopeLabel_DAO.class );

	private DB_Insert_SrchRepPept_IsotopeLabel_DAO() { }
	public static DB_Insert_SrchRepPept_IsotopeLabel_DAO getInstance() { return new DB_Insert_SrchRepPept_IsotopeLabel_DAO(); }

	/**
	 * This will INSERT the given SrchRepPept_IsotopeLabel_DTO into the database.
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( SrchRepPept_IsotopeLabel_DTO item ) throws Exception {

		try {
			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getInsertControlCommitConnection();
			
			saveToDatabase( item, dbConnection );

		} finally {
		}
	}

	private final static String INSERT_SQL = 
			"INSERT INTO srch_rep_pept__isotope_label_tbl "
			
			+ "(search_id, reported_peptide_id, "
			+ 	" isotope_label_id ) "
			
			+ "VALUES (?, ?, ?)";
	
	/**
	 * This will INSERT the given SrchRepPept_IsotopeLabel_DTO into the database
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( SrchRepPept_IsotopeLabel_DTO item, Connection dbConnection ) throws Exception {

		if ( item == null ) {
			String msg = "item to save cannot be null";
			log.error( msg );
			throw new IllegalArgumentException(msg);
		}
		
		final String sql = INSERT_SQL;
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			
			int counter = 0;
			
			counter++;
			pstmt.setInt( counter, item.getSearchId() );
			counter++;
			pstmt.setInt( counter, item.getReportedPeptideId() );
			counter++;
			pstmt.setInt( counter, item.getIsotopeLabelId() );

			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			log.error( "ERROR: sql: " + sql + "\nData to save: " + item, e );
			throw e;
		} 
	}
	
}
