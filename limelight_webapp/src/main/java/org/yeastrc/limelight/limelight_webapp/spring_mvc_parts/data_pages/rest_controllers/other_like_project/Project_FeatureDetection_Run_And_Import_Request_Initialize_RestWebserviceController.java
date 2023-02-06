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

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.constants.FileUploadCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.constants.FileImportPipelineRunCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.enum_classes.FileImportAndPipelineRun_RequestType;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappFileUploadFileSystemException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsLimelightXMLFileImportFullyConfiguredIF;
import org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.dao.FileImportAndPipelineRunTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.dao.FileImportAndPipelineRunTrackingIdCreatorDAO_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Feature Detection Run -  Run Feature Detection (Hardklor and Bullseye) on the selected scan file given the uploaded Hardklor.conf and Bullseye.conf files.
 * 
 * Webservices called:
 * 
 * Initialize:  this webservice
 * Upload Hardklor Conf file
 * Upload Bullseye Conf file
 * Submit
 * 
 * General INFO:  This uses the generic import and run table:  import_and_pipeline_run_tracking_tbl  and its children
 * 
 * 
 * OLD CODE:
 * 
 * WARNING:  The Submit Import Program will show the value of BaseSubmitImportWebserviceResponse.statusFail_ErrorMessage when set
 * 			 and will NO LONGER check the boolean flags (other than statusSuccess).
 * 			 So the property BaseSubmitImportWebserviceResponse.statusFail_ErrorMessage will be REQUIRED to be set for all errors. 
 *
 */
