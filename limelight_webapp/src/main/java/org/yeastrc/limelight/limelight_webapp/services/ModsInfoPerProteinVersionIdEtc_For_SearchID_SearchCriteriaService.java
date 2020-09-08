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
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.yeastrc.limelight.limelight_shared.dto.ProteinCoverageDTO;
import org.yeastrc.limelight.limelight_shared.dto.SrchRepPeptDynamicModDTO;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinCoverage_For_SearchIdReportedPeptideId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SrchRepPept_DynamicMod_For_SearchIdReportedPeptideId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services_result_objects.ModsInfoPerPerProteinSeqVersionIdRoot;
import org.yeastrc.limelight.limelight_webapp.services_result_objects.ModsInfoPerPerProteinSeqVersionIdRoot.PerModMassEntry;

/**
 * Get Mods Info For SearchId and Search Criteria
 *
 * Mods Info
 */
@Controller
public class ModsInfoPerProteinVersionIdEtc_For_SearchID_SearchCriteriaService implements ModsInfoPerProteinVersionIdEtc_For_SearchID_SearchCriteriaServiceIF {

	private static final Logger log = LoggerFactory.getLogger( ModsInfoPerProteinVersionIdEtc_For_SearchID_SearchCriteriaService.class );

	@Autowired
	private ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service;
	
	@Autowired
	private ProteinCoverage_For_SearchIdReportedPeptideId_SearcherIF proteinCoverage_For_SearchIdReportedPeptideId_Searcher;
	
	@Autowired
	private SrchRepPept_DynamicMod_For_SearchIdReportedPeptideId_SearcherIF srchRepPept_DynamicMod_For_SearchIdReportedPeptideId_Searcher;
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.services.ModsInfoPerProteinVersionIdEtc_For_SearchID_SearchCriteriaServiceIF#getModsInfoPerProteinVersionIdEtc_For_SearchID_SearchCriteria(int, org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValuesSearchLevel)
	 */
	@Override
	public ModsInfoPerPerProteinSeqVersionIdRoot getModsInfoPerProteinVersionIdEtc_For_SearchID_SearchCriteria( 
			int searchId,
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel
			) throws SQLException {

		//  Result contains modMassesRoot, which is built by 
		//    're-organizing' the data retrieved from:
		//			proteinCoverageRecords_For_SearchID_SearchCriteriaService
		//			srchRepPept_DynamicMod_For_SearchIdReportedPeptideId_Searcher

		/**
		 * 
		 * Map<reported_peptide_id, Map<Mod Mass, PerModMassEntry>
		 */
		Map<Integer, Map<Double,PerModMassEntry>> dataPer_ReportedPeptides = new HashMap<>();

		//  Get proteinCoverageDTOList to get peptide positions on proteins. Includes ReportedPeptideId
		
		final int minimumNumberOfPSMsPerReportedPeptide = 1;

		List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> peptidesForSearchCriteriaList = 
				reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList(searchId, searcherCutoffValuesSearchLevel, minimumNumberOfPSMsPerReportedPeptide);

		for ( ReportedPeptide_MinimalData_List_FromSearcher_Entry entry : peptidesForSearchCriteriaList ) {
			
			Integer reportedPeptideId = entry.getReportedPeptideId();
						
			List<SrchRepPeptDynamicModDTO> srchRepPeptDynamicModDTOList = 
					srchRepPept_DynamicMod_For_SearchIdReportedPeptideId_Searcher
					.getSrchRepPept_DynamicMod_For_SearchIdReportedPeptideId( searchId, reportedPeptideId );
			
			if ( srchRepPeptDynamicModDTOList.isEmpty() ) {
				//  Empty so don't process it
				continue;  // EARLY CONTINUE
			}

			Map<Double,PerModMassEntry> dataPer_ModMass = new HashMap<>();

			List<ProteinCoverageDTO> proteinVersionIdsForSearchIdReportedPeptideId = 
					proteinCoverage_For_SearchIdReportedPeptideId_Searcher
					.getProteinCoverage_For_SearchIdReportedPeptideId( searchId, reportedPeptideId );

			//  Process Dynamic Mods on Reported Peptide
			for ( SrchRepPeptDynamicModDTO srchRepPeptDynamicModDTOEntry : srchRepPeptDynamicModDTOList ) {

				Double modMass = srchRepPeptDynamicModDTOEntry.getMass();
				Integer mod_ReportedPeptide_Position = srchRepPeptDynamicModDTOEntry.getPosition();
				
				PerModMassEntry perModMassEntry = dataPer_ModMass.get( modMass );
				if ( perModMassEntry == null ) {
					perModMassEntry = new PerModMassEntry();
					dataPer_ModMass.put( modMass, perModMassEntry );
				}
				
				perModMassEntry.addToModMassReportedPeptidePositions( mod_ReportedPeptide_Position );

				for ( ProteinCoverageDTO proteinCoverageDTO : proteinVersionIdsForSearchIdReportedPeptideId ) {

					Integer proteinSequenceVersionId = proteinCoverageDTO.getProteinSequenceVersionId();

					Integer mod_proteinPosition = 
							mod_ReportedPeptide_Position
							+ proteinCoverageDTO.getProteinStartPosition()
							- 1;
					
					/**
					 * Map<Protein Seq Version Id>,[Mod Positions On Protein]>
					 */
					Map<Integer,Set<Integer>> proteins = perModMassEntry.getProteins();
					
					Set<Integer> modPositionsOnProtein = proteins.get( proteinSequenceVersionId );
					if ( modPositionsOnProtein == null ) {
						modPositionsOnProtein = new HashSet<>();
						proteins.put( proteinSequenceVersionId, modPositionsOnProtein );
					}
					modPositionsOnProtein.add( mod_proteinPosition );
				}
			}
			
			dataPer_ReportedPeptides.put( reportedPeptideId, dataPer_ModMass );
		}

		
		
		ModsInfoPerPerProteinSeqVersionIdRoot result = new ModsInfoPerPerProteinSeqVersionIdRoot();
		result.setReportedPeptides( dataPer_ReportedPeptides );
		
		return result;
	}
}
