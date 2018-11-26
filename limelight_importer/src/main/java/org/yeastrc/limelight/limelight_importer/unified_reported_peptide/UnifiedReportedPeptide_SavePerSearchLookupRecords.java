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
package org.yeastrc.limelight.limelight_importer.unified_reported_peptide;


import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_UnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_UnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_UnifiedRepPep_Search_ReportedPeptide__Lookup__DAO;
import org.yeastrc.limelight.limelight_importer.process_input.CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords.CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result;
import org.yeastrc.limelight.limelight_shared.dto.UnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO;
import org.yeastrc.limelight.limelight_shared.dto.UnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO;

/**
 * Package Private
 * 
 * Save to Per Search Lookup tables
 * 
 * Save to tables:
 * 
 *   unified_rp__search__rep_pept__lookup_tbl
 *   unified_rp__search__rep_pept__best_psm_value_lookup_tbl
 *   unified_rp__search_reported_peptide_fltbl_value_lookup_tbl
 *
 */
class UnifiedReportedPeptide_SavePerSearchLookupRecords {

	private static final Logger log = LoggerFactory.getLogger( UnifiedReportedPeptide_SavePerSearchLookupRecords.class );
	
	private UnifiedReportedPeptide_SavePerSearchLookupRecords() { }
	public static UnifiedReportedPeptide_SavePerSearchLookupRecords getInstance() { return new UnifiedReportedPeptide_SavePerSearchLookupRecords(); }

	/**
	 * @param sequence
	 * @return
	 * @throws Exception
	 */
	public void savePerSearchLookupRecords( 
			CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result createUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result,
			int unifiedReportedPeptideId ) throws Exception {

		DB_Insert_UnifiedRepPep_Search_ReportedPeptide__Lookup__DAO.getInstance()
		.saveToDatabase( createUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result.getUnifiedRepPep_Search_ReportedPeptide__Lookup__DTO() );
		
		if ( createUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result.getUnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO_List() != null 
				&& ( ! createUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result.getUnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO_List().isEmpty() ) ) {
			DB_Insert_UnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO dao = DB_Insert_UnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO.getInstance();
			for ( UnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO item : createUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result.getUnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO_List() ) {
				item.setUnifiedReportedPeptideId( unifiedReportedPeptideId );
				dao.saveToDatabase( item );
			}
		}
		
		if ( createUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result.getUnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO_List() != null 
				&& ( ! createUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result.getUnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO_List().isEmpty() ) ) {
			DB_Insert_UnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DAO dao = DB_Insert_UnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DAO.getInstance();
			for ( UnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO item : createUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result.getUnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO_List() ) {
				item.setUnifiedReportedPeptideId( unifiedReportedPeptideId );
				dao.saveToDatabase( item );
			}
		}
	}
}
