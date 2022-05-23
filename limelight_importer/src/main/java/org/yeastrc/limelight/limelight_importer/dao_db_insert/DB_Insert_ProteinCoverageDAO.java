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
import java.sql.ResultSet;
import java.sql.Statement;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.ProteinCoverageDTO;


/**
 * table protein_coverage_tbl
 *
 */
public class DB_Insert_ProteinCoverageDAO {


	private static final Logger log = LoggerFactory.getLogger( DB_Insert_ProteinCoverageDAO.class );

	private DB_Insert_ProteinCoverageDAO() { }
	public static DB_Insert_ProteinCoverageDAO getInstance() { return new DB_Insert_ProteinCoverageDAO(); }


	private static final String INSERT_SQL = "INSERT INTO protein_coverage_tbl "

			+ " ( search_id, reported_peptide_id, peptide_id_info_only, "
			+   " protein_sequence_version_id, protein_start_position, protein_end_position,"
			+   " peptide_protein_match_not_exact_match, protein_is_decoy, protein_is_independent_decoy )"

			+ " VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? )";
	
	/**
	 * Save the associated data to the database
	 * @param item
	 * @throws Exception
	 */
	public void save( ProteinCoverageDTO item ) throws Exception {
				
		final String sql = INSERT_SQL;
		try {
			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getInsertControlCommitConnection();

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {

				int counter = 0;

				counter++;
				pstmt.setInt( counter,  item.getSearchId() );
				counter++;
				pstmt.setInt( counter,  item.getReportedPeptideId());
				counter++;
				pstmt.setInt( counter,  item.getPeptideIdInfoOnly() );

				counter++;
				pstmt.setInt( counter,  item.getProteinSequenceVersionId() );

				counter++;
				pstmt.setInt( counter,  item.getProteinStartPosition() );
				counter++;
				pstmt.setInt( counter,  item.getProteinEndPosition() );
				
				counter++;
				if ( item.isPeptideProteinMatchNotExactMatch() ) {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
				} else {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}

				counter++;
				if ( item.isProtein_IsDecoy() ) {
					pstmt.setInt( counter,  Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );	
				} else {
					pstmt.setInt( counter,  Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}
				counter++;
				if ( item.isProtein_IsIndependentDecoy() ) {
					pstmt.setInt( counter,  Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );	
				} else {
					pstmt.setInt( counter,  Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}

				pstmt.executeUpdate();

				try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
			
					if( rs.next() ) {
						item.setId( rs.getInt( 1 ) );
					}
				}
			}
			
		} catch ( Exception e ) {
			log.error( "ERROR: sql: " + sql + "\nData to save: " + item, e );
			throw e;
		} finally {
			
		}
		
	}
}
