package org.yeastrc.limelight.limelight_run_importer.import_files_delayed_removal_main;

import java.io.File;
import java.util.List;

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
		
		{
			List<Integer> fileImportTrackingIddList_To_Delete_Directories =
					FileImportTracking_For_ImporterRunner_DAO.getInstance().getAll_TrackingId_For_Status_Success_OR_Fail_LastUpdate_Over_3_DaysAgo();
			
			delete_Directories_For_trackingIdList(fileImportTrackingIddList_To_Delete_Directories);
		}
		if ( keepRunning ){
			
			List<Integer> fileImportTrackingIddList_To_Delete_Directories =
					FileImportTracking_For_ImporterRunner_DAO.getInstance().getAll_TrackingId_For_Status_Started_LastUpdate_Over_15_DaysAgo();
			
			delete_Directories_For_trackingIdList(fileImportTrackingIddList_To_Delete_Directories);
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
 }
