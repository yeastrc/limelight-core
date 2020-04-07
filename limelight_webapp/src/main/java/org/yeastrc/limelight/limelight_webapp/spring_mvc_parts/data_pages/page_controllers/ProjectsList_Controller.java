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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.yeastrc.limelight.limelight_webapp.access_control.common.AccessControl_GetUserSession_RefreshAccessEnabled_IF;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers.AA_UserAccount_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.PopulatePageHeaderDataIF;

@Controller
//@RequestMapping("/")
public class ProjectsList_Controller {

	private static final Logger log = LoggerFactory.getLogger( ProjectsList_Controller.class );

	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_PageControllerPaths_Constants.PROJECTS_LIST_PAGE_CONTROLLER;

	@Autowired
	private AccessControl_GetUserSession_RefreshAccessEnabled_IF accessControl_GetUserSession_RefreshAccessEnabled;

	@Autowired
	private PopulatePageHeaderDataIF populatePageHeaderData;

	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	
    /**
	 * 
	 */
	public ProjectsList_Controller() {
		super();
//		log.warn( "constructor no params called" );
	}

	/**
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( path = { 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH } )
	
    public String projectsList(
    		HttpServletRequest httpServletRequest ) {
		
//		log.warn( "projectsList(...) called" );
		try {
			UserSession userSession = accessControl_GetUserSession_RefreshAccessEnabled.getUserSession_RefreshAccessEnabled( httpServletRequest );

			if ( userSession == null || ( ! userSession.isActualUser() ) ) {
				return AA_UserAccount_PageControllerPaths_Constants.FORWARD_TO_LOGIN_PAGE_CONTROLLER;
			}

			populatePageHeaderData.populatePageHeaderData( null /* projectIds */, userSession, httpServletRequest );

			return "data_pages/other_data_pages/projectsList.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

		} catch ( Exception e ) {
			
			String msg = "Exception: ";
			log.error( msg, e );
			
			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
			
			throw new RuntimeException( e ); //  TODO forward to error page
		}
    }

}