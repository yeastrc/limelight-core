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
import org.yeastrc.limelight.limelight_webapp.searchers_results.Project_Note_List_ForProjectId_Item;

/**
 * 
 *
 */
@Component
public class Project_Note_List_ForProjectIdSearcher extends Limelight_JDBC_Base implements Project_Note_List_ForProjectIdSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( Project_Note_List_ForProjectIdSearcher.class );
		
	private static final String QUERY_SQL = 
			"SELECT id, user_id_created, note_text "
			+ " FROM "
			+ " note_tbl "
			+ " WHERE project_id = ? ";

	@Override
	public List<Project_Note_List_ForProjectId_Item>  getNoteListForProjectId( int projectId ) throws SQLException {

		List<Project_Note_List_ForProjectId_Item> resultList = new ArrayList<>();

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					Project_Note_List_ForProjectId_Item item = new Project_Note_List_ForProjectId_Item();
					item.setId( rs.getInt( "id" ) );
					int userIdCreated = rs.getInt( "user_id_created" );
					if ( ! rs.wasNull() ) {
						item.setUserIdCreated( userIdCreated );
					}
					item.setNoteText( rs.getString( "note_text" ) );
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
