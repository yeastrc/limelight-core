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
package org.yeastrc.limelight.limelight_webapp.objects;

/**
 * Single Search Minimal - only name, search id, projectSearchId
 *
 */
public class SearchItemMinimal {

	private int projectSearchId;
	private int searchId;
	private int projectId;
	private int displayOrder;
	private String name;
	private boolean searchHasSubgroups;
	
	@Override
	public String toString() {
		return "SearchItemMinimal [projectSearchId=" + projectSearchId + ", searchId=" + searchId + ", projectId="
				+ projectId + ", displayOrder=" + displayOrder + ", name=" + name + ", searchHasSubgroups="
				+ searchHasSubgroups + "]";
	}

	/**
	 * @@@  WARNING:  Will return null if user did not assign a name to the search !!!
	 * @return
	 */
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getProjectSearchId() {
		return projectSearchId;
	}
	public void setProjectSearchId(int projectSearchId) {
		this.projectSearchId = projectSearchId;
	}
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public int getProjectId() {
		return projectId;
	}
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public int getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(int displayOrder) {
		this.displayOrder = displayOrder;
	}
	public boolean isSearchHasSubgroups() {
		return searchHasSubgroups;
	}
	public void setSearchHasSubgroups(boolean searchHasSubgroups) {
		this.searchHasSubgroups = searchHasSubgroups;
	}
		
}
