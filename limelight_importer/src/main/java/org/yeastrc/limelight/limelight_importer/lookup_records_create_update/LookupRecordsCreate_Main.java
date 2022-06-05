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

import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_importer.batch_insert_db_records.SearchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records;
import org.yeastrc.limelight.limelight_importer.objects.PsmStatisticsAndBestValues;
import org.yeastrc.limelight.limelight_importer.process_input.CreateSearchReportedPeptideLevelLookupRecords;
import org.yeastrc.limelight.limelight_importer.process_input.CreateSearchReportedPeptideLevelLookupRecords.SearchReportedPeptideLevelLookupRecords_Create_Result;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideFilterableAnnotationDTO;

/**
 * Main Processing for creating and saving the Lookup records for a single Reported Peptide for the Search
 *
 */
public class LookupRecordsCreate_Main {

	private static final Logger log = LoggerFactory.getLogger( LookupRecordsCreate_Main.class );
	
	private LookupRecordsCreate_Main() { }
	public static LookupRecordsCreate_Main getInstance() { return new LookupRecordsCreate_Main(); }
	
	/**
	 * @param reportedPeptide
	 * @param searchId
	 * @param savedReportedPeptideDTO
	 * @param savedSearchReportedPeptideDTO
	 * @param searchReportedPeptideFilterableAnnotationDTOList
	 * @param psmStatisticsAndBestValues
	 * @param filterableReportedPeptideAnnotationTypesOnId
	 * @param proteinVersionIdsForReportedPeptideCount
	 * @throws Exception
	 */
	public void reportedPeptide_Lookup_MainProcessing(
			ReportedPeptide reportedPeptide,
			int searchId,
			ReportedPeptideDTO savedReportedPeptideDTO,
			SearchReportedPeptideDTO savedSearchReportedPeptideDTO,
			List<SearchReportedPeptideFilterableAnnotationDTO> searchReportedPeptideFilterableAnnotationDTOList,
			PsmStatisticsAndBestValues psmStatisticsAndBestValues,
			Map<Integer, AnnotationTypeDTO> filterableReportedPeptideAnnotationTypesOnId,
			int proteinVersionIdsForReportedPeptideCount,
			
			SearchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records searchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records

			) throws Exception {

		SearchReportedPeptideLevelLookupRecords_Create_Result searchReportedPeptideLevelLookupRecords_Create_Result =
				CreateSearchReportedPeptideLevelLookupRecords.getInstance()
				.createSearchReportedPeptideLevelLookupRecords( 
						reportedPeptide, 
						searchId, 
						savedReportedPeptideDTO,
						savedSearchReportedPeptideDTO,
						searchReportedPeptideFilterableAnnotationDTOList, 
						psmStatisticsAndBestValues, 
						filterableReportedPeptideAnnotationTypesOnId,
						proteinVersionIdsForReportedPeptideCount );
		
		searchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records.add_SearchReportedPeptideLevelLookupRecords_Create_Result(searchReportedPeptideLevelLookupRecords_Create_Result);
	}
}