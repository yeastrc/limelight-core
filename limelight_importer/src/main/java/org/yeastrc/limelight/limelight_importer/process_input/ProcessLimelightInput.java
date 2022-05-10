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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteinForPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteinsForPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideIsotopeLabel;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideIsotopeLabels;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_importer.dao.ProjectSearchDAO;
import org.yeastrc.limelight.limelight_importer.dao.SearchDAO;
import org.yeastrc.limelight.limelight_importer.dto.ProjectSearchDTO;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects.Input_LimelightXMLFile_InternalHolder_Root_Object;
import org.yeastrc.limelight.limelight_importer.log_limelight_xml_stats.SearchStatistics_General_SavedToDB;
import org.yeastrc.limelight.limelight_importer.objects.ReportedPeptideAndPsmFilterableAnnotationTypesOnId;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer_AllEntries;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry_AllEntries;
import org.yeastrc.limelight.limelight_importer.scan_file_processing_validating.PostProcess_ValidateAllScanNumbersOnPSMsInScanFiles;
import org.yeastrc.limelight.limelight_importer.scan_file_processing_validating.PreprocessValidate_ScanFiles_ScanFilenames;
import org.yeastrc.limelight.limelight_importer.scan_file_processing_validating.ScanFiles_UpdateForSpectralStorageService_API_Key;
import org.yeastrc.limelight.limelight_importer.search_sub_group_processing_validating.PreprocessValidate_SearchSubGroups;
import org.yeastrc.limelight.limelight_importer.search_sub_group_processing_validating.Process_SearchSubGroups_SaveAtSearchLevel;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchSubGroupDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchRecordStatus;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;

/**
 * 
 *
 */
public class ProcessLimelightInput {

	private static final Logger log = LoggerFactory.getLogger( ProcessLimelightInput.class );
	
	/**
	 * private constructor
	 */
	private ProcessLimelightInput(){}
	public static ProcessLimelightInput getInstance() {
		return new ProcessLimelightInput();
	}
	
	
	private SearchDTO_Importer searchDTOInserted;
	private ProjectSearchDTO projectSearchDTOInserted;
	
	public SearchDTO_Importer getSearchDTOInserted() {
		return searchDTOInserted;
	}
	public ProjectSearchDTO getProjectSearchDTOInserted() {
		return projectSearchDTOInserted;
	}
	
