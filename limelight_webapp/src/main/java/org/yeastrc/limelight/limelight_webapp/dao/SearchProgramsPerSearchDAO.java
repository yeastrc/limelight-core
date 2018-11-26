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
package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.SearchProgramsPerSearchDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table search_programs_per_search_tbl
 *
 */
@Component
public class SearchProgramsPerSearchDAO extends Limelight_JDBC_Base implements SearchProgramsPerSearchDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( SearchProgramsPerSearchDAO.class );
		
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.SearchProgramsPerSearchDAO_IF#getForId(int)
	 */
	@Override
	public SearchProgramsPerSearchDTO getForId( int id ) throws SQLException {
		
		SearchProgramsPerSearchDTO result = null;
		
		final String querySQL = "SELECT * FROM search_programs_per_search_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = populateFromResultSet( rs );
				}
			}
		} catch ( RuntimeException e ) {
			String msg = "SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		} catch ( SQLException e ) {
			String msg = "SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		return result;
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.SearchProgramsPerSearchDAO_IF#populateFromResultSet(java.sql.ResultSet)
	 */
	@Override
	public SearchProgramsPerSearchDTO populateFromResultSet(	ResultSet rs) throws SQLException {
		
		
		SearchProgramsPerSearchDTO item;
		item = new SearchProgramsPerSearchDTO();
		
		item.setId( rs.getInt( "id" ) );
		item.setSearchId( rs.getInt( "search_id" ) );
		item.setName( rs.getString( "name" ) );
		item.setDisplayName( rs.getString( "display_name" ) );
		item.setVersion( rs.getString( "version" ) );
		item.setDescription( rs.getString( "description" ) );
		
		
		return item;
	}

}
