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
 * Get the feature_detection_singular_feature_entry_tbl For feature_detection_root_id
 *
 */
@Component
public class FeatureDetection_SingularFeature_Entries_For_FeatureDetectionRootId_Searcher extends Limelight_JDBC_Base implements FeatureDetection_SingularFeature_Entries_For_FeatureDetectionRootId_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( FeatureDetection_SingularFeature_Entries_For_FeatureDetectionRootId_Searcher.class );
	
	/**
	 * 
	 *
	 */
	public static class FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_Result {
		private List<FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item> entries;

		public List<FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item> getEntries() {
			return entries;
		}
	}

	/**
	 * 
	 *
	 */
	public static class FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item {
    	
		private int id;
    	private int ms_1_scan_number;

		private Double monoisotopic_mass;
		private Integer charge;
		private Double intensity;
		private Double base_isotope_peak;
		private Double analysis_window_start_m_z;
		private Double analysis_window_end_m_z;
		private Double correlation_score;
		
		public int getId() {
			return id;
		}
		public int getMs_1_scan_number() {
			return ms_1_scan_number;
		}
		public Double getMonoisotopic_mass() {
			return monoisotopic_mass;
		}
		public Integer getCharge() {
			return charge;
		}
		public Double getIntensity() {
			return intensity;
		}
		public Double getBase_isotope_peak() {
			return base_isotope_peak;
		}
		public Double getAnalysis_window_start_m_z() {
			return analysis_window_start_m_z;
		}
		public Double getAnalysis_window_end_m_z() {
			return analysis_window_end_m_z;
		}
		public Double getCorrelation_score() {
			return correlation_score;
		}
		
	}
	
	private static final String QUERY_SQL = 
			"SELECT "
			+ " * "
			+ " FROM "
			+ " feature_detection_singular_feature_entry_tbl "
			+ " WHERE feature_detection_root_id = ?";

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_IF#getForFeatureDetectionRootId(int)
	 */
	@Override
	public FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_Result  getForFeatureDetectionRootId( int featureDetectionRootId ) throws Exception {

		FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_Result result = new FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_Result();
		
		List<FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item> entries = new ArrayList<>();
		result.entries = entries;
		
		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, featureDetectionRootId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item entry = new FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item();
					
					entry.id = rs.getInt( "id" );
					entry.ms_1_scan_number = rs.getInt( "ms_1_scan_number" );
					{
						double fieldValue = rs.getDouble( "monoisotopic_mass" );
						if ( ! rs.wasNull() ) {
							entry.monoisotopic_mass = fieldValue;
						}
					}
					{
						int fieldValue = rs.getInt( "charge" );
						if ( ! rs.wasNull() ) {
							entry.charge = fieldValue;
						}
					}
					{
						double fieldValue = rs.getDouble( "intensity" );
						if ( ! rs.wasNull() ) {
							entry.intensity = fieldValue;
						}
					}
					{
						double fieldValue = rs.getDouble( "base_isotope_peak" );
						if ( ! rs.wasNull() ) {
							entry.base_isotope_peak = fieldValue;
						}
					}
					{
						double fieldValue = rs.getDouble( "analysis_window_start_m_z" );
						if ( ! rs.wasNull() ) {
							entry.analysis_window_start_m_z = fieldValue;
						}
					}
					{
						double fieldValue = rs.getDouble( "analysis_window_end_m_z" );
						if ( ! rs.wasNull() ) {
							entry.analysis_window_end_m_z = fieldValue;
						}
					}
					{
						double fieldValue = rs.getDouble( "correlation_score" );
						if ( ! rs.wasNull() ) {
							entry.correlation_score = fieldValue;
						}
					}
					
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
