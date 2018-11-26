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
 * display the logged in user info in the header
 * 
 * Placed in request scope by PopulatePageHeaderData
 * 
 */
public class UserInfoForPageHeader {

	private String username;
	private String user_displayFirstName;
	private String user_displayLastName;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getUser_displayFirstName() {
		return user_displayFirstName;
	}
	public void setUser_displayFirstName(String user_displayFirstName) {
		this.user_displayFirstName = user_displayFirstName;
	}
	public String getUser_displayLastName() {
		return user_displayLastName;
	}
	public void setUser_displayLastName(String user_displayLastName) {
		this.user_displayLastName = user_displayLastName;
	}
}
