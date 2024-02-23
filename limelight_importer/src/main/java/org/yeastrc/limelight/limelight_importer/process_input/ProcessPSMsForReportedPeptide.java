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
import java.util.HashMap;
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
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Psm_AndChildren_BatchInserter_DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Psm_AndChildren_BatchInserter_DAO.DB_Insert_Psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Search_ReportedPeptide_SubGroup__Lookup__BatchInserter__DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmOpenModificationPosition_AndChildren_BatchInserter_DAO.DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO.DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects.Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object;
import org.yeastrc.limelight.limelight_importer.objects.PsmOpenModification_UniquePosition_InReportedPeptide_Entry;
import org.yeastrc.limelight.limelight_importer.objects.PsmStatisticsAndBestValues;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry_AllEntries;
import org.yeastrc.limelight.limelight_importer.utils.ReporterIonMass_Round_IfNecessary;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeFilterableDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDynamicModificationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmModificationPositionDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmModificationPositionFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPositionDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPosition_DescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPosition_FilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmReporterIonMassDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmSearchSubGroupDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchSubGroupDTO;
import org.yeastrc.limelight.limelight_shared.dto.Search_ReportedPeptide_SubGroup__Lookup__DTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;

/**
 * 
 *
 */
public class ProcessPSMsForReportedPeptide {

	private static final Logger log = LoggerFactory.getLogger( ProcessPSMsForReportedPeptide.class );
	
	//  Internal constants
	
	private static final int PSM_SORTING_CONTAINER__TARGET_INDEPENDENTDECOY_DECOY_ORDER__TARGET = 1;

	private static final int PSM_SORTING_CONTAINER__TARGET_INDEPENDENTDECOY_DECOY_ORDER__INDEPENDENTDECOY = 2;

