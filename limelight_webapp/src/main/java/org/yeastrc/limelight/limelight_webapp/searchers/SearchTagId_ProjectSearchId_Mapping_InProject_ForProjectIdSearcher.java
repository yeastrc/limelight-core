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
 * Search Tag Id to Project Search Id Mapping for Project Id
 *
 */
@Component
public class SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher extends Limelight_JDBC_Base implements SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher.class );
	
	/**
	 * 
	 *
	 */
	public static class SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher_ResultItem {
		
		private int tag_id;
		private int projectSearchId;
		
		public int getTag_id() {
			return tag_id;
		}
		public int getProjectSearchId() {
			return projectSearchId;
		}
		
	}
	
	private static final String MAIN_QUERY_SQL = 
			" SELECT "
			+ " project_search_tag_strings_in_project_tbl.id, "
			+ " project_search_tag_mapping_tbl.project_search_id "
			+ " FROM "
			+ " project_search_tag_strings_in_project_tbl "
			+ " INNER JOIN project_search_tag_mapping_tbl ON project_search_tag_strings_in_project_tbl.id = project_search_tag_mapping_tbl.project_search_tag_strings_in_project_id"
			+ " WHERE project_search_tag_strings_in_project_tbl.project_id = ? ";
	
	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher_ResultItem>  get_SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectId( int projectId ) throws SQLException {

		List<SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher_ResultItem> results = new ArrayList<>();

		String querySQL = MAIN_QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			counter++;
			preparedStatement.setInt( counter, projectId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher_ResultItem result = new SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher_ResultItem();
					result.tag_id = rs.getInt( "id" );
					result.projectSearchId = rs.getInt( "project_search_id" );
					results.add(result);
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return results;
	}
	
}
