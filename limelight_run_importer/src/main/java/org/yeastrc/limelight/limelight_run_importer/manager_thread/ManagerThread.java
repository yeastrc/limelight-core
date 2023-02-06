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
package org.yeastrc.limelight.limelight_run_importer.manager_thread;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables;
import org.yeastrc.limelight.limelight_run_importer.config.ImporterRunnerConfigData;
import org.yeastrc.limelight.limelight_run_importer.config.ProcessImporterRunnerConfigFileEnvironmentVariables;
import org.yeastrc.limelight.limelight_run_importer.constants.RunControlFileConstants;
import org.yeastrc.limelight.limelight_run_importer.database_cleanup__thread_and_main.DatabaseCleanup_RemoveData_Thread;
import org.yeastrc.limelight.limelight_run_importer.get_import_and_process_thread.GetImportAndProcessThread;
import org.yeastrc.limelight.limelight_run_importer.import_and_pipeline_run__thread.ImportAndPipelineRun_Thread;
import org.yeastrc.limelight.limelight_run_importer.import_files_delayed_removal_thread.ImportFiles_DelayedRemoval_Thread;
import org.yeastrc.limelight.limelight_run_importer.main.ImporterRunnerMain;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;


/**
 * 
 *
 */
public class ManagerThread extends Thread {
	
	private static final String className = ManagerThread.class.getSimpleName();
	
	private static final Logger log = LoggerFactory.getLogger( ManagerThread.class );

	private static final int WAIT_TIME_FOR_MANAGER_THREAD_TO_EXIT_IN_SECONDS = 10;
	
//	private static final int WAIT_TIME_FOR_CLIENT_STATUS_UPDATE_THREAD_TO_EXIT_IN_SECONDS = 10;
	
	//  For shutdown wait for current import to finish, GetImportAndProcessThread and ImportAndPipelineRun_Thread
	private static final int WAIT_TIME_FOR_GET_IMPORT_THREAD_TO_EXIT_IN_SECONDS = 30 * 60; // X minutes
	
	private static final int WAIT_TIME_FOR_CHECK_RUN_CONTROL_FILE_IN_SECONDS = 10;
	
	private static final String GET_IMPORT_AND_PROCESS_THREAD = "GetImportAndProcessThread";  // Thread Name
	
	private static final String IMPORT_AND_PIPELINE_RUN_THREAD = "ImportAndPipelineRun_Thread";  // Thread Name
	
	private static final String IMPORT_FILES_DELAYED_REMOVAL_THREAD = "ImportFiles_DelayedRemoval_Thread";  // Thread Name

	private static final String DATABASE_CLEANUP_REMOVE_DATA_THREAD = "DatabaseCleanup_RemoveData_Thread";  // Thread Name
	
	private volatile boolean keepRunning = true;
	private volatile boolean stopProcessingNextImport = false;
	private volatile boolean stopLimelightRunImporterProgram = false;;
	
	private int maxTrackingRecordPriorityToRetrieve;
	
	private DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables dbConnectionParametersProvider;
	
	private ImporterRunnerMain importerRunnerMain;
	
	private volatile GetImportAndProcessThread getImportAndProcessThread;
	private int getImportAndProcessThreadCounter = 2;  // used if need to replace the thread
	
	private volatile ImportAndPipelineRun_Thread importAndPipelineRun_Thread;
	private int importAndPipelineRun_ThreadCounter = 2;  // used if need to replace the thread
	
	private volatile ImportFiles_DelayedRemoval_Thread importFiles_DelayedRemoval_Thread;
	private int importFiles_DelayedRemoval_ThreadCounter = 2;  // used if need to replace the thread
	
	private volatile DatabaseCleanup_RemoveData_Thread databaseCleanup_RemoveData_Thread;
	private int databaseCleanup_RemoveData_ThreadCounter = 2;  // used if need to replace the thread
	
//	private volatile ClientStatusUpdateThread clientStatusUpdateThread;
//
//	private int clientStatusUpdateThreadCounter = 2;  // used if need to replace the thread
	/**
	 * default Constructor
	 */
	public ManagerThread(DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables dbConnectionParametersProvider) {
		
		this.dbConnectionParametersProvider = dbConnectionParametersProvider;
		
		//  Set a name for the thread
		String threadName = className;
		setName( threadName );
		init();
	}
	/**
	 * Constructor
	 * @param s
	 */
	public ManagerThread( String s ) {
		super(s);
		init();
	}
	/**
	 *
	 */
	private void init() {
	}
	
