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

//import java.sql.Connection;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//import java.util.ArrayList;
//import java.util.List;
//
//import org.slf4j.LoggerFactory;
//import org.slf4j.Logger;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
//import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;

//import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
//import org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF;

import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * UNUSED
 * 
 * IF USE, Need to add Protein Filtering code using SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel
 * 
 *
 */
//@Component
public class ProteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher extends Limelight_JDBC_Base { // implements ProteinVersionIdsFor_SearchID_ReportedPeptideId_SearcherIF {

//	private static final Logger log = LoggerFactory.getLogger( ProteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher.class );
//
//	@Autowired
//	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;
//
//	private static final String QUERY_SQL = 
//			"SELECT protein_sequence_version_id"
//			+ " FROM srch_rep_pept__prot_seq_v_id_tbl  "
//			+ " WHERE "
//			+ "  search_id = ? AND reported_peptide_id = ?";
//			
//	/* (non-Javadoc)
//	 * @see org.yeastrc.limelight.limelight_webapp.searchers.ProteinVersionIdsFor_SearchID_ReportedPeptideId_SearcherIF#getProteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher(int, int)
//	 */
//	@Override
//	public List<Integer>  getProteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher( 
//			
//			int searchId,
//			int reportedPeptideId,
//			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel
//			) throws Exception {
//
//		List<Integer> resultList = new ArrayList<>();
//
//		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);
//		
//		String querySQL = QUERY_SQL;
//		
//		if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsDecoy_True() ) {
//			// Exclude  records where is_decoy = 'true'
//			querySQL += " AND protein_is_decoy != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE;
//		}
//		
//		try ( Connection connection = super.getDBConnection();
//			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
//			
//			preparedStatement.setInt( 1, searchId );
//			preparedStatement.setInt( 2, reportedPeptideId );
//			
//			try ( ResultSet rs = preparedStatement.executeQuery() ) {
//				while ( rs.next() ) {
//					resultList.add( rs.getInt( "protein_sequence_version_id" ) );
//				}
//			}
//		} catch ( Exception e ) {
//			log.error( "error running SQL: " + querySQL, e );
//			throw e;
//		}
//		
//		return resultList;
//	}

}
