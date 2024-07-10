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
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveMatchedProteinAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveMatchedProteinAnnotationTypes;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableMatchedProteinAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableMatchedProteinAnnotationTypes;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProtein;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteinLabel;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteins;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideModification;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideModifications;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PsmOpenModificationPosition;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.SearchProgram;
import org.yeastrc.limelight.limelight_import.api.xml_dto.SearchProgram.MatchedProteinAnnotationTypes;
import org.yeastrc.limelight.limelight_import.api.xml_dto.SearchProgramInfo;
import org.yeastrc.limelight.limelight_import.api.xml_dto.SearchPrograms;
import org.yeastrc.limelight.limelight_importer.dao.ProteinImporterContainerDAO;
import org.yeastrc.limelight.limelight_importer.dao.ProteinSequenceAnnotationDAO;
import org.yeastrc.limelight.limelight_importer.dao.ProteinSequenceDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_ProteinCoveragePeptideProteinProteinResidueDifferent_BatchInserter_DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_ProteinCoverage_BatchInserter_DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchProteinVersionDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchReportedPeptideProteinVersion_BatchInserter_DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Search_Protein_DescriptiveAnnotation_AndChildren_BatchInserter_DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Search_Protein_FilterableAnnotation_BatchInserter_DAO;
import org.yeastrc.limelight.limelight_importer.dto.ProteinSequenceAnnotationDTO;
import org.yeastrc.limelight.limelight_importer.dto.ProteinSequenceVersionDTO;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer.dto.SearchReportedPeptideProteinVersionDTO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects.Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object;
import org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects.Input_LimelightXMLFile_InternalHolder_Root_Object;
import org.yeastrc.limelight.limelight_importer.objects.ProteinImporterContainer;
import org.yeastrc.limelight.limelight_importer.objects.ReportedPeptideAndPsmAndProtein_FilterableAnnotationTypesOnId;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry_AllEntries;
import org.yeastrc.limelight.limelight_importer.peptide_protein_position.ProteinCoverageDTO_SaveToDB_NoDups;
import org.yeastrc.limelight.limelight_importer.process_input.GetProteinsForPeptide.GetProteinsForPeptideResult_EntryPerProtein;
import org.yeastrc.limelight.limelight_importer.utils.Create_ProteinSequenceAnnotationDTO_From_MatchedProteinLabel_Util;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeFilterableDTO;
import org.yeastrc.limelight.limelight_shared.dto.PeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.ProteinCoverageDTO;
import org.yeastrc.limelight.limelight_shared.dto.ProteinCoveragePeptideProteinProteinResidueDifferentDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchProteinVersionDTO;
import org.yeastrc.limelight.limelight_shared.dto.Search_Protein_DescriptiveAnnotation_DTO;
import org.yeastrc.limelight.limelight_shared.dto.Search_Protein_FilterableAnnotation_DTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;
import org.yeastrc.limelight.limelight_shared.protein_coverage_common.Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util;
import org.yeastrc.limelight.limelight_shared.protein_coverage_common.Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util.Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util__Result;
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
			ReportedPeptideAndPsmAndProtein_FilterableAnnotationTypesOnId reportedPeptideAndPsmAndMatchedProteinsFilterableAnnotationTypesOnId,
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
			
			//////
			

			Set<Integer> annotationTypeIds_All_MatchedProtein_Filterable_Unmodifiable = null;
			Set<Integer> annotationTypeIds_All_MatchedProtein_Descriptive_Unmodifiable = null;
			
			{
				Set<Integer> annotationTypeIds_All_MatchedProtein_Filterable_Local_ToBuild = new HashSet<>();
				Set<Integer> annotationTypeIds_All_MatchedProtein_Descriptive_Local_ToBuild = new HashSet<>();

				for ( SearchProgramEntry searchProgramEntry : searchProgramEntryMap.values() ) {

					if ( searchProgramEntry.getMatchedProteinAnnotationTypeDTOMap() != null && ( ! searchProgramEntry.getMatchedProteinAnnotationTypeDTOMap().isEmpty() ) ) {
						for ( AnnotationTypeDTO annotationTypeDTO : searchProgramEntry.getMatchedProteinAnnotationTypeDTOMap().values() ) {
							if ( annotationTypeDTO.getFilterableDescriptiveAnnotationType() == FilterableDescriptiveAnnotationType.FILTERABLE ) {

								annotationTypeIds_All_MatchedProtein_Filterable_Local_ToBuild.add( annotationTypeDTO.getId() );

							} else if ( annotationTypeDTO.getFilterableDescriptiveAnnotationType() == FilterableDescriptiveAnnotationType.DESCRIPTIVE ) {

								annotationTypeIds_All_MatchedProtein_Descriptive_Local_ToBuild.add( annotationTypeDTO.getId() );

							} else {
								String msg = "annotationTypeDTO.getFilterableDescriptiveAnnotationType() NOT FILTERABLE or DESCRIPTIVE";
								log.error(msg);
								throw new LimelightImporterInternalException(msg);
							}
						}
					}
				}
				
				//  Copy to main as unmodifiable
				
				annotationTypeIds_All_MatchedProtein_Filterable_Unmodifiable = Collections.unmodifiableSet( annotationTypeIds_All_MatchedProtein_Filterable_Local_ToBuild );
				annotationTypeIds_All_MatchedProtein_Descriptive_Unmodifiable = Collections.unmodifiableSet( annotationTypeIds_All_MatchedProtein_Descriptive_Local_ToBuild );
			}
			
			//////
			
			int internal__MatchedProtein_SearchProteinVersionDTO__Holder_ToBeInserted_List_InitialSize =
					input_LimelightXMLFile_InternalHolder_Root_Object.get_InternalHolder_ReportedPeptide_Object_Unmodifiable().size() * 100;
			
			if ( internal__MatchedProtein_SearchProteinVersionDTO__Holder_ToBeInserted_List_InitialSize < 1000000 ) {
				internal__MatchedProtein_SearchProteinVersionDTO__Holder_ToBeInserted_List_InitialSize = 1000000;
			}

			//  Already Inserted 
			Map<Integer, SearchProteinVersionDTO> searchProteinVersionDTO_InsertedEntries_Map_Key_ProteinSequenceVersionId = new HashMap<>( internal__MatchedProtein_SearchProteinVersionDTO__Holder_ToBeInserted_List_InitialSize );
			
			/////

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

				
				//   Get Proteins for Peptide
				
				GetProteinsForPeptide.GetProteinsForPeptideResult getProteinsForPeptideResult =
						GetProteinsForPeptide.getSingletonInstance().getProteinsForPeptide( reportedPeptide, peptidePositionsToGetProteinResidueLettersFor );

				Map<ProteinImporterContainer, GetProteinsForPeptideResult_EntryPerProtein> proteins_PeptidePositionsInProtein = getProteinsForPeptideResult.getProteins_EntryPerProtein();

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

					SearchProteinVersionDTO searchProteinVersionDTO = searchProteinVersionDTO_InsertedEntries_Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionDTO.getId() );
					
					if ( searchProteinVersionDTO == null ) {

						searchProteinVersionDTO = create_And_Insert__SearchProteinVersionDTO__Return_SearchProteinVersionDTO( 

								proteinImporterContainer.getMatchedProteinFromLimelightXMLFile(),
								proteinSequenceVersionDTO,
								searchProgramEntryMap,
								search,
								annotationTypeIds_All_MatchedProtein_Filterable_Unmodifiable,
								annotationTypeIds_All_MatchedProtein_Descriptive_Unmodifiable
								);

						//  Save to Map for next proteinSequenceVersionDTO.getId()
						searchProteinVersionDTO_InsertedEntries_Map_Key_ProteinSequenceVersionId.put( proteinSequenceVersionDTO.getId(), searchProteinVersionDTO );
					}

					{
						SearchReportedPeptideProteinVersionDTO searchReportedPeptideProteinVersionDTO = new SearchReportedPeptideProteinVersionDTO();
						searchReportedPeptideProteinVersionDTO.setProteinSequenceVersionId( proteinSequenceVersionDTO.getId() );
						searchReportedPeptideProteinVersionDTO.setSearchId( searchId );
						searchReportedPeptideProteinVersionDTO.setReportedPeptideId( reportedPeptideDTO.getId() );
						searchReportedPeptideProteinVersionDTO.setProtein_IsDecoy( searchProteinVersionDTO.isProtein_IsDecoy() );
						searchReportedPeptideProteinVersionDTO.setProtein_IsIndependentDecoy( searchProteinVersionDTO.isProtein_IsIndependentDecoy() );
						searchReportedPeptideProteinVersionDTO.setProtein_meetsDefaultFilters( searchProteinVersionDTO.isProtein_meetsDefaultFilters() );
						
						DB_Insert_SearchReportedPeptideProteinVersion_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object( searchReportedPeptideProteinVersionDTO );
					}

					//  Insert PeptideProteinPositionDTO record for protein coverage
					for ( Integer peptidePositionInProtein : peptidePositionsInProtein ) {

						final String proteinSequence = proteinImporterContainer.getProteinSequenceDTO().getSequence();
						
						final int peptideStartPosition_InProtein = peptidePositionInProtein.intValue();

						//   Position of end of peptide in protein 
						final int peptideEndPosition_InProtein = peptidePositionInProtein + peptideLength - 1;
						
						Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util__Result result__Peptide_Pre_Post_Residues =
								Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util
								.compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util(
										proteinSequence, 
										peptideStartPosition_InProtein, 
										peptideEndPosition_InProtein
										);

						String protein_PreResidue = result__Peptide_Pre_Post_Residues.getProtein_PreResidue();
						String protein_PostResidue = result__Peptide_Pre_Post_Residues.getProtein_PostResidue();
						boolean peptideAtProteinStart_Flag = result__Peptide_Pre_Post_Residues.isPeptideAtProteinStart_Flag();
						boolean peptideAtProteinEnd_Flag = result__Peptide_Pre_Post_Residues.isPeptideAtProteinEnd_Flag();
						
						ProteinCoverageDTO proteinCoverageDTO = new ProteinCoverageDTO();
						proteinCoverageDTO.setSearchId( searchId );
						proteinCoverageDTO.setReportedPeptideId( reportedPeptideDTO.getId() );
						proteinCoverageDTO.setPeptideIdInfoOnly( peptideDTO.getId() );
						proteinCoverageDTO.setProteinSequenceVersionId( proteinSequenceVersionDTO.getId() );
						proteinCoverageDTO.setProteinStartPosition( peptidePositionInProtein );
						proteinCoverageDTO.setProteinEndPosition( peptidePositionInProtein + peptideLength - 1 );
						proteinCoverageDTO.setPeptideProteinMatchNotExactMatch( peptideProteinMatchNotExactMatch );
						proteinCoverageDTO.setProtein_IsDecoy( searchProteinVersionDTO.isProtein_IsDecoy() );
						proteinCoverageDTO.setProtein_IsIndependentDecoy( searchProteinVersionDTO.isProtein_IsIndependentDecoy() );
						proteinCoverageDTO.setProtein_PreResidue(protein_PreResidue);
						proteinCoverageDTO.setProtein_PostResidue(protein_PostResidue);
						proteinCoverageDTO.setPeptideAtProteinStart_Flag(peptideAtProteinStart_Flag);
						proteinCoverageDTO.setPeptideAtProteinEnd_Flag(peptideAtProteinEnd_Flag);
						
						ProteinCoverageDTO_SaveToDB_NoDups.getInstance().proteinCoverageDTO_SaveToDB_NoDups( proteinCoverageDTO );
					}

					for ( Map.Entry<Integer,Set<ProteinCoveragePeptideProteinProteinResidueDifferentDTO>> entry : diffResidue_Map_Key_PeptidePosition.entrySet() ) {
						for ( ProteinCoveragePeptideProteinProteinResidueDifferentDTO item : entry.getValue() ) {
							item.setSearchId( searchId );
							item.setReportedPeptideId( reportedPeptideDTO.getId() );
							item.setPeptideIdInfoOnly( peptideDTO.getId() );
							item.setProteinSequenceVersionId( proteinSequenceVersionDTO.getId() );
							DB_Insert_ProteinCoveragePeptideProteinProteinResidueDifferent_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object(item);
						}
					}
				}
			}


		} // End if ( input_LimelightXMLFile_InternalHolder_Root_Object.is_Any_InternalHolder_ReportedPeptide_Objects() )
		
		
		DB_Insert_Search_Protein_FilterableAnnotation_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
			
		DB_Insert_Search_Protein_DescriptiveAnnotation_AndChildren_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
		
		DB_Insert_ProteinCoverage_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
		
		DB_Insert_ProteinCoveragePeptideProteinProteinResidueDifferent_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
		
		
		{
			//  If there are Matched Protein level Filterable and/or Descriptive Type Annotations,
			//     Validate that ALL Matched Proteins have been Matched to Reported Peptides
			
			
			boolean found_ANY_MatchedProtein_Filterable_AndOr_Descriptive_Type_Annotations = false;

			SearchProgramInfo searchProgramInfo = input_LimelightXMLFile_InternalHolder_Root_Object.getLimelightInput().getSearchProgramInfo();
			
			if ( searchProgramInfo != null ) {
				SearchPrograms searchPrograms = searchProgramInfo.getSearchPrograms();
				if ( searchPrograms != null ) {
					List<SearchProgram> searchProgramList = searchPrograms.getSearchProgram();
					if ( searchProgramList != null ) {
						for ( SearchProgram searchProgram : searchProgramList ) {
							MatchedProteinAnnotationTypes matchedProteinAnnotationTypes = searchProgram.getMatchedProteinAnnotationTypes();
							if ( matchedProteinAnnotationTypes != null ) {
								{
									FilterableMatchedProteinAnnotationTypes filterableMatchedProteinAnnotationTypes = matchedProteinAnnotationTypes.getFilterableMatchedProteinAnnotationTypes();
									if ( filterableMatchedProteinAnnotationTypes != null ) {
										if ( ! filterableMatchedProteinAnnotationTypes.getFilterableMatchedProteinAnnotationType().isEmpty()  ) {

											//  Found Filterable so set to true and exit loop
											found_ANY_MatchedProtein_Filterable_AndOr_Descriptive_Type_Annotations = true;
											break;
										}
									}
								}
								{
									DescriptiveMatchedProteinAnnotationTypes descriptiveMatchedProteinAnnotationTypes = matchedProteinAnnotationTypes.getDescriptiveMatchedProteinAnnotationTypes();
									if ( descriptiveMatchedProteinAnnotationTypes != null ) {
										if ( ! descriptiveMatchedProteinAnnotationTypes.getDescriptiveMatchedProteinAnnotationType().isEmpty()  ) {
											found_ANY_MatchedProtein_Filterable_AndOr_Descriptive_Type_Annotations = true;
											break;
										}
									}
								}
							}
						}
					}
				}
			}
			
			if ( found_ANY_MatchedProtein_Filterable_AndOr_Descriptive_Type_Annotations ) {

				if ( ! GetProteinsForPeptide.getSingletonInstance().is_All_MatchedProteins_WereMatchedTo_ReportedPeptides() ) {

					String msg = "Not ALL Matched Proteins are Matched to Reported Peptides.  This is REQUIRED since Matched Proteins have Filterable and/or Descriptive Annotation Types.";
					log.error(msg);
					throw new LimelightImporterDataException(msg);

				}
			}
		}
		

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
	private SearchProteinVersionDTO create_And_Insert__SearchProteinVersionDTO__Return_SearchProteinVersionDTO( 
			
			MatchedProtein matchedProtein,
			ProteinSequenceVersionDTO proteinSequenceVersionDTO,
			
			Map<String, SearchProgramEntry> searchProgramEntryMap,
			SearchDTO_Importer search,

			Set<Integer> annotationTypeIds_All_MatchedProtein_Filterable_Unmodifiable,
			Set<Integer> annotationTypeIds_All_MatchedProtein_Descriptive_Unmodifiable
			
			) throws Exception {


		boolean protein_IsDecoy = false;
		boolean protein_IsIndependentDecoy = false;

		if ( matchedProtein.isIsDecoy() != null && matchedProtein.isIsDecoy().booleanValue() ) {
			protein_IsDecoy = true;
		}
		if ( matchedProtein.isIsIndependentDecoy() != null && matchedProtein.isIsIndependentDecoy().booleanValue() ) {
			protein_IsIndependentDecoy = true;
		}

		SearchProteinVersionDTO searchProteinVersionDTO = new SearchProteinVersionDTO();

		searchProteinVersionDTO.setSearchId( search.getId() );
		searchProteinVersionDTO.setProteinSequenceVersionId( proteinSequenceVersionDTO.getId() );
		searchProteinVersionDTO.setProtein_IsDecoy( protein_IsDecoy );
		searchProteinVersionDTO.setProtein_IsIndependentDecoy( protein_IsIndependentDecoy );

		Internal__MatchedProtein__Create__AnnotationRecrds_Determine_If_Filterable_Annotations_Pass_Default_FilterValues__ReturnObject create__AnnotationRecrds_Determine_If_Filterable_Annotations_Pass_Default_FilterValues__ReturnObject =
				matchedProtein__Create__AnnotationRecrds_Determine_If_Filterable_Annotations_Pass_Default_FilterValues( 

						matchedProtein,
						proteinSequenceVersionDTO,
						
						searchProgramEntryMap,
						search,

						annotationTypeIds_All_MatchedProtein_Filterable_Unmodifiable,
						annotationTypeIds_All_MatchedProtein_Descriptive_Unmodifiable
						
						);

		boolean protein_meetsDefaultFilters = create__AnnotationRecrds_Determine_If_Filterable_Annotations_Pass_Default_FilterValues__ReturnObject.protein_meetsDefaultFilters;

		searchProteinVersionDTO.setProtein_meetsDefaultFilters(protein_meetsDefaultFilters);
		
		DB_Insert_SearchProteinVersionDAO.getInstance().save( searchProteinVersionDTO );

		
		//  Save Filterable Annotation Data
		for ( Search_Protein_FilterableAnnotation_DTO search_Protein_FilterableAnnotation_DTO : create__AnnotationRecrds_Determine_If_Filterable_Annotations_Pass_Default_FilterValues__ReturnObject.search_Protein_FilterableAnnotation_DTO_List ) {
			
			DB_Insert_Search_Protein_FilterableAnnotation_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object(search_Protein_FilterableAnnotation_DTO);
		}
		
		//  Save Descriptive Annotation Data
		for ( Search_Protein_DescriptiveAnnotation_DTO search_Protein_DescriptiveAnnotation_DTO : create__AnnotationRecrds_Determine_If_Filterable_Annotations_Pass_Default_FilterValues__ReturnObject.search_Protein_DescriptiveAnnotation_DTO_List ) {
			
			DB_Insert_Search_Protein_DescriptiveAnnotation_AndChildren_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object( search_Protein_DescriptiveAnnotation_DTO );
		}
		
		return searchProteinVersionDTO;
	}	

	/**
	 * Returned from internal method 'matchedProtein__Create__AnnotationRecrds_Determine_If_Filterable_Annotations_Pass_Default_FilterValues'
	 *
	 */
	private static class Internal__MatchedProtein__Create__AnnotationRecrds_Determine_If_Filterable_Annotations_Pass_Default_FilterValues__ReturnObject {
		
		boolean protein_meetsDefaultFilters;
		
		List<Search_Protein_FilterableAnnotation_DTO> search_Protein_FilterableAnnotation_DTO_List;
		
		List<Search_Protein_DescriptiveAnnotation_DTO> search_Protein_DescriptiveAnnotation_DTO_List;
	}

	/**
	 * @param holder
	 * @param searchProgramEntryMap
	 * @return
	 * @throws Exception 
	 */
	private 
	
	Internal__MatchedProtein__Create__AnnotationRecrds_Determine_If_Filterable_Annotations_Pass_Default_FilterValues__ReturnObject
	
	matchedProtein__Create__AnnotationRecrds_Determine_If_Filterable_Annotations_Pass_Default_FilterValues(
			
			MatchedProtein matchedProtein,
			ProteinSequenceVersionDTO proteinSequenceVersionDTO,
			
			Map<String, SearchProgramEntry> searchProgramEntryMap,
			SearchDTO_Importer search,

			Set<Integer> annotationTypeIds_All_MatchedProtein_Filterable_Unmodifiable,
			Set<Integer> annotationTypeIds_All_MatchedProtein_Descriptive_Unmodifiable
			
			) throws Exception {


		Set<Integer> annotationTypeIds_All_MatchedProtein_Filterable_LocalCopy_ForDeletions = new HashSet<>( annotationTypeIds_All_MatchedProtein_Filterable_Unmodifiable );
		Set<Integer> annotationTypeIds_All_MatchedProtein_Descriptive_LocalCopy_ForDeletions = new HashSet<>( annotationTypeIds_All_MatchedProtein_Descriptive_Unmodifiable );
		
		Set<Integer> annotationTypeIds_All_MatchedProtein_Filterable_DuplicateCheck = new HashSet<>();
		Set<Integer> annotationTypeIds_All_MatchedProtein_Descriptive_DuplicateCheck = new HashSet<>();
		
		////

		List<Search_Protein_FilterableAnnotation_DTO> search_Protein_FilterableAnnotation_DTO_List = new ArrayList<>();
		
		List<Search_Protein_DescriptiveAnnotation_DTO> search_Protein_DescriptiveAnnotation_DTO_List = new ArrayList<>();
		
		////
		
		boolean protein_meetsDefaultFilters = true;  //  Default to true

		if ( matchedProtein.getMatchedProteinAnnotations() != null 
				&& matchedProtein.getMatchedProteinAnnotations().getFilterableMatchedProteinAnnotations() != null ) {

			if ( matchedProtein.getMatchedProteinAnnotations().getFilterableMatchedProteinAnnotations().getFilterableMatchedProteinAnnotation() != null
					&& ( ! matchedProtein.getMatchedProteinAnnotations().getFilterableMatchedProteinAnnotations().getFilterableMatchedProteinAnnotation().isEmpty() ) ) {

				//  Process Filterable Annotations on Matched Protein
				
				for ( FilterableMatchedProteinAnnotation filterableMatchedProteinAnnotation : matchedProtein.getMatchedProteinAnnotations().getFilterableMatchedProteinAnnotations().getFilterableMatchedProteinAnnotation() ) {

					SearchProgramEntry searchProgramEntry = searchProgramEntryMap.get( filterableMatchedProteinAnnotation.getSearchProgram() );
					if ( searchProgramEntry == null ) {
						//  TODO  Maybe change this exception text
						throw new LimelightImporterDataException( "'search_program' on 'matched_protein_filterable_annotation' not found in matched_protein filterable types: " + filterableMatchedProteinAnnotation.getSearchProgram() );
					}

					AnnotationTypeDTO annotationTypeDTO = searchProgramEntry.getMatchedProteinAnnotationTypeDTOMap().get( filterableMatchedProteinAnnotation.getAnnotationName() );
					if ( annotationTypeDTO == null ) {
						//  TODO  Maybe change this exception text
						throw new LimelightImporterDataException( "'annotation_name' on 'matched_protein_filterable_annotation' not found in matched_protein filterable types: " 
								+ filterableMatchedProteinAnnotation.getAnnotationName()
								+ ", 'search_program' : "
								+ filterableMatchedProteinAnnotation.getSearchProgram() );
					}

					if ( annotationTypeDTO.getFilterableDescriptiveAnnotationType() != FilterableDescriptiveAnnotationType.FILTERABLE ) {
						throw new LimelightImporterDataException( "'annotation_name' on 'matched_protein_filterable_annotation' is a 'filterable' type but in in matched_protein filterable types it is NOT a 'filterable' type: " 
								+ filterableMatchedProteinAnnotation.getAnnotationName()
								+ ", 'search_program' : "
								+ filterableMatchedProteinAnnotation.getSearchProgram() );
					}
					
					AnnotationTypeFilterableDTO annotationTypeFilterableDTO = annotationTypeDTO.getAnnotationTypeFilterableDTO();
					if ( annotationTypeFilterableDTO == null ) {
						throw new LimelightImporterInternalException( "annotationTypeDTO is FILTERABLE BUT annotationTypeDTO.getAnnotationTypeFilterableDTO() returned null. annotationTypeDTO.getId(): " + annotationTypeDTO.getId()
						+ ", Annotation name: " 
						+ filterableMatchedProteinAnnotation.getAnnotationName()
						+ ", 'search_program' : "
						+ filterableMatchedProteinAnnotation.getSearchProgram() );
					}
					
					if ( ! annotationTypeIds_All_MatchedProtein_Filterable_DuplicateCheck.add( annotationTypeDTO.getId() ) ) {
						//  Duplicate Search Program/Annotation Name under Matched Protein
						throw new LimelightImporterDataException( "'search_program' / 'annotation_name' on 'matched_protein_filterable_annotation' is duplicate. Annotation name: " 
								+ filterableMatchedProteinAnnotation.getAnnotationName()
								+ ", 'search_program' : "
								+ filterableMatchedProteinAnnotation.getSearchProgram() );
					}
					
					//  '.remove' for validating all entries in matched proteins types have entries in matched protein
					if ( ! annotationTypeIds_All_MatchedProtein_Filterable_LocalCopy_ForDeletions.remove( annotationTypeDTO.getId() ) ) {
						throw new LimelightImporterInternalException( "Remove failed 'annotationTypeIds_All_MatchedProtein_Filterable_LocalCopy_ForDeletions.remove( annotationTypeDTO.getId() )'. annotationTypeDTO.getId(): " + annotationTypeDTO.getId()
								+ ", Annotation name: " 
								+ filterableMatchedProteinAnnotation.getAnnotationName()
								+ ", 'search_program' : "
								+ filterableMatchedProteinAnnotation.getSearchProgram() );
					}
					
					if ( annotationTypeFilterableDTO.isDefaultFilter() ) {
						
						if ( annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
							if ( filterableMatchedProteinAnnotation.getValue().doubleValue() 
									< annotationTypeFilterableDTO.getDefaultFilterValueAtDatabaseLoad() ) {
							
								protein_meetsDefaultFilters = false;
							}
						} else if ( annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.BELOW ) {
							if ( filterableMatchedProteinAnnotation.getValue().doubleValue() 
									> annotationTypeFilterableDTO.getDefaultFilterValueAtDatabaseLoad() ) {
							
								protein_meetsDefaultFilters = false;
							}
						} else {
							String msg = " Unexpected FilterDirectionType value:  " + annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum()
									+ ", for annotationTypeFilterableDTO.getAnnotationTypeId(): " + annotationTypeFilterableDTO.getAnnotationTypeId();
							log.error( msg );
							throw new LimelightImporterInternalException(msg);
						}
					}
					

					Search_Protein_FilterableAnnotation_DTO search_Protein_FilterableAnnotation_DTO = new Search_Protein_FilterableAnnotation_DTO();
					
					search_Protein_FilterableAnnotation_DTO.setSearchId( search.getId() );
					search_Protein_FilterableAnnotation_DTO.setProteinSequenceVersionId( proteinSequenceVersionDTO.getId() );
					search_Protein_FilterableAnnotation_DTO.setAnnotationTypeId( annotationTypeDTO.getId() );
					search_Protein_FilterableAnnotation_DTO.setValueDouble( filterableMatchedProteinAnnotation.getValue().doubleValue() );
					search_Protein_FilterableAnnotation_DTO.setValueString( filterableMatchedProteinAnnotation.getValue().toString() );
					
					search_Protein_FilterableAnnotation_DTO_List.add( search_Protein_FilterableAnnotation_DTO );
				}
			
			
				if ( ! annotationTypeIds_All_MatchedProtein_Filterable_LocalCopy_ForDeletions.isEmpty() ) {
					
					//  Failed to find Search Program / Annotation for all entries under Matched Protein Types

					//  TODO  Maybe change this exception text
					throw new LimelightImporterDataException( "Not all matched_protein filterable types found under 'matched_protein'" );
					
				}
			}
			

			//  Process Descriptive Annotations on Matched Protein
			
			for ( DescriptiveMatchedProteinAnnotation descriptiveMatchedProteinAnnotation : matchedProtein.getMatchedProteinAnnotations().getDescriptiveMatchedProteinAnnotations().getDescriptiveMatchedProteinAnnotation() ) {

				SearchProgramEntry searchProgramEntry = searchProgramEntryMap.get( descriptiveMatchedProteinAnnotation.getSearchProgram() );
				if ( searchProgramEntry == null ) {
					//  TODO  Maybe change this exception text
					throw new LimelightImporterDataException( "'search_program' on 'matched_protein_descriptive_annotation' not found in matched_protein descriptive types: " + descriptiveMatchedProteinAnnotation.getSearchProgram() );
				}

				AnnotationTypeDTO annotationTypeDTO = searchProgramEntry.getMatchedProteinAnnotationTypeDTOMap().get( descriptiveMatchedProteinAnnotation.getAnnotationName() );
				if ( annotationTypeDTO == null ) {
					//  TODO  Maybe change this exception text
					throw new LimelightImporterDataException( "'annotation_name' on 'matched_protein_descriptive_annotation' not found in matched_protein descriptive types: " 
							+ descriptiveMatchedProteinAnnotation.getAnnotationName()
							+ ", 'search_program' : "
							+ descriptiveMatchedProteinAnnotation.getSearchProgram() );
				}

				if ( annotationTypeDTO.getFilterableDescriptiveAnnotationType() != FilterableDescriptiveAnnotationType.DESCRIPTIVE ) {
					throw new LimelightImporterDataException( "'annotation_name' on 'matched_protein_descriptive_annotation' is a 'descriptive' type but in in matched_protein descriptive types it is NOT a 'descriptive' type: " 
							+ descriptiveMatchedProteinAnnotation.getAnnotationName()
							+ ", 'search_program' : "
							+ descriptiveMatchedProteinAnnotation.getSearchProgram() );
				}
								
				if ( ! annotationTypeIds_All_MatchedProtein_Descriptive_DuplicateCheck.add( annotationTypeDTO.getId() ) ) {
					//  Duplicate Search Program/Annotation Name under Matched Protein
					throw new LimelightImporterDataException( "'search_program' / 'annotation_name' on 'matched_protein_descriptive_annotation' is duplicate. Annotation name: " 
							+ descriptiveMatchedProteinAnnotation.getAnnotationName()
							+ ", 'search_program' : "
							+ descriptiveMatchedProteinAnnotation.getSearchProgram() );
				}
				
				//  '.remove' for validating all entries in matched proteins types have entries in matched protein
				if ( ! annotationTypeIds_All_MatchedProtein_Descriptive_LocalCopy_ForDeletions.remove( annotationTypeDTO.getId() ) ) {
					throw new LimelightImporterInternalException( "Remove failed 'annotationTypeIds_All_MatchedProtein_Descriptive_LocalCopy_ForDeletions.remove( annotationTypeDTO.getId() )'. annotationTypeDTO.getId(): " + annotationTypeDTO.getId()
							+ ", Annotation name: " 
							+ descriptiveMatchedProteinAnnotation.getAnnotationName()
							+ ", 'search_program' : "
							+ descriptiveMatchedProteinAnnotation.getSearchProgram() );
				}
				
				Search_Protein_DescriptiveAnnotation_DTO search_Protein_DescriptiveAnnotation_DTO = new Search_Protein_DescriptiveAnnotation_DTO();
				
				search_Protein_DescriptiveAnnotation_DTO.setSearchId( search.getId() );
				search_Protein_DescriptiveAnnotation_DTO.setProteinSequenceVersionId( proteinSequenceVersionDTO.getId() );
				search_Protein_DescriptiveAnnotation_DTO.setAnnotationTypeId( annotationTypeDTO.getId() );
				search_Protein_DescriptiveAnnotation_DTO.setValueString( descriptiveMatchedProteinAnnotation.getValue().toString() );
				
				search_Protein_DescriptiveAnnotation_DTO_List.add( search_Protein_DescriptiveAnnotation_DTO );
			}
		
		
			if ( ! annotationTypeIds_All_MatchedProtein_Descriptive_LocalCopy_ForDeletions.isEmpty() ) {
				
				//  Failed to find Search Program / Annotation for all entries under Matched Protein Types

				//  TODO  Maybe change this exception text
				throw new LimelightImporterDataException( "Not all matched_protein descriptive types found under 'matched_protein'" );
				
			}
		}
		
		Internal__MatchedProtein__Create__AnnotationRecrds_Determine_If_Filterable_Annotations_Pass_Default_FilterValues__ReturnObject methodResult = new Internal__MatchedProtein__Create__AnnotationRecrds_Determine_If_Filterable_Annotations_Pass_Default_FilterValues__ReturnObject();
		
		methodResult.protein_meetsDefaultFilters = protein_meetsDefaultFilters;
		methodResult.search_Protein_FilterableAnnotation_DTO_List = search_Protein_FilterableAnnotation_DTO_List;
		methodResult.search_Protein_DescriptiveAnnotation_DTO_List = search_Protein_DescriptiveAnnotation_DTO_List;
				
		return methodResult;
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

			int update_CharacterCount = 0;

			for ( MatchedProtein matchedProtein : matchedProteinsFromLimelightXML.getMatchedProtein() ) {

				if ( ( ! proteinSequence_List.isEmpty() ) && ( update_CharacterCount + matchedProtein.getSequence().length() >= 1000000 ) ) {  //  Limit 1,000,000 characters per update

					// Updates to DB of the current batch

					proteinSequenceDAO.update_last_used_in_search_import(proteinSequence_List);

					//  Reset holding Lists for next batch

					update_CharacterCount = 0;

					proteinSequence_List.clear();
				}
				
				update_CharacterCount += matchedProtein.getSequence().length();

				//  Add to the batch

				proteinSequence_List.add( matchedProtein.getSequence() );


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
