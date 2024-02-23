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
 * table psm_modification_position_descriptive_annotation_tbl
 *
 */
public class PsmModificationPositionDescriptiveAnnotationDTO  extends AnnotationDataDescriptiveBaseDTO {

	private long psmId;
	private int search_ReportedPeptide_DynamicMod_Id;
	
	@Override
	public String toString() {
		return "PsmModificationPositionDescriptiveAnnotationDTO [psmId=" + psmId
				+ ", search_ReportedPeptide_DynamicMod_Id=" + search_ReportedPeptide_DynamicMod_Id + ", valueString="
				+ valueString + ", id=" + id + ", annotationTypeId=" + annotationTypeId + ", valueDouble=" + valueDouble
				+ "]";
	}
	
	public long getPsmId() {
		return psmId;
	}
	public void setPsmId(long psmId) {
		this.psmId = psmId;
	}
	public int getSearch_ReportedPeptide_DynamicMod_Id() {
		return search_ReportedPeptide_DynamicMod_Id;
	}
	public void setSearch_ReportedPeptide_DynamicMod_Id(int search_ReportedPeptide_DynamicMod_Id) {
		this.search_ReportedPeptide_DynamicMod_Id = search_ReportedPeptide_DynamicMod_Id;
	}
	
}
