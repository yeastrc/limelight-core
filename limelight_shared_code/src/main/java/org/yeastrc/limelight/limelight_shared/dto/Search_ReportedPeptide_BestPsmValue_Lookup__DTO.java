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
 * Table unified_rp__search__rep_pept__best_psm_value_lookup_tbl
 *
 */
public class Search_ReportedPeptide_BestPsmValue_Lookup__DTO {

	
	private int searchId;
	private int reportedPeptideId;
	private int annotationTypeId;
	
	private boolean hasDynamicModifications;
	private boolean hasIsotopeLabels;
	private boolean anyPsmHasReporterIons;
	
	private double bestPsmValueForAnnTypeId;
	private long psmIdForBestValue;
	
	//  Constructors
	
	public Search_ReportedPeptide_BestPsmValue_Lookup__DTO() { }

	public Search_ReportedPeptide_BestPsmValue_Lookup__DTO( Search_ReportedPeptide__Lookup__DTO search_ReportedPeptide__Lookup__DTO ) {

		this.reportedPeptideId = search_ReportedPeptide__Lookup__DTO.getReportedPeptideId();
		this.searchId = search_ReportedPeptide__Lookup__DTO.getSearchId();
		
		this.hasDynamicModifications = search_ReportedPeptide__Lookup__DTO.isHasDynamicModifications();
		this.hasIsotopeLabels = search_ReportedPeptide__Lookup__DTO.isHasIsotopeLabels();
		this.anyPsmHasReporterIons = search_ReportedPeptide__Lookup__DTO.isAnyPsmHasReporterIons();
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

	public boolean isAnyPsmHasReporterIons() {
		return anyPsmHasReporterIons;
	}

	public void setAnyPsmHasReporterIons(boolean anyPsmHasReporterIons) {
		this.anyPsmHasReporterIons = anyPsmHasReporterIons;
	}
	

}