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
package org.yeastrc.limelight.limelight_importer.yrc_file_object_storage_interface;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.file_object_storage.accept_import_web_app.webservice_connect.main.CallYRCFileObjectStoreWebservice;
import org.yeastrc.file_object_storage.accept_import_web_app.webservice_connect.main.CallYRCFileObjectStoreWebserviceInitParameters;
import org.yeastrc.file_object_storage.web_app.shared_server_client.webservice_request_response.main.UploadFile_AddFileIn_S3_BucketName_ObjectName_Response;
import org.yeastrc.file_object_storage.web_app.shared_server_client.webservice_request_response.main.UploadFile_UploadFile_Pass_Filename_InputStream_Size_Request;
import org.yeastrc.file_object_storage.web_app.shared_server_client.webservice_request_response.main.UploadFile_AddFileIn_S3_BucketName_ObjectName_Request;
import org.yeastrc.file_object_storage.web_app.shared_server_client.webservice_request_response.main.UploadFile_UploadFile_Response;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterErrorProcessingRunIdException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterFileObjectStorageServiceErrorException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterFileObjectStorageServiceRetryExceededException;
import org.yeastrc.limelight.limelight_importer.yrc_file_object_storage_interface.FileToYRCFileObjectStorageService_SendFile.FileToYRCFileObjectStorageService_SendFile__Result;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

/**
 * 
 *
 */
public class FileToYRCFileObjectStorageService_Send_AWS_S3_Location {

	private static final Logger log = LoggerFactory.getLogger( FileToYRCFileObjectStorageService_Send_AWS_S3_Location.class );
	
	private FileToYRCFileObjectStorageService_Send_AWS_S3_Location() { }
	public static FileToYRCFileObjectStorageService_Send_AWS_S3_Location getNewInstance() { return new FileToYRCFileObjectStorageService_Send_AWS_S3_Location(); }

	//  Overall Send File to YRC File Object Storage Service Retry Max and Delay
	
	private static final int OVERALL_SEND_FILE_RETRY_COUNT_MAX = 3;
	private static final int OVERALL_SEND_FILE_RETRY_DELAY = 2 * 1000; // 2 second

	//  Send File to YRC File Object Service Retry Max and Delay
	
	private static final int SEND_FILE_RETRY_COUNT_MAX = 10;
	private static final int SEND_FILE_RETRY_DELAY = 2 * 1000; // 2 second

	
	/**
	 * Send the AWS S3 Location to YRC File Object Storage Service, return the API Key
	 * 
	 * 
	 * Return object class defined in class FileToYRCFileObjectStorageService_SendFile
	 * 
	 * @param fileWithPath
	 * @param gzipCompressContents - boolean
	 * @return object with YRC File Object Storage Service API Key assigned OR boolean notConfigured is true
	 * @throws Exception
	 * @throws LimelightImporterFileObjectStorageServiceErrorException
	 */
	public FileToYRCFileObjectStorageService_SendFile__Result sendToYRCFileObjectStorageService(
			
			FileImportTrackingSingleFileDTO fileImportTrackingSingleFileDTO, 
			boolean gzipCompressContents ) throws Exception, LimelightImporterFileObjectStorageServiceErrorException {
		
		if ( fileImportTrackingSingleFileDTO == null ) {
			throw new IllegalArgumentException("Param: fileImportTrackingSingleFileDTO == null");
		}
		
		FileToYRCFileObjectStorageService_SendFile__Result methodResult = new FileToYRCFileObjectStorageService_SendFile__Result();
		
		String yrc_FileObjectStorageServiceBaseURL = 
				ConfigSystemTableGetValueCommon.getInstance()
				.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL );
		
		if ( StringUtils.isEmpty( yrc_FileObjectStorageServiceBaseURL ) ) {
			
			String msg = "No Config value for YRC File Object Storage Base URL, key: " + ConfigSystemsKeysSharedConstants.YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL;
			log.error( msg );
			methodResult.notConfigured = true;
			
			return methodResult;

			//  throw new LimelightImporterConfigurationException( msg );
		}
		
