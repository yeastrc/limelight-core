package org.yeastrc.limelight.limelight_webapp.signin_limits;

import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;
import java.util.function.LongSupplier;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Sign-in limits: one for the whole webapp (Spring singleton).  Used only by the sign-in web service.
 *
 * In the order they run, after the empty-field checks.  The key is the normalized username.
 *
 * C. One sign-in at a time per username.  A second one while the first is in progress is refused.
 *
 * A. Per username: U_MAX "password invalid" answers from User Mgmt within U_WINDOW minutes block that username
 *    for U_BLOCK minutes.  While blocked, sign-in is refused before User Mgmt is called; not counted, and the block
 *    is not extended.  "Username not found" never counts here.  A success clears the count.
 *    Entries exist only for usernames User Mgmt said exist.  Old entries are removed every USER_MAP_CLEANUP_EVERY
 *    accesses.  At most USER_MAP_MAX_ENTRIES entries: when full, the least recently used one is dropped.
 *
 * D. At most K sign-in calls to User Mgmt at the same time.  Waits up to D_WAIT_MS for a permit, then refuses.
 *
 * E. Alert only, never refuses: an ERROR when E_MAX failures (password invalid or username not found) happen
 *    within E_WINDOW minutes, and an ERROR when D refuses.  Each at most once per ALERT_INTERVAL.
 *
 * No usernames, emails, passwords or IPs are logged.  Nothing is logged per refused attempt.
 *
 * Configuration: SignIn_Limits_Config_FromEnvVars, read once when Spring creates this object.
 * Enabled false: nothing is refused or counted.
 */
@Component
public class SignIn_Limits implements SignIn_Limits_IF {

	private static final Logger log = LoggerFactory.getLogger( SignIn_Limits.class );

	private static final long MILLIS_PER_MINUTE = 60L * 1000;

	static final int USER_MAP_MAX_ENTRIES = 10_000;

	static final int USER_MAP_CLEANUP_EVERY = 100;

	/**
	 * Each ERROR alert, and the WARN for the user map cap: at most once per this interval
	 */
	static final long ALERT_INTERVAL_MILLIS = 60 * MILLIS_PER_MINUTE;

	private final boolean enabled;
	private final int userMaxFailures;
	private final int userWindowMinutes;
	private final int userBlockMinutes;
	private final int retrySeconds;
	private final int maxConcurrent;
	private final int concurrentWaitMillis;
	private final int alertFailures;
	private final int alertWindowMinutes;

	/**
	 * Milliseconds from a monotonic clock
	 */
	private final LongSupplier clock_Millis;

	//  C

	private final Set<String> signInInProgress_UsernameKeys = ConcurrentHashMap.newKeySet();

	//  A.  All only read or changed while holding userEntries_Lock

	private static class UserEntry {
		/**
		 * Times of the "password invalid" failures within the window.  At most userMaxFailures entries.
		 */
		final ArrayDeque<Long> failureTimes_Millis = new ArrayDeque<>();
		/**
		 * null: not blocked
		 */
		Long blockedUntil_Millis = null;
	}

	private final Object userEntries_Lock = new Object();

	/**
	 * Access order: the first entry is the least recently used
	 */
	private final LinkedHashMap<String, UserEntry> userEntries_Key_UsernameKey = new LinkedHashMap<>( 16, 0.75f, true );

	private int userEntries_AccessCount = 0;

	private Long userMapCapWarn_LastLogged_Millis = null;

	//  D

	private final Semaphore concurrentSignIns_Semaphore;

	//  E.  All only read or changed while holding alert_Lock

	private final Object alert_Lock = new Object();

	/**
	 * Times of all failures within the alert window.  At most alertFailures entries.
	 */
	private final ArrayDeque<Long> alert_FailureTimes_Millis = new ArrayDeque<>();

	private Long alert_FailureRate_LastLogged_Millis = null;

	private Long alert_ConcurrentLimit_LastLogged_Millis = null;

	/**
	 * Used by Spring
	 */
	public SignIn_Limits() {
		this(
				SignIn_Limits_Config_FromEnvVars.fromEnvVars( System::getenv ),
				() -> System.nanoTime() / 1_000_000 );

		if ( enabled ) {
			log.warn( "Sign-in limits: enabled.  Per username: " + userMaxFailures + " wrong passwords within " + userWindowMinutes
					+ " minutes block it for " + userBlockMinutes + " minutes.  Concurrent sign-ins: at most " + maxConcurrent
					+ " (wait up to " + concurrentWaitMillis + " ms).  Retry after: " + retrySeconds
					+ " seconds.  Alert: " + alertFailures + " failed sign-ins within " + alertWindowMinutes + " minutes." );
		} else {
			log.warn( "Sign-in limits: DISABLED (env var " + SignIn_Limits_Config_FromEnvVars.ENV_VAR_NAME__ENABLED + " is false)." );
		}
	}

