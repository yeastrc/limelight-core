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
package org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers;

import java.util.Collection;
import java.util.List;

import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideFilterableAnnotationDTO;

/**
 * @author danj
 *
 */
public interface SearchReportedPeptide_FilterableAnnotationData_SearcherIF {

	/**
	 * @param searchId
	 * @param reportedPeptideId
	 * @param srchPgmFilterableReportedPeptideAnnotationTypeDTOList
	 * @return
	 * @throws Exception
	 */
	List<SearchReportedPeptideFilterableAnnotationDTO> getSearchReportedPeptideFilterableAnnotationDTOList(int searchId,
			int reportedPeptideId, Collection<Integer> annotationTypeIds) throws Exception;

}