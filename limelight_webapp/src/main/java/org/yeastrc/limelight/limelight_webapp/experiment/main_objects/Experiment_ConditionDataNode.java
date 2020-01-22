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
 * Single Condition
 * 
 * Contains either:
 *   Data for this condition
 *   Nested Condition Groups
 *
 */
public class Experiment_ConditionDataNode {

	private List<Experiment_ConditionDataNode> conditions;
	private Experiment_ConditionDataOuterData data;
	private Integer conditionId;
	
	public Experiment_ConditionDataOuterData getData() {
		return data;
	}
	public void setData(Experiment_ConditionDataOuterData data) {
		this.data = data;
	}
	public Integer getConditionId() {
		return conditionId;
	}
	public void setConditionId(Integer conditionId) {
		this.conditionId = conditionId;
	}
	public List<Experiment_ConditionDataNode> getConditions() {
		return conditions;
	}
	public void setConditions(List<Experiment_ConditionDataNode> conditions) {
		this.conditions = conditions;
	}
}
