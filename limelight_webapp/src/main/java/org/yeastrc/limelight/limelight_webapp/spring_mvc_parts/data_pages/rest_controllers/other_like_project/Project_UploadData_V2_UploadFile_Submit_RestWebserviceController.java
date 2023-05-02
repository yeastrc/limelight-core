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
import java.util.Collections;
import java.util.Comparator;
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
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.file_import_common.Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.constants.FileUploadCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataSingleFileInitJSONBlob_DTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataSingleFileInitJSON_Contents_Version_Number_001;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFile_S3UploadPart_DTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportFileType;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.ImportSingleFileUploadStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_V2_UploadFile_Submit_Request_Base;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_V2_UploadFile_Submit_Request_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_V2_UploadFile_Submit_Request_WebJSON;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_V2_UploadFile_Submit_Response_Base;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_V2_UploadFile_Submit_Response_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_V2_UploadFile_Submit_Response_WebJSON;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectIdIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappFileUploadFileSystemException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.config_with_constants_default.FileUploadMaxFileSize_Config_WithConstantsDefaults;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingDataSingleFileInitJSONBlob_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingSingleFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingSingleFile_S3UploadPart_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsFileObjectStorageFileImportAllowedViaWebSubmit_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsLimelightXMLFileImportFullyConfiguredIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsScanFileImportAllowedViaWebSubmitIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.Limelight_XML_Importer_Work_Directory_And_SubDirs_WebIF;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.SpectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Marshal_RestRequest_Object_ToXML;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_XML_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CompleteMultipartUploadRequest;
import software.amazon.awssdk.services.s3.model.CompletedMultipartUpload;
import software.amazon.awssdk.services.s3.model.CompletedPart;

/**
 * Import Limelight XML File and Scan Files and FASTA file:  Version 2
 * 
 * 'Submit' (Complete) the end of new File Upload.  The File is not considered fully uploaded until this is called.
 * 
 * ***  NOT called after call to webservice Project_UploadData_UploadFile_RestWebserviceController which is kept to support OLD and Current Submit Import Program
 * 
 */