	/**
	 * @param projectId
	 * @param limelightInput
	 * @param scanFileList
	 * @return
	 * @throws Exception
	 */
	public void processLimelightInput( 
			int projectId,
			Integer userIdInsertingSearch,
			LimelightInput limelightInput,
			ScanFileFileContainer_AllEntries scanFileFileContainer_AllEntries,
			String importDirectory,
			Boolean skipPopulatingPathOnSearchLineOptChosen,
			
			SearchStatistics_General_SavedToDB searchStatistics_General_SavedToDB
			) throws Exception {
		
		searchDTOInserted = null;
		projectSearchDTOInserted = null;
		
		try {
			
			//  Create Internal Holder Object Root that holds LimelightInput limelightInput object
			
			Input_LimelightXMLFile_InternalHolder_Root_Object input_LimelightXMLFile_InternalHolder_Root_Object = new Input_LimelightXMLFile_InternalHolder_Root_Object(limelightInput);
			
			
			Set<String> scanFilenamesLimelightXMLInputSet =
					PreprocessValidate_ScanFiles_ScanFilenames.getInstance()
					.preprocessValidate_ScanFiles_ScanFilenames( limelightInput, scanFileFileContainer_AllEntries );
			
			Set<String> searchSubGroupnamesLimelightXMLInputSet =
					PreprocessValidate_SearchSubGroups.getInstance()
					.preprocessValidate_SearchSubGroups( limelightInput );

			boolean skip_SubGroup_Processing = false;
			
			if ( searchSubGroupnamesLimelightXMLInputSet.size() < 2 ) {
				
				//  Zero or One Sub Group on PSMs so SKIP Sub Group Processing
				skip_SubGroup_Processing = true;
			}
			
			SearchDTO_Importer searchDTO = new SearchDTO_Importer();
			
			searchDTO.setCreatedByUserId( userIdInsertingSearch );
			searchDTO.setFastaFilename( limelightInput.getFastaFilename() );
			

			if ( StringUtils.isNotEmpty( limelightInput.getDataPath() ) ) {
				
				//  Always set searchDTO.Path to limelightInput.getDataPath if limelightInput.getDataPath is set
			
				System.out.println( "executing searchDTO.setPath( limelightInput.getDataPath() );");
				searchDTO.setPath( limelightInput.getDataPath() );
			
			} else {
				
				if ( ( skipPopulatingPathOnSearchLineOptChosen == null ) 
						|| ( ! skipPopulatingPathOnSearchLineOptChosen ) ) {
					
					if ( StringUtils.isNotEmpty( importDirectory ) ) {
						
						//  importDirectory is override of path: part of import submission
						
						searchDTO.setPath( importDirectory );
					}
				}
			}
			
			if ( ! scanFilenamesLimelightXMLInputSet.isEmpty() ) {
				searchDTO.setHasScanFilenames( true );
			} else {
				searchDTO.setHasScanFilenames( false );
			}
			if ( ! scanFileFileContainer_AllEntries.hasAnyEntries() ) {
				searchDTO.setHasScanData( false );
			} else {
				searchDTO.setHasScanData( true );
			}
			if ( skip_SubGroup_Processing ) {
				searchDTO.setHasSearchSubGroups( false );
			} else {
				searchDTO.setHasSearchSubGroups( true );
			}
			
			update_SearchDTO_Importer__SetFlags_BasedOn_LimelightInput_Contents( searchDTO, limelightInput );
			
			searchDTO.setPsmIds_AreSequential(true);  // Always true now with updated PSM Id assignment via reserved block for the search
				
			SearchDAO.getInstance().saveToDatabase( searchDTO );
			searchDTOInserted = searchDTO;
			
			int searchId = searchDTO.getId();
			
			ProjectSearchDTO projectSearchDTO = new ProjectSearchDTO();
			projectSearchDTO.setProjectId( projectId );
			projectSearchDTO.setSearchId( searchId );
			projectSearchDTO.setCreatedByUserId( userIdInsertingSearch );
			if ( StringUtils.isNotEmpty( limelightInput.getName() ) ) {
				projectSearchDTO.setSearchName( limelightInput.getName() );
			}
			ProjectSearchDAO.getInstance().saveToDatabase( projectSearchDTO );
			projectSearchDTOInserted = projectSearchDTO;
			
			log.warn( "INFO:  First Insert to Database for Search Successful.  Continuing to process import and insert into database.");
			log.warn( "!!!!!!!!!!!!!!!!!!" );
			
			
			//  Insert of Importer 'heart beat'
			
			Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.getSingletonInstance().saveOrUpdate_ForSearchId(searchId);
			
			//
			
			//  Compute # PSMs and initialize PSM Insert object
			
			Initialize_DB_Insert_PsmDAO_With_PSM_Count.getSingletonInstance().initialize_DB_Insert_PsmDAO_With_PSM_Count(limelightInput, searchDTO);
			
			
			//  Insert Conversion Program data
			ProcessSaveConversionProgram.getInstance().processComments( limelightInput, searchDTO, userIdInsertingSearch );
			
			//  Insert comments, if there are any
			ProcessSaveComments.getInstance().processComments( limelightInput, projectSearchDTOInserted, userIdInsertingSearch );
			
			//  Insert scan file data for search into database.
			//  If have scan files, send scan file(s) to spectral storage service for insert
			
			SearchScanFileEntry_AllEntries searchScanFileEntry_AllEntries = 
					Process_ScanFilenames_ScanFiles.getInstance()
					.process_ScanFilenames_ScanFiles( searchId, scanFilenamesLimelightXMLInputSet, scanFileFileContainer_AllEntries );
			
			Map<String, SearchSubGroupDTO> searchSubGroupDTOMap_Key_searchSubGroupLabel = null;

			if ( ! skip_SubGroup_Processing ) {
				searchSubGroupDTOMap_Key_searchSubGroupLabel =
					Process_SearchSubGroups_SaveAtSearchLevel.getInstance()
					.process_SearchSubGroups_SaveAtSearchLevel( searchSubGroupnamesLimelightXMLInputSet, searchId );
			}
					
			Map<String, SearchProgramEntry> searchProgramEntryMap =
					ProcessSearchProgramEntries.getInstance()
					.processSearchProgramEntries( input_LimelightXMLFile_InternalHolder_Root_Object, searchDTO.getId() );
			
			//  Throw error if have MatchedProteinAnnotation Types
			
			//    Look at all uses of ReportedPeptideAndPsmFilterableAnnotationTypesOnId
			//      when add Matched Proteins
			
			for ( Map.Entry<String, SearchProgramEntry> searchProgramEntryMapEntry : searchProgramEntryMap.entrySet() ) {
				if ( searchProgramEntryMapEntry.getValue().getMatchedProteinAnnotationTypeDTOMap() != null ) {
					String msg = "MatchedProteinAnnotation Types not supported Yet.";
					log.error( msg );
					throw new LimelightImporterDataException(msg);
				}
			}
			
			ReportedPeptideAndPsmFilterableAnnotationTypesOnId reportedPeptideAndPsmFilterableAnnotationTypesOnId = new ReportedPeptideAndPsmFilterableAnnotationTypesOnId();
			reportedPeptideAndPsmFilterableAnnotationTypesOnId.setFilterableReportedPeptideAnnotationTypesOnId( 
					createReportedPeptideFilterableAnnotationTypesOnId( searchProgramEntryMap ) );
			reportedPeptideAndPsmFilterableAnnotationTypesOnId.setFilterablePsmAnnotationTypesOnId( 
					createPsmFilterableAnnotationTypesOnId( searchProgramEntryMap ) );
			
			if ( reportedPeptideAndPsmFilterableAnnotationTypesOnId.getFilterablePsmAnnotationTypesOnId() == null ) {
				String msg = "filterablePsmAnnotationTypesOnId == null";
				log.error( msg );
				throw new LimelightImporterInternalException(msg);
			}
			if ( reportedPeptideAndPsmFilterableAnnotationTypesOnId.getFilterablePsmAnnotationTypesOnId().isEmpty() ) {
				String msg = "filterablePsmAnnotationTypesOnId.isEmpty() ";
				log.error( msg );
				throw new LimelightImporterInternalException(msg);
			}
			
			
			ProcessStaticModifications.getInstance().processStaticModifications( input_LimelightXMLFile_InternalHolder_Root_Object, searchDTO.getId() );
			
			ProcessConfigurationFiles.getInstance().processConfigurationFiles( 
					limelightInput, 
					searchDTO.getId(), 
					projectSearchDTOInserted.getId(),
					searchProgramEntryMap );

			//  Commit all inserts executed to this point
			ImportRunImporterDBConnectionFactory.getInstance().commitInsertControlCommitConnection();
			
			Process_FastaFileStatistics.getInstance().process_FastaFileStatistics(input_LimelightXMLFile_InternalHolder_Root_Object, searchId, projectSearchDTO.getId() );

			if ( input_LimelightXMLFile_InternalHolder_Root_Object.is_Any_InternalHolder_ReportedPeptide_Objects() ) {


				log.warn( "INFO:  !!  Starting to process Proteins, Reported Peptides and PSMs");
				

				//  Query and Insert to DB if needed: Reported Peptide String, Peptide String
				
				Process_ReportedPeptideString_PeptideString_Query_InsertIfNeeded__All_ReportedPeptideObjects.getInstance().
				reportedPeptideString_PeptideString_Query_InsertIfNeeded__All_ReportedPeptideObjects(input_LimelightXMLFile_InternalHolder_Root_Object, searchDTO);

				//  Perform Peptides to Proteins Mapping (Protein Interference).  Insert Proteins and Proteins to Peptide Mapping records
				
				Process_PeptidesToProteinsMapping_ProteinInference_InsertProteins.getInstance().
				process_PeptidesToProteinsMapping_ProteinInference_InsertProteins( 
						input_LimelightXMLFile_InternalHolder_Root_Object, searchDTO,
						searchProgramEntryMap, reportedPeptideAndPsmFilterableAnnotationTypesOnId, searchScanFileEntry_AllEntries
						);

				// Process Reported Peptides and their children PSMs etc and insert to DB

				ProcessReportedPeptidesAndPSMs.getInstance().processReportedPeptides( 
						input_LimelightXMLFile_InternalHolder_Root_Object, 
						searchDTO, 
						skip_SubGroup_Processing,
						searchSubGroupDTOMap_Key_searchSubGroupLabel,
						searchProgramEntryMap,
						reportedPeptideAndPsmFilterableAnnotationTypesOnId,
						searchScanFileEntry_AllEntries
						);

			}
			
			//  Commit all inserts executed to this point
			ImportRunImporterDBConnectionFactory.getInstance().commitInsertControlCommitConnection();
			
			try {
				SearchDAO.getInstance().updateStatus( searchDTOInserted.getId(), SearchRecordStatus.IMPORTING_WAITING_FOR_SCAN_FILE_IMPORTS );
			}  catch ( Exception e ) {
				String msg = "Failed to mark the Search as 'importing/waiting for Scan File Import(s)' , search id: " + searchDTOInserted.getId() ;
				log.error( msg, e );
				System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
				System.err.println( msg );
				System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
				throw e;
		    }
			
			if ( ! searchDTO.isHasScanData() ) {
				
				searchStatistics_General_SavedToDB.setImporter_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds( 0 );
			} else {

				long time_Before_WaitFor_Spectr = System.currentTimeMillis();

				ScanFiles_UpdateForSpectralStorageService_API_Key.getInstance()
				.scanFiles_UpdateForSpectralStorageService_API_Key( searchScanFileEntry_AllEntries );

				PostProcess_ValidateAllScanNumbersOnPSMsInScanFiles.getInstance()
				.validateAllScanNumbersOnPSMsInScanFiles( searchScanFileEntry_AllEntries );

				long time_After_WaitFor_Spectr = System.currentTimeMillis();

				long importer_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds = time_After_WaitFor_Spectr - time_Before_WaitFor_Spectr;

				searchStatistics_General_SavedToDB.setImporter_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds(importer_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds);
			}
		} catch ( Exception e ) {
			throw e;
		}
	}


