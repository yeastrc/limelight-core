package org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.main;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum;
import org.yeastrc.limelight.database_cleanup.remove__general_removal_dao.Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated;
import org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.dao.Limelight_DatabaseCleanup__ProjectDAO;
import org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.searcher.Limelight_DatabaseCleanup__ProjectIdsToDeleteSearcher;
import org.yeastrc.limelight.database_cleanup.shutdown_requested_detection.Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection;


/**
 * Clean up project_tbl table
 *
 */
public class Limelight_DatabaseCleanup__Cleanup_ProjectTbl {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__Cleanup_ProjectTbl.class);

	/**
	 * private constructor
	 */
	private Limelight_DatabaseCleanup__Cleanup_ProjectTbl() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabaseCleanup__Cleanup_ProjectTbl _instance = new Limelight_DatabaseCleanup__Cleanup_ProjectTbl();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabaseCleanup__Cleanup_ProjectTbl getInstance() {
		return _instance; 
	}
	
	/**
	 * @param delete_Or_ListIdsToDelete
	 * @throws Exception
	 */
	public void cleanup_Project(
			
			Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom,
			Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum delete_Or_ListIdsToDelete 
			
			) throws Exception {
		
		if ( delete_Or_ListIdsToDelete == Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum.DELETE_RECORDS ) {
			
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				System.out.println( "***************************************");
				System.out.println( "**  START:  Deleting from table 'project_tbl'");
				System.out.println( "******" );
			}
		} else {
			
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				System.out.println( "***************************************");
				System.out.println( "**  START:  Getting ids that would be deleted from table 'project_tbl'");
				System.out.println( "******" );
			}
		}
		
		//   Get List of Project  Ids to Delete from DB
		
		List<Integer> projectIdsToDeleteList = 
				Limelight_DatabaseCleanup__ProjectIdsToDeleteSearcher.getInstance()
				.getProjectIdsToDelete();
		
		if ( delete_Or_ListIdsToDelete == Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum.LIST_RECORD_IDS_TO_DELETE ) {
			
			//  Only listing ids to delete
			
			if ( projectIdsToDeleteList.isEmpty() ) {
				System.out.println( "NO records in table 'project_search' to delete." );
				System.out.println();
			} else {
				System.out.println( "Would delete " + projectIdsToDeleteList.size() + " records from table 'project_search'" );
				System.out.println( "ids that would be deleted from table 'project_search': "
						+ StringUtils.join( projectIdsToDeleteList, ", " ) );
			}

			////   EXIT HERE
			
			return;  // EARLY EXIT     Only listing ids to delete
		}
		
		if ( projectIdsToDeleteList.isEmpty() ) {
			
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				System.out.println( "NO records in table 'project_tbl' to delete." );
				System.out.println();
			}
		
		} else {

			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				System.out.println( "Deleting " + projectIdsToDeleteList.size() + " records from table 'project_tbl' (and it's children through foreign keys)" );

				System.out.println( "Deleting records (1 at a time) from 'project_tbl' table and children for project_tbl.id in: "
						+ StringUtils.join( projectIdsToDeleteList, ", " ) );
			} else {

				log.info( "Database Cleanup: Starting: Removing Database records for  to Project Relation records (table project_tbl).  Number of Records to remove: " + projectIdsToDeleteList.size()  );
				
				log.info( "Deleting records (1 at a time) from project_tbl table and children for project_tbl.id in: "
						+ StringUtils.join( projectIdsToDeleteList, ", " ) );
			}

			Limelight_DatabaseCleanup__ProjectDAO projectDAO = Limelight_DatabaseCleanup__ProjectDAO.getInstance();

			for ( Integer projectId : projectIdsToDeleteList ) {

				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					
					return;
				}

				if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {

					System.out.println( "*************************************");
					System.out.println( "***  About to start deleting records for project id: " + projectId );
					System.out.println( "************");
				} else {
					log.info( "Database Cleanup: Starting: Removing Database records for project id: " + projectId );
				}
				
				//  delete DB Relation records from project_user_tbl 
				
