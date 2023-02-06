package org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.main;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.database_cleanup.remove__general_removal_dao.Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated;
import org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.dao.Limelight_DatabaseCleanup__SearchDAO;
import org.yeastrc.limelight.database_cleanup.shutdown_requested_detection.Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchRecordStatus;

/**
 * Delete a single record from 'search' table and it's children
 *
 */
public class Limelight_DatabaseCleanup__Delete_Single_Search_And_Children {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__Delete_Single_Search_And_Children.class);

    //  Batch size for deleting Other records
    private static final int OTHER_DELETE_BATCH_SIZE = 5000;  //  Number of records to delete at a time

	/**
	 * private constructor
	 */
	private Limelight_DatabaseCleanup__Delete_Single_Search_And_Children() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabaseCleanup__Delete_Single_Search_And_Children _instance = new Limelight_DatabaseCleanup__Delete_Single_Search_And_Children();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabaseCleanup__Delete_Single_Search_And_Children getInstance() {
		return _instance; 
	}
	
	/**
	 * @param searchId
	 * @throws Exception 
	 */
	public void delete_Single_Search( int searchId, Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom ) throws Exception {
		
		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}
			
		Limelight_DatabaseCleanup__SearchDAO.getInstance().updateStatus( searchId, SearchRecordStatus.DELETION_IN_PROGRESS );

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}
		
		//  Delete records from related tables for search id
		deleteRecordsFromSearchRelatedTables( searchId, callFrom );

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}
		
		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
			
			System.out.println();

			System.out.println( "START: " + new Date()  
					+ ": Deleting Top Level record from table 'search': search id: " + searchId );

			System.out.println();

		}
		
		long deleteTopLevel_SearchTbl_Record_TimeStart_Nano = System.nanoTime();
		
		//  Delete actual search record
		Limelight_DatabaseCleanup__SearchDAO.getInstance().deleteSearchId( searchId, callFrom );
		
		long deleteTopLevel_SearchTbl_Record_TimeTaken_Nano = System.nanoTime() - deleteTopLevel_SearchTbl_Record_TimeStart_Nano;
		
		if ( deleteTopLevel_SearchTbl_Record_TimeTaken_Nano > 1000000000 ) {
			

			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				
				System.out.println( "Time taken to delete top level search_tbl record is > 1 second.  Time takin in nano seconds: " + deleteTopLevel_SearchTbl_Record_TimeTaken_Nano + ", search id deleted: " + searchId );
			} else {
				
				log.info( "Time taken to delete top level search_tbl record is > 1 second.  Time takin in nano seconds: " + deleteTopLevel_SearchTbl_Record_TimeTaken_Nano + ", search id deleted: " + searchId );
			}
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}
			
		//  daemon thread so just use sleep
		
		Thread.sleep( 2000 );  //  Sleep in between deleted to allow other processing and the database to catch up
		

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}
	}
	
	/**
	 * @param searchId
	 * @throws Exception 
	 */
	private void deleteRecordsFromSearchRelatedTables( int searchId, Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom ) throws Exception {

		//  Delete all data for Search Id, starting at the "bottom"

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}
		
		Limelight_DatabaseCleanup__Delete_Single_Search__PSM_Table_And_Children.getInstance().delete_PSM_Table_And_Children_For_Single_Search(searchId, callFrom);
		

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}
		
		{
			final String TABLE = "srch__rep_pept_filterable_annotation_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}
		{
			final String TABLE = "srch__rep_pept_descriptive_annotation_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}
		{
			final String TABLE = "search__protein_sequence_version__annotation_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}
		
		{
			final String TABLE = "search__rep_pept__lookup_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}
		
		{
			final String TABLE = "search__rep_pept__psm_target_psm_best_psm_value_lookup_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}
		{
			final String TABLE = "search__rep_pept_sub_group_lookup_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}
		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search__rep_pept__psm_tgt_id_dcy_dcy_psm_bst_psm_vl_lkp_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search__rep_pept__psm_target_ind_decoy_psm_best_psm_vl_lkp_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search_reported_peptide_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}
		
		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search_file_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT 1"; // Delete 1 at a time since can be large records

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search_reported_peptide_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search_programs_per_search_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "static_mod_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search__dynamic_mod_mass_lookup_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "annotation_type_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "srch_rep_pept__dynamic_mod_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "protein_coverage_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search_scan_file_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "srch_rep_pept__prot_seq_v_id_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "srch_rep_pept__isotope_label_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}
		
		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search__isotope_label_lookup_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "srch_protein_group_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "srch_protein_group__protein_version_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "srch__prot_seq_v_id_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "conversion_program_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search__reporter_ion_mass_lookup_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "srch_rep_pept__reporter_ion_mass_lookup_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "srch_rep_pept__psm_open_mod_rounded_lookup_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "srch_rep_pept__open_mod_psm_unique_positions__lookup_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search__open_mod_mass__psm_rounded_unique__lookup_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "protein_coverage_peptide_protein_residue_different_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search_sub_group_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search_rep_pept_sub_group_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search__rep_pept_sub_group_lookup_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search__flags_other_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search_to_fasta_file_statistics_mapping_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search__rep_pept__psm_target_ind_decoy_psm_best_psm_vl_lkp_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search__rep_pept__psm_tgt_id_dcy_dcy_psm_bst_psm_vl_lkp_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search_details_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "importer_stats_general_data_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "importer_stats_per_table_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "search_psm_id_range_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		{
			final String TABLE = "importer__search_import_in_progress_tracking_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + OTHER_DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

	}
}
