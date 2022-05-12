package org.yeastrc.limelight.limelight_run_importer.import_files_delayed_removal_main;

import java.io.File;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_run_importer.dao.FileImportTracking_For_ImporterRunner_DAO;
import org.yeastrc.limelight.limelight_run_importer.delete_directory_and_contents.DeleteDirectoryAndContents;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsValuesSharedConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.constants.FileUploadCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;

/**
 * 
 *
 */
public class ImportFiles_DelayedRemoval_Main {

	private static final Logger log = LoggerFactory.getLogger( ImportFiles_DelayedRemoval_Main.class );

	private static final long TWENTY_FOUR_HOURS__IN_MILLISECONDS = 24 * 60 * 60 * 1000;  // Run every 24 hours
	
	

	/**
	 * private constructor
	 */
	private ImportFiles_DelayedRemoval_Main() { }
	/**
	 * Static singleton instance
	 */
	private static final ImportFiles_DelayedRemoval_Main _instance = new ImportFiles_DelayedRemoval_Main();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static ImportFiles_DelayedRemoval_Main getSingletonInstance() {
		return _instance; 
	}
	
	/////////////

	private volatile boolean keepRunning = true;
	/**
	 * shutdown was received from the operating system on a different thread
	 */
	public void shutdown() {
		log.debug( "shutdown() Called" );
		keepRunning = false;
		awaken();
		log.info( "Exiting shutdown()" );
	}

	/**
	 * awaken thread to process request
	 */
	private void awaken() {
		synchronized (this) {
			notify();
		}
	}
	
	////////////
	
	
	/**
	 * 
	 */
	public void importFiles_DelayedRemoval_Main() {
		try {
			boolean deleteFiles_Successful_Or_Failed_Import_After_3_Days = false;
			
			{
				String deleteFiles_SuccessfulImportImmediately_FailedImport_After_3_Days_ConfigValue =
						ConfigSystemTableGetValueCommon.getInstance()
						.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.IMPORT_DELETE_UPLOADED_FILES );
				
				String deleteFiles_All_After_3_Days_ConfigValue =
						ConfigSystemTableGetValueCommon.getInstance()
						.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.IMPORT_DELETE_UPLOADED_FILES__ALL_AFTER_3_DAYS );


				if ( ( ConfigSystemsValuesSharedConstants.TRUE.equals( deleteFiles_SuccessfulImportImmediately_FailedImport_After_3_Days_ConfigValue ) )
						|| ( ConfigSystemsValuesSharedConstants.TRUE.equals( deleteFiles_All_After_3_Days_ConfigValue ) ) ) {
					
					deleteFiles_Successful_Or_Failed_Import_After_3_Days = true;
				}
			}
			
			if ( ! deleteFiles_Successful_Or_Failed_Import_After_3_Days ) {
				//  Neither Config value in table is not true string.
				return;  //  EARLY EXIT
			}
			
			//  Main Execution
			