	/**
	 * @param searchProgramEntryMap
	 * @return
	 */
	private Map<Integer, AnnotationTypeDTO> createReportedPeptideFilterableAnnotationTypesOnId( Map<String, SearchProgramEntry> searchProgramEntryMap ) {
	
		///  Build list of Filterable annotation type ids
		Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesOnId = new HashMap<>();
		for ( Map.Entry<String, SearchProgramEntry> searchProgramEntryMapEntry : searchProgramEntryMap.entrySet() ) {
			SearchProgramEntry searchProgramEntry = searchProgramEntryMapEntry.getValue();
			Map<String, AnnotationTypeDTO> reportedPeptideAnnotationTypeDTOMap =
					searchProgramEntry.getReportedPeptideAnnotationTypeDTOMap();
			for ( Map.Entry<String, AnnotationTypeDTO> reportedPeptideAnnotationTypeDTOMapEntry : reportedPeptideAnnotationTypeDTOMap.entrySet() ) {
				AnnotationTypeDTO reportedPeptideAnnotationTypeDTO = reportedPeptideAnnotationTypeDTOMapEntry.getValue();
				 if ( reportedPeptideAnnotationTypeDTO.getFilterableDescriptiveAnnotationType()
						 == FilterableDescriptiveAnnotationType.FILTERABLE ) {
					 filterableAnnotationTypesOnId.put( reportedPeptideAnnotationTypeDTO.getId(), reportedPeptideAnnotationTypeDTO );
				 }
			}
		}
		return filterableAnnotationTypesOnId;
	}
	
