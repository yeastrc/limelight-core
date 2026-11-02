package org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Re-check of the User Mgmt account "enabled" flag, per User Mgmt user, at most once per interval.
 *
 * The interval comes from User Mgmt, on its responses (UserMgmtCentralWebappWebserviceAccess passes every
 * received value to receivedIntervalFromUserMgmt(...)).  User Mgmt sends one only when it runs as a separate
 * webapp.  Embedded User Mgmt sends none, so there is no re-check: an account is then disabled only in
 * Limelight (user_tbl.enabled_app_specific), which is checked on every request.
 *
 * Per user (not per session): one call covers all of a user's sessions and parallel requests.
 * The entry is written only here: at sign-in / create account, and by the re-check.
 * Entries are not removed (one small entry per user who signed in).
 *
 * When the call fails or times out, the last known value is kept (the session continues),
 * and all re-checks for all users skip the call for BACK_OFF_MILLIS.  After that, one request at a time
 * makes the next call (the probe) until a call succeeds.
 */
@Component
public class UserMgmt_UserEnabled_RecheckCache implements UserMgmt_UserEnabled_RecheckCache_IF {

	private static final Logger log = LoggerFactory.getLogger( UserMgmt_UserEnabled_RecheckCache.class );

	/**
	 * Total time allowed for the re-check call to User Mgmt
	 */
	static final int RECHECK_CALL_TOTAL_TIMEOUT_MILLIS = 1500;

	/**
	 * After a failed call, no re-check calls for any user for this long
	 */
	static final long BACK_OFF_MILLIS = 60 * 1000;

	static final int INTERVAL_SECONDS_MIN = 30;
	static final int INTERVAL_SECONDS_MAX = 3600;

	//  The interval, from User Mgmt.  0 = none received = no re-check

	private static volatile int recheckIntervalSeconds = 0;

	/**
	 * The last value received from User Mgmt, before clamping.  Used to log a clamped value only when it changes.
	 */
	private static volatile Integer lastReceivedIntervalSeconds = null;

	/**
	 * Per user entry.  The entry object is also the per-user lock.
	 */
	private static class Entry {
		volatile boolean enabled = true;
		volatile long lastCheckedMillis = 0;  //  0: never checked, so the first request checks
	}

	private final ConcurrentHashMap<Integer, Entry> entries_Key_UserMgmtUserId = new ConcurrentHashMap<>();

	//  Back-off after a failed call

	private final Object backOffLock = new Object();

	private volatile boolean lastCallFailed = false;

	private volatile long dontCallBeforeMillis = 0;

	/**
	 * After a back-off: only one probe call at a time
	 */
	private final AtomicBoolean probeInFlight = new AtomicBoolean( false );

	@Autowired
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;


	/**
	 * Called with the value from every User Mgmt response.
	 *
	 * @param intervalSeconds_FromUserMgmt - null: none sent, keep the current value
	 */
	public static void receivedIntervalFromUserMgmt( Integer intervalSeconds_FromUserMgmt ) {

		if ( intervalSeconds_FromUserMgmt == null ) {
			return;
		}
		if ( intervalSeconds_FromUserMgmt.equals( lastReceivedIntervalSeconds ) ) {
			return;  //  no change
		}

		synchronized ( UserMgmt_UserEnabled_RecheckCache.class ) {

			if ( intervalSeconds_FromUserMgmt.equals( lastReceivedIntervalSeconds ) ) {
				return;  //  no change
			}

			int received = intervalSeconds_FromUserMgmt;
			int clamped = Math.min( Math.max( received, INTERVAL_SECONDS_MIN ), INTERVAL_SECONDS_MAX );

			if ( clamped != received ) {
				log.warn( "User Mgmt sent a re-check interval of " + received + " seconds, outside "
						+ INTERVAL_SECONDS_MIN + " - " + INTERVAL_SECONDS_MAX + ".  Using " + clamped + " seconds." );
			}

			recheckIntervalSeconds = clamped;
			lastReceivedIntervalSeconds = intervalSeconds_FromUserMgmt;
		}
	}

