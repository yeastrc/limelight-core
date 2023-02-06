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
 * project_scan_filename__search_scan_file__mapping_tbl table
 */
public class ProjectScanFilename_SearchScanFile_Mapping_DTO {

	private int projectScanFilenameId;
	private int searchScanFileId;
	private int projectSearchId;
	
	public int getProjectScanFilenameId() {
		return projectScanFilenameId;
	}
	public void setProjectScanFilenameId(int projectScanFilenameId) {
		this.projectScanFilenameId = projectScanFilenameId;
	}
	public int getSearchScanFileId() {
		return searchScanFileId;
	}
	public void setSearchScanFileId(int searchScanFileId) {
		this.searchScanFileId = searchScanFileId;
	}
	public int getProjectSearchId() {
		return projectSearchId;
	}
	public void setProjectSearchId(int projectSearchId) {
		this.projectSearchId = projectSearchId;
	}
}

