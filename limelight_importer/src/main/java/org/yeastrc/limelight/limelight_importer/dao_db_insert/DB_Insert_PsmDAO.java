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
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.PsmDTO;

/**
 * table psm_tbl
 *
 */
public class DB_Insert_PsmDAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmDAO.class );
	
	private static DB_Insert_PsmDAO singletonInstance = new DB_Insert_PsmDAO();

	private DB_Insert_PsmDAO() { }
	public static DB_Insert_PsmDAO getSingletonInstance() { return singletonInstance; }
	
	////
	
	private static long totalElapsedTime_saveToDatabase_InMilliSeconds = 0;
	private static long totalCallCount_saveToDatabase = 0;

	//  Comment out since time does NOT include calls to 'commit' which is where the actual writing to DB occurs

	/**
	 * 
	 */
//	public static void logTotalElapsedTimeAndCallCounts() {
//		{
//			double elapsedTimeSeconds = totalElapsedTime_saveToDatabase_InMilliSeconds / 1000.0;
//			double elapsedTimeMinutes = ( elapsedTimeSeconds ) / 60.0;
//			log.warn( "Total Elapsed Time: Save to psm_tbl: "
//					+ elapsedTimeSeconds + " seconds, or "
//					+ elapsedTimeMinutes + " minutes.  # method calls: " + totalCallCount_saveToDatabase);
//		}
//		
//	}
	
	/**
	 * @param itemList
	 * @return
	 * @throws Throwable
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<PsmDTO> itemList ) throws Exception {

		try {
			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getInsertControlCommitConnection();

			//  Insert into main table
			insert_NOT_Update_ID_Property_InDTOParams( itemList, dbConnection );
			
		} finally {
		}
	}
	
	/////

	private static final String INSERT_SQL =
			
			"INSERT INTO psm_tbl "
			+ "( id, search_id, reported_peptide_id, charge, "
			+ " scan_number, search_scan_file_id, has_modifications, has_open_modifications, has_reporter_ions, "
			+ " precursor_retention_time, precursor_m_z,"
			+ " is_decoy, is_independent_decoy "
			+ " ) "
			+ "VALUES ";
	
	private static final String INSERT_VALUES_SINGLE_ENTRY_SQL =  "( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";

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
	 * @param itemList
	 * @param conn
	 * @throws Exception
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<PsmDTO> itemList, Connection dbConnection ) throws Exception {

		if ( itemList.isEmpty() ) {
			throw new IllegalArgumentException( "( itemList.isEmpty() )" );
		}
		
		final String insertSQL = this.create_insert_SQL( itemList.size() );

		long startTimeNanoSeconds = System.nanoTime();
		
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( insertSQL ) ) {
			
			int counter = 0;
			
			for ( PsmDTO item : itemList ) {

				counter++;
				pstmt.setLong( counter, item.getId() );

				counter++;
				pstmt.setInt( counter, item.getSearchId() );

				counter++;
				pstmt.setInt( counter, item.getReportedPeptideId() );

				counter++;
				pstmt.setInt( counter, item.getCharge() );

				counter++;
				pstmt.setInt( counter, item.getScanNumber() );

				counter++;
				if ( item.getSearchScanFileId()!= null ) {
					pstmt.setInt( counter, item.getSearchScanFileId() );
				} else {
					pstmt.setNull( counter, java.sql.Types.INTEGER );
				}

				counter++;
				if ( item.isHasModifications() ) {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
				} else {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}
				counter++;
				if ( item.isHasOpenModifications() ) {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
				} else {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}

				counter++;
				if ( item.isHasReporterIons() ) {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
				} else {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}

				counter++;
				pstmt.setBigDecimal( counter, item.getPrecursor_RetentionTime() );
				counter++;
				pstmt.setBigDecimal( counter, item.getPrecursor_MZ() );

				counter++;
				if ( item.isDecoy() ) {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
				} else {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}
				counter++;
				if ( item.isIndependentDecoy() ) {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
				} else {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}
			}

			pstmt.executeUpdate();
						
		} catch ( Exception e ) {
			
			log.error( "ERROR: insert_NOT_Update_ID_Property_InDTOParams(...) insertSQL: " + insertSQL + "\n First Data to save: " + itemList.get(0), e );
			
			throw e;
		}
		

		long endTimeNanoSeconds = System.nanoTime();
		long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
		totalElapsedTime_saveToDatabase_InMilliSeconds += ( elapsedTimeNanoSeconds / 1000000 );
		totalCallCount_saveToDatabase++;
	}
		
}
