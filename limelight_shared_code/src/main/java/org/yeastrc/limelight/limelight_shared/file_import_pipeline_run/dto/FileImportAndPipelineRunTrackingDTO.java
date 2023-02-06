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
package org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto;

import java.util.Date;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.enum_classes.FileImportAndPipelineRun_RequestType;

/**
 * table import_and_pipeline_run_tracking_tbl
 *
 */
public class FileImportAndPipelineRunTrackingDTO {

	private int id;
	private FileImportAndPipelineRun_RequestType requestType;
	private int projectId;
	private int priority;
	private int userId;
	private FileImportStatus status;
	
	private boolean markedForDeletion;
	
	private int requestData_Format_VersionNumber;
	private int requestData_Content_VersionNumber;
	
	private String requestData_AsString;

	private int requestData_LabelValuePairs_JSON_Format_VersionNumber;
	private int requestData_LabelValuePairs_JSON_Content_VersionNumber;
	private String requestData_LabelValuePairs_JSON_AsString;

	private Integer run_id_for_status_id;
	
	private String insertRequestURL;
	private String insertRequest_RemoteUserIpAddress;
	
	private Date recordInsertDateTime;
	private Date lastUpdatedDateTime;
	
	private Date runStartDateTime;
	private Date runEndDateTime;

	private Integer deletedByUserId;
	private Date deletedDateTime;

	@Override
	public String toString() {
		return "FileImportAndPipelineRunTrackingDTO [id=" + id + ", requestType=" + requestType + ", projectId="
				+ projectId + ", priority=" + priority + ", userId=" + userId + ", status=" + status
				+ ", markedForDeletion=" + markedForDeletion + ", requestData_Format_VersionNumber="
				+ requestData_Format_VersionNumber + ", requestData_Content_VersionNumber="
				+ requestData_Content_VersionNumber + ", requestData_AsString=" + requestData_AsString
				+ ", requestData_LabelValuePairs_JSON_Format_VersionNumber="
				+ requestData_LabelValuePairs_JSON_Format_VersionNumber
				+ ", requestData_LabelValuePairs_JSON_Content_VersionNumber="
				+ requestData_LabelValuePairs_JSON_Content_VersionNumber
				+ ", requestData_LabelValuePairs_JSON_AsString=" + requestData_LabelValuePairs_JSON_AsString
				+ ", run_id_for_status_id=" + run_id_for_status_id + ", insertRequestURL=" + insertRequestURL
				+ ", insertRequest_RemoteUserIpAddress=" + insertRequest_RemoteUserIpAddress + ", recordInsertDateTime="
				+ recordInsertDateTime + ", lastUpdatedDateTime=" + lastUpdatedDateTime + ", runStartDateTime="
				+ runStartDateTime + ", runEndDateTime=" + runEndDateTime + ", deletedByUserId=" + deletedByUserId
				+ ", deletedDateTime=" + deletedDateTime + "]";
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public FileImportAndPipelineRun_RequestType getRequestType() {
		return requestType;
	}
	public void setRequestType(FileImportAndPipelineRun_RequestType requestType) {
		this.requestType = requestType;
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
	public boolean isMarkedForDeletion() {
		return markedForDeletion;
	}
	public void setMarkedForDeletion(boolean markedForDeletion) {
		this.markedForDeletion = markedForDeletion;
	}
	public int getRequestData_Format_VersionNumber() {
		return requestData_Format_VersionNumber;
	}
	public void setRequestData_Format_VersionNumber(int requestData_Format_VersionNumber) {
		this.requestData_Format_VersionNumber = requestData_Format_VersionNumber;
	}
	public int getRequestData_Content_VersionNumber() {
		return requestData_Content_VersionNumber;
	}
	public void setRequestData_Content_VersionNumber(int requestData_Content_VersionNumber) {
		this.requestData_Content_VersionNumber = requestData_Content_VersionNumber;
	}
	public String getRequestData_AsString() {
		return requestData_AsString;
	}
	public void setRequestData_AsString(String requestData_AsString) {
		this.requestData_AsString = requestData_AsString;
	}
	public String getInsertRequestURL() {
		return insertRequestURL;
	}
	public void setInsertRequestURL(String insertRequestURL) {
		this.insertRequestURL = insertRequestURL;
	}
	public String getInsertRequest_RemoteUserIpAddress() {
		return insertRequest_RemoteUserIpAddress;
	}
	public void setInsertRequest_RemoteUserIpAddress(String insertRequest_RemoteUserIpAddress) {
		this.insertRequest_RemoteUserIpAddress = insertRequest_RemoteUserIpAddress;
	}
	public Date getRecordInsertDateTime() {
		return recordInsertDateTime;
	}
	public void setRecordInsertDateTime(Date recordInsertDateTime) {
		this.recordInsertDateTime = recordInsertDateTime;
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
	public Integer getRun_id_for_status_id() {
		return run_id_for_status_id;
	}
	public void setRun_id_for_status_id(Integer run_id_for_status_id) {
		this.run_id_for_status_id = run_id_for_status_id;
	}
	public Date getRunStartDateTime() {
		return runStartDateTime;
	}
	public void setRunStartDateTime(Date runStartDateTime) {
		this.runStartDateTime = runStartDateTime;
	}
	public Date getRunEndDateTime() {
		return runEndDateTime;
	}
	public void setRunEndDateTime(Date runEndDateTime) {
		this.runEndDateTime = runEndDateTime;
	}
	public int getRequestData_LabelValuePairs_JSON_Format_VersionNumber() {
		return requestData_LabelValuePairs_JSON_Format_VersionNumber;
	}
	public void setRequestData_LabelValuePairs_JSON_Format_VersionNumber(
			int requestData_LabelValuePairs_JSON_Format_VersionNumber) {
		this.requestData_LabelValuePairs_JSON_Format_VersionNumber = requestData_LabelValuePairs_JSON_Format_VersionNumber;
	}
	public String getRequestData_LabelValuePairs_JSON_AsString() {
		return requestData_LabelValuePairs_JSON_AsString;
	}
	public void setRequestData_LabelValuePairs_JSON_AsString(String requestData_LabelValuePairs_JSON_AsString) {
		this.requestData_LabelValuePairs_JSON_AsString = requestData_LabelValuePairs_JSON_AsString;
	}
	public int getRequestData_LabelValuePairs_JSON_Content_VersionNumber() {
		return requestData_LabelValuePairs_JSON_Content_VersionNumber;
	}
	public void setRequestData_LabelValuePairs_JSON_Content_VersionNumber(
			int requestData_LabelValuePairs_JSON_Content_VersionNumber) {
		this.requestData_LabelValuePairs_JSON_Content_VersionNumber = requestData_LabelValuePairs_JSON_Content_VersionNumber;
	}
		
}
