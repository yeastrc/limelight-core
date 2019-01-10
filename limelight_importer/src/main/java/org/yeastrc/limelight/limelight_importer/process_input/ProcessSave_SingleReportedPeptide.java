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

import java.math.BigDecimal;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideModification;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideModifications;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideIsotopeLabel;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideIsotopeLabels;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_importer.dao.IsotopeLabelDAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.PeptideDAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.ProteinImporterContainerDAO;
import org.yeastrc.limelight.limelight_importer.dao.ReportedPeptideDAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchReportedPeptideDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchReportedPeptideProteinVersionDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SrchRepPeptDynamicModDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SrchRepPept_IsotopeLabel_DAO;
import org.yeastrc.limelight.limelight_importer.dto.ProteinSequenceVersionDTO;
import org.yeastrc.limelight.limelight_importer.dto.SearchReportedPeptideProteinVersionDTO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.objects.ProteinImporterContainer;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_importer.peptide_protein_position.ProteinCoverageDTO_SaveToDB_NoDups;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.PeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.ProteinCoverageDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.SrchRepPeptDynamicModDTO;
import org.yeastrc.limelight.limelight_shared.dto.SrchRepPept_IsotopeLabel_DTO;

/**
 * Process and Save a Single Reported Peptide
 *
 */
public class ProcessSave_SingleReportedPeptide {

	private static final Logger log = LoggerFactory.getLogger( ProcessSave_SingleReportedPeptide.class );

	/**
	 * private constructor
	 */
	private ProcessSave_SingleReportedPeptide(){}
	public static ProcessSave_SingleReportedPeptide getInstance() {
		return new ProcessSave_SingleReportedPeptide();
	}
	
	/**
	 * 
	 *
	 */
	public static class ProcessSave_SingleReportedPeptide_Results {
		
		private List<SearchReportedPeptideFilterableAnnotationDTO> searchReportedPeptideFilterableAnnotationDTOList;
		private ReportedPeptideDTO reportedPeptideDTO;
		private SearchReportedPeptideDTO searchReportedPeptideDTO;
		private Set<Integer> proteinVersionIdsForReportedPeptide;
		
		public ReportedPeptideDTO getReportedPeptideDTO() {
			return reportedPeptideDTO;
		}
		public void setReportedPeptideDTO(ReportedPeptideDTO reportedPeptideDTO) {
			this.reportedPeptideDTO = reportedPeptideDTO;
		}
		public List<SearchReportedPeptideFilterableAnnotationDTO> getSearchReportedPeptideFilterableAnnotationDTOList() {
			return searchReportedPeptideFilterableAnnotationDTOList;
		}
		public void setSearchReportedPeptideFilterableAnnotationDTOList(
				List<SearchReportedPeptideFilterableAnnotationDTO> searchReportedPeptideFilterableAnnotationDTOList) {
			this.searchReportedPeptideFilterableAnnotationDTOList = searchReportedPeptideFilterableAnnotationDTOList;
		}
		public Set<Integer> getProteinVersionIdsForReportedPeptide() {
			return proteinVersionIdsForReportedPeptide;
		}
		public void setProteinVersionIdsForReportedPeptide(Set<Integer> proteinVersionIdsForReportedPeptide) {
			this.proteinVersionIdsForReportedPeptide = proteinVersionIdsForReportedPeptide;
		}
		public SearchReportedPeptideDTO getSearchReportedPeptideDTO() {
			return searchReportedPeptideDTO;
		}
		public void setSearchReportedPeptideDTO(SearchReportedPeptideDTO searchReportedPeptideDTO) {
			this.searchReportedPeptideDTO = searchReportedPeptideDTO;
		}
	}
	
