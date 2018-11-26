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
 * This is used for Displaying Users On Project Page
 *
 */
public class UserDisplay_ProjectPage {

	private int userId;
	
	private String firstName;
	private String lastName;

	private boolean projectOwner;

	private boolean canRemoveEntry;
	private boolean canDemoteEntry;
	private boolean canPromoteEntry;
	
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public boolean isCanRemoveEntry() {
		return canRemoveEntry;
	}
	public void setCanRemoveEntry(boolean canRemoveEntry) {
		this.canRemoveEntry = canRemoveEntry;
	}
	public boolean isCanDemoteEntry() {
		return canDemoteEntry;
	}
	public void setCanDemoteEntry(boolean canDemoteEntry) {
		this.canDemoteEntry = canDemoteEntry;
	}
	public boolean isCanPromoteEntry() {
		return canPromoteEntry;
	}
	public void setCanPromoteEntry(boolean canPromoteEntry) {
		this.canPromoteEntry = canPromoteEntry;
	}
	public boolean isProjectOwner() {
		return projectOwner;
	}
	public void setProjectOwner(boolean projectOwner) {
		this.projectOwner = projectOwner;
	}

}