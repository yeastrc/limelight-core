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

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProtein;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteinLabel;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteins;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideModification;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideModifications;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PsmOpenModificationPosition;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_importer.dao.ProteinImporterContainerDAO;
import org.yeastrc.limelight.limelight_importer.dao.ProteinSequenceAnnotationDAO;
import org.yeastrc.limelight.limelight_importer.dao.ProteinSequenceDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_ProteinCoveragePeptideProteinProteinResidueDifferentDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchProteinVersionDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchReportedPeptideProteinVersionDAO;
import org.yeastrc.limelight.limelight_importer.dto.ProteinSequenceAnnotationDTO;
import org.yeastrc.limelight.limelight_importer.dto.ProteinSequenceVersionDTO;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer.dto.SearchProteinVersionDTO;
import org.yeastrc.limelight.limelight_importer.dto.SearchReportedPeptideProteinVersionDTO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects.Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object;
import org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects.Input_LimelightXMLFile_InternalHolder_Root_Object;
import org.yeastrc.limelight.limelight_importer.objects.ProteinImporterContainer;
import org.yeastrc.limelight.limelight_importer.objects.ReportedPeptideAndPsmFilterableAnnotationTypesOnId;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry_AllEntries;
import org.yeastrc.limelight.limelight_importer.peptide_protein_position.ProteinCoverageDTO_SaveToDB_NoDups;
import org.yeastrc.limelight.limelight_importer.process_input.GetProteinsForPeptide.GetProteinsForPeptideResult_EntryPerProtein;
import org.yeastrc.limelight.limelight_importer.utils.Create_ProteinSequenceAnnotationDTO_From_MatchedProteinLabel_Util;
import org.yeastrc.limelight.limelight_shared.dto.PeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.ProteinCoverageDTO;
import org.yeastrc.limelight.limelight_shared.dto.ProteinCoveragePeptideProteinProteinResidueDifferentDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter;

/**
 * 
 *
 */
public class Process_PeptidesToProteinsMapping_ProteinInference_InsertProteins {

	private static final Logger log = LoggerFactory.getLogger( Process_PeptidesToProteinsMapping_ProteinInference_InsertProteins.class );

	/**
	 * private constructor
	 */
	private Process_PeptidesToProteinsMapping_ProteinInference_InsertProteins(){}
	public static Process_PeptidesToProteinsMapping_ProteinInference_InsertProteins getInstance() {
		return new Process_PeptidesToProteinsMapping_ProteinInference_InsertProteins();
	}

