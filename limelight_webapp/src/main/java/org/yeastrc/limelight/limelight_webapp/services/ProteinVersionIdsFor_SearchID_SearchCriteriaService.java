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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinVersionIdsFor_SearchID_ReportedPeptideId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;

/**
 * Get ProteinVersionIds For SearchId and Search Criteria
 *
 */
@Component
public class ProteinVersionIdsFor_SearchID_SearchCriteriaService implements ProteinVersionIdsFor_SearchID_SearchCriteriaServiceIF {

	private static final Logger log = LoggerFactory.getLogger( ProteinVersionIdsFor_SearchID_SearchCriteriaService.class );

	@Autowired
	private ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service;
	
	@Autowired
	private ProteinVersionIdsFor_SearchID_ReportedPeptideId_SearcherIF proteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher;
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.services.ProteinVersionIdsFor_SearchID_SearchCriteriaIF#getProteinVersionIdsFor_ProjSearchID_SearchCriteria(int, org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValuesSearchLevel)
	 */
	@Override
	public Set<Integer> getProteinVersionIdsFor_ProjSearchID_SearchCriteria( 
			int searchId,
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel
			) throws SQLException {
		
		Set<Integer> proteinVersionIds = new HashSet<>();
		
		final int minimumNumberOfPSMsPerReportedPeptide = 1;
		
		List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> peptideList = 
				reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList( searchId, searcherCutoffValuesSearchLevel, minimumNumberOfPSMsPerReportedPeptide );
				
		for ( ReportedPeptide_MinimalData_List_FromSearcher_Entry entry : peptideList ) {
			
			List<Integer> proteinVersionIdsForSearchIdReportedPeptideId = 
					proteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher
					.getProteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher( searchId, entry.getReportedPeptideId() );
			
			proteinVersionIds.addAll( proteinVersionIdsForSearchIdReportedPeptideId );
		}
		
		return proteinVersionIds;
	}
}
