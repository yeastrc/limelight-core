/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportFileType;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.ImportSingleFileUploadStatus;

/**
 * table  file_import_tracking_single_file_tbl
 *
 */
public class FileImportTrackingSingleFileDTO {

	private int id;

	private int fileImportTrackingId;
	
	private FileImportFileType fileType;
	private ImportSingleFileUploadStatus fileUploadStatus; 
	
	private String filenameInUpload;
	private String filenameOnDisk;
	
	private String filenameOnDiskWithPathSubSameMachine;

	private String canonicalFilename_W_Path_OnSubmitMachine;
	private String absoluteFilename_W_Path_OnSubmitMachine;
	
	private String sha1Sum;
	private Long fileSize;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public FileImportFileType getFileType() {
		return fileType;
	}
	public void setFileType(FileImportFileType fileType) {
		this.fileType = fileType;
	}
	public ImportSingleFileUploadStatus getFileUploadStatus() {
		return fileUploadStatus;
	}
	public void setFileUploadStatus(ImportSingleFileUploadStatus fileUploadStatus) {
		this.fileUploadStatus = fileUploadStatus;
	}
	public String getFilenameInUpload() {
		return filenameInUpload;
	}
	public void setFilenameInUpload(String filenameInUpload) {
		this.filenameInUpload = filenameInUpload;
	}
	public String getFilenameOnDisk() {
		return filenameOnDisk;
	}
	public void setFilenameOnDisk(String filenameOnDisk) {
		this.filenameOnDisk = filenameOnDisk;
	}
	public String getFilenameOnDiskWithPathSubSameMachine() {
		return filenameOnDiskWithPathSubSameMachine;
	}
	public void setFilenameOnDiskWithPathSubSameMachine(String filenameOnDiskWithPathSubSameMachine) {
		this.filenameOnDiskWithPathSubSameMachine = filenameOnDiskWithPathSubSameMachine;
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
	public String getSha1Sum() {
		return sha1Sum;
	}
	public void setSha1Sum(String sha1Sum) {
		this.sha1Sum = sha1Sum;
	}
	public Long getFileSize() {
		return fileSize;
	}
	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}
	public int getFileImportTrackingId() {
		return fileImportTrackingId;
	}
	public void setFileImportTrackingId(int fileImportTrackingId) {
		this.fileImportTrackingId = fileImportTrackingId;
	}
	
}
