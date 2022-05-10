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
	
	private long psmIdSequentialStart__StartOf_Target_Psms;  // Only not zero if PSM Ids are sequential
	
	private Long psmIdSequentialStart__StartOf_IndependentDecoy_Psms; 	 // Only not null if have Independent Decoy PSMs 
	private Long psmIdSequentialStart__StartOf_Decoy_Psms;				 // Only not null if have Decoy PSMs
	
	private long psmIdSequentialEnd;    // Only not zero if PSM Ids are sequential
	
	private int psmNum_Targets_Only_AtDefaultCutoff;
	private int psmNum_IndependentDecoys_Only_AtDefaultCutoff;
	private int psmNum_Decoys_Only_AtDefaultCutoff;

	/**
	 * Not applicable if there are no Peptide filterable annotations
	 */
	private Yes_No__NOT_APPLICABLE_Enum peptideMeetsDefaultCutoffs;
	
	/**
	 * Computed after all PSMs have been inserted
	 */
	private Integer numUniquePsmAtDefaultCutoff;



	/**
	 * Only not null if have Independent Decoy PSMs
	 * @return
	 */
	public Long getPsmIdSequentialStart__StartOf_IndependentDecoy_Psms() {
		return psmIdSequentialStart__StartOf_IndependentDecoy_Psms;
	}
	public void setPsmIdSequentialStart__StartOf_IndependentDecoy_Psms(
			Long psmIdSequentialStart__StartOf_IndependentDecoy_Psms) {
		this.psmIdSequentialStart__StartOf_IndependentDecoy_Psms = psmIdSequentialStart__StartOf_IndependentDecoy_Psms;
	}
	/**
	 * Only not null if have Decoy PSMs
	 * @return
	 */
	public Long getPsmIdSequentialStart__StartOf_Decoy_Psms() {
		return psmIdSequentialStart__StartOf_Decoy_Psms;
	}
	
	public void setPsmIdSequentialStart__StartOf_Decoy_Psms(Long psmIdSequentialStart__StartOf_Decoy_Psms) {
		this.psmIdSequentialStart__StartOf_Decoy_Psms = psmIdSequentialStart__StartOf_Decoy_Psms;
	}
	public long getPsmIdSequentialStart__StartOf_Target_Psms() {
		return psmIdSequentialStart__StartOf_Target_Psms;
	}


	public void setPsmIdSequentialStart__StartOf_Target_Psms(long psmIdSequentialStart__StartOf_Target_Psms) {
		this.psmIdSequentialStart__StartOf_Target_Psms = psmIdSequentialStart__StartOf_Target_Psms;
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
