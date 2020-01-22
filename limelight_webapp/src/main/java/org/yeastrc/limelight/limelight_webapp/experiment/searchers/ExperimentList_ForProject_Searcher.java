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
package org.yeastrc.limelight.limelight_webapp.experiment.searchers;

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
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.ExperimentDTO;

/**
 * 
 *
 */
@Component
public class ExperimentList_ForProject_Searcher extends Limelight_JDBC_Base implements ExperimentList_ForProject_SearcherIF {

	private static final Logger log = LoggerFactory.getLogger( ExperimentList_ForProject_Searcher.class );
		
	private static final String QUERY_SQL = 
			"SELECT "
			+ " id, name, created_by_user_id "
			+ " FROM "
			+ " experiment_tbl "
			+ " WHERE project_id = ? ";

	/**
	 * @param projectId
	 * @param draft - If set, restrict to this value
	 * @param userId - If set, restrict to user
	 * @return properties on objects set: id, name, createdByUserId
	 * @throws SQLException
	 */
	
	@Override
	public List<ExperimentDTO>  getExperimentList_ForProjectId( int projectId, Boolean draft, Integer userId ) throws SQLException {

		List<ExperimentDTO> resultList = new ArrayList<>();

		String querySQL = QUERY_SQL;
		
		if ( draft != null ) {
			querySQL +=  " and draft_flag = ? ";
		}

		if ( userId != null ) {
			querySQL +=  " and created_by_user_id = ? ";
		}
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			counter++;
			preparedStatement.setInt( counter, projectId );
			if ( draft != null ) {
				counter++;
				if ( draft ) {
					preparedStatement.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ); 
				} else {
					preparedStatement.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}
			}
			if ( userId != null ) {
				counter++;
				preparedStatement.setInt( counter, userId ); 
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ExperimentDTO item = new ExperimentDTO();
					item.setId( rs.getInt( "id" ) );
					item.setName( rs.getString( "name" ) );
					int createdByUserId = rs.getInt( "created_by_user_id" );
					if ( ! rs.wasNull() ) {
						item.setCreatedByUserId( createdByUserId );
					}
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
