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
 * 
 *
 */
@Component
public class ProjectListForProjectIdListSearcher extends Limelight_JDBC_Base implements ProjectListForProjectIdListSearcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( ProjectListForProjectIdListSearcher.class );
	
	/**
	 * 
	 *
	 */
	public static class ProjectListForProjectIdListSearcher_ResultItem {
		
		private int id;
		private String title;
		public int getId() {
			return id;
		}
		public String getTitle() {
			return title;
		}
	}
	
	
	private static final String QUERY_SQL = 
			" SELECT project_tbl.id, project_tbl.title "
			+ " FROM project_tbl "
			+ " WHERE "
			+ " project_tbl.enabled = 1 AND project_tbl.marked_for_deletion = 0 "
			+ " AND id IN ( ";
		
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.ProjectListForProjectIdListSearcher_IF#getProjectListForProjectIdList(java.util.List)
	 */
	@Override
	public List<ProjectListForProjectIdListSearcher_ResultItem>  getProjectListForProjectIdList( List<Integer> projectIdList ) throws SQLException {

		List<ProjectListForProjectIdListSearcher_ResultItem> resultList = new ArrayList<>();
		
		if ( projectIdList == null || projectIdList.isEmpty() ) {
			return resultList;
		}
		
		StringBuilder sqlAddition = new StringBuilder( 10000 );
		
		for ( int counter = 1; counter <= projectIdList.size(); counter++ ) {
			if ( counter != 1 ) {
				sqlAddition.append( "," );
			}
			sqlAddition.append( "?" );
		}
		sqlAddition.append( ")");

		final String querySQL = QUERY_SQL + sqlAddition.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			for ( Integer projectId : projectIdList ) {
				counter++;
				preparedStatement.setInt( counter, projectId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ProjectListForProjectIdListSearcher_ResultItem item = new ProjectListForProjectIdListSearcher_ResultItem();
					item.id = rs.getInt( "id" );
					item.title = rs.getString( "title" );

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
