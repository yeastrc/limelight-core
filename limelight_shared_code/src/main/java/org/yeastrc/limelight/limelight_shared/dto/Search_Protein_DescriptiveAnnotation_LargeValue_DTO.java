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
 * table srch__protein_desc_ann_large_value_tbl
 *
 */
public class Search_Protein_DescriptiveAnnotation_LargeValue_DTO {

	private long srchProteinDescriptiveAnnotationId;  // Holds unsigned int but use long since that is what is passed in from parent record
	
	private String valueString;

	public String getValueString() {
		return valueString;
	}

	public void setValueString(String valueString) {
		this.valueString = valueString;
	}

	public long getSrchProteinDescriptiveAnnotationId() {
		return srchProteinDescriptiveAnnotationId;
	}

	public void setSrchProteinDescriptiveAnnotationId(long srchProteinDescriptiveAnnotationId) {
		this.srchProteinDescriptiveAnnotationId = srchProteinDescriptiveAnnotationId;
	}

		
}
