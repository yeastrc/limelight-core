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
import org.yeastrc.limelight.limelight_webapp.searchers_results.PeptideIdsForSearchIdReportedPeptideIds_Item;

/**
 * 
 *
 */
@Component
public class PeptideIdsForSearchIdReportedPeptideIdsSearcher extends Limelight_JDBC_Base implements PeptideIdsForSearchIdReportedPeptideIdsSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( PeptideIdsForSearchIdReportedPeptideIdsSearcher.class );
		
	private static final String QUERY_START_SQL = 
			"SELECT reported_peptide_id, peptide_id "
			+ " FROM "
			+ " search_reported_peptide_tbl "
			+ " WHERE search_id = ? AND reported_peptide_id IN ( ";
			  
	private static final String QUERY_END_SQL = 
			" )";
	
	/**
	 * @param searchId
	 * @param reportedPeptideIds
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<PeptideIdsForSearchIdReportedPeptideIds_Item> getPeptideIdsForSearchIdReportedPeptideIds( int searchId, List<Integer> reportedPeptideIds ) throws SQLException {

		if ( reportedPeptideIds == null ) {
			throw new IllegalArgumentException( "reportedPeptideIds cannot be null" );
		}
		
		if ( reportedPeptideIds.isEmpty() ) {
			return new ArrayList<>();
		}

		List<PeptideIdsForSearchIdReportedPeptideIds_Item> results = new ArrayList<>();
		
		StringBuilder querySB = new StringBuilder( 1000 );
		
		querySB.append( QUERY_START_SQL );
		
		//  add '?' for each reported peptide id
		for ( int counter = 0; counter < reportedPeptideIds.size(); counter++ ) {
			if ( counter != 0 ) {
				querySB.append(",");
			}
			querySB.append("?");
		}
		
		querySB.append( QUERY_END_SQL );

		final String querySQL = querySB.toString();
				
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
					PeptideIdsForSearchIdReportedPeptideIds_Item result = new PeptideIdsForSearchIdReportedPeptideIds_Item();
					result.setReportedPeptideId( rs.getInt( "reported_peptide_id" ) );
					result.setPeptideId( rs.getInt( "peptide_id" ) );
					results.add( result );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return results;
	}
	
}
