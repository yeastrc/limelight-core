/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_webapp.services;

import java.util.List;

import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.params.SearchDataLookupParams_CreatedByInfo;
import org.yeastrc.limelight.limelight_webapp.services.SearchDataLookupParametersLookupCode__Create_InsertToDB__Service.SearchDataLookupParametersLookupCode__Create_InsertToDB__Service__Result;

/**
 * @author danj
 *
 */
public interface SearchDataLookupParametersLookupCode__Create_InsertToDB__Service_IF {

	SearchDataLookupParametersLookupCode__Create_InsertToDB__Service__Result searchDataLookupParametersLookupCode__Create_InsertToDB__Service(

			Integer projectId, SearchDataLookupParamsRoot searchDataLookupParamsRoot_FromRequest,
			List<Integer> projectSearchIds_CreateDefault,
			SearchDataLookupParams_CreatedByInfo searchDataLookupParams_CreatedByInfo) throws Exception;

}