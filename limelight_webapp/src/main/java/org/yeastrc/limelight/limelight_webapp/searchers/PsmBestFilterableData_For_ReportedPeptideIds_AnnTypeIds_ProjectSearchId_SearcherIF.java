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
package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher_Item;

/**
 * @author danj
 *
 */
public interface PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_SearcherIF {

	/**
	 * Only retrieving reported_peptide_id, annotation_type_id, best_psm_value_for_ann_type_id
	 * 
	 * @param searchId
	 * @param reportedPeptideIds
	 * @param annotationTypeIds
	 * @return
	 * @throws SQLException
	 */
	List<PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher_Item> getPsmBestFilterableAnnDataList_ObjectsNotFullyPopulated(
			int searchId, List<Integer> reportedPeptideIds, List<Integer> annotationTypeIds) throws SQLException;

}