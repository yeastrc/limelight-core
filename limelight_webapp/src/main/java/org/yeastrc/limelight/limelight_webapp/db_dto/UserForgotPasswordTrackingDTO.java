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

import java.util.Date;

/**
 * table user_forgot_password_tracking_tbl
 *
 */
public class UserForgotPasswordTrackingDTO {
	
	private int id;
	private int userId;
	private Date createDate;
	private Date usedDate;
	private String forgotPasswordTrackingCode;
	private String submitIP;
	private String useIP;
	private boolean codeReplacedByNewer;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getUsedDate() {
		return usedDate;
	}
	public void setUsedDate(Date usedDate) {
		this.usedDate = usedDate;
	}
	public String getForgotPasswordTrackingCode() {
		return forgotPasswordTrackingCode;
	}
	public void setForgotPasswordTrackingCode(String forgotPasswordTrackingCode) {
		this.forgotPasswordTrackingCode = forgotPasswordTrackingCode;
	}
	public String getSubmitIP() {
		return submitIP;
	}
	public void setSubmitIP(String submitIP) {
		this.submitIP = submitIP;
	}
	public String getUseIP() {
		return useIP;
	}
	public void setUseIP(String useIP) {
		this.useIP = useIP;
	}
	public boolean isCodeReplacedByNewer() {
		return codeReplacedByNewer;
	}
	public void setCodeReplacedByNewer(boolean codeReplacedByNewer) {
		this.codeReplacedByNewer = codeReplacedByNewer;
	}
	
}
