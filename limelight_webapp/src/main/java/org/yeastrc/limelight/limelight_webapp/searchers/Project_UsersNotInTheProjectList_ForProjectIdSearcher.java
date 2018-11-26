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
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.searchers_results.Project_UsersNotInTheProjectList_ForProjectIdSearcherItem;

/**
 * 
 *
 */
@Component
public class Project_UsersNotInTheProjectList_ForProjectIdSearcher extends Limelight_JDBC_Base implements Project_UsersNotInTheProjectList_ForProjectIdSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( Project_UsersNotInTheProjectList_ForProjectIdSearcher.class );
	
	private static final String QUERY_SQL = 
			"SELECT user_tbl.id , user_tbl.user_mgmt_user_id "
			+ " FROM user_tbl "
			+ " LEFT OUTER JOIN ( "
			//  Subquery to get all user ids currently for this project
			+ " SELECT user_tbl.id "
			+ " FROM "
			+ " project_user_tbl"
			+ " INNER JOIN user_tbl ON project_user_tbl.user_id = user_tbl.id "
			+ " WHERE project_user_tbl.project_id = ? "
			
			+ " ) AS users_in_project ON user_tbl.id = users_in_project.id "
			+ " WHERE users_in_project.id IS NULL "
			+ " AND user_tbl.enabled_app_specific = " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE;
	
	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<Project_UsersNotInTheProjectList_ForProjectIdSearcherItem>  getProject_UsersNotInTheProjectList_ForProjectIdSearcher( int projectId ) throws SQLException {

		List<Project_UsersNotInTheProjectList_ForProjectIdSearcherItem> resultList = new ArrayList<>();

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					Project_UsersNotInTheProjectList_ForProjectIdSearcherItem item = new Project_UsersNotInTheProjectList_ForProjectIdSearcherItem();
					item.setUserId( rs.getInt( "id" ) );
					item.setUserMgmtUserId( rs.getInt( "user_mgmt_user_id" ) );
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
