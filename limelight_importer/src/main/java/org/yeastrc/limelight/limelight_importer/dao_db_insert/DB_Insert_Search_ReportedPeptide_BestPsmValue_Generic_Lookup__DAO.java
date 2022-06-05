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
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDBInternalException;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.Search_ReportedPeptide_BestPsmValue_Lookup__DTO;

/**
 * Tables
 * 
 *   search__rep_pept__psm_target_psm_best_psm_value_lookup_tbl		- For PSMs that are Target
 *   search__rep_pept__psm_target_ind_decoy_psm_best_psm_vl_lkp_tbl - For PSMs that are Target or Independent Decoy
 *   search__rep_pept__psm_tgt_id_dcy_dcy_psm_bst_psm_vl_lkp_tbl	- For PSMs that are Target or Independent Decoy or Decoy
 */
public class DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO.class );
	
	private DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO() { }
	public static DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO getInstance() { return new DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO(); }

	
	/**
	 * 
	 *
	 */
	public enum DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType {
		TARGET, TARGET_INDEPENDENT_DECOY, TARGET_INDEPENDENT_DECOY_DECOY
	}

	
	private static long totalElapsedTime_saveToDatabase_InMilliSeconds__TARGET = 0;
	private static int totalCallCount_saveToDatabase__TARGET = 0;
	private static int totalRecordsSavedCount_saveToDatabase__TARGET = 0;
	

	private static long totalElapsedTime_saveToDatabase_InMilliSeconds__TARGET_INDEPENDENT_DECOY = 0;
	private static int totalCallCount_saveToDatabase__TARGET_INDEPENDENT_DECOY = 0;
	private static int totalRecordsSavedCount_saveToDatabase__TARGET_INDEPENDENT_DECOY = 0;
	

	private static long totalElapsedTime_saveToDatabase_InMilliSeconds__TARGET_INDEPENDENT_DECOY_DECOY = 0;
	private static int totalCallCount_saveToDatabase__TARGET_INDEPENDENT_DECOY_DECOY= 0;
	private static int totalRecordsSavedCount_saveToDatabase__TARGET_INDEPENDENT_DECOY_DECOY = 0;

	/**
	 * @throws Exception 
	 * 
	 */
	public static void logTotalElapsedTimeAndCallCounts_SaveToImporterStatsTable( SearchDTO_Importer search ) throws Exception {
		{
			double elapsedTimeSeconds = totalElapsedTime_saveToDatabase_InMilliSeconds__TARGET / 1000.0;
			double elapsedTimeMinutes = ( elapsedTimeSeconds ) / 60.0;
			log.warn( "Total Elapsed Time (includes commit): Save to search__rep_pept__psm_target_psm_best_psm_value_lookup_tbl: "
					+ elapsedTimeSeconds + " seconds, or "
					+ elapsedTimeMinutes + " minutes.  "
					+ "# method calls: " + totalCallCount_saveToDatabase__TARGET
					+ ", # records saved: " + totalRecordsSavedCount_saveToDatabase__TARGET);
			
			Importer_Stats_PerTable_DTO importer_Stats_PerTable_DTO = new Importer_Stats_PerTable_DTO();
			
			importer_Stats_PerTable_DTO.setSearchId( search.getId() );
			
			importer_Stats_PerTable_DTO.setTableManipulationType( Importer_Stats_PerTable_Table__SqlManipulationType_Values_Enum.INSERT );
			importer_Stats_PerTable_DTO.setTable_names( "search__rep_pept__psm_target_psm_best_psm_value_lookup_tbl" );
			importer_Stats_PerTable_DTO.setSqlCalls_TotalElapsedTime_Milliseconds(totalElapsedTime_saveToDatabase_InMilliSeconds__TARGET);
			importer_Stats_PerTable_DTO.setSqlCallCount( totalCallCount_saveToDatabase__TARGET );
			importer_Stats_PerTable_DTO.setTotalRecords( totalRecordsSavedCount_saveToDatabase__TARGET );
			
			Importer_Stats_PerTable_DAO.getInstance().save(importer_Stats_PerTable_DTO);
		}
		{
			double elapsedTimeSeconds = totalElapsedTime_saveToDatabase_InMilliSeconds__TARGET_INDEPENDENT_DECOY / 1000.0;
			double elapsedTimeMinutes = ( elapsedTimeSeconds ) / 60.0;
			log.warn( "Total Elapsed Time (includes commit): Save to search__rep_pept__psm_target_ind_decoy_psm_best_psm_vl_lkp_tbl: "
					+ elapsedTimeSeconds + " seconds, or "
					+ elapsedTimeMinutes + " minutes.  "
					+ "# method calls: " + totalCallCount_saveToDatabase__TARGET_INDEPENDENT_DECOY
					+ ", # records saved: " + totalRecordsSavedCount_saveToDatabase__TARGET_INDEPENDENT_DECOY);
			
			Importer_Stats_PerTable_DTO importer_Stats_PerTable_DTO = new Importer_Stats_PerTable_DTO();
			
			importer_Stats_PerTable_DTO.setSearchId( search.getId() );
			
			importer_Stats_PerTable_DTO.setTableManipulationType( Importer_Stats_PerTable_Table__SqlManipulationType_Values_Enum.INSERT );
			importer_Stats_PerTable_DTO.setTable_names( "search__rep_pept__psm_target_ind_decoy_psm_best_psm_vl_lkp_tbl" );
			importer_Stats_PerTable_DTO.setSqlCalls_TotalElapsedTime_Milliseconds(totalElapsedTime_saveToDatabase_InMilliSeconds__TARGET_INDEPENDENT_DECOY);
			importer_Stats_PerTable_DTO.setSqlCallCount( totalCallCount_saveToDatabase__TARGET_INDEPENDENT_DECOY );
			importer_Stats_PerTable_DTO.setTotalRecords( totalRecordsSavedCount_saveToDatabase__TARGET_INDEPENDENT_DECOY );
			
			Importer_Stats_PerTable_DAO.getInstance().save(importer_Stats_PerTable_DTO);
		}
		{
			double elapsedTimeSeconds = totalElapsedTime_saveToDatabase_InMilliSeconds__TARGET_INDEPENDENT_DECOY_DECOY / 1000.0;
			double elapsedTimeMinutes = ( elapsedTimeSeconds ) / 60.0;
			log.warn( "Total Elapsed Time (includes commit): Save to search__rep_pept__psm_tgt_id_dcy_dcy_psm_bst_psm_vl_lkp_tbl: "
					+ elapsedTimeSeconds + " seconds, or "
					+ elapsedTimeMinutes + " minutes.  "
					+ "# method calls: " + totalCallCount_saveToDatabase__TARGET_INDEPENDENT_DECOY_DECOY
					+ ", # records saved: " + totalRecordsSavedCount_saveToDatabase__TARGET_INDEPENDENT_DECOY_DECOY);
			
			Importer_Stats_PerTable_DTO importer_Stats_PerTable_DTO = new Importer_Stats_PerTable_DTO();
			
			importer_Stats_PerTable_DTO.setSearchId( search.getId() );
			
			importer_Stats_PerTable_DTO.setTableManipulationType( Importer_Stats_PerTable_Table__SqlManipulationType_Values_Enum.INSERT );
			importer_Stats_PerTable_DTO.setTable_names( "search__rep_pept__psm_tgt_id_dcy_dcy_psm_bst_psm_vl_lkp_tbl" );
			importer_Stats_PerTable_DTO.setSqlCalls_TotalElapsedTime_Milliseconds(totalElapsedTime_saveToDatabase_InMilliSeconds__TARGET_INDEPENDENT_DECOY_DECOY);
			importer_Stats_PerTable_DTO.setSqlCallCount( totalCallCount_saveToDatabase__TARGET_INDEPENDENT_DECOY_DECOY );
			importer_Stats_PerTable_DTO.setTotalRecords( totalRecordsSavedCount_saveToDatabase__TARGET_INDEPENDENT_DECOY_DECOY );
			
			Importer_Stats_PerTable_DAO.getInstance().save(importer_Stats_PerTable_DTO);
		}
	}

	
	/**
	 * @param Search_ReportedPeptide_BestPsmValue_Lookup__DTO
	 * @throws Exception
	 */
	public void saveToDatabase_AUTOCOMMIT_AfterInsert__NotUse_InsertControlCommitConnection( List<Search_ReportedPeptide_BestPsmValue_Lookup__DTO> itemList, DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType tableType ) throws Exception {

		if ( itemList.isEmpty() ) {
			throw new IllegalArgumentException( "itemList is empty" );
		}
		
		long startTimeNanoSeconds = System.nanoTime();
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			
			saveToDatabase( itemList, tableType, dbConnection );

		} finally {
		}

		long endTimeNanoSeconds = System.nanoTime();
		long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
		

		if ( tableType == DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType.TARGET ) {

			totalElapsedTime_saveToDatabase_InMilliSeconds__TARGET += ( elapsedTimeNanoSeconds / 1000000 );
			totalCallCount_saveToDatabase__TARGET++;
			totalRecordsSavedCount_saveToDatabase__TARGET += itemList.size();
			
		} else if ( tableType == DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType.TARGET_INDEPENDENT_DECOY ) {

			totalElapsedTime_saveToDatabase_InMilliSeconds__TARGET_INDEPENDENT_DECOY += ( elapsedTimeNanoSeconds / 1000000 );
			totalCallCount_saveToDatabase__TARGET_INDEPENDENT_DECOY++;
			totalRecordsSavedCount_saveToDatabase__TARGET_INDEPENDENT_DECOY += itemList.size();
			
		} else if ( tableType == DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType.TARGET_INDEPENDENT_DECOY_DECOY ) {

			totalElapsedTime_saveToDatabase_InMilliSeconds__TARGET_INDEPENDENT_DECOY_DECOY += ( elapsedTimeNanoSeconds / 1000000 );
			totalCallCount_saveToDatabase__TARGET_INDEPENDENT_DECOY_DECOY++;
			totalRecordsSavedCount_saveToDatabase__TARGET_INDEPENDENT_DECOY_DECOY += itemList.size();
			 
		} else {
			String msg = "tableType is not an expected value.  is: " + tableType;
			log.error(msg);
			throw new LimelightImporterDBInternalException(msg);
		}
	}

	private static final String START_SAVE_SQL = "INSERT INTO ";
	
	private static final String TABLE_NAME_TARGET = "search__rep_pept__psm_target_psm_best_psm_value_lookup_tbl";

	private static final String TABLE_NAME_TARGET_INDEPENDENT_DECOY = "search__rep_pept__psm_target_ind_decoy_psm_best_psm_vl_lkp_tbl";

	private static final String TABLE_NAME_TARGET_INDEPENDENT_DECOY_DECOY = "search__rep_pept__psm_tgt_id_dcy_dcy_psm_bst_psm_vl_lkp_tbl";


	private static final String MAIN_SAVE_SQL =
			 	" ( "
			+ 		" reported_peptide_id, "
			+ 		" search_id, "
			+ 		" annotation_type_id, "
			+ 		" best_psm_value_for_ann_type_id, "
			+ 		" psm_id_for_best_value__non_fk "
			+ 	") "
			+ 	" VALUES ";
	
	private final static String INSERT_SINGLE_ROW_VALUES_SQL = "( ?, ?, ?, ?, ? )";

	/**
	 * @param item
	 * @param conn
	 * @throws Exception
	 */
	private void saveToDatabase( List<Search_ReportedPeptide_BestPsmValue_Lookup__DTO> itemList, DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType tableType, Connection dbConnection ) throws Exception {
		
		String tableName = null;
		
		if ( tableType == DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType.TARGET ) {
			
			tableName = TABLE_NAME_TARGET;
			
		} else if ( tableType == DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType.TARGET_INDEPENDENT_DECOY ) {
			
			tableName = TABLE_NAME_TARGET_INDEPENDENT_DECOY;
			
		} else if ( tableType == DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType.TARGET_INDEPENDENT_DECOY_DECOY ) {
			
			tableName = TABLE_NAME_TARGET_INDEPENDENT_DECOY_DECOY;
			 
		} else {
			String msg = "tableType is not an expected value.  is: " + tableType;
			log.error(msg);
			throw new LimelightImporterDBInternalException(msg);
		}
		

		StringBuilder sqlSB = new StringBuilder( 1000 );
		
		{
			int item_List_Size = itemList.size();
			
			for ( int counter = 1; counter <= item_List_Size; counter++ ) {

				if ( counter > 1 ) {
					sqlSB.append( "," );	
				}
				sqlSB.append( INSERT_SINGLE_ROW_VALUES_SQL );	
			}
		}

		
		final String sql = START_SAVE_SQL + tableName + MAIN_SAVE_SQL + sqlSB.toString();
		
		
		
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			int counter = 0;
			
			for ( Search_ReportedPeptide_BestPsmValue_Lookup__DTO item : itemList ) {
				counter++;
				pstmt.setInt( counter, item.getReportedPeptideId() );
				counter++;
				pstmt.setInt( counter, item.getSearchId() );
				counter++;
				pstmt.setInt( counter, item.getAnnotationTypeId() );
				
				counter++;
				pstmt.setDouble( counter, item.getBestPsmValueForAnnTypeId() );
				
				counter++;
				pstmt.setLong( counter, item.getPsmIdForBestValue() );
			}
			
			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) itemList: " + itemList + ", sql: " + sql
					+ " :::   itemList to insert: " + itemList, e );
			throw e;
		}
	}

}
