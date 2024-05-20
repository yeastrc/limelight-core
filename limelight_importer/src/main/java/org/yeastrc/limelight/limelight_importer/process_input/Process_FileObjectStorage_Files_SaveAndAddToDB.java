package org.yeastrc.limelight.limelight_importer.process_input;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.dao.FileObjectStorage_MainEntry_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.FileObjectStorage_MainEntry_FileTypeLookup_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.FileObjectStorage_SourceFirstImport_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.FileObjectStorage_ToSearch_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterErrorProcessingRunIdException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterFileObjectStorageServiceErrorException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.FileObjectStorage_FileContainer;
import org.yeastrc.limelight.limelight_importer.objects.FileObjectStorage_FileContainer_AllEntries;
import org.yeastrc.limelight.limelight_importer.utils.SHA1SumCalculator;
import org.yeastrc.limelight.limelight_importer.yrc_file_object_storage_interface.FileToYRCFileObjectStorageService_SendFile;
import org.yeastrc.limelight.limelight_importer.yrc_file_object_storage_interface.FileToYRCFileObjectStorageService_SendFile.FileToYRCFileObjectStorageService_SendFile__Result;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.ConfigSystemDAO_Importer;
import org.yeastrc.limelight.limelight_importer.yrc_file_object_storage_interface.FileToYRCFileObjectStorageService_Send_AWS_S3_Location;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.dto.FileObjectStorage_MainEntry_DTO;
import org.yeastrc.limelight.limelight_shared.dto.FileObjectStorage_MainEntry_FileTypeLookup_DTO;
import org.yeastrc.limelight.limelight_shared.dto.FileObjectStorage_SourceFirstImport_DTO;
import org.yeastrc.limelight.limelight_shared.dto.FileObjectStorage_ToSearch_DTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FileObjectStore_FileType_Enum;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;

/**
 * 
 *
 */
public class Process_FileObjectStorage_Files_SaveAndAddToDB {

	private static final Logger log = LoggerFactory.getLogger( Process_FileObjectStorage_Files_SaveAndAddToDB.class );

	private Process_FileObjectStorage_Files_SaveAndAddToDB() { }
	public static Process_FileObjectStorage_Files_SaveAndAddToDB getInstance() { return new Process_FileObjectStorage_Files_SaveAndAddToDB(); }