	/**
	 * @param reportedPeptide
	 * @param searchId
	 * @param searchProgramEntryMap
	 * @param filterableReportedPeptideAnnotationTypesOnId
	 * @param uniqueDynamicModMassesForTheSearch
	 * @param uniqueIsotopeLabelIdsForTheSearch
	 * @return 
	 * @throws Exception
	 */
	public ProcessSave_SingleReportedPeptide_Results processSingleReportedPeptide(
			ReportedPeptide reportedPeptide,
			Set<Integer> proteinSequenceVersionIdsAll,
			int searchId, 
			Map<String, SearchProgramEntry> searchProgramEntryMap,
			Map<Integer, AnnotationTypeDTO> filterableReportedPeptideAnnotationTypesOnId,
			Set<Double> uniqueDynamicModMassesForTheSearch,
			Set<Integer> uniqueIsotopeLabelIdsForTheSearch
			) throws Exception {
		
		String reportedPeptideString = reportedPeptide.getReportedPeptideString();
		
		String peptideString = reportedPeptide.getSequence();
		int peptideLength = peptideString.length();
		
		GetProteinsForPeptide.GetProteinsForPeptideResult getProteinsForPeptideResult =
				GetProteinsForPeptide.getInstance().getProteinsForPeptide( reportedPeptide );
		
		Map<ProteinImporterContainer, Collection<Integer>> proteins_PeptidePositionsInProtein =
				getProteinsForPeptideResult.getProteins_PeptidePositionsInProtein();
				
		//  If no proteins Mapped, throw error
		if ( proteins_PeptidePositionsInProtein.isEmpty() ) {
			
			//  TODO   !!!!!!!!!  Put this back in place after load bad data
			
			String msg = "Failed to find any proteins for reported peptide: " + reportedPeptideString;
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		
		//  Retrieves reported_peptide record or inserts it if not in the database.
		ReportedPeptideDTO reportedPeptideDTO = ReportedPeptideDAO_Importer.getInstance().getReportedPeptideDTO_OrSave( reportedPeptideString );
		int reportedPeptideId = reportedPeptideDTO.getId();
		
		//  Retrieves reported_peptide record or inserts it if not in the database.
		PeptideDTO peptideDTO =	PeptideDAO_Importer.getInstance().getPeptideDTO_OrSave( peptideString );
		int peptideId = peptideDTO.getId();
		
		boolean anyPsmHasDynamicModifications = false;
		
		if ( reportedPeptide.getPsms() != null ) {
			for ( Psm psm : reportedPeptide.getPsms().getPsm() ) {

				if ( psm.getPsmModifications() != null 
						&& psm.getPsmModifications().getPsmModification() != null
						&& ( ! psm.getPsmModifications().getPsmModification().isEmpty() ) ) {

					anyPsmHasDynamicModifications = true;
					
					break;
				}
			}
		}
		
		SearchReportedPeptideDTO searchReportedPeptideDTO = new SearchReportedPeptideDTO(); 
		searchReportedPeptideDTO.setSearchId( searchId );
		searchReportedPeptideDTO.setReportedPeptideId( reportedPeptideId );
		searchReportedPeptideDTO.setPeptideId( peptideId );
		searchReportedPeptideDTO.setAnyPsmHasDynamicModifications( anyPsmHasDynamicModifications );
		DB_Insert_SearchReportedPeptideDAO.getInstance().saveToDatabaseIgnoreDuplicates( searchReportedPeptideDTO );
		
		List<SearchReportedPeptideFilterableAnnotationDTO> searchReportedPeptideFilterableAnnotationDTOList = 
				SaveSearchReportedPeptideAnnotations.getInstance()
				.saveReportedPeptideAnnotations( reportedPeptide, searchId, reportedPeptideDTO.getId(), searchProgramEntryMap, filterableReportedPeptideAnnotationTypesOnId );
		
		
		// Save Protein Mappings for Reported Peptide  "matched_protein_refs"    
		
		Set<Integer> proteinVersionIdsForReportedPeptide = new HashSet<>();

		for ( Map.Entry<ProteinImporterContainer, Collection<Integer>> proteins_PeptidePositionsInProteinEntry : proteins_PeptidePositionsInProtein.entrySet() ) {
			
			ProteinImporterContainer proteinImporterContainer = proteins_PeptidePositionsInProteinEntry.getKey();
			Collection<Integer> peptidePositionsInProtein = proteins_PeptidePositionsInProteinEntry.getValue();
			
			proteinImporterContainer.setSearchId( searchId );
			
			ProteinImporterContainerDAO.getInstance().saveProteinImporterContainerIfNeeded( proteinImporterContainer );
			
			ProteinSequenceVersionDTO proteinSequenceVersionDTO = proteinImporterContainer.getProteinSequenceVersionDTO();
			
			proteinVersionIdsForReportedPeptide.add( proteinSequenceVersionDTO.getId() );
			proteinSequenceVersionIdsAll.add( proteinSequenceVersionDTO.getId() );

			SearchReportedPeptideProteinVersionDTO searchReportedPeptideProteinVersionDTO = new SearchReportedPeptideProteinVersionDTO();
			searchReportedPeptideProteinVersionDTO.setProteinSequenceVersionId( proteinSequenceVersionDTO.getId() );
			searchReportedPeptideProteinVersionDTO.setSearchId( searchId );
			searchReportedPeptideProteinVersionDTO.setReportedPeptideId( reportedPeptideDTO.getId() );
			DB_Insert_SearchReportedPeptideProteinVersionDAO.getInstance().save( searchReportedPeptideProteinVersionDTO );
			
			//  Insert PeptideProteinPositionDTO record for protein coverage
			for ( Integer peptidePositionInProtein : peptidePositionsInProtein ) {
				ProteinCoverageDTO proteinCoverageDTO = new ProteinCoverageDTO();
				proteinCoverageDTO.setSearchId( searchId );
				proteinCoverageDTO.setReportedPeptideId( reportedPeptideDTO.getId() );
				proteinCoverageDTO.setPeptideIdInfoOnly( peptideDTO.getId() );
				proteinCoverageDTO.setProteinSequenceVersionId( proteinSequenceVersionDTO.getId() );
				proteinCoverageDTO.setProteinStartPosition( peptidePositionInProtein );
				proteinCoverageDTO.setProteinEndPosition( peptidePositionInProtein + peptideLength - 1 );
				ProteinCoverageDTO_SaveToDB_NoDups.getInstance().proteinCoverageDTO_SaveToDB_NoDups( proteinCoverageDTO );
			}
		}
		
		PeptideModifications peptideModifications = reportedPeptide.getPeptideModifications();
		if ( peptideModifications != null ) {
			List<PeptideModification> peptideModificationList = peptideModifications.getPeptideModification();
			if ( peptideModificationList != null && ( ! peptideModificationList.isEmpty() ) ) {
				DB_Insert_SrchRepPeptDynamicModDAO dao = DB_Insert_SrchRepPeptDynamicModDAO.getInstance();
				
				for ( PeptideModification peptideModification : peptideModificationList ) {
					SrchRepPeptDynamicModDTO dto = new SrchRepPeptDynamicModDTO();
					BigDecimal massBD = peptideModification.getMass();
					if ( massBD == null ) {
						String msg = "mass on peptideModification is missing.  reported peptide: " + reportedPeptideString;
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					}
					double massDbl = massBD.doubleValue();
					dto.setMass( massDbl );
					
					if ( peptideModification.getPosition() != null ) {
						dto.setPosition( peptideModification.getPosition().intValue() );
					}
					
					//   For Database, set position to first or last position of peptide if N or C terminus is set
					if ( peptideModification.isIsNTerminal() != null && peptideModification.isIsNTerminal().booleanValue() ) {
						dto.setIs_N_Terminal(true);
						dto.setPosition( 1 );
					}
					if ( peptideModification.isIsCTerminal() != null && peptideModification.isIsCTerminal().booleanValue() ) {
						dto.setIs_C_Terminal(true);
						dto.setPosition( peptideString.length() );
					}
					
					dto.setSearchId( searchId );
					dto.setReportedPeptideId( reportedPeptideId );
					dao.save( dto );

					//  Accumulate mod mass values across the search 
					uniqueDynamicModMassesForTheSearch.add( massDbl );
				}
			}
		}
		
		PeptideIsotopeLabels peptideIsotopeLabels = reportedPeptide.getPeptideIsotopeLabels();
		if ( peptideIsotopeLabels != null ) {
			PeptideIsotopeLabel peptideIsotopeLabel = peptideIsotopeLabels.getPeptideIsotopeLabel();
			if ( peptideIsotopeLabel != null ) {
				String label = peptideIsotopeLabel.getLabel();
				if ( StringUtils.isNotEmpty( label ) ) {
					Integer isotopeLabelId = IsotopeLabelDAO_Importer.getInstance().getIdForName( label );
					if ( isotopeLabelId == null ) {
						String msg = "No Isotope label record found for label string: '" + label + "'."
							+ "  reported peptide: " + reportedPeptideString;
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}
					SrchRepPept_IsotopeLabel_DTO dto = new SrchRepPept_IsotopeLabel_DTO();
					dto.setIsotopeLabelId( isotopeLabelId );
					dto.setSearchId( searchId );
					dto.setReportedPeptideId( reportedPeptideId );
					DB_Insert_SrchRepPept_IsotopeLabel_DAO.getInstance().saveToDatabase( dto );
				
					//  Accumulate Isotope label id values across the search
					uniqueIsotopeLabelIdsForTheSearch.add( isotopeLabelId );
				}
			}
		}

		ProcessSave_SingleReportedPeptide_Results processSave_SingleReportedPeptide_Results = new ProcessSave_SingleReportedPeptide_Results();
		processSave_SingleReportedPeptide_Results.reportedPeptideDTO = reportedPeptideDTO;
		processSave_SingleReportedPeptide_Results.searchReportedPeptideDTO = searchReportedPeptideDTO;
		processSave_SingleReportedPeptide_Results.searchReportedPeptideFilterableAnnotationDTOList = searchReportedPeptideFilterableAnnotationDTOList;
		processSave_SingleReportedPeptide_Results.proteinVersionIdsForReportedPeptide = proteinVersionIdsForReportedPeptide;
		
		return processSave_SingleReportedPeptide_Results;
	}
	
}
