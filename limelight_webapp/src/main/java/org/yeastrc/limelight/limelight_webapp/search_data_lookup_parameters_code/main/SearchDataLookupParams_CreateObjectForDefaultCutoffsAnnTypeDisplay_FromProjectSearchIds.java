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
package org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeFilterableDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;
import org.yeastrc.limelight.limelight_webapp.annotation_type_utils.GetAnnotationTypeDataIF;
import org.yeastrc.limelight.limelight_webapp.annotation_type_utils.GetAnnotationTypeData.GetAnnotationTypeDataResult;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.constants.SearchDataLookupParams_VersionNumber;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_Filter_Per_AnnotationType;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_ProjectSearchIds;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;

/**
 * Create SearchDataLookupParamsRoot
 * 
 * for default Annotation Type filters/cutoffs and Annotation Types to display
 *
 * Package Private
 */
@Component
class SearchDataLookupParams_CreateObjectForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds implements SearchDataLookupParams_CreateObjectForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIdsIF {

	private static final Logger log = LoggerFactory.getLogger( SearchDataLookupParams_CreateObjectForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds.class );
	
	@Autowired
	private GetAnnotationTypeDataIF getAnnotationTypeData;

	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_CreateForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIdsIF#createSearchDataLookupParamsRoot_forDefaults(java.util.List, java.util.Map)
	 */
	@Override
	public SearchDataLookupParamsRoot createSearchDataLookupParamsRoot_forDefaults( 
			List<Integer> projectSearchIds,
			Map<Integer, Integer> projectSearchIdsToSearchIds ) throws SQLException {
	
		if ( projectSearchIds == null || projectSearchIds.isEmpty() ) {
			throw new IllegalArgumentException( "projectSearchIds is null or empty" );
		}
		
		SearchDataLookupParamsRoot result = new SearchDataLookupParamsRoot();
		
		result.setVersionNumber( SearchDataLookupParams_VersionNumber.CURRENT_VERSION_NUMBER );
		
		SearchDataLookupParams_For_ProjectSearchIds paramsForProjectSearchIds = new SearchDataLookupParams_For_ProjectSearchIds();
		result.setParamsForProjectSearchIds( paramsForProjectSearchIds );
	
		List<SearchDataLookupParams_For_Single_ProjectSearchId> paramsForProjectSearchIdsList = new ArrayList<>( projectSearchIds.size() );
		paramsForProjectSearchIds.setParamsForProjectSearchIdsList( paramsForProjectSearchIdsList );
		
		for ( Integer projectSearchId : projectSearchIds ) {
			
			SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId =
					createSearchDataLookupParams_For_Single_ProjectSearchId( projectSearchId, projectSearchIdsToSearchIds );
			paramsForProjectSearchIdsList.add( searchDataLookupParams_For_Single_ProjectSearchId );
		}
		result.setParamsForProjectSearchIds( paramsForProjectSearchIds );
		return result;
	}
	
