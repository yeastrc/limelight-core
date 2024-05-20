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
package org.yeastrc.limelight.limelight_importer.scan_file_processing_validating;

import java.io.File;
import java.io.InputStream;

import org.slf4j.LoggerFactory;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchScanFileImporterDAO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterErrorProcessingRunIdException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer_AllEntries;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry_AllEntries;
import org.yeastrc.limelight.limelight_importer.spectral_storage_service_interface.ScanFileToSpectralStorageService_SendFile;
import org.yeastrc.limelight.limelight_importer.spectral_storage_service_interface.ScanFileToSpectralStorageService_SendFile_In_AWS_S3;
import org.yeastrc.limelight.limelight_importer.utils.SHA1SumCalculator;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.ConfigSystemDAO_Importer;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileImporterDTO;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;

/**
 * Send Scan files to Spectral Storage Service
 * 
 * Insert entries to table search_scan_file_importer_tbl
 *
 */
public class ScanFiles_SendToSpectralStorageService {

	private static final Logger log = LoggerFactory.getLogger( ScanFiles_SendToSpectralStorageService.class );

	private ScanFiles_SendToSpectralStorageService() { }
	public static ScanFiles_SendToSpectralStorageService getInstance() { return new ScanFiles_SendToSpectralStorageService(); }
	
	/**
	 * @param scanFileFileContainer_KeyFilename
	 * @param searchScanFileEntry_KeyScanFilename
	 * @throws Exception 
	 */
	public void sendScanFilesToSpectralStorageService(
			ScanFileFileContainer_AllEntries scanFileFileContainer_AllEntries,
			SearchScanFileEntry_AllEntries searchScanFileEntry_AllEntries ) throws Exception {
		
		for ( ScanFileFileContainer scanFileFileContainer : scanFileFileContainer_AllEntries.get_ScanFileFileContainer_List() ) {
			
			String scanFilename = scanFileFileContainer.getScanFilename();
			
			SearchScanFileEntry searchScanFileEntry = searchScanFileEntry_AllEntries.get_From_ScanFilename( scanFilename );
			if ( searchScanFileEntry == null ) {
				String msg = "No entry in searchScanFileEntry_AllEntries.get_From_ScanFilename(...) for scanFilename: " + scanFilename;
				log.error( msg );
				throw new LimelightImporterInternalException( msg );
			}
			
			searchScanFileEntry.setScanFileFileContainer( scanFileFileContainer );

			SearchScanFileImporterDTO searchScanFileImporterDTO = new SearchScanFileImporterDTO();
			
			searchScanFileImporterDTO.setSearchScanFileId( searchScanFileEntry.getSearchScanFileId() );
			
			
			if ( StringUtils.isNotEmpty( scanFileFileContainer.getAws_s3_object_key() ) ) {
									
				//  Scan file in AWS S3

				if ( StringUtils.isEmpty( scanFileFileContainer.getAws_s3_bucket_name() ) ) {
					System.err.println( "Aws_s3_object_key populated but Aws_s3_bucket_name NOT populated.  Aws_s3_object_key: " + scanFileFileContainer.getAws_s3_object_key() );
					throw new LimelightImporterErrorProcessingRunIdException();
				}

				S3Client amazonS3_Client = null;

				String amazonS3_RegionName = scanFileFileContainer.getAws_s3_region();

				{  // Use Region from Config, otherwise SDK use from Environment Variable

					if ( StringUtils.isNotEmpty( amazonS3_RegionName ) ) {
								
						amazonS3_RegionName = ConfigSystemDAO_Importer.getInstance().getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_AWS_S3_REGION_KEY );
					}

					if ( StringUtils.isNotEmpty( amazonS3_RegionName ) ) {
						
						Region aws_S3_Region = Region.of( amazonS3_RegionName );
						
						amazonS3_Client = 
								S3Client.builder()
								.region( aws_S3_Region )
								.httpClientBuilder(ApacheHttpClient.builder())
								.build();

						searchScanFileImporterDTO.setAwsRegion( amazonS3_RegionName );

					} else {
						//  SDK use Region from Environment Variable
						
						amazonS3_Client = 
								S3Client.builder()
								.httpClientBuilder(ApacheHttpClient.builder())
								.build(); 
					}
				}
				
				Long fileSize = null;
				
				String sha1sum = null;
				
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
						System.err.println( "Could not find Scan File S3 Object.  ObjectKey: " 
								+ scanFileFileContainer.getAws_s3_object_key() 
								+ ", Object Bucket: " 
								+ scanFileFileContainer.getAws_s3_bucket_name() );
						throw new LimelightImporterErrorProcessingRunIdException();
					}
				
					InputStream inputStream = responseInputStream;

					sha1sum = SHA1SumCalculator.getInstance().getSHA1Sum_ForInputStream(inputStream);

				} catch ( NoSuchKeyException e ) {
					
					//  Throw Data Exception if externally passed in object key and bucket name
					
					System.err.println( "Could not find Scan File S3 Object.  ObjectKey: " 
							+ scanFileFileContainer.getAws_s3_object_key() 
							+ ", Object Bucket: " 
							+ scanFileFileContainer.getAws_s3_bucket_name() );
					throw new LimelightImporterErrorProcessingRunIdException(e);
				}

				String spectralStorageProcessKey = 
						ScanFileToSpectralStorageService_SendFile_In_AWS_S3.getInstance().sendScanFileToSpectralStorageService(scanFileFileContainer);

				searchScanFileImporterDTO.setFileSize( fileSize );
				searchScanFileImporterDTO.setSha1sum( sha1sum );
				searchScanFileImporterDTO.setSpectralStorageProcessKey( spectralStorageProcessKey );

				searchScanFileImporterDTO.setAwsBucketName( scanFileFileContainer.getAws_s3_bucket_name() );
				searchScanFileImporterDTO.setAwsObjectKey( scanFileFileContainer.getAws_s3_object_key() );
				searchScanFileImporterDTO.setAwsRegion( scanFileFileContainer.getAws_s3_region() );
				
			} else {
			
				//  Scan file in Local File System
				
				File scanFile = scanFileFileContainer.getScanFile();

				String sha1sum =
						SHA1SumCalculator.getInstance().getSHA1Sum( scanFile );

				//  Send the scan file to Spectral Storage Service and get back a "Process Key"

				String spectralStorageProcessKey = 
						ScanFileToSpectralStorageService_SendFile.getInstance()
						.sendScanFileToSpectralStorageService( scanFile );

				searchScanFileImporterDTO.setFileSize( scanFile.length() );
				searchScanFileImporterDTO.setSha1sum( sha1sum );
				searchScanFileImporterDTO.setSpectralStorageProcessKey( spectralStorageProcessKey );

				
				searchScanFileImporterDTO.setAbsoluteFilename_W_Path_OnSubmitMachine( scanFile.getAbsolutePath() );
				searchScanFileImporterDTO.setCanonicalFilename_W_Path_OnSubmitMachine( scanFile.getCanonicalPath() );
			}

			DB_Insert_SearchScanFileImporterDAO.getInstance().saveToDatabase( searchScanFileImporterDTO );
			
			searchScanFileEntry.setSearchScanFileImporterDTO( searchScanFileImporterDTO );
		}
		
	}

}
