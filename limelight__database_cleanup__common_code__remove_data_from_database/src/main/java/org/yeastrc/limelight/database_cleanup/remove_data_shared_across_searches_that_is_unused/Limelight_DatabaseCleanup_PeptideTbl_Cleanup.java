package org.yeastrc.limelight.database_cleanup.remove_data_shared_across_searches_that_is_unused;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum;
import org.yeastrc.limelight.database_cleanup.remove_data_shared_across_searches_that_is_unused.Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher.Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher_deleteBlock_Params;
import org.yeastrc.limelight.database_cleanup.remove_data_shared_across_searches_that_is_unused.Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher.Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher_deleteBlock_Result;
import org.yeastrc.limelight.database_cleanup.shutdown_requested_detection.Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection;


/**
 * Clean up peptide_tbl table
 *
 */
public class Limelight_DatabaseCleanup_PeptideTbl_Cleanup {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup_PeptideTbl_Cleanup.class);

	private static final int PEPTIDE_ID_DELETE_BLOCK_SIZE = 5000;

	private static final int NUMBER_RECORDS_DELETE_IN_ONE_CALL = 500;  //  
	
	/**
	 * private constructor
	 */
	private Limelight_DatabaseCleanup_PeptideTbl_Cleanup() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabaseCleanup_PeptideTbl_Cleanup _instance = new Limelight_DatabaseCleanup_PeptideTbl_Cleanup();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabaseCleanup_PeptideTbl_Cleanup getInstance() {
		return _instance; 
	}
	
	/**
	 * @param callFrom
	 * @param delete_Or_ListIdsToDelete
	 * @throws Exception
	 */
	public void cleanup_PeptideTbl_Unused(
			
			Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom,
			Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum delete_Or_ListIdsToDelete
			
			) throws Exception {
		
		if ( delete_Or_ListIdsToDelete == Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum.DELETE_RECORDS ) {
			
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				System.out.println( "***************************************");
				System.out.println( "**  START:  Deleting from table 'peptide_tbl'");
				System.out.println( "******" );
			}
		} else {
			
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				System.out.println( "***************************************");
				System.out.println( "**  START:  Getting ids that would be deleted from table 'peptide_tbl'");
				System.out.println( "******" );
			}
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {

			return;
		}

		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {

			System.out.println( "*************************************");
			System.out.println( "***  About to start deleting records in peptide_tbl NOT Used in ANY search" );
			System.out.println( "************");
		} else {
			log.info( "Database Cleanup: Starting: Removing Database records in peptide_tbl NOT Used in ANY search" );
		}

		if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
			return;
		}
		
		if ( delete_Or_ListIdsToDelete == Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum.LIST_RECORD_IDS_TO_DELETE ) {

			List<Integer> idsToDelete = Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher.getInstance().getIdsToDelete();

			if ( idsToDelete.isEmpty() ) {
				System.out.println( "peptide_tbl: NO ids to delete");
			} else {
				System.out.println( "peptide_tbl: record count to delete: " + idsToDelete.size() + ", ids to delete: " + StringUtils.join( idsToDelete ) );
			}
			
			return;
		}
		
		int total_rowCountDeleted = 0;
		
		int peptideId_Max = Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher.getInstance().getMaxId();
		
		for ( int peptideId_Start_Excluding = 0; peptideId_Start_Excluding < peptideId_Max; peptideId_Start_Excluding += PEPTIDE_ID_DELETE_BLOCK_SIZE ) {
			
			int peptideId_End_Including = peptideId_Start_Excluding + PEPTIDE_ID_DELETE_BLOCK_SIZE;
					
			if ( peptideId_End_Including >= peptideId_Max ) {
				peptideId_End_Including = peptideId_Max - 1; //  Skip peptideId_Max
			}

			int rowCountDeleted;
			
			do {
				Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher_deleteBlock_Params params = new Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher_deleteBlock_Params();
				params.setCallFrom(callFrom);
				params.setPeptideId_Start_Excluding(peptideId_Start_Excluding);
				params.setPeptideId_End_Including(peptideId_End_Including);
				params.setDeleteLimit( NUMBER_RECORDS_DELETE_IN_ONE_CALL );

				Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher_deleteBlock_Result result =
						Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher.getInstance().deleteBlock( params );

				rowCountDeleted = result.getRowsDeleted_Count();

				total_rowCountDeleted += rowCountDeleted;

			} while ( rowCountDeleted >= NUMBER_RECORDS_DELETE_IN_ONE_CALL );

		}
		
		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
			System.out.println( "***************************************");
			System.out.println( "**  END:  Deleting from table 'peptide_tbl'.  Deleted " + total_rowCountDeleted + " rows." );
			System.out.println( "***************************************");
		} else {
			if ( log.isInfoEnabled() ) {
				log.info( "**  END:  Deleting from table 'peptide_tbl'.  Deleted " + total_rowCountDeleted + " rows." );	
			}
		}

	}
	
}
