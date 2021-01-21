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
import org.yeastrc.limelight.limelight_shared.dto.SearchRepPeptSubGroupDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Get the SearchRepPeptSubGroupDTO For a Search Id and Reported Peptide Ids
 *
 */
@Component
public class SearchRepPeptSubGroupDTOForSearchIdReportedPeptideIdsSearcher extends Limelight_JDBC_Base implements SearchRepPeptSubGroupDTOForSearchIdReportedPeptideIdsSearcherIF  {

	private static final Logger log = LoggerFactory.getLogger( SearchRepPeptSubGroupDTOForSearchIdReportedPeptideIdsSearcher.class );
	
	private static final String QUERY_SQL = 
			"SELECT reported_peptide_id, search_sub_group_id FROM search_rep_pept_sub_group_tbl WHERE search_id = ? and reported_peptide_id IN ( ";

	/**
	 * @param searchId
	 * @param reportedPeptideIds
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<SearchRepPeptSubGroupDTO>  getListForSearchIdReportedPeptideIds( int searchId, List<Integer> reportedPeptideIds ) throws SQLException {

		List<SearchRepPeptSubGroupDTO> resultList = new ArrayList<>();
		
		if ( reportedPeptideIds.isEmpty() ) {
			return resultList;
		}
		
		StringBuilder querySQLSB = new StringBuilder( 10000 );
		querySQLSB.append( QUERY_SQL );
		
		for ( int counter = 0; counter < reportedPeptideIds.size(); counter++ ) {
			if ( counter != 0 ) {
				querySQLSB.append( "," );
			}

			querySQLSB.append( "?" );
		}
		querySQLSB.append( " ) " );
		
		final String querySQL = querySQLSB.toString();
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			counter++;
			preparedStatement.setInt( counter, searchId );
			
			for ( Integer reportedPeptideId : reportedPeptideIds ) {
				counter++;
				preparedStatement.setInt( counter, reportedPeptideId );	
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					SearchRepPeptSubGroupDTO result = new SearchRepPeptSubGroupDTO();
					result.setSearchId( searchId );
					result.setReportedPeptideId( rs.getInt( "reported_peptide_id" ) );
					result.setSearchSubGroupId( rs.getInt( "search_sub_group_id" ) );
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