@RestController
public class Project_FeatureDetection_Run_And_Import_Request_Initialize_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_FeatureDetection_Run_And_Import_Request_Initialize_RestWebserviceController.class );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private IsLimelightXMLFileImportFullyConfiguredIF isLimelightXMLFileImportFullyConfigured;
	
	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private FileImportAndPipelineRunTrackingIdCreatorDAO_IF fileImportAndPipelineRunTrackingIdCreatorDAO;

	@Autowired
	private FileImportAndPipelineRunTrackingDAO_IF fileImportAndPipelineRunTrackingDAO;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	
	/////////////////////////////////////////////////////

	//   Separate called methods for From Web App and From Submit Program since local code is managing the parsing the request and serializing the response 
	
	//  Convert result object graph to JSON or XML in byte[] in the controller body so can cache it

	//     From Web App JSON
	
	//  These 2 annotations work the same
	
	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	@PostMapping( 
			path = { 
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.PROJECT__FEATURE_DETECTION_RUN_AND_IMPORT_INITIALIZE_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_JSON(

    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    
		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

		if ( postBody == null ) {
			log.warn( "No Post Body" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

		int projectId = getProjectId( webserviceRequest );

		List<Integer> projectIds = new ArrayList<>( 1 );
		projectIds.add( projectId );

		//  Restrict access to Project owners or above (admin), if project was not locked
		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
				validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
				.validateProjectOwnerAllowed( projectIds, httpServletRequest );

		//  If NOT Limelight XML File Import is Fully Configured, 
		if ( ! isLimelightXMLFileImportFullyConfigured.isLimelightXMLFileImportFullyConfigured() ) {
			String msg = "Limelight XML File Import is NOT Fully Configured ";
			log.error( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();
		if ( userSession == null ) {
			throw new LimelightInternalErrorException( "userSession should not be null" );
		}
		Integer userId = userSession.getUserId();
		if ( userId == null ) {
			throw new LimelightInternalErrorException( "userId should not be null" );
		}
		
		WebserviceResponse webserviceResponse = 
				webserviceMethod_Internal( webserviceRequest, projectId, userId, httpServletRequest );
    	
		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResponse );

		return ResponseEntity.ok().contentType( MediaType.APPLICATION_JSON ).body( responseAsJSON );
    }
    
    /**
     * @param webserviceRequest
     * @return
     */
    private int getProjectId( WebserviceRequest webserviceRequest ) {

		String projectIdentifier = webserviceRequest.projectIdentifier;

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
		return projectId;
    }

	/**
	 *  
	 * 
	 * 
	 * @param request
	 * @param projectId
	 * @throws Exception
	 * @throws LimelightInternalErrorException
	 */
	private WebserviceResponse webserviceMethod_Internal( 
			
			WebserviceRequest webserviceRequest, 
			int projectId, 
			Integer userId, 
			HttpServletRequest httpServletRequest ) throws Exception {
		
		
		String requestURL = httpServletRequest.getRequestURL().toString();
		String remoteUserIpAddress = httpServletRequest.getRemoteAddr();
		
		WebserviceResponse webserviceResponse = new WebserviceResponse();
		
		//  Confirm projectId is in database
		ProjectDTO projectDTO =	projectDAO.getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( projectId );
		if ( projectDTO == null ) {
			// should never happen
			String msg = "Project id is not in database " + projectId;
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		if ( ( ! projectDTO.isEnabled() ) || ( projectDTO.isMarkedForDeletion() ) ) {
			String msg = "Project id is disabled or marked for deletion: " + projectId;
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		if ( ( projectDTO.isProjectLocked() ) ) {
			String msg = "Project id is locked: " + projectId;
			log.warn( msg );
			webserviceResponse.statusSuccess = false;
			webserviceResponse.setProjectLocked(true);
			// webserviceResponse.setStatusFail_ErrorMessage( "Unable to upload to this project as it is Locked." );
			return webserviceResponse;  //  EARLY EXIT
		}
		
		//  Upload Directory for files
		
		File importer_Work_Directory = Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		
		//  Get the File object for the Base Subdir used to first store the files in this request 
		String uploadFileDirString = FileImportPipelineRunCommonConstants.IMPORT_AND_PIPELINE_RUN__BASE_DIR;
		
		File uploadFileDir = new File( importer_Work_Directory, uploadFileDirString );
		
		if ( ! uploadFileDir.exists() ) {
//			boolean mkdirResult = 
			uploadFileDir.mkdir();
		}
		if ( ! uploadFileDir.exists() ) {
			String msg = "uploadFileDir does not exist after testing for it and attempting to create it.  uploadFileDir: " 
					+ uploadFileDir.getAbsolutePath();
			log.error( msg );
			throw new LimelightWebappFileUploadFileSystemException(msg);
		}
		
		//  Create a subdir for this upload
		

		int importTrackingId = fileImportAndPipelineRunTrackingIdCreatorDAO.getNextId();
		
		String dirNameForImportTrackingId =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().getDirForImportTrackingId( importTrackingId );
		File dirForImportTrackingId  =  new File( uploadFileDir , dirNameForImportTrackingId );
		if ( dirForImportTrackingId.exists() ) {
			String msg = "dirForImportTrackingId already exists: " + dirForImportTrackingId.getAbsolutePath();
			log.error( msg );
			throw new Exception(msg);
		}
		if ( ! dirForImportTrackingId.mkdir() ) {
			String msg = "Failed to make dirForImportTrackingId: " + dirForImportTrackingId.getAbsolutePath();
			log.error( msg );
			throw new Exception(msg);
		}
		
		//  Main File Import Tracking Object
		FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO = new FileImportAndPipelineRunTrackingDTO();
		fileImportAndPipelineRunTrackingDTO.setId( importTrackingId );
		fileImportAndPipelineRunTrackingDTO.setRequestType( FileImportAndPipelineRun_RequestType.FEATURE_DETECTION_HARDKLOR_BULLSEYE_RUN_AND_IMPORT );
		fileImportAndPipelineRunTrackingDTO.setStatus( FileImportStatus.INIT_INSERT_PRE_QUEUED );
		fileImportAndPipelineRunTrackingDTO.setPriority( FileUploadCommonConstants.PRIORITY_STANDARD );
		fileImportAndPipelineRunTrackingDTO.setProjectId( projectId );
		fileImportAndPipelineRunTrackingDTO.setUserId( userId );
		fileImportAndPipelineRunTrackingDTO.setInsertRequestURL( requestURL );
		fileImportAndPipelineRunTrackingDTO.setInsertRequest_RemoteUserIpAddress( remoteUserIpAddress );

		
		//  Save to the DB
		fileImportAndPipelineRunTrackingDAO.save(fileImportAndPipelineRunTrackingDTO);
		
		String uploadKeyString = Long.toString(importTrackingId);
		
		webserviceResponse.setStatusSuccess( true );
		webserviceResponse.setUploadKey( uploadKeyString );
				
		return webserviceResponse;
	}

	
	//////   WebserviceRequest and WebserviceResult classes

	public static class WebserviceRequest {
		
		private String projectIdentifier;

		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
	}

	public static class WebserviceResponse {

		private boolean statusSuccess;

		private String uploadKey;
		
		private boolean projectLocked;

		public String getUploadKey() {
			return uploadKey;
		}

		public boolean isProjectLocked() {
			return projectLocked;
		}

		public boolean isStatusSuccess() {
			return statusSuccess;
		}

		public void setStatusSuccess(boolean statusSuccess) {
			this.statusSuccess = statusSuccess;
		}

		public void setUploadKey(String uploadKey) {
			this.uploadKey = uploadKey;
		}

		public void setProjectLocked(boolean projectLocked) {
			this.projectLocked = projectLocked;
		} 
		
	}
}
