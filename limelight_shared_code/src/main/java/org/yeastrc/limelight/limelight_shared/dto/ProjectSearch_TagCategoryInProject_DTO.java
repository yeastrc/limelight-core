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
package org.yeastrc.limelight.limelight_shared.dto;

/**
 * project_search_tag_category_in_project_tbl table
 */
public class ProjectSearch_TagCategoryInProject_DTO {

	private int id;
	private int projectId;

	private String categoryLabel;
	
	private Integer uncategorized_FakeLabel;  // set to ProjectSearch_TagCategoryInProject_UncategorizedFakeLabel_Values_Constants.UNCATEGORIZED_FAKE_LABEL_TRUE
	
	private String label_Color_Font;
	private String label_Color_Background;
	private String label_Color_Border;
	
	private Integer createdBy_UserId;
	private Integer updatedBy_UserId;
	
	@Override
	public String toString() {
		return "ProjectSearch_TagCategoryInProject_DTO [id=" + id + ", projectId=" + projectId + ", categoryLabel="
				+ categoryLabel + ", uncategorized_FakeLabel=" + uncategorized_FakeLabel + ", label_Color_Font="
				+ label_Color_Font + ", label_Color_Background=" + label_Color_Background + ", label_Color_Border="
				+ label_Color_Border + ", createdBy_UserId=" + createdBy_UserId + ", updatedBy_UserId="
				+ updatedBy_UserId + "]";
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
	public String getCategoryLabel() {
		return categoryLabel;
	}
	public void setCategoryLabel(String categoryLabel) {
		this.categoryLabel = categoryLabel;
	}
	public Integer getUncategorized_FakeLabel() {
		return uncategorized_FakeLabel;
	}
	public void setUncategorized_FakeLabel(Integer uncategorized_FakeLabel) {
		this.uncategorized_FakeLabel = uncategorized_FakeLabel;
	}
	public String getLabel_Color_Font() {
		return label_Color_Font;
	}
	public void setLabel_Color_Font(String label_Color_Font) {
		this.label_Color_Font = label_Color_Font;
	}
	public String getLabel_Color_Background() {
		return label_Color_Background;
	}
	public void setLabel_Color_Background(String label_Color_Background) {
		this.label_Color_Background = label_Color_Background;
	}
	public String getLabel_Color_Border() {
		return label_Color_Border;
	}
	public void setLabel_Color_Border(String label_Color_Border) {
		this.label_Color_Border = label_Color_Border;
	}
	public Integer getCreatedBy_UserId() {
		return createdBy_UserId;
	}
	public void setCreatedBy_UserId(Integer createdBy_UserId) {
		this.createdBy_UserId = createdBy_UserId;
	}
	public Integer getUpdatedBy_UserId() {
		return updatedBy_UserId;
	}
	public void setUpdatedBy_UserId(Integer updatedBy_UserId) {
		this.updatedBy_UserId = updatedBy_UserId;
	}
	

}