	/**
	 * @param projectSearchId
	 * @param projectSearchIdsToSearchIds
	 * @return
	 * @throws SQLException
	 */
	private SearchDataLookupParams_For_Single_ProjectSearchId createSearchDataLookupParams_For_Single_ProjectSearchId( 
			Integer projectSearchId,
			Map<Integer, Integer> projectSearchIdsToSearchIds ) throws SQLException {

		Integer searchId = null;
		
		if ( projectSearchIdsToSearchIds != null ) {

			searchId = projectSearchIdsToSearchIds.get( projectSearchId );
			if ( searchId == null ) {
				String msg = "Failed to get searchId from projectSearchIdsToSearchIds. projectSearchId: " + projectSearchId;
				log.error( msg );
				throw new LimelightInternalErrorException( msg );
			}
		} else {
			searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
			if ( searchId == null ) {
				String msg = "Failed to get searchId from searchIdForProjectSearchIdSearcher. projectSearchId: " + projectSearchId;
				log.error( msg );
				throw new LimelightInternalErrorException( msg );
			}
		}
		GetAnnotationTypeDataResult getAnnotationTypeDataResult =
				getAnnotationTypeData.getAnnotationTypeDataForSearchId( searchId );
		
		Map<Integer, AnnotationTypeDTO> psmFilterableAnnotationTypeData = getAnnotationTypeDataResult.getPsmFilterableAnnotationTypeData();
		Map<Integer, AnnotationTypeDTO> psmDescriptiveAnnotationTypeData = getAnnotationTypeDataResult.getPsmDescriptiveAnnotationTypeData();
		Map<Integer, AnnotationTypeDTO> reportedPeptideFilterableAnnotationTypeData = getAnnotationTypeDataResult.getReportedPeptideFilterableAnnotationTypeData();
		Map<Integer, AnnotationTypeDTO> reportedPeptideDescriptiveAnnotationTypeData = getAnnotationTypeDataResult.getReportedPeptideDescriptiveAnnotationTypeData();
		Map<Integer, AnnotationTypeDTO> matchedProteinFilterableAnnotationTypeData = getAnnotationTypeDataResult.getMatchedProteinFilterableAnnotationTypeData();
		Map<Integer, AnnotationTypeDTO> matchedProteinDescriptiveAnnotationTypeData = getAnnotationTypeDataResult.getMatchedProteinDescriptiveAnnotationTypeData();

		
		
		SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId = new SearchDataLookupParams_For_Single_ProjectSearchId();
		
		searchDataLookupParams_For_Single_ProjectSearchId.setProjectSearchId( projectSearchId );

		//  Filter values (cutoffs per annotation type)
		List<SearchDataLookupParams_Filter_Per_AnnotationType> psmFilters_Default = createDefaultFilters( psmFilterableAnnotationTypeData );
		List<SearchDataLookupParams_Filter_Per_AnnotationType> reportedPeptideFilters_Default = createDefaultFilters( reportedPeptideFilterableAnnotationTypeData );
		List<SearchDataLookupParams_Filter_Per_AnnotationType> matchedProteinFilters_Default = createDefaultFilters( matchedProteinFilterableAnnotationTypeData );

		//  Annotation Type Ids to Display
		List<Integer> psmAnnTypeDisplay_Default = createDefaultAnnTypesDisplay( psmFilterableAnnotationTypeData, psmDescriptiveAnnotationTypeData );
		List<Integer> reportedPeptideAnnTypeDisplay_Default = createDefaultAnnTypesDisplay( reportedPeptideFilterableAnnotationTypeData, reportedPeptideDescriptiveAnnotationTypeData );
		List<Integer> matchedProteinAnnTypeDisplay_Default = createDefaultAnnTypesDisplay( matchedProteinFilterableAnnotationTypeData, matchedProteinDescriptiveAnnotationTypeData );
		
		searchDataLookupParams_For_Single_ProjectSearchId.setPsmFilters( psmFilters_Default );
		searchDataLookupParams_For_Single_ProjectSearchId.setPsmAnnTypeDisplay( psmAnnTypeDisplay_Default );
		searchDataLookupParams_For_Single_ProjectSearchId.setReportedPeptideFilters( reportedPeptideFilters_Default );
		searchDataLookupParams_For_Single_ProjectSearchId.setReportedPeptideAnnTypeDisplay( reportedPeptideAnnTypeDisplay_Default );
		searchDataLookupParams_For_Single_ProjectSearchId.setMatchedProteinFilters( matchedProteinFilters_Default );
		searchDataLookupParams_For_Single_ProjectSearchId.setMatchedProteinAnnTypeDisplay( matchedProteinAnnTypeDisplay_Default );
		
		return searchDataLookupParams_For_Single_ProjectSearchId;
	}
	
