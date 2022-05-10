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
package org.yeastrc.limelight.limelight_shared.dto;

/**
 * Table search__rep_pept_sub_group_lookup_tbl
 *
 */
public class Search_ReportedPeptide_SubGroup__Lookup__DTO {


	private int searchId;
	private int reportedPeptideId;
	private int searchSubGroupId;

	private int psmNum_Targets_Only_AtDefaultCutoff;
	private int psmNum_IndependentDecoys_Only_AtDefaultCutoff;
	private int psmNum_Decoys_Only_AtDefaultCutoff;

	@Override
	public String toString() {
		return "Search_ReportedPeptide_SubGroup__Lookup__DTO [searchId=" + searchId + ", reportedPeptideId="
				+ reportedPeptideId + ", searchSubGroupId=" + searchSubGroupId
				+ ", psmNum_Targets_Only_AtDefaultCutoff=" + psmNum_Targets_Only_AtDefaultCutoff
				+ ", psmNum_IndependentDecoys_Only_AtDefaultCutoff=" + psmNum_IndependentDecoys_Only_AtDefaultCutoff
				+ ", psmNum_Decoys_Only_AtDefaultCutoff=" + psmNum_Decoys_Only_AtDefaultCutoff + "]";
	}
	
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public int getReportedPeptideId() {
		return reportedPeptideId;
	}
	public void setReportedPeptideId(int reportedPeptideId) {
		this.reportedPeptideId = reportedPeptideId;
	}
	public int getSearchSubGroupId() {
		return searchSubGroupId;
	}
	public void setSearchSubGroupId(int searchSubGroupId) {
		this.searchSubGroupId = searchSubGroupId;
	}
	
	public int getPsmNum_Targets_Only_AtDefaultCutoff() {
		return psmNum_Targets_Only_AtDefaultCutoff;
	}
	public void setPsmNum_Targets_Only_AtDefaultCutoff(int psmNum_Targets_Only_AtDefaultCutoff) {
		this.psmNum_Targets_Only_AtDefaultCutoff = psmNum_Targets_Only_AtDefaultCutoff;
	}
	public int getPsmNum_IndependentDecoys_Only_AtDefaultCutoff() {
		return psmNum_IndependentDecoys_Only_AtDefaultCutoff;
	}
	public void setPsmNum_IndependentDecoys_Only_AtDefaultCutoff(int psmNum_IndependentDecoys_Only_AtDefaultCutoff) {
		this.psmNum_IndependentDecoys_Only_AtDefaultCutoff = psmNum_IndependentDecoys_Only_AtDefaultCutoff;
	}
	public int getPsmNum_Decoys_Only_AtDefaultCutoff() {
		return psmNum_Decoys_Only_AtDefaultCutoff;
	}
	public void setPsmNum_Decoys_Only_AtDefaultCutoff(int psmNum_Decoys_Only_AtDefaultCutoff) {
		this.psmNum_Decoys_Only_AtDefaultCutoff = psmNum_Decoys_Only_AtDefaultCutoff;
	}
}
