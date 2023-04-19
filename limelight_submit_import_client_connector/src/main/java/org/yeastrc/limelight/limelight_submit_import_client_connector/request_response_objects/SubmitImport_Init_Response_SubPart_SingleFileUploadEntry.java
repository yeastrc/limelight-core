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
public class SubmitImport_Init_Response_SubPart_SingleFileUploadEntry {

	@XmlAttribute
	private int fileIndex; //  From the submission
	
	@XmlAttribute
	private int id; //  id in DB for this file.  Send in all uploads of this file

	@XmlAttribute
	private boolean fileRejected;

	@XmlAttribute
	private boolean fileRejected_TooLarge;
	
	@XmlAttribute
	private long fileSizeMax_Number;

	@XmlAttribute
	private String fileSizeMax_String;

	@XmlAttribute
	private boolean fileRejected_FilenameSuffixNotAccepted;

	public int getFileIndex() {
		return fileIndex;
	}

	public void setFileIndex(int fileIndex) {
		this.fileIndex = fileIndex;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public boolean isFileRejected() {
		return fileRejected;
	}

	public void setFileRejected(boolean fileRejected) {
		this.fileRejected = fileRejected;
	}

	public boolean isFileRejected_TooLarge() {
		return fileRejected_TooLarge;
	}

	public void setFileRejected_TooLarge(boolean fileRejected_TooLarge) {
		this.fileRejected_TooLarge = fileRejected_TooLarge;
	}

	public long getFileSizeMax_Number() {
		return fileSizeMax_Number;
	}

	public void setFileSizeMax_Number(long fileSizeMax_Number) {
		this.fileSizeMax_Number = fileSizeMax_Number;
	}

	public String getFileSizeMax_String() {
		return fileSizeMax_String;
	}

	public void setFileSizeMax_String(String fileSizeMax_String) {
		this.fileSizeMax_String = fileSizeMax_String;
	}

	public boolean isFileRejected_FilenameSuffixNotAccepted() {
		return fileRejected_FilenameSuffixNotAccepted;
	}

	public void setFileRejected_FilenameSuffixNotAccepted(boolean fileRejected_FilenameSuffixNotAccepted) {
		this.fileRejected_FilenameSuffixNotAccepted = fileRejected_FilenameSuffixNotAccepted;
	}
	
	
}
