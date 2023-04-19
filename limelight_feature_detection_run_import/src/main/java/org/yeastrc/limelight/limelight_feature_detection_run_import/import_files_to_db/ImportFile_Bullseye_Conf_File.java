package org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.MessageDigest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.FeatureDetection_OtherUploadedFile_LikeConf_DAO;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.ConfigSystemDAO_Importer;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetection_OtherUploadedFile_LikeConf_DTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingSingleFileDTO;

import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;

/**
 * Insert Upload Bullseye Conf File - Fake Conf file for local Bullseye/Bullseye Pipeline run
 *
 */
public class ImportFile_Bullseye_Conf_File {

	private static final Logger log = LoggerFactory.getLogger( ImportFile_Bullseye_Conf_File.class );

	private static final String SHA_384_ALGORITHM = "SHA-384";
	private static final String SHA_1_ALGORITHM = "SHA1";

	private ImportFile_Bullseye_Conf_File() { }
	public static ImportFile_Bullseye_Conf_File getInstance() { return new ImportFile_Bullseye_Conf_File(); }

	public static class ImportFile_Bullseye_Conf_File__Params {
		
		int featureDetectionRootId;
		String limelight_InternalFilename;
		String filename_Uploaded;
		FileImportAndPipelineRunTrackingSingleFileDTO fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Conf;
		byte[] bullseyeConfFile_Contents_ByteArray__Param;
		int userId;
		
		public void setFeatureDetectionRootId(int featureDetectionRootId) {
			this.featureDetectionRootId = featureDetectionRootId;
		}
		public void setFilename_Uploaded(String filename_Uploaded) {
			this.filename_Uploaded = filename_Uploaded;
		}
		public void setUserId(int userId) {
			this.userId = userId;
		}
		public void setLimelight_InternalFilename(String limelight_InternalFilename) {
			this.limelight_InternalFilename = limelight_InternalFilename;
		}
		public void setFileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Conf(
				FileImportAndPipelineRunTrackingSingleFileDTO fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Conf) {
			this.fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Conf = fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Conf;
		}
		public void setBullseyeConfFile_Contents_ByteArray__Param(byte[] bullseyeConfFile_Contents_ByteArray__Param) {
			this.bullseyeConfFile_Contents_ByteArray__Param = bullseyeConfFile_Contents_ByteArray__Param;
		}
	}
	
	
	/**
	 * @param params
	 * @throws Exception
	 */
	public void importFile_Bullseye_Conf_File(
			ImportFile_Bullseye_Conf_File__Params params
			) throws Exception {

		int featureDetectionRootId = params.featureDetectionRootId;
		String limelight_InternalFilename = params.limelight_InternalFilename;
		String filename_Uploaded = params.filename_Uploaded;
		FileImportAndPipelineRunTrackingSingleFileDTO fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Conf = params.fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Conf;
		byte[] bullseyeConfFile_Contents_ByteArray__Param = params.bullseyeConfFile_Contents_ByteArray__Param;
		int userId = params.userId;
		
		
		String sha1_Of_PostBody = null;
		String sha384_Of_PostBody = null;


		byte[] bullseyeConfFile_Contents_ByteArray = null;
		
		if ( bullseyeConfFile_Contents_ByteArray__Param != null ) {
			
			bullseyeConfFile_Contents_ByteArray = bullseyeConfFile_Contents_ByteArray__Param;
		
		} else if ( fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Conf != null ) {
			
			bullseyeConfFile_Contents_ByteArray = get_FileContentsLocalFile_OR_AWS_S3_Object_Contents_ReturnAsByteArray(fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Conf);
		} else {
			bullseyeConfFile_Contents_ByteArray = get_FileContentsLocalFile_ReturnAsByteArray( limelight_InternalFilename );
		}

		MessageDigest messageDigest_SHA_1_Of_PostBody = MessageDigest.getInstance(SHA_1_ALGORITHM);
		MessageDigest messageDigest_SHA_384_Of_PostBody = MessageDigest.getInstance(SHA_384_ALGORITHM);

		messageDigest_SHA_1_Of_PostBody.update(bullseyeConfFile_Contents_ByteArray);
		messageDigest_SHA_384_Of_PostBody.update(bullseyeConfFile_Contents_ByteArray);

		{  // sha1_Of_PostBody
			byte[] mdbytes = messageDigest_SHA_1_Of_PostBody.digest();

			//convert the byte to hex format
			StringBuffer sb = new StringBuffer("");
			for (int i = 0; i < mdbytes.length; i++) {
				sb.append(Integer.toString((mdbytes[i] & 0xff) + 0x100, 16).substring(1));
			}

			sha1_Of_PostBody = sb.toString();
		}

		{  // sha384_Of_PostBody
			byte[] hashBytes = messageDigest_SHA_384_Of_PostBody.digest();

			StringBuilder hashBytesAsHexSB = new StringBuilder( hashBytes.length * 2 + 2 );

			for ( int i = 0; i < hashBytes.length; i++ ) {
				String byteAsHex = Integer.toHexString( Byte.toUnsignedInt( hashBytes[ i ] ) );
				if ( byteAsHex.length() == 1 ) {
					hashBytesAsHexSB.append( "0" ); //  Leading zero dropped by 'toHexString' so add here
				}
				hashBytesAsHexSB.append( byteAsHex );
			}

			sha384_Of_PostBody = hashBytesAsHexSB.toString();

			//  WAS - which is equivalent, except for the added "0" when a hex pair starts with "0"

			//				//convert the byte to hex format
			//				StringBuffer sb = new StringBuffer("");
			//				for (int i = 0; i < mdbytes.length; i++) {
			//					sb.append(Integer.toString((mdbytes[i] & 0xff) + 0x100, 16).substring(1));
			//				}
			//
			//				sha384_Of_PostBody = sb.toString();
		}

		FeatureDetection_OtherUploadedFile_LikeConf_DTO featureDetection_OtherUploadedFile_LikeConf_DTO = new FeatureDetection_OtherUploadedFile_LikeConf_DTO();
		
		featureDetection_OtherUploadedFile_LikeConf_DTO.setFeatureDetectionRootId( featureDetectionRootId );
		
		featureDetection_OtherUploadedFile_LikeConf_DTO.setLimelight_InternalFilename( limelight_InternalFilename );
		
		featureDetection_OtherUploadedFile_LikeConf_DTO.setFileFullyInserted(true);
		featureDetection_OtherUploadedFile_LikeConf_DTO.setUploadedFilename(filename_Uploaded);
		featureDetection_OtherUploadedFile_LikeConf_DTO.setUploadedFileSize(bullseyeConfFile_Contents_ByteArray.length);
		featureDetection_OtherUploadedFile_LikeConf_DTO.setUploadedFile_Sha1_Sum(sha1_Of_PostBody);
		featureDetection_OtherUploadedFile_LikeConf_DTO.setUploadedFile_Sha384_zero_in_second_digit(sha384_Of_PostBody);
		
		featureDetection_OtherUploadedFile_LikeConf_DTO.setFileContents(bullseyeConfFile_Contents_ByteArray);

		featureDetection_OtherUploadedFile_LikeConf_DTO.setCreatedBy_UserId(userId);
		featureDetection_OtherUploadedFile_LikeConf_DTO.setUpdatedBy_UserId(userId);
		
		
		FeatureDetection_OtherUploadedFile_LikeConf_DAO.getInstance().save( featureDetection_OtherUploadedFile_LikeConf_DTO );

		
	}

