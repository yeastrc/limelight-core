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
 * table user_tbl
 *
 */
public class UserDTO {

	private int id;
	private int userMgmtUserId;
	private Integer userAccessLevel;
	private boolean enabledAppSpecific;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUserMgmtUserId() {
		return userMgmtUserId;
	}
	public void setUserMgmtUserId(int userMgmtUserId) {
		this.userMgmtUserId = userMgmtUserId;
	}
	public Integer getUserAccessLevel() {
		return userAccessLevel;
	}
	public void setUserAccessLevel(Integer userAccessLevel) {
		this.userAccessLevel = userAccessLevel;
	}
	public boolean isEnabledAppSpecific() {
		return enabledAppSpecific;
	}
	public void setEnabledAppSpecific(boolean enabledAppSpecific) {
		this.enabledAppSpecific = enabledAppSpecific;
	}
	
}

