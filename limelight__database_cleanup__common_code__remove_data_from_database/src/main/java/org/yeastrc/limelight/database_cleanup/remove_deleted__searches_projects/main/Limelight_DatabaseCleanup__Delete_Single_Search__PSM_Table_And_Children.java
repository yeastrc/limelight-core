package org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.main;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.common.database_connection.Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.database_cleanup.remove__general_removal_dao.Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated;
import org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.searcher.Limelight_DatabaseCleanup__AnnotationTypeRecordsCount_ForSearchId_Searcher;
import org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.searcher.Limelight_DatabaseCleanup__PsmIdsForSearchId_Searcher;
import org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.searcher.Limelight_DatabaseCleanup__PsmIdsForSearchId_Searcher.Limelight_DatabaseCleanup__PsmIdsForSearchId_Searcher_Result;
import org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.searcher.Limelight_DatabaseCleanup__SearchTbl_Has_SearchSubGroupsFlag_ForSearchId_Searcher;
import org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.searcher.Limelight_DatabaseCleanup__SearchTbl_Has_any_psm_has__psm_peptide_position_annotation_Flag_ForSearchId_Searcher;
import org.yeastrc.limelight.database_cleanup.shutdown_requested_detection.Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;
import org.yeastrc.limelight.limelight_shared.enum_classes.PsmPeptideMatchedProteinAnnotationType;

/**
 * Delete records from psm_tbl and children for Single Search Id
 *
 */
