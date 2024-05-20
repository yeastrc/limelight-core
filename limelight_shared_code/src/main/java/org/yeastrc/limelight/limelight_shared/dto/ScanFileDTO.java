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
 * table scan_file_tbl
 *
 */
public class ScanFileDTO {

	private int id;
	private String spectralStorageAPIKey;
	
	/**
	 * null if no related File Object Storage id
	 */
	private Integer fileObjectStorage_MainEntry_Id;
	
	//  hashCode and equals on spectralStorageAPIKey
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((spectralStorageAPIKey == null) ? 0 : spectralStorageAPIKey.hashCode());
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
		ScanFileDTO other = (ScanFileDTO) obj;
		if (spectralStorageAPIKey == null) {
			if (other.spectralStorageAPIKey != null)
				return false;
		} else if (!spectralStorageAPIKey.equals(other.spectralStorageAPIKey))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ScanFileDTO [id=" + id + ", spectralStorageAPIKey=" + spectralStorageAPIKey
				+ ", fileObjectStorage_MainEntry_Id=" + fileObjectStorage_MainEntry_Id + "]";
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSpectralStorageAPIKey() {
		return spectralStorageAPIKey;
	}
	public void setSpectralStorageAPIKey(String spectralStorageAPIKey) {
		this.spectralStorageAPIKey = spectralStorageAPIKey;
	}
	public Integer getFileObjectStorage_MainEntry_Id() {
		return fileObjectStorage_MainEntry_Id;
	}
	public void setFileObjectStorage_MainEntry_Id(Integer fileObjectStorage_MainEntry_Id) {
		this.fileObjectStorage_MainEntry_Id = fileObjectStorage_MainEntry_Id;
	}
}
