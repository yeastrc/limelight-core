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
 * Feature_detection_root_Id For Project Search Id JOIN feature_detection_root__project_scnfl_mapping_tbl__id 
 *
 */
@Component
public class Feature_detection_root_Id_For_Feature_detection_root__project_scnfl_mapping_tbl_id__ProjectSearchId_Searcher extends Limelight_JDBC_Base implements Feature_detection_root_Id_For_Feature_detection_root__project_scnfl_mapping_tbl_id__ProjectSearchId_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( Feature_detection_root_Id_For_Feature_detection_root__project_scnfl_mapping_tbl_id__ProjectSearchId_Searcher.class );
	
	/**
	 * 
	 *
	 */
	public static final class Feature_detection_root_Id_For_Feature_detection_root__project_scnfl_mapping_tbl_id__ProjectSearchId_Searcher_Result {
		
		private int feature_detection_root_id;
		private int project_scan_file_id;
		
		public int getFeature_detection_root_id() {
			return feature_detection_root_id;
		}
		public int getProject_scan_file_id() {
			return project_scan_file_id;
		}
	}
		
	private static final String QUERY_SQL = 
			"SELECT "
			+ " feature_detection_root__project_scnfl_mapping_tbl.feature_detection_root_id, feature_detection_root__project_scnfl_mapping_tbl.project_scan_file_id "
			+ " FROM "
			+ " ( " // Subselect to remove duplicates
			+    " SELECT"
			+       " DISTINCT project_scan_filename_tbl.project_scan_file_id "
			+      " FROM "
			+      " project_scan_filename__search_scan_file__mapping_tbl "
			+      " INNER JOIN project_scan_filename_tbl ON project_scan_filename__search_scan_file__mapping_tbl.project_scan_filename_id = project_scan_filename_tbl.id "

			+      " WHERE project_scan_filename__search_scan_file__mapping_tbl.project_search_id = ? "
			
			+ " ) AS project_scan_file_id_records "
			
			+ " INNER JOIN feature_detection_root__project_scnfl_mapping_tbl ON project_scan_file_id_records.project_scan_file_id = feature_detection_root__project_scnfl_mapping_tbl.project_scan_file_id "
			+ ""
			+ " WHERE feature_detection_root__project_scnfl_mapping_tbl.id = ?";
			
	
	
	@Override
	public Feature_detection_root_Id_For_Feature_detection_root__project_scnfl_mapping_tbl_id__ProjectSearchId_Searcher_Result
	feature_detection_root__project_scnfl_mapping_tbl__id_ValidateIsIn_ProjectSearchId__For_projectSearchId_feature_detection_root__project_scnfl_mapping_tbl__id(
			
			int projectSearchId, int feature_detection_root__project_scnfl_mapping_tbl__id ) throws Exception {

		Feature_detection_root_Id_For_Feature_detection_root__project_scnfl_mapping_tbl_id__ProjectSearchId_Searcher_Result result = null;
		
		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, projectSearchId );

			counter++;
			preparedStatement.setInt( counter, feature_detection_root__project_scnfl_mapping_tbl__id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = new Feature_detection_root_Id_For_Feature_detection_root__project_scnfl_mapping_tbl_id__ProjectSearchId_Searcher_Result();
					result.feature_detection_root_id = rs.getInt( "feature_detection_root_id" );
					result.project_scan_file_id = rs.getInt( "project_scan_file_id" );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
