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
package org.yeastrc.limelight.limelight_webapp.objects_request_scope;

/**
 * display a project in the header
 * 
 * Placed in request scope by PopulatePageHeaderData
 *
 */
public class ProjectTitleHeaderDisplay {
	
	private int projectId;
	
	private String projectTitle;
	
//
//	private String titleFull;
//	
//	/**
//	 * Truncated as needed
//	 */
//	private String titleHeaderDisplay;
//
//	/**
//	 * Truncated as needed, for when no user.  Will be truncated Longer
//	 */
//	private String titleHeaderDisplayNonUser;
	
	private boolean projectLocked;
	
	
	
	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public boolean isProjectLocked() {
		return projectLocked;
	}

	public void setProjectLocked(boolean projectLocked) {
		this.projectLocked = projectLocked;
	}

	public String getProjectTitle() {
		return projectTitle;
	}

	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}
}
