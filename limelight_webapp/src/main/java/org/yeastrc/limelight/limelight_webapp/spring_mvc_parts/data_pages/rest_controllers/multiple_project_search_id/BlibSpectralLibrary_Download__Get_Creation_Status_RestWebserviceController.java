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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.multiple_project_search_id;


import java.util.List;
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
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.blib_file__creation_web_service__call_webservice_code.BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService.BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService_Response;
import org.yeastrc.limelight.limelight_webapp.blib_file__creation_web_service__call_webservice_code.BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService.Request_To_BlibCreator_Status_Webservice_Root;
import org.yeastrc.limelight.limelight_webapp.blib_file__creation_web_service__call_webservice_code.BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService.Response_From_BlibCreator_Status_Webservice_Root;
import org.yeastrc.limelight.limelight_webapp.blib_file__creation_web_service__call_webservice_code.BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Blib Spectral Library File Download - Get the Status of the creation of the file 
 *  
 * 
 */
@RestController
public class BlibSpectralLibrary_Download__Get_Creation_Status_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( BlibSpectralLibrary_Download__Get_Creation_Status_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService_IF blibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	/**
	 * 
	 */
	public BlibSpectralLibrary_Download__Get_Creation_Status_RestWebserviceController() {
		super();
		//		log.warn( "constructor no params called" );
	}

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
					+ AA_RestWSControllerPaths_Constants.BLIB_SPECTRAL_LIBRARY_DOWNLOAD__GET_CREATION_STATUS__REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

	//	@RequestMapping( 
	//			path = AA_RestWSControllerPaths_Constants.,
	//			method = RequestMethod.POST,
	//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

	public @ResponseBody ResponseEntity<byte[]>  searchNameList_From_ProjectSearchIds(

			@RequestBody byte[] postBody,
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse
			) throws Exception {

		try {
			//    		log.warn( "searchNameList_From_ProjectSearchIds(...) called" );

			//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
			//    to return specific error to web app JS code if webserviceSyncTracking is not current value
			validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

			//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

			if ( postBody == null ) {
				log.warn( "No Post Body" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

			if ( webserviceRequest.projectSearchIdList == null || webserviceRequest.projectSearchIdList.isEmpty() ) {
				log.warn( "No webserviceRequest.projectSearchIdList entries" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			if ( webserviceRequest.requestId == null || webserviceRequest.requestId.length() == 0 ) {
				log.warn( "webserviceRequest.requestId is missing or empty string" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			////////////////

			//  AUTH - validate access

			//  throws an exception if access is not valid that is turned into a webservice response by Spring

			//  Comment out result since not use it
			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
					validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( webserviceRequest.projectSearchIdList, httpServletRequest );

			////////////////

			Integer projectId = null;

			{
				List<Integer> projectIds = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds();

				if (projectIds.isEmpty() ) {
					String msg = "validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds(); returned empty list.";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
				if (projectIds.size() > 1 ) {
					String msg = "validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds(); returned > 1 entry.";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}

				projectId = projectIds.get(0);
			}	


			Request_To_BlibCreator_Status_Webservice_Root request_To_BlibCreator_Webservice_Root = new Request_To_BlibCreator_Status_Webservice_Root( projectId, webserviceRequest.requestId );
			
			BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService_Response callWebService_Response =
					blibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService.
					blibFileCreation_WebService__GetCreationStatus__CallWebService(request_To_BlibCreator_Webservice_Root);

			WebserviceResult webserviceResult = new WebserviceResult();
			
			webserviceResult.status = callWebService_Response.isStatus();
			webserviceResult.failedToConnectToWebservice = callWebService_Response.isFailedToConnectToWebservice();
			webserviceResult.httpStatusCode_Not_200_OK = callWebService_Response.getHttpStatusCode_Not_200_OK();
			
			if ( callWebService_Response.isStatus() ) {

				Response_From_BlibCreator_Status_Webservice_Root response_From_BlibCreator_Status_Webservice_Root = callWebService_Response.getWebserviceResponse_Root();
						
				webserviceResult.webserviceResponse_StatusString = response_From_BlibCreator_Status_Webservice_Root.getStatus();
				
				webserviceResult.webserviceResponse_End_user_message = response_From_BlibCreator_Status_Webservice_Root.getEnd_user_message();
				webserviceResult.webserviceResponse_Queue_position = response_From_BlibCreator_Status_Webservice_Root.getQueue_position();
			}

			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {

			//  only rethrow Error Response Exceptions 
			throw e;

		} catch ( Throwable e ) {
			String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
		}
	}

	////////////////////////////////////////
	////////////////////////////////////////


	/**
	 * 
	 *
	 */
	public static class WebserviceRequest {

		private List<Integer> projectSearchIdList;
		private String requestId;
		
		public void setProjectSearchIdList(List<Integer> projectSearchIdList) {
			this.projectSearchIdList = projectSearchIdList;
		}
		public void setRequestId(String requestId) {
			this.requestId = requestId;
		}
	}

	/**
	 * 
	 *
	 */
	public static class WebserviceResult {

		boolean status;
		boolean failedToConnectToWebservice;  // Also malformed URL
		Integer httpStatusCode_Not_200_OK;
		
		String webserviceResponse_StatusString; //  Returned from Webservice call
		String webserviceResponse_End_user_message;  //  Returned from Webservice call  
		Integer webserviceResponse_Queue_position;  //  Returned from Webservice call
		
		public boolean isStatus() {
			return status;
		}
		public boolean isFailedToConnectToWebservice() {
			return failedToConnectToWebservice;
		}
		public Integer getHttpStatusCode_Not_200_OK() {
			return httpStatusCode_Not_200_OK;
		}
		public String getWebserviceResponse_StatusString() {
			return webserviceResponse_StatusString;
		}
		public String getWebserviceResponse_End_user_message() {
			return webserviceResponse_End_user_message;
		}
		public Integer getWebserviceResponse_Queue_position() {
			return webserviceResponse_Queue_position;
		}
	}
}


