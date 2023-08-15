package org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.main;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum;
import org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.dao.Limelight_DatabaseCleanup__ProjectSearchDAO;
import org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.searcher.Limelight_DatabaseCleanup__ProjectSearchIdsToDeleteSearcher;
import org.yeastrc.limelight.database_cleanup.shutdown_requested_detection.Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection;


/**
 * Clean up project_search table and children
 *
 */
public class Limelight_DatabaseCleanup__Cleanup_ProjectSearchTbl_And_Children {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__Cleanup_ProjectSearchTbl_And_Children.class);

	/**
	 * private constructor
	 */
	private Limelight_DatabaseCleanup__Cleanup_ProjectSearchTbl_And_Children() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabaseCleanup__Cleanup_ProjectSearchTbl_And_Children _instance = new Limelight_DatabaseCleanup__Cleanup_ProjectSearchTbl_And_Children();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabaseCleanup__Cleanup_ProjectSearchTbl_And_Children getInstance() {
		return _instance; 
	}
	
	/**
	 * @param delete_Or_ListIdsToDelete
	 * @throws Exception
	 */
	public void cleanup_ProjectSearch_AndChildren(
			
			Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom,
			Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum delete_Or_ListIdsToDelete 
			
			) throws Exception {
		
		if ( delete_Or_ListIdsToDelete == Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum.DELETE_RECORDS ) {
			
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				System.out.println( "***************************************");
				System.out.println( "**  START:  Deleting from table 'project_search'");
				System.out.println( "******" );
			}
		} else {
			
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				System.out.println( "***************************************");
				System.out.println( "**  START:  Getting ids that would be deleted from table 'project_search'");
				System.out.println( "******" );
			}
		}
		
		//   Get List of Project Search Ids to Delete from DB
		
		List<Integer> projectSearchIdsToDeleteList = 
				Limelight_DatabaseCleanup__ProjectSearchIdsToDeleteSearcher.getInstance()
				.getProjectSearchIdsToDelete();
		
		if ( delete_Or_ListIdsToDelete == Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum.LIST_RECORD_IDS_TO_DELETE ) {
			
			//  Only listing ids to delete
			
			if ( projectSearchIdsToDeleteList.isEmpty() ) {
				System.out.println( "NO records in table 'project_search' to delete." );
				System.out.println();
			} else {
				System.out.println( "Would delete " + projectSearchIdsToDeleteList.size() + " records from table 'project_search'" );
				System.out.println( "ids that would be deleted from table 'project_search': "
						+ StringUtils.join( projectSearchIdsToDeleteList, ", " ) );
			}
			
			////   EXIT HERE
			
			return;  // EARLY EXIT     Only listing ids to delete
		}
		
		if ( projectSearchIdsToDeleteList.isEmpty() ) {
			
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				System.out.println( "NO records in table 'project_search_tbl' to delete." );
				System.out.println();
			}
		
		} else {

			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				System.out.println( "Deleting " + projectSearchIdsToDeleteList.size() + " records from table 'project_search_tbl' (and it's children through foreign keys)" );

				System.out.println( "Deleting records (1 at a time) from 'project_search_tbl' table and children for project_search_tbl.id in: "
						+ StringUtils.join( projectSearchIdsToDeleteList, ", " ) );
			} else {

				log.info( "Database Cleanup: Starting: Removing Database records for Search to Project Relation records (table project_search_tbl).  Number of Records to remove: " + projectSearchIdsToDeleteList.size()  );
				
				log.info( "Deleting records (1 at a time) from project_search_tbl table and children for project_search_tbl.id in: "
						+ StringUtils.join( projectSearchIdsToDeleteList, ", " ) );
			}

			Limelight_DatabaseCleanup__ProjectSearchDAO projectSearchDAO = Limelight_DatabaseCleanup__ProjectSearchDAO.getInstance();

			for ( Integer projectSearchId : projectSearchIdsToDeleteList ) {

				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					
					log.info( "About to start deleting records for project search id BUT 'waitForImporterRun_And_IsShutdownRequestReceived()' returned true so exiting. projectSearchId: " + projectSearchId );
					
					return;
				}

				if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {

					System.out.println( "*************************************");
					System.out.println( "***  About to start deleting records for project search id: " + projectSearchId );
					System.out.println( "************");
				} else {
					log.info( "Database Cleanup: Starting: Removing Database records for project search id: " + projectSearchId );
				}

				//  Actual delete of project search record
					
				projectSearchDAO.deleteProjectSearchId( projectSearchId );

				if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				
					System.out.println( "************");
					System.out.println( "***  Finished deleting records for project search id: " + projectSearchId );
					System.out.println( "*************************************");
				} else {
					log.info( "Database Cleanup: Finished: Removing Database records for project search id: " + projectSearchId );
				}
				
				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {

					log.info( "After deleting records for project search id THEN 'waitForImporterRun_And_IsShutdownRequestReceived()' returned true so exiting. projectSearchId: " + projectSearchId );
					
					return;
				}
					
				//  daemon thread so just use sleep
				
				Thread.sleep( 2000 );  //  Sleep in between deleted to allow other processing and the database to catch up
				

				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {

					log.info( "After deleting records for project search id AFTER Thread.sleep(...): THEN 'waitForImporterRun_And_IsShutdownRequestReceived()' returned true so exiting. projectSearchId: " + projectSearchId );
					
					return;
				}
					
			}
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.LIMELIGHT__RUN_IMPORTER_PROGRAM ) {

				log.info( "Database Cleanup: FINISHED: Removing Database records for Search to Project Relation records (table project_search_tbl).  Number of Records removed: " + projectSearchIdsToDeleteList.size()  );
			}
		}
		
		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
			System.out.println( "***************************************");
			System.out.println( "**  END:  Deleting from table 'project_search_tbl'");
			System.out.println( "***************************************");
		}

	}
	
}
