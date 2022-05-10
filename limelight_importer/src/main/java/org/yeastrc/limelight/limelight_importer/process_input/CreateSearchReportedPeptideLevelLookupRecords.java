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

import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.PsmStatisticsAndBestValues;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeFilterableDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.Search_ReportedPeptide_BestPsmValue_Lookup__DTO;
import org.yeastrc.limelight.limelight_shared.dto.Search_ReportedPeptide__Lookup__DTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_shared.enum_classes.Yes_No__NOT_APPLICABLE_Enum;

/**
 * Create records to insert in:
 * 
 *    search__rep_pept__lookup_tbl
 *        * Search/Reported Peptide level roll up info
 *        
 *    search__rep_pept__best_psm_value_lookup_tbl
 *        * Search/Reported Peptide Best PSM Filterable Annotation level Value roll up info    
 *
 */
public class CreateSearchReportedPeptideLevelLookupRecords {

	private static final Logger log = LoggerFactory.getLogger( CreateSearchReportedPeptideLevelLookupRecords.class );
	
	private CreateSearchReportedPeptideLevelLookupRecords() { }
	public static CreateSearchReportedPeptideLevelLookupRecords getInstance() { return new CreateSearchReportedPeptideLevelLookupRecords(); }

	/**
	 * Result from createSearchReportedPeptideLevelLookupRecords
	 *
	 */
	public static class CreateSearchReportedPeptideLevelLookupRecords_Result {
		
		private Search_ReportedPeptide__Lookup__DTO search_ReportedPeptide__Lookup__DTO;
		
		private List<Search_ReportedPeptide_BestPsmValue_Lookup__DTO> search_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets;
		private List<Search_ReportedPeptide_BestPsmValue_Lookup__DTO> search_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys;
		private List<Search_ReportedPeptide_BestPsmValue_Lookup__DTO> search_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys_Decoys;

		public Search_ReportedPeptide__Lookup__DTO getSearch_ReportedPeptide__Lookup__DTO() {
			return search_ReportedPeptide__Lookup__DTO;
		}
		public List<Search_ReportedPeptide_BestPsmValue_Lookup__DTO> getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets() {
			return search_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets;
		}
		public List<Search_ReportedPeptide_BestPsmValue_Lookup__DTO> getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys() {
			return search_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys;
		}
		public List<Search_ReportedPeptide_BestPsmValue_Lookup__DTO> getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys_Decoys() {
			return search_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys_Decoys;
		}
	}

