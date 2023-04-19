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
package org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.ImportSingleFileUploadStatus;

/**
 * table  import_and_pipeline_run_tracking_single_file_tbl
 *
 */
public class FileImportAndPipelineRunTrackingSingleFileDTO {

	private int id;

	private int fileImportAndPipelineRunTracking_Id;
	
	private String unique_request_identifier_from_submitter;  // Value from Submitter
	
	private Integer fileIndex;  // null in old records.  the 'index' as tracked by submitter
	
	private int fileTypeId;  // for a specific import type.  
	
	private ImportSingleFileUploadStatus fileUploadStatus; 
	
	private String filenameInUpload;
	private String filenameOnDisk;
	
	private String filenameOnDiskWithPathSubSameMachine;

	private String canonicalFilename_W_Path_OnSubmitMachine;
	private String absoluteFilename_W_Path_OnSubmitMachine;
	
	private String aws_s3_bucket_name;
	private String aws_s3_object_key;
	private String aws_s3_region;
		
	private String sha1Sum;
	private Long fileSize;
	
	private boolean fileLocation_Or_AWS_S3_Object_ProvidedFrom_ExternalSystem;
	private boolean fileLocation_Or_AWS_S3_Object_From_ExternalSystem_DeleteAfterImport;

	@Override
	public String toString() {
		return "FileImportAndPipelineRunTrackingSingleFileDTO [id=" + id + ", fileImportAndPipelineRunTracking_Id="
				+ fileImportAndPipelineRunTracking_Id + ", unique_request_identifier_from_submitter="
				+ unique_request_identifier_from_submitter + ", fileIndex=" + fileIndex + ", fileTypeId=" + fileTypeId
				+ ", fileUploadStatus=" + fileUploadStatus + ", filenameInUpload=" + filenameInUpload
				+ ", filenameOnDisk=" + filenameOnDisk + ", filenameOnDiskWithPathSubSameMachine="
				+ filenameOnDiskWithPathSubSameMachine + ", canonicalFilename_W_Path_OnSubmitMachine="
				+ canonicalFilename_W_Path_OnSubmitMachine + ", absoluteFilename_W_Path_OnSubmitMachine="
				+ absoluteFilename_W_Path_OnSubmitMachine + ", aws_s3_bucket_name=" + aws_s3_bucket_name
				+ ", aws_s3_object_key=" + aws_s3_object_key + ", aws_s3_region=" + aws_s3_region + ", sha1Sum="
				+ sha1Sum + ", fileSize=" + fileSize + ", fileLocation_Or_AWS_S3_Object_ProvidedFrom_ExternalSystem="
				+ fileLocation_Or_AWS_S3_Object_ProvidedFrom_ExternalSystem
				+ ", fileLocation_Or_AWS_S3_Object_From_ExternalSystem_DeleteAfterImport="
				+ fileLocation_Or_AWS_S3_Object_From_ExternalSystem_DeleteAfterImport + "]";
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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

	public Integer getFileIndex() {
		return fileIndex;
	}

	public void setFileIndex(Integer fileIndex) {
		this.fileIndex = fileIndex;
	}

	public String getAws_s3_bucket_name() {
		return aws_s3_bucket_name;
	}

	public void setAws_s3_bucket_name(String aws_s3_bucket_name) {
		this.aws_s3_bucket_name = aws_s3_bucket_name;
	}

	public String getAws_s3_object_key() {
		return aws_s3_object_key;
	}

	public void setAws_s3_object_key(String aws_s3_object_key) {
		this.aws_s3_object_key = aws_s3_object_key;
	}

	public String getAws_s3_region() {
		return aws_s3_region;
	}

	public void setAws_s3_region(String aws_s3_region) {
		this.aws_s3_region = aws_s3_region;
	}

	public String getUnique_request_identifier_from_submitter() {
		return unique_request_identifier_from_submitter;
	}

	public void setUnique_request_identifier_from_submitter(String unique_request_identifier_from_submitter) {
		this.unique_request_identifier_from_submitter = unique_request_identifier_from_submitter;
	}

	public boolean isFileLocation_Or_AWS_S3_Object_ProvidedFrom_ExternalSystem() {
		return fileLocation_Or_AWS_S3_Object_ProvidedFrom_ExternalSystem;
	}

	public void setFileLocation_Or_AWS_S3_Object_ProvidedFrom_ExternalSystem(
			boolean fileLocation_Or_AWS_S3_Object_ProvidedFrom_ExternalSystem) {
		this.fileLocation_Or_AWS_S3_Object_ProvidedFrom_ExternalSystem = fileLocation_Or_AWS_S3_Object_ProvidedFrom_ExternalSystem;
	}

	public boolean isFileLocation_Or_AWS_S3_Object_From_ExternalSystem_DeleteAfterImport() {
		return fileLocation_Or_AWS_S3_Object_From_ExternalSystem_DeleteAfterImport;
	}

	public void setFileLocation_Or_AWS_S3_Object_From_ExternalSystem_DeleteAfterImport(
			boolean fileLocation_Or_AWS_S3_Object_From_ExternalSystem_DeleteAfterImport) {
		this.fileLocation_Or_AWS_S3_Object_From_ExternalSystem_DeleteAfterImport = fileLocation_Or_AWS_S3_Object_From_ExternalSystem_DeleteAfterImport;
	}
	public int getFileImportAndPipelineRunTracking_Id() {
		return fileImportAndPipelineRunTracking_Id;
	}
	public void setFileImportAndPipelineRunTracking_Id(int fileImportAndPipelineRunTracking_Id) {
		this.fileImportAndPipelineRunTracking_Id = fileImportAndPipelineRunTracking_Id;
	}
	public int getFileTypeId() {
		return fileTypeId;
	}
	public void setFileTypeId(int fileTypeId) {
		this.fileTypeId = fileTypeId;
	}
}
