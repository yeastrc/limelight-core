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

import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PsmModification;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psms;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmDescriptiveAnnotationDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmDynamicModificationDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmFilterableAnnotationDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmFilterableAnnotationLookupDAO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.PsmStatisticsAndBestValues;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDynamicModificationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationLookupDTO;
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
			Map<String, SearchScanFileEntry> searchScanFileEntry_KeyScanFilename ) throws LimelightImporterDataException, Exception {
		
		Psms psms =	reportedPeptide.getPsms();
		List<Psm> psmList = psms.getPsm();
		
		PopulatePsmAnnotations populatePsmAnnotations = PopulatePsmAnnotations.getInstance( searchProgramEntryMap, filterablePsmAnnotationTypesOnId );
		
		BestPsmFilterableAnnotationProcessing bestPsmFilterableAnnotationProcessing = BestPsmFilterableAnnotationProcessing.getInstance( filterablePsmAnnotationTypesOnId );
		
		DB_Insert_PsmDynamicModificationDAO db_Insert_PsmDynamicModificationDAO = DB_Insert_PsmDynamicModificationDAO.getInstance();
		DB_Insert_PsmFilterableAnnotationDAO db_Insert_PsmFilterableAnnotationDAO = DB_Insert_PsmFilterableAnnotationDAO.getInstance();
		DB_Insert_PsmDescriptiveAnnotationDAO db_Insert_PsmDescriptiveAnnotationDAO = DB_Insert_PsmDescriptiveAnnotationDAO.getInstance();
		DB_Insert_PsmFilterableAnnotationLookupDAO db_Insert_PsmFilterableAnnotationLookupDAO = DB_Insert_PsmFilterableAnnotationLookupDAO.getInstance();
		
		int psmCountPassDefaultCutoffs = 0;
		boolean saveAnyPSMs = false;
		for ( Psm psm : psmList ) {

			boolean psmHasModifications = false;
			
			if ( psm.getPsmModifications() != null 
					&& psm.getPsmModifications().getPsmModification() != null
					&& ( ! psm.getPsmModifications().getPsmModification().isEmpty() ) ) {
				
				psmHasModifications = true;
			}
			
			PsmDTO psmDTO = 
					PopulatePsmDTO.getInstance().populatePsmDTO( 
							searchId, 
							reportedPeptideDTO, 
							psm,
							psmHasModifications,
							searchScanFileEntry_KeyScanFilename );
			
			DB_Insert_PsmDAO.getInstance().saveToDatabase( psmDTO );
			
			if ( psmHasModifications ) {
				List<PsmModification> psmModificationList = psm.getPsmModifications().getPsmModification();
				for ( PsmModification psmModification : psmModificationList ) {
					PsmDynamicModificationDTO psmDynamicModificationDTO = new PsmDynamicModificationDTO();
					psmDynamicModificationDTO.setPsmId( psmDTO.getId() );
					psmDynamicModificationDTO.setPosition( psmModification.getPosition().intValue() );
					psmDynamicModificationDTO.setMass( psmModification.getMass().doubleValue() );
					db_Insert_PsmDynamicModificationDAO.saveToDatabase( psmDynamicModificationDTO );
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
			
			//  Save PSM Lookup version
			for ( PsmFilterableAnnotationDTO psmFilterableAnnotationDTO : currentPsm_psmAnnotationDTO_Filterable_List ) {
				PsmFilterableAnnotationLookupDTO psmFilterableAnnotationLookupDTO = new PsmFilterableAnnotationLookupDTO();
				psmFilterableAnnotationLookupDTO.setSearchId( searchId );
				psmFilterableAnnotationLookupDTO.setReportedPeptideId( reportedPeptideDTO.getId() );
				psmFilterableAnnotationLookupDTO.setValueDouble( psmFilterableAnnotationDTO.getValueDouble() );
				psmFilterableAnnotationLookupDTO.setPsmAnnotationFilterableId( psmFilterableAnnotationDTO.getId() );
				psmFilterableAnnotationLookupDTO.setPsmId( psmDTO.getId() );
				psmFilterableAnnotationLookupDTO.setAnnotationTypeId( psmFilterableAnnotationDTO.getAnnotationTypeId() );
				db_Insert_PsmFilterableAnnotationLookupDAO.saveToDatabase( psmFilterableAnnotationLookupDTO );
			}
			
			boolean doesPsmPassDefaultCutoffs = 
					DoesPsmPassDefaultCutoffs.getInstance()
					.doesPsmPassDefaultCutoffs( currentPsm_psmAnnotationDTO_Filterable_List, filterablePsmAnnotationTypesOnId );
			
			if ( doesPsmPassDefaultCutoffs ) {
				psmCountPassDefaultCutoffs++;
			}
			
			bestPsmFilterableAnnotationProcessing.updateForCurrentPsmFilterableAnnotationData( currentPsm_psmAnnotationDTO_Filterable_List );
			
			saveAnyPSMs = true;
		}
		if ( ! saveAnyPSMs ) {
			String msg = "No PSMs saved for this reported peptide: " + 
					reportedPeptide.getReportedPeptideString();
			log.error( msg );
			throw new LimelightImporterInternalException(msg);
		}
		
		PsmStatisticsAndBestValues psmStatisticsAndBestValues = new PsmStatisticsAndBestValues();
		psmStatisticsAndBestValues.setPsmCountPassDefaultCutoffs( psmCountPassDefaultCutoffs );
		psmStatisticsAndBestValues.setBestPsmFilterableAnnotationProcessing( bestPsmFilterableAnnotationProcessing );
		
		return psmStatisticsAndBestValues;
	}
}