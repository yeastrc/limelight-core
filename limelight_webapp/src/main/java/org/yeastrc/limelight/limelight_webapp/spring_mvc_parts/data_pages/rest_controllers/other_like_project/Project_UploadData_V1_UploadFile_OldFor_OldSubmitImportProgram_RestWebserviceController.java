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
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
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
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.constants.FileUploadCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportFileType;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.ImportSingleFileUploadStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_UploadFile_Request_Common;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_UploadFile_Response_Base;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_UploadFile_Response_PgmXML;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectIdIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappFileUploadFileSystemException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.config_with_constants_default.FileUploadMaxFileSize_Config_WithConstantsDefaults;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingSingleFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsFileObjectStorageFileImportAllowedViaWebSubmit_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsScanFileImportAllowedViaWebSubmitIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.Limelight_XML_Importer_Work_Directory_And_SubDirs_WebIF;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.SpectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Marshal_RestRequest_Object_ToXML;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_XML_ToObject;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.AbortMultipartUploadRequest;
import software.amazon.awssdk.services.s3.model.CompleteMultipartUploadRequest;
import software.amazon.awssdk.services.s3.model.CompletedMultipartUpload;
import software.amazon.awssdk.services.s3.model.CompletedPart;
import software.amazon.awssdk.services.s3.model.CreateMultipartUploadRequest;
import software.amazon.awssdk.services.s3.model.CreateMultipartUploadResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.UploadPartRequest;


//   Consider sending SMALL 5MB ( 5 * 1024 * 1024 ) chunks to S3 
//      when the incoming file is small enough to have under the S3 Multipart Upload limit of 10,000 chunks.
//
//      This will allow this code to retry the send to S3 if the send fails. 
//      

/**
 *  Import Limelight XML File and Scan Files and FASTA file:  Version 1
 *  
 *  Upload File (Receive file from OLD submitter program)
 *  
 * ***  KEPT to support OLD Submit Import Program (and current Submit Import Program since not yet updated)
 * 
 * WARNING:  The Submit Import Program will show the value of BaseSubmitImportWebserviceResponse.statusFail_ErrorMessage when set
 * 			 and will NO LONGER check the boolean flags (other than statusSuccess).
 * 			 So the property BaseSubmitImportWebserviceResponse.statusFail_ErrorMessage will be REQUIRED to be set for all errors. 
 *
 */
