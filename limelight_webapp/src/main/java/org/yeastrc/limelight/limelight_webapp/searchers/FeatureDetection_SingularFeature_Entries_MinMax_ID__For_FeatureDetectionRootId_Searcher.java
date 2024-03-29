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
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Get the feature_detection_singular_feature_entry_tbl records COUNT For feature_detection_root_id
 *
 */
@Component
public class FeatureDetection_SingularFeature_Entries_MinMax_ID__For_FeatureDetectionRootId_Searcher extends Limelight_JDBC_Base implements FeatureDetection_SingularFeature_Entries_MinMax_ID__For_FeatureDetectionRootId_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( FeatureDetection_SingularFeature_Entries_MinMax_ID__For_FeatureDetectionRootId_Searcher.class );
	
	public static class FeatureDetection_SingularFeature_Entries_MinMax_ID__For_FeatureDetectionRootId_Searcher_Result {
		
		private int minId;
		private int maxId;
		
		public int getMinId() {
			return minId;
		}
		public int getMaxId() {
			return maxId;
		}
	}
	
	private static final String QUERY_SQL = 
			"SELECT "
			+ " MIN(id) AS min_id, MAX(id) AS max_id "
			+ " FROM "
			+ " feature_detection_singular_feature_entry_tbl "
			+ " WHERE feature_detection_root_id = ?";

	/**
	 * @param featureDetectionRootId
	 * @return null if no records found for featureDetectionRootId
	 * @throws Exception
	 */
	@Override
	public FeatureDetection_SingularFeature_Entries_MinMax_ID__For_FeatureDetectionRootId_Searcher_Result  get_MinMax_ID_ForFeatureDetectionRootId( int featureDetectionRootId ) throws Exception {

		FeatureDetection_SingularFeature_Entries_MinMax_ID__For_FeatureDetectionRootId_Searcher_Result result = null;
		
		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, featureDetectionRootId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = new FeatureDetection_SingularFeature_Entries_MinMax_ID__For_FeatureDetectionRootId_Searcher_Result();
					result.minId = rs.getInt( "min_id" );
					result.maxId = rs.getInt( "max_id" );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
