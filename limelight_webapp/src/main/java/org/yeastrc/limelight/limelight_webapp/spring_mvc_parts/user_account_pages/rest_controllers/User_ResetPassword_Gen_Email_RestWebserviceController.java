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

import java.util.List;

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
import org.yeastrc.limelight.limelight_webapp.constants.ConfigSystemsKeysConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.UserForgotPasswordTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserForgotPasswordTrackingDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappConfigException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailIF;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailItem;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers.AA_UserAccount_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataResponse;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtSearchUserDataRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtSearchUserDataResponse;
import org.yeastrc.limelight.limelight_webapp.web_utils.GenerateRandomStringForCodeIF;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;

/**
 * 
 *
 */
@RestController
public class User_ResetPassword_Gen_Email_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( User_ResetPassword_Gen_Email_RestWebserviceController.class );
	
	private static final String PATH_OF_CURRENT_CONTROLLER = AA_UserAccount_RestWSControllerPaths_Constants.USER_RESET_PASSWORD_GEN_EMAIL_WEBSERVICE_CONTROLLER;

	@Autowired
	private UserDAO_IF userDAO;

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	@Autowired
	private UserForgotPasswordTrackingDAO_IF userForgotPasswordTrackingDAO;
	
	@Autowired
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;

	@Autowired
	private GenerateRandomStringForCodeIF generateRandomStringForCode;
	
	@Autowired
	private SendEmailIF sendEmail;

	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	/**
	 * 
	 */
	public User_ResetPassword_Gen_Email_RestWebserviceController() {
		super();
		//		log.warn( "constructor no params called" );
	}

	//  Convert JSON to byte[] so can cache it

	//  These 2 annotations work the same

	@PostMapping( 
			path = { 
					AA_UserAccount_RestWSControllerPaths_Constants.PATH_START_ALL
					+ PATH_OF_CURRENT_CONTROLLER
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

			WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class ); 

			WebserviceResult webserviceResult = userLogin( webserviceRequest, remoteIP, httpServletRequest );
			
			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

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
	 * @param webserviceRequest
	 * @param remoteIP
	 * @param httpServletRequest
	 * @return
	 * @throws Exception
	 */
	private WebserviceResult userLogin( WebserviceRequest webserviceRequest, String remoteIP, HttpServletRequest httpServletRequest ) throws Exception {

		final String username = webserviceRequest.getUsername();
		final String email = webserviceRequest.getEmail();
		
		final String submitIP = httpServletRequest.getRemoteAddr();
		
		WebserviceResult webserviceResult = new WebserviceResult();
		
		if ( StringUtils.isEmpty( username ) && StringUtils.isEmpty( email ) ) {
			log.warn( "No Username or Email" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		if ( StringUtils.isNotEmpty(username ) && StringUtils.isNotEmpty( email ) ) {
			log.warn( "Username and Email both have values" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		try {
			UserMgmtSearchUserDataResponse userMgmtSearchUserDataResponse = null;
			// Make sure this username exists!		
			if ( StringUtils.isNotEmpty( username ) ) {
				//  Get User Mgmt User id list for username, exact match to username
				UserMgmtSearchUserDataRequest userMgmtSearchUserDataRequest = new UserMgmtSearchUserDataRequest();
				userMgmtSearchUserDataRequest.setSearchString( username );
				userMgmtSearchUserDataResponse = 
						userMgmtCentralWebappWebserviceAccess.searchUserDataByUsernameExactMatchNoUserSession( userMgmtSearchUserDataRequest );
				if ( ! userMgmtSearchUserDataResponse.isSuccess() ) {
					String msg = "Failed to look up username: " + username;
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
				if ( userMgmtSearchUserDataResponse.getUserIdList() != null
						&& userMgmtSearchUserDataResponse.getUserIdList().size() > 1 ) {
					//  More than 1 user id returned.  Should not happen
					String msg = "More than one user mgmt user id returned for searching for exact match for username: " + username;
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
			} else {
				//  Get User Mgmt User id list for email, exact match to email
				UserMgmtSearchUserDataRequest userMgmtSearchUserDataRequest = new UserMgmtSearchUserDataRequest();
				userMgmtSearchUserDataRequest.setSearchString( email );
				userMgmtSearchUserDataResponse = 
						userMgmtCentralWebappWebserviceAccess.searchUserDataByEmailExactMatchNoUserSession( userMgmtSearchUserDataRequest );
				if ( ! userMgmtSearchUserDataResponse.isSuccess() ) {
					String msg = "Failed to look up email: " + email;
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
				if ( userMgmtSearchUserDataResponse.getUserIdList() != null
						&& userMgmtSearchUserDataResponse.getUserIdList().size() > 1 ) {
					//  More than 1 user id returned.  Should not happen
					String msg = "More than one user mgmt user id returned for searching for exact match for email: " + email;
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
			}
			List<Integer> userMgmtUserIdListFromSearch = userMgmtSearchUserDataResponse.getUserIdList();
			if ( userMgmtUserIdListFromSearch == null || userMgmtUserIdListFromSearch.isEmpty() ) {
				//  username or email not found
				webserviceResult.setInvalidUsernameOrEmail(true);
				return webserviceResult;  //  Early Exit
			}
			// User Mgmt user Id
			int userMgmtUserIdFromSearch = userMgmtUserIdListFromSearch.get(0);
			
			//  Get Limelight Auth User Id from User Mgmt user Id
			Integer userId = userDAO.getIdForUserMgmtUserId( userMgmtUserIdFromSearch );
			if ( userId == null ) {
				//  No Limelight Auth User Id for userMgmtUserIdFromSearch for username or email found
				webserviceResult.setInvalidUsernameOrEmail(true);
				return webserviceResult;  //  Early Exit
			}
			//  Get full user data
			UserMgmtGetUserDataRequest userMgmtGetUserDataRequest = new UserMgmtGetUserDataRequest();
			userMgmtGetUserDataRequest.setUserId( userMgmtUserIdFromSearch );
			UserMgmtGetUserDataResponse userMgmtGetUserDataResponse = 
					userMgmtCentralWebappWebserviceAccess.getUserData( userMgmtGetUserDataRequest );
			if ( ! userMgmtGetUserDataResponse.isSuccess() ) {
				String msg = "Failed to get Full user data from User Mgmt Webapp for user id: " + userMgmtUserIdFromSearch;
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
			String authCode = generateSaveForgotPasswordCode( userId, submitIP );
			// Generate and send the email to the user.
	        try {
	        	SendEmailItem sendEmailItem = createMailMessageToSend( userMgmtGetUserDataResponse, authCode, httpServletRequest );

				if ( log.isInfoEnabled() ) {
					log.info( "About to call sendEmail.sendEmail() sendEmailItem: " + sendEmailItem );
				}
				
				sendEmail.sendEmail( sendEmailItem );
				
				if ( log.isInfoEnabled() ) {
					log.info( "After call sendEmail.sendEmail() sendEmailItem: " + sendEmailItem );
				}
	        
	        } catch (Exception e) {
	        	log.error( "resetPasswordGetEmailService: Exception: user email: " + userMgmtGetUserDataResponse.getEmail(), e );
	        	return webserviceResult;  //  Early Exit
	        }
	        webserviceResult.setStatus(true);

	        log.info( "Reset Password Send Email SUCCESSFUL!!!  From webserviceRequest: username: " + webserviceRequest.getUsername() + ", email: " + webserviceRequest.getEmail() );

			return webserviceResult;
		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
			throw e;
		} catch ( Exception e ) {
			throw e;
		}
//		webserviceResult.setStatus( true );
//		log.info( "Reset Password Send Email SUCCESSFUL!!! username: " + webserviceRequest.getUsername() + ", email: " + webserviceRequest.getEmail() );
//
//		return webserviceResult;
	}
	
	/**
	 * Generates a password code and saves it in the auth_forgot_password_tracking table
	 * @param authUserId
	 * @param submitIP
	 * @return
	 * @throws Exception 
	 */
	public String generateSaveForgotPasswordCode( int authUserId, String submitIP ) throws Exception {
		try {
			String forgotPasswordTrackingCode = generateRandomStringForCode.generateRandomStringForCode();

			UserForgotPasswordTrackingDTO item = new UserForgotPasswordTrackingDTO();
			item.setUserId( authUserId );
			item.setSubmitIP( submitIP );
			item.setForgotPasswordTrackingCode( forgotPasswordTrackingCode );

			userForgotPasswordTrackingDAO.save( item );
			
			userForgotPasswordTrackingDAO.updateCodeReplacedByNewer( item.getId(), true /* codeReplacedByNewer */ );

			return forgotPasswordTrackingCode;
			
		} catch ( Exception e ) {
			String msg = "Exception  authUserId: " + authUserId + ", submitIP: " +  submitIP + ", Exception: " + e.toString();
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * @param user
	 * @param authCode
	 * @return
	 * @throws Exception 
	 * @throws SQLException 
	 */
	SendEmailItem createMailMessageToSend( UserMgmtGetUserDataResponse userMgmtGetUserDataResponse, String authCode, HttpServletRequest httpServletRequest )
	throws Exception {

		//  Create the URl (to the Page controller for processing the invite) to add to the email sent for the invite.
		
		//  Get base path to Page controller for processing the invite.
		String requestURL = httpServletRequest.getRequestURL().toString();
		
		int controllerStartInURL_Index = requestURL.indexOf( PATH_OF_CURRENT_CONTROLLER );
		
		if ( controllerStartInURL_Index == -1 ) {
			String msg = "Failed to find path of current controller in request URL.  request URL: " + requestURL
					+ ", path of current page controller: " + PATH_OF_CURRENT_CONTROLLER;
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}
		
		String baseURL = requestURL.substring( 0, controllerStartInURL_Index );

		//  Create URL to Page controller for processing the invite.
		String newURL = baseURL + AA_UserAccount_PageControllerPaths_Constants.RESET_PASSWORD_PROCESS_CODE_PAGE_CONTROLLER
				+ "/" + authCode;
		
		// set the message body
		String text = "Click this link to change your password: " + newURL + "\n\n"
			+ "\n\n"
		 	+ "Username: " + userMgmtGetUserDataResponse.getUsername() + "\n\n"
		 	+ "Thank you\n\nlimelight";
		
		String fromEmailAddress = configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysConstants.EMAIL_FROM_ADDRESS_KEY );

		if ( StringUtils.isEmpty( fromEmailAddress ) ) {
			
			String msg = "Cannot send email: No entry in config table for key '" + ConfigSystemsKeysConstants.EMAIL_FROM_ADDRESS_KEY
					+ "'.";
			log.error(msg);
			throw new LimelightWebappConfigException( msg );
		}
		
		String toEmailAddress = userMgmtGetUserDataResponse.getEmail();
		String emailSubject = "Reset Password Email For Limelight DB Webapp"; 
		String emailBody = text;
		
		SendEmailItem sendEmailItem = new SendEmailItem();
		sendEmailItem.setFromEmailAddress( fromEmailAddress );
		sendEmailItem.setToEmailAddress( toEmailAddress );
		sendEmailItem.setEmailSubject( emailSubject );
		sendEmailItem.setEmailBody( emailBody );
		return sendEmailItem;
	}
	
	//////////

	public static class WebserviceRequest {
		private String username;
		private String email;

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
	}

	public static class WebserviceResult {

		private boolean status = false;
		
		private boolean invalidUsernameOrEmail = false;

		public boolean isInvalidUsernameOrEmail() {
			return invalidUsernameOrEmail;
		}

		public void setInvalidUsernameOrEmail(boolean invalidUsernameOrEmail) {
			this.invalidUsernameOrEmail = invalidUsernameOrEmail;
		}

		public boolean isStatus() {
			return status;
		}

		public void setStatus(boolean status) {
			this.status = status;
		}
	}

}
