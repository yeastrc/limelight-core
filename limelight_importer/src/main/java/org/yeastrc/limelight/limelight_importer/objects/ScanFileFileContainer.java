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

import org.apache.commons.io.FilenameUtils;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;

/**
 * 
 *
 */
public class ScanFileFileContainer {

	private File scanFile;
	private String scanFilename;
	
	private String scanFilename_NoSuffix;  // Computed in setScanFile

	private String aws_s3_bucket_name;
	private String aws_s3_object_key;
	private String aws_s3_region;
		
	private String sha1Sum;
	private Long fileSize;

	/**
	 * Populated when running the Import from the Run Importer Process
	 */
	private FileImportTrackingSingleFileDTO scanFileDBRecord;
	
	/**
	 * Populate when stored in File Object Storage
	 */
	private FileObjectStorage_FileContainer fileObjectStorage_FileContainer;

	/**
	 * constructor
	 */
	public ScanFileFileContainer() {}
	

	public File getScanFile() {
		return scanFile;
	}

	public void setScanFile(File scanFile) {
		
		this.scanFile = scanFile;
	}

	/**
	 * 
	 * @return
	 */
	public String getScanFilename() {
		return scanFilename;
	}

	public void setScanFilename(String scanFilename) {
		
		this.scanFilename_NoSuffix = FilenameUtils.removeExtension( scanFilename );
		
		this.scanFilename = scanFilename;
	}

	public String getScanFilename_NoSuffix() {
		return scanFilename_NoSuffix;  //  Getter Only
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


	public String getSha1Sum() {
		return sha1Sum;
	}


	public void setSha1Sum(String sha1Sum) {
		this.sha1Sum = sha1Sum;
	}


	public Long getFileSize() {
		return fileSize;
	}


	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}


	public void setScanFilename_NoSuffix(String scanFilename_NoSuffix) {
		this.scanFilename_NoSuffix = scanFilename_NoSuffix;
	}


	public FileObjectStorage_FileContainer getFileObjectStorage_FileContainer() {
		return fileObjectStorage_FileContainer;
	}


	public void setFileObjectStorage_FileContainer(FileObjectStorage_FileContainer fileObjectStorage_FileContainer) {
		this.fileObjectStorage_FileContainer = fileObjectStorage_FileContainer;
	}


}
