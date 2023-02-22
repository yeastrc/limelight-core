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

import org.yeastrc.limelight.limelight_shared.enum_classes.FileObjectStore_FileType_Enum;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;

/**
 * 
 *
 */
public class FileObjectStorage_FileContainer {

	private File file;
	private String filename;
	
	private FileObjectStore_FileType_Enum fileType_FileObjectStore_FileType;
	
	/**
	 * Populated when running the Import from the Run Importer Process
	 */
	private FileImportTrackingSingleFileDTO fileImportTrackingSingleFileDTO;

	/**
	 * constructor
	 */
	public FileObjectStorage_FileContainer() {}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public FileObjectStore_FileType_Enum getFileType_FileObjectStore_FileType() {
		return fileType_FileObjectStore_FileType;
	}

	public void setFileType_FileObjectStore_FileType(FileObjectStore_FileType_Enum fileType_FileObjectStore_FileType) {
		this.fileType_FileObjectStore_FileType = fileType_FileObjectStore_FileType;
	}

	public FileImportTrackingSingleFileDTO getFileImportTrackingSingleFileDTO() {
		return fileImportTrackingSingleFileDTO;
	}

	public void setFileImportTrackingSingleFileDTO(FileImportTrackingSingleFileDTO fileImportTrackingSingleFileDTO) {
		this.fileImportTrackingSingleFileDTO = fileImportTrackingSingleFileDTO;
	}

}