		//  retry this whole loop until successful or retries exceeded

		int retryCount = 0;

		while( true ) {  // use 'return ...' inside loop to exit

			retryCount++;
			
			if ( retryCount > 1 ) {
			
				log.warn( "Retrying overall Send to YRC File Object Storage Service.  Start over at InitUpload.  In sendToYRCFileObjectStorageService(...) retryCount: " 
						+ retryCount
						+ ", Object: S3 Bucket Name: " + fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() 
						+ ", Object: S3 Object Key: " + fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
						+ ", Object: S3 Region (can be null): " + fileImportTrackingSingleFileDTO.getAws_s3_region() );
			}
			
			try {
				String methodResult__API_Key = null;
				
				
				CallYRCFileObjectStoreWebserviceInitParameters initParameters = new CallYRCFileObjectStoreWebserviceInitParameters();
				
				initParameters.setFileObjectStorageServerBaseURL( yrc_FileObjectStorageServiceBaseURL );

				CallYRCFileObjectStoreWebservice callYRCFileObjectStoreWebservice = CallYRCFileObjectStoreWebservice.getInstance();
				
				callYRCFileObjectStoreWebservice.init(initParameters);
								
				boolean sendFileLocationCompleteSuccessful = false;
				
				{  //  First send location in AWS S3 bucket 
				
					if ( log.isInfoEnabled() ) {
						log.info( "INFO: Calling sendFilenameWithPathToFileObjectStorageService(...) : Object: S3 Bucket Name: " 
								+ fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() 
								+ ", Object: S3 Object Key: " + fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
								+ ", Object: S3 Region (can be null): " + fileImportTrackingSingleFileDTO.getAws_s3_region() );
					}

					UploadFile_AddFileIn_S3_BucketName_ObjectName_Response uploadFile_AddFileIn_S3_BucketName_ObjectName_Response =
							send_AWS_S3_Object_ToFileObjectStorageService( fileImportTrackingSingleFileDTO, gzipCompressContents, callYRCFileObjectStoreWebservice );

					if ( log.isInfoEnabled() ) {
						log.info( "INFO: After sendFilenameWithPathToFileObjectStorageService(...) Object: S3 Bucket Name: "
								+ fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() 
								+ ", Object: S3 Object Key: " + fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
								+ ", Object: S3 Region (can be null): " + fileImportTrackingSingleFileDTO.getAws_s3_region() );
					}

					if ( uploadFile_AddFileIn_S3_BucketName_ObjectName_Response.isStatusSuccess() ) {

						sendFileLocationCompleteSuccessful = true;
						
						methodResult__API_Key = uploadFile_AddFileIn_S3_BucketName_ObjectName_Response.getApiKey_Assigned();

					} else {

						if ( uploadFile_AddFileIn_S3_BucketName_ObjectName_Response.isUploadFileS3BucketOrObjectKey_NotFound() ) {

							//  Already reported in called method
//							log.warn( "Send of file with path to YRC File Object Storage Service rejected.  Will next send file contents" );
//							log.warn( "  ... addnl info: Limelight Importer configured to send file path to YRC File Object Storage Service but YRC File Object Storage Service not configured to accept File Locations." );
//							log.warn( "  ... addnl info: call sendFilenameWithPathToFileObjectStorageService(...) returned statusSuccess False" );

						//  Check in this order since if isUploadFileWithPath_FilePathsAllowedNotConfigured is true, isUploadFileWithPath_FilePathNotAllowed is also set to true
						} else if ( uploadFile_AddFileIn_S3_BucketName_ObjectName_Response.isUploadFileS3BucketOrObjectKey_PermissionError() ) {

							//  Already reported in called method
//								log.warn( "Send of file with path to YRC File Object Storage Service rejected.  Will next send file contents" );
//								log.warn( "  ... addnl info: Limelight Importer configured to send file path to YRC File Object Storage Service but YRC File Object Storage Service not configured to accept File Locations." );
//								log.warn( "  ... addnl info: call sendFilenameWithPathToFileObjectStorageService(...) returned statusSuccess False" );

						} else {
							String msg = "Send of file S3 Object location to YRC File Object Storage Service Failed.";
							log.warn( msg );
							log.warn( "  ... addnl info: call sendFilenameWithPathToFileObjectStorageService(...) returned statusSuccess False" );
							throw new LimelightImporterFileObjectStorageServiceErrorException( msg );
						}
					}
				}

				if ( ! sendFileLocationCompleteSuccessful ) {

					//  Sending File with Path not done or not accepted, so sending the file contents

					if ( log.isInfoEnabled() ) {
						log.info( "INFO: Calling sendToYRCFileObjectStorageService_ActuallySend(...) Object: S3 Bucket Name: " 
								+ fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() 
								+ ", Object: S3 Object Key: " + fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
								+ ", Object: S3 Region (can be null): " + fileImportTrackingSingleFileDTO.getAws_s3_region() );
					}

					UploadFile_UploadFile_Response uploadFile_UploadFile_Response = 
							sendToYRCFileObjectStorageService_ActuallySend_AWS_S3_Object_Contents( fileImportTrackingSingleFileDTO, gzipCompressContents, callYRCFileObjectStoreWebservice );

					if ( log.isInfoEnabled() ) {
						log.info( "INFO: After sendToYRCFileObjectStorageService_ActuallySend_AWS_S3_Object_Contents(...) (will next sleep for X seconds) Object: S3 Bucket Name: "
								+ fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() 
								+ ", Object: S3 Object Key: " + fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
								+ ", Object: S3 Region (can be null): " + fileImportTrackingSingleFileDTO.getAws_s3_region() );
					}

					if ( ! uploadFile_UploadFile_Response.isStatusSuccess() ) {
						String msg = "Send of file Contents to YRC File Object Storage Service Failed.";
						log.warn( msg );
						log.warn( "  ... addnl info: call sendToYRCFileObjectStorageService_ActuallySend(...) returned statusSuccess False" );

						throw new LimelightImporterFileObjectStorageServiceErrorException( msg );
					}

					//  Thread.sleep( 2000 ); // sleep in milliseconds
					

					methodResult__API_Key = uploadFile_UploadFile_Response.getApiKey_Assigned();
				}
				
				
				if ( log.isInfoEnabled() ) {
					log.info( "INFO: Calling submitFileToFileObjectStorageService(...) Object: S3 Bucket Name: " 
							+ fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() 
							+ ", Object: S3 Object Key: " + fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
							+ ", Object: S3 Region (can be null): " + fileImportTrackingSingleFileDTO.getAws_s3_region() );
				}
								
				//  Thread.sleep( 3000 ); // 3 second sleep
				
				//   return HERE from method to EXIT LOOP
				
				methodResult.ApiKey_Assigned = methodResult__API_Key;
				
				return methodResult;
				
				
			} catch ( Exception e ) {

				if ( retryCount < OVERALL_SEND_FILE_RETRY_COUNT_MAX ) {
					
					String msg = "Will Retry: Overall Send failed: Failed to send file to YRC File Object Storage. retryCount: " + retryCount;
					log.warn(msg);
					
				} else {
					String msg = "Overall Send: Failed to send file to YRC File Object Storage";
					log.error( msg, e );
					throw e;
				}
			}

			Thread.sleep( OVERALL_SEND_FILE_RETRY_DELAY ); // Sleep wait for retry
		}
	}

	/**
	 * @param uploadFile_Init_Response
	 * @param fileImportTrackingSingleFileDTO
	 * @param gzipCompressContents
	 * @param callYRCFileObjectStoreWebservice
	 * @return
	 * @throws LimelightImporterDataException
	 */
	private UploadFile_UploadFile_Response sendToYRCFileObjectStorageService_ActuallySend_AWS_S3_Object_Contents(
			
			FileImportTrackingSingleFileDTO fileImportTrackingSingleFileDTO, 
			boolean gzipCompressContents,
			CallYRCFileObjectStoreWebservice callYRCFileObjectStoreWebservice ) throws Exception {

		UploadFile_UploadFile_Response response = null;
		
		boolean uploadFileTempKey_NotFound_ErrorResponse = false;

		int retryCount = 0;

		while( true ) {  // use 'break;' inside loop to exit

			retryCount++;

			if ( retryCount > SEND_FILE_RETRY_COUNT_MAX ) {
				String msg = "Send File to YRC File Object Storage Service. Actually send the file. In sendToYRCFileObjectStorageService_ActuallySend():  failed for retryCount > SEND_FILE_RETRY_COUNT.  StatusSuccess: " 
						+ response.isStatusSuccess()
						+ ", Object: S3 Bucket Name: " 
						+ fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() 
						+ ", Object: S3 Object Key: " + fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
						+ ", Object: S3 Region (can be null): " + fileImportTrackingSingleFileDTO.getAws_s3_region();
				log.error( msg );
				throw new LimelightImporterFileObjectStorageServiceRetryExceededException(msg);
			}
			
			if ( retryCount > 1 ) {
				log.warn( "In sendToYRCFileObjectStorageService_ActuallySend(...) retryCount: " + retryCount + ", Object: S3 Bucket Name: " 
						+ fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() 
						+ ", Object: S3 Object Key: " + fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
						+ ", Object: S3 Region (can be null): " + fileImportTrackingSingleFileDTO.getAws_s3_region() );
			}

			S3Client amazonS3_Client = null;

			{  // Use Region from Object, otherwise SDK use from Environment Variable

				String amazonS3_RegionName = fileImportTrackingSingleFileDTO.getAws_s3_region();

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
			}
			

			GetObjectRequest getObjectRequest = 
					GetObjectRequest
					.builder()
					.bucket(fileImportTrackingSingleFileDTO.getAws_s3_bucket_name())
					.key( fileImportTrackingSingleFileDTO.getAws_s3_object_key() )
					.build();
			
			try ( ResponseInputStream<GetObjectResponse> responseInputStream = amazonS3_Client.getObject(getObjectRequest) ) {
				
				GetObjectResponse getObjectResponse = responseInputStream.response();
				
				Long fileSize = getObjectResponse.contentLength();
				if ( fileSize == null ) {
					System.err.println( "Could not find fileImportTrackingSingleFileDTO S3 Object.  ObjectKey: " 
							+ fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
							+ ", Object Bucket: " 
							+ fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() );
					throw new LimelightImporterErrorProcessingRunIdException();
				}

				UploadFile_UploadFile_Pass_Filename_InputStream_Size_Request uploadFile_UploadFile_Pass_Filename_InputStream_Size_Request = new UploadFile_UploadFile_Pass_Filename_InputStream_Size_Request();
				uploadFile_UploadFile_Pass_Filename_InputStream_Size_Request.setFile_InputStream(responseInputStream);

				uploadFile_UploadFile_Pass_Filename_InputStream_Size_Request.setFilename(fileImportTrackingSingleFileDTO.getFilenameInUpload());
				uploadFile_UploadFile_Pass_Filename_InputStream_Size_Request.setFile_Size(fileSize);
				uploadFile_UploadFile_Pass_Filename_InputStream_Size_Request.setGzipCompressContents(gzipCompressContents);

				try {
					//  Send file to YRC File Object Storage Service
					response = callYRCFileObjectStoreWebservice.call_UploadFile_UploadFile_Pass_Filename_InputStream_Size_Service(uploadFile_UploadFile_Pass_Filename_InputStream_Size_Request);

					if ( ! response.isStatusSuccess() ) {
						String msg = "Send File to YRC File Object Storage Service. Actually send the file. In sendToYRCFileObjectStorageService_ActuallySend(): call_UploadFile_UploadFile_Service return StatusSuccess false. Object: S3 Bucket Name: " 
								+ fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() 
								+ ", Object: S3 Object Key: " + fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
								+ ", Object: S3 Region (can be null): " + fileImportTrackingSingleFileDTO.getAws_s3_region();
						log.error( msg );
						throw new LimelightImporterFileObjectStorageServiceErrorException(msg);
					}

					break;  //  EXIT LOOP

				} catch ( Exception e ) {

					if ( retryCount == SEND_FILE_RETRY_COUNT_MAX || uploadFileTempKey_NotFound_ErrorResponse ) {
						String scanProcessStatusKeyResponsePart = ", response from YRC File Object Storage Service call interface is null (call may have thrown exception).";
						if ( response != null ) {
							scanProcessStatusKeyResponsePart = " StatusSuccess: " + response.isStatusSuccess();
						}

						String msg = "Send File to YRC File Object Storage Service. Actually send the file. In sendToYRCFileObjectStorageService_ActuallySend(): call_UploadFile_UploadFile_Service threw exception and failed for retryCount == SEND_FILE_RETRY_COUNT or uploadFileTempKey_NotFound_ErrorResponse is true. uploadFileTempKey_NotFound_ErrorResponse: " 
								+ uploadFileTempKey_NotFound_ErrorResponse
								+ ", scanProcessStatusKeyResponsePar: " + scanProcessStatusKeyResponsePart
								+ ", Object: S3 Bucket Name: " 
								+ fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() 
								+ ", Object: S3 Object Key: " + fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
								+ ", Object: S3 Region (can be null): " + fileImportTrackingSingleFileDTO.getAws_s3_region();
						log.error( msg, e );
						throw new LimelightImporterFileObjectStorageServiceErrorException( msg, e );
					}
				}
			}

			Thread.sleep( SEND_FILE_RETRY_DELAY ); // Sleep wait for retry
		}
		
		return response;
	}

	/**
	 * @param fileImportTrackingSingleFileDTO
	 * @param callYRCFileObjectStoreWebservice
	 * @return
	 * @throws LimelightImporterDataException
	 */
	private UploadFile_AddFileIn_S3_BucketName_ObjectName_Response send_AWS_S3_Object_ToFileObjectStorageService( 
			FileImportTrackingSingleFileDTO fileImportTrackingSingleFileDTO, 
			boolean gzipCompressContents,
			CallYRCFileObjectStoreWebservice callYRCFileObjectStoreWebservice ) throws Exception {

		UploadFile_AddFileIn_S3_BucketName_ObjectName_Request webserviceRequest = new UploadFile_AddFileIn_S3_BucketName_ObjectName_Request();
		
		webserviceRequest.setS3Bucket( fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() );
		webserviceRequest.setS3ObjectKey( fileImportTrackingSingleFileDTO.getAws_s3_object_key() );
		webserviceRequest.setS3Region( fileImportTrackingSingleFileDTO.getAws_s3_region() );
		webserviceRequest.setGzipCompressTheStoredFile(gzipCompressContents);

//				webserviceRequest.setFilenameSuffix(scanFilenameSuffix);  // Optional
		
		UploadFile_AddFileIn_S3_BucketName_ObjectName_Response response = null;
		
		int retryCount = 0;

		while( true ) {  // use 'break;' inside loop to exit

			retryCount++;

			if ( retryCount > SEND_FILE_RETRY_COUNT_MAX ) {
				String msg = "Send Filename with Path to YRC File Object Storage Service. Actually send the filename with Path. In sendFilenameWithPathToFileObjectStorageService():  failed for retryCount > SEND_FILE_RETRY_COUNT.  StatusSuccess: " 
						+ response.isStatusSuccess()
						+ ", Object: S3 Bucket Name: " 
						+ fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() 
						+ ", Object: S3 Object Key: " + fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
						+ ", Object: S3 Region (can be null): " + fileImportTrackingSingleFileDTO.getAws_s3_region();
				log.error( msg );
				throw new LimelightImporterFileObjectStorageServiceRetryExceededException(msg);
			}
			
			if ( retryCount > 1 ) {
				log.warn( "In sendFilenameWithPathToFileObjectStorageService(...) retryCount: " + retryCount + ", Object: S3 Bucket Name: " 
						+ fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() 
						+ ", Object: S3 Object Key: " + fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
						+ ", Object: S3 Region (can be null): " + fileImportTrackingSingleFileDTO.getAws_s3_region() );
			}

			try {
				//  Send file to YRC File Object Storage Service
				response = callYRCFileObjectStoreWebservice.call_UploadFile_AddFileIn_S3_BucketName_ObjectName_Webservice(webserviceRequest);

				if ( ! response.isStatusSuccess() ) {

					//  Check in this order since if isUploadFileWithPath_FilePathsAllowedNotConfigured is true, isUploadFileWithPath_FilePathNotAllowed is also set to true

					if ( response.isUploadFileS3BucketOrObjectKey_NotFound() ) {

						log.warn( "Send of file with path to YRC File Object Storage Service rejected.  Will next send file contents" );
						log.warn( "  ... addnl info: Limelight Importer configured to send file path to YRC File Object Storage Service but YRC File Object Storage Service not configured to accept File Locations." );
						log.warn( "  ... addnl info: call sendFilenameWithPathToFileObjectStorageService(...) returned statusSuccess False" );

						return response; // EARLY EXIT

					} else if ( response.isUploadFileS3BucketOrObjectKey_PermissionError() ) {

						log.warn( "Send of file with path to YRC File Object Storage Service rejected.  Will next send file contents" );
						log.warn( "  ... addnl info: Permission error reading the AWS S3 Object: S3 Bucket Name: " 
									+ fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() 
									+ ", Object: S3 Object Key: " + fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
									+ ", Object: S3 Region (can be null): " + fileImportTrackingSingleFileDTO.getAws_s3_region() );
						log.warn( "  ... addnl info: call sendFilenameWithPathToFileObjectStorageService(...) returned statusSuccess False" );

						return response; // EARLY EXIT
					}
					
					String msg = "Send File to YRC File Object Storage Service. Send the file location. In sendFilenameWithPathToFileObjectStorageService(): call_UploadFile_UploadFile_Service return StatusSuccess false.   " 
							 + ", Object: S3 Bucket Name: " 
								+ fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() 
								+ ", Object: S3 Object Key: " + fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
								+ ", Object: S3 Region (can be null): " + fileImportTrackingSingleFileDTO.getAws_s3_region();
					log.error( msg );
					throw new LimelightImporterFileObjectStorageServiceErrorException(msg);
				}

				break;  //  EXIT LOOP
				
			} catch ( Exception e ) {

				if ( retryCount == SEND_FILE_RETRY_COUNT_MAX ) {
					String scanProcessStatusKeyResponsePart = ", response from YRC File Object Storage Service call interface is null (call may have thrown exception).";
					if ( response != null ) {
						scanProcessStatusKeyResponsePart = " StatusSuccess: "
								+ response.isStatusSuccess()
								+ ", Object: S3 Bucket Name: " 
								+ fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() 
								+ ", Object: S3 Object Key: " + fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
								+ ", Object: S3 Region (can be null): " + fileImportTrackingSingleFileDTO.getAws_s3_region();
					}
					
					String msg = "Send File to YRC File Object Storage Service. Send the file location. In sendFilenameWithPathToFileObjectStorageService(): call_UploadFile_UploadFile_Service threw exception and failed for retryCount == SEND_FILE_RETRY_COUNT. scanProcessStatusKeyResponsePar: " 
							+ scanProcessStatusKeyResponsePart
							+ ", Object: S3 Bucket Name: " 
							+ fileImportTrackingSingleFileDTO.getAws_s3_bucket_name() 
							+ ", Object: S3 Object Key: " + fileImportTrackingSingleFileDTO.getAws_s3_object_key() 
							+ ", Object: S3 Region (can be null): " + fileImportTrackingSingleFileDTO.getAws_s3_region();
					log.error( msg, e );
					throw new LimelightImporterFileObjectStorageServiceErrorException( msg, e );
				}
			}

			Thread.sleep( SEND_FILE_RETRY_DELAY ); // Sleep wait for retry
		}
		
		return response;
	}
	
}
