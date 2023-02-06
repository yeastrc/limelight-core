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
import org.yeastrc.limelight.limelight_shared.dto.SearchProgramsPerSearchDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;
import org.yeastrc.limelight.limelight_shared.enum_classes.PsmPeptideMatchedProteinAnnotationType;
import org.yeastrc.limelight.limelight_webapp.annotation_type_utils.GetAnnotationTypeDataIF;
import org.yeastrc.limelight.limelight_webapp.annotation_type_utils.GetAnnotationTypeData.GetAnnotationTypeDataResult;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.constants.SearchDataLookupParams_VersionNumber;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_Filter_Per_AnnotationType;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_ProjectSearchIds;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchProgramsPerSearchListForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher.ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem;

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

	@Autowired
	private ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher_IF projectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher;

	@Autowired
	private SearchProgramsPerSearchListForSearchIdSearcherIF searchProgramsPerSearchListForSearchIdSearcher;
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_CreateForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIdsIF#createSearchDataLookupParamsRoot_forDefaults(java.util.List, java.util.Map)
	 */
	@Override
	public SearchDataLookupParamsRoot createSearchDataLookupParamsRoot_forDefaults( 
			int projectId,
			List<Integer> projectSearchIds, //  In the order the projectSearchIds are ADDED to SearchDataLookupParamsRoot
			Map<Integer, Integer> projectSearchIdsToSearchIds, 
			
			// null if no existing data.  Returned after updating if not null.  existingSearchDataLookupParamsRoot already has entries removed for projectSearchIds NOT wanted in result
			SearchDataLookupParamsRoot existingSearchDataLookupParamsRoot
			
			) throws SQLException {
	
		if ( projectSearchIds == null || projectSearchIds.isEmpty() ) {
			throw new IllegalArgumentException( "projectSearchIds is null or empty" );
		}
		
		SearchDataLookupParamsRoot result = null;
		SearchDataLookupParams_For_ProjectSearchIds paramsForProjectSearchIds = null;
		List<SearchDataLookupParams_For_Single_ProjectSearchId> paramsForProjectSearchIdsList = null;

		if ( existingSearchDataLookupParamsRoot != null ) {
			
			result = existingSearchDataLookupParamsRoot;
			if ( result.getVersionNumber() == null ) {
				throw new LimelightInternalErrorException( "result.getVersionNumber() == null" );
			}
			if ( result.getVersionNumber() != SearchDataLookupParams_VersionNumber.CURRENT_VERSION_NUMBER ) {
				throw new LimelightInternalErrorException( "result.getVersionNumber() != SearchDataLookupParams_VersionNumber.CURRENT_VERSION_NUMBER. result.getVersionNumber(): " 
						+ result.getVersionNumber() 
						+ ", SearchDataLookupParams_VersionNumber.CURRENT_VERSION_NUMBER: "
						+ SearchDataLookupParams_VersionNumber.CURRENT_VERSION_NUMBER );
			}
			paramsForProjectSearchIds = result.getParamsForProjectSearchIds();
			paramsForProjectSearchIdsList = paramsForProjectSearchIds.getParamsForProjectSearchIdsList();
			
		} else {
			
			result = new SearchDataLookupParamsRoot();
			result.setVersionNumber( SearchDataLookupParams_VersionNumber.CURRENT_VERSION_NUMBER );
			paramsForProjectSearchIds = new SearchDataLookupParams_For_ProjectSearchIds();
			result.setParamsForProjectSearchIds( paramsForProjectSearchIds );
			paramsForProjectSearchIdsList = new ArrayList<>( projectSearchIds.size() );
			paramsForProjectSearchIds.setParamsForProjectSearchIdsList( paramsForProjectSearchIdsList );
		}
		

		List<ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem> projectLevelDefaultFltrAnnCutoffs_List =
				projectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher.getAllForProjectId( projectId );
		
		List<ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem> projectLevelDefaultFltrAnnCutoffs_List__PSM = new ArrayList<>( projectLevelDefaultFltrAnnCutoffs_List.size() );
		List<ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem> projectLevelDefaultFltrAnnCutoffs_List__Peptide = new ArrayList<>( projectLevelDefaultFltrAnnCutoffs_List.size() );
		List<ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem> projectLevelDefaultFltrAnnCutoffs_List__Protein = new ArrayList<>( projectLevelDefaultFltrAnnCutoffs_List.size() );
		
		for ( ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem item : projectLevelDefaultFltrAnnCutoffs_List ) {
			if ( item.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PSM ) {
				projectLevelDefaultFltrAnnCutoffs_List__PSM.add(item);
			} else if ( item.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PEPTIDE ) {
				projectLevelDefaultFltrAnnCutoffs_List__Peptide.add(item);
			} else if ( item.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.MATCHED_PROTEIN ) {
				projectLevelDefaultFltrAnnCutoffs_List__Protein.add(item);
			} else {
				String msg = "item.getPsmPeptideMatchedProteinAnnotationType() is unknown value.  item.getPsmPeptideMatchedProteinAnnotationType(): " + item.getPsmPeptideMatchedProteinAnnotationType();
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
		}
		
		for ( Integer projectSearchId : projectSearchIds ) {
			
			SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId =
					createSearchDataLookupParams_For_Single_ProjectSearchId( 
							projectSearchId, 
							projectSearchIdsToSearchIds, 
							projectLevelDefaultFltrAnnCutoffs_List__PSM,
							projectLevelDefaultFltrAnnCutoffs_List__Peptide,
							projectLevelDefaultFltrAnnCutoffs_List__Protein );
			
			paramsForProjectSearchIdsList.add( searchDataLookupParams_For_Single_ProjectSearchId );
		}
		
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
			Map<Integer, Integer> projectSearchIdsToSearchIds,
			List<ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem> projectLevelDefaultFltrAnnCutoffs_List__PSM,
			List<ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem> projectLevelDefaultFltrAnnCutoffs_List__Peptide,
			List<ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem> projectLevelDefaultFltrAnnCutoffs_List__Protein ) throws SQLException {

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
		
		List<SearchProgramsPerSearchDTO> searchProgramsPerSearchDTOList =
				searchProgramsPerSearchListForSearchIdSearcher.getSearchProgramsPerSearchForSearchId( searchId );

		
		GetAnnotationTypeDataResult getAnnotationTypeDataResult = getAnnotationTypeData.getAnnotationTypeDataForSearchId( searchId );
		
		Map<Integer, AnnotationTypeDTO> psmFilterableAnnotationTypeData = getAnnotationTypeDataResult.getPsmFilterableAnnotationTypeData();
		Map<Integer, AnnotationTypeDTO> psmDescriptiveAnnotationTypeData = getAnnotationTypeDataResult.getPsmDescriptiveAnnotationTypeData();
		Map<Integer, AnnotationTypeDTO> reportedPeptideFilterableAnnotationTypeData = getAnnotationTypeDataResult.getReportedPeptideFilterableAnnotationTypeData();
		Map<Integer, AnnotationTypeDTO> reportedPeptideDescriptiveAnnotationTypeData = getAnnotationTypeDataResult.getReportedPeptideDescriptiveAnnotationTypeData();
		Map<Integer, AnnotationTypeDTO> matchedProteinFilterableAnnotationTypeData = getAnnotationTypeDataResult.getMatchedProteinFilterableAnnotationTypeData();
		Map<Integer, AnnotationTypeDTO> matchedProteinDescriptiveAnnotationTypeData = getAnnotationTypeDataResult.getMatchedProteinDescriptiveAnnotationTypeData();

		
		
		SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId = new SearchDataLookupParams_For_Single_ProjectSearchId();
		
		searchDataLookupParams_For_Single_ProjectSearchId.setProjectSearchId( projectSearchId );

		//  Filter values (cutoffs per annotation type)
		List<SearchDataLookupParams_Filter_Per_AnnotationType> psmFilters_Default = 
				createDefaultFilters( psmFilterableAnnotationTypeData, projectLevelDefaultFltrAnnCutoffs_List__PSM, searchProgramsPerSearchDTOList );
		List<SearchDataLookupParams_Filter_Per_AnnotationType> reportedPeptideFilters_Default = 
				createDefaultFilters( reportedPeptideFilterableAnnotationTypeData, projectLevelDefaultFltrAnnCutoffs_List__Peptide, searchProgramsPerSearchDTOList );
		List<SearchDataLookupParams_Filter_Per_AnnotationType> matchedProteinFilters_Default = 
				createDefaultFilters( matchedProteinFilterableAnnotationTypeData, projectLevelDefaultFltrAnnCutoffs_List__Protein, searchProgramsPerSearchDTOList );

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
	private List<SearchDataLookupParams_Filter_Per_AnnotationType> createDefaultFilters( 
			
			Map<Integer, AnnotationTypeDTO> filterableAnnTypes,
			List<ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem> projectLevelDefaultFltrAnnCutoffs_List,
			List<SearchProgramsPerSearchDTO> searchProgramsPerSearchDTOList
			) {
		
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
				
				//  Default Filter Value 
				
				Double defaultFilterValue = null;
				
				//  First  Get from Annotation Type, if set

				if ( annotationTypeFilterableDTO.getDefaultFilterValue() != null ) {

					//  Have Default value on Annotation Type record so apply that
					
					defaultFilterValue = annotationTypeFilterableDTO.getDefaultFilterValue();
				}

				//  Second  Get from Project Wide override value, if set.  Override value from Annotation Type if also set there.
				
				for ( ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem item : projectLevelDefaultFltrAnnCutoffs_List ) {
					
					if ( annotationTypeDTO.getName().equals( item.getAnnotationTypeName() ) ) {

						//  Annotation type name matches
						
						//  Get Search Program
						
						for ( SearchProgramsPerSearchDTO searchProgramsPerSearchDTO : searchProgramsPerSearchDTOList ) {
							
							if ( annotationTypeDTO.getSearchProgramsPerSearchId() == searchProgramsPerSearchDTO.getId() ) {

								if ( searchProgramsPerSearchDTO.getName().equals( item.getSearchProgramName() ) ) {
								
									//  Everything matches so apply Project Wide default filter value override
									
									defaultFilterValue = item.getAnnotationCutoffValue();
									
									break;
								}
							}
						}
					}
				}
				
				
				if ( defaultFilterValue != null ) {
					
					//  Have Default Filter Value 
					
					SearchDataLookupParams_Filter_Per_AnnotationType searchDataLookupParams_Filter_Per_AnnotationType = new SearchDataLookupParams_Filter_Per_AnnotationType();
					searchDataLookupParams_Filter_Per_AnnotationType.setAnnTypeId( annotationTypeDTO.getId() );
					searchDataLookupParams_Filter_Per_AnnotationType.setValue( defaultFilterValue );
					
					resultList.add( searchDataLookupParams_Filter_Per_AnnotationType );
				}
			}
		}
		Collections.sort( resultList );
		return resultList;
	}
}
