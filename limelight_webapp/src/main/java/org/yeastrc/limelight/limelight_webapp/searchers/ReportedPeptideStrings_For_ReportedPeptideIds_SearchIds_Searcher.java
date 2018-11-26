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
import java.util.Collection;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Item;

/**
 * 
 *
 */
@Component
public class ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Searcher extends Limelight_JDBC_Base implements ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_SearcherIF {

	private static final Logger log = LoggerFactory.getLogger( ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Searcher.class );
			
	private static final String QUERY_SQL_PART_1 = 
			"SELECT srp.reported_peptide_id, rp.sequence " 
			+ " FROM search_reported_peptide_tbl AS srp "
			+ "  INNER JOIN reported_peptide_tbl AS rp "
			+ " 	   ON srp.reported_peptide_id = rp.id "

			+ " 	WHERE srp.search_id IN ( ";
			
	private static final String QUERY_SQL_PART_2 =
			" ) " // close 'search_id IN' 
			+ "    AND "
			+ "    srp.reported_peptide_id IN ( ";
	private static final String QUERY_SQL_PART_3 =
			" ) ";
	
	/**
	 * @param reportedPeptideIds
	 * @param searchIds
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Item>  getReportedPeptideStrings_For_ReportedPeptideIds_SearchIds( 
			Collection<Integer> reportedPeptideIds,
			Collection<Integer> searchIds
			) throws SQLException {

		List<ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Item> resultList = new ArrayList<>();
		
		StringBuilder querySQL_SB = new StringBuilder( 1000 );

		querySQL_SB.append( QUERY_SQL_PART_1 );
		
		int searchIdsSize = searchIds.size();
		for ( int counter = 0; counter < searchIdsSize; counter++ ) {
			if ( counter != 0 ) {
				querySQL_SB.append( "," );
			}
			querySQL_SB.append( "?" );
		}

		querySQL_SB.append( QUERY_SQL_PART_2 );
		
		int reportedPeptideIdsSize = reportedPeptideIds.size();
		for ( int counter = 0; counter < reportedPeptideIdsSize; counter++ ) {
			if ( counter != 0 ) {
				querySQL_SB.append( "," );
			}
			querySQL_SB.append( "?" );
		}

		querySQL_SB.append( QUERY_SQL_PART_3 );
		
		final String querySQL = querySQL_SB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			for ( Integer searchId :searchIds ) {
				counter++;
				preparedStatement.setInt( counter, searchId );
			}
			for ( Integer reportedPeptideId :reportedPeptideIds ) {
				counter++;
				preparedStatement.setInt( counter, reportedPeptideId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Item result = new ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Item();
					result.setReportedPeptideId( rs.getInt( "reported_peptide_id" ) );
					result.setReportedPeptideString( rs.getString( "sequence" )  );
					resultList.add( result );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
	}

}
