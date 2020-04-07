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
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_invite.ValidateUserInviteTrackingCodeIF;
import org.yeastrc.limelight.limelight_webapp.user_invite.ValidateUserInviteTrackingCode.ValidateUserInviteTrackingCodeResult;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataResponse;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtLoginRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtLoginResponse;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionBuilder;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionManager;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;

/**
 * 
 *
 */
@RestController
public class UserLogin_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( UserLogin_RestWebserviceController.class );

	@Autowired
	private UserDAO_IF userDAO;

	@Autowired
	private UserSessionManager userSessionManager;

	@Autowired
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;

	@Autowired
	private ValidateUserInviteTrackingCodeIF validateUserInviteTrackingCode;

	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	/**
	 * 
	 */
	public UserLogin_RestWebserviceController() {
		super();
		//		log.warn( "constructor no params called" );
	}

	//  Convert JSON to byte[] so can cache it

	//  These 2 annotations work the same

	@PostMapping( 
			path = { 
					AA_UserAccount_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_UserAccount_RestWSControllerPaths_Constants.USER_LOGIN_REST_WEBSERVICE_CONTROLLER
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
			final String remoteIP = httpServletRequest.getRemoteAddr();

			UserLoginRequest userLoginRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, UserLoginRequest.class ); 

			UserLoginResult userLoginResult = userLogin( userLoginRequest, remoteIP, httpServletRequest );
			
			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( userLoginResult );

			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
			throw e;
			
		} catch ( Exception e ) {
			String msg = "Failed in controller: ";
			log.error( msg, e );

			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
			
			throw new Limelight_WS_InternalServerError_Exception();
		}
	}
	
	/**
	 * @param userLoginRequest
	 * @param remoteIP
	 * @param httpServletRequest
	 * @return
	 * @throws Exception
	 */
	private UserLoginResult userLogin( UserLoginRequest userLoginRequest, String remoteIP, HttpServletRequest httpServletRequest ) throws Exception {
		
		//		log.warn( "userLogin(...) called" );
		
		if ( StringUtils.isEmpty( userLoginRequest.getUsername() ) ) {
			log.warn( "No Username" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		if ( StringUtils.isEmpty( userLoginRequest.getPassword() ) ) {
			log.warn( "No Password" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		UserLoginResult userLoginResult = new UserLoginResult();

		UserMgmtLoginRequest userMgmtLoginRequest = new UserMgmtLoginRequest();
		userMgmtLoginRequest.setUsername( userLoginRequest.getUsername() );
		userMgmtLoginRequest.setPassword( userLoginRequest.getPassword() );
		userMgmtLoginRequest.setRemoteIP( remoteIP );

		UserMgmtLoginResponse userMgmtLoginResponse =
				userMgmtCentralWebappWebserviceAccess.userLogin( userMgmtLoginRequest );

		if ( ! userMgmtLoginResponse.isSuccess() ) {
			log.info( "Logging into web app FAILED!!!" );
			

			if ( userMgmtLoginResponse.isUsernameNotFound() || userMgmtLoginResponse.isPasswordInvalid() ) {
				
				userLoginResult.invalidUserOrPassword = true;
				
				return userLoginResult;  //  Early Exit
				
			} else if ( userMgmtLoginResponse.isUserDisabled() ) {
				
				userLoginResult.disabledUser = true;
				
				return userLoginResult;  //  Early Exit
			}
		}

		// userMgmtLoginResponse.isSuccess() is true
		//  Marked as logged in in User Mgmt Web app even if don't accept TOS
		int userMgmtUserId = userMgmtLoginResponse.getUserId();
		//  Get full user data
		UserMgmtGetUserDataRequest userMgmtGetUserDataRequest = new UserMgmtGetUserDataRequest();
		userMgmtGetUserDataRequest.setSessionKey( userMgmtLoginResponse.getSessionKey() );
		userMgmtGetUserDataRequest.setUserId( userMgmtUserId );
		UserMgmtGetUserDataResponse userMgmtGetUserDataResponse = 
				userMgmtCentralWebappWebserviceAccess.getUserData( userMgmtGetUserDataRequest );

		if ( ! userMgmtGetUserDataResponse.isSuccess() ) {
			String msg = "Failed to get Full user data from User Mgmt Webapp for user id: " + userMgmtUserId;
			log.error( msg );
			userLoginResult.setInvalidUserOrPassword(true); //  TODO Set different error

			return userLoginResult;  //  Early Exit
		}

		//  Get This App User id and put in session
		
		UserDTO userDTO = null;

		Integer thisAppUserId = userDAO.getIdForUserMgmtUserId( userMgmtLoginResponse.getUserId() );

		if ( thisAppUserId == null ) {

			// No account in limelight for this user id.
			
			// Create an account if pass all checks
			
			userDTO = new UserDTO();
			userDTO.setUserMgmtUserId( userMgmtUserId );
			userDTO.setEnabledAppSpecific( true );
			
			if ( userMgmtGetUserDataResponse.isGlobalAdminUser() ) {
				//  User is marked Global Admin User so create account with full admin rights
				userDTO.setUserAccessLevel( AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN );
			} else {
				//  User is not Global Admin User 
				//  Only create account if user signup without invite is allowed
				//  or has valid invite code
				//  Check config for if invite is required
				//					String userSignupAllowWithoutInviteConfigValue =
				//							ConfigSystemCaching.getInstance()
				//							.getConfigValueForConfigKey( ConfigSystemsKeysConstants.USER_SIGNUP_ALLOW_WITHOUT_INVITE_KEY );
				//					if ( ! UserSignupConstants.USER_SIGNUP_ALLOW_WITHOUT_INVITE_KEY__TRUE.equals( userSignupAllowWithoutInviteConfigValue ) ) {
				//  Invite required 
				if ( StringUtils.isEmpty( userLoginRequest.inviteTrackingCode ) ) {
					//  Invite required so don't create account
					userLoginResult.setNoLocalAccount(true);
					return userLoginResult;  //  Early Exit
				}
				// Validate Invite code
				ValidateUserInviteTrackingCodeResult validateUserInviteTrackingCodeResult = 
						validateUserInviteTrackingCode.validateUserInviteTrackingCode( userLoginRequest.inviteTrackingCode );

				if ( ! validateUserInviteTrackingCodeResult.isCodeIsValid() ) {
					userLoginResult.setInvalidInviteTrackingCode(true);
					return userLoginResult;  //  Early Exit
				}
				//					}
				userDTO.setUserAccessLevel( AuthAccessLevelConstants.ACCESS_LEVEL_CREATE_NEW_PROJECT_AKA_USER );
			}

			userDAO.save( userDTO );
			
			thisAppUserId = userDTO.getId();

		} else {

			userDTO = userDAO.getForId( thisAppUserId );

			if ( userDTO == null ) {

				userLoginResult.noLocalAccount = true;
				return userLoginResult;  //  Early Exit

			}

			if ( ! userDTO.isEnabledAppSpecific() ) {

				userLoginResult.disabledUser = true;
				return userLoginResult;  //  Early Exit

			}

			//						UserMgmtGetUserDataRequest userMgmtGetUserDataRequest = new UserMgmtGetUserDataRequest();
			//						userMgmtGetUserDataRequest.setUserId( userMgmtLoginResponse.getUserId() );
			//						userMgmtGetUserDataRequest.setSessionKey( userMgmtLoginResponse.getSessionKey() );
			//
			//						UserMgmtGetUserDataResponse userMgmtGetUserDataResponse =
			//								userMgmtCentralWebappWebserviceAccess.getUserData( userMgmtGetUserDataRequest );

		}

		UserSession userSession = 
				UserSessionBuilder.getBuilder()
				.fromUserDTO( userDTO )
				.fromGetUserDataForIdAccountWebserviceResponse( userMgmtGetUserDataResponse )
				.setUserMgmtSessionKey( userMgmtLoginResponse.getSessionKey() )
				.build();
		
		userSessionManager.setUserSession( userSession, httpServletRequest );

		userDAO.updateLastLogin( thisAppUserId, remoteIP );
		userLoginResult.setSuccess( true );
		log.info( "Logging into web app SUCCESSFUL!!! username: " + userLoginRequest.getUsername() );

		//    				log.info( "webserviceResponse.isSuccess(): " + webserviceResponse.isSuccess() );
		//    				log.info( "webserviceResponse.isPasswordInvalid(): " + webserviceResponse.isPasswordInvalid() );
		//    				log.info( "webserviceResponse.isUserDisabled(): " + webserviceResponse.isUserDisabled() );
		//    				log.info( "webserviceResponse.isUsernameNotFound(): " + webserviceResponse.isUsernameNotFound() );
		//    				log.info( "webserviceResponse.getSessionKey(): " + webserviceResponse.getSessionKey() );
		//    				log.info( "webserviceResponse.getUserId(): " + webserviceResponse.getUserId() );
		//    				log.info( "webserviceResponse.getErrorMessage(): " + webserviceResponse.getErrorMessage() );


		return userLoginResult;
	}


	public static class UserLoginRequest {
		private String username;
		private String password;
		private String inviteTrackingCode;

		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getInviteTrackingCode() {
			return inviteTrackingCode;
		}
		public void setInviteTrackingCode(String inviteTrackingCode) {
			this.inviteTrackingCode = inviteTrackingCode;
		}

	}

	public static class UserLoginResult {

		private boolean success;
		private boolean invalidUserOrPassword = false;
		private boolean disabledUser = false;
		/**
		 * No Account in This System and not auto create account since invite required
		 */
		private boolean noLocalAccount = false;
		private boolean invalidInviteTrackingCode;
		
		public boolean isSuccess() {
			return success;
		}

		public void setSuccess(boolean success) {
			this.success = success;
		}

		public boolean isInvalidUserOrPassword() {
			return invalidUserOrPassword;
		}

		public void setInvalidUserOrPassword(boolean invalidUserOrPassword) {
			this.invalidUserOrPassword = invalidUserOrPassword;
		}

		public boolean isDisabledUser() {
			return disabledUser;
		}

		public void setDisabledUser(boolean disabledUser) {
			this.disabledUser = disabledUser;
		}

		public boolean isNoLocalAccount() {
			return noLocalAccount;
		}

		public void setNoLocalAccount(boolean noLocalAccount) {
			this.noLocalAccount = noLocalAccount;
		}

		public boolean isInvalidInviteTrackingCode() {
			return invalidInviteTrackingCode;
		}

		public void setInvalidInviteTrackingCode(boolean invalidInviteTrackingCode) {
			this.invalidInviteTrackingCode = invalidInviteTrackingCode;
		}

	}

}
