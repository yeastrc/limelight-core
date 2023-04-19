package org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto;

import java.util.List;

/**
 * 
 * When Serialized to JSON, stored in FileImportTrackingDataFromInitJSONBlob_DTO.jsonContents
 * 
 * Version 001
 * 
 * !!  NOT Populated when OLD Submit Import program is used !!
 *
 */
public class FileImportTrackingDataFromInitJSON_Contents_Version_Number_001 {

	public static final int VERSION_NUMBER_001 = 1;
	
	private boolean versionNumber_001 = true;  //  Fail deserialize if this member does not exist
	
	private List<FileImportTrackingDataFromInitJSON_Contents__SingleFileUploadEntry__Version_Number_001> singleFileUploadEntry_List; 
		
	//  Sub Classes
	
	public static class FileImportTrackingDataFromInitJSON_Contents__SingleFileUploadEntry__Version_Number_001 {

		
		private Integer fileIndex;
		
		private Integer fileType;
		
		private String filename;

		
		private Long uploadFileSize;
		
		//  Attributes only for submitting from a program
		
		private String canonicalFilename_W_Path_OnSubmitMachine;
		
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

	public boolean isVersionNumber_001() {
		return versionNumber_001;
	}

	public void setVersionNumber_001(boolean versionNumber_001) {
		this.versionNumber_001 = versionNumber_001;
	}

	public List<FileImportTrackingDataFromInitJSON_Contents__SingleFileUploadEntry__Version_Number_001> getSingleFileUploadEntry_List() {
		return singleFileUploadEntry_List;
	}

	public void setSingleFileUploadEntry_List(
			List<FileImportTrackingDataFromInitJSON_Contents__SingleFileUploadEntry__Version_Number_001> singleFileUploadEntry_List) {
		this.singleFileUploadEntry_List = singleFileUploadEntry_List;
	}

	public static int getVersionNumber001() {
		return VERSION_NUMBER_001;
	}

	
	//////////////////////////////
	//////////////////////////////
	
	//  Top level Getters and Setters

}


