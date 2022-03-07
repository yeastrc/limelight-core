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
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PsmModification;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PsmOpenModificationPosition;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psms;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReporterIon;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmDescriptiveAnnotationDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmDynamicModificationDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmFilterableAnnotationDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmOpenModificationDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmOpenModificationPositionDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmReporterIonMassDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmSearchSubGroup_DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Search_ReportedPeptide_SubGroup_BestPsmValue_Generic_Lookup__DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Search_ReportedPeptide_SubGroup__Lookup__DAO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.PsmOpenModification_UniquePosition_InReportedPeptide_Entry;
import org.yeastrc.limelight.limelight_importer.objects.PsmStatisticsAndBestValues;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry_AllEntries;
import org.yeastrc.limelight.limelight_importer.utils.ReporterIonMass_Round_IfNecessary;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDynamicModificationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPositionDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmReporterIonMassDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmSearchSubGroupDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchSubGroupDTO;
import org.yeastrc.limelight.limelight_shared.dto.Search_ReportedPeptide_SubGroup_BestPsmValue_Lookup__DTO;
import org.yeastrc.limelight.limelight_shared.dto.Search_ReportedPeptide_SubGroup__Lookup__DTO;

/**
 * 
 *
 */
public class ProcessPSMsForReportedPeptide {

	private static final Logger log = LoggerFactory.getLogger( ProcessPSMsForReportedPeptide.class );

	/**
	 * private constructor
	 */
	private ProcessPSMsForReportedPeptide(){}
	public static ProcessPSMsForReportedPeptide getInstance() {
		return new ProcessPSMsForReportedPeptide();
	}
	