	/**
	 * @param reportedPeptide
	 * @param searchId
	 * @param savedReportedPeptideDTO
	 * @param savedSearchReportedPeptideDTO
	 * @param searchReportedPeptideFilterableAnnotationDTOList
	 * @param psmStatisticsAndBestValues
	 * @param filterableReportedPeptideAnnotationTypesOnId
	 * @param proteinVersionIdsForReportedPeptideCount
	 * @return
	 * @throws Exception
	 */
	public CreateSearchReportedPeptideLevelLookupRecords_Result createSearchReportedPeptideLevelLookupRecords( 
			ReportedPeptide reportedPeptide,
			int searchId,
			ReportedPeptideDTO savedReportedPeptideDTO,
			SearchReportedPeptideDTO savedSearchReportedPeptideDTO,
			List<SearchReportedPeptideFilterableAnnotationDTO> searchReportedPeptideFilterableAnnotationDTOList,
			PsmStatisticsAndBestValues psmStatisticsAndBestValues,
			Map<Integer, AnnotationTypeDTO> filterableReportedPeptideAnnotationTypesOnId,
			int proteinVersionIdsForReportedPeptideCount
			) throws Exception {
		
		int reportedPeptide_Id = savedReportedPeptideDTO.getId();
		
		CreateSearchReportedPeptideLevelLookupRecords_Result methodResult =
				new CreateSearchReportedPeptideLevelLookupRecords_Result();
		
		boolean relatedPeptideUniqueForSearch = true;
		boolean hasDynamicModifications = false;
		boolean hasIsotopeLabels = false;
		boolean anyPsmHasDynamicModifications = false;
		boolean anyPsmHasOpenModifications = false;
		boolean anyPsmHasReporterIons = false;
		
		if ( reportedPeptide.getPeptideModifications() != null 
				&& reportedPeptide.getPeptideModifications().getPeptideModification() != null 
				&& ( ! reportedPeptide.getPeptideModifications().getPeptideModification().isEmpty() ) ) {
			hasDynamicModifications = true;
		}
		{

			if ( reportedPeptide.getPsms() != null && ( ! ( reportedPeptide.getPsms().getPsm().isEmpty() ) ) ) {
				
				for ( Psm psm : reportedPeptide.getPsms().getPsm() ) {
					
					if ( psm.getPsmOpenModification() != null && psm.getPsmOpenModification().getMass() != null ) {
						//  This PSM contains "psm_open_modification"
						anyPsmHasOpenModifications = true; //  May also be PSMs that do NOT have Open Modifications
						break;
					}
				}
			}
		}
		
		if ( reportedPeptide.getPeptideIsotopeLabels() != null 
				&& reportedPeptide.getPeptideIsotopeLabels().getPeptideIsotopeLabel() != null  ) {
			hasIsotopeLabels = true;
		}
		
		if ( savedSearchReportedPeptideDTO.isAnyPsmHasDynamicModifications() ) {
			anyPsmHasDynamicModifications = true;
		}
		if ( savedSearchReportedPeptideDTO.isAnyPsmHasReporterIons() ) {
			anyPsmHasReporterIons = true;
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
		Search_ReportedPeptide__Lookup__DTO search_ReportedPeptide__Lookup__DTO =
				new Search_ReportedPeptide__Lookup__DTO();
		search_ReportedPeptide__Lookup__DTO.setSearchId( searchId );
		search_ReportedPeptide__Lookup__DTO.setReportedPeptideId( reportedPeptide_Id );
		search_ReportedPeptide__Lookup__DTO.setRelatedPeptideUniqueForSearch( relatedPeptideUniqueForSearch );
		search_ReportedPeptide__Lookup__DTO.setHasDynamicModifications( hasDynamicModifications );
		search_ReportedPeptide__Lookup__DTO.setHasIsotopeLabels( hasIsotopeLabels );
		search_ReportedPeptide__Lookup__DTO.setAnyPsmHasDynamicModifications( anyPsmHasDynamicModifications );
		search_ReportedPeptide__Lookup__DTO.setAnyPsmHasOpenModifications( anyPsmHasOpenModifications );
		search_ReportedPeptide__Lookup__DTO.setAnyPsmHasReporterIons( anyPsmHasReporterIons );
		search_ReportedPeptide__Lookup__DTO.setPsmNum_Targets_Only_AtDefaultCutoff( psmStatisticsAndBestValues.getPsmNum_Targets_Only_AtDefaultCutoff() );
		search_ReportedPeptide__Lookup__DTO.setPsmNum_IndependentDecoys_Only_AtDefaultCutoff( psmStatisticsAndBestValues.getPsmNum_IndependentDecoys_Only_AtDefaultCutoff() );
		search_ReportedPeptide__Lookup__DTO.setPsmNum_Decoys_Only_AtDefaultCutoff( psmStatisticsAndBestValues.getPsmNum_Decoys_Only_AtDefaultCutoff() );
		search_ReportedPeptide__Lookup__DTO.setPeptideMeetsDefaultCutoffs( peptideMeetsDefaultCutoffs );
		search_ReportedPeptide__Lookup__DTO.setPsmIdSequentialStart__StartOf_Target_Psms( psmStatisticsAndBestValues.getFirstSavedPsmId_Is_Target() );
		search_ReportedPeptide__Lookup__DTO.setPsmIdSequentialStart__StartOf_IndependentDecoy_Psms( psmStatisticsAndBestValues.getFirstSavedPsmId_Is_IndependentDecoy() );
		search_ReportedPeptide__Lookup__DTO.setPsmIdSequentialStart__StartOf_Decoy_Psms( psmStatisticsAndBestValues.getFirstSavedPsmId_Is_Decoy() );
		search_ReportedPeptide__Lookup__DTO.setPsmIdSequentialEnd( psmStatisticsAndBestValues.getLastSavedPsmId());
		
		methodResult.search_ReportedPeptide__Lookup__DTO = search_ReportedPeptide__Lookup__DTO;
		
		//  Best PSM Annotation Values
		
		methodResult.search_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets =
				psmStatisticsAndBestValues.getBestPsmFilterableAnnotationProcessing_PSM_Targets().getBestPsmValues( search_ReportedPeptide__Lookup__DTO );

		methodResult.search_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys =
				psmStatisticsAndBestValues.getBestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys().getBestPsmValues( search_ReportedPeptide__Lookup__DTO );

		methodResult.search_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys_Decoys =
				psmStatisticsAndBestValues.getBestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys_Decoys().getBestPsmValues( search_ReportedPeptide__Lookup__DTO );

		return methodResult;
	}
	
}
