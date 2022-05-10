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
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.constants.Importer_Stats_PerTable_Table__SqlManipulationType_Values_Enum;
import org.yeastrc.limelight.limelight_importer.dao.Importer_Stats_PerTable_DAO;
import org.yeastrc.limelight.limelight_importer.dto.Importer_Stats_PerTable_DTO;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.constants.AnnotationValueStringLocalFieldLengthConstants;
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;

/**
 * Table psm_filterable_annotation_tbl
 *
 */
public class DB_Insert_PsmFilterableAnnotationDAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmFilterableAnnotationDAO.class );

	private DB_Insert_PsmFilterableAnnotationDAO() { }
	public static DB_Insert_PsmFilterableAnnotationDAO getInstance() { return new DB_Insert_PsmFilterableAnnotationDAO(); }

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
			log.warn( "Total Elapsed Time (includes commit): Save to psm_filterable_annotation_tbl: "
					+ elapsedTimeSeconds + " seconds, or "
					+ elapsedTimeMinutes + " minutes.  "
					+ "# method calls: " + totalCallCount_saveToDatabase
					+ "# records saved: " + totalRecordsSavedCount_saveToDatabase);
			
			Importer_Stats_PerTable_DTO importer_Stats_PerTable_DTO = new Importer_Stats_PerTable_DTO();
			
			importer_Stats_PerTable_DTO.setSearchId( search.getId() );
			
			importer_Stats_PerTable_DTO.setTableManipulationType( Importer_Stats_PerTable_Table__SqlManipulationType_Values_Enum.INSERT );
			importer_Stats_PerTable_DTO.setTable_names( "psm_filterable_annotation_tbl" );
			importer_Stats_PerTable_DTO.setSqlCalls_TotalElapsedTime_Milliseconds(totalElapsedTime_saveToDatabase_InMilliSeconds);
			importer_Stats_PerTable_DTO.setSqlCallCount( totalCallCount_saveToDatabase );
			importer_Stats_PerTable_DTO.setTotalRecords( totalRecordsSavedCount_saveToDatabase );
			
			Importer_Stats_PerTable_DAO.getInstance().save(importer_Stats_PerTable_DTO);
		}
		
	}

	/**
	 * 
	 * Is NOT using InsertControlCommitConnection.  Auto commit will occur after insert of the list of entries
	 * 
	 * This will INSERT the given PsmFilterableAnnotationDTO into the database.
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase_AUTOCOMMIT_AfterInsert__NotUse_InsertControlCommitConnection( List<PsmFilterableAnnotationDTO> psmAnnotationDTO_Filterable_List ) throws Exception {

		long startTimeNanoSeconds = System.nanoTime();
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			saveToDatabase( psmAnnotationDTO_Filterable_List, dbConnection );
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase( psmAnnotationDTO_Filterable_List ) psmAnnotationDTO_Filterable_List: " + StringUtils.join(psmAnnotationDTO_Filterable_List, ","), e );
			throw e;
		}

		long endTimeNanoSeconds = System.nanoTime();
		long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
		totalElapsedTime_saveToDatabase_InMilliSeconds += ( elapsedTimeNanoSeconds / 1000000 );
		totalCallCount_saveToDatabase++;
		totalRecordsSavedCount_saveToDatabase += psmAnnotationDTO_Filterable_List.size();
	}

	private final static String INSERT_SQL = 
			"INSERT INTO psm_filterable_annotation_tbl "
			
			+ "(psm_id, "
			+ 	" annotation_type_id, value_double, value_string ) "
			
			+ "VALUES ";
	
	private final static String INSERT_SINGLE_ROW_VALUES_SQL = "(?, ?, ?, ?)";	
	
//	private final static String INSERT_SINGLE_ROW_SQL = INSERT_SQL + INSERT_SINGLE_ROW_VALUES_SQL;
	
	/**
	 * This will INSERT the given PsmFilterableAnnotationDTO into the database
	 * @param item
	 * @throws Exception
	 */
	private void saveToDatabase( List<PsmFilterableAnnotationDTO> psmAnnotationDTO_Filterable_List, Connection dbConnection ) throws Exception {

		for ( PsmFilterableAnnotationDTO item : psmAnnotationDTO_Filterable_List ) {

			if ( item == null ) {
				String msg = "item to save cannot be null";
				log.error( msg );
				throw new IllegalArgumentException(msg);
			}

			if ( item.getValueString().length() > AnnotationValueStringLocalFieldLengthConstants.ANNOTATION_VALUE_STRING_LOCAL_FIELD_LENGTH ) {

				//  Filterable valueString must fit in the main table since it is copied from there to lookup tables.
				String msg = "For Filterable annotation: item to save ValueString cannot have length > " 
						+ AnnotationValueStringLocalFieldLengthConstants.ANNOTATION_VALUE_STRING_LOCAL_FIELD_LENGTH
						+ ", ValueString: " + item.getValueString()
						+ ", item: " + item;
				log.error( msg );
				throw new IllegalArgumentException(msg);
			}
		}
		
			
		StringBuilder sqlSB = new StringBuilder( 1000 );
		
		sqlSB.append( INSERT_SQL );

		{
			int currentPsm_psmAnnotationDTO_Filterable_List_Size = psmAnnotationDTO_Filterable_List.size();
			
			for ( int counter = 1; counter <= currentPsm_psmAnnotationDTO_Filterable_List_Size; counter++ ) {

				if ( counter > 1 ) {
					sqlSB.append( "," );	
				}
				sqlSB.append( INSERT_SINGLE_ROW_VALUES_SQL );	
			}
		}
		

		final String sql = sqlSB.toString();
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			
			int counter = 0;
			

			for ( PsmFilterableAnnotationDTO item : psmAnnotationDTO_Filterable_List ) {

				counter++;
				pstmt.setLong( counter, item.getPsmId() );
				counter++;
				pstmt.setInt( counter, item.getAnnotationTypeId() );

				counter++;
				pstmt.setDouble( counter, item.getValueDouble() );

				counter++;
				pstmt.setString( counter, item.getValueString() );
			}
			
			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) sql: " + sql + "\nData to save: " + StringUtils.join( psmAnnotationDTO_Filterable_List, "," ), e );
			throw e;
		}

	}
	
	
	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////

	
	//   !!!!    OLD CODE    !!!!
	