	/**
	 * awaken thread to process request
	 */
	public void awaken() {
		synchronized (this) {
			notify();
		}
	}
	
	/**
	 * 
	 */
	public void completedSuccessful_FirstDatabaseSQL_GetImportAndProcessThread() {
		
		if ( importFiles_DelayedRemoval_Thread == null ) {

			try {
				//  Any changes here to create thread ALSO need change in code below where replacement thread is created
				importFiles_DelayedRemoval_Thread = ImportFiles_DelayedRemoval_Thread.getNewInstance( IMPORT_FILES_DELAYED_REMOVAL_THREAD /* name */, dbConnectionParametersProvider );
				importFiles_DelayedRemoval_Thread.setDaemon(true);  //  If NOT Set true then need to change all 'Thread.sleep(...)'
				importFiles_DelayedRemoval_Thread.start();
			} catch (Throwable e) {
				log.error( "Failed to create first importFiles_DelayedRemoval_Thread. No Import Files Cleanup will be performed. Exception ", e );
			}
		}

		if ( ! ImporterRunnerConfigData.isDatabaseCleanup_Disable() ) {
			
			if ( databaseCleanup_RemoveData_Thread == null ) {

				//  Any changes here to create thread ALSO need change in code below where replacement thread is created
				try {
					databaseCleanup_RemoveData_Thread = DatabaseCleanup_RemoveData_Thread.getNewInstance( DATABASE_CLEANUP_REMOVE_DATA_THREAD /* name */, dbConnectionParametersProvider );
					databaseCleanup_RemoveData_Thread.setDaemon(true);  //  If NOT Set true then need to change all 'Thread.sleep(...)'
					databaseCleanup_RemoveData_Thread.start();
				} catch (Throwable e) {
					log.error( "Failed to create first databaseCleanup_RemoveData_Thread. No Database Cleanup will be performed. Exception ", e );
				}
			}
		}
	}
	
