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
import org.yeastrc.limelight.limelight_webapp.objects.SearchItemMinimal;

/**
 * 
 *
 */
@Component
public class SearchMinimalForProjectSearchIdSearcher extends Limelight_JDBC_Base implements SearchMinimalForProjectSearchIdSearcher_IF {

	private static final Logger log = LoggerFactory.getLogger( SearchMinimalForProjectSearchIdSearcher.class );
		
	private static final String QUERY_SQL = 
			"SELECT project_search_tbl.search_name, project_search_tbl.search_short_name, project_search_tbl.id AS project_search_id, search_tbl.id AS search_id, "
			+ " project_search_tbl.project_id AS project_id, search_tbl.has_search_sub_groups, search_tbl.has_scan_data, search_tbl.import_end_timestamp "
			+ " FROM "
			+ " project_search_tbl INNER JOIN search_tbl ON project_search_tbl.search_id = search_tbl.id "
			+ " WHERE project_search_tbl.id = ?";

	@Override
	public SearchItemMinimal  getSearchListForProjectSearchId( int projectSearchId ) throws SQLException {

		SearchItemMinimal result = null;

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectSearchId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					result = new SearchItemMinimal();
					result.setProjectSearchId( rs.getInt( "project_search_id" ) );
					result.setSearchId( rs.getInt( "search_id" ) );
					result.setProjectId( rs.getInt( "project_id" ) );
					result.setName( rs.getString( "search_name" ) );
					result.setSearchShortName( rs.getString( "search_short_name" ) );
					{
						int resultInt = rs.getInt( "has_search_sub_groups" );
						if ( resultInt == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							result.setSearchHasSubgroups(true);
						}
					}
					{
						int resultInt = rs.getInt( "has_scan_data" );
						if ( resultInt == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							result.setSearchHasScanDataFlag(true);
						}
					}

					result.setImportEndTimestamp( rs.getTimestamp( "import_end_timestamp" ) );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