	/**
	 * @param limelightInput
	 * @param search
	 * @param searchProgramEntryMap
	 * @param reportedPeptideAndPsmAndMatchedProteinsFilterableAnnotationTypesOnId
	 * @param searchScanFileEntry_KeyScanFilename
	 * @throws Exception
	 */
	public void process_PeptidesToProteinsMapping_ProteinInference_InsertProteins( 
			Input_LimelightXMLFile_InternalHolder_Root_Object input_LimelightXMLFile_InternalHolder_Root_Object, 
			SearchDTO_Importer search,
			Map<String, SearchProgramEntry> searchProgramEntryMap,
			ReportedPeptideAndPsmFilterableAnnotationTypesOnId reportedPeptideAndPsmAndMatchedProteinsFilterableAnnotationTypesOnId,
			SearchScanFileEntry_AllEntries searchScanFileEntry_AllEntries
			) throws Exception {

		{
			//  First update last_used_in_search_import in both tables so the record doesn't get deleted before the next step.

			update_field_last_used_in_search_import_To_NOW(input_LimelightXMLFile_InternalHolder_Root_Object);
			
			Thread.sleep( 100 ); // Short sleep before start looking up records
		}

		int searchId = search.getId();

		// Put MatchedProteins in Singleton class GetProteinsForPeptides
		MatchedProteins matchedProteinsFromLimelightXML = input_LimelightXMLFile_InternalHolder_Root_Object.getLimelightInput().getMatchedProteins();
		GetProteinsForPeptide.getSingletonInstance().setMatchedProteinsFromLimelightXML( matchedProteinsFromLimelightXML );

		//////////////

		if ( input_LimelightXMLFile_InternalHolder_Root_Object.is_Any_InternalHolder_ReportedPeptide_Objects() ) {

			//  Inserted proteinSequenceVersionIds
			Set<Integer> proteinSequenceVersionIdsAll = new HashSet<>();

			//  To be Inserted 
			Set<SearchProteinVersionDTO> searchProteinVersionDTO_ToBeInserted = new HashSet<>();

			int reportedPeptides_SearchImportInProgress_Counter = 0; // NOT a total counter. Is reset to zero.

			for ( Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object internalHolder_ReportedPeptide_Object : input_LimelightXMLFile_InternalHolder_Root_Object.get_InternalHolder_ReportedPeptide_Object_Unmodifiable() ) {

				{
					reportedPeptides_SearchImportInProgress_Counter++;
					if ( reportedPeptides_SearchImportInProgress_Counter > 400 ) {
						//  at 400th entry every 400 entry, Updates 'heart beat'
						Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.getSingletonInstance().saveOrUpdate_ForSearchId(search.getId());

						reportedPeptides_SearchImportInProgress_Counter = 0;  	//  reset
					}
				}

				// Save Protein Mappings for Reported Peptide  "matched_protein_refs"    

				Set<Integer> proteinVersionIdsForReportedPeptide = new HashSet<>();

				Map<Integer,Set<String>> proteinResidueLetters_AllProteins_Map_Key_PeptidePosition = new HashMap<>();

				internalHolder_ReportedPeptide_Object.setProteinVersionIdsForReportedPeptide( proteinVersionIdsForReportedPeptide );
				internalHolder_ReportedPeptide_Object.setProteinResidueLetters_AllProteins_Map_Key_PeptidePosition(proteinResidueLetters_AllProteins_Map_Key_PeptidePosition);


				ReportedPeptide reportedPeptide = internalHolder_ReportedPeptide_Object.getReportedPeptide();

				String reportedPeptideString = reportedPeptide.getReportedPeptideString();

				String peptideString = reportedPeptide.getSequence();
				int peptideLength = peptideString.length();


				Set<Integer> peptidePositionsToGetProteinResidueLettersFor = getPeptidePositionsToGetProteinResidueLettersFor( reportedPeptide );

				GetProteinsForPeptide.GetProteinsForPeptideResult getProteinsForPeptideResult =
						GetProteinsForPeptide.getSingletonInstance().getProteinsForPeptide( reportedPeptide, peptidePositionsToGetProteinResidueLettersFor );

				Map<ProteinImporterContainer, GetProteinsForPeptideResult_EntryPerProtein> proteins_PeptidePositionsInProtein =
						getProteinsForPeptideResult.getProteins_EntryPerProtein();

				//  If no proteins Mapped, throw error
				if ( proteins_PeptidePositionsInProtein.isEmpty() ) {

					String msg = "Failed to find any proteins for reported peptide: " + reportedPeptideString;
					log.error( msg );
					throw new LimelightImporterDataException(msg);
				}

				//  Already inserted into DB if necessary in class ReportedPeptideString_PeptideString_Query_InsertIfNeeded__All_ReportedPeptideObjects.
				ReportedPeptideDTO reportedPeptideDTO = internalHolder_ReportedPeptide_Object.getReportedPeptideDTO();

				//  Already inserted into DB if necessary in class ReportedPeptideString_PeptideString_Query_InsertIfNeeded__All_ReportedPeptideObjects.
				PeptideDTO peptideDTO =	internalHolder_ReportedPeptide_Object.getPeptideDTO();


				// Save Protein Mappings for Reported Peptide  "matched_protein_refs"    

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

					boolean protein_IsDecoy = false;
					boolean protein_IsIndependentDecoy = false;

					{
						MatchedProtein matchedProtein = proteinImporterContainer.getMatchedProteinFromLimelightXMLFile();
						if ( matchedProtein.isIsDecoy() != null && matchedProtein.isIsDecoy().booleanValue() ) {
							protein_IsDecoy = true;
						}
						if ( matchedProtein.isIsIndependentDecoy() != null && matchedProtein.isIsIndependentDecoy().booleanValue() ) {
							protein_IsIndependentDecoy = true;
						}
					}

					{
						SearchProteinVersionDTO item = new SearchProteinVersionDTO();
						item.setSearchId(searchId);
						item.setProteinSequenceVersionId(proteinSequenceVersionDTO.getId());
						item.setProtein_IsDecoy(protein_IsDecoy);
						item.setProtein_IsIndependentDecoy(protein_IsIndependentDecoy);
						searchProteinVersionDTO_ToBeInserted.add(item);
					}

					SearchReportedPeptideProteinVersionDTO searchReportedPeptideProteinVersionDTO = new SearchReportedPeptideProteinVersionDTO();
					searchReportedPeptideProteinVersionDTO.setProteinSequenceVersionId( proteinSequenceVersionDTO.getId() );
					searchReportedPeptideProteinVersionDTO.setSearchId( searchId );
					searchReportedPeptideProteinVersionDTO.setReportedPeptideId( reportedPeptideDTO.getId() );
					searchReportedPeptideProteinVersionDTO.setProtein_IsDecoy(protein_IsDecoy);
					searchReportedPeptideProteinVersionDTO.setProtein_IsIndependentDecoy(protein_IsIndependentDecoy);
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
						proteinCoverageDTO.setProtein_IsDecoy(protein_IsDecoy);
						proteinCoverageDTO.setProtein_IsIndependentDecoy(protein_IsIndependentDecoy);
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
			}


			insert_searchProteinVersionDTO_ToBeInserted( searchProteinVersionDTO_ToBeInserted, search );

		} // End if ( input_LimelightXMLFile_InternalHolder_Root_Object.is_Any_InternalHolder_ReportedPeptide_Objects() )

		GetProteinsForPeptide.getSingletonInstance().logTotalElapsedTime_SaveToImporterStatsTable( search );

		ProteinSequenceDAO.logTotalElapsedTimeAndCallCounts(search);
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

	/**
	 * @throws Exception
	 */
	private void insert_searchProteinVersionDTO_ToBeInserted( Set<SearchProteinVersionDTO> searchProteinVersionDTO_ToBeInserted, SearchDTO_Importer search ) throws Exception {

		int searchImportInProgress_Counter = 0; // NOT a total counter. Is reset to zero.

		for ( SearchProteinVersionDTO searchProteinVersionDTO : searchProteinVersionDTO_ToBeInserted ) {

			{
				searchImportInProgress_Counter++;
				if ( searchImportInProgress_Counter > 400 ) {
					//  at 400th entry every 400 entry, Updates 'heart beat'
					Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.getSingletonInstance().saveOrUpdate_ForSearchId(search.getId());

					searchImportInProgress_Counter = 0;  	//  reset
				}
			}

			DB_Insert_SearchProteinVersionDAO.getInstance().save( searchProteinVersionDTO );
		}	
	}



	/**
	 * update last_used_in_search_import in all tables so the record doesn't get deleted before the next step
	 * 
	 * @param input_LimelightXMLFile_InternalHolder_Root_Object
	 * @throws Exception 
	 */
	private void update_field_last_used_in_search_import_To_NOW(Input_LimelightXMLFile_InternalHolder_Root_Object input_LimelightXMLFile_InternalHolder_Root_Object) throws Exception {

		//  First update last_used_in_search_import in all tables so the record doesn't get deleted before the next step.

		//    Doing this here creates some time separation between when a record is updated last_used_in_search_import field and when it is searched for, even if just milliseconds

		final int update_DBRecords_BlockSize = 100;

		MatchedProteins matchedProteinsFromLimelightXML = input_LimelightXMLFile_InternalHolder_Root_Object.getLimelightInput().getMatchedProteins();

		if ( matchedProteinsFromLimelightXML == null ) {

			return; // EARLY RETURN
		}

		{
			//  First do Protein Sequence
			
			ProteinSequenceDAO proteinSequenceDAO = ProteinSequenceDAO.getInstance();

			List<String> proteinSequence_List = new ArrayList<>( update_DBRecords_BlockSize );

			int update_CurrentCount = 0;

			for ( MatchedProtein matchedProtein : matchedProteinsFromLimelightXML.getMatchedProtein() ) {

				update_CurrentCount++;

				//  Add to the batch

				proteinSequence_List.add( matchedProtein.getSequence() );

				if ( update_CurrentCount >= update_DBRecords_BlockSize ) {

					// Updates to DB of the current batch

					proteinSequenceDAO.update_last_used_in_search_import(proteinSequence_List);

					//  Reset holding Lists for next batch

					update_CurrentCount = 0;

					proteinSequence_List.clear();
				}

			}

			// Updates for final group

			if ( ! proteinSequence_List.isEmpty() ) {
				proteinSequenceDAO.update_last_used_in_search_import(proteinSequence_List);
			}
		}
		
		{
			//  Second do Protein Sequence Annotation
			
			ProteinSequenceAnnotationDAO proteinSequenceAnnotationDAO = ProteinSequenceAnnotationDAO.getInstance();

			for ( MatchedProtein matchedProtein : matchedProteinsFromLimelightXML.getMatchedProtein() ) {

				for ( MatchedProteinLabel matchedProteinLabel : matchedProtein.getMatchedProteinLabel() ) {

					ProteinSequenceAnnotationDTO annotationDTO = 
							Create_ProteinSequenceAnnotationDTO_From_MatchedProteinLabel_Util
							.create_ProteinSequenceAnnotationDTO_From_MatchedProteinLabel_Util( matchedProteinLabel );

					proteinSequenceAnnotationDAO.update_last_used_in_search_import(annotationDTO);
				}
			}
		}
	}

}