	/**
	 * 
	 */
	public void completedSuccessful_FirstDatabaseSQL_ImportAndPipelineRun_Thread() {
		
		//  TODO  Add code here
		
		log.warn( "Add code in public void completedSuccessful_FirstDatabaseSQL_ImportAndPipelineRun_Thread");
	}
	
	
	/* (non-Javadoc)
	 * @see java.lang.Thread#run()
	 */
	@Override
	public void run() {
		log.debug( "run() called " );
		//		ClassLoader thisClassLoader = this.getClass().getClassLoader();
		//		this.setContextClassLoader( thisClassLoader );
		try {
			createClientControlFile();

			//  Any changes here to create thread ALSO need change in code below where replacement thread is created
//			clientStatusUpdateThread = new ClientStatusUpdateThread();
//			clientStatusUpdateThread.start();

			//  Any changes here to create thread ALSO need change in code below where replacement thread is created
			getImportAndProcessThread = GetImportAndProcessThread.getNewInstance( GET_IMPORT_AND_PROCESS_THREAD /* name */, this );
			getImportAndProcessThread.setMaxTrackingRecordPriorityToRetrieve( maxTrackingRecordPriorityToRetrieve );
			getImportAndProcessThread.setFirstInstanceOfThisThread(true);
			getImportAndProcessThread.start();

			//  Any changes here to create thread ALSO need change in code below where replacement thread is created
			importAndPipelineRun_Thread = ImportAndPipelineRun_Thread.getNewInstance( IMPORT_AND_PIPELINE_RUN_THREAD /* name */, this );
			importAndPipelineRun_Thread.setMaxTrackingRecordPriorityToRetrieve( maxTrackingRecordPriorityToRetrieve );
			importAndPipelineRun_Thread.setFirstInstanceOfThisThread(true);
			importAndPipelineRun_Thread.start();

			runProcessLoop( );  // Call main processing loop that will run while keepRunning == true
			
			if ( stopProcessingNextImport ) {
				
				File clientControlFile = null;
				FileWriter clientControlFileWriter = null;
				try {
					clientControlFile = new File( RunControlFileConstants.CLIENT_RUN_CONTROL_FILENAME );
					log.info( "ClientControlFile: filename = '" + RunControlFileConstants.CLIENT_RUN_CONTROL_FILENAME + "' filepath is = '" + clientControlFile.getAbsolutePath() + "'." );
					clientControlFileWriter = new FileWriter( clientControlFile );
					if ( stopLimelightRunImporterProgram ) {
						log.info( "ClientControlFile: Changing file contents to: \n" + RunControlFileConstants.CLIENT_RUN_CONTROL_CURRENT_IMPORT_COMPLETE_SHUTDOWN_PROCEEDING );
						clientControlFileWriter.write( RunControlFileConstants.CLIENT_RUN_CONTROL_CURRENT_IMPORT_COMPLETE_SHUTDOWN_PROCEEDING );
					} else {
						log.info( "ClientControlFile: Changing file contents to: \n" + RunControlFileConstants.CLIENT_RUN_CONTROL_CURRENT_IMPORT_COMPLETE_READY_FOR_SHUTDOWN );
						clientControlFileWriter.write( RunControlFileConstants.CLIENT_RUN_CONTROL_CURRENT_IMPORT_COMPLETE_READY_FOR_SHUTDOWN );
					}
				} catch (Throwable e) {
					log.error( "Exception in createClientControlFile(): ", e );
				} finally {
					if ( clientControlFileWriter != null ) {
						try {
							clientControlFileWriter.close();
						} catch (Throwable e) {
							log.error( "Exception in createClientControlFile(): calling clientControlFileWriter.close(); ", e );
						}
					}
				}
				if ( stopLimelightRunImporterProgram ) {
					//  Remove PID file since requested via run control file to shut down program
					removePIDFileOnShutdownViaRunControlFile();
				}
				if ( stopLimelightRunImporterProgram ) {
					importerRunnerMain.stopMainThread();
				}
			}
		} catch (Throwable e) {
			log.error( "Exception in run(): ", e );
		}
		log.debug( "About to exit run()" );
//		LogOpenFiles.logOpenFiles( LogOpenFiles.LIST_FILES_TRUE );
		log.info( "exitting run()" );
	}
	
	/**
	 * Main Processing loop
	 */
	private void runProcessLoop() {
		
		while ( keepRunning ) {
			
//			if ( log.isDebugEnabled() ) {
//				log.debug( "Top of loop in 'runProcessLoop()', waitTime in microseconds = " + waitTime );
//			}
			try {
				replaceWorkerThreadsIfDead();
				if ( keepRunning && ! stopProcessingNextImport ) {
					checkForStopProcessingJobsRequest();
				}
				if ( keepRunning ) {
					synchronized (this) {
						try {
							int waitTimeInSeconds = WAIT_TIME_FOR_CHECK_RUN_CONTROL_FILE_IN_SECONDS; // ClientConfigDTO.getSingletonInstance().getSleepTimeCheckingControlFile();
							wait( waitTimeInSeconds * 1000 ); //  wait for notify() call or timeout, in milliseconds
						} catch (InterruptedException e) {
							log.warn( "wait( waitTime ) was interrupted." );
						}
					}
				}
				// this.getId();
			} catch (Throwable e) {
				log.error( "Exception in runProcessLoop(): ", e );
			}
		}
	}
	
