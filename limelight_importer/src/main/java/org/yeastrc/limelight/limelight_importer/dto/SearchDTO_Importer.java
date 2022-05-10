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
 * Table search_tbl for Importer
 *
 * Not all fields
 */
public class SearchDTO_Importer { 
	
	private int id;
	private String path;
	private String fastaFilename;
	private String directoryName;
	private boolean hasScanFilenames;
	private boolean hasScanData;
	private boolean hasIsotopeLabel;
	private boolean hasSearchSubGroups;
	private boolean anyPsmHasOpenModificationMasses;
	
	private boolean anyPsmHas_IsDecoy_True;
	private boolean anyPsmHas_IsIndependentDecoy_True;

	private boolean allPsmHave_Precursor_RetentionTime;
	private boolean allPsmHave_Precursor_M_Over_Z;
	
	private boolean psmIds_AreSequential; // All PSM Ids for the search are sequential - can use PSM Id ranges
	
	private boolean reportedPeptideMatchedProteinMappingProvided;
	
	private Integer createdByUserId;
	

	/**
	 * All PSM Ids for the search are sequential - can use PSM Id ranges
	 * @return
	 */
	public boolean isPsmIds_AreSequential() {
		return psmIds_AreSequential;
	}
	/**
	 * All PSM Ids for the search are sequential - can use PSM Id ranges
	 * @param psmIds_AreSequential
	 */
	public void setPsmIds_AreSequential(boolean psmIds_AreSequential) {
		this.psmIds_AreSequential = psmIds_AreSequential;
	}

	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getFastaFilename() {
		return fastaFilename;
	}
	public void setFastaFilename(String fastaFilename) {
		this.fastaFilename = fastaFilename;
	}
	public String getDirectoryName() {
		return directoryName;
	}
	public void setDirectoryName(String directoryName) {
		this.directoryName = directoryName;
	}
	public boolean isHasScanData() {
		return hasScanData;
	}
	public void setHasScanData(boolean hasScanData) {
		this.hasScanData = hasScanData;
	}
	public boolean isHasIsotopeLabel() {
		return hasIsotopeLabel;
	}
	public void setHasIsotopeLabel(boolean hasIsotopeLabel) {
		this.hasIsotopeLabel = hasIsotopeLabel;
	}
	public Integer getCreatedByUserId() {
		return createdByUserId;
	}
	public void setCreatedByUserId(Integer createdByUserId) {
		this.createdByUserId = createdByUserId;
	}
	public boolean isHasScanFilenames() {
		return hasScanFilenames;
	}
	public void setHasScanFilenames(boolean hasScanFilenames) {
		this.hasScanFilenames = hasScanFilenames;
	}
	public boolean isReportedPeptideMatchedProteinMappingProvided() {
		return reportedPeptideMatchedProteinMappingProvided;
	}
	public void setReportedPeptideMatchedProteinMappingProvided(boolean reportedPeptideMatchedProteinMappingProvided) {
		this.reportedPeptideMatchedProteinMappingProvided = reportedPeptideMatchedProteinMappingProvided;
	}
	public boolean isAnyPsmHasOpenModificationMasses() {
		return anyPsmHasOpenModificationMasses;
	}
	public void setAnyPsmHasOpenModificationMasses(boolean anyPsmHasOpenModificationMasses) {
		this.anyPsmHasOpenModificationMasses = anyPsmHasOpenModificationMasses;
	}
	public boolean isHasSearchSubGroups() {
		return hasSearchSubGroups;
	}
	public void setHasSearchSubGroups(boolean hasSearchSubGroups) {
		this.hasSearchSubGroups = hasSearchSubGroups;
	}
	public boolean isAnyPsmHas_IsDecoy_True() {
		return anyPsmHas_IsDecoy_True;
	}
	public void setAnyPsmHas_IsDecoy_True(boolean anyPsmHas_IsDecoy_True) {
		this.anyPsmHas_IsDecoy_True = anyPsmHas_IsDecoy_True;
	}
	public boolean isAnyPsmHas_IsIndependentDecoy_True() {
		return anyPsmHas_IsIndependentDecoy_True;
	}
	public void setAnyPsmHas_IsIndependentDecoy_True(boolean anyPsmHas_IsIndependentDecoy_True) {
		this.anyPsmHas_IsIndependentDecoy_True = anyPsmHas_IsIndependentDecoy_True;
	}
	public boolean isAllPsmHave_Precursor_RetentionTime() {
		return allPsmHave_Precursor_RetentionTime;
	}
	public void setAllPsmHave_Precursor_RetentionTime(boolean allPsmHave_Precursor_RetentionTime) {
		this.allPsmHave_Precursor_RetentionTime = allPsmHave_Precursor_RetentionTime;
	}
	public boolean isAllPsmHave_Precursor_M_Over_Z() {
		return allPsmHave_Precursor_M_Over_Z;
	}
	public void setAllPsmHave_Precursor_M_Over_Z(boolean allPsmHave_Precursor_M_Over_Z) {
		this.allPsmHave_Precursor_M_Over_Z = allPsmHave_Precursor_M_Over_Z;
	}
}
