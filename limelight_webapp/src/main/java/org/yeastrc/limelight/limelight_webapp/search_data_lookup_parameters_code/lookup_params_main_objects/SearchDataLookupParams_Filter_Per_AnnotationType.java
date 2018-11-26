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
package org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects;

/**
 * For requests for Single "Filter" per Annotation Type
 *
 * order on annotationTypeId
 */
public class SearchDataLookupParams_Filter_Per_AnnotationType implements Comparable<SearchDataLookupParams_Filter_Per_AnnotationType> {

	/**
	 * Annotation Type Id
	 */
	private Integer annTypeId;
	private Double value;

	/* (non-Javadoc)
	 * @see java.lang.Comparable#compareTo(java.lang.Object)
	 */
	@Override
	public int compareTo(SearchDataLookupParams_Filter_Per_AnnotationType o) {
		if ( annTypeId < o.annTypeId ) {
			return -1;
		}
		if ( annTypeId > o.annTypeId ) {
			return 1;
		}
		return 0;
	}
	
	/**
	 * Annotation Type Id
	 * @return
	 */
	public Integer getAnnTypeId() {
		return annTypeId;
	}
	/**
	 * Annotation Type Id
	 * @param annotationTypeId
	 */
	public void setAnnTypeId(Integer annotationTypeId) {
		this.annTypeId = annotationTypeId;
	}
	
	public Double getValue() {
		return value;
	}
	public void setValue(Double value) {
		this.value = value;
	}
}
