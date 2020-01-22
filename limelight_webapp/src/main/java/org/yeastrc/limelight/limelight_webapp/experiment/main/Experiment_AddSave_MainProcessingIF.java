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
package org.yeastrc.limelight.limelight_webapp.experiment.main;

import org.yeastrc.limelight.limelight_webapp.db_dto.ExperimentDTO;
import org.yeastrc.limelight.limelight_webapp.experiment.main_objects.Experiment_A_Root;
import org.yeastrc.limelight.limelight_webapp.experiment.params.ExperimentParams_CreatedByInfo;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;

/**
 * @author danj
 *
 */
public interface Experiment_AddSave_MainProcessingIF {

	ExperimentDTO experiment_AddSave_MainProcessing(
			Integer experimentId,
			String experimentName,
			Boolean draft, 
			Experiment_A_Root experiment_A_Root,
			SearchDataLookupParamsRoot searchDataLookupParamsRoot,
			Integer projectId, ExperimentParams_CreatedByInfo experimentParams_CreatedByInfo) throws Exception;

}