//				Limelight_DatabaseCleanup__ProjectUserDAO.getInstance().deleteProjectId(projectId);

				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					return;
				}
				{
					final String TABLE = "project_user_tbl";

					final String SQL = 
							"DELETE FROM " + TABLE
									+ " WHERE project_id = " + projectId
									+ " LIMIT 5";

					Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
				}

				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					return;
				}
				{
					final String TABLE = "project_user_deleted_tbl";

					final String SQL = 
							"DELETE FROM " + TABLE
									+ " WHERE project_id = " + projectId
									+ " LIMIT 5";

					Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
				}

				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					return;
				}
				{
					final String TABLE = "user_invite_tracking_tbl";

					final String SQL = 
							"DELETE FROM " + TABLE
									+ " WHERE invited_project_id = " + projectId
									+ " LIMIT 5";

					Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
				}

				
				//  delete DB Relation records from user_invite_tracking_tbl

//				Limelight_DatabaseCleanup__UserInviteTrackingDAO.getInstance().deleteProjectId(projectId);

				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					
					return;
				}

				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					return;
				}
				{
					final String TABLE = "note_tbl";

					final String SQL = 
							"DELETE FROM " + TABLE
									+ " WHERE project_id = " + projectId
									+ " LIMIT 5";

					Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
				}

				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					return;
				}
				{
					final String TABLE = "folder_for_project_tbl";

					final String SQL = 
							"DELETE FROM " + TABLE
									+ " WHERE project_id = " + projectId
									+ " LIMIT 5";

					Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
				}

				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					return;
				}
				{
					final String TABLE = "file_import_tracking_tbl";

					final String SQL = 
							"DELETE FROM " + TABLE
									+ " WHERE project_id = " + projectId
									+ " LIMIT 5";

					Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
				}

				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					return;
				}
				{
					final String TABLE = "data_page_saved_view_tbl";

					final String SQL = 
							"DELETE FROM " + TABLE
									+ " WHERE project_id = " + projectId
									+ " LIMIT 5";

					Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
				}
				
				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					return;
				}
				{
					final String TABLE = "experiment_tbl";

					final String SQL = 
							"DELETE FROM " + TABLE
									+ " WHERE project_id = " + projectId
									+ " LIMIT 2";

					Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
				}
				
				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					return;
				}
				{
					final String TABLE = "project_level_default_fltr_ann_cutoffs_tbl";

					final String SQL = 
							"DELETE FROM " + TABLE
									+ " WHERE project_id = " + projectId
									+ " LIMIT 2";

					Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
				}
				
				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					return;
				}
				{
					final String TABLE = "project_level_default_fltr_ann_cutoffs_cutoff_as_string_prev_tbl";

					final String SQL = 
							"DELETE FROM " + TABLE
									+ " WHERE project_id = " + projectId
									+ " LIMIT 2";

					Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
				}
				
				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					return;
				}
				{
					final String TABLE = "project_level_default_fltr_ann_cutoffs__store_as_json__tbl";

					final String SQL = 
							"DELETE FROM " + TABLE
									+ " WHERE project_id = " + projectId
									+ " LIMIT 2";

					Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
				}

				
				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					return;
				}
				{
					final String TABLE = "project_level_default_fltr_ann_cutoffs__store_as_json__prev__tbl";

					final String SQL = 
							"DELETE FROM " + TABLE
									+ " WHERE project_id = " + projectId
									+ " LIMIT 2";

					Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.getInstance().execute_SQL_Until_NoRecordsUpdated( SQL, TABLE, callFrom );
				}
				
				
				
				
				

				
				//  Actual delete of project_tbl record
					
				projectDAO.deleteProjectId( projectId );

				if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				
					System.out.println( "************");
					System.out.println( "***  Finished deleting records for project id: " + projectId );
					System.out.println( "*************************************");
				} else {
					log.info( "Database Cleanup: Finished: Removing Database records for project id: " + projectId );
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
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.LIMELIGHT__RUN_IMPORTER_PROGRAM ) {

				log.info( "Database Cleanup: FINISHED: Removing Database records for  Project records (table project_tbl).  Number of Records removed: " + projectIdsToDeleteList.size()  );
			}
		}
		
		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
			System.out.println( "***************************************");
			System.out.println( "**  END:  Deleting from table 'project_tbl'");
			System.out.println( "***************************************");
		}

	}
	
}
