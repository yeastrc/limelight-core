package org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access;

/**
 * 
 *
 */
public class UserMgmtChangePasswordRequest {
	
	private int userMgmtUserId;
	private String oldPassword;
	private String newPassword;
	private String userRemoteIP;
	

	@Override
	public String toString() {
		return "UserMgmtChangePasswordRequest [userMgmtUserId=" + userMgmtUserId
				+ ", userRemoteIP=" + userRemoteIP
				+ ", oldPassword=NOT SHOWN"
				+ ", newPassword=NOT SHOWN]";
	}
	public String getUserRemoteIP() {
		return userRemoteIP;
	}
	public void setUserRemoteIP(String userRemoteIP) {
		this.userRemoteIP = userRemoteIP;
	}
	public int getUserMgmtUserId() {
		return userMgmtUserId;
	}
	public void setUserMgmtUserId(int userMgmtUserId) {
		this.userMgmtUserId = userMgmtUserId;
	}
	public String getOldPassword() {
		return oldPassword;
	}
	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	

}
