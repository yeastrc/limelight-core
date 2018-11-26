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
package org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects;

import java.util.List;

/**
 * For requests for Single Project Search Id
 *
 */
public class SearchDataLookupParams_For_Single_ProjectSearchId {

	private int projectSearchId;
	
	//  Filter values (cutoffs per annotation type)
	private List<SearchDataLookupParams_Filter_Per_AnnotationType> psmFilters;
	private List<SearchDataLookupParams_Filter_Per_AnnotationType> reportedPeptideFilters;
	private List<SearchDataLookupParams_Filter_Per_AnnotationType> matchedProteinFilters;

	//  Annotation Type Ids to Display
	private List<Integer> psmAnnTypeDisplay;
	private List<Integer> reportedPeptideAnnTypeDisplay;
	private List<Integer> matchedProteinAnnTypeDisplay;
	
	
	public List<SearchDataLookupParams_Filter_Per_AnnotationType> getPsmFilters() {
		return psmFilters;
	}
	public void setPsmFilters(List<SearchDataLookupParams_Filter_Per_AnnotationType> psmFilters) {
		this.psmFilters = psmFilters;
	}
	public List<SearchDataLookupParams_Filter_Per_AnnotationType> getReportedPeptideFilters() {
		return reportedPeptideFilters;
	}
	public void setReportedPeptideFilters(List<SearchDataLookupParams_Filter_Per_AnnotationType> reportedPeptideFilters) {
		this.reportedPeptideFilters = reportedPeptideFilters;
	}
	public List<SearchDataLookupParams_Filter_Per_AnnotationType> getMatchedProteinFilters() {
		return matchedProteinFilters;
	}
	public void setMatchedProteinFilters(List<SearchDataLookupParams_Filter_Per_AnnotationType> matchedProteinFilters) {
		this.matchedProteinFilters = matchedProteinFilters;
	}
	public List<Integer> getPsmAnnTypeDisplay() {
		return psmAnnTypeDisplay;
	}
	public void setPsmAnnTypeDisplay(List<Integer> psmAnnTypeDisplay) {
		this.psmAnnTypeDisplay = psmAnnTypeDisplay;
	}
	public List<Integer> getReportedPeptideAnnTypeDisplay() {
		return reportedPeptideAnnTypeDisplay;
	}
	public void setReportedPeptideAnnTypeDisplay(List<Integer> reportedPeptideAnnTypeDisplay) {
		this.reportedPeptideAnnTypeDisplay = reportedPeptideAnnTypeDisplay;
	}
	public List<Integer> getMatchedProteinAnnTypeDisplay() {
		return matchedProteinAnnTypeDisplay;
	}
	public void setMatchedProteinAnnTypeDisplay(List<Integer> matchedProteinAnnTypeDisplay) {
		this.matchedProteinAnnTypeDisplay = matchedProteinAnnTypeDisplay;
	}
	public int getProjectSearchId() {
		return projectSearchId;
	}
	public void setProjectSearchId(int projectSearchId) {
		this.projectSearchId = projectSearchId;
	}
}
