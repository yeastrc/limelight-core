package org.yeastrc.limelight.limelight_webapp.signin_limits;

import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Sign-in limits configuration, read from environment variables.
 *
 * Same rules as HttpSession_InactivityTimeout_EnvVarOverride_Listener:
 *   unset or blank: the default;
 *   not an integer or not positive: log an ERROR naming the variable and the value, and use the default.
 *
 * LIMELIGHT_SIGNIN_LIMITS_ENABLED:  "false" (any case): all sign-in limits off.  "true", unset or blank: on.
 *   Any other value: log an ERROR naming the variable and the value, and use on.
 */
public class SignIn_Limits_Config_FromEnvVars {

	private static final Logger log = LoggerFactory.getLogger( SignIn_Limits_Config_FromEnvVars.class );

	static final String ENV_VAR_NAME__ENABLED = "LIMELIGHT_SIGNIN_LIMITS_ENABLED";
	static final String ENV_VAR_NAME__USER_MAX_FAILURES = "LIMELIGHT_SIGNIN_USER_MAX_FAILURES";
	static final String ENV_VAR_NAME__USER_WINDOW_MINUTES = "LIMELIGHT_SIGNIN_USER_WINDOW_MINUTES";
	static final String ENV_VAR_NAME__USER_BLOCK_MINUTES = "LIMELIGHT_SIGNIN_USER_BLOCK_MINUTES";
	static final String ENV_VAR_NAME__RETRY_SECONDS = "LIMELIGHT_SIGNIN_RETRY_SECONDS";
	static final String ENV_VAR_NAME__MAX_CONCURRENT = "LIMELIGHT_SIGNIN_MAX_CONCURRENT";
	static final String ENV_VAR_NAME__CONCURRENT_WAIT_MILLIS = "LIMELIGHT_SIGNIN_CONCURRENT_WAIT_MILLIS";
	static final String ENV_VAR_NAME__ALERT_FAILURES = "LIMELIGHT_SIGNIN_ALERT_FAILURES";
	static final String ENV_VAR_NAME__ALERT_WINDOW_MINUTES = "LIMELIGHT_SIGNIN_ALERT_WINDOW_MINUTES";

	static final int DEFAULT__USER_MAX_FAILURES = 7;
	static final int DEFAULT__USER_WINDOW_MINUTES = 15;
	static final int DEFAULT__USER_BLOCK_MINUTES = 8;
	static final int DEFAULT__RETRY_SECONDS = 30;
	static final int DEFAULT__MAX_CONCURRENT = 10;
	static final int DEFAULT__CONCURRENT_WAIT_MILLIS = 2000;
	static final int DEFAULT__ALERT_FAILURES = 50;
	static final int DEFAULT__ALERT_WINDOW_MINUTES = 5;

	private final boolean enabled;
	private final int userMaxFailures;
	private final int userWindowMinutes;
	private final int userBlockMinutes;
	private final int retrySeconds;
	private final int maxConcurrent;
	private final int concurrentWaitMillis;
	private final int alertFailures;
	private final int alertWindowMinutes;

	SignIn_Limits_Config_FromEnvVars(
			boolean enabled,
			int userMaxFailures, int userWindowMinutes, int userBlockMinutes,
			int retrySeconds,
			int maxConcurrent, int concurrentWaitMillis,
			int alertFailures, int alertWindowMinutes ) {

		this.enabled = enabled;
		this.userMaxFailures = userMaxFailures;
		this.userWindowMinutes = userWindowMinutes;
		this.userBlockMinutes = userBlockMinutes;
		this.retrySeconds = retrySeconds;
		this.maxConcurrent = maxConcurrent;
		this.concurrentWaitMillis = concurrentWaitMillis;
		this.alertFailures = alertFailures;
		this.alertWindowMinutes = alertWindowMinutes;
	}

