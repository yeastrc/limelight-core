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
 * Table unified_reported_peptide_lookup_tbl
 *
 */
public class UnifiedReportedPeptideLookupDTO {

	private int id;
	private int peptideId;

	private boolean hasDynamicModifications;
	private boolean hasIsotopeLabels;

	private String sequence;
	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (hasDynamicModifications ? 1231 : 1237);
		result = prime * result + (hasIsotopeLabels ? 1231 : 1237);
		result = prime * result + id;
		result = prime * result + peptideId;
		result = prime * result + ((sequence == null) ? 0 : sequence.hashCode());
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
		UnifiedReportedPeptideLookupDTO other = (UnifiedReportedPeptideLookupDTO) obj;
		if (hasDynamicModifications != other.hasDynamicModifications)
			return false;
		if (hasIsotopeLabels != other.hasIsotopeLabels)
			return false;
		if (id != other.id)
			return false;
		if (peptideId != other.peptideId)
			return false;
		if (sequence == null) {
			if (other.sequence != null)
				return false;
		} else if (!sequence.equals(other.sequence))
			return false;
		return true;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPeptideId() {
		return peptideId;
	}

	public void setPeptideId(int peptideId) {
		this.peptideId = peptideId;
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

	public String getSequence() {
		return sequence;
	}

	public void setSequence(String sequence) {
		this.sequence = sequence;
	}

}
