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
package org.yeastrc.limelight.limelight_importer.objects;

import java.io.File;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;

/**
 * 
 *
 */
public class ScanFileFileContainer {

	private File scanFile;
	
	/**
	 * Populated when scan file specified on command line
	 */
	private String scanFilename;

	/**
	 * Populated when running the Import from the Run Importer Process
	 */
	private FileImportTrackingSingleFileDTO scanFileDBRecord;
	

	public File getScanFile() {
		return scanFile;
	}

	public void setScanFile(File scanFile) {
		this.scanFile = scanFile;
	}

	/**
	 * Populated when scan file specified on command line
	 * @return
	 */
	public String getScanFilename() {
		return scanFilename;
	}

	public void setScanFilename(String scanFilename) {
		this.scanFilename = scanFilename;
	}

	/**
	 * Populated when running the Import from the Run Importer Process
	 * @return
	 */
	public FileImportTrackingSingleFileDTO getScanFileDBRecord() {
		return scanFileDBRecord;
	}

	public void setScanFileDBRecord(FileImportTrackingSingleFileDTO scanFileDBRecord) {
		this.scanFileDBRecord = scanFileDBRecord;
	}


}
