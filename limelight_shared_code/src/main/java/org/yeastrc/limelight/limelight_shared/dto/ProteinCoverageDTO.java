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
 * 
 * table protein_coverage_tbl
 */
public class ProteinCoverageDTO {

	private int id;
	private int searchId;
	private int reportedPeptideId;
	private int peptideIdInfoOnly;
	private int proteinSequenceVersionId;
	private int proteinStartPosition;
	private int proteinEndPosition;
	private boolean peptideProteinMatchNotExactMatch; //  Caused by "I" "L" equivalent and other causes
	private boolean protein_IsDecoy;
	private boolean protein_IsIndependentDecoy;

	//  id is not part of equals or hashCode

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + peptideIdInfoOnly;
		result = prime * result + (peptideProteinMatchNotExactMatch ? 1231 : 1237);
		result = prime * result + proteinEndPosition;
		result = prime * result + proteinSequenceVersionId;
		result = prime * result + proteinStartPosition;
		result = prime * result + (protein_IsDecoy ? 1231 : 1237);
		result = prime * result + (protein_IsIndependentDecoy ? 1231 : 1237);
		result = prime * result + reportedPeptideId;
		result = prime * result + searchId;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProteinCoverageDTO other = (ProteinCoverageDTO) obj;
		if (peptideIdInfoOnly != other.peptideIdInfoOnly)
			return false;
		if (peptideProteinMatchNotExactMatch != other.peptideProteinMatchNotExactMatch)
			return false;
		if (proteinEndPosition != other.proteinEndPosition)
			return false;
		if (proteinSequenceVersionId != other.proteinSequenceVersionId)
			return false;
		if (proteinStartPosition != other.proteinStartPosition)
			return false;
		if (protein_IsDecoy != other.protein_IsDecoy)
			return false;
		if (protein_IsIndependentDecoy != other.protein_IsIndependentDecoy)
			return false;
		if (reportedPeptideId != other.reportedPeptideId)
			return false;
		if (searchId != other.searchId)
			return false;
		return true;
	}
	
	/////
	
	@Override
	public String toString() {
		return "ProteinCoverageDTO [id=" + id + ", searchId=" + searchId + ", reportedPeptideId=" + reportedPeptideId
				+ ", peptideIdInfoOnly=" + peptideIdInfoOnly + ", proteinSequenceVersionId=" + proteinSequenceVersionId
				+ ", proteinStartPosition=" + proteinStartPosition + ", proteinEndPosition=" + proteinEndPosition
				+ ", peptideProteinMatchNotExactMatch=" + peptideProteinMatchNotExactMatch + ", protein_IsDecoy="
				+ protein_IsDecoy + ", protein_IsIndependentDecoy=" + protein_IsIndependentDecoy + "]";
	}

	/////
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
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
	public int getProteinStartPosition() {
		return proteinStartPosition;
	}
	public void setProteinStartPosition(int proteinStartPosition) {
		this.proteinStartPosition = proteinStartPosition;
	}
	public int getProteinEndPosition() {
		return proteinEndPosition;
	}
	public void setProteinEndPosition(int proteinEndPosition) {
		this.proteinEndPosition = proteinEndPosition;
	}
	public int getPeptideIdInfoOnly() {
		return peptideIdInfoOnly;
	}
	public void setPeptideIdInfoOnly(int peptideIdInfoOnly) {
		this.peptideIdInfoOnly = peptideIdInfoOnly;
	}
	public int getProteinSequenceVersionId() {
		return proteinSequenceVersionId;
	}
	public void setProteinSequenceVersionId(int proteinSequenceVersionId) {
		this.proteinSequenceVersionId = proteinSequenceVersionId;
	}
	public boolean isPeptideProteinMatchNotExactMatch() {
		return peptideProteinMatchNotExactMatch;
	}
	public void setPeptideProteinMatchNotExactMatch(boolean peptideProteinMatchNotExactMatch) {
		this.peptideProteinMatchNotExactMatch = peptideProteinMatchNotExactMatch;
	}
	public boolean isProtein_IsDecoy() {
		return protein_IsDecoy;
	}
	public void setProtein_IsDecoy(boolean protein_IsDecoy) {
		this.protein_IsDecoy = protein_IsDecoy;
	}
	public boolean isProtein_IsIndependentDecoy() {
		return protein_IsIndependentDecoy;
	}
	public void setProtein_IsIndependentDecoy(boolean protein_IsIndependentDecoy) {
		this.protein_IsIndependentDecoy = protein_IsIndependentDecoy;
	}

	
}
