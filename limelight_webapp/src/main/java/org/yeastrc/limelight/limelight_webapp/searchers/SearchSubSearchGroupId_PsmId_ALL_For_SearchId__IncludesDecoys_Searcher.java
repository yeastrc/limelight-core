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
public class SearchSubSearchGroupId_PsmId_ALL_For_SearchId__IncludesDecoys_Searcher extends Limelight_JDBC_Base implements SearchSubSearchGroupId_PsmId_ALL_For_SearchId__IncludesDecoys_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( SearchSubSearchGroupId_PsmId_ALL_For_SearchId__IncludesDecoys_Searcher.class );

	/**
	 * 
	 *
	 */
	public static class SearchSubSearchGroupId_PsmId_For_SearchId_Searcher_ResultItem {
		
		int searchSubGroupId;
		long psmId;

		public int getSearchSubGroupId() {
			return searchSubGroupId;
		}
		public long getPsmId() {
			return psmId;
		}
	}
	
	private final static String SQL = 
			"SELECT search_sub_group_id, psm_tbl.id AS psm_id "
					+ " FROM  " 
					+ "  psm_tbl INNER JOIN psm_search_sub_group_tbl ON psm_tbl.id = psm_search_sub_group_tbl.psm_id "
					+ "  WHERE psm_tbl.search_id = ?  ";



	/**
	 * 
	 * @param searchId
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<SearchSubSearchGroupId_PsmId_For_SearchId_Searcher_ResultItem> getSearchSubSearchGroupId_PsmId_ALL_For_SearchId__IncludesDecoys( int searchId ) throws Exception {
		
		List<SearchSubSearchGroupId_PsmId_For_SearchId_Searcher_ResultItem> results = new ArrayList<>();

		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		sqlSB.append( SQL );

		final String sql = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			int counter = 0;
			counter++;
			preparedStatement.setInt( counter, searchId );
		
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					SearchSubSearchGroupId_PsmId_For_SearchId_Searcher_ResultItem result = new SearchSubSearchGroupId_PsmId_For_SearchId_Searcher_ResultItem();
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
