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
package org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;
import org.yeastrc.limelight.limelight_shared.enum_classes.PsmPeptideMatchedProteinAnnotationType;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesAnnotationLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesRootLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_Filter_Per_AnnotationType;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_ProjectSearchIds;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.searchers.AnnotationTypeListForSearchIdSearcherIF;

/**
 * 
 *
 */
@Component
public class SearcherCutoffValues_Factory {

	private static final Logger log = LoggerFactory.getLogger( SearcherCutoffValues_Factory.class );

	@Autowired
	private AnnotationTypeListForSearchIdSearcherIF annotationTypeListForSearchIdSearcher;


	public SearcherCutoffValuesRootLevel createSearcherCutoffValuesRootLevel_From_WebserviceRequestCutoffs(
			Map<Integer,Integer> projectSearchIdMapToSearchId,
			SearchDataLookupParamsRoot searchDataLookupParamsRoot ) throws SQLException {

		SearchDataLookupParams_For_ProjectSearchIds paramsForProjectSearchIds = searchDataLookupParamsRoot.getParamsForProjectSearchIds();
		if ( paramsForProjectSearchIds == null ) {
			throw new IllegalArgumentException( "paramsForProjectSearchIds == null" );
		}
		List<SearchDataLookupParams_For_Single_ProjectSearchId> paramsForProjectSearchIdsList = paramsForProjectSearchIds.getParamsForProjectSearchIdsList();
		if ( paramsForProjectSearchIdsList == null || paramsForProjectSearchIdsList.isEmpty() ) {
			throw new IllegalArgumentException( "paramsForProjectSearchIdsList == null or is empty" );
		}
		
		//  outputs
		SearcherCutoffValuesRootLevel searcherCutoffValuesRootLevel = new SearcherCutoffValuesRootLevel();

		for ( SearchDataLookupParams_For_Single_ProjectSearchId paramsForProjectSearchId : paramsForProjectSearchIdsList ) {
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel =
					createSearcherCutoffValuesSearchLevel( projectSearchIdMapToSearchId, paramsForProjectSearchId );
			searcherCutoffValuesRootLevel.addPerSearchCutoffs( searcherCutoffValuesSearchLevel );
		}
		return searcherCutoffValuesRootLevel;
	}

