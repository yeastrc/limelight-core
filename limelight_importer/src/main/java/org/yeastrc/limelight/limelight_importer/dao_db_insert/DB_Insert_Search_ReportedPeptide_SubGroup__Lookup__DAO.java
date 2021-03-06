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
import org.yeastrc.limelight.limelight_shared.dto.Search_ReportedPeptide_SubGroup__Lookup__DTO;

/**
 * table search__rep_pept_sub_group_lookup_tbl
 *
 */
public class DB_Insert_Search_ReportedPeptide_SubGroup__Lookup__DAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_Search_ReportedPeptide_SubGroup__Lookup__DAO.class );
	
	private DB_Insert_Search_ReportedPeptide_SubGroup__Lookup__DAO() { }
	public static DB_Insert_Search_ReportedPeptide_SubGroup__Lookup__DAO getInstance() { return new DB_Insert_Search_ReportedPeptide_SubGroup__Lookup__DAO(); }
	

	/**
	 * @param Search_ReportedPeptide_SubGroup__Lookup__DTO
	 * @throws Exception
	 */
	public void saveToDatabase( Search_ReportedPeptide_SubGroup__Lookup__DTO item ) throws Exception {
		try {
			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getInsertControlCommitConnection();
			
			saveToDatabase( item, dbConnection );

		} finally {
		}
	}

	private static final String SAVE_SQL =
			"INSERT INTO search__rep_pept_sub_group_lookup_tbl "
			+ 	"( search_id, reported_peptide_id, search_sub_group_id, "
			+ 		" any_psm_has_dynamic_modifications, any_psm_has_open_modifictions, any_psm_has_reporter_ions, "
			+ 		" psm_num_at_default_cutoff, "
			+ 		" psm_id_sequential_start, psm_id_sequential_end ) "
			+ 	" VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? )";

	/**
	 * @param item
	 * @param conn
	 * @throws Exception
	 */
	public void saveToDatabase( Search_ReportedPeptide_SubGroup__Lookup__DTO item, Connection dbConnection ) throws Exception {
		
		final String sql = SAVE_SQL;
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			int counter = 0;
			
			counter++;
			pstmt.setInt( counter, item.getSearchId() );
			counter++;
			pstmt.setInt( counter, item.getReportedPeptideId() );
			counter++;
			pstmt.setInt( counter, item.getSearchSubGroupId() );

			counter++;
			if ( item.isAnyPsmHasDynamicModifications() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}			
			counter++;
			if ( item.isAnyPsmHasOpenModifications() ) {
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
			
			counter++;
			pstmt.setInt( counter, item.getPsmNumAtDefaultCutoff() );
			
			//  Only not zero if PSM Ids are sequential
			counter++;
			pstmt.setLong( counter, item.getPsmIdSequentialStart() );
			counter++;
			pstmt.setLong( counter, item.getPsmIdSequentialEnd() );
			
			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) item: " + item + ", sql: " + sql
					+ " :::   Item to insert: " + item, e );
			throw e;
		}
	}

}
