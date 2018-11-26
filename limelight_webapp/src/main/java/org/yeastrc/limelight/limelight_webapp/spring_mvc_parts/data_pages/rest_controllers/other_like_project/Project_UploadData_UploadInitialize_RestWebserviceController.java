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
import java.io.FileWriter;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Request_Base;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Request_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Request_WebJSON;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Response_Base;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Response_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Response_WebJSON;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectIdIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappFileUploadFileSystemException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.constants.FileUploadSubmitterPgmSameMachineConstants;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.constants.LimelightXMLFileUploadWebConstants;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsLimelightXMLFileImportFullyConfiguredIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.Limelight_XML_Importer_Work_Directory_And_SubDirs_WebIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Marshal_RestRequest_Object_ToXML;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_XML_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * For Upload Data, Intialize a New Upload (called when user opens Upload overlay)
 *
 */
@RestController
public class Project_UploadData_UploadInitialize_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_UploadData_UploadInitialize_RestWebserviceController.class );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectIdIF validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId;
	
	@Autowired
	private IsLimelightXMLFileImportFullyConfiguredIF isLimelightXMLFileImportFullyConfigured;
	
	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private Limelight_XML_Importer_Work_Directory_And_SubDirs_WebIF limelight_XML_Importer_Work_Directory_And_SubDirs_Web;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	
	@Autowired
	private Unmarshal_RestRequest_XML_ToObject unmarshal_RestRequest_XML_ToObject;
	
	@Autowired
	private Marshal_RestRequest_Object_ToXML marshal_RestRequest_Object_ToXML;


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
					+ AA_RestWSControllerPaths_Constants.PROJECT__UPLOAD_DATA_UPLOAD_INITIALIZE_REST_WEBSERVICE_CONTROLLER
					+ AA_RestWSControllerPaths_Constants.PATH_PARAMETER_LABEL_WEBSERVICE_SYNC_TRACKING_PATH_ADDITION
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_JSON(

			@PathVariable(value = AA_RestWSControllerPaths_Constants.PATH_PARAMETER_LABEL_WEBSERVICE_SYNC_TRACKING) 
    		String webserviceSyncTracking,
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    
		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( webserviceSyncTracking );

		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

		if ( postBody == null ) {
			log.warn( "No Post Body" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		SubmitImport_Init_Request_WebJSON webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, SubmitImport_Init_Request_WebJSON.class );

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
		
		WebserviceMethod_Internal_Params webserviceMethod_Internal_Params = new WebserviceMethod_Internal_Params();
		webserviceMethod_Internal_Params.projectId = projectId;
		webserviceMethod_Internal_Params.userId = userId;
		webserviceMethod_Internal_Params.webserviceResult = new SubmitImport_Init_Response_WebJSON();
		
    	webserviceMethod_Internal( webserviceMethod_Internal_Params);
    	
		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceMethod_Internal_Params.webserviceResult );

		return ResponseEntity.ok().contentType( MediaType.APPLICATION_JSON ).body( responseAsJSON );
    }

	//    Submit Program: XML
	
	//  These 2 annotations work the same
	
	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	@PostMapping( 
			path = { 
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.PROJECT__UPLOAD_DATA_UPLOAD_INITIALIZE_FROM_SUBMIT_PGM_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_XML_VALUE, produces = MediaType.APPLICATION_XML_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_XML(

    		//  Remove since not in the 'path' in @PostMapping
//			@PathVariable(value = AA_RestWSControllerPaths_Constants.PATH_PARAMETER_LABEL_WEBSERVICE_SYNC_TRACKING) 
//    		String webserviceSyncTracking,
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
//    	String postBodyString = new String( postBody );
    	
    	SubmitImport_Init_Request_PgmXML webserviceRequest = null;

		Object webserviceRequestAsObject = unmarshal_RestRequest_XML_ToObject.getObjectFromXMLByteArray( postBody );
		if ( webserviceRequestAsObject == null ) {
			log.warn("webserviceRequestAsObject == null");
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		try {
			webserviceRequest = (SubmitImport_Init_Request_PgmXML) webserviceRequestAsObject;
		} catch ( Exception e ) {
			final String msg = "Failed to cast returned webserviceRequestAsObject from XML to SubmitImport_Init_Request_PgmXML."
					+ " webserviceRequestAsObject.getClass(): " + webserviceRequestAsObject.getClass();
			log.warn(msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		if ( StringUtils.isEmpty( webserviceRequest.getUserSubmitImportProgramKey() ) ) {
			final String msg = "UserSubmitImportProgramKey is empty.";
			log.warn(msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		SubmitImport_Init_Response_PgmXML webserviceResult = new SubmitImport_Init_Response_PgmXML();

		int projectId = getProjectId( webserviceRequest );
		
		Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result validateResult =
				validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId
				.validateProjectOwnerAllowed( 
						webserviceRequest.getUserSubmitImportProgramKey(),
						projectId, 
						webserviceResult );
    	
		if ( ! validateResult.isSuccess() ) {
			
			webserviceResult.setStatusSuccess( false );
			
			//  Reason set in validateResult by method validateProjectOwnerAllowed(...)
			
			byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );

			//  TODO  Return other than 200 code?
			return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
		}
		
		if ( validateResult.getUserId() == null ) {
			final String msg = "ERROR: validateResult.getUserId() == null";
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}
		
		boolean submitterSameMachine = false;
		
		if ( webserviceRequest.getSubmitterSameMachine() != null && webserviceRequest.getSubmitterSameMachine() ) {
			submitterSameMachine = true;
		}

		WebserviceMethod_Internal_Params webserviceMethod_Internal_Params = new WebserviceMethod_Internal_Params();
		webserviceMethod_Internal_Params.projectId = projectId;
		webserviceMethod_Internal_Params.userId = validateResult.getUserId();
		webserviceMethod_Internal_Params.webserviceResult = webserviceResult;
		
		WebserviceMethod_Internal_Results webserviceMethod_Internal_Results = 
				webserviceMethod_Internal( webserviceMethod_Internal_Params );

		File createdSubDir = webserviceMethod_Internal_Results.createdSubDir;
		
		if ( submitterSameMachine ) {
			//  A program running on the same machine is submitting:
			//   Pass it the upload directory
			//   Pass it the filename that will contain the key required when 
			//        the submitter passes full filename paths to the files to process.
			//  Generate a random string
			StringBuilder submitterKeySB = new StringBuilder( 200 );
			for ( int i = 0; i < 15; i++ ) {
				double submitterKeyMultiplier = Math.random();
				if ( submitterKeyMultiplier < 0.5 ) {
					submitterKeyMultiplier += 0.5;
				}
				long submitterKeyLong = (long) ( System.currentTimeMillis() * submitterKeyMultiplier );
				submitterKeySB.append( Long.toHexString( submitterKeyLong ) );
			}
			String submitterKey = submitterKeySB.toString();
			//   Write the string to the file
			File submitterKeyFile = new File( 
					createdSubDir, 
					FileUploadSubmitterPgmSameMachineConstants.SUBMITTER_KEY_FILENAME );
			FileWriter fileWriter = null;
			try {
				fileWriter = new FileWriter( submitterKeyFile );
				fileWriter.write( submitterKey );
			} catch ( Exception e ) {
				log.error( "Fail to write to submitterKeyFile file: " + submitterKeyFile.getAbsolutePath() );
			} finally {
				try {
					if ( fileWriter != null ) {
						fileWriter.close();
					}
				} catch ( Exception e ) {
					log.error( "Fail to close submitterKeyFile file: " + submitterKeyFile.getAbsolutePath() );
				}
			}
			//  Update the response with the subdirectory name 
			webserviceResult.setUploadTempSubdir( createdSubDir.getName() );
		}

		byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );

		return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
    }
    
    /**
     * @param webserviceRequest
     * @return
     */
    private int getProjectId( SubmitImport_Init_Request_Base webserviceRequest ) {

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
	private WebserviceMethod_Internal_Results webserviceMethod_Internal( WebserviceMethod_Internal_Params webserviceMethod_Internal_Params ) throws Exception {
		
		int projectId = webserviceMethod_Internal_Params.projectId;
		int userId = webserviceMethod_Internal_Params.userId;
		SubmitImport_Init_Response_Base webserviceResult = webserviceMethod_Internal_Params.webserviceResult;
		
		WebserviceMethod_Internal_Results methodResults = new WebserviceMethod_Internal_Results();
		
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
			webserviceResult.setStatusSuccess(false);
			webserviceResult.setProjectLocked(true);
			return methodResults;  //  EARLY EXIT
		}
		File importer_Work_Directory = Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		//  Get the File object for the Base Subdir used to first store the files in this request 
		String uploadFileTempDirString =
				limelight_XML_Importer_Work_Directory_And_SubDirs_Web.getDirForUploadFileTempDir();
		File uploadFileTempDir = new File( importer_Work_Directory, uploadFileTempDirString );
		if ( ! uploadFileTempDir.exists() ) {
//			boolean mkdirResult = 
			uploadFileTempDir.mkdir();
		}
		if ( ! uploadFileTempDir.exists() ) {
			String msg = "uploadFileTempDir does not exist after testing for it and attempting to create it.  uploadFileTempDir: " 
					+ uploadFileTempDir.getAbsolutePath();
			log.error( msg );
			throw new LimelightWebappFileUploadFileSystemException(msg);
		}
		
		//  Create a subdir for this upload
		long uploadKey = System.currentTimeMillis();
		File createdSubDir = null;
		int retryCreateSubdirCount = 0;
		while ( createdSubDir == null ) {
			retryCreateSubdirCount++;
			if ( retryCreateSubdirCount > 4 ) {
				String msg = "Failed to create subdir after 4 attempts.";
				log.error( msg );
				throw new LimelightWebappFileUploadFileSystemException(msg);
			}
			int uploadKeyIncrement = (int) ( Math.random() * 10 ) + 5;
			uploadKey += uploadKeyIncrement;
			createdSubDir =
					limelight_XML_Importer_Work_Directory_And_SubDirs_Web
					.createSubDirForUploadFileTempDir( userId, uploadKey, uploadFileTempDir );
		}
		
		//  Create a file in the directory to track the create date/time of the directory
		File createdDirFile = new File( createdSubDir, LimelightXMLFileUploadWebConstants.UPLOAD_FILE_TEMP_SUB_DIR_CREATE_TRACKING_FILE );
		if ( ! createdDirFile.createNewFile() ) {
			String msg = "Failed to create file in subdir: " + createdDirFile.getCanonicalPath();
			log.error( msg );
			throw new LimelightWebappFileUploadFileSystemException(msg);
		}
		String uploadKeyString = Long.toString( uploadKey );
		
		webserviceResult.setStatusSuccess( true );
		webserviceResult.setUploadKey( uploadKeyString );
		
		methodResults.createdSubDir = createdSubDir;
		
		return methodResults;
	}

	/**
	 * Params to internal method webserviceMethod_Internal
	 *
	 */
	private static class WebserviceMethod_Internal_Params {

		int projectId; 
		int userId;
		SubmitImport_Init_Response_Base webserviceResult; 
	}

	/**
	 * Results from internal method webserviceMethod_Internal
	 *
	 */
	private static class WebserviceMethod_Internal_Results {

		File createdSubDir;
	}
	
	//////   WebserviceRequest and WebserviceResult classes
	
	//   Now uses specific classes from: limelight_submit_import_client_connector
	//       (org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects) 
	
	/**
	 * 
	 *
	 */
//	public static class WebserviceRequest {
//		
//		private String projectIdentifier;
//		private Boolean submitterSameMachine;
//
//		public String getProjectIdentifier() {
//			return projectIdentifier;
//		}
//		public void setProjectIdentifier(String projectIdentifier) {
//			this.projectIdentifier = projectIdentifier;
//		}
//		public Boolean getSubmitterSameMachine() {
//			return submitterSameMachine;
//		}
//		public void setSubmitterSameMachine(Boolean submitterSameMachine) {
//			this.submitterSameMachine = submitterSameMachine;
//		}
//	}
	
	/**
	 * 
	 *
	 */
//	public static class WebserviceResult {
//		
//		private String uploadKey;
//		private boolean statusSuccess;
//		private boolean projectLocked; 
//		//  Added for processing submit from same machine
//		private String uploadTempSubdir;
//		
//		public String getUploadKey() {
//			return uploadKey;
//		}
//		public void setUploadKey(String uploadKey) {
//			this.uploadKey = uploadKey;
//		}
//		public boolean isStatusSuccess() {
//			return statusSuccess;
//		}
//		public void setStatusSuccess(boolean statusSuccess) {
//			this.statusSuccess = statusSuccess;
//		}
//		public boolean isProjectLocked() {
//			return projectLocked;
//		}
//		public void setProjectLocked(boolean projectLocked) {
//			this.projectLocked = projectLocked;
//		}
//		public String getUploadTempSubdir() {
//			return uploadTempSubdir;
//		}
//		public void setUploadTempSubdir(String uploadTempSubdir) {
//			this.uploadTempSubdir = uploadTempSubdir;
//		}
//
//	}



}
