package org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.main;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.db_populate_new_fields__common_code.constants_and_enums.Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.db_populate_new_fields__common_code.database_version_info_retrieval_compare.Limelight_DatabasePopulateNewFields__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode;
import org.yeastrc.limelight.db_populate_new_fields__common_code.database_version_info_retrieval_compare.Limelight_DatabasePopulateNewFields__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.LimelightDatabaseSchemaVersion_Comparison_Result;
import org.yeastrc.limelight.db_populate_new_fields__common_code.exceptions.Limelight_DatabasePopulateNewFields__DatabaseContents_Unexpected_Exception;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.dao.Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.dao.Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO.Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO_UpdateEntry;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.searchers.Limelight_DatabasePopulateNewFields__ProteinCoverage_ProteinSequenceVersionIds_For_SearchId_Searcher;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.searchers.Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.searchers.Limelight_DatabasePopulateNewFields__ProteinSequence_For_ProteinSequenceVersionId_Searcher;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__Constants;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm__Largest_SearchId_LessThanPassedInSearchId__SharedCode__Searcher;
import org.yeastrc.limelight.limelight_shared.protein_coverage_common.Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util;
import org.yeastrc.limelight.limelight_shared.protein_coverage_common.Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util.Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util__Result;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.searchers.Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher.Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher_Result_Item;

/**
 * 
 *
 */
