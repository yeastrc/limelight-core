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
package org.yeastrc.limelight.limelight_importer.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_shared.dto.PeptideDTO;

/**
 * table peptide_tbl
 *
 */
public class PeptideDAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( PeptideDAO_Importer.class );
	
	private PeptideDAO_Importer() { }
	public static PeptideDAO_Importer getInstance() { return new PeptideDAO_Importer(); }

	private static long totalElapsedTime_getPeptideIdForSequence_InMilliSeconds = 0;
	private static long totalCallCount_getPeptideIdForSequence = 0;

	private static long totalElapsedTime_saveToDatabase_InMilliSeconds = 0;
	private static long totalCallCount_saveToDatabase = 0;

	private static long totalElapsedTime_delete_InMilliSeconds = 0;
	private static long totalCallCount_delete = 0;
	
	/**
	 * 
	 */
	public static void logTotalElapsedTimeAndCallCounts() {
		{
			double elapsedTimeSeconds = totalElapsedTime_getPeptideIdForSequence_InMilliSeconds / 1000.0;
			double elapsedTimeMinutes = ( elapsedTimeSeconds ) / 60.0;
			log.warn( "Total Elapsed Time: Search peptide_tbl for peptide sequence: "
					+ elapsedTimeSeconds + " seconds, or "
					+ elapsedTimeMinutes + " minutes.  # method calls: " + totalCallCount_getPeptideIdForSequence);
		}
		{
			double elapsedTimeSeconds = totalElapsedTime_saveToDatabase_InMilliSeconds / 1000.0;
			double elapsedTimeMinutes = ( elapsedTimeSeconds ) / 60.0;
			log.warn( "Total Elapsed Time: Save to peptide_tbl: "
					+ elapsedTimeSeconds + " seconds, or "
					+ elapsedTimeMinutes + " minutes.  # method calls: " + totalCallCount_saveToDatabase);
		}
		{
			double elapsedTimeSeconds = totalElapsedTime_delete_InMilliSeconds / 1000.0;
			double elapsedTimeMinutes = ( elapsedTimeSeconds ) / 60.0;
			log.warn( "Total Elapsed Time: Delete from peptide_tbl of duplicate peptide sequence: "
					+ elapsedTimeSeconds + " seconds, or "
					+ elapsedTimeMinutes + " minutes.  # method calls: " + totalCallCount_delete);
		}
	}

	/**
	 * Get the peptide DTO corresponding to supplied sequence. 
	 * If no matching peptide is found in the database, it is inserted and a populated DTO returned.
	 * If already in the database, DTO is populated from database and returned.
	 * 
	 * @param sequence
	 * @return
	 * @throws Exception
	 */
	public PeptideDTO getPeptideDTO_OrSave( String sequence ) throws Exception {

		PeptideDTO peptideDTO = new PeptideDTO();
		peptideDTO.setSequence( sequence );
		
		Integer id = getPeptideIdForSequence( sequence );
		
		if ( id != null ) {
			peptideDTO.setId( id );
		} else {
			saveToDatabase( peptideDTO );
			fixTableIfSavedEntryNotFirstEntry( peptideDTO );
		}

		return peptideDTO;
	}
	
	/**
	 * @param peptideDTO
	 */
	private void fixTableIfSavedEntryNotFirstEntry( PeptideDTO peptideDTO ) throws Exception {
		
		//  Since another process may insert a record between the SELECT and the INSERT,
		//  Retrieve on the sequence again and confirm the id is the one just inserted
		Integer idFromQueryOnSequence = getPeptideIdForSequence( peptideDTO.getSequence() );
		if ( idFromQueryOnSequence == null ) {
			String msg = " Peptide Sequence just inserted is no longer in the database.";
			log.error( msg );
			throw new LimelightImporterInternalException(msg);
		}
		if ( idFromQueryOnSequence.intValue() != peptideDTO.getId() ) {
			//  The record in the table with the smallest 'id' for this sequence is not the one just inserted:
			delete( peptideDTO.getId() );               //    Remove the one just inserted
			peptideDTO.setId( idFromQueryOnSequence );  //    Update the id of peptideDTO to the record with the smallest 'id'
		}
	}
	
	/**
	 * Get the id for the supplied peptide sequence from the database. 
	 * @param sequence
	 * @return null if not found
	 * @throws Exception
	 */
	public Integer getPeptideIdForSequence( String sequence ) throws Exception {

		long startTimeNanoSeconds = System.nanoTime();
		
		Integer id = null;
		
		final String sql = "SELECT id FROM peptide_tbl WHERE sequence = ? ORDER BY id LIMIT 1";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setString( 1, sequence );

				try ( ResultSet rs = pstmt.executeQuery() ) {
					if( rs.next() ) {
						id = rs.getInt( 1 );
					}
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getPeptideIdForSequence(...) sql: " + sql, e );
			throw e;
		}

		long endTimeNanoSeconds = System.nanoTime();
		long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
		totalElapsedTime_getPeptideIdForSequence_InMilliSeconds += ( elapsedTimeNanoSeconds / 1000000 );
		
		totalCallCount_getPeptideIdForSequence++;
		
		return id;
	}

	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( PeptideDTO item ) throws Exception {

		long startTimeNanoSeconds = System.nanoTime();
		
		final String sql = "INSERT INTO peptide_tbl (sequence ) VALUES (?)";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {

				pstmt.setString( 1, item.getSequence() );
				pstmt.executeUpdate();

				try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
					if( rs.next() ) {
						long idOfSaved = rs.getLong( 1 );
						if ( idOfSaved > Integer.MAX_VALUE ) {
							String msg = "'id' of record saved to peptide_tbl exceeds Integer.MAX_VALUE. Java code change required. 'id': " + idOfSaved;
							log.error( msg );
							throw new LimelightImporterInternalException(msg);
						}
						item.setId( (int) idOfSaved );
					} else
						throw new LimelightImporterDatabaseException( "Failed to get 'id' for insert of peptide_tbl for " + item.getSequence() );
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) item: " + item + ", sql: " + sql, e );
			throw e;
		}

		long endTimeNanoSeconds = System.nanoTime();
		long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
		totalElapsedTime_saveToDatabase_InMilliSeconds += ( elapsedTimeNanoSeconds / 1000000 );
		totalCallCount_saveToDatabase++;

	}
	

	/**
	 * @param id
	 * @throws Exception
	 */
	public void delete( int id ) throws Exception {

		long startTimeNanoSeconds = System.nanoTime();
		
		final String sql = "DELETE FROM peptide_tbl WHERE id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setInt( 1, id );
				pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "ERROR: delete(...) id: " + id + ", sql: " + sql, e );
			throw e;
		}

		long endTimeNanoSeconds = System.nanoTime();
		long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
		totalElapsedTime_delete_InMilliSeconds += ( elapsedTimeNanoSeconds / 1000000 );
		totalCallCount_delete++;

	}
}
