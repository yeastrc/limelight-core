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
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.Search_ReportedPeptide_OpenMod_PsmUniquePositions_DTO;
import org.slf4j.Logger;

/**
 * table srch_rep_pept__open_mod_psm_unique_positions__lookup_tbl
 *
 * Does NOT use Bulk insert connection
 */
public class DB_Insert_Search_ReportedPeptide_OpenMod_PsmUniquePositions_DAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_Search_ReportedPeptide_OpenMod_PsmUniquePositions_DAO.class );

	private DB_Insert_Search_ReportedPeptide_OpenMod_PsmUniquePositions_DAO() { }
	public static DB_Insert_Search_ReportedPeptide_OpenMod_PsmUniquePositions_DAO getInstance() { return new DB_Insert_Search_ReportedPeptide_OpenMod_PsmUniquePositions_DAO(); }

	private static final String SQL =
			"INSERT IGNORE INTO srch_rep_pept__open_mod_psm_unique_positions__lookup_tbl ( "
					+ " search_id, reported_peptide_id, "
					+ " position_unique, is_n_terminal, is_c_terminal, "
					+ " peptide_residue_letter, protein_residue_letter_if_all_same "
					+ " ) " 
					+ " VALUES ( ?, ?, ?, ?, ?, ?, ? ) ";

	/**
	 * insert srch_rep_pept__open_mod_psm_unique_positions__lookup_tbl
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( Search_ReportedPeptide_OpenMod_PsmUniquePositions_DTO item ) throws Exception {

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			try ( PreparedStatement pstmt = dbConnection.prepareStatement( SQL ) ) {

				int counter = 0;

				counter++;
				pstmt.setInt( counter, item.getSearchId() );
				counter++;
				pstmt.setInt( counter, item.getReportedPeptideId() );

				counter++;
				pstmt.setInt( counter,  item.getPositionUnique() );

				counter++;
				if ( item.isIs_N_Terminal() ) {
					pstmt.setInt( counter,  Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
				} else {
					pstmt.setInt( counter,  Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}
				counter++;
				if ( item.isIs_C_Terminal() ) {
					pstmt.setInt( counter,  Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
				} else {
					pstmt.setInt( counter,  Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}
				
				counter++;
				pstmt.setString( counter, item.getPeptideResidueLetter() );
				counter++;
				pstmt.setString( counter, item.getProteinResidueLetterIfAllSame() );
				
				pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...), sql: " + SQL + "\nData to save: " + item, e );
			throw e;
		}


	}

}
