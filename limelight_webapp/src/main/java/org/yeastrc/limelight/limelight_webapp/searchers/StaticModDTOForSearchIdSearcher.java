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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.StaticModDTO;
import org.yeastrc.limelight.limelight_webapp.dao.StaticModDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Get the StaticModDTO For a Search Id
 *
 */
@Component
public class StaticModDTOForSearchIdSearcher extends Limelight_JDBC_Base implements StaticModDTOForSearchIdSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( StaticModDTOForSearchIdSearcher.class );
	
	@Autowired
	private StaticModDAO_IF staticModDAO;
		
	private static final String QUERY_SQL = 
			"SELECT * FROM static_mod_tbl WHERE search_id = ? ORDER BY residue, mass ";

	/**
	 * @param searchId
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<StaticModDTO>  getListForSearchId( int searchId ) throws SQLException {

		List<StaticModDTO> resultList = new ArrayList<>();

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, searchId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					StaticModDTO result = staticModDAO.populateResultObject( rs );
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
