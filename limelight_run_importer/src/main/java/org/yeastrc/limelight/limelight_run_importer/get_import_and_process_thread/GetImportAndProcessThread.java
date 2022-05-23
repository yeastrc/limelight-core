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
package org.yeastrc.limelight.limelight_run_importer.get_import_and_process_thread;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.PrintWriter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.shutdown_requested_detection.Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.database_version_info_retrieval_compare.Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.database_version_info_retrieval_compare.Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.LimelightDatabaseSchemaVersion_Comparison_Result;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.file_import_limelight_xml_scans.objects.TrackingDTOTrackingRunDTOPair;
import org.yeastrc.limelight.limelight_run_importer.config.ImporterRunnerConfigData;
import org.yeastrc.limelight.limelight_run_importer.constants.GetImportStatus_FileConstants;
import org.yeastrc.limelight.limelight_run_importer.database_update_with_transaction_services.GetNextTrackingToProcessDBTransaction;
import org.yeastrc.limelight.limelight_run_importer.process_submitted_import.ProcessSubmittedImport;
import org.yeastrc.limelight.limelight_shared.database_schema_version__constant.LimelightDatabaseSchemaVersion_Constants;

/**
 * Get the next import and process it thread
 * 
 * Pause running imports if DB Schema Version Number in DB  NOT  match DB Schema Version Number in Code. 
 *
 */
public class GetImportAndProcessThread extends Thread {

	private static final String className = GetImportAndProcessThread.class.getSimpleName();
	private static final int WAIT_TIME_TO_GET_SOMETHING_TO_PROCESS_DEFAULT = 5; // in seconds
	private static final int WAIT_TIME_WHEN_GET_EXCEPTION = 5 * 60; // in seconds
	
	private static final long TWENTY_FOUR_HOURS__IN_MILLISECONDS = 24 * 60 * 60 * 1000;  // Only show some error messages every 24 hours
	
	
	private static final Logger log = LoggerFactory.getLogger( GetImportAndProcessThread.class );
	
	private volatile boolean keepRunning = true;
	private volatile ProcessSubmittedImport processSubmittedImport;
	
	private volatile boolean firstInstanceOfThisThread;

	private volatile boolean firstTimeQueriedDBForImportToProcess = true;
	
	//  For CURRENT DB Version Number
	
	private boolean db_Schema_Version_Number__For_CURRENT_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code = false;
	private long db_Schema_Version_Number__For_CURRENT_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code__LastMessageWritten = 0;

	//  For DB Upgrade In Progress DB Version Number
	
	private boolean db_Schema_Version_Number__For_UpgradeInProgress_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code = false;
	private long db_Schema_Version_Number__For_UpgradeInProgress_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code__LastMessageWritten = 0;
	
	private int waitTimeForNextCheckForImportToProcess_InSeconds = WAIT_TIME_TO_GET_SOMETHING_TO_PROCESS_DEFAULT;
	
	private int maxTrackingRecordPriorityToRetrieve;
	
	public static GetImportAndProcessThread getNewInstance( String s ) {
		
		GetImportAndProcessThread instance = new GetImportAndProcessThread(s);
		instance.init();
		return instance;
	}
	
	/**
	 * default Constructor
	 */
	private GetImportAndProcessThread() {
		//  Set a name for the thread
		String threadName = className;
		setName( threadName );
	}
	/**
	 * Constructor
	 * @param s
	 */
	private GetImportAndProcessThread( String s ) {
		super(s);
	}
	
	/**
	 *
	 */
	private void init() {
		Integer waitTimeForNextCheckForImportToProcess_InSeconds_InConfig = ImporterRunnerConfigData.getWaitTimeForNextCheckForImportToProcess_InSeconds();
		if ( waitTimeForNextCheckForImportToProcess_InSeconds_InConfig != null ) {
			waitTimeForNextCheckForImportToProcess_InSeconds = waitTimeForNextCheckForImportToProcess_InSeconds_InConfig;
		}
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

		log.warn("INFO: stopRunningAfterProcessingJob() called:  GetImportAndProcessThread.getId() = " + this.getId() + ", GetImportAndProcessThread.getName() = " + this.getName() );
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
			if ( processSubmittedImport != null ) {
				processSubmittedImport.shutdown();
			}
		} catch ( NullPointerException e ) {
			//  Eat the NullPointerException since that meant that nothing had to be done.
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
			// Put here in case this is a replacement thread to ensure not waiting for running import
			
			Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().importerIsRunning_End();
			
		} catch (Throwable t) {
			//  Eat Exception
		}
		
