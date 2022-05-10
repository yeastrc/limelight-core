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
 * Tables
 * 
 *   search__rep_pept__psm_target_psm_best_psm_value_lookup_tbl		- For PSMs that are Target
 *   search__rep_pept__psm_target_ind_decoy_psm_best_psm_vl_lkp_tbl - For PSMs that are Target or Independent Decoy
 *   search__rep_pept__psm_tgt_id_dcy_dcy_psm_bst_psm_vl_lkp_tbl	- For PSMs that are Target or Independent Decoy or Decoy
 *
 */
public class Search_ReportedPeptide_BestPsmValue_Lookup__DTO {

	
	private int searchId;
	private int reportedPeptideId;
	private int annotationTypeId;
	
	private double bestPsmValueForAnnTypeId;
	private long psmIdForBestValue;
	
	//  Constructors
	
	public Search_ReportedPeptide_BestPsmValue_Lookup__DTO() { }

	public Search_ReportedPeptide_BestPsmValue_Lookup__DTO( Search_ReportedPeptide__Lookup__DTO search_ReportedPeptide__Lookup__DTO ) {

		this.reportedPeptideId = search_ReportedPeptide__Lookup__DTO.getReportedPeptideId();
		this.searchId = search_ReportedPeptide__Lookup__DTO.getSearchId();
	}
	
	@Override
	public String toString() {
		return "Search_ReportedPeptide_BestPsmValue_Lookup__DTO [searchId=" + searchId + ", reportedPeptideId="
				+ reportedPeptideId + ", annotationTypeId=" + annotationTypeId + ", bestPsmValueForAnnTypeId="
				+ bestPsmValueForAnnTypeId + ", psmIdForBestValue=" + psmIdForBestValue + "]";
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
	public int getAnnotationTypeId() {
		return annotationTypeId;
	}
	public void setAnnotationTypeId(int annotationTypeId) {
		this.annotationTypeId = annotationTypeId;
	}
	public double getBestPsmValueForAnnTypeId() {
		return bestPsmValueForAnnTypeId;
	}
	public void setBestPsmValueForAnnTypeId(double bestPsmValueForAnnTypeId) {
		this.bestPsmValueForAnnTypeId = bestPsmValueForAnnTypeId;
	}
	public long getPsmIdForBestValue() {
		return psmIdForBestValue;
	}
	public void setPsmIdForBestValue(long psmIdForBestValue) {
		this.psmIdForBestValue = psmIdForBestValue;
	}

}