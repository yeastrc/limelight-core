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
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.display_objects;

import java.util.List;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;

/**
 * 
 *
 */
public class FileImportTrackingDisplay {


	private int trackingId;

	private FileImportStatus statusEnum;
	
	private String status;
	private String statusFailedMsg;
	
	private Integer queuePosition;
	private String queuePositionFmt;
	
	
	/**
	 * Optional item on XSD
	 */
	private String searchName;
	
	private String uploadedFilename;
	
	private String nameOfUploadUser;
	
	private String importSubmitDateTime;
	
	/**
	 * Only populated for status Started, Complete, or Failed 
	 */
	private String importStartDateTime;
	/**
	 * Only populated for status Complete, or Failed 
	 */
	private String importEndDateTime;
	/**
	 * Only populated for status Complete, or Failed 
	 */
	private String lastUpdatedDateTime;
	
	private List<String> scanFilenames;

	private String scanfileNamesCommaDelim;
	
	
	public boolean isStatusQueued() {
		return statusEnum == FileImportStatus.QUEUED;
	}
	public boolean isStatusReQueued() {
		return statusEnum == FileImportStatus.RE_QUEUED;
	}

	public boolean isStatusQueuedOrRequeued() {
		return statusEnum == FileImportStatus.QUEUED
				|| statusEnum == FileImportStatus.RE_QUEUED;
	}
	public boolean isStatusStarted() {
		return statusEnum == FileImportStatus.STARTED;
	}
	public boolean isStatusComplete() {
		return statusEnum == FileImportStatus.COMPLETE;
	}
	public boolean isStatusFailed() {
		return statusEnum == FileImportStatus.FAILED;
	}
	
	public int getStatusId() {
		
		return statusEnum.value();
	}

	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getLastUpdatedDateTime() {
		return lastUpdatedDateTime;
	}
	public void setLastUpdatedDateTime(String lastUpdatedDateTime) {
		this.lastUpdatedDateTime = lastUpdatedDateTime;
	}
	public String getUploadedFilename() {
		return uploadedFilename;
	}
	public void setUploadedFilename(String uploadedFilename) {
		this.uploadedFilename = uploadedFilename;
	}
	public String getSearchName() {
		return searchName;
	}
	public void setSearchName(String searchName) {
		this.searchName = searchName;
	}
	public FileImportStatus getStatusEnum() {
		return statusEnum;
	}
	public void setStatusEnum(FileImportStatus statusEnum) {
		this.statusEnum = statusEnum;
	}
	public int getTrackingId() {
		return trackingId;
	}
	public void setTrackingId(int trackingId) {
		this.trackingId = trackingId;
	}
	public String getNameOfUploadUser() {
		return nameOfUploadUser;
	}
	public void setNameOfUploadUser(String nameOfUploadUser) {
		this.nameOfUploadUser = nameOfUploadUser;
	}
	public List<String> getScanFilenames() {
		return scanFilenames;
	}
	public void setScanFilenames(List<String> scanFilenames) {
		this.scanFilenames = scanFilenames;
	}
	public String getStatusFailedMsg() {
		return statusFailedMsg;
	}
	public void setStatusFailedMsg(String statusFailedMsg) {
		this.statusFailedMsg = statusFailedMsg;
	}
	public String getImportSubmitDateTime() {
		return importSubmitDateTime;
	}
	public void setImportSubmitDateTime(String importSubmitDateTime) {
		this.importSubmitDateTime = importSubmitDateTime;
	}
	public String getImportStartDateTime() {
		return importStartDateTime;
	}
	public void setImportStartDateTime(String importStartDateTime) {
		this.importStartDateTime = importStartDateTime;
	}
	public String getImportEndDateTime() {
		return importEndDateTime;
	}
	public void setImportEndDateTime(String importEndDateTime) {
		this.importEndDateTime = importEndDateTime;
	}
	public Integer getQueuePosition() {
		return queuePosition;
	}
	public void setQueuePosition(Integer queuePosition) {
		this.queuePosition = queuePosition;
	}
	public String getQueuePositionFmt() {
		return queuePositionFmt;
	}
	public void setQueuePositionFmt(String queuePositionFmt) {
		this.queuePositionFmt = queuePositionFmt;
	}
	public String getScanfileNamesCommaDelim() {
		return scanfileNamesCommaDelim;
	}
	public void setScanfileNamesCommaDelim(String scanfileNamesCommaDelim) {
		this.scanfileNamesCommaDelim = scanfileNamesCommaDelim;
	}

}
