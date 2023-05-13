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
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF;

/**
 * 
 *
 */
@Component
public class ProteinCoverage_ProteinSequenceVersionId_ProteinStartPosition_For_SearchIdReportedPeptideId_Searcher extends Limelight_JDBC_Base implements ProteinCoverage_ProteinSequenceVersionId_ProteinStartPosition_For_SearchIdReportedPeptideId_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( ProteinCoverage_ProteinSequenceVersionId_ProteinStartPosition_For_SearchIdReportedPeptideId_Searcher.class );

	@Autowired
	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;
	
	public static class ProteinCoverage_ProteinSequenceVersionId_ProteinStartPosition_For_SearchIdReportedPeptideId_Searcher_ResultItem {
		
		private int proteinSequenceVersionId;
		private int proteinStartPosition;
		
		public int getProteinSequenceVersionId() {
			return proteinSequenceVersionId;
		}
		public int getProteinStartPosition() {
			return proteinStartPosition;
		}
	}
	
	//  WARNING::  Fields 'protein_pre_residue' and 'protein_post_residue' were added and may be null/Not Populated.
	//					If these fields are needed here, 
	//					see how results from class ProteinCoverageForSearchIdReportedPeptideIdsSearcher are handled.

	private static final String QUERY_SQL = 
			"SELECT protein_sequence_version_id, protein_start_position "
			+ " FROM "
			+ " protein_coverage_tbl "
			+ " WHERE search_id = ? AND reported_peptide_id = ?";

	
	@Override
	public List<ProteinCoverage_ProteinSequenceVersionId_ProteinStartPosition_For_SearchIdReportedPeptideId_Searcher_ResultItem> 
	
	getProteinCoverage_ProteinSequenceVersionId_ProteinStartPosition_For_SearchIdReportedPeptideId( int searchId, int reportedPeptideId ) throws Exception {

		List<ProteinCoverage_ProteinSequenceVersionId_ProteinStartPosition_For_SearchIdReportedPeptideId_Searcher_ResultItem> resultList = new ArrayList<>();

		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);
		
		String querySQL = QUERY_SQL;

		if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsDecoy_True() ) {
			// Exclude  records where is_decoy = 'true'
			querySQL += " AND protein_is_decoy != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE;
		}
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, searchId );
			preparedStatement.setInt( 2, reportedPeptideId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ProteinCoverage_ProteinSequenceVersionId_ProteinStartPosition_For_SearchIdReportedPeptideId_Searcher_ResultItem item = new ProteinCoverage_ProteinSequenceVersionId_ProteinStartPosition_For_SearchIdReportedPeptideId_Searcher_ResultItem();
					item.proteinSequenceVersionId = rs.getInt( "protein_sequence_version_id" );
					item.proteinStartPosition = rs.getInt( "protein_start_position" );

					resultList.add( item );
				}

			}
		} catch ( Exception e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
	}

}