	/**
	 * @param inputItem
	 * @return
	 * @throws SQLException 
	 * @throws Exception
	 */
	public SearcherCutoffValuesSearchLevel createSearcherCutoffValuesSearchLevel(
			Map<Integer,Integer> projectSearchIdMapToSearchId,
			SearchDataLookupParams_For_Single_ProjectSearchId inputItem ) throws SQLException {

		Integer projectSearchId = inputItem.getProjectSearchId();
		
		Integer searchId = projectSearchIdMapToSearchId.get( projectSearchId );
		if ( searchId == null ) {
			String msg = "projectSearchId in cutoff not in map of projectSearchIds: " + projectSearchId;
			log.warn( msg );
			throw new LimelightErrorDataInWebRequestException( msg );
		}

		//  Get Annotation Type records for PSM and Peptide
		//  Get  Annotation Type records for PSM

		//  All map keys are annotation type id
		Map<Integer, AnnotationTypeDTO> psmFilterableAnnotationTypeDTO = new HashMap<>();
		Map<Integer, AnnotationTypeDTO> reportedPeptideFilterableAnnotationTypeDTO = new HashMap<>();
		Map<Integer, AnnotationTypeDTO> matchedProteinFilterableAnnotationTypeDTO = new HashMap<>();

		List<AnnotationTypeDTO> allAnnotationTypeDTO_ForSearchId =
				annotationTypeListForSearchIdSearcher.getAnnotationTypeListForSearchId( searchId );

		for ( AnnotationTypeDTO annotationTypeDTO : allAnnotationTypeDTO_ForSearchId ) {
			if ( annotationTypeDTO.getFilterableDescriptiveAnnotationType() == FilterableDescriptiveAnnotationType.FILTERABLE ) {

				if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PSM ) {
					psmFilterableAnnotationTypeDTO.put( annotationTypeDTO.getId(), annotationTypeDTO );
				} else if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PEPTIDE ) {
					reportedPeptideFilterableAnnotationTypeDTO.put( annotationTypeDTO.getId(), annotationTypeDTO );
				} else if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.MATCHED_PROTEIN ) {
					matchedProteinFilterableAnnotationTypeDTO.put( annotationTypeDTO.getId(), annotationTypeDTO );
				} else {
					String msg = "Unknown value for annotationTypeDTO.getFilterableDescriptiveAnnotationType(): " + annotationTypeDTO.getFilterableDescriptiveAnnotationType();
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}

			} else if ( annotationTypeDTO.getFilterableDescriptiveAnnotationType() == FilterableDescriptiveAnnotationType.DESCRIPTIVE ) {

			} else {
				String msg = "Unknown value for annotationTypeDTO.getFilterableDescriptiveAnnotationType(): " + annotationTypeDTO.getFilterableDescriptiveAnnotationType();
				log.error( msg );
				throw new LimelightInternalErrorException(msg);

			}
		}

		return createSearcherCutoffValuesSearchLevel_Internal( 
				inputItem, 
				psmFilterableAnnotationTypeDTO, 
				reportedPeptideFilterableAnnotationTypeDTO );
	}

	/**
	 * @param inputItem
	 * @return
	 * @throws Exception 
	 */
	public SearcherCutoffValuesSearchLevel createSearcherCutoffValuesSearchLevel_Internal( 
			SearchDataLookupParams_For_Single_ProjectSearchId inputItem,
			Map<Integer, AnnotationTypeDTO> srchPgmFilterablePsmAnnotationTypeDTOMap,
			Map<Integer, AnnotationTypeDTO> srchPgmFilterableReportedPeptideAnnotationTypeDTOMap

			//  TODO  Add Matched Protein

			) {
		
		if ( inputItem.getMatchedProteinFilters() != null && ( ! inputItem.getMatchedProteinFilters().isEmpty() ) ) {
			
			String msg = "Matched Proteins Annotation Filters/Cutoffs are not supported yet.";
			log.error( msg );
			throw new IllegalArgumentException( msg );
		}
		
		
		// inputs
		int projectSearchId = inputItem.getProjectSearchId();
		List<SearchDataLookupParams_Filter_Per_AnnotationType> psmCutoffValues = inputItem.getPsmFilters();
		List<SearchDataLookupParams_Filter_Per_AnnotationType> peptideCutoffValues = inputItem.getReportedPeptideFilters();
		//  outputs
		SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel = new SearcherCutoffValuesSearchLevel();
		searcherCutoffValuesSearchLevel.setProjectSearchId( projectSearchId );
		
		//////////////////////
		//  Process Input
		if ( psmCutoffValues != null && ( ! psmCutoffValues.isEmpty() ) ) {
			for ( SearchDataLookupParams_Filter_Per_AnnotationType cutoffValuesAnnotationLevel : psmCutoffValues ) {
				Integer annotationTypeId = cutoffValuesAnnotationLevel.getAnnTypeId();
				if ( cutoffValuesAnnotationLevel.getValue() != null ) {
					//  Only add to the output data structure if the input cutoff value is not empty 
					SearcherCutoffValuesAnnotationLevel output = 
							createSearcherCutoffRequestPerAnnotationType( 
									annotationTypeId, 
									cutoffValuesAnnotationLevel, 
									srchPgmFilterablePsmAnnotationTypeDTOMap );
					searcherCutoffValuesSearchLevel.addPsmPerAnnotationCutoffs( output );
				}
			}
		}
		if ( peptideCutoffValues != null && ( ! peptideCutoffValues.isEmpty() ) ) {
			for ( SearchDataLookupParams_Filter_Per_AnnotationType cutoffValuesAnnotationLevel : peptideCutoffValues ) {
				Integer annotationTypeId = cutoffValuesAnnotationLevel.getAnnTypeId();
				if ( cutoffValuesAnnotationLevel.getValue() != null ) {
					//  Only add to the output data structure if the input cutoff value is not empty 
					SearcherCutoffValuesAnnotationLevel output = 
							createSearcherCutoffRequestPerAnnotationType( 
									annotationTypeId, 
									cutoffValuesAnnotationLevel, 
									srchPgmFilterableReportedPeptideAnnotationTypeDTOMap );
					searcherCutoffValuesSearchLevel.addPeptidePerAnnotationCutoffs( output );
				}
			}
		}
		return searcherCutoffValuesSearchLevel;
	}

	/**
	 * @param inputItem
	 * @return
	 * @throws Exception 
	 */
	private SearcherCutoffValuesAnnotationLevel createSearcherCutoffRequestPerAnnotationType( 
			Integer typeId,
			SearchDataLookupParams_Filter_Per_AnnotationType inputItem,
			Map<Integer, AnnotationTypeDTO> annotationTypeDTOMap  ) {
		AnnotationTypeDTO annotationTypeDTO = annotationTypeDTOMap.get( typeId );
		if ( annotationTypeDTO == null ) {
			String msg = "Failed to find annotationTypeDTO for type id: " + typeId;
			log.error( msg );
			throw new LimelightErrorDataInWebRequestException( msg );
		}
		SearcherCutoffValuesAnnotationLevel outputItem = new SearcherCutoffValuesAnnotationLevel();
		outputItem.setAnnotationTypeId( typeId );
		outputItem.setAnnotationCutoffValue( inputItem.getValue() );
		outputItem.setAnnotationTypeDTO( annotationTypeDTO );
		return outputItem;
	}

}
