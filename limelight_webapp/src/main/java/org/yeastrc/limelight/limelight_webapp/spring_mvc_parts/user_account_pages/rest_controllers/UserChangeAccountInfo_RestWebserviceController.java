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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.GetUserSessionActualUserLoggedIn_ForRestControllerIF;
import org.yeastrc.limelight.limelight_webapp.constants.FieldLengthConstants;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtChangePasswordRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtChangePasswordResponse;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtManageAccountRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtManageAccountResponse;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionBuilder;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionManager;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * 
 *
 */
@RestController
public class UserChangeAccountInfo_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( UserChangeAccountInfo_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private UserSessionManager userSessionManager;

	@Autowired
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;

	@Autowired
	private GetUserSessionActualUserLoggedIn_ForRestControllerIF getUserSessionActualUserLoggedIn_ForRestController;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	/**
	 * 
	 */
	public UserChangeAccountInfo_RestWebserviceController() {
		super();
		//		log.warn( "constructor no params called" );
	}

	//  Convert JSON to byte[] so can cache it

	//  These 2 annotations work the same

	@PostMapping( 
			path = { 
					AA_UserAccount_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_UserAccount_RestWSControllerPaths_Constants.USER_CHANGE_ACCOUNT_INFO_REST_WEBSERVICE_CONTROLLER
					+ AA_UserAccount_RestWSControllerPaths_Constants.PATH_PARAMETER_LABEL_WEBSERVICE_SYNC_TRACKING_PATH_ADDITION
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

	//	@RequestMapping( 
	//			path = AA_RestWSControllerPaths_Constants.,
	//			method = RequestMethod.POST,
	//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

	public @ResponseBody ResponseEntity<byte[]>  webserviceMethod(

			@PathVariable(value = AA_UserAccount_RestWSControllerPaths_Constants.PATH_PARAMETER_LABEL_WEBSERVICE_SYNC_TRACKING) 
			String webserviceSyncTracking,

			@RequestBody byte[] postBody,
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse
			) throws Exception {

		try {

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( webserviceSyncTracking );

			final String remoteIP = httpServletRequest.getRemoteAddr();

			WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class ); 

			WebserviceResult webserviceResult = webserviceMethodInternal( webserviceRequest, remoteIP, httpServletRequest );
			
			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
			throw e;
			
		} catch ( Exception e ) {
			String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
		}
	}
	
	/**
	 * @param webserviceRequest
	 * @param remoteIP
	 * @param httpServletRequest
	 * @return
	 * @throws Exception
	 */
	private WebserviceResult webserviceMethodInternal( WebserviceRequest webserviceRequest, String remoteIP, HttpServletRequest httpServletRequest ) throws Exception {
		
		//		log.warn( "webserviceMethod(...) called" );
		
		if ( webserviceRequest.firstName != null
				&& webserviceRequest.firstName.length() > FieldLengthConstants.FIRST_NAME_MAX_LENGTH ) {
			log.warn( " firstName too long: " + webserviceRequest.firstName );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		if ( webserviceRequest.lastName != null
				&& webserviceRequest.lastName.length() > FieldLengthConstants.LAST_NAME_MAX_LENGTH ) {
			log.warn( " lastName too long: " + webserviceRequest.lastName );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		if ( webserviceRequest.email != null
				&& webserviceRequest.email.length() > FieldLengthConstants.EMAIL_MAX_LENGTH ) {
			log.warn( " email too long: " + webserviceRequest.email );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		if ( webserviceRequest.organization != null
				&& webserviceRequest.organization.length() > FieldLengthConstants.ORGANIZATION_MAX_LENGTH ) {
			log.warn( " organization too long: " + webserviceRequest.organization );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		if ( webserviceRequest.username != null
				&& webserviceRequest.username.length() > FieldLengthConstants.USERNAME_MAX_LENGTH ) {
			log.warn( " username too long: " + webserviceRequest.username );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		if ( webserviceRequest.password != null
				&& webserviceRequest.password.length() > FieldLengthConstants.PASSWORD_MAX_LENGTH ) {
			log.warn( " password too long: length: " + webserviceRequest.username.length() );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		if ( webserviceRequest.oldPassword != null
				&& webserviceRequest.oldPassword.length() > FieldLengthConstants.PASSWORD_MAX_LENGTH ) {
			log.warn( " oldPassword too long: length: " + webserviceRequest.oldPassword.length() );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		UserSession userSession =
				getUserSessionActualUserLoggedIn_ForRestController.userSessionOfActualUserLoggedIn( httpServletRequest );

		WebserviceResult webserviceResult = new WebserviceResult();

		{
			//  Update 'main' values if in request
			
			boolean updateMainAcctData = false; 
			
			UserMgmtManageAccountRequest userMgmtManageAccountRequest = new UserMgmtManageAccountRequest();

			userMgmtManageAccountRequest.setSessionKey( userSession.getUserMgmtSessionKey() );
			
			UserSessionBuilder userSessionBuilderNewSession =
					UserSessionBuilder.getBuilder()
					.fromUserSession( userSession );
			
			if ( webserviceRequest.firstName != null ) {
				userMgmtManageAccountRequest.setFirstName( webserviceRequest.firstName );
				userSessionBuilderNewSession.setFirstName( webserviceRequest.firstName );
				updateMainAcctData = true;
			}
			if ( webserviceRequest.lastName != null ) {
				userMgmtManageAccountRequest.setLastName( webserviceRequest.lastName );
				userSessionBuilderNewSession.setLastName( webserviceRequest.lastName );
				updateMainAcctData = true;
			}
			if ( webserviceRequest.email != null ) {
				userMgmtManageAccountRequest.setEmail( webserviceRequest.email );
				updateMainAcctData = true;
			}
			if ( webserviceRequest.organization != null ) {
				userMgmtManageAccountRequest.setOrganization(webserviceRequest.organization );
				updateMainAcctData = true;
			}
			if ( updateMainAcctData ) {
				UserMgmtManageAccountResponse userMgmtManageAccountResponse =
						userMgmtCentralWebappWebserviceAccess.
						manageUserData( userMgmtManageAccountRequest );
				
				if ( ! userMgmtManageAccountResponse.isSuccess() ) {

					webserviceResult.setStatus(false);
					return webserviceResult; // EARLY RETURN
				}

				UserSession userSessionNew = userSessionBuilderNewSession.build();
						
				userSessionManager.setUserSession( userSessionNew, httpServletRequest );
			}
		}

		//  Update  zz_mirror
//		{
//			if ( webserviceRequest.firstName != null ) {
//				userMgmtManageAccountRequest.setFirstName( webserviceRequest.firstName );
//				updateMainAcctData = true;
//			}
//			if ( webserviceRequest.lastName != null ) {
//				userMgmtManageAccountRequest.setLastName( webserviceRequest.lastName );
//				updateMainAcctData = true;
//			}
//		}
		
		{
			//  Update username value if in request

			if ( webserviceRequest.username != null ) {

				UserMgmtManageAccountRequest userMgmtManageAccountRequest = new UserMgmtManageAccountRequest();

				userMgmtManageAccountRequest.setSessionKey( userSession.getUserMgmtSessionKey() );

				userMgmtManageAccountRequest.setUsername( webserviceRequest.username );
				
				UserMgmtManageAccountResponse userMgmtManageAccountResponse =
						userMgmtCentralWebappWebserviceAccess.
						manageUserData( userMgmtManageAccountRequest );
				
				if ( ! userMgmtManageAccountResponse.isSuccess() ) {
					
					webserviceResult.setStatus(false);
					if ( userMgmtManageAccountResponse.isDuplicateUsername() ) {
						webserviceResult.setUsernameValueAlreadyExists(true);
					}
					return webserviceResult; // EARLY RETURN
				}

				UserSession userSessionNew = 
						UserSessionBuilder.getBuilder()
						.fromUserSession( userSession )
						.setUsername( webserviceRequest.username )
						.build();

				userSessionManager.setUserSession( userSessionNew, httpServletRequest );
			}
		}

		//  Update User Session and zz_mirror
		
//		if ( webserviceRequest.username != null ) {
//			userMgmtManageAccountRequest.setFirstName( webserviceRequest.firstName );
//			updateMainAcctData = true;
//		}

		{
			if ( webserviceRequest.password != null && webserviceRequest.oldPassword != null ) {

				//  Update password value if in request
				UserMgmtChangePasswordRequest userMgmtChangePasswordRequest = new UserMgmtChangePasswordRequest();

				userMgmtChangePasswordRequest.setSessionKey( userSession.getUserMgmtSessionKey() );

				userMgmtChangePasswordRequest.setOldPassword( webserviceRequest.oldPassword );
				userMgmtChangePasswordRequest.setNewPassword( webserviceRequest.password );
				userMgmtChangePasswordRequest.setUserRemoteIP( httpServletRequest.getRemoteAddr() );

				UserMgmtChangePasswordResponse userMgmtChangePasswordResponse = 
						userMgmtCentralWebappWebserviceAccess.changePassword( userMgmtChangePasswordRequest );

				if ( ! userMgmtChangePasswordResponse.isSuccess() ) {
					webserviceResult.setStatus(false);
					//				if ( userMgmtChangePasswordResponse.isSessionKeyNotValid() ) {
					//					//  No User session 
					//					throw new WebApplicationException(
					//							Response.status( WebServiceErrorMessageConstants.NO_SESSION_STATUS_CODE )  //  Send HTTP code
					//							.entity( WebServiceErrorMessageConstants.NO_SESSION_TEXT ) // This string will be passed to the client
					//							.build()
					//							);
					//				}
					if ( userMgmtChangePasswordResponse.isOldPasswordNotValid() ) {
						webserviceResult.setStatus(false);
						webserviceResult.setOldPasswordInvalid(true);
						return webserviceResult; //  EARLY EXIT
					}
					throw new Limelight_WS_InternalServerError_Exception();
				}
			}
		}
		
		webserviceResult.setStatus(true);

		log.info( "User Account Update SUCCESSFUL!!! user id: " + userSession.getUserId() );

		//    				log.info( "webserviceResponse.isSuccess(): " + webserviceResponse.isSuccess() );
		//    				log.info( "webserviceResponse.isPasswordInvalid(): " + webserviceResponse.isPasswordInvalid() );
		//    				log.info( "webserviceResponse.isUserDisabled(): " + webserviceResponse.isUserDisabled() );
		//    				log.info( "webserviceResponse.isUsernameNotFound(): " + webserviceResponse.isUsernameNotFound() );
		//    				log.info( "webserviceResponse.getSessionKey(): " + webserviceResponse.getSessionKey() );
		//    				log.info( "webserviceResponse.getUserId(): " + webserviceResponse.getUserId() );
		//    				log.info( "webserviceResponse.getErrorMessage(): " + webserviceResponse.getErrorMessage() );


		return webserviceResult;
	}


	public static class WebserviceRequest {
		
		private String firstName;
		private String lastName;
		private String email;
		private String organization;
		private String username;
		private String password;
		private String oldPassword;
		
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
		public String getOldPassword() {
			return oldPassword;
		}
		public void setOldPassword(String oldPassword) {
			this.oldPassword = oldPassword;
		}

	}

	public static class WebserviceResult {

		private boolean status;
		private boolean emailValueAlreadyExists;
		private boolean usernameValueAlreadyExists;
		private boolean oldPasswordInvalid;
		
		public boolean isStatus() {
			return status;
		}
		public void setStatus(boolean status) {
			this.status = status;
		}
		public boolean isEmailValueAlreadyExists() {
			return emailValueAlreadyExists;
		}
		public void setEmailValueAlreadyExists(boolean emailValueAlreadyExists) {
			this.emailValueAlreadyExists = emailValueAlreadyExists;
		}
		public boolean isUsernameValueAlreadyExists() {
			return usernameValueAlreadyExists;
		}
		public void setUsernameValueAlreadyExists(boolean usernameValueAlreadyExists) {
			this.usernameValueAlreadyExists = usernameValueAlreadyExists;
		}
		public boolean isOldPasswordInvalid() {
			return oldPasswordInvalid;
		}
		public void setOldPasswordInvalid(boolean oldPasswordInvalid) {
			this.oldPasswordInvalid = oldPasswordInvalid;
		}

	}

}
