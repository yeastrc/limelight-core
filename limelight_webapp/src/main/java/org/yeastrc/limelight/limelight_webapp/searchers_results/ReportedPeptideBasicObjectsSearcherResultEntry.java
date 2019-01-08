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
package org.yeastrc.limelight.limelight_webapp.searchers_results;

import java.util.Map;

import org.yeastrc.limelight.limelight_shared.dto.AnnotationDataBaseDTO;

/**
 * 
 *
 */
public class ReportedPeptideBasicObjectsSearcherResultEntry {

	private int reportedPeptideId;

	//  These are null if not computed
	private Integer numPsms;
//	private Integer numUniquePsms;
	
//  These are null if not retrieved
	private Map<Integer, AnnotationDataBaseDTO> psmAnnotationDTOMap;
	private Map<Integer, AnnotationDataBaseDTO> peptideAnnotationDTOMap;
	
	
	public int getReportedPeptideId() {
		return reportedPeptideId;
	}
	public void setReportedPeptideId(int reportedPeptideId) {
		this.reportedPeptideId = reportedPeptideId;
	}
	public Integer getNumPsms() {
		return numPsms;
	}
	public void setNumPsms(Integer numPsms) {
		this.numPsms = numPsms;
	}
	public Map<Integer, AnnotationDataBaseDTO> getPsmAnnotationDTOMap() {
		return psmAnnotationDTOMap;
	}
	public void setPsmAnnotationDTOMap(Map<Integer, AnnotationDataBaseDTO> psmAnnotationDTOMap) {
		this.psmAnnotationDTOMap = psmAnnotationDTOMap;
	}
	public Map<Integer, AnnotationDataBaseDTO> getPeptideAnnotationDTOMap() {
		return peptideAnnotationDTOMap;
	}
	public void setPeptideAnnotationDTOMap(Map<Integer, AnnotationDataBaseDTO> peptideAnnotationDTOMap) {
		this.peptideAnnotationDTOMap = peptideAnnotationDTOMap;
	}

}
