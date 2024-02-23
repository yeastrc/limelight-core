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

/**
 * 
 *
 */
@Component
public class SearchSubSearchGroupId_PsmId_For_PsmIds_Searcher extends Limelight_JDBC_Base implements SearchSubSearchGroupId_PsmId_For_PsmIds_Searcher_IF   {

	private static final Logger log = LoggerFactory.getLogger( SearchSubSearchGroupId_PsmId_For_PsmIds_Searcher.class );

	/**
	 * 
	 * 
	 */
	public static class SearchSubSearchGroupId_PsmId_For_PsmIds_Searcher_ResultItem {
		
		int searchSubGroupId;
		long psmId;
		
		public int getSearchSubGroupId() {
			return searchSubGroupId;
		}
		public long getPsmId() {
			return psmId;
		}
	}
	
	/**
	 * @param psmIds
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<SearchSubSearchGroupId_PsmId_For_PsmIds_Searcher_ResultItem> 
	
	getSearchSubSearchGroupId_PsmId_For_PsmIds(
			
			List<Long> psmIds ) throws Exception {
		
		if ( psmIds == null || psmIds.isEmpty() ) {
			return new ArrayList<>();
		}
		
		List<SearchSubSearchGroupId_PsmId_For_PsmIds_Searcher_ResultItem> results = new ArrayList<>( psmIds.size() );

				
		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		sqlSB.append( "SELECT search_sub_group_id, psm_id FROM psm_search_sub_group_tbl WHERE psm_id IN ( " ); 
		
		for ( int counter = 1; counter <= psmIds.size(); counter++ ) {

			if ( counter != 1 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		sqlSB.append( " ) " );

		String sql = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			int counter = 0;

			for ( Long psmId : psmIds ) {
				counter++;
				preparedStatement.setLong( counter, psmId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					SearchSubSearchGroupId_PsmId_For_PsmIds_Searcher_ResultItem result = new SearchSubSearchGroupId_PsmId_For_PsmIds_Searcher_ResultItem();
					result.searchSubGroupId = rs.getInt( "search_sub_group_id" );
					result.psmId = rs.getLong( "psm_id" );
					results.add( result );
				}
			}
		} catch ( RuntimeException e ) {
			log.error( "ERROR getting psm count:  SQL: " + sql, e );
			throw e;
		} catch ( SQLException e ) {
			log.error( "ERROR getting psm count:  SQL: " + sql, e );
			throw e;
		}
		
		return results;		
	}

}
