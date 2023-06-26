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
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Request_Status_Enum;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Request_Type_ID_Enum;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.GetUserSessionActualUserLoggedIn_ForRestControllerIF;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.dao.FileImport_RunImporter_PauseProcessingRequest_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers.FileImportTracking_Exists_AtLeastOne_WithStatus_Started_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.searchers.FileImportAndPipelineRunTracking_Exists_AtLeastOne_WithStatus_Started_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Admin Manage Importer / Pipeline Execution Page - Rest Controller 
 * 
 * Get Requested And Current State
 * 
 * Manage Importer and Pipeline Execution Page - Manages the "Run Importer" process and its spawned processes
 *
 */
@RestController
public class AdminManage_RunImporter_Pause_Update_Requested_Status_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( AdminManage_RunImporter_Pause_Update_Requested_Status_RestWebserviceController.class );
	

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetUserSessionActualUserLoggedIn_ForRestControllerIF getUserSessionActualUserLoggedIn_ForRestController;
	
	@Autowired
	private FileImport_RunImporter_PauseProcessingRequest_DAO_IF fileImport_ImportAndPipelineRun_PauseProcessing_DAO;
	
	@Autowired
	private FileImportTracking_Exists_AtLeastOne_WithStatus_Started_Searcher_IF fileImportTracking_Exists_AtLeastOne_WithStatus_Started_Searcher;
	
	@Autowired
	private FileImportAndPipelineRunTracking_Exists_AtLeastOne_WithStatus_Started_Searcher_IF fileImportAndPipelineRunTracking_Exists_AtLeastOne_WithStatus_Started_Searcher;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	//  Convert JSON to byte[] so can cache it

	//  These 2 annotations work the same

	@PostMapping( 
			path = { 
					AA_WebappAdmin_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_WebappAdmin_RestWSControllerPaths_Constants.WEBAPP_ADMIN_MANAGE_IMPORTER_PIPELINE_EXECUTION__UPDATE_REQUESTED_STATUS_REST_WEBSERVICE_CONTROLLER
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
		
		if ( webserviceRequest.typeId == null ) {
			String msg = "( webserviceRequest.typeId == null )";
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();	
		}
		if ( webserviceRequest.statusRequestedId == null && ( webserviceRequest.genericPauseRequested == null || ( ! webserviceRequest.genericPauseRequested.booleanValue() ) ) ) {
			String msg = "( webserviceRequest.statusRequestedId == null && ( webserviceRequest.genericPauseRequested == null || ( ! webserviceRequest.genericPauseRequested.booleanValue() ) ) )";
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();	
		}
		

		FileImport_RunImporter_PauseProcessing_Request_Type_ID_Enum type = null;
		FileImport_RunImporter_PauseProcessing_Request_Status_Enum status_Requested = null;
		
		try {
			type = FileImport_RunImporter_PauseProcessing_Request_Type_ID_Enum.fromValue( webserviceRequest.typeId );
		} catch ( Throwable t ) {
			String msg = "webserviceRequest.typeId not valid value. webserviceRequest.typeId: " + webserviceRequest.typeId;
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();	
		}
		
		if ( webserviceRequest.genericPauseRequested != null && webserviceRequest.genericPauseRequested.booleanValue() ) {
			
			//  If NO "Import" or "Import and Pipeline Run" are running, Set to "Pause Now".
			//    Else set: webserviceResult.askUserForPauseType = true so ask user which they want
			
			boolean atLeastOne_WithStatus_Started = false;
			
			if ( fileImportTracking_Exists_AtLeastOne_WithStatus_Started_Searcher.exists_AtLeastOne_WithStatus_Started() ) {
				
				atLeastOne_WithStatus_Started = true;
			}
			
			if ( ! atLeastOne_WithStatus_Started ) {
				
				if ( fileImportAndPipelineRunTracking_Exists_AtLeastOne_WithStatus_Started_Searcher.exists_AtLeastOne_WithStatus_Started() ) {

					atLeastOne_WithStatus_Started = true;
				}
			}
			
			//  TODO  Uncomment for TESTING ONLY
			//			atLeastOne_WithStatus_Started = true;
			

			if ( ! atLeastOne_WithStatus_Started ) {
			
				//  NONE with status Started so pause immediately
				
				status_Requested = FileImport_RunImporter_PauseProcessing_Request_Status_Enum.PAUSE_IMMEDIATELY;
			}
		}
		
		if ( status_Requested == null && webserviceRequest.statusRequestedId != null ) {
			
			try {
				status_Requested = FileImport_RunImporter_PauseProcessing_Request_Status_Enum.fromValue( webserviceRequest.statusRequestedId );
			} catch ( Throwable t ) {
				String msg = "webserviceRequest.statusRequestedId not valid value. webserviceRequest.statusRequestedId: " + webserviceRequest.statusRequestedId;
				log.warn( msg );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();	
			}
		}

		if ( status_Requested != null ) {

			//  Have new status so update DB
			
			fileImport_ImportAndPipelineRun_PauseProcessing_DAO.insertOrUpdate_StatusId_Requested_ForType(status_Requested, type);
		}
		
		WebserviceResult webserviceResult = new WebserviceResult();
		webserviceResult.statusSuccess = true;
		
		if ( status_Requested == null ) {
			webserviceResult.askUserForPauseType = true;
		}

		return webserviceResult;
	}
	


	public static class WebserviceRequest {

		private Integer typeId;
		private Integer statusRequestedId;
		private Boolean genericPauseRequested; //  Passed when generic "Pause" button is clicked.  This webservice determines what to do.
		
		public void setTypeId(Integer typeId) {
			this.typeId = typeId;
		}
		public void setStatusRequestedId(Integer statusRequestedId) {
			this.statusRequestedId = statusRequestedId;
		}
		public void setGenericPauseRequested(Boolean genericPauseRequested) {
			this.genericPauseRequested = genericPauseRequested;
		}
	
	}

	public static class WebserviceResult {
		
		private boolean statusSuccess;
		private boolean askUserForPauseType;

		public boolean isStatusSuccess() {
			return statusSuccess;
		}

		public boolean isAskUserForPauseType() {
			return askUserForPauseType;
		}
		
	}
	
}
