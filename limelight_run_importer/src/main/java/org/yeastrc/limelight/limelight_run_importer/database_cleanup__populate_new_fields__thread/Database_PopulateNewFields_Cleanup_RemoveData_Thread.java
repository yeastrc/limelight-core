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
package org.yeastrc.limelight.limelight_run_importer.database_cleanup__populate_new_fields__thread;

import java.util.Calendar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.common.database_connection.Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum;
import org.yeastrc.limelight.database_cleanup.main_entry_point.Limelight_DatabaseCleanup__Main_EntryPoint;
import org.yeastrc.limelight.database_cleanup.shutdown_requested_detection.Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection;
import org.yeastrc.limelight.db_populate_new_fields__common_code.common.database_connection.Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode;
import org.yeastrc.limelight.db_populate_new_fields__common_code.constants_and_enums.Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.db_populate_new_fields__common_code.main_entry_point.Limelight_DatabasePopulateNewFields__Main_EntryPoint;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.database_version_info_retrieval_compare.Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.database_version_info_retrieval_compare.Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.LimelightDatabaseSchemaVersion_Comparison_Result;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_run_importer.db__for__limelight__database_cleanup__common_code__remove_data_from_database.RunImporter__Limelight_DatabaseCleanup__DBConnectionProvider_Provider;
import org.yeastrc.limelight.limelight_run_importer.db__for__limelight__database_populate_new_fields__common_code.RunImporter__Limelight_Database_PopulateNewFields__DBConnectionProvider_Provider;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.searchers.FileImportTracking_Searcher_Shared;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.searchers.FileImportAndPipelineRunTracking_Searcher_Shared;

/**
 * Database Main thread - Populate new fields and remove database records to clean up database
 * 
 * Skip running if DB Schema Version Number in DB  NOT  match DB Schema Version Number in Code.
 * 
 *  See class method this.wait_Until_10PM_Tomorrow() for when will run next
 *
 */
public class Database_PopulateNewFields_Cleanup_RemoveData_Thread extends Thread {

	private static final String className = Database_PopulateNewFields_Cleanup_RemoveData_Thread.class.getSimpleName();
	
	// See class method this.wait_Until_10PM_Tomorrow() for when will run next

//	private static final long TWENTY_FOUR_HOURS = 24;  // Run every 24 hours
//		
//	private static final long TWENTY_FOUR_HOURS__IN_MILLISECONDS = TWENTY_FOUR_HOURS * 60 * 60 * 1000;  // Run every 24 hours

	private static final Logger log = LoggerFactory.getLogger( Database_PopulateNewFields_Cleanup_RemoveData_Thread.class );
	
	public enum Database_PopulateNewFields_Cleanup_RemoveData_Thread__GetNewInstance_FirstCall {
		YES, NO
	}
	
	
	private static volatile long lastTime_ProcessingLoopRan_Milliseconds = 0;

	

	//  Instance Properties
	
	private ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory;


	private volatile boolean keepRunning = true;

	private volatile boolean logged_CloseAllConnections_Exception = false;
	
	private Database_PopulateNewFields_Cleanup_RemoveData_Thread__GetNewInstance_FirstCall getNewInstance_FirstCall;

	/**
	 * Cleanup when thread is dead
	 */
	public void threadIsDead_Cleanup() {

		if ( importRunImporterDBConnectionFactory != null ) {
			//  Have prev instance so close and unassign
			try {

				ImportRunImporterDBConnectionFactory.closeAllConnections_And_Remove_Instance_From_get_New_Instance(importRunImporterDBConnectionFactory);
				
			} catch (Throwable t) {
				log.error( "In threadIsDead_Cleanup(): ImportRunImporterDBConnectionFactory.closeAllConnections_And_Remove_Instance_From_get_New_Instance(importRunImporterDBConnectionFactory); threw Exception: ", t );
				//  Eat Exception
			}
			importRunImporterDBConnectionFactory = null;
		}
	}


