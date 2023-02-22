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
 * table file_object_storage_to_search_tbl
 *
 */
public class FileObjectStorage_ToSearch_DTO {

	private int id;
	private int fileObjectStorage_MainEntry_Id;
	private int searchId;
	private String filename_AtImport;

	@Override
	public String toString() {
		return "FileObjectStorage_ToSearch_DTO [id=" + id + ", fileObjectStorage_MainEntry_Id="
				+ fileObjectStorage_MainEntry_Id + ", searchId=" + searchId + ", filename_AtImport=" + filename_AtImport
				+ "]";
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
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public String getFilename_AtImport() {
		return filename_AtImport;
	}
	public void setFilename_AtImport(String filename_AtImport) {
		this.filename_AtImport = filename_AtImport;
	}
}
