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
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.yeastrc.limelight.limelight_webapp.access_control.common.AccessControl_GetUserSession_RefreshAccessEnabled_IF;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.searchers.User_IsAny_ProjectOwner_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtSessionKeyAliveResponse;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtSessionKeyAliveWebserviceRequest;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionManager;
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
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;

	@Autowired
	private UserSessionManager userSessionManager;
	
	@Autowired
	private UserDAO_IF userDAO;
	
	@Autowired
	private PopulatePageHeaderDataIF populatePageHeaderData;
	
	@Autowired
	private User_IsAny_ProjectOwner_SearcherIF user_IsAny_ProjectOwner_Searcher;

	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	
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
    		HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse ) {
		
//		log.warn( "controllerMethod(...) called" );
		
		UserSession userSession = null;
		
		try {
			userSession = accessControl_GetUserSession_RefreshAccessEnabled.getUserSession_RefreshAccessEnabled( httpServletRequest );

			if ( userSession == null || ( ! userSession.isActualUser() ) ) {
				return AA_UserAccount_PageControllerPaths_Constants.FORWARD_TO_LOGIN_PAGE_CONTROLLER; //  EARLY RETURN
			}
			
			//  Validate User Mgmt Session Key
			UserMgmtSessionKeyAliveWebserviceRequest userMgmtSessionKeyAliveRequest = new UserMgmtSessionKeyAliveWebserviceRequest();
			userMgmtSessionKeyAliveRequest.setSessionKey( userSession.getUserMgmtSessionKey() );
			UserMgmtSessionKeyAliveResponse userMgmtSessionKeyAliveResponse =
					userMgmtCentralWebappWebserviceAccess.sessionKeyAlive( userMgmtSessionKeyAliveRequest );
			if ( ! userMgmtSessionKeyAliveResponse.isSuccess() ) {
				if ( userMgmtSessionKeyAliveResponse.isSessionKeyNotValid() ) {

					//  No User session In User Mgmt
					
					//  Invalidate session
					userSessionManager.invalidateUserSession( httpServletRequest, httpServletResponse );
					
					// Forward to Login Page
					return AA_UserAccount_PageControllerPaths_Constants.FORWARD_TO_LOGIN_PAGE_CONTROLLER; //  EARLY RETURN
				}
			}

			populatePageHeaderData.populatePageHeaderData( null /* projectIds */, userSession, httpServletRequest );
			

			UserDTO userDTO = userDAO.getForId( userSession.getUserId() );
			if ( userDTO == null ) {
				String msg = "userDTO == null: userSession.getUserId(): " + userSession.getUserId();
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			
			
			LoggedInUser loggedInUser = new LoggedInUser();
			
			loggedInUser.firstName = userSession.getFirstName();
			loggedInUser.lastName = userSession.getLastName();
			loggedInUser.email = userSession.getEmail();
			loggedInUser.organization = userSession.getOrganization();
			loggedInUser.username = userSession.getUsername();
			loggedInUser.sendEmailOnImportFinish = userDTO.isSendEmailOnImportFinish();
			
			httpServletRequest.setAttribute( "loggedInUser", loggedInUser );
			
			boolean displaySendImportCompleteEmailMgmtBlock = false;
			boolean displaySubmitImportKeyMgmtBlock = false;
			
			if ( userSession.isGlobalAdminUser() || 
					( userSession.getUserAccessLevel() != null 
							&& userSession.getUserAccessLevel() <= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN ) ) {
				
				//  Global or local admin so set true
				displaySendImportCompleteEmailMgmtBlock = true;
				displaySubmitImportKeyMgmtBlock = true;
				
			} else {
				if ( user_IsAny_ProjectOwner_Searcher.getUser_IsAny_ProjectOwner( userSession.getUserId() ) ) {
					//  User is project owner on any project
					displaySendImportCompleteEmailMgmtBlock = true;
					displaySubmitImportKeyMgmtBlock = true;
				}
			}

			if ( displaySendImportCompleteEmailMgmtBlock ) {
				
				httpServletRequest.setAttribute( "displaySendImportCompleteEmailMgmtBlock", displaySendImportCompleteEmailMgmtBlock );
			}
			
			if ( displaySubmitImportKeyMgmtBlock ) {
				
				httpServletRequest.setAttribute( "displaySubmitImportKeyMgmtBlock", displaySubmitImportKeyMgmtBlock );
			}
			

			return "user_account_pages_and_parts/pages/userAccountManagement.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

		} catch ( Exception e ) {
			
			String userInfo = "user session object is null or not retrieved yet.";
			
			if ( userSession != null ) {
				userInfo = "UserId: " + userSession.getUserId() + ", username: " + userSession.getUsername();
			}
			
			String msg = "userInfo: " + userInfo + ", Exception: ";
			log.error( msg, e );

			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
		
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
		private boolean sendEmailOnImportFinish;
		
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
		public boolean isSendEmailOnImportFinish() {
			return sendEmailOnImportFinish;
		}
		public void setSendEmailOnImportFinish(boolean sendEmailOnImportFinish) {
			this.sendEmailOnImportFinish = sendEmailOnImportFinish;
		}
		
	}

}