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

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.enum_classes.FileImportAndPipelineRun_SubStatus;

/**
 * table import_and_pipeline_run_tracking_run_tbl
 *
 */
public class FileImportAndPipelineRunTrackingRunDTO {

	private int id;
	private int fileImportAndPipelineRunTracking_Id;
	private FileImportStatus status;
	private FileImportAndPipelineRun_SubStatus subStatus;
	
	private String in_progress_end_user_display_message;
	private String finished_sucess_end_user_display_message;
	private String finished_success_pipeline_end_user_display_message;
	private String finished_fail_end_user_display_message;
	private String finished_fail_pipeline_end_user_display_message;

	
	private int resultData_Format_VersionNumber;
	private String resultData_AsString;
	

	@Override
	public String toString() {
		return "FileImportAndPipelineRunTrackingRunDTO [id=" + id + ", fileImportAndPipelineRunTracking_Id="
				+ fileImportAndPipelineRunTracking_Id + ", status=" + status + ", subStatus=" + subStatus
				+ ", in_progress_end_user_display_message=" + in_progress_end_user_display_message
				+ ", finished_sucess_end_user_display_message=" + finished_sucess_end_user_display_message
				+ ", finished_success_pipeline_end_user_display_message="
				+ finished_success_pipeline_end_user_display_message + ", finished_fail_end_user_display_message="
				+ finished_fail_end_user_display_message + ", finished_fail_pipeline_end_user_display_message="
				+ finished_fail_pipeline_end_user_display_message + ", resultData_Format_VersionNumber="
				+ resultData_Format_VersionNumber + ", resultData_AsString=" + resultData_AsString + "]";
	}
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getFileImportAndPipelineRunTracking_Id() {
		return fileImportAndPipelineRunTracking_Id;
	}
	public void setFileImportAndPipelineRunTracking_Id(int fileImportAndPipelineRunTracking_Id) {
		this.fileImportAndPipelineRunTracking_Id = fileImportAndPipelineRunTracking_Id;
	}
	public FileImportStatus getStatus() {
		return status;
	}
	public void setStatus(FileImportStatus status) {
		this.status = status;
	}
	public int getResultData_Format_VersionNumber() {
		return resultData_Format_VersionNumber;
	}
	public void setResultData_Format_VersionNumber(int resultData_Format_VersionNumber) {
		this.resultData_Format_VersionNumber = resultData_Format_VersionNumber;
	}
	public String getResultData_AsString() {
		return resultData_AsString;
	}
	public void setResultData_AsString(String resultData_AsString) {
		this.resultData_AsString = resultData_AsString;
	}
	public FileImportAndPipelineRun_SubStatus getSubStatus() {
		return subStatus;
	}
	public void setSubStatus(FileImportAndPipelineRun_SubStatus subStatus) {
		this.subStatus = subStatus;
	}
	public String getIn_progress_end_user_display_message() {
		return in_progress_end_user_display_message;
	}
	public void setIn_progress_end_user_display_message(String in_progress_end_user_display_message) {
		this.in_progress_end_user_display_message = in_progress_end_user_display_message;
	}
	public String getFinished_sucess_end_user_display_message() {
		return finished_sucess_end_user_display_message;
	}
	public void setFinished_sucess_end_user_display_message(String finished_sucess_end_user_display_message) {
		this.finished_sucess_end_user_display_message = finished_sucess_end_user_display_message;
	}
	public String getFinished_success_pipeline_end_user_display_message() {
		return finished_success_pipeline_end_user_display_message;
	}
	public void setFinished_success_pipeline_end_user_display_message(
			String finished_success_pipeline_end_user_display_message) {
		this.finished_success_pipeline_end_user_display_message = finished_success_pipeline_end_user_display_message;
	}
	public String getFinished_fail_end_user_display_message() {
		return finished_fail_end_user_display_message;
	}
	public void setFinished_fail_end_user_display_message(String finished_fail_end_user_display_message) {
		this.finished_fail_end_user_display_message = finished_fail_end_user_display_message;
	}
	public String getFinished_fail_pipeline_end_user_display_message() {
		return finished_fail_pipeline_end_user_display_message;
	}
	public void setFinished_fail_pipeline_end_user_display_message(String finished_fail_pipeline_end_user_display_message) {
		this.finished_fail_pipeline_end_user_display_message = finished_fail_pipeline_end_user_display_message;
	}
		
}
