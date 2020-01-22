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
public class Experiment_ConditionGroup {

	private Integer id;
	private String label;
	private Boolean typeContinuous;
	private Boolean typeDiscrete;
	private Boolean typeBiologicalReplicate;
	private Boolean typeTechnicalReplicate;
	private Boolean typeTimePoint;
	private Boolean specialConditionGroup;  //  Set if typeBiologicalReplicate, typeTechnicalReplicate, or typeTimePoint
		
	private List<Experiment_Condition> conditions;
	
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public Boolean isTypeContinuous() {
		return typeContinuous;
	}
	public void setTypeContinuous(Boolean typeContinuous) {
		this.typeContinuous = typeContinuous;
	}
	public Boolean isTypeDiscrete() {
		return typeDiscrete;
	}
	public void setTypeDiscrete(Boolean typeDiscrete) {
		this.typeDiscrete = typeDiscrete;
	}
	public List<Experiment_Condition> getConditions() {
		return conditions;
	}
	public void setConditions(List<Experiment_Condition> conditions) {
		this.conditions = conditions;
	}
	public Boolean isTypeBiologicalReplicate() {
		return typeBiologicalReplicate;
	}
	public void setTypeBiologicalReplicate(Boolean typeBiologicalReplicate) {
		this.typeBiologicalReplicate = typeBiologicalReplicate;
	}
	public Boolean isTypeTechnicalReplicate() {
		return typeTechnicalReplicate;
	}
	public void setTypeTechnicalReplicate(Boolean typeTechnicalReplicate) {
		this.typeTechnicalReplicate = typeTechnicalReplicate;
	}
	public Boolean isTypeTimePoint() {
		return typeTimePoint;
	}
	public void setTypeTimePoint(Boolean typeTimePoint) {
		this.typeTimePoint = typeTimePoint;
	}
	public Boolean isSpecialConditionGroup() {
		return specialConditionGroup;
	}
	public void setSpecialConditionGroup(Boolean specialConditionGroup) {
		this.specialConditionGroup = specialConditionGroup;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
}