	/**
	 *
	 */
	private void replaceWorkerThreadsIfDead() {
		
		if ( keepRunning ) {  //  only do if keep running is true

			//  check health of heartbeatThread, replace thread if dead
//			if ( ! clientStatusUpdateThread.isAlive() ) {
//				ClientStatusUpdateThread oldHeartbeatThread = clientStatusUpdateThread;
//				clientStatusUpdateThread = new ClientStatusUpdateThread(  );
//				clientStatusUpdateThread.setName( ClientStatusUpdateThread.className + "_" + clientStatusUpdateThreadCounter );
//				clientStatusUpdateThreadCounter++;
//				log.error( "HeartbeatThread thread '" + oldHeartbeatThread.getName() + "' is dead.  Replacing it with HeartbeatThread thread '" + clientStatusUpdateThread.getName() + "'."  );
//				clientStatusUpdateThread.start();
//			}
			
			//  check health of getImportAndProcessThread, replace thread if dead
			if ( ! getImportAndProcessThread.isAlive() ) {
				GetImportAndProcessThread oldGetImportAndProcessThread = getImportAndProcessThread;
				getImportAndProcessThread = GetImportAndProcessThread.getNewInstance(  GET_IMPORT_AND_PROCESS_THREAD + "_" + getImportAndProcessThreadCounter /* name */, this );
				getImportAndProcessThreadCounter += 1;
				log.error( "GetImportAndProcessThread thread '" + oldGetImportAndProcessThread.getName() + "' is dead.  Replacing it with GetImportAndProcessThread thread '" + getImportAndProcessThread.getName() + "'."  );
				getImportAndProcessThread.start();
			}

			//  check health of importAndPipelineRun_Thread, replace thread if dead
			if ( ! importAndPipelineRun_Thread.isAlive() ) {
				ImportAndPipelineRun_Thread old_importAndPipelineRun_Thread = importAndPipelineRun_Thread;
				importAndPipelineRun_Thread = ImportAndPipelineRun_Thread.getNewInstance(  GET_IMPORT_AND_PROCESS_THREAD + "_" + importAndPipelineRun_ThreadCounter /* name */, this );
				importAndPipelineRun_ThreadCounter += 1;
				log.error( "ImportAndPipelineRun_Thread thread '" + old_importAndPipelineRun_Thread.getName() + "' is dead.  Replacing it with ImportAndPipelineRun_Thread thread '" + importAndPipelineRun_Thread.getName() + "'."  );
				importAndPipelineRun_Thread.start();
			}
			
			//  check health of importFiles_DelayedRemoval_Thread, replace thread if dead
			if ( importFiles_DelayedRemoval_Thread != null && ( ! importFiles_DelayedRemoval_Thread.isAlive() ) ) {
				
				ImportFiles_DelayedRemoval_Thread old_importFiles_DelayedRemoval_Thread = importFiles_DelayedRemoval_Thread;
				
				old_importFiles_DelayedRemoval_Thread.threadIsDead_Cleanup();
				
				try {
					importFiles_DelayedRemoval_Thread = ImportFiles_DelayedRemoval_Thread.getNewInstance( 
							IMPORT_FILES_DELAYED_REMOVAL_THREAD + "_" + importFiles_DelayedRemoval_ThreadCounter /* name */, dbConnectionParametersProvider );
					importFiles_DelayedRemoval_ThreadCounter += 1;
					log.error( "ImportFiles_DelayedRemoval_Thread thread '" + old_importFiles_DelayedRemoval_Thread.getName() + "' is dead.  Replacing it with ImportFiles_DelayedRemoval_Thread thread '" + importFiles_DelayedRemoval_Thread.getName() + "'."  );
					importFiles_DelayedRemoval_Thread.setDaemon(true);  //  If NOT Set true then need to change all 'Thread.sleep(...)'
					importFiles_DelayedRemoval_Thread.start();
				} catch (Throwable e) {
					log.error( "Failed to create replacement importFiles_DelayedRemoval_Thread. No Import Files Cleanup will be performed. Exception ", e );
				}
			}

			if ( ! ImporterRunnerConfigData.isDatabaseCleanup_Disable() ) {

				//  check health of databaseCleanup_RemoveData_Thread, replace thread if dead
				if ( databaseCleanup_RemoveData_Thread != null && ( ! databaseCleanup_RemoveData_Thread.isAlive() ) ) {
					
					DatabaseCleanup_RemoveData_Thread old_databaseCleanup_RemoveData_Thread = databaseCleanup_RemoveData_Thread;

					old_databaseCleanup_RemoveData_Thread.threadIsDead_Cleanup();
					
					try {
						databaseCleanup_RemoveData_Thread = DatabaseCleanup_RemoveData_Thread.getNewInstance(  DATABASE_CLEANUP_REMOVE_DATA_THREAD + "_" + databaseCleanup_RemoveData_ThreadCounter /* name */, dbConnectionParametersProvider  );
						databaseCleanup_RemoveData_ThreadCounter += 1;
						log.error( "ImportFiles_DelayedRemoval_Thread thread '" + old_databaseCleanup_RemoveData_Thread.getName() + "' is dead.  Replacing it with ImportFiles_DelayedRemoval_Thread thread '" + databaseCleanup_RemoveData_Thread.getName() + "'."  );
						databaseCleanup_RemoveData_Thread.setDaemon(true);  //  If NOT Set true then need to change all 'Thread.sleep(...)'
						databaseCleanup_RemoveData_Thread.start();
					} catch (Throwable e) {
						log.error( "Failed to create replacement databaseCleanup_RemoveData_Thread. No Database Cleanup will be performed. Exception ", e );
					}
				}
			}

		}
	}
	
