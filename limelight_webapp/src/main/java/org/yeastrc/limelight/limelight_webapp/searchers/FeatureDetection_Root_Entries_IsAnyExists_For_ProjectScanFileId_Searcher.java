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
 * Get For Project Scan File Id - Is Any Exists feature_detection_root_tbl AND feature_detection_root__project_scnfl_mapping_tbl
 *
 */
@Component
public class FeatureDetection_Root_Entries_IsAnyExists_For_ProjectScanFileId_Searcher extends Limelight_JDBC_Base implements FeatureDetection_Root_Entries_IsAnyExists_For_ProjectScanFileId_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( FeatureDetection_Root_Entries_IsAnyExists_For_ProjectScanFileId_Searcher.class );
	
	private static final String QUERY_SQL = 
			"SELECT "
			+ " feature_detection_root__project_scnfl_mapping_tbl.id "
			+ " FROM "
			+ " feature_detection_root_tbl "
			+ " INNER JOIN feature_detection_root__project_scnfl_mapping_tbl ON feature_detection_root_tbl.id = feature_detection_root__project_scnfl_mapping_tbl.feature_detection_root_id "
			+ " WHERE "
			+ " feature_detection_root__project_scnfl_mapping_tbl.project_scan_file_id = ?"
			+ " LIMIT 1 ";
		
	@Override
	public boolean  is_AnyExists_ForProjectScanFileId( int projectScanFileId ) throws Exception {

		boolean result = false;
		
		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, projectScanFileId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = true;
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
