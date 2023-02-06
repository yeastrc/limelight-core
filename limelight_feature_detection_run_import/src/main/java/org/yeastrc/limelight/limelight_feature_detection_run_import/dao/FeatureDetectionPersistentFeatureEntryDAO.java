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
package org.yeastrc.limelight.limelight_feature_detection_run_import.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionPersistentFeatureEntryDTO;

/**
 * table feature_detection_persistent_feature_entry_tbl
 *
 */
public class FeatureDetectionPersistentFeatureEntryDAO {
	
	private static final Logger log = LoggerFactory.getLogger( FeatureDetectionPersistentFeatureEntryDAO.class );
	
	private FeatureDetectionPersistentFeatureEntryDAO() { }
	public static FeatureDetectionPersistentFeatureEntryDAO getInstance() { return new FeatureDetectionPersistentFeatureEntryDAO(); }

	
	////////////////////////

	private static final String INSERT_SQL = 
			"INSERT INTO feature_detection_persistent_feature_entry_tbl "
					+ " ( "
					+ " feature_detection_root_id, feature_detection_persistent_feature_uploaded_file_stats_id, "
					+ " monoisotopic_mass, charge, "
					+ " retention_time_range_start, retention_time_range_end, retention_time_range_apex, "
					+ " abundance_retention_time_range_apex, abundance_total "
					+ " ) "
					+ "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? )";
	
	/**
	 * @param itemList
	 * @throws Exception
	 */
	public void save( FeatureDetectionPersistentFeatureEntryDTO item ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			//  Insert 
			save( item, dbConnection );
		}
	}

	/**
	 * @param itemList
	 * @param dbConnection
	 * @throws Exception
	 */
	public void save( FeatureDetectionPersistentFeatureEntryDTO item, Connection dbConnection ) throws Exception {

		final String insertSQL = INSERT_SQL;

		try ( PreparedStatement pstmt = dbConnection.prepareStatement( insertSQL, Statement.RETURN_GENERATED_KEYS ) ) {

			int counter = 0;
			counter++;
			pstmt.setInt( counter, item.getFeatureDetectionRootId() );
			counter++;
			pstmt.setInt( counter, item.getFeatureDetectionPersistentFeatureUploadedFileStatsId() );
			counter++;
			pstmt.setDouble( counter, item.getMonoisotopicMass() );
			counter++;
			pstmt.setInt( counter, item.getCharge() );
			counter++;
			pstmt.setFloat( counter, item.getRetentionTimeRange_Start() );
			counter++;
			pstmt.setFloat( counter, item.getRetentionTimeRange_End() );
			counter++;
			pstmt.setFloat( counter, item.getRetentionTimeRange_Apex() );
			counter++;
			pstmt.setDouble( counter, item.getAbundance_RetentionTimeRange_Apex() );
			counter++;
			pstmt.setDouble( counter, item.getAbundance_Total() );

			pstmt.executeUpdate();
			

			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					int id =  rs.getInt( 1 );

					item.setId(id);
				} else
					throw new LimelightImporterDatabaseException( "Failed to insert.  Failed to get assigned id " );
			}
			
		} catch ( Exception e ) {
			String msg = "Insert Fail: item: " + item + ", SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}

}
