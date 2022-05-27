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
package org.yeastrc.limelight.limelight_run_importer.database_cleanup__thread_and_main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.common.database_connection.Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum;
import org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.main.Limelight_DatabaseCleanup__Main_EntryPoint;
import org.yeastrc.limelight.database_cleanup.shutdown_requested_detection.Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.database_version_info_retrieval_compare.Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.database_version_info_retrieval_compare.Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.LimelightDatabaseSchemaVersion_Comparison_Result;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_run_importer.db__for__limelight__database_cleanup__common_code__remove_data_from_database.RunImporter__Limelight_DatabaseCleanup__DBConnectionProvider_Provider;
import org.yeastrc.limelight.limelight_run_importer.exceptions.LimelightRunImporterInternalException;

/**
 * Remove import files from disk after a delayed time of 3 days thread
 * 
 * Skip running if DB Schema Version Number in DB  NOT  match DB Schema Version Number in Code. 
 *
 */
public class DatabaseCleanup_RemoveData_Thread extends Thread {

	private static final String className = DatabaseCleanup_RemoveData_Thread.class.getSimpleName();

	private static final long TWENTY_FOUR_HOURS = 24;  // Run every 24 hours
		
	private static final long TWENTY_FOUR_HOURS__IN_MILLISECONDS = TWENTY_FOUR_HOURS * 60 * 60 * 1000;  // Run every 24 hours

	private static final Logger log = LoggerFactory.getLogger( DatabaseCleanup_RemoveData_Thread.class );


	/**
	 * Single instance for currently active Thread.
	 */
	private static volatile ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory;


	private volatile boolean keepRunning = true;

	private volatile boolean logged_CloseAllConnections_Exception = false;


	/**
	 * 
	 */
	public static void closeAll_DatabaseConnections() {

		log.warn("INFO:  public static void closeAll_DatabaseConnections() called in this class. if importRunImporterDBConnectionFactory is not null, calling importRunImporterDBConnectionFactory.closeAllConnections(); and setting importRunImporterDBConnectionFactory to null.");

		//  Assumes only 1 instance of this class will exist at a time

		if ( importRunImporterDBConnectionFactory != null ) {
			//  Have prev instance so close and unassign
			try {
				importRunImporterDBConnectionFactory.closeAllConnections();
			} catch (Throwable t) {

			}
			importRunImporterDBConnectionFactory = null;
		}
	}


	/**
	 * Cleanup when thread is dead
	 */
	public void threadIsDead_Cleanup() {

		log.warn("INFO: public void threadIsDead_Cleanup() called in this class. if importRunImporterDBConnectionFactory is not null, calling importRunImporterDBConnectionFactory.closeAllConnections(); and setting importRunImporterDBConnectionFactory to null.");

		//  Assumes only 1 instance of this class will exist at a time

		if ( importRunImporterDBConnectionFactory != null ) {
			//  Have prev instance so close and unassign
			try {
				importRunImporterDBConnectionFactory.closeAllConnections();
			} catch (Throwable t) {

			}
			importRunImporterDBConnectionFactory = null;
		}
	}


	/**
	 * @param s
	 * @return
	 * @throws Exception 
	 */
	public static DatabaseCleanup_RemoveData_Thread getNewInstance( 

			String threadLabel, 
			DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables dbConnectionParametersProvider ) throws Exception {

		//  Requires only 1 instance of this class will exist at a time

		if ( importRunImporterDBConnectionFactory != null ) {

			String msg = "Clean Up Previous dead DatabaseCleanup_RemoveData_Thread Thread before creating an new DatabaseCleanup_RemoveData_Thread Thread.  static property importRunImporterDBConnectionFactory is NOT null when called getNewInstance(...)";
			log.error(msg);
			throw new LimelightRunImporterInternalException(msg);
		}

		//  Create "New" Instance of ImportRunImporterDBConnectionFactory so is NOT same instance that main "Run Importer" uses 
		//      since main "Run Importer" calls 'importRunImporterDBConnectionFactory.closeAllConnections();' after each check of imports to process 
		importRunImporterDBConnectionFactory = ImportRunImporterDBConnectionFactory.get_New_Instance();

		importRunImporterDBConnectionFactory.initialize( dbConnectionParametersProvider ); 
		importRunImporterDBConnectionFactory.setDatabaseConnectionTestOnBorrow(true);

		DatabaseCleanup_RemoveData_Thread instance = new DatabaseCleanup_RemoveData_Thread(threadLabel);
		instance.init();
		return instance;
	}

