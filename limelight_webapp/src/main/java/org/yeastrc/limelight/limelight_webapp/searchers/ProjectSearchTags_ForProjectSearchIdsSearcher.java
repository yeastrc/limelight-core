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
 * Project Search Tags for Search Details (When Expand a Search)
 *
 */
@Component
public class ProjectSearchTags_ForProjectSearchIdsSearcher extends Limelight_JDBC_Base implements ProjectSearchTags_ForProjectSearchIdsSearcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearchTags_ForProjectSearchIdsSearcher.class );
	
	/**
	 * 
	 *
	 */
	public static class ProjectSearchTags_ForProjectSearchIdsSearcher_ResultItem {
		
		private int projectSearchId;
		private int tag_id;
		private int tag_category_id;  // Set to id of special category record for uncategorized if uncategorized 
		private String tag_string;
		private String tag_Color_Font;
    	private String tag_Color_Background;
    	private String tag_Color_Border;
		
		public int getProjectSearchId() {
			return projectSearchId;
		}
		public int getTag_id() {
			return tag_id;
		}
		public String getTag_string() {
			return tag_string;
		}
		public String getTag_Color_Font() {
			return tag_Color_Font;
		}
		public String getTag_Color_Background() {
			return tag_Color_Background;
		}
		public String getTag_Color_Border() {
			return tag_Color_Border;
		}
		public int getTag_category_id() {
			return tag_category_id;
		}
		
	}
	
	private static final String MAIN_QUERY_SQL = 
			" SELECT "
			+ " project_search_tag_strings_in_project_tbl.id, project_search_tag_strings_in_project_tbl.tag_category_id, "
			+ " project_search_tag_strings_in_project_tbl.tag_string, "
			+ " project_search_tag_strings_in_project_tbl.tag_color_font, project_search_tag_strings_in_project_tbl.tag_color_background,"
			+ " project_search_tag_strings_in_project_tbl.tag_color_border, "
			+ " project_search_tag_mapping_tbl.project_search_id "
			+ " FROM "
			+ " project_search_tag_strings_in_project_tbl "
			+ " INNER JOIN project_search_tag_mapping_tbl ON project_search_tag_strings_in_project_tbl.id = project_search_tag_mapping_tbl.project_search_tag_strings_in_project_id"
			+ " WHERE project_search_tag_mapping_tbl.project_search_id IN ( ";
	
	private static final String QUERY_SQL_SINGLE_PROJECT_SEARCH_ID = 
			MAIN_QUERY_SQL + " ? )";
	

	/**
	 * @param projectSearchIds
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<ProjectSearchTags_ForProjectSearchIdsSearcher_ResultItem>  getProjectSearchTags_ForProjectSearchIds( List<Integer> projectSearchIds ) throws SQLException {

		if ( projectSearchIds == null || projectSearchIds.isEmpty() ) {
			throw new IllegalArgumentException( "projectSearchIds is null or empty" );
		}
		
		List<ProjectSearchTags_ForProjectSearchIdsSearcher_ResultItem> results = new ArrayList<>();

		String querySQL = QUERY_SQL_SINGLE_PROJECT_SEARCH_ID;
		
		if ( projectSearchIds.size() == 1 ) {
			//  Single Project Search Id, use one of hard coded SQL
			
			querySQL = QUERY_SQL_SINGLE_PROJECT_SEARCH_ID;
			
		} else {
			StringBuilder querySQL_SB = new StringBuilder( 100000 );
			querySQL_SB.append( MAIN_QUERY_SQL );
			for ( int count = 0; count < projectSearchIds.size(); count++ ) {
				if ( count != 0 ) {
					querySQL_SB.append( ", " );
				}
				querySQL_SB.append( "? " );
			}
			querySQL_SB.append( " )" );
			querySQL = querySQL_SB.toString();
		}
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			for ( Integer projectSearchId : projectSearchIds ) {
				counter++;
				preparedStatement.setInt( counter, projectSearchId );
			}
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ProjectSearchTags_ForProjectSearchIdsSearcher_ResultItem result = new ProjectSearchTags_ForProjectSearchIdsSearcher_ResultItem();
					result.tag_id = rs.getInt( "id" );
					result.tag_category_id = rs.getInt( "tag_category_id" );
					result.tag_string = rs.getString( "tag_string" );
					result.tag_Color_Font = rs.getString( "tag_color_font" );
					result.tag_Color_Background = rs.getString( "tag_color_background" );
					result.tag_Color_Border= rs.getString( "tag_color_border" );
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
