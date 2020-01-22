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
 * object graph passed from/to the Javascript 
 *
 */
public class Experiment_ConditionGroupsContainer {

	private Integer version;
	private Integer conditionGroupId_MaxAssignedValue;
	private Integer conditionId_MaxAssignedValue;
	private List<Experiment_ConditionGroup> conditionGroups;
	
	public Integer getVersion() {
		return version;
	}
	public void setVersion(Integer version) {
		this.version = version;
	}
	public Integer getConditionGroupId_MaxAssignedValue() {
		return conditionGroupId_MaxAssignedValue;
	}
	public void setConditionGroupId_MaxAssignedValue(Integer conditionGroupId_MaxAssignedValue) {
		this.conditionGroupId_MaxAssignedValue = conditionGroupId_MaxAssignedValue;
	}
	public Integer getConditionId_MaxAssignedValue() {
		return conditionId_MaxAssignedValue;
	}
	public void setConditionId_MaxAssignedValue(Integer conditionId_MaxAssignedValue) {
		this.conditionId_MaxAssignedValue = conditionId_MaxAssignedValue;
	}
	public List<Experiment_ConditionGroup> getConditionGroups() {
		return conditionGroups;
	}
	public void setConditionGroups(List<Experiment_ConditionGroup> conditionGroups) {
		this.conditionGroups = conditionGroups;
	}
	
		
}