	/**
	 * @param searchProgramEntryMap
	 * @return
	 */
	private Map<Integer, AnnotationTypeDTO> createPsmFilterableAnnotationTypesOnId( Map<String, SearchProgramEntry> searchProgramEntryMap ) {
		
		///  Build list of Filterable annotation type ids
		Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesOnId = new HashMap<>();
		for ( Map.Entry<String, SearchProgramEntry> searchProgramEntryMapEntry : searchProgramEntryMap.entrySet() ) {
			SearchProgramEntry searchProgramEntry = searchProgramEntryMapEntry.getValue();
			Map<String, AnnotationTypeDTO> psmAnnotationTypeDTOMap =
					searchProgramEntry.getPsmAnnotationTypeDTOMap();
			for ( Map.Entry<String, AnnotationTypeDTO> psmAnnotationTypeDTOMapEntry : psmAnnotationTypeDTOMap.entrySet() ) {
				AnnotationTypeDTO psmAnnotationTypeDTO = psmAnnotationTypeDTOMapEntry.getValue();
				if ( psmAnnotationTypeDTO.getFilterableDescriptiveAnnotationType()
						== FilterableDescriptiveAnnotationType.FILTERABLE ) {
					filterableAnnotationTypesOnId.put( psmAnnotationTypeDTO.getId(), psmAnnotationTypeDTO );
				}
			}
		}
		return filterableAnnotationTypesOnId;
	}
	
