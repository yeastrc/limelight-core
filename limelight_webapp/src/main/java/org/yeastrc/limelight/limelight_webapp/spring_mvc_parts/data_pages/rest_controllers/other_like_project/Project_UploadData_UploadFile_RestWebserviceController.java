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
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportFileType;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_UploadFile_Request_Common;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_UploadFile_Response_Base;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_UploadFile_Response_PgmXML;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectIdIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappFileUploadFileSystemException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.config_with_constants_default.FileUploadMaxFileSize_Config_WithConstantsDefaults;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.constants.LimelightXMLFileUploadWebConstants;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.objects.LimelightUploadTempDataFileContents;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsLimelightXMLFileImportFullyConfiguredIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsScanFileImportAllowedViaWebSubmitIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.Limelight_XML_Importer_Work_Directory_And_SubDirs_WebIF;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.SpectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Marshal_RestRequest_Object_ToXML;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_XML_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * For Upload Data, Upload File (Receive file from web app or from submitter program)
 *
 * WARNING:  The Submit Import Program will show the value of BaseSubmitImportWebserviceResponse.statusFail_ErrorMessage when set
 * 			 and will NO LONGER check the boolean flags (other than statusSuccess).
 * 			 So the property BaseSubmitImportWebserviceResponse.statusFail_ErrorMessage will be REQUIRED to be set for all errors. 
 *
 */
@RestController
public class Project_UploadData_UploadFile_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_UploadData_UploadFile_RestWebserviceController.class );

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
	private IsScanFileImportAllowedViaWebSubmitIF isScanFileImportAllowedViaWebSubmit;

	@Autowired
	private ProjectDAO_IF projectDAO;

	@Autowired
	private Limelight_XML_Importer_Work_Directory_And_SubDirs_WebIF limelight_XML_Importer_Work_Directory_And_SubDirs_Web;

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
	
	//  Web app using new Project_UploadData_UploadFile_Chunking_Upload_File_RestWebserviceController
	

	//    From Web App

	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.

