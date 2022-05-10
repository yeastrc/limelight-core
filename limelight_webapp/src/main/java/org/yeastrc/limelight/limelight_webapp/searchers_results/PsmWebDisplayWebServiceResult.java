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
package org.yeastrc.limelight.limelight_webapp.searchers_results;

import java.math.BigDecimal;

/**
 * Result from PsmWebDisplaySearcher
 *
 */
public class PsmWebDisplayWebServiceResult {
	
	private long psmId;
	
	private boolean hasModifications; // PSM level Variable/Dynamic Modifications
	private boolean hasOpenModifications;
	private boolean hasReporterIons;
	
	private boolean psmIs_IndependentDecoy;
//	private boolean psmIs_decoy;  //  Remove since NOT returned from PsmWebDisplaySearcher 
	
	private int charge;
	private BigDecimal psm_precursor_RetentionTime; // precursor_retention_time
	private BigDecimal psm_precursor_MZ;            // precursor_m_z
	private int scanNumber;
	private Integer searchScanFileId;
	private String scanFilename;
	private Integer scanFileId;

	private int searchId;

	public long getPsmId() {
		return psmId;
	}
	public void setPsmId(long psmId) {
		this.psmId = psmId;
	}

	public String getScanFilename() {
		return scanFilename;
	}

	public void setScanFilename(String scanFilename) {
		this.scanFilename = scanFilename;
	}

	public int getSearchId() {
		return searchId;
	}

	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}

	public int getCharge() {
		return charge;
	}

	public void setCharge(int charge) {
		this.charge = charge;
	}

	public Integer getScanFileId() {
		return scanFileId;
	}

	public void setScanFileId(Integer scanFileId) {
		this.scanFileId = scanFileId;
	}
	public BigDecimal getPsm_precursor_RetentionTime() {
		return psm_precursor_RetentionTime;
	}
	public void setPsm_precursor_RetentionTime(BigDecimal psm_precursor_RetentionTime) {
		this.psm_precursor_RetentionTime = psm_precursor_RetentionTime;
	}
	public BigDecimal getPsm_precursor_MZ() {
		return psm_precursor_MZ;
	}
	public void setPsm_precursor_MZ(BigDecimal psm_precursor_MZ) {
		this.psm_precursor_MZ = psm_precursor_MZ;
	}
	public void setScanNumber(int scanNumber) {
		this.scanNumber = scanNumber;
	}
	public int getScanNumber() {
		return scanNumber;
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
	}
	public boolean isHasModifications() {
		return hasModifications;
	}
	public void setHasModifications(boolean hasModifications) {
		this.hasModifications = hasModifications;
	}
	public Integer getSearchScanFileId() {
		return searchScanFileId;
	}
	public void setSearchScanFileId(Integer searchScanFileId) {
		this.searchScanFileId = searchScanFileId;
	}
	public boolean isPsmIs_IndependentDecoy() {
		return psmIs_IndependentDecoy;
	}
	public void setPsmIs_IndependentDecoy(boolean psmIs_IndependentDecoy) {
		this.psmIs_IndependentDecoy = psmIs_IndependentDecoy;
	}
}
