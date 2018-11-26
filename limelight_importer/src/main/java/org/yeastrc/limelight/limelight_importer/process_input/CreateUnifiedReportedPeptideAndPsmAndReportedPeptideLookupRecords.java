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
package org.yeastrc.limelight.limelight_importer.process_input;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.PsmStatisticsAndBestValues;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeFilterableDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.UnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO;
import org.yeastrc.limelight.limelight_shared.dto.UnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO;
import org.yeastrc.limelight.limelight_shared.dto.UnifiedRepPep_Search_ReportedPeptide__Lookup__DTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_shared.enum_classes.Yes_No__NOT_APPLICABLE_Enum;

/**
 * Create records to insert in:
 * 
 *    unified_rp__search__rep_pept__lookup_tbl
 *        * Search/Reported Peptide level roll up info
 *        
 *    unified_rp__search_reported_peptide_fltbl_value_lookup_tbl
 *        * Search/Reported Peptide per Filterable Annotation level roll up info
 *         
 *    unified_rp__search__rep_pept__best_psm_value_lookup_tbl
 *        * Search/Reported Peptide Best PSM Filterable Annotation level Value roll up info    
 *
 */
public class CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords {

	private static final Logger log = LoggerFactory.getLogger( CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords.class );
	
	private CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords() { }
	public static CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords getInstance() { return new CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords(); }

	/**
	 * Result from createUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords
	 *
	 */
	public static class CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result {
		
		private UnifiedRepPep_Search_ReportedPeptide__Lookup__DTO unifiedRepPep_Search_ReportedPeptide__Lookup__DTO;
		private List<UnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO> unifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO_List;
		private List<UnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO> unifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO_List;
		
		public UnifiedRepPep_Search_ReportedPeptide__Lookup__DTO getUnifiedRepPep_Search_ReportedPeptide__Lookup__DTO() {
			return unifiedRepPep_Search_ReportedPeptide__Lookup__DTO;
		}
		public List<UnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO> getUnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO_List() {
			return unifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO_List;
		}
		public List<UnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO> getUnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO_List() {
			return unifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO_List;
		}
	}


