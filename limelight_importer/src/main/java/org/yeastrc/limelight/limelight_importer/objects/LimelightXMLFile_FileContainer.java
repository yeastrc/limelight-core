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
public class LimelightXMLFile_FileContainer {

	private File limelightXMLFile; //  null if on S3
	private String filename;

	private String aws_s3_bucket_name;
	private String aws_s3_object_key;
	private String aws_s3_region;
		
	private long fileSize;

	/**
	 * Populated when running the Import from the Run Importer Process
	 */
	private FileImportTrackingSingleFileDTO fileImportTrackingSingleFileDTO;

	/**
	 * constructor
	 */
	public LimelightXMLFile_FileContainer() {}

	public File getLimelightXMLFile() {
		return limelightXMLFile;
	}

	public void setLimelightXMLFile(File limelightXMLFile) {
		this.limelightXMLFile = limelightXMLFile;
	}

	public String getAws_s3_bucket_name() {
		return aws_s3_bucket_name;
	}

	public void setAws_s3_bucket_name(String aws_s3_bucket_name) {
		this.aws_s3_bucket_name = aws_s3_bucket_name;
	}

	public String getAws_s3_object_key() {
		return aws_s3_object_key;
	}

	public void setAws_s3_object_key(String aws_s3_object_key) {
		this.aws_s3_object_key = aws_s3_object_key;
	}

	public String getAws_s3_region() {
		return aws_s3_region;
	}

	public void setAws_s3_region(String aws_s3_region) {
		this.aws_s3_region = aws_s3_region;
	}

	public FileImportTrackingSingleFileDTO getFileImportTrackingSingleFileDTO() {
		return fileImportTrackingSingleFileDTO;
	}

	public void setFileImportTrackingSingleFileDTO(FileImportTrackingSingleFileDTO fileImportTrackingSingleFileDTO) {
		this.fileImportTrackingSingleFileDTO = fileImportTrackingSingleFileDTO;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public long getFileSize() {
		return fileSize;
	}

	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}
	
}
