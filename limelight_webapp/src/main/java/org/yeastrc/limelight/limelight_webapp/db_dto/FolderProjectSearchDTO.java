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
 * folder_project_search table_tbl
 *
 */
public class FolderProjectSearchDTO {
	
	private int projectSearchId; // primary key
	private int folderId;
	private int searchDisplayOrder;

	@Override
	public String toString() {
		return "FolderProjectSearchDTO [projectSearchId=" + projectSearchId + ", folderId=" + folderId
				+ ", searchDisplayOrder=" + searchDisplayOrder + "]";
	}
	
	public int getFolderId() {
		return folderId;
	}
	public void setFolderId(int folderId) {
		this.folderId = folderId;
	}
	public int getProjectSearchId() {
		return projectSearchId;
	}
	public void setProjectSearchId(int projectSearchId) {
		this.projectSearchId = projectSearchId;
	}
	public int getSearchDisplayOrder() {
		return searchDisplayOrder;
	}
	public void setSearchDisplayOrder(int searchDisplayOrder) {
		this.searchDisplayOrder = searchDisplayOrder;
	}

}
