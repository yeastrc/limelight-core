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
package org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Request object for POST to Webservice Project_UploadData_UploadFile_Initialize_RestWebserviceController
 * 
 * Passed in HTTP Header
 *
 */
@XmlRootElement(name="submitImport_V2_UploadFile_Initialize_Request_Base")
@XmlAccessorType(XmlAccessType.FIELD)
public class SubmitImport_V2_UploadFile_Initialize_Request_Base {

	// Properties as XML attributes

	@XmlAttribute
	private String uniqueRequestIdentifier_ForThisFile; // Random String Unique Identifier: Passed in the subsequent requests for this file

	@XmlAttribute
	private String projectIdentifier;
	@XmlAttribute
	private String uploadKey;
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
	private String userSubmitImportProgramKey;
	@XmlAttribute
	private String canonicalFilename_W_Path_OnSubmitMachine;
	@XmlAttribute
	private String absoluteFilename_W_Path_OnSubmitMachine;
	
	
	public String getProjectIdentifier() {
		return projectIdentifier;
	}
	public void setProjectIdentifier(String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}
	public String getUploadKey() {
		return uploadKey;
	}
	public void setUploadKey(String uploadKey) {
		this.uploadKey = uploadKey;
	}
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
	public String getUserSubmitImportProgramKey() {
		return userSubmitImportProgramKey;
	}
	public void setUserSubmitImportProgramKey(String userSubmitImportProgramKey) {
		this.userSubmitImportProgramKey = userSubmitImportProgramKey;
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
	public String getUniqueRequestIdentifier_ForThisFile() {
		return uniqueRequestIdentifier_ForThisFile;
	}
	public void setUniqueRequestIdentifier_ForThisFile(String uniqueRequestIdentifier_ForThisFile) {
		this.uniqueRequestIdentifier_ForThisFile = uniqueRequestIdentifier_ForThisFile;
	}
	
}
