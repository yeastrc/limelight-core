package org.yeastrc.limelight.limelight_shared.dto;

/**
 * table gold_standard_uploaded_file_contents_tbl
 *
 */
public class GoldStandard_UploadedFileContents_DTO {

	private int id;
	private int goldStandard_ForScanFile_Root_Id;
	
	private byte[] fileContents_GZIP;
	private int fileContents_JSON_VersionNumber;
	
	private int createdBy_UserId;
	private int updatedBy_UserId;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getGoldStandard_ForScanFile_Root_Id() {
		return goldStandard_ForScanFile_Root_Id;
	}
	public void setGoldStandard_ForScanFile_Root_Id(int goldStandard_ForScanFile_Root_Id) {
		this.goldStandard_ForScanFile_Root_Id = goldStandard_ForScanFile_Root_Id;
	}
	public byte[] getFileContents_GZIP() {
		return fileContents_GZIP;
	}
	public void setFileContents_GZIP(byte[] fileContents_GZIP) {
		this.fileContents_GZIP = fileContents_GZIP;
	}
	public int getFileContents_JSON_VersionNumber() {
		return fileContents_JSON_VersionNumber;
	}
	public void setFileContents_JSON_VersionNumber(int fileContents_JSON_VersionNumber) {
		this.fileContents_JSON_VersionNumber = fileContents_JSON_VersionNumber;
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
	
}
