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
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.LoggerFactory;
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
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;

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
			Map<String, SearchProgramEntry> searchProgramEntryMap,
			Map<Integer, AnnotationTypeDTO> filterablePsmAnnotationTypesOnId,
			SearchScanFileEntry_AllEntries searchScanFileEntry_AllEntries,
			Set<BigDecimal> uniqueReporterIonMassesForTheReportedPeptide ) throws LimelightImporterDataException, Exception {
		
		String peptideString = reportedPeptide.getSequence();
		
		Psms psms =	reportedPeptide.getPsms();
		List<Psm> psmList = psms.getPsm();
		
		PopulatePsmAnnotations populatePsmAnnotations = PopulatePsmAnnotations.getInstance( searchProgramEntryMap, filterablePsmAnnotationTypesOnId );
		
		BestPsmFilterableAnnotationProcessing bestPsmFilterableAnnotationProcessing = BestPsmFilterableAnnotationProcessing.getInstance( filterablePsmAnnotationTypesOnId );
		
		DB_Insert_PsmDynamicModificationDAO db_Insert_PsmDynamicModificationDAO = DB_Insert_PsmDynamicModificationDAO.getInstance();
		DB_Insert_PsmReporterIonMassDAO db_Insert_PsmReporterIonMassDAO = DB_Insert_PsmReporterIonMassDAO.getInstance();
		DB_Insert_PsmFilterableAnnotationDAO db_Insert_PsmFilterableAnnotationDAO = DB_Insert_PsmFilterableAnnotationDAO.getInstance();
		DB_Insert_PsmDescriptiveAnnotationDAO db_Insert_PsmDescriptiveAnnotationDAO = DB_Insert_PsmDescriptiveAnnotationDAO.getInstance();
		
		Set<PsmOpenModification_UniquePosition_InReportedPeptide_Entry> psmOpenModification_UniquePositions = new HashSet<>();
		Set<Integer> psmOpenModification_UniqueMassesRounded = new HashSet<>();
		
		int psmCountPassDefaultCutoffs = 0;
		boolean saveAnyPSMs = false;
		
		boolean firstSavedPSM = true;
		boolean savedPsmIds_Sequential = true;
		long firstSavedPsmId = 0;
		long lastSavedPsmId = 0;
		long previousSavedPsmId = 0;
		
		for ( Psm psm : psmList ) {

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
			
			DB_Insert_PsmDAO.getInstance().saveToDatabase( psmDTO );
			
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
				psmCountPassDefaultCutoffs++;
			}
			
			bestPsmFilterableAnnotationProcessing.updateForCurrentPsmFilterableAnnotationData( currentPsm_psmAnnotationDTO_Filterable_List );
			
			{
				if ( firstSavedPSM ) {
					
					firstSavedPSM = false;
					firstSavedPsmId = psmDTO.getId();
					
				} else {
					
					if ( savedPsmIds_Sequential ) {  // can skip once savedPsmIds_Sequential is false
						
						lastSavedPsmId = psmDTO.getId();
						
						if ( ( previousSavedPsmId + 1 ) != psmDTO.getId()  ) {
							
							savedPsmIds_Sequential = false;
						}
					}
				}
			
				previousSavedPsmId = psmDTO.getId();
			}
			
			saveAnyPSMs = true;
			
		} // end of loop processing Psm in input file
		
		if ( ! saveAnyPSMs ) {
			String msg = "No PSMs saved for this reported peptide: " + 
					reportedPeptide.getReportedPeptideString();
			log.error( msg );
			throw new LimelightImporterInternalException(msg);
		}
		
		PsmStatisticsAndBestValues psmStatisticsAndBestValues = new PsmStatisticsAndBestValues();
		psmStatisticsAndBestValues.setPsmCountPassDefaultCutoffs( psmCountPassDefaultCutoffs );
		psmStatisticsAndBestValues.setBestPsmFilterableAnnotationProcessing( bestPsmFilterableAnnotationProcessing );
		if ( ! psmOpenModification_UniqueMassesRounded.isEmpty() ) {
			psmStatisticsAndBestValues.setPsmOpenModification_UniqueMassesRounded( psmOpenModification_UniqueMassesRounded );
		}
		if ( ! psmOpenModification_UniquePositions.isEmpty() ) {
			psmStatisticsAndBestValues.setPsmOpenModification_UniquePositions( psmOpenModification_UniquePositions );
		}
		if ( savedPsmIds_Sequential ) {
			psmStatisticsAndBestValues.setFirstSavedPsmId( firstSavedPsmId );
			psmStatisticsAndBestValues.setLastSavedPsmId( lastSavedPsmId );
		}
		
		return psmStatisticsAndBestValues;
	}
}
