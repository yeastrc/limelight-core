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

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.constants.Importer_Stats_PerTable_Table__SqlManipulationType_Values_Enum;
import org.yeastrc.limelight.limelight_importer.dao.Importer_Stats_PerTable_DAO;
import org.yeastrc.limelight.limelight_importer.dto.Importer_Stats_PerTable_DTO;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.Search_ReportedPeptide__Lookup__DTO;

/**
 * table search__rep_pept__lookup_tbl
 *
 */
public class DB_Insert_Search_ReportedPeptide__Lookup__DAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_Search_ReportedPeptide__Lookup__DAO.class );
	
	private DB_Insert_Search_ReportedPeptide__Lookup__DAO() { }
	public static DB_Insert_Search_ReportedPeptide__Lookup__DAO getInstance() { return new DB_Insert_Search_ReportedPeptide__Lookup__DAO(); }

	private static long totalElapsedTime_saveToDatabase_InMilliSeconds = 0;
	private static int totalCallCount_saveToDatabase = 0;
	private static int totalRecordsSavedCount_saveToDatabase = 0;

	/**
	 * @throws Exception 
	 * 
	 */
	public static void logTotalElapsedTimeAndCallCounts_SaveToImporterStatsTable( SearchDTO_Importer search ) throws Exception {
		{
			double elapsedTimeSeconds = totalElapsedTime_saveToDatabase_InMilliSeconds / 1000.0;
			double elapsedTimeMinutes = ( elapsedTimeSeconds ) / 60.0;
			log.warn( "Total Elapsed Time (includes commit): Save to search__rep_pept__lookup_tbl: "
					+ elapsedTimeSeconds + " seconds, or "
					+ elapsedTimeMinutes + " minutes.  "
					+ "# method calls: " + totalCallCount_saveToDatabase
					+ ", # records saved: " + totalRecordsSavedCount_saveToDatabase);
			
			Importer_Stats_PerTable_DTO importer_Stats_PerTable_DTO = new Importer_Stats_PerTable_DTO();
			
			importer_Stats_PerTable_DTO.setSearchId( search.getId() );
			
			importer_Stats_PerTable_DTO.setTableManipulationType( Importer_Stats_PerTable_Table__SqlManipulationType_Values_Enum.INSERT );
			importer_Stats_PerTable_DTO.setTable_names( "search__rep_pept__lookup_tbl" );
			importer_Stats_PerTable_DTO.setSqlCalls_TotalElapsedTime_Milliseconds(totalElapsedTime_saveToDatabase_InMilliSeconds);
			importer_Stats_PerTable_DTO.setSqlCallCount( totalCallCount_saveToDatabase );
			importer_Stats_PerTable_DTO.setTotalRecords( totalRecordsSavedCount_saveToDatabase );
			
			Importer_Stats_PerTable_DAO.getInstance().save(importer_Stats_PerTable_DTO);
		}
		
	}


	/**
	 * @param Search_ReportedPeptide__Lookup__DTO
	 * @throws Exception
	 */
	public void saveToDatabase_AUTOCOMMIT_AfterInsert__NotUse_InsertControlCommitConnection( List<Search_ReportedPeptide__Lookup__DTO> itemList ) throws Exception {

		if ( itemList.isEmpty() ) {
			throw new IllegalArgumentException( "itemList is empty" );
		}
		
		long startTimeNanoSeconds = System.nanoTime();
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			
			saveToDatabase( itemList, dbConnection );

		} finally {
		}

		long endTimeNanoSeconds = System.nanoTime();
		long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
		totalElapsedTime_saveToDatabase_InMilliSeconds += ( elapsedTimeNanoSeconds / 1000000 );
		totalCallCount_saveToDatabase++;
		totalRecordsSavedCount_saveToDatabase += itemList.size();
	}

	private static final String INSERT_SQL =
			"INSERT INTO search__rep_pept__lookup_tbl "
			+ 	"( reported_peptide_id, search_id, "
			+  		" has_dynamic_modifictions, has_isotope_labels, "
			+ 		" any_psm_has_dynamic_modifications, any_psm_has_open_modifictions, any_psm_has_reporter_ions, "
			+ 		" psm_num_targets_only_at_default_cutoff, psm_num_indpendent_decoys_only_at_default_cutoff, psm_num_decoys_only_at_default_cutoff, "
			+ 		" peptide_meets_default_cutoffs, related_peptide_unique_for_search,"
			+ 		" psm_id_sequential_start__start_target, psm_id_sequential_start__start_independent_decoy, psm_id_sequential_start__start_decoy, "
			+ 		" psm_id_sequential_end "
			+ 	" ) "
			+ 	" VALUES ";

	private final static String INSERT_SINGLE_ROW_VALUES_SQL = "( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";	
	
	/**
	 * @param item
	 * @param conn
	 * @throws Exception
	 */
	public void saveToDatabase( List<Search_ReportedPeptide__Lookup__DTO> itemList, Connection dbConnection ) throws Exception {

		StringBuilder sqlSB = new StringBuilder( 1000 );
		
		sqlSB.append( INSERT_SQL );

		{
			int item_List_Size = itemList.size();
			
			for ( int counter = 1; counter <= item_List_Size; counter++ ) {

				if ( counter > 1 ) {
					sqlSB.append( "," );	
				}
				sqlSB.append( INSERT_SINGLE_ROW_VALUES_SQL );	
			}
		}

		final String sql = sqlSB.toString();
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			int counter = 0;
			

			for ( Search_ReportedPeptide__Lookup__DTO item : itemList ) {
					
				counter++;
				pstmt.setInt( counter, item.getReportedPeptideId() );
				counter++;
				pstmt.setInt( counter, item.getSearchId() );
				counter++;
				if ( item.isHasDynamicModifications() ) {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
				} else {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}
				counter++;
				if ( item.isHasIsotopeLabels() ) {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
				} else {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}
				
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
				pstmt.setInt( counter, item.getPsmNum_Targets_Only_AtDefaultCutoff() );
				counter++;
				pstmt.setInt( counter, item.getPsmNum_IndependentDecoys_Only_AtDefaultCutoff() );
				counter++;
				pstmt.setInt( counter, item.getPsmNum_Decoys_Only_AtDefaultCutoff() );
				
				counter++;
				pstmt.setString( counter, item.getPeptideMeetsDefaultCutoffs().value() );
	
				counter++;
				if ( item.isRelatedPeptideUniqueForSearch() ) {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
				} else {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}
	
				//  PSM Ids are now always sequential
				counter++;
				pstmt.setLong( counter, item.getPsmIdSequentialStart__StartOf_Target_Psms() );
				
				counter++;
				if ( item.getPsmIdSequentialStart__StartOf_IndependentDecoy_Psms() != null ) {
					pstmt.setLong( counter, item.getPsmIdSequentialStart__StartOf_IndependentDecoy_Psms() );	
				} else {
					pstmt.setNull(counter, java.sql.Types.INTEGER );
				}
	
				counter++;
				if ( item.getPsmIdSequentialStart__StartOf_Decoy_Psms() != null ) {
					pstmt.setLong( counter, item.getPsmIdSequentialStart__StartOf_Decoy_Psms() );	
				} else {
					pstmt.setNull(counter, java.sql.Types.INTEGER );
				}
				
				counter++;
				pstmt.setLong( counter, item.getPsmIdSequentialEnd() );
			}
			
			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) itemList: " + itemList + ", sql: " + sql
					+ " :::   itemList to insert: " + itemList, e );
			throw e;
		}
	}

}
