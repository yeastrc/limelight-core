package org.yeastrc.limelight.limelight_importer.batch_insert_db_records;

import java.util.ArrayList;
import java.util.List;

import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Search_ReportedPeptide__Lookup__DAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO.DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer.process_input.CreateSearchReportedPeptideLevelLookupRecords.SearchReportedPeptideLevelLookupRecords_Create_Result;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.Search_ReportedPeptide_BestPsmValue_Lookup__DTO;
import org.yeastrc.limelight.limelight_shared.dto.Search_ReportedPeptide__Lookup__DTO;

/**
 * Collect SearchReportedPeptideLevelLookupRecords_Create_Result objects for ALL Reported Peptides and then insert them as a continuous group of inserts with multiple records per insert
 *
 */
public class SearchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records {

	private static SearchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records singletonInstance = new SearchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records();

	//  insert INSERT_BLOCK_SIZE number of records with single 'insert' SQL statement
	
	private final static int INSERT_BLOCK_SIZE = 2000;
	
	
	private SearchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records() { }
	public static SearchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records getSingletonInstance() { return singletonInstance; }
	
	private List<SearchReportedPeptideLevelLookupRecords_Create_Result> searchReportedPeptideLevelLookupRecords_Create_Result__All_ReportedPeptides;
	

	/**
	 * @param limelightInput
	 * @throws Exception 
	 */
	public void initialize(LimelightInput limelightInput) throws Exception {
		
		//  Compute total PSM Filterable Annotation count and create Array to hold them all
		
		int reportedPeptideList_Size = 0;
		
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		
		if ( reportedPeptides != null ) {
			
			List<ReportedPeptide> reportedPeptideList =	reportedPeptides.getReportedPeptide();
			
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {

				reportedPeptideList_Size = reportedPeptideList.size();
			}
		}
		
		searchReportedPeptideLevelLookupRecords_Create_Result__All_ReportedPeptides = new ArrayList<>(reportedPeptideList_Size);
	}
	
	/**
	 * @param searchReportedPeptideLevelLookupRecords_Create_Result
	 */
	public void add_SearchReportedPeptideLevelLookupRecords_Create_Result( SearchReportedPeptideLevelLookupRecords_Create_Result searchReportedPeptideLevelLookupRecords_Create_Result ) {
		
		searchReportedPeptideLevelLookupRecords_Create_Result__All_ReportedPeptides.add(searchReportedPeptideLevelLookupRecords_Create_Result);
	}
	
	/**
	 * @throws Exception 
	 * 
	 */
	public void insert_All_Records_Into_Database(SearchDTO_Importer search) throws Exception {

		ImportRunImporterDBConnectionFactory.getMainSingletonInstance().commitInsertControlCommitConnection();
		
		insert_All_Search_ReportedPeptide__Lookup__DTO(search);
		
		
		insert_All_Search_ReportedPeptide_BestPsmValue_Lookup__DTO(search);
		
	}
	