	//////////////////////////////
	
	/**
	 * @param searchDTO
	 * @param limelightInput
	 * @throws LimelightImporterDataException
	 */
	private void update_SearchDTO_Importer__SetFlags_BasedOn_LimelightInput_Contents(
			SearchDTO_Importer searchDTO,
			LimelightInput limelightInput
			) throws LimelightImporterDataException {
		
		searchDTO.setHasIsotopeLabel( searchContains_peptideContainsIsotopeLabel( limelightInput ) );
		searchDTO.setAnyPsmHasOpenModificationMasses( searchContains_PSM_WithOpenModificationMass( limelightInput ) );
		searchDTO.setReportedPeptideMatchedProteinMappingProvided( reportedPeptides_Any_Contain_MatchedProteinForPeptide( limelightInput ) );

		update_SearchDTO_Importer__Set_IsDecoy_IsIndependentDecoy_BasedOn_LimelightInput_Contents( searchDTO, limelightInput );
		
		update_SearchDTO_Importer__Set_allPsmHave_Precursor_RetentionTime_allPsmHave_Precursor_M_Over_Z_BasedOn_LimelightInput_Contents( searchDTO, limelightInput );
	}
	
	/**
	 * @param searchDTO
	 * @param limelightInput
	 * @throws LimelightImporterDataException
	 */
	private void update_SearchDTO_Importer__Set_IsDecoy_IsIndependentDecoy_BasedOn_LimelightInput_Contents(
			SearchDTO_Importer searchDTO,
			LimelightInput limelightInput
			) throws LimelightImporterDataException {
		
		boolean anyPsmHas_IsDecoy_True = false;
		boolean anyPsmHas_IsIndependentDecoy_True = false;
		
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		if ( reportedPeptides != null ) {
			List<ReportedPeptide> reportedPeptideList =
					reportedPeptides.getReportedPeptide();
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {
				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					
					if ( reportedPeptide.getPsms() != null && ( ! ( reportedPeptide.getPsms().getPsm().isEmpty() ) ) ) {
						
						for ( Psm psm : reportedPeptide.getPsms().getPsm() ) {
							
							if ( psm.isIsDecoy() != null && psm.isIsDecoy() ) {
								anyPsmHas_IsDecoy_True = true;
							}
							if ( psm.isIsIndependentDecoy() != null && psm.isIsIndependentDecoy() ) {
								anyPsmHas_IsIndependentDecoy_True = true;
							}
							
							if ( anyPsmHas_IsDecoy_True && anyPsmHas_IsIndependentDecoy_True ) {
								break;
							}
						}
					}

					if ( anyPsmHas_IsDecoy_True && anyPsmHas_IsIndependentDecoy_True ) {
						break;
					}
				}
			}
		}
		
