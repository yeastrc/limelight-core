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
import java.util.Collection;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Project Search Tag Categories for specific ids restricted to project id
 *
 */
@Component
public class ProjectSearchTagCategories_ForIdsAndProjectId_Searcher extends Limelight_JDBC_Base implements ProjectSearchTagCategories_ForIdsAndProjectId_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearchTagCategories_ForIdsAndProjectId_Searcher.class );
	
	/**
	 * 
	 *
	 */
	public static class ProjectSearchTagCategories_ForIdsAndProjectId_Searcher_ResultItem {
		
		private int category_id;
		private String category_label;
		private String label_Color_Font;
    	private String label_Color_Background;
    	private String label_Color_Border;
    	
		public int getCategory_id() {
			return category_id;
		}
		public String getCategory_label() {
			return category_label;
		}
		public String getLabel_Color_Font() {
			return label_Color_Font;
		}
		public String getLabel_Color_Background() {
			return label_Color_Background;
		}
		public String getLabel_Color_Border() {
			return label_Color_Border;
		}
				
	}
	
	private static final String QUERY_SQL = 
			" SELECT id, category_label, label_color_font, label_color_background, label_color_border "
			+ " FROM "
			+ " project_search_tag_category_in_project_tbl "
			
			+ " WHERE project_id = ? AND id IN (";

	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */
	
	@Override
	public List<ProjectSearchTagCategories_ForIdsAndProjectId_Searcher_ResultItem>  getProjectSearchTagCategories_ForIdsAndProjectId( Collection<Integer> ids, int projectId ) throws SQLException {
		
		if ( ids == null || ids.isEmpty() ) {
			throw new IllegalArgumentException( "ids == null || ids.isEmpty()" );
		}

		List<ProjectSearchTagCategories_ForIdsAndProjectId_Searcher_ResultItem> results = new ArrayList<>();
		
		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		sqlSB.append( QUERY_SQL );
		
		for ( int counter = 0; counter < ids.size(); counter++ ) {
			if ( counter != 0 ) {
				sqlSB.append( ", " );
			}
			sqlSB.append( "?" );
		}
		
		sqlSB.append( " )" );

		String querySQL = sqlSB.toString();
						
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, projectId );
			
			for ( Integer id : ids ) {

				counter++;
				preparedStatement.setInt( counter, id );
			}

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ProjectSearchTagCategories_ForIdsAndProjectId_Searcher_ResultItem result = new ProjectSearchTagCategories_ForIdsAndProjectId_Searcher_ResultItem();
					result.category_id = rs.getInt( "id" );
					result.category_label = rs.getString( "category_label" );
					result.label_Color_Font = rs.getString( "label_color_font" );
					result.label_Color_Background = rs.getString( "label_color_background" );
					result.label_Color_Border = rs.getString( "label_color_border" );
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