	/**
	 * @param s
	 * @return
	 * @throws Exception 
	 */
	public static Database_PopulateNewFields_Cleanup_RemoveData_Thread getNewInstance( 

			Database_PopulateNewFields_Cleanup_RemoveData_Thread__GetNewInstance_FirstCall getNewInstance_FirstCall ,
			String threadLabel, 
			DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables dbConnectionParametersProvider ) throws Exception {

		Database_PopulateNewFields_Cleanup_RemoveData_Thread instance = new Database_PopulateNewFields_Cleanup_RemoveData_Thread(threadLabel);
		
//		Create "New" Instance of ImportRunImporterDBConnectionFactory so is NOT same instance that main "Run Importer" uses 
		//      since main "Run Importer" calls 'importRunImporterDBConnectionFactory.closeAllConnections();' after each check of imports to process 
		instance.importRunImporterDBConnectionFactory = ImportRunImporterDBConnectionFactory.get_New_Instance();
				
		instance.importRunImporterDBConnectionFactory.initialize( dbConnectionParametersProvider ); 
		instance.importRunImporterDBConnectionFactory.setDatabaseConnectionTestOnBorrow(true);

		
		instance.getNewInstance_FirstCall = getNewInstance_FirstCall;
		instance.init();
		return instance;
	}