	private static final int PSM_SORTING_CONTAINER__TARGET_INDEPENDENTDECOY_DECOY_ORDER__DECOY = 3;



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
	/**
	 * @param reportedPeptide
	 * @param searchId
	 * @param reportedPeptideDTO
	 * @param skip_SubGroup_Processing
	 * @param searchSubGroupDTOMap_Key_searchSubGroupLabel
	 * @param searchProgramEntryMap
	 * @param filterablePsmAnnotationTypesOnId
	 * @param searchScanFileEntry_AllEntries
	 * @param uniqueReporterIonMassesForTheReportedPeptide
	 * @return
	 * @throws LimelightImporterDataException
	 * @throws Exception
	 */
	public PsmStatisticsAndBestValues savePSMs( 
			
			Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object internalHolder_ReportedPeptide_Object, 
			int searchId, 
			ReportedPeptideDTO reportedPeptideDTO, 
			boolean skip_SubGroup_Processing,
			Map<String, SearchSubGroupDTO> searchSubGroupDTOMap_Key_searchSubGroupLabel,
			Map<String, SearchProgramEntry> searchProgramEntryMap,
			Map<Integer, AnnotationTypeDTO> filterablePsmAnnotationTypesOnId,
			Map<Integer, AnnotationTypeDTO> filterable_ModificationPosition_AnnotationTypesOnId,
			SearchScanFileEntry_AllEntries searchScanFileEntry_AllEntries,
			Set<BigDecimal> uniqueReporterIonMassesForTheReportedPeptide
			) throws LimelightImporterDataException, Exception {

		ReportedPeptide reportedPeptide = internalHolder_ReportedPeptide_Object.getReportedPeptide();
		
		boolean processing_SearchSubGroups = false;
		
		if ( ! skip_SubGroup_Processing ) {
			
			processing_SearchSubGroups = true;
		}
		
		String peptideString = reportedPeptide.getSequence();
		
		Psms psms =	reportedPeptide.getPsms();
		List<Psm> psmList = psms.getPsm();
		
		PopulatePsmAnnotations populatePsmAnnotations = PopulatePsmAnnotations.getInstance( searchProgramEntryMap, filterablePsmAnnotationTypesOnId );

		PopulatePsm_ModificationPosition_Annotations populatePsmModificationPositionAnnotations = 
				PopulatePsm_ModificationPosition_Annotations.getInstance( internalHolder_ReportedPeptide_Object, searchProgramEntryMap );
		
		PopulatePsm_Open_ModificationPosition_Annotations populatePsm_Open_ModificationPosition_Annotations =
				PopulatePsm_Open_ModificationPosition_Annotations.getInstance( searchProgramEntryMap );
				

		List<InternalClass_PsmSortingContainer> psmSortingContainerList = new ArrayList<>( psmList.size() );

		{
			int counter = 0;
			for ( Psm psm : psmList ) {

				counter++;
				
				InternalClass_PsmSortingContainer psmSortingContainer = new InternalClass_PsmSortingContainer();
				psmSortingContainerList.add(psmSortingContainer);

				psmSortingContainer.psm = psm;
				psmSortingContainer.originalOrder = counter;
				
				if ( psm.isIsIndependentDecoy() != null && psm.isIsIndependentDecoy() ) {
					//  Independent Decoy order: 2
					psmSortingContainer.target_IndependentDecoy_Decoy_Order = PSM_SORTING_CONTAINER__TARGET_INDEPENDENTDECOY_DECOY_ORDER__INDEPENDENTDECOY;
				} else if ( psm.isIsDecoy() != null && psm.isIsDecoy() ) {
					//  Decoy order: 3
					psmSortingContainer.target_IndependentDecoy_Decoy_Order = PSM_SORTING_CONTAINER__TARGET_INDEPENDENTDECOY_DECOY_ORDER__DECOY;
				} else {
					//  Target order: 1
					psmSortingContainer.target_IndependentDecoy_Decoy_Order = PSM_SORTING_CONTAINER__TARGET_INDEPENDENTDECOY_DECOY_ORDER__TARGET;
				}
			}
		}
		
		//  Sort PSMs

		//  Sort target, independent decoy, then decoy; then if populated, sub group name; then original order of the PSMs

		//  Target PSM is where decoy and independent decoy neither are true

		Collections.sort( psmSortingContainerList, new Comparator<InternalClass_PsmSortingContainer>() {

			@Override
			public int compare(InternalClass_PsmSortingContainer o1, InternalClass_PsmSortingContainer o2) {
				if ( o1.target_IndependentDecoy_Decoy_Order < o2.target_IndependentDecoy_Decoy_Order ) 
					return -1;
				if ( o1.target_IndependentDecoy_Decoy_Order > o2.target_IndependentDecoy_Decoy_Order )
					return 1;
				if ( o1.psm.getSubgroupName() != null ) {
					int compareResult = o1.psm.getSubgroupName().compareTo( o2.psm.getSubgroupName() );
					if ( compareResult != 0 ) {
						return compareResult;
					}
				}
				if ( o1.originalOrder < o2.originalOrder ) 
					return -1;
				if ( o1.originalOrder > o2.originalOrder )
					return 1;
				return 0;
			}
		});

		//   Accumulated data across ALL PSMs
		
		//  For PSMs that are Targets
		BestPsmFilterableAnnotationProcessing bestPsmFilterableAnnotationProcessing_PSM_Targets = BestPsmFilterableAnnotationProcessing.getInstance( filterablePsmAnnotationTypesOnId );
		//  For PSMs that are Targets and Independent Decoys (flag on PSM)
		BestPsmFilterableAnnotationProcessing bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys = BestPsmFilterableAnnotationProcessing.getInstance( filterablePsmAnnotationTypesOnId );
		//  For PSMs that are Targets and Independent Decoys and Decoys (flags on PSM)
		BestPsmFilterableAnnotationProcessing bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys_Decoys = BestPsmFilterableAnnotationProcessing.getInstance( filterablePsmAnnotationTypesOnId );
		
		boolean saveAnyPSMs = false;

		int psmNum_Targets_Only_AtDefaultCutoff = 0;
		int psmNum_IndependentDecoys_Only_AtDefaultCutoff = 0;
		int psmNum_Decoys_Only_AtDefaultCutoff = 0;
		
		long firstSavedPsmId_Is_Target = 0;
		long firstSavedPsmId_Is_IndependentDecoy = 0;
		long firstSavedPsmId_Is_Decoy = 0;
		
		long lastSavedPsmId = 0;
		
		Set<PsmOpenModification_UniquePosition_InReportedPeptide_Entry> psmOpenModification_UniquePositions = new HashSet<>();
		Set<Integer> psmOpenModification_UniqueMassesRounded = new HashSet<>();
		

		//   Accumulated data across PSMs within each SUB GROUP
		
		Map<String, InternalClass_DataPer_PerSubGroup> dataPerSubGroupName_Map_Key_SubgroupName = null;
		
		if ( processing_SearchSubGroups ) {
			//  Only populate When 'processing_SearchSubGroups' is true
			dataPerSubGroupName_Map_Key_SubgroupName = new HashMap<>();
		}
		
		
		final int PREV_PSM_SORTING_CONTAINER__TARGET_INDEPENDENTDECOY_DECOY_ORDER_INITIAL_VALUE = -1; //  no negative values in actual values
				
		int prev__target_IndependentDecoy_Decoy_Order = PREV_PSM_SORTING_CONTAINER__TARGET_INDEPENDENTDECOY_DECOY_ORDER_INITIAL_VALUE;
		
		int psms_SearchImportInProgress_Counter = 0; // NOT a total counter. Is reset to zero.
		
		//  Process PSMs (were copied into PsmSortingContainer objects above)
		
		for ( InternalClass_PsmSortingContainer psmSortingContainer : psmSortingContainerList ) {
			
			Psm psm = psmSortingContainer.psm;
			
			{
				psms_SearchImportInProgress_Counter++;
				if ( psms_SearchImportInProgress_Counter > 400 ) {
					//  at 400th PSM every 400 PSM, Updates 'heart beat'
					Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.getSingletonInstance().saveOrUpdate_ForSearchId(searchId);
				
					psms_SearchImportInProgress_Counter = 0;  	//  reset
				}
			}
			
			boolean psmHasModifications = false;
			boolean psmHasOpenModifications = false;
			boolean psmHasReporterIons = false;
			
			if ( psm.getPsmModifications() != null 
					&& psm.getPsmModifications().getPsmModification() != null
					&& ( ! psm.getPsmModifications().getPsmModification().isEmpty() ) ) {
				
				psmHasModifications = true;
			}
			if ( psm.getPsmOpenModification() != null 
					&& psm.getPsmOpenModification().getMass() != null ) {
				
				psmHasOpenModifications = true;
			}
			if ( psm.getReporterIons() != null 
					&& psm.getReporterIons().getReporterIon() != null
					&& ( ! psm.getReporterIons().getReporterIon().isEmpty() ) ) {
				
				psmHasReporterIons = true;
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
			
			DB_Insert_Psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren = new DB_Insert_Psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren();
			
			psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren.setPsmDTO( psmDTO );
			
			lastSavedPsmId = psmDTO.getId();

			if ( psmSortingContainer.target_IndependentDecoy_Decoy_Order != prev__target_IndependentDecoy_Decoy_Order ) {

				long psmId = psmDTO.getId();

				if ( psmSortingContainer.target_IndependentDecoy_Decoy_Order == PSM_SORTING_CONTAINER__TARGET_INDEPENDENTDECOY_DECOY_ORDER__TARGET ) {
					
					firstSavedPsmId_Is_Target = psmId;
				
				} else if ( psmSortingContainer.target_IndependentDecoy_Decoy_Order == PSM_SORTING_CONTAINER__TARGET_INDEPENDENTDECOY_DECOY_ORDER__INDEPENDENTDECOY ) {
					
					firstSavedPsmId_Is_IndependentDecoy = psmId;
					
				} else if ( psmSortingContainer.target_IndependentDecoy_Decoy_Order == PSM_SORTING_CONTAINER__TARGET_INDEPENDENTDECOY_DECOY_ORDER__DECOY ) {
					
					firstSavedPsmId_Is_Decoy = psmId;
					
				} else {
					String msg = "psmSortingContainer.target_IndependentDecoy_Decoy_Order value not expected.  value: " + psmSortingContainer.target_IndependentDecoy_Decoy_Order;
					log.error(msg);
					throw new LimelightImporterInternalException(msg);
				}

				prev__target_IndependentDecoy_Decoy_Order = psmSortingContainer.target_IndependentDecoy_Decoy_Order;
			}
			
			
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
				
				psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren.getPsmSearchSubGroupDTO__List().add(psmSearchSubGroupDTO);
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
					
					//  NOT called in the Insert: psmDynamicModificationDTO.setId(id);
					
					psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren.getPsmDynamicModificationDTO__List().add( psmDynamicModificationDTO );
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
					
					psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren.getPsmReporterIonMassDTO__List().add( psmReporterIonMassDTO );
				}
			}
			
			//  PSM Modification Position Annotations ( associated with Variable Modifications on Reported Peptide )

			List<PsmModificationPositionFilterableAnnotationDTO> psmModificationPositionFilterableAnnotationDTO_Filterable_List = 
					populatePsmModificationPositionAnnotations.populatePsmModificationPositionilterableAnnotations( psm, psmDTO );

			List<PsmModificationPositionDescriptiveAnnotationDTO> psmModificationPositionDescriptiveAnnotationDTO_Descriptive_List =
					populatePsmModificationPositionAnnotations.populatePsmModificationPositionDescriptivePsmAnnotations( psm, psmDTO );

			psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren.setPsmModificationPositionFilterableAnnotationDTO_Filterable_List(psmModificationPositionFilterableAnnotationDTO_Filterable_List);
			psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren.setPsmModificationPositionDescriptiveAnnotationDTO_Descriptive_List(psmModificationPositionDescriptiveAnnotationDTO_Descriptive_List);
			

			//  PSM Open Modifications
			
			List<PsmOpenModificationPosition_FilterableAnnotationDTO> psmOpenModificationPosition_FilterableAnnotationDTO_List__ALL_OpenMods_For_DefaultCutoff_AND_WorstValue_Processing = new ArrayList<>();
			
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
				
				//  Saved below: psmOpenModificationDTO
				
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
				
				List<DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren> psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren_List = null;
				
				if ( ! psm.getPsmOpenModification().getPsmOpenModificationPosition().isEmpty() ) {
					
					psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren_List = new ArrayList<>( psm.getPsmOpenModification().getPsmOpenModificationPosition().size() );

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
						
						DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren = new DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren();

						psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren.setPsmOpenModificationPositionDTO( psmOpenModificationPositionDTO );
						
						PsmOpenModification_UniquePosition_InReportedPeptide_Entry psmOpenModification_UniquePosition_InReportedPeptide_Entry = new PsmOpenModification_UniquePosition_InReportedPeptide_Entry();
						psmOpenModification_UniquePosition_InReportedPeptide_Entry.setPosition( psmOpenModificationPositionDTO.getPosition() );
						psmOpenModification_UniquePosition_InReportedPeptide_Entry.setIs_N_Terminal( psmOpenModificationPositionDTO.isIs_N_Terminal() );
						psmOpenModification_UniquePosition_InReportedPeptide_Entry.setIs_C_Terminal( psmOpenModificationPositionDTO.isIs_C_Terminal() );

						psmOpenModification_UniquePositions.add( psmOpenModification_UniquePosition_InReportedPeptide_Entry );
						
						
						
						List<PsmOpenModificationPosition_FilterableAnnotationDTO> psmOpenModificationPosition_FilterableAnnotationDTO_List = 
								populatePsm_Open_ModificationPosition_Annotations.populatePsmOpenModificationPositionilterableAnnotations( psmOpenModificationPosition );
						
						List<PsmOpenModificationPosition_DescriptiveAnnotationDTO> psmOpenModificationPosition_DescriptiveAnnotationDTO_List =
								populatePsm_Open_ModificationPosition_Annotations.populatePsmOpenModificationPositionDescriptivePsmAnnotations( psmOpenModificationPosition );
						
						psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren.setPsmOpenModificationPosition_FilterableAnnotationDTO_List(psmOpenModificationPosition_FilterableAnnotationDTO_List);
						psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren.setPsmOpenModificationPosition_DescriptiveAnnotationDTO_List(psmOpenModificationPosition_DescriptiveAnnotationDTO_List);
						
						psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren_List.add( psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren );
						
						//  Add to list for DefaultCutoff Processing below
						psmOpenModificationPosition_FilterableAnnotationDTO_List__ALL_OpenMods_For_DefaultCutoff_AND_WorstValue_Processing.addAll( psmOpenModificationPosition_FilterableAnnotationDTO_List );
					}
				}
				