	/**
	 *
	 */
	private void createClientControlFile() {
		
		File clientControlFile = null;
		BufferedWriter clientControlFileWriter = null;
		try {
			clientControlFile = new File( RunControlFileConstants.CLIENT_RUN_CONTROL_FILENAME );
			@SuppressWarnings("unused")
			String clientControlFileWithPathString = clientControlFile.getCanonicalPath();
			log.info( "ClientControlFile: filename = '" + RunControlFileConstants.CLIENT_RUN_CONTROL_FILENAME + "' filepath is = '" + clientControlFile.getAbsolutePath() + "'." );
			clientControlFileWriter = new BufferedWriter( new FileWriter( clientControlFile ) );
			if ( log.isDebugEnabled() ) {
				StringBuilder contentsSB = new StringBuilder( 2000);
				for ( String line : RunControlFileConstants.CLIENT_RUN_CONTROL_INITIAL_CONTENTS ) {
					contentsSB.append( line  );
					contentsSB.append( "\n" );
				}
				log.debug( "ClientControlFile: Changing file contents to: \n" + contentsSB );
			}
			for ( String line : RunControlFileConstants.CLIENT_RUN_CONTROL_INITIAL_CONTENTS ) {
				clientControlFileWriter.append( line  );
				clientControlFileWriter.newLine();
			}
		} catch (Throwable e) {
			log.error( "Exception in createClientControlFile(): ", e );
		} finally {
			if ( clientControlFileWriter != null ) {
				try {
					clientControlFileWriter.close();
				} catch (Throwable e) {
					log.error( "Exception in createClientControlFile(): calling clientControlFileWriter.close(); ", e );
				}
			}
		}
	}
	
