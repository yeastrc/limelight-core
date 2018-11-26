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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_request_objects.controller_request_root;

import java.util.List;

/**
 * Root object for JSON request to ProteinsInfo_ProteinSeqVersionIds_Single_ProjSearchID_RestWebserviceController
 * 
 * This is the representation that the Javascript code uses
 *
 */
public class ProteinsInfo_ForProteinSequenceVersionIds_Single_PSID_RequestRoot {

	private Integer projectSearchId;
	private List<Integer> proteinSequenceVersionIds;

	public Integer getProjectSearchId() {
		return projectSearchId;
	}
	public void setProjectSearchId(Integer projectSearchId) {
		this.projectSearchId = projectSearchId;
	}
	public List<Integer> getProteinSequenceVersionIds() {
		return proteinSequenceVersionIds;
	}
	public void setProteinSequenceVersionIds(List<Integer> proteinSequenceVersionIds) {
		this.proteinSequenceVersionIds = proteinSequenceVersionIds;
	}

}