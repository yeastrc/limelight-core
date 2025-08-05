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
 * Get the search id for a project search id list
 *
 */
@Component
public class SearchIds_For_ProjectSearchIdList_Searcher extends Limelight_JDBC_Base implements SearchIds_For_ProjectSearchIdList_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( SearchIds_For_ProjectSearchIdList_Searcher.class );
	
	public static class SearchIdForProjectSearchIdListSearcher_ResultItem {
		
		private int projectSearchId;
		private int searchId;
		
		public int getProjectSearchId() {
			return projectSearchId;
		}
		public int getSearchId() {
			return searchId;
		}
	}
		
	private static final String QUERY_SQL = 
			"SELECT search_id, id "
			+ " FROM "
			+ " project_search_tbl "
			+ " WHERE project_search_tbl.id IN ";

	
	@Override
	public List<SearchIdForProjectSearchIdListSearcher_ResultItem>  get_SearchIds_For_ProjectSearchIdList( List<Integer> projectSearchIdList ) throws SQLException {

		if ( projectSearchIdList == null ) {
			throw new IllegalArgumentException( "projectSearchIdList is null" );
		}
		
		List<SearchIdForProjectSearchIdListSearcher_ResultItem> resultList = new ArrayList<>( projectSearchIdList.size() );
		
		if ( projectSearchIdList.isEmpty() ) {
			return resultList;
		}
		
		StringBuilder sqlSB = new StringBuilder( QUERY_SQL );
		
		sqlSB.append( "(" );
		
		for ( int counter = 1; counter <= projectSearchIdList.size(); counter++ ) {
			
			if ( counter != 1 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		
		
		sqlSB.append( ")" );

		final String querySQL = sqlSB.toString();
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			
			int counter = 0;
			
			for ( Integer projectSearchId : projectSearchIdList ) {
				counter++;
				preparedStatement.setInt( counter, projectSearchId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					
					SearchIdForProjectSearchIdListSearcher_ResultItem resultItem = new SearchIdForProjectSearchIdListSearcher_ResultItem();
					resultItem.searchId = rs.getInt( "search_id" );
					resultItem.projectSearchId = rs.getInt( "id" );
					resultList.add( resultItem );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
	}
	
}
