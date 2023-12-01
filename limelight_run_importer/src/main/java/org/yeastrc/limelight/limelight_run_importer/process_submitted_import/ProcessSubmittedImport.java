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
package org.yeastrc.limelight.limelight_run_importer.process_submitted_import;


import java.io.File;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.shutdown_requested_detection.Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.constants.RunImporterToImporterParameterNamesConstants;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.file_import_limelight_xml_scans.dao.FileImportTrackingRun_Importer_RunImporter_DAO;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.file_import_limelight_xml_scans.database_update_with_transaction_services.UpdateTrackingTrackingRunRecordsDBTransaction;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.file_import_limelight_xml_scans.objects.TrackingDTOTrackingRunDTOPair;
import org.yeastrc.limelight.limelight_run_importer.config.ImporterRunnerConfigData;
import org.yeastrc.limelight.limelight_run_importer.constants.RunImporterCommandConstants;
import org.yeastrc.limelight.limelight_run_importer.delete_directory_and_contents.DeleteDirectoryAndContents;
import org.yeastrc.limelight.limelight_run_importer.exceptions.LimelightRunImporterInternalException;
import org.yeastrc.limelight.limelight_run_importer.import_files__delete_s3_objects_for_db_single_file_records.ImportFiles_Delete_S3Objects_For_DB_SingleFile_Records;
import org.yeastrc.limelight.limelight_run_importer.import_files_remove_success_failed_except_last_2_main_and_searcher.ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main;
import org.yeastrc.limelight.limelight_run_importer.on_import_finish.On_ImportLimelightXMLScanFile_Finish_CallWebService;
import org.yeastrc.limelight.limelight_run_importer.run_system_command.RunSystemCommand;
import org.yeastrc.limelight.limelight_run_importer.run_system_command.RunSystemCommandResponse;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsValuesSharedConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.constants.FileUploadCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dao.FileImportTrackingRun_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dao.FileImportTracking_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportRunSubStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;


/**
 * 
 *
 */
public class ProcessSubmittedImport {

	private static final Logger log = LoggerFactory.getLogger( ProcessSubmittedImport.class );
	
	private static final String ERROR_MSG_SYSTEM_ERROR = "System Error";
	
	private static final int RETRY_DELAY_INITIAL = 1;
	private static final int RETRY_DELAY_EXTENDED_1 = 20;
	private static final int RETRY_DELAY_EXTENDED_2 = 90;
	private static final int RETRY_COUNT_SWITCH_TO_EXTENDED_1 = 5;
	private static final int RETRY_COUNT_SWITCH_TO_EXTENDED_2 = 10;
	
	//  private constructor
	private ProcessSubmittedImport() { }
	/**
	 * @return newly created instance
	 */
	public static ProcessSubmittedImport getInstance() { 
		return new ProcessSubmittedImport(); 
	}
	
	private volatile boolean shutdownRequested = false;
	private volatile RunSystemCommand runSystemCommand;

