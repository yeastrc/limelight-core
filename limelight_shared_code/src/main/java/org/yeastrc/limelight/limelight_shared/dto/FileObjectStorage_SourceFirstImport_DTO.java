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
 * table file_object_storage_source_first_import_tbl
 *
 */
public class FileObjectStorage_SourceFirstImport_DTO {

	private int id;
	private int fileObjectStorage_MainEntry_Id;
	private int search_Id;
	private String filenameAtImport;
	
	private long fileSize;
	private String sha1Sum;
	
	private String canonicalFilename_W_Path_OnSubmitMachine;
	private String absoluteFilename_W_Path_OnSubmitMachine;
	
	private String aws_S3_BucketName;
	private String aws_S3_ObjectKey;

	@Override
	public String toString() {
		return "FileObjectStorage_SourceFirstImport_DTO [id=" + id + ", fileObjectStorage_MainEntry_Id="
				+ fileObjectStorage_MainEntry_Id + ", search_Id=" + search_Id + ", filenameAtImport=" + filenameAtImport
				+ ", fileSize=" + fileSize + ", sha1Sum=" + sha1Sum + ", canonicalFilename_W_Path_OnSubmitMachine="
				+ canonicalFilename_W_Path_OnSubmitMachine + ", absoluteFilename_W_Path_OnSubmitMachine="
				+ absoluteFilename_W_Path_OnSubmitMachine + ", aws_S3_BucketName=" + aws_S3_BucketName
				+ ", aws_S3_ObjectKey=" + aws_S3_ObjectKey + "]";
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getFileObjectStorage_MainEntry_Id() {
		return fileObjectStorage_MainEntry_Id;
	}
	public void setFileObjectStorage_MainEntry_Id(int fileObjectStorage_MainEntry_Id) {
		this.fileObjectStorage_MainEntry_Id = fileObjectStorage_MainEntry_Id;
	}
	public int getSearch_Id() {
		return search_Id;
	}
	public void setSearch_Id(int search_Id) {
		this.search_Id = search_Id;
	}
	public String getFilenameAtImport() {
		return filenameAtImport;
	}
	public void setFilenameAtImport(String filenameAtImport) {
		this.filenameAtImport = filenameAtImport;
	}
	public long getFileSize() {
		return fileSize;
	}
	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}
	public String getSha1Sum() {
		return sha1Sum;
	}
	public void setSha1Sum(String sha1Sum) {
		this.sha1Sum = sha1Sum;
	}
	public String getAws_S3_BucketName() {
		return aws_S3_BucketName;
	}
	public void setAws_S3_BucketName(String aws_S3_BucketName) {
		this.aws_S3_BucketName = aws_S3_BucketName;
	}
	public String getAws_S3_ObjectKey() {
		return aws_S3_ObjectKey;
	}
	public void setAws_S3_ObjectKey(String aws_S3_ObjectKey) {
		this.aws_S3_ObjectKey = aws_S3_ObjectKey;
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
