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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.webapp_admin_pages.page_controllers;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.yeastrc.limelight.limelight_webapp.access_control.common.AccessControl_GetUserSession_RefreshAccessEnabled_IF;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightPageAcceessErrorException;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers.AA_UserAccount_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.PopulatePageHeaderDataIF;

/**
 * Admin Manage Terms of Service - Page Controller
 *
 */
@Controller
public class AdminManageTermsOfService_Controller {

	private static final Logger log = LoggerFactory.getLogger( AdminManageTermsOfService_Controller.class );

	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_WebappAdmin_PageControllerPaths_Constants.ADMIN_MANAGE_TERMS_OF_SERVICE_PAGE_CONTROLLER;

	@Autowired
	private AccessControl_GetUserSession_RefreshAccessEnabled_IF accessControl_GetUserSession_RefreshAccessEnabled;

	@Autowired
	private PopulatePageHeaderDataIF populatePageHeaderData;
	
	/**
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( 
			path = { 
					AA_WebappAdmin_PageControllerPaths_Constants.PATH_START_ALL
					+ PRIMARY_CONTROLLER_PATH
			} )

    public String controllerMethod(
    		HttpServletRequest httpServletRequest ) {
		
//		log.warn( "controllerMethod(...) called" );
		try {
			UserSession userSession = accessControl_GetUserSession_RefreshAccessEnabled.getUserSession_RefreshAccessEnabled( httpServletRequest );

			if ( userSession == null || ( ! userSession.isActualUser() ) ) {
				return AA_UserAccount_PageControllerPaths_Constants.FORWARD_TO_LOGIN_PAGE_CONTROLLER;
			}

			if ( userSession.isGlobalAdminUser() || 
					( userSession.getUserAccessLevel() != null 
							&& userSession.getUserAccessLevel() <= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN ) ) {
				
			} else {
				//  Only admin user authorized to access this page
				
				throw new LimelightPageAcceessErrorException("User does not have access, should not have had the link.");
			}
			
			Integer loggedInUserId = userSession.getUserId();
			
			httpServletRequest.setAttribute( "loggedInUserId", loggedInUserId );

			populatePageHeaderData.populatePageHeaderData( null /* projectIds */, userSession, httpServletRequest );

			return "webapp_administration_pages_and_parts/pages/webappAdminManageTermsOfService.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

		} catch ( Exception e ) {
			
			String msg = "Exception: ";
			log.error( msg, e );
			
			throw new RuntimeException( e ); //  TODO forward to error page
		}
	}
}
