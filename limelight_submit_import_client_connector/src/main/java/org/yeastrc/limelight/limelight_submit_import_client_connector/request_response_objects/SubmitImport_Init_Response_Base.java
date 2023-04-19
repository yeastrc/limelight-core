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
package org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 'Base' Response object for POST to Webservice Project_UploadData_UploadInitialize_RestWebserviceController
 *
 */
@XmlRootElement(name="submitImport_Init_Response_Base")
@XmlAccessorType(XmlAccessType.FIELD)
public abstract class SubmitImport_Init_Response_Base extends BaseSubmitImportWebserviceResponse {

	// Properties as XML attributes

	@XmlAttribute
	private boolean submitProgramVersionNumber_NotAccepted;

	@XmlAttribute
	private Integer submitProgramVersionNumber_Current_Per_Webapp;

	@XmlAttribute
	private String uploadKey;
	
	@XmlAttribute
	private boolean projectLocked; 
	
	//  ALL added properties should use Java Objects, NOT primitives (int, boolean)  so that previous versions of the Submitter Program are supported.

	private List<String> accepted_ScanFilename_Suffix_List; //  Not populated for Submit Program version < 4

	private Boolean fastaFileSubmit_Configured; //  Not populated for Submit Program version < 8
	

	//  'files_InSubmitImport' will NOT be populated  if not in the request for OR for OLD Submit Import Program versions

	@XmlElementWrapper(name="files_InSubmitImport")
	@XmlElement(name="file_InSubmitImport")
	private List<SubmitImport_Init_Response_SubPart_SingleFileUploadEntry> files_InSubmitImport;
	

	public String getUploadKey() {
		return uploadKey;
	}
	public void setUploadKey(String uploadKey) {
		this.uploadKey = uploadKey;
	}
	public boolean isProjectLocked() {
		return projectLocked;
	}
	public void setProjectLocked(boolean projectLocked) {
		this.projectLocked = projectLocked;
	}
	public boolean isSubmitProgramVersionNumber_NotAccepted() {
		return submitProgramVersionNumber_NotAccepted;
	}
	public void setSubmitProgramVersionNumber_NotAccepted(boolean submitProgramVersionNumber_NotAccepted) {
		this.submitProgramVersionNumber_NotAccepted = submitProgramVersionNumber_NotAccepted;
	}
	public Integer getSubmitProgramVersionNumber_Current_Per_Webapp() {
		return submitProgramVersionNumber_Current_Per_Webapp;
	}
	public void setSubmitProgramVersionNumber_Current_Per_Webapp(Integer submitProgramVersionNumber_Current_Per_Webapp) {
		this.submitProgramVersionNumber_Current_Per_Webapp = submitProgramVersionNumber_Current_Per_Webapp;
	}
	public List<String> getAccepted_ScanFilename_Suffix_List() {
		return accepted_ScanFilename_Suffix_List;
	}
	public void setAccepted_ScanFilename_Suffix_List(List<String> accepted_ScanFilename_Suffix_List) {
		this.accepted_ScanFilename_Suffix_List = accepted_ScanFilename_Suffix_List;
	}
	public Boolean getFastaFileSubmit_Configured() {
		return fastaFileSubmit_Configured;
	}
	public void setFastaFileSubmit_Configured(Boolean fastaFileSubmit_Configured) {
		this.fastaFileSubmit_Configured = fastaFileSubmit_Configured;
	}
	public List<SubmitImport_Init_Response_SubPart_SingleFileUploadEntry> getFiles_InSubmitImport() {
		return files_InSubmitImport;
	}
	public void setFiles_InSubmitImport(
			List<SubmitImport_Init_Response_SubPart_SingleFileUploadEntry> files_InSubmitImport) {
		this.files_InSubmitImport = files_InSubmitImport;
	}
	
}
