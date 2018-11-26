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
import org.yeastrc.limelight.limelight_importer.dto.ProteinSequenceVersionDTO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;

/**
 * 
 * table protein_sequence_version_tbl
 */
public class ProteinSequenceVersionDAO {

	private static final Logger log = LoggerFactory.getLogger( ProteinSequenceVersionDAO.class );
	
	private ProteinSequenceVersionDAO() { }
	public static ProteinSequenceVersionDAO getInstance() { return new ProteinSequenceVersionDAO(); }

	/**
	 * Get the protein_sequence DTO corresponding to supplied sequence. If no matching
	 * protein_sequence_v2 is found in the database, it is inserted and a populated DTO
	 * returned. If already in the database, DTO is populated from database
	 * and returned.
	 * 
	 * @param sequence
	 * @return
	 * @throws Exception
	 */
	public ProteinSequenceVersionDTO getProteinSequenceVersionDTO_InsertIfNotInDB( ProteinSequenceVersionDTO searchItem ) throws Exception {
		Integer smallestId = getSmallestIdForData( searchItem );
		if ( smallestId != null ) {
			searchItem.setId( smallestId );
		} else {
			saveToDatabase( searchItem );
		}
		return searchItem;
	}
	
	/**
	 * @param item
	 * @throws Exception
	 */
	private void saveToDatabase( ProteinSequenceVersionDTO item ) throws Exception {
		
		final String sql = "INSERT INTO protein_sequence_version_tbl (protein_sequence_id,isotope_label_id) VALUES (?,?)";

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
				pstmt.setInt( 1, item.getProteinSequenceId() );
				pstmt.setInt( 2, item.getIsotopeLabelId() );
				pstmt.executeUpdate();

				try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
					if( rs.next() ) {
						item.setId( rs.getInt( 1 ) );
					} else
						throw new LimelightImporterDatabaseException( "Failed to insert item: " + item );
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...): item: " + item + " sql: " + sql, e );
			throw e;
		} finally {
		}
		Integer smallestId = getSmallestIdForData( item );
		if ( smallestId == null ) {
			String msg = "Unable to find protein_sequence_version_tbl record just inserted by data.  "
					+ "Inserted protein_sequence_version_tbl id: " + item.getId() + ", item: " + item;
			log.error( msg );
			throw new LimelightImporterInternalException(msg);
		}
		if ( smallestId != item.getId() ) {
			deleteAllButRecordWithId( smallestId, item );
			item.setId( smallestId );
		}
	}

	
	/**
	 * Get the id for the supplied protein_sequence_id AND isotope_label_id from the database. Returns empty list if not found.
	 * @param proteinSequenceId
	 * @param isotopeLabelId
	 * @return
	 * @throws Exception
	 */
	private Integer getSmallestIdForData( ProteinSequenceVersionDTO item ) throws Exception {
		
		Integer result = null;

		final String sql = 
				"SELECT id FROM protein_sequence_version_tbl WHERE protein_sequence_id = ? AND isotope_label_id = ? ORDER BY id LIMIT 1";

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setInt( 1, item.getProteinSequenceId() );
				pstmt.setInt( 2, item.getIsotopeLabelId() );

				try ( ResultSet rs = pstmt.executeQuery() ) {

					if ( rs.next() ) {
						result = rs.getInt( "id" );
					}
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getSmallestIdForData(...): item: " + item + " sql: " + sql, e );
			throw e;
		} finally {
		}
		return result;
	}

	/**
	 * Clean up database for items inserted more than once
	 * @param id - id to keep
	 * @param sequence
	 * @throws Exception 
	 */
	private void deleteAllButRecordWithId( int smallestId, ProteinSequenceVersionDTO item ) throws Exception {

		final String sql = "DELETE FROM protein_sequence_version_tbl WHERE id <> ? AND protein_sequence_id = ? AND isotope_label_id = ? ";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setInt( 1, smallestId );
				pstmt.setInt( 2, item.getProteinSequenceId() );
				pstmt.setInt( 3, item.getIsotopeLabelId() );
				pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "ERROR: deleteAllButRecordWithId(...): item: " + item + " sql: " + sql, e );
			throw e;
		} finally {
		}
	}
}
