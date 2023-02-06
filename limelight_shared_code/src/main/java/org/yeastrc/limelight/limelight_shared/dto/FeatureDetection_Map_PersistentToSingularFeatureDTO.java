package org.yeastrc.limelight.limelight_shared.dto;

/**
 * table feature_detection_map_persistnt_to_snglr_feature_tbl
 *
 */
public class FeatureDetection_Map_PersistentToSingularFeatureDTO {

	private int featureDetection_PersistentFeatureEntryId;
	private int featureDetection_SingularFeatureEntryId;
	private int featureDetectionRootId;
	
	public int getFeatureDetection_PersistentFeatureEntryId() {
		return featureDetection_PersistentFeatureEntryId;
	}
	public void setFeatureDetection_PersistentFeatureEntryId(int featureDetection_PersistentFeatureEntryId) {
		this.featureDetection_PersistentFeatureEntryId = featureDetection_PersistentFeatureEntryId;
	}
	public int getFeatureDetection_SingularFeatureEntryId() {
		return featureDetection_SingularFeatureEntryId;
	}
	public void setFeatureDetection_SingularFeatureEntryId(int featureDetection_SingularFeatureEntryId) {
		this.featureDetection_SingularFeatureEntryId = featureDetection_SingularFeatureEntryId;
	}
	public int getFeatureDetectionRootId() {
		return featureDetectionRootId;
	}
	public void setFeatureDetectionRootId(int featureDetectionRootId) {
		this.featureDetectionRootId = featureDetectionRootId;
	}
}
