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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ProteinCoverageForSearchIdReportedPeptideIdSearcher_Item;

/**
 * 
 *
 */
@Component
public class ProteinCoverageForSearchIdReportedPeptideIdsSearcher extends Limelight_JDBC_Base implements ProteinCoverageForSearchIdReportedPeptideIdsSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( ProteinCoverageForSearchIdReportedPeptideIdsSearcher.class );
		
	private static final String QUERY_SQL = 
			"SELECT reported_peptide_id, protein_sequence_version_id, protein_start_position, protein_end_position "
			+ " FROM "
			+ " protein_coverage_tbl "
			+ " WHERE search_id = ? AND reported_peptide_id IN ( "; //  Add closing ")" in code

	/**
	 * Results
	 *
	 */
	public static class ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result {
		
		Map<Integer,List<ProteinCoverageForSearchIdReportedPeptideIdSearcher_Item>> results_Key_ReportedPeptideId;
		int itemCount;

		public Map<Integer, List<ProteinCoverageForSearchIdReportedPeptideIdSearcher_Item>> getResults_Key_ReportedPeptideId() {
			return results_Key_ReportedPeptideId;
		}
		public int getItemCount() {
			return itemCount;
		}
	}
	
	/**
	 * @param searchId
	 * @param reportedPeptideIds
	 * @return
	 * @throws SQLException
	 */
	@Override
	public ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result getProteinCoverageForSearchIdReportedPeptideIds(
			int searchId, List<Integer> reportedPeptideIds ) throws SQLException {

		if ( reportedPeptideIds == null ) {
			final String msg = "reportedPeptideIds == null";
			log.error( msg );
			throw new IllegalArgumentException( msg );
		}

		Map<Integer,List<ProteinCoverageForSearchIdReportedPeptideIdSearcher_Item>> results_Key_ReportedPeptideId = new HashMap<>();
		
		int itemCount = 0;

		if ( reportedPeptideIds.isEmpty() ) {
			
			//  No Reported Peptides
			
			ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result result = new ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result();
			result.results_Key_ReportedPeptideId = results_Key_ReportedPeptideId;
			result.itemCount = itemCount;
			
			return result; //  EARLY RETURN
		}
		
		StringBuilder sqlSB = new StringBuilder( 100000 );
		
		sqlSB.append( QUERY_SQL );
		
		for ( int i = 0; i < reportedPeptideIds.size(); i++ ) {
			if ( i != 0 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		sqlSB.append( ")" ); // closing IN
		
		final String querySQL = sqlSB.toString();
				
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
					
					itemCount++;
					
					Integer reportedPeptideId = rs.getInt( "reported_peptide_id" );
					ProteinCoverageForSearchIdReportedPeptideIdSearcher_Item item = new ProteinCoverageForSearchIdReportedPeptideIdSearcher_Item();
					item.setReportedPeptideId( reportedPeptideId );
					item.setProteinSequenceVersionId( rs.getInt( "protein_sequence_version_id" ) );
					item.setProteinStartPosition( rs.getInt( "protein_start_position" ) );
					item.setProteinEndPosition( rs.getInt( "protein_end_position" ) );
					
					List<ProteinCoverageForSearchIdReportedPeptideIdSearcher_Item> resultList = results_Key_ReportedPeptideId.get( reportedPeptideId );
					if ( resultList == null ) {
						resultList = new ArrayList<>();
						results_Key_ReportedPeptideId.put( reportedPeptideId, resultList );
					}
					resultList.add( item );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result result = new ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result();
		
		result.results_Key_ReportedPeptideId = results_Key_ReportedPeptideId;
		
		return result;
	}
	
}