	/**
	 * Check if the control file has been updated to indicate that a "stop" has been requested
	 */
	private void checkForStopProcessingJobsRequest() {
		
		File clientControlFile = null;
		BufferedReader clientControlFileReader = null;
		BufferedWriter clientControlFileWriter = null;
		try {
			clientControlFile = new File( RunControlFileConstants.CLIENT_RUN_CONTROL_FILENAME );
			clientControlFileReader = new BufferedReader( new FileReader( clientControlFile ) );
			String inputLine = clientControlFileReader.readLine();
			if ( inputLine != null ) {
				boolean stopRequestedLocal = false;
				String stopRequestType = null;
				if ( inputLine.startsWith(  RunControlFileConstants.CLIENT_RUN_CONTROL_STOP_JOBS_TEXT ) ) {
					stopRequestedLocal = true;
					stopRequestType = RunControlFileConstants.CLIENT_RUN_CONTROL_STOP_JOBS_TEXT;
					log.info(  "File '" + RunControlFileConstants.CLIENT_RUN_CONTROL_FILENAME
							+ "' has been changed to specify to stop processing new imports and keep running when the current import is complete."
							+ "  All threads except for the main thread will be dead when the current import is complete." );
				} else if ( inputLine.startsWith(  RunControlFileConstants.CLIENT_RUN_CONTROL_STOP_RUN_TEXT ) ) {
					stopLimelightRunImporterProgram = true;
					stopRequestedLocal = true;
					stopRequestType = RunControlFileConstants.CLIENT_RUN_CONTROL_STOP_RUN_TEXT;
					log.info(  "File '" + RunControlFileConstants.CLIENT_RUN_CONTROL_FILENAME
							+ "' has been changed to specify to stop processing new imports and exit when the current import is complete." );
				}
				if ( stopRequestedLocal ) {
					
					stopProcessingNextImport = true;
					
					{
						StringBuilder contentsSB = new StringBuilder( 2000);
						for ( String line : RunControlFileConstants.CLIENT_RUN_CONTROL_STOP_REQUEST_ACCEPTED ) {
							contentsSB.append( line  );
							contentsSB.append( "\n" );
						}
						log.info( "ClientControlFile: Adding to file contents : \n" + contentsSB );
					}
					log.info( "ClientControlFile: filename = '" + RunControlFileConstants.CLIENT_RUN_CONTROL_FILENAME + "' filepath is = '" + clientControlFile.getAbsolutePath() + "'." );
					
					clientControlFileWriter = new BufferedWriter( new FileWriter( clientControlFile, true /* append */ ) );
					for ( String line : RunControlFileConstants.CLIENT_RUN_CONTROL_STOP_REQUEST_ACCEPTED ) {
						clientControlFileWriter.append( line  );
						clientControlFileWriter.newLine();
					}
					try {  //  Also close if not null in 'finally' block below
						clientControlFileReader.close();
						clientControlFileReader = null;
					} catch (Throwable e) {
						log.error( "Exception in checkForStopProcessingJobsRequest(): calling clientControlFileReader.close(); ", e );
					}
					
					processStopProcessingNewImportsRequest( stopRequestType );
				}
			}
		} catch (Throwable e) {
			log.error( "Exception in checkForStopProcessingJobsRequest(): ", e );
		} finally {
			if ( clientControlFileReader != null ) {
				try {
					clientControlFileReader.close();
				} catch (Throwable e) {
					log.error( "Exception in checkForStopProcessingJobsRequest(): calling clientControlFileReader.close(); ", e );
				}
			}
			if ( clientControlFileWriter != null ) {
				try {
					clientControlFileWriter.close();
				} catch (Throwable e) {
					log.error( "Exception in checkForStopProcessingJobsRequest(): calling clientControlFileWriter.close(); ", e );
				}
			}
		}
	}
	
	/**
	 * Process the "stop" request from the control file.
	 */
	private void processStopProcessingNewImportsRequest( String stopRequestType ) {
		
		keepRunning = false;  // Set thread of the current object to exit main processing loop.

		shutdown_Common();
			
		//  call getImportAndProcessThread.stopRunningAfterProcessingImport();
		if ( getImportAndProcessThread != null ) {
			try {
				getImportAndProcessThread.stopRunningAfterProcessingImport();
			} catch (Throwable e) {
				log.error( "In processStopProcessingNewImportsRequest(): call to getImportAndProcessThread.stopRunningAfterProcessingImport() threw Throwable " + e.toString(), e );
			}
		} else {
			log.info( "In processStopProcessingNewImportsRequest(): getImportAndProcessThread == null" );
		}
		waitForGetImportAndProcessThread();
		
		waitFor_ImportAndPipelineRun_Thread();
	}
	
	
	/**
	 * Called on a separate thread when a shutdown request comes from the operating system.
	 * If this is not heeded, the process may be killed by the operating system after some time has passed ( controlled by the operating system )
	 */
	public void shutdown() {
		
		log.debug( "shutdown() called " );
		
		shutdown_Common();
		
		//  call getImportAndProcessThread.shutdown();
		if ( getImportAndProcessThread != null ) {
			try {
				getImportAndProcessThread.shutdown();
			} catch (Throwable e) {
				log.error( "In processStopProcessingNewImportsRequest(): call to getImportAndProcessThread.shutdown() threw Throwable " + e.toString(), e );
			}
		} else {
			log.info( "In processStopProcessingNewImportsRequest(): getImportAndProcessThread == null" );
		}
		keepRunning = false;  // Set thread of the current object to exit main processing loop.
		awaken();  // send notify() to to the thread of the current object to start it so it will exit.
		boolean managerThreadExited = false;
		while ( ! managerThreadExited ) {
			try {  // wait for thread of the current object to die, so it won't start any threads to replace the threads that will be setup to die next.
				this.join( WAIT_TIME_FOR_MANAGER_THREAD_TO_EXIT_IN_SECONDS * 1000 );
			} catch (Throwable e) {
				log.error( "In processStopRetrievingJobsRequest(): call to this.shutdown() threw Throwable " + e.toString(), e );
			}
			if ( this.isAlive() ) {
//				log.warn( "The thread 'managerThread' has not exited in the allocated time of "
//						+ WAIT_TIME_FOR_MANAGER_THREAD_TO_EXIT_IN_SECONDS
//						+ " seconds.  The wait for 'managerThread' to exit will be repeated with the same wait time." );
			} else {
				managerThreadExited = true;
			}
		}
		waitForGetImportAndProcessThread();
		//  TODO   Update process status in DB to about to shut down or shut down
	}

