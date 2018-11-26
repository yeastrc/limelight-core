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
package org.yeastrc.limelight.limelight_webapp.services;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.searcher_utils.DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataIF;
import org.yeastrc.limelight.limelight_webapp.searcher_utils.DefaultCutoffsExactlyMatchAnnTypeDataToSearchData.DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataResult;
import org.yeastrc.limelight.limelight_webapp.searchers.ReportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ReportedPeptide_MinimalData_For_ProjectSearchId_DefaultCutoffsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;

/**
 * Returns a minimal set of data for each reported peptide that meets the criteria
 * 
 * Criteria:
 *    Search Id
 *    Cutoffs for Reported Peptide Annotation Type Data
 *    Cutoffs for Best PSM Annotation Type Data at the Reported Peptide level
 *
 * 
 */
@Component
public class ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service implements ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF {

	@Autowired
	private DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataIF defaultCutoffsExactlyMatchAnnTypeDataToSearchData;
	
	@Autowired
	private ReportedPeptide_MinimalData_For_ProjectSearchId_DefaultCutoffsSearcherIF reportedPeptide_MinimalData_For_ProjectSearchId_DefaultCutoffsSearcher;
	
	@Autowired
	private ReportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcherIF reportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcher;
	
	/**
	 * @param searchId
	 * @param searcherCutoffValuesSearchLevel
	 * @param minimumNumberOfPSMsPerReportedPeptide
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<ReportedPeptide_MinimalData_List_FromSearcher_Entry>  getPeptideDataList( 
			int searchId, 
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel,
			int minimumNumberOfPSMsPerReportedPeptide ) throws SQLException {

		//  Determine if can use PSM count at Default Cutoff
		DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataResult defaultCutoffsExactlyMatchAnnTypeDataToSearchDataResult =
				defaultCutoffsExactlyMatchAnnTypeDataToSearchData
				.defaultCutoffsExactlyMatchAnnTypeDataToSearchData( searchId, searcherCutoffValuesSearchLevel );
		boolean defaultCutoffsExactlyMatchAnnTypeDataToSearchData =
				defaultCutoffsExactlyMatchAnnTypeDataToSearchDataResult.isDefaultCutoffsExactlyMatchAnnTypeDataToSearchData();

		if ( defaultCutoffsExactlyMatchAnnTypeDataToSearchData ) {
			
			return reportedPeptide_MinimalData_For_ProjectSearchId_DefaultCutoffsSearcher.getPeptideDataList( searchId, searcherCutoffValuesSearchLevel, minimumNumberOfPSMsPerReportedPeptide );
			
		} else {
			
			return reportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcher.getPeptideDataList( searchId, searcherCutoffValuesSearchLevel, minimumNumberOfPSMsPerReportedPeptide );
		}
		
	}
}
