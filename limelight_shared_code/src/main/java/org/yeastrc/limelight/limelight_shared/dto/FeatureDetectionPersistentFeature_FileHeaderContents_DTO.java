package org.yeastrc.limelight.limelight_shared.dto;

/**
 * table feature_detection_persistent_feature_file_header_contents_tbl
 *
 */
public class FeatureDetectionPersistentFeature_FileHeaderContents_DTO {

	private int featureDetectionPersistentFeatureUploadedFileStatsId;
	
	private String fileHeaderContents;

	@Override
	public String toString() {
		return "FeatureDetectionPersistentFeature_FileHeaderContents_DTO [featureDetectionPersistentFeatureUploadedFileStatsId="
				+ featureDetectionPersistentFeatureUploadedFileStatsId + ", fileHeaderContents=" + fileHeaderContents
				+ "]";
	}

	public String getFileHeaderContents() {
		return fileHeaderContents;
	}
	public void setFileHeaderContents(String fileHeaderContents) {
		this.fileHeaderContents = fileHeaderContents;
	}
	public int getFeatureDetectionPersistentFeatureUploadedFileStatsId() {
		return featureDetectionPersistentFeatureUploadedFileStatsId;
	}
	public void setFeatureDetectionPersistentFeatureUploadedFileStatsId(
			int featureDetectionPersistentFeatureUploadedFileStatsId) {
		this.featureDetectionPersistentFeatureUploadedFileStatsId = featureDetectionPersistentFeatureUploadedFileStatsId;
	}

}