				//  Save psmOpenModificationDTO, setPsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren_List
				
				DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren saveHolder_AndChildren = new DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren();
				saveHolder_AndChildren.setPsmOpenModificationDTO( psmOpenModificationDTO );
				saveHolder_AndChildren.setPsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren_List( psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren_List );

				psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren.getSaveHolder_PsmOpenModification_AndChildren__List().add( saveHolder_AndChildren );
			}
			
			
			//  PSM Filterable Annotations
			
			List<PsmFilterableAnnotationDTO> currentPsm_psmAnnotationDTO_Filterable_List = 
					populatePsmAnnotations.populatePsmFilterableAnnotations( psm, psmDTO );
			
			for ( PsmFilterableAnnotationDTO psmFilterableAnnotationDTO : currentPsm_psmAnnotationDTO_Filterable_List ) {
				
				psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren.getPsmFilterableAnnotationDTO__List().add( psmFilterableAnnotationDTO );
			}
			
			//  PSM Descriptive Annotations
			
			List<PsmDescriptiveAnnotationDTO> currentPsm_psmAnnotationDTO_Descriptive_List =
					populatePsmAnnotations.populatePsmDescriptivePsmAnnotations( psm, psmDTO );

			for ( PsmDescriptiveAnnotationDTO psmDescriptiveAnnotationDTO : currentPsm_psmAnnotationDTO_Descriptive_List ) {
				
				psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren.getPsmAnnotationDTO_Descriptive__List().add( psmDescriptiveAnnotationDTO );
			}
			
			{
				boolean doesPsmPassDefaultCutoffs = 
						DoesPsmPassDefault_PsmFilterable_Cutoffs.getInstance()
						.doesPsmPassDefault_PsmFilterable_Cutoffs( currentPsm_psmAnnotationDTO_Filterable_List, filterablePsmAnnotationTypesOnId )
						&& 
						DoesPsmPassDefault_ModificationPosition_Cutoffs.getInstance()
						.doesPsmPassDefault_ModificationPosition_Cutoffs( 
								psmModificationPositionFilterableAnnotationDTO_Filterable_List,
								psmOpenModificationPosition_FilterableAnnotationDTO_List__ALL_OpenMods_For_DefaultCutoff_AND_WorstValue_Processing,
								filterable_ModificationPosition_AnnotationTypesOnId );
				
				InternalClass_DataPer_PerSubGroup dataPerSubGroupName = null;

				if ( dataPerSubGroupName_Map_Key_SubgroupName != null ) {

					if ( StringUtils.isEmpty( psm.getSubgroupName() ) ) {
						String msg = "Processing Sub Groups but no Sub Group on PSM.  psm scan number: " + psm.getScanNumber();
						log.error(msg);
						throw new LimelightImporterDataException(msg);
					}

					dataPerSubGroupName = dataPerSubGroupName_Map_Key_SubgroupName.get( psm.getSubgroupName() );
					if ( dataPerSubGroupName == null ) {
						dataPerSubGroupName = new InternalClass_DataPer_PerSubGroup();
						dataPerSubGroupName_Map_Key_SubgroupName.put( psm.getSubgroupName(), dataPerSubGroupName );
					}
				}

				if ( doesPsmPassDefaultCutoffs ) {

					if ( psmDTO.isDecoy() ) {

						//  Is Decoy PSM

						psmNum_Decoys_Only_AtDefaultCutoff++;

						if ( dataPerSubGroupName != null ) {
							dataPerSubGroupName.psmNum_Decoys_Only_AtDefaultCutoff++;  // Increment for Sub Group Name
						}
						
					} else if ( psmDTO.isIndependentDecoy() ) {

						//  Is Independent Decoy PSM

						psmNum_IndependentDecoys_Only_AtDefaultCutoff++;

						if ( dataPerSubGroupName != null ) {
							dataPerSubGroupName.psmNum_IndependentDecoys_Only_AtDefaultCutoff++;  // Increment for Sub Group Name
						}

					} else {
						//  Not any Decoy so is Target PSM

						psmNum_Targets_Only_AtDefaultCutoff++;

						if ( dataPerSubGroupName != null ) {
							dataPerSubGroupName.psmNum_Targets_Only_AtDefaultCutoff++;  // Increment for Sub Group Name
						}
					}
				}
			}
			
			{  //  WORST Modification Position Scores Processing
				
				Map<Integer, Double> worstPositionScore_Map_Key_AnnotationId = new HashMap<>();
				
				if ( psmModificationPositionFilterableAnnotationDTO_Filterable_List != null ) {
					for ( PsmModificationPositionFilterableAnnotationDTO psmModificationPositionFilterableAnnotationDTO : psmModificationPositionFilterableAnnotationDTO_Filterable_List ) {

						Integer annotationTypeId = psmModificationPositionFilterableAnnotationDTO.getAnnotationTypeId();
						
						AnnotationTypeDTO annotationTypeDTO = filterable_ModificationPosition_AnnotationTypesOnId.get( annotationTypeId );
						if ( annotationTypeDTO == null ) {
							String msg = "filterable_ModificationPosition_AnnotationTypesOnId.get( psmModificationPositionFilterableAnnotationDTO.getAnnotationTypeId() ); returned null for psmModificationPositionFilterableAnnotationDTO.getAnnotationTypeId(): "
									+ psmModificationPositionFilterableAnnotationDTO.getAnnotationTypeId();
							log.error(msg);
							throw new LimelightImporterInternalException(msg);
						}
						AnnotationTypeFilterableDTO annotationTypeFilterableDTO = annotationTypeDTO.getAnnotationTypeFilterableDTO();
						if ( annotationTypeFilterableDTO == null ) {
							String msg = "( annotationTypeDTO.getAnnotationTypeFilterableDTO() == null ) FROM filterable_ModificationPosition_AnnotationTypesOnId.get( psmModificationPositionFilterableAnnotationDTO.getAnnotationTypeId() ); for psmModificationPositionFilterableAnnotationDTO.getAnnotationTypeId(): "
									+ psmModificationPositionFilterableAnnotationDTO.getAnnotationTypeId();
							log.error(msg);
							throw new LimelightImporterInternalException(msg);
						}
						if ( annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
							
							Double existingScore = worstPositionScore_Map_Key_AnnotationId.get( annotationTypeId );
							if ( existingScore == null ) {
								worstPositionScore_Map_Key_AnnotationId.put( annotationTypeId, psmModificationPositionFilterableAnnotationDTO.getValueDouble() ); // Add as Worst Score
							} else if ( existingScore.doubleValue() > psmModificationPositionFilterableAnnotationDTO.getValueDouble().doubleValue() ) {
								worstPositionScore_Map_Key_AnnotationId.put( annotationTypeId, psmModificationPositionFilterableAnnotationDTO.getValueDouble() ); // New Worst Score
							}
							
						} else if ( annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.BELOW ) {

							Double existingScore = worstPositionScore_Map_Key_AnnotationId.get( annotationTypeId );
							if ( existingScore == null ) {
								worstPositionScore_Map_Key_AnnotationId.put( annotationTypeId, psmModificationPositionFilterableAnnotationDTO.getValueDouble() ); // Add as Worst Score
							} else if ( existingScore.doubleValue() < psmModificationPositionFilterableAnnotationDTO.getValueDouble().doubleValue() ) {
								worstPositionScore_Map_Key_AnnotationId.put( annotationTypeId, psmModificationPositionFilterableAnnotationDTO.getValueDouble() ); // New Worst Score
							}
							
						} else {
							String msg = "( annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() NOT ABOVE or BELOW FROM filterable_ModificationPosition_AnnotationTypesOnId.get( psmModificationPositionFilterableAnnotationDTO.getAnnotationTypeId() ); for psmModificationPositionFilterableAnnotationDTO.getAnnotationTypeId(): " 
									+ psmModificationPositionFilterableAnnotationDTO.getAnnotationTypeId();
							log.error(msg);
							throw new LimelightImporterInternalException(msg);
						}
					}
				}
				
				if ( psmOpenModificationPosition_FilterableAnnotationDTO_List__ALL_OpenMods_For_DefaultCutoff_AND_WorstValue_Processing != null ) {
					for ( PsmOpenModificationPosition_FilterableAnnotationDTO psmOpenModificationPosition_FilterableAnnotationDTO : psmOpenModificationPosition_FilterableAnnotationDTO_List__ALL_OpenMods_For_DefaultCutoff_AND_WorstValue_Processing ) {

						Integer annotationTypeId = psmOpenModificationPosition_FilterableAnnotationDTO.getAnnotationTypeId();
						
						AnnotationTypeDTO annotationTypeDTO = filterable_ModificationPosition_AnnotationTypesOnId.get( annotationTypeId );
						if ( annotationTypeDTO == null ) {
							String msg = "filterable_ModificationPosition_AnnotationTypesOnId.get( psmOpenModificationPosition_FilterableAnnotationDTO.getAnnotationTypeId() ); returned null for psmOpenModificationPosition_FilterableAnnotationDTO.getAnnotationTypeId(): "
									+ psmOpenModificationPosition_FilterableAnnotationDTO.getAnnotationTypeId();
							log.error(msg);
							throw new LimelightImporterInternalException(msg);
						}
						AnnotationTypeFilterableDTO annotationTypeFilterableDTO = annotationTypeDTO.getAnnotationTypeFilterableDTO();
						if ( annotationTypeFilterableDTO == null ) {
							String msg = "( annotationTypeDTO.getAnnotationTypeFilterableDTO() == null ) FROM filterable_ModificationPosition_AnnotationTypesOnId.get( psmOpenModificationPosition_FilterableAnnotationDTO.getAnnotationTypeId() ); for psmOpenModificationPosition_FilterableAnnotationDTO.getAnnotationTypeId(): " 
									+ psmOpenModificationPosition_FilterableAnnotationDTO.getAnnotationTypeId();
							log.error(msg);
							throw new LimelightImporterInternalException(msg);
						}
						if ( annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
							
							Double existingScore = worstPositionScore_Map_Key_AnnotationId.get( annotationTypeId );
							if ( existingScore == null ) {
								worstPositionScore_Map_Key_AnnotationId.put( annotationTypeId, psmOpenModificationPosition_FilterableAnnotationDTO.getValueDouble() ); // Add as Worst Score
							} else if ( existingScore.doubleValue() > psmOpenModificationPosition_FilterableAnnotationDTO.getValueDouble().doubleValue() ) {
								worstPositionScore_Map_Key_AnnotationId.put( annotationTypeId, psmOpenModificationPosition_FilterableAnnotationDTO.getValueDouble() ); // New Worst Score
							}
							
						} else if ( annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.BELOW ) {

							Double existingScore = worstPositionScore_Map_Key_AnnotationId.get( annotationTypeId );
							if ( existingScore == null ) {
								worstPositionScore_Map_Key_AnnotationId.put( annotationTypeId, psmOpenModificationPosition_FilterableAnnotationDTO.getValueDouble() ); // Add as Worst Score
							} else if ( existingScore.doubleValue() < psmOpenModificationPosition_FilterableAnnotationDTO.getValueDouble().doubleValue() ) {
								worstPositionScore_Map_Key_AnnotationId.put( annotationTypeId, psmOpenModificationPosition_FilterableAnnotationDTO.getValueDouble() ); // New Worst Score
							}
							
						} else {
							String msg = "( annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() NOT ABOVE or BELOW FROM filterable_ModificationPosition_AnnotationTypesOnId.get( psmOpenModificationPosition_FilterableAnnotationDTO.getAnnotationTypeId() ); for psmOpenModificationPosition_FilterableAnnotationDTO.getAnnotationTypeId(): "
									+ psmOpenModificationPosition_FilterableAnnotationDTO.getAnnotationTypeId();
							log.error(msg);
							throw new LimelightImporterInternalException(msg);
						}
					}
				}
				
				if ( ! worstPositionScore_Map_Key_AnnotationId.isEmpty() ) {

					List<PsmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO> psmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO_List = new ArrayList<>( worstPositionScore_Map_Key_AnnotationId.size() );

					psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren.setPsmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO_List(psmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO_List);

					for ( Map.Entry<Integer, Double> mapEntry : worstPositionScore_Map_Key_AnnotationId.entrySet() ) {

						PsmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO dto = new PsmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO();
						dto.setPsmId( psmDTO.getId() );
						dto.setAnnotationTypeId( mapEntry.getKey() );
						dto.setWorstValueDouble( mapEntry.getValue() );

						psmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO_List.add( dto );
					}
				}
			}
			
			//  Update "Best" PSM Annotation Value using current PSM

			if ( psmDTO.isDecoy() ) {

				//  Is Decoy PSM

				//  Update: For PSMs that are Targets and Independent Decoys and Decoys (flags on PSM)
				bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys_Decoys.updateForCurrentPsmFilterableAnnotationData( currentPsm_psmAnnotationDTO_Filterable_List );
				
			} else if ( psmDTO.isIndependentDecoy() ) {

				//  Is Independent Decoy PSM

				//  Update: For PSMs that are Targets and Independent Decoys (flag on PSM)
				bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys.updateForCurrentPsmFilterableAnnotationData( currentPsm_psmAnnotationDTO_Filterable_List );

				//  Update since is part of that group as well
				//     Update: For PSMs that are Targets and Independent Decoys and Decoys (flags on PSM)
				bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys_Decoys.updateForCurrentPsmFilterableAnnotationData( currentPsm_psmAnnotationDTO_Filterable_List );
				
			} else {
				//  Not any Decoy so is Target PSM

				//  Update: For PSMs that are Targets
				bestPsmFilterableAnnotationProcessing_PSM_Targets.updateForCurrentPsmFilterableAnnotationData( currentPsm_psmAnnotationDTO_Filterable_List );

				//  Update since is part of that group as well
				//     Update: For PSMs that are Targets and Independent Decoys (flag on PSM)
				bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys.updateForCurrentPsmFilterableAnnotationData( currentPsm_psmAnnotationDTO_Filterable_List );

				//  Update since is part of that group as well
				//     Update: For PSMs that are Targets and Independent Decoys and Decoys (flags on PSM)
				bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys_Decoys.updateForCurrentPsmFilterableAnnotationData( currentPsm_psmAnnotationDTO_Filterable_List );
			}

			
			
			//  Add PSM and it's children to batch
			
			DB_Insert_Psm_AndChildren_BatchInserter_DAO.getSingletonInstance().insert_Batching_ObjectAndChildren( psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren );
			
			
			
			saveAnyPSMs = true;
			
			
			
		} // end of loop processing Psm in input file
		
		if ( ! saveAnyPSMs ) {
			String msg = "No PSMs saved for this reported peptide: " + 
					reportedPeptide.getReportedPeptideString();
			log.error( msg );
			throw new LimelightImporterInternalException(msg);
		}

		if ( processing_SearchSubGroups ) {
				
			//  Processing Sub Groups so Do Processing
			
			if ( dataPerSubGroupName_Map_Key_SubgroupName == null ) {
				String msg = "After processing PSMs, processing_SearchSubGroups is true and ( dataPerSubGroupName_Map_Key_SubgroupName == null )";
				log.error(msg);
				throw new LimelightImporterInternalException(msg);
			}
			
			for ( Map.Entry<String, InternalClass_DataPer_PerSubGroup> mapEntry : dataPerSubGroupName_Map_Key_SubgroupName.entrySet() ) {
				
				String searchSubGroupName = mapEntry.getKey();
				InternalClass_DataPer_PerSubGroup dataPerSubGroupName_For_searchSubGroupName = mapEntry.getValue();
				
				SearchSubGroupDTO searchSubGroupDTO = searchSubGroupDTOMap_Key_searchSubGroupLabel.get( searchSubGroupName );
				if ( searchSubGroupDTO == null ) {
					String msg = "Internal Error: searchSubGroupDTOMap_Key_searchSubGroupLabel.get( searchSubGroupName ); returned null. searchSubGroupName: " + searchSubGroupName;
					log.error(msg);
					throw new LimelightImporterInternalException(msg);
				}
				
				int searchSubGroupId = searchSubGroupDTO.getSearchSubGroupId();
				
				save_PerSubGroup_Lookup_TableData( dataPerSubGroupName_For_searchSubGroupName, searchId, reportedPeptideDTO, searchSubGroupId );
			}
		}
				
		
		PsmStatisticsAndBestValues psmStatisticsAndBestValues = new PsmStatisticsAndBestValues();
		
		psmStatisticsAndBestValues.setPsmNum_Targets_Only_AtDefaultCutoff( psmNum_Targets_Only_AtDefaultCutoff );
		psmStatisticsAndBestValues.setPsmNum_IndependentDecoys_Only_AtDefaultCutoff( psmNum_IndependentDecoys_Only_AtDefaultCutoff );
		psmStatisticsAndBestValues.setPsmNum_Decoys_Only_AtDefaultCutoff( psmNum_Decoys_Only_AtDefaultCutoff );
		
		psmStatisticsAndBestValues.setBestPsmFilterableAnnotationProcessing_PSM_Targets(bestPsmFilterableAnnotationProcessing_PSM_Targets);
		psmStatisticsAndBestValues.setBestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys(bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys);
		psmStatisticsAndBestValues.setBestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys_Decoys(bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys_Decoys);
				
		if ( ! psmOpenModification_UniqueMassesRounded.isEmpty() ) {
			psmStatisticsAndBestValues.setPsmOpenModification_UniqueMassesRounded( psmOpenModification_UniqueMassesRounded );
		}
		if ( ! psmOpenModification_UniquePositions.isEmpty() ) {
			psmStatisticsAndBestValues.setPsmOpenModification_UniquePositions( psmOpenModification_UniquePositions );
		}
		
		psmStatisticsAndBestValues.setFirstSavedPsmId_Is_Target( firstSavedPsmId_Is_Target );
		psmStatisticsAndBestValues.setFirstSavedPsmId_Is_IndependentDecoy( firstSavedPsmId_Is_IndependentDecoy );
		psmStatisticsAndBestValues.setFirstSavedPsmId_Is_Decoy( firstSavedPsmId_Is_Decoy );
		
		psmStatisticsAndBestValues.setLastSavedPsmId( lastSavedPsmId );
		
		return psmStatisticsAndBestValues;
	}
	
	/**
	 * @param dataAccum_PSMs_In_SubGroup
	 * @param searchId
	 * @param reportedPeptideDTO
	 * @param searchSubGroupId
	 * @throws Exception
	 */
	private void save_PerSubGroup_Lookup_TableData( 
			
			InternalClass_DataPer_PerSubGroup dataPerSubGroupName, 
			int searchId, 
			ReportedPeptideDTO reportedPeptideDTO, 
			int searchSubGroupId ) throws Exception {
		
		if ( dataPerSubGroupName.psmNum_Targets_Only_AtDefaultCutoff == 0 && dataPerSubGroupName.psmNum_IndependentDecoys_Only_AtDefaultCutoff == 0 && dataPerSubGroupName.psmNum_Decoys_Only_AtDefaultCutoff == 0 ) {
			
			//  No PSMs saved for this sub group so exit
			
			return;  // EARLY RETURN
		}
		
		int reportedPeptideId = reportedPeptideDTO.getId();

		Search_ReportedPeptide_SubGroup__Lookup__DTO search_ReportedPeptide_SubGroup__Lookup__DTO  = new Search_ReportedPeptide_SubGroup__Lookup__DTO();

		search_ReportedPeptide_SubGroup__Lookup__DTO.setSearchId( searchId );
		search_ReportedPeptide_SubGroup__Lookup__DTO.setReportedPeptideId( reportedPeptideId );
		search_ReportedPeptide_SubGroup__Lookup__DTO.setSearchSubGroupId( searchSubGroupId );
		
		search_ReportedPeptide_SubGroup__Lookup__DTO.setPsmNum_Targets_Only_AtDefaultCutoff( dataPerSubGroupName.psmNum_Targets_Only_AtDefaultCutoff );
		search_ReportedPeptide_SubGroup__Lookup__DTO.setPsmNum_IndependentDecoys_Only_AtDefaultCutoff( dataPerSubGroupName.psmNum_IndependentDecoys_Only_AtDefaultCutoff );
		search_ReportedPeptide_SubGroup__Lookup__DTO.setPsmNum_Decoys_Only_AtDefaultCutoff( dataPerSubGroupName.psmNum_Decoys_Only_AtDefaultCutoff );
		
		DB_Insert_Search_ReportedPeptide_SubGroup__Lookup__BatchInserter__DAO.getSingletonInstance().insert_Batching_Object( search_ReportedPeptide_SubGroup__Lookup__DTO );
	}
	
	///////
	
	/**
	 * Private class for sorting PSMs
	 *
	 */
	private static class InternalClass_PsmSortingContainer {
		
		Psm psm; 
		
		/**
		 * set to 1 for target, 2 for independent decoy, 3 for decoy - Use constants at top file root class
		 */
		int target_IndependentDecoy_Decoy_Order;
		
		int originalOrder;
		
		@Override
		public String toString() {
			return "PsmSortingContainer [psm=" + psm + ", target_IndependentDecoy_Decoy_Order="
					+ target_IndependentDecoy_Decoy_Order + ", originalOrder=" + originalOrder + "]";
		}
	}
	
	/**
	 * Private class for combining data across PSMs
	 *
	 */
	private static class InternalClass_DataPer_PerSubGroup {

		int psmNum_Targets_Only_AtDefaultCutoff;
		int psmNum_IndependentDecoys_Only_AtDefaultCutoff;
		int psmNum_Decoys_Only_AtDefaultCutoff;
	}
}
