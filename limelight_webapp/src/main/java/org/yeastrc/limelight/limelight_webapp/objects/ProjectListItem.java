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
 * 
 *
 */
public class ProjectListItem {

	private int id;
	private String title;
	private boolean projectLocked;
	private boolean projectPublic;
	private boolean projectPublicAccessEnabled;
	private int userAccessLevel;
	
	@Override
	public String toString() {
		return "ProjectListItem [id=" + id + ", title=" + title + ", projectLocked=" + projectLocked
				+ ", projectPublic=" + projectPublic + ", projectPublicAccessEnabled=" + projectPublicAccessEnabled
				+ ", userAccessLevel=" + userAccessLevel + "]";
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public boolean isProjectLocked() {
		return projectLocked;
	}
	public void setProjectLocked(boolean projectLocked) {
		this.projectLocked = projectLocked;
	}
	public int getUserAccessLevel() {
		return userAccessLevel;
	}
	public void setUserAccessLevel(int userAccessLevel) {
		this.userAccessLevel = userAccessLevel;
	}

	public boolean isProjectPublic() {
		return projectPublic;
	}

	public void setProjectPublic(boolean projectPublic) {
		this.projectPublic = projectPublic;
	}

	public boolean isProjectPublicAccessEnabled() {
		return projectPublicAccessEnabled;
	}

	public void setProjectPublicAccessEnabled(boolean projectPublicAccessEnabled) {
		this.projectPublicAccessEnabled = projectPublicAccessEnabled;
	}

}
