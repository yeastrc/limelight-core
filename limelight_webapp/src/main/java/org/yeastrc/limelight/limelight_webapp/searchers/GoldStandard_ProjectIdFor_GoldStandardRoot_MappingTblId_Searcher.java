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
 * Get the project_scan_file_tbl.project_id for gold_standard_for_scan_file_root__project_scnfl_mapping_tbl.id 
 *
 */
@Component
public class GoldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher extends Limelight_JDBC_Base implements GoldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( GoldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher.class );
	
	/**
	 * 
	 *
	 */
	public static class GoldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher_Result {
		private int projectId;

		public int getProjectId() {
			return projectId;
		}
	}
	
	private static final String QUERY_SQL = 
			"SELECT "
			+ " project_scan_file_tbl.project_id "
			+ " FROM "
			+ " gold_standard_for_scan_file_root__project_scnfl_mapping_tbl "
			+ " INNER JOIN project_scan_file_tbl ON gold_standard_for_scan_file_root__project_scnfl_mapping_tbl.project_scan_file_id = project_scan_file_tbl.id"
			+ " WHERE gold_standard_for_scan_file_root__project_scnfl_mapping_tbl.id = ?";

	
	@Override
	public GoldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher_Result  getProjectIdFor_GoldStandardRoot_MappingTblId( int goldStandardRoot_MappingTblId ) throws Exception {

		GoldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher_Result result = null;
				
		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, goldStandardRoot_MappingTblId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = new GoldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher_Result();

					result.projectId = rs.getInt( "project_id" );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
