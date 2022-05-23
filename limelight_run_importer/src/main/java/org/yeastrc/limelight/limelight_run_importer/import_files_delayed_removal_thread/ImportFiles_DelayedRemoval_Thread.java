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
package org.yeastrc.limelight.limelight_run_importer.import_files_delayed_removal_thread;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.database_version_info_retrieval_compare.Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.database_version_info_retrieval_compare.Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.LimelightDatabaseSchemaVersion_Comparison_Result;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_run_importer.exceptions.LimelightRunImporterInternalException;
import org.yeastrc.limelight.limelight_run_importer.import_files_delayed_removal_main_and_searcher.ImportFiles_DelayedRemoval_Main;

/**
 * Remove import files from disk after a delayed time of 3 days thread
 * 
 * Skip running if DB Schema Version Number in DB  NOT  match DB Schema Version Number in Code. 
 *
 */
public class ImportFiles_DelayedRemoval_Thread extends Thread {

	private static final String className = ImportFiles_DelayedRemoval_Thread.class.getSimpleName();
	
	private static final long TWENTY_FOUR_HOURS__IN_MILLISECONDS = 24 * 60 * 60 * 1000;  // Run every 24 hours
	
	
	private static final Logger log = LoggerFactory.getLogger( ImportFiles_DelayedRemoval_Thread.class );
	
	private volatile boolean keepRunning = true;

	private static volatile ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory;
	
	
	/**
	 * 
	 */
	public static void closeAll_DatabaseConnections() {

		//  Assumes only 1 instance of this class will exist at a time
		
		if ( importRunImporterDBConnectionFactory != null ) {
			//  Have prev instance so close and unassign
			try {
				importRunImporterDBConnectionFactory.closeAllConnections();
				importRunImporterDBConnectionFactory = null;
			} catch (Throwable t) {
				
			}
		}
	}

	
	/**
	 * Cleanup when thread is dead
	 */
	public void threadIsDead_Cleanup() {

		//  Assumes only 1 instance of this class will exist at a time
		
		if ( importRunImporterDBConnectionFactory != null ) {
			//  Have prev instance so close and unassign
			try {
				importRunImporterDBConnectionFactory.closeAllConnections();
				importRunImporterDBConnectionFactory = null;
			} catch (Throwable t) {
				
			}
		}
	}
	
	
	/**
	 * @param s
	 * @return
	 * @throws Exception 
	 */
	public static ImportFiles_DelayedRemoval_Thread getNewInstance( 
			
			String threadLabel, 
			DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables dbConnectionParametersProvider ) throws Exception {

		//  Requires only 1 instance of this class will exist at a time
		
		if ( importRunImporterDBConnectionFactory != null ) {
			
			String msg = "Clean Up Previous dead ImportFiles_DelayedRemoval_Thread Thread before creating an new ImportFiles_DelayedRemoval_Thread Thread";
			log.error(msg);
			throw new LimelightRunImporterInternalException(msg);
		}

		//  Create "New" Instance of ImportRunImporterDBConnectionFactory so is NOT same instance that main "Run Importer" uses 
		//      since main "Run Importer" calls 'importRunImporterDBConnectionFactory.closeAllConnections();' after each check of imports to process 
		importRunImporterDBConnectionFactory = ImportRunImporterDBConnectionFactory.get_New_Instance();
		
		importRunImporterDBConnectionFactory.initialize( dbConnectionParametersProvider ); 
		importRunImporterDBConnectionFactory.setDatabaseConnectionTestOnBorrow(true);
		
		ImportFiles_DelayedRemoval_Thread instance = new ImportFiles_DelayedRemoval_Thread(threadLabel);
		instance.init();
		return instance;
	}
	
	/**
	 * default Constructor
	 */
	private ImportFiles_DelayedRemoval_Thread() {
		//  Set a name for the thread
		String threadName = className;
		setName( threadName );
	}
	/**
	 * Constructor
	 * @param s
	 */
	private ImportFiles_DelayedRemoval_Thread( String s ) {
		super(s);
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
		
		ImportFiles_DelayedRemoval_Main.getSingletonInstance().shutdown();
	
		awaken();
		log.warn( "Exiting shutdown()" );
	}
	
	
	
	/* (non-Javadoc)
	 * @see java.lang.Runnable#run()
	 */
	@Override
	public void run() {
		
		log.debug( "run() entered" );
		
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
				
				//  Main Processing
				
				ImportFiles_DelayedRemoval_Main.getSingletonInstance().importFiles_DelayedRemoval_Main(importRunImporterDBConnectionFactory);
				
				
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
				
			} finally {
			
			}
		}
		log.info( "Exiting run()" );
	}


}
