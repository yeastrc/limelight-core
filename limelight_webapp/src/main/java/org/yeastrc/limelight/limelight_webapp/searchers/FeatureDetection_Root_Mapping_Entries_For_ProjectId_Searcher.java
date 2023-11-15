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
 * Get the feature_detection_root_tbl and project_scan_file_tbl For Project Id 
 *
 */
@Component
public class FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher extends Limelight_JDBC_Base implements FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher.class );
	
	/**
	 * 
	 *
	 */
	public static class FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result {
		private List<FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result_Item> entries;

		public List<FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result_Item> getEntries() {
			return entries;
		}
	}

	/**
	 * 
	 *
	 */
	public static class FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result_Item {
		
		private int feature_detection_root__project_scnfl_mapping_tbl__id;
		private int project_scan_file_id;
		
		private String displayLabel;
		private String description;
		
		public int getFeature_detection_root__project_scnfl_mapping_tbl__id() {
			return feature_detection_root__project_scnfl_mapping_tbl__id;
		}
		public int getProject_scan_file_id() {
			return project_scan_file_id;
		}
		public String getDisplayLabel() {
			return displayLabel;
		}
		public String getDescription() {
			return description;
		}
	}
	
	private static final String QUERY_SQL = 
			"SELECT "
			+ " feature_detection_root__project_scnfl_mapping_tbl.id AS feature_detection_root__project_scnfl_mapping_tbl__id, "
			+ " feature_detection_root__project_scnfl_mapping_tbl.display_label, "
			+ " feature_detection_root__project_scnfl_mapping_tbl.description, "
			+ " project_scan_file_tbl.id AS project_scan_file_id "
			
			+ " FROM project_scan_file_tbl "
			
			+ " INNER JOIN feature_detection_root__project_scnfl_mapping_tbl ON project_scan_file_tbl.id = feature_detection_root__project_scnfl_mapping_tbl.project_scan_file_id "
			
			+ " WHERE project_scan_file_tbl.project_id = ? ";
			

	@Override
	public FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result  getForProjectId( int projectId ) throws Exception {

		FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result result = new FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result();
		
		List<FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result_Item> entries = new ArrayList<>();
		result.entries = entries;
		
		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, projectId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result_Item entry = new FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result_Item();
					entry.feature_detection_root__project_scnfl_mapping_tbl__id = rs.getInt( "feature_detection_root__project_scnfl_mapping_tbl__id" );
					entry.project_scan_file_id = rs.getInt( "project_scan_file_id" );
					entry.displayLabel = rs.getString( "display_label" );
					entry.description = rs.getString( "description" );

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
