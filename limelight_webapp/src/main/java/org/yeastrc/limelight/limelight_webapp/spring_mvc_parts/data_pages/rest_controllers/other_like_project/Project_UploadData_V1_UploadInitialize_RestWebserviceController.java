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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.constants.FileUploadCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataFromInitJSONBlob_DTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataFromInitJSON_Contents_Version_Number_001;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataFromInitJSON_Contents_Version_Number_001.FileImportTrackingDataFromInitJSON_Contents__SingleFileUploadEntry__Version_Number_001;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;
import org.yeastrc.limelight.limelight_submit_import_client_connector.constants.Limelight_SubmitImport_Version_Constants;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Request_Base;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Request_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Request_SubPart_SingleFileUploadEntry;
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
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingDataFromInitJSONBlob_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingFileIdCreatorDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsFileObjectStorageFileImportAllowedViaWebSubmit_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsLimelightXMLFileImportFullyConfiguredIF;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.SpectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Marshal_RestRequest_Object_ToXML;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_XML_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * For Upload Data, Initialize a New Upload (called when start of a send files/data for import)
 * 
 * WARNING:  The Submit Import Program will show the value of BaseSubmitImportWebserviceResponse.statusFail_ErrorMessage when set
 * 			 and will NO LONGER check the boolean flags (other than statusSuccess).
 * 			 So the property BaseSubmitImportWebserviceResponse.statusFail_ErrorMessage will be REQUIRED to be set for all errors. 
 *
 */
