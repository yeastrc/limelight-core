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

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;


/**
 * 'Base' for Response object for POST to Webservice Project_UploadData_UploadSubmit_RestWebserviceController
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
public abstract class SubmitImport_FinalSubmit_Response_Base extends BaseSubmitImportWebserviceResponse {

	@XmlAttribute
	private boolean submitProgramVersionNumber_NotAccepted;

	@XmlAttribute
	private Integer submitProgramVersionNumber_Current_Per_Webapp;

	@XmlAttribute
	private boolean projectLocked;
	@XmlAttribute
	private boolean submittedScanFileNotAllowed;
	
	public boolean isProjectLocked() {
		return projectLocked;
	}
	public void setProjectLocked(boolean projectLocked) {
		this.projectLocked = projectLocked;
	}
	public boolean isSubmittedScanFileNotAllowed() {
		return submittedScanFileNotAllowed;
	}
	public void setSubmittedScanFileNotAllowed(boolean submittedScanFileNotAllowed) {
		this.submittedScanFileNotAllowed = submittedScanFileNotAllowed;
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

}
