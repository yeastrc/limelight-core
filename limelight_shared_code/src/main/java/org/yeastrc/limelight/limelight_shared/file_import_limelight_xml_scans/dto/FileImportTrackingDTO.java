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
	
	private String remoteUserIpAddressInit;
	private String remoteUserIpAddressSubmit;
	private boolean markedForDeletion;
	private String searchName;
	private String searchShortName;
	private String searchPath;
	private String initRequestURL;
	private String submitRequestURL;
	
	private Date recordInitDateTime;
	private Date recordSubmitDateTime;
	private Date importStartDateTime;
	private Date importEndDateTime;
	private Date lastUpdatedDateTime;

	private Integer deletedByUserId;
	private Date deletedDateTime;

	@Override
	public String toString() {
		return "FileImportTrackingDTO [id=" + id + ", projectId=" + projectId + ", priority=" + priority + ", userId="
				+ userId + ", status=" + status + ", remoteUserIpAddressInit=" + remoteUserIpAddressInit
				+ ", remoteUserIpAddressSubmit=" + remoteUserIpAddressSubmit + ", markedForDeletion="
				+ markedForDeletion + ", searchName=" + searchName + ", searchShortName=" + searchShortName
				+ ", searchPath=" + searchPath + ", initRequestURL=" + initRequestURL + ", submitRequestURL="
				+ submitRequestURL + ", recordInitDateTime=" + recordInitDateTime + ", recordSubmitDateTime="
				+ recordSubmitDateTime + ", importStartDateTime=" + importStartDateTime + ", importEndDateTime="
				+ importEndDateTime + ", lastUpdatedDateTime=" + lastUpdatedDateTime + ", deletedByUserId="
				+ deletedByUserId + ", deletedDateTime=" + deletedDateTime + "]";
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
	public String getRemoteUserIpAddressSubmit() {
		return remoteUserIpAddressSubmit;
	}
	public void setRemoteUserIpAddressSubmit(String remoteUserIpAddressSubmit) {
		this.remoteUserIpAddressSubmit = remoteUserIpAddressSubmit;
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
	public String getSubmitRequestURL() {
		return submitRequestURL;
	}
	public void setSubmitRequestURL(String submitRequestURL) {
		this.submitRequestURL = submitRequestURL;
	}
	public Date getRecordSubmitDateTime() {
		return recordSubmitDateTime;
	}
	public void setRecordSubmitDateTime(Date recordSubmitDateTime) {
		this.recordSubmitDateTime = recordSubmitDateTime;
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

	public String getRemoteUserIpAddressInit() {
		return remoteUserIpAddressInit;
	}

	public void setRemoteUserIpAddressInit(String remoteUserIpAddressInit) {
		this.remoteUserIpAddressInit = remoteUserIpAddressInit;
	}

	public String getInitRequestURL() {
		return initRequestURL;
	}

	public void setInitRequestURL(String initRequestURL) {
		this.initRequestURL = initRequestURL;
	}

	public Date getRecordInitDateTime() {
		return recordInitDateTime;
	}

	public void setRecordInitDateTime(Date recordInitDateTime) {
		this.recordInitDateTime = recordInitDateTime;
	}
}
