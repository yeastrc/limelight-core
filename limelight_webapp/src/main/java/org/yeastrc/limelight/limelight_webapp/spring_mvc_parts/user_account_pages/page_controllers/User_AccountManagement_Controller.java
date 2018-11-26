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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.yeastrc.limelight.limelight_webapp.access_control.common.AccessControl_GetUserSession_RefreshAccessEnabled_IF;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.dao.FileImportSubmitImportProgramKeyPerUserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.User_IsAny_ProjectOwner_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.PopulatePageHeaderDataIF;

@Controller
//@RequestMapping("/")
public class User_AccountManagement_Controller {

	private static final Logger log = LoggerFactory.getLogger( User_AccountManagement_Controller.class );

	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_UserAccount_PageControllerPaths_Constants.USER_ACCOUNT_MANAGEMENT_PAGE_CONTROLLER;

	@Autowired
	private AccessControl_GetUserSession_RefreshAccessEnabled_IF accessControl_GetUserSession_RefreshAccessEnabled;

	@Autowired
	private PopulatePageHeaderDataIF populatePageHeaderData;
	
	@Autowired
	private User_IsAny_ProjectOwner_SearcherIF user_IsAny_ProjectOwner_Searcher;
	
	@Autowired
	private FileImportSubmitImportProgramKeyPerUserDAO_IF fileImportSubmitImportProgramKeyPerUserDAO;
	
    /**
	 * 
	 */
	public User_AccountManagement_Controller() {
		super();
//		log.warn( "constructor no params called" );
	}

	/**
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( 
			path = { 
					AA_UserAccount_PageControllerPaths_Constants.PATH_START_ALL
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

			populatePageHeaderData.populatePageHeaderData( null /* projectIds */, userSession, httpServletRequest );
			
			LoggedInUser loggedInUser = new LoggedInUser();
			
			loggedInUser.firstName = userSession.getFirstName();
			loggedInUser.lastName = userSession.getLastName();
			loggedInUser.email = userSession.getEmail();
			loggedInUser.organization = userSession.getOrganization();
			loggedInUser.username = userSession.getUsername();
			
			httpServletRequest.setAttribute( "loggedInUser", loggedInUser );
			
			boolean displaySubmitImportKeyMgmtBlock = false;
			
			if ( userSession.isGlobalAdminUser() || 
					( userSession.getUserAccessLevel() != null 
							&& userSession.getUserAccessLevel() <= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN ) ) {
				
				//  Global or local admin so set true
				displaySubmitImportKeyMgmtBlock = true;
			} else {
				if ( user_IsAny_ProjectOwner_Searcher.getUser_IsAny_ProjectOwner( userSession.getUserId() ) ) {
					//  User is project owner on any project
					displaySubmitImportKeyMgmtBlock = true;
				}
			}
			
			if ( displaySubmitImportKeyMgmtBlock ) {
				
				httpServletRequest.setAttribute( "displaySubmitImportKeyMgmtBlock", displaySubmitImportKeyMgmtBlock );
			}
			

			return "user_account_pages_and_parts/pages/userAccountManagement.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

		} catch ( Exception e ) {
			
			String msg = "Exception: ";
			log.error( msg, e );
			
			throw new RuntimeException( e ); //  TODO forward to error page
		}
    }
	
	/**
	 * 
	 *
	 */
	public static class LoggedInUser {
		
		private String firstName;
		private String lastName;
		private String email;
		private String organization;
		private String username;
		
		public String getFirstName() {
			return firstName;
		}
		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}
		public String getLastName() {
			return lastName;
		}
		public void setLastName(String lastName) {
			this.lastName = lastName;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getOrganization() {
			return organization;
		}
		public void setOrganization(String organization) {
			this.organization = organization;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		
	}

}