	/**
	 * 
	 */
	private void shutdown_Common() {
		
		//  importFiles_DelayedRemoval_Thread and databaseCleanup_RemoveData_Thread are daemon threads so no need to wait
		
		if ( importFiles_DelayedRemoval_Thread != null ) {
			try {
				importFiles_DelayedRemoval_Thread.shutdown();
			} catch (Throwable e) {
				log.error( "In processStopProcessingNewImportsRequest(): call to importFiles_DelayedRemoval_Thread.shutdown() threw Throwable " + e.toString(), e );
			}
		}
		if ( databaseCleanup_RemoveData_Thread != null ) {
			try {
				databaseCleanup_RemoveData_Thread.shutdown();
			} catch (Throwable e) {
				log.error( "In processStopProcessingNewImportsRequest(): call to databaseCleanup_RemoveData_Thread.shutdown() threw Throwable " + e.toString(), e );
			}
		}
	}
	
	/**
	 * wait For GetImportAndProcessThread To Complete
	 */
	private void waitForGetImportAndProcessThread () {
		
		log.warn( "INFO: waitForGetImportAndProcessThread(): wait for getImportAndProcessThread to complete, call getImportAndProcessThread.join() " );
		// wait for getImportAndProcessThread to complete
		if ( getImportAndProcessThread != null ) {
//			boolean getJobThreadExited = false;
//			while ( ! getJobThreadExited ) {
				try {
					getImportAndProcessThread.join( WAIT_TIME_FOR_GET_IMPORT_THREAD_TO_EXIT_IN_SECONDS * 1000 );
				} catch (InterruptedException e) {
					log.info( "In waitForGetJobThreadToComplete(): call to getJobThread.join() threw InterruptedException " + e.toString(), e );
				}
				if ( getImportAndProcessThread.isAlive() ) {
					log.error( "The thread 'getImportAndProcessThread' has not exited in the allocated time of "
							+ WAIT_TIME_FOR_GET_IMPORT_THREAD_TO_EXIT_IN_SECONDS
							+ " seconds.  The thread 'getJobThread' will not be waited for any further." );
//					log.error( "The thread 'getJobThread' has not exited in the allocated time of "
//							+ WAIT_TIME_FOR_GET_JOB_THREAD_TO_EXIT_IN_SECONDS
//							+ " seconds.  The wait for 'getJobThread' to exit will be repeated with the same wait time." );
				} else {
//					getJobThreadExited = true;
				}
//			}
		} else {
			log.warn( "INFO: In waitForGetImportAndProcessThread(): getImportAndProcessThread == null" );
		}
		log.warn( "INFO: waitForGetImportAndProcessThread():  getImportAndProcessThread IS complete, called getImportAndProcessThread.join() " );
	}