	/**
	 * default Constructor
	 */
	private DatabaseCleanup_RemoveData_Thread() {
		//  Set a name for the thread
		String threadName = className;
		setName( threadName );
	}
	/**
	 * Constructor
	 * @param s
	 */
	private DatabaseCleanup_RemoveData_Thread( String threadLabel ) {
		super(threadLabel);
	}

	/**
	 *
	 */
	private void init() {
	}

	/**
	 * awaken thread to get next import or to complete
	 */
	public void awaken() {
		synchronized (this) {
			notify();
		}
	}

	/**
	 * Called on a different thread.
	 * The ManagerThread instance has detected that the user has requested that the Run Importer client stop after current import.
	 */
	public void stopRunningAfterProcessingImport() {

		log.warn("INFO: stopRunningAfterProcessingJob() called:  ImportFiles_DelayedRemoval_Thread.getId() = " + this.getId() + ", ImportFiles_DelayedRemoval_Thread.getName() = " + this.getName() );
		synchronized (this) {
			this.keepRunning = false;
		}
		this.awaken();
	}

	/**
	 * Called on a separate thread when a shutdown request comes from the operating system.
	 * If this is not heeded, the process may be killed by the operating system after some time has passed ( controlled by the operating system )
	 */
	public void shutdown() {
		log.warn( "shutdown() called, setting keepRunning = false, calling awaken() " );
		keepRunning = false;

		try {
			Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().shutdownRequestReceived();
		} catch (Throwable e) {
			log.error( "In shutdown(): call to Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().shutdownRequestReceived() threw Throwable " + e.toString(), e );
		}

		awaken();
		log.warn( "Exiting shutdown()" );
	}



