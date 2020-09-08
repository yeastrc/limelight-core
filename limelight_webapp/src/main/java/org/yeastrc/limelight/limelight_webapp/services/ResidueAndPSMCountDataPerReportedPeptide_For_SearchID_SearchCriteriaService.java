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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.ProteinCoverageDTO;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.searchers.PeptideStringForSearchIdReportedPeptideIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinCoverage_For_SearchIdReportedPeptideId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmCountForSearchIdReportedPeptideIdCutoffsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptideBasicObjectsSearcherResultEntry;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services_result_objects.ResidueAndPSMCountDataPerReportedPeptide_Root;
import org.yeastrc.limelight.limelight_webapp.services_result_objects.ResidueAndPSMCountDataPerReportedPeptide_Root.PerReportedPeptideEntry;

/**
 * Retrieve PSM Count for Supplied Peptide Residues, Project Search ID and Search Criteria
 *
 */
@Component
public class ResidueAndPSMCountDataPerReportedPeptide_For_SearchID_SearchCriteriaService implements ResidueAndPSMCountDataPerReportedPeptide_For_SearchID_SearchCriteriaServiceIF {

	@Autowired
	private ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service;
	
	@Autowired
	private PeptideStringForSearchIdReportedPeptideIdSearcherIF peptideStringForSearchIdReportedPeptideIdSearcher;

	@Autowired
	private PsmCountForSearchIdReportedPeptideIdCutoffsSearcherIF psmCountForSearchIdReportedPeptideIdSearcher;

	@Autowired
	private ProteinCoverage_For_SearchIdReportedPeptideId_SearcherIF proteinCoverage_For_SearchIdReportedPeptideId_Searcher;
		
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.services.Psm_Count_For_Residues_For_SearchID_SearchCriteriaServiceIF#getPsm_Count_For_Residues_For_SearchID_SearchCriteriaService(java.util.List, int, org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel)
	 */
	@Override
	public ResidueAndPSMCountDataPerReportedPeptide_Root getPsm_Count_For_Residues_For_SearchID_SearchCriteriaService (
			List<String> residues,
			int searchId,
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws SQLException {

		/**
		 * Result
		 * 
		 * <Reported Peptide Id, PerReportedPeptideEntry>
		 */
		Map<Integer,PerReportedPeptideEntry> reportedPeptideData = new HashMap<>();
		
		//  Reported Peptide list from DB for search criteria

		final int minimumNumberOfPSMsPerReportedPeptide = 1;
		
		List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> peptideList = 
				reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList( searchId, searcherCutoffValuesSearchLevel, minimumNumberOfPSMsPerReportedPeptide );
				
		for ( ReportedPeptide_MinimalData_List_FromSearcher_Entry entry : peptideList ) {

			Integer reportedPeptideId = entry.getReportedPeptideId();
			
			String peptideSequence = peptideStringForSearchIdReportedPeptideIdSearcher.getPeptideSequenceStringForSearchIdReportedPeptideId( searchId, entry.getReportedPeptideId() );

			{
				boolean peptideSequenceContainsResidues = false;

				for ( String residue : residues ) {
					if ( peptideSequence.contains( residue ) ) {
						peptideSequenceContainsResidues = true;
						break;
					}
				}

				if ( ! peptideSequenceContainsResidues ) {
					//  peptide does not contain any of the residues
					continue;  // EARLY CONTINUE
				}
			}
			
			Integer numPsms = entry.getNumPsms_IfComputedOrInDB();
			if ( numPsms == null ) {
				numPsms = 
						psmCountForSearchIdReportedPeptideIdSearcher
						.getPsmCountForSearchIdReportedPeptideIdCutoffs( entry.getReportedPeptideId(), searchId, searcherCutoffValuesSearchLevel );
			}

			if ( numPsms == 0 ) {
				//  no PSMs for Reported Peptide at these cutoffs
				continue;  // EARLY CONTINUE
			}
			
			Map<String, Integer> perResidueCounts = new HashMap<>();

			for ( String residue : residues ) {
				
				int residueInstanceOnPeptide = StringUtils.countMatches( peptideSequence, residue );
				if ( residueInstanceOnPeptide > 0 ) {
					
					perResidueCounts.put( residue, residueInstanceOnPeptide );
				}
			}
			
			//      Get Protein Sequence Version Id values for Reported Peptide
			
			Map<Integer, List<Integer>> proteinSequenceVersionIdsPeptidePositions = new HashMap<>();
					
			List<ProteinCoverageDTO> proteinVersionIdsForSearchIdReportedPeptideId = 
					proteinCoverage_For_SearchIdReportedPeptideId_Searcher
					.getProteinCoverage_For_SearchIdReportedPeptideId( searchId, reportedPeptideId );

			for ( ProteinCoverageDTO item : proteinVersionIdsForSearchIdReportedPeptideId ) {
				List<Integer> peptidePositions = proteinSequenceVersionIdsPeptidePositions.get( item.getProteinSequenceVersionId() );
				if ( peptidePositions == null ) {
					peptidePositions = new ArrayList<>();
					proteinSequenceVersionIdsPeptidePositions.put( item.getProteinSequenceVersionId(), peptidePositions );
				}
				peptidePositions.add( item.getProteinStartPosition() );
			}
			
			if ( ! perResidueCounts.isEmpty() ) {
				
				PerReportedPeptideEntry perReportedPeptideEntry = new PerReportedPeptideEntry();
				
				perReportedPeptideEntry.setPeptideLength( peptideSequence.length() );
				perReportedPeptideEntry.setPerResidueCounts( perResidueCounts );
				perReportedPeptideEntry.setPsmCount( numPsms );
				perReportedPeptideEntry.setProteinSequenceVersionIdsPeptidePositions( proteinSequenceVersionIdsPeptidePositions );
				
				reportedPeptideData.put( reportedPeptideId, perReportedPeptideEntry );
			}
		}
		
		ResidueAndPSMCountDataPerReportedPeptide_Root methodResult = new ResidueAndPSMCountDataPerReportedPeptide_Root();
		methodResult.setReportedPeptideData( reportedPeptideData );
		
		return methodResult;
	}

}
