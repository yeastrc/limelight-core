package org.yeastrc.limelight.limelight_shared.feature_detection_run_import_hardklor_bullseye.shared_objects;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * "Import" request.     Stored in DB:  import_and_pipeline_run_tracking_tbl.request_data
 *
 */
@XmlRootElement(name="featureDetection_HardklorBullseye_Import_RequestData_V001")
@XmlAccessorType(XmlAccessType.FIELD)
public class FeatureDetection_HardklorBullseye_Import_RequestData_V001 {


	public static final int VERSION_NUMBER = 1;

	
	// Properties as XML attributes

	@XmlAttribute
	private int projectId;

	@XmlAttribute
	private int projectScanFileId;  // Scan file to associate results with
	
	@XmlAttribute
	private String label;
	@XmlAttribute
	private String description;

	@XmlAttribute
	private String hardklor_ResultsFile_UploadedFilename;
	@XmlAttribute
	private String hardklor_ConfFile_UploadedFilename;
	@XmlAttribute
	private String bullseye_ResultsFile_UploadedFilename;

	@Override
	public String toString() {
		return "FeatureDetection_HardklorBullseye_Import_RequestData_V001 [projectId=" + projectId
				+ ", projectScanFileId=" + projectScanFileId + ", label=" + label + ", description=" + description
				+ ", hardklor_ResultsFile_UploadedFilename=" + hardklor_ResultsFile_UploadedFilename
				+ ", hardklor_ConfFile_UploadedFilename=" + hardklor_ConfFile_UploadedFilename
				+ ", bullseye_ResultsFile_UploadedFilename=" + bullseye_ResultsFile_UploadedFilename + "]";
	}
	
	public int getProjectId() {
		return projectId;
	}
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getHardklor_ResultsFile_UploadedFilename() {
		return hardklor_ResultsFile_UploadedFilename;
	}
	public void setHardklor_ResultsFile_UploadedFilename(String hardklor_ResultsFile_UploadedFilename) {
		this.hardklor_ResultsFile_UploadedFilename = hardklor_ResultsFile_UploadedFilename;
	}
	public String getHardklor_ConfFile_UploadedFilename() {
		return hardklor_ConfFile_UploadedFilename;
	}
	public void setHardklor_ConfFile_UploadedFilename(String hardklor_ConfFile_UploadedFilename) {
		this.hardklor_ConfFile_UploadedFilename = hardklor_ConfFile_UploadedFilename;
	}
	public String getBullseye_ResultsFile_UploadedFilename() {
		return bullseye_ResultsFile_UploadedFilename;
	}
	public void setBullseye_ResultsFile_UploadedFilename(String bullseye_ResultsFile_UploadedFilename) {
		this.bullseye_ResultsFile_UploadedFilename = bullseye_ResultsFile_UploadedFilename;
	}
	public int getProjectScanFileId() {
		return projectScanFileId;
	}
	public void setProjectScanFileId(int projectScanFileId) {
		this.projectScanFileId = projectScanFileId;
	}
	
}
