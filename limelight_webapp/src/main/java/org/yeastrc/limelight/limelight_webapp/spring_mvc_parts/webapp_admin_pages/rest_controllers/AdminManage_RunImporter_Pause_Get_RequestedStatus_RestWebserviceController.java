/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.webapp_admin_pages.rest_controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.GetUserSessionActualUserLoggedIn_ForRestControllerIF;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.FileImport_Pause_RunImporter_Get_RequestedStatus_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.FileImport_Pause_RunImporter_Get_RequestedStatus_Searcher.FileImport_Pause_RunImporter_Get_RequestedStatus_Searcher_Return_Item;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Admin Manage Importer / Pipeline Execution Page - Rest Controller 
 * 
 * Get Requested Pause Status
 * 
 * Manage Importer and Pipeline Execution Page - Manages the "Run Importer" process and its spawned processes
 *
 */
@RestController
public class AdminManage_RunImporter_Pause_Get_RequestedStatus_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( AdminManage_RunImporter_Pause_Get_RequestedStatus_RestWebserviceController.class );
	

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetUserSessionActualUserLoggedIn_ForRestControllerIF getUserSessionActualUserLoggedIn_ForRestController;
	
	@Autowired
	private FileImport_Pause_RunImporter_Get_RequestedStatus_Searcher_IF fileImport_Pause_RunImporter_Get_RequestedStatus_Searcher;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	//  Convert JSON to byte[] so can cache it

	//  These 2 annotations work the same

	@PostMapping( 
			path = { 
					AA_WebappAdmin_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_WebappAdmin_RestWSControllerPaths_Constants.WEBAPP_ADMIN_MANAGE_RUN_IMPORTER_PAUSE_GET_REQUESTED_STATUS__REST_WEBSERVICE_CONTROLLER
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
		
		UserSession userSession =
				getUserSessionActualUserLoggedIn_ForRestController.userSessionOfActualUserLoggedIn( httpServletRequest );

		if ( userSession.isGlobalAdminUser() || 
				( userSession.getUserAccessLevel() != null 
						&& userSession.getUserAccessLevel() <= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN ) ) {
			
		} else {
			//  Only admin user authorized to access this page
			
			throw new Limelight_WS_AuthError_Forbidden_Exception();
		}

		List<FileImport_Pause_RunImporter_Get_RequestedStatus_Searcher_Return_Item> dbResultList = 
				fileImport_Pause_RunImporter_Get_RequestedStatus_Searcher.get_Requested_PauseRunImporter_Status();
		
		List<WebserviceResult_Item> resultList = new ArrayList<>(  dbResultList.size() );
		
		for ( FileImport_Pause_RunImporter_Get_RequestedStatus_Searcher_Return_Item dbResult : dbResultList ) {

			if ( dbResult.getType() == null ) {
				throw new LimelightInternalErrorException( "( dbResult.getType() == null )" );
			}
			if ( dbResult.getStatus_Requested() == null ) {
				throw new LimelightInternalErrorException( "( dbResult.getStatus_Requested() == null )" );
			}
			
			WebserviceResult_Item resultItem = new WebserviceResult_Item();
			resultItem.type_Id = dbResult.getType().value();
			resultItem.status_Requested_Id = dbResult.getStatus_Requested().value();
			
			resultList.add(resultItem);
		}
		
		
		WebserviceResult webserviceResult = new WebserviceResult();
		webserviceResult.resultList = resultList;

		return webserviceResult;
	}
	


	public static class WebserviceRequest {

		private String unUsedRequestParam;

		public void setUnUsedRequestParam(String unUsedRequestParam) {
			this.unUsedRequestParam = unUsedRequestParam;
		}
	
	}

	public static class WebserviceResult {
		
		private List<WebserviceResult_Item> resultList;

		public List<WebserviceResult_Item> getResultList() {
			return resultList;
		}
		
	}
	
	public static class WebserviceResult_Item {

		private Integer type_Id;
		
		private Integer status_Requested_Id;

		public Integer getType_Id() {
			return type_Id;
		}

		public Integer getStatus_Requested_Id() {
			return status_Requested_Id;
		}

	}

}