	/**
	 * @param reportedPeptide
	 * @param searchId
	 * @param reportedPeptideDTO
	 * @param searchProgramEntryMap
	 * @param filterablePsmAnnotationTypesOnId
	 * @param searchScanFileEntry_KeyScanFilename
	 * @param uniqueReporterIonMassesForTheReportedPeptide
	 * @return
	 * @throws LimelightImporterDataException
	 * @throws Exception
	 */
	public PsmStatisticsAndBestValues savePSMs( 
			ReportedPeptide reportedPeptide, 
			int searchId, 
			ReportedPeptideDTO reportedPeptideDTO, 
			boolean skip_SubGroup_Processing,
			Map<String, SearchSubGroupDTO> searchSubGroupDTOMap_Key_searchSubGroupLabel,
			Map<String, SearchProgramEntry> searchProgramEntryMap,
			Map<Integer, AnnotationTypeDTO> filterablePsmAnnotationTypesOnId,
			SearchScanFileEntry_AllEntries searchScanFileEntry_AllEntries,
			Set<BigDecimal> uniqueReporterIonMassesForTheReportedPeptide ) throws LimelightImporterDataException, Exception {

		boolean processing_SearchSubGroups = false;
		
		if ( ! skip_SubGroup_Processing ) {
			
			processing_SearchSubGroups = true;
		}
		
		String peptideString = reportedPeptide.getSequence();
		
		Psms psms =	reportedPeptide.getPsms();
		List<Psm> psmList = psms.getPsm();
		
		PopulatePsmAnnotations populatePsmAnnotations = PopulatePsmAnnotations.getInstance( searchProgramEntryMap, filterablePsmAnnotationTypesOnId );
		
		DB_Insert_PsmDynamicModificationDAO db_Insert_PsmDynamicModificationDAO = DB_Insert_PsmDynamicModificationDAO.getInstance();
		DB_Insert_PsmReporterIonMassDAO db_Insert_PsmReporterIonMassDAO = DB_Insert_PsmReporterIonMassDAO.getInstance();
		DB_Insert_PsmFilterableAnnotationDAO db_Insert_PsmFilterableAnnotationDAO = DB_Insert_PsmFilterableAnnotationDAO.getInstance();
		DB_Insert_PsmDescriptiveAnnotationDAO db_Insert_PsmDescriptiveAnnotationDAO = DB_Insert_PsmDescriptiveAnnotationDAO.getInstance();

		List<PsmSortingContainer> psmSortingContainerList = new ArrayList<>( psmList.size() );

		{
			int counter = 0;
			for ( Psm psm : psmList ) {

				counter++;
				
				PsmSortingContainer psmSortingContainer = new PsmSortingContainer();
				psmSortingContainerList.add(psmSortingContainer);

				psmSortingContainer.psm = psm;
				psmSortingContainer.originalOrder = counter;

				if ( processing_SearchSubGroups && StringUtils.isNotEmpty( psm.getSubgroupName() ) ) {

					SearchSubGroupDTO searchSubGroupDTO = searchSubGroupDTOMap_Key_searchSubGroupLabel.get( psm.getSubgroupName() );
					if ( searchSubGroupDTO == null ) {
						String msg = "Internal Error: searchSubGroupDTOMap_Key_searchSubGroupLabel.get( psm.getSubgroupName() ); returned null. psm.getSubgroupName(): " + psm.getSubgroupName();
						log.error(msg);
						throw new LimelightImporterInternalException(msg);
					}

					psmSortingContainer.searchSubGroupId = searchSubGroupDTO.getSearchSubGroupId();
				}
			}
		}
		
		if ( processing_SearchSubGroups ) {
			
			//  Have Search Sub Groups
			
			//  Sort on Search Sub Groups, then original order of the PSMs
			
			Collections.sort( psmSortingContainerList, new Comparator<PsmSortingContainer>() {

				@Override
				public int compare(PsmSortingContainer o1, PsmSortingContainer o2) {
					if ( o1.searchSubGroupId < o2.searchSubGroupId ) 
						return -1;
					if ( o1.searchSubGroupId > o2.searchSubGroupId )
						return 1;
					if ( o1.originalOrder < o2.originalOrder ) 
						return -1;
					if ( o1.originalOrder > o2.originalOrder )
						return 1;
					return 0;
				}
			});
		}

		//   Accumulated data across ALL PSMs
		
		DataPerReportedPeptide_Or_PerSubGroup dataAccum_All_PSMs = new DataPerReportedPeptide_Or_PerSubGroup( filterablePsmAnnotationTypesOnId );

		Set<PsmOpenModification_UniquePosition_InReportedPeptide_Entry> psmOpenModification_UniquePositions = new HashSet<>();
		Set<Integer> psmOpenModification_UniqueMassesRounded = new HashSet<>();
		

		//   Accumulated data across PSMs within a SUB GROUP
		
		//       !!!!!   Must be RESET on Search Sub Group ID Change
		
		DataPerReportedPeptide_Or_PerSubGroup dataAccum_PSMs_In_SubGroup = null;
		
		final int PREV_SEARCH_SUB_GROUP_ID_INITIAL_VALUE = -1; //  no negative values in actual values
		
		int prevSearchSubGroupId = PREV_SEARCH_SUB_GROUP_ID_INITIAL_VALUE;
		
		//  Process PSMs (were copied into PsmSortingContainer objects above)
		
		for ( PsmSortingContainer psmSortingContainer : psmSortingContainerList ) {
			
			if ( processing_SearchSubGroups ) {
					
				//  Processing Sub Groups so Do Processing
					
				if ( prevSearchSubGroupId != psmSortingContainer.searchSubGroupId ) {
					if ( prevSearchSubGroupId != PREV_SEARCH_SUB_GROUP_ID_INITIAL_VALUE ) {
	
						//  psmSortingContainer.searchSubGroupId is not first and has changed 
						//    so insert the previously saved values to the DB.
						//  !!  Need to ALSO execute same code at end of loop for last searchSubGroupId !!

						int searchSubGroupId = prevSearchSubGroupId;

						save_PerSubGroup_Lookup_TableData( dataAccum_PSMs_In_SubGroup, searchId, reportedPeptideDTO, searchSubGroupId );
					}
					
					//  Always execute on prevSearchSubGroupId, even first change from initial value done on first PSM entry

					prevSearchSubGroupId = psmSortingContainer.searchSubGroupId;

					dataAccum_PSMs_In_SubGroup = new DataPerReportedPeptide_Or_PerSubGroup( filterablePsmAnnotationTypesOnId );
				}
			}
			
			Psm psm = psmSortingContainer.psm;
			
			boolean psmHasModifications = false;
			boolean psmHasOpenModifications = false;
			boolean psmHasReporterIons = false;
			
			if ( psm.getPsmModifications() != null 
					&& psm.getPsmModifications().getPsmModification() != null
					&& ( ! psm.getPsmModifications().getPsmModification().isEmpty() ) ) {
				
				psmHasModifications = true;
				
				if ( dataAccum_PSMs_In_SubGroup != null ) {
					dataAccum_PSMs_In_SubGroup.anyPsmHasDynamicModifications = true;
				}
			}
			if ( psm.getPsmOpenModification() != null 
					&& psm.getPsmOpenModification().getMass() != null ) {
				
				psmHasOpenModifications = true;
				
				if ( dataAccum_PSMs_In_SubGroup != null ) {
					dataAccum_PSMs_In_SubGroup.anyPsmHasOpenModifications = true;
				}
			}
			if ( psm.getReporterIons() != null 
					&& psm.getReporterIons().getReporterIon() != null
					&& ( ! psm.getReporterIons().getReporterIon().isEmpty() ) ) {
				
				psmHasReporterIons = true;
				
				if ( dataAccum_PSMs_In_SubGroup != null ) {
					dataAccum_PSMs_In_SubGroup.anyPsmHasReporterIons = true;
				}
			}
			
			PsmDTO psmDTO = 
					PopulatePsmDTO.getInstance().populatePsmDTO( 
							searchId, 
							reportedPeptideDTO, 
							psm,
							psmHasModifications,
							psmHasOpenModifications,
							psmHasReporterIons,
							searchScanFileEntry_AllEntries );
			
			DB_Insert_PsmDAO.getSingletonInstance().saveToDatabase( psmDTO );
			
			if ( processing_SearchSubGroups && StringUtils.isNotEmpty( psm.getSubgroupName() ) ) {
			
				SearchSubGroupDTO searchSubGroupDTO = searchSubGroupDTOMap_Key_searchSubGroupLabel.get( psm.getSubgroupName() );
				if ( searchSubGroupDTO == null ) {
					String msg = "Internal Error: searchSubGroupDTOMap_Key_searchSubGroupLabel.get( psm.getSubgroupName() ); returned null. psm.getSubgroupName(): " + psm.getSubgroupName();
					log.error(msg);
					throw new LimelightImporterInternalException(msg);
				}
				
				PsmSearchSubGroupDTO psmSearchSubGroupDTO = new PsmSearchSubGroupDTO();
				psmSearchSubGroupDTO.setPsmId( psmDTO.getId() );
				psmSearchSubGroupDTO.setSearchSubGroupId( searchSubGroupDTO.getSearchSubGroupId() );
				
				DB_Insert_PsmSearchSubGroup_DAO.getInstance()
				.saveToDatabase(psmSearchSubGroupDTO);
			}
			
			if ( psmHasModifications ) {
				List<PsmModification> psmModificationList = psm.getPsmModifications().getPsmModification();
				for ( PsmModification psmModification : psmModificationList ) {
					PsmDynamicModificationDTO psmDynamicModificationDTO = new PsmDynamicModificationDTO();
					psmDynamicModificationDTO.setPsmId( psmDTO.getId() );
					if ( psmModification.getPosition() != null ) {
						psmDynamicModificationDTO.setPosition( psmModification.getPosition().intValue() );
					}
					if ( psmModification.isIsNTerminal() != null && psmModification.isIsNTerminal().booleanValue() ) {
						psmDynamicModificationDTO.setIs_N_Terminal(true);
						psmDynamicModificationDTO.setPosition( 1 );
					}
					if ( psmModification.isIsCTerminal() != null && psmModification.isIsCTerminal().booleanValue() ) {
						psmDynamicModificationDTO.setIs_C_Terminal(true);
						psmDynamicModificationDTO.setPosition( peptideString.length() );
					}
					psmDynamicModificationDTO.setMass( psmModification.getMass().doubleValue() );
					db_Insert_PsmDynamicModificationDAO.saveToDatabase( psmDynamicModificationDTO );
				}
			}
			
			if ( psmHasReporterIons ) {
				
				//  Process Reporter Ions entries
				
				//  Copy to Set to remove duplicates
				Set<BigDecimal> reporterIonMassesSet = new HashSet<>();
				
				List<ReporterIon> reporterIonList = psm.getReporterIons().getReporterIon();
				for ( ReporterIon reporterIon :  reporterIonList ) {
					BigDecimal reporterIonMass = reporterIon.getMass();
					BigDecimal reporterIonMass_RoundedIfNeeded = ReporterIonMass_Round_IfNecessary.reporterIonMass_Round_IfNecessary( reporterIonMass );
					reporterIonMassesSet.add( reporterIonMass_RoundedIfNeeded );
				}
				//  Copy to List and Sort so insert in ascending mass order.  Not Required but creates consistency
				List<BigDecimal> reporterIonMassesList = new ArrayList<>( reporterIonMassesSet );
				Collections.sort( reporterIonMassesList );
				
				for ( BigDecimal reporterIonMass : reporterIonMassesList) {
					
					uniqueReporterIonMassesForTheReportedPeptide.add( reporterIonMass );
					
					//  Create DB DTO and insert to DB
					PsmReporterIonMassDTO psmReporterIonMassDTO = new PsmReporterIonMassDTO();
					psmReporterIonMassDTO.setPsmId( psmDTO.getId() );
					psmReporterIonMassDTO.setReporterIonMass( reporterIonMass );
					db_Insert_PsmReporterIonMassDAO.saveToDatabase( psmReporterIonMassDTO );
				}
			}
			
			if ( psm.getPsmOpenModification() != null ) {
				
				BigDecimal massBD = psm.getPsmOpenModification().getMass();
				if ( massBD == null ) {
					String msg = "'mass' not set on 'psm_open_modification'";
					log.error(msg);
					throw new LimelightImporterDataException(msg);
				}
				double massDbl = massBD.doubleValue();
				
				PsmOpenModificationDTO psmOpenModificationDTO = new PsmOpenModificationDTO();
				psmOpenModificationDTO.setPsmId( psmDTO.getId() );
				psmOpenModificationDTO.setMass(massDbl);
				DB_Insert_PsmOpenModificationDAO.getInstance().saveToDatabase(psmOpenModificationDTO);
				
				{
					double massDbl_Rounded = Math.round( massDbl );
					if ( massDbl_Rounded > Integer.MAX_VALUE ) {
						String msg = "psm.getPsmOpenModification().getMass() rounded is > Integer.MAX_VALUE. is: " + massDbl_Rounded;
						log.error(msg);
						throw new LimelightImporterInternalException(msg);
					}
					if ( massDbl_Rounded < Integer.MIN_VALUE ) {
						String msg = "psm.getPsmOpenModification().getMass() rounded is < Integer.MIN_VALUE. is: " + massDbl_Rounded;
						log.error(msg);
						throw new LimelightImporterInternalException(msg);
					}
					int massInt = (int) massDbl_Rounded;
					psmOpenModification_UniqueMassesRounded.add( massInt );
				}
				
				if ( ! psm.getPsmOpenModification().getPsmOpenModificationPosition().isEmpty() ) {

					for ( PsmOpenModificationPosition psmOpenModificationPosition : psm.getPsmOpenModification().getPsmOpenModificationPosition() ) {

						PsmOpenModificationPositionDTO psmOpenModificationPositionDTO = new PsmOpenModificationPositionDTO();
						psmOpenModificationPositionDTO.setPsmOpenModificationId( psmOpenModificationDTO.getId() );
						if ( psmOpenModificationPosition.getPosition() != null ) {
							psmOpenModificationPositionDTO.setPosition( psmOpenModificationPosition.getPosition().intValueExact() );
						}
						if ( psmOpenModificationPosition.isIsNTerminal() != null && psmOpenModificationPosition.isIsNTerminal().booleanValue() ) {
							psmOpenModificationPositionDTO.setIs_N_Terminal(true);
							psmOpenModificationPositionDTO.setPosition( 1 );
						}
						if ( psmOpenModificationPosition.isIsCTerminal() != null && psmOpenModificationPosition.isIsCTerminal().booleanValue() ) {
							psmOpenModificationPositionDTO.setIs_C_Terminal(true);
							psmOpenModificationPositionDTO.setPosition( peptideString.length() );
						}

						DB_Insert_PsmOpenModificationPositionDAO.getInstance().saveToDatabase( psmOpenModificationPositionDTO );

						PsmOpenModification_UniquePosition_InReportedPeptide_Entry psmOpenModification_UniquePosition_InReportedPeptide_Entry = new PsmOpenModification_UniquePosition_InReportedPeptide_Entry();
						psmOpenModification_UniquePosition_InReportedPeptide_Entry.setPosition( psmOpenModificationPositionDTO.getPosition() );
						psmOpenModification_UniquePosition_InReportedPeptide_Entry.setIs_N_Terminal( psmOpenModificationPositionDTO.isIs_N_Terminal() );
						psmOpenModification_UniquePosition_InReportedPeptide_Entry.setIs_C_Terminal( psmOpenModificationPositionDTO.isIs_C_Terminal() );

						psmOpenModification_UniquePositions.add( psmOpenModification_UniquePosition_InReportedPeptide_Entry );
					}
				}
			}
			
			List<PsmFilterableAnnotationDTO> currentPsm_psmAnnotationDTO_Filterable_List = 
					populatePsmAnnotations.populatePsmFilterableAnnotations( psm, psmDTO );
			
			for ( PsmFilterableAnnotationDTO psmFilterableAnnotationDTO : currentPsm_psmAnnotationDTO_Filterable_List ) {
				db_Insert_PsmFilterableAnnotationDAO.saveToDatabase( psmFilterableAnnotationDTO );
			}
			
			List<PsmDescriptiveAnnotationDTO> currentPsm_psmAnnotationDTO_Descriptive_List =
					populatePsmAnnotations.populatePsmDescriptivePsmAnnotations( psm, psmDTO );

			for ( PsmDescriptiveAnnotationDTO psmDescriptiveAnnotationDTO : currentPsm_psmAnnotationDTO_Descriptive_List ) {
				db_Insert_PsmDescriptiveAnnotationDAO.saveToDatabase( psmDescriptiveAnnotationDTO );
			}
			
			boolean doesPsmPassDefaultCutoffs = 
					DoesPsmPassDefaultCutoffs.getInstance()
					.doesPsmPassDefaultCutoffs( currentPsm_psmAnnotationDTO_Filterable_List, filterablePsmAnnotationTypesOnId );
			
			if ( doesPsmPassDefaultCutoffs ) {
				
				dataAccum_All_PSMs.psmCountPassDefaultCutoffs++;
				
				if ( dataAccum_PSMs_In_SubGroup != null ) {
					dataAccum_PSMs_In_SubGroup.psmCountPassDefaultCutoffs++;
				}
			}
			
			dataAccum_All_PSMs.bestPsmFilterableAnnotationProcessing.updateForCurrentPsmFilterableAnnotationData( currentPsm_psmAnnotationDTO_Filterable_List );
			
			if ( dataAccum_PSMs_In_SubGroup != null ) {
				dataAccum_PSMs_In_SubGroup.bestPsmFilterableAnnotationProcessing.updateForCurrentPsmFilterableAnnotationData( currentPsm_psmAnnotationDTO_Filterable_List );
			}
			
			updateSavedPSM_IDs_ForCurrentPsm( dataAccum_All_PSMs, psmDTO );
			
			if ( dataAccum_PSMs_In_SubGroup != null ) {
				updateSavedPSM_IDs_ForCurrentPsm( dataAccum_PSMs_In_SubGroup, psmDTO );
			}
			
			dataAccum_All_PSMs.saveAnyPSMs = true;
			
			if ( dataAccum_PSMs_In_SubGroup != null ) {
				dataAccum_PSMs_In_SubGroup.saveAnyPSMs = true;
			}
			
		} // end of loop processing Psm in input file
		
		if ( ! dataAccum_All_PSMs.saveAnyPSMs ) {
			String msg = "No PSMs saved for this reported peptide: " + 
					reportedPeptide.getReportedPeptideString();
			log.error( msg );
			throw new LimelightImporterInternalException(msg);
		}

		if ( processing_SearchSubGroups ) {
				
			//  Processing Sub Groups so Do Processing
			
			//  Execute SAME code as when psmSortingContainer.searchSubGroupId changes
			
			int searchSubGroupId = prevSearchSubGroupId;

			save_PerSubGroup_Lookup_TableData( dataAccum_PSMs_In_SubGroup, searchId, reportedPeptideDTO, searchSubGroupId );
		}
				
		
		PsmStatisticsAndBestValues psmStatisticsAndBestValues = new PsmStatisticsAndBestValues();
		psmStatisticsAndBestValues.setPsmCountPassDefaultCutoffs( dataAccum_All_PSMs.psmCountPassDefaultCutoffs );
		psmStatisticsAndBestValues.setBestPsmFilterableAnnotationProcessing( dataAccum_All_PSMs.bestPsmFilterableAnnotationProcessing );
		if ( ! psmOpenModification_UniqueMassesRounded.isEmpty() ) {
			psmStatisticsAndBestValues.setPsmOpenModification_UniqueMassesRounded( psmOpenModification_UniqueMassesRounded );
		}
		if ( ! psmOpenModification_UniquePositions.isEmpty() ) {
			psmStatisticsAndBestValues.setPsmOpenModification_UniquePositions( psmOpenModification_UniquePositions );
		}
		if ( dataAccum_All_PSMs.savedPsmIds_Sequential ) {
			psmStatisticsAndBestValues.setFirstSavedPsmId( dataAccum_All_PSMs.firstSavedPsmId );
			psmStatisticsAndBestValues.setLastSavedPsmId( dataAccum_All_PSMs.lastSavedPsmId );
		}
		
		return psmStatisticsAndBestValues;
	}
	
