package org.yeastrc.limelight.limelight_run_importer.import_files__delete_s3_objects_for_db_single_file_records;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.ConfigSystemDAO_Importer;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.FileImportTrackingSingleFileDAO__Importer_RunImporter;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;

import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;

/**
 * For FileImporTrackingId to delete, process the 'Single File' records and delete all S3 objects
 *
 */
public class ImportFiles_Delete_S3Objects_For_DB_SingleFile_Records {

	private static final Logger log = LoggerFactory.getLogger( ImportFiles_Delete_S3Objects_For_DB_SingleFile_Records.class );
	
	private ImportFiles_Delete_S3Objects_For_DB_SingleFile_Records() { }
	public static ImportFiles_Delete_S3Objects_For_DB_SingleFile_Records getInstance() { return new ImportFiles_Delete_S3Objects_For_DB_SingleFile_Records(); }
	
	/**
	 * @param fileImportTrackingId
	 * @throws Exception 
	 */
	public void delete_S3Objects_For_DB_SingleFile_Records( int fileImportTrackingId ) throws Exception {

		///  Get the Limelight XML file and Scan files
		List<FileImportTrackingSingleFileDTO> fileDBRecordList = 
				FileImportTrackingSingleFileDAO__Importer_RunImporter.getInstance()
				.getForTrackingId( fileImportTrackingId );
		
		List<FileImportTrackingSingleFileDTO> fileDBRecord_On_S3_List = new ArrayList<>( fileDBRecordList.size() );
		
		for ( FileImportTrackingSingleFileDTO fileDBRecord : fileDBRecordList ) {
			if ( StringUtils.isNotEmpty( fileDBRecord.getAws_s3_object_key() ) && StringUtils.isNotEmpty( fileDBRecord.getAws_s3_bucket_name() ) ) {
				fileDBRecord_On_S3_List.add(fileDBRecord);
			}
		}
		
		if ( ! fileDBRecord_On_S3_List.isEmpty() ) {
			//  Delete objects from S3
			
			for ( FileImportTrackingSingleFileDTO fileDBRecord_On_S3 : fileDBRecord_On_S3_List ) {
				
				if ( fileDBRecord_On_S3.isFileLocation_Or_AWS_S3_Object_ProvidedFrom_ExternalSystem() 
						&& ( ! fileDBRecord_On_S3.isFileLocation_Or_AWS_S3_Object_From_ExternalSystem_DeleteAfterImport() ) ) {
					
					//  From External System AND Flag to NOT delete after import (success or fail) so SKIP
					
					continue; // EARLY CONTINUE
				}

				S3Client amazonS3_Client = null;

				{  // Use Region from Config, otherwise SDK use from Environment Variable

					String amazonS3_RegionName = fileDBRecord_On_S3.getAws_s3_region();

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

				DeleteObjectRequest deleteObjectRequest = 
						DeleteObjectRequest
						.builder()
						.bucket( fileDBRecord_On_S3.getAws_s3_bucket_name())
						.key( fileDBRecord_On_S3.getAws_s3_object_key() )
						.build();
				
				amazonS3_Client.deleteObject(deleteObjectRequest);
			}
		}
	}
}
