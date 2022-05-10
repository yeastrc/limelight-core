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
import org.yeastrc.limelight.limelight_shared.enum_classes.Yes_No__NOT_APPLICABLE_Enum;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesAnnotationLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF;

/**
 * 
 * !!!  WARNING  !!!!
 * 
 * Call ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList(...) to get:
 * 
 *    1)  Correct call for Default Cutoffs when possible to get faster query
 * 
 * 
 * 
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

	@Autowired
	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;

	
	
	private final String SQL = 
			"SELECT search__rep_pept__lookup_tbl.reported_peptide_id, "
					+ " search__rep_pept__lookup_tbl.has_dynamic_modifictions, "
					+ " search__rep_pept__lookup_tbl.any_psm_has_dynamic_modifications, "
					+ " search__rep_pept__lookup_tbl.any_psm_has_open_modifictions, "
					+ " search__rep_pept__lookup_tbl.any_psm_has_reporter_ions, "
					+ " search__rep_pept__lookup_tbl.psm_num_targets_only_at_default_cutoff, "
					+ " search__rep_pept__lookup_tbl.psm_num_indpendent_decoys_only_at_default_cutoff, "
					+ " search__rep_pept__lookup_tbl.psm_num_decoys_only_at_default_cutoff "
					
			+ " FROM search__rep_pept__lookup_tbl "

			+ " WHERE search__rep_pept__lookup_tbl.search_id = ? ";

	private final String SQL_PSM_NUM_CHECK__TARGET_COUNTS = 
			//  # targets >= minimumNumberOfPSMsPerReportedPeptide
			" AND ( search__rep_pept__lookup_tbl.psm_num_targets_only_at_default_cutoff >= ? ) ";
	

	private final String SQL_PSM_NUM_CHECK__TARGET_AND_INDEPENDENT_DECOY_COUNTS = 
			//  # targets + # independent decoys >= minimumNumberOfPSMsPerReportedPeptide
			" AND ( ( search__rep_pept__lookup_tbl.psm_num_targets_only_at_default_cutoff + search__rep_pept__lookup_tbl.psm_num_indpendent_decoys_only_at_default_cutoff ) >= ? ) ";
	
	/**
	 * !!!  WARNING  !!!!
	 * 
	 * Call ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList(...) to get:
	 * 
	 *    1)  Correct call for Default Cutoffs when possible to get faster query
	 * 
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
			int minimumNumberOfPSMsPerReportedPeptide ) throws Exception {
		
		if ( minimumNumberOfPSMsPerReportedPeptide < 1 ) {
			String msg = "minimumNumberOfPSMsPerReportedPeptide must be >= 1";
			log.error( msg );
			throw new IllegalArgumentException(msg);
		}
		
		List<SearcherCutoffValuesAnnotationLevel> peptideCutoffValuesList = searcherCutoffValuesSearchLevel.getPeptidePerAnnotationCutoffsList();

		List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> resultList = new ArrayList<>();
		
		StringBuilder sqlSB = new StringBuilder( 1000 );
		
		sqlSB.append( SQL );

		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);
		if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsIndependentDecoy_True() ) {
			
			// Have psm_tbl.is_independent_decoy is true so use condition

			sqlSB.append( SQL_PSM_NUM_CHECK__TARGET_AND_INDEPENDENT_DECOY_COUNTS );

		} else {

			sqlSB.append( SQL_PSM_NUM_CHECK__TARGET_COUNTS );

		}
		
		
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
					{
						int reportedPeptideHas_DynamicModifications_Int = rs.getInt( "has_dynamic_modifictions" );
						if ( reportedPeptideHas_DynamicModifications_Int == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							item.setReportedPeptideHas_DynamicModifications(true);
						}
					}
					{
						int anyPsmHas_DynamicModifications_Int = rs.getInt( "any_psm_has_dynamic_modifications" );
						if ( anyPsmHas_DynamicModifications_Int == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							item.setAnyPsmHas_DynamicModifications(true);
						}
					}
					{
						int field_Int = rs.getInt( "any_psm_has_open_modifictions" );
						if ( field_Int == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							item.setAnyPsmHas_OpenModifications(true);
						}
					}
					{
						int anyPsmHas_ReporterIons_Int = rs.getInt( "any_psm_has_reporter_ions" );
						if ( anyPsmHas_ReporterIons_Int == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							item.setAnyPsmHas_ReporterIons(true);
						}
					}
					
					item.setNumPsms_Targets_IfComputedOrInDB( rs.getInt( "psm_num_targets_only_at_default_cutoff" ) );  
					item.setNumPsms_IndependentDecoys_IfComputedOrInDB( rs.getInt( "psm_num_indpendent_decoys_only_at_default_cutoff" ) );  
					item.setNumPsms_Decoys_IfComputedOrInDB( rs.getInt( "psm_num_decoys_only_at_default_cutoff" ) );  
					
					//  TODO  For now assign to this the # targets + # Independent Decoys
					item.setNumPsms_IfComputedOrInDB( item.getNumPsms_Targets_IfComputedOrInDB() + item.getNumPsms_IndependentDecoys_IfComputedOrInDB() );
					
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
