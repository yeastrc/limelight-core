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
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteins;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_importer.batch_insert_db_records.SearchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records;
import org.yeastrc.limelight.limelight_importer.constants.Importer_Stats_GeneralData_Table__Label_Values_Enum;
import org.yeastrc.limelight.limelight_importer.dao.Importer_Stats_GeneralData_DAO;
import org.yeastrc.limelight.limelight_importer.dao.SearchDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Psm_AndChildren_BatchInserter_DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchDynamicModMassDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchIsotopeLabelDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchOpenModMass_ReportedPeptideUniqueValues_DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchRepPeptSubGroup__BatchInserter_DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchReportedPeptideDescriptiveAnnotation_AndChildren_BatchInserter_DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchReportedPeptideFilterableAnnotation_BatchInserter_DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchReportedPeptideProteinVersion_BatchInserter_DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Search_ReportedPeptide_OpenMod_PsmUniquePositions_BatchInserter_DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Search_ReportedPeptide_ReporterIonMass_BatchInserter_DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Search_ReportedPeptide_SubGroup__Lookup__BatchInserter__DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Search_ReporterIonMassDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SrchRepPept_IsotopeLabel_BatchInserter_DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SrchRepPept_PsmOpenModRounded_Lookup_BatchInserter_DAO;
import org.yeastrc.limelight.limelight_importer.dto.Importer_Stats_GeneralData_DTO;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects.Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object;
import org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects.Input_LimelightXMLFile_InternalHolder_Root_Object;
import org.yeastrc.limelight.limelight_importer.lookup_records_create_update.LookupRecordsCreate_Main;
import org.yeastrc.limelight.limelight_importer.objects.PsmOpenModification_UniquePosition_InReportedPeptide_Entry;
import org.yeastrc.limelight.limelight_importer.objects.PsmStatisticsAndBestValues;
import org.yeastrc.limelight.limelight_importer.objects.ReportedPeptideAndPsmFilterableAnnotationTypesOnId;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry_AllEntries;
import org.yeastrc.limelight.limelight_importer.process_input.ProcessSave_SingleReportedPeptide.ProcessSave_SingleReportedPeptide_Results;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchSubGroupDTO;
import org.yeastrc.limelight.limelight_shared.dto.Search_ReportedPeptide_OpenMod_PsmUniquePositions_DTO;
import org.yeastrc.limelight.limelight_shared.dto.Search_ReportedPeptide_ReporterIon_Mass_Lookup_DTO;
import org.yeastrc.limelight.limelight_shared.dto.SrchRepPept_PsmOpenModRounded_Lookup_DTO;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;

/**
 * 
 *
 */
public class ProcessReportedPeptidesAndPSMs {
	
	private static final Logger log = LoggerFactory.getLogger( ProcessReportedPeptidesAndPSMs.class );

	/**
	 * private constructor
	 */
	private ProcessReportedPeptidesAndPSMs(){}
	public static ProcessReportedPeptidesAndPSMs getInstance() {
		return new ProcessReportedPeptidesAndPSMs();
	}
	
