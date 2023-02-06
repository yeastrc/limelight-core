package org.yeastrc.limelight.database_cleanup.remove_deleted__file_import_tracking_tbl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum;
import org.yeastrc.limelight.database_cleanup.remove__general_removal_dao.Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated;
import org.yeastrc.limelight.database_cleanup.shutdown_requested_detection.Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection;

/**
 * Remove from file_import_tracking_tbl where field marked_for_deletion is 1 (for true)
 *
 */
public class Limelight_DatabaseCleanup__Remove_MarkedDeleted__file_import_tracking_tbl {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__Remove_MarkedDeleted__file_import_tracking_tbl.class);

	/**
	 * private constructor
	 */
	private Limelight_DatabaseCleanup__Remove_MarkedDeleted__file_import_tracking_tbl() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabaseCleanup__Remove_MarkedDeleted__file_import_tracking_tbl _instance = new Limelight_DatabaseCleanup__Remove_MarkedDeleted__file_import_tracking_tbl();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabaseCleanup__Remove_MarkedDeleted__file_import_tracking_tbl getInstance() {
		return _instance; 
	}
	
	/**
	 * @throws Exception
	 */
	public void cleanup_Search_AndChildren( 
			Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom,
			Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum delete_Or_ListIdsToDelete ) throws Exception {

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			
			return;
		}

		if ( delete_Or_ListIdsToDelete == Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum.DELETE_RECORDS ) {
			
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				System.out.println( "***************************************");
				System.out.println( "**  START:  Deleting from table 'search_tbl'");
				System.out.println( "******" );
			}
		} else {
			
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				System.out.println( "***************************************");
				System.out.println( "**  START:  Getting ids that would be deleted from table 'search_tbl'");
				System.out.println( "" );
				System.out.println( "  WARNING:  There may/will be additional records deleted once the records in table 'project_search_tbl' have been deleted" );
				System.out.println( "******" );
			}
		}

		if ( delete_Or_ListIdsToDelete == Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum.LIST_RECORD_IDS_TO_DELETE ) {
			
			System.out.println( "Unknown number of records to delete in table file_import_tracking_tbl where field marked_for_deletion is 1 (for true)." );
			System.out.println();

			////   EXIT HERE
			
			return;  // EARLY EXIT     Only listing ids to delete
		}
		
		log.info( "Deleting records in table file_import_tracking_tbl where field marked_for_deletion is 1 (for true).  START" );

		{
			final String TABLE = "file_import_tracking_tbl";

			final String SQL = 
					"DELETE FROM " + TABLE
							+ " WHERE "
							+ " marked_for_deletion = 1 "
							+ " AND "
							+ " deleted_date_time < DATE_SUB( NOW(), INTERVAL 1 day ) "
							+ " LIMIT 5";

			Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
		}

		log.info( "Deleting records in table file_import_tracking_tbl where field marked_for_deletion is 1 (for true).  END" );
		
	}
}
