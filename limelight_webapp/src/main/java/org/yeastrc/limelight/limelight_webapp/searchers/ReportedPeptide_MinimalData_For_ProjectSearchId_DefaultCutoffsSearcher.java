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
import org.yeastrc.limelight.limelight_shared.enum_classes.Yes_No__NOT_APPLICABLE_Enum;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesAnnotationLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;

/**
 * Returns a minimal set of data for each reported peptide that meets the DEFAULT criteria
 * 
 * ASSUMES Default PSM and Reported Peptide Cutoffs
 * 
 * Criteria:
 *    Search Id
 *    Default PSM and Reported Peptide Cutoffs
 */
@Component
public class ReportedPeptide_MinimalData_For_ProjectSearchId_DefaultCutoffsSearcher extends Limelight_JDBC_Base implements ReportedPeptide_MinimalData_For_ProjectSearchId_DefaultCutoffsSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( ReportedPeptide_MinimalData_For_ProjectSearchId_DefaultCutoffsSearcher.class );
	
	private final String SQL = 
			"SELECT search__rep_pept__lookup_tbl.reported_peptide_id, "
					+ " search__rep_pept__lookup_tbl.psm_num_at_default_cutoff "
//			+ " search__rep_pept__lookup_tbl.num_unique_psm_at_default_cutoff "
			+ " FROM search__rep_pept__lookup_tbl "

			+ " WHERE search__rep_pept__lookup_tbl.search_id = ? "
			+ " AND search__rep_pept__lookup_tbl.psm_num_at_default_cutoff >= ? ";
	
	/**
	 * @param searchId
	 * @param searcherCutoffValuesSearchLevel
	 * @param minimumNumberOfPSMsPerReportedPeptide - Must be >= 1
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<ReportedPeptide_MinimalData_List_FromSearcher_Entry>  getPeptideDataList( 
			int searchId, 
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel,
			int minimumNumberOfPSMsPerReportedPeptide ) throws SQLException {
		
		if ( minimumNumberOfPSMsPerReportedPeptide < 1 ) {
			String msg = "minimumNumberOfPSMsPerReportedPeptide must be >= 1";
			log.error( msg );
			throw new IllegalArgumentException(msg);
		}
		
		List<SearcherCutoffValuesAnnotationLevel> peptideCutoffValuesList = searcherCutoffValuesSearchLevel.getPeptidePerAnnotationCutoffsList();

		List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> resultList = new ArrayList<>();
		
		StringBuilder sqlSB = new StringBuilder( 1000 );
		
		sqlSB.append( SQL );
		
		sqlSB.append( " AND " );
		sqlSB.append( " search__rep_pept__lookup_tbl.peptide_meets_default_cutoffs = '" );
		if ( peptideCutoffValuesList == null || peptideCutoffValuesList.isEmpty() ) {
			sqlSB.append( Yes_No__NOT_APPLICABLE_Enum.NOT_APPLICABLE.value() );
		} else {
			sqlSB.append( Yes_No__NOT_APPLICABLE_Enum.YES.value() );
		}
		sqlSB.append( "' " );
	
		final String querySQL = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement pstmt = connection.prepareStatement( querySQL ) ) {
			
			int paramCounter = 0;
			paramCounter++;
			pstmt.setInt( paramCounter, searchId );
			paramCounter++;
			pstmt.setInt( paramCounter, minimumNumberOfPSMsPerReportedPeptide );
			
			try ( ResultSet rs = pstmt.executeQuery() ) {
				while( rs.next() ) {
					ReportedPeptide_MinimalData_List_FromSearcher_Entry item = new ReportedPeptide_MinimalData_List_FromSearcher_Entry();
					int reportedPeptideId = rs.getInt( "reported_peptide_id" );
					item.setReportedPeptideId(reportedPeptideId);
					int numPsmsForDefaultCutoffs = rs.getInt( "psm_num_at_default_cutoff" );
					if ( ! rs.wasNull() ) {
						item.setNumPsms_IfComputedOrInDB( numPsmsForDefaultCutoffs );
					}
					resultList.add( item );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
	}

}
