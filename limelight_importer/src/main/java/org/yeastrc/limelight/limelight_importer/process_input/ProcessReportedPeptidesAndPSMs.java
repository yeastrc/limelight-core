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
package org.yeastrc.limelight.limelight_importer.process_input;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteins;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_importer.dao.PeptideDAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.ProteinSequenceDAO;
import org.yeastrc.limelight.limelight_importer.dao.ReportedPeptideDAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.SearchDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchDynamicModMassDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchIsotopeLabelDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchProteinVersionDAO;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer.dto.SearchProteinVersionDTO;
import org.yeastrc.limelight.limelight_importer.objects.PsmStatisticsAndBestValues;
import org.yeastrc.limelight.limelight_importer.objects.ReportedPeptideAndPsmFilterableAnnotationTypesOnId;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry;
import org.yeastrc.limelight.limelight_importer.process_input.ProcessSave_SingleReportedPeptide.ProcessSave_SingleReportedPeptide_Results;
import org.yeastrc.limelight.limelight_importer.unified_reported_peptide.UnifiedReportedPeptide_Main;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideDTO;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;

/**
 * 
 *
 */
public class ProcessReportedPeptidesAndPSMs {
	
	private static final Logger log = LoggerFactory.getLogger( ProcessReportedPeptidesAndPSMs.class );

	/**
	 * private constructor
	 */
	private ProcessReportedPeptidesAndPSMs(){}
	public static ProcessReportedPeptidesAndPSMs getInstance() {
		return new ProcessReportedPeptidesAndPSMs();
	}
	
	/**
	 * @param limelightInput
	 * @param search
	 * @param searchProgramEntryMap
	 * @param reportedPeptideAndPsmAndMatchedProteinsFilterableAnnotationTypesOnId
	 * @param searchScanFileEntry_KeyScanFilename
	 * @throws Exception
	 */
	public void processReportedPeptides( 
			LimelightInput limelightInput, 
			SearchDTO_Importer search,
			Map<String, SearchProgramEntry> searchProgramEntryMap,
			ReportedPeptideAndPsmFilterableAnnotationTypesOnId reportedPeptideAndPsmAndMatchedProteinsFilterableAnnotationTypesOnId,
			Map<String, SearchScanFileEntry> searchScanFileEntry_KeyScanFilename
			) throws Exception {
		
		int searchId = search.getId();
		
		// Put MatchedProteins in Singleton class GetProteinsForPeptides
		MatchedProteins matchedProteinsFromLimelightXML = limelightInput.getMatchedProteins();
		GetProteinsForPeptide.getInstance().setMatchedProteinsFromLimelightXML( matchedProteinsFromLimelightXML );
		
		Map<Integer, AnnotationTypeDTO> filterableReportedPeptideAnnotationTypesOnId = 
				reportedPeptideAndPsmAndMatchedProteinsFilterableAnnotationTypesOnId.getFilterableReportedPeptideAnnotationTypesOnId();
		Map<Integer, AnnotationTypeDTO> filterablePsmAnnotationTypesOnId = 
				reportedPeptideAndPsmAndMatchedProteinsFilterableAnnotationTypesOnId.getFilterablePsmAnnotationTypesOnId();

		boolean anyReportedPeptideHasAnyPsmsHasDynamicModifications = false;
		
		//////////////
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		if ( reportedPeptides != null ) {
			List<ReportedPeptide> reportedPeptideList =
					reportedPeptides.getReportedPeptide();
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {
				
				//  Inserted proteinSequenceVersionIds
				Set<Integer> proteinSequenceVersionIdsAll = new HashSet<>();
				
				//  Accumulate Unique Dynamic Mod Masses to insert into a lookup table
				Set<Double> uniqueDynamicModMassesForTheSearch = new HashSet<>();
				//  Accumulate Unique Isotope Label Ids to insert into a lookup table
				Set<Integer> uniqueIsotopeLabelIdsForTheSearch = new HashSet<>();
				
				ProcessSave_SingleReportedPeptide processSave_SingleReportedPeptide = ProcessSave_SingleReportedPeptide.getInstance();
				
				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					
					ProcessSave_SingleReportedPeptide_Results processSave_SingleReportedPeptide_Results = 
							processSave_SingleReportedPeptide.processSingleReportedPeptide(
									reportedPeptide, 
									proteinSequenceVersionIdsAll,
									searchId, 
									searchProgramEntryMap, 
									filterableReportedPeptideAnnotationTypesOnId,
									uniqueDynamicModMassesForTheSearch,
									uniqueIsotopeLabelIdsForTheSearch );

					if ( processSave_SingleReportedPeptide_Results == null ) {
						// Single Reported Peptide not processed
						continue; // EARLY CONTINUE
					}
					
					ReportedPeptideDTO savedReportedPeptideDTO = processSave_SingleReportedPeptide_Results.getReportedPeptideDTO();
					SearchReportedPeptideDTO savedSearchReportedPeptideDTO = processSave_SingleReportedPeptide_Results.getSearchReportedPeptideDTO();
					
					if ( savedSearchReportedPeptideDTO.isAnyPsmHasDynamicModifications() ) {
						anyReportedPeptideHasAnyPsmsHasDynamicModifications = true;
					}
					
					PsmStatisticsAndBestValues psmStatisticsAndBestValues =
							ProcessPSMsForReportedPeptide.getInstance()
							.savePSMs(
									reportedPeptide, 
									searchId, 
									savedReportedPeptideDTO, 
									searchProgramEntryMap,
									filterablePsmAnnotationTypesOnId,
									searchScanFileEntry_KeyScanFilename
									);

					UnifiedReportedPeptide_Main.getInstance()
					.unifiedReportedPeptide_MainProcessing( 
							reportedPeptide, 
							searchId, 
							savedReportedPeptideDTO,
							savedSearchReportedPeptideDTO,
							processSave_SingleReportedPeptide_Results.getSearchReportedPeptideFilterableAnnotationDTOList(),
							psmStatisticsAndBestValues, 
							filterableReportedPeptideAnnotationTypesOnId,
							processSave_SingleReportedPeptide_Results.getProteinVersionIdsForReportedPeptide().size() );
				}
				
				// Save unique values across all reported peptides
				
				insertUniqueProtinVersionIdsForTheSearch( proteinSequenceVersionIdsAll, searchId );
				insertUniqueDynamicModMassesForTheSearch( uniqueDynamicModMassesForTheSearch, searchId );
				insertIsotopeLabelIdsForTheSearch( uniqueIsotopeLabelIdsForTheSearch, searchId );
			}
		}
		
