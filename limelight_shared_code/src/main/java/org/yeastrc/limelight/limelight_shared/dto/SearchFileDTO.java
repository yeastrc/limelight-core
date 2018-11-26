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

import java.util.Date;

import org.apache.commons.lang3.StringUtils;

/**
 * search_file_tbl table,  all but file_contents field
 */
public class SearchFileDTO {

	private int id;
	private int searchId;
	private int searchProgramsPerSearchId;

	private String displayFilename;

	private String filename;
	private String path;
	
	private long fileSize;
	private String mimeType;
	private String description;
	private Date uploadDate;
	

	
	
	@Override
	public String toString() {
		return "SearchFileDTO [id=" + id + ", searchId=" + searchId
				+ ", displayFilename=" + displayFilename + ", filename="
				+ filename + ", path=" + path + ", fileSize=" + fileSize
				+ ", mimeType=" + mimeType + ", description=" + description
				+ ", uploadDate=" + uploadDate + "]";
	}
	
	//  special getter
	
	public String getDisplayFilename() {
		
		if ( StringUtils.isNotEmpty( displayFilename ) ) {
			return displayFilename;
		}
		
		return filename;
	}
	
	public void setDisplayFilename(String displayFilename) {
		this.displayFilename = displayFilename;
	}

	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public long getFileSize() {
		return fileSize;
	}
	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}
	public String getMimeType() {
		return mimeType;
	}
	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Date getUploadDate() {
		return uploadDate;
	}
	public void setUploadDate(Date uploadDate) {
		this.uploadDate = uploadDate;
	}

	public int getSearchProgramsPerSearchId() {
		return searchProgramsPerSearchId;
	}

	public void setSearchProgramsPerSearchId(int searchProgramsPerSearchId) {
		this.searchProgramsPerSearchId = searchProgramsPerSearchId;
	}

	
}

