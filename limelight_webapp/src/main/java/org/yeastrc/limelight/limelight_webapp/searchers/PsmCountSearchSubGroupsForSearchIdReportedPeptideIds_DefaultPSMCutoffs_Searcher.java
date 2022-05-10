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
public class PsmCountSearchSubGroupsForSearchIdReportedPeptideIds_DefaultPSMCutoffs_Searcher extends Limelight_JDBC_Base implements PsmCountSearchSubGroupsForSearchIdReportedPeptideIds_DefaultPSMCutoffs_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( PsmCountSearchSubGroupsForSearchIdReportedPeptideIds_DefaultPSMCutoffs_Searcher.class );
	
	/**
	 * 
	 *
	 */
	public static class PsmCountSearchSubGroupsForSearchIdReportedPeptideIds_DefaultPSMCutoffs_Searcher_ResultItem {
		
		int numPsms; // numPsms_Targets + numPsms_IndependentDecoys

		int numPsms_Targets;
		int numPsms_IndependentDecoys;
		int numPsms_Decoys;
		
		int searchSubGroupId;
		int reportedPeptideId;
		
		public int getNumPsms() {
			return numPsms;
		}
		public int getSearchSubGroupId() {
			return searchSubGroupId;
		}
		public int getReportedPeptideId() {
			return reportedPeptideId;
		}
		public int getNumPsms_Targets() {
			return numPsms_Targets;
		}
		public int getNumPsms_IndependentDecoys() {
			return numPsms_IndependentDecoys;
		}
		public int getNumPsms_Decoys() {
			return numPsms_Decoys;
		}
	}
	
	private static final String SQL_START = 
			"SELECT "
			+ " psm_num_targets_only_at_default_cutoff, psm_num_indpendent_decoys_only_at_default_cutoff, psm_num_decoys_only_at_default_cutoff, "
			+ " search_sub_group_id, reported_peptide_id "
			+ " FROM search__rep_pept_sub_group_lookup_tbl "
			+ " WHERE search_id = ? and reported_peptide_id IN ( ";
			
	@Override
	public List<PsmCountSearchSubGroupsForSearchIdReportedPeptideIds_DefaultPSMCutoffs_Searcher_ResultItem> 
	
	getPsmCountSearchSubGroupsForSearchIdReportedPeptideIds_DefaultPSMCutoffs(
			
			int searchId, List<Integer> reportedPeptideIds ) throws SQLException {
		
		List<PsmCountSearchSubGroupsForSearchIdReportedPeptideIds_DefaultPSMCutoffs_Searcher_ResultItem> results = new ArrayList<>();
		
		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		sqlSB.append( SQL_START ); 
		
		for ( int counter = 0; counter < reportedPeptideIds.size(); counter++ ) {
			if ( counter != 0 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		sqlSB.append( " )" );
			
		String sql = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			int counter = 0;

			counter++;
			preparedStatement.setInt( counter, searchId );

			for ( Integer reportedPeptideId : reportedPeptideIds ) {
				counter++;
				preparedStatement.setInt( counter, reportedPeptideId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					PsmCountSearchSubGroupsForSearchIdReportedPeptideIds_DefaultPSMCutoffs_Searcher_ResultItem result = new PsmCountSearchSubGroupsForSearchIdReportedPeptideIds_DefaultPSMCutoffs_Searcher_ResultItem();
					result.reportedPeptideId = rs.getInt( "reported_peptide_id" );
					result.searchSubGroupId = rs.getInt( "search_sub_group_id" );

					result.numPsms_Targets = rs.getInt( "psm_num_targets_only_at_default_cutoff" );
					result.numPsms_IndependentDecoys = rs.getInt( "psm_num_indpendent_decoys_only_at_default_cutoff" );
					result.numPsms_Decoys = rs.getInt( "psm_num_decoys_only_at_default_cutoff" );

					result.numPsms = result.numPsms_Targets + result.numPsms_IndependentDecoys;
					
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
