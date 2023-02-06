package org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.security.MessageDigest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.FeatureDetection_OtherUploadedFile_LikeConf_DAO;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetection_OtherUploadedFile_LikeConf_DTO;

/**
 * Insert Upload Hardklor Conf File 
 *
 */
public class ImportFile_Hardklor_Conf_File {

	private static final Logger log = LoggerFactory.getLogger( ImportFile_Hardklor_Conf_File.class );

	private static final String SHA_384_ALGORITHM = "SHA-384";
	private static final String SHA_1_ALGORITHM = "SHA1";

	private static final int COPY_FILE_ARRAY_SIZE = 32 * 1024;

	private ImportFile_Hardklor_Conf_File() { }
	public static ImportFile_Hardklor_Conf_File getInstance() { return new ImportFile_Hardklor_Conf_File(); }

	public static class ImportFile_Hardklor_Conf_File__Params {
		
		int featureDetectionRootId;
		String limelight_InternalFilename;
		String filename_Uploaded;
		File fileToImport;
		int userId;
		
		public void setFeatureDetectionRootId(int featureDetectionRootId) {
			this.featureDetectionRootId = featureDetectionRootId;
		}
		public void setFilename_Uploaded(String filename_Uploaded) {
			this.filename_Uploaded = filename_Uploaded;
		}
		public void setFileToImport(File fileToImport) {
			this.fileToImport = fileToImport;
		}
		public void setUserId(int userId) {
			this.userId = userId;
		}
		public void setLimelight_InternalFilename(String limelight_InternalFilename) {
			this.limelight_InternalFilename = limelight_InternalFilename;
		}
	}
	
	
	/**
	 * @param params
	 * @throws Exception
	 */
	public void importFile_Hardklor_Conf_File(
			ImportFile_Hardklor_Conf_File__Params params
			) throws Exception {

		int featureDetectionRootId = params.featureDetectionRootId;
		String limelight_InternalFilename = params.limelight_InternalFilename;
		String filename_Uploaded = params.filename_Uploaded;
		File fileToImport = params.fileToImport;
		int userId = params.userId;
		
		int fileLength = (int) fileToImport.length();
		

		String sha1_Of_PostBody = null;
		String sha384_Of_PostBody = null;
		
		ByteArrayOutputStream postBody_As_ByteArrayOutputStream = new ByteArrayOutputStream( fileLength );
		int bytes_ReadFromStream__BytesPopulatedCount = 0;

		MessageDigest messageDigest_SHA_1_Of_PostBody = MessageDigest.getInstance(SHA_1_ALGORITHM);
		MessageDigest messageDigest_SHA_384_Of_PostBody = MessageDigest.getInstance(SHA_384_ALGORITHM);

		try ( InputStream fileInputStream = new BufferedInputStream( new FileInputStream( fileToImport ) ) ) {
			
			byte[] buf = new byte[ COPY_FILE_ARRAY_SIZE ];
			int len;
			while ((len = fileInputStream.read(buf)) > 0){

				postBody_As_ByteArrayOutputStream.write(buf, 0, len);
				bytes_ReadFromStream__BytesPopulatedCount += len;

				messageDigest_SHA_1_Of_PostBody.update(buf, 0, len);
				messageDigest_SHA_384_Of_PostBody.update(buf, 0, len);
			}
		}

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

		if ( bytes_ReadFromStream__BytesPopulatedCount != fileLength ) {

			String msg = "Failed to upload file, bytes read is not same as contentLength ";
			log.warn(msg);

			throw new LimelightImporterInternalException(msg);
		}
		
		byte[] fileContents = postBody_As_ByteArrayOutputStream.toByteArray();
	
		FeatureDetection_OtherUploadedFile_LikeConf_DTO featureDetection_OtherUploadedFile_LikeConf_DTO = new FeatureDetection_OtherUploadedFile_LikeConf_DTO();
		
		featureDetection_OtherUploadedFile_LikeConf_DTO.setFeatureDetectionRootId( featureDetectionRootId );
		
		featureDetection_OtherUploadedFile_LikeConf_DTO.setLimelight_InternalFilename( limelight_InternalFilename );
		
		featureDetection_OtherUploadedFile_LikeConf_DTO.setFileFullyInserted(true);
		featureDetection_OtherUploadedFile_LikeConf_DTO.setUploadedFilename(filename_Uploaded);
		featureDetection_OtherUploadedFile_LikeConf_DTO.setUploadedFileSize(fileLength);
		featureDetection_OtherUploadedFile_LikeConf_DTO.setUploadedFile_Sha1_Sum(sha1_Of_PostBody);
		featureDetection_OtherUploadedFile_LikeConf_DTO.setUploadedFile_Sha384_zero_in_second_digit(sha384_Of_PostBody);
		
		featureDetection_OtherUploadedFile_LikeConf_DTO.setFileContents(fileContents);

		featureDetection_OtherUploadedFile_LikeConf_DTO.setCreatedBy_UserId(userId);
		featureDetection_OtherUploadedFile_LikeConf_DTO.setUpdatedBy_UserId(userId);
		
		
		FeatureDetection_OtherUploadedFile_LikeConf_DAO.getInstance().save( featureDetection_OtherUploadedFile_LikeConf_DTO );

		
	}
	
	
}
