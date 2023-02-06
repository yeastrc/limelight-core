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
		private List<FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item> entries;

		public List<FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item> getEntries() {
			return entries;
		}
	}

	/**
	 * 
	 *
	 */
	public static class FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item {

		private int featureDetection_PersistentFeatureEntry_Id;
		private int featureDetection_SingularFeatureEntry_Id;
		private int featureDetection_Root_Id;
		
		public int getFeatureDetection_PersistentFeatureEntry_Id() {
			return featureDetection_PersistentFeatureEntry_Id;
		}
		public int getFeatureDetection_SingularFeatureEntry_Id() {
			return featureDetection_SingularFeatureEntry_Id;
		}
		public int getFeatureDetection_Root_Id() {
			return featureDetection_Root_Id;
		}
		
	}
	
	private static final String QUERY_SQL = 
			"SELECT "
			+ " * "
			+ " FROM "
			+ " feature_detection_map_persistnt_to_snglr_feature_tbl "
			+ " WHERE feature_detection_root_id = ?";

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_IF#getForFeatureDetectionRootId(int)
	 */
	@Override
	public FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result  getForFeatureDetectionRootId( int featureDetectionRootId ) throws Exception {

		FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result result = new FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result();
		
		List<FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item> entries = new ArrayList<>();
		result.entries = entries;
		
		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, featureDetectionRootId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item entry = new FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item();

					entry.featureDetection_PersistentFeatureEntry_Id = rs.getInt( "feature_detection_persistent_feature_entry_id" );
					entry.featureDetection_SingularFeatureEntry_Id = rs.getInt( "feature_detection_singular_feature_entry_id" );
					entry.featureDetection_Root_Id = rs.getInt( "feature_detection_root_id" );
										
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
