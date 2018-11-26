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

/**
 * table project_tbl
 *
 */
public class ProjectDTO {
	
	private int id;
	private String title;
	private String abstractText;
	
	private boolean enabled;
	private boolean markedForDeletion;
	private Integer markedForDeletionAuthUserId;
	
	private boolean projectLocked;
	
	private Integer publicAccessLevel;
	private boolean publicAccessLocked;
	
	@Override
	public String toString() {
		return "ProjectDTO [id=" + id + ", title=" + title + ", abstractText=" + abstractText + ", enabled=" + enabled
				+ ", markedForDeletion=" + markedForDeletion + ", markedForDeletionAuthUserId="
				+ markedForDeletionAuthUserId + ", projectLocked=" + projectLocked + ", publicAccessLevel="
				+ publicAccessLevel + ", publicAccessLocked=" + publicAccessLocked + "]";
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
	public String getAbstractText() {
		return abstractText;
	}
	public void setAbstractText(String abstractText) {
		this.abstractText = abstractText;
	}
	public boolean isEnabled() {
		return enabled;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	public boolean isMarkedForDeletion() {
		return markedForDeletion;
	}
	public void setMarkedForDeletion(boolean markedForDeletion) {
		this.markedForDeletion = markedForDeletion;
	}
	public Integer getMarkedForDeletionAuthUserId() {
		return markedForDeletionAuthUserId;
	}
	public void setMarkedForDeletionAuthUserId(Integer markedForDeletionAuthUserId) {
		this.markedForDeletionAuthUserId = markedForDeletionAuthUserId;
	}
	public boolean isProjectLocked() {
		return projectLocked;
	}
	public void setProjectLocked(boolean projectLocked) {
		this.projectLocked = projectLocked;
	}
	public Integer getPublicAccessLevel() {
		return publicAccessLevel;
	}
	public void setPublicAccessLevel(Integer publicAccessLevel) {
		this.publicAccessLevel = publicAccessLevel;
	}
	public boolean isPublicAccessLocked() {
		return publicAccessLocked;
	}
	public void setPublicAccessLocked(boolean publicAccessLocked) {
		this.publicAccessLocked = publicAccessLocked;
	}

}
