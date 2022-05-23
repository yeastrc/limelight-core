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
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideDTO;

/**
 * 
 * 
 * table search_reported_peptide_tbl
 *
 */
public class DB_Insert_SearchReportedPeptideDAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_SearchReportedPeptideDAO.class );

	private DB_Insert_SearchReportedPeptideDAO() { }
	public static DB_Insert_SearchReportedPeptideDAO getInstance() { return new DB_Insert_SearchReportedPeptideDAO(); }

	private static final String sql = 
			"INSERT INTO search_reported_peptide_tbl "
			+ " ( search_id, reported_peptide_id, peptide_id, any_psm_has_dynamic_modifications, any_psm_has_reporter_ions ) "
			+ " VALUES ( ?, ?, ?, ?, ? )";

	/**
	 *	insert duplicates are ignored
	 *
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabaseIgnoreDuplicates( SearchReportedPeptideDTO item ) throws Exception {

		try {
			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getInsertControlCommitConnection();

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				int counter = 0;
				counter++;
				pstmt.setInt( counter, item.getSearchId() );
				counter++;
				pstmt.setInt( counter, item.getReportedPeptideId() );
				counter++;
				pstmt.setInt( counter, item.getPeptideId() );
				counter++;
				if ( item.isAnyPsmHasDynamicModifications() ) {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
				} else {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}
				counter++;
				if ( item.isAnyPsmHasReporterIons() ) {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
				} else {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}
				pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			String msg = "Failed to insert SearchReportedPeptideDTO: " + item + ".  SQL: " + sql + "\nData to save: " + item;
			log.error( msg );
			throw e;
		}
	}

}
