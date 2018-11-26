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
 * user_invite_tracking_tbl table
 *
 */
public class UserInviteTrackingDTO {

	private int id;

	private int submittingUserId;
	private String submitIP;

	private String inviteTrackingCode;

	private String invitedUserEmail;
	private int invitedUserAccessLevel;
	private Integer invitedProjectId;
	
	private Date inviteCreateDate;
	private boolean inviteUsed;
	private Date inviteUsedDate;
	private String useIP;

	private boolean codeReplacedByNewer;
	
	private boolean inviteRevoked;
	private Integer revokingUserId;
	private Date revokedDate;
	
	@Override
	public String toString() {
		return "UserInviteTrackingDTO [id=" + id + ", submittingUserId=" + submittingUserId + ", submitIP=" + submitIP
				+ ", inviteTrackingCode=" + inviteTrackingCode + ", invitedUserEmail=" + invitedUserEmail
				+ ", invitedUserAccessLevel=" + invitedUserAccessLevel + ", invitedProjectId=" + invitedProjectId
				+ ", inviteCreateDate=" + inviteCreateDate + ", inviteUsed=" + inviteUsed + ", inviteUsedDate="
				+ inviteUsedDate + ", useIP=" + useIP + ", codeReplacedByNewer=" + codeReplacedByNewer
				+ ", inviteRevoked=" + inviteRevoked + ", revokingUserId=" + revokingUserId + ", revokedDate="
				+ revokedDate + "]";
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getSubmittingUserId() {
		return submittingUserId;
	}
	public void setSubmittingUserId(int submittingUserId) {
		this.submittingUserId = submittingUserId;
	}
	public String getSubmitIP() {
		return submitIP;
	}
	public void setSubmitIP(String submitIP) {
		this.submitIP = submitIP;
	}
	public String getInviteTrackingCode() {
		return inviteTrackingCode;
	}
	public void setInviteTrackingCode(String inviteTrackingCode) {
		this.inviteTrackingCode = inviteTrackingCode;
	}
	public String getInvitedUserEmail() {
		return invitedUserEmail;
	}
	public void setInvitedUserEmail(String invitedUserEmail) {
		this.invitedUserEmail = invitedUserEmail;
	}
	public int getInvitedUserAccessLevel() {
		return invitedUserAccessLevel;
	}
	public void setInvitedUserAccessLevel(int invitedUserAccessLevel) {
		this.invitedUserAccessLevel = invitedUserAccessLevel;
	}
	public Integer getInvitedProjectId() {
		return invitedProjectId;
	}
	public void setInvitedProjectId(Integer invitedProjectId) {
		this.invitedProjectId = invitedProjectId;
	}
	public Date getInviteCreateDate() {
		return inviteCreateDate;
	}
	public void setInviteCreateDate(Date inviteCreateDate) {
		this.inviteCreateDate = inviteCreateDate;
	}
	public boolean isInviteUsed() {
		return inviteUsed;
	}
	public void setInviteUsed(boolean inviteUsed) {
		this.inviteUsed = inviteUsed;
	}
	public Date getInviteUsedDate() {
		return inviteUsedDate;
	}
	public void setInviteUsedDate(Date inviteUsedDate) {
		this.inviteUsedDate = inviteUsedDate;
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
	public boolean isInviteRevoked() {
		return inviteRevoked;
	}
	public void setInviteRevoked(boolean inviteRevoked) {
		this.inviteRevoked = inviteRevoked;
	}
	public Integer getRevokingUserId() {
		return revokingUserId;
	}
	public void setRevokingUserId(Integer revokingUserId) {
		this.revokingUserId = revokingUserId;
	}
	public Date getRevokedDate() {
		return revokedDate;
	}
	public void setRevokedDate(Date revokedDate) {
		this.revokedDate = revokedDate;
	}
	
}
