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
 * 'Base' Response object for POST to Webservice Project_UploadData_UploadFile_Initialize_RestWebserviceController
 *
 */
@XmlRootElement(name="submitImport_V2_UploadFile_Initialize_Response_Base")
@XmlAccessorType(XmlAccessType.FIELD)
public abstract class SubmitImport_V2_UploadFile_Initialize_Response_Base extends BaseSubmitImportWebserviceResponse {

	//  Properties in the Base class this class extends
	
	// Properties as XML attributes

	@XmlAttribute
	private boolean duplicateRecord_ForUploadKeyFileIndex;
	
	@XmlAttribute
	private boolean uploadKeyNotValid;
	@XmlAttribute
	private boolean projectLocked;
	
//	@XmlAttribute
//	private boolean dataFor_fileIndex_NOT_MatchDataIn_UploadInitialize;
	
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

	@XmlAttribute
	private long maxFileUploadChunkSize;  //  Populated when store on Local Disk.  Each uploaded chunk except last one MUST be a size
	
	@XmlAttribute
	private Long requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified;  //  Populated when store on S3.  Each uploaded chunk except last one MUST be this size
	
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
	public boolean isDuplicateRecord_ForUploadKeyFileIndex() {
		return duplicateRecord_ForUploadKeyFileIndex;
	}
	public void setDuplicateRecord_ForUploadKeyFileIndex(boolean duplicateRecord_ForUploadKeyFileIndex) {
		this.duplicateRecord_ForUploadKeyFileIndex = duplicateRecord_ForUploadKeyFileIndex;
	}
	public Long getRequiredChunkSize_ExceptLastChunk__NullWhenNotSpecified() {
		return requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified;
	}
	public void setRequiredChunkSize_ExceptLastChunk__NullWhenNotSpecified(
			Long requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified) {
		this.requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified = requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified;
	}
	public long getMaxFileUploadChunkSize() {
		return maxFileUploadChunkSize;
	}
	public void setMaxFileUploadChunkSize(long maxFileUploadChunkSize) {
		this.maxFileUploadChunkSize = maxFileUploadChunkSize;
	}
}
