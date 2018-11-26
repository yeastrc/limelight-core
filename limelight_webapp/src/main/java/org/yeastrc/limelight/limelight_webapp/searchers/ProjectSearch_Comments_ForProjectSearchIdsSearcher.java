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
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchCommentDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Comments for Search Details (When Expand a Search)
 *
 */
@Component
public class ProjectSearch_Comments_ForProjectSearchIdsSearcher extends Limelight_JDBC_Base implements ProjectSearch_Comments_ForProjectSearchIdsSearcherIF  {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearch_Comments_ForProjectSearchIdsSearcher.class );

	private static final String MAIN_QUERY_SQL = 
			" SELECT id, project_search_id, created_user_id, last_updated_user_id, last_updated_date_time, comment "
			+ " FROM "
			+ " project_search__comment_tbl "
			+ " WHERE project_search_id IN ( ";
	
	private static final String QUERY_SQL_SINGLE_PROJECT_SEARCH_ID = 
			MAIN_QUERY_SQL + " ? )";
	

	/**
	 * @param projectSearchIds
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<ProjectSearchCommentDTO>  getProjectSearchCommentDTO_ForProjectSearchIds( List<Integer> projectSearchIds ) throws SQLException {

		if ( projectSearchIds == null || projectSearchIds.isEmpty() ) {
			throw new IllegalArgumentException( "projectSearchIds is null or empty" );
		}
		
		List<ProjectSearchCommentDTO> results = new ArrayList<>();

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
					ProjectSearchCommentDTO result = new ProjectSearchCommentDTO();
					result.setId( rs.getInt( "id" ) );
					result.setProjectSearchId( rs.getInt( "project_search_id" ) );

					int userIdCreated = rs.getInt( "created_user_id" );
					if ( ! rs.wasNull() ) {
						result.setUserIdCreated( userIdCreated );
					}
					int userIdLastUpdated = rs.getInt( "last_updated_user_id" );
					if ( ! rs.wasNull() ) {
						result.setUserIdLastUpdated( userIdLastUpdated );
					}
					result.setTimestampLastUpdated( rs.getDate( "last_updated_date_time" ) );
					result.setCommentText( rs.getString( "comment" ) );
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
