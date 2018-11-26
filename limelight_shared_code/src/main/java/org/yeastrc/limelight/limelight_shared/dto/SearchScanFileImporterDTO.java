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
package org.yeastrc.limelight.limelight_shared.dto;

/**
 * search_scan_file_importer_tbl table
 */
public class SearchScanFileImporterDTO {

	private int id;
	private int searchScanFileId;

	private long fileSize;
	
	private String sha1sum;

	private String canonicalFilename_W_Path_OnSubmitMachine;
	private String absoluteFilename_W_Path_OnSubmitMachine;
	
	private String awsBucketName;
	private String awsObjectKey;

	private String spectralStorageProcessKey;
	private String spectralStorageAPIKey;

	private Integer scanFileId;

	@Override
	public String toString() {
		return "SearchScanFileImporterDTO [id=" + id + ", searchScanFileId=" + searchScanFileId + ", fileSize="
				+ fileSize + ", sha1sum=" + sha1sum + ", canonicalFilename_W_Path_OnSubmitMachine="
				+ canonicalFilename_W_Path_OnSubmitMachine + ", absoluteFilename_W_Path_OnSubmitMachine="
				+ absoluteFilename_W_Path_OnSubmitMachine + ", awsBucketName=" + awsBucketName + ", awsObjectKey="
				+ awsObjectKey + ", spectralStorageProcessKey=" + spectralStorageProcessKey + ", spectralStorageAPIKey="
				+ spectralStorageAPIKey + ", scanFileId=" + scanFileId + "]";
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getSearchScanFileId() {
		return searchScanFileId;
	}

	public void setSearchScanFileId(int searchScanFileId) {
		this.searchScanFileId = searchScanFileId;
	}

	public long getFileSize() {
		return fileSize;
	}

	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}

	public String getSha1sum() {
		return sha1sum;
	}

	public void setSha1sum(String sha1sum) {
		this.sha1sum = sha1sum;
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

	public String getSpectralStorageProcessKey() {
		return spectralStorageProcessKey;
	}

	public void setSpectralStorageProcessKey(String spectralStorageProcessKey) {
		this.spectralStorageProcessKey = spectralStorageProcessKey;
	}

	public String getSpectralStorageAPIKey() {
		return spectralStorageAPIKey;
	}

	public void setSpectralStorageAPIKey(String spectralStorageAPIKey) {
		this.spectralStorageAPIKey = spectralStorageAPIKey;
	}

	public Integer getScanFileId() {
		return scanFileId;
	}

	public void setScanFileId(Integer scanFileId) {
		this.scanFileId = scanFileId;
	}

	public String getAwsBucketName() {
		return awsBucketName;
	}

	public void setAwsBucketName(String awsBucketName) {
		this.awsBucketName = awsBucketName;
	}

	public String getAwsObjectKey() {
		return awsObjectKey;
	}

	public void setAwsObjectKey(String awsObjectKey) {
		this.awsObjectKey = awsObjectKey;
	}

}