	/**
	 * @param dataAccum_Either
	 * @param psmDTO
	 */
	private void updateSavedPSM_IDs_ForCurrentPsm( DataPerReportedPeptide_Or_PerSubGroup dataAccum_Either, PsmDTO psmDTO ) {

		if ( dataAccum_Either.firstSavedPSM ) {

			dataAccum_Either.firstSavedPSM = false;
			dataAccum_Either.firstSavedPsmId = psmDTO.getId();
			dataAccum_Either.lastSavedPsmId = psmDTO.getId();

		} else {

			if ( dataAccum_Either.savedPsmIds_Sequential ) {  // can skip once savedPsmIds_Sequential is false

				dataAccum_Either.lastSavedPsmId = psmDTO.getId();

				if ( ( dataAccum_Either.previousSavedPsmId + 1 ) != psmDTO.getId()  ) {

					dataAccum_Either.savedPsmIds_Sequential = false;
				}
			}
		}

		dataAccum_Either.previousSavedPsmId = psmDTO.getId();
	}
	
	/**
	 * @param dataAccum_PSMs_In_SubGroup
	 * @param searchId
	 * @param reportedPeptideDTO
	 * @param searchSubGroupId
	 * @throws Exception
	 */
	private void save_PerSubGroup_Lookup_TableData( 
			
			DataPerReportedPeptide_Or_PerSubGroup dataAccum_PSMs_In_SubGroup, 
			int searchId, 
			ReportedPeptideDTO reportedPeptideDTO, 
			int searchSubGroupId ) throws Exception {
		
		if ( ! dataAccum_PSMs_In_SubGroup.saveAnyPSMs ) {
			
			//  No PSMs saved for this sub group so exit
			
			return;  // EARLY RETURN
		}
		
		int reportedPeptideId = reportedPeptideDTO.getId();

		Search_ReportedPeptide_SubGroup__Lookup__DTO search_ReportedPeptide_SubGroup__Lookup__DTO  = new Search_ReportedPeptide_SubGroup__Lookup__DTO();

		search_ReportedPeptide_SubGroup__Lookup__DTO.setSearchId( searchId );
		search_ReportedPeptide_SubGroup__Lookup__DTO.setReportedPeptideId( reportedPeptideId );
		search_ReportedPeptide_SubGroup__Lookup__DTO.setSearchSubGroupId( searchSubGroupId );
		
		search_ReportedPeptide_SubGroup__Lookup__DTO.setAnyPsmHasDynamicModifications( dataAccum_PSMs_In_SubGroup.anyPsmHasDynamicModifications );
		search_ReportedPeptide_SubGroup__Lookup__DTO.setAnyPsmHasOpenModifications( dataAccum_PSMs_In_SubGroup.anyPsmHasOpenModifications );
		search_ReportedPeptide_SubGroup__Lookup__DTO.setAnyPsmHasReporterIons( dataAccum_PSMs_In_SubGroup.anyPsmHasReporterIons );

		if ( dataAccum_PSMs_In_SubGroup.savedPsmIds_Sequential ) {
			search_ReportedPeptide_SubGroup__Lookup__DTO.setPsmIdSequentialStart( dataAccum_PSMs_In_SubGroup.firstSavedPsmId ); // Only not zero if PSM Ids are sequential
			search_ReportedPeptide_SubGroup__Lookup__DTO.setPsmIdSequentialEnd( dataAccum_PSMs_In_SubGroup.lastSavedPsmId );     // Only not zero if PSM Ids are sequential
		}
		
		search_ReportedPeptide_SubGroup__Lookup__DTO.setPsmNumAtDefaultCutoff( dataAccum_PSMs_In_SubGroup.psmCountPassDefaultCutoffs );
		
		DB_Insert_Search_ReportedPeptide_SubGroup__Lookup__DAO.getInstance().saveToDatabase( search_ReportedPeptide_SubGroup__Lookup__DTO );
		
		List<Search_ReportedPeptide_SubGroup_BestPsmValue_Lookup__DTO> bestPsmValueList =
				dataAccum_PSMs_In_SubGroup.bestPsmFilterableAnnotationProcessing
				.getBestPsmValues_SearchSubGroup( search_ReportedPeptide_SubGroup__Lookup__DTO );
		
		for ( Search_ReportedPeptide_SubGroup_BestPsmValue_Lookup__DTO bestPsmValue : bestPsmValueList ) {
			
			DB_Insert_Search_ReportedPeptide_SubGroup_BestPsmValue_Generic_Lookup__DAO.getInstance()
			.saveToDatabase( bestPsmValue );
		}
		
	}
	
