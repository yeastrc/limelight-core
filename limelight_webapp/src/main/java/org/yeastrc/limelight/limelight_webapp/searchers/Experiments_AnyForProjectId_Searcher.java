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
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * 
 *
 */
@Component
public class Experiments_AnyForProjectId_Searcher extends Limelight_JDBC_Base implements Experiments_AnyForProjectId_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( Experiments_AnyForProjectId_Searcher.class );

	private static final String QUERY_SQL = 
			"SELECT "
			+ " id "
			+ " FROM "
			+ " experiment_tbl "
			+ " WHERE project_id = ? "
			+ " LIMIT 1 ";
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.Experiments_AnyForProjectId_Searcher_IF#experiments_AnyForProjectId_Searcher(int)
	 */
	@Override
	public boolean experiments_AnyForProjectId_Searcher( int projectId ) throws SQLException {

		boolean result = false;

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = true;
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
