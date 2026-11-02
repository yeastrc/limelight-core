package org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access;

/**
 * Re-check of the User Mgmt account "enabled" flag, per User Mgmt user, at most once per interval.
 *
 * See UserMgmt_UserEnabled_RecheckCache
 */
public interface UserMgmt_UserEnabled_RecheckCache_IF {

	/**
	 * Re-check the User Mgmt account "enabled" flag if the last check for this user is older than the interval.
	 *
	 * No interval received from User Mgmt (embedded mode): no re-check, returns false.
	 *
	 * @param userMgmtUserId
	 * @return true if User Mgmt says the account is disabled or not found: the caller ends the session
	 */
	boolean isUserMgmtAccountDisabled_RecheckIfDue( int userMgmtUserId );

	/**
	 * Set the user's entry to "enabled, checked now".  Call after a successful sign-in or create account.
	 *
	 * @param userMgmtUserId
	 */
	void setUserMgmtAccount_Enabled_CheckedNow( int userMgmtUserId );

}