	/**
	 * wait For GetImportAndProcessThread To Complete
	 */
	private void waitFor_ImportAndPipelineRun_Thread () {
		
		log.warn( "INFO: waitFor_ImportAndPipelineRun_Thread(): wait for getImportAndProcessThread to complete, call getImportAndProcessThread.join() " );
		// wait for getImportAndProcessThread to complete
		if ( importAndPipelineRun_Thread != null ) {
//			boolean getJobThreadExited = false;
//			while ( ! getJobThreadExited ) {
				try {
					importAndPipelineRun_Thread.join( WAIT_TIME_FOR_GET_IMPORT_THREAD_TO_EXIT_IN_SECONDS * 1000 );
				} catch (InterruptedException e) {
					log.info( "In waitForGetJobThreadToComplete(): call to getJobThread.join() threw InterruptedException " + e.toString(), e );
				}
				if ( importAndPipelineRun_Thread.isAlive() ) {
					log.error( "The thread 'importAndPipelineRun_Thread' has not exited in the allocated time of "
							+ WAIT_TIME_FOR_GET_IMPORT_THREAD_TO_EXIT_IN_SECONDS
							+ " seconds.  The thread 'getJobThread' will not be waited for any further." );
//					log.error( "The thread 'getJobThread' has not exited in the allocated time of "
//							+ WAIT_TIME_FOR_GET_JOB_THREAD_TO_EXIT_IN_SECONDS
//							+ " seconds.  The wait for 'getJobThread' to exit will be repeated with the same wait time." );
				} else {
//					getJobThreadExited = true;
				}
//			}
		} else {
			log.warn( "INFO: In waitFor_ImportAndPipelineRun_Thread(): importAndPipelineRun_Thread == null" );
		}
		log.warn( "INFO: waitFor_ImportAndPipelineRun_Thread():  importAndPipelineRun_Thread IS complete, called importAndPipelineRun_Thread.join() " );
	}

	/**
	 * 
	 */
	private void removePIDFileOnShutdownViaRunControlFile() {
		
		String importerPidFileWithPath = ImporterRunnerConfigData.getRunImporterPidFileWithPath();
		
		if ( StringUtils.isNotEmpty( importerPidFileWithPath ) ) {
			try {
				File importerPidFileWithPath_File = new File( importerPidFileWithPath );
				if ( ! importerPidFileWithPath_File.exists() ) {
					log.warn( "INFO: PID file configured, but not found so do not delete it."
							+ " Config file property name: '"
							+ ProcessImporterRunnerConfigFileEnvironmentVariables.PROPERTY_NAME__IMPORTER_PID_FILE_WITH_PATH 
							+ "'"
							+ ", PID File: " + importerPidFileWithPath);
					return; // EARLY EXIT
				}
				if ( ! importerPidFileWithPath_File.delete() ) {
					log.error( "PID file configured, but failed to delete it.  NO Exception. "
							+ " Config file property name: '"
							+ ProcessImporterRunnerConfigFileEnvironmentVariables.PROPERTY_NAME__IMPORTER_PID_FILE_WITH_PATH 
							+ "'"
							+ ", PID File: " + importerPidFileWithPath );
					return; // EARLY EXIT
				}
				log.warn( "INFO: PID file configured so deleted it."
						+ " Config file property name: '"
						+ ProcessImporterRunnerConfigFileEnvironmentVariables.PROPERTY_NAME__IMPORTER_PID_FILE_WITH_PATH 
						+ "'"
						+ ", PID File: " + importerPidFileWithPath);
			} catch ( Throwable t ) {
				log.error( "PID file configured, but failed to delete it.  Exception. "
						+ " Config file property name: '"
						+ ProcessImporterRunnerConfigFileEnvironmentVariables.PROPERTY_NAME__IMPORTER_PID_FILE_WITH_PATH 
						+ "'"
						+ ", PID File: " + importerPidFileWithPath
						,
						t );
				//  EAT Exception
			}
		}
	}
	
	public ImporterRunnerMain getImporterRunnerMain() {
		return importerRunnerMain;
	}
	public void setImporterRunnerMain(ImporterRunnerMain importerRunnerMain) {
		this.importerRunnerMain = importerRunnerMain;
	}
	public int getMaxTrackingRecordPriorityToRetrieve() {
		return maxTrackingRecordPriorityToRetrieve;
	}
	public void setMaxTrackingRecordPriorityToRetrieve(
			int maxTrackingRecordPriorityToRetrieve) {
		this.maxTrackingRecordPriorityToRetrieve = maxTrackingRecordPriorityToRetrieve;
	}

}