	/**
	 * @param limelightInput
	 * @param search
	 * @param searchProgramEntryMap
	 * @param reportedPeptideAndPsmAndMatchedProteinsFilterableAnnotationTypesOnId
	 * @param searchScanFileEntry_KeyScanFilename
	 * @throws Exception
	 */
	public void processReportedPeptides( 
			Input_LimelightXMLFile_InternalHolder_Root_Object input_LimelightXMLFile_InternalHolder_Root_Object, 
			SearchDTO_Importer search,
			boolean skip_SubGroup_Processing,
			Map<String, SearchSubGroupDTO> searchSubGroupDTOMap_Key_searchSubGroupLabel,
			Map<String, SearchProgramEntry> searchProgramEntryMap,
			ReportedPeptideAndPsmFilterableAnnotationTypesOnId reportedPeptideAndPsmAndMatchedProteinsFilterableAnnotationTypesOnId,
			SearchScanFileEntry_AllEntries searchScanFileEntry_AllEntries
			) throws Exception {

		//   Commit what is in progress
		ImportRunImporterDBConnectionFactory.getMainSingletonInstance().commitInsertControlCommitConnection();


		long startTimeNanoSeconds = System.nanoTime();
		
		
		
		int searchId = search.getId();
		
		// Put MatchedProteins in Singleton class GetProteinsForPeptides
		MatchedProteins matchedProteinsFromLimelightXML = input_LimelightXMLFile_InternalHolder_Root_Object.getLimelightInput().getMatchedProteins();
		GetProteinsForPeptide.getSingletonInstance().setMatchedProteinsFromLimelightXML( matchedProteinsFromLimelightXML );
		
		Map<Integer, AnnotationTypeDTO> filterableReportedPeptideAnnotationTypesOnId = 
				reportedPeptideAndPsmAndMatchedProteinsFilterableAnnotationTypesOnId.getFilterableReportedPeptideAnnotationTypesOnId();
		Map<Integer, AnnotationTypeDTO> filterablePsmAnnotationTypesOnId = 
				reportedPeptideAndPsmAndMatchedProteinsFilterableAnnotationTypesOnId.getFilterablePsmAnnotationTypesOnId();

		boolean anyReportedPeptideHasAnyPsmsHasDynamicModifications = false;
		boolean anyReportedPeptideHasAnyPsmsHasReporterIons = false;
		
		//////////////
		
		if ( input_LimelightXMLFile_InternalHolder_Root_Object.is_Any_InternalHolder_ReportedPeptide_Objects() ) {
			
			//  Create and Initialize

			SearchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records searchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records =
					SearchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records.getSingletonInstance();
			
			searchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records.initialize(input_LimelightXMLFile_InternalHolder_Root_Object.getLimelightInput());

			//  Accumulate Unique Reported Peptide Level Dynamic Mod Masses to insert into a lookup table
			Set<Double> uniqueDynamicModMassesForTheSearch = new HashSet<>();

			//  Accumulate Unique PSM Level Open Mod Masses Rounded to insert into a lookup table
			Set<Integer> uniquePsmOpenModMassesRoundedForTheSearch = new HashSet<>();

			//  Accumulate Unique Reporter Ion Masses to insert into a lookup table
			Set<BigDecimal> uniqueReporterIonMassesForTheSearch = new HashSet<>();
			//  Accumulate Unique Isotope Label Ids to insert into a lookup table
			Set<Integer> uniqueIsotopeLabelIdsForTheSearch = new HashSet<>();

			ProcessSave_SingleReportedPeptide processSave_SingleReportedPeptide = ProcessSave_SingleReportedPeptide.getInstance();
			
			int psms_SearchImportInProgress_Counter = 0; // NOT a total counter. Is reset to zero.

			for ( Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object internalHolder_ReportedPeptide_Object : input_LimelightXMLFile_InternalHolder_Root_Object.get_InternalHolder_ReportedPeptide_Object_Unmodifiable() ) {

				ReportedPeptide reportedPeptide = internalHolder_ReportedPeptide_Object.getReportedPeptide();
				
				{
					if ( reportedPeptide.getPsms() != null ) {

						psms_SearchImportInProgress_Counter += reportedPeptide.getPsms().getPsm().size();

						if ( psms_SearchImportInProgress_Counter > 400 ) {
							//  at 400th PSM every 400 PSM, Updates 'heart beat'
							Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.getSingletonInstance().saveOrUpdate_ForSearchId(searchId);
							
							psms_SearchImportInProgress_Counter = 0;  //  reset
						}
					}
				}

				ProcessSave_SingleReportedPeptide_Results processSave_SingleReportedPeptide_Results = 
						processSave_SingleReportedPeptide.processSingleReportedPeptide(
								internalHolder_ReportedPeptide_Object, 
								searchId, 
								skip_SubGroup_Processing,
								searchSubGroupDTOMap_Key_searchSubGroupLabel,
								searchProgramEntryMap, 
								filterableReportedPeptideAnnotationTypesOnId,
								uniqueDynamicModMassesForTheSearch,
								uniqueIsotopeLabelIdsForTheSearch
								);

				ReportedPeptideDTO savedReportedPeptideDTO = processSave_SingleReportedPeptide_Results.getReportedPeptideDTO();
				SearchReportedPeptideDTO savedSearchReportedPeptideDTO = processSave_SingleReportedPeptide_Results.getSearchReportedPeptideDTO();
				Map<Integer,Set<String>> proteinResidueLetters_AllProteins_Map_Key_PeptidePosition = internalHolder_ReportedPeptide_Object.getProteinResidueLetters_AllProteins_Map_Key_PeptidePosition();

				if ( savedSearchReportedPeptideDTO.isAnyPsmHasDynamicModifications() ) {
					anyReportedPeptideHasAnyPsmsHasDynamicModifications = true;
				}

				if ( savedSearchReportedPeptideDTO.isAnyPsmHasReporterIons() ) {
					anyReportedPeptideHasAnyPsmsHasReporterIons = true;
				}

				Set<BigDecimal> uniqueReporterIonMassesForTheReportedPeptide = new HashSet<>();

				PsmStatisticsAndBestValues psmStatisticsAndBestValues =
						ProcessPSMsForReportedPeptide.getInstance()
						.savePSMs(
								internalHolder_ReportedPeptide_Object, 
								searchId, 
								savedReportedPeptideDTO, 
								skip_SubGroup_Processing,
								searchSubGroupDTOMap_Key_searchSubGroupLabel,
								searchProgramEntryMap,
								filterablePsmAnnotationTypesOnId,
								searchScanFileEntry_AllEntries,
								uniqueReporterIonMassesForTheReportedPeptide
								);


				{  // Save to DB
					//  Copy to List and Sort so insert smallest to largest.  Not required but creates consistency
					List<BigDecimal> uniqueReporterIonMassesForTheReportedPeptideList = new ArrayList<>( uniqueReporterIonMassesForTheReportedPeptide );
					Collections.sort( uniqueReporterIonMassesForTheReportedPeptideList );
					int reportedPeptideId = savedReportedPeptideDTO.getId();

					DB_Insert_Search_ReportedPeptide_ReporterIonMass_BatchInserter_DAO db_Insert_Search_ReportedPeptide_ReporterIonMass_BatchInserter_DAO = DB_Insert_Search_ReportedPeptide_ReporterIonMass_BatchInserter_DAO.getSingletonInstance();

					for ( BigDecimal reporterIonMass : uniqueReporterIonMassesForTheReportedPeptideList ) {

						Search_ReportedPeptide_ReporterIon_Mass_Lookup_DTO dto = new Search_ReportedPeptide_ReporterIon_Mass_Lookup_DTO();
						dto.setSearchId( searchId );
						dto.setReportedPeptideId( reportedPeptideId );
						dto.setReporterIonMass( reporterIonMass );
						db_Insert_Search_ReportedPeptide_ReporterIonMass_BatchInserter_DAO.insert_Batching_Object( dto );

						uniqueReporterIonMassesForTheSearch.add( reporterIonMass );
					}
				}

				if ( psmStatisticsAndBestValues.getPsmOpenModification_UniqueMassesRounded() != null ){

					int reportedPeptideId = savedReportedPeptideDTO.getId();

					for ( Integer mass : psmStatisticsAndBestValues.getPsmOpenModification_UniqueMassesRounded() ) {
						SrchRepPept_PsmOpenModRounded_Lookup_DTO dto = new SrchRepPept_PsmOpenModRounded_Lookup_DTO();
						dto.setSearchId( searchId );
						dto.setReportedPeptideId( reportedPeptideId );
						dto.setMass( mass );
						DB_Insert_SrchRepPept_PsmOpenModRounded_Lookup_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object( dto );
					}

					uniquePsmOpenModMassesRoundedForTheSearch.addAll( psmStatisticsAndBestValues.getPsmOpenModification_UniqueMassesRounded() );
				}
				if ( psmStatisticsAndBestValues.getPsmOpenModification_UniquePositions() != null ){

					List<PsmOpenModification_UniquePosition_InReportedPeptide_Entry> psmOpenModification_UniquePositions_List = new ArrayList<>( psmStatisticsAndBestValues.getPsmOpenModification_UniquePositions() );
					Collections.sort( psmOpenModification_UniquePositions_List );
					int reportedPeptideId = savedReportedPeptideDTO.getId();

					DB_Insert_Search_ReportedPeptide_OpenMod_PsmUniquePositions_BatchInserter_DAO db_Insert_Search_ReportedPeptide_OpenMod_PsmUniquePositions_BatchInserter_DAO = DB_Insert_Search_ReportedPeptide_OpenMod_PsmUniquePositions_BatchInserter_DAO.getSingletonInstance();

					for ( PsmOpenModification_UniquePosition_InReportedPeptide_Entry entry : psmOpenModification_UniquePositions_List ) {

						int peptideIndex = entry.getPosition() - 1;  // zero based
						String peptideResidueLetter = reportedPeptide.getSequence().substring( peptideIndex, peptideIndex + 1 );

						Search_ReportedPeptide_OpenMod_PsmUniquePositions_DTO dto = new Search_ReportedPeptide_OpenMod_PsmUniquePositions_DTO();
						dto.setSearchId( searchId );
						dto.setReportedPeptideId( reportedPeptideId );
						dto.setPositionUnique( entry.getPosition() );
						dto.setIs_N_Terminal( entry.isIs_N_Terminal() );
						dto.setIs_C_Terminal( entry.isIs_C_Terminal() );
						dto.setPeptideResidueLetter( peptideResidueLetter );

						//							Map<Integer,Set<String>> proteinResidueLetters_AllProteins_Map_Key_PeptidePosition
						Set<String> proteinResidueLetters_AllProteins = proteinResidueLetters_AllProteins_Map_Key_PeptidePosition.get( entry.getPosition() );
						if ( proteinResidueLetters_AllProteins == null ) {
							String msg = "proteinResidueLetters_AllProteins_Map_Key_PeptidePosition.get( position ) returned null processing PsmOpenModification_UniquePosition_InReportedPeptide_Entry entry.  reported peptide: " + reportedPeptide.getReportedPeptideString();
							log.error(msg);
							throw new LimelightImporterDataException( msg );
						}
						if ( proteinResidueLetters_AllProteins.size() == 1 ) {
							String proteinResidueLetter_Only = proteinResidueLetters_AllProteins.iterator().next();
							dto.setProteinResidueLetterIfAllSame( proteinResidueLetter_Only );
						}

						db_Insert_Search_ReportedPeptide_OpenMod_PsmUniquePositions_BatchInserter_DAO.insert_Batching_Object( dto );
					}
				}

				//  Add to unique values per search
				uniqueReporterIonMassesForTheSearch.addAll( uniqueReporterIonMassesForTheReportedPeptide );
				
				LookupRecordsCreate_Main.getInstance()
				.reportedPeptide_Lookup_MainProcessing( 
						reportedPeptide, 
						searchId, 
						savedReportedPeptideDTO,
						savedSearchReportedPeptideDTO,
						processSave_SingleReportedPeptide_Results.getSearchReportedPeptideFilterableAnnotationDTOList(),
						psmStatisticsAndBestValues, 
						filterableReportedPeptideAnnotationTypesOnId,
						internalHolder_ReportedPeptide_Object.getProteinVersionIdsForReportedPeptide().size(),
						searchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records );

				
			} //  END: for ( Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object internalHolder_ReportedPeptide_Object : input_LimelightXMLFile_InternalHolder_Root_Object.get_InternalHolder_ReportedPeptide_Object_Unmodifiable() ) {

			/////////////
			
			//   Call these when done processing ALL Reported Peptides to insert Last Batch

			//  Insert Last Batch by calling:

			DB_Insert_Psm_AndChildren_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();

			DB_Insert_SearchReportedPeptideDescriptiveAnnotation_AndChildren_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();

			DB_Insert_Search_ReportedPeptide_SubGroup__Lookup__BatchInserter__DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
			
			DB_Insert_SearchReportedPeptideFilterableAnnotation_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
			
			DB_Insert_SearchReportedPeptideProteinVersion_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
			
			DB_Insert_SrchRepPept_PsmOpenModRounded_Lookup_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
			
			DB_Insert_SearchRepPeptSubGroup__BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
			
			DB_Insert_SrchRepPept_IsotopeLabel_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
			
			DB_Insert_Search_ReportedPeptide_OpenMod_PsmUniquePositions_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
			
			DB_Insert_Search_ReportedPeptide_ReporterIonMass_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
			
			
			////////////////////
			
			//  Commit to get timing, along with other reasons
			ImportRunImporterDBConnectionFactory.getMainSingletonInstance().commitInsertControlCommitConnection();

			{
				long endTimeNanoSeconds = System.nanoTime();
				long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
				long totalElapsedTime_saveToDatabase_InMilliSeconds = ( elapsedTimeNanoSeconds / 1000000 );

				Importer_Stats_GeneralData_DTO importer_Stats_GeneralData_DTO = new Importer_Stats_GeneralData_DTO();
				importer_Stats_GeneralData_DTO.setSearchId(searchId);
				importer_Stats_GeneralData_DTO.setLabel(Importer_Stats_GeneralData_Table__Label_Values_Enum.PROCESS_REPORTEDPEPTIDESANDPSMS_MINUS_PSM_FILTERABLE__SEARCH_REPORTEDPEPTIDE_LOOKUP_INSERTS);
				importer_Stats_GeneralData_DTO.setTotal_elapsedTime_Milliseconds(totalElapsedTime_saveToDatabase_InMilliSeconds);
				
				Importer_Stats_GeneralData_DAO.getInstance().save(importer_Stats_GeneralData_DTO);
			}
			

			//  !!!  IMPORTANT to make these calls to 'insert_All_Records_Into_Database' !!!

			// Insert all psm_FilterableAnnotation_Records.  Insert Held until this method call so they are all inserted together

			searchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records.insert_All_Records_Into_Database(search);


			//  
			// ImportRunImporterDBConnectionFactory.getInstance().commitInsertControlCommitConnection();

			//  Insert of Reported Peptides Complete


			// Save unique values at search level across all reported peptides

			insertUniqueDynamicModMassesForTheSearch( uniqueDynamicModMassesForTheSearch, searchId );
			insert_uniquePsmOpenModMassesRoundedForTheSearch( uniquePsmOpenModMassesRoundedForTheSearch, searchId );
			insertUniqueReporterIonMassesForTheSearch( uniqueReporterIonMassesForTheSearch, searchId );
			insertIsotopeLabelIdsForTheSearch( uniqueIsotopeLabelIdsForTheSearch, searchId );

		} //  END:  if ( input_LimelightXMLFile_InternalHolder_Root_Object.is_Any_InternalHolder_ReportedPeptide_Objects() ) {
		
		if ( anyReportedPeptideHasAnyPsmsHasDynamicModifications ) {
			
			// Update search_tbl to set flag
			
			//  First commit any in progress bulk inserts 
			ImportRunImporterDBConnectionFactory.getMainSingletonInstance().commitInsertControlCommitConnection();
			
			SearchDAO.getInstance().updateAnyPsmHasDynamicModifications( searchId, true /* anyPsmHasDynamicModifications */ );
		}
		
		if ( anyReportedPeptideHasAnyPsmsHasReporterIons ) {
			
			// Update search_tbl to set flag
			
			//  First commit any in progress bulk inserts 
			ImportRunImporterDBConnectionFactory.getMainSingletonInstance().commitInsertControlCommitConnection();
			
			SearchDAO.getInstance().updateAnyPsmHasReporterIons( searchId, true /* anyPsmHasReporterIons */ );
		}
		
		//  Comment out since time does NOT include calls to 'commit' which is where the actual writing to DB occurs
//		DB_Insert_PsmDAO.logTotalElapsedTimeAndCallCounts();
		
		

		{
			long endTimeNanoSeconds = System.nanoTime();
			long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
			long totalElapsedTime_saveToDatabase_InMilliSeconds = ( elapsedTimeNanoSeconds / 1000000 );

			Importer_Stats_GeneralData_DTO importer_Stats_GeneralData_DTO = new Importer_Stats_GeneralData_DTO();
			importer_Stats_GeneralData_DTO.setSearchId(searchId);
			importer_Stats_GeneralData_DTO.setLabel(Importer_Stats_GeneralData_Table__Label_Values_Enum.PROCESS_REPORTEDPEPTIDESANDPSMS_INSERTS__CLASS_PROCESSREPORTEDPEPTIDESANDPSMS_PUBLIC_FUNCTION);
			importer_Stats_GeneralData_DTO.setTotal_elapsedTime_Milliseconds(totalElapsedTime_saveToDatabase_InMilliSeconds);
			
			Importer_Stats_GeneralData_DAO.getInstance().save(importer_Stats_GeneralData_DTO);
		}
		
	}

