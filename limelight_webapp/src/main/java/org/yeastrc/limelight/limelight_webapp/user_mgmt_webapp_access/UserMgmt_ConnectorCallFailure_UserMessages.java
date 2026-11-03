package org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.user_mgmt_central.user_mgmt_central__embed_code.UserMgmtConnectorCallFailure_IF;

/**
 * A failed call to User Mgmt through the connector (User Mgmt as a separate webapp):
 * find it in an exception, log it, and the messages shown to the user.  All of these messages are here.
 *
 * In embedded mode (no connector) the exception is not a UserMgmtConnectorCallFailure_IF, so these methods return null
 * and the caller keeps today's handling (rethrow).
 *
 * The user never sees the failure reason, the HTTP status or other technical details.  They are logged (ERROR), without submitted values.
 */
public class UserMgmt_ConnectorCallFailure_UserMessages {

	private static final Logger log = LoggerFactory.getLogger( UserMgmt_ConnectorCallFailure_UserMessages.class );

	/**
	 * A change: nothing was saved
	 */
	public static final String MESSAGE__CHANGE_NOT_SAVED =
			"Your change could not be saved; nothing was changed.  Please try again.";

	/**
	 * A change: it may or may not have been saved
	 */
	public static final String MESSAGE__CHANGE_OUTCOME_UNKNOWN =
			"We couldn't confirm whether your change was saved.  Please check before trying again.";

	/**
	 * Added to MESSAGE__CHANGE_OUTCOME_UNKNOWN for create account (self sign-up and from invite)
	 */
	private static final String MESSAGE__CREATE_ACCOUNT_OUTCOME_UNKNOWN__ADDITION_SIGN_IN =
			"  If you can't sign in with the new account, please try again.";

	/**
	 * Added to MESSAGE__CHANGE_OUTCOME_UNKNOWN for create account by an admin
	 */
	private static final String MESSAGE__CREATE_ACCOUNT_OUTCOME_UNKNOWN__ADDITION_ADMIN =
			"  If the new account doesn't appear in the list, please try again.";

	/**
	 * Reading user data failed
	 */
	public static final String MESSAGE__ACCOUNT_SERVICE_UNAVAILABLE =
			"The account service is temporarily unavailable.  Please try again in a moment.";

	/**
	 * Limit on the cause chain walked
	 */
	private static final int CAUSE_CHAIN_MAX_DEPTH = 20;

	/**
	 * Find a connector call failure in the exception or its cause chain (it normally reaches the caller unwrapped).
	 * If found, log it (ERROR, one line, no submitted values).
	 * 
	 * @param exception
	 * @param where  what the user was doing, for the log line (no submitted values)
	 * @return null if not a connector call failure (embedded mode, or another error): the caller keeps today's handling
	 */
	public static UserMgmtConnectorCallFailure_IF getConnectorCallFailure_LogIfFound( Throwable exception, String where ) {

		UserMgmtConnectorCallFailure_IF connectorCallFailure = getConnectorCallFailure( exception );
		if ( connectorCallFailure == null ) {
			return null;
		}
		log.error( "Call to User Mgmt failed.  For: " + where
				+ ".  Call group: " + connectorCallFailure.getCallGroupName()
				+ ", reason: " + connectorCallFailure.getFailureReason()
				+ ", HTTP status: " + connectorCallFailure.getHttpStatusCode()
				+ ", outcome unknown: " + connectorCallFailure.isOutcomeUnknown() );
		return connectorCallFailure;
	}

	/**
	 * @return null if not found
	 */
	static UserMgmtConnectorCallFailure_IF getConnectorCallFailure( Throwable exception ) {

		Throwable current = exception;
		for ( int depth = 0; current != null && depth < CAUSE_CHAIN_MAX_DEPTH; depth++ ) {
			if ( current instanceof UserMgmtConnectorCallFailure_IF ) {
				return (UserMgmtConnectorCallFailure_IF) current;
			}
			if ( current.getCause() == current ) {
				break;
			}
			current = current.getCause();
		}
		return null;
	}

	/**
	 * A change (not create account)
	 */
	public static String getMessage_Change( UserMgmtConnectorCallFailure_IF connectorCallFailure ) {

		if ( connectorCallFailure.isOutcomeUnknown() ) {
			return MESSAGE__CHANGE_OUTCOME_UNKNOWN;
		}
		return MESSAGE__CHANGE_NOT_SAVED;
	}

	/**
	 * Create account: self sign-up or from invite
	 */
	public static String getMessage_CreateAccount_SignUpOrInvite( UserMgmtConnectorCallFailure_IF connectorCallFailure ) {

		if ( connectorCallFailure.isOutcomeUnknown() ) {
			return MESSAGE__CHANGE_OUTCOME_UNKNOWN + MESSAGE__CREATE_ACCOUNT_OUTCOME_UNKNOWN__ADDITION_SIGN_IN;
		}
		return MESSAGE__CHANGE_NOT_SAVED;
	}

	/**
	 * Create account by an admin
	 */
	public static String getMessage_CreateAccount_ByAdmin( UserMgmtConnectorCallFailure_IF connectorCallFailure ) {

		if ( connectorCallFailure.isOutcomeUnknown() ) {
			return MESSAGE__CHANGE_OUTCOME_UNKNOWN + MESSAGE__CREATE_ACCOUNT_OUTCOME_UNKNOWN__ADDITION_ADMIN;
		}
		return MESSAGE__CHANGE_NOT_SAVED;
	}

	/**
	 * Reading user data
	 */
	public static String getMessage_ReadOnly() {
		return MESSAGE__ACCOUNT_SERVICE_UNAVAILABLE;
	}
}
