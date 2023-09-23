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
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.feature_detection__feature_detec_to_project_scan_file_mapping_id_based.FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_For_FeatureDetectionRootId_Single_ProjSearchID_RestWebserviceController;

/**
 * Get the feature_detection_map_persistnt_to_snglr_feature_tbl For feature_detection_root_id 
 *
 */
@Component
public class FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher extends Limelight_JDBC_Base implements FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher.class );
	
	/**
	 * 
	 *
	 */
	public static class FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result {

    	private List<Integer> featureDetection_PersistentFeatureEntry_Id_List;
    	private List<Integer> featureDetection_SingularFeatureEntry_Id_List;
    	private List<Integer> featureDetection_Root_Id_List;
		public List<Integer> getFeatureDetection_PersistentFeatureEntry_Id_List() {
			return featureDetection_PersistentFeatureEntry_Id_List;
		}
		public List<Integer> getFeatureDetection_SingularFeatureEntry_Id_List() {
			return featureDetection_SingularFeatureEntry_Id_List;
		}
		public List<Integer> getFeatureDetection_Root_Id_List() {
			return featureDetection_Root_Id_List;
		}
	}
	
	private static final String QUERY_SQL = 
			"SELECT "
			+ " * "
			+ " FROM "
			+ " feature_detection_map_persistnt_to_snglr_feature_tbl "
			+ " WHERE feature_detection_root_id = ?";

	private static final String QUERY_SQL_WITH_LIMIT_OFFSET_LIMIT_COUNT = 
			QUERY_SQL
			+ " order by feature_detection_persistent_feature_entry_id, feature_detection_singular_feature_entry_id"  // ORDER BY on primary index
			+ " LIMIT ?, ?";  // LIMIT  offset, count     offset is zero based like an array index
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_IF#getForFeatureDetectionRootId(int)
	 */
	@Override
	public FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result  getForFeatureDetectionRootId_Limit_Offset_Limit_Count( 
			
			int featureDetectionRootId,
			Integer limit_Offset, Integer limit_Count
			
			) throws Exception {
		
		if ( ( limit_Offset != null && limit_Count == null ) 
				||  ( limit_Offset == null && limit_Count != null ) ) {
			throw new IllegalArgumentException( "limit_Offset and limit_Count must both be null or not null" );
		}

		FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result result = new FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result();

		{
			int listSize = FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_For_FeatureDetectionRootId_Single_ProjSearchID_RestWebserviceController.MAX_LIMIT_COUNT__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_For_FeatureDetectionRootId_Single_ProjSearchID_RestWebserviceController;
			
			if ( limit_Count != null ) {
				listSize = limit_Count.intValue();
			}
			
			result.featureDetection_PersistentFeatureEntry_Id_List = new ArrayList<>(  listSize );
			result.featureDetection_SingularFeatureEntry_Id_List = new ArrayList<>(  listSize );
			result.featureDetection_Root_Id_List = new ArrayList<>(  listSize );
		}
		
		String querySQL = QUERY_SQL;
		
		if ( limit_Offset != null ) {
			querySQL = QUERY_SQL_WITH_LIMIT_OFFSET_LIMIT_COUNT;
		}
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, featureDetectionRootId );
			
			if ( limit_Offset != null ) {

				counter++;
				preparedStatement.setInt( counter, limit_Offset );
				counter++;
				preparedStatement.setInt( counter, limit_Count );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {

					result.featureDetection_PersistentFeatureEntry_Id_List.add( rs.getInt( "feature_detection_persistent_feature_entry_id" ) );
					result.featureDetection_SingularFeatureEntry_Id_List.add( rs.getInt( "feature_detection_singular_feature_entry_id" ) );
					result.featureDetection_Root_Id_List.add( rs.getInt( "feature_detection_root_id" ) );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
