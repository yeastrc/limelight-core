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

/**
 * Root of what represents an Experiment.
 * 
 * Root of object graph passed from/to the Javascript 
 *
 * 
 *
 */
public class Experiment_A_Root {

	private int version;
	private Experiment_ConditionGroupsContainer conditionGroupsContainer;
	private Experiment_OverallConditionDataRoot experimentConditionData; // From JS Class ConditionGroupsDataContainer
	
	public int getVersion() {
		return version;
	}
	public void setVersion(int version) {
		this.version = version;
	}
	public Experiment_ConditionGroupsContainer getConditionGroupsContainer() {
		return conditionGroupsContainer;
	}
	public void setConditionGroupsContainer(Experiment_ConditionGroupsContainer conditionGroupsContainer) {
		this.conditionGroupsContainer = conditionGroupsContainer;
	}
	public Experiment_OverallConditionDataRoot getExperimentConditionData() {
		return experimentConditionData;
	}
	public void setExperimentConditionData(Experiment_OverallConditionDataRoot experimentConditionData) {
		this.experimentConditionData = experimentConditionData;
	}
}