	///////
	
	/**
	 * Private class for sorting PSMs
	 *
	 */
	private static class PsmSortingContainer {
		
		Psm psm; 
		int searchSubGroupId;
		int originalOrder;
		
		@Override
		public String toString() {
			return "PsmSortingContainer [psm=" + psm + ", searchSubGroupId=" + searchSubGroupId + ", originalOrder="
					+ originalOrder + "]";
		}
		
	}
	
	/**
	 * Private class for combining data across PSMs
	 *
	 */
	private static class DataPerReportedPeptide_Or_PerSubGroup {
		
		
		BestPsmFilterableAnnotationProcessing bestPsmFilterableAnnotationProcessing;
		
		//  Only used for Sub Group entries
		boolean anyPsmHasDynamicModifications = false;
		boolean anyPsmHasOpenModifications = false;
		boolean anyPsmHasReporterIons = false;
		
		int psmCountPassDefaultCutoffs = 0;
		boolean saveAnyPSMs = false;
		
		boolean firstSavedPSM = true;
		boolean savedPsmIds_Sequential = true;
		long firstSavedPsmId = 0;
		long lastSavedPsmId = 0;
		long previousSavedPsmId = 0;

		/**
		 * Constructor
		 */
		DataPerReportedPeptide_Or_PerSubGroup( Map<Integer, AnnotationTypeDTO> filterablePsmAnnotationTypesOnId ) {
			
			bestPsmFilterableAnnotationProcessing = BestPsmFilterableAnnotationProcessing.getInstance( filterablePsmAnnotationTypesOnId );
		}
		
	}
}