	/**
	 * default Constructor
	 */
	private Database_PopulateNewFields_Cleanup_RemoveData_Thread() {
		//  Set a name for the thread
		String threadName = className;
		setName( threadName );
	}
	/**
	 * Constructor
	 * @param s
	 */
	private Database_PopulateNewFields_Cleanup_RemoveData_Thread( String threadLabel ) {
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
		try {
			log.debug( "run() entered" );

			try {
				Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode.getSingletonInstance()
				.setDatabasePopulateNewFields_DBConnectionProvider_Provider_IF(
						RunImporter__Limelight_Database_PopulateNewFields__DBConnectionProvider_Provider.getNewInstance(importRunImporterDBConnectionFactory));

				Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance()
				.setDatabaseCleanupOnly_DBConnectionProvider_Provider_IF( 
						RunImporter__Limelight_DatabaseCleanup__DBConnectionProvider_Provider.getNewInstance(importRunImporterDBConnectionFactory) );

				boolean firstIterationOfLoop = true;

				//  Top level loop until keepRunning is false

				while ( keepRunning ) {

					try {

						//  Check DB Version Number

						{ //  Validate Code And Database Schema Versions match

							//  CURRENT Version
							LimelightDatabaseSchemaVersion_Comparison_Result limelightDatabase_CURRENT_SchemaVersion_Comparison_Result = null;
							try {
								limelightDatabase_CURRENT_SchemaVersion_Comparison_Result = Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getInstance().
										getLimelightDatabase_CURRENT_SchemaVersion_Comparison_Result(
												Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.Log_Exception_YN.YES
												);
							} catch (Exception e) {

								this.wait_Until_10PM_Tomorrow();

								continue;  // EARLY CONTINUE
							}

							//  DB Update in Progress Version
							LimelightDatabaseSchemaVersion_Comparison_Result limelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result;
							try {
								limelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result = Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getInstance().
										getLimelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result(
												Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.Log_Exception_YN.YES
												);
							} catch (Exception e) {

								this.wait_Until_10PM_Tomorrow();

								continue;  // EARLY CONTINUE
							}


							if ( limelightDatabase_CURRENT_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME 
									|| limelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME ) {

								this.wait_Until_10PM_Tomorrow();

								continue;  // EARLY CONTINUE
							}
						}

						/////////

						//   Log current Pending and Running count of imports

						log_CurrentPending_and_Running_count_of_imports();

						///////////////

						//  DB is correct version so continue

						if ( ( firstIterationOfLoop
								&& this.getNewInstance_FirstCall == Database_PopulateNewFields_Cleanup_RemoveData_Thread__GetNewInstance_FirstCall.YES )
								|| ( ! firstIterationOfLoop ) ) { 

							//  Execute if either ( firstIterationOfLoop && GetNewInstance_FirstCall.YES ) || ( ! firstIterationOfLoop ) 

							///////////////

							// Populate new Database fields

							log.warn( "INFO:: STARTING: Database Populate New Fields.  When completed it will wait before it runs again" );

							Limelight_DatabasePopulateNewFields__Main_EntryPoint.getSingletonInstance()
							.limelight_DatabasePopulateNewFields__Main_EntryPoint(
									Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum.LIMELIGHT__RUN_IMPORTER_PROGRAM );

							///////////////

							//  Database Cleanup


							lastTime_ProcessingLoopRan_Milliseconds = System.currentTimeMillis();


							log.warn( "INFO:: STARTING: Database Cleanup (removal of deleted searches and projects and removal of failed search imports).  When Cleanup is completed it will wait before it runs again" );

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

							log.warn( "INFO:: FINISHED: Database Cleanup (removal of deleted searches and projects and removal of failed search imports)." );

						}

						///////////////

						//  Next wait util 10pm tomorrow hours before run again

						this.wait_Until_10PM_Tomorrow();

						firstIterationOfLoop = false;


					} catch ( Throwable t ) {

						if ( keepRunning ) {
							log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
							log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
							log.error( "!!!! \n\n Exception in run(): Will next wait before doing any more processing.  Exception: \n\n", t );

							log.error( "!!!! \n\n " );
							log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
							log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

							this.wait_Until_10PM_Tomorrow();

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

			}

			log.info( "Exiting run()" );

		} finally {
			try {

				ImportRunImporterDBConnectionFactory.closeAllConnections_And_Remove_Instance_From_get_New_Instance( this.importRunImporterDBConnectionFactory );

				this.importRunImporterDBConnectionFactory = null;

			} catch (Throwable t) {
				log.error( "In run(): ImportRunImporterDBConnectionFactory.closeAllConnections_And_Remove_Instance_From_get_New_Instance(importRunImporterDBConnectionFactory); Failed to close all DB connections. threw Exception: ", t );
				//  Eat Exception
			}
		}
	}

	
	////////////////
	
	/**
	 * 
	 */
	private void log_CurrentPending_and_Running_count_of_imports() {
		
		if ( ! log.isInfoEnabled() ) {
			return;
		}
		
		try {
			log.info( "*****************************************************************************" );
			log.info( "Counts of table file_import_tracking_tbl with status QUEUED or RE_QUEUED: "
					+ FileImportTracking_Searcher_Shared.getInstance().getItemCount_Status_QUEUED__RE_QUEUED()
					+ ", status STARTED: "
					+ FileImportTracking_Searcher_Shared.getInstance().getItemCount_Status_STARTED() );

			log.info( "Counts of table import_and_pipeline_run_tracking_tbl with status QUEUED or RE_QUEUED: "
					+ FileImportAndPipelineRunTracking_Searcher_Shared.getInstance().getItemCount_Status_QUEUED__RE_QUEUED()
					+ ", status STARTED: "
					+ FileImportAndPipelineRunTracking_Searcher_Shared.getInstance().getItemCount_Status_STARTED() );
			log.info( "*****************************************************************************" );
			
		} catch (Exception e) {
			log.error( "Failed to get counts of imports from DB: ", e );
			// Eat exception
		}

		
	}

	/**
	 * 
	 */
	private void wait_Until_10PM_Tomorrow() {


		log.warn( "INFO:: Database Cleanup (removal of deleted searches and projects and removal of failed search imports) will now wait until ** 10pm tomorrow ** before it runs again." );


		Calendar calendar  = Calendar.getInstance();

		long now_calendar_Milliseconds = calendar.getTimeInMillis();
		
//		int timeSinceLastRan_Hours = (int) ( ( now_calendar_Milliseconds - lastTime_ProcessingLoopRan_Milliseconds ) / ( 1000 * 60 * 60 ) );
		
//		if ( timeSinceLastRan_Hours < 48 ) {
			//  Change day to tomorrow
			calendar.add(Calendar.DATE, 1);
//		}

		///  Change time to 22 hours (10pm)		calendar.set(Calendar.HOUR_OF_DAY,22);
		calendar.set(Calendar.MINUTE, 00);
		calendar.set(Calendar.SECOND, 00);

		long tomorrow_22_Hour__Milliseconds = calendar.getTimeInMillis();

		long tomorrow_22_Hour_Minus_Now__Milliseconds = tomorrow_22_Hour__Milliseconds - now_calendar_Milliseconds;

//		if ( timeSinceLastRan_Hours < 48 ) {

			if ( tomorrow_22_Hour_Minus_Now__Milliseconds < 8 * 60 * 60 * 1000 ) {

				//  Less than 8 hours so add another day

				calendar.add(Calendar.DATE,1);

				tomorrow_22_Hour__Milliseconds = calendar.getTimeInMillis();

				tomorrow_22_Hour_Minus_Now__Milliseconds = tomorrow_22_Hour__Milliseconds - now_calendar_Milliseconds;
			}
//		}
		
		if ( tomorrow_22_Hour_Minus_Now__Milliseconds > 0 ) {

			synchronized (this) {
				try {
					wait( tomorrow_22_Hour_Minus_Now__Milliseconds ); //  wait for notify() call or timeout, in milliseconds
				} catch (InterruptedException e) {
					log.info("waiting on Throwable exception caught:  wait() interrupted with InterruptedException");
				}
			}
		}
	}
 
}
