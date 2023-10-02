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
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.ProteinCoveragePeptideProteinProteinResidueDifferentDTO;


/**
 * table protein_coverage_peptide_protein_residue_different_tbl
 *
 */
public class DB_Insert_ProteinCoveragePeptideProteinProteinResidueDifferentDAO {


	private static final Logger log = LoggerFactory.getLogger( DB_Insert_ProteinCoveragePeptideProteinProteinResidueDifferentDAO.class );

	private DB_Insert_ProteinCoveragePeptideProteinProteinResidueDifferentDAO() { }
	public static DB_Insert_ProteinCoveragePeptideProteinProteinResidueDifferentDAO getInstance() { return new DB_Insert_ProteinCoveragePeptideProteinProteinResidueDifferentDAO(); }


	private static final String INSERT_SQL = "INSERT INTO protein_coverage_peptide_protein_residue_different_tbl "

			+ " ( search_id, reported_peptide_id, peptide_id_info_only, protein_sequence_version_id, "
			+ " peptide_position, protein_position, peptide_residue_letter, protein_residue_letter )"

			+ " VALUES ";

	private static final String INSERT_VALUES_SINGLE_ENTRY_SQL = "( ?, ?, ?, ?, ?, ?, ?, ? )";

	private ConcurrentMap<Integer, String> insertSQL_Map_Key_StringLength = new ConcurrentHashMap<>();

	/**
	 * @param entryCount
	 * @return
	 */
	private String create_insert_SQL( int entryCount ) {
		
		String sql = insertSQL_Map_Key_StringLength.get( entryCount );
		
		if ( sql != null ) {
			return sql;
		}
		
		StringBuilder sqlSB = new StringBuilder( INSERT_SQL.length() + ( ( INSERT_VALUES_SINGLE_ENTRY_SQL.length() + 5 ) * entryCount ) );

		sqlSB.append( INSERT_SQL );
		
		for ( int counter = 1; counter <= entryCount; counter++ ) {
			if ( counter != 1 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( INSERT_VALUES_SINGLE_ENTRY_SQL );
		}
		
		sql = sqlSB.toString();
		
		insertSQL_Map_Key_StringLength.put( entryCount, sql );
		
		return sql;
	}
	
	/**
	 * Save the associated data to the database
	 * @param item
	 * @throws Exception
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<ProteinCoveragePeptideProteinProteinResidueDifferentDTO> itemList ) throws Exception {

		if ( itemList.isEmpty() ) {
			throw new IllegalArgumentException( "( itemList.isEmpty() )" );
		}
		
		final String sql = this.create_insert_SQL( itemList.size() );

		try {
			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getInsertControlCommitConnection();

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				int counter = 0;

				for ( ProteinCoveragePeptideProteinProteinResidueDifferentDTO item : itemList ) {
		
					counter++;
					pstmt.setInt( counter,  item.getSearchId() );
					counter++;
					pstmt.setInt( counter,  item.getReportedPeptideId());
					counter++;
					pstmt.setInt( counter,  item.getPeptideIdInfoOnly() );
	
					counter++;
					pstmt.setInt( counter,  item.getProteinSequenceVersionId() );
	
					counter++;
					pstmt.setInt( counter,  item.getPeptidePosition() );
					counter++;
					pstmt.setInt( counter,  item.getProteinPosition() );
					
					counter++;
					pstmt.setString( counter,  item.getPeptideResidueLetter() );
					counter++;
					pstmt.setString( counter,  item.getProteinResidueLetter() );
				}
				
				pstmt.executeUpdate();
			}
			
		} catch ( Exception e ) {

			log.error( "ERROR: insert_NOT_Update_ID_Property_InDTOParams(...) sql: " + sql
					+ ".  First Item: " + itemList.get(0) , e );
			
			throw e;
		} finally {
			
		}
		
	}
}
