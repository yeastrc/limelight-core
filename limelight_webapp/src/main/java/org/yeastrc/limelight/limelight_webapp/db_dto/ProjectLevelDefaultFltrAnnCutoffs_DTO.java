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

import org.yeastrc.limelight.limelight_shared.enum_classes.PsmPeptideMatchedProteinAnnotationType;

/**
 * project_level_default_fltr_ann_cutoffs_tbl table
 *
 */
public class ProjectLevelDefaultFltrAnnCutoffs_DTO {

	private int id;
	private int projectId;
	private PsmPeptideMatchedProteinAnnotationType psmPeptideMatchedProteinAnnotationType;
	private String searchProgramName;
	private String annotationTypeName;
	private double annotationCutoffValue;
	private int createdUserId;
	private int lastUpdatedUserId;

	@Override
	public String toString() {
		return "ProjectLevelDefaultFltrAnnCutoffs_DTO [id=" + id + ", projectId=" + projectId
				+ ", psmPeptideMatchedProteinAnnotationType=" + psmPeptideMatchedProteinAnnotationType
				+ ", searchProgramName=" + searchProgramName + ", annotationTypeName=" + annotationTypeName
				+ ", annotationCutoffValue=" + annotationCutoffValue + ", createdUserId=" + createdUserId
				+ ", lastUpdatedUserId=" + lastUpdatedUserId + "]";
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getProjectId() {
		return projectId;
	}
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
	public String getSearchProgramName() {
		return searchProgramName;
	}
	public void setSearchProgramName(String searchProgramName) {
		this.searchProgramName = searchProgramName;
	}
	public String getAnnotationTypeName() {
		return annotationTypeName;
	}
	public void setAnnotationTypeName(String annotationTypeName) {
		this.annotationTypeName = annotationTypeName;
	}
	public double getAnnotationCutoffValue() {
		return annotationCutoffValue;
	}
	public void setAnnotationCutoffValue(double annotationCutoffValue) {
		this.annotationCutoffValue = annotationCutoffValue;
	}
	public PsmPeptideMatchedProteinAnnotationType getPsmPeptideMatchedProteinAnnotationType() {
		return psmPeptideMatchedProteinAnnotationType;
	}
	public void setPsmPeptideMatchedProteinAnnotationType(
			PsmPeptideMatchedProteinAnnotationType psmPeptideMatchedProteinAnnotationType) {
		this.psmPeptideMatchedProteinAnnotationType = psmPeptideMatchedProteinAnnotationType;
	}
	public int getCreatedUserId() {
		return createdUserId;
	}
	public void setCreatedUserId(int createdUserId) {
		this.createdUserId = createdUserId;
	}
	public int getLastUpdatedUserId() {
		return lastUpdatedUserId;
	}
	public void setLastUpdatedUserId(int lastUpdatedUserId) {
		this.lastUpdatedUserId = lastUpdatedUserId;
	}
}
