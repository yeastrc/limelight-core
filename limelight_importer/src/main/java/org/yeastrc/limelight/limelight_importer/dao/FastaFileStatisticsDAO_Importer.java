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
import org.yeastrc.limelight.limelight_shared.dto.FastaFileStatisticsDTO;

/**
 * table fasta_file_statistics_tbl
 *
 */
public class FastaFileStatisticsDAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( FastaFileStatisticsDAO_Importer.class );

	private FastaFileStatisticsDAO_Importer() { }
	public static FastaFileStatisticsDAO_Importer getInstance() { return new FastaFileStatisticsDAO_Importer(); }


	private static final String GET_ID_SQL =

			"SELECT id FROM fasta_file_statistics_tbl "
					+ " WHERE "
					+ "sha_384_sum = ? AND num_targets = ? AND num_decoys = ? AND num_independent_decoys = ? ";


	/**
	 * Get the id for the supplied item from the database. 
	 * @param item
	 * @return null if not found
	 * @throws Exception
	 */
	public Integer get_Id_For_Item( FastaFileStatisticsDTO item ) throws Exception {

		Integer id = null;
		
		final String sql = GET_ID_SQL;
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				
				int counter = 0;
	
				counter++;
				pstmt.setBytes( counter, item.getSha_384_Sum() );
				counter++;
				pstmt.setInt( counter, item.getNumTargets() );
				counter++;
				pstmt.setInt( counter, item.getNumDecoys() );
				counter++;
				pstmt.setInt( counter, item.getNumIndependentDecoys() );
		
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
		
		return id;
	}
	
	private static final String INSERT_SQL =

			"INSERT INTO fasta_file_statistics_tbl "
					+ "("
					+ "sha_384_sum, num_targets, num_decoys, num_independent_decoys "
					+ ") "
					+ "VALUES ( ?, ?, ?, ? )";

	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( FastaFileStatisticsDTO item, boolean logError ) throws Exception {
		
		final String sql = INSERT_SQL;
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
		
			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
				
				int counter = 0;
	
				counter++;
				pstmt.setBytes( counter, item.getSha_384_Sum() );
				counter++;
				pstmt.setInt( counter, item.getNumTargets() );
				counter++;
				pstmt.setInt( counter, item.getNumDecoys() );
				counter++;
				pstmt.setInt( counter, item.getNumIndependentDecoys() );
		
				pstmt.executeUpdate();
				
				try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
					if( rs.next() ) {
						item.setId( rs.getInt( 1 ) );
					} else
						throw new LimelightImporterDatabaseException( "Failed to get 'id' for inserted record.  Data to save: " + item );
				}
			}
			
		} catch ( Exception e ) {
			if ( logError ) {
				log.error( "ERROR: saveToDatabase(...) sql: " + sql + "\nData to save: " + item, e );
			}
			throw e;
		}
	}

}