		searchDTO.setAnyPsmHas_IsDecoy_True(anyPsmHas_IsDecoy_True);
		searchDTO.setAnyPsmHas_IsIndependentDecoy_True(anyPsmHas_IsIndependentDecoy_True);
	}

	/**
	 * @param searchDTO
	 * @param limelightInput
	 * @throws LimelightImporterDataException
	 */
	private void update_SearchDTO_Importer__Set_allPsmHave_Precursor_RetentionTime_allPsmHave_Precursor_M_Over_Z_BasedOn_LimelightInput_Contents(
			SearchDTO_Importer searchDTO,
			LimelightInput limelightInput
			) throws LimelightImporterDataException {
		
		boolean allPsmHave_Precursor_RetentionTime = true;
		boolean allPsmHave_Precursor_M_Over_Z = true;

		
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		if ( reportedPeptides != null ) {
			List<ReportedPeptide> reportedPeptideList =
					reportedPeptides.getReportedPeptide();
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {
				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					
					if ( reportedPeptide.getPsms() != null && ( ! ( reportedPeptide.getPsms().getPsm().isEmpty() ) ) ) {
						
						for ( Psm psm : reportedPeptide.getPsms().getPsm() ) {
							
							if ( psm.getPrecursorRetentionTime() == null ) {
								allPsmHave_Precursor_RetentionTime = false;
							}
							if ( psm.getPrecursorMZ() == null ) {
								allPsmHave_Precursor_M_Over_Z = false;
							}
							
							if ( ( ! allPsmHave_Precursor_RetentionTime )  && ( ! allPsmHave_Precursor_M_Over_Z ) ) {
								break;
							}
						}
					}

					if ( ( ! allPsmHave_Precursor_RetentionTime )  && ( ! allPsmHave_Precursor_M_Over_Z ) ) {
						break;
					}
				}
			}
		}
		
		searchDTO.setAllPsmHave_Precursor_RetentionTime(allPsmHave_Precursor_RetentionTime);
		searchDTO.setAllPsmHave_Precursor_M_Over_Z(allPsmHave_Precursor_M_Over_Z);
	}

	/**
	 * At least one "peptide" under a "reported_peptide" contains "peptide_isotope_label"
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private boolean searchContains_peptideContainsIsotopeLabel( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		if ( reportedPeptides != null ) {
			List<ReportedPeptide> reportedPeptideList =
					reportedPeptides.getReportedPeptide();
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {
				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					if ( peptideContainsIsotopeLabel_ProcessSingleReportedPeptide( reportedPeptide ) ) {
						//  This reported peptide contains at least one "peptide_isotope_label"
						return true;  //  EARLY RETURN
					}
				}
			}
		}
		
		return false;
	}
		
	/**
	 * @param reportedPeptide
	 * @throws LimelightImporterDataException
	 */
	private boolean peptideContainsIsotopeLabel_ProcessSingleReportedPeptide( ReportedPeptide reportedPeptide ) throws LimelightImporterDataException {
		
		PeptideIsotopeLabels peptideIsotopeLabels = reportedPeptide.getPeptideIsotopeLabels();
		if ( peptideIsotopeLabels != null ) {
			PeptideIsotopeLabel peptideIsotopeLabel = peptideIsotopeLabels.getPeptideIsotopeLabel();
			if ( StringUtils.isNotEmpty( peptideIsotopeLabel.getLabel() ) ) {
				// Reported Peptide contains a isotope label
				return true; // EARLY RETURN
			}
		}
		
		return false;
	}

	/**
	 * At least one "reported_peptide" contains "psm" that contains "peptide_open_modification"
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private boolean searchContains_PSM_WithOpenModificationMass( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		if ( reportedPeptides != null ) {
			List<ReportedPeptide> reportedPeptideList =
					reportedPeptides.getReportedPeptide();
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {
				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					
					if ( reportedPeptide.getPsms() != null && ( ! ( reportedPeptide.getPsms().getPsm().isEmpty() ) ) ) {
						
						for ( Psm psm : reportedPeptide.getPsms().getPsm() ) {
							
							if ( psm.getPsmOpenModification() != null && psm.getPsmOpenModification().getMass() != null ) {
								//  This PSM contains "psm_open_modification"
								 //  May also be PSMs that do NOT have Open Modifications
								return true;  //  EARLY RETURN 
							}
						}
					}
				}
			}
		}
		
		return false;
	}
	
	/**
	 * All "reported_peptide" contains "matched_protein_for_peptide"
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private boolean reportedPeptides_Any_Contain_MatchedProteinForPeptide( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		if ( reportedPeptides != null ) {
			List<ReportedPeptide> reportedPeptideList =
					reportedPeptides.getReportedPeptide();
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {
				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					if ( reportedPeptideContainsMatchedProteinForPeptide_ProcessSingleReportedPeptide( reportedPeptide ) ) {
						//  This reported peptide contains "matched_protein_for_peptide"
						return true;  //  EARLY RETURN
					}
				}
			}
		}
		
		return false;
	}

	/**
	 * @param reportedPeptide
	 * @throws LimelightImporterDataException
	 */
	private boolean reportedPeptideContainsMatchedProteinForPeptide_ProcessSingleReportedPeptide( ReportedPeptide reportedPeptide ) throws LimelightImporterDataException {
		
		MatchedProteinsForPeptide matchedProteinsForPeptide = reportedPeptide.getMatchedProteinsForPeptide();
		if ( matchedProteinsForPeptide != null ) {
			List<MatchedProteinForPeptide> matchedProteinForPeptideList = matchedProteinsForPeptide.getMatchedProteinForPeptide();
			if ( ! matchedProteinForPeptideList.isEmpty() ) {
				// Reported Peptide contains "matched_protein_for_peptide"
				return true; // EARLY RETURN
			}
		}
		
		return false;
	}

}
