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

import org.yeastrc.limelight.limelight_shared.enum_classes.Yes_No__NOT_APPLICABLE_Enum;

/**
 * Table unified_rp__search__rep_pept__lookup_tbl
 *
 */
public class UnifiedRepPep_Search_ReportedPeptide__Lookup__DTO {


	private int searchId;
	private int reportedPeptideId;
	private int unifiedReportedPeptideId;

	private boolean hasDynamicModifications;
	private boolean hasIsotopeLabels;
	private boolean anyPsmHasDynamicModifications;
	private boolean relatedPeptideUniqueForSearch;
	
	private int psmNumAtDefaultCutoff;

	/**
	 * Not applicable if there are no Peptide filterable annotations
	 */
	private Yes_No__NOT_APPLICABLE_Enum peptideMeetsDefaultCutoffs;
	
	/**
	 * Computed after all PSMs have been inserted
	 */
	private Integer numUniquePsmAtDefaultCutoff;


	@Override
	public String toString() {
		return "UnifiedRepPep_Search_ReportedPeptide__Lookup__DTO [searchId=" + searchId + ", reportedPeptideId="
				+ reportedPeptideId + ", unifiedReportedPeptideId=" + unifiedReportedPeptideId
				+ ", hasDynamicModifications=" + hasDynamicModifications + ", hasIsotopeLabels=" + hasIsotopeLabels
				+ ", anyPsmHasDynamicModifications=" + anyPsmHasDynamicModifications
				+ ", relatedPeptideUniqueForSearch=" + relatedPeptideUniqueForSearch + ", psmNumAtDefaultCutoff="
				+ psmNumAtDefaultCutoff + ", peptideMeetsDefaultCutoffs=" + peptideMeetsDefaultCutoffs
				+ ", numUniquePsmAtDefaultCutoff=" + numUniquePsmAtDefaultCutoff + "]";
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

	public int getUnifiedReportedPeptideId() {
		return unifiedReportedPeptideId;
	}

	public void setUnifiedReportedPeptideId(int unifiedReportedPeptideId) {
		this.unifiedReportedPeptideId = unifiedReportedPeptideId;
	}

	public boolean isHasDynamicModifications() {
		return hasDynamicModifications;
	}

	public void setHasDynamicModifications(boolean hasDynamicModifications) {
		this.hasDynamicModifications = hasDynamicModifications;
	}

	public boolean isHasIsotopeLabels() {
		return hasIsotopeLabels;
	}

	public void setHasIsotopeLabels(boolean hasIsotopeLabels) {
		this.hasIsotopeLabels = hasIsotopeLabels;
	}

	public boolean isRelatedPeptideUniqueForSearch() {
		return relatedPeptideUniqueForSearch;
	}

	public void setRelatedPeptideUniqueForSearch(boolean relatedPeptideUniqueForSearch) {
		this.relatedPeptideUniqueForSearch = relatedPeptideUniqueForSearch;
	}

	public int getPsmNumAtDefaultCutoff() {
		return psmNumAtDefaultCutoff;
	}

	public void setPsmNumAtDefaultCutoff(int psmNumAtDefaultCutoff) {
		this.psmNumAtDefaultCutoff = psmNumAtDefaultCutoff;
	}

	public Yes_No__NOT_APPLICABLE_Enum getPeptideMeetsDefaultCutoffs() {
		return peptideMeetsDefaultCutoffs;
	}

	public void setPeptideMeetsDefaultCutoffs(Yes_No__NOT_APPLICABLE_Enum peptideMeetsDefaultCutoffs) {
		this.peptideMeetsDefaultCutoffs = peptideMeetsDefaultCutoffs;
	}


	public Integer getNumUniquePsmAtDefaultCutoff() {
		return numUniquePsmAtDefaultCutoff;
	}


	public void setNumUniquePsmAtDefaultCutoff(Integer numUniquePsmAtDefaultCutoff) {
		this.numUniquePsmAtDefaultCutoff = numUniquePsmAtDefaultCutoff;
	}


	public boolean isAnyPsmHasDynamicModifications() {
		return anyPsmHasDynamicModifications;
	}


	public void setAnyPsmHasDynamicModifications(boolean anyPsmHasDynamicModifications) {
		this.anyPsmHasDynamicModifications = anyPsmHasDynamicModifications;
	}

}