public class Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_MAIN {
	
	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_MAIN.class);
	
	/**
	 * private constructor
	 */
	private Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_MAIN() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_MAIN _instance = new Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_MAIN();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_MAIN getSingletonInstance() {
		return _instance; 
	}

	/**
	 * @throws Exception 
	 * 
	 */
	public void limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_MAIN(
			Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom
			) throws Exception {
		

		log.warn( "INFO:: STARTING: Database Populate New Fields for table 'protein_coverage_tbl'.  When completed it will wait before it runs again" );

		//  First Get or Save and Get the Root record for this label_ShortKey
		
		final String label_ShortKey = Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__Constants.LABEL_SHORT_KEY_VALUE___PROTEIN_COV_POP_PRE_POST_RESIDUE;
		
		Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet =
				Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO.getInstance()
				.getItem_ForLabelShortKey( label_ShortKey );
		
		if ( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet == null ) {
			
			//  No record currently exists so insert record.  Insert will NOT return inserted id.
			{
				Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO__ToSave = new Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO();
				aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO__ToSave.setLabel_ShortKey(label_ShortKey);
				aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO__ToSave.setLabel( Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__Constants.LABEL_VALUE___PROTEIN_COV_POP_PRE_POST_RESIDUE );
				aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO__ToSave.setUpdatesComplete(false);
				
				Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO.getInstance()
				.save(aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO__ToSave);
			}
			
			//  Save not return id so get record again to get id

			aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet =
					Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO.getInstance()
					.getItem_ForLabelShortKey( label_ShortKey );
			
			if ( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet == null ) {
				String msg = "No Record from Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO.getInstance().getItem_ForLabelShortKey( label_ShortKey ) after do save to table.";
				log.error(msg);
				throw new Limelight_DatabasePopulateNewFields__DatabaseContents_Unexpected_Exception(msg);
			}
		}
		
		if ( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet.isUpdatesComplete() ) {
			
			//  Database Fully updated for this update so exit

			log.warn( "INFO:: EXIT:  Updates for this code was previously COMPLETE:: Database Populate New Fields for table 'protein_coverage_tbl'." );

			return;  // EARLY RETURN
		}
		
		Integer smallest_SearchId_ForRootId =
				Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO.getInstance()
				.get_SmallestSearchId_ForRootId( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet.getId() );

		Integer next_SearchId_ToProcess = null;
		
		if ( smallest_SearchId_ForRootId != null ) {
			//  Continue at next smaller search id
			
			next_SearchId_ToProcess =
					Aa_LimelightDb_UpdatesIn_RunImporterOrPgm__Largest_SearchId_LessThanPassedInSearchId__SharedCode__Searcher.getInstance()
					.getLargestSearchId_LessThanSearchIdPassedIn(smallest_SearchId_ForRootId);
		} else {

			next_SearchId_ToProcess =
					Aa_LimelightDb_UpdatesIn_RunImporterOrPgm__Largest_SearchId_LessThanPassedInSearchId__SharedCode__Searcher.getInstance()
					.getLargestSearchId();
		}

		while ( true ) {
			//  Loop to skip already processed Search Id
		
			if ( next_SearchId_ToProcess == null ) {
				// no next search id so exit loop
				break; //  EARLY BREAK LOOP
			}
			
			Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO entryForSearchId =
				Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO.getInstance()
				.getItem_ForRootIdSearchId( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet.getId(), next_SearchId_ToProcess.intValue() );
			
			if ( entryForSearchId == null ) {
				//  No record in 'Already Processed' for this Search Id in 'next_SearchId_ToProcess'
				
				//  Process this Search Id in 'next_SearchId_ToProcess' since NOT already processed
				break; //  EARLY BREAK LOOP
			}
			
			int next_Smaller_SearchId = next_SearchId_ToProcess.intValue() - 1; // Skip to next since already processed this search id

			//  Get next smaller next_SearchId_ToProcess
			next_SearchId_ToProcess =
					Aa_LimelightDb_UpdatesIn_RunImporterOrPgm__Largest_SearchId_LessThanPassedInSearchId__SharedCode__Searcher.getInstance()
					.getLargestSearchId_LessThanSearchIdPassedIn(next_Smaller_SearchId);
		}
		
		while ( next_SearchId_ToProcess != null ) {

			//  Check that DB Version Number matches code
			
			{
				LimelightDatabaseSchemaVersion_Comparison_Result current_SchemaVersion_Comparison_Result = 
						Limelight_DatabasePopulateNewFields__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getInstance()
						.getLimelightDatabase_CURRENT_SchemaVersion_Comparison_Result();
				
				if ( current_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME ) {
					
					if ( callFrom == Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum.LIMELIGHT__RUN_IMPORTER_PROGRAM ) {
						log.error("Current Database Schema Version Number in Database table does NOT match the Database Schema Version Number in the code so NOT performing Database Cleanup.  Will test again after standard wait time which is likely 24 hours.");
					} else {
						String msg = "Current Database Schema Version Number in Database table does NOT match the Database Schema Version Number in the code so NOT performing Database Cleanup.";
						log.error( msg );
					}
					
					return; // EARLY RETURN
				}

				LimelightDatabaseSchemaVersion_Comparison_Result updateInProgress_SchemaVersion_Comparison_Result = 
						Limelight_DatabasePopulateNewFields__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getInstance()
						.getLimelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result();

				if ( updateInProgress_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME ) {
					
					if ( callFrom == Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum.LIMELIGHT__RUN_IMPORTER_PROGRAM ) {
						log.error("Update In Progress Database Schema Version Number in Database table does NOT match the Database Schema Version Number in the code so NOT performing Database Cleanup.  Will test again after standard wait time which is likely 24 hours.");
					} else {
						String msg = "Update In Progress Database Schema Version Number in Database table does NOT match the Database Schema Version Number in the code so NOT performing Database Cleanup.";
						log.error( msg );
					}
					
					return; // EARLY RETURN
				}

			}
			
			// Process Search Id
			
			limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_SingleSearch( 
					next_SearchId_ToProcess, aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet, callFrom );

			//  Get Next Search Id
			
			while ( true ) { //  Loop to find next Search Id that is not already processed

				//  Get Next Search Id
				next_SearchId_ToProcess =
						Aa_LimelightDb_UpdatesIn_RunImporterOrPgm__Largest_SearchId_LessThanPassedInSearchId__SharedCode__Searcher.getInstance()
						.getLargestSearchId_LessThanSearchIdPassedIn(next_SearchId_ToProcess);
				
				if ( next_SearchId_ToProcess == null ) {
					// no next search id so exit loop
					break; //  EARLY BREAK LOOP
				}
				
				Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO entryForSearchId =
					Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO.getInstance()
					.getItem_ForRootIdSearchId( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet.getId(), next_SearchId_ToProcess.intValue() );
				
				if ( entryForSearchId == null ) {
					 // exit since NOT processed this search id
					break; //  EARLY BREAK LOOP
				}
				
				//  Got here so will get next smaller search id in next iteration of loop
			}
		}
		
		//  NO more searches to process or no searches in db.
		
		Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO.getInstance()
		.update_To_Set_UpdatesComplete( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet.getId() );
		

		log.warn( "INFO:: FINISHED: Database Populate New Fields for table 'protein_coverage_tbl'.  When completed it will wait before it runs again" );

	}
	
	/**
	 * @throws Exception 
	 * 
	 */
	private void limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_SingleSearch(
			int searchId,
			Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO,
			Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom
			) throws Exception {
		
		
		List<Integer> proteinSequenceVersionIdList =
				Limelight_DatabasePopulateNewFields__ProteinCoverage_ProteinSequenceVersionIds_For_SearchId_Searcher.getInstance()
				.getProteinSequenceVersionIds_For_SearchId(searchId);

		//  List to batch DB updates.  Set size to DEFAULT_BULK_UPDATE_SIZE
		List<Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO_UpdateEntry> updateEntryList = new ArrayList<>();
		
		for ( Integer proteinSequenceVersionId : proteinSequenceVersionIdList ) {
			
			String proteinSequence =
					Limelight_DatabasePopulateNewFields__ProteinSequence_For_ProteinSequenceVersionId_Searcher.getInstance()
					.getProteinSequence_For_ProteinSequenceVersionId(proteinSequenceVersionId);
			
			if ( proteinSequence == null ) {
				String msg = "Protein sequence NOT found for proteinSequenceVersionId: " + proteinSequenceVersionId + ", searchId: " + searchId;
				log.error( msg );
				throw new Limelight_DatabasePopulateNewFields__DatabaseContents_Unexpected_Exception(msg);
			}
			
			List<Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher_Result_Item> coverageTable_EntriesList = 
					Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher.getInstance()
					.getProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId(searchId, proteinSequenceVersionId);
			
			for ( Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher_Result_Item coverageTable_Entry : coverageTable_EntriesList ) {
				
				if ( coverageTable_Entry.getProtein_PreResidue() != null && coverageTable_Entry.getProtein_PostResidue() != null ) {
					//  Already computed so skip
					continue; // EARLY CONTINUE
				}

				Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util__Result result__Peptide_Pre_Post_Residues =
						Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util
						.compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util(
								proteinSequence, 
								coverageTable_Entry.getProteinStartPosition(), // peptideStartPosition_InProtein 
								coverageTable_Entry.getProteinEndPosition() // peptideEndPosition_InProtein
								);

				Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO_UpdateEntry updateEntry = new Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO_UpdateEntry();

				updateEntry.setId( coverageTable_Entry.getId() );
				
				updateEntry.setProtein_PreResidue( result__Peptide_Pre_Post_Residues.getProtein_PreResidue() );
				updateEntry.setProtein_PostResidue( result__Peptide_Pre_Post_Residues.getProtein_PostResidue() );
				updateEntry.setPeptideAtProteinStart_Flag( result__Peptide_Pre_Post_Residues.isPeptideAtProteinStart_Flag() );
				updateEntry.setPeptideAtProteinEnd_Flag( result__Peptide_Pre_Post_Residues.isPeptideAtProteinEnd_Flag() );
				
				updateEntryList.add(updateEntry);
				
				if ( updateEntryList.size() >= Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO.DEFAULT_BULK_UPDATE_SIZE ) {

					//  Update DB for batch
					Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO.getInstance()
					.update_Protein_PrePost_Residue_For_Id( updateEntryList );
					
					updateEntryList.clear(); // Reset for next batch
				}				
			}
			
		}

		if ( ! updateEntryList.isEmpty() ) {
			//  Update DB for last batch
			Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO.getInstance()
			.update_Protein_PrePost_Residue_For_Id( updateEntryList );
		}
		

		//  Mark Search Complete
		Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO completeForSearch_DTO = new Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO();
		completeForSearch_DTO.setRootTableId(aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO.getId());
		completeForSearch_DTO.setSearchId(searchId);

		Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO.getInstance().save( completeForSearch_DTO );
	}
}