	/**
	 * @param search
	 * @throws Exception 
	 */
	private void insert_All_Search_ReportedPeptide__Lookup__DTO(SearchDTO_Importer search) throws Exception {
		
		List<Search_ReportedPeptide__Lookup__DTO> search_ReportedPeptide__Lookup__DTO_List__InsertBlock = new ArrayList<>( INSERT_BLOCK_SIZE + 5 );
		

		int searchImportInProgress_Counter = 0; // NOT a total counter. Is reset to zero.

		
		for ( SearchReportedPeptideLevelLookupRecords_Create_Result searchReportedPeptideLevelLookupRecords_Create_Result: this.searchReportedPeptideLevelLookupRecords_Create_Result__All_ReportedPeptides ) {
			
			search_ReportedPeptide__Lookup__DTO_List__InsertBlock.add(searchReportedPeptideLevelLookupRecords_Create_Result.getSearch_ReportedPeptide__Lookup__DTO());
			
			if ( search_ReportedPeptide__Lookup__DTO_List__InsertBlock.size() == INSERT_BLOCK_SIZE ) {

				//  Have a block to insert so insert and then clear searchReportedPeptideLevelLookupRecords_Create_Result_List__InsertBlock

				DB_Insert_Search_ReportedPeptide__Lookup__DAO.getInstance()
				.saveToDatabase_AUTOCOMMIT_AfterInsert__NotUse_InsertControlCommitConnection( search_ReportedPeptide__Lookup__DTO_List__InsertBlock );
				
				search_ReportedPeptide__Lookup__DTO_List__InsertBlock.clear();  // Remove entries from InsertBlock list to prepare for next block
				
				//  Importer Alive tracking

				{
					searchImportInProgress_Counter++;
					if ( searchImportInProgress_Counter > 10 ) {
						//  at 10th save, Updates 'heart beat'
						Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.getSingletonInstance().saveOrUpdate_ForSearchId(search.getId());
					
						searchImportInProgress_Counter = 0;  	//  reset
					}
				}
				
			}
		}
		
		if ( search_ReportedPeptide__Lookup__DTO_List__InsertBlock.size() > 0 ) {
			
			// Insert final block

			DB_Insert_Search_ReportedPeptide__Lookup__DAO.getInstance()
			.saveToDatabase_AUTOCOMMIT_AfterInsert__NotUse_InsertControlCommitConnection( search_ReportedPeptide__Lookup__DTO_List__InsertBlock );
		}
		
		DB_Insert_Search_ReportedPeptide__Lookup__DAO.logTotalElapsedTimeAndCallCounts_SaveToImporterStatsTable(search);
	}


	/**
	 * @param search
	 * @throws Exception 
	 */
	private void insert_All_Search_ReportedPeptide_BestPsmValue_Lookup__DTO(SearchDTO_Importer search) throws Exception {
		
//		Need to Insert for Target, Independent Decoy, and Decoy

		
		insert_All_Search_ReportedPeptide_BestPsmValue_Lookup__DTO__TARGET(search);
		
		insert_All_Search_ReportedPeptide_BestPsmValue_Lookup__DTO__TARGET_INDEPENDENT_DECOY(search);
		
		insert_All_Search_ReportedPeptide_BestPsmValue_Lookup__DTO__TARGET_INDEPENDENT_DECOY_DECOY(search);

		
		DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO.logTotalElapsedTimeAndCallCounts_SaveToImporterStatsTable(search);
	}

	/**
	 * @param search
	 * @throws Exception 
	 */
	private void insert_All_Search_ReportedPeptide_BestPsmValue_Lookup__DTO__TARGET(SearchDTO_Importer search) throws Exception {
		
//		Need to Insert for Target, Independent Decoy, and Decoy

		DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO dao = DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO.getInstance();
		

		List<Search_ReportedPeptide_BestPsmValue_Lookup__DTO> search_ReportedPeptide_BestPsmValue_Lookup__DTO_List = new ArrayList<>( INSERT_BLOCK_SIZE + 5 );

		int searchImportInProgress_Counter = 0; // NOT a total counter. Is reset to zero.

		for ( SearchReportedPeptideLevelLookupRecords_Create_Result searchReportedPeptideLevelLookupRecords_Create_Result: this.searchReportedPeptideLevelLookupRecords_Create_Result__All_ReportedPeptides ) {

			//  Importer Alive tracking

			{
				searchImportInProgress_Counter++;
				if ( searchImportInProgress_Counter > 1000 ) {
					//  at 10th save, Updates 'heart beat'
					Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.getSingletonInstance().saveOrUpdate_ForSearchId(search.getId());
				
					searchImportInProgress_Counter = 0;  	//  reset
				}
			}
	
			if ( searchReportedPeptideLevelLookupRecords_Create_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets() != null 
					&& ( ! searchReportedPeptideLevelLookupRecords_Create_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets().isEmpty() ) ) {
				
				for ( Search_ReportedPeptide_BestPsmValue_Lookup__DTO search_ReportedPeptide_BestPsmValue_Lookup__DTO : searchReportedPeptideLevelLookupRecords_Create_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets() ) {
					
					insert_All_Search_ReportedPeptide_BestPsmValue_Lookup__DTO__Target_Ind_Decoy_OR_Decoy(
							search_ReportedPeptide_BestPsmValue_Lookup__DTO, 
							DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType.TARGET,
							search_ReportedPeptide_BestPsmValue_Lookup__DTO_List,
							dao );
				}
			}
		}

		if ( search_ReportedPeptide_BestPsmValue_Lookup__DTO_List.size() > 0 ) {
			
			// Insert final block  

			dao.saveToDatabase_AUTOCOMMIT_AfterInsert__NotUse_InsertControlCommitConnection( 
					search_ReportedPeptide_BestPsmValue_Lookup__DTO_List,
					DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType.TARGET );
		}
	}

