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
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchSubGroupDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Get the ProjectSearchSubGroupDTO For a list of Project Search Id
 *
 */
@Component
public class ProjectSearchSubGroupDTOForProjectSearchIdSearcher extends Limelight_JDBC_Base implements ProjectSearchSubGroupDTOForProjectSearchIdSearcher_IF {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearchSubGroupDTOForProjectSearchIdSearcher.class );
	
	private static final String QUERY_SQL = 
			"SELECT project_search_id, search_id, search_sub_group_id, display_order, subgroup_name_display "
			+ " FROM project_search_sub_group_tbl WHERE project_search_id IN ( ";

	private static final String QUERY_SQL__CLOSE__IN = " )";
	
	/**
	 * @param searchIds
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<ProjectSearchSubGroupDTO>  getListForProjectSearchIds( List<Integer> searchIds ) throws SQLException {

		List<ProjectSearchSubGroupDTO> resultList = new ArrayList<>();

		StringBuilder querySQLSB = new StringBuilder( 10000 );
		querySQLSB.append( QUERY_SQL );
		for ( int count = 0; count < searchIds.size(); count++ ) {
			if ( count != 0 ) {
				querySQLSB.append(",");
			}
			querySQLSB.append( "?");
		}
		querySQLSB.append( QUERY_SQL__CLOSE__IN );
		
		final String querySQL = querySQLSB.toString();
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			for ( Integer searchId : searchIds ) {
				counter++;
				preparedStatement.setInt( counter, searchId );
			}
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ProjectSearchSubGroupDTO result = new ProjectSearchSubGroupDTO();
					result.setProjectSearchId( rs.getInt( "project_search_id" ) );
					result.setSearchId( rs.getInt( "search_id" ) );
					result.setSearchSubGroupId( rs.getInt( "search_sub_group_id" ) );
					{
						int value = rs.getInt( "display_order" );
						if ( ! rs.wasNull() ) {
							result.setDisplayOrder( value );
						}
					}
					result.setSubgroupName_Display( rs.getString( "subgroup_name_display" ) );
					resultList.add(result);
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
	}
	
}
