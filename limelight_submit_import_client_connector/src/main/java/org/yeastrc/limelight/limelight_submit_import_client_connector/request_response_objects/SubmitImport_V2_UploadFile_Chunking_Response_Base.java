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
 * 'Base' Response object for POST to Webservice Project_UploadData_V2_UploadFile_Chunking_Upload_File_RestWebserviceController
 *
 */
@XmlRootElement(name="submitImport_V2_UploadFile_Chunking_Response_Base")
@XmlAccessorType(XmlAccessType.FIELD)
public abstract class SubmitImport_V2_UploadFile_Chunking_Response_Base extends BaseSubmitImportWebserviceResponse {

	// Properties as XML attributes

	//  These are populated for FileSizeLimitExceededException exception
	@XmlAttribute
	private boolean fileSizeLimitExceeded;
	@XmlAttribute
	private long maxSize;
	@XmlAttribute
	private String maxSizeFormatted;
	@XmlAttribute
	private boolean uploadFile_fieldNameInvalid;
	@XmlAttribute
	private boolean moreThanOneuploadedFile;
	@XmlAttribute
	private boolean filenameInFormNotMatchFilenameInQueryString;
	@XmlAttribute
	private boolean noUploadedFile;
	@XmlAttribute
	private boolean uploadKeyNotValid;
	@XmlAttribute
	private boolean uniqueRequestIdentifier_ForThisFile_NotMatchInitializeValue;
	@XmlAttribute
	private boolean aws_S3_Config_Changed;  //  Restart upload this file or restart whole import submit
	@XmlAttribute
	private boolean limelightXMLFileFailsInitialParse;
	@XmlAttribute
	private boolean limelightXMLFilerootXMLNodeIncorrect;
	@XmlAttribute
	private Boolean fastaFile_InvalidContents;
	@XmlAttribute
	private boolean scanFileNotAllowed;
	@XmlAttribute
	private boolean scanFilenameSuffixNotValid;
	@XmlAttribute
	private boolean scanFileFailsInitialParse;
	@XmlAttribute
	private boolean scanFilerootXMLNodeIncorrect;
	@XmlAttribute
	private boolean projectLocked;
	
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
	public boolean isUploadFile_fieldNameInvalid() {
		return uploadFile_fieldNameInvalid;
	}
	public void setUploadFile_fieldNameInvalid(boolean uploadFile_fieldNameInvalid) {
		this.uploadFile_fieldNameInvalid = uploadFile_fieldNameInvalid;
	}
	public boolean isMoreThanOneuploadedFile() {
		return moreThanOneuploadedFile;
	}
	public void setMoreThanOneuploadedFile(boolean moreThanOneuploadedFile) {
		this.moreThanOneuploadedFile = moreThanOneuploadedFile;
	}
	public boolean isFilenameInFormNotMatchFilenameInQueryString() {
		return filenameInFormNotMatchFilenameInQueryString;
	}
	public void setFilenameInFormNotMatchFilenameInQueryString(boolean filenameInFormNotMatchFilenameInQueryString) {
		this.filenameInFormNotMatchFilenameInQueryString = filenameInFormNotMatchFilenameInQueryString;
	}
	public boolean isNoUploadedFile() {
		return noUploadedFile;
	}
	public void setNoUploadedFile(boolean noUploadedFile) {
		this.noUploadedFile = noUploadedFile;
	}
	public boolean isUploadKeyNotValid() {
		return uploadKeyNotValid;
	}
	public void setUploadKeyNotValid(boolean uploadKeyNotValid) {
		this.uploadKeyNotValid = uploadKeyNotValid;
	}
	public boolean isLimelightXMLFileFailsInitialParse() {
		return limelightXMLFileFailsInitialParse;
	}
	public void setLimelightXMLFileFailsInitialParse(boolean limelightXMLFileFailsInitialParse) {
		this.limelightXMLFileFailsInitialParse = limelightXMLFileFailsInitialParse;
	}
	public boolean isLimelightXMLFilerootXMLNodeIncorrect() {
		return limelightXMLFilerootXMLNodeIncorrect;
	}
	public void setLimelightXMLFilerootXMLNodeIncorrect(boolean limelightXMLFilerootXMLNodeIncorrect) {
		this.limelightXMLFilerootXMLNodeIncorrect = limelightXMLFilerootXMLNodeIncorrect;
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
	public boolean isScanFileFailsInitialParse() {
		return scanFileFailsInitialParse;
	}
	public void setScanFileFailsInitialParse(boolean scanFileFailsInitialParse) {
		this.scanFileFailsInitialParse = scanFileFailsInitialParse;
	}
	public boolean isScanFilerootXMLNodeIncorrect() {
		return scanFilerootXMLNodeIncorrect;
	}
	public void setScanFilerootXMLNodeIncorrect(boolean scanFilerootXMLNodeIncorrect) {
		this.scanFilerootXMLNodeIncorrect = scanFilerootXMLNodeIncorrect;
	}
	public boolean isProjectLocked() {
		return projectLocked;
	}
	public void setProjectLocked(boolean projectLocked) {
		this.projectLocked = projectLocked;
	}
	public Boolean getFastaFile_InvalidContents() {
		return fastaFile_InvalidContents;
	}
	public void setFastaFile_InvalidContents(Boolean fastaFile_InvalidContents) {
		this.fastaFile_InvalidContents = fastaFile_InvalidContents;
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
