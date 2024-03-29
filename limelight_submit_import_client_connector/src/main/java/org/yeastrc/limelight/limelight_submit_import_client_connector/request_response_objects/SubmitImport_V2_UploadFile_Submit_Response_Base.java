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
 * 'Base' Response object for POST to Webservice Project_UploadData_UploadFile_Submit_RestWebserviceController
 *
 */
@XmlRootElement(name="submitImport_V2_UploadFile_Submit_Response_Base")
@XmlAccessorType(XmlAccessType.FIELD)
public abstract class SubmitImport_V2_UploadFile_Submit_Response_Base extends BaseSubmitImportWebserviceResponse {

	//  Properties in the Base class this class extends
	
	// Properties as XML attributes

	@XmlAttribute
	private boolean uploadKeyNotValid;
	@XmlAttribute
	private boolean projectLocked;

	@XmlAttribute
	private boolean uniqueRequestIdentifier_ForThisFile_NotMatchInitializeValue;
	@XmlAttribute
	private boolean aws_S3_Config_Changed;  //  Restart upload this file or restart whole import submit
	
//	@XmlAttribute
//	private boolean dataFor_fileIndex_NOT_MatchDataIn_UploadSubmit;
	
	//  These are populated for FileSizeLimitExceededException exception
	@XmlAttribute
	private boolean fileSizeLimitExceeded;
	@XmlAttribute
	private long maxSize;
	@XmlAttribute
	private String maxSizeFormatted;
	
	@XmlAttribute
	private boolean scanFileNotAllowed;
	@XmlAttribute
	private boolean scanFilenameSuffixNotValid;
	
	public boolean isFileSizeLimitExceeded() {
		return fileSizeLimitExceeded;
	}
	public void setFileSizeLimitExceeded(boolean fileSizeLimitExceeded) {
		this.fileSizeLimitExceeded = fileSizeLimitExceeded;
	}
	public long getMaxSize() {
		return maxSize;
	}
	public void setMaxSize(long maxSize) {
		this.maxSize = maxSize;
	}
	public String getMaxSizeFormatted() {
		return maxSizeFormatted;
	}
	public void setMaxSizeFormatted(String maxSizeFormatted) {
		this.maxSizeFormatted = maxSizeFormatted;
	}
	public boolean isUploadKeyNotValid() {
		return uploadKeyNotValid;
	}
	public void setUploadKeyNotValid(boolean uploadKeyNotValid) {
		this.uploadKeyNotValid = uploadKeyNotValid;
	}
	public boolean isScanFileNotAllowed() {
		return scanFileNotAllowed;
	}
	public void setScanFileNotAllowed(boolean scanFileNotAllowed) {
		this.scanFileNotAllowed = scanFileNotAllowed;
	}
	public boolean isScanFilenameSuffixNotValid() {
		return scanFilenameSuffixNotValid;
	}
	public void setScanFilenameSuffixNotValid(boolean scanFilenameSuffixNotValid) {
		this.scanFilenameSuffixNotValid = scanFilenameSuffixNotValid;
	}
	public boolean isProjectLocked() {
		return projectLocked;
	}
	public void setProjectLocked(boolean projectLocked) {
		this.projectLocked = projectLocked;
	}
	public boolean isUniqueRequestIdentifier_ForThisFile_NotMatchInitializeValue() {
		return uniqueRequestIdentifier_ForThisFile_NotMatchInitializeValue;
	}
	public void setUniqueRequestIdentifier_ForThisFile_NotMatchInitializeValue(
			boolean uniqueRequestIdentifier_ForThisFile_NotMatchInitializeValue) {
		this.uniqueRequestIdentifier_ForThisFile_NotMatchInitializeValue = uniqueRequestIdentifier_ForThisFile_NotMatchInitializeValue;
	}
	public boolean isAws_S3_Config_Changed() {
		return aws_S3_Config_Changed;
	}
	public void setAws_S3_Config_Changed(boolean aws_S3_Config_Changed) {
		this.aws_S3_Config_Changed = aws_S3_Config_Changed;
	}
}
