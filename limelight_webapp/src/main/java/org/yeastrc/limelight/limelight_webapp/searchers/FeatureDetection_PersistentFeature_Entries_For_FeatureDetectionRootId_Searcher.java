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
package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Get the feature_detection_persistent_feature_entry_tbl and feature_detection_persistent_featr_enty_ms_2_scn_nmbrs_json_tbl For featureDetectionRootId 
 *
 */
@Component
public class FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher extends Limelight_JDBC_Base implements FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher.class );
	
	/**
	 * 
	 *
	 */
	public static class FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result {
		private List<FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item> entries;

		public List<FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item> getEntries() {
			return entries;
		}
	}

	/**
	 * 
	 *
	 */
	public static class FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item {
    	
		private int id_PersistentFeature_Entry; 
		private int featureDetectionRootId;
		private int featureDetectionPersistentFeatureUploadedFileStatsId;
		
		private int charge;
		
		private double monoisotopicMass;
		
		private float retentionTimeRange_Start;
		private float retentionTimeRange_End;
		private float retentionTimeRange_Apex;
		
		private double abundance_RetentionTimeRange_Apex;
		private double abundance_Total;
		
		//  From feature_detection_persistent_featr_enty_ms_2_scn_nmbrs_json_tbl
		
		private String ms_2_scn_nmbrs_array_json_String;
		
		public int getId_PersistentFeature_Entry() {
			return id_PersistentFeature_Entry;
		}
		public int getFeatureDetectionRootId() {
			return featureDetectionRootId;
		}
		public int getFeatureDetectionPersistentFeatureUploadedFileStatsId() {
			return featureDetectionPersistentFeatureUploadedFileStatsId;
		}
		public int getCharge() {
			return charge;
		}
		public double getMonoisotopicMass() {
			return monoisotopicMass;
		}
		public float getRetentionTimeRange_Start() {
			return retentionTimeRange_Start;
		}
		public float getRetentionTimeRange_End() {
			return retentionTimeRange_End;
		}
		public float getRetentionTimeRange_Apex() {
			return retentionTimeRange_Apex;
		}
		public double getAbundance_RetentionTimeRange_Apex() {
			return abundance_RetentionTimeRange_Apex;
		}
		public double getAbundance_Total() {
			return abundance_Total;
		}
		public String getMs_2_scn_nmbrs_array_json_String() {
			return ms_2_scn_nmbrs_array_json_String;
		}
		
		
	}
	
	private static final String QUERY_SQL = 
			"SELECT "
			+ " *, feature_detection_persistent_feature_entry_tbl.id AS main_table_id "
			+ " FROM "
			+ " feature_detection_persistent_feature_entry_tbl "
			+ " LEFT OUTER JOIN feature_detection_persistent_featr_enty_ms_2_scn_nmbrs_json_tbl ON feature_detection_persistent_feature_entry_tbl.id = feature_detection_persistent_featr_enty_ms_2_scn_nmbrs_json_tbl.feature_detection_persistent_feature_entry_id"
			+ " WHERE feature_detection_root_id = ?";

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_IF#getForFeatureDetectionRootId(int)
	 */
	@Override
	public FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result  getForFeatureDetectionRootId( int featureDetectionRootId ) throws Exception {

		FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result result = new FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result();
		
		List<FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item> entries = new ArrayList<>();
		result.entries = entries;
		
		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, featureDetectionRootId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				
				while ( rs.next() ) {
					FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item entry = new FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item();

					entry.id_PersistentFeature_Entry = rs.getInt( "main_table_id" );
					entry.featureDetectionRootId = rs.getInt( "feature_detection_root_id" );
					entry.featureDetectionPersistentFeatureUploadedFileStatsId = rs.getInt( "feature_detection_persistent_feature_uploaded_file_stats_id" );
					entry.charge = rs.getInt( "charge" );
					
					entry.monoisotopicMass = rs.getDouble( "monoisotopic_mass" );

					entry.retentionTimeRange_Start = rs.getFloat( "retention_time_range_start" );
					entry.retentionTimeRange_End = rs.getFloat( "retention_time_range_end" );
					entry.retentionTimeRange_Apex = rs.getFloat( "retention_time_range_apex" );

					entry.abundance_RetentionTimeRange_Apex = rs.getDouble( "abundance_retention_time_range_apex" );
					entry.abundance_Total = rs.getDouble( "abundance_total" );
					
					entry.ms_2_scn_nmbrs_array_json_String = rs.getString( "ms_2_scan_numbers_json_array" );
					
					entries.add( entry );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