	/**
	 * @param search
	 * @throws Exception 
	 */
	private void insert_All_Search_ReportedPeptide_BestPsmValue_Lookup__DTO__TARGET_INDEPENDENT_DECOY(SearchDTO_Importer search) throws Exception {
		
//		Need to Insert for Target, Independent Decoy, and Decoy

		DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO dao = DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO.getInstance();
		
		List<Search_ReportedPeptide_BestPsmValue_Lookup__DTO> search_ReportedPeptide_BestPsmValue_Lookup__DTO_List = new ArrayList<>( INSERT_BLOCK_SIZE + 5 );

		int searchImportInProgress_Counter = 0; // NOT a total counter. Is reset to zero.

		for ( SearchReportedPeptideLevelLookupRecords_Create_Result searchReportedPeptideLevelLookupRecords_Create_Result: this.searchReportedPeptideLevelLookupRecords_Create_Result__All_ReportedPeptides ) {

			//  Importer Alive tracking

			{
				searchImportInProgress_Counter++;
				if ( searchImportInProgress_Counter > 1000 ) {
					//  at 10th save, Updates 'heart beat'
					Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.getSingletonInstance().saveOrUpdate_ForSearchId(search.getId());
				
					searchImportInProgress_Counter = 0;  	//  reset
				}
			}
	
			if ( searchReportedPeptideLevelLookupRecords_Create_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys() != null 
					&& ( ! searchReportedPeptideLevelLookupRecords_Create_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys().isEmpty() ) ) {
				
				for ( Search_ReportedPeptide_BestPsmValue_Lookup__DTO search_ReportedPeptide_BestPsmValue_Lookup__DTO : searchReportedPeptideLevelLookupRecords_Create_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys() ) {

					insert_All_Search_ReportedPeptide_BestPsmValue_Lookup__DTO__Target_Ind_Decoy_OR_Decoy(
							search_ReportedPeptide_BestPsmValue_Lookup__DTO, 
							DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType.TARGET_INDEPENDENT_DECOY,
							search_ReportedPeptide_BestPsmValue_Lookup__DTO_List,
							dao );
				}
			}
		}

		if ( search_ReportedPeptide_BestPsmValue_Lookup__DTO_List.size() > 0 ) {
			 
			// Insert final block  

			dao.saveToDatabase_AUTOCOMMIT_AfterInsert__NotUse_InsertControlCommitConnection( 
					search_ReportedPeptide_BestPsmValue_Lookup__DTO_List,
					DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType.TARGET_INDEPENDENT_DECOY );
		}
	}
	

