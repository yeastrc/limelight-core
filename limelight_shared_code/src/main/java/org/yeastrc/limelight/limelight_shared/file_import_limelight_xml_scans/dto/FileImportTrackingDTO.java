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
package org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto;

import java.util.Date;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;

/**
 * table file_import_tracking_tbl
 *
 */
public class FileImportTrackingDTO {

	private int id;
	private int projectId;
	private int priority;
	private int userId;
	private FileImportStatus status;
	
	private String remoteUserIpAddress;
	private boolean markedForDeletion;
	private String searchName;
	private String searchShortName;
	private String searchPath;
	private String insertRequestURL;
	
	private Date recordInsertDateTime;
	private Date importStartDateTime;
	private Date importEndDateTime;
	private Date lastUpdatedDateTime;

	private Integer deletedByUserId;
	private Date deletedDateTime;
	
	@Override
	public String toString() {
		return "FileImportTrackingDTO [id=" + id + ", projectId=" + projectId + ", priority=" + priority + ", userId="
				+ userId + ", status=" + status + ", remoteUserIpAddress=" + remoteUserIpAddress
				+ ", markedForDeletion=" + markedForDeletion + ", searchName=" + searchName + ", searchShortName="
				+ searchShortName + ", searchPath=" + searchPath + ", insertRequestURL=" + insertRequestURL
				+ ", recordInsertDateTime=" + recordInsertDateTime + ", importStartDateTime=" + importStartDateTime
				+ ", importEndDateTime=" + importEndDateTime + ", lastUpdatedDateTime=" + lastUpdatedDateTime
				+ ", deletedByUserId=" + deletedByUserId + ", deletedDateTime=" + deletedDateTime + "]";
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getProjectId() {
		return projectId;
	}
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
	public int getPriority() {
		return priority;
	}
	public void setPriority(int priority) {
		this.priority = priority;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public FileImportStatus getStatus() {
		return status;
	}
	public void setStatus(FileImportStatus status) {
		this.status = status;
	}
	public String getRemoteUserIpAddress() {
		return remoteUserIpAddress;
	}
	public void setRemoteUserIpAddress(String remoteUserIpAddress) {
		this.remoteUserIpAddress = remoteUserIpAddress;
	}
	public boolean isMarkedForDeletion() {
		return markedForDeletion;
	}
	public void setMarkedForDeletion(boolean markedForDeletion) {
		this.markedForDeletion = markedForDeletion;
	}
	public String getSearchName() {
		return searchName;
	}
	public void setSearchName(String searchName) {
		this.searchName = searchName;
	}
	public String getSearchPath() {
		return searchPath;
	}
	public void setSearchPath(String searchPath) {
		this.searchPath = searchPath;
	}
	public String getInsertRequestURL() {
		return insertRequestURL;
	}
	public void setInsertRequestURL(String insertRequestURL) {
		this.insertRequestURL = insertRequestURL;
	}
	public Date getRecordInsertDateTime() {
		return recordInsertDateTime;
	}
	public void setRecordInsertDateTime(Date recordInsertDateTime) {
		this.recordInsertDateTime = recordInsertDateTime;
	}
	public Date getImportStartDateTime() {
		return importStartDateTime;
	}
	public void setImportStartDateTime(Date importStartDateTime) {
		this.importStartDateTime = importStartDateTime;
	}
	public Date getImportEndDateTime() {
		return importEndDateTime;
	}
	public void setImportEndDateTime(Date importEndDateTime) {
		this.importEndDateTime = importEndDateTime;
	}
	public Date getLastUpdatedDateTime() {
		return lastUpdatedDateTime;
	}
	public void setLastUpdatedDateTime(Date lastUpdatedDateTime) {
		this.lastUpdatedDateTime = lastUpdatedDateTime;
	}
	public Integer getDeletedByUserId() {
		return deletedByUserId;
	}
	public void setDeletedByUserId(Integer deletedByUserId) {
		this.deletedByUserId = deletedByUserId;
	}
	public Date getDeletedDateTime() {
		return deletedDateTime;
	}
	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}
	public String getSearchShortName() {
		return searchShortName;
	}
	public void setSearchShortName(String searchShortName) {
		this.searchShortName = searchShortName;
	}
	
}
