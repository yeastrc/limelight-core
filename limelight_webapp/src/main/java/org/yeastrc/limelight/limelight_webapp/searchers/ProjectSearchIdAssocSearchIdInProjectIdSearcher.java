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
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchRecordStatus;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.objects.ProjectListItem;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ProjectToCopyToResultItem;

/**
 * Is the SearchId associated with a ProjectSearchId in the ProjectId where project_search is not marked for deletion
 *
 */
@Component
public class ProjectSearchIdAssocSearchIdInProjectIdSearcher extends Limelight_JDBC_Base implements ProjectSearchIdAssocSearchIdInProjectIdSearcherIF  {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearchIdAssocSearchIdInProjectIdSearcher.class );
	
	private static final String isSearchIdAssocWithProjectSearchIdInProjectId_SQL =
			" SELECT from_project_search.id "
			+ " FROM project_search_tbl AS from_project_search "
			+ " INNER JOIN project_search_tbl AS to_project_search "
			+    " ON from_project_search.search_id = to_project_search.search_id "
			+ " WHERE from_project_search.id = ? AND to_project_search.project_id = ? "
			+ " AND to_project_search.status_id = " + SearchRecordStatus.IMPORT_COMPLETE_VIEW.value();
	/**
	 * Is the SearchId associated with a ProjectSearchId in the ProjectId where project_search is not marked for deletion
	 * 
	 * @param projectSearchId
	 * @param projectId
	 * @return
	 * @throws Exception 
	 */
	@Override
	public boolean isSearchIdAssocWithProjectSearchIdInProjectId( int projectSearchId, int projectId ) throws Exception {
		
		boolean result = false;
		
		final String querySQL = isSearchIdAssocWithProjectSearchIdInProjectId_SQL;

		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			preparedStatement.setInt( 1, projectSearchId );
			preparedStatement.setInt( 2, projectId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() )
					result = true;
			}
		} catch ( Exception e ) {
			String msg = "Exception in isSearchIdAssocWithProjectSearchIdInProjectId( ... ): sql: " + querySQL;
			log.error( msg );
			throw e;
		}
		return result;
	}

}
