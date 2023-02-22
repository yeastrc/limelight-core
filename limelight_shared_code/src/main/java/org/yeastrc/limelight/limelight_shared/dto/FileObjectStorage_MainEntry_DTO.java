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
 * table file_object_storage_main_entry_tbl
 *
 */
public class FileObjectStorage_MainEntry_DTO {

	private int id;
	private int fileTypeId;
	private String fileObjectStorageStorageAPIKey;
	
	//  hashCode and equals on fileObjectStorageStorageAPIKey
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((fileObjectStorageStorageAPIKey == null) ? 0 : fileObjectStorageStorageAPIKey.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		FileObjectStorage_MainEntry_DTO other = (FileObjectStorage_MainEntry_DTO) obj;
		if (fileObjectStorageStorageAPIKey == null) {
			if (other.fileObjectStorageStorageAPIKey != null)
				return false;
		} else if (!fileObjectStorageStorageAPIKey.equals(other.fileObjectStorageStorageAPIKey))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "FileObjectStorage_MainEntry_DTO [id=" + id + ", fileObjectStorageStorageAPIKey=" + fileObjectStorageStorageAPIKey + "]";
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFileObjectStorageStorageAPIKey() {
		return fileObjectStorageStorageAPIKey;
	}
	public void setFileObjectStorageStorageAPIKey(String fileObjectStorageStorageAPIKey) {
		this.fileObjectStorageStorageAPIKey = fileObjectStorageStorageAPIKey;
	}
	public int getFileTypeId() {
		return fileTypeId;
	}
	public void setFileTypeId(int fileTypeId) {
		this.fileTypeId = fileTypeId;
	}
}
