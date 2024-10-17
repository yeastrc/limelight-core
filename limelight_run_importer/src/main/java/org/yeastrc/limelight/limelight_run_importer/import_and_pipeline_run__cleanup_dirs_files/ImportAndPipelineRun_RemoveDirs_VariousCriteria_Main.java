package org.yeastrc.limelight.limelight_run_importer.import_and_pipeline_run__cleanup_dirs_files;

import java.io.File;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_run_importer.delete_directory_and_contents.DeleteDirectoryAndContents;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.constants.FileImportPipelineRunCommonConstants;

/**
 * Cleanup dirs for Import and Pipeline Run 
 * 
 * remove dirs without DB records
 * remove dirs for Complete or Failed older than 3 days
 * etc
 *
 */
public class ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main {

	private static final Logger log = LoggerFactory.getLogger( ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main.class );

	private static final long TWENTY_FOUR_HOURS__IN_MILLISECONDS = 24 * 60 * 60 * 1000;  // 24 hours
	
	

	/**
	 * private constructor
	 */
	private ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main() { }
	/**
	 * Static singleton instance
	 */
	private static final ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main _instance = new ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main getSingletonInstance() {
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
	public void importFiles_DelayedRemoval_Main(ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory) {
		try {
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
					ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main_Searchers.getSingletonInstance()
					.getAll_TrackingId_For_Status_Success_OR_Fail_LastUpdate_Over_3_DaysAgo(importRunImporterDBConnectionFactory);
			
			delete_Directories_For_trackingIdList(fileImportTrackingIddList_To_Delete_Directories);
		}
		
		if ( keepRunning ) {
			
			  //  Delete All Status INIT_INSERT_PRE_QUEUED OR Started (Started Import) and Table Record Last Updated over 15 days ago
			
			List<Integer> fileImportTrackingIddList_To_Delete_Directories =
					ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main_Searchers.getSingletonInstance()
					.getAll_TrackingId_For_Status_INIT_INSERT_PRE_QUEUED_OR_Started_LastUpdate_Over_15_DaysAgo(importRunImporterDBConnectionFactory);
			
			delete_Directories_For_trackingIdList(fileImportTrackingIddList_To_Delete_Directories);
		}
		
		
		if ( keepRunning ) {
		
			//  Delete SubDirs that are NOT in the Tracking Table
			
			delete_Directories_NOT_IN_trackingIdList(importRunImporterDBConnectionFactory);
		}
		
	}
	
	/**
	 * @param fileImportTrackingIddList_To_Delete_Directories
	 * @throws Exception 
	 */
	private void delete_Directories_For_trackingIdList( List<Integer> fileImportTrackingIddList_To_Delete_Directories ) throws Exception {

		File limelight_XML_Importer_Work_Directory =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		File importerBaseDir = new File( limelight_XML_Importer_Work_Directory, FileImportPipelineRunCommonConstants.IMPORT_AND_PIPELINE_RUN__BASE_DIR );

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
	
	/**
	 * @throws Exception 
	 * 
	 */
	private void delete_Directories_NOT_IN_trackingIdList(ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory) throws Exception {

		long now_Minus_5_Days = System.currentTimeMillis() - ( 5 * TWENTY_FOUR_HOURS__IN_MILLISECONDS );
		
		Set<String> subdirNames_For_All_fileImportTrackingId_List_InTable = new HashSet<>();
		
		{
			List<Integer> fileImportTrackingId_List_ALL_Id_InTable =
					ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main_Searchers.getSingletonInstance()
					.getAll_TrackingId_InTable_List(importRunImporterDBConnectionFactory);

			for ( Integer fileImportTrackingId : fileImportTrackingId_List_ALL_Id_InTable ) {

				String subdirNameForThisTrackingId =
						Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().getDirForImportTrackingId( fileImportTrackingId );

				subdirNames_For_All_fileImportTrackingId_List_InTable.add(subdirNameForThisTrackingId);
			}
		}

		File limelight_XML_Importer_Work_Directory =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		File importerBaseDir = new File( limelight_XML_Importer_Work_Directory, FileImportPipelineRunCommonConstants.IMPORT_AND_PIPELINE_RUN__BASE_DIR );
		
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

	
 }
