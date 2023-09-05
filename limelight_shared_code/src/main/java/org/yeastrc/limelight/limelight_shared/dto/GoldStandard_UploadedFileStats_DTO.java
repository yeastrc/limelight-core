package org.yeastrc.limelight.limelight_shared.dto;

/**
 * table gold_standard_uploaded_file_stats_tbl
 *
 */
public class GoldStandard_UploadedFileStats_DTO {

	private int id;
	private int goldStandard_ForScanFile_Root_Id;
	
	private String uploadedFilename;
	private int uploadedFileSize;
	private String uploadedFile_Sha1_Sum;
	private String uploadedFile_Sha384_zero_in_second_digit;
	private int createdBy_UserId;
	private int updatedBy_UserId;
	
	
	//  created_date_time, updated_date_time auto populated by DB

	@Override
	public String toString() {
		return "GoldStandard_UploadedFileStats_DTO [id=" + id + ", goldStandard_ForScanFile_Root_Id="
				+ goldStandard_ForScanFile_Root_Id + ", uploadedFilename=" + uploadedFilename
				+ ", uploadedFileSize=" + uploadedFileSize + ", uploadedFile_Sha1_Sum=" + uploadedFile_Sha1_Sum
				+ ", uploadedFile_Sha384_zero_in_second_digit=" + uploadedFile_Sha384_zero_in_second_digit
				+ ", createdBy_UserId=" + createdBy_UserId + ", updatedBy_UserId=" + updatedBy_UserId + "]";
	}
	
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
	public String getUploadedFile_Sha384_zero_in_second_digit() {
		return uploadedFile_Sha384_zero_in_second_digit;
	}
	public void setUploadedFile_Sha384_zero_in_second_digit(String uploadedFile_Sha384_zero_in_second_digit) {
		this.uploadedFile_Sha384_zero_in_second_digit = uploadedFile_Sha384_zero_in_second_digit;
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
