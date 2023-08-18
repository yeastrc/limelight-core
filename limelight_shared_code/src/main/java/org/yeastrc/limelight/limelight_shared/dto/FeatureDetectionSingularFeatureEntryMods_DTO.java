package org.yeastrc.limelight.limelight_shared.dto;


/**
 * table feature_detection_singular_feature_entry_tbl
 *
 */
public class FeatureDetectionSingularFeatureEntryMods_DTO {

	private int id;
	private int FeatureDetectionSingularFeatureEntryId;
	private String modificationField;
	
	@Override
	public String toString() {
		return "FeatureDetectionSingularFeatureEntryMods_DTO [id=" + id + ", FeatureDetectionSingularFeatureEntryId="
				+ FeatureDetectionSingularFeatureEntryId + ", modificationField=" + modificationField + "]";
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getFeatureDetectionSingularFeatureEntryId() {
		return FeatureDetectionSingularFeatureEntryId;
	}
	public void setFeatureDetectionSingularFeatureEntryId(int featureDetectionSingularFeatureEntryId) {
		FeatureDetectionSingularFeatureEntryId = featureDetectionSingularFeatureEntryId;
	}
	public String getModificationField() {
		return modificationField;
	}
	public void setModificationField(String modificationField) {
		this.modificationField = modificationField;
	}
	
}
