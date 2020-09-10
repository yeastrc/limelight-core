/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_webapp.services;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionManager;

/**
 * Is the Browser Microsoft Edge Legacy (EdgeHTML) which is no longer under development is deprecated
 *
 */
@Component
public class BrowserIs_MicrosoftEdgeLegacy_Detection_Service implements BrowserIs_MicrosoftEdgeLegacy_Detection_ServiceIF {

	private static final Logger log = LoggerFactory.getLogger( BrowserIs_MicrosoftEdgeLegacy_Detection_Service.class );

	@Autowired
	private UserSessionManager userSessionManager;
	
	/**
	 * @param httpServletRequest
	 * @return
	 */
	@Override
	public boolean browserIs_MicrosoftEdgeLegacy_Detection_Service( HttpServletRequest httpServletRequest ) {
		
		try {
			String userAgentString = httpServletRequest.getHeader("User-Agent");

			if ( userAgentString != null ) {

				if ( userAgentString.contains( "Edge/1" ) 
						|| userAgentString.contains( "Edge/2" )
						|| userAgentString.contains( "Edge/3" )
						|| userAgentString.contains( "Edge/4" )
						|| userAgentString.contains( "Edge/5" ) ) {

					if ( log.isDebugEnabled() ) {

						try {

							String requestURL = httpServletRequest.getRequestURL().toString();

							String userSessionUsername = "";

							String username = null;

							try {
								username = getUsername( httpServletRequest );
							} catch ( Exception e ) {
								log.error( "Error getting username" );
								//  Swallow any exceptions getting username
							}

							if ( username != null ) {
								userSessionUsername = "\t, session username: \t" + username;
							}

							log.debug( "Browser is Microsoft Legacy Edge.  "
									+ "UserAgent: \t" + userAgentString
									+ "\t, requested URL: \t" + requestURL
									+ "\t, remote IP: \t" + httpServletRequest.getRemoteAddr()
									+ userSessionUsername );

						} catch ( Throwable t ) {
							log.error( "Failed logging browser/user information when is Browser is Microsoft Legacy Edge", t );
							//  Swallow any exceptions getting username
						}
					}

					return true;
				}
			}

			return false;

		} catch (Exception e) {
			log.error( "Error determining if Browser is Microsoft Legacy Edge", e );
			throw e;
		}
	}

	/**
	 * @param httpRequest
	 * @return - null if no username
	 */
	private String getUsername( HttpServletRequest httpServletRequest ) {
	
		UserSession userSession = userSessionManager.getUserSession( httpServletRequest );
		if ( userSession == null ) {
			//  No User session 
			return null;
		}
		
		return userSession.getUsername();
	}
	
}
