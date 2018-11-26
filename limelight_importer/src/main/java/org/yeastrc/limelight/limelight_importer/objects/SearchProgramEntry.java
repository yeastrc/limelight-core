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
import org.yeastrc.limelight.limelight_shared.dto.SearchProgramsPerSearchDTO;

/**
 * 
 *
 */
public class SearchProgramEntry {

	private SearchProgramsPerSearchDTO searchProgramsPerSearchDTO;
	
	
	/**
	 * Key is name
	 */
	private Map<String, AnnotationTypeDTO> reportedPeptideAnnotationTypeDTOMap;

	/**
	 * Key is name
	 */
	private Map<String, AnnotationTypeDTO> psmAnnotationTypeDTOMap;

	/**
	 * Key is name
	 */
	private Map<String, AnnotationTypeDTO> matchedProteinAnnotationTypeDTOMap;

	
	
	
	
	public SearchProgramsPerSearchDTO getSearchProgramsPerSearchDTO() {
		return searchProgramsPerSearchDTO;
	}

	public void setSearchProgramsPerSearchDTO(
			SearchProgramsPerSearchDTO searchProgramsPerSearchDTO) {
		this.searchProgramsPerSearchDTO = searchProgramsPerSearchDTO;
	}

	public Map<String, AnnotationTypeDTO> getReportedPeptideAnnotationTypeDTOMap() {
		return reportedPeptideAnnotationTypeDTOMap;
	}

	public void setReportedPeptideAnnotationTypeDTOMap(
			Map<String, AnnotationTypeDTO> reportedPeptideAnnotationTypeDTOMap) {
		this.reportedPeptideAnnotationTypeDTOMap = reportedPeptideAnnotationTypeDTOMap;
	}

	public Map<String, AnnotationTypeDTO> getPsmAnnotationTypeDTOMap() {
		return psmAnnotationTypeDTOMap;
	}

	public void setPsmAnnotationTypeDTOMap(
			Map<String, AnnotationTypeDTO> psmAnnotationTypeDTOMap) {
		this.psmAnnotationTypeDTOMap = psmAnnotationTypeDTOMap;
	}

	public Map<String, AnnotationTypeDTO> getMatchedProteinAnnotationTypeDTOMap() {
		return matchedProteinAnnotationTypeDTOMap;
	}

	public void setMatchedProteinAnnotationTypeDTOMap(Map<String, AnnotationTypeDTO> matchedProteinAnnotationTypeDTOMap) {
		this.matchedProteinAnnotationTypeDTOMap = matchedProteinAnnotationTypeDTOMap;
	}
		

}
