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
 * Table search__rep_pept__lookup_tbl
 *
 */
public class Search_ReportedPeptide__Lookup__DTO {


	private int searchId;
	private int reportedPeptideId;

	private boolean hasDynamicModifications;
	private boolean hasIsotopeLabels;
	private boolean anyPsmHasDynamicModifications;
	private boolean anyPsmHasOpenModifications;
	private boolean anyPsmHasReporterIons;
	private boolean relatedPeptideUniqueForSearch;
	private long psmIdSequentialStart;  // Only not zero if PSM Ids are sequential
	private long psmIdSequentialEnd;    // Only not zero if PSM Ids are sequential
	
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
		return "Search_ReportedPeptide__Lookup__DTO [searchId=" + searchId + ", reportedPeptideId=" + reportedPeptideId
				+ ", hasDynamicModifications=" + hasDynamicModifications + ", hasOpenModifications="
				+ anyPsmHasOpenModifications + ", hasIsotopeLabels=" + hasIsotopeLabels + ", anyPsmHasDynamicModifications="
				+ anyPsmHasDynamicModifications + ", anyPsmHasReporterIons=" + anyPsmHasReporterIons
				+ ", relatedPeptideUniqueForSearch=" + relatedPeptideUniqueForSearch + ", psmIdSequentialStart="
				+ psmIdSequentialStart + ", psmIdSequentialEnd=" + psmIdSequentialEnd + ", psmNumAtDefaultCutoff="
				+ psmNumAtDefaultCutoff + ", peptideMeetsDefaultCutoffs=" + peptideMeetsDefaultCutoffs
				+ ", numUniquePsmAtDefaultCutoff=" + numUniquePsmAtDefaultCutoff + "]";
	}


	public long getPsmIdSequentialStart() {
		return psmIdSequentialStart;
	}


	public void setPsmIdSequentialStart(long psmIdSequentialStart) {
		this.psmIdSequentialStart = psmIdSequentialStart;
	}


	public long getPsmIdSequentialEnd() {
		return psmIdSequentialEnd;
	}


	public void setPsmIdSequentialEnd(long psmIdSequentialEnd) {
		this.psmIdSequentialEnd = psmIdSequentialEnd;
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


	public boolean isAnyPsmHasReporterIons() {
		return anyPsmHasReporterIons;
	}


	public void setAnyPsmHasReporterIons(boolean anyPsmHasReporterIons) {
		this.anyPsmHasReporterIons = anyPsmHasReporterIons;
	}


	public boolean isAnyPsmHasOpenModifications() {
		return anyPsmHasOpenModifications;
	}


	public void setAnyPsmHasOpenModifications(boolean anyPsmHasOpenModifications) {
		this.anyPsmHasOpenModifications = anyPsmHasOpenModifications;
	}
}
