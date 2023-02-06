package org.yeastrc.limelight.limelight_shared.dto;

/**
 * table feature_detection_persistent_feature_entry_tbl
 *
 */
public class FeatureDetectionPersistentFeatureEntryDTO {

	private int id;
	private int featureDetectionRootId;
	private int featureDetectionPersistentFeatureUploadedFileStatsId;
	
	private int charge;
	
	private double monoisotopicMass;
	
	private float retentionTimeRange_Start;
	private float retentionTimeRange_End;
	private float retentionTimeRange_Apex;
	
	private double abundance_RetentionTimeRange_Apex;
	private double abundance_Total;
	
	@Override
	public String toString() {
		return "FeatureDetectionPersistentFeatureEntryDTO [id=" + id + ", featureDetectionRootId="
				+ featureDetectionRootId + ", featureDetectionPersistentFeatureUploadedFileStatsId="
				+ featureDetectionPersistentFeatureUploadedFileStatsId + ", charge=" + charge + ", monoisotopicMass="
				+ monoisotopicMass + ", retentionTimeRange_Start=" + retentionTimeRange_Start
				+ ", retentionTimeRange_End=" + retentionTimeRange_End + ", retentionTimeRange_Apex="
				+ retentionTimeRange_Apex + ", abundance_RetentionTimeRange_Apex=" + abundance_RetentionTimeRange_Apex
				+ ", abundance_Total=" + abundance_Total + "]";
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getFeatureDetectionRootId() {
		return featureDetectionRootId;
	}
	public void setFeatureDetectionRootId(int featureDetectionRootId) {
		this.featureDetectionRootId = featureDetectionRootId;
	}
	public int getFeatureDetectionPersistentFeatureUploadedFileStatsId() {
		return featureDetectionPersistentFeatureUploadedFileStatsId;
	}
	public void setFeatureDetectionPersistentFeatureUploadedFileStatsId(
			int featureDetectionPersistentFeatureUploadedFileStatsId) {
		this.featureDetectionPersistentFeatureUploadedFileStatsId = featureDetectionPersistentFeatureUploadedFileStatsId;
	}
	public int getCharge() {
		return charge;
	}
	public void setCharge(int charge) {
		this.charge = charge;
	}
	public double getMonoisotopicMass() {
		return monoisotopicMass;
	}
	public void setMonoisotopicMass(double monoisotopicMass) {
		this.monoisotopicMass = monoisotopicMass;
	}
	public float getRetentionTimeRange_Start() {
		return retentionTimeRange_Start;
	}
	public void setRetentionTimeRange_Start(float retentionTimeRange_Start) {
		this.retentionTimeRange_Start = retentionTimeRange_Start;
	}
	public float getRetentionTimeRange_End() {
		return retentionTimeRange_End;
	}
	public void setRetentionTimeRange_End(float retentionTimeRange_End) {
		this.retentionTimeRange_End = retentionTimeRange_End;
	}
	public float getRetentionTimeRange_Apex() {
		return retentionTimeRange_Apex;
	}
	public void setRetentionTimeRange_Apex(float retentionTimeRange_Apex) {
		this.retentionTimeRange_Apex = retentionTimeRange_Apex;
	}
	public double getAbundance_RetentionTimeRange_Apex() {
		return abundance_RetentionTimeRange_Apex;
	}
	public void setAbundance_RetentionTimeRange_Apex(double abundance_RetentionTimeRange_Apex) {
		this.abundance_RetentionTimeRange_Apex = abundance_RetentionTimeRange_Apex;
	}
	public double getAbundance_Total() {
		return abundance_Total;
	}
	public void setAbundance_Total(double abundance_Total) {
		this.abundance_Total = abundance_Total;
	}
}
