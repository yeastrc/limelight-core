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
 * Result for PsmsForScanNumberScanFilenameIdSearchIdSearcher
 *
 */
public class PsmsForScanNumberScanFilenameIdSearchId_Result {

	private long psmId;
	private int reportedPeptideId;
	private int scanNumber;
	private int charge;
	private BigDecimal precursor_RetentionTime; // precursor_retention_time
	private BigDecimal precursor_MZ;            // precursor_m_z
	
	private boolean psmIs_IndependentDecoy;     //  NOT return 'is_decoy' since Excluded in SQL
	
	public long getPsmId() {
		return psmId;
	}
	public void setPsmId(long psmId) {
		this.psmId = psmId;
	}
	public int getReportedPeptideId() {
		return reportedPeptideId;
	}
	public void setReportedPeptideId(int reportedPeptideId) {
		this.reportedPeptideId = reportedPeptideId;
	}
	public int getScanNumber() {
		return scanNumber;
	}
	public void setScanNumber(int scanNumber) {
		this.scanNumber = scanNumber;
	}
	public int getCharge() {
		return charge;
	}
	public void setCharge(int charge) {
		this.charge = charge;
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
	public boolean isPsmIs_IndependentDecoy() {
		return psmIs_IndependentDecoy;
	}
	public void setPsmIs_IndependentDecoy(boolean psmIs_IndependentDecoy) {
		this.psmIs_IndependentDecoy = psmIs_IndependentDecoy;
	}
	
}
