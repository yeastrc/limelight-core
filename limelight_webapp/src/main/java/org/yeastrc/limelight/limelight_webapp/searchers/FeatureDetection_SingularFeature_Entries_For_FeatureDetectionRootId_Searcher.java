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

    	private List<Integer> id_List;
    	private List<Integer> ms_1_scan_number_List;

		private List<Double> monoisotopic_mass_List;
		private List<Integer> charge_List;
		private List<Double> intensity_List;
		private List<Double> base_isotope_peak_List;
		private List<Double> analysis_window_start_m_z_List;
		private List<Double> analysis_window_end_m_z_List;
		private List<Double> correlation_score_List;
		
		public List<Integer> getId_List() {
			return id_List;
		}
		public List<Integer> getMs_1_scan_number_List() {
			return ms_1_scan_number_List;
		}
		public List<Double> getMonoisotopic_mass_List() {
			return monoisotopic_mass_List;
		}
		public List<Integer> getCharge_List() {
			return charge_List;
		}
		public List<Double> getIntensity_List() {
			return intensity_List;
		}
		public List<Double> getBase_isotope_peak_List() {
			return base_isotope_peak_List;
		}
		public List<Double> getAnalysis_window_start_m_z_List() {
			return analysis_window_start_m_z_List;
		}
		public List<Double> getAnalysis_window_end_m_z_List() {
			return analysis_window_end_m_z_List;
		}
		public List<Double> getCorrelation_score_List() {
			return correlation_score_List;
		}
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_IF#getForFeatureDetectionRootId(int)
	 */
	@Override
	public FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_Result  getForFeatureDetectionRootId_StartId_EndId(
			
			int featureDetectionRootId, int startId, int endId 
			
			) throws Exception {

		return get_INTERNAL( 
				featureDetectionRootId, 
				null, // singularFeatureIds_List
				startId, endId );
		
	}
	

	@Override
	public FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_Result  getForFeatureDetectionRootId_SingularFeatureIds_List(
			
			int featureDetectionRootId, List<Integer> singularFeatureIds_List 
			
			) throws Exception {
		
		if ( singularFeatureIds_List.isEmpty() ) {
			throw new IllegalArgumentException( "( singularFeatureIds_List.isEmpty() )" );
		}

		return get_INTERNAL( 
				featureDetectionRootId, 
				singularFeatureIds_List,
				0, // startId, 
				0 // endId 
				);
	}
	
	private static final String QUERY_SQL_MAIN = 
			"SELECT "
			+ " * "
			+ " FROM "
			+ " feature_detection_singular_feature_entry_tbl "
			+ " WHERE feature_detection_root_id = ?";

	private static final String QUERY_SQL_ID_LIST_START = 
			" AND id IN ( ";
	

	private static final String QUERY_SQL_RANGE = 
			" AND id >= ? AND id <= ? ";
	

	
	//  INTERNAL Method
	
	/**
	 * @param featureDetectionRootId
	 * @param singularFeatureIds_List
	 * @param startId
	 * @param endId
	 * @return
	 * @throws Exception
	 */
	private FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_Result  get_INTERNAL(
			
			int featureDetectionRootId, List<Integer> singularFeatureIds_List, int startId, int endId 
			
			) throws Exception {

		FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_Result result = new FeatureDetection_SingleFeature_Entries_For_FeatureDetectionRootId_Searcher_Result();
		
		int potentialRecordCount = endId - startId + 2;

    	result.id_List = new ArrayList<>(  potentialRecordCount );
    	result.ms_1_scan_number_List = new ArrayList<>(  potentialRecordCount );

		result.monoisotopic_mass_List = new ArrayList<>(  potentialRecordCount );
		result.charge_List = new ArrayList<>(  potentialRecordCount );
		result.intensity_List = new ArrayList<>(  potentialRecordCount );
		result.base_isotope_peak_List = new ArrayList<>(  potentialRecordCount );
		result.analysis_window_start_m_z_List = new ArrayList<>(  potentialRecordCount );
		result.analysis_window_end_m_z_List = new ArrayList<>(  potentialRecordCount );
		result.correlation_score_List = new ArrayList<>(  potentialRecordCount );
				
		String querySQL = QUERY_SQL_MAIN;
		
		if ( singularFeatureIds_List != null ) {
			
			StringBuilder sqlSB = new StringBuilder( 10000 );
			for ( int counter = 1; counter <= singularFeatureIds_List.size(); counter++ ) {
				if ( counter > 1 ) {
					sqlSB.append( "," );
				}
				sqlSB.append( "?" );
			}
			
			querySQL += QUERY_SQL_ID_LIST_START + sqlSB.toString() + " ) ";
			
		} else {
			
			querySQL += QUERY_SQL_RANGE;
		}
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, featureDetectionRootId );
			
			if ( singularFeatureIds_List != null ) {
				
				for ( Integer singularFeatureId : singularFeatureIds_List ) {

					counter++;
					preparedStatement.setInt( counter, singularFeatureId );
				}
				
			} else {
				counter++;
				preparedStatement.setInt( counter, startId );
				counter++;
				preparedStatement.setInt( counter, endId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					
					result.id_List.add( rs.getInt( "id" ) );
					result.ms_1_scan_number_List.add( rs.getInt( "ms_1_scan_number" ) );
					{
						double fieldValue = rs.getDouble( "monoisotopic_mass" );
						if ( ! rs.wasNull() ) {
							result.monoisotopic_mass_List.add( fieldValue );
						} else {
							result.monoisotopic_mass_List.add( null );
						}
					}
					{
						int fieldValue = rs.getInt( "charge" );
						if ( ! rs.wasNull() ) {
							result.charge_List.add( fieldValue );
						} else {
							result.charge_List.add( null );
						}
					}
					{
						double fieldValue = rs.getDouble( "intensity" );
						if ( ! rs.wasNull() ) {
							result.intensity_List.add( fieldValue );
						} else {
							result.intensity_List.add( null );
						}
					}
					{
						double fieldValue = rs.getDouble( "base_isotope_peak" );
						if ( ! rs.wasNull() ) {
							result.base_isotope_peak_List.add( fieldValue );
						} else {
							result.base_isotope_peak_List.add( null );
						}
					}
					{
						double fieldValue = rs.getDouble( "analysis_window_start_m_z" );
						if ( ! rs.wasNull() ) {
							result.analysis_window_start_m_z_List.add( fieldValue );
						} else {
							result.analysis_window_start_m_z_List.add( null );
						}
					}
					{
						double fieldValue = rs.getDouble( "analysis_window_end_m_z" );
						if ( ! rs.wasNull() ) {
							result.analysis_window_end_m_z_List.add( fieldValue );
						} else {
							result.analysis_window_end_m_z_List.add( null );
						}
					}
					{
						double fieldValue = rs.getDouble( "correlation_score" );
						if ( ! rs.wasNull() ) {
							result.correlation_score_List.add( fieldValue );
						} else {
							result.correlation_score_List.add( null );
						}
					}
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
