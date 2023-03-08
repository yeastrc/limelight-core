/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_run_importer.process_submitted_import_or_pipeline_run;


import java.io.File;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.shutdown_requested_detection.Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.constants.RunImporterToImporterParameterNamesConstants;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.import_and_pipeline_run.database_update_with_transaction_services.Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction;
import org.yeastrc.limelight.limelight_run_importer.config.ImporterRunnerConfigData;
import org.yeastrc.limelight.limelight_run_importer.constants.RunImporterCommandConstants;
import org.yeastrc.limelight.limelight_run_importer.delete_directory_and_contents.DeleteDirectoryAndContents;
import org.yeastrc.limelight.limelight_run_importer.exceptions.LimelightRunImporterInternalException;
import org.yeastrc.limelight.limelight_run_importer.import_and_pipeline_run__cleanup_dirs_files.ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main;
import org.yeastrc.limelight.limelight_run_importer.on_import_finish.On_ImportOrRunPipeline_Finish_CallWebService;
import org.yeastrc.limelight.limelight_run_importer.run_system_command.RunSystemCommand;
import org.yeastrc.limelight.limelight_run_importer.run_system_command.RunSystemCommandResponse;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsValuesSharedConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.constants.FileImportPipelineRunCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dao.FileImportAndPipelineRunTracking_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.enum_classes.FileImportAndPipelineRun_RequestType;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.enum_classes.FileImportAndPipelineRun_SubStatus;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.objects.FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair;


/**
 * 
 *
 */
public class ProcessSubmittedImportOrPipelineRun {

	private static final Logger log = LoggerFactory.getLogger( ProcessSubmittedImportOrPipelineRun.class );
	
	private static final String ERROR_MSG_SYSTEM_ERROR = "System Error";
	
	private static final int RETRY_DELAY_INITIAL = 1;
	private static final int RETRY_DELAY_EXTENDED_1 = 20;
	private static final int RETRY_DELAY_EXTENDED_2 = 90;
	private static final int RETRY_COUNT_SWITCH_TO_EXTENDED_1 = 5;
	private static final int RETRY_COUNT_SWITCH_TO_EXTENDED_2 = 10;
	
	//  private constructor
	private ProcessSubmittedImportOrPipelineRun() { }
	/**
	 * @return newly created instance
	 */
	public static ProcessSubmittedImportOrPipelineRun getInstance() { 
		return new ProcessSubmittedImportOrPipelineRun(); 
	}
	
	private volatile boolean shutdownRequested = false;
	private volatile RunSystemCommand runSystemCommand;
	
	private volatile ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main importAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main;
	
	/**
	 * awaken thread to allow shutdown
	 */
	public void awaken() {
		log.error( "awaken() called.");
		synchronized (this) {
			notify();
		}
	}
	

	/**
	 * Called on a separate thread when a shutdown request comes from the operating system.
	 * If this is not heeded, the process may be killed by the operating system after some time has passed ( controlled by the operating system )
	 */
	public void shutdown() {
		log.error( "shutdown() called. Calling runSystemCommand.shutdown() then calling awaken()");
		shutdownRequested = true;
		try {
			if ( runSystemCommand != null ) {
				runSystemCommand.shutdown();
			}
		} catch ( NullPointerException e ) {
			//  Eat the NullPointerException since that meant that nothing had to be done.
		}
		
		try {
			if ( importAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main != null ) {
				importAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main.shutdown();
			}
			
		} catch ( Throwable t ) {
			
		}
		
		log.error( "shutdown() called. Called runSystemCommand.shutdown() Now calling awaken()");
		awaken();
	}
	
