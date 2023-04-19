package org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;

/**
 * Submit Import - Init Webservice call -- NOT populated in OLD Submit Import program versions
 * 
 * Single File Upload Entry
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class SubmitImport_Init_Request_SubPart_SingleFileUploadEntry {

	@XmlAttribute
	private Integer fileIndex;
	@XmlAttribute
	private Integer fileType;
	@XmlAttribute
	private String filename;

	@XmlAttribute
	private Long uploadFileSize;
	
	//  Attributes only for submitting from a program
	@XmlAttribute
	private String canonicalFilename_W_Path_OnSubmitMachine;
	@XmlAttribute
	private String absoluteFilename_W_Path_OnSubmitMachine;
	
	public Integer getFileIndex() {
		return fileIndex;
	}
	public void setFileIndex(Integer fileIndex) {
		this.fileIndex = fileIndex;
	}
	public Integer getFileType() {
		return fileType;
	}
	public void setFileType(Integer fileType) {
		this.fileType = fileType;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public Long getUploadFileSize() {
		return uploadFileSize;
	}
	public void setUploadFileSize(Long uploadFileSize) {
		this.uploadFileSize = uploadFileSize;
	}
	public String getCanonicalFilename_W_Path_OnSubmitMachine() {
		return canonicalFilename_W_Path_OnSubmitMachine;
	}
	public void setCanonicalFilename_W_Path_OnSubmitMachine(String canonicalFilename_W_Path_OnSubmitMachine) {
		this.canonicalFilename_W_Path_OnSubmitMachine = canonicalFilename_W_Path_OnSubmitMachine;
	}
	public String getAbsoluteFilename_W_Path_OnSubmitMachine() {
		return absoluteFilename_W_Path_OnSubmitMachine;
	}
	public void setAbsoluteFilename_W_Path_OnSubmitMachine(String absoluteFilename_W_Path_OnSubmitMachine) {
		this.absoluteFilename_W_Path_OnSubmitMachine = absoluteFilename_W_Path_OnSubmitMachine;
	}
}
