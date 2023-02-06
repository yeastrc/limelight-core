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
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.objects.SearchItemMinimal;

/**
 * 
 *
 */
@Component
public class SearchListForProjectIdSearcher extends Limelight_JDBC_Base implements SearchListForProjectIdSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( SearchListForProjectIdSearcher.class );
		
	private static final String QUERY_SQL = 
			"SELECT project_search_tbl.id AS project_search_id, project_search_tbl.project_id AS project_id, search_tbl.id AS search_id,"
			+ " project_search_tbl.search_display_order, project_search_tbl.search_name, project_search_tbl.search_short_name, "
			+ " search_tbl.import_end_timestamp  "
			+ " FROM "
			+ " project_search_tbl INNER JOIN search_tbl ON project_search_tbl.search_id = search_tbl.id "
			+ " WHERE project_search_tbl.project_id = ? AND project_search_tbl.status_id = " + SearchRecordStatus.IMPORT_COMPLETE_VIEW.value();

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.SearchListForProjectIdSearcherIF#getSearchListForProjectId(int)
	 */
	@Override
	public List<SearchItemMinimal>  getSearchListForProjectId( int projectId ) throws SQLException {

		List<SearchItemMinimal> resultList = new ArrayList<>();

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					SearchItemMinimal item = new SearchItemMinimal();
					item.setProjectId( rs.getInt( "project_id" ) );
					item.setProjectSearchId( rs.getInt( "project_search_id" ) );
					item.setSearchId( rs.getInt( "search_id" ) );
					item.setDisplayOrder( rs.getInt( "search_display_order" ) );
					item.setName( rs.getString( "search_name" ) );
					item.setSearchShortName( rs.getString( "search_short_name" ) );
					item.setImportEndTimestamp( rs.getTimestamp( "import_end_timestamp" ) );
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