	/**
	 * @param FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPairfileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair
	 * @throws Exception 
	 */
	public void processSubmittedImportOrPipelineRun( FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPairfileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair ) throws Exception {
		
		try {
			Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().importerIsRunning_Start();
			
			processSubmittedImport__MainInternal(FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPairfileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair);


			if ( ! shutdownRequested ) {  
				
				//  Delete All Status Success Except Last 2, All Status Failed Except Last 2
				
				//  Should be at most 1 delete here since this is also called from a background thread on startup and every 24 hours after that
				
				try {
					ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory = ImportRunImporterDBConnectionFactory.getMainSingletonInstance();
							
					importAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main = ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main.getSingletonInstance();
					
					importAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main.importAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main(importRunImporterDBConnectionFactory);
					
				} catch ( Throwable t ) {
					
					log.error( "Failed to call importAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main.importAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main(importRunImporterDBConnectionFactory);", t);
					
				} finally {
					importAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main = null;
				}
			}
			
		} finally {
			
			Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().importerIsRunning_End();
		}
	}
	
	/**
	 * @param FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPairfileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair
	 * @throws Exception
	 */
	private void processSubmittedImport__MainInternal( FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPairfileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair ) throws Exception {
		
		FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO = FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPairfileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingDTO();
		if ( log.isInfoEnabled() ) {
			log.info( "Processing Import or Pipeline Run for tracking id: " + fileImportAndPipelineRunTrackingDTO.getId() );
		}
		FileImportAndPipelineRunTrackingRunDTO fileImportAndPipelineRunTrackingRunDTO = FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPairfileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO();
		
		
		File limelight_XML_Importer_Work_Directory =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		File importerBaseDir = new File( limelight_XML_Importer_Work_Directory, FileImportPipelineRunCommonConstants.IMPORT_AND_PIPELINE_RUN__BASE_DIR );
		String subdirNameForThisTrackingId =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().getDirForImportTrackingId( fileImportAndPipelineRunTrackingDTO.getId() );
		File subdirForThisTrackingId = new File( importerBaseDir, subdirNameForThisTrackingId );
		if ( ! subdirForThisTrackingId.exists() ) {
			String msg = "Processing Import or Pipeline Run: subdirForThisTrackingId does not exist: " + subdirForThisTrackingId.getCanonicalPath();
			log.error( msg );
			
			markImportTrackingAsFailed( 
					null /* errorText (use default in variable ERROR_MSG_SYSTEM_ERROR ) */, 
					fileImportAndPipelineRunTrackingDTO, fileImportAndPipelineRunTrackingRunDTO, FileImportAndPipelineRun_SubStatus.SYSTEM_ERROR );
			
			throw new LimelightRunImporterInternalException(msg);
		}
		
		String importJarWithPath = null;
		
		if ( fileImportAndPipelineRunTrackingDTO.getRequestType() == FileImportAndPipelineRun_RequestType.FEATURE_DETECTION_HARDKLOR_BULLSEYE_IMPORT 
				|| fileImportAndPipelineRunTrackingDTO.getRequestType() == FileImportAndPipelineRun_RequestType.FEATURE_DETECTION_HARDKLOR_BULLSEYE_RUN_AND_IMPORT ) {
		
			importJarWithPath = ImporterRunnerConfigData.getFeatureDetectionImporterAndPipelineRun_JarWithPath();
		} else {
			String errorMsg = "Processing Import or Pipeline Run: Unexpected request type (fileImportAndPipelineRunTrackingDTO.getRequestType()): "
					+ fileImportAndPipelineRunTrackingDTO.getRequestType();
			log.error( errorMsg ) ;
			
			markImportTrackingAsFailed( 
					null /* errorText (use default in variable ERROR_MSG_SYSTEM_ERROR ) */, 
					fileImportAndPipelineRunTrackingDTO, fileImportAndPipelineRunTrackingRunDTO, FileImportAndPipelineRun_SubStatus.SYSTEM_ERROR);
			
			throw new LimelightRunImporterInternalException(errorMsg);
		}
		
		//  Expecting absolute path
		File importJarWithPathFileAloneObj = new File( importJarWithPath );
		File importJarWithPathFileRelativeToTrackingDirObj = new File( subdirForThisTrackingId, importJarWithPath );
		if ( ( ! importJarWithPathFileAloneObj.exists() ) 
				&& ( ! importJarWithPathFileRelativeToTrackingDirObj.exists() ) ) {
			String errorMsg = "Processing Import or Pipeline Run: Jar with Path is not found, "
					+ "using the subdirectory that the command will be run in as the starting point."
					+ " Import Jar with Path in config file: "
					+ importJarWithPath;
			log.error( errorMsg ) ;
			
			markImportTrackingAsFailed( 
					null /* errorText (use default in variable ERROR_MSG_SYSTEM_ERROR ) */, 
					fileImportAndPipelineRunTrackingDTO, fileImportAndPipelineRunTrackingRunDTO, FileImportAndPipelineRun_SubStatus.SYSTEM_ERROR);
			
			throw new LimelightRunImporterInternalException(errorMsg);
		}
		
		String javaCommand = "java";
		if ( StringUtils.isNotEmpty( ImporterRunnerConfigData.getJavaExecutableWithPath() ) ) {
			javaCommand = ImporterRunnerConfigData.getJavaExecutableWithPath();
		}
		
		List<String> commandAndItsArgumentsAsList = new ArrayList<>( 20 );
		commandAndItsArgumentsAsList.add( javaCommand );
		
		if ( ImporterRunnerConfigData.getFeatureDetectionProgram_JavaExecutableParameters() != null && ( ! ImporterRunnerConfigData.getFeatureDetectionProgram_JavaExecutableParameters().isEmpty() ) ) {
			for ( String javaExecutableParameter : ImporterRunnerConfigData.getFeatureDetectionProgram_JavaExecutableParameters() ) {
				commandAndItsArgumentsAsList.add( javaExecutableParameter );
			}
		} else if ( ImporterRunnerConfigData.getJavaExecutableParameters() != null && ( ! ImporterRunnerConfigData.getJavaExecutableParameters().isEmpty() ) ) {
			for ( String javaExecutableParameter : ImporterRunnerConfigData.getJavaExecutableParameters() ) {
				commandAndItsArgumentsAsList.add( javaExecutableParameter );
			}
		}
		
		commandAndItsArgumentsAsList.add(  "-jar" );
		commandAndItsArgumentsAsList.add( importJarWithPath );
//		commandAndItsArgumentsAsList.add(  "--debug" );  //  TODO  TEMP
		commandAndItsArgumentsAsList.add( 
				"--" + RunImporterToImporterParameterNamesConstants.RUN_IMPORTER_PARAMS_RUN_ID 
				+ "=" + fileImportAndPipelineRunTrackingRunDTO.getId() );
		
	
		if ( fileImportAndPipelineRunTrackingDTO.getRequestType() == FileImportAndPipelineRun_RequestType.FEATURE_DETECTION_HARDKLOR_BULLSEYE_IMPORT 
				|| fileImportAndPipelineRunTrackingDTO.getRequestType() == FileImportAndPipelineRun_RequestType.FEATURE_DETECTION_HARDKLOR_BULLSEYE_RUN_AND_IMPORT ) {
		
			if ( ImporterRunnerConfigData.getFeatureDetectionImporterAndPipelineRun_DbConfigWithPath() != null ) {
				commandAndItsArgumentsAsList.add( "-c" );
				commandAndItsArgumentsAsList.add( ImporterRunnerConfigData.getFeatureDetectionImporterAndPipelineRun_DbConfigWithPath() );
			}

			importJarWithPath = ImporterRunnerConfigData.getFeatureDetectionImporterAndPipelineRun_JarWithPath();
		} else {
			String errorMsg = "Unexpected request type (fileImportAndPipelineRunTrackingDTO.getRequestType()): "
					+ fileImportAndPipelineRunTrackingDTO.getRequestType();
			log.error( errorMsg ) ;
			
			markImportTrackingAsFailed( 
					null /* errorText (use default in variable ERROR_MSG_SYSTEM_ERROR ) */, 
					fileImportAndPipelineRunTrackingDTO, fileImportAndPipelineRunTrackingRunDTO, FileImportAndPipelineRun_SubStatus.SYSTEM_ERROR);
			
			throw new LimelightRunImporterInternalException(errorMsg);
		}
		
		
		
		String filenameToWriteSysoutTo = 
				RunImporterCommandConstants.RUN_IMPORTER_COMMAND_SYSOUT_WRITTEN_TO_FILENAME_PREFIX
				+ fileImportAndPipelineRunTrackingRunDTO.getId() // Include run id as part of filename
				+ RunImporterCommandConstants.RUN_IMPORTER_COMMAND_SYSOUT_WRITTEN_TO_FILENAME_SUFFFIX;
		String filenameToWriteSyserrTo = 
				RunImporterCommandConstants.RUN_IMPORTER_COMMAND_SYSERR_WRITTEN_TO_FILENAME_PREFIX
				+ fileImportAndPipelineRunTrackingRunDTO.getId() // Include run id as part of filename
				+ RunImporterCommandConstants.RUN_IMPORTER_COMMAND_SYSERR_WRITTEN_TO_FILENAME_SUFFFIX;
		File fileToWriteSysoutTo = new File( subdirForThisTrackingId, filenameToWriteSysoutTo );
		File fileToWriteSyserrTo = new File( subdirForThisTrackingId, filenameToWriteSyserrTo );
		
		runSystemCommand = RunSystemCommand.getInstance();
		try {
			
			log.warn( "ProcessSubmittedImportOrPipelineRun: BEFORE:  Calling: runSystemCommand.runCmd(...) ");
			
			RunSystemCommandResponse runSystemCommandResponse = 
					runSystemCommand.runCmd( 
							commandAndItsArgumentsAsList, 
							subdirForThisTrackingId /* dirToRunCommandIn*/, 
							fileToWriteSysoutTo /* fileToWriteSysoutTo*/,
							fileToWriteSyserrTo /* fileToWriteSyserrTo*/,
							false /* throwExceptionOnCommandFailure */ );
			
			
			//  Execution stops here when the executable is killed.  This may be a daemon thread
			
			//      The executable will be killed when running in Docker so it must be handled.
			
			log.warn( "ProcessSubmittedImportOrPipelineRun: AFTER:  Calling: runSystemCommand.runCmd(...) ");
			
			if ( runSystemCommandResponse.isShutdownRequested() ) {
				log.warn( "command was aborted for run importer and pipeline run program shutdown: " + commandAndItsArgumentsAsList
						+ ", subdirForThisTrackingId:  " + subdirForThisTrackingId.getCanonicalPath() );
				 fileImportAndPipelineRunTrackingRunDTO.setStatus( FileImportStatus.RE_QUEUED );
				 
				 Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction.getInstance()
				 .updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
						 FileImportStatus.RE_QUEUED, 
						 fileImportAndPipelineRunTrackingDTO.getId(), 
						 fileImportAndPipelineRunTrackingRunDTO );
				 
			} else {
				if ( ! runSystemCommandResponse.isCommandSuccessful() ) {
					log.error( "command failed: exit code: "
							+ runSystemCommandResponse.getCommandExitCode()
							+ ", command: "
							+ commandAndItsArgumentsAsList
							+ ", subdirForThisTrackingId:  " + subdirForThisTrackingId.getCanonicalPath() );
				}
				
				//  If importer did not update the status in DB, set to failed
				FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO_AfterImporterRun =
						FileImportAndPipelineRunTracking_Shared_Get_DAO.getInstance()
						.getItem( fileImportAndPipelineRunTrackingDTO.getId() );
				
				if ( fileImportAndPipelineRunTrackingDTO_AfterImporterRun.getStatus()
						== FileImportStatus.STARTED ) {
					//  Status left as started so change to failed
					log.error( "command failed: exit code: "
							+ runSystemCommandResponse.getCommandExitCode()
							+ ", importer left status as 'started' so changing to 'failed' "
							+ ", command: "
							+ commandAndItsArgumentsAsList
							+ ", subdirForThisTrackingId:  " + subdirForThisTrackingId.getCanonicalPath() );
					
					markImportTrackingAsFailed( 
							null /* errorText (use default in variable ERROR_MSG_SYSTEM_ERROR ) */, 
							fileImportAndPipelineRunTrackingDTO_AfterImporterRun, fileImportAndPipelineRunTrackingRunDTO, FileImportAndPipelineRun_SubStatus.SYSTEM_ERROR );
				}				
			}
		} catch (Throwable e) {
			log.error( "command failed: " + commandAndItsArgumentsAsList
					+ ", subdirForThisTrackingId:  " + subdirForThisTrackingId.getCanonicalPath() );

			markImportTrackingAsFailed( 
					null /* errorText (use default in variable ERROR_MSG_SYSTEM_ERROR ) */, 
					fileImportAndPipelineRunTrackingDTO, fileImportAndPipelineRunTrackingRunDTO, FileImportAndPipelineRun_SubStatus.SYSTEM_ERROR );

			fileImportAndPipelineRunTrackingRunDTO.setStatus( FileImportStatus.FAILED );
			fileImportAndPipelineRunTrackingRunDTO.setFinished_fail_end_user_display_message( ERROR_MSG_SYSTEM_ERROR );
			Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction.getInstance()
			.updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
					FileImportStatus.FAILED, 
					fileImportAndPipelineRunTrackingDTO.getId(), 
					fileImportAndPipelineRunTrackingRunDTO );
			throw new Exception( e );
		} finally {

			runSystemCommand = null;
			
			int retryCount = 0;
			int nextTryInMinutes = 0;
			
			boolean callServerCompleted = false;

			{
				retryCount = 0;
				nextTryInMinutes = 0;

				while ( ! callServerCompleted && ! shutdownRequested ) {

					try {
						On_ImportOrRunPipeline_Finish_CallWebService.getInstance()
						.callLimelightWebServiceOnSingle_ImportOrRunPipeline_Finish( 
								fileImportAndPipelineRunTrackingDTO.getId(), 
								fileImportAndPipelineRunTrackingRunDTO.getId() );

						callServerCompleted = true;
					} catch ( Exception e ) {

						retryCount++;

						if ( retryCount > RETRY_COUNT_SWITCH_TO_EXTENDED_2 ) {

							String msg = "Failed to call Limelight Web app for Failed status for tracking id: " + fileImportAndPipelineRunTrackingDTO.getId()
							+ ", run id: " + fileImportAndPipelineRunTrackingRunDTO.getId()
							+ ".  Retry count exceeded so no more retries will be attempted."
							+ "  Error Msg: " + e.toString();
							log.error( msg, e );
							throw new LimelightRunImporterInternalException(msg);

						} else if ( retryCount > RETRY_COUNT_SWITCH_TO_EXTENDED_1 ) {
							nextTryInMinutes +=  RETRY_DELAY_EXTENDED_1;
						} else {
							nextTryInMinutes +=  RETRY_DELAY_INITIAL;
						}
						String msg = "Failed to call Limelight Web app for Failed status for tracking id: " + fileImportAndPipelineRunTrackingDTO.getId()
						+ ", run id: " + fileImportAndPipelineRunTrackingRunDTO.getId()
						+ ".  Will retry to update again in " + nextTryInMinutes + " minute(s)."
						+ "  Error Msg: " + e.toString();
						log.error( msg, e );

						int waitTimeInSeconds = nextTryInMinutes * 60;
						synchronized (this) {
							try {
								wait( ( (long) waitTimeInSeconds ) * 1000 ); //  wait for notify() call or timeout, in milliseconds
							} catch (InterruptedException ie) {
								log.info("waitForSleepTime():  wait() interrupted with InterruptedException");
							}
						}
					}
				}
			}
		}
				
		deleteUploadedFilesIfConfiguredAndStatusSuccess( fileImportAndPipelineRunTrackingDTO, subdirForThisTrackingId );
	}
	
	/**
	 * @param fileImportAndPipelineRunTrackingDTO
	 * @param fileImportAndPipelineRunTrackingRunDTO
	 * @throws Exception
	 */
	public void markImportTrackingAsFailed(
			String errorText,  //  use ERROR_MSG_SYSTEM_ERROR if null
			FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO,
			FileImportAndPipelineRunTrackingRunDTO fileImportAndPipelineRunTrackingRunDTO,
			FileImportAndPipelineRun_SubStatus fileImportAndPipelineRun_SubStatus ) throws Exception {
		
		String errorText_Local = errorText;
		
		if ( errorText_Local == null ) {
			errorText_Local = ERROR_MSG_SYSTEM_ERROR;
		}
		
		fileImportAndPipelineRunTrackingRunDTO.setStatus( FileImportStatus.FAILED );
		fileImportAndPipelineRunTrackingRunDTO.setSubStatus( fileImportAndPipelineRun_SubStatus );
		fileImportAndPipelineRunTrackingRunDTO.setFinished_fail_end_user_display_message( errorText_Local );
		
		boolean updatedDBCompleted = false;
		int retryCount = 0;
		int nextTryInMinutes = 0;
		
		while ( ! updatedDBCompleted && ! shutdownRequested ) {
		
			try {
				Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction.getInstance()
				.updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
						FileImportStatus.FAILED, 
						fileImportAndPipelineRunTrackingDTO.getId(), 
						fileImportAndPipelineRunTrackingRunDTO );
				updatedDBCompleted = true;
				
			} catch ( Exception e ) {
				
				retryCount++;

				if ( retryCount > RETRY_COUNT_SWITCH_TO_EXTENDED_2 ) {
					nextTryInMinutes +=  RETRY_DELAY_EXTENDED_2;
				} else if ( retryCount > RETRY_COUNT_SWITCH_TO_EXTENDED_1 ) {
					nextTryInMinutes +=  RETRY_DELAY_EXTENDED_1;
				} else {
					nextTryInMinutes +=  RETRY_DELAY_INITIAL;
				}
				
				String msg = "Failed to update Import Tracking status to Failed for tracking id: " + fileImportAndPipelineRunTrackingDTO.getId()
					+ ", run id: " + fileImportAndPipelineRunTrackingRunDTO.getId()
					+ ".  Will retry to update again in " + nextTryInMinutes + " minute(s).";
				log.error( msg );
				
				int waitTimeInSeconds = nextTryInMinutes * 60;
				synchronized (this) {
					try {
						wait( ( (long) waitTimeInSeconds ) * 1000 ); //  wait for notify() call or timeout, in milliseconds
					} catch (InterruptedException ie) {
						log.info("waitForSleepTime():  wait() interrupted with InterruptedException");
					}
				}

			}
		}
		

		if ( ! updatedDBCompleted && shutdownRequested ) {
			
			String msg = "Shutdown requested.  Update DB For Fail of import was not completed. tracking id: " + fileImportAndPipelineRunTrackingDTO.getId()
					+ ", run id: " + fileImportAndPipelineRunTrackingRunDTO.getId()
					+ ". ";
			log.error( msg );
			throw new LimelightRunImporterInternalException(msg);
		}
		
		boolean callServerCompleted = false;

		{
			retryCount = 0;
			nextTryInMinutes = 0;

			while ( ! callServerCompleted && ! shutdownRequested ) {

				try {
					On_ImportOrRunPipeline_Finish_CallWebService.getInstance()
					.callLimelightWebServiceOnSingle_ImportOrRunPipeline_Finish( 
							fileImportAndPipelineRunTrackingDTO.getId(), 
							fileImportAndPipelineRunTrackingRunDTO.getId() );

					callServerCompleted = true;
				} catch ( Exception e ) {

					retryCount++;

					if ( retryCount > RETRY_COUNT_SWITCH_TO_EXTENDED_2 ) {

						String msg = "Failed to call Limelight Web app for Failed status for tracking id: " + fileImportAndPipelineRunTrackingDTO.getId()
						+ ", run id: " + fileImportAndPipelineRunTrackingRunDTO.getId()
						+ ".  Retry count exceeded so no more retries will be attempted."
						+ "  Error Msg: " + e.toString();
						log.error( msg, e );
						throw new LimelightRunImporterInternalException(msg);

					} else if ( retryCount > RETRY_COUNT_SWITCH_TO_EXTENDED_1 ) {
						nextTryInMinutes +=  RETRY_DELAY_EXTENDED_1;
					} else {
						nextTryInMinutes +=  RETRY_DELAY_INITIAL;
					}
					String msg = "Failed to call Limelight Web app for Failed status for tracking id: " + fileImportAndPipelineRunTrackingDTO.getId()
					+ ", run id: " + fileImportAndPipelineRunTrackingRunDTO.getId()
					+ ".  Will retry to update again in " + nextTryInMinutes + " minute(s)."
					+ "  Error Msg: " + e.toString();
					log.error( msg, e );

					int waitTimeInSeconds = nextTryInMinutes * 60;
					synchronized (this) {
						try {
							wait( ( (long) waitTimeInSeconds ) * 1000 ); //  wait for notify() call or timeout, in milliseconds
						} catch (InterruptedException ie) {
							log.info("waitForSleepTime():  wait() interrupted with InterruptedException");
						}
					}
				}
			}
		}
		if ( ! callServerCompleted && shutdownRequested ) {
			
			String msg = "Shutdown requested.  Call to Limelight Web app For Fail of import was not completed. tracking id: " + fileImportAndPipelineRunTrackingDTO.getId()
					+ ", run id: " + fileImportAndPipelineRunTrackingRunDTO.getId()
					+ ". ";
			log.error( msg );
			throw new LimelightRunImporterInternalException(msg);
		}
	}
	
	/**
	 * @param fileImportAndPipelineRunTrackingDTO
	 * @throws Exception
	 */
	private void deleteUploadedFilesIfConfiguredAndStatusSuccess( FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO, File subdirForThisTrackingId ) throws Exception {
		
		int trackingId = fileImportAndPipelineRunTrackingDTO.getId();
		//  Get current record for FileImportAndPipelineRunTrackingDTO since the importer pgm may have updated it.
		FileImportAndPipelineRunTrackingDTO currentTrackingDTO = FileImportAndPipelineRunTracking_Shared_Get_DAO.getInstance().getItem( trackingId );
		if ( currentTrackingDTO.getStatus() != FileImportStatus.COMPLETE ) {
			//  Status is not COMPLETE so NO DELETION
			return;  //  EARLY EXIT
		}
		// Get configuration item
		try {
			String deleteFilesConfigValue =
					ConfigSystemTableGetValueCommon.getInstance()
					.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.IMPORT_DELETE_UPLOADED_FILES );
			if ( ! ConfigSystemsValuesSharedConstants.TRUE.equals( deleteFilesConfigValue ) ) {
				//  Config value in table is not true string.
				return;  //  EARLY EXIT
			}
		} catch ( IllegalStateException e ) {
			//  Config key not in table.  Assume don't want files deleted
			return;  //  EARLY EXIT
		}
		DeleteDirectoryAndContents.getInstance().deleteDirectoryAndContents( subdirForThisTrackingId );
	}

}
