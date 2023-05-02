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
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.constants.Limelight__AWS_S3_Constants;
import org.yeastrc.limelight.limelight_shared.file_import_common.Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.constants.FileUploadCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataSingleFileInitJSONBlob_DTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataSingleFileInitJSON_Contents_Version_Number_001;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFile_S3UploadPart_DTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportFileType;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_V2_UploadFile_Chunking_Request_Common;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_V2_UploadFile_Chunking_Response_Base;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_V2_UploadFile_Chunking_Response_WebJSON;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectIdIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappFileUploadFileSystemException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.LimelightWebappDataException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.config_with_constants_default.FileUploadMaxFileSize_Config_WithConstantsDefaults;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingDataSingleFileInitJSONBlob_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingSingleFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingSingleFile_S3UploadPart_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.minimal_validate__get_searchname_from_uploaded_file.LimelightXMLFile_Minimal_Validate__GetSearchNameIfInFileContents_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsFileObjectStorageFileImportAllowedViaWebSubmit_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsLimelightXMLFileImportFullyConfiguredIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsScanFileImportAllowedViaWebSubmitIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.Limelight_XML_Importer_Work_Directory_And_SubDirs_WebIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.validate_minimal_uploaded_files.FastaFile_Uploaded_Minimal_Validate_IF;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.SpectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Marshal_RestRequest_Object_ToXML;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_XML_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.UploadPartRequest;
import software.amazon.awssdk.services.s3.model.UploadPartResponse;

/**
 * For Upload Data, Upload File (Receive file from web app or from submitter program)
 * 
 * Accepts a File Chunk (Web App only for now)
 *
 * WARNING:  The Submit Import Program will show the value of BaseSubmitImportWebserviceResponse.statusFail_ErrorMessage when set
 * 			 and will NO LONGER check the boolean flags (other than statusSuccess).
 * 			 So the property BaseSubmitImportWebserviceResponse.statusFail_ErrorMessage will be REQUIRED to be set for all errors. 
 *
 */
