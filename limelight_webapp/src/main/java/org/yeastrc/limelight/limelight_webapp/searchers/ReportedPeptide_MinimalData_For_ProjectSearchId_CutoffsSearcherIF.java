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

import java.util.List;

import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;

/**
 * @author danj
 *
	 * !!!  WARNING  !!!!
	 * 
	 * Call ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList(...) to get:
	 * 
	 *    1)  Correct call for Default Cutoffs when possible to get faster query
	 * 
 */
public interface ReportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcherIF {

	/**
	 * 
	 * !!!  WARNING  !!!!
	 * 
	 * Call ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList(...) to get:
	 * 
	 *    1)  Correct call for Default Cutoffs when possible to get faster query
	 * 
	 * 
	 * @param searchId
	 * @param searcherCutoffValuesSearchLevel
	 * @param minimumNumberOfPSMsPerReportedPeptide
	 * @return
	 * @throws SQLException
	 */
	List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> getPeptideDataList(int searchId,
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel, int minimumNumberOfPSMsPerReportedPeptide)
			throws Exception;

}