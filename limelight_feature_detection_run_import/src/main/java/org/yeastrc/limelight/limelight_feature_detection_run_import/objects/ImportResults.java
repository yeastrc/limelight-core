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
package org.yeastrc.limelight.limelight_feature_detection_run_import.objects;

import java.io.File;
import java.util.List;

/**
 * 
 *
 */
public class ImportResults {

	/**
	 * was import successful
	 */
	private boolean importSuccessStatus;
	

	/**
	 * was help requested
	 */
	private boolean helpRequestedStatus;
	
	
	/**
	 * suggested program exit code
	 */
	private int programExitCode;
	
	/**
	 * inserted search id
	 */
	private int searchId;
	
	private File importedLimelightXMLFile;
	
	private List<File> scanFileList;

	public boolean isImportSuccessStatus() {
		return importSuccessStatus;
	}

	public void setImportSuccessStatus(boolean importSuccessStatus) {
		this.importSuccessStatus = importSuccessStatus;
	}

	public boolean isHelpRequestedStatus() {
		return helpRequestedStatus;
	}

	public void setHelpRequestedStatus(boolean helpRequestedStatus) {
		this.helpRequestedStatus = helpRequestedStatus;
	}

	public int getProgramExitCode() {
		return programExitCode;
	}

	public void setProgramExitCode(int programExitCode) {
		this.programExitCode = programExitCode;
	}

	public int getSearchId() {
		return searchId;
	}

	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}

	public File getImportedLimelightXMLFile() {
		return importedLimelightXMLFile;
	}

	public void setImportedLimelightXMLFile(File importedLimelightXMLFile) {
		this.importedLimelightXMLFile = importedLimelightXMLFile;
	}

	public List<File> getScanFileList() {
		return scanFileList;
	}

	public void setScanFileList(List<File> scanFileList) {
		this.scanFileList = scanFileList;
	}
	

}