@RestController
public class Project_UploadData_V1_UploadInitialize_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_UploadData_V1_UploadInitialize_RestWebserviceController.class );
	
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
	private SpectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest_IF spectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest;

	@Autowired
	private IsFileObjectStorageFileImportAllowedViaWebSubmit_IF isFileObjectStorageFileImportAllowedViaWebSubmit;

	@Autowired
	private FileImportTrackingFileIdCreatorDAO_IF fileImportTrackingFileIdCreatorDAO;

	@Autowired
	private FileImportTrackingDAO_IF fileImportTrackingDAO;
	
	@Autowired
	private FileImportTrackingDataFromInitJSONBlob_DAO_IF fileImportTrackingDataFromInitJSONBlob_DAO;
	
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
		
		SubmitImport_Init_Response_WebJSON webserviceResult_JSON = new SubmitImport_Init_Response_WebJSON();
		
		WebserviceMethod_Internal_Params webserviceMethod_Internal_Params = new WebserviceMethod_Internal_Params();
		webserviceMethod_Internal_Params.projectId = projectId;
		webserviceMethod_Internal_Params.userId = userId;
		webserviceMethod_Internal_Params.webserviceResult = webserviceResult_JSON;
		webserviceMethod_Internal_Params.requestURL = httpServletRequest.getRequestURL().toString();
		webserviceMethod_Internal_Params.remoteUserIpAddress = httpServletRequest.getRemoteHost();
		webserviceMethod_Internal_Params.submitImport_Init_Request_WebJSON = webserviceRequest;
		webserviceMethod_Internal_Params.submitImport_Init_Request_Base = webserviceRequest;
		
		try {
			webserviceResult_JSON.setAccepted_ScanFilename_Suffix_List( spectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest.get_Supported_ScanFileSuffixes() );
		} catch ( Throwable t) {
			// Eat Exception
		}
		
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
		} catch ( Throwable e ) {
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
		
		String userSubmitImportProgramKey_First_5_characters = webserviceRequest.getUserSubmitImportProgramKey().substring(0, 5);
		
		SubmitImport_Init_Response_PgmXML webserviceResult = new SubmitImport_Init_Response_PgmXML();

		if ( webserviceRequest.getSubmitProgramVersionNumber() == null ) {
			
			log.warn( "webserviceRequest.getSubmitProgramVersionNumber() == null. webserviceRequest.getProjectIdentifier(): " + webserviceRequest.getProjectIdentifier()
					+ ", userSubmitImportProgramKey_First_5_characters: " + userSubmitImportProgramKey_First_5_characters );
			
			webserviceResult.setStatusSuccess( false );

			webserviceResult.setStatusFail_ErrorMessage( "Submit Import Program version is too old.  Get program from limelight webapp submitting to." );

			byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );

			//  TODO  Return other than 200 code?
			return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
		}

		if ( webserviceRequest.getSubmitProgramVersionNumber().intValue() < Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__MINUMUM__VERSION_NUMBER ) {
			
			log.warn( "webserviceRequest.getSubmitProgramVersionNumber() < Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__MINUMUM__VERSION_NUMBER.  SubmitProgramVersionNumber in request: "
					+ webserviceRequest.getSubmitProgramVersionNumber().intValue()
					+ ", SUBMIT_PROGRAM__MINUMUM__VERSION_NUMBER: " + Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__MINUMUM__VERSION_NUMBER
					+ ", webserviceRequest.getProjectIdentifier(): " + webserviceRequest.getProjectIdentifier()
					+ ", userSubmitImportProgramKey_First_5_characters: " + userSubmitImportProgramKey_First_5_characters );
			
			webserviceResult.setStatusSuccess( false );
			webserviceResult.setSubmitProgramVersionNumber_NotAccepted(true);
			webserviceResult.setSubmitProgramVersionNumber_Current_Per_Webapp( Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__CURRENT__VERSION_NUMBER );
			webserviceResult.setStatusFail_ErrorMessage( "Submit Import Program version is too old.  Get program from limelight webapp submitting to." );
			
			byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );

			//  TODO  Return other than 200 code?
			return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
		}
		
		int projectId = getProjectId( webserviceRequest );
		
		Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result validateResult =
				validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId
				.validateProjectOwnerAllowed( 
						webserviceRequest.getUserSubmitImportProgramKey(),
						projectId, 
						webserviceResult );
    	
		if ( ! validateResult.isSuccess() ) {
			
			webserviceResult.setStatusSuccess( false );

			if ( log.isInfoEnabled() ) {
				
				if ( validateResult.getUserId() == null ) {
					log.info( "Validate Access: Result is Fail: Cannot find User for UserSubmitImportProgramKey.  Error mesage returned to Submit program: " + webserviceResult.getStatusFail_ErrorMessage() );
				} else {
					log.info( "Validate Access: Result is Fail: User does not have Project Owner access or project is locked.  UserId: " + validateResult.getUserId() 
							+ ", projectId: " + projectId
							+ ".  Error mesage returned to Submit program: " + webserviceResult.getStatusFail_ErrorMessage() );
				}
			}
			
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

		//  If NOT Limelight XML File Import is Fully Configured, 
		if ( ! isLimelightXMLFileImportFullyConfigured.isLimelightXMLFileImportFullyConfigured() ) {
			String msg = "Limelight Installation not configured to allow Import Submissions.  Limelight XML File Import is NOT Fully Configured ";
			log.warn( msg );
			
			webserviceResult.setStatusFail_ErrorMessage( "Limelight Installation not configured to allow Import Submissions" );

			byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );

			//  TODO  Return other than 200 code?
			return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
		}
		
		
		boolean submitterSameMachine = false;
		
		if ( webserviceRequest.getSubmitterSameMachine() != null && webserviceRequest.getSubmitterSameMachine().booleanValue() ) {
			submitterSameMachine = true;
		}

		WebserviceMethod_Internal_Params webserviceMethod_Internal_Params = new WebserviceMethod_Internal_Params();
		webserviceMethod_Internal_Params.projectId = projectId;
		webserviceMethod_Internal_Params.userId = validateResult.getUserId();
		webserviceMethod_Internal_Params.webserviceResult = webserviceResult;
		webserviceMethod_Internal_Params.requestURL = httpServletRequest.getRequestURL().toString();
		webserviceMethod_Internal_Params.remoteUserIpAddress = httpServletRequest.getRemoteHost();
		webserviceMethod_Internal_Params.submitImport_Init_Request_PgmXML = webserviceRequest;
		webserviceMethod_Internal_Params.submitImport_Init_Request_Base = webserviceRequest;
		
		WebserviceMethod_Internal_Results webserviceMethod_Internal_Results = 
				webserviceMethod_Internal( webserviceMethod_Internal_Params );

		File createdSubDir = webserviceMethod_Internal_Results.createdSubDir;
		
		if ( submitterSameMachine ) {

			this.create_submitterSameMachine_File( createdSubDir );

			//  Update the response with the subdirectory name 
			webserviceResult.setUploadTempSubdir( createdSubDir.getName() );
		}
		
		if ( webserviceRequest.getSubmitProgramVersionNumber() != null && webserviceRequest.getSubmitProgramVersionNumber().intValue() >= 4 ) {

			//  accepted_ScanFilename_Suffix_List property added in Submit Program Version 4
			
			try {
				webserviceResult.setAccepted_ScanFilename_Suffix_List( spectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest.get_Supported_ScanFileSuffixes() );
			} catch ( Throwable t) {
				// Eat Exception
			}
		}

		if ( webserviceRequest.getSubmitProgramVersionNumber() != null && webserviceRequest.getSubmitProgramVersionNumber().intValue() >= 8 ) {

			//  fastaFileSubmit_Configured property added in Submit Program Version 8
			
			try {
				if ( isFileObjectStorageFileImportAllowedViaWebSubmit.isFileObjectStorageFileImportAllowedViaWebSubmit() ) {
					
					webserviceResult.setFastaFileSubmit_Configured(true);
				}
			} catch ( Throwable t) {
				// Eat Exception
			}
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

		String requestURL = webserviceMethod_Internal_Params.requestURL;
		String remoteUserIpAddress = webserviceMethod_Internal_Params.remoteUserIpAddress;
		
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
			webserviceResult.setStatusFail_ErrorMessage( "Unable to upload to this project as it is Locked." );
			return methodResults;  //  EARLY EXIT
		}
		File importer_Work_Directory = Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();

		//  Get the File object for the Base Subdir used to store the files in this request 
		File importFilesBaseDir = new File( importer_Work_Directory, FileUploadCommonConstants.IMPORT_BASE_DIR );
		if ( ! importFilesBaseDir.exists() ) {
//				boolean mkdirResult = 
			importFilesBaseDir.mkdir();
		}
		if ( ! importFilesBaseDir.exists() ) {
			String msg = "importFilesBaseDir does not exist after testing for it and attempting to create it.  importFilesBaseDir: " 
					+ importFilesBaseDir.getAbsolutePath();
			log.error( msg );
			throw new LimelightWebappFileUploadFileSystemException(msg);
		}
		
		//  Directory for This new Import
		
		int importTrackingId = fileImportTrackingFileIdCreatorDAO.getNextId();

		String dirNameForImportTrackingId =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().getDirForImportTrackingId( importTrackingId );
		File dirForImportTrackingId  =  new File( importFilesBaseDir , dirNameForImportTrackingId );
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
		FileImportTrackingDTO fileImportTrackingDTO = new FileImportTrackingDTO();
		fileImportTrackingDTO.setId( importTrackingId );
		fileImportTrackingDTO.setStatus( FileImportStatus.INIT_INSERT_PRE_QUEUED );
		fileImportTrackingDTO.setPriority( FileUploadCommonConstants.PRIORITY_STANDARD );
		fileImportTrackingDTO.setProjectId( projectId );
		fileImportTrackingDTO.setUserId( userId );
		fileImportTrackingDTO.setSearchName( webserviceMethod_Internal_Params.submitImport_Init_Request_Base.getSearchName() );
		fileImportTrackingDTO.setSearchShortName( webserviceMethod_Internal_Params.submitImport_Init_Request_Base.getSearchShortName() );
		fileImportTrackingDTO.setSearchPath( webserviceMethod_Internal_Params.submitImport_Init_Request_Base.getSearchPath() );
		fileImportTrackingDTO.setInitRequestURL( requestURL );
		fileImportTrackingDTO.setRemoteUserIpAddressInit( remoteUserIpAddress );

		fileImportTrackingDAO.save( fileImportTrackingDTO );
		
		
		if ( webserviceMethod_Internal_Params.submitImport_Init_Request_Base.getFiles_InSubmitImport() != null 
				&& ( ! webserviceMethod_Internal_Params.submitImport_Init_Request_Base.getFiles_InSubmitImport().isEmpty() ) ) {

			List<FileImportTrackingDataFromInitJSON_Contents__SingleFileUploadEntry__Version_Number_001> singleFileUploadEntry_List = new ArrayList<>( webserviceMethod_Internal_Params.submitImport_Init_Request_Base.getFiles_InSubmitImport().size() ); 

			for ( SubmitImport_Init_Request_SubPart_SingleFileUploadEntry submitImport_Init_Request_SubPart_SingleFileUploadEntry : webserviceMethod_Internal_Params.submitImport_Init_Request_Base.getFiles_InSubmitImport() ) {

				FileImportTrackingDataFromInitJSON_Contents__SingleFileUploadEntry__Version_Number_001 JSON_Contents__SingleFileUploadEntry__Version_Number_001 = new FileImportTrackingDataFromInitJSON_Contents__SingleFileUploadEntry__Version_Number_001();
				JSON_Contents__SingleFileUploadEntry__Version_Number_001.setFileIndex( submitImport_Init_Request_SubPart_SingleFileUploadEntry.getFileIndex() );		
				JSON_Contents__SingleFileUploadEntry__Version_Number_001.setFileType( submitImport_Init_Request_SubPart_SingleFileUploadEntry.getFileType() );
				JSON_Contents__SingleFileUploadEntry__Version_Number_001.setFilename( submitImport_Init_Request_SubPart_SingleFileUploadEntry.getFilename() );
				JSON_Contents__SingleFileUploadEntry__Version_Number_001.setUploadFileSize( submitImport_Init_Request_SubPart_SingleFileUploadEntry.getUploadFileSize() );
				JSON_Contents__SingleFileUploadEntry__Version_Number_001.setCanonicalFilename_W_Path_OnSubmitMachine( submitImport_Init_Request_SubPart_SingleFileUploadEntry.getCanonicalFilename_W_Path_OnSubmitMachine() );
				JSON_Contents__SingleFileUploadEntry__Version_Number_001.setAbsoluteFilename_W_Path_OnSubmitMachine( submitImport_Init_Request_SubPart_SingleFileUploadEntry.getAbsoluteFilename_W_Path_OnSubmitMachine() );
				
				singleFileUploadEntry_List.add(JSON_Contents__SingleFileUploadEntry__Version_Number_001);
			}

			FileImportTrackingDataFromInitJSON_Contents_Version_Number_001 fileImportTrackingDataFromInitJSON_Contents_Version_Number_001 = new FileImportTrackingDataFromInitJSON_Contents_Version_Number_001();

			fileImportTrackingDataFromInitJSON_Contents_Version_Number_001.setSingleFileUploadEntry_List(singleFileUploadEntry_List);

			String jsonContents = marshalObjectToJSON.getJSONString( fileImportTrackingDataFromInitJSON_Contents_Version_Number_001 );

			FileImportTrackingDataFromInitJSONBlob_DTO fileImportTrackingDataFromInitJSONBlob_DTO = new FileImportTrackingDataFromInitJSONBlob_DTO();

			fileImportTrackingDataFromInitJSONBlob_DTO.setFileImportTrackingId(importTrackingId);
			fileImportTrackingDataFromInitJSONBlob_DTO.setJsonContents_FormatVersion(FileImportTrackingDataFromInitJSON_Contents_Version_Number_001.VERSION_NUMBER_001);
			fileImportTrackingDataFromInitJSONBlob_DTO.setJsonContents(jsonContents);

			fileImportTrackingDataFromInitJSONBlob_DAO.save(fileImportTrackingDataFromInitJSONBlob_DTO);
		}

		String uploadKeyString = String.valueOf( importTrackingId );
		
		webserviceResult.setStatusSuccess( true );
		webserviceResult.setUploadKey( uploadKeyString );
		
		methodResults.createdSubDir = dirForImportTrackingId;

		if ( log.isInfoEnabled() ) {
			
			String submitterProgramData = "";
			
			if ( webserviceMethod_Internal_Params.submitImport_Init_Request_PgmXML != null ) {
				
				submitterProgramData = ", SubmitProgramVersionNumber: " +  webserviceMethod_Internal_Params.submitImport_Init_Request_PgmXML.getSubmitProgramVersionNumber();
			}
			
			
			log.info( "Successful Init Submit Upload.  UserId: " + webserviceMethod_Internal_Params.userId
					+ ", project id: " + webserviceMethod_Internal_Params.projectId
					+ ", upload key: " + uploadKeyString
					+ ", request URL: " + webserviceMethod_Internal_Params.requestURL
					+ submitterProgramData );
		}
		
		return methodResults;
	}

    /**
     * @param createdSubDir
     * @throws Exception
     */
    private void create_submitterSameMachine_File( File createdSubDir ) throws Exception {
    	
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
		
		File importer_Work_Directory = Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		
		this.create_submitterSameMachine_File_InSpecificSubDirName( 
				submitterKey,
				FileUploadCommonConstants.IMPORT_BASE_DIR,
				createdSubDir, importer_Work_Directory );

		///  Create here to support Old Submit Import Program
		this.create_submitterSameMachine_File_InSpecificSubDirName( 
				submitterKey,
				FileUploadCommonConstants.UPLOAD_FILE_TEMP_BASE_DIR,
				createdSubDir, importer_Work_Directory );
    }
    
    /**
     * @param submitterKey
     * @param importer_Work_Directory_SubdirName
     * @param createdSubDir
     * @param importer_Work_Directory
     */
    private void create_submitterSameMachine_File_InSpecificSubDirName( 
    		
    		String submitterKey, 
    		String importer_Work_Directory_SubdirName, 
    		File createdSubDir,
    		File importer_Work_Directory ) {
    	

		File uploadFileTempDir = new File( importer_Work_Directory, importer_Work_Directory_SubdirName );

		if ( ! uploadFileTempDir.exists() ) {
			uploadFileTempDir.mkdir();
		}
		if ( ! uploadFileTempDir.exists() ) {
			log.error( "Fail to create dir uploadFileTempDir to hold submitterKeyFile file. uploadFileTempDir: " + uploadFileTempDir.getAbsolutePath() );
		} else {
			
			File createdSubDir_Under_TempUploadTempDir = new File( uploadFileTempDir, createdSubDir.getName() );  //  Use same Subdir name as for main import
			
			if ( ! createdSubDir_Under_TempUploadTempDir.exists() ) {
				createdSubDir_Under_TempUploadTempDir.mkdir();
			}
			if ( ! createdSubDir_Under_TempUploadTempDir.exists() ) {
				log.error( "Fail to create dir createdSubDir_Under_TempUploadTempDir to hold submitterKeyFile file. uploadFileTempDir: " + createdSubDir_Under_TempUploadTempDir.getAbsolutePath() );
			} else {

				File submitterKeyFile = new File( 
						createdSubDir_Under_TempUploadTempDir,  // Place under this dir since the old Submit Import Program expects it here 
						FileUploadSubmitterPgmSameMachineConstants.SUBMITTER_KEY_FILENAME );
				FileWriter fileWriter = null;
				try {
					fileWriter = new FileWriter( submitterKeyFile );
					fileWriter.write( submitterKey );
				} catch ( Exception e ) {
					log.error( "Fail to write to submitterKeyFile file: " + submitterKeyFile.getAbsolutePath(), e );
				} finally {
					try {
						if ( fileWriter != null ) {
							fileWriter.close();
						}
					} catch ( Exception e ) {
						log.error( "Fail to close submitterKeyFile file: " + submitterKeyFile.getAbsolutePath(), e );
					}
				}
			}
		}
    }
    
	/**
	 * Params to internal method webserviceMethod_Internal
	 *
	 */
	private static class WebserviceMethod_Internal_Params {

		int projectId; 
		int userId;
		SubmitImport_Init_Response_Base webserviceResult; 
		
		String requestURL;
		String remoteUserIpAddress;
		
		SubmitImport_Init_Request_Base submitImport_Init_Request_Base;
		
		/**
		 * Only populated when from Web App
		 */
		SubmitImport_Init_Request_WebJSON submitImport_Init_Request_WebJSON;
		
		/**
		 * Only populated when from Submitter Program
		 */
		SubmitImport_Init_Request_PgmXML submitImport_Init_Request_PgmXML;
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



}
