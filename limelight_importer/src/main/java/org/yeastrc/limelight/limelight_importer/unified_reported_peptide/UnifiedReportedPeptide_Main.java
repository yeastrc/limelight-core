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

import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_importer.objects.PsmStatisticsAndBestValues;
import org.yeastrc.limelight.limelight_importer.process_input.CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords;
import org.yeastrc.limelight.limelight_importer.process_input.CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords.CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.UnifiedReportedPeptideLookupDTO;

/**
 * Main Processing for creating and saving the Unified Reported Peptide records for a single Reported Peptide
 *
 */
public class UnifiedReportedPeptide_Main {

	private static final Logger log = LoggerFactory.getLogger( UnifiedReportedPeptide_Main.class );
	
	private UnifiedReportedPeptide_Main() { }
	public static UnifiedReportedPeptide_Main getInstance() { return new UnifiedReportedPeptide_Main(); }
	
	public void unifiedReportedPeptide_MainProcessing(
			ReportedPeptide reportedPeptide,
			int searchId,
			ReportedPeptideDTO savedReportedPeptideDTO,
			SearchReportedPeptideDTO savedSearchReportedPeptideDTO,
			List<SearchReportedPeptideFilterableAnnotationDTO> searchReportedPeptideFilterableAnnotationDTOList,
			PsmStatisticsAndBestValues psmStatisticsAndBestValues,
			Map<Integer, AnnotationTypeDTO> filterableReportedPeptideAnnotationTypesOnId,
			int proteinVersionIdsForReportedPeptideCount

			) throws Exception {

		//  Create Unified Reported Peptide data and insert to DB if necessary or get id otherwise.
		UnifiedReportedPeptideLookupDTO unifiedReportedPeptideLookupDTO =
				UnifiedReportedPeptideAndChildren_InsertIfNotInDB.getInstance().insertIfNotInDBUnifiedReportedPeptideAndChildren( reportedPeptide );

		CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result createUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result =
				CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords.getInstance()
				.createUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords( 
						reportedPeptide, 
						searchId, 
						unifiedReportedPeptideLookupDTO.getId(),
						savedReportedPeptideDTO,
						savedSearchReportedPeptideDTO,
						searchReportedPeptideFilterableAnnotationDTOList, 
						psmStatisticsAndBestValues, 
						filterableReportedPeptideAnnotationTypesOnId,
						proteinVersionIdsForReportedPeptideCount );

		UnifiedReportedPeptide_SavePerSearchLookupRecords.getInstance()
		.savePerSearchLookupRecords( createUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result, unifiedReportedPeptideLookupDTO.getId() );
	}
}