	/**
	 * @param fileObjectStorage_FileContainer_AllEntries
	 * @throws Exception 
	 * @throws LimelightImporterFileObjectStorageServiceErrorException 
	 */
	public void process_FileObjectStorage_Files_SaveAndAddToDB( 
			
			Integer searchId,  //  null when NO Search like when only importing a scan file
			FileObjectStorage_FileContainer_AllEntries fileObjectStorage_FileContainer_AllEntries
			
			) throws LimelightImporterFileObjectStorageServiceErrorException, Exception {
		
		FileToYRCFileObjectStorageService_SendFile fileToYRCFileObjectStorageService_SendFile = FileToYRCFileObjectStorageService_SendFile.getNewInstance();
		
		FileToYRCFileObjectStorageService_Send_AWS_S3_Location fileToYRCFileObjectStorageService_Send_AWS_S3_Location = FileToYRCFileObjectStorageService_Send_AWS_S3_Location.getNewInstance();
		
		
		for ( FileObjectStorage_FileContainer fileObjectStorage_FileContainer : fileObjectStorage_FileContainer_AllEntries.get_FileObjectStorage_FileContainer_List() ) {
			
			try {
				boolean gzipCompressContents = false;

				if ( fileObjectStorage_FileContainer.getFileType_FileObjectStore_FileType() == FileObjectStore_FileType_Enum.FASTA_FILE_TYPE ) {

					gzipCompressContents = true;
				}
				
				FileToYRCFileObjectStorageService_SendFile__Result sendResult_SentTo_YRCFileObjectStorageService = null;
				
				if ( fileObjectStorage_FileContainer.getFile() != null ) {

					sendResult_SentTo_YRCFileObjectStorageService =
							fileToYRCFileObjectStorageService_SendFile.sendFileToYRCFileObjectStorageService(fileObjectStorage_FileContainer.getFile(), gzipCompressContents);
				
				} else if ( fileObjectStorage_FileContainer.getFileImportTrackingSingleFileDTO() != null ) {
					
					sendResult_SentTo_YRCFileObjectStorageService =
							fileToYRCFileObjectStorageService_Send_AWS_S3_Location.sendToYRCFileObjectStorageService(
									fileObjectStorage_FileContainer.getFileImportTrackingSingleFileDTO(), gzipCompressContents);
					
				} else {
					
					String msg = "fileObjectStorage_FileContainer.getFile() == null AND fileObjectStorage_FileContainer.getFileImportTrackingSingleFileDTO() == null";
					log.error(msg);
					throw new LimelightImporterInternalException(msg);
				}
				
				if ( sendResult_SentTo_YRCFileObjectStorageService.isNotConfigured() ) {
					//  NOT Configured so exit
					
					return; // EARLY RETURN
				}
				
				if ( StringUtils.isEmpty( sendResult_SentTo_YRCFileObjectStorageService.getApiKey_Assigned() ) ) {
					String msg = "sendResult.getApiKey_Assigned() is empty";
					log.error(msg);
					throw new LimelightImporterInternalException(msg);
				}
				
				{ //  FileTypeLookup - Ensure 'id' is in DB
					
					FileObjectStorage_MainEntry_FileTypeLookup_DAO_Importer daoInstance = FileObjectStorage_MainEntry_FileTypeLookup_DAO_Importer.getInstance();
					
					Integer idFromDB = daoInstance.getIdForId( fileObjectStorage_FileContainer.getFileType_FileObjectStore_FileType().value() );

					if ( idFromDB == null ) {
						FileObjectStorage_MainEntry_FileTypeLookup_DTO fileObjectStorage_MainEntry_FileTypeLookup_DTO = new FileObjectStorage_MainEntry_FileTypeLookup_DTO();
						fileObjectStorage_MainEntry_FileTypeLookup_DTO.setId( fileObjectStorage_FileContainer.getFileType_FileObjectStore_FileType().value() );
						fileObjectStorage_MainEntry_FileTypeLookup_DTO.setDescription( FileObjectStore_FileType_Enum.fileObjectStore_FileType_GetDescriptionString_ForEnumValue( fileObjectStorage_FileContainer.getFileType_FileObjectStore_FileType() ) );
						
						try {
							daoInstance.saveToDatabase(fileObjectStorage_MainEntry_FileTypeLookup_DTO, FileObjectStorage_MainEntry_FileTypeLookup_DAO_Importer.SkipLogInsertException.NO );
						} catch (Exception e) {

						}

						Integer idFromDB_AfterInsert = daoInstance.getIdForId( fileObjectStorage_FileContainer.getFileType_FileObjectStore_FileType().value() );

						if ( idFromDB_AfterInsert == null ) {

							//  Something in error in insert so do insert again with logging
							daoInstance.saveToDatabase(fileObjectStorage_MainEntry_FileTypeLookup_DTO, FileObjectStorage_MainEntry_FileTypeLookup_DAO_Importer.SkipLogInsertException.YES );
						}
					}
				}
				
				int fileObjectStorage_MainEntry_Id = 0;
				boolean fileObjectStorage_MainEntry_NewlyInserted = false;
				
				{  //  File Object Store - Main Entry - Ensure in DB for API Key 

					FileObjectStorage_MainEntry_DAO_Importer daoInstance = FileObjectStorage_MainEntry_DAO_Importer.getInstance();
					
					Integer idFromDB = daoInstance.get_Id_For_FileObjectStorageStorageAPIKey( sendResult_SentTo_YRCFileObjectStorageService.getApiKey_Assigned() );

					if ( idFromDB != null ) {
						fileObjectStorage_MainEntry_Id = idFromDB.intValue();
						
					} else {
						FileObjectStorage_MainEntry_DTO fileObjectStorage_MainEntry_DTO = new FileObjectStorage_MainEntry_DTO();
						fileObjectStorage_MainEntry_DTO.setFileObjectStorageStorageAPIKey( sendResult_SentTo_YRCFileObjectStorageService.getApiKey_Assigned() );
						fileObjectStorage_MainEntry_DTO.setFileTypeId( fileObjectStorage_FileContainer.getFileType_FileObjectStore_FileType().value() );
						
						try {
							daoInstance.saveToDatabase(fileObjectStorage_MainEntry_DTO, FileObjectStorage_MainEntry_DAO_Importer.SkipLogInsertException.NO );
						} catch (Exception e) {

						}

						Integer idFromDB_AfterInsert = daoInstance.get_Id_For_FileObjectStorageStorageAPIKey( sendResult_SentTo_YRCFileObjectStorageService.getApiKey_Assigned() );

						if ( idFromDB_AfterInsert != null ) {

							fileObjectStorage_MainEntry_Id = idFromDB_AfterInsert.intValue();
							
							fileObjectStorage_MainEntry_NewlyInserted = true;
							
						} else {

							//  Something in error in insert so do insert again with logging
							daoInstance.saveToDatabase(fileObjectStorage_MainEntry_DTO, FileObjectStorage_MainEntry_DAO_Importer.SkipLogInsertException.YES );
						}
					}
				}
				
				
				fileObjectStorage_FileContainer.setId_InDBTable_file_object_storage_main_entry_tbl( fileObjectStorage_MainEntry_Id );
				
				
				if ( searchId != null ) {   //  File Object Store - Main Entry to Search Id mapping
					
					FileObjectStorage_ToSearch_DTO fileObjectStorage_ToSearch_DTO = new FileObjectStorage_ToSearch_DTO();
					
					fileObjectStorage_ToSearch_DTO.setFileObjectStorage_MainEntry_Id( fileObjectStorage_MainEntry_Id );
					fileObjectStorage_ToSearch_DTO.setFilename_AtImport( fileObjectStorage_FileContainer.getFilename() );
					fileObjectStorage_ToSearch_DTO.setSearchId(searchId);
					
					FileObjectStorage_ToSearch_DAO_Importer.getInstance().saveToDatabase(fileObjectStorage_ToSearch_DTO);
				}
				
				if ( fileObjectStorage_MainEntry_NewlyInserted ) {

					//  File Object Store - Main Entry First Insert tracking entry

					FileObjectStorage_SourceFirstImport_DTO fileObjectStorage_SourceFirstImport_DTO = new FileObjectStorage_SourceFirstImport_DTO();

					fileObjectStorage_SourceFirstImport_DTO.setFileObjectStorage_MainEntry_Id( fileObjectStorage_MainEntry_Id );
					if ( searchId != null ) {
						fileObjectStorage_SourceFirstImport_DTO.setSearch_Id(searchId);
					}
					fileObjectStorage_SourceFirstImport_DTO.setFilenameAtImport( fileObjectStorage_FileContainer.getFilename() );
					
					if ( fileObjectStorage_FileContainer.getFile() != null ) {

						fileObjectStorage_SourceFirstImport_DTO.setFileSize( fileObjectStorage_FileContainer.getFile().length() );
						fileObjectStorage_SourceFirstImport_DTO.setSha1Sum( SHA1SumCalculator.getInstance().getSHA1Sum( fileObjectStorage_FileContainer.getFile() ) );
						fileObjectStorage_SourceFirstImport_DTO.setCanonicalFilename_W_Path_OnSubmitMachine( fileObjectStorage_FileContainer.getFile().getCanonicalPath() );
						fileObjectStorage_SourceFirstImport_DTO.setAbsoluteFilename_W_Path_OnSubmitMachine( fileObjectStorage_FileContainer.getFile().getAbsolutePath() );
					
					} else if ( fileObjectStorage_FileContainer.getFileImportTrackingSingleFileDTO() != null ) {
						
						S3Client amazonS3_Client = null;

						{  // Use Region from Config, otherwise SDK use from Environment Variable

							String amazonS3_RegionName = fileObjectStorage_FileContainer.getFileImportTrackingSingleFileDTO().getAws_s3_region();

							if ( StringUtils.isNotEmpty( amazonS3_RegionName ) ) {
										
								amazonS3_RegionName = ConfigSystemDAO_Importer.getInstance().getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_AWS_S3_REGION_KEY );
							}

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
								.bucket(fileObjectStorage_FileContainer.getFileImportTrackingSingleFileDTO().getAws_s3_bucket_name())
								.key( fileObjectStorage_FileContainer.getFileImportTrackingSingleFileDTO().getAws_s3_object_key() )
								.build();
						
						try ( ResponseInputStream<GetObjectResponse> getObjectResponse_UsableAsInputStream = amazonS3_Client.getObject(getObjectRequest) ) {

							GetObjectResponse getObjectResponse = getObjectResponse_UsableAsInputStream.response();
							
							if ( getObjectResponse.contentLength() != null ) {
								fileObjectStorage_SourceFirstImport_DTO.setFileSize( getObjectResponse.contentLength() );
							}

							String sha1Sum = SHA1SumCalculator.getInstance().getSHA1Sum_ForInputStream(getObjectResponse_UsableAsInputStream);
							
							fileObjectStorage_SourceFirstImport_DTO.setSha1Sum(sha1Sum);;
							
						} catch ( NoSuchKeyException e ) {
							
							//  Throw Data Exception if externally passed in object key and bucket name
							
							System.err.println( "Could not find S3 Object to send to File Object Storage.  ObjectKey: " 
									+ fileObjectStorage_FileContainer.getFileImportTrackingSingleFileDTO().getAws_s3_object_key() 
									+ ", Object Bucket: " 
									+ fileObjectStorage_FileContainer.getFileImportTrackingSingleFileDTO().getAws_s3_bucket_name() );
							throw new LimelightImporterErrorProcessingRunIdException(e);
						}
						
					} else {
						String msg = "fileObjectStorage_FileContainer.getFile() == null && fileObjectStorage_FileContainer.getFileImportTrackingSingleFileDTO() == null";
						log.error(msg);
						throw new LimelightImporterInternalException(msg);
					}
					
					FileObjectStorage_SourceFirstImport_DAO_Importer fileObjectStorage_SourceFirstImport_DAO_Importer  = FileObjectStorage_SourceFirstImport_DAO_Importer.getInstance();
					fileObjectStorage_SourceFirstImport_DAO_Importer.saveToDatabase(fileObjectStorage_SourceFirstImport_DTO);
				}
				
		
			} catch (Exception e) {
				
				String msg = "Failed to send File to File Object Storage.  File: " + fileObjectStorage_FileContainer.getFile();
				log.error(msg, e);
				throw e;
			}
			
		}
		
		
	}
}
