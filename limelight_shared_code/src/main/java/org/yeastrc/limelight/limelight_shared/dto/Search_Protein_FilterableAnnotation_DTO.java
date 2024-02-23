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
 * table srch__rep_pept_filterable_annotation_tbl
 *
 */
public class Search_Protein_FilterableAnnotation_DTO  extends AnnotationDataFilterableBaseDTO {

	private int searchId;
	private int proteinSequenceVersionId;
	
	@Override
	public String toString() {
		return "Search_Protein_FilterableAnnotation_DTO [searchId=" + searchId + ", proteinSequenceVersionId="
				+ proteinSequenceVersionId + ", id=" + id + ", annotationTypeId=" + annotationTypeId + ", valueString="
				+ valueString + ", valueDouble=" + valueDouble + "]";
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

}
