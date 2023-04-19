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
package org.yeastrc.limelight.limelight_importer.spectral_storage_service_interface;

import java.io.InputStream;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterConfigurationException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterErrorProcessingRunIdException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterSpectralStorageServiceErrorException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterSpectralStorageServiceRetryExceededException;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_AddScanFileInS3Bucket_Request;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_AddScanFileInS3Bucket_Response;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_Init_Request;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_Init_Response;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_Submit_Request;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_Submit_Response;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_UploadScanFile_Pass_Filename_InputStream_Size_Request;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.UploadScanFile_UploadScanFile_Response;
import org.yeastrc.spectral_storage.accept_import_web_app.webservice_connect.main.CallSpectralStorageAcceptImportWebservice;
import org.yeastrc.spectral_storage.accept_import_web_app.webservice_connect.main.CallSpectralStorageAcceptImportWebserviceInitParameters;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;

/**
 * Send Scan File to Spectr (Spectral Storage Service)
 * 
 * Send Scan file that for Limelight is stored in AWS S3 (stored by Limelight or location pass in from submission)
 *
 */
public class ScanFileToSpectralStorageService_SendFile_In_AWS_S3 {

	private static final Logger log = LoggerFactory.getLogger( ScanFileToSpectralStorageService_SendFile_In_AWS_S3.class );
	
	private ScanFileToSpectralStorageService_SendFile_In_AWS_S3() { }
	public static ScanFileToSpectralStorageService_SendFile_In_AWS_S3 getInstance() { return new ScanFileToSpectralStorageService_SendFile_In_AWS_S3(); }

	//  Overall Send Scan File to Spectral Storage Service Retry Max and Delay
	
	private static final int OVERALL_SEND_FILE_RETRY_COUNT_MAX = 3;
	private static final int OVERALL_SEND_FILE_RETRY_DELAY = 2 * 1000; // 2 second

	//  Send Scan File to Spectral Storage Service Retry Max and Delay
	
	private static final int SEND_FILE_RETRY_COUNT_MAX = 10;
	private static final int SEND_FILE_RETRY_DELAY = 2 * 1000; // 2 second


	/**
	 * Send the scan file to the Spectral Storage Service, return the API Process Key
	 * 
	 * @param scanFileWithPath
	 * @return Spectral Storage Service API Process Key
	 * @throws Exception
	 */
	public String sendScanFileToSpectralStorageService( ScanFileFileContainer scanFileFileContainer ) throws Exception {
		
		String spectralStorageServiceBaseURL = 
				ConfigSystemTableGetValueCommon.getInstance()
				.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_ACCEPT_IMPORT_BASE_URL );
		
		if ( StringUtils.isEmpty( spectralStorageServiceBaseURL ) ) {
			String msg = "No Config value for Spectral Storage Base URL, key: " + ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_ACCEPT_IMPORT_BASE_URL;
			log.error( msg );
			throw new LimelightImporterConfigurationException( msg );
		}
		
		//  retry this whole loop until successful or retries exceeded

		int retryCount = 0;

