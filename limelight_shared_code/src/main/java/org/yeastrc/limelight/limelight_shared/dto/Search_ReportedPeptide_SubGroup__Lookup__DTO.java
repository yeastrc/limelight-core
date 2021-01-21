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
 * Table search__rep_pept_sub_group_lookup_tbl
 *
 */
public class Search_ReportedPeptide_SubGroup__Lookup__DTO {


	private int searchId;
	private int reportedPeptideId;
	private int searchSubGroupId;

	private boolean anyPsmHasDynamicModifications;
	private boolean anyPsmHasOpenModifications;
	private boolean anyPsmHasReporterIons;
	private long psmIdSequentialStart;  // Only not zero if PSM Ids are sequential
	private long psmIdSequentialEnd;    // Only not zero if PSM Ids are sequential
	
	private int psmNumAtDefaultCutoff;

	@Override
	public String toString() {
		return "Search_ReportedPeptide_SubGroup__Lookup__DTO [searchId=" + searchId + ", reportedPeptideId="
				+ reportedPeptideId + ", searchSubGroupId=" + searchSubGroupId + ", anyPsmHasDynamicModifications="
				+ anyPsmHasDynamicModifications + ", anyPsmHasOpenModifications=" + anyPsmHasOpenModifications
				+ ", anyPsmHasReporterIons=" + anyPsmHasReporterIons + ", psmIdSequentialStart=" + psmIdSequentialStart
				+ ", psmIdSequentialEnd=" + psmIdSequentialEnd + ", psmNumAtDefaultCutoff=" + psmNumAtDefaultCutoff
				+ "]";
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
	public int getSearchSubGroupId() {
		return searchSubGroupId;
	}
	public void setSearchSubGroupId(int searchSubGroupId) {
		this.searchSubGroupId = searchSubGroupId;
	}
	public boolean isAnyPsmHasDynamicModifications() {
		return anyPsmHasDynamicModifications;
	}
	public void setAnyPsmHasDynamicModifications(boolean anyPsmHasDynamicModifications) {
		this.anyPsmHasDynamicModifications = anyPsmHasDynamicModifications;
	}
	public boolean isAnyPsmHasOpenModifications() {
		return anyPsmHasOpenModifications;
	}
	public void setAnyPsmHasOpenModifications(boolean anyPsmHasOpenModifications) {
		this.anyPsmHasOpenModifications = anyPsmHasOpenModifications;
	}
	public boolean isAnyPsmHasReporterIons() {
		return anyPsmHasReporterIons;
	}
	public void setAnyPsmHasReporterIons(boolean anyPsmHasReporterIons) {
		this.anyPsmHasReporterIons = anyPsmHasReporterIons;
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
	public int getPsmNumAtDefaultCutoff() {
		return psmNumAtDefaultCutoff;
	}
	public void setPsmNumAtDefaultCutoff(int psmNumAtDefaultCutoff) {
		this.psmNumAtDefaultCutoff = psmNumAtDefaultCutoff;
	}
}
