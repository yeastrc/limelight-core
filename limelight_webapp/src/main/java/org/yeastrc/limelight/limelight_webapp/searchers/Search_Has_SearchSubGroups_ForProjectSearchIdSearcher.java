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
public class Search_Has_SearchSubGroups_ForProjectSearchIdSearcher extends Limelight_JDBC_Base implements Search_Has_SearchSubGroups_ForProjectSearchIdSearcher_IF {

	private static final Logger log = LoggerFactory.getLogger( Search_Has_SearchSubGroups_ForProjectSearchIdSearcher.class );
		
	private static final String QUERY_SQL = 
			"SELECT search_tbl.has_search_sub_groups "
			+ " FROM "
			+ " project_search_tbl INNER JOIN search_tbl ON project_search_tbl.search_id = search_tbl.id "
			+ " WHERE project_search_tbl.id = ?";

	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.Search_Has_SearchSubGroups_ForProjectSearchIdSearcher_IF#get_Search_Has_SearchSubGroups_ForProjectSearchId(int)
	 */
	@Override
	public Boolean  get_Search_Has_SearchSubGroups_ForProjectSearchId( int projectSearchId ) throws SQLException {

		Boolean result = null;

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectSearchId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					{
						int resultInt = rs.getInt( "has_search_sub_groups" );
						if ( resultInt == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							result = true;
						} else {
							result = false;
						}
					}
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