	/**
	 * @param search
	 * @throws Exception 
	 */
	private void insert_All_Search_ReportedPeptide_BestPsmValue_Lookup__DTO__TARGET_INDEPENDENT_DECOY_DECOY(SearchDTO_Importer search) throws Exception {
		
//		Need to Insert for Target, Independent Decoy, and Decoy

		DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO dao = DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO.getInstance();
		

		List<Search_ReportedPeptide_BestPsmValue_Lookup__DTO> search_ReportedPeptide_BestPsmValue_Lookup__DTO_List = new ArrayList<>( INSERT_BLOCK_SIZE + 5 );

		int searchImportInProgress_Counter = 0; // NOT a total counter. Is reset to zero.

		for ( SearchReportedPeptideLevelLookupRecords_Create_Result searchReportedPeptideLevelLookupRecords_Create_Result: this.searchReportedPeptideLevelLookupRecords_Create_Result__All_ReportedPeptides ) {

			//  Importer Alive tracking

			{
				searchImportInProgress_Counter++;
				if ( searchImportInProgress_Counter > 100000 ) {
					//  at 10th save, Updates 'heart beat'
					Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.getSingletonInstance().saveOrUpdate_ForSearchId(search.getId());
				
					searchImportInProgress_Counter = 0;  	//  reset
				}
			}
		
			if ( searchReportedPeptideLevelLookupRecords_Create_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys_Decoys() != null 
					&& ( ! searchReportedPeptideLevelLookupRecords_Create_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys_Decoys().isEmpty() ) ) {
				
				for ( Search_ReportedPeptide_BestPsmValue_Lookup__DTO search_ReportedPeptide_BestPsmValue_Lookup__DTO : searchReportedPeptideLevelLookupRecords_Create_Result.getSearch_ReportedPeptide_BestPsmValue_Lookup__DTO_List_PSM_Targets_IndependentDecoys_Decoys() ) {

					insert_All_Search_ReportedPeptide_BestPsmValue_Lookup__DTO__Target_Ind_Decoy_OR_Decoy(
							search_ReportedPeptide_BestPsmValue_Lookup__DTO, 
							DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType.TARGET_INDEPENDENT_DECOY_DECOY,
							search_ReportedPeptide_BestPsmValue_Lookup__DTO_List,
							dao );
				}
			}
		}
		
		if ( search_ReportedPeptide_BestPsmValue_Lookup__DTO_List.size() > 0 ) {
			
			// Insert final block  

			dao.saveToDatabase_AUTOCOMMIT_AfterInsert__NotUse_InsertControlCommitConnection( 
					search_ReportedPeptide_BestPsmValue_Lookup__DTO_List,
					DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType.TARGET_INDEPENDENT_DECOY_DECOY );
		}
	}
	
	////
	
	/**
	 * @param item
	 * @param tableType
	 * @param accum_For_TableType__Search_ReportedPeptide_BestPsmValue_Lookup__DTO_List
	 * @throws Exception 
	 */
	private void insert_All_Search_ReportedPeptide_BestPsmValue_Lookup__DTO__Target_Ind_Decoy_OR_Decoy(
			
			Search_ReportedPeptide_BestPsmValue_Lookup__DTO search_ReportedPeptide_BestPsmValue_Lookup__DTO,
			DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO__TableType tableType,
			
			List<Search_ReportedPeptide_BestPsmValue_Lookup__DTO> accum_For_TableType__Search_ReportedPeptide_BestPsmValue_Lookup__DTO_List,
			DB_Insert_Search_ReportedPeptide_BestPsmValue_Generic_Lookup__DAO dao
			) throws Exception {
		
		accum_For_TableType__Search_ReportedPeptide_BestPsmValue_Lookup__DTO_List.add( search_ReportedPeptide_BestPsmValue_Lookup__DTO );
			
		if ( accum_For_TableType__Search_ReportedPeptide_BestPsmValue_Lookup__DTO_List.size() >= INSERT_BLOCK_SIZE ) {

			//  Have a block to insert so insert and then clear searchReportedPeptideLevelLookupRecords_Create_Result_List__InsertBlock

			dao.saveToDatabase_AUTOCOMMIT_AfterInsert__NotUse_InsertControlCommitConnection( accum_For_TableType__Search_ReportedPeptide_BestPsmValue_Lookup__DTO_List, tableType );

			accum_For_TableType__Search_ReportedPeptide_BestPsmValue_Lookup__DTO_List.clear();  // Remove entries from InsertBlock list to prepare for next block
		}
	}
 }
