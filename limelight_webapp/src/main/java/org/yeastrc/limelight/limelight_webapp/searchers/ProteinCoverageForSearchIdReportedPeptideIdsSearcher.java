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
 * !!!   WARNING::  Fields 'protein_pre_residue', 'protein_post_residue', 'peptide_at_protein_start_flag', 'peptide_at_protein_end_flag'
 *						 were added and may be null/Not Populated.
 * 						See how existing calls to this Searcher handle that.
 *
 */
@Component
public class ProteinCoverageForSearchIdReportedPeptideIdsSearcher extends Limelight_JDBC_Base implements ProteinCoverageForSearchIdReportedPeptideIdsSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( ProteinCoverageForSearchIdReportedPeptideIdsSearcher.class );

	@Autowired
	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;

	/**
	 * Results
	 *
	 */
	public static class ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result {
		
		List<ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result_Item> results;

		public List<ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result_Item> getResults() {
			return results;
		}
	}

	/**
	 * Result from ProteinCoverageForSearchIdReportedPeptideIdSearcher
	 *
	 */
	public static class ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result_Item {

		private int protein_coverage_tbl__id; // protein_coverage_tbl.id
		private int reportedPeptideId;
		private int proteinSequenceVersionId;
		private int proteinStartPosition;
		private int proteinEndPosition;
		private boolean proteinIsIndependentDecoy;
		
		private String protein_PreResidue;  //  protein residue before peptide or 'n' if peptide at start of protein.  null until computed
		private String protein_PostResidue; //  protein residue after peptide or 'c' if peptide at end of protein.  null until computed

		private Boolean peptideAtProteinStart_Flag;  //  peptide at start of protein.  null until computed
		private Boolean peptideAtProteinEnd_Flag;  //  peptide at end of protein.  null until computed
		
		/**
		 * protein_coverage_tbl.id
		 * @return
		 */
		public int getProtein_coverage_tbl__id() {
			return protein_coverage_tbl__id;
		}

		/**
		 * null until computed
		 * @return
		 */
		public String getProtein_PreResidue() {
			return protein_PreResidue;
		}
		/**
		 * null until computed
		 * @return
		 */
		public String getProtein_PostResidue() {
			return protein_PostResidue;
		}

		/**
		 * null until computed
		 * @return
		 */
		public Boolean getPeptideAtProteinStart_Flag() {
			return peptideAtProteinStart_Flag;
		}

		/**
		 * null until computed
		 * @return
		 */
		public Boolean getPeptideAtProteinEnd_Flag() {
			return peptideAtProteinEnd_Flag;
		}

		
		
		public int getReportedPeptideId() {
			return reportedPeptideId;
		}
		public int getProteinSequenceVersionId() {
			return proteinSequenceVersionId;
		}
		public int getProteinStartPosition() {
			return proteinStartPosition;
		}
		public int getProteinEndPosition() {
			return proteinEndPosition;
		}
		public boolean isProteinIsIndependentDecoy() {
			return proteinIsIndependentDecoy;
		}


	}

	private static final String QUERY_SQL = 
			"SELECT id, reported_peptide_id, protein_sequence_version_id, protein_start_position, protein_end_position, protein_is_independent_decoy,"
			+ " protein_pre_residue, protein_post_residue, peptide_at_protein_start_flag, peptide_at_protein_end_flag "
			+ " FROM "
			+ " protein_coverage_tbl "
			+ " WHERE search_id = ? AND reported_peptide_id IN ( "; //  Add closing ")" in code

	/**
	 * @param searchId
	 * @param reportedPeptideIds
	 * @return
	 * @throws Exception
	 */
	@Override
	public ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result getProteinCoverageForSearchIdReportedPeptideIds(
			int searchId, List<Integer> reportedPeptideIds ) throws Exception {

		if ( reportedPeptideIds == null ) {
			final String msg = "reportedPeptideIds == null";
			log.error( msg );
			throw new IllegalArgumentException( msg );
		}

		if ( reportedPeptideIds.isEmpty() ) {
			
			//  No Reported Peptides
			
			ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result result = new ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result();
			result.results = new ArrayList<>();
			
			return result; //  EARLY RETURN
		}
		
		List<ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result_Item> results = new ArrayList<>();

		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);
				
		StringBuilder sqlSB = new StringBuilder( 100000 );
		
		sqlSB.append( QUERY_SQL );
		
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
			counter++;
			preparedStatement.setInt( counter, searchId );
			
			for ( Integer reportedPeptideId : reportedPeptideIds ) {
				counter++;
				preparedStatement.setInt( counter, reportedPeptideId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					
					ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result_Item item = new ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result_Item();
					item.protein_coverage_tbl__id = rs.getInt( "id" );
					item.reportedPeptideId = rs.getInt( "reported_peptide_id" );
					item.proteinSequenceVersionId = rs.getInt( "protein_sequence_version_id" );
					item.proteinStartPosition = rs.getInt( "protein_start_position" );
					item.proteinEndPosition = rs.getInt( "protein_end_position" );
					{
						int fieldInt = rs.getInt( "protein_is_independent_decoy" );
						if ( fieldInt == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							item.proteinIsIndependentDecoy = true;
						}
					}
					item.protein_PreResidue = ( rs.getString( "protein_pre_residue" ) );
					item.protein_PostResidue = ( rs.getString( "protein_post_residue" ) );
					{
						int fieldInt = rs.getInt( "peptide_at_protein_start_flag" );
						if ( rs.wasNull() ) {
							item.peptideAtProteinStart_Flag = null;
						} else if ( fieldInt == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							item.peptideAtProteinStart_Flag = true;
						} else {
							item.peptideAtProteinStart_Flag = false;
						}
					}
					{
						int fieldInt = rs.getInt( "peptide_at_protein_end_flag" );
						if ( rs.wasNull() ) {
							item.peptideAtProteinEnd_Flag = null;
						} else if ( fieldInt == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							item.peptideAtProteinEnd_Flag = true;
						} else {
							item.peptideAtProteinEnd_Flag = false;
						}
					}
					
					results.add( item );
				}
			}
		} catch ( Exception e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result result = new ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result();
		
		result.results = results;
		
		return result;
	}
	
}
