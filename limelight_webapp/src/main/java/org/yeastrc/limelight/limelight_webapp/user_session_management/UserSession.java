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
package org.yeastrc.limelight.limelight_webapp.user_session_management;

/**
 * The User's Session stored in the session
 *
 */
public class UserSession {

	//  When Access using Public Access Code at Sign in Page
	
	String publicAccessCode;
	Integer projectId_ForPublicAccessCode;

	/////////
	
	/**
	 * Set false if Public Access or something else
	 */
	boolean actualUser;
	
	Integer userId;
	Integer userMgmtUserId;
	Integer userAccessLevel;
	boolean enabledAppSpecific;

	//  From User Mgmt

	String userMgmtSessionKey;

	String username;
	String email;
	String firstName;
	String lastName;
	String organization;
	boolean enabled;
	boolean globalAdminUser;
	
	/**
	 * @return
	 */
	UserSession makeClone() {
		
		UserSession newUserSession = new UserSession();
		
		newUserSession.publicAccessCode = this.publicAccessCode;
		newUserSession.projectId_ForPublicAccessCode  = this.projectId_ForPublicAccessCode;
		
		newUserSession.actualUser = this.actualUser;
		
		newUserSession.userId = this.userId;
		newUserSession.userMgmtUserId = this.userMgmtUserId;
		newUserSession.userAccessLevel = this.userAccessLevel;
		newUserSession.enabledAppSpecific = this.enabledAppSpecific;
		
		newUserSession.userMgmtSessionKey = this.userMgmtSessionKey;
		
		newUserSession.username = this.username;
		newUserSession.email = this.email;
		newUserSession.firstName = this.firstName;
		newUserSession.lastName = this.lastName;
		newUserSession.organization = this.organization;
		newUserSession.enabled = this.enabled;
		newUserSession.globalAdminUser = this.globalAdminUser;
		
		return newUserSession;
	}


	// public getters

	/**
	 * When Access using Public Access Code at Sign in Page
	 * @return
	 */
	public String getPublicAccessCode() {
		return publicAccessCode;
	}
	/**
	 * When Access using Public Access Code at Sign in Page
	 * @return
	 */
	public Integer getProjectId_ForPublicAccessCode() {
		return projectId_ForPublicAccessCode;
	}

	/**
	 * Set false if Public Access or something else
	 * @return
	 */
	public boolean isActualUser() {
		return actualUser;
	}
	

	public Integer getUserId() {
		return userId;
	}
	public Integer getUserMgmtUserId() {
		return userMgmtUserId;
	}
	public Integer getUserAccessLevel() {
		return userAccessLevel;
	}
	public boolean isEnabledAppSpecific() {
		return enabledAppSpecific;
	}
	public String getUserMgmtSessionKey() {
		return userMgmtSessionKey;
	}
	public String getUsername() {
		return username;
	}
	public String getEmail() {
		return email;
	}
	public String getFirstName() {
		return firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public String getOrganization() {
		return organization;
	}
	public boolean isEnabled() {
		return enabled;
	}
	public boolean isGlobalAdminUser() {
		return globalAdminUser;
	}

}
