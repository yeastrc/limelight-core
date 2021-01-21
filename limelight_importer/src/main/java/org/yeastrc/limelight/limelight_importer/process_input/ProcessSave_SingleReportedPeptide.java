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
import java.util.HashMap;
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
import org.yeastrc.limelight.limelight_import.api.xml_dto.PsmOpenModificationPosition;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideIsotopeLabel;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideIsotopeLabels;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_importer.dao.IsotopeLabelDAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.PeptideDAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.ProteinImporterContainerDAO;
import org.yeastrc.limelight.limelight_importer.dao.ReportedPeptideDAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_ProteinCoveragePeptideProteinProteinResidueDifferentDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchRepPeptSubGroup_DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchReportedPeptideDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchReportedPeptideProteinVersionDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SrchRepPeptDynamicModDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SrchRepPept_IsotopeLabel_DAO;
import org.yeastrc.limelight.limelight_importer.dto.ProteinSequenceVersionDTO;
import org.yeastrc.limelight.limelight_importer.dto.SearchReportedPeptideProteinVersionDTO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.ProteinImporterContainer;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_importer.peptide_protein_position.ProteinCoverageDTO_SaveToDB_NoDups;
import org.yeastrc.limelight.limelight_importer.process_input.GetProteinsForPeptide.GetProteinsForPeptideResult_EntryPerProtein;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.PeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.ProteinCoverageDTO;
import org.yeastrc.limelight.limelight_shared.dto.ProteinCoveragePeptideProteinProteinResidueDifferentDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchRepPeptSubGroupDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchSubGroupDTO;
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
		private Map<Integer,Set<String>> proteinResidueLetters_AllProteins_Map_Key_PeptidePosition;
		
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
		public Map<Integer, Set<String>> getProteinResidueLetters_AllProteins_Map_Key_PeptidePosition() {
			return proteinResidueLetters_AllProteins_Map_Key_PeptidePosition;
		}
		public void setProteinResidueLetters_AllProteins_Map_Key_PeptidePosition(
				Map<Integer, Set<String>> proteinResidueLetters_AllProteins_Map_Key_PeptidePosition) {
			this.proteinResidueLetters_AllProteins_Map_Key_PeptidePosition = proteinResidueLetters_AllProteins_Map_Key_PeptidePosition;
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
			boolean skip_SubGroup_Processing,
			Map<String, SearchSubGroupDTO> searchSubGroupDTOMap_Key_searchSubGroupLabel,
			Map<String, SearchProgramEntry> searchProgramEntryMap,
			Map<Integer, AnnotationTypeDTO> filterableReportedPeptideAnnotationTypesOnId,
			Set<Double> uniqueDynamicModMassesForTheSearch,
			Set<Integer> uniqueIsotopeLabelIdsForTheSearch
			) throws Exception {
		
		String reportedPeptideString = reportedPeptide.getReportedPeptideString();
		
		String peptideString = reportedPeptide.getSequence();
		int peptideLength = peptideString.length();
		 
				
		Set<Integer> peptidePositionsToGetProteinResidueLettersFor = getPeptidePositionsToGetProteinResidueLettersFor( reportedPeptide );
				
		GetProteinsForPeptide.GetProteinsForPeptideResult getProteinsForPeptideResult =
				GetProteinsForPeptide.getInstance().getProteinsForPeptide( reportedPeptide, peptidePositionsToGetProteinResidueLettersFor );
		
		Map<ProteinImporterContainer, GetProteinsForPeptideResult_EntryPerProtein> proteins_PeptidePositionsInProtein =
				getProteinsForPeptideResult.getProteins_EntryPerProtein();
				
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
		boolean anyPsmHasReporterIons = false;
		
		Set<String> searchSubGroups_AllPSMs = null;
		
		if ( ! skip_SubGroup_Processing ) {
			searchSubGroups_AllPSMs = new HashSet<>( searchSubGroupDTOMap_Key_searchSubGroupLabel.size() );
		}
		
		if ( reportedPeptide.getPsms() != null ) {
			for ( Psm psm : reportedPeptide.getPsms().getPsm() ) {

				if ( psm.getPsmModifications() != null 
						&& psm.getPsmModifications().getPsmModification() != null
						&& ( ! psm.getPsmModifications().getPsmModification().isEmpty() ) ) {

					anyPsmHasDynamicModifications = true;
					
					if ( anyPsmHasReporterIons ) {
						// also found anyPsmHasReporterIons so exit loop
						break;
					}
				}

				if ( psm.getReporterIons() != null 
						&& psm.getReporterIons().getReporterIon() != null
						&& ( ! psm.getReporterIons().getReporterIon().isEmpty() ) ) {

					anyPsmHasReporterIons = true;

					if ( anyPsmHasDynamicModifications ) {
						// also found anyPsmHasDynamicModifications so exit loop
						break;
					}
				}
				
				if ( ( ! skip_SubGroup_Processing ) && StringUtils.isNotEmpty( psm.getSubgroupName() ) ) {
					searchSubGroups_AllPSMs.add( psm.getSubgroupName() );
				}
			}
		}
		
		SearchReportedPeptideDTO searchReportedPeptideDTO = new SearchReportedPeptideDTO(); 
		searchReportedPeptideDTO.setSearchId( searchId );
		searchReportedPeptideDTO.setReportedPeptideId( reportedPeptideId );
		searchReportedPeptideDTO.setPeptideId( peptideId );
		searchReportedPeptideDTO.setAnyPsmHasDynamicModifications( anyPsmHasDynamicModifications );
		searchReportedPeptideDTO.setAnyPsmHasReporterIons( anyPsmHasReporterIons );
		DB_Insert_SearchReportedPeptideDAO.getInstance().saveToDatabaseIgnoreDuplicates( searchReportedPeptideDTO );
		
		List<SearchReportedPeptideFilterableAnnotationDTO> searchReportedPeptideFilterableAnnotationDTOList = 
				SaveSearchReportedPeptideAnnotations.getInstance()
				.saveReportedPeptideAnnotations( reportedPeptide, searchId, reportedPeptideDTO.getId(), searchProgramEntryMap, filterableReportedPeptideAnnotationTypesOnId );
		
		
		// Save Protein Mappings for Reported Peptide  "matched_protein_refs"    
		
		Set<Integer> proteinVersionIdsForReportedPeptide = new HashSet<>();
		
		Map<Integer,Set<String>> proteinResidueLetters_AllProteins_Map_Key_PeptidePosition = new HashMap<>();
				
		
		for ( Map.Entry<ProteinImporterContainer, GetProteinsForPeptideResult_EntryPerProtein> proteins_PeptidePositionsInProteinEntry : proteins_PeptidePositionsInProtein.entrySet() ) {
			
			ProteinImporterContainer proteinImporterContainer = proteins_PeptidePositionsInProteinEntry.getKey();
			
			GetProteinsForPeptideResult_EntryPerProtein getProteinsForPeptideResult_EntryPerProtein = proteins_PeptidePositionsInProteinEntry.getValue();
			Collection<Integer> peptidePositionsInProtein = getProteinsForPeptideResult_EntryPerProtein.getPeptidePositionInProteinList();
			Map<Integer,Set<ProteinCoveragePeptideProteinProteinResidueDifferentDTO>> diffResidue_Map_Key_PeptidePosition = getProteinsForPeptideResult_EntryPerProtein.getDiffResidue_Map_Key_PeptidePosition();
			
			{
				Map<Integer,Set<String>> proteinResidueLetters_Map_Key_PeptidePosition = getProteinsForPeptideResult_EntryPerProtein.getProteinResidueLetters_Map_Key_PeptidePosition();
				for ( Map.Entry<Integer,Set<String>> entry : proteinResidueLetters_Map_Key_PeptidePosition.entrySet() ) {
				
					Integer peptidePosition = entry.getKey();
					Set<String> singleProtein_ResidueLetters = entry.getValue();
					Set<String> proteinResidueLetters_AllProteins = proteinResidueLetters_AllProteins_Map_Key_PeptidePosition.get( peptidePosition );
					if ( proteinResidueLetters_AllProteins == null ) {
						proteinResidueLetters_AllProteins = new HashSet<>();
						proteinResidueLetters_AllProteins_Map_Key_PeptidePosition.put( peptidePosition, proteinResidueLetters_AllProteins );
					}
					proteinResidueLetters_AllProteins.addAll( singleProtein_ResidueLetters );
				}
			}
			
			boolean peptideProteinMatchNotExactMatch = ! diffResidue_Map_Key_PeptidePosition.isEmpty();
			
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
				proteinCoverageDTO.setPeptideProteinMatchNotExactMatch( peptideProteinMatchNotExactMatch );
				ProteinCoverageDTO_SaveToDB_NoDups.getInstance().proteinCoverageDTO_SaveToDB_NoDups( proteinCoverageDTO );
			}
			
			for ( Map.Entry<Integer,Set<ProteinCoveragePeptideProteinProteinResidueDifferentDTO>> entry : diffResidue_Map_Key_PeptidePosition.entrySet() ) {
				for ( ProteinCoveragePeptideProteinProteinResidueDifferentDTO item : entry.getValue() ) {
					item.setSearchId( searchId );
					item.setReportedPeptideId( reportedPeptideDTO.getId() );
					item.setPeptideIdInfoOnly( peptideDTO.getId() );
					item.setProteinSequenceVersionId( proteinSequenceVersionDTO.getId() );
					DB_Insert_ProteinCoveragePeptideProteinProteinResidueDifferentDAO.getInstance().save(item);
				}
			}
		}
		
		{
			PeptideModifications peptideModifications = reportedPeptide.getPeptideModifications();
			if ( peptideModifications != null ) {
				List<PeptideModification> peptideModificationList = peptideModifications.getPeptideModification();
				if ( peptideModificationList != null && ( ! peptideModificationList.isEmpty() ) ) {
					DB_Insert_SrchRepPeptDynamicModDAO dao = DB_Insert_SrchRepPeptDynamicModDAO.getInstance();
					
					for ( PeptideModification peptideModification : peptideModificationList ) {
						SrchRepPeptDynamicModDTO dto = new SrchRepPeptDynamicModDTO();
						BigDecimal massBD = peptideModification.getMass();
						if ( massBD == null ) {
							String msg = "mass on <peptide_modification> is missing.  reported peptide: " + reportedPeptideString;
							log.error( msg );
							throw new LimelightImporterDataException( msg );
						}
						double massDbl = massBD.doubleValue();
						dto.setMass( massDbl );
						
						if ( peptideModification.getPosition() != null ) {
							
							int position = peptideModification.getPosition().intValue();
							dto.setPosition( position );
							
							update_dto_Set_PeptideResidueLetter_ProteinResidueLetterIfAllSame( dto, reportedPeptide,
									reportedPeptideString, proteinResidueLetters_AllProteins_Map_Key_PeptidePosition );
						}
						
						//   For Database, set position to first or last position of peptide if N or C terminus is set
						if ( peptideModification.isIsNTerminal() != null && peptideModification.isIsNTerminal().booleanValue() ) {
							
							dto.setIs_N_Terminal(true);
							
							if ( peptideModification.getPosition() != null && peptideModification.getPosition().intValue() != 1 ) {
								String msg = "<peptide_modification> has \"is_n_terminal\" true and position value of other than 1.  reported peptide: " + reportedPeptideString;
								log.error( msg );
								throw new LimelightImporterDataException( msg );
							}
							dto.setPosition( 1 );

							update_dto_Set_PeptideResidueLetter_ProteinResidueLetterIfAllSame( dto, reportedPeptide, reportedPeptideString, proteinResidueLetters_AllProteins_Map_Key_PeptidePosition );
						}
						if ( peptideModification.isIsCTerminal() != null && peptideModification.isIsCTerminal().booleanValue() ) {
							
							dto.setIs_C_Terminal(true);

							if ( peptideModification.getPosition() != null && peptideModification.getPosition().intValue() != peptideString.length() ) {
								String msg = "<peptide_modification> has \"is_c_terminal\" true and position value of other than peptide length (" 
										+ peptideString.length()
										+ ").  reported peptide: " + reportedPeptideString;
								log.error( msg );
								throw new LimelightImporterDataException( msg );
							}
							dto.setPosition( peptideString.length() );
							
							update_dto_Set_PeptideResidueLetter_ProteinResidueLetterIfAllSame( dto, reportedPeptide, reportedPeptideString, proteinResidueLetters_AllProteins_Map_Key_PeptidePosition );
						}
						
						dto.setSearchId( searchId );
						dto.setReportedPeptideId( reportedPeptideId );
						dao.save( dto );
	
						//  Accumulate mod mass values across the search 
						uniqueDynamicModMassesForTheSearch.add( massDbl );
					}
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
		
		//  Save Search Sub Groups at Reported Peptide Level
		
		if ( ( ! skip_SubGroup_Processing ) && ( ! searchSubGroups_AllPSMs.isEmpty() ) ) {
			
			for ( String searchSubGroup : searchSubGroups_AllPSMs ) {
				SearchSubGroupDTO searchSubGroupDTO = searchSubGroupDTOMap_Key_searchSubGroupLabel.get( searchSubGroup );
				if ( searchSubGroupDTO == null ) {
					String msg = "Internal Importer Failure. searchSubGroupDTOMap_Key_searchSubGroupLabel.get( searchSubGroup ) return null. searchSubGroup: " + searchSubGroup;
					log.error( msg );
					throw new LimelightImporterInternalException( msg );
				}
				
				SearchRepPeptSubGroupDTO searchRepPeptSubGroupDTO = new SearchRepPeptSubGroupDTO();
				searchRepPeptSubGroupDTO.setSearchId( searchId );
				searchRepPeptSubGroupDTO.setReportedPeptideId( reportedPeptideId );
				searchRepPeptSubGroupDTO.setSearchSubGroupId( searchSubGroupDTO.getSearchSubGroupId() );
				
				DB_Insert_SearchRepPeptSubGroup_DAO.getInstance()
				.saveToDatabase(searchRepPeptSubGroupDTO);
			}
		}

		ProcessSave_SingleReportedPeptide_Results processSave_SingleReportedPeptide_Results = new ProcessSave_SingleReportedPeptide_Results();
		processSave_SingleReportedPeptide_Results.reportedPeptideDTO = reportedPeptideDTO;
		processSave_SingleReportedPeptide_Results.searchReportedPeptideDTO = searchReportedPeptideDTO;
		processSave_SingleReportedPeptide_Results.searchReportedPeptideFilterableAnnotationDTOList = searchReportedPeptideFilterableAnnotationDTOList;
		processSave_SingleReportedPeptide_Results.proteinVersionIdsForReportedPeptide = proteinVersionIdsForReportedPeptide;
		processSave_SingleReportedPeptide_Results.proteinResidueLetters_AllProteins_Map_Key_PeptidePosition = proteinResidueLetters_AllProteins_Map_Key_PeptidePosition;
		
		return processSave_SingleReportedPeptide_Results;
	}
	
	
	/**
	 * @param dto
	 * @param reportedPeptide
	 * @param reportedPeptideString
	 * @param proteinResidueLetters_AllProteins_Map_Key_PeptidePosition
	 * @throws LimelightImporterDataException
	 */
	private void update_dto_Set_PeptideResidueLetter_ProteinResidueLetterIfAllSame( 
			SrchRepPeptDynamicModDTO dto, 
			ReportedPeptide reportedPeptide,
			String reportedPeptideString,
			Map<Integer, Set<String>> proteinResidueLetters_AllProteins_Map_Key_PeptidePosition ) throws LimelightImporterDataException {
		
		int beginIndex = dto.getPosition() - 1; // change from 1 based to zero based
		int endIndex = beginIndex + 1;
		String peptideResidueLetter = reportedPeptide.getSequence().substring( beginIndex, endIndex );
		
		dto.setPeptideResidueLetter( peptideResidueLetter );
		
		Set<String> proteinResidueLetters_AllProteins = proteinResidueLetters_AllProteins_Map_Key_PeptidePosition.get( dto.getPosition() );
		if ( proteinResidueLetters_AllProteins == null ) {
			String msg = "proteinResidueLetters_AllProteins_Map_Key_PeptidePosition.get( position ) returned null.  reported peptide: " + reportedPeptideString;
			log.error(msg);
			throw new LimelightImporterDataException( msg );
		}
		if ( proteinResidueLetters_AllProteins.size() == 1 ) {
			String proteinResidueLetters_OnlyEntry = proteinResidueLetters_AllProteins.iterator().next();
			dto.setProteinResidueLetterIfAllSame(proteinResidueLetters_OnlyEntry);
		}
	}
	
	/**
	 * @param reportedPeptide
	 * @return
	 * @throws LimelightImporterDataException 
	 */
	private Set<Integer> getPeptidePositionsToGetProteinResidueLettersFor( ReportedPeptide reportedPeptide ) throws LimelightImporterDataException {
		
		Set<Integer> peptidePositionsToGetProteinResidueLettersFor = new HashSet<>();
	
		//  Peptide Level Variable Modifications

		PeptideModifications peptideModifications = reportedPeptide.getPeptideModifications();
		if ( peptideModifications != null ) {
			List<PeptideModification> peptideModificationList = peptideModifications.getPeptideModification();
			if ( peptideModificationList != null && ( ! peptideModificationList.isEmpty() ) ) {

				for ( PeptideModification peptideModification : peptideModificationList ) {

					int position = 0;
					if ( peptideModification.isIsNTerminal() != null && peptideModification.isIsNTerminal().booleanValue() ) {
						
						position = 1;
						
					} else if ( peptideModification.isIsCTerminal() != null && peptideModification.isIsCTerminal().booleanValue() ) {
					
						position = reportedPeptide.getSequence().length();
						
					} else if ( peptideModification.getPosition() != null ) {
						
						position = peptideModification.getPosition().intValue();
						
					} else {
						String msg = "Getting PSM level Open Modifications Positions: Not 'N' or 'C' term set and true or position set.";
						log.error(msg);
						throw new LimelightImporterDataException(msg);
					}
					
					peptidePositionsToGetProteinResidueLettersFor.add( position );
				}
			}
		}
		
		//  PSM level Open Modifications
		
		if ( reportedPeptide.getPsms() != null 
				&& reportedPeptide.getPsms().getPsm() != null && ( ! reportedPeptide.getPsms().getPsm().isEmpty() ) ) {
			for ( Psm psm : reportedPeptide.getPsms().getPsm() ) {
				
				if ( psm.getPsmOpenModification() != null 
						&& psm.getPsmOpenModification().getPsmOpenModificationPosition() != null 
						&& ( ! psm.getPsmOpenModification().getPsmOpenModificationPosition().isEmpty() ) ) {
					for ( PsmOpenModificationPosition psmOpenModificationPosition : psm.getPsmOpenModification().getPsmOpenModificationPosition() ) {
						
						int position = 0;
						if ( psmOpenModificationPosition.isIsNTerminal() != null && psmOpenModificationPosition.isIsNTerminal().booleanValue() ) {
							
							position = 1;
							
						} else if ( psmOpenModificationPosition.isIsCTerminal() != null && psmOpenModificationPosition.isIsCTerminal().booleanValue() ) {
						
							position = reportedPeptide.getSequence().length();
							
						} else if ( psmOpenModificationPosition.getPosition() != null ) {
							
							position = psmOpenModificationPosition.getPosition().intValue();
							
						} else {
							String msg = "Getting PSM level Open Modifications Positions: Not 'N' or 'C' term set and true or position set.";
							log.error(msg);
							throw new LimelightImporterDataException(msg);
						}
						
						peptidePositionsToGetProteinResidueLettersFor.add( position );
					}
				}
			}
		}
		
		return peptidePositionsToGetProteinResidueLettersFor;
	}

}