	/**
	 * @return the interval in use, in seconds.  0: none received, no re-check
	 */
	static int getRecheckIntervalSeconds() {
		return recheckIntervalSeconds;
	}


	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmt_UserEnabled_RecheckCache_IF#setUserMgmtAccount_Enabled_CheckedNow(int)
	 */
	@Override
	public void setUserMgmtAccount_Enabled_CheckedNow( int userMgmtUserId ) {

		Entry entry = entries_Key_UserMgmtUserId.computeIfAbsent( userMgmtUserId, k -> new Entry() );

		synchronized ( entry ) {
			entry.enabled = true;
			entry.lastCheckedMillis = System.currentTimeMillis();
		}
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmt_UserEnabled_RecheckCache_IF#isUserMgmtAccountDisabled_RecheckIfDue(int)
	 */
	@Override
	public boolean isUserMgmtAccountDisabled_RecheckIfDue( int userMgmtUserId ) {

		final int intervalSeconds = recheckIntervalSeconds;

		if ( intervalSeconds <= 0 ) {
			//  No interval received from User Mgmt (embedded mode): no re-check
			return false;
		}

		final long intervalMillis = intervalSeconds * 1000L;

		Entry entry = entries_Key_UserMgmtUserId.computeIfAbsent( userMgmtUserId, k -> new Entry() );

		if ( System.currentTimeMillis() - entry.lastCheckedMillis < intervalMillis ) {
			//  Checked recently: no call, no wait, no lock
			return ! entry.enabled;
		}

		synchronized ( entry ) {

			//  Check the time again inside the lock: another request for this user may have just checked

			if ( System.currentTimeMillis() - entry.lastCheckedMillis < intervalMillis ) {
				return ! entry.enabled;
			}

			boolean isProbe = false;

			if ( lastCallFailed ) {

				if ( System.currentTimeMillis() < dontCallBeforeMillis ) {
					//  Back-off: keep the last known value
					return ! entry.enabled;
				}
				if ( ! probeInFlight.compareAndSet( false, true ) ) {
					//  Another request is making the probe call: keep the last known value
					return ! entry.enabled;
				}
				isProbe = true;
			}

			try {
				UserMgmtGetAccountEnabledRequest userMgmtGetAccountEnabledRequest = new UserMgmtGetAccountEnabledRequest();
				userMgmtGetAccountEnabledRequest.setUserId( userMgmtUserId );

				UserMgmtGetAccountEnabledResponse userMgmtGetAccountEnabledResponse = null;
				Exception callException = null;

				try {
					userMgmtGetAccountEnabledResponse =
							userMgmtCentralWebappWebserviceAccess.getAccountEnabled_ForRecheck( userMgmtGetAccountEnabledRequest, RECHECK_CALL_TOTAL_TIMEOUT_MILLIS );
				} catch ( Exception e ) {
					callException = e;
				}

				if ( userMgmtGetAccountEnabledResponse != null && userMgmtGetAccountEnabledResponse.isUserIdNotFound() ) {

					callSucceeded();

					entry.enabled = false;
					entry.lastCheckedMillis = System.currentTimeMillis();
					return true;
				}

				if ( callException != null || userMgmtGetAccountEnabledResponse == null || ( ! userMgmtGetAccountEnabledResponse.isSuccess() ) ) {

					callFailed( userMgmtUserId, userMgmtGetAccountEnabledResponse, callException );

					//  Fail open: keep the last known value
					return ! entry.enabled;
				}

				callSucceeded();

				entry.enabled = userMgmtGetAccountEnabledResponse.isEnabled();
				entry.lastCheckedMillis = System.currentTimeMillis();

				if ( entry.enabled ) {
					if ( log.isDebugEnabled() ) {
						log.debug( "Re-check of User Mgmt enabled flag: still enabled.  User Mgmt user id: " + userMgmtUserId );
					}
				}

				return ! entry.enabled;

			} finally {
				if ( isProbe ) {
					probeInFlight.set( false );
				}
			}
		}
	}

	/**
	 *
	 */
	private void callSucceeded() {

		if ( lastCallFailed ) {
			synchronized ( backOffLock ) {
				if ( lastCallFailed ) {
					lastCallFailed = false;
					log.info( "Re-check of User Mgmt enabled flag: call to User Mgmt succeeded again." );
				}
			}
		}
	}

	/**
	 * Start the back-off, unless one is already running.  WARN once per back-off.
	 */
	private void callFailed( int userMgmtUserId, UserMgmtGetAccountEnabledResponse userMgmtGetAccountEnabledResponse, Exception callException ) {

		synchronized ( backOffLock ) {

			long now = System.currentTimeMillis();

			if ( lastCallFailed && now < dontCallBeforeMillis ) {
				//  Back-off already running (requests that were already calling when it started)
				return;
			}

			lastCallFailed = true;
			dontCallBeforeMillis = now + BACK_OFF_MILLIS;

			String msg = "Re-check of User Mgmt enabled flag: call to User Mgmt failed.  Keeping the last known value"
					+ " and making no re-check calls for " + ( BACK_OFF_MILLIS / 1000 ) + " seconds.  User Mgmt user id: " + userMgmtUserId;

			if ( callException != null ) {
				log.warn( msg + ".  Exception: " + callException.toString() );
			} else if ( userMgmtGetAccountEnabledResponse == null ) {
				log.warn( msg + ".  No response." );
			} else {
				log.warn( msg + ".  Error message: " + userMgmtGetAccountEnabledResponse.getErrorMessage() );
			}
		}
	}

}
