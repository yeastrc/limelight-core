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
package org.yeastrc.limelight.limelight_webapp.user_session_management;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Alter User Session
 * 
 * Saves Updated User session using UserSessionManager 
 *
 */
@Component
public class UserSessionAlterSession implements UserSessionAlterSessionIF {
	
	@Autowired
	private UserSessionManager userSessionManager;

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionAlterSessionIF#changeEnabledAppSpecific(boolean, org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession, javax.servlet.http.HttpServletRequest)
	 */
	@Override
	public UserSession changeEnabledAppSpecific( boolean enabledAppSpecific, UserSession userSession, HttpServletRequest httpServletRequest ) {
		
		userSession.enabledAppSpecific = enabledAppSpecific;
		
		//  Update session
		userSessionManager.setUserSession( userSession, httpServletRequest );
		
		return userSession;
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionAlterSessionIF#changeUserAccessLevel(Integer, org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession, javax.servlet.http.HttpServletRequest)
	 */
	@Override
	public UserSession changeUserAccessLevel( Integer userAccessLevel, UserSession userSession, HttpServletRequest httpServletRequest ) {
		
		userSession.userAccessLevel = userAccessLevel;
		
		//  Update session
		userSessionManager.setUserSession( userSession, httpServletRequest );
		
		return userSession;
	}
	
	
}
