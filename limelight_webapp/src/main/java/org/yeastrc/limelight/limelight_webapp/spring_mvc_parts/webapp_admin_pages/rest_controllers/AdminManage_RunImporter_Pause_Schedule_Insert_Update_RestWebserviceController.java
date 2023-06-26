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
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.pause_run_importer_common.enum_classes.FileImport_RunImporter_PauseProcessing_Schedule_Type_ID_Enum;
import org.yeastrc.limelight.limelight_shared.pause_run_importer_common.schedule_pause_run_importer_json_objects.version_001_objects.RunImporter_Schedule_PauseImporter_JSON_Root__V001;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.GetUserSessionActualUserLoggedIn_ForRestControllerIF;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.dao.FileImport_RunImporter_PauseProcessing_Schedule_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Admin Manage Importer / Pipeline Execution Page - Rest Controller 
 * 
 * Pause Schedule Insert Update
 * 
 * Manage Importer and Pipeline Execution Page - Manages the "Run Importer" process and its spawned processes
 *
 */
@RestController
public class AdminManage_RunImporter_Pause_Schedule_Insert_Update_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( AdminManage_RunImporter_Pause_Schedule_Insert_Update_RestWebserviceController.class );
	

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetUserSessionActualUserLoggedIn_ForRestControllerIF getUserSessionActualUserLoggedIn_ForRestController;
	
	@Autowired
	private FileImport_RunImporter_PauseProcessing_Schedule_DAO_IF fileImport_RunImporter_PauseProcessing_Schedule_DAO;
	
	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	//  Convert JSON to byte[] so can cache it

	//  These 2 annotations work the same

	@PostMapping( 
			path = { 
					AA_WebappAdmin_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_WebappAdmin_RestWSControllerPaths_Constants.WEBAPP_ADMIN_MANAGE_IMPORTER_PIPELINE_EXECUTION__PAUSE_SCHEDULE_INSERT_UPDATE_REST_WEBSERVICE_CONTROLLER
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
		
//		if ( webserviceRequest.typeId == null ) {
//			String msg = "( webserviceRequest.typeId == null )";
//			log.warn( msg );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();	
//		}
		
		if ( webserviceRequest.scheduleJSON == null ) {
			String msg = "( webserviceRequest.scheduleJSON == null )";
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();	
		}
		
		//  webserviceRequest.scheduleJSON_PrevLastUpdated_Milliseconds_UTC can be null.  null when no current record in db
//		if ( webserviceRequest.scheduleJSON_PrevLastUpdated_Milliseconds_UTC == null ) {
//			String msg = "( webserviceRequest.scheduleJSON_PrevLastUpdated_Milliseconds_UTC == null )";
//			log.warn( msg );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();	
//		}
		
		final int scheduleJSON_Version = RunImporter_Schedule_PauseImporter_JSON_Root__V001.VERSION_NUMBER;
		
		try {  // Validate JSON is parsible 
			
			RunImporter_Schedule_PauseImporter_JSON_Root__V001 runImporter_Schedule_PauseImporter_JSON_Root__V001 = unmarshalJSON_ToObject.getObjectFromJSONString( webserviceRequest.scheduleJSON, RunImporter_Schedule_PauseImporter_JSON_Root__V001.class );
			
		} catch ( Throwable t ) {
			
			log.warn( "Failed to parse webserviceRequest.scheduleJSON as JSON to class RunImporter_Schedule_PauseImporter_JSON_Root__V001.  error: " + t.toString(), t );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();	
		}
		
		boolean scheduleJSON_PrevLastUpdated_Milliseconds_UTC_NOT_CURRENT_VALUE = false;
		
		if ( webserviceRequest.scheduleJSON_PrevLastUpdated_Milliseconds_UTC == null ) {
			
			//  Insert to DB
			
			try {
				fileImport_RunImporter_PauseProcessing_Schedule_DAO.insert(
						FileImport_RunImporter_PauseProcessing_Schedule_Type_ID_Enum.PAUSE_ALL,
						webserviceRequest.scheduleJSON, 
						scheduleJSON_Version);
				
			} catch ( DuplicateKeyException e ) {
				
				scheduleJSON_PrevLastUpdated_Milliseconds_UTC_NOT_CURRENT_VALUE = true;
			}

		} else {
		
			//  Update DB

			if ( ! fileImport_RunImporter_PauseProcessing_Schedule_DAO.update_for_Type_And_scheduleJSON_PrevLastUpdated_Milliseconds_UTC(
					FileImport_RunImporter_PauseProcessing_Schedule_Type_ID_Enum.PAUSE_ALL,
					webserviceRequest.scheduleJSON, 
					scheduleJSON_Version, 
					webserviceRequest.scheduleJSON_PrevLastUpdated_Milliseconds_UTC )) {
				
				scheduleJSON_PrevLastUpdated_Milliseconds_UTC_NOT_CURRENT_VALUE = true;
			}
		}

		WebserviceResult webserviceResult = new WebserviceResult();
		
		webserviceResult.scheduleJSON_PrevLastUpdated_Milliseconds_UTC_NOT_CURRENT_VALUE = scheduleJSON_PrevLastUpdated_Milliseconds_UTC_NOT_CURRENT_VALUE;
		if ( ! scheduleJSON_PrevLastUpdated_Milliseconds_UTC_NOT_CURRENT_VALUE ) {
			webserviceResult.statusSuccess = true;
		}
		
		return webserviceResult;
	}
	

	//////////////////

	public static class WebserviceRequest {

		//  private Integer typeId;  //  Assume to be Pause All
		
		private String scheduleJSON;
		private Integer scheduleJSON_PrevLastUpdated_Milliseconds_UTC;
		
		public void setScheduleJSON(String scheduleJSON) {
			this.scheduleJSON = scheduleJSON;
		}
		public void setScheduleJSON_PrevLastUpdated_Milliseconds_UTC(Integer scheduleJSON_PrevLastUpdated_Milliseconds_UTC) {
			this.scheduleJSON_PrevLastUpdated_Milliseconds_UTC = scheduleJSON_PrevLastUpdated_Milliseconds_UTC;
		}

	}

	public static class WebserviceResult {
		
		private boolean statusSuccess;
		private boolean scheduleJSON_PrevLastUpdated_Milliseconds_UTC_NOT_CURRENT_VALUE;

		public boolean isStatusSuccess() {
			return statusSuccess;
		}

		public boolean isScheduleJSON_PrevLastUpdated_Milliseconds_UTC_NOT_CURRENT_VALUE() {
			return scheduleJSON_PrevLastUpdated_Milliseconds_UTC_NOT_CURRENT_VALUE;
		}
		
	}
	
}
