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
 * project_search_tag_strings_in_project_tbl table
 */
public class ProjectSearch_TagStringInProject_DTO {

	private int id;
	private int projectId;
	private int tagCategoryId;

	private String tag_string;
	
	private String tag_Color_Font;
	private String tag_Color_Background;
	private String tag_Color_Border;
	
	private Integer createdBy_UserId;
	private Integer updatedBy_UserId;

	@Override
	public String toString() {
		return "ProjectSearch_TagStringInProject_DTO [id=" + id + ", projectId=" + projectId + ", tagCategoryId="
				+ tagCategoryId + ", tag_string=" + tag_string + ", tag_Color_Font=" + tag_Color_Font
				+ ", tag_Color_Background=" + tag_Color_Background + ", tag_Color_Border=" + tag_Color_Border
				+ ", createdBy_UserId=" + createdBy_UserId + ", updatedBy_UserId=" + updatedBy_UserId + "]";
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
	public String getTag_string() {
		return tag_string;
	}
	public void setTag_string(String tag_string) {
		this.tag_string = tag_string;
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
	public String getTag_Color_Font() {
		return tag_Color_Font;
	}
	public void setTag_Color_Font(String tag_Color_Font) {
		this.tag_Color_Font = tag_Color_Font;
	}
	public String getTag_Color_Background() {
		return tag_Color_Background;
	}
	public void setTag_Color_Background(String tag_Color_Background) {
		this.tag_Color_Background = tag_Color_Background;
	}
	public String getTag_Color_Border() {
		return tag_Color_Border;
	}
	public void setTag_Color_Border(String tag_Color_Border) {
		this.tag_Color_Border = tag_Color_Border;
	}

	public int getTagCategoryId() {
		return tagCategoryId;
	}

	public void setTagCategoryId(int tagCategoryId) {
		this.tagCategoryId = tagCategoryId;
	}
}

