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
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer.dto.ProteinSequenceDTO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;

/**
 * table protein_sequence_tbl
 *
 */
public class ProteinSequenceDAO {
	
	private static final Logger log = LoggerFactory.getLogger( ProteinSequenceDAO.class );

	private ProteinSequenceDAO() { }
	public static ProteinSequenceDAO getInstance() { return new ProteinSequenceDAO(); }

	private static long totalElapsedTime_getProteinIdForSequence_InMilliSeconds = 0;
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
			double elapsedTimeSeconds = totalElapsedTime_getProteinIdForSequence_InMilliSeconds / 1000.0;
			double elapsedTimeMinutes = ( elapsedTimeSeconds ) / 60.0;
			log.warn( "Total Elapsed Time: Search protein_sequence_tbl for protein sequence: "
					+ elapsedTimeSeconds + " seconds, or "
					+ elapsedTimeMinutes + " minutes.  # method calls: " + totalCallCount_getPeptideIdForSequence);
		}
		{
			double elapsedTimeSeconds = totalElapsedTime_saveToDatabase_InMilliSeconds / 1000.0;
			double elapsedTimeMinutes = ( elapsedTimeSeconds ) / 60.0;
			log.warn( "Total Elapsed Time: Save to protein_sequence_tbl: "
					+ elapsedTimeSeconds + " seconds, or "
					+ elapsedTimeMinutes + " minutes.  # method calls: " + totalCallCount_saveToDatabase);
		}
		{
			double elapsedTimeSeconds = totalElapsedTime_delete_InMilliSeconds / 1000.0;
			double elapsedTimeMinutes = ( elapsedTimeSeconds ) / 60.0;
			log.warn( "Total Elapsed Time: Delete from protein_sequence_tbl of duplicate protein sequence: "
					+ elapsedTimeSeconds + " seconds, or "
					+ elapsedTimeMinutes + " minutes.  # method calls: " + totalCallCount_delete);
		}
	}
	
	/**
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public ProteinSequenceDTO getProteinSequenceDTOFromDatabase( int id ) throws Exception {
		
		ProteinSequenceDTO protein_sequence = new ProteinSequenceDTO();
		
		final String sql = "SELECT sequence FROM protein_sequence_tbl WHERE id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setInt( 1, id );

				try ( ResultSet rs = pstmt.executeQuery() ) {
					if( !rs.next() )
						throw new LimelightImporterInternalException( "could not find protein_sequence_tbl with id " + id );
					protein_sequence.setId( id );
					protein_sequence.setSequence( rs.getString( 1 ) );
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getProteinSequenceDTOFromDatabase(...): id: " + id + " sql: " + sql, e );
			throw e;
		} finally {
		}
		return protein_sequence;
	}
	
	/**
	 * Get the protein_sequence DTO corresponding to supplied sequence. If no matching
	 * protein_sequence_tbl is found in the database, it is inserted and a populated DTO
	 * returned. If already in the database, DTO is populated from database
	 * and returned.
	 * 
	 * @param sequence
	 * @return
	 * @throws Exception
	 */
	public ProteinSequenceDTO getProteinSequenceDTO_InsertIfNotInDB( String sequence ) throws Exception {
		ProteinSequenceDTO proteinSequenceDTO = new ProteinSequenceDTO();
		proteinSequenceDTO.setSequence( sequence );
		List<Integer> proteinIdList = getProteinIdForSequence( sequence );
		if ( proteinIdList.size() > 1 ) {
			deleteAllButRecordWithId( proteinIdList.get(0), sequence );
		}
		if ( ! proteinIdList.isEmpty() ) {
			proteinSequenceDTO.setId( proteinIdList.get(0) );
			return proteinSequenceDTO;
		}
		saveToDatabase( proteinSequenceDTO );
		return proteinSequenceDTO;
	}
	
	/**
	 * Get the id for the supplied protein sequence from the database. Returns empty list if not found.
	 * @param sequence
	 * @return
	 * @throws Exception
	 */
	public List<Integer> getProteinIdForSequence( String sequence ) throws Exception {

		long startTimeNanoSeconds = System.nanoTime();
		
		List<Integer> results = new ArrayList<>();
		
		final String sql = "SELECT id FROM protein_sequence_tbl WHERE sequence = ? ORDER BY id";
		

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setString( 1, sequence );

				try ( ResultSet rs = pstmt.executeQuery() ) {
					while ( rs.next() ) {
						results.add( rs.getInt( "id" ) );
					}
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getProteinSequenceDTOFromDatabase(...): sequence: " + sequence + " sql: " + sql, e );
			throw e;
		} finally {
		}
		Collections.sort( results );

		long endTimeNanoSeconds = System.nanoTime();
		long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
		totalElapsedTime_getProteinIdForSequence_InMilliSeconds += ( elapsedTimeNanoSeconds / 1000000 );
		
		totalCallCount_getPeptideIdForSequence++;
		
		return results;
	}
	
	/**
	 * @param item
	 * @throws Exception
	 */
	private void saveToDatabase( ProteinSequenceDTO item ) throws Exception {

		long startTimeNanoSeconds = System.nanoTime();
		
		int insertedProteinId = 0;

		String sql = "INSERT INTO protein_sequence_tbl (sequence) VALUES (?)";

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
				pstmt.setString( 1, item.getSequence() );

				pstmt.executeUpdate();

				try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
					if( rs.next() ) {
						insertedProteinId = rs.getInt( 1 );
					} else
						throw new LimelightImporterDatabaseException( "Failed to insert protein sequence for " + item.getSequence() );
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...): item: " + item + " sql: " + sql, e );
			throw e;
		} finally {
		}

		long endTimeNanoSeconds = System.nanoTime();
		long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
		totalElapsedTime_saveToDatabase_InMilliSeconds += ( elapsedTimeNanoSeconds / 1000000 );
		totalCallCount_saveToDatabase++;

		List<Integer> proteinIdList = getProteinIdForSequence( item.getSequence() );
		if ( proteinIdList.size() > 1 ) {
			deleteAllButRecordWithId( proteinIdList.get(0), item.getSequence() );
		}
		if ( ! proteinIdList.isEmpty() ) {
			item.setId( proteinIdList.get(0) );
			return;
		}
		String msg = "Unable to find protein record just inserted by sequence.  "
				+ "Inserted protein id: " + insertedProteinId + ", sequence: " + item.getSequence();
		log.error( msg );
		throw new LimelightImporterInternalException(msg);
	}

	/**
	 * Clean up database for sequences inserted more than once
	 * @param id - id to keep
	 * @param sequence
	 * @throws Exception 
	 */
	private void deleteAllButRecordWithId( int id, String sequence ) throws Exception {

		long startTimeNanoSeconds = System.nanoTime();
		
		String sql = "DELETE FROM protein_sequence_tbl WHERE id <> ? AND sequence = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setInt( 1, id );
				pstmt.setString( 2, sequence );
				pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "ERROR: deleteAllButRecordWithId(...): id: " + id + ", sequence : " + sequence + ", sql: " + sql, e );
			throw e;
		} finally {
		}

		long endTimeNanoSeconds = System.nanoTime();
		long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
		totalElapsedTime_delete_InMilliSeconds += ( elapsedTimeNanoSeconds / 1000000 );
		totalCallCount_delete++;
	}
}
