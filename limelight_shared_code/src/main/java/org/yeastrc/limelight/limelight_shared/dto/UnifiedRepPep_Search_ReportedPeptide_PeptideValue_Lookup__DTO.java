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
 * Table unified_rp__search_reported_peptide_fltbl_value_lookup_tbl
 *
 */
public class UnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO {

	private int searchId;
	private int reportedPeptideId;
	private int annotationTypeId;
	private int unifiedReportedPeptideId;
	
	private boolean hasDynamicModifications;
	private boolean hasIsotopeLabels;
	
	private double peptideValueForAnnTypeId;
	
	

	//  Constructors
	
	public UnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO() { }
	
	public UnifiedRepPep_Search_ReportedPeptide_PeptideValue_Lookup__DTO( UnifiedRepPep_Search_ReportedPeptide__Lookup__DTO unifiedRepPep_Search_ReportedPeptide__Lookup__DTO ) {
		

		this.unifiedReportedPeptideId = unifiedRepPep_Search_ReportedPeptide__Lookup__DTO.getUnifiedReportedPeptideId();
		this.reportedPeptideId = unifiedRepPep_Search_ReportedPeptide__Lookup__DTO.getReportedPeptideId();
		this.searchId = unifiedRepPep_Search_ReportedPeptide__Lookup__DTO.getSearchId();
		
		this.hasDynamicModifications = unifiedRepPep_Search_ReportedPeptide__Lookup__DTO.isHasDynamicModifications();
		this.hasIsotopeLabels = unifiedRepPep_Search_ReportedPeptide__Lookup__DTO.isHasIsotopeLabels();
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

	public double getPeptideValueForAnnTypeId() {
		return peptideValueForAnnTypeId;
	}

	public void setPeptideValueForAnnTypeId(double peptideValueForAnnTypeId) {
		this.peptideValueForAnnTypeId = peptideValueForAnnTypeId;
	}
}
