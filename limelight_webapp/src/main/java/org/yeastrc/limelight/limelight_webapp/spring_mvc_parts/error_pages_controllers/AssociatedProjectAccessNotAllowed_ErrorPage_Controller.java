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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.error_pages_controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.yeastrc.limelight.limelight_webapp.access_control.common.AccessControl_GetUserSession_RefreshAccessEnabled_IF;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.constants.WebConstants;
import org.yeastrc.limelight.limelight_webapp.objects_request_scope.UserInfoForPageHeader;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;

/**
 * Display error page for user not allowed to access project associated with requested data (Protein page, etc)
 *
 */
@Controller
public class AssociatedProjectAccessNotAllowed_ErrorPage_Controller {

	private static final Logger log = LoggerFactory.getLogger( AssociatedProjectAccessNotAllowed_ErrorPage_Controller.class );

	private static final String PRIMARY_CONTROLLER_PATH = AA_ErrorPageControllerPaths_Constants.ASSOCIATED_PROJECT_ACCESS_NOT_ALLOWED_ERROR_PAGE;
	
	/**
	 * Controller Path: 
	 */
	private static final String CONTROLLER_PATH_MAIN = 
			AA_ErrorPageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH;


	@Autowired
	private AccessControl_GetUserSession_RefreshAccessEnabled_IF accessControl_GetUserSession_RefreshAccessEnabled;
	
	/**
	 * Path for when there is no additional page state data (use defaults), 
	 *        or additional page state data and is referrer URL 
	 * 
	 * @param
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( 
			path = {
					CONTROLLER_PATH_MAIN
			} )

	public String controllerEntryMain(
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {

		//				log.warn( "controllerEntryMain(...) called. " );

		return controllerEntryInternal( httpServletRequest, httpServletResponse );

	}

	/**
	 * @param httpServletRequest
	 * @return
	 */
	private String controllerEntryInternal( 
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {
		
//		httpServletResponse.setStatus( 404 );

		UserSession userSession =
				accessControl_GetUserSession_RefreshAccessEnabled.getUserSession_RefreshAccessEnabled( httpServletRequest );

		// If no user session, skip rest.
		
		if ( ! ( userSession == null || userSession.getUserId() == null ) ) {
			//  Have User session object 

			if ( userSession.isActualUser() ) {
				//  have a logged in user
				boolean headerUserIsAdmin = false;
				if ( userSession.getUserAccessLevel() != null 
						&& userSession.getUserAccessLevel() == AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN ) {
					headerUserIsAdmin = true;
				}
				httpServletRequest.setAttribute( WebConstants.REQUEST_WEB_SESSION_HEADER_USER_IS_ADMIN, headerUserIsAdmin );

				UserInfoForPageHeader userInfoForPageHeader = new UserInfoForPageHeader();
				userInfoForPageHeader.setUsername( userSession.getUsername() );
				userInfoForPageHeader.setUser_displayFirstName( userSession.getFirstName() );
				userInfoForPageHeader.setUser_displayLastName( userSession.getLastName() );

				httpServletRequest.setAttribute( WebConstants.REQUEST_WEB_SESSION_HEADER_USER_INFO, userInfoForPageHeader );
			}
		}
		
        return "data_pages/error_pages/associatedProject_AccessNotAllowed_Page.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

	}
}
