package org.yeastrc.limelight.limelight_run_importer.import_files_delayed_removal_main_and_searcher;

import java.io.File;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_run_importer.delete_directory_and_contents.DeleteDirectoryAndContents;
import org.yeastrc.limelight.limelight_run_importer.import_files__delete_s3_objects_for_db_single_file_records.ImportFiles_Delete_S3Objects_For_DB_SingleFile_Records;
import org.yeastrc.limelight.limelight_run_importer.import_files_remove_success_failed_except_last_2_main_and_searcher.ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main;
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
	
	private volatile ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main importFiles_Remove_SuccessFailed_ExceptLastTwo_Main;

	private volatile boolean keepRunning = true;
	/**
	 * shutdown was received from the operating system on a different thread
	 */
	public void shutdown() {
		log.debug( "shutdown() Called" );
		
	
		try {
			if ( importFiles_Remove_SuccessFailed_ExceptLastTwo_Main != null ) {
				importFiles_Remove_SuccessFailed_ExceptLastTwo_Main.shutdown();
			}
			
		} catch ( Throwable t ) {
			
		}
		
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
	public void importFiles_DelayedRemoval_Main(ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory) {
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
			
			internal_ProcessMain(importRunImporterDBConnectionFactory);
			
		} catch ( Throwable t) {
			
			log.error( "Error deleting Import files after Delay: " , t);
			
			//  Eat Exception
		}
		
	}
	
	/**
	 * @throws Exception 
	 * 
	 */
	private void internal_ProcessMain(ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory) throws Exception {
		
		{  //  Delete All Status Success or Fail and Table Record Last Updated over 3 days ago
			
			List<Integer> fileImportTrackingIddList_To_Delete_Directories =
					ImportFiles_DelayedRemoval_Main_Searchers.getSingletonInstance()
					.getAll_TrackingId_For_Status_Success_OR_Fail_LastUpdate_Over_3_DaysAgo(importRunImporterDBConnectionFactory);
			
			delete_Directories_For_trackingIdList(fileImportTrackingIddList_To_Delete_Directories);
		}

		if ( keepRunning ) {  //  Delete All Status Success Except Last 2, All Status Failed Except Last 2
			
			try {
				importFiles_Remove_SuccessFailed_ExceptLastTwo_Main = ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main.getSingletonInstance();
				
				importFiles_Remove_SuccessFailed_ExceptLastTwo_Main.importFiles_Remove_SuccessFailed_ExceptLastTwo_Main(importRunImporterDBConnectionFactory);
				
			} finally {
				importFiles_Remove_SuccessFailed_ExceptLastTwo_Main = null;
			}
		}
		
		
		
		if ( keepRunning ) {
			
			  //  Delete All Status INIT_INSERT_PRE_QUEUED OR STARTED (Started Import) and Table Record Last Updated over 15 days ago
			
			List<Integer> fileImportTrackingIddList_To_Delete_Directories =
					ImportFiles_DelayedRemoval_Main_Searchers.getSingletonInstance()
					.getAll_TrackingId_For_Status_INIT_INSERT_PRE_QUEUED_or_STARTED__LastUpdate_Over_15_DaysAgo(importRunImporterDBConnectionFactory);
			
			delete_Directories_For_trackingIdList(fileImportTrackingIddList_To_Delete_Directories);
		}
		
		
		if ( keepRunning ) {
		
			//  Delete SubDirs that are NOT in the Tracking Table
			
			delete_Directories_NOT_IN_trackingIdList(importRunImporterDBConnectionFactory);
		}
		
		
		if ( keepRunning ) {
			
			//  Delete SubDirs under upload_file_temp_base_dir that are over X days old
			
			delete_Directories_In_FileUploadSubDir__Over_X_Days_Old();
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

		if ( ! importerBaseDir.exists() ) {
			//  Directory NOT exist so skip
			
			return; // EARLY RETURN
		}
		
		for ( Integer fileImportTrackingId : fileImportTrackingIddList_To_Delete_Directories ) {
			
			if ( ! this.keepRunning ) {
				//  Shutdown requested so exit
				
				break;  //  EARLY BREAK
			}
			
			ImportFiles_Delete_S3Objects_For_DB_SingleFile_Records.getInstance().delete_S3Objects_For_DB_SingleFile_Records( fileImportTrackingId );
						
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
	private void delete_Directories_NOT_IN_trackingIdList(ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory) throws Exception {

		long now_Minus_5_Days = System.currentTimeMillis() - ( 5 * TWENTY_FOUR_HOURS__IN_MILLISECONDS );
		
		Set<String> subdirNames_For_All_fileImportTrackingId_List_InTable = new HashSet<>();
		
		{
			List<Integer> fileImportTrackingId_List_ALL_Id_InTable =
					ImportFiles_DelayedRemoval_Main_Searchers.getSingletonInstance()
					.getAll_TrackingId_InTable_List(importRunImporterDBConnectionFactory);

			for ( Integer fileImportTrackingId : fileImportTrackingId_List_ALL_Id_InTable ) {

				String subdirNameForThisTrackingId =
						Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().getDirForImportTrackingId( fileImportTrackingId );

				subdirNames_For_All_fileImportTrackingId_List_InTable.add(subdirNameForThisTrackingId);
			}
		}

		File limelight_XML_Importer_Work_Directory =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		
		File importerBaseDir = new File( limelight_XML_Importer_Work_Directory, FileUploadCommonConstants.IMPORT_BASE_DIR );
		
		if ( ! importerBaseDir.exists() ) {
			//  Directory NOT exist so skip
			
			return; // EARLY RETURN
		}
		
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
	private void delete_Directories_In_FileUploadSubDir__Over_X_Days_Old() throws Exception {
		
		final long NUMBER_OF_DAYS_TO_WAIT_TO_DELETE = 1;  // 1 since now Webapp only uploads files once user clicks "Submit Upload" to submit everything

		long now_Minus_X_Days = System.currentTimeMillis() - ( NUMBER_OF_DAYS_TO_WAIT_TO_DELETE * TWENTY_FOUR_HOURS__IN_MILLISECONDS );
		
		File limelight_XML_Importer_Work_Directory =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		
		File uploadFileBaseDir = new File( limelight_XML_Importer_Work_Directory, FileUploadCommonConstants.UPLOAD_FILE_TEMP_BASE_DIR );

		if ( ! uploadFileBaseDir.exists() ) {
			//  Directory NOT exist so skip
			
			return; // EARLY RETURN
		}
		
		
		for ( File subDir : uploadFileBaseDir.listFiles() ) {
			
			//  delete it if it was last modified before X days ago

			boolean lastModified_Before_X_DaysAgo = false;

			if ( subDir.lastModified() < now_Minus_X_Days ) {

				//  subDir Last Modified before X days ago 

				lastModified_Before_X_DaysAgo = true;

				//  Last Modified before X days ago so confirm all contents at root level also before 5 days ago

				for ( File subDir_Entry : subDir.listFiles() ) {

					if ( subDir_Entry.lastModified() > now_Minus_X_Days ) {

						lastModified_Before_X_DaysAgo = false; // Set back false since after 5 days ago
						break;
					}
				}
			}
			if ( lastModified_Before_X_DaysAgo ) {

				DeleteDirectoryAndContents.getInstance().deleteDirectoryAndContents(subDir);
			}
		}
	}
	
	
 }
