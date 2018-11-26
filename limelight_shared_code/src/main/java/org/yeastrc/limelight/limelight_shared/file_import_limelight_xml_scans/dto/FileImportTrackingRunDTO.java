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

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportRunSubStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;

/**
 * table  file_import_tracking_run_tbl
 *
 */
public class FileImportTrackingRunDTO {

	private int id;

	private int fileImportTrackingId;
	
	private boolean currentRun;
	
	private FileImportStatus runStatus;
	
	private FileImportRunSubStatus runSubStatus;

	// TODO  Not populated yet:  importer_percent_psms_processed
	
	private Integer insertedSearchId;
	
	/**
	 * TODO  currently populated with same as dataErrorText when data error
	 */
	private String importResultText;
	
	private String dataErrorText;
	

	private Date startDateTime;
	private Date lastUpdatedDateTime;

	
	@Override
	public String toString() {

		Integer runSubStatusId = null;
		
		if ( runSubStatus != null ) {
			
			runSubStatusId = runSubStatus.value();
		}
		
		return "FileImportTrackingRunDTO [id=" + id
				+ ", fileImportTrackingId="
				+ fileImportTrackingId + ", currentRun=" + currentRun
				+ ", runStatus=" + runStatus 
				+ ", runSubStatus=" + runSubStatus
				+ ", runSubStatusId=" + runSubStatusId
				+ ", insertedSearchId=" + insertedSearchId
				+ ", importResultText=" + importResultText + ", dataErrorText="
				+ dataErrorText + ", startDateTime=" + startDateTime
				+ ", lastUpdatedDateTime=" + lastUpdatedDateTime + "]";
	}

	
	
	/**
	 * TODO  currently populated with same as dataErrorText when data error
	 * @return
	 */
	public String getImportResultText() {
		return importResultText;
	}
	/**
	 * TODO  currently populated with same as dataErrorText when data error
	 * @param importResultText
	 */
	public void setImportResultText(String importResultText) {
		this.importResultText = importResultText;
	}



	public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public int getFileImportTrackingId() {
		return fileImportTrackingId;
	}



	public void setFileImportTrackingId(int fileImportTrackingId) {
		this.fileImportTrackingId = fileImportTrackingId;
	}



	public boolean isCurrentRun() {
		return currentRun;
	}



	public void setCurrentRun(boolean currentRun) {
		this.currentRun = currentRun;
	}



	public FileImportStatus getRunStatus() {
		return runStatus;
	}



	public void setRunStatus(FileImportStatus runStatus) {
		this.runStatus = runStatus;
	}



	public FileImportRunSubStatus getRunSubStatus() {
		return runSubStatus;
	}



	public void setRunSubStatus(FileImportRunSubStatus runSubStatus) {
		this.runSubStatus = runSubStatus;
	}



	public Integer getInsertedSearchId() {
		return insertedSearchId;
	}



	public void setInsertedSearchId(Integer insertedSearchId) {
		this.insertedSearchId = insertedSearchId;
	}



	public String getDataErrorText() {
		return dataErrorText;
	}



	public void setDataErrorText(String dataErrorText) {
		this.dataErrorText = dataErrorText;
	}



	public Date getStartDateTime() {
		return startDateTime;
	}



	public void setStartDateTime(Date startDateTime) {
		this.startDateTime = startDateTime;
	}



	public Date getLastUpdatedDateTime() {
		return lastUpdatedDateTime;
	}



	public void setLastUpdatedDateTime(Date lastUpdatedDateTime) {
		this.lastUpdatedDateTime = lastUpdatedDateTime;
	}

}
