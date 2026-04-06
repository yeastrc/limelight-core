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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.structure_file_data__tied_to_project_id;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
import org.yeastrc.file_object_storage.accept_import_web_app.webservice_connect.main.CallYRCFileObjectStoreWebservice;
import org.yeastrc.file_object_storage.accept_import_web_app.webservice_connect.main.CallYRCFileObjectStoreWebserviceInitParameters;
import org.yeastrc.file_object_storage.web_app.shared_server_client.webservice_request_response.main.UploadFile_UploadFile_Pass_Filename_InputStream_Size_Request;
import org.yeastrc.file_object_storage.web_app.shared_server_client.webservice_request_response.main.UploadFile_UploadFile_Response;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.dto.FileObjectStorage_MainEntry_DTO;
import org.yeastrc.limelight.limelight_shared.dto.StructureFile_Like_PDB_File_DTO;
import org.yeastrc.limelight.limelight_shared.dto_json_blobs_in_db.StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT;
import org.yeastrc.limelight.limelight_shared.dto_json_blobs_in_db.StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT.StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_Entry;
import org.yeastrc.limelight.limelight_shared.enum_classes.FileObjectStore_FileType_Enum;
import org.yeastrc.limelight.limelight_shared.enum_classes.StructureFile_Like_PDB_File_FileType_Enum;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.constants.StructureFile_Like_PDB_Constants;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.FileObjectStorage_MainEntry_DAO_Webapp_IF;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.StructureFile_Like_PDB_File_DTO_AndChildren_Insert_UsingDBTransactionService_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsFileObjectStorageFileImportAllowedViaWebSubmit_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Structure File Like PDB file: Upload Data
 * 
 */
