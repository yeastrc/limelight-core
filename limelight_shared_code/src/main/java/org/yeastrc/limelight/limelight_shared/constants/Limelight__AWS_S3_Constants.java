package org.yeastrc.limelight.limelight_shared.constants;

public class Limelight__AWS_S3_Constants {

	
	//  Constants related to Storing File uploaded to AWS S3 for use by Importer (or Importer passes to other like Spectr or Object Storage)
	
	/**
	 * Min upload part number in call to AWS S3 SDK 'uploadPart' method.
	 * Does NOT apply to call to upload last part.
	 */
	public static final int AWS_S3_MULTIPART_UPLOAD_UPLOAD_PART__MINIMUM_PART_NUMBER = 1; 

	/**
	 * Max upload part number in call to AWS S3 SDK 'uploadPart' method.
	 * Does NOT apply to call to upload last part.
	 */
	public static final int AWS_S3_MULTIPART_UPLOAD_UPLOAD_PART__MAXIMUM_PART_NUMBER = 10000; 

	/**
	 * Min upload part size call to AWS S3 SDK 'uploadPart' method.
	 * Does NOT apply to call to upload last part.
	 */
	public static final long AWS_S3_MULTIPART_UPLOAD_UPLOAD_PART__MINIMUM_PUT_OBJECT_SIZE_EXCEPT_LAST_PUT = 5L * 1024L * 1024L; 

	/**
	 * Max upload size call to AWS S3 SDK 'putObject' method or 'uploadPart' method.
	 * 	
	 *  2023 03 27
	 *   "Upload an object in a single operation by using the AWS SDKs, REST API, or AWS CLI – With a single PUT operation, you can upload a single object up to 5 GB in size."
	 *       https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
	 */
	public static final long AWS_S3_MAXIMUM_PUT_OBJECT_OR_UPLOAD_PART_SIZE = 5L * 1024L * 1024L* 1024L ; 
	
	
}