	/* (non-Javadoc)
	 * @see java.lang.Runnable#run()
	 */
	@Override
	public void run() {

		log.debug( "run() entered" );

		try {

			Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance()
			.setDatabaseCleanupOnly_DBConnectionProvider_Provider_IF( 
					RunImporter__Limelight_DatabaseCleanup__DBConnectionProvider_Provider.getNewInstance(importRunImporterDBConnectionFactory) );


			//  Top level loop until keepRunning is false

			while ( keepRunning ) {

				try {

					//  Check DB Version Number

					{ //  Validate Code And Database Schema Versions match

						//  CURRENT Version
						LimelightDatabaseSchemaVersion_Comparison_Result limelightDatabase_CURRENT_SchemaVersion_Comparison_Result = null;
						try {
							limelightDatabase_CURRENT_SchemaVersion_Comparison_Result = Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getInstance().
									getLimelightDatabase_CURRENT_SchemaVersion_Comparison_Result();
						} catch (Exception e) {

							synchronized (this) {
								try {
									wait( TWENTY_FOUR_HOURS__IN_MILLISECONDS ); //  wait for notify() call or timeout, in milliseconds
								} catch (InterruptedException e2) {
									log.info("waitForSleepTime():  wait() interrupted with InterruptedException");
								}
							}

							continue;  // EARLY CONTINUE
						}

						//  DB Update in Progress Version
						LimelightDatabaseSchemaVersion_Comparison_Result limelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result;
						try {
							limelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result = Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getInstance().
									getLimelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result();
						} catch (Exception e) {

							synchronized (this) {
								try {
									wait( TWENTY_FOUR_HOURS__IN_MILLISECONDS ); //  wait for notify() call or timeout, in milliseconds
								} catch (InterruptedException e2) {
									log.info("waitForSleepTime():  wait() interrupted with InterruptedException");
								}
							}

							continue;  // EARLY CONTINUE
						}


						if ( limelightDatabase_CURRENT_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME 
								|| limelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME ) {

							synchronized (this) {
								try {
									wait( TWENTY_FOUR_HOURS__IN_MILLISECONDS ); //  wait for notify() call or timeout, in milliseconds
								} catch (InterruptedException e2) {
									log.info("waitForSleepTime():  wait() interrupted with InterruptedException");
								}
							}

							continue;  // EARLY CONTINUE
						}
					}

					///////////////

					log.warn( "INFO:: STARTING: Database Cleanup (removal of deleted searches and projects and removal of failed search imports).  When Cleanup is completed it will wait " + TWENTY_FOUR_HOURS + " hours before it runs again" );

					//  Main Processing

					Limelight_DatabaseCleanup__Main_EntryPoint.getSingletonInstance()
					.limelight_DatabaseCleanup__Main_EntryPoint(
							Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.LIMELIGHT__RUN_IMPORTER_PROGRAM,
							Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum.DELETE_RECORDS
							);

					try {
						if ( importRunImporterDBConnectionFactory != null ) {
							importRunImporterDBConnectionFactory.closeAllConnections(); // New connections created next processing loop
						} else {
							log.warn( "INFO:: After: Database Cleanup (removal of deleted searches and projects and removal of failed search imports).  importRunImporterDBConnectionFactory is null so not calling importRunImporterDBConnectionFactory.closeAllConnections();" ); 
						}
					} catch ( Throwable t ) {

						if ( ! logged_CloseAllConnections_Exception ) {
							logged_CloseAllConnections_Exception = true;
							log.error( "Failed to close all DB connections at end of processing loop before wait to process again.  Exception: ", t );
						} else {
							log.error( "Failed to close all DB connections at end of processing loop before wait to process again.  Exception only logged the first time. " );
						}
					}

					log.warn( "INFO:: FINISHED: Database Cleanup (removal of deleted searches and projects and removal of failed search imports).  Now Cleanup will wait " + TWENTY_FOUR_HOURS + " hours before it runs again" );


					///////////////

					//  Next wait 24 hours before run again

					synchronized (this) {
						try {
							wait( TWENTY_FOUR_HOURS__IN_MILLISECONDS ); //  wait for notify() call or timeout, in milliseconds
						} catch (InterruptedException e) {
							log.info("waitForSleepTime():  wait() interrupted with InterruptedException");
						}
					}

				} catch ( Throwable t ) {

					if ( keepRunning ) {
						log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
						log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
						log.error( "!!!! \n\n Exception in run(): Will next wait " + TWENTY_FOUR_HOURS__IN_MILLISECONDS
								+ " seconds before doing any more processing.  Exception: \n\n", t );

						log.error( "!!!! \n\n " );
						log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
						log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

						synchronized (this) {
							try {
								wait( TWENTY_FOUR_HOURS__IN_MILLISECONDS ); //  wait for notify() call or timeout, in milliseconds
							} catch (InterruptedException e) {
								log.info("waiting on Throwable exception caught:  wait() interrupted with InterruptedException");
							}
						}
					} else {
						log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
						log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
						log.error( "!!!! \n\n Exception in run(): keepRunning is false so will not wait but exit."
								+ "  Exception: \n\n", t );

						log.error( "!!!! \n\n " );
						log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
						log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

					}

				}
			}

		} finally {

			try {
				importRunImporterDBConnectionFactory.closeAllConnections(); // Close as exit thread 'run()'

			} catch ( Throwable t ) {
				log.error( "Failed to close all DB connections.");
			}

			importRunImporterDBConnectionFactory = null;

		}

		log.info( "Exiting run()" );
	}


}