		//  Top level loop until keepRunning is false
		
		while ( keepRunning ) {

			//  Save instance variable values to local values since the instance variable values are updated in the following code

			boolean localBeforeUpdates__db_Schema_Version_Number__For_CURRENT_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code =
					this.db_Schema_Version_Number__For_CURRENT_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code;
			
			boolean localBeforeUpdates__db_Schema_Version_Number__For_UpgradeInProgress_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code =
					this.db_Schema_Version_Number__For_UpgradeInProgress_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code;

			
			//  Check DB Version Number

			{ //  Validate Code And Database Schema Versions match
				
				//  CURRENT Version
				LimelightDatabaseSchemaVersion_Comparison_Result limelightDatabase_CURRENT_SchemaVersion_Comparison_Result = null;
				try {
					limelightDatabase_CURRENT_SchemaVersion_Comparison_Result = Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getInstance().
					getLimelightDatabase_CURRENT_SchemaVersion_Comparison_Result();
				} catch (Exception e) {

					int waitTimeInSeconds = waitTimeForNextCheckForImportToProcess_InSeconds;
					synchronized (this) {
						try {
							wait( ( (long) waitTimeInSeconds ) * 1000 ); //  wait for notify() call or timeout, in milliseconds
						} catch (InterruptedException e2) {
							log.info("waitForSleepTime():  wait() interrupted with InterruptedException");
						}
					}
					
					continue;  // EARLY CONTINUE
				}
				
				if ( limelightDatabase_CURRENT_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME ) {

					//  CURRENT version mismatch
					
					//  Code And Database Schema Version do NOT match
					
					if ( db_Schema_Version_Number__For_CURRENT_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code ) {

						//  Same state as previous check
						
						if ( db_Schema_Version_Number__For_CURRENT_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code__LastMessageWritten 
								< ( System.currentTimeMillis() - TWENTY_FOUR_HOURS__IN_MILLISECONDS ) ) {
						
							//  It has been X time so print message again
							
							String errorMessage = null;

							if ( limelightDatabase_CURRENT_SchemaVersion_Comparison_Result == LimelightDatabaseSchemaVersion_Comparison_Result.CODE_GREATER_THAN_DATABASE ) {

								errorMessage = LimelightDatabaseSchemaVersion_Constants.DATABASE_CURRENT_VERSION__CODE_GREATER_THAN_DATABASE__RUN_IMPORTER__ERROR_MESSAGE;

							} else {

								errorMessage = LimelightDatabaseSchemaVersion_Constants.DATABASE_CURRENT_VERSION__CODE_LESS_THAN_DATABASE__RUN_IMPORTER__ERROR_MESSAGE;
							}
							
							System.out.println( "**************************" );
							System.out.println( "Currently NOT running Limelight Imports.  " + errorMessage );
							System.out.println( "**************************" );
						
							db_Schema_Version_Number__For_CURRENT_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code__LastMessageWritten = System.currentTimeMillis();
						}
						
					} else {
					
						//  State change.  Display message

						String errorMessage = null;

						if ( limelightDatabase_CURRENT_SchemaVersion_Comparison_Result == LimelightDatabaseSchemaVersion_Comparison_Result.CODE_GREATER_THAN_DATABASE ) {

							errorMessage = LimelightDatabaseSchemaVersion_Constants.DATABASE_CURRENT_VERSION__CODE_GREATER_THAN_DATABASE__RUN_IMPORTER__ERROR_MESSAGE;

						} else {

							errorMessage = LimelightDatabaseSchemaVersion_Constants.DATABASE_CURRENT_VERSION__CODE_LESS_THAN_DATABASE__RUN_IMPORTER__ERROR_MESSAGE;
						}
						
						System.out.println( "**************************" );
						System.out.println( "Currently NOT running Limelight Imports.  " + errorMessage );
						System.out.println( "**************************" );
						
						db_Schema_Version_Number__For_CURRENT_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code__LastMessageWritten = System.currentTimeMillis();
					}
					
					db_Schema_Version_Number__For_CURRENT_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code = true;
					
				} else {
					
					//  NO mismatch
					db_Schema_Version_Number__For_CURRENT_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code = false;
					
				}
				
				if ( ! db_Schema_Version_Number__For_CURRENT_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code ) {
					
					//  Only check since CURRENT is NO Mismatch

					//  DB Update in Progress Version
					LimelightDatabaseSchemaVersion_Comparison_Result limelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result;
					try {
						limelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result = Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getInstance().
						getLimelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result();
					} catch (Exception e) {

						int waitTimeInSeconds = waitTimeForNextCheckForImportToProcess_InSeconds;
						synchronized (this) {
							try {
								wait( ( (long) waitTimeInSeconds ) * 1000 ); //  wait for notify() call or timeout, in milliseconds
							} catch (InterruptedException e2) {
								log.info("waitForSleepTime():  wait() interrupted with InterruptedException");
							}
						}
						
						continue;  // EARLY CONTINUE
					}

					if ( limelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME ) {

						//  Update In Progress: version mismatch
						
						//  Code And Database Schema Version do NOT match
						
						if ( db_Schema_Version_Number__For_UpgradeInProgress_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code ) {

							//  Same state as previous check
							
							if ( db_Schema_Version_Number__For_UpgradeInProgress_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code__LastMessageWritten 
									< ( System.currentTimeMillis() - TWENTY_FOUR_HOURS__IN_MILLISECONDS ) ) {
							
								//  It has been X time so print message again
								
								String errorMessage = LimelightDatabaseSchemaVersion_Constants.DATABASE_UPGRADE_IN_PROGRESS_VERSION__MISMATCH_VERSION_NUMBERS__ERROR_MESSAGE;
								
								System.out.println( "**************************" );
								System.out.println( "Currently NOT running Limelight Imports.  " + errorMessage );
								System.out.println( "**************************" );
							
								db_Schema_Version_Number__For_UpgradeInProgress_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code__LastMessageWritten = System.currentTimeMillis();
							}
							
							
						} else {

							//  State change.  Display message

							String errorMessage = LimelightDatabaseSchemaVersion_Constants.DATABASE_UPGRADE_IN_PROGRESS_VERSION__MISMATCH_VERSION_NUMBERS__ERROR_MESSAGE;
							
							System.out.println( "**************************" );
							System.out.println( "Currently NOT running Limelight Imports.  " + errorMessage );
							System.out.println( "**************************" );
						
							db_Schema_Version_Number__For_UpgradeInProgress_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code__LastMessageWritten = System.currentTimeMillis();
						}
						
						
						db_Schema_Version_Number__For_UpgradeInProgress_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code = true;
						
					} else {
						
						//  NO mismatch
						db_Schema_Version_Number__For_UpgradeInProgress_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code = false;
					}
				}
			}
			
			if ( db_Schema_Version_Number__For_CURRENT_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code 
					|| db_Schema_Version_Number__For_UpgradeInProgress_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code ) {
				
				//  CURRENT or UpgradeInProgress Version Number mismatch so do NOT process imports
				
				int waitTimeInSeconds = waitTimeForNextCheckForImportToProcess_InSeconds;
				synchronized (this) {
					try {
						wait( ( (long) waitTimeInSeconds ) * 1000 ); //  wait for notify() call or timeout, in milliseconds
					} catch (InterruptedException e) {
						log.info("waitForSleepTime():  wait() interrupted with InterruptedException");
					}
				}
				
				continue;  //  EARLY CONTINUE
			}
			

			if ( localBeforeUpdates__db_Schema_Version_Number__For_CURRENT_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code
					|| localBeforeUpdates__db_Schema_Version_Number__For_UpgradeInProgress_Version_in_DB__NOT__match_DB_Schema_Version_Number_in_Code ) {

				System.out.println( "**************************" );
				System.out.println( "Returning to running Limelight Imports.  " );
				System.out.println( "**************************" );
			}
			
			
			//  Get Next Import to process
			
			TrackingDTOTrackingRunDTOPair trackingDTOTrackingRunDTOPair = null;
			try {
				try {
					trackingDTOTrackingRunDTOPair =
							GetNextTrackingToProcessDBTransaction.getInstance().getNextTrackingToProcess( maxTrackingRecordPriorityToRetrieve );
				} catch ( Throwable t ) {
					updateGetImportStatus_File_ERROR_GettingImportToProcess( t );
					throw t;
				}
				
				if ( firstInstanceOfThisThread && firstTimeQueriedDBForImportToProcess ) {
					
					firstTimeQueriedDBForImportToProcess = false;
					
					String msg = "No import was found to process.";
					
					if ( trackingDTOTrackingRunDTOPair != null ) {
						
						msg = "An import was found to process and will be processed next.";	
					}
					
					log.warn( "INFO: First query of DB for Import to process is complete.  " + msg );
				}
				
				if ( trackingDTOTrackingRunDTOPair != null ) {
					updateGetImportStatus_File_YES_ImportToProcess( trackingDTOTrackingRunDTOPair );
					synchronized (this) {
						processSubmittedImport = ProcessSubmittedImport.getInstance();
					}
					processSubmittedImport.processSubmittedImport( trackingDTOTrackingRunDTOPair );
				} else {
					updateGetImportStatus_File_NO_ImportToProcess();
					int waitTimeInSeconds = waitTimeForNextCheckForImportToProcess_InSeconds;
					synchronized (this) {
						try {
							wait( ( (long) waitTimeInSeconds ) * 1000 ); //  wait for notify() call or timeout, in milliseconds
						} catch (InterruptedException e) {
							log.info("waitForSleepTime():  wait() interrupted with InterruptedException");
						}
					}
				}
			} catch ( Throwable t ) {
				
				if ( trackingDTOTrackingRunDTOPair != null ) {
					updateGetImportStatus_File_ERROR_ProcessingImportToProcess( t, trackingDTOTrackingRunDTOPair );
				}
				
				if ( keepRunning ) {
					log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
					log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
					log.error( "!!!! \n\n Exception in run(): Will next wait " + WAIT_TIME_WHEN_GET_EXCEPTION
							+ " seconds before doing any more processing.  Exception: \n\n", t );

					log.error( "!!!! \n\n " );
					log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
					log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

					int waitTimeInSeconds = WAIT_TIME_WHEN_GET_EXCEPTION;
					synchronized (this) {
						try {
							wait( ( (long) waitTimeInSeconds ) * 1000 ); //  wait for notify() call or timeout, in milliseconds
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
				synchronized (this) {
					if ( processSubmittedImport != null ) {
						processSubmittedImport = null;
					}
				}
				
				try {
					ImportRunImporterDBConnectionFactory.getMainSingletonInstance().closeAllConnections();

				} catch ( Throwable t ) {
					log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
					log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
					log.error( "!!!! \n\n "
							+ "DBConnectionFactory.closeAllConnections(); failed in .getNextTrackingToProcess(...)"
							+ "  Exception: \n\n", t );
					log.error( "!!!! \n\n " );
					log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
					log.error( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
				}
				
			}
		}
		log.info( "Exiting run()" );
	}

	/**
	 * @param trackingDTOTrackingRunDTOPair
	 * @throws IOException
	 */
	private void updateGetImportStatus_File_YES_ImportToProcess( TrackingDTOTrackingRunDTOPair trackingDTOTrackingRunDTOPair ) {
	
		try {
			int id = trackingDTOTrackingRunDTOPair.getFileImportTrackingDTO().getId();
	
			try ( BufferedWriter writer = new BufferedWriter( new FileWriter( GetImportStatus_FileConstants.GET_IMPORT_STATUS_FILENAME ) ) ) {
				
				writer.write( GetImportStatus_FileConstants.GET_IMPORT_STATUS_YES_FOUND_REQUEST_TO_PROCESS_TEXT );
				writer.write( String.valueOf( id ) );
				writer.newLine();
			}
		} catch ( Throwable t ) {
			
			log.error( "Failed to update file " + GetImportStatus_FileConstants.GET_IMPORT_STATUS_FILENAME );
			//  Eat Exception
		}
	}

	/**
	 * @throws IOException
	 */
	private void updateGetImportStatus_File_NO_ImportToProcess( ) {

		try {
			try ( BufferedWriter writer = new BufferedWriter( new FileWriter( GetImportStatus_FileConstants.GET_IMPORT_STATUS_FILENAME ) ) ) {
				
				writer.write( GetImportStatus_FileConstants.GET_IMPORT_STATUS_NONE_FOUND_REQUEST_TO_PROCESS_TEXT );
				writer.newLine();
			}
	} catch ( Throwable t ) {
			
			log.error( "Failed to update file " + GetImportStatus_FileConstants.GET_IMPORT_STATUS_FILENAME );
			//  Eat Exception
		}
	}

	/**
	 * @param throwable
	 */
	private void updateGetImportStatus_File_ERROR_GettingImportToProcess( Throwable throwable ) {
		try {
			try ( PrintWriter writer = new PrintWriter( new FileWriter( GetImportStatus_FileConstants.GET_IMPORT_STATUS_FILENAME ) ) ) {
				
				writer.write( GetImportStatus_FileConstants.GET_IMPORT_STATUS_YES_ERROR_CHECKING_FOR_REQUEST_TEXT );
				writer.write( "\n" );
				throwable.printStackTrace( writer );
				writer.write( "\n" );
			}
		} catch ( Throwable t ) {
			
			log.error( "Failed to update file " + GetImportStatus_FileConstants.GET_IMPORT_STATUS_FILENAME );
			//  Eat Exception
		}
	}

	/**
	 * @param throwable
	 * @param trackingDTOTrackingRunDTOPair
	 */
	private void updateGetImportStatus_File_ERROR_ProcessingImportToProcess( Throwable throwable, TrackingDTOTrackingRunDTOPair trackingDTOTrackingRunDTOPair ) {

		String trackingId = null;
		try {
			if ( trackingDTOTrackingRunDTOPair != null ) {
				trackingId = ": Import Tracking Id: " + trackingDTOTrackingRunDTOPair.getFileImportTrackingDTO().getId();
			}
		} catch ( Throwable t ) {
			
		}
		
		try {
			try ( PrintWriter writer = new PrintWriter( new FileWriter( GetImportStatus_FileConstants.GET_IMPORT_STATUS_FILENAME ) ) ) {
				
				writer.write( GetImportStatus_FileConstants.GET_IMPORT_STATUS_YES_ERROR_PROCESSING_REQUEST_TEXT );
				if ( trackingId != null ) {
					writer.write( trackingId );					
				}
				writer.write( "\n" );
				throwable.printStackTrace( writer );
				writer.write( "\n" );
			}
		} catch ( Throwable t ) {
			
			log.error( "Failed to update file " + GetImportStatus_FileConstants.GET_IMPORT_STATUS_FILENAME );
			//  Eat Exception
		}
	}


	
	public int getMaxTrackingRecordPriorityToRetrieve() {
		return maxTrackingRecordPriorityToRetrieve;
	}
	public void setMaxTrackingRecordPriorityToRetrieve(
			int maxTrackingRecordPriorityToRetrieve) {
		this.maxTrackingRecordPriorityToRetrieve = maxTrackingRecordPriorityToRetrieve;
	}
	public void setFirstInstanceOfThisThread(boolean firstInstanceOfThisThread) {
		this.firstInstanceOfThisThread = firstInstanceOfThisThread;
	}
}