public class Limelight_DatabaseCleanup__Delete_Single_Search__PSM_Table_And_Children {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__Delete_Single_Search__PSM_Table_And_Children.class);

    //  Batch size for deleting PSM records
    private static final int DELETE_BATCH_SIZE = 5000; //  Number of records to delete at a time
    
    
	/**
	 * private constructor
	 */
	private Limelight_DatabaseCleanup__Delete_Single_Search__PSM_Table_And_Children() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabaseCleanup__Delete_Single_Search__PSM_Table_And_Children _instance = new Limelight_DatabaseCleanup__Delete_Single_Search__PSM_Table_And_Children();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabaseCleanup__Delete_Single_Search__PSM_Table_And_Children getInstance() {
		return _instance; 
	}
	

	
	/**
	 * @param searchId
	 * @throws Exception 
	 */
	public void delete_PSM_Table_And_Children_For_Single_Search( int searchId, Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom ) throws Exception {
		
		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}
		
		Limelight_DatabaseCleanup__PsmIdsForSearchId_Searcher_Result psmIdsForSearchId_Searcher_Result = 
				Limelight_DatabaseCleanup__PsmIdsForSearchId_Searcher.getInstance().get_PsmIdsForSearchId(searchId);
		
		if ( psmIdsForSearchId_Searcher_Result.getPsmId_List().isEmpty() ) {
			
			return;  // EARLY RETURN
		}
		
		{
			int psm_AnnotationType_Records_Count = 
					Limelight_DatabaseCleanup__AnnotationTypeRecordsCount_ForSearchId_Searcher.getInstance()
					.get_AnnotationTypeRecordsCount_ForSearchId(searchId,
							PsmPeptideMatchedProteinAnnotationType.PSM, 
							FilterableDescriptiveAnnotationType.FILTERABLE  );

			if ( psm_AnnotationType_Records_Count > 0 ) {
				
				int psmIds_DeleteAt_A_Time = DELETE_BATCH_SIZE / psm_AnnotationType_Records_Count;

				final String TABLE = "psm_filterable_annotation_tbl";

				delete_Psm_ChildTable_Data( TABLE, searchId, psmIdsForSearchId_Searcher_Result.getPsmId_List(), psmIds_DeleteAt_A_Time, callFrom );
			}
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}

		{
			int psm_AnnotationType_Records_Count = 
					Limelight_DatabaseCleanup__AnnotationTypeRecordsCount_ForSearchId_Searcher.getInstance()
					.get_AnnotationTypeRecordsCount_ForSearchId(searchId,
							PsmPeptideMatchedProteinAnnotationType.PSM, 
							FilterableDescriptiveAnnotationType.DESCRIPTIVE  );
			
			if ( psm_AnnotationType_Records_Count > 0 ) {
			
				int psmIds_DeleteAt_A_Time = DELETE_BATCH_SIZE / psm_AnnotationType_Records_Count;
	
				final String TABLE = "psm_descriptive_annotation_tbl";
	
				delete_Psm_ChildTable_Data( TABLE, searchId, psmIdsForSearchId_Searcher_Result.getPsmId_List(), psmIds_DeleteAt_A_Time, callFrom );
			}
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}

		if ( ! psmIdsForSearchId_Searcher_Result.getPsmId_List__has_reporter_ions().isEmpty() ){
			
			int psmIds_DeleteAt_A_Time = DELETE_BATCH_SIZE / 2;

			final String TABLE = "psm_reporter_ion_mass_tbl";

			delete_Psm_ChildTable_Data( TABLE, searchId, psmIdsForSearchId_Searcher_Result.getPsmId_List__has_reporter_ions(), psmIds_DeleteAt_A_Time, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}


		if ( ! psmIdsForSearchId_Searcher_Result.getPsmId_List__has_open_modifications().isEmpty() ){
			
			int psmIds_DeleteAt_A_Time = DELETE_BATCH_SIZE / 5;  // delete smaller batch since have related position records to delete

			final String TABLE = "psm_open_modification_tbl";

			delete_Psm_ChildTable_Data( TABLE, searchId, psmIdsForSearchId_Searcher_Result.getPsmId_List__has_open_modifications(), psmIds_DeleteAt_A_Time, callFrom );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}


		if ( ! psmIdsForSearchId_Searcher_Result.getPsmId_List__has_modifications().isEmpty() ){
			
			int psmIds_DeleteAt_A_Time = DELETE_BATCH_SIZE / 2;  // delete smaller batch since may have records to delete

			final String TABLE = "psm_dynamic_modification_tbl";

			delete_Psm_ChildTable_Data( TABLE, searchId, psmIdsForSearchId_Searcher_Result.getPsmId_List__has_modifications(), psmIds_DeleteAt_A_Time, callFrom );
		}
		
		{
			boolean has_SearchSubGroupsFlag = Limelight_DatabaseCleanup__SearchTbl_Has_SearchSubGroupsFlag_ForSearchId_Searcher.getInstance().get_SearchTbl_Has_SearchSubGroupsFlag_ForSearchId(searchId);
			
			if ( has_SearchSubGroupsFlag ) {

				int psmIds_DeleteAt_A_Time = DELETE_BATCH_SIZE;

				final String TABLE = "psm_search_sub_group_tbl";

				delete_Psm_ChildTable_Data( TABLE, searchId, psmIdsForSearchId_Searcher_Result.getPsmId_List(), psmIds_DeleteAt_A_Time, callFrom );
			}
		}

		{
			boolean has_any_psm_has__psm_peptide_position_annotation_Flag =
					Limelight_DatabaseCleanup__SearchTbl_Has_any_psm_has__psm_peptide_position_annotation_Flag_ForSearchId_Searcher.getInstance()
					.get_SearchTbl_Has_any_psm_has__psm_peptide_position_annotation_Flag_ForSearchId( searchId );
			
			if ( has_any_psm_has__psm_peptide_position_annotation_Flag ) {

				{
					int psmIds_DeleteAt_A_Time = DELETE_BATCH_SIZE;

					final String TABLE = "psm_peptide_position_filterable_annotation_tbl";

					delete_Psm_ChildTable_Data( TABLE, searchId, psmIdsForSearchId_Searcher_Result.getPsmId_List(), psmIds_DeleteAt_A_Time, callFrom );
				}

				
				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					
					return;
				}
				
				{
					int psmIds_DeleteAt_A_Time = DELETE_BATCH_SIZE;

					final String TABLE = "psm_peptide_position_worst_filterable_annotation_lookup_tbl";

					delete_Psm_ChildTable_Data( TABLE, searchId, psmIdsForSearchId_Searcher_Result.getPsmId_List(), psmIds_DeleteAt_A_Time, callFrom );
				}
			}
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}
		
		{
			// psm - cascading deletes for psm annotation
			
			final String TABLE = "psm_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE search_id = " + searchId
							+ " LIMIT " + DELETE_BATCH_SIZE;

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

	}
	
	/**
	 * psm_tbl child table
	 * 
	 * @param searchId
	 * @param psmIds
	 * @param callFrom
	 * @throws SQLException 
	 */
	private void delete_Psm_ChildTable_Data( 
			
			String tableName, 
			int searchId, 
			List<Long> psmIds,
			int psmIds_DeleteAt_A_Time,
			Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom ) throws SQLException {
		
		if ( psmIds_DeleteAt_A_Time < 10 ) {
			psmIds_DeleteAt_A_Time = 10;  // Ensure we delete something
		}
		
		Iterator<Long> psmIds_Iterator = psmIds.iterator();

		final String SQL_Start = 
				"DELETE FROM " + tableName
						+ " WHERE psm_id IN ( ";
		
		while ( psmIds_Iterator.hasNext() ) {

			
			if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
				
				break;
			}

			StringBuilder sqlSB = new StringBuilder( 10000 );

			sqlSB.append( SQL_Start );

			int psmId_Counter_Current_Batch = 0;

			while ( psmIds_Iterator.hasNext() && psmId_Counter_Current_Batch < psmIds_DeleteAt_A_Time ) {

				psmId_Counter_Current_Batch++;


				Long psmId = psmIds_Iterator.next();

				if ( psmId_Counter_Current_Batch > 1 ) {
					sqlSB.append( "," );
				}

				sqlSB.append( String.valueOf( psmId ) );
			}

			sqlSB.append( " ) " ); // close 'IN'
			
			String sql = sqlSB.toString();


			try ( Connection dbConnection = Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance().getConnection() ) {
				try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

					pstmt.executeUpdate();
				}
			}
		}
	}
}
