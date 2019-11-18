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

import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;

/**
 * Root object for JSON request to PSM_List_RestWebserviceController
 * 
 * This is the representation that the Javascript code uses
 *
 */
public class PSM_List_RequestRoot {

	private Integer projectSearchId;
	private List<Long> psmIds; // Optional
	private Integer reportedPeptideId;
	private SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId;
	private List<Integer> psmAnnotationTypeIdsForSorting;
	
	public Integer getReportedPeptideId() {
		return reportedPeptideId;
	}

	public void setReportedPeptideId(Integer reportedPeptideId) {
		this.reportedPeptideId = reportedPeptideId;
	}

	public Integer getProjectSearchId() {
		return projectSearchId;
	}

	public void setProjectSearchId(Integer projectSearchId) {
		this.projectSearchId = projectSearchId;
	}

	public SearchDataLookupParams_For_Single_ProjectSearchId getSearchDataLookupParams_For_Single_ProjectSearchId() {
		return searchDataLookupParams_For_Single_ProjectSearchId;
	}

	public void setSearchDataLookupParams_For_Single_ProjectSearchId(
			SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId) {
		this.searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchId;
	}

	public List<Integer> getPsmAnnotationTypeIdsForSorting() {
		return psmAnnotationTypeIdsForSorting;
	}

	public void setPsmAnnotationTypeIdsForSorting(List<Integer> psmAnnotationTypeIdsForSorting) {
		this.psmAnnotationTypeIdsForSorting = psmAnnotationTypeIdsForSorting;
	}

	public List<Long> getPsmIds() {
		return psmIds;
	}

	public void setPsmIds(List<Long> psmIds) {
		this.psmIds = psmIds;
	}


}