	/**
	 * @param getenv  System::getenv, or a test replacement
	 */
	static SignIn_Limits_Config_FromEnvVars fromEnvVars( Function<String, String> getenv ) {

		return new SignIn_Limits_Config_FromEnvVars(
				parseEnabled( getenv.apply( ENV_VAR_NAME__ENABLED ) ),
				parsePositiveInt( ENV_VAR_NAME__USER_MAX_FAILURES, getenv.apply( ENV_VAR_NAME__USER_MAX_FAILURES ), DEFAULT__USER_MAX_FAILURES ),
				parsePositiveInt( ENV_VAR_NAME__USER_WINDOW_MINUTES, getenv.apply( ENV_VAR_NAME__USER_WINDOW_MINUTES ), DEFAULT__USER_WINDOW_MINUTES ),
				parsePositiveInt( ENV_VAR_NAME__USER_BLOCK_MINUTES, getenv.apply( ENV_VAR_NAME__USER_BLOCK_MINUTES ), DEFAULT__USER_BLOCK_MINUTES ),
				parsePositiveInt( ENV_VAR_NAME__RETRY_SECONDS, getenv.apply( ENV_VAR_NAME__RETRY_SECONDS ), DEFAULT__RETRY_SECONDS ),
				parsePositiveInt( ENV_VAR_NAME__MAX_CONCURRENT, getenv.apply( ENV_VAR_NAME__MAX_CONCURRENT ), DEFAULT__MAX_CONCURRENT ),
				parsePositiveInt( ENV_VAR_NAME__CONCURRENT_WAIT_MILLIS, getenv.apply( ENV_VAR_NAME__CONCURRENT_WAIT_MILLIS ), DEFAULT__CONCURRENT_WAIT_MILLIS ),
				parsePositiveInt( ENV_VAR_NAME__ALERT_FAILURES, getenv.apply( ENV_VAR_NAME__ALERT_FAILURES ), DEFAULT__ALERT_FAILURES ),
				parsePositiveInt( ENV_VAR_NAME__ALERT_WINDOW_MINUTES, getenv.apply( ENV_VAR_NAME__ALERT_WINDOW_MINUTES ), DEFAULT__ALERT_WINDOW_MINUTES ) );
	}

	static boolean parseEnabled( String raw ) {

		if ( raw == null || raw.trim().isEmpty() ) {
			return true;
		}
		String trimmed = raw.trim();
		if ( "false".equalsIgnoreCase( trimmed ) ) {
			return false;
		}
		if ( "true".equalsIgnoreCase( trimmed ) ) {
			return true;
		}
		log.error( "Invalid value for env var '" + ENV_VAR_NAME__ENABLED + "': '" + trimmed
				+ "' is not true or false.  The sign-in limits stay on." );
		return true;
	}

	static int parsePositiveInt( String envVarName, String raw, int defaultValue ) {

		if ( raw == null || raw.trim().isEmpty() ) {
			return defaultValue;
		}
		String trimmed = raw.trim();
		int parsed;
		try {
			parsed = Integer.parseInt( trimmed );
		} catch ( NumberFormatException e ) {
			log.error( "Invalid value for env var '" + envVarName + "': '" + trimmed
					+ "' is not an integer.  Using the default: " + defaultValue );
			return defaultValue;
		}
		if ( parsed <= 0 ) {
			log.error( "Invalid value for env var '" + envVarName + "': '" + parsed
					+ "' must be a positive integer.  Using the default: " + defaultValue );
			return defaultValue;
		}
		return parsed;
	}

	public boolean isEnabled() {
		return enabled;
	}
	public int getUserMaxFailures() {
		return userMaxFailures;
	}
	public int getUserWindowMinutes() {
		return userWindowMinutes;
	}
	public int getUserBlockMinutes() {
		return userBlockMinutes;
	}
	public int getRetrySeconds() {
		return retrySeconds;
	}
	public int getMaxConcurrent() {
		return maxConcurrent;
	}
	public int getConcurrentWaitMillis() {
		return concurrentWaitMillis;
	}
	public int getAlertFailures() {
		return alertFailures;
	}
	public int getAlertWindowMinutes() {
		return alertWindowMinutes;
	}
}
