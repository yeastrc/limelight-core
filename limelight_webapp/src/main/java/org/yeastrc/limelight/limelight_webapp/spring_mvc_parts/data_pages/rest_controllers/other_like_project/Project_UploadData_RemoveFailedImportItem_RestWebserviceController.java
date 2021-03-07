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
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dao.FileImportTracking_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * For Upload Data, Remove Failed Import Item
 *
 */
@RestController
public class Project_UploadData_RemoveFailedImportItem_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_UploadData_RemoveFailedImportItem_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private FileImportTrackingDAO_IF fileImportTrackingDAO;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	

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
					+ AA_RestWSControllerPaths_Constants.PROJECT__UPLOAD_DATA_REMOVE_FAILED_IMPORT_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webMethod(

    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	try {
    		//		log.warn( "changeUserAccessToProject(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
			
			//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

			if ( webserviceRequest.trackingId == null ) {
				String msg = "missing trackingId ";
				log.warn( msg );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( webserviceRequest.trackingId == 0 ) {
				String msg = "Provided tratrackingIdcking_id is zero, is = " + webserviceRequest.trackingId;
				log.warn( msg );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			FileImportTrackingDTO fileImportTrackingDTO = FileImportTracking_Shared_Get_DAO.getInstance().getItem( webserviceRequest.trackingId );
			if ( fileImportTrackingDTO == null ) {
				log.warn( "webserviceRequest.trackingId is not in database: " + webserviceRequest.trackingId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			int projectId = fileImportTrackingDTO.getProjectId();

			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );

			//  Restrict access to Project owners or above (admin), if project was not locked
			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
					validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
					.validateProjectOwnerAllowed( projectIds, httpServletRequest );
			
			////  End Auth Check
			
			UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();
			Integer userId = userSession.getUserId();
			if ( userId == null ) {
				String msg = "User Id should not be null";
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}

			WebserviceResult webserviceResult = getWebserviceResult( fileImportTrackingDTO, userId );

			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

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
	 * @param fileImportTrackingDTO
	 * @param fileImportStatus
	 * @return
	 * @throws Exception
	 */
	private WebserviceResult getWebserviceResult(
			FileImportTrackingDTO fileImportTrackingDTO, Integer userId ) throws Exception {
		
		int trackingId = fileImportTrackingDTO.getId();
		
		WebserviceResult webserviceResult = 
				checkDBForMarkDeleteFailedRecord( fileImportTrackingDTO );
		if ( webserviceResult != null ) {
			//  Either no update needed since marked for deletion or status not queued
			return webserviceResult;
		}
		boolean recordUpdated =
				fileImportTrackingDAO
				.updateMarkedForDeletionForIdStatus( 
						true /* markedForDeletion */, FileImportStatus.FAILED, trackingId, userId );
		if ( recordUpdated ) {
			webserviceResult = new WebserviceResult();
			webserviceResult.success = true;
			return webserviceResult;
		}
		//  No record updated so re-fetch the record to get current data for checking
		fileImportTrackingDTO = 
				FileImportTracking_Shared_Get_DAO.getInstance().getItem( trackingId );
		webserviceResult = 
				checkDBForMarkDeleteFailedRecord( fileImportTrackingDTO );
		if ( webserviceResult != null ) {
			//  Either no update needed since marked for deletion or status not queued
			return webserviceResult;
		}
		//  If got here, this is a system error
		String msg = "getWebserviceResult(...) trackingId" + trackingId 
				+ ".  Record not updated but status name is: " + fileImportTrackingDTO.getStatus().name();
		log.error( msg );
		throw new LimelightInternalErrorException(msg);
	}
	
	/**
	 * @param fileImportTrackingDTO
	 * @return null if next update the db
	 */
	private WebserviceResult checkDBForMarkDeleteFailedRecord( FileImportTrackingDTO fileImportTrackingDTO ) {
		
		if ( fileImportTrackingDTO.getStatus() != FileImportStatus.FAILED ) {
			//  error since no longer failed
			WebserviceResult webserviceResult = new WebserviceResult();
			webserviceResult.success = false;
			webserviceResult.statusNotFailed = true;
			return webserviceResult; // early return;
		}
		if ( fileImportTrackingDTO.isMarkedForDeletion() ) {
			//  already marked for deletion so ok
			WebserviceResult webserviceResult = new WebserviceResult();
			webserviceResult.success = true;
			webserviceResult.alreadyMarkedForDeletion = true;
			return webserviceResult; // early return;
		}
		return null;
	}

	/**
	 * 
	 *
	 */
	public static class WebserviceRequest {

		Integer trackingId;
		
		public Integer getTrackingId() {
			return trackingId;
		}
		public void setTrackingId(Integer trackingId) {
			this.trackingId = trackingId;
		}
	}

	/**
	 * 
	 *
	 */
	public static class WebserviceResult {
		
		boolean success;
		boolean statusNotFailed;
		boolean alreadyMarkedForDeletion;
		
		public boolean isSuccess() {
			return success;
		}
		public void setSuccess(boolean success) {
			this.success = success;
		}
		public boolean isAlreadyMarkedForDeletion() {
			return alreadyMarkedForDeletion;
		}
		public void setAlreadyMarkedForDeletion(boolean alreadyMarkedForDeletion) {
			this.alreadyMarkedForDeletion = alreadyMarkedForDeletion;
		}
		public boolean isStatusNotFailed() {
			return statusNotFailed;
		}
		public void setStatusNotFailed(boolean statusNotFailed) {
			this.statusNotFailed = statusNotFailed;
		}
	}

	

}
