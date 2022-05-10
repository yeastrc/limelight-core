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
package org.yeastrc.limelight.limelight_importer.lookup_records_create_update;


import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Search_ReportedPeptide__Lookup__DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO.DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType;
import org.yeastrc.limelight.limelight_importer.process_input.CreateSearchReportedPeptideLevelLookupRecords.CreateSearchReportedPeptideLevelLookupRecords_Result;
import org.yeastrc.limelight.limelight_shared.dto.Search_ReportedPeptide_BestPsmValue_Lookup__DTO;

/**
 * Package Private
 * 
 * Save to Per Search Lookup tables
 * 
 * Save to tables:
 * 
 *   search__rep_pept__lookup_tbl
 *   search__rep_pept__best_psm_value_lookup_tbl
 *
 */
class LookupRecords_SavePerSearchLookupRecords {

	private static final Logger log = LoggerFactory.getLogger( LookupRecords_SavePerSearchLookupRecords.class );
	
	private LookupRecords_SavePerSearchLookupRecords() { }
	public static LookupRecords_SavePerSearchLookupRecords getInstance() { return new LookupRecords_SavePerSearchLookupRecords(); }

	/**
	 * @param createSearchReportedPeptideLevelLookupRecords_Result
	 * @throws Exception
	 */
	public void savePerSearchLookupRecords( 
			CreateSearchReportedPeptideLevelLookupRecords_Result createSearchReportedPeptideLevelLookupRecords_Result ) throws Exception {

		DB_Insert_Search_ReportedPeptide__Lookup__DAO.getInstance()
		.saveToDatabase( createSearchReportedPeptideLevelLookupRecords_Result.getSearch_ReportedPeptide__Lookup__DTO() );

		DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO dao = DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO.getInstance();
		
		if ( createSearchReportedPeptideLevelLookupRecords_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets() != null 
				&& ( ! createSearchReportedPeptideLevelLookupRecords_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets().isEmpty() ) ) {
			
			for ( Search_ReportedPeptide_BestPsmValue_Lookup__DTO item : createSearchReportedPeptideLevelLookupRecords_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets() ) {
				dao.saveToDatabase( item, DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType.TARGET );
			}
		}

		if ( createSearchReportedPeptideLevelLookupRecords_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys() != null 
				&& ( ! createSearchReportedPeptideLevelLookupRecords_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys().isEmpty() ) ) {
			
			for ( Search_ReportedPeptide_BestPsmValue_Lookup__DTO item : createSearchReportedPeptideLevelLookupRecords_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys() ) {
				dao.saveToDatabase( item, DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType.TARGET_INDEPENDENT_DECOY );
			}
		}

		if ( createSearchReportedPeptideLevelLookupRecords_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys_Decoys() != null 
				&& ( ! createSearchReportedPeptideLevelLookupRecords_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys_Decoys().isEmpty() ) ) {
			
			for ( Search_ReportedPeptide_BestPsmValue_Lookup__DTO item : createSearchReportedPeptideLevelLookupRecords_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys_Decoys() ) {
				dao.saveToDatabase( item, DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType.TARGET_INDEPENDENT_DECOY_DECOY );
			}
		}
	}
}
