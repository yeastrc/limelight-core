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
package org.yeastrc.limelight.limelight_importer.dto;

/**
 * table srch_rep_pept__prot_seq_v_id_tbl
 *
 */
public class SearchReportedPeptideProteinVersionDTO {

	private int searchId;
	private int reportedPeptideId;
	private int proteinSequenceVersionId;
	private boolean protein_IsDecoy;
	private boolean protein_IsIndependentDecoy;

	private boolean protein_meetsDefaultFilters;  // Set to True if NO Default Filters (Protein Filterable Annotation Types)

	@Override
	public String toString() {
		return "SearchReportedPeptideProteinVersionDTO [searchId=" + searchId + ", reportedPeptideId="
				+ reportedPeptideId + ", proteinSequenceVersionId=" + proteinSequenceVersionId + ", protein_IsDecoy="
				+ protein_IsDecoy + ", protein_IsIndependentDecoy=" + protein_IsIndependentDecoy
				+ ", protein_meetsDefaultFilters=" + protein_meetsDefaultFilters + "]";
	}
	

	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}

	public int getProteinSequenceVersionId() {
		return proteinSequenceVersionId;
	}
	public void setProteinSequenceVersionId(int proteinSequenceVersionId) {
		this.proteinSequenceVersionId = proteinSequenceVersionId;
	}
	public int getReportedPeptideId() {
		return reportedPeptideId;
	}
	public void setReportedPeptideId(int reportedPeptideId) {
		this.reportedPeptideId = reportedPeptideId;
	}
	public boolean isProtein_IsDecoy() {
		return protein_IsDecoy;
	}
	public void setProtein_IsDecoy(boolean protein_IsDecoy) {
		this.protein_IsDecoy = protein_IsDecoy;
	}
	public boolean isProtein_IsIndependentDecoy() {
		return protein_IsIndependentDecoy;
	}
	public void setProtein_IsIndependentDecoy(boolean protein_IsIndependentDecoy) {
		this.protein_IsIndependentDecoy = protein_IsIndependentDecoy;
	}
	public boolean isProtein_meetsDefaultFilters() {
		return protein_meetsDefaultFilters;
	}
	public void setProtein_meetsDefaultFilters(boolean protein_meetsDefaultFilters) {
		this.protein_meetsDefaultFilters = protein_meetsDefaultFilters;
	}
}