		while( true ) {  // use 'return;' inside loop to exit

			retryCount++;
			
			if ( retryCount > 1 ) {
				log.warn( "Retrying overall Send to Spectral Storage Service.  Start over at InitUpload.  In sendScanFileToSpectralStorageService(...) retryCount: " 
						+ retryCount + ", scanFile Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key() );
			}
			
			try {
				CallSpectralStorageAcceptImportWebserviceInitParameters initParams = new CallSpectralStorageAcceptImportWebserviceInitParameters();
	
				initParams.setSpectralStorageServerBaseURL( spectralStorageServiceBaseURL );
	
				CallSpectralStorageAcceptImportWebservice callSpectralStorageAcceptImportWebservice = CallSpectralStorageAcceptImportWebservice.getInstance();
	
				callSpectralStorageAcceptImportWebservice.init( initParams );
				
				if ( log.isInfoEnabled() ) {
					log.info( "INFO: Calling spectralStorageService_InitUploadScanFileProcess(...) Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key() );
				}
				
				UploadScanFile_Init_Response uploadScanFile_Init_Response =
						spectralStorageService_InitUploadScanFileProcess( scanFileFileContainer, callSpectralStorageAcceptImportWebservice );
				
				if ( ! uploadScanFile_Init_Response.isStatusSuccess() ) {
					String msg = "call spectralStorageService_InitUploadScanFileProcess(...) returned statusSuccess False";
					log.warn( msg );
					throw new LimelightImporterSpectralStorageServiceErrorException( msg );
				}
	
				if ( log.isInfoEnabled() ) {
					log.info( "INFO: spectralStorageService_InitUploadScanFileProcess(...) uploadScanFile_Init_Response.UploadScanFileTempKey: " 
							+ uploadScanFile_Init_Response.getUploadScanFileTempKey() );
				}
				
				Thread.sleep( 2000 ); // 2 second sleep
				
				boolean sendScanFileLocationCompleteSuccessful = false;
				
				{
					//  First Send AWS S3 location.  If that is not accepted then below send the contents

					if ( log.isInfoEnabled() ) {
						log.info( "INFO: Calling call_UploadScanFile_AddScanFileInS3Bucket_Webservice(...) Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key() );
					}

					UploadScanFile_AddScanFileInS3Bucket_Response uploadScanFile_AddScanFileInS3Bucket_Response =
							sendScanFilename_AWS_S3_Location_ToSpectralStorageService( uploadScanFile_Init_Response, scanFileFileContainer, callSpectralStorageAcceptImportWebservice );

					if ( log.isInfoEnabled() ) {
						log.info( "INFO: After call_UploadScanFile_AddScanFileInS3Bucket_Webservice(...) Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key() );
					}

					if ( uploadScanFile_AddScanFileInS3Bucket_Response.isStatusSuccess() ) {

						sendScanFileLocationCompleteSuccessful = true;

					} else {

						//  Check in this order since if isUploadScanFileWithPath_FilePathsAllowedNotConfigured is true, isUploadScanFileWithPath_FilePathNotAllowed is also set to true
						if ( uploadScanFile_AddScanFileInS3Bucket_Response.isUploadScanFileS3BucketOrObjectKey_PermissionError() ) {

							//  Already reported in called method
							//								log.warn( "Send of Scan file with path to Spectral Storage Service rejected.  Will next send scan file contents" );
							//								log.warn( "  ... addnl info: Limelight Importer configured to send Scan file path to Spectral Storage Service but Spectral Storage Service not configured to accept Scan File Locations." );
							//								log.warn( "  ... addnl info: call call_UploadScanFile_AddScanFileInS3Bucket_Webservice(...) returned statusSuccess False" );

						} else if ( uploadScanFile_AddScanFileInS3Bucket_Response.isUploadScanFileS3BucketOrObjectKey_NotFound() ) {

							//  Already reported in called method
							//								log.warn( "Send of Scan file with path to Spectral Storage Service rejected.  Will next send scan file contents" );
							//								log.warn( "  ... addnl info: Limelight Importer configured to send Scan file path to Spectral Storage Service but for this specific scan file, the Scan file path was not allowed.  Scan File with path (Java Get Canonical file with Path): "
							//										+ scanFileWithPath.getCanonicalPath() );
							//								log.warn( "  ... addnl info: call call_UploadScanFile_AddScanFileInS3Bucket_Webservice(...) returned statusSuccess False" );

						} else {
							String msg = "Send of Scan file with path to Spectral Storage Service Failed.";
							log.warn( msg );
							log.warn( "  ... addnl info: call call_UploadScanFile_AddScanFileInS3Bucket_Webservice(...) returned statusSuccess False" );
							if ( uploadScanFile_AddScanFileInS3Bucket_Response.isUploadScanFileTempKey_NotFound() ) {
								log.warn( "  ... addnl info: For some reason the key returned by the init call is no longer in the system at Spectral Storage Service.  submitScanFileToSpectralStorageService(...) returned 'UploadScanFileTempKey_NotFound' true. UploadScanFileTempKey: " 
										+ uploadScanFile_Init_Response.getUploadScanFileTempKey() );
							}
							if ( uploadScanFile_AddScanFileInS3Bucket_Response.isUploadScanFileTempKey_Expired() ) {
								log.warn( "  ... addnl info: Too much time has elapsed since the call to the start of this submit scan file to spectral storage service (too much time since call to init). submitScanFileToSpectralStorageService(...) returned 'UploadScanFileTempKey_Expired' true. UploadScanFileTempKey: " 
										+ uploadScanFile_Init_Response.getUploadScanFileTempKey() );
							}
							if ( uploadScanFile_AddScanFileInS3Bucket_Response.isUploadScanFileTempKey_NotFound() ) {
								log.warn( "  ... addnl info: call_UploadScanFile_AddScanFileInS3Bucket_Webservice(...) returned 'UploadScanFileTempKey_NotFound' true. UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey() );
							}
							if ( uploadScanFile_AddScanFileInS3Bucket_Response.isUploadScanFileTempKey_Expired() ) {
								log.warn( "  ... addnl info: call_UploadScanFile_AddScanFileInS3Bucket_Webservice(...) returned 'UploadScanFileTempKey_Expired' true. UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey() );
							}
							throw new LimelightImporterSpectralStorageServiceErrorException( msg );
						}
					}
				}

				if ( ! sendScanFileLocationCompleteSuccessful ) {

					//  Sending Scan File with Path not done or not accepted, so sending the file contents

					if ( log.isInfoEnabled() ) {
						log.info( "INFO: Calling sendScanFileToSpectralStorageService_ActuallySendScanFile(...) Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key() );
					}

					UploadScanFile_UploadScanFile_Response uploadScanFile_UploadScanFile_Response = 
							sendScanFileToSpectralStorageService_ActuallySendScanFile( uploadScanFile_Init_Response, scanFileFileContainer, callSpectralStorageAcceptImportWebservice );

					if ( log.isInfoEnabled() ) {
						log.info( "INFO: After sendScanFileToSpectralStorageService(...) (will next sleep for X seconds) Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key() );
					}

					if ( ! uploadScanFile_UploadScanFile_Response.isStatusSuccess() ) {
						String msg = "Send of Scan file Contents to Spectral Storage Service Failed.";
						log.warn( msg );
						log.warn( "  ... addnl info: call sendScanFileToSpectralStorageService_ActuallySendScanFile(...) returned statusSuccess False" );
						if ( uploadScanFile_UploadScanFile_Response.isUploadScanFileTempKey_NotFound() ) {
							log.warn( "  ... addnl info: For some reason the key returned by the init call is no longer in the system at Spectral Storage Service.  submitScanFileToSpectralStorageService(...) returned 'UploadScanFileTempKey_NotFound' true. UploadScanFileTempKey: " 
									+ uploadScanFile_Init_Response.getUploadScanFileTempKey() );
						}
						if ( uploadScanFile_UploadScanFile_Response.isUploadScanFileTempKey_Expired() ) {
							log.warn( "  ... addnl info: Too much time has elapsed since the call to the start of this submit scan file to spectral storage service (too much time since call to init). submitScanFileToSpectralStorageService(...) returned 'UploadScanFileTempKey_Expired' true. UploadScanFileTempKey: " 
									+ uploadScanFile_Init_Response.getUploadScanFileTempKey() );
						}
						if ( uploadScanFile_UploadScanFile_Response.isUploadScanFileTempKey_NotFound() ) {
							log.warn( "  ... addnl info: sendScanFileToSpectralStorageService_ActuallySendScanFile(...) returned 'UploadScanFileTempKey_NotFound' true. UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey() );
						}
						if ( uploadScanFile_UploadScanFile_Response.isUploadScanFileTempKey_Expired() ) {
							log.warn( "  ... addnl info: sendScanFileToSpectralStorageService_ActuallySendScanFile(...) returned 'UploadScanFileTempKey_Expired' true. UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey() );
						}

						throw new LimelightImporterSpectralStorageServiceErrorException( msg );
					}

					Thread.sleep( 2000 ); // sleep in milliseconds
				}
				
				
				if ( log.isInfoEnabled() ) {
					log.info( "INFO: Calling submitScanFileToSpectralStorageService(...) Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key() );
				}
				
				UploadScanFile_Submit_Response uploadScanFile_Submit_Response =
						submitScanFileToSpectralStorageService( 
								uploadScanFile_Init_Response,
								scanFileFileContainer, 
								callSpectralStorageAcceptImportWebservice );
				
				if ( ! uploadScanFile_Submit_Response.isStatusSuccess() ) {
					String msg = "Call to Spectral Storage Service failed.  call submitScanFileToSpectralStorageService(...) returned statusSuccess False";
					log.warn( msg );
					if ( uploadScanFile_Submit_Response.isUploadScanFileTempKey_NotFound() ) {
						log.warn( "For some reason the key returned by the init call is no longer in the system at Spectral Storage Service.  submitScanFileToSpectralStorageService(...) returned 'UploadScanFileTempKey_NotFound' true. UploadScanFileTempKey: " 
								+ uploadScanFile_Init_Response.getUploadScanFileTempKey() );
					}
					if ( uploadScanFile_Submit_Response.isUploadScanFileTempKey_Expired() ) {
						log.warn( "Too much time has elapsed since the call to the start of this submit scan file to spectral storage service (too much time since call to init). submitScanFileToSpectralStorageService(...) returned 'UploadScanFileTempKey_Expired' true. UploadScanFileTempKey: " 
								+ uploadScanFile_Init_Response.getUploadScanFileTempKey() );
					}
					throw new LimelightImporterSpectralStorageServiceErrorException( msg );
				}

				if ( log.isInfoEnabled() ) {
					log.info( "INFO: After Call submitScanFileToSpectralStorageService(...) uploadScanFile_Submit_Response.isStatusSuccess(): "  
							+ uploadScanFile_Submit_Response.isStatusSuccess()
							+ ", uploadScanFile_Submit_Response.getScanProcessStatusKey(): " 
							+ uploadScanFile_Submit_Response.getScanProcessStatusKey()
							+ ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key() );
				}
				
				Thread.sleep( 3000 ); // 3 second sleep
				
				return uploadScanFile_Submit_Response.getScanProcessStatusKey();
				
			} catch ( Exception e ) {

				if ( retryCount < OVERALL_SEND_FILE_RETRY_COUNT_MAX ) {
					
					String msg = "Will Retry: Overall Send failed: Failed to send scan file to Spectral Storage. retryCount: " + retryCount;
					log.warn(msg);
					
				} else {
					String msg = "Overall Send: Failed to send scan file to Spectral Storage";
					log.error( msg, e );
					throw e;
				}
			}

			Thread.sleep( OVERALL_SEND_FILE_RETRY_DELAY ); // Sleep wait for retry
		}
	}

	/**
	 * @param scanFileWithPath
	 * @param scanFileDTO
	 * @param callSpectralStorageAcceptImportWebservice
	 * @return
	 * @throws LimelightImporterDataException
	 */
	private UploadScanFile_Init_Response spectralStorageService_InitUploadScanFileProcess( 
			ScanFileFileContainer scanFileFileContainer, 
			CallSpectralStorageAcceptImportWebservice callSpectralStorageAcceptImportWebservice ) throws Exception {

		UploadScanFile_Init_Response response = null;

		int retryCount = 0;

		while( true ) {  // use 'break;' inside loop to exit

			retryCount++;

			if ( retryCount > SEND_FILE_RETRY_COUNT_MAX ) {
				String msg = "spectralStorageService_InitUploadScanFileProcess failed for retryCount > SEND_FILE_RETRY_COUNT.  UploadScanFileTempKey: " + response.getUploadScanFileTempKey()
					+ ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key();
				log.error( msg );
				throw new LimelightImporterSpectralStorageServiceRetryExceededException(msg);
			}
			
			if ( retryCount > 1 ) {
				log.warn( "In spectralStorageService_InitUploadScanFileProcess(...) retryCount: " + retryCount + ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key() );
			}
			
			UploadScanFile_Init_Request webserviceRequest = new UploadScanFile_Init_Request();
			
			try {
				//  Send scan file to Spectral Storage Service
				response = callSpectralStorageAcceptImportWebservice.call_UploadScanFile_Init_Webservice( webserviceRequest );

				if ( ! response.isStatusSuccess() ) {
					String msg = "Send Scan File to Spectral Storage Service:  Call to call_UploadScanFile_Init_Webservice(...) response StatusSuccess is false.  UploadScanFileTempKey: " 
							 + response.getUploadScanFileTempKey()
							 + ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key();
					log.error( msg );
					throw new LimelightImporterSpectralStorageServiceErrorException(msg);
				}

				break;  //  EXIT LOOP
				
			} catch ( Exception e ) {

				if ( retryCount == SEND_FILE_RETRY_COUNT_MAX ) {
					String scanProcessStatusKeyResponsePart = ", response from Spectral Storage Service call interface is null (call may have thrown exception).";
					if ( response != null ) {
						scanProcessStatusKeyResponsePart = " UploadScanFileTempKey: " + response.getUploadScanFileTempKey();
					}
					
					String msg = "Send Scan File to Spectral Storage Service:  Call to call_UploadScanFile_Init_Webservice(...) hrew exception and failed for retryCount == SEND_FILE_RETRY_COUNT. " + scanProcessStatusKeyResponsePart
						+ ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key();
					log.error( msg, e );
					throw new LimelightImporterSpectralStorageServiceErrorException( msg, e );
				}
			}

			Thread.sleep( SEND_FILE_RETRY_DELAY ); // Sleep wait for retry
		}
		
		return response;
	}
	
	/**
	 * @param uploadScanFile_Init_Response
	 * @param scanFileWithPath
	 * @param scanFileDTO
	 * @param callSpectralStorageAcceptImportWebservice
	 * @return
	 * @throws LimelightImporterDataException
	 */
	private UploadScanFile_UploadScanFile_Response sendScanFileToSpectralStorageService_ActuallySendScanFile( 
			UploadScanFile_Init_Response uploadScanFile_Init_Response,
			ScanFileFileContainer scanFileFileContainer, 
			CallSpectralStorageAcceptImportWebservice callSpectralStorageAcceptImportWebservice ) throws Exception {

		UploadScanFile_UploadScanFile_Response response = null;
		
		boolean uploadScanFileTempKey_NotFound_ErrorResponse = false;

		int retryCount = 0;

		while( true ) {  // use 'break;' inside loop to exit

			retryCount++;

			if ( retryCount > SEND_FILE_RETRY_COUNT_MAX ) {
				String msg = "Send Scan File to Spectral Storage Service. Actually send the file. In sendScanFileToSpectralStorageService_ActuallySendScanFile():  failed for retryCount > SEND_FILE_RETRY_COUNT.  StatusSuccess: " + response.isStatusSuccess()
					+ ", UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey()
					+ ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key();
				log.error( msg );
				throw new LimelightImporterSpectralStorageServiceRetryExceededException(msg);
			}
			
			if ( retryCount > 1 ) {
				log.warn( "In sendScanFileToSpectralStorageService_ActuallySendScanFile(...) retryCount: " + retryCount + ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key() );
				
			}

			S3Client amazonS3_Client = null;

			{  // Use Region from Object, otherwise SDK use from Environment Variable

				String amazonS3_RegionName = scanFileFileContainer.getAws_s3_region();

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
			
			Long fileSize = null;
			
			GetObjectRequest getObjectRequest = 
					GetObjectRequest
					.builder()
					.bucket(scanFileFileContainer.getAws_s3_bucket_name())
					.key( scanFileFileContainer.getAws_s3_object_key() )
					.build();
			
			try ( ResponseInputStream<GetObjectResponse> responseInputStream = amazonS3_Client.getObject(getObjectRequest) ) {
				
				GetObjectResponse getObjectResponse = responseInputStream.response();
				
				fileSize = getObjectResponse.contentLength();
				if ( fileSize == null ) {
					System.err.println( "Could not find mainXMLFileToImport S3 Object.  ObjectKey: " 
							+ scanFileFileContainer.getAws_s3_object_key() 
							+ ", Object Bucket: " 
							+ scanFileFileContainer.getAws_s3_bucket_name() );
					throw new LimelightImporterErrorProcessingRunIdException();
				}
			
				InputStream inputStream = responseInputStream;



				UploadScanFile_UploadScanFile_Pass_Filename_InputStream_Size_Request uploadScanFile_UploadScanFile_Pass_Filename_InputStream_Size_Request = new UploadScanFile_UploadScanFile_Pass_Filename_InputStream_Size_Request();
				uploadScanFile_UploadScanFile_Pass_Filename_InputStream_Size_Request.setUploadScanFileTempKey( uploadScanFile_Init_Response.getUploadScanFileTempKey() );
				uploadScanFile_UploadScanFile_Pass_Filename_InputStream_Size_Request.setScanFilename(scanFileFileContainer.getScanFilename());
				uploadScanFile_UploadScanFile_Pass_Filename_InputStream_Size_Request.setScanFile_Size(scanFileFileContainer.getFileSize());
				uploadScanFile_UploadScanFile_Pass_Filename_InputStream_Size_Request.setScanFile_InputStream(inputStream);
				
				try {
					//  Send scan file to Spectral Storage Service
					response = callSpectralStorageAcceptImportWebservice.call_UploadScanFile_Pass_Filename_InputStream_Size_Service( uploadScanFile_UploadScanFile_Pass_Filename_InputStream_Size_Request );


//					public UploadScanFile_UploadScanFile_Response call_UploadScanFile_Pass_Filename_InputStream_Size_Service( UploadScanFile_UploadScanFile_Pass_Filename_InputStream_Size_Request webserviceRequest ) throws Exception {
						
					if ( ! response.isStatusSuccess() ) {
						if ( response.isUploadScanFileTempKey_NotFound() ) {
							uploadScanFileTempKey_NotFound_ErrorResponse = true;
							String msg = "Send Scan File to Spectral Storage Service. Actually send the file. In sendScanFileToSpectralStorageService_ActuallySendScanFile(): call_UploadScanFile_UploadScanFile_Service return UploadScanFileTempKey_NotFound true.  UploadScanFileTempKey: " 
									 + uploadScanFile_Init_Response.getUploadScanFileTempKey()
									 + ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key();
							log.error( msg );
						}
						String msg = "Send Scan File to Spectral Storage Service. Actually send the file. In sendScanFileToSpectralStorageService_ActuallySendScanFile(): call_UploadScanFile_UploadScanFile_Service return StatusSuccess false.  UploadScanFileTempKey: " 
								 + uploadScanFile_Init_Response.getUploadScanFileTempKey()
								 + ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key();
						log.error( msg );
						throw new LimelightImporterSpectralStorageServiceErrorException(msg);
					}

					break;  //  EXIT LOOP
					
				} catch ( Exception e ) {

					if ( retryCount == SEND_FILE_RETRY_COUNT_MAX || uploadScanFileTempKey_NotFound_ErrorResponse ) {
						String scanProcessStatusKeyResponsePart = ", response from Spectral Storage Service call interface is null (call may have thrown exception).";
						if ( response != null ) {
							scanProcessStatusKeyResponsePart = " StatusSuccess: " + response.isStatusSuccess()
								+ ", UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey();
						}
						
						String msg = "Send Scan File to Spectral Storage Service. Actually send the file. In sendScanFileToSpectralStorageService_ActuallySendScanFile(): call_UploadScanFile_UploadScanFile_Service threw exception and failed for retryCount == SEND_FILE_RETRY_COUNT or uploadScanFileTempKey_NotFound_ErrorResponse is true. uploadScanFileTempKey_NotFound_ErrorResponse: " 
								+ uploadScanFileTempKey_NotFound_ErrorResponse
								+ ", scanProcessStatusKeyResponsePar: " + scanProcessStatusKeyResponsePart
								+ ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key();
						log.error( msg, e );
						throw new LimelightImporterSpectralStorageServiceErrorException( msg, e );
					}
				}

			} catch ( NoSuchKeyException e ) {
				
				//  Throw Data Exception if externally passed in object key and bucket name
				
				System.err.println( "Could not find mainXMLFileToImport S3 Object.  ObjectKey: " 
						+ scanFileFileContainer.getAws_s3_object_key() 
						+ ", Object Bucket: " 
						+ scanFileFileContainer.getAws_s3_bucket_name() );
				throw new LimelightImporterErrorProcessingRunIdException(e);
			}
			
			Thread.sleep( SEND_FILE_RETRY_DELAY ); // Sleep wait for retry
		}
		
		return response;
	}

	/**
	 * @param uploadScanFile_Init_Response
	 * @param scanFileWithPath
	 * @param scanFileDTO
	 * @param callSpectralStorageAcceptImportWebservice
	 * @return
	 * @throws LimelightImporterDataException
	 */
	private UploadScanFile_AddScanFileInS3Bucket_Response sendScanFilename_AWS_S3_Location_ToSpectralStorageService( 
			UploadScanFile_Init_Response uploadScanFile_Init_Response,
			ScanFileFileContainer scanFileFileContainer, 
			CallSpectralStorageAcceptImportWebservice callSpectralStorageAcceptImportWebservice ) throws Exception {

		UploadScanFile_AddScanFileInS3Bucket_Response response = null;
		
		boolean uploadScanFileTempKey_NotFound_ErrorResponse = false;

		int retryCount = 0;

		while( true ) {  // use 'break;' inside loop to exit

			retryCount++;

			if ( retryCount > SEND_FILE_RETRY_COUNT_MAX ) {
				String msg = "Send Scan Filename with Path to Spectral Storage Service. Actually send the filename with Path. In call_UploadScanFile_AddScanFileInS3Bucket_Webservice():  failed for retryCount > SEND_FILE_RETRY_COUNT.  StatusSuccess: " + response.isStatusSuccess()
					+ ", UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey()
					+ ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key();
				log.error( msg );
				throw new LimelightImporterSpectralStorageServiceRetryExceededException(msg);
			}
			
			if ( retryCount > 1 ) {
				log.warn( "In call_UploadScanFile_AddScanFileInS3Bucket_Webservice(...) retryCount: " + retryCount + ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key() );
				
			}
			

			UploadScanFile_AddScanFileInS3Bucket_Request uploadScanFile_AddScanFileInS3Bucket_Request = new UploadScanFile_AddScanFileInS3Bucket_Request();
			uploadScanFile_AddScanFileInS3Bucket_Request.setUploadScanFileTempKey( uploadScanFile_Init_Response.getUploadScanFileTempKey() );
			uploadScanFile_AddScanFileInS3Bucket_Request.setS3Bucket( scanFileFileContainer.getAws_s3_bucket_name() );
			uploadScanFile_AddScanFileInS3Bucket_Request.setS3ObjectKey( scanFileFileContainer.getAws_s3_object_key() );
			uploadScanFile_AddScanFileInS3Bucket_Request.setS3Region( scanFileFileContainer.getAws_s3_region() );
//			uploadScanFile_AddScanFileInS3Bucket_Request.setScanFilenameSuffix(scanFilenameSuffix);  // Optional.
			
			try {
				//  Send scan file to Spectral Storage Service
				response = callSpectralStorageAcceptImportWebservice.call_UploadScanFile_AddScanFileInS3Bucket_Webservice( uploadScanFile_AddScanFileInS3Bucket_Request );

				if ( ! response.isStatusSuccess() ) {

//					@XmlAttribute // attribute name is property name
//					private boolean statusSuccess;
//
//					@XmlAttribute // attribute name is property name
//					private boolean uploadScanFileTempKey_NotFound;
//					
//					@XmlAttribute // attribute name is property name
//					private boolean uploadScanFileTempKey_Expired;
//
//					@XmlAttribute // attribute name is property name
//					private boolean objectKeyOrFilenameSuffixNotValid;
//					
//					@XmlAttribute // attribute name is property name
//					private boolean uploadScanFileS3BucketOrObjectKey_NotFound;
//					
//					/**
//					 * S3 returned an permission error when trying to determine if object exists or unable to determine the size
//					 */
//					@XmlAttribute // attribute name is property name
//					private boolean uploadScanFileS3BucketOrObjectKey_PermissionError;
//						
//					
//					//  These are populated for upload filesize exceeds allowed max
//					@XmlAttribute // attribute name is property name
//					private Boolean fileSizeLimitExceeded;
//					@XmlAttribute // attribute name is property name
//					private Long maxSize;
//					@XmlAttribute // attribute name is property name
//					private String maxSizeFormatted;
					
					
					//  Check in this order since if isUploadScanFileWithPath_FilePathsAllowedNotConfigured is true, isUploadScanFileWithPath_FilePathNotAllowed is also set to true

//					if ( response.isUploadScanFileWithPath_FilePathsAllowedNotConfigured() ) {
//
//						log.warn( "Send of Scan file with path to Spectral Storage Service rejected.  Will next send scan file contents" );
//						log.warn( "  ... addnl info: Limelight Importer configured to send Scan file path to Spectral Storage Service but Spectral Storage Service not configured to accept Scan File Locations." );
//						log.warn( "  ... addnl info: call call_UploadScanFile_AddScanFileInS3Bucket_Webservice(...) returned statusSuccess False" );
//
//						return response; // EARLY EXIT
//
//					} else if ( response.isUploadScanFileWithPath_FilePathNotAllowed() ) {
//
//						log.warn( "Send of Scan file with path to Spectral Storage Service rejected.  Will next send scan file contents" );
//						log.warn( "  ... addnl info: Limelight Importer configured to send Scan file path to Spectral Storage Service but for this specific scan file, the Scan file path was not allowed.  Scan File with path (Java Get Canonical file with Path): "
//								+ scanFileWithPath.getCanonicalPath() );
//						log.warn( "  ... addnl info: call call_UploadScanFile_AddScanFileInS3Bucket_Webservice(...) returned statusSuccess False" );
//
//						return response; // EARLY EXIT
//					}

					if ( response.isUploadScanFileS3BucketOrObjectKey_PermissionError() ) {

						log.warn( "Send of Scan file with path to Spectral Storage Service rejected.  Will next send scan file contents" );
						log.warn( "  ... addnl info: Limelight Importer configured to send Scan file S3 Bucket and Key to Spectral Storage Service but Spectral Storage Service get permission error." );
						log.warn( 
								"  ... addnl info: Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key()
								+ ", Aws_s3_bucket_name: " + scanFileFileContainer.getAws_s3_bucket_name()
								+ ", Aws_s3_region: " + scanFileFileContainer.getAws_s3_region() );
						log.warn( "  ... addnl info: call call_UploadScanFile_AddScanFileInS3Bucket_Webservice(...) returned statusSuccess False" );

						return response; // EARLY EXIT

					} else if ( response.isUploadScanFileS3BucketOrObjectKey_NotFound() ) {

						log.warn( "Send of Scan file with path to Spectral Storage Service rejected.  Will next send scan file contents" );
						log.warn( "  ... addnl info: Limelight Importer configured to send Scan file S3 Bucket and Key to Spectral Storage Service but Spectral Storage Service not find Scan File At that location." );
						log.warn( 
								"  ... addnl info: Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key()
								+ ", Aws_s3_bucket_name: " + scanFileFileContainer.getAws_s3_bucket_name()
								+ ", Aws_s3_region: " + scanFileFileContainer.getAws_s3_region() );
						log.warn( "  ... addnl info: call call_UploadScanFile_AddScanFileInS3Bucket_Webservice(...) returned statusSuccess False" );

						return response; // EARLY EXIT
					}
					
					if ( response.isUploadScanFileTempKey_NotFound() ) {
						uploadScanFileTempKey_NotFound_ErrorResponse = true;
						String msg = "Send Scan File to Spectral Storage Service. Actually send the file. In call_UploadScanFile_AddScanFileInS3Bucket_Webservice(): call_UploadScanFile_UploadScanFile_Service return UploadScanFileTempKey_NotFound true.  UploadScanFileTempKey: " 
								 + uploadScanFile_Init_Response.getUploadScanFileTempKey()
								 + ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key()
								 + ", Aws_s3_bucket_name: " + scanFileFileContainer.getAws_s3_bucket_name()
								 + ", Aws_s3_region: " + scanFileFileContainer.getAws_s3_region();
						log.error( msg );
					}
					String msg = "Send Scan File to Spectral Storage Service. Actually send the file. In call_UploadScanFile_AddScanFileInS3Bucket_Webservice(): call_UploadScanFile_UploadScanFile_Service return StatusSuccess false.  UploadScanFileTempKey: " 
							 + uploadScanFile_Init_Response.getUploadScanFileTempKey()
							 + ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key();
					log.error( msg );
					throw new LimelightImporterSpectralStorageServiceErrorException(msg);
				}

				break;  //  EXIT LOOP
				
			} catch ( Exception e ) {

				if ( retryCount == SEND_FILE_RETRY_COUNT_MAX || uploadScanFileTempKey_NotFound_ErrorResponse ) {
					String scanProcessStatusKeyResponsePart = ", response from Spectral Storage Service call interface is null (call may have thrown exception).";
					if ( response != null ) {
						scanProcessStatusKeyResponsePart = " StatusSuccess: " + response.isStatusSuccess()
							+ ", UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey();
					}
					
					String msg = "Send Scan File to Spectral Storage Service. Actually send the file. In call_UploadScanFile_AddScanFileInS3Bucket_Webservice(): call_UploadScanFile_UploadScanFile_Service threw exception and failed for retryCount == SEND_FILE_RETRY_COUNT or uploadScanFileTempKey_NotFound_ErrorResponse is true. uploadScanFileTempKey_NotFound_ErrorResponse: " 
							+ uploadScanFileTempKey_NotFound_ErrorResponse
							+ ", scanProcessStatusKeyResponsePar: " + scanProcessStatusKeyResponsePart
							+ ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key();
					log.error( msg, e );
					throw new LimelightImporterSpectralStorageServiceErrorException( msg, e );
				}
			}

			Thread.sleep( SEND_FILE_RETRY_DELAY ); // Sleep wait for retry
		}
		
		return response;
	}
	

	/**
	 * @param uploadScanFile_Init_Response
	 * @param scanFileWithPath
	 * @param scanFileDTO
	 * @param callSpectralStorageAcceptImportWebservice
	 * @return
	 * @throws LimelightImporterDataException
	 */
	private UploadScanFile_Submit_Response submitScanFileToSpectralStorageService( 
			UploadScanFile_Init_Response uploadScanFile_Init_Response,
			ScanFileFileContainer scanFileFileContainer, //  ONLY for error messages
			CallSpectralStorageAcceptImportWebservice callSpectralStorageAcceptImportWebservice ) throws Exception {

		UploadScanFile_Submit_Response response = null;

		boolean uploadScanFileTempKey_NotFound_ErrorResponse = false;

		int retryCount = 0;

		while( true ) {  // use 'break;' inside loop to exit
			
			retryCount++;

			if ( retryCount > SEND_FILE_RETRY_COUNT_MAX ) {
				String msg = "Send Scan File to Spectral Storage Service. Submit (commit) Upload. In submitScanFileToSpectralStorageService():  failed for retryCount > SEND_FILE_RETRY_COUNT.  StatusSuccess: " + response.isStatusSuccess()
					+ ", UploadScanFileTempKey: " + uploadScanFile_Init_Response.getUploadScanFileTempKey()
					+ ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key();
				log.error( msg );
				throw new LimelightImporterSpectralStorageServiceRetryExceededException(msg);
			}

			if ( retryCount > 1 ) {
				log.warn( "Send Scan File to Spectral Storage Service. Submit (commit) Upload. In submitScanFileToSpectralStorageService():  retryCount: " + retryCount + ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key() );
				
			}
			
			UploadScanFile_Submit_Request uploadScanFile_Submit_Request = new UploadScanFile_Submit_Request();
			uploadScanFile_Submit_Request.setUploadScanFileTempKey( uploadScanFile_Init_Response.getUploadScanFileTempKey() );
			
			try {
				//  Send scan file to Spectral Storage Service
				response = callSpectralStorageAcceptImportWebservice.call_UploadScanFile_Submit_Webservice( uploadScanFile_Submit_Request );

				if ( ! response.isStatusSuccess() ) {
					if ( response.isUploadScanFileTempKey_NotFound() ) {
//						uploadScanFileTempKey_NotFound_ErrorResponse = true;
						String msg = "Send Scan File to Spectral Storage Service. Submit (commit) Upload. In submitScanFileToSpectralStorageService(): call call_UploadScanFile_Submit_Webservice returned StatusSuccess false, isUploadScanFileTempKey_NotFound true.";
						log.error( msg );
					}
					String msg = "Send Scan File to Spectral Storage Service. Submit (commit) Upload. In submitScanFileToSpectralStorageService(): call call_UploadScanFile_Submit_Webservice returned StatusSuccess false.";
					log.error( msg );
					throw new LimelightImporterSpectralStorageServiceErrorException(msg);
				}
				
				//  If got here, the call didn't throw an exception and the returned StatusSuccess is true so exit loop to return response
				
				break;  //  EXIT LOOP
				
			} catch ( Exception e ) {

				if ( retryCount == SEND_FILE_RETRY_COUNT_MAX || uploadScanFileTempKey_NotFound_ErrorResponse ) {
					String scanProcessStatusKeyResponsePart = ", response from Spectral Storage Service call interface is null (call may have thrown exception).";
					if ( response != null ) {
						scanProcessStatusKeyResponsePart = " ScanProcessStatusKey: " + response.getScanProcessStatusKey();
					}
					
					String msg = "Send Scan File to Spectral Storage Service. Submit (commit) Upload. In submitScanFileToSpectralStorageService(): call call_UploadScanFile_Submit_Webservice threw exception and failed for retryCount == SEND_FILE_RETRY_COUNT or uploadScanFileTempKey_NotFound_ErrorResponse is true. uploadScanFileTempKey_NotFound_ErrorResponse: " 
							+ uploadScanFileTempKey_NotFound_ErrorResponse
							+ ", scanProcessStatusKeyResponsePart: "
							+ scanProcessStatusKeyResponsePart
							+ ", Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key();
					log.error( msg, e );
					throw new LimelightImporterSpectralStorageServiceErrorException( msg, e );
				}
			}

			Thread.sleep( SEND_FILE_RETRY_DELAY ); // Sleep wait for retry
		}
		
		return response;
	}
	
}
