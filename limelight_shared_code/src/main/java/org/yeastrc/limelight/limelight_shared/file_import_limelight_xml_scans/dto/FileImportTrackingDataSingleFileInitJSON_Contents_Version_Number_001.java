package org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto;

/**
 * 
 * When Serialized to JSON, stored in FileImportTrackingDataSingleFileInitJSONBlob_DTO.jsonContents
 * 
 * Version 001
 * 
 *
 */
public class FileImportTrackingDataSingleFileInitJSON_Contents_Version_Number_001 {

	public static final int VERSION_NUMBER_001 = 1;
	
	private boolean versionNumber_001 = true;  //  Fail deserialize if this member does not exist

	//  Populated when writing to AWS S3:

	private Long requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified;

	private String uploadId_S3Client_MultipartUpload;
	
	//  Already stored in main Single File table:

	private Integer fileIndex;

	private Integer fileType;

	private String filename;


	private Long uploadFileSize;

	//  Attributes only for submitting from a program

	private String canonicalFilename_W_Path_OnSubmitMachine;

	private String absoluteFilename_W_Path_OnSubmitMachine;

	public Integer getFileIndex() {
		return fileIndex;
	}

	public void setFileIndex(Integer fileIndex) {
		this.fileIndex = fileIndex;
	}

	public Integer getFileType() {
		return fileType;
	}

	public void setFileType(Integer fileType) {
		this.fileType = fileType;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public Long getUploadFileSize() {
		return uploadFileSize;
	}

	public void setUploadFileSize(Long uploadFileSize) {
		this.uploadFileSize = uploadFileSize;
	}

	public String getCanonicalFilename_W_Path_OnSubmitMachine() {
		return canonicalFilename_W_Path_OnSubmitMachine;
	}

	public void setCanonicalFilename_W_Path_OnSubmitMachine(String canonicalFilename_W_Path_OnSubmitMachine) {
		this.canonicalFilename_W_Path_OnSubmitMachine = canonicalFilename_W_Path_OnSubmitMachine;
	}

	public String getAbsoluteFilename_W_Path_OnSubmitMachine() {
		return absoluteFilename_W_Path_OnSubmitMachine;
	}

	public void setAbsoluteFilename_W_Path_OnSubmitMachine(String absoluteFilename_W_Path_OnSubmitMachine) {
		this.absoluteFilename_W_Path_OnSubmitMachine = absoluteFilename_W_Path_OnSubmitMachine;
	}

	public boolean isVersionNumber_001() {
		return versionNumber_001;
	}

	public void setVersionNumber_001(boolean versionNumber_001) {
		this.versionNumber_001 = versionNumber_001;
	}

	public static int getVersionNumber001() {
		return VERSION_NUMBER_001;
	}

	public Long getRequiredChunkSize_ExceptLastChunk__NullWhenNotSpecified() {
		return requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified;
	}

	public void setRequiredChunkSize_ExceptLastChunk__NullWhenNotSpecified(
			Long requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified) {
		this.requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified = requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified;
	}

	public String getUploadId_S3Client_MultipartUpload() {
		return uploadId_S3Client_MultipartUpload;
	}

	public void setUploadId_S3Client_MultipartUpload(String uploadId_S3Client_MultipartUpload) {
		this.uploadId_S3Client_MultipartUpload = uploadId_S3Client_MultipartUpload;
	}

	
	//////////////////////////////
	//////////////////////////////
	
	//  Top level Getters and Setters

}


