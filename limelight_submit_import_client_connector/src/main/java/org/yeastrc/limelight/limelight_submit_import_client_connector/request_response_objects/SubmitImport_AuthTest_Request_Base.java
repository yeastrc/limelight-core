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
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 'Base' Request object for POST to Webservice Project_UploadData_SubmitterProgram_AuthCheck_RestWebserviceController
 *
 * Shared Fields
 */
@XmlRootElement(name="submitImport_AuthTest_Request_Base")
@XmlAccessorType(XmlAccessType.FIELD)
public abstract class SubmitImport_AuthTest_Request_Base extends BaseSubmitImportWebserviceRequest {


	// Properties as XML attributes

	@XmlAttribute
	private Integer submitProgramVersionNumber;

	@XmlAttribute
	private String projectIdentifier;

	public String getProjectIdentifier() {
		return projectIdentifier;
	}
	public void setProjectIdentifier(String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}
	public Integer getSubmitProgramVersionNumber() {
		return submitProgramVersionNumber;
	}
	public void setSubmitProgramVersionNumber(Integer submitProgramVersionNumber) {
		this.submitProgramVersionNumber = submitProgramVersionNumber;
	}
	
}
