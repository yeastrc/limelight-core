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
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
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
	 * @param item
	 * @return
	 * @throws Throwable
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams(PsmDTO item ) throws Exception {

		try {
			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getInsertControlCommitConnection();

			//  Insert into main table
			insert_NOT_Update_ID_Property_InDTOParams( item, dbConnection );
			
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
			+ "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";
	
	/**
	 * @param psm
	 * @param conn
	 * @throws Exception
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( PsmDTO psm, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		

		long startTimeNanoSeconds = System.nanoTime();
		
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
			
			int counter = 0;
			
			counter++;
			pstmt.setLong( counter, psm.getId() );
			
			counter++;
			pstmt.setInt( counter, psm.getSearchId() );

			counter++;
			pstmt.setInt( counter, psm.getReportedPeptideId() );

			counter++;
			pstmt.setInt( counter, psm.getCharge() );

			counter++;
			pstmt.setInt( counter, psm.getScanNumber() );

			counter++;
			if ( psm.getSearchScanFileId()!= null ) {
				pstmt.setInt( counter, psm.getSearchScanFileId() );
			} else {
				pstmt.setNull( counter, java.sql.Types.INTEGER );
			}

			counter++;
			if ( psm.isHasModifications() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}
			counter++;
			if ( psm.isHasOpenModifications() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}

			counter++;
			if ( psm.isHasReporterIons() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}
			
			counter++;
			pstmt.setBigDecimal( counter, psm.getPrecursor_RetentionTime() );
			counter++;
			pstmt.setBigDecimal( counter, psm.getPrecursor_MZ() );

			counter++;
			if ( psm.isDecoy() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}
			counter++;
			if ( psm.isIndependentDecoy() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}

			pstmt.executeUpdate();
			
			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					psm.setId( rs.getLong( 1 ) );
				} else
					throw new LimelightImporterDatabaseException( "Failed to insert psm..." );
			}
			
		} catch ( Exception e ) {
			
			log.error( "ERROR: saveToDatabase(...) sql: " + sql + "\nData to save: " + psm, e );
			
			throw e;
		}
		

		long endTimeNanoSeconds = System.nanoTime();
		long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
		totalElapsedTime_saveToDatabase_InMilliSeconds += ( elapsedTimeNanoSeconds / 1000000 );
		totalCallCount_saveToDatabase++;
	}
		
}
