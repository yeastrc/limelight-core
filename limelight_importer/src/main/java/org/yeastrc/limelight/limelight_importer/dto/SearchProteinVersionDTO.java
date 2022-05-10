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
 * table srch__prot_seq_v_id_tbl
 *
 */
public class SearchProteinVersionDTO {

	private int searchId;
	private int proteinSequenceVersionId;
	private boolean protein_IsDecoy;
	private boolean protein_IsIndependentDecoy;

	
	//  Put in a Set so hashCode/equals used for unique values

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + proteinSequenceVersionId;
		result = prime * result + (protein_IsDecoy ? 1231 : 1237);
		result = prime * result + (protein_IsIndependentDecoy ? 1231 : 1237);
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
		SearchProteinVersionDTO other = (SearchProteinVersionDTO) obj;
		if (proteinSequenceVersionId != other.proteinSequenceVersionId)
			return false;
		if (protein_IsDecoy != other.protein_IsDecoy)
			return false;
		if (protein_IsIndependentDecoy != other.protein_IsIndependentDecoy)
			return false;
		if (searchId != other.searchId)
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		return "SearchProteinVersionDTO [searchId=" + searchId + ", proteinSequenceVersionId="
				+ proteinSequenceVersionId + ", protein_IsDecoy=" + protein_IsDecoy + ", protein_IsIndependentDecoy="
				+ protein_IsIndependentDecoy + "]";
	}


	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}

	public int getProteinSequenceVersionId() {
		return proteinSequenceVersionId;
	}
	public void setProteinSequenceVersionId(int proteinSequenceVersionId) {
		this.proteinSequenceVersionId = proteinSequenceVersionId;
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
