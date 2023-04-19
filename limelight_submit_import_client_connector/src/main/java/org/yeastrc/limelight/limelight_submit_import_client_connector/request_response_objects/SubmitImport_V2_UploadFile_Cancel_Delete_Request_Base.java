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
 * Request object for POST to Webservice Project_UploadData_V2_UploadFile_Cancel_Delete_RestWebserviceController
 * 
 * Passed in HTTP Header
 *
 */
@XmlRootElement(name="submitImport_V2_UploadFile_Cancel_Delete_Request_Base")
@XmlAccessorType(XmlAccessType.FIELD)
public class SubmitImport_V2_UploadFile_Cancel_Delete_Request_Base {

	// Properties as XML attributes

	@XmlAttribute
	private String uniqueRequestIdentifier_ForThisFile; // Random String Unique Identifier: Passed in the subsequent requests for this file

	@XmlAttribute
	private String projectIdentifier;
	@XmlAttribute
	private String uploadKey;
	@XmlAttribute
	private Integer fileIndex;

	//  Attributes only for submitting from a program
	@XmlAttribute
	private String userSubmitImportProgramKey;
	
	//  Needed to get the filename to delete
	@XmlAttribute
	private Integer fileType;
	@XmlAttribute
	private String filename;
	
	
	
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
	public String getUniqueRequestIdentifier_ForThisFile() {
		return uniqueRequestIdentifier_ForThisFile;
	}
	public void setUniqueRequestIdentifier_ForThisFile(String uniqueRequestIdentifier_ForThisFile) {
		this.uniqueRequestIdentifier_ForThisFile = uniqueRequestIdentifier_ForThisFile;
	}
	public String getUserSubmitImportProgramKey() {
		return userSubmitImportProgramKey;
	}
	public void setUserSubmitImportProgramKey(String userSubmitImportProgramKey) {
		this.userSubmitImportProgramKey = userSubmitImportProgramKey;
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
	
}
