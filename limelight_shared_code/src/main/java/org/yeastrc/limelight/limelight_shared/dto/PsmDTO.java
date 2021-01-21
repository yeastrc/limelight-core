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

import java.math.BigDecimal;

/**
 * table psm_tbl
 *
 */
public class PsmDTO {

	private long id;
	private int searchId;
	private int reportedPeptideId;
	private int charge;
	private int scanNumber;
	private Integer searchScanFileId;
	private boolean hasModifications; //  Has PSM level Dynamic Modifications
	private boolean hasOpenModifications; //  Has PSM level Open Modifications
	private boolean hasReporterIons;
	private BigDecimal precursor_RetentionTime; // precursor_retention_time
	private BigDecimal precursor_MZ;            // precursor_m_z

	@Override
	public String toString() {
		return "PsmDTO [id=" + id + ", searchId=" + searchId + ", reportedPeptideId=" + reportedPeptideId + ", charge="
				+ charge + ", scanNumber=" + scanNumber + ", searchScanFileId=" + searchScanFileId
				+ ", hasModifications=" + hasModifications + ", hasOpenModifications=" + hasOpenModifications
				+ ", hasReporterIons=" + hasReporterIons + ", precursor_RetentionTime=" + precursor_RetentionTime
				+ ", precursor_MZ=" + precursor_MZ + "]";
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
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
	public int getCharge() {
		return charge;
	}
	public void setCharge(int charge) {
		this.charge = charge;
	}
	public int getScanNumber() {
		return scanNumber;
	}
	public void setScanNumber(int scanNumber) {
		this.scanNumber = scanNumber;
	}
	public Integer getSearchScanFileId() {
		return searchScanFileId;
	}
	public void setSearchScanFileId(Integer searchScanFilenameId) {
		this.searchScanFileId = searchScanFilenameId;
	}
	public boolean isHasModifications() {
		return hasModifications;
	}
	public void setHasModifications(boolean hasModifications) {
		this.hasModifications = hasModifications;
	}
	public BigDecimal getPrecursor_RetentionTime() {
		return precursor_RetentionTime;
	}
	public void setPrecursor_RetentionTime(BigDecimal precursor_RetentionTime) {
		this.precursor_RetentionTime = precursor_RetentionTime;
	}
	public BigDecimal getPrecursor_MZ() {
		return precursor_MZ;
	}
	public void setPrecursor_MZ(BigDecimal precursor_MZ) {
		this.precursor_MZ = precursor_MZ;
	}
	public boolean isHasReporterIons() {
		return hasReporterIons;
	}
	public void setHasReporterIons(boolean hasReporterIons) {
		this.hasReporterIons = hasReporterIons;
	}
	public boolean isHasOpenModifications() {
		return hasOpenModifications;
	}
	public void setHasOpenModifications(boolean hasOpenModifications) {
		this.hasOpenModifications = hasOpenModifications;
	}}
