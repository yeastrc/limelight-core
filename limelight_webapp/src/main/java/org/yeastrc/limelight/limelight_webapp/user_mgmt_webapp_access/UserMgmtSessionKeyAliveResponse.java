package org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access;

public class UserMgmtSessionKeyAliveResponse {

	private boolean success;
	
	private boolean sessionKeyNotValid;
	
	private String errorMessage;

	@Override
	public String toString() {
		return "UserMgmtSessionKeyAliveWebserviceResponse [success=" + success + ", sessionKeyNotValid="
				+ sessionKeyNotValid + ", errorMessage=" + errorMessage + "]";
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public boolean isSessionKeyNotValid() {
		return sessionKeyNotValid;
	}

	public void setSessionKeyNotValid(boolean sessionKeyNotValid) {
		this.sessionKeyNotValid = sessionKeyNotValid;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
}
