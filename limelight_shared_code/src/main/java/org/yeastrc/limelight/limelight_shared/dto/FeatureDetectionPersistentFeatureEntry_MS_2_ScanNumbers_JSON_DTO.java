package org.yeastrc.limelight.limelight_shared.dto;

/**
 * table feature_detection_persistent_featr_enty_ms_2_scn_nmbrs_json_tbl
 *
 */
public class FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO {

	private int featureDetectionPersistentFeatureEntryId;
	
	private String ms_2_scan_numbers_json_array;

	@Override
	public String toString() {
		return "FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO [featureDetectionPersistentFeatureEntryId="
				+ featureDetectionPersistentFeatureEntryId + ", ms_2_scan_numbers_json_array="
				+ ms_2_scan_numbers_json_array + "]";
	}
	
	public int getFeatureDetectionPersistentFeatureEntryId() {
		return featureDetectionPersistentFeatureEntryId;
	}

	public void setFeatureDetectionPersistentFeatureEntryId(int featureDetectionPersistentFeatureEntryId) {
		this.featureDetectionPersistentFeatureEntryId = featureDetectionPersistentFeatureEntryId;
	}

	public String getMs_2_scan_numbers_json_array() {
		return ms_2_scan_numbers_json_array;
	}

	public void setMs_2_scan_numbers_json_array(String ms_2_scan_numbers_json_array) {
		this.ms_2_scan_numbers_json_array = ms_2_scan_numbers_json_array;
	}

}
