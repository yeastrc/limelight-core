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
package org.yeastrc.limelight.limelight_importer.objects;

import java.util.Map;

import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;

/**
 * Created in ProcessLimelightInput
 *
 */
public class ReportedPeptideAndPsmFilterableAnnotationTypesOnId {
	
	private Map<Integer, AnnotationTypeDTO> filterableReportedPeptideAnnotationTypesOnId;
	private Map<Integer, AnnotationTypeDTO> filterablePsmAnnotationTypesOnId;
	
	public Map<Integer, AnnotationTypeDTO> getFilterableReportedPeptideAnnotationTypesOnId() {
		return filterableReportedPeptideAnnotationTypesOnId;
	}
	public void setFilterableReportedPeptideAnnotationTypesOnId(
			Map<Integer, AnnotationTypeDTO> filterableReportedPeptideAnnotationTypesOnId) {
		this.filterableReportedPeptideAnnotationTypesOnId = filterableReportedPeptideAnnotationTypesOnId;
	}
	public Map<Integer, AnnotationTypeDTO> getFilterablePsmAnnotationTypesOnId() {
		return filterablePsmAnnotationTypesOnId;
	}
	public void setFilterablePsmAnnotationTypesOnId(Map<Integer, AnnotationTypeDTO> filterablePsmAnnotationTypesOnId) {
		this.filterablePsmAnnotationTypesOnId = filterablePsmAnnotationTypesOnId;
	}
}
