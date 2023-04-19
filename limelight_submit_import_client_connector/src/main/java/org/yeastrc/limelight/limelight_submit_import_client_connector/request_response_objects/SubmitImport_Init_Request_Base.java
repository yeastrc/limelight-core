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
 * 'Base' Request object for POST to Webservice Project_UploadData_UploadInitialize_RestWebserviceController
 *
 * Shared Fields
 */
@XmlRootElement(name="submitImport_Init_Request_Base")
@XmlAccessorType(XmlAccessType.FIELD)
public abstract class SubmitImport_Init_Request_Base extends BaseSubmitImportWebserviceRequest {


	// Properties as XML attributes

	@XmlAttribute
	private Integer submitProgramVersionNumber;

	@XmlAttribute
	private String projectIdentifier;
	
	
	//  These 'search...' will NOT be populated for OLD Submit Import Program versions

	@XmlAttribute
	private String searchName;
	@XmlAttribute
	private String searchShortName;
	@XmlAttribute
	private String searchPath;
	
	//  'files_InSubmitImport' will NOT be populated for OLD Submit Import Program versions

	@XmlElementWrapper(name="files_InSubmitImport")
	@XmlElement(name="file_InSubmitImport")
	private List<SubmitImport_Init_Request_SubPart_SingleFileUploadEntry> files_InSubmitImport;
	
	

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
	public String getSearchName() {
		return searchName;
	}
	public void setSearchName(String searchName) {
		this.searchName = searchName;
	}
	public String getSearchShortName() {
		return searchShortName;
	}
	public void setSearchShortName(String searchShortName) {
		this.searchShortName = searchShortName;
	}
	public String getSearchPath() {
		return searchPath;
	}
	public void setSearchPath(String searchPath) {
		this.searchPath = searchPath;
	}
	public List<SubmitImport_Init_Request_SubPart_SingleFileUploadEntry> getFiles_InSubmitImport() {
		return files_InSubmitImport;
	}
	public void setFiles_InSubmitImport(
			List<SubmitImport_Init_Request_SubPart_SingleFileUploadEntry> files_InSubmitImport) {
		this.files_InSubmitImport = files_InSubmitImport;
	}
	
}