@RestController
public class StructureFile_Contents_UploadData_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( StructureFile_Contents_UploadData_RestWebserviceController.class );

	private static final int COPY_FILE_ARRAY_SIZE = 32 * 1024;
	
	//  Keep all these Strings in sync with the Javascript AJAX Send:

	private static final String UPLOAD_FILE_HEADER_PARAMETER_PARAMS_WEB_JSON = "limelight_upload_file_params_json";
	
	private static final String STRUCTURE_FILE_CHAINS_ID_LABEL_AUTH_JSON = "limelight_upload_structure_file_chains_id_label_auth_json";

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;

	@Autowired
	private IsFileObjectStorageFileImportAllowedViaWebSubmit_IF isFileObjectStorageFileImportAllowedViaWebSubmit;
	
	@Autowired
	private FileObjectStorage_MainEntry_DAO_Webapp_IF fileObjectStorage_MainEntry_DAO_Webapp;
	
	@Autowired
	private StructureFile_Like_PDB_File_DTO_AndChildren_Insert_UsingDBTransactionService_IF structureFile_Like_PDB_File_DTO_AndChildren_Insert_UsingDBTransactionService;
	
	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	/////////////////////////////////////////////////////

	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.

	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.STRUCTURE_FILE_CONTENTS_UPLOAD_DATA_REST_WEBSERVICE_CONTROLLER
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

			WebserviceRequest_HeaderContents webserviceRequestHeaderContents = 
					unmarshalJSON_ToObject.getObjectFromJSONString( uploadFileParamsJSON, WebserviceRequest_HeaderContents.class );
			
			
			
			String structureFile_Chains_Id_Label_Auth_JSON = httpServletRequest.getHeader( STRUCTURE_FILE_CHAINS_ID_LABEL_AUTH_JSON );

			if ( StringUtils.isEmpty( structureFile_Chains_Id_Label_Auth_JSON ) ) {
				log.warn( "'" + STRUCTURE_FILE_CHAINS_ID_LABEL_AUTH_JSON + "' header parameter is not sent or is empty" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT structureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT = 
					unmarshalJSON_ToObject.getObjectFromJSONString( structureFile_Chains_Id_Label_Auth_JSON, StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT.class );
			
			{  // Validate structureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT
				
				// Test for duplicate values of 'lid' or 'lbl'
				
				int entriesSize = structureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT.getEntries().size();
				
				Set<Integer> lidEntries = new HashSet<>( entriesSize );
				Set<String> lblEntries = new HashSet<>( entriesSize );
				
				for ( StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_Entry entry : structureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT.getEntries() ) {
					
					if ( ! lidEntries.add( entry.getLid() ) ) {
						log.warn( "Duplicate value for 'lid': " + entry.getLid() );
						throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
					}

					if ( ! lblEntries.add( entry.getLbl() ) ) {
						log.warn( "Duplicate value for 'lbl': " + entry.getLbl() );
						throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
					}
				}
				
			}
			
			///////////

			String projectIdentifier = webserviceRequestHeaderContents.projectIdentifier;

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
			
			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );

			//  Restrict access to Researcher (Assistant Project owner)  or above (admin), if project was not locked
			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
					validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
					.validateAssistantProjectOwnerAllowed( projectIds, httpServletRequest );

			//  If NOT File Object Storage is Fully Configured, 
			if ( ! isFileObjectStorageFileImportAllowedViaWebSubmit.isFileObjectStorageFileImportAllowedViaWebSubmit() ) {
				String msg = "File Object Storage is NOT Fully Configured ";
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
			
			WebserviceResponse webserviceResult = new WebserviceResponse();

			_processRequest( 
					webserviceRequestHeaderContents, webserviceResult, httpServletRequest, 
					projectId, userId, structureFile_Chains_Id_Label_Auth_JSON, structureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT );

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
	
	//////////////////

	/**
	 * 
	 * @param webserviceRequestHeaderContents
	 * @param webserviceResult
	 * @param httpServletRequest
	 */
	private void _processRequest( 
			
			WebserviceRequest_HeaderContents webserviceRequestHeaderContents,
			WebserviceResponse webserviceResult ,
			HttpServletRequest httpServletRequest,
			
			int projectId,
			Integer userId,
			String structureFile_Chains_Id_Label_Auth_JSON,
			StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT structureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT
			) {

		try {
			int contentLength = 0;
			
			{
				long contentLength_Long = httpServletRequest.getContentLengthLong();

				///  Check File size not exceed max file size

				if ( contentLength_Long > StructureFile_Like_PDB_Constants.MAX_FILE_SIZE_IN_BYTES ) {

					log.warn( "Structure File is too large.  Size: " + contentLength );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}

				if ( contentLength_Long > Integer.MAX_VALUE ) {

					String msg = "contentLength_Long > Integer.MAX_VALUE.  MUST recode some using of MAX_FILE_SIZE_IN_BYTES.";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
				
				//  Cast to int
				
				contentLength = (int) contentLength_Long;
			}

			String uploadedName = webserviceRequestHeaderContents.name;

			//  uploadFileSize is currently incorrect.  is being passed length of string
//			Long uploadFileSize = webserviceRequestHeaderContents.uploadFileSize;


			if ( StringUtils.isEmpty( uploadedName ) ) {
				log.warn( "'name' header JSON parameter is not sent or is empty. projectId: " + projectId 
						+ ", userId: " + userId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
//			if ( uploadFileSize == null ) {
//				log.warn( "'uploadFileSize' header JSON parameter is null. uploadedFilename: " + uploadedFilename
//						+ ", projectId: " + projectId 
//						+ ", userId: " + userId );
//				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//			}
			
			if ( webserviceRequestHeaderContents.fileType_String == null ) {
				log.warn( "'fileType_String' header JSON parameter is not sent or is null .  uploadedFilename: " + uploadedName
						+ ", projectId: " + projectId 
						+ ", userId: " + userId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			StructureFile_Like_PDB_File_FileType_Enum fileType_Enum = null;
			
			try {
				fileType_Enum = StructureFile_Like_PDB_File_FileType_Enum.from_ShortName( webserviceRequestHeaderContents.fileType_String );
			} catch (Exception e ) {
				log.warn( "'fileType_String' header JSON is not a valid value: " + webserviceRequestHeaderContents.fileType_String );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			//////////////////////////////
			
			////  Actually upload the file

			long fileTotalSize = 0;
						
			//  Copy InputStream containing POST body into memory buffer and then into file on disk
			{
				//  Copy to in memory buffer first to ensure get full chunk before append to file
				
				byte[] bytes_Full_FileContents = new byte[ contentLength + COPY_FILE_ARRAY_SIZE + 100 ];
				int bytes_Full_FileContents__StartIndex = 0;
				int bytes_Full_FileContents__BytesPopulatedCount = 0;
	
				boolean fileTooLarge = false;
				
				try ( InputStream inputStreamFromPOSTLocal = httpServletRequest.getInputStream() ) {
	
					byte[] buf = new byte[ COPY_FILE_ARRAY_SIZE ];
					int len;
					while ((len = inputStreamFromPOSTLocal.read(buf)) > 0){
	
						for ( int index = 0; index < len; index++ ) {
							bytes_Full_FileContents[ bytes_Full_FileContents__StartIndex + index ] = buf[ index ];
						}
						bytes_Full_FileContents__StartIndex += len;
						bytes_Full_FileContents__BytesPopulatedCount += len;
	
						fileTotalSize += len;
						if ( fileTotalSize > StructureFile_Like_PDB_Constants.MAX_FILE_SIZE_IN_BYTES ) {
	
							fileTooLarge = true;
							break;
						}
					}
				}
				
				if ( fileTooLarge ) {
					log.warn( "File is too large.  Contents is larger than contentLength: name/filename: " + webserviceRequestHeaderContents.name );

					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
	
				if ( bytes_Full_FileContents__BytesPopulatedCount != contentLength ) {
					
					log.warn( "bytes read is not same as contentLength: name/filename: " + webserviceRequestHeaderContents.name );

					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				
				if ( webserviceRequestHeaderContents.sha256_Value_For_FileContents != null ) {
					
					//  Have  SHA-256 value computed in the browser

					//  Compute SHA-256 and validate that to the passed in value computed in the browser
					
					final String SHA_256_ALGORITHM = "SHA-256";
					
					MessageDigest messageDigest_SHA_256 = MessageDigest.getInstance( SHA_256_ALGORITHM );
					
					messageDigest_SHA_256.update( bytes_Full_FileContents, 0, bytes_Full_FileContents__BytesPopulatedCount );
		
					byte[] sha_256_Digest = messageDigest_SHA_256.digest();
					
					StringBuilder sha_256_Digest_HexString_SB = new StringBuilder( sha_256_Digest.length * 3 );
					
					for ( byte sha_256_Digest_Byte : sha_256_Digest ) {
					    
						String hexChars = String.format( "%02x", sha_256_Digest_Byte ); // %02x formats byte as two uppercase hex characters
						sha_256_Digest_HexString_SB.append( hexChars );
					}
					
					String sha_256_Digest_HexString = sha_256_Digest_HexString_SB.toString();
					
					if ( ! webserviceRequestHeaderContents.sha256_Value_For_FileContents.equals( sha_256_Digest_HexString ) ) {
						
						String msg = "SHA-256 string computed on Client NOT the same as computed on server.  Client: " 
								+ webserviceRequestHeaderContents.sha256_Value_For_FileContents
								+ ", Server: " + sha_256_Digest_HexString;
						
						log.warn(msg);

						throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
					}
				}
				
				//  Send contents to File Object Storage
				
				if ( bytes_Full_FileContents.length < bytes_Full_FileContents__BytesPopulatedCount ) {
					
					throw new LimelightInternalErrorException( "( bytes_Full_FileContents.length < bytes_Full_FileContents__BytesPopulatedCount )" );
				}
				
				ByteArrayInputStream byteArrayInputStream_Full_FileContents = new ByteArrayInputStream(bytes_Full_FileContents, 0, bytes_Full_FileContents__BytesPopulatedCount);
				

				{
					String resultString = new String( bytes_Full_FileContents, 0, bytes_Full_FileContents__BytesPopulatedCount );
					
					int z = 0;
				}
				
				
				String yrc_FileObjectStorageServiceBaseURL = configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL );

				CallYRCFileObjectStoreWebserviceInitParameters initParameters = new CallYRCFileObjectStoreWebserviceInitParameters();
				
				initParameters.setFileObjectStorageServerBaseURL( yrc_FileObjectStorageServiceBaseURL );

				CallYRCFileObjectStoreWebservice callYRCFileObjectStoreWebservice = CallYRCFileObjectStoreWebservice.getInstance();
				
				callYRCFileObjectStoreWebservice.init(initParameters);
								
				UploadFile_UploadFile_Pass_Filename_InputStream_Size_Request fileObjectStorage_UploadFile_UploadFile_Pass_Filename_InputStream_Size_Request = new UploadFile_UploadFile_Pass_Filename_InputStream_Size_Request();
						
				fileObjectStorage_UploadFile_UploadFile_Pass_Filename_InputStream_Size_Request.setFilename(uploadedName);
				fileObjectStorage_UploadFile_UploadFile_Pass_Filename_InputStream_Size_Request.setFile_Size( (long)bytes_Full_FileContents__BytesPopulatedCount);
				fileObjectStorage_UploadFile_UploadFile_Pass_Filename_InputStream_Size_Request.setFile_InputStream( byteArrayInputStream_Full_FileContents );
				fileObjectStorage_UploadFile_UploadFile_Pass_Filename_InputStream_Size_Request.setGzipCompressContents(true);
				
				UploadFile_UploadFile_Response uploadFile_UploadFile_Response =
						callYRCFileObjectStoreWebservice
						.call_UploadFile_UploadFile_Pass_Filename_InputStream_Size_Service( fileObjectStorage_UploadFile_UploadFile_Pass_Filename_InputStream_Size_Request );
				

//				uploadFile_UploadFile_Response.getApiKey_Assigned();
//				uploadFile_UploadFile_Response.getFileSizeLimitExceeded();
//				uploadFile_UploadFile_Response.getMaxSize();
//				uploadFile_UploadFile_Response.getMaxSizeFormatted();
				
				if ( ! uploadFile_UploadFile_Response.isStatusSuccess() ) {
					
					log.warn( "( ! uploadFile_UploadFile_Response.isStatusSuccess() )" );
				
					
					throw new LimelightInternalErrorException( "( ! uploadFile_UploadFile_Response.isStatusSuccess() )" );
				}
				
				FileObjectStorage_MainEntry_DTO fileObjectStorage_MainEntry_DTO = new FileObjectStorage_MainEntry_DTO();
				
				fileObjectStorage_MainEntry_DTO.setFileObjectStorageStorageAPIKey( uploadFile_UploadFile_Response.getApiKey_Assigned() );
				fileObjectStorage_MainEntry_DTO.setFileTypeId( FileObjectStore_FileType_Enum.STRUCTURE_FILE_LIKE_PDB_TYPE.value() );
				
				{
					Integer fileObjectStorage_MainEntry_DTO__ID = 
							fileObjectStorage_MainEntry_DAO_Webapp
							.get_Id_For_FileTypeId_AND_FileObjectStorageStorageAPIKey( 
									FileObjectStore_FileType_Enum.STRUCTURE_FILE_LIKE_PDB_TYPE.value(), 
									uploadFile_UploadFile_Response.getApiKey_Assigned()  );

					if ( fileObjectStorage_MainEntry_DTO__ID == null ) {

						try {
							fileObjectStorage_MainEntry_DAO_Webapp.saveToDatabase(fileObjectStorage_MainEntry_DTO, null);

						} catch ( Exception e ) {

							//  try again to get the id
							fileObjectStorage_MainEntry_DTO__ID = 
									fileObjectStorage_MainEntry_DAO_Webapp
									.get_Id_For_FileTypeId_AND_FileObjectStorageStorageAPIKey( 
											FileObjectStore_FileType_Enum.STRUCTURE_FILE_LIKE_PDB_TYPE.value(), 
											uploadFile_UploadFile_Response.getApiKey_Assigned()  );

							if ( fileObjectStorage_MainEntry_DTO__ID != null ) {

								fileObjectStorage_MainEntry_DTO.setId( fileObjectStorage_MainEntry_DTO__ID.intValue() );
							} else {
								throw e;
							}
						}

					} else {

						fileObjectStorage_MainEntry_DTO.setId( fileObjectStorage_MainEntry_DTO__ID.intValue() );
					}
				}

				StructureFile_Like_PDB_File_DTO structureFile_Like_PDB_File_DTO = new StructureFile_Like_PDB_File_DTO();

				structureFile_Like_PDB_File_DTO.setProjectId(projectId);
				structureFile_Like_PDB_File_DTO.setFileObjectStorage_MainEntryId( fileObjectStorage_MainEntry_DTO.getId() );
				structureFile_Like_PDB_File_DTO.setFileType_Enum( fileType_Enum );
				
				structureFile_Like_PDB_File_DTO.setName(uploadedName);
				structureFile_Like_PDB_File_DTO.setDescription( webserviceRequestHeaderContents.description );
				
				structureFile_Like_PDB_File_DTO.setStructureFile_Chains_Id_Label_Auth_Json_Blob( structureFile_Chains_Id_Label_Auth_JSON );
				
				structureFile_Like_PDB_File_DTO.setFileSize(bytes_Full_FileContents__BytesPopulatedCount);
				structureFile_Like_PDB_File_DTO.setUserId_Created(userId);
				
				
				structureFile_Like_PDB_File_DTO_AndChildren_Insert_UsingDBTransactionService.structureFile_Like_PDB_File_DTO_AndChildren_Insert(
						structureFile_Like_PDB_File_DTO, structureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT );
				
				webserviceResult.statusSuccess = true;
						
				webserviceResult.structureFileId = structureFile_Like_PDB_File_DTO.getId();
			}
	

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
	 * 
	 * 
	 *
	 */
	private static class WebserviceRequest_HeaderContents {

		
		private String projectIdentifier;
				
		private String name;

		private String description;
		
		private String fileType_String;
		
		/**
		 * May NOT be set if front end only has character count and not byte count.  Not currently used.
		 */
		private Long upload_Content_Size_InBytes;
		
		private String sha256_Value_For_FileContents;

		@SuppressWarnings("unused")
		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}

		@SuppressWarnings("unused")
		public void setFileType_String(String fileType_String) {
			this.fileType_String = fileType_String;
		}

		@SuppressWarnings("unused")
		public void setSha256_Value_For_FileContents(String sha256_Value_For_FileContents) {
			this.sha256_Value_For_FileContents = sha256_Value_For_FileContents;
		}
		@SuppressWarnings("unused")
		public void setName(String name) {
			this.name = name;
		}
		@SuppressWarnings("unused")
		public void setDescription(String description) {
			this.description = description;
		}
		@SuppressWarnings("unused")
		public void setUpload_Content_Size_InBytes(Long upload_Content_Size_InBytes) {
			this.upload_Content_Size_InBytes = upload_Content_Size_InBytes;
		}

		
	}
	

	/**
	 * 
	 * 
	 *
	 */
	private static class WebserviceResponse {

		private boolean statusSuccess;
		
		private int structureFileId;

		@SuppressWarnings("unused")
		public boolean isStatusSuccess() {
			return statusSuccess;
		}

		@SuppressWarnings("unused")
		public int getStructureFileId() {
			return structureFileId;
		}
		
	}
}