@RestController
public class Project_UploadData_V1_UploadFile_OldFor_OldSubmitImportProgram_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_UploadData_V1_UploadFile_OldFor_OldSubmitImportProgram_RestWebserviceController.class );

	private static final int COPY_FILE_ARRAY_SIZE = 32 * 1024;
	
	//  Keep all these Strings in sync with the Javascript AJAX Send:

	//  Keep all these Strings in sync with the Submit Program Send:
	
	private static final String UPLOAD_FILE_HEADER_PARAMETER_PARAMS_PGM_XML = "limelight_upload_file_params_xml";

	@Autowired
	private Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectIdIF validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId;

	@Autowired
	private IsFileObjectStorageFileImportAllowedViaWebSubmit_IF isFileObjectStorageFileImportAllowedViaWebSubmit;
	
	@Autowired
	private IsScanFileImportAllowedViaWebSubmitIF isScanFileImportAllowedViaWebSubmit;

	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;

	@Autowired
	private FileImportTrackingDAO_IF fileImportTrackingDAO;
	
	@Autowired
	private FileImportTrackingSingleFileDAO_IF fileImportTrackingSingleFileDAO;
	
	@Autowired
	private Limelight_XML_Importer_Work_Directory_And_SubDirs_WebIF limelight_XML_Importer_Work_Directory_And_SubDirs_Web;

	@Autowired
	private SpectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest_IF spectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest;
	
	@Autowired
	private Unmarshal_RestRequest_XML_ToObject unmarshal_RestRequest_XML_ToObject;
	
	@Autowired
	private Marshal_RestRequest_Object_ToXML marshal_RestRequest_Object_ToXML;


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


		long httpRequest_ContentLengthInHeader = httpServletRequest.getContentLengthLong();

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
				String msg = "Unknown value for fileType: " + webserviceMethod_Internal_Params.fileType + ".  uploadKeyString: " + uploadKeyString
					+ ", projectId: " + webserviceMethod_Internal_Params.projectId 
					+ ", userId: " + webserviceMethod_Internal_Params.userId;
				log.error( msg );
				throw new LimelightWebappFileUploadFileSystemException( msg );
			}
			
			///  Check of upload size (using contentLength)
			
			if ( httpRequest_ContentLengthInHeader > webserviceMethod_Internal_Params.maxFileSize ) {

				log.warn( "Submit Import: File Uploaded is too large. Encountered while checking upload file declared Content Length from HTTP Header."
						+ "Max file size for this file type: " + webserviceMethod_Internal_Params.maxFileSize
						+ ". Remote filename of file being submitted: "
						+ webserviceRequestHeaderContents.getFilename() 
						+ ".  File Upload size from Content Length from HTTP Header: "
						+ httpRequest_ContentLengthInHeader
						);
				
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

		long httpRequest_ContentLengthInHeader = httpServletRequest.getContentLengthLong();

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

		//   Validate that the fileImportTrackingId is for the current user
		
		FileImportTrackingDTO fileImportTrackingDTO = fileImportTrackingDAO.getForId(webserviceMethod_Internal_Params.uploadKey);
		if ( fileImportTrackingDTO == null ) {
			
			//  Return Error
			String msg = "Upload Key NOT found: " + webserviceMethod_Internal_Params.uploadKey;
			log.warn( msg );
			webserviceResult.setStatusSuccess(false);
			webserviceResult.setUploadKeyNotValid(true);

			methodResults.returnBadRequestStatusCode = true;

			//  EARLY RETURN
			return methodResults;
		}
		if ( fileImportTrackingDTO.getUserId() != webserviceMethod_Internal_Params.userId ) {
			
			//  Return Error
			String msg = "Upload Key User Id NOT match Signed In User Id: " + webserviceMethod_Internal_Params.uploadKey;
			log.warn( msg );
			webserviceResult.setStatusSuccess(false);
			webserviceResult.setUploadKeyNotValid(true);

			methodResults.returnBadRequestStatusCode = true;

			//  EARLY RETURN
			return methodResults;
		}


		File importer_Work_Directory = Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();

		//  Directory for This new Import

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

		String dirNameForImportTrackingId =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().getDirForImportTrackingId( webserviceMethod_Internal_Params.uploadKey );

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
		File uploadedFile_StoreOnDiskFileObject = 
				limelight_XML_Importer_Work_Directory_And_SubDirs_Web
				.getUploadFile( 
						webserviceMethod_Internal_Params.scanFileSuffix,
						webserviceRequestHeaderContents.getFileIndex(),
						webserviceMethod_Internal_Params.fileType,
						dirForImportTrackingId );
		
		String uploadedFile_StoreOnDiskFileObject_FilenameOnly = uploadedFile_StoreOnDiskFileObject.getName();

		FileImportTrackingSingleFileDTO fileImportTrackingSingleFileDTO = new FileImportTrackingSingleFileDTO();
		fileImportTrackingSingleFileDTO.setFileImportTrackingId(webserviceMethod_Internal_Params.uploadKey);
		fileImportTrackingSingleFileDTO.setFilenameInUpload( webserviceRequestHeaderContents.getFilename() );
		fileImportTrackingSingleFileDTO.setFileIndex( webserviceRequestHeaderContents.getFileIndex() );
		fileImportTrackingSingleFileDTO.setFileType( webserviceMethod_Internal_Params.fileType );
		fileImportTrackingSingleFileDTO.setFileSize( httpRequest_ContentLengthInHeader );
		fileImportTrackingSingleFileDTO.setCanonicalFilename_W_Path_OnSubmitMachine( webserviceRequestHeaderContents.getCanonicalFilename_W_Path_OnSubmitMachine() );
		fileImportTrackingSingleFileDTO.setAbsoluteFilename_W_Path_OnSubmitMachine( webserviceRequestHeaderContents.getAbsoluteFilename_W_Path_OnSubmitMachine() );
		
		fileImportTrackingSingleFileDTO.setFileLocation_Or_AWS_S3_Object_ProvidedFrom_ExternalSystem(false);
		fileImportTrackingSingleFileDTO.setFileLocation_Or_AWS_S3_Object_From_ExternalSystem_DeleteAfterImport(false);
		
		
		final String amazonS3_bucketName = configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_AWS_S3_BUCKET_KEY );

		if ( StringUtils.isNotEmpty( amazonS3_bucketName ) ) {
			
			fileImportTrackingSingleFileDTO.setAws_s3_bucket_name(amazonS3_bucketName);
			
			//  Copy InputStream containing POST body into S3 Object
			{
				S3Client amazonS3_Client = null;

				String s3_Object_Key = FileUploadCommonConstants.IMPORT_BASE_DIR + "/" + dirNameForImportTrackingId + "/" + uploadedFile_StoreOnDiskFileObject_FilenameOnly;
				
				fileImportTrackingSingleFileDTO.setAws_s3_object_key(s3_Object_Key);
				
				{  // Use Region from Config, otherwise SDK use from Environment Variable

					final String amazonS3_RegionName = configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_AWS_S3_REGION_KEY );

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

				//   2023 03 27
				//      "Upload an object in a single operation by using the AWS SDKs, REST API, or AWS CLI – With a single PUT operation, you can upload a single object up to 5 GB in size."
				//    https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html

				final long aws_S3_MaxPutSize_Minus_A_Value = 
						Limelight__AWS_S3_Constants.AWS_S3_MAXIMUM_PUT_OBJECT_OR_UPLOAD_PART_SIZE 
						- ( Limelight__AWS_S3_Constants.AWS_S3_MAXIMUM_PUT_OBJECT_OR_UPLOAD_PART_SIZE / 50 ); //  4.9GB  Just under S3 'put' limit of 5GB

				
				
				//   TODO FAKE VERY SMALL value - Min of 5MB (5 *1024 * 1024) per S3 doc -- TEST VALUE
//				final long aws_S3_MaxPutSize_Minus_A_Value = 
//						Limelight__AWS_S3_Constants.AWS_S3_MULTIPART_UPLOAD_UPLOAD_PART__MINIMUM_PUT_OBJECT_SIZE_EXCEPT_LAST_PUT; 

				
				
				
				if ( httpRequest_ContentLengthInHeader < aws_S3_MaxPutSize_Minus_A_Value ) {
				
					//  Uploaded File Size (ContentLength) is UNDER 5GB limit so can 'put' to S3 with single 'putObject' call, passing in the input stream from the HTTP Connection

					try ( InputStream inputStreamFromPOSTLocal = httpServletRequest.getInputStream() ) {

			            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
			                .bucket(amazonS3_bucketName)
			                .key(s3_Object_Key)
			                .contentLength( httpRequest_ContentLengthInHeader )
			                .build();
			            
			            RequestBody amazonS3_RequestBody = RequestBody.fromInputStream(inputStreamFromPOSTLocal, httpRequest_ContentLengthInHeader);

						amazonS3_Client.putObject(putObjectRequest, amazonS3_RequestBody );
					}

				} else {

					//  Uploaded File Size (ContentLength) is OVER 5GB limit so need to 'put' to S3 using Multipart

					String uploadId_S3Client_Client = null;

					try {
						try {
							// Step 1: Initialize.
							
							CreateMultipartUploadRequest createMultipartUploadRequest = CreateMultipartUploadRequest.builder()
					                .bucket(amazonS3_bucketName)
					                .key(s3_Object_Key)
					                .build();

					        CreateMultipartUploadResponse response = amazonS3_Client.createMultipartUpload(createMultipartUploadRequest);
					        uploadId_S3Client_Client = response.uploadId();

						} catch ( Exception e ) {
							String msg = "Failed to initialize upload of Data File to S3.  "
									+ "bucketName: " + amazonS3_bucketName
									+ ", s3_Object_Key: " + s3_Object_Key;
							log.error( msg, e );
							throw e;
						}

						// Create a list of UploadPartResponse objects. You get one of these
						// for each part upload.
						List<CompletedPart> completedPart_List = new ArrayList<>( 10001 ); // Init to max possible size

						try ( InputStream inputStreamFrom_HTTP_Request = httpServletRequest.getInputStream() ) {

							long inputStream_Byte_Start = 1;
							int partNumber_To_S3Client_Client = 0; // Pre-increment so first value is 1

							while ( inputStream_Byte_Start < httpRequest_ContentLengthInHeader ) {

								partNumber_To_S3Client_Client++;

								//   Loop until all of the input has been written to S3 Multipart

								long partEnd = inputStream_Byte_Start + aws_S3_MaxPutSize_Minus_A_Value - 1;
								if ( partEnd > httpRequest_ContentLengthInHeader) {
									partEnd = httpRequest_ContentLengthInHeader;
								}

								long partSize_To_S3Client_Client = partEnd - inputStream_Byte_Start + 1;
								
//								long inputStream_Byte_Start__BeforeIncrement = inputStream_Byte_Start;  //  For log message just below
								
								inputStream_Byte_Start += partSize_To_S3Client_Client;

								//  Seems to work fine without setting lastPart_To_S3Client_Client to true

//								boolean lastPart_To_S3Client_Client = false;
//								if ( inputStream_Byte_Start > httpRequest_ContentLengthInHeader) {
//									lastPart_To_S3Client_Client = true;
//								}
								
//								log.warn("Create object 'limelight_InputStream_ReadOnlyTo_MaxSize' with partSize_To_S3Client_Client of: " + partSize_To_S3Client_Client
//										+ ", inputStream_Byte_Start__BeforeIncrement (Before Increment. Value used to compute partEnd): " + inputStream_Byte_Start__BeforeIncrement
//										+ ", partEnd: " + partEnd
////										+ ", lastPart_To_S3Client_Client: " + lastPart_To_S3Client_Client
//										+ ", partNumber_To_S3Client_Client: " + partNumber_To_S3Client_Client
//										+ ", httpRequest_ContentLengthInHeader: " + httpRequest_ContentLengthInHeader
//										+ ", s3_Object_Key: " + s3_Object_Key );
								


								try ( InternalClass__Limelight_InputStream_ReadOnlyTo_MaxSize internalClass__Limelight_InputStream_ReadOnlyTo_MaxSize  =
										new InternalClass__Limelight_InputStream_ReadOnlyTo_MaxSize( inputStreamFrom_HTTP_Request, partSize_To_S3Client_Client) ) {
									
								     UploadPartRequest uploadPartRequest = UploadPartRequest.builder()
								                .bucket(amazonS3_bucketName)
								                .key(s3_Object_Key)
								                .uploadId(uploadId_S3Client_Client)
								                .partNumber( partNumber_To_S3Client_Client ).build();

							            RequestBody amazonS3_RequestBody = RequestBody.fromInputStream(internalClass__Limelight_InputStream_ReadOnlyTo_MaxSize, partSize_To_S3Client_Client);
								     
								        String etag = amazonS3_Client.uploadPart(uploadPartRequest, amazonS3_RequestBody ).eTag();

								        CompletedPart completedPart = 
								        		CompletedPart
								        		.builder()
								        		.partNumber( partNumber_To_S3Client_Client )
								        		.eTag(etag)
								        		.build();

								        completedPart_List.add( completedPart );
								}
							}

						}

						try {
							// Step 3: Complete.

						    // Finally call completeMultipartUpload operation to tell S3 to merge all uploaded
					        // parts and finish the multipart operation.
					        CompletedMultipartUpload completedMultipartUpload = CompletedMultipartUpload.builder()
					                .parts(completedPart_List)
					                .build();

					        CompleteMultipartUploadRequest completeMultipartUploadRequest =
					        		CompleteMultipartUploadRequest.builder()
					        		.bucket(amazonS3_bucketName)
					        		.key(s3_Object_Key)
					        		.uploadId(uploadId_S3Client_Client)
					        		.multipartUpload(completedMultipartUpload)
					        		.build();

					        amazonS3_Client.completeMultipartUpload(completeMultipartUploadRequest);

						} catch ( Exception e ) {
							String msg = "Failed to upload part of Data File to S3.  "
									+ "bucketName: " + amazonS3_bucketName
									+ ", s3_Object_Key: " + s3_Object_Key;
							log.error( msg, e );
							throw e;
						}
						
						
						////////////////////////////////////////////////////
						
						///   OLD Possible approach.  
						
						//     For In Memory when 5MB, better approach:

						//        create a 5MB byte array which is re-used.

						//        loop and read into it until it is full using the 'stream.read( byteArray, Start, End).
						
						//        Create byte array input stream
						
						//		  Call S3 Put with that byte array input stream
						
						
						
						//      Uses OLD S3 V1 SDK.
						
						//   If follow this approach, probably for > 5MB ( 5 * 1024 * 1024 ) directly transfer input stream to the S3 upload call like do above
						

//
//						//  Compute EachPart Size.  allowed 10000 parts
//						
//						final double s3_PutPartCount_Max = 10000;
//						
////						final int BUFFER_SIZE = 5 * 1000 * 1000;
//
//						final int BUFFER_SIZE = 5 * 1000;  //  TODO  FAKE small buffer
//						
//						long eachPart_Size_Long = (long) Math.ceil( ( httpRequest_ContentLengthInHeader / ( (double) s3_PutPartCount_Max ) ) );
						

						//  The smallest Multipart upload part is 5MB ( 5 * 1024 * 1024 )
						
						
//						if ( eachPart_Size_Long > BUFFER_SIZE ) {
//							
//							//  Write each part first to a file since > 5MB
//							
//							throw new RuntimeException( "FORCE:  NOT HANDLE ( eachPart_Size_Long > BUFFER_SIZE )");
//							
//						} else {
//
//							//  Hold each part in memory since < 5MB
//
//							try ( InputStream inputStreamFromPOSTLocal = httpServletRequest.getInputStream() ) {
//				
//								try ( FileOutputStream fos = new FileOutputStream( uploadedFileOnDisk )) {
//									
//									byte[] buffer = new byte[ BUFFER_SIZE ];
//									int byteCountRead;
//									int buffer_ReadInto_Offset = 0;
//									int buffer_ReadInto_Length = BUFFER_SIZE;
//									
//									while ((byteCountRead = inputStreamFromPOSTLocal.read(buffer, buffer_ReadInto_Offset, buffer_ReadInto_Length)) >= 0){
//										if ( byteCountRead > 0 ) {
//											buffer_ReadInto_Offset += byteCountRead;
//											buffer_ReadInto_Length -= byteCountRead;
//											
//											if ( buffer_ReadInto_Offset == BUFFER_SIZE ) {
//												
//												//  Buffer is full so send to S3 Part
//
//						        				ByteArrayInputStream scanFilePartIS = new ByteArrayInputStream( buffer, 0 /* offset */, bytesRead /* length */ );
//						        			
//												UploadPartRequest uploadRequest = 
//						        						new UploadPartRequest()
//						        						.wi
//						        						.withUploadId( uploadId )
//						        						.withBucketName( bucketName )
//						        						.withKey( objectKey )
//						        						.wi
//						        						.withInputStream( scanFilePartIS )
//						        						.withPartNumber( partNumber )
//						        						.withPartSize( bytesRead )
//						        						.withLastPart( lastPart );
//												
//												String bufferAsString = new String(buffer);
//												
//												log.warn( "Buffer is full so sending to S3 Part. bufferAsString: " + bufferAsString );
//												
//												// Reset Buffer
//
//												buffer_ReadInto_Offset = 0;
//												buffer_ReadInto_Length = BUFFER_SIZE;
//											}
//										}
//									}
//									
//									//  Output last buffer
//
//									String bufferAsString = new String(buffer, 0, buffer_ReadInto_Offset);
//									
//									log.warn( "Buffer is LAST BUFFER so sending to S3 Part. bufferAsString: " + bufferAsString );
//								}
//
//							}
//						}
						
					} catch ( Throwable t) {

						log.error( "Error while performing S3 MultipartUpload.  Will Now abort the multiplart upload by call amazonS3_Client.abortMultipartUpload(...)", t );

						try {
							AbortMultipartUploadRequest abortMultipartUploadRequest = 
									AbortMultipartUploadRequest
									.builder()
									.bucket(amazonS3_bucketName)
					        		.key(s3_Object_Key)
					        		.uploadId(uploadId_S3Client_Client)
									.build();
							
							
							amazonS3_Client.abortMultipartUpload( abortMultipartUploadRequest );
							
						} catch ( Throwable t2_Abort) {
							// Eat Exception
							log.error( "Error while performing S3 MultipartUpload.  Now Exception from abort the multiplart upload by call amazonS3_Client.abortMultipartUpload(...)", t2_Abort );
						}
			        	throw t;
						
					} finally {
						
					}
					  
				}
				
//				if ( totalBytesCopied != httpRequest_ContentLengthInHeader ) {
//					
//					log.warn( "Submit Import: File Uploaded: At end of receive sent bytes.  Bytes sent count is not same as content length in HTTP Header. "
//							+ " Remote filename of file being submitted: "
//							+ webserviceRequestHeaderContents.getFilename() 
//							);
//					
//					if ( ! uploadedFileOnDisk.delete() ) {
//						log.warn("Failed to delete Submit Import: File Uploaded: At end of receive sent bytes.  Bytes sent count is not same as content length in HTTP Header.  file: " + uploadedFileOnDisk.getAbsolutePath() );
//					}
//					//  Return Error -  Status Code 400
//					webserviceResult.setStatusSuccess(false);
//	
//					methodResults.returnBadRequestStatusCode = true;
//	
//					//  EARLY RETURN
//					return methodResults;
//				}
			}
			
		} else {
			fileImportTrackingSingleFileDTO.setFilenameOnDisk(uploadedFile_StoreOnDiskFileObject_FilenameOnly);
			
			//  Copy InputStream containing POST body into file on disk
			{
				long totalBytesCopied = 0;
	
				try ( InputStream inputStreamFromPOSTLocal = httpServletRequest.getInputStream() ) {
	
					try ( FileOutputStream fos = new FileOutputStream( uploadedFile_StoreOnDiskFileObject )) {
						byte[] buf = new byte[ COPY_FILE_ARRAY_SIZE ];
						int len;
						while ((len = inputStreamFromPOSTLocal.read(buf)) > 0){
							fos.write(buf, 0, len);
							
							if ( totalBytesCopied == 0 ) {
								//  First block of bytes read.  Validate the FASTA start of file
								
								if ( webserviceMethod_Internal_Params.fileType == FileImportFileType.FASTA_FILE ) {
	
									byte[] firstByteRead_Array = new byte[1];
									firstByteRead_Array[0] = buf[0];
									
									try {
									
										String firstCharacter = new String( firstByteRead_Array, StandardCharsets.US_ASCII );
										
										if ( ! ">".equals( firstCharacter ) ) {
	
											//  Return Error -  Status Code 400
											webserviceResult.setStatusSuccess(false);
											webserviceResult.setFastaFile_InvalidContents( true );
	
											methodResults.returnBadRequestStatusCode = true;
	
											//  EARLY RETURN
											return methodResults;
										}
									
									} catch ( Exception e ) {
										
										log.warn( "Failed to create String object from first character in FASTA file." );
	
										//  Return Error -  Status Code 400
										webserviceResult.setStatusSuccess(false);
										webserviceResult.setFastaFile_InvalidContents( true );
	
										methodResults.returnBadRequestStatusCode = true;
	
										//  EARLY RETURN
										return methodResults;
									}
									
								}
							}
							
							totalBytesCopied += len;
							
							if ( totalBytesCopied > httpRequest_ContentLengthInHeader ) {
	
								log.warn( "Submit Import: File Uploaded bytes sent is larger than content length in HTTP Header. "
										+ " Remote filename of file being submitted: "
										+ webserviceRequestHeaderContents.getFilename() 
										);
								
								if ( ! uploadedFile_StoreOnDiskFileObject.delete() ) {
									log.warn("Failed to delete upload file Where File Uploaded bytes sent is larger than content length in HTTP Header.  file: " + uploadedFile_StoreOnDiskFileObject.getAbsolutePath() );
								}
								//  Return Error -  Status Code 400
								webserviceResult.setStatusSuccess(false);
	
								methodResults.returnBadRequestStatusCode = true;
	
								//  EARLY RETURN
								return methodResults;
							}
						}
					}
				}
				if ( totalBytesCopied != httpRequest_ContentLengthInHeader ) {
					
					log.warn( "Submit Import: File Uploaded: At end of receive sent bytes.  Bytes sent count is not same as content length in HTTP Header. "
							+ " Remote filename of file being submitted: "
							+ webserviceRequestHeaderContents.getFilename() 
							);
					
					if ( ! uploadedFile_StoreOnDiskFileObject.delete() ) {
						log.warn("Failed to delete Submit Import: File Uploaded: At end of receive sent bytes.  Bytes sent count is not same as content length in HTTP Header.  file: " + uploadedFile_StoreOnDiskFileObject.getAbsolutePath() );
					}
					//  Return Error -  Status Code 400
					webserviceResult.setStatusSuccess(false);
	
					methodResults.returnBadRequestStatusCode = true;
	
					//  EARLY RETURN
					return methodResults;
				}
			}
		}
		
		fileImportTrackingSingleFileDTO.setFileUploadStatus( ImportSingleFileUploadStatus.FILE_UPLOAD_COMPLETE );
		
		fileImportTrackingSingleFileDAO.save(fileImportTrackingSingleFileDTO);
		
		
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
		int uploadKey = -1;
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
	
	/**
	 * Limit bytes read to specified maxSize
	 * 
	 * close() call does NOT close stream
	 *
	 */
	private static class InternalClass__Limelight_InputStream_ReadOnlyTo_MaxSize extends InputStream {

	    private final InputStream originalStream;
	    private final long maxSize;
//	    private long totalBytesReadSoFar = 0;
	    private long totalBytesLeftToRead;

	    public InternalClass__Limelight_InputStream_ReadOnlyTo_MaxSize(InputStream original, long maxSize) {
	        this.originalStream = original;
	        this.maxSize = maxSize;
	        this.totalBytesLeftToRead = maxSize;
	    }
	    
	    
	    
	    @Override
	    public void close() throws IOException {
			// NO OP - NOT CLOSE

	    	if ( totalBytesLeftToRead != 0 ) {
	    		String msg = "close() called but still have bytes to read. totalBytesLeftToRead: " + totalBytesLeftToRead
	    				+ ", maxSize: " + maxSize;
	    		log.error(msg);
	    		throw new IOException(msg);
	    	}
		}
	    
	    @Override
	    public boolean markSupported() {
	    	return false;
	    }
	    
	    @Override
	    public void mark(int readlimit) {
	    	throw new UnsupportedOperationException();
	    }

	    @Override
	    public long skip(long n) {
	    	throw new UnsupportedOperationException();
	    }

	    @Override
	    public int read() throws IOException {
	    	if ( totalBytesLeftToRead <= 0 ) {
	    		return -1;
	    	}
	        int i = originalStream.read();
	        if (i>=0) {
	        	totalBytesLeftToRead--;
	        };
	        return i;
	    }

	    @Override
	    public int read(byte b[]) throws IOException {
	    	if ( totalBytesLeftToRead <= 0 ) {
	    		return -1;
	    	}
	    	int len = b.length;
	    	if ( len > totalBytesLeftToRead ) {
	    		len = (int)totalBytesLeftToRead;
	    	}
	        int bytesRead = read(b, 0, len);
	        totalBytesLeftToRead -= bytesRead;
	        
	        return bytesRead;
	    }

	    @Override
	    public int read(byte b[], int off, int len) throws IOException {
	    	if ( totalBytesLeftToRead <= 0 ) {
	    		return -1;
	    	}
	    	if ( len > totalBytesLeftToRead ) {
	    		len = (int)totalBytesLeftToRead;
	    	}
	    	
	        int i = originalStream.read(b, off, len);
	        if (i >= 0) {
	        	totalBytesLeftToRead -= i;
	        };
	        return i;
	    }

	}

}