	/**
	 * @param uniqueDynamicModMassesForTheSearch
	 * @throws Exception
	 */
	private void insertUniqueDynamicModMassesForTheSearch( 
			Set<Double> uniqueDynamicModMassesForTheSearch, int searchId ) throws Exception {
		for ( Double dynamicModMass : uniqueDynamicModMassesForTheSearch ) {
			
			DB_Insert_SearchDynamicModMassDAO.getInstance().saveSearchDynamicModMass( searchId, dynamicModMass );
		}	
	}

	/**
	 * @param uniquePsmOpenModMassesRoundedForTheSearch
	 * @throws Exception
	 */
	private void insert_uniquePsmOpenModMassesRoundedForTheSearch( 
			Set<Integer> uniquePsmOpenModMassesRoundedForTheSearch, int searchId ) throws Exception {
		for ( Integer openModMass : uniquePsmOpenModMassesRoundedForTheSearch ) {
			
			DB_Insert_SearchOpenModMass_ReportedPeptideUniqueValues_DAO.getInstance().saveSearchOpenModMass(searchId, openModMass);
		}	
	}
	
	/**
	 * @param uniqueReporterIonMassesForTheSearch
	 * @throws Exception
	 */
	private void insertUniqueReporterIonMassesForTheSearch( 
			Set<BigDecimal> uniqueReporterIonMassesForTheSearch, int searchId ) throws Exception {
		for ( BigDecimal reporterIonMass : uniqueReporterIonMassesForTheSearch ) {
			
			DB_Insert_Search_ReporterIonMassDAO.getInstance().saveSearch_ReporterIonMass( searchId, reporterIonMass );
		}	
	}

	/**
	 * @param uniqueIsotopeLabelIdsForTheSearch
	 * @throws Exception
	 */
	private void insertIsotopeLabelIdsForTheSearch( 
			Set<Integer> uniqueIsotopeLabelIdsForTheSearch, int searchId ) throws Exception {
		for ( Integer isotopeLabelId : uniqueIsotopeLabelIdsForTheSearch ) {
			
			DB_Insert_SearchIsotopeLabelDAO.getInstance().saveSearchIsotopeLabelId( searchId, isotopeLabelId );
		}	
	}
	
	
}
