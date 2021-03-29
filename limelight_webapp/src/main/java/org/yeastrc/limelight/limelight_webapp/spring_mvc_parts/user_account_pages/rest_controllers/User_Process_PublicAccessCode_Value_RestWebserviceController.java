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
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectIdFor_Project_PublicAccessCode_PublicAccessCodeEnabled_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionBuilder;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionManager;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;

/**
 * 
 *
 */
@RestController
public class User_Process_PublicAccessCode_Value_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( User_Process_PublicAccessCode_Value_RestWebserviceController.class );

	@Autowired
	private ProjectIdFor_Project_PublicAccessCode_PublicAccessCodeEnabled_Searcher_IF projectIdFor_Project_PublicAccessCode_PublicAccessCodeEnabled_Searcher;

	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private UserSessionManager userSessionManager;

	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	/**
	 * 
	 */
	public User_Process_PublicAccessCode_Value_RestWebserviceController() {
		super();
		//		log.warn( "constructor no params called" );
	}

	//  Convert JSON to byte[] so can cache it

	//  These 2 annotations work the same

	@PostMapping( 
			path = { 
					AA_UserAccount_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_UserAccount_RestWSControllerPaths_Constants.USER_PROCESS_PUBLIC_ACCESS_CODE_VALUE
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

			WebserviceResponse webserviceResponse = processCode( webserviceRequest, remoteIP, httpServletRequest );
			
			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResponse );

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
	private WebserviceResponse processCode( WebserviceRequest webserviceRequest, String remoteIP, HttpServletRequest httpServletRequest ) throws Exception {
		
		if ( StringUtils.isEmpty( webserviceRequest.public_access_code_value ) ) {
			log.warn( "No public_access_code_value" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		if ( webserviceRequest.projectId == null ) {
			log.warn( "No projectId" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		String projectPublicAccessCode = webserviceRequest.public_access_code_value;

		WebserviceResponse webserviceResponse = new WebserviceResponse();
		
		Integer projectId =
				projectIdFor_Project_PublicAccessCode_PublicAccessCodeEnabled_Searcher.getProjectId_Project_PublicAccessCode_PublicAccessCodeEnabled(projectPublicAccessCode);
		
		if ( projectId == null ) {
			
			webserviceResponse.invalidCode = true;
			
			return webserviceResponse; // EARLY RETURN
		}

		if ( projectId.intValue() != webserviceRequest.projectId ) {

			webserviceResponse.invalidCodeForProjectId = true;
			
			return webserviceResponse; // EARLY RETURN
		}
		
		ProjectDTO projectOnlyProjectLockedPublicAccessLevel = projectDAO.getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( projectId );
		
		if ( projectOnlyProjectLockedPublicAccessLevel == null ) {

			webserviceResponse.invalidCode = true;
			
			return webserviceResponse; // EARLY RETURN
		}
		
		if ( ( ! projectOnlyProjectLockedPublicAccessLevel.isEnabled() )
				|| projectOnlyProjectLockedPublicAccessLevel.isMarkedForDeletion() ) {

			webserviceResponse.invalidCode = true;
			
			return webserviceResponse; // EARLY RETURN
		}

		UserSession userSession = 
				UserSessionBuilder.getBuilder()
				.setPublicAccessCode( webserviceRequest.public_access_code_value )
				.setProjectId_ForPublicAccessCode( projectId )
				.build();
		
		userSessionManager.setUserSession( userSession, httpServletRequest );

		webserviceResponse.success = true;
		
		return webserviceResponse;
	}


	public static class WebserviceRequest {

		private String public_access_code_value;
		private Integer projectId;

		public void setPublic_access_code_value(String public_access_code_value) {
			this.public_access_code_value = public_access_code_value;
		}
		public void setProjectId(Integer projectId) {
			this.projectId = projectId;
		}
	}

	public static class WebserviceResponse {

		private boolean success;
		private boolean invalidCode;
		private boolean invalidCodeForProjectId;
		
		public boolean isSuccess() {
			return success;
		}
		public boolean isInvalidCode() {
			return invalidCode;
		}
		public boolean isInvalidCodeForProjectId() {
			return invalidCodeForProjectId;
		}

	}

}