		if ( anyReportedPeptideHasAnyPsmsHasDynamicModifications ) {
			
			// Update search_tbl to set flag
			
			//  First commit any in progress bulk inserts 
			ImportRunImporterDBConnectionFactory.getInstance().commitInsertControlCommitConnection();
			
			SearchDAO.getInstance().updateAnyPsmHasDynamicModifications( searchId, true /* anyPsmHasDynamicModifications */ );
		}
		
		
		GetProteinsForPeptide.getInstance().logTotalElapsedTime();
		
		PeptideDAO_Importer.logTotalElapsedTimeAndCallCounts();
		ReportedPeptideDAO_Importer.logTotalElapsedTimeAndCallCounts();
		ProteinSequenceDAO.logTotalElapsedTimeAndCallCounts();
	}

	/**
	 * @param uniqueDynamicModMassesForTheSearch
	 * @throws Exception
	 */
	private void insertUniqueProtinVersionIdsForTheSearch( Set<Integer> proteinSequenceVersionIdsAll, int searchId ) throws Exception {

		SearchProteinVersionDTO item = new SearchProteinVersionDTO();
		item.setSearchId( searchId );
		
		for ( Integer proteinSequenceVersionId : proteinSequenceVersionIdsAll ) {
			item.setProteinSequenceVersionId( proteinSequenceVersionId );
			DB_Insert_SearchProteinVersionDAO.getInstance().save( item );
		}	
	}

	/**
	 * @param uniqueDynamicModMassesForTheSearch
	 * @throws Exception
	 */
	private void insertUniqueDynamicModMassesForTheSearch( 
			Set<Double> uniqueDynamicModMassesForTheSearch, int searchId ) throws Exception {
		for ( Double dynamicModMass : uniqueDynamicModMassesForTheSearch ) {
			
			DB_Insert_SearchDynamicModMassDAO.getInstance().saveSearchDynamicModMass( searchId, dynamicModMass );
		}	
	}

	/**
	 * @param uniqueIsotopeLabelIdsForTheSearch
	 * @throws Exception
	 */
	private void insertIsotopeLabelIdsForTheSearch( 
			Set<Integer> uniqueIsotopeLabelIdsForTheSearch, int searchId ) throws Exception {
		for ( Integer isotopeLabelId : uniqueIsotopeLabelIdsForTheSearch ) {
			
			DB_Insert_SearchIsotopeLabelDAO.getInstance().saveSearchIsotopeLabelId( searchId, isotopeLabelId );
		}	
	}
	
	
}
