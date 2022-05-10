package org.yeastrc.limelight.limelight_importer.batch_insert_db_records;

import java.util.ArrayList;
import java.util.List;

import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmFilterableAnnotationDAO;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;

/**
 * Collect PsmFilterableAnnotationDTO objects for ALL PSMs and then insert them as a continuous group of inserts with multiple records per insert
 *
 */
public class Psm_FilterableAnnotation_Records_BatchInsert_DB_Records {

	private static Psm_FilterableAnnotation_Records_BatchInsert_DB_Records singletonInstance = new Psm_FilterableAnnotation_Records_BatchInsert_DB_Records();

	private Psm_FilterableAnnotation_Records_BatchInsert_DB_Records() { }
	public static Psm_FilterableAnnotation_Records_BatchInsert_DB_Records getSingletonInstance() { return singletonInstance; }
	
	private List<PsmFilterableAnnotationDTO> psmFilterableAnnotationDTO_List__AllPsms;
	

	/**
	 * @param limelightInput
	 * @throws Exception 
	 */
	public void initialize(LimelightInput limelightInput) throws Exception {
		
		//  Compute total PSM Filterable Annotation count and create Array to hold them all
		
		int psmFilterableAnnotationCount_ForSearch = 0;
		
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		
		if ( reportedPeptides != null ) {
			
			List<ReportedPeptide> reportedPeptideList =	reportedPeptides.getReportedPeptide();
			
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {

				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					
					if ( reportedPeptide.getPsms() != null ) {

						for ( Psm psm : reportedPeptide.getPsms().getPsm() ) {
						
							if ( psm.getFilterablePsmAnnotations() != null ) {

								psmFilterableAnnotationCount_ForSearch += psm.getFilterablePsmAnnotations().getFilterablePsmAnnotation().size();
							}
						}
					}
				}
			}
		}
		
		psmFilterableAnnotationDTO_List__AllPsms = new ArrayList<>(psmFilterableAnnotationCount_ForSearch);
	}
	
	/**
	 * @param psmFilterableAnnotationDTO
	 */
	public void add_PsmFilterableAnnotationDTO( PsmFilterableAnnotationDTO psmFilterableAnnotationDTO ) {
		
		psmFilterableAnnotationDTO_List__AllPsms.add(psmFilterableAnnotationDTO);
	}
	
	/**
	 * @throws Exception 
	 * 
	 */
	public void insert_All_Records_Into_Database(SearchDTO_Importer search) throws Exception {

		ImportRunImporterDBConnectionFactory.getInstance().commitInsertControlCommitConnection();
		
		//  insert INSERT_BLOCK_SIZE number of records with single 'insert' SQL statement
		
		final int INSERT_BLOCK_SIZE = 250;
		
		List<PsmFilterableAnnotationDTO> psmFilterableAnnotationDTO_List__InsertBlock = new ArrayList<>( INSERT_BLOCK_SIZE + 5 );
		

		int searchImportInProgress_Counter = 0; // NOT a total counter. Is reset to zero.

		
		for ( PsmFilterableAnnotationDTO psmFilterableAnnotationDTO: this.psmFilterableAnnotationDTO_List__AllPsms ) {
			
			psmFilterableAnnotationDTO_List__InsertBlock.add(psmFilterableAnnotationDTO);
			
			if ( psmFilterableAnnotationDTO_List__InsertBlock.size() == INSERT_BLOCK_SIZE ) {

				//  Have a block to insert so insert and then clear psmFilterableAnnotationDTO_List__InsertBlock
				
				DB_Insert_PsmFilterableAnnotationDAO.getInstance().saveToDatabase_AUTOCOMMIT_AfterInsert__NotUse_InsertControlCommitConnection( psmFilterableAnnotationDTO_List__InsertBlock );
				
				psmFilterableAnnotationDTO_List__InsertBlock.clear();  // Remove entries from InsertBlock list to prepare for next block
				
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
		
		if ( psmFilterableAnnotationDTO_List__InsertBlock.size() > 0 ) {
			
			// Insert final block

			DB_Insert_PsmFilterableAnnotationDAO.getInstance().saveToDatabase_AUTOCOMMIT_AfterInsert__NotUse_InsertControlCommitConnection( psmFilterableAnnotationDTO_List__InsertBlock );
		}
		
		DB_Insert_PsmFilterableAnnotationDAO.logTotalElapsedTimeAndCallCounts_SaveToImporterStatsTable(search);
	}
 }
