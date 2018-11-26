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

/**
 * 
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class SubmitImport_FinalSubmit_SingleFileItem {

	@XmlAttribute
	private String uploadedFilename;
	@XmlAttribute
	private Integer fileType;
	@XmlAttribute
	private Integer fileIndex;
	@XmlAttribute
	private Boolean isLimelightXMLFile;

	/**
	 * Following is only for submitting on same machine
	 */
	@XmlAttribute
	private String filenameOnDiskWithPathSubSameMachine;
	
	public String getUploadedFilename() {
		return uploadedFilename;
	}
	public void setUploadedFilename(String uploadedFilename) {
		this.uploadedFilename = uploadedFilename;
	}
	public Integer getFileType() {
		return fileType;
	}
	public void setFileType(Integer fileType) {
		this.fileType = fileType;
	}
	public Integer getFileIndex() {
		return fileIndex;
	}
	public void setFileIndex(Integer fileIndex) {
		this.fileIndex = fileIndex;
	}
	public Boolean getIsLimelightXMLFile() {
		return isLimelightXMLFile;
	}
	public void setIsLimelightXMLFile(Boolean isLimelightXMLFile) {
		this.isLimelightXMLFile = isLimelightXMLFile;
	}
	public String getFilenameOnDiskWithPathSubSameMachine() {
		return filenameOnDiskWithPathSubSameMachine;
	}
	public void setFilenameOnDiskWithPathSubSameMachine(String filenameOnDiskWithPathSubSameMachine) {
		this.filenameOnDiskWithPathSubSameMachine = filenameOnDiskWithPathSubSameMachine;
	}
}
