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
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.objects;

import javax.xml.bind.annotation.XmlRootElement;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportFileType;

/**
 * Contents of file LimelightXMLFileUploadWebConstants.UPLOAD_FILE_DATA_FILE_PREFIX
 *
 */
@XmlRootElement(name="LimelightUploadTempDataFileContents")
public class LimelightUploadTempDataFileContents {

	private String uploadedFilename;
	private String savedToDiskFilename;

	private String canonicalFilename_W_Path_OnSubmitMachine;
	private String absoluteFilename_W_Path_OnSubmitMachine;
	
	private FileImportFileType fileType;
	private int fileIndex;
	
	private String searchNameInFile;
	
	
	public String getUploadedFilename() {
		return uploadedFilename;
	}
	public void setUploadedFilename(String uploadedFilename) {
		this.uploadedFilename = uploadedFilename;
	}
	public String getSavedToDiskFilename() {
		return savedToDiskFilename;
	}
	public void setSavedToDiskFilename(String savedToDiskFilename) {
		this.savedToDiskFilename = savedToDiskFilename;
	}
	public FileImportFileType getFileType() {
		return fileType;
	}
	public void setFileType(FileImportFileType fileType) {
		this.fileType = fileType;
	}
	public int getFileIndex() {
		return fileIndex;
	}
	public void setFileIndex(int fileIndex) {
		this.fileIndex = fileIndex;
	}
	public String getSearchNameInFile() {
		return searchNameInFile;
	}
	public void setSearchNameInFile(String searchNameInFile) {
		this.searchNameInFile = searchNameInFile;
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
