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


import javax.servlet.http.HttpServletRequest;

import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.Validate_Access_Page_ExperimentDataPage.Validate_Access_Page_ExperimentDataPage_Result;

/**
 * @author danj
 *
 */
public interface Experiment_Set_HTTPRequest_ForJSP_IF {

	/**
	 * @param projectIds
	 * @param userSession
	 * @param httpServletRequest
	 * @throws Exception 
	 */
	void experiment_Set_HTTPRequest_ForJSP(Validate_Access_Page_ExperimentDataPage_Result validate_Access_Page_ExperimentDataPage_Result,
			HttpServletRequest httpServletRequest) throws Exception;

}