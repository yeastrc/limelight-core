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
 * table protein_coverage_peptide_protein_residue_different_tbl
 */
public class ProteinCoveragePeptideProteinProteinResidueDifferentDTO {

	private int id;
	private int searchId;
	private int reportedPeptideId;
	private int peptideIdInfoOnly;
	private int proteinSequenceVersionId;
	private int peptidePosition;  //  In DB: MEDIUMINT
	private int proteinPosition;  //  In DB: MEDIUMINT
	private String peptideResidueLetter;
	private String proteinResidueLetter;

	//  id is not part of equals or hashCode

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + peptideIdInfoOnly;
		result = prime * result + peptidePosition;
		result = prime * result + ((peptideResidueLetter == null) ? 0 : peptideResidueLetter.hashCode());
		result = prime * result + proteinPosition;
		result = prime * result + ((proteinResidueLetter == null) ? 0 : proteinResidueLetter.hashCode());
		result = prime * result + proteinSequenceVersionId;
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
		ProteinCoveragePeptideProteinProteinResidueDifferentDTO other = (ProteinCoveragePeptideProteinProteinResidueDifferentDTO) obj;
		if (peptideIdInfoOnly != other.peptideIdInfoOnly)
			return false;
		if (peptidePosition != other.peptidePosition)
			return false;
		if (peptideResidueLetter == null) {
			if (other.peptideResidueLetter != null)
				return false;
		} else if (!peptideResidueLetter.equals(other.peptideResidueLetter))
			return false;
		if (proteinPosition != other.proteinPosition)
			return false;
		if (proteinResidueLetter == null) {
			if (other.proteinResidueLetter != null)
				return false;
		} else if (!proteinResidueLetter.equals(other.proteinResidueLetter))
			return false;
		if (proteinSequenceVersionId != other.proteinSequenceVersionId)
			return false;
		if (reportedPeptideId != other.reportedPeptideId)
			return false;
		if (searchId != other.searchId)
			return false;
		return true;
	}
	
	////
	@Override
	public String toString() {
		return "ProteinCoveragePeptideProteinProteinResidueDifferentDTO [id=" + id + ", searchId=" + searchId
				+ ", reportedPeptideId=" + reportedPeptideId + ", peptideIdInfoOnly=" + peptideIdInfoOnly
				+ ", proteinSequenceVersionId=" + proteinSequenceVersionId + ", peptidePosition=" + peptidePosition
				+ ", proteinPosition=" + proteinPosition + ", peptideResidueLetter=" + peptideResidueLetter
				+ ", proteinResidueLetter=" + proteinResidueLetter + "]";
	}

	
	//////////

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
	public int getPeptidePosition() {
		return peptidePosition;
	}
	public void setPeptidePosition(int peptidePosition) {
		this.peptidePosition = peptidePosition;
	}
	public int getProteinPosition() {
		return proteinPosition;
	}
	public void setProteinPosition(int proteinPosition) {
		this.proteinPosition = proteinPosition;
	}
	public String getPeptideResidueLetter() {
		return peptideResidueLetter;
	}
	public void setPeptideResidueLetter(String peptideResidueLetter) {
		this.peptideResidueLetter = peptideResidueLetter;
	}
	public String getProteinResidueLetter() {
		return proteinResidueLetter;
	}
	public void setProteinResidueLetter(String proteinResidueLetter) {
		this.proteinResidueLetter = proteinResidueLetter;
	}
	
}
