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
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.annotation_data_min_max_accumulation_computation.AnnotationData_MinMax_AccumulationComputation_SingletonInstance;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.constants.AnnotationValueStringLocalFieldLengthConstants;
import org.yeastrc.limelight.limelight_shared.dto.PsmPeptidePositionFilterableAnnotationDTO;

/**
 * Table psm_peptide_position_filterable_annotation_tbl
 *
 */
public class DB_Insert_PsmPeptidePosition_FilterableAnnotationDAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmPeptidePosition_FilterableAnnotationDAO.class );

	private DB_Insert_PsmPeptidePosition_FilterableAnnotationDAO() { }
	public static DB_Insert_PsmPeptidePosition_FilterableAnnotationDAO getInstance() { return new DB_Insert_PsmPeptidePosition_FilterableAnnotationDAO(); }

	private static long totalElapsedTime_saveToDatabase_InMilliSeconds = 0;
	private static int totalCallCount_saveToDatabase = 0;
	private static int totalRecordsSavedCount_saveToDatabase = 0;

	/**
	 * @throws Exception 
	 * 
	 */
	public static void logTotalElapsedTimeAndCallCounts_SaveToImporterStatsTable( SearchDTO_Importer search ) throws Exception {
		
		return;  // Part of commit after X transaction so skip for now
		
//		{
//			double elapsedTimeSeconds = totalElapsedTime_saveToDatabase_InMilliSeconds / 1000.0;
//			double elapsedTimeMinutes = ( elapsedTimeSeconds ) / 60.0;
//			log.warn( "Total Elapsed Time (includes commit): Save to psm_peptide_position_filterable_annotation_tbl: "
//					+ elapsedTimeSeconds + " seconds, or "
//					+ elapsedTimeMinutes + " minutes.  "
//					+ "# method calls: " + totalCallCount_saveToDatabase
//					+ ", # records saved: " + totalRecordsSavedCount_saveToDatabase);
//			
//			Importer_Stats_PerTable_DTO importer_Stats_PerTable_DTO = new Importer_Stats_PerTable_DTO();
//			
//			importer_Stats_PerTable_DTO.setSearchId( search.getId() );
//			
//			importer_Stats_PerTable_DTO.setTableManipulationType( Importer_Stats_PerTable_Table__SqlManipulationType_Values_Enum.INSERT );
//			importer_Stats_PerTable_DTO.setTable_names( "psm_peptide_position_filterable_annotation_tbl" );
//			importer_Stats_PerTable_DTO.setSqlCalls_TotalElapsedTime_Milliseconds(totalElapsedTime_saveToDatabase_InMilliSeconds);
//			importer_Stats_PerTable_DTO.setSqlCallCount( totalCallCount_saveToDatabase );
//			importer_Stats_PerTable_DTO.setTotalRecords( totalRecordsSavedCount_saveToDatabase );
//			
//			Importer_Stats_PerTable_DAO.getInstance().save(importer_Stats_PerTable_DTO);
//		}
		
	}

	/**
	 * 
	 * 
	 * 
	 * This will INSERT the given PsmModificationPosition_FilterableAnnotationDTO into the database.
	 * @param item
	 * @throws Exception
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<PsmPeptidePositionFilterableAnnotationDTO> psmPeptidePositionFilterableAnnotationDTO_List ) throws Exception {

		if ( psmPeptidePositionFilterableAnnotationDTO_List.isEmpty() ) {
			throw new IllegalArgumentException( "psmPeptidePositionFilterableAnnotationDTO_List is empty" );
		}
		

		try {

			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getInsertControlCommitConnection();
			
			insert_NOT_Update_ID_Property_InDTOParams( psmPeptidePositionFilterableAnnotationDTO_List, dbConnection );
			
		} finally {
		}
		
//		long startTimeNanoSeconds = System.nanoTime();
//		
//		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
//			insert_NOT_Update_ID_Property_InDTOParams( psmPeptidePositionFilterableAnnotationDTO_List, dbConnection );
//		} catch ( Exception e ) {
//			log.error( "ERROR: insert_NOT_Update_ID_Property_InDTOParams( psmPeptidePositionFilterableAnnotationDTO_List ) psmPeptidePositionFilterableAnnotationDTO_List: " + StringUtils.join(psmPeptidePositionFilterableAnnotationDTO_List, ","), e );
//			throw e;
//		}
//
//		long endTimeNanoSeconds = System.nanoTime();
//		long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
//		totalElapsedTime_saveToDatabase_InMilliSeconds += ( elapsedTimeNanoSeconds / 1000000 );
//		totalCallCount_saveToDatabase++;
//		totalRecordsSavedCount_saveToDatabase += psmPeptidePositionFilterableAnnotationDTO_List.size();
	}

	private final static String INSERT_SQL = 
			"INSERT INTO psm_peptide_position_filterable_annotation_tbl "
			
			+ "(psm_id, "
			+ 	" annotation_type_id, peptide_position, value_double, value_string ) "
			
			+ "VALUES ";
	
	private final static String INSERT_VALUES_SINGLE_ENTRY_SQL = "(?, ?, ?, ?, ?)";	

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
	 * This will INSERT the given PsmModificationPosition_FilterableAnnotationDTO into the database
	 * @param item
	 * @throws Exception
	 */
	private void insert_NOT_Update_ID_Property_InDTOParams( List<PsmPeptidePositionFilterableAnnotationDTO> psmPeptidePositionFilterableAnnotationDTO_List, Connection dbConnection ) throws Exception {

		if ( psmPeptidePositionFilterableAnnotationDTO_List.isEmpty() ) {
			throw new IllegalArgumentException( "( psmPeptidePositionFilterableAnnotationDTO_List.isEmpty() )" );
		}
		
		for ( PsmPeptidePositionFilterableAnnotationDTO item : psmPeptidePositionFilterableAnnotationDTO_List ) {

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

		for ( PsmPeptidePositionFilterableAnnotationDTO item : psmPeptidePositionFilterableAnnotationDTO_List ) {

			AnnotationData_MinMax_AccumulationComputation_SingletonInstance.getSingletonInstance().add_AnnotationDataBaseDTO(item);
		}

		final String insertSQL = this.create_insert_SQL( psmPeptidePositionFilterableAnnotationDTO_List.size() );
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( insertSQL ) ) {
			
			int counter = 0;
			

			for ( PsmPeptidePositionFilterableAnnotationDTO item : psmPeptidePositionFilterableAnnotationDTO_List ) {

				counter++;
				pstmt.setLong( counter, item.getPsmId() );

				counter++;
				pstmt.setInt( counter, item.getAnnotationTypeId() );

				counter++;
				pstmt.setInt( counter, item.getPeptidePosition() );

				counter++;
				pstmt.setDouble( counter, item.getValueDouble() );

				counter++;
				pstmt.setString( counter, item.getValueString() );
			}
			
			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) insertSQL: " + insertSQL + "\nData to save: " + StringUtils.join( psmPeptidePositionFilterableAnnotationDTO_List, "," ), e );
			throw e;
		}

	}
	
	
}
