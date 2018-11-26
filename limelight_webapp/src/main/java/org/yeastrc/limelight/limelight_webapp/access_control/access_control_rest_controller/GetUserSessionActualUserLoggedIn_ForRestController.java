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
package org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.access_control.common.AccessControl_GetUserSession_RefreshAccessEnabled_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;

/**
 * Get User Session if Actual User Logged In
 *
 * Used for Project List Page Web Service
 * 
 * For Rest Controller since DOES throw exception when no session or not actual user
 */
@Component
public class GetUserSessionActualUserLoggedIn_ForRestController implements GetUserSessionActualUserLoggedIn_ForRestControllerIF {
	
	@Autowired
	private AccessControl_GetUserSession_RefreshAccessEnabled_IF accessControl_GetUserSession_RefreshAccessEnabled;

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.GetUserSessionActualUserLoggedIn_ForRestControllerIF#userSessionOfActualUserLoggedIn(javax.servlet.http.HttpServletRequest)
	 */
	@Override
	public UserSession userSessionOfActualUserLoggedIn( HttpServletRequest httpServletRequest ) {
		
		UserSession userSession = accessControl_GetUserSession_RefreshAccessEnabled.getUserSession_RefreshAccessEnabled( httpServletRequest );
		if ( userSession == null ) {
			throw new Limelight_WS_AuthError_Unauthorized_Exception();
		}
		if ( ! userSession.isActualUser() ) {
			throw new Limelight_WS_AuthError_Forbidden_Exception();
		}
		if ( userSession.getUserId() == null ) {
			throw new Limelight_WS_AuthError_Forbidden_Exception();
		}
		
		return userSession;
	}
}
