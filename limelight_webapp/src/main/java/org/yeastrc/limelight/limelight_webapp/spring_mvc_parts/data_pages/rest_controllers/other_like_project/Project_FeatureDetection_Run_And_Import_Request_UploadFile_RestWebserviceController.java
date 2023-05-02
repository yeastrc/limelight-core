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
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.constants.Limelight__AWS_S3_Constants;
import org.yeastrc.limelight.limelight_shared.feature_detection_run_import_hardklor_bullseye.constants.FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants;
import org.yeastrc.limelight.limelight_shared.file_import_common.Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.ImportSingleFileUploadStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.constants.FileImportPipelineRunCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingSingleFileDTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappFileUploadFileSystemException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsLimelightXMLFileImportFullyConfiguredIF;
import org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.dao.FileImportAndPipelineRunTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.dao.FileImportAndPipelineRunTrackingSingleFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

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
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.UploadPartRequest;

/**
 * Feature Detection Run -  Run Feature Detection (Hardklor and Bullseye) on the selected scan file given the uploaded Hardklor.conf and Bullseye.conf files.
 * 
 * Webservices called:
 * 
 * Initialize:  
 * Upload file:    this webservice
 *    Hardklor Conf file
 *    Bullseye Conf file
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
public class Project_FeatureDetection_Run_And_Import_Request_UploadFile_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_FeatureDetection_Run_And_Import_Request_UploadFile_RestWebserviceController.class );

	private static final int COPY_FILE_ARRAY_SIZE = 32 * 1024;
	
	//  Keep all these Strings in sync with the Javascript AJAX Send:

	private static final String UPLOAD_FILE_HEADER_PARAMETER_PARAMS_WEB_JSON = "limelight_upload_file_params_json";

	//  Keep all these Strings in sync with the Submit Program Send:
	
//	private static final String UPLOAD_FILE_HEADER_PARAMETER_PARAMS_PGM_XML = "limelight_upload_file_params_xml";

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private IsLimelightXMLFileImportFullyConfiguredIF isLimelightXMLFileImportFullyConfigured;

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;

	@Autowired
	private FileImportAndPipelineRunTrackingDAO_IF fileImportAndPipelineRunTrackingDAO;

	@Autowired
	private FileImportAndPipelineRunTrackingSingleFileDAO_IF fileImportAndPipelineRunTrackingSingleFileDAO;
	
	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;

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
					+ AA_RestWSControllerPaths_Constants.PROJECT__FEATURE_DETECTION_RUN_AND_IMPORT_UPLOAD_FILE_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_OCTET_STREAM_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_JSON(

//			//  No @RequestBody since the POST body will be read in this method and copied to a local file
//			//  @RequestBody byte[] postBody,
//
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    
		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs


		//    			String requestURL = httpServletRequest.getRequestURL().toString();

		String uploadFileParamsJSON = httpServletRequest.getHeader( UPLOAD_FILE_HEADER_PARAMETER_PARAMS_WEB_JSON );

		if ( StringUtils.isEmpty( uploadFileParamsJSON ) ) {
			log.warn( "'" + UPLOAD_FILE_HEADER_PARAMETER_PARAMS_WEB_JSON + "' header parameter is not sent or is empty" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		WebserviceRequestDataInHeader webserviceRequestHeaderContents = 
				unmarshalJSON_ToObject.getObjectFromJSONString( uploadFileParamsJSON, WebserviceRequestDataInHeader.class );
		
		
		FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO = get_FileImportAndPipelineRunTrackingDTO_for_UploadKey(webserviceRequestHeaderContents);

		if ( fileImportAndPipelineRunTrackingDTO == null ) {
			log.warn( "webserviceRequestHeaderContents.uploadKey is Not found in DB.  value: " + webserviceRequestHeaderContents.uploadKey );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		int projectId = fileImportAndPipelineRunTrackingDTO.getProjectId();

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

		//  Validate same user
		
		if ( fileImportAndPipelineRunTrackingDTO.getUserId() != userId ) {
			log.warn( "User id for record in uploadKey is Not same as User id in session.  webserviceRequestHeaderContents.uploadKey: " + webserviceRequestHeaderContents.uploadKey );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
	
		
		WebserviceResponse webserviceResponse = 
				webserviceMethod_Internal( webserviceRequestHeaderContents, fileImportAndPipelineRunTrackingDTO, httpServletRequest );
    	
		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResponse );

		return ResponseEntity.ok().contentType( MediaType.APPLICATION_JSON ).body( responseAsJSON );
    }
    
    /**
     * @param webserviceRequestHeaderContents
     * @return null if not found
     * @throws Exception 
     */
    private FileImportAndPipelineRunTrackingDTO get_FileImportAndPipelineRunTrackingDTO_for_UploadKey(WebserviceRequestDataInHeader webserviceRequestHeaderContents) throws Exception {
	
		//  Get record for uploadKey
		
		if ( StringUtils.isEmpty( webserviceRequestHeaderContents.uploadKey ) ) {
			log.warn( "webserviceRequestHeaderContents.uploadKey is empty or null" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		int importAndPipelineRunTracking_ID = 0;
		
		try {
			importAndPipelineRunTracking_ID = Integer.parseInt(webserviceRequestHeaderContents.uploadKey);
		} catch (Exception e) {
			log.warn( "webserviceRequestHeaderContents.uploadKey is Not parsible as Integer.  value: " + webserviceRequestHeaderContents.uploadKey );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO =
				fileImportAndPipelineRunTrackingDAO.getForId(importAndPipelineRunTracking_ID);
		
		return fileImportAndPipelineRunTrackingDTO;
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
			
			WebserviceRequestDataInHeader webserviceRequestHeaderContents, 
			FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO,
			HttpServletRequest httpServletRequest ) throws Exception {
		
		WebserviceResponse webserviceResponse = new WebserviceResponse();


		long httpRequest_ContentLengthInHeader = httpServletRequest.getContentLengthLong();


		if ( ! webserviceRequestHeaderContents.hardklorConfFile && ! webserviceRequestHeaderContents.bullseyeConfFile ) {
			log.warn( "Invalid Input: Both webserviceRequestHeaderContents.hardklorConfFile AND webserviceRequestHeaderContents.bullseyeConfFile are false or not set" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		if ( webserviceRequestHeaderContents.hardklorConfFile && webserviceRequestHeaderContents.bullseyeConfFile ) {
			log.warn( "Invalid Input: Both webserviceRequestHeaderContents.hardklorConfFile AND webserviceRequestHeaderContents.bullseyeConfFile are true" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		//  Upload Directory for files
		
		File importer_Work_Directory = Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		
		//  Get the File object for the Base Subdir used to first store the files in this request 
		String uploadFileDirString = FileImportPipelineRunCommonConstants.IMPORT_AND_PIPELINE_RUN__BASE_DIR;
		
		File uploadFileDir = new File( importer_Work_Directory, uploadFileDirString );
		
		if ( ! uploadFileDir.exists() ) {
			String msg = "uploadFileDir does not exist.  uploadFileDir: " 
					+ uploadFileDir.getAbsolutePath();
			log.error( msg );
			throw new LimelightWebappFileUploadFileSystemException(msg);
		}
		
		//  The subdir for this upload
		
		String dirNameForImportTrackingId =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().getDirForImportTrackingId( fileImportAndPipelineRunTrackingDTO.getId() );
		File dirForImportTrackingId  =  new File( uploadFileDir , dirNameForImportTrackingId );
		if ( ! dirForImportTrackingId.exists() ) {
			String msg = "dirForImportTrackingId NOT exist: " + dirForImportTrackingId.getAbsolutePath();
			log.error( msg );
			throw new Exception(msg);
		}

		int fileTypeId = 0;
		String uploadedFile_StoreOnDiskFileObject_FilenameOnly = null;
		
		if ( webserviceRequestHeaderContents.hardklorConfFile ) {
			
			fileTypeId = FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.HARDKLOR_CONF_FILE_FILE_TYPE_ID;
			uploadedFile_StoreOnDiskFileObject_FilenameOnly = FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.HARDKLOR_CONF_FILE_FILENAME;
			
		} else if ( webserviceRequestHeaderContents.bullseyeConfFile ) {
			
			fileTypeId = FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.BULLSEYE_CONF_FILE_FILE_TYPE_ID;
			uploadedFile_StoreOnDiskFileObject_FilenameOnly = FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.BULLSEYE_CONF_FILE_FILENAME;
			
		} else {
			log.warn( "Invalid Input: Both webserviceRequestHeaderContents.hardklorConfFile AND webserviceRequestHeaderContents.bullseyeConfFile are false or not set" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		File uploadedFileOnDisk = new File( dirForImportTrackingId, uploadedFile_StoreOnDiskFileObject_FilenameOnly );
		
		
		FileImportAndPipelineRunTrackingSingleFileDTO fileImportAndPipelineRunTrackingSingleFileDTO = new FileImportAndPipelineRunTrackingSingleFileDTO();
		fileImportAndPipelineRunTrackingSingleFileDTO.setFileImportAndPipelineRunTracking_Id(fileImportAndPipelineRunTrackingDTO.getId());
		fileImportAndPipelineRunTrackingSingleFileDTO.setFileIndex( fileTypeId );
		fileImportAndPipelineRunTrackingSingleFileDTO.setFileTypeId(fileTypeId);
		fileImportAndPipelineRunTrackingSingleFileDTO.setFilenameInUpload(webserviceRequestHeaderContents.filename);
		fileImportAndPipelineRunTrackingSingleFileDTO.setFileSize(httpRequest_ContentLengthInHeader);
		fileImportAndPipelineRunTrackingSingleFileDTO.setFileUploadStatus( ImportSingleFileUploadStatus.FILE_UPLOAD_STARTED );

		try {
		
			fileImportAndPipelineRunTrackingSingleFileDAO.save(fileImportAndPipelineRunTrackingSingleFileDTO);
			
		} catch ( DuplicateKeyException e ) {
			
			//  Already received this file so need to delete existing file and save new file
		
			List<FileImportAndPipelineRunTrackingSingleFileDTO> fileImportAndPipelineRunTrackingSingleFileDTO_From_DB_List = 
					fileImportAndPipelineRunTrackingSingleFileDAO.getFor_TrackingId_FileIndex(fileImportAndPipelineRunTrackingDTO.getId(), fileTypeId);
			
			
			for ( FileImportAndPipelineRunTrackingSingleFileDTO fileImportAndPipelineRunTrackingSingleFileDTO_From_DB : fileImportAndPipelineRunTrackingSingleFileDTO_From_DB_List ) {
				
				if ( StringUtils.isNotEmpty( fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getAws_s3_bucket_name() ) ) {
					
					//  Delete from S3

					S3Client amazonS3_Client = null;

					String amazonS3_RegionName = fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getAws_s3_region();

					if ( StringUtils.isNotEmpty( amazonS3_RegionName ) ) {
						
						Region aws_S3_Region = Region.of(amazonS3_RegionName);
						
						amazonS3_Client = 
								S3Client.builder()
								.region( aws_S3_Region )
								.httpClientBuilder(ApacheHttpClient.builder())
								.build();
						
					} else {
						//  SDK use Region from Environment Variable
						
						amazonS3_Client = 
								S3Client.builder()
								.httpClientBuilder(ApacheHttpClient.builder())
								.build(); 
					}
					
					DeleteObjectRequest deleteObjectRequest= 
							DeleteObjectRequest
							.builder()
							.bucket( fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getAws_s3_bucket_name() )
							.key( fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getAws_s3_object_key() )
							.build();

					amazonS3_Client.deleteObject(deleteObjectRequest);
				}
				
				if ( uploadedFileOnDisk != null ) {
					uploadedFileOnDisk.delete();
				}
				
				fileImportAndPipelineRunTrackingSingleFileDAO.delete_For_Id(fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getId());
			}
		
			fileImportAndPipelineRunTrackingSingleFileDAO.save(fileImportAndPipelineRunTrackingSingleFileDTO);
		}
		
		final String amazonS3_bucketName = Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values.getInstance().get_S3_Bucket_Configuration_Value();

		if ( StringUtils.isNotEmpty( amazonS3_bucketName ) ) {

			fileImportAndPipelineRunTrackingSingleFileDTO.setAws_s3_bucket_name(amazonS3_bucketName);
			
			//  Copy InputStream containing POST body into S3 Object
			{
				S3Client amazonS3_Client = null;

				String s3_Object_Key = 
						FileImportPipelineRunCommonConstants.IMPORT_AND_PIPELINE_RUN__BASE_DIR
						+ "/" + dirNameForImportTrackingId 
						+ "/" + uploadedFile_StoreOnDiskFileObject_FilenameOnly;
				
				fileImportAndPipelineRunTrackingSingleFileDTO.setAws_s3_object_key(s3_Object_Key);
				
				{  // Use Region from Config, otherwise SDK use from Environment Variable

					final String amazonS3_RegionName = Limelight_UploadFiles_GET_S3_Bucket_Region_Configuration_Values.getInstance().get_S3_Region_Configuration_Value();

					if ( StringUtils.isNotEmpty( amazonS3_RegionName ) ) {
						
						Region aws_S3_Region = Region.of(amazonS3_RegionName);
						
						amazonS3_Client = 
								S3Client.builder()
								.region( aws_S3_Region )
								.httpClientBuilder(ApacheHttpClient.builder())
								.build();
						
						fileImportAndPipelineRunTrackingSingleFileDTO.setAws_s3_region(amazonS3_RegionName);
						
					} else {
						//  SDK use Region from Environment Variable
						
						amazonS3_Client = 
								S3Client.builder()
								.httpClientBuilder(ApacheHttpClient.builder())
								.build(); 
					}
				}
				
				fileImportAndPipelineRunTrackingSingleFileDAO.update_AWS_S3_Fields(fileImportAndPipelineRunTrackingSingleFileDTO);

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
			}
			
		} else {

			fileImportAndPipelineRunTrackingSingleFileDTO.setFilenameOnDisk(uploadedFile_StoreOnDiskFileObject_FilenameOnly);
			
			fileImportAndPipelineRunTrackingSingleFileDTO.setCanonicalFilename_W_Path_OnSubmitMachine( uploadedFileOnDisk.getCanonicalPath() );
			fileImportAndPipelineRunTrackingSingleFileDTO.setAbsoluteFilename_W_Path_OnSubmitMachine( uploadedFileOnDisk.getAbsolutePath() );
			
			fileImportAndPipelineRunTrackingSingleFileDAO.update_LocalFile_Fields(fileImportAndPipelineRunTrackingSingleFileDTO);

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
							//						if ( totalBytesCopied > webserviceMethod_Internal_Params.maxFileSize ) {
							//	
							//							fileTooLarge = true;
							//							break;
							//						}
						}
					}
				}
				
			}
			
			
//			if ( fileTooLarge ) {
//				
//				if ( ! uploadedFileOnDisk.delete() ) {
//					log.warn("Failed to delete upload file that is canceled since too large.  file: " + uploadedFileOnDisk.getAbsolutePath() );
//				}
//				//  Return Error -  Status Code 400
//				webserviceResult.setStatusSuccess(false);
//				webserviceResult.setFileSizeLimitExceeded( true );
//				webserviceResult.setMaxSize( webserviceMethod_Internal_Params.maxFileSize );
//				webserviceResult.setMaxSizeFormatted( webserviceMethod_Internal_Params.maxFileSizeFormatted );
//
//				methodResults.returnBadRequestStatusCode = true;
//
//				//  EARLY RETURN
//				return methodResults;
//			}
		}

		fileImportAndPipelineRunTrackingSingleFileDAO.update_file_upload_status_id_For_Id(ImportSingleFileUploadStatus.FILE_UPLOAD_COMPLETE, fileImportAndPipelineRunTrackingSingleFileDTO.getId());
				
		webserviceResponse.setStatusSuccess( true );
		
				
		return webserviceResponse;
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

	
	//////   WebserviceRequest and WebserviceResult classes

	public static class WebserviceRequestDataInHeader {
		
		private String uploadKey;
		private boolean hardklorConfFile;
		private boolean bullseyeConfFile;
		
		private String filename;
		private long uploadFileSize;
		
		public void setUploadKey(String uploadKey) {
			this.uploadKey = uploadKey;
		}

		public void setHardklorConfFile(boolean hardklorConfFile) {
			this.hardklorConfFile = hardklorConfFile;
		}

		public void setBullseyeConfFile(boolean bullseyeConfFile) {
			this.bullseyeConfFile = bullseyeConfFile;
		}

		public void setFilename(String filename) {
			this.filename = filename;
		}

		public void setUploadFileSize(long uploadFileSize) {
			this.uploadFileSize = uploadFileSize;
		}
	}

	public static class WebserviceResponse {

		private boolean statusSuccess;

		public boolean isStatusSuccess() {
			return statusSuccess;
		}

		public void setStatusSuccess(boolean statusSuccess) {
			this.statusSuccess = statusSuccess;
		}
	}
}
