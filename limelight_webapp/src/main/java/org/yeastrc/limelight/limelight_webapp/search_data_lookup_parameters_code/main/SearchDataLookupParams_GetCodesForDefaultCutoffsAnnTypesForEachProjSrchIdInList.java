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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchDataLookupParametersLookupRootIdTypes;
import org.yeastrc.limelight.limelight_webapp.dao.SearchDataLookupParametersLookupDAO_IF;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.params.SearchDataLookupParams_CreatedByInfo;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.SearchDataLookupParams_GetDefaultPerProjSrchId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.SearchDataLookupParams_GetDefaultPerProjSrchId_Searcher.SearchDataLookupParams_GetDefaultPerProjSrchId_Searcher_ResultItem;

/**
 * For each Project Search Id in List,
 * Get Search Data Lookup Params Code for Default Cutoffs/Filters and Default Ann Type Display 
 *
 * IMPORTANT:  This makes an assumption that the default cutoffs and default Ann Type Display do NOT change.
 *    If the default cutoffs are changed, then the field 
 *       search_data_lookup_parameters.single_project_search_id__default_values
 *       needs to be set to null for the affected searches.
 *    Otherwise, it is safe to set all the values in that field to null 
 *       and they will be re-populated as those records are retrieved.
 */
@Component
public class SearchDataLookupParams_GetCodesForDefaultCutoffsAnnTypesForEachProjSrchIdInList implements SearchDataLookupParams_GetCodesForDefaultCutoffsAnnTypesForEachProjSrchIdInListIF {

	private static final Logger log = LoggerFactory.getLogger( SearchDataLookupParams_GetCodesForDefaultCutoffsAnnTypesForEachProjSrchIdInList.class );
	
	@Autowired
	private SearchDataLookupParams_GetDefaultPerProjSrchId_SearcherIF searchDataLookupParams_GetDefaultPerProjSrchId_Searcher;

	@Autowired
	private SearchDataLookupParams_CreateObjectForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIdsIF searchDataLookupParams_CreateForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds;
	
	@Autowired
	private SearchDataLookupParams_MainProcessingIF searchDataLookupParams_MainProcessing;
	
	@Autowired
	private SearchDataLookupParametersLookupDAO_IF searchDataLookupParametersLookupDAO;
	
	@Autowired
	private SearchDataLookupParams_FormatParseCodeString searchDataLookupParams_FormatCodeString;
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_GetCodesForDefaultCutoffsAnnTypesForEachProjSrchIdInListIF#getSearchDataLookupParamsCodesForDefaultCutoffsAnnTypesForEachProjSrchIdInList(java.util.List, org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.params.SearchDataLookupParams_CreatedByInfo)
	 */
	@Override
	public Map<Integer, String> getSearchDataLookupParamsCodesForDefaultCutoffsAnnTypesForEachProjSrchIdInList(
			List<Integer> projectSearchIds,
			SearchDataLookupParams_CreatedByInfo searchDataLookupParams_CreatedByInfo ) throws SQLException {
		
		if ( projectSearchIds == null || projectSearchIds.isEmpty() ) {
			throw new IllegalArgumentException( "projectSearchIds cannot be null or empty" );
		}
		if ( searchDataLookupParams_CreatedByInfo == null ) {
			throw new IllegalArgumentException( "searchDataLookupParams_CreatedByInfo cannot be null " );
		}
		
		//  Return Map<[Project Search Id], [SearchDataLookupParamsCode]>
		
		Map<Integer, String> result = new HashMap<>();
		
		//  Get codes for projectSearchIds already in DB
		
		List<SearchDataLookupParams_GetDefaultPerProjSrchId_Searcher_ResultItem> existingDBEntriesList = 
				searchDataLookupParams_GetDefaultPerProjSrchId_Searcher.getDefaultPerProjSrchId( projectSearchIds );
		
		for ( SearchDataLookupParams_GetDefaultPerProjSrchId_Searcher_ResultItem dbItem : existingDBEntriesList ) {
			
			String code =
					searchDataLookupParams_FormatCodeString.formatCodeString( dbItem.getHashOfMainParams(), dbItem.getHashCollisionIndex() );
			result.put( dbItem.getSingleProjectSearchIdDefaultValues(), code );

			searchDataLookupParametersLookupDAO.updateLastAccessed( dbItem.getId() );
		}
		
		//  To Hold Single Project Search Id creating default data for
		List<Integer> projectSearchIds_SingleProjectSearchId = new ArrayList<>( 1 );
		
		for ( Integer projectSearchId : projectSearchIds ) {
			
			if ( ! result.containsKey( projectSearchId ) ) {
				// projectSearchId not in db so create default and insert it and save resulting code
				
				projectSearchIds_SingleProjectSearchId.clear();
				projectSearchIds_SingleProjectSearchId.add( projectSearchId );
				Integer singleProjectSearchIdCreatedDefaultsFor = projectSearchId;

				//  Create default for project search ids
				SearchDataLookupParamsRoot searchDataLookupParamsRootDefaults = 
						searchDataLookupParams_CreateForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds
						.createSearchDataLookupParamsRoot_forDefaults( 
								projectSearchIds_SingleProjectSearchId, 
								null /* projectSearchIdsToSearchIds */, 
								null /* existingSearchDataLookupParamsRoot */  );

				String searchDataLookupParamsCode = 
						searchDataLookupParams_MainProcessing
						.searchDataLookupParams_Save_Create_Code( 
								searchDataLookupParamsRootDefaults, 
								SearchDataLookupParametersLookupRootIdTypes.PROJECT_SEARCH_IDS, 
								singleProjectSearchIdCreatedDefaultsFor, 
								searchDataLookupParams_CreatedByInfo );
				
				result.put( projectSearchId, searchDataLookupParamsCode );
			}
			
		}
		
		return result;
	}
}
