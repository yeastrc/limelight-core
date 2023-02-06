package org.yeastrc.limelight.limelight_shared.dto;


/**
 * table feature_detection_singular_feature_entry_tbl
 *
 */
public class FeatureDetectionSingularFeatureEntryDTO {

	private int id;
	private int featureDetectionRootId;
	private int featureDetectionSingularFeatureUploadedFileStatsId;
	
	private int ms_1_scanNumber;
	
	private Integer charge;
	
	private Double monoisotopicMass;
	private Double intensity;
	private Double base_isotope_peak;
	private Double analysis_window_start_m_z;
	private Double analysis_window_end_m_z;

	private Double correlation_score;
	
	@Override
	public String toString() {
		return "FeatureDetectionSingularFeatureEntryDTO [id=" + id + ", featureDetectionRootId="
				+ featureDetectionRootId + ", featureDetectionSingularFeatureUploadedFileStatsId="
				+ featureDetectionSingularFeatureUploadedFileStatsId + ", ms_1_scanNumber=" + ms_1_scanNumber
				+ ", charge=" + charge + ", monoisotopicMass=" + monoisotopicMass + ", intensity=" + intensity
				+ ", base_isotope_peak=" + base_isotope_peak + ", analysis_window_start_m_z="
				+ analysis_window_start_m_z + ", analysis_window_end_m_z=" + analysis_window_end_m_z
				+ ", correlation_score=" + correlation_score + "]";
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
	public int getMs_1_scanNumber() {
		return ms_1_scanNumber;
	}
	public void setMs_1_scanNumber(int ms_1_scanNumber) {
		this.ms_1_scanNumber = ms_1_scanNumber;
	}
	public Integer getCharge() {
		return charge;
	}
	public void setCharge(Integer charge) {
		this.charge = charge;
	}
	public Double getMonoisotopicMass() {
		return monoisotopicMass;
	}
	public void setMonoisotopicMass(Double monoisotopicMass) {
		this.monoisotopicMass = monoisotopicMass;
	}
	public Double getIntensity() {
		return intensity;
	}
	public void setIntensity(Double intensity) {
		this.intensity = intensity;
	}
	public Double getBase_isotope_peak() {
		return base_isotope_peak;
	}
	public void setBase_isotope_peak(Double base_isotope_peak) {
		this.base_isotope_peak = base_isotope_peak;
	}
	public Double getAnalysis_window_start_m_z() {
		return analysis_window_start_m_z;
	}
	public void setAnalysis_window_start_m_z(Double analysis_window_start_m_z) {
		this.analysis_window_start_m_z = analysis_window_start_m_z;
	}
	public Double getAnalysis_window_end_m_z() {
		return analysis_window_end_m_z;
	}
	public void setAnalysis_window_end_m_z(Double analysis_window_end_m_z) {
		this.analysis_window_end_m_z = analysis_window_end_m_z;
	}
	public Double getCorrelation_score() {
		return correlation_score;
	}
	public void setCorrelation_score(Double correlation_score) {
		this.correlation_score = correlation_score;
	}

	public int getFeatureDetectionSingularFeatureUploadedFileStatsId() {
		return featureDetectionSingularFeatureUploadedFileStatsId;
	}

	public void setFeatureDetectionSingularFeatureUploadedFileStatsId(
			int featureDetectionSingularFeatureUploadedFileStatsId) {
		this.featureDetectionSingularFeatureUploadedFileStatsId = featureDetectionSingularFeatureUploadedFileStatsId;
	}
}
