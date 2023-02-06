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
 * Sub part for Single Search Tag Category and associated Search Tags
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class SubmitImport_FinalSubmit_Request_SubPart_SearchTagCategoryAndItsSearchTagsEntry {

	@XmlAttribute
	private String searchTagCategoryLabel;

	/**
	 * List of Search Tag Strings for Category
	 */
	private List<String> searchTagList;

	public String getSearchTagCategoryLabel() {
		return searchTagCategoryLabel;
	}

	public void setSearchTagCategoryLabel(String searchTagCategoryLabel) {
		this.searchTagCategoryLabel = searchTagCategoryLabel;
	}

	public List<String> getSearchTagList() {
		return searchTagList;
	}

	public void setSearchTagList(List<String> searchTagList) {
		this.searchTagList = searchTagList;
	}
	
}
