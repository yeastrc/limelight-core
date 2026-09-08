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
package org.yeastrc.limelight.limelight_webapp.servlet_context_listener;

import jakarta.servlet.http.HttpSessionEvent;
import jakarta.servlet.http.HttpSessionListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Optionally override the HttpSession inactivity timeout (max-inactive-interval)
 * per-deployment via the environment variable LIMELIGHT_SESSION_TIMEOUT_MINUTES.
 *
 * <p>Tomcat has no native env-var / system-property for the session timeout; it only
 * reads {@code <session-timeout>} from web.xml. This listener lets a PULLED prebuilt
 * war be tuned per-deployment without rebuilding the war: if the env var is set to a
 * positive integer number of MINUTES, that value (converted to seconds) is applied to
 * each new session via {@link jakarta.servlet.http.HttpSession#setMaxInactiveInterval(int)}.
 *
 * <p>The feature is strictly opt-in: if the env var is unset, blank, non-integer, or
 * not positive, NO override is applied and the Tomcat container's default
 * session timeout is used unchanged. The env var is read and validated ONCE, at class
 * load, and cached in a private static final field (never re-read per session).
 *
 * <p>Registered explicitly via a {@code <listener>} element in web.xml (not @WebListener).
 */
public class HttpSession_InactivityTimeout_EnvVarOverride_Listener implements HttpSessionListener {

	private static final Logger log = LoggerFactory.getLogger( HttpSession_InactivityTimeout_EnvVarOverride_Listener.class );

	private static final String ENV_VAR_NAME = "LIMELIGHT_SESSION_TIMEOUT_MINUTES";

	private static final int SECONDS_PER_MINUTE = 60;

	/**
	 * Effective HttpSession max-inactive-interval, in SECONDS, computed ONCE at class load
	 * from the env var {@value #ENV_VAR_NAME}. {@code null} => feature inactive => no
	 * override is applied to new sessions (Tomcat container's default applies).
	 */
	private static final Integer _maxInactiveInterval_Seconds = computeMaxInactiveInterval_Seconds();

	/**
	 * Read and validate the env var exactly once. Any problem (unset/blank/non-integer/
	 * non-positive/out-of-range) => return null so the feature stays inactive.
	 *
	 * @return the max-inactive-interval in seconds, or null when no override should apply.
	 */
	private static Integer computeMaxInactiveInterval_Seconds() {

		String raw = System.getenv( ENV_VAR_NAME );

		if ( raw == null || raw.trim().isEmpty() ) {
			log.info( "No HttpSession inactivity-timeout override configured: env var '" + ENV_VAR_NAME
					+ "' is not set or is blank. Falling back to the Tomcat container's default session timeout." );
			return null;
		}

		String trimmed = raw.trim();

		int parsedMinutes;
		try {
			parsedMinutes = Integer.parseInt( trimmed );
		} catch ( NumberFormatException e ) {
			log.error( "Invalid value for env var '" + ENV_VAR_NAME + "': '" + trimmed
					+ "' is not an integer. No HttpSession inactivity-timeout override will be applied;"
					+ " falling back to the Tomcat container's default session timeout." );
			return null;
		}

		if ( parsedMinutes <= 0 ) {
			log.error( "Invalid value for env var '" + ENV_VAR_NAME + "': '" + parsedMinutes
					+ "' must be a positive integer number of minutes. No HttpSession inactivity-timeout override"
					+ " will be applied; falling back to the Tomcat container's default session timeout." );
			return null;
		}

		//  guard against int overflow of (minutes * 60), which setMaxInactiveInterval takes as seconds
		long seconds_Long = ((long) parsedMinutes) * SECONDS_PER_MINUTE;
		if ( seconds_Long > Integer.MAX_VALUE ) {
			log.error( "Value for env var '" + ENV_VAR_NAME + "': '" + parsedMinutes
					+ "' minutes is too large (exceeds " + ( Integer.MAX_VALUE / SECONDS_PER_MINUTE )
					+ " minutes) to express in seconds as an int. No HttpSession inactivity-timeout override"
					+ " will be applied; falling back to the Tomcat container's default session timeout." );
			return null;
		}

		int seconds = (int) seconds_Long;

		log.info( "HttpSession inactivity-timeout override configured via env var '" + ENV_VAR_NAME + "': "
				+ parsedMinutes + " minutes (" + seconds + " seconds). This will be applied to each new HttpSession." );

		return seconds;
	}

	@Override
	public void sessionCreated( HttpSessionEvent se ) {

		Integer maxInactiveInterval_Seconds = _maxInactiveInterval_Seconds;

		if ( maxInactiveInterval_Seconds != null ) {
			se.getSession().setMaxInactiveInterval( maxInactiveInterval_Seconds.intValue() );
		}
	}

	@Override
	public void sessionDestroyed( HttpSessionEvent se ) {
		//  no-op
	}
}
