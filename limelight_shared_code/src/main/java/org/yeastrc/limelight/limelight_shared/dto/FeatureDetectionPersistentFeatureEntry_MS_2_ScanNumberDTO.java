package org.yeastrc.limelight.limelight_shared.dto;

/**
 * table feature_detection_persistent_feature_entry_ms_2_scan_number_tbl
 *
 */
public class FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO {

	private int featureDetectionPersistentFeatureEntryId;
	
	private int ms_2_ScanNumber;


	@Override
	public String toString() {
		return "FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO [featureDetectionPersistentFeatureEntryId="
				+ featureDetectionPersistentFeatureEntryId + ", ms_2_ScanNumber=" + ms_2_ScanNumber + "]";
	}

	public int getFeatureDetectionPersistentFeatureEntryId() {
		return featureDetectionPersistentFeatureEntryId;
	}

	public void setFeatureDetectionPersistentFeatureEntryId(int featureDetectionPersistentFeatureEntryId) {
		this.featureDetectionPersistentFeatureEntryId = featureDetectionPersistentFeatureEntryId;
	}

	public int getMs_2_ScanNumber() {
		return ms_2_ScanNumber;
	}

	public void setMs_2_ScanNumber(int ms_2_ScanNumber) {
		this.ms_2_ScanNumber = ms_2_ScanNumber;
	}

}