	/**
	 * @param config
	 * @param clock_Millis  milliseconds from a monotonic clock (a test can pass its own)
	 */
	SignIn_Limits( SignIn_Limits_Config_FromEnvVars config, LongSupplier clock_Millis ) {

		this.enabled = config.isEnabled();
		this.userMaxFailures = config.getUserMaxFailures();
		this.userWindowMinutes = config.getUserWindowMinutes();
		this.userBlockMinutes = config.getUserBlockMinutes();
		this.retrySeconds = config.getRetrySeconds();
		this.maxConcurrent = config.getMaxConcurrent();
		this.concurrentWaitMillis = config.getConcurrentWaitMillis();
		this.alertFailures = config.getAlertFailures();
		this.alertWindowMinutes = config.getAlertWindowMinutes();
		this.clock_Millis = clock_Millis;
		this.concurrentSignIns_Semaphore = new Semaphore( maxConcurrent, true );
	}

	////////  C

	@Override
	public boolean signInInProgress_TryAdd( String usernameKey ) {
		if ( ! enabled ) {
			return true;
		}
		return signInInProgress_UsernameKeys.add( usernameKey );
	}

	@Override
	public void signInInProgress_Remove( String usernameKey ) {
		if ( ! enabled ) {
			return;
		}
		signInInProgress_UsernameKeys.remove( usernameKey );
	}

	////////  A

	@Override
	public Integer userBlocked_RemainingSeconds_RoundedUpToMinutes( String usernameKey ) {

		if ( ! enabled ) {
			return null;
		}
		synchronized ( userEntries_Lock ) {

			long now = clock_Millis.getAsLong();

			userEntries_CleanupIfDue( now );

			UserEntry userEntry = userEntries_Key_UsernameKey.get( usernameKey );
			if ( userEntry == null || userEntry.blockedUntil_Millis == null ) {
				return null;
			}
			long remaining_Millis = userEntry.blockedUntil_Millis - now;
			if ( remaining_Millis <= 0 ) {
				//  Block over: start the count from zero
				userEntry.blockedUntil_Millis = null;
				userEntry.failureTimes_Millis.clear();
				return null;
			}
			long remaining_Minutes = ( remaining_Millis + MILLIS_PER_MINUTE - 1 ) / MILLIS_PER_MINUTE;
			if ( remaining_Minutes < 1 ) {
				remaining_Minutes = 1;
			}
			return (int) ( remaining_Minutes * 60 );
		}
	}

	@Override
	public void recordFailure_PasswordInvalid( String usernameKey ) {

		if ( ! enabled ) {
			return;
		}

		long now = clock_Millis.getAsLong();

		alert_RecordFailure( now );

		synchronized ( userEntries_Lock ) {

			userEntries_CleanupIfDue( now );

			UserEntry userEntry = userEntries_Key_UsernameKey.get( usernameKey );
			if ( userEntry == null ) {
				if ( userEntries_Key_UsernameKey.size() >= USER_MAP_MAX_ENTRIES ) {
					Iterator<Map.Entry<String, UserEntry>> iterator = userEntries_Key_UsernameKey.entrySet().iterator();
					iterator.next();
					iterator.remove();  //  the least recently used
					if ( userMapCapWarn_LastLogged_Millis == null || now - userMapCapWarn_LastLogged_Millis >= ALERT_INTERVAL_MILLIS ) {
						userMapCapWarn_LastLogged_Millis = now;
						log.warn( "Sign-in limits: the per-username failure list reached its limit of " + USER_MAP_MAX_ENTRIES
								+ " entries; the least recently used entries are dropped." );
					}
				}
				userEntry = new UserEntry();
				userEntries_Key_UsernameKey.put( usernameKey, userEntry );
			}

			if ( userEntry.blockedUntil_Millis != null ) {
				if ( now - userEntry.blockedUntil_Millis < 0 ) {
					//  A sign-in that started before the block.  Not counted; the block is not extended.
					return;
				}
				userEntry.blockedUntil_Millis = null;
				userEntry.failureTimes_Millis.clear();
			}

			//  Drop failures older than the window
			long windowStart = now - ( userWindowMinutes * MILLIS_PER_MINUTE );
			while ( ! userEntry.failureTimes_Millis.isEmpty() && userEntry.failureTimes_Millis.peekFirst() - windowStart <= 0 ) {
				userEntry.failureTimes_Millis.removeFirst();
			}

			userEntry.failureTimes_Millis.addLast( now );

			if ( userEntry.failureTimes_Millis.size() >= userMaxFailures ) {
				userEntry.blockedUntil_Millis = now + ( userBlockMinutes * MILLIS_PER_MINUTE );
				userEntry.failureTimes_Millis.clear();
				log.warn( "Sign-in limits: a username reached " + userMaxFailures + " failed sign-ins within " + userWindowMinutes
						+ " minutes; blocked for " + userBlockMinutes + " minutes." );
			}
		}
	}