	/**
	 * @param fileImportAndPipelineRunTrackingSingleFileDTO
	 * @return
	 * @throws IOException
	 * @throws Exception 
	 */
	private byte[] get_FileContentsLocalFile_OR_AWS_S3_Object_Contents_ReturnAsByteArray( FileImportAndPipelineRunTrackingSingleFileDTO fileImportAndPipelineRunTrackingSingleFileDTO) throws IOException, Exception {
		
		if ( StringUtils.isNotEmpty( fileImportAndPipelineRunTrackingSingleFileDTO.getFilenameOnDisk() ) ) {
			
			return get_FileContentsLocalFile_ReturnAsByteArray( fileImportAndPipelineRunTrackingSingleFileDTO.getFilenameOnDisk() ) ;
		}
		
		if ( StringUtils.isNotEmpty( fileImportAndPipelineRunTrackingSingleFileDTO.getAws_s3_bucket_name() ) ) {
			
			//  Not a local file.  Get from AWS S3

			S3Client amazonS3_Client = null;

			{  // Use Region from fileImportAndPipelineRunTrackingSingleFileDTO, otherwise Config, otherwise SDK use from Environment Variable

				String amazonS3_RegionName = fileImportAndPipelineRunTrackingSingleFileDTO.getAws_s3_region();

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
					.bucket(fileImportAndPipelineRunTrackingSingleFileDTO.getAws_s3_bucket_name())
					.key( fileImportAndPipelineRunTrackingSingleFileDTO.getAws_s3_object_key() )
					.build();
			try {
				byte[] confFile_Contents_ByteArray = amazonS3_Client.getObjectAsBytes(getObjectRequest).asByteArray();

				return confFile_Contents_ByteArray;
				
			} catch ( NoSuchKeyException e ) {

				//  Throw Data Exception if externally passed in object key and bucket name

				System.err.println( "Could not find S3 Object.  ObjectKey: " 
						+ fileImportAndPipelineRunTrackingSingleFileDTO.getAws_s3_object_key() 
						+ ", Object Bucket: " 
						+ fileImportAndPipelineRunTrackingSingleFileDTO.getAws_s3_bucket_name() );
				throw new LimelightImporterInternalException(e);
			}

		}
		
		String msg = "fileImportAndPipelineRunTrackingSingleFileDTO.getFilenameOnDisk() AND fileImportAndPipelineRunTrackingSingleFileDTO.getAws_s3_bucket_name() are BOTH Empty";
		log.error(msg);
		throw new LimelightImporterInternalException(msg);
	}


	/**
	 * @param filename
	 * @return
	 * @throws IOException 
	 */
	private byte[] get_FileContentsLocalFile_ReturnAsByteArray( String filename ) throws IOException {

		File confFile = new File( filename );  //  Load from directory the program runs in

		Path confFile_Path = confFile.toPath();

		byte[] confFile_Contents_ByteArray = Files.readAllBytes(confFile_Path);

		return confFile_Contents_ByteArray;
	}
	
}