	/**
	 * @param reportedPeptide
	 * @param searchId
	 * @param unifiedReportedPeptideLookupDTO
	 * @param reportedPeptideDTO
	 * @param searchReportedPeptideFilterableAnnotationDTOList
	 * @param psmStatisticsAndBestValues
	 * @param filterableReportedPeptideAnnotationTypesOnId
	 * @return
	 * @throws Exception
	 */
	public CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result createUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords( 
			ReportedPeptide reportedPeptide,
			int searchId,
			int unifiedReportedPeptideLookup_Id,
			ReportedPeptideDTO savedReportedPeptideDTO,
			SearchReportedPeptideDTO savedSearchReportedPeptideDTO,
			List<SearchReportedPeptideFilterableAnnotationDTO> searchReportedPeptideFilterableAnnotationDTOList,
			PsmStatisticsAndBestValues psmStatisticsAndBestValues,
			Map<Integer, AnnotationTypeDTO> filterableReportedPeptideAnnotationTypesOnId,
			int proteinVersionIdsForReportedPeptideCount
			) throws Exception {
		
		int reportedPeptide_Id = savedReportedPeptideDTO.getId();
		
		CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result methodResult =
				new CreateUnifiedReportedPeptideAndPsmAndReportedPeptideLookupRecords_Result();
		
		boolean relatedPeptideUniqueForSearch = true;
		boolean hasDynamicModifications = false;
		boolean hasIsotopeLabels = false;
		boolean anyPsmHasDynamicModifications = false;
		
		if ( reportedPeptide.getPeptideModifications() != null 
				&& reportedPeptide.getPeptideModifications().getPeptideModification() != null 
				&& ( ! reportedPeptide.getPeptideModifications().getPeptideModification().isEmpty() ) ) {
			hasDynamicModifications = true;
		}
		
		if ( reportedPeptide.getPeptideIsotopeLabels() != null 
				&& reportedPeptide.getPeptideIsotopeLabels().getPeptideIsotopeLabel() != null  ) {
			hasIsotopeLabels = true;
		}
		
		if ( savedSearchReportedPeptideDTO.isAnyPsmHasDynamicModifications() ) {
			anyPsmHasDynamicModifications = true;
		}
		
		if ( proteinVersionIdsForReportedPeptideCount < 1 ) {
			final String msg = "ERROR: proteinVersionIdsForReportedPeptideCount < 1. proteinVersionIdsForReportedPeptideCount: " + proteinVersionIdsForReportedPeptideCount;
			log.error( msg );
			throw new LimelightImporterInternalException(msg);
		}
		
		if ( proteinVersionIdsForReportedPeptideCount > 1 ) {
			
			//  Peptide maps to > 1 protein version id so make relatedPeptideUniqueForSearch false
			relatedPeptideUniqueForSearch = false;
		}
		

		//  Determine statistic for reported peptide
		/////////   One is: Does Reported Peptide pass default cutoffs
		//  peptideMeetsDefaultCutoffs values:
		//           Not Applicable:  No filterable annotations or no default filterable annotations:
		//           No:              Does NOT meet default cutoffs
		//           Yes:             Does meet default cutoffs
		Yes_No__NOT_APPLICABLE_Enum peptideMeetsDefaultCutoffs = Yes_No__NOT_APPLICABLE_Enum.NOT_APPLICABLE;
		
		for ( SearchReportedPeptideFilterableAnnotationDTO searchReportedPeptideFilterableAnnotationDTO : searchReportedPeptideFilterableAnnotationDTOList ) {
			AnnotationTypeDTO annotationTypeDTO = filterableReportedPeptideAnnotationTypesOnId.get( searchReportedPeptideFilterableAnnotationDTO.getAnnotationTypeId() );
			if ( annotationTypeDTO == null ) {
				String msg = "annotationTypeDTO not found (== null) for AnnotationTypeId: " 
						+ searchReportedPeptideFilterableAnnotationDTO.getAnnotationTypeId() 
						+ ", reportedPeptideId: " + reportedPeptide_Id;
				log.error( msg );
				throw new LimelightImporterInternalException(msg);
			}
			AnnotationTypeFilterableDTO annotationTypeFilterableDTO = annotationTypeDTO.getAnnotationTypeFilterableDTO();
			if ( annotationTypeFilterableDTO == null ) {
				String msg = "annotationTypeFilterableDTO not found (== null) on annotationTypeDTO for AnnotationTypeId: " 
						+ searchReportedPeptideFilterableAnnotationDTO.getAnnotationTypeId() 
						+ ", reportedPeptideId: " + reportedPeptide_Id;
				log.error( msg );
				throw new LimelightImporterInternalException(msg);
			}
			if ( annotationTypeFilterableDTO.isDefaultFilterAtDatabaseLoad() ) {
				//  Found at least one default filter, set peptideMeetsDefaultCutoffs to YES if still NOT_APPLICABLE
				if ( peptideMeetsDefaultCutoffs == Yes_No__NOT_APPLICABLE_Enum.NOT_APPLICABLE ) {
					peptideMeetsDefaultCutoffs = Yes_No__NOT_APPLICABLE_Enum.YES;
				}
				//  Compare value to default
				if ( annotationTypeFilterableDTO.getDefaultFilterValueAtDatabaseLoad() == null ) {
					
					//  No Default Filter Value so leave YES
					  // TODO  Is this RIGHT?????  !!!!!!!!!!!!!
				
				} else if ( annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
					if ( searchReportedPeptideFilterableAnnotationDTO.getValueDouble() 
							< annotationTypeFilterableDTO.getDefaultFilterValueAtDatabaseLoad() ) {
						peptideMeetsDefaultCutoffs = Yes_No__NOT_APPLICABLE_Enum.NO;
					}
				} else if ( annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.BELOW ) {
					if ( searchReportedPeptideFilterableAnnotationDTO.getValueDouble() 
							> annotationTypeFilterableDTO.getDefaultFilterValueAtDatabaseLoad() ) {
						peptideMeetsDefaultCutoffs = Yes_No__NOT_APPLICABLE_Enum.NO;
					}
				} else {
					String msg = " Unexpected FilterDirectionType value:  " + annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum()
							+ ", for annotationTypeId: " + searchReportedPeptideFilterableAnnotationDTO.getAnnotationTypeId();
					log.error( msg );
					throw new LimelightImporterDataException(msg);
				}
			}
		}
		
		//  Per Search Reported Peptide record
		UnifiedRepPep_Search_ReportedPeptide__Lookup__DTO unifiedRepPep_Search_ReportedPeptide__Lookup__DTO =
				new UnifiedRepPep_Search_ReportedPeptide__Lookup__DTO();
		unifiedRepPep_Search_ReportedPeptide__Lookup__DTO.setSearchId( searchId );
		unifiedRepPep_Search_ReportedPeptide__Lookup__DTO.setUnifiedReportedPeptideId( unifiedReportedPeptideLookup_Id );
		unifiedRepPep_Search_ReportedPeptide__Lookup__DTO.setReportedPeptideId( reportedPeptide_Id );
		unifiedRepPep_Search_ReportedPeptide__Lookup__DTO.setRelatedPeptideUniqueForSearch( relatedPeptideUniqueForSearch );
		unifiedRepPep_Search_ReportedPeptide__Lookup__DTO.setHasDynamicModifications( hasDynamicModifications );
		unifiedRepPep_Search_ReportedPeptide__Lookup__DTO.setHasIsotopeLabels( hasIsotopeLabels );
		unifiedRepPep_Search_ReportedPeptide__Lookup__DTO.setAnyPsmHasDynamicModifications( anyPsmHasDynamicModifications );
		unifiedRepPep_Search_ReportedPeptide__Lookup__DTO.setPsmNumAtDefaultCutoff( psmStatisticsAndBestValues.getPsmCountPassDefaultCutoffs() );
		unifiedRepPep_Search_ReportedPeptide__Lookup__DTO.setPeptideMeetsDefaultCutoffs( peptideMeetsDefaultCutoffs );
		
		methodResult.unifiedRepPep_Search_ReportedPeptide__Lookup__DTO = unifiedRepPep_Search_ReportedPeptide__Lookup__DTO;
		
		List<UnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO> unifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO_List = 
				new ArrayList<> ( searchReportedPeptideFilterableAnnotationDTOList.size() );
		methodResult.unifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO_List = unifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO_List;
		
		for ( SearchReportedPeptideFilterableAnnotationDTO searchReportedPeptideFilterableAnnotationDTO : searchReportedPeptideFilterableAnnotationDTOList ) {
			//   Peptide Annotation Values
			UnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO unifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO =
					new UnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO( unifiedRepPep_Search_ReportedPeptide__Lookup__DTO );
			unifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO.setAnnotationTypeId( searchReportedPeptideFilterableAnnotationDTO.getAnnotationTypeId() );
			unifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO.setPeptideValueForAnnTypeId( searchReportedPeptideFilterableAnnotationDTO.getValueDouble() );

			unifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO_List.add( unifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO );
		}
		
		//  Best PSM Annotation Values
		BestPsmFilterableAnnotationProcessing bestPsmFilterableAnnotationProcessing = psmStatisticsAndBestValues.getBestPsmFilterableAnnotationProcessing();
		
		methodResult.unifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO_List =
				bestPsmFilterableAnnotationProcessing.getBestPsmValues( unifiedRepPep_Search_ReportedPeptide__Lookup__DTO );
		
		return methodResult;
	}
	
}
