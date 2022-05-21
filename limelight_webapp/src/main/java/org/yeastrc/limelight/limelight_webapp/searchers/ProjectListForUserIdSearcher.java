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
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.objects.ProjectListItem;

/**
 * 
 *
 */
@Component
public class ProjectListForUserIdSearcher extends Limelight_JDBC_Base implements ProjectListForUserIdSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( ProjectListForUserIdSearcher.class );
	
	private static final String QUERY_SQL = 
			" SELECT project_tbl.id, project_tbl.title, project_tbl.project_locked, project_user_tbl.access_level,"
			+ " project_tbl.public_access_level, project_tbl.public_access_code_enabled "
			+ " FROM project_tbl "
			+ " INNER JOIN project_user_tbl ON project_tbl.id = project_user_tbl.project_id "
			+ " WHERE "
			+ " project_tbl.enabled = 1 AND project_tbl.marked_for_deletion = 0 "
			+ " AND project_user_tbl.user_id = ? "
			+ " AND project_user_tbl.access_level <= " + AuthAccessLevelConstants.ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY;
			
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.ProjectListForUserIdSearcherIF#getProjectListForUserId(int)
	 */
	@Override
	public List<ProjectListItem>  getProjectListForUserId( int userId ) throws SQLException {

		List<ProjectListItem> resultList = new ArrayList<>();

		final String querySQL = QUERY_SQL;
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, userId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ProjectListItem item = new ProjectListItem();
					item.setId( rs.getInt( "id" ) );
					item.setTitle( rs.getString( "title" ) );
					{
						int fieldIntValue = rs.getInt( "project_locked" );
						if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							item.setProjectLocked( true );
						}
					}
					{
						int public_access_level = rs.getInt( "public_access_level");
						if ( ! rs.wasNull() ) {
							if ( public_access_level == AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY ) {
								item.setProjectPublic(true);
							}
						}
					}
					{
						int public_access_code_enabled = rs.getInt("public_access_code_enabled");
						if ( ! rs.wasNull() ) {
							if ( public_access_code_enabled == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
								item.setProjectPublicAccessEnabled(true);
							}
						}
					}
					item.setUserAccessLevel( rs.getInt( "access_level" ) );
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
