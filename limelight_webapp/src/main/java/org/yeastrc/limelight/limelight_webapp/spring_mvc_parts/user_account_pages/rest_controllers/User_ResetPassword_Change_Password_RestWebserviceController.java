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
import org.yeastrc.limelight.limelight_webapp.dao.UserForgotPasswordTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserForgotPasswordTrackingDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.services.User_Validate_ResetPassword_Code_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.services.User_Validate_ResetPassword_Code_Service.User_Validate_ResetPassword_Code_Service_Result;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtResetPasswordRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtResetPasswordResponse;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;

/**
 * 
 *
 */
@RestController
public class User_ResetPassword_Change_Password_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( User_ResetPassword_Change_Password_RestWebserviceController.class );
	
	private static final String PATH_OF_CURRENT_CONTROLLER = AA_UserAccount_RestWSControllerPaths_Constants.USER_RESET_PASSWORD_CHANGE_PASSWORD_WEBSERVICE_CONTROLLER;

	@Autowired
	private User_Validate_ResetPassword_Code_ServiceIF user_Validate_ResetPassword_Code_Service;
	
	@Autowired
	private UserForgotPasswordTrackingDAO_IF userForgotPasswordTrackingDAO;
	
	@Autowired
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;

	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	/**
	 * 
	 */
	public User_ResetPassword_Change_Password_RestWebserviceController() {
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
		
		final String password = webserviceRequest.getPassword();
		final String resetPasswordTrackingCode = webserviceRequest.getResetPasswordTrackingCode();
		
		final String submitIP = httpServletRequest.getRemoteAddr();
		
		WebserviceResult webserviceResult = new WebserviceResult();
		
		if ( StringUtils.isEmpty( password ) ) {
			log.warn( "No password" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		if ( StringUtils.isEmpty( resetPasswordTrackingCode ) ) {
			log.warn( "No resetPasswordTrackingCode" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		User_Validate_ResetPassword_Code_Service_Result user_Validate_ResetPassword_Code_Service_Result =
				user_Validate_ResetPassword_Code_Service.user_Validate_ResetPassword_Code_Service( resetPasswordTrackingCode );

		if ( ! user_Validate_ResetPassword_Code_Service_Result.isValid() ) {

			webserviceResult.errorMessage = user_Validate_ResetPassword_Code_Service_Result.getErrorMsg();
			return webserviceResult;
		}

		UserForgotPasswordTrackingDTO forgotPwdTrk = user_Validate_ResetPassword_Code_Service_Result.getForgotPwdTrk();

		//  Make call to User Mgmt webapp to change the password
		Integer userMgmtUserId = user_Validate_ResetPassword_Code_Service_Result.getUserMgmtUserId(); // userMgmtUserId assoc with Forgot Pwd Tracking code
		
		if ( userMgmtUserId == null ) {
			String msg = "No userMgmtUserId found for resetPasswordTrackingCode: " + resetPasswordTrackingCode;
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}

		UserMgmtResetPasswordRequest userMgmtResetPasswordRequest = new UserMgmtResetPasswordRequest();
		userMgmtResetPasswordRequest.setUserMgmtUserId( userMgmtUserId );
		userMgmtResetPasswordRequest.setNewPassword( password );
		userMgmtResetPasswordRequest.setUserRemoteIP( submitIP );
		UserMgmtResetPasswordResponse userMgmtResetPasswordResponse = 
				userMgmtCentralWebappWebserviceAccess.resetPassword( userMgmtResetPasswordRequest );
		if ( ! userMgmtResetPasswordResponse.isSuccess() ) {
			if ( userMgmtResetPasswordResponse.isUserIdNotValid() ) {
				String msg = "Failed to update password in User Mgmt Webapp.  User id not valid for user id: " + userMgmtUserId;
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
			String msg = "Failed to update password in User Mgmt Webapp for user id: " + userMgmtUserId;
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}
		userForgotPasswordTrackingDAO.updateUsedDateUseIP( forgotPwdTrk.getId(), submitIP );
		
		webserviceResult.setStatus(true);
		
		return webserviceResult;

	}
	
	//////////

	public static class WebserviceRequest {
		private String password;
		private String resetPasswordTrackingCode;
		
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getResetPasswordTrackingCode() {
			return resetPasswordTrackingCode;
		}
		public void setResetPasswordTrackingCode(String resetPasswordTrackingCode) {
			this.resetPasswordTrackingCode = resetPasswordTrackingCode;
		}

	}

	public static class WebserviceResult {

		private boolean status = false;
		
		private String errorMessage;

		public boolean isStatus() {
			return status;
		}

		public void setStatus(boolean status) {
			this.status = status;
		}

		public String getErrorMessage() {
			return errorMessage;
		}

		public void setErrorMessage(String errorMessage) {
			this.errorMessage = errorMessage;
		}
	}

}
