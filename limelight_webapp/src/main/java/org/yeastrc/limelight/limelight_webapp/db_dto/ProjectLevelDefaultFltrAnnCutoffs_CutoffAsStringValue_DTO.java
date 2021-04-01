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
package org.yeastrc.limelight.limelight_webapp.db_dto;


/**
 * project_level_default_fltr_ann_cutoffs_cutoff_as_string_tbl table
 *
 */
public class ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO {

	private int projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_Id;
	private String annotationCutoffValueString;

	@Override
	public String toString() {
		return "ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO [projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_Id="
				+ projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_Id + ", annotationCutoffValueString="
				+ annotationCutoffValueString + "]";
	}
	
	public int getProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_Id() {
		return projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_Id;
	}
	public void setProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_Id(
			int projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_Id) {
		this.projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_Id = projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_Id;
	}
	public String getAnnotationCutoffValueString() {
		return annotationCutoffValueString;
	}
	public void setAnnotationCutoffValueString(String annotationCutoffValueString) {
		this.annotationCutoffValueString = annotationCutoffValueString;
	}
}
