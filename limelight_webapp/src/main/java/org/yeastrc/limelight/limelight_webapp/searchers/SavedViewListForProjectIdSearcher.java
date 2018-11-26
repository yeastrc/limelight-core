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
import org.yeastrc.limelight.limelight_webapp.searchers_results.SavedViewListForProjectIdItem;

/**
 * 
 *
 */
@Component
public class SavedViewListForProjectIdSearcher extends Limelight_JDBC_Base implements SavedViewListForProjectIdSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( SavedViewListForProjectIdSearcher.class );
		
	private static final String QUERY_SQL = 
			"SELECT "
			+ " id, label, url_start_at_page_controller_path, single_project_search_id__default_view, user_id_created_record "
			+ " FROM "
			+ " data_page_saved_view_tbl "
			+ " WHERE project_id = ? ";

	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<SavedViewListForProjectIdItem>  getSavedViewListForProjectId( int projectId ) throws SQLException {

		List<SavedViewListForProjectIdItem> resultList = new ArrayList<>();

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					SavedViewListForProjectIdItem item = new SavedViewListForProjectIdItem();
					item.setId( rs.getInt( "id" ) );
					item.setLabel( rs.getString( "label" ) );
					item.setUrl( rs.getString( "url_start_at_page_controller_path" ) );
					int singleProjectSearchIdDefaultView = rs.getInt( "single_project_search_id__default_view" );
					if ( ! rs.wasNull() ) {
						item.setSingleProjectSearchIdDefaultView( singleProjectSearchIdDefaultView );
					}
					item.setUserIdCreated( rs.getInt( "user_id_created_record" ) );
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