	private volatile ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main importFiles_Remove_SuccessFailed_ExceptLastTwo_Main;

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
		} catch ( Throwable e ) {
			//  Eat the NullPointerException since that meant that nothing had to be done.
		}

		try {
			if ( importFiles_Remove_SuccessFailed_ExceptLastTwo_Main != null ) {
				importFiles_Remove_SuccessFailed_ExceptLastTwo_Main.shutdown();
			}
			
		} catch ( Throwable t ) {
			
		}
		
		log.error( "shutdown() called. Called runSystemCommand.shutdown() Now calling awaken()");
		awaken();
	}
	
	/**
	 * @param trackingDTOTrackingRunDTOPair
	 * @throws Exception 
	 */
	public void processSubmittedImport( TrackingDTOTrackingRunDTOPair trackingDTOTrackingRunDTOPair ) throws Exception {
		
		try {
			Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().importerIsRunning_Start();
			
			processSubmittedImport__MainInternal(trackingDTOTrackingRunDTOPair);


			if ( ! shutdownRequested ) {  
				
				//  Delete All Status Success Except Last 2, All Status Failed Except Last 2
				
				//  Should be at most 1 delete here since this is also called from a background thread on startup and every 24 hours after that
				
				try {
					ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory = ImportRunImporterDBConnectionFactory.getMainSingletonInstance();
							
					importFiles_Remove_SuccessFailed_ExceptLastTwo_Main = ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main.getSingletonInstance();
					
					importFiles_Remove_SuccessFailed_ExceptLastTwo_Main.importFiles_Remove_SuccessFailed_ExceptLastTwo_Main(importRunImporterDBConnectionFactory);
					
				} catch ( Throwable t ) {
					
					log.error( "Failed to call importFiles_Remove_SuccessFailed_ExceptLastTwo_Main.importFiles_Remove_SuccessFailed_ExceptLastTwo_Main(importRunImporterDBConnectionFactory);", t);
					
				} finally {
					importFiles_Remove_SuccessFailed_ExceptLastTwo_Main = null;
				}
			}
			
		} finally {
			
			Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().importerIsRunning_End();
		}
		
		
	}
	
	/**
	 * @param trackingDTOTrackingRunDTOPair
	 * @throws Exception
	 */
	private void processSubmittedImport__MainInternal( TrackingDTOTrackingRunDTOPair trackingDTOTrackingRunDTOPair ) throws Exception {
		
		FileImportTrackingDTO fileImportTrackingDTO = trackingDTOTrackingRunDTOPair.getFileImportTrackingDTO();
		if ( log.isInfoEnabled() ) {
			log.info( "Processing import for tracking id: " + fileImportTrackingDTO.getId() );
		}
		FileImportTrackingRunDTO fileImportTrackingRunDTO = trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO();
		
		
		File limelight_XML_Importer_Work_Directory =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		File importerBaseDir = new File( limelight_XML_Importer_Work_Directory, FileUploadCommonConstants.IMPORT_BASE_DIR );
		String subdirNameForThisTrackingId =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().getDirForImportTrackingId( fileImportTrackingDTO.getId() );
		File subdirForThisTrackingId = new File( importerBaseDir, subdirNameForThisTrackingId );
		if ( ! subdirForThisTrackingId.exists() ) {
			String msg = "subdirForThisTrackingId does not exist: " + subdirForThisTrackingId.getCanonicalPath();
			log.error( msg );
			
			markImportTrackingAsFailed( 
					null /* errorText (use default in variable ERROR_MSG_SYSTEM_ERROR ) */, 
					fileImportTrackingDTO, fileImportTrackingRunDTO, FileImportRunSubStatus.SYSTEM_ERROR );
			
			throw new LimelightRunImporterInternalException(msg);
		}
		final String importJarWithPath = ImporterRunnerConfigData.getImporterJarWithPath();
		//  Expecting absolute path
		File importJarWithPathFileAloneObj = new File( importJarWithPath );
		File importJarWithPathFileRelativeToTrackingDirObj = new File( subdirForThisTrackingId, importJarWithPath );
		if ( ( ! importJarWithPathFileAloneObj.exists() ) 
				&& ( ! importJarWithPathFileRelativeToTrackingDirObj.exists() ) ) {
			String errorMsg = "Import Jar with Path is not found, "
					+ "using the subdirectory that the command will be run in as the starting point."
					+ " Import Jar with Path in config file: "
					+ importJarWithPath;
			log.error( errorMsg ) ;
			
			markImportTrackingAsFailed( 
					null /* errorText (use default in variable ERROR_MSG_SYSTEM_ERROR ) */, 
					fileImportTrackingDTO, fileImportTrackingRunDTO, FileImportRunSubStatus.SYSTEM_ERROR);
			
			throw new LimelightRunImporterInternalException(errorMsg);
		}
		//   Create a params file that is passed to the importer
//		String runImporterParamsFilename = 
//				RunImporterToImporterFilenameConstants.RUN_IMPORTER_TO_IMPORTER_FILENAME_PREFIX
//				+ fileImportTrackingRunDTO.getId() // Include run id as part of filename
//				+ RunImporterToImporterFilenameConstants.RUN_IMPORTER_TO_IMPORTER_FILENAME_SUFFFIX;
//		String importerOutputDataErrorsFilename = 
//				RunImporterToImporterFilenameConstants.IMPORTER_OUTPUT_DATA_ERRORS_FILENAME_PREFIX
//				+ fileImportTrackingRunDTO.getId() // Include run id as part of filename
//				+ RunImporterToImporterFilenameConstants.IMPORTER_OUTPUT_DATA_ERRORS_FILENAME_SUFFFIX;
//		
//		RunImporterToImporterFileRoot runImporterToImporterFileRoot = new RunImporterToImporterFileRoot();
//		runImporterToImporterFileRoot.setImportTrackingRunId( fileImportTrackingRunDTO.getId() );
//		runImporterToImporterFileRoot.setProjectId( fileImportTrackingDTO.getProjectId() );
//		runImporterToImporterFileRoot.setOutputDataErrorsFileName( importerOutputDataErrorsFilename );
////		runImporterToImporterFileRoot.setSystemInStringForShutdown( StringSendImporterToRequestShutdownConstants.SHUTDOWN );
//		runImporterToImporterFileRoot.setSkipPopulatingPathOnSearch( true );
//		//  Marshal (write) the object to the file
//		JAXBContext jaxbContext = JAXBContext.newInstance( RunImporterToImporterFileRoot.class );
//		Marshaller marshaller = jaxbContext.createMarshaller();
//		marshaller.setProperty( Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE );
//		File runImporterParamsFile = new File( subdirForThisTrackingId, runImporterParamsFilename );
//		OutputStream outputStream = null;
//		try {
//			outputStream = new FileOutputStream( runImporterParamsFile );
//			marshaller.marshal( runImporterToImporterFileRoot, outputStream );
//		} catch ( Exception e ) {
//			throw e;
//		} finally {
//			if ( outputStream != null ) {
//				outputStream.close();
//			}
//		}
		
		String javaCommand = "java";
		if ( StringUtils.isNotEmpty( ImporterRunnerConfigData.getJavaExecutableWithPath() ) ) {
			javaCommand = ImporterRunnerConfigData.getJavaExecutableWithPath();
		}
		
		List<String> commandAndItsArgumentsAsList = new ArrayList<>( 20 );
		commandAndItsArgumentsAsList.add( javaCommand );
		
		if ( ImporterRunnerConfigData.getJavaExecutableParameters() != null && ( ! ImporterRunnerConfigData.getJavaExecutableParameters().isEmpty() ) ) {
			for ( String javaExecutableParameter : ImporterRunnerConfigData.getJavaExecutableParameters() ) {
				commandAndItsArgumentsAsList.add( javaExecutableParameter );
			}
		}
		
		commandAndItsArgumentsAsList.add(  "-jar" );
		commandAndItsArgumentsAsList.add( importJarWithPath );
//		commandAndItsArgumentsAsList.add(  "--debug" );  //  TODO  TEMP
		commandAndItsArgumentsAsList.add( 
				"--" + RunImporterToImporterParameterNamesConstants.RUN_IMPORTER_PARAMS_RUN_ID 
				+ "=" + fileImportTrackingRunDTO.getId() );
		// TODO
//		commandAndItsArgumentsAsList.add( 
//				"--" + RunImporterToImporterParameterNamesConstants.RUN_IMPORTER_PARAMS_CREATE_FILE_ON_SUCCESS_STRING
//				+ "=" + RunImporterToImporterParameterNamesConstants.RUN_IMPORTER_PARAM_VALUE_CREATE_FILE_ON_SUCCESS_STRING );
		
		if ( ImporterRunnerConfigData.getImporterDbConfigWithPath() != null ) {
			commandAndItsArgumentsAsList.add( "-c" );
			commandAndItsArgumentsAsList.add( ImporterRunnerConfigData.getImporterDbConfigWithPath() );
		}
		String filenameToWriteSysoutTo = 
				RunImporterCommandConstants.RUN_IMPORTER_COMMAND_SYSOUT_WRITTEN_TO_FILENAME_PREFIX
				+ fileImportTrackingRunDTO.getId() // Include run id as part of filename
				+ RunImporterCommandConstants.RUN_IMPORTER_COMMAND_SYSOUT_WRITTEN_TO_FILENAME_SUFFFIX;
		String filenameToWriteSyserrTo = 
				RunImporterCommandConstants.RUN_IMPORTER_COMMAND_SYSERR_WRITTEN_TO_FILENAME_PREFIX
				+ fileImportTrackingRunDTO.getId() // Include run id as part of filename
				+ RunImporterCommandConstants.RUN_IMPORTER_COMMAND_SYSERR_WRITTEN_TO_FILENAME_SUFFFIX;
		File fileToWriteSysoutTo = new File( subdirForThisTrackingId, filenameToWriteSysoutTo );
		File fileToWriteSyserrTo = new File( subdirForThisTrackingId, filenameToWriteSyserrTo );
		
		runSystemCommand = RunSystemCommand.getInstance();
		try {
			log.warn( "ProcessSubmittedImport: BEFORE:  Calling: runSystemCommand.runCmd(...) ");
			
			RunSystemCommandResponse runSystemCommandResponse = 
					runSystemCommand.runCmd( 
							commandAndItsArgumentsAsList, 
							subdirForThisTrackingId /* dirToRunCommandIn*/, 
							fileToWriteSysoutTo /* fileToWriteSysoutTo*/,
							fileToWriteSyserrTo /* fileToWriteSyserrTo*/,
							false /* throwExceptionOnCommandFailure */ );

			log.warn( "ProcessSubmittedImport: AFTER:  Calling: runSystemCommand.runCmd(...) ");
			
			if ( runSystemCommandResponse.isShutdownRequested() ) {
				log.warn( "command was aborted for run importer program shutdown: " + commandAndItsArgumentsAsList
						+ ", subdirForThisTrackingId:  " + subdirForThisTrackingId.getCanonicalPath() );
				 fileImportTrackingRunDTO.setRunStatus( FileImportStatus.RE_QUEUED );
				 UpdateTrackingTrackingRunRecordsDBTransaction.getInstance()
				 .updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
						 FileImportStatus.RE_QUEUED, 
						 fileImportTrackingDTO.getId(), 
						 fileImportTrackingRunDTO );
			} else {
				if ( ! runSystemCommandResponse.isCommandSuccessful() ) {
					log.error( "command failed: exit code: "
							+ runSystemCommandResponse.getCommandExitCode()
							+ ", command: "
							+ commandAndItsArgumentsAsList
							+ ", subdirForThisTrackingId:  " + subdirForThisTrackingId.getCanonicalPath() );
				}
				//  If importer did not update the status in DB, set to failed
				FileImportTrackingDTO fileImportTrackingDTO_AfterImporterRun =
						FileImportTracking_Shared_Get_DAO.getInstance()
						.getItem( fileImportTrackingDTO.getId() );
				if ( fileImportTrackingDTO_AfterImporterRun.getStatus()
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
							fileImportTrackingDTO_AfterImporterRun, fileImportTrackingRunDTO, FileImportRunSubStatus.SYSTEM_ERROR );
				}				
			}
		} catch (Throwable e) {
			log.error( "command failed: " + commandAndItsArgumentsAsList
					+ ", subdirForThisTrackingId:  " + subdirForThisTrackingId.getCanonicalPath() );

			markImportTrackingAsFailed( 
					null /* errorText (use default in variable ERROR_MSG_SYSTEM_ERROR ) */, 
					fileImportTrackingDTO, fileImportTrackingRunDTO, FileImportRunSubStatus.SYSTEM_ERROR );

			fileImportTrackingRunDTO.setRunStatus( FileImportStatus.FAILED );
			fileImportTrackingRunDTO.setDataErrorText( ERROR_MSG_SYSTEM_ERROR );
			fileImportTrackingRunDTO.setImportResultText( ERROR_MSG_SYSTEM_ERROR );
			UpdateTrackingTrackingRunRecordsDBTransaction.getInstance()
			.updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
					FileImportStatus.FAILED, 
					fileImportTrackingDTO.getId(), 
					fileImportTrackingRunDTO );
			throw new Exception( e );
		} finally {

			{  //  Clean up Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter, removing entry for searchId
				
				Integer searchId_Inserted = null;

				try {
					searchId_Inserted = FileImportTrackingRun_Importer_RunImporter_DAO.getInstance().getSearchId_ForId(fileImportTrackingRunDTO.getId());

				} catch ( Throwable t ) {
					String msgDelete = "Exception getting Inserted Search Id, Importer Run id: " + fileImportTrackingRunDTO.getId() ;
					log.error( msgDelete, t );

					//  Eat Exception
				}

				if ( searchId_Inserted != null ) {
					try {
						Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.getSingletonInstance().delete_ForSearchId( searchId_Inserted );

					} catch ( Throwable t ) {
						String msgDelete = "Failed to Delete Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter record, search id: " + searchId_Inserted;
						log.error( msgDelete, t );

						//  Eat Exception
					}
				}
			}
			{  //  Clean up Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter, removing entries last updated a while ago
				
				try {
					Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.getSingletonInstance().delete_Entries_LastUpdatedAWhileAgo();
				} catch ( Throwable t ) {
					String msgDelete = "Exception calling: Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.getSingletonInstance().delete_Entries_LastUpdatedAWhileAgo()";
					log.error( msgDelete, t );

					//  Eat Exception
				}
			}
			
			runSystemCommand = null;
			
			int retryCount = 0;
			int nextTryInMinutes = 0;
			
			boolean callServerCompleted = false;

			{
				retryCount = 0;
				nextTryInMinutes = 0;

				while ( ! callServerCompleted && ! shutdownRequested ) {

					try {
						On_ImportLimelightXMLScanFile_Finish_CallWebService.getInstance()
						.callLimelightWebServiceOnSingleImportFinish( 
								fileImportTrackingDTO.getId(), 
								fileImportTrackingRunDTO.getId() );

						callServerCompleted = true;
					} catch ( Exception e ) {

						retryCount++;

						if ( retryCount > RETRY_COUNT_SWITCH_TO_EXTENDED_2 ) {

							String msg = "Failed to call Limelight Web app for Failed status for tracking id: " + fileImportTrackingDTO.getId()
							+ ", run id: " + fileImportTrackingRunDTO.getId()
							+ ".  Retry count exceeded so no more retries will be attempted."
							+ "  Error Msg: " + e.toString();
							log.error( msg, e );
							throw new LimelightRunImporterInternalException(msg);

						} else if ( retryCount > RETRY_COUNT_SWITCH_TO_EXTENDED_1 ) {
							nextTryInMinutes +=  RETRY_DELAY_EXTENDED_1;
						} else {
							nextTryInMinutes +=  RETRY_DELAY_INITIAL;
						}
						String msg = "Failed to call Limelight Web app for Failed status for tracking id: " + fileImportTrackingDTO.getId()
						+ ", run id: " + fileImportTrackingRunDTO.getId()
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
		
		final String commandToRunOnSuccessfulImport = ImporterRunnerConfigData.getCommandToRunOnSuccessfulImport();
		if ( StringUtils.isNotEmpty( commandToRunOnSuccessfulImport ) ) {
			// Run command on successful import is configured, so run it

			//  Get TrackingRunDTO After Importer Run to get inserted search id
			FileImportTrackingRunDTO fileImportTrackingRunDTO_AfterImporterRun = 
					FileImportTrackingRun_Shared_Get_DAO.getInstance()
					.getItem( fileImportTrackingRunDTO.getId() );
			
			if ( FileImportStatus.COMPLETE.equals( fileImportTrackingRunDTO_AfterImporterRun.getRunStatus() ) ) {

				if ( fileImportTrackingRunDTO_AfterImporterRun.getInsertedSearchId() == null ) {
					String msg = "fileImportTrackingRunDTO_AfterImporterRun.getInsertedSearchId() == null "
							+ " for fileImportTrackingRunDTO_AfterImporterRun.getId(): " 
							+ fileImportTrackingRunDTO_AfterImporterRun.getId();
					log.error( msg );
					throw new Exception(msg);
				}
				File dirToWriteSysoutSyserrTo = subdirForThisTrackingId;
				String commandToRunOnSuccessfulImportSyoutSyserrDirString = ImporterRunnerConfigData.getCommandToRunOnSuccessfulImportSyoutSyserrDir();
				if ( StringUtils.isNotEmpty( commandToRunOnSuccessfulImportSyoutSyserrDirString ) ) {
					File commandToRunOnSuccessfulImportSyoutSyserrDir = new File( commandToRunOnSuccessfulImportSyoutSyserrDirString );
					if ( commandToRunOnSuccessfulImportSyoutSyserrDir.exists() ) {
						dirToWriteSysoutSyserrTo = commandToRunOnSuccessfulImportSyoutSyserrDir;
					}
				}

				List<String> commandAndItsArgumentsAsListRunOnSuccess = new ArrayList<>( 20 );
				commandAndItsArgumentsAsListRunOnSuccess.add( commandToRunOnSuccessfulImport );
				commandAndItsArgumentsAsListRunOnSuccess.add( 
						Integer.toString( fileImportTrackingRunDTO_AfterImporterRun.getInsertedSearchId() ) );

				File fileToWriteSysoutToRunOnSuccess = new File( dirToWriteSysoutSyserrTo, "commandRunOnSuccessSysout.txt" );
				File fileToWriteSyserrToRunOnSuccess = new File( dirToWriteSysoutSyserrTo, "commandRunOnSuccessSyserr.txt" );

				RunSystemCommand runSystemCommand = RunSystemCommand.getInstance();
				try {
					//  Ignore run command result.  Test for success by checking the database for what the importer updated (or not)
//					RunSystemCommandResponse runSystemCommandResponse = 
					runSystemCommand.runCmd( 
							commandAndItsArgumentsAsListRunOnSuccess, 
							subdirForThisTrackingId /* dirToRunCommandIn*/, 
							fileToWriteSysoutToRunOnSuccess /* fileToWriteSysoutTo*/,
							fileToWriteSyserrToRunOnSuccess /* fileToWriteSyserrTo*/,
							false /* throwExceptionOnCommandFailure */ );

				} catch ( Throwable e ) {

					log.error( "Failed running commandToRunOnSuccessfulImport: " + commandToRunOnSuccessfulImport
							+ ", subdirForThisTrackingId: " + subdirForThisTrackingId, e );

				} finally {

				}
			}			
		}
		
		deleteUploadedFilesIfConfiguredAndStatusSuccess( fileImportTrackingDTO, subdirForThisTrackingId );
	}
	
	/**
	 * @param fileImportTrackingDTO
	 * @param fileImportTrackingRunDTO
	 * @throws Exception
	 */
	public void markImportTrackingAsFailed(
			String errorText,  //  use ERROR_MSG_SYSTEM_ERROR if null
			FileImportTrackingDTO fileImportTrackingDTO,
			FileImportTrackingRunDTO fileImportTrackingRunDTO,
			FileImportRunSubStatus fileImportRunSubStatus ) throws Exception {
		
		String errorText_Local = errorText;
		
		if ( errorText_Local == null ) {
			errorText_Local = ERROR_MSG_SYSTEM_ERROR;
		}
		
		fileImportTrackingRunDTO.setRunStatus( FileImportStatus.FAILED );
		fileImportTrackingRunDTO.setRunSubStatus( fileImportRunSubStatus );
		fileImportTrackingRunDTO.setDataErrorText( errorText_Local );
		fileImportTrackingRunDTO.setImportResultText( errorText_Local );
		
		boolean updatedDBCompleted = false;
		int retryCount = 0;
		int nextTryInMinutes = 0;
		
		while ( ! updatedDBCompleted && ! shutdownRequested ) {
		
			try {
				UpdateTrackingTrackingRunRecordsDBTransaction.getInstance()
				.updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
						FileImportStatus.FAILED, 
						fileImportTrackingDTO.getId(), 
						fileImportTrackingRunDTO );
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
				
				String msg = "Failed to update Import Tracking status to Failed for tracking id: " + fileImportTrackingDTO.getId()
					+ ", run id: " + fileImportTrackingRunDTO.getId()
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
			
			String msg = "Shutdown requested.  Update DB For Fail of import was not completed. tracking id: " + fileImportTrackingDTO.getId()
					+ ", run id: " + fileImportTrackingRunDTO.getId()
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
					On_ImportLimelightXMLScanFile_Finish_CallWebService.getInstance()
					.callLimelightWebServiceOnSingleImportFinish( 
							fileImportTrackingDTO.getId(), 
							fileImportTrackingRunDTO.getId() );

					callServerCompleted = true;
				} catch ( Exception e ) {

					retryCount++;

					if ( retryCount > RETRY_COUNT_SWITCH_TO_EXTENDED_2 ) {

						String msg = "Failed to call Limelight Web app for Failed status for tracking id: " + fileImportTrackingDTO.getId()
						+ ", run id: " + fileImportTrackingRunDTO.getId()
						+ ".  Retry count exceeded so no more retries will be attempted."
						+ "  Error Msg: " + e.toString();
						log.error( msg, e );
						throw new LimelightRunImporterInternalException(msg);

					} else if ( retryCount > RETRY_COUNT_SWITCH_TO_EXTENDED_1 ) {
						nextTryInMinutes +=  RETRY_DELAY_EXTENDED_1;
					} else {
						nextTryInMinutes +=  RETRY_DELAY_INITIAL;
					}
					String msg = "Failed to call Limelight Web app for Failed status for tracking id: " + fileImportTrackingDTO.getId()
					+ ", run id: " + fileImportTrackingRunDTO.getId()
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
			
			String msg = "Shutdown requested.  Call to Limelight Web app For Fail of import was not completed. tracking id: " + fileImportTrackingDTO.getId()
					+ ", run id: " + fileImportTrackingRunDTO.getId()
					+ ". ";
			log.error( msg );
			throw new LimelightRunImporterInternalException(msg);
		}
	}
	
	/**
	 * @param fileImportTrackingDTO
	 * @throws Exception
	 */
	private void deleteUploadedFilesIfConfiguredAndStatusSuccess( FileImportTrackingDTO fileImportTrackingDTO, File subdirForThisTrackingId ) throws Exception {
		
		int trackingId = fileImportTrackingDTO.getId();
		//  Get current record for FileImportTrackingDTO since the importer pgm may have updated it.
		FileImportTrackingDTO currentTrackingDTO = FileImportTracking_Shared_Get_DAO.getInstance().getItem( trackingId );
		if ( currentTrackingDTO.getStatus() != FileImportStatus.COMPLETE ) {
			//  Status is not COMPLETE so NO DELETION
			if ( log.isInfoEnabled() ) {
				log.info( "!!!!!!!!!!!!  deleteUploadedFilesIfConfiguredAndStatusSuccess(...) currentTrackingDTO.getStatus() != FileImportStatus.COMPLETE so return. currentTrackingDTO.getStatus(): " + currentTrackingDTO.getStatus() );
			}
			return;  //  EARLY EXIT
		}
		// Get configuration item
		try {
			String deleteFilesConfigValue =
					ConfigSystemTableGetValueCommon.getInstance()
					.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.IMPORT_DELETE_UPLOADED_FILES );
			if ( ! ConfigSystemsValuesSharedConstants.TRUE.equals( deleteFilesConfigValue ) ) {
				//  Config value in table is not true string.
				log.warn( "!!!!!!!!!!!!  deleteUploadedFilesIfConfiguredAndStatusSuccess(...) IMPORT_DELETE_UPLOADED_FILES config value NOT TRUE so return. config value: " + deleteFilesConfigValue );
				return;  //  EARLY EXIT
			}
		} catch ( IllegalStateException e ) {
			//  Config key not in table.  Assume don't want files deleted
			return;  //  EARLY EXIT
		}

		ImportFiles_Delete_S3Objects_For_DB_SingleFile_Records.getInstance().delete_S3Objects_For_DB_SingleFile_Records(  fileImportTrackingDTO.getId() );
		
		DeleteDirectoryAndContents.getInstance().deleteDirectoryAndContents( subdirForThisTrackingId );
	}

}
