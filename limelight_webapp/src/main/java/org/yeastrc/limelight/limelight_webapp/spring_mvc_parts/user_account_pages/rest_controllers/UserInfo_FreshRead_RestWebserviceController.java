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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.rest_controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataResponse;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionManager;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;

/**
 * Get User Info with Fresh read of User Mgmt
 *
 */
@RestController
public class UserInfo_FreshRead_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( UserInfo_FreshRead_RestWebserviceController.class );

	@Autowired
	private UserSessionManager userSessionManager;

	@Autowired
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;
	
	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	
	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	/**
	 * 
	 */
	public UserInfo_FreshRead_RestWebserviceController() {
		super();
		//		log.warn( "constructor no params called" );
	}

	//  Convert JSON to byte[] so can cache it

	//  These 2 annotations work the same

	@PostMapping( 
			path = { 
					AA_UserAccount_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_UserAccount_RestWSControllerPaths_Constants.USER_INFO_FRESH_READ_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

	//	@RequestMapping( 
	//			path = AA_RestWSControllerPaths_Constants.,
	//			method = RequestMethod.POST,
	//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

	public @ResponseBody ResponseEntity<byte[]>  webserviceMethod(
    		
			@RequestBody byte[] postBody,
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse
			) throws Exception {

		try {
			//		log.warn( "userInfo(...) called" );

			UserInfoResult userInfoResult = new UserInfoResult();

			UserInfoRequest userInfoRequest = unmarshalJSON_ToObject.getObjectFromJSONByteArray( postBody, UserInfoRequest.class ); 

			UserSession userSession = userSessionManager.getUserSession( httpServletRequest );

			if ( userSession != null && userSession.isActualUser() && userSession.isEnabled() && userSession.getUserMgmtUserId() != null ) {

				UserMgmtGetUserDataRequest userMgmtGetUserDataRequest = new UserMgmtGetUserDataRequest();
				// TODO Session Key check currently Disabled in web service 
//				userMgmtGetUserDataRequest.setSessionKey( userMgmtLoginResponse.getSessionKey() );
				userMgmtGetUserDataRequest.setUserId( userSession.getUserMgmtUserId() );
				
				UserMgmtGetUserDataResponse userMgmtGetUserDataResponse = 
						userMgmtCentralWebappWebserviceAccess.getUserData( userMgmtGetUserDataRequest );

				if ( ! userMgmtGetUserDataResponse.isSuccess() ) {
					
					if ( userMgmtGetUserDataResponse.isSessionKeyNotValid() ) {
						
						//  No User session In User Mgmt
						
						//  Invalidate session
						userSessionManager.invalidateUserSession( httpServletRequest, httpServletResponse );
						
						//  Return HTTP status so JS reloads page and user logs back in, creating new session in User Mgmt
						throw new Limelight_WS_AuthError_Unauthorized_Exception();
					}
					
				} else {

					if ( ! userMgmtGetUserDataResponse.isEnabled() ) {
						
						// Skip user since not enabled in User Mgmt
						//					String msg = "User is not enabled in User Mgmt Webapp for UserId: " + userListForProjectIdSearcherItem.getUserId()
						//							+ ", userMgmtUserId: " + userListForProjectIdSearcherItem.getUserMgmtUserId();
						//					log.warn( msg );

					} else {

						userInfoResult.success = true;
						userInfoResult.username = userMgmtGetUserDataResponse.getUsername();
						userInfoResult.email = userMgmtGetUserDataResponse.getEmail();
						userInfoResult.firstName = userMgmtGetUserDataResponse.getFirstName();
						userInfoResult.lastName = userMgmtGetUserDataResponse.getLastName();
						userInfoResult.organization = userMgmtGetUserDataResponse.getOrganization();
					}
				}
			}


			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( userInfoResult );

			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

		} catch ( Exception e ) {
			String msg = "Failed in controller: ";
			log.error( msg, e );

			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
		
			throw e;
		}
	}


	public static class UserInfoRequest {

	}

	public static class UserInfoResult {

		private boolean success;
		
		private String username;
		private String email;
		private String firstName;
		private String lastName;
		private String organization;

		public boolean isSuccess() {
			return success;
		}

		public void setSuccess(boolean success) {
			this.success = success;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

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

		public String getOrganization() {
			return organization;
		}

		public void setOrganization(String organization) {
			this.organization = organization;
		}

	}

}
