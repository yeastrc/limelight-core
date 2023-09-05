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
 * Get if ANY records exist in: gold_standard_for_scan_file_root__project_scnfl_mapping_tbl and search_scan_file_tbl For Project Search Id 
 *
 */
@Component
public class GoldStandard_Root_Mapping_AnyEntriesExist_For_ProjectSearchId_Searcher extends Limelight_JDBC_Base implements GoldStandard_Root_Mapping_AnyEntriesExist_For_ProjectSearchId_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( GoldStandard_Root_Mapping_AnyEntriesExist_For_ProjectSearchId_Searcher.class );
	
	/**
	 * 
	 *
	 */
	public static class GoldStandard_Root_Mapping_AnyEntriesExist_For_ProjectSearchId_Searcher_Result {
		private boolean anyEntriesExist;

		public boolean isAnyEntriesExist() {
			return anyEntriesExist;
		}
	}

	
	private static final String QUERY_SQL = 
			"SELECT "
			+ " gold_standard_for_scan_file_root__project_scnfl_mapping_tbl.id AS gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id, "
			+ " gold_standard_for_scan_file_root__project_scnfl_mapping_tbl.display_label, "
			+ " gold_standard_for_scan_file_root__project_scnfl_mapping_tbl.description, "
			+ " project_scan_file_id_records.project_scan_file_id " // from subselect
			+ " FROM "
			+ " ( " // Subselect to remove duplicates
			+    " SELECT"
			+       " DISTINCT project_scan_filename_tbl.project_scan_file_id "
			+      " FROM "
			+      " project_scan_filename__search_scan_file__mapping_tbl "
			+      " INNER JOIN project_scan_filename_tbl ON project_scan_filename__search_scan_file__mapping_tbl.project_scan_filename_id = project_scan_filename_tbl.id "

			+      " WHERE project_scan_filename__search_scan_file__mapping_tbl.project_search_id = ? "
			
			+ " ) AS project_scan_file_id_records "
			
			+ " INNER JOIN gold_standard_for_scan_file_root__project_scnfl_mapping_tbl ON project_scan_file_id_records.project_scan_file_id = gold_standard_for_scan_file_root__project_scnfl_mapping_tbl.project_scan_file_id "
			+ " LIMIT 1";
			

	
	@Override
	public GoldStandard_Root_Mapping_AnyEntriesExist_For_ProjectSearchId_Searcher_Result  getForProjectSearchId( int projectSearchId ) throws Exception {

		GoldStandard_Root_Mapping_AnyEntriesExist_For_ProjectSearchId_Searcher_Result result = new GoldStandard_Root_Mapping_AnyEntriesExist_For_ProjectSearchId_Searcher_Result();
				
		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, projectSearchId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result.anyEntriesExist = true;
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
