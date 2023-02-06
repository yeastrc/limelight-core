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

import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds.SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds_Result;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.params.SearchDataLookupParams_CreatedByInfo;

/**
 * @author danj
 *
 */
public interface SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIdsIF {

	/**
	 * @param projectId 
	 * @param projectSearchIds - In the order the projectSearchIds are ADDED to SearchDataLookupParamsRoot
	 * 
	 * @param searchDataLookupParams_CreatedByInfo
	 * @param projectSearchIdsToSearchIds
	 * 
	 * @param existingSearchDataLookupParamsRoot 
	 * 				- null if no existing data.  
	 * 					Returned after updating if not null.  
	 * 					existingSearchDataLookupParamsRoot already has entries removed for projectSearchIds NOT wanted in result
	 * @return
	 * @throws SQLException
	 */
	SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds_Result create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds(int projectId,
			List<Integer> projectSearchIds,
			SearchDataLookupParams_CreatedByInfo searchDataLookupParams_CreatedByInfo, Map<Integer, Integer> projectSearchIdsToSearchIds, SearchDataLookupParamsRoot existingSearchDataLookupParamsRoot) throws SQLException;

}