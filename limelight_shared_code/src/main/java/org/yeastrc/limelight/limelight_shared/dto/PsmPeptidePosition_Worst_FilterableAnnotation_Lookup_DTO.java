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
 * table psm_peptide_position_worst_filterable_annotation_lookup_tbl
 * 
 * The Worst value for this PSM Id and Annotation Id
 *
 */
public class PsmPeptidePosition_Worst_FilterableAnnotation_Lookup_DTO {

	private long psmId;

	private int annotationTypeId;
	
	private double worstValueDouble;

	public long getPsmId() {
		return psmId;
	}

	public void setPsmId(long psmId) {
		this.psmId = psmId;
	}

	public int getAnnotationTypeId() {
		return annotationTypeId;
	}

	public void setAnnotationTypeId(int annotationTypeId) {
		this.annotationTypeId = annotationTypeId;
	}

	public double getWorstValueDouble() {
		return worstValueDouble;
	}

	public void setWorstValueDouble(double worstValueDouble) {
		this.worstValueDouble = worstValueDouble;
	}
	


}
