package org.yeastrc.limelight.limelight_run_importer.import_and_pipeline_run__cleanup_dirs_files;

import java.io.File;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_run_importer.delete_directory_and_contents.DeleteDirectoryAndContents;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.constants.FileImportPipelineRunCommonConstants;

/**
 * 
 *
 */
public class ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main {

	private static final Logger log = LoggerFactory.getLogger( ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main.class );

	/**
	 * private constructor
	 */
	private ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main() { }
	/**
	 * Static singleton instance
	 */
	private static final ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main _instance = new ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main getSingletonInstance() {
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
	public void importAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main(ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory) {
		try {
			
			//  Main Execution
			
			internal_ProcessMain(importRunImporterDBConnectionFactory);
			
		} catch ( Throwable t) {
			
			log.error( "Error deleting Import and Pipeline Run files after Delay: " , t);
			
			//  Eat Exception
		}
		
	}
	
	/**
	 * @throws Exception 
	 * 
	 */
	private void internal_ProcessMain(ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory) throws Exception {
		
		{  //  Delete All Status Success Except Last 2
			
			List<Integer> fileImportTrackingIddList_To_Delete_Directories =
					ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers.getSingletonInstance()
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

		if ( keepRunning ) {  //  Delete All Status Fail Except Last 2
			
			List<Integer> fileImportTrackingIddList_To_Delete_Directories =
					ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers.getSingletonInstance()
					.getAll_TrackingId_For_Status( FileImportStatus.FAILED, importRunImporterDBConnectionFactory);

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
	
	
 }
