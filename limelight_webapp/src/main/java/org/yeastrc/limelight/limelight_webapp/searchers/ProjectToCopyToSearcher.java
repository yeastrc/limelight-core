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
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.objects.ProjectListItem;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ProjectToCopyToResultItem;

/**
 * Find projects that can copy to
 *
 */
@Component
public class ProjectToCopyToSearcher extends Limelight_JDBC_Base implements ProjectToCopyToSearcherIF   {

	private static final Logger log = LoggerFactory.getLogger( ProjectToCopyToSearcher.class );
	
//	private static final String anyProjectsExistExcludingProjectId_SQL =
//			"SELECT id FROM project "
//			+ " WHERE id != ? "
//			+ " AND enabled = 1 AND marked_for_deletion = 0 AND project_locked = 0 LIMIT 1";
//
//	/**
//	 * @param projectId
//	 * @return
//	 * @throws Exception
//	 */
//	@Override
//	public boolean anyProjectsExistExcludingProjectId( int projectId ) throws Exception {
//		
//		boolean result = false;
//
//		final String querySQL = anyProjectsExistExcludingProjectId_SQL;
//		
//		try ( Connection connection = super.getDBConnection();
//			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
//			
//			preparedStatement.setInt( 1, projectId );
//			try ( ResultSet rs = preparedStatement.executeQuery() ) {
//				if( rs.next() ) {
//					result = true;
//				}
//			}
//		} catch ( Exception e ) {
//			String msg = "anyProjectsExistExcludingProjectId(...), projectId: " + projectId + ", sql: " + querySQL;
//			log.error( msg, e );
//			throw e;
//		}
//		return result;
//	}
	
	private static final String getAllExcludingProjectId_SQL =
			"SELECT id, title "
			+ " FROM project_tbl WHERE id != ?"
			+ " AND enabled = 1 AND marked_for_deletion = 0 AND project_locked = 0"
			+ " ORDER BY title";
	/**
	 * @param projectId
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<ProjectToCopyToResultItem> getAllExcludingProjectId( int projectId ) throws Exception {

		List<ProjectToCopyToResultItem>  returnList = new ArrayList<>();
		
		final String querySQL = getAllExcludingProjectId_SQL;

		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					ProjectToCopyToResultItem returnItem = populateProjectToCopyToResultItemFromResultObject( rs );
					returnList.add(returnItem);
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select ProjectDTO, projectId: " + projectId + ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return returnList;
	}
	
//	private static final String anyProjectsExistForAuthUserExcludingProjectId_SQL = "SELECT project.id FROM project " 
//			+ " INNER JOIN auth_shared_object_users ON project.auth_shareable_object_id = auth_shared_object_users.shared_object_id"
//			+ " WHERE auth_shared_object_users.user_id = ? AND auth_shared_object_users.access_level <= ?"
//			+ " AND project.id != ? "
//			+ " AND project.enabled = 1 AND project.marked_for_deletion = 0 AND project_locked = 0 "
//			+ " LIMIT 1";
//	/**
//	 * @param authUserId
//	 * @param maxAuthLevel
//	 * @param projectId
//	 * @return
//	 * @throws Exception
//	 */
//	@Override
//	public boolean anyProjectsExistForAuthUserExcludingProjectId( int authUserId, int maxAuthLevel, int projectId ) throws Exception {
//		
//		boolean result = false;
//
//		final String querySQL = anyProjectsExistForAuthUserExcludingProjectId_SQL; 
//		
//		try ( Connection connection = super.getDBConnection();
//			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
//			preparedStatement.setInt( 1, authUserId );
//			preparedStatement.setInt( 2, maxAuthLevel );
//			preparedStatement.setInt( 3, projectId );
//			try ( ResultSet rs = preparedStatement.executeQuery() ) {
//				if( rs.next() ) {
//					result = true;
//				}
//			}
//		} catch ( Exception e ) {
//			String msg = "anyProjectsExistForAuthUserExcludingProjectId(...), projectId: " + projectId + ", sql: " + querySQL;
//			log.error( msg, e );
//			throw e;
//		}
//		return result;
//	}
	
	///////////
	private static final String getForUserExcludingProjectId_SQL = 
			"SELECT project_tbl.id, project_tbl.title "
			+ " FROM project_tbl " 
			+ " INNER JOIN project_user_tbl ON project_tbl.id = project_user_tbl.project_id"
			+ " WHERE project_user_tbl.user_id = ? AND project_user_tbl.access_level <= ?"
			+ " AND project_tbl.id != ? "
			+ " AND project_tbl.enabled = 1 AND project_tbl.marked_for_deletion = 0 AND project_tbl.project_locked = 0"
			+ " ORDER BY project_tbl.title";
	/**
	 * @param authUserId
	 * @param maxAuthLevel
	 * @param projectId
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<ProjectToCopyToResultItem> getForAuthUserExcludingProjectId( int authUserId, int maxAuthLevel, int projectId ) throws Exception {

		List<ProjectToCopyToResultItem>  returnList = new ArrayList<>();
		
		final String querySQL = getForUserExcludingProjectId_SQL; 
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {

			preparedStatement.setInt( 1, authUserId );
			preparedStatement.setInt( 2, maxAuthLevel );
			preparedStatement.setInt( 3, projectId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					ProjectToCopyToResultItem returnItem = populateProjectToCopyToResultItemFromResultObject( rs );
					returnList.add(returnItem);
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select ProjectDTO, projectId: " + projectId + ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return returnList;
	}
	
	/**
	 * @param rs
	 * @return
	 * @throws SQLException 
	 */
	private ProjectToCopyToResultItem populateProjectToCopyToResultItemFromResultObject( ResultSet rs ) throws SQLException {
		ProjectToCopyToResultItem item = new ProjectToCopyToResultItem();
		item.setProjectId( rs.getInt( "id" ) );
		item.setProjectTitle( rs.getString( "title" ) );
		return item;
	}


}
