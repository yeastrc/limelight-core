package org.yeastrc.limelight.limelight_webapp.signin_limits;

import java.util.Locale;

/**
 * Sign-in limits: one for the whole webapp.
 *
 * See SignIn_Limits
 */
public interface SignIn_Limits_IF {

	/**
	 * The key for a submitted username: trimmed and lower case (User Mgmt matches usernames case-insensitively)
	 */
	static String normalizeUsername( String username ) {
		return username.trim().toLowerCase( Locale.ROOT );
	}

	/**
	 * C: one sign-in at a time per username.
	 *
	 * @return false if a sign-in for this username is in progress: refuse.
	 *         true: the caller MUST call signInInProgress_Remove( usernameKey ) in a finally
	 */
	boolean signInInProgress_TryAdd( String usernameKey );

	/**
	 * C: call in a finally after signInInProgress_TryAdd returned true
	 */
	void signInInProgress_Remove( String usernameKey );

	/**
	 * A: call before calling User Mgmt.
	 *
	 * @return null if not blocked.  If blocked: the remaining time in seconds, rounded up to whole minutes (at least 60)
	 */
	Integer userBlocked_RemainingSeconds_RoundedUpToMinutes( String usernameKey );

	/**
	 * D: a cap on concurrent sign-ins.  Waits up to the configured time for a permit.
	 *
	 * @return false if no permit: refuse.  true: the caller MUST call concurrentSignIn_Release() in a finally
	 */
	boolean concurrentSignIn_TryAcquire() throws InterruptedException;

	/**
	 * D: call in a finally after concurrentSignIn_TryAcquire returned true
	 */
	void concurrentSignIn_Release();

	/**
	 * User Mgmt answered "password invalid" (the account exists).  Counts for A and E.
	 */
	void recordFailure_PasswordInvalid( String usernameKey );

	/**
	 * User Mgmt answered "username not found".  Counts for E only.
	 */
	void recordFailure_UsernameNotFound();

	/**
	 * User Mgmt answered success (the password is right).  Clears the username's count for A.
	 */
	void recordSuccess_PasswordValid( String usernameKey );

	/**
	 * @return S: the seconds in the message when C or D refuses
	 */
	int getRetrySeconds();

}
