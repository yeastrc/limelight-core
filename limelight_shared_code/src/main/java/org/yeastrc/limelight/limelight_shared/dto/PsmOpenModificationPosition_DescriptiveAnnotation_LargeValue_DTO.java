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
 * table psm_open_modification_position_dscrptv_annttn_large_value_tbl
 *
 */
public class PsmOpenModificationPosition_DescriptiveAnnotation_LargeValue_DTO {

	private long psmOpenModificationPosition_DescriptiveAnnotationId;
	
	private String valueString;

	public String getValueString() {
		return valueString;
	}

	public void setValueString(String valueString) {
		this.valueString = valueString;
	}

	public long getPsmOpenModificationPosition_DescriptiveAnnotationId() {
		return psmOpenModificationPosition_DescriptiveAnnotationId;
	}

	public void setPsmOpenModificationPosition_DescriptiveAnnotationId(
			long psmOpenModificationPosition_DescriptiveAnnotationId) {
		this.psmOpenModificationPosition_DescriptiveAnnotationId = psmOpenModificationPosition_DescriptiveAnnotationId;
	}

	
}
