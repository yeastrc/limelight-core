package org.yeastrc.limelight.limelight_shared.dto;

/**
 * table gold_standard_for_scan_file_root__project_scnfl_mapping_tbl
 *
 */
public class GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DTO {

	private int id;
	private int goldStandard_ForScanFile_Root_Id;
	private int projectScanFileId;
	private String displayLabel;
	private String description;
	private int createdBy_UserId;
	private int updatedBy_UserId;
	
	
	//  created_date_time, updated_date_time auto populated by DB

	@Override
	public String toString() {
		return "GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DTO [id=" + id
				+ ", goldStandard_ForScanFile_Root_Id=" + goldStandard_ForScanFile_Root_Id + ", projectScanFileId="
				+ projectScanFileId + ", displayLabel=" + displayLabel + ", description=" + description
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
	public int getProjectScanFileId() {
		return projectScanFileId;
	}
	public void setProjectScanFileId(int projectScanFileId) {
		this.projectScanFileId = projectScanFileId;
	}
	public String getDisplayLabel() {
		return displayLabel;
	}
	public void setDisplayLabel(String displayLabel) {
		this.displayLabel = displayLabel;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
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
