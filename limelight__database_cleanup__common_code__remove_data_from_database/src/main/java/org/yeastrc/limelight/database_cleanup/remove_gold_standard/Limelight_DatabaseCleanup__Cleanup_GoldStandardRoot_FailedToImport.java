package org.yeastrc.limelight.database_cleanup.remove_gold_standard;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum;
import org.yeastrc.limelight.database_cleanup.shutdown_requested_detection.Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection;


/**
 * Clean up gold_standard_for_scan_file_root_tbl table
 * 
 * Remove records that were NOT Fully Inserted:
 * 
 * 		Remove records that were NOT Marked Fully Inserted within a time limit
 *
 */
public class Limelight_DatabaseCleanup__Cleanup_GoldStandardRoot_FailedToImport {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__Cleanup_GoldStandardRoot_FailedToImport.class);

	/**
	 * private constructor
	 */
	private Limelight_DatabaseCleanup__Cleanup_GoldStandardRoot_FailedToImport() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabaseCleanup__Cleanup_GoldStandardRoot_FailedToImport _instance = new Limelight_DatabaseCleanup__Cleanup_GoldStandardRoot_FailedToImport();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabaseCleanup__Cleanup_GoldStandardRoot_FailedToImport getInstance() {
		return _instance; 
	}
	
	/**
	 * @param callFrom
	 * @param delete_Or_ListIdsToDelete
	 * @throws Exception
	 */
	public void cleanup_FailedImports(
			
			Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom,
			Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum delete_Or_ListIdsToDelete
			
			) throws Exception {
		
		if ( delete_Or_ListIdsToDelete == Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum.DELETE_RECORDS ) {
			
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				System.out.println( "***************************************");
				System.out.println( "**  START:  Deleting from table 'gold_standard_for_scan_file_root_tbl'");
				System.out.println( "******" );
			}
		} else {
			
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				System.out.println( "***************************************");
				System.out.println( "**  START:  Getting ids that would be deleted from table 'gold_standard_for_scan_file_root_tbl'");
				System.out.println( "******" );
			}
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {

			return;
		}

		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {

			System.out.println( "*************************************");
			System.out.println( "***  About to start deleting records in gold_standard_for_scan_file_root_tbl for failed import" );
			System.out.println( "************");
		} else {
			log.info( "Database Cleanup: Starting: Removing Database records in gold_standard_for_scan_file_root_tbl for failed import" );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		
		List<Integer> idsToDelete = Limelight_DatabaseCleanup__GoldStandardRoot_FailedToImport_Searcher.getInstance().getIdsToDelete();

		if ( delete_Or_ListIdsToDelete == Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum.LIST_RECORD_IDS_TO_DELETE ) {
			
			if ( idsToDelete.isEmpty() ) {
				System.out.println( "gold_standard_for_scan_file_root_tbl: NO ids to delete");
			} else {
				System.out.println( "gold_standard_for_scan_file_root_tbl: ids to delete: " + StringUtils.join( idsToDelete ) );
			}
			
			return;
		}
		
		Limelight_DatabaseCleanup__GoldStandard_Delete_DAO limelight_DatabaseCleanup__GoldStandard_Delete_DAO = Limelight_DatabaseCleanup__GoldStandard_Delete_DAO.getInstance();
		
		for ( Integer gold_standard_for_scan_file_root_id : idsToDelete ) {

			{ //  Delete records for this root id from gold_standard_single_entry_tbl
				
				int deletedRecordCount = -1;
				do {
					deletedRecordCount = limelight_DatabaseCleanup__GoldStandard_Delete_DAO.delete_gold_standard_single_entry_tbl_FOR_Root_Id(gold_standard_for_scan_file_root_id, callFrom);

					if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
						return;
					}
					
				} while ( deletedRecordCount != 0 );
			}
			{ //  Delete records for this root id from gold_standard_uploaded_file_contents_tbl

				int deletedRecordCount = -1;
				do {
					deletedRecordCount = limelight_DatabaseCleanup__GoldStandard_Delete_DAO.delete_gold_standard_uploaded_file_contents_tbl_FOR_Root_Id(gold_standard_for_scan_file_root_id, callFrom);

					if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
						return;
					}
					
				} while ( deletedRecordCount != 0 );
			}
			
			//  Finally delete the root table record from table gold_standard_for_scan_file_root_tbl
			
			//       This will cascade delete any remaining children records 
			
			limelight_DatabaseCleanup__GoldStandard_Delete_DAO.delete_From_gold_standard_for_scan_file_root_tbl_Root_Id(gold_standard_for_scan_file_root_id, callFrom);
		}

		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
			System.out.println( "***************************************");
			System.out.println( "**  END:  Deleting from table 'gold_standard_for_scan_file_root_tbl'");
			System.out.println( "***************************************");
		}

	}
	
}
