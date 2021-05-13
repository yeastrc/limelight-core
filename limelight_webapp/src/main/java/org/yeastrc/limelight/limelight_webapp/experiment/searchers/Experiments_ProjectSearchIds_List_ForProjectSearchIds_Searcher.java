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
package org.yeastrc.limelight.limelight_webapp.experiment.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * 
 *
 */
@Component
public class Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher extends Limelight_JDBC_Base implements Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher.class );
	
	/**
	 * 
	 *
	 */
	public static class Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result {
		
		private int experimentId;
		private String experimentName;
		private boolean experimentIsDraft;
		private int projectId;
		private int projectSearchId;
		
		public int getExperimentId() {
			return experimentId;
		}
		public String getExperimentName() {
			return experimentName;
		}
		public int getProjectId() {
			return projectId;
		}
		public int getProjectSearchId() {
			return projectSearchId;
		}
		public boolean isExperimentIsDraft() {
			return experimentIsDraft;
		}
	}
		
	private static final String QUERY_SQL = 
			"SELECT "
			+ " experiment_tbl.id AS experiment_id, project_id, name, draft_flag, eapsi.project_search_id "
			+ " FROM "
			+ " experiment_tbl "
			+ " INNER JOIN experiment_assoc_project_search_id_tbl AS eapsi ON experiment_tbl.id = eapsi.assoc_main_id "
			+ " WHERE eapsi.project_search_id IN ( ";

	/**
	 * @param projectId
	 * @param draft - If set, restrict to this value
	 * @param userId - If set, restrict to user
	 * @return properties on objects set: id, name, createdByUserId
	 * @throws SQLException
	 */

	@Override
	public List<Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result>  getExperiments_ProjectSearchIds_List_ForProjectSearchIds( Set<Integer> projectSearchIds ) throws SQLException {
		
		if ( projectSearchIds == null ) {
			throw new IllegalArgumentException( "projectSearchIds == null" );
		}
		if ( projectSearchIds.isEmpty() ) {
			throw new IllegalArgumentException( "projectSearchIds.isEmpty()" );
		}
		
		List<Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result> resultList = new ArrayList<>();
		
		StringBuilder querySB = new StringBuilder( 10000 );
		
		querySB.append( QUERY_SQL );
		
		for ( int counter = 0; counter < projectSearchIds.size(); counter++ ) {
			
			if ( counter != 0 ) {
				querySB.append( "," );
			}
			querySB.append( "?" );
		}
		
		querySB.append( ")" );

		String querySQL = querySB.toString();
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			for ( Integer projectSearchId : projectSearchIds ) {
				counter++;
				preparedStatement.setInt( counter, projectSearchId );
			}

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result item = new Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result();
					item.experimentId = rs.getInt( "experiment_id" );
					item.projectId = rs.getInt( "project_id" );
					item.experimentName = rs.getString( "name" );
					{
						int draftInt = rs.getInt( "draft_flag" );
						if ( ! rs.wasNull() ) {
							if ( draftInt == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
								item.experimentIsDraft = true;
							}
						}
					}
					item.projectSearchId = rs.getInt( "project_search_id" );
										
					resultList.add( item );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
	}
	
}
