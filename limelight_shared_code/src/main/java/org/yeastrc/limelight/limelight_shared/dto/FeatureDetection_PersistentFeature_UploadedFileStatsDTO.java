package org.yeastrc.limelight.limelight_shared.dto;

/**
 * table feature_detection_persistent_feature_uploaded_file_stats_tbl
 *
 */
public class FeatureDetection_PersistentFeature_UploadedFileStatsDTO {

	private int id;
	private int featureDetectionRootId;
	private boolean fileFullyInserted;
	
	private String featuredetectionProgramName;
	private String featuredetectionProgramVersion;
	private Integer featuredetectionProgramPrimaryVersion;
	
	private String uploadedFilename;
	private int uploadedFileSize;
	private String uploadedFile_Sha1_Sum;
	private String uploadedFile_Sha384_zero_in_second_digit;
	private int createdBy_UserId;
	private int updatedBy_UserId;
	
	//  created_date_time, updated_date_time auto populated by DB
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUploadedFilename() {
		return uploadedFilename;
	}
	public void setUploadedFilename(String uploadedFilename) {
		this.uploadedFilename = uploadedFilename;
	}
	public int getUploadedFileSize() {
		return uploadedFileSize;
	}
	public void setUploadedFileSize(int uploadedFileSize) {
		this.uploadedFileSize = uploadedFileSize;
	}
	public String getUploadedFile_Sha1_Sum() {
		return uploadedFile_Sha1_Sum;
	}
	public void setUploadedFile_Sha1_Sum(String uploadedFile_Sha1_Sum) {
		this.uploadedFile_Sha1_Sum = uploadedFile_Sha1_Sum;
	}
	public int getCreatedBy_UserId() {
		return createdBy_UserId;
	}
	public void setCreatedBy_UserId(int createdBy_UserId) {
		this.createdBy_UserId = createdBy_UserId;
	}
	public int getUpdatedBy_UserId() {
		return updatedBy_UserId;
	}
	public void setUpdatedBy_UserId(int updatedBy_UserId) {
		this.updatedBy_UserId = updatedBy_UserId;
	}

	public String getUploadedFile_Sha384_zero_in_second_digit() {
		return uploadedFile_Sha384_zero_in_second_digit;
	}

	public void setUploadedFile_Sha384_zero_in_second_digit(String uploadedFile_Sha384_zero_in_second_digit) {
		this.uploadedFile_Sha384_zero_in_second_digit = uploadedFile_Sha384_zero_in_second_digit;
	}
	public int getFeatureDetectionRootId() {
		return featureDetectionRootId;
	}
	public void setFeatureDetectionRootId(int featureDetectionRootId) {
		this.featureDetectionRootId = featureDetectionRootId;
	}
	public boolean isFileFullyInserted() {
		return fileFullyInserted;
	}
	public void setFileFullyInserted(boolean fileFullyInserted) {
		this.fileFullyInserted = fileFullyInserted;
	}
	public String getFeaturedetectionProgramName() {
		return featuredetectionProgramName;
	}
	public void setFeaturedetectionProgramName(String featuredetectionProgramName) {
		this.featuredetectionProgramName = featuredetectionProgramName;
	}
	public String getFeaturedetectionProgramVersion() {
		return featuredetectionProgramVersion;
	}
	public void setFeaturedetectionProgramVersion(String featuredetectionProgramVersion) {
		this.featuredetectionProgramVersion = featuredetectionProgramVersion;
	}
	public Integer getFeaturedetectionProgramPrimaryVersion() {
		return featuredetectionProgramPrimaryVersion;
	}
	public void setFeaturedetectionProgramPrimaryVersion(Integer featuredetectionProgramPrimaryVersion) {
		this.featuredetectionProgramPrimaryVersion = featuredetectionProgramPrimaryVersion;
	}
}