			internal_ProcessMain();
			
		} catch ( Throwable t) {
			
			log.error( "Error deleting Import files after Delay: " , t);
			
			//  Eat Exception
		}
		
	}
	
	/**
	 * @throws Exception 
	 * 
	 */
	private void internal_ProcessMain() throws Exception {
		
		{  //  Delete All Status Success or Fail and Table Record Last Updated over 3 days ago
			
			List<Integer> fileImportTrackingIddList_To_Delete_Directories =
					FileImportTracking_For_ImporterRunner_DAO.getInstance().getAll_TrackingId_For_Status_Success_OR_Fail_LastUpdate_Over_3_DaysAgo();
			
			delete_Directories_For_trackingIdList(fileImportTrackingIddList_To_Delete_Directories);
		}
		if ( keepRunning ){
			
			  //  Delete All Status Started (Started Import) and Table Record Last Updated over 15 days ago
			
			List<Integer> fileImportTrackingIddList_To_Delete_Directories =
					FileImportTracking_For_ImporterRunner_DAO.getInstance().getAll_TrackingId_For_Status_Started_LastUpdate_Over_15_DaysAgo();
			
			delete_Directories_For_trackingIdList(fileImportTrackingIddList_To_Delete_Directories);
		}
		if ( keepRunning ){
		
			//  Delete SubDirs that are NOT in the Tracking Table
			
			delete_Directories_NOT_IN_trackingIdList();
		}
		if ( keepRunning ){
			
			//  Delete SubDirs under upload_file_temp_base_dir that are over 15 days old
			
			delete_Directories_In_FileUploadSubDir__Over_15_Days_Old();
		}
	}
	
	/**
	 * @param fileImportTrackingIddList_To_Delete_Directories
	 * @throws Exception 
	 */
	private void delete_Directories_For_trackingIdList( List<Integer> fileImportTrackingIddList_To_Delete_Directories ) throws Exception {

		File limelight_XML_Importer_Work_Directory =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		
		File importerBaseDir = new File( limelight_XML_Importer_Work_Directory, FileUploadCommonConstants.IMPORT_BASE_DIR );
		
		for ( Integer fileImportTrackingId : fileImportTrackingIddList_To_Delete_Directories ) {
			
			if ( ! this.keepRunning ) {
				//  Shutdown requested so exit
				
				break;  //  EARLY BREAK
			}
						
			String subdirNameForThisTrackingId =
					Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().getDirForImportTrackingId( fileImportTrackingId );
			
			File subdirForThisTrackingId = new File( importerBaseDir, subdirNameForThisTrackingId );
			
			if ( ! subdirForThisTrackingId.exists() ) {
				//  Directory does NOT exist so SKIP
				
				continue; // EARLY CONTINUE
			}
			
			DeleteDirectoryAndContents.getInstance().deleteDirectoryAndContents( subdirForThisTrackingId );
			
			synchronized (this) {
				try {
					wait(3000);  //  Wait 3 seconds after each delete to not overload the system when many deletes
				} catch (InterruptedException e) {
					log.warn("wait() interrupted with InterruptedException");
				}
			}
		}
	}
	
	/**
	 * @throws Exception 
	 * 
	 */
	private void delete_Directories_NOT_IN_trackingIdList() throws Exception {

		long now_Minus_5_Days = System.currentTimeMillis() - ( 5 * TWENTY_FOUR_HOURS__IN_MILLISECONDS );
		
		Set<String> subdirNames_For_All_fileImportTrackingId_List_InTable = new HashSet<>();
		
		{
			List<Integer> fileImportTrackingId_List_ALL_Id_InTable =
					FileImportTracking_For_ImporterRunner_DAO.getInstance().getAll_TrackingId_InTable_List();

			for ( Integer fileImportTrackingId : fileImportTrackingId_List_ALL_Id_InTable ) {

				String subdirNameForThisTrackingId =
						Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().getDirForImportTrackingId( fileImportTrackingId );

				subdirNames_For_All_fileImportTrackingId_List_InTable.add(subdirNameForThisTrackingId);
			}
		}

		File limelight_XML_Importer_Work_Directory =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		
		File importerBaseDir = new File( limelight_XML_Importer_Work_Directory, FileUploadCommonConstants.IMPORT_BASE_DIR );
		
		
		for ( File subDir : importerBaseDir.listFiles() ) {
			
			String subDir_Name = subDir.getName();
			
			if ( ! subdirNames_For_All_fileImportTrackingId_List_InTable.contains(subDir_Name) ) {
			
				//  SubDir Name is NOT a name for ANY of the Tracking IDs in the DB so delete it if it was last modified before 5 days ago

				boolean lastModified_Before_5_DaysAgo = false;

				if ( subDir.lastModified() < now_Minus_5_Days ) {

					//  subDir Last Modified before 5 days ago 
					
					lastModified_Before_5_DaysAgo = true;

					//  Last Modified before 5 days ago so confirm all contents at root level also before 5 days ago

					for ( File subDir_Entry : subDir.listFiles() ) {

						if ( subDir_Entry.lastModified() > now_Minus_5_Days ) {

							lastModified_Before_5_DaysAgo = false; // Set back false since after 5 days ago
							break;
						}
					}
				}
				if ( lastModified_Before_5_DaysAgo ) {

					DeleteDirectoryAndContents.getInstance().deleteDirectoryAndContents(subDir);
				}
			}
		}
	}

	/**
	 * @throws Exception 
	 * 
	 */
	private void delete_Directories_In_FileUploadSubDir__Over_15_Days_Old() throws Exception {

		long now_Minus_15_Days = System.currentTimeMillis() - ( 15 * TWENTY_FOUR_HOURS__IN_MILLISECONDS );
		
		File limelight_XML_Importer_Work_Directory =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		
		File uploadFileBaseDir = new File( limelight_XML_Importer_Work_Directory, FileUploadCommonConstants.UPLOAD_FILE_TEMP_BASE_DIR );
		
		
		for ( File subDir : uploadFileBaseDir.listFiles() ) {
			
			//  delete it if it was last modified before 15 days ago

			boolean lastModified_Before_15_DaysAgo = false;

			if ( subDir.lastModified() < now_Minus_15_Days ) {

				//  subDir Last Modified before 15 days ago 

				lastModified_Before_15_DaysAgo = true;

				//  Last Modified before 15 days ago so confirm all contents at root level also before 5 days ago

				for ( File subDir_Entry : subDir.listFiles() ) {

					if ( subDir_Entry.lastModified() > now_Minus_15_Days ) {

						lastModified_Before_15_DaysAgo = false; // Set back false since after 5 days ago
						break;
					}
				}
			}
			if ( lastModified_Before_15_DaysAgo ) {

				DeleteDirectoryAndContents.getInstance().deleteDirectoryAndContents(subDir);
			}
		}
	}
	
	
 }
