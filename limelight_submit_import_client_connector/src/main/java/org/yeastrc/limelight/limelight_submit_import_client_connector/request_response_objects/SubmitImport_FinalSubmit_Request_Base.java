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


/**
 * 'Base' for Request object for POST to Webservice Project_UploadData_UploadSubmit_RestWebserviceController
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
public abstract class SubmitImport_FinalSubmit_Request_Base {


	@XmlAttribute
	private Integer submitProgramVersionNumber;

	@XmlAttribute
	private String projectIdentifier;
	@XmlAttribute
	private String uploadKey;
	@XmlAttribute
	private String searchName;
	@XmlAttribute
	private String searchShortName;
	
	/**
	 * List of files being submitted
	 */
	private List<SubmitImport_FinalSubmit_SingleFileItem> fileItems;
	
	/**
	 * List of Search Tag Strings that are NOT in any category
	 */
	private List<String> searchTagList;
	

	/**
	 * List of Search Tag Categories and their Search Tag Strings
	 */
	private List<SubmitImport_FinalSubmit_Request_SubPart_SearchTagCategoryAndItsSearchTagsEntry> searchTagCategoryAndItsSearchTagsList;
	
	
	////////////////////////////

	public String getProjectIdentifier() {
		return projectIdentifier;
	}

	public void setProjectIdentifier(String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}

	public String getUploadKey() {
		return uploadKey;
	}

	public void setUploadKey(String uploadKey) {
		this.uploadKey = uploadKey;
	}

	public String getSearchName() {
		return searchName;
	}

	public void setSearchName(String searchName) {
		this.searchName = searchName;
	}
	public List<SubmitImport_FinalSubmit_SingleFileItem> getFileItems() {
		return fileItems;
	}

	public void setFileItems(List<SubmitImport_FinalSubmit_SingleFileItem> fileItems) {
		this.fileItems = fileItems;
	}

	public Integer getSubmitProgramVersionNumber() {
		return submitProgramVersionNumber;
	}

	public void setSubmitProgramVersionNumber(Integer submitProgramVersionNumber) {
		this.submitProgramVersionNumber = submitProgramVersionNumber;
	}

	public List<String> getSearchTagList() {
		return searchTagList;
	}

	public void setSearchTagList(List<String> searchTagList) {
		this.searchTagList = searchTagList;
	}

	public String getSearchShortName() {
		return searchShortName;
	}

	public void setSearchShortName(String searchShortName) {
		this.searchShortName = searchShortName;
	}

	public List<SubmitImport_FinalSubmit_Request_SubPart_SearchTagCategoryAndItsSearchTagsEntry> getSearchTagCategoryAndItsSearchTagsList() {
		return searchTagCategoryAndItsSearchTagsList;
	}

	public void setSearchTagCategoryAndItsSearchTagsList(
			List<SubmitImport_FinalSubmit_Request_SubPart_SearchTagCategoryAndItsSearchTagsEntry> searchTagCategoryAndItsSearchTagsList) {
		this.searchTagCategoryAndItsSearchTagsList = searchTagCategoryAndItsSearchTagsList;
	}
}
