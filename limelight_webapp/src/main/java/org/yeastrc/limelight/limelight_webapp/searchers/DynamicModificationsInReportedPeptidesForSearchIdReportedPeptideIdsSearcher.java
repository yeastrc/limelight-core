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
import org.yeastrc.limelight.limelight_webapp.searchers_results.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item;

/**
 * Dynamic Mods for Reported Peptide Ids and Search Id
 *
 */
@Component
public class DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher extends Limelight_JDBC_Base implements DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher.class );
		
	private static final String QUERY_SQL = 
			"SELECT reported_peptide_id,  position, mass "
			+ " FROM "
			+ " srch_rep_pept__dynamic_mod_tbl "
			+ " WHERE search_id = ? AND reported_peptide_id IN ( "; //  Add closing ")" in code

	/**
	 * Results
	 *
	 */
	public static class DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result {
		
		Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> results_Key_ReportedPeptideId;

		public Map<Integer, List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> getResults_Key_ReportedPeptideId() {
			return results_Key_ReportedPeptideId;
		}
		public void setResults_Key_ReportedPeptideId(
				Map<Integer, List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> results_Key_ReportedPeptideId) {
			this.results_Key_ReportedPeptideId = results_Key_ReportedPeptideId;
		}
	}
	
	/**
	 * @param searchId
	 * @param reportedPeptideIds
	 * @return
	 * @throws SQLException
	 */
	@Override
	public DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result getDynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIds(
			int searchId, List<Integer> reportedPeptideIds ) throws SQLException {

		if ( reportedPeptideIds == null ) {
			final String msg = "reportedPeptideIds == null";
			log.error( msg );
			throw new IllegalArgumentException( msg );
		}
		
		Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> results_Key_ReportedPeptideId = new HashMap<>();
		
		if ( reportedPeptideIds.isEmpty() ) {
			//  No Reported Peptides so return empty 
			DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result result = new DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result();
			result.results_Key_ReportedPeptideId = results_Key_ReportedPeptideId;
			return result;  //  EARLY RETURN
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
					Integer reportedPeptideId = rs.getInt( "reported_peptide_id" );
					DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item item = new DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item();
					item.setPosition( rs.getInt( "position" ) );
					item.setMass( rs.getDouble( "mass" ) );
					
					List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item> resultList = results_Key_ReportedPeptideId.get( reportedPeptideId );
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
		
		DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result result = new DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result();
		
		result.results_Key_ReportedPeptideId = results_Key_ReportedPeptideId;
		
		return result;
	}
	
}
