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
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_ProteinSequenceVersionId_Pair_Item_FromSearcher;

/**
 * 
 *
 */
@Component
public class ProteinVersionIdsFor_SearchID_ReportedPeptideIdList_Searcher extends Limelight_JDBC_Base implements ProteinVersionIdsFor_SearchID_ReportedPeptideIdList_SearcherIF {

	private static final Logger log = LoggerFactory.getLogger( ProteinVersionIdsFor_SearchID_ReportedPeptideIdList_Searcher.class );
	
	//  Added index hint 'USE INDEX (PRIMARY)' since 
	//  otherwise MySQL uses the index reported_peptide_id_fk_idx (reported_peptide_id)
	//  which results in a much slower query
	
	private static final String QUERY_SQL = 
			"SELECT protein_sequence_version_id, reported_peptide_id"
			+ " FROM srch_rep_pept__prot_seq_v_id_tbl USE INDEX (PRIMARY) "  // Index hint use PRIMARY (search_id,reported_peptide_id,protein_sequence_version_id)
			+ " WHERE "
			+ "  search_id = ? AND reported_peptide_id IN ( ";
	
	/* (non-Javadoc)
	 * @see org.yeastrc.emozi.emozi_webapp.searchers.ProteinVersionIdsFor_SearchID_ReportedPeptideIdList_SearcherIF#getProteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher(int, java.util.List)
	 */
	@Override
	public List<ReportedPeptide_ProteinSequenceVersionId_Pair_Item_FromSearcher>  getProteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher( 
			
			int searchId,
			List<Integer> reportedPeptideIdList
			) throws SQLException {

		if ( reportedPeptideIdList.isEmpty() ) {
			//  No Reported Peptide Ids so return empty list
			return new ArrayList<>();
		}

		List<ReportedPeptide_ProteinSequenceVersionId_Pair_Item_FromSearcher> resultList = new ArrayList<>();
		
		StringBuilder querySQLSB = new StringBuilder( 10000 );
		
		querySQLSB.append( QUERY_SQL );
		
		int reportedPeptideIdListSize = reportedPeptideIdList.size();
		for ( int counter = 0; counter < reportedPeptideIdListSize; counter++ ) {
			
			if ( counter != 0 ) {
				querySQLSB.append( "," );
			}
			querySQLSB.append( "?" );
		}
		querySQLSB.append( ")" ); // close "IN"
		
		
		final String querySQL = querySQLSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int paramCounter = 0;
			paramCounter++;
			preparedStatement.setInt( paramCounter, searchId );
			for ( Integer reportedPeptideId : reportedPeptideIdList ) {
				paramCounter++;
				preparedStatement.setInt( paramCounter, reportedPeptideId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ReportedPeptide_ProteinSequenceVersionId_Pair_Item_FromSearcher result = new ReportedPeptide_ProteinSequenceVersionId_Pair_Item_FromSearcher();
					result.setReportedPeptideId( rs.getInt( "reported_peptide_id" ) );
					result.setProteinSequenceVersionId( rs.getInt( "protein_sequence_version_id" ) );
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
