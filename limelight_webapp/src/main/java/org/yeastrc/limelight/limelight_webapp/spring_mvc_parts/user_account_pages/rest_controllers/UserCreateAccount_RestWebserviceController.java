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
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.GetUserSessionActualUserLoggedIn_ForRestControllerIF;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.constants.FieldLengthConstants;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.AddNewUserUsingDBTransactionServiceIF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectUserDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserInviteTrackingDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.ZzUserDataMirrorDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.user_invite.ValidateUserInviteTrackingCodeIF;
import org.yeastrc.limelight.limelight_webapp.user_invite.ValidateUserInviteTrackingCode.ValidateUserInviteTrackingCodeResult;
import org.yeastrc.limelight.limelight_webapp.user_invite.ValidateUserInviteTrackingCode.ValidateUserInviteTrackingCodeResult_NotValidReason;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCreateAccountRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCreateAccountResponse;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtLoginRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtLoginResponse;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionBuilder;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionManager;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;

/**
 * 
 *
 */
@RestController
public class UserCreateAccount_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( UserCreateAccount_RestWebserviceController.class );

	private static enum CreateAccountUsingAdminUserAccount { YES, NO }

	/**
	 * Used when create account Performed By Admin User
	 */
	@Autowired
	private GetUserSessionActualUserLoggedIn_ForRestControllerIF getUserSessionActualUserLoggedIn_ForRestController;

	@Autowired
	private UserSessionManager userSessionManager;
	
	@Autowired
	private AddNewUserUsingDBTransactionServiceIF addNewUserUsingDBTransactionService;

	@Autowired
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;

	@Autowired
	private ValidateUserInviteTrackingCodeIF validateUserInviteTrackingCode;

	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	
	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	/**
	 * 
	 */
	public UserCreateAccount_RestWebserviceController() {
		super();
		//		log.warn( "constructor no params called" );
	}


	/**
	 * Create Account - WITH Invite
	 * 
	 * 
	 * 
	 * @param postBody
	 * @param httpServletRequest
	 * @param httpServletResponse
	 * @return
	 * @throws Exception
	 */
	@PostMapping( 
			path = { 
					AA_UserAccount_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_UserAccount_RestWSControllerPaths_Constants.USER_CREATE_ACCOUNT_FROM_INVITE_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

	public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_CreateAccount_With_Invite(

			@RequestBody byte[] postBody,
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse
			) throws Exception {

		try {
			final String remoteIP = httpServletRequest.getRemoteAddr();

			CreateAccountRequest createAccountRequest = unmarshalJSON_ToObject.getObjectFromJSONByteArray( postBody, CreateAccountRequest.class ); 

			CreateAccountResult createAccountResult = createAccount_With_Invite_Internal( createAccountRequest, remoteIP, httpServletRequest );
			
			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( createAccountResult );

			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
			throw e;

		} catch ( Exception e ) {
			String msg = "Failed in controller: ";
			log.error( msg, e );

			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
			
			throw e;
		}
	}
	
	/**
	 * @param createAccountRequest
	 * @param remoteIP
	 * @param httpServletRequest
	 * @return
	 * @throws Exception
	 */
	private CreateAccountResult createAccount_With_Invite_Internal( 
			CreateAccountRequest createAccountRequest, String remoteIP, HttpServletRequest httpServletRequest ) throws Exception {

		if ( StringUtils.isEmpty( createAccountRequest.inviteTrackingCode ) ) {
			log.warn( "Create Account from Invite:  inviteTrackingCode empty" );

			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		if ( StringUtils.isNotEmpty( createAccountRequest.accessLevel ) ) {
			log.warn( "Create Account from Invite:  accessLevel not empty which is not allowed" );

			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		
		return createAccountCommonInternal( 
				createAccountRequest, 
				null /* accessLevel */, 
				null /* recaptchaValue */, 
				CreateAccountUsingAdminUserAccount.NO,
				httpServletRequest );
	}
	
	//////////////////////////////////////////////
	//////////////////////////////////////////////
	//////////////////////////////////////////////
	
	
	

	/**
	 * Create Account - Performed By - ADMIN User
	 * 
	 * 
	 * 
	 * @param postBody
	 * @param httpServletRequest
	 * @param httpServletResponse
	 * @return
	 * @throws Exception
	 */
	@PostMapping( 
			path = { 
					AA_UserAccount_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_UserAccount_RestWSControllerPaths_Constants.USER_CREATE_ACCOUNT_PERFROMED_BY_ADMIN_USER_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

	public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_CreateAccount_PerformedBy_AdminUser(

			@RequestBody byte[] postBody,
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse
			) throws Exception {

		try {
			UserSession userSession =
					getUserSessionActualUserLoggedIn_ForRestController.userSessionOfActualUserLoggedIn( httpServletRequest );

			if ( userSession.isGlobalAdminUser() || 
					( userSession.getUserAccessLevel() != null 
							&& userSession.getUserAccessLevel() <= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN ) ) {
				
			} else {
				//  Only admin user authorized to access this page
				
				throw new Limelight_WS_AuthError_Forbidden_Exception();
			}
			
			final String remoteIP = httpServletRequest.getRemoteAddr();

			CreateAccountRequest createAccountRequest = unmarshalJSON_ToObject.getObjectFromJSONByteArray( postBody, CreateAccountRequest.class );

			if ( StringUtils.isNotEmpty( createAccountRequest.inviteTrackingCode ) ) {
				log.warn( "Create Account Performed By Admin User:  inviteTrackingCode not empty which is not allowed" );

				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			if ( StringUtils.isEmpty( createAccountRequest.accessLevel ) ) {
				log.warn( "Create Account Performed By Admin User:  accessLevel empty which is not allowed" );

				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			Integer accessLevel = null;
			try {
				accessLevel = Integer.parseInt( createAccountRequest.accessLevel );
			} catch ( Exception e ) {
				log.warn( "Create Account Performed By Admin User:  accessLevel not an integer: " + createAccountRequest.accessLevel );

				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}			

			CreateAccountResult createAccountResult = 
					createAccountCommonInternal( 
							createAccountRequest, 
							accessLevel, 
							null /* recaptchaValue */, 
							CreateAccountUsingAdminUserAccount.YES,
							httpServletRequest );
			
			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( createAccountResult );

			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
			throw e;

		} catch ( Exception e ) {
			String msg = "Failed in controller: ";
			log.error( msg, e );
			throw e;
		}
	}
	
	//////////////////////////////////////////////
	//////////////////////////////////////////////
	//////////////////////////////////////////////
	
	/**
	 * Common create account code
	 * 
	 * @param createAccountRequest
	 * @param accessLevel
	 * @param recaptchaValue
	 * @param createAccountUsingAdminUserAccount
	 * @param request
	 * @return
	 */
	private CreateAccountResult createAccountCommonInternal(
			CreateAccountRequest createAccountRequest,
			Integer accessLevel,
			String recaptchaValue,  //  Only for without invite code
			CreateAccountUsingAdminUserAccount createAccountUsingAdminUserAccount,
			HttpServletRequest httpServletRequest )
	{

		CreateAccountResult createAccountResult = new CreateAccountResult();
		if ( StringUtils.isEmpty( createAccountRequest.firstName ) ) {
			log.warn( "AccountMaintService:  firstName empty" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception(); //  Early Exit with Data Exception
		}
		if ( StringUtils.isEmpty( createAccountRequest.lastName ) ) {
			log.warn( "AccountMaintService:  lastName empty" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();  //  Early Exit with Data Exception
		}
		if ( StringUtils.isEmpty( createAccountRequest.organization ) ) {
			log.warn( "AccountMaintService:  organization empty" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();  //  Early Exit with Data Exception
		}
		if ( StringUtils.isEmpty( createAccountRequest.email ) ) {
			log.warn( "AccountMaintService:  email empty" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();  //  Early Exit with Data Exception
		}
		if ( StringUtils.isEmpty( createAccountRequest.username ) ) {
			log.warn( "AccountMaintService:  username empty" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();  //  Early Exit with Data Exception
		}
		if ( StringUtils.isEmpty( createAccountRequest.password ) ) {
			log.warn( "AccountMaintService:  password empty" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();  //  Early Exit with Data Exception
		}
		////////////
		if ( createAccountRequest.firstName.length() > FieldLengthConstants.FIRST_NAME_MAX_LENGTH ) {
			log.warn( "AccountMaintService:  firstName too long: " + createAccountRequest.firstName );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();  //  Early Exit with Data Exception
		}
		if ( createAccountRequest.lastName.length() > FieldLengthConstants.LAST_NAME_MAX_LENGTH ) {
			log.warn( "AccountMaintService:  lastName too long: " + createAccountRequest.lastName );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();  //  Early Exit with Data Exception
		}
		if ( createAccountRequest.organization.length() > FieldLengthConstants.ORGANIZATION_MAX_LENGTH ) {
			log.warn( "AccountMaintService:  organization too long: " + createAccountRequest.organization );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();  //  Early Exit with Data Exception
		}
		if ( createAccountRequest.email.length() > FieldLengthConstants.EMAIL_MAX_LENGTH ) {
			log.warn( "AccountMaintService:  email too long: " + createAccountRequest.email );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();  //  Early Exit with Data Exception
		}
		if ( createAccountRequest.username.length() > FieldLengthConstants.USERNAME_MAX_LENGTH ) {
			log.warn( "AccountMaintService:  username too long: " + createAccountRequest.username );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();  //  Early Exit with Data Exception
		}
		if ( createAccountRequest.password.length() > FieldLengthConstants.PASSWORD_MAX_LENGTH ) {
			log.warn( "AccountMaintService:  password too long: " + createAccountRequest.password );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();  //  Early Exit with Data Exception
		}
		//  Pre-check for username and email already exist
		{
//			AuthUserDAO authUserDAO = AuthUserDAO.getInstance();
//			AuthUserDTO authUserDTOFromEmail = authUserDAO.getAuthUserDTOForEmail( email );
//			if ( authUserDTOFromEmail != null ) {
//				createAccountResult.setStatus(false);
//				createAccountResult.setDuplicateEmail(true);
//				return createAccountResult;  //  !!!!!  EARLY EXIT
//			}
//			AuthUserDTO authUserDTOFromUsername = authUserDAO.getAuthUserDTOForUsername( username );
//			if ( authUserDTOFromUsername != null ) {
//				createAccountResult.setStatus(false);
//				createAccountResult.setDuplicateUsername(true);
//				return createAccountResult;  //  !!!!!  EARLY EXIT
//			}
		}

		// TODO  Google Captcha Check

//		try {
//			if( StringUtils.isNotEmpty( recaptchaValue ) ) {
//				createAccountResult.setUserTestValidated( true );
//				if ( ! CaptchaGoogleValidateUserResponseToken.getInstance().isCaptchaUserResponseTokenValid( recaptchaValue, request.getRemoteHost() ) ) {
//					String errorMessage = "captcha validation failed";
//					createAccountResult.setStatus(false);
//					createAccountResult.setErrorMessage( errorMessage );
//					return createAccountResult;  //  !!!!!  EARLY EXIT
//				}
//			}
//
//		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
//			throw e;
//		} catch ( Exception e ) {
//			String msg = "createAccountCommonInternal(...) Exception caught: " + e.toString();
//			log.error( msg, e );
//			throw new Limelight_WS_InternalServerError_Exception();
//		}

		try {

			UserInviteTrackingDTO userInviteTrackingDTO = null;

//			Integer termsOfServiceVersionIdForIdString = null;

			//  Is terms of service enabled?
//			String termsOfServiceEnabledString =
//					ConfigSystemCaching.getInstance()
//					.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.TERMS_OF_SERVICE_ENABLED );
//			boolean termsOfServiceEnabled = false;
//			if ( ConfigSystemsValuesSharedConstants.TRUE.equals(termsOfServiceEnabledString) ) {
//				termsOfServiceEnabled = true;
//			}

			if ( createAccountUsingAdminUserAccount == CreateAccountUsingAdminUserAccount.NO ) {

				if ( StringUtils.isNotEmpty( createAccountRequest.inviteTrackingCode ) ) {
					
					ValidateUserInviteTrackingCodeResult validateUserInviteTrackingCodeResult = 
							validateUserInviteTrackingCode.validateUserInviteTrackingCode( createAccountRequest.inviteTrackingCode );

					if ( ! validateUserInviteTrackingCodeResult.isCodeIsValid() ) {
						log.warn( "Validation code is invalid.  validateUserInviteTrackingCodeResult:" + validateUserInviteTrackingCodeResult );
						ValidateUserInviteTrackingCodeResult_NotValidReason inviteTrackingCodeNotValidReason = validateUserInviteTrackingCodeResult.getNotValidReason();
						createAccountResult.setStatus(false);
						createAccountResult.setInviteTrackingCodeNotValidReason( inviteTrackingCodeNotValidReason );
						return createAccountResult;   //  EARLY EXIT
					}

					userInviteTrackingDTO = validateUserInviteTrackingCodeResult.getUserInviteTrackingDTO();
				}

//				if ( termsOfServiceEnabled ) {
//					// terms of service is enabled
//					//  Version of TOS user accepted
//					termsOfServiceVersionIdForIdString =
//							TermsOfServiceTextVersionsDAO.getInstance().getVersionIdForIdString( tosAcceptedKey );
//					if ( termsOfServiceVersionIdForIdString == null ) {
//						String msg = "No record for tosAcceptedKey: " + tosAcceptedKey;
//						log.warn( msg );
//						throw new WebApplicationException(
//								Response.status( WebServiceErrorMessageConstants.INVALID_PARAMETER_STATUS_CODE )  //  Send HTTP code
//								.entity( WebServiceErrorMessageConstants.INVALID_PARAMETER_TEXT ) // This string will be passed to the client
//								.build() );  //  Early Exit with Data Exception
//					}
//				}
			}

			//  New User Mgmt
			
			UserMgmtCreateAccountRequest userMgmtCreateAccountRequest = new UserMgmtCreateAccountRequest();
			
			userMgmtCreateAccountRequest.setUsername( createAccountRequest.username );
			userMgmtCreateAccountRequest.setEmail( createAccountRequest.email );
			userMgmtCreateAccountRequest.setPassword( createAccountRequest.password );
			userMgmtCreateAccountRequest.setFirstName( createAccountRequest.firstName );
			userMgmtCreateAccountRequest.setLastName( createAccountRequest.lastName );
			userMgmtCreateAccountRequest.setOrganization( createAccountRequest.organization );
			userMgmtCreateAccountRequest.setUserRemoteIP( httpServletRequest.getRemoteAddr() );
			
			UserMgmtCreateAccountResponse userMgmtCreateAccountResponse =
					userMgmtCentralWebappWebserviceAccess.createUser( userMgmtCreateAccountRequest );
			
			if ( ! userMgmtCreateAccountResponse.isSuccess() ) {
				
				if ( userMgmtCreateAccountResponse.isDuplicateEmail() ) {
					createAccountResult.setDuplicateEmail(true);
					createAccountResult.setStatus(false);
					return createAccountResult;   //  EARLY EXIT
				}
				if ( userMgmtCreateAccountResponse.isDuplicateUsername() ) {
					createAccountResult.setDuplicateUsername(true);
					createAccountResult.setStatus(false);
					return createAccountResult;   //  EARLY EXIT
				}
			}
			
			int createdUserMgmtUserId = userMgmtCreateAccountResponse.getCreatedUserId();

			UserDTO userDTO = new UserDTO();

			// pass in created user id from User Mgmt Webapp
			userDTO.setUserMgmtUserId( createdUserMgmtUserId );
			
			userDTO.setEnabledAppSpecific( true );
			
			if ( createAccountUsingAdminUserAccount == CreateAccountUsingAdminUserAccount.NO ) {

				if ( userInviteTrackingDTO != null && userInviteTrackingDTO.getInvitedProjectId() == null ) {
					//  Invite not tied to a project so the access level in the invite is used as the user level
					userDTO.setUserAccessLevel( userInviteTrackingDTO.getInvitedUserAccessLevel() );
				} else {
					//  The InvitedUserAccessLevel is tied to the project so at the user level this default is used.
					userDTO.setUserAccessLevel( AuthAccessLevelConstants.ACCESS_LEVEL_DEFAULT_USER_CREATED_VIA_PROJECT_INVITE  );
				}
				
			} else {
				//  Set Level provided by user for CreateAccountUsingAdminUserAccount.YES
				userDTO.setUserAccessLevel( accessLevel );
			}
			
			//  After user added to User Mgmt, add to local DB
			
			ZzUserDataMirrorDTO zzUserDataMirrorDTO = new ZzUserDataMirrorDTO();
			// zzUserDataMirrorDTO.setUserId( XXX );  UserId set later
			zzUserDataMirrorDTO.setUsername( createAccountRequest.username );
			zzUserDataMirrorDTO.setEmail( createAccountRequest.email );
			zzUserDataMirrorDTO.setFirstName( createAccountRequest.firstName );
			zzUserDataMirrorDTO.setLastName( createAccountRequest.lastName );
			zzUserDataMirrorDTO.setOrganization( createAccountRequest.organization );

			try {
				if ( userInviteTrackingDTO != null ) {
					if ( userInviteTrackingDTO.getInvitedProjectId() == null ) {
						//  user is not linked to a project so just add the user
						addNewUserUsingDBTransactionService
						.addNewUserForUserInvite( userDTO, zzUserDataMirrorDTO, userInviteTrackingDTO );
					} else {
						//  A project id is associated so create and save records for that as well
						ProjectUserDTO projectUserDTO = new ProjectUserDTO();
						projectUserDTO.setProjectId( userInviteTrackingDTO.getInvitedProjectId() );
						projectUserDTO.setAccessLevel( userInviteTrackingDTO.getInvitedUserAccessLevel() );
						addNewUserUsingDBTransactionService
						.addNewUserAddProjectUserDTOForUserInvite( 
								userDTO, zzUserDataMirrorDTO, projectUserDTO, userInviteTrackingDTO );
					}
				} else {
					//  user is not linked to a project so just add the user
					addNewUserUsingDBTransactionService.addNewUserForUserInvite( userDTO, zzUserDataMirrorDTO, null /* authUserInviteTrackingDTO */ );
				}
				
			} finally {
				
			}

			if ( createAccountUsingAdminUserAccount == CreateAccountUsingAdminUserAccount.NO ) {

//				if ( termsOfServiceEnabled ) {
//					// terms of service is enabled, save user acceptance
//					int authUserId = authUserDTO.getId();
//					TermsOfServiceUserAcceptedVersionHistoryDTO tosUserAccepted = new TermsOfServiceUserAcceptedVersionHistoryDTO();
//					tosUserAccepted.setAuthUserId( authUserId );
//					tosUserAccepted.setTermsOfServiceVersionId( termsOfServiceVersionIdForIdString );
//					TermsOfServiceUserAcceptedVersionHistoryDAO.getInstance().save( tosUserAccepted );
//				}

				UserMgmtLoginRequest userMgmtLoginRequest = new UserMgmtLoginRequest();
				userMgmtLoginRequest.setUsername( createAccountRequest.username );
				userMgmtLoginRequest.setPassword( createAccountRequest.password );
				userMgmtLoginRequest.setRemoteIP(  httpServletRequest.getRemoteAddr() );

				UserMgmtLoginResponse userMgmtLoginResponse = 
						userMgmtCentralWebappWebserviceAccess.userLogin( userMgmtLoginRequest );

				if ( ! userMgmtLoginResponse.isSuccess() ) {
					String msg = null;
					if ( userMgmtLoginResponse.isUsernameNotFound() || userMgmtLoginResponse.isPasswordInvalid() ) {
						msg = "Fail to log into account just created for username not found or password is invalid.  username: " + createAccountRequest.username;
					} else if ( userMgmtLoginResponse.isUserDisabled() ) {
						msg = "Fail to log into account just created for user is disabled.  username: " + createAccountRequest.username;
					}
					msg = "Fail to log into account just created.  username: " + createAccountRequest.username;
					log.error( msg );
					throw new LimelightInternalErrorException( msg );
				}

				//  Create current session so the browser is logged in as soon as this webservice returns

				UserSessionBuilder userSessionBuilder =
						UserSessionBuilder.getBuilder()
						.fromUserDTO( userDTO )
						.fromUserMgmtCreateAccountRequest( userMgmtCreateAccountRequest )
						.setGlobalAdminUser( false )
						.setEnabled(true);
						
				UserSession userSession = userSessionBuilder.build();

				userSessionManager.setUserSession( userSession, httpServletRequest );
			}

			log.info( "Creating User Account SUCCESSFUL!!! username: " + createAccountRequest.username );

			createAccountResult.setStatus(true);
			return createAccountResult;
			
		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
			throw e;
		} catch ( Exception e ) {
			String msg = "createAccountCommonInternal(...) Exception caught: " + e.toString();
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
		}
		
	}


	public static class CreateAccountRequest {
		
//		private String tosAcceptedKey;
		private String firstName;
		private String lastName;
		private String organization;
		private String email;
		private String username;
		private String password;
		private String inviteTrackingCode; // Required on request from Invite
		private String accessLevel; // Only Allowed on request performed by Admin Acct
		
		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}
		public void setLastName(String lastName) {
			this.lastName = lastName;
		}
		public void setOrganization(String organization) {
			this.organization = organization;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public void setInviteTrackingCode(String inviteTrackingCode) {
			this.inviteTrackingCode = inviteTrackingCode;
		}
		public void setAccessLevel(String accessLevel) {
			this.accessLevel = accessLevel;
		}
	}

	public static class CreateAccountResult {

		private boolean status = false;
		
		private boolean duplicateUsername = false;
		private boolean duplicateEmail = false;
		private boolean userTestValidated = false;
		
		private ValidateUserInviteTrackingCodeResult_NotValidReason inviteTrackingCodeNotValidReason;
		
		private String errorMessage;

		public boolean isStatus() {
			return status;
		}

		public void setStatus(boolean status) {
			this.status = status;
		}

		public boolean isDuplicateUsername() {
			return duplicateUsername;
		}

		public void setDuplicateUsername(boolean duplicateUsername) {
			this.duplicateUsername = duplicateUsername;
		}

		public boolean isDuplicateEmail() {
			return duplicateEmail;
		}

		public void setDuplicateEmail(boolean duplicateEmail) {
			this.duplicateEmail = duplicateEmail;
		}

		public boolean isUserTestValidated() {
			return userTestValidated;
		}

		public void setUserTestValidated(boolean userTestValidated) {
			this.userTestValidated = userTestValidated;
		}

		public String getErrorMessage() {
			return errorMessage;
		}

		public void setErrorMessage(String errorMessage) {
			this.errorMessage = errorMessage;
		}

		public ValidateUserInviteTrackingCodeResult_NotValidReason getInviteTrackingCodeNotValidReason() {
			return inviteTrackingCodeNotValidReason;
		}

		public void setInviteTrackingCodeNotValidReason(
				ValidateUserInviteTrackingCodeResult_NotValidReason inviteTrackingCodeNotValidReason) {
			this.inviteTrackingCodeNotValidReason = inviteTrackingCodeNotValidReason;
		}
	}

}
