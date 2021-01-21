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
 * table project_search_sub_group_tbl
 *
 */
public class ProjectSearchSubGroupDTO {
	
	private int projectSearchId;
	private int searchId;
	private int searchSubGroupId; // Unique within a search id
	private Integer displayOrder; // null until user updates it or user saves changes to subgroupName_Display
	private String subgroupName_Display; // null until user enters a value

	/**
	 * @return null until user enters a value
	 */
	public String getSubgroupName_Display() {
		return subgroupName_Display;
	}
	/**
	 * Unique within a search id
	 * @return
	 */
	public int getSearchSubGroupId() {
		return searchSubGroupId;
	}
	public void setSearchSubGroupId(int searchSubGroupId) {
		this.searchSubGroupId = searchSubGroupId;
	}
	
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public void setSubgroupName_Display(String subgroupName_Display) {
		this.subgroupName_Display = subgroupName_Display;
	}
	public Integer getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}
	public int getProjectSearchId() {
		return projectSearchId;
	}
	public void setProjectSearchId(int projectSearchId) {
		this.projectSearchId = projectSearchId;
	}
	
}
