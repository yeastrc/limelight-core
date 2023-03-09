package org.yeastrc.limelight.limelight_run_importer.import_files_remove_success_failed_except_last_2_main_and_searcher;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_run_importer.delete_directory_and_contents.DeleteDirectoryAndContents;
import org.yeastrc.limelight.limelight_run_importer.import_files_remove_success_failed_except_last_2_main_and_searcher.ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers.ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers__getAll_TrackingId_TrackingRunId_SubStatus_For_Status_ResultItem;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsValuesSharedConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.constants.FileUploadCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportRunSubStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;

/**
 * Remove excludes Failed for System Error.
 * Keep Failed for System Error until the 3 day delete to support requeue after the System Error has been addressed.
 *
 */
public class ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main {

	private static final Logger log = LoggerFactory.getLogger( ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main.class );

	/**
	 * private constructor
	 */
	private ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main() { }
	/**
	 * Static singleton instance
	 */
	private static final ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main _instance = new ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main getSingletonInstance() {
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
	public void importFiles_Remove_SuccessFailed_ExceptLastTwo_Main(ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory) {
		try {
			boolean deleteFiles_Successful_Or_Failed_Import = false;
			
			{
				String deleteFiles_SuccessfulImportImmediately_FailedImport_After_3_Days_ConfigValue =
						ConfigSystemTableGetValueCommon.getInstance()
						.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.IMPORT_DELETE_UPLOADED_FILES );
				
				String deleteFiles_All_After_3_Days_ConfigValue =
						ConfigSystemTableGetValueCommon.getInstance()
						.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.IMPORT_DELETE_UPLOADED_FILES__ALL_AFTER_3_DAYS );


				if ( ( ConfigSystemsValuesSharedConstants.TRUE.equals( deleteFiles_SuccessfulImportImmediately_FailedImport_After_3_Days_ConfigValue ) )
						|| ( ConfigSystemsValuesSharedConstants.TRUE.equals( deleteFiles_All_After_3_Days_ConfigValue ) ) ) {
					
					deleteFiles_Successful_Or_Failed_Import = true;
				}
			}
			
			if ( ! deleteFiles_Successful_Or_Failed_Import ) {
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
		
		{  //  Delete All Status 'Success' Except Last 2
			
			List<Integer> fileImportTrackingIddList_To_Delete_Directories =
					ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers.getSingletonInstance()
					.getAll_TrackingId_For_Status( FileImportStatus.COMPLETE, importRunImporterDBConnectionFactory);
			
			//  Delete last 2 entries if exist
			if ( fileImportTrackingIddList_To_Delete_Directories.size() >= 2 ) {
				fileImportTrackingIddList_To_Delete_Directories.remove( fileImportTrackingIddList_To_Delete_Directories.size() - 1 );
			}
			if ( fileImportTrackingIddList_To_Delete_Directories.size() >= 1 ) {
				fileImportTrackingIddList_To_Delete_Directories.remove( fileImportTrackingIddList_To_Delete_Directories.size() - 1 );
			}
			
			delete_Directories_For_trackingIdList(fileImportTrackingIddList_To_Delete_Directories);
		}

		if ( keepRunning ) {  //  Delete All Status 'Fail' Except Last 2, excluding Fail for "System Error"
			
			List<Integer> fileImportTrackingIddList_To_Delete_Directories = null;
			
			{
				List<Integer> fileImportTrackingIddList_ForFailedStatus =
						ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers.getSingletonInstance()
						.getAll_TrackingId_For_Status( FileImportStatus.FAILED, importRunImporterDBConnectionFactory);

				if ( ! fileImportTrackingIddList_ForFailedStatus.isEmpty() ) {

					//  Remove all fileImportTrackingId where last run is System Error

					Map<Integer, ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers__getAll_TrackingId_TrackingRunId_SubStatus_For_Status_ResultItem> trackingId_TrackingRunId_SubStatus_Map_Key_TrackingId = 
							new HashMap<>( fileImportTrackingIddList_ForFailedStatus.size() );

					List<ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers__getAll_TrackingId_TrackingRunId_SubStatus_For_Status_ResultItem> getAll_TrackingId_TrackingRunId_SubStatus_For_Status_ResultList = 
							ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers.getSingletonInstance()
							.getAll_TrackingId_TrackingRunId_SubStatus_For_Status( FileImportStatus.FAILED, importRunImporterDBConnectionFactory);

					for ( ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers__getAll_TrackingId_TrackingRunId_SubStatus_For_Status_ResultItem trackingId_TrackingRunId_SubStatus_Entry : getAll_TrackingId_TrackingRunId_SubStatus_For_Status_ResultList ) {
						
						ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers__getAll_TrackingId_TrackingRunId_SubStatus_For_Status_ResultItem entryFromMap = 
								trackingId_TrackingRunId_SubStatus_Map_Key_TrackingId.get( trackingId_TrackingRunId_SubStatus_Entry.trackingId );
						if ( entryFromMap == null ) {
							trackingId_TrackingRunId_SubStatus_Map_Key_TrackingId.put( trackingId_TrackingRunId_SubStatus_Entry.trackingId, trackingId_TrackingRunId_SubStatus_Entry );
						} else {
							if ( trackingId_TrackingRunId_SubStatus_Entry.trackingRunId > entryFromMap.trackingRunId ) {
								//   New entry has larger run id (later run) so replace entry in map with new entry
								trackingId_TrackingRunId_SubStatus_Map_Key_TrackingId.put( trackingId_TrackingRunId_SubStatus_Entry.trackingId, trackingId_TrackingRunId_SubStatus_Entry );
							}
						}
					}
					
					fileImportTrackingIddList_To_Delete_Directories = new ArrayList<>( fileImportTrackingIddList_ForFailedStatus.size() );
					
					for ( Integer fileImportTrackingId_FailedStatus : fileImportTrackingIddList_ForFailedStatus ) {
						
						boolean deleteDirFor__fileImportTrackingId_FailedStatus = true;
						
						{
							ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers__getAll_TrackingId_TrackingRunId_SubStatus_For_Status_ResultItem entryFromMap = 
									trackingId_TrackingRunId_SubStatus_Map_Key_TrackingId.get( fileImportTrackingId_FailedStatus );

							if ( entryFromMap != null && entryFromMap.trackingRun_SubStatusId == FileImportRunSubStatus.SYSTEM_ERROR.value() ) {

								deleteDirFor__fileImportTrackingId_FailedStatus = false;  // NOT delete System Error
							}
						}
						
						if ( deleteDirFor__fileImportTrackingId_FailedStatus ) {
							fileImportTrackingIddList_To_Delete_Directories.add( fileImportTrackingId_FailedStatus );
						}
					}
				}
			}
			
			if ( fileImportTrackingIddList_To_Delete_Directories != null ) {
				
				//  Sort in ascending order
				
				Collections.sort( fileImportTrackingIddList_To_Delete_Directories );

				//  Delete last 2 entries if exist
				if ( fileImportTrackingIddList_To_Delete_Directories.size() >= 2 ) {
					fileImportTrackingIddList_To_Delete_Directories.remove( fileImportTrackingIddList_To_Delete_Directories.size() - 1 );
				}
				if ( fileImportTrackingIddList_To_Delete_Directories.size() >= 1 ) {
					fileImportTrackingIddList_To_Delete_Directories.remove( fileImportTrackingIddList_To_Delete_Directories.size() - 1 );
				}

				delete_Directories_For_trackingIdList(fileImportTrackingIddList_To_Delete_Directories);
			}
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