//	/**
//	 * This will INSERT the given PsmFilterableAnnotationDTO into the database.
//	 * @param item
//	 * @throws Exception
//	 */
//	public void saveToDatabase( List<PsmFilterableAnnotationDTO> currentPsm_psmAnnotationDTO_Filterable_List ) throws Exception {
//
//		try {
//			//  DO NOT Close connection from getInsertControlCommitConnection()
//			Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getInsertControlCommitConnection();
//
//
//			for ( PsmFilterableAnnotationDTO item : currentPsm_psmAnnotationDTO_Filterable_List ) {
//
//				saveToDatabase( item, dbConnection );
//			}			
//
////			saveToDatabase( currentPsm_psmAnnotationDTO_Filterable_List, dbConnection );
//			
//
//		} finally {
//		}
//	}
//
//	private final static String INSERT_SQL = 
//			"INSERT INTO psm_filterable_annotation_tbl "
//			
//			+ "(psm_id, "
//			+ 	" annotation_type_id, value_double, value_string ) "
//			
//			+ "VALUES ";
//	
//	private final static String INSERT_SINGLE_ROW_VALUES_SQL = "(?, ?, ?, ?)";	
//	
//	private final static String INSERT_SINGLE_ROW_SQL = INSERT_SQL + INSERT_SINGLE_ROW_VALUES_SQL;
//	
//	/**
//	 * This will INSERT the given PsmFilterableAnnotationDTO into the database
//	 * @param item
//	 * @throws Exception
//	 */
//	public void saveToDatabase( PsmFilterableAnnotationDTO item, Connection dbConnection ) throws Exception {
//		
//		//  Commented out code is for inserting all the PsmFilterableAnnotationDTO for a PSM in one 'INSERT' statement
//		
////		public void saveToDatabase( List<PsmFilterableAnnotationDTO> currentPsm_psmAnnotationDTO_Filterable_List, Connection dbConnection ) throws Exception {
//
////		for ( PsmFilterableAnnotationDTO item : currentPsm_psmAnnotationDTO_Filterable_List ) {
//
//			if ( item == null ) {
//				String msg = "item to save cannot be null";
//				log.error( msg );
//				throw new IllegalArgumentException(msg);
//			}
//
//			if ( item.getValueString().length() > AnnotationValueStringLocalFieldLengthConstants.ANNOTATION_VALUE_STRING_LOCAL_FIELD_LENGTH ) {
//
//				//  Filterable valueString must fit in the main table since it is copied from there to lookup tables.
//				String msg = "For Filterable annotation: item to save ValueString cannot have length > " 
//						+ AnnotationValueStringLocalFieldLengthConstants.ANNOTATION_VALUE_STRING_LOCAL_FIELD_LENGTH
//						+ ", ValueString: " + item.getValueString()
//						+ ", item: " + item;
//				log.error( msg );
//				throw new IllegalArgumentException(msg);
//			}
////		}
//		
//			
////		StringBuilder sqlSB = new StringBuilder( 1000 );
////		
////		sqlSB.append( INSERT_SQL );
////
////		{
////			int currentPsm_psmAnnotationDTO_Filterable_List_Size = currentPsm_psmAnnotationDTO_Filterable_List.size();
////			
////			for ( int counter = 1; counter <= currentPsm_psmAnnotationDTO_Filterable_List_Size; counter++ ) {
////
////				if ( counter > 1 ) {
////					sqlSB.append( "," );	
////				}
////				sqlSB.append( INSERT_SINGLE_ROW_VALUES_SQL );	
////			}
////		}
////		
////
////		final String sql = sqlSB.toString();
//		
//		
//		final String sql = INSERT_SINGLE_ROW_SQL;
//
//		long startTimeNanoSeconds = System.nanoTime();
//		
//		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
//			
//			int counter = 0;
//			
//
////			for ( PsmFilterableAnnotationDTO item : currentPsm_psmAnnotationDTO_Filterable_List ) {
//
//				counter++;
//				pstmt.setLong( counter, item.getPsmId() );
//				counter++;
//				pstmt.setInt( counter, item.getAnnotationTypeId() );
//
//				counter++;
//				pstmt.setDouble( counter, item.getValueDouble() );
//
//				counter++;
//				pstmt.setString( counter, item.getValueString() );
////			}
//			
//			pstmt.executeUpdate();
//			
//		} catch ( Exception e ) {
//			log.error( "ERROR: saveToDatabase(...) sql: " + sql + "\nData to save: " + item, e );
////			log.error( "ERROR: saveToDatabase(...) sql: " + sql + "\nData to save: " + StringUtils.join( currentPsm_psmAnnotationDTO_Filterable_List ), e );
//			throw e;
//		}
//
//		long endTimeNanoSeconds = System.nanoTime();
//		long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
//		totalElapsedTime_saveToDatabase_InMilliSeconds += ( elapsedTimeNanoSeconds / 1000000 );
//		totalCallCount_saveToDatabase++;
//	}
	
}
