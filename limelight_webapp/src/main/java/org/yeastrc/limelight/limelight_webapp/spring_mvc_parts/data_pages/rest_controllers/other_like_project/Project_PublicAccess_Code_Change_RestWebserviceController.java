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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.other_like_project;


import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * 3 Webservices
 * 
 * Enable/Disable/Generate New - Public Access Code for Project
 * 
 */
@RestController
public class Project_PublicAccess_Code_Change_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_PublicAccess_Code_Change_RestWebserviceController.class );
	
	private enum EnableDisableGenerateNew { Enable, Disable, GenerateNew }

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;

	@Autowired
	private ProjectDAO_IF projectDAO;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	/**
	 * 
	 */
	public Project_PublicAccess_Code_Change_RestWebserviceController() {
		super();
		//		log.warn( "constructor no params called" );
	}

	/////////////////////////////////////////////////////

	//  Convert result object graph to JSON in byte[] in the controller body so can cache it

	//  These 2 annotations work the same


	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.

	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.PROJECT_ENABLE_PUBLIC_ACCESS_CODE_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

	//	@RequestMapping( 
	//			path = AA_RestWSControllerPaths_Constants.,
	//			method = RequestMethod.POST,
	//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

	public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_EnablePublicAccessOnProject(

			@RequestBody byte[] postBody,
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse
			) throws Exception {

		return update_PublicAccessCode_PublicAccessCodeEnabled( EnableDisableGenerateNew.Enable, postBody, httpServletRequest, httpServletResponse );
	}

	/////////////////////////////////////////////////////

	//  Convert result object graph to JSON in byte[] in the controller body so can cache it

	//  These 2 annotations work the same


	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.

	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.PROJECT_GENERATE_NEW_PUBLIC_ACCESS_CODE_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

	//	@RequestMapping( 
	//			path = AA_RestWSControllerPaths_Constants.,
	//			method = RequestMethod.POST,
	//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

	public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_DisablePublicAccessOnProject(

			@RequestBody byte[] postBody,
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse
			) throws Exception {

		return update_PublicAccessCode_PublicAccessCodeEnabled( EnableDisableGenerateNew.GenerateNew, postBody, httpServletRequest, httpServletResponse );
	}

	/////////////////////////////////////////////////////

	//  Convert result object graph to JSON in byte[] in the controller body so can cache it

	//  These 2 annotations work the same


	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.

	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.PROJECT_DISABLE_PUBLIC_ACCESS_CODE_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

	//	@RequestMapping( 
	//			path = AA_RestWSControllerPaths_Constants.,
	//			method = RequestMethod.POST,
	//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

	public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_GenerateNew_PublicAccessCode_OnProject(

			@RequestBody byte[] postBody,
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse
			) throws Exception {

		return update_PublicAccessCode_PublicAccessCodeEnabled( EnableDisableGenerateNew.Disable, postBody, httpServletRequest, httpServletResponse );
	}

	/**
	 * @param projectPublicAccessCodeEnabledDBField
	 * @param 
	 * @param postBody
	 * @param httpServletRequest
	 * @param httpServletResponse
	 * @return
	 */
	private ResponseEntity<byte[]> update_PublicAccessCode_PublicAccessCodeEnabled(

			EnableDisableGenerateNew enableDisableGenerateNew,

			byte[] postBody,
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse
			) {

		try {
			//		log.warn( "webserviceMethod(...) called" );

			//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
			//    to return specific error to web app JS code if webserviceSyncTracking is not current value
			validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

			//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

			if ( postBody == null ) {
				log.warn( "No Post Body" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

			//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

			String projectIdentifier = webserviceRequest.getProjectIdentifier();

			if ( StringUtils.isEmpty( projectIdentifier ) ) {
				log.warn( "projectIdentifier is empty or not assigned" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			int projectId = 0;

			try {
				projectId = Integer.parseInt( projectIdentifier );

			} catch ( RuntimeException e ) {
				log.warn( "Project Identifier not parsable to int: " + projectIdentifier );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );

			//  Restrict access to Project owners or above (admin), if project was not locked
			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
					validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
					.validateProjectOwnerIfProjectNotLockedAllowed( projectIds, httpServletRequest );

			UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();

			if ( validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession() == null ) {
				String msg = "( validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession() == null )";
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			Integer userId = userSession.getUserId();
			if ( userId == null ) {
				String msg = "( userId == null )";
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			

			WebserviceResult projectViewSearchListResult = new WebserviceResult();
			projectViewSearchListResult.statusSuccess = true;

			if ( enableDisableGenerateNew == EnableDisableGenerateNew.Disable ) {
			
				projectDAO.updatePublicAccessCodePublicAccessCodeEnabled( null /* PublicAccessCode */, false /* PublicAccessCodeEnabled */, projectId, userId );
			
			} else if ( enableDisableGenerateNew == EnableDisableGenerateNew.GenerateNew ) {
				
				String publicAccessCode = _generatePublicAccessCode();
				projectViewSearchListResult.publicAccessCode = publicAccessCode;
				
				projectDAO.updatePublicAccessCodePublicAccessCodeEnabled( publicAccessCode, null /* PublicAccessCodeEnabled */, projectId, userId );
				
				
			} else if ( enableDisableGenerateNew == EnableDisableGenerateNew.Enable ) {

				ProjectDTO projectOnly_PublicAccessCodePublicAccessCodeEnabled = projectDAO.getPublicAccessCodePublicAccessCodeEnabledForProjectId( projectId );

				if ( projectOnly_PublicAccessCodePublicAccessCodeEnabled == null ) {
					throw new LimelightErrorDataInWebRequestException( "Project Id not found" );
				}
				
				String publicAccessCode = projectOnly_PublicAccessCodePublicAccessCodeEnabled.getPublicAccessCode();
				
				if ( StringUtils.isEmpty( publicAccessCode ) ) {
					
					publicAccessCode = _generatePublicAccessCode();
				}
				
				projectViewSearchListResult.publicAccessCode = publicAccessCode;
				
				projectDAO.updatePublicAccessCodePublicAccessCodeEnabled( publicAccessCode, true /* PublicAccessCodeEnabled */, projectId, userId );
				
			} else {
				String msg = "Unknown value for enableDisableGenerateNew: " + enableDisableGenerateNew;
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}

			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( projectViewSearchListResult );

			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {

			//  only rethrow Error Response Exceptions 
			throw e;

		} catch ( Exception e ) {
			String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
		}
	}
	
	/**
	 * @return
	 */
	private String _generatePublicAccessCode() {

		StringBuilder randomStringSB = new StringBuilder( 16 );

		final int RETURN_LENGTH = 12;
		
		int insertedCharacterCount = 0;
		
		for ( int j = 0; j < 200; j++ ) { // for loop just provides an upper bound
			double tosKeyMultiplier = Math.random();
			if ( tosKeyMultiplier < 0.5 ) {
				tosKeyMultiplier += 0.5;
			}
			long tosKeyLong = (long) ( System.currentTimeMillis() * tosKeyMultiplier );
			ByteBuffer tosKeyBuffer = ByteBuffer.allocate(Long.BYTES);
			tosKeyBuffer.putLong( tosKeyLong );
			
			String encodedLong = Base64.getEncoder().encodeToString( tosKeyBuffer.array() );
			// Drop first 6 characters and last character
			String encodedLongExtract = encodedLong.substring( 6, encodedLong.length() - 1 );
			
			char[] encodedLongArray = encodedLongExtract.toCharArray();
			
			for ( char entry : encodedLongArray ) {
				if ( ( entry >= 'a' && entry <= 'z' )
						|| ( entry >= 'A' && entry <= 'Z' )
						|| ( entry >= '1' && entry <= '9' ) ) {
					//  Only take a-z, A-Z, 1-9.
					randomStringSB.append( entry );
					insertedCharacterCount++;
					if ( insertedCharacterCount >= RETURN_LENGTH ) {
						break;
					}
				}
			}
			if ( insertedCharacterCount >= RETURN_LENGTH ) {
				break;
			}
		}
		if ( insertedCharacterCount < RETURN_LENGTH ) {
			throw new LimelightInternalErrorException("Not find enough letters and numbers for randomString. insertedCharacterCount: " + insertedCharacterCount );
		}
		String randomString = randomStringSB.toString();

		return randomString;
	}


	public static class WebserviceRequest {
		private String projectIdentifier;

		public String getProjectIdentifier() {
			return projectIdentifier;
		}
		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
	}

	public static class WebserviceResult {
		private boolean statusSuccess;
		private String publicAccessCode;  // NOT returned in disable

		public boolean isStatusSuccess() {
			return statusSuccess;
		}

		public void setStatusSuccess(boolean statusSuccess) {
			this.statusSuccess = statusSuccess;
		}

		public String getPublicAccessCode() {
			return publicAccessCode;
		}
	}


}


