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
package org.yeastrc.limelight.limelight_webapp.experiment.main_objects;

import java.util.List;

/**
 * From JS Class ConditionGroupsDataContainer
 * 
 * Single Condition outer 'data' property
 * 
 */
public class Experiment_ConditionDataInnerData {

	private List<Integer> projectSearchIds;

	public List<Integer> getProjectSearchIds() {
		return projectSearchIds;
	}
	public void setProjectSearchIds(List<Integer> projectSearchIds) {
		this.projectSearchIds = projectSearchIds;
	}
}