	@Override
	public void recordSuccess_PasswordValid( String usernameKey ) {

		if ( ! enabled ) {
			return;
		}
		synchronized ( userEntries_Lock ) {
			userEntries_Key_UsernameKey.remove( usernameKey );
		}
	}

	/**
	 * Every USER_MAP_CLEANUP_EVERY calls: remove entries with no failure inside the window and no active block.
	 * Call while holding userEntries_Lock
	 */
	private void userEntries_CleanupIfDue( long now ) {

		userEntries_AccessCount++;
		if ( userEntries_AccessCount < USER_MAP_CLEANUP_EVERY ) {
			return;
		}
		userEntries_AccessCount = 0;

		long windowStart = now - ( userWindowMinutes * MILLIS_PER_MINUTE );

		Iterator<UserEntry> iterator = userEntries_Key_UsernameKey.values().iterator();
		while ( iterator.hasNext() ) {
			UserEntry userEntry = iterator.next();
			boolean blockActive = userEntry.blockedUntil_Millis != null && now - userEntry.blockedUntil_Millis < 0;
			boolean failureInWindow = ( ! userEntry.failureTimes_Millis.isEmpty() ) && userEntry.failureTimes_Millis.peekLast() - windowStart > 0;
			if ( ( ! blockActive ) && ( ! failureInWindow ) ) {
				iterator.remove();
			}
		}
	}

	/**
	 * For the test harness
	 */
	int userEntries_Size() {
		synchronized ( userEntries_Lock ) {
			return userEntries_Key_UsernameKey.size();
		}
	}

	/**
	 * For the test harness
	 */
	Map<String, Boolean> userEntries_ContainsKeys( Set<String> keys ) {
		Map<String, Boolean> result = new HashMap<>();
		synchronized ( userEntries_Lock ) {
			for ( String key : keys ) {
				result.put( key, userEntries_Key_UsernameKey.containsKey( key ) );
			}
		}
		return result;
	}

	////////  D

	@Override
	public boolean concurrentSignIn_TryAcquire() throws InterruptedException {

		if ( ! enabled ) {
			return true;
		}
		if ( concurrentSignIns_Semaphore.tryAcquire( concurrentWaitMillis, TimeUnit.MILLISECONDS ) ) {
			return true;
		}
		synchronized ( alert_Lock ) {
			long now = clock_Millis.getAsLong();
			if ( alert_ConcurrentLimit_LastLogged_Millis == null || now - alert_ConcurrentLimit_LastLogged_Millis >= ALERT_INTERVAL_MILLIS ) {
				alert_ConcurrentLimit_LastLogged_Millis = now;
				log.error( "Sign-in: the concurrent sign-in limit of " + maxConcurrent + " was reached; sign-ins were refused." );
			}
		}
		return false;
	}

	@Override
	public void concurrentSignIn_Release() {
		if ( ! enabled ) {
			return;
		}
		concurrentSignIns_Semaphore.release();
	}

	////////  E

	@Override
	public void recordFailure_UsernameNotFound() {
		if ( ! enabled ) {
			return;
		}
		alert_RecordFailure( clock_Millis.getAsLong() );
	}

	private void alert_RecordFailure( long now ) {

		synchronized ( alert_Lock ) {

			long windowStart = now - ( alertWindowMinutes * MILLIS_PER_MINUTE );
			while ( ! alert_FailureTimes_Millis.isEmpty() && alert_FailureTimes_Millis.peekFirst() - windowStart <= 0 ) {
				alert_FailureTimes_Millis.removeFirst();
			}
			if ( alert_FailureTimes_Millis.size() >= alertFailures ) {
				alert_FailureTimes_Millis.removeFirst();  //  keep at most alertFailures
			}
			alert_FailureTimes_Millis.addLast( now );

			if ( alert_FailureTimes_Millis.size() >= alertFailures ) {
				if ( alert_FailureRate_LastLogged_Millis == null || now - alert_FailureRate_LastLogged_Millis >= ALERT_INTERVAL_MILLIS ) {
					alert_FailureRate_LastLogged_Millis = now;
					log.error( "Sign-in: " + alertFailures + " or more failed sign-ins within " + alertWindowMinutes
							+ " minutes (possible password guessing)." );
				}
			}
		}
	}

	////////

	@Override
	public int getRetrySeconds() {
		return retrySeconds;
	}
}
