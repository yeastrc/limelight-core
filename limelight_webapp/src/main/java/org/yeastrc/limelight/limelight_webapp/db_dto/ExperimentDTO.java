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
package org.yeastrc.limelight.limelight_webapp.db_dto;

import org.yeastrc.limelight.limelight_shared.enum_classes.Experiment_CreatedByUserType;

/**
 * table experiment_tbl
 *
 */
public class ExperimentDTO {

	private int id;
	private int projectId;
	private boolean draft;
	private Integer associatedSearchDataLookupParametersLookupId;
	private String name;
	private String projectSearchIdsOnlyJSON; //  Parse to int[] using Jackson
	private String experimentJSONMainData;
	
	/**
	 * Version Number in expermentJSONMainData
	 */
	private int versionNumber;
	
	private Integer createdByUserId;
	private Experiment_CreatedByUserType createdByUserType;
	private String createdByRemoteIP;

	private Integer experimentLastUpdatedByUserId;
	private Experiment_CreatedByUserType experimentLastUpdatedByUserType;
	
	@Override
	public String toString() {
		return "ExperimentDTO [id=" + id + ", projectId=" + projectId + ", draft=" + draft
				+ ", associatedSearchDataLookupParametersLookupId=" + associatedSearchDataLookupParametersLookupId
				+ ", name=" + name + ", projectSearchIdsOnlyJSON=" + projectSearchIdsOnlyJSON
				+ ", experimentJSONMainData=" + experimentJSONMainData + ", versionNumber=" + versionNumber
				+ ", createdByUserId=" + createdByUserId + ", createdByUserType=" + createdByUserType
				+ ", createdByRemoteIP=" + createdByRemoteIP + ", experimentLastUpdatedByUserId="
				+ experimentLastUpdatedByUserId + ", experimentLastUpdatedByUserType=" + experimentLastUpdatedByUserType
				+ "]";
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
	public boolean isDraft() {
		return draft;
	}
	public void setDraft(boolean draft) {
		this.draft = draft;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getProjectSearchIdsOnlyJSON() {
		return projectSearchIdsOnlyJSON;
	}
	public void setProjectSearchIdsOnlyJSON(String projectSearchIdsOnlyJSON) {
		this.projectSearchIdsOnlyJSON = projectSearchIdsOnlyJSON;
	}
	public int getVersionNumber() {
		return versionNumber;
	}
	public void setVersionNumber(int versionNumber) {
		this.versionNumber = versionNumber;
	}
	public Integer getCreatedByUserId() {
		return createdByUserId;
	}
	public void setCreatedByUserId(Integer createdByUserId) {
		this.createdByUserId = createdByUserId;
	}
	public Experiment_CreatedByUserType getCreatedByUserType() {
		return createdByUserType;
	}
	public void setCreatedByUserType(Experiment_CreatedByUserType createdByUserType) {
		this.createdByUserType = createdByUserType;
	}
	public String getCreatedByRemoteIP() {
		return createdByRemoteIP;
	}
	public void setCreatedByRemoteIP(String createdByRemoteIP) {
		this.createdByRemoteIP = createdByRemoteIP;
	}
	public String getExperimentJSONMainData() {
		return experimentJSONMainData;
	}
	public void setExperimentJSONMainData(String experimentJSONMainData) {
		this.experimentJSONMainData = experimentJSONMainData;
	}
	public Integer getAssociatedSearchDataLookupParametersLookupId() {
		return associatedSearchDataLookupParametersLookupId;
	}
	public void setAssociatedSearchDataLookupParametersLookupId(Integer associatedSearchDataLookupParametersLookupId) {
		this.associatedSearchDataLookupParametersLookupId = associatedSearchDataLookupParametersLookupId;
	}
	public Integer getExperimentLastUpdatedByUserId() {
		return experimentLastUpdatedByUserId;
	}
	public void setExperimentLastUpdatedByUserId(Integer experimentLastUpdatedByUserId) {
		this.experimentLastUpdatedByUserId = experimentLastUpdatedByUserId;
	}
	public Experiment_CreatedByUserType getExperimentLastUpdatedByUserType() {
		return experimentLastUpdatedByUserType;
	}
	public void setExperimentLastUpdatedByUserType(Experiment_CreatedByUserType experimentLastUpdatedByUserType) {
		this.experimentLastUpdatedByUserType = experimentLastUpdatedByUserType;
	}

}
