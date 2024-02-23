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
import org.yeastrc.limelight.limelight_shared.constants.SearcherGeneralConstants;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesAnnotationLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF;

/**
 * 
 *
 */
@Component
public class ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher extends Limelight_JDBC_Base implements ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher.class );

	@Autowired
	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;

	//  WARNING::  Fields 'protein_pre_residue' and 'protein_post_residue' were added and may be null/Not Populated.
	//					If these fields are needed here, 
	//					see how results from class ProteinCoverageForSearchIdReportedPeptideIdsSearcher are handled.


	private final String PROTEIN_VALUE_FILTER_TABLE_ALIAS = "srch__protein_fltrbl_tbl_";
	
	private static final String QUERY_START_SQL = 
			"SELECT protein_coverage_tbl.reported_peptide_id, protein_coverage_tbl.protein_sequence_version_id, protein_coverage_tbl.protein_start_position "
			+ " FROM "
			+ " protein_coverage_tbl ";
			
			
	private static final String QUERY_WHERE_START_SQL =
			" WHERE search_id = ? AND reported_peptide_id IN ( "; //  Add closing ")" in code

	/**
	 * Results
	 *
	 */
	public static class ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result {
		
		List<ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result_Item> results;

		public List<ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result_Item> getResults() {
			return results;
		}
	}
	
	/**
	 * 
	 *
	 */
	public static class ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result_Item {

		private int reportedPeptideId;
		private int proteinSequenceVersionId;
		private int proteinStartPosition;
		
		public int getReportedPeptideId() {
			return reportedPeptideId;
		}
		public int getProteinSequenceVersionId() {
			return proteinSequenceVersionId;
		}
		public int getProteinStartPosition() {
			return proteinStartPosition;
		}
	}
	
	/**
	 * @param searchId
	 * @param reportedPeptideIds
	 * @return
	 * @throws Exception
	 */
	
	@Override
	public ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result 
	
	getProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIds(
			
			int searchId,
			List<Integer> reportedPeptideIds,
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws Exception {

		if ( reportedPeptideIds == null ) {
			final String msg = "reportedPeptideIds == null";
			log.error( msg );
			throw new IllegalArgumentException( msg );
		}

		List<ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result_Item> results = new ArrayList<>();


		if ( reportedPeptideIds.isEmpty() ) {
			
			//  No Reported Peptides
			
			ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result result = new ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result();
			result.results = results;
			
			return result; //  EARLY RETURN
		}

		List<SearcherCutoffValuesAnnotationLevel> proteinCutoffValuesList = searcherCutoffValuesSearchLevel.getProteinPerAnnotationCutoffsList();
		//  If null, create empty list
		if ( proteinCutoffValuesList == null ) {
			proteinCutoffValuesList = new ArrayList<>();
		}
		

		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);
		
		
		StringBuilder sqlSB = new StringBuilder( 100000 );
		
		sqlSB.append( QUERY_START_SQL );
		
		
		//  TODO  Optimize for where ALL Protein Filters match Default Filters


		if ( ! proteinCutoffValuesList.isEmpty() ) {
			
			// Filter on Protein Annotations.  Subquery to remove duplicate reported_peptide_id 
					
			sqlSB.append( " INNER JOIN ( " );

			sqlSB.append( " SELECT DISTINCT " ); 
			
			sqlSB.append( " protein_coverage_tbl.protein_sequence_version_id " ); 
			sqlSB.append( " FROM protein_coverage_tbl " );

			//  Add inner join for each Protein cutoff

			for ( int counter = 1; counter <= proteinCutoffValuesList.size(); counter++ ) {
				sqlSB.append( " INNER JOIN " );
				sqlSB.append( " srch__protein_filterable_annotation_tbl AS " );
				sqlSB.append( PROTEIN_VALUE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( " ON "  );
				sqlSB.append( " protein_coverage_tbl.search_id = "  );
				sqlSB.append( PROTEIN_VALUE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".search_id" );
				sqlSB.append( " AND " );
				sqlSB.append( " protein_coverage_tbl.protein_sequence_version_id = "  );
				sqlSB.append( PROTEIN_VALUE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".protein_sequence_version_id" );
			}

			sqlSB.append( " WHERE " );
			sqlSB.append( " protein_coverage_tbl.search_id = ? " );

			//  Process Protein Cutoffs for WHERE
			{
				int counter = 0; 
				for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesProteinAnnotationLevel : proteinCutoffValuesList ) {
					AnnotationTypeDTO proteinAnnotationTypeDTO = searcherCutoffValuesProteinAnnotationLevel.getAnnotationTypeDTO();
					counter++;
					sqlSB.append( " AND " );
					sqlSB.append( " ( " );
					sqlSB.append( PROTEIN_VALUE_FILTER_TABLE_ALIAS );
					sqlSB.append( Integer.toString( counter ) );
					sqlSB.append( ".search_id = ? AND " );
					sqlSB.append( PROTEIN_VALUE_FILTER_TABLE_ALIAS );
					sqlSB.append( Integer.toString( counter ) );
					sqlSB.append( ".annotation_type_id = ? AND " );
					sqlSB.append( PROTEIN_VALUE_FILTER_TABLE_ALIAS );
					sqlSB.append( Integer.toString( counter ) );
					sqlSB.append( ".value_double " );
					if ( proteinAnnotationTypeDTO.getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() 
							== FilterDirectionTypeJavaCodeEnum.ABOVE ) {
						sqlSB.append( SearcherGeneralConstants.SQL_END_BIGGER_VALUE_BETTER );
					} else {
						sqlSB.append( SearcherGeneralConstants.SQL_END_SMALLER_VALUE_BETTER );
					}
					sqlSB.append( "? " );
					sqlSB.append( " ) " );
				}
			}	

			sqlSB.append( "  ) AS protein_filtered_reported_peptide_ids " );
			sqlSB.append( " ON protein_coverage_tbl.protein_sequence_version_id = protein_filtered_reported_peptide_ids.protein_sequence_version_id " );
			
		}
		
		
		sqlSB.append( QUERY_WHERE_START_SQL );
		
		for ( int i = 0; i < reportedPeptideIds.size(); i++ ) {
			if ( i != 0 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		sqlSB.append( ")" ); // closing IN

		if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsDecoy_True() ) {
			// Exclude  records where is_decoy = 'true'
			sqlSB.append( " AND protein_is_decoy != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
		}
		
		final String querySQL = sqlSB.toString();
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;

			if ( ! proteinCutoffValuesList.isEmpty() ) {
			
				// Process Protein Cutoffs for SubSelect WHERE
				
				counter++;
				preparedStatement.setInt( counter, searchId );
				
				{
					for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesProteinAnnotationLevel : proteinCutoffValuesList ) {
						AnnotationTypeDTO srchPgmFilterableProteinAnnotationTypeDTO = searcherCutoffValuesProteinAnnotationLevel.getAnnotationTypeDTO();
						counter++;
						preparedStatement.setInt( counter, searchId );
						counter++;
						preparedStatement.setInt( counter, srchPgmFilterableProteinAnnotationTypeDTO.getId() );
						counter++;
						preparedStatement.setDouble( counter, searcherCutoffValuesProteinAnnotationLevel.getAnnotationCutoffValue() );
					}
				}
			}
			
			counter++;
			preparedStatement.setInt( counter, searchId );
			
			for ( Integer reportedPeptideId : reportedPeptideIds ) {
				counter++;
				preparedStatement.setInt( counter, reportedPeptideId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					
					ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result_Item item = new ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result_Item();
					item.reportedPeptideId = rs.getInt( "reported_peptide_id" );
					item.proteinSequenceVersionId = rs.getInt( "protein_sequence_version_id" );
					item.proteinStartPosition = rs.getInt( "protein_start_position" );
					results.add( item );
				}
			}
		} catch ( Exception e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result result = new ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result();
		
		result.results = results;
		
		return result;
	}
	
}
