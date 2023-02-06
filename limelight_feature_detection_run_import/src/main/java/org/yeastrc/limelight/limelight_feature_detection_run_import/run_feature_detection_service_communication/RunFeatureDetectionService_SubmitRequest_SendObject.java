package org.yeastrc.limelight.limelight_feature_detection_run_import.run_feature_detection_service_communication;

/**
 * 
 *
 */
public class RunFeatureDetectionService_SubmitRequest_SendObject {

	int project_id;
	String spectr_file_id;
	String hardklor_conf;
	String bullseye_conf;
	   
	public int getProject_id() {
		return project_id;
	}
	public void setProject_id(int project_id) {
		this.project_id = project_id;
	}
	public String getSpectr_file_id() {
		return spectr_file_id;
	}
	public void setSpectr_file_id(String spectr_file_id) {
		this.spectr_file_id = spectr_file_id;
	}
	public String getHardklor_conf() {
		return hardklor_conf;
	}
	public void setHardklor_conf(String hardklor_conf) {
		this.hardklor_conf = hardklor_conf;
	}
	public String getBullseye_conf() {
		return bullseye_conf;
	}
	public void setBullseye_conf(String bullseye_conf) {
		this.bullseye_conf = bullseye_conf;
	}
	   
}