	/**
	 * @param filterableAnnTypes
	 * @param descriptiveAnnTypes
	 * @return
	 */
	private List<Integer> createDefaultAnnTypesDisplay( 
			Map<Integer, AnnotationTypeDTO> filterableAnnTypes,
			Map<Integer, AnnotationTypeDTO> descriptiveAnnTypes ) {
		
		if ( filterableAnnTypes == null && descriptiveAnnTypes == null ) {
			return new ArrayList<>();
		}
		
		int outputSize = 0;
		if ( filterableAnnTypes != null ) {
			outputSize += filterableAnnTypes.size();
		}
		if ( descriptiveAnnTypes != null ) {
			outputSize += descriptiveAnnTypes.size();
		}
		
		List<AnnotationTypeDTO> defaultDisplay_AnnotationTypeDTOList = new ArrayList<>( outputSize );
		
		//  Process Filterable Ann Types		
		for ( Map.Entry<Integer, AnnotationTypeDTO> annTypeEntry : filterableAnnTypes.entrySet() ) {
			AnnotationTypeDTO annotationTypeDTO = annTypeEntry.getValue();
			if ( annotationTypeDTO.getDisplayOrder() != null ) {
				//  Part of default display
				defaultDisplay_AnnotationTypeDTOList.add( annotationTypeDTO );
			}
		}
		
		//  Process Descriptive Ann Types
		for ( Map.Entry<Integer, AnnotationTypeDTO> annTypeEntry : descriptiveAnnTypes.entrySet() ) {
			AnnotationTypeDTO annotationTypeDTO = annTypeEntry.getValue();
			if ( annotationTypeDTO.getDisplayOrder() != null ) {
				//  Part of default display
				defaultDisplay_AnnotationTypeDTOList.add( annotationTypeDTO );
			}
		}
		
		//  Sort on display order
		Collections.sort( defaultDisplay_AnnotationTypeDTOList, new Comparator<AnnotationTypeDTO>() {
			@Override
			public int compare(AnnotationTypeDTO o1, AnnotationTypeDTO o2) {
				if ( o1.getDisplayOrder() < o2.getDisplayOrder() ) {
					return -1;
				}
				if ( o1.getDisplayOrder() > o2.getDisplayOrder() ) {
					return 1;
				}
				return 0;
			}
		});
		
		// Create final result list of annotation type ids in display order
		
		List<Integer> annTypeIdsDisplayOrder = new ArrayList<>( defaultDisplay_AnnotationTypeDTOList.size() );
		for ( AnnotationTypeDTO annotationTypeDTO : defaultDisplay_AnnotationTypeDTOList ) {
			annTypeIdsDisplayOrder.add( annotationTypeDTO.getId() );
		}
		
		return annTypeIdsDisplayOrder;
	}
	
	/**
	 * @param filterableAnnTypes
	 * @return
	 */
	private List<SearchDataLookupParams_Filter_Per_AnnotationType> createDefaultFilters( Map<Integer, AnnotationTypeDTO> filterableAnnTypes ) {
		
		if ( filterableAnnTypes == null ) {
			return new ArrayList<>();
		}
		
		List<SearchDataLookupParams_Filter_Per_AnnotationType> resultList = new ArrayList<>( filterableAnnTypes.size() );
		
		for ( Map.Entry<Integer, AnnotationTypeDTO> filterableAnnTypeEntry : filterableAnnTypes.entrySet() ) {
		
			AnnotationTypeDTO annotationTypeDTO = filterableAnnTypeEntry.getValue();
			if ( annotationTypeDTO.getFilterableDescriptiveAnnotationType() == FilterableDescriptiveAnnotationType.FILTERABLE ) {
				AnnotationTypeFilterableDTO annotationTypeFilterableDTO = annotationTypeDTO.getAnnotationTypeFilterableDTO();;
				if ( annotationTypeFilterableDTO == null ) {
					String msg = "annotationTypeFilterableDTO null for ann type id: " + annotationTypeDTO.getId();
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
				if ( annotationTypeFilterableDTO.getDefaultFilterValue() != null ) {
					SearchDataLookupParams_Filter_Per_AnnotationType searchDataLookupParams_Filter_Per_AnnotationType = new SearchDataLookupParams_Filter_Per_AnnotationType();
					searchDataLookupParams_Filter_Per_AnnotationType.setAnnTypeId( annotationTypeDTO.getId() );
					searchDataLookupParams_Filter_Per_AnnotationType.setValue( annotationTypeFilterableDTO.getDefaultFilterValue() );
					resultList.add( searchDataLookupParams_Filter_Per_AnnotationType );
				}
			}
		}
		Collections.sort( resultList );
		return resultList;
	}
}
