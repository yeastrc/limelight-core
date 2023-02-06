package org.yeastrc.limelight.limelight_shared.dto;

/**
 * table feature_detection_root_tbl
 *
 */
public class FeatureDetectionRootDTO {

	private int id;
	private int scanFileId;
	private boolean entryFullyInserted;
	private String featureDetectionTypeLabel;
	private int createdBy_UserId;
	private int updatedBy_UserId;
	
	//  created_date_time, updated_date_time auto populated by DB

	@Override
	public String toString() {
		return "FeatureDetectionRootDTO [id=" + id + ", scanFileId=" + scanFileId + ", entryFullyInserted="
				+ entryFullyInserted + ", featureDetectionTypeLabel=" + featureDetectionTypeLabel
				+ ", createdBy_UserId=" + createdBy_UserId + ", updatedBy_UserId=" + updatedBy_UserId + "]";
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getScanFileId() {
		return scanFileId;
	}
	public void setScanFileId(int scanFileId) {
		this.scanFileId = scanFileId;
	}
	public boolean isEntryFullyInserted() {
		return entryFullyInserted;
	}
	public void setEntryFullyInserted(boolean entryFullyInserted) {
		this.entryFullyInserted = entryFullyInserted;
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

	public String getFeatureDetectionTypeLabel() {
		return featureDetectionTypeLabel;
	}
	public void setFeatureDetectionTypeLabel(String featureDetectionTypeLabel) {
		this.featureDetectionTypeLabel = featureDetectionTypeLabel;
	}
}