//	@PostMapping( 
//			path = {
//					AA_RestWSControllerPaths_Constants.PATH_START_ALL
//					+ AA_RestWSControllerPaths_Constants.PROJECT__UPLOAD_DATA_UPLOAD_FILE_REST_WEBSERVICE_CONTROLLER
//			},
//			consumes = MediaType.APPLICATION_OCTET_STREAM_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )
//
//	public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_JSON(
//
//			//  No @RequestBody since the POST body will be read in this method and copied to a local file
//			//  @RequestBody byte[] postBody,
//
//			HttpServletRequest httpServletRequest,
//			HttpServletResponse httpServletResponse
//			) throws Exception {
//		
//		try {
//
//			//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
//			//    to return specific error to web app JS code if webserviceSyncTracking is not current value
//			validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );
//
//
//			//    			String requestURL = httpServletRequest.getRequestURL().toString();
//
//			String uploadFileParamsJSON = httpServletRequest.getHeader( UPLOAD_FILE_HEADER_PARAMETER_PARAMS_WEB_JSON );
//
//			if ( StringUtils.isEmpty( uploadFileParamsJSON ) ) {
//				log.warn( "'" + UPLOAD_FILE_HEADER_PARAMETER_PARAMS_WEB_JSON + "' header parameter is not sent or is empty" );
//				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//			}
//
//			SubmitImport_UploadFile_Request_Common webserviceRequestHeaderContents = 
//					unmarshalJSON_ToObject.getObjectFromJSONString( uploadFileParamsJSON, SubmitImport_UploadFile_Request_Common.class );
//
//			int projectId = getProjectId( webserviceRequestHeaderContents );
//
//			List<Integer> projectIds = new ArrayList<>( 1 );
//			projectIds.add( projectId );
//
//			//  Restrict access to Project owners or above (admin), if project was not locked
//			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
//					validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
//					.validateProjectOwnerAllowed( projectIds, httpServletRequest );
//
//			//  If NOT Limelight XML File Import is Fully Configured, 
//			if ( ! isLimelightXMLFileImportFullyConfigured.isLimelightXMLFileImportFullyConfigured() ) {
//				String msg = "Limelight XML File Import is NOT Fully Configured ";
//				log.error( msg );
//				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//			}
//			
//			UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();
//			if ( userSession == null ) {
//				throw new LimelightInternalErrorException( "userSession should not be null" );
//			}
//			Integer userId = userSession.getUserId();
//			if ( userId == null ) {
//				throw new LimelightInternalErrorException( "userId should not be null" );
//			}
//			
//			SubmitImport_UploadFile_Response_WebJSON webserviceResult = new SubmitImport_UploadFile_Response_WebJSON();
//
//			WebserviceMethod_Internal_Params webserviceMethod_Internal_Params = new WebserviceMethod_Internal_Params();
//			webserviceMethod_Internal_Params.projectId = projectId;
//			webserviceMethod_Internal_Params.userId = userId;
//			webserviceMethod_Internal_Params.webserviceResult = webserviceResult;
//			
//			WebserviceMethod_Internal_Results webserviceMethod_Internal_Results = 
//					webserviceMethod_Internal( 
//							webserviceRequestHeaderContents,
//							webserviceMethod_Internal_Params,
//							httpServletRequest );
//			
//			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );
//			
//			if ( webserviceMethod_Internal_Results.returnBadRequestStatusCode ) {
//				
//				return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );
//			}
//			
//			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );
//
//		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
//
//			//  only rethrow Error Response Exceptions 
//			throw e;
//
//		} catch ( Exception e ) {
//			String msg = "Failed in controller: ";
//			log.error( msg, e );
//			throw new Limelight_WS_InternalServerError_Exception();
//		}	
//	}
		

	//    From Submit Program XML
	
	@PostMapping( 
			path = { 
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.PROJECT__UPLOAD_DATA_UPLOAD_FILE_FROM_SUBMIT_PGM_REST_WEBSERVICE_CONTROLLER
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
    		
			//  No @RequestBody since the POST body will be read in this method and copied to a local file
    		//  @RequestBody byte[] postBody,
    		
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
//    	String postBodyString = new String( postBody );
    	
    	SubmitImport_UploadFile_Request_Common webserviceRequestHeaderContents = null;

		String uploadFileParamsXML = httpServletRequest.getHeader( UPLOAD_FILE_HEADER_PARAMETER_PARAMS_PGM_XML );

		if ( StringUtils.isEmpty( uploadFileParamsXML ) ) {
			log.warn( "'" + UPLOAD_FILE_HEADER_PARAMETER_PARAMS_PGM_XML + "' header parameter is not sent or is empty" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		Object webserviceRequestHeaderContentsAsObject = unmarshal_RestRequest_XML_ToObject.getObjectFromXMLString( uploadFileParamsXML );
		if ( webserviceRequestHeaderContentsAsObject == null ) {
			log.warn("webserviceRequestHeaderContentsAsObject == null");
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		try {
			webserviceRequestHeaderContents = (SubmitImport_UploadFile_Request_Common) webserviceRequestHeaderContentsAsObject;
		} catch ( Exception e ) {
			final String msg = "Failed to cast returned webserviceRequestHeaderContentsAsObject from XML to SubmitImport_UploadFile_Request_Common."
					+ " webserviceRequestHeaderContentsAsObject.getClass(): " + webserviceRequestHeaderContentsAsObject.getClass();
			log.warn(msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		if ( StringUtils.isEmpty( webserviceRequestHeaderContents.getUserSubmitImportProgramKey() ) ) {
			final String msg = "UserSubmitImportProgramKey is empty.";
			log.warn(msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		int projectId = getProjectId( webserviceRequestHeaderContents );
		
		Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result validateResult =
				validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId
				.validateProjectOwnerAllowed(
						webserviceRequestHeaderContents.getUserSubmitImportProgramKey(), 
						projectId,
						null /* SubmitImport_Init_Response_PgmXML webserviceResult */ );
    	
		if ( ! validateResult.isSuccess() ) {
			
			SubmitImport_UploadFile_Response_PgmXML webserviceResult = new SubmitImport_UploadFile_Response_PgmXML();
			
			webserviceResult.setStatusSuccess( false );

			if ( log.isInfoEnabled() ) {
				
				if ( validateResult.getUserId() == null ) {
					log.info( "Validate Access: Result is Fail: Cannot find User for UserSubmitImportProgramKey. " );
				} else {
					log.info( "Validate Access: Result is Fail: User does not have Project Owner access or project is locked.  UserId: " + validateResult.getUserId() 
							+ ", projectId: " + projectId
							+ ", filename being uploaded (from request header):" + webserviceRequestHeaderContents.getFilename()
							+ ", Upload Key (from request header):" + webserviceRequestHeaderContents.getUploadKey() );
				}
			}
			
			
			//  TODO  Set error reason
//			webserviceResult.set 
			
			byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );

			//  TODO  Return other than 200 code?
			return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
		}
		
		if ( validateResult.getUserId() == null ) {
			final String msg = "ERROR: validateResult.getUserId() == null";
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}
		
		SubmitImport_UploadFile_Response_PgmXML webserviceResult = new SubmitImport_UploadFile_Response_PgmXML();

		WebserviceMethod_Internal_Params webserviceMethod_Internal_Params = new WebserviceMethod_Internal_Params();
		webserviceMethod_Internal_Params.projectId = projectId;
		webserviceMethod_Internal_Params.requestURL = httpServletRequest.getRequestURL().toString();
		webserviceMethod_Internal_Params.userId = validateResult.getUserId();
		webserviceMethod_Internal_Params.webserviceResult = webserviceResult;
		
		WebserviceMethod_Internal_Results webserviceMethod_Internal_Results = 
				webserviceMethod_Internal(
						webserviceRequestHeaderContents,
						webserviceMethod_Internal_Params,
						httpServletRequest );

		byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );

		if ( webserviceMethod_Internal_Results.returnBadRequestStatusCode ) {
			return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_XML).body( responseAsXML );
		}

		return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
    }

    /**
     * @param webserviceRequest
     * @return
     */
    private int getProjectId( SubmitImport_UploadFile_Request_Common webserviceRequest ) {

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
			
			SubmitImport_UploadFile_Request_Common webserviceRequestHeaderContents,
			WebserviceMethod_Internal_Params webserviceMethod_Internal_Params,
			HttpServletRequest httpServletRequest ) throws Exception {

		SubmitImport_UploadFile_Response_Base webserviceResult = webserviceMethod_Internal_Params.webserviceResult;

		WebserviceMethod_Internal_Results methodResults = new WebserviceMethod_Internal_Results();


		long contentLength = httpServletRequest.getContentLengthLong();

		try {

			String uploadedFilename = webserviceRequestHeaderContents.getFilename();
			String projectIdString = webserviceRequestHeaderContents.getProjectIdentifier();
			String uploadKeyString = webserviceRequestHeaderContents.getUploadKey();

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
				log.warn( "'fileType' header JSON/XML is not a valid value: " + fileTypeInt + ".  uploadKeyString: " + uploadKeyString
					+ ", projectId: " + webserviceMethod_Internal_Params.projectId 
					+ ", userId: " + webserviceMethod_Internal_Params.userId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			if ( webserviceMethod_Internal_Params.fileType == FileImportFileType.SCAN_FILE 
					&& ( ! isScanFileImportAllowedViaWebSubmit.isScanFileImportAllowedViaWebSubmit() ) ) {

				log.warn( "'fileType' is : SCAN_FILE but scan files are not allowed via web submit.  uploadKeyString: " + uploadKeyString
					+ ", projectId: " + webserviceMethod_Internal_Params.projectId 
					+ ", userId: " + webserviceMethod_Internal_Params.userId );

				//  Return Error
				webserviceResult.setStatusSuccess(false);
				webserviceResult.setScanFileNotAllowed(true);

				methodResults.returnBadRequestStatusCode = true;

				//  EARLY RETURN
				return methodResults;
			}
			if ( StringUtils.isEmpty( projectIdString ) ) {
				log.warn( "'projectIdentifier' header JSON is not sent or is empty.  uploadKeyString: " + uploadKeyString
					+ ", projectId: " + webserviceMethod_Internal_Params.projectId 
					+ ", userId: " + webserviceMethod_Internal_Params.userId );
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
				webserviceMethod_Internal_Params.uploadKey = Long.parseLong( uploadKeyString );
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
			} else {
				String msg = "Unknown value for fileType: " + webserviceMethod_Internal_Params.fileType + ".  uploadKeyString: " + uploadKeyString
					+ ", projectId: " + webserviceMethod_Internal_Params.projectId 
					+ ", userId: " + webserviceMethod_Internal_Params.userId;
				log.error( msg );
				throw new LimelightWebappFileUploadFileSystemException( msg );
			}
			
			///  Check of upload size (using contentLength)
			
			if ( contentLength > webserviceMethod_Internal_Params.maxFileSize ) {
				
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
			SubmitImport_UploadFile_Request_Common webserviceRequestHeaderContents,
			WebserviceMethod_Internal_Params webserviceMethod_Internal_Params,
			HttpServletRequest httpServletRequest ) throws Exception {

		WebserviceMethod_Internal_Results methodResults = new WebserviceMethod_Internal_Results();

		SubmitImport_UploadFile_Response_Base webserviceResult = webserviceMethod_Internal_Params.webserviceResult;
		
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
		
		File importer_Work_Directory = Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		
		String uploadFileTempDirString =
				limelight_XML_Importer_Work_Directory_And_SubDirs_Web.getDirForUploadFileTempDir();
		
		File uploadFileTempDir = new File( importer_Work_Directory, uploadFileTempDirString );
		if ( ! uploadFileTempDir.exists() ) {
			String msg = "uploadFileTempDir does not exist.  uploadFileTempDir: " 
					+ uploadFileTempDir.getAbsolutePath();
			log.error( msg );
			throw new LimelightWebappFileUploadFileSystemException(msg);
		}

		//  Get the File object for the Base Subdir used to first store the files in this request 
		File uploadFileTempSubDirForThisRequestFileObj =
				limelight_XML_Importer_Work_Directory_And_SubDirs_Web
				.getSubDirForUploadFileTempDir( 
						webserviceMethod_Internal_Params.userId, 
						webserviceMethod_Internal_Params.uploadKey, 
						uploadFileTempDir );
		
		if ( ! uploadFileTempSubDirForThisRequestFileObj.exists() ) {

			//  Return Error
			String msg = "uploadFileTempSubDirForThisRequestFileObj does not exist exists: " 
					+ uploadFileTempSubDirForThisRequestFileObj.getCanonicalPath();
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
				.getDataFile( webserviceRequestHeaderContents.getFileIndex(), uploadFileTempSubDirForThisRequestFileObj );
		if ( dataFile.exists() ) {
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
						uploadFileTempSubDirForThisRequestFileObj );
		
		//  Copy InputStream containing POST body into file on disk
		{
			long totalBytesCopied = 0;
			boolean fileTooLarge = false;

			try ( InputStream inputStreamFromPOSTLocal = httpServletRequest.getInputStream() ) {

				try ( FileOutputStream fos = new FileOutputStream( uploadedFileOnDisk )) {
					byte[] buf = new byte[ COPY_FILE_ARRAY_SIZE ];
					int len;
					while ((len = inputStreamFromPOSTLocal.read(buf)) > 0){
						fos.write(buf, 0, len);
						totalBytesCopied += len;
						if ( totalBytesCopied > webserviceMethod_Internal_Params.maxFileSize ) {
	
							fileTooLarge = true;
							break;
						}
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
		}

		{
			///   Create matching "data" file for uploaded file with data about the file.
			LimelightUploadTempDataFileContents limelightUploadTempDataFileContents = new LimelightUploadTempDataFileContents();
			limelightUploadTempDataFileContents.setUploadedFilename( webserviceRequestHeaderContents.getFilename() );
			limelightUploadTempDataFileContents.setSavedToDiskFilename( uploadedFileOnDisk.getName() );
			limelightUploadTempDataFileContents.setFileIndex( webserviceRequestHeaderContents.getFileIndex() );
			limelightUploadTempDataFileContents.setFileType( webserviceMethod_Internal_Params.fileType );
//			limelightUploadTempDataFileContents.setSearchNameInFile( searchNameInFile ); //  TODO  Set if parse Limelight XML file
			limelightUploadTempDataFileContents.setCanonicalFilename_W_Path_OnSubmitMachine( webserviceRequestHeaderContents.getCanonicalFilename_W_Path_OnSubmitMachine() );
			limelightUploadTempDataFileContents.setAbsoluteFilename_W_Path_OnSubmitMachine( webserviceRequestHeaderContents.getAbsoluteFilename_W_Path_OnSubmitMachine() );
			//  Marshal (write) the object to the file
			JAXBContext jaxbContext = JAXBContext.newInstance( LimelightUploadTempDataFileContents.class );
			Marshaller marshaller = jaxbContext.createMarshaller();
			marshaller.setProperty( Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE );
			OutputStream outputStream = null;
			try {
				outputStream = new FileOutputStream( dataFile );
				marshaller.marshal( limelightUploadTempDataFileContents, outputStream );
			} catch ( Exception e ) {
				throw e;
			} finally {
				if ( outputStream != null ) {
					outputStream.close();
				}
			}
		}
		
		if ( log.isInfoEnabled() ) {

			//  No SubmitProgramVersionNumber is passed from Submitter Program
						
			log.info( "Successful upload of file for import.  UserId: " + webserviceMethod_Internal_Params.userId
					+ ", project id: " + webserviceMethod_Internal_Params.projectId
					+ ", upload key: " + webserviceMethod_Internal_Params.uploadKey 
					+ ", filename: " + webserviceRequestHeaderContents.getFilename()
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
		long uploadKey = -1;
		long maxFileSize = -1;
		String maxFileSizeFormatted = null;
		
		String requestURL;
		
		int userId;
		
		SubmitImport_UploadFile_Response_Base webserviceResult; 
	}

	/**
	 * Results from internal method webserviceMethod_Internal
	 *
	 */
	private static class WebserviceMethod_Internal_Results {

		boolean returnBadRequestStatusCode;
	}
	
//	/**
//	 * Contents of the request header for passing info on the file uploaded in the body
//	 *
//	 */
//	public static class WebserviceRequestHeaderContents {
//		
//		private String projectIdentifier;
//		private String uploadKey;
//		private Integer fileIndex;
//		private Integer fileType;
//		private String filename;
//		private String canonicalFilename_W_Path_OnSubmitMachine;
//		private String absoluteFilename_W_Path_OnSubmitMachine;
//	}
//
//
//	/**
//	 * 
//	 *
//	 */
//	public static class WebserviceResult {
//		
//		private boolean statusSuccess;
//		//  These are populated for FileSizeLimitExceededException exception
//		private boolean fileSizeLimitExceeded;
//		private long maxSize;
//		private String maxSizeFormatted;
//		private boolean uploadFile_fieldNameInvalid;
//		private boolean moreThanOneuploadedFile;
//		private boolean filenameInFormNotMatchFilenameInQueryString;
//		private boolean noUploadedFile;
//		private boolean uploadKeyNotValid;
//		private boolean limelightXMLFileFailsInitialParse;
//		private boolean limelightXMLFilerootXMLNodeIncorrect;
//		private boolean scanFileNotAllowed;
//		private boolean scanFilenameSuffixNotValid;
//		private boolean scanFileFailsInitialParse;
//		private boolean scanFilerootXMLNodeIncorrect;
//		private boolean projectLocked; 
//	}


}
