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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Get the search id for project search ids
 *
 */
@Component
public class ProjectIdsForProjectSearchIdsSearcher extends Limelight_JDBC_Base implements ProjectIdsForProjectSearchIdsSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( ProjectIdsForProjectSearchIdsSearcher.class );
		
//	private static final String DISTINCT_LIST_QUERY_SQL = 
//			"SELECT DISTINCT project_search_tbl.project_id "
//			+ " FROM "
//			+ " project_search_tbl "
//			+ " WHERE project_search_tbl.id IN ";
//
//	/* (non-Javadoc)
//	 * @see org.yeastrc.limelight.limelight_webapp.searchers.ProjectIdsForProjectSearchIdsSearcherIF#getSearchListForProjectId(java.util.List)
//	 */
//	@Override
//	public List<Integer> getProjectIdListForProjectSearchIds( List<Integer> projectSearchIds ) throws SQLException {
//
//		if ( projectSearchIds == null || projectSearchIds.isEmpty() ) {
//			throw new IllegalArgumentException( "( projectSearchIds == null || projectSearchIds.isEmpty() )" );
//		}
//		
//		List<Integer> resultList = new ArrayList<>( 20 );
//		
//		StringBuilder querySQL_SB = new StringBuilder( 1000 );
//		querySQL_SB.append( DISTINCT_LIST_QUERY_SQL );
//		
//		querySQL_SB.append( " ( " );
//		
//		int projectSearchIdsSize = projectSearchIds.size();
//		for ( int i = 0; i < projectSearchIdsSize; i++ ) {
//			
//			if ( i != 0 ) {
//				querySQL_SB.append( " , " );
//			}
//			querySQL_SB.append( " ? " );
//		}
//		
//		querySQL_SB.append( " ) " );
//
//		final String querySQL = querySQL_SB.toString();
//				
//		try ( Connection connection = super.getDBConnection();
//			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
//			
//			int counter = 0;
//			
//			for ( Integer projectSearchId : projectSearchIds ) {
//				counter++;
//				preparedStatement.setInt( counter, projectSearchId );
//			}
//			try ( ResultSet rs = preparedStatement.executeQuery() ) {
//				while ( rs.next() ) {
//					resultList.add( rs.getInt( "project_id" ) );
//				}
//			}
//		} catch ( SQLException e ) {
//			log.error( "error running SQL: " + querySQL, e );
//			throw e;
//		}
//		
//		return resultList;
//	}

	private static final String MAPPING_QUERY_SQL = 
			"SELECT id, project_id "
			+ " FROM "
			+ " project_search_tbl "
			+ " WHERE id IN ";

	/**
	 * @param projectSearchIds
	 * @return Map<ProjectSearchId, ProjectId>
	 * @throws SQLException
	 */
	@Override
	public Map<Integer,Integer> getProjectIdMappingForProjectSearchIds( List<Integer> projectSearchIds ) throws SQLException {

		if ( projectSearchIds == null || projectSearchIds.isEmpty() ) {
			throw new IllegalArgumentException( "( projectSearchIds == null || projectSearchIds.isEmpty() )" );
		}

		for ( Integer projectSearchId : projectSearchIds ) {
			if ( projectSearchId == null ) {
				throw new IllegalArgumentException( "Entry in projectSearchIds is null: ( projectSearchId == null )" );
			}
		}
		
		Map<Integer,Integer> resultMap = new HashMap<>();
		
		StringBuilder querySQL_SB = new StringBuilder( 1000 );
		querySQL_SB.append( MAPPING_QUERY_SQL );
		
		querySQL_SB.append( " ( " );
		
		int projectSearchIdsSize = projectSearchIds.size();
		for ( int i = 0; i < projectSearchIdsSize; i++ ) {
			
			if ( i != 0 ) {
				querySQL_SB.append( " , " );
			}
			querySQL_SB.append( " ? " );
		}
		
		querySQL_SB.append( " ) " );

		final String querySQL = querySQL_SB.toString();
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			for ( Integer projectSearchId : projectSearchIds ) {
				counter++;
				preparedStatement.setInt( counter, projectSearchId );
			}
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					resultMap.put( rs.getInt( "id" ), rs.getInt( "project_id" ) );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultMap;
	}
	
}
