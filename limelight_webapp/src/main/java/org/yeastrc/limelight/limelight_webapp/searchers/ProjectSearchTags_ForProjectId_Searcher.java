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
 * Project Search Tags in a project
 *
 */
@Component
public class ProjectSearchTags_ForProjectId_Searcher extends Limelight_JDBC_Base implements ProjectSearchTags_ForProjectId_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearchTags_ForProjectId_Searcher.class );
	
	/**
	 * 
	 *
	 */
	public static class ProjectSearchTags_ForProjectId_Searcher_ResultItem {
		
		private int tag_id;
		private int tag_category_id;
		private String tag_string;
		private String tag_Color_Font;
    	private String tag_Color_Background;
    	private String tag_Color_Border;
		
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
	
	private static final String QUERY_SQL = 
			" SELECT id, tag_category_id, tag_string, tag_color_font, tag_color_background, tag_color_border "
			+ " FROM "
			+ " project_search_tag_strings_in_project_tbl "
			
			+ " WHERE project_search_tag_strings_in_project_tbl.project_id = ? ";

	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */
	
	@Override
	public List<ProjectSearchTags_ForProjectId_Searcher_ResultItem>  getProjectSearchTags_ForProjectId( int projectId ) throws SQLException {

		List<ProjectSearchTags_ForProjectId_Searcher_ResultItem> results = new ArrayList<>();

		String querySQL = QUERY_SQL;
						
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, projectId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ProjectSearchTags_ForProjectId_Searcher_ResultItem result = new ProjectSearchTags_ForProjectId_Searcher_ResultItem();
					result.tag_id = rs.getInt( "id" );
					result.tag_category_id = rs.getInt( "tag_category_id" );
					result.tag_string = rs.getString( "tag_string" );
					result.tag_Color_Font = rs.getString( "tag_color_font" );
					result.tag_Color_Background = rs.getString( "tag_color_background" );
					result.tag_Color_Border = rs.getString( "tag_color_border" );
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
