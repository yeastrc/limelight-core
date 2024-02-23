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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.constants.SearcherGeneralConstants;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesAnnotationLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_ProteinSequenceVersionId_Pair_Item_FromSearcher;
import org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF;

/**
 * 
 *
 */
@Component
public class ProteinVersionIdsFor_SearchID_ReportedPeptideIdList_Searcher extends Limelight_JDBC_Base implements ProteinVersionIdsFor_SearchID_ReportedPeptideIdList_SearcherIF {

	private static final Logger log = LoggerFactory.getLogger( ProteinVersionIdsFor_SearchID_ReportedPeptideIdList_Searcher.class );

	@Autowired
	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;

	//  Added index hint 'USE INDEX (PRIMARY)' since 
	//  otherwise MySQL uses the index reported_peptide_id_fk_idx (reported_peptide_id)
	//  which results in a much slower query
	
	private static final String QUERY_SQL_PRIMARY = 
			"SELECT search_id, protein_sequence_version_id, reported_peptide_id"
			+ " FROM srch_rep_pept__prot_seq_v_id_tbl USE INDEX (PRIMARY) "  // Index hint use PRIMARY (search_id,reported_peptide_id,protein_sequence_version_id)
			+ " WHERE "
			+ "  search_id = ? AND reported_peptide_id IN ( ";

	
	private final String PROTEIN_VALUE_FILTER_TABLE_ALIAS = "srch__protein_fltrbl_tbl_";
	
	
	private static final String QUERY_SQL_SURROUND_FILTER_ON_PROTEIN_CUTOFFS__START = 
			"SELECT primary_query_result.protein_sequence_version_id, primary_query_result.reported_peptide_id"
			+ " FROM ( ";

	private static final String QUERY_SQL_SURROUND_FILTER_ON_PROTEIN_CUTOFFS__END =
			" ) AS primary_query_result ";

			
	
	@Override
	public List<ReportedPeptide_ProteinSequenceVersionId_Pair_Item_FromSearcher>  getProteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher( 
			
			int searchId,
			List<Integer> reportedPeptideIdList,
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel // For Protein Level Cutoffs
			) throws Exception {

		if ( reportedPeptideIdList.isEmpty() ) {
			//  No Reported Peptide Ids so return empty list
			return new ArrayList<>();
		}

		List<SearcherCutoffValuesAnnotationLevel> proteinCutoffValuesList = searcherCutoffValuesSearchLevel.getProteinPerAnnotationCutoffsList();
		//  If null, create empty list
		if ( proteinCutoffValuesList == null ) {
			proteinCutoffValuesList = new ArrayList<>();
		}
		
		List<ReportedPeptide_ProteinSequenceVersionId_Pair_Item_FromSearcher> resultList = new ArrayList<>();

		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);
		
		StringBuilder querySQLSB = new StringBuilder( 10000 );
		
		
		if ( ! proteinCutoffValuesList.isEmpty() ) {
			//  Filter on Protein Cutoffs
			querySQLSB.append( QUERY_SQL_SURROUND_FILTER_ON_PROTEIN_CUTOFFS__START );
		}
		
		
		querySQLSB.append( QUERY_SQL_PRIMARY );

		int reportedPeptideIdListSize = reportedPeptideIdList.size();
		for ( int counter = 0; counter < reportedPeptideIdListSize; counter++ ) {
			
			if ( counter != 0 ) {
				querySQLSB.append( "," );
			}
			querySQLSB.append( "?" );
		}
		querySQLSB.append( ")" ); // close "IN"

		if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsDecoy_True() ) {
			// Exclude  records where is_decoy = 'true'
			querySQLSB.append( " AND protein_is_decoy != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
		}
		

		if ( ! proteinCutoffValuesList.isEmpty() ) {
			//  Filter on Protein Cutoffs
			
			querySQLSB.append( QUERY_SQL_SURROUND_FILTER_ON_PROTEIN_CUTOFFS__END );

			//  Add inner join for each Protein cutoff

			for ( int counter = 1; counter <= proteinCutoffValuesList.size(); counter++ ) {
				querySQLSB.append( " INNER JOIN " );
				querySQLSB.append( " srch__protein_filterable_annotation_tbl AS " );
				querySQLSB.append( PROTEIN_VALUE_FILTER_TABLE_ALIAS );
				querySQLSB.append( Integer.toString( counter ) );
				querySQLSB.append( " ON "  );
				querySQLSB.append( " primary_query_result.search_id = "  );
				querySQLSB.append( PROTEIN_VALUE_FILTER_TABLE_ALIAS );
				querySQLSB.append( Integer.toString( counter ) );
				querySQLSB.append( ".search_id" );
				querySQLSB.append( " AND " );
				querySQLSB.append( " primary_query_result.protein_sequence_version_id = "  );
				querySQLSB.append( PROTEIN_VALUE_FILTER_TABLE_ALIAS );
				querySQLSB.append( Integer.toString( counter ) );
				querySQLSB.append( ".protein_sequence_version_id" );
			}

			querySQLSB.append( " WHERE " );

			//  Process Protein Cutoffs for WHERE
			{
				int counter = 0; 
				for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesProteinAnnotationLevel : proteinCutoffValuesList ) {
					AnnotationTypeDTO proteinAnnotationTypeDTO = searcherCutoffValuesProteinAnnotationLevel.getAnnotationTypeDTO();
					
					counter++;
					
					if ( counter > 1 ) {
						querySQLSB.append( " AND " );
					}
					
					querySQLSB.append( " ( " );
					querySQLSB.append( PROTEIN_VALUE_FILTER_TABLE_ALIAS );
					querySQLSB.append( Integer.toString( counter ) );
					querySQLSB.append( ".search_id = ? AND " );
					querySQLSB.append( PROTEIN_VALUE_FILTER_TABLE_ALIAS );
					querySQLSB.append( Integer.toString( counter ) );
					querySQLSB.append( ".annotation_type_id = ? AND " );
					querySQLSB.append( PROTEIN_VALUE_FILTER_TABLE_ALIAS );
					querySQLSB.append( Integer.toString( counter ) );
					querySQLSB.append( ".value_double " );
					if ( proteinAnnotationTypeDTO.getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() 
							== FilterDirectionTypeJavaCodeEnum.ABOVE ) {
						querySQLSB.append( SearcherGeneralConstants.SQL_END_BIGGER_VALUE_BETTER );
					} else {
						querySQLSB.append( SearcherGeneralConstants.SQL_END_SMALLER_VALUE_BETTER );
					}
					querySQLSB.append( "? " );
					querySQLSB.append( " ) " );
				}
			}	
		}
		
		
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


			if ( ! proteinCutoffValuesList.isEmpty() ) {
			
				// Process Protein Cutoffs for Containing Select WHERE
				
				{
					for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesProteinAnnotationLevel : proteinCutoffValuesList ) {
						AnnotationTypeDTO srchPgmFilterableProteinAnnotationTypeDTO = searcherCutoffValuesProteinAnnotationLevel.getAnnotationTypeDTO();
						paramCounter++;
						preparedStatement.setInt( paramCounter, searchId );
						paramCounter++;
						preparedStatement.setInt( paramCounter, srchPgmFilterableProteinAnnotationTypeDTO.getId() );
						paramCounter++;
						preparedStatement.setDouble( paramCounter, searcherCutoffValuesProteinAnnotationLevel.getAnnotationCutoffValue() );
					}
				}
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