@RestController
public class Project_UploadData_V2_UploadFile_Chunking_Upload_File_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_UploadData_V2_UploadFile_Chunking_Upload_File_RestWebserviceController.class );

	private static final int COPY_FILE_ARRAY_SIZE = 32 * 1024;
	
	//  Keep all these Strings in sync with the Javascript AJAX Send:

	private static final String UPLOAD_FILE_HEADER_PARAMETER_PARAMS_WEB_JSON = "limelight_upload_file_params_json";

	//  Keep all these Strings in sync with the Submit Program Send:
	
	private static final String UPLOAD_FILE_HEADER_PARAMETER_PARAMS_PGM_XML = "limelight_upload_file_params_xml";

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectIdIF validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId;

	@Autowired
	private IsLimelightXMLFileImportFullyConfiguredIF isLimelightXMLFileImportFullyConfigured;

	@Autowired
	private IsFileObjectStorageFileImportAllowedViaWebSubmit_IF isFileObjectStorageFileImportAllowedViaWebSubmit;
	
	@Autowired
	private IsScanFileImportAllowedViaWebSubmitIF isScanFileImportAllowedViaWebSubmit;

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;

	@Autowired
	private ProjectDAO_IF projectDAO;

	@Autowired
	private FileImportTrackingDAO_IF fileImportTrackingDAO;

	@Autowired
	private FileImportTrackingSingleFileDAO_IF fileImportTrackingSingleFileDAO;
	
	@Autowired
	private FileImportTrackingDataSingleFileInitJSONBlob_DAO_IF fileImportTrackingDataSingleFileInitJSONBlob_DAO;
	
	@Autowired
	private FileImportTrackingSingleFile_S3UploadPart_DAO_IF fileImportTrackingSingleFile_S3UploadPart_DAO;
	
	@Autowired
	private Limelight_XML_Importer_Work_Directory_And_SubDirs_WebIF limelight_XML_Importer_Work_Directory_And_SubDirs_Web;
	
	@Autowired
	private LimelightXMLFile_Minimal_Validate__GetSearchNameIfInFileContents_IF limelightXMLFile_Minimal_Validate__GetSearchNameIfInFile;
	
	@Autowired
	private FastaFile_Uploaded_Minimal_Validate_IF fastaFile_Uploaded_Minimal_Validate;

	@Autowired
	private SpectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest_IF spectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest;
	
	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	@Autowired
	private Unmarshal_RestRequest_XML_ToObject unmarshal_RestRequest_XML_ToObject;
	
	@Autowired
	private Marshal_RestRequest_Object_ToXML marshal_RestRequest_Object_ToXML;


	/////////////////////////////////////////////////////

	//    From Web App

	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.

	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.PROJECT__UPLOAD_DATA_V2_UPLOAD_FILE_CHUNKING_UPLOAD_FILE_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_OCTET_STREAM_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

	public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_JSON(

			//  No @RequestBody since the POST body will be read in this method and copied to a local file
			//  @RequestBody byte[] postBody,

			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse
			) throws Exception {
		
		try {

			//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
			//    to return specific error to web app JS code if webserviceSyncTracking is not current value
			validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );


			//    			String requestURL = httpServletRequest.getRequestURL().toString();

			String uploadFileParamsJSON = httpServletRequest.getHeader( UPLOAD_FILE_HEADER_PARAMETER_PARAMS_WEB_JSON );

			if ( StringUtils.isEmpty( uploadFileParamsJSON ) ) {
				log.warn( "'" + UPLOAD_FILE_HEADER_PARAMETER_PARAMS_WEB_JSON + "' header parameter is not sent or is empty" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			SubmitImport_V2_UploadFile_Chunking_Request_Common webserviceRequestHeaderContents = 
					unmarshalJSON_ToObject.getObjectFromJSONString( uploadFileParamsJSON, SubmitImport_V2_UploadFile_Chunking_Request_Common.class );

			int projectId = getProjectId( webserviceRequestHeaderContents );

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
			
			SubmitImport_V2_UploadFile_Chunking_Response_WebJSON webserviceResult = new SubmitImport_V2_UploadFile_Chunking_Response_WebJSON();

			WebserviceMethod_Internal_Params webserviceMethod_Internal_Params = new WebserviceMethod_Internal_Params();
			webserviceMethod_Internal_Params.projectId = projectId;
			webserviceMethod_Internal_Params.requestURL = httpServletRequest.getRequestURL().toString();
			webserviceMethod_Internal_Params.userId = userId;
			webserviceMethod_Internal_Params.webserviceResult = webserviceResult;
			
			WebserviceMethod_Internal_Results webserviceMethod_Internal_Results = 
					webserviceMethod_Internal( 
							webserviceRequestHeaderContents,
							webserviceMethod_Internal_Params,
							httpServletRequest );
			
			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );
			
			if ( webserviceMethod_Internal_Results.returnBadRequestStatusCode ) {
				
				return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );
			}
			
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

	
	//  Submit Program currently using Project_UploadData_UploadFile_RestWebserviceController

	//    From Submit Program XML
	
//	@PostMapping( 
//			path = { 
//					AA_RestWSControllerPaths_Constants.PATH_START_ALL
//					+ AA_RestWSControllerPaths_Constants.PROJECT__UPLOAD_DATA_UPLOAD_FILE_FROM_SUBMIT_PGM_REST_WEBSERVICE_CONTROLLER
//			},
//			consumes = MediaType.APPLICATION_XML_VALUE, produces = MediaType.APPLICATION_XML_VALUE )
//
////	@RequestMapping( 
////			path = AA_RestWSControllerPaths_Constants.,
////			method = RequestMethod.POST,
////			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
//
//    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_XML(
//
//    		//  Remove since not in the 'path' in @PostMapping
////			@PathVariable(value = AA_RestWSControllerPaths_Constants.PATH_PARAMETER_LABEL_WEBSERVICE_SYNC_TRACKING) 
////    		String webserviceSyncTracking,
//    		
//			//  No @RequestBody since the POST body will be read in this method and copied to a local file
//    		//  @RequestBody byte[] postBody,
//    		
//    		HttpServletRequest httpServletRequest,
//    		HttpServletResponse httpServletResponse
//    		) throws Exception {
//    	
////    	String postBodyString = new String( postBody );
//    	
//    	SubmitImport_V2_UploadFile_Chunking_Request_Common webserviceRequestHeaderContents = null;
//
//		String uploadFileParamsXML = httpServletRequest.getHeader( UPLOAD_FILE_HEADER_PARAMETER_PARAMS_PGM_XML );
//
//		if ( StringUtils.isEmpty( uploadFileParamsXML ) ) {
//			log.warn( "'" + UPLOAD_FILE_HEADER_PARAMETER_PARAMS_PGM_XML + "' header parameter is not sent or is empty" );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//
//		Object webserviceRequestHeaderContentsAsObject = unmarshal_RestRequest_XML_ToObject.getObjectFromXMLString( uploadFileParamsXML );
//		if ( webserviceRequestHeaderContentsAsObject == null ) {
//			log.warn("webserviceRequestHeaderContentsAsObject == null");
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//		try {
//			webserviceRequestHeaderContents = (SubmitImport_V2_UploadFile_Chunking_Request_Common) webserviceRequestHeaderContentsAsObject;
//		} catch ( Exception e ) {
//			final String msg = "Failed to cast returned webserviceRequestHeaderContentsAsObject from XML to SubmitImport_V2_UploadFile_Chunking_Request_Common."
//					+ " webserviceRequestHeaderContentsAsObject.getClass(): " + webserviceRequestHeaderContentsAsObject.getClass();
//			log.warn(msg );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//
//		if ( StringUtils.isEmpty( webserviceRequestHeaderContents.getUserSubmitImportProgramKey() ) ) {
//			final String msg = "UserSubmitImportProgramKey is empty.";
//			log.warn(msg );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//
//		int projectId = getProjectId( webserviceRequestHeaderContents );
//		
//		Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result validateResult =
//				validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId
//				.validateProjectOwnerAllowed(
//						webserviceRequestHeaderContents.getUserSubmitImportProgramKey(), 
//						projectId,
//						null /* SubmitImport_Init_Response_PgmXML webserviceResult */ );
//    	
//		if ( ! validateResult.isSuccess() ) {
//			
//			SubmitImport_V2_UploadFile_Chunking_Response_PgmXML webserviceResult = new SubmitImport_V2_UploadFile_Chunking_Response_PgmXML();
//			
//			webserviceResult.setStatusSuccess( false );
//			
//			//  TODO  Set error reason
////			webserviceResult.set 
//			
//			byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );
//
//			//  TODO  Return other than 200 code?
//			return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
//		}
//		
//		if ( validateResult.getUserId() == null ) {
//			final String msg = "ERROR: validateResult.getUserId() == null";
//			log.error( msg );
//			throw new LimelightInternalErrorException(msg);
//		}
//		
//		SubmitImport_V2_UploadFile_Chunking_Response_PgmXML webserviceResult = new SubmitImport_V2_UploadFile_Chunking_Response_PgmXML();
//
//		WebserviceMethod_Internal_Params webserviceMethod_Internal_Params = new WebserviceMethod_Internal_Params();
//		webserviceMethod_Internal_Params.projectId = projectId;
//		webserviceMethod_Internal_Params.userId = validateResult.getUserId();
//		webserviceMethod_Internal_Params.webserviceResult = webserviceResult;
//		
//		WebserviceMethod_Internal_Results webserviceMethod_Internal_Results = 
//				webserviceMethod_Internal(
//						webserviceRequestHeaderContents,
//						webserviceMethod_Internal_Params,
//						httpServletRequest );
//
//		byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );
//
//		if ( webserviceMethod_Internal_Results.returnBadRequestStatusCode ) {
//			return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_XML).body( responseAsXML );
//		}
//
//		return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
//    }

    /**
     * @param webserviceRequest
     * @return
     */
    private int getProjectId( SubmitImport_V2_UploadFile_Chunking_Request_Common webserviceRequest ) {

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
	private WebserviceMethod_Internal_Results webserviceMethod_Internal( 
			
			SubmitImport_V2_UploadFile_Chunking_Request_Common webserviceRequestHeaderContents,
			WebserviceMethod_Internal_Params webserviceMethod_Internal_Params,
			HttpServletRequest httpServletRequest ) throws Exception {

		SubmitImport_V2_UploadFile_Chunking_Response_Base webserviceResult = webserviceMethod_Internal_Params.webserviceResult;

		WebserviceMethod_Internal_Results methodResults = new WebserviceMethod_Internal_Results();

		//  contentLength is length of chunk

		long contentLength = httpServletRequest.getContentLengthLong();

		try {

			///  Check chunk size (using contentLength)
			
			if ( contentLength > FileUploadMaxFileSize_Config_WithConstantsDefaults.MAX_FILE_UPLOAD_CHUNK_SIZE ) {
				
				//  Return Error
				webserviceResult.setStatusSuccess( false );

				methodResults.returnBadRequestStatusCode = true;

				//  EARLY RETURN
				return methodResults;
			}
			

			String uploadedFilename = webserviceRequestHeaderContents.getFilename();
			String projectIdString = webserviceRequestHeaderContents.getProjectIdentifier();
			String uploadKeyString = webserviceRequestHeaderContents.getUploadKey();
			
			Long uploadFileSize = webserviceRequestHeaderContents.getUploadFileSize();
			Long fileChunk_StartByte = webserviceRequestHeaderContents.getFileChunk_StartByte();

			if ( uploadFileSize == null ) {
				log.warn( "'uploadFileSize' header JSON parameter is null. uploadKeyString: " + uploadKeyString
					+ ", projectId: " + webserviceMethod_Internal_Params.projectId 
					+ ", userId: " + webserviceMethod_Internal_Params.userId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( fileChunk_StartByte == null ) {
				log.warn( "'fileChunk_StartByte' header JSON parameter is null.  uploadKeyString: " + uploadKeyString
					+ ", projectId: " + webserviceMethod_Internal_Params.projectId 
					+ ", userId: " + webserviceMethod_Internal_Params.userId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			if ( webserviceRequestHeaderContents.getFileChunk_SequenceNumber() == null ) {
				log.warn( "'fileChunk_SequenceNumber' header JSON parameter is null.  uploadKeyString: " + uploadKeyString
					+ ", projectId: " + webserviceMethod_Internal_Params.projectId 
					+ ", userId: " + webserviceMethod_Internal_Params.userId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
					
			if ( StringUtils.isEmpty( uploadedFilename ) ) {
				log.warn( "'filename' header JSON/XML parameter is not sent or is empty.  uploadKeyString: " + uploadKeyString
						+ ", projectId: " + webserviceMethod_Internal_Params.projectId 
						+ ", userId: " + webserviceMethod_Internal_Params.userId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( webserviceRequestHeaderContents.getFileIndex() == null ) {
				log.error( "'fileIndex' header JSON/XML parameter is not sent or is null .  uploadKeyString: " + uploadKeyString
					+ ", projectId: " + webserviceMethod_Internal_Params.projectId 
					+ ", userId: " + webserviceMethod_Internal_Params.userId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			if ( webserviceRequestHeaderContents.getFileType() == null ) {
				log.warn( "'fileType' header JSON parameter is not sent or is null .  uploadKeyString: " + uploadKeyString
					+ ", projectId: " + webserviceMethod_Internal_Params.projectId 
					+ ", userId: " + webserviceMethod_Internal_Params.userId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			int fileTypeInt = webserviceRequestHeaderContents.getFileType();
			try {
				webserviceMethod_Internal_Params.fileType = FileImportFileType.fromValue( fileTypeInt );
			} catch (Exception e ) {
				log.warn( "'fileType' header JSON is not a valid value: " + fileTypeInt );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			if ( webserviceMethod_Internal_Params.fileType == FileImportFileType.SCAN_FILE 
					&& ( ! isScanFileImportAllowedViaWebSubmit.isScanFileImportAllowedViaWebSubmit() ) ) {

				log.warn( "'fileType' is : SCAN_FILE but scan files are not allowed via web submit" );

				//  Return Error
				webserviceResult.setStatusSuccess(false);
				webserviceResult.setScanFileNotAllowed(true);

				methodResults.returnBadRequestStatusCode = true;

				//  EARLY RETURN
				return methodResults;
			}
			

			if ( webserviceMethod_Internal_Params.fileType == FileImportFileType.FASTA_FILE 
					&& ( ! isFileObjectStorageFileImportAllowedViaWebSubmit.isFileObjectStorageFileImportAllowedViaWebSubmit() ) ) {

				log.warn( "'fileType' is : FASTA_FILE but File Object Storage files are not allowed via web submit" );

				//  Return Error
				webserviceResult.setStatusSuccess(false);
				webserviceResult.setScanFileNotAllowed(true);

				methodResults.returnBadRequestStatusCode = true;

				//  EARLY RETURN
				return methodResults;
			}
			
			
			
			
			
			if ( StringUtils.isEmpty( projectIdString ) ) {
				log.warn( "'projectIdentifier' header JSON is not sent or is empty" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			try {
				webserviceMethod_Internal_Params.projectId = Integer.parseInt( projectIdString );
			} catch (Exception e ) {
				log.warn( "'projectIdentifier' header JSON is not an integer: " + projectIdString );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( StringUtils.isEmpty( uploadKeyString ) ) {
				log.warn( "'uploadKey' header JSON is not sent or is empty" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			try {
				webserviceMethod_Internal_Params.uploadKey = Integer.parseInt( uploadKeyString );
			} catch (Exception e ) {
				log.warn( "'uploadKey' header JSON is not an integer: " + uploadKeyString );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( webserviceMethod_Internal_Params.fileType == FileImportFileType.LIMELIGHT_XML_FILE ) {
				webserviceMethod_Internal_Params.maxFileSize = FileUploadMaxFileSize_Config_WithConstantsDefaults.get_LIMELIGHT_XML_MAX_FILE_UPLOAD_SIZE();
				webserviceMethod_Internal_Params.maxFileSizeFormatted = FileUploadMaxFileSize_Config_WithConstantsDefaults.get_MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE_FORMATTED();
			} else if ( webserviceMethod_Internal_Params.fileType == FileImportFileType.SCAN_FILE ) {
				webserviceMethod_Internal_Params.maxFileSize = FileUploadMaxFileSize_Config_WithConstantsDefaults.get_SCAN_MAX_FILE_UPLOAD_SIZE();
				webserviceMethod_Internal_Params.maxFileSizeFormatted = FileUploadMaxFileSize_Config_WithConstantsDefaults.get_MAX_SCAN_FILE_UPLOAD_SIZE_FORMATTED();
			} else if ( webserviceMethod_Internal_Params.fileType == FileImportFileType.FASTA_FILE ) {
				webserviceMethod_Internal_Params.maxFileSize = FileUploadMaxFileSize_Config_WithConstantsDefaults.get_MAX_FASTA_FILE_UPLOAD_SIZE();
				webserviceMethod_Internal_Params.maxFileSizeFormatted = FileUploadMaxFileSize_Config_WithConstantsDefaults.get_MAX_FASTA_FILE_UPLOAD_SIZE_FORMATTED();
			} else {
				String msg = "Unknown value for fileType: " + webserviceMethod_Internal_Params.fileType;
				log.error( msg );
				throw new LimelightWebappFileUploadFileSystemException( msg );
			}
			
			///  Check of upload size (using uploadFileSize)
			
			if ( uploadFileSize > webserviceMethod_Internal_Params.maxFileSize ) {
				
				//  Return Error
				webserviceResult.setStatusSuccess( false );
				webserviceResult.setFileSizeLimitExceeded( true );
				webserviceResult.setMaxSize( webserviceMethod_Internal_Params.maxFileSize );
				webserviceResult.setMaxSizeFormatted( webserviceMethod_Internal_Params.maxFileSizeFormatted );

				methodResults.returnBadRequestStatusCode = true;

				//  EARLY RETURN
				return methodResults;
			}
			
			///////  Add additional checking of the filename for scan files
			if ( webserviceMethod_Internal_Params.fileType == FileImportFileType.SCAN_FILE ) {

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

					methodResults.returnBadRequestStatusCode = true;

					//  EARLY RETURN
					return methodResults;
				}
				
				webserviceMethod_Internal_Params.scanFileSuffix = supported_ScanFileSuffix__For_Input_ScanFilename; // pass on found suffix
			}

			return processWebRequest( 
					webserviceRequestHeaderContents, 
					webserviceMethod_Internal_Params, 
					contentLength,
					httpServletRequest );

		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {

			//  only rethrow Error Response Exceptions 
			throw e;

		} catch ( java.io.EOFException e ) {
			String msg = "Failed in controller with java.io.EOFException (Most likely aborted in browser but also network error): ";
			log.warn( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
			
		} catch ( Exception e ) {
			String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
		}
	}

	
	/**
	 * @param webserviceRequestHeaderContents
	 * @param webserviceMethod_Internal_Params
	 * @param httpServletRequest
	 * @return
	 * @throws Exception
	 */
	private WebserviceMethod_Internal_Results processWebRequest(
			SubmitImport_V2_UploadFile_Chunking_Request_Common webserviceRequestHeaderContents,
			WebserviceMethod_Internal_Params webserviceMethod_Internal_Params,
			long contentLength,
			HttpServletRequest httpServletRequest ) throws Exception {

		WebserviceMethod_Internal_Results methodResults = new WebserviceMethod_Internal_Results();

		SubmitImport_V2_UploadFile_Chunking_Response_Base webserviceResult = webserviceMethod_Internal_Params.webserviceResult;
		
		//  Confirm projectId is in database
		ProjectDTO projectDTO =	projectDAO.getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( webserviceMethod_Internal_Params.projectId );
		if ( projectDTO == null ) {
			// should never happen
			String msg = "Project id is not in database " + webserviceMethod_Internal_Params.projectId;
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		if ( ( ! projectDTO.isEnabled() ) || ( projectDTO.isMarkedForDeletion() ) ) {
			String msg = "Project id is disabled or marked for deletion: " + webserviceMethod_Internal_Params.projectId;
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		if ( ( projectDTO.isProjectLocked() ) ) {
			
			//  Return Error
			String msg = "Project id is locked: " + webserviceMethod_Internal_Params.projectId;
			log.warn( msg );
			webserviceResult.setStatusSuccess(false);
			webserviceResult.setProjectLocked(true);

			methodResults.returnBadRequestStatusCode = true;

			//  EARLY RETURN
			return methodResults;
		}
		
		int importTrackingId = webserviceMethod_Internal_Params.uploadKey;
		
		
		FileImportTrackingDTO fileImportTrackingDTO = fileImportTrackingDAO.getForId( importTrackingId );
		
		if ( fileImportTrackingDTO == null ) {
			String msg = "importTrackingId does NOT exist in DB: " + importTrackingId;
			log.warn( msg );

			webserviceResult.setStatusSuccess(false);
			webserviceResult.setUploadKeyNotValid( true );

			methodResults.returnBadRequestStatusCode = true;

			//  EARLY RETURN
			return methodResults;
		}
		
		if ( fileImportTrackingDTO.getUserId() != webserviceMethod_Internal_Params.userId ) {
			String msg = " user id for importTrackingId does NOT match current user id. importTrackingId: " 
					+ importTrackingId 
					+ ", current user id: " + webserviceMethod_Internal_Params.userId ;
			log.warn( msg );

			webserviceResult.setStatusSuccess(false);
			webserviceResult.setUploadKeyNotValid( true );

			methodResults.returnBadRequestStatusCode = true;

			//  EARLY RETURN
			return methodResults;
		}
		
		
		List<FileImportTrackingSingleFileDTO> fileImportTrackingSingleFileDTO_List = 
				fileImportTrackingSingleFileDAO.getFor_TrackingId_FileIndex(
						importTrackingId, webserviceRequestHeaderContents.getFileIndex() );
		
		if ( fileImportTrackingSingleFileDTO_List.isEmpty() ) {
			String msg = "importTrackingId and FileIndex does NOT exist in DB: importTrackingId: " 
					+ importTrackingId
					+ ", fileIndex: " + webserviceRequestHeaderContents.getFileIndex();
			log.warn( msg );

			webserviceResult.setStatusSuccess(false);
			webserviceResult.setUploadKeyNotValid( true );

			methodResults.returnBadRequestStatusCode = true;

			//  EARLY RETURN
			return methodResults;
			
		}

		if ( fileImportTrackingSingleFileDTO_List.size() > 1 ) {
			String msg = "importTrackingId and FileIndex More than 1 record exist in DB: importTrackingId: " 
					+ importTrackingId
					+ ", fileIndex: " + webserviceRequestHeaderContents.getFileIndex();
			log.error( msg );

			throw new LimelightInternalErrorException(msg);
		}

		FileImportTrackingSingleFileDTO fileImportTrackingSingleFileDTO = fileImportTrackingSingleFileDTO_List.get(0);
		
		//  Validate that the request matches the same 'Single File Initialize'
		
		if ( ! fileImportTrackingSingleFileDTO.getUnique_request_identifier_from_submitter().equals( webserviceRequestHeaderContents.getUniqueRequestIdentifier_ForThisFile() ) ) {
			String msg = "UniqueRequestIdentifier_ForThisFile not match value in DB from Initialize call: importTrackingId: " 
					+ importTrackingId
					+ ", fileIndex: " + webserviceRequestHeaderContents.getFileIndex();
			log.warn( msg );

			webserviceResult.setStatusSuccess(false);
			webserviceResult.setUniqueRequestIdentifier_ForThisFile_NotMatchInitializeValue( true ); 

			methodResults.returnBadRequestStatusCode = true;

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
					String msg = "Aws_s3_bucket_name in config is different from DB Single File record: importTrackingId: " 
							+ importTrackingId
							+ ", fileIndex: " + webserviceRequestHeaderContents.getFileIndex();
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
					String msg = "Aws_s3_region in config is different from DB Single File record: importTrackingId: " 
							+ importTrackingId
							+ ", fileIndex: " + webserviceRequestHeaderContents.getFileIndex();
					log.warn( msg );

					webserviceResult.setStatusSuccess(false);
					webserviceResult.setAws_S3_Config_Changed(true); 

					//  methodResults.returnBadRequestStatusCode = true;

					return methodResults;   	//  EARLY RETURN
				}
			}
		}
		
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
			if ( fileImportTrackingDataSingleFileInitJSON_Contents_Version_Number_001.getRequiredChunkSize_ExceptLastChunk__NullWhenNotSpecified() != null ) {
				
				long requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified = fileImportTrackingDataSingleFileInitJSON_Contents_Version_Number_001.getRequiredChunkSize_ExceptLastChunk__NullWhenNotSpecified();
				
				long endByte = webserviceRequestHeaderContents.getFileChunk_StartByte().longValue() + contentLength;  // StartByte is zero based
				
				if ( endByte != webserviceRequestHeaderContents.getUploadFileSize().longValue() ) {
					
					//  NOT last chunk
					
					if ( contentLength != requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified ) {
						
						String msg = "Uploaded chunk is NOT last chunk and is NOT required chunk size: importTrackingId: " 
								+ importTrackingId
								+ ", fileIndex: " + webserviceRequestHeaderContents.getFileIndex();
						log.warn( msg );

						webserviceResult.setStatusSuccess(false);
						webserviceResult.setUploadKeyNotValid( true );

						methodResults.returnBadRequestStatusCode = true;

						//  EARLY RETURN
						return methodResults;
					}
					
				}
			}
		}
		
		File importer_Work_Directory = Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();

		String dirNameForImportTrackingId =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().getDirForImportTrackingId( importTrackingId );

		//  Get the File object for the Base Subdir used to store the files in this request 
		File importFilesBaseDir = new File( importer_Work_Directory, FileUploadCommonConstants.IMPORT_BASE_DIR );
//		if ( ! importFilesBaseDir.exists() ) {
//			//		boolean mkdirResult = 
//			importFilesBaseDir.mkdir();
//		}
		if ( ! importFilesBaseDir.exists() ) {
			String msg = "importFilesBaseDir does not exist after testing for it and attempting to create it.  importFilesBaseDir: " 
					+ importFilesBaseDir.getAbsolutePath();
			log.error( msg );
			throw new LimelightWebappFileUploadFileSystemException(msg);
		}

		//  Directory for This new Import

		File dirForImportTrackingId  =  new File( importFilesBaseDir , dirNameForImportTrackingId );
		if ( ! dirForImportTrackingId.exists() ) {
			String msg = "dirForImportTrackingId does NOT exist: " + dirForImportTrackingId.getAbsolutePath();
			log.warn( msg );

			webserviceResult.setStatusSuccess(false);
			webserviceResult.setUploadKeyNotValid( true );

			methodResults.returnBadRequestStatusCode = true;

			//  EARLY RETURN
			return methodResults;
		}
		
		///   Matching "data" file for uploaded file with data about the file.
		File dataFile = 
				limelight_XML_Importer_Work_Directory_And_SubDirs_Web
				.getDataFile( webserviceRequestHeaderContents.getFileIndex(), dirForImportTrackingId );
		
		if ( dataFile.exists() && webserviceRequestHeaderContents.getFileChunk_StartByte().intValue() == 0 ) {
			String msg = "dataFile already exists: " + dataFile.getCanonicalPath();
			log.warn( msg );
			throw new LimelightWebappFileUploadFileSystemException(msg);
		}

		//  File to store the uploaded contents to
		File uploadedFileOnDisk = 
				limelight_XML_Importer_Work_Directory_And_SubDirs_Web
				.getUploadFile( 
						webserviceMethod_Internal_Params.scanFileSuffix,
						webserviceRequestHeaderContents.getFileIndex(),
						webserviceMethod_Internal_Params.fileType,
						dirForImportTrackingId );
		
		
//		If S3, then Store to S3,  else code that is next
//		
//		
//		!!!   entity tag (ETag) header  must be stored to DB for each webservice call so available in "Complete" webservice call
//				Whenever you upload a part, Amazon S3 returns an entity tag (ETag) header in its response. 
//				For each part upload, you must record the part number and the ETag value. 
//				You must include these values in the subsequent request to complete the multipart upload.
		
		if ( StringUtils.isNotEmpty( fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() ) ) {
			
			if ( webserviceRequestHeaderContents.getFileChunk_SequenceNumber() > Limelight__AWS_S3_Constants.AWS_S3_MULTIPART_UPLOAD_UPLOAD_PART__MAXIMUM_PART_NUMBER ) {
				String msg = "webserviceRequestHeaderContents.getFileChunk_SequenceNumber() > AWS_S3_MULTIPART_UPLOAD_UPLOAD_PART__MAXIMUM_PART_NUMBER:  FileChunk_SequenceNumber: "
						+ webserviceRequestHeaderContents.getFileChunk_SequenceNumber()
						+ ", AWS_S3_MULTIPART_UPLOAD_UPLOAD_PART__MAXIMUM_PART_NUMBER: "
						+ Limelight__AWS_S3_Constants.AWS_S3_MULTIPART_UPLOAD_UPLOAD_PART__MAXIMUM_PART_NUMBER;
				log.warn( msg );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			if ( webserviceRequestHeaderContents.getFileChunk_SequenceNumber() > Integer.MAX_VALUE ) {
				
				String msg = "webserviceRequestHeaderContents.getFileChunk_SequenceNumber() > Integer.MAX_VALUE.  value: " 
					+ webserviceRequestHeaderContents.getFileChunk_SequenceNumber();
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			
			final int s3_UploadPart_Number = (int) webserviceRequestHeaderContents.getFileChunk_SequenceNumber().longValue();
			
			long s3_UploadPart_EndByte_ZeroBased = webserviceRequestHeaderContents.getFileChunk_StartByte() + contentLength - 1;

			{  //  Check if Part Number already in DB and process if is.
				
				FileImportTrackingSingleFile_S3UploadPart_DTO FileImportTrackingSingleFile_S3UploadPart_DTO = 
						fileImportTrackingSingleFile_S3UploadPart_DAO.getFor_FileImportTrackingSingleFileId_S3_UploadPart_Number(
								fileImportTrackingSingleFileDTO.getId(), s3_UploadPart_Number );

				if ( FileImportTrackingSingleFile_S3UploadPart_DTO != null ) {
					//  Part number exists so validate the start end and then skip the upload.


					throw new LimelightInternalErrorException( "NOT HANDLED:  fileImportTrackingSingleFile_S3UploadPart_DAO.getFor_FileImportTrackingSingleFileId_S3_UploadPart_Number(...) returned a record");
					

//					return;
				}
			}
			
			{
				//  TODO
				
				//  Validate that all the previous part numbers are inserted
				
				//  Validate that the start of this part is next after the end of the previous part
				
				
			}

			//  Copy InputStream containing POST body into S3 Object
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
				
				 String s3_UploadPart_Etag = null;
				 
				 {
					 try ( InputStream inputStreamFromPOSTLocal = httpServletRequest.getInputStream() ) {


						 //  TODO  Duplicate the File validation below

						 //        FASTA: Validate that starts with ">"

						 //        Limelight XML:  call:  limelightXMLFile_Minimal_Validate__GetSearchNameIfInFile(...)

						 //				limelightXMLFile_Minimal_Validate__GetSearchNameIfInFile.limelightXMLFile_Minimal_Validate__GetSearchNameIfInFile(limelightXMLFileInputStream);

						 UploadPartRequest uploadPartRequest = UploadPartRequest.builder()
								 .bucket(fileImportTrackingSingleFileDTO.getAws_s3_bucket_name())
								 .key(fileImportTrackingSingleFileDTO.getAws_s3_object_key())
								 .uploadId(fileImportTrackingDataSingleFileInitJSON_Contents_Version_Number_001.getUploadId_S3Client_MultipartUpload())
								 .partNumber( s3_UploadPart_Number )
								 .build();

						 RequestBody amazonS3_RequestBody = RequestBody.fromInputStream(inputStreamFromPOSTLocal, contentLength);

						 UploadPartResponse uploadPartResponse =
								 amazonS3_Client.uploadPart(uploadPartRequest, amazonS3_RequestBody );

						 s3_UploadPart_Etag = uploadPartResponse.eTag();
					 }
				 }
			

				 FileImportTrackingSingleFile_S3UploadPart_DTO fileImportTrackingSingleFile_S3UploadPart_DTO = new FileImportTrackingSingleFile_S3UploadPart_DTO();

				 fileImportTrackingSingleFile_S3UploadPart_DTO.setFileImportTrackingSingleFileId(fileImportTrackingSingleFileDTO.getId());
				 fileImportTrackingSingleFile_S3UploadPart_DTO.setS3_UploadPart_Number(s3_UploadPart_Number);

				 fileImportTrackingSingleFile_S3UploadPart_DTO.setS3_UploadPart_StartByte_ZeroBased(webserviceRequestHeaderContents.getFileChunk_StartByte());
				 fileImportTrackingSingleFile_S3UploadPart_DTO.setS3_UploadPart_EndByte_ZeroBased(s3_UploadPart_EndByte_ZeroBased);

				 fileImportTrackingSingleFile_S3UploadPart_DTO.setS3_UploadPart_Etag(s3_UploadPart_Etag);

				 fileImportTrackingSingleFile_S3UploadPart_DAO.save(fileImportTrackingSingleFile_S3UploadPart_DTO);
			}
			
		} else {
			
			long fileTotalSize = 0;
			
			{
				if ( uploadedFileOnDisk.exists() ) {
					
					fileTotalSize = uploadedFileOnDisk.length();
					
					if ( webserviceRequestHeaderContents.getFileChunk_StartByte().longValue() < fileTotalSize ) {
						
						//  Already saved this block so skip
		
						webserviceResult.setStatusSuccess( true );
						
						return methodResults;  //  EARLY RETURN
					}
				}
			}
			
			//  Copy InputStream containing POST body into memory buffer and then into file on disk
			{
				//  Copy to in memory buffer first to ensure get full chunk before append to file
				
				byte[] bytes_FullChunk = new byte[ FileUploadMaxFileSize_Config_WithConstantsDefaults.MAX_FILE_UPLOAD_CHUNK_SIZE ];
				int bytes_FullChunk__StartIndex = 0;
				int bytes_FullChunk__BytesPopulatedCount = 0;
	
				boolean fileTooLarge = false;
	
				try ( InputStream inputStreamFromPOSTLocal = httpServletRequest.getInputStream() ) {
	
					byte[] buf = new byte[ COPY_FILE_ARRAY_SIZE ];
					int len;
					while ((len = inputStreamFromPOSTLocal.read(buf)) > 0){
	
						for ( int index = 0; index < len; index++ ) {
							bytes_FullChunk[ bytes_FullChunk__StartIndex + index ] = buf[ index ];
						}
						bytes_FullChunk__StartIndex += len;
						bytes_FullChunk__BytesPopulatedCount += len;
	
						fileTotalSize += len;
						if ( fileTotalSize > webserviceMethod_Internal_Params.maxFileSize ) {
	
							fileTooLarge = true;
							break;
						}
					}
				}
				
				if ( fileTooLarge ) {
					
					if ( ! uploadedFileOnDisk.delete() ) {
						log.warn("Failed to delete upload file that is canceled since too large.  file: " + uploadedFileOnDisk.getAbsolutePath() );
					}
					//  Return Error -  Status Code 400
					webserviceResult.setStatusSuccess(false);
					webserviceResult.setFileSizeLimitExceeded( true );
					webserviceResult.setMaxSize( webserviceMethod_Internal_Params.maxFileSize );
					webserviceResult.setMaxSizeFormatted( webserviceMethod_Internal_Params.maxFileSizeFormatted );
	
					methodResults.returnBadRequestStatusCode = true;
	
					//  EARLY RETURN
					return methodResults;
				}
	
				if ( bytes_FullChunk__BytesPopulatedCount != contentLength ) {
					
					log.warn("Failed to delete upload file, bytes read is not same as contentLength ");
	
						//  Return Error -  Status Code 400
					webserviceResult.setStatusSuccess(false);
	
					methodResults.returnBadRequestStatusCode = true;
	
					//  EARLY RETURN
					return methodResults;
				}
				
				
	
				try ( FileOutputStream fos = new FileOutputStream( uploadedFileOnDisk, true /* append */ )) {
					fos.write(bytes_FullChunk, 0, bytes_FullChunk__BytesPopulatedCount);
				}
				
			}
	
			{
				int fileTypeInt = webserviceRequestHeaderContents.getFileType();
				try {
					webserviceMethod_Internal_Params.fileType = FileImportFileType.fromValue( fileTypeInt );
				} catch (Exception e ) {
					log.warn( "'fileType' header JSON is not a valid value: " + fileTypeInt );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
	
				if ( webserviceMethod_Internal_Params.fileType == FileImportFileType.LIMELIGHT_XML_FILE ) {
	
					//  If first chunk of Limelight XML file or whole file is less than chunk size, minimal validate contents 
	
					long fileSize = uploadedFileOnDisk.length();
	
					if ( ( fileSize >= FileUploadMaxFileSize_Config_WithConstantsDefaults.MAX_FILE_UPLOAD_CHUNK_SIZE 
							&& fileSize < ( FileUploadMaxFileSize_Config_WithConstantsDefaults.MAX_FILE_UPLOAD_CHUNK_SIZE * 2 ) )
							|| fileSize >= webserviceRequestHeaderContents.getUploadFileSize() ) {
	
						try {

							try ( InputStream limelightXMLFileInputStream = new FileInputStream(uploadedFileOnDisk) ) {
								limelightXMLFile_Minimal_Validate__GetSearchNameIfInFile.limelightXMLFile_Minimal_Validate__GetSearchNameIfInFileContents(limelightXMLFileInputStream);
							}
						} catch ( LimelightWebappDataException e) {
	
							//  File validation failed
	
							//  Return Error -  Status Code 400
							webserviceResult.setStatusSuccess(false);
							webserviceResult.setLimelightXMLFilerootXMLNodeIncorrect(true);
	
							methodResults.returnBadRequestStatusCode = true;
	
							//  EARLY RETURN
							return methodResults;
						}
					}
	
				}
	
				if ( webserviceMethod_Internal_Params.fileType == FileImportFileType.FASTA_FILE ) {
	
					//  If first chunk of FASTA file or whole file is less than chunk size, minimal validate contents 
	
					long fileSize = uploadedFileOnDisk.length();
	
					if ( ( fileSize >= FileUploadMaxFileSize_Config_WithConstantsDefaults.MAX_FILE_UPLOAD_CHUNK_SIZE 
							&& fileSize < ( FileUploadMaxFileSize_Config_WithConstantsDefaults.MAX_FILE_UPLOAD_CHUNK_SIZE * 2 ) )
							|| fileSize >= webserviceRequestHeaderContents.getUploadFileSize() ) {
	
						try {
							fastaFile_Uploaded_Minimal_Validate.fastaFile_Uploaded_Minimal_Validate(uploadedFileOnDisk);
							
						} catch ( LimelightWebappDataException e) {
	
							//  File validation failed
	
							//  Return Error -  Status Code 400
							webserviceResult.setStatusSuccess(false);
							webserviceResult.setFastaFile_InvalidContents(true);
	
							methodResults.returnBadRequestStatusCode = true;
	
							//  EARLY RETURN
							return methodResults;
						}
					}
	
				}
			}
		}
			
		if ( log.isInfoEnabled() ) {

			//  No SubmitProgramVersionNumber is passed from Submitter Program
						
			log.info( "Successful upload of file Chunk/Part for import.  UserId: " + webserviceMethod_Internal_Params.userId
					+ ", project id: " + webserviceMethod_Internal_Params.projectId
					+ ", upload key: " + webserviceMethod_Internal_Params.uploadKey 
					+ ", filename: " + webserviceRequestHeaderContents.getFilename()
					+ ", FileChunk_StartByte: " + webserviceRequestHeaderContents.getFileChunk_StartByte()
					+ ", request URL: " + webserviceMethod_Internal_Params.requestURL );
		}
		
		webserviceResult.setStatusSuccess( true );
		
		return methodResults;
	}

	/**
	 * Params to internal method webserviceMethod_Internal
	 *
	 */
	private static class WebserviceMethod_Internal_Params {

		FileImportFileType fileType = null;

		String scanFileSuffix = null;
		
		int projectId = -1;
		int uploadKey = -1;
		long maxFileSize = -1;
		String maxFileSizeFormatted = null;

		String requestURL;
		
		int userId;
		
		SubmitImport_V2_UploadFile_Chunking_Response_Base webserviceResult; 
	}

	/**
	 * Results from internal method webserviceMethod_Internal
	 *
	 */
	private static class WebserviceMethod_Internal_Results {

		boolean returnBadRequestStatusCode;
	}
	
}