@RestController
public class Project_UploadData_V2_UploadFile_Submit_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_UploadData_V2_UploadFile_Submit_RestWebserviceController.class );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectIdIF validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId;
	
	@Autowired
	private IsLimelightXMLFileImportFullyConfiguredIF isLimelightXMLFileImportFullyConfigured;

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private IsFileObjectStorageFileImportAllowedViaWebSubmit_IF isFileObjectStorageFileImportAllowedViaWebSubmit;
	
	@Autowired
	private IsScanFileImportAllowedViaWebSubmitIF isScanFileImportAllowedViaWebSubmit;

	@Autowired
	private SpectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest_IF spectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest;

	@Autowired
	private Limelight_XML_Importer_Work_Directory_And_SubDirs_WebIF limelight_XML_Importer_Work_Directory_And_SubDirs_Web;
	
	@Autowired
	private FileImportTrackingDAO_IF fileImportTrackingDAO;
	
	@Autowired
	private FileImportTrackingSingleFileDAO_IF fileImportTrackingSingleFileDAO;

	@Autowired
	private FileImportTrackingDataSingleFileInitJSONBlob_DAO_IF fileImportTrackingDataSingleFileInitJSONBlob_DAO;
	
	@Autowired
	private FileImportTrackingSingleFile_S3UploadPart_DAO_IF fileImportTrackingSingleFile_S3UploadPart_DAO;

	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;

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
					+ AA_RestWSControllerPaths_Constants.PROJECT__UPLOAD_DATA_V2_UPLOAD_FILE_SUBMIT_REST_WEBSERVICE_CONTROLLER
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

		SubmitImport_V2_UploadFile_Submit_Request_WebJSON webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, SubmitImport_V2_UploadFile_Submit_Request_WebJSON.class );

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
		
		SubmitImport_V2_UploadFile_Submit_Response_WebJSON webserviceResult_JSON = new SubmitImport_V2_UploadFile_Submit_Response_WebJSON();
		
		WebserviceMethod_Internal_Params webserviceMethod_Internal_Params = new WebserviceMethod_Internal_Params();
		webserviceMethod_Internal_Params.projectId = projectId;
		webserviceMethod_Internal_Params.userId = userId;
		webserviceMethod_Internal_Params.webserviceResult = webserviceResult_JSON;
		webserviceMethod_Internal_Params.requestURL = httpServletRequest.getRequestURL().toString();
		webserviceMethod_Internal_Params.remoteUserIpAddress = httpServletRequest.getRemoteHost();
		webserviceMethod_Internal_Params.submitImport_UploadFile_Submit_Request_WebJSON = webserviceRequest;
		webserviceMethod_Internal_Params.submitImport_UploadFile_Submit_Request_Base = webserviceRequest;
		
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
					+ AA_RestWSControllerPaths_Constants.PROJECT__UPLOAD_DATA_V2_UPLOAD_FILE_SUBMIT_FROM_SUBMIT_PGM_REST_WEBSERVICE_CONTROLLER
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
    	
    	SubmitImport_V2_UploadFile_Submit_Request_PgmXML webserviceRequest = null;

		Object webserviceRequestAsObject = unmarshal_RestRequest_XML_ToObject.getObjectFromXMLByteArray( postBody );
		if ( webserviceRequestAsObject == null ) {
			log.warn("webserviceRequestAsObject == null");
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		try {
			webserviceRequest = (SubmitImport_V2_UploadFile_Submit_Request_PgmXML) webserviceRequestAsObject;
		} catch ( Throwable e ) {
			final String msg = "Failed to cast returned webserviceRequestAsObject from XML to SubmitImport_V2_UploadFile_Submit_Request_PgmXML."
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
		
		SubmitImport_V2_UploadFile_Submit_Response_PgmXML webserviceResult = new SubmitImport_V2_UploadFile_Submit_Response_PgmXML();

//		if ( webserviceRequest.getSubmitProgramVersionNumber() == null ) {
//			
//			log.warn( "webserviceRequest.getSubmitProgramVersionNumber() == null. webserviceRequest.getProjectIdentifier(): " + webserviceRequest.getProjectIdentifier()
//					+ ", userSubmitImportProgramKey_First_5_characters: " + userSubmitImportProgramKey_First_5_characters );
//			
//			webserviceResult.setStatusSuccess( false );
//
//			webserviceResult.setStatusFail_ErrorMessage( "Submit Import Program version is too old.  Get program from limelight webapp submitting to." );
//
//			byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );
//
//			//  TODO  Return other than 200 code?
//			return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
//		}
//
//		if ( webserviceRequest.getSubmitProgramVersionNumber().intValue() < Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__MINUMUM__VERSION_NUMBER ) {
//			
//			log.warn( "webserviceRequest.getSubmitProgramVersionNumber() < Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__MINUMUM__VERSION_NUMBER.  SubmitProgramVersionNumber in request: "
//					+ webserviceRequest.getSubmitProgramVersionNumber().intValue()
//					+ ", SUBMIT_PROGRAM__MINUMUM__VERSION_NUMBER: " + Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__MINUMUM__VERSION_NUMBER
//					+ ", webserviceRequest.getProjectIdentifier(): " + webserviceRequest.getProjectIdentifier()
//					+ ", userSubmitImportProgramKey_First_5_characters: " + userSubmitImportProgramKey_First_5_characters );
//			
//			webserviceResult.setStatusSuccess( false );
//			webserviceResult.setSubmitProgramVersionNumber_NotAccepted(true);
//			webserviceResult.setSubmitProgramVersionNumber_Current_Per_Webapp( Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__CURRENT__VERSION_NUMBER );
//			webserviceResult.setStatusFail_ErrorMessage( "Submit Import Program version is too old.  Get program from limelight webapp submitting to." );
//			
//			byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );
//
//			//  TODO  Return other than 200 code?
//			return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
//		}
		
		int projectId = getProjectId( webserviceRequest );
		
		Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result validateResult =
				validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId
				.validateProjectOwnerAllowed( 
						webserviceRequest.getUserSubmitImportProgramKey(),
						projectId, 
						null /* SubmitImport_Init_Response_PgmXML webserviceResult */  );
    	
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
		
		WebserviceMethod_Internal_Params webserviceMethod_Internal_Params = new WebserviceMethod_Internal_Params();
		webserviceMethod_Internal_Params.projectId = projectId;
		webserviceMethod_Internal_Params.userId = validateResult.getUserId();
		webserviceMethod_Internal_Params.webserviceResult = webserviceResult;
		webserviceMethod_Internal_Params.requestURL = httpServletRequest.getRequestURL().toString();
		webserviceMethod_Internal_Params.remoteUserIpAddress = httpServletRequest.getRemoteHost();
		webserviceMethod_Internal_Params.submitImport_UploadFile_Submit_Request_PgmXML = webserviceRequest;
		webserviceMethod_Internal_Params.submitImport_UploadFile_Submit_Request_Base = webserviceRequest;
		
		WebserviceMethod_Internal_Results webserviceMethod_Internal_Results = 
				webserviceMethod_Internal( webserviceMethod_Internal_Params );
		
		byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );

		return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
    }
    
    /**
     * @param webserviceRequest
     * @return
     */
    private int getProjectId( SubmitImport_V2_UploadFile_Submit_Request_Base webserviceRequest ) {

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
    
    ///////////////////////////////////////////
    ///////////////////////////////////////////

    ///  internal method 'webserviceMethod_Internal':  called for all webservice calls
    
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
		SubmitImport_V2_UploadFile_Submit_Response_Base webserviceResult = webserviceMethod_Internal_Params.webserviceResult;
		
		SubmitImport_V2_UploadFile_Submit_Request_Base submitImport_UploadFile_Submit_Request_Base = webserviceMethod_Internal_Params.submitImport_UploadFile_Submit_Request_Base;
		
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
		
		String uniqueRequestIdentifier_ForThisFile = submitImport_UploadFile_Submit_Request_Base.getUniqueRequestIdentifier_ForThisFile();

		String uploadedFilename = submitImport_UploadFile_Submit_Request_Base.getFilename();
		String projectIdString = submitImport_UploadFile_Submit_Request_Base.getProjectIdentifier();
		String uploadKeyString = submitImport_UploadFile_Submit_Request_Base.getUploadKey();
		
		Long uploadFileSize = submitImport_UploadFile_Submit_Request_Base.getUploadFileSize();
		
		int fileImportTrackingId = 0;
		
		String scanFileSuffix = null;

		FileImportFileType fileType = null;
		
		{
			if ( StringUtils.isEmpty( uniqueRequestIdentifier_ForThisFile ) ) {
				log.warn( "'uniqueRequestIdentifier_ForThisFile' Webservice Request/XML parameter is not sent or is empty.  uploadKeyString: " + uploadKeyString
						+ ", projectId: " + webserviceMethod_Internal_Params.projectId 
						+ ", userId: " + webserviceMethod_Internal_Params.userId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( uploadFileSize == null ) {
				log.warn( "'uploadFileSize' Webservice Request parameter is null. uploadKeyString: " + uploadKeyString
						+ ", projectId: " + webserviceMethod_Internal_Params.projectId 
						+ ", userId: " + webserviceMethod_Internal_Params.userId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( StringUtils.isEmpty( uploadedFilename ) ) {
				log.warn( "'filename' Webservice Request/XML parameter is not sent or is empty.  uploadKeyString: " + uploadKeyString
						+ ", projectId: " + webserviceMethod_Internal_Params.projectId 
						+ ", userId: " + webserviceMethod_Internal_Params.userId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( submitImport_UploadFile_Submit_Request_Base.getFileIndex() == null ) {
				log.error( "'fileIndex' Webservice Request/XML parameter is not sent or is null .  uploadKeyString: " + uploadKeyString
						+ ", projectId: " + webserviceMethod_Internal_Params.projectId 
						+ ", userId: " + webserviceMethod_Internal_Params.userId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			if ( submitImport_UploadFile_Submit_Request_Base.getFileType() == null ) {
				log.warn( "'fileType' Webservice Request parameter is not sent or is null .  uploadKeyString: " + uploadKeyString
						+ ", projectId: " + webserviceMethod_Internal_Params.projectId 
						+ ", userId: " + webserviceMethod_Internal_Params.userId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			{
				int fileTypeInt = submitImport_UploadFile_Submit_Request_Base.getFileType();
				try {
					fileType = FileImportFileType.fromValue( fileTypeInt );
				} catch (Exception e ) {
					log.warn( "'fileType' Webservice Request is not a valid value: " + fileTypeInt );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
			}

			if ( fileType == FileImportFileType.SCAN_FILE 
					&& ( ! isScanFileImportAllowedViaWebSubmit.isScanFileImportAllowedViaWebSubmit() ) ) {

				log.warn( "'fileType' is : SCAN_FILE but scan files are not allowed via web submit" );

				//  Return Error
				webserviceResult.setStatusSuccess(false);
				webserviceResult.setScanFileNotAllowed(true);

				//			methodResults.returnBadRequestStatusCode = true;

				//  EARLY RETURN
				return methodResults;
			}


			if ( fileType == FileImportFileType.FASTA_FILE 
					&& ( ! isFileObjectStorageFileImportAllowedViaWebSubmit.isFileObjectStorageFileImportAllowedViaWebSubmit() ) ) {

				log.warn( "'fileType' is : FASTA_FILE but File Object Storage files are not allowed via web submit" );

				//  Return Error
				webserviceResult.setStatusSuccess(false);
				webserviceResult.setScanFileNotAllowed(true);

				//			methodResults.returnBadRequestStatusCode = true;

				//  EARLY RETURN
				return methodResults;
			}

			if ( StringUtils.isEmpty( projectIdString ) ) {
				log.warn( "'projectIdentifier' Webservice Request is not sent or is empty" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			try {
				webserviceMethod_Internal_Params.projectId = Integer.parseInt( projectIdString );
			} catch (Exception e ) {
				log.warn( "'projectIdentifier' Webservice Request is not an integer: " + projectIdString );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( StringUtils.isEmpty( uploadKeyString ) ) {
				log.warn( "'uploadKey' Webservice Request is not sent or is empty" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			try {
				fileImportTrackingId = Integer.parseInt( uploadKeyString );
			} catch (Exception e ) {
				log.warn( "'uploadKey' Webservice Request is not an integer: " + uploadKeyString );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
		}
		
		long maxFileSize = 0;
		String maxFileSizeFormatted = null;
		
		if ( fileType == FileImportFileType.LIMELIGHT_XML_FILE ) {
			maxFileSize = FileUploadMaxFileSize_Config_WithConstantsDefaults.get_LIMELIGHT_XML_MAX_FILE_UPLOAD_SIZE();
			maxFileSizeFormatted = FileUploadMaxFileSize_Config_WithConstantsDefaults.get_MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE_FORMATTED();
		} else if ( fileType == FileImportFileType.SCAN_FILE ) {
			maxFileSize = FileUploadMaxFileSize_Config_WithConstantsDefaults.get_SCAN_MAX_FILE_UPLOAD_SIZE();
			maxFileSizeFormatted = FileUploadMaxFileSize_Config_WithConstantsDefaults.get_MAX_SCAN_FILE_UPLOAD_SIZE_FORMATTED();
		} else if ( fileType == FileImportFileType.FASTA_FILE ) {
			maxFileSize = FileUploadMaxFileSize_Config_WithConstantsDefaults.get_MAX_FASTA_FILE_UPLOAD_SIZE();
			maxFileSizeFormatted = FileUploadMaxFileSize_Config_WithConstantsDefaults.get_MAX_FASTA_FILE_UPLOAD_SIZE_FORMATTED();
		} else {
			String msg = "Unknown value for fileType: " + fileType;
			log.error( msg );
			throw new LimelightWebappFileUploadFileSystemException( msg );
		}
		
		///  Check of upload size (using uploadFileSize)
		
		if ( uploadFileSize > maxFileSize ) {
			
			//  Return Error
			webserviceResult.setStatusSuccess( false );
			webserviceResult.setFileSizeLimitExceeded( true );
			webserviceResult.setMaxSize( maxFileSize );
			webserviceResult.setMaxSizeFormatted( maxFileSizeFormatted );

//			methodResults.returnBadRequestStatusCode = true;

			//  EARLY RETURN
			return methodResults;
		}
		
		///////  Add additional checking of the filename for scan files
		if ( fileType == FileImportFileType.SCAN_FILE ) {

			List<String> supported_ScanFileSuffix_List = spectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest.get_Supported_ScanFileSuffixes();
			
			String supported_ScanFileSuffix__For_Input_ScanFilename = null;
			
			for ( String supported_ScanFileSuffix : supported_ScanFileSuffix_List ) {
				
				if ( uploadedFilename.endsWith( supported_ScanFileSuffix ) ) {
					supported_ScanFileSuffix__For_Input_ScanFilename = supported_ScanFileSuffix;
					break;
				}
			}
			
			if ( supported_ScanFileSuffix__For_Input_ScanFilename == null ) {
				//  Return Error
				webserviceResult.setStatusSuccess(false);
				webserviceResult.setScanFilenameSuffixNotValid( true );

//				methodResults.returnBadRequestStatusCode = true;

				//  EARLY RETURN
				return methodResults;
			}
			
			scanFileSuffix = supported_ScanFileSuffix__For_Input_ScanFilename; // pass on found suffix
		}
		

		//   Validate that the fileImportTrackingId is for the current user
		
		FileImportTrackingDTO fileImportTrackingDTO = fileImportTrackingDAO.getForId(fileImportTrackingId);
		if ( fileImportTrackingDTO == null ) {
			//  Return Error
			String msg = "fileImportTrackingId NOT Found: " + fileImportTrackingId;
			log.warn( msg );
			webserviceResult.setStatusSuccess(false);
			webserviceResult.setUploadKeyNotValid(true);

//			methodResults.returnBadRequestStatusCode = true;

			//  EARLY RETURN
			return methodResults;
		}
		if ( fileImportTrackingDTO.getUserId() != userId ) {
			//  Return Error
			String msg = "fileImportTrackingId User Id NOT match Signed In User Id. fileImportTrackingId: " + fileImportTrackingId;
			log.warn( msg );
			webserviceResult.setStatusSuccess(false);
			webserviceResult.setUploadKeyNotValid(true);

//			methodResults.returnBadRequestStatusCode = true;

			//  EARLY RETURN
			return methodResults;
		}

		
		List<FileImportTrackingSingleFileDTO> fileImportTrackingSingleFileDTO_List = 
				fileImportTrackingSingleFileDAO.getFor_TrackingId_FileIndex(
						fileImportTrackingId, submitImport_UploadFile_Submit_Request_Base.getFileIndex() );
		
		if ( fileImportTrackingSingleFileDTO_List.isEmpty() ) {
			String msg = "fileImportTrackingId and FileIndex does NOT exist in DB: importTrackingId: " 
					+ fileImportTrackingId
					+ ", fileIndex: " + submitImport_UploadFile_Submit_Request_Base.getFileIndex();
			log.warn( msg );

			webserviceResult.setStatusSuccess(false);
			webserviceResult.setUploadKeyNotValid( true );

//			methodResults.returnBadRequestStatusCode = true;

			//  EARLY RETURN
			return methodResults;
			
		}

		if ( fileImportTrackingSingleFileDTO_List.size() > 1 ) {
			String msg = "importTrackingId and FileIndex More than 1 record exist in DB: fileImportTrackingId: " 
					+ fileImportTrackingId
					+ ", fileIndex: " + submitImport_UploadFile_Submit_Request_Base.getFileIndex();
			log.error( msg );

			throw new LimelightInternalErrorException(msg);
		}

		FileImportTrackingSingleFileDTO fileImportTrackingSingleFileDTO = fileImportTrackingSingleFileDTO_List.get(0);
		
		//  Validate that the request matches the same 'Single File Initialize'
		
		if ( ! fileImportTrackingSingleFileDTO.getUnique_request_identifier_from_submitter().equals( submitImport_UploadFile_Submit_Request_Base.getUniqueRequestIdentifier_ForThisFile() ) ) {
			String msg = "UniqueRequestIdentifier_ForThisFile not match value in DB from Initialize call: fileImportTrackingId: " 
					+ fileImportTrackingId
					+ ", fileIndex: " + submitImport_UploadFile_Submit_Request_Base.getFileIndex();
			log.warn( msg );

			webserviceResult.setStatusSuccess(false);
			webserviceResult.setUniqueRequestIdentifier_ForThisFile_NotMatchInitializeValue( true ); 

//			methodResults.returnBadRequestStatusCode = true;

			//  EARLY RETURN
			return methodResults;
		}
		
		{ // Validate that the AWS S3 configuration has not changed since the 'Single File Initialize' was called
			
			{ //  Aws_s3_bucket_name

				final String amazonS3_bucketName__FromConfig = Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values.getInstance().get_S3_Bucket_Configuration_Value();
				
				boolean configChanged = false;

				if ( StringUtils.isNotEmpty( fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() ) ) {

					if ( ! fileImportTrackingSingleFileDTO.getAws_s3_bucket_name().equals( amazonS3_bucketName__FromConfig ) ) {
				
						configChanged = true;
					}
				} else if ( StringUtils.isNotEmpty( amazonS3_bucketName__FromConfig ) ) {
					
					configChanged = true;
				}
				
				if ( configChanged ) {
					String msg = "Aws_s3_bucket_name in config is different from DB Single File record: fileImportTrackingId: " 
							+ fileImportTrackingId
							+ ", fileIndex: " + submitImport_UploadFile_Submit_Request_Base.getFileIndex();
					log.warn( msg );

					webserviceResult.setStatusSuccess(false);
					webserviceResult.setAws_S3_Config_Changed(true); 

					//  methodResults.returnBadRequestStatusCode = true;

					return methodResults;   	//  EARLY RETURN
				}
			}

			{ //  Aws_s3_region

				final String amazonS3_bucketName__FromConfig = Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values.getInstance().get_S3_Region_Configuration_Value();
				
				boolean configChanged = false;

				if ( StringUtils.isNotEmpty( fileImportTrackingSingleFileDTO.getAws_s3_region() ) ) {

					if ( ! fileImportTrackingSingleFileDTO.getAws_s3_region().equals( amazonS3_bucketName__FromConfig ) ) {
				
						configChanged = true;
					}
				} else if ( StringUtils.isNotEmpty( amazonS3_bucketName__FromConfig ) ) {
					
					configChanged = true;
				}
				
				if ( configChanged ) {
					String msg = "Aws_s3_region in config is different from DB Single File record: fileImportTrackingId: " 
							+ fileImportTrackingId
							+ ", fileIndex: " + submitImport_UploadFile_Submit_Request_Base.getFileIndex();
					log.warn( msg );

					webserviceResult.setStatusSuccess(false);
					webserviceResult.setAws_S3_Config_Changed(true); 

					//  methodResults.returnBadRequestStatusCode = true;

					return methodResults;   	//  EARLY RETURN
				}
			}
		}


		//////////////////////////////////////
		
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

		String dirNameForImportTrackingId =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().getDirForImportTrackingId( fileImportTrackingId );

		File dirForImportTrackingId  =  new File( importFilesBaseDir , dirNameForImportTrackingId );
		if ( ! dirForImportTrackingId.exists() ) {
			String msg = "dirForImportTrackingId does NOT exist: " + dirForImportTrackingId.getAbsolutePath();
			log.warn( msg );

			webserviceResult.setStatusSuccess(false);
			webserviceResult.setUploadKeyNotValid( true );

//			methodResults.returnBadRequestStatusCode = true;

			//  EARLY RETURN
			return methodResults;
		}
		
		

		//  File to store the uploaded contents to
//		File uploadedFileOnDisk = 
//				limelight_XML_Importer_Work_Directory_And_SubDirs_Web
//				.getUploadFile( 
//						scanFileSuffix,
//						submitImport_UploadFile_Submit_Request_Base.getFileIndex(),
//						fileType,
//						dirForImportTrackingId );

//		FileImportTrackingSingleFileDTO fileImportTrackingSingleFileDTO = new FileImportTrackingSingleFileDTO();
//		fileImportTrackingSingleFileDTO.setFileImportTrackingId(fileImportTrackingId);
//		fileImportTrackingSingleFileDTO.setFilenameInUpload( submitImport_UploadFile_Submit_Request_Base.getFilename() );
//		fileImportTrackingSingleFileDTO.setFilenameOnDisk( uploadedFileOnDisk.getName() );
//		
////		fileImportTrackingSingleFileDTO.setFilenameOnDiskWithPathSubSameMachine( fileItem.getFilenameOnDiskWithPathSubSameMachine() );
//		
//		fileImportTrackingSingleFileDTO.setFileIndex( submitImport_UploadFile_Submit_Request_Base.getFileIndex() );
//		fileImportTrackingSingleFileDTO.setFileType( fileType );
//		fileImportTrackingSingleFileDTO.setFileSize( submitImport_UploadFile_Submit_Request_Base.getUploadFileSize() );
//		fileImportTrackingSingleFileDTO.setCanonicalFilename_W_Path_OnSubmitMachine( submitImport_UploadFile_Submit_Request_Base.getCanonicalFilename_W_Path_OnSubmitMachine() );
//		fileImportTrackingSingleFileDTO.setAbsoluteFilename_W_Path_OnSubmitMachine( submitImport_UploadFile_Submit_Request_Base.getAbsoluteFilename_W_Path_OnSubmitMachine() );
//		fileImportTrackingSingleFileDTO.setFileUploadStatus( ImportSingleFileUploadStatus.RECORD_INSERTED );
		
		

//		If S3, then Store to S3,  else code that is next
//		
//		
//		!!!   entity tag (ETag) header  must be stored to DB for each webservice call so available in "Complete" webservice call
//				Whenever you upload a part, Amazon S3 returns an entity tag (ETag) header in its response. 
//				For each part upload, you must record the part number and the ETag value. 
//				You must include these values in the subsequent request to complete the multipart upload.
		
		if ( StringUtils.isNotEmpty( fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() ) ) {

			String uploadId_S3Client_Client = null;

			{
				FileImportTrackingDataSingleFileInitJSON_Contents_Version_Number_001 fileImportTrackingDataSingleFileInitJSON_Contents_Version_Number_001 = null;

				{
					FileImportTrackingDataSingleFileInitJSONBlob_DTO fileImportTrackingDataSingleFileInitJSONBlob_DTO = 
							fileImportTrackingDataSingleFileInitJSONBlob_DAO.getFor_FileImportTrackingSingleFileId(fileImportTrackingSingleFileDTO.getId());

					if ( fileImportTrackingDataSingleFileInitJSONBlob_DTO != null ) {

						if ( fileImportTrackingDataSingleFileInitJSONBlob_DTO.getJsonContents_FormatVersion() == FileImportTrackingDataSingleFileInitJSON_Contents_Version_Number_001.VERSION_NUMBER_001 ) {

							fileImportTrackingDataSingleFileInitJSON_Contents_Version_Number_001 =
									unmarshalJSON_ToObject.getObjectFromJSONString( 
											fileImportTrackingDataSingleFileInitJSONBlob_DTO.getJsonContents(), FileImportTrackingDataSingleFileInitJSON_Contents_Version_Number_001.class );

						} else {
							String msg = "fileImportTrackingDataSingleFileInitJSONBlob_DTO.getJsonContents_FormatVersion() is not an expected value.  value: " 
									+ fileImportTrackingDataSingleFileInitJSONBlob_DTO.getJsonContents_FormatVersion();
							log.error(msg);
							throw new LimelightInternalErrorException(msg);
						}

					}
				}


				if ( fileImportTrackingDataSingleFileInitJSON_Contents_Version_Number_001 != null ) {
					
					uploadId_S3Client_Client = fileImportTrackingDataSingleFileInitJSON_Contents_Version_Number_001.getUploadId_S3Client_MultipartUpload();
				}
			}
			
			if ( StringUtils.isEmpty(uploadId_S3Client_Client)) {

				String msg = "uploadId_S3Client_Client is not populated: fileImportTrackingId: " 
						+ fileImportTrackingId
						+ ", fileIndex: " + fileImportTrackingSingleFileDTO.getFileIndex();
				log.warn( msg );

				webserviceResult.setStatusSuccess(false);
//				webserviceResult.setUploadKeyNotValid( true );  //  TODO  Set a different value

//				methodResults.returnBadRequestStatusCode = true;

				//  EARLY RETURN
				return methodResults;
			}

		

			List<FileImportTrackingSingleFile_S3UploadPart_DTO> fileImportTrackingSingleFile_S3UploadPart_DTO_List =
					fileImportTrackingSingleFile_S3UploadPart_DAO.getAllFor_FileImportTrackingSingleFileId(fileImportTrackingSingleFileDTO.getId());

			if ( fileImportTrackingSingleFile_S3UploadPart_DTO_List.isEmpty() ) {
				String msg = "NO entries from fileImportTrackingSingleFile_S3UploadPart_DAO.getAllFor_FileImportTrackingSingleFileId(...): fileImportTrackingSingleFileDTO.getId(): " 
						+ fileImportTrackingSingleFileDTO.getId()
						+ ", fileImportTrackingId: " 
						+ fileImportTrackingId
						+ ", fileIndex: " + fileImportTrackingSingleFileDTO.getFileIndex();
				log.warn( msg );

				webserviceResult.setStatusSuccess(false);
//				webserviceResult.setUploadKeyNotValid( true );  //  TODO  Set a different value

//				methodResults.returnBadRequestStatusCode = true;

				//  EARLY RETURN
				return methodResults;
			}
			
			Collections.sort( fileImportTrackingSingleFile_S3UploadPart_DTO_List, new Comparator<FileImportTrackingSingleFile_S3UploadPart_DTO>() {

				@Override
				public int compare(FileImportTrackingSingleFile_S3UploadPart_DTO a,
						FileImportTrackingSingleFile_S3UploadPart_DTO b) {
					
					if ( a.getS3_UploadPart_Number() < b.getS3_UploadPart_Number() ) {
						return -1;
					}
					if ( a.getS3_UploadPart_Number() > b.getS3_UploadPart_Number() ) {
						return 1;
					}
					throw new RuntimeException( "S3_UploadPart_Number must be unique." );
				}
			});
			
			{	//  Validate that there are parts for all the ranges of bytes of the file from start to end of file

				final long initializedEnd = -1;
				long prevEnd = initializedEnd;
				for ( FileImportTrackingSingleFile_S3UploadPart_DTO fileImportTrackingSingleFile_S3UploadPart_DTO : fileImportTrackingSingleFile_S3UploadPart_DTO_List ) {
					if ( prevEnd == initializedEnd ) {
						//  First record
						if ( fileImportTrackingSingleFile_S3UploadPart_DTO.getS3_UploadPart_StartByte_ZeroBased() != 0 ) {
							
							String msg = "First uploaded chunk must have FileChunk_StartByte (S3_UploadPart_StartByte_ZeroBased) value be zero.  value is: "
									+ fileImportTrackingSingleFile_S3UploadPart_DTO.getS3_UploadPart_StartByte_ZeroBased();
							log.warn( msg );

							webserviceResult.setStatusSuccess(false);
//							webserviceResult.setUploadKeyNotValid( true );  //  TODO  Set a different value
							
							webserviceResult.setStatusFail_ErrorMessage(msg);

//							methodResults.returnBadRequestStatusCode = true;

							//  EARLY RETURN
							return methodResults;
						}
					} else {
						if ( fileImportTrackingSingleFile_S3UploadPart_DTO.getS3_UploadPart_StartByte_ZeroBased() != ( prevEnd + 1 ) ) {
							
							String msg = "Chunk must have FileChunk_StartByte (S3_UploadPart_StartByte_ZeroBased) value be 1 greater than previous chunk End. Upload Part Number "
									+ fileImportTrackingSingleFile_S3UploadPart_DTO.getS3_UploadPart_Number();
							log.warn( msg );

							webserviceResult.setStatusSuccess(false);
//							webserviceResult.setUploadKeyNotValid( true );  //  TODO  Set a different value
							
							webserviceResult.setStatusFail_ErrorMessage(msg);

//							methodResults.returnBadRequestStatusCode = true;

							//  EARLY RETURN
							return methodResults;
						}
					}
					
					prevEnd = fileImportTrackingSingleFile_S3UploadPart_DTO.getS3_UploadPart_EndByte_ZeroBased();
				}

				//  Validate that final ( End Byte + 1 ) is file size.  " + 1 " since is zero based
				
				if ( ( prevEnd + 1 ) != uploadFileSize.longValue() ) {

					String msg = "Last Chunk must have FileChunk_EndByte (s3_UploadPart_EndByte_ZeroBased) value be 1 less than File Size. Last Chunk FileChunk_EndByte: "
							+ prevEnd
							+ ", File Size: " + uploadFileSize.longValue();
					log.warn( msg );

					webserviceResult.setStatusSuccess(false);
//					webserviceResult.setUploadKeyNotValid( true );  //  TODO  Set a different value
					
					webserviceResult.setStatusFail_ErrorMessage(msg);

//					methodResults.returnBadRequestStatusCode = true;

					//  EARLY RETURN
					return methodResults;
				}
			}

			
			// Create a list of UploadPartResponse objects. You get one of these for each part upload.
			
			List<CompletedPart> completedPart_List = new ArrayList<>( fileImportTrackingSingleFile_S3UploadPart_DTO_List.size() ); // Init to max possible size
			
			for ( FileImportTrackingSingleFile_S3UploadPart_DTO fileImportTrackingSingleFile_S3UploadPart_DTO : fileImportTrackingSingleFile_S3UploadPart_DTO_List ) {
			
				CompletedPart completedPart = 
						CompletedPart
						.builder()
						.partNumber( fileImportTrackingSingleFile_S3UploadPart_DTO.getS3_UploadPart_Number() )
						.eTag(fileImportTrackingSingleFile_S3UploadPart_DTO.getS3_UploadPart_Etag())
						.build();

				completedPart_List.add( completedPart );
			}
	        

			//   S3 Multiplart Commit
			{
				S3Client amazonS3_Client = null;

				{  // Use Region from Config, otherwise SDK use from Environment Variable

					final String amazonS3_RegionName = Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values.getInstance().get_S3_Region_Configuration_Value();

					if ( StringUtils.isNotEmpty( amazonS3_RegionName ) ) {
						
						Region aws_S3_Region = Region.of(amazonS3_RegionName);
						
						amazonS3_Client = 
								S3Client.builder()
								.region( aws_S3_Region )
								.httpClientBuilder(ApacheHttpClient.builder())
								.build();
						
						fileImportTrackingSingleFileDTO.setAws_s3_region(amazonS3_RegionName);
						
					} else {
						//  SDK use Region from Environment Variable
						
						amazonS3_Client = 
								S3Client.builder()
								.httpClientBuilder(ApacheHttpClient.builder())
								.build(); 
					}
				}

				// Finally call completeMultipartUpload operation to tell S3 to merge all uploaded
				// parts and finish the multipart operation.
				CompletedMultipartUpload completedMultipartUpload = CompletedMultipartUpload.builder()
						.parts(completedPart_List)
						.build();

				CompleteMultipartUploadRequest completeMultipartUploadRequest =
						CompleteMultipartUploadRequest.builder()
						.bucket(fileImportTrackingSingleFileDTO.getAws_s3_bucket_name())
						.key(fileImportTrackingSingleFileDTO.getAws_s3_object_key())
						.uploadId(uploadId_S3Client_Client)
						.multipartUpload(completedMultipartUpload)
						.build();

				amazonS3_Client.completeMultipartUpload(completeMultipartUploadRequest);
			}
	        
			
		} else {
			
			//  Validate Local File:

			//  File to store the uploaded contents to
			File uploadedFileOnDisk = 
					limelight_XML_Importer_Work_Directory_And_SubDirs_Web
					.getUploadFile( 
							scanFileSuffix,
							submitImport_UploadFile_Submit_Request_Base.getFileIndex(),
							fileType,
							dirForImportTrackingId );
			
			if ( ! uploadedFileOnDisk.exists() ) {

				String msg = "Uploaded file does NOT exist on server file system: " + uploadedFileOnDisk.getAbsolutePath();
				log.warn( msg );

				webserviceResult.setStatusSuccess(false);
//				webserviceResult.setUploadKeyNotValid( true );  //  TODO  Set a different value
				
				webserviceResult.setStatusFail_ErrorMessage("Uploaded file does NOT exist on server file system");

//				methodResults.returnBadRequestStatusCode = true;

				//  EARLY RETURN
				return methodResults;
			}
			
			//  Validate that final ( End Byte + 1 ) is file size.  " + 1 " since is zero based
			
			if ( uploadedFileOnDisk.length() != uploadFileSize.longValue() ) {

				String msg = "Uploaded File on server is not same size as file size in request. Uploaded File on server size: "
						+ uploadedFileOnDisk.length()
						+ ", File Size: " + uploadFileSize.longValue();
				log.warn( msg );

				webserviceResult.setStatusSuccess(false);
//				webserviceResult.setUploadKeyNotValid( true );  //  TODO  Set a different value
				
				webserviceResult.setStatusFail_ErrorMessage("Uploaded File on server is not same size as file size in request.");

//				methodResults.returnBadRequestStatusCode = true;

				//  EARLY RETURN
				return methodResults;
			}
//		Add a LOT more Validation that the file is fully uploaded.
//		
//		If local disk, validate that the file is the correct length.
			
		}
//		
		
		if ( ! uniqueRequestIdentifier_ForThisFile.equals( fileImportTrackingSingleFileDTO.getUnique_request_identifier_from_submitter() ) ) {
			String msg = "uniqueRequestIdentifier_ForThisFile in request NOT match DB for fileImportTrackingId and FileIndex.  fileImportTrackingId: " + fileImportTrackingId
					+ ", FileIndex: " + submitImport_UploadFile_Submit_Request_Base.getFileIndex()
					+ ", uniqueRequestIdentifier_ForThisFile in request: '" + uniqueRequestIdentifier_ForThisFile + "'"
					+ ", uniqueRequestIdentifier_ForThisFile in DB: '" + fileImportTrackingSingleFileDTO.getUnique_request_identifier_from_submitter() + "'";
			log.error(msg);
			throw new LimelightInternalErrorException(msg);
		}
		
		fileImportTrackingSingleFileDAO.update_file_upload_status_id_For_Id(ImportSingleFileUploadStatus.FILE_UPLOAD_COMPLETE, fileImportTrackingSingleFileDTO.getId() );

		webserviceResult.setStatusSuccess( true );
		
		if ( log.isInfoEnabled() ) {
			
			
			log.info( "Successful Submit Single File Upload.  UserId: " + webserviceMethod_Internal_Params.userId
					+ ", project id: " + webserviceMethod_Internal_Params.projectId
					+ ", upload key: " + uploadKeyString
					+ ", request URL: " + webserviceMethod_Internal_Params.requestURL );
		}
		
		return methodResults;
	}

	/**
	 * Params to internal method webserviceMethod_Internal
	 *
	 */
	private static class WebserviceMethod_Internal_Params {

		int projectId; 
		int userId;
		SubmitImport_V2_UploadFile_Submit_Response_Base webserviceResult; 
		
		String requestURL;
		String remoteUserIpAddress;
		
		SubmitImport_V2_UploadFile_Submit_Request_Base submitImport_UploadFile_Submit_Request_Base;
		
		/**
		 * Only populated when from Web App
		 */
		SubmitImport_V2_UploadFile_Submit_Request_WebJSON submitImport_UploadFile_Submit_Request_WebJSON;
		
		/**
		 * Only populated when from Submitter Program
		 */
		SubmitImport_V2_UploadFile_Submit_Request_PgmXML submitImport_UploadFile_Submit_Request_PgmXML;
	}

	/**
	 * Results from internal method webserviceMethod_Internal
	 *
	 */
	private static class WebserviceMethod_Internal_Results {

	}
	
	//////   WebserviceRequest and WebserviceResult classes
	
	//   Now uses specific classes from: limelight_submit_import_client_connector
	//       (org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects) 



}
