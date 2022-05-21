package org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.main;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum;
import org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.searcher.Limelight_DatabaseCleanup__SearchIdsToDeleteSearcher;
import org.yeastrc.limelight.database_cleanup.shutdown_requested_detection.Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection;


/**
 * Clean up search table and children
 * 
 * 
 * 
 * Clean up project_search table first
 *
 */
public class Limelight_DatabaseCleanup__Cleanup_SearchTbl_And_Children {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__Cleanup_SearchTbl_And_Children.class);

	/**
	 * private constructor
	 */
	private Limelight_DatabaseCleanup__Cleanup_SearchTbl_And_Children() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabaseCleanup__Cleanup_SearchTbl_And_Children _instance = new Limelight_DatabaseCleanup__Cleanup_SearchTbl_And_Children();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabaseCleanup__Cleanup_SearchTbl_And_Children getInstance() {
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
				
		List<Integer> searchIdsToDeleteList = 
				Limelight_DatabaseCleanup__SearchIdsToDeleteSearcher.getInstance()
				.getSearchIdsToDelete();

		if ( delete_Or_ListIdsToDelete == Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum.LIST_RECORD_IDS_TO_DELETE ) {
			
			//  Only listing ids to delete
			
			if ( searchIdsToDeleteList.isEmpty() ) {
				
//				if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
					
					System.out.println( "NO records in table 'search_tbl' to delete." );
					System.out.println();
//				}
			} else {
//				if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
					
					System.out.println( "Would delete " + searchIdsToDeleteList.size() + " records from table 'search_tbl'" );
					System.out.println( "ids that would be deleted from table 'search': "
							+ StringUtils.join( searchIdsToDeleteList, ", " ) );
					System.out.println( "" );
					System.out.println( "  WARNING:  There may/will be additional records deleted once the records in table 'project_search' have been deleted" );
//				}
			}

			////   EXIT HERE
			
			return;  // EARLY EXIT     Only listing ids to delete
		}
		
		
		if ( searchIdsToDeleteList.isEmpty() ) {
			
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				
				System.out.println( "NO records in table 'search_tbl' to delete." );
				System.out.println();
			}
			
		} else {

			if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
				
				return;
			}
				
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {

				System.out.println( "Deleting " + searchIdsToDeleteList.size() + " records from table 'search_tbl'" );
			
				System.out.println( "Deleting records (1 at a time) from search table and children for search_tbl.id in: "
						+ StringUtils.join( searchIdsToDeleteList, ", " ) );
			} else {
				//  From Run Importer
				
				log.info( "Database Cleanup: Starting: Removing Database records for deleted Searches.  Number of Searches to remove: " + searchIdsToDeleteList.size()  );
				
				log.info( "Deleting records (1 at a time) from search table and children for search_tbl.id in: "
						+ StringUtils.join( searchIdsToDeleteList, ", " ) );
			}

			for ( Integer searchId : searchIdsToDeleteList ) {

				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					
					return;
				}
					
				if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {

					System.out.println( "*************************************");
					System.out.println( "***  About to start deleting records for search id: " + searchId );
					System.out.println( "************");
				} else {
					log.info( "Database Cleanup: Starting: Removing Database records for deleted Search: " + searchId );
				}

				Limelight_DatabaseCleanup__Delete_Single_Search_And_Children.getInstance().delete_Single_Search( searchId, callFrom );

				if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				
					System.out.println( "************");
					System.out.println( "***  Finished deleting records for search id: " + searchId );
					System.out.println( "*************************************");
				} else {
					log.info( "Database Cleanup: Finished: Removing Database records for deleted Search: " + searchId );
				}

			}
			
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.LIMELIGHT__RUN_IMPORTER_PROGRAM ) {
				
				log.info( "Database Cleanup: FINISHED: Removing Database records for deleted Searches.  Number of Searches removed: " + searchIdsToDeleteList.size()  );
			}
		}
		
		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
		
			System.out.println( "***************************************");
			System.out.println( "**  END:  Deleting from table 'search_tbl'");
			System.out.println( "***************************************");
		}

	}
	
}
