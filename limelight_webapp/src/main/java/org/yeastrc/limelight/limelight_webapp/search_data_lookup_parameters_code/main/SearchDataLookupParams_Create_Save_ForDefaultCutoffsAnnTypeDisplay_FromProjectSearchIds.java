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
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchDataLookupParametersLookupRootIdTypes;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.params.SearchDataLookupParams_CreatedByInfo;

/**
 * Create and Save for Project Search Ids and Default Cutoffs and Ann Type Display
 *
 */
@Component
public class SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds implements SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIdsIF {

	private static final Logger log = LoggerFactory.getLogger( SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds.class );

	@Autowired
	private SearchDataLookupParams_CreateObjectForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIdsIF searchDataLookupParams_CreateForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds;
	
	@Autowired
	private SearchDataLookupParams_MainProcessingIF searchDataLookupParams_MainProcessing;
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIdsIF#Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds(java.util.List, org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.params.SearchDataLookupParams_CreatedByInfo, java.util.Map)
	 */
	@Override
	public String create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds( 
			List<Integer> projectSearchIds,
			SearchDataLookupParams_CreatedByInfo searchDataLookupParams_CreatedByInfo,
			Map<Integer, Integer> projectSearchIdsToSearchIds ) throws SQLException {

		Integer singleProjectSearchIdCreatedDefaultsFor = null;
		if ( projectSearchIds.size() == 1 ) {
			singleProjectSearchIdCreatedDefaultsFor = projectSearchIds.get( 0 );
		}

		//  Create default for project search ids
		SearchDataLookupParamsRoot searchDataLookupParamsRootDefaults = 
				searchDataLookupParams_CreateForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds
				.createSearchDataLookupParamsRoot_forDefaults( 
						projectSearchIds, 
						projectSearchIdsToSearchIds );

		String searchDataLookupParamsCode = 
				searchDataLookupParams_MainProcessing
				.searchDataLookupParams_Save_Create_Code( 
						searchDataLookupParamsRootDefaults, 
						SearchDataLookupParametersLookupRootIdTypes.PROJECT_SEARCH_IDS, 
						singleProjectSearchIdCreatedDefaultsFor, 
						searchDataLookupParams_CreatedByInfo );
		
		return searchDataLookupParamsCode;
	}
}