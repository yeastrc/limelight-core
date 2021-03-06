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

import org.yeastrc.limelight.limelight_shared.enum_classes.SearchDataLookupParametersLookupRootIdTypes;
import org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupDTO;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_MainProcessing.SearchDataLookupParams_MainProcessing_Result;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.params.SearchDataLookupParams_CreatedByInfo;

/**
 * @author danj
 *
 */
public interface SearchDataLookupParams_MainProcessingIF {


	SearchDataLookupParams_MainProcessing_Result searchDataLookupParams_Save_Create_Code(
			SearchDataLookupParamsRoot searchDataLookupParamsRoot,
			SearchDataLookupParametersLookupRootIdTypes searchDataLookupParametersLookupType,
			Integer singleProjectSearchIdCreatedDefaultsFor,
			SearchDataLookupParams_CreatedByInfo searchDataLookupParams_CreatedByInfo) throws SQLException;

	
	SearchDataLookupParametersLookupDTO searchDataLookupParams_Save_ReturnObject(
			SearchDataLookupParamsRoot searchDataLookupParamsRoot,
			SearchDataLookupParametersLookupRootIdTypes searchDataLookupParametersLookupType,
			SearchDataLookupParams_CreatedByInfo searchDataLookupParams_CreatedByInfo) throws SQLException;

	
}