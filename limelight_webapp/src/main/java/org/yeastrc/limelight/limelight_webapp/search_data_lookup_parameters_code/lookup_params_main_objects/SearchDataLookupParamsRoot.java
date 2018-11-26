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
package org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects;

/**
 * Root Object
 *
 */
public class SearchDataLookupParamsRoot {
	
	private Integer versionNumber;

	/**
	 * Populate if the params are for project Search Ids
	 */
	private SearchDataLookupParams_For_ProjectSearchIds paramsForProjectSearchIds;

	public SearchDataLookupParams_For_ProjectSearchIds getParamsForProjectSearchIds() {
		return paramsForProjectSearchIds;
	}

	public void setParamsForProjectSearchIds(SearchDataLookupParams_For_ProjectSearchIds paramsForProjectSearchIds) {
		this.paramsForProjectSearchIds = paramsForProjectSearchIds;
	}

	public Integer getVersionNumber() {
		return versionNumber;
	}

	public void setVersionNumber(Integer versionNumber) {
		this.versionNumber = versionNumber;
	}
	
}
