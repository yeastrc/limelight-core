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

import java.math.BigDecimal;
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

/**
 * Get the reporter_ion_mass For a Search Id
 * 
 * Table search__reporter_ion_mass_lookup_tbl
 *
 */
@Component
public class ReporterIonMasses_Unique_ForSearchLevel_ForSearchIdSearcher extends Limelight_JDBC_Base implements ReporterIonMasses_Unique_ForSearchLevel_ForSearchIdSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( ReporterIonMasses_Unique_ForSearchLevel_ForSearchIdSearcher.class );
	
	private static final String QUERY_SQL = 
			"SELECT reporter_ion_mass FROM search__reporter_ion_mass_lookup_tbl WHERE search_id = ? ";

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.ReporterIonMasses_Unique_ForSearchLevel_ForSearchIdSearcherIF#getListForSearchId(int)
	 */
	@Override
	public List<BigDecimal>  getListForSearchId( int searchId ) throws SQLException {

		List<BigDecimal> resultList = new ArrayList<>();

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, searchId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					BigDecimal result = rs.getBigDecimal( "reporter_ion_mass" );
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
