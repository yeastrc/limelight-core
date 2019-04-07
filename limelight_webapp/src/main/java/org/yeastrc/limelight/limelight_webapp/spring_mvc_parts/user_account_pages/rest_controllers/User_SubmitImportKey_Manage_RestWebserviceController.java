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
import org.yeastrc.limelight.limelight_webapp.dao.FileImportSubmitImportProgramKeyPerUserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Manage the 
 *
 */
@RestController
public class User_SubmitImportKey_Manage_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( User_SubmitImportKey_Manage_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetUserSessionActualUserLoggedIn_ForRestControllerIF getUserSessionActualUserLoggedIn_ForRestController;
	
	@Autowired
	private FileImportSubmitImportProgramKeyPerUserDAO_IF fileImportSubmitImportProgramKeyPerUserDAO;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	/**
	 * 
	 */
	public User_SubmitImportKey_Manage_RestWebserviceController() {
		super();
		//		log.warn( "constructor no params called" );
	}

	//  Convert JSON to byte[] so can cache it

	//  These 2 annotations work the same

	@PostMapping( 
			path = { 
					AA_UserAccount_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_UserAccount_RestWSControllerPaths_Constants.USER_SUBMIT_IMPORT_KEY_MANAGE_REST_WEBSERVICE_CONTROLLER
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

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

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
		
		if ( webserviceRequest.createKey && ( webserviceRequest.replaceKey || webserviceRequest.deleteKey ) ) {
			log.warn( "Invalid request: webserviceRequest.createKey && ( webserviceRequest.replaceKey || webserviceRequest.deleteKey" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		if ( webserviceRequest.replaceKey && ( webserviceRequest.createKey || webserviceRequest.deleteKey ) ) {
			log.warn( "Invalid request: webserviceRequest.replaceKey && ( webserviceRequest.createKey || webserviceRequest.deleteKey" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		if ( webserviceRequest.deleteKey && ( webserviceRequest.replaceKey || webserviceRequest.createKey ) ) {
			log.warn( "Invalid request: webserviceRequest.deleteKey && ( webserviceRequest.replaceKey || webserviceRequest.createKey" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		if ( ( webserviceRequest.replaceKey || webserviceRequest.deleteKey )
				&& StringUtils.isEmpty( webserviceRequest.existingKey ) ) {
			log.warn( "Invalid request: ( webserviceRequest.replaceKey || webserviceRequest.deleteKey ) && StringUtils.isEmpty( webserviceRequest.existingKey )" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		UserSession userSession =
				getUserSessionActualUserLoggedIn_ForRestController.userSessionOfActualUserLoggedIn( httpServletRequest );

		WebserviceResult webserviceResult = new WebserviceResult();
		
		if ( webserviceRequest.createKey || webserviceRequest.replaceKey ) {
			
			String submitImportProgramKey = generate_submitImportProgramKey();
			
			fileImportSubmitImportProgramKeyPerUserDAO.save( userSession.getUserId(), submitImportProgramKey );
			webserviceResult.newKey = submitImportProgramKey;
			
		} else if ( webserviceRequest.deleteKey ) {
			
			fileImportSubmitImportProgramKeyPerUserDAO.delete( userSession.getUserId() );
		} else {
			
		}

		webserviceResult.setStatus(true);

		log.info( "Manage Submit Import Key SUCCESSFUL!!! user id: " + userSession.getUserId() );

		return webserviceResult;
	}
	
	/**
	 * @return
	 */
	private String generate_submitImportProgramKey() {
		
		long currentTimeMillis = System.currentTimeMillis();
		
		String result = generateRandomString(currentTimeMillis)
				+ generateRandomString(currentTimeMillis)
				+ generateRandomString(currentTimeMillis)
				+ generateRandomString(currentTimeMillis);
		
		return result;
	}
	
	private String generateRandomString( long currentTimeMillis ) {
		
		double randomNumber = Math.random();
		
		if ( randomNumber < 0.5 ) {
			randomNumber += 0.5;
		}
		
		String randomString = Long.toHexString( (long) ( currentTimeMillis * randomNumber ) );
		return randomString;
	}


	public static class WebserviceRequest {
		
		private boolean createKey;
		private boolean replaceKey;
		private boolean deleteKey;
		private String existingKey;
		
		public String getExistingKey() {
			return existingKey;
		}
		public void setExistingKey(String existingKey) {
			this.existingKey = existingKey;
		}
		public boolean isCreateKey() {
			return createKey;
		}
		public void setCreateKey(boolean createKey) {
			this.createKey = createKey;
		}
		public boolean isReplaceKey() {
			return replaceKey;
		}
		public void setReplaceKey(boolean replaceKey) {
			this.replaceKey = replaceKey;
		}
		public boolean isDeleteKey() {
			return deleteKey;
		}
		public void setDeleteKey(boolean deleteKey) {
			this.deleteKey = deleteKey;
		}

	}

	public static class WebserviceResult {

		private boolean status;
		private String newKey;

		public boolean isStatus() {
			return status;
		}
		public void setStatus(boolean status) {
			this.status = status;
		}
		public String getNewKey() {
			return newKey;
		}
		public void setNewKey(String newKey) {
			this.newKey = newKey;
		}

	}

}
