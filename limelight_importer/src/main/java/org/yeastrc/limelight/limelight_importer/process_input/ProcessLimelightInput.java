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
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_importer.dao.ProjectSearchDAO;
import org.yeastrc.limelight.limelight_importer.dao.SearchDAO;
import org.yeastrc.limelight.limelight_importer.dto.ProjectSearchDTO;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.ReportedPeptideAndPsmFilterableAnnotationTypesOnId;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry_AllEntries;
import org.yeastrc.limelight.limelight_importer.post_insert_search_processing.PerformPostInsertSearchProcessing;
import org.yeastrc.limelight.limelight_importer.scan_file_processing_validating.PostProcess_ValidateAllScanNumbersOnPSMsInScanFiles;
import org.yeastrc.limelight.limelight_importer.scan_file_processing_validating.PreprocessValidate_ScanFiles_ScanFilenames;
import org.yeastrc.limelight.limelight_importer.scan_file_processing_validating.ScanFiles_UpdateForSpectralStorageService_API_Key;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchRecordStatus;
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
			Map<String,ScanFileFileContainer> scanFileFileContainer_KeyFilename,
			String importDirectory,
			Boolean skipPopulatingPathOnSearchLineOptChosen
			) throws Exception {
		
		searchDTOInserted = null;
		projectSearchDTOInserted = null;
		
		try {
			Set<String> scanFilenamesLimelightXMLInputSet =
					PreprocessValidate_ScanFiles_ScanFilenames.getInstance()
					.preprocessValidate_ScanFiles_ScanFilenames( limelightInput, scanFileFileContainer_KeyFilename );
			
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
			if ( scanFileFileContainer_KeyFilename == null || scanFileFileContainer_KeyFilename.isEmpty() ) {
				searchDTO.setHasScanData( false );
			} else {
				searchDTO.setHasScanData( true );
			}
				
			searchDTO.setHasIsotopeLabel( peptideContainsIsotopeLabel( limelightInput ) );
			searchDTO.setReportedPeptideMatchedProteinMappingProvided( reportedPeptides_Any_Contain_MatchedProteinForPeptide( limelightInput ) );
				
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
			
			//  Insert Conversion Program data
			ProcessSaveConversionProgram.getInstance().processComments( limelightInput, searchDTO, userIdInsertingSearch );
			
			//  Insert comments, if there are any
			ProcessSaveComments.getInstance().processComments( limelightInput, projectSearchDTOInserted, userIdInsertingSearch );
			
			//  Insert scan file data for search into database.
			//  If have scan files, send scan file(s) to spectral storage service for insert
			
			SearchScanFileEntry_AllEntries searchScanFileEntry_AllEntries = 
					Process_ScanFilenames_ScanFiles.getInstance()
					.process_ScanFilenames_ScanFiles( searchId, scanFilenamesLimelightXMLInputSet, scanFileFileContainer_KeyFilename );
			
			Map<String, SearchProgramEntry> searchProgramEntryMap =
					ProcessSearchProgramEntries.getInstance()
					.processSearchProgramEntries( limelightInput, searchDTO.getId() );
			
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
			
			
			ProcessStaticModifications.getInstance().processStaticModifications( limelightInput, searchDTO.getId() );
			ProcessConfigurationFiles.getInstance().processConfigurationFiles( 
					limelightInput, 
					searchDTO.getId(), 
					projectSearchDTOInserted.getId(),
					searchProgramEntryMap );


			log.warn( "INFO:  !!  Starting to process Reported Peptides and PSMs");

			ProcessReportedPeptidesAndPSMs.getInstance().processReportedPeptides( 
					limelightInput, 
					searchDTO, 
					searchProgramEntryMap,
					reportedPeptideAndPsmFilterableAnnotationTypesOnId,
					searchScanFileEntry_AllEntries
					);
			

			//  Commit all inserts executed to this point
			ImportRunImporterDBConnectionFactory.getInstance().commitInsertControlCommitConnection();
			
			if ( log.isWarnEnabled() ) {
				log.warn( "INFO:  !!  Primary insert of search complete.  Now performing Updates to the search" );
			}
			
			//  After primary insert search processing, perform other required updates to search
			PerformPostInsertSearchProcessing.getInstance()
			.performPostInsertSearchProcessing( searchDTOInserted, reportedPeptideAndPsmFilterableAnnotationTypesOnId );

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
			
			ScanFiles_UpdateForSpectralStorageService_API_Key.getInstance()
			.scanFiles_UpdateForSpectralStorageService_API_Key( searchScanFileEntry_AllEntries );
			
			PostProcess_ValidateAllScanNumbersOnPSMsInScanFiles.getInstance()
			.validateAllScanNumbersOnPSMsInScanFiles( searchScanFileEntry_AllEntries );
			
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

	/**
	 * At least one "peptide" under a "reported_peptide" contains "peptide_isotope_label"
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private boolean peptideContainsIsotopeLabel( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